---
title: "إعداد Storybook"
lang: ar
source: "https://stevekinney.com/courses/storybook/setting-up"
---

يتولّى Storybook معظم إعداداته بنفسه. داخل مشروع قائم، ما عليك إلا تشغيل الأمر التالي.

```bash
npx storybook@latest init
```

عند تشغيل هذا الأمر، سيلقي Storybook نظرة على مشروعك ويحاول معرفة إطار العمل — إن وُجد — الذي تستخدمه إلى جانب أدوات البناء التي تستخدمها. ولنفترض جدلًا أننا نستخدم React وTypeScript وVite.

سيثبّت Storybook الاعتمادات التالية:

- [`@chromatic-com/storybook`](https://npm.im/@chromatic-com/storybook)
- [`@storybook/addon-essentials`](https://npm.im/@storybook/addon-essentials)
- [`@storybook/addon-interactions`](https://npm.im/@storybook/addon-interactions)
- [`@storybook/addon-links`](https://npm.im/@storybook/addon-links)
- [`@storybook/blocks`](https://npm.im/@storybook/blocks)
- [`@storybook/react`](https://npm.im/@storybook/react)
- [`@storybook/react-vite`](https://npm.im/@storybook/react-vite)
- [`@storybook/test`](https://npm.im/@storybook/test)

بالإضافة إلى ذلك، سيُثبَّت [`eslint-plugin-storybook`](https://npm.im/eslint-plugin-storybook) *فقط* إذا كنت تستخدم [ESLint](https://eslint.org/) بالفعل في مشروعك.

هناك اعتماد إضافي واحد، [`@storybook/addon-onboarding`](https://npm.im/@storybook/addon-onboarding)، لن يُثبَّت *إلا* مع أطر عمل معيّنة. ومن المرجّح أيضًا أنك ستزيله لاحقًا.

وسينشئ أيضًا مجلد `.storybook` في جذر مشروعك مع ملفين:

- `.storybook/main.ts`
- `.storybook/preview.ts`

وسيُعدّ لك بعض القصص الأساسية في `src/stories`.

وأخيرًا، سيُشغّل خادمًا يعمل على المنفذ 6006. ويمكنك تشغيل هذا الخادم في أي وقت باستخدام `npm run storybook`.

شاشة الترحيب الأولية في Storybook

وبعد ذلك، لنلقِ نظرة على [كتابة أول قصة لنا](https://stevekinney.com/courses/storybook/writing-stories).
