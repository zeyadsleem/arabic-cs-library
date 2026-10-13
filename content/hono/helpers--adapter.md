---
title: "مساعد `Adapter`"
book: hono
chapter: helpers
slug: adapter
order: 55
source: https://hono.dev/docs/helpers/adapter
lang: ar
---

توفر الأداة المساعدة للمحول (Adapter Helper) طريقة سلسة للتفاعل مع المنصات المختلفة عبر واجهة موحدة.

## Import

```ts
import { Hono } from 'hono'
import { env, getRuntimeKey } from 'hono/adapter'
```

## `env()`

الـ `env()` تسهل الدالة استرجاع متغيرات البيئة عبر أوقات تشغيل مختلفة، متجاوزةً ارتباطات Cloudflare Workers فقط. القيمة التي يمكن استرجاعها باستخدام `env(c)` قد يختلف لكل بيئة تشغيل (runtime).

```ts
import { env } from 'hono/adapter'

app.get('/env', (c) => {
  // NAME is process.env.NAME on Node.js or Bun
  // NAME is the value written in `wrangler.toml` on Cloudflare
  const { NAME } = env<{ NAME: string }>(c)
  return c.text(NAME)
})
```

بيئات التشغيل المدعومة والمنصات بلا خوادم (Serverless) والخدمات السحابية:

- Cloudflare Workers
  - `wrangler.toml`
  - `wrangler.jsonc`
- Deno
  - [`Deno.env`](https://docs.deno.com/runtime/manual/basics/env_variables)
  - `.env` ملف
- Bun
  - [`Bun.env`](https://bun.com/guides/runtime/set-env)
  - `process.env`
- Node.js
  - `process.env`
- Vercel
  - [متغيرات البيئة على Vercel](https://vercel.com/docs/projects/environment-variables)
- AWS Lambda
  - [متغيرات البيئة على AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/samples-blank.html#samples-blank-architecture)
- Lambda@Edge\
  متغيرات البيئة على Lambda تكون [غير مدعوم](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html) بواسطة Lambda@Edge، تحتاج إلى استخدام [حدث Lambda@Edge](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html) كبديل.
- Fastly Compute\
  على Fastly Compute، يمكنك استخدام ConfigStore لإدارة البيانات المُعرَّفة من قبل المستخدم.
- Netlify\
  على Netlify، يمكنك استخدام [سياقات Netlify](https://docs.netlify.com/site-deploys/overview/#deploy-contexts) لإدارة البيانات المعرّفة من المستخدم.

### تحديد بيئة التشغيل

يمكنك تحديد بيئة التشغيل للحصول على متغيرات البيئة بتمرير مفتاح بيئة التشغيل كوسيطة ثانية.

```ts
app.get('/env', (c) => {
  const { NAME } = env<{ NAME: string }>(c, 'workerd')
  return c.text(NAME)
})
```

## `getRuntimeKey()`

الـ `getRuntimeKey()` تُعيد الدالة معرّف بيئة التشغيل (runtime) الحالية.

```ts
app.get('/', (c) => {
  if (getRuntimeKey() === 'workerd') {
    return c.text('You are on Cloudflare')
  } else if (getRuntimeKey() === 'bun') {
    return c.text('You are on Bun')
  }
  ...
})
```

### مفاتيح بيئات التشغيل المتاحة

فيما يلي مفاتيح بيئات التشغيل المتاحة؛ قد تكون بيئات التشغيل غير المدرجة مدعومة وتُوسم بأنها `other`، وبعضها مستوحى من [مفاتيح Runtime الخاصة بـ WinterCG](https://runtime-keys.proposal.wintercg.org/):

- `workerd` - Cloudflare Workers
- `deno`
- `bun`
- `node`
- `edge-light` - دوال Vercel Edge
- `fastly` - Fastly Compute
- `other` - مفاتيح بيئات تشغيل أخرى غير معروفة
