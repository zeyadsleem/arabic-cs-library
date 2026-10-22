---
title: "استعلامات الحاويات"
---

تتيح لك استعلامات الحاويات تنسيق العناصر بحسب حجم العنصر الأم لا بحسب إطار العرض. وهي مثالية للمكوّنات القابلة لإعادة الاستخدام.

## استعلامات الحاوية مقابل استعلامات إطار العرض

| النوع | معيار القياس | حالة الاستخدام |
| --- | --- | --- |
| إطار العرض (`md:`) | نافذة المتصفح | تخطيطات الصفحات |
| الحاوية (`@md:`) | العنصر الأم | المكوّنات |

## الاستخدام الأساسي

ضع علامة على العنصر الأم كحاوية، ونسّق أبناءه بحسب حجمها:

```html
<div class="@container">
  <article class="flex flex-col @sm:flex-row @lg:grid @lg:grid-cols-3">
    <!-- Adapts to container width -->
  </article>
</div>
```

## نقاط توقف الحاويات

الأحجام الافتراضية تطابق نقاط توقف إطار العرض:

- `@sm`: حاوية بعرض 640px
- `@md`: حاوية بعرض 768px
- `@lg`: حاوية بعرض 1024px
- `@xl`: حاوية بعرض 1280px
- `@2xl`: حاوية بعرض 1536px

## أنماط شائعة

### مكوّن البطاقة

```html
<div class="@container">
  <div class="p-4 @sm:p-6 @md:p-8">
    <h3 class="text-lg @sm:text-xl @lg:text-2xl">Responsive heading</h3>
    <div class="mt-2 grid gap-4 @sm:mt-4 @md:grid-cols-2">
      <!-- Content -->
    </div>
  </div>
</div>
```

### تخطيط الشريط الجانبي

```html
<aside class="@container">
  <nav class="flex flex-wrap gap-2 @sm:flex-col @sm:gap-1">
    <a href="#" class="@sm:py-2">Link</a>
  </nav>
</aside>
```

## الحاويات المسمّاة

استهدف حاويات محدّدة في التخطيطات المتداخلة:

```html
<!-- Main content area -->
<main class="@container/main">
  <!-- Sidebar -->
  <aside class="@container/sidebar">
    <nav class="@sm/sidebar:block">
      <!-- Responds to sidebar width -->
    </nav>
  </aside>

  <!-- Article -->
  <article class="@lg/main:prose-lg">
    <!-- Responds to main width -->
  </article>
</main>
```

## نطاقات استعلامات الحاوية

### الحد الأقصى للعرض

```html
<div class="@container">
  <div class="@max-md:hidden">Hidden in small containers</div>
</div>
```

### نطاقات محدّدة

```html
<div class="@container">
  <div class="@sm:@max-lg:bg-blue-100">Blue only in medium containers</div>
</div>
```

## أحجام حاويات عشوائية

```html
<div class="@container">
  <!-- Custom breakpoint -->
  <div class="@min-[400px]:flex">Flex at 400px container width</div>

  <!-- Custom range -->
  <div class="@min-[300px]:@max-[500px]:bg-gray-100">Gray between 300-500px</div>
</div>
```

## أنواع الحاويات

تحكّم في البُعد الذي يُستعلم عنه:

```html
<!-- Default: inline-size (width) -->
<div class="@container">...</div>

<!-- Query height -->
<div class="@container/size">...</div>
```

## وحدات الحاوية

اضبط أحجام العناصر نسبةً إلى الحاوية:

```html
<div class="@container">
  <!-- 50% of container width -->
  <div class="w-[50cqw]">...</div>

  <!-- Font size based on container -->
  <h2 class="text-[5cqw]">Scales with container</h2>
</div>
```

الوحدات المتاحة:

- `cqw` — 1% من عرض الحاوية
- `cqh` — 1% من ارتفاع الحاوية
- `cqi` — 1% من حجم الحاوية الأفقي
- `cqb` — 1% من حجم الحاوية العمودي
- `cqmin` — 1% من أصغر بُعد في الحاوية
- `cqmax` — 1% من أكبر بُعد في الحاوية

## تخصيص أحجام الحاويات

```css
@import 'tailwindcss';

@theme {
  /* Add custom sizes */
  --container-xs: 320px;
  --container-3xl: 1600px;

  /* Override defaults */
  --container-sm: 600px;
}
```

## مثال من العالم الحقيقي

بطاقة منتج تعمل في كل مكان:

```html
<div class="@container">
  <div class="flex flex-col gap-4 p-4 @sm:flex-row">
    <!-- Image -->
    <img src="..." class="w-full rounded @sm:w-32 @md:w-48" />

    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-lg font-semibold @md:text-xl">Product Name</h3>
      <p class="mt-1 text-sm text-gray-600 @lg:text-base">
        Description that adjusts to available space
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <button class="px-3 py-1 @sm:px-4 @sm:py-2">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
```

## أفضل الممارسات

1. **استخدمها للمكوّنات** — لا لتخطيطات الصفحات
2. **سمِّ الحاويات المتداخلة** — تجنّب الالتباس
3. **اختبر عند مقاسات مختلفة** — تظهر المكوّنات في سياقات كثيرة
4. **فكّر في الأداء** — كل حاوية تضيف عبئًا
5. **ضع بديلًا للمتصفحات القديمة** — استعلامات الحاويات تحتاج متصفحات حديثة
