---
title: "برمجية وسيطة ETag"
book: hono
chapter: middleware-builtin
slug: etag
order: 37
source: https://hono.dev/docs/middleware/builtin/etag
lang: ar
---

باستخدام هذه الوسيطة (middleware)، يمكنك إضافة ترويسات ETag بسهولة.

## Import

```ts
import { Hono } from 'hono'
import { etag } from 'hono/etag'
```

## الاستخدام

```ts
const app = new Hono()

app.use('/etag/*', etag())
app.get('/etag/abc', (c) => {
  return c.text('Hono is cool')
})
```

## الترويسات المحتفظ بها

يجب أن تتضمن استجابة 304 الترويسات التي كان سيتم إرسالها في استجابة 200 OK مكافئة. الترويسات الافتراضية هي Cache-Control و Content-Location و Date و ETag و Expires و Vary.

إذا أردت إضافة الترويسة (header) التي تُرسَل، يمكنك استخدام `retainedHeaders` الخيار و `RETAINED_304_HEADERS` متغيّر مصفوفة النصوص الذي يتضمن الترويسات (headers) الافتراضية:

```ts
import { etag, RETAINED_304_HEADERS } from 'hono/etag'

// ...

app.use(
  '/etag/*',
  etag({
    retainedHeaders: ['x-message', ...RETAINED_304_HEADERS],
  })
)
```

## الخيارات

### <Badge type="info" text="optional" /> weak: `boolean`

حدّد باستخدام أو دون استخدام [تحقق ضعيف](https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests#weak_validation). إذا `true` مُضبط، فإن `w/` يُضاف إلى بادئة القيمة. الافتراضي هو `false`.

### <Badge type="info" text="optional" /> retainedHeaders: `string[]`

الترويسات (headers) التي تريد الاحتفاظ بها في استجابة 304.

### <Badge type="info" text="optional" /> generateDigest: `(body: Uint8Array) => ArrayBuffer | Promise<ArrayBuffer>`

دالة مخصّصة لتوليد البصمة (digest). افتراضياً، تستخدم `SHA-1`. تُستدعى هذه الدالة مع جسم الاستجابة (response body) كـ `Uint8Array` ويجب أن تُعيد قيمة تجزئة (hash) كـ `ArrayBuffer` أو Promise خاص بها.
