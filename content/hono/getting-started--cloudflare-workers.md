---
title: "Cloudflare Workers"
book: hono
chapter: getting-started
slug: cloudflare-workers
order: 2
source: https://hono.dev/docs/getting-started/cloudflare-workers
lang: ar
---

[Cloudflare Workers](https://workers.cloudflare.com) بيئة تشغيل JavaScript على الحافة (edge) في Cloudflare CDN.

يمكنك تطوير التطبيق محليًا ونشره بأوامر قليلة باستخدام [Wrangler](https://developers.cloudflare.com/workers/wrangler/).
يتضمن Wrangler محوّل شفرة (transcompiler)، لذا يمكننا كتابة الكود بلغة TypeScript.

لننشئ تطبيقك الأول لـ Cloudflare Workers باستخدام Hono.

## 1. الإعداد

يتوفر قالب بداية لـ Cloudflare Workers.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `cloudflare-workers` قالب لهذا المثال.


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

تعديل `src/index.ts` كما هو موضح أدناه.

```ts
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hello Cloudflare Workers!'))

export default app
```

## 3. تشغيل

شغّل خادم التطوير محليًا. ثم، ادخل إلى `http://localhost:8787` في متصفح الويب الخاص بك.


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


### تغيير رقم المنفذ

إذا كنت بحاجة إلى تغيير رقم المنفذ، يمكنك اتباع التعليمات هنا لتحديث `wrangler.toml` / `wrangler.json` / `wrangler.jsonc` files:
[إعداد Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/#local-development-settings)

أو، يمكنك اتباع التعليمات هنا لضبط خيارات CLI:
[`Wrangler CLI`](https://developers.cloudflare.com/workers/wrangler/commands/#dev)

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


هذا كل شيء!

## استخدام Hono مع معالجات أحداث أخرى

يمكنك دمج Hono مع معالجات أحداث (event handlers) أخرى (مثل `scheduled`) في _وضع Module Worker_.

لفعل ذلك، صدّر `app.fetch` كخاصية للوحدة `fetch` المعالج، ثم نفّذ المعالجات الأخرى حسب الحاجة:

```ts
const app = new Hono()

export default {
  fetch: app.fetch,
  scheduled: async (batch, env) => {},
}
```

## تقديم الملفات الثابتة

إذا أردت تقديم ملفات ثابتة، يمكنك استخدام [ميزة الأصول الثابتة (Static Assets)](https://developers.cloudflare.com/workers/static-assets/) الخاصة بـ Cloudflare Workers. حدِّد دليل الملفات في `wrangler.jsonc`:

```jsonc
"assets": { "directory": "public" }
```

ثم أنشئ `public` الدليل وضع الملفات هناك. على سبيل المثال، `./public/static/hello.txt` سيُقدَّم كـ `/static/hello.txt`.

```
.
├── package.json
├── public
│   ├── favicon.ico
│   └── static
│       └── hello.txt
├── src
│   └── index.ts
└── wrangler.jsonc
```

## الأنواع

يجب عليك تثبيت `@cloudflare/workers-types` إذا كنت تريد الحصول على أنواع workers.


```sh [npm]
npm i --save-dev @cloudflare/workers-types
```

```sh [yarn]
yarn add -D @cloudflare/workers-types
```

```sh [pnpm]
pnpm add -D @cloudflare/workers-types
```

```sh [bun]
bun add --dev @cloudflare/workers-types
```


## الاختبار

للاختبار، نوصي باستخدام `@cloudflare/vitest-pool-workers`.
راجع [أمثلة](https://github.com/honojs/examples) لإعداده.

إذا كان هناك التطبيق أدناه.

```ts
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Please test me!'))
```

يمكننا اختبار ما إذا كانت تُعيد استجابة "_200 OK_" بهذا الكود.

```ts
describe('Test the application', () => {
  it('Should return 200 response', async () => {
    const res = await app.request('http://localhost/')
    expect(res.status).toBe(200)
  })
})
```

## الارتباطات

في Cloudflare Workers، يمكننا ربط قيم البيئة، أو مساحة أسماء KV namespace، أو حاوية R2 bucket، أو كائن Durable Object. يمكنك الوصول إليها في `c.env`. ستمتلك الأنواع (types) إذا مررت "_تعريف النوع_" للارتباطات (bindings) إلى `Hono` كأنواع عامة.

```ts
type Bindings = {
  MY_BUCKET: R2Bucket
  USERNAME: string
  PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Access to environment values
app.put('/upload/:key', async (c, next) => {
  const key = c.req.param('key')
  await c.env.MY_BUCKET.put(key, c.req.body)
  return c.text(`Put ${key} successfully!`)
})
```

### توليد أنواع الارتباطات (Bindings) تلقائيًا

بدلًا من تعريف أنواع الروابط (bindings) يدويًا، يمكنك توليدها تلقائيًا من `wrangler.toml` باستخدام `wrangler types` الأمر. استخدم `--env-interface` العلم لتجنب تعارض في التسمية مع المدمج في Hono `Env` type:

```sh
wrangler types --env-interface CloudflareBindings
```

يولِّد هذا `worker-configuration.d.ts` ملف باسم الواجهة (interface) الذي تحدِّده. ثم مرِّره إلى Hono:

```ts
const app = new Hono<{ Bindings: CloudflareBindings }>()

app.put('/upload/:key', async (c, next) => {
  const key = c.req.param('key')
  await c.env.MY_BUCKET.put(key, c.req.body)
  return c.text(`Put ${key} successfully!`)
})
```

## استخدام المتغيرات في البرمجيات الوسيطة

هذه هي الحالة الوحيدة لوضع Module Worker.
إذا كنت تريد استخدام المتغيرات (Variables) أو المتغيرات السرية (Secret Variables) في الوسائط، على سبيل المثال، "username" أو "password" في وسيط المصادقة الأساسية (Basic Authentication Middleware)، فأنت بحاجة إلى الكتابة كما يلي.

```ts
import { basicAuth } from 'hono/basic-auth'

type Bindings = {
  USERNAME: string
  PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>()

//...

app.use('/auth/*', async (c, next) => {
  const auth = basicAuth({
    username: c.env.USERNAME,
    password: c.env.PASSWORD,
  })
  return auth(c, next)
})
```

ينطبق الأمر نفسه على وسيطة مصادقة Bearer ووسيطة مصادقة JWT، أو غيرها.

## النشر من GitHub Actions

قبل نشر الكود إلى Cloudflare عبر CI، تحتاج إلى رمز مميز خاص بـ Cloudflare. يمكنك إدارته من [رموز API للمستخدم](https://dash.cloudflare.com/profile/api-tokens).

إذا كان رمزًا (token) تم إنشاؤه حديثًا، فحدد قالب **Edit Cloudflare Workers**. إذا كان لديك بالفعل رمز آخر، تأكد من أن الرمز لديه الأذونات المقابلة.

ثم انتقل إلى لوحة إعدادات مستودعك على GitHub: `Settings->Secrets and variables->Actions->Repository secrets`، وأضف سرًّا جديدًا بالاسم `CLOUDFLARE_API_TOKEN`.

ثم أنشئ `.github/workflows/deploy.yml` في مجلد جذر مشروع Hono الخاص بك، الصق الكود التالي:

```yml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

ثم حرِّر `wrangler.jsonc`، وأضف هذا الرمز بعد `compatibility_date` سطر.

```jsonc
"main": "src/index.ts",
"minify": true
```

كل شيء جاهز! الآن ادفع الشفرة واستمتع بها.

## تحميل متغيرات البيئة أثناء التطوير المحلي

لتكوين متغيرات البيئة (environment variables) للتطوير المحلي، أنشئ ملف `.dev.vars` ملف أو `.env` ملف في الدليل الجذر للمشروع.
يجب تنسيق هذه الملفات باستخدام [dotenv](https://hexdocs.pm/dotenvy/dotenv-file-format.html) الصياغة. على سبيل المثال:

```
SECRET_KEY=value
API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

> لمزيد من المعلومات حول هذا القسم، يمكنك مراجعة توثيق Cloudflare:
> https://developers.cloudflare.com/workers/wrangler/configuration/#secrets

ثم نستخدم `c.env.*` للحصول على متغيّرات البيئة في شفرتنا.

بشكل افتراضي، `process.env` غير متاح في Cloudflare Workers، لذا يُنصح بالحصول على متغيرات البيئة من `c.env`. إذا أردت استخدامه، فيجب عليك تمكين [`nodejs_compat_populate_process_env`](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enable-auto-populating-processenv) العلم. يمكنك أيضًا استيراد `env` من `cloudflare:workers`. لمزيد من التفاصيل، يُرجى الاطلاع على [كيفية الوصول إلى `env` في وثائق Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/bindings/#how-to-access-env)

```ts
type Bindings = {
  SECRET_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/env', (c) => {
  const SECRET_KEY = c.env.SECRET_KEY
  return c.text(SECRET_KEY)
})
```

قبل نشر مشروعك إلى Cloudflare، تذكر تعيين متغيرات البيئة/الأسرار (secrets) في إعداد مشروع Cloudflare Workers.

> لمزيد من المعلومات حول هذا القسم، يمكنك مراجعة توثيق Cloudflare:
> https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard
