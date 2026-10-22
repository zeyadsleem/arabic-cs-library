---
title: "بناء حقل نموذج"
---

لنبدأ ببنية HTML الأساسية لدينا.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ac25455cfbe3bfe687727ae48f19ae9088037eed1da233eefef4f85e3c0b8230.html)*

```html
<div>
  <label for="username">Username</label>
  <input type="text" name="username" id="username" placeholder="Your Name Here" />
</div>
```

إنه حقل نموذج أساسي، لكنه يبدو بسيطًا جدًا. لنحوّله إلى شيء يليق بتطبيق ويب حديث.

## إضافة البنية والتخطيط

أولًا، لنؤسس تسلسلًا بصريًا سليمًا عبر تنسيق التسمية وإضافة بعض التباعد الأساسي.

*إضافة البنية والتخطيط — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d0177f83fc99bbf9ac128a1927951591a1a42f2ea483ad4e1a1d692b9f4861b3.html)*

```html
<div>
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input type="text" name="username" id="username" placeholder="Your Name Here" />
</div>
```

- `block`: يجعل التسمية تشغل العرض الكامل وتجلس فوق الحقل
- `font-medium`: يضيف وزن خط متوسطًا (500) لتسلسل هرمي أفضل
- `text-slate-900`: لون شبه أسود لقراءة ممتازة

## إنشاء فصل بصري

الآن لنضف بعض المساحة المتنفسة بين التسمية وحقل الإدخال.

*إنشاء فصل بصري — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c06f4f73ffe2a453bbb9c5730a8ad85b7aa1b214cb3823fd404dc15288cdbf97.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input type="text" name="username" id="username" placeholder="Your Name Here" />
</div>
```

يمكنك إضافة هامش إلى أحد العنصرين أو كليهما، لكن يمكنك أيضًا استخدام [أدوات التباعد](https://stevekinney.com/courses/tailwind/spacing-and-dividing-utilities).

## تنسيق حقل الإدخال

حان وقت جعل حقل الإدخال يبدو احترافيًا بأبعاد وألوان وحدود مناسبة.

*تنسيق حقل الإدخال — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/6338221d34a938aa47381d4b1741dd0beaf4f249d4b509c7f6b5863822968171.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-slate-900"
    placeholder="Your Name Here"
  />
</div>
```

- `block`: يجعل حقل الإدخال عنصر كتلة لتحكم كامل
- `w-full`: يشغل الحقل العرض الكامل لحاويته
- `rounded-md`: يضيف استدارة حدود 6px لمظهر حديث وودود
- `bg-white`: خلفية بيضاء صريحة (مهمة للاتساق)
- `px-3`: حشو أفقي 12px لتباعد نصي مريح
- `py-1.5`: حشو رأسي 6px لأهداف لمس مناسبة
- `text-slate-900`: لون نص غامق لتباين عالٍ

## إضافة الحدود والمحيطات

الآن لنضف حدًا مناسبًا وحالات تركيز باستخدام أدوات المحيط في Tailwind.

*إضافة الحدود والمحيطات — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/18f0c15d6c1405e3ed91db6cbba08671655bf08619f29f8a47de732481f88ded.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-slate-900 outline-1 -outline-offset-1 outline-slate-400"
    placeholder="Your Name Here"
  />
</div>
```

- `outline-1`: عرض محيط 1px (أكثر موثوقية من الحدود لحقول النماذج)
- `-outline-offset-1`: الإزاحة السالبة تضع المحيط داخل العنصر
- `outline-slate-400`: لون فاتح نسبيًا لحد خفيف غير مشتت

استخدام `outline` بدلًا من `border` يمنع انزياح التخطيط ويوفر اتساقًا أفضل بين المتصفحات.

## إضافة حالات التركيز

لنضف حالة تركيز تفاعلية توفّر تغذية بصرية واضحة.

*إضافة حالات التركيز — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/6981638b50b9113b3df2454a2cf5429000298a4b1a4d99d7294948937c9bdb20.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
    placeholder="Your Name Here"
  />
</div>
```

- `focus:outline-2`: محيط أثخن بسماكة 2px عند التركيز
- `focus:-outline-offset-2`: الإزاحة السالبة تنشئ تأثير حلقة داخلية
- `focus:outline-indigo-600`: لون العلامة (النيلي) لحالة التركيز

تستخدم حالة التركيز محيطًا أثخن مع أسلوب الإزاحة السالبة نفسه، ما ينشئ مؤشرًا بصريًا واضحًا دون تغيير أبعاد حقل الإدخال.

سنتحدث أكثر عن [حالات التركيز](https://stevekinney.com/courses/tailwind/focus-states) بعد قليل.

## تحسينات الخطوط

لنحسّن الخطوط لكل من التسمية ونص حقل الإدخال، بما يشمل تنسيق النص النائب.

*تحسينات الخطوط — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/dc7c2981968074add4ce824a79d5cacac6cb68c7ce23002c69ac9185246cb05e.html)*

```html
<div class="space-y-2">
  <label for="username" class="block text-sm font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
    placeholder="Your Name Here"
  />
</div>
```

- `text-sm` على التسمية: حجم خط 14px، مناسب لتسميات النماذج
- `text-base` على الحقل: حجم خط 16px يمنع التكبير التلقائي على الأجهزة المحمولة
- `placeholder:text-slate-400`: لون رمادي أفتح للنص النائب، ما ينشئ تسلسلًا هرميًا واضحًا
