---
title: "السياق"
book: hono
chapter: api
slug: context
order: 85
source: https://hono.dev/docs/api/context
lang: ar
---

الـ `Context` يتم إنشاء مثيل للكائن لكل طلب والاحتفاظ به حتى يتم إرجاع الاستجابة. يمكنك وضع قيم فيه، وتعيين ترويسات ورمز حالة تريد إرجاعه، والوصول إلى كائنات HonoRequest و Response.

## req

`req` نسخة من HonoRequest. لمزيد من التفاصيل، راجع [`HonoRequest`](https://hono.dev/docs/api/request).

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/hello', (c) => {
  const userAgent = c.req.header('User-Agent')
  // ...
  // ---cut-start---
  return c.text(`Hello, ${userAgent}`)
  // ---cut-end---
})
```

## status()

يمكنك ضبط رمز حالة HTTP بـ `c.status()`. القيمة الافتراضية هي `200`. لست مضطرًا لاستخدام `c.status()` إذا كان الكود هو `200`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.post('/posts', (c) => {
  // Set HTTP status code
  c.status(201)
  return c.text('Your post is created!')
})
```

## header()

يمكنك تعيين ترويسات HTTP للاستجابة.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/', (c) => {
  // Set headers
  c.header('X-Message', 'My custom message')
  return c.text('Hello!')
})
```

## body()

أعِد استجابة HTTP.

**ملاحظة**: عند إرجاع نص أو HTML، يُنصح باستخدام `c.text()` أو `c.html()`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/welcome', (c) => {
  c.header('Content-Type', 'text/plain')
  // Return the response body
  return c.body('Thank you for coming')
})
```

يمكنك أيضًا كتابة ما يلي.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/welcome', (c) => {
  return c.body('Thank you for coming', 201, {
    'X-Message': 'Hello!',
    'Content-Type': 'text/plain',
  })
})
```

الاستجابة هي نفسها `Response` كائن كما أدناه.

```ts twoslash
new Response('Thank you for coming', {
  status: 201,
  headers: {
    'X-Message': 'Hello!',
    'Content-Type': 'text/plain',
  },
})
```

## text()

تقديم النص كـ `Content-Type: text/plain`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/say', (c) => {
  return c.text('Hello!')
})
```

## json()

تقديم JSON كـ `Content-Type: application/json`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/api', (c) => {
  return c.json({ message: 'Hello!' })
})
```

## html()

تقديم HTML كـ `Content-Type: text/html`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/', (c) => {
  return c.html('<h1>Hello! Hono!</h1>')
})
```

## notFound()

أعِد `Not Found` Response. يمكنك تخصيصها بـ [`app.notFound()`](https://hono.dev/docs/api/hono#not-found).

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/notfound', (c) => {
  return c.notFound()
})
```

## redirect()

Redirect، رمز الحالة الافتراضي هو `302`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/redirect', (c) => {
  return c.redirect('/')
})
app.get('/redirect-permanently', (c) => {
  return c.redirect('/', 301)
})
```

## res

يمكنك الوصول إلى كائن [Response] الذي سيُعاد.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
// Response object
app.use('/', async (c, next) => {
  await next()
  c.res.headers.append('X-Debug', 'Debug message')
})
```

[Response]: https://developer.mozilla.org/en-US/docs/Web/API/Response

## set() / get()

احصل على أزواج مفاتيح-قيم عشوائية وعيّنها، بعمر يساوي عمر الطلب الحالي. يتيح هذا تمرير قيم محددة بين الوسائط أو من الوسائط إلى معالجات المسارات.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono<{ Variables: { message: string } }>()
// ---cut---
app.use(async (c, next) => {
  c.set('message', 'Hono is cool!!')
  await next()
})

app.get('/', (c) => {
  const message = c.get('message')
  return c.text(`The message is "${message}"`)
})
```

مرِّر `Variables` كأنواع عامة (Generics) إلى مُنشئ `Hono` لجعله آمنًا من حيث الأنواع.

```ts twoslash
import { Hono } from 'hono'
// ---cut---
type Variables = {
  message: string
}

const app = new Hono<{ Variables: Variables }>()
```

قيمة `c.set` / `c.get` تبقى محفوظة فقط داخل نفس الطلب. لا يمكن مشاركتها أو استمرارها عبر طلبات مختلفة.

## var

يمكنك أيضًا الوصول إلى قيمة متغيّر عبر `c.var`.

```ts twoslash
import type { Context } from 'hono'
declare const c: Context
// ---cut---
const result = c.var.client.oneMethod()
```

إذا أردت إنشاء وسيط (middleware) يوفر طريقة (method) مخصصة،
اكتب كما يلي:

```ts twoslash
import { Hono } from 'hono'
import { createMiddleware } from 'hono/factory'
// ---cut---
type Env = {
  Variables: {
    echo: (str: string) => string
  }
}

const app = new Hono()

const echoMiddleware = createMiddleware<Env>(async (c, next) => {
  c.set('echo', (str) => str)
  await next()
})

app.get('/echo', echoMiddleware, (c) => {
  return c.text(c.var.echo('Hello!'))
})
```

إذا أردت استخدام الوسيط (middleware) في عدة معالجات (handlers)، يمكنك استخدام `app.use()`.
بعد ذلك، عليك تمرير `Env` كأنواع عامة (Generics) إلى مُنشئ `Hono` لجعله آمنًا من حيث الأنواع.

```ts twoslash
import { Hono } from 'hono'
import type { MiddlewareHandler } from 'hono/types'
declare const echoMiddleware: MiddlewareHandler
type Env = {
  Variables: {
    echo: (str: string) => string
  }
}
// ---cut---
const app = new Hono<Env>()

app.use(echoMiddleware)

app.get('/echo', (c) => {
  return c.text(c.var.echo('Hello!'))
})
```

## render() / setRenderer()

يمكنك تعيين تخطيط باستخدام `c.setRenderer()` داخل وسيط مخصص.

```tsx twoslash
/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.use(async (c, next) => {
  c.setRenderer((content) => {
    return c.html(
      <html>
        <body>
          <p>{content}</p>
        </body>
      </html>
    )
  })
  await next()
})
```

بعد ذلك، يمكنك الاستفادة من `c.render()` لإنشاء استجابات داخل هذا التخطيط (layout).

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/', (c) => {
  return c.render('Hello!')
})
```

ستكون المخرجات كالتالي:

```html
<html>
  <body>
    <p>Hello!</p>
  </body>
</html>
```

بالإضافة إلى ذلك، توفر هذه الميزة مرونةً في تخصيص الوسائط (arguments).
لضمان أمان الأنواع، يمكن تعريف الأنواع كما يلي:

```ts
declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head: { title: string }
    ): Response | Promise<Response>
  }
}
```

إليك مثالًا على كيفية استخدام هذا:

```ts
app.use('/pages/*', async (c, next) => {
  c.setRenderer((content, head) => {
    return c.html(
      <html>
        <head>
          <title>{head.title}</title>
        </head>
        <body>
          <header>{head.title}</header>
          <p>{content}</p>
        </body>
      </html>
    )
  })
  await next()
})

app.get('/pages/my-favorite', (c) => {
  return c.render(<p>Ramen and Sushi</p>, {
    title: 'My favorite',
  })
})

app.get('/pages/my-hobbies', (c) => {
  return c.render(<p>Watching baseball</p>, {
    title: 'My hobbies',
  })
})
```

## executionCtx

يمكنك الوصول إلى الميزات الخاصة بـ Cloudflare Workers [ExecutionContext](https://developers.cloudflare.com/workers/runtime-apis/context/).

```ts twoslash
import { Hono } from 'hono'
const app = new Hono<{
  Bindings: {
    KV: any
  }
}>()
declare const key: string
declare const data: string
// ---cut---
// ExecutionContext object
app.get('/foo', async (c) => {
  c.executionCtx.waitUntil(c.env.KV.put(key, data))
  // ...
})
```

الـ `ExecutionContext` يمتلك أيضًا [`exports`](https://developers.cloudflare.com/workers/runtime-apis/context/#exports) حقل. للحصول على الإكمال التلقائي مع الأنواع التي يولّدها Wrangler، يمكنك استخدام توسيع الوحدة (module augmentation):

```ts
import 'hono'

declare module 'hono' {
  interface ExecutionContext {
    readonly exports: Cloudflare.Exports
  }
}
```

## event

يمكنك الوصول إلى الميزات الخاصة بـ Cloudflare Workers `FetchEvent`. كان هذا مستخدمًا في صيغة "Service Worker". لكنه غير موصى به الآن.

```ts twoslash
import { Hono } from 'hono'
declare const key: string
declare const data: string
type KVNamespace = any
// ---cut---
// Type definition to make type inference
type Bindings = {
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// FetchEvent object (only set when using Service Worker syntax)
app.get('/foo', async (c) => {
  c.event.waitUntil(c.env.MY_KV.put(key, data))
  // ...
})
```

## env

في Cloudflare Workers، تُعرف متغيرات البيئة والأسرار ومساحات أسماء KV وقاعدة بيانات D1 وحاوية R2 bucket وما إلى ذلك المرتبطة بالعامل (worker) باسم الارتباطات (bindings).
بغض النظر عن النوع، تتوفر الارتباطات (bindings) دائمًا كمتغيرات عامة ويمكن الوصول إليها عبر السياق `c.env.BINDING_KEY`.

```ts twoslash
import { Hono } from 'hono'
type KVNamespace = any
// ---cut---
// Type definition to make type inference
type Bindings = {
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// Environment object for Cloudflare Workers
app.get('/', async (c) => {
  c.env.MY_KV.get('my-key')
  // ...
})
```

## error

إذا رمى المعالج (Handler) خطأً، يوضع كائن الخطأ (error object) في `c.error`.
يمكنك الوصول إليه في برمجيتك الوسيطة.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.use(async (c, next) => {
  await next()
  if (c.error) {
    // do something...
  }
})
```

## ContextVariableMap

`ContextVariableMap` يضيف الأنواع **عمومًا** إلى جميع السياقات، بغض النظر عما إذا كان الوسيط الذي يعيّن المتغير قد تم تشغيله فعليًا. هذا يعني `c.get('result')` ستبدو آمنة من ناحية الأنواع حتى في المعالجات التي لم تُسجَّل فيها وسيطتك مطلقًا، مما قد يخفي `undefined` أخطاء أثناء التنفيذ.

ألقِ نظرة على المثال التالي:

```ts
declare module 'hono' {
  interface ContextVariableMap {
    result: string
  }
}

const mw = createMiddleware(async (c, next) => {
  c.set('result', 'some values')
  await next()
})

const app = new Hono()

// handler uses the middleware
app.get('/foo', mw, (c) => {
  const val = c.get('result') // ✅ val is a string and typed as such, as expected
})

// handler doesn't use the middleware
app.get('/bar', (c) => {
  const val = c.get('result') // ❌ val is undefined but typed as a string, which can lead to runtime errors
})
```


يمكنك توسيع `ContextVariableMap` واجهة لتحديد أنواع متغيرات السياق عمومًا عبر تطبيقك بالكامل. هذا مناسب عندما يتم تعيين متغير بواسطة وسيط يُطبق على مستوى التطبيق ويكون مضمون الوجود في السياق.

على سبيل المثال:

```ts
declare module 'hono' {
  interface ContextVariableMap {
    result: string
  }
}
```

يمكنك بعد ذلك الاستفادة من هذا في وسيطك:

```ts twoslash
import { createMiddleware } from 'hono/factory'
// ---cut---
const mw = createMiddleware(async (c, next) => {
  c.set('result', 'some values') // result is a string
  await next()
})
```

في معالج (handler)، يُستنتَج المتغيّر بالنوع المناسب:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono<{ Variables: { result: string } }>()
// ---cut---
app.get('/', (c) => {
  const val = c.get('result') // val is a string
  // ...
  return c.json({ result: val })
})
```
