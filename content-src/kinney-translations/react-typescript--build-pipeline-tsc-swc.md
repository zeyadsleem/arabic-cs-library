---
title: "خط بناء حديث: tsc و SWC"
---

تطوّرت أدوات البناء الحديثة في TypeScript إلى ما هو أبعد من نهج «استخدم `tsc` لكل شيء». فأحدث إعدادات التطوير اليوم تفصل بين فحص الأنواع والترجمة (transpilation)، مستخدمةً أدوات متخصّصة لكل مهمة. لنتعرّف على كيفية بناء خط بناء متين باستخدام مُصرِّف TypeScript (`tsc`)، والمُترجِم فائق السرعة SWC، وخادم التطوير الخاص بـ Vite — ونفهم متى تستخدم كل أداة.

على الأرجح أنت هنا لأن عمليات البناء لديك بطيئة، أو لأن التكامل المستمر (CI) ينتهي بمهلة زمنية، أو لأنك تتساءل لماذا يُصرّ الجميع على الحديث عن SWC و esbuild. والإجابة المختصرة: مُصرِّف TypeScript الرسمي شامل لكنه بطيء، بينما تركّز الأدوات الأحدث على السرعة عبر العمل أقل. والمفتاح هو معرفة كيف تدمجها بفاعلية.

## مشهد البناء الحديث

في الأيام الأولى لـ TypeScript، لم يكن أمامك خيار سوى `tsc` لفحص الأنواع والترجمة معًا. كان يعمل بشكل جيّد للمشاريع الأصغر، لكن مع نمو قواعد الشيفرة أصبحت أزمنة البناء مؤلمة. تحلّ الأدوات الحديثة هذا الأمر بالتخصّص:

- **مدقّقو الأنواع** (مثل `tsc`) يركّزون على الصحة ويولّدون ملفات `.d.ts`
- **المترجمون** (مثل SWC و esbuild و Babel) يركّزون على السرعة وإخراج JavaScript
- **حازم الحزم** (مثل Vite و Webpack) ينسّقون كل شيء ويتولّون خوادم التطوير

يتيح لك هذا الفصل ملاحظات سريعة أثناء التطوير مع الحفاظ على أمان الأنواع.

## فهم الأطراف المشاركة

### مُصرِّف TypeScript (tsc)

الخيار الأصلي والأكثر شمولًا. حين تُشغّل `tsc` فإنّه:

- **يفحص أنواع** قاعدة شيفرتك بالكامل
- **يترجم** TypeScript إلى JavaScript
- **يولّد** ملفات التصريح (`.d.ts`)
- **يتعامل** مع ميزات TypeScript المعقّدة مثل المزخرفات (decorators) ودوالّ الإخراج المساعدة

```bash
# Traditional approach - does everything
tsc --build
```

**المزايا**: دعم كامل لـ TypeScript، ويولّد ملفات التصريح، ويتعامل مع السيناريوهات المعقّدة. **العيوب**: أبطأ مع القواعد الشيفرة الكبيرة، وفحص الأنواع أحادي الخيط.

### SWC (Speedy Web Compiler)

مكتوب بلغة Rust، يركّز SWC حصريًا على الترجمة السريعة:

```bash
# Install SWC
pnpm add -D @swc/cli @swc/core
```

يحوّل SWC نوع TypeScript إلى JavaScript دون فحص الأنواع — فهو ببساطة يزيل الأنواع ويحوّل الصياغة. وهذا يجعله أسرع بكثير من `tsc` في الترجمة.

**المزايا**: سريع للغاية، ودعمه لـ TypeScript جيّد، ويتعامل مع JSX جيّدًا. **العيوب**: لا يفحص الأنواع، ولا يولّد ملفات التصريح، وأداة أحدث ذات منظومة متطوّرة باستمرار.

### Vite

أداة بناء تستخدم esbuild (فلسفة مشابهة لـ SWC) أثناء التطوير و Rollup لعمليات بناء الإنتاج:

```bash
# Vite with TypeScript support
pnpm create vite my-app --template react-ts
```

**المزايا**: خادم تطوير سريع، وتجربة مطوّر ممتازة، ويتعامل مع معظم سيناريوهات TypeScript. **العيوب**: الإعدادات المعقّدة قد تكون محيِّرة، و esbuild له بعض القيود في TypeScript.

## إعداد خط بناء هجين

تتمثّل الاستراتيجية الفائزة في الجمع بين هذه الأدوات: استخدم المترجمين السريعين لسرعة التطوير، و `tsc` لفحص الأنواع وتوليد ملفات التصريح. إليك كيفية إعداد ذلك:

### بنية المشروع

```
my-app/
├── src/
│   ├── components/
│   └── index.ts
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts
├── .swcrc
└── package.json
```

### ضبط TypeScript

أولًا، أنشئ ملف `tsconfig.json` أساسيًا لمحرّر IDE ولفحص الأنواع:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true, // ✅ We're not using tsc for transpilation
    "declaration": false,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

أمّا المكتبات التي تحتاج إلى ملفات تصريح، فأنشئ لها `tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false, // ✅ Generate output
    "declaration": true, // ✅ Generate .d.ts files
    "declarationMap": true,
    "outDir": "dist/types",
    "emitDeclarationOnly": true // ✅ Only emit declarations, not JS
  },
  "exclude": ["**/*.test.*", "**/*.spec.*", "dist", "node_modules"]
}
```

### ضبط Vite

اضبط Vite من أجل تطوير فائق السرعة:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // ✅ Uses SWC for even faster builds

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // For production builds, Vite uses Rollup
    target: 'es2020',
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom'], // For library builds
    },
  },
});
```

### ضبط SWC (اختياري)

إن أردت استخدام SWC مباشرةً في البناء، فأنشئ ملف `.swcrc`:

```json
{
  "jsc": {
    "target": "es2020",
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "development": false
      }
    }
  },
  "module": {
    "type": "es6"
  }
}
```

### سكربتات package.json

هنا تجتمع كل القطع معًا:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run type-check && vite build",
    "build:lib": "npm run type-check && swc src -d dist/lib && tsc -p tsconfig.build.json",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "lint": "eslint src --ext ts,tsx",
    "test": "vitest"
  }
}
```

لنشرح ما يفعله كل سكربت:

- `dev`: خادم تطوير Vite مع ترجمة SWC (دون فحص الأنواع)
- `build`: يفحص الأنواع أولًا، ثم ينفّذ بناء Vite للإنتاج
- `build:lib`: للمكتبات — يفحص الأنواع، ثم يترجم بـ SWC، ثم يولّد ملفات التصريح
- `type-check`: يشغّل مُصرِّف TypeScript في وضع الفحص فقط
- `type-check:watch`: فحص مستمر للأنواع أثناء التطوير

## سير عمل التطوير

### حلقة تطوير سريعة

أثناء التطوير النشط، تريد أسرع ملاحظات ممكنة:

```bash
# Terminal 1: Fast dev server (no type checking)
pnpm dev

# Terminal 2: Continuous type checking
pnpm type-check:watch
```

يمنحك هذا الإعداد:

- **استبدال الوحدات في أقل من ثانية**
- **أخطاء أنواع فورية** في طرفية منفصلة
- **ملاحظات فورية** على تغييرات الشيفرة

### فحوص ما قبل الإيداع

قبل الإيداع، شغّل التحقّق الكامل:

```bash
# Quick pre-commit script
pnpm type-check && pnpm lint && pnpm test
```

فكّر في استخدام [Husky](https://typicode.github.io/husky/) لأتمتة ذلك.

## خط التكامل المستمر والنشر (CI/CD)

ينبغي أن يكون التكامل المستمر لديك شاملًا وفعّالًا في الوقت نفسه:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm type-check # Full type checking
      - run: pnpm lint # Code quality
      - run: pnpm test # Unit tests
      - run: pnpm build # Production build test
```

> **نصيحة**
>
> شغّل فحص الأنواع مبكرًا في خط CI — فهو غالبًا يكشف المشكلات أسرع من انتظار بناءٍ كامل.

## أنماط من العالم الحقيقي

### تطوير المكتبات

حين تبني مكتبات، فأنت بحاجة إلى سرعة التطوير وإلى مخرجات سليمة في الوقت نفسه:

```json
{
  "scripts": {
    "dev": "vite build --mode development --watch",
    "build": "npm run clean && npm run type-check && npm run build:lib && npm run build:types",
    "build:lib": "swc src -d dist --source-maps",
    "build:types": "tsc -p tsconfig.build.json",
    "clean": "rm -rf dist"
  }
}
```

هذا النمط:

1. يستخدم SWC لإخراج JavaScript سريع
2. يستخدم `tsc` فقط لملفات التصريح
3. يوفّر خرائط المصدر (source maps) لأغراض التصحيح
4. يفصل المسؤوليات فصلًا نظيفًا

### إعداد المستودع الأحادي (Monorepo)

في المستودعات الأحادية، يتألّق النهج الهجين:

```json
{
  "scripts": {
    "dev": "concurrently \"pnpm:dev:*\"",
    "dev:vite": "vite",
    "dev:types": "tsc --build --watch",
    "build": "pnpm type-check && pnpm build:all",
    "build:all": "pnpm --recursive build",
    "type-check": "tsc --build"
  }
}
```

استخدم مراجع مشاريع TypeScript (project references) من أجل فحص أنواع فعّال عبر الحزم:

```json
// tsconfig.json (root)
{
  "references": [
    { "path": "./packages/ui" },
    { "path": "./packages/utils" },
    { "path": "./apps/web" }
  ]
}
```

## مقارنة الأداء

إليك ما يمكنك توقّعه في تطبيق React متوسّط الحجم (~100 مكوّن):

| تركيبة الأدوات | خادم التطوير | فحص الأنواع | البناء الكامل |
| --- | --- | --- | --- |
| tsc فقط | ~8s | ~12s | ~25s |
| Vite + فحص tsc | ~1s | ~12s | ~8s |
| SWC + فحص tsc | ~0.5s | ~12s | ~6s |

الفكرة الأساسية: فصل المسؤوليات يمنحك أفضل ما في العالمين — تكرار سريع، وفحص شامل.

## استكشاف المشكلات الشائعة وإصلاحها

### قيود SWC و esbuild

بعض ميزات TypeScript غير مدعومة في المترجمين السريعين:

```typescript
// ❌ Not supported by esbuild/SWC
const enum Colors {
  Red = 'red',
  Blue = 'blue',
}

// ✅ Use regular enums or const assertions instead
const Colors = {
  Red: 'red',
  Blue: 'blue',
} as const;
```

### مشكلات المزخرفات (Decorators)

إن كنت تستخدم المزخرفات (مثلًا مع مكوّنات React الصنفية أو MobX):

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

وتأكّد من أن مترجِمك يدعمها:

```json
// .swcrc
{
  "jsc": {
    "parser": {
      "decorators": true
    }
  }
}
```

### حالات حدّية في الاستيراد والتصدير

قد تحتاج بعض أنماط الاستيراد المعقّدة إلى تعديل:

```typescript
// ❌ Might cause issues with some transpilers
export { default as Button } from './Button';

// ✅ More explicit, always works
export { Button as default } from './Button';
```

## اختيار إعدادك

إليك مصفوفة قرار للسيناريوهات الشائعة:

**المشاريع الصغيرة (أقل من 50 ملفًا)**

- التزم بـ `tsc` من أجل البساطة
- أو استخدم Vite إن أردت خادم تطوير سريعًا

**المشاريع المتوسطة (50-500 ملفًا)**

- Vite مع `tsc --noEmit` لفحص الأنواع
- فكّر في SWC إن كانت في esbuild الخاص بـ Vite قيود

**المشاريع الكبيرة (أكثر من 500 ملف)**

- افصل الترجمة عن فحص الأنواع حتمًا
- استخدم SWC أو esbuild للترجمة
- فكّر في مراجع مشاريع TypeScript
- استثمر في تخزين مؤقت (caching) مناسب لخط CI

**المكتبات**

- استخدم `tsc` دائمًا لتوليد ملفات التصريح
- استخدم المترجمين السريعين لإخراج JavaScript
- اختبر مع عدّة إصدارات من TypeScript

## الخطوات التالية

حين يتوفّر لديك خط بناء متين:

1. **أضف خطّافات ما قبل الإيداع** (pre-commit hooks) باستخدام Husky لتحديد بوابات الجودة
2. **اضبط التخزين المؤقت في CI** لتسريع عمليات البناء
3. **راقب حجم الحزمة** (bundle size) بأدوات مثل [bundlemon](https://bundlemon.dev/)
4. **فكّر في الفحص المتوازي للأنواع** عبر مراجع مشاريع TypeScript
5. **جرّب أدوات أحدث** مثل Turbopack أو rspack

يتطوّر مشهد أدوات البناء بسرعة، لكنّ المبادئ تبقى: افصل المسؤوليات، وحسّن للحالة الشائعة (التطوير)، ولا تُضحّي بالصواب من أجل السرعة في الإنتاج.

ينبغي أن يبدو خط البناء لديك غير مرئي أثناء التطوير، ومنيعًا في الإنتاج. ومع النهج الهجين الذي يستخدم أدوات متخصّصة لمهام متخصّصة، تستطيع تحقيق الأمرين معًا.
