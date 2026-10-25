---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/aws/cloudfront-function-solution"
---

هذا هو الحل الكامل لكل خطوة، بما في ذلك شيفرة الدالة، وكل أوامر CLI، والمخرجات المتوقعة في كل مرحلة.

إذا أردت أن تطّلع على نسخة AWS من سلوك وقت التشغيل أثناء القراءة، فإن [دليل CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) هو المرجع الرسمي.

## لماذا ينجح هذا

- دوال طلب المشاهد (viewer-request) يمكنها تغيير التوجيه قبل أن تقرّر CloudFront ما تجلبه، ولهذا تنتمي عمليات إعادة التوجيه إلى هناك.
- دوال استجابة المشاهد (viewer-response) يمكنها تعديل الترويسات أثناء الخروج، ما يجعلها المكان المناسب لترويسات الأمان.
- النشر إلى `LIVE` وربط الدالة بالتوزيع هو الخطوة التشغيلية التي تحوّل شيفرة عاملة إلى سلوك حقيقي على الحافة.

> **نصيحة**
>
> كل دوال CloudFront Functions من هذا التمرين متاحة كملفات مستقلة في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/tree/main/cloudfront/functions).

## دالة ترويسات الأمان

```javascript
function handler(event) {
  var response = event.response;
  var headers = response.headers;

  headers['strict-transport-security'] = {
    value: 'max-age=63072000; includeSubDomains; preload',
  };
  headers['x-content-type-options'] = { value: 'nosniff' };
  headers['x-frame-options'] = { value: 'DENY' };
  headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };

  return response;
}
```

*ملاحظة:* إن ضبط الخصائص على كائن `headers` الموجود يحافظ على أي ترويسات موجودة أصلًا.

### إنشاء الدالة

```bash
aws cloudfront create-function \
  --name security-headers \
  --function-config '{"Comment":"Add security headers to all responses","Runtime":"cloudfront-js-2.0"}' \
  --function-code 'function handler(event) { var response = event.response; var headers = response.headers; headers["strict-transport-security"] = { value: "max-age=63072000; includeSubDomains; preload" }; headers["x-content-type-options"] = { value: "nosniff" }; headers["x-frame-options"] = { value: "DENY" }; headers["referrer-policy"] = { value: "strict-origin-when-cross-origin" }; return response; }' \
  --region us-east-1 \
  --output json
```

المخرجات المتوقعة (مختصرة):

```json
{
  "Location": "https://cloudfront.amazonaws.com/2020-05-31/function/security-headers",
  "ETag": "ETVPDKIKX0DER",
  "FunctionSummary": {
    "Name": "security-headers",
    "Status": "UNPUBLISHED",
    "FunctionConfig": {
      "Comment": "Add security headers to all responses",
      "Runtime": "cloudfront-js-2.0"
    },
    "FunctionMetadata": {
      "FunctionARN": "arn:aws:cloudfront::123456789012:function/security-headers",
      "Stage": "DEVELOPMENT"
    }
  }
}
```

احفظ قيمة `ETag` — ستحتاجها للاختبار والنشر.

### اختبار الدالة

```bash
aws cloudfront test-function \
  --name security-headers \
  --if-match ETVPDKIKX0DER \
  --event-object '{"version":"1.0","context":{"eventType":"viewer-response"},"viewer":{"ip":"0.0.0.0"},"request":{"method":"GET","uri":"/","querystring":{},"headers":{},"cookies":{}},"response":{"statusCode":200,"statusDescription":"OK","headers":{"content-type":{"value":"text/html"}},"cookies":{}}}' \
  --stage DEVELOPMENT \
  --region us-east-1 \
  --output json
```

المتوقع: تتضمن نتيجة الدالة ترويسات الأمان الأربعة **و** ترويسة `content-type` الأصلية:

```json
{
  "TestResult": {
    "FunctionSummary": {
      "Name": "security-headers",
      "Status": "UNPUBLISHED"
    },
    "ComputeUtilization": "12",
    "FunctionOutput": "{\"response\":{\"statusCode\":200,\"statusDescription\":\"OK\",\"headers\":{\"content-type\":{\"value\":\"text/html\"},\"strict-transport-security\":{\"value\":\"max-age=63072000; includeSubDomains; preload\"},\"x-content-type-options\":{\"value\":\"nosniff\"},\"x-frame-options\":{\"value\":\"DENY\"},\"referrer-policy\":{\"value\":\"strict-origin-when-cross-origin\"}},\"cookies\":{}}}"
  }
}
```

ينبغي أن تكون قيمة `ComputeUtilization` منخفضة (أقل بكثير من 100). إذا اقتربت من 100، فالدالة بطيئة جدًا.

## دالة إعادة التوجيه القديمة

```javascript
function handler(event) {
  var request = event.request;

  if (request.uri === '/old-path') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: '/new-path' },
      },
    };
  }

  return request;
}
```

### إنشاء الدالة

```bash
aws cloudfront create-function \
  --name legacy-redirect \
  --function-config '{"Comment":"Redirect /old-path to /new-path","Runtime":"cloudfront-js-2.0"}' \
  --function-code 'function handler(event) { var request = event.request; if (request.uri === "/old-path") { return { statusCode: 301, statusDescription: "Moved Permanently", headers: { location: { value: "/new-path" } } }; } return request; }' \
  --region us-east-1 \
  --output json
```

احفظ `ETag`.

### الاختبار: طلب إلى /old-path

```bash
aws cloudfront test-function \
  --name legacy-redirect \
  --if-match ETVPDKIKX0DER \
  --event-object '{"version":"1.0","context":{"eventType":"viewer-request"},"viewer":{"ip":"0.0.0.0"},"request":{"method":"GET","uri":"/old-path","querystring":{},"headers":{"host":{"value":"example.com"}},"cookies":{}}}' \
  --stage DEVELOPMENT \
  --region us-east-1 \
  --output json
```

المتوقع: استجابة 301 مع `location: /new-path`:

```json
{
  "TestResult": {
    "FunctionSummary": {
      "Name": "legacy-redirect",
      "Status": "UNPUBLISHED"
    },
    "ComputeUtilization": "8",
    "FunctionOutput": "{\"response\":{\"statusCode\":301,\"statusDescription\":\"Moved Permanently\",\"headers\":{\"location\":{\"value\":\"/new-path\"}}}}"
  }
}
```

### الاختبار: طلب إلى /about (تمرير)

```bash
aws cloudfront test-function \
  --name legacy-redirect \
  --if-match ETVPDKIKX0DER \
  --event-object '{"version":"1.0","context":{"eventType":"viewer-request"},"viewer":{"ip":"0.0.0.0"},"request":{"method":"GET","uri":"/about","querystring":{},"headers":{"host":{"value":"example.com"}},"cookies":{}}}' \
  --stage DEVELOPMENT \
  --region us-east-1 \
  --output json
```

المتوقع: يمرّ الطلب دون تغيير — يحتوي `FunctionOutput` على كائن الطلب الأصلي مع `uri: "/about"`.

## نشر الدالتين

```bash
aws cloudfront publish-function \
  --name security-headers \
  --if-match ETVPDKIKX0DER \
  --region us-east-1 \
  --output json
```

```bash
aws cloudfront publish-function \
  --name legacy-redirect \
  --if-match ETVPDKIKX0DER \
  --region us-east-1 \
  --output json
```

استبدل قيم `ETag` بالقيم التي تلقّيتها من خطوة الإنشاء (أو من أحدث عملية على كل دالة). كل عملية نشر تُرجع `ETag` جديدًا.

### التحقق من أن كلتيهما LIVE

```bash
aws cloudfront describe-function \
  --name security-headers \
  --stage LIVE \
  --region us-east-1 \
  --output json
```

```bash
aws cloudfront describe-function \
  --name legacy-redirect \
  --stage LIVE \
  --region us-east-1 \
  --output json
```

ينبغي أن تُظهر كلتاهما `"Stage": "LIVE"` في الاستجابة.

## الربط بالتوزيع

### الحصول على إعدادات التوزيع الحالية

```bash
aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json > dist-config.json
```

### تحرير إعدادات التوزيع

افتح `dist-config.json`. ابحث عن قسم `DefaultCacheBehavior` وأضف كتلة `FunctionAssociations`:

```json
{
  "DefaultCacheBehavior": {
    "FunctionAssociations": {
      "Quantity": 2,
      "Items": [
        {
          "FunctionARN": "arn:aws:cloudfront::123456789012:function/legacy-redirect",
          "EventType": "viewer-request"
        },
        {
          "FunctionARN": "arn:aws:cloudfront::123456789012:function/security-headers",
          "EventType": "viewer-response"
        }
      ]
    }
  }
}
```

> **نصيحة**
>
> تُغلّف استجابة `get-distribution-config` الإعدادات في مفتاح `DistributionConfig` وتتضمن ترويسة `ETag`. حين تمرّر الإعدادات إلى `update-distribution`، فأنت تحتاج كائن `DistributionConfig` الداخلي (لا الغلاف الخارجي) وقيمة `ETag` كقيمة `--if-match`.

### تحديث التوزيع

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match ETAG_FROM_GET \
  --distribution-config file://dist-config.json \
  --region us-east-1 \
  --output json
```

### انتظار اكتمال النشر

```bash
aws cloudfront wait distribution-deployed \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1
```

يحجب هذا الأمر التنفيذ حتى تتغيّر حالة التوزيع من `InProgress` إلى `Deployed`. قد يستغرق بضع دقائق.

## التحقق في بيئة الإنتاج

### التحقق من ترويسات الأمان

```bash
curl -I https://d111111abcdef8.cloudfront.net/
```

الترويسات المتوقعة في الاستجابة:

```
HTTP/2 200
content-type: text/html
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
```

### التحقق من إعادة التوجيه

```bash
curl -I https://d111111abcdef8.cloudfront.net/old-path
```

المتوقع:

```
HTTP/2 301
location: /new-path
```

### التحقق من تمرير المسارات الأخرى

```bash
curl -I https://d111111abcdef8.cloudfront.net/about
```

المتوقع: استجابة 200 عادية (أو 404 إن لم تكن الصفحة موجودة) مع وجود ترويسات الأمان ودون إعادة توجيه.

## هدف إضافي: سياسة أمان المحتوى

وسّع دالة ترويسات الأمان لتضمّن ترويسة CSP:

```javascript
function handler(event) {
  var response = event.response;
  var headers = response.headers;

  headers['strict-transport-security'] = {
    value: 'max-age=63072000; includeSubDomains; preload',
  };
  headers['x-content-type-options'] = { value: 'nosniff' };
  headers['x-frame-options'] = { value: 'DENY' };
  headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };
  headers['content-security-policy'] = {
    value:
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'",
  };

  return response;
}
```

بعد تحديث شيفرة الدالة باستخدام `aws cloudfront update-function`، تذكّر أن تنشرها مرة أخرى — فالتحديث لا يغيّر إلا مرحلة `DEVELOPMENT`.

## هدف إضافي: عمليات إعادة توجيه متعددة

استبدل فحص المسار الواحد بخريطة إعادة توجيه:

```javascript
var redirects = {
  '/old-path': '/new-path',
  '/blog/old-post': '/blog/new-post',
  '/docs/v1': '/docs',
  '/legacy': '/',
};

function handler(event) {
  var request = event.request;
  var target = redirects[request.uri];

  if (target) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: target },
      },
    };
  }

  return request;
}
```

يتوسّع هذا ليشمل أكبر عدد ممكن من عمليات إعادة التوجيه ضمن 10 كيلوبايت.

## التنظيف

لا يمكن حذف دالة CloudFront Function ما دامت مرتبطة بأي توزيع. افصل الارتباط أولًا، وانتظر حتى يصل التوزيع إلى حالة `Deployed`، ثم احذف.

```bash
# After removing FunctionAssociations from the distribution config
# and waiting for Deployed status, fetch the current ETag:
ETAG=$(aws cloudfront describe-function \
  --name url-rewrite \
  --query 'ETag' --output text \
  --region us-east-1)

aws cloudfront delete-function \
  --name url-rewrite \
  --if-match "$ETAG" \
  --region us-east-1
```

كرّر الأمر مع دالة `security-headers` إن كنت قد أنشأتها أيضًا.
