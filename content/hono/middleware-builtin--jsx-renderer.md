---
title: "البرمجية الوسيطة JSX Renderer"
book: hono
chapter: middleware-builtin
slug: jsx-renderer
order: 39
source: https://hono.dev/docs/middleware/builtin/jsx-renderer
lang: ar
---

تتيح لك وسيطة عارض JSX (JSX Renderer Middleware) إعداد التخطيط (layout) عند عرض JSX باستخدام `c.render()` الدالة، دون الحاجة إلى استخدام `c.setRenderer()`. بالإضافة إلى ذلك، يتيح الوصول إلى نسخ من Context داخل المكونات من خلال استخدام `useRequestContext()`.

## Import

```ts
import { Hono } from 'hono'
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'
```

## الاستخدام

```jsx
const app = new Hono()

app.get(
  '/page/*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <body>
          <header>Menu</header>
          <div>{children}</div>
        </body>
      </html>
    )
  })
)

app.get('/page/about', (c) => {
  return c.render(<h1>About me!</h1>)
})
```

## الخيارات

### <Badge type="info" text="optional" /> docType: `boolean` | `string`

إذا كنت لا تريد إضافة DOCTYPE في بداية HTML، فاضبط `docType` الخيار إلى `false`.

```tsx
app.use(
  '*',
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
          <body>{children}</body>
        </html>
      )
    },
    { docType: false }
  )
)
```

ويمكنك تحديد DOCTYPE.

```tsx
app.use(
  '*',
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
          <body>{children}</body>
        </html>
      )
    },
    {
      docType:
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
    }
  )
)
```

### <Badge type="info" text="optional" /> stream: `boolean` | `Record<string, string>`

إذا ضبطته على `true` أو قدم قيمة سجل (Record)، فسيتم عرضها كاستجابة بث (streaming response).

```tsx
const AsyncComponent = async () => {
  await new Promise((r) => setTimeout(r, 1000)) // sleep 1s
  return <div>Hi!</div>
}

app.get(
  '*',
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
          <body>
            <h1>SSR Streaming</h1>
            {children}
          </body>
        </html>
      )
    },
    { stream: true }
  )
)

app.get('/', (c) => {
  return c.render(
    <Suspense fallback={<div>loading...</div>}>
      <AsyncComponent />
    </Suspense>
  )
})
```

إذا `true` مضبوط، تُضاف الترويسات التالية:

```ts
{
  'Transfer-Encoding': 'chunked',
  'Content-Type': 'text/html; charset=UTF-8',
  'Content-Encoding': 'Identity'
}
```

يمكنك تخصيص قيم الرؤوس (headers) عن طريق تحديد قيم السجل (Record).

### خيارات قائمة على الدوال

يمكنك تمرير دالة تستقبل `Context` كائنًا بدلًا من كائن خيارات ثابت. يتيح لك هذا تعيين الخيارات ديناميكيًا بناءً على سياق الطلب، مثل متغيرات البيئة أو معاملات الطلب.

```tsx
app.use(
  '*',
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
          <body>{children}</body>
        </html>
      )
    },
    (c) => ({
      stream: c.req.header('X-Enable-Streaming') === 'true',
    })
  )
)
```

كمثال ملموس، يمكنك استخدام هذا لتعطيل البث (streaming) عند توليد المواقع الثابتة (SSG) باستخدام `<Suspense>`، باستخدام [`isSSGContext`](https://hono.dev/docs/helpers/ssg#isssgcontext) helper:

```tsx
app.use(
  '*',
  jsxRenderer(
    ({ children }) => {
      return (
        <div>
          <Suspense fallback={'loading...'}>
            <Component />
          </Suspense>
        </div>
      )
    },
    (c) => ({
      stream: !isSSGContext(c),
    })
  )
)
```

## التخطيطات المتداخلة

الـ `Layout` تتيح المكوّنة (component) تعشيش التخطيطات (layouts).

```tsx
app.use(
  jsxRenderer(({ children }) => {
    return (
      <html>
        <body>{children}</body>
      </html>
    )
  })
)

const blog = new Hono()
blog.use(
  jsxRenderer(({ children, Layout }) => {
    return (
      <Layout>
        <nav>Blog Menu</nav>
        <div>{children}</div>
      </Layout>
    )
  })
)

app.route('/blog', blog)
```

## `useRequestContext()`

`useRequestContext()` يُرجع نسخة من Context.

```tsx
import { useRequestContext, jsxRenderer } from 'hono/jsx-renderer'

const app = new Hono()
app.use(jsxRenderer())

const RequestUrlBadge: FC = () => {
  const c = useRequestContext()
  return <b>{c.req.url}</b>
}

app.get('/page/info', (c) => {
  return c.render(
    <div>
      You are accessing: <RequestUrlBadge />
    </div>
  )
})
```

لا يمكنك استخدام `useRequestContext()` باستخدام Deno `precompile` خيار JSX. استخدم `react-jsx`:

```json
   "compilerOptions": {
     "jsx": "precompile", // [!code --]
     "jsx": "react-jsx", // [!code ++]
     "jsxImportSource": "hono/jsx"
   }
 }
```


## التوسيع `ContextRenderer`

من خلال تعريف `ContextRenderer` كما هو موضح أدناه، يمكنك تمرير محتوى إضافي إلى المُصيِّر (renderer). هذا مفيد، على سبيل المثال، عندما تريد تغيير محتويات وسم head اعتمادًا على الصفحة.

```tsx
declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: { title: string }
    ): Response
  }
}

const app = new Hono()

app.get(
  '/page/*',
  jsxRenderer(({ children, title }) => {
    return (
      <html>
        <head>
          <title>{title}</title>
        </head>
        <body>
          <header>Menu</header>
          <div>{children}</div>
        </body>
      </html>
    )
  })
)

app.get('/page/favorites', (c) => {
  return c.render(
    <div>
      <ul>
        <li>Eating sushi</li>
        <li>Watching baseball games</li>
      </ul>
    </div>,
    {
      title: 'My favorites',
    }
  )
})
```
