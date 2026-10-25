---
title: "الحل"
---

هذا هو الحل الكامل لـ[تمرين: تخزين سرّ واسترجاعه في Lambda](https://stevekinney.com/courses/aws/secrets-in-lambda-exercise). إذا وقعت في مشكلة، فلا تقلق — ثمة بعض المزالق هنا يتعثّر فيها الجميع في المرة الأولى.

## لماذا ينجح هذا

- يصبح Parameter Store مصدر الحقيقة للسرّ، ما يُخرج القيمة من نظام التحكّم بالمصادر ومن إعدادات Lambda.
- تُحمّل الدالة السرّ في وقت التهيئة، فتدفع كلفة البحث مرة واحدة لكل بيئة دافئة بدلًا من كل استدعاء.
- فحص الإعداد النهائي مهم لأن السرّ لا يكون قد انتقل فعلًا حتى يختفي من متغيّرات البيئة وإعدادات النشر.

إذا أردت نسخة AWS من سير عمل تخزين الأسرار مفتوحة أثناء عملك، فأبقِ [نظرة عامة على AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) و[توثيق Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) قريبًا منك.

## تخزين السرّ

```bash
aws ssm put-parameter \
  --name "/my-frontend-app/production/third-party-api-key" \
  --value "sk_test_exercise_abc123" \
  --type "SecureString" \
  --region us-east-1 \
  --output json
```

تحقّق منه:

```bash
aws ssm get-parameter \
  --name "/my-frontend-app/production/third-party-api-key" \
  --with-decryption \
  --region us-east-1 \
  --output json
```

المخرجات المتوقّعة:

```json
{
  "Parameter": {
    "Name": "/my-frontend-app/production/third-party-api-key",
    "Type": "SecureString",
    "Value": "sk_test_exercise_abc123",
    "Version": 1,
    "LastModifiedDate": "2026-03-18T10:00:00.000Z",
    "ARN": "arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/third-party-api-key"
  }
}
```

يمكنك أيضًا التحقّق من المعامل في وحدة تحكّم AWS تحت **Systems Manager → Parameter Store**:

![عرض تفاصيل Parameter Store وهو يُظهر معامل SecureString مع ARN الخاص به ونوعه وطبقته وقيمته المقنّعة.](/images/kinney/fdaed0203b072c70.webp)

## كتابة المعالج

إعداد المشروع:

```bash
mkdir -p lambda/src
cd lambda
npm init -y
npm install @aws-sdk/client-ssm
npm install -D typescript @types/aws-lambda @types/node
```

أنشئ `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

أضف سكربت البناء إلى `package.json`:

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

أنشئ `src/handler.ts`:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({});

let apiKey: string | undefined;

const loadConfig = async () => {
  if (apiKey) return;

  const response = await ssm.send(
    new GetParameterCommand({
      Name: '/my-frontend-app/production/third-party-api-key',
      WithDecryption: true,
    }),
  );

  apiKey = response.Parameter?.Value;
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await loadConfig();

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load API key from Parameter Store' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Secret loaded successfully from Parameter Store',
      keyPrefix: apiKey.slice(0, 7),
    }),
  };
};
```

*ملاحظة:* أنشئ العميل على مستوى الوحدة النمطية كي يُعاد استخدامه بين الاستدعاءات.

*ملاحظة:* تخطَّ استدعاء API إذا كانت القيمة مخزّنة مؤقتًا من استدعاء سابق.

ابنِ:

```bash
npm run build
```

## تحديث دور التنفيذ

أنشئ `parameter-store-policy.json` (وهو متاح أيضًا باسم [`parameter-store.json`](https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/parameter-store.json) في مستودع Scratch Lab):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter"],
      "Resource": "arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/third-party-api-key"
    },
    {
      "Effect": "Allow",
      "Action": ["kms:Decrypt"],
      "Resource": "arn:aws:kms:us-east-1:123456789012:alias/aws/ssm"
    }
  ]
}
```

أرفقه بدور التنفيذ:

```bash
aws iam put-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-name parameter-store-access \
  --policy-document file://parameter-store-policy.json \
  --output json
```

تحقّق من أن السياسة مرفقة:

```bash
aws iam list-role-policies \
  --role-name my-frontend-app-lambda-role \
  --output json
```

المخرجات المتوقّعة:

```json
{
  "PolicyNames": ["parameter-store-access"]
}
```

يمكنك أيضًا التحقّق من محتوى السياسة:

```bash
aws iam get-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-name parameter-store-access \
  --output json
```

## النشر والاستدعاء

حزّم الدالة. تُضمّن بيئة التشغيل `nodejs22.x` حزمة AWS SDK v3، لكن احزم `node_modules` على أي حال — إذ تثبّت AWS إصدارًا فرعيًا محدّدًا في بيئة التشغيل، لا الأحدث، وهو يتفاوت حسب المنطقة. وحزم نسختك الخاصة يعني أنك تتحكّم في الإصدار ولا تفاجئك تحديثات بيئة التشغيل:

```bash
cd lambda
npm run build
cd dist
cp -r ../node_modules .
zip -r ../function.zip .
cd ..
```

انشر — إن كنت تحدّث دالة موجودة:

```bash
aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

أو أنشئ دالة جديدة:

```bash
aws lambda create-function \
  --function-name my-frontend-app-api \
  --runtime nodejs22.x \
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \
  --handler handler.handler \
  --zip-file fileb://function.zip \
  --timeout 10 \
  --region us-east-1 \
  --output json
```

> **نصيحة**
>
> المهلة الافتراضية 3 ثوانٍ. ويتضمّن أول استدعاء (بدء بارد) استدعاء SDK إلى Parameter Store، وقد يستغرق ثانية أو ثانيتين. وضبط المهلة على 10 ثوانٍ يمنحك هامشًا واسعًا.

استدعِ الدالة:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --payload '{"requestContext":{"http":{"method":"GET","path":"/secret"}},"queryStringParameters":{}}' \
  --cli-binary-format raw-in-base64-out \
  --region us-east-1 \
  --output json \
  response.json
```

اقرأ الاستجابة:

```bash
cat response.json
```

المخرجات المتوقّعة:

```json
{
  "statusCode": 200,
  "headers": { "Content-Type": "application/json" },
  "body": "{\"message\":\"Secret loaded successfully from Parameter Store\",\"keyPrefix\":\"sk_test\"}"
}
```

قيمة `keyPrefix` هي `sk_test` — أول 7 أحرف من `sk_test_exercise_abc123`.

## التحقّق من أن السرّ ليس في متغيّرات البيئة

```bash
aws lambda get-function-configuration \
  --function-name my-frontend-app-api \
  --query 'Environment' \
  --region us-east-1 \
  --output json
```

إذا كانت لديك متغيّرات بيئة من تمرين سابق (مثل `TABLE_NAME`)، فستظهر هنا. أما مفتاح API فلا يظهر. فهو موجود في Parameter Store فقط.

## استكشاف الأخطاء وإصلاحها

**«AccessDeniedException» عند استدعاء الدالة.** دور التنفيذ تفتقده أذونات `ssm:GetParameter` أو `kms:Decrypt`. راجع مستند السياسة وتحقّق من إرفاقه بالدور الصحيح. وتحقّق أيضًا من أن ARN المعامل في السياسة يطابق اسم المعامل تمامًا — وتذكّر أن مسار ARN لا يضاعف الشرطة المائلة البادئة.

**خطأ «ParameterNotFound».** اسم المعامل في شفرتك لا يطابق الاسم الذي استخدمته في `put-parameter`. أسماء المعاملات حسّاسة لحالة الأحرف ويجب أن تتضمّن المسار الكامل مع الشرطة المائلة البادئة.

**انتهاء مهلة الدالة.** المهلة الافتراضية 3 ثوانٍ، وقد لا تكفي لبدء بارد يتضمّن استدعاء SDK. ارفع المهلة إلى 10 ثوانٍ بـ:

```bash
aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --timeout 10 \
  --region us-east-1 \
  --output json
```

**«Cannot find module '@aws-sdk/client-ssm'»** لم يُضمَّن دليل `node_modules` في ملف zip الخاص بالنشر. تتضمّن بيئة التشغيل `nodejs22.x` حزمة AWS SDK v3، لكن هذا التمرين يحزم نسخته الخاصة للتحكّم في الإصدار. تأكّد من نسخ `node_modules` إلى دليل `dist/` قبل الضغط.

## حل الهدف الإضافي: GetParametersByPath

خزّن معاملًا ثانيًا:

```bash
aws ssm put-parameter \
  --name "/my-frontend-app/production/api-endpoint" \
  --value "https://api.example.com/v1" \
  --type "String" \
  --region us-east-1 \
  --output json
```

حدّث سياسة IAM للسماح بـ`ssm:GetParametersByPath` وتوسيع المورد إلى بادئة المسار:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter", "ssm:GetParametersByPath"],
      "Resource": "arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/*"
    },
    {
      "Effect": "Allow",
      "Action": ["kms:Decrypt"],
      "Resource": "arn:aws:kms:us-east-1:123456789012:alias/aws/ssm"
    }
  ]
}
```

معالج محدّث باستخدام `GetParametersByPathCommand`:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({});

let config: Record<string, string> | undefined;

const loadConfig = async () => {
  if (config) return;

  const response = await ssm.send(
    new GetParametersByPathCommand({
      Path: '/my-frontend-app/production',
      WithDecryption: true,
      Recursive: true,
    }),
  );

  config = {};
  for (const param of response.Parameters ?? []) {
    if (param.Name && param.Value) {
      const key = param.Name.replace('/my-frontend-app/production/', '');
      config[key] = param.Value;
    }
  }
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await loadConfig();

  if (!config) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load configuration' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'All configuration loaded from Parameter Store',
      parameters: Object.keys(config),
      apiEndpoint: config['api-endpoint'],
      keyPrefix: config['third-party-api-key']?.slice(0, 7),
    }),
  };
};
```

تتضمّن الاستجابة الآن المعاملين، محمّلين في استدعاء API واحد.

## التنظيف

احذف معاملات Parameter Store عندما تنتهي:

```bash
aws ssm delete-parameters \
  --names \
    "/my-frontend-app/production/third-party-api-key" \
    "/my-frontend-app/production/api-endpoint" \
  --region us-east-1 \
  --output json
```

معاملات الطبقة القياسية مجانية، لذا فالأمر تنظيمٌ لا شأن له بالتكلفة — لكنه يُبقي فضاء أسماء المعاملات نظيفًا.
