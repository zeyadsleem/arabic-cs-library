---
title: "تخصيص ألوان Tailwind"
lang: ar
source: "https://stevekinney.com/courses/storybook/customizing-tailwind-colors"
---

لنظام التصميم لدينا نظام ألوانه الخاص. ولحسن الحظ، يمكننا استبدال النظام المضمّن في Tailwind بسهولة لا بأس بها. ولأوفّر عليك عناء تجميعه بنفسك، أدرجت تنفيذًا في `src/tokens/colors.ts` يمكنك استخدامه.

أمامك خياران هنا:

1. توسيع سمة الألوان المضمّنة في Tailwind.
2. استبدالها كليًا.

وسأحتجّ بأننا ينبغي أن نستبدلها حتى لا يستخدم زملاؤنا المطوّرون الألوان المدمجة فعليًا.

الآن، سنستبدل ببساطة الألوان المدمجة في السمة بلوحة ألواننا المخصّصة.

```typescript
import type { Config } from 'tailwindcss';
import { colors, white, black, transparent, currentColor } from './src/tokens/colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx,html}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    colors: {
      ...colors,
      white,
      black,
      transparent,
      currentColor,
    },
  },
  plugins: [],
} satisfies Config;
```

## دمج سمتنا

هناك ثلاث طرق لاستخدام سمة Tailwind الجديدة في مكوّننا:

1. استخدام دالة `theme()` الخاصة بـ CSS التي توفّرها Tailwind عبر PostCSS.
2. استخدام توجيه `@apply` الذي توفّره Tailwind عبر PostCSS.
3. إعادة كتابة المكوّن باستخدام أصناف Tailwind المساعدة.

والخيار الثالث هو أفضل رهان لدينا على الأرجح—وسنفعله بعد قليل، لكنه قد يكون أسهل قولًا من فعل في قاعدة شيفرة قديمة. فلننظر في الأولين.

### استخدام دالة theme

باستخدام الأسلوب الأول، يمكننا المرور على القيم واستبدالها بإشارات إلى سمتنا.

```diff
 .button {
   align-items: center;
-  background-color: #8a55c8;
+  background-color: theme('colors.primary.600', #8a55c8);
   border-color: transparent;
   border-radius: 0.25rem;
   border-width: 1px;
```

### استخدام Apply

بدلًا من ذلك، يمكننا تطبيق أصناف Tailwind المساعدة على أصنافنا الموجودة.

```diff
 .button {
-  align-items: center;
-  background-color: #8a55c8;
-  border-color: transparent;
-  border-radius: 0.25rem;
-  border-width: 1px;
-  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
-  color: white;
-  cursor: pointer;
-  display: inline-flex;
-  font-weight: 600;
-  gap: 0.375rem;
-  padding: 0.375rem 0.625rem;
-  transition: background-color 0.2s;
+  @apply bg-primary-600 inline-flex cursor-pointer items-center gap-1.5 rounded border border-transparent px-2.5 py-1.5 text-white shadow-sm transition-colors;
 }
```
