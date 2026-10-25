---
title: "التخطيطات متعددة الأعمدة"
---

تُعدّ التخطيطات متعددة الأعمدة في CSS مفيدة للمحتوى الغنيّ بالنص مثل المقالات. وتوزّع خاصية `columns` في CSS المحتوى على عدد محدّد من الأعمدة أو على أعمدة بعرض أدنى. ويقدّم Tailwind CSS أدوات تُطابِق هذه الخاصية.

## تعريف التخطيطات متعددة الأعمدة

أدوات Tailwind الخاصة بخاصية `columns` في CSS تنشئ حاويات متعددة الأعمدة. ويمكنك تحديد عدد الأعمدة أو عرض العمود المثالي.

### ضبط عدد الأعمدة

استخدم أدوات `columns-<number>` لعدد ثابت من الأعمدة. فمثلًا، يقسم `columns-3` المحتوى إلى ثلاثة أعمدة. ويحسب المتصفح عرض العمود ليملأ الحاوية.

*ضبط عدد الأعمدة — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7038114c98a3d142f3c399bdb81e94ecdfd0d5af8942f35d53498b00645e7e28.html)*

```html
<div class="columns-3 gap-4 rounded-lg bg-gray-100 p-4">
  <p class="mb-4 rounded bg-blue-200 p-3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p class="mb-4 rounded bg-red-200 p-3">
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.
  </p>
  <p class="mb-4 rounded bg-green-200 p-3">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
    beatae vitae dicta sunt explicabo.
  </p>
  <p class="mb-4 rounded bg-yellow-200 p-3">
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
  </p>
</div>
```

وهذا مفيد لتصميم متّسق عبر أحجام الشاشات.

### ضبط عرض الأعمدة

على العكس من ذلك، حدّد عرض العمود المثالي، فينشئ المتصفح بقدر ما يتّسع من أعمدة بهذا العرض التقريبي. وتقدّم Tailwind أدوات مثل `columns-xs` إلى `columns-7xl` تقابل عروضًا مُعرَّفة مسبقًا (فمثلًا `columns-sm` هو `24rem`).

*ضبط عرض الأعمدة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1b73d273441fda95204dfc46596b07d03f05d6b74e394b9aa68b779b4d50394f.html)*

```html
<div class="columns-sm gap-4 rounded-lg bg-gray-100 p-4">
  <p class="mb-4 rounded bg-blue-200 p-3">
    This content flows into columns roughly 24rem wide. The number of columns adjusts based on
    container width.
  </p>
  <p class="mb-4 rounded bg-red-200 p-3">
    Wider containers get more columns. Narrower containers may reduce column count to maintain
    minimum width.
  </p>
  <p class="mb-4 rounded bg-green-200 p-3">
    Each paragraph represents content that will flow naturally across the available columns,
    creating a balanced layout.
  </p>
</div>
```

الأعمدة القائمة على العرض مناسبة للتصاميم المستجيبة التي يحدّد فيها المحتوى عدد الأعمدة.

### التحكم في الفاصل بين الأعمدة

تضيف المتصفحات فاصلًا افتراضيًا صغيرًا بين الأعمدة. وتحكّم في ذلك بأدوات `gap-*` إلى جانب `columns-*`.

*التحكم في الفاصل بين الأعمدة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2577a180fb3061d3df5775cfc199d941880430fc393b13774548f315baeff600.html)*

```html
<div class="columns-2 gap-8 rounded-lg bg-gray-100 p-4">
  <p class="mb-4 rounded bg-blue-200 p-3">Content for the first column with a larger gap.</p>
  <p class="mb-4 rounded bg-red-200 p-3">Content for the second column.</p>
  <p class="mb-4 rounded bg-green-200 p-3">
    Additional content that will flow across columns naturally.
  </p>
</div>
```

تطبّق أدوات `gap-*` خاصية `column-gap`. وفي التخطيطات متعددة الأعمدة، تتحكّم أدوات `gap` أو `gap-x` في `column-gap`.

## المرونة مع القيم العشوائية

تتيح صيغة القيم العشوائية في Tailwind أي قيمة CSS في أصناف الأدوات. وهذا مفيد إذا لم تناسب قيم `columns` المُعرَّفة مسبقًا، أو مع قيم ديناميكية مثل متغيّرات CSS.

### عدد أعمدة عشوائي

حدّد عدد أعمدة مخصّصًا عبر `columns-[<number>]`.

*عدد أعمدة عشوائي — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c3bb218fdcffcbecb5c35666913cb50e84a32988c8b0f0dff28b6f027c2d809f.html)*

```html
<div class="columns-[5] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="mb-4 rounded bg-blue-200 p-3">Column content 1</div>
  <div class="mb-4 rounded bg-red-200 p-3">Column content 2</div>
  <div class="mb-4 rounded bg-green-200 p-3">Column content 3</div>
  <div class="mb-4 rounded bg-yellow-200 p-3">Column content 4</div>
  <div class="mb-4 rounded bg-purple-200 p-3">Column content 5</div>
</div>
```

### عرض عمود عشوائي

حدّد عرض عمود مخصّصًا عبر `columns-[<value>]`، حيث `<value>` أي طول في CSS.

*عرض عمود عشوائي — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/45508072518e388dfd318ced9b1b4efa06d484568fd5c83b98e594547a78217d.html)*

```html
<div class="columns-[300px] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="mb-4 rounded bg-blue-200 p-3">Content flows into columns ~300px wide</div>
  <div class="mb-4 rounded bg-red-200 p-3">Each column will be approximately 300 pixels wide</div>
  <div class="mb-4 rounded bg-green-200 p-3">
    The number of columns adjusts based on container width
  </div>
</div>
```

### استخدام متغيّرات CSS مع القيم العشوائية

```css
:root {
  --article-column-width: 20rem;
  --another-width-var: 18rem;
}
```

أشِر إلى متغيّرات CSS عبر `columns-[var(--my-column-width)]` أو عبر الاختصار `columns-(<custom-property>)`.

*استخدام متغيّرات CSS مع القيم العشوائية — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c6fb806f8a87d101a1e34c44939a3c054b05c0112682b204ba77302fd9a0fa69.html)[CSS](#playground-css-column-vars)*

```html
<div class="mb-4 columns-[var(--article-column-width)] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="mb-4 rounded bg-blue-200 p-3">Column width controlled by a CSS variable</div>
  <div class="mb-4 rounded bg-red-200 p-3">
    Dynamic column sizing based on CSS custom properties
  </div>
</div>

<div class="columns-(--another-width-var) gap-4 rounded-lg bg-gray-100 p-4">
  <div class="mb-4 rounded bg-green-200 p-3">Another way to use a CSS variable</div>
  <div class="mb-4 rounded bg-yellow-200 p-3">Shorthand syntax for custom properties</div>
</div>
```

يتيح ذلك تحكمًا متقدّمًا، مثل ضبط عروض الأعمدة بناءً على قيم السمة.

## التخطيطات متعددة الأعمدة المستجيبة

تعمل قدرات التصميم المستجيب في Tailwind مع أدوات الأعمدة المتعددة عبر الصيغ الخاصة بنقاط التوقف المحدّدة.

طبّق أدوات `columns-*` مختلفة عند نقاط التوقف المختلفة.

*التخطيطات متعددة الأعمدة المستجيبة — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/21eebe3e49cc7ed1708fefbd8e44fd90b8513a50d042c9610274c53a5bdb5d8e.html)*

```html
<div class="columns-1 gap-4 rounded-lg bg-gray-100 p-4 sm:columns-2 md:columns-3 lg:columns-4">
  <!-- 1 column on small, 2 on medium, 3 on large, 4 on extra large screens -->
  <p class="mb-4 rounded bg-blue-200 p-3">This article layout adjusts columns by screen size.</p>
  <p class="mb-4 rounded bg-red-200 p-3">Single column on small mobile devices for readability.</p>
  <p class="mb-4 rounded bg-green-200 p-3">Transitions to multiple columns as screen widens.</p>
  <p class="mb-4 rounded bg-yellow-200 p-3">Ensures optimal reading experience across devices.</p>
  <p class="mb-4 rounded bg-purple-200 p-3">Content flows naturally across available columns.</p>
</div>
```

يبيّن هذا المثال عمودًا واحدًا يبدأ بالجوال أولًا، ويُستبدل عند نقاط التوقف `sm` و`md` و`lg`.

## تخصيص إعدادات الأعمدة المتعددة

تستخدم Tailwind تهيئة قائمة على CSS أولًا عبر التوجيه `@theme`. خصّص عروض الأعمدة المُعرَّفة مسبقًا (`columns-xs` إلى `columns-7xl`) أو أضف عروضًا جديدة بتعريف متغيّرات CSS داخل `@theme`. وهذه تُطابِق نطاق `--container-*`.

```css
/* In your main CSS file */
@import 'tailwindcss';

@theme {
  /* Extend default container widths */
  --container-8xl: 90rem; /* New larger width */

  /* Override default container widths */
  --container-sm: 20rem; /* Make 'sm' columns narrower */

  /* Define a custom column width */
  --article-column-width: 350px;
}
```

ستصبح أداة `columns-8xl` الجديدة متاحة، وسيستخدم `columns-sm` القيمة المحدّثة. واستخدم `--article-column-width` مع `columns-[var(--article-column-width)]`.

استبدل القيم الافتراضية أو عطّلها بضبطها على `initial` داخل `@theme`.

## تحسينات Tailwind 4

تستفيد أدوات الأعمدة المتعددة من تحسينات Tailwind 4:

- يقدّم محرّك Oxide المبنيّ على Rust عمليات بناء أسرع.
- يجعل اكتشاف المحتوى بلا إعداد العملية أكثر بساطة.
- التهيئة القائمة على CSS أولًا عبر `@theme` أكثر أصالة.

- القيم العشوائية لمتغيّرات CSS تستخدم أحيانًا صيغة `-(...)`، مع بقاء `[<value>]` هي الأساسية.

## الخاتمة

يبسّط Tailwind CSS التخطيطات متعددة الأعمدة المستجيبة عبر أدوات `columns` و`gap`. وهو يدعم الأعمدة الثابتة أو القائمة على العرض والتعديلات المستجيبة. وتوفّر القيم العشوائية والتهيئة القائمة على CSS أولًا في Tailwind 4 مرونة إضافية.
