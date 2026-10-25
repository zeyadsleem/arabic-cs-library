---
title: "تنظيم القصص والتوثيق"
lang: ar
source: "https://stevekinney.com/courses/storybook/naming-and-hierarchy"
---

إن نظرت إلى شريطنا الجانبي، فهو *بالفعل* صار غير منظّم قليلًا. ولحسن الحظ، من السهل جدًا إدخال قدر من التنظيم على مكوّناتنا. وتستخدم Storybook طريقة تسمية مكوّناتنا لتكوين نوع من التسلسل الهرمي.

فمثلًا، إن سمّيت مكوّنًا `Components/Button`، فسيضع قصة `Button` لديك تحت قسم `Components`. هيا نجرّب ما يلي.

في `src/colors.mdx`:

```diff
@@ -2,7 +2,7 @@ import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';
 import colors from 'tailwindcss/colors';
 import config from '../tailwind.config';

-<Meta title="Colors" />
+<Meta title="Tokens/Colors" />

 ## Brand Colors
```

في `src/components/button/button.stories.tsx`:

```diff
@@ -3,7 +3,7 @@ import type { Meta, StoryObj } from '@storybook/react';
 import { Button } from './button';

 const meta = {
-  title: 'Button',
+  title: 'Components/Button',
   component: Button,
   args: {
     children: 'Button',
```

في `src/icons.mdx`:

```diff
@@ -1,7 +1,7 @@
 import { Meta, Title, IconGallery, IconItem } from '@storybook/blocks';
 import { icons, Icon } from './components/icon';

-<Meta title="Icons" />
+<Meta title="Tokens/Icons" />

 <Title>Icons</Title>
```

## النتيجة

ينبغي أن نعيش الآن في عالم أكثر نظامًا بكثير.

![مكوّنات Storybook مرتّبة بشكل جميل](/images/kinney/104a990d309d86f0.webp)
