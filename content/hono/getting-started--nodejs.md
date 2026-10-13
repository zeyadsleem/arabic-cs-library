---
title: "Node.js"
book: hono
chapter: getting-started
slug: nodejs
order: 20
source: https://hono.dev/docs/getting-started/nodejs
lang: ar
---

[Node.js](https://nodejs.org/) هي بيئة تشغيل (runtime) JavaScript مفتوحة المصدر ومتعددة المنصات.

لم يُصمَّم Hono لـ Node.js في البداية، ولكن مع [مُهايئ Node.js](https://github.com/honojs/node-server)، فيمكنه العمل على Node.js أيضًا.

يعمل على إصدارات Node.js الأكبر من 18.x. إصدارات Node.js المطلوبة تحديدًا هي كما يلي:

- 18.x => 18.14.1+
- 19.x => 19.7.0+
- 20.x => 20.0.0+

بشكل أساسي، يمكنك ببساطة استخدام أحدث إصدار من كل إصدار رئيسي (major release).

## 1. الإعداد

يتوفر قالب بداية لـ Node.js.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `nodejs` قالب لهذا المثال.


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

تعديل `src/index.ts`:

```ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

serve(app)
```

إذا أردت إيقاف تشغيل الخادم بأناقة (gracefully)، فاكتبه على النحو التالي:

```ts
const server = serve(app)

// graceful shutdown
process.on('SIGINT', () => {
  server.close()
  process.exit(0)
})
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
```

على `Node.js`، `serve()` يلفّ `node:http` الوحدة ويُرجع مثيل الخادم الأساسي، لذا فإن إغلاقه يعود إليك. يقدم Bun و Deno معالجات Fetch أصليًا (natively) ويديران الخادم بأنفسهما، ولهذا لا تتضمن أدلتهما هذه الخطوة.

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


## تغيير رقم المنفذ

يمكنك تحديد رقم المنفذ باستخدام `port` خيار.

```ts
serve({
  fetch: app.fetch,
  port: 8787,
})
```

## WebSocket

دعم WebSocket مُدمج في `@hono/node-server`. ثبِّت `ws` وإذا كنت تستخدم TypeScript، `@types/ws`. ثم أنشئ `WebSocketServer` مع `{ noServer: true }` وتمريره إلى `serve()` مع `websocket` خيار.

`@hono/node-ws` مهمَل.

```ts
import { serve, upgradeWebSocket } from '@hono/node-server'
import { Hono } from 'hono'
import { WebSocketServer } from 'ws'

const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      ws.send(event.data)
    },
  }))
)

const wss = new WebSocketServer({ noServer: true })

serve({
  fetch: app.fetch,
  websocket: { server: wss },
})
```

## الوصول إلى واجهات Node.js الخام

يمكنك الوصول إلى واجهات Node.js من `c.env.incoming` و `c.env.outgoing`.

```ts
import { Hono } from 'hono'
import { serve, type HttpBindings } from '@hono/node-server'
// or `Http2Bindings` if you use HTTP2

type Bindings = HttpBindings & {
  /* ... */
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.json({
    remoteAddress: c.env.incoming.socket.remoteAddress,
  })
})

serve(app)
```

## تقديم الملفات الثابتة

يمكنك استخدام `serveStatic` لتقديم الملفات الثابتة من نظام الملفات المحلي. على سبيل المثال، افترض أن بنية الدليل هي كما يلي:

```sh
./
├── favicon.ico
├── index.ts
└── static
    ├── hello.txt
    └── image.png
```

إذا كان الطلب إلى المسار `/static/*` يأتي وتريد إرجاع ملف ضمن `./static`، يمكنك كتابة ما يلي:

```ts
import { serveStatic } from '@hono/node-server/serve-static'

app.use('/static/*', serveStatic({ root: './' }))
```

الـ `root` يحلّ الخيار المسارات بشكل نسبي إلى دليل العمل الحالي (`process.cwd()`). هذا يعني أن السلوك يعتمد على **المكان الذي تشغّل منه عملية Node.js الخاصة بك**، وليس على مكان ملف المصدر. إذا بدأت خادمك من دليل مختلف، فقد يفشل تحليل الملفات (file resolution).

لحل موثوق للمسارات يشير دائمًا إلى نفس الدليل الذي يوجد به ملف المصدر، استخدم `import.meta.url`:

```ts
import { fileURLToPath } from 'node:url'
import { serveStatic } from '@hono/node-server/serve-static'

app.use(
  '/static/*',
  serveStatic({ root: fileURLToPath(new URL('./', import.meta.url)) })
)
```


استخدم `path` خيار لتقديم `favicon.ico` في جذر الدليل:

```ts
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
```

إذا كان الطلب إلى المسار `/hello.txt` أو `/image.png` يأتي وتريد إرجاع ملف باسم `./static/hello.txt` أو `./static/image.png`، يمكنك استخدام ما يلي:

```ts
app.use('*', serveStatic({ root: './static' }))
```

### `rewriteRequestPath`

إذا كنت تريد تعيين `http://localhost:3000/static/*` إلى `./statics`، يمكنك استخدام `rewriteRequestPath` option:

```ts
app.get(
  '/static/*',
  serveStatic({
    root: './',
    rewriteRequestPath: (path) =>
      path.replace(/^\/static/, '/statics'),
  })
)
```

## http2

يمكنك تشغيل hono على [خادم http2 في Node.js](https://nodejs.org/api/http2.html).

### http2 غير المشفّر

```ts
import { createServer } from 'node:http2'

const server = serve({
  fetch: app.fetch,
  createServer,
})
```

### http2 المشفّر

```ts
import { createSecureServer } from 'node:http2'
import { readFileSync } from 'node:fs'

const server = serve({
  fetch: app.fetch,
  createServer: createSecureServer,
  serverOptions: {
    key: readFileSync('localhost-privkey.pem'),
    cert: readFileSync('localhost-cert.pem'),
  },
})
```

## البناء والنشر


```sh [npm]
npm run build
```

```sh [yarn]
yarn run build
```

```sh [pnpm]
pnpm run build
```

```sh [bun]
bun run build
```

قد تحتاج التطبيقات التي تستخدم إطار عمل للواجهة الأمامية إلى استخدام [إضافات Vite الخاصة بـ Hono](https://github.com/honojs/vite-plugins).

### Dockerfile

إليك مثالًا لـ Dockerfile الخاص بـ Node.js.

```Dockerfile
FROM node:22-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package*json tsconfig.json src ./

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]
```
