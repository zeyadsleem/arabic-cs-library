---
title: "محاذاة العناصر المفردة"
---

بينما تتحكّم `align-items` في محاذاة جميع العناصر الفرعية المباشرة في حاوية flex، تتيح `align-self` ضبطًا دقيقًا لمحاذاة عنصر مفرد. يوفّر Tailwind أدوات `self-*` لهذا الغرض.

تتجاوز خاصية `align-self` قيمة `align-items` في الحاوية بالنسبة إلى عنصر flex محدّد. فمثلًا، إذا كانت الحاوية تستخدم `align-items: center`، فإن `align-self: flex-start` على عنصر فرعي يحاذيه إلى بداية المحور العرضي، بينما تبقى بقية العناصر موسّطة.

تدير أدوات `self-*` في Tailwind خاصية `align-self`.

## التحكّم في محاذاة عنصر مفرد عبر `align-self`

تضبط خاصية `align-self` محاذاة عنصر flex أو grid داخل سطر flex أو منطقة grid الخاصة به، متجاوزةً `align-items` في الحاوية.

يوفّر Tailwind أدوات `align-self` التالية:

- `self-auto`: تعيد الضبط إلى قيمة `align-items` في الحاوية، أو تعتمد `stretch` الافتراضية إذا كانت `align-items: normal`.
- `self-start`: تحاذي العنصر إلى بداية المحور العرضي للحاوية.
- `self-end`: تحاذي العنصر إلى نهاية المحور العرضي للحاوية.
- `self-center`: تحاذي العنصر على طول مركز المحور العرضي للحاوية.
- `self-stretch`: تمدّ العنصر ليملأ المحور العرضي للحاوية، متجاهلةً أبعاده ما لم تكن مقيّدة.
- `self-baseline`: تحاذي خط أساس العنصر مع بقية العناصر في سطر flex أو صف grid نفسه.
- `self-baseline-last`: تحاذي خط أساس العنصر مع خط الأساس الأخير في الحاوية.
- `self-end-safe`: تحاذي العنصر إلى النهاية، وإلى البداية إذا جرى تجاوز الحد.
- `self-center-safe`: تحاذي العنصر إلى الوسط، وإلى البداية إذا جرى تجاوز الحد.

### أمثلة

افترض أن الحاوية تملك `display: flex` أو `display: inline-flex`.

#### إعادة الضبط إلى محاذاة الحاوية

افتراضيًا تكون `align-self` مساوية لـ `auto`، فتورث `align-items` من الحاوية. وتجعل `self-auto` هذا السلوك صريحًا.

*إعادة الضبط إلى محاذاة الحاوية — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b45674f244ae48e63aeddbee44f073bb0895056b7f8a7f5688e5b1cd1dcaf998.html)*

```html
<div class="flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6">
  <div class="self-auto rounded-lg bg-blue-500 p-4 text-white">Item 1 (inherits center)</div>
  <div class="rounded-lg bg-green-500 p-4 text-white">Item 2 (inherits center)</div>
  <div class="rounded-lg bg-purple-500 p-4 text-white">Item 3 (inherits center)</div>
</div>
```

#### المحاذاة إلى البداية

محاذي `self-start` يحاذي العنصر إلى بداية المحور العرضي، بغضّ النظر عن `align-items`.

*المحاذاة إلى البداية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/abebf41349c9ecf0b326f4c81e1ca25832ef9f91a2ddd9f8d9f8bf006cce764b.html)*

```html
<div class="flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6">
  <div class="self-start rounded-lg bg-blue-500 p-4 text-white">Item 1 (aligns to start)</div>
  <div class="rounded-lg bg-green-500 p-4 text-white">Item 2 (aligns to center)</div>
  <div class="rounded-lg bg-purple-500 p-4 text-white">Item 3 (aligns to center)</div>
</div>
```

#### المحاذاة إلى النهاية

محاذي `self-end` يحاذي العنصر إلى نهاية المحور العرضي.

*المحاذاة إلى النهاية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ead473ac4ed2df6f12fbfb2cbd21e6bd0e30787de63a3ec9ea4587c41d432a57.html)*

```html
<div class="flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-blue-500 p-4 text-white">Item 1 (aligns to center)</div>
  <div class="rounded-lg bg-green-500 p-4 text-white">Item 2 (aligns to center)</div>
  <div class="self-end rounded-lg bg-purple-500 p-4 text-white">Item 3 (aligns to end)</div>
</div>
```

#### توسيط عنصر واحد

يوسّط `self-center` عنصرًا محدّدًا عندما يكون لبقية العناصر محاذاة مختلفة.

*توسيط عنصر واحد — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/36a95356ba16d53a53ac4a59048da96707c3f44cd65bfc7c24f21854a917100e.html)*

```html
<div class="flex min-h-[200px] items-start gap-4 rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-blue-500 p-4 text-white">Item 1 (aligns to start)</div>
  <div class="self-center rounded-lg bg-green-500 p-4 text-white">Item 2 (aligns to center)</div>
  <div class="rounded-lg bg-purple-500 p-4 text-white">Item 3 (aligns to start)</div>
</div>
```

يُعدّ `self-center-safe` بديلًا أكثر أمانًا لأنه يتجنّب تجاوز الحد.

#### تمديد عنصر واحد

يملأ `self-stretch` العنصر المحور العرضي، متجاوزًا حجمه أو `align-items`.

*تمديد عنصر واحد — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/134b447397330b136062c69df905f8f6947f9c2623b0adadd06eecc2b67a82b4.html)*

```html
<div class="flex min-h-[200px] items-start gap-4 rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-blue-500 p-4 text-white">Item 1 (aligns to start)</div>
  <div class="self-stretch rounded-lg bg-green-500 p-4 text-white">Item 2 (stretches)</div>
  <div class="rounded-lg bg-purple-500 p-4 text-white">Item 3 (aligns to start)</div>
</div>
```

#### محاذاة خطوط الأساس

يحاذي `self-baseline` خطوط أساس النصوص للعناصر، حتى مع اختلاف ارتفاعات المحتوى. ويحاذي `self-baseline-last` إلى خط الأساس الأخير.

*محاذاة خطوط الأساس — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9a8090763c84578e8d8b4504623da354ebf199fa1383d2c13063275e81245769.html)*

```html
<div class="flex min-h-[200px] items-stretch gap-4 rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-blue-500 p-4 text-white">Item 1 (stretches)</div>
  <div class="self-baseline rounded-lg bg-green-500 p-4 text-white">
    Item 2 (aligns to baseline)
  </div>
  <div class="rounded-lg bg-purple-500 p-4 text-white">Item 3 (stretches)</div>
</div>
```

### القيم التعسّفية والخصائص المخصّصة

للقيم التي لا تغطيها الأدوات المُعرَّفة مسبقًا، أو لاستخدام متغيّرات CSS، يدعم Tailwind صيغة `self-[]` (القيم التعسّفية) وصيغة `self-()` (الخصائص المخصّصة).

على سبيل المثال، `self-[flex-start]` مثل `self-start`. و`self-(--my-custom-alignment)` تضبط `align-self` على قيمة `--my-custom-alignment`.

## المحاذاة المتجاوبة

يمكن أن تتغيّر محاذاة العنصر المفرد بحسب حجم نافذة العرض أو الحاوية. تدعم أدوات `self-*` في Tailwind التصميم المتجاوب عبر البادئات.

### نقاط توقّف نافذة العرض

طبّق أدوات `self-*` بشكل مشروط مع بادئات نقاط التوقّف (مثل `sm:` و`md:` و`lg:`).

*نقاط توقّف نافذة العرض — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/fc9a009ddd6cd20459382d022dfd7f0fd0b4cd4c9f6584616926d51f21abddee.html)*

```html
<div class="flex min-h-[200px] items-start gap-4 rounded-lg bg-gray-100 p-6 md:items-center">
  <div class="self-end rounded-lg bg-blue-500 p-4 text-white md:self-auto">Item 1</div>
  <div class="rounded-lg bg-green-500 p-4 text-white">Item 2</div>
  <div class="rounded-lg bg-purple-500 p-4 text-white">Item 3</div>
</div>
```

يُحاذى العنصر 1 إلى `end` افتراضيًا. وفي الشاشات المتوسطة (`md`) فما فوق، توسّط الحاوية العناصر (`md:items-center`)، فيرث العنصر 1 ذلك (`md:self-auto`) ويُوسَّط أيضًا.

### استعلامات الحاوية

اضبط محاذاة العنصر بحسب حجم الحاوية الأب باستخدام `@container` ومتغيّرات مثل `@sm:` و`@md:`.

*استعلامات الحاوية — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/964f1f3cea954c43b6f3234f91c9ac9127f06b227283cef63a5cabb628b995ea.html)*

```html
<div class="@container flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6">
  <div class="self-start rounded-lg bg-blue-500 p-4 text-white @md:self-end">Item 1</div>
  <div class="rounded-lg bg-green-500 p-4 text-white">Item 2</div>
</div>
```

يُحاذى العنصر 1 إلى `start` افتراضيًا. وعندما تبلغ الحاوية الأم `@container` نقطة توقّف `@md`، يُحاذى العنصر 1 إلى `end` (`@md:self-end`).

يتيح دمج أدوات `align-self` مع المزايا المتجاوبة والقيم التعسّفية إنشاء تخطيطات متجاوبة دقيقة.
