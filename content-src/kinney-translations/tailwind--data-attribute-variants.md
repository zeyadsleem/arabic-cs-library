---
title: "صيغ خصائص البيانات"
---

نسّق العناصر بناءً على خصائص بياناتها — مثالي للحالة التي تديرها أطر JavaScript.

## الاستخدام الأساسي

### فحص الوجود (مبسّط في v4)

*فحص الوجود (مبسّط في v4) — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f0d1f5e83346cd30a29c2fe02dc5a5bef61a5431b906f6fe6940eb4932564769.html)*

```html
<!-- Styles apply when data-active exists -->
<div data-active class="opacity-50 data-active:opacity-100">Active content</div>

<!-- Common boolean attributes -->
<li data-current class="data-current:font-bold">Current item</li>
<button data-loading class="data-loading:animate-pulse">Submit</button>
```

### فحص القيمة

*فحص القيمة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/80f892658d07ce659bb4989f33f1975c88304f48831d190196991bbd16e4cb3a.html)*

```html
<!-- Styles apply when attribute has specific value -->
<div data-theme="dark" class="bg-white data-[theme=dark]:bg-gray-900">Theme-aware container</div>

<div data-state="expanded" class="h-12 data-[state=expanded]:h-auto">Expandable content</div>
```

## مع Group وPeer

*مع Group وPeer — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/8bc6bcda79272a0b9d855bbed5555b28f96be7a491280e31fc81f70956ac0391.html)*

```html
<!-- Style based on parent's data attribute -->
<div class="group" data-status="error">
  <input class="group-data-[status=error]:border-red-500" />
  <span class="hidden group-data-[status=error]:block">Error!</span>
</div>

<!-- Style based on sibling's data attribute -->
<div data-visible class="peer">Toggle</div>
<div class="hidden peer-data-visible:block">Shown when sibling has data-visible</div>
```

## اختصارات مخصصة

عرّف صيغ خصائص بيانات قابلة لإعادة الاستخدام في CSS:

```css
@import 'tailwindcss';

@theme {
  --data-state-active: [data-state= 'active'];
  --data-state-loading: [data-state= 'loading'];
  --data-orientation-vertical: [data-orientation= 'vertical'];
}
```

ثم استخدمها:

*اختصارات مخصصة — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b62f519d10cd02d8e9eb57a11e0e6629465a05de6e5441faa6d972c3624242fc.html)*

```html
<button data-state="loading" class="data-state-loading:opacity-50">Save</button>
```

## أنماط شائعة

### واجهات التبويبات

*واجهات التبويبات — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f9beb25beff28a28ba9808b5a079d447699d3eb96e66f7646fd2c8f6851bac6b.html)*

```html
<button data-selected class="data-selected:border-b-2">Tab 1</button>
```

### عناصر الأكورديون

*عناصر الأكورديون — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/616bba8200728c767651487f6d4ed971fe6a242fcf07377c2e610f4b8dfecbc0.html)*

```html
<div data-expanded class="data-expanded:pb-4">Content</div>
```

### التحقق من النماذج

*التحقق من النماذج — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/68f3eecffa8e1ecdcb42b7ab7d4fa7d03cc53603e5a9e18ce6bc82585212549f.html)*

```html
<input data-invalid class="data-invalid:ring-red-500" />
```

## أفضل الممارسات

- استخدم خصائص البيانات للحالة التي يديرها JavaScript
- أبقِ أسماء الخصائص دلالية ومتسقة
- عرّف صيغًا مخصصة للأنماط كثيرة الاستخدام
- تذكّر: يحتاج Tailwind إلى أسماء أصناف كاملة في ملفات المصدر
