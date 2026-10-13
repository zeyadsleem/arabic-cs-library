---
title: "Netlify"
book: hono
chapter: getting-started
slug: netlify
order: 10
source: https://hono.dev/docs/getting-started/netlify
lang: ar
---

توفر Netlify استضافة للمواقع الثابتة وخدمات خلفية (backend) بدون خادم (serverless). [`Edge Functions`](https://docs.netlify.com/edge-functions/overview/) يمكّننا من جعل صفحات الويب ديناميكية.

تدعم Edge Functions الكتابة بلغتي Deno و TypeScript، ويتم تسهيل النشر من خلال [`Netlify CLI`](https://docs.netlify.com/cli/get-started/). باستخدام Hono، يمكنك إنشاء التطبيق لدوال Netlify Edge Functions.

## 1. الإعداد

يتوفر قالب بداية لـ Netlify.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `netlify` قالب لهذا المثال.


```sh [npm]
npm create hono@latest my-app
```

```sh [yarn]
yarn create hono my-app
```

```sh [pnpm]
pnpm create hono my-app
```

```sh [bun]
bun create hono@latest my-app
```

```sh [deno]
deno init --npm hono my-app
```


انتقل إلى `my-app`.

## 2. مرحبًا بالعالم

تعديل `netlify/edge-functions/index.ts`:

```ts
import { Hono } from 'jsr:@hono/hono'
import { handle } from 'jsr:@hono/netlify'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default handle(app)
```

## 3. تشغيل

شغِّل خادم التطوير باستخدام Netlify CLI. ثم، ادخل إلى `http://localhost:8888` في متصفح الويب الخاص بك.

```sh
netlify dev
```

## 4. النشر

يمكنك النشر باستخدام `netlify deploy` الأمر.

```sh
netlify deploy --prod
```

## `Context`

يمكنك الوصول إلى خاصية Netlify `Context` عبر `c.env`:

```ts
import { Hono } from 'jsr:@hono/hono'
import { handle } from 'jsr:@hono/netlify'

// Import the type definition
import type { Context } from 'https://edge.netlify.com/'

export type Env = {
  Bindings: {
    context: Context
  }
}

const app = new Hono<Env>()

app.get('/country', (c) =>
  c.json({
    'You are in': c.env.context.geo.country?.name,
  })
)

export default handle(app)
```
