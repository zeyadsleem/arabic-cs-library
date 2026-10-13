---
title: "`Service Worker`"
book: hono
chapter: getting-started
slug: service-worker
order: 19
source: https://hono.dev/docs/getting-started/service-worker
lang: ar
---

[`Service Worker`](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) هو برنامج نصي يعمل في خلفية المتصفح للتعامل مع مهام مثل التخزين المؤقت والإشعارات الفورية (push notifications). باستخدام محول Service Worker، يمكنك تشغيل تطبيقات مبنية بـ Hono كـ [FetchEvent](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent) المعالج داخل المتصفح.

توضّح هذه الصفحة مثالاً على إنشاء مشروع باستخدام [Vite](https://vitejs.dev/).

## 1. الإعداد

أولًا، أنشئ دليل مشروعك وانتقل إليه:

```sh
mkdir my-app
cd my-app
```

أنشئ الملفات اللازمة للمشروع. أنشئ ملف `package.json` ملف كما يلي:

```json
{
  "name": "my-app",
  "private": true,
  "scripts": {
    "dev": "vite dev"
  },
  "type": "module"
}
```

وبالمثل، أنشئ `tsconfig.json` ملف كما يلي:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "WebWorker"],
    "moduleResolution": "bundler"
  },
  "include": ["./"],
  "exclude": ["node_modules"]
}
```

بعد ذلك، ثبّت الوحدات اللازمة.


```sh [npm]
npm i hono @hono/service-worker
npm i -D vite
```

```sh [yarn]
yarn add hono @hono/service-worker
yarn add -D vite
```

```sh [pnpm]
pnpm add hono @hono/service-worker
pnpm add -D vite
```

```sh [bun]
bun add hono @hono/service-worker
bun add -D vite
```


## 2. مرحبًا بالعالم

تعديل `index.html`:

```html
<!doctype html>
<html>
  <body>
    <a href="/sw">Hello World by Service Worker</a>
    <script type="module" src="/main.ts"></script>
  </body>
</html>
```

`main.ts` سكربت لتسجيل Service Worker:

```ts
function register() {
  navigator.serviceWorker
    .register('/sw.ts', { scope: '/sw', type: 'module' })
    .then(
      function (_registration) {
        console.log('Register Service Worker: Success')
      },
      function (_error) {
        console.log('Register Service Worker: Error')
      }
    )
}
function start() {
  navigator.serviceWorker
    .getRegistrations()
    .then(function (registrations) {
      for (const registration of registrations) {
        console.log('Unregister Service Worker')
        registration.unregister()
      }
      register()
    })
}
start()
```

في `sw.ts`، أنشئ تطبيقاً باستخدام Hono وسجِّله في `fetch` الحدث باستخدام محوّل Service Worker `handle` دالة. وهذا يسمح لتطبيق Hono باعتراض الوصول إلى `/sw`.

```ts
// To support types
// https://github.com/microsoft/TypeScript/issues/14877
declare const self: ServiceWorkerGlobalScope

import { Hono } from 'hono'
import { handle } from '@hono/service-worker'

const app = new Hono().basePath('/sw')
app.get('/', (c) => c.text('Hello World'))

self.addEventListener('fetch', handle(app))
```

### استخدام `fire()`

الـ `fire()` الدالة تستدعي تلقائيًا `addEventListener('fetch', handle(app))` نيابةً عنك، مما يجعل الكود أكثر إيجازًا.

```ts
import { Hono } from 'hono'
import { fire } from '@hono/service-worker'

const app = new Hono().basePath('/sw')
app.get('/', (c) => c.text('Hello World'))

fire(app)
```

## 3. تشغيل

شغّل خادم التطوير.


```sh [npm]
npm run dev
```

```sh [yarn]
yarn dev
```

```sh [pnpm]
pnpm run dev
```

```sh [bun]
bun run dev
```


افتراضيًا، سيعمل خادم التطوير على المنفذ `5173`. الوصول `http://localhost:5173/` في متصفحك لإكمال تسجيل عامل الخدمة (Service Worker). ثم، قم بالوصول إلى `/sw` لرؤية الاستجابة من تطبيق Hono.
