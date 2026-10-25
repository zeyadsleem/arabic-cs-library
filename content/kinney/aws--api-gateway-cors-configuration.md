---
title: "تهيئة CORS"
lang: ar
source: "https://stevekinney.com/courses/aws/api-gateway-cors-configuration"
---

لقد واجهت أخطاء CORS من قبل. كل مهندس واجهة أمامية حدّق يومًا في أخطاء `Access-Control-Allow-Origin` في وحدة تحكم المتصفح، وتخبّط لإضافة ترويسات في مكان ما، ثم نجح في النهاية عبر مزيج من إجابات Stack Overflow والحظ الأعمى. الفرق الآن: أنت تملك واجهة API. لم تعد تنتظر فريق خلفية ليصلح ترويساته. أنت تهيّئ CORS بنفسك، على HTTP API خاصتك، وتفهم بالضبط ما يفعله كل إعداد.

إذا أردت سلوك CORS الدقيق كما تصفه AWS بجوار هذا الدرس، فإن [دليل CORS في HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) هو المرجع الرسمي.

```
sequenceDiagram
    participant Browser
    participant API as API Gateway

    Browser->>API: OPTIONS /items<br/>Origin + requested method and headers
    API-->>Browser: 204 + Access-Control-Allow-* headers
    Browser->>API: POST /items
    API-->>Browser: API response + Access-Control-Allow-Origin
```

## لماذا يوجد CORS

يعمل تطبيق React لديك على `http://localhost:3000` أثناء التطوير. ونقطة نهاية API Gateway لديك على `https://abc123def4.execute-api.us-east-1.amazonaws.com`. أصلان مختلفان. تحجب **سياسة الأصل نفسه** في المتصفح الطلبات بين أصول مختلفة ما لم يسمح بها الخادم صراحةً عبر ترويسات CORS.

CORS ليس مفهومًا خاصًا بـ API Gateway — إنه آلية أمان في المتصفح. صادفته أول مرة عندما هيّأت ترويسات CORS على S3 في [سياسات الدلاء والوصول العام](https://stevekinney.com/courses/aws/bucket-policies-and-public-access)، ثم مرة أخرى عند إعداد ترويسات استجابة CloudFront في [ترويسات CloudFront وCORS والأمان](https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security). الآلية نفسها هنا: يجب أن يعيد الخادم ترويسات تخبر المتصفح «نعم، هذا الأصل مسموح له باستدعائي».

## كيف تعمل طلبات الاستباق

لا يطلق كل طلب عبر الأصول طلب استباق. طلبات GET البسيطة ذات الترويسات القياسية تمرّ مباشرة — يرسل المتصفح الطلب ويفحص ترويسات CORS في الاستجابة. لكن طلبات POST ذات `Content-Type: application/json`، أو أي طلب بترويسات مخصّصة مثل `Authorization`، يطلق **طلب استباق**: يرسل المتصفح طلب `OPTIONS` إلى عنوان URL نفسه أولًا، سائلًا «هل هذا مسموح؟»

تسلسل الطلب الاستباقي:

1. يستدعي تطبيق React لديك `fetch('https://your-api.example.com/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '...' })`
2. يرسل المتصفح طلب `OPTIONS /items` مع ترويسات `Origin` و`Access-Control-Request-Method` و`Access-Control-Request-Headers`
3. يعيد API Gateway ترويسات `Access-Control-Allow-Origin` و`Access-Control-Allow-Methods` و`Access-Control-Allow-Headers`
4. إذا سمحت ترويسات الاستجابة بالطلب، يرسل المتصفح طلب `POST /items` الفعلي
5. إذا لم تسمح ترويسات الاستجابة بالطلب، يحجبه المتصفح وترى خطأ CORS

تتعامل HTTP APIs مع طلبات الاستباق تلقائيًا عندما تهيّئ CORS على واجهة API. لا تحتاج إلى إنشاء مسار OPTIONS أو كتابة شيفرة Lambda للرد على طلبات الاستباق. هذه إحدى ميزات HTTP APIs على REST APIs، حيث تتطلّب تهيئة CORS ضبط أساليب OPTIONS على كل مورد.

## تهيئة CORS على HTTP API

افتراضيًا، لا تحتوي HTTP API لديك على أي تهيئة CORS. في وحدة التحكم، الانتقال إلى **CORS** في الشريط الجانبي الأيسر يعرض جميع الحقول فارغة — لا أصول مسموحة، ولا أساليب، ولا ترويسات.

تعرض صفحة CORS في API Gateway الحالة الافتراضية غير المهيّأة مع عدم السماح بأي أصول أو أساليب أو ترويسات.

تهيئة CORS خاصية على واجهة API نفسها — وهذا بصراحة أحد الأمور المفضّلة لدي في HTTP APIs. استخدم `aws apigatewayv2 update-api` لضبطها:

```bash
aws apigatewayv2 update-api \
  --api-id abc123def4 \
  --cors-configuration '{"AllowOrigins":["http://localhost:3000","https://example.com"],"AllowMethods":["GET","POST","PUT","DELETE"],"AllowHeaders":["Content-Type","Authorization"],"MaxAge":86400}' \
  --region us-east-1 \
  --output json
```

تتضمّن الاستجابة تهيئة CORS:

```json
{
  "ApiEndpoint": "https://abc123def4.execute-api.us-east-1.amazonaws.com",
  "ApiId": "abc123def4",
  "CorsConfiguration": {
    "AllowHeaders": ["Content-Type", "Authorization"],
    "AllowMethods": ["GET", "POST", "PUT", "DELETE"],
    "AllowOrigins": ["http://localhost:3000", "https://example.com"],
    "MaxAge": 86400
  },
  "Name": "my-frontend-app-api",
  "ProtocolType": "HTTP"
}
```

في وحدة التحكم، يعرض قسم **CORS** في التنقّل الأيسر حقول CORS الستة جميعها مع زر **Configure** يفتح لوحة الإعدادات.

تعرض صفحة تهيئة CORS في API Gateway الحقول Access-Control-Allow-Origin وAccess-Control-Allow-Methods وغيرها من حقول CORS مع قيمها الحالية.

### ما الذي يفعله كل حقل

**`AllowOrigins`** — الأصول المسموح لها باستدعاء واجهة API. يجب أن تتضمّن كل قيمة المخطّط (`http://` أو `https://`) واسم المضيف والمنفذ (إن كان غير قياسي). أثناء التطوير، تُدرج عادةً `http://localhost:3000` (أو أي منفذ يستخدمه خادم التطوير لديك). في الإنتاج، هذا هو نطاقك: `https://example.com`.

يمكنك استخدام `*` للسماح بأي أصل، لكن لا تفعل ذلك إذا كانت واجهة API تستخدم المصادقة. فالأصل الشامل المقترن ببيانات الاعتماد يعني أن أي موقع على الإنترنت يمكنه إرسال طلبات موثّقة إلى واجهة API باستخدام رموز مستخدميك.

**`AllowMethods`** — أساليب HTTP المسموح للمتصفح باستخدامها. اذكر فقط الأساليب التي تدعمها واجهة API فعليًا. إذا كانت واجهة API تحتوي فقط على مسارات `GET` و`POST`، فلا سبب للسماح بـ `DELETE`.

**`AllowHeaders`** — ترويسات الطلب المسموح للمتصفح بإرسالها. `Content-Type` و`Authorization` هما الترويستان اللتان تحتاجهما دائمًا تقريبًا. وإذا استخدمت ترويسات مخصّصة، فأضفها هنا.

**`MaxAge`** — المدة (بالثواني) التي يجب أن يخزّن فيها المتصفح استجابة الاستباق مؤقتًا. ضبطه على `86400` (24 ساعة) يعني أن المتصفح يرسل طلب استباق واحدًا فقط لكل نقطة نهاية يوميًا، بدلًا من واحد قبل كل طلب. وهذا يقلّل زمن الاستجابة وحركة الشبكة.

**`ExposeHeaders`** — ترويسات الاستجابة المسموح للمتصفح بقراءتها. افتراضيًا، يعرّض المتصفح مجموعة محدودة فقط من ترويسات الاستجابة «الآمنة» لجافاسكريبت. إذا أعادت واجهة API ترويسات مخصّصة تحتاج واجهتك الأمامية إلى قراءتها، فاذكرها هنا.

**`AllowCredentials`** — اضبطه على `true` إذا كانت واجهة API تستخدم ملفات تعريف الارتباط أو الترويسة `Authorization` مع بيانات الاعتماد. وعندما يكون `true`، لا يمكن أن يكون `AllowOrigins` هو `*` — بل يجب أن تذكر أصولًا محدّدة.

```bash
aws apigatewayv2 update-api \
  --api-id abc123def4 \
  --cors-configuration '{"AllowOrigins":["https://example.com"],"AllowMethods":["GET","POST"],"AllowHeaders":["Content-Type","Authorization"],"AllowCredentials":true,"ExposeHeaders":["X-Request-Id"],"MaxAge":86400}' \
  --region us-east-1 \
  --output json
```

> **تحذير**
>
> يرفض المتصفح ضبط `AllowCredentials=true` مع `AllowOrigins="*"`. إذا كنت تحتاج إلى بيانات الاعتماد، فيجب أن تحدّد أصولًا دقيقة. هذه قاعدة يفرضها المتصفح، وليست قيدًا من API Gateway.

## باستخدام SDK

```typescript
import { ApiGatewayV2Client, UpdateApiCommand } from '@aws-sdk/client-apigatewayv2';

const apigw = new ApiGatewayV2Client({ region: 'us-east-1' });

await apigw.send(
  new UpdateApiCommand({
    ApiId: 'abc123def4',
    CorsConfiguration: {
      AllowOrigins: ['https://example.com'],
      AllowMethods: ['GET', 'POST'],
      AllowHeaders: ['Content-Type', 'Authorization'],
      AllowCredentials: true,
      ExposeHeaders: ['X-Request-Id'],
      MaxAge: 86400,
    },
  }),
);
```

## اختبار CORS

بعد تهيئة CORS، اختبر باستخدام `curl` لرؤية الترويسات التي يعيدها API Gateway:

```bash
curl -i -X OPTIONS \
  https://abc123def4.execute-api.us-east-1.amazonaws.com/items \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
```

يجب أن تتضمّن الاستجابة ترويسات CORS:

```
HTTP/2 204
access-control-allow-headers: Content-Type, Authorization
access-control-allow-methods: GET, POST, PUT, DELETE
access-control-allow-origin: http://localhost:3000
access-control-max-age: 86400
```

حالة 204 مع الترويسات الصحيحة تعني أن CORS مهيّأ بشكل سليم. إذا رأيت 403 أو ترويسات مفقودة، فتحقّق جيدًا من `AllowOrigins` — يجب أن يطابق الأصل في الطلب أحد الأصول المسموحة مطابقة تامة (بما في ذلك المخطّط والمنفذ).

## CORS في شيفرة واجهتك الأمامية

مع تهيئة CORS على جانب API، تعمل استدعاءات `fetch` في واجهتك الأمامية دون أي تهيئة خاصة:

```typescript
const response = await fetch('https://abc123def4.execute-api.us-east-1.amazonaws.com/items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'TypeScript in Action', price: 29.99 }),
});

const data = await response.json();
```

لا حاجة إلى `mode: 'cors'` — فـ `fetch` يستخدم وضع CORS افتراضيًا للطلبات عبر الأصول. ولا حاجة إلى وسيط. ولا حاجة إلى حل `no-cors` البديل (الذي يبتلع جسم الاستجابة). ترويسات CORS من API Gateway تخبر المتصفح بالسماح بالطلب.

> **نصيحة**
>
> أثناء التطوير المحلي، قد تفضّل استخدام وسيط في خادم التطوير Vite أو Next.js لتجنّب CORS تمامًا. هذا يعمل بشكل جيد للتطوير لكنه يخفي مشكلات تهيئة CORS التي ستظهر في الإنتاج. اختبر مقابل نقطة نهاية API Gateway الحقيقية مرة واحدة على الأقل قبل النشر.

## أصول التطوير مقابل أصول الإنتاج

من الأنماط الشائعة تضمين أصل التطوير المحلي ونطاق الإنتاج معًا. داخل كتلة JSON الخاصة بـ `--cors-configuration`، يبدو ذلك هكذا:

```json
"AllowOrigins": ["http://localhost:3000", "http://localhost:5173", "https://example.com"]
```

المنفذ `3000` هو منفذ خادم التطوير المعتاد في React. والمنفذ `5173` هو منفذ Vite الافتراضي. أدرج أي منافذ تستخدمها أدوات التطوير لديك.

في إعداد أكثر تطورًا، ستستخدم مراحل API Gateway (المغطاة في [مراحل API Gateway والنطاقات المخصّصة](https://stevekinney.com/courses/aws/api-gateway-stages-and-custom-domains)) لفصل تهيئة التطوير والإنتاج، مع أصول CORS مختلفة لكل مرحلة. لكن للبدء، فإن إدراج جميع أصولك على واجهة API واحدة يعمل بشكل جيد.

## أخطاء شائعة

**إدراج شرطة مائلة نهائية في الأصل.** `https://example.com/` ليس هو `https://example.com`. يجب أن يطابق الأصل مطابقة تامة، ويرسل المتصفح الأصول دون شرطة مائلة نهائية.

**نسيان إدراج المنفذ في localhost.** `http://localhost` و`http://localhost:3000` أصلان مختلفان. إذا كان خادم التطوير لديك يعمل على المنفذ 3000، فيجب أن يتضمّن الأصل `:3000`.

**ضبط ترويسات CORS في دالة Lambda بدلًا من تهيئة API.** بالنسبة إلى HTTP APIs (التي تستخدمها هذه الدورة في كل مكان)، هذا هشّ — إذ يجب عليك التعامل مع طلبات OPTIONS في معالجك وتذكّر إدراج ترويسات CORS في كل استجابة. دع API Gateway يتولّى ذلك. فهذا هو الغرض من تهيئة CORS المدمجة.

> **واجهات REST API مختلفة**
>
> إذا وجدت نفسك لاحقًا على REST API (النسخة الأقدم من API Gateway) أو تكامل غير وكيل، فإن CORS يُهيَّأ بشكل مختلف: لا يوجد علم `--cors-configuration`، وستحتاج إلى تهيئة أسلوب OPTIONS لكل مورد، وإما تفعيل مساعدات CORS في وحدة التحكم أو ضبط الترويسات في تعيين استجابة الأسلوب. لا تزال قاعدة «لا تضع CORS في المعالج» سارية، لكن المكان الذي تضعها فيه يتغيّر.

واجهة API لديك قابلة للاستدعاء من واجهتك الأمامية. لكن لديها الآن عنوان URL واحد: نقطة النهاية `execute-api` المولّدة تلقائيًا. من المحتمل أنك تريد نطاقًا مخصّصًا مثل `api.example.com`، وربما تريد بيئات منفصلة للتطوير والإنتاج. يغطي الدرس التالي المراحل وعمليات النشر وأسماء النطاقات المخصّصة.
