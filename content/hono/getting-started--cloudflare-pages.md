---
title: "Cloudflare Pages"
book: hono
chapter: getting-started
slug: cloudflare-pages
order: 4
source: https://hono.dev/docs/getting-started/cloudflare-pages
lang: ar
---

للمشاريع الجديدة، توصي Cloudflare الآن باستخدام [Cloudflare Workers](https://hono.dev/docs/getting-started/cloudflare-workers) بدلًا من Cloudflare Pages. يدعم Workers الأصول الثابتة (static assets) ويقدم مجموعة أوسع من الميزات. إذا كنت تبدأ تطبيقًا جديدًا كامل المكدس (full-stack)، فراجع [Cloudflare Workers + Vite](https://hono.dev/docs/getting-started/cloudflare-workers-vite)، وهو خليفة إعداد Pages هذا. الـ `hono/cloudflare-pages` المحوّل مهمل وسيُزال في Hono v5.

[Cloudflare Pages](https://pages.cloudflare.com) هي منصة طرفية لتطبيقات الويب متكاملة الحزمة.
يخدم الملفات الثابتة والمحتوى الديناميكي المقدَّم من Cloudflare Workers.

يدعم Hono Cloudflare Pages بالكامل.
إنها تقدم تجربة تطوير رائعة. خادم التطوير الخاص بـ Vite سريع، والنشر عبر Wrangler سريع للغاية.

## 1. الإعداد

يتوفر قالب بداية لـ Cloudflare Pages.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `cloudflare-pages` قالب لهذا المثال.


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
├── public
│   └── static // Put your static files.
│       └── style.css // You can refer to it as `/static/style.css`.
├── src
│   ├── index.tsx // The entry point for server-side.
│   └── renderer.tsx
├── tsconfig.json
└── vite.config.ts
```

## 2. مرحبًا بالعالم

تعديل `src/index.tsx` مثل ما يلي:

```tsx
import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.get('*', renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello, Cloudflare Pages!</h1>)
})

export default app
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

إذا كان لديك حساب Cloudflare، يمكنك النشر على Cloudflare. في `package.json`, `$npm_execpath` يجب تغييره إلى مدير الحزم (package manager) الذي تختاره.


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


### النشر عبر لوحة تحكم Cloudflare باستخدام GitHub

1. سجّل الدخول إلى [لوحة تحكم Cloudflare](https://dash.cloudflare.com) واختر حسابك.
2. في الصفحة الرئيسية للحساب (Account Home)، اختر Workers & Pages > إنشاء تطبيق > Pages > الاتصال بـ Git.
3. أذِن لحسابك في GitHub، وحدد المستودع. في إعداد عمليات البناء والنشر (Set up builds and deployments)، قدّم المعلومات التالية:

| خيار التكوين | القيمة           |
| -------------------- | --------------- |
| فرع الإنتاج    | `main`          |
| أمر البناء        | `npm run build` |
| دليل البناء      | `dist`          |

## الارتباطات

يمكنك استخدام روابط (Bindings) Cloudflare مثل المتغيرات (Variables) و KV و D1 وغيرها.
في هذا القسم، لنستخدم المتغيرات و KV.

### إنشاء `wrangler.toml`

أولاً، أنشئ `wrangler.toml` للارتباطات المحلية:

```sh
touch wrangler.toml
```

تعديل `wrangler.toml`. حدّد Variable بالاسم `MY_NAME`.

```toml
[vars]
MY_NAME = "Hono"
```

### إنشاء KV

بعد ذلك، أنشئ KV. شغّل الأمر التالي `wrangler` الأمر:

```sh
wrangler kv namespace create MY_KV --preview
```

دوّن `preview_id` كما في المخرجات التالية:

```
{ binding = "MY_KV", preview_id = "abcdef" }
```

حدِّد `preview_id` باسم Bindings، `MY_KV`:

```toml
[[kv_namespaces]]
binding = "MY_KV"
id = "abcdef"
```

### تحرير `vite.config.ts`

حرِّر `vite.config.ts`:

```ts
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import build from '@hono/vite-cloudflare-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/index.tsx',
      adapter, // Cloudflare Adapter
    }),
    build(),
  ],
})
```

### استخدام الارتباطات (Bindings) في تطبيقك

استخدم Variable وKV في تطبيقك. حدِّد الأنواع.

```ts
type Bindings = {
  MY_NAME: string
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()
```

استخدمها:

```tsx
app.get('/', async (c) => {
  await c.env.MY_KV.put('name', c.env.MY_NAME)
  const name = await c.env.MY_KV.get('name')
  return c.render(<h1>Hello! {name}</h1>)
})
```

### في بيئة الإنتاج

بالنسبة إلى Cloudflare Pages، ستستخدم `wrangler.toml` للتطوير المحلي، لكن في بيئة الإنتاج ستقوم بإعداد الارتباطات (Bindings) في لوحة التحكم.

## من جهة العميل

يمكنك كتابة سكربتات من جانب العميل واستيرادها إلى تطبيقك باستخدام ميزات Vite.
إذا `/src/client.ts` هي نقطة الدخول (entry point) للعميل (client)، ببساطة اكتبها داخل وسم script.
بالإضافة إلى ذلك، `import.meta.env.PROD` مفيد لاكتشاف ما إذا كان التطبيق يعمل على خادم تطوير أو في مرحلة البناء.

```tsx
app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        {import.meta.env.PROD ? (
          <script type='module' src='/static/client.js'></script>
        ) : (
          <script type='module' src='/src/client.ts'></script>
        )}
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  )
})
```

من أجل بناء السكربت بشكل صحيح، يمكنك استخدام ملف الإعداد (config) النموذجي `vite.config.ts` كما هو موضح أدناه.

```ts
import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: './src/client.ts',
          output: {
            entryFileNames: 'static/client.js',
          },
        },
      },
    }
  } else {
    return {
      plugins: [
        pages(),
        devServer({
          entry: 'src/index.tsx',
        }),
      ],
    }
  }
})
```

يمكنك تشغيل الأمر التالي لبناء سكربت الخادم والعميل.

```sh
vite build --mode client && vite build
```

## برمجية وسيطة لـ Cloudflare Pages

تستخدم Cloudflare Pages [الوسيط](https://developers.cloudflare.com/pages/functions/middleware/) نظام مختلف عن وسائط (middleware) Hono. يمكنك تفعيله عن طريق تصدير `onRequest` في ملف باسم `_middleware.ts` مثل هذا:

```ts
// functions/_middleware.ts
export async function onRequest(pagesContext) {
  console.log(`You are accessing ${pagesContext.request.url}`)
  return await pagesContext.next()
}
```

باستخدام `handleMiddleware`، يمكنك استخدام وسيطة Hono (middleware) كوسيطة Cloudflare Pages.

```ts
// functions/_middleware.ts
import { handleMiddleware } from 'hono/cloudflare-pages'

export const onRequest = handleMiddleware(async (c, next) => {
  console.log(`You are accessing ${c.req.url}`)
  await next()
})
```

يمكنك أيضًا استخدام الوسائط المدمجة (built-in) والوسائط الخارجية (third-party) مع Hono. على سبيل المثال، لإضافة المصادقة الأساسية (Basic Authentication)، يمكنك استخدام [برمجية المصادقة الأساسية (Basic Authentication) في Hono](https://hono.dev/docs/middleware/builtin/basic-auth).

```ts
// functions/_middleware.ts
import { handleMiddleware } from 'hono/cloudflare-pages'
import { basicAuth } from 'hono/basic-auth'

export const onRequest = handleMiddleware(
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)
```

إذا أردت تطبيق عدة وسائط (middleware)، يمكنك كتابتها على النحو التالي:

```ts
import { handleMiddleware } from 'hono/cloudflare-pages'

// ...

export const onRequest = [
  handleMiddleware(middleware1),
  handleMiddleware(middleware2),
  handleMiddleware(middleware3),
]
```

### الوصول `EventContext`

يمكنك الوصول إلى [`EventContext`](https://developers.cloudflare.com/pages/functions/api-reference/#eventcontext) الكائن عبر `c.env` في `handleMiddleware`.

```ts
// functions/_middleware.ts
import { handleMiddleware } from 'hono/cloudflare-pages'

export const onRequest = [
  handleMiddleware(async (c, next) => {
    c.env.eventContext.data.user = 'Joe'
    await next()
  }),
]
```

بعد ذلك، يمكنك الوصول إلى قيمة البيانات عبر `c.env.eventContext` في المعالج:

```ts
// functions/api/[[route]].ts
import type { EventContext } from 'hono/cloudflare-pages'
import { handle } from 'hono/cloudflare-pages'

// ...

type Env = {
  Bindings: {
    eventContext: EventContext
  }
}

const app = new Hono<Env>().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: `Hello, ${c.env.eventContext.data.user}!`, // 'Joe'
  })
})

export const onRequest = handle(app)
```
