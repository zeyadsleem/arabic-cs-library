---
title: "حالات الاستخدام الشائعة"
---

تحلّ دوال الحافة فئة محدّدة من المشكلات: أمورًا تحتاج إلى إنجازها في كل طلب (أو في كل استجابة) قبل أن يرى العميل أو الأصل حركة المرور. على منصات مثل Vercel أو Netlify، يعيش هذا المنطق في ملفات تهيئة أو وسيط أو دوال حافة بأسماء مشابهة. وعلى AWS، يعيش في CloudFront Functions أو Lambda@Edge، حسب التعقيد. ومن تجربتي، تتكرر حالتا إعادة كتابة URL وإعادة التوجيه باستمرار—أما البقية فظرفية لكنها تستحق المعرفة.

إن أردت نسخة AWS من سلوك وقت التشغيل أثناء قراءتك، فـ[دليل CloudFront Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) هو المرجع الرسمي.

يغطّي هذا الدرس أكثر حالات الاستخدام شيوعًا عند مهندسي الواجهة الأمامية. وكل حالة تتضمن مقطع شيفرة قصيرًا يمكنك تكييفه. وللمقارنة الكاملة بين متى تستخدم CloudFront Functions ومتى تستخدم Lambda@Edge، ارجع إلى [Lambda@Edge مقابل CloudFront Functions](https://stevekinney.com/courses/aws/edge-compute-comparison).

## إعادة كتابة URL

تغيّر إعادة كتابة URL مسار الطلب دون أن يعلم العميل. فما زال المتصفح يعرض URL الأصلي، لكن CloudFront (أو الأصل) يقدّم المحتوى من مسار مختلف.

أكثر إعادة كتابة شيوعًا عند مهندسي الواجهة الأمامية: ترجمة URLs النظيفة إلى مفاتيح كائنات S3 الفعلية.

### دالة CloudFront

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Rewrite /docs/getting-started to /docs/getting-started/index.html
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
```

هذه دالة **طلب المشاهد**. تعمل قبل فحص الذاكرة المؤقتة، لذا تخزّن CloudFront المحتوى مؤقتًا تحت URI المُعاد كتابته.

## إعادة التوجيه

تخبر إعادة التوجيه المتصفح بالذهاب إلى URL مختلف. وخلافًا لإعادة الكتابة، يرى العميل URL الجديد في شريط العنوان.

### دالة CloudFront

```javascript
function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;

  // Redirect www to apex domain
  if (host === 'www.example.com') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://example.com' + request.uri },
      },
    };
  }

  return request;
}
```

يمكنك أيضًا بناء خريطة إعادة توجيه للصفحات المرحّلة:

```javascript
var redirects = {
  '/old-blog': '/blog',
  '/about-us': '/about',
  '/docs/v1': '/docs',
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

> **نصيحة**
>
> أبقِ خريطة إعادة التوجيه صغيرة. فيجب أن تتّسع دالتك كاملة في 10 KB عند استخدام CloudFront Functions. فإن كانت لديك مئات من عمليات إعادة التوجيه، فالجواب الصحيح هو **CloudFront KeyValueStore** (KVS، متاح عمومًا منذ ديسمبر 2023): أبقِ الدالة نفسها صغيرة، وخزّن خريطة إعادة التوجيه في نسخة KVS، واقرأها في وقت التشغيل عبر واجهة `cf.kvs()`. فتبقى الدالة أقل بكثير من حد الحجم، وتُحدَّث البيانات باستقلال دون إعادة نشر الدالة. أما المنطق المعقّد حقًا الذي يحتاج إلى وصول شبكي، فاستخدم دالة Lambda@Edge مع مشغّل طلب الأصل.

## ترويسات الأمان

يمكنك إضافة ترويسات أمان باستخدام سياسة ترويسات استجابة في CloudFront—وقد أعددت واحدة في [ترويسات CloudFront وCORS والأمان](https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security). لكن إن كنت تحتاج إلى منطق ترويسات شرطي أو ترويسات تعتمد على الطلب، فدالة الحافة تمنحك تحكمًا أكبر.

### دالة CloudFront (استجابة المشاهد)

```javascript
function handler(event) {
  var response = event.response;
  var headers = response.headers;

  headers['strict-transport-security'] = {
    value: 'max-age=63072000; includeSubDomains; preload',
  };
  headers['x-content-type-options'] = { value: 'nosniff' };
  headers['x-frame-options'] = { value: 'DENY' };
  headers['x-xss-protection'] = { value: '1; mode=block' };
  headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };
  headers['content-security-policy'] = {
    value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'",
  };

  return response;
}
```

*ملاحظة:* عدّل توجيه `Content-Security-Policy` ليطابق متطلبات تطبيقك.

هذه دالة **استجابة المشاهد**. تعمل بعد أن يحصل CloudFront على الاستجابة (من الذاكرة المؤقتة أو من الأصل) وقبل أن يرسلها إلى العميل.

## التوجيه الجغرافي

تضيف CloudFront ترويسات تحديد الموقع الجغرافي إلى الطلبات قبل أن تصل إلى دالة الحافة لديك. ويمكنك استخدام هذه الترويسات لتوجيه المستخدمين إلى محتوى خاص بمنطقة أو لتخصيص الاستجابة حسب الموقع.

### Lambda@Edge (طلب الأصل)

```typescript
import type { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  const country = request.headers['cloudfront-viewer-country']?.[0]?.value;

  if (country === 'DE' || country === 'AT' || country === 'CH') {
    request.uri = '/de' + request.uri;
  } else if (country === 'FR') {
    request.uri = '/fr' + request.uri;
  }

  return request;
};
```

*ملاحظة:* الافتراضي: تقديم النسخة الإنجليزية على URI الأصلي.

> **تحذير**
>
> لا تتوفر ترويسة `cloudfront-viewer-country` إلا إذا كانت تهيئة سلوك الذاكرة المؤقتة لديك تمرّرها. في سياسة الذاكرة المؤقتة أو سياسة طلب الأصل في توزيعك، يجب أن تضع الترويسة `CloudFront-Viewer-Country` في القائمة المسموحة. فبدون ذلك، لن تظهر الترويسة في حدث دالتك.

هذه دالة Lambda@Edge لأن التوجيه الجغرافي يحتاج عادةً إلى العمل على مستوى **طلب الأصل**—فأنت تريد أن يكون قرار التوجيه قابلًا للتخزين المؤقت لكل بلد، لا أن يُعاد تقييمه في كل طلب مشاهد.

## فحوصات المصادقة على الحافة

للمحتوى الخاص—صفحات الأعضاء فقط، ولوحات الإدارة، وبيئات الاختبار—يمكنك التحقق من المصادقة قبل أن يصل الطلب أصلًا إلى أصلك.

### دالة CloudFront (مصادقة أساسية لبيئة الاختبار)

```javascript
function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var expected = 'Basic ' + 'c3RhZ2luZzpwYXNzd29yZA==';

  if (!headers.authorization || headers.authorization.value !== expected) {
    return {
      statusCode: 401,
      statusDescription: 'Unauthorized',
      headers: {
        'www-authenticate': { value: 'Basic realm="Staging"' },
      },
    };
  }

  return request;
}
```

هذا مثال أدنى لحماية بيئة اختبار بمصادقة HTTP الأساسية (اسم المستخدم: `staging`، وكلمة المرور: `password`). وهو ليس حل مصادقة للإنتاج—فبيانات الاعتماد مضمّنة في الشيفرة ومشفّرة بـ base64 داخل الدالة.

### Lambda@Edge (التحقق من JWT)

من أجل مصادقة حقيقية، تحتاج إلى Lambda@Edge لأنك غالبًا تحتاج إلى التحقق من JWT، وهذا يتطلب إما مكتبة تشفير أو استدعاءً شبكيًا إلى نقطة نهاية JWKS.

```typescript
import type { CloudFrontRequestHandler } from 'aws-lambda';
import { verify } from 'jsonwebtoken';

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
...your public key here...
-----END PUBLIC KEY-----`;

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  const cookies = request.headers.cookie;

  const token = parseCookie(cookies, 'auth_token');

  if (!token) {
    return {
      status: '401',
      statusDescription: 'Unauthorized',
      body: 'Missing authentication token',
    };
  }

  try {
    verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
    return request;
  } catch {
    return {
      status: '403',
      statusDescription: 'Forbidden',
      body: 'Invalid authentication token',
    };
  }
};

function parseCookie(
  cookieHeaders: Array<{ key?: string; value: string }> | undefined,
  name: string,
): string | undefined {
  if (!cookieHeaders) return undefined;
  for (const header of cookieHeaders) {
    const match = header.value.match(new RegExp(`${name}=([^;]+)`));
    if (match) return match[1];
  }
  return undefined;
}
```

تتحقق هذه الدالة من JWT قادم من ملف تعريف ارتباط في كل طلب مشاهد. وهي تستخدم حزمة `jsonwebtoken` من npm—ولهذا يجب أن تكون Lambda@Edge لا CloudFront Function.

> **نصيحة**
>
> إن ضمّنت المفتاح العام مباشرة في الدالة (بدلًا من جلبه من نقطة نهاية JWKS)، فتتجنّب استدعاءً شبكيًا في كل طلب. والمقايضة أنك تحتاج إلى إعادة نشر الدالة عندما يُدوَّر المفتاح.

## كشف اللغة

كشف اللغة المفضّلة للمستخدم من ترويسة `Accept-Language` وتقديم محتوى محلي نمط شائع آخر.

### دالة CloudFront

```javascript
function handler(event) {
  var request = event.request;
  var acceptLanguage = request.headers['accept-language'];

  if (acceptLanguage) {
    var lang = acceptLanguage.value.substring(0, 2).toLowerCase();
    var supported = ['en', 'es', 'fr', 'de', 'ja'];

    if (supported.indexOf(lang) !== -1) {
      request.headers['x-detected-language'] = { value: lang };
    } else {
      request.headers['x-detected-language'] = { value: 'en' };
    }
  } else {
    request.headers['x-detected-language'] = { value: 'en' };
  }

  return request;
}
```

يضبط هذا ترويسة مخصّصة يستطيع أصلك أو دالة حافة أخرى استخدامها لتقديم المحتوى الصحيح. وتعمل الدالة كدالة **طلب مشاهد** كي يحدث كشف اللغة قبل فحص الذاكرة المؤقتة.

## اختيار المشغّل الصحيح

كل حالة استخدام أعلاه تقابل نوع حدث محدّدًا. إليك مرجعًا سريعًا:

| حالة الاستخدام | نوع الحدث | الموصى به |
| --- | --- | --- |
| إعادة كتابة URL (URLs نظيفة) | طلب المشاهد | دالة CloudFront |
| إعادة التوجيه | طلب المشاهد | دالة CloudFront |
| ترويسات الأمان | استجابة المشاهد | دالة CloudFront |
| التوجيه الجغرافي | طلب الأصل | Lambda@Edge |
| المصادقة الأساسية لبيئة الاختبار | طلب المشاهد | دالة CloudFront |
| التحقق من JWT | طلب المشاهد | Lambda@Edge |
| كشف اللغة | طلب المشاهد | دالة CloudFront |
| اختبار A/B | طلب المشاهد | أيّهما (يعتمد على التعقيد) |

الدرس التالي، [اختبار A/B على الحافة](https://stevekinney.com/courses/aws/ab-testing-at-the-edge)، يتعمّق في واحدة من أكثر حالات الاستخدام إثارة للاهتمام.
