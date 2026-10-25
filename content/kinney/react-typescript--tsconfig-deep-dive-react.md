---
title: "غوص أعمق في tsconfig.json"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/tsconfig-deep-dive-react"
---

كما رأينا في [القسم السابق](https://stevekinney.com/courses/react-typescript/setting-up-react-and-typescript)، فإن ملف `tsconfig.json` هو مركز القيادة لـ TypeScript في مشروعك. وهو يخبر TypeScript:

- كيف يُترجم شيفرتك — أو في حالة React — كيف يفحص أنواعها.
- أي الملفات يجب تضمينها أو استبعادها.
- مدى صرامة فحص الأنواع.
- كيف يحلّ الوحدات والمسارات.

في مشروع React + Vite، لا يترجم TypeScript شيفرتك فعليًا — بل يتولّى ذلك Vite. وبدلًا من ذلك، يوفّر TypeScript فحص الأنواع فقط. ولهذا نستخدم `noEmit: true`.

## الضبط الكامل

لنبنِ ملف `tsconfig.json` الأمثل خطوة بخطوة:

```json
{
  "compilerOptions": {
    // Target and Library Settings
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,

    // JavaScript Support
    "allowJs": true,
    "checkJs": false,

    // Emit Configuration
    "noEmit": true,
    "sourceMap": true,
    "jsx": "react-jsx",

    // Type Checking - Strict Settings
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "exactOptionalPropertyTypes": false,
    "noFallthroughCasesInSwitch": true,

    // Type Checking - Code Quality
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,

    // Module Resolution
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "verbatimModuleSyntax": true,

    // Path Mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"]
    },

    // Performance
    "skipLibCheck": true,
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/.cache/typescript/tsconfig.tsbuildinfo",

    // Consistency
    "forceConsistentCasingInFileNames": true,

    // Environment Types
    "types": ["vite/client"]
  },
  "include": ["src/**/*", "vite.config.ts"],
  "exclude": ["node_modules", "dist", "build", "coverage"]
}
```

## ضبط الهدف والمكتبات

### `"target": "ES2022"`

**ما الذي يفعله:** يحدّد إصدار JavaScript الذي يترجم إليه TypeScript.

**لماذا ES2022؟**

- يشمل ميزات حديثة مثل `await` على المستوى الأعلى وحقول الأصناف وتابع `.at()`
- جميع المتصفحات الحديثة تدعم ES2022
- يتولّى Vite أي تحويل إضافي مطلوب للمتصفحات الأقدم

**البدائل:**

- `"ESNext"`: أحدث الميزات دائمًا (أقلّ قابلية للتنبّؤ)
- `"ES2020": أكثر تحفّظًا، لكنه يفوّت ميزات جميلة

### `"lib": ["DOM", "DOM.Iterable", "ES2022"]`

**ما الذي يفعله:** يخبر TypeScript بواجهات API المدمجة المتاحة.

**تفصيله:**

- `"DOM"`: واجهات المتصفح (document، window، HTMLElement)
- `"DOM.Iterable"`: يجعل مجموعات DOM قابلة للتكرار (حلقات for…of على NodeLists)
- `"ES2022"`: ميزات لغة JavaScript المطابقة لهدفنا

**يمكن إضافة:** `"WebWorker"` إذا كنت تستخدم web workers، و`"ES2022.Array"` لميزات محدّدة

### `"module": "ESNext"`

**ما الذي يفعله:** يحدّد نظام الوحدات للشيفرة الناتجة.

**لماذا ESNext؟** نستخدم وحدات ES الأصلية، ويتولّى Vite تحويل الوحدات فعليًا. وهذا يمنحنا:

- استيرادات ديناميكية
- `await` على المستوى الأعلى
- تأكيدات الاستيراد

### `"moduleResolution": "bundler"`

**ما الذي يفعله:** كيف يحلّ TypeScript عبارات الاستيراد.

**لماذا bundler؟** جديد في TS 5.0+، ومصمَّم لأدوات مثل Vite:

- يسمح بالاستيراد بلا امتدادات
- يدعم حقل `exports` في package.json
- أكثر تسامحًا من `"node16"` لكن أكثر أمانًا من `"node"` القديمة

**الخيار القديم:** `"node"` - لا يزال شائعًا لكنه أقل دقّة مع أدوات التجميع الحديثة

### `"allowImportingTsExtensions": true`

**ما الذي يفعله:** يتيح لك استيراد ملفات TypeScript بامتدادات صريحة.

**لماذا تفعّله؟** يسمح بالاستيرادات الصريحة التي تفضّلها بعض أدوات التجميع:

```typescript
// Now you can be explicit about imports
import { UserSchema } from './schemas/user.schema.ts';
import { Button } from '../components/Button.tsx';
```

وهذا ذو قيمة خاصة في المستودعات الأحادية حيث قد تكون مخرجات البناء مختلفة لكل حزمة

## دعم JavaScript

### `"allowJs": true`

**ما الذي يفعله:** يتيح لـ TypeScript معالجة ملفات JavaScript.

**لماذا تفعّله؟**

- ترحيل تدريجي من JS إلى TS
- شيفرة JS من طرف ثالث في مصدرك
- ملفات الضبط غالبًا بصيغة JS

### `"checkJs": false`

**ما الذي يفعله:** يفحص أنواع ملفات JavaScript.

**لماذا تعطّله؟**

- قد تكون ملفات JS بأنماط أرخى
- تجنّب الأخطاء في ملفات الضبط
- يمكنك تفعيله لكل ملف عبر `// @ts-check`

**🔒 خيار أكثر صرامة:** اضبطه على `true` لفحص أنواع كامل في ملفات JS

## ضبط الإخراج (Emit)

### `"noEmit": true`

**ما الذي يفعله:** يمنع TypeScript من توليد ملفات الإخراج.

**حاسم لـ React:** يتولّى Vite/esbuild عملية الترجمة، وTypeScript يفحص الأنواع فقط. وهذا يمنع:

- ازدواج ملفات الإخراج
- تعارضات الترجمة
- عمليات بناء أبطأ

### `"sourceMap": true`

**ما الذي يفعله:** يولّد خرائط المصدر (source maps) لأغراض التصحيح.

**لماذا تفعّله؟** تجربة تصحيح أفضل - ترى شيفرة TS الأصلية في أدوات مطوّر المتصفح

**ملاحظة:** لا يهم إلا إذا كان `noEmit: false`

### `"jsx": "react-jsx"`

**ما الذي يفعله:** كيف يُحوَّل JSX.

**الخيارات مشروحة:**

- `"react-jsx"`: التحويل الجديد (React 17+)، ولا حاجة إلى استيراد React
- `"react"`: القديم، ويتطلّب `import React from 'react'`
- `"preserve"`: يترك JSX دون تغيير (لتتولّاه أدوات أخرى)

## عائلة الصرامة

### `"strict": true`

**ما الذي يفعله:** يفعّل جميع خيارات فحص الأنواع الصارمة:

- `strictNullChecks`: يجب أن يكون null/undefined صريحًا
- `strictFunctionTypes`: توافق صارم للدوال
- `strictBindCallApply`: فحص أنواع .bind() و.call() و.apply()
- `strictPropertyInitialization`: يجب تهيئة خصائص الأصناف
- `noImplicitAny`: لا أنواع any ضمنية
- `noImplicitThis`: يجب أن يكون لـ ‘this’ نوع صريح
- `alwaysStrict`: إصدار “use strict”
- `useUnknownInCatchVariables`: متغيّرات بند catch من نوع ‘unknown’

**هذا غير قابل للتفاوض** في أي مشروع TypeScript جاد.

### `"noImplicitOverride": true`

**ما الذي يفعله:** يتطلّب كلمة المفتاح `override` عند تجاوز توابع الصنف الأساسي.

```typescript
// Without this flag - silent bugs possible
class Dog extends Animal {
  speak() {} // Did we mean to override? Typo?
}

// With flag - explicit intent
class Dog extends Animal {
  override speak() {} // Clear we're overriding
}
```

### `"noPropertyAccessFromIndexSignature": false`

**ما الذي يفعله:** عند تفعيله، يفرض استخدام صيغة الأقواس المربّعة لتوقيعات الفهرسة.

**لماذا نعطّله:**

```typescript
interface Config {
  [key: string]: string;
}
const config: Config = { name: 'app' };

// With flag true (stricter but annoying):
config['name']; // Required
config.name; // Error!

// With flag false (our choice):
config.name; // Allowed - better DX
```

**🔒 خيار أكثر صرامة:** فعّله لأنماط الوصول إلى الفهرس الصريحة

### `"exactOptionalPropertyTypes": false`

**ما الذي يفعله:** يميّز بين الخصائص غير المعرّفة (undefined) والخصائص الغائبة.

**لماذا نعطّله:**

```typescript
interface User {
  name?: string;
}

// With flag false (our choice):
const user: User = { name: undefined }; // Allowed

// With flag true (stricter):
const user: User = { name: undefined }; // Error!
```

معظم شيفرة React لا تميّز بين هاتين الحالتين، وتفعيله يسبّب احتكاكًا.

**🔒 خيار أكثر صرامة:** فعّله للتعامل الدقيق مع الخصائص الاختيارية

### `"noFallthroughCasesInSwitch": true`

**ما الذي يفعله:** يبلّغ عن أخطاء سقوط الحالات في عبارات switch.

```typescript
switch(action) {
  case 'save':
    save();
    // Error! Did you forget 'break'?
  case 'delete':
    delete();
}
```

## فحوص جودة الشيفرة

### `"noUnusedLocals": false` / `"noUnusedParameters": false`

**ما الذي يفعله:** يبلّغ عن أخطاء في المتغيّرات/المعاملات غير المستخدمة.

**لماذا نعطّلهما:**

- مُزعج أثناء التطوير
- يتولّى ESLint ذلك بشكل أفضل
- يمكنك البادئة بـ `_` للدلالة على عدم الاستخدام المقصود

**🔒 خيار أكثر صرامة:** فعّلهما معًا من أجل شيفرة أنظف

### `"noImplicitReturns": true`

**ما الذي يفعله:** يجب أن تُعيد جميع مسارات الشيفرة قيمة صراحةً.

```typescript
function calculate(n: number): number {
  if (n > 0) {
    return n * 2;
  }
  // Error! Missing return statement
}
```

### `"allowUnreachableCode": false`

**ما الذي يفعله:** يبلّغ عن أخطاء في الشيفرة التالية لعبارة return أو throw أو break.

```typescript
function example() {
  return 5;
  console.log('Never runs'); // Error!
}
```

## خيارات حلّ الوحدات

### `"esModuleInterop": true`

**ما الذي يفعله:** يصلح التشغيل البيني بين CommonJS ووحدات ES.

**يتيح:**

```typescript
// Without:
import * as React from 'react';

// With:
import React from 'react';
```

### `"allowSyntheticDefaultImports": true`

**ما الذي يفعله:** يتيح الاستيراد الافتراضي من وحدات ليس لها تصدير افتراضي.

**ملاحظة:** مفترَض ضمن `esModuleInterop`، لكن الصراحة أوضح.

### `"resolveJsonModule": true`

**ما الذي يفعله:** استيراد ملفات JSON كوحدات.

```typescript
import config from './config.json';
```

### `"isolatedModules": true`

**ما الذي يفعله:** يضمن أن كل ملف يمكن تحويله بشكل مستقل.

**حاسم لـ Vite/esbuild** التي تحوّل كل ملف على حدة. ويكتشف:

- ملفات بلا استيرادات أو تصديرات
- استيرادات من نوع type فقط غير موسومة بذلك

### `"moduleDetection": "force"`

**ما الذي يفعله:** يتعامل مع جميع الملفات كوحدات (لا كسكربتات).

**الفوائد:**

- لا متغيّرات عامة عشوائية
- تعامل متسق مع الملفات
- مطلوب لـ `await` على المستوى الأعلى

### `"verbatimModuleSyntax": true`

**ما الذي يفعله:** يتطلّب المُعدِّل `type` الصريح للاستيرادات من نوع type فقط.

```typescript
// Bad - ambiguous
import { User } from './types';

// Good - explicit
import type { User } from './types';
```

**لماذا؟** تستطيع أدوات التجميع إجراء tree-shaking بشكل أفضل، والنية أوضح.

## خرائط المسارات

### `"baseUrl": "."`

**ما الذي يفعله:** المجلد الأساسي للاستيرادات غير النسبية.

### `"paths"`

**ما الذي يفعله:** مسارات حلّ وحدات مخصّصة.

```typescript
// Instead of:
import Button from '../../../components/Button';

// You can:
import Button from '@components/Button';
```

**أفضل الممارسات:**

- أبقِ الأسماء المستعارة مركّزة وذات معنى
- طابق بنية مجلداتك
- لا تبالغ في ذلك (كثرة الأسماء المستعارة = ارتباك)

## الأداء

### `"skipLibCheck": true`

**ما الذي يفعله:** يتخطّى فحص أنواع ملفات التعريف (.d.ts).

**لماذا تفعّله؟**

- ترجمة أسرع
- تجنّب الأخطاء في أنواع الطرف الثالث
- لا يمكنك على أي حال إصلاح node_modules

**🔒 خيار أكثر صرامة:** عطّله لالتقاط كل مشكلات الأنواع

### `"incremental": true`

**ما الذي يفعله:** يحفظ معلومات الترجمة ليجعل عمليات البناء اللاحقة أسرع.

### `"tsBuildInfoFile"`

**ما الذي يفعله:** أين تُخزَّن معلومات الترجمة التزايدة.

**أفضل ممارسة:** استخدم node_modules/.cache لإبقاء المشروع نظيفًا.

## أنواع البيئة

### `"types": ["vite/client"]`

**ما الذي يفعله:** أي حزم أنواع تُضمَّن بشكل عام.

**الإضافات الشائعة:**

```json
"types": [
  "vite/client",     // Vite env variables
  "node",            // Node.js types if needed
  "@testing-library/jest-dom", // Testing matchers
  "vitest/globals"   // If using Vitest
]
```

## متقدّم: استراتيجية الضبط المتعدّد

### الضبط الأساسي (`tsconfig.json`)

ضبطك الرئيسي (المُبيَّن أعلاه)

### ضبط Node (`tsconfig.node.json`)

لإعداد Vite وسكربتات Node.js:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "types": ["node"],
    "allowJs": true
  },
  "include": ["vite.config.ts", "*.config.js"]
}
```

### ضبط البناء (`tsconfig.build.json`)

أكثر صرامة للإنتاج:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "exclude": ["**/*.test.tsx", "**/*.spec.tsx"]
}
```

### ضبط مكوّنات الخادم (`tsconfig.server.json`)

إن كنت تستخدم مكوّنات خادم React:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "lib": ["ES2023"], // No DOM for server
    "types": ["node"] // Node.js types instead
  },
  "include": ["src/app/**/*server*", "src/lib/server/**/*"]
}
```

### إعدادات التطوير مقابل الإنتاج

قد ترغب في مستويات صرامة مختلفة أثناء التطوير:

```json
// tsconfig.dev.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedLocals": false,
    "noUnusedParameters": false
  }
}
```

ثم في ملف package.json:

```json
{
  "scripts": {
    "dev": "vite --mode development",
    "type-check": "tsc --project tsconfig.json --noEmit",
    "type-check:dev": "tsc --project tsconfig.dev.json --noEmit",
    "build": "tsc --project tsconfig.json --noEmit && vite build"
  }
}
```

## حيث اخترنا تجربة المطور على الصرامة

### `noUncheckedIndexedAccess` (غير مُضمَّن)

**ما الذي يفعله:** يجعل الوصول المُفهرس يُعيد `T | undefined`

```typescript
// Without noUncheckedIndexedAccess
const arr = [1, 2, 3];
const first = arr[0]; // Type: number (could be undefined!)

// With noUncheckedIndexedAccess
const first = arr[0]; // Type: number | undefined
// Requires constant checking even for "safe" access
```

**ملاحظة خاصة بـ React 19:** هذا الخيار ذو قيمة خاصة مع مكوّنات الخادم والاستيرادات الديناميكية:

```typescript
// Without noUncheckedIndexedAccess - runtime error possible!
function getUser(users: User[], id: string) {
  return users[parseInt(id)]; // Could be undefined!
}

// With noUncheckedIndexedAccess - TypeScript catches it
function getUser(users: User[], id: string) {
  const user = users[parseInt(id)]; // Type: User | undefined
  if (!user) throw new Error('User not found');
  return user; // Now safely typed as User
}
```

في رأيي المتواضع، هذا يمثّل احتكاكًا كبيرًا لمعظم تطبيقات React. فكّر فيه للتطبيقات عالية الموثوقية. في كل مرة أحاول فيها أن أكون شخصًا صالحًا وأستخدم هذا، أنتهي إلى إطفائه *بسرعة كبيرة*.

### `noPropertyAccessFromIndexSignature: false`

يسمح بالوصول الطبيعي إلى الخصائص في توقيعات الفهرسة.

### `exactOptionalPropertyTypes: false`

لا يميّز بين undefined وغياب الخاصية - يطابق معظم أنماط React.

### `noUnusedLocals/Parameters: false`

يتولّى ESLint ذلك بشكل أفضل بمرونة أكبر.

## إطار القرار

**فعّلها لأجل السلامة:**

- جميع خيارات `strict`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`

**فعّلها لأجل الوضوح:**

- `verbatimModuleSyntax`
- `noImplicitOverride`
- `isolatedModules`

**فكّر فيها لكل مشروع:**

- `noUncheckedIndexedAccess` - متطلبات سلامة عالية
- `noUnusedLocals/Parameters` - مستودع نظيف
- `exactOptionalPropertyTypes` - دقّة واجهات البرمجة

**فعّلها دائمًا لـ React:**

- `jsx: "react-jsx"`
- `noEmit: true`
- `moduleResolution: "bundler"`

## الأخطاء الشائعة

1. **لا تستخدم `"moduleResolution": "node"`** - إنها قديمة
2. **لا تعطّل `strict`** - إنها صفقة متكاملة
3. **لا تنسَ `isolatedModules`** - مطلوبة لـ Vite
4. **لا تخلط بين أدوات البناء** - دع Vite يبني و TypeScript يفحص

## فحص ضبطك

شغّل هذه الأوامر للتحقق:

```bash
# Type checking
npx tsc --noEmit

# See computed config
npx tsc --showConfig

# Check specific file
npx tsc --noEmit --explain-files | grep "yourfile.tsx"
```

## React 19 وميزات React الحديثة

### دعم خُطّاف `use`

يتطلّب خُطّاف `use` في React 19 كتابة أنواع غير متزامنة صحيحة:

```typescript
// Ensure promises are well-typed for the use hook
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json(); // Make sure this matches User type
}

function UserProfile({ userId }: { userId: string }) {
  // TypeScript ensures the promise resolves to User
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}
```

### أمان أنواع الميزات المتزامنة

تستفيد الميزات المتزامنة في React 19 من الأنماط غير المتزامنة الصارمة. ويضمن الضبط أعلاه:

- أن الوعود مُكتوبة بأنواع صحيحة
- أن حدود اللاتزامن واضحة
- أن حدود Suspense تعمل بشكل صحيح مع TypeScript

## التحقق من ضبطك

أنشئ ملف اختبار بسيطًا للتحقق من أن ضبطك يعمل:

```typescript
// test-config.tsx - Put this in your src folder temporarily
import { use } from 'react'; // React 19 import should work
import { Button } from './components/Button.tsx'; // Extension import should work

// This should type-check properly
const asyncData: Promise<{ name: string }> = Promise.resolve({ name: 'Test' });

function TestComponent() {
  const data = use(asyncData); // Should be properly typed
  return <Button variant="primary">{data.name}</Button>;
}

// Strictness test - this should error with your strict config
const maybeUser: { name: string } | undefined = undefined;
console.log(maybeUser.name); // Should error with strict checks
```

شغّل `tsc --noEmit` للتأكد من أن كل شيء يُفحص بأنواعه بشكل صحيح، ثم احذف ملف الاختبار.

## إبقاء ضبطك محدَّثًا

يتطوّر React و TypeScript بسرعة. إليك كيف تبقى على اطّلاع:

1. **اتّبع تحديثات تكامل TypeScript في React** في ملاحظات الإصدار الخاصة بها
2. **راقب مدوّنة إصدار TypeScript** خيارات المُصرِّف الجديدة
3. **استخدم أدوات مثل `@typescript-eslint/parser`** لضمان بقاء ضبطك متوافقًا مع إعداد الفحص لديك
4. **اختبر ضبطك مع إصدارات TypeScript الجديدة** قبل الترقية

تذكّر: TypeScript أداة تساعدك على تسليم شيفرة أفضل وأسرع، لا أداة تحاربك. يجسّد هذا الضبط تلك الفلسفة، مع كونه جاهزًا لآخر ميزات React 19.
