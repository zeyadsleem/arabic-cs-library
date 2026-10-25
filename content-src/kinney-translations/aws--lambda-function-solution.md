---
title: "الحل"
---

إليك الحل الكامل لكل خطوة، بما في ذلك كود المعالج، وسياسة الثقة، وكل أوامر CLI، والإخراج المتوقع في كل مرحلة.

## لماذا ينجح هذا

- دور التنفيذ وسياسة الثقة يحلّان مشكلتين مختلفتين: أحدهما يخبر Lambda أنها تستطيع افتراض الدور، والآخر يخبر الدور بما تستطيع الدالة فعله بعد ذلك.
- حزم `dist/handler.js` في ملف zip للنشر يمنح Lambda بالضبط الملف التنفيذي الذي تتوقعه وقت التشغيل بدلًا من أن تطلب منها تحويل TypeScript نيابةً عنك.
- استدعاء CLI وفحوص سجلات CloudWatch يثبتان كلا شقّي النظام: مسار الكود ومسار التشغيل.

> **نصيحة**
>
> إذا بدا إخراج وحدة التحكم أو CLI مختلفًا قليلًا عند تنفيذك لذلك، فأبقِ [مرجع أمر `aws lambda create-function`](https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html) و[مرجع أمر `aws lambda update-function-code`](https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html) مفتوحين.

## إعداد المشروع

```bash
mkdir -p lambda/src
cd lambda
npm init -y
npm install -D typescript @types/aws-lambda @types/node
```

### `lambda/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
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

### `lambda/package.json` (قسم scripts)

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

## المعالج

> **نصيحة**
>
> جميع معالجات Lambda، وملفات `tsconfig.json`، وملفات JSON لأحداث الاختبار من هذه الدورة متوفرة في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/tree/main/lambda).

### `lambda/src/handler.ts`

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

interface GreetingResponse {
  greeting: string;
  timestamp: string;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const name = event.queryStringParameters?.name ?? 'World';

  const response: GreetingResponse = {
    greeting: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
  };

  console.log('Greeting request:', { name, timestamp: response.timestamp });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  };
};
```

*ملاحظة:* يتعامل العاملان `?.` و`??` مع الحالة التي تكون فيها `queryStringParameters` مساوية لـ `undefined`.

### البناء

```bash
cd lambda
npm run build
```

المتوقع: إنشاء `dist/handler.js`، و`dist/handler.js.map`، و`dist/handler.d.ts`، و`dist/handler.d.ts.map` من دون أخطاء.

## دور التنفيذ

### `trust-policy.json`

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

### إنشاء الدور

```bash
aws iam create-role \
  --role-name my-frontend-app-lambda-role \
  --assume-role-policy-document file://trust-policy.json \
  --region us-east-1 \
  --output json
```

الإخراج المتوقع:

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

### إرفاق سياسة التنفيذ الأساسية

```bash
aws iam attach-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
  --region us-east-1 \
  --output json
```

### التحقق من الدور

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

## التغليف والنشر

### إنشاء ملف zip للنشر

```bash
cd lambda/dist
zip -r ../function.zip .
cd ..
```

### إنشاء الدالة

```bash
aws lambda create-function \
  --function-name my-frontend-app-api \
  --runtime nodejs22.x \
  --architectures arm64 \
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \
  --handler handler.handler \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

الإخراج المتوقع:

```json
{
  "FunctionName": "my-frontend-app-api",
  "FunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api",
  "Runtime": "nodejs22.x",
  "Architectures": ["arm64"],
  "Role": "arn:aws:iam::123456789012:role/my-frontend-app-lambda-role",
  "Handler": "handler.handler",
  "CodeSize": 1523,
  "Timeout": 3,
  "MemorySize": 128,
  "LastUpdateStatus": "Successful",
  "State": "Active"
}
```

> **نصيحة**
>
> إذا ظهرت لك رسالة «The role defined for the function cannot be assumed by Lambda»، فانتظر 10-15 ثانية وحاول مرة أخرى. انتشار دور IAM متسق نهائيًا—فالدور موجود، لكن نقطة نهاية Lambda ربما لم تره بعد.

### التحقق من وجود الدالة

```bash
aws lambda get-function \
  --function-name my-frontend-app-api \
  --region us-east-1 \
  --output json
```

## استدعاء الدالة

### حدث اختبار مع معامل name

احفظه باسم `test-event.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/greeting"
    }
  },
  "queryStringParameters": {
    "name": "Lambda"
  }
}
```

استدعِ الدالة:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-event.json \
  --region us-east-1 \
  --output json \
  response.json
```

إخراج الطرفية المتوقع:

```json
{
  "StatusCode": 200,
  "ExecutedVersion": "$LATEST"
}
```

تحقق من الاستجابة:

```bash
cat response.json
```

المتوقع (منسّق للقراءة):

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "{\"greeting\":\"Hello, Lambda!\",\"timestamp\":\"2026-03-18T12:00:00.000Z\"}"
}
```

حقل `body` كائن JSON محوّل إلى سلسلة نصية. إذا حلّلته، فستحصل على:

```json
{
  "greeting": "Hello, Lambda!",
  "timestamp": "2026-03-18T12:00:00.000Z"
}
```

في وحدة التحكم، تُظهر علامة التبويب **Test** النتيجة نفسها مع حالة التنفيذ وجسم الاستجابة موسّعين.

![علامة تبويب Lambda Test تُظهر نتيجة التنفيذ بحالة Succeeded، مع statusCode 200 وجسم Hello from Lambda ظاهرًا في قسم Details.](/images/kinney/4fac9aa0efe62bc5.webp)

### حدث اختبار بدون معامل name

احفظه باسم `test-event-no-name.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/greeting"
    }
  }
}
```

استدعِ الدالة:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-event-no-name.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

الجسم المتوقع:

```json
{
  "greeting": "Hello, World!",
  "timestamp": "2026-03-18T12:00:05.000Z"
}
```

تُستخدم القيمة الافتراضية `"World"` عندما تكون `queryStringParameters` مفقودة أو لا تتضمن `name`.

## قراءة السجلات

### التحقق من وجود مجموعة السجلات

```bash
aws logs describe-log-groups \
  --log-group-name-prefix /aws/lambda/my-frontend-app-api \
  --region us-east-1 \
  --output json
```

الإخراج المتوقع:

```json
{
  "logGroups": [
    {
      "logGroupName": "/aws/lambda/my-frontend-app-api",
      "arn": "arn:aws:logs:us-east-1:123456789012:log-group:/aws/lambda/my-frontend-app-api:*",
      "storedBytes": 1234
    }
  ]
}
```

### قراءة أحدث أحداث السجل

```bash
aws logs describe-log-streams \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --order-by LastEventTime \
  --descending \
  --limit 1 \
  --region us-east-1 \
  --output json
```

استخدم `logStreamName` من الاستجابة لجلب الأحداث:

```bash
aws logs get-log-events \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --log-stream-name "2026/03/18/[$LATEST]abcdef1234567890" \
  --region us-east-1 \
  --output json
```

ينبغي أن ترى مدخلات سجل تتضمن:

- `START RequestId: ...`
- إخراج `console.log` الخاص بك: `Greeting request: { name: 'Lambda', timestamp: '...' }`
- `END RequestId: ...`
- `REPORT RequestId: ... Duration: X.XX ms Billed Duration: XX ms Memory Size: 128 MB Max Memory Used: XX MB Init Duration: XXX.XX ms`

يظهر سطر `Init Duration` في استدعاءات البدء البارد فقط. إذا استدعيت الدالة مرة ثانية بسرعة، فلن يظهر—لأن الاستدعاء الثاني أعاد استخدام بيئة التنفيذ الدافئة.

## هدف إضافي: متغيّر بيئة

### ضبط متغيّر البيئة

```bash
aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --environment 'Variables={GREETING_PREFIX=Howdy}' \
  --region us-east-1 \
  --output json
```

### تحديث المعالج لاستخدامه

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

interface GreetingResponse {
  greeting: string;
  timestamp: string;
}

const prefix = process.env.GREETING_PREFIX ?? 'Hello';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const name = event.queryStringParameters?.name ?? 'World';

  const response: GreetingResponse = {
    greeting: `${prefix}, ${name}!`,
    timestamp: new Date().toISOString(),
  };

  console.log('Greeting request:', { name, prefix, timestamp: response.timestamp });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  };
};
```

### إعادة البناء وإعادة النشر

```bash
cd lambda
npm run build
cd dist && zip -r ../function.zip . && cd ..

aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

### الاستدعاء والتحقق

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-event.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

الجسم المتوقع:

```json
{
  "greeting": "Howdy, Lambda!",
  "timestamp": "2026-03-18T12:05:00.000Z"
}
```

تغيّرت بادئة التحية من `"Hello"` إلى `"Howdy"` من دون تغيير منطق الكود—فقط متغيّر البيئة.

## هدف إضافي: قياس البدء البارد

استدعِ الدالة مع تتبّع السجل:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-event.json \
  --log-type Tail \
  --region us-east-1 \
  --output json \
  response.json
```

تتضمن الاستجابة حقل `LogResult` يحتوي إخراج سجل مشفّرًا بـ base64. يمكنك التقاطه وفكّ ترميزه في استدعاء واحد باستبدال `--output json` بـ `--query 'LogResult' --output text` — فهذا يوجّه سلسلة السجل مباشرة إلى `base64 --decode`:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-event.json \
  --log-type Tail \
  --region us-east-1 \
  --query 'LogResult' \
  --output text \
  response.json | base64 --decode
```

يُكتب `response.json` رغم ذلك (فهو معامل ملف الإخراج الموضعي)، ويصل حقل `LogResult` إلى stdout من أجل الأنبوب.

في البدء البارد، يتضمن الإخراج:

```
REPORT RequestId: abc-123 Duration: 12.34 ms Billed Duration: 13 ms
Memory Size: 128 MB Max Memory Used: 67 MB Init Duration: 198.45 ms
```

استدعِ الدالة فورًا مرة أخرى. يختفي حقل `Init Duration`—لأن الاستدعاء الثاني كان بدءًا دافئًا.

## التنظيف

> **ملاحظة**
>
> تُعاد دالة `my-frontend-app-api` ومجموعة سجلات CloudWatch الخاصة بها استخدامًا في بقية هذه الدورة—في أقسام API Gateway وDynamoDB وSecrets Manager وCloudWatch. لا تنظّف إلا إذا انتهيت من الدورة بالكامل.

```bash
aws lambda delete-function \
  --function-name my-frontend-app-api \
  --region us-east-1

# The log group is NOT deleted automatically when the function is deleted
aws logs delete-log-group \
  --log-group-name /aws/lambda/my-frontend-app-api \
  --region us-east-1
```
