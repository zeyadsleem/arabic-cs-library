---
title: "`Bun`"
book: hono
chapter: getting-started
slug: bun
order: 6
source: https://hono.dev/docs/getting-started/bun
lang: ar
---

[`Bun`](https://bun.com) هو وقت تشغيل JavaScript آخر. إنه ليس Node.js أو Deno. يتضمن Bun مترجمًا (transcompiler)، لذا يمكننا كتابة الكود بلغة TypeScript أو JavaScript عادية.
يعمل Hono أيضًا على Bun.

## 1. تثبيت Bun

لتثبيت `bun` الأمر، اتبع التعليمات في [الموقع الرسمي](https://bun.com).

## 2. الإعداد

### 2.1. إعداد مشروع جديد

يتوفر مشروع بداية (starter) لـ Bun. ابدأ مشروعك بأمر "bun create".
اختر `bun` قالب لهذا المثال.

```sh
bun create hono@latest my-app
```

انتقل إلى my-app وثبّت الاعتماديات.

```sh
cd my-app
bun install
```

### 2.2. إعداد مشروع موجود

في مشروع Bun موجود، نحتاج فقط إلى تثبيت `hono` الاعتماديات على الدليل الجذر للمشروع عبر

```sh
bun add hono
```

ثم أضف `dev` الأمر إلى مشروعك الحالي `package.json`.

```json
{
  "scripts": {
    "dev": "bun run --hot src/index.ts"
  }
}
```

انظر [قالب بدء سريع لـ Bun](https://github.com/honojs/starter/tree/main/templates/bun) لإعداد مثال بسيط (minimal). هذا هو ناتج تشغيل `bun create hono@latest`.

## 3. مرحبًا بالعالم

سكربت "Hello World" موضح أدناه. وهو مطابق تقريبًا للكتابة على المنصات الأخرى.

```ts
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

export default app
```

إذا كنت تُعِدّ Hono على مشروع موجود، فإن `bun run dev` يتوقّع الأمر وضع سكربت "Hello World" في `src/index.ts`

## 4. تشغيل

شغِّل الأمر.

```sh
bun run dev
```

ثم، الوصول إلى `http://localhost:3000` في متصفحك.

## تغيير رقم المنفذ

يمكنك تحديد رقم المنفذ بتصدير `port`.

<!-- prettier-ignore -->
```ts
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

export default app // [!code --]
export default { // [!code ++]
  port: 3000, // [!code ++]
  fetch: app.fetch, // [!code ++]
} // [!code ++]
```

## تقديم الملفات الثابتة

لخدمة الملفات الثابتة، استخدم `serveStatic` من `@hono/bun` الحزمة.

```sh
bun add @hono/bun
```

```ts
import { serveStatic } from '@hono/bun'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get('/', (c) => c.text('You can access: /static/hello.txt'))
app.get('*', serveStatic({ path: './static/fallback.txt' }))
```

بالنسبة للكود أعلاه، سيعمل بشكل جيد مع بنية الدليل (directory structure) التالية.

```
./
├── favicon.ico
├── src
└── static
    ├── demo
    │   └── index.html
    ├── fallback.txt
    ├── hello.txt
    └── images
        └── dinotocat.png
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

### `mimes`

يمكنك إضافة أنواع MIME باستخدام `mimes`:

```ts
app.get(
  '/static/*',
  serveStatic({
    mimes: {
      m3u8: 'application/vnd.apple.mpegurl',
      ts: 'video/mp2t',
    },
  })
)
```

### `onFound`

يمكنك تحديد المعالجة عند العثور على الملف المطلوب باستخدام `onFound`:

```ts
app.get(
  '/static/*',
  serveStatic({
    // ...
    onFound: (_path, c) => {
      c.header('Cache-Control', `public, immutable, max-age=31536000`)
    },
  })
)
```

### `onNotFound`

يمكنك تحديد المعالجة عندما لا يتم العثور على الملف المطلوب باستخدام `onNotFound`:

```ts
app.get(
  '/static/*',
  serveStatic({
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`)
    },
  })
)
```

### `precompressed`

الـ `precompressed` يتحقّق الخيار مما إذا كانت الملفات ذات امتدادات مثل `.br` أو `.gz` متاحة ويقدّمها بناءً على `Accept-Encoding` ترويسة. يعطي الأولوية لـ Brotli، ثم Zstd، ثم Gzip. إذا لم يتوفر أي منها، فإنه يقدم الملف الأصلي.

```ts
app.get(
  '/static/*',
  serveStatic({
    precompressed: true,
  })
)
```

## الاختبار

يمكنك استخدام `bun:test` للاختبار على Bun.

```ts
import { describe, expect, it } from 'bun:test'
import app from '.'

describe('My first test', () => {
  it('Should return 200 Response', async () => {
    const req = new Request('http://localhost/')
    const res = await app.fetch(req)
    expect(res.status).toBe(200)
  })
})
```

بعد ذلك، شغّل الأمر.

```sh
bun test index.test.ts
```
