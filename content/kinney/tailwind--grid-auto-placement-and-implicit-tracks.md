---
title: "الوضع التلقائي والمسارات الضمنية"
lang: ar
source: "https://stevekinney.com/courses/tailwind/grid-auto-placement-and-implicit-tracks"
---

يوفّر Tailwind CSS أدوات للتحكّم في كيفية وضع عناصر grid تلقائيًا وفي تحديد مقاسات المسارات الضمنية عندما تحتاج الشبكة إلى إنشاء صفوف أو أعمدة جديدة.

## اتجاه الوضع التلقائي

استخدم أدوات `grid-flow-*` للتحكّم في كيفية وضع العناصر:

*اتجاه الوضع التلقائي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7670fecd565408d849f7c935b0e6e7621f0dbb9ad8794d985fe4e831c42ad255.html)*

```html
<!-- Default: fill rows first -->
<div class="grid grid-flow-row grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">Item 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">Item 2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">Item 3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">Item 4</div>
  <!-- Creates new row -->
</div>

<!-- Fill columns first -->
<div class="mt-4 grid grid-flow-col grid-rows-2 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">Item 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">Item 2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-indigo-200 p-4">Item 3</div>
  <!-- Creates new column -->
</div>
```

الأدوات المتاحة:

- `grid-flow-row` - ملء الصفوف أولًا (افتراضي)
- `grid-flow-col` - ملء الأعمدة أولًا
- `grid-flow-dense` - ملء الفجوات بالعناصر الأصغر
- `grid-flow-row-dense` - تدفّق بالصفوف مع حشد كثيف
- `grid-flow-col-dense` - تدفّق بالأعمدة مع حشد كثيف

## تحديد مقاس الصفوف الضمنية

تحكّم في مقاس الصفوف المنشأة تلقائيًا عبر `auto-rows-*`:

*تحديد مقاس الصفوف الضمنية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/aaeb274785ae4979e0d008039941fe0550484a0b30322bc0081d7c4bb59c5e10.html)*

```html
<!-- New rows are 100px tall -->
<div class="grid auto-rows-[100px] grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex items-center justify-center rounded bg-blue-200 p-4">Item 1</div>
  <div class="flex items-center justify-center rounded bg-red-200 p-4">Item 2</div>
  <div class="flex items-center justify-center rounded bg-green-200 p-4">Item 3</div>
  <div class="flex items-center justify-center rounded bg-yellow-200 p-4">Item 4</div>
  <!-- In a 100px tall row -->
</div>

<!-- Responsive row sizing -->
<div class="mt-4 grid auto-rows-min grid-cols-2 gap-4 rounded-lg bg-gray-100 p-4 lg:auto-rows-max">
  <div class="rounded bg-purple-200 p-4">Content adapts to row sizing</div>
  <div class="rounded bg-pink-200 p-4">More content here</div>
</div>
```

الخيارات:

- `auto-rows-auto` - مقاس بحسب المحتوى
- `auto-rows-min` - أصغر مقاس للمحتوى
- `auto-rows-max` - أكبر مقاس للمحتوى
- `auto-rows-fr` - نسبة متساوية من المساحة
- `auto-rows-[200px]` - مقاس مخصّص

## تحديد مقاس الأعمدة الضمنية

تحكّم في مقاس الأعمدة المنشأة تلقائيًا عبر `auto-cols-*`:

*تحديد مقاس الأعمدة الضمنية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/4855ec3595226ab06349664773adc6a405fc04a7ce99f61a7449cd1aec3c197a.html)*

```html
<!-- New columns are 200px wide -->
<div class="grid auto-cols-[200px] grid-flow-col grid-rows-2 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">Item 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">Item 2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">Item 3</div>
  <!-- In a 200px wide column -->
</div>
```

الخيارات:

- `auto-cols-auto` - مقاس بحسب المحتوى
- `auto-cols-min` - أصغر مقاس للمحتوى
- `auto-cols-max` - أكبر مقاس للمحتوى
- `auto-cols-fr` - نسبة متساوية من المساحة
- `auto-cols-[minmax(200px,1fr)]` - مقاس مخصّص

## مثال الحشد الكثيف

*مثال الحشد الكثيف — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/442a4a84aa9ab6435fa2faa1297b1ebfee79e3877788e5cede6b8effad18cb6a.html)*

```html
<div class="grid grid-flow-row-dense grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="col-span-2 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">
    Large item
  </div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">Small 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">Small 2</div>
  <div class="col-span-2 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">
    Large item
  </div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">Small 3</div>
  <!-- Dense packing fills gaps automatically -->
</div>
```

## شبكة بطاقات متجاوبة

*شبكة بطاقات متجاوبة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c1d09ad1ab0eb6437825792e64e413a53251aee75dcbd8480ea05e953270804f.html)*

```html
<div
  class="grid auto-rows-[minmax(200px,auto)] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="flex items-center justify-center rounded bg-blue-200 p-4 lg:col-span-2">
    Featured card
  </div>
  <div class="flex items-center justify-center rounded bg-red-200 p-4">Regular card</div>
  <div class="flex items-center justify-center rounded bg-green-200 p-4">Regular card</div>
  <div class="flex items-center justify-center rounded bg-yellow-200 p-4">Regular card</div>
</div>
```

ينشئ هذا تخطيطًا متجاوبًا يكون فيه:

- الأعمدة تتكيّف تلقائيًا مع حجم الشاشة
- الصفوف الجديدة بارتفاع 200px على الأقل
- البطاقات المميّزة تمتدّ عبر عمودين على الشاشات الكبيرة
- جميع العناصر توضع تلقائيًا بكفاءة
