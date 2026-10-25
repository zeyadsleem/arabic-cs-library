---
title: "CI/CD باستخدام GitHub Actions"
---

لديك سكربت نشر يعمل. تشغّله من حاسوبك المحمول، فيرفع إلى S3، ويبطل ذاكرة CloudFront المؤقتة، ويُحدَّث الموقع. المشكلة: عليك أن تتذكّر تشغيله. و«أنت» نقطة فشل واحدة. فإن كنت في إجازة، فلا أحد ينشر. وإن نشرت من شجرة عمل غير نظيفة، انتقلت شيفرة معطوبة إلى الإنتاج. وإن تعطّل حاسوبك في منتصف النشر، بقي الموقع في حالة نصف محدّثة.

إن أردت الجانب الخاص بـ AWS من خط الأنابيب هذا مفتوحًا في تبويب آخر، فأبقِ [دليل IAM لإدارة مفاتيح الوصول](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) و[مرجع الأمر `aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) و[مرجع الأمر `aws cloudfront create-invalidation`](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html) في متناول يدك.

CI/CD يصلح هذا. ادفع إلى `main`، فيعمل خط الأنابيب، وينتشر الموقع. بلا تدخّل بشري في الحلقة. يعدّ هذا الدرس سير عمل GitHub Actions يفعل بالضبط ما يفعله سكربت النشر لديك — لكن مُشغَّلًا تلقائيًا عند كل دفعة.

## المصادقة: OIDC مقابل مفاتيح الوصول

قبل كتابة سير العمل، تحتاج إلى تحديد كيفية مصادقة GitHub Actions مع AWS. وهناك مقاربتان:

**مفاتيح وصول طويلة الأجل**: أنشئ مستخدم IAM (مثل `deploy-bot` من [تمرين سياسة IAM لروبوت النشر](https://stevekinney.com/courses/aws/iam-policy-exercise))، وولّد مفاتيح وصول، وخزّنها كأسرار في مستودع GitHub. ويستخدم سير العمل تلك البيانات في كل تشغيل.

**OIDC (OpenID Connect)**: تطلب GitHub Actions رمزًا قصير الأجل من AWS باستخدام هوية اتحادية. فلا تُخزَّن أسرار طويلة الأجل في أي مكان. وتثق AWS بموفّر هوية GitHub، وتتحقّق من الرمز، وتعيد بيانات اعتماد مؤقتة تنتهي بعد انتهاء سير العمل.

OIDC هو الخيار الأفضل، وأذهب إلى حدّ القول إنه ينبغي أن يكون خيارك الافتراضي. فمفاتيح الوصول أسرار ثابتة يمكن أن تتسرّب — فإن وصل أحد إلى أسرار مستودعك، صارت لديه بيانات اعتماد AWS دائمة. أما رموز OIDC فنطاقها محدود بتشغيل واحد لسير العمل، وتنتهي تلقائيًا. ولهذا السبب توصي كل من AWS وGitHub بـ OIDC.

## إعداد OIDC: الجانب الخاص بـ AWS

تحتاج إلى فعل شيئين في AWS: إنشاء موفّر هوية، وإنشاء دور IAM يمكن لـ GitHub Actions افتراضه.

### إنشاء موفّر هوية OIDC الخاص بـ GitHub

هذا يخبر AWS أن تثق بالرموز التي تصدرها نقطة نهاية OIDC الخاصة بـ GitHub.

أعلنت AWS [في 2023](https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/) أنها لم تعد تتحقّق من بصمة الإبهام لموفّر OIDC الخاص بـ GitHub، لكن واجهة IAM البرمجية ما زالت تتطلّب سلسلة سداسية عشرية من 40 حرفًا. فالحقل مطلوب نحويًا ومتجاهَل تشغيليًا لنقطة نهاية GitHub اليوم. ولديك خياران:

**الخيار 1: ثبّت بصمة الإبهام الحالية ديناميكيًا.** اجلبها بـ `openssl` حتى لا تلصق قيمة قديمة:

```bash
THUMBPRINT=$(openssl s_client -servername token.actions.githubusercontent.com \
    -showcerts -connect token.actions.githubusercontent.com:443 </dev/null 2>/dev/null \
  | openssl x509 -fingerprint -noout -sha1 \
  | cut -d'=' -f2 | tr -d ':' | tr '[:upper:]' '[:lower:]')

aws iam create-open-id-connect-provider \
  --url "https://token.actions.githubusercontent.com" \
  --client-id-list "sts.amazonaws.com" \
  --thumbprint-list "$THUMBPRINT" \
  --region us-east-1 \
  --output json
```

**الخيار 2: مرّر أي سلسلة سداسية عشرية صحيحة نحويًا.** بما أن AWS تتجاهل هذه القيمة لنقطة نهاية GitHub، فإن قيمة بديلة تعمل:

```bash
aws iam create-open-id-connect-provider \
  --url "https://token.actions.githubusercontent.com" \
  --client-id-list "sts.amazonaws.com" \
  --thumbprint-list "6938fd4d98bab03faadb97b34396831e3780aea1" \
  --region us-east-1 \
  --output json
```

استخدم الخيار 1 في السكربتات التي ستشغّلها على موفّري هوية متعددين؛ أما الخيار 2 فيكفي لمرة واحدة.

> **نصيحة**
>
> لا تحتاج إلى إنشاء موفّر الهوية هذا إلا مرة واحدة لكل حساب AWS. فإن كان لديك مستودعات متعددة تنشر إلى الحساب نفسه، فكلها تتشارك هذا الموفّر. ويحصل كل مستودع على دور IAM خاص به بأذونات محدودة النطاق.

### إنشاء دور IAM من أجل GitHub Actions

أنشئ سياسة ثقة تسمح لـ GitHub Actions بافتراض هذا الدور، مقيّدة بمستودعك المحدّد:

احفظ هذا باسم `github-actions-trust-policy.json` (متوفر أيضًا في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/github-actions-trust-policy.json)):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

كتلة `Condition` حرجة. فبدونها، يمكن *أي* مستودع GitHub أن يفترض هذا الدور. وشرط `sub` يقيّده بالدفعات إلى فرع `main` في مستودعك المحدّد. واستبدل `your-org/your-repo` باسم مؤسستك ومستودعك الفعليين في GitHub. والشرطان كلاهما في `StringEquals` لأن قيمة `sub` نصّ حرفي تام — ولا تستخدم `StringLike` إلا حين يتضمّن النمط حرف بدل (`*`).

> **تحذير**
>
> لا تستخدم `"StringLike": {"token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:*"}` مع حرف بدل في النهاية. فذلك يسمح لأي فرع، وأي طلب سحب، وأي وسم في مستودعك بافتراض الدور. وقيّده بـ `ref:refs/heads/main` إن كنت تريد عمليات نشر الإنتاج من الفرع الرئيسي فقط.

وكبديل للثقة المقيّدة بالفرع، يمكنك تقييد الثقة ببيئة GitHub (مثل `production`) باستخدام `"repo:your-org/your-repo:environment:production"` كنمط `sub`. وتدعم بيئات GitHub المراجعين المطلوبين ومؤقّتات الانتظار، ما يعني أن دور AWS لا يمكن افتراضه حتى يوافق إنسان على النشر في واجهة GitHub. وهذا هو النمط الذي تريده لأحمال العمل التي يجب ألا تصل فيها عمليات الدمج العارضة على الفرع الرئيسي إلى الإنتاج.

ملاحظة: أحداث `pull_request` من النسخ المتشعّبة تولّد قيم `sub` تحتوي `pull_request`، لا `refs/heads/main`، لذا لن تسمح سياسة ثقة مقيّدة بالفرع لطلب سحب من نسخة متشعّبة بافتراض الدور عن غير قصد. لكن لا تعمّم هذا السلوك على موفّري OIDC آخرين — فـ AWS تتعامل مع GitHub معاملة خاصة فقط.

أنشئ الدور:

```bash
aws iam create-role \
  --role-name GitHubActionsDeployRole \
  --assume-role-policy-document file://github-actions-trust-policy.json \
  --region us-east-1 \
  --output json
```

### إرفاق الأذونات بالدور

يحتاج الدور إلى الأذونات نفسها التي يملكها روبوت النشر: مزامنة S3 وإبطال ذاكرة CloudFront. وقد كتبت هذه السياسة بالفعل في [تمرين سياسة IAM لروبوت النشر](https://stevekinney.com/courses/aws/iam-policy-exercise). أرفقها بالدور الجديد:

```bash
aws iam attach-role-policy \
  --role-name GitHubActionsDeployRole \
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \
  --region us-east-1
```

يمكنك إعادة استخدام `DeployBotPolicy` نفسها تمامًا — فالأذونات لا تتغيّر لمجرد أن المبدأ دور لا مستخدم. وهذا تطبيق لمبدأ الامتياز الأدنى الذي تعلمته في [مبدأ الامتياز الأدنى](https://stevekinney.com/courses/aws/principle-of-least-privilege) على خط أنابيب CI/CD لديك: دور النشر يمكنه مزامنة الملفات وإبطال الذاكرات المؤقتة، ولا شيء غير ذلك.

## سير عمل GitHub Actions

> **نصيحة**
>
> ملف سير العمل هذا متوفر في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/blob/main/.github/workflows/deploy.yml).

أنشئ ملف سير العمل في `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches:
      - main

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsDeployRole
          aws-region: us-east-1

      - name: Deploy to S3
        run: |
          aws s3 sync ./build/assets s3://my-frontend-app-assets/assets \
            --cache-control "public, max-age=31536000, immutable" \
            --region us-east-1 \
            --delete \
            --output json

          aws s3 cp ./build/index.html s3://my-frontend-app-assets/index.html \
            --cache-control "public, max-age=60" \
            --content-type "text/html" \
            --region us-east-1 \
            --output json

          aws s3 sync ./build s3://my-frontend-app-assets \
            --exclude "assets/*" \
            --exclude "index.html" \
            --region us-east-1 \
            --delete \
            --output json

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id E1A2B3C4D5E6F7 \
            --paths "/*" \
            --region us-east-1 \
            --output json
```

هذا هو سير العمل كاملًا. ادفع إلى `main` فيبني وينشر ويبطل الذاكرة المؤقتة.

## تفكيك سير العمل

### المُشغِّل

```yaml
on:
  push:
    branches:
      - main
```

يعمل سير العمل عند كل دفعة إلى `main`. وطلبات السحب لا تشغّل نشرًا. والدفعات إلى فروع الميزات لا تشغّل نشرًا. ولا تؤدي إلى نشر إنتاجي إلا عمليات الدمج إلى `main`.

### الأذونات

```yaml
permissions:
  id-token: write
  contents: read
```

إذن `id-token: write` مطلوب لـ OIDC. فهو يسمح لسير العمل بطلب JWT من نقطة نهاية OIDC الخاصة بـ GitHub. وإذن `contents: read` يتيح لسير العمل سحب شيفرة المستودع. وبدون `id-token: write`، تفشل خطوة `aws-actions/configure-aws-credentials` بخطأ بيانات اعتماد.

### بيانات اعتماد AWS

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsDeployRole
    aws-region: us-east-1
```

تستخدم هذه الخطوة إجراء `aws-actions/configure-aws-credentials` لتبادل رمز OIDC الخاص بـ GitHub ببيانات اعتماد AWS مؤقتة. وتُصدَّر بيانات الاعتماد كمتغيّرات بيئة (`AWS_ACCESS_KEY_ID` و`AWS_SECRET_ACCESS_KEY` و`AWS_SESSION_TOKEN`) تلتقطها أوامر `aws` اللاحقة تلقائيًا. وتنتهي بيانات الاعتماد عند انتهاء سير العمل.

### خطوات النشر

خطوات النشر هي عملية الرفع نفسها على ثلاث مراحل من [سكربت النشر في الدرس السابق](https://stevekinney.com/courses/aws/automating-deploys-with-aws-cli): أصول مجزّأة بترويسات تخزين مؤقت طويلة الأجل، و`index.html` بمدة TTL قصيرة، وكل ما عدا ذلك بالإعدادات الافتراضية. وخطوة الإبطال تمسح ذاكرة CloudFront المؤقتة.

## تهيئة الأسرار (إذا كنت تستخدم مفاتيح الوصول)

إن لم تستطع استخدام OIDC (فبعض المؤسسات تفرض قيودًا على موفّري الهوية)، فالبديل هو تخزين مفاتيح الوصول كأسرار في مستودع GitHub. اذهب إلى **Settings** > **Secrets and variables** > **Actions** في مستودعك وأضف:

- `AWS_ACCESS_KEY_ID`: معرّف مفتاح الوصول من مستخدم روبوت النشر.
- `AWS_SECRET_ACCESS_KEY`: مفتاح الوصول السرّي من مستخدم روبوت النشر.

ثم استبدل خطوة بيانات الاعتماد في سير العمل:

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

> **تحذير**
>
> مفاتيح الوصول المخزّنة كأسرار في المستودع بيانات اعتماد طويلة الأجل. فإن وصل أحد إلى إعدادات مستودعك، صارت لديه بيانات اعتماد AWS الخاصة بك. دوّر مفاتيح الوصول بانتظام وقيّد سياسة مستخدم IAM بأضيق نطاق ممكن — وهذا بالضبط ما صُمّم له [تمرين سياسة IAM لروبوت النشر](https://stevekinney.com/courses/aws/iam-policy-exercise). أما OIDC فيتجنّب هذا الخطر كليًا.

## التحقّق من سير العمل

بعد دفع ملف سير العمل إلى `main`، اذهب إلى تبويب **Actions** في مستودعك على GitHub. ينبغي أن ترى سير عمل «Deploy to AWS» قيد التشغيل. وكل خطوة تعرض مخرجاتها:

- **Checkout**: يسحب الشيفرة.
- **Setup Node.js**: يثبّت Node 22.
- **Install dependencies**: يشغّل `npm ci` (تثبيت نظيف، أسرع من `npm install` في CI).
- **Build**: يشغّل أمر البناء لديك.
- **Configure AWS credentials**: يبادل رمز OIDC ببيانات اعتماد مؤقتة.
- **Deploy to S3**: يعرض مخرجات `aws s3 sync` بما فيها الملفات المرفوعة والمحذوفة.
- **Invalidate CloudFront cache**: يعرض معرّف الإبطال.

إن فشلت أي خطوة، يتوقّف سير العمل ولا تعمل الخطوات التالية. والبناء الفاشل لا يؤدي إلى نشر جزئي.

## المشكلات الشائعة

**«Credentials could not be loaded»**: موفّر هوية OIDC غير موجود في حساب AWS لديك، أو سياسة ثقة الدور لا تطابق مستودعك وفرعك. تحقّق مرتين من شرط `sub` في سياسة الثقة.

**«AccessDenied» على S3 أو CloudFront**: الدور موجود وبيانات الاعتماد تعمل، لكن السياسة المرفقة لا تمنح الأذونات المطلوبة. تحقّق من أن السياسة تسمح بـ `s3:PutObject` و`s3:DeleteObject` و`s3:ListBucket` و`cloudfront:CreateInvalidation` على الموارد الصحيحة.

**البناء ينجح لكن الملفات لا تتحدّث**: اكتملت مزامنة S3، لكنك نسيت خطوة الإبطال. فـ CloudFront ما زال يقدّم نسخًا مخزّنة مؤقتًا. أضف خطوة `create-invalidation` أو انتظر انتهاء مدة TTL للذاكرة المؤقتة.

> **نصيحة**
>
> يمكنك إضافة خطوة تحقّق أخيرة إلى سير العمل تفحص النشر:
>
> ```yaml
> - name: Verify deployment
>   run: |
>     HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://YOUR_CLOUDFRONT_DOMAIN)
>     echo "Site returned HTTP $HTTP_STATUS"
> ```
>
> استبدل `YOUR_CLOUDFRONT_DOMAIN` بعنوان URL الخاص بك `*.cloudfront.net` (أو بنطاقك المخصّص إن أكملت قسم [النطاقات المخصّصة وDNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers) الاختياري). هذا لا يوقف سير العمل عند الفشل، لكنه يمنحك تغذية راجعة فورية في سجلات سير العمل.
