---
title: "Azure Functions"
book: hono
chapter: getting-started
slug: azure-functions
order: 13
source: https://hono.dev/docs/getting-started/azure-functions
lang: ar
---

[Azure Functions](https://azure.microsoft.com/en-us/products/functions) هي منصة بدون خادم (serverless) من Microsoft Azure. يمكنك تشغيل كودك استجابةً للأحداث، وهي تدير تلقائيًا موارد الحوسبة الأساسية نيابة عنك.

لم يُصمَّم Hono لـ Azure Functions في البداية، ولكن مع [مُهايئ Azure Functions](https://github.com/Marplex/hono-azurefunc-adapter)، يمكنه العمل عليه أيضًا.

يعمل مع Azure Functions **V4** التي تعمل على Node.js 18 أو أحدث.

## 1. تثبيت CLI

لإنشاء Azure Function، يجب أولًا تثبيت [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?pivots=nodejs-model-v4#install-the-azure-functions-core-tools).

على macOS

```sh
brew tap azure/functions
brew install azure-functions-core-tools@4
```

اتبع هذا الرابط لأنظمة التشغيل الأخرى:

- [ثبِّت Azure Functions Core Tools | Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?pivots=nodejs-model-v4#install-the-azure-functions-core-tools)

## 2. الإعداد

أنشئ مشروع TypeScript Node.js V4 في المجلد الحالي.

```sh
func init --typescript
```

غيّر بادئة المسار الافتراضية للمضيف (host). أضف هذه الخاصية إلى كائن json الجذري الخاص بـ `host.json`:

```json
"extensions": {
    "http": {
        "routePrefix": ""
    }
}
```

بادئة مسار Azure Functions الافتراضية هي `/api`. إذا لم تغيّره كما هو موضح أعلاه، فتأكد من بدء جميع مسارات Hono الخاصة بك بـ `/api`

أنت الآن مستعد لتثبيت Hono ومحوّل (adapter) Azure Functions باستخدام:


```sh [npm]
npm i @marplex/hono-azurefunc-adapter hono
```

```sh [yarn]
yarn add @marplex/hono-azurefunc-adapter hono
```

```sh [pnpm]
pnpm add @marplex/hono-azurefunc-adapter hono
```

```sh [bun]
bun add @marplex/hono-azurefunc-adapter hono
```


## 3. مرحبًا بالعالم

إنشاء `src/app.ts`:

```ts
// src/app.ts
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hello Azure Functions!'))

export default app
```

إنشاء `src/functions/httpTrigger.ts`:

```ts
// src/functions/httpTrigger.ts
import { app } from '@azure/functions'
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter'
import honoApp from '../app'

app.http('httpTrigger', {
  methods: [
    //Add all your supported HTTP methods here
    'GET',
    'POST',
    'DELETE',
    'PUT',
  ],
  authLevel: 'anonymous',
  route: '{*proxy}',
  handler: azureHonoHandler(honoApp.fetch),
})
```

## 4. تشغيل

شغّل خادم التطوير محليًا. ثم، ادخل إلى `http://localhost:7071` في متصفح الويب الخاص بك.


```sh [npm]
npm run start
```

```sh [yarn]
yarn start
```

```sh [pnpm]
pnpm start
```

```sh [bun]
bun run start
```


## 5. النشر

قبل أن تتمكن من النشر إلى Azure، تحتاج إلى إنشاء بعض الموارد في بنيتك التحتية السحابية. يرجى زيارة وثائق Microsoft حول [أنشئ موارد Azure الداعمة لدالتك](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?pivots=nodejs-model-v4&tabs=windows%2Cazure-cli%2Cbrowser#create-supporting-azure-resources-for-your-function)

ابنِ المشروع للنشر:


```sh [npm]
npm run build
```

```sh [yarn]
yarn build
```

```sh [pnpm]
pnpm build
```

```sh [bun]
bun run build
```


انشر مشروعك إلى تطبيق الدوال (function app) في Azure Cloud. استبدل `<YourFunctionAppName>` باسم تطبيقك.

```sh
func azure functionapp publish <YourFunctionAppName>
```
