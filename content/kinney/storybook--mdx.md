---
title: "استخدام Storybook مع MDX"
lang: ar
source: "https://stevekinney.com/courses/storybook/mdx"
---

تتيح لك Storybook توثيق المكوّنات باستخدام [MDX](https://mdxjs.com/)، وهو أساسًا Markdown + JSX فقط.

وهذا يتيح *قدرًا كبيرًا* من المرونة في كيفية عرضك للمكوّنات والقصص وأدوات التحكم—والتوثيق بالطبع.

> **Storybook وMDX يدعم React فقط.**
>
> يمكن أن تكون مكوّناتك وقصصك بأي إطار عمل تدعمه Storybook، لكن ملفات MDX لديك ستستخدم React.

افتراضيًا، سيلتقط MDX أي ملفات `.mdx` في مشروعك. لكن *يمكنك* تهيئته إن أردت.

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  /**
   * Change the setting below if you want to be a bit more specific
   * about where you want Storybook to go looking for MDX files.
   */
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // The rest of your configuration…
};
export default config;
```

لنبدأ بشيء بسيط فقط لنوضّح كيف يعمل MDX، ثم ندخل في بعض الحيل الأكثر تحديدًا المتعلقة بـ Storybook. لننشئ `src/components/button/button.mdx`.

```mdx
import { Button } from './button';

# Component System

Welcome to our dope component library. This is a collection of components that we use in our projects. We hope you find them useful.

<Button>Wow, a button!</Button>
```

![صفحة توثيق MDX أساسية في Storybook](/images/kinney/b538d7878f197348.webp)

## كتل التوثيق

القوة *الحقيقية*—أو القوة المتعلقة بـ Storybook على الأقل—تأتي من خلط `@storybook/blocks` في توثيقك. وتتيح لك كتل التوثيق أخذ أجزاء من القصص التي نعمل عليها حتى الآن ودمجها في نثرك.

```mdx
import { Meta, Title, Primary, Controls, Story } from '@storybook/blocks';
import * as ButtonStories from './button.stories';

<Meta of={ButtonStories} />

<Title>Button</Title>

A button is a thing that you press in order to make stuff happen.

<Primary />

## Controls

Buttons have lots of little things that you can tweak about them.

<Controls />
```

لنتحدث عمّا يجري هنا:

- نستورد كل الصادرات من قصص زرنا.
- نستورد كتلة `Meta` من `@storybook/blocks` لربط توثيقنا بمكوّننا.
- كتلة `Primary` تصيّر أول قصة معرَّفة في ملف `button.stories.tsx` لدينا. ومن قبيل المصادفة البحتة أن أول تصدير لدي *أيضًا* اسمه **Primary**.
- هناك بعض النثر الإضافي ثم نعيد تصيير `Controls`، وهو مماثل لما رأيناه حتى الآن.

![توثيق مكوّن الزر مصيَّر في MDX](/images/kinney/512f75e347b95e68.webp)
