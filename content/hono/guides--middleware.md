---
title: "الوسيط"
book: hono
chapter: guides
slug: middleware
order: 72
source: https://hono.dev/docs/guides/middleware
lang: ar
---

يعمل الوسيط قبل/بعد نقطة النهاية `Handler`. يمكننا الحصول على `Request` قبل الإرسال أو التلاعب بـ `Response` بعد الإرسال.

## تعريف البرمجيات الوسيطة

- المعالج - ينبغي أن يعيد `Response` كائن. سيُستدعى معالج واحد فقط.
- البرمجيات الوسيطة - ينبغي `await next()` وعدم إرجاع أي شيء لاستدعاء الوسيط (Middleware) التالي، **أو** إرجاع `Response` للخروج المبكر.

يمكن للمستخدم تسجيل البرمجيات الوسيطة باستخدام `app.use` أو باستخدام `app.HTTP_METHOD` بالإضافة إلى المعالجات. في هذه الميزة، من السهل تحديد المسار والأسلوب (method).

```ts
// match any method, all routes
app.use(logger())

// specify path
app.use('/posts/*', cors())

// specify method and path
app.post('/posts/*', basicAuth())
```

إذا أعاد المعالج `Response`، فسيُستخدم للمستخدم النهائي وسيتوقف عن المعالجة.

```ts
app.post('/posts', (c) => c.text('Created!', 201))
```

في هذه الحالة، تتم معالجة أربعة وسائط (middleware) قبل الإرسال (dispatch) على النحو التالي:

```ts
logger() -> cors() -> basicAuth() -> *handler*
```

## ترتيب التنفيذ

يتم تحديد الترتيب الذي تُنفَّذ به الوسائط حسب الترتيب الذي سُجّلت به.
العملية قبل `next` من الوسيطة (Middleware) المسجَّلة أولاً يُنفَّذ أولاً،
والعملية بعد `next` يُنفَّذ أخيرًا.
انظر أدناه.

```ts
app.use(async (_, next) => {
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
})
app.use(async (_, next) => {
  console.log('middleware 2 start')
  await next()
  console.log('middleware 2 end')
})
app.use(async (_, next) => {
  console.log('middleware 3 start')
  await next()
  console.log('middleware 3 end')
})

app.get('/', (c) => {
  console.log('handler')
  return c.text('Hello!')
})
```

النتيجة كما يلي.

```
middleware 1 start
  middleware 2 start
    middleware 3 start
      handler
    middleware 3 end
  middleware 2 end
middleware 1 end
```

لاحظ أنه إذا ألقى المعالج أو أي وسيطة استثناءً (throws)، فسيلتقطه hono ويمرره إما إلى [دالة الاستدعاء app.onError() الخاصة بك](https://hono.dev/docs/api/hono#error-handling) أو تحويله تلقائيًا إلى استجابة 500 قبل إرجاعه لأعلى سلسلة الوسائط. هذا يعني أن next() لن يرمي خطأً أبدًا، لذا لا حاجة لالتفافه في try/catch/finally.

## البرمجيات الوسيطة المدمجة

يمتلك Hono وسيطات مدمجة.

```ts
import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.use(poweredBy())
app.use(logger())

app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)
```

في Deno، من الممكن استخدام إصدار مختلف من الوسيط عن إصدار Hono، لكن هذا يمكن أن يؤدي إلى أخطاء.
على سبيل المثال، هذا الكود لا يعمل لأن الإصدار مختلف.

```ts
import { Hono } from 'jsr:@hono/hono@4.4.0'
import { upgradeWebSocket } from 'jsr:@hono/hono@4.4.5/deno'

const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket(() => ({
    // ...
  }))
)
```


## برمجيات وسيطة مخصصة

يمكنك كتابة وسيطك الخاص مباشرةً داخل `app.use()`:

```ts
// Custom logger
app.use(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})

// Add a custom header
app.use('/message/*', async (c, next) => {
  await next()
  c.header('x-message', 'This is middleware!')
})

app.get('/message/hello', (c) => c.text('Hello Middleware!'))
```

ومع ذلك، تضمين الوسيط مباشرةً داخل `app.use()` قد يحد من قابلية إعادة استخدامه. لذلك، يمكننا فصل الوسائط الخاصة بنا إلى ملفات مختلفة.

لضمان عدم فقدان تعريفات الأنواع لـ `context` و `next`، عند فصل الوسيط (middleware)، يمكننا استخدام [`createMiddleware()`](https://hono.dev/docs/helpers/factory#createmiddleware) من مصنع (factory) Hono. يسمح لنا هذا أيضاً بأمان الأنواع [الوصول إلى البيانات التي `set` في `Context`](https://hono.dev/docs/api/context#set-get) من المعالجات اللاحقة (downstream).

```ts
import { createMiddleware } from 'hono/factory'

const logger = createMiddleware(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})
```

يمكن استخدام الأنواع العامة (generics) مع `createMiddleware`:

```ts
createMiddleware<{Bindings: Bindings}>(async (c, next) =>
```


### تعديل الاستجابة بعد التالي

بالإضافة إلى ذلك، يمكن تصميم الوسائط (middleware) لتعديل الاستجابات عند الحاجة:

```ts
const stripRes = createMiddleware(async (c, next) => {
  await next()
  c.res = undefined
  c.res = new Response('New Response')
})
```

## الوصول إلى السياق داخل وسائط البرمجيات الوسيطة

للوصول إلى السياق (context) داخل وسائط الوسيطة، استخدم مباشرة معامل السياق المقدم من `app.use`. راجع المثال أدناه للتوضيح.

```ts
import { cors } from 'hono/cors'

app.use('*', async (c, next) => {
  const middleware = cors({
    origin: c.env.CORS_ORIGIN,
  })
  return middleware(c, next)
})
```

### توسيع السياق في البرمجيات الوسيطة

لتوسيع السياق داخل الوسيط، استخدم `c.set`. يمكنك جعل هذا آمن الأنواع (type-safe) بتمرير `{ Variables: { yourVariable: YourVariableType } }` وسيط generic إلى `createMiddleware` الدالة.

```ts
import { createMiddleware } from 'hono/factory'

const echoMiddleware = createMiddleware<{
  Variables: {
    echo: (str: string) => string
  }
}>(async (c, next) => {
  c.set('echo', (str) => str)
  await next()
})

app.get('/echo', echoMiddleware, (c) => {
  return c.text(c.var.echo('Hello!'))
})
```

### استنتاج الأنواع عبر البرمجيات الوسيطة المتسلسلة

عندما تُسلسِل عدة وسيطات باستخدام `.use()`، يجمّع Hono تلقائيًا الـ `Variables` الأنواع. يمكن لمعالجات المسارات التي تتبع سلسلة الوسائط الوصول إلى جميع المتغيرات من كل وسيط سابق بطريقة آمنة من حيث الأنواع (type-safe):

```ts
import { createMiddleware } from 'hono/factory'

const authMiddleware = createMiddleware<{
  Variables: { user: { id: string; name: string } }
}>(async (c, next) => {
  c.set('user', { id: '123', name: 'Alice' })
  await next()
})

const dbMiddleware = createMiddleware<{
  Variables: { db: { query: (sql: string) => Promise<unknown> } }
}>(async (c, next) => {
  c.set('db', {
    query: async (sql) => {
      /* ... */
    },
  })
  await next()
})

const app = new Hono()
  .use(authMiddleware)
  .use(dbMiddleware)
  .get('/', (c) => {
    // Both `user` and `db` are available and type-safe
    const user = c.var.user // { id: string; name: string }
    const db = c.var.db // { query: (sql: string) => Promise<unknown> }
    return c.json({ user })
  })
```

يعمل هذا لأن كل `.use()` يُرجع الاستدعاء مثيل Hono جديدًا بالنوع المدمج، لذا ينمو النوع مع تسلسل الوسائط. هذا يلغي الحاجة إلى التصريح يدويًا بنوع مدمج `Env` النوع مسبقًا لمعظم حالات الاستخدام.

## برمجيات وسيطة من طرف ثالث

لا تعتمد الوسائط المدمجة على وحدات خارجية، لكن وسائط الطرف الثالث يمكن أن تعتمد على مكتبات خارجية. لذا معها، قد نصنع تطبيقًا أكثر تعقيدًا.

يمكننا استكشاف مجموعة متنوعة من [برمجيات وسيطة من طرف ثالث](https://hono.dev/docs/middleware/third-party).
على سبيل المثال، لدينا وسيطة خادم GraphQL ووسيطة Sentry ووسيطة مصادقة Firebase وغيرها.
