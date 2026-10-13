---
title: "أفضل الممارسات"
book: hono
chapter: guides
slug: best-practices
order: 79
source: https://hono.dev/docs/guides/best-practices
lang: ar
---

Hono مرن جداً. يمكنك كتابة تطبيقك كما تشاء.
ومع ذلك، هناك أفضل الممارسات التي يُفضّل اتباعها.

## لا تُنشئ "Controllers" عندما يكون ذلك ممكنًا

عند الإمكان، يجب ألا تنشئ "وحدات تحكم (Controllers) شبيهة بـ Ruby on Rails".

```ts
// 🙁
// A RoR-like Controller
const booksList = (c: Context) => {
  return c.json('list books')
}

app.get('/books', booksList)
```

المشكلة متعلقة بالأنواع. على سبيل المثال، لا يمكن استنتاج معامل المسار في وحدة التحكم (Controller) دون كتابة أنواع عامة (generics) معقدة.

```ts
// 🙁
// A RoR-like Controller
const bookPermalink = (c: Context) => {
  const id = c.req.param('id') // Can't infer the path param
  return c.json(`get ${id}`)
}
```

لذلك، لا تحتاج إلى إنشاء وحدات تحكم (controllers) بأسلوب RoR ويجب كتابة المعالجات (handlers) مباشرة بعد تعريفات المسار.

```ts
// 😃
app.get('/books/:id', (c) => {
  const id = c.req.param('id') // Can infer the path param
  return c.json(`get ${id}`)
})
```

## `factory.createHandlers()` في `hono/factory`

إذا كنت لا تزال تريد إنشاء متحكّم (Controller) شبيه بـ RoR، فاستخدم `factory.createHandlers()` في [`hono/factory`](https://hono.dev/docs/helpers/factory). إذا استخدمت هذا، سيعمل استنتاج الأنواع (type inference) بشكل صحيح.

```ts
import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'

// ...

// 😃
const factory = createFactory()

const middleware = factory.createMiddleware(async (c, next) => {
  c.set('foo', 'bar')
  await next()
})

const handlers = factory.createHandlers(logger(), middleware, (c) => {
  return c.json(c.var.foo)
})

app.get('/api', ...handlers)
```

## بناء تطبيق أكبر

استخدم `app.route()` لبناء تطبيق أكبر دون إنشاء "وحدات تحكم بأسلوب Ruby on Rails".

إذا كان تطبيقك يحتوي على `/authors` و `/books` نقاط النهاية وأردت فصل الملفات عن `index.ts`، أنشئ `authors.ts` و `books.ts`.

```ts
// authors.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('list authors'))
app.post('/', (c) => c.json('create an author', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
```

```ts
// books.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json('list books'))
app.post('/', (c) => c.json('create a book', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
```

ثم استوردها وثبّتها على المسارات `/authors` و `/books` مع `app.route()`.

```ts
// index.ts
import { Hono } from 'hono'
import authors from './authors'
import books from './books'

const app = new Hono()

// 😃
app.route('/authors', authors)
app.route('/books', books)

export default app
```

### إذا كنت تريد استخدام ميزات RPC

يعمل الكود أعلاه جيدًا لحالات الاستخدام العادية.
ومع ذلك، إذا كنت تريد استخدام `RPC` ميزة، يمكنك الحصول على النوع الصحيح عبر التسلسل (chaining) كما يلي.

```ts
// authors.ts
import { Hono } from 'hono'

const app = new Hono()
  .get('/', (c) => c.json('list authors'))
  .post('/', (c) => c.json('create an author', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app
export type AppType = typeof app
```

إذا مرّرتَ نوع `app` إلى `hc`، فسيحصل على النوع الصحيح.

```ts
import type { AppType } from './authors'
import { hc } from 'hono/client'

// 😃
const client = hc<AppType>('http://localhost') // Typed correctly
```

لمزيد من المعلومات التفصيلية، راجع [صفحة `RPC`](https://hono.dev/docs/guides/rpc#using-rpc-with-larger-applications).

## أفضل ممارسات طلبات HEAD

### فهم معالجة HEAD في Hono

يتعامل Hono تلقائيًا مع طلبات HEAD بتحويلها إلى طلبات GET وإزالة نص الاستجابة. هذا السلوك مدمج في طبقة التوزيع (dispatch) الخاصة بالإطار ويحدث قبل إجراء مطابقة المسار.

### ✅ افعل: استخدم مسارات GET لطلبات HEAD

```typescript
// GOOD: This GET route automatically handles HEAD requests
app.get('/api/users', async (c) => {
  const users = await getUsers()
  c.header('X-Total-Count', users.length.toString())
  return c.json(users)
})

// HEAD /api/users will return:
// - Same headers as GET (including X-Total-Count)
// - Status 200
// - No body (null)
```

### ✅ افعل: استخدم برمجية وسيطة لمنطق خاص بـ HEAD

```typescript
// GOOD: Use middleware when HEAD needs different behavior
app.use('/api/resource', async (c, next) => {
  await next()

  // Add HEAD-specific headers after the handler
  if (c.req.method === 'HEAD') {
    c.header('X-HEAD-Processed', 'true')
    // Don't compute expensive body content for HEAD
    c.res = new Response(null, c.res)
  }
})
```

### ❌ لا تفعل: محاولة إنشاء معالجات HEAD مخصّصة

```typescript
// BAD: This won't work as expected
app.head('/api/users', (c) => {
  // This handler will NEVER be called
  c.header('X-Custom', 'value')
  return c.text('ignored')
})

// BAD: Using on() also won't work
app.on('HEAD', '/api/users', (c) => {
  // Still converted to GET before route matching
})
```

### اعتبارات الأداء

- **تجنب العمليات المكلفة في معالجات GET إذا كنت تتوقع العديد من طلبات HEAD**: استخدم وسيطًا لاكتشاف HEAD وتخطي توليد النص (body)
- **تعمل ترويسات التخزين المؤقت بشكل مماثل**: تحترم استجابات HEAD نفس قواعد التخزين المؤقت مثل GET
- **توافق الوسائط (Middleware compatibility)**: تعمل معظم الوسائط مع HEAD، لكن وسائط معالجة النص (مثل الضغط) تتخطى طلبات HEAD تلقائيًا

### اختبار طلبات HEAD

```typescript
// Always test both GET and HEAD responses
it('handles HEAD requests correctly', async () => {
  const getRes = await app.request('/api/users')
  const headRes = await app.request('/api/users', { method: 'HEAD' })

  expect(headRes.status).toBe(getRes.status)
  expect(headRes.headers.get('X-Total-Count')).toBe(
    getRes.headers.get('X-Total-Count')
  )
  expect(headRes.body).toBe(null)
})
```

### ملاحظات

- يضمن التحويل التلقائي إلى HEAD اتساق الترويسات بين استجابات GET و HEAD
- هذا السلوك متسق عبر جميع بيئات تشغيل Hono (Cloudflare Workers و Deno و Bun و Node.js)
- إذا كنت بحاجة إلى منطق مختلف تمامًا لـ HEAD مقابل GET، ففكر في استخدام نقاط نهاية (endpoints) مختلفة بدلًا من محاولة تجاوز معالجة HEAD الخاصة بالإطار (framework)
