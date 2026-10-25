---
title: "أدوات نقاط التوقف"
lang: ar
source: "https://stevekinney.com/courses/tailwind/breakpoint-utilities"
---

تستخدم Tailwind نهج «الجوال أولًا»: الأدوات بلا بادئة تنطبق على كل المقاسات، والأدوات ذات البادئة تنطبق من نقطة التوقف تلك فصاعدًا.

## نقاط التوقف الافتراضية

- `sm`: من 640px وما فوق
- `md`: من 768px وما فوق
- `lg`: من 1024px وما فوق
- `xl`: من 1280px وما فوق
- `2xl`: من 1536px وما فوق

## الاستخدام الأساسي {#basic-usage}

*الاستخدام الأساسي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a6c7ba15ac0f1fb23100cf9b826687f4d73c8c64a73c68430d69ac460e6b6e92.html)*

```html
<!-- Mobile-first design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 column on mobile, 2 on medium, 3 on large -->
</div>

<!-- Show/hide at breakpoints -->
<div class="hidden lg:block">Only visible on large screens</div>
<div class="block lg:hidden">Hidden on large screens</div>
```

## استهداف النطاقات

### صيغ الحد الأقصى للعرض

استخدم `max-*` لتطبيق الأنماط دون نقطة توقف:

*صيغ الحد الأقصى للعرض — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7c688b6a5bfcad03184b34e10cc0e9c6d5431765f56cf9926afe17f2441647e4.html)*

```html
<!-- Only on mobile -->
<div class="block max-sm:hidden">Hidden on mobile only</div>

<!-- Medium screens only -->
<div class="hidden max-lg:hidden md:block">Visible between 768px-1024px</div>
```

### التكديس للنطاقات

*التكديس للنطاقات — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a71b4079ae617b7def170a51956da3a391c2b2538b6959259b811c1f917469ad.html)*

```html
<!-- Apply only between md and lg -->
<div class="md:max-lg:bg-blue-500">Blue background on medium screens only</div>
```

## نقاط توقف عشوائية

نقاط توقف مخصّصة تُستخدم مرة واحدة:

*نقاط توقف عشوائية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/cc56ebb0bce5b4f74c352a2aa0d7286606b37dec342d9c645859df6f4f86f8a1.html)*

```html
<!-- Min width -->
<div class="min-[850px]:flex">Flex at 850px+</div>

<!-- Max width -->
<div class="max-[1200px]:hidden">Hidden below 1200px</div>

<!-- Range -->
<div class="min-[600px]:max-[900px]:bg-gray-100">Gray between 600-900px</div>
```

## تخصيص نقاط التوقف

عرّف نقاط توقف مخصّصة داخل `@theme`:

```css
@import 'tailwindcss';

@theme {
  /* Add new breakpoints */
  --breakpoint-xs: 475px;
  --breakpoint-3xl: 1920px;

  /* Override defaults */
  --breakpoint-md: 850px;

  /* Remove a default */
  --breakpoint-2xl: initial;
}
```

## استعلامات الحاويات

نسّق بحسب حجم الحاوية الأم لا بحسب إطار العرض:

### استعلامات الحاويات الأساسية

*استعلامات الحاويات الأساسية — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0764db1c435470de16ea36bce5c4a4cbeefcffc1ad213cf9d332d462ab4ea66f.html)*

```html
<!-- Mark parent as container -->
<div class="@container">
  <!-- Style children based on container size -->
  <div class="grid @md:grid-cols-2 @lg:grid-cols-3">
    <!-- Responsive to container, not viewport -->
  </div>
</div>
```

### الحاويات المسمّاة

*الحاويات المسمّاة — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/77a4fc681bf6d3b786b9366f569db29c848cb325c365acddca7f879f1e8468dd.html)*

```html
<!-- Named container -->
<div class="@container/sidebar">
  <nav class="@sm/sidebar:flex">...</nav>
</div>

<!-- Another named container -->
<div class="@container/main">
  <article class="@lg/main:prose-lg">...</article>
</div>
```

### أحجام الحاويات

نقاط توقف الحاويات الافتراضية تطابق نقاط توقف إطار العرض:

- `@sm`: حاوية بعرض 640px
- `@md`: حاوية بعرض 768px
- وغيرها.

خصّصها في `@theme`:

```css
@theme {
  --container-xs: 320px;
  --container-3xl: 1600px;
}
```

### استعلامات حاويات عشوائية

*استعلامات حاويات عشوائية — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7b2008710754ff6269158c4af09ac0c6680ee80343055acbb6a1f25e4f518efb.html)*

```html
<div class="@container">
  <div class="@max-[600px]:block @min-[400px]:flex">Custom container breakpoints</div>
</div>
```

## أنماط استجابة معقّدة

### الدمج مع صيغ أخرى

*الدمج مع صيغ أخرى — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7a2b468ecff5d64542dc0d8d1e130934f22c329515c01ea17a92fdc6834d2504.html)*

```html
<!-- Dark mode + responsive + hover -->
<button
  class="bg-gray-100 hover:bg-gray-200 md:bg-white md:hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:md:bg-gray-950 dark:md:hover:bg-gray-900"
>
  Complex responsive button
</button>
```

### الطباعة المستجيبة

*الطباعة المستجيبة — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0dd673cd2806f56d6da2f3a3a019524643de28fe03a4d84dbdafdea6f2db1a30.html)*

```html
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Scales with viewport</h1>

<div class="@container">
  <h2 class="text-xl @sm:text-2xl @md:text-3xl">Scales with container</h2>
</div>
```

## أفضل الممارسات {#best-practices}

1. **ابدأ بالجوال أولًا** — ابنِ للشاشات الصغيرة وطوّر للأكبر
2. **استخدم نقاط توقف دلالية** — طابق نقاط الانكسار الطبيعية في تصميمك
3. **استخدم استعلامات الحاويات للمكوّنات** — أكثر قابلية للنقل من استعلامات إطار العرض
4. **اختبر عند كل المقاسات** — لا تختبر عند نقاط التوقف الدقيقة فقط
5. **تجنّب كثرة نقاط التوقف** — ثلاث أو أربع نقاط تكفي عادةً
