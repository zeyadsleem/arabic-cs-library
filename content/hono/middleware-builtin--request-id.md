---
title: "البرمجية الوسيطة Request ID"
book: hono
chapter: middleware-builtin
slug: request-id
order: 48
source: https://hono.dev/docs/middleware/builtin/request-id
lang: ar
---

تولّد وسيطة معرف الطلب (Request ID Middleware) معرفًا فريدًا لكل طلب، يمكنك استخدامه في معالجاتك.

**Node.js**: تستخدم هذه البرمجية الوسيطة `crypto.randomUUID()` لتوليد المعرّفات (IDs). أما العام `crypto` تم تقديمه في Node.js الإصدار 20 أو أحدث. لذلك، قد تحدث أخطاء في الإصدارات الأقدم من ذلك. في هذه الحالة، يرجى تحديد `generator`. ومع ذلك، إذا كنت تستخدم [مُهايئ Node.js](https://github.com/honojs/node-server)، فإنه يضبط تلقائيًا `crypto` عالميًا، لذا هذا ليس ضروريًا.

## Import

```ts
import { Hono } from 'hono'
import { requestId } from 'hono/request-id'
```

## الاستخدام

يمكنك الوصول إلى معرّف الطلب (Request ID) عبر `requestId` متغير داخل المعالجات والوسائط التي تُطبَّق عليها وسيطة معرف الطلب (Request ID Middleware).

```ts
const app = new Hono()

app.use('*', requestId())

app.get('/', (c) => {
  return c.text(`Your request id is ${c.get('requestId')}`)
})
```

إذا أردت تحديد النوع صراحةً، فاستورد `RequestIdVariables` ومرّرها في الأنواع العامة (generics) الخاصة بـ `new Hono()`.

```ts
import type { RequestIdVariables } from 'hono/request-id'

const app = new Hono<{
  Variables: RequestIdVariables
}>()
```

### تعيين معرّف الطلب

تعيّن معرّف طلب مخصّصًا في الترويسة (الافتراضي: `X-Request-Id`)، سيستخدم الوسيط (middleware) تلك القيمة بدلًا من توليد قيمة جديدة:

```ts
const app = new Hono()

app.use('*', requestId())

app.get('/', (c) => {
  return c.text(`${c.get('requestId')}`)
})

const res = await app.request('/', {
  headers: {
    'X-Request-Id': 'your-custom-id',
  },
})
console.log(await res.text()) // your-custom-id
```

إذا كنت تريد تعطيل هذه الميزة، اضبط [`headerName` خيار](#headername-string) إلى سلسلة نصية فارغة.

## الخيارات

### <Badge type="info" text="optional" /> `limitLength`: `number`

الحد الأقصى لطول معرّف الطلب. الافتراضي هو `255`.

### <Badge type="info" text="optional" /> `headerName`: `string`

اسم الترويسة (header) المستخدَم لمعرّف الطلب (request ID). الافتراضي هو `X-Request-Id`.

### <Badge type="info" text="optional" /> generator: `(c: Context) => string`

دالة توليد معرّف الطلب (request ID). افتراضياً، تستخدم `crypto.randomUUID()`.

## معرّفات الطلبات الخاصة بكل منصة

بعض المنصات (مثل AWS Lambda) تولّد بالفعل معرفات الطلبات الخاصة بها لكل طلب.
بدون أي إعداد إضافي، لا تدرك هذه الوسيطة معرفات الطلبات المحددة هذه
وتولّد معرف طلب جديدًا. قد يؤدي هذا إلى الارتباك عند الاطلاع على سجلات تطبيقك.

توحيد هذه المعرّفات، استخدم `generator` دالة لالتقاط معرف الطلب الخاص بالمنصة واستخدامه في هذه الوسيطة.

### روابط خاصة بالمنصّة

- AWS Lambda
  - [وثائق AWS: كائن Context](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html)
  - [Hono: الوصول إلى كائن AWS Lambda](https://hono.dev/docs/getting-started/aws-lambda#access-aws-lambda-object)
- Cloudflare
  - [Cloudflare Ray ID
    ](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/)
- Deno
  - [معرّف الطلب على مدونة Deno](https://deno.com/blog/zero-config-debugging-deno-opentelemetry#:~:text=s%20automatically%20have-,unique%20request%20IDs,-associated%20with%20them)
- Fastly
  - [توثيق Fastly: req.xid](https://www.fastly.com/documentation/reference/vcl/variables/client-request/req-xid/)
