---
title: "إنشاء لوحة ألوان من سمة Tailwind لديك"
---

بدلًا من الرجوع إلى سمة Tailwind الافتراضية، يمكننا النظر في ملف تهيئة Tailwind لدينا. أضف ما يلي إلى `src/colors.mdx`.

```mdx
import config from '../tailwind.config';

## Application Colors

<ColorPalette>
  {Object.entries(config.theme.extend.colors).map(([name, value]) => (
    <ColorItem key={name} title={name} colors={value} />
  ))}
</ColorPalette>
```
