---
title: "التكامل مع Mock Service Worker"
---

يمكنك أن تجعل قصصك تجلب بيانات من API باستخدام [المحمّلات](https://stevekinney.com/courses/storybook/loaders)، لكنك على الأرجح لا تريد أن تتحمّل عناء تشغيل خادم محلي لمجرد عرض مكتبة مكوّناتك. وأيضًا على الأرجح لا تريد أن تتحمّل اعتماد API خارجي قد يسقط فيكسر Storybook لديك.

ومن الحلول الممكنة استخدام [Mock Server Worker](https://mswjs.io/) لاعتراض الطلبات على مستوى المتصفح ثم إعادة بيانات مُحاكاة إلى مكوّناتك. وبقدر ما يخص قصصك ومكوّناتك، فهي تتحدث إلى API حقيقي، لكن دون أي من العيوب التي ذكرتها سابقًا.

يمكنك تثبيت Mock Service Worker و[ملحق Storybook](https://storybook.js.org/addons/msw-storybook-addon/) كما يلي:

```bash
npm -D i msw msw-storybook-addon
```

ستحتاج إلى تهيئة نقاط نهاية Mock Service Worker إن لم تكن قد فعلت ذلك. أنا أستخدم Vite، لذا سأفترض أن دليل أصولنا الثابتة يقع في `/public`.

```bash
npx msw init public/
```

## إضافة الملحق

```typescript
import { initialize, mswLoader } from 'msw-storybook-addon';
initialize();

const preview = {
  //… other stuff
  loaders: [mswLoader],
};

export default preview;
```
