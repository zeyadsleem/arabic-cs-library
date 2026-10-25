---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/aws/api-gateway-lambda-solution"
---

هذا هو الحل الكامل لكل خطوة، بما في ذلك كود المعالج، وكل أوامر CLI، والمخرجات المتوقعة في كل مرحلة.

## لماذا ينجح هذا

- مسارات HTTP API تسلّم الطلب كاملًا إلى دالة Lambda واحدة، وهذا يُبقي تهيئة البوابة بسيطة ويدفع منطق التطبيق إلى كود TypeScript عادي.
- إذن Lambda هو التبعية الخفيّة التي تجعل التكامل حقيقيًا. فبدونه توجد الواجهة البرمجية لكنها لا تستطيع استدعاء أي شيء.
- اختبار المتصفح مهم لأن خلفية تعمل في `curl` لكنها تفشل في CORS تبقى معطوبة من منظور فريق الواجهة الأمامية.

> **نصيحة**
>
> إذا أردت إبقاء نسخة AWS من سير عمل المسار والتكامل وCORS مفتوحة أثناء عملك، فأبقِ [توثيق HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) و[دليل تكامل Lambda](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) و[دليل CORS في HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) في متناول يدك.

## المعالج

> **نصيحة**
>
> هذا المعالج متاح بصيغة [`items-handler.ts`](https://github.com/stevekinney/scratch-lab/blob/main/lambda/src/items-handler.ts) في مستودع Scratch Lab.

### `lambda/src/handler.ts`

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

interface Item {
  id: string;
  name: string;
  price: number;
}

const items: Item[] = [
  { id: '1', name: 'TypeScript in Action', price: 29.99 },
  { id: '2', name: 'AWS for Humans', price: 34.99 },
  { id: '3', name: 'React Patterns', price: 24.99 },
];

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;

  if (method === 'GET') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    };
  }

  if (method === 'POST') {
    let body: { name?: string; price?: number };

    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    if (!body.name || typeof body.price !== 'number') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Missing required fields: name (string), price (number)',
        }),
      };
    }

    const newItem: Item = {
      id: crypto.randomUUID(),
      name: body.name,
      price: body.price,
    };

    items.push(newItem);

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    };
  }

  return {
    statusCode: 405,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};
```

*ملاحظة:* وجّه الطلبات بحسب طريقة HTTP لأن `GET /items` و`POST /items` كلاهما يصل إلى دالة Lambda نفسها.

*ملاحظة:* تُعاد هذه المصفوفة في الذاكرة إلى حالتها الأصلية عند كل بدء بارد. أما الواجهة البرمجية الحقيقية فستكتب إلى DynamoDB.

### البناء والضغط

```bash
cd lambda
npm run build
cd dist && zip -r ../function.zip . && cd ..
```

المتوقع: يُنشأ `dist/handler.js` بلا أخطاء. ويحتوي `function.zip` على المخرجات المُصرّفة.

## نشر دالة Lambda

### تحديث دالة موجودة

إذا كانت لديك الدالة من تمرين Lambda:

```bash
aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://lambda/function.zip \
  --region us-east-1 \
  --output json
```

### إنشاء دالة جديدة

إذا كنت تبدأ من الصفر، فأنشئ دور التنفيذ والدالة أولًا:

```bash
aws iam create-role \
  --role-name my-frontend-app-lambda-role \
  --assume-role-policy-document file://trust-policy.json \
  --region us-east-1 \
  --output json

aws iam attach-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
  --region us-east-1 \
  --output json

aws lambda create-function \
  --function-name my-frontend-app-api \
  --runtime nodejs22.x \
  --role arn:aws:iam::123456789012:role/my-frontend-app-lambda-role \
  --handler handler.handler \
  --zip-file fileb://lambda/function.zip \
  --region us-east-1 \
  --output json
```

### التحقق بالاستدعاء المباشر

اختبر GET:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload '{"requestContext":{"http":{"method":"GET","path":"/items"}}}' \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

الاستجابة المتوقعة:

```json
{
  "statusCode": 200,
  "headers": { "Content-Type": "application/json" },
  "body": "{\"items\":[{\"id\":\"1\",\"name\":\"TypeScript in Action\",\"price\":29.99},{\"id\":\"2\",\"name\":\"AWS for Humans\",\"price\":34.99},{\"id\":\"3\",\"name\":\"React Patterns\",\"price\":24.99}]}"
}
```

اختبر POST:

```bash
aws lambda invoke \
  --function-name my-frontend-app-api \
  --cli-binary-format raw-in-base64-out \
  --payload '{"requestContext":{"http":{"method":"POST","path":"/items"}},"body":"{\"name\":\"Node.js Essentials\",\"price\":19.99}"}' \
  --region us-east-1 \
  --output json \
  response.json

cat response.json
```

الاستجابة المتوقعة:

```json
{
  "statusCode": 201,
  "headers": { "Content-Type": "application/json" },
  "body": "{\"id\":\"a1b2c3d4-e5f6-7890-abcd-ef1234567890\",\"name\":\"Node.js Essentials\",\"price\":19.99}"
}
```

سيكون `id` قيمة UUID مختلفة في كل استدعاء.

## إنشاء HTTP API

```bash
aws apigatewayv2 create-api \
  --name my-frontend-app-api \
  --protocol-type HTTP \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "ApiEndpoint": "https://abc123def4.execute-api.us-east-1.amazonaws.com",
  "ApiId": "abc123def4",
  "CreatedDate": "2026-03-18T12:00:00+00:00",
  "Name": "my-frontend-app-api",
  "ProtocolType": "HTTP",
  "RouteSelectionExpression": "${request.method} ${request.path}"
}
```

احفظ معرّف الواجهة البرمجية:

```bash
API_ID="abc123def4"
```

## إنشاء التكامل

```bash
aws apigatewayv2 create-integration \
  --api-id $API_ID \
  --integration-type AWS_PROXY \
  --integration-uri arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api \
  --payload-format-version 2.0 \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "ConnectionType": "INTERNET",
  "IntegrationId": "a1b2c3",
  "IntegrationType": "AWS_PROXY",
  "IntegrationUri": "arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api",
  "PayloadFormatVersion": "2.0",
  "TimeoutInMillis": 30000
}
```

احفظ معرّف التكامل:

```bash
INTEGRATION_ID="a1b2c3"
```

## إنشاء المسارات

### GET /items

```bash
aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key "GET /items" \
  --target "integrations/$INTEGRATION_ID" \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "ApiKeyRequired": false,
  "RouteId": "route-get-123",
  "RouteKey": "GET /items",
  "Target": "integrations/a1b2c3"
}
```

### POST /items

```bash
aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key "POST /items" \
  --target "integrations/$INTEGRATION_ID" \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "ApiKeyRequired": false,
  "RouteId": "route-post-456",
  "RouteKey": "POST /items",
  "Target": "integrations/a1b2c3"
}
```

### التحقق من المسارات

```bash
aws apigatewayv2 get-routes \
  --api-id $API_ID \
  --region us-east-1 \
  --output json
```

المتوقع: مساران بمفتاحَي مسار `GET /items` و`POST /items`، وكلاهما يستهدف التكامل نفسه.

في وحدة التحكم، تعرض صفحة **Routes** كلا المسارين مُدرجين تحت الواجهة البرمجية.

![تعرض صفحة Routes في API Gateway المسار ANY / المُنشأ لواجهة my-frontend-api من نوع HTTP API.](/images/kinney/6bf5325c96478758.webp)

## منح الإذن

```bash
aws lambda add-permission \
  --function-name my-frontend-app-api \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:123456789012:$API_ID/*" \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة:

```json
{
  "Statement": "{\"Sid\":\"apigateway-invoke\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"apigateway.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-api\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:execute-api:us-east-1:123456789012:abc123def4/*\"}}}"
}
```

### الاختبار باستخدام curl

```bash
curl https://$API_ID.execute-api.us-east-1.amazonaws.com/items
```

المتوقع:

```json
{
  "items": [
    { "id": "1", "name": "TypeScript in Action", "price": 29.99 },
    { "id": "2", "name": "AWS for Humans", "price": 34.99 },
    { "id": "3", "name": "React Patterns", "price": 24.99 }
  ]
}
```

اختبر POST:

```bash
curl -X POST \
  https://$API_ID.execute-api.us-east-1.amazonaws.com/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Node.js Essentials","price":19.99}'
```

المتوقع:

```json
{ "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "name": "Node.js Essentials", "price": 19.99 }
```

> **نصيحة**
>
> إذا أعاد `curl` الرسالة `{"message":"Internal Server Error"}`، فإن إذن Lambda مفقود. شغّل أمر `add-permission` أعلاه. وإذا أعادت الواجهة البرمجية `{"message":"Not Found"}`، فلم تُنشأ المسارات بشكل صحيح — تحقّق من `get-routes`.

## تهيئة CORS

```bash
aws apigatewayv2 update-api \
  --api-id $API_ID \
  --cors-configuration '{"AllowOrigins":["http://localhost:3000","http://localhost:5173"],"AllowMethods":["GET","POST"],"AllowHeaders":["Content-Type"],"MaxAge":86400}' \
  --region us-east-1 \
  --output json
```

المتوقع: تتضمن الاستجابة كتلة `CorsConfiguration` بالقيم التي ضبطتها.

### اختبار طلب الفحص المسبق

```bash
curl -i -X OPTIONS \
  https://$API_ID.execute-api.us-east-1.amazonaws.com/items \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
```

الترويسات المتوقعة في الاستجابة:

```
access-control-allow-headers: Content-Type
access-control-allow-methods: GET, POST
access-control-allow-origin: http://localhost:3000
access-control-max-age: 86400
```

## الاستدعاء من React

إليك مكوّن React بسيطًا يستدعي نقطتَي النهاية معًا:

```typescript
import { useEffect, useState } from 'react';

interface Item {
  id: string;
  name: string;
  price: number;
}

const API_URL = 'https://abc123def4.execute-api.us-east-1.amazonaws.com';

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((response) => response.json())
      .then((data) => setItems(data.items));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });

    const newItem = await response.json();
    setItems((previous) => [...previous, newItem]);
    setName('');
    setPrice('');
  }

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}—${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
```

افتح المتصفح، وتحقّق من تحميل قائمة العناصر، وأضف عنصرًا جديدًا باستخدام النموذج، وتأكّد من ظهوره في القائمة. افحص تبويب Network في أدوات المطوّر لتتحقق من نجاح الطلبين برمزَي الحالة 200/201 وبلا أخطاء CORS.

> **تحذير**
>
> تُعاد مصفوفة `items` في الذاكرة داخل معالج Lambda إلى حالتها الأصلية عند كل بدء بارد. فإذا أضفت عنصرًا عبر POST ثم انتظرت بضع دقائق (ما يكفي لتُعيد Lambda تدوير بيئة التنفيذ)، فسيختفي العنصر. هذا متوقع — فالحالة في الذاكرة ليست دائمة. في قسم DynamoDB ستستبدل هذه المصفوفة بـ DynamoDB للتخزين الدائم.

## هدف إضافي: `GET /items/{id}`

### إضافة المسار

```bash
aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key "GET /items/{id}" \
  --target "integrations/$INTEGRATION_ID" \
  --region us-east-1 \
  --output json
```

### تحديث المعالج

أضف هذه الكتلة **قبل** فحص `if (method === 'GET')` الموجود — فالمسار الأكثر تحديدًا يحتاج إلى المطابقة أولًا:

```typescript
if (method === 'GET' && event.pathParameters?.id) {
  const item = items.find((item) => item.id === event.pathParameters!.id);

  if (!item) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Item not found' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  };
}
```

أعد البناء والضغط وحدّث كود الدالة:

```bash
cd lambda
npm run build
cd dist && zip -r ../function.zip . && cd ..

aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://lambda/function.zip \
  --region us-east-1 \
  --output json
```

اختبر:

```bash
curl https://$API_ID.execute-api.us-east-1.amazonaws.com/items/1
```

المتوقع:

```json
{ "id": "1", "name": "TypeScript in Action", "price": 29.99 }
```

```bash
curl https://$API_ID.execute-api.us-east-1.amazonaws.com/items/999
```

المتوقع:

```json
{ "error": "Item not found" }
```

## التنظيف

لإزالة كل ما أنشأته في هذا التمرين:

```bash
# Delete the API (removes all routes, integrations, and stages)
aws apigatewayv2 delete-api \
  --api-id $API_ID \
  --region us-east-1 \
  --output json

# Remove the Lambda permission
aws lambda remove-permission \
  --function-name my-frontend-app-api \
  --statement-id apigateway-invoke \
  --region us-east-1 \
  --output json
```

لا تُحذف دالة Lambda ودور التنفيذ — ستستخدمهما مرة أخرى في وحدات لاحقة.
