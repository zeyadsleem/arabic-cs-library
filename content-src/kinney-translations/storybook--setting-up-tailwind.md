---
title: "استيراد الأنماط واستخدام Tailwind واستخدام السمات"
---

> **هذا ليس خاصًّا بـ Tailwind بالضرورة**
>
> يمكن تطبيق كل ما في هذا القسم تقريبًا على أي أوراق أنماط تستخدمها في تطبيقك، لكن بما أننا سنستخدم Tailwind في نظام التصميم لدينا، فإن لهذا نكهة خفيفة من Tailwind، أما المحتوى نفسه فينطبق على نطاق أوسع.
>
> هناك أسباب كثيرة تدعوك إلى التفكير في استخدام Tailwind، وأسباب مماثلة تمامًا قد تجعله ليس الخيار الأنسب. وقد بذلت جهدي في عرض تفكيري [هنا](https://stevekinney.com/writing/tailwind-and-design-systems).

التكامل مع [Tailwind](https://tailwindcss.com/) — أو، بصراحة، مع أي أنماط أخرى أعددتها — سهل إلى حدّ كبير مع Storybook.

> **هذا مُعدّ بالفعل في المشروع المثال**
>
> يمكنك تجاوز هذه الخطوة إن كنت تتابع مع مستودعنا المثال. أُدرج هذا هنا لمجرد الرجوع إليه لاحقًا.

إن احتجت إلى تثبيت Tailwind، يمكنك تشغيل ما يلي:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwind init --ts -p
```

## إضافة أنماطك إلى Storybook

في `.storybook/preview.ts`، ما عليك إلا استيراد أي ورقة أنماط تريد تضمينها في قصصك. وستُطبَّق هذه *فقط* على اللوحة (canvas) و*ليس* على واجهة Storybook بأكملها.

```diff
diff --git a/.storybook/preview.ts b/.storybook/preview.ts
index adcda96..6725718 100644
--- a/.storybook/preview.ts
+++ b/.storybook/preview.ts
@@ -1,5 +1,7 @@
 import type { Preview } from '@storybook/react';

+import '../src/index.css';
+
 const preview: Preview = {
   parameters: {
     controls: {
```

## دعم الوضع الداكن

يأتي Tailwind بدعم جاهز لـ[الوضع الداكن](https://tailwindcss.com/docs/dark-mode). يستخدم Tailwind افتراضيًا تفضيلات المتصفح (باستخدام [استعلام الوسائط `prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)) لتحديد ما إذا كان ينبغي تصيير المحتوى في الوضع الداكن، لكنه يتيح لك أيضًا تحديد ما إذا كنت تفضّل تفعيل الوضع الداكن عبر محدِّد CSS.

سنرغب في التبديل بين الوضعين الفاتح والداكن دون الحاجة إلى تعديل إعدادات متصفحنا. لذا، لنُعدّ ذلك.

```diff
diff --git a/tailwind.config.ts b/tailwind.config.ts
index bc8a713..5015364 100644
--- a/tailwind.config.ts
+++ b/tailwind.config.ts
@@ -2,6 +2,7 @@ import type { Config } from 'tailwindcss';

 export default {
   content: ['./src/**/*.{js,jsx,ts,tsx,mdx,html}'],
+  darkMode: ['class', '[data-mode="dark"]'],
   theme: {
     extend: {},
   },
```

## استخدام إضافة السمات في Storybook

تحتوي واجهة Storybook الطرفية على مساعد يثبّت الإضافات كاعتماد ويضيف الإضافة أيضًا إلى `.storybook/main.ts`.

```bash
npx storybook@latest add @storybook/addon-themes
```

> **إذا ظهرت لك رسالة خطأ مفادها أن Storybook لا يجد إعداد `main.js` لديك**
>
> يمكنك ببساطة تثبيت الاعتماد ثم [إضافته يدويًّا إلى مصفوفة الإضافات](https://stevekinney.com/courses/storybook/add-an-addon).

سيُطرح عليك السؤال التالي:

```typescript
? How do you toggle themes? › - Use arrow-keys. Return to submit.
❯   CSS class
    Data attribute
```

إن احتجت إلى إعداد ذلك يدويًّا، يمكنك إضافة ما يلي إلى `.storybook/main.ts`.

```diff
diff --git a/.storybook/main.ts b/.storybook/main.ts
index 098b7b7..63965e0 100644
--- a/.storybook/main.ts
+++ b/.storybook/main.ts
@@ -8,6 +8,7 @@ const config: StorybookConfig = {
     '@storybook/addon-essentials',
     '@chromatic-com/storybook',
     '@storybook/addon-interactions',
+    '@storybook/addon-themes',
   ],
   framework: {
     name: '@storybook/react-vite',
```

### استخدام خاصية بيانات

اخترنا استخدام خاصية بيانات للوضع الداكن، لكن يمكنك أيضًا استخدام صنف (class). وقد تختلف النتيجة لديك، لكن نتيجتي مستمدّة من إضافة الوضع الداكن إلى قاعدة شيفرة قديمة. لذا سأختار استخدام خاصية بيانات.

```diff
diff --git a/.storybook/preview.ts b/.storybook/preview.ts
index 6725718..f68d778 100644
--- a/.storybook/preview.ts
+++ b/.storybook/preview.ts
@@ -1,4 +1,5 @@
 import type { Preview } from '@storybook/react';
+import { withThemeByDataAttribute } from '@storybook/addon-themes';

 import '../src/index.css';

@@ -11,6 +12,16 @@ const preview: Preview = {
       },
     },
   },
+  decorators: [
+    withThemeByDataAttribute({
+      defaultTheme: 'light',
+      themes: {
+        light: 'light',
+        dark: 'dark',
+      },
+      attributeName: 'data-mode',
+    }),
+  ],
 };

 export default preview;
```

كما قلت، كلا الجوابين مقبول حسب إعداداتك. وليس لديّ رأي قوي خارج تجربة ترحيل قاعدة شيفرة قائمة واكتشاف — بالطريقة الصعبة — أن `dark` كان مستخدمًا بالفعل لأغراض أخرى، لذا سأمضي مع خاصية البيانات.

إن سار كل شيء على ما يرام، فمن المفترض أن ترى شيئًا كهذا:

![إشعار من واجهة Storybook الطرفية بأن إضافة السمات ثُبِّتت بنجاح](/images/kinney/664ad2c027c7044f.webp)

إضافةً إلى تثبيت الاعتماد، سيجري هذا التغييرات التالية على إعداد Storybook لديك.

- سيضيف [`@storybook/addon-themes`](https://storybook.js.org/addons/@storybook/addon-themes/) إلى قائمة `addons` لديك في `.storybook/main.ts`.
- سيُعدّ [مُزيِّنًا (decorator)](https://stevekinney.com/courses/storybook/decorators) في `.storybook/main.ts`.

![الوضع الداكن في Storybook بفضل Tailwind](/images/kinney/c7a7aae0dda1bd4d.webp)
