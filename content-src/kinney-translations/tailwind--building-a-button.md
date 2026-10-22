---
title: "بناء زر"
---

عندما تحدثنا آخر مرة، كان لدينا زر يعمل هكذا.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/139d3f7fc703e82e2ee00fc9e0c3b1a24a244d69a6ad4a11ce391c12105c9df5.html)*

```html
<button class="bg-blue-600 px-3 py-2 text-white">Button</button>
```

يبدو الآن كزر بلا شك، لكني أظن أننا نستطيع أن نفعل ما هو أفضل قليلًا.

## إضافة استدارة الحدود

*إضافة استدارة الحدود — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b70aae25fcf75c505d2e97af93c79773f38893ee641fcdae5fbd1815c9ba259a.html)*

```html
<button class="rounded-md bg-blue-600 px-3 py-2 text-white">Button</button>
```

أضفنا هنا الصنف `rounded-md`. هذا يعادل عمليًا إضافة CSS التالي إلى العنصر.

```css
border-radius: var(--radius-md); /* 0.375rem (6px) */
```

يمكنك رؤية جميع الخيارات المختلفة [هنا](https://tailwindcss.com/docs/border-radius). يمنح `rounded-md` الزرَ زوايا ناعمة مستديرة. هذا ينشئ مظهرًا أكثر حداثة وودًّا مقارنة بالحواف المستطيلة الحادة. إلا إذا كنت تحب ذلك.

بعض الخيارات الأخرى لتجربتها:

- `rounded-sm` (2px) لاستدارة خفيفة
- `rounded-lg` (8px) لمنحنيات أوضح
- `rounded-full` لأزرار على شكل كبسولة

## ضبط الخطوط

*ضبط الخطوط — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/15c176b380a2d1e140c5b3f15cc624177296099b27796550c5fe44e1e45ae351.html)*

```html
<button class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Button</button>
```

- `text-sm`: يضبط حجم الخط على 14px مع ارتفاع السطر المناسب. تستخدم الأزرار عادة نصًا أصغر قليلًا من نص المتن لتحسين التناسب.
- `font-semibold`: يضيف وزن خط 600، ما يجعل النص أبرز وأسهل قراءة على الخلفية الملوّنة.

## إضافة عمق خفيف بظل

يمكننا أيضًا إضافة ظل خفيف إلى الزر بسهولة باستخدام `shadow-xs`. هذا الصنف المساعد يعادل فعليًا إضافة CSS التالي.

```css
box-shadow: 0 1px rgb(0 0 0 / 0.05);
```

ربما أنت شخص أفضل مني، لكني لا أستطيع أبدًا تذكّر صيغة ظلال الصندوق دون أن أبحث عنها. لكني *أستطيع* تذكّر `shadow-xs`.

- `shadow-xs`: الأخف، مثالي للأزرار
- `shadow-sm`: أوضح قليلًا
- `shadow-md` و`shadow-lg`: للبطاقات والنوافذ المنبثقة

## إضافة أنماط لحالات التفاعل

يبدأ السحر *حقًا* عندما ترى كم يسهل تنسيق الفئات الزائفة باستخدام **المتغيّرات**. لنفترض أننا أردنا إضافة نمط عندما يحوّم المستخدم فوق الزر — أمر معقول تمامًا، أليس كذلك؟

*إضافة أنماط لحالات التفاعل — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ad26d3639666ce93933379f2130b82e9c352c3234895f265f993a6f06f21f602.html)*

```html
<button
  class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
>
  Button
</button>
```

بادئة المتغيّر `hover:` تعني أن هذا النمط يُطبَّق فقط عندما يحوّم المستخدم فوق الزر. نستخدم `blue-500` (أفتح من `blue-600` الافتراضي لدينا) لإنشاء تأثير إشراق.

تحت الغطاء، يولّد فعليًا صنف CSS التالي:

```css
.hover\:bg-blue-500:hover {
  background-color: var(--color-blue-500);
}
```

### إضافة أنماط التركيز

يمكننا أيضًا إضافة أنماط لحالات [التركيز](https://stevekinney.com/courses/tailwind/focus-states) المختلفة. أنماط التركيز هذه حاسمة من أجل:

- مستخدمي التنقل بلوحة المفاتيح
- مستخدمي قارئات الشاشة
- المستخدمين ذوي الإعاقات الحركية الذين يعتمدون على التنقل بلوحة المفاتيح
- تحقيق إرشادات إمكانية الوصول WCAG

*إضافة أنماط التركيز — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7fd9427dc1f63a2cade5af3b5d4a3ef342e74777fdc1a91a01debab5000e4fea.html)*

```html
<button
  type="button"
  class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
>
  Button
</button>
```

- `focus-visible:outline-2`: ينشئ محيطًا بسماكة 2px عند التركيز بلوحة المفاتيح
- `focus-visible:outline-offset-2`: يضيف مسافة 2px بين الزر والمحيط
- `focus-visible:outline-blue-600`: يجعل المحيط يطابق لون الزر الأزرق

سنتحدث أكثر عن هذا لاحقًا، لكن هذه هي النسخة السريعة للفرق بين `focus:` و`focus-visible:`:

- `focus`: يُطبَّق على نقرات الفأرة والتنقل بلوحة المفاتيح معًا
- `focus-visible`: يُطبَّق فقط على التنقل بلوحة المفاتيح، ما يوفّر تجربة مستخدم أفضل

## تحديات

جرّب أن تنشئ أحد الزرين التاليين أو كليهما:

- زر ثانوي.
- زر للإجراءات المدمّرة.

يمكنك أن تجد بعض الحلول الممكنة [هنا](https://stevekinney.com/courses/tailwind/button-solutions).
