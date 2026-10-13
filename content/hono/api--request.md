---
title: "`HonoRequest`"
book: hono
chapter: api
slug: request
order: 86
source: https://hono.dev/docs/api/request
lang: ar
---

الـ `HonoRequest` كائن يمكن أخذُه من `c.req` الذي يغلّف [الطلب](https://developer.mozilla.org/en-US/docs/Web/API/Request) كائن.

## param()

احصل على قيم معاملات المسار.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
// Captured params
app.get('/entry/:id', async (c) => {
  const id = c.req.param('id')
  //    ^?
  // ...
})

// Get all params at once
app.get('/entry/:id/comment/:commentId', async (c) => {
  const { id, commentId } = c.req.param()
  //      ^?
})
```

## query()

الحصول على معاملات سلسلة الاستعلام.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
// Query params
app.get('/search', async (c) => {
  const query = c.req.query('q')
  //     ^?
})

// Get all params at once
app.get('/search', async (c) => {
  const { q, limit, offset } = c.req.query()
  //      ^?
})
```

## queries()

الحصول على قيم متعددة لوسيط في سلسلة الاستعلام، مثل `/search?tags=A&tags=B`

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/search', async (c) => {
  // tags will be string[]
  const tags = c.req.queries('tags')
  //     ^?
  // ...
})
```

## header()

الحصول على قيمة ترويسة الطلب.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/', (c) => {
  const userAgent = c.req.header('User-Agent')
  //      ^?
  return c.text(`Your user agent is ${userAgent}`)
})
```

عندما `c.req.header()` تُستدعى بدون وسائط، فإن جميع المفاتيح في السجل (record) المُرجَع تكون **بأحرف صغيرة** (lowercase).

إذا أردت الحصول على قيمة رأس (header) باسم بأحرف كبيرة (uppercase)،
استخدم `c.req.header(“X-Foo”)`.

```ts
// ❌ Will not work
const headerRecord = c.req.header()
const foo = headerRecord['X-Foo']

// ✅ Will work
const foo = c.req.header('X-Foo')
```


## parseBody()

تحليل جسم الطلب من نوع `multipart/form-data` أو `application/x-www-form-urlencoded`

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.post('/entry', async (c) => {
  const body = await c.req.parseBody()
  // ...
})
```

`parseBody()` يدعم السلوكيات التالية.

**ملف واحد**

```ts twoslash
import { Context } from 'hono'
declare const c: Context
// ---cut---
const body = await c.req.parseBody()
const data = body['foo']
//    ^?
```

`body['foo']` هو `(string | File)`.

إذا تم رفع عدة ملفات، فسيُستخدم الأخير.

### ملفات متعددة

```ts twoslash
import { Context } from 'hono'
declare const c: Context
// ---cut---
const body = await c.req.parseBody()
body['foo[]']
```

`body['foo[]']` دائمًا `(string | File)[]`.

`[]` اللاحقة مطلوبة.

### ملفات أو حقول متعددة بالاسم نفسه

إذا كان لديك حقل إدخال يسمح بعدة `<input type="file" multiple />` أو عدة مربعات اختيار بنفس الاسم `<input type="checkbox" name="favorites" value="Hono"/>`.

```ts twoslash
import { Context } from 'hono'
declare const c: Context
// ---cut---
const body = await c.req.parseBody({ all: true })
body['foo']
```

`all` الخيار معطّل افتراضيًا.

- إذا `body['foo']` ملفات متعددة، فستُحلَّل إلى `(string | File)[]`.
- إذا `body['foo']` ملف واحد، فسيُحلَّل إلى `(string | File)`.

### الترميز النقطي

إذا قمت بضبط `dot` خيار `true`، تُبنى القيمة المُعادة بناءً على تدوين النقطة (dot notation).

تخيّل استلام البيانات التالية:

```ts twoslash
const data = new FormData()
data.append('obj.key1', 'value1')
data.append('obj.key2', 'value2')
```

يمكنك الحصول على القيمة المُهيكَلة بتعيين `dot` خيار `true`:

```ts twoslash
import { Context } from 'hono'
declare const c: Context
// ---cut---
const body = await c.req.parseBody({ dot: true })
// body is `{ obj: { key1: 'value1', key2: 'value2' } }`
```

## json()

يحلّل جسم الطلب من نوع `application/json`

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.post('/entry', async (c) => {
  const body = await c.req.json()
  // ...
})
```

## text()

يحلّل جسم الطلب من نوع `text/plain`

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.post('/entry', async (c) => {
  const body = await c.req.text()
  // ...
})
```

## arrayBuffer()

يحلل جسم الطلب كـ `ArrayBuffer`

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.post('/entry', async (c) => {
  const body = await c.req.arrayBuffer()
  // ...
})
```

## blob()

يحلل جسم الطلب كـ `Blob`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.post('/entry', async (c) => {
  const body = await c.req.blob()
  // ...
})
```

## formData()

يحلل جسم الطلب كـ `FormData`.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.post('/entry', async (c) => {
  const body = await c.req.formData()
  // ...
})
```

## valid()

احصل على البيانات المُتحقَّق منها.

```ts
app.post('/posts', async (c) => {
  const { title, body } = c.req.valid('form')
  // ...
})
```

الأهداف المتاحة أدناه.

- `form`
- `json`
- `query`
- `header`
- `cookie`
- `param`

انظر [قسم التحقق](https://hono.dev/docs/guides/validation) للاطلاع على أمثلة الاستخدام.

## routePath

**مهجور في v4.8.0**: هذه الخاصية مهجورة. استخدم `routePath()` من [مساعد `Route`](https://hono.dev/docs/helpers/route) بدلاً من ذلك.

يمكنك استرجاع المسار المُسجَّل داخل المعالج (handler) على النحو التالي:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/posts/:id', (c) => {
  return c.json({ path: c.req.routePath })
})
```

إذا وصلت إلى `/posts/123`، سيعيد `/posts/:id`:

```json
{ "path": "/posts/:id" }
```

## matchedRoutes

**مهجور في v4.8.0**: هذه الخاصية مهجورة. استخدم `matchedRoutes()` من [مساعد `Route`](https://hono.dev/docs/helpers/route) بدلاً من ذلك.

يعيد المسارات المتطابقة داخل المعالج (handler)، وهو أمر مفيد لتصحيح الأخطاء (debugging).

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.use(async function logger(c, next) {
  await next()
  c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
    const name =
      handler.name ||
      (handler.length < 2 ? '[handler]' : '[middleware]')
    console.log(
      method,
      ' ',
      path,
      ' '.repeat(Math.max(10 - path.length, 0)),
      name,
      i === c.req.routeIndex ? '<- respond from here' : ''
    )
  })
})
```

## path

مسار الطلب.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/about/me', async (c) => {
  const pathname = c.req.path // `/about/me`
  // ...
})
```

## url

سلاسل عنوان URL للطلب.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/about/me', async (c) => {
  const url = c.req.url // `http://localhost:8787/about/me`
  // ...
})
```

## method

اسم طريقة الطلب.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/about/me', async (c) => {
  const method = c.req.method // `GET`
  // ...
})
```

## raw

الخام [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) كائن.

```ts
// For Cloudflare Workers
app.post('/', async (c) => {
  const metadata = c.req.raw.cf?.hostMetadata?
  // ...
})
```

## cloneRawRequest()

يستنسخ كائن Request الخام من HonoRequest. يعمل حتى بعد استهلاك نص الطلب بواسطة أدوات التحقق أو طرق HonoRequest.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()

import { cloneRawRequest } from 'hono/request'
import { validator } from 'hono/validator'

app.post(
  '/forward',
  validator('json', (data) => data),
  async (c) => {
    // Clone after validation
    const clonedReq = await cloneRawRequest(c.req)
    // Does not throw the error
    await clonedReq.json()
    // ...
  }
)
```
