---
title: "مساعد الاختبار"
book: hono
chapter: helpers
slug: testing
order: 67
source: https://hono.dev/docs/helpers/testing
lang: ar
---

توفر أداة الاختبار المساعدة (Testing Helper) دوالًا لتسهيل اختبار تطبيقات Hono.

## Import

```ts
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
```

## `testClient()`

الـ `testClient()` تأخذ الدالة مثيلًا من Hono كمعاملها الأول وتُرجع كائنًا مكتوبًا (typed) وفقًا لمسارات تطبيق Hono الخاص بك، على غرار [عميل `Hono`](https://hono.dev/docs/guides/rpc#client). يتيح لك هذا استدعاء مساراتك المعرّفة بطريقة آمنة من حيث الأنواع (type-safe) مع الإكمال التلقائي في المحرر داخل اختباراتك.

**ملاحظة مهمة حول استنتاج الأنواع:**

من أجل `testClient` لاستنتاج أنواع مساراتك بشكل صحيح وتوفير الإكمال التلقائي، **يجب عليك تعريف مساراتك باستخدام طرق متسلسلة (chained methods) مباشرة على `Hono` instance**.

يعتمد استنتاج الأنواع (type inference) على النوع المتدفق عبر الوسائط المتسلسلة (chained) `.get()`, `.post()`، وما إلى ذلك، الاستدعاءات. إذا قمت بتعريف المسارات بشكل منفصل بعد إنشاء مثيل Hono (مثل النمط الشائع الموضح في مثال "Hello World": `const app = new Hono(); app.get(...)`)، الـ `testClient` لن تمتلك معلومات الأنواع اللازمة للمسارات المحددة، ولن تحصل على ميزات العميل الآمنة من حيث الأنواع (type-safe).

**مثال:**

يعمل هذا المثال لأن `.get()` الطريقة مربوطة مباشرةً على `new Hono()` call:

```ts
// index.ts
const app = new Hono().get('/search', (c) => {
  const query = c.req.query('q')
  return c.json({ query: query, results: ['result1', 'result2'] })
})

export default app
```

```ts
// index.test.ts
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { describe, it, expect } from 'vitest' // Or your preferred test runner
import app from './app'

describe('Search Endpoint', () => {
  // Create the test client from the app instance
  const client = testClient(app)

  it('should return search results', async () => {
    // Call the endpoint using the typed client
    // Notice the type safety for query parameters (if defined in the route)
    // and the direct access via .$get()
    const res = await client.search.$get({
      query: { q: 'hono' },
    })

    // Assertions
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      query: 'hono',
      results: ['result1', 'result2'],
    })
  })
})
```

لتضمين الترويسات في اختبارك، مررها كمعامل ثانٍ في الاستدعاء. يمكن للمعامل الثاني أيضًا أن يأخذ `init` خاصية كـ `RequestInit` كائن، مما يتيح لك تعيين الرؤوس (headers) والطريقة (method) والنص (body) وغيرها. تعرف على المزيد حول `init` خاصية [هنا](https://hono.dev/docs/guides/rpc#init-option).

```ts
// index.test.ts
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import { describe, it, expect } from 'vitest' // Or your preferred test runner
import app from './app'

describe('Search Endpoint', () => {
  // Create the test client from the app instance
  const client = testClient(app)

  it('should return search results', async () => {
    // Include the token in the headers and set the content type
    const token = 'this-is-a-very-clean-token'
    const res = await client.search.$get(
      {
        query: { q: 'hono' },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `application/json`,
        },
      }
    )

    // Assertions
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      query: 'hono',
      results: ['result1', 'result2'],
    })
  })
})
```
