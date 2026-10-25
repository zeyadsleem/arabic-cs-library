---
title: "إضافة ملحق إلى Storybook"
lang: ar
source: "https://stevekinney.com/courses/storybook/add-an-addon"
---

إذا احتجت إلى إضافة ملحق يدويًا في Storybook، فيمكنك اتباع هذه الخطوات للبدء. أولًا، سنحتاج إلى تثبيت الملحق المعني.

```bash
 npm i -D @storybook/addon-themes
```

بعد ذلك، ننتقل إلى `.storybook/main.ts` ونضيفه إلى مصفوفة الملحقات.

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
