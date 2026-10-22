---
title: "أدوات التباعد والفصل"
---

## المسافة

تضيف أداة `space-` هوامش ثابتة بين العناصر التابعة.

> **إنها مجرد اختصار**
>
> يضيف `space` هوامش إلى كل العناصر التابعة عدا الأخير.

- **الاتجاه**: `space-x-{n}` (أفقي)، `space-y-{n}` (رأسي)
- **بلا حواف خارجية**: لا تؤثر على هوامش العنصر الأول أو الأخير

### التباعد الرأسي

*التباعد الرأسي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7e0f2e5e6889514a9d1a2b1fa8748eab558f05c6840d7f0ebf7865a87e8fcbc3.html)*

```html
<div class="space-y-4 bg-sky-100 px-4">
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">First</div>
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">Second</div>
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">Third</div>
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">Fourth</div>
</div>
```

### التباعد الأفقي

*التباعد الأفقي — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a94c30cee9d37fbb10d7bc364d9c499482f9a53727a290c017e62fffaef2821b.html)*

```html
<div class="space-x-8">
  <button class="rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md">
    Button
  </button>
  <button class="rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md">
    Button
  </button>
  <button class="rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md">
    Button
  </button>
</div>
```

هذا ما تفعله *حقًا* تحت الغطاء:

```css
.space-y-4 > * + * {
  margin-top: 1rem;
}
```

- **استخدمها من أجل:** القوائم وتخطيطات الصفوف والأعمدة ذات التباعد المتساوي.
- **القيود:** تباعد ثابت فقط، بلا هوامش خارجية.

> **لماذا لا تستخدم flexbox ببساطة؟**
>
> يحافظ `space-y-*` على تدفق المستند الطبيعي بينما ينشئ flexbox سياق تنسيق مرنًا. مع Flexbox يصبح كل شيء عنصرًا مرنًا، ما قد يؤثر على كيفية تدفق النص وسلوك القوائم وغير ذلك.
>
> لكن بصراحة، على الأرجح أن الأمر لا يهم.

## الفصل

تضيف أداة `divide` حدودًا بين العناصر التابعة بوصفها فواصل.

*الفصل — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/acd410a0819dd82c39fd2cad8281f39da157d6fbdf047047eae9412509b0b77c.html)*

```html
<div class="divide-y-4 bg-sky-100 px-4">
  <div class="bg-fuchsia-500 text-center">First</div>
  <div class="bg-fuchsia-500 text-center">Second</div>
  <div class="bg-fuchsia-500 text-center">Third</div>
  <div class="bg-fuchsia-500 text-center">Fourth</div>
</div>
```

خصّص السماكة واللون:

*الفصل — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c73cc306f1ab150e0a9911ce9888b1ad77fb29e430c7fb374559441939bbed8b.html)*

```html
<div class="divide-y-4 divide-cyan-400 bg-sky-100 px-4">
  <div class="bg-fuchsia-500 text-center">First</div>
  <div class="bg-fuchsia-500 text-center">Second</div>
  <div class="bg-fuchsia-500 text-center">Third</div>
  <div class="bg-fuchsia-500 text-center">Fourth</div>
</div>
```

## المقارنة والتباين

### كل من space *و* divide

- تدير التباعد بين العناصر التابعة
- تدعم المتغيّرات المتجاوبة
- تمتلك اتجاهي `-x` و`-y`
- قابلة للتخصيص عبر `@theme`

### space

- تضيف **هوامش** بين العناصر
- تؤثر على كل العناصر التابعة (بما فيها الأول والأخير)
- مثال: `space-x-4`

### divide

- تضيف **حدودًا** بوصفها فواصل
- تتخطى الحافتين الأولى والأخيرة تلقائيًا
- لونها ونمطها قابلان للتخصيص
- مثال: `divide-x-2 divide-gray-300`
