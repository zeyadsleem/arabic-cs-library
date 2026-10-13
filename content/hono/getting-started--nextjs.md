---
title: "Next.js"
book: hono
chapter: getting-started
slug: nextjs
order: 9
source: https://hono.dev/docs/getting-started/nextjs
lang: ar
---

Next.js هو إطار عمل React مرن يمنحك اللبنات الأساسية لإنشاء تطبيقات ويب سريعة.

يمكنك تشغيل Hono على Next.js عند استخدام بيئة تشغيل Node.js.\
على Vercel، يعد نشر Hono مع Next.js أمرًا سهلًا باستخدام Vercel Functions.

## 1. الإعداد

يتوفر قالب بداية لـ Next.js.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `nextjs` قالب لهذا المثال.


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


انتقل إلى `my-app` وثبّت التبعيات.


```sh [npm]
cd my-app
npm i
```

```sh [yarn]
cd my-app
yarn
```

```sh [pnpm]
cd my-app
pnpm i
```

```sh [bun]
cd my-app
bun i
```


## 2. مرحبًا بالعالم

إذا كنت تستخدم App Router، فحرّر `app/api/[[...route]]/route.ts`. راجع [طرق HTTP المدعومة](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#supported-http-methods) القسم لمزيد من الخيارات.

```ts
import { Hono } from 'hono'
import { handle } from '@hono/vercel'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app)

`handle` comes from the `@hono/vercel` package, which the starter installs. On an existing project, add it with `npm i @hono/vercel`.
export const POST = handle(app)
```

## 3. تشغيل

شغّل خادم التطوير محليًا. ثم، ادخل إلى `http://localhost:3000` في متصفح الويب الخاص بك.


```sh [npm]
npm run dev
```

```sh [yarn]
yarn dev
```

```sh [pnpm]
pnpm dev
```

```sh [bun]
bun run dev
```


الآن، `/api/hello` يعيد JSON فقط، لكن إذا كنت تبني واجهات React، يمكنك إنشاء تطبيق كامل المكدس (full-stack) باستخدام Hono.

## 4. النشر

إذا كان لديك حساب Vercel، يمكنك النشر عن طريق ربط مستودع Git.

## Pages Router

إذا كنت تستخدم Pages Router، فستحتاج إلى تثبيت محوّل (adapter) Node.js أولًا.


```sh [npm]
npm i @hono/node-server
```

```sh [yarn]
yarn add @hono/node-server
```

```sh [pnpm]
pnpm add @hono/node-server
```

```sh [bun]
bun add @hono/node-server
```


بعد ذلك، يمكنك استخدام `getRequestListener` دالة مستوردة من `@hono/node-server` في `pages/api/[[...route]].ts`.

```ts
import { getRequestListener } from '@hono/node-server'
import { Hono } from 'hono'
import type { PageConfig } from 'next'

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export default getRequestListener(app.fetch)
```

لكي يعمل هذا مع Pages Router، من المهم تعطيل أدوات Vercel Node.js المساعدة عن طريق إعداد متغير بيئة في لوحة تحكم مشروعك أو في `.env` ملف.

```text
NODEJS_HELPERS=0
```
