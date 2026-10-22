---
title: "عملية البناء وتكامل الأدوات"
---

إن إعداد Tailwind CSS على النحو الصحيح في بيئة تطويرك أمر بسيط جدًا — إن اتبعت المسار السهل، على الأقل.

يوفّر Tailwind CSS طرق تثبيت متعدّدة تناسب إعدادات المشاريع ومتطلباتها المختلفة. سنغطّي الأكثر شيوعًا: استخدام Vite لسير عمل البناء الحديث، وTailwind CLI للإعدادات الأبسط.

## تكامل Vite

> **هذه هي الطريقة التي أستخدمها في الغالب.**
>
> وهي الوحيدة التي سنعمل بها اليوم.

أصبح Vite واحدًا من أشهر أدوات البناء في تطوير الويب الحديث، وهو يعمل على نحو استثنائي مع Tailwind CSS. يمكنك الاطّلاع على التعليمات الرسمية لـ[استخدام Tailwind مع Vite](https://tailwindcss.com/docs/installation/using-vite).

لكن، باختصار، هذا هو كل شيء:

```javascript
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### إضافة Tailwind إلى CSS

ما عليك سوى استيراد Tailwind في ملف CSS:

```css
@import 'tailwindcss';
```

يحلّ هذا الاستيراد الواحد محل التوجيهات الثلاثة التقليدية ويوفّر أداءً أفضل وبناءً أسرع.
