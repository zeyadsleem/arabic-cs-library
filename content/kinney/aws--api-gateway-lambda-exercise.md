---
title: "تمرين: بناء API باستخدام API Gateway وLambda"
lang: ar
source: "https://stevekinney.com/courses/aws/api-gateway-lambda-exercise"
---

ستبني API كاملة من الصفر — HTTP API في API Gateway بمسارين، كل منهما موصول بدالة Lambda، مع إعداد CORS كي يستطيع تطبيق React استدعاءها. وبحلول نهاية هذا التمرين، سيكون لديك API عاملة تقبل طلبات GET وPOST وتُرجع استجابات JSON إلى واجهتك الأمامية.

يربط هذا التمرين كل شيء من قسمَي Lambda وAPI Gateway. ستكتب المعالج، وتنشر الدالة، وتنشئ API، وتوصل التكامل، وتستدعيها من المتصفّح.

> **نصيحة**
>
> إذا أردت نسخة AWS من سير عمل المسارات والتكاملات وCORS مفتوحة أثناء عملك، فأبقِ [توثيق HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)، و[دليل تكامل Lambda](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)، و[دليل CORS في HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) قريبًا منك.

## لماذا يهمّ

على Vercel، إنشاء نقطة نهاية API يعني إسقاط ملف في دليل `api/`. وعلى AWS، تبني كل طبقة بنفسك: الحوسبة (Lambda)، وطبقة HTTP (API Gateway)، والتوجيه، والأذونات، وإعداد CORS. يبدو ذلك عملًا أكثر — وهو كذلك — لكن حين ينكسر شيء في الثانية صباحًا، تعرف تمامًا أين تنظر لأنك بنيت كل قطعة. هذا هو المقايضة.

## مهمّتك

ابنِ وانشر API بنقطتَي نهاية:

- **`GET /items`** — تُرجع مصفوفة JSON من العناصر
- **`POST /items`** — تقبل جسمًا بصيغة JSON فيه `name` و`price`، وتُرجع العنصر المنشأ مع `id` مولّد

ثم استدعِ نقطتَي النهاية من تطبيق React يعمل على `localhost:3000` (أو `localhost:5173` إن كنت تستخدم Vite).

استخدم معرّف الحساب `123456789012`، والمنطقة `us-east-1`، واسم الدالة `my-frontend-app-api`، و`--output json` في كل الأوامر.

## كتابة معالج Lambda

أنشئ (أو حدّث) `lambda/src/handler.ts` بمعالج:

1. يستخدم النوع `APIGatewayProxyHandlerV2`
2. يقرأ `event.requestContext.http.method` للتمييز بين GET وPOST
3. لطلبات GET: يُرجع استجابة 200 بجسم JSON يحتوي مصفوفة `items` (اكتب 2-3 عناصر ثابتة، لكل منها حقول `id` و`name` و`price`)
4. لطلبات POST: يُحلّل `event.body` كـJSON، ويتحقّق من وجود `name` و`price`، ويولّد `id` باستخدام `crypto.randomUUID()`، ويُرجع استجابة 201 بالعنصر المنشأ
5. يُرجع استجابة 405 لأي طريقة HTTP أخرى

ابنِ المشروع وأنشئ ملف zip الخاص بالنشر.

### نقطة تحقّق

ينجح `npm run build` دون أخطاء TypeScript. ويحتوي `lambda/function.zip` على المعالج المترجم.

## نشر دالة Lambda

إذا كانت لديك بالفعل دالة `my-frontend-app-api` من تمرين Lambda، فحدّث شفرتها. وإن لم تكن، فأنشئ دالة جديدة بدور التنفيذ من [أدوار وأذونات تنفيذ Lambda](https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions).

لتحديث دالة موجودة:

```bash
aws lambda update-function-code \
  --function-name my-frontend-app-api \
  --zip-file fileb://lambda/function.zip \
  --region us-east-1 \
  --output json
```

### نقطة تحقّق

استدعِ الدالة مباشرةً بحدث اختبار GET وحدث اختبار POST. فحدث GET يُرجع 200 مع العناصر. وحدث POST يُرجع 201 مع العنصر المنشأ.

## إنشاء HTTP API

أنشئ HTTP API باسم `my-frontend-app-api` ونوع بروتوكول `HTTP`.

احفظ `ApiId` من الاستجابة — ستحتاجه في كل أمر لاحق.

### نقطة تحقّق

يُرجع `aws apigatewayv2 get-api --api-id YOUR_API_ID --region us-east-1 --output json` واجهة API بالاسم ونوع البروتوكول الصحيحين.

## إنشاء التكامل

أنشئ تكامل وكيل Lambda يشير إلى دالتك:

- نوع التكامل: `AWS_PROXY`
- عنوان URI للتكامل: ARN دالة Lambda
- إصدار صيغة الحمولة: `2.0`

احفظ `IntegrationId` من الاستجابة.

### نقطة تحقّق

يُظهر `aws apigatewayv2 get-integrations --api-id YOUR_API_ID --region us-east-1 --output json` تكاملًا واحدًا بنوع `AWS_PROXY` وARN الدالة الصحيح.

## إنشاء المسارات

أنشئ مسارين:

1. `GET /items` مستهدفًا تكاملك
2. `POST /items` مستهدفًا التكامل نفسه

تذكّر: قيمة `--target` هي `integrations/{IntegrationId}`، مع بادئة `integrations/`.

### نقطة تحقّق

يُظهر `aws apigatewayv2 get-routes --api-id YOUR_API_ID --region us-east-1 --output json` المسارين بمفاتيح المسارات والأهداف الصحيحة.

## منح الإذن

أضف سياسة قائمة على الموارد إلى دالة Lambda تسمح لـ API Gateway باستدعائها. استخدم `apigateway.amazonaws.com` كأصل، واضبط ARN المصدر على `arn:aws:execute-api:us-east-1:123456789012:YOUR_API_ID/*`.

### نقطة تحقّق

```bash
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/items
```

تُرجع استجابة 200 بمصفوفة العناصر. وإن حصلت على خطأ 500، فإذن Lambda مفقود.

## تهيئة CORS

حدّث API بإعداد CORS يسمح بـ:

- الأصول: `http://localhost:3000` و`http://localhost:5173`
- الطرق: `GET` و`POST`
- الترويسات: `Content-Type`
- أقصى عمر: `86400`

### نقطة تحقّق

اختبر استجابة preflight:

```bash
curl -i -X OPTIONS \
  https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/items \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
```

تتضمّن الاستجابة `access-control-allow-origin: http://localhost:3000` و`access-control-allow-methods` يحتوي `GET` و`POST`.

## استدعاء API من React

أنشئ مكوّن React أدنى (أو استخدم مشروع React موجودًا) يستدعي نقطتَي النهاية:

```typescript
const API_URL = 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com';

// GET /items
async function fetchItems() {
  const response = await fetch(`${API_URL}/items`);
  return response.json();
}

// POST /items
async function createItem(name: string, price: number) {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price }),
  });
  return response.json();
}
```

افتح تبويب Network في أدوات مطوّري المتصفّح وتحقّق:

1. طلب GET يُرجع مصفوفة العناصر
2. طلب POST يُرجع العنصر المنشأ مع `id` مولّد
3. لا أخطاء CORS تظهر في وحدة التحكّم

### نقطة تحقّق

ينجح استدعاءا `fetch` من المتصفّح. ويُظهر تبويب Network استجابات 200/201 بأجسام JSON الصحيحة. ولا أخطاء CORS في وحدة التحكّم.

## ملخّص نقاط التحقّق

- معالج Lambda يُبنى ويتعامل مع GET وPOST
- دالة Lambda منشورة وقابلة للاستدعاء من CLI
- HTTP API موجودة بنوع البروتوكول الصحيح
- التكامل يتصل بدالة Lambda بصيغة حمولة 2.0
- المسارات موجودة لـ`GET /items` و`POST /items`
- إذن Lambda يسمح لـ API Gateway باستدعاء الدالة
- `curl` إلى نقطة نهاية API يُرجع JSON المتوقّع
- CORS مُعدّ وطلبات preflight تنجح
- تطبيق React يستطيع استدعاء نقطتَي النهاية دون أخطاء CORS

## تشخيص الفشل

- **`curl` يُرجع `{"message":"Internal Server Error"}`:** تستطيع API Gateway الوصول إلى المسار، لكن إذن Lambda مفقود أو معالجك رمى استثناءً. افحص `aws lambda add-permission` وسجلات CloudWatch.
- **`curl` يُرجع `{"message":"Not Found"}`:** المسار غير موجود، أو يشير إلى التكامل الخاطئ، أو أنشأته تحت تركيبة طريقة/مسار مختلفة.
- **ما زال المتصفّح يُظهر أخطاء CORS رغم أن CLI يعمل:** إعدادات CORS في API Gateway لا تتضمّن أصل الواجهة الأمامية أو الطرق أو الترويسات الدقيقة التي يطلبها المتصفّح.

## أهداف إضافية

- **أضف مسار `GET /items/{id}`.** أنشئ مسارًا ثالثًا بمعامل مسار. حدّث معالجك ليقرأ `event.pathParameters?.id` ويُرجع عنصرًا واحدًا. اختبره بـ`curl` ومن تطبيق React.
- **أضف معالجة أخطاء لأجسام POST غير الصالحة.** أرسل طلب POST بجسم فارغ، وجسم غير JSON، وجسم JSON يفتقد حقولًا مطلوبة. تحقّق من أن معالجك يُرجع استجابات 400 مناسبة في كل حالة.
- **أضف نطاقًا مخصّصًا.** إذا كان لديك نطاق مُدار في Route 53 وشهادة ACM، فأنشئ اسم نطاق مخصّصًا لواجهتك واختبر أنه يعمل.

عندما تكون جاهزًا، قارن عملك بـ[الحل: بناء API باستخدام API Gateway وLambda](https://stevekinney.com/courses/aws/api-gateway-lambda-solution).
