---
title: "الاختبار"
book: hono
chapter: guides
slug: testing
order: 76
source: https://hono.dev/docs/guides/testing
lang: ar
---

[Vitest]: https://vitest.dev/

الاختبار مهم.
في الواقع، من السهل اختبار تطبيقات Hono.
تختلف طريقة إنشاء بيئة الاختبار من بيئة تشغيل إلى أخرى، لكن الخطوات الأساسية هي نفسها.
في هذا القسم، لنختبر باستخدام Cloudflare Workers و [Vitest].

توصي Cloudflare باستخدام [Vitest] مع [@cloudflare/vitest-pool-workers](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers). لمزيد من التفاصيل، يُرجى الرجوع إلى [تكامل Vitest](https://developers.cloudflare.com/workers/testing/vitest-integration/) في وثائق Cloudflare Workers.

## الطلب والاستجابة

كل ما عليك فعله هو إنشاء كائن Request وتمريره إلى تطبيق Hono للتحقق من Response. يمكنك بعد ذلك استخدام `app.request` الطريقة.

للحصول على عميل اختبار مُنمّط (typed) انظر [مساعد الاختبار](https://hono.dev/docs/helpers/testing).

على سبيل المثال، فكر في تطبيق يوفر واجهة REST API التالية.

```ts
app.get('/posts', (c) => {
  return c.text('Many posts')
})

app.post('/posts', (c) => {
  return c.json(
    {
      message: 'Created',
    },
    201,
    {
      'X-Custom': 'Thank you',
    }
  )
})
```

أرسل طلبًا إلى `GET /posts` واختبر الاستجابة.

```ts
describe('Example', () => {
  test('GET /posts', async () => {
    const res = await app.request('/posts')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Many posts')
  })
})
```

لإرسال طلب إلى `POST /posts`، قم بما يلي.

```ts
test('POST /posts', async () => {
  const res = await app.request('/posts', {
    method: 'POST',
  })
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})
```

لإرسال طلب إلى `POST /posts` مع `JSON` البيانات، قم بما يلي.

```ts
test('POST /posts', async () => {
  const res = await app.request('/posts', {
    method: 'POST',
    body: JSON.stringify({ message: 'hello hono' }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})
```

لإرسال طلب إلى `POST /posts` مع `multipart/form-data` البيانات، قم بما يلي.

```ts
test('POST /posts', async () => {
  const formData = new FormData()
  formData.append('message', 'hello')
  const res = await app.request('/posts', {
    method: 'POST',
    body: formData,
  })
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})
```

يمكنك أيضًا تمرير نسخة من صنف Request.

```ts
test('POST /posts', async () => {
  const req = new Request('http://localhost/posts', {
    method: 'POST',
  })
  const res = await app.request(req)
  expect(res.status).toBe(201)
  expect(res.headers.get('X-Custom')).toBe('Thank you')
  expect(await res.json()).toEqual({
    message: 'Created',
  })
})
```

بهذه الطريقة، يمكنك اختباره كاختبار شامل (End-to-End).

## Env

لتعيين `c.env` للاختبار، يمكنك تمريره كمعامل ثالث إلى `app.request`. هذا مفيد لمحاكاة قيم مثل [Cloudflare Workers Bindings](https://hono.dev/getting-started/cloudflare-workers#bindings):

```ts
const MOCK_ENV = {
  API_HOST: 'example.com',
  DB: {
    prepare: () => {
      /* mocked D1 */
    },
  },
}

test('GET /posts', async () => {
  const res = await app.request('/posts', {}, MOCK_ENV)
})
```
