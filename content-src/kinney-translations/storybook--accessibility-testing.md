---
title: "اختبار إمكانية الوصول (Accessibility Testing)"
---

تتيح لك Storybook إجراء تدقيق لإمكانية الوصول على قصصك باستخدام الملحق [`@storybook/addon-a11y`](https://npm.im/@storybook/addon-a11y). هيا نشغّله.

```bash
npx storybook@latest add @storybook/addon-a11y
```

سيضيف هذا تبويبًا جديدًا إلى لوحة الملحقات لديك يعرض أي مشكلات قد تكون في مكوّنك. وهو يستخدم في الخفاء [`axe-core`](https://www.npmjs.com/package/axe-core) لتشغيل التدقيق.

من ملف [`README.md`](https://github.com/dequelabs/axe-core/blob/develop/README.md) الخاص بـ `axe-core`:

> باستخدام axe-core، يمكنك اكتشاف 57% من مشكلات WCAG تلقائيًا في المتوسط. وإضافة إلى ذلك، يعيد axe-core العناصر بحالة «غير مكتمل» حيث لا يستطيع الجزم، فتحتاج إلى مراجعة يدوية.

## تشغيل تدقيقات إمكانية الوصول ضمن مجموعة اختباراتك

توجد تكاملة بين [Axe](https://www.deque.com/axe/) و[Playwright](https://playwright.dev/) تُسمّى—بلا مفاجأة—[`axe-playwright`](https://npm.im/axe-playwright). والرائع جدًا أن Storybook يستطيع تشغيل Playwright وتنفيذ هذه الاختبارات لك عبر [مشغّل الاختبارات](https://stevekinney.com/courses/storybook/test-runner) الخاص به.

> **الاعتمادات (Dependencies)**
>
> ستحتاج إلى تثبيت `axe-playwright` إن لم يكن مثبّتًا لديك بالفعل. يمكنك تدبّر ذلك بتشغيل `npm install axe-playwright --save-dev`.
>
> كذلك، إن كانت هذه أول تجربة لك مع Playwright في مشروعك، فستحتاج إلى تثبيت متصفحاته. يمكنك تدبّر ذلك بتشغيل `npx playwright install`.

في `.storybook/test-runner.ts`، يمكنك إعداد التهيئة التالية.

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;
```

الآن، عند تشغيل `npx test-storybook`، سيتحقّق *أيضًا* من مخالفات إمكانية الوصول كذلك.
