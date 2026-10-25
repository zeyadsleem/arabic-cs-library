---
title: "بناء بطاقة كشف بالعنصر details"
lang: ar
source: "https://stevekinney.com/courses/tailwind/building-details-disclosure"
---

لنبدأ ببنية HTML الأساسية لمكوّن كشف بسيط.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f5bffbbd5dee55f42bccc5dbc1a596cbbbcc55b3909ec86cdf9f6efdfe330c6c.html)*

```html
<details>
  <summary>What are your shipping options?</summary>
  <div>
    <p>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

إنه عنصر `<details>` دلالي مع `<summary>` يستطيع المستخدمون النقر عليه لكشف المحتوى. يوفّر المتصفح الوظيفة الأساسية، لكن المظهر بسيط جدًا. لنحوّله إلى مكوّن كشف مصقول يقدّم تغذية بصرية واضحة عند التوسّع.

## إضافة البنية والتخطيط

أولًا، لنرسِ تباعدًا وتسلسلًا بصريًا سليمين لمكوّن الكشف.

*إضافة البنية والتخطيط — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e1815a305b148f0daa13391ed9ba9930368cb250ee5337c8f0fd2af16712343c.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary class="cursor-pointer font-medium text-slate-900">
    What are your shipping options?
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

تحسينات التخطيط:

- `rounded-lg border border-slate-200`: ينشئ حاوية خفيفة بزوايا ناعمة وحد فاتح
- `p-4`: يضيف حشوة 16px حول المكوّن كله لتباعد مريح
- `cursor-pointer`: يوضّح أن الملخّص قابل للنقر
- `font-medium text-slate-900`: وزن متوسط وتباين عالٍ لنص الملخّص
- `mt-3`: يضيف تباعد 12px بين الملخّص والمحتوى عند التوسّع
- `text-slate-600`: لون هادئ قليلًا لمحتوى الكشف

هذا ينشئ أساسًا نظيفًا بتسلسل بصري سليم بين الملخّص والمحتوى.

## تقديم الصنف الزائف in-open

الآن تأتي الميزة الأساسية — لنستخدم أدوات `in-open:*` في Tailwind لتغيير لون الملخّص عندما يكون عنصر details مفتوحًا.

*تقديم الصنف الزائف in-open — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/68b0394583d23e0344e7a2382f32aabab56d7859c18f29cbda5cdb8ee9443dd5.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary class="cursor-pointer font-medium text-slate-900 in-open:text-blue-600">
    What are your shipping options?
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

سحر `in-open:*`:

- `in-open:text-blue-600`: يغيّر نص الملخّص إلى الأزرق عندما يحمل عنصر `<details>` خاصية `open`

أدوات `in-open:*` هي طريقة Tailwind لاستهداف الصنف الزائف `:open` في CSS، الذي يُطبَّق تلقائيًا عند توسّع عنصر `<details>`. وهذا يعني «طبّق لون نص أزرق على هذا العنصر عندما يكون عنصر details الحاوي له مفتوحًا». دون حاجة إلى JavaScript!

## إضافة مؤشرات حالة بصرية

لنضف مؤشرًا بصريًا يدور عند فتح الكشف، ليجعل تغيّر الحالة أوضح.

*إضافة مؤشرات حالة بصرية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/496538f0b37335037fb7749c513c2a351612e230501cb2e890384cac1389ecaa.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 in-open:text-blue-600"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 in-open:rotate-180 in-open:text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

تحسينات المؤشر البصري:

- `flex items-center justify-between`: يوزّع النص والأيقونة على العرض كله
- غلاف `span`: يتيح وضع النص والأيقونة كلًا على حدة
- أيقونة SVG سهم للأسفل بمقاس `h-5 w-5` (20px)
- `in-open:rotate-180`: يدير السهم 180 درجة عند الفتح ليشير إلى الأعلى
- `in-open:text-blue-600` على الأيقونة: يطابق لون نص الملخّص عند التوسّع
- `text-slate-400`: رمادي هادئ للأيقونة في الحالة المغلقة

الآن يتغيّر لون النص والأيقونة معًا، وتدور الأيقونة للدلالة على الحالة الموسّعة.

## إضافة انتقالات سلسة

لنضف انتقالات لتجعل تغيّرات الحالة تبدو مصقولة واحترافية.

*إضافة انتقالات سلسة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/4a5b3664c91925bccb828923dc43106f902b1abc2dd6c8f12d00b7b3c6a5dc7e.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors in-open:text-blue-600"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 transition-all in-open:rotate-180 in-open:text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

تحسينات الحركة:

- `transition-colors` على الملخّص: يحرّك تغيّر لون النص بسلاسة (200ms افتراضيًا)
- `transition-all` على الأيقونة: يحرّك الدوران وتغيّر اللون بسلاسة

تجعل الانتقالات التوسّع والانطواء يبدوان متجاوبين وممتعين بدلًا من أن يكونا مفاجئين.

## إضافة حالات التمرير

لنضف تغذية تمرير خفيفة ليشعر المستخدم بأن المكوّن أكثر تفاعلًا حتى قبل النقر.

*إضافة حالات التمرير — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ecd0218739cc1340b0685247cf520c3437dbe3649c7decb0d75fbdbf9898524b.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors hover:text-slate-700 in-open:text-blue-600 in-open:hover:text-blue-700"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 transition-all hover:text-slate-500 in-open:rotate-180 in-open:text-blue-600 in-open:hover:text-blue-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

تحسينات حالة التمرير:

- `hover:text-slate-700`: نص أغمق قليلًا عند التمرير وهو مغلق
- `hover:text-slate-500`: أيقونة أغمق قليلًا عند التمرير وهو مغلق
- `in-open:hover:text-blue-700`: أزرق أغمق عند التمرير في الحالة المفتوحة
- `in-open:hover:text-blue-700` على الأيقونة: يطابق لون تمرير النص

ينشئ هذا تغذية تفاعل متطورة — ألوان التمرير مرتبطة بسياق كون الكشف مفتوحًا أو مغلقًا.

## حالات حد معززة

أخيرًا، لنضف لمسة حد خفيفة تستجيب أيضًا للحالة المفتوحة لتماسك بصري كامل.

*حالات حد معززة — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c08a51ce86858f669507b494e9d3df8d977597f631efd96be10fb2f7181e91b5.html)*

```html
<details class="rounded-lg border border-slate-200 p-4 transition-colors open:border-blue-200">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors hover:text-slate-700 in-open:text-blue-600 in-open:hover:text-blue-700"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 transition-all hover:text-slate-500 in-open:rotate-180 in-open:text-blue-600 in-open:hover:text-blue-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

تحسينات حالة الحد:

- `transition-colors` على details: يحرّك تغيّرات لون الحد بسلاسة
- `open:border-blue-200`: حد أزرق فاتح عند التوسّع، ينشئ ارتباطًا بصريًا خفيفًا مع النص والأيقونة الزرقاوين

الآن المكوّن كله — النص والأيقونة والحد — يتحوّل إلى عائلة اللون الأزرق المميز عند الفتح، ما ينشئ تجربة متماسكة ومصقولة.

## لماذا الصنف الزائف in-open قوي

تستفيد أدوات `in-open:*` من الصنف الزائف الأصلي `:open` الذي يطبّقه المتصفح تلقائيًا على عناصر `<details>` الموسّعة. وهذا ينشئ تنسيقًا متطورًا قائمًا على الحالة دون أي JavaScript:

**أساس دلالي**: يوفّر عنصرا `<details>` و`<summary>` ميزات إمكانية وصول مدمجة — يعلنها قارئ الشاشة بشكل صحيح، ويعمل التنقل بلوحة المفاتيح تلقائيًا.

**صفر JavaScript**: يتولّى المتصفح كل السلوك التفاعلي (التوسّع والانطواء وإدارة الحالة)، ما يجعل المكوّن خفيفًا وموثوقًا.

**تحسين تدريجي**: يعمل المكوّن تمامًا دون CSS — يمكن للمستخدمين توسيع المحتوى وطيّه حتى لو تعذّر تحميل الأنماط.

**مزامنة الحالة**: يبقى التنسيق البصري متزامنًا تلقائيًا مع حالة العنصر الفعلية لأنه مدفوع بالصنف الزائف الأصلي `:open` في المتصفح.

## حالات الاستخدام الشائعة

يعمل هذا النمط بامتياز مع:

- أقسام الأسئلة الشائعة بعدة عناصر كشف
- لوحات إعدادات بمجموعات خيارات قابلة للتوسّع
- توثيق بأمثلة شيفرة قابلة للطي
- أوصاف منتجات بمواصفات مفصلة
- قوائم تنقل بأقسام فرعية قابلة للتوسّع

## تحديات

جرّب بناء هذه التنويعات:

1. **قائمة أسئلة شائعة**: أنشئ 3-4 عناصر كشف في قائمة راسية، لكل منها سؤال وجواب مختلفان، بتباعد متسق باستخدام `space-y-4`
2. **تنويعات الأيقونة**: استبدل السهم بأيقونة زائد/ناقص تغيّر رمزها (لا دورانها فقط) عند الفتح باستخدام أداتي `in-open:hidden` و`in-open:block`
