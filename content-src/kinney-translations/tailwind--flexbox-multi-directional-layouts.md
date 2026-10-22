---
title: "التخطيطات متعددة الاتجاهات"
---

تكييف التخطيطات مع اتجاهات نصّ متعدّدة (LTR وRTL) أمر بالغ الأهمية لتطبيقات الويب العالمية. وCSS التقليدية، بخصائصها المادية مثل `left` و`right`، تجعل هذا معقّدًا. أما Tailwind 4 فيستخدم خصائص CSS المنطقية الحديثة والمتغيّرات الاتجاهية لتخطيطات متعددة الاتجاهات أكثر بديهية. وبينما يرتّب Flexbox العناصر، يعتمد Tailwind في معالجة الاتجاهية على هذه الخصائص المنطقية والمتغيّرات، وهي قابلة للتطبيق داخل أي تخطيط، بما في ذلك Flexbox.

## تحدّي الاتجاهية

خصائص CSS التقليدية مثل `margin-left` خصائص مادية. في LTR تضيف `margin-left` مسافة. أما في RTL فتحتاج إلى `margin-right` مع إعادة ضبط `margin-left`، مما يقود إلى شيفرة مكرّرة ومعقّدة.

## تبنّي الخصائص المنطقية

تتكيّف خصائص CSS المنطقية الحديثة مع نمط الكتابة واتجاه النص. فبدلًا من `margin-left` و`margin-right`، استخدم `margin-inline-start` و`margin-inline-end`. و`margin-inline-start` هي حيث يبدأ المحتوى السطري (اليسار في LTR، واليمين في RTL)، و`margin-inline-end` هي حيث ينتهي. ومن الخصائص المنطقية المشابهة `padding-inline-start` و`border-inline-end` و`float: inline-start` و`clear: inline-end`.

يستخدم Tailwind CSS هذه الخصائص المنطقية في الأدوات التي تتكيّف تلقائيًا مع اتجاه النص.

## أدوات Tailwind الاتجاهية ومتغيّراتها

يدير Tailwind الاتجاهية عبر:

1. متغيّرات محدّدة (`ltr:` و`rtl:`) للتنسيق الشرطي.
2. أدوات تقابل الخصائص المنطقية.

### المتغيّرات الاتجاهية: `ltr:` و`rtl:`

طبّق أي أداة بشكل مشروط بحسب اتجاه النص باستخدام متغيّري `ltr:` و`rtl:`، على نحو مشابه للمتغيّرات المتجاوبة (`md:`) أو متغيّرات الحالة (`hover:`).

*المتغيّرات الاتجاهية: ltr: و rtl: — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/13ef50714bfcb92fa53b3665639210879e18b4651cfefcecf5eac148afc3b109.html)*

```html
<div dir="ltr" class="mb-4 rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-blue-500 p-4 text-left text-white rtl:text-right">Item 1</div>
</div>

<div dir="rtl" class="rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-green-500 p-4 text-left text-white rtl:text-right">Item 2</div>
</div>
```

تُطبَّق `text-left` افتراضيًا. وإذا كانت `dir="rtl"` فإن `rtl:text-right` تتجاوزها.

### أدوات الخصائص المنطقية

أدوات Tailwind المقابلة لخصائص CSS المنطقية تُنتج تلقائيًا الخاصية المادية الصحيحة بحسب اتجاه النص (غالبًا من خاصية `dir`).

الإقرانات الشائعة:

- **هامش سطري:** `ms-*` (`margin-inline-start`)، و`me-*` (`margin-inline-end`). وتُقابل `mx-*` قيمة `margin-inline` (كلا الجانبين). و`ms-4` تعني `margin-left` في LTR و`margin-right` في RTL. و`me-4` تعني `margin-right` في LTR و`margin-left` في RTL.
  - `ms-4`: `margin-left` في LTR، و`margin-right` في RTL.
  - `me-4`: `margin-right` في LTR، و`margin-left` في RTL.
- **المسافة بين الأبناء:** تستخدم أدوات `space-x-*` قِيَم `margin-inline-start` و`margin-inline-end` للمسافات الأفقية، فتتكيّف مع الاتجاه. و`space-x-reverse` تعكس ذلك.
- **حشو سطري:** `ps-*` (`padding-inline-start`)، و`pe-*` (`padding-inline-end`). وتُقابل `px-*` قيمة `padding-inline`. و`ps-4` تعني `padding-left` في LTR و`padding-right` في RTL. و`pe-4` تعني `padding-right` في LTR و`padding-left` في RTL.
  - `ps-4`: `padding-left` في LTR، و`padding-right` في RTL.
  - `pe-4`: `padding-right` في LTR، و`padding-left` في RTL.
- **التمرير (float):** `float-start` (`float: inline-start`)، و`float-end` (`float: inline-end`).
- **التنظيف (clear):** `clear-start` (`clear: inline-start`)، و`clear-end` (`clear: inline-end`).
- **محاذاة النص:** `text-start` (`text-align: start`)، و`text-end` (`text-align: end`).
- **انحناء الحواف:** `rounded-s-*` و`rounded-e-*` وغيرها تستخدم الخصائص المنطقية.
- **عرض ولون ونمط الحدّ:** تستخدم `border-s-*` و`border-e-*` و`divide-s-*` و`divide-e-*` الخصائص المنطقية للحدود السطرية. وتستخدم `divide-x-*` أيضًا الخصائص المنطقية. و`divide-x-reverse` تعكس الفواصل الأفقية.
- **الإزاحة (التموضع):** `start-*` (`inset-inline-start`)، و`end-*` (`inset-inline-end`) للعناصر الموضوعة. و`start-0` يضع العنصر عند حافة البداية (اليسار في LTR، واليمين في RTL). و`end-0` يضعه عند حافة النهاية (اليمين في LTR، واليسار في RTL).
  - `start-0`: يضع العنصر عند حافة البداية (اليسار في LTR، واليمين في RTL).
  - `end-0`: يضع العنصر عند حافة النهاية (اليمين في LTR، واليسار في RTL).

(أدوات الهامش والحشو الكتلية مثل `my-*` و`py-*` تقابل `margin-block` و`padding-block` على التوالي، وهي لا تتأثر عادةً باتجاه النص LTR/RTL بل بنمطي الكتابة العموديين.)

### الدمج مع Flexbox

يتكيّف المحوران الأساسي والعرضي في Flexbox مع `flex-direction` واتجاه النص. فعند `flex-direction: row` (`flex-row`)، يكون المحور الأساسي من اليسار إلى اليمين في LTR، ومن اليمين إلى اليسار في RTL. و`justify-content: flex-start` تحاذي العناصر إلى بداية المحور الأساسي (اليسار في `flex-row` مع LTR، واليمين في `flex-row` مع RTL).

تعمل أدوات Flexbox الأساسية في Tailwind (`flex` و`flex-row` و`justify-start` وغيرها) ضمن هذا النموذج المتكيّف.

وللتجاوزات الاتجاهية المحدّدة داخل Flexbox التي لا تتناولها منطقية المحاور، استخدم متغيّرات `rtl:`/`ltr:` أو أدوات الخصائص المنطقية.

مثال: تجاوز المحاذاة الافتراضية في RTL.

*الدمج مع Flexbox — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/90bcad8b5d2ccf9c3ea03d0a87f06c9d844c4a8213516467e14478d501e7d3f5.html)*

```html
<div class="flex justify-start gap-4 rounded-lg bg-gray-100 p-6 rtl:justify-end">
  <div class="rounded-lg bg-blue-500 p-4 text-white">Item 1</div>
  <div class="rounded-lg bg-green-500 p-4 text-white">Item 2</div>
</div>
```

تُحاذى العناصر إلى `start` افتراضيًا. وفي RTL، تحاذيها `rtl:justify-end` إلى `end`.

مثال: محاذاة عنصر مفرد.

*الدمج مع Flexbox — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/989f928757cc2f3c44a837144609724bd3a7f44609f50b95613d87d3becfee37.html)*

```html
<div class="flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6">
  <div class="self-start rounded-lg bg-blue-500 p-4 text-white rtl:self-end">Item 1</div>
  <div class="self-center rounded-lg bg-green-500 p-4 text-white">Item 2</div>
  <div class="self-end rounded-lg bg-purple-500 p-4 text-white rtl:self-start">Item 3</div>
</div>
```

العنصر 1 هو `self-start` (وفي RTL: `self-end`). والعنصر 3 هو `self-end` (وفي RTL: `self-start`). والعنصر 2 هو `self-center`.

أدوات الخصائص المنطقية مثل `ms-*` و`ps-*` مفيدة للمسافات المعتمدة على الاتجاه:

*الدمج مع Flexbox — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/70a8de37c3cc878ac74898e0947be5be7ebbbb0c37dc6d9a8a2fd7cea1c1449e.html)*

```html
<div class="flex items-center gap-2 rounded-lg bg-gray-100 p-4">
  <svg class="me-2 size-6 text-blue-500">
    <rect width="24" height="24" fill="currentColor" />
  </svg>
  <span class="text-gray-800">Button Text</span>
</div>
```

تضيف `me-2` هامشًا إلى جانب «النهاية» في الأيقونة (اليمين في LTR، واليسار في RTL)، فتُنشئ مسافة بين الأيقونة والنص. (أما `rtl:ms-2` في المثال الأصلي فقد كان للتجاوزات المحدّدة إن لم تكفِ `me-2`، لكن `me-*` غالبًا تكفي.)

## الاتجاهية المتجاوبة والمكيفة بالحاوية

تنسجم متغيّرات `rtl:`/`ltr:` وأدوات الخصائص المنطقية مع المتغيّرات المتجاوبة (`sm:` و`md:`) ومتغيّرات استعلامات الحاوية (`@md:`).

*الاتجاهية المتجاوبة والمكيفة بالحاوية — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/eef75105c67deb56989369c3ec51a6cbbece6fb9b42ac12c701e9a65e0407374.html)*

```html
<div
  class="@container flex flex-col gap-4 rounded-lg bg-gray-100 p-6 @md:flex-row rtl:@md:flex-row-reverse"
>
  <div
    class="size-full min-h-[150px] rounded-lg bg-blue-500 p-4 pe-4 text-white @md:size-1/2 rtl:pe-0 rtl:@md:ps-4"
  >
    Left/Start Column
  </div>
  <div
    class="size-full min-h-[150px] rounded-lg bg-green-500 p-4 ps-4 text-white @md:size-1/2 rtl:ps-0 rtl:@md:pe-4"
  >
    Right/End Column
  </div>
</div>
```

يكدّس هذا التخطيط الأعمدة افتراضيًا. وعند حجم الحاوية `@md` يتحوّل إلى صف (`@md:flex-row`). وفي RTL عند `@md` أو أكبر، ينعكس الصف (`rtl:@md:flex-row-reverse`). ويُعدَّل الحشو باستخدام الخصائص المنطقية والمتغيّرات الاتجاهية.

## الخلاصة

في تخطيطات Flexbox متعددة الاتجاهات، يعتمد Tailwind على خصائص CSS المنطقية (`ms-*` و`pe-*` وغيرها) ومتغيّرات `rtl:`/`ltr:`. وهذه تخلق تخطيطات تتكيّف مع اتجاه النص، فتُبسّط التدويل. ومع دمجها بالتصميم المتجاوب، تتيح واجهات مستخدم متكيّفة حقًا.
