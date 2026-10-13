---
title: "معايير الأداء"
book: hono
chapter: concepts
slug: benchmarks
order: 23
source: https://hono.dev/docs/concepts/benchmarks
lang: ar
---

الاختبارات المعيارية (Benchmarks) مجرد اختبارات معيارية، لكنها مهمة لنا.

## الموجهات

قمنا بقياس سرعات مجموعة من موجِّهات JavaScript.
على سبيل المثال، `find-my-way` موجّه سريع جدًا يُستخدم داخل Fastify.

- @medley/router
- find-my-way
- koa-tree-router
- trek-router
- express (يتضمن المعالجة)
- koa-router

أولًا، سجّلنا التوجيه (routing) التالي على كلٍ من موجّهاتنا (routers).
هذه مشابهة لتلك المستخدمة في العالم الحقيقي.

```ts twoslash
interface Route {
  method: string
  path: string
}
// ---cut---
export const routes: Route[] = [
  { method: 'GET', path: '/user' },
  { method: 'GET', path: '/user/comments' },
  { method: 'GET', path: '/user/avatar' },
  { method: 'GET', path: '/user/lookup/username/:username' },
  { method: 'GET', path: '/user/lookup/email/:address' },
  { method: 'GET', path: '/event/:id' },
  { method: 'GET', path: '/event/:id/comments' },
  { method: 'POST', path: '/event/:id/comment' },
  { method: 'GET', path: '/map/:location/events' },
  { method: 'GET', path: '/status' },
  { method: 'GET', path: '/very/deeply/nested/route/hello/there' },
  { method: 'GET', path: '/static/*' },
]
```

ثم أرسلنا الطلب (Request) إلى نقاط النهاية كما يلي.

```ts twoslash
interface Route {
  method: string
  path: string
}
// ---cut---
const routes: (Route & { name: string })[] = [
  {
    name: 'short static',
    method: 'GET',
    path: '/user',
  },
  {
    name: 'static with same radix',
    method: 'GET',
    path: '/user/comments',
  },
  {
    name: 'dynamic route',
    method: 'GET',
    path: '/user/lookup/username/hey',
  },
  {
    name: 'mixed static dynamic',
    method: 'GET',
    path: '/event/abcd1234/comments',
  },
  {
    name: 'post',
    method: 'POST',
    path: '/event/abcd1234/comment',
  },
  {
    name: 'long static',
    method: 'GET',
    path: '/very/deeply/nested/route/hello/there',
  },
  {
    name: 'wildcard',
    method: 'GET',
    path: '/static/index.html',
  },
]
```

لنرَ النتائج.

### على Node.js

تُظهر لقطات الشاشة التالية النتائج على Node.js.

![](/images/hono/bench01.png)

![](/images/hono/bench02.png)

![](/images/hono/bench03.png)

![](/images/hono/bench04.png)

![](/images/hono/bench05.png)

![](/images/hono/bench06.png)

![](/images/hono/bench07.png)

![](/images/hono/bench08.png)

### على Bun

تُظهر اللقطات التالية النتائج على Bun.

![](/images/hono/bench09.png)

![](/images/hono/bench10.png)

![](/images/hono/bench11.png)

![](/images/hono/bench12.png)

![](/images/hono/bench13.png)

![](/images/hono/bench14.png)

![](/images/hono/bench15.png)

![](/images/hono/bench16.png)

## Cloudflare Workers

**Hono هو الأسرع**، مقارنةً بالموجّهات (routers) الأخرى لـ Cloudflare Workers.

- الجهاز: Apple MacBook Pro، 32 GiB، M1 Pro
- Scripts: [benchmarks/handle-event](https://github.com/honojs/hono/tree/main/benchmarks/handle-event)

```
Hono x 402,820 ops/sec ±4.78% (80 runs sampled)
itty-router x 212,598 ops/sec ±3.11% (87 runs sampled)
sunder x 297,036 ops/sec ±4.76% (77 runs sampled)
worktop x 197,345 ops/sec ±2.40% (88 runs sampled)
Fastest is Hono
✨  Done in 28.06s.
```

## Deno

**Hono هو الأسرع**، مقارنةً بأطر عمل أخرى لـ Deno.

- الجهاز: Apple MacBook Pro، 32 GiB، M1 Pro، Deno v1.22.0
- Scripts: [benchmarks/deno](https://github.com/honojs/hono/tree/main/benchmarks/deno)
- Method: `bombardier --fasthttp -d 10s -c 100 'http://localhost:8000/user/lookup/username/foo'`

| الإطار |   الإصدار    |                  النتائج |
| --------- | :----------: | -----------------------: |
| **Hono**  |    3.0.0     | **الطلبات/ثانية: 136112** |
| Fast      | 4.0.0-beta.1 |     الطلبات/ثانية: 103214 |
| Megalo    |    0.3.0     |      الطلبات/ثانية: 64597 |
| Faster    |     5.7      |      الطلبات/ثانية: 54801 |
| oak       |    10.5.1    |      الطلبات/ثانية: 43326 |
| opine     |    2.2.0     |      الطلبات/ثانية: 30700 |

نتيجة معيار أداء أخرى: [denosaurs/bench](https://github.com/denosaurs/bench)

## Bun

Hono هو أحد أسرع الأطر لـ Bun.
يمكنك رؤيته أدناه.

- [SaltyAom/bun-http-framework-benchmark](https://github.com/SaltyAom/bun-http-framework-benchmark)
