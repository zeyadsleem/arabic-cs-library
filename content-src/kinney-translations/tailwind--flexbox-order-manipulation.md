---
title: "التلاعب بالترتيب"
---

التحكّم في الترتيب البصري للعناصر داخل حاويات Flexbox أو Grid أمر شائع. تتيح خاصية `order` في CSS تعديل ذلك دون تغيير بنية HTML. ويوفّر Tailwind CSS أدوات للتعامل مع هذه الخاصية مباشرةً في ترميزك (Markup).

## أدوات الترتيب الأساسية

يوفّر Tailwind أدوات مقابلة لخاصية `order` في CSS، تتيح لك تعريف سياق تكديس العناصر في حاويات Flex أو Grid. يمكنك ضبط ترتيب عنصر صراحةً أو استخدام قيم خاصة مثل `first` أو `last` أو `none`.

### الترتيب الصريح

خصّص قيم ترتيب عددية عبر `order-<number>` (مثل `order-1` و`order-3`). تضبط هذه خاصية `order` في CSS على الرقم المحدد، فتُعرض العناصر بتسلسل مختلف عن ترتيب HTML.
CSS: `order: <number>;`

*الترتيب الصريح — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/925c6e235dd77ba6142aa20de5c36afb5b0a6db63144a5c2319b73ffac262289.html)*

```html
<div class="flex gap-4 rounded-lg bg-gray-100 p-6">
  <div class="order-3 min-w-[100px] rounded-lg bg-blue-500 p-4 text-white">Item 1 (order-3)</div>
  <div class="order-1 min-w-[100px] rounded-lg bg-green-500 p-4 text-white">Item 2 (order-1)</div>
  <div class="order-2 min-w-[100px] rounded-lg bg-purple-500 p-4 text-white">Item 3 (order-2)</div>
</div>
```

### الترتيب السالب

استخدم قيم ترتيب سالبة عبر بادئة الصنف بشرطة (مثل `-order-<number>`).
CSS: `order: calc(<number> * -1);`

*الترتيب السالب — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/59d6c90c7c1edfe6298ca4d9bbc4d821310338722da175f3c3debe027172c6fa.html)*

```html
<div class="flex gap-4 rounded-lg bg-gray-100 p-6">
  <div class="min-w-[100px] rounded-lg bg-blue-500 p-4 text-white">Item 1 (default)</div>
  <div class="-order-1 min-w-[100px] rounded-lg bg-green-500 p-4 text-white">Item 2 (-order-1)</div>
  <div class="min-w-[100px] rounded-lg bg-purple-500 p-4 text-white">Item 3 (default)</div>
</div>
```

### قيم ترتيب خاصة

#### العرض في الأول أو الأخير

- `order-first`: تُعرض العناصر في البداية.
CSS: `order: calc(-infinity);`
- `order-last`: تُعرض العناصر في النهاية.
CSS: `order: calc(infinity);`

*العرض في الأول أو الأخير — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5f2b6604122924159d4bd384f8ab40ee12852b5b761b87211c8a475f57bd18cc.html)*

```html
<div class="flex gap-4 rounded-lg bg-gray-100 p-6">
  <div class="order-last min-w-[100px] rounded-lg bg-blue-500 p-4 text-white">
    Item 1 (order-last)
  </div>
  <div class="min-w-[100px] rounded-lg bg-green-500 p-4 text-white">Item 2 (default)</div>
  <div class="order-first min-w-[100px] rounded-lg bg-purple-500 p-4 text-white">
    Item 3 (order-first)
  </div>
</div>
```

#### إعادة ضبط الترتيب

- `order-none`: تعيد ضبط `order` إلى قيمتها الافتراضية (`0`). وتُرتَّب العناصر بحسب موضعها في الشيفرة المصدرية نسبةً إلى بقيّة العناصر ذات `order: 0` أو أكبر.
CSS: `order: 0;`

*إعادة ضبط الترتيب — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/36901ffa1a9a974a8c9774b6c3a8344140a8048e342b3550523f99aebf138018.html)*

```html
<div class="flex gap-4 rounded-lg bg-gray-100 p-6">
  <div class="order-2 min-w-[100px] rounded-lg bg-blue-500 p-4 text-white">Item 1 (order-2)</div>
  <div class="order-none min-w-[100px] rounded-lg bg-green-500 p-4 text-white">
    Item 2 (order-none)
  </div>
  <div class="order-1 min-w-[100px] rounded-lg bg-purple-500 p-4 text-white">Item 3 (order-1)</div>
</div>
```

## قيم ترتيب مخصّصة

إذا لم تكفِ الأدوات المُعرَّفة مسبقًا، استخدم القيم التعسّفية مع `order-[<value>]` لضبط `order` على أي قيمة CSS صالحة.

وبدلًا من ذلك، أشِر إلى متغيّر CSS عبر `order-(<custom-property>)` لقيم ترتيب ديناميكية أو مُدارة خارجيًا.

*قيم ترتيب مخصّصة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d38bd6cc3c5d28aaeccf1fa822975270656645d0561b6466bfb28ec5ad7b8e77.html)*

```html
<div class="flex gap-4 rounded-lg bg-gray-100 p-6">
  <div class="order-[5] min-w-[100px] rounded-lg bg-blue-500 p-4 text-white">
    Item 1 (order-[5])
  </div>
  <div class="order-[10] min-w-[100px] rounded-lg bg-green-500 p-4 text-white">
    Item 2 (order-[10])
  </div>
  <div class="order-[2] min-w-[100px] rounded-lg bg-purple-500 p-4 text-white">
    Item 3 (order-[2])
  </div>
</div>
```

## التلاعب بالترتيب المتجاوب

كما معظم أدوات Tailwind، يمكن تطبيق أدوات `order` بشكل مشروط عند نقاط التوقّف (مثل `sm:order-1` و`md:order-last`). ويغيّر هذا ترتيب العناصر بشكل متجاوب. وتُطبَّق الأدوات غير المسبوقة بالبادئة على جميع أحجام الشاشات، بينما تُطبَّق الأدوات المسبوقة بالبادئة عند نقطة التوقّف المحدَّدة وما فوقها.

*التلاعب بالترتيب المتجاوب — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/bf69627e56b4b0839d31024be269c504e2ebf558a867fb66d8ffff7d75d34016.html)*

```html
<div class="flex flex-col gap-4 rounded-lg bg-gray-100 p-6 md:flex-row">
  <div class="order-3 min-w-[100px] rounded-lg bg-blue-500 p-4 text-white md:order-1">
    Item 1 (mobile: 3rd, desktop: 1st)
  </div>
  <div class="order-1 min-w-[100px] rounded-lg bg-green-500 p-4 text-white md:order-2">
    Item 2 (mobile: 1st, desktop: 2nd)
  </div>
  <div class="order-2 min-w-[100px] rounded-lg bg-purple-500 p-4 text-white md:order-3">
    Item 3 (mobile: 2nd, desktop: 3rd)
  </div>
</div>
```
