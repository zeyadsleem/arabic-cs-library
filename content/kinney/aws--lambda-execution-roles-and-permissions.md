---
title: "أدوار التنفيذ والأذونات"
lang: ar
source: "https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions"
---

كل دالة Lambda تحتاج إلى إذن لفعل الأشياء—كتابة السجلات، والقراءة من DynamoDB، والوصول إلى S3. لكن دوال Lambda ليس لديها أسماء مستخدمين أو مفاتيح وصول. بدلًا من ذلك، تفترض كل دالة دور IAM عند تشغيلها. هذا هو **دور التنفيذ**، وهو أهم قرار أمني واحد تتخذه لكل دالة.

إذا أردت نسخة AWS من نموذج الأذونات نفسه أثناء القراءة، فإن [دليل دور تنفيذ Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html) هو المرجع الرسمي.

إذا كنت قد عملت على [النموذج الذهني لـ IAM](https://stevekinney.com/courses/aws/iam-mental-model)، فأنت تعرف بالفعل كيف تعمل الأدوار: الدور مجموعة من الأذونات يمكن لخدمة AWS أن تفترضها. دور التنفيذ هو ذلك المفهوم نفسه مطبّقًا على Lambda. تقول دالتك «أنا `my-frontend-app-api`»، فتقول Lambda «دعني أتحقق من الدور الذي يُفترض أن تفترضه»، ثم تحدد سياسات الدور ما تستطيع دالتك فعله.

## ما هو دور التنفيذ

يتكوّن **دور التنفيذ** من جزأين:

1. **سياسة الثقة**—تُخبر AWS أي خدمة يُسمح لها بافتراض هذا الدور. بالنسبة إلى Lambda، الخدمة الموثوقة هي `lambda.amazonaws.com`.
2. **سياسات الأذونات**—الأذونات الفعلية التي تحصل عليها الدالة عند تشغيلها. وهي نفس سياسات IAM التي كتبتها في [كتابة أول سياسة IAM لك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy).

```
flowchart LR
    Lambda["Lambda function"] --> STS["Assume execution role"]
    STS --> Role["IAM execution role"]
    Role --> Logs["CloudWatch Logs permissions"]
    Role --> DynamoDB["DynamoDB permissions"]
    Role --> Secrets["SSM and Secrets permissions"]
```

من دون دور تنفيذ، لا تستطيع Lambda تشغيل دالتك إطلاقًا. الدور معامل مطلوب عند إنشاء الدالة.

## إنشاء سياسة الثقة

سياسة الثقة مستند JSON يجيب عن سؤال واحد: «من يُسمح له بافتراض هذا الدور؟» بالنسبة إلى Lambda، الجواب هو خدمة Lambda دائمًا.

أنشئ ملفًا باسم `trust-policy.json` (متوفر أيضًا باسم [`lambda-trust-policy.json`](https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/lambda-trust-policy.json) في مستودع Scratch Lab):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

تقول هذه السياسة: «خدمة Lambda (`lambda.amazonaws.com`) مسموح لها بافتراض هذا الدور باستخدام إجراء `sts:AssumeRole`». حقل **Principal** هو ما يجعل هذه سياسة ثقة لا سياسة أذونات—فهو يحدّد من يستطيع استخدام الدور، لا ما يستطيع الدور فعله.

> **تحذير**
>
> سياسة الثقة ليست مثل سياسات الأذونات التي ترفقها بالدور. تتحكم سياسة الثقة بمن يستطيع *افتراض* الدور. أما سياسات الأذونات فتتحكم بما يستطيع الدور *فعله* بعد افتراضه. الخلط بينهما مصدر شائع للارتباك.

إذا احتجت يومًا إلى التحقق مما تقوله سياسة ثقة دور ما فعلًا (مثلًا لأنك تتعقّب خطأ `AccessDenied` في استدعاء `sts:AssumeRole`)، فاقرأ حقل `AssumeRolePolicyDocument` في الدور:

```bash
aws iam get-role \
  --role-name my-frontend-app-lambda-role \
  --query 'Role.AssumeRolePolicyDocument' \
  --output json
```

ينبغي أن يُظهر الإخراج `lambda.amazonaws.com` كأصل موثوق. إذا وجدت فيه شيئًا آخر—أو كان الأصل هو `Service: "*"`—فهذا هو خطؤك.

## إنشاء الدور

استخدم AWS CLI لإنشاء دور التنفيذ:

```bash
aws iam create-role \
  --role-name my-frontend-app-lambda-role \
  --assume-role-policy-document file://trust-policy.json \
  --region us-east-1 \
  --output json
```

تتضمن الاستجابة ARN الخاص بالدور، وستحتاجه عند إنشاء دالة Lambda:

```json
{
  "Role": {
    "RoleName": "my-frontend-app-lambda-role",
    "Arn": "arn:aws:iam::123456789012:role/my-frontend-app-lambda-role",
    "AssumeRolePolicyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    }
  }
}
```

احفظ قيمة ARN هذه. ستمرّرها إلى `aws lambda create-function` في الدرس التالي.

في وحدة التحكم، يتولّى معالج **Create role** ذلك في خطوة **Select trusted entity**—اختر **AWS service**، ثم اختر **Lambda** كحالة الاستخدام.

صفحة IAM Create Role مع اختيار AWS service كنوع الكيان الموثوق وLambda كاختيار الخدمة أو حالة الاستخدام.

## إرفاق سياسة التنفيذ الأساسية

دالة Lambda التي لا تستطيع كتابة السجلات هي دالة Lambda لا تستطيع تصحيح أخطائها. توفّر AWS سياسة مُدارة باسم **`AWSLambdaBasicExecutionRole`** تمنح ثلاثة أذونات بالضبط:

- `logs:CreateLogGroup`—إنشاء مجموعة سجلات CloudWatch للدالة
- `logs:CreateLogStream`—إنشاء تدفّق سجلات داخل تلك المجموعة
- `logs:PutLogEvents`—كتابة مدخلات السجل

أرفقها بدورك:

```bash
aws iam attach-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
  --region us-east-1 \
  --output json
```

هذا هو دور التنفيذ الأدنى القابل للعمل. يجب أن تكون هذه السياسة مرفقة بكل دالة Lambda على الأقل حتى يظهر إخراج `console.log` في مكان ما فعلًا.

في وحدة التحكم، تُظهر علامة التبويب **Permissions** للدور المكتمل سياسة `AWSLambdaBasicExecutionRole` المرفقة.

صفحة تفاصيل دور IAM تُظهر سياسة AWSLambdaBasicExecutionRole مرفقة في قسم Permissions policies. تكتب Lambda السجلات إلى CloudWatch Logs. ستتعمّق في CloudWatch على نحو صحيح في قسم CloudWatch، لكن هذه السياسة الآن تضمن ألا تُهمَل سجلاتك بصمت.

> **نصيحة**
>
> يبدأ ARN للسياسات المُدارة من AWS دائمًا بـ `arn:aws:iam::aws:policy/`. كلمة `aws` في موضع الحساب تخبرك أن هذه سياسة تديرها AWS، لا سياسة أنشأتها أنت. بادئة المسار `service-role/` عرف للسياسات المصمّمة لتُرفق بأدوار الخدمات.

## إضافة أذونات مخصصة

تغطي سياسة التنفيذ الأساسية التسجيل فقط. كلما كبر تطبيقك، ستحتاج دالتك إلى الوصول إلى خدمات AWS أخرى. تضيف هذه الأذونات بإنشاء سياسات إضافية وإرفاقها. بصراحة، هنا يبدأ IAM في أن يبدو ملموسًا—فأنت لم تعد تكتب سياسات مجردة فقط، بل تقرّر بالضبط ما يمكن لكودك العامل أن يلمسه.

مثلًا، إذا كانت دالتك تحتاج إلى القراءة من حاوية S3:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Read",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-frontend-app-assets/*"
    }
  ]
}
```

احفظ هذا باسم `lambda-s3-policy.json` وأرفقه:

```bash
aws iam create-policy \
  --policy-name MyFrontendAppLambdaS3Read \
  --policy-document file://lambda-s3-policy.json \
  --region us-east-1 \
  --output json

aws iam attach-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaS3Read \
  --region us-east-1 \
  --output json
```

ينطبق مبدأ الامتياز الأقل من [مبدأ الامتياز الأقل](https://stevekinney.com/courses/aws/principle-of-least-privilege) هنا تمامًا كما انطبق مع مستخدمي IAM: امنح فقط الأذونات التي تحتاجها دالتك فعلًا، محدّدة النطاق إلى الموارد التي تصل إليها. لا ينبغي أن تحصل دالة Lambda تقرأ جدول DynamoDB واحدًا على `dynamodb:*` على `*`.

## الأذونات التي ستحتاجها دالتك

مع تقدمك في الدورة، ستضيف سياسات إلى دور التنفيذ هذا تدريجيًا:

| القسم | الخدمة | الإجراءات | السبب |
| --- | --- | --- | --- |
| قسم Lambda (الآن) | CloudWatch Logs | `logs:CreateLogGroup`، `logs:CreateLogStream`، `logs:PutLogEvents` | تسجيل الدالة |
| قسم DynamoDB | DynamoDB | `dynamodb:GetItem`، `dynamodb:PutItem`، `dynamodb:Query`، إلخ. | قراءة البيانات وكتابتها |
| قسم الأسرار | Parameter Store / Secrets Manager | `ssm:GetParameter`، `secretsmanager:GetSecretValue` | الوصول إلى الإعدادات والأسرار |

في كل مرة تضيف تكاملًا جديدًا، ستنشئ سياسة جديدة محدّدة النطاق إلى الموارد التي تحتاجها دالتك بالضبط وترفقها بالدور القائم. دور واحد، سياسات متعددة. هذا يُبقي أذوناتك قابلة للتدقيق ويجعل واضحًا ما تستطيع دالتك فعله.

## مع SDK

```typescript
import {
  IAMClient,
  CreateRoleCommand,
  AttachRolePolicyCommand,
  PutRolePolicyCommand,
  ListAttachedRolePoliciesCommand,
} from '@aws-sdk/client-iam';

const iam = new IAMClient({ region: 'us-east-1' });

const role = await iam.send(
  new CreateRoleCommand({
    RoleName: 'my-frontend-app-lambda-role',
    AssumeRolePolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { Service: 'lambda.amazonaws.com' },
          Action: 'sts:AssumeRole',
        },
      ],
    }),
  }),
);

await iam.send(
  new AttachRolePolicyCommand({
    RoleName: 'my-frontend-app-lambda-role',
    PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
  }),
);

// Inline policy for scoped S3 read:
await iam.send(
  new PutRolePolicyCommand({
    RoleName: 'my-frontend-app-lambda-role',
    PolicyName: 'S3AssetsRead',
    PolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['s3:GetObject'],
          Resource: 'arn:aws:s3:::my-frontend-app-assets/*',
        },
      ],
    }),
  }),
);

const attached = await iam.send(
  new ListAttachedRolePoliciesCommand({ RoleName: 'my-frontend-app-lambda-role' }),
);
console.log(attached.AttachedPolicies);
```

## التحقق من الدور

يمكنك التحقق من السياسات المرفقة بدورك:

```bash
aws iam list-attached-role-policies \
  --role-name my-frontend-app-lambda-role \
  --region us-east-1 \
  --output json
```

الإخراج المتوقع:

```json
{
  "AttachedPolicies": [
    {
      "PolicyName": "AWSLambdaBasicExecutionRole",
      "PolicyArn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    }
  ]
}
```

إذا رأيت `AWSLambdaBasicExecutionRole` في القائمة، فدورك جاهز للخطوة التالية: نشر الدالة.

## أخطاء شائعة

**استخدام أصل سياسة الثقة الخطأ.** إذا نسخت سياسة ثقة من مثال EC2، فسيكون الأصل `ec2.amazonaws.com` ولن تستطيع Lambda افتراض الدور. رسالة الخطأ—«The role defined for the function cannot be assumed by Lambda»—واضحة بمجرد أن تعرف ما تبحث عنه، لكنها مربكة في المرة الأولى.

**إرفاق `AdministratorAccess` لجعل الأمور تعمل.** هذا مغرٍ أثناء التطوير وكارثي في الإنتاج. دالة Lambda بوصول إداري يمكنها حذف موارد حساب AWS بأكمله. استخدم الأذونات الدنيا، حتى أثناء التطوير. إذا فشلت دالتك بخطأ رفض وصول، فستخبرك رسالة الخطأ بالضبط أي إجراء ومورد تحتاج إلى إضافته.

**نسيان الانتظار حتى ينتشر الدور.** تغييرات IAM متسقة نهائيًا. إذا أنشأت دورًا ثم أنشأت دالة Lambda به فورًا، فقد يفشل إنشاء الدالة لأن IAM لم ينشر الدور إلى كل نقاط نهاية AWS بعد. انتظر 10–15 ثانية—أو إذا كنت تكتب النشر كنص برمجي، فأضف منطق إعادة المحاولة مع تراجع على استدعاء `create-function` بدلًا من انتظار ثابت، لأن زمن الانتشار غير مضمون.

أصبح لديك دور تنفيذ بأذونات تسجيل. في الدرس التالي، ستحزم معالج TypeScript الخاص بك في ملف zip للنشر وتستخدم `aws lambda create-function` لنشره بهذا الدور.
