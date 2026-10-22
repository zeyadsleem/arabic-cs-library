---
title: "بناء قائمة تحقّق تفاعلية"
---

لنبدأ ببنية HTML الأساسية لعنصر قائمة تحقّق بسيط.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9629ba9390300e7ba99cc08ad4ed9efdc0aaeff3084c929575062c9d9e494078.html)*

```html
<div>
  <input type="checkbox" id="task-1" />
  <label for="task-1">Complete the project documentation</label>
</div>
```

إنه مربع اختيار وتسمية أساسيان، لكن لا توجد تغذية بصرية عندما تكتمل المهمة. لنحوّله إلى عنصر قائمة تحقّق ذكي يشطب النص تلقائيًا عند تحديد مربع الاختيار.

## إضافة البنية والتخطيط

أولًا، لنؤسس تخطيطًا وتباعدًا مناسبين باستخدام flexbox لمحاذاة مربع الاختيار والنص.

*إضافة البنية والتخطيط — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/202e6c85f38973e7566e0f47848e6ccd21d1d062e43d5ed6373fc747e4b7c3d1.html)*

```html
<div class="flex items-center gap-3 p-3">
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300" />
  <label for="task-1" class="text-slate-900">Complete the project documentation</label>
</div>
```

تحسينات التخطيط:

- `flex items-center gap-3`: يحاذي مربع الاختيار والتسمية أفقيًا بمسافة 12px
- `p-3`: يضيف حشوًا بسماكة 12px حول العنصر كله لأهداف لمس مريحة
- `h-4 w-4`: يضبط مربع الاختيار على مربع بحجم 16px لتناسب الأبعاد
- `rounded border-slate-300`: يلطّف زوايا مربع الاختيار ويضيف حدًا خفيفًا
- `text-slate-900`: لون نص عالي التباين للقراءة

ينشئ هذا أساسًا نظيفًا وسهل الوصول مع تباعد ومحاذاة مناسبين.

## تقديم محدّد :has()

الآن يأتي السحر — لنستخدم محدّد `:has()` في Tailwind لشطب النص تلقائيًا عند تحديد مربع الاختيار.

*تقديم محدّد :has() — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a7bb3247e0673b75fed4173cd4369530874674b9da0547cea0c4cee11081dac9.html)*

```html
<div
  class="flex items-center gap-3 p-3 has-[input:checked]:text-slate-500 has-[input:checked]:line-through"
>
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300" />
  <label for="task-1" class="text-slate-900">Complete the project documentation</label>
</div>
```

سحر محدّد `:has()`:

- `has-[input:checked]:text-slate-500`: يغيّر لون النص إلى رمادي باهت عندما تحتوي الحاوية على حقل إدخال محدَّد تابع
- `has-[input:checked]:line-through`: يضيف زخرفة الشطب عندما تحتوي الحاوية على حقل إدخال محدَّد تابع

أدوات `has-[input:checked]:*` هي طريقة Tailwind لاستخدام الفئة الزائفة `:has()` في CSS. هذا يعني «طبّق هذه الأنماط على الحاوية عندما تحتوي على عنصر إدخال محدَّد». دون حاجة إلى JavaScript!

## إضافة انتقالات سلسة

لنضف انتقالات تجعل حالة الإكمال تبدو مصقولة ومُرضية.

*إضافة انتقالات سلسة — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1a7a65e2ba728d0dcc83ac659f4cf4ded69996f5731687b0b105d56c18cc56f6.html)*

```html
<div
  class="flex items-center gap-3 p-3 transition-all duration-300 has-[input:checked]:text-slate-500 has-[input:checked]:line-through"
>
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300" />
  <label for="task-1" class="text-slate-900">Complete the project documentation</label>
</div>
```

تحسينات الحركة:

- `transition-all duration-300`: يحرّك تغييرات اللون وزخرفة النص معًا بسلاسة خلال 300ms
- يجعل الانتقال تحديد المهمة وإلغاء تحديدها أكثر استجابة ومتعة

مدة 300ms توفّر توازنًا جيدًا — سريعة بما يكفي لتبدو فورية، وبطيئة بما يكفي لرؤية التغيير البصري يحدث.

## تنسيق معزّز وصقل

أخيرًا، لنضف بعض التحسينات ليبدو عنصر قائمة التحقّق أكثر تميّزًا وتفاعلية.

*تنسيق معزّز وصقل — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e4a2a2e0da4e73677765ca57d723f3d61366a1a721a5de38b5678656bcaa7e05.html)*

```html
<div
  class="flex items-center gap-3 rounded-md p-3 transition-all duration-300 hover:bg-slate-50 has-[input:checked]:text-slate-500 has-[input:checked]:line-through"
>
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300 text-blue-600" />
  <label for="task-1" class="cursor-pointer text-slate-900"
    >Complete the project documentation</label
  >
</div>
```

تحسينات الصقل:

- `rounded-md`: الزوايا الناعمة تجعل العنصر يبدو أكثر حداثة
- `hover:bg-slate-50`: تغيير خفيف في الخلفية عند التحويم يوفّر تغذية تفاعلية
- `text-blue-600` على مربع الاختيار: لون العلامة عند التحديد (الدعم يعتمد على المتصفح)
- `cursor-pointer` على التسمية: يوضّح أن النص قابل للنقر
- يحرّك `transition-all` الآن أيضًا تغيير لون الخلفية

تحوّل هذه اللمسات الصغيرة عنصر تحكم نموذج أساسي إلى عنصر واجهة مصقول يبدو متكاملًا واحترافيًا.

## لماذا محدّد :has() قوي

يمثّل محدّد `:has()` تحولًا جوهريًا في CSS — فهو يسمح للعناصر الأب بتنسيق نفسها بناءً على حالة أبنائها. ينشئ هذا سلوكًا أكثر بداهة للمكوّنات، حيث يستجيب عنصر قائمة التحقّق كله لحالة مربع الاختيار، لا مربع الاختيار وحده.

**النهج التقليدي**: كنت تحتاج إلى JavaScript لإضافة الأصناف وإزالتها عند تغيّر مربع الاختيار.

**مع :has()**: يحدث التنسيق تلقائيًا عبر CSS خالص، ما يجعل المكوّن أكثر كفاءة وأسهل صيانة.

**إمكانية الوصول**: بما أننا نستخدم مربع اختيار وتسمية حقيقيين، فإن قارئات الشاشة والتنقل بلوحة المفاتيح يعملان بشكل ممتاز — والتحسينات البصرية لا تمس الأساس الدلالي.

## تحديات

جرّب بناء هذه الاختلافات:

1. **قائمة متعددة العناصر**: أنشئ قائمة رأسية من 3-4 عناصر قائمة تحقّق باستخدام الأنماط أعلاه، مع تباعد مناسب بين العناصر
2. **مؤشرات الأولوية**: أضف نقاطًا ملوّنة أو شارات قبل النص تبهت أيضًا عند اكتمال العنصر باستخدام `has-[input:checked]:opacity-30`
