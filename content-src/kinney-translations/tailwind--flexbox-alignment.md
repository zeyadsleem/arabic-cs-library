---
title: "المحاذاة"
---

يوفّر Flexbox خيارات محاذاة قوية على المحورين الرئيسي والمتقاطع.

## محاذاة المحور الرئيسي

تحكّم في التوزيع على المحور الرئيسي بأدوات `justify-*`:

- `justify-start` - تحزيم العناصر في البداية (افتراضي)
- `justify-end` - تحزيم العناصر في النهاية
- `justify-center` - توسيط العناصر
- `justify-between` - مسافة متساوية بين العناصر
- `justify-around` - مسافة متساوية حول العناصر
- `justify-evenly` - مسافة متساوية بين العناصر والحواف

*محاذاة المحور الرئيسي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f36a0f6b28818f4f69ffb94f6e5680d462948522bc7d02437e15617b740371a3.html)*

```html
<!-- Center navigation items -->
<nav class="flex justify-center gap-4">
  <a href="#" class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Home</a>
  <a href="#" class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">About</a>
  <a href="#" class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Contact</a>
</nav>

<!-- Space between items -->
<div class="flex justify-between rounded-lg bg-gray-100 p-4">
  <button class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Previous</button>
  <span class="self-center font-medium text-gray-700">Page 1 of 10</span>
  <button class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Next</button>
</div>
```

## محاذاة المحور المتقاطع

حاذِ العناصر عموديًا على المحور الرئيسي:

- `items-start` - محاذاة إلى بداية المحور المتقاطع
- `items-end` - محاذاة إلى نهاية المحور المتقاطع
- `items-center` - توسيط على المحور المتقاطع
- `items-baseline` - محاذاة خطوط أساس النص
- `items-stretch` - تمدّد للملء (افتراضي)

*محاذاة المحور المتقاطع — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2c5a1069aa947db4bd498c6fd6297cc03ff59bf8997b13edbd48a0f610aa0014.html)*

```html
<!-- Vertically center items -->
<div class="flex h-20 items-center gap-3 rounded-lg bg-gray-100 px-4">
  <div class="h-8 w-8 flex-shrink-0 rounded-full bg-blue-500"></div>
  <span class="font-medium text-gray-700">Centered content</span>
</div>
```

## المحاذاة الفردية

تجاوز محاذاة الحاوية لعناصر محددة:

- `self-auto` - استخدام محاذاة الحاوية
- `self-start` - محاذاة العنصر إلى البداية
- `self-end` - محاذاة العنصر إلى النهاية
- `self-center` - توسيط العنصر
- `self-stretch` - تمديد العنصر

*المحاذاة الفردية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1fd4665b46d42e404e5e48bd7f1566bedfdc62b055472d26f21e6f126ca68542.html)*

```html
<div class="flex h-32 items-start gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-red-500 p-3 text-white">Top aligned</div>
  <div class="self-center rounded bg-green-500 p-3 text-white">Centered</div>
  <div class="self-end rounded bg-blue-500 p-3 text-white">Bottom aligned</div>
</div>
```

## محاذاة متعددة الأسطر

لعناصر flex الملتفة، حاذِ الأسطر كاملة:

- `content-start` - حزم الأسطر في البداية
- `content-end` - حزم الأسطر في النهاية
- `content-center` - توسيط الأسطر
- `content-between` - مسافة بين الأسطر
- `content-around` - مسافة حول الأسطر
- `content-evenly` - تباعد متساوٍ

*محاذاة متعددة الأسطر — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/134b2ae712f7c4bd0790cb7dbc3d51e3b4a45dd404f5b6829227f04c057e87e2.html)*

```html
<div class="flex h-64 flex-wrap content-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="h-20 w-32 rounded bg-purple-500 p-4 text-white">Item 1</div>
  <div class="h-20 w-32 rounded bg-pink-500 p-4 text-white">Item 2</div>
  <div class="h-20 w-32 rounded bg-indigo-500 p-4 text-white">Item 3</div>
  <div class="h-20 w-32 rounded bg-blue-500 p-4 text-white">Item 4</div>
  <div class="h-20 w-32 rounded bg-green-500 p-4 text-white">Item 5</div>
</div>
```
