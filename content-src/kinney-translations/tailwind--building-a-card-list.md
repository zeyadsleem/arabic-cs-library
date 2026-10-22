---
title: "بناء قائمة بطاقات"
---

لنبدأ ببنية HTML الأساسية لقائمة بسيطة من بطاقات الإشعارات.

*المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/b1dcdfbd70432aab1331ff996ee71109ed0549d94a45249fa9f0879dc8415039.html)*

```html
<div>
  <div>
    <h3>New message from Sarah</h3>
    <p>Hey! Are we still on for lunch tomorrow?</p>
    <span>2 minutes ago</span>
  </div>
  <div>
    <h3>Calendar reminder</h3>
    <p>Team standup meeting starts in 15 minutes</p>
    <span>12 minutes ago</span>
  </div>
  <div>
    <h3>System update</h3>
    <p>Your password will expire in 3 days. Update it now to avoid interruption.</p>
    <span>1 hour ago</span>
  </div>
</div>
```

لدينا ثلاث بطاقات إشعارات مكدّسة رأسيًا، لكنها بلا أي تنسيق وتتداخل معًا. لنحوّلها إلى قائمة مصقولة يكون فيها كل عنصر منفصلًا بصريًا عن غيره — باستثناء العنصر الأول.

## إضافة بنية البطاقة وتنسيقها

أولًا، لنطبّق تنسيق بطاقة احترافيًا باستخدام الأنماط من [درس البطاقة](https://stevekinney.com/courses/tailwind/building-a-card) لإرساء أساس سليم.

*إضافة بنية البطاقة وتنسيقها — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/16d6bad07f8cd2cb100f02f363dc0ae1e8cd4919a4cf892732ba5799fab11f0b.html)*

```html
<div class="mx-auto max-w-md rounded-lg bg-white shadow-sm">
  <div class="p-4">
    <h3 class="font-semibold text-slate-900">New message from Sarah</h3>
    <p class="mt-1 text-sm text-slate-600">Hey! Are we still on for lunch tomorrow?</p>
    <span class="mt-2 block text-xs text-slate-400">2 minutes ago</span>
  </div>
  <div class="p-4">
    <h3 class="font-semibold text-slate-900">Calendar reminder</h3>
    <p class="mt-1 text-sm text-slate-600">Team standup meeting starts in 15 minutes</p>
    <span class="mt-2 block text-xs text-slate-400">12 minutes ago</span>
  </div>
  <div class="p-4">
    <h3 class="font-semibold text-slate-900">System update</h3>
    <p class="mt-1 text-sm text-slate-600">
      Your password will expire in 3 days. Update it now to avoid interruption.
    </p>
    <span class="mt-2 block text-xs text-slate-400">1 hour ago</span>
  </div>
</div>
```

تحسينات الحاوية والبطاقة:

- `max-w-md mx-auto`: يقصر العرض على 448px ويوسّط الحاوية
- `bg-white rounded-lg shadow-sm`: خلفية بيضاء مع زوايا ناعمة وظل خفيف
- `p-4`: حشوة 16px في كل بطاقة لتباعد مريح
- تدرّج طباعي باستخدام `font-semibold` و`text-sm` و`text-xs` لبنية معلومات واضحة
- `text-slate-600` و`text-slate-400`: ألوان هادئة للمحتوى الثانوي

الآن تبدو البطاقات احترافية، لكنها ما زالت تتداخل معًا — لا يوجد فصل بصري بين الإشعارات الفردية.

## لماذا لن تنجح Space-Y هنا

قد تفكّر في استخدام `space-y-4` لإضافة تباعد بين البطاقات، وسينجح ذلك مع البطاقات المنفصلة. لكن ماذا لو أردنا أن تبدو البطاقات متصلة كقائمة متماسكة مع بقائها متمايزة بصريًا؟ هنا تتألق فواصل الحدود.

لنجرّب إضافة حدود إلى كل بطاقة ونرَ المشكلة:

*لماذا لن تنجح Space-Y هنا — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/89948dafa7a597f580491d6b341793b631d017b7a43cb48065329ddaa7d7e13e.html)*

```html
<div class="mx-auto max-w-md rounded-lg bg-white shadow-sm">
  <div class="border-t border-slate-200 p-4">
    <h3 class="font-semibold text-slate-900">New message from Sarah</h3>
    <p class="mt-1 text-sm text-slate-600">Hey! Are we still on for lunch tomorrow?</p>
    <span class="mt-2 block text-xs text-slate-400">2 minutes ago</span>
  </div>
  <div class="border-t border-slate-200 p-4">
    <h3 class="font-semibold text-slate-900">Calendar reminder</h3>
    <p class="mt-1 text-sm text-slate-600">Team standup meeting starts in 15 minutes</p>
    <span class="mt-2 block text-xs text-slate-400">12 minutes ago</span>
  </div>
  <div class="border-t border-slate-200 p-4">
    <h3 class="font-semibold text-slate-900">System update</h3>
    <p class="mt-1 text-sm text-slate-600">
      Your password will expire in 3 days. Update it now to avoid interruption.
    </p>
    <span class="mt-2 block text-xs text-slate-400">1 hour ago</span>
  </div>
</div>
```

ثمة مشكلة: البطاقة الأولى لها حد أعلى الحاوية، ما يخلق فراغًا بصريًا غير مستحسن بين زاوية الحاوية المستديرة والمحتوى. نريد الحدود فواصل بين العناصر، لا حدًا يحيط بالحاوية كلها.

## تقديم محدِّد not-first

هذا بالضبط ما تحلّه أدوات `not-first:*` في Tailwind. لنزل الحد العلوي غير المرغوب من العنصر الأول فقط.

*تقديم محدِّد not-first — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/8d637d728fdc9d04119ebe8f5c1d2b620912d8d76a90d8ebb9b993fbc4ce7f21.html)*

```html
<div class="mx-auto max-w-md rounded-lg bg-white shadow-sm">
  <div class="p-4 not-first:border-t not-first:border-slate-200">
    <h3 class="font-semibold text-slate-900">New message from Sarah</h3>
    <p class="mt-1 text-sm text-slate-600">Hey! Are we still on for lunch tomorrow?</p>
    <span class="mt-2 block text-xs text-slate-400">2 minutes ago</span>
  </div>
  <div class="p-4 not-first:border-t not-first:border-slate-200">
    <h3 class="font-semibold text-slate-900">Calendar reminder</h3>
    <p class="mt-1 text-sm text-slate-600">Team standup meeting starts in 15 minutes</p>
    <span class="mt-2 block text-xs text-slate-400">12 minutes ago</span>
  </div>
  <div class="p-4 not-first:border-t not-first:border-slate-200">
    <h3 class="font-semibold text-slate-900">System update</h3>
    <p class="mt-1 text-sm text-slate-600">
      Your password will expire in 3 days. Update it now to avoid interruption.
    </p>
    <span class="mt-2 block text-xs text-slate-400">1 hour ago</span>
  </div>
</div>
```

سحر `not-first:*`:

- `not-first:border-t`: يضيف حدًا علويًا لكل عنصر ليس أول ابن
- `not-first:border-slate-200`: لون حد رمادي فاتح لفصل خفيف

ممتاز! الآن لدينا فواصل نظيفة بين العناصر دون حد غير مستحسن فوق العنصر الأول. وهذا يكافئ محدِّد CSS `:not(:first-child)` لكنه أوضح وأسهل صيانة بكثير.

## تعزيز التسلسل البصري

لنضف بعض الصقل لتبدو القائمة أكثر تفاعلًا وتنظيمًا.

*تعزيز التسلسل البصري — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/020fc55eac8f0324005e4f496faca72a67809df6cfc07fb11638ebdff3ae8744.html)*

```html
<div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-sm">
  <div
    class="p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50"
  >
    <h3 class="font-semibold text-slate-900">New message from Sarah</h3>
    <p class="mt-1 text-sm text-slate-600">Hey! Are we still on for lunch tomorrow?</p>
    <span class="mt-2 block text-xs text-slate-400">2 minutes ago</span>
  </div>
  <div
    class="p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50"
  >
    <h3 class="font-semibold text-slate-900">Calendar reminder</h3>
    <p class="mt-1 text-sm text-slate-600">Team standup meeting starts in 15 minutes</p>
    <span class="mt-2 block text-xs text-slate-400">12 minutes ago</span>
  </div>
  <div
    class="p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50"
  >
    <h3 class="font-semibold text-slate-900">System update</h3>
    <p class="mt-1 text-sm text-slate-600">
      Your password will expire in 3 days. Update it now to avoid interruption.
    </p>
    <span class="mt-2 block text-xs text-slate-400">1 hour ago</span>
  </div>
</div>
```

تحسينات التفاعل:

- `overflow-hidden` على الحاوية: يضمن ألا تمتد خلفيات التمرير خارج الزوايا المستديرة
- `hover:bg-slate-50`: تغيّر خلفية خفيف يشير إلى أن العناصر تفاعلية
- `transition-colors`: يحرّك تغيّر لون الخلفية بسلاسة لإحساس مصقول

الآن يبدو كل عنصر قابلًا للنقر ومتجاوبًا مع الحفاظ على فصل بصري واضح.

## إضافة دعم الوضع الداكن

لنضف صيغ الوضع الداكن لتعمل قائمتنا في أي سمة.

*إضافة دعم الوضع الداكن — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c626461f5e6bc1763cb3268d4ea010f9effa279d497895c8db38b65af346b477.html)*

```html
<div class="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-sm dark:bg-slate-800">
  <div
    class="p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 not-first:dark:border-slate-700 dark:hover:bg-slate-700"
  >
    <h3 class="font-semibold text-slate-900 dark:text-slate-100">New message from Sarah</h3>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
      Hey! Are we still on for lunch tomorrow?
    </p>
    <span class="mt-2 block text-xs text-slate-400 dark:text-slate-400">2 minutes ago</span>
  </div>
  <div
    class="p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 not-first:dark:border-slate-700 dark:hover:bg-slate-700"
  >
    <h3 class="font-semibold text-slate-900 dark:text-slate-100">Calendar reminder</h3>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
      Team standup meeting starts in 15 minutes
    </p>
    <span class="mt-2 block text-xs text-slate-400 dark:text-slate-400">12 minutes ago</span>
  </div>
  <div
    class="p-4 transition-colors not-first:border-t not-first:border-slate-200 hover:bg-slate-50 not-first:dark:border-slate-700 dark:hover:bg-slate-700"
  >
    <h3 class="font-semibold text-slate-900 dark:text-slate-100">System update</h3>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
      Your password will expire in 3 days. Update it now to avoid interruption.
    </p>
    <span class="mt-2 block text-xs text-slate-400 dark:text-slate-400">1 hour ago</span>
  </div>
</div>
```

تحسينات الوضع الداكن:

- `dark:bg-slate-800`: خلفية داكنة للحاوية
- `not-first:dark:border-slate-700`: لون حد أفتح للخلفيات الداكنة
- `dark:text-slate-100` و`dark:text-slate-300`: تباين نص مناسب للسمات الداكنة
- `dark:hover:bg-slate-700`: حالة تمرير داكنة تبدو طبيعية

لاحظ كيف يمكننا دمج المعدِّلات: `not-first:dark:border-slate-700` يعني «طبّق لون الحد الداكن على العناصر التي ليست أول أبناء في الوضع الداكن».

## لماذا not-first أساسي

يحل محدِّد `not-first:*` نمط تصميم شائعًا لا تستطيع `space-y` أو `gap` معالجته:

**استخدم `space-y` عندما**: تريد تباعدًا فعليًا بين عناصر منفصلة (بطاقات تطفو منفصلة)

**استخدم `not-first:border` عندما**: تريد عناصر متصلة بفواصل بصرية (عناصر قائمة، عناصر قوائم، صفوف جداول)

يظهر هذا النمط في كل مكان في الواجهات الحديثة:

- عناصر قائمة التنقل بخطوط فاصلة
- عناصر القوائم في الأشرطة الجانبية
- صفوف الجداول بفواصل حدود
- سلاسل التعليقات بخطوط فاصلة
- مجموعات الإعدادات بفواصل أقسام

الفكرة الأساسية أن العنصر الأول في القائمة يجب ألا يكون فوقه «فاصل» أبدًا لأنه لا يوجد شيء يفصله عنه.

## تحديات

جرّب بناء هذه التنويعات:

1. **مؤشرات الحالة**: أضف نقاطًا ملوّنة قبل عنوان كل إشعار تدل على الأولوية (أحمر، أصفر، أخضر) باستخدام `not-first:*` لضمان محاذاة متسقة
2. **عناصر قابلة للتوسّع**: ادمجها مع الأنماط من [درس كشف التفاصيل](https://stevekinney.com/courses/tailwind/building-details-disclosure) لجعل كل إشعار قابلًا للتوسّع بتفاصيل إضافية
