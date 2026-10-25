---
title: "الفروق في Tailwind 4"
lang: ar
source: "https://stevekinney.com/courses/tailwind/tailwind-4"
---

Tailwind 4 إعادة كتابة كاملة للأُطر من الأساس.

- **[محرك Oxide](https://stevekinney.com/courses/tailwind/tailwind-oxide):** محرك مبني بـ Rust مع بناءات كاملة أسرع 5 مرات، وبناءات تزايدية أسرع 100 مرة
- **تهيئة أولًا بـ CSS:** هيّئ في CSS باستخدام `@theme` و`@utility` و`@custom-variant` و`@plugin` (تهيئة JavaScript ما زالت مدعومة عبر `@config`)
- **متغيّرات CSS الأصلية:** رموز `@theme` تُعرض تلقائيًا كخصائص CSS مخصصة
- **CSS الحديث:** `@layer` الأصلية، [`@property`](https://stevekinney.com/courses/tailwind/at-property)، [`color-mix()`](https://stevekinney.com/courses/tailwind/color-mix)، [ألوان OKLCH](https://stevekinney.com/courses/tailwind/oklch-colors)
- **[ألوان OKLCH](https://stevekinney.com/courses/tailwind/oklch-colors):** موحّدة إدراكيًا، مع دعم النطاق اللوني الواسع P3
- **تثبيت مبسّط:** الأمر الواحد `@import "tailwindcss";` يحل محل ثلاثة توجيهات
- **كشف تلقائي للمحتوى:** لا حاجة إلى مصفوفة `content`، ويُحترم `.gitignore`
- **أدوات جديدة:** [استعلامات الحاويات](https://stevekinney.com/courses/tailwind/container-queries)، وتحويلات ثلاثية الأبعاد، والتدرجات (الشعاعية/المخروطية)، وظلال النصوص، والأقنعة، و[`not-*`](https://stevekinney.com/courses/tailwind/not-utility)، و[`starting:`](https://stevekinney.com/courses/tailwind/starting-style)، و`user-valid/invalid`، و`pointer-*`، و`inset-shadow/ring`، و[`inert`](https://stevekinney.com/courses/tailwind/inert-utility)
- **متغيّرات قابلة للتركيب:** سلسلة [`group-*`](https://stevekinney.com/courses/tailwind/group-and-peer-modifiers) و[`peer-*`](https://stevekinney.com/courses/tailwind/group-and-peer-modifiers) و[`has-*`](https://stevekinney.com/courses/tailwind/has-utility) و[`not-*`](https://stevekinney.com/courses/tailwind/not-utility)
- **تغييرات كاسرة:** إزالة الأدوات المهجورة، والحد الافتراضي أصبح `currentColor`، ومتغيّرات CSS تستخدم `(…)` لا `[…]`، وتغيّر المتغيّرات في `@layer components`
- **دعم المتصفحات:** Safari 16.4+، Chrome 111+، Firefox 128+ (استخدم v3.x للمتصفحات الأقدم)
- **أداة الترقية:** `npx @tailwindcss/upgrade@next` تؤتمت الترحيل من v3 إلى Tailwind 4
- **الفلسفة:** الأولوية للأدوات مع متغيّرات CSS دلالية، تبدو كـ CSS أصلي

## قائمة تحقق التغييرات الكاسرة

عند الترحيل من Tailwind CSS v3 إلى Tailwind 4، استخدم قائمة التحقق هذه لضمان انتقال سلس:

### تغييرات التهيئة

- **استبدل استيرادات CSS:** غيّر `@tailwind base; @tailwind components; @tailwind utilities;` إلى `@import "tailwindcss";`
- **حدّث صيغة التهيئة:** فكّر في الترحيل من تهيئة JavaScript إلى التهيئة أولًا بـ CSS باستخدام `@theme` و`@utility` وغيرها.
- **أزل مصفوفة المحتوى:** الكشف التلقائي للمحتوى يعني أنه يمكنك إزالة تهيئة `content` (لكن تهيئة JavaScript ما زالت مدعومة)
- **حدّث امتدادات الملفات:** تأكد من أن عملية البناء لديك تتعرّف على صيغة التهيئة الجديدة أولًا بـ CSS

### الأدوات المحذوفة/المهجورة

- **أزل الأدوات المهجورة:** افحص أي أدوات هُجرت في v3 وأُزيلت في Tailwind 4 واستبدلها
- **حدّث أدوات التحويل:** بعض أدوات التحويل قد تتغير صيغتها أو تُدمج
- **افحص أدوات التصفية:** تحقق من أن أدوات backdrop-filter وfilter تعمل كما هو متوقع

### تغييرات الحدود والألوان

- **ألوان الحدود الافتراضية:** أصبحت الحدود افتراضيًا `currentColor` بدلًا من الرمادي — أضف ألوان حدود صريحة عند الحاجة
- **حدّث أدوات الحدود:** تحقق من أن أنماط الحدود تُصيَّر كما هو متوقع مع القيم الافتراضية الجديدة
- **تحقق من لوحة الألوان:** تأكد من أن الألوان المخصصة تعمل مع نظام ألوان OKLCH الجديد

### صيغة متغيّرات CSS

- **حدّث صيغة المتغيّرات:** غيّر متغيّرات CSS من الأقواس المربعة `[…]` إلى الأقواس `(…)`
- **مثال:** `var(--my-color-[500])` تصبح `var(--my-color-(500))`
- **افحص الخصائص المخصصة:** تحقق من أن جميع متغيّرات CSS المخصصة تستخدم الصيغة الجديدة

### تغييرات طبقة المكوّنات

- **راجع أنماط المكوّنات:** تغيّر سلوك المتغيّرات في `@layer components`
- **حدّث CSS المكوّنات:** تحقق من أن أنماط مستوى المكوّن تعمل كما هو متوقع
- **اختبر التخصيص:** تأكد من أن أنماط المكوّنات تمتلك التخصيص الصحيح مع نظام الطبقات الجديد

## الترحيل المؤتمت

فكّر في استخدام أداة الترقية الرسمية لأتمتة كثير من هذه التغييرات. فقط تأكد من أنك تفعل ذلك على فرع git نظيف. لم أرَ واحدة من هذه الأدوات مثالية قط.

```bash
npx @tailwindcss/upgrade@next
```

> **تحذير**
>
> احتفظ دائمًا بنسخة احتياطية من مشروعك قبل تشغيل أدوات الترحيل المؤتمتة، وراجع جميع التغييرات بعناية قبل الإيداع.
