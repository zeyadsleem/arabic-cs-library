---
title: "التوجيه"
book: hono
chapter: api
slug: routing
order: 84
source: https://hono.dev/docs/api/routing
lang: ar
---

توجيه Hono مرن وبديهي.
لنلقِ نظرة.

## أساسي

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
// HTTP Methods
app.get('/', (c) => c.text('GET /'))
app.post('/', (c) => c.text('POST /'))
app.put('/', (c) => c.text('PUT /'))
app.delete('/', (c) => c.text('DELETE /'))
app.query('/', (c) => c.text('QUERY /'))

// Wildcard
app.get('/wild/*/card', (c) => {
  return c.text('GET /wild/*/card')
})

// Any HTTP methods
app.all('/hello', (c) => c.text('Any Method /hello'))

// Custom HTTP method
app.on('PURGE', '/cache', (c) => c.text('PURGE Method /cache'))

// Multiple Method
app.on(['PUT', 'DELETE'], '/post', (c) =>
  c.text('PUT or DELETE /post')
)

// Multiple Paths
app.on('GET', ['/hello', '/ja/hello', '/en/hello'], (c) =>
  c.text('Hello')
)
```

## معامل المسار

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/user/:name', async (c) => {
  const name = c.req.param('name')
  //       ^?
  // ...
})
```

أو جميع المعاملات دفعة واحدة:

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/posts/:id/comment/:comment_id', async (c) => {
  const { id, comment_id } = c.req.param()
  //       ^?
  // ...
})
```

## معامل اختياري

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
// Will match `/api/animal` and `/api/animal/:type`
app.get('/api/animal/:type?', (c) => c.text('Animal!'))
```

## Regexp

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/post/:date{[0-9]+}/:title{[a-z]+}', async (c) => {
  const { date, title } = c.req.param()
  //       ^?
  // ...
})
```

## تضمين الشرطات المائلة

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/posts/:filename{.+\\.png}', async (c) => {
  //...
})
```

## مسار متسلسل

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app
  .get('/endpoint', (c) => {
    return c.text('GET /endpoint')
  })
  .post((c) => {
    return c.text('POST /endpoint')
  })
  .delete((c) => {
    return c.text('DELETE /endpoint')
  })
```

## التجميع

يمكنك تجميع المسارات مع نسخة Hono وإضافتها إلى التطبيق الرئيسي باستخدام طريقة route.

```ts twoslash
import { Hono } from 'hono'
// ---cut---
const book = new Hono()

book.get('/', (c) => c.text('List Books')) // GET /book
book.get('/:id', (c) => {
  // GET /book/:id
  const id = c.req.param('id')
  return c.text('Get Book: ' + id)
})
book.post('/', (c) => c.text('Create Book')) // POST /book

const app = new Hono()
app.route('/book', book)
```

## التجميع دون تغيير المسار الأساسي

يمكنك أيضاً تجميع عدة نسخ (instances) مع الحفاظ على الأساس (base).

```ts twoslash
import { Hono } from 'hono'
// ---cut---
const book = new Hono()
book.get('/book', (c) => c.text('List Books')) // GET /book
book.post('/book', (c) => c.text('Create Book')) // POST /book

const user = new Hono().basePath('/user')
user.get('/', (c) => c.text('List Users')) // GET /user
user.post('/', (c) => c.text('Create User')) // POST /user

const app = new Hono()
app.route('/', book) // Handle /book
app.route('/', user) // Handle /user
```

## المسار الأساسي

يمكنك تحديد المسار الأساسي.

```ts twoslash
import { Hono } from 'hono'
// ---cut---
const api = new Hono().basePath('/api')
api.get('/book', (c) => c.text('List Books')) // GET /api/book
```

## التوجيه باستخدام اسم المضيف

يعمل بشكل جيد إذا تضمّن اسم مضيف.

```ts twoslash
import { Hono } from 'hono'
// ---cut---
const app = new Hono({
  getPath: (req) => req.url.replace(/^https?:\/([^?]+).*$/, '$1'),
})

app.get('/www1.example.com/hello', (c) => c.text('hello www1'))
app.get('/www2.example.com/hello', (c) => c.text('hello www2'))
```

## التوجيه باستخدام `host` قيمة الترويسة

يمكن لـ Hono التعامل مع `host` قيمة الترويسة إذا عيّنت `getPath()` الدالة في مُنشئ Hono.

```ts twoslash
import { Hono } from 'hono'
// ---cut---
const app = new Hono({
  getPath: (req) =>
    '/' +
    req.headers.get('host') +
    req.url.replace(/^https?:\/\/[^/]+(\/[^?]*).*/, '$1'),
})

app.get('/www1.example.com/hello', (c) => c.text('hello www1'))

// A following request will match the route:
// new Request('http://www1.example.com/hello', {
//  headers: { host: 'www1.example.com' },
// })
```

من خلال تطبيق هذا، على سبيل المثال، يمكنك تغيير التوجيه عبر `User-Agent` الترويسة.

## أولوية التوجيه

تُنفَّذ المعالجات (Handlers) أو الوسيطات (middleware) بترتيب التسجيل.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/book/a', (c) => c.text('a')) // a
app.get('/book/:slug', (c) => c.text('common')) // common
```

```
GET /book/a ---> `a`
GET /book/b ---> `common`
```

عند تنفيذ معالج (handler)، ستتوقف العملية.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('*', (c) => c.text('common')) // common
app.get('/foo', (c) => c.text('foo')) // foo
```

```
GET /foo ---> `common` // foo will not be dispatched
```

إذا كان لديك وسيطة تريد تنفيذها، فاكتب الكود أعلى المعالج.

```ts twoslash
import { Hono } from 'hono'
import { logger } from 'hono/logger'
const app = new Hono()
// ---cut---
app.use(logger())
app.get('/foo', (c) => c.text('foo'))
```

إذا كنت تريد معالج "_fallback_"، فاكتب الكود أسفل المعالج الآخر.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
// ---cut---
app.get('/bar', (c) => c.text('bar')) // bar
app.get('*', (c) => c.text('fallback')) // fallback
```

```
GET /bar ---> `bar`
GET /foo ---> `fallback`
```

## ترتيب التجميع

لاحظ أن خطأ تجميع المسارات (routings) يصعب ملاحظته.
الـ `route()` تأخذ الدالة التوجيه (routing) المخزَّن من الوسيطة الثانية (مثل `three` أو `two`) ويضيفه إلى الخاص به (`two` أو `app`) التوجيه.

```ts
three.get('/hi', (c) => c.text('hi'))
two.route('/three', three)
app.route('/two', two)

export default app
```

ستُعيد استجابة 200.

```
GET /two/three/hi ---> `hi`
```

ومع ذلك، إذا كانت بترتيب خاطئ، فستُعيد 404.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()
const two = new Hono()
const three = new Hono()
// ---cut---
three.get('/hi', (c) => c.text('hi'))
app.route('/two', two) // `two` does not have routes
two.route('/three', three)

export default app
```

```
GET /two/three/hi ---> 404 Not Found
```
