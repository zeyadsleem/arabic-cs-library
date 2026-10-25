---
title: "أعداد الأعمدة التعسّفية"
lang: ar
source: "https://stevekinney.com/courses/tailwind/grid-arbitrary-column-counts"
---

يتيح CSS Grid في Tailwind CSS بناء تخطيطات متجاوبة ومعقّدة داخل HTML. ويترجم Tailwind ميزات CSS الأصلية مثل `grid-template-columns` إلى أصناف موجزة.

## تعريف أعمدة Grid

يوفّر Tailwind أدوات لبنية أعمدة grid. والأصناف مثل `grid-cols-1` إلى `grid-cols-12` (وما فوقها عبر الإعداد) تنشئ شبكات بعدد ثابت من الأعمدة المتساوية. و`grid-cols-none` تحدّد عدم وجود أعمدة grid.

وتُنتج أدوات مثل `grid-cols-4` CSS من الشكل `grid-template-columns: repeat(4, minmax(0, 1fr));`، فتُنشئ أعمدة مرنة متساوية العرض.

### تطبيق شبكة فرعية للأعمدة

للعناصر grid المتداخلة التي تحتاج إلى محاذاة مع مسارات أعمدة الأب، يدعم Tailwind خاصية CSS `subgrid`. وتجعل أداة `grid-cols-subgrid` عنصر grid يتبنّى مسارات أعمدة أبيه، مما يضمن المحاذاة عبر مستويات التداخل.

### استخدام تعريفات أعمدة تعسّفية

لتعريفات أعمدة مخصّصة لا تغطيها الأنماط القياسية، يكون دعم Tailwind للقيم التعسّفية مفيدًا. استخدم `grid-cols-[<value>]` لضبط `grid-template-columns` على أي قيمة CSS صالحة.

وتتيح هذه الصيغة `[]` مقاسات مسارات مخصّصة أو دوال تكرار أو متغيّرات CSS، فتخرج عن قيود السمة المُعرَّفة مسبقًا.

#### تعريف قوائم مسارات مخصّصة

قدّم نص قائمة المسارات المخصّصة بين أقواس مربّعة.

*تعريف قوائم المسارات المخصّصة — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/eefc83480c16ddbf176d940c7dd559e79257ec1b6caba4a663d9c460c88e5210.html)*

```html
<div class="grid grid-cols-[200px_1fr_1fr] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">
    Fixed 200px
  </div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">
    Flexible 1fr
  </div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">
    Flexible 1fr
  </div>
</div>
```

هذا يمنحك تحكّمًا دقيقًا، فيسمح بمقاسات مسارات تجمع بين الثابت والمرن والقائم على المحتوى (`min-content` و`max-content` و`auto`).

#### استخدام `repeat()` مع القيم التعسّفية

استخدم دالة CSS `repeat()` داخل القيم التعسّفية لأنماط مثل عدد ديناميكي من الأعمدة أو أعمدة متكرّرة غير متساوية العرض.

مثال: عدد متغيّر من الأعمدة متساوية العرض.

*استخدام repeat() مع القيم التعسّفية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e1bec70fd6ac6d616655a54a3fde490802b7fa4b15c00f7a878402ec3d067daa.html)*

```html
<div
  class="grid grid-cols-[repeat(var(--col-count),_1fr)] gap-4 rounded-lg bg-gray-100 p-4"
  style="--col-count: 4;"
>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">Item 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">Item 2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">Item 3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">Item 4</div>
</div>
```

يمكن التحكّم في `--col-count` عبر متغيّرات CSS (وقد تُضبط بواسطة JavaScript أو CSS أخرى). وبالنسبة إلى متغيّرات CSS كقيم تعسّفية، يدعم Tailwind أيضًا `grid-cols-(--col-definition)`.

#### أعداد أعمدة ديناميكية عبر القيم التعسّفية

يتيح دمج القيم التعسّفية مع متغيّرات CSS أعداد أعمدة ديناميكية. عرّف متغيّر CSS (مثلًا عبر `@theme` أو CSS قياسية) يحمل قيمة `grid-template-columns`، ثم أشِر إليه بـ `grid-cols-(<custom-property>)`.

فإذا كانت `--dynamic-cols: repeat(3, auto) 1fr;` استخدم `class="grid grid-cols-(--dynamic-cols)"`. وهذا يسمح بتعريفات grid مرنة تستجيب لتغيّرات متغيّرات CSS.

وتوفّر `grid-cols-[<value>]` و`grid-cols-(<custom-property>)` وسيلتين لتعريف أي بنية أعمدة grid بصيغة CSS قياسية، فتتيح تخطيطات grid مخصّصة أو ديناميكية في Tailwind. ويختلف ذلك عن `grid-cols-subgrid` التي ترث مسارات الأب.
