---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/aws/end-to-end-scratch-lab-api-solution"
---

هذا هو الحل الكامل لـ[تمرين واجهة برمجة تطبيقات Scratch Lab من طرف إلى طرف](https://stevekinney.com/courses/aws/end-to-end-scratch-lab-api-exercise). كل أمر معروض مع مخرجاته المتوقّعة.

## لماذا ينجح هذا

لكل قطعة مهمة واحدة. جدول DynamoDB يخزّن البيانات. ومعالج Lambda يوجّه الطلبات ويتحدّث إلى الجدول. وAPI Gateway يستقبل HTTP ويمرّرها إلى Lambda. ودور التنفيذ يمنح الأذونات التي تحتاجها Lambda بالضبط، ولا شيء أكثر. ويخزّن السر مفتاح API الخاص بطرف ثالث خارج الشيفرة وخارج البيئة معًا. وهذا الفصل هو ما يجعل كل خدمة قابلة للاستبدال دون تمزيق بقية الأجزاء.

## 1. إنشاء جدول DynamoDB

```bash
aws dynamodb create-table \
  --table-name scratch-lab-notes \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=noteId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=noteId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 \
  --output json

aws dynamodb wait table-exists \
  --table-name scratch-lab-notes \
  --region us-east-1
```

## 2. تخزين مفتاح API الخاص بالبحث

باستخدام Parameter Store كـ`SecureString`:

```bash
aws ssm put-parameter \
  --name /scratch-lab/production/search-api-key \
  --value "sk_test_example_replace_me" \
  --type SecureString \
  --region us-east-1 \
  --output json
```

## 3. سياسة دور التنفيذ

احفظها باسم `scratch-lab-api-policy.json` (وهي متاحة أيضًا باسم [`scratch-lab-api.json`](https://github.com/stevekinney/scratch-lab/blob/main/policies/iam-policies/scratch-lab-api.json) في مستودع Scratch Lab):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:Query"],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/scratch-lab-notes"
    },
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter"],
      "Resource": "arn:aws:ssm:us-east-1:123456789012:parameter/scratch-lab/production/search-api-key"
    },
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "arn:aws:logs:us-east-1:123456789012:*"
    }
  ]
}
```

أرفقها بدور تنفيذ Lambda:

```bash
aws iam put-role-policy \
  --role-name scratch-lab-api-role \
  --policy-name scratch-lab-api-policy \
  --policy-document file://scratch-lab-api-policy.json
```

## 4. معالج Lambda

`lambda/src/handler.ts`:

```typescript
import type { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const TABLE_NAME = 'scratch-lab-notes';
const SEARCH_API_KEY_PARAM = '/scratch-lab/production/search-api-key';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const ssm = new SSMClient({});

let searchApiKey: string | undefined;

const loadSearchApiKey = async (): Promise<string> => {
  if (searchApiKey) return searchApiKey;
  const response = await ssm.send(
    new GetParameterCommand({ Name: SEARCH_API_KEY_PARAM, WithDecryption: true }),
  );
  const value = response.Parameter?.Value;
  if (!value) throw new Error('search api key is empty');
  console.log('loaded search api key');
  searchApiKey = value;
  return value;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://example.com',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'content-type,x-notepad-user-id',
};

const json = (statusCode: number, body: unknown): APIGatewayProxyResultV2 => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', ...corsHeaders },
  body: JSON.stringify(body),
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await loadSearchApiKey();

  const userId = event.headers['x-notepad-user-id'];
  if (!userId) return json(401, { error: 'missing x-notepad-user-id header' });

  const method = event.requestContext.http.method;
  const routeKey = event.routeKey;
  const noteId = event.pathParameters?.noteId;

  try {
    if (method === 'GET' && routeKey === 'GET /notes') {
      const result = await ddb.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          KeyConditionExpression: 'userId = :u',
          ExpressionAttributeValues: { ':u': userId },
        }),
      );
      return json(200, result.Items ?? []);
    }

    if (method === 'POST' && routeKey === 'POST /notes') {
      const body = event.body ? JSON.parse(event.body) : {};
      const now = new Date().toISOString();
      const note = {
        userId,
        noteId: body.id,
        title: body.title ?? '',
        body: body.body ?? '',
        createdAt: body.createdAt ?? now,
        updatedAt: body.updatedAt ?? now,
      };
      await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: note }));
      return json(201, {
        id: note.noteId,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      });
    }

    if (method === 'GET' && routeKey === 'GET /notes/{noteId}' && noteId) {
      const result = await ddb.send(
        new GetCommand({ TableName: TABLE_NAME, Key: { userId, noteId } }),
      );
      if (!result.Item) return json(404, { error: 'note not found' });
      const item = result.Item;
      return json(200, {
        id: item.noteId,
        title: item.title,
        body: item.body,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    }

    if (method === 'PUT' && routeKey === 'PUT /notes/{noteId}' && noteId) {
      const body = event.body ? JSON.parse(event.body) : {};
      const now = new Date().toISOString();
      const note = {
        userId,
        noteId,
        title: body.title ?? '',
        body: body.body ?? '',
        createdAt: body.createdAt ?? now,
        updatedAt: now,
      };
      await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: note }));
      return json(200, {
        id: note.noteId,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      });
    }

    if (method === 'DELETE' && routeKey === 'DELETE /notes/{noteId}' && noteId) {
      await ddb.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { userId, noteId } }));
      return json(204, {});
    }

    return json(404, { error: 'route not found' });
  } catch (error) {
    console.error('handler error', { error, awsRequestId: event.requestContext.requestId });
    return json(500, { error: 'internal server error' });
  }
};
```

ابنِ الشيفرة وضمّنها وانشرها باستخدام النمط نفسه `npm run build` + `zip` + `aws lambda update-function-code` من [نشر دالة Lambda واختبارها](https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function).

## 5. مسارات API Gateway

بافتراض وجود HTTP API قائمة بمعرّف `abc123def4`:

```bash
INTEGRATION_ID=$(aws apigatewayv2 create-integration \
  --api-id abc123def4 \
  --integration-type AWS_PROXY \
  --integration-uri arn:aws:lambda:us-east-1:123456789012:function:scratch-lab-api \
  --payload-format-version 2.0 \
  --region us-east-1 \
  --query IntegrationId --output text)

for ROUTE in "GET /notes" "POST /notes" "GET /notes/{noteId}" "PUT /notes/{noteId}" "DELETE /notes/{noteId}"; do
  aws apigatewayv2 create-route \
    --api-id abc123def4 \
    --route-key "$ROUTE" \
    --target "integrations/$INTEGRATION_ID" \
    --region us-east-1 \
    --output json
done

aws lambda add-permission \
  --function-name scratch-lab-api \
  --statement-id scratch-lab-api-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:123456789012:abc123def4/*/*" \
  --region us-east-1
```

فعّل CORS على الـAPI:

```bash
aws apigatewayv2 update-api \
  --api-id abc123def4 \
  --cors-configuration "AllowOrigins=https://example.com,AllowMethods=GET,POST,PUT,DELETE,OPTIONS,AllowHeaders=content-type,x-notepad-user-id" \
  --region us-east-1
```

## 6. اختبار دخاني

```bash
# Create
curl -sS -X POST https://api.example.com/notes \
  -H "content-type: application/json" \
  -H "x-notepad-user-id: user-123" \
  -d '{"id":"note-1","title":"First note","body":"Hello world","createdAt":"2026-04-16T12:00:00Z","updatedAt":"2026-04-16T12:00:00Z"}'

# Read all
curl -sS https://api.example.com/notes \
  -H "x-notepad-user-id: user-123"

# Update
curl -sS -X PUT https://api.example.com/notes/note-1 \
  -H "content-type: application/json" \
  -H "x-notepad-user-id: user-123" \
  -d '{"title":"Updated note","body":"New content","createdAt":"2026-04-16T12:00:00Z"}'

# Delete
curl -sS -X DELETE https://api.example.com/notes/note-1 \
  -H "x-notepad-user-id: user-123"
```

ينبغي أن تُرجع الأوامر الأربعة كلها رمز 2xx مع JSON المتوقّع.

## 7. ربط الواجهة الأمامية

استنسخ Scratch Lab ووجّهه إلى الـAPI الخاص بك:

```bash
git clone https://github.com/stevekinney/scratch-lab.git
cd scratch-lab
npm install
VITE_API_URL=https://api.example.com npm run dev
```

أنشئ ملاحظة في المتصفّح. وينبغي أن ترى العنصر يظهر في وحدة تحكّم DynamoDB. عدّل الملاحظة وتحقّق من أن `updatedAt` يتغيّر في طلب GET التالي.

![تطبيق المفكّرة Scratch Lab يعمل على CloudFront مع ملاحظة منشأة، عارضًا الرحلة الكاملة عبر المكدّس من المتصفّح إلى DynamoDB والعودة.](/images/kinney/634119f21216e8a2.webp)

## ملخّص الموارد المنشأة

| المورد | المعرّف |
| --- | --- |
| جدول DynamoDB | `scratch-lab-notes` |
| سر Parameter Store | `/scratch-lab/production/search-api-key` |
| دالة Lambda | `scratch-lab-api` |
| دور التنفيذ | `scratch-lab-api-role` مع إرفاق `scratch-lab-api-policy` |
| تكامل API Gateway | `AWS_PROXY` ← `scratch-lab-api` |
| مسارات API Gateway | `GET /notes`, `POST /notes`, `GET /notes/{noteId}`, `PUT /notes/{noteId}`, `DELETE /notes/{noteId}` |

عند تفكيك هذا، اتبع الترتيب الوارد في [التنظيف والتفكيك](https://stevekinney.com/courses/aws/cleanup-and-teardown): المسارات قبل التكامل، والتكامل قبل الدالة، والدالة قبل الدور، والجدول في النهاية.
