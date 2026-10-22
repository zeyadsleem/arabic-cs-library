---
title: "بناء لوحة معلومات"
---

لنبدأ ببنية HTML الأساسية الخاصة بلوحة تحليلات بسيطة.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9e6301a79256ecbddf274bd3c977a5d19a40d794ac5b08b03158c14b1d42d965.html)*

```html
<div class="space-y-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">
    <h1 class="text-lg font-bold">Analytics Dashboard</h1>
    <div class="mt-2 flex gap-4">
      <span class="rounded bg-white px-2 py-1 text-sm">Welcome back, Sarah</span>
      <button class="rounded bg-blue-600 px-3 py-1 text-sm text-white">Settings</button>
    </div>
  </div>
  <div class="rounded bg-green-200 p-4">
    <nav class="space-y-2">
      <a href="#" class="block rounded bg-white px-3 py-2 text-blue-600">Overview</a>
      <a href="#" class="block rounded bg-white px-3 py-2 text-blue-600">Analytics</a>
      <a href="#" class="block rounded bg-white px-3 py-2 text-blue-600">Reports</a>
      <a href="#" class="block rounded bg-white px-3 py-2 text-blue-600">Settings</a>
    </nav>
  </div>
  <div class="rounded bg-yellow-200 p-4">
    <h2 class="mb-3 font-semibold">Recent Activity</h2>
    <div class="space-y-2">
      <div class="rounded bg-white p-3">1,234 Total Users</div>
      <div class="rounded bg-white p-3">$45,678 Revenue</div>
      <div class="rounded bg-white p-3">12.5% Growth</div>
    </div>
  </div>
  <div class="rounded bg-purple-200 p-4">
    <h3 class="mb-3 font-semibold">Quick Stats</h3>
    <div class="space-y-2">
      <div class="rounded bg-white p-2 text-sm">Sessions: 8,432</div>
      <div class="rounded bg-white p-2 text-sm">Bounce Rate: 24%</div>
      <div class="rounded bg-white p-2 text-sm">Avg. Duration: 3:42</div>
    </div>
  </div>
</div>
```

لدينا لوحة معلومات فيها ترويسة وتنقّل جانبي ومحتوى رئيسي ولوحة إحصاءات، لكنها جميعًا مكدّسة رأسيًا. لنحوّلها إلى تخطيط متطوّر باستخدام مناطق قوالب الشبكة (Grid Template Areas) في CSS — وهو نهج أكثر دلالية من التموضع التقليدي بأعمدة الشبكة وصفوفها.

## فهم مناطق قوالب الشبكة

بخلاف التموضع الرقمي للشبكة الذي استخدمناه في دروس سابقة مثل [جدول الفاتورة](https://stevekinney.com/courses/tailwind/building-an-invoice-table)، تتيح لنا مناطق قوالب الشبكة تعريف مناطق مسمّاة في تخطيطنا. فكّر في الأمر كأنك ترسم خريطة بصرية لتخطيطك بأسماء ذات معنى بدل الأرقام.

لنضع الهيكل الأساسي لشبكتنا مع مناطق مسمّاة:

*فهم مناطق قوالب الشبكة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a94b99dbc1b9c3c7b46a29daf2d1f46d17c02eeeeb8aa02f0e72f1de0829cd7c.html)*

```html
<div
  class="grid h-screen grid-cols-[250px_1fr_200px] grid-rows-[auto_1fr] gap-4 p-4"
  style="grid-template-areas: 'header header header' 'sidebar main stats'"
>
  <div class="rounded-lg bg-white p-4 shadow-sm" style="grid-area: header">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
      <div class="flex items-center gap-4">
        <span class="text-slate-600">Welcome back, Sarah</span>
        <button class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
          Settings
        </button>
      </div>
    </div>
  </div>
  <div class="rounded-lg bg-white p-4 shadow-sm" style="grid-area: sidebar">
    <nav class="space-y-2">
      <a href="#" class="block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
        >Overview</a
      >
      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >Analytics</a
      >
      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >Reports</a
      >
      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >Settings</a
      >
    </nav>
  </div>
  <div class="rounded-lg bg-white p-6 shadow-sm" style="grid-area: main">
    <h2 class="mb-4 text-xl font-semibold text-slate-900">Recent Activity</h2>
    <div class="grid grid-cols-3 gap-4">
      <div class="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
        <div class="text-2xl font-bold">1,234</div>
        <div class="text-sm opacity-90">Total Users</div>
      </div>
      <div class="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
        <div class="text-2xl font-bold">$45,678</div>
        <div class="text-sm opacity-90">Revenue</div>
      </div>
      <div class="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
        <div class="text-2xl font-bold">12.5%</div>
        <div class="text-sm opacity-90">Growth</div>
      </div>
    </div>
  </div>
  <div class="rounded-lg bg-white p-4 shadow-sm" style="grid-area: stats">
    <h3 class="mb-3 text-lg font-semibold text-slate-900">Quick Stats</h3>
    <div class="space-y-3">
      <div class="text-sm">
        <div class="font-medium text-slate-900">Sessions</div>
        <div class="text-slate-600">8,432</div>
      </div>
      <div class="text-sm">
        <div class="font-medium text-slate-900">Bounce Rate</div>
        <div class="text-slate-600">24%</div>
      </div>
      <div class="text-sm">
        <div class="font-medium text-slate-900">Avg. Duration</div>
        <div class="text-slate-600">3:42</div>
      </div>
    </div>
  </div>
</div>
```

إعداد مناطق قوالب الشبكة:

- `grid-template-areas: 'header header header' 'sidebar main stats'`: يعرّف خريطة بصرية تمتدّ فيها الترويسة عبر الصف العلوي، بثلاثة أعمدة في الصف السفلي
- `grid-area: header`: يضع كل مكوّن في منطقته المسمّاة
- `grid-cols-[250px_1fr_200px]`: يضبط أحجام أعمدة محدّدة (شريط جانبي ثابت، محتوى رئيسي مرن، إحصاءات ثابتة)
- `grid-rows-[auto_1fr]`: يجعل حجم الترويسة محسوبًا من المحتوى، ويأخذ الصف الرئيسي المساحة المتبقّية

السحر يكمن في سلسلة `grid-template-areas` — فهي تمثيل بصري حرفي لتخطيطك! فكل كلمة تمثّل منطقة مسمّاة، والكلمات المتطابقة تنشئ مناطق ممتدّة.

## التحويل إلى أدوات Tailwind

الآن لنستبدل الأنماط المضمّنة بأدوات قوالب الشبكة في Tailwind، انطلاقًا من الأنماط التي تعلّمناها في [درس بطاقة الإحصاءات](https://stevekinney.com/courses/tailwind/building-a-statistics-card):

*التحويل إلى أدوات Tailwind — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/295f4acd04f31aae25bbb813ca78d37a500bce4fc6f83a2bfc72df4a74d39074.html)*

```html
<div
  class="grid h-screen grid-cols-[250px_1fr_200px] grid-rows-[auto_1fr] gap-4 p-4 [grid-template-areas:'header_header_header''sidebar_main_stats']"
>
  <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:header]">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
      <div class="flex items-center gap-4">
        <span class="text-slate-600">Welcome back, Sarah</span>
        <button
          class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Settings
        </button>
      </div>
    </div>
  </div>
  <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:sidebar]">
    <nav class="space-y-2">
      <a href="#" class="block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
        >Overview</a
      >
      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >Analytics</a
      >
      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >Reports</a
      >
      <a
        href="#"
        class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >Settings</a
      >
    </nav>
  </div>
  <div class="rounded-lg bg-white p-6 shadow-sm [grid-area:main]">
    <h2 class="mb-4 text-xl font-semibold text-slate-900">Recent Activity</h2>
    <div class="grid grid-cols-3 gap-4">
      <div class="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
        <div class="text-2xl font-bold">1,234</div>
        <div class="text-sm opacity-90">Total Users</div>
      </div>
      <div class="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
        <div class="text-2xl font-bold">$45,678</div>
        <div class="text-sm opacity-90">Revenue</div>
      </div>
      <div class="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
        <div class="text-2xl font-bold">12.5%</div>
        <div class="text-sm opacity-90">Growth</div>
      </div>
    </div>
  </div>
  <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:stats]">
    <h3 class="mb-3 text-lg font-semibold text-slate-900">Quick Stats</h3>
    <div class="space-y-3">
      <div class="text-sm">
        <div class="font-medium text-slate-900">Sessions</div>
        <div class="text-slate-600">8,432</div>
      </div>
      <div class="text-sm">
        <div class="font-medium text-slate-900">Bounce Rate</div>
        <div class="text-slate-600">24%</div>
      </div>
      <div class="text-sm">
        <div class="font-medium text-slate-900">Avg. Duration</div>
        <div class="text-slate-600">3:42</div>
      </div>
    </div>
  </div>
</div>
```

صيغة القيم العشوائية في Tailwind:

- `[grid-template-areas:'header_header_header''sidebar_main_stats']`: يستخدم ترميز الأقواس المربّعة لخصائص CSS المخصّصة
- `[grid-area:header]`: يُسند كل عنصر إلى منطقته في الشبكة
- أُضيف `hover:bg-blue-500` و`transition-colors` لتوفير تغذية راجعة تفاعلية

صيغة الأقواس `[property:value]` تتيح لنا استخدام أي خاصية CSS مع Tailwind، وهي مثالية للميزات الأحدث مثل مناطق قوالب الشبكة.

## إضافة الاستجابة عبر استعلامات الحاوية

الآن لنجعل لوحتنا مستجيبة بحق باستخدام استعلامات الحاوية، انطلاقًا من التقنيات التي تعلّمناها في [درس بطاقة الإحصاءات](https://stevekinney.com/courses/tailwind/building-a-statistics-card):

*إضافة الاستجابة عبر استعلامات الحاوية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d85de9e612583502b627aa9f9c92a6866d262dcaf7c5565008193aff775bc3c0.html)*

```html
<div class="@container">
  <div
    class="grid h-screen gap-4 p-4 @sm:grid-cols-1 @sm:grid-rows-[auto_auto_1fr_auto] @sm:[grid-template-areas:'header''sidebar''main''stats'] @xl:grid-cols-[250px_1fr_200px] @xl:grid-rows-[auto_1fr] @xl:[grid-template-areas:'header_header_header''sidebar_main_stats']"
  >
    <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:header]">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
        <div class="flex items-center gap-4">
          <span class="hidden text-slate-600 @md:block">Welcome back, Sarah</span>
          <button
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:sidebar]">
      <nav class="@sm:flex @sm:gap-2 @xl:block @xl:space-y-2">
        <a href="#" class="block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
          >Overview</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >Analytics</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >Reports</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >Settings</a
        >
      </nav>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-sm [grid-area:main]">
      <h2 class="mb-4 text-xl font-semibold text-slate-900">Recent Activity</h2>
      <div class="grid gap-4 @sm:grid-cols-1 @lg:grid-cols-3">
        <div class="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
          <div class="text-2xl font-bold">1,234</div>
          <div class="text-sm opacity-90">Total Users</div>
        </div>
        <div class="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
          <div class="text-2xl font-bold">$45,678</div>
          <div class="text-sm opacity-90">Revenue</div>
        </div>
        <div class="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
          <div class="text-2xl font-bold">12.5%</div>
          <div class="text-sm opacity-90">Growth</div>
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:stats]">
      <h3 class="mb-3 text-lg font-semibold text-slate-900">Quick Stats</h3>
      <div class="@sm:flex @sm:gap-4 @xl:block @xl:space-y-3">
        <div class="text-sm">
          <div class="font-medium text-slate-900">Sessions</div>
          <div class="text-slate-600">8,432</div>
        </div>
        <div class="text-sm">
          <div class="font-medium text-slate-900">Bounce Rate</div>
          <div class="text-slate-600">24%</div>
        </div>
        <div class="text-sm">
          <div class="font-medium text-slate-900">Avg. Duration</div>
          <div class="text-slate-600">3:42</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

سحر التخطيط المستجيب:

- نقطة توقف `@sm:` تكدّس كل شيء رأسيًا مع شبكة من عمود واحد وتنقّل أفقي
- نقطة توقف `@xl:` تعود إلى تخطيط الأعمدة الثلاثة مع التنقّل الجانبي
- يتكيّف التنقّل من flex أفقي على الجوال إلى block رأسي على سطح المكتب
- تتكيّف لوحة الإحصاءات من تخطيط أفقي إلى تخطيط رأسي
- تتكيّف بطاقات المحتوى الرئيسي من مكدّسة إلى شبكة من ثلاثة أعمدة

يبيّن هذا القوة الحقيقية للمناطق المسمّاة في الشبكة — يمكنك إعادة تشكيل تخطيطك بالكامل بمجرد تغيير سلسلة `grid-template-areas` وأبعاد الشبكة!

## فهم الميزة الدلالية

وهنا سببُ تقدّم مناطق قوالب الشبكة على التموضع الرقمي التقليدي للشبكة:

**النهج التقليدي:**

```css
.header {
  grid-column: 1 / 4;
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
.stats {
  grid-column: 3;
  grid-row: 2;
}
```

**نهج مناطق القوالب:**

```css
.container {
  grid-template-areas:
    'header header header'
    'sidebar main stats';
}
.header {
  grid-area: header;
}
```

نهج مناطق القوالب هو:

- **بصري**: يمكنك أن ترى تخطيطك حرفيًا في CSS
- **دلالي**: المناطق المسمّاة توثّق نفسها بنفسها
- **قابل للصيانة**: تغيير التخطيطات يتطلب تحديث سلسلة واحدة لا إحداثيات رقمية متعدّدة
- **مستجيب**: التخطيطات المختلفة عند نقاط التوقف المختلفة واضحة تمامًا

## إضافة مناطق المحتوى الديناميكي

لنُحسّن لوحتنا لتتعامل مع المحتوى الديناميكي باستخدام التقنيات التي تعلّمناها في [درس قائمة البطاقات](https://stevekinney.com/courses/tailwind/building-a-card-list):

*إضافة مناطق المحتوى الديناميكي — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/de3425cd512dca6a5ff9968edbc7e501d52cb7365577f521c7a300157f1bdf3a.html)*

```html
<div class="@container">
  <div
    class="grid h-screen gap-4 p-4 @sm:grid-cols-1 @sm:grid-rows-[auto_auto_1fr_auto] @sm:[grid-template-areas:'header''sidebar''main''stats'] @xl:grid-cols-[250px_1fr_200px] @xl:grid-rows-[auto_1fr] @xl:[grid-template-areas:'header_header_header''sidebar_main_stats']"
  >
    <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:header]">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
        <div class="flex items-center gap-4">
          <span class="hidden text-slate-600 @md:block">Welcome back, Sarah</span>
          <button
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
    <div class="overflow-hidden rounded-lg bg-white shadow-sm [grid-area:sidebar]">
      <nav class="@sm:flex @sm:gap-2 @xl:block">
        <a
          href="#"
          class="block bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 transition-colors not-first:border-t not-first:border-slate-200 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0"
          >Overview</a
        >
        <a
          href="#"
          class="block px-4 py-3 text-sm font-medium text-slate-700 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0"
          >Analytics</a
        >
        <a
          href="#"
          class="block px-4 py-3 text-sm font-medium text-slate-700 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0"
          >Reports</a
        >
        <a
          href="#"
          class="block px-4 py-3 text-sm font-medium text-slate-700 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 @sm:not-first:border-t-0 @sm:not-first:border-l @xl:not-first:border-t @xl:not-first:border-l-0"
          >Settings</a
        >
      </nav>
    </div>
    <div class="overflow-hidden rounded-lg bg-white p-6 shadow-sm [grid-area:main]">
      <h2 class="mb-4 text-xl font-semibold text-slate-900">Recent Activity</h2>
      <div class="mb-6 grid gap-4 @sm:grid-cols-1 @lg:grid-cols-3">
        <div class="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white shadow-sm">
          <div class="text-2xl font-bold">1,234</div>
          <div class="text-sm opacity-90">Total Users</div>
        </div>
        <div
          class="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-4 text-white shadow-sm"
        >
          <div class="text-2xl font-bold">$45,678</div>
          <div class="text-sm opacity-90">Revenue</div>
        </div>
        <div
          class="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white shadow-sm"
        >
          <div class="text-2xl font-bold">12.5%</div>
          <div class="text-sm opacity-90">Growth</div>
        </div>
      </div>
      <div class="overflow-hidden rounded-lg border border-slate-200">
        <div class="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h3 class="text-sm font-semibold text-slate-900">Recent Transactions</h3>
        </div>
        <div class="divide-y divide-slate-200">
          <div class="px-4 py-3 transition-colors hover:bg-slate-50">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-slate-900">Payment from Acme Corp</div>
              <div class="text-sm font-semibold text-green-600">+$2,500.00</div>
            </div>
            <div class="mt-1 text-xs text-slate-500">2 hours ago</div>
          </div>
          <div class="px-4 py-3 transition-colors hover:bg-slate-50">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-slate-900">Subscription renewal</div>
              <div class="text-sm font-semibold text-red-600">-$29.99</div>
            </div>
            <div class="mt-1 text-xs text-slate-500">1 day ago</div>
          </div>
          <div class="px-4 py-3 transition-colors hover:bg-slate-50">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-slate-900">Client payment</div>
              <div class="text-sm font-semibold text-green-600">+$1,250.00</div>
            </div>
            <div class="mt-1 text-xs text-slate-500">3 days ago</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-sm [grid-area:stats]">
      <h3 class="mb-3 text-lg font-semibold text-slate-900">Quick Stats</h3>
      <div class="@sm:flex @sm:gap-4 @xl:block @xl:space-y-3">
        <div class="py-2 text-sm @sm:flex-1 @xl:border-b @xl:border-slate-100 @xl:last:border-b-0">
          <div class="font-medium text-slate-900">Sessions</div>
          <div class="text-slate-600">8,432</div>
        </div>
        <div class="py-2 text-sm @sm:flex-1 @xl:border-b @xl:border-slate-100 @xl:last:border-b-0">
          <div class="font-medium text-slate-900">Bounce Rate</div>
          <div class="text-slate-600">24%</div>
        </div>
        <div class="py-2 text-sm @sm:flex-1 @xl:border-b @xl:border-slate-100 @xl:last:border-b-0">
          <div class="font-medium text-slate-900">Avg. Duration</div>
          <div class="text-slate-600">3:42</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

الميزات المحسّنة:

- **تنقّل ديناميكي**: يستخدم أدوات `not-first:` مع تبدّل حدود مستجيب (حدود علوية على سطح المكتب وحدود يسرى على الجوال)
- **محتوى قابل للتمرير**: أُضيف `overflow-hidden` ومناطق محتوى مناسبة تتعامل مع البيانات الديناميكية
- **قائمة معاملات**: محتوى من العالم الحقيقي مع حالات تحويم وتسلسل هرمي في الطباعة
- **حدود إحصاءات مستجيبة**: حدود شرطية تتكيّف مع التخطيطات الأفقية والرأسية

## لماذا هذا النهج ثوريّ

تنشئ مناطق قوالب الشبكة في CSS مع استعلامات الحاوية **تخطيطات دلالية ومتكيّفة حقًا**:

**التخطيط كشيفرة**: سلسلة `grid-template-areas` هي تمثيل بصري حرفي لتخطيطك. ويستطيع المطوّرون الآخرون فهم البنية فورًا.

**دلالات استجابة**: بدلًا من تغيير المواضع الرقمية للشبكة، أنت تُعيد تشكيل التخطيط الدلالي نفسه. «الترويسة تمتدّ بكامل العرض» مقابل «الترويسة في الأعمدة 1-3، الصف 1».

**تعقيد قابل للصيانة**: تصبح لوحات المعلومات المعقّدة قابلة للإدارة لأن كل منطقة لها اسم ذو معنى وحدود واضحة.

**تعدّدية المكوّنات**: يمكن لكل منطقة في الشبكة أن تضمّ أي مكوّن — فالنظام لا يهتم بالتعقيد الداخلي.

**التكيّف مع الحاوية**: تعمل لوحة المعلومات بالدرجة نفسها في تطبيق بملء الشاشة أو أداة مضمّنة أو شريط جانبي ضيّق، لأنها تستجيب لحاويتها لا لإطار العرض.

## التطبيقات في العالم الحقيقي

يحل هذا النمط تحدّيات التخطيط في:

- **لوحات معلومات الإدارة**: التحليلات، إدارة المستخدمين، أنظمة إدارة المحتوى
- **مواقع التوثيق**: ترويسة، تنقّل جانبي، محتوى رئيسي، جدول محتويات
- **التجارة الإلكترونية**: شبكات المنتجات مع المرشّحات، وسلة التسوّق، وتفاصيل المنتج
- **المواقع الإخبارية**: محتوى المقالات مع مقالات ذات صلة، ومعلومات المؤلف، والإعلانات
- **تطبيقات SaaS**: لوحات الأدوات، مساحة العمل الرئيسية، فاحصو الخصائص

الطبيعة الدلالية تجعل هذه التخطيطات توثّق نفسها وسهلة الصيانة على الفرق.

## التحديات

جرّب بناء هذه الصيغ:

1. **تخطيط مقال مدوّنة**: أنشئ تخطيطًا من ثلاث مناطق مع ترويسة ومحتوى المقال الرئيسي وشريط جانبي لجدول المحتويات باستخدام مناطق قوالب مثل `"header header" "article toc"`
2. **لوحة معلومات ديناميكية**: وسّع لوحة المعلومات هذه للتعامل مع منطقة «notifications» يمكن تشغيلها وإيقافها بتغيير مناطق قوالب الشبكة بين حالتي `"header header header"` و`"header header notifications"`
