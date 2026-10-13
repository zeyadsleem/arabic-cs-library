---
title: "مساعد `Factory`"
book: hono
chapter: helpers
slug: factory
order: 60
source: https://hono.dev/docs/helpers/factory
lang: ar
---

يوفر Factory Helper دوالًا مفيدة لإنشاء مكونات Hono مثل الوسائط (Middleware). في بعض الأحيان يصعب تعيين أنواع TypeScript الصحيحة، لكن هذا المساعد يسهل ذلك.

## Import

```ts
import { Hono } from 'hono'
import { createFactory, createMiddleware } from 'hono/factory'
```

## `createFactory()`

`createFactory()` ستنشئ نسخة من صنف Factory.

```ts
import { createFactory } from 'hono/factory'

const factory = createFactory()
```

يمكنك تمرير أنواع Env الخاصة بك كأنواع عامة (Generics):

```ts
type Env = {
  Variables: {
    foo: string
  }
}

const factory = createFactory<Env>()
```

### الخيارات

### <Badge type="info" text="optional" /> defaultAppOptions: `HonoOptions`

الخيارات الافتراضية لتمريرها إلى تطبيق Hono المُنشأ بواسطة `createApp()`.

```ts
const factory = createFactory({
  defaultAppOptions: { strict: false },
})

const app = factory.createApp() // `strict: false` is applied
```

## `createMiddleware()`

`createMiddleware()` اختصار لـ `factory.createMiddleware()`.
ستنشئ هذه الدالة برمجيتك الوسيطة المخصّصة.

```ts
const messageMiddleware = createMiddleware(async (c, next) => {
  await next()
  c.res.headers.set('X-Message', 'Good morning!')
})
```

نصيحة: إذا كنت تريد الحصول على وسيط (argument) مثل `message`، يمكنك إنشاؤه كدالة كما يلي.

```ts
const messageMiddleware = (message: string) => {
  return createMiddleware(async (c, next) => {
    await next()
    c.res.headers.set('X-Message', message)
  })
}

app.use(messageMiddleware('Good evening!'))
```

## `factory.createHandlers()`

`createHandlers()` يساعد على تعريف المعالجات في مكان مختلف عن `app.get('/')`.

```ts
import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'

// ...

const factory = createFactory()

const middleware = factory.createMiddleware(async (c, next) => {
  c.set('foo', 'bar')
  await next()
})

const handlers = factory.createHandlers(logger(), middleware, (c) => {
  return c.json(c.var.foo)
})

app.get('/api', ...handlers)
```

## `factory.createApp()`

`createApp()` يساعد في إنشاء نسخة (instance) من Hono بالأنواع المناسبة. إذا استخدمت هذه الطريقة مع `createFactory()`، يمكنك تجنّب التكرار في تعريف `Env` نوع.

إذا كان تطبيقك مثل هذا، فعليك ضبط `Env` في مكانين:

```ts
import { createMiddleware } from 'hono/factory'

type Env = {
  Variables: {
    myVar: string
  }
}

// 1. Set the `Env` to `new Hono()`
const app = new Hono<Env>()

// 2. Set the `Env` to `createMiddleware()`
const mw = createMiddleware<Env>(async (c, next) => {
  await next()
})

app.use(mw)
```

باستخدام `createFactory()` و `createApp()`، يمكنك ضبط `Env` في مكان واحد فقط.

```ts
import { createFactory } from 'hono/factory'

// ...

// Set the `Env` to `createFactory()`
const factory = createFactory<Env>()

const app = factory.createApp()

// factory also has `createMiddleware()`
const mw = factory.createMiddleware(async (c, next) => {
  await next()
})
```

`createFactory()` يمكنه استقبال `initApp` خيار لتهيئة `app` أنشأه `createApp()`. فيما يلي مثال يستخدم الخيار.

```ts
// factory-with-db.ts
type Env = {
  Bindings: {
    MY_DB: D1Database
  }
  Variables: {
    db: DrizzleD1Database
  }
}

export default createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const db = drizzle(c.env.MY_DB)
      c.set('db', db)
      await next()
    })
  },
})
```

```ts
// crud.ts
import factoryWithDB from './factory-with-db'

const app = factoryWithDB.createApp()

app.post('/posts', (c) => {
  c.var.db.insert()
  // ...
})
```
