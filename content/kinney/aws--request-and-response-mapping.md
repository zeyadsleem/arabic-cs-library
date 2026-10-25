---
title: "ربط الطلبات والاستجابات"
lang: ar
source: "https://stevekinney.com/courses/aws/request-and-response-mapping"
---

لنفترض أن واجهة Scratch Lab الأمامية ترسل `POST /notes` عندما ينشئ أحدهم ملاحظة جديدة. المتصفح يفكّر بلغة HTTP، أما دالة Lambda لديك فلا. تقف API Gateway في المنتصف، فتحوّل طلب HTTP ذاك إلى كائن حدث JSON، وتسلّمه إلى Lambda، ثم تحوّل قيمة الإرجاع من Lambda مرة أخرى إلى استجابة HTTP في طريق الخروج. وفهم طبقة الترجمة هذه هو الفرق بين بناء واجهة برمجية بثقة وبين التخمين في أسماء الحقول حتى يعمل شيء ما.

وإن أردت صياغة الربط الدقيقة من AWS أثناء القراءة، فإن [دليل ربط معاملات HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-parameter-mapping.html) هو المرجع الرسمي.

## لماذا يهم هذا

هنا تلتقي حدوس الواجهة الأمامية بسباكة AWS. فإذا فهمت شكل كائن الحدث وشكل كائن الاستجابة، تكفّ API Gateway عن أن تبدو سحرية وتبدأ تبدو ميكانيكية. وهذا بالضبط ما تريده. فالأنظمة الميكانيكية أسهل في التصحيح.

## يبني على

- [ما هي Lambda ولماذا يهتم بها مهندسو الواجهة الأمامية](https://stevekinney.com/courses/aws/what-is-lambda)
- [إنشاء HTTP API](https://stevekinney.com/courses/aws/creating-an-http-api)
- [ربط API Gateway بـ Lambda](https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda)

```
sequenceDiagram
    participant Browser
    participant APIGateway as API Gateway
    participant Lambda

    Browser->>APIGateway: HTTP request
    APIGateway->>Lambda: APIGatewayProxyEventV2 JSON
    Lambda-->>APIGateway: { statusCode, headers, body }
    APIGateway-->>Browser: HTTP response
```

## الحدث الوارد: `APIGatewayProxyEventV2`

عندما تستخدم HTTP API بإصدار صيغة الحمولة 2.0 (وهو ما أعددته في [ربط API Gateway بـ Lambda](https://stevekinney.com/courses/aws/connecting-api-gateway-to-lambda))، يتلقّى معالجك كائن `APIGatewayProxyEventV2`. وهذا شكل حدث حقيقي لطلب `POST /items?category=books`:

```json
{
  "version": "2.0",
  "routeKey": "POST /items",
  "rawPath": "/items",
  "rawQueryString": "category=books",
  "headers": {
    "content-type": "application/json",
    "authorization": "Bearer eyJhbG...",
    "host": "abc123def4.execute-api.us-east-1.amazonaws.com",
    "user-agent": "Mozilla/5.0..."
  },
  "queryStringParameters": {
    "category": "books"
  },
  "requestContext": {
    "accountId": "123456789012",
    "apiId": "abc123def4",
    "domainName": "abc123def4.execute-api.us-east-1.amazonaws.com",
    "http": {
      "method": "POST",
      "path": "/items",
      "protocol": "HTTP/1.1",
      "sourceIp": "203.0.113.42",
      "userAgent": "Mozilla/5.0..."
    },
    "requestId": "abc123-request-id",
    "stage": "$default",
    "time": "18/Mar/2026:12:00:00 +0000",
    "timeEpoch": 1774051200000
  },
  "body": "{\"name\":\"TypeScript in Action\",\"price\":29.99}",
  "isBase64Encoded": false
}
```

هذه حقول كثيرة. وإليك الحقول التي ستستخدمها في كل معالج تقريبًا.

## الحقول المهمة

### طريقة HTTP والمسار

```typescript
const method = event.requestContext.http.method;
const path = event.requestContext.http.path;
```

تقع الطريقة والمسار متداخلين تحت `requestContext.http`، لا في المستوى الأعلى. وهذا يوقع من اعتادوا على مسارات API في Express أو Next.js حيث يكون `req.method` خاصية في المستوى الأعلى.

### معاملات سلسلة الاستعلام

```typescript
const category = event.queryStringParameters?.category;
```

`queryStringParameters` كائن يربط أسماء المعاملات بقيمها. وإذا لم يكن للطلب سلسلة استعلام، فالحقل `undefined` — لا كائنًا فارغًا. استخدم التابع الاختياري (optional chaining) دائمًا.

أما معاملات الاستعلام المتكررة (مثل `?tag=js&tag=ts`)، فـ API Gateway يدمج القيم بفاصلة: `"js,ts"`. وإن كنت تحتاج القيم منفردة، فقسّم على الفاصلة.

### الترويسات

```typescript
const contentType = event.headers['content-type'];
const authorization = event.headers['authorization'];
```

كل أسماء الترويسات بأحرف صغيرة. فإذا أرسل العميل `Content-Type`، تصل إليه بوصفه `event.headers['content-type']`. وهذا سلوك ثابت من API Gateway — لا تحتاج إلى معالجة اختلافات حالة الأحرف.

### جسم الطلب

```typescript
const body = event.body ? JSON.parse(event.body) : null;
```

*ملاحظة:* `event.body` دائمًا سلسلة نصية. وعليك تحليلها بنفسك.

الجسم `body` دائمًا سلسلة نصية، حتى عندما يرسل العميل `Content-Type: application/json`. فـ API Gateway لا يحلّله نيابة عنك. وإذا لم يكن للطلب جسم (طلبات GET مثلًا)، فـ `event.body` يكون `undefined`.

> **تحذير**
>
> لفّ `JSON.parse` داخل try/catch. فبإمكان العميل إرسال جسم مشوّه يفشل تحليله، والاستثناء غير المعالَج في معالجك يُرجع 500 بلا أي معلومات مفيدة للمستدعي.

```typescript
let body: unknown = null;
try {
  body = event.body ? JSON.parse(event.body) : null;
} catch {
  return {
    statusCode: 400,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Invalid JSON in request body' }),
  };
}
```

### معاملات المسار

إذا كان مسارك يتضمّن معاملات مسار (مثل `GET /items/{id}`)، فالقيم متاحة في `event.pathParameters`:

```typescript
const itemId = event.pathParameters?.id;
```

ومثل `queryStringParameters`، يكون الحقل `pathParameters` مساويًا `undefined` عندما لا تُعرَّف معاملات مسار على المسار — لا كائنًا فارغًا. (كنت أتمنى لو كان كائنًا فارغًا، لكن هذه هي الحال.)

### المرحلة

```typescript
const stage = event.requestContext.stage;
```

بالنسبة إلى المرحلة `$default`، تكون هذه القيمة `"$default"`. وإذا أنشأت مراحل مسمّاة (وهو ما يُغطّى في [مراحل API Gateway والنطاقات المخصّصة](https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains))، يظهر اسم المرحلة هنا. وقد يفيد هذا في السلوك الشرطي — جداول قاعدة بيانات مختلفة لكل بيئة، ومستويات تسجيل مختلفة، وما إلى ذلك.

## صيغة الاستجابة

يُرجع معالجك كائنًا تحوّله API Gateway إلى استجابة HTTP. والصيغة مباشرة:

```typescript
return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ items: [] }),
};
```

### الحقول المطلوبة

- **`statusCode`**: رمز حالة HTTP صحيح. تمرّره API Gateway إلى العميل كما هو.
- **`body`**: سلسلة نصية. وإذا كنت تُرجع JSON، فعليك تمريره على `JSON.stringify`. وإن نسيت، يتلقّى العميل `[object Object]`.

### الحقول الاختيارية

- **`headers`**: كائن بترويسات الاستجابة. ينبغي أن تضبط `Content-Type` دائمًا. ويمكنك أيضًا ضبط ترويسات التخزين المؤقت أو الترويسات المخصّصة أو ترويسات CORS (وإن كان الأفضل معالجة CORS على مستوى API Gateway — وهو ما يُغطّى في [إعداد CORS في API Gateway](https://stevekinney.com/courses/aws/api-gateway-cors-configuration)).
- **`isBase64Encoded`**: اضبطه على `true` إذا كان الجسم بيانات ثنائية مرمّزة بـ base64 (صور، ملفات PDF). والقيمة الافتراضية `false`.
- **`cookies`**: مصفوفة بقيم ترويسة `Set-Cookie`. واستخدام هذا الحقل بدلًا من ضبط ملفات تعريف الارتباط في كائن `headers` يضمن تنسيقًا سليمًا عند ضبط عدة ملفات.

```typescript
return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=300',
  },
  cookies: ['session=abc123; HttpOnly; Secure; SameSite=Strict'],
  body: JSON.stringify({ items: [] }),
};
```

## نمط معالج كامل

هذا نمط يعالج الحالات الشائعة — التوجيه حسب الطريقة، وتحليل الجسم، وقراءة معاملات المسار، وإرجاع استجابات أخطاء مناسبة:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

interface Item {
  id: string;
  name: string;
  price: number;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;

  if (method === 'GET' && path === '/items') {
    const category = event.queryStringParameters?.category;
    const items: Item[] = []; // Fetch from database in a real application

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    };
  }

  if (method === 'POST' && path === '/items') {
    let body: { name: string; price: number };

    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON' }),
      };
    }

    if (!body.name || typeof body.price !== 'number') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields: name, price' }),
      };
    }

    const item: Item = {
      id: crypto.randomUUID(),
      name: body.name,
      price: body.price,
    };

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    };
  }

  return {
    statusCode: 404,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Not found' }),
  };
};
```

*ملاحظة:* استخدم `event.queryStringParameters` للتصفية والترتيب والتقسيم إلى صفحات.

> **نصيحة**
>
> `crypto.randomUUID()` متاح أصلًا في Node.js 20. فلا حاجة إلى تثبيت حزمة `uuid` لتوليد معرّفات بسيطة.

## إصدار صيغة الحمولة 1.0 مقابل 2.0

إذا كنت تقرأ دروسًا أو إجابات على Stack Overflow، فقد ترى أشكال أحداث تبدو مختلفة عمّا هو موصوف هنا. والسبب أن API Gateway لديه إصداران لصيغة الحمولة:

| الميزة | الإصدار 1.0 | الإصدار 2.0 |
| --- | --- | --- |
| موضع الطريقة | `event.httpMethod` | `event.requestContext.http.method` |
| موضع المسار | `event.path` | `event.requestContext.http.path` |
| معاملات الاستعلام | `event.queryStringParameters` | `event.queryStringParameters` |
| معاملات استعلام متعددة القيم | `event.multiValueQueryStringParameters` | مفصولة بفواصل في حقل واحد |
| ترويسات متعددة القيم | `event.multiValueHeaders` | مفصولة بفواصل في حقل واحد |
| نوع TypeScript | `APIGatewayProxyEvent` | `APIGatewayProxyEventV2` |

الإصدار 2.0 هو الافتراضي لـ HTTP APIs المنشأة بـ `--payload-format-version 2.0`. والإصدار 1.0 هو الصيغة التي تستخدمها REST APIs. وهذه الدورة تستخدم 2.0 حصريًا.

## أخطاء شائعة

**الوصول إلى `event.httpMethod` بدلًا من `event.requestContext.http.method`.** هذا حقل من الإصدار 1.0. وفي الإصدار 2.0 لا وجود له. فإذا أشار كودك إلى `event.httpMethod`، فإمّا أنك تستخدم صيغة الحمولة الخاطئة أو تتبع درسًا عن REST API.

**إرجاع كائن كجسم.** يجب أن يكون الجسم سلسلة نصية. فإرجاع `{ items: [] }` بدلًا من `JSON.stringify({ items: [] })` يُنتج `[object Object]` في الاستجابة.

**عدم معالجة الحقول غير المعرّفة.** يمكن أن تكون `queryStringParameters` و`pathParameters` و`body` جميعًا `undefined`. وTypeScript ينبّهك إلى ذلك إن كنت تستخدم الأنواع الصحيحة — فانتبه لتلك التنبيهات.

واجهتك البرمجية تعمل، لكن جرّب استدعاءها من تطبيق React يعمل على `localhost:3000`. سيمنع المتصفح الطلب بخطأ CORS. لقد رأيت هذا من قبل — والآن أنت في الجانب الخادم من المشكلة. ويغطّي الدرس التالي ضبط CORS على HTTP API لديك حتى تتمكّن واجهتك الأمامية من استدعائها فعلًا.

## التحقق

استخدم طلبًا حقيقيًا واحدًا واستدعاءً مباشرًا واحدًا لـ Lambda لإثبات أنك فهمت الربط:

```bash
curl -i https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/items

aws lambda invoke \
  --function-name my-frontend-app-api \
  --payload fileb://test-event.json \
  --region us-east-1 \
  --output json \
  response.json
```

ينبغي أن تكون قادرًا على الإجابة عن هذه الأسئلة بلا تخمين:

- أي حقل يحتوي طريقة HTTP؟
- أي حقل يحتوي جسم الطلب الخام؟
- أي حقل يحتوي اسم المرحلة؟
- أي جزء من قيمة إرجاعك يصبح جسم استجابة المتصفح الفعلي؟

## أنماط الفشل الشائعة

- **نسيان تحليل `event.body`:** فـ API Gateway يعطيك سلسلة نصية، لا كائنًا محلَّلًا سلفًا.
- **قراءة حقل المسار الخاطئ:** `requestContext.http.path` و`rawPath` مرتبطان، لكنهما ليسا متبادلين في كل جلسة تصحيح.
- **إرجاع كائن عادي كـ `body`:** إذا تجاوزت `JSON.stringify`، يحصل العميل على بيانات تالفة بدلًا من JSON.
- **افتراض اصطلاحات Express:** فلا وجود لـ `req` ولا `res` ولا حزمة برمجيات وسيطة تملأ الأجزاء الناقصة بهدوء.
