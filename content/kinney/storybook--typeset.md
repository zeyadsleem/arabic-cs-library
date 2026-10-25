---
title: "عرض الخطوط باستخدام Typeset"
lang: ar
source: "https://stevekinney.com/courses/storybook/typeset"
---

مثل [لوحات الألوان](https://stevekinney.com/courses/storybook/color-palette) و[معارض الأيقونات](https://stevekinney.com/courses/storybook/icon-gallery)، يوفّر Storybook أيضًا مجموعة مفيدة من المكوّنات لتصيير تنضيد نظام التصميم لديك.

```typescript
import { Meta, Typeset } from '@storybook/blocks';

<Meta title="Typography" />

<Typeset
  fontSizes={[
    12,
    14,
    16,
    18,
    20,
    24,
    30,
    36,
    48,
    60,
    72,
    96,
    128
  ]}
  fontWeight={400}
  sampleText={"The quick brown fox jumps over the lazy dog."}
  fontFamily={"system-ui, sans-serif"}
/>
```

سترى شيئًا على هذا النحو.

![مكوّن Typeset في Storybook يصيّر تنضيد نظام التصميم لدينا](/images/kinney/2046b2dd3faff7c0.webp)
