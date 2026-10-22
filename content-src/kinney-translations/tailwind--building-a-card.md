---
title: "بناء مكوّن بطاقة"
---

لنبدأ ببنية HTML الأساسية لدينا.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/4237ee4e875d7a422bbf9ecbc5d4554ef04a4628db957194e930625b9ca8f3d0.html)*

```html
<div>
  <img src="https://picsum.photos/seed/picsum/600/400" alt="Product" />
  <div>
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

من الواضح أنه ليس شيئًا يستحق النظر، لكن لنبدأ بإضافة المزيد إليه.

## تطبيق ما تعلمناه

رأينا هذا سابقًا عندما كنا [نبني زرًا](https://stevekinney.com/courses/tailwind/building-a-button)، لكن لا ضرر من المزيد من التمرين. لنضف الأصناف التالية إلى الحاوية: `bg-white` و`rounded-lg` و`shadow-md`.

*تطبيق ما تعلمناه — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/71f625ed22f27861d5734eb6fd3882a11737316b8fc9b7c69bf43f8e84e3c256.html)*

```html
<div class="rounded-lg bg-white shadow-md">
  <img src="https://picsum.photos/seed/picsum/600/400" alt="Product" />
  <div>
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

لا يزال لا يبدو بهذه الجودة، لكننا نتقدم — على ما أظن. نستخدم `shadow-md` بدلًا من `shadow-xs` (كما استخدمنا للزر) لأن البطاقات تحتاج إلى بروز أكبر بصفتها حاويات محتوى أكبر. يساعد الظل في تأسيس التسلسل البصري — ينبغي أن تبدو البطاقات أكثر ثقلًا من الأزرار.

## إعطاؤه بعض المساحة

رأينا هذا مع الزر أيضًا، لكننا نضيف الحشو بسهولة فائقة باستخدام الصنف `p-6`.

*إعطاؤه بعض المساحة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7fa20b8b66e72e3bce57153b487fb654bf071aae2fef795200a587afdf4eb7d4.html)*

```html
<div class="rounded-lg bg-white shadow-md">
  <img src="https://picsum.photos/seed/picsum/600/400" alt="Product" />
  <div class="p-6">
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

يضيف الصنف المساعد `p-6` حشوًا بسماكة 24px من جميع الجهات.

## جعل الصورة تتصرف بشكل صحيح

*جعل الصورة تتصرف بشكل صحيح — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c1460915b080f5711eac1a0aaff9d067e8b8df6061fd5f903d7dab3ba1163d62.html)*

```html
<div class="overflow-hidden rounded-lg bg-white shadow-md">
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="p-6">
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

التغييرات على الصورة:

- `w-full`: يجعل الصورة تملأ عرض البطاقة.
- `h-48`: يضبط ارتفاعًا ثابتًا قدره 192px لتناسب أبعاد البطاقة بشكل متسق.
- `object-cover`: يقص الصورة لملء المساحة مع الحفاظ على نسبة الأبعاد.

تغييرات الحاوية:

`overflow-hidden`: يضمن أن تحترم الصورةُ الزوايا المستديرة للبطاقة.

## الخطوط

*الخطوط — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9deb228b2331811db396274728cc725b62d750b1aae54f9ef3377fe7ed492bc6.html)*

```html
<div class="overflow-hidden rounded-lg bg-white shadow-md">
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="p-6">
    <h3 class="text-lg leading-tight font-semibold text-slate-900">Product Name</h3>
    <p class="text-sm leading-relaxed text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

أجريت التعديلات التالية على الخطوط:

### أنماط العنوان

- `text-lg`: حجم خط 18px للبروز دون إثقال
- `font-semibold`: وزن 600 لتسلسل هرمي واضح
- `text-slate-900`: شبه أسود لأقصى قدر من القراءة

### أنماط الوصف

- `text-slate-600`: رمادي متوسط للمعلومات الثانوية
- حجم النص الافتراضي (`text-base`) يوفر قراءة جيدة

### أنماط السعر

- `text-xl`: حجم 20px يجعل السعر بارزًا — فهو غالبًا عامل القرار الأساسي
- `font-bold`: وزن 700 يؤكد على السعر أكثر من اسم المنتج
- `text-slate-900`: تباين عالٍ للوضوح

## التباعد

يمكننا إضافة بعض التباعد بين النصوص باستخدام `space-y-4` على الحاوية المحيطة بالنص.

*التباعد — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/51bdb56d0a9c5316a8d4eaff8720a9b8128c259dd460cb4c6aa1679371b01838.html)*

```html
<div class="overflow-hidden rounded-lg bg-white shadow-md">
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="space-y-4 p-6">
    <h3 class="text-lg leading-tight font-semibold text-slate-900">Product Name</h3>
    <p class="text-sm leading-relaxed text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

يضيف `space-y-4` خاصية `margin-top: 1rem (16px)` إلى جميع العناصر التابعة *عدا* الأولى منها. إنه طريقة نظيفة لإنشاء تباعد رأسي متسق دون إضافة هوامش يدويًا إلى كل عنصر. هذا يسهّل أيضًا ضبط التباعد بين جميع العناصر بدلًا من محاولة التبجّح بالهوامش وما شابه.

## إضافة تفاعلات التحويم

*إضافة تفاعلات التحويم — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ad166de7bd7f38bfcf20be15f4312ae5c44eca17334afbd5ecb71667df96272f.html)*

```html
<div
  class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="space-y-4 p-6">
    <h3 class="text-lg leading-tight font-semibold text-slate-900">Product Name</h3>
    <p class="text-sm leading-relaxed text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

أضفنا الأصناف التالية إلى الحاوية:

- `hover:shadow-lg`: يزيد الظل عند التحويم، ما يجعل البطاقة تبدو مرتفعة
- `transition-shadow`: يحرّك تغييرات الظل بسلاسة
- `duration-200`: يضبط انتقالًا سريعًا (200ms) لإحساس سريع الاستجابة

## تقييد العرض

لا يزال عريضًا قليلًا أكثر من ذوقي. لنضبط حدًّا أقصى لعرض البطاقة باستخدام `max-w-sm` على الحاوية.

*تقييد العرض — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/599b22793a1c743b5b51904bdcc66b398daefc279053fdfddeeb68fd47867df6.html)*

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
