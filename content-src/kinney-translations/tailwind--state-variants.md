---
title: "تنويعات الحالة"
---

تطبّق تنويعات الحالة أصناف Tailwind المساعد شرطًا اعتمادًا على حالة العنصر أو سياقه. بادِئ أي صنف مساعد باسم التنويع متبوعًا بنقطتين: `hover:bg-blue-500`، `md:text-lg`.

الفرق الأساسي عن CSS: يستخدم Tailwind أصنافًا منفصلة لكل حالة بدلًا من تجميع عدة حالات في صنف واحد. لا يُطبَّق صنف التنويع إلا أثناء تلك الحالة تحديدًا.

## أنواع تنويعات الحالة

### الأصناف الزائفة

**تفاعلية:** `hover`، `focus`، `active`، `visited`، `focus-within`، `focus-visible`

**بنيوية:** `first`، `last`، `odd`، `even`، `only-child`، `first-of-type`، `last-of-type`، `only-of-type`، `nth-of-type()`

**النماذج:** `required`، `disabled`، `invalid`، `read-only`، `indeterminate`، `checked`

**خاصة:** `target`، `placeholder-shown`، `details-content`، `autofill`

### العناصر الزائفة

- `before` و`after`
- `placeholder` (حقول إدخال النماذج)
- `file` (أزرار إدخال الملفات)
- `marker` (عناصر القوائم)
- `selection` (النص المحدّد)
- `first-line` و`first-letter`
- `backdrop` (الحوارات)

### استعلامات الوسائط والميزات

**متجاوبة:** `sm`، `md`، `lg`، `xl`، `2xl` (عروض إطار العرض)

**استعلامات الحاويات:** `@sm`، `@md`، `@max-sm`، `@max-md` (حجم حاوية الأصل)

- الحاويات المسمّاة: `@sm/{name}`

**تفضيلات المستخدم:**

- `dark` (الوضع الداكن)
- `motion-reduce`، `motion-safe`
- `contrast-more`، `contrast-less`
- `forced-colors`، `not-forced-colors`
- `inverted-colors`
- `portrait`، `landscape`
- `print`

**المؤشّر:** `pointer-fine`، `pointer-coarse`، `pointer-none`

**كشف الميزات:** `supports-[...]`، `not-supports-[...]`

### محدّدات الخصائص

- **ARIA:** `aria-*` (مثل `aria-checked`)
- **البيانات:** `data-*` (مثل `data-active`)
- **الاتجاه:** `rtl`، `ltr`
- **الحالة:** `open` (details/dialog)، `inert`

### محدّدات الأبناء

- `*` - الأبناء المباشرون فقط
- `**` - جميع الأبناء

## أنماط التنويعات الخاصة

**`group-*`** - التنسيق حسب حالة الأصل (يحتاج الأصل إلى الصنف `group`)

*أنماط التنويعات الخاصة — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/638abe229a95cd6344e7fa25e60ea71ae27d7ec97c6526f18a9109927e41f077.html)*

```html
<div class="group">
  <button class="group-hover:bg-blue-500">...</button>
</div>
```

**`peer-*`** - التنسيق حسب حالة الشقيق السابق (يحتاج الشقيق إلى الصنف `peer`)

*أنماط التنويعات الخاصة — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7ac62de32231009240c8f6b744f36497f07bfb74e59fbd2a6f0a3000b42a9ba3.html)*

```html
<input class="peer" /> <span class="peer-invalid:block">Error</span>
```

**`has-*`** - التنسيق حسب حالة أحد الأبناء

*أنماط التنويعات الخاصة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/67896f0a32fd3cd54eeb152ae0b7adc1d760b36518e829d789f2305e2d9ac148.html)*

```html
<div class="has-[:focus]:ring">...</div>
```

**`in-*`** - التنسيق حسب حالة أي من الأبناء (لا حاجة إلى صنف)

## تراكم التنويعات

اجمع بين عدة شروط: `dark:md:hover:bg-blue-500`

**تغيّر في v4:** أصبح ترتيب التراكم من اليسار إلى اليمين (كان من اليمين إلى اليسار في v3)

## تنويعات مخصّصة

**عشوائية:** `[&.is-dragging]:cursor-grabbing`

**قابلة لإعادة الاستخدام:** تُعرَّف بـ `@custom-variant` في CSS

##تغييرات Tailwind 4

- `hover` لا يُطبَّق إلا عندما يدعم الجهاز التمرير
- تنويعات `nth-*` تقبل أي رقم افتراضيًا
- خصائص `data-*` المنطقية لا تحتاج إلى أقواس مربّعة
