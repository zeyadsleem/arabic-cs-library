---
title: "الاتجاه والالتفاف"
lang: ar
source: "https://stevekinney.com/courses/tailwind/flexbox-direction-and-wrapping"
---

استخدم `flex` لإنشاء حاوية flex. تحكّم في اتجاه التخطيط والالتفاف بأدوات Flexbox في Tailwind.

## أدوات الاتجاه

- `flex-row` - تتدفق العناصر أفقيًا (افتراضي)
- `flex-row-reverse` - تتدفق العناصر أفقيًا معكوسة
- `flex-col` - تتكدّس العناصر رأسيًا
- `flex-col-reverse` - تتكدّس العناصر رأسيًا معكوسة

## أدوات الالتفاف

- `flex-nowrap` - تبقى العناصر في سطر واحد (افتراضي)
- `flex-wrap` - تلتف العناصر إلى أسطر جديدة
- `flex-wrap-reverse` - تلتف العناصر إلى الأعلى

## أنماط متجاوبة

*أنماط متجاوبة — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/38b709bef3c27ca384427466e88189f27c194d8afa4c3ff1f689d3c460937c7b.html)*

```html
<!-- Mobile column, desktop row -->
<div class="flex flex-col gap-4 md:flex-row">
  <div class="min-h-[100px] rounded-lg bg-blue-500 p-4 text-white">Item 1</div>
  <div class="min-h-[100px] rounded-lg bg-green-500 p-4 text-white">Item 2</div>
  <div class="min-h-[100px] rounded-lg bg-purple-500 p-4 text-white">Item 3</div>
</div>
```

*أنماط متجاوبة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c2bcd3669cc4ec77ed747650704efcda4050eba98e9c88b672f4321a42ce264d.html)*

```html
<!-- Wrap on mobile, no wrap on desktop -->
<div class="flex flex-wrap gap-4 lg:flex-nowrap">
  <div class="min-h-[100px] min-w-[200px] rounded-lg bg-red-500 p-4 text-white">Item 1</div>
  <div class="min-h-[100px] min-w-[200px] rounded-lg bg-orange-500 p-4 text-white">Item 2</div>
  <div class="min-h-[100px] min-w-[200px] rounded-lg bg-yellow-500 p-4 text-white">Item 3</div>
</div>
```

## استعلامات الحاوية

نسّق بناءً على حجم الحاوية الأب بدلًا من نافذة العرض:

*استعلامات الحاوية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2d6f7a9f17c988034bbe4aa3cf165f2c36bb81dc4e5f853a5e59158b82fd3670.html)*

```html
<div class="@container">
  <div class="flex flex-col gap-4 @md:flex-row">
    <div class="min-h-[100px] rounded-lg bg-indigo-500 p-4 text-white">Responsive Item 1</div>
    <div class="min-h-[100px] rounded-lg bg-pink-500 p-4 text-white">Responsive Item 2</div>
    <div class="min-h-[100px] rounded-lg bg-teal-500 p-4 text-white">Responsive Item 3</div>
  </div>
</div>
```

استخدم `@min-[400px]:` لنقاط توقف حاوية مخصصة أو `@container/{name}` لحاويات مسمّاة.
