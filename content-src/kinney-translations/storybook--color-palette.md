---
title: "لوحة الألوان"
---

توفّر Storybook كتلة توثيق لتصيير لوحة ألوان نظام تصميمك. فمثلًا، يمكنك إنشاء ملف `.mdx` يشبه هذا.

```jsx
import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';

<Meta title="Colors" />

<ColorPalette>
	<ColorItem
		title="Brand"
		subtitle="Brand Colors"
		colors={{
			Subtle: '#a5b4fc',
			Default: '#4f46e5',
		}}
	/>
</ColorPalette>
```

ستصيّر Storybook لوحة الألوان البسيطة هذه.

![Storybook تصيّر لوحة ألوان](/images/kinney/2482be08aa1a3910.webp)

والأفضل من ذلك أنك تستطيع تصيير لوحة الألوان برمجيًا، لأن كامل قوة JSX تحت تصرفك. وهذا يتيح لك توليد لوحة ألوان بسهولة بناءً على سمتك.

لنقل إننا أردنا جلب كل الألوان من Tailwind. يمكننا أن نفعل شيئًا كهذا.

```jsx
import colors from 'tailwindcss/colors';

<ColorPalette>
  {Object.entries(colors)
    .filter(([, value]) => typeof value !== 'string')
    .map(([name, value]) => (
      <ColorItem key={name} title={name} colors={value} />
    ))}
</ColorPalette>;
```

من الواضح أن هذا سيختلف قليلًا حسب تصنيف سمتك، لكن يمكنك أن تتوقع شيئًا على هذه الشاكلة.

![لوحة ألوان مبنية على سمة Tailwind الافتراضية](/images/kinney/0a2f83a2f2f62e9b.webp)

## إنشاء سمة من الألوان الدلالية

من الأمور التي تعلمناها بالطريقة الصعبة أن استخدام قيم الألوان مباشرة قد يصبح مشكلة. فلو أردت تغيير لون كل مسارات العمل الملغاة—وهو مثال افتراضي تمامًا—فلا يمكنك تغيير اللون في مكان واحد فحسب. عليك أن تتعقّب كل موضع تستخدم فيه اللون الأصفر وتقيّم ما إذا كان يشير إلى مسار عمل ملغى أم لا.

ستكون دلالاتك فريدة لك على الأرجح، لكني وجدت بعض الأنماط الشائعة في ترحالي. فمثلًا، سيكون لديك عادةً القيم الدلالية التالية على الأقل:

- اللون الأساسي لعلامتك التجارية.
- لون للدلالة على إجراء خطير أو مدمِّر.
- لون أقل حدّة قليلًا لعرض التحذيرات.
- لون للدلالة على النجاح الحلو الحلو.
- لون عام للمعلومات التي لا تتعلق بالخطر ولا بالنجاح.
- مجموعة من درجات الرمادي لأسطح وعناوين مختلفة في تطبيقك.

يمكننا إعداد ذلك في سمة Tailwind لدينا ثم استخدام تلك القيم في كل أنحاء تطبيقنا. ويمكنها أن ترتبط بألوان Tailwind المدمجة أو أن ننشئ ألواننا الخاصة.

> **إنشاء لوحة ألوان خاصة بك**
>
> يعجبني حقًا [uicolors.app](https://uicolors.app/create) لتوليد لوحات ألوان تترجم تقريبًا إلى دلالات Tailwind.

أيًا كان المسار الذي تختاره، ستنتهي على الأرجح إلى شيء يشبه هذا على الأقل نوعًا ما.

```typescript
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx,html}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        success: colors.green,
        warning: colors.amber,
        danger: colors.red,
        info: colors.blue,
        surface: colors.slate,
      },
    },
  },
  plugins: [],
} satisfies Config;
```

## تمرين

هل يمكنك أن تأخذ المجموعة الأكثر تحديدًا من الألوان من سمتنا وتولّد لوحة ألوان؟ وإن واجهتك صعوبة [يمكنك الاطلاع على هذا الحل المحتمل](https://stevekinney.com/courses/storybook/color-palette-solution).

![لوحة ألوان مولَّدة برمجيًا معروضة في Storybook](/images/kinney/34d45b950e2a797f.webp)
