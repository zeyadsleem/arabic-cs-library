---
title: "الحجم الأولي"
---

اضبط الحجم الأولي لعناصر flex قبل نموها أو انكماشها باستخدام أدوات `basis-*`.

## القيم الشائعة

- `basis-auto` - الحجم بناءً على المحتوى
- `basis-0` - البدء من عرض صفر
- `basis-full` - 100% من الحاوية
- `basis-1/2` - 50% من الحاوية
- `basis-1/3` - 33.333% من الحاوية
- `basis-2/3` - 66.667% من الحاوية
- `basis-1/4` - 25% من الحاوية
- `basis-3/4` - 75% من الحاوية

## مقياس التباعد

استخدم قيمًا رقمية من مقياس التباعد:

- `basis-4` - 1rem
- `basis-8` - 2rem
- `basis-16` - 4rem
- `basis-32` - 8rem
- `basis-64` - 16rem

## اختصار flex

ادمج grow وshrink وbasis مع أدوات flex:

- `flex-1` - `flex: 1 1 0%` (ينمو وينكمش من 0)
- `flex-auto` - `flex: 1 1 auto` (ينمو وينكمش من حجم المحتوى)
- `flex-initial` - `flex: 0 1 auto` (انكماش فقط)
- `flex-none` - `flex: 0 0 auto` (حجم ثابت)

## أنماط شائعة

*أنماط شائعة — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/85a4f7a8e89ee6cd9da297b8fbf6123f413ef4f3cd44b68b798a98da623db032.html)*

```html
<!-- Three equal columns -->
<div class="flex gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex-1 basis-0 rounded bg-blue-500 p-4 text-center text-white">Column 1</div>
  <div class="flex-1 basis-0 rounded bg-green-500 p-4 text-center text-white">Column 2</div>
  <div class="flex-1 basis-0 rounded bg-purple-500 p-4 text-center text-white">Column 3</div>
</div>

<!-- Sidebar with flexible content -->
<div class="flex min-h-[200px] gap-4 rounded-lg bg-gray-100 p-4">
  <aside class="basis-64 rounded bg-gray-700 p-4 text-white">
    <h3 class="mb-2 font-bold">Fixed sidebar</h3>
    <p class="text-sm">Width: 16rem (256px)</p>
  </aside>
  <main class="flex-1 rounded bg-white p-4 shadow">
    <h2 class="mb-2 font-bold">Flexible content</h2>
    <p class="text-gray-700">This area expands to fill remaining space</p>
  </main>
</div>

<!-- Responsive columns -->
<div class="flex flex-wrap gap-4 rounded-lg bg-gray-100 p-4">
  <div class="basis-full rounded bg-orange-500 p-4 text-white md:basis-1/2 lg:basis-1/3">
    <h3 class="font-bold">Responsive Item 1</h3>
    <p class="text-sm">Full width on mobile, half on tablet, third on desktop</p>
  </div>
  <div class="basis-full rounded bg-pink-500 p-4 text-white md:basis-1/2 lg:basis-1/3">
    <h3 class="font-bold">Responsive Item 2</h3>
    <p class="text-sm">Full width on mobile, half on tablet, third on desktop</p>
  </div>
  <div class="basis-full rounded bg-indigo-500 p-4 text-white md:basis-1/2 lg:basis-1/3">
    <h3 class="font-bold">Responsive Item 3</h3>
    <p class="text-sm">Full width on mobile, half on tablet, third on desktop</p>
  </div>
</div>
```
