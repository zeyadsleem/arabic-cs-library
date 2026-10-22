---
title: "الشبكات الفرعية"
---

يستخدم Tailwind CSS أصناف الأدوات لبناء واجهات مستخدم معقّدة ومتجاوبة داخل HTML. والإصدار 4.0 يحسّن الأداء ويتبنّى CSS الحديث.

## العمل مع تخطيطات Grid

يوفّر Tailwind CSS أدوات لـ CSS Grid لإنشاء تخطيطات معقّدة. عرّف أعمدة grid وصفوفه، وتحكّم في الوضع التلقائي، وضع عناصر grid.

### أعمدة Grid

حدّد عدد أعمدة grid عبر أدوات مثل `grid-cols-<number>` (مثل `grid-cols-2` و`grid-cols-4`) لأعمدة متساوية الحجم. واستخدم `grid-cols-none` لعدم وجود أعمدة grid.

#### تطبيق شبكة فرعية للأعمدة

يدعم Tailwind CSS الشبكات الفرعية للأعمدة. استخدم `grid-cols-subgrid` لتبنّي مسارات الأعمدة من العنصر الأب. وهذا يحاذي عناصر grid المتداخلة مع حاوية grid الأم.

*تطبيق شبكة فرعية للأعمدة — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/13a3be93dac65bec93914d21286727e06612778555ec19aa0011d423102ba9cb.html)*

```html
<div class="grid grid-cols-12 gap-4 rounded-lg bg-gray-100 p-4">
  <!-- Parent container: 12-column grid -->
  <div class="col-span-full grid grid-cols-subgrid gap-4">
    <!-- Child item: spans all parent columns, becomes a subgrid -->
    <div class="col-span-4 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">
      Item 1
    </div>
    <div class="col-span-4 flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">
      Item 2
    </div>
    <div class="col-span-4 flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">
      Item 3
    </div>
  </div>
</div>
```

العنصر الابن الحامل لـ `grid-cols-subgrid` يرث بنية أعمدة أبيه.

### صفوف Grid

حدّد صفوف grid عبر أدوات مثل `grid-rows-<number>` (مثل `grid-rows-2` و`grid-rows-4`) لصفوف متساوية الحجم. واستخدم `grid-rows-none` لإزالة صفوف grid.

#### تطبيق شبكة فرعية للصفوف

استخدم `grid-rows-subgrid` لعنصر grid ليبتني مسارات الصفوف من أبيه. وهذا يحافظ على المحاذاة الرأسية في بنى grid المتداخلة.

*تطبيق شبكة فرعية للصفوف — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/469f9b742a367d36e3f54610ce0518cf19a96a22ec266decc5b481869df69c82.html)*

```html
<div class="grid h-64 grid-rows-6 gap-4 rounded-lg bg-gray-100 p-4">
  <!-- Parent container: 6-row grid, fixed height -->
  <div class="row-span-full grid grid-rows-subgrid gap-4">
    <!-- Child item: spans all parent rows, becomes a subgrid -->
    <div class="row-span-2 flex items-center justify-center rounded bg-blue-200 p-4">
      Row Item 1
    </div>
    <div class="row-span-2 flex items-center justify-center rounded bg-red-200 p-4">Row Item 2</div>
    <div class="row-span-2 flex items-center justify-center rounded bg-green-200 p-4">
      Row Item 3
    </div>
  </div>
</div>
```

العنصر الابن الحامل لـ `grid-rows-subgrid` يحاذي صفوفه مع مسارات صفوف شبكة grid الأم.

تعكس أدوات الشبكة الفرعية قدرات CSS Grid الأصلية، وتقدّم منهجًا قائمًا على الأدوات لميزة التخطيط هذه في Tailwind.
