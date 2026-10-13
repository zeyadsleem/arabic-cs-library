---
title: "وسيط تخزين السياق"
book: hono
chapter: middleware-builtin
slug: context-storage
order: 34
source: https://hono.dev/docs/middleware/builtin/context-storage
lang: ar
---

يخزّن وسيط تخزين السياق (Context Storage) `Context` في `AsyncLocalStorage`، لجعله متاحًا على الصعيد العالمي.

**ملاحظة** تستخدم هذه البرمجية الوسيطة `AsyncLocalStorage`. يجب أن تدعمه بيئة التشغيل (runtime).

**Cloudflare Workers**: لتفعيل `AsyncLocalStorage`، أضف [`nodejs_compat` أو `nodejs_als` خيار](https://developers.cloudflare.com/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) إلى `wrangler.toml` ملف.

## Import

```ts
import { Hono } from 'hono'
import {
  contextStorage,
  getContext,
  tryGetContext,
} from 'hono/context-storage'
```

## الاستخدام

الـ `getContext()` سيُعيد كائن السياق الحالي إذا `contextStorage()` يُطبَّق كوسيط (middleware).

```ts
type Env = {
  Variables: {
    message: string
  }
}

const app = new Hono<Env>()

app.use(contextStorage())

app.use(async (c, next) => {
  c.set('message', 'Hello!')
  await next()
})

// You can access the variable outside the handler.
const getMessage = () => {
  return getContext<Env>().var.message
}

app.get('/', (c) => {
  return c.text(getMessage())
})
```

على Cloudflare Workers، يمكنك الوصول إلى الروابط (bindings) خارج المعالج (handler).

```ts
type Env = {
  Bindings: {
    KV: KVNamespace
  }
}

const app = new Hono<Env>()

app.use(contextStorage())

const setKV = (value: string) => {
  return getContext<Env>().env.KV.put('key', value)
}
```

## tryGetContext

`tryGetContext()` يعمل مثل `getContext()`، ولكنه يُرجع `undefined` بدلاً من رمي خطأ عند عدم توفّر السياق (context):

```ts
const context = tryGetContext<Env>()
if (context) {
  // Context is available
  console.log(context.var.message)
}
```
