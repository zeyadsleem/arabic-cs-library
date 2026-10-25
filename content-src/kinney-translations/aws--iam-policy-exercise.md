---
title: "تمرين: سياسة IAM لبوت النشر"
---

ستُنشئ **بوت نشر**—مستخدم IAM غرضه الوحيد نشر واجهتك الأمامية. يستطيع هذا المستخدم مزامنة الملفات إلى حاوية S3 محدّدة وإبطال ذاكرة توزيع CloudFront محدّد. ولا يستطيع فعل أي شيء آخر. لا قراءة جداول DynamoDB، ولا إنشاء دوال Lambda، ولا تعديل أذونات IAM.

في الإنتاج، ستكون هوية النشر هذه **دور IAM اتحاديًا عبر OIDC** لا مستخدمًا بمفاتيح وصول ثابتة—فـ GitHub Actions تستطيع طلب بيانات اعتماد قصيرة العمر من AWS دون تخزين أي أسرار. وستُرقّي `deploy-bot` (أو مكافئه من دور OIDC) إلى النشر عبر GitHub Actions في درس CI/CD. أما الآن، فبناءه كمستخدم IAM بمفاتيح محدّدة النطاق هو المسار التعليمي الصحيح: فهو يفرض عليك التفكير صريحًا في الأذونات المطلوبة وسببها.

> **احذف هذه المفاتيح بعد درس CI/CD**
>
> مفاتيح الوصول التي تولّدها في هذا التمرين هي عجلات تدريب. فبمجرد أن تصل إلى [CI/CD مع GitHub Actions](https://stevekinney.com/courses/aws/cicd-with-github-actions) وتربط الدور الاتحادي عبر OIDC، **احذف مفاتيح وصول `deploy-bot`** (`aws iam delete-access-key --user-name deploy-bot --access-key-id <id>`). إن مفاتيح الوصول طويلة العمر التي تبقى متروكة بعد أن تعود لا تحتاجها هي الطريقة المدرسية التي تُخترق بها حسابات AWS. يبقى دور IAM، وتبقى السياسة المرتبطة به، أما المفاتيح فتُحذف.

هذا هو بوت النشر نفسه الذي ستربطه بخط أنابيب GitHub Actions لاحقًا في الدورة. أريدك أن تبنيه الآن كي تفهم بالضبط ما الأذونات التي يملكها ولماذا.

> **نصيحة**
>
> إن أردت نسخة AWS من ميكانيكا السياسات أثناء عملك، فأبقِ [مرجع سياسات IAM بصيغة JSON](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) و[مرجع أمر `aws iam create-policy`](https://docs.aws.amazon.com/cli/latest/reference/iam/create-policy.html) مفتوحين.

## لماذا يهم هذا

كل خط أنابيب CI/CD يحتاج بيانات اعتماد. على Vercel، تتولى المنصة ذلك عنك—فلا تفكر أبدًا في الأذونات التي تملكها عملية النشر. أما على AWS، فأنت تتحكم في تلك الأذونات صراحةً. والأذونات التي تختارها تحدّد نطاق الضرر إذا تسرّبت بيانات الاعتماد تلك.

بوت نشر يملك `AdministratorAccess` يستطيع حذف قاعدة بياناتك. أما بوت نشر بسياسة محدّدة النطاق، فأسوأ ما يفعله أن يكتب فوق ملفاتك الثابتة. الفرق بين يوم سيئ ويوم كارثي.

## مهمتك

أنشئ مستخدم IAM باسم `deploy-bot` يتضمن:

- **لا وصول إلى وحدة التحكم**—هذا المستخدم موجود لاستخدام CLI/API فقط.
- **مفاتيح وصول** للوصول البرمجي.
- **سياسة IAM مخصّصة** تسمح بهذه العمليات بالضبط ولا شيء غيرها: مزامنة الملفات إلى حاوية `my-frontend-app-assets` في S3 (الرفع والحذف والسرد) وإنشاء إبطالات ذاكرة على توزيع CloudFront ذي المعرّف `E1A2B3C4D5E6F7`
  - مزامنة الملفات إلى حاوية `my-frontend-app-assets` في S3 (الرفع والحذف والسرد)
  - إنشاء إبطالات ذاكرة على توزيع CloudFront ذي المعرّف `E1A2B3C4D5E6F7`

استخدم معرّف الحساب `123456789012` والمنطقة `us-east-1` في جميع قيم ARN.

## خطوة بخطوة

### إنشاء مستخدم IAM

في وحدة تحكم AWS، انتقل إلى **IAM** > **Users** > **Create user**.

- عيّن اسم المستخدم إلى `deploy-bot`.
- **لا** تمكّن الوصول إلى وحدة التحكم. سيثبت هذا المستخدم هويته عبر مفاتيح الوصول فقط.
- تخطَّ خطوة الأذونات الآن—سترفق سياسة بعد إنشائه.
- تابع النقر حتى إنشاء المستخدم.

بدلًا من ذلك، استخدم CLI:

```bash
aws iam create-user \
  --user-name deploy-bot \
  --region us-east-1 \
  --output json
```

### إنشاء مفاتيح وصول للمستخدم

انتقل إلى تبويب **Security credentials** الخاص بمستخدم `deploy-bot` وأنشئ مفتاح وصول. اختر **Other** كحالة الاستخدام.

أو عبر CLI:

```bash
aws iam create-access-key \
  --user-name deploy-bot \
  --region us-east-1 \
  --output json
```

احفظ معرّف مفتاح الوصول ومفتاح الوصول السري في مكان آمن. ستحتاجهما لاحقًا عند تهيئة خط أنابيب النشر.

### كتابة السياسة

أنشئ ملفًا اسمه `deploy-bot-policy.json` يحتوي سياسة تقوم بما يلي:

1. تسمح بـ `s3:PutObject` و`s3:DeleteObject` على الكائنات في حاوية `my-frontend-app-assets`.
2. تسمح بـ `s3:ListBucket` على حاوية `my-frontend-app-assets` نفسها.
3. تسمح بـ `cloudfront:CreateInvalidation` على التوزيع `E1A2B3C4D5E6F7`.

تذكّر:

- `s3:PutObject` و`s3:DeleteObject` تعملان على **الكائنات**، لذا يحتاج ARN المورد إلى `/*` في نهايته.
- `s3:ListBucket` تعمل على **الحاوية**، لذا لا يحتوي ARN المورد على `/*`.
- أقواس ARN لتوزيعات CloudFront لا تحمل منطقة (استخدم مقطع منطقة فارغًا) وتتبع النمط `arn:aws:cloudfront::<account-id>:distribution/<distribution-id>`.
- كل عبارة تحتاج `Effect` و`Action` و`Resource`.
- تحتاج السياسة إلى `"Version": "2012-10-17"`.

### إنشاء السياسة في IAM

```bash
aws iam create-policy \
  --policy-name DeployBotPolicy \
  --policy-document file://deploy-bot-policy.json \
  --region us-east-1 \
  --output json
```

دوّن ARN السياسة من الناتج—ستحتاجه في الخطوة التالية.

### ربط السياسة بالمستخدم

```bash
aws iam attach-user-policy \
  --user-name deploy-bot \
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \
  --region us-east-1 \
  --output json
```

### التحقق من الإعداد

أعدّ ملف تعريف مسمّى لبوت النشر:

```bash
aws configure --profile deploy-bot
```

أدخل معرّف مفتاح الوصول ومفتاح الوصول السري الذي حفظته سابقًا، و`us-east-1` كمنطقة، و`json` كتنسيق إخراج.

تحقّق من الهوية:

```bash
aws sts get-caller-identity \
  --profile deploy-bot \
  --region us-east-1 \
  --output json
```

ينبغي أن ترى ARN الخاص بمستخدم `deploy-bot` في الاستجابة.

## مع SDK

التمرين كله بـ TypeScript، للمقارنة:

```typescript
import {
  IAMClient,
  CreateUserCommand,
  CreateAccessKeyCommand,
  CreatePolicyCommand,
  AttachUserPolicyCommand,
} from '@aws-sdk/client-iam';

const iam = new IAMClient({ region: 'us-east-1' });

await iam.send(new CreateUserCommand({ UserName: 'deploy-bot' }));

const keys = await iam.send(new CreateAccessKeyCommand({ UserName: 'deploy-bot' }));
// This response is the ONLY time the secret is returned — store it now.
console.log('Access key:', keys.AccessKey?.AccessKeyId);
console.log('Secret:', keys.AccessKey?.SecretAccessKey);

const policy = await iam.send(
  new CreatePolicyCommand({
    PolicyName: 'DeployBotPolicy',
    PolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['s3:PutObject', 's3:DeleteObject'],
          Resource: 'arn:aws:s3:::my-frontend-app-assets/*',
        },
        {
          Effect: 'Allow',
          Action: ['s3:ListBucket'],
          Resource: 'arn:aws:s3:::my-frontend-app-assets',
        },
        {
          Effect: 'Allow',
          Action: ['cloudfront:CreateInvalidation'],
          Resource: 'arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7',
        },
      ],
    }),
  }),
);

await iam.send(
  new AttachUserPolicyCommand({
    UserName: 'deploy-bot',
    PolicyArn: policy.Policy!.Arn!,
  }),
);
```

## نقاط التحقق

- مستخدم IAM باسم `deploy-bot` موجود دون وصول إلى وحدة التحكم
- مفاتيح الوصول منشأة ومخزّنة بأمان
- `DeployBotPolicy` سياسة يديرها العميل في حسابك
- السياسة تسمح بأربعة إجراءات بالضبط: `s3:PutObject` و`s3:DeleteObject` و`s3:ListBucket` و`cloudfront:CreateInvalidation`
- إجراءات S3 محدّدة النطاق عند `my-frontend-app-assets` (الحاوية والكائنات، بأنماط ARN الصحيحة)
- إجراء CloudFront محدّد النطاق عند التوزيع `E1A2B3C4D5E6F7`
- السياسة مرتبطة بالمستخدم `deploy-bot`
- الأمر `aws sts get-caller-identity --profile deploy-bot` يعيد الهوية الصحيحة

## تشخيص الفشل

- **يفشل `aws sts get-caller-identity` بخطأ `InvalidClientTokenId`:** الملف الشخصي المسمّى يستخدم زوج مفاتيح وصول خاطئًا، أو نُسخت المفاتيح بشكل خاطئ عند إنشائها.
- **تفشل أوامر النشر لاحقًا بخطأ `AccessDenied` على S3:** تحقّق مرة أخرى من أن إجراءات الكائنات تستخدم `arn:aws:s3:::my-frontend-app-assets/*` بينما يستخدم `s3:ListBucket` ARN الحاوية دون `/*`.
- **يفشل إبطال CloudFront رغم أن مزامنة S3 تعمل:** ARN التوزيع خاطئ. فأقواس ARN الخاصة بـ CloudFront تحذف مقطع المنطقة ويجب أن تشير إلى `E1A2B3C4D5E6F7` في الحساب `123456789012`.

## أهداف إضافية

- **اختبر الحدود.** جرّب تشغيل أمر لا ينبغي أن يملك بوت النشر وصولًا إليه—مثل `aws iam list-users --profile deploy-bot --region us-east-1 --output json`. تأكد من حصولك على خطأ `AccessDenied`. هذه هي السياسة وهي تؤدي عملها.
- **أضف عبارة Deny.** أضف عبارة Deny صريحة تمنع بوت النشر من حذف الحاوية نفسها (`s3:DeleteBucket`). تقنيًا، البوت لا يستطيع فعل ذلك أصلًا (فالإجراء ليس في عبارات Allow)، لكن Deny الصريح يعمل كحاجز أمان حتى لو وسّع شخص ما عبارات Allow لاحقًا.
- **استخدم Sids.** إن لم تضمّن حقول `Sid` في عبارات سياستك، فأضف حقولًا وصفية. فعندما تعود إلى هذه السياسة بعد ثلاثة أشهر، ستكون `"Sid": "AllowS3DeploySync"` أنفع من التحديق في قائمة إجراءات محاولًا تذكر الغرض منها.

عندما تجهز، قارن عملك بـ [الحل: سياسة IAM لبوت النشر](https://stevekinney.com/courses/aws/iam-policy-solution).

## التنظيف

أبقِ `deploy-bot` موجودًا—ستستخدمه مرة أخرى في درس CI/CD. وعندما تنتهي من الدورة بأكملها، شغّل هذا التسلسل لتفكيك المستخدم. لـ IAM قواعد ترتيب صارمة: عطّل مفتاح الوصول، ثم افصل السياسة، ثم احذف مفتاح الوصول، ثم احذف المستخدم. أخطئ خطوة واحدة ويفشل استدعاء `delete-user` الأخير بخطأ `DeleteConflict`.

أولًا، اعثر على معرّف مفتاح الوصول (الذي حفظته سابقًا يفي بالغرض أيضًا، لكن هذا يوفّر عليك التنقيب في ملاحظاتك):

```bash
aws iam list-access-keys \
  --user-name deploy-bot \
  --region us-east-1 \
  --output json
```

ثم عطّل المفتاح وأزله:

```bash
aws iam update-access-key \
  --user-name deploy-bot \
  --access-key-id AKIAEXAMPLE \
  --status Inactive \
  --region us-east-1

aws iam delete-access-key \
  --user-name deploy-bot \
  --access-key-id AKIAEXAMPLE \
  --region us-east-1
```

افصل السياسة واحذفها:

```bash
aws iam detach-user-policy \
  --user-name deploy-bot \
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \
  --region us-east-1

aws iam delete-policy \
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \
  --region us-east-1
```

أخيرًا، احذف المستخدم:

```bash
aws iam delete-user \
  --user-name deploy-bot \
  --region us-east-1
```

وأزل أيضًا الملف الشخصي المسمّى من تهيئة AWS المحلية بفتح `~/.aws/credentials` و`~/.aws/config` وحذف قسمَي `[deploy-bot]`.
