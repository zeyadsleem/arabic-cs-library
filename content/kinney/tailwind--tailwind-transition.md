---
title: "الانتقالات"
lang: ar
source: "https://stevekinney.com/courses/tailwind/tailwind-transition"
---

تُحرّك انتقالات CSS تغيّرات خصائص CSS بمرور الوقت، فتُنتج تأثيرات سلسة مثل تلاشي العناصر أو تغيّر الألوان أو تغيّر التخطيط. ويوفّر Tailwind أصنافًا مساعِدة لتطبيق الانتقالات مباشرةً داخل HTML.

## تطبيق انتقالات CSS

طَبِّق الانتقالات باستخدام الصنف المساعد `transition`. هذا يطلب من المتصفح تحريك تغيّرات الخصائص بدلًا من إجرائها فورًا.

الصنف المساعد `transition` الأساسي يفعّل الانتقالات للخصائص الشائعة: اللون، ولون الخلفية، ولون الحدّ، ولون زخرفة النص، والتعبئة (fill)، والخطّ (stroke)، ومحطّات التدرّج، والعتامة، وظلّ الصندوق، والتحويل (transform)، والإزاحة (translate)، والتحجيم (scale)، والدوران (rotate)، والفلتر (filter). وهو يضبط دالة توقيت افتراضية (`cubic-bezier(0.4, 0, 0.2, 1)`) ومدةً افتراضية (`150ms`).

يوفّر Tailwind أصنافًا مساعِدة لمجموعات خصائص محدّدة:

- `transition-all`: ينتقل بكل الخصائص القابلة للتحريك
- `transition-colors`: ينتقل بالخصائص المتعلقة بالألوان (`color`، `background-color`، `border-color`، إلخ)
- `transition-opacity`: ينتقل بـ`opacity` وحدها
- `transition-shadow`: ينتقل بـ`box-shadow` وحدها
- `transition-transform`: ينتقل بخصائص التحويل (`transform`، `translate`، `scale`، `rotate`)
- `transition-none`: يمنع أي انتقالات

مثال:

*تطبيق انتقالات CSS — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/db42a4e0a57cc4e7cc5718eba87df9530a1751e6adfa8536512f98ab9825f306.html)*

```html
<div class="bg-blue-500 transition hover:bg-red-500">Hover over me</div>
```

هنا، يُحرّك `transition` تغيّرات الخصائص، ويحدّد `hover:bg-red-500` لون الخلفية الهدف عند التحويم (hover).

## التحكّم في خصائص الانتقال

للتحكّم الدقيق، استخدم الأصناف `transition-*` مثل `transition-colors` أو `transition-transform` لاستهداف مجموعات خصائص محدّدة.

أمّا الخصائص غير الموجودة في المجموعات المحدّدة مسبقًا، فاستخدم القيم التعسّفية بصيغة `transition-[<value>]`:

*التحكّم في خصائص الانتقال — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/db0dd92eaa3a1fda4cd80ae9ea619172baab49112ebe80603022339854725362.html)*

```html
<div class="h-10 w-10 transition-[width,height] hover:h-20 hover:w-20">Resize me</div>
```

ويمكنك الإشارة إلى متغيّرات CSS المرجعية بصيغة `transition-(<custom-property>)`.

## المدة والتوقيت والتأخير

تحكّم في طول الانتقال، وفي كيف يحدث، وفي متى يحدث.

### المدة

تحدّد المدة طول الحركة:

- `duration-<number>`: تضبط المدة بالمللي ثانية (`duration-150`، `duration-700`)
- `duration-initial`: تضبط القيمة الأولية
- `duration-(<custom-property>)`: تستخدم متغيّر CSS
- `duration-[<value>]`: تستخدم قيمة CSS تعسّفية

*المدة — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d5f85d3c312db16e0d47e3285f57e2b2064939284ced8f00d0ac9ee8864b05fd.html)*

```html
<div class="bg-blue-500 transition duration-500 hover:bg-red-500">
  Hover over me (500ms transition)
</div>
```

### دالة التوقيت (التسارع)

تتحكّم في منحنى التسارع:

- `ease-linear`: سرعة ثابتة
- `ease-in`: يبدأ ببطء ثم يتسارع (`cubic-bezier(0.4, 0, 1, 1)`)
- `ease-out`: يبدأ بسرعة ثم يتباطأ (`cubic-bezier(0, 0, 0.2, 1)`)
- `ease-in-out`: يبدأ ببطء، ويتسارع، وينتهي ببطء (`cubic-bezier(0.4, 0, 0.2, 1)`) - وهو الافتراضي لـ`transition`
- `ease-initial`: تضبط القيمة الأولية
- `ease-(<custom-property>)`: تستخدم متغيّر CSS
- `ease-[<value>]`: تستخدم قيمة تعسّفية لدوال `cubic-bezier` المخصّصة

*دالة التوقيت (التسارع) — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5c01fe22540acf2564c485a7d62dfbb38385b9e12187c362331c1ab4955ea1b4.html)*

```html
<div class="bg-green-500 transition duration-300 ease-in-out hover:bg-yellow-500">
  Hover over me (ease-in-out)
</div>
```

### التأخير

يحدّد مدّة الانتظار قبل بدء الانتقال:

- `delay-<number>`: يضبط التأخير بالمللي ثانية (`delay-150`، `delay-700`)
- `delay-(<custom-property>)`: يستخدم متغيّر CSS
- `delay-[<value>]`: يستخدم قيمة CSS تعسّفية

*التأخير — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1e7693c5cae7fb6797c7593bced57d8fba9a6d72e1164e8e167d122416072f8d.html)*

```html
<div class="bg-purple-500 transition delay-150 duration-300 hover:bg-orange-500">
  Hover over me (150ms delay)
</div>
```

## خصائص وميزات محدّدة

يوفّر Tailwind أصنافًا مساعِدة للانتقال بين خصائص CSS بعينها:

- **التحويلات (transforms)**: استخدم `transition-transform` مع `rotate-*` و`scale-*` و`translate-*` و`skew-*`. واستخدم `transform-gpu` لإجبار التسريع العتادي أو `transform-cpu` للرجوع عنه. واضبط `transform-origin` و`transform-style` للتحويلات ثلاثية الأبعاد.
- **الفلاتر (filters)**: انتقل بالفلاتر مثل `blur-*` و`brightness-*` و`contrast-*` و`drop-shadow-*`، إلخ. ويشمل `transition` الأساسي خصائص الفلتر. وأزِله بـ`filter-none`.
- **ظلال الصندوق**: تُعالَج بواسطة `transition-shadow` أو `transition` الأساسي.
- **التدرّجات**: مدعومة في `transition` الأساسي وفي `transition-colors`. وفي Tailwind 4، تستيفى التدرّجات في فضاء الألوان `oklab` افتراضيًا.
- **الخصائص المتقطّعة (discrete)**: استخدم `transition-discrete` للخصائص التي تتغيّر فورًا عادةً (`display`، `visibility`).

## تنسيق العناصر الخاملة (inert)

تضع السمة `inert` في HTML علامةً على العناصر على أنها غير تفاعلية. واستخدم مُبدّل `inert` لتنسيق هذه العناصر وتحريك تغيّرات حالتها.

*تنسيق العناصر الخاملة — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2a268adbcd5a58282bc5ef3d98fdce3a06da76a175a6f5a6995eff804f60ee91.html)*

```html
<div class="opacity-100 transition-opacity duration-300 inert:opacity-50" inert>
  Content that fades when inert
</div>
```

يُحرّك الانتقال تغيّرات العتامة بسلاسة عند تبديل السمة `inert`.

*تنسيق العناصر الخاملة — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/165e61978bff924a5a35ae2ebe03b7ef3be7ebb3b9f20f7cf1d5ef62efc0aaa5.html)*

```html
<button class="cursor-pointer transition-all duration-200 inert:cursor-not-allowed" inert>
  Inert Button
</button>
```

## الانتقالات مع مُبدّلات أخرى

اجمع أصناف الانتقال مع مُبدّلات الحالة (`hover`، `focus`، `active`، `disabled`، `checked`، `group-hover`، `peer-focus`) ومع مُبدّلات الاستجابة (`sm:`، `md:`، `@container`).

طَبِّق الانتقال عند التحويم فقط:

*الانتقالات مع مُبدّلات أخرى — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/593bb2c21a204257321d8fb3373b5b8244b1118067b878e1c907af409546655b.html)*

```html
<div class="bg-blue-500 hover:bg-red-500 hover:transition-colors hover:duration-300">
  Transitions only on hover
</div>
```

والأكثر شيوعًا، طَبِّق `transition` في الحالة الافتراضية لحركتي الدخول والخروج:

*الانتقالات مع مُبدّلات أخرى — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b940969372352290865afcbc8c28e7447f1b7f17b340b07f5b23b109073b90f7.html)*

```html
<div class="bg-blue-500 transition-colors duration-300 hover:bg-red-500">
  Transitions on hover in and out
</div>
```

واجمع المُبدّلات معًا للحصول على انتقالات شرطية:

*الانتقالات مع مُبدّلات أخرى — المثال 10 — [افتح المثال](https://stevekinney.com/generated/playgrounds/f582139e47d24c64c36149085e9ef0bf82fa14bcfa6c05eacd685184d6bf44e7.html)*

```html
<div class="transition-colors duration-300 md:hover:bg-red-500">
  Background changes on hover from medium screens up
</div>
```

## اعتبارات الأداء

تخبر خاصية CSS `will-change` المتصفحات بأنّ عنصرًا ما سيتغيّر، فتسمح بالتحسين. ويوفّر Tailwind أصنافًا مساعِدة:

- `will-change-auto`
- `will-change-scroll`
- `will-change-contents`
- `will-change-transform`
- `will-change-(<custom-property>)`
- `will-change-[<value>]`

طَبِّقها قبل بدء الحركة مباشرةً وأزِلها بعد انتهائها. والإفراط في استخدامها قد يضرّ بالأداء.

وبالنسبة للتحويلات والعتامة، يمكن للتسريع العتادي أن يحسّن الأداء. فاستخدم `transform-gpu` لإجبار التسريع العتادي أو `transform-cpu` للرجوع عنه.

## تخصيص قيم الانتقال

خصّص قيم الانتقال باستخدام متغيّرات CSS داخل التوجيه `@theme`:

```css
@import 'tailwindcss';

@theme {
  --duration-long: 1000ms;
  --ease-custom: cubic-bezier(0.25, 1, 0.5, 1);
}
```

يتيح هذا أصنافًا مثل `duration-long` و`ease-custom`. وتُتجاوز القيم الافتراضية بإعادة تعريف المتغيّرات بالاسم نفسه.

ويجعل هذا الأسلوب في الإعداد، الذي يبدأ من CSS، رموز التصميم (design tokens) متّسقة مع موضع استخدامها، فيبدو Tailwind أكثر ألفةً بـCSS.
