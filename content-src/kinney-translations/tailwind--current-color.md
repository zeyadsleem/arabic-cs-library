---
title: "لون currentColor"
---

`currentColor` كلمة مفتاحية في CSS تعني ببساطة «استخدم لون نص العنصر». ويوفّر Tailwind أدوات لتطبيق هذا التلوين التكيفي على خصائص متعددة.

## الأدوات المتاحة

تستخدم كل أدوات `currentColor` اللاحقة `-current`:

- `bg-current` - لون الخلفية
- `border-current` - لون الحد (كل الجهات)
- `border-{side}-current` - جهات الحد الفردية
- `divide-current` - الفاصل بين الأبناء
- `outline-current` - لون المخطط
- `decoration-current` - لون زخرفة النص
- `fill-current` - لون تعبئة SVG
- `stroke-current` - لون حد SVG
- `caret-current` - لون مؤشر الإدخال
- `shadow-current` - لون ظل الصندوق
- `ring-current` - لون الحلقة (التركيز)
- `text-shadow-current` - لون ظل النص
- `accent-current` - لون تمييز عناصر النموذج

## الاستخدام الأساسي

*الاستخدام الأساسي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/750d58cf81ac992e08be1b529468d2e0c485a7c1bbe11db0092b0ed98100b34b.html)*

```html
<!-- Border inherits text color -->
<div class="border-2 border-current text-blue-500">Blue text with blue border</div>

<!-- SVG icon matches text -->
<button class="text-green-600">
  <svg class="h-4 w-4 fill-current">...</svg>
  Green text with green icon
</button>
```

## تغييرات الافتراضيات في Tailwind 4

يتبنّى Tailwind 4 `currentColor` في عدة افتراضيات:

### لون الحد

*لون الحد — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/cdaefe9e64a8126a718878417f3f97858b19a5b601e5dc0efff45828e6af88d2.html)*

```html
<!-- v3: gray-200 by default -->
<div class="border"></div>

<!--Tailwind 4: currentColor by default -->
<div class="border border-gray-200">Explicit color needed</div>
```

### لون الحلقة

*لون الحلقة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e52d60af97eb935579a16befcb589fc8c35923003f0ccc256d37f1b69ce84538.html)*

```html
<!-- v3: 3px blue ring -->
<div class="ring"></div>

<!--Tailwind 4: 1px currentColor -->
<div class="ring-3 ring-blue-500">Explicit width/color</div>
```

### نص العنصر النائب

```css
/* v3: gray-400 */
/*Tailwind 4: currentColor at 50% opacity */
```

## أنماط عملية

### مكوّنات تكيفية

*مكوّنات تكيفية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/58c4c601264f5734ed830187e3ce32e02a8b36e78028e7330a0b4c67679203ee.html)*

```html
<!-- Button adapts to parent context -->
<div class="text-indigo-600">
  <button class="border-2 border-current px-4 py-2">Indigo bordered button</button>
</div>

<div class="text-red-600">
  <button class="border-2 border-current px-4 py-2">Red bordered button</button>
</div>
```

### مكتبات الأيقونات

*مكتبات الأيقونات — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0cab9e848fde02e6c995811def9de04e13a5cc8f844fcc8d0fdcc5e6d2f79f78.html)*

```html
<!-- Icons automatically match text color -->
<span class="text-gray-600">
  <svg class="inline h-5 w-5 fill-current">...</svg>
  Gray icon matches text
</span>
```

### حالات التركيز

*حالات التركيز — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/cb92b86b974eecefd8e49564cf2d43035adffa3df8bce6f5a8d736ecb1ababe4.html)*

```html
<input class="text-blue-600 focus:ring-2 focus:ring-current focus:outline-current" />
```

## مع العتامة

ادمجها مع معدِّلات العتامة:

*مع العتامة — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ef4a3b2a3dae19b50bdba0a33a4d9d99333037ad6652db26e47e99fe6a6cdf5c.html)*

```html
<div class="border-2 border-current/50 text-purple-600">50% opacity purple border</div>
```

## في CSS المخصص

استخدمها في أنماطك:

```css
.custom-quote {
  border-left: 4px solid currentColor;
  color: var(--color-gray-700);
}
```

## قيم عشوائية

استخدم `currentColor` في صيغة القيم العشوائية:

*قيم عشوائية — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ca006e03274208788d4ddb9f8f5ab3e4f945cd4bed1e0a99147b4f681a8fc87e.html)*

```html
<div class="shadow-[0_2px_8px_currentColor/20]">Shadow using text color at 20% opacity</div>
```

## أفضل الممارسات

1. **استخدمها للتكيّف السياقي** - دع المكوّنات ترث اللون من السياق
2. **ممتازة للأيقونات** - ملفات SVG التي ينبغي أن تطابق النص المحيط
3. **قلّل التكرار** - اضبط لون النص مرة واحدة وطبّقه في كل مكان
4. **انتبه إلى الافتراضيات** - يستخدم Tailwind 4 لون currentColor على نطاق أوسع
5. **اختبر الوراثة** - تأكد من تتابع اللون كما هو متوقع
