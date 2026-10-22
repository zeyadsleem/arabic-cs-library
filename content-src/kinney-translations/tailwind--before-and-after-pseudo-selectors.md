---
title: "المحدِّدات الزائفة before وafter"
---

## الاستخدام الأساسي

أضف البادئة `before:` أو `after:` إلى أي أداة لتنسيق العناصر الزائفة:

*الاستخدام الأساسي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d88733856070747c8ac6f8d7eaae139fd313ef75207a99a5670949e00087de2c.html)*

```html
<div class="before:block before:h-px before:bg-gray-300 before:content-['']">Decorated text</div>
```

### محتوى فارغ تلقائي

يضيف Tailwind `content: ''` افتراضيًا عند استخدام هذه الصيغ.

## ضبط المحتوى

### محتوى نصي

*محتوى نصي — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/40cdfd9e281afc7e6825f83edb3ba4ab1545c8d4d7bdf5073fcc83d35dc0277b.html)*

```html
<span class="before:mr-2 before:content-['→']">Next</span>
<span class="after:text-red-500 after:content-['*']">Required</span>
```

### المسافات

استخدم الشرطات السفلية (تُحوَّل إلى مسافات):

*المسافات — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b0f36e83b4651d1d7336d7bdb9c7dfcce448eb41c078075094da9ab6b5c17976.html)*

```html
<div class="before:content-['Hello_world']"></div>
```

### شرطة سفلية حرفية

هرّبها بشرطة مائلة عكسية:

*شرطة سفلية حرفية — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ba1292ab4f720952473b021f1258a290595baeada8beb14689457325498213e8.html)*

```html
<div class="before:content-['snake\_case']"></div>
```

### قيم الخصائص

*قيم الخصائص — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/91ea86dded975987c1c3c4cf9ac7bb35405e64ebb908a7170d7f09cfc9d64907.html)*

```html
<div data-label="Status" class="before:content-[attr(data-label)]">...</div>
```

### متغيّرات CSS

```css
:root {
  --label: 'Status';
}
```

*متغيّرات CSS — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2942481221914fbfcf5c237c08673f4b24c884740158050add17eb41ee0261ff.html)[CSS](#playground-css-label)*

```html
<div class="before:content-[var(--label)]">...</div>
```

## متى تستخدم العناصر الزائفة

**فضّل العناصر الحقيقية** في معظم الحالات:

*متى تستخدم العناصر الزائفة — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/df0110a8a60b9f12f66a05b7392f80c7f6fcd9ce052ca22c988491bf4cbfca76.html)*

```html
<!-- Better -->
<span class="inline-block h-px w-full bg-gray-300"></span>

<!-- Only when semantic markup matters -->
<div class="before:block before:h-px before:bg-gray-300 before:content-['']">...</div>
```

استخدم العناصر الزائفة عندما:

- لا ينبغي أن يكون المحتوى قابلًا للتحديد
- يكون المحتوى زخرفيًا بحتًا
- تحتاج إلى تجنّب التأثير في تدفق المستند

## قابلية التركيب

كدّسها مع صيغ أخرى:

*قابلية التركيب — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/daf338bf755de10e80240e11538b14e5a6f5fda38356041389b52e49d4645352.html)*

```html
<button class="before:opacity-0 before:content-['→'] hover:before:opacity-100">Hover me</button>
```
