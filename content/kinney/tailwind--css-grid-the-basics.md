---
title: "CSS Grid: الأساسيات"
lang: ar
source: "https://stevekinney.com/courses/tailwind/css-grid-the-basics"
---

يوفّر CSS Grid مع Tailwind تحكّمًا دقيقًا في التخطيطات ثنائية الأبعاد. وFlexbox قوي في المحاذاة أحادية البُعد، لكنّ Grid يتفوّق في البُعدين. أما Tailwind 4، بنهج «الأدوات أولًا»، فيجعل بناء تخطيطات Grid المعقّدة بديهيًا وسريعًا. يُركّب التخطيطات مباشرةً في HTML عبر أصناف واضحة ودلالية، فتقلّ الحاجة إلى CSS مخصّص.

## تهيئة حاوية Grid

لإنشاء تخطيط grid، عرّف أولًا حاوية grid. وفي CSS القياسية يكون ذلك `display: grid;`. ويستخدم Tailwind صنف الأداة `grid`.

تطبيق `grid` على عنصر يجعله حاوية grid، فينشئ سياق تنسيق grid على مستوى الكتلة لمحتوياته. وتتحكّم هذه الحاوية في كيفية توزيع عناصرها المباشرة (عناصر grid).

*تهيئة حاوية Grid — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/94dd431e6b34104ec19e113bb405fd419ce2da9b5bf85a1a3aaaff279ab5c402.html)*

```html
<div class="grid gap-4 rounded-lg bg-gray-100 p-4">
  <!-- Grid items go here -->
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
</div>
```

هذا الصنف هو أساس كل قدرات تخطيط grid.

## تعريف مسارات Grid الصريحة

بعد أن تحصل على حاوية grid، عرّف الشبكة بتحديد الأعمدة والصفوف، وهي ما يُعرف بمسارات grid الصريحة.

### أعمدة Grid

عرّف أعمدة grid صريحة باستخدام أدوات تقابل خاصية `grid-template-columns` في CSS. والأداة الأساسية في Tailwind هي `grid-cols-<number>`.

تُنشئ `grid-cols-<number>` شبكة بعدد محدّد من الأعمدة المتساوية الحجم. فمثلًا، تُنشئ `grid-cols-3` ثلاثة أعمدة، يأخذ كل منها نسبة متساوية من المساحة المتاحة، باستخدام CSS بصيغة `repeat(<number>, minmax(0, 1fr))`. وتمثّل وحدة `fr` نسبة من المساحة المتاحة في حاوية grid.

*أعمدة Grid — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/8ff16d7507bbdb36dc7042d55cdcd616a4e3dea839fd34c4f6a22f58a1d26fcc.html)*

```html
<div class="grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">4</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">5</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">6</div>
</div>
```

هذا ينشئ شبكة من ثلاثة أعمدة، عرض كل عمود فيها ثلث عرض الحاوية (ناقص الفجوة).

أزل الأعمدة المعرَّفة صراحةً باستخدام `grid-cols-none` (`grid-template-columns: none;`).

ولتعريفات الأعمدة المعقّدة، استخدم القيم التعسّفية مع `grid-cols-[<value>]`. فهذا يسمح بأي قيمة CSS صالحة لـ `grid-template-columns`، مثل عروض محدّدة، أو `repeat` بوحدات مختلفة، أو `fit-content`.

*أعمدة Grid — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2fae09d065c0b1a5fd05639c9b637e9fbe7e05ab98ab3d143d0792493237859e.html)*

```html
<div class="grid grid-cols-[200px_1fr_200px] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Fixed 200px</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Flexible 1fr</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Fixed 200px</div>
</div>
```

أشِر إلى متغيّرات CSS لتعريفات الأعمدة عبر `grid-cols-(<custom-property>)`، مثل `grid-cols-(--my-column-layout)`.

### صفوف Grid

وبالمثل، عرّف صفوف grid صريحة باستخدام أدوات تقابل `grid-template-rows`. والأداة الأساسية هي `grid-rows-<number>`.

تُنشئ `grid-rows-<number>` شبكة بعدد محدّد من الصفوف المتساوية الحجم، باستخدام CSS بصيغة `repeat(<number>, minmax(0, 1fr))`.

*صفوف Grid — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1466756b937632dcad1b7555ba663c20158a522e13aa44dbb80aa34730d1451d.html)*

```html
<div class="grid grid-flow-col grid-rows-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">4</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">5</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">6</div>
</div>
```

هذا ينشئ شبكة من ثلاثة صفوف. وتدفّق العناصر إلى الأعمدة (`grid-flow-col`) بعد ملء الصفوف. ويأخذ كل صف نسبة متساوية من الارتفاع المتاح.

أزل الصفوف المعرَّفة صراحةً باستخدام `grid-rows-none`.

ولتعريفات صفوف مخصّصة، تسمح `grid-rows-[<value>]` بالقيم التعسّفية.

*صفوف Grid — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/766455f4c457b5c83855968a2b0ec9ef16d8bc5960185c18326f6e7556ab5756.html)*

```html
<div class="grid grid-rows-[100px_auto_100px] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Header (100px)</div>
  <div class="rounded bg-red-200 p-4">Content (auto)</div>
  <div class="rounded bg-green-200 p-4">Footer (100px)</div>
</div>
```

ويمكن أيضًا استخدام متغيّرات CSS لتعريفات الصفوف عبر `grid-rows-(<custom-property>)`.

### Subgrid

يدعم Tailwind خاصية `subgrid` لكل من `grid-template-columns` و`grid-template-rows` عبر أدوات `grid-cols-subgrid` و`grid-rows-subgrid`.

تتيح الـ subgrid لشبكة متداخلة أن تحاذي مساراتها مع شبكة أبيها، فتورث مقاسات ومواضع أعمدة أبيها أو صفوفه.

*Subgrid — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5754075c0d4b71bf733ac5bdf0fdb216dbc2d836824e344c1e3eacfbeb5c8305.html)*

```html
<div class="grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="col-span-2 grid grid-cols-subgrid gap-4">
    <!-- This item spans parent columns 2 and 3; its children align to columns 2 and 3 -->
    <div class="min-h-[80px] rounded bg-red-200 p-4">Nested Item 1</div>
    <div class="min-h-[80px] rounded bg-green-200 p-4">Nested Item 2</div>
  </div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 3</div>
</div>
```

تحافظ هذه الميزة على محاذيات grid المعقّدة عبر العناصر المتداخلة.

## التحكّم في الوضع التلقائي

تُوضَع عناصر grid تلقائيًا في خلايا grid المعرَّفة. وتتحكّم خاصية `grid-auto-flow` في هذا الوضع التلقائي.

أدوات Tailwind للوضع التلقائي:

- `grid-flow-row`: تملأ العناصر كل صف، وتضيف صفوفًا جديدة عند الحاجة (افتراضي).
- `grid-flow-col`: تملأ العناصر كل عمود، وتضيف أعمدة جديدة عند الحاجة.
- `grid-flow-dense`: تستخدم خوارزمية حشد «كثيفة» لملء الفجوات المبكرة في الشبكة، وقد يُعيد ذلك ترتيب العناصر. تُدمج مع `row` أو `col`.
- `grid-flow-row-dense`: حشد كثيف مع تدفّق العناصر بالصف.
- `grid-flow-col-dense`: حشد كثيف مع تدفّق العناصر بالعمود.

*التحكّم في الوضع التلقائي — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2eb2fa902b2e9501e486a4cc25386ef12893f13b71d97a5e65a036129272f169.html)*

```html
<div class="grid grid-flow-col grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">4</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">5</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">6</div>
</div>
```

هنا، تجعل `grid-flow-col` العناصر 1 و2 و3 تملأ صفوف العمود الأول قبل الانتقال إلى الثاني.

## تحديد مقاسات المسارات الضمنية

إذا كان عدد عناصر grid أكبر من عدد الخلايا الصريحة، فإنّ الشبكة تنشئ مسارات *ضمنية* (أعمدة أو صفوف). ويُتحكّم في مقاسها عبر `grid-auto-columns` و`grid-auto-rows`.

أدوات Tailwind لهاتين الخاصيتين:

- `auto-cols-auto` و`auto-rows-auto`: تتكيّف مقاسات المسارات الضمنية تلقائيًا بحسب المحتوى.
- `auto-cols-min` و`auto-rows-min`: تأخذ المسارات الضمنية أصغر مقاس للمحتوى داخلها.
- `auto-cols-max` و`auto-rows-max`: تأخذ المسارات الضمنية أكبر مقاس للمحتوى داخلها.
- `auto-cols-fr` و`auto-rows-fr`: تأخذ المسارات الضمنية مقاسًا كنِسَب من المساحة المتاحة.

*تحديد مقاسات المسارات الضمنية — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7ea5774ac1391ed3234454347bcd30ee0aec09dcfa853e74bd1c2fd583e6496a.html)*

```html
<div class="grid auto-cols-max grid-cols-2 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3 that's much wider</div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
</div>
```

لهذه الشبكة عمودان صريحان. ويوضع العنصران 3 و4 في *عمود ضمني* ثالث. وتضمن `auto-cols-max` أن يكون هذا العمود عريضًا بما يكفي لأعرض عنصر (العنصر 3).

وتُدعم القيم التعسّفية لـ `auto-cols-[<value>]` و`auto-rows-[<value>]`.

## التحكّم في الفجوات

تحتاج التخطيطات غالبًا إلى مسافة بين عناصر grid. ويوفّر Grid `gap` و`row-gap` و`column-gap`.

يستخدم Tailwind سلّم المسافات الخاص به والقيم التعسّفية في أدوات الفجوات:

- `gap-<number>`: يضبط الفجوة للصفوف والأعمدة (مثل `gap-4` أي 1rem).
- `gap-x-<number>`: يضبط الفجوة الأفقية.
- `gap-y-<number>`: يضبط الفجوة الرأسية.

*التحكّم في الفجوات — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7fec7c5de16fdee6edc85221225ed68480a9039d6a3d4643c847831296316777.html)*

```html
<div class="grid grid-cols-4 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3</div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
</div>

<div class="mt-4 grid grid-cols-3 gap-x-8 gap-y-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-purple-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-pink-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-indigo-200 p-4">Item 3</div>
  <div class="min-h-[80px] rounded bg-teal-200 p-4">Item 4</div>
  <div class="min-h-[80px] rounded bg-orange-200 p-4">Item 5</div>
  <div class="min-h-[80px] rounded bg-lime-200 p-4">Item 6</div>
</div>
```

تطبّق هذه الأدوات مسافات متّسقة. ويمكن استخدام القيم التعسّفية مثل `gap-[10px]` أو `gap-x-[5%]` أيضًا.

## وضع عناصر Grid

يتيح Grid وضع العناصر بدقّة، متجاوزًا الوضع التلقائي.

### تمدّد العناصر عبر المسارات

لجعل عنصر يمتدّ عبر عدة أعمدة أو صفوف، استخدم `grid-column` أو `grid-row` مع `span`.

- `col-span-<number>`: يمتدّ العنصر عبر عدد محدّد من الأعمدة.
- `row-span-<number>`: يمتدّ العنصر عبر عدد محدّد من الصفوف.

*تمدّد العناصر عبر المسارات — المثال 10 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d3e0318a2fc5354baa19881b796d46886166afa59a9af5464a2e662494b67e24.html)*

```html
<div class="grid grid-cols-6 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="col-span-4 min-h-[80px] rounded bg-blue-200 p-4">Item 1 spans 4 columns</div>
  <div class="col-span-2 min-h-[80px] rounded bg-red-200 p-4">Item 2 spans 2 columns</div>
  <div class="col-span-2 min-h-[80px] rounded bg-green-200 p-4">Item 3 spans 2 columns</div>
  <div class="col-span-4 min-h-[80px] rounded bg-yellow-200 p-4">Item 4 spans 4 columns</div>
</div>
```

هذه الشبكة ذات ستة أعمدة يمتدّ فيها العنصر الأول عبر أربعة أعمدة والعنصر الثاني عبر عمودين في الصف الأول. ويفعل العنصران الثالث والرابع الشيء نفسه في الصف الثاني.

`col-span-full` تجعل العنصر يمتدّ عبر كل الأعمدة (`grid-column: 1 / -1;`). و`row-span-full` تفعل الشيء نفسه للصفوف.

وتُدعم القيم التعسّفية لـ `col-span-[<value>]` و`row-span-[<value>]`.

### البدء والانتهاء عند خطوط محدّدة

ضع العنصر بتحديد سطري البداية والنهاية في grid عبر `grid-column-start` و`grid-column-end` و`grid-row-start` و`grid-row-end`.

- `col-start-<number>`: يبدأ العنصر عند خط العمود المحدّد.
- `col-end-<number>`: ينتهي العنصر عند خط العمود المحدّد.
- `row-start-<number>`: يبدأ العنصر عند خط الصف المحدّد.
- `row-end-<number>`: ينتهي العنصر عند خط الصف المحدّد.

*البدء والانتهاء عند خطوط محدّدة — المثال 11 — [افتح المثال](https://stevekinney.com/generated/playgrounds/6406e8bbfe7cbd4a9cecd222306291a3525eb902058b4ccdf6e0619d65af2491.html)*

```html
<div class="grid h-64 grid-cols-3 grid-rows-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="col-start-2 col-end-3 row-start-1 row-end-3 rounded bg-blue-200 p-4">
    Item 1 (Col 2, Row 1-2)
  </div>
  <div class="col-start-1 col-end-2 row-start-2 row-end-4 rounded bg-red-200 p-4">
    Item 2 (Col 1, Row 2-3)
  </div>
</div>
```

يبدأ العنصر الأول عند خط العمود 2، وينتهي عند خط العمود 3، ويمتدّ عبر الصفوف من 1 إلى 3. ويوضع العنصر الثاني على نحو مماثل.

وتتوفّر أدوات `col-auto` و`row-auto` و`col-start-auto` و`col-end-auto` و`row-start-auto` و`row-end-auto`.

وتُدعم القيم التعسّفية والأرقام السالبة (مثل `col-start-[-1]`).

## المحاذاة والتوزيع

يوفّر Grid تحكّمًا في محاذاة العناصر داخل مناطق grid وفي تموضع المسارات داخل الحاوية.

### محاذاة المحتوى (`align-content`)

تتحكّم `align-content` في محاذاة *مسارات* grid على طول *المحور العرضي* للحاوية (رأسيًا عادةً) عند وجود مساحة فائضة. وتُطبَّق على حاوية grid.

أدوات `content-*` في Tailwind: `content-normal` و`content-center` و`content-start` و`content-end` و`content-between` و`content-around` و`content-evenly` و`content-baseline` و`content-stretch`.

*محاذاة المحتوى (align-content) — المثال 12 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b7aec59f620dcb6d294bc95c820ec18fdb8adee016855f4252a0f75f8e64cda4.html)*

```html
<div class="grid h-48 grid-rows-3 content-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
</div>
```

تُوسَّط الصفوف رأسيًا بفضل `content-center`.

### محاذاة العناصر (`align-items`)

تتحكّم `align-items` في محاذاة عناصر grid *المفردة* داخل *خلاياها* على طول *المحور العرضي* للحاوية. وتُطبَّق على حاوية grid.

أدوات `items-*` في Tailwind: `items-start` و`items-end` و`items-center` و`items-baseline` و`items-stretch` (افتراضي).

*محاذاة العناصر (align-items) — المثال 13 — [افتح المثال](https://stevekinney.com/generated/playgrounds/3b56acf6e8bc61cc7ef27bb6d039491def90cba0d061bf5e3710dca8184edfb0.html)*

```html
<div class="grid h-32 grid-cols-2 items-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
</div>
```

كلا العنصرين موسّط رأسيًا في خلاياهما بفضل `items-center`.

وتمنع أدوات اللاحقة `-safe` (مثل `items-end-safe`) العناصر من الخروج خارج حاويتها.

### محاذاة العنصر نفسه (`align-self`)

تتجاوز `align-self` قيمة `align-items` بالنسبة إلى عنصر grid *واحد*. وتُطبَّق على عنصر grid.

أدوات `self-*` في Tailwind: `self-auto` (تستخدم `align-items`)، و`self-start`، و`self-end`، و`self-center`، و`self-stretch`، و`self-baseline`.

*محاذاة العنصر نفسه (align-self) — المثال 14 — [افتح المثال](https://stevekinney.com/generated/playgrounds/36baea3f7048f7736fe607f7b8aea8f6c4cb00b085d26714c931c28aeea82b72.html)*

```html
<div class="grid h-32 grid-cols-2 items-start gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="self-center rounded bg-red-200 p-4">Item 2 (centered)</div>
</div>
```

تُحاذي `items-start` العناصر إلى الأعلى، لكنّ `self-center` تتجاوز ذلك بالنسبة إلى العنصر 2.

وتتوفّر أدوات اللاحقة `-safe`.

### توزيع المحتوى (`justify-content`)

تتحكّم `justify-content` في محاذاة *مسارات* grid على طول *المحور الأساسي* للحاوية (أفقيًا عادةً) عند وجود مساحة فائضة. وتُطبَّق على حاوية grid.

أدوات `justify-*` في Tailwind: `justify-start` و`justify-end` و`justify-center` و`justify-between` و`justify-around` و`justify-evenly` و`justify-stretch` و`justify-normal`.

*توزيع المحتوى (justify-content) — المثال 15 — [افتح المثال](https://stevekinney.com/generated/playgrounds/98187fc11a9cdeecc6dbdffcc831bb8f13435a7cd897912ea9190a10bc508ee8.html)*

```html
<div class="grid h-96 grid-cols-[4rem_4rem_4rem] justify-center gap-4 rounded-lg bg-green-100 p-4">
  <div class="flex h-12 w-12 items-center justify-center rounded bg-blue-200">1</div>
  <div class="flex h-12 w-12 items-center justify-center rounded bg-red-200">2</div>
</div>
```

تُوسَّط الأعمدة الضمنية داخل الحاوية بفضل `justify-center`.

### توزيع العناصر (`justify-items`)

تتحكّم `justify-items` في محاذاة عناصر grid *المفردة* داخل *خلاياها* على طول *المحور السطري* للحاوية (أفقيًا عادةً). وتُطبَّق على حاوية grid.

أدوات `justify-items-*` في Tailwind: `justify-items-start` و`justify-items-end` و`justify-items-center` و`justify-items-stretch` (افتراضي)، و`justify-items-normal`.

*توزيع العناصر (justify-items) — المثال 16 — [افتح المثال](https://stevekinney.com/generated/playgrounds/8de9c4ed54af705b78389549cc35350e4737c7d3beb4e2cb86902c7807f42814.html)*

```html
<div class="grid h-96 grid-cols-3 justify-items-center gap-4 rounded-lg bg-green-100 p-4">
  <div class="h-24 w-24 rounded bg-blue-200 p-4">Item 1</div>
  <div class="h-24 w-24 rounded bg-red-200 p-4">Item 2</div>
</div>
```

تُوسَّط العناصر أفقيًا في خلاياها بفضل `justify-items-center`.

وتتوفّر أدوات اللاحقة `-safe`.

### توزيع العنصر نفسه (`justify-self`)

تتجاوز `justify-self` قيمة `justify-items` بالنسبة إلى عنصر grid *واحد*. وتُطبَّق على عنصر grid.

أدوات `justify-self-*` في Tailwind: `justify-self-auto` (تستخدم `justify-items`)، و`justify-self-start`، و`justify-self-end`، و`justify-self-center`، و`justify-self-stretch`.

*توزيع العنصر نفسه (justify-self) — المثال 17 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7f610afd0a3d42136154dbc764ed5a73996017ffda0558a68b21b1a5b392207a.html)*

```html
<div class="grid grid-cols-2 justify-items-start gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1 (start)</div>
  <div class="min-h-[80px] justify-self-center rounded bg-red-200 p-4">Item 2 (centered)</div>
</div>
```

تُحاذي `justify-items-start` العناصر إلى اليسار، لكنّ `self-center` تتجاوز ذلك بالنسبة إلى العنصر 2.

وتتوفّر أدوات اللاحقة `-safe`.

### وضع المحتوى والعناصر (`place-content` و`place-items` و`place-self`)

يوفّر Grid اختصارات لضبط المحاذاة والتوزيع معًا.

- `place-content-*`: تضبط `align-content` و`justify-content`. تُطبَّق على الحاوية.
- `place-items-*`: تضبط `align-items` و`justify-items`. تُطبَّق على الحاوية.
- `place-self-*`: تضبط `align-self` و`justify-self`. تُطبَّق على العنصر.

*وضع المحتوى والعناصر (place-content وplace-items وplace-self) — المثال 18 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5521e2ffc6f903df71c3d7ac624c342f7ac028ffb76bc825ef447c25ab4862f2.html)*

```html
<div
  class="grid h-48 w-48 grid-cols-2 grid-rows-2 place-items-center gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-3">Item 1</div>
  <div class="rounded bg-red-200 p-3">Item 2</div>
  <div class="rounded bg-green-200 p-3">Item 3</div>
  <div class="rounded bg-yellow-200 p-3">Item 4</div>
</div>
```

توسّط `place-items-center` جميع العناصر أفقيًا ورأسيًا في خلاياها.

وتوسّط `place-content-center` مسارات grid داخل الحاوية. وتوسّط `place-self-center` عنصرًا مفردًا في خليته.

وتتوفّر أدوات اللاحقة `-safe`.

## تخطيطات Grid المتجاوبة

يدعم Tailwind التصميم المتجاوب. ويمكن تطبيق أدوات Grid بشكل مشروط عند نقاط التوقّف (`sm:` و`md:` و`lg:` و`xl:` و`2xl:`).

*تخطيطات Grid المتجاوبة — المثال 19 — [افتح المثال](https://stevekinney.com/generated/playgrounds/3c750e723c88076f1176bfdedb1d45824bf514223227feebb086405d4627dc97.html)*

```html
<div class="grid grid-cols-1 gap-4 rounded-lg bg-gray-100 p-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3</div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
  <div class="min-h-[80px] rounded bg-purple-200 p-4">Item 5</div>
  <div class="min-h-[80px] rounded bg-pink-200 p-4">Item 6</div>
</div>
```

هذه الشبكة بعمود واحد على الشاشات الصغيرة، وبعمودين على المتوسطة (`md`)، وبثلاثة أعمدة على الكبيرة (`lg`).

وTailwind يتبع منهج «الجوال أولًا»: فتُطبَّق الأنماط غير المسبوقة بالبادئة على جميع المقاسات، وتتجاوز الأنماط المسبوقة بالبادئة تلك عند نقطة توقّفها وما فوقها.

يدعم Tailwind أيضًا استعلامات الحاوية. ضع علامة `@container` على عنصر، ثم استخدم متغيّرات مثل `@sm:` على أبنائه لتنسيقهم بحسب عرض الحاوية.

*تخطيطات Grid المتجاوبة — المثال 20 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1f3847b11ba384acbfa954fe9d1b6c4d0827387c7b3f275347504229cbb4609c.html)*

```html
<div class="@container">
  <div class="grid grid-cols-1 gap-4 rounded-lg bg-gray-100 p-4 @md:grid-cols-2">
    <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
    <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
    <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3</div>
    <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
  </div>
</div>
```

شبكة الابن بعمود واحد افتراضيًا، لكنها بعمودين عندما يبلغ عنصر `@container` المقاس المتوسط.

## تخصيص إعدادات Grid

خصّص أعمدة grid وصفوفه وفجواته باستخدام التوجيه `@theme` في ملف CSS الرئيسي.

عرّف قوالب grid مخصّصة عبر متغيّرات السمة `--grid-template-columns-*` و`--grid-template-rows-*`.

```css
@import 'tailwindcss';

@theme {
  --grid-template-columns-layout: 1fr 2fr 1fr;
  --grid-template-rows-header: auto;
  --grid-template-rows-content: 1fr;
  --grid-template-rows-footer: auto;
}
```

استخدم هذه القيم كأصناف أدوات:

*تخصيص إعدادات Grid — المثال 21 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e5d877da7d925822d525195ee805d45cc19a075b52104edca7514495c2cc755f.html)*

```html
<div
  class="grid-cols-layout grid-rows-header grid-rows-content grid-rows-footer grid gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-4">Header</div>
  <div class="rounded bg-red-200 p-4">Content Area</div>
  <div class="rounded bg-green-200 p-4">Footer</div>
</div>
```

يدمج هذا تعاريف grid المعقّدة في نظام التصميم لديك. وخصّص مسافات الفجوات عبر `--spacing`.

## استخدام القيم التعسّفية مع أدوات Grid

تدعم كثير من أدوات grid في Tailwind القيم التعسّفية عبر صيغة `[<value>]`، ما يسمح بأي قيمة CSS صالحة.

*استخدام القيم التعسّفية مع أدوات Grid — المثال 22 — [افتح المثال](https://stevekinney.com/generated/playgrounds/49b7638cfb15df62580a5065567b9391e463ac5852b22fcfb3b03a26d759505a.html)*

```html
<div
  class="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-[2rem] rounded-lg bg-gray-100 p-4"
>
  <div class="min-h-[120px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[120px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[120px] rounded bg-green-200 p-4">Item 3</div>
  <div class="min-h-[120px] rounded bg-yellow-200 p-4">Item 4</div>
</div>
```

تنشئ القيم التعسّفية شبكة متجاوبة بأعمدة تتكيّف تلقائيًا وفجوة مخصّصة. واستخدم متغيّرات CSS داخل القيم التعسّفية، مثل `w-[var(--sidebar-width)]`.
