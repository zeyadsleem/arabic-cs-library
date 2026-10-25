---
title: "بناء نافذة منبثقة"
lang: ar
source: "https://stevekinney.com/courses/tailwind/building-a-modal"
---

لنبدأ ببنية HTML الأساسية لدينا لمكوّن نافذة منبثقة (modal dialog).

```html
<div>
  <button>Open Modal</button>

  <dialog>
    <div>
      <header>
        <h2>Modal Title</h2>
        <button>×</button>
      </header>
      <main>
        <p>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        </p>
      </main>
      <footer>
        <button>Close</button>
      </footer>
    </div>
  </dialog>
</div>
```

إنه عنصر `<dialog>` دلالي ببنية محتوى سليمة، لكنه بلا أي تنسيق على الإطلاق، ويختلف مظهر الحوار الأصلي اختلافًا كبيرًا بين المتصفحات. لنحوّله إلى نافذة منبثقة مصقولة تشبه الحديثة والاحترافية.

## تنسيق زر التشغيل

أولًا، لننسّق زر التشغيل لدينا مستخدمين الأنماط التي تعلّمناها في [درس الزر](https://stevekinney.com/courses/tailwind/building-a-button).

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog>
    <div>
      <header>
        <h2>Modal Title</h2>
        <button>×</button>
      </header>
      <main>
        <p>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        </p>
      </main>
      <footer>
        <button>Close</button>
      </footer>
    </div>
  </dialog>
</div>
```

تنسيق الزر:

- `bg-blue-600 hover:bg-blue-500`: لون أساسي أزرق مع حالة تمرير أفتح
- `px-4 py-2`: حشوة أفقية 16px ورأسية 8px توفّر أهداف لمس مريحة
- `text-sm font-semibold`: نص بوزن نصف عريض بحجم 14px من أجل الوضوح
- `shadow-sm`: عمق خفيف يجعل الزر يبدو قابلًا للنقر
- `focus-visible:outline-*`: حلقة تركيز متاحة للتنقل بلوحة المفاتيح

هذا يمنحنا زر تشغيل احترافيًا يوضّح بجلاء أنه سيفتح شيئًا مهمًا.

## إنشاء خلفية النافذة المنبثقة

الآن لننسّق عنصر الحوار نفسه. يوفّر عنصر `<dialog>` الأساس الدلالي، لكننا بحاجة إلى تجاوز تنسيقه الافتراضي للحصول على مظهر حديث.

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog class="backdrop:bg-black/50 backdrop:backdrop-blur-sm">
    <div>
      <header>
        <h2>Modal Title</h2>
        <button>×</button>
      </header>
      <main>
        <p>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        </p>
      </main>
      <footer>
        <button>Close</button>
      </footer>
    </div>
  </dialog>
</div>
```

تنسيق الخلفية:

- `backdrop:bg-black/50`: خلفية سوداء شبه شفافة (شفافية 50%) تعتّم المحتوى الموجود خلفها
- `backdrop:backdrop-blur-sm`: تأثير تمويه خفيف يخلق عمقًا ويبرز محتوى النافذة المنبثقة

تنسّق أدوات العنصر الزائف `backdrop:` خلفية الحوار الأصلية في المتصفح، فتُنشئ تأثير تراكب احترافيًا دون الحاجة إلى عناصر HTML إضافية.

## تموضع النافذة المنبثقة وتحجيمها

لنتموضع النافذة المنبثقة بشكل صحيح ونُنشئ بنية الحاوية الرئيسية باستخدام التقنيات التي تعلّمناها في [درس البطاقة](https://stevekinney.com/courses/tailwind/building-a-card).

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog
    class="m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <div>
      <header>
        <h2>Modal Title</h2>
        <button>×</button>
      </header>
      <main>
        <p>
          This is the modal content. You can put any content here that you want to display in the
          modal.
        </p>
      </main>
      <footer>
        <button>Close</button>
      </footer>
    </div>
  </dialog>
</div>
```

تنسيق حاوية النافذة المنبثقة:

- `m-auto`: يوسّط النافذة المنبثقة أفقيًا ورأسيًا باستخدام الهوامش التلقائية
- `w-full max-w-md`: عرض كامل حتى حد أقصى قدره 448px من أجل قابلية قراءة مثلى
- `h-fit`: يتكيّف الارتفاع مع المحتوى بدلًا من ملء إطار العرض
- `rounded-lg bg-white`: نصف قطر حد 8px وخلفية بيضاء لمظهر بطاقة حديث
- `shadow-lg`: ظل واضح يخلق فصلًا محسوسًا عن الخلفية
- `p-0`: إزالة حشوة الحوار الافتراضية حتى نتحكّم في التباعد من الداخل

تضمن أداة `m-auto` توسيطًا متسقًا عبر جميع المتصفحات عبر ضبط `margin: auto` على جميع الجهات، متجاوزة أي خصوصيات خاصة بموضع الحوار في المتصفح.

## هيكلة محتوى النافذة المنبثقة

الآن لنُهيكل منطقة الترويسة والمحتوى الرئيسي والتذييل بشكل صحيح مع تباعد وتسلسل بصري ملائمين.

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog
    class="m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <div class="flex flex-col">
      <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 class="text-lg font-semibold text-slate-900">Modal Title</h2>
        <button class="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
          ×
        </button>
      </header>
      <main class="px-6 py-4">
        <p class="text-slate-700">
          This is the modal content. You can put any content here that you want to display in the
          modal.
        </p>
      </main>
      <footer class="border-t border-slate-200 px-6 py-4">
        <button
          class="rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-500"
        >
          Close
        </button>
      </footer>
    </div>
  </dialog>
</div>
```

تحسينات بنية المحتوى:

- `flex flex-col`: تخطيط flexbox عمودي لأقسام الترويسة والمحتوى الرئيسي والتذييل
- `border-b border-slate-200`: فاصل خافت أسفل الترويسة لتنظيم بصري
- `px-6 py-4`: حشوة أفقية 24px ورأسية 16px متسقة عبر الأقسام
- `flex items-center justify-between`: يوزّع العنوان وزر الإغلاق على عرض الترويسة
- `text-lg font-semibold`: عنوان بارز يؤسّس تسلسل المحتوى
- `text-slate-700`: لون نص المتن خافت قليلًا من أجل قراءة مريحة
- زر إغلاق مع حالات تمرير لتغذية راجعة تفاعلية واضحة

تخلق الحشوة والحدود المتسقة مناطق محتوى واضحة مع الحفاظ على التماسك البصري.

## تحسين زر الإغلاق

لنحسّن زر الإغلاق في الترويسة لنجعله أكثر إتاحة وملاذًا بصريًا، انطلاقًا من فهمنا لحالات التركيز.

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog
    class="m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <div class="flex flex-col">
      <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 class="text-lg font-semibold text-slate-900">Modal Title</h2>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          <span class="text-xl leading-none">×</span>
        </button>
      </header>
      <main class="px-6 py-4">
        <p class="text-slate-700">
          This is the modal content. You can put any content here that you want to display in the
          modal.
        </p>
      </main>
      <footer class="border-t border-slate-200 px-6 py-4">
        <button
          class="rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          Close
        </button>
      </footer>
    </div>
  </dialog>
</div>
```

تحسينات زر الإغلاق:

- `flex h-8 w-8 items-center justify-center`: زر مربع بمقاس 32px ومحتوى موسَّط
- `text-xl leading-none`: رمز × أكبر مع ارتفاع سطر ضيق لتوازن بصري أفضل
- `transition-colors`: تغيّرات لونية سلسة عند التمرير والتركيز
- `focus-visible:outline-slate-500`: حلقة تركيز متاحة تتوافق مع الطابع الخافت للزر
- أنماط تمرير وتركيز متسقة مع زر الإغلاق في التذييل

الصيغة المربعة مع الحشوة السخية تخلق هدف لمس مريحًا، بينما تحافظ الألوان الخافتة على حضوره دون لفت الانتباه.

## إضافة تنويعات الأزرار والتخطيط

لنُعزِّز التذييل بعدة خيارات للأزرار وتباعد صحيح.

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog
    class="m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <div class="flex flex-col">
      <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 class="text-lg font-semibold text-slate-900">Confirm Action</h2>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          <span class="text-xl leading-none">×</span>
        </button>
      </header>
      <main class="px-6 py-4">
        <p class="text-slate-700">
          Are you sure you want to delete this item? This action cannot be undone and will
          permanently remove the data from our servers.
        </p>
      </main>
      <footer class="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
        <button
          class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          Cancel
        </button>
        <button
          class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>
      </footer>
    </div>
  </dialog>
</div>
```

تحسينات التذييل:

- `flex justify-end gap-3`: أزرار محاذاة إلى اليمين مع تباعد 12px بينها
- زر إلغاء ثانوي بـ `border border-slate-300 bg-white`: حد خافت وخلفية بيضاء لوزن بصري أقل
- زر حذف أساسي بـ `bg-red-600`: اللون الأحمر يشير إلى إجراء مدمّر
- حالات تركيز و`transition-colors` متسقة عبر جميع العناصر التفاعلية
- محتوى أكثر واقعية يوضّح حالة استخدام نافذة التأكيد

توضّح تسلسل الأزرار بجلاء الإجراء الأساسي والثانوي مع الحفاظ على الأنماط البصرية المستقرة.

## إضافة حركات دخول سلسة

الآن لنضف حركات متقنة باستخدام متغيّر Tailwind `starting:` لتحديد حالات البداية الأولية للرسوم المتحركة وخلق تأثيرات دخول سلسة.

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog
    class="animate-in fade-in zoom-in backdrop:animate-in backdrop:fade-in m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-xl duration-200 backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:duration-300 starting:scale-95 starting:opacity-0 backdrop:starting:opacity-0"
  >
    <div class="flex flex-col overflow-hidden">
      <header class="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
        <h2 class="text-lg font-semibold text-slate-900">Confirm Action</h2>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          <span class="text-xl leading-none" aria-hidden="true">×</span>
          <span class="sr-only">Close modal</span>
        </button>
      </header>
      <main class="px-4 py-4 sm:px-6">
        <p class="leading-relaxed text-slate-700">
          Are you sure you want to delete this item? This action cannot be undone and will
          permanently remove the data from our servers.
        </p>
      </main>
      <footer
        class="flex flex-col-reverse gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6"
      >
        <button
          class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          Cancel
        </button>
        <button
          class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>
      </footer>
    </div>
  </dialog>
</div>
```

تحسينات الحركة:

- `starting:opacity-0 starting:scale-95`: يحدد الحالة الأولية — غير مرئي وأصغر قليلًا (قياس 95%)
- `animate-in fade-in zoom-in duration-200`: يحرّك نحو الشفافية الكاملة والقياس الكامل خلال 200ms
- `backdrop:starting:opacity-0`: يضبط الحالة الأولية للخلفية على الشفافية
- `backdrop:animate-in backdrop:fade-in backdrop:duration-300`: تلاشي الخلفية خلال 300ms لتأثير حركة متدرّج الطبقات
- `shadow-xl`: ظل محسّن لعمق أكثر دراماتيكية
- `overflow-hidden`: يضمن احترام المحتوى لزوايا النافذة المنبثقة المستديرة

متغيّر `starting:` جوهري هنا — فهو يضبط الحالة الأولية قبل أن تبدأ الحركة، فتُنشأ تأثيرات دخول سلسة. تبدأ النافذة المنبثقة غير مرئية ومصغّرة قليلًا، ثم تتحرك نحو حالتها النهائية عند الفتح.

## إضافة السلوك المتجاوب والتلميع النهائي

أخيرًا، لنضف السلوك المتجاوب لمزيد من التلميع حتى تبدو النافذة المنبثقة احترافية على جميع الأجهزة.

```html
<div>
  <button
    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    Open Modal
  </button>

  <dialog
    class="animate-in fade-in zoom-in backdrop:animate-in backdrop:fade-in m-auto h-fit w-full max-w-md rounded-lg bg-white p-0 shadow-xl duration-200 backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:duration-300 starting:scale-95 starting:opacity-0 backdrop:starting:opacity-0"
  >
    <div class="flex flex-col overflow-hidden">
      <header class="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
        <h2 class="text-lg font-semibold text-slate-900">Confirm Action</h2>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          <span class="text-xl leading-none" aria-hidden="true">×</span>
          <span class="sr-only">Close modal</span>
        </button>
      </header>
      <main class="px-4 py-4 sm:px-6">
        <p class="leading-relaxed text-slate-700">
          Are you sure you want to delete this item? This action cannot be undone and will
          permanently remove the data from our servers.
        </p>
      </main>
      <footer
        class="flex flex-col-reverse gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6"
      >
        <button
          class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          Cancel
        </button>
        <button
          class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>
      </footer>
    </div>
  </dialog>
</div>
```

ميزات الاستجابة وإمكانية الوصول:

- `px-4 sm:px-6`: حشوة متجاوبة أكثر إحكامًا على الجوال (16px) وأوسع على الشاشات الأكبر (24px)
- `flex-col-reverse sm:flex-row sm:justify-end`: أزرار مكدّسة على الجوال مع الإجراء الأساسي في الأعلى، وتخطيط أفقي على الشاشات الأكبر
- `sr-only`: نص لقارئات الشاشة لأيقونة زر الإغلاق
- `aria-hidden="true"`: يخفي رمز × عن قارئات الشاشة لأننا نقدّم نصًا وصفيًا
- `leading-relaxed`: ارتفاع سطر أكثر راحة للنص الوصفي الأطول

يضمن تخطيط التذييل المتجاوب أن الإجراء الأساسي (حذف) يبقى متاحًا بسهولة دائمًا — في الأعلى للتفاعل المريح بالإبهام على الجوال، وعلى اليمين لأنماط الفأرة على سطح المكتب.

## لماذا ينجح هذا الأسلوب

يجمع تنفيذ النافذة المنبثقة هذا بين ميزات CSS الحديثة وHTML الدلالي للحصول على أفضل تجربة للمستخدم:

**توسيط مثالي**: تضمن أداة `m-auto` توسيطًا متسقًا عبر جميع المتصفحات، متجاوزة أي خصوصيات خاصة بالمتصفح في الموضع الافتراضي لعنصر `<dialog>`.

**حركات سلسة**: يحدد متغيّر `starting:` حالات البداية الأولية للحركة بوضوح، فتُنشأ تأثيرات دخول احترافية تبدو مصقولة ومقصودة.

**أساس دلالي**: يوفّر عنصر `<dialog>` معالجة لوحة مفاتيح مدمجة (Escape للإغلاق)، وإدارة للتركيز، ودعمًا لقارئات الشاشة دون أي JavaScript إضافي.

**توقيت حركة متدرّج الطبقات**: تتحرك محتويات النافذة المنبثقة أسرع (200ms) من الخلفية (300ms)، فيُخلق تأثير متدرّج الطبقات يبدأ بفتّح الخلفية ثم ظهور المحتوى.

**تصميم متجاوب**: تتكيّف النافذة المنبثقة من أزرار مكدّسة تبدأ من الجوال إلى تخطيطات أفقية محسّنة لسطح المكتب من دون أن تفقد سهولة الاستخدام.

## حالات الاستخدام الشائعة

يعمل نمط النافذة المنبثقة هذا بشكل ممتاز مع:

- نوافذ التأكيد للإجراءات المدمّرة
- النماذج التي تحتاج إلى تركيز الانتباه (تسجيل الدخول، نماذج الاتصال)
- معاينات الصور أو المحتوى
- لوحات الإعدادات التي تحتاج إلى عزل عن المحتوى الرئيسي
- رسائل التنبيه التي تتطلب تأكيد المستخدم
