---
title: "Cloudflare Workers + Vite"
book: hono
chapter: getting-started
slug: cloudflare-workers-vite
order: 3
source: https://hono.dev/docs/getting-started/cloudflare-workers-vite
lang: ar
---

يمكنك بناء تطبيق متكامل (full-stack) على [Cloudflare Workers](https://workers.cloudflare.com) مع [Vite](https://vite.dev) باستخدام [`@cloudflare/vite-plugin`](https://developers.cloudflare.com/workers/vite-plugin/).
يمنحك هذا الإعداد خادم تطوير Vite سريعًا، وتصييرًا من جانب الخادم (SSR) باستخدام مُصيِّر JSX الخاص بـ Hono، ونصوصًا من جانب العميل تُدمج بواسطة Vite — كل ذلك يعمل على Cloudflare Workers.

هذه هي الطريقة الموصى بها لبدء مشروع كامل المكدس (full-stack) جديد على Cloudflare.

## 1. الإعداد

يتوفّر قالب بدء (starter) لـ Cloudflare Workers مع Vite.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `cloudflare-workers+vite` قالب لهذا المثال.


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


فيما يلي بنية دليل أساسية.

```text
./
├── package.json
├── public // Put your static files here.
├── src
│   ├── index.tsx // The entry point for server-side.
│   ├── renderer.tsx
│   └── style.css
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
```

الـ `vite.config.ts` يجمع إضافة Cloudflare مع `vite-ssr-components` من أجل SSR:

```ts
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import ssrPlugin from 'vite-ssr-components/plugin'

export default defineConfig({
  plugins: [cloudflare(), ssrPlugin()],
})
```

## 2. مرحبًا بالعالم

تعديل `src/index.tsx` مثل ما يلي:

```tsx
import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello, Cloudflare Workers!</h1>)
})

export default app
```

الـ `renderer` معرّف في `src/renderer.tsx` باستخدام `Hono` [البرمجية الوسيطة JSX renderer](https://hono.dev/docs/middleware/builtin/jsx-renderer) مع `vite-ssr-components`، الذي يربط عميل Vite وأصوله:

```tsx
import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <ViteClient />
        <Link href='/src/style.css' rel='stylesheet' />
      </head>
      <body>{children}</body>
    </html>
  )
})
```

## 3. تشغيل

شغّل خادم التطوير محليًا. ثم، ادخل إلى `http://localhost:5173` في متصفح الويب الخاص بك.


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


## 4. النشر

إذا كان لديك حساب Cloudflare، يمكنك النشر على Cloudflare. حيث `deploy` يقوم السكربت بالبناء باستخدام Vite ثم النشر باستخدام Wrangler.


```sh [npm]
npm run deploy
```

```sh [yarn]
yarn deploy
```

```sh [pnpm]
pnpm run deploy
```

```sh [bun]
bun run deploy
```


## الارتباطات

يمكنك استخدام روابط (Bindings) Cloudflare مثل المتغيرات (Variables) و KV و D1 وغيرها.
قم بتكوينها في `wrangler.jsonc`. على سبيل المثال، لإضافة Variable باسم `MY_NAME`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-app",
  "compatibility_date": "2025-08-03",
  "main": "./src/index.tsx",
  "vars": {
    "MY_NAME": "Hono",
  },
}
```

لتوليد الأنواع لارتباطاتك (Bindings)، شغّل `cf-typegen` script:


```sh [npm]
npm run cf-typegen
```

```sh [yarn]
yarn cf-typegen
```

```sh [pnpm]
pnpm run cf-typegen
```

```sh [bun]
bun run cf-typegen
```


يولِّد هذا `CloudflareBindings` الواجهة. مرّرها إلى `Hono` كأنواع عامة:

```ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

ثم وصل إلى Bindings عبر `c.env`:

```tsx
app.get('/', (c) => {
  return c.render(<h1>Hello! {c.env.MY_NAME}</h1>)
})
```

## من جهة العميل

`vite-ssr-components` يتيح لك تحميل سكربتات جانب العميل عبر Vite.
أضف `Script` مكوّن يشير إلى نقطة دخول عميلك، وتتولى Vite عملية التجميع (bundling) لكل من بيئتي التطوير والإنتاج:

```tsx
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <ViteClient />
        <Script src='/src/client.ts' />
      </head>
      <body>{children}</body>
    </html>
  )
})
```

لمزيد من التفاصيل، راجع [`@cloudflare/vite-plugin` التوثيق](https://developers.cloudflare.com/workers/vite-plugin/) و [`vite-ssr-components`](https://github.com/yusukebe/vite-ssr-components).
