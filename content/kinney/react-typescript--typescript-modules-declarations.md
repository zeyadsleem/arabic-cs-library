---
title: "الوحدات وملفات التعريف في React"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/typescript-modules-declarations"
---

كل مشروع React يصطدم في النهاية بخطأ «Cannot find module». قد تكون المشكلة تلك المكتبة من نوع CSS-in-JS التي تفتقر إلى الأنواع، أو استيراد صورة لا يفهمه TypeScript، أو مكوّن JavaScript قديم تحاول دمجه. إن ملفات التعريف هي منفذك للخروج من هذا المأزق: فهي تخبر TypeScript بشيفرة لا يستطيع استنتاجها بنفسه.

في تطوير React، ستصادف ملفات التعريف عندما:

- تستورد وحدات CSS أو الصور أو ملفات SVG بوصفها مكوّنات
- تستخدم مكتبات JavaScript لا تأتي مرفقة بتعريفات TypeScript
- توسّع الكائنات العامة لأغراض التحليلات أو أعلام الميزات
- تضيف خصائص مخصّصة إلى الأنواع المدمجة في React
- تنشئ متغيرات بيئة آمنة من حيث الأنواع

لنتعرّف على كيفية التعامل مع هذه السيناريوهات بثقة.

## استيراد الأصول في React

أكثر ملفات التعريف التي ستكتبها في React شيوعًا هي الخاصة بالأصول. لا يعرف TypeScript ما الذي ينبغي فعله عند `import logo from './logo.svg'`، وعليك أن تخبره.

### وحدات CSS

عند استخدام وحدات CSS لتحقيق تنسيق محصور النطاق:

```typescript
// types/css-modules.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Now in your component:
import styles from './Button.module.css';

function Button() {
  return (
    <button className={styles.primary}>
      {/* TypeScript knows styles.primary is a string */}
    </button>
  );
}
```

**نصيحة من الواقع العملي**: بعض الأدوات مثل `typed-css-modules` تستطيع توليد أنواع محدّدة لوحدات CSS لديك، فتمنحك إكمالًا تلقائيًا لأسماء الأصناف الفعلية.

### ملفات SVG بوصفها مكوّنات React

كثير من تطبيقات React تستورد ملفات SVG كمكوّنات لتحكم أفضل:

```typescript
// types/assets.d.ts
declare module '*.svg' {
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.svg?react' {  // Vite's syntax
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

// Usage:
import Logo from './logo.svg';
// or with Vite:
import Logo from './logo.svg?react';

function Header() {
  return <Logo width={40} height={40} fill="currentColor" />;
}
```

### استيراد الصور

لتحقيق تحميل محسّن للصور:

```typescript
// types/images.d.ts
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

// For Next.js static imports:
declare module '*.png' {
  import { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}
```

## العمل مع المكتبات غير المزوّدة بأنواع

ليست كل مكتبة تأتي مع تعريفات TypeScript. وإليك كيفية التعامل معها:

### حل سريع: تعريف أساسي

```typescript
// types/untyped-libs.d.ts
declare module 'old-carousel-library' {
  export default class Carousel {
    constructor(element: HTMLElement, options?: any);
    next(): void;
    prev(): void;
    goTo(index: number): void;
    destroy(): void;
  }
}

// Now you can use it:
import Carousel from 'old-carousel-library';

function ImageGallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const carousel = new Carousel(ref.current, {
        autoplay: true,
        duration: 5000
      });
      return () => carousel.destroy();
    }
  }, []);

  return <div ref={ref}>...</div>;
}
```

### الأفضل: أنواع مفصّلة

بالنسبة إلى المكتبات التي تستخدمها بكثافة، استثمر في أنواع أفضل:

```typescript
// types/analytics-lib.d.ts
declare module 'analytics-lib' {
  export interface AnalyticsOptions {
    debug?: boolean;
    endpoint?: string;
    bufferSize?: number;
    flushInterval?: number;
  }

  export interface EventProperties {
    [key: string]: string | number | boolean | null;
    timestamp?: string;
    userId?: string;
    sessionId?: string;
  }

  export interface PageViewProperties extends EventProperties {
    url: string;
    title?: string;
    referrer?: string;
    path?: string;
  }

  export class Analytics {
    constructor(apiKey: string, options?: AnalyticsOptions);

    track(eventName: string, properties?: EventProperties): Promise<void>;
    page(properties?: PageViewProperties): Promise<void>;
    identify(userId: string, traits?: Record<string, any>): Promise<void>;
    reset(): void;
  }

  const analytics: Analytics;
  export default analytics;
}
```

## الكائنات العامة في تطبيقات React

تحتاج كثير من تطبيقات React إلى توسيع كائن window العام من أجل التحليلات أو أعلام الميزات أو نصوص الطرف الثالث:

```typescript
// types/global.d.ts
declare global {
  interface Window {
    // Google Analytics
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;

    // Feature flags
    __FEATURES__?: {
      darkMode: boolean;
      betaFeatures: boolean;
      analyticsEnabled: boolean;
    };

    // Stripe
    Stripe?: (publicKey: string) => {
      redirectToCheckout: (options: any) => Promise<{ error?: any }>;
    };

    // Dev tools
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}

export {}; // Make this a module

// Usage in your React app:
function PaymentButton() {
  const handlePayment = async () => {
    if (window.Stripe) {
      const stripe = window.Stripe('pk_test_...');
      await stripe.redirectToCheckout({ sessionId: '...' });
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
}
```

## تعريفات أنواع مكوّنات React

عند إنشاء ملفات تعريف لمكوّنات React، وهو أمر شائع عند تغليف مكوّنات JavaScript، تحتاج إلى التعامل مع أنماط مختلفة من المكوّنات:

```typescript
// types/ui-library.d.ts
declare module '@company/ui-library' {
  import { ComponentType, ReactNode, MouseEvent, ForwardRefExoticComponent, RefAttributes } from 'react';

  // Basic component
  export interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    'data-testid'?: string;
  }

  export const Button: ComponentType<ButtonProps>;

  // ForwardRef component for DOM access
  export interface InputProps {
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    onChange?: (value: string) => void;
  }

  export const Input: ForwardRefExoticComponent<
    InputProps & RefAttributes<HTMLInputElement>
  >;

  // Component with static properties
  export interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
  }

  export const Modal: ComponentType<ModalProps> & {
    Header: ComponentType<{ children: ReactNode }>;
    Body: ComponentType<{ children: ReactNode }>;
    Footer: ComponentType<{ children: ReactNode }>;
  };

  // Hook exports
  export function useToast(): {
    show: (message: string, options?: { duration?: number; type?: 'success' | 'error' }) => void;
    hide: () => void;
  };
}

// Usage in your app:
import { Button, Modal, useToast } from '@company/ui-library';

function App() {
  const toast = useToast();

  return (
    <Modal open={true} onClose={() => {}}>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>Content</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => toast.show('Saved!', { type: 'success' })}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
```

## توسيع الأنواع المدمجة في React

تحتاج أحيانًا إلى توسيع أنواع React نفسها لدعم خصائص CSS المخصّصة، أو سمات HTML الإضافية، أو الخصائص الخاصة بمكتبة معيّنة:

### خصائص CSS المخصّصة

```typescript
// types/css-properties.d.ts
import 'react';

declare module 'react' {
  interface CSSProperties {
    // CSS Custom Properties (CSS Variables)
    '--primary-color'?: string;
    '--spacing'?: string | number;
    '--animation-duration'?: string;

    // CSS-in-JS libraries often use these
    [key: `--${string}`]: string | number | undefined;
  }
}

// Now you can use CSS variables in style prop:
function ThemedButton() {
  return (
    <button
      style={{
        '--primary-color': '#007bff',
        '--spacing': '1rem',
        backgroundColor: 'var(--primary-color)',
        padding: 'var(--spacing)'
      }}
    >
      Click me
    </button>
  );
}
```

### سمات HTML المخصّصة

من أجل سمات البيانات أو امتدادات ARIA أو تكاملات الطرف الثالث:

```typescript
// types/html-attributes.d.ts
declare module 'react' {
  interface HTMLAttributes<T> {
    // Intersection Observer attributes
    'data-lazy-src'?: string;
    'data-lazy-load'?: boolean;

    // Analytics attributes
    'data-track-event'?: string;
    'data-track-category'?: string;
    'data-track-label'?: string;

    // Testing attributes
    'data-cy'?: string;  // Cypress
    'data-test'?: string;  // Generic testing
  }
}

// Usage:
function TrackedButton() {
  return (
    <button
      data-track-event="click"
      data-track-category="engagement"
      data-cy="submit-button"
    >
      Submit
    </button>
  );
}
```

## متغيرات البيئة والثوابت وقت البناء

كثيرًا ما تستخدم تطبيقات React متغيرات البيئة لأغراض التهيئة. وإليك كيفية كتابة أنواعها:

### تطبيق Create React App أو `Process.env` القياسي

```typescript
// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // Required variables
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_AUTH_DOMAIN: string;

    // Optional variables
    readonly REACT_APP_SENTRY_DSN?: string;
    readonly REACT_APP_GA_TRACKING_ID?: string;
    readonly REACT_APP_FEATURE_FLAGS?: string;
  }
}

// Usage with type safety:
const apiUrl = process.env.REACT_APP_API_URL; // string
const isDev = process.env.NODE_ENV === 'development'; // boolean

// TypeScript will error if you typo:
// process.env.REACT_APP_API_ULR // Error: Property doesn't exist
```

### متغيرات البيئة في Vite

```typescript
// types/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly MODE: 'development' | 'production' | 'staging';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Usage:
const apiUrl = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.MODE === 'production';
```

**نصيحة من الواقع العملي**: استخدم مكتبة تحقق مثل Zod للتحقق من متغيرات البيئة أثناء التشغيل:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_AUTH_DOMAIN: z.string(),
  VITE_ENABLE_ANALYTICS: z.enum(['true', 'false']).optional(),
});

export const env = envSchema.parse(import.meta.env);
```

## كتابة أنواع لمكتبات React الشائعة التي تفتقر إلى الأنواع

إليك أمثلة واقعية على كتابة الأنواع لمكتبات شائعة الاستخدام في مشاريع React:

### محرّر Markdown لـ React

```typescript
// types/markdown-editor.d.ts
declare module 'react-markdown-editor-lite' {
  import { Component, ReactNode } from 'react';

  export interface EditorProps {
    value?: string;
    defaultValue?: string;
    onChange?: (data: { text: string; html: string }) => void;
    onImageUpload?: (file: File) => Promise<string>;
    style?: React.CSSProperties;
    height?: number | string;
    view?: {
      menu?: boolean;
      md?: boolean;
      html?: boolean;
    };
    canView?: {
      menu?: boolean;
      md?: boolean;
      html?: boolean;
      fullScreen?: boolean;
      hideMenu?: boolean;
    };
    plugins?: string[];
    renderHTML?: (text: string) => string;
    placeholder?: string;
    readOnly?: boolean;
  }

  export default class MdEditor extends Component<EditorProps> {
    getMdValue(): string;
    getHtmlValue(): string;
    clear(): void;
  }
}

// Usage:
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function BlogEditor() {
  const [content, setContent] = useState('');

  return (
    <MdEditor
      value={content}
      style={{ height: '500px' }}
      onChange={({ text }) => setContent(text)}
      onImageUpload={async (file) => {
        const url = await uploadImage(file);
        return url;
      }}
    />
  );
}
```

### مكتبة الرسوم البيانية

```typescript
// types/charts.d.ts
declare module 'react-simple-charts' {
  import { ComponentType, ReactNode } from 'react';

  interface ChartProps {
    data: Array<{ x: number | string; y: number }>;
    width?: number;
    height?: number;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    color?: string | ((d: any) => string);
  }

  interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    formatter?: (value: number) => string;
  }

  export const LineChart: ComponentType<
    ChartProps & {
      curve?: 'linear' | 'monotone' | 'step';
      strokeWidth?: number;
    }
  >;

  export const BarChart: ComponentType<
    ChartProps & {
      barGap?: number;
      barCategoryGap?: number;
    }
  >;

  export const Tooltip: ComponentType<TooltipProps>;
  export const Legend: ComponentType<{ align?: 'left' | 'center' | 'right' }>;
  export const XAxis: ComponentType<{ dataKey?: string; label?: string }>;
  export const YAxis: ComponentType<{ label?: string; domain?: [number, number] }>;
}
```

### مكتبة التحقق من النماذج

```typescript
// types/form-validator.d.ts
declare module 'react-form-validator' {
  import { ComponentType, ReactElement } from 'react';

  export interface ValidationRule {
    rule: RegExp | ((value: any) => boolean);
    message: string;
  }

  export interface FormProps {
    onSubmit: (values: Record<string, any>) => void | Promise<void>;
    onError?: (errors: Record<string, string>) => void;
    children: ReactElement | ReactElement[];
  }

  export interface FieldProps {
    name: string;
    rules?: ValidationRule[];
    children: (props: {
      value: any;
      error?: string;
      onChange: (value: any) => void;
      onBlur: () => void;
    }) => ReactElement;
  }

  export const Form: ComponentType<FormProps>;
  export const Field: ComponentType<FieldProps>;

  export function useFormState(): {
    values: Record<string, any>;
    errors: Record<string, string>;
    isValid: boolean;
    isDirty: boolean;
    reset: () => void;
  };
}
```

## نشر مكتبات مكوّنات React مع الأنواع

إذا كنت تبني مكتبة مكوّنات React، فإليك كيفية تهيئة الأنواع على النحو الصحيح:

```json
{
  "name": "@company/react-ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    },
    "./styles": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  },
  "files": ["dist", "README.md"]
}
```

**نصيحة احترافية**: استخدم `peerDependencies` من أجل React لتجنّب تعارض الإصدارات. أدرج الأنواع في `devDependencies` وليس في الاعتماديات العادية.

## استخدام حزم @types في مشاريع React

معظم مكتبات React الشائعة لديها أنواع يحافظ عليها المجتمع:

```bash
# Essential types for React projects
npm install --save-dev \
  @types/react \
  @types/react-dom \
  @types/node

# Common library types
npm install --save-dev \
  @types/react-router-dom \
  @types/styled-components \
  @types/jest \
  @types/testing-library__react
```

**العثور على أنواع لمكتبة**:

1. جرّب تثبيت `@types/package-name`
2. تحقّق مما إذا كانت الحزمة تتضمن أنواعها الخاصة (ابحث عن «types» في package.json)
3. ابحث في [TypeSearch](https://www.typescriptlang.org/dt/search)
4. أنشئ ملف تعريف خاصًا بك إذا لزم الأمر

### عندما تتعارض حزم @types

تحدث أحيانًا اختلافات في الإصدارات بين حزم @types:

```typescript
// types/overrides.d.ts
// Override conflicting types
declare module 'react-router-dom' {
  // Fix for @types/react-router-dom not matching your version
  export function useParams<T = Record<string, string>>(): T;
}
```

## أنماط متقدمة لكتابة الأنواع في مكتبات React

### أنواع المكوّنات متعددة الأشكال

بالنسبة إلى مكتبات المكوّنات التي تدعم خاصية `as`:

```typescript
// types/polymorphic-lib.d.ts
declare module 'polymorphic-ui' {
  import { ComponentPropsWithRef, ElementType, ReactElement } from 'react';

  type PolymorphicProps<C extends ElementType, Props = {}> = Props &
    Omit<ComponentPropsWithRef<C>, keyof Props | 'as'> & {
      as?: C;
    };

  export function Box<C extends ElementType = 'div'>(
    props: PolymorphicProps<C, { padding?: string; margin?: string }>
  ): ReactElement | null;

  export function Text<C extends ElementType = 'span'>(
    props: PolymorphicProps<C, { size?: 'small' | 'medium' | 'large' }>
  ): ReactElement | null;
}

// Usage:
import { Box, Text } from 'polymorphic-ui';

<Box as="section" padding="2rem" onClick={(e) => {}}>
  <Text as="h1" size="large">Title</Text>
</Box>
```

### مكتبات Render Prop

```typescript
// types/render-prop-lib.d.ts
declare module 'react-intersection-observer' {
  import { ReactNode } from 'react';

  export interface IntersectionOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    triggerOnce?: boolean;
  }

  export interface IntersectionObserverProps extends IntersectionOptions {
    children: (props: {
      inView: boolean;
      ref: (node?: Element | null) => void;
      entry?: IntersectionObserverEntry;
    }) => ReactNode;
    onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
  }

  export function InView(props: IntersectionObserverProps): JSX.Element;

  export function useInView(options?: IntersectionOptions): {
    ref: (node?: Element | null) => void;
    inView: boolean;
    entry?: IntersectionObserverEntry;
  };
}
```

## الاستيراد الديناميكي وتقسيم الشيفرة في React

يحتاج TypeScript إلى فهم مكوّناتك المحمّلة عند الطلب:

### React.lazy مع TypeScript

```typescript
// types/routes.d.ts
declare module '@/routes' {
  import { ComponentType, LazyExoticComponent } from 'react';

  export interface RouteConfig {
    path: string;
    exact?: boolean;
    component: LazyExoticComponent<ComponentType<any>>;
    preload?: () => Promise<void>;
  }

  export const routes: RouteConfig[];
}

// routes/index.ts
import { lazy } from 'react';
import type { RouteConfig } from '@/routes';

const HomePage = lazy(() => import('./HomePage'));
const ProfilePage = lazy(() => import('./ProfilePage'));
const SettingsPage = lazy(() => import('./SettingsPage'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    preload: () => import('./HomePage')
  },
  {
    path: '/profile',
    component: ProfilePage,
    preload: () => import('./ProfilePage')
  },
  {
    path: '/settings',
    component: SettingsPage,
    preload: () => import('./SettingsPage')
  }
];

// Usage in App:
import { Suspense } from 'react';
import { routes } from '@/routes';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      {routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Suspense>
  );
}
```

### استيراد المكوّنات ديناميكيًا

```typescript
// For dynamically importing components based on strings
declare module '@/components/icons/*.svg' {
  import { FC, SVGProps } from 'react';
  const Icon: FC<SVGProps<SVGSVGElement>>;
  export default Icon;
}

// Helper for dynamic imports
async function loadIcon(name: string) {
  const module = await import(`@/components/icons/${name}.svg`);
  return module.default;
}

// With type safety:
type IconName = 'user' | 'settings' | 'logout';

const iconLoaders: Record<IconName, () => Promise<any>> = {
  user: () => import('@/components/icons/user.svg'),
  settings: () => import('@/components/icons/settings.svg'),
  logout: () => import('@/components/icons/logout.svg'),
};
```

## أنواع خاصة بكل منصة (الويب مقابل React Native)

```typescript
// index.d.ts
export interface ComponentProps {
  title: string;
  onPress?: () => void;
}

// index.native.d.ts
import { ViewStyle } from 'react-native';

export interface ComponentProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle; // React Native specific
}

// index.web.d.ts
import { CSSProperties } from 'react';

export interface ComponentProps {
  title: string;
  onClick?: () => void; // Web uses onClick
  style?: CSSProperties; // Web CSS
}
```

## اختبار تعريفات أنواع المكوّنات

عند إنشاء تعريفات أنواع لمكوّنات React، اختبرها للتأكد من أنها تعمل على النحو الصحيح:

```typescript
// types/__tests__/component-types.test.tsx
import { expectType, expectError } from 'tsd';
import { Button, Input, Modal } from '@company/ui-library';

// Test basic props
expectType<JSX.Element>(
  <Button variant="primary" onClick={() => {}}>Click</Button>
);

// Test that invalid props error
expectError(
  // @ts-expect-error: invalid variant
  <Button variant="invalid">Click</Button>
);

// Test ref forwarding
const inputRef = useRef<HTMLInputElement>(null);
expectType<JSX.Element>(
  <Input ref={inputRef} label="Name" />
);

// Test compound components
expectType<JSX.Element>(
  <Modal open={true} onClose={() => {}}>
    <Modal.Header>Title</Modal.Header>
    <Modal.Body>Content</Modal.Body>
  </Modal>
);

// Runtime type checking in tests
test('Button renders with correct props', () => {
  const { getByRole } = render(
    <Button variant="primary" data-testid="test-button">
      Click me
    </Button>
  );

  expect(getByRole('button')).toBeInTheDocument();
});
```

## أفضل الممارسات في تعريفات أنواع React

### نظّم ملفات الأنواع لديك

```
src/
  types/
    assets.d.ts      // SVG, images, CSS modules
    env.d.ts          // Environment variables
    global.d.ts       // Window object, global functions
    modules.d.ts      // Third-party libraries without types
    augmentations.d.ts // Extensions to existing types
```

### استخدم الاستيرادات الخاصة بالأنواع فقط للحصول على أداء أفضل

```typescript
// ✅ Good: Type-only imports are removed in production
import type { User, Post } from './types';
import { getUser, getPost } from './api';

// ❌ Bad: Imports the entire module even if only using types
import { User, getUser } from './api';
```

### هيّئ أسماء مسارات مستعارة لاستيرادات نظيفة

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/components/*": ["components/*"],
      "@/hooks/*": ["hooks/*"],
      "@/utils/*": ["utils/*"],
      "@/types/*": ["types/*"],
      "@/assets/*": ["assets/*"]
    }
  }
}

// vite.config.ts (if using Vite)
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### اكتب أنواع React Context على النحو الصحيح

```typescript
// types/auth-context.d.ts
declare module '@/contexts/auth' {
  export interface User {
    id: string;
    email: string;
    name: string;
  }

  export interface AuthContextValue {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
  }

  export const AuthContext: React.Context<AuthContextValue | undefined>;
  export const useAuth: () => AuthContextValue;
  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
}
```

### اربط إصدارات أنواعك بإصدارات مكوّناتك

```typescript
// When breaking changes occur, export versioned types
export interface ButtonPropsV1 {
  label: string;
  onClick: () => void;
}

export interface ButtonProps {
  children: ReactNode; // Breaking change from v1
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// For migration period
export type ButtonPropsCompat = ButtonPropsV1 | ButtonProps;
```

## مشكلات TypeScript الشائعة في React وحلولها

### خطأ «Cannot find module» مع ملفات CSS والصور

```typescript
// Quick fix: Create declarations
// types/assets.d.ts
declare module '*.module.css';
declare module '*.png';
declare module '*.svg';

// Better: Add specific types
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
```

### تعارضات أنواع React 18

```typescript
// If you see errors with React 18 types:
// 1. Update all @types packages together
npm update @types/react @types/react-dom

// 2. Ensure consistent versions in package.json
"devDependencies": {
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0"
}

// 3. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### أخطاء نوع عنصر JSX

```typescript
// Error: JSX element type 'Component' does not have any construct or call signatures

// Fix: Ensure proper export/import
// ❌ Wrong
declare module 'my-lib' {
  const Component: any; // Too vague
}

// ✅ Correct
declare module 'my-lib' {
  import { ComponentType } from 'react';
  export const Component: ComponentType<{ title: string }>;
}
```

### مشكلات استنتاج أنواع الخصائص

```typescript
// When TypeScript can't infer prop types:

// ❌ Problem: Generic component loses type
const MyComponent = <T,>(props: T) => <div />;

// ✅ Solution: Add extends constraint
const MyComponent = <T extends Record<string, any>>(
  props: T
) => <div />;

// Or use function declaration
function MyComponent<T>(props: T) {
  return <div />;
}
```

## أمثلة واقعية على ملفات تعريف React

### كتابة أنواع لمكوّن Headless UI

```typescript
// types/headless-ui.d.ts
declare module '@company/headless-ui' {
  import { ReactNode, Dispatch, SetStateAction } from 'react';

  export interface UseDisclosureReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }

  export function useDisclosure(defaultOpen?: boolean): UseDisclosureReturn;

  export interface UseClickOutsideOptions {
    enabled?: boolean;
    handler: (event: MouseEvent | TouchEvent) => void;
  }

  export function useClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T>,
    options: UseClickOutsideOptions,
  ): void;

  export interface UseFocusTrapOptions {
    enabled?: boolean;
    initialFocus?: React.RefObject<HTMLElement>;
    finalFocus?: React.RefObject<HTMLElement>;
  }

  export function useFocusTrap<T extends HTMLElement>(
    ref: React.RefObject<T>,
    options?: UseFocusTrapOptions,
  ): void;
}
```

### كتابة أنواع لتكامل مكتبة النماذج

```typescript
// types/form-library.d.ts
declare module 'react-hook-form-helpers' {
  import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
  import { ReactElement } from 'react';

  export interface FormFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
  }

  export function FormField<TFieldValues extends FieldValues>(
    props: FormFieldProps<TFieldValues> & {
      form: UseFormReturn<TFieldValues>;
    },
  ): ReactElement;

  export function FormProvider<TFieldValues extends FieldValues>(props: {
    form: UseFormReturn<TFieldValues>;
    children: ReactNode;
  }): ReactElement;
}
```

## الخلاصة

إن ملفات التعريف هي جسرك بين عالم TypeScript والنظام البيئي الواسع من مكتبات JavaScript والأصول والكائنات العامة في تطبيقات React. ستستخدمها من أجل:

1. **استيراد أصول غير JavaScript** - وحدات CSS والصور وملفات SVG بوصفها مكوّنات React
2. **كتابة أنواع مكتبات JavaScript** - إنشاء أنواع للمكتبات التي لا تأتي مرفقة بتعريفات TypeScript
3. **توسيع أنواع React** - إضافة خصائص CSS المخصّصة وسمات البيانات والامتدادات الخاصة بالمكتبات
4. **التعامل مع متغيرات البيئة** - إنشاء وصول آمن من حيث الأنواع إلى تهيئة وقت البناء
5. **دعم الاستيراد الديناميكي** - كتابة أنواع المكوّنات المحمّلة عند الطلب والوحدات المقسمة حسب الشيفرة

تحتاج معظم مشاريع React إلى عدد قليل فقط من ملفات التعريف في مجلد `types/`. ابدأ ببساطة بالتعريفات الأساسية عندما تصطدم بأخطاء «Cannot find module»، ثم حسّنها تدريجيًا كلما تعرّفت أكثر على المكتبات التي تستخدمها. وتذكّر: إن ملفات التعريف تتعلق بتجربة المطوّر، فالأنواع الجيدة تجعل محرّر الشيفرة عونًا لك بدلًا من أن يكون خصمًا.
