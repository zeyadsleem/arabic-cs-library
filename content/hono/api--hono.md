---
title: "App - Hono"
book: hono
chapter: api
slug: hono
order: 83
source: https://hono.dev/docs/api/hono
lang: ar
---

`Hono` هو الكائن الأساسي.
سيتم استيراده أولًا واستخدامه حتى النهاية.

```ts twoslash
import { Hono } from 'hono'

const app = new Hono()
//...

export default app // for Cloudflare Workers or Bun
```

## الطرق

نسخة من `Hono` يمتلك الدوال التالية.

- app.**HTTP_METHOD**(\[path,\]handler|middleware...)
- app.**all**(\[path,\]handler|middleware...)
- app.**on**(method|method[], path|path[], handler|middleware...)
- app.**use**(\[path,\]middleware)
- app.**route**(path, \[app\])
- app.**basePath**(path)
- app.**notFound**(handler)
- app.**onError**(err, handler)
- app.**mount**(path, anotherApp, \[options\])
- app.**fire**()
- app.**fetch**(request, env, event)
- app.**request**(path, options)

الجزء الأول منها يُستخدم للتوجيه (routing)، يُرجى الرجوع إلى [قسم التوجيه](https://hono.dev/docs/api/routing).

## غير موجود

`app.notFound` يتيح لك تخصيص استجابة Not Found.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})
```

الـ `notFound` تُستدعى الطريقة (method) فقط من التطبيق ذي المستوى الأعلى (top-level). لمزيد من المعلومات، راجع هذا [مشكلة](https://github.com/honojs/hono/issues/3465#issuecomment-2381210165).

## معالجة الأخطاء

`app.onError` يتيح لك التعامل مع الأخطاء غير الملتقطة (uncaught errors) وإرجاع استجابة (Response) مخصصة.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})
```

إذا كان لكلٍّ من التطبيق الأب ومساراتِه `onError` المعالجات، تحصل معالجات مستوى المسار على الأولوية.

## fire()

**`app.fire()` مهمَل**. استخدم `fire()` من `@hono/service-worker` بدلاً من ذلك. راجع [توثيق Service Worker](https://hono.dev/docs/getting-started/service-worker) لمزيد من التفاصيل.

`app.fire()` يضيف تلقائيًا `fetch` مستمع الأحداث.

يمكن أن يكون هذا مفيداً للبيئات التي تلتزم بـ [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)، مثل [Cloudflare Workers غير المعتمدة على وحدات ES](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/).

`app.fire()` ينفّذ ما يلي نيابةً عنك:

```ts
addEventListener('fetch', (event: FetchEventLike): void => {
  event.respondWith(this.dispatch(...))
})
```

## fetch()

`app.fetch` ستكون نقطة الدخول لتطبيقك.

بالنسبة لـ Cloudflare Workers، يمكنك استخدام ما يلي:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
type Env = any
type ExecutionContext = any
// ---cut---
export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx)
  },
}
```

أو ببساطة نفّذ:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
export default app
```

Bun:

<!-- prettier-ignore -->
```ts
export default app // [!code --]
export default {  // [!code ++]
  port: 3000, // [!code ++]
  fetch: app.fetch, // [!code ++]
} // [!code ++]
```

## request()

`request` طريقة مفيدة للاختبار.

يمكنك تمرير عنوان URL أو اسم مسار (pathname) لإرسال طلب GET.
`app` سيُرجع `Response` كائن.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
declare const test: (name: string, fn: () => void) => void
declare const expect: (value: any) => any
// ---cut---
test('GET /hello is ok', async () => {
  const res = await app.request('/hello')
  expect(res.status).toBe(200)
})
```

يمكنك أيضًا تمرير `Request` الكائن:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
declare const test: (name: string, fn: () => void) => void
declare const expect: (value: any) => any
// ---cut---
test('POST /message is ok', async () => {
  const req = new Request('Hello!', {
    method: 'POST',
  })
  const res = await app.request(req)
  expect(res.status).toBe(201)
})
```

## mount()

**`app.mount()` مهمَل**. استخدم [تركيب البرمجية الوسيطة](https://hono.dev/docs/middleware/builtin/mount) بدلاً من ذلك.

الـ `mount()` تتيح لك تركيب (mount) تطبيقات مبنية بأطر عمل أخرى داخل تطبيق Hono الخاص بك.

```ts
import { Router as IttyRouter } from 'itty-router'
import { Hono } from 'hono'

// Create itty-router application
const ittyRouter = IttyRouter()

// Handle `GET /itty-router/hello`
ittyRouter.get('/hello', () => new Response('Hello from itty-router'))

// Hono application
const app = new Hono()

// Mount!
app.mount('/itty-router', ittyRouter.handle)
```

بشكل افتراضي، `mount()` يمرّر جديدًا `Request` مع إزالة مسار التثبيت من عنوان URL الخاص به. قدّم `replaceRequest` دالة للتحكم في `Request` يُمرَّر إلى التطبيق المُثبَّت:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
const handler = (request: Request) => new Response(request.url)
// ---cut---
app.mount('/app', handler, {
  replaceRequest: (originalRequest) => originalRequest,
})
```

لتمرير الأصلي `Request` دون تغيير، اضبط `replaceRequest` إلى `false` كاختصار للدالة أعلاه:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
const handler = (request: Request) => new Response(request.url)
// ---cut---
app.mount('/app', handler, {
  replaceRequest: false,
})
```

## الوضع الصارم

الوضع الصارم افتراضيًا `true` ويميّز المسارات التالية.

- `/hello`
- `/hello/`

`app.get('/hello')` لن يتطابق `GET /hello/`.

عند تعيين الوضع الصارم إلى `false`، سيعامل المساران على قدم المساواة.

```ts twoslash
import { Hono } from 'hono'
// ---cut---
const app = new Hono({ strict: false })
```

## خيار router

الـ `router` يحدِّد الخيار أي موجِّه (router) يُستخدم. الموجِّه الافتراضي هو `SmartRouter`. إذا كنت تريد استخدام `RegExpRouter`، مرّره إلى كائن جديد `Hono` النسخة:

```ts twoslash
import { Hono } from 'hono'
// ---cut---
import { RegExpRouter } from 'hono/router/reg-exp-router'

const app = new Hono({ router: new RegExpRouter() })
```

## الأنواع العامة

يمكنك تمرير Generics لتحديد أنواع ارتباطات Cloudflare Workers والمتغيرات المستخدمة في `c.set`/`c.get`.

```ts twoslash
import { Hono } from 'hono'
type User = any
declare const user: User
// ---cut---
type Bindings = {
  TOKEN: string
}

type Variables = {
  user: User
}

const app = new Hono<{
  Bindings: Bindings
  Variables: Variables
}>()

app.use('/auth/*', async (c, next) => {
  const token = c.env.TOKEN // token is `string`
  // ...
  c.set('user', user) // user should be `User`
  await next()
})
```
