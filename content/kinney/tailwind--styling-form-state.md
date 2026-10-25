---
title: "المزيد من تحسينات تنسيق حالة النماذج"
lang: ar
source: "https://stevekinney.com/courses/tailwind/styling-form-state"
---

يمكنك تنسيق عناصر النماذج بناءً على حالتها دون منطق شرطي.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0f944cb323b9cbbdac875e608f147183c87e9e6bafe0b7e49b3fcc2417619c3f.html)*

```html
<input
  class="rounded-md bg-white px-3 py-1.5 outline-2 outline-slate-400 invalid:outline-red-500 disabled:cursor-not-allowed disabled:bg-gray-100"
/>
```

### المتغيّرات المتاحة

- `required:`
- `invalid:` / `valid:`: حالة التحقق من الإدخال.
- `user-invalid:` و`user-valid:`: يفحص الصحة *بعد* تفاعل المستخدم مع الحقل.
- `in-range:` و`out-of-range:`: للاستخدام مع حقول الأرقام
- `disabled:` و`enabled:`
- `read-only:`: الحقول التي تكون… للقراءة فقط.
- `checked:`: مربعات الاختيار/أزرار الاختيار
- `indeterminate:`: اختيار جزئي مع مربعات الاختيار.
- `optional:`: الحقول غير المطلوبة.
- `placeholder-shown:`: أنماط عندما يكون النص النائب مرئيًا.
- `autofill:`: الحقول التي ملأها المتصفح تلقائيًا.
- `focus:` / `focus-visible:` / `focus-within:`: [حالات التركيز](https://stevekinney.com/courses/tailwind/focus-states)

## تنسيق عناصر النماذج

### النص النائب

*النص النائب — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/38798eaa0e52d336bc1fdca80c75f2c4b65c87b885055ccafc761cf4364a6ac7.html)*

```html
<input
  placeholder="Email"
  class="rounded-md bg-white px-3 py-1.5 outline-2 outline-slate-400 placeholder:italic"
/>
```

### حقول الملفات

*حقول الملفات — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/8c004bb37631e0b89251744317062fb731a4997b0887625bf92fa40ba3e79967.html)*

```html
<input
  type="file"
  class="file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-600 dark:file:text-indigo-100 dark:hover:file:bg-indigo-500"
/>
```

### مؤشر النص

*مؤشر النص — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d570037265e2c7e6bcebd2268f2afe7aa6f76a1b3044cb7fdb25091acda902b3.html)*

```html
<input class="rounded-md bg-white px-3 py-1.5 caret-pink-500 outline-2 outline-slate-400" />
```

## أدوات النماذج

### إعادة ضبط أنماط المتصفح

*إعادة ضبط أنماط المتصفح — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/bc42508d7caaf3b69c83459c077888ea695f91c7569beec063a390017853ac25.html)*

```html
<select
  class="b w-fullg-white block appearance-none rounded-md px-3 py-2 pr-8 outline-2 outline-slate-400 focus:border-blue-500 focus:outline-pink-400"
>
  <option value="">Choose an option</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</select>
```

### التحكم في تحديد النص

*التحكم في تحديد النص — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/71fd9217266eb04012e39416eb54582070b292c24c443f4c1bbf95963e95f1b2.html)*

```html
<div class="space-y-4">
  <div
    class="b w-fullg-white block rounded-md px-3 py-2 outline-2 outline-slate-400 select-all focus:outline-pink-400"
  >
    This text will be selected when clicked
  </div>
  <div
    class="b w-fullg-white block rounded-md px-3 py-2 outline-2 outline-slate-400 select-none focus:outline-pink-400"
  >
    This text cannot be selected
  </div>
  <div
    class="b w-fullg-white block rounded-md px-3 py-2 outline-2 outline-slate-400 select-text focus:outline-pink-400"
  >
    This text can be selected normally
  </div>
</div>
```

### سلوك تغيير الحجم

*سلوك تغيير الحجم — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c6c6943f01ced5830d6b5cf4e54c8a607a347f0e17ce9180fdc2c4e8a007b0fc.html)*

```html
<div class="space-y-4">
  <textarea
    class="block w-full resize-none rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400"
    placeholder="Cannot be resized"
  ></textarea>
  <textarea
    class="block w-full resize-y rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400"
    placeholder="Resize vertically only"
  ></textarea>
  <textarea
    class="block w-full resize-x rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400"
    placeholder="Resize horizontally only"
  ></textarea>
  <textarea
    class="block w-full resize rounded-md bg-white px-3 py-2 outline-2 outline-slate-400 focus:outline-pink-400"
    placeholder="Resize in both directions"
  ></textarea>
</div>
```

## تحديثات Tailwind 4

- **تحجيم الحقول:** `field-sizing-content` (نمو تلقائي) أو `field-sizing-fixed`
- **لون النص النائب:** الآن بعتامة 50% من لون النص (كان gray-400)
- **مؤشر الأزرار:** الافتراضي `cursor-default` (كان pointer)
- **المحيط:** `outline-hidden` يحافظ على المحيط في وضع الألوان الإجبارية
