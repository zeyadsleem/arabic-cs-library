---
title: "وسيط تجاوز الطريقة (Method Override)"
book: hono
chapter: middleware-builtin
slug: method-override
order: 45
source: https://hono.dev/docs/middleware/builtin/method-override
lang: ar
---

ينفذ هذا الوسيط معالج الطريقة المحددة، التي تختلف عن الطريقة الفعلية للطلب، اعتمادًا على قيمة النموذج (form) أو الترويسة أو الاستعلام (query)، ويُرجع استجابته.

## Import

```ts
import { Hono } from 'hono'
import { methodOverride } from 'hono/method-override'
```

## الاستخدام

```ts
const app = new Hono()

// If no options are specified, the value of `_method` in the form,
// e.g. DELETE, is used as the method.
app.use('/posts', methodOverride({ app }))

app.delete('/posts', (c) => {
  // ....
})
```

## على سبيل المثال

نظرًا لأن نماذج HTML لا يمكنها إرسال طريقة DELETE، يمكنك وضع القيمة `DELETE` في الخاصية المسماة `_method` وأرسله. والمعالج الخاص بـ `app.delete()` سيتم تنفيذها.

نموذج `HTML`:

```html
<form action="/posts" method="POST">
  <input type="hidden" name="_method" value="DELETE" />
  <input type="text" name="id" />
</form>
```

التطبيق:

```ts
import { methodOverride } from 'hono/method-override'

const app = new Hono()
app.use('/posts', methodOverride({ app }))

app.delete('/posts', () => {
  // ...
})
```

يمكنك تغيير القيم الافتراضية أو استخدام قيمة الرأس (header) وقيمة الاستعلام (query):

```ts
app.use('/posts', methodOverride({ app, form: '_custom_name' }))
app.use(
  '/posts',
  methodOverride({ app, header: 'X-METHOD-OVERRIDE' })
)
app.use('/posts', methodOverride({ app, query: '_method' }))
```

## الخيارات

### <Badge type="danger" text="required" /> app: `Hono`

نسخة من `Hono` مستخدم في تطبيقك.

### <Badge type="info" text="optional" /> form: `string`

مفتاح النموذج بقيمة تحتوي على اسم الطريقة.
القيمة الافتراضية هي `_method`.

### <Badge type="info" text="optional" /> header: `boolean`

اسم ترويسة بقيمة تحتوي على اسم الطريقة.

### <Badge type="info" text="optional" /> query: `boolean`

مفتاح معامل الاستعلام (query parameter) بقيمة تحتوي على اسم الطريقة.
