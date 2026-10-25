---
title: "مُجمِّع الويب السريع (SWC) لتطبيقات React"
lang: ar
source: "https://stevekinney.com/courses/react-performance/swc-speedy-web-compiler"
---

إن كانت أوقات بناء React لديك تبدو عالقة في الدبس، فقد حان الوقت للتعرف على SWC — مُجمِّع JavaScript المدفوع بـ Rust الذي يجعل Babel يبدو كأنه يعمل على حبة بطاطس. يحوّل SWC (Speedy Web Compiler) شيفرة JavaScript لديك ويحزمها بسرعة تصل إلى 20 ضعفًا مقارنة بالأدوات التقليدية، دون التضحية بالتحويلات التي يحتاجها تطبيق React الحديث. وسواء كنت تصارع بطء بدء خادم التطوير أو عمليات بناء الإنتاج التي تستغرق وقتًا طويلًا، يستطيع SWC إعادتك إلى إصدار الميزات بدلًا من الانتظار.

## ما هو SWC أصلًا؟

SWC مُجمِّع JavaScript/TypeScript من الجيل التالي مكتوب بـ Rust. اعتبره الشقيق الأصغر المليء بالكافيين لـ Babel — فهو يقوم بالتحويلات نفسها (JSX ← JavaScript، وES6+ الحديثة ← شيفرة متوافقة مع المتصفح، وTypeScript ← JavaScript) لكن بميزة السرعة الآتية من تنفيذه بلغة برمجة أنظمة.

وعلى خلاف Babel، المكتوب بـ JavaScript والذي يعالج شيفرتك بأسلوب أحادي الخيط، يستفيد SWC من خصائص أداء Rust ويستطيع استخدام نوى معالجة متعددة. والنتيجة؟ تجميع ليس أسرع فحسب، بل أسرع جذريًا — غالبًا تحسينات سرعة بمقدار 10-20 ضعفًا لقواعد شيفرة كبيرة.

يبرع SWC في:

1. **تحويل JSX**: تحويل صياغة JSX في React إلى استدعاءات دوال JavaScript عادية
2. **تجميع TypeScript**: إزالة الأنواع وترجمة TS إلى JS دون عبء `tsc`
3. **JavaScript الحديثة**: تحويل ميزات ES6+ لتوافق المتصفحات الأقدم
4. **التصغير**: ضغط شيفرة يضاهي Terser أو يتفوق عليه في السرعة وحجم المخرجات
5. **خرائط المصدر**: توليد سريع ودقيق لخرائط المصدر من أجل التنقيح

## إعداد SWC مع React

لنبدأ بالسيناريو الأكثر شيوعًا: دمج SWC في مشروع React قائم. إن كنت تستخدم أداة مثل Vite، فربما تستخدم SWC بالفعل تحت الغطاء دون أن تدري (فـ Vite يستخدم SWC لتجميع الاعتماديات مسبقًا). لكن لنرَ كيف نضبطه صراحةً.

### تثبيت SWC

أولًا، لنثبّت حزم SWC اللازمة:

```bash
# Core SWC packages
npm install -D @swc/core @swc/cli

# If you're using webpack
npm install -D swc-loader

# If you're using TypeScript
npm install -D @swc/plugin-transform-imports
```

### إعداد SWC الأساسي

يستخدم SWC ملف إعداد `.swcrc` (شبيه بـ `.babelrc` في Babel). إليك إعدادًا أساسيًا لمشروع React بـ TypeScript:

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "development": true,
        "refresh": true
      }
    },
    "target": "es2022",
    "loose": false,
    "externalHelpers": false,
    "keepClassNames": false,
    "preserveAllComments": false
  },
  "module": {
    "type": "es6",
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  },
  "minify": false,
  "isModule": true,
  "sourceMaps": true
}
```

لنفكّك الأجزاء الرئيسية:

- `jsc.parser.syntax`: يخبر SWC أننا نعالج ملفات TypeScript
- `jsc.parser.tsx`: يفعّل تحليل JSX
- `jsc.transform.react.runtime`: يستخدم تحويل JSX التلقائي في React 17+
- `jsc.transform.react.refresh`: يفعّل التحديث السريع في React أثناء التطوير
- `jsc.target`: إصدار JavaScript الذي نجمّع إليه

### التكامل مع Webpack

إن كنت تستخدم webpack (شائع في مشاريع Create React App بعد إخراج الإعدادات أو في الإعدادات المخصصة)، فيمكنك استبدال `babel-loader` بـ `swc-loader`:

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          // Replace babel-loader with swc-loader
          loader: 'swc-loader',
          options: {
            // SWC options here, or use .swcrc
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
              target: 'es2022',
            },
            module: {
              type: 'es6',
            },
          },
        },
      },
    ],
  },
};
```

## إعداد SWC الخاص بـ React

### خيارات تحويل JSX

يمنحك SWC تحكمًا دقيقًا في تحويل JSX. إليك الخيارات الرئيسية لـ React:

```json
{
  "jsc": {
    "transform": {
      "react": {
        "runtime": "automatic",
        "importSource": "@emotion/react",
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false,
        "refresh": false
      }
    }
  }
}
```

**شرح الإعدادات الرئيسية:**

- `runtime: "automatic"`: يستخدم تحويل JSX الجديد في React 17+ (لا حاجة لاستيراد React)
- `runtime: "classic"`: يستخدم التحويل القديم (يتطلب استيراد React)
- `importSource`: مصدر pragma JSX مخصص (مفيد لمكتبات مثل Emotion)
- `development`: يفعّل تحسينات وقت التطوير وتنقيحًا أفضل
- `refresh`: يفعّل التحديث السريع في React لاستبدال الوحدات الساخن

> **نصيحة**
>
> استخدم إعدادات مختلفة للتطوير والإنتاج بإنشاء ملفات إعداد منفصلة والتبديل بينها حسب `NODE_ENV`.

### إعدادات خاصة بكل بيئة

يمكنك إنشاء إعدادات SWC منفصلة لبيئات مختلفة:

```json
// .swcrc.development
{
  "jsc": {
    "transform": {
      "react": {
        "runtime": "automatic",
        "development": true,
        "refresh": true
      }
    },
    "target": "es2022"
  },
  "sourceMaps": "inline"
}
```

```json
// .swcrc.production
{
  "jsc": {
    "transform": {
      "react": {
        "runtime": "automatic",
        "development": false,
        "refresh": false
      }
    },
    "target": "es2015"
  },
  "minify": true,
  "sourceMaps": true
}
```

ثم بدّل بينها في سكربتات البناء لديك:

```json
{
  "scripts": {
    "dev": "SWCRC=.swcrc.development webpack serve",
    "build": "SWCRC=.swcrc.production webpack build"
  }
}
```

## SWC مقابل Babel: مقارنة الأداء

لنلقِ نظرة على بعض الأرقام الواقعية™. في مشروع React متوسط الحجم بـ TypeScript (نحو 500 مكوّن، ونحو 50 ألف سطر شيفرة)، إليك ما قد تتوقعه:

| المهمة | Babel | SWC | تحسين السرعة |
| --- | --- | --- | --- |
| التجميع الأولي | 45s | 3.2s | أسرع بنحو 14 ضعفًا |
| إعادة التحميل الساخن (ملف واحد) | 800ms | 45ms | أسرع بنحو 18 ضعفًا |
| بناء الإنتاج | 2m 15s | 8.5s | أسرع بنحو 16 ضعفًا |
| فحص أنواع TypeScript* | لا ينطبق | 12s | لا ينطبق |

*يستطيع SWC إزالة أنواع TypeScript لكنه لا يفحص الأنواع. ستظل بحاجة إلى `tsc --noEmit` لذلك.

> **ملاحظة**
>
> ستختلف النتائج لديك حسب حجم المشروع وتعقيده والعتاد. تميل المشاريع الأكبر إلى تحسينات أكثر جذرية.

## ميزات SWC المتقدمة لـ React

### تحويلات استيراد مخصصة

من الميزات القاتلة قدرة SWC على تحويل الاستيرادات، على غرار `babel-plugin-import`. هذا مفيد خاصةً لهزّ الأشجار (tree-shaking) لمكتبات واجهة كبيرة:

```json
{
  "jsc": {
    "experimental": {
      "plugins": [
        [
          "@swc/plugin-transform-imports",
          {
            "lodash": {
              "transform": "lodash/{{member}}",
              "preventFullImport": true
            },
            "@mui/material": {
              "transform": "@mui/material/{{member}}",
              "preventFullImport": true
            }
          }
        ]
      ]
    }
  }
}
```

يحوّل هذا:

```typescript
// ❌ This imports the entire library
import { Button, TextField } from '@mui/material';

// ✅ SWC transforms it to this
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
```

### توليد خرائط المصدر

يولّد SWC خرائط مصدر سريعة ودقيقة معًا. للتطوير، قد ترغب في خرائط مصدر مضمّنة:

```json
{
  "sourceMaps": "inline",
  "inlineSourcesContent": true
}
```

أما للإنتاج، فخرائط المصدر الخارجية أفضل عادةً:

```json
{
  "sourceMaps": true,
  "sourceFileName": "index.js",
  "sourceRoot": "/src"
}
```

### التصغير باستخدام SWC

يتضمن SWC مُصغّرًا مدمجًا أسرع من Terser وينتج مخرجات مضغوطة بالمثل:

```json
{
  "minify": true,
  "jsc": {
    "minify": {
      "compress": {
        "unused": true,
        "dead_code": true,
        "drop_console": true,
        "drop_debugger": true,
        "pure_funcs": ["console.log", "console.info"]
      },
      "mangle": {
        "keepClassName": false,
        "keepFnName": false,
        "keepPrivateProps": false,
        "reserved": []
      }
    }
  }
}
```

## أمثلة تكامل واقعية

### Next.js مع SWC

يستخدم Next.js 12+ SWC افتراضيًا، لكن يمكنك تخصيصه:

```javascript
// next.config.js
module.exports = {
  experimental: {
    swcMinify: true, // Use SWC for minification
  },
  swcMinify: true,
  compiler: {
    // React strict mode
    reactStrictMode: true,

    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',

    // Custom JSX import source
    emotion: {
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: '[local]',
      cssPropOptimization: true,
    },
  },
};
```

### Vite مع SWC

يستطيع Vite استخدام SWC بدلًا من esbuild للتحويلات:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  esbuild: false, // Disable esbuild to use SWC
});
```

### إعداد Webpack + SWC مخصص

لإعداد webpack من الصفر محسّن لـ React:

```javascript
// webpack.config.js
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: !isProduction,
                    refresh: !isProduction,
                  },
                },
                target: isProduction ? 'es2015' : 'es2022',
              },
              module: {
                type: 'es6',
              },
              minify: isProduction,
              sourceMaps: true,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  };
};
```

## المزالق والمقايضات الشائعة

### فحص أنواع TypeScript

SWC سريع للغاية في إزالة أنواع TypeScript، لكنه لا يفحصها فعليًا. ستحتاج إلى تشغيل `tsc --noEmit` منفصلًا:

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "build": "npm run type-check && swc src -d dist"
  }
}
```

> **تحذير**
>
> لا تتخطَّ فحص الأنواع كليًا — فأخطاء وقت التشغيل الناتجة عن مشكلات الأنواع أصعب بكثير في التنقيح من أخطاء وقت التجميع.

### منظومة الإضافات

لدى Babel منظومة إضافات ضخمة لا يضاهيها SWC بالكامل بعد. قد لا تكون لبعض التحويلات المحددة التي تعتمد عليها مكافئات في SWC. ومع ذلك، فإن التحويلات الأساسية (JSX وTypeScript وES6+) متينة.

### تحليل الحزم

تعمل أدوات مثل `webpack-bundle-analyzer` بشكل رائع مع شيفرة مجمّعة بـ SWC، لكن تأكد من تفعيل خرائط المصدر لتحليل دقيق:

```bash
npm install -D webpack-bundle-analyzer
```

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};
```

### استخدام الذاكرة

يستخدم SWC ذاكرة أقل من Babel عمومًا، لكن المشاريع الكبيرة جدًا قد تصل إلى حدود الذاكرة. يمكنك ضبط عدد العمّال:

```json
{
  "jsc": {
    "experimental": {
      "cacheRoot": ".swc"
    }
  }
}
```

## استراتيجية الانتقال

### الانتقال التدريجي من Babel

لا يلزمك تبديل كل شيء دفعة واحدة. إليك مقاربة عملية:

1. **ابدأ ببنيات التطوير**: استخدم SWC لتسريع بدء خادم التطوير
2. **اختبر بدقّة**: تأكد من عمل تطبيقك بالطريقة نفسها مع SWC
3. **بدّل بنيات الإنتاج**: عندما تثق، استخدم SWC للإنتاج
4. **راقب أحجام الحزم**: تحقق من أن التصغير ينتج نتائج مماثلة

### اختبار انتقالك

أنشئ اختبارًا بسيطًا للتحقق من عمل إعداد SWC لديك:

```typescript
// test-swc.ts
import React from 'react';

interface Props {
  name: string;
  count?: number;
}

const TestComponent: React.FC<Props> = ({ name, count = 0 }) => {
  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Count: {count}</p>
    </div>
  );
};

export default TestComponent;
```

جمّعه باستخدام SWC:

```bash
npx swc test-swc.ts -o test-swc.js
```

يجب أن تكون المخرجات JavaScript نظيفة ومحوّلة على نحو سليم.

## متى لا تستخدم SWC

رغم أن SWC ممتاز لمعظم مشاريع React، ثمة سيناريوهات قد يكون فيها البقاء على Babel منطقيًا:

- **اعتماديات إضافات كثيفة**: إن كان بناؤك يعتمد على إضافات Babel محددة لا مكافئات لها في SWC
- **ميزات JavaScript تجريبية**: يدعم Babel أحيانًا مقترحات متقدمة قبل SWC
- **قيود مشاريع قديمة**: إن كنت في إعداد monorepo معقد يتطلب تغيير أداة البناء تنسيقًا واسعًا

## الخطوات التالية
