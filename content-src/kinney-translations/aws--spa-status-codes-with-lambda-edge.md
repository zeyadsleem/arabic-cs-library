---
title: "رموز حالة تطبيقات SPA باستخدام Lambda@Edge"
---

دالة CloudFront Function الخاصة بك تعيد كتابة كل المسارات غير الملفية إلى `/index.html`، وSPA يتولى الباقي. ويمكن للمستخدمين تحديث الصفحة على `/notes/abc123` فيعمل التطبيق. لكن كل مسار—صالحًا كان أو غير صالح—يعيد رمز الحالة 200. فـ `/notes/abc123` يعيد 200، و`/totally-fake-path` يعيد 200، و`/admin/secret/please` يعيد 200. ويعرض SPA مكوّن «غير موجود» للمسارات غير المعروفة، لكن استجابة HTTP تقول إن كل شيء على ما يرام.

إن أردت نسخة AWS من نموذج أحداث Lambda@Edge قريبة منك أثناء القراءة، فإن [دليل Lambda@Edge](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html) هو المرجع الرسمي.

هذا مهم في الإنتاج. فزاحفات محركات البحث تستخدم رمز الحالة، لا المحتوى المرئي، لتقرر ما إذا كانت الصفحة حقيقية. ورمز 200 على مسار نفايات يعني أن Google قد تفهرسه. ولا تستطيع أدوات المراقبة التمييز بين حركة حقيقية وروبوتات تضرب عناوين عشوائية. وإذا احتجت يومًا إلى تصحيح سلسلة إعادة توجيه أو تعقّب روابط معطوبة من مواقع خارجية، فإن إعادة كل مسار لرمز 200 تجعل السجلات عديمة الفائدة.

الإصلاح هو دالة Lambda@Edge تتحقق من عنوان URL الأصلي مقابل مسارات تطبيقك المعروفة وتعيد 404 لأي شيء لا يطابقها—مع الاستمرار في تقديم HTML كي يعرض SPA واجهة «غير موجود».

## البنية

يتطلب هذا دالتين على الحافة تعملان معًا:

```
sequenceDiagram
    participant Browser
    participant CF as CloudFront Function<br/>(viewer-request)
    participant Cache as CloudFront Cache
    participant S3
    participant Edge as Lambda@Edge<br/>(viewer-response)

    Browser->>CF: GET /totally-fake-path
    CF->>CF: Set x-original-uri: /totally-fake-path
    CF->>Cache: Rewritten: GET /index.html
    alt Cache miss
        Cache->>S3: GET /index.html
        S3-->>Cache: 200 + HTML
    end
    Cache->>Edge: Response + original request headers
    Edge->>Edge: /totally-fake-path doesn't match known routes
    Edge-->>Browser: 404 + HTML (SPA renders NotFound)
```

1. **CloudFront Function (viewer-request):** تخزّن URI الأصلي في ترويسة مخصصة قبل إعادة الكتابة إلى `/index.html`.
2. **Lambda@Edge (viewer-response):** تقرأ URI الأصلي من الترويسة، وتتحقق منه مقابل أنماط المسارات المعروفة، وتضبط رمز الحالة على 404 إن لم يطابق.

لماذا Lambda@Edge وليس CloudFront Function لحدث viewer-response؟ يمكنك إجراء مطابقة أنماط بسيطة في CloudFront Function. لكن Lambda@Edge تصبح أكثر منطقية عندما تكون أنماط المسارات معقدة، أو عندما تريد تحميلها من بيان بناء، أو عندما تحتاج إلى وقت تشغيل Node.js الكامل لمنطق المطابقة. وهي أيضًا فرصة جيدة لرؤية Lambda@Edge في عملها على مشكلة حقيقية بعد تعلّم الآلية في [كتابة دالة Lambda@Edge](https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function).

## الخطوة 1: تحديث دالة CloudFront

تحتاج دالة CloudFront Function الخاصة بك إلى حفظ URI الأصلي قبل إعادة كتابته. فبدون ذلك، لا ترى دالة Lambda@Edge إلا `/index.html`—الـ URI المُعاد كتابته—ولا سبيل لها إلى معرفة ما طلبه المشاهد فعلًا.

حدّث دالة إعادة كتابة SPA:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.includes('.')) {
    return request;
  }

  // Pass the original URI to downstream functions
  request.headers['x-original-uri'] = { value: uri };
  request.uri = '/index.html';

  return request;
}
```

تنتقل ترويسة `x-original-uri` مع الطلب عبر خط أنابيب CloudFront. وتقرأها دالة Lambda@Edge من كائن الطلب في حدث viewer-response.

حدّث الدالة وأعد نشرها باستخدام سير العمل من [كتابة CloudFront Function](https://stevekinney.com/courses/aws/writing-a-cloudfront-function):

```bash
aws cloudfront update-function \
  --name url-rewrite \
  --if-match CURRENT_ETAG \
  --function-config '{"Comment":"SPA rewrite with original URI passthrough","Runtime":"cloudfront-js-2.0"}' \
  --function-code fileb://url-rewrite.js \
  --region us-east-1 \
  --output json
```

ثم انشر:

```bash
aws cloudfront publish-function \
  --name url-rewrite \
  --if-match ETAG_FROM_UPDATE \
  --region us-east-1 \
  --output json
```

## الخطوة 2: كتابة دالة Lambda@Edge

أنشئ دالة Lambda@Edge تعمل على أحداث **viewer-response**. فهي تقرأ URI الأصلي من الترويسة المخصصة وتتحقق منه مقابل أنماط المسارات التي يتعرف عليها موجّه Scratch Lab من جهة العميل.

```typescript
import type { CloudFrontResponseHandler } from 'aws-lambda';

// Route patterns that the SPA knows how to handle.
// These mirror the patterns in src/hooks/use-router.ts.
const knownRoutes: RegExp[] = [
  /^\/$/, // Home
  /^\/notes\/[^/]+$/, // Note detail: /notes/:id
];

export const handler: CloudFrontResponseHandler = async (event) => {
  const response = event.Records[0].cf.response;
  const request = event.Records[0].cf.request;

  // Read the original URI stashed by the CloudFront Function.
  // If the header is missing, this is a request for a static file—leave it alone.
  const originalUriHeader = request.headers['x-original-uri'];
  if (!originalUriHeader || !originalUriHeader[0]) {
    return response;
  }

  const originalUri = originalUriHeader[0].value;
  const isKnownRoute = knownRoutes.some((pattern) => pattern.test(originalUri));

  if (!isKnownRoute) {
    response.status = '404';
    response.statusDescription = 'Not Found';
  }

  return response;
};
```

*ملاحظة:* أبقِ هذه الأنماط متزامنة مع موجّهك من جهة العميل. فإذا أضفت مسارًا إلى التطبيق، فأضف نمطًا هنا.

بضعة أمور جديرة بالملاحظة:

- **لا يتغير جسم الاستجابة.** فالـ HTML هو `index.html` نفسه بغض النظر عن رمز الحالة. ويعرض SPA مكوّن `NotFound` للمسارات غير المعروفة بناءً على URL، لا على رمز الحالة. فرموز الحالة للآلات—الزاحفات وأدوات المراقبة وسجلات وصولك.
- **`response.status` سلسلة نصية.** هذه غرابة Lambda@Edge من [كتابة دالة Lambda@Edge](https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function)—`'404'` وليس `404`.
- **طلبات الملفات الثابتة تتجاوز الفحص.** إذا لم تضبط CloudFront Function الترويسة `x-original-uri`، فالطلب كان لملف بامتداد (CSS أو JS أو صور). وينبغي أن تحتفظ تلك الملفات برمز الحالة الذي أعادته S3.

## الخطوة 3: نشر دالة Lambda@Edge

ابنِ الدالة وحزمها بالطريقة نفسها التي فعلتها في [كتابة دالة Lambda@Edge](https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function):

```bash
npx tsc --outDir dist
cd dist && zip -r ../function.zip . && cd ..
```

### إنشاء دور التنفيذ

إن لم يكن لديك دور بالفعل من درس Lambda@Edge، فأنشئ دورًا يثق بـ `lambda.amazonaws.com` و`edgelambda.amazonaws.com`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name my-frontend-app-status-code-role \
  --assume-role-policy-document file://edge-trust-policy.json \
  --region us-east-1 \
  --output json

aws iam attach-role-policy \
  --role-name my-frontend-app-status-code-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
  --region us-east-1 \
  --output json
```

### النشر إلى us-east-1

```bash
aws lambda create-function \
  --function-name my-frontend-app-status-codes \
  --runtime nodejs22.x \
  --role arn:aws:iam::123456789012:role/my-frontend-app-status-code-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --region us-east-1 \
  --output json
```

### نشر نسخة مرقّمة

تتطلب Lambda@Edge نسخة منشورة—لا يمكنك استخدام `$LATEST`:

```bash
aws lambda publish-version \
  --function-name my-frontend-app-status-codes \
  --description "SPA status code routing" \
  --region us-east-1 \
  --output json
```

احفظ ARN المنسوخ من الاستجابة (ينتهي بـ `:1`).

## الخطوة 4: الربط بتوزيعك

استرجع إعداد توزيعك وأضف دالة Lambda@Edge إلى `LambdaFunctionAssociations` في السلوك الافتراضي:

```json
{
  "LambdaFunctionAssociations": {
    "Quantity": 1,
    "Items": [
      {
        "LambdaFunctionARN": "arn:aws:lambda:us-east-1:123456789012:function/my-frontend-app-status-codes:1",
        "EventType": "viewer-response",
        "IncludeBody": false
      }
    ]
  }
}
```

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match ETAG_FROM_GET \
  --distribution-config file://dist-config.json \
  --region us-east-1 \
  --output json
```

> **تحذير**
>
> لا يمكن للسلوك أن يحمل إلا دالة واحدة لكل نوع حدث. فإذا كانت لديك CloudFront Function على `viewer-response` (مثل دالة ترويسات الأمان من [التمرين](https://stevekinney.com/courses/aws/cloudfront-function-exercise))، فستحتاج إما إلى نقل هذا المنطق إلى دالة Lambda@Edge هذه، أو إلى استخدام [سياسة ترويسات استجابة مُدارة](https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security) بدلًا منها. ويمكنك أن تجمع CloudFront Function على `viewer-request` مع Lambda@Edge على `viewer-response` في السلوك نفسه—فهما على نوعي حدث مختلفين.

انتظر حتى يُنشر التوزيع:

```bash
aws cloudfront wait distribution-deployed \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1
```

## الخطوة 5: اختبار رموز الحالة

بعد نشر التوزيع، تحقق من رموز الحالة:

```bash
# Valid route: home page
curl -s -o /dev/null -w "%{http_code}" https://YOUR_CLOUDFRONT_DOMAIN/
# Expected: 200

# Valid route: a note page
curl -s -o /dev/null -w "%{http_code}" https://YOUR_CLOUDFRONT_DOMAIN/notes/abc123
# Expected: 200

# Invalid route: random path
curl -s -o /dev/null -w "%{http_code}" https://YOUR_CLOUDFRONT_DOMAIN/totally-fake-path
# Expected: 404

# Invalid route: almost a valid path
curl -s -o /dev/null -w "%{http_code}" https://YOUR_CLOUDFRONT_DOMAIN/notes/
# Expected: 404

# Static asset: still served normally
curl -s -o /dev/null -w "%{http_code}" https://YOUR_CLOUDFRONT_DOMAIN/favicon.svg
# Expected: 200
```

افتح نطاق CloudFront في متصفح وانتقل إلى `/totally-fake-path`. ينبغي أن يعرض SPA واجهة «غير موجود»—التجربة البصرية نفسها كما كانت. لكن رمز حالة HTTP الآن 404، وهو ما ستراه محركات البحث وأدوات المراقبة وسجلات CloudWatch الخاصة بك.

## إبقاء المسارات متزامنة

يجب أن تطابق أنماط المسارات في دالة Lambda@Edge موجّهك من جهة العميل. فإذا أضفت مسارًا جديدًا إلى تطبيق Scratch Lab (مثلًا `/settings`)، فعليك إضافة نمط إلى دالة Lambda@Edge ونشر نسخة جديدة.

ولتطبيق صغير مثل Scratch Lab، صيانة القائمة يدويًا أمر مقبول. أما لتطبيق أكبر، فلديك بضعة خيارات:

- **توليد قائمة الأنماط وقت البناء.** استخرج أنماط المسارات من إعداد الموجّه واكتبها في مصدر دالة Lambda قبل التحزيم.
- **استخدام CloudFront KeyValueStore.** خزّن أنماط المسارات في نسخة KVS تقرأها الدالة وقت التشغيل، وحدّث الأنماط دون إعادة نشر الدالة.
- **قبول المقايضة.** إذا أعاد مسار غير معروف رمز 200 لفترة وجيزة قبل تحديث الدالة، فذلك مقبول عادةً. فالهدف الأساسي هو منع رموز 200 الدائمة على مسارات النفايات.

## التنظيف

لإزالة دالة Lambda@Edge، افصلها أولًا عن التوزيع، وانتظر حتى يصل التوزيع إلى حالة `Deployed`، ثم احذف الدالة. وتستغرق نسخ Lambda@Edge وقتًا في التنظيف—راجع [كتابة دالة Lambda@Edge](https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function) لتسلسل التنظيف الكامل.
