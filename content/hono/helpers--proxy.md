---
title: "مساعد `Proxy`"
book: hono
chapter: helpers
slug: proxy
order: 63
source: https://hono.dev/docs/helpers/proxy
lang: ar
---

توفر الأداة المساعدة Proxy (Proxy Helper) دوالًا مفيدة عند استخدام تطبيق Hono كوكيل (بروكسي عكسي).

## Import

```ts
import { Hono } from 'hono'
import { proxy } from 'hono/proxy'
```

## `proxy()`

`proxy()` هو `fetch()` غلاف API (wrapper) للوكيل (proxy). المعاملات وقيمة الإرجاع هي نفسها كما في `fetch()` (باستثناء الخيارات الخاصة بالوكيل (proxy)).

الـ `Accept-Encoding` يتم استبدال الترويسة بترميز يمكن لوقت التشغيل الحالي التعامل معه. تتم إزالة ترويسات الاستجابة غير الضرورية، ويتم `Response` يُعاد كائن (object) يمكن إرساله من المعالج (handler).

### أمثلة

استخدام بسيط:

```ts
app.get('/proxy/:path', (c) => {
  return proxy(`http://${originServer}/${c.req.param('path')}`)
})
```

استخدام معقَّد:

```ts
app.get('/proxy/:path', async (c) => {
  const res = await proxy(
    `http://${originServer}/${c.req.param('path')}`,
    {
      headers: {
        ...c.req.header(), // optional, specify only when forwarding all the request data (including credentials) is necessary.
        'X-Forwarded-For': '127.0.0.1',
        'X-Forwarded-Host': c.req.header('host'),
        Authorization: undefined, // do not propagate request headers contained in c.req.header('Authorization')
      },
    }
  )
  res.headers.delete('Set-Cookie')
  return res
})
```

أو يمكنك تمرير `c.req` كمعامل.

```ts
app.all('/proxy/:path', (c) => {
  return proxy(`http://${originServer}/${c.req.param('path')}`, {
    ...c.req, // optional, specify only when forwarding all the request data (including credentials) is necessary.
    headers: {
      ...c.req.header(),
      'X-Forwarded-For': '127.0.0.1',
      'X-Forwarded-Host': c.req.header('host'),
      Authorization: undefined, // do not propagate request headers contained in c.req.header('Authorization')
    },
  })
})
```

يمكنك تجاوز الافتراضي العام `fetch` دالة بـ `customFetch` option:

```ts
app.get('/proxy', (c) => {
  return proxy('https://example.com/', {
    customFetch,
  })
})
```

### معالجة ترويسة الاتصال

بشكل افتراضي، `proxy()` يتجاهل `Connection` ترويسة لمنع هجمات حقن الترويسات المتتابعة (Hop-by-Hop Header Injection). يمكنك تفعيل الامتثال الصارم لمعيار RFC 9110 باستخدام `strictConnectionProcessing` option:

```ts
// Default behavior (recommended for untrusted clients)
app.get('/proxy/:path', (c) => {
  return proxy(`http://${originServer}/${c.req.param('path')}`, c.req)
})

// Strict RFC 9110 compliance (use only in trusted environments)
app.get('/internal-proxy/:path', (c) => {
  return proxy(`http://${internalServer}/${c.req.param('path')}`, {
    ...c.req,
    strictConnectionProcessing: true,
  })
})
```

### `ProxyFetch`

نوع `proxy()` معرّف كـ `ProxyFetch` وكما يلي

```ts
interface ProxyRequestInit extends Omit<RequestInit, 'headers'> {
  raw?: Request
  customFetch?: (request: Request) => Promise<Response>
  strictConnectionProcessing?: boolean
  headers?:
    | HeadersInit
    | [string, string][]
    | Record<RequestHeader, string | undefined>
    | Record<string, string | undefined>
}

interface ProxyFetch {
  (
    input: string | URL | Request,
    init?: ProxyRequestInit
  ): Promise<Response>
}
```
