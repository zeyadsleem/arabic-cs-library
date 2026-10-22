---
title: "لوحة ألوان OKLCH"
---

يستخدم Tailwind ألوان OKLCH للوحته الافتراضية — فضاء لوني متسق إدراكيًا يتوافق مع الرؤية البشرية.

## مكوّنات OKLCH

- **L (الإضاءة):** من 0 (أسود) إلى 1 (أبيض) — متسق إدراكيًا
- **C (التشبّع اللوني):** من 0 (رمادي) فصاعدًا — شدة اللون
- **H (درجة اللون):** 0-360 درجة — الموضع على عجلة الألوان
- **A (ألفا):** من 0 إلى 1 أو من 0% إلى 100% — العتامة

الصيغة: `oklch(L C H)` أو `oklch(L C H / alpha)`

## لماذا OKLCH؟

1. **الاتساق الإدراكي** - تغيّرات إضاءة يمكن التنبؤ بها
2. **دعم نطاق P3** - ألوان أكثر حيوية على الشاشات الحديثة
3. **إمكانية وصول أفضل** - حسابات تباين موثوقة
4. **تدرّجات أكثر سلاسة** - بلا ألوان وسطية عكرة

## استخدام OKLCH في Tailwind

### اللوحة الافتراضية

تستخدم كل الألوان الافتراضية (الأحمر والأزرق والرمادي وما شابه) OKLCH داخليًا:

*اللوحة الافتراضية — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1f6182d8384ee040ee6e8fd958f2f1248ac28a6fe5fcae24a9f0b769a7dd3e4d.html)*

```html
<div class="bg-sky-500 text-neutral-900">
  <!-- Tailwind handles OKLCH conversion -->
</div>
```

### ألوان مخصصة

عرّف ألوان OKLCH في `@theme`:

```css
@import 'tailwindcss';

@theme {
  /* Single color */
  --color-midnight: oklch(15% 0.05 270);

  /* Full palette */
  --color-brand-100: oklch(0.99 0 0);
  --color-brand-500: oklch(0.64 0.18 260);
  --color-brand-900: oklch(0.28 0.05 265);
}
```

استخدمها مثل أي لون في Tailwind:

*ألوان مخصصة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b8509c47b25281abd7e539248110d7f6b963ff321611b5be66013d6a89534a5c.html)*

```html
<div class="bg-brand-500 text-midnight">...</div>
```

## OKLCH والتدرّجات

استيفاء أفضل باستخدام OKLCH:

*OKLCH والتدرّجات — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b4ed486bd1bfe2499af033c10882ab772da212b16785317e039de93040887482.html)*

```html
<!-- Standard gradient -->
<div class="bg-linear-to-r from-purple-500 to-pink-500">Smooth OKLCH interpolation</div>

<!-- Explicit OKLCH interpolation -->
<div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400">Vibrant color transitions</div>
```

## الوضع الداكن باستخدام OKLCH

الإضاءة التي يمكن التنبؤ بها تسهّل الوضع الداكن:

```css
@theme {
  --color-surface: oklch(0.98 0 0); /* Light mode */
  --color-text: oklch(0.15 0 0); /* Light mode */
}

.dark {
  --color-surface: oklch(0.12 0 0); /* Dark mode */
  --color-text: oklch(0.95 0 0); /* Dark mode */
}
```

## نصائح إمكانية الوصول

1. **استخدم قيم L للتباين** - فروق L أكبر = تباين أفضل
2. **تحقّق دائمًا بالأدوات** - فرق L وحده لا يكفي
3. **اختبر السمتين** - يحتاج الوضعان الداكن والفاتح إلى فحوص منفصلة

## دعم المتصفحات

يتطلب OKLCH متصفحات حديثة:

- Chrome 111+
- Safari 15.4+
- Firefox 113+

> **يتضمن Tailwind 4.1+ بدائل احتياطية للمتصفحات الأقدم، لكن توقّع اختلافات.**

## أمثلة عملية

**زر عالي التباين:**

*أمثلة عملية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/baeec31cd36e93bfdbc23ba548c002c2b313c74f5dfc20c4f5b925928b4379fd.html)*

```html
<button class="bg-[oklch(0.2_0.1_250)] text-[oklch(0.95_0_0)]">
  High Contrast (L: 0.2 vs 0.95)
</button>
```

**لون تمييز حيوي:**

*أمثلة عملية — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ad491bd44845466c559f0f6d829991289c5d7ab9afc133fd780aa9f711225122.html)*

```html
<div class="bg-[oklch(0.7_0.25_160)]">High chroma for vivid color</div>
```

**لوحة ألوان متاحة:**

```css
@theme {
  /* Ensure 0.4+ lightness difference */
  --color-bg: oklch(0.98 0 0);
  --color-text: oklch(0.25 0 0);
  --color-primary: oklch(0.55 0.2 250);
}
```
