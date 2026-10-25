---
title: "كتابة دالة CloudFront"
---

تمنحك دوال CloudFront طريقة لتشغيل JavaScript خفيفة على مواقع الحافة في CloudFront — جميعها، أكثر من 200 موقع — عند كل طلب على حدة. وإن سبق أن كتبت ملف `_redirects` على Netlify أو ملف `next.config.js` فيه عمليات إعادة توجيه وإعادة كتابة، فأنت تفهم حالة الاستخدام بالفعل. الفرق أنك تكتب كودًا حقيقيًا بدلًا من إعدادات، ما يعني أنك تستطيع معالجة منطق ديناميكي لا تستطيعه ملفات الإعدادات الثابتة.

إذا أردت نسخة AWS من سلوك وقت التشغيل أثناء قراءتك، فإن [دليل دوال CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html) هو المرجع الرسمي.

لقد واجهت نسخة من هذه المشكلة سابقًا. فعندما أعددت [التحكم في الوصول إلى الأصل](https://stevekinney.com/courses/aws/origin-access-control-for-s3)، كفّت حاويتك على S3 عن كونها نقطة نهاية موقع وأصبحت مخزن كائنات خاصًا. ولم تعد S3 تحوّل `/about/` إلى `/about/index.html` — بل تبحث فقط عن كائن مفتاحه `about/` وتُرجع خطأ 403 عندما لا تجده. أما [استجابات الأخطاء المخصّصة](https://stevekinney.com/courses/aws/custom-error-pages-and-spa-routing) التي أعددتها فتعالج حالة تطبيق الصفحة الواحدة (كل مسار مفقود يقدّم `index.html`)، لكنها أداة فظّة. ودالة CloudFront تمنحك تحكمًا دقيقًا: أعد كتابة المسار قبل فحص ذاكرة التخزين المؤقت، حتى تطلب CloudFront الكائن الصحيح من S3 من الأساس.

في هذا الدرس ستكتب دالة CloudFront تفعل ذلك بالضبط، ثم تختبرها وتنشرها وتربطها بتوزيعك.

## وقت التشغيل ليس Node.js

هذا أهم شيء يجب استيعابه. فوقت تشغيل دوال CloudFront محرك JavaScript مبنيّ لغرض محدد، وهو **ليس** Node.js. لا وجود لـ `require()` ولا لـ `import` ولا لـ `Buffer` ولا لـ `process.env` ولا لـ `setTimeout` ولا لـ `fetch`. ما تحصل عليه هو ECMAScript 5.1 مع ميزات مختارة من ES6 حتى ES12 — أشياء مثل `let` و`const` والدوال السهمية وقوالب النصوص والتفكيك و`String.prototype.includes()` و`Array.prototype.find()`.

ما **لا** تحصل عليه:

- **لا وصول إلى الشبكة.** لا يمكنك إجراء طلبات HTTP. انتهى الأمر.
- **لا وصول إلى نظام الملفات.** لا وجود لوحدة `fs`.
- **لا تقييم ديناميكي للكود.** لا `eval()` ولا `new Function()`.
- **لا متغيرات بيئة.** لا يمكنك قراءة `process.env`.
- **لا وحدات.** يجب أن يكون كل شيء في ملف واحد أصغر من 10 كيلوبايت.

يبدو هذا مقيّدًا، لكن المقابل هو السرعة. فدوال CloudFront تُنفَّذ في أقل من ميلي ثانية وتستطيع التعامل مع عشرات الملايين من الطلبات في الثانية، والقيود هي ما يجعل ذلك ممكنًا.

> **نصيحة**
>
> إن كنت تحتاج أيًا من الميزات المذكورة أعلاه — طلبات الشبكة، أو حزم npm، أو متغيرات البيئة — فأنت بحاجة إلى Lambda@Edge بدلًا منها. راجع [Lambda@Edge مقابل دوال CloudFront](https://stevekinney.com/courses/aws/edge-compute-comparison) للمقارنة الكاملة.

## توقيع الدالة

لكل دالة CloudFront البنية نفسها:

```javascript
function handler(event) {
  var request = event.request;
  // Modify the request or generate a response
  return request;
}
```

هذا كل شيء. دالة واحدة اسمها `handler`، ووسيط واحد اسمه `event`، وتُرجع إما الطلب المُعدَّل (لتترك CloudFront يواصل المعالجة) أو كائن استجابة (لتقطع المسار وتستجيب فورًا).

### كائن الحدث

يكون لكائن `event` هذا الشكل عند مشغّل **طلب المشاهد**:

```javascript
{
  version: '1.0',
  context: {
    distributionDomainName: 'd111111abcdef8.cloudfront.net',
    distributionId: 'E1A2B3C4D5E6F7',
    eventType: 'viewer-request',
    requestId: 'abcdef123456'
  },
  viewer: {
    ip: '203.0.113.1'
  },
  request: {
    method: 'GET',
    uri: '/about',
    querystring: {},
    headers: {
      host: { value: 'example.com' },
      accept: { value: 'text/html' }
    },
    cookies: {}
  }
}
```

ثمة أمور قليلة تستحق الانتباه:

- **`request.uri`** هو المسار لا عنوان URL الكامل، ويبدأ بـ `/`.
- **الترويسات** كائنات لها خاصية `value`، وليست نصوصًا عادية. فلقراءة ترويسة `Host` تصل إلى `event.request.headers.host.value`.
- **سلاسل الاستعلام** كائنات أيضًا. فالطلب إلى `/search?q=hello` يعطيك `{ q: { value: 'hello' } }`.
- **ملفات تعريف الارتباط** تتبع النمط نفسه: `{ session: { value: 'abc123' } }`.

### إرجاع طلب مقابل استجابة

إن أرجعت كائن `request` (معدّلًا ربما)، واصلت CloudFront معالجة الطلب — بفحص ذاكرة التخزين المؤقت والتمرير إلى الأصل عند الحاجة، وهكذا.

وإن أرجعت كائن **استجابة**، أرسلت CloudFront تلك الاستجابة مباشرة إلى المشاهد دون أن تلمس ذاكرة التخزين المؤقت أو الأصل أبدًا:

```javascript
function handler(event) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: 'https://example.com/new-path' },
    },
  };
}
```

## كتابة دالة لإعادة كتابة المسار

> **نصيحة**
>
> كل دوال CloudFront في هذا الدرس متاحة كملفات مستقلة في [مستودع Scratch Lab](https://github.com/stevekinney/scratch-lab/tree/main/cloudfront/functions).

إليك أكثر دوال CloudFront شيوعًا فيما ستنشره: إعادة كتابة مسار تُلحق `index.html` بمسارات نمط المجلدات. فحاويتك S3 خلف OAC الآن — أي مخزن كائنات خاص لا موقع. وعندما يطلب أحد `/about/`، تبحث S3 عن كائن مفتاحه الحرفي `about/` فلا تجده وتُرجع 403. هذه الدالة تعيد كتابة المسار قبل أن تفحص CloudFront ذاكرتها المؤقتة أصلًا، فتتلقى S3 طلبًا لـ `about/index.html` بدلًا من ذلك.

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
```

*ملاحظة:* الطلبات مثل `/about` تصبح `/about/index.html`. أما الطلبات إلى `/style.css` فتمرّ كما هي دون تغيير.

بدون هذه الدالة، فإن الانتقال مباشرة إلى `/about` على توزيعك يُرجع 403 — فلا وجود لكائن S3 مفتاحه `about`. وكانت استجابات الأخطاء المخصّصة لديك ستلتقط 403 وتقدّم `index.html`، وهذا ينفع لتطبيقات الصفحة الواحدة لكنه يكسر المواقع الثابتة متعددة الصفحات. أما دالة إعادة الكتابة فتحلّ المشكلة في الطبقة الصحيحة: قبل أن يصل الطلب إلى S3 أصلًا.

### نسخة SPA: إعادة الكتابة إلى الجذر

الدالة أعلاه تناسب المواقع الثابتة متعددة الصفحات حيث لكل مجلد ملف `index.html` خاص به. لكن Scratch Lab — التطبيق الذي [نشرته للتو](https://stevekinney.com/courses/aws/deploying-scratch-lab) — تطبيق صفحة واحدة، فلا يوجد إلا `index.html` واحد في الجذر. والمسارات مثل `/notes/abc123` لا تقابل مجلدات في S3 على الإطلاق — فموجّه JavaScript يقرأ `window.location.pathname` ويقرّر ما يعرضه.

أما لتطبيق SPA فإعادة الكتابة مختلفة: كل ما ليس ملفًا ثابتًا يُعاد كتابته إلى `index.html` في الجذر:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Static assets (JS, CSS, images, fonts) pass through unchanged
  if (uri.includes('.')) {
    return request;
  }

  // Everything else serves the SPA shell
  request.uri = '/index.html';
  return request;
}
```

هذه عملية مختلفة جذريًا عن إعادة كتابة الصفحات المتعددة. فنسخة الصفحات المتعددة تحوّل `/about` إلى `/about/index.html` — أي تفترض بنية مجلدات فيها ملف HTML عند كل مسار. أما نسخة SPA فتحوّل `/notes/abc123` إلى `/index.html` — أي تفترض نقطة دخول واحدة تتولى كل التوجيه في JavaScript.

توزيعك لديه بالفعل استجابات أخطاء مخصّصة تؤدي المهمة نفسها: تُرجع S3 خطأ 403 للمسار المفقود، فتعترضه CloudFront وتقدّم `/index.html`. ودالة CloudFront أنظف لأنها تعيد كتابة المسار *قبل* أن تراه S3 أصلًا — بلا رحلة ذهاب وعودة مهدرة، وبلا اعتماد على اعتراض الأخطاء من أجل التوجيه العادي. وكما سترى في [رموز حالة SPA مع Lambda@Edge](https://stevekinney.com/courses/aws/spa-status-codes-with-lambda-edge)، فإنها تفتح الباب أيضًا لإرجاع رموز حالة صحيحة للمسارات المجهولة.

> **نصيحة**
>
> أي نسخة تستخدم؟ إن كان ناتج بناءك يحتوي ملفات HTML في مجلدات فرعية (`about/index.html` و`blog/post/index.html`)، فاستخدم إعادة كتابة الصفحات المتعددة. وإن كان ناتج بناءك ملف `index.html` واحدًا مع موجّه JavaScript، فاستخدم نسخة SPA. ومعظم تطبيقات React وVue وSvelte تتبع نمط SPA، بينما تتبع مولّدات المواقع الثابتة مثل Astro وHugo نمط الصفحات المتعددة.

## إنشاء الدالة واختبارها

تمشي الخطوات أدناه عبر سير العمل إنشاء ← اختبار ← نشر ← ربط، باستخدام إعادة كتابة الصفحات المتعددة كمثال. وإن كنت تنشر Scratch Lab (أو أي تطبيق SPA)، فاستبدل كود الدالة بنسخة SPA أعلاه — فسير العمل نفسه.

### إنشاء دالة في لوحة التحكم

انتقل إلى **CloudFront → Functions** في الشريط الجانبي الأيسر. وسترى صفحة قائمة Functions.

![صفحة قائمة دوال CloudFront وهي لا تعرض أي دوال، مع زر Create function.](/images/kinney/de4cb39b32bb85c9.webp)

انقر **Create function**. يسألك نموذج الإنشاء عن ثلاثة أشياء: **الاسم**، و**الوصف** الاختياري، وإصدار **وقت التشغيل**. استخدم `cloudfront-js-2.0` (الافتراضي) — فهو يدعم ميزات JavaScript الحديثة بما في ذلك `async`/`await` وواجهات WebCrypto.

![نموذج إنشاء دالة CloudFront مع حقول الاسم والوصف واختيار وقت التشغيل بين cloudfront-js-1.0 وcloudfront-js-2.0.](/images/kinney/7ff17d07212a3182.webp)

بعد النقر على **Create function** تصل إلى صفحة تفاصيل الدالة. وهذه الصفحة فيها ثلاثة تبويبات: **Build** و**Test** و**Publish**. ويعرض تبويب Build محرّر الكود حيث تكتب كود دالتك أو تلصقه.

![صفحة تفاصيل دالة CloudFront وهي تعرض دالة url-rewrite مع تبويبات Build وTest وPublish ومحرّر كود الدالة أسفله.](/images/kinney/c9c6fe56c07c72d4.webp)

ألصق كود دالتك في المحرّر وانقر **Save changes**. يبدأ المحرّر بهيكل دالة أولي — استبدله كليًا بدالة إعادة الكتابة.

يتيح لك تبويب **Test** بناء حدث اختبار وتشغيله على مرحلة `DEVELOPMENT` من دالتك. ابنِ حدث طلب مشاهد تكون فيه `uri` مساوية `/about`، ثم انقر **Test function**. ويجب أن ترى الناتج وقد تغيّرت فيه `request.uri` إلى `/about/index.html`.

أما تبويب **Publish** فيدفع دالتك من مرحلة `DEVELOPMENT` إلى `LIVE`. وإلى أن تنشر، لا تعمل الدالة إلا في وضع الاختبار. انقر **Publish function** لتجعلها متاحة للربط بتوزيع.

### إنشاء دالة باستخدام CLI

يمكنك أيضًا إنشاء الدالة كليًا من سطر الأوامر. احفظ كود الدالة في `url-rewrite.js`:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }
  return request;
}
```

ثم أنشئ الدالة باستخدام `fileb://` لتمرير محتويات الملف:

```bash
aws cloudfront create-function \
  --name url-rewrite \
  --function-config '{"Comment":"Rewrite directory URLs to index.html","Runtime":"cloudfront-js-2.0"}' \
  --function-code fileb://url-rewrite.js \
  --region us-east-1 \
  --output json
```

وقت التشغيل `cloudfront-js-2.0` هو الخيار الموصى به للدوال الجديدة، فهو يدعم مجموعة أوسع من JavaScript الحديثة مقارنةً بـ `1.0` — بما في ذلك صياغة `async`/`await` ومجموعة صغيرة من [واجهات WebCrypto](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-20.html) القائمة على Promise والتي يمكنك فعلًا أن تنتظرها بـ `await`. وعمليًا، تكاد كل حالات استخدام دوال CloudFront تكون متزامنة: إعادة كتابة المسارات، والتلاعب بالترويسات، والتوجيه A/B. فاكتب دوالًا متزامنة إلا إذا كنت تحتاج تحديدًا إلى WebCrypto لشيء مثل التحقق من ملفات تعريف ارتباط موقّعة. تصف وثائق AWS وقت التشغيل بأنه ECMAScript 5.1 مع ميزات مختارة من ES6 حتى ES12، فتحقق من [صفحة ميزات وقت التشغيل](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-20.html) قبل الاعتماد على أي صياغة محددة من ES2020 وما بعده.

تتضمن الاستجابة قيمة `ETag` — احفظها، فأنت تحتاجها في كل عملية لاحقة على هذه الدالة.

> **تحذير**
>
> لا تتحكم راية `--region` في مكان تشغيل الدالة، فدوال CloudFront عالمية. وراية المنطقة تخبر CLI بنقطة نهاية API التي يجب استخدامها، وAPI الخاصة بـ CloudFront تقع في `us-east-1`.

### اختبار الدالة

قبل النشر، اختبر الدالة على حدث تجريبي:

```bash
aws cloudfront test-function \
  --name url-rewrite \
  --if-match ETVPDKIKX0DER \
  --event-object '{"version":"1.0","context":{"eventType":"viewer-request"},"viewer":{"ip":"0.0.0.0"},"request":{"method":"GET","uri":"/about","querystring":{},"headers":{},"cookies":{}}}' \
  --stage DEVELOPMENT \
  --region us-east-1 \
  --output json
```

استبدل `ETVPDKIKX0DER` بقيمة `ETag` من خطوة الإنشاء. و`--event-object` تمثيل JSON لحدث طلب مشاهد.

تخبرك الاستجابة هل نجحت الدالة، وتعرض الناتج. ويجب أن ترى `request.uri` وقد تغيّرت إلى `/about/index.html`.

### نشر الدالة

يجري الاختبار على مرحلة `DEVELOPMENT`. ولجعل الدالة متاحة للربط بتوزيع، انشرها إلى `LIVE`:

```bash
aws cloudfront publish-function \
  --name url-rewrite \
  --if-match ETVPDKIKX0DER \
  --region us-east-1 \
  --output json
```

تُرجع هذه العملية `ETag` جديدًا — هو ETag النسخة الحيّة. احفظ هذا أيضًا.

## الربط بسلوك CloudFront

الدالة غير المرتبطة بـ**سلوك** لا تفعل شيئًا. فأنت تحتاج إلى تحديث توزيع CloudFront لتربط هذه الدالة بسلوك تخزين مؤقت — عادةً السلوك الافتراضي (`*`).

لقد أعددت السلوكات في [سلوكات التخزين المؤقت وعمليات الإبطال](https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations). والآن أنت تضيف ربط دالة إلى أحد تلك السلوكات.

```bash
aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json > dist-config.json
```

عدّل `dist-config.json` وأضف كتلة `FunctionAssociations` داخل `DefaultCacheBehavior`:

```json
{
  "FunctionAssociations": {
    "Quantity": 1,
    "Items": [
      {
        "FunctionARN": "arn:aws:cloudfront::123456789012:function/url-rewrite",
        "EventType": "viewer-request"
      }
    ]
  }
}
```

ثم حدّث التوزيع:

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match ETAG_FROM_GET \
  --distribution-config file://dist-config.json \
  --region us-east-1 \
  --output json
```

> **نصيحة**
>
> لمعرفة ARN الخاص بالدالة، شغّل `aws cloudfront list-functions --region us-east-1 --output json`. وكل دالة في الاستجابة تتضمن `FunctionARN` الخاص بها.

## تحديث دالة موجودة

لتغيير كود الدالة، استخدم `update-function`:

```bash
aws cloudfront update-function \
  --name url-rewrite \
  --if-match CURRENT_ETAG \
  --function-config '{"Comment":"Updated URL rewrite","Runtime":"cloudfront-js-2.0"}' \
  --function-code 'function handler(event) { /* updated code */ return event.request; }' \
  --region us-east-1 \
  --output json
```

بعد التحديث، يجب أن **تنشر** مرة أخرى لدفع التغييرات إلى `LIVE`. فالتحديث لا يغيّر إلا مرحلة `DEVELOPMENT`. ويتيح لك هذا النموذج ذو المرحلتين اختبار التغييرات قبل أن تؤثر في حركة الإنتاج.

## أنماط شائعة

### إعادة توجيه www إلى النطاق الجذري

إن أعددت نطاقًا مخصّصًا في قسم [DNS والشهادات](https://stevekinney.com/courses/aws/dns-for-frontend-engineers)، فقد يكون لديك `www.example.com` و`example.com` كلاهما يشير إلى توزيعك. وهذه الدالة توحّد الحركة على النطاق الجذري:

```javascript
function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;

  if (host.startsWith('www.')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + host.substring(4) + request.uri },
      },
    };
  }

  return request;
}
```

بدون ذلك، تعامل محركات البحث `www.example.com/about` و`example.com/about` كصفحتين مختلفتين. ويصلح رمز 301 على الحافة ذلك قبل أن يرى أي أحد — زاحفًا كان أو إنسانًا — النسخة المكررة.

### إضافة شرطة مائلة في النهاية

إن كان مولّد موقعك الثابت ينشئ مجلدات مثل `about/index.html`، فأنت تريد أن يعيد `/about` التوجيه إلى `/about/` كي تُحلّ مسارات الأصول النسبية بشكل صحيح:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (!uri.endsWith('/') && !uri.includes('.')) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: uri + '/' },
      },
    };
  }

  return request;
}
```

يمكنك دمج هذا مع إعادة كتابة `index.html` من قبل — إعادة توجيه `/about` إلى `/about/` ثم إعادة كتابة `/about/` إلى `/about/index.html` — لكن وضع الاثنين في دالة واحدة أبسط ويتجنّب الرحلة الإضافية ذهابًا وعودة.

هذه الأنماط قطع بناء. وفي [حالات استخدام دوال الحافة](https://stevekinney.com/courses/aws/edge-function-use-cases) سترى أمثلة أكثر تشمل ترويسات الأمان والتوجيه الجغرافي والكشف عن اللغة.

## مزالق

- **حدّ حجم الكود 10 كيلوبايت.** يجب أن تتّسع دالتك كاملة، بما فيها التعليقات، في 10 كيلوبايت. فقلّل الحجم بقوة إن كنت تقترب من الحد. وإن كان الضغط ناتجًا عن بيانات بحث مضمنة (خرائط إعادة توجيه، وجداول أعلام ميزات، وما شابه)، فانقل تلك البيانات إلى **CloudFront KeyValueStore** (KVS) — إذ تقرأها الدالة في وقت التشغيل عبر `cf.kvs()`، فيبقى الكود صغيرًا وتتوسّع البيانات باستقلال.
- **لا واجهات برمجية غير متزامنة.** يحلّل وقت التشغيل `cloudfront-js-2.0` صياغة `async`/`await` دون خطأ، لكن لا توجد واجهات برمجية غير متزامنة لاستدعائها. فكل شيء يُنفَّذ بشكل متزامن. لا تلجأ إلى `async` متوقعًا أن تؤدي عملًا مفيدًا.
- **أسماء الترويسات يجب أن تكون بأحرف صغيرة.** عند ضبط الترويسات أو قراءتها، استخدم أسماء بأحرف صغيرة: `content-type` لا `Content-Type`.
- **رقصة `ETag`.** كل عملية إنشاء أو تحديث أو نشر تُرجع ETag جديدًا، والعملية التالية تتطلب ETag الحالي. لقد فقدت أثر هذه القيم أكثر مرات مما أحبّ الاعتراف به — فإن حدث ذلك معك، فأعد جلبها باستخدام `describe-function`.
