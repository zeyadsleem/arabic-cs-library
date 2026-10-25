---
title: "النمو والانكماش"
lang: ar
source: "https://stevekinney.com/courses/tailwind/flexbox-growing-and-shrinking"
---

تحكّم في كيفية نمو عناصر flex لملء المساحة المتاحة أو انكماشها عندما تكون المساحة محدودة.

## نمو flex

استخدم أدوات `grow` للتحكم في كيفية توسّع العناصر:

- `grow-0` - لن ينمو العنصر (افتراضي)
- `grow` - يمكن للعنصر النمو لملء المساحة (flex-grow: 1)
- `grow-[2]` - عامل نمو مخصص

*نمو flex — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/bc718c0fc551fb2fa0c772ce73d83a6fbe19c528a4ef6fb3ba17c0b19e4d5e18.html)*

```html
<!-- Middle item takes up remaining space -->
<div class="flex gap-4 rounded-lg bg-gray-100 p-4">
  <div class="w-20 rounded bg-blue-500 p-3 text-center text-white">Fixed</div>
  <div class="grow rounded bg-green-500 p-3 text-center text-white">Flexible</div>
  <div class="w-20 rounded bg-blue-500 p-3 text-center text-white">Fixed</div>
</div>
```

## انكماش flex

استخدم أدوات `shrink` للتحكم في كيفية تقلّص العناصر:

- `shrink-0` - لن ينكمش العنصر تحت حجمه الطبيعي
- `shrink` - يمكن للعنصر الانكماش عند الحاجة (flex-shrink: 1)
- `shrink-[2]` - عامل انكماش مخصص

*انكماش flex — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b9bfb7c39c5a8d5ac94a3b45a8b7b8b4085d2ceb8f66c349f580f80130fcca72.html)*

```html
<!-- Prevent logo from shrinking -->
<div class="flex gap-4 rounded-lg bg-gray-100 p-4">
  <div
    class="flex h-12 w-24 shrink-0 items-center justify-center rounded bg-indigo-600 font-bold text-white"
  >
    LOGO
  </div>
  <nav class="flex shrink items-center gap-3 rounded bg-gray-200 p-3">
    <span class="text-gray-700">Home</span>
    <span class="text-gray-700">About</span>
    <span class="text-gray-700">Contact</span>
  </nav>
</div>
```

## أنماط شائعة

*أنماط شائعة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/15ce1dbe609fcb235857b83bd1d2a3baf9d59987ffa585e38cb2402ccbbaf225.html)*

```html
<!-- Equal width columns -->
<div class="flex gap-4 rounded-lg bg-gray-100 p-4">
  <div class="grow rounded bg-purple-500 p-4 text-center text-white">Column 1</div>
  <div class="grow rounded bg-pink-500 p-4 text-center text-white">Column 2</div>
  <div class="grow rounded bg-orange-500 p-4 text-center text-white">Column 3</div>
</div>

<!-- Sidebar layout -->
<div class="flex min-h-[200px] gap-4 rounded-lg bg-gray-100 p-4">
  <aside class="w-64 shrink-0 rounded bg-gray-700 p-4 text-white">
    <h3 class="mb-2 font-bold">Sidebar</h3>
    <p class="text-sm">Fixed width sidebar content</p>
  </aside>
  <main class="grow rounded bg-white p-4 shadow">
    <h2 class="mb-2 font-bold">Main Content</h2>
    <p class="text-gray-700">This content area grows to fill the remaining space</p>
  </main>
</div>
```

ادمجها مع معدِّلات التجاوب: `md:grow-0` و`lg:shrink-0` وما شابه.
