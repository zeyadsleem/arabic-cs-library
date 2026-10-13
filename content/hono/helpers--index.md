---
title: "مساعد `Accepts`"
book: hono
chapter: helpers
slug: index
order: 54
source: https://hono.dev/docs/helpers/accepts
lang: ar
---

يساعد Accepts Helper في التعامل مع ترويسات Accept في الطلبات.

## Import

```ts
import { Hono } from 'hono'
import { accepts } from 'hono/accepts'
```

## `accepts()`

الـ `accepts()` تنظر الدالة إلى ترويسة Accept، مثل Accept-Encoding و Accept-Language، وتعيد القيمة المناسبة.

```ts
import { accepts } from 'hono/accepts'

app.get('/', (c) => {
  const accept = accepts(c, {
    header: 'Accept-Language',
    supports: ['en', 'ja', 'zh'],
    default: 'en',
  })
  return c.json({ lang: accept })
})
```

### `AcceptHeader` نوع

تعريف `AcceptHeader` النوع كما يلي.

```ts
export type AcceptHeader =
  | 'Accept'
  | 'Accept-Charset'
  | 'Accept-Encoding'
  | 'Accept-Language'
  | 'Accept-Patch'
  | 'Accept-Post'
  | 'Accept-Ranges'
```

## الخيارات

### <Badge type="danger" text="required" /> header: `AcceptHeader`

ترويسة accept الهدف.

### <Badge type="danger" text="required" /> يدعم: `string[]`

قيم الترويسة التي يدعمها تطبيقك.

### <Badge type="danger" text="required" /> default: `string`

القيم الافتراضية.

### <Badge type="info" text="optional" /> match: `(accepts: Accept[], config: acceptsConfig) => string`

دالة المطابقة المخصصة.
