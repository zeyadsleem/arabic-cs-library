---
title: "مزيد من تحسينات النماذج"
lang: ar
source: "https://stevekinney.com/courses/tailwind/form-improvements"
---

بعد أن بنينا أساسًا متينًا لحقول النماذج لدينا، لنستكشف بعض تقنيات التنسيق المتقدمة التي يمكن أن ترفع تجربة المستخدم أكثر. سنبني على مكوّن الإدخال الذي أنشأناه، مضيفين الصقل والتفاعلية مع الحفاظ على إمكانية الوصول.

## تحسين حالات التركيز بالحلقات

في درسنا السابق، استخدمنا المحيطات لحالات التركيز. لنعزّز هذا النهج بدمج المحيطات مع أدوات الحلقة لمؤشرات تركيز أكثر بروزًا.

*تحسين حالات التركيز بالحلقات — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/5bf1034e8ec3eb4d333f55b68a6d44ffb7bdcd5a54bf7305a1f2a8d579a65075.html)*

```html
<div>
  <label for="username" class="block text-sm/6 font-medium text-slate-900">Username</label>
  <div class="mt-2">
    <input
      type="text"
      name="username"
      id="username"
      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      placeholder="johndoe"
    />
  </div>
</div>
```

الإضافة الأساسية هنا هي `focus:ring-4 focus:ring-indigo-600/40`:

- `focus:ring-4`: ينشئ حلقة بسماكة 4px حول الحقل عند التركيز
- `focus:ring-indigo-600/40`: يستخدم لون النيلي نفسه للمحيط، لكن بعتامة 10%

ينشئ هذا تأثير توهج خفيف يمتد خارج المحيط، ما يجعل حالة التركيز أكثر بروزًا مع الحفاظ على التماسك البصري.

## تنسيق النص النائب

قد يبدو النص النائب الافتراضي منفصلًا عن نظام تصميمك. لنجعله أكثر قصدًا:

*تنسيق النص النائب — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/a82b3fd067cffe9865c993d5e34fec0a5d4e01278b9da518e666d9d256e5e325.html)*

```html
<input
  type="text"
  name="username"
  id="username"
  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
  placeholder="Enter your username..."
/>
```

عزّزنا النص النائب بما يلي:

- `placeholder:text-slate-400`: لون رمادي فاتح لا ينافس نص الإدخال الفعلي
- `placeholder:italic`: نمط مائل خفيف لتمييز النص النائب عن المحتوى الحقيقي

يساعد النمط المائل المستخدمين على التمييز بين النص النائب وقيم الإدخال الفعلية، وهو مفيد بشكل خاص للمستخدمين ذوي الإعاقات الإدراكية.

## تخصيص مؤشر النص

يمكن تنسيق مؤشر النص الافتراضي (caret) ليطابق ألوان علامتك:

*تخصيص مؤشر النص — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e941da8109b50109e129b7b30858c77195fde16fa767378f6fe959a3e4cb559e.html)*

```html
<input
  type="text"
  name="username"
  id="username"
  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
  placeholder="Enter your username..."
/>
```

يغيّر الصنف `caret-indigo-600` مؤشر النص الوامض ليطابق لون التركيز، ما ينشئ تجربة متكاملة عندما يكتب المستخدمون فعليًا.

## حالات التحقق

تحتاج النماذج الواقعية إلى إبلاغ حالة التحقق بوضوح. لنضف دعمًا للحالات الصحيحة وغير الصحيحة:

*حالات التحقق — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/38843150110dfa40affe0c18de8bf53b9c99b6381b49f582d868e419dd43e640.html)*

```html
<!-- Invalid state -->
<div>
  <label for="email" class="block text-sm/6 font-medium text-slate-900">Email</label>
  <div class="mt-2">
    <input
      type="email"
      name="email"
      id="email"
      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic invalid:text-red-900 invalid:outline-red-500 invalid:placeholder:text-red-300 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      placeholder="Enter your email..."
      value="invalid-email"
    />
  </div>
</div>
```

تنسيق الحالة غير الصحيحة:

- `invalid:outline-red-500`: محيط أحمر عندما يفشل تحقق HTML5
- `invalid:text-red-900`: نص أحمر غامق لحالة الخطأ
- `invalid:placeholder:text-red-300`: أحمر أفتح للنص النائب في حالة الخطأ

يستفيد هذا من التحقق المدمج في HTML5، فيطبّق أنماط الخطأ تلقائيًا عندما لا يطابق الإدخال النمط المتوقع.

## تغذية الحالة الصحيحة

للتعزيز الإيجابي، يمكننا أيضًا تنسيق الحقول الصحيحة:

*تغذية الحالة الصحيحة — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/647d10bfe02bf273c97a0dda9c853c61afe6cc0577fdcfb3da3be91b4f5f01e8.html)*

```html
<input
  type="email"
  name="email"
  id="email"
  required
  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic valid:outline-green-500 invalid:text-red-900 invalid:outline-red-500 invalid:placeholder:text-red-300 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
  placeholder="Enter your email..."
  value="user@example.com"
/>
```

يوفّر `valid:outline-green-500` تغذية إيجابية فورية عندما يدخل المستخدمون بيانات صحيحة، ما يشجّع على استمرار التفاعل.

## الحالات المعطّلة وتغذية المؤشر

تحتاج الحقول المعطّلة إلى مؤشرات بصرية واضحة وسلوك مؤشر مناسب:

*الحالات المعطّلة وتغذية المؤشر — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/e79d351ff3207ba47b66e5e798da6cc6c70e29386c8072f1770dc2ffd8691240.html)*

```html
<input
  type="text"
  name="readonly-field"
  id="readonly-field"
  disabled
  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:outline-slate-200 sm:text-sm/6"
  placeholder="This field is disabled"
/>
```

تنسيق الحالة المعطّلة:

- `disabled:bg-slate-50`: خلفية رمادية فاتحة تدل على عدم التوفّر
- `disabled:text-slate-500`: لون نص باهت
- `disabled:outline-slate-200`: محيط فاتح جدًا لوزن بصري أدنى
- `disabled:cursor-not-allowed`: يُظهر مؤشر «غير مسموح» عند التحويم

## ألوان تمييز مربعات الاختيار وأزرار الاختيار

يمكن أيضًا أن تطابق عناصر تحكم النماذج مثل مربعات الاختيار وأزرار الاختيار نظام تصميمك:

*ألوان تمييز مربعات الاختيار وأزرار الاختيار — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/9316af6aa1504f35a2e2f5b8ea850b994591b751d181913ca7f53cf02d113897.html)*

```html
<div class="flex items-center gap-2">
  <input type="checkbox" id="newsletter" name="newsletter" class="h-4 w-4 accent-pink-500" />
  <label for="newsletter" class="text-sm text-slate-900">Sign Up for Spam</label>
</div>

<div class="flex items-center gap-2">
  <input type="radio" id="option1" name="choice" value="option1" class="h-4 w-4 accent-pink-500" />
  <label for="option1" class="text-sm text-slate-900">The Only Option</label>
</div>
```

ينسّق الصنف `accent-indigo-600` حالة التفعيل/التحديد لعناصر تحكم النماذج لتطابق ألوان علامتك. وتضمن الأصناف `h-4 w-4` حجمًا متسقًا عبر المتصفحات المختلفة.

## مثال الإدخال المعزّز الكامل

إليك حقل الإدخال المعزّز بالكامل مع جميع التحسينات:

*مثال الإدخال المعزّز الكامل — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c7eef6528c0111d7594a9f81f1f55133f4e0b731e0dee089fa9ead84fb5782a0.html)*

```html
<div>
  <label for="enhanced-input" class="block text-sm/6 font-medium text-slate-900">
    Enhanced Input
  </label>
  <div class="mt-2">
    <input
      type="email"
      name="enhanced-input"
      id="enhanced-input"
      required
      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 caret-indigo-600 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 placeholder:italic valid:outline-green-500 invalid:text-red-900 invalid:outline-red-500 invalid:placeholder:text-red-300 focus:ring-4 focus:ring-indigo-600/40 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:outline-slate-200 sm:text-sm/6"
      placeholder="Enter your email address..."
    />
  </div>
</div>
```

## اعتبارات الأداء

تضيف تحسينات التنسيق هذه عبئًا ضئيلًا لأنها تستفيد من الفئات الزائفة في CSS ولا تتطلب JavaScript. توفّر الفئات الزائفة `:invalid` و`:valid` وظائف كانت ستتطلب بخلاف ذلك نصوص تحقق مخصصة.
