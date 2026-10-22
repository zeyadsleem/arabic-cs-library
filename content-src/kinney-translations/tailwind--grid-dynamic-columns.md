---
title: "الأعمدة الديناميكية"
---

يبسّط Tailwind CSS العمل مع الأعمدة الديناميكية، وخاصة مع الشبكات الفرعية، باستخدام أدواته الخاصة بـ grid.

تتيح ميزات CSS الحديثة مثل `subgrid` تصميمات متجاوبة ومعقّدة داخل HTML. ويجعل نهج Tailwind القائم على «الأدوات أولًا» مفاهيم CSS Grid المعقّدة سهلة الاستخدام.

## تطبيق الشبكات الفرعية للأعمدة

تُعدّ قيمة `subgrid` الخاصة بـ `grid-template-columns` مفتاحًا للتخطيطات المتداخلة المحاذاة. ويوفّر Tailwind هذه القيمة عبر `grid-cols-subgrid`.

تطبيق `grid-cols-subgrid` على عنصر grid (وهو أيضًا حاوية grid) تخبر الشبكة الابنة أن تتبنّى مسارات أعمدة أبيها بدلًا من تعريف مساراتها الخاصة. وهذا جوهري للحفاظ على المحاذاة عبر العناصر المتداخلة.

### كيف يعمل `grid-cols-subgrid`

تخيّل تخطيطًا رئيسيًا بشبكة أعمدة محدّدة. فالعنصر الموجود داخل خلية من هذه الشبكة الرئيسية يحتاج إلى أعمدة خاصة به محاذاة تمامًا لأعمدة الأب. وبدون `subgrid`، فإن مطابقة أعمدة الشبكة الابنة مع الأب يدويًا عرضة للخطأ، خاصةً في التصاميم المتجاوبة.

تجعل `grid-cols-subgrid` حاوية الشبكة الابنة ترث بنية أعمدة أبيها. بعدها يمكن لأبناء حاوية الشبكة الفرعية هذه استخدام سطور أعمدة الشبكة الأم في الوضع والتمدّد.

مثال:

*كيف يعمل grid-cols-subgrid — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/cb638477b94ae3320960712716e476b2f345cd6ad99789d8e1d6c711cfd9b6e7.html)*

```html
<div class="grid grid-cols-12 gap-4 rounded-lg bg-gray-100 p-4">
  <!-- Parent container: 12-column grid -->
  <div class="col-span-full grid grid-cols-subgrid gap-4">
    <!-- Child item: spans all parent columns, becomes a subgrid -->
    <div class="col-span-4 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">
      Item 1 (spans parent cols 1-4)
    </div>
    <div class="col-span-4 flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">
      Item 2 (spans parent cols 5-8)
    </div>
    <div class="col-span-4 flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">
      Item 3 (spans parent cols 9-12)
    </div>
  </div>
  <div class="col-span-4 flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">
    Another parent grid item (spans cols 1-4)
  </div>
  <div class="col-span-8 flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">
    Another parent grid item (spans cols 5-12)
  </div>
</div>
```

الـ `div` الحامل لـ `col-span-full grid grid-cols-subgrid gap-4` هو ابن لـ `grid grid-cols-12` الرئيسية. وهو يمتدّ عبر أعمدة الأب الاثني عشر جميعًا. وبفضل `grid grid-cols-subgrid`، يستخدم تخطيطه الداخلي مسارات الأعمدة الاثني عشر والفجوة نفسها التي لدى الأب. وتستخدم عناصره (`Item 1` و`Item 2` و`Item 3`) قيمة `col-span-4` نسبةً إلى البنية الموروثة ذات الأعمدة الاثني عشر، مما يضمن محاذاة مثالية مع شبكة الأب. وهذا مفيد للمكوّنات المتداخلة التي تحتاج إلى محاذاة بصرية مع شبكة الصفحة ككل.

### الشبكات الفرعية والمحتوى الديناميكي

يشير جانب «الديناميكي» غالبًا إلى محتوى الشبكة الفرعية لا إلى تعريفها. فإذا كانت العناصر داخل الشبكة الفرعية ديناميكية (مثلًا قادمة من API أو معروضة بشكل شرطي)، فإن `grid-cols-subgrid` تضمن محاذاتها مع مسارات أعمدة الأب. وتبقى بنية التخطيط (سطور الأعمدة) ثابتة وموروثة، ما يُبسّط إدارة الواجهات الديناميكية.

وبينما ترث `grid-cols-subgrid` مسارات الأب، يتيح Tailwind أيضًا تعريف مسارات أعمدة ديناميكية على حاوية grid باستخدام القيم التعسّفية: `grid-cols-[<value>]` أو `grid-cols-(<custom-property>)`. فمثلًا `grid-cols-[200px_1fr_200px]` أو `grid-cols-(--my-layout-cols)`. ويمنح هذا مرونة في تعريفات grid الديناميكية حين لا تكون `subgrid` مطلوبة (أي حين لا نحتاج إلى الوراثة بل إلى مقاسات مسارات غير قياسية أو ديناميكية). ومع ذلك، للمحاذاة المتداخلة الصارمة، تظل `grid-cols-subgrid` هي الخيار.

وباختصار، `grid-cols-subgrid` هي أداة Tailwind لخاصية CSS `subgrid` على `grid-template-columns`، وتتيح للشبكات المتداخلة وراثة مسارات أعمدة الأب وتحقيق محاذاة دقيقة. وهذا حاسم في التخطيطات المعقّدة ذات المحتوى الديناميكي مع الحفاظ على بنية grid متّسقة.
