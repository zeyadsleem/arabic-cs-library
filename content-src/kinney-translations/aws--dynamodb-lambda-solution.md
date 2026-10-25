---
title: "الحل"
---

هذا هو الحل الكامل لكل خطوة، بما في ذلك إنشاء جدول DynamoDB، وسياسة IAM، وكود المعالج، وأوامر النشر، والمخرجات المتوقعة في كل مرحلة.

## لماذا ينجح هذا

- يتماشى مخطط الجدول مع نمط الوصول في المعالج: يجمّع `userId` عناصر مستخدم واحد معًا، ويحدّد `itemId` كل سجل بشكل فريد داخل ذلك القسم.
- دور Lambda محدود بجدول واحد، فتحصل الواجهة البرمجية على وصول البيانات الذي تحتاجه بالضبط دون أن يتحوّل إلى `dynamodb:*` على `*`.
- تُثبت اختبارات POST وGET وDELETE دورة حياة الطلب كاملة، وليس فقط ما إذا كان DynamoDB قد قبل تعريف الجدول.

> **نصيحة**
>
> إذا أردت إبقاء نسخة AWS من سلوك الجدول والاستعلام مفتوحة أثناء عملك، فأبقِ [مرجع الأمر `aws dynamodb create-table`](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/create-table.html) و[دليل DynamoDB Query](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html) و[دليل DynamoDB Scan](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html) في متناول يدك.

## إنشاء جدول DynamoDB

```bash
aws dynamodb create-table \
  --table-name my-frontend-app-data \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=itemId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=itemId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "TableDescription": {
    "TableName": "my-frontend-app-data",
    "TableStatus": "CREATING",
    "KeySchema": [
      {
        "AttributeName": "userId",
        "KeyType": "HASH"
      },
      {
        "AttributeName": "itemId",
        "KeyType": "RANGE"
      }
    ],
    "BillingModeSummary": {
      "BillingMode": "PAY_PER_REQUEST"
    },
    "TableArn": "arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data"
  }
}
```

انتظر حتى يصبح الجدول نشطًا:

```bash
aws dynamodb wait table-exists \
  --table-name my-frontend-app-data \
  --region us-east-1
```

تحقّق:

```bash
aws dynamodb describe-table \
  --table-name my-frontend-app-data \
  --region us-east-1 \
  --output json \
  --query "Table.TableStatus"
```

المخرجات المتوقعة: `"ACTIVE"`

## إضافة أذونات DynamoDB إلى دور Lambda

### `lambda-dynamodb-policy.json`

هذه السياسة متاحة بصيغة [`lambda-dynamodb.json`](https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/lambda-dynamodb.json) في مستودع Scratch Lab.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowDynamoDBAccess",
      "Effect": "Allow",
      "Action": ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:Query"],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data"
    }
  ]
}
```

### إنشاء السياسة وإرفاقها

```bash
aws iam create-policy \
  --policy-name MyFrontendAppLambdaDynamoDB \
  --policy-document file://lambda-dynamodb-policy.json \
  --region us-east-1 \
  --output json
```

```bash
aws iam attach-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB \
  --region us-east-1 \
  --output json
```

### التحقق

```bash
aws iam list-attached-role-policies \
  --role-name my-frontend-app-lambda-role \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "AttachedPolicies": [
    {
      "PolicyName": "AWSLambdaBasicExecutionRole",
      "PolicyArn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    },
    {
      "PolicyName": "MyFrontendAppLambdaDynamoDB",
      "PolicyArn": "arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB"
    }
  ]
}
```

## تثبيت SDK وتحديث المعالج

```bash
cd lambda
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

### `lambda/src/handler.ts`

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME ?? 'my-frontend-app-data';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;
  const userId = event.queryStringParameters?.userId;

  if (!userId) {
    return respond(400, { error: 'Missing userId parameter' });
  }

  try {
    switch (method) {
      case 'GET': {
        const itemId = event.queryStringParameters?.itemId;

        if (itemId) {
          const result = await client.send(
            new GetCommand({
              TableName: TABLE_NAME,
              Key: { userId, itemId },
            }),
          );

          if (!result.Item) {
            return respond(404, { error: 'Item not found' });
          }

          return respond(200, result.Item);
        }

        const result = await client.send(
          new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: { ':userId': userId },
          }),
        );

        return respond(200, { items: result.Items ?? [] });
      }

      case 'POST': {
        const body = JSON.parse(event.body ?? '{}');

        if (!body.title) {
          return respond(400, { error: 'Missing title in request body' });
        }

        const itemId = crypto.randomUUID();

        const item = {
          userId,
          itemId,
          title: body.title,
          status: body.status ?? 'pending',
          createdAt: new Date().toISOString(),
        };

        await client.send(
          new PutCommand({
            TableName: TABLE_NAME,
            Item: item,
          }),
        );

        return respond(201, item);
      }

      case 'DELETE': {
        const itemId = event.queryStringParameters?.itemId;

        if (!itemId) {
          return respond(400, { error: 'Missing itemId parameter' });
        }

        await client.send(
          new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { userId, itemId },
          }),
        );

        return respond(200, { deleted: true });
      }

      default:
        return respond(405, { error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Handler error:', error);
    return respond(500, { error: 'Internal server error' });
  }
};

function respond(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}
```

*ملاحظة:* يُنشأ العميل خارج المعالج كي يبقى عبر الاستدعاءات الدافئة.

### البناء

```bash
cd lambda
npm run build
```

المتوقع: يُنشأ `dist/handler.js` بلا أي أخطاء TypeScript.

## تعيين متغيّر البيئة والنشر

### تعيين متغيّر البيئة

```bash
aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --environment 'Variables={TABLE_NAME=my-frontend-app-data}' \
  --region us-east-1 \
  --output json
```

### الحزم والنشر

```bash
cd lambda/dist
zip -r ../function.zip .
cd ..

aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

### التحقق من متغيّر البيئة

```bash
aws lambda get-function-configuration \
  --function-name my-frontend-app-api \
  --region us-east-1 \
  --output json \
  --query "Environment"
```

المخرجات المتوقعة:

```json
{
  "Variables": {
    "TABLE_NAME": "my-frontend-app-data"
  }
}
```

## اختبار إنشاء عنصر

احفظ الملف باسم `test-create.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "POST",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123"
  },
  "body": "{\"title\": \"Learn DynamoDB\"}"
}
```

استدعِ الدالة:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-create.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

الاستجابة المتوقعة (منسّقة):

```json
{
  "statusCode": 201,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "{\"userId\":\"user-123\",\"itemId\":\"a1b2c3d4-e5f6-7890-abcd-ef1234567890\",\"title\":\"Learn DynamoDB\",\"status\":\"pending\",\"createdAt\":\"2026-03-18T12:00:00.000Z\"}"
}
```

ستختلف قيمتا `itemId` (وهي UUID) و`createdAt` بحسب وقت تشغيلك الأمر.

في وحدة التحكم، يُظهر الاستدعاء نفسه عبر تبويب **Test** نتيجة التنفيذ مع رمز الحالة 201 وبيانات العنصر.

يعرض تبويب Test في Lambda نتيجة التنفيذ بحالة Succeeded، مع إظهار جسم الاستجابة عنصر DynamoDB أُنشئ حديثًا.

### إنشاء عنصر ثانٍ

احفظ الملف باسم `test-create-2.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "POST",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123"
  },
  "body": "{\"title\": \"Deploy to production\"}"
}
```

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-create-2.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

## اختبار سرد العناصر

احفظ الملف باسم `test-list.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123"
  }
}
```

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-list.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

المتوقع: `statusCode: 200` مع جسم يحتوي مصفوفة `items` تضمّ العنصرين معًا.

عند تحليل الجسم:

```json
{
  "items": [
    {
      "userId": "user-123",
      "itemId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Learn DynamoDB",
      "status": "pending",
      "createdAt": "2026-03-18T12:00:00.000Z"
    },
    {
      "userId": "user-123",
      "itemId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Deploy to production",
      "status": "pending",
      "createdAt": "2026-03-18T12:00:01.000Z"
    }
  ]
}
```

## اختبار حذف عنصر

استخدم `itemId` من العنصر الأول الذي أنشأته. احفظ الملف باسم `test-delete.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "DELETE",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123",
    "itemId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  }
}
```

استبدل `a1b2c3d4-e5f6-7890-abcd-ef1234567890` بقيمة `itemId` الفعلية من استجابة POST.

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-delete.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

المتوقع: `statusCode: 200` مع الجسم `{"deleted":true}`.

### التحقق من اختفاء العنصر

أعد تشغيل اختبار السرد:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-list.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

المتوقع: تحتوي مصفوفة `items` الآن على عنصر واحد فقط — عنصر «Deploy to production».

## اختبار حالات الخطأ

### معامل userId المفقود

احفظ الملف باسم `test-no-user.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/"
    }
  },
  "queryStringParameters": {}
}
```

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-no-user.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

المتوقع: `statusCode: 400` مع الجسم `{"error":"Missing userId parameter"}`.

### طريقة غير مدعومة

احفظ الملف باسم `test-put.json`:

```json
{
  "requestContext": {
    "http": {
      "method": "PUT",
      "path": "/"
    }
  },
  "queryStringParameters": {
    "userId": "user-123"
  }
}
```

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload file://test-put.json \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

المتوقع: `statusCode: 405` مع الجسم `{"error":"Method not allowed"}`.

## هدف إضافي: نقطة نهاية التحديث

للتعامل مع طلبات PATCH الخاصة بتحديث الحالة، أضف هذه الحالة إلى عبارة switch:

```typescript
case 'PATCH': {
  const itemId = event.queryStringParameters?.itemId;
  const body = JSON.parse(event.body ?? '{}');

  if (!itemId) {
    return respond(400, { error: 'Missing itemId parameter' });
  }

  if (!body.status) {
    return respond(400, { error: 'Missing status in request body' });
  }

  const result = await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { userId, itemId },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': body.status,
        ':updatedAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    }),
  );

  return respond(200, result.Attributes ?? {});
}
```

ستحتاج أيضًا إلى إضافة `UpdateCommand` إلى استيراداتك من `@aws-sdk/lib-dynamodb`، وتحديث سياسة IAM لتشمل `dynamodb:UpdateItem`.

احفظ مستند السياسة المحدّث باسم `lambda-dynamodb-policy-v2.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowDynamoDBAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/my-frontend-app-data"
    }
  ]
}
```

أنشئ إصدارًا جديدًا من السياسة (تدعم سياسات IAM المُدارة حتى 5 إصدارات):

```bash
aws iam create-policy-version \
  --policy-arn arn:aws:iam::123456789012:policy/MyFrontendAppLambdaDynamoDB \
  --policy-document file://lambda-dynamodb-policy-v2.json \
  --set-as-default \
  --region us-east-1 \
  --output json
```

إذا استخدمت سياسة مضمّنة (`aws iam put-role-policy`) بدلًا من سياسة مُدارة، فحدّثها بالأمر نفسه والمستند الجديد:

```bash
aws iam put-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-name MyFrontendAppLambdaDynamoDB \
  --policy-document file://lambda-dynamodb-policy-v2.json \
  --region us-east-1 \
  --output json
```

## التنظيف

إذا أردت حذف الجدول بعد الاختبار:

```bash
aws dynamodb delete-table \
  --table-name my-frontend-app-data \
  --region us-east-1 \
  --output json
```

> **تحذير**
>
> حذف جدول DynamoDB إجراء دائم ويمسح كل البيانات الموجودة في الجدول. لا تشغّل هذا الأمر إلا إذا كنت قد انتهيت من التمرين ولم تعد بحاجة إلى البيانات.
