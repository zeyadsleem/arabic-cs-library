---
title: "حالات التركيز"
lang: ar
source: "https://stevekinney.com/courses/tailwind/focus-states"
---

## `focus`: يظهر دائمًا

يُفعَّل `focus:` عند أي حدث تركيز (الفأرة، لوحة المفاتيح، برمجيًا).

*focus: يظهر دائمًا — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/10f6729c08a6dcb5eb7a5946b73f8b3df00e2c6a0a59cdef7dba908aa3c4ce80.html)*

```html
<button class="bg-blue-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
  Click or tab
</button>
```

استخدم التركيز **دائمًا** لعناصر تحكم النماذج حيث يحتاج المستخدمون إلى تغذية واضحة بغض النظر عن طريقة الإدخال.

*focus: يظهر دائمًا — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/992d927ca393c6a59fb75b7aca3504408e0f6b13f1471c34ded2ce9693b20de0.html)*

```html
<input class="rounded-md bg-white px-3 py-1.5 outline-2 outline-slate-300 focus:outline-pink-400" />
```

لروابط التخطي أو التنقل الرئيسي أو العناصر الحرجة لإمكانية الوصول. ينبغي أن تكون هذه العناصر واضحة فورًا عند التركيز، بغض النظر عن كيفية تحقيقه.

```html
<a href="#main-content" class="outline-offset-4 focus:outline-2 focus:outline-blue-500">
  Skip to main content
</a>
```

تريده أيضًا عندما تحاول إظهار حالة خطأ.

*focus: يظهر دائمًا — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/bbe3237381722093ea7b2f4965a2884843bbabf44c20662e800189288fb4508c.html)*

```html
<input
  type="email"
  placeholder="Email"
  class="focus:-outline-2 block rounded-md border-2 border-slate-300 bg-white px-3 py-1.5 placeholder:text-slate-400 valid:outline-green-500 invalid:outline-red-500"
  required
/>
```

## `focus-visible`: كشف ذكي

يُظهر التركيز فقط عند الحاجة (التنقل بلوحة المفاتيح، لا نقرات الفأرة).

*focus-visible: كشف ذكي — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a175b9f7bdfe40f1a1c7172b8f49bb74e4e59072014973ba267eca945e8bd1be.html)*

```html
<button
  class="bg-blue-200 px-3 py-2 hover:bg-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:bg-blue-400"
>
  Smart Focus
</button>
```

تحدّد استدلالات المتصفح متى يُظهر التركيز — عادةً لمستخدمي لوحة المفاتيح فقط.

## `focus-within`: تنسيق العنصر الأب

ينسّق العنصر الأب عندما يكون لأي عنصر تابع تركيز.

*focus-within: تنسيق العنصر الأب — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/259b5bc78d350837318cf10940a41d8e0e0b70419f695b630e812310f79ff29e.html)*

```html
<div
  class="space-y-4 border-2 border-gray-300 p-4 focus-within:border-blue-500 focus-within:shadow-lg"
>
  <input
    type="email"
    placeholder="Email"
    class="block rounded-md bg-white px-3 py-1.5 outline-2 placeholder:text-slate-400 focus:outline-indigo-600"
  />
  <input
    type="password"
    placeholder="password"
    class="block rounded-md bg-white px-3 py-1.5 outline-2 placeholder:text-slate-400 focus:outline-indigo-600"
  />
</div>
```

تبرز الحاوية عندما يكون أي من الحقلين في حالة تركيز.

## دعم المتصفحات

يتمتع `focus-visible` بدعم جيد في المتصفحات الحديثة. للبدائل الاحتياطية:

*دعم المتصفحات — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b14e9b0490e3fcf75c954d58933a1e4e1d32a613aafa9b350f76c58691ea4e83.html)*

```html
<button class="focus:ring-2 focus-visible:ring-2">Fallback support</button>
```

## مرجع سريع

- **`focus:`** - يظهر دائمًا (الفأرة ولوحة المفاتيح)
- **`focus-visible:`** - كشف ذكي (لوحة المفاتيح فقط)
- **`focus-within:`** - تنسيق العنصر الأب عند تركيز العناصر التابعة
