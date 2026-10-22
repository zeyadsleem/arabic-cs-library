---
title: "حلول تحديات أدوات has-*"
---

## التحدي 1: حاوية مربع الاختيار

لنبدأ بشيء كهذا:

```html
<div>
  <input type="checkbox" id="agree" />
  <label for="agree">I agree to the terms</label>
</div>
```

**الخطوة 1**: أضف أصناف التخطيط الأساسية إلى الحاوية

```html
<div class="flex items-center gap-3 rounded-lg border border-slate-200 p-4">
  <input type="checkbox" id="agree" class="h-4 w-4" />
  <label for="agree">I agree to the terms</label>
</div>
```

**الخطوة 2**: أضف أداة `has-*` لتغيير الخلفية عندما يكون مربع الاختيار محدَّدًا

```html
<div
  class="flex items-center gap-3 rounded-lg border border-slate-200 p-4 has-[input:checked]:bg-green-50"
>
  <input type="checkbox" id="agree" class="h-4 w-4" />
  <label for="agree">I agree to the terms</label>
</div>
```

**الخطوة 3**: أضف تغيير لون الحد للحصول على تغذية راجعة كاملة

```html
<div
  class="flex items-center gap-3 rounded-lg border border-slate-200 p-4 has-[input:checked]:border-green-500 has-[input:checked]:bg-green-50"
>
  <input type="checkbox" id="agree" class="h-4 w-4" />
  <label for="agree">I agree to the terms</label>
</div>
```

تستهدف البادئة `has-[input:checked]:` الحالة التي تكون فيها الحاوية تحتوي على عنصر إدخال محدَّد. يمكنك تطبيق أدوات `has-*` متعددة لتغييرات بصرية مختلفة.

## التحدي 2: تغذية راجعة للتحقق من النماذج

**الهدف**: إنشاء حاوية حقل نموذج تعرض اللون الأخضر للإدخال الصحيح والأحمر للإدخال غير الصحيح.

لنبدأ بشيء كهذا:

```html
<div>
  <label for="email">Email Address</label>
  <input type="email" id="email" required />
</div>
```

**الخطوة 1**: أضف تنسيق الحاوية وتخطيطها

```html
<div class="rounded-lg border border-slate-200 p-4">
  <label for="email" class="block text-sm font-medium text-slate-900">Email Address</label>
  <input
    type="email"
    id="email"
    required
    class="mt-2 block w-full rounded border-slate-300 px-3 py-2"
  />
</div>
```

**الخطوة 2**: أضف تنسيق الحالة الصحيحة باستخدام `has-[input:valid]`

```html
<div
  class="rounded-lg border border-slate-200 p-4 has-[input:valid]:border-green-500 has-[input:valid]:bg-green-50"
>
  <label for="email" class="block text-sm font-medium text-slate-900">Email Address</label>
  <input
    type="email"
    id="email"
    required
    class="mt-2 block w-full rounded border-slate-300 px-3 py-2"
  />
</div>
```

**الخطوة 3**: أضف تنسيق الحالة غير الصحيحة وانتقالات سلسة

```html
<div
  class="rounded-lg border border-slate-200 p-4 transition-colors has-[input:invalid]:border-red-500 has-[input:invalid]:bg-red-50 has-[input:valid]:border-green-500 has-[input:valid]:bg-green-50"
>
  <label for="email" class="block text-sm font-medium text-slate-900">Email Address</label>
  <input
    type="email"
    id="email"
    required
    class="mt-2 block w-full rounded border-slate-300 px-3 py-2"
  />
</div>
```

تعمل حالات التحقق في HTML5 (`:valid` و`:invalid`) تلقائيًا مع `required` و`type="email"`. تستجيب الحاوية لحالة التحقق في الإدخال دون أي JavaScript.

## التحدي 3: محتوى شرطي

**الهدف**: بناء سؤال في استبيان يكشف حقل نص عندما يُختار خيار «سيّئ».

لنبدأ بشيء كهذا:

```html
<div>
  <h3>How was your experience?</h3>
  <label><input type="radio" name="rating" value="good" /> Good</label>
  <label><input type="radio" name="rating" value="poor" /> Poor</label>
  <div>Please tell us what went wrong:</div>
</div>
```

**الخطوة 1**: أضف البنية وأخفِ السؤال المتابع افتراضيًا

```html
<div class="rounded-lg border border-slate-200 p-4">
  <h3 class="font-semibold text-slate-900">How was your experience?</h3>
  <div class="mt-3 space-y-2">
    <label class="flex items-center gap-2"
      ><input type="radio" name="rating" value="good" /> Good</label
    >
    <label class="flex items-center gap-2"
      ><input type="radio" name="rating" value="poor" /> Poor</label
    >
  </div>
  <div class="mt-4 hidden">Please tell us what went wrong:</div>
</div>
```

**الخطوة 2**: استهدف قيمة زر الاختيار المحدّد لإظهار المحتوى

```html
<div class="rounded-lg border border-slate-200 p-4">
  <h3 class="font-semibold text-slate-900">How was your experience?</h3>
  <div class="mt-3 space-y-2">
    <label class="flex items-center gap-2"
      ><input type="radio" name="rating" value="good" /> Good</label
    >
    <label class="flex items-center gap-2"
      ><input type="radio" name="rating" value="poor" /> Poor</label
    >
  </div>
  <div class="mt-4 hidden has-[input[value='poor']:checked]:block">
    Please tell us what went wrong:
  </div>
</div>
```

**الخطوة 3**: أكمل قسم السؤال المتابع بتنسيق صحيح

```html
<div class="rounded-lg border border-slate-200 p-4">
  <h3 class="font-semibold text-slate-900">How was your experience?</h3>
  <div class="mt-3 space-y-2">
    <label class="flex items-center gap-2"
      ><input type="radio" name="rating" value="good" /> Good</label
    >
    <label class="flex items-center gap-2"
      ><input type="radio" name="rating" value="poor" /> Poor</label
    >
  </div>
  <div class="mt-4 hidden rounded bg-yellow-50 p-3 has-[input[value='poor']:checked]:block">
    <label class="block text-sm font-medium">Please tell us what went wrong:</label>
    <textarea class="mt-1 block w-full rounded border-yellow-300 text-sm" rows="2"></textarea>
  </div>
</div>
```

يمكنك استهداف قيم نماذج معيّنة باستخدام محدّدات الخصائص مثل `input[value='poor']`. يصنع الصنف `hidden` المقترن مع `has-*:block` سلوك إظهار وإخفاء دون أي JavaScript.

## التحدي 4: استجابة متعدّدة العناصر

**الهدف**: تصميم حاوية لنموذج اتصال تستجيب باللون الأزرق عند تركيز حقل النص، وباللون الأخضر عند تركيز حقل النص متعدّد الأسطر.

لنبدأ بشيء كهذا:

```html
<div>
  <label>Subject</label>
  <input type="text" />
  <label>Message</label>
  <textarea></textarea>
</div>
```

**الخطوة 1**: أضف بنية النموذج الأساسية وتنسيقه

```html
<div class="rounded-lg border border-slate-200 p-4">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium">Subject</label>
      <input type="text" class="mt-1 block w-full rounded border-slate-300 px-3 py-2" />
    </div>
    <div>
      <label class="block text-sm font-medium">Message</label>
      <textarea class="mt-1 block w-full rounded border-slate-300 px-3 py-2" rows="3"></textarea>
    </div>
  </div>
</div>
```

**الخطوة 2**: أضف استجابات مختلفة لتركيز الإدخال مقابل تركيز حقل النص متعدّد الأسطر

```html
<div
  class="rounded-lg border border-slate-200 p-4 transition-colors has-[input:focus]:border-blue-500 has-[input:focus]:bg-blue-50 has-[textarea:focus]:border-green-500 has-[textarea:focus]:bg-green-50"
>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium">Subject</label>
      <input type="text" class="mt-1 block w-full rounded border-slate-300 px-3 py-2" />
    </div>
    <div>
      <label class="block text-sm font-medium">Message</label>
      <textarea class="mt-1 block w-full rounded border-slate-300 px-3 py-2" rows="3"></textarea>
    </div>
  </div>
</div>
```

يمكنك استهداف أنواع عناصر مختلفة (`input` مقابل `textarea`) بأدوات `has-*` مختلفة. ستستجيب الحاوية بصورة تختلف حسب العنصر التابع الذي يحمل التركيز.

## التحدي 5: استهداف الخصائص المعقّدة

**الهدف**: إنشاء منطقة رفع ملفات تستجيب لحالات التركيز *و* تُظهر حدًا متقطّعًا حقول الملفات.

لنبدأ بشيء كهذا:

```html
<div>
  <input type="text" placeholder="Enter URL" />
  <span>or</span>
  <input type="file" />
</div>
```

**الخطوة 1**: أنشئ بنية منطقة الرفع

```html
<div class="rounded-lg border-2 border-slate-300 p-6 text-center">
  <div class="space-y-3">
    <input
      type="text"
      placeholder="Enter URL"
      class="block w-full rounded border-slate-300 px-3 py-2 text-sm"
    />
    <div class="text-sm text-slate-500">or</div>
    <input type="file" class="block w-full text-sm" />
  </div>
</div>
```

**الخطوة 2**: أضف كشف حقل الملف مع حد متقطّع

```html
<div
  class="rounded-lg border-2 border-slate-300 p-6 text-center has-[input[type='file']]:border-dashed"
>
  <div class="space-y-3">
    <input
      type="text"
      placeholder="Enter URL"
      class="block w-full rounded border-slate-300 px-3 py-2 text-sm"
    />
    <div class="text-sm text-slate-500">or</div>
    <input type="file" class="block w-full text-sm" />
  </div>
</div>
```

**الخطوة 3**: أضف حالات تركيز مختلفة لأنواع الحقول المختلفة

```html
<div
  class="rounded-lg border-2 border-slate-300 p-6 text-center transition-all has-[input[type='file']]:border-dashed has-[input[type='file']:focus]:border-green-500 has-[input[type='file']:focus]:bg-green-50 has-[input[type='text']:focus]:border-blue-500 has-[input[type='text']:focus]:bg-blue-50"
>
  <div class="space-y-3">
    <input
      type="text"
      placeholder="Enter URL"
      class="block w-full rounded border-slate-300 px-3 py-2 text-sm"
    />
    <div class="text-sm text-slate-500">or</div>
    <input type="file" class="block w-full text-sm" />
  </div>
</div>
```

يمكنك الجمع بين محدّدات معقّدة متعددة مثل `input[type='file']:focus` لاستهداف أنواع عناصر محدّدة في حالات محدّدة. ينتج عن الصنف `transition-all` تحريك سلس بين جميع تركيبات الحالات المختلفة.
