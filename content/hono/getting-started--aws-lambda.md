---
title: "AWS Lambda"
book: hono
chapter: getting-started
slug: aws-lambda
order: 11
source: https://hono.dev/docs/getting-started/aws-lambda
lang: ar
---

AWS Lambda هي منصة بلا خوادم (serverless) من Amazon Web Services.
يمكنك تشغيل الكود الخاص بك استجابةً للأحداث، وتتم إدارة موارد الحوسبة الأساسية تلقائيًا نيابة عنك.

يعمل Hono على AWS Lambda مع بيئة Node.js 18+.

## 1. الإعداد

عند إنشاء التطبيق على AWS Lambda،
[`CDK`](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
مفيدة لإعداد الوظائف مثل دور IAM (IAM Role) و API Gateway وغيرها.

هيّئ مشروعك باستخدام `cdk` CLI.


```sh [npm]
mkdir my-app
cd my-app
cdk init app -l typescript
npm i hono @hono/aws-lambda
npm i -D esbuild
mkdir lambda
touch lambda/index.ts
```

```sh [yarn]
mkdir my-app
cd my-app
cdk init app -l typescript
yarn add hono @hono/aws-lambda
yarn add -D esbuild
mkdir lambda
touch lambda/index.ts
```

```sh [pnpm]
mkdir my-app
cd my-app
cdk init app -l typescript
pnpm add hono @hono/aws-lambda
pnpm add -D esbuild
mkdir lambda
touch lambda/index.ts
```

```sh [bun]
mkdir my-app
cd my-app
cdk init app -l typescript
bun add hono @hono/aws-lambda
bun add -D esbuild
mkdir lambda
touch lambda/index.ts
```


## 2. مرحبًا بالعالم

تعديل `lambda/index.ts`.

```ts
import { Hono } from 'hono'
import { handle } from '@hono/aws-lambda'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

export const handler = handle(app)
```

## 3. النشر

تعديل `lib/my-app-stack.ts`.

```ts
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export class MyAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const fn = new NodejsFunction(this, 'lambda', {
      entry: 'lambda/index.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
    })
    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    })
    new cdk.CfnOutput(this, 'lambdaUrl', {
      value: fnUrl.url!,
    })
  }
}
```

أخيرًا، شغّل الأمر للنشر:

```sh
cdk deploy
```

## تقديم البيانات الثنائية

يدعم Hono البيانات الثنائية كاستجابة.
في Lambda، يلزم ترميز base64 لإرجاع بيانات ثنائية (binary).
بمجرد تعيين النوع الثنائي إلى `Content-Type` الترويسة، يُرمّز Hono البيانات تلقائيًا إلى base64.

```ts
app.get('/binary', async (c) => {
  // ...
  c.status(200)
  c.header('Content-Type', 'image/png') // means binary data
  return c.body(buffer) // supports `ArrayBufferLike` type, encoded to base64.
})
```

## الوصول إلى كائن AWS Lambda

في Hono، يمكنك الوصول إلى أحداث (Events) وسياق (Context) AWS Lambda عن طريق ربط `LambdaEvent`, `LambdaContext` النوع وباستخدام `c.env`

```ts
import { Hono } from 'hono'
import type { LambdaEvent, LambdaContext } from '@hono/aws-lambda'
import { handle } from '@hono/aws-lambda'

type Bindings = {
  event: LambdaEvent
  lambdaContext: LambdaContext
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/aws-lambda-info/', (c) => {
  return c.json({
    isBase64Encoded: c.env.event.isBase64Encoded,
    awsRequestId: c.env.lambdaContext.awsRequestId,
  })
})

export const handler = handle(app)
```

## الوصول إلى RequestContext

في Hono، يمكنك الوصول إلى سياق طلب AWS Lambda عن طريق ربط `LambdaEvent` النوع وباستخدام `c.env.event.requestContext`.

```ts
import { Hono } from 'hono'
import type { LambdaEvent } from '@hono/aws-lambda'
import { handle } from '@hono/aws-lambda'

type Bindings = {
  event: LambdaEvent
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/custom-context/', (c) => {
  const lambdaContext = c.env.event.requestContext
  return c.json(lambdaContext)
})

export const handler = handle(app)
```

### قبل الإصدار v3.10.0 (مهمل)

يمكنك الوصول إلى سياق طلب AWS Lambda (request context) عبر ربط `ApiGatewayRequestContext` النوع وباستخدام `c.env.`

```ts
import { Hono } from 'hono'
import type { ApiGatewayRequestContext } from '@hono/aws-lambda'
import { handle } from '@hono/aws-lambda'

type Bindings = {
  requestContext: ApiGatewayRequestContext
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/custom-context/', (c) => {
  const lambdaContext = c.env.requestContext
  return c.json(lambdaContext)
})

export const handler = handle(app)
```

## بث استجابات Lambda

عبر تغيير وضع الاستدعاء (invocation mode) في AWS Lambda، يمكنك تحقيق [استجابة البث](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-response-streaming/).

```diff
fn.addFunctionUrl({
  authType: lambda.FunctionUrlAuthType.NONE,
+  invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
})
```

عادةً، يتطلب التنفيذ كتابة أجزاء (chunks) إلى NodeJS.WritableStream باستخدام awslambda.streamifyResponse، لكن مع محول AWS Lambda (AWS Lambda Adaptor)، يمكنك تحقيق استجابة البث التقليدية لـ Hono باستخدام streamHandle بدلًا من handle.

```ts
import { Hono } from 'hono'
import { streamHandle } from '@hono/aws-lambda'
import { streamText } from 'hono/streaming'

const app = new Hono()

app.get('/stream', async (c) => {
  return streamText(c, async (stream) => {
    for (let i = 0; i < 3; i++) {
      await stream.writeln(`${i}`)
      await stream.sleep(1)
    }
  })
})

export const handler = streamHandle(app)
```
