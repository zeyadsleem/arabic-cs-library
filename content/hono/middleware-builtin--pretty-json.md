---
title: "البرمجية الوسيطة Pretty JSON"
book: hono
chapter: middleware-builtin
slug: pretty-json
order: 47
source: https://hono.dev/docs/middleware/builtin/pretty-json
lang: ar
---

يتيح وسيط Pretty JSON ميزة "_طباعة JSON المنسقة_" (JSON pretty print) لنص استجابة JSON.
إضافة `?pretty` إلى وسيط استعلام url، تُنسَّق سلاسل JSON بشكل جميل.

```js
// GET /
{"project":{"name":"Hono","repository":"https://github.com/honojs/hono"}}
```

سيكون:

```js
// GET /?pretty
{
  "project": {
    "name": "Hono",
    "repository": "https://github.com/honojs/hono"
  }
}
```

## Import

```ts
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
```

## الاستخدام

```ts
const app = new Hono()

app.use(prettyJSON()) // With options: prettyJSON({ space: 4 })
app.get('/', (c) => {
  return c.json({ message: 'Hono!' })
})
```

## الخيارات

### <Badge type="info" text="optional" /> space: `number`

عدد المسافات للإزاحة. الافتراضي هو `2`.

### <Badge type="info" text="optional" /> query: `string`

اسم سلسلة الاستعلام (query string) للتطبيق. الافتراضي هو `pretty`.

### <Badge type="info" text="optional" /> force: `boolean`

عند الضبط على `true`، يتم دائمًا تنسيق استجابات JSON بغض النظر عن معامل الاستعلام. القيمة الافتراضية هي `false`.
