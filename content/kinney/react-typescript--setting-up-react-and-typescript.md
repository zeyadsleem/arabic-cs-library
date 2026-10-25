---
title: "تهيئة React و TypeScript"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/setting-up-react-and-typescript"
---

بناء تطبيقات React الحديثة مع TypeScript لا يقتصر على إضافة بعض تعليقات الأنواع والأمل أن ينجح الأمر. إنه عن تهيئة أساس يساعدك على التقاط الأخطاء قبل أن تصل إلى الإنتاج، ويوفّر تجربة تطوير ممتازة، ويتوسّع بسلاسة مع نمو فريقك ومستودعك الشيفري. يجلب React 19 بعض التحسينات المثيرة في طريقة كتابة المكوّنات، وعند اقترانه بآخر ميزات TypeScript تحصل على تجربة تطوير قوية وممتعة في آن واحد.

في هذا الدليل، سنبني مشروع React 19 + TypeScript من الصفر، مغطّين كل شيء من ضبط `tsconfig.json` إلى أنماط المكوّنات التي ستجعلك تشكر نفسك لاحقًا.

## تهيئة بيئة التطوير

قبل أن نغوص في الأمور الممتعة، لنتأكّد من أن الأدوات الصحيحة مثبّتة. ستحتاج إلى Node.js 18 أو أحدث — هذا ما يتطلبه React 19 — وإلى مدير الحزم المفضّل لديك. سأستخدم `npm` في الأمثلة، لكنك حرّ أن تستبدل به `yarn` أو `pnpm` أو `bun`.

> **يمكنك استخدام قالب Vite لتُسهّل الأمر على نفسك.**
>
> جرّب `npm create vite@latest` واتّبع التعليمات إن أردت أن تُسهّل الأمر على نفسك.

لكن لنفترض أننا أردنا أن نفعل ذلك يدويًا.

```bash
# Create a new project directory
mkdir your-project-here
cd your-project-here

# Initialize package.json
npm init -y
```

الآن لنثبّت React 19 و TypeScript. لاحظ أن React 19 لا يزال في نسخة تجريبية (beta)، لذا سنحتاج إلى تثبيت النسخ التجريبية:

```bash
# Install React
npm install react react-dom

# Install TypeScript and related dev dependencies
npm install -D typescript @types/react @types/react-dom @types/node

# Install build tools (we'll use Vite for this example)
npm install -D vite @vitejs/plugin-react
```

## ضبط TypeScript لـ React

ملف `tsconfig.json` هو موضع السحر. يُدخل React 19 بعض التغييرات التي تؤثر في كيفية ضبط TypeScript، ولا سيما حول بيئة تشغيل JSX الجديدة وفحص الأنواع المحسّن.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": true,
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
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    // React 19 specific improvements
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

اسمح لي أن أُفصّل الأجزاء الخاصة بـ React 19:

- **`jsx: "react-jsx"`**: يستخدم تحويل JSX الجديد — لا حاجة إلى `import React from 'react'` في كل ملف!
- **`exactOptionalPropertyTypes: true`**: يمنع تمرير `undefined` عن طريق الخطأ إلى الخصائص الاختيارية.
- **`noUncheckedIndexedAccess: true`**: يفرض عليك التعامل مع قيم `undefined` المحتملة عند الوصول إلى المصفوفات أو الكائنات بمفاتيح ديناميكية.

> **نصيحة**
>
> إعداد `exactOptionalPropertyTypes` مفيد خصوصًا مع خصائص React. فهو يضمن أن إن كانت الخاصية اختيارية، لا يمكنك تمرير `undefined` إليها عن طريق الخطأ — عليك إمّا تمرير قيمة حقيقية أو حذفها تمامًا.

## ESLint: طبقة إضافية من الحماية

 يمكننا أيضًا ضبط [ESLint](https://eslint.org/) ليضيف فحوصًا إضافية على شيفرتنا. استخدام ESLint مع TypeScript يتطلب بعض التعديلات الإضافية التي يُحتمل أن تستحق الحديث عنها. لكن أولًا — لنثبّت بعض الاعتماديات.

```bash
npm install -D eslint @eslint/js @types/eslint__js typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

حسنًا، إليك قالبًا معقولًا يمكنك نسخه ولصقه.

```javascript
import js from '@eslint/js'; // ESLint's core recommended JavaScript rules
import globals from 'globals'; // Provides global variable definitions for different environments
import typescript from 'typescript-eslint'; // TypeScript ESLint parser and rules
import react from 'eslint-plugin-react'; // React-specific linting rules
import reactHooks from 'eslint-plugin-react-hooks'; // Rules for React Hooks usage
import reactRefresh from 'eslint-plugin-react-refresh'; // React Fast Refresh validation

/** @type {import('eslint').Linter.Config[]} */ // TypeScript type annotation for config array
export default [
  js.configs.recommended, // Enable ESLint's recommended JavaScript rules
  ...typescript.configs.strict, // Apply TypeScript's strict ruleset (includes recommended + type-checked rules)
  {
    files: ['**/*.{ts,tsx}'], // Apply this config to TypeScript and TSX files only
    languageOptions: {
      globals: {
        ...globals.browser, // Include browser global variables (window, document, etc.)
        ...globals.es2020, // Include ES2020 global features (Promise, BigInt, etc.)
      },
      parserOptions: {
        project: true, // Enable TypeScript project for type-aware linting
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Treat files as ES modules
      },
    },
    settings: {
      react: { version: 'detect' }, // Auto-detect React version for appropriate rules
    },
    plugins: {
      react, // Register React plugin
      'react-hooks': reactHooks, // Register React Hooks plugin
      'react-refresh': reactRefresh, // Register React Refresh plugin
    },
    rules: {
      ...react.configs.recommended.rules, // Apply React's recommended rules
      ...react.configs['jsx-runtime'].rules, // Rules for new JSX transform (no React import needed)
      ...reactHooks.configs.recommended.rules, // Apply React Hooks rules (deps, exhaustive-deps)

      // React Refresh
      'react-refresh/only-export-components': [
        // Warn when files export non-components (breaks Fast Refresh)
        'warn',
        {
          allowConstantExport: true, // Allow exporting constants alongside components
        },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        // Error on unused variables
        'error',
        {
          argsIgnorePattern: '^_', // Ignore unused args starting with underscore
          varsIgnorePattern: '^_', // Ignore unused vars starting with underscore
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off', // Don't require return types on functions
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Don't require types on module boundaries
      '@typescript-eslint/no-explicit-any': 'error', // Disallow 'any' type usage

      'react/prop-types': 'off', // TypeScript handles this
    },
  },
  {
    files: ['**/*.js'], // Apply to plain JavaScript files
    ...typescript.configs.disableTypeChecked, // Disable TS rules for JS files
  },
  {
    ignores: ['dist', 'build', 'node_modules', 'coverage', '*.min.js'], // Skip linting these paths/patterns
  },
];
```

لنشرح كلًا من هذه.

### `eslint-plugin-react`

**الغرض:** قواعد React الأساسية للفحص الخاص بـ JSX والأنماط الخاصة بـ React.

**ما الذي يلتقطه:**

- خصائص `key` المفقودة في القوائم
- أنواع خصائص غير صحيحة
- حالة وخصائص غير مستخدمة
- تعديلات مباشرة على الحالة
- مشكلات إمكانية الوصول في JSX
- مخالفات لأفضل ممارسات React

```javascript
// Basic setup
rules: {
  ...react.configs.recommended.rules,
  ...react.configs['jsx-runtime'].rules, // For React 17+ JSX transform
}

// Popular custom rules
rules: {
  // Component and prop naming
  'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
  'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

  // Props and state
  'react/prop-types': 'off', // Turn off if using TypeScript
  'react/require-default-props': 'off', // Often disabled with TypeScript
  'react/destructuring-assignment': ['error', 'always'],
  'react/no-unused-prop-types': 'error',
  'react/no-unused-state': 'error',

  // JSX formatting
  'react/jsx-indent': ['error', 2],
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
  'react/jsx-first-prop-new-line': ['error', 'multiline'],
  'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

  // Security and performance
  'react/no-danger': 'warn',
  'react/no-array-index-key': 'warn',
  'react/jsx-no-target-blank': ['error', { enforceSynamicLinks: 'always' }],
}
```

### `eslint-plugin-react-hooks`

**الغرض:** يفرض قواعد الخُطّافات (Rules of Hooks) — قواعد React الحرجة لاستخدام الخُطّافات بشكل صحيح.

**ما الذي يلتقطه:**

- خُطّافات تُستدعى بشكل شرطي (يخالف قواعد الخُطّافات)
- اعتماديات مفقودة في `useEffect` و`useMemo` و`useCallback`
- خُطّافات تُستدعى خارج المكوّنات أو الخُطّافات المخصّصة
- خُطّافات مخصّصة لا تبدأ بـ «use»

**الإعدادات الشائعة:**

```javascript
// Standard (recommended for most projects)
rules: {
  ...reactHooks.configs.recommended.rules,
  // This expands to:
  'react-hooks/rules-of-hooks': 'error', // Checks rules of hooks
  'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
}

// Stricter configuration
rules: {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error', // Error instead of warning
}

// More lenient (not recommended)
rules: {
  'react-hooks/rules-of-hooks': 'error', // Never disable this!
  'react-hooks/exhaustive-deps': ['warn', {
    additionalHooks: '(useMyCustomEffect|useAsync)', // Check custom hooks
    enableDangerousAutofixThisMayCauseInfiniteLoops: false, // Disable autofix
  }],
}
```

**أنماط شائعة يستخدمها الناس:**

```javascript
// Some teams disable exhaustive-deps for specific cases
'react-hooks/exhaustive-deps': ['warn', {
  additionalHooks: 'useUpdateEffect|useIsomorphicLayoutEffect',
}]

// NEVER do this (but some people unfortunately do):
// 'react-hooks/exhaustive-deps': 'off' // ❌ Bad idea!
```

### `eslint-plugin-react-refresh`

**الغرض:** يضمن توافق المكوّنات مع React Fast Refresh (إعادة التحميل الساخن في Vite).

**ما الذي يلتقطه:**

- مكوّنات مصدَّرة إلى جانب تصديرات ليست مكوّنات
- تصديرات افتراضية مجهولة الاسم تكسر Fast Refresh
- مكوّنات صنفية (لا تعمل جيدًا مع Fast Refresh)

**الإعدادات الشائعة:**

```javascript
// Basic setup (most common)
rules: {
  'react-refresh/only-export-components': ['warn', {
    allowConstantExport: true // Allow const exports alongside components
  }],
}

// Stricter version
rules: {
  'react-refresh/only-export-components': ['error', {
    allowConstantExport: false // Only allow component exports
  }],
}

// More permissive
rules: {
  'react-refresh/only-export-components': ['warn', {
    allowConstantExport: true,
    allowExportNames: ['meta', 'links', 'handle', 'loader'], // For frameworks like Remix
  }],
}
```

## Prettier: تنسيق الشيفرة المتسق

بينما يتولّى ESLint جودة الشيفرة، يتولّى Prettier التنسيق. يعملان معًا بشكل ممتاز عند ضبطهما بشكل صحيح.

### التثبيت

```bash
npm install -D prettier eslint-config-prettier
```

### ضبط Prettier

أنشئ ملف `.prettierrc.json`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

وملف `.prettierignore`:

```
node_modules
dist
build
coverage
*.min.js
```

### التكامل مع ESLint

لتجنّب التعارضات بين ESLint و Prettier، أضف `eslint-config-prettier` إلى ضبط ESLint الخاص بك. هذا يعطّل قواعد ESLint التي تتعارض مع تنسيق Prettier.

## سكربتات الحزمة

أضف هذه السكربتات إلى ملف `package.json` الخاص بك لتحصل على سير عمل تطوير سلس:

```json
{
  "scripts": {
    // Development
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",

    // Type checking
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",

    // Linting and formatting
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",

    // Combined checks (useful for CI/pre-commit)
    "check-all": "npm run type-check && npm run lint && npm run format:check",
    "fix-all": "npm run lint:fix && npm run format"
  }
}
```

### سير عمل التطوير

أثناء التطوير، شغّل هذه في طرفيات منفصلة للحصول على أفضل تجربة:

```bash
# Terminal 1: Dev server with hot reload
npm run dev

# Terminal 2: Type checking in watch mode
npm run type-check:watch
```

قبل الإيداع:

```bash
# Check everything
npm run check-all

# Or auto-fix what's possible
npm run fix-all
```

## أمثلة إعدادات من العالم الحقيقي

### الإعداد الصارم (المؤسسات والفرق الكبيرة)

```javascript
rules: {
  // React
  ...react.configs.recommended.rules,
  'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce'] }],
  'react/jsx-handler-names': ['error', {
    eventHandlerPrefix: 'handle',
    eventHandlerPropPrefix: 'on',
  }],
  'react/hook-use-state': 'error',
  'react/no-unstable-nested-components': 'error',

  // Hooks
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error',

  // Fast Refresh
  'react-refresh/only-export-components': 'error',
}
```

### الإعداد المتوازن (أغلب المشاريع)

```javascript
rules: {
  ...react.configs.recommended.rules,
  ...react.configs['jsx-runtime'].rules,
  ...reactHooks.configs.recommended.rules,
  'react/prop-types': 'off', // Using TypeScript
  'react/display-name': 'off', // Often too noisy
  'react-refresh/only-export-components': ['warn', {
    allowConstantExport: true
  }],
}
```

### الإعداد الأدنى (النماذج الأولية والمشاريع الصغيرة)

```javascript
rules: {
  'react/jsx-key': 'error', // Critical for React
  'react-hooks/rules-of-hooks': 'error', // Critical for hooks
  'react-hooks/exhaustive-deps': 'warn', // Helpful but not blocking
  'react-refresh/only-export-components': 'warn', // Nice for DX
}
```

## الأخطاء الشائعة

1. **لا تعطّل `rules-of-hooks`**: قد يسبّب هذا سلوكًا غير متوقّع لـ React.
2. **كن حذرًا مع `exhaustive-deps`**: إنه مزعج لكنه *عادةً* صحيح.
3. **`react-refresh` خاص بـ Vite**: لست بحاجة إليه مع Create React App أو Next.js
4. **يجعل TypeScript كثيرًا من قواعد React زائدة عن الحاجة**: يمكنك تعطيل القواعد المرتبطة بـ `prop-types`
5. **بعض القواعد تتعارض مع Prettier** - عطّل قواعد التنسيق إن كنت تستخدم Prettier.

> **أعددت قائمة بكل القواعد «الموصى بها» وما الذي تفعله.**
>
> يمكنك الاطّلاع على تلك القائمة [هنا](https://stevekinney.com/courses/react-typescript/typescript-react-eslint-rules).

## سكربتات `package,json`

أضف هذه السكربتات إلى ملف `package.json` الخاص بك:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## بعض أفضل الممارسات الأخرى

لفحص أنواع أكثر صرامة، فعّل القواعد المدركة للأنواع بإضافة ضبط المشروع:

إن كنت تستخدم Bun أو Deno، يمكنك استخدام `import.meta.env`. لكن إن كنت تستخدم Node، فستحتاج إلى إنشاء بديلك (polyfill) الخاص.

```javascript
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

```javascript
parserOptions: {
  project: './tsconfig.json',
  tsconfigRootDir: __dirname,
}
```

ومرة أخرى، في Deno أو Bun يمكنك فعل ما يلي بدلًا من ذلك:

```javascript
parserOptions: {
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
}
```

ثم استخدم `typescript.configs.recommendedTypeChecked` بدلًا من `recommended` فقط.

**2. قواعد مخصّصة لفريقك** أضف قواعد خاصة بالمشروع بناءً على أعراف فريقك:

```javascript
rules: {
  'react/prop-types': 'off', // TypeScript handles this
  'react/react-in-jsx-scope': 'off', // Not needed with React 17+
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prefer-const': 'error',
}
```

## اختياري: تهيئة Visual Studio Code و/أو Cursor

إن كنت تستخدم Visual Studio Code أو Cursor، فقد ترغب في تثبيت [امتداد ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```

## اختياري: تهيئة خطّافات ما قبل الإيداع

استخدم Husky و lint-staged لفرض الفحص قبل الإيداعات:

```bash
npm install -D husky lint-staged
npx husky init
```

أضف إلى `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "git add"]
  }
}
```
