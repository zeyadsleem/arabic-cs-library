---
title: "أدوات has-*"
lang: ar
source: "https://stevekinney.com/courses/tailwind/has-utility"
---

تستند أدوات `has-*` في Tailwind CSS إلى الفئة الزائفة `:has()` في CSS، وتتيح للعناصر الأب أن تنسّق نفسها بناءً على حالة أبنائها. فكّر فيها كأنها تقول: «إن كانت هذه الحاوية تحتوي على عنصر تابع يطابق الشرط `$condition`، فنسّق الحاوية هكذا.»

لنبدأ ببنية HTML الأساسية لدينا لاستكشاف هذه الأدوات القوية.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b8e495266f6b29bafcc52e060b2d8d73f87ae96050d1a714b52d46fac5bff74f.html)*

```html
<div>
  <input type="checkbox" id="terms-0" />
  <label for="terms-0">I agree to the terms</label>
</div>
```

إنه مربع اختيار وتسمية أساسيان، لكن بأدوات `has-*` يمكننا جعل الحاوية كلها تستجيب بذكاء لحالة مربع الاختيار.

## استجابة الحاوية الأساسية

أولًا، لنجعل الحاوية تستجيب لحالة مربع الاختيار التابع لها.

*استجابة الحاوية الأساسية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/995ebf5dc4a52ae6f81834d001afc8a9b88488313c587d7e275830eec5af1d90.html)*

```html
<div
  class="flex items-center gap-3 rounded-lg border p-4 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50"
>
  <input type="checkbox" id="terms-1" class="h-4 w-4" />
  <label for="terms-1" class="text-slate-900">I agree to the terms</label>
</div>
```

تنفيذ `has-*` الأساسي:

- `has-[input:checked]:border-green-500`: عندما تحتوي الحاوية على حقل إدخال محدَّد، يصبح الحد أخضر
- `has-[input:checked]:bg-green-50`: عندما تحتوي الحاوية على حقل إدخال محدَّد، تصبح الخلفية خضراء فاتحة
- تستجيب الحاوية كلها تلقائيًا لحالة مربع الاختيار.

هذا مختلف جوهريًا عن أدوات `peer-*` — فبدلًا من أن يؤثر الأشقاء في بعضهم، يستجيب الآباء للأبناء.

## حاويات التحقق من النماذج

*حاويات التحقق من النماذج — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/139e27eb57f558a2d13c894608b86ad5234450e8a11535ebb280bf6456fdec87.html)*

```html
<div class="space-y-4">
  <div
    class="rounded-lg border p-4 transition-colors has-[input:invalid]:border-red-500 has-[input:invalid]:bg-red-50 has-[input:valid]:border-green-500 has-[input:valid]:bg-green-50"
  >
    <label class="block text-sm font-medium">Email</label>
    <input
      type="email"
      required
      class="mt-1 block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 invalid:border-red-600 focus:border-blue-500 focus:outline-none"
    />
  </div>

  <div class="rounded-lg border p-4 has-[input:focus]:border-blue-500 has-[input:focus]:bg-blue-50">
    <label class="block text-sm font-medium">Password</label>
    <input
      type="password"
      class="mt-1 block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none"
    />
  </div>
</div>
```

ميزات التحقق من النماذج:

- `has-[input:valid]:border-green-500`: تتحول الحاوية إلى الأخضر عندما يكون الإدخال صحيحًا
- `has-[input:invalid]:border-red-500`: تتحول الحاوية إلى الأحمر عندما يكون الإدخال غير صحيح
- `has-[input:focus]:border-blue-500`: تبرز الحاوية عندما يكون الإدخال في حالة تركيز
- `transition-colors`: انتقالات حالة سلسة.

توفّر حاوية حقل النموذج كلها تغذية بصرية، لا حقل الإدخال وحده.

## أنماط اختيار البطاقات

لنبنِ بطاقات تفاعلية تستجيب لعناصر تحكم النماذج المتداخلة، وهي مثالية لجداول الأسعار أو اختيار الخيارات.

*أنماط اختيار البطاقات — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f6243b761e14d1371f444e0e3eecbaae9ed7536f24416e59ebcb760d74fd7331.html)*

```html
<div class="grid gap-4 md:grid-cols-3">
  <div
    class="rounded-lg border-2 p-4 transition-all has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-50 has-[input:checked]:shadow-md"
  >
    <input type="radio" name="plan" id="basic" class="mb-3 h-4 w-4" />
    <label for="basic" class="cursor-pointer">
      <h3 class="font-semibold">Basic Plan</h3>
      <p class="text-sm text-slate-600">For individuals</p>
      <div class="mt-2 text-xl font-bold">$9/month</div>
    </label>
  </div>

  <div
    class="rounded-lg border-2 p-4 transition-all has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-50 has-[input:checked]:shadow-md"
  >
    <input type="radio" name="plan" id="pro" class="mb-3 h-4 w-4" />
    <label for="pro" class="cursor-pointer">
      <h3 class="font-semibold">Pro Plan</h3>
      <p class="text-sm text-slate-600">For teams</p>
      <div class="mt-2 text-xl font-bold">$29/month</div>
    </label>
  </div>

  <div
    class="rounded-lg border-2 p-4 transition-all has-[input:checked]:border-blue-500 has-[input:checked]:bg-blue-50 has-[input:checked]:shadow-md"
  >
    <input type="radio" name="plan" id="enterprise" class="mb-3 h-4 w-4" />
    <label for="enterprise" class="cursor-pointer">
      <h3 class="font-semibold">Enterprise</h3>
      <p class="text-sm text-slate-600">For organizations</p>
      <div class="mt-2 text-xl font-bold">$99/month</div>
    </label>
  </div>
</div>
```

تنسيق اختيار البطاقات:

- `has-[input:checked]:border-blue-500`: البطاقة المختارة تحصل على حد أزرق
- `has-[input:checked]:bg-blue-50`: البطاقة المختارة تحصل على خلفية فاتحة
- `has-[input:checked]:shadow-md`: البطاقة المختارة تحصل على ظل مرتفع

مثالية لجداول الأسعار أو مقارنات الميزات أو أي واجهة اختيار متعددة الخيارات.

## المحدّدات المركّبة والاستهداف

تدعم أدوات `has-*` محدّدات CSS المركّبة لعلاقات أب-ابن متطورة.

*المحدّدات المركّبة والاستهداف — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9b0ab93f1909621abbdb15aa02dbe68e7b2f40eb66f6f69bf257b244f6fcd23f.html)*

```html
<div class="space-y-4">
  <!-- Multiple checkbox detection -->
  <div class="rounded-lg border p-4 has-[input:checked]:bg-slate-50">
    <h3 class="font-semibold has-[input:checked]:text-green-700">Project Settings</h3>
    <div class="mt-3 space-y-2">
      <label class="flex items-center gap-2">
        <input type="checkbox" class="h-4 w-4" />
        <span class="text-sm">Enable notifications</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" class="h-4 w-4" />
        <span class="text-sm">Auto-save drafts</span>
      </label>
    </div>
  </div>

  <!-- Element-specific targeting -->
  <div
    class="rounded-lg border p-4 has-[select:focus]:border-pink-500 has-[textarea:focus]:border-green-500"
  >
    <div class="space-y-3">
      <select
        class="block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        <option disabled>Choose department</option>
        <option>Engineering</option>
        <option>Design</option>
        <option>Product</option>
      </select>
      <textarea
        class="block w-full rounded border-2 border-slate-300 bg-white px-3 py-2 focus:border-green-500 focus:outline-none"
        rows="2"
      ></textarea>
    </div>
  </div>

  <!-- Attribute-based targeting -->
  <div class="rounded-lg border p-4 has-[input[type='file']]:border-dashed">
    <input type="file" class="block w-full text-sm" />
  </div>
</div>
```

أمثلة على المحدّدات المركّبة:

- `has-[input:checked]:bg-slate-50`: يستجيب لأي حقل إدخال محدَّد من العناصر التابعة
- `has-[select:focus]:border-blue-500`: ألوان مختلفة لأنواع عناصر مختلفة
- `has-[input[type='file']]:border-dashed`: يستهدف أنواع إدخال محددة باستخدام الخصائص

يوضّح هذا كيف يمكنك إنشاء حاويات واعية بالسياق تستجيب لعناصر تابعة مختلفة بشكل مختلف.

## كشف حالة التنقل

تتفوّق أدوات `has-*` في إنشاء أنظمة تنقل ذكية تستجيب لتفاعل المستخدم.

*كشف حالة التنقل — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2712304a0554562bcf7ade2b5ad0f4456cf655cd750c67d9ae5ab30320c84cfd.html)*

```html
<nav class="rounded-lg bg-white shadow-sm">
  <!-- Dropdown state detection -->
  <div class="has-[details[open]]:bg-pink-400">
    <details>
      <summary class="cursor-pointer px-4 py-3 text-sm font-medium">More Options</summary>
      <div class="border-t px-4 py-2">
        <a href="#" class="block py-1 text-sm text-slate-700">Help</a>
        <a href="#" class="block py-1 text-sm text-slate-700">Support</a>
      </div>
    </details>
  </div>

  <!-- Search focus detection -->
  <div class="border-t p-4 has-[input:focus]:bg-blue-50">
    <input
      type="search"
      placeholder="Search…"
      class="w-full rounded border-2 border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
    />
  </div>
</nav>
```

تحسينات التنقل:

- `has-[a.active]:bg-blue-50`: يبرز التنقل عندما يحتوي على رابط نشط
- `has-[details[open]]:bg-slate-50`: تتغير حاوية القائمة المنسدلة عند فتحها
- `has-[input:focus]:bg-blue-50`: تبرز منطقة البحث عندما يكون الإدخال في حالة تركيز

ينشئ هذا تنقلًا تستجيب فيه الأقسام كلها لحالات تفاعل المستخدم.

## اختيار صفوف جدول البيانات

مثالي لواجهات الإدارة حيث تحتاج الصفوف كلها إلى الاستجابة لحالات الاختيار.

*اختيار صفوف جدول البيانات — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/642c0a548e887c72f42e2dbe0a36ea24cf05abba02bd0cd241580ca38ee3273c.html)*

```html
<div class="overflow-hidden rounded-lg border bg-white">
  <div class="divide-y">
    <div
      class="flex items-center gap-4 px-4 py-3 transition-colors has-[input:checked]:border-l-4 has-[input:checked]:border-l-blue-500 has-[input:checked]:bg-blue-50"
    >
      <input type="checkbox" class="h-4 w-4" />
      <div class="flex-1">
        <div class="font-medium">Sarah Chen</div>
        <div class="text-sm text-slate-500">sarah@example.com</div>
      </div>
      <span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
        >Active</span
      >
    </div>

    <div
      class="flex items-center gap-4 px-4 py-3 transition-colors has-[input:checked]:border-l-4 has-[input:checked]:border-l-blue-500 has-[input:checked]:bg-blue-50"
    >
      <input type="checkbox" class="h-4 w-4" />
      <div class="flex-1">
        <div class="font-medium">Mike Rodriguez</div>
        <div class="text-sm text-slate-500">mike@example.com</div>
      </div>
      <span class="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
        >Pending</span
      >
    </div>
  </div>
</div>
```

ميزات صفوف الجدول:

- `has-[input:checked]:bg-blue-50`: الصفوف المختارة تحصل على إبراز.
- `has-[input:checked]:border-l-4`: الصفوف المختارة تحصل على حد أيسر بارز.
- `transition-colors`: انتقالات حالة سلسة.

ينشئ هذا واجهات اختيار بديهية توفّر فيها الصفوف كلها تغذية بصرية.

## لوحة الإجراءات المجمّعة

أنشئ لوحات إجراءات تظهر عند اختيار العناصر.

*لوحة الإجراءات المجمّعة — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/03f8af7e410729b4227d90f7ebc906eb8709a3f5001288c2f4d7249158c77651.html)*

```html
<div class="space-y-4">
  <!-- Product grid -->
  <div class="grid gap-4 md:grid-cols-3">
    <div
      class="rounded border p-3 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50"
    >
      <input type="checkbox" class="mb-2 h-4 w-4" />
      <h4 class="font-medium">Wireless Headphones</h4>
      <p class="text-xl font-bold">$199</p>
    </div>

    <div
      class="rounded border p-3 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50"
    >
      <input type="checkbox" class="mb-2 h-4 w-4" />
      <h4 class="font-medium">Smart Watch</h4>
      <p class="text-xl font-bold">$299</p>
    </div>

    <div
      class="rounded border p-3 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50"
    >
      <input type="checkbox" class="mb-2 h-4 w-4" />
      <h4 class="font-medium">Laptop Stand</h4>
      <p class="text-xl font-bold">$79</p>
    </div>
  </div>

  <!-- Bulk actions (appears when any item selected) -->
  <div class="hidden rounded bg-slate-50 p-4 has-[input:checked]:block">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">Items selected</span>
      <div class="flex gap-2">
        <button class="rounded border px-3 py-1 text-sm hover:bg-white">Compare</button>
        <button class="rounded bg-green-600 px-3 py-1 text-sm text-white">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
```

ميزات الإجراءات المجمّعة:

- `has-[input:checked]:block hidden`: تظهر اللوحة عندما يُحدَّد أي مربع اختيار
- تعمل عبر عدة عناصر تابعة تلقائيًا
- مثالية لواجهات التجارة الإلكترونية والإدارة

## لماذا هذا أمر مهم حقًا™

تمثّل أدوات `has-*` تحولًا جوهريًا في قدرات CSS:

- **قبل `:has()`**: كانت علاقات الحالة بين الأب والابن تتطلب معالجة أحداث JavaScript وإدارة الأصناف يدويًا.
- **مع `has-*`**: تعمل الأنماط التفاعلية المتطورة بـ CSS خالص.

### المزايا الرئيسية

- **الأداء**: لا حاجة إلى عبء JavaScript
- **إمكانية الوصول**: تعمل بسلاسة مع عناصر تحكم النماذج الأصلية
- **قابلية الصيانة**: علاقات الحالة معبَّر عنها مباشرة في الترميز
- **التحسين التدريجي**: تعمل حتى إن فشل تحميل CSS

**دعم المتصفحات**: مدعومة في جميع المتصفحات الحديثة (Chrome 105+، Firefox 121+، Safari 15.4+).

### تحديات

جرّب بناء هذه الاختلافات:

1. **نموذج متعدد الخطوات**: أنشئ نموذجًا من 3 خطوات تستجيب فيه حاوية كل خط لاكتمال الإدخال باستخدام شروط `has-[input:valid]`
2. **مقاييس لوحة المعلومات**: ابنِ بطاقات مقاييس يمكن اختيارها للمقارنة، مع لوحة مقارنة تظهر عند اختيار عدة بطاقات

تفتح أدوات `has-*` إمكانات جديدة قوية لإنشاء واجهات ذكية متجاوبة مع الحفاظ على HTML الدلالي والأداء الممتاز.

## أمثلة

### حسب المحتوى

*حسب المحتوى — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/3d14dd57bce115859ae084370b72d5e03cec944faef1150447525523c3eb1643.html)*

```html
<article class="gap-4 rounded-lg border bg-white p-4 has-[img]:flex">
  <img src="https://picsum.photos/seed/picsum/600/400" class="h-64 w-64 rounded object-cover" />
  <div>
    Meow ipsum dolor sit amet, consectetur adipiscing kitty, sed do eiusmod tempor purr purr ut
    labore et dolore magna whiskers. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo tuna treats.
  </div>
</article>
```

## أنماط شائعة

**مؤشرات التحقق من النماذج:**

*أنماط شائعة — المثال 10 — [افتح المثال](https://stevekinney.com/generated/playgrounds/23398c4aa0bd9b44a67022836d335f61d7c011a9a94a8a729608aa219b3767e4.html)*

```html
<label class="mb-2 block text-sm font-medium has-[:invalid]:text-red-500">
  Email
  <input
    type="email"
    placeholder="Enter your email address"
    required
    class="w-full rounded border-2 border-slate-300 bg-white px-3 py-2 invalid:border-red-500 focus:border-blue-500 focus:outline-none"
  />
</label>
```

## فروق أساسية

- **`has-*`** - ينسّق العنصر الذي يحتوي على الهدف
- **`group-has-*`** - ينسّق العنصر التابع عندما يحتوي السلف على الهدف
- **`peer-has-*`** - ينسّق الشقيق عندما يحتوي الشقيق السابق على الهدف
