---
title: "Lambda@Edge"
book: hono
chapter: getting-started
slug: lambda-edge
order: 12
source: https://hono.dev/docs/getting-started/lambda-edge
lang: ar
---

[Lambda@Edge](https://aws.amazon.com/lambda/edge/) هي منصة بدون خادم (serverless) من Amazon Web Services. تتيح لك تشغيل دوال Lambda في مواقع الحافة (edge locations) لـ Amazon CloudFront، مما يمكنك من تخصيص سلوكيات طلبات/استجابات HTTP.

يدعم Hono منصة Lambda@Edge مع بيئة Node.js 18+.

## 1. الإعداد

عند إنشاء التطبيق على Lambda@Edge،
[`CDK`](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-cdk.html)
مفيدة لإعداد الدوال مثل CloudFront و IAM Role و API Gateway وغيرها.

هيّئ مشروعك باستخدام `cdk` CLI.


```sh [npm]
mkdir my-app
cd my-app
cdk init app -l typescript
npm i hono @hono/lambda-edge
mkdir lambda
```

```sh [yarn]
mkdir my-app
cd my-app
cdk init app -l typescript
yarn add hono @hono/lambda-edge
mkdir lambda
```

```sh [pnpm]
mkdir my-app
cd my-app
cdk init app -l typescript
pnpm add hono @hono/lambda-edge
mkdir lambda
```

```sh [bun]
mkdir my-app
cd my-app
cdk init app -l typescript
bun add hono @hono/lambda-edge
mkdir lambda
```


## 2. مرحبًا بالعالم

تعديل `lambda/index_edge.ts`.

```ts
import { Hono } from 'hono'
import { handle } from '@hono/lambda-edge'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono on Lambda@Edge!'))

export const handler = handle(app)
```

## 3. النشر

تعديل `bin/my-app.ts`.

```ts
#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { MyAppStack } from '../lib/my-app-stack'

const app = new cdk.App()
new MyAppStack(app, 'MyAppStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
})
```

تعديل `lambda/cdk-stack.ts`.

```ts
import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class MyAppStack extends cdk.Stack {
  public readonly edgeFn: lambda.Function

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    const edgeFn = new NodejsFunction(this, 'edgeViewer', {
      entry: 'lambda/index_edge.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
    })

    // Upload any html
    const originBucket = new s3.Bucket(this, 'originBucket')

    new cloudfront.Distribution(this, 'Cdn', {
      defaultBehavior: {
        origin: new origins.S3Origin(originBucket),
        edgeLambdas: [
          {
            functionVersion: edgeFn.currentVersion,
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
          },
        ],
      },
    })
  }
}
```

أخيرًا، شغّل الأمر للنشر:

```sh
cdk deploy
```

## الاستدعاء

إذا كنت تريد إضافة المصادقة الأساسية (Basic Auth) ومواصلة معالجة الطلب بعد التحقق، يمكنك استخدام `c.env.callback()`

```ts
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import type { Callback, CloudFrontRequest } from '@hono/lambda-edge'
import { handle } from '@hono/lambda-edge'

type Bindings = {
  callback: Callback
  request: CloudFrontRequest
}

const app = new Hono<{ Bindings: Bindings }>()

app.get(
  '*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

app.get('/', async (c, next) => {
  await next()
  c.env.callback(null, c.env.request)
})

export const handler = handle(app)
```
