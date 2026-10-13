---
title: "مساعد `Route`"
book: hono
chapter: helpers
slug: route
order: 64
source: https://hono.dev/docs/helpers/route
lang: ar
---

يوفر Route Helper معلومات توجيه محسّنة لتصحيح الأخطاء وتطوير الوسائط. يتيح لك الوصول إلى معلومات تفصيلية حول المسارات المطابقة والمسار الحالي قيد المعالجة.

## Import

```ts
import { Hono } from 'hono'
import {
  matchedRoutes,
  routePath,
  baseRoutePath,
  basePath,
} from 'hono/route'
```

## الاستخدام

### معلومات المسار الأساسية

```ts
const app = new Hono()

app.get('/posts/:id', (c) => {
  const currentPath = routePath(c) // '/posts/:id'
  const routes = matchedRoutes(c) // Array of matched routes

  return c.json({
    path: currentPath,
    totalRoutes: routes.length,
  })
})
```

### العمل مع التطبيقات الفرعية

```ts
const app = new Hono()
const apiApp = new Hono()

apiApp.get('/posts/:id', (c) => {
  return c.json({
    routePath: routePath(c), // '/posts/:id'
    baseRoutePath: baseRoutePath(c), // '/api'
    basePath: basePath(c), // '/api' (with actual params)
  })
})

app.route('/api', apiApp)
```

## `matchedRoutes()`

يعيد مصفوفة بجميع المسارات التي تطابقت مع الطلب الحالي، بما في ذلك الوسائط.

```ts
app.all('/api/*', (c, next) => {
  console.log('API middleware')
  return next()
})

app.get('/api/users/:id', (c) => {
  const routes = matchedRoutes(c)
  // Returns: [
  //   { method: 'ALL', path: '/api/*', handler: [Function] },
  //   { method: 'GET', path: '/api/users/:id', handler: [Function] }
  // ]
  return c.json({ routes: routes.length })
})
```

## `routePath()`

يعيد نمط المسار (route path pattern) المُسجَّل للمعالج (handler) الحالي.

```ts
app.get('/posts/:id', (c) => {
  console.log(routePath(c)) // '/posts/:id'
  return c.text('Post details')
})
```

### الاستخدام مع معامل index

يمكنك اختياريًا تمرير معامل فهرس للحصول على مسار المسار عند موضع محدد، على غرار `Array.prototype.at()`.

```ts
app.all('/api/*', (c, next) => {
  return next()
})

app.get('/api/users/:id', (c) => {
  console.log(routePath(c, 0)) // '/api/*' (first matched route)
  console.log(routePath(c, -1)) // '/api/users/:id' (last matched route)
  return c.text('User details')
})
```

## `baseRoutePath()`

يعيد نمط المسار الأساسي (base path pattern) للمسار الحالي كما هو محدد في التوجيه (routing).

```ts
const subApp = new Hono()
subApp.get('/posts/:id', (c) => {
  return c.text(baseRoutePath(c)) // '/:sub'
})

app.route('/:sub', subApp)
```

### الاستخدام مع معامل index

يمكنك اختياريًا تمرير معامل فهرس (index) للحصول على مسار المسار الأساسي عند موضع محدد
الموضع، على غرار `Array.prototype.at()`.

```ts
app.all('/api/*', (c, next) => {
  return next()
})

const subApp = new Hono()
subApp.get('/users/:id', (c) => {
  console.log(baseRoutePath(c, 0)) // '/' (first matched route)
  console.log(baseRoutePath(c, -1)) // '/api' (last matched route)
  return c.text('User details')
})

app.route('/api', subApp)
```

## `basePath()`

يعيد المسار الأساسي (base path) مع المعاملات المضمّنة من الطلب الفعلي.

```ts
const subApp = new Hono()
subApp.get('/posts/:id', (c) => {
  return c.text(basePath(c)) // '/api' (for request to '/api/posts/123')
})

app.route('/:sub', subApp)
```
