---
title: "بناء نافذة منبثقة (Popover)"
lang: ar
source: "https://stevekinney.com/courses/tailwind/building-a-popover"
---

لنبدأ ببنية HTML الأساسية باستخدام Popover API الأصلية.

```html
<div>
  <button popovertarget="button-menu" class="bg-sky-50">Menu</button>
  <div id="button-menu" popover>
    <button>Settings</button>
    <button>Profile</button>
    <button>Logout</button>
  </div>
</div>
```

يستخدم هذا Popover API الأصلية في HTML حيث يربط `popovertarget` زر التشغيل بعنصر النافذة المنبثقة عبر المعرّف (ID). ويتولّى المتصفّح منطق الإظهار والإخفاء تلقائيًا—نحن نحتاج فقط إلى تنسيقه بجمال مع Tailwind.

## تنسيق زر التشغيل

أولًا، لنطبّق تنسيق أزرار احترافيًا ليجعل زر التشغيل يبدو قابلًا للنقر ومُصقولًا.

```html
<div>
  <button
    popovertarget="button-menu"
    class="rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div id="button-menu" popover>
    <button>Settings</button>
    <button>Profile</button>
    <button>Logout</button>
  </div>
</div>
```

تنسيق زر التشغيل:

- `rounded-md`: استدارة حدّ قدرها 6px لمظهر حديث
- `bg-slate-600`: لون خلفية رمادي احترافي
- `px-3 py-2`: حشوة أفقية 12px ورأسيًا 8px لاستهدافات لمس مريحة
- `text-sm font-semibold`: نص بوزن شبه عريض بحجم 14px لوضوح القراءة
- `shadow-xs`: ظلّ خفيف بسمك 1px يضيف عمقًا
- `hover:bg-slate-500`: درجة أفتح عند التحويم لتغذية راجعة تفاعلية
- `focus-visible:outline-*`: تنسيق ملائم للتنقّل بلوحة المفاتيح

وهذا ينشئ زر تشغيل احترافيًا يوضّح بجلاء أنّه تفاعلي.

## وضع النوافذ المنبثقة عبر CSS Anchor Positioning

**المشكلة**: تنقل سمة `popover` في HTML العناصر إلى الطبقة العلوية (top layer)، فتكسر تموضع CSS المعتاد (مثل `absolute top-full left-0`). وتظهر النافذة المنبثقة حيث يقرّر المتصفّح وضعها، لا بالضرورة بالقرب من زرّك.

**الحل**: استخدم CSS Anchor Positioning لربط النافذة المنبثقة صراحةً بالزر. أولًا، لنجهّز أصناف Tailwind 4 المخصّصة في CSS:

```css
@utility anchor-* {
  anchor-name: --{*};
}

@utility position-anchor-* {
  position-anchor: --{*};
}

@utility top-anchor-* {
  top: anchor({*});
}

@utility left-anchor-* {
  left: anchor({*});
}

/* Combined utilities for common patterns */
@utility anchor-below-* {
  position-anchor: --{*};
  top: anchor(bottom);
  left: anchor(left);
}
```

والآن لنطبّق التموضع بالمرساة (anchor positioning) على نافذتنا المنبثقة:

```html
<div>
  <button
    popovertarget="button-menu"
    class="anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div
    id="button-menu"
    popover
    class="anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
  >
    <button>Settings</button>
    <button>Profile</button>
    <button>Logout</button>
  </div>
</div>
```

إعداد التموضع بالمرساة:

- `anchor-menu-button` على زر التشغيل: ينشئ مرساة باسم `--menu-button`
- `anchor-below-menu-button` على النافذة المنبثقة: يضع النافذة المنبثقة أسفل المرساة ومحاذاةً لحافّتها اليسرى

وهذا يضمن ظهور النافذة المنبثقة في المكان الذي تريده بالضبط—مباشرةً أسفل زر التشغيل—بغضّ النظر عن منطق التموضع الافتراضي في المتصفّح.

## إنشاء حاوية النافذة المنبثقة

والآن لننسّق النافذة المنبثقة نفسها لتبدو كقائمة منسدلة حديثة بتسلسل بصري صحيح.

```html
<div>
  <button
    popovertarget="button-menu"
    class="anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div
    id="button-menu"
    popover
    class="anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
  >
    <button>Settings</button>
    <button>Profile</button>
    <button>Logout</button>
  </div>
</div>
```

تنسيق حاوية النافذة المنبثقة:

- `m-0`: يزيل الهوامش الافتراضية في المتصفّح التي تميل النوافذ المنبثقة إليها
- `rounded-lg`: استدارة حدّ قدرها 8px، أكثر وضوحًا بقليل من زر التشغيل
- `border border-slate-200`: حدّ رمادي فاتح خفيف يحدّد الحواف
- `bg-white`: خلفية بيضاء نظيفة
- `p-1`: حشوة قدرها 4px تنشئ حدًّا حول عناصر القائمة
- `shadow-lg`: ظلّ أكثر بروزًا من ظلّ الزر، فينشئ تأثير لوحة معلّقة

وتساعد استدارة الحدّ الأكبر والظلّ على ترسيخ كون هذه لوحة معلّقة، مميّزةً عن زر التشغيل.

## تنسيق عناصر القائمة

لنحوّل أزرار القائمة إلى عناصر قائمة حقيقية بمسافات متّسقة وحالات تحويم.

```html
<div>
  <button
    popovertarget="button-menu"
    class="anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div
    id="button-menu"
    popover
    class="anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
  >
    <button class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700">
      Settings
    </button>
    <button class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700">
      Profile
    </button>
    <button class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700">
      Logout
    </button>
  </div>
</div>
```

تنسيق عنصر القائمة:

- `block w-full`: يجعل كل زر يأخذ العرض كاملًا ويرتب رأسيًا
- `rounded-md`: استدارة حدّ قدرها 6px تطابق زر التشغيل
- `px-3 py-2`: الحشوة نفسها التي في زر التشغيل لاتّساق بصري
- `text-left`: يحاذي النص إلى اليسار، وهو المعتاد في عناصر القوائم
- `text-sm`: حجم خط 14px لقراءة مريحة
- `text-slate-700`: نص رمادي داكن لتباين جيد مع الخلفية البيضاء

والآن تبدو عناصر قائمتنا متّسقة ومضبوطة الحجم، لكنها تحتاج إلى تغذية راجعة تفاعلية.

## إضافة الحالات التفاعلية

لنضف حالتي التحويم والتركيز لتبدو عناصر القائمة استجابةً ومتاحة.

```html
<div>
  <button
    popovertarget="button-menu"
    class="anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div
    id="button-menu"
    popover
    class="anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
  >
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Settings
    </button>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Profile
    </button>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Logout
    </button>
  </div>
</div>
```

تحسينات الحالات التفاعلية:

- `hover:bg-slate-50`: خلفية رمادية فاتحة عند التحويم توفّر تغذية راجعة واضحة
- `focus-visible:bg-slate-50`: الخلفية نفسها عند التركيز بلوحة المفاتيح، ما يضمن إمكانية الوصول
- `focus-visible:outline-none`: يزيل الحدّ الافتراضي في المتصفّح لأننا نستخدم لون الخلفية لإشارة التركيز

وتجعل حالات التحويم الخفيفة واضحًا أي عنصر سيُفعَّل من دون إزعاج.

## إضافة انتقالات سلسة

لنضف الانتقالات لتبدو تغيّرات الحالة مصقولة واحترافية.

```html
<div>
  <button
    popovertarget="button-menu"
    class="anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div
    id="button-menu"
    popover
    class="anchor-below-menu-button m-0 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
  >
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Settings
    </button>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Profile
    </button>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Logout
    </button>
  </div>
</div>
```

تحسينات الحركة:

- `transition-colors` على زر التشغيل: يُحرّك تغيّر لون الخلفية بسلاسة عند التحويم
- `transition-colors` على عناصر القائمة: ينشئ انتقالات سلسة عند التحويم والتركيز

ومدة الانتقال الافتراضية البالغة 200ms تبدو استجابةً من دون بطء، فتُنشئ تجربة تفاعل أكثر صقلًا.

## تحسين العرض والتنضيب

لنُحسّن التنضيب (typography) ونحرص على أن تمتلك النافذة المنبثقة عرضًا أدنى ملائمًا لتحسين القراءة.

```html
<div>
  <button
    popovertarget="button-menu"
    class="anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div
    id="button-menu"
    popover
    class="anchor-below-menu-button m-0 min-w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
  >
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Settings
    </button>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Profile
    </button>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Logout
    </button>
  </div>
</div>
```

تحسينات التنضيب والأبعاد:

- `min-w-48`: يضبط عرضًا أدنى قدره 192px حتى لا تبدو النافذة المنبثقة ضيّقة
- `font-medium`: وزن خط متوسط (500) لعناصر القائمة يوفّر تسلسلًا بصريًا أفضل من الوزن العادي

ويضمن العرض الأدنى أن تبدو النافذة المنبثقة ذات حضور واضح ويمنح النص مساحة للتنفّس، بينما يجعل وزن الخط من السهل تصفّح عناصر القائمة.

## إضافة التجميع البصري بالفواصل

وأخيرًا، لنضف فاصلًا قبل زر تسجيل الخروج لتجميع الإجراءات المترابطة، ونستخدم اللون للإشارة إلى الإجراءات المدمِّرة.

```html
<div>
  <button
    popovertarget="button-menu"
    class="anchor-menu-button rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
  >
    Menu
  </button>
  <div
    id="button-menu"
    popover
    class="anchor-below-menu-button m-0 min-w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
  >
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Settings
    </button>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
    >
      Profile
    </button>
    <div class="my-1 border-t border-slate-200"></div>
    <button
      class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none"
    >
      Logout
    </button>
  </div>
</div>
```

التحسينات الأخيرة:

- `<div class="my-1 border-t border-slate-200"></div>`: ينشئ خط فاصل بهامش رأسي قدره 4px
- `text-red-600` على زر تسجيل الخروج: النص الأحمر يشير إلى إجراء مدمِّر
- `hover:bg-red-50 focus-visible:bg-red-50`: خلفية حمراء فاتحة عند التحويم/التركيز بدلًا من الرمادية

وينشئ الفاصل تجميعًا واضحًا بين إجراءات المستخدم (Settings، Profile) وإجراء تسجيل الخروج، بينما يتبع الترميز اللوني الأحمر أنماط واجهات المستخدم الشائعة في الإجراءات المدمِّرة.

## خيارات تموضع بديلة

يمكنك تخصيص تموضع النافذة المنبثقة باستخدام أصناف مراسي مختلفة. وإليك بعض الأنماط الشائعة:

**نافذة منبثقة محاذاة لليمين:**

```html
<button class="anchor-dropdown">Menu</button>
<div popover class="position-anchor-dropdown top-anchor-bottom left-anchor-right">
  <!-- Popover content -->
</div>
```

**نافذة منبثقة في الوسط:**

```html
<button class="anchor-profile">Profile</button>
<div popover class="position-anchor-profile top-anchor-bottom left-anchor-center">
  <!-- Popover content -->
</div>
```

**فوق الزر:**

```html
<button class="anchor-tooltip">Help</button>
<div popover class="position-anchor-tooltip top-anchor-top left-anchor-left">
  <!-- Popover content -->
</div>
```

ونظام التموضع بالمراسي مرن تمامًا—يمكنك إنشاء أي علاقة مكانية بين زر التشغيل والنافذة المنبثقة.

## لماذا هذا الأسلوب رائع

**أسماء أصناف دلالية**: أصناف مثل `anchor-menu-button` و`anchor-below-menu-button` تشرح نفسها وقابلة لإعادة الاستخدام.

**أصناف ديناميكية**: تعمل أصناف Tailwind 4 مع أي اسم مرساة—`anchor-dropdown`، `anchor-profile`، `anchor-tooltip`—فتصبح مرنة إلى ما لا نهاية.

**مزايا المتصفّح الأصلية**: يعمل مع Popover API الأصلية مع الحفاظ على كل ميزات إمكانية الوصول وتحسينات المتصفّح.

**تحكّم دقيق**: بخلاف مكتبات التموضع المكتوبة بـJavaScript، يتولّى محرّك التخطيط في المتصفّح معالجة CSS Anchor Positioning، ما يجعله أكثر أداءً وموثوقية.

**جاهز للمستقبل**: كلما اتّسع دعم CSS Anchor Positioning، سيصبح هذا الأسلوب هو الطريقة القياسية لوضع العناصر المعلّقة.

## التحديات

جرّب بناء هذه الصيغ:

1. **نافذة منبثقة لملف المستخدم**: أنشئ نافذة منبثقة فيها صورة رمزية للمستخدم واسمه وبريده الإلكتروني وأزرار إجراءات، بتخطيط أكثر تعقيدًا مع مسافات وتسلسل تنضيب صحيح
2. **قائمة متعدّدة الأقسام**: وسّع القائمة لتشمل أقسامًا متعدّدة مجمّعة مع فواصل، بتنظيم الإجراءات المترابطة معًا باستخدام نمط الفاصل الذي تعلّمناه
