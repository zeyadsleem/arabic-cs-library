---
title: "بناء حقل إدخال مركّب"
lang: ar
source: "https://stevekinney.com/courses/tailwind/building-a-compound-input"
---

لنبدأ ببنية HTML الأساسية لحقل إدخال بحث بسيط.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/bdd6c44fd19e8adf535b0486b04497e17d4dce755a962f32fefd2c93a3ed9d87.html)*

```html
<div>
  <label for="search">Search products</label>
  <input type="text" name="search" id="search" placeholder="Enter search terms..." />
</div>
```

إنه حقل إدخال أساسي، لكن الواجهات الحديثة تحتاج غالبًا إلى أنماط إدخال أكثر تطورًا — نص بادئة مثل «https://»، أو مؤشرات لاحقة مثل رموز العملات، أو أزرار داخلية لإجراءات مثل البحث أو المسح. لنحوّله إلى حقل إدخال مركّب مرن يستطيع التعامل مع كل هذه الحالات.

## إنشاء حاوية حقل الإدخال المركّب

أولًا، لنرسِ حاوية تضم حقل الإدخال وعناصر إضافية، مع تطبيق تنسيق احترافي إلى حد ما.

*إنشاء حاوية حقل الإدخال المركّب — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/190834171d947eaf786c761b487527af1eac25ef88f2023f053e3183639871c2.html)*

```html
<div>
  <label for="search" class="block text-sm font-medium text-slate-900">Search products</label>
  <div class="mt-2">
    <div class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300">
      <input
        type="text"
        name="search"
        id="search"
        class="block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        placeholder="Enter search terms..."
      />
    </div>
  </div>
</div>
```

مقاربة الحاوية:

- `flex`: ينشئ حاوية أفقية لحقل الإدخال والعناصر الإضافية
- `rounded-md outline-1 -outline-offset-1 outline-slate-300`: ينقل تنسيق الحد إلى الحاوية بدلًا من حقل الإدخال
- `bg-white`: خلفية بيضاء صريحة لحقل الإدخال المركّب كله
- `border-0 bg-transparent`: يزيل التنسيق الافتراضي لحقل الإدخال لأن الحاوية تتولّى المظهر
- `focus:outline-none`: يزيل حلقة التركيز الافتراضية لحقل الإدخال — سنتولّى التركيز على الحاوية

تتعامل هذه المقاربة مع حقل الإدخال المركّب كله كوحدة بصرية واحدة، وهذا أساسي لمظهر احترافي عند إضافة عناصر البادئة واللاحقة.

## تقديم focus-within لتركيز الحاوية

لنضف الآن حالات تركيز سليمة باستخدام الصنف الزائف `focus-within`، الذي يطبّق الأنماط عندما يتلقى أي عنصر ابن التركيز.

*تقديم focus-within لتركيز الحاوية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/fbf3e6def59650dbefd94c3ce3174abdd7a40fbf8f61a42ac3ada6d58b895d8d.html)*

```html
<div>
  <label for="search" class="block text-sm font-medium text-slate-900">Search products</label>
  <div class="mt-2">
    <div
      class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
    >
      <input
        type="text"
        name="search"
        id="search"
        class="block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        placeholder="Enter search terms..."
      />
    </div>
  </div>
</div>
```

سحر focus-within:

- `focus-within:outline-2`: مخطط أعرض بمقدار 2px عندما يتلقى أي عنصر ابن (مثل حقل الإدخال) التركيز
- `focus-within:-outline-offset-2`: إزاحة سالبة تنشئ تأثير حلقة داخلية
- `focus-within:outline-indigo-600`: لون العلامة لحالة التركيز

الصنف الزائف `focus-within` مثالي لحقول الإدخال المركّبة لأنه ينشئ تجربة تركيز موحّدة — سواء نقر المستخدم على حقل الإدخال أو زر أو أي عنصر تفاعلي آخر داخل الحاوية، يُظهر حقل الإدخال المركّب كله حالة تركيز متسقة.

## إضافة عناصر البادئة واللاحقة

لنضف عنصري بادئة ولاحقة لعرض أنماط شائعة مثل بادئات عناوين URL ولاحقات الوحدات.

*إضافة عناصر البادئة واللاحقة — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7f0f254df175c22a93965a0a8f139a0d2e2eb83c186e8c10cf4e0a6002406d17.html)*

```html
<div>
  <label for="website" class="block text-sm font-medium text-slate-900">Website URL</label>
  <div class="mt-2">
    <div
      class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
    >
      <div
        class="flex items-center rounded-l-md border-r border-slate-300 bg-slate-50 px-3 text-sm text-slate-500"
      >
        https://
      </div>
      <input
        type="text"
        name="website"
        id="website"
        class="block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        placeholder="example.com"
      />
      <div
        class="flex items-center rounded-r-md border-l border-slate-300 bg-slate-50 px-3 text-sm text-slate-500"
      >
        .com
      </div>
    </div>
  </div>
</div>
```

تنسيق البادئة واللاحقة:

- `flex items-center`: يوسّط محتوى البادئة/اللاحقة رأسيًا مع حقل الإدخال
- `bg-slate-50`: خلفية رمادية فاتحة تميّز العناصر الثابتة عن حقل الإدخال القابل للتحرير
- `border-r border-slate-300` و`border-l border-slate-300`: حدود خفيفة تفصل الأقسام
- `rounded-l-md` و`rounded-r-md`: يحافظان على زوايا الحاوية المستديرة
- `px-3`: حشوة متسقة مع حقل الإدخال
- `text-sm text-slate-500`: نص أصغر وأهدأ يشير إلى أن هذه عناصر مساعدة

ينشئ هذا فصلًا بصريًا واضحًا مع الحفاظ على المظهر الموحّد لمكوّن إدخال واحد.

## إضافة أزرار إجراء داخلية

لننشئ الآن حقل إدخال بحث بزر بحث داخلي، لنعرض كيفية التعامل مع عناصر تفاعلية داخل حقل الإدخال المركّب.

*إضافة أزرار إجراء داخلية — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/30a279a1d55b9c85ee42d7dffd084df1ab4348ea3a6176fbfa6a9bbdccdd5288.html)*

```html
<div>
  <label for="search" class="block text-sm font-medium text-slate-900">Search products</label>
  <div class="mt-2">
    <div
      class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
    >
      <div class="flex items-center pl-3 text-slate-400">🔍</div>
      <input
        type="text"
        name="search"
        id="search"
        class="block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        placeholder="Search for products..."
      />
      <button
        type="submit"
        class="flex items-center rounded-r-md bg-indigo-600 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
      >
        Search
      </button>
    </div>
  </div>
</div>
```

تنفيذ الزر الداخلي:

- رمز البحث التعبيري مع `pl-3 text-slate-400`: يوفّر سياقًا بصريًا بلون هادئ
- الزر مع `rounded-r-md`: يحافظ على نصف قطر زاوية الحاوية
- `focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white`: حلقة تركيز منفصلة للزر تعمل مع حالة focus-within في الحاوية

حلقة تركيز الزر مصممة لتعمل بتناغم مع مخطط focus-within للحاوية، ما ينشئ تسلسلًا بصريًا واضحًا عند تركيز عناصر مختلفة.

## استخدام has() لحالات أزرار ديناميكية

لنعزّز حقل الإدخال بزر مسح يظهر فقط عند وجود محتوى، باستخدام محدِّد `has()` لإظهار العناصر شرطيًا.

*استخدام has() لحالات أزرار ديناميكية — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5c27e1c998f2ec3c2ef98ff2ed49f47030eb60e549038c37cd90e1ed82036fdd.html)*

```html
<div>
  <label for="search" class="block text-sm font-medium text-slate-900">Search products</label>
  <div class="mt-2">
    <div
      class="group flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
    >
      <div class="flex items-center pl-3 text-slate-400">🔍</div>
      <input
        type="text"
        name="search"
        id="search"
        class="peer block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
        placeholder="Search for products..."
      />
      <button
        type="button"
        class="hidden items-center px-2 text-slate-400 peer-placeholder-shown:hidden peer-[:not(:placeholder-shown)]:flex hover:text-slate-600"
        aria-label="Clear search"
      >
        ✕
      </button>
      <button
        type="submit"
        class="flex items-center rounded-r-md bg-indigo-600 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
      >
        Search
      </button>
    </div>
  </div>
</div>
```

ظهور الزر الديناميكي:

- `peer`: يضع علامة على حقل الإدخال كعنصر peer لتنسيق الأشقاء
- `peer-placeholder-shown:hidden`: يخفي زر المسح عندما يظهر نص العنصر النائب (حقل الإدخال فارغ)
- `peer-[:not(:placeholder-shown)]:flex`: يُظهر زر المسح عندما يحتوي حقل الإدخال على محتوى (لا يظهر العنصر النائب)
- `group`: يتيح تأثيرات تمرير منسّقة على مستوى الحاوية

ينشئ هذا تجربة مستخدم ذكية لا يظهر فيها زر المسح إلا عند الحاجة، ما يقلل الفوضى البصرية عندما يكون حقل الإدخال فارغًا.

## إضافة صيغ إدخال متعددة الحالات

لننشئ مثالًا أكثر تطورًا يعرض حالات إدخال مختلفة ويستخدم عدة محدِّدات متقدمة.

*إضافة صيغ إدخال متعددة الحالات — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/8afe5828413313a73172df7435b75aa3d54d673162d73d7b141ca62c48ca683f.html)*

```html
<div class="space-y-6">
  <!-- Search with Clear -->
  <div>
    <label for="search-clear" class="block text-sm font-medium text-slate-900"
      >Search with auto-clear</label
    >
    <div class="mt-2">
      <div
        class="group flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 transition-colors focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 hover:bg-slate-50"
      >
        <div class="flex items-center pl-3 text-slate-400 group-focus-within:text-indigo-600">
          🔍
        </div>
        <input
          type="text"
          name="search-clear"
          id="search-clear"
          class="peer block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          placeholder="Type to search..."
        />
        <button
          type="button"
          class="hidden items-center px-2 text-slate-400 transition-colors peer-[:not(:placeholder-shown)]:flex hover:text-slate-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      </div>
    </div>
  </div>

  <!-- Password with Toggle -->
  <div>
    <label for="password-toggle" class="block text-sm font-medium text-slate-900"
      >Password with visibility toggle</label
    >
    <div class="mt-2">
      <div
        class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
      >
        <input
          type="password"
          name="password-toggle"
          id="password-toggle"
          class="block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          placeholder="Enter your password"
        />
        <button
          type="button"
          class="flex items-center px-3 text-slate-400 hover:text-slate-600 focus:text-indigo-600 focus:outline-none"
          aria-label="Toggle password visibility"
        >
          👁️
        </button>
      </div>
    </div>
  </div>

  <!-- URL Input with Protocol -->
  <div>
    <label for="url-protocol" class="block text-sm font-medium text-slate-900">Website URL</label>
    <div class="mt-2">
      <div
        class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
      >
        <div
          class="flex items-center rounded-l-md border-r border-slate-300 bg-slate-50 px-3 text-sm text-slate-500"
        >
          https://
        </div>
        <input
          type="text"
          name="url-protocol"
          id="url-protocol"
          class="block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          placeholder="example.com"
        />
        <button
          type="button"
          class="flex items-center rounded-r-md border-l border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:bg-indigo-50 focus:text-indigo-700 focus:outline-none"
          aria-label="Validate URL"
        >
          ✓
        </button>
      </div>
    </div>
  </div>
</div>
```

أنماط تفاعل متقدمة:

- `group-focus-within:text-indigo-600`: يغيّر لون الأيقونة عندما يُركَّز على أي جزء من حقل الإدخال المركّب
- `transition-colors`: حركات لون سلسة عبر تغيّرات الحالة
- `hover:bg-slate-50`: حالة تمرير خفيفة على الحاوية كلها
- `focus:text-indigo-600`: لون تركيز منفصل للأزرار الداخلية
- `peer-[:not(:placeholder-shown)]:flex`: محدِّد CSS حديث لإظهار العناصر عندما يحتوي حقل الإدخال على محتوى

تنشئ هذه الأنماط تجارب إدخال متطورة تشبه التطبيقات، مع تغذية بصرية واضحة لكل حالات التفاعل.

## فهم focus-within مقابل حالات التركيز الفردية

الصنف الزائف `focus-within` أساسي لحقول الإدخال المركّبة لأنه يحل مشكلة أساسية في تجربة المستخدم. لنفهم لماذا:

**دون focus-within** (المقاربة التقليدية):

- حقل الإدخال الفعلي وحده يُظهر تنسيق التركيز
- النقر على الأزرار أو العناصر الأخرى بالداخل لا يُظهر أن حقل الإدخال «نشط»
- ينشئ تغذية بصرية مفككة ومربكة

**مع focus-within** (مقاربتنا):

- يُظهر حقل الإدخال المركّب كله التركيز عندما يتلقى أي عنصر ابن التركيز
- يوفّر تغذية بصرية موحّدة بصرف النظر عن العنصر المُركَّز عليه
- ينشئ وهم عنصر تحكّم إدخال واحد متماسك

هذا مهم بشكل خاص لإمكانية الوصول — يحصل مستخدمو قارئات الشاشة ومستخدمو التنقل بلوحة المفاتيح على تغذية متسقة بصرف النظر عن الجزء الذي يتفاعلون معه من حقل الإدخال المركّب.

## إضافة الصقل وإمكانية الوصول

لنعزّز حقول الإدخال بخصائص ARIA سليمة وتنسيق مُحسَّن لمكوّن جاهز للإنتاج.

*إضافة الصقل وإمكانية الوصول — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ff3b981a3b4d86c89945c05217851db283744966d3ac9ad7f9967c54e45759c1.html)*

```html
<div class="space-y-6">
  <div>
    <label for="search-enhanced" class="block text-sm font-medium text-slate-900"
      >Search products</label
    >
    <div class="mt-2" role="search">
      <div
        class="group flex rounded-md bg-white shadow-sm outline-1 -outline-offset-1 outline-slate-300 transition-all duration-200 focus-within:shadow-md focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 hover:shadow-md"
      >
        <div
          class="flex items-center pl-3 text-slate-400 transition-colors group-focus-within:text-indigo-500"
        >
          🔍
        </div>
        <input
          type="text"
          name="search-enhanced"
          id="search-enhanced"
          class="peer block w-full border-0 bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-sm"
          placeholder="Search for products, brands, or categories..."
          aria-describedby="search-help"
        />
        <button
          type="button"
          class="hidden items-center px-2 text-slate-400 transition-colors peer-[:not(:placeholder-shown)]:flex hover:text-slate-600 focus:text-indigo-600 focus:outline-none"
          aria-label="Clear search input"
          tabindex="-1"
        >
          ✕
        </button>
        <button
          type="submit"
          class="flex items-center rounded-r-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
          aria-label="Search products"
        >
          <span class="hidden sm:block">Search</span>
          <span class="sm:hidden">🔍</span>
        </button>
      </div>
      <p id="search-help" class="mt-2 text-sm text-slate-500">
        Try searching for "wireless headphones" or "laptop stand"
      </p>
    </div>
  </div>
</div>
```

تحسينات إمكانية الوصول والصقل:

- `role="search"`: يحدّد منطقة البحث للتقنيات المساعدة
- `aria-describedby="search-help"`: يربط حقل الإدخال بنص وصفي مفيد
- خصائص `aria-label` على الأزرار: توفّر أوصافًا واضحة لقارئات الشاشة
- `tabindex="-1"` على زر المسح: يستبعده من ترتيب Tab عند إخفائه (تحسين لتجربة المستخدم)
- `shadow-sm focus-within:shadow-md`: تغيّرات ارتفاع خفيفة عند التركيز
- `sm:text-sm`: طباعة متجاوبة تمنع التكبير على الهاتف المحمول
- `transition-all duration-200`: حركات سلسة لكل تغيّرات الحالة

تنشئ هذه التحسينات مكوّنًا ليس مصقولًا بصريًا فحسب، بل متاحًا بالكامل أيضًا لمستخدمي التقنيات المساعدة.

## لماذا تنجح هذه المقاربة

يستفيد نمط حقل الإدخال المركّب الذي بنيناه من عدة أدوات Tailwind قوية تعمل بتناغم:

**focus-within ينشئ سلوك تركيز موحّدًا**: تستجيب حاوية الإدخال كلها عندما يتلقى أي عنصر ابن التركيز، ما ينشئ تجربة مستخدم متماسكة تبدو كعنصر تحكّم واحد.

**محدِّدات peer تمكّن تفاعلات ذكية**: لا يظهر زر المسح إلا عند وجود محتوى لمسحه، ما يقلل الفوضى البصرية ويوفّر إجراءات سياقية.

**أدوات group تنسّق تأثيرات التمرير**: يمكن لعدة عناصر الاستجابة لتفاعلات على مستوى الحاوية، ما ينشئ تغذية بصرية متطورة.

**إمكانية الوصول مدمجة**: يضمن استخدام عناصر HTML دلالية (حقول إدخال وأزرار حقيقية) مع خصائص ARIA سليمة أن يعمل المكوّن مع التقنيات المساعدة.

**بنية مرنة**: يعمل النمط نفسه مع حقول البحث وحقول كلمات المرور وحقول URL أو أي نمط إدخال مركّب يحتاجه تطبيقك.

## تحديات

جرّب بناء هذه التنويعات:

1. **إدخال مركّب متعدد الحقول**: أنشئ حقل إدخال مركّبًا لإدخال رقم هاتف بحقول منفصلة لرمز الدولة ورمز المنطقة والرقم، باستخدام `focus-within` لتنسيق المجموعة كلها كوحدة واحدة.
2. **حقل إدخال بقائمة منسدلة ذكية**: ابنِ حقل إدخال بزر قائمة منسدلة داخلي يُظهر/يخفي الاقتراحات، بدمج الأنماط من هذا الدرس مع التقنيات من [درس كشف التفاصيل](https://stevekinney.com/courses/tailwind/building-details-disclosure) لإنشاء مكوّن اختيار قابل للبحث.
