---
title: "تكامل متغيّرات CSS"
---

ينقل Tailwind الإعداد من JavaScript إلى CSS باستخدام توجيه `@theme` ومتغيّرات CSS.

## تعريف ألوان مخصصة

أضف ألوانًا في ملف CSS باستخدام `@theme`:

```css
@import 'tailwindcss';

@theme {
  --color-brand: #5b21b6;
  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-neon-lime: oklch(91.5% 0.258 129);
}
```

يولّد هذا أدوات مثل `bg-brand` و`text-neon-pink` وما شابه.

## تجاوز الألوان الافتراضية

استبدل ألوانًا محددة:

```css
@theme {
  --color-blue-500: #1e40af; /* Override default blue-500 */
}
```

امسح مجموعات ألوان كاملة:

```css
@theme {
  --color-gray-*: initial; /* Remove all default grays */
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  /* Define your custom grays */
}
```

ابدأ من الصفر:

```css
@import 'tailwindcss/preflight';
@import 'tailwindcss/utilities';

@theme {
  --color-*: initial; /* Remove ALL defaults */
  /* Define your entire palette */
}
```

## استخدام الألوان كمتغيّرات CSS

تُعرَّض ألوان السمة كمتغيّرات CSS:

### في CSS المخصص

```css
.custom-element {
  background: var(--color-brand);
  border-color: var(--color-neon-pink);
}
```

### في القيم العشوائية

*في القيم العشوائية — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d5c13ff05aa9a0a53809fa2fd70f3d8548a7e37e8a84cff1345d2d296c587de9.html)[CSS](#playground-css-brand)*

```html
<!-- Long form -->
<div class="bg-[var(--color-neon-pink)]">...</div>

<!-- Shorthand (v4) -->
<div class="text-(--color-brand)">...</div>
```

## معدِّلات العتامة

تعمل مع كل تعريفات الألوان:

*معدِّلات العتامة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/68bb03605d4c610f22189796c340538dbfd9cbe782c4ec90b0918c4a75ad39c7.html)[CSS](#playground-css-brand)*

```html
<div class="bg-brand/50">50% opacity</div>
<div class="text-neon-pink/75">75% opacity</div>
<div class="border-[var(--color-custom)]/20">20% opacity</div>
```

## تغييرات مهمة في Tailwind 4

### افتراضي لون الحد

*افتراضي لون الحد — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/490c65ef2eef35486a26c95676aef108baa6213f3cde7b19cf99e61108c459d7.html)*

```html
<!-- v3: defaulted to gray-200 -->
<div class="border">...</div>

<!--Tailwind 4: defaults to currentColor -->
<div class="border border-gray-200">Explicit color needed</div>
```

### افتراضي لون الحلقة

*افتراضي لون الحلقة — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/26d74d233c1e5ef322cdc70c1bdb5a19b2d56a2afae372964d6f4064c1f06a04.html)*

```html
<!-- v3: 3px blue ring -->
<div class="ring">...</div>

<!--Tailwind 4: 1px currentColor -->
<div class="ring-3 ring-blue-500">Explicit width and color</div>
```

## السمات الديناميكية

تتيح متغيّرات CSS تبديل السمة وقت التشغيل:

```css
@theme {
  --color-surface: white;
  --color-text: black;
}

[data-theme='dark'] {
  --color-surface: #1a1a1a;
  --color-text: white;
}
```

```css
@theme {
  --color-brand: #5b21b6;
  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-custom: #7c3aed;
  --color-surface: white;
  --color-text: black;
}

[data-theme='dark'] {
  --color-surface: #1a1a1a;
  --color-text: white;
}
```

*السمات الديناميكية — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/6e0c04076282d461c8b93f19216dacf1d924b00bba8f656686e4a89524cbb60e.html)[CSS](#playground-css-brand)*

```html
<body data-theme="dark">
  <div class="bg-surface text-text">Automatically themed</div>
</body>
```

## أفضل الممارسات

1. **استخدم أسماء دلالية** لألوان العلامة: `--color-primary` و`--color-accent`
2. **جمّع الألوان المترابطة**: `--color-gray-*` و`--color-brand-*`
3. **استفد من OKLCH** للحصول على لوحات متسقة
4. **وثّق ألوانك** بتعليقات في `@theme`
5. **اختبر معدِّلات العتامة** مع ألوانك المخصصة
