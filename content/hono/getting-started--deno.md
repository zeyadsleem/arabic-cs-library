---
title: "Deno"
book: hono
chapter: getting-started
slug: deno
order: 5
source: https://hono.dev/docs/getting-started/deno
lang: ar
---

[Deno](https://deno.com/) هو بيئة تشغيل JavaScript مبنية على V8. إنها ليست Node.js.
يعمل Hono أيضًا على Deno.

يمكنك استخدام Hono، وكتابة الكود بلغة TypeScript، وتشغيل التطبيق باستخدام `deno` الأمر، ثم انشره إلى "Deno Deploy".

## 1. تثبيت Deno

أولاً، ثبّت `deno` الأمر.
يرجى الرجوع إلى [الوثيقة الرسمية](https://docs.deno.com/runtime/getting_started/installation/).

## 2. الإعداد

يتوفر قالب بداية لـ Deno.
ابدأ مشروعك باستخدام [`deno init`](https://docs.deno.com/runtime/reference/cli/init/) الأمر.

```sh
deno init --npm hono --template=deno my-app
```

انتقل إلى `my-app`. بالنسبة إلى Deno، لست بحاجة إلى تثبيت Hono صراحةً.

```sh
cd my-app
```

## 3. مرحبًا بالعالم

تعديل `main.ts`:

```ts [main.ts]
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Deno!'))

Deno.serve(app.fetch)
```

## 4. تشغيل

شغّل خادم التطوير محليًا. ثم، ادخل إلى `http://localhost:8000` في متصفح الويب الخاص بك.

```sh
deno task start
```

## تغيير رقم المنفذ

يمكنك تحديد رقم المنفذ (port) عبر تحديث وسائط (arguments) `Deno.serve` في `main.ts`:

```ts
Deno.serve(app.fetch) // [!code --]
Deno.serve({ port: 8787 }, app.fetch) // [!code ++]
```

## تقديم الملفات الثابتة

لخدمة الملفات الثابتة، استخدم `serveStatic` من `@hono/deno` الحزمة.

```sh
deno add jsr:@hono/deno
```

```ts
import { Hono } from 'hono'
import { serveStatic } from '@hono/deno'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get('/', (c) => c.text('You can access: /static/hello.txt'))
app.get('*', serveStatic({ path: './static/fallback.txt' }))

Deno.serve(app.fetch)
```

بالنسبة للكود أعلاه، سيعمل بشكل جيد مع بنية الدليل (directory structure) التالية.

```
./
├── favicon.ico
├── index.ts
└── static
    ├── demo
    │   └── index.html
    ├── fallback.txt
    ├── hello.txt
    └── images
        └── dinotocat.png
```

### `rewriteRequestPath`

إذا كنت تريد تعيين `http://localhost:8000/static/*` إلى `./statics`، يمكنك استخدام `rewriteRequestPath` option:

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

## Deno Deploy

Deno Deploy هي منصة serverless لتشغيل تطبيقات JavaScript و TypeScript في السحابة.
يوفر مستوى إدارة (management plane) لنشر وتشغيل التطبيقات عبر عمليات التكامل مثل النشر عبر GitHub.

يعمل Hono أيضًا على Deno Deploy. يُرجى الرجوع إلى [الوثيقة الرسمية](https://docs.deno.com/deploy/manual/).

## الاختبار

اختبار التطبيق على Deno أمر سهل.
يمكنك الكتابة باستخدام `Deno.test` واستخدم `assert` أو `assertEquals` من [`@std/assert`](https://jsr.io/@std/assert).

```sh
deno add jsr:@std/assert
```

```ts [hello.ts]
import { Hono } from 'hono'
import { assertEquals } from '@std/assert'

Deno.test('Hello World', async () => {
  const app = new Hono()
  app.get('/', (c) => c.text('Please test me'))

  const res = await app.request('http://localhost/')
  assertEquals(res.status, 200)
})
```

ثم شغّل الأمر:

```sh
deno test hello.ts
```

## npm و JSR

Hono متاح على كلٍّ من [`npm`](https://www.npmjs.com/package/hono) و [`JSR`](https://jsr.io/@hono/hono) (سجل JavaScript). يمكنك استخدام أيٍّ من `npm:hono` أو `jsr:@hono/hono` في `deno.json`:

```json
{
  "imports": {
    "hono": "jsr:@hono/hono" // [!code --]
    "hono": "npm:hono" // [!code ++]
  }
}
```

لاستخدام البرمجيات الوسيطة تحتاج إلى استخدام [دليل `Deno`](https://docs.deno.com/runtime/fundamentals/configuration/#custom-path-mappings) الصياغة في الاستيراد.

```json
{
  "imports": {
    "hono/": "npm:/hono/"
  }
}
```

عند استخدام وسائط الطرف الثالث، قد تحتاج إلى استخدام Hono من نفس السجل (registry) الذي تستخدمه الوسيطة لاستنتاج أنواع TypeScript بشكل صحيح. على سبيل المثال، إذا كنت تستخدم الوسيطة من npm، يجب عليك أيضًا استخدام Hono من npm:

```json
{
  "imports": {
    "hono": "npm:hono",
    "zod": "npm:zod",
    "@hono/zod-validator": "npm:@hono/zod-validator"
  }
}
```

نوفّر أيضاً العديد من حزم الوسيطات (middleware) التابعة لجهات خارجية على [`JSR`](https://jsr.io/@hono). عند استخدام الوسيطة (middleware) على JSR، استخدم Hono من JSR:

```json
{
  "imports": {
    "hono": "jsr:@hono/hono",
    "zod": "npm:zod",
    "@hono/zod-validator": "jsr:@hono/zod-validator"
  }
}
```
