---
title: "أفضل الممارسات"
lang: ar
source: "https://stevekinney.com/courses/tailwind/tailwind-best-practices"
---

اعتبارًا من Tailwind 4 وما بعده، تتبنّى Tailwind بالكامل CSS الحديث — طبقات التسلسل، وألوان OKLCH، واستعلامات الحاويات، ومتغيّرات CSS الأصلية. يبقى الإطار بعيدًا عن طريقك إن حافظت على عقلية الأولوية للأدوات واعتمدت على التهيئة بدلًا من CSS المخصص.

## اعتمد على مكدّس الطبقات

```
flowchart TD
  A[theme] --> B[base]
  B --> C[components]
  C --> D[utilities]

  style A fill:#e1f5fe
  style B fill:#f3e5f5
  style C fill:#e8f5e8
  style D fill:#fff3e0
```

يحقن `@import "tailwindcss";` الطبقات الأربع بهذا الترتيب. اكتب الشيفرة المخصصة حيث تنتمي:

- `@layer theme` — متغيّرات رموز التصميم
- `@layer base` — إعادة ضبط العناصر والخطوط
- `@layer components` — أنماط قابلة لإعادة الاستخدام وقابلة للتجاوز
- `@utility` — مساعدات لمرة واحدة تتصرف كالأدوات الأساسية

> **الأمر ليس بهذه الأهمية.**
>
> لا تستخدم `!important` على الأدوات أبدًا — أعد النظر في موضع الطبقة.

## هيّئ في CSS، لا في JavaScript

صرّح برموز التصميم في كتل `@theme`:

- عرّف الرموز (`--color-primary`، `--spacing-4`، `--font-brand`) داخل `@theme` باستخدام خصائص CSS المخصصة الأصلية.
- أعد استخدامها عبر جميع الطبقات لتنسيق من مصدر واحد للحقيقة
- أبقِ التوثيق قريبًا من الشيفرة المستهلِكة؛ لا حاجة إلى تهيئة JavaScript.

## المتغيّرات المتجاوبة والحالية والحاويات

- الجوال أولًا: القاعدة الافتراضية، ثم بادئات `md:` و`lg:`
- اجمع الحالة والوسائط: `md:hover:bg-primary-600`

## افتراضات إمكانية الوصول

- استخدم `focus-visible:outline-none` بدلًا من `outline-none` لإمكانية الوصول بلوحة المفاتيح
- مساعدات مدمجة: `sr-only`، `not-sr-only`، `motion-safe:*`، `selection:*`
- فضّل HTML الدلالي على بهلوانيات ARIA؛ فـ Tailwind ينسّق العناصر، ولا يصلح الدلالات.

## نظافة الأداء

- اسرد جميع مسارات القوالب في `content` لأجل tree-shaking
- استخدم `safelist` للأصناف الديناميكية (ألوان يولّدها المستخدم)
- فعّل `future: { hoverOnlyWhenSupported: true }` لـ CSS الحديث

> **المتصفحات القديمة**
>
> تعتمد Tailwind 4 على طبقات التسلسل. إن كان عليك دعم أي شيء أقدم من Safari 15.4 أو Chrome 99 أو Firefox 97، فابقَ على Tailwind v3.x.

## راقب المستقبل

جرّب CSS الجديد خلف استعلامات الميزات:

```css
@supports (background: color-mix(in oklab, red 30%, white)) {
  .link {
    background: color-mix(in oklab, var(--color-primary-500) 90%, white);
  }
}
```

- أزل البادئات الخاصة (grid، flexbox): أهداف البناء الحديثة لا تحتاج إليها.
- انقل الميزات المستقرة (OKLCH) إلى كتلة `@theme`.
