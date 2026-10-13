---
title: "برمجية وسيطة CORS"
book: hono
chapter: middleware-builtin
slug: cors
order: 35
source: https://hono.dev/docs/middleware/builtin/cors
lang: ar
---

هناك العديد من حالات الاستخدام لـ Cloudflare Workers كواجهات برمجة تطبيقات ويب (Web APIs) واستدعائها من تطبيقات الواجهة الأمامية الخارجية.
لهذا، علينا تنفيذ CORS، فلنفعل ذلك باستخدام وسيط (middleware) أيضًا.

## Import

```ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
```

## الاستخدام

```ts
const app = new Hono()

// CORS should be called before the route
app.use('/api/*', cors())
app.use(
  '/api2/*',
  cors({
    origin: 'http://example.com',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

app.all('/api/abc', (c) => {
  return c.json({ success: true })
})
app.all('/api2/abc', (c) => {
  return c.json({ success: true })
})
```

أصول متعددة:

```ts
app.use(
  '/api3/*',
  cors({
    origin: ['https://example.com', 'https://example.org'],
  })
)

// Or you can use "function"
app.use(
  '/api4/*',
  cors({
    // `c` is a `Context` object
    origin: (origin, c) => {
      return origin.endsWith('.example.com')
        ? origin
        : 'http://example.com'
    },
  })
)
```

طرق مسموح بها ديناميكيًا بناءً على الأصل (origin):

```ts
app.use(
  '/api5/*',
  cors({
    origin: (origin) =>
      origin === 'https://example.com' ? origin : '*',
    // `c` is a `Context` object
    allowMethods: (origin, c) =>
      origin === 'https://example.com'
        ? ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE']
        : ['GET', 'HEAD'],
  })
)
```

## الخيارات

### <Badge type="info" text="optional" /> origin: `string` | `string[]` | `(origin:string, c:Context) => string`

قيمة ترويسة CORS "_Access-Control-Allow-Origin_". يمكنك أيضًا تمرير دالة استدعاء مثل `origin: (origin) => (origin.endsWith('.example.com') ? origin : 'http://example.com')`. القيمة الافتراضية هي `*`.

### <Badge type="info" text="optional" /> `allowMethods`: `string[]` | `(origin:string, c:Context) => string[]`

قيمة ترويسة CORS "_Access-Control-Allow-Methods_". يمكنك أيضًا تمرير دالة استدعاء لتحديد الطرق المسموحة ديناميكيًا بناءً على الأصل (origin). الافتراضي هو `['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'QUERY']`.

### <Badge type="info" text="optional" /> `allowHeaders`: `string[]`

قيمة رأس CORS "_Access-Control-Allow-Headers_". الافتراضي هو `[]`.

### <Badge type="info" text="optional" /> maxAge: `number`

قيمة ترويسة CORS المسماة "_Access-Control-Max-Age_".

### <Badge type="info" text="optional" /> `credentials`: `boolean`

قيمة ترويسة (header) CORS "_Access-Control-Allow-Credentials_".

### <Badge type="info" text="optional" /> `exposeHeaders`: `string[]`

قيمة رأس CORS "_Access-Control-Expose-Headers_". الافتراضي هو `[]`.

## تكوين CORS المعتمد على البيئة

إذا كنت تريد ضبط إعداد CORS وفقًا لبيئة التنفيذ، مثل بيئة التطوير أو الإنتاج، فحقن القيم من متغيرات البيئة أمر مريح لأنه يلغي حاجة التطبيق إلى معرفة بيئة التنفيذ الخاصة به. راجع المثال أدناه للتوضيح.

```ts
app.use('*', async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.CORS_ORIGIN,
  })
  return corsMiddlewareHandler(c, next)
})
```

## الاستخدام مع Vite

عند استخدام Hono مع Vite، يجب عليك تعطيل ميزة CORS المدمجة في Vite عن طريق ضبط `server.cors` إلى `false` في `vite.config.ts`. يمنع هذا التعارضات مع وسيطة CORS الخاصة بـ Hono.

```ts
// vite.config.ts
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    cors: false, // disable Vite's built-in CORS setting
  },
  plugins: [cloudflare()],
})
```
