---
title: "بناء بطاقة إحصاءات"
lang: ar
source: "https://stevekinney.com/courses/tailwind/building-a-statistics-card"
---

لنبدأ ببنية HTML الأساسية لمجموعة من بطاقات الإحصاءات.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7c6aefe67c3b63d60e4b3b0e222fd91c4a6e799c87bcdb8fb80c91c8e5dd4e4d.html)*

```html
<div>
  <div>
    <div>
      <h3>Total Users</h3>
      <p>1,234</p>
    </div>
    <div>
      <h3>Revenue</h3>
      <p>$45,678</p>
    </div>
    <div>
      <h3>Growth Rate</h3>
      <p>12.5%</p>
    </div>
  </div>
</div>
```

لدينا ثلاث بطاقات إحصاءات داخل حاوية، لكنها مكدّسة رأسيًا وبلا أي تنسيق. لنحوّلها إلى شبكة ذكية تتكيّف بحسب المساحة المتاحة في الحاوية الأم — لا بحسب حجم إطار العرض.

## إضافة سياق استعلام الحاوية

أولًا، لنثبّت حاويتنا بوصفها «سياق احتواء»، ونضيف تنسيقًا أساسيًا للبطاقة مستخدمين أنماطًا من [درس البطاقة](https://stevekinney.com/courses/tailwind/building-a-card).

*إضافة سياق استعلام الحاوية — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d0c5df5a9b19ba600edbbfcd8bbeffa4553d97d42c7b2939bc027b89d22f0af0.html)*

```html
<div class="@container p-4">
  <div class="grid gap-4">
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h3 class="text-sm font-medium text-slate-600">Total Users</h3>
      <p class="text-2xl font-bold text-slate-900">1,234</p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h3 class="text-sm font-medium text-slate-600">Revenue</h3>
      <p class="text-2xl font-bold text-slate-900">$45,678</p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h3 class="text-sm font-medium text-slate-600">Growth Rate</h3>
      <p class="text-2xl font-bold text-slate-900">12.5%</p>
    </div>
  </div>
</div>
```

الإضافات الأساسية:

- `@container`: يثبّت هذا العنصر بوصفه سياق استعلام حاوية — فيمكن لعناصره الآن أن تستجيب لحجم هذه الحاوية، لا لإطار العرض
- `grid gap-4`: ينشئ تخطيط CSS Grid مع فواصل قدرها 16px بين العناصر
- تنسيق البطاقة بـ`rounded-lg bg-white p-6 shadow-md` لمظهر احترافي
- تسلسل هرمي في الطباعة بتسميات صغيرة وقيم كبيرة

هذا مختلف جوهريًا عن التصميم المستجيب باستعلامات الوسائط — فستتكيّف هذه البطاقات بحسب عرض العنصر الأم، لا بحسب عرض نافذة المتصفح.

## إنشاء سلوك استجابة قائم على الحاوية

الآن لنضف السحر: جعل الشبكة مستجيبة لحجم الحاوية باستخدام أدوات استعلام الحاوية.

*إنشاء سلوك استجابة قائم على الحاوية — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b0976661a376ccb86f0442855691729d17f016cf92b16ecee8d4a946b52f192d.html)*

```html
<div class="@container p-4">
  <div class="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h3 class="text-sm font-medium text-slate-600">Total Users</h3>
      <p class="text-2xl font-bold text-slate-900">1,234</p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h3 class="text-sm font-medium text-slate-600">Revenue</h3>
      <p class="text-2xl font-bold text-slate-900">$45,678</p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-md">
      <h3 class="text-sm font-medium text-slate-600">Growth Rate</h3>
      <p class="text-2xl font-bold text-slate-900">12.5%</p>
    </div>
  </div>
</div>
```

السلوك المستجيب لاستعلام الحاوية:

- `@sm:grid-cols-2`: عندما يبلغ عرض الحاوية 384px على الأقل، اعرض عمودين
- `@lg:grid-cols-3`: عندما يبلغ عرض الحاوية 512px على الأقل، اعرض ثلاثة أعمدة
- الافتراضي (بلا بادئة): عمود واحد عندما تكون الحاوية ضيّقة

تشير البادئة `@` إلى أن هذه استعلامات حاويات لا استعلامات وسائط. وتستجيب البطاقات لحجم العنصر الأب المباشر، ما يجعلها مثالية للتعديلية في الأشرطة الجانبية أو لوحات المعلومات أو أي تخطيط مقيَّد.

## لماذا تهم استعلامات الحاويات

يستخدم التصميم المستجيب التقليدي استعلامات وسائط تستجيب لحجم إطار العرض. لكن ماذا لو أردت وضع شبكة الإحصاءات هذه في شريط جانبي ضيّق؟ كانت استعلامات الوسائط ستعرض تخطيط سطح المكتب حتى مع ضيق الحاوية.

تحل استعلامات الحاويات ذلك بجعل المكوّنات **قابلة لإعادة الاستخدام فعلًا**. فمكوّن شبكة الإحصاءات نفسه سي:

- يعرض عمودًا واحدًا في شريط جانبي ضيّق (حتى على سطح المكتب)
- يعرض عمودين أو ثلاثة في منطقة المحتوى الرئيسية
- يتكيّف تلقائيًا مع أي حجم لحاوية أم

هذا هو مستقبل تصميم المكوّنات المستجيب — مكوّنات تتكيّف مع سياقها، لا مع حجم الشاشة وحده.

## التحديات

جرّب بناء هذه الصيغ:

1. **إحصاءات محسّنة**: أضف مؤشرات اتجاه (أيقونات ↗️) لا تظهر إلا في التخطيطات متعددة الأعمدة باستخدام `@sm:block hidden`
2. **حاوية متداخلة**: ضع شبكة الإحصاءات هذه داخل حاوية بطاقة وراقب كيف تتكيّف بحسب عرض البطاقة لا بعرض الصفحة
