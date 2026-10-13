---
title: "مكوّنات العميل"
book: hono
chapter: guides
slug: jsx-dom
order: 75
source: https://hono.dev/docs/guides/jsx-dom
lang: ar
---

`hono/jsx` يدعم ليس فقط جانب الخادم بل أيضًا جانب العميل. هذا يعني أنه من الممكن إنشاء واجهة مستخدم تفاعلية تعمل في المتصفح. نسميها مكونات العميل (Client Components) أو `hono/jsx/dom`.

إنه سريع وصغير جدًا. برنامج العدّاد في `hono/jsx/dom` بحجم 2.8KB فقط مع ضغط Brotli، لكن 47.8KB لـ React.

يقدّم هذا القسم ميزات خاصة بمكوّنات العميل (Client Components).

## مثال العدّاد

فيما يلي مثال على عداد بسيط، نفس الكود يعمل كما في React.

```tsx
import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

function App() {
  return (
    <html>
      <body>
        <Counter />
      </body>
    </html>
  )
}

const root = document.getElementById('root')
render(<App />, root)
```

## `render()`

يمكنك استخدام `render()` لإدراج مكوّنات JSX داخل عنصر HTML محدَّد.

```tsx
render(<Component />, container)
```

يمكنك رؤية كود المثال الكامل هنا: [مثال العدّاد](https://github.com/honojs/examples/tree/main/hono-vite-jsx).

## خطافات متوافقة مع React

يحتوي hono/jsx/dom على خطافات (Hooks) متوافقة أو متوافقة جزئيًا مع React. يمكنك التعرف على هذه الواجهات البرمجية (APIs) بالنظر إلى [وثائق React](https://react.dev/reference/react/hooks).

- `useState()`
- `useEffect()`
- `useRef()`
- `useCallback()`
- `use()`
- `startTransition()`
- `useTransition()`
- `useDeferredValue()`
- `useMemo()`
- `useLayoutEffect()`
- `useReducer()`
- `useDebugValue()`
- `createElement()`
- `memo()`
- `isValidElement()`
- `useId()`
- `createRef()`
- `forwardRef()`
- `useImperativeHandle()`
- `useSyncExternalStore()`
- `useInsertionEffect()`
- `useFormStatus()`
- `useActionState()`
- `useOptimistic()`

## `startViewTransition()` العائلة

الـ `startViewTransition()` تحتوي العائلة على خطافات (hooks) ودوال أصلية للتعامل مع [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) بسهولة. توضّح الأمثلة أدناه كيفية استخدامها.

### 1. مثال بسيط جدًا

يمكنك كتابة انتقال (transition) باستخدام `document.startViewTransition` قريبًا باستخدام `startViewTransition()`.

```tsx
import { useState, startViewTransition } from 'hono/jsx'
import { css, Style } from 'hono/css'

export default function App() {
  const [showLargeImage, setShowLargeImage] = useState(false)
  return (
    <>
      <Style />
      <button
        onClick={() =>
          startViewTransition(() =>
            setShowLargeImage((state) => !state)
          )
        }
      >
        Click!
      </button>
      <div>
        {!showLargeImage ? (
          <img src='https://hono.dev/images/logo.png' />
        ) : (
          <div
            class={css`
              background: url('https://hono.dev/images/logo-large.png');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              width: 600px;
              height: 600px;
            `}
          ></div>
        )}
      </div>
    </>
  )
}
```

### 2. استخدام `viewTransition()` مع `keyframes()`

الـ `viewTransition()` تسمح لك الدالة بالحصول على المعرّف الفريد `view-transition-name`.

يمكنك استخدامه مع `keyframes()`، الـ `::view-transition-old()` يُحوَّل إلى `::view-transition-old(${uniqueName))`.

```tsx
import { useState, startViewTransition } from 'hono/jsx'
import { viewTransition } from 'hono/jsx/dom/css'
import { css, keyframes, Style } from 'hono/css'

const rotate = keyframes`
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
`

export default function App() {
  const [showLargeImage, setShowLargeImage] = useState(false)
  const [transitionNameClass] = useState(() =>
    viewTransition(css`
      ::view-transition-old() {
        animation-name: ${rotate};
      }
      ::view-transition-new() {
        animation-name: ${rotate};
      }
    `)
  )
  return (
    <>
      <Style />
      <button
        onClick={() =>
          startViewTransition(() =>
            setShowLargeImage((state) => !state)
          )
        }
      >
        Click!
      </button>
      <div>
        {!showLargeImage ? (
          <img src='https://hono.dev/images/logo.png' />
        ) : (
          <div
            class={css`
              ${transitionNameClass}
              background: url('https://hono.dev/images/logo-large.png');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              width: 600px;
              height: 600px;
            `}
          ></div>
        )}
      </div>
    </>
  )
}
```

### 3. استخدام `useViewTransition`

إذا أردت تغيير النمط (style) فقط أثناء الحركة (animation). يمكنك استخدام `useViewTransition()`. تُرجع هذه الخطافة `[boolean, (callback: () => void) => void]`، وهي `isUpdating` الخيار و `startViewTransition()` الدالة.

عند استخدام هذا الخطاف (hook)، يتم تقييم المكوّن (Component) في الوقتين التاليين.

- داخل دالة الاستدعاء لاستدعاء `startViewTransition()`.
- عندما [الـ `finish` يصبح الوعد (promise) منجَزًا](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/finished)

```tsx
import { useState, useViewTransition } from 'hono/jsx'
import { viewTransition } from 'hono/jsx/dom/css'
import { css, keyframes, Style } from 'hono/css'

const rotate = keyframes`
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
`

export default function App() {
  const [isUpdating, startViewTransition] = useViewTransition()
  const [showLargeImage, setShowLargeImage] = useState(false)
  const [transitionNameClass] = useState(() =>
    viewTransition(css`
      ::view-transition-old() {
        animation-name: ${rotate};
      }
      ::view-transition-new() {
        animation-name: ${rotate};
      }
    `)
  )
  return (
    <>
      <Style />
      <button
        onClick={() =>
          startViewTransition(() =>
            setShowLargeImage((state) => !state)
          )
        }
      >
        Click!
      </button>
      <div>
        {!showLargeImage ? (
          <img src='https://hono.dev/images/logo.png' />
        ) : (
          <div
            class={css`
              ${transitionNameClass}
              background: url('https://hono.dev/images/logo-large.png');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              width: 600px;
              height: 600px;
              position: relative;
              ${isUpdating &&
              css`
                &:before {
                  content: 'Loading...';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                }
              `}
            `}
          ></div>
        )}
      </div>
    </>
  )
}
```

## ال `hono/jsx/dom` بيئة التشغيل

يوجد وقت تشغيل JSX صغير (JSX Runtime) لمكوّنات العميل (Client Components). استخدامه ينتج حزمًا (bundles) أصغر من استخدام `hono/jsx`. حدِّد `hono/jsx/dom` في `tsconfig.json`. بالنسبة إلى Deno، عدّل deno.json.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx/dom"
  }
}
```

بدلاً من ذلك، يمكنك تحديد `hono/jsx/dom` في خيارات تحويل esbuild في `vite.config.ts`.

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxImportSource: 'hono/jsx/dom',
  },
})
```
