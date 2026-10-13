---
title: "`Fastly Compute`"
book: hono
chapter: getting-started
slug: fastly
order: 7
source: https://hono.dev/docs/getting-started/fastly
lang: ar
---

[`Fastly Compute`](https://www.fastly.com/products/edge-compute) هو نظام حوسبة حافة (edge computing) متقدم يشغّل كودك، بلغتك المفضلة، على شبكة الحافة العالمية لـ Fastly. يعمل Hono أيضًا على Fastly Compute.

يمكنك تطوير التطبيق محليًا ونشره بأوامر قليلة باستخدام [Fastly CLI](https://www.fastly.com/documentation/reference/tools/cli/)، والذي يُثبَّت محليًا تلقائيًا كجزء من القالب (template).

## 1. الإعداد

يتوفر قالب بداية لـ Fastly Compute.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `fastly` قالب لهذا المثال.


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
// src/index.ts
import { Hono } from 'hono'
import { fire } from '@fastly/hono-fastly-compute'

const app = new Hono()

app.get('/', (c) => c.text('Hello Fastly!'))

fire(app)
```

> [!NOTE]
> عند استخدام `fire` (أو `buildFire()`) من `@fastly/hono-fastly-compute'` على المستوى الأعلى (top level) لتطبيقك، من المناسب استخدام `Hono` من `'hono'` بدلاً من `'hono/quick'`، لأن `fire` يجعل الموجّه الخاص به يبني بياناته الداخلية أثناء مرحلة تهيئة التطبيق.

## 3. تشغيل

شغّل خادم التطوير محليًا. ثم، ادخل إلى `http://localhost:7676` في متصفح الويب الخاص بك.


```sh [npm]
npm run start
```

```sh [yarn]
yarn start
```

```sh [pnpm]
pnpm run start
```

```sh [bun]
bun run start
```


## 4. النشر

لإنشاء تطبيقك ونشره إلى حساب Fastly الخاص بك، اكتب الأمر التالي. في المرة الأولى التي تنشر فيها التطبيق، سيُطلب منك إنشاء خدمة جديدة في حسابك.

إذا لم يكن لديك حساب بعد، فيجب عليك [أنشئ حسابك على Fastly](https://www.fastly.com/signup/).


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

في Fastly Compute، يمكنك ربط موارد منصة Fastly، مثل KV Stores و Config Stores و Secret Stores و Backends وقوائم التحكم في الوصول (Access Control Lists) وتدفقات السجلات المسماة (Named Log Streams) ومتغيرات البيئة. يمكنك الوصول إليها من خلال `c.env`، وستكون لها أنواع SDK الخاصة بها.

لاستخدام هذه الارتباطات (bindings)، استورد `buildFire` بدلاً من `fire` من `@fastly/hono-fastly-compute`. عرّف [الارتباطات](https://github.com/fastly/compute-js-context?tab=readme-ov-file#typed-bindings-with-buildcontextproxy) ومرِّرها إلى [`buildFire()`](https://github.com/fastly/hono-fastly-compute?tab=readme-ov-file#basic-example) للحصول على `fire`. ثم استخدم `fire.Bindings` لتعريف `Env` النوع عند إنشاء `Hono`.

```ts
// src/index.ts
import { buildFire } from '@fastly/hono-fastly-compute'

const fire = buildFire({
  siteData: 'KVStore:site-data', // I have a KV Store named "site-data"
})

const app = new Hono<{ Bindings: typeof fire.Bindings }>()

app.put('/upload/:key', async (c, next) => {
  // e.g., Access the KV Store
  const key = c.req.param('key')
  await c.env.siteData.put(key, c.req.body)
  return c.text(`Put ${key} successfully!`)
})

fire(app)
```
