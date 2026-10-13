---
title: "مساعد التطوير"
book: hono
chapter: helpers
slug: dev
order: 59
source: https://hono.dev/docs/helpers/dev
lang: ar
---

يوفّر Dev Helper طرقاً مفيدة يمكنك استخدامها أثناء التطوير.

```ts
import { Hono } from 'hono'
import { getRouterName, showRoutes } from 'hono/dev'
```

## `getRouterName()`

يمكنك الحصول على اسم الموجِّه (router) المستخدَم حالياً عبر `getRouterName()`.

```ts
const app = new Hono()

// ...

console.log(getRouterName(app))
```

## `showRoutes()`

`showRoutes()` تعرض الدالة المسارات المسجَّلة في وحدة التحكم (console) لديك.

تأمّل تطبيقًا كالتالي:

```ts
const app = new Hono().basePath('/v1')

app.get('/posts', (c) => {
  // ...
})

app.get('/posts/:id', (c) => {
  // ...
})

app.post('/posts', (c) => {
  // ...
})

showRoutes(app, {
  verbose: true,
})
```

عند بدء تشغيل هذا التطبيق، ستظهر المسارات في وحدة التحكم الخاصة بك على النحو التالي:

```txt
GET   /v1/posts
GET   /v1/posts/:id
POST  /v1/posts
```

## الخيارات

### <Badge type="info" text="optional" /> verbose: `boolean`

عند الضبط على `true`، فإنه يعرض معلومات مفصّلة.

### <Badge type="info" text="optional" /> colorize: `boolean`

عند الضبط على `false`، فلن يكون الناتج ملوّنًا.
