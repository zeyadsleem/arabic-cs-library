---
title: "استيراد الخطوط من Fontsource"
---

هناك طرق كثيرة لتضمين خطوط خارجية. لكن دعني أخبرك بـ**المفضّلة** لدي: تثبيتها من npm من [Fontsource](https://fontsource.org/).

سيستخدم نظام التصميم لدينا خط Inter، أساسًا لأنه ما نستخدمه في مكان عملي ولأنني لا أكرهه. وتثبيت الخط بهذه السهولة:

```bash
npm install @fontsource-variable/inter
```

إن كنت تستخدم المستودع المثال، فقد أُنجز هذا الجزء لك بالفعل.

بعد ذلك، في ملف الأنماط لديك، `index.css` في حالتنا، استورد الاعتماد ببساطة. (أفترض أنك تستخدم [PostCSS](https://postcss.org/)، وهو يأتي مجانًا مع [Vite](https://vite.dev/).)

```css
@import '@fontsource-variable/inter';
```

الآن، يمكنك استخدام مكدس الخطوط في CSS لديك، لكننا نستخدم Tailwind، فلنستبدل ببساطة `font-sans` بخطنا الجديد.

```typescript
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx,html}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```
