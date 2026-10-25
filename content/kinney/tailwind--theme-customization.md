---
title: "تخصيص السمة (Theme)"
lang: ar
source: "https://stevekinney.com/courses/tailwind/theme-customization"
---

بخلاف الإصدارات السابقة التي كانت تعتمد على ملفات إعداد JavaScript، يستخدم Tailwind 4 متغيّرات سمة أصلية في CSS تقدّم أداءً أفضل، ومشاركة أسهل بين المشاريع، وسير عمل أكثر حدسية.

## فهم متغيّرات السمة

متغيّرات السمة في Tailwind 4 هي متغيّرات CSS خاصّة تُعرَّف باستخدام التوجيه `@theme`. وهي ليست متغيّرات CSS عادية فحسب—بل تطلب من Tailwind توليد أصناف مساعِدة مقابلة، فتُصبح أساس نظام التصميم لديك.

### التوجيه `@theme`

```css
@import 'tailwindcss';

@theme {
  --color-brand-500: oklch(0.7 0.15 200);
  --font-heading: 'Inter', sans-serif;
  --spacing-gutter: 2rem;
}
```

وحين تُعرّف هذه المتغيّرات، يقوم Tailwind تلقائيًا بـ:

- إنشاء أصناف مساعِدة مثل `bg-brand-500` و`text-brand-500` و`font-heading` إلخ.
- توليد متغيّرات CSS عادية يمكنك استخدامها في CSS المخصّص
- الحفاظ على أولوية التحديد (specificity) والوراثة على نحو صحيح

### لماذا `@theme` بدلًا من `:root`؟

قد تتساءل لماذا يستخدم Tailwind توجيهًا خاصًّا هو `@theme` بدلًا من متغيّرات CSS العادية. والفروق الجوهرية هي:

- **توليد الأصناف المساعِدة**: متغيّرات السمة تُنشئ أصنافًا مساعِدة تلقائيًا
- **المعالجة وقت البناء**: يمكن لـTailwind أن يحسّن متغيّرات السمة ويتحقّق منها أثناء التصريف
- **القصد الصريح**: يوضّح استخدام `@theme` أي المتغيّرات جزء من نظام التصميم لديك
- **التحقّق**: يمكن لـTailwind أن يفرض ألّا تُعرَّف متغيّرات السمة إلّا في المستوى الأعلى

## فضاءات أسماء متغيّرات السمة

ينظّم Tailwind متغيّرات السمة في فضاءات أسماء، يتحكّم كل فضاء منها في جانب مختلف من جوانب نظام التصميم لديك. وفهم هذه الفضاءات هو أمر بالغ الأهمية لبناء نظام تصميم متّسق.

### الفضاءات الأساسية

لنتصفّح الفضاءات الرئيسية ونبنِ نظام تصميم مخصّصًا خطوة بخطوة:

#### الألوان (`--color-*`)

الألوان هي أساس معظم أنظمة التصميم. وإليك كيفية بناء لوحة ألوان شاملة:

```css
@import 'tailwindcss';

@theme {
  /* Brand colors */
  --color-primary-50: oklch(0.95 0.02 240);
  --color-primary-100: oklch(0.9 0.04 240);
  --color-primary-500: oklch(0.6 0.15 240);
  --color-primary-900: oklch(0.2 0.08 240);

  /* Semantic colors */
  --color-success: oklch(0.7 0.15 142);
  --color-warning: oklch(0.8 0.12 85);
  --color-danger: oklch(0.6 0.2 25);

  /* Neutral scale */
  --color-surface: oklch(0.98 0.002 240);
  --color-muted: oklch(0.94 0.006 240);
  --color-subtle: oklch(0.88 0.012 240);
}
```

ينشئ هذا أصنافًا مثل:

- `bg-primary-500`، `text-primary-500`، `border-primary-500`
- `bg-success`، `text-success`، `border-success`
- `bg-surface`، `text-surface`، `border-surface`

#### التنضيب (Typography) (`--font-*`، `--text-*`، `--font-weight-*`)

تتطلّب أنظمة التنضيب تنسيقًا بين عائلات الخطوط وأحجامها وأوزانها:

```css
@theme {
  /* Font families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Playfair Display', ui-serif, Georgia, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Type scale */
  --text-xs: 0.75rem;
  --text-xs--line-height: 1.2;
  --text-sm: 0.875rem;
  --text-sm--line-height: 1.4;
  --text-base: 1rem;
  --text-base--line-height: 1.5;
  --text-lg: 1.125rem;
  --text-lg--line-height: 1.6;
  --text-xl: 1.25rem;
  --text-xl--line-height: 1.6;

  /* Font weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

#### المسافات (Spacing) (`--spacing-*`)

المسافات المتّسقة أمر بالغ الأهمية للتسلسل البصري:

```css
@theme {
  /* Base spacing unit */
  --spacing: 0.25rem; /* 4px */

  /* Custom spacing values */
  --spacing-gutter: 1.5rem; /* 24px */
  --spacing-section: 4rem; /* 64px */
  --spacing-page: 6rem; /* 96px */
}
```

متغيّر `--spacing` خاص—فهو يُستخدم كوحدة أساسية لمقياس المسافات الافتراضي (1 = 4px، 2 = 8px، إلخ).

## بناء نظام تصميم كامل

لنبنِ نظام تصميم شاملًا لتطبيق SaaS، خطوة بخطوة:

### الخطوة 1: عرّف الأساس

```css
@import 'tailwindcss';

@theme {
  /* === COLORS === */
  /* Primary brand colors */
  --color-blue-50: oklch(0.97 0.01 240);
  --color-blue-100: oklch(0.94 0.03 240);
  --color-blue-200: oklch(0.88 0.06 240);
  --color-blue-300: oklch(0.82 0.09 240);
  --color-blue-400: oklch(0.74 0.12 240);
  --color-blue-500: oklch(0.65 0.15 240);
  --color-blue-600: oklch(0.55 0.18 240);
  --color-blue-700: oklch(0.45 0.15 240);
  --color-blue-800: oklch(0.35 0.12 240);
  --color-blue-900: oklch(0.25 0.09 240);
  --color-blue-950: oklch(0.15 0.06 240);

  /* Semantic colors */
  --color-success-50: oklch(0.96 0.02 142);
  --color-success-500: oklch(0.65 0.15 142);
  --color-success-900: oklch(0.25 0.08 142);

  --color-warning-50: oklch(0.96 0.02 85);
  --color-warning-500: oklch(0.75 0.12 85);
  --color-warning-900: oklch(0.35 0.08 85);

  --color-danger-50: oklch(0.96 0.02 25);
  --color-danger-500: oklch(0.6 0.2 25);
  --color-danger-900: oklch(0.3 0.12 25);

  /* === TYPOGRAPHY === */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Refined type scale */
  --text-2xs: 0.6875rem; /* 11px */
  --text-2xs--line-height: 1.2;
  --text-xs: 0.75rem; /* 12px */
  --text-xs--line-height: 1.3;
  --text-sm: 0.875rem; /* 14px */
  --text-sm--line-height: 1.4;
  --text-base: 1rem; /* 16px */
  --text-base--line-height: 1.5;
  --text-lg: 1.125rem; /* 18px */
  --text-lg--line-height: 1.6;
  --text-xl: 1.25rem; /* 20px */
  --text-xl--line-height: 1.6;

  /* === SPACING === */
  --spacing: 0.25rem; /* 4px base unit */

  /* Semantic spacing */
  --spacing-section: 5rem; /* 80px */
  --spacing-container: 1.5rem; /* 24px */

  /* === LAYOUT === */
  --container-sm: 40rem; /* 640px */
  --container-md: 48rem; /* 768px */
  --container-lg: 64rem; /* 1024px */
  --container-xl: 80rem; /* 1280px */

  /* === EFFECTS === */
  --radius-sm: 0.375rem; /* 6px */
  --radius-md: 0.5rem; /* 8px */
  --radius-lg: 0.75rem; /* 12px */

  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-dialog: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

```css
@theme {
  --color-brand-500: oklch(0.65 0.15 240);
  --color-success-50: oklch(0.96 0.02 142);
  --color-success-200: oklch(0.88 0.06 142);
  --color-success-500: oklch(0.65 0.15 142);
  --color-success-900: oklch(0.25 0.08 142);
  --color-surface: oklch(0.99 0.002 240);
  --color-surface-muted: oklch(0.96 0.004 240);
  --color-text: oklch(0.15 0.006 240);
  --color-text-muted: oklch(0.45 0.008 240);
  --color-border: oklch(0.88 0.008 240);
  --color-border-muted: oklch(0.92 0.004 240);
  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

[data-theme='dark'] {
  --color-surface: oklch(0.08 0.004 240);
  --color-surface-muted: oklch(0.12 0.006 240);
  --color-text: oklch(0.94 0.004 240);
  --color-text-muted: oklch(0.7 0.006 240);
  --color-border: oklch(0.22 0.008 240);
  --color-border-muted: oklch(0.16 0.006 240);
}
```

### الخطوة 2: ابنِ المكوّنات الأساسية

الآن لنبنِ المكوّنات باستخدام نظام التصميم لدينا:

*الخطوة 2: ابنِ المكوّنات الأساسية — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ea200cc4e9c144557021d94f7c5599ff9f6739791e28bb28c7a3669f41e61d22.html)[CSS](#playground-css-brand)*

```html
<!-- Button Component -->
<button
  class="shadow-card rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg"
>
  Primary Button
</button>

<!-- Card Component -->
<div class="shadow-card space-y-4 rounded-lg border border-blue-100 bg-white p-6">
  <h3 class="text-lg font-semibold text-blue-900">Card Title</h3>
  <p class="text-base text-blue-700">Card content goes here with proper spacing and typography.</p>
</div>

<!-- Alert Component -->
<div class="bg-success-50 border-success-200 text-success-900 rounded-md border px-4 py-3">
  <p class="text-sm font-medium">Success! Your changes have been saved.</p>
</div>
```

### الخطوة 3: تعامل مع الوضع الداكن

وسّع سمتك لدعم الوضع الداكن بأناقة:

```css
@theme {
  /* Light mode colors (default) */
  --color-surface: oklch(0.99 0.002 240);
  --color-surface-muted: oklch(0.96 0.004 240);
  --color-text: oklch(0.15 0.006 240);
  --color-text-muted: oklch(0.45 0.008 240);

  /* Border colors */
  --color-border: oklch(0.88 0.008 240);
  --color-border-muted: oklch(0.92 0.004 240);
}

/* Dark mode overrides */
[data-theme='dark'] {
  --color-surface: oklch(0.08 0.004 240);
  --color-surface-muted: oklch(0.12 0.006 240);
  --color-text: oklch(0.94 0.004 240);
  --color-text-muted: oklch(0.7 0.006 240);

  --color-border: oklch(0.22 0.008 240);
  --color-border-muted: oklch(0.16 0.006 240);
}
```

والآن يمكنك استخدام هذه الألوان الدلالية التي تتكيّف تلقائيًا:

*الخطوة 3: تعامل مع الوضع الداكن — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/35e6351f181e719231025f2f391524479931706c74f6c7d895ecb280d0fe4fe5.html)[CSS](#playground-css-brand)*

```html
<div class="bg-surface border-border text-text border">
  <h2 class="text-text font-semibold">Adaptive Component</h2>
  <p class="text-text-muted">This content adapts to light and dark themes automatically.</p>
</div>
```

## تقنيات السمة المتقدّمة

### الإشارة إلى متغيّرات أخرى

عند إنشاء قيم مشتقّة، استخدم `@theme inline` للإشارة إلى متغيّرات السمة الأخرى:

```css
:root {
  --brand-hue: 240;
  --brand-saturation: 0.15;
}

@theme inline {
  --color-primary-50: oklch(0.97 calc(var(--brand-saturation) * 0.2) var(--brand-hue));
  --color-primary-500: oklch(0.65 var(--brand-saturation) var(--brand-hue));
  --color-primary-900: oklch(0.25 calc(var(--brand-saturation) * 0.6) var(--brand-hue));
}
```

يتيح لك هذا الأسلوب إنشاء أنظمة ألوان ديناميكية يمكن ضبطها بمتغيّرات أساسية قليلة فحسب.

### سمات خاصّة بالمكوّنات

أنشئ سمات متخصّصة لمكوّنات بعينها:

```css
@theme {
  /* Button system */
  --button-padding-sm: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
  --button-padding-md: calc(var(--spacing) * 2.5) calc(var(--spacing) * 4);
  --button-padding-lg: calc(var(--spacing) * 3) calc(var(--spacing) * 6);

  /* Form system */
  --form-field-height-sm: 2rem;
  --form-field-height-md: 2.5rem;
  --form-field-height-lg: 3rem;

  /* Animation system */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
}
```

### بناء مكوّنات معقّدة

لنبنِ بطاقة لوحة تحكّم شاملة باستخدام نظام التصميم لدينا:

*بناء مكوّنات معقّدة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/dffbec5e8d57d180e01784ceedde6ea387ad5137c6efd493b938c497bdeabeb8.html)[CSS](#playground-css-brand)*

```html
<article class="bg-surface border-border shadow-card overflow-hidden rounded-lg border">
  <!-- Header -->
  <header class="bg-surface-muted border-border border-b px-6 py-4">
    <div class="flex items-center justify-between">
      <h2 class="text-text text-lg font-semibold">Revenue Overview</h2>
      <button
        class="text-text-muted hover:text-text hover:bg-surface -m-2 rounded-md p-2 transition-colors duration-200"
      >
        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <!-- Icon content -->
        </svg>
      </button>
    </div>
  </header>

  <!-- Content -->
  <div class="space-y-6 p-6">
    <!-- Metrics -->
    <div class="grid grid-cols-3 gap-4">
      <div class="text-center">
        <div class="text-text text-2xl font-bold">$24,500</div>
        <div class="text-text-muted text-sm">This month</div>
      </div>
      <div class="text-center">
        <div class="text-success-500 text-2xl font-bold">+12.5%</div>
        <div class="text-text-muted text-sm">Growth</div>
      </div>
      <div class="text-center">
        <div class="text-text text-2xl font-bold">1,245</div>
        <div class="text-text-muted text-sm">Transactions</div>
      </div>
    </div>

    <!-- Chart placeholder -->
    <div
      class="bg-surface-muted border-border-muted flex h-32 items-center justify-center rounded-md border"
    >
      <span class="text-text-muted text-sm">Chart would go here</span>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-surface-muted border-border border-t px-6 py-3">
    <div class="flex items-center justify-between">
      <span class="text-text-muted text-xs"> Updated 2 hours ago </span>
      <button
        class="text-xs font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700"
      >
        View details
      </button>
    </div>
  </footer>
</article>
```

## استخدام متغيّرات السمة في CSS المخصّص

متغيّرات سمتك متاحة كمتغيّرات CSS عادية، فيصبح إنشاء أنماط مخصّصة متّسقة مع نظام التصميم سهلًا:

```css
@import 'tailwindcss';

@layer components {
  .gradient-card {
    background: linear-gradient(135deg, var(--color-blue-500), var(--color-blue-600));
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-card);
  }

  .custom-button {
    /* Use theme variables for consistency */
    background-color: var(--color-primary-500);
    color: var(--color-white);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
    border-radius: var(--radius-md);

    /* Use the --alpha() function for opacity */
    border: 1px solid --alpha(var(--color-primary-500) / 20%);

    &:hover {
      background-color: var(--color-primary-600);
    }
  }
}
```

## مشاركة السمات بين المشاريع

من أكبر مزايا السمات المعتمدة على CSS هو سهولة مشاركتها بين المشاريع:

### إنشاء حزمة سمة مشتركة

```css
/* themes/brand.css */
@theme {
  /* Brand foundation */
  --color-brand-50: oklch(0.97 0.01 240);
  --color-brand-500: oklch(0.65 0.15 240);
  --color-brand-900: oklch(0.25 0.09 240);

  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing scale */
  --spacing: 0.25rem;
  --spacing-section: 4rem;

  /* Component tokens */
  --radius-button: 0.5rem;
  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}
```

### استخدام السمات المشتركة

```css
/* In any project */
@import 'tailwindcss';
@import './themes/brand.css';

/* Project-specific customizations */
@theme {
  /* Override or extend as needed */
  --color-accent: oklch(0.7 0.15 142);
}
```

## اعتبارات الأداء

### تحسين متغيّرات السمة

صُمّم نظام السمات في Tailwind 4 من أجل الأداء، لكنّ هناك أفضل الممارسات الواجب اتباعها:

1. **استخدم التسمية الدلالية**: بدلًا من `--color-blue-500`، استخدم `--color-primary-500` لتسهيل إعادة الهيكلة
2. **قلّل القيم التعسّفية**: اعتمد على متغيّرات سمتك بدلًا من القيم التعسّفية داخل HTML
3. **استخدم خيار `static` بحذر**: لا تولّد كل متغيّرات CSS إلا عند الضرورة

```css
/* Generate all variables (use sparingly) */
@theme static {
  --color-primary-500: oklch(0.65 0.15 240);
}

/* Default: only used variables are generated */
@theme {
  --color-primary-500: oklch(0.65 0.15 240);
}
```

## الخلاصة {#conclusion}

يمثّل نظام السمات في Tailwind CSS 4 تحوّلًا جوهريًا نحو أنظمة تصميم أصلية في CSS. وبإتقانك متغيّرات السمة، يمكنك إنشاء أنظمة تصميم أكثر قابلية للصيانة والأداء والمشاركة.

وهذه المبادئ المفتاحية التي ينبغي تذكّرها:

1. **ابدأ بالأساسيات**: عرّف ألوانك وتنضيبك ومسافاتك أولًا
2. **استخدم التسمية الدلالية**: أنشئ أسماء متغيّرات ذات معنى تعكس الغرض لا المظهر
3. **ابنِ بمنهجية**: رتّب رموز التصميم (design tokens) من الأساسي إلى الخاصّ بالمكوّنات
4. **استثمر متغيّرات CSS**: استفد من متغيّرات CSS المولَّدة في الأنماط المخصّصة
5. **فكّر كأنظمة**: صمّم سمتك لتتوسّع عبر مشاريع متعدّدة وأعضاء فريق

وبهذه التقنيات، ستكون قادرًا على بناء أنظمة تصميم متطوّرة قابلة للصيانة، تنمو مع مشاريعك، وتوفّر أساسًا متينًا لواجهة المستخدم كلّها.
