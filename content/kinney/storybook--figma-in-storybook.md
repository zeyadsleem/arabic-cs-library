---
title: "Figma في Storybook"
lang: ar
source: "https://stevekinney.com/courses/storybook/figma-in-storybook"
---

في كثير من الأحيان يكون جميلًا أن نرى ما ننفّذه في المكان نفسه الذي نراجع فيه تنفيذنا. فإن كنت تستخدم Figma، فيمكنك التكامل مع قصصك لتجعل حياتك أسهل قليلًا.

> **يستطيع Storybook التكامل مع أكثر من Figma**
>
> نحن نستخدم Figma، لكن [ملحق Designs](https://storybook.js.org/addons/@storybook/addon-designs/) يعمل مع أكثر من Figma. ويمكنك قراءة التوثيق الكامل [هنا](https://storybookjs.github.io/addon-designs/?path=/docs/docs-quick-start--docs).

أولًا، سنحتاج إلى تثبيت ملحق آخر في Storybook.

```bash
npx storybook@latest add @storybook/addon-designs
```

سيؤدي تشغيل هذا السكربت إلى تثبيت الاعتماد وإضافته إلى `.storybook/main.ts`.

انتقل إلى Figma وانقر على زر **Share** نحو اليمين في شريط الأدوات، ثم اختر **Copy Link**.

![مشاركة ملف Figma](/images/kinney/16ccfecb98aee0b5.webp)

بعد ذلك، في قصتك، سنضيف معاملًا ينشئ الرابط بين القصة والتصميمات.

```typescript
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/w7qcf0DQZEQhudgeOoLbZ8/Components?type=design&node-id=24%3A177&mode=design&t=i9nPQJAFW2alh32c-1',
    },
  },
  // …additional properties…
};
```

والآن، عند تشغيل Storybook، ستستطيع أن ترى الاثنين جنبًا إلى جنب.

![تصميم Figma إلى جانب Storybook](/images/kinney/1b0127d0f23d7498.webp)
