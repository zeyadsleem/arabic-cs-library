---
title: "أنماط auto-fit وauto-fill"
lang: ar
source: "https://stevekinney.com/courses/tailwind/grid-auto-fit-and-auto-fill-patterns"
---

يتيح Tailwind CSS تحكمًا دقيقًا في تخطيطات الشبكة. ورغم أن أعداد الأعمدة الثابتة (`grid-cols-4`) والشبكات الفرعية (`grid-cols-subgrid`) مفيدة، فإن بعض التصاميم تحتاج إلى شبكات تعدّل عدد الأعمدة تلقائيًا بحسب المساحة المتاحة وحجم المحتوى. وهنا تُستخدم نمطا `auto-fit` و`auto-fill` في CSS Grid.

## تحديد أحجام المسارات ديناميكيًا بـ`auto-fill` و`auto-fit`

تعرّف دالة `repeat()` في CSS Grid، مع الكلمتين المفتاحيتين `auto-fill` و`auto-fit`، قوائم مسارات ديناميكية. وبخلاف أعداد الأعمدة الثابتة (مثل `repeat(4, 1fr)`)، تنشئ هاتان الكلمتان بقدر ما يتّسع في الحاوية من أعمدة، انطلاقًا من حجم مسار محدّد.

### فهم `auto-fill` و`auto-fit`

- **`auto-fill`**: يملأ الصف بقدر ما يتّسع من أعمدة. تبقى المساحة المتبقّية فارغة، لكن المسارات تُنشأ، وقد ينتج عن ذلك أعمدة فارغة إذا لم تملأها العناصر.
- **`auto-fit`**: يشبه `auto-fill`، لكنه بعد وضع العناصر يطوي المسارات الفارغة إن تبقّى مساحة. وهذا يسمح للعناصر بالتمدد وملء عرض الحاوية، حتى مع وجود عناصر أقل من الحد الأقصى الممكن للمسارات.

يُستخدم كلاهما غالبًا مع `minmax(<min>, <max>)` لتحديد أحجام المسارات. والنمط الشائع هو `minmax(<min-width>, 1fr)`، إذ ينشئ مسارات عرضها `<min-width>` على الأقل، وهي تنمو لتتقاسم المساحة المتبقّية بالتساوي (`1fr`).

## تنفيذ auto-fit وauto-fill في Tailwind CSS

لا توفّر Tailwind أدوات مخصّصة باسم `grid-cols-auto-fit` أو `grid-cols-auto-fill`. لكنها تدعم قيم CSS المخصّصة عبر صيغة القيم العشوائية: `grid-cols-[<value>]` و`grid-rows-[<value>]`.

```css
@theme {
  --min-col-width: 200px;
  --auto-grid-cols: repeat(auto-fit, minmax(250px, 1fr));
}
```

تتيح هذه الصيغة استخدام `repeat()` الأصلية في CSS مع `auto-fill` أو `auto-fit`.

### استخدام `auto-fill`

لإنشاء شبكة تملأ المساحة بالعناصر، مع احتمال ترك مساحة فارغة:

*استخدام auto-fill — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ec1556997fec643c62c42dcdb6bd10350dd5b9a63280d7efd68e6beeded64896.html)*

```html
<div
  class="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
  <div class="rounded bg-yellow-200 p-4">Item 4</div>
  <div class="rounded bg-purple-200 p-4">Item 5</div>
</div>
```

يصبح `grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]` هو `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));`. ويكون عرض الأعمدة `200px` على الأقل، وهي تنمو لتملأ المساحة. وقد تترك العناصر الأقل من عدد الأعمدة المتّسع لها فجوات بصرية.

### استخدام `auto-fit`

للشبكات التي تتمدّد فيها العناصر لتملأ عرض الحاوية عبر طي المسارات الفارغة:

*استخدام auto-fit — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9ffc3c243e73418cc2a55e0e25101abc7aa2ee4c1a541fd7cf093d16dbe70ddf.html)*

```html
<div class="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
  <!-- If fewer items, they may span full width -->
</div>
```

يصبح `grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]` هو `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`. وإذا لم تتّسع عدد أقل من العناصر عند العرض الأدنى، فإن `auto-fit` يطوي المسارات غير المستخدمة، ما يتيح للعناصر القائمة أن تنمو. وهو مفيد للبطاقات أو المعارض المستجيبة.

### المرونة مع القيم العشوائية

عرّف قيم `minmax` بأي وحدة في CSS أو متغيّرات CSS.

*المرونة مع القيم العشوائية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b95e3ff4811bb0c88e936daa0f7ec74ac93810346a0d17c3ddd3f1e346d404ac.html)[CSS](#playground-css-grid-vars)*

```html
<div
  class="grid grid-cols-[repeat(auto-fit,_minmax(var(--min-col-width),_1fr))] gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-4">Dynamic Item 1</div>
  <div class="rounded bg-red-200 p-4">Dynamic Item 2</div>
  <div class="rounded bg-green-200 p-4">Dynamic Item 3</div>
</div>
```

يتيح هذا التحكم الديناميكي في الحد الأدنى لعرض العمود عبر متغيّرات CSS (المضبوطة في CSS أو في `@theme` الخاص بـTailwind 4+).

### القيم العشوائية والاختصار الخاص بمتغيّرات CSS

تقدّم Tailwind الاختصار `grid-cols-(<custom-property>)` للقيم العشوائية التي هي متغيّرات CSS فحسب. فإذا احتوى متغيّر CSS على دالة `repeat()` كاملة، فيمكن استخدام هذا الاختصار.

```css
/* In main CSS, potentially within @theme */
@theme {
  --auto-grid-cols: repeat(auto-fit, minmax(250px, 1fr));
}
```

*القيم العشوائية والاختصار الخاص بمتغيّرات CSS — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9c81b8417b82f54365c20909b494c5e336d708732f5c989b7df9ac005ab275ab.html)[CSS](#playground-css-grid-vars)*

```html
<div class="grid grid-cols-(--auto-grid-cols) gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">CSS Variable Item 1</div>
  <div class="rounded bg-red-200 p-4">CSS Variable Item 2</div>
  <div class="rounded bg-green-200 p-4">CSS Variable Item 3</div>
</div>
```

يعتمد هذا على وجود `--auto-grid-cols` معرَّفًا،ربما في سمة Tailwind لديك عبر `@theme`. وتصبح متغيّرات السمة متغيّرات CSS عادية.

### الدعم في المحرّر

يساعدك امتداد Tailwind CSS IntelliSense لـVS Code مع تعريفات الشبكات العشوائية المعقّدة، إذ يوفّر الإكمال التلقائي وتلوين الصياغة ومعاينات عند التحويم.

خلاصةً، ورغم أن Tailwind لا يملك أصناف `auto-fit` أو `auto-fill` صريحة، فإن صيغة القيم العشوائية في `grid-cols` و`grid-rows` تتيح استخدام أنماط CSS Grid الأصلية هذه لتخطيطات ديناميكية ومستجيبة.
