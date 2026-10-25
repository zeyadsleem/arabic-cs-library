---
title: "اختبار A/B على الحافة"
---

يتضمن اختبار A/B في الواجهة الأمامية عادةً مكتبة على جهة العميل مثل LaunchDarkly أو Optimizely تبدّل المحتوى بعد تحميل الصفحة. المشكلة: هناك وميض للمحتوى، أو إزاحة في التخطيط، أو تأخير أثناء تهيئة المكتبة وتحديد المتغيّر الذي تعرضه. وتتلقى درجة Lighthouse ضربة.

إن أردت نسخة AWS من سلوك وقت التشغيل أثناء القراءة، فإن [دليل دوال CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) هو المرجع الرسمي.

تزيل دوال الحافة هذه المشكلة تمامًا. يحدث قرار التوجيه **قبل** وصول الاستجابة إلى المتصفح. يحصل المستخدم على نسخة واحدة من الصفحة—بلا وميض، وبلا SDK على جهة العميل، وبلا حزمة JavaScript إضافية. من منظور المستخدم، لا يوجد اختبار A/B يحدث على الإطلاق.

## كيف يعمل

تتكون الآلية من ثلاثة أجزاء:

1. **تخصيص الزوار الجدد لمتغيّر.** عندما يرسل المستخدم طلبه الأول وليس لديه ملف تعريف ارتباط للتجربة، تخصصه دالة الحافة عشوائيًا للمتغيّر A أو B وتضبط ملف تعريف ارتباط.
2. **توجيه الزوار العائدين حسب ملف تعريف الارتباط.** في الطلبات اللاحقة، تقرأ دالة الحافة ملف تعريف الارتباط وتوجّه إلى المتغيّر نفسه—فيحصل المستخدم على تجربة متسقة.
3. **تعديل الطلب بناءً على المتغيّر.** تعيد الدالة كتابة URI (فتقدّم ملفات ثابتة مختلفة) أو تضبط رأسًا يستخدمه أصلك لإعادة محتوى مختلف.

```
flowchart LR
    Request["Viewer request for /"] --> Cookie{"ab-variant cookie present?"}
    Cookie -- "No" --> Assign["Assign variant A or B"]
    Cookie -- "Yes" --> Reuse["Reuse existing variant"]
    Assign --> Rewrite["Rewrite URI to /a/index.html or /b/index.html"]
    Reuse --> Rewrite
    Rewrite --> Cache["CloudFront cache by rewritten URI"]
    Cache --> Response["Viewer response sets or refreshes cookie"]
```

يعمل هذا النهج مع دوال CloudFront وLambda@Edge معًا. يستخدم المثال أدناه دالة CloudFront لأن اختبار A/B على مستوى طلب المشاهد بسيط عادةً بما يكفي ليتسع ضمن قيودها. أما إذا كان منطق التوجيه لديك يتطلب استدعاءات شبكة أو حسابات معقدة، فاستخدم Lambda@Edge بدلًا منها.

## دالة CloudFront الكاملة

إليك تنفيذًا كاملًا يقسم الزيارات مناصفةً 50/50 بين متغيّرين:

```javascript
function handler(event) {
  var request = event.request;
  var cookies = request.cookies;
  var variant;

  // Check if the user already has a variant assignment
  if (cookies['ab-variant']) {
    variant = cookies['ab-variant'].value;
  } else {
    // Assign a new variant randomly
    variant = Math.random() < 0.5 ? 'a' : 'b';
  }

  // Normalize invalid cookie values
  if (variant !== 'a' && variant !== 'b') {
    variant = 'a';
  }

  // Rewrite the URI to serve the variant-specific page
  if (request.uri === '/' || request.uri === '/index.html') {
    request.uri = '/' + variant + '/index.html';
  }

  // Set the cookie on the response (via request header that CloudFront forwards)
  request.headers['x-ab-variant'] = { value: variant };

  return request;
}
```

*ملاحظة:* احترس من ملفات تعريف الارتباط المتلاعب بها بالرجوع إلى متغيّر معروف.

تفعل هذه الدالة ثلاثة أشياء:

1. تقرأ ملف تعريف الارتباط `ab-variant` من الطلب. إذا كان موجودًا، يحتفظ المستخدم بتخصيصه الحالي.
2. إذا لم يوجد ملف تعريف ارتباط، تخصص الدالة المستخدم للمتغيّر `a` أو `b` باحتمال متساوٍ.
3. تعيد كتابة URI بحيث يقدّم `/` إما `/a/index.html` أو `/b/index.html`.

### ضبط ملف تعريف الارتباط على الاستجابة

تضبط دالة طلب المشاهد أعلاه رأسًا مخصصًا (`x-ab-variant`) لكنها لا تضبط ملف تعريف الارتباط—فدوال طلب المشاهد لا تستطيع تعديل الاستجابة. تحتاج إلى دالة **استجابة المشاهد** مرافقة لضبط ملف تعريف الارتباط:

```javascript
function handler(event) {
  var response = event.response;
  var request = event.request;
  var variant = request.headers['x-ab-variant'] ? request.headers['x-ab-variant'].value : 'a';

  response.cookies['ab-variant'] = {
    value: variant,
    attributes: 'Path=/; Max-Age=2592000; SameSite=Lax',
  };

  return response;
}
```

*ملاحظة:* `Max-Age=2592000` يساوي 30 يومًا. يبقى المستخدم في المتغيّر نفسه لمدة شهر.

> **تحذير**
>
> تحتاج إلى **دالتَي** CloudFront لهذا النمط—واحدة على `viewer-request` لتوجيه الطلب، وواحدة على `viewer-response` لضبط ملف تعريف الارتباط. تستطيع دالة CloudFront الواحدة التعامل مع نوع حدث واحد فقط لكل سلوك، لكن يمكن أن يكون للسلوك الواحد دالة طلب مشاهد ودالة استجابة مشاهد مرتبطتان به معًا.

## إعداد بنية S3

لكي يعمل هذا، يحتاج دلو S3 الخاص بك إلى محتوى خاص بكل متغيّر. أبسط نهج: أنشئ بنيتين متوازيتين من المجلدات.

```
my-frontend-app-assets/
├── a/
│   └── index.html     ← Variant A homepage
├── b/
│   └── index.html     ← Variant B homepage
├── style.css           ← Shared assets (not A/B tested)
└── script.js           ← Shared assets
```

ارفع محتوى المتغيّرات إلى دلو S3:

```bash
aws s3 cp ./build/variant-a/index.html \
  s3://my-frontend-app-assets/a/index.html \
  --region us-east-1 \
  --output json

aws s3 cp ./build/variant-b/index.html \
  s3://my-frontend-app-assets/b/index.html \
  --region us-east-1 \
  --output json
```

لا تحتاج الأصول المشتركة (CSS وJS والصور) إلى التكرار. الصفحات المختلفة بين المتغيرات وحدها تحتاج إلى نسخ منفصلة.

## بديل Lambda@Edge

إذا كان اختبار A/B لديك يحتاج إلى التوجيه إلى **أصول مختلفة** (مثل دلوَي S3 مختلفين أو نقطتي نهاية API مختلفتين)، فأنت بحاجة إلى Lambda@Edge مع محفّز **طلب الأصل**. لا تستطيع دوال CloudFront تغيير الأصل.

```typescript
import type { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  const cookies = request.headers.cookie || [];

  let variant = 'a';
  for (const cookie of cookies) {
    const match = cookie.value.match(/ab-variant=([ab])/);
    if (match) {
      variant = match[1];
      break;
    }
  }

  // Route to different S3 paths based on variant
  if (variant === 'b') {
    request.origin = {
      s3: {
        domainName: 'my-frontend-app-assets.s3.amazonaws.com',
        path: '/variant-b',
        region: 'us-east-1',
        authMethod: 'none',
      },
    };
    request.headers.host = [
      {
        key: 'Host',
        value: 'my-frontend-app-assets.s3.amazonaws.com',
      },
    ];
  }

  return request;
};
```

تعدّل هذه الدالة **مسار الأصل** بدلًا من URI، ما يعني أنه يمكنك تنظيم متغيراتك بشكل مختلف في S3 أو حتى الإشارة إلى دلاء منفصلة تمامًا.

> **لماذا `authMethod: 'none'`**
>
> يتتبع حقل `authMethod` OAI فقط، لا OAC—وتوثّق AWS أنها [لا تدعم OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html) على الإطلاق. مع OAC، تحدث المصادقة في طبقة التوزيع وتكون غير مرئية لحدث Lambda@Edge، لذا فإن `'none'` صحيحة. استخدم `'origin-access-identity'` فقط مع نمط OAI القديم.

## تقسيمات مرجّحة

50/50 هو أبسط تقسيم، لكنك سترغب غالبًا في طرح التغييرات على نسبة أصغر من المستخدمين أولًا. عدّل التخصيص العشوائي:

```javascript
// 90/10 split: 90% variant A, 10% variant B
variant = Math.random() < 0.9 ? 'a' : 'b';
```

لأكثر من متغيّرين:

```javascript
var rand = Math.random();
if (rand < 0.33) {
  variant = 'a';
} else if (rand < 0.66) {
  variant = 'b';
} else {
  variant = 'c';
}
```

## اعتبارات التخزين المؤقت

هذا هو الجزء الذي يربك الناس. (لقد أربكني أنا بالتأكيد في المرة الأولى.) إذا خزّن CloudFront استجابة `/` مؤقتًا وقدّمها للجميع، ينكسر اختبار A/B لديك—ويحصل كل مستخدم على المتغيّر الذي خُزّن مؤقتًا أولًا.

تحتاج إلى إخبار CloudFront بأن **يخزّن مؤقتًا بشكل منفصل حسب المتغيّر**. هناك نهجان:

**النهج 1: التخزين المؤقت حسب ملف تعريف الارتباط.** هيّئ سلوك التخزين المؤقت لديك ليتضمن ملف تعريف الارتباط `ab-variant` في مفتاح التخزين المؤقت. تُخزَّن الطلبات التي تحمل `ab-variant=a` و`ab-variant=b` مؤقتًا بشكل منفصل. تضبط هذا في سياسة التخزين المؤقت المرتبطة بالسلوك (تذكّر [سلوكيات التخزين المؤقت والإبطال](https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations)).

**النهج 2: التخزين المؤقت حسب URI المعاد كتابته.** إذا أعادت دالة طلب المشاهد كتابة `/` إلى `/a/index.html` أو `/b/index.html`، يخزّنها CloudFront مؤقتًا بشكل طبيعي ككائنات منفصلة لأن URI مختلف. يتجنب هذا النهج تغييرات سياسة التخزين المؤقت.

نهج إعادة كتابة URI (النهج 2) أبسط، وهو ما يستخدمه مثال دالة CloudFront أعلاه. يعمل التخزين المؤقت ببساطة لأن `/a/index.html` و`/b/index.html` مفتاحان مختلفان للتخزين المؤقت.

> **نصيحة**
>
> إذا استخدمت نهج مفتاح التخزين المؤقت القائم على ملف تعريف الارتباط، فكن واعيًا بأنه يزيد معدل إخفاقات التخزين المؤقت لديك. كل تركيبة فريدة من ملفات تعريف الارتباط تنشئ كائنًا مخزّنًا مؤقتًا منفصلًا. بالنسبة لاختبار A/B بمتغيّرين، يضاعف هذا إخفاقات التخزين المؤقت لديك على الأكثر—وهو أمر مقبول. أما التجارب ذات المتغيرات الكثيرة، فنهج URI المعاد كتابته يتوسع بشكل أفضل.

## إنهاء التجربة

عندما يكون لديك فائز، أزل دوال الحافة وقدّم المتغيّر الفائز مباشرة. حدّث عملية النشر لنسخ محتوى المتغيّر الفائز إلى المسار الجذري، وأزل مجلدَي `/a/` و`/b/`، وافصل دوال CloudFront عن السلوك.

لا تنسَ معالجة المستخدمين الذين لا يزالون يحملون ملف تعريف الارتباط القديم—سينتهي من تلقاء نفسه (يتولى Max-Age ذلك)، لكن إذا أردت تنظيفه فورًا، فيمكن لدالة استجابة مشاهد مؤقتة مسحه:

```javascript
function handler(event) {
  var response = event.response;
  response.cookies['ab-variant'] = {
    value: '',
    attributes: 'Path=/; Max-Age=0',
  };
  return response;
}
```

ضبط `Max-Age=0` يخبر المتصفح بحذف ملف تعريف الارتباط.
