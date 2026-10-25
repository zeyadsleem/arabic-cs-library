---
title: "المحاذاة والتوزيع"
lang: ar
source: "https://stevekinney.com/courses/tailwind/grid-alignment-and-justification"
---

التحكّم في محاذاة العناصر وتوزيعها داخل مناطق grid، وفي توزيع المحتوى داخل حاوية grid، أمر جوهري في CSS Grid. ويوفّر Tailwind CSS أصناف أدوات لإدارة هذه الخصائص مباشرةً في HTML.

## تهيئة حاوية Grid

أولًا، عرّف عنصرًا كحاوية grid باستخدام أدوات العرض `grid` أو `inline-grid`.

*تهيئة حاوية Grid — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9baf9f08b2fa8e2f485e9becf143a4fa8de6342d7b85d38ccbec1c7ee4c64ebb.html)*

```html
<div class="grid gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Grid item 1</div>
  <div class="rounded bg-red-200 p-4">Grid item 2</div>
</div>

<div class="inline-grid gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-green-200 p-4">Inline grid item 1</div>
  <div class="rounded bg-yellow-200 p-4">Inline grid item 2</div>
</div>
```

يصبح الأبناء المباشرون لحاوية grid عناصر grid. عرّف بنية grid عبر `grid-cols-<number>` (للأعمدة) و`grid-rows-<number>` (للصفوف)، والمسافات عبر `gap-<number>`. وأدوات المحاذاة والتوزيع يضع هذه العناصر والمسارات في مواضعها.

## محاذاة العناصر وتوزيعها داخل مناطقها

تُطبَّق هذه الأدوات على حاوية grid (فتؤثّر في جميع الأبناء المباشرين) أو على عناصر grid المفردة (فتتجاوز إعدادات الحاوية)، وتتحكّم في وضع العنصر داخل منطقة grid المخصّصة له.

### محاذاة العناصر على المحور العرضي

تتحكّم خاصية `align-items` في محاذاة عناصر grid على طول المحور العرضي للحاوية (رأسيًا عادةً في `grid-flow-row`). تُطبَّق على حاوية grid.

الأدوات:

- `items-start`: تحاذي العناصر إلى بداية المحور العرضي.
- `items-end`: تحاذي العناصر إلى نهاية المحور العرضي. (وتحاذي `items-end-safe` إلى البداية إذا لم تكفِ المساحة).
- `items-center`: تحاذي العناصر إلى مركز المحور العرضي. (وتحاذي `items-center-safe` إلى البداية إذا لم تكفِ المساحة).
- `items-stretch`: تمدّ العناصر لتملأ المحور العرضي.
- `items-baseline`: تحاذي العناصر على خطوط أساسها. (و`items-baseline-last` لخط الأساس الأخير).

*محاذاة العناصر على المحور العرضي — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0a97181c22e5c23591c7d3637e8c9bf4c3f5084a1879c24cf6e6651b35f7561a.html)*

```html
<div class="grid h-32 grid-cols-3 items-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
</div>
```

### توزيع العناصر على المحور السطري

تتحكّم خاصية `justify-items` في محاذاة عناصر grid على طول محورها السطري (أفقيًا عادةً في `grid-flow-row`). تُطبَّق على حاوية grid.

الأدوات:

- `justify-items-start`: توزّع العناصر مقابل بداية محورها السطري.
- `justify-items-end`: توزّع العناصر مقابل نهاية محورها السطري. (وتحاذي `justify-items-end-safe` إلى البداية إذا لم تكفِ المساحة).
- `justify-items-center`: توزّع العناصر مقابل مركز محورها السطري. (وتحاذي `justify-items-center-safe` إلى البداية إذا لم تكفِ المساحة).
- `justify-items-stretch`: تمدّ العناصر على طول محورها السطري.
- `justify-items-normal`: الحشد الافتراضي للعناصر.

*توزيع العناصر على المحور السطري — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e8eb1fd52abc6c7b3701349c2a1ae3ca2e0c7ad3a3b1e04fdc86ab4e3d1dfb3d.html)*

```html
<div class="grid grid-cols-3 justify-items-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="w-16 rounded bg-blue-200 p-4">Item 1</div>
  <div class="w-20 rounded bg-red-200 p-4">Item 2</div>
  <div class="w-12 rounded bg-green-200 p-4">Item 3</div>
</div>
```

### المحاذاة والتوزيع معًا

خاصية `place-items` اختصار لـ `align-items` و`justify-items`. تُطبَّق على حاوية grid. القيمة الواحدة تُطبَّق على المحورين، والقيمتان تُطبَّقان على `align-items` (العرضي) ثم `justify-items` (السطري).

الأدوات:

- `place-items-start`: أي `align-items: start` و`justify-items: start`.
- `place-items-end`: أي `align-items: end` و`justify-items: end`. (ويتوفّر `place-items-end-safe`).
- `place-items-center`: أي `align-items: center` و`justify-items: center`. (ويتوفّر `place-items-center-safe`).
- `place-items-baseline`: أي `align-items: baseline` و`justify-items: baseline`.
- `place-items-stretch`: أي `align-items: stretch` و`justify-items: stretch`.

*المحاذاة والتوزيع معًا — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c1b54a36a2785b4e7303640ee8b1e397e182ee1b6928abba90fdf4027c727e76.html)*

```html
<div class="grid h-32 grid-cols-3 place-items-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-3">Item 1</div>
  <div class="rounded bg-red-200 p-3">Item 2</div>
  <div class="rounded bg-green-200 p-3">Item 3</div>
</div>
```

### محاذاة العناصر وتوزيعها منفردة

تجاوز إعدادات مستوى الحاوية للعناصر المفردة باستخدام `align-self` و`justify-self` و`place-self`. تُطبَّق مباشرةً على عنصر grid.

- `align-self`: تتجاوز `align-items` بالنسبة إلى عنصر. الأدوات: `self-auto` و`self-start` و`self-end` و`self-center` و`self-stretch` و`self-baseline` و`self-baseline-last`.
- `justify-self`: تتجاوز `justify-items` بالنسبة إلى عنصر. الأدوات: `justify-self-auto` و`justify-self-start` و`justify-self-center` و`justify-self-end` و`justify-self-stretch`. (ويتوفّر المتغيّرات الآمنة).
- `place-self`: اختصار لـ `align-self` و`justify-self`. الأدوات: `place-self-auto` و`place-self-start` و`place-self-end` و`place-self-center` و`place-self-stretch`. (ويتوفّر المتغيّرات الآمنة).

*محاذاة العناصر وتوزيعها منفردة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/be7360eb06b4a6e00c6387eda0817060c7f6c00d5b259a62217dcce6fdefcf5b.html)*

```html
<div class="grid h-32 grid-cols-3 items-start justify-items-start gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="self-center justify-self-end rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
</div>
```

## محاذاة المحتوى وتوزيعه داخل الحاوية

توزّع هذه الأدوات مسارات grid (الصفوف/الأعمدة) داخل حاوية grid، وتُستخدم عند وجود مساحة فائضة. تُطبَّق على حاوية grid.

### محاذاة المحتوى على المحور العرضي

تضع خاصية `align-content` الصفوف على المحور العرضي عندما يكون مجموع ارتفاع الصفوف أقل من ارتفاع الحاوية.

الأدوات:

- `content-start` و`content-end` و`content-center`
- `content-between`: مسافة متساوية بين الصفوف.
- `content-around`: مسافة متساوية حول الصفوف.
- `content-evenly`: مسافة متساوية حول كل صف، بما في ذلك الطرفين.
- `content-stretch`: تملأ الصفوف المساحة المتاحة على المحور العرضي.
- `content-baseline` و`content-normal`

*محاذاة المحتوى على المحور العرضي — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/6caacc9b8c5c7aa2da88115e4649a5d74b44be57689c4403243cac34218eb21c.html)*

```html
<div class="grid h-64 grid-rows-3 content-center gap-2 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Row 1</div>
  <div class="rounded bg-red-200 p-4">Row 2</div>
  <div class="rounded bg-green-200 p-4">Row 3</div>
</div>
```

### توزيع المحتوى على المحور الأساسي

تضع خاصية `justify-content` الأعمدة (أو الشبكة) على المحور الأساسي عندما يكون مجموع عرض الأعمدة أقل من عرض الحاوية.

الأدوات:

- `justify-start` و`justify-end` (ويتوفّر `justify-end-safe`).
- `justify-center` (ويتوفّر `justify-center-safe`).
- `justify-between`: مسافة متساوية بين المسارات.
- `justify-around`: مسافة متساوية حول المسارات.
- `justify-evenly`: مسافة متساوية حول كل مسار، بما في ذلك الطرفين.
- `justify-stretch`: تملأ المسارات المساحة المتاحة على المحور الأساسي.
- `justify-normal` و`justify-baseline`

*توزيع المحتوى على المحور الأساسي — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/cf0218c414186d05380d90507ef9092f1a36231ff9146a7dce7cd156b43d57de.html)*

```html
<div class="grid w-64 grid-cols-3 justify-center gap-2 rounded-lg bg-gray-100 p-4">
  <div class="col-span-1 rounded bg-blue-200 p-4">Item 1</div>
  <div class="col-span-1 rounded bg-red-200 p-4">Item 2</div>
</div>
```

### المحاذاة والتوزيع معًا للمحتوى

خاصية `place-content` اختصار لـ `align-content` و`justify-content`. تُطبَّق على حاوية grid. قيمة واحدة للمحورين، وقيمتان لـ `align-content` (العرضي) ثم `justify-content` (الأساسي).

الأدوات:

- `place-content-start` و`place-content-end` (ويتوفّر `place-content-end-safe`).
- `place-content-center` (ويتوفّر `place-content-center-safe`).
- `place-content-baseline` و`place-content-stretch`
- `place-content-between` و`place-content-around` و`place-content-evenly`

*المحاذاة والتوزيع معًا للمحتوى — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e0523c9a604c1edca516e897ffa1414a2dfd12d6ee8def23172b7186bfded96f.html)*

```html
<div class="grid h-64 w-64 grid-cols-3 place-content-center gap-2 rounded-lg bg-gray-100 p-4">
  <div class="col-span-1 rounded bg-blue-200 p-4">Item 1</div>
  <div class="col-span-1 rounded bg-red-200 p-4">Item 2</div>
</div>
```

## أمثلة ونصائح الاستخدام

### التصميم المتجاوب

تدعم جميع أدوات محاذاة Grid متغيّرات متجاوبة (مثل `md:justify-items-start`) للتخطيطات المتكيّفة. وتُطبَّق الأدوات غير المسبوقة بالبادئة على جميع أحجام الشاشات، بينما تُطبَّق الأدوات المسبوقة بالبادئة عند نقطة التوقّف المحدَّدة وما فوقها.

*التصميم المتجاوب — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b3c3b1d8ca13ec06e0814e49881d374872c3b28c2376b9b148ad54ecad9aac4e.html)*

```html
<div
  class="grid grid-cols-1 justify-items-center gap-4 rounded-lg bg-gray-100 p-4 md:grid-cols-2 md:justify-items-start lg:grid-cols-3"
>
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Grid item 1</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Grid item 2</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Grid item 3</div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Grid item 4</div>
  <div class="min-h-[80px] rounded bg-purple-200 p-4">Grid item 5</div>
  <div class="min-h-[80px] rounded bg-pink-200 p-4">Grid item 6</div>
</div>
```

تُوسَّط العناصر افتراضيًا، ثم تُحاذى إلى البداية بـ `justify-items-start` على الشاشات المتوسطة فما فوق.

### القيم التعسّفية

استخدم القيم التعسّفية `[]` لقيم CSS محدّدة غير موجودة في السمة الافتراضية، وإن كان استخدامها في المحاذاة أقل شيوعًا منها في الألوان أو المسافات.

### الإعداد القائم على CSS في Tailwind 4

يُبرز Tailwind 4 الإعداد القائم على CSS عبر `@theme` في ملف CSS لديك. فبينما تُستخدم أدوات المحاذاة في HTML، تبقى قيمها الأساسية (مثل المسافات في `gap-<number>`) معرَّفةً عبر متغيّرات CSS قابلة للتخصيص في `@theme`.
