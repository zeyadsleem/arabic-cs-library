---
title: "البرمجية الوسيطة Bearer Auth"
book: hono
chapter: middleware-builtin
slug: bearer-auth
order: 29
source: https://hono.dev/docs/middleware/builtin/bearer-auth
lang: ar
---

توفر وسيطة مصادقة Bearer (Bearer Auth Middleware) المصادقة عن طريق التحقق من رمز API مميز في ترويسة الطلب.
سيضيف عملاء HTTP الذين يصلون إلى نقطة النهاية `Authorization` ترويسة مع `Bearer {token}` كقيمة للترويسة.

باستخدام `curl` من الطرفية، فسيبدو هكذا:

```sh
curl -H 'Authorization: Bearer honoiscool' http://localhost:8787/auth/page
```

## Import

```ts
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
```

## الاستخدام

> [!NOTE]
> الخاص بك `token` يجب أن يطابق التعبير النمطي `/[A-Za-z0-9._~+/-]+=*/`، وإلا سيتم إرجاع خطأ 400. ومن الجدير بالذكر أن هذا التعبير النمطي (regex) يستوعب رموز JWT المرمزة بـ Base64 الآمنة لعناوين URL ورموز Base64 القياسية معًا. لا يتطلب هذا الوسيط أن يكون رمز الحامل (bearer token) JWT، فقط أن يطابق التعبير النمطي أعلاه.

```ts
const app = new Hono()

const token = 'honoiscool'

app.use('/api/*', bearerAuth({ token }))

app.get('/api/page', (c) => {
  return c.json({ message: 'You are authorized' })
})
```

للاقتصار على مسار + طريقة محددة:

```ts
const app = new Hono()

const token = 'honoiscool'

app.get('/api/page', (c) => {
  return c.json({ message: 'Read posts' })
})

app.post('/api/page', bearerAuth({ token }), (c) => {
  return c.json({ message: 'Created post!' }, 201)
})
```

لتنفيذ رموز متعددة (مثلًا: يمكن لأي رمز صالح القراءة، لكن إنشاء/تحديث/حذف تقتصر على رمز مميز (privileged token)):

```ts
const app = new Hono()

const readToken = 'read'
const privilegedToken = 'read+write'
const privilegedMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

app.on('GET', '/api/page/*', async (c, next) => {
  // List of valid tokens
  const bearer = bearerAuth({ token: [readToken, privilegedToken] })
  return bearer(c, next)
})
app.on(privilegedMethods, '/api/page/*', async (c, next) => {
  // Single valid privileged token
  const bearer = bearerAuth({ token: privilegedToken })
  return bearer(c, next)
})

// Define handlers for GET, POST, etc.
```

إذا أردت التحقق من قيمة الرمز المميز (token) بنفسك، فحدد `verifyToken` خيار؛ إرجاع `true` يعني أنه مقبول.

```ts
const app = new Hono()

app.use(
  '/auth-verify-token/*',
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === 'dynamic-token'
    },
  })
)
```

## الخيارات

### <Badge type="danger" text="required" /> token: `string` | `string[]`

النص الذي يُتحقَّق به من الرمز المميز (bearer token) الوارد.

### <Badge type="info" text="optional" /> realm: `string`

اسم نطاق المجال (realm)، كجزء من ترويسة التحدي WWW-Authenticate المرتجعة. الافتراضي هو `""`.
اعرف المزيد: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate#directives

### <Badge type="info" text="optional" /> prefix: `string`

البادئة (أو المعروفة بـ `schema`) لقيمة ترويسة Authorization. الافتراضي هو `"Bearer"`.

### <Badge type="info" text="optional" /> `headerName`: `string`

اسم الترويسة. القيمة الافتراضية هي `Authorization`.

### <Badge type="info" text="optional" /> `hashFunction`: `Function`

دالة لمعالجة التجزئة (hashing) للمقارنة الآمنة بين رموز (tokens) المصادقة.

### <Badge type="info" text="optional" /> `verifyToken`: `(token: string, c: Context) => boolean | Promise<boolean>`

الدالة للتحقق من الرمز (token).

### <Badge type="info" text="optional" /> noAuthenticationHeader: `object`

يخصص استجابة الخطأ عندما لا يحتوي الطلب على ترويسة مصادقة.

- `wwwAuthenticateHeader`: `string | object | MessageFunction` - يخصّص قيمة ترويسة WWW-Authenticate.
- `message`: `string | object | MessageFunction` - الرسالة المخصّصة لجسم الاستجابة.

`MessageFunction` هو `(c: Context) => string | object | Promise<string | object>`.

### <Badge type="info" text="optional" /> invalidAuthenticationHeader: `object`

يخصص استجابة الخطأ عندما يكون تنسيق رأس المصادقة (authentication header) غير صالح.

- `wwwAuthenticateHeader`: `string | object | MessageFunction` - يخصّص قيمة ترويسة WWW-Authenticate.
- `message`: `string | object | MessageFunction` - الرسالة المخصّصة لجسم الاستجابة.

### <Badge type="info" text="optional" /> `invalidToken`: `object`

يخصّص استجابة الخطأ عندما يكون الرمز (token) غير صالح.

- `wwwAuthenticateHeader`: `string | object | MessageFunction` - يخصّص قيمة ترويسة WWW-Authenticate.
- `message`: `string | object | MessageFunction` - الرسالة المخصّصة لجسم الاستجابة.
