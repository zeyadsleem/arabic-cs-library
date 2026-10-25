---
title: "بناء بطاقة صورة مع طبقة تغطية"
lang: ar
source: "https://stevekinney.com/courses/tailwind/building-an-image-card-hover-overlay"
---

لنبدأ ببنية HTML الأساسية لبطاقة صورة بمحتوى طبقة تغطية.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/04bd2fe17ddfe307e9b89e1c58da0a6455853f79ff18a4f4f7ab0247e227407b.html)*

```html
<div
  class="max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="space-y-4 p-6">
    <h3 class="text-lg font-semibold text-slate-900">Product Name</h3>
    <p class="text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

لدينا بطاقة منتج مصقولة بتنسيق احترافي وتأثيرات تمرير خفيفة، مبنية على أنماط من [درس البطاقة](https://stevekinney.com/courses/tailwind/building-a-card). لكن ماذا لو أردنا أن تظهر معلومات المنتج كطبقة تغطية على الصورة بدلًا من ذلك؟ لنحوّلها إلى تأثير طبقة تغطية جذاب عند التمرير.

## تقديم نظام group

أولًا، لنقدّم أداة `group` في Tailwind، التي تتيح لنا تنسيق تأثيرات التمرير عبر عدة عناصر ابنة.

*تقديم نظام group — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a5961ba194a61c309dcc4d8a3e22ac2e5121a9ece3c77b96cab8fe4ec94602e9.html)*

```html
<div
  class="group max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="space-y-4 p-6">
    <h3 class="text-lg font-semibold text-slate-900">Product Name</h3>
    <p class="text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

يعلّم صنف `group` هذه الحاوية كـ«أب مجموعة». الآن يستطيع أي عنصر ابن استخدام أدوات `group-hover:*` لتنسيق نفسه بناءً على تمرير المؤشر على الأب. وهذا مثالي لتأثير طبقة التغطية حيث تحتاج عدة عناصر إلى الاستجابة لتمرير المؤشر على البطاقة كلها.

## وضع محتوى الطبقة

لننقل الآن محتوانا ليستقر كطبقة تغطية فوق الصورة. سنحتاج إلى إضافة تحديد موضع `relative` إلى الحاوية وتحديد موضع `absolute` إلى المحتوى.

*وضع محتوى الطبقة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ec70a2347ddf22433ad89acaca888c3fce094d01f12a42702e05914631ffdfa3.html)*

```html
<div
  class="group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="absolute inset-0 space-y-4 p-6">
    <h3 class="text-lg font-semibold text-white">Product Name</h3>
    <p class="text-white">Product description goes here.</p>
    <div class="text-xl font-bold text-white">$29.99</div>
  </div>
</div>
```

تغييرات موضع الطبقة:

- `relative`: أُضيف إلى الحاوية لإرساء سياق تحديد الموضع للطبقة
- `absolute inset-0`: يضع المحتوى ليغطي منطقة الصورة كلها (0px من كل الحواف)
- `text-white`: غيّر كل النص إلى الأبيض للتباين مع خلفية الصورة

الآن يستقر نصنا مباشرة فوق الصورة، لكنه ظاهر دائمًا ويصعب قراءته على ألوان الصورة المتفاوتة.

## إضافة الخلفية وظهور التمرير

لنضف خلفية شبه شفافة ونجعل الطبقة تظهر فقط عند تمرير المؤشر على البطاقة.

*إضافة الخلفية وظهور التمرير — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/77aa7e30cd27905b1761a6a5c101026eb169ed77342cda3c561327e8dfdd2ffd.html)*

```html
<div
  class="group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="absolute inset-0 bg-black/60 p-6 opacity-0 group-hover:opacity-100">
    <h3 class="text-lg font-semibold text-white">Product Name</h3>
    <p class="text-white">Product description goes here.</p>
    <div class="text-xl font-bold text-white">$29.99</div>
  </div>
</div>
```

تنسيق تأثير التمرير:

- `bg-black/60`: خلفية سوداء شبه شفافة (عتامة 60%) تنشئ تباينًا مقروءًا
- `opacity-0`: يخفي الطبقة افتراضيًا (شفافة تمامًا)
- `group-hover:opacity-100`: يُظهر الطبقة عند تمرير المؤشر على مجموعة الأب
- أُزيل `space-y-4` لأننا سنضع المحتوى يدويًا

هذا أول استخدام لنا لـ`group-hover:` — تظهر الطبقة تلقائيًا عند تمرير المؤشر في أي مكان على البطاقة! صيغة `/60` هي معدِّل العتامة في Tailwind، ويكافئ `rgba(0, 0, 0, 0.6)`.

## إضافة موضع المحتوى والحركة

لنحسّن تخطيط الطبقة بوضع المحتوى في الأسفل وإضافة حركة دخول سلسة.

*إضافة موضع المحتوى والحركة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/edbb4a2eeb1792b3dfc67734d6da1206dca3825ff61586e6214140b5033a133e.html)*

```html
<div
  class="group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div
    class="absolute inset-0 flex flex-col justify-end bg-black/60 p-6 opacity-0 group-hover:opacity-100"
  >
    <div class="translate-y-4 space-y-2 group-hover:translate-y-0">
      <h3 class="text-lg font-semibold text-white">Product Name</h3>
      <p class="text-white">Product description goes here.</p>
      <div class="text-xl font-bold text-white">$29.99</div>
    </div>
  </div>
</div>
```

تحسينات التخطيط والحركة:

- `flex flex-col justify-end`: يحاذي المحتوى إلى أسفل الطبقة باستخدام Flexbox
- `space-y-2`: يعيد التباعد الرأسي بين عناصر المحتوى
- `translate-y-4`: ينقل المحتوى 16px للأسفل افتراضيًا (حالة الإخفاء)
- `group-hover:translate-y-0`: يُزلق المحتوى إلى موضعه الطبيعي عند التمرير

ينشئ هذا حركة انزلاق لأعلى خفيفة يبدأ فيها المحتوى أسفل موضعه النهائي قليلًا ثم ينزلق لأعلى عند ظهور الطبقة.

## إضافة انتقالات سلسة

أخيرًا، لنضف انتقالات سلسة لتجعل تأثيرات التمرير تبدو مصقولة واحترافية.

*إضافة انتقالات سلسة — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d47c338841657780f15e80e76bd2e2e8dcc95b902e2dc1fc637a94c8d90dd9b3.html)*

```html
<div
  class="group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div
    class="absolute inset-0 flex flex-col justify-end bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
  >
    <div
      class="translate-y-4 space-y-2 transition-transform duration-300 group-hover:translate-y-0"
    >
      <h3 class="text-lg font-semibold text-white">Product Name</h3>
      <p class="text-white">Product description goes here.</p>
      <div class="text-xl font-bold text-white">$29.99</div>
    </div>
  </div>
</div>
```

تحسينات الانتقال:

- `transition-opacity duration-300` على الطبقة: يُتلاشى الخلفية دخولًا وخروجًا بسلاسة خلال 300ms
- `transition-transform duration-300` على المحتوى: يحرّك حركة الانزلاق لأعلى بسلاسة
- يستخدم الانتقالان المدة نفسها لتوقيت متماسك

تنشئ مدة 300ms إحساسًا سلسًا واحترافيًا — سريعة بما يكفي لتبدو متجاوبة، وبطيئة بما يكفي لتكون ملحوظة وأنيقة.

## لماذا ينجح نظام group

نظام `group` مثالي لتأثيرات التمرير المعقدة لأنه ينسّق استجابة عدة عناصر لتفاعل واحد. وخلافًا لنظام `peer` الذي يتعامل مع علاقات الأشقاء، يدير `group` علاقات الأب والابن حيث يؤثر تمرير المؤشر على الأب في عدة أبناء.

توفّر هذه المقاربة:

- **حركات منسّقة**: يمكن لعدة عناصر الاستجابة إلى حدث التمرير نفسه بتأثيرات مختلفة
- **استهداف مرن**: يمكن لأي عنصر سليل استخدام أدوات `group-hover:*` بصرف النظر عن عمق التعشيش
- **الأداء**: تأثيرات تمرير بـCSS وحدها دون عبء JavaScript
- **سلوك بديهي**: البطاقة كلها هدف التمرير، ما يسهّل على المستخدمين تفعيله

## أنماط group الشائعة

يعمل نظام group بامتياز مع:

- طبقات تغطية الصور (كما هو موضّح)
- قوائم تنقل منسدلة حيث يكشف تمرير المؤشر على الأب قوائم الأبناء
- تأثيرات تمرير البطاقات بعناصر متحركة متعددة
- مجموعات أزرار حيث يؤثر التمرير في الأيقونات والنص والخلفيات بشكل مختلف
- بطاقات منتجات بلوحات معلومات متوسّعة

## تحديات

جرّب بناء هذه التنويعات:

1. **طبقة تغطية محاذاة للأسفل**: ضع محتوى الطبقة في الأسفل بتلاشٍ متدرّج من الشفاف إلى الأسود باستخدام `bg-gradient-to-t from-black/80 to-transparent`
2. **طبقة أيقونة**: أنشئ أيقونة زر تشغيل تظهر في وسط الصورة عند التمرير، باستخدام `group-hover:` مع تأثيرات القياس والعتامة
