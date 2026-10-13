---
title: "وسيط Method Not Allowed"
book: hono
chapter: middleware-builtin
slug: method-not-allowed
order: 44
source: https://hono.dev/docs/middleware/builtin/method-not-allowed
lang: ar
---

يُعيد وسيط الطريقة غير المسموح بها (Method Not Allowed) `405 Method Not Allowed` استجابة بـ `Allow` الترويسة عندما يطابق مسار الطلب مسارًا مسجلًا لكن طريقة الطلب غير مدعومة. بدون هذا الوسيط، يُرجع Hono `404 Not Found` في هذه الحالة.

## Import

```ts
import { Hono } from 'hono'
import { methodNotAllowed } from 'hono/method-not-allowed'
```

## الاستخدام

```ts
const app = new Hono()

app.use(methodNotAllowed({ app }))

app.get('/hello', (c) => c.text('Hello!'))
app.post('/hello', (c) => c.text('Posted!'))

// PUT /hello -> 405 Method Not Allowed
// Allow: GET, HEAD, POST
```

يمكنك تخصيص الاستجابة بـ `onMethodNotAllowed` option:

```ts
app.use(
  methodNotAllowed({
    app,
    onMethodNotAllowed: (c, methods) =>
      c.json({ error: 'Method Not Allowed' }, 405, {
        Allow: methods.join(', '),
      }),
  })
)
```

## الخيارات

### <Badge type="danger" text="required" /> app: `Hono`

مثيل Hono المستخدم من قبل التطبيق. يجمع الوسيط الطرق المسموحة لكل مسار من مساراته المسجلة.

### <Badge type="info" text="optional" /> onMethodNotAllowed: `(c: Context, allowedMethods: string[]) => Response | Promise<Response>`

يولّد الاستجابة، بما في ذلك `Allow` ترويسة. افتراضيًا، يُعيد الوسيط `405 Method Not Allowed` استجابة بـ `Allow` الترويسة مضبوطة على الطرق المسموح بها.
