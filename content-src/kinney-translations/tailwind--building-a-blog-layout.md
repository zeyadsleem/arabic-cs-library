---
title: "بناء تخطيط مدوّنة"
---

لنبدأ ببنية HTML الأساسية الخاصة بتخطيط مقال مدوّنة بسيط.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/29168963c3ff12c38a8729b349b5ca06e2f15b441f7c11a696b43a8fa143870a.html)*

```html
<div class="mx-auto max-w-sm rounded-lg bg-gray-100 p-4">
  <div class="mb-4 rounded bg-blue-200 p-4">
    <h1 class="text-lg font-bold">The Future of Web Development</h1>
    <div class="mt-2 text-sm">
      <span class="mr-2 rounded bg-white px-2 py-1">Published on March 15, 2025</span>
      <span class="rounded bg-white px-2 py-1">By Sarah Chen</span>
    </div>
  </div>
  <div class="mb-4 rounded bg-green-200 p-4">
    <nav>
      <h2 class="mb-2 font-semibold">Table of Contents</h2>
      <ul class="space-y-1">
        <li><a href="#intro" class="text-blue-600 hover:underline">Introduction</a></li>
        <li><a href="#trends" class="text-blue-600 hover:underline">Current Trends</a></li>
        <li><a href="#future" class="text-blue-600 hover:underline">Looking Ahead</a></li>
      </ul>
    </nav>
  </div>
  <div class="rounded bg-yellow-200 p-4">
    <article>
      <h2 id="intro" class="mb-2 font-semibold">Introduction</h2>
      <p class="mb-4 rounded bg-white p-3">
        Web development continues to evolve at breakneck speed. From the early days of static HTML
        to today's dynamic, interactive experiences, we've come a long way.
      </p>
      <h2 id="trends" class="mb-2 font-semibold">Current Trends</h2>
      <p class="mb-4 rounded bg-white p-3">
        Modern web development embraces component-based architectures, improved developer
        experience, and performance optimization as core principles.
      </p>
      <h2 id="future" class="mb-2 font-semibold">Looking Ahead</h2>
      <p class="rounded bg-white p-3">
        The future promises even more exciting developments in areas like serverless computing, edge
        computing, and AI-powered development tools.
      </p>
    </article>
  </div>
</div>
```

لدينا مقال مدوّنة فيه ترويسة وتنقّل جانبي ومحتوى رئيسي، لكنها جميعًا مكدّسة رأسيًا. لنحوّلها إلى تخطيط احترافي من عمودين باستخدام القوة الدلالية لمناطق قوالب الشبكة في CSS.

## فهم المناطق الدلالية في الشبكة

انطلاقًا من التقنيات التي تعلّمناها في [درس لوحة المعلومات](https://stevekinney.com/courses/tailwind/building-a-dashboard)، لنستخدم مناطق شبكة مسمّاة بدل التموضع الرقمي. وهذا ينشئ تخطيطات أكثر قابلية للصيانة والقراءة، حيث يصف CSS حرفيًا البنية البصرية.

*فهم المناطق الدلالية في الشبكة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/3d0778b3b7f44cb689cb4c8e11fb3964223e0730de4b6b6bb94405b64ac56052.html)*

```html
<div class="mx-auto max-w-sm rounded-lg bg-gray-100 p-4">
  <div class="@container">
    <div
      class="grid gap-6 [grid-template-areas:'header''sidebar''main'] @lg:grid-cols-[200px_1fr] @lg:[grid-template-areas:'header_header''sidebar_main']"
    >
      <div class="rounded bg-blue-200 p-4 [grid-area:header]">
        <h1 class="text-2xl font-bold text-slate-900">The Future of Web Development</h1>
        <div class="mt-2 flex gap-4 text-sm text-slate-600">
          <span class="rounded bg-white px-2 py-1">Published on March 15, 2025</span>
          <span class="rounded bg-white px-2 py-1">By Sarah Chen</span>
        </div>
      </div>
      <div class="rounded bg-green-200 p-4 [grid-area:sidebar]">
        <nav class="rounded-lg bg-slate-50 p-4">
          <h2 class="text-lg font-semibold text-slate-900">Table of Contents</h2>
          <ul class="mt-3 space-y-2">
            <li>
              <a href="#intro" class="text-sm text-blue-600 hover:text-blue-800">Introduction</a>
            </li>
            <li>
              <a href="#trends" class="text-sm text-blue-600 hover:text-blue-800">Current Trends</a>
            </li>
            <li>
              <a href="#future" class="text-sm text-blue-600 hover:text-blue-800">Looking Ahead</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="rounded bg-yellow-200 p-4 [grid-area:main]">
        <article class="prose prose-slate">
          <h2 id="intro">Introduction</h2>
          <p class="rounded bg-white p-3">
            Web development continues to evolve at breakneck speed. From the early days of static
            HTML to today's dynamic, interactive experiences, we've come a long way.
          </p>
          <h2 id="trends">Current Trends</h2>
          <p class="rounded bg-white p-3">
            Modern web development embraces component-based architectures, improved developer
            experience, and performance optimization as core principles.
          </p>
          <h2 id="future">Looking Ahead</h2>
          <p class="rounded bg-white p-3">
            The future promises even more exciting developments in areas like serverless computing,
            edge computing, and AI-powered development tools.
          </p>
        </article>
      </div>
    </div>
  </div>
</div>
```

إعداد مناطق قوالب الشبكة:

- `@container`: ينشئ سياق استعلام حاوية ليتكيّف التخطيط مع حجم حاويته لا مع إطار العرض
- `[grid-template-areas:'header''sidebar''main']`: عمود واحد يبدأ بالجوال أولًا مع أسماء مناطق دلالية
- `@lg:[grid-template-areas:'header_header''sidebar_main']`: تخطيط من عمودين تمتدّ فيه الترويسة على العمودين
- `@lg:grid-cols-[200px_1fr]`: شريط جانبي ثابت بعرض 200px ومنطقة محتوى رئيسي مرنة
- `[grid-area:header]`: يُسند كل عنصر إلى منطقته المسمّاة

الجمال يكمن في سلسلة مناطق القوالب — فهي خريطة بصرية حرفيّة لتخطيطك!

## لماذا تتفوق المناطق المسمّاة على مدّ الأعمدة

لنقارن النهج الدلالي الذي نستخدمه بالتموضع التقليدي للأعمدة، لنفهم لماذا تتفوّق المناطق المسمّاة.

**النهج الرقمي التقليدي:**

```css
.header {
  grid-column: 1 / 3;
  grid-row: 1;
}
.sidebar {
  grid-column: 1;
  grid-row: 2;
}
.main {
  grid-column: 2;
  grid-row: 2;
}
```

**نهجنا الدلالي:**

```css
grid-template-areas:
  'header header'
  'sidebar main';
```

يقدّم نهج المناطق المسمّاة عدّة مزايا:

- **وضوح بصري**: يمكنك أن ترى بنية التخطيط حرفيًا في CSS
- **توثيق ذاتي**: أسماء المناطق مثل «header» و«sidebar» مفهومة فورًا
- **صيانة أسهل**: تغيير التخطيطات يعني تحديث سلسلة بصرية واحدة لا إحداثيات رقمية متعدّدة
- **تصميم مستجيب أفضل**: التخطيطات المختلفة عند نقاط التوقف المختلفة واضحة تمامًا

هذا يجعل التخطيطات المعقّدة أكثر قابلية للصيانة بكثير، ولا سيما عند العمل ضمن فريق.

## إضافة تنسيق وطباعة احترافية

لنُحسّن تخطيطنا بتنسيق مناسب، انطلاقًا من الأنماط التي تعلّمناها في [درس البطاقة](https://stevekinney.com/courses/tailwind/building-a-card) و[دروس النماذج](https://stevekinney.com/courses/tailwind/building-a-form-input).

*إضافة تنسيق وطباعة احترافية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c08d5844cd45dac2c2cf8f961f7046dd6be3b97f85c251521fc4befbcd347463.html)*

```html
<div class="mx-auto max-w-sm">
  <div class="@container">
    <div
      class="grid gap-6 [grid-template-areas:'header''sidebar''main'] @lg:grid-cols-[200px_1fr] @lg:[grid-template-areas:'header_header''sidebar_main']"
    >
      <div class="border-b border-slate-200 pb-6 [grid-area:header]">
        <h1 class="text-2xl leading-tight font-bold text-slate-900 @lg:text-3xl">
          The Future of Web Development
        </h1>
        <div class="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
          <span class="flex items-center gap-1">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            March 15, 2025
          </span>
          <span class="flex items-center gap-1">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Sarah Chen
          </span>
        </div>
      </div>
      <div class="[grid-area:sidebar]">
        <nav class="sticky top-4 rounded-lg bg-slate-50 p-4 shadow-sm">
          <h2 class="text-lg font-semibold text-slate-900">Table of Contents</h2>
          <ul class="mt-3 space-y-2">
            <li>
              <a
                href="#intro"
                class="block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                >Introduction</a
              >
            </li>
            <li>
              <a
                href="#trends"
                class="block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                >Current Trends</a
              >
            </li>
            <li>
              <a
                href="#future"
                class="block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                >Looking Ahead</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="[grid-area:main]">
        <article class="prose prose-slate max-w-none">
          <h2 id="intro">Introduction</h2>
          <p>
            Web development continues to evolve at breakneck speed. From the early days of static
            HTML to today's dynamic, interactive experiences, we've come a long way.
          </p>
          <h2 id="trends">Current Trends</h2>
          <p>
            Modern web development embraces component-based architectures, improved developer
            experience, and performance optimization as core principles.
          </p>
          <h2 id="future">Looking Ahead</h2>
          <p>
            The future promises even more exciting developments in areas like serverless computing,
            edge computing, and AI-powered development tools.
          </p>
        </article>
      </div>
    </div>
  </div>
</div>
```

التحسينات الاحترافية:

- `border-b border-slate-200 pb-6`: فاصل خفيف أسفل الترويسة لخلق تسلسل هرمي بصري
- `@lg:text-3xl`: طباعة مستجيبة تتكبّر مع حجم الحاوية
- أيقونات SVG بحجم `h-4 w-4`: أيقونة تقويم وأيقونة مستخدم بحجم 16px لإضافة لمسة بصرية
- `sticky top-4`: يبقى التنقّل الجانبي ظاهرًا أثناء التمرير
- `shadow-sm`: عمق خفيف للوحة التنقّل
- `transition-colors hover:bg-blue-50`: حالات تحويم ناعمة لروابط التنقّل
- `prose prose-slate max-w-none`: أدوات طباعة لقراءة مقال مريح

يضمن التموضع `sticky` بقاء جدول المحتويات في متناول المستخدمين أثناء تمرّهم في المقالات الطويلة.

## تحسينات إضافية على التخطيط المستجيب للحاوية

لنضف سلوكًا استجابيًا أكثر تطوّرًا باستخدام استعلامات الحاوية، انطلاقًا من التقنيات التي تعلّمناها في [درس بطاقة الإحصاءات](https://stevekinney.com/courses/tailwind/building-a-statistics-card).

*تحسينات إضافية على التخطيط المستجيب للحاوية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/10b264281115f7ac53239e439fd74c70570827716f01393d6daa0e864282dc96.html)*

```html
<div class="mx-auto max-w-sm">
  <div class="@container">
    <div
      class="grid gap-4 [grid-template-areas:'header''sidebar''main'] @md:gap-6 @lg:grid-cols-[220px_1fr] @lg:[grid-template-areas:'header_header''sidebar_main'] @xl:grid-cols-[250px_1fr]"
    >
      <div class="border-b border-slate-200 pb-4 [grid-area:header] @md:pb-6">
        <h1 class="text-xl leading-tight font-bold text-slate-900 @md:text-2xl @lg:text-3xl">
          The Future of Web Development
        </h1>
        <div class="mt-2 flex flex-wrap gap-3 text-sm text-slate-600 @md:mt-3 @md:gap-4">
          <span class="flex items-center gap-1">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            March 15, 2025
          </span>
          <span class="flex items-center gap-1">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Sarah Chen
          </span>
        </div>
      </div>
      <div class="[grid-area:sidebar] @lg:order-first">
        <nav class="rounded-lg bg-slate-50 p-3 shadow-sm @md:p-4 @lg:sticky @lg:top-4">
          <h2 class="text-base font-semibold text-slate-900 @md:text-lg">Table of Contents</h2>
          <ul class="mt-2 space-y-1 @md:mt-3 @md:space-y-2">
            <li>
              <a
                href="#intro"
                class="block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                >Introduction</a
              >
            </li>
            <li>
              <a
                href="#trends"
                class="block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                >Current Trends</a
              >
            </li>
            <li>
              <a
                href="#future"
                class="block rounded-md px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                >Looking Ahead</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="[grid-area:main]">
        <article class="prose prose-slate prose-headings:scroll-mt-4 max-w-none">
          <h2 id="intro">Introduction</h2>
          <p>
            Web development continues to evolve at breakneck speed. From the early days of static
            HTML to today's dynamic, interactive experiences, we've come a long way. The tools,
            frameworks, and methodologies we use today would seem like magic to developers from just
            a decade ago.
          </p>
          <h2 id="trends">Current Trends</h2>
          <p>
            Modern web development embraces component-based architectures, improved developer
            experience, and performance optimization as core principles. We're seeing the rise of
            meta-frameworks, edge computing, and AI-assisted development tools that are reshaping
            how we build for the web.
          </p>
          <h2 id="future">Looking Ahead</h2>
          <p>
            The future promises even more exciting developments in areas like serverless computing,
            edge computing, and AI-powered development tools. As the web platform continues to
            evolve, developers will have access to increasingly powerful APIs and capabilities that
            bring native-like experiences to the browser.
          </p>
        </article>
      </div>
    </div>
  </div>
</div>
```

تحسينات الاستجابة للحاوية:

- `@md:gap-6`: تباعد تصاعدي يكبر مع حجم الحاوية
- `@lg:grid-cols-[220px_1fr] @xl:grid-cols-[250px_1fr]`: يتكيّف عرض الشريط الجانبي مع المساحة المتاحة
- `@lg:sticky @lg:top-4`: لا يُفعَّل التموضع اللاصق إلا في الحاويات الأكبر
- `@md:text-2xl @lg:text-3xl`: تتكبّر الطباعة عبر نقاط توقف الحاوية
- `prose-headings:scroll-mt-4`: يراعي التنقّل اللاصق عند التمرير إلى المراسي

الفكرة المحورية هي أن استعلامات الحاوية تجعل التخطيط معياريًا حقًا — فهو يتكيّف مع حجم حاويته أينما وُضع في تطبيقك.

## فهم الفرق بين الحاوية واستعلامات الوسائط

يبيّن هذا التخطيط الفرق الجوهري بين استعلامات الحاوية (`@md:` و`@lg:`) واستعلامات الوسائط (`md:` و`lg:`):

**استعلامات الوسائط** تستجيب لحجم إطار العرض:

- «عندما يبلغ عرض نافذة المتصفح 768px، افعل هذا»
- نقاط توقف عامة تؤثر في الصفحة كلها

**استعلامات الحاوية** تستجيب لحجم الحاوية:

- «عندما يبلغ عرض حاوية هذا المكوّن 512px، افعل هذا»
- نقاط توقف محلية تجعل المكوّنات معيارية حقًا

سيعمل تخطيط المدوّنة هذا بشكل مثالي سواء كان:

- بعرض كامل في صفحة على سطح المكتب
- داخل أداة في شريط جانبي ضيّق
- جزءًا من لوحة معلومات
- مضمّنًا في معاينة مقال

ذكاء التخطيط محصور داخل المكوّن نفسه، ما يجعله قابلًا لإعادة الاستخدام بلا حدود.

## التحديات

جرّب بناء هذه الصيغ:

1. **تخطيط من ثلاثة أعمدة**: وسّعه ليضمّ منطقة «aside» للمقالات ذات الصلة باستخدام مناطق قوالب مثل `"header header header" "sidebar main aside"` مع انهيار مستجيب
2. **جدول محتويات ديناميكي**: استخدم التقنيات التي تعلّمناها في [درس التفاصيل القابلة للطي](https://stevekinney.com/courses/tailwind/building-details-disclosure) تجعل جدول المحتويات قابلًا للطي على الجوال مع بقائه ظاهرًا دائمًا في الحاويات الأكبر
