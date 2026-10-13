---
title: "معايير الويب"
book: hono
chapter: concepts
slug: web-standard
order: 24
source: https://hono.dev/docs/concepts/web-standard
lang: ar
---

يستخدم Hono فقط **معايير الويب** مثل Fetch.
كانت تُستخدم في الأصل في `fetch` دالة وتتكون من كائنات أساسية تتعامل مع طلبات HTTP واستجاباتها.
بالإضافة إلى `Requests` و `Responses`، هناك `URL`, `URLSearchParam`, `Headers` وغيرها.

Cloudflare Workers و Deno و Bun مبنية أيضًا على معايير الويب (Web Standards).
على سبيل المثال، يمكن كتابة خادم يُرجع "Hello World" كما يلي. يمكن تشغيل هذا على Cloudflare Workers و Bun.

```ts twoslash
export default {
  async fetch() {
    return new Response('Hello World')
  },
}
```

يستخدم Hono معايير الويب فقط، مما يعني أن Hono يمكنه العمل على أي بيئة تشغيل تدعمها.
بالإضافة إلى ذلك، لدينا محوّل (adapter) خاص بـ Node.js. يعمل Hono على بيئات التشغيل (runtimes) التالية:

- Cloudflare Workers (`workerd`)
- Deno
- Bun
- Fastly Compute
- AWS Lambda
- Node.js
- Vercel (edge-light)
- WebAssembly (مع [WebAssembly System Interface (WASI)][wasi] عبر [`wasi:http`][wasi-http])

كما يعمل على Netlify ومنصات أخرى.
يعمل الكود نفسه على جميع المنصات.

أطلقت Cloudflare Workers وDeno وShopify وغيرها [WinterCG](https://wintercg.org) لمناقشة إمكانية استخدام معايير الويب لتمكين "التوافقية عبر الويب (web-interoperability)".
سيتبع Hono خطواتهم ويسير نحو **معيار معايير الويب (Web Standards)**.

[wasi]: https://github.com/WebAssembly/wasi
[wasi-http]: https://github.com/WebAssembly/wasi-http
