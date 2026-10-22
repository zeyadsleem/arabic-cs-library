---
title: "بناء قائمة تنقّل"
---

لنبدأ ببنية HTML الأساسية الخاصة بقائمة تنقّل بسيطة.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/50b623a2525b1668398de857194d42e94caf9d912b7bf6c317f4ac94f9b4f32f.html)*

```html
<div>
  <nav>
    <div>
      <a href="#">Brand</a>
    </div>
    <div>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Portfolio</a>
      <a href="#">Contact</a>
    </div>
  </nav>
</div>
```

لدينا تنقّل أساسي فيه شعار العلامة التجارية وخمسة روابط تنقّل، لكنها مكدّسة رأسيًا وبلا أي تنسيق. لنحوّلها إلى تنقّل ذكي يتكيّف مع حجم حاويته لا مع حجم الشاشة — ما يجعله قابلًا لإعادة الاستخدام حقًا في الترويسات أو الأشرطة الجانبية أو أي سياق تخطيط.

## فهم الحاوية مقابل استعلامات الوسائط

قبل أن نبدأ البناء، من الضروري أن نفهم لماذا تُعدّ استعلامات الحاوية ثورية في تصميم التنقّل. فالتنقّل المستجيب التقليدي يستخدم استعلامات وسائط تستجيب لحجم إطار العرض:

**استعلامات الوسائط تفكّر عالميًا**: «عندما يبلغ عرض نافذة المتصفح 768px، انتقل إلى قائمة الجوال» **استعلامات الحاوية تفكّر محليًا**: «عندما يبلغ عرض حاوية هذا التنقّل 384px، انتقل إلى قائمة الجوال»

وهذا يعني أن تنقّلنا سيعمل بشكل مثالي سواء كان:

- بعرض كامل في ترويسة صفحة
- مقيَّدًا في شريط جانبي للوحة معلومات
- مضمّنًا في أداة ضيّقة
- جزءًا من تخطيط متعدّد الأعمدة

لنبنِ هذا خطوة بخطوة باستخدام استعلامات الحاوية لخلق تنقّل معياريّ حقًا.

## تهيئة سياق استعلام الحاوية

أولًا، لنثبّت حاويتنا بوصفها سياق استعلام، ونضيف تنسيقًا أساسيًا للتنقّل، انطلاقًا من التقنيات التي تعلّمناها في [درس بطاقة الإحصاءات](https://stevekinney.com/courses/tailwind/building-a-statistics-card).

*تهيئة سياق استعلام الحاوية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c7b5a6def23094a2f55da3176f8c65916ebb2e7691aea534f81e6c53f5570d37.html)*

```html
<div class="@container border-b border-slate-200 bg-white">
  <nav class="flex items-center justify-between px-4 py-3">
    <div>
      <a href="#" class="text-xl font-bold text-slate-900">Brand</a>
    </div>
    <div class="flex gap-6">
      <a href="#" class="text-sm font-medium text-slate-700 hover:text-slate-900">Home</a>
      <a href="#" class="text-sm font-medium text-slate-700 hover:text-slate-900">About</a>
      <a href="#" class="text-sm font-medium text-slate-700 hover:text-slate-900">Services</a>
      <a href="#" class="text-sm font-medium text-slate-700 hover:text-slate-900">Portfolio</a>
      <a href="#" class="text-sm font-medium text-slate-700 hover:text-slate-900">Contact</a>
    </div>
  </nav>
</div>
```

الإعداد الأساسي:

- `@container`: يثبّت هذا العنصر بوصفه سياق استعلام حاوية — فيمكن لعناصره الآن أن تستجيب لعرض هذه الحاوية
- `flex items-center justify-between`: ينشئ تخطيطًا أفقيًا بعلامة تجارية على اليسار وروابط على اليمين
- `px-4 py-3`: حشو أفقي 16px ورأسي 12px لتباعد مريح
- `text-xl font-bold`: طباعة بارزة للعلامة التجارية (20px، بوزن 700)
- `gap-6`: تباعد قدره 24px بين روابط التنقّل من أجل قابلية القراءة
- `hover:text-slate-900`: نص أغمق عند التحويم لتوفير تغذية راجعة تفاعلية

ينشئ هذا تنقّلًا أفقيًا نظيفًا يعمل جيدًا في الحاويات العريضة، لكنه سيفيض في المساحات الضيّقة.

## إضافة تباعد الروابط المستجيب للحاوية

الآن لنجعل التنقّل يتكيّف مع تباعده بحسب عرض الحاوية. ففي الحاويات متوسطة العرض سنستخدم تباعدًا أضيق لاستيعاب محتوى أكثر.

*إضافة تباعد الروابط المستجيب للحاوية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0f0506cbd67bf5b1355d85cd8809eff1b61c0f0d81baa17c7a762d9929e5faf3.html)*

```html
<div class="@container border-b border-slate-200 bg-white">
  <nav class="flex items-center justify-between px-4 py-3">
    <div>
      <a href="#" class="text-xl font-bold text-slate-900">Brand</a>
    </div>
    <div class="flex gap-3 @lg:gap-6">
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Home
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        About
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Services
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Portfolio
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Contact
      </a>
    </div>
  </nav>
</div>
```

التباعد المستجيب للحاوية:

- `gap-3 @lg:gap-6`: فاصل 12px افتراضيًا، يتّسع إلى 24px عندما يبلغ عرض الحاوية 512px على الأقل
- `transition-colors`: انتقالات ألوان ناعمة لتأثيرات تحويم مصقولة

تعني البادئة `@lg:` «عندما تكون هذه الحاوية (لا إطار العرض) كبيرة». وهذا يضمن التباعد الأمثل أينما وُضع التنقّل في تخطيطك.

## إنشاء تخطيط تنقّل مضغوط

في الحاويات متوسطة العرض، لننشئ تخطيطًا أكثر إحكامًا حيث قد تُختصر بعض الروابط أو يُعاد ترتيبها.

*إنشاء تخطيط تنقّل مضغوط — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b44697b8d2d537dece48b72e1c0c6dd416d00a9b95d605b9a123167f2a2bc14b.html)*

```html
<div class="@container border-b border-slate-200 bg-white">
  <nav class="flex items-center justify-between px-4 py-3">
    <div>
      <a href="#" class="text-lg font-bold text-slate-900 @lg:text-xl">Brand</a>
    </div>
    <div class="hidden gap-2 @sm:flex @md:gap-3 @lg:gap-6">
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Home
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        About
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Services
      </a>
      <a
        href="#"
        class="hidden text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 @md:block"
      >
        Portfolio
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Contact
      </a>
    </div>
  </nav>
</div>
```

تحسينات التخطيط المضغوط:

- `text-lg @lg:text-xl`: يتكبّر نص العلامة التجارية من 18px إلى 20px بحسب المساحة المتاحة في الحاوية
- `hidden @sm:flex`: روابط التنقّل مخفية افتراضيًا، وتظهر عندما يبلغ عرض الحاوية 384px على الأقل
- `gap-2 @md:gap-3 @lg:gap-6`: تباعد تصاعدي يتكيّف مع عرض الحاوية (8px → 12px → 24px)
- `hidden @md:block` على Portfolio: يختفي هذا الرابط في أكثر التخطيطات تقييدًا أفقيًا

وهذا ينشئ كشفًا تصاعديًا ذكيًا تختفي فيه عناصر التنقّل الأقل أهمية مع ضيق المساحة.

## إضافة قائمة برغر للحاويات الضيّقة

الآن لنضف قائمة برغر تظهر عندما تكون الحاوية ضيّقة أكثر من اللازم للتنقّل الأفقي.

*إضافة قائمة برغر للحاويات الضيّقة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/fee8866ceed266c0cb0d642c3441683c535a0e74b9d90fd8fef52b420d2c2ff5.html)*

```html
<div class="@container border-b border-slate-200 bg-white">
  <nav class="flex items-center justify-between px-4 py-3">
    <div>
      <a href="#" class="text-lg font-bold text-slate-900 @lg:text-xl">Brand</a>
    </div>

    <!-- Horizontal Navigation (medium+ containers) -->
    <div class="hidden gap-2 @sm:flex @md:gap-3 @lg:gap-6">
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Home
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        About
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Services
      </a>
      <a
        href="#"
        class="hidden text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 @md:block"
      >
        Portfolio
      </a>
      <a href="#" class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
        Contact
      </a>
    </div>

    <!-- Mobile Menu Button (narrow containers) -->
    <div class="@sm:hidden">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-slate-100"
        id="mobile-menu-1"
      >
        <svg class="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </nav>
</div>
```

إضافة قائمة برغر:

- `@sm:hidden`: لا يظهر زر قائمة الجوال إلا عندما يقلّ عرض الحاوية عن 384px
- `w-8 h-8`: زر مربّع بحجم 32px يوفّر مساحة لمس مناسبة
- `rounded-md hover:bg-slate-100`: تغذية راجعة خفيفة عند التحويم عبر خلفية فاتحة
- أيقونة برغر SVG بحجم `w-5 h-5`: حجم أيقونة 20px لتوازن بصري جيد
- `text-slate-600`: لون أيقونة خافت يتّغمق إلى `currentColor` عند التحويم

الآن لدينا تنقّل ذكي يُظهر قائمة البرغر فقط عندما تكون الحاوية مقيَّدة فعلًا — لا بناءً على حجم الشاشة، بل على المساحة المتاحة فعليًا.

## إضافة تنفيذ قائمة منسدلة

لنُكمل وظيفة البرغر بقائمة منسدلة تظهر عند تفعيل الزر.

*إضافة تنفيذ قائمة منسدلة — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/663fbef78df758ab2dc743ab12e8af263aede09b112aaf230bbb3450c6a8e65e.html)*

```html
<div class="@container border-b border-slate-200 bg-white">
  <nav>
    <div class="flex items-center justify-between px-4 py-3">
      <div>
        <a href="#" class="text-lg font-bold text-slate-900 @lg:text-xl">Brand</a>
      </div>

      <!-- Horizontal Navigation (medium+ containers) -->
      <div class="hidden gap-2 @sm:flex @md:gap-3 @lg:gap-6">
        <a
          href="#"
          class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
        >
          Home
        </a>
        <a
          href="#"
          class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
        >
          About
        </a>
        <a
          href="#"
          class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
        >
          Services
        </a>
        <a
          href="#"
          class="hidden text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 @md:block"
        >
          Portfolio
        </a>
        <a
          href="#"
          class="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
        >
          Contact
        </a>
      </div>

      <!-- Mobile Menu Button (narrow containers) -->
      <div class="@sm:hidden">
        <input type="checkbox" id="mobile-menu-2" class="peer sr-only" />
        <label
          for="mobile-menu-2"
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-slate-100"
        >
          <svg
            class="h-5 w-5 text-slate-600 peer-checked:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            class="hidden h-5 w-5 text-slate-600 peer-checked:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div class="hidden border-t border-slate-200 bg-slate-50 peer-checked:block @sm:hidden">
      <div class="space-y-1 px-4 py-2">
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          Home
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          About
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          Services
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          Portfolio
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
</div>
```

تنفيذ القائمة المنسدلة:

- `peer sr-only`: مربع اختيار مخفي يدير حالة القائمة باستخدام نظام peer
- `peer-checked:hidden` و`hidden peer-checked:block`: تبديل الأيقونة بين البرغر وX
- `hidden peer-checked:block @sm:hidden`: تظهر القائمة المنسدلة عندما يكون مربع الاختيار محدَّدًا **و** تكون الحاوية ضيّقة
- `border-t border-slate-200 bg-slate-50`: فصل بصري مع خلفية خفيفة
- `block px-3 py-2`: روابط رأسية مكدّسة مع مساحات لمس مريحة
- `space-y-1`: تباعد قدره 4px بين عناصر القائمة

الجمال هنا أن كل عناصر القائمة تظهر في القائمة المنسدلة — حتى «Portfolio» التي كانت مخفية في التخطيط الأفقي المضغوط!

## إضافة حالات التركيز وتحسين الوصولية

لنُحسّن الوصولية بحالات تركيز سليمة وخصائص ARIA.

*إضافة حالات التركيز وتحسين الوصولية — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/af637381985d062059b40072ada89794581e935cb9ba6a66f6fa32954c952cbf.html)*

```html
<div class="@container border-b border-slate-200 bg-white">
  <nav role="navigation" aria-label="Main navigation">
    <div class="flex items-center justify-between px-4 py-3">
      <div>
        <a
          href="#"
          class="rounded-sm text-lg font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @lg:text-xl"
        >
          Brand
        </a>
      </div>

      <!-- Horizontal Navigation (medium+ containers) -->
      <div class="hidden gap-2 @sm:flex @md:gap-3 @lg:gap-6">
        <a
          href="#"
          class="rounded-sm text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Home
        </a>
        <a
          href="#"
          class="rounded-sm text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          About
        </a>
        <a
          href="#"
          class="rounded-sm text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Services
        </a>
        <a
          href="#"
          class="hidden rounded-sm text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @md:block"
        >
          Portfolio
        </a>
        <a
          href="#"
          class="rounded-sm text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Contact
        </a>
      </div>

      <!-- Mobile Menu Button (narrow containers) -->
      <div class="@sm:hidden">
        <input type="checkbox" id="mobile-menu-3" class="peer sr-only" />
        <label
          for="mobile-menu-3"
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors focus-within:bg-slate-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-600 hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          <svg
            class="h-5 w-5 text-slate-600 peer-checked:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            class="hidden h-5 w-5 text-slate-600 peer-checked:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div class="hidden border-t border-slate-200 bg-slate-50 peer-checked:block @sm:hidden">
      <div class="space-y-1 px-4 py-2">
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Home
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          About
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Services
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Portfolio
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
</div>
```

تحسينات الوصولية:

- `role="navigation" aria-label="Main navigation"`: يوضّح بجلاء معلم التنقّل لقارئات الشاشة
- `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`: حلقات تركيز زرقاء للتنقّل بلوحة المفاتيح
- `aria-label="Toggle navigation menu"`: تسمية وصفية لزر قائمة الجوال
- `aria-hidden="true"` على أيقونات SVG: يمنع قارئات الشاشة من إعلان الأيقونات الزخرفية
- حالات `focus-within:`: تغذية راجعة بصرية عند تحوّل التركيز إلى زر قائمة الجوال

تضمن الصنف الزائف `focus-visible` أن حلقات التركيز لا تظهر إلا عند التنقّل بلوحة المفاتيح، ما يوفّر تجربة ممتازة لمستخدمي الفأرة ولوحة المفاتيح على حدّ سواء.

## إضافة اللمسات النهائية وحالات النشط

أخيرًا، لنضف بعض اللمسات النهائية بحالات تنقّل نشطة وانتقالات ناعمة في كل مكان.

*إضافة اللمسات النهائية وحالات النشط — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/093abbe54d25a41107baee2490f3ee1fa6397e55bf2be28a0c094501c514a9eb.html)*

```html
<div class="@container border-b border-slate-200 bg-white shadow-sm">
  <nav role="navigation" aria-label="Main navigation">
    <div class="flex items-center justify-between px-4 py-3 @lg:px-6">
      <div>
        <a
          href="#"
          class="rounded-sm text-lg font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @lg:text-xl"
        >
          Brand
        </a>
      </div>

      <!-- Horizontal Navigation (medium+ containers) -->
      <div class="hidden gap-2 @sm:flex @md:gap-3 @lg:gap-6">
        <a
          href="#"
          class="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Home
        </a>
        <a
          href="#"
          class="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          About
        </a>
        <a
          href="#"
          class="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Services
        </a>
        <a
          href="#"
          class="hidden rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @md:block"
        >
          Portfolio
        </a>
        <a
          href="#"
          class="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Contact
        </a>
      </div>

      <!-- Mobile Menu Button (narrow containers) -->
      <div class="@sm:hidden">
        <input type="checkbox" id="mobile-menu-3" class="peer sr-only" />
        <label
          for="mobile-menu-3"
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors focus-within:bg-slate-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-600 hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          <svg
            class="h-5 w-5 text-slate-600 transition-all peer-checked:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            class="hidden h-5 w-5 text-slate-600 transition-all peer-checked:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      class="hidden border-t border-slate-200 bg-slate-50/80 backdrop-blur-sm peer-checked:block @sm:hidden"
    >
      <div class="space-y-1 px-4 py-3">
        <a
          href="#"
          class="block rounded-md bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Home
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          About
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Services
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Portfolio
        </a>
        <a
          href="#"
          class="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
</div>
```

تحسينات اللمسات النهائية:

- `shadow-sm`: ظل خفيف يضيف عمقًا إلى شريط التنقّل
- `@lg:px-6`: حشو أفقي أكبر في الحاويات الأكبر لنسب أفضل
- `bg-blue-50 text-blue-700`: تنسيق حالة النشط للصفحة الحالية (Home)
- `px-3 py-1.5 rounded-md`: تنسيق يشبه الأزرار لجميع روابط التنقّل
- `hover:bg-slate-50`: خلفية تحويم موحّدة عبر الروابط الأفقية
- `bg-slate-50/80 backdrop-blur-sm`: قائمة منسدلة شبه شفافة مع تمويه الخلفية لإحساس عصري
- `py-2.5`: مساحات لمس أطول قليلًا في قائمة الجوال (10px مقابل 8px)
- `transition-all` على الأيقونات: انتقالات ناعمة عند تغيّر الأيقونات

## لماذا استعلامات الحاوية ثورية

يُظهر هذا التنقّل التحوّل الجوهري من التصميم المستجيب لإطار العرض إلى التصميم المستجيب للحاوية:

**نهج استعلام الوسائط التقليدي:**

```css
/* Always responds to screen size */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .hamburger {
    display: block;
  }
}
```

**نهج استعلام الحاوية لدينا:**

```css
/* Responds to container size */
@container (max-width: 384px) {
  .nav-links {
    display: none;
  }
  .hamburger {
    display: block;
  }
}
```

**الفوائد في العالم الحقيقي:**

**التكامل مع الشريط الجانبي**: ضع هذا التنقّل في شريط جانبي للوحة معلومات بعرض 300px — يتحوّل تلقائيًا إلى قائمة برغر حتى على سطح المكتب، لأن الحاوية ضيّقة.

**سياقات الأدوات**: ضمّنه في أداة ضيّقة أو بطاقة — يتكيّف التنقّل مع المساحة المتاحة لا مع حجم الشاشة.

**التخطيطات المرنة**: استخدمه في مناطق CSS Grid أو حاويات Flexbox بأي حجم — ذكاء التنقّل محصور ذاتيًّا.

**إعادة استخدام المكوّنات**: يعمل مكوّن التنقّل نفسه بشكل مثالي في الترويسات والأشرطة الجانبية والنوافذ المنبثقة أو أي سياق تخطيط دون تعديل.

**لا حاجة إلى JavaScript**: كل السلوك المستجيب هو CSS خالص، ما يجعله خفيفًا وموثوقًا.

تجعل استعلامات الحاوية المكوّنات معيارية حقًا — فهي تجلب ذكاءها الاستجابي معها بدلًا من الاعتماد على نقاط توقف عامة قد لا تطابق سياقها الفعلي.

## التحديات

جرّب بناء هذه الصيغ:

1. **تنقّل مسار التنقّل (Breadcrumbs)**: أنشئ مكوّن breadcrumbs ينهار تدريجيًا (يُظهر «Home > … > Current») عندما تضيق الحاوية، باستخدام تقنيات استعلام الحاوية المشابهة.
2. **تنقّل بتبويبات**: ابنِ واجهة تبويبات تنتقل من التبويبات الأفقية إلى مُحدِّد منسدل عندما لا يتّسع عرض الحاوية لكل التبويبات، بما يُظهر استعلامات الحاوية مع أنماط واجهة مختلفة.
