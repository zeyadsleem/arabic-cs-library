---
title: "التحقق"
book: hono
chapter: guides
slug: validation
order: 77
source: https://hono.dev/docs/guides/validation
lang: ar
---

يوفّر Hono مدقّقًا رفيعًا جدًا فقط.
ومع ذلك، يمكن أن يكون قويًا عند دمجه مع مدقق (Validator) من جهة خارجية.
بالإضافة إلى ذلك، تتيح لك ميزة RPC مشاركة مواصفات API مع عملائك من خلال الأنواع (types).

## مُدقّق يدوي

أولًا، قدّم طريقة للتحقق من القيم الواردة دون استخدام أداة التحقق (Validator) من طرف ثالث.

استيراد `validator` من `hono/validator`.

```ts
import { validator } from 'hono/validator'
```

للتحقق من بيانات النموذج، حدّد `form` كوسيط أول ورد نداء (callback) كوسيط ثانٍ.
في دالة الاستدعاء (callback)، يتم التحقق من القيمة وإرجاع القيم التي تم التحقق منها في النهاية.
الـ `validator` يمكن استخدامه كوسيط (middleware).

```ts
app.post(
  '/posts',
  validator('form', (value, c) => {
    const body = value['body']
    if (!body || typeof body !== 'string') {
      return c.text('Invalid!', 400)
    }
    return {
      body: body,
    }
  }),
  //...
```

داخل المعالج (handler)، يمكنك الحصول على القيمة المتحقَّق منها عبر `c.req.valid('form')`.

```ts
, (c) => {
  const { body } = c.req.valid('form')
  // ... do something
  return c.json(
    {
      message: 'Created!',
    },
    201
  )
}
```

تشمل أهداف التحقق `json`, `query`, `header`, `param` و `cookie` بالإضافة إلى `form`.

عندما تتحقق من `json` أو `form`، يجب أن يحتوي الطلب _بالضرورة_ على مطابق `content-type` الترويسة (على سبيل المثال `Content-Type: application/json` لـ `json`). وإلا، فلن يتم تحليل جسم الطلب وستتلقى كائنًا فارغًا (`{}`) كقيمة في دالة الاستدعاء.

من المهم تعيين `content-type` الترويسة عند الاختبار باستخدام
[`app.request()`](https://hono.dev/docs/api/request).

بالنظر إلى تطبيق كهذا.

```ts
const app = new Hono()
app.post(
  '/testing',
  validator('json', (value, c) => {
    // pass-through validator
    return value
  }),
  (c) => {
    const body = c.req.valid('json')
    return c.json(body)
  }
)
```

يمكن كتابة اختباراتك هكذا.

```ts
// ❌ this will not work
const res = await app.request('/testing', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' }),
})
const data = await res.json()
console.log(data) // {}

// ✅ this will work
const res = await app.request('/testing', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' }),
  headers: new Headers({ 'Content-Type': 'application/json' }),
})
const data = await res.json()
console.log(data) // { key: 'value' }
```


عندما تتحقق من `header`، تحتاج إلى استخدام اسم **بحروف صغيرة** كمفتاح.

إذا أردت التحقق من `Idempotency-Key` الترويسة، تحتاج إلى استخدام `idempotency-key` كمفتاح.

```ts
// ❌ this will not work
app.post(
  '/api',
  validator('header', (value, c) => {
    // idempotencyKey is always undefined
    // so this middleware always return 400 as not expected
    const idempotencyKey = value['Idempotency-Key']

    if (idempotencyKey == undefined || idempotencyKey === '') {
      throw new HTTPException(400, {
        message: 'Idempotency-Key is required',
      })
    }
    return { idempotencyKey }
  }),
  (c) => {
    const { idempotencyKey } = c.req.valid('header')
    // ...
  }
)

// ✅ this will work
app.post(
  '/api',
  validator('header', (value, c) => {
    // can retrieve the value of the header as expected
    const idempotencyKey = value['idempotency-key']

    if (idempotencyKey == undefined || idempotencyKey === '') {
      throw new HTTPException(400, {
        message: 'Idempotency-Key is required',
      })
    }
    return { idempotencyKey }
  }),
  (c) => {
    const { idempotencyKey } = c.req.valid('header')
    // ...
  }
)
```


## مُدقّقات متعددة

يمكنك أيضًا تضمين عدة أدوات تحقق (validators) للتحقق من أجزاء مختلفة من الطلب:

```ts
app.post(
  '/posts/:id',
  validator('param', ...),
  validator('query', ...),
  validator('json', ...),
  (c) => {
    //...
  }
)
```

## مع Zod

يمكنك استخدام [`Zod`](https://zod.dev)، وهو أحد المدقّقات الخارجية.
نوصي باستخدام مدقّق خارجي.

التثبيت من سجل Npm.


```sh [npm]
npm i zod
```

```sh [yarn]
yarn add zod
```

```sh [pnpm]
pnpm add zod
```

```sh [bun]
bun add zod
```


استيراد `z` من `zod`.

```ts
import * as z from 'zod'
```

اكتب مخططك.

```ts
const schema = z.object({
  body: z.string(),
})
```

يمكنك استخدام المخطط (schema) في دالة الاستدعاء للتحقق وإرجاع القيمة التي تم التحقق منها.

```ts
const route = app.post(
  '/posts',
  validator('form', (value, c) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
      return c.text('Invalid!', 401)
    }
    return parsed.data
  }),
  (c) => {
    const { body } = c.req.valid('form')
    // ... do something
    return c.json(
      {
        message: 'Created!',
      },
      201
    )
  }
)
```

## برمجية وسيطة للتحقق بـ Zod

يمكنك استخدام [وسيط التحقق Zod](https://github.com/honojs/middleware/tree/main/packages/zod-validator) لجعله أسهل.


```sh [npm]
npm i @hono/zod-validator
```

```sh [yarn]
yarn add @hono/zod-validator
```

```sh [pnpm]
pnpm add @hono/zod-validator
```

```sh [bun]
bun add @hono/zod-validator
```


واستورد `zValidator`.

```ts
import { zValidator } from '@hono/zod-validator'
```

واكتب كما يلي.

```ts
const route = app.post(
  '/posts',
  zValidator(
    'form',
    z.object({
      body: z.string(),
    })
  ),
  (c) => {
    const validated = c.req.valid('form')
    // ... use your validated data
  }
)
```

## برمجية وسيطة للتحقق بـ Standard Schema

[المخطط القياسي (Standard Schema)](https://standardschema.dev/) هي مواصفة توفر واجهة مشتركة لمكتبات التحقق في TypeScript. أنشأها القائمون على صيانة Zod و Valibot و ArkType للسماح لأدوات النظام البيئي بالعمل مع أي مكتبة تحقق دون الحاجة إلى محولات مخصصة.

الـ [برمجية Standard Schema Validator الوسيطة](https://github.com/honojs/middleware/tree/main/packages/standard-validator) يتيح لك استخدام أي مكتبة تحقق متوافقة مع Standard Schema مع Hono، مما يمنحك المرونة لاختيار أداة التحقق المفضلة لديك مع الحفاظ على أمان الأنواع بشكل متسق.


```sh [npm]
npm i @hono/standard-validator
```

```sh [yarn]
yarn add @hono/standard-validator
```

```sh [pnpm]
pnpm add @hono/standard-validator
```

```sh [bun]
bun add @hono/standard-validator
```


استيراد `sValidator` من الحزمة:

```ts
import { sValidator } from '@hono/standard-validator'
```

### مع Zod

يمكنك استخدام Zod مع مُدقّق Standard Schema:


```sh [npm]
npm i zod
```

```sh [yarn]
yarn add zod
```

```sh [pnpm]
pnpm add zod
```

```sh [bun]
bun add zod
```


```ts
import * as z from 'zod'
import { sValidator } from '@hono/standard-validator'

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

app.post('/author', sValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  })
})
```

### مع Valibot

[Valibot](https://valibot.dev/) بديل خفيف الوزن لـ Zod بتصميم معياري (modular):


```sh [npm]
npm i valibot
```

```sh [yarn]
yarn add valibot
```

```sh [pnpm]
pnpm add valibot
```

```sh [bun]
bun add valibot
```


```ts
import * as v from 'valibot'
import { sValidator } from '@hono/standard-validator'

const schema = v.object({
  name: v.string(),
  age: v.number(),
})

app.post('/author', sValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  })
})
```

### مع ArkType

[ArkType](https://arktype.io/) يوفّر صيغة أصلية في TypeScript للتحقق في وقت التشغيل:


```sh [npm]
npm i arktype
```

```sh [yarn]
yarn add arktype
```

```sh [pnpm]
pnpm add arktype
```

```sh [bun]
bun add arktype
```


```ts
import { type } from 'arktype'
import { sValidator } from '@hono/standard-validator'

const schema = type({
  name: 'string',
  age: 'number',
})

app.post('/author', sValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  })
})
```
