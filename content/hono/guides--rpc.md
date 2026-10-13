---
title: "`RPC`"
book: hono
chapter: guides
slug: rpc
order: 78
source: https://hono.dev/docs/guides/rpc
lang: ar
---

تتيح ميزة RPC مشاركة مواصفات API بين الخادم والعميل.

أولاً، صدِّر `typeof` تطبيق Hono الخاص بك (يُسمى عادةً `AppType`)—أو فقط المسارات التي تريد إتاحتها للعميل—من كود الخادم الخاص بك.

بقبول `AppType` كمعامل عام (generic parameter)، يمكن لعميل Hono (Hono Client) استنتاج كل من نوع (أنواع) الإدخال المحددة بواسطة أداة التحقق (Validator) ونوع (أنواع) الإخراج الصادرة عن معالجات تُرجع `c.json()`.

> [!NOTE]
> لكي تعمل أنواع RPC بشكل صحيح في مستودع متعدد الحزم (monorepo)، في ملفي tsconfig.json لكل من العميل والخادم، اضبط `"strict": true` في `compilerOptions`. [اقرأ المزيد.](https://github.com/honojs/hono/issues/2270#issuecomment-2143745118)

## الخادم

كل ما عليك فعله على جانب الخادم هو كتابة مدقق (validator) وإنشاء متغير `route`. المثال التالي يستخدم [مدقّق `Zod`](https://github.com/honojs/middleware/tree/main/packages/zod-validator).

```ts{1}
const route = app.post(
  '/posts',
  zValidator(
    'form',
    z.object({
      title: z.string(),
      body: z.string(),
    })
  ),
  (c) => {
    // ...
    return c.json(
      {
        ok: true,
        message: 'Created!',
      },
      201
    )
  }
)
```

> [!TIP]
> ال [مدقّق Standard Schema](https://github.com/honojs/middleware/tree/main/packages/standard-validator) يعمل أيضًا، لذا يمكنك استخدام أي مكتبة مخطط قياسي (Standard Schema) مثل Valibot.

ثم، صدِّر النوع (type) لمشاركة مواصفة API مع العميل.

```ts
export type AppType = typeof route
```

## العميل

على جانب العميل (Client)، استورد `hc` و `AppType` أولاً.

```ts
import type { AppType } from '.'
import { hc } from 'hono/client'
```

`hc` دالة لإنشاء عميل. مرّر `AppType` كأنواع عامة (Generics) وحدِّد عنوان URL للخادم كوسيط.

```ts
const client = hc<AppType>('http://localhost:8787/')
```

استدعِ `client.{path}.{method}` ومرر البيانات التي ترغب في إرسالها إلى الخادم كوسيطة (argument).

```ts
const res = await client.posts.$post({
  form: {
    title: 'Hello',
    body: 'Hono is a cool project',
  },
})
```

الـ `res` متوافق مع استجابة "fetch". يمكنك استرداد البيانات من الخادم باستخدام `res.json()`.

```ts
if (res.ok) {
  const data = await res.json()
  console.log(data.message)
}
```

### ملفات تعريف الارتباط

لجعل العميل يرسل ملفات تعريف الارتباط (cookies) مع كل طلب، أضِف `{ 'init': { 'credentials": 'include' } }` إلى الخيارات عند إنشاء العميل.

```ts
// client.ts
const client = hc<AppType>('http://localhost:8787/', {
  init: {
    credentials: 'include',
  },
})

// This request will now include any cookies you might have set
const res = await client.posts.$get({
  query: {
    id: '123',
  },
})
```

## رمز الحالة

إذا حدّدت رمز الحالة صراحةً، مثل `200` أو `404`، في `c.json()`، فسيُضاف كنوع لتمريره إلى العميل.

```ts
// server.ts
const app = new Hono().get(
  '/posts',
  zValidator(
    'query',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    const { id } = c.req.valid('query')
    const post: Post | undefined = await getPost(id)

    if (post === undefined) {
      return c.json({ error: 'not found' }, 404) // Specify 404
    }

    return c.json({ post }, 200) // Specify 200
  }
)

export type AppType = typeof app
```

يمكنك الحصول على البيانات عبر رمز الحالة.

```ts
// client.ts
const client = hc<AppType>('http://localhost:8787/')

const res = await client.posts.$get({
  query: {
    id: '123',
  },
})

if (res.status === 404) {
  const data: { error: string } = await res.json()
  console.log(data.error)
}

if (res.ok) {
  const data: { post: Post } = await res.json()
  console.log(data.post)
}

// { post: Post } | { error: string }
type ResponseType = InferResponseType<typeof client.posts.$get>

// { post: Post }
type ResponseType200 = InferResponseType<
  typeof client.posts.$get,
  200
>
```

## استجابة عامة

لا يستنتج عميل RPC الخاص بـ Hono أنواع الاستجابات تلقائيًا من معالجات الأخطاء العامة مثل `app.onError()` أو برمجية وسيطة عامة. يمكنك استخدام `ApplyGlobalResponse` أداة مساعدة للأنواع (type helper) لدمج أنواع استجابات الأخطاء العامة في جميع المسارات (routes).

```ts
import type { ApplyGlobalResponse } from 'hono/client'

const app = new Hono()
  .get('/api/users', (c) => c.json({ users: ['alice', 'bob'] }, 200))
  .onError((err, c) => c.json({ error: err.message }, 500))

type AppWithErrors = ApplyGlobalResponse<
  typeof app,
  {
    500: { json: { error: string } }
  }
>

const client = hc<AppWithErrors>('http://localhost')
```

الآن يعرف العميل كلاً من استجابات النجاح والخطأ:

```ts
const res = await client.api.users.$get()

if (res.ok) {
  const data = await res.json() // { users: string[] }
}

// InferResponseType includes the global error type
type ResType = InferResponseType<typeof client.api.users.$get>
// { users: string[] } | { error: string }
```

يمكنك أيضًا تعريف عدة رموز حالة خطأ عامة (global error status codes) دفعة واحدة:

```ts
type AppWithErrors = ApplyGlobalResponse<
  typeof app,
  {
    401: { json: { error: string; message: string } }
    500: { json: { error: string; message: string } }
  }
>
```

## غير موجود

إذا أردت استخدام عميل، فلا ينبغي أن تستخدم `c.notFound()` لاستجابة "غير موجود" (Not Found). لا يمكن استنتاج البيانات التي يحصل عليها العميل من الخادم بشكل صحيح.

```ts
// server.ts
export const routes = new Hono().get(
  '/posts',
  zValidator(
    'query',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    const { id } = c.req.valid('query')
    const post: Post | undefined = await getPost(id)

    if (post === undefined) {
      return c.notFound() // ❌️
    }

    return c.json({ post })
  }
)

// client.ts
import { hc } from 'hono/client'

const client = hc<typeof routes>('/')

const res = await client.posts[':id'].$get({
  param: {
    id: '123',
  },
})

const data = await res.json() // 🙁 data is unknown
```

يُرجى استخدام `c.json()` وحدِّد رمز الحالة (status code) لاستجابة Not Found.

```ts
export const routes = new Hono().get(
  '/posts',
  zValidator(
    'query',
    z.object({
      id: z.string(),
    })
  ),
  async (c) => {
    const { id } = c.req.valid('query')
    const post = await getPost(id)

    if (!post) {
      return c.json({ error: 'not found' }, 404) // Specify 404
    }

    return c.json({ post }, 200) // Specify 200
  }
)
```

بدلاً من ذلك، يمكنك استخدام توسيع الوحدة (module augmentation) لتوسيع `NotFoundResponse` الواجهة. هذا يسمح `c.notFound()` لإرجاع استجابة مُنمّطة (typed):

```ts
// server.ts
import { Hono, TypedResponse } from 'hono'

declare module 'hono' {
  interface NotFoundResponse
    extends Response,
      TypedResponse<{ error: string }, 404, 'json'> {}
}

const app = new Hono()
  .get('/posts/:id', async (c) => {
    const post = await getPost(c.req.param('id'))
    if (!post) {
      return c.notFound()
    }
    return c.json({ post }, 200)
  })
  .notFound((c) => c.json({ error: 'not found' }, 404))

export type AppType = typeof app
```

الآن يمكن للعميل استنتاج نوع استجابة 404 بشكل صحيح.

## معاملات المسار

يمكنك أيضًا التعامل مع المسارات التي تتضمن معاملات مسار (path parameters) أو قيم استعلام (query).

```ts
const route = app.get(
  '/posts/:id',
  zValidator(
    'query',
    z.object({
      page: z.coerce.number().optional(), // coerce to convert to number
    })
  ),
  (c) => {
    // ...
    return c.json({
      title: 'Night',
      body: 'Time to sleep',
    })
  }
)
```

كلا معاملات المسار (path parameters) وقيم الاستعلام (query values) **يجب** تمريرهما كـ `string`، حتى إذا كانت القيمة الأساسية من نوع مختلف.

حدِّد النص الذي تريد تضمينه في المسار باستخدام `param`، وأي قيم استعلام باستخدام `query`.

```ts
const res = await client.posts[':id'].$get({
  param: {
    id: '123',
  },
  query: {
    page: '1', // `string`, converted by the validator to `number`
  },
})
```

### معاملات متعددة

تعامل مع المسارات ذات معاملات متعددة.

```ts
const route = app.get(
  '/posts/:postId/:authorId',
  zValidator(
    'query',
    z.object({
      page: z.string().optional(),
    })
  ),
  (c) => {
    // ...
    return c.json({
      title: 'Night',
      body: 'Time to sleep',
    })
  }
)
```

إضافة عدة `['']` لتحديد المعاملات (params) في المسار.

```ts
const res = await client.posts[':postId'][':authorId'].$get({
  param: {
    postId: '123',
    authorId: '456',
  },
  query: {},
})
```

### تضمين الشرطات المائلة

`hc` لا تُرمّز الدالة قيم ... بترميز URL `param`. لتضمين شرطات مائلة في المعاملات، استخدم [التعابير النمطية (regular expressions)](https://hono.dev/docs/api/routing#regexp).

```ts
// client.ts

// Requests /posts/123/456
const res = await client.posts[':id'].$get({
  param: {
    id: '123/456',
  },
})

// server.ts
const route = app.get(
  '/posts/:id{.+}',
  zValidator(
    'param',
    z.object({
      id: z.string(),
    })
  ),
  (c) => {
    // id: 123/456
    const { id } = c.req.valid('param')
    // ...
  }
)
```

> [!NOTE]
> معاملات المسار الأساسية بدون تعبيرات نمطية (regular expressions) لا تطابق الشرط المائلة. إذا مررت `param` تحتوي على شرط مائلة باستخدام دالة hc، فقد لا يوجّه الخادم الطلب كما هو مقصود. إن ترميز المعاملات باستخدام `encodeURIComponent` هو الأسلوب الموصى به لضمان التوجيه الصحيح.

## الترويسات

يمكنك إلحاق الترويسات بالطلب.

```ts
const res = await client.search.$get(
  {
    //...
  },
  {
    headers: {
      'X-Custom-Header': 'Here is Hono Client',
      'X-User-Agent': 'hc',
    },
  }
)
```

لإضافة رأس (header) مشترك إلى جميع الطلبات، حدده كوسيطة لـ `hc` الدالة.

```ts
const client = hc<AppType>('/api', {
  headers: {
    Authorization: 'Bearer TOKEN',
  },
})
```

## `init` خيار

يمكنك تمرير الخاصية الخاصة بـ `fetch` `RequestInit` الكائن إلى الطلب كـ `init` الخيار. أدناه مثال على إلغاء طلب (Request).

```ts
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')

const abortController = new AbortController()
const res = await client.api.posts.$post(
  {
    json: {
      // Request body
    },
  },
  {
    // RequestInit object
    init: {
      signal: abortController.signal,
    },
  }
)

// ...

abortController.abort()
```

A `RequestInit` الكائن المُعرَّف بواسطة `init` يحظى بأعلى أولوية. يمكن استخدامه لتجاوز الأشياء المحددة بواسطة خيارات أخرى مثل `body | method | headers`.

## `$url()`

يمكنك الحصول على `URL` كائن للوصول إلى نقطة النهاية باستخدام `$url()`.

يجب تمرير عنوان URL مطلق (absolute) لكي يعمل هذا. تمرير عنوان URL نسبي `/` سينتج عنه الخطأ التالي.

`Uncaught TypeError: Failed to construct 'URL': Invalid URL`

```ts
// ❌ Will throw error
const client = hc<AppType>('/')
client.api.post.$url()

// ✅ Will work as expected
const client = hc<AppType>('http://localhost:8787/')
client.api.post.$url()
```


```ts
const route = app
  .get('/api/posts', (c) => c.json({ posts }))
  .get('/api/posts/:id', (c) => c.json({ post }))

const client = hc<typeof route>('http://localhost:8787/')

let url = client.api.posts.$url()
console.log(url.pathname) // `/api/posts`

url = client.api.posts[':id'].$url({
  param: {
    id: '123',
  },
})
console.log(url.pathname) // `/api/posts/123`
```

### عنوان URL مُنمّط

يمكنك تمرير عنوان URL الأساسي (base URL) كمعامل النوع (type parameter) الثاني لـ `hc` للحصول على أنواع URL أكثر دقة:

```ts
const client = hc<typeof route, 'http://localhost:8787'>(
  'http://localhost:8787/'
)

const url = client.api.posts.$url()
// url is TypedURL with precise type information
// including protocol, host, and path
```

هذا مفيد عندما تريد استخدام عنوان URL كمفتاح آمن من ناحية الأنواع (type-safe) للمكتبات مثل SWR.

## `$path()`

`$path()` مشابه لـ `$url()`، لكنه يُعيد سلسلة مسار بدلًا من `URL` الكائن. على عكس `$url()`، ولا يتضمن أصل (origin) عنوان URL الأساسي، لذا فهو يعمل بغض النظر عن عنوان URL الأساسي الذي تمرره إلى `hc`.

```ts
const route = app
  .get('/api/posts', (c) => c.json({ posts }))
  .get('/api/posts/:id', (c) => c.json({ post }))

const client = hc<typeof route>('http://localhost:8787/')

let path = client.api.posts.$path()
console.log(path) // `/api/posts`

path = client.api.posts[':id'].$path({
  param: {
    id: '123',
  },
})
console.log(path) // `/api/posts/123`
```

يمكنك أيضًا تمرير معاملات الاستعلام (query parameters):

```ts
const path = client.api.posts.$path({
  query: {
    page: '1',
    limit: '10',
  },
})
console.log(path) // `/api/posts?page=1&limit=10`
```

## رفع الملفات

يمكنك رفع الملفات باستخدام جسم نموذج (form body):

```ts
// client
const res = await client.user.picture.$put({
  form: {
    file: new File([fileToUpload], filename, {
      type: fileToUpload.type,
    }),
  },
})
```

```ts
// server
const route = app.put(
  '/user/picture',
  zValidator(
    'form',
    z.object({
      file: z.instanceof(File),
    })
  )
  // ...
)
```

## مخصص `fetch` الطريقة

يمكنك ضبط المخصص `fetch` الطريقة.

في سكربت المثال التالي لـ Cloudflare Worker، فإن روابط الخدمة (Service Bindings') `fetch` تُستخدم الطريقة بدلاً من الافتراضية `fetch`.

```toml
# wrangler.toml
services = [
  { binding = "AUTH", service = "auth-service" },
]
```

```ts
// src/client.ts
const client = hc<CreateProfileType>('http://localhost', {
  fetch: c.env.AUTH.fetch.bind(c.env.AUTH),
})
```

## مُسلسل استعلام مخصص

يمكنك تخصيص طريقة تسلسل (serialize) معاملات الاستعلام (query parameters) باستخدام `buildSearchParams` خيار. هذا مفيد عندما تحتاج إلى تدوين الأقواس (bracket notation) للمصفوفات أو تنسيقات مخصصة أخرى:

```ts
const client = hc<AppType>('http://localhost', {
  buildSearchParams: (query) => {
    const searchParams = new URLSearchParams()
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined) {
        continue
      }
      if (Array.isArray(v)) {
        v.forEach((item) => searchParams.append(`${k}[]`, item))
      } else {
        searchParams.set(k, v)
      }
    }
    return searchParams
  },
})
```

## Infer

استخدم `InferRequestType` و `InferResponseType` لمعرفة نوع الكائن المطلوب ونوع الكائن الذي سيتم إرجاعه.

```ts
import type { InferRequestType, InferResponseType } from 'hono/client'

// InferRequestType
const $post = client.todo.$post
type ReqType = InferRequestType<typeof $post>['form']

// InferResponseType
type ResType = InferResponseType<typeof $post>
```

## تحليل استجابة باستخدام مساعد ضمان الأنواع

يمكنك استخدام `parseResponse()` مساعد لتحليل Response بسهولة من `hc` مع أمان الأنواع.

```ts
import { parseResponse, DetailedError } from 'hono/client'

// result contains the parsed response body (automatically parsed based on Content-Type)
const result = await parseResponse(client.hello.$get()).catch(
  (e: DetailedError) => {
    console.error(e)
  }
)
// parseResponse automatically throws an error if response is not ok
```

## استخدام SWR

يمكنك أيضًا استخدام مكتبة React Hook مثل [`SWR`](https://swr.vercel.app).

```tsx
import useSWR from 'swr'
import { hc } from 'hono/client'
import type { InferRequestType } from 'hono/client'
import type { AppType } from '../functions/api/[[route]]'

const App = () => {
  const client = hc<AppType>('/api')
  const $get = client.hello.$get

  const fetcher =
    (arg: InferRequestType<typeof $get>) => async () => {
      const res = await $get(arg)
      return await res.json()
    }

  const { data, error, isLoading } = useSWR(
    'api-hello',
    fetcher({
      query: {
        name: 'SWR',
      },
    })
  )

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return <h1>{data?.message}</h1>
}

export default App
```

## استخدام RPC مع تطبيقات أكبر

في حالة تطبيق أكبر، مثل المثال المذكور في [بناء تطبيق أكبر](https://hono.dev/docs/guides/best-practices#building-a-larger-application)، عليك الحذر بشأن نوع الاستنتاج (inference).
طريقة بسيطة للقيام بذلك هي ربط المعالجات بحيث يتم دائمًا استنتاج الأنواع.

```ts
// authors.ts
import { Hono } from 'hono'

const app = new Hono()
  .get('/', (c) => c.json('list authors'))
  .post('/', (c) => c.json('create an author', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
```

```ts
// books.ts
import { Hono } from 'hono'

const app = new Hono()
  .get('/', (c) => c.json('list books'))
  .post('/', (c) => c.json('create a book', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
```

يمكنك بعد ذلك استيراد الموجهات الفرعية (sub-routers) كما تفعل عادةً، وتأكد من تسلسل معالجاتها أيضًا، نظرًا لأن هذا هو المستوى الأعلى للتطبيق في هذه الحالة، فهذا هو النوع الذي سنريد تصديره.

```ts
// index.ts
import { Hono } from 'hono'
import authors from './authors'
import books from './books'

const app = new Hono()

const routes = app.route('/authors', authors).route('/books', books)

export default app
export type AppType = typeof routes
```

يمكنك الآن إنشاء عميل جديد باستخدام AppType المسجل واستخدامه كما تفعل عادةً.

## المشكلات المعروفة

### أداء IDE

عند استخدام RPC، كلما زاد عدد المسارات لديك، أصبحت بيئة التطوير المتكاملة (IDE) خاصتك أبطأ. أحد الأسباب الرئيسية لذلك هو تنفيذ كميات هائلة من إنشاءات مثيلات الأنواع (type instantiations) لاستنتاج نوع تطبيقك.

على سبيل المثال، افترض أن تطبيقك يحتوي على مسار كهذا:

```ts
// app.ts
export const app = new Hono().get('foo/:id', (c) =>
  c.json({ ok: true }, 200)
)
```

سيستنتج Hono النوع على النحو التالي:

```ts
export const app = Hono<BlankEnv, BlankSchema, '/'>().get<
  'foo/:id',
  'foo/:id',
  JSONRespondReturn<{ ok: boolean }, 200>,
  BlankInput,
  BlankEnv
>('foo/:id', (c) => c.json({ ok: true }, 200))
```

هذا هو إنشاء مثيل نوع (type instantiation) لمسار واحد. بينما لا يحتاج المستخدم إلى كتابة وسائط الأنواع هذه يدويًا، وهو أمر جيد، فمن المعروف أن إنشاء مثيلات الأنواع يستغرق وقتًا طويلًا. `tsserver` المستخدم في بيئة التطوير المتكاملة (IDE) خاصتك يؤدي هذه المهمة المستهلكة للوقت في كل مرة تستخدم فيها التطبيق. إذا كان لديك الكثير من المسارات، فقد يؤدي هذا إلى إبطاء بيئة التطوير لديك بشكل ملحوظ.

ومع ذلك، لدينا بعض النصائح للتخفيف من هذه المشكلة.

#### عدم تطابق إصدار Hono

إذا كانت الواجهة الخلفية (backend) منفصلة عن الواجهة الأمامية (frontend) وتعيش في دليل مختلف، فأنت بحاجة إلى التأكد من تطابق إصدارات Hono. إذا استخدمت إصدار Hono على الواجهة الخلفية وإصدارًا آخر على الواجهة الأمامية، فستواجه مشكلات مثل "_Type instantiation is excessively deep and possibly infinite_".

![](/images/hono/rpc-architecture.png)

#### مراجع مشاريع TypeScript

كما في حالة [عدم تطابق إصدار Hono](#hono-version-mismatch)"، ستواجه مشكلات إذا كانت الواجهة الخلفية (backend) والواجهة الأمامية (frontend) منفصلتين. إذا كنت تريد الوصول إلى الكود من الواجهة الخلفية (`AppType`، على سبيل المثال) في الواجهة الأمامية، تحتاج إلى استخدام [مراجع المشروع](https://www.typescriptlang.org/docs/handbook/project-references.html). تسمح مراجع المشاريع (project references) في TypeScript لقاعدة كود TypeScript واحدة بالوصول إلى كود من قاعدة كود TypeScript أخرى واستخدامه. _(المصدر: [Hono RPC ومراجع مشروع TypeScript](https://catalins.tech/hono-rpc-in-monorepos/))_.

#### ترجم الكود قبل استخدامه (مُوصى به)

`tsc` يمكنه القيام بمهام ثقيلة مثل إنشاء الأنواع (type instantiation) في وقت الترجمة! ثم، `tsserver` لا تحتاج إلى إنشاء نسخ من جميع وسائط الأنواع في كل مرة تستخدمها. سيجعل ذلك بيئة التطوير (IDE) الخاصة بك أسرع بكثير!

تجميع عميلك بما في ذلك تطبيق الخادم يمنحك أفضل أداء. ضع الكود التالي في مشروعك:

```ts
import { app } from './app'
import { hc } from 'hono/client'

// this is a trick to calculate the type when compiling
const client = hc<typeof app>('')
export type Client = typeof client

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args)
```

بعد التصريف (compiling)، يمكنك استخدام `hcWithType` بدلاً من `hc` للحصول على العميل بالنوع المحسوب مسبقًا.

```ts
const client = hcWithType('http://localhost:8787/')
const res = await client.posts.$post({
  form: {
    title: 'Hello',
    body: 'Hono is a cool project',
  },
})
```

إذا كان مشروعك مستودعًا أحاديًا (monorepo)، فإن هذا الحل مناسب تمامًا. باستخدام أداة مثل [`turborepo`](https://turbo.build/repo/docs)، يمكنك بسهولة فصل مشروع الخادم عن مشروع العميل والحصول على تكامل أفضل في إدارة التبعيات بينهما. إليك [مثال عملي](https://github.com/m-shaka/hono-rpc-perf-tips-example).

يمكنك أيضًا تنسيق عملية البناء (build) يدويًا باستخدام أدوات مثل `concurrently` أو `npm-run-all`.

#### تحديد وسائط النوع يدويًا

هذا مرهق بعض الشيء، لكن يمكنك تحديد وسائط الأنواع يدويًا لتجنب إنشاء نسخ من الأنواع (type instantiation).

```ts
const app = new Hono().get<'foo/:id'>('foo/:id', (c) =>
  c.json({ ok: true }, 200)
)
```

تحديد وسيطة نوع واحدة فقط يُحدث فرقًا في الأداء، بينما قد يستغرق منك الكثير من الوقت والجهد إذا كان لديك الكثير من المسارات.

#### قسّم تطبيقك والعميل إلى ملفات متعددة

كما هو موضح في [استخدام RPC مع التطبيقات الأكبر](#using-rpc-with-larger-applications)، يمكنك تقسيم تطبيقك إلى تطبيقات متعددة. يمكنك أيضًا إنشاء عميل لكل تطبيق:

```ts
// authors-cli.ts
import { app as authorsApp } from './authors'
import { hc } from 'hono/client'

const authorsClient = hc<typeof authorsApp>('/authors')

// books-cli.ts
import { app as booksApp } from './books'
import { hc } from 'hono/client'

const booksClient = hc<typeof booksApp>('/books')
```

بهذه الطريقة، `tsserver` لا يحتاج إلى إنشاء نسخ من الأنواع (types) لجميع المسارات دفعة واحدة.

### المعالجات التي تُرجع سلسلة وعود

معالج يُعيد `.then()` السلسلة (chain) مباشرةً تفقد نوع استجابتها، لذا يستنتج العميل `unknown`:

```ts
const app = new Hono().get('/', (c) =>
  Promise.resolve({ hello: 'world' }).then((d) => c.json(d))
)

const client = hc<typeof app>('')
const res = await client.index.$get()
const data = await res.json() // unknown
```

هذا قيد في استنتاج الأنواع في TypeScript — لا يمكن استنتاج نوع الاستجابة من خلال `.then()` السلسلة. استخدم `async`/`await` بدلاً من ذلك:

```ts
const app = new Hono().get('/', async (c) => {
  const d = await Promise.resolve({ hello: 'world' })
  return c.json(d)
})

const client = hc<typeof app>('')
const res = await client.index.$get()
const data = await res.json() // { hello: string }
```

إذا تعذّر عليك تجنّب السلسلة، فإن إضافة تعليق `then()` يعمل أيضًا:

```ts
import type { TypedResponse } from 'hono/types'

const app = new Hono().get('/', (c) =>
  Promise.resolve({ hello: 'world' }).then<
    TypedResponse<{ hello: string }, 200, 'json'>
  >((d) => c.json(d, 200))
)
```
