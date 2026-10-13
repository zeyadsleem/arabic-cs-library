---
title: "`JSX`"
book: hono
chapter: guides
slug: jsx
order: 74
source: https://hono.dev/docs/guides/jsx
lang: ar
---

يمكنك كتابة HTML ببنية JSX باستخدام `hono/jsx`.

على الرغم من `hono/jsx` يعمل على العميل، وستستخدمه غالبًا عند تصيير المحتوى على جانب الخادم. إليك بعض الأمور المتعلقة بـ JSX المشتركة بين الخادم والعميل.

## الإعدادات

لاستخدام JSX، عدّل `tsconfig.json`:

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"
  }
}
```

بدلًا من ذلك، استخدم توجيهات pragma:

```ts
/** @jsx jsx */
/** @jsxImportSource hono/jsx */
```

بالنسبة إلى Deno، عليك تعديل `deno.json` بدلاً من `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "@hono/hono/jsx"
  }
}
```

## الاستخدام

إذا كنت قادمًا مباشرةً من [البدء السريع](https://hono.dev/docs/#quick-start)، يحتوي الملف الرئيسي على `.ts` الامتداد - تحتاج إلى تغييره إلى `.tsx` - وإلا فلن تتمكن من تشغيل التطبيق إطلاقًا. يجب عليك أيضًا تعديل `package.json` (أو `deno.json` إذا كنت تستخدم Deno) لتعكس ذلك التغيير (على سبيل المثال، بدلًا من وجود `bun run --hot src/index.ts` في نص التطوير (dev script)، ينبغي أن يكون لديك `bun run --hot src/index.tsx`).

`index.tsx`:

```tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

const app = new Hono()

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </Layout>
  )
}

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

export default app
```

## رفع البيانات الوصفية

يمكنك كتابة وسوم البيانات الوصفية للمستند مثل `<title>`, `<link>`، و `<meta>` مباشرة داخل مكوناتك. سيتم رفع هذه الوسوم (tags) تلقائيًا إلى `<head>` قسم من المستند. يكون هذا مفيداً بشكل خاص عندما `<head>` يتم عرض العنصر بعيدًا عن المكوّن الذي يحدد البيانات الوصفية (metadata) المناسبة.

```tsx
import { Hono } from 'hono'

const app = new Hono()

app.use('*', async (c, next) => {
  c.setRenderer((content) => {
    return c.html(
      <html>
        <head></head>
        <body>{content}</body>
      </html>
    )
  })
  await next()
})

app.get('/about', (c) => {
  return c.render(
    <>
      <title>About Page</title>
      <meta name='description' content='This is the about page.' />
      about page content
    </>
  )
})

export default app
```

عند حدوث الرفع (hoisting)، لا تتم إزالة العناصر الموجودة. تتم إضافة العناصر الظاهرة لاحقًا إلى النهاية. على سبيل المثال، إذا كان لديك `<title>Default</title>` في `<head>` ويُصيّر مكوّن `<title>Page Title</title>`، سيظهر كلا العنوانين في head.

## Fragment

استخدم Fragment لتجميع عناصر متعددة دون إضافة عُقد (nodes) إضافية:

```tsx
import { Fragment } from 'hono/jsx'

const List = () => (
  <Fragment>
    <p>first child</p>
    <p>second child</p>
    <p>third child</p>
  </Fragment>
)
```

أو يمكنك كتابتها باستخدام `<></>` إذا أُعدّ بشكل صحيح.

```tsx
const List = () => (
  <>
    <p>first child</p>
    <p>second child</p>
    <p>third child</p>
  </>
)
```

## `PropsWithChildren`

يمكنك استخدام `PropsWithChildren` لاستنتاج عنصر فرعي (child element) بشكل صحيح في مكوّن دالة (function component).

```tsx
import { PropsWithChildren } from 'hono/jsx'

type Post = {
  id: number
  title: string
}

function Component({ title, children }: PropsWithChildren<Post>) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

## إدراج HTML خام

لإدراج HTML مباشرة، استخدم `dangerouslySetInnerHTML`:

```tsx
app.get('/foo', (c) => {
  const inner = { __html: 'JSX &middot; SSR' }
  const Div = <div dangerouslySetInnerHTML={inner} />
})
```

## الحفظ المؤقت

حسِّن مكوّناتك عبر تخزين النصوص المحسوبة مؤقتاً (memoizing) باستخدام `memo`:

```tsx
import { memo } from 'hono/jsx'

const Header = memo(() => <header>Welcome to Hono</header>)
const Footer = memo(() => <footer>Powered by Hono</footer>)
const Layout = (
  <div>
    <Header />
    <p>Hono is cool!</p>
    <Footer />
  </div>
)
```

## السياق

باستخدام `useContext`، يمكنك مشاركة البيانات عالميًا عبر أي مستوى من شجرة المكونات دون تمرير القيم عبر الخصائص (props).

```tsx
import type { FC } from 'hono/jsx'
import { createContext, useContext } from 'hono/jsx'

const themes = {
  light: {
    color: '#000000',
    background: '#eeeeee',
  },
  dark: {
    color: '#ffffff',
    background: '#222222',
  },
}

const ThemeContext = createContext(themes.light)

const Button: FC = () => {
  const theme = useContext(ThemeContext)
  return <button style={theme}>Push!</button>
}

const Toolbar: FC = () => {
  return (
    <div>
      <Button />
    </div>
  )
}

// ...

app.get('/', (c) => {
  return c.html(
    <div>
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    </div>
  )
})
```

## مكوّن غير متزامن

`hono/jsx` يدعم مكوّنًا غير متزامن، لذا يمكنك استخدام `async`/`await` في مكوّنك.
إذا قمت بعرضه باستخدام `c.html()`، سينتظر تلقائيًا.

```tsx
const AsyncComponent = async () => {
  await new Promise((r) => setTimeout(r, 1000)) // sleep 1s
  return <div>Done!</div>
}

app.get('/', (c) => {
  return c.html(
    <html>
      <body>
        <AsyncComponent />
      </body>
    </html>
  )
})
```

## Suspense <Badge style="vertical-align: middle;" type="warning" text="Experimental" />

الشبيه بـ `React` `Suspense` الميزة متاحة.
إذا قمت بتغليف المكوّن غير المتزامن بـ `Suspense`، سيتم عرض المحتوى في الاحتياط (fallback) أولًا، وبمجرد حل الوعد (Promise)، سيتم عرض المحتوى المُنتظَر.
يمكنك استخدامه مع `renderToReadableStream()`.

```tsx
import { renderToReadableStream, Suspense } from 'hono/jsx/streaming'

//...

app.get('/', (c) => {
  const stream = renderToReadableStream(
    <html>
      <body>
        <Suspense fallback={<div>loading...</div>}>
          <Component />
        </Suspense>
      </body>
    </html>
  )
  return c.body(stream, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Transfer-Encoding': 'chunked',
    },
  })
})
```

## ErrorBoundary <Badge style="vertical-align: middle;" type="warning" text="Experimental" />

يمكنك التقاط الأخطاء في المكوّنات الفرعية باستخدام `ErrorBoundary`.

في المثال أدناه، سيعرض المحتوى المحدَّد في `fallback` إذا حدث خطأ.

```tsx
function SyncComponent() {
  throw new Error('Error')
  return <div>Hello</div>
}

app.get('/sync', async (c) => {
  return c.html(
    <html>
      <body>
        <ErrorBoundary fallback={<div>Out of Service</div>}>
          <SyncComponent />
        </ErrorBoundary>
      </body>
    </html>
  )
})
```

`ErrorBoundary` يمكن استخدامه أيضًا مع المكوّنات غير المتزامنة و `Suspense`.

```tsx
async function AsyncComponent() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  throw new Error('Error')
  return <div>Hello</div>
}

app.get('/with-suspense', async (c) => {
  return c.html(
    <html>
      <body>
        <ErrorBoundary fallback={<div>Out of Service</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncComponent />
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
})
```

## StreamingContext <Badge style="vertical-align: middle;" type="warning" text="Experimental" />

يمكنك استخدام `StreamingContext` لتوفير تهيئة لمكوّنات البث (streaming) مثل `Suspense` و `ErrorBoundary`. هذا مفيد لإضافة قيم nonce إلى وسوم السكربت (script tags) الناتجة عن هذه المكونات لسياسة أمان المحتوى (CSP).

```tsx
import { Suspense, StreamingContext } from 'hono/jsx/streaming'

// ...

app.get('/', (c) => {
  const stream = renderToReadableStream(
    <html>
      <body>
        <StreamingContext
          value={{ scriptNonce: 'random-nonce-value' }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncComponent />
          </Suspense>
        </StreamingContext>
      </body>
    </html>
  )

  return c.body(stream, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Transfer-Encoding': 'chunked',
      'Content-Security-Policy':
        "script-src 'nonce-random-nonce-value'",
    },
  })
})
```

الـ `scriptNonce` ستُضاف القيمة تلقائيًا إلى أي `<script>` الوسوم المولَّدة بواسطة `Suspense` و `ErrorBoundary` المكوّنات.

## التكامل مع البرمجية الوسيطة html

اجمع بين وسيطتي JSX وHTML للحصول على قوالب (templating) قوية.
للحصول على تفاصيل متعمقة، راجع [توثيق وسيط HTML](https://hono.dev/docs/helpers/html).

```tsx
import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

interface SiteData {
  title: string
  children?: any
}

const Layout = (props: SiteData) =>
  html`<!doctype html>
    <html>
      <head>
        <title>${props.title}</title>
      </head>
      <body>
        ${props.children}
      </body>
    </html>`

const Content = (props: { siteData: SiteData; name: string }) => (
  <Layout {...props.siteData}>
    <h1>Hello {props.name}</h1>
  </Layout>
)

app.get('/:name', (c) => {
  const { name } = c.req.param()
  const props = {
    name: name,
    siteData: {
      title: 'JSX with html sample',
    },
  }
  return c.html(<Content {...props} />)
})

export default app
```

## مع برمجية وسيطة لعرض JSX

الـ [البرمجية الوسيطة JSX Renderer](https://hono.dev/docs/middleware/builtin/jsx-renderer) يتيح لك إنشاء صفحات HTML بسهولة أكبر باستخدام JSX.

## تجاوز تعريفات الأنواع

يمكنك تجاوز تعريف النوع (type definition) لإضافة عناصرك وسماتك المخصصة.

```ts
declare module 'hono/jsx' {
  namespace JSX {
    interface IntrinsicElements {
      'my-custom-element': HTMLAttributes & {
        'x-event'?: 'click' | 'scroll'
      }
    }
  }
}
```
