---
title: "إعداد مشغّل اختبارات"
---

يتيح لك Storybook أن تأخذ [دوال التشغيل (Play functions)](https://stevekinney.com/courses/storybook/play-functions) وتشغّلها كلها بالترتيب للتأكد من أنها تفعل ما تتوقّعه منها.

ستحتاج إلى تثبيت مشغّل الاختبارات الخاص بهم للبدء في ذلك:

```bash
npm install -D @storybook/test-runner
```

> **يستخدم Storybook إطار Playwright**
>
> تأكد من تثبيت متصفحات Playwright لديك بتشغيل `npx playwright install`.

> **يجب أن يكون Storybook قيد التشغيل**
>
> يجب أن يكون Storybook قيد التشغيل لتشغيل اختباراتك باستخدام `@storybook/test-runner`.

بمجرد أن يعمل Storybook لديك، يمكنك تشغيل اختباراتك.

```bash
npx test-storybook
```

بدلًا من ذلك، يمكنك — بل ينبغي لك — إضافة سكربت إلى `package.json` لتشغيل الاختبارات.

## تشغيل اختباراتك في Github Actions

لن نغطّي ذلك في وقتنا القصير معًا اليوم، لكن [توثيق Storybook الرسمي](https://storybook.js.org/docs/writing-tests/test-runner#set-up-ci-to-run-tests) يتضمّن بعض الأمثلة على [Github Actions](https://github.com/features/actions) لتشغيل اختبارات Storybook لديك كجزء من عملية CI/CD.
