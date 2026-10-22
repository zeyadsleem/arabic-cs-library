---
title: "إنشاء جدول فاتورة"
---

لنبدأ ببنية HTML الأساسية وجدول فاتورة يحتوي على بنود.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e9be7cf8e8dce3a743460da828e1b665955d2ace4db2bcb480f9ce569aae3d3a.html)*

```html
<div>
  <div>
    <div>Description</div>
    <div>Qty</div>
    <div>Rate</div>
    <div>Amount</div>
  </div>
  <div>
    <div>Website Design</div>
    <div>1</div>
    <div>$2,500.00</div>
    <div>$2,500.00</div>
  </div>
  <div>
    <div>Logo Design</div>
    <div>1</div>
    <div>$800.00</div>
    <div>$800.00</div>
  </div>
  <div>
    <div>Content Writing</div>
    <div>5</div>
    <div>$150.00</div>
    <div>$750.00</div>
  </div>
</div>
```

هذه بنية جدول فاتورة أساسية، لكن الأعمدة غير محاذاة ولا توجد تسلسل بصري واضح. لنحوّلها إلى جدول فاتورة احترافي تتشارك فيه الترويسة والصفوف مسارات أعمدة محاذاة تمامًا، ويتكيّف فيه المكوّن بالكامل بذكاء مع حجم حاويته.

## تهيئة سياق استعلامات الحاوية

أولًا، لنؤسّس حاويتنا كسياق استعلامات، وننشئ أساس CSS Grid، انطلاقًا مما تعلّمناه في [دليل بطاقة الإحصاءات](https://stevekinney.com/courses/tailwind/building-a-statistics-card).

*تهيئة سياق استعلامات الحاوية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5248709ba7e0b4fe92778f03caf0d3415bdb4006b651c6d185061316759b42c9.html)*

```html
<div class="@container">
  <div class="grid grid-cols-[1fr_auto_auto_auto] gap-x-4">
    <div class="contents">
      <div>Description</div>
      <div>Qty</div>
      <div>Rate</div>
      <div>Amount</div>
    </div>
    <div class="contents">
      <div>Website Design</div>
      <div>1</div>
      <div>$2,500.00</div>
      <div>$2,500.00</div>
    </div>
    <div class="contents">
      <div>Logo Design</div>
      <div>1</div>
      <div>$800.00</div>
      <div>$800.00</div>
    </div>
    <div class="contents">
      <div>Content Writing</div>
      <div>5</div>
      <div>$150.00</div>
      <div>$750.00</div>
    </div>
  </div>
</div>
```

التهيئة الأساسية:

- `@container`: تجعل هذا العنصر سياقًا لاستعلامات الحاوية — فيستطيع عناصره الاستجابة لحجم هذه الحاوية
- `grid grid-cols-[1fr_auto_auto_auto]`: تنشئ شبكة من أربعة أعمدة، يأخذ فيها عمود الوصف المساحة المتاحة بينما يتكيّف بقية الأعمدة مع محتواها
- `gap-x-4`: تضيف مسافة أفقية قدرها 16px بين الأعمدة لتسهيل القراءة
- `contents`: تجعل div الصفوف «شفافة» أمام الشبكة، فيصبح أبناؤها عناصر grid مباشرة

أداة `contents` هي المفتاح هنا — فهي تزيل عناصر الغلاف من التخطيط المرئي مع إبقائها في HTML لأجل البنية الدلالية.

## تقديم CSS Subgrid

الآن يأتي السحر — لنستخدم CSS Subgrid لضمان محاذاة مثالية بين الترويسة وصفوف البيانات، مع إضافة تسلسل بصري صحيح.

*تقديم CSS Subgrid — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c603cc2af10f38cce7b9d6939e3af83c209b76ada0d7e6a7ea6961ee3037a2c9.html)*

```html
<div class="@container">
  <div class="grid grid-cols-[1fr_auto_auto_auto] gap-x-4">
    <div class="col-span-4 grid grid-cols-subgrid border-b border-slate-200 pb-2">
      <div class="text-sm font-semibold text-slate-900">Description</div>
      <div class="text-sm font-semibold text-slate-900">Qty</div>
      <div class="text-sm font-semibold text-slate-900">Rate</div>
      <div class="text-right text-sm font-semibold text-slate-900">Amount</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3">
      <div class="text-slate-900">Website Design</div>
      <div class="text-slate-900">1</div>
      <div class="text-slate-900">$2,500.00</div>
      <div class="text-right font-medium text-slate-900">$2,500.00</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3">
      <div class="text-slate-900">Logo Design</div>
      <div class="text-slate-900">1</div>
      <div class="text-slate-900">$800.00</div>
      <div class="text-right font-medium text-slate-900">$800.00</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3">
      <div class="text-slate-900">Content Writing</div>
      <div class="text-slate-900">5</div>
      <div class="text-slate-900">$150.00</div>
      <div class="text-right font-medium text-slate-900">$750.00</div>
    </div>
  </div>
</div>
```

تطبيق Subgrid:

- `col-span-4`: يمتدّ كل صف عبر الأعمدة الأربعة لشبكة الأم
- `grid grid-cols-subgrid`: تنشئ شبكة فرعية ترث مسارات الأعمدة نفسها تمامًا من الأم — وهذا يضمن المحاذاة المثالية
- تنسيق الترويسة بـ `font-semibold` مع حدّ سفلي يفصلها
- `text-right` على أعمدة المبالغ من أجل تنسيق مالي صحيح
- `py-3`: حشو رأسي قدره 12px ينتج ارتفاع صف مريح

يضمن CSS Subgrid أن الأعمدة ستظل محاذاة تمامًا بين الترويسة والصفوف مهما تغيّر المحتوى.

## إضافة طباعة متجاوبة مع الحاوية

لنجعل الجدول يتكيّف طباعته ومسافاته بحسب حجم الحاوية، لنحصل على تجربة أكثر أناقة في المساحات الأكبر.

*إضافة طباعة متجاوبة مع الحاوية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e125090066f0790be3839a0c3961952236fed784d40df0aab0b93c722f5866d5.html)*

```html
<div class="@container">
  <div class="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 @lg:gap-x-6">
    <div class="col-span-4 grid grid-cols-subgrid border-b border-slate-200 pb-2 @lg:pb-3">
      <div class="text-sm font-semibold text-slate-900 @lg:text-base">Description</div>
      <div class="text-sm font-semibold text-slate-900 @lg:text-base">Qty</div>
      <div class="text-sm font-semibold text-slate-900 @lg:text-base">Rate</div>
      <div class="text-right text-sm font-semibold text-slate-900 @lg:text-base">Amount</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3 @lg:py-4">
      <div class="text-slate-900 @lg:text-lg">Website Design</div>
      <div class="text-slate-900 @lg:text-lg">1</div>
      <div class="text-slate-900 @lg:text-lg">$2,500.00</div>
      <div class="text-right font-medium text-slate-900 @lg:text-lg">$2,500.00</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3 @lg:py-4">
      <div class="text-slate-900 @lg:text-lg">Logo Design</div>
      <div class="text-slate-900 @lg:text-lg">1</div>
      <div class="text-slate-900 @lg:text-lg">$800.00</div>
      <div class="text-right font-medium text-slate-900 @lg:text-lg">$800.00</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3 @lg:py-4">
      <div class="text-slate-900 @lg:text-lg">Content Writing</div>
      <div class="text-slate-900 @lg:text-lg">5</div>
      <div class="text-slate-900 @lg:text-lg">$150.00</div>
      <div class="text-right font-medium text-slate-900 @lg:text-lg">$750.00</div>
    </div>
  </div>
</div>
```

تحسينات متجاوبة مع الحاوية:

- `@lg:gap-x-6`: تزيد فجوات الأعمدة إلى 24px عندما تكون الحاوية كبيرة (512px فأكثر)
- `@lg:text-base` على الترويسات: حجم خط أكبر قدره 16px للترويسات في التخطيطات الواسعة
- `@lg:text-lg` على البيانات: خط أكبر قدره 18px لقراءة أفضل في الحاويات العريضة
- `@lg:py-4`: حشو رأسي أوسع قدره 16px عندما تسمح المساحة بذلك

يصبح الجدول تلقائيًا أكثر راحة وأسهل قراءة عند وضعه في حاويات أكبر، مع بقائه مضغوطًا في المساحات المحدودة.

## إضافة خلفيات متناوبة للصفوف

لنضف خلفيات متناوبة واحترافية للصفوف باستخدام المُحدِّد `even:` لتحسين قابلية المسح عبر الجداول العريضة.

*إضافة خلفيات متناوبة للصفوف — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9a4eb42a65e64e763a062c77fcc96354a687fd2e18173b4dde3b37609868e6e0.html)*

```html
<div class="@container">
  <div class="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 @lg:gap-x-6">
    <div class="col-span-4 grid grid-cols-subgrid border-b border-slate-200 pb-2 @lg:pb-3">
      <div class="text-sm font-semibold text-slate-900 @lg:text-base">Description</div>
      <div class="text-sm font-semibold text-slate-900 @lg:text-base">Qty</div>
      <div class="text-sm font-semibold text-slate-900 @lg:text-base">Rate</div>
      <div class="text-right text-sm font-semibold text-slate-900 @lg:text-base">Amount</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3 even:bg-slate-50 @lg:py-4">
      <div class="text-slate-900 @lg:text-lg">Website Design</div>
      <div class="text-slate-900 @lg:text-lg">1</div>
      <div class="text-slate-900 @lg:text-lg">$2,500.00</div>
      <div class="text-right font-medium text-slate-900 @lg:text-lg">$2,500.00</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3 even:bg-slate-50 @lg:py-4">
      <div class="text-slate-900 @lg:text-lg">Logo Design</div>
      <div class="text-slate-900 @lg:text-lg">1</div>
      <div class="text-slate-900 @lg:text-lg">$800.00</div>
      <div class="text-right font-medium text-slate-900 @lg:text-lg">$800.00</div>
    </div>
    <div class="col-span-4 grid grid-cols-subgrid py-3 even:bg-slate-50 @lg:py-4">
      <div class="text-slate-900 @lg:text-lg">Content Writing</div>
      <div class="text-slate-900 @lg:text-lg">5</div>
      <div class="text-slate-900 @lg:text-lg">$150.00</div>
      <div class="text-right font-medium text-slate-900 @lg:text-lg">$750.00</div>
    </div>
  </div>
</div>
```

تحسين تنسيق الصفوف:

- `even:bg-slate-50`: تضيف خلفية رمادية خفيفة لكل صف برقم زوجي (الثاني والرابع وما إلى ذلك)

ينشئ هذا النمط الكلاسيكي المعروف بـ«الشرائط المتناوبة» الذي يساعد المستخدمين على تتبّع الصفوف في الجداول العريضة. وتعمل الخلفيات المتناوبة تلقائيًا مهما أضفت أو حذفت صفوفًا.

## إضافة اللمسات الأخيرة وقسم الإجماليات

أخيرًا، لنضف قسم الإجماليات ولمسات احترافية لإكمال جدول الفاتورة.

*إضافة اللمسات الأخيرة وقسم الإجماليات — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/35aada05bb7ff32d3137768b9c278960e85678be3e937ea56ae9ec3a9ff9dcce.html)*

```html
<div class="@container">
  <div class="rounded-lg border border-slate-200 bg-white p-4 @lg:p-6">
    <div class="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 @lg:gap-x-6">
      <div class="col-span-4 grid grid-cols-subgrid border-b border-slate-200 pb-2 @lg:pb-3">
        <div class="text-sm font-semibold text-slate-900 @lg:text-base">Description</div>
        <div class="text-sm font-semibold text-slate-900 @lg:text-base">Qty</div>
        <div class="text-sm font-semibold text-slate-900 @lg:text-base">Rate</div>
        <div class="text-right text-sm font-semibold text-slate-900 @lg:text-base">Amount</div>
      </div>
      <div class="col-span-4 grid grid-cols-subgrid py-3 even:bg-slate-50 @lg:py-4">
        <div class="text-slate-900 @lg:text-lg">Website Design</div>
        <div class="text-slate-900 @lg:text-lg">1</div>
        <div class="text-slate-900 @lg:text-lg">$2,500.00</div>
        <div class="text-right font-medium text-slate-900 @lg:text-lg">$2,500.00</div>
      </div>
      <div class="col-span-4 grid grid-cols-subgrid py-3 even:bg-slate-50 @lg:py-4">
        <div class="text-slate-900 @lg:text-lg">Logo Design</div>
        <div class="text-slate-900 @lg:text-lg">1</div>
        <div class="text-slate-900 @lg:text-lg">$800.00</div>
        <div class="text-right font-medium text-slate-900 @lg:text-lg">$800.00</div>
      </div>
      <div class="col-span-4 grid grid-cols-subgrid py-3 even:bg-slate-50 @lg:py-4">
        <div class="text-slate-900 @lg:text-lg">Content Writing</div>
        <div class="text-slate-900 @lg:text-lg">5</div>
        <div class="text-slate-900 @lg:text-lg">$150.00</div>
        <div class="text-right font-medium text-slate-900 @lg:text-lg">$750.00</div>
      </div>
      <div class="col-span-4 grid grid-cols-subgrid border-t border-slate-200 pt-3 @lg:pt-4">
        <div></div>
        <div></div>
        <div class="text-sm font-semibold text-slate-900 @lg:text-base">Total:</div>
        <div class="text-right text-lg font-bold text-slate-900 @lg:text-xl">$4,050.00</div>
      </div>
    </div>
  </div>
</div>
```

الإضافات النهائية:

- `rounded-lg border border-slate-200 bg-white`: تلتفّ الجدول كاملًا داخل حاوية بطاقة احترافية
- `p-4 @lg:p-6`: حشو الحاوية ينمو مع المساحة المتاحة
- صف الإجماليات بـ `border-t border-slate-200`: فصل واضح عن بنود الفاتورة
- `text-lg font-bold @lg:text-xl`: إجمالي بارز يتكيّف مع حجم الحاوية
- الخلايا الفارغة في صف الإجماليات تحافظ على محاذاة الأعمدة المثالية عبر subgrid

## لماذا هذا النهج ثوري

يُظهر جدول الفاتورة هذا ذروة تقنيات تخطيط CSS الحديثة وهي تعمل بانسجام:

**سحر CSS Subgrid**: تتشارك الترويسة وكل صف مسارات الأعمدة نفسها تمامًا. فإذا غيّرت محتوى أي خلية، تتكيّف بقية الصفوف تلقائيًا للحفاظ على محاذاة مثالية. ولا حاجة إلى أي حسابات يدوية لعرض الأعمدة.

**ذكاء استعلامات الحاوية**: يتكيّف الجدول مع حاويته لا مع نافذة العرض. فسواء كان في شريط جانبي ضيّق أو في منطقة المحتوى الرئيسية أو في لوحة تحكم بعرض كامل، سيبدو متناسبًا ومقروءًا دائمًا.

**أساس دلالي**: على الرغم من تعقيد التخطيط، يبقى HTML نظيفًا ومتاحًا. فقارئات الشاشة تفهم بنية الجدول تمامًا.

**فوائد الصيانة**: إضافة صفوف أو أعمدة جديدة لا تتطلّب أي إعادة حساب للتخطيط — فالشبكة الفرعية تحافظ على المحاذاة تلقائيًا، واستعلامات الحاوية تتولّى السلوك المتجاوب.

**الأداء**: كل ذلك مدفوع بـ CSS بلا أي JavaScript، فيكون خفيفًا وسريعًا مع سلوك متكيّف متقدّم.

## التطبيقات في العالم الحقيقي

يحلّ هذا النمط مشكلات شائعة في:

- **التطبيقات المالية**: جداول الفواتير وتقارير المصروفات وجداول التسعير
- **لوحات بيانات التحليلات**: جداول تحليلية تحتاج إلى ملاءمة مقاسات الأدوات المختلفة
- **واجهات الإدارة**: جداول المستخدمين وكتالوجات المنتجات وإدارة الطلبات
- **إدارة المحتوى**: قوائم المنشورات ومكتبات الوسائط وأي بيانات جدولية

ينشئ الجمع بين الشبكة الفرعية واستعلامات الحاوية مكوّنات نمطية حقيقية تعمل في أي مكان من تطبيقك دون تعديل.

## التحدّيات

جرّب بناء هذه الأنماط:

1. **بنود فاتورة قابلة للتوسيع**: أضف أوصافًا تفصيلية لبنود الفاتورة تظهر وتختفي باستخدام التقنيات من [دليل تفاصيل القوائم القابلة للطي](https://stevekinney.com/courses/tailwind/building-details-disclosure)، مع الحفاظ على محاذاة الشبكة الفرعية
2. **جدول متعدد الأقسام**: أنشئ أقسامًا لـ«خدمات التصميم» و«خدمات التطوير» بعناوين فرعية تمتدّ عبر كل الأعمدة، لتُظهر كيف تتعامل الشبكة الفرعية مع بنى الجداول المعقّدة
