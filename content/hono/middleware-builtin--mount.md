---
title: "تركيب البرمجية الوسيطة"
book: hono
chapter: middleware-builtin
slug: mount
order: 46
source: https://hono.dev/docs/middleware/builtin/mount
lang: ar
---

تتيح لك وسيطة التركيب (Mount Middleware) تركيب تطبيق مبني بإطار عمل آخر داخل تطبيق Hono الخاص بك.

## Import

```ts twoslash
import { Hono } from 'hono'
import { mount } from 'hono/mount'
```

## الاستخدام

سجّل الوسيط بـ `app.all()` على مسار ينتهي بـ `/*`:

```ts
import { Router as IttyRouter } from 'itty-router'

// Create itty-router application
const ittyRouter = IttyRouter()

// Handle `GET /itty-router/hello`
ittyRouter.get('/hello', () => new Response('Hello from itty-router'))

const app = new Hono()

app.all('/itty-router/*', mount(ittyRouter.handle))
```

افتراضيًا، يستقبل التطبيق المُثبَّت `Request` مع إزالة بادئة المسار المطابقة (path prefix) من عنوان URL الخاص به. الطلب إلى `/itty-router/hello` يصل إلى itty-router كـ `/hello`.

يُستدعى التطبيق المُثبَّت (mounted) كـ `handler(request, c.env, c.executionCtx)`، نفس وسائط Cloudflare Workers `fetch` المعالج. استخدم `optionHandler` لتمرير وسائط مختلفة.

## الخيارات

يمكنك تمرير دالة أو كائن (object) كوسيط ثانٍ.

### <Badge type="info" text="optional" /> `optionHandler`: `(c: Context) => unknown`

يعيد الوسائط (arguments) الممرَّرة إلى التطبيق المُثبَّت (mounted) بعد `Request`. يتم توسيع المصفوفة إلى عدة وسائط. يمكنك تمرير الدالة مباشرة كوسيطة ثانية:

```ts twoslash
import { Hono } from 'hono'
import { mount } from 'hono/mount'
const app = new Hono()
const anotherApp = (request: Request, ...args: unknown[]) =>
  new Response(request.url)
// ---cut---
// Call `anotherApp(request, c.env)`
app.all(
  '/app/*',
  mount(anotherApp, (c) => c.env)
)

// Call `anotherApp(request, c.env, c.executionCtx)`
app.all(
  '/app/*',
  mount(anotherApp, {
    optionHandler: (c) => [c.env, c.executionCtx],
  })
)
```

### <Badge type="info" text="optional" /> replaceRequest: `((originalRequest: Request) => Request) | false`

يتحكم في أي `Request` يُمرَّر إلى التطبيق المُثبَّت:

```ts twoslash
import { Hono } from 'hono'
import { mount } from 'hono/mount'
const app = new Hono()
const anotherApp = (request: Request, ...args: unknown[]) =>
  new Response(request.url)
// ---cut---
// `/legacy/users` reaches the mounted application as `/api/users`
app.all(
  '/legacy/*',
  mount(anotherApp, {
    replaceRequest: (req) => {
      const url = new URL(req.url)
      url.pathname = url.pathname.replace(/^\/legacy/, '/api')
      return new Request(url, req)
    },
  })
)
```

لتمرير الأصلي `Request` دون تغيير، اضبطه على `false` كاختصار لـ `(req) => req`:

```ts twoslash
import { Hono } from 'hono'
import { mount } from 'hono/mount'
const app = new Hono()
const anotherApp = (request: Request, ...args: unknown[]) =>
  new Response(request.url)
// ---cut---
app.all(
  '/app/*',
  mount(anotherApp, {
    replaceRequest: false,
  })
)
```
