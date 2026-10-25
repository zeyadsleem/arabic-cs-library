---
title: "الحل"
---

إليك السياسة الكاملة، وأوامر CLI لتوصيلها، وشرحًا لكل قرار. سأستعرض كل بيان حتى ترى المنطق، لا النتيجة النهائية فقط.

## لماذا ينجح هذا

- تفصل السياسة بين أذونات مستوى الحاوية وأذونات مستوى الكائن، وهي حيلة IAM الأساسية التي تجعل التحكّم في وصول S3 يبدو أقل اعتباطية.
- إذن CloudFront محدّد النطاق بتوزيع واحد، لذا يستطيع روبوت النشر تحديث الذاكرة المؤقتة التي يملكها فعلًا فقط.
- فحص `get-caller-identity` الأخير يثبت أنك لم تُنشئ JSON لسياسة فحسب، بل أنشأت أصلًا يمكنه المصادقة ضمن الحدود التي أردتها.

> **نصيحة**
>
> إن أردت نسخة AWS من آليات السياسات أثناء عملك، فأبقِ [مرجع سياسات IAM بصيغة JSON](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) و[مرجع الأمر `aws iam create-policy`](https://docs.aws.amazon.com/cli/latest/reference/iam/create-policy.html) مفتوحين.

## السياسة

> **نصيحة**
>
> هذه السياسة متاحة باسم [`deploy-bot-policy.json`](https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/deploy-bot-policy.json) في مستودع Scratch Lab.

أنشئ ملفًا باسم `deploy-bot-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ObjectSync",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*"
    },
    {
      "Sid": "AllowS3ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets"
    },
    {
      "Sid": "AllowCloudFrontInvalidation",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7"
    }
  ]
}
```

### لماذا ثلاثة بيانات بدلًا من بيان واحد؟

يمكنك دمج إجراءات S3 في بيان واحد مع كلا ARN للمورد، هكذا:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Deploy",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::my-frontend-app-assets", "arn:aws:s3:::my-frontend-app-assets/*"]
    },
    {
      "Sid": "AllowCloudFrontInvalidation",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7"
    }
  ]
}
```

تعمل النسختان بشكل متطابق. تقيّم AWS كل إجراء مقابل كل مورد في المصفوفات—فـ`s3:ListBucket` يطابق ARN الحاوية، و`s3:PutObject`/`s3:DeleteObject` يطابقان ARN الكائنات. والنسخة المدمجة أكثر إيجازًا. أما النسخة المفصولة فتجعل من الواضح أي إجراءات تخص أي موارد. وكلا النهجين مقبول؛ اختر ما يراه فريقك أكثر قابلية للقراءة.

نسخة البيانات الثلاث أكثر توثيقًا لذاتها قليلًا: كل Sid يخبرك بالضبط بما يخصّه ذلك القسم. وعندما تنمو السياسة إلى عشرة أو خمسة عشر بيانًا، فإن الوضوح الإضافي يغطّي كلفته.

## شرح البيان تلو البيان

### البيان 1: AllowS3ObjectSync

```json
{
  "Sid": "AllowS3ObjectSync",
  "Effect": "Allow",
  "Action": ["s3:PutObject", "s3:DeleteObject"],
  "Resource": "arn:aws:s3:::my-frontend-app-assets/*"
}
```

- **`s3:PutObject`**—يطلبه `aws s3 sync` لتحميل الملفات الجديدة أو المتغيّرة.
- **`s3:DeleteObject`**—يطلبه `aws s3 sync --delete` لإزالة الملفات من S3 التي لم تعد موجودة في دليل البناء المحلي. وبدونه، تتراكم الملفات القديمة في حاويتك.
- **المورد ينتهي بـ`/*`**—تعمل هذه الإجراءات على كائنات فردية داخل الحاوية، لا على الحاوية نفسها. ونمط البدل `/*` يطابق كل مفتاح كائن في الحاوية.

ما لا تسمح به: `s3:GetObject` (قراءة الملفات مرة أخرى)، أو `s3:DeleteBucket` (حذف الحاوية نفسها)، أو أي إجراء S3 آخر. يستطيع روبوت النشر دفع الملفات وإزالة القديم منها. هذا كل شيء.

### البيان 2: AllowS3ListBucket

```json
{
  "Sid": "AllowS3ListBucket",
  "Effect": "Allow",
  "Action": ["s3:ListBucket"],
  "Resource": "arn:aws:s3:::my-frontend-app-assets"
}
```

- **`s3:ListBucket`**—يطلبه `aws s3 sync` لمقارنة الدليل المحلي بما هو موجود بالفعل في الحاوية. وبدون إذن السرد، لا يستطيع sync تحديد الملفات التي يجب تحميلها أو حذفها.
- **المورد بلا `/*`**—`ListBucket` عملية على مستوى الحاوية، لا على مستوى الكائن. ويشير ARN إلى الحاوية نفسها.

هذا هو الفرق الذي يوقع الناس في الخطأ أكثر من غيره. وكما ورد في [كتابة أول سياسة IAM لك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy)، فإن الخلط بين ARN الحاوية وARN الكائن هو السبب الأكثر شيوعًا لجلسات تصحيح «سياستي لا تعمل».

### البيان 3: AllowCloudFrontInvalidation

```json
{
  "Sid": "AllowCloudFrontInvalidation",
  "Effect": "Allow",
  "Action": ["cloudfront:CreateInvalidation"],
  "Resource": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7"
}
```

- **`cloudfront:CreateInvalidation`**—يخبر CloudFront بإبطال النسخ المخزّنة مؤقتًا من ملفاتك في مواقع الحافة حول العالم حتى يرى المستخدمون أحدث نشر.
- **المورد يستهدف توزيعًا واحدًا محدّدًا**—لا يستطيع روبوت النشر إبطال ذاكرة إلا هذا التوزيع، ولا أي توزيع آخر في الحساب.
- **لا منطقة في ARN**—CloudFront خدمة عالمية، لذا فمقطع المنطقة في ARN فارغ (`::` بين `cloudfront` ومعرّف الحساب).

ما لا تسمح به: `cloudfront:UpdateDistribution` (تغيير إعدادات التوزيع)، أو `cloudfront:DeleteDistribution` (إزالة التوزيع)، أو الإبطال على توزيعات أخرى. يستطيع روبوت النشر مسح الذاكرة المؤقتة. وانتهى الأمر.

## جولة كاملة في CLI

إليك كل الأوامر بالتسلسل:

### إنشاء المستخدم

```bash
aws iam create-user \
  --user-name deploy-bot \
  --region us-east-1 \
  --output json
```

### إنشاء مفاتيح الوصول

```bash
aws iam create-access-key \
  --user-name deploy-bot \
  --region us-east-1 \
  --output json
```

احفظ `AccessKeyId` و`SecretAccessKey` من الاستجابة.

### إنشاء السياسة

```bash
aws iam create-policy \
  --policy-name DeployBotPolicy \
  --policy-document file://deploy-bot-policy.json \
  --region us-east-1 \
  --output json
```

تتضمّن الاستجابة ARN الخاص بالسياسة:

```json
{
  "Policy": {
    "PolicyName": "DeployBotPolicy",
    "PolicyId": "ANPAIOSFODNN7EXAMPLE",
    "Arn": "arn:aws:iam::123456789012:policy/DeployBotPolicy",
    "Path": "/",
    "DefaultVersionId": "v1",
    "AttachmentCount": 0,
    "IsAttachable": true,
    "CreateDate": "2026-03-18T00:00:00Z"
  }
}
```

### إرفاق السياسة بالمستخدم

```bash
aws iam attach-user-policy \
  --user-name deploy-bot \
  --policy-arn arn:aws:iam::123456789012:policy/DeployBotPolicy \
  --region us-east-1 \
  --output json
```

### تهيئة ملف تعريف CLI لروبوت النشر

```bash
aws configure --profile deploy-bot
```

أدخل معرّف مفتاح الوصول، ومفتاح الوصول السرّي، و`us-east-1`، و`json`.

### التحقّق من الهوية

```bash
aws sts get-caller-identity \
  --profile deploy-bot \
  --region us-east-1 \
  --output json
```

المخرجات المتوقّعة:

```json
{
  "UserId": "AIDAIOSFODNN7EXAMPLE",
  "Account": "123456789012",
  "Arn": "arn:aws:iam::123456789012:user/deploy-bot"
}
```

### اختبار رفض الإجراءات غير المصرّح بها

```bash
aws iam list-users \
  --profile deploy-bot \
  --region us-east-1 \
  --output json
```

المتوقّع: خطأ `AccessDenied`. وهذا سلوك صحيح—فروبوت النشر لا يملك أذونات IAM. والسياسة تفعل بالضبط ما ينبغي.

## هدف إضافي: منع صريح على DeleteBucket

إن كنت قد حاولت الهدف الإضافي بإضافة منع صريح لـ`s3:DeleteBucket`، فهذا ما يبدو عليه:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ObjectSync",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*"
    },
    {
      "Sid": "AllowS3ListBucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets"
    },
    {
      "Sid": "AllowCloudFrontInvalidation",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7"
    },
    {
      "Sid": "DenyBucketDeletion",
      "Effect": "Deny",
      "Action": ["s3:DeleteBucket"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets"
    }
  ]
}
```

بيان `DenyBucketDeletion` زائد تقنيًا هنا—فرُوبوت النشر لا يملك أي Allow لـ`s3:DeleteBucket`، فهو ممنوع ضمنًا بالفعل. لكن كما نوقش في [مبدأ أقل امتياز](https://stevekinney.com/courses/aws/principle-of-least-privilege)، تعمل بيانات المنع الصريح كـ**حواجز أمان**. فإن عدّل أحدهم هذه السياسة لاحقًا وأضاف `s3:*` إلى بيان Allow بالخطأ، فسيظل المنع الصريح يمنع حذف الحاوية. دفاع في العمق.
