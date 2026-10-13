---
title: "الوسيط"
book: hono
chapter: concepts
slug: middleware
order: 25
source: https://hono.dev/docs/concepts/middleware
lang: ar
---

نسمّي العنصر الأساسي (primitive) الذي يُرجع `Response` باسم "Handler".
يتم تنفيذ "الوسيط" (Middleware) قبل المعالج (Handler) وبعده، ويتولى معالجة `Request` و `Response`.
إنه أشبه ببنية البصلة.

![](/images/hono/onion.png)

على سبيل المثال، يمكننا كتابة الوسيطة لإضافة الترويسة "X-Response-Time" على النحو التالي.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.use(async (c, next) => {
  const start = performance.now()
  await next()
  const end = performance.now()
  c.res.headers.set('X-Response-Time', `${end - start}`)
})
```

بهذه الطريقة البسيطة، يمكننا كتابة وسيط مخصص خاص بنا ويمكننا استخدام الوسائط المدمجة أو الوسائط الخارجية.
