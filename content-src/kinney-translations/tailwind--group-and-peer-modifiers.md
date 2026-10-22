---
title: "معدِّلات group وpeer"
---

معدِّلا `group` و`peer` من أقوى ميزات Tailwind لإنشاء مكوّنات تفاعلية دون كتابة CSS مخصص. يتيحان لك تنسيق العناصر بناءً على حالة العناصر الأب (`group`) أو الأشقاء (`peer`).

## تنسيق حالة العنصر الأب

تتيح لك معدِّلات `group` تنسيق العناصر الابنة عندما تتغيّر حالة عنصر أب. تضيف group إلى عنصر أب، ثم تستخدم `group-hover:` و`group-focus:` وما شابه على العناصر الابنة.

طبّق صنف `group` على عنصر أب، ثم استخدم صيغ `group-*` على العناصر السليلة:

*تنسيق حالة العنصر الأب — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/6450343962365f6e955f5c00829c0dcee3453c21ffbb0c9445e0086776013ab1.html)*

```html
<div class="group">
  <h3>Parent</h3>
  <p class="group-hover:text-blue-500">Changes when parent is hovered</p>
</div>
```

من حالات الاستخدام المثالية:

- تأثيرات تمرير متعددة العناصر على البطاقات
- عناصر تنقل بأيقونات ونص
- تفاعلات أزرار معقدة
- عناصر قائمة تفاعلية

> **يمكنك دمج المعدِّلات مع الصيغ.**
>
> يعمل مع كل الأصناف الزائفة: `group-focus` و`group-active` و`group-odd`.

### مثال عملي: بطاقة تفاعلية

*مثال عملي: بطاقة تفاعلية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/dde935d0de16b37d211cae08b41c00bffd2429f5b3fdcb873dda32feac9569d7.html)*

```html
<div class="group rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
  <h3 class="mb-2 text-lg font-semibold transition-colors group-hover:text-blue-600">
    Product Card
  </h3>
  <p class="mb-4 text-gray-600 transition-colors group-hover:text-gray-800">
    A fantastic product description.
  </p>
  <button
    class="rounded bg-blue-500 px-4 py-2 text-white transition-all group-hover:scale-105 group-hover:bg-blue-600"
  >
    Buy Now
  </button>
</div>
```

### ميزات group المتقدمة

**`group-has-*`** - التنسيق بناءً على حالة العنصر السليل:

*ميزات group المتقدمة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/06fc0188b59c862a098239912ec3b7be19a14eeb779e161a02a5d19e3d716c92.html)*

```html
<div class="group">
  <p class="group-has-[:focus]:font-bold">Bold when any child has focus</p>
  <input />
  <input />
  <input />
</div>
```

**مجموعات مسمّاة** للتعشيش:

*ميزات group المتقدمة — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5ac273ced0b6215f6b854d039f26d17fbda8d7acbfa39a1ea0e854e881ef2c06.html)*

```html
<div class="group/outer">
  <div class="group/inner">
    <p class="group-hover/inner:text-blue-500 group-hover/outer:text-red-500">
      Responds to specific parent
    </p>
  </div>
</div>
```

**محدِّدات عشوائية**: `group-[.is-active]:bg-gray-100`

**قابلية التركيب في v4**: ادمجها مع صيغ أخرى مثل `group-has-focus:not-disabled:opacity-100`

### نمط الحاوية الذكية

استخدم `group-has` لإنشاء مكوّنات واعية بالسياق:

*نمط الحاوية الذكية — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f5a3db92f332d333376710a0aae3573f73992e3ee7a1de3e569b00d7ddd85566.html)*

```html
<!-- Navigation that changes theme when it contains an active link -->
<nav class="group group-has-[.active]:bg-blue-50 group-has-[.active]:shadow-lg">
  <a href="#" class="group-hover:text-blue-200">Home</a>
  <a href="#" class="active">Products</a>
</nav>

<!-- Form that styles based on validation state -->
<form class="group group-has-[:invalid]:border-red-500 group-has-[:valid]:border-green-500">
  <input type="email" required />
  <div class="hidden text-red-600 group-has-[:invalid]:block">
    Please fix errors before submitting
  </div>
</form>
```

## تنسيق حالة العنصر الشقيق

تتيح لك معدِّلات peer تنسيق العناصر بناءً على حالة العناصر الأشقاء. تضيف peer إلى عنصر واحد، ثم تستخدم `peer-hover:` و`peer-checked:` و`peer-focus:` وما شابه على الأشقاء الذين يأتون بعده في DOM.

طبّق صنف `peer` على عنصر، ثم استخدم صيغ `peer-*` على الأشقاء اللاحقين:

*تنسيق حالة العنصر الشقيق — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/94a9cd1f1d5660fef0307331f911e0b90f826b16380a8475aa554f0ddc6a9176.html)*

```html
<div class="space-y-1">
  <label class="block peer-invalid:text-red-500" for="email">Email</label>
  <input type="email" id="email" class="peer block rounded-sm outline-1" />
  <p class="peer-invalid:text-red-500">Please provide a valid email</p>
</div>
```

**مهم:** يعمل `peer` *فقط* على الأشقاء الذين يأتون بعد عنصر peer. هذا قيد في CSS.

يعمل `peer` مع كل الأصناف الزائفة: `peer-focus` و`peer-required` و`peer-disabled`.

### نمط التسمية العائمة

مثالي لحقول النماذج الحديثة:

*نمط التسمية العائمة — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/25b9542e648e53eb60bbcc7e2d4784b5733815f80324963f8d247f7800908524.html)*

```html
<div class="relative">
  <input
    class="peer w-full rounded border px-3 pt-6 pb-2 placeholder-transparent focus:outline-none"
    placeholder="Enter your email"
    type="email"
  />
  <label
    class="absolute top-2 left-3 text-xs text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
  >
    Email Address
  </label>
</div>
```

### ميزات peer المتقدمة

**أقران مسمّون** لعدة أشقاء:

*ميزات peer المتقدمة — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/aad1e123cea86b854aa061c5308b581976b40e89fc1ac964ef188f43a3eb76a9.html)*

```html
<input type="email" class="peer/email" />
<input type="password" class="peer/password" />
<p class="hidden peer-invalid/email:block">Invalid email</p>
<p class="hidden peer-invalid/password:block">Invalid password</p>
```

> **محدِّدات عشوائية**
>
> يمكنك استخدام `peer` مع **محدِّدات عشوائية**: `peer-[&:nth-child(3)]:mt-4`.

## المزالق الشائعة وحلولها

### مشكلة تعدد الأقران

*مشكلة تعدد الأقران — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/39373328fd2446947047a974f56f375ecf2da2c2d9912c1878db9b74a36084e4.html)*

```html
<!-- ❌ Ambiguous - which peer responds? -->
<input class="peer" />
<input class="peer" />
<label class="peer-focus:text-blue-600">Confusing!</label>

<!-- ✅ Clear with named peers -->
<input class="peer/email" />
<input class="peer/password" />
<label class="peer-focus/email:text-blue-600">Clear!</label>
```

### تعارضات المجموعات المتعشّشة

*تعارضات المجموعات المتعشّشة — المثال 10 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ad78c8bf6477c09f41b4861932ef9f45ae64da5fdc8cd2112d2605c5997003f3.html)*

```html
<!-- ❌ Inner button responds to both groups -->
<div class="group">
  <div class="group">
    <button class="group-hover:scale-110">Unpredictable</button>
  </div>
</div>

<!-- ✅ Named groups prevent conflicts -->
<div class="group/outer">
  <div class="group/inner">
    <button class="group-hover/inner:scale-110">Predictable</button>
  </div>
</div>
```

## إظهار المحتوى المشروط

أظهر المحتوى أو أخفه بناءً على اختيارات النموذج دون JavaScript بدمج `group` مع `has-*:` ليصبح `group-has-*:`

*إظهار المحتوى المشروط — المثال 11 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f945388370dbbf24224fde777e44364f69eb14d612648cb692ff07de77d06b92.html)*

```html
<div class="group rounded-lg border p-4">
  <h3 class="font-semibold">Feedback Survey</h3>

  <div class="mt-4 space-y-2">
    <label class="flex items-center gap-2">
      <input type="radio" name="rating" value="good" class="h-4 w-4" />

      <span class="text-sm">Good</span>
    </label>

    <label class="flex items-center gap-2">
      <input type="radio" name="rating" value="poor" class="h-4 w-4" />

      <span class="text-sm">Poor</span>
    </label>
  </div>

  <div class="mt-4 hidden rounded bg-yellow-50 p-3 group-has-[input[value='poor']:checked]:block">
    <label class="block text-sm font-medium">What went wrong?</label>

    <textarea
      class="mt-1 block w-full rounded border-2 border-yellow-300 bg-white px-3 py-2 text-sm focus:border-yellow-500 focus:outline-none"
      rows="2"
    ></textarea>
  </div>
</div>
```

المحتوى المشروط:

- `hidden`: المحتوى مخفي افتراضيًا
- `has-[input[value='poor']:checked]:block`: يظهر عندما يُحدَّد زر اختيار معيّن
- يستهدف قيمًا محددة باستخدام محدِّدات الخصائص

مثالي للنماذج المتفرعة وأنماط الكشف التدريجي.

## الفروق الأساسية

- **`group`**: من الأب → إلى السلائل (بأي عمق)
- **`peer`**: من الشقيق → إلى الأشقاء اللاحقين فقط
- **`group-has`**: يستجيب الأب لحالات السلائل
- **الصيغ المسمّاة**: تمنع التعارضات في التخطيطات المعقدة
