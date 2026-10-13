---
title: "Tencent CloudBase"
book: hono
chapter: getting-started
slug: cloudbase
order: 17
source: https://hono.dev/docs/getting-started/cloudbase
lang: ar
---

[Tencent CloudBase](https://docs.cloudbase.net/en/) منصّة الخدمات الخلفية بلا خادم (serverless) من Tencent Cloud. [دوال HTTP السحابية](https://docs.cloudbase.net/en/cloud-function/develop/how-to-writing-functions-code) يعمل كعملية Node.js عادية (plain process). يستمع تطبيقك على المنفذ `9000`، ويشغّلها CloudBase عبر [`scf_bootstrap`](https://docs.cloudbase.net/en/cloud-function/develop/scf-bootstrap). [`@hono/node-server`](https://github.com/honojs/node-server) يعمل كما هو. لا حاجة لمحوّل (adapter) Hono إضافي.

## 1. الإعداد

ابدأ مشروعك بالأمر "create-hono". اختر `nodejs`.


```sh [npm]
npm create hono@latest my-app
cd my-app
npm i
```

```sh [yarn]
yarn create hono my-app
cd my-app
yarn
```

```sh [pnpm]
pnpm create hono my-app
cd my-app
pnpm i
```

```sh [bun]
bun create hono@latest my-app
cd my-app
bun i
```


## 2. مرحبًا بالعالم

تعديل `src/index.ts`. تتطلّب CloudBase HTTP Cloud Functions المنفذ `9000`.

```ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello CloudBase!'))

serve({
  fetch: app.fetch,
  port: 9000,
})
```

## 3. تشغيل

```sh
npm run dev
```

ثم الوصول إلى `http://localhost:9000`.

## 4. Bootstrap

إنشاء `scf_bootstrap` في جذر المشروع (بدون امتداد ملف) واجعله قابلاً للتنفيذ:

```sh
#!/bin/bash
/var/lang/node20/bin/node dist/index.js
```

```sh
chmod +x scf_bootstrap
```

استخدم نهايات الأسطر بنمط LF. يجب أن يطابق مسار Node بيئة تشغيل الدالة؛ `/var/lang/node20/bin/node` مخصص لـ Node.js 20.19.

## 5. النشر

ابنِ التطبيق، ثم انشر دالة HTTP (Node.js 20.19) باستخدام [`CloudBase CLI`](https://docs.cloudbase.net/en/cli-v1/functions/deploy):

```sh
npm run build
tcb fn deploy <function-name> --httpFn
```

لرفع ملف zip عبر وحدة التحكم، انظر [البدء السريع لدالة HTTP في Node.js](https://docs.cloudbase.net/en/cloud-function/quickstart/httpfunc/nodejs).
