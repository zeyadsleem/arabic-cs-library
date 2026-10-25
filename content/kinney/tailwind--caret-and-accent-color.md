---
title: "لون المؤشّر ولون التمييز"
lang: ar
source: "https://stevekinney.com/courses/tailwind/caret-and-accent-color"
---

يوفّر Tailwind 4.0 أصنافًا مساعِدة للتحكّم في `caret-color` (مؤشّر الإدخال النصي) و`accent-color` (عناصر التحكم في النماذج مثل مربّعات الاختيار وأزرار الاختيار) مباشرةً داخل HTML لديك.

## لون المؤشّر

تنسّق `caret-color` المؤشّر الوامض في حقول الإدخال ومناطق النص. وتقابل أصناف Tailwind هذه الخاصية في CSS، مستخدمةً ألوان سمةتك أو قيمًا مخصّصة.

### ضبط لون المؤشّر بالأصناف المساعِدة

استخدم أصناف `caret-*` (مثل `caret-blue-600`، `caret-sky-400`) لضبط لون المؤشّر.

مثال:

*ضبط لون المؤشّر بالأصناف المساعِدة — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ff00a2cc124d342cb26afc3391c6e27d4810a0cccf07baffe9f7e738185be8ac.html)*

```html
<input type="text" class="border caret-rose-500" />
```

يولّد هذا CSS على نحو `caret-color: var(--color-rose-500);`. كما أنّ أصنافًا مثل `caret-inherit` و`caret-current` و`caret-transparent` متاحة أيضًا.

### استخدام القيم المخصّصة

للألوان المحدّدة غير الموجودة في سمتك، استخدم صيغة القيمة التعسّفية: `caret-[<value>]`.

```css
:root {
  --custom-cursor-color: #db2777;
  --brand-color: #2563eb;
}
```

مثال:

*استخدام القيم المخصّصة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2b8a51608e058a33fc019f2c9bcfa7432d9a7462bef80c3f84cc9d164b612194.html)[CSS](#playground-css-caret-vars)*

```html
<input type="text" class="border caret-[#123456]" />
<input type="text" class="border caret-[var(--custom-cursor-color)]" />
```

### لون مؤشّر استجابة

طَبِّق أصناف `caret-*` بشكل شرطي عند نقاط توقّف مختلفة باستخدام بادئات الاستجابة (مثل `md:caret-lime-600`).

مثال:

*لون مؤشّر استجابة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d6665cfeaf8e0f4bdb3bcc0a702cd56b0fc84a419e2cb5a4324b7e20753693be.html)*

```html
<input type="text" class="border caret-rose-500 md:caret-lime-600" />
```

### تخصيص مقياس لون المؤشّر

وسّع مقياس الألوان الافتراضي أو تجاوزه في ملف CSS الرئيسي باستخدام التوجيه `@theme` وفضاء الاسم `--color-*`.

```css
@import 'tailwindcss';

@theme {
  --color-midnight: #1a1a2e;
  --color-tahiti: #3b82f6; /* Overrides blue-500 */
}
```

يجعل هذا `caret-midnight` و`caret-tahiti` متاحين. وهذان يصبحان متغيّرات CSS (مثل `--color-midnight: #1a1a2e;`).
ولاستبدال المقياس الافتراضي، استخدم `--color-*: initial;` قبل تعريف القيم المخصّصة.

## لون التمييز

يخصّص `accent-color` لون عناصر التحكم في النماذج التي يولّدها المتصفّح.

### ضبط لون التمييز بالأصناف المساعِدة

استخدم أصناف `accent-*` (مثل `accent-indigo-500`) المشتقّة من لوحة ألوان سمةتك.

مثال:

*ضبط لون التمييز بالأصناف المساعِدة — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0c931f71bfdfc4ba1ae08b7f4f8877f1a9054da952c791e651bbe3bd52f30348.html)*

```html
<input type="checkbox" class="accent-rose-500" />
```

يولّد هذا `accent-color: var(--color-rose-500);`. كما أنّ `accent-inherit` و`accent-current` و`accent-transparent` متاحة أيضًا.

### تغيير العتامة

اضبط عتامة لون التمييز بـ`/<number>` (مثل `accent-blue-500/50`). ودعم المتصفحات لعتامة لون التمييز محدود (في Firefox بشكل أساسي).

*تغيير العتامة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2aa6856ca6e056663346258a8d5887b8beccdb9125b9e1eeff0f3cf42b63af8d.html)*

```html
<input type="checkbox" class="accent-blue-500/50" />
```

### استخدام القيم المخصّصة

استخدم صيغة القيمة التعسّفية `accent-[<value>]` لألوان تمييز مخصّصة.

*استخدام القيم المخصّصة — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a4bc8565d8676d670451894942469eb4e43316835a145efb71abb15d05507d84.html)[CSS](#playground-css-caret-vars)*

```html
<input type="checkbox" class="accent-[#abcdef]" />
<input type="checkbox" class="accent-[var(--brand-color)]" />
```

### لون تمييز استجابة

طَبِّق أصناف `accent-*` بشكل شرطي عند نقاط توقّف مختلفة (مثل `lg:accent-pink-500`).

*لون تمييز استجابة — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f73f6a474403f6c58cc3c307aab422716ef44c7d4a125c8b712c99896875752c.html)*

```html
<input type="checkbox" class="accent-blue-500 lg:accent-pink-500" />
```

### تخصيص مقياس لون التمييز

خصّص مقياس ألوانك لألوان التمييز باستخدام `@theme` وفضاء الاسم `--color-*` في CSS لديك.

```css
@import 'tailwindcss';

@theme {
  --color-primary-brand: oklch(70% 0.15 150);
}
```

تعريف `--color-primary-brand` يجعل `accent-primary-brand` متاحًا. ويُولَّد متغيّر CSS `--color-primary-brand: oklch(70% 0.15 150);`.
وتجاوز القيم الافتراضية أو امسح فضاء الاسم (`--color-*: initial;`) حسب الحاجة.
