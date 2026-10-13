---
title: "البرمجية الوسيطة Compress"
book: hono
chapter: middleware-builtin
slug: compress
order: 33
source: https://hono.dev/docs/middleware/builtin/compress
lang: ar
---

تضغط هذه الوسيطة (middleware) جسم الاستجابة (response body)، وفقاً لـ `Accept-Encoding` ترويسة الطلب.

**ملاحظة**: في Cloudflare Workers و Deno Deploy، سيتم ضغط نص الاستجابة تلقائيًا، لذا لا حاجة لاستخدام هذا الوسيط.

## Import

```ts
import { Hono } from 'hono'
import { compress } from 'hono/compress'
```

## الاستخدام

```ts
const app = new Hono()

app.use(compress())
```

## الخيارات

### <Badge type="info" text="optional" /> encoding: `'gzip'` | `'deflate'`

مخطط الضغط (compression scheme) المسموح به لضغط الاستجابات. إما `gzip` أو `deflate`. إذا لم يُحدَّد، يُسمح بكليهما وسيُستخدمان بناءً على `Accept-Encoding` الترويسة. `gzip` تحظى بالأولوية إذا لم يتم توفير هذا الخيار وقدّم العميل كليهما في `Accept-Encoding` الترويسة.

### <Badge type="info" text="optional" /> threshold: `number`

أدنى حجم بالبايت للضغط. الافتراضي 1024 بايت.

### <Badge type="info" text="optional" /> contentTypeFilter: `RegExp` | `(contentType: string) => boolean`

A `RegExp` أو دالة لتحديد ما إذا كان يجب ضغط الاستجابة بناءً على `Content-Type`. افتراضيًا، تُستخدم قائمة مدمجة من أنواع المحتوى (Content-Types) القابلة للضغط.

يمكنك تمرير `RegExp` لضغط أنواع المحتوى (Content-Types) المطابقة فقط:

```ts
// Compress only JSON responses
app.use(compress({ contentTypeFilter: /^application\/json/ }))
```

أو مرّر دالة لمنطق مخصّص. المدمج `COMPRESSIBLE_CONTENT_TYPE_REGEX` يُصدَّر (exported) أيضاً حتى تتمكن من توسيع السلوك الافتراضي:

```ts
import {
  compress,
  COMPRESSIBLE_CONTENT_TYPE_REGEX,
} from 'hono/compress'

// Compress the default Content-Types plus a custom one
app.use(
  compress({
    contentTypeFilter: (type) =>
      COMPRESSIBLE_CONTENT_TYPE_REGEX.test(type) ||
      type === 'application/x-myformat',
  })
)
```
