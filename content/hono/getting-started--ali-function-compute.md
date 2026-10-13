---
title: "Alibaba Cloud Function Compute"
book: hono
chapter: getting-started
slug: ali-function-compute
order: 16
source: https://hono.dev/docs/getting-started/ali-function-compute
lang: ar
---

[Alibaba Cloud Function Compute](https://www.alibabacloud.com/en/product/function-compute) هي خدمة حوسبة مدارة بالكامل ومحركة بالأحداث (event-driven). يتيح لك Function Compute التركيز على كتابة ورفع الكود دون الحاجة إلى إدارة البنية التحتية مثل الخوادم.

يستخدم هذا الدليل محوّلًا (adapter) من طرف ثالث [rwv/hono-alibaba-cloud-fc3-adapter](https://github.com/rwv/hono-alibaba-cloud-fc3-adapter) لتشغيل Hono على Alibaba Cloud Function Compute.

## 1. الإعداد


```sh [npm]
mkdir my-app
cd my-app
npm i hono hono-alibaba-cloud-fc3-adapter
npm i -D @serverless-devs/s esbuild
mkdir src
touch src/index.ts
```

```sh [yarn]
mkdir my-app
cd my-app
yarn add hono hono-alibaba-cloud-fc3-adapter
yarn add -D @serverless-devs/s esbuild
mkdir src
touch src/index.ts
```

```sh [pnpm]
mkdir my-app
cd my-app
pnpm add hono hono-alibaba-cloud-fc3-adapter
pnpm add -D @serverless-devs/s esbuild
mkdir src
touch src/index.ts
```

```sh [bun]
mkdir my-app
cd my-app
bun add hono hono-alibaba-cloud-fc3-adapter
bun add -D esbuild @serverless-devs/s
mkdir src
touch src/index.ts
```


## 2. مرحبًا بالعالم

تعديل `src/index.ts`.

```ts
import { Hono } from 'hono'
import { handle } from 'hono-alibaba-cloud-fc3-adapter'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

export const handler = handle(app)
```

## 3. إعداد serverless-devs

> [serverless-devs](https://github.com/Serverless-Devs/Serverless-Devs) هي منصة تطوير بدون خادم (serverless) مفتوحة المصدر ومفتوحة، مخصصة لتزويد المطورين بنظام سلسلة أدوات (tool chain) قوي. من خلال هذه المنصة، لا يمكن للمطورين تجربة منتجات serverless متعددة السحابات بنقرة واحدة ونشر مشاريع serverless بسرعة فحسب، بل يمكنهم أيضًا إدارة المشاريع في دورة الحياة الكاملة لتطبيقات serverless، والجمع بين مطوري serverless والأدوات/المنصات الأخرى ببساطة وسرعة لزيادة كفاءة البحث والتطوير (R & D) والتشغيل والصيانة.

أضف AccessKeyID و AccessKeySecret الخاصين بـ Alibaba Cloud

```sh
npx s config add
# Please select a provider: Alibaba Cloud (alibaba)
# Input your AccessKeyID & AccessKeySecret
```

تعديل `s.yaml`

```yaml
edition: 3.0.0
name: my-app
access: 'default'

vars:
  region: 'us-west-1'

resources:
  my-app:
    component: fc3
    props:
      region: ${vars.region}
      functionName: 'my-app'
      description: 'Hello World by Hono'
      runtime: 'nodejs20'
      code: ./dist
      handler: index.handler
      memorySize: 1024
      timeout: 300
```

تعديل `scripts` القسم في `package.json`:

```json
{
  "scripts": {
    "build": "esbuild --bundle --outfile=./dist/index.js --platform=node --target=node20 ./src/index.ts",
    "deploy": "s deploy -y"
  }
}
```

## 4. النشر

أخيرًا، شغّل الأمر للنشر:

```sh
npm run build # Compile the TypeScript code to JavaScript
npm run deploy # Deploy the function to Alibaba Cloud Function Compute
```
