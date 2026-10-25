---
title: "صيغ تفضيلات المستخدم"
lang: ar
source: "https://stevekinney.com/courses/tailwind/user-preference-variants"
---

يوفّر Tailwind صيغًا للاستجابة إلى تفضيلات المستخدم وإعدادات النظام، لتبقى الأنماط التكيفية داخل HTML.

## الوضع الداكن

**الاستخدام الأساسي:**

*الوضع الداكن — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/26ada99ff29a65a07ae4ad3cedb0b0d9fa092182397149d9dcbaa0ebe29b1768.html)*

```html
<div class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">Adapts to dark mode</div>
```

```css
@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));
```

**تبديل السمة يدويًا:** اضبط الوضع الداكن ليستخدم محدِّدًا بدلًا من تفضيل النظام:

*الوضع الداكن — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b9a2067bac77deaa8a280078ac50f67272408214c2c40f8cbd213b47f7d00377.html)[CSS](#playground-css-manual-dark)*

```html
<div data-theme="dark">
  <div class="dark:bg-gray-800 dark:text-white">Controlled by data-theme</div>
</div>
```

## تفضيلات الحركة

**قلّل الحركات من أجل إمكانية الوصول:**

*تفضيلات الحركة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b68a1cdbf73d8993b904c614e81a8203ca7507ea9234f8dc59ad01e7b355cea6.html)*

```html
<!-- Disable animation when reduced motion preferred -->
<div class="inline-block animate-spin motion-reduce:animate-none">Loading...</div>

<!-- Only animate when motion is safe -->
<button class="motion-safe:transition motion-safe:hover:scale-105">Hover me</button>
```

## التباين والألوان

**أوضاع التباين العالي:**

*التباين والألوان — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f4da54758b7f164ec12dea78aa0a521532e59d63feb3ac352296f5be27b5e2ee.html)*

```html
<button class="border-gray-300 contrast-more:border-black contrast-less:border-gray-200">
  Adapts to contrast preference
</button>
```

**الألوان المفروضة (التباين العالي في Windows):**

*التباين والألوان — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d0f4097ca47f6bc7b9af83f5cabdbeffcddc253d0f83d76fdd1dcff1d46a4cd9.html)*

```html
<div class="bg-blue-500 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]">
  Uses system colors in forced-colors mode
</div>
```

## طرق الإدخال

**تكيّف مع أجهزة التأشير:**

*طرق الإدخال — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c80c50563aa0110addc39e7c898d636aecda4d8ce88b4670497b9d9164f27eb4.html)*

```html
<!-- Larger targets for touch -->
<button class="p-2 pointer-coarse:p-4">Touch-friendly button</button>

<!-- Fine interactions for mouse users -->
<div class="pointer-fine:hover:underline">Hover only with mouse</div>
```

**ملاحظة:** في Tailwind 4، لا يُطبَّق `hover:` إلا عندما يدعم الجهاز الأساسي التمرير.

## تفضيلات أخرى

**الاتجاه:**

*تفضيلات أخرى — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/012d1ac76a8ff4f3eb074564972622353661a24e8d1ecef26e58cac33c4b8a81.html)*

```html
<div class="grid grid-cols-1 gap-2 landscape:grid-cols-2">
  <div class="rounded bg-blue-100 p-2">First column</div>
  <div class="rounded bg-blue-100 p-2">Second column</div>
</div>
```

**تنسيق الطباعة:**

*تفضيلات أخرى — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/4ea314c616087d52037d946859f2277abdeaeb069953682eb34f9080818637cd.html)*

```html
<nav class="print:hidden">Navigation</nav>
<article class="print:bg-white print:text-black">Print-friendly content</article>
```

**كشف JavaScript:**

*تفضيلات أخرى — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/da330565bff89e1fcb5c79b8cfe1678e8de9e2781e583dd87c5bac6818169b61.html)*

```html
<noscript class="hidden noscript:block"> Please enable JavaScript </noscript>
```

## كشف الميزات

**دعم ميزات CSS:**

*كشف الميزات — المثال 10 — [افتح المثال](https://stevekinney.com/generated/playgrounds/bf1b0bd98313856d2f5c2da5b512f0a3415c8cec11a686a0ef35262b4e30038e.html)*

```html
<!-- Basic support check -->
<div class="supports-[display:grid]:grid">Uses grid if supported</div>

<!-- Complex queries -->
<div class="supports-[(display:grid)_and_(gap:1rem)]:grid-flow-col">Advanced grid features</div>
```

**اختصارات ميزات مخصصة:**

```css
@theme {
  --supports-container-queries: [(container-type: inline-size)];
}
```

## أنماط البداية (v4)

حرّك العناصر عند ظهورها أول مرة:

*أنماط البداية (v4) — المثال 11 — [افتح المثال](https://stevekinney.com/generated/playgrounds/6ee258362bffa57e4a2e8b2704a2295807fbc3fe6193b2fd4ab841ba65558bf6.html)*

```html
<div class="transition-opacity duration-300 starting:opacity-0">Fades in on appearance</div>
```

## أفضل الممارسات {#best-practices}

1. **وفّر دائمًا بدائل احتياطية** - لا تعتمد على صيغ التفضيلات وحدها
2. **اختبر كل الأوضاع** - تحقّق من الوضع الداكن وتقليل الحركة وما شابه
3. **استخدم ألوان النظام الدلالية** لوضع الألوان المفروضة
4. **تذكّر كشف الأصناف** - يجب أن توجد أسماء الأصناف الكاملة في المصدر
