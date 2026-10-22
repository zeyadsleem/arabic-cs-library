---
title: "الأصول وإقرارات الوحدات"
---

حين تبني تطبيق React، فأنت لا تكتب JavaScript وTypeScript فحسب. أنت تستورد ملفات CSS وصورًا وملفات SVG وخطوطًا وكل أنواع الأصول الأخرى التي تجعل تطبيقك يبدو جيّدًا ويعمل على نحو صحيح. لكن هذه هي المسألة: لا يعرف TypeScript افتراضيًا ماذا يفعل بهذه الملفات غير المكتوبة بـ JavaScript، وسيُطلق نَفَسًا من الغضب في كلّ مرّة تحاول فيها استيرادها.

وهنا يأتي دور **إقرارات الوحدات (module declarations)**—طريقة TypeScript في القول: «أعرف ما هذا الامتداد الغريب للملف، وهذه هي الطريقة التي ينبغي أن تتعامل معه بها». فبكتابة إقرارات وحدات مخصّصة، يمكنك أن تجعل TypeScript يفهم أصولك، ويحصل على إكمال تلقائي صحيح، ويتخلّص من أخطاء «Cannot find module» المزعجة التي تلاحق كل مشروع React في وقت ما.

## لماذا يلتبس TypeScript

لنبدأ بالمشكلة. لقد رأيت على الأرجح شيئًا كهذا في تطبيق React لديك:

```typescript
import './Button.css';
import logo from './logo.png';
import IconSvg from './icon.svg';

export function Button() {
  return (
    <button className="fancy-button">
      <img src={logo} alt="Company logo" />
      <IconSvg className="button-icon" />
    </button>
  );
}
```

من دون إقرارات وحدات سليمة، سيشتكي TypeScript من كل استيراد هنا:

```
❌ Cannot find module './Button.css' or its corresponding type declarations.
❌ Cannot find module './logo.png' or its corresponding type declarations.
❌ Cannot find module './icon.svg' or its corresponding type declarations.
```

السبب بسيط: لا يفهم TypeScript افتراضيًا سوى ملفات JavaScript وTypeScript. وحين يصادف ملف `.css` أو `.png` أو `.svg` فلا فكرة لديه عمّا ينبغي أن تكون هذه الملفات أو كيف ينبغي أن تتصرّف في شيفرتك.

## إنشاء ملف إقرارات الوحدات الأول

تعيش إقرارات الوحدات في ملفات `.d.ts` (الحرف «d» اختصارًا لكلمة «declaration»). يمكنك وضعها في أي مكان يعثر عليه TypeScript، لكن الأسلوب المتّبع هو إنشاء مجلّد `types` أو إضافتها إلى ملفات تعريف الأنواع الموجودة لديك.

لنبدأ بإنشاء ملف `src/types/assets.d.ts`:

```typescript
// src/types/assets.d.ts

// CSS Modules and regular CSS files
declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// Images
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
```

هذا يخبر TypeScript: «حين يستورد أحدهم ملف `.css`، تعامل معه ككائن له مفاتيح نصّية وقيم نصّية. وحين يستورد أحدهم صورة، تعامل معها كنصّ (رابط URL للصورة)».

> **تلميح**
>
> تأكّد من أنّ `tsconfig.json` يتضمّن مجلّد `types` أو من أنّ ملفات الإقرارات هذه في مكان يعثر عليه TypeScript تلقائيًا.

## التعامل مع أنواع الأصول المختلفة

### CSS والتنسيق

إقرار CSS أعلاه يعمل مع ملفات CSS العادية ومع CSS Modules معًا. فإذا كنت تستخدم CSS Modules حصريًا وتريد تصنيفًا أدقّ، فيمكنك أن تكون أكثر تحديدًا:

```typescript
// For CSS Modules specifically
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For regular CSS files (side-effect imports)
declare module '*.css' {
  const content: string;
  export default content;
}
```

ومع CSS Modules، قد ترغب أيضًا في إضافة نوع أكثر تقييدًا إذا كنت تعرف أسماء أصنافك مسبقًا:

```typescript
// For a specific CSS Module file
declare module './Button.module.css' {
  interface Classes {
    button: string;
    primary: string;
    secondary: string;
    disabled: string;
  }
  const classes: Classes;
  export default classes;
}
```

### ملفات SVG: الحالة الصعبة

تُعدّ ملفات SVG مثيرة للاهتمام بصفة خاصة لأن حُزّام الملفات (bundlers) غالبًا ما تتعامل معها بطرق مختلفة. فبعضها يتعامل معها كروابط صور، وبعضها يتيح لك استيرادها كمكوّنات React. إليك كيفية التعامل مع الحالتين معًا:

```typescript
// SVGs as URLs (like images)
declare module '*.svg' {
  const src: string;
  export default src;
}

// SVGs as React components (common with SVGR)
declare module '*.svg' {
  import React from 'react';
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVGComponent;
}
```

لكن انتبه—لا يمكن أن يكون لديك إقراران لنمط الوحدة نفسه! فإذا كان حُزّامك يدعم الحالتين معًا (مثل Create React App أو Vite مع الإضافات المناسبة)، فسيُلزمك أن تكون أكثر تحديدًا:

```typescript
// For SVGs imported as URLs
declare module '*.svg?url' {
  const src: string;
  export default src;
}

// For SVGs imported as React components
declare module '*.svg' {
  import React from 'react';
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVGComponent;
}
```

ثم في شيفرتك:

```typescript
import IconComponent from './icon.svg'; // React component
import iconUrl from './icon.svg?url'; // URL string

// Use as component
<IconComponent className="w-6 h-6" />

// Use as image source
<img src={iconUrl} alt="Icon" />
```

## إقرارات الأصول المتقدّمة

### الخطوط والملفات الأخرى

لا تنسَ الأصول الأخرى التي قد يستخدمها تطبيقك:

```typescript
// Font files
declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

// Data files
declare module '*.json' {
  const value: any;
  export default value;
}

// Text files
declare module '*.txt' {
  const content: string;
  export default content;
}
```

### ملفات الوسائط

بالنسبة إلى الصوت والفيديو:

```typescript
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}
```

## الإقرارات الخاصة بكل بيئة

أحيانًا تحتاج إلى إقرارات مختلفة لكل بيئة. يمكنك استخدام تحسين الوحدات (module augmentation) في TypeScript لهذا الغرض:

```typescript
// In development, you might want more detailed image information
declare module '*.png' {
  const src: string;
  export default src;
  export const width: number;
  export const height: number;
}

// This allows you to import both the src and metadata
import logoSrc, { width, height } from './logo.png';
```

## مثال واقعي: إعداد الأصول الكامل

إليك ملف `src/types/assets.d.ts` شاملًا يغطّي معظم حالات الاستخدام الشائعة:

```typescript
// CSS and styling
declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Images
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

// SVGs (as React components)
declare module '*.svg' {
  import React from 'react';
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVGComponent;
}

// SVGs as URLs (when using ?url suffix)
declare module '*.svg?url' {
  const src: string;
  export default src;
}

// Fonts
declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

declare module '*.otf' {
  const src: string;
  export default src;
}

// Audio/Video
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

// Documents and data
declare module '*.pdf' {
  const src: string;
  export default src;
}

declare module '*.txt' {
  const content: string;
  export default content;
}
```

## استخدام إقراراتك

بعد أن تُنشئ إقرارات وحداتك، يصبح استيراد الأصول أمرًا يسيرًا:

```typescript
// All of these now have proper TypeScript support
import styles from './Component.module.css';
import './global.css';
import heroImage from './hero.jpg';
import LogoIcon from './logo.svg';
import logoUrl from './logo.svg?url';
import fontFile from './custom-font.woff2';

export function Hero() {
  return (
    <div className={styles.hero}>
      <img src={heroImage} alt="Hero" />
      <LogoIcon className={styles.logo} />
      {/* TypeScript knows all about these imports! */}
    </div>
  );
}
```

## اعتبارات خاصة بكل إطار عمل

### Create React App

إذا كنت تستخدم Create React App، فهو يأتي مع بعض إقرارات الأصول مدمجة، لكنك قد ترغب في توسيعها. يبحث CRA عن ملفات الإقرارات في `src/`، لذا ينبغي أن يعمل ملف `src/types/assets.d.ts` لديك على نحو مثالي.

### Vite

يقدّم Vite دعمًا مدمجًا ممتازًا للأصول ويوفّر تعريفات أنواع خاصة به. يمكنك توسيعها في ملف `vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />

// Extend Vite's built-in asset handling
declare module '*.svg?component' {
  import React from 'react';
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}
```

### Next.js

يتعامل Next.js مع أصول كثيرة تلقائيًا، لكنك قد تحتاج إلى إقرارات مخصّصة للأصول المتخصّصة:

```typescript
// next-env.d.ts (or in your custom declaration file)
declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.mdx' {
  import { ComponentType } from 'react';
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
```

## الأخطاء الشائعة وكيف تتجنّبها

### جذور الأنواع المفقودة

إذا لم تكن إقراراتك قد التُقطت، فافحص `tsconfig.json`:

```json
{
  "compilerOptions": {
    "typeRoots": ["./types", "./node_modules/@types"]
  },
  "include": ["src/**/*", "types/**/*"]
}
```

### إقرارات متعارضة

إذا كانت لديك عدّة ملفات إقرارات تعرّف أنماط الوحدات نفسها، فسيشتكي TypeScript. تأكّد من أنّ كل نمط معرَّف مرّة واحدة فقط عبر كل ملفات `.d.ts` لديك.

### أكثر عمومية من اللازم أو أكثر تحديدًا من اللازم

```typescript
// ❌ Too generic - loses type information
declare module '*' {
  const content: any;
  export default content;
}

// ✅ Just right - specific enough to be useful
declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// ❌ Too specific - maintenance nightmare
declare module './specific-file.css' {
  const styles: {
    button: string;
    primary: string;
    // ... every class name
  };
  export default styles;
}
```

## اختبار إقرارات وحداتك

يمكنك التحقّق من عمل إقراراتك عبر استيراد أصل ومطابقة الأنواع المستنتجة:

```typescript
import styles from './test.css';
import image from './test.png';

// Hover over these in your IDE to see the inferred types
const buttonClass = styles.button; // string
const imageSrc = image; // string

// TypeScript should catch these errors:
// const invalid = styles.nonexistentClass; // Should work (CSS modules are flexible)
// const alsoInvalid: number = image; // Should error
```

## حين لا تكفي إقرارات الوحدات

أحيانًا تحتاج إلى ما هو أكثر من إقرارات الوحدات الأساسية. في السيناريوهات المعقّدة، فكّر في:

1. **إضافات مخصّصة لحُزّام الملفات** تولّد الأنواع تلقائيًا
2. **توليد الأنواع وقت البناء** لأشياء مثل GraphQL أو مخطّطات API
3. **التحقّق وقت التشغيل (runtime validation)** بمكتبات مثل Zod للاستيرادات الديناميكية

لكن لِما يقارب 90% من احتياجات استيراد الأصول في تطبيقات React، ستفي إقرارات الوحدات التي غطّيناها هنا بالغرض على نحو جيّد.

---

قد تبدو إقرارات الوحدات كأنها شيفرة روتينية (boilerplate)، لكنها هي الأساس الذي يجعل استيراد الأصول في تطبيقات React المكتوبة بـ TypeScript أمرًا ممتعًا في العمل عليه فعلًا. اضبطها مرّة واحدة، وستحصل على إكمال تلقائي صحيح، وفحص أخطاء، وذلك الإحساس الدافئ بالسلامة النمطية في كل مرّة تستورد فيها صورة أو ملف أنماط أو أي أصل آخر.

وفي المرّة القادمة التي تصادف فيها خطأ «Cannot find module» لأصل ما، ستعرف تمامًا ما ينبغي فعله: اكتب إقرارًا، وعلّم TypeScript ما ينبغي أن يكون عليه ذلك الملف، ثم عُد إلى بناء تجارب مستخدم رائعة.
