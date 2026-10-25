---
title: "المستودعات الموحّدة وأنواع واجهة المستخدم المشتركة"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/monorepos-and-shared-ui-types"
---

لا بأس في بناء التطبيقات بمعزل عن بعضها حتى تحتاج إلى مشاركة المكوّنات والمساعدات أو الأنواع بين مشروعاتٍ عدّة. حينها تنتبه أنك كنت تنسخ عنصر الزرّ نفسه وتكرّر واجهات TypeScript وكأنك في عام 2015 (كلنا مررنا بشأنه). وهنا تأتي المستودعات الموحّدة (monorepos) — مستودع واحد يحتوي حزمًا عدّة يستطيع بعضها الاستيراد من بعض مع الإبقاء على أمان الأنواع وسير عمل تطويرٍ سليمين.

يحل المستودع الموحّد مشكلة «مكتبة المكوّنات المشتركة» حلًّا أنيقًا. فبدلًا من نشر حزمة داخلية إلى npm أو مصارعة وحدات Git الفرعية (Git submodules)، تُبقي كل شيء في موضع واحد مع أدوات مناسبة تُعين في بناء كل حزمة على حدة واختبارها ونشرها استقلالًا. سنبني اليوم مستودعًا موحّدًا بـ TypeScript فيه مكتبة واجهة مستخدم مشتركة تقدّم للتطبيقات المستهلكة مكوّنات React وتعريفات أنواع معًا.

## لماذا المستودعات الموحّدة للمكتبات المشتركة؟

قبل أن نتعمّق، لنغطِّ بسرعة السبب الذي يجعل المستودعات الموحّدة مناسبة لمكتبات واجهة المستخدم المشتركة:

- **مصدر واحد للحق:** جميع مكوّناتك وأنواعها في موضع واحد
- **تغييرات ذرّية:** حدّث المكتبة والمستهلك في الإيداع نفسه
- **إدارة اعتمادات ميسَّرة:** لا سؤال بعدُ «أيّ إصدار من مكوّن الزرّ نستخدم؟»
- **تجربة مطوّر أفضل:** فالانتقال إلى التعريفات يعمل عبر الحزم
- **أدوات متّسقة:** شارك تهيئات ESLint وسكربتات البناء وإعداد الاختبار

والمفاضلة؟ حجم مستودع أكبر، وتنسيق بناء أكثر تعقيدًا بقليل — لكن الأدوات الحديثة تجعل هذه الهموم نظرية في الغالب لمعظم الفرق.

## تهيئة بنية المستودع الموحّد

سنستخدم [pnpm workspaces](https://pnpm.io/workspaces) لأنها تتعامل مع ربط الحزم بأناقة ولها دعم ممتاز لـ TypeScript. ستبدو بنيتنا كما يأتي:

```
my-monorepo/
├── packages/
│   ├── ui/           # Shared UI components
│   ├── types/        # Shared TypeScript types
│   └── web-app/      # Consumer application
├── package.json      # Root workspace config
├── pnpm-workspace.yaml
└── tsconfig.json     # Root TypeScript config
```

ابدأ بإنشاء الملف `package.json` الجذري:

```json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm --parallel --recursive run dev",
    "build": "pnpm --recursive run build",
    "type-check": "pnpm --recursive run type-check"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

أنشئ تهيئة مساحات العمل في `pnpm-workspace.yaml`:

```yaml
packages:
  - 'packages/*'
```

## إنشاء حزمة الأنواع المشتركة

لنبدأ بحزمة الأنواع لأن مكوّنات واجهة المستخدم ستعتمد عليها. هكذا تبقى تعريفات الأنواع لدينا مصدرًا واحدًا موثوقًا للحق.

```bash
mkdir -p packages/types/src
cd packages/types
```

أنشئ `packages/types/package.json`:

```json
{
  "name": "@my-org/types",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

> **ملاحظة**
>
> تُخبر صيغة `workspace:*` أداة pnpm أن تستخدم إصدار TypeScript من مساحة العمل الجذرية فتضمن الاتساق.

أنشئ `packages/types/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "composite": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

عَلَم `composite: true` جوهري — فهو يفعّل مراجع المشاريع (project references) في TypeScript، بحيث تتمكن الحزم الأخرى من بناء تدريجي ودعم سليم من بيئة التطوير التكاملية.

الآن أنشئ بعض الأنواع المشتركة في `packages/types/src/index.ts`:

```typescript
// Common UI prop types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Theme-related types
export type ThemeVariant = 'primary' | 'secondary' | 'danger' | 'success';

export type Size = 'sm' | 'md' | 'lg';

// Component-specific types
export interface ButtonProps extends BaseProps {
  variant?: ThemeVariant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Data types that might be shared across apps
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Utility types for forms
export type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

export type FormState<T extends Record<string, unknown>> = {
  [K in keyof T]: FormField<T[K]>;
};
```

تغطي هذه الأنواع أنماط واجهة المستخدم الشائعة التي ستريد مشاركتها: خصائص المكوّنات، وأنظمة السمات (themes)، ونماذج البيانات، وأدوات النماذج (forms).

## بناء حزمة واجهة المستخدم المشتركة

الآن الجزء الممتع: بناء مكوّنات React قابلة لإعادة الاستخدام. أنشئ بنية حزمة واجهة المستخدم:

```bash
mkdir -p packages/ui/src/components
cd packages/ui
```

أنشئ `packages/ui/package.json`:

```json
{
  "name": "@my-org/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "./styles": "./dist/styles.css"
  },
  "scripts": {
    "build": "tsc && rollup -c",
    "type-check": "tsc --noEmit",
    "dev": "tsc --watch"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@my-org/types": "workspace:*",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "workspace:*",
    "@types/react-dom": "workspace:*",
    "typescript": "workspace:*",
    "rollup": "^4.0.0",
    "@rollup/plugin-typescript": "^11.0.0"
  }
}
```

أنشئ `packages/ui/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "composite": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "references": [{ "path": "../types" }]
}
```

تخبر مصفوفة `references` TypeScript بأن هذه الحزمة تعتمد على حزمة الأنواع، فتُفعّل البناء التدريجي والتحقق النوعي السليم عبر الحزم.

أنشئ مكوّن Button في `packages/ui/src/components/Button.tsx`:

```typescript
import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from '@my-org/types';

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'font-medium',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
  ];

  const variantClasses = {
    primary: [
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'focus:ring-blue-500',
      'disabled:bg-blue-300',
    ],
    secondary: [
      'bg-gray-200',
      'text-gray-900',
      'hover:bg-gray-300',
      'focus:ring-gray-500',
      'disabled:bg-gray-100',
    ],
    danger: [
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'focus:ring-red-500',
      'disabled:bg-red-300',
    ],
    success: [
      'bg-green-600',
      'text-white',
      'hover:bg-green-700',
      'focus:ring-green-500',
      'disabled:bg-green-300',
    ],
  };

  const sizeClasses = {
    sm: ['text-sm', 'px-3', 'py-1.5'],
    md: ['text-sm', 'px-4', 'py-2'],
    lg: ['text-base', 'px-6', 'py-3'],
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    {
      'opacity-50 cursor-not-allowed': disabled || loading,
      'cursor-wait': loading,
    },
    className,
  );

  return (
    <button className={classes} disabled={disabled || loading} onClick={onClick} {...rest}>
      {loading && (
        <svg className="mr-2 -ml-1 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
```

أنشئ مكوّن Modal في `packages/ui/src/components/Modal.tsx`:

```typescript
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { ModalProps } from '@my-org/types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="bg-opacity-50 fixed inset-0 bg-black transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={clsx('relative w-full max-w-md rounded-lg bg-white shadow-xl', className)}>
          {/* Header */}
          {title && (
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
```

أنشئ ملف التصدير الرئيسي `packages/ui/src/index.ts`:

```typescript
// Export all components
export { default as Button } from './components/Button';
export { default as Modal } from './components/Modal';

// Re-export types for convenience
export type { ButtonProps, ModalProps, ThemeVariant, Size, BaseProps } from '@my-org/types';
```

## تهيئة مراجع مشاريع TypeScript

يجري السحر في ملف `tsconfig.json` الجذري. هذا الملف ينسّق البناء عبر كل الحزم:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@my-org/ui": ["./packages/ui/src"],
      "@my-org/types": ["./packages/types/src"]
    }
  },
  "references": [
    { "path": "./packages/types" },
    { "path": "./packages/ui" },
    { "path": "./packages/web-app" }
  ],
  "files": []
}
```

يتيح إسناد `paths` لـ TypeScript أن يحل الاستيرادات من الحزم أثناء التطوير، فيما تُفعّل `references` التصريف التدريجي عبر الحزم.

## إنشاء تطبيق مستهلك

لننشئ الآن تطبيقًا يستخدم مكتبة واجهة المستخدم المشتركة عندنا. أنشئ `packages/web-app`:

```bash
mkdir -p packages/web-app/src
cd packages/web-app
```

أنشئ `packages/web-app/package.json`:

```json
{
  "name": "web-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@my-org/ui": "workspace:*",
    "@my-org/types": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "workspace:*",
    "@types/react-dom": "workspace:*",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "workspace:*",
    "vite": "^4.0.0"
  }
}
```

أنشئ `packages/web-app/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "references": [{ "path": "../types" }, { "path": "../ui" }]
}
```

أنشئ تطبيقًا بسيطًا في `packages/web-app/src/App.tsx`:

```typescript
import React, { useState } from 'react';
import { Button, Modal } from '@my-org/ui';
import type { User } from '@my-org/types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
  };

  const handleClick = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Monorepo Demo</h1>
        <p className="mb-4">Welcome, {user.name}!</p>

        <div className="space-x-4">
          <Button onClick={handleClick} loading={loading}>
            {loading ? 'Loading...' : 'Open Modal'}
          </Button>

          <Button variant="secondary">Secondary Action</Button>

          <Button variant="danger" size="sm">
            Delete
          </Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="User Profile">
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Joined:</strong> {user.createdAt.toLocaleDateString()}
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default App;
```

## تهيئة البناء وسير العمل

أنشئ سكربت بناء لحزمة واجهة المستخدم بواسطة Rollup. أضف `packages/ui/rollup.config.js`:

```javascript
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
    }),
  ],
  external: ['react', 'react-dom', 'clsx', '@my-org/types'],
};
```

الآن نستطيع بناء كل شيء من الجذر:

```bash
# Install all dependencies
pnpm install

# Build all packages
pnpm build

# Run type checking across all packages
pnpm type-check

# Start development servers
pnpm dev
```

## أنماط متقدمة وأفضل الممارسات

### التصديرات البرميلية (barrel exports) لاستيراد نظيف

بدلًا من الاستيراد من مسارات معمّقة، أنشئ تصديرات برميلية في حزمة واجهة المستخدم عندك:

```typescript
// packages/ui/src/components/index.ts
export { default as Button } from './Button';
export { default as Modal } from './Modal';

// packages/ui/src/hooks/index.ts
export { default as useLocalStorage } from './useLocalStorage';

// packages/ui/src/index.ts
export * from './components';
export * from './hooks';
export * from '@my-org/types';
```

### تهيئة بناء مشتركة

أنشئ تهيئة TypeScript مشتركة للإعدادات العامة:

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  }
}
```

ثم قم بتوسيعه في كل حزمة:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    // package-specific overrides
  }
}
```

### التحقق النوعي عند وقت التشغيل

أما الأنواع المشتركة التي تعبر حدود API فأضف إلى جانب أنواع TypeScript عندك مخططات Zod:

```typescript
// packages/types/src/user.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Export both type and runtime validator
export const parseUser = (data: unknown): User => {
  return UserSchema.parse(data);
};
```

بهذا تربح أنواعًا عند وقت التصريف وتحقّقًا عند وقت التشغيل من التعريف نفسه.

## الأخطاء الشائعة وحلولها

### الاعتمادات الدائرية

انتبه للاستيرادات الدائرية بين الحزم. إن احتاجت حزمة أنواعك أنواعًا خاصة بواجهة المستخدم، فأنشئ حزمة `ui-types` منفصلة أو انقل الأنواع المشتركة إلى موضع أعم.

```typescript
// ❌ Avoid this pattern
// packages/types depends on packages/ui
// packages/ui depends on packages/types

// ✅ Better approach
// packages/ui-types (specific to UI components)
// packages/api-types (shared between frontend/backend)
// packages/ui depends on ui-types and api-types
```

### مشكلات ترتيب البناء

استخدم مراجع مشاريع TypeScript على الصحيح حتى تُبنى الحزم بترتيب صحيح:

```bash
# Build everything with proper dependencies
npx tsc --build

# Or use pnpm's built-in ordering
pnpm --recursive run build
```

### استيراد التطوير مقابل الإنتاج

أثناء التطوير تريد أن تُفسَّر الاستيرادات إلى ملفات المصدر. وفي الإنتاج تريد أن تُفسَّر إلى ملفات `.d.ts` المُبنَأة. فتهيئة `paths` في ملف `tsconfig.json` الجذري تعتني بالتطوير، بينما يعتني حقل `types` في `package.json` بأعمال البناء الإنتاجية.

## الخطوات التالية

أنت الآن تملك مستودعًا موحّدًا عاملًا بالكامل فيه مكوّنات وأنواع واجهة المستخدم المشتركة. هذه بعض التحسينات الجديرة بالنظر:

- **Storybook:** أضف توثيقًا واختبارًا للمكوّنات
- **الاختبار:** هيّئ Jest بحل وحدات سليم للاختبارات عبر الحزم
- **الفحص:** شارك تهيئات ESLint عبر الحزم
- **النشر:** استخدم Changesets لإدارة الإصدارات ونشر الحزم كلًّا على حدة
- **التكامل والنشر المستمر (CI/CD):** هيّئ ذاكرة تخزينٍ مؤقتة للبناء لا تعيد بناء إلا الحزم المتغيرة

تندرج هذه الأنماط جيدًا سواء بُني نظام تصاميم لمؤسسة واحدة أم تُدار عشرات الحزم المرتبطة بعضها بعضًا. والمفتاح هو المحافظة على حدود واضحة بين الحزم مع الاستفادة من مراجع مشاريع TypeScript في إبقاء كل شيء آمن الأنواع وقابلًا للبناء.

تذكر: المستودعات الموحّدة تخص التنظيم وسير العمل لا المعمارية. أبقِ مكوّناتك مركّزة، وأنواعك محددة، وعملية بنائك متوقعة. وستتكفل الأدوات بالبقية.
