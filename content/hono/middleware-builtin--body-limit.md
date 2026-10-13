---
title: "البرمجية الوسيطة Body Limit"
book: hono
chapter: middleware-builtin
slug: body-limit
order: 30
source: https://hono.dev/docs/middleware/builtin/body-limit
lang: ar
---

يمكن لوسيط حد النص (Body Limit Middleware) تقييد حجم ملف نص الطلب (request body).

يستخدم هذا الوسيط أولًا قيمة `Content-Length` الترويسة في الطلب، إن وُجدت.
إذا لم يتم تعيينه، فإنه يقرأ النص (body) في الدفق وينفذ معالج أخطاء إذا كان أكبر من حجم الملف المحدد.

## Import

```ts
import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
```

## الاستخدام

```ts
const app = new Hono()

app.post(
  '/upload',
  bodyLimit({
    maxSize: 50 * 1024, // 50kb
    onError: (c) => {
      return c.text('overflow :(', 413)
    },
  }),
  async (c) => {
    const body = await c.req.parseBody()
    if (body['file'] instanceof File) {
      console.log(`Got file sized: ${body['file'].size}`)
    }
    return c.text('pass :)')
  }
)
```

## الخيارات

### <Badge type="danger" text="required" /> maxSize: `number`

الحد الأقصى لحجم الملف الذي تريد تقييده. الافتراضي هو `100 * 1024` - `100kb`.

### <Badge type="info" text="optional" /> onError: `OnError`

معالج الأخطاء (error handler) الذي سيتم استدعاؤه إذا تم تجاوز حجم الملف المحدد.

## الاستخدام مع Bun للطلبات الكبيرة

إذا تم استخدام وسيط حد النص (Body Limit Middleware) صراحةً للسماح بنص طلب أكبر من الافتراضي، فقد يكون من الضروري إجراء تغييرات على `Bun.serve` الإعدادات وفقًا لذلك. [وقت كتابة هذا](https://github.com/oven-sh/bun/blob/f2cfa15e4ef9d730fc6842ad8b79fb7ab4c71cb9/packages/bun-types/bun.d.ts#L2191), `Bun.serve`الحد الافتراضي لنص الطلب هو 128MiB. إذا قمت بتعيين وسيط حد النص (Body Limit Middleware) الخاص بـ Hono إلى قيمة أكبر من ذلك، ستظل طلباتك تفشل، بالإضافة إلى أن `onError` لن يتم استدعاء المعالج (handler) المحدد في الوسيط (middleware). وذلك لأن `Bun.serve()` سيضبط رمز الحالة إلى `413` وإنهاء الاتصال قبل تمرير الطلب إلى Hono.

إذا كنت تريد قبول طلبات أكبر من 128MiB باستخدام Hono و Bun، فستحتاج إلى تعيين الحد الأقصى لـ Bun أيضًا:

```ts
export default {
  port: process.env['PORT'] || 3000,
  fetch: app.fetch,
  maxRequestBodySize: 1024 * 1024 * 200, // your value here
}
```

أو، حسب إعدادك:

```ts
Bun.serve({
  fetch(req, server) {
    return app.fetch(req, { ip: server.requestIP(req) })
  },
  maxRequestBodySize: 1024 * 1024 * 200, // your value here
})
```
