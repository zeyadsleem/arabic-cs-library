---
title: "البرمجية الوسيطة JWT Auth"
book: hono
chapter: middleware-builtin
slug: jwt
order: 41
source: https://hono.dev/docs/middleware/builtin/jwt
lang: ar
---

يوفر وسيط مصادقة JWT (JWT Auth Middleware) المصادقة عبر التحقق من الرمز المميز (token) باستخدام JWT.
ستتحقق البرمجية الوسيطة من `Authorization` الترويسة إذا `cookie` لم يُضبط الخيار. يمكنك تخصيص اسم الترويسة (header) باستخدام `headerName` خيار.

يجب أن يحتوي رأس التخويل (Authorization) المُرسل من العميل على مخطط (scheme) محدد.

مثال: `Bearer my.token.value` أو `Basic my.token.value`

## Import

```ts
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'
```

## الاستخدام

```ts
// Specify the variable types to infer the `c.get('jwtPayload')`:
type Variables = JwtVariables

const app = new Hono<{ Variables: Variables }>()

app.use(
  '/auth/*',
  jwt({
    secret: 'it-is-very-secret',
    alg: 'HS256',
  })
)

app.get('/auth/page', (c) => {
  return c.text('You are authorized')
})
```

احصل على الحمولة:

```ts
const app = new Hono()

app.use(
  '/auth/*',
  jwt({
    secret: 'it-is-very-secret',
    alg: 'HS256',
    verification: {
      iss: 'my-trusted-issuer',
      aud: 'my-api',
    },
  })
)

app.get('/auth/page', (c) => {
  const payload = c.get('jwtPayload')
  return c.json(payload) // eg: { "sub": "1234567890", "name": "John Doe", "iat": 1516239022, "iss": "my-trusted-issuer" }
})
```


`jwt()` هي مجرد دالة وسيط (middleware). إذا أردت استخدام متغير بيئة (مثل: `c.env.JWT_SECRET`)، يمكنك استخدامه كما يلي:

```js
app.use('/auth/*', (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
    alg: 'HS256',
  })
  return jwtMiddleware(c, next)
})
```


## الخيارات

### <Badge type="danger" text="required" /> secret: `string`

قيمة مفتاحك السري.

### <Badge type="danger" text="required" /> alg: `string`

نوع خوارزمية يُستخدم للتحقّق.

الأنواع المتاحة هي `HS256` | `HS384` | `HS512` | `RS256` | `RS384` | `RS512` | `PS256` | `PS384` | `PS512` | `ES256` | `ES384` | `ES512` | `EdDSA`.

### <Badge type="info" text="optional" /> cookie: `string`

إذا تم تعيين هذه القيمة، يتم استرجاع القيمة من ترويسة ملفات تعريف الارتباط باستخدام تلك القيمة كمفتاح، ثم يتم التحقق منها كرمز (token).

### <Badge type="info" text="optional" /> `headerName`: `string`

اسم الرأس (header) الذي يُبحث فيه عن الرمز المميز (token) الخاص بـ JWT. الافتراضي هو `Authorization`.

```ts
app.use(
  '/auth/*',
  jwt({
    secret: 'it-is-very-secret',
    alg: 'HS256',
    headerName: 'x-custom-auth-header',
  })
)
```

### <Badge type="info" text="optional" /> realm: `string`

نطاق الحماية الموصوف بواسطة `realm` معامل `WWW-Authenticate` ترويسة التحدي (challenge) المُعادة عند `401` الاستجابات. القيمة الافتراضية هي عنوان URL للطلب.

```ts
app.use(
  '/auth/*',
  jwt({
    secret: 'it-is-very-secret',
    realm: 'my-protected-api',
  })
)
```

### <Badge type="info" text="optional" /> `verification`: `VerifyOptions`

خيارات تتحكّم في التحقّق من الرمز.

[Keep in sync with jwk.md]: #

#### <Badge type="info" text="optional" /> VerifyOptions.iss: `string | RegExp`

المُصدِر المتوقّع المستخدَم للتحقّق من الرمز. الـ `iss` **لن** يتم التحقق من المطالبة إذا لم يتم تعيين هذا.

#### <Badge type="info" text="optional" /> VerifyOptions.aud: `string | string[] | RegExp`

الجمهور المتوقع المستخدم للتحقق من الرمز المميز. إذا تم تعيين ذلك، يجب أن يتضمن الرمز المميز `aud` المطلوب، ويجب أن تطابق قيمة جمهور (audience) واحدة على الأقل.

#### <Badge type="info" text="optional" /> VerifyOptions.nbf: `boolean`

الـ `nbf` سيتم التحقق من مُطالَبة (claim) "عدم الاستخدام قبل" (not before) إذا كانت موجودة وكان هذا مضبوطًا على `true`. القيمة الافتراضية هي `true`.

#### <Badge type="info" text="optional" /> VerifyOptions.iat: `boolean`

الـ `iat` سيتم التحقق من مُطالَبة (claim) وقت الإصدار (issued at) إذا كانت موجودة وكان هذا مضبوطًا على `true`. القيمة الافتراضية هي `true`.

#### <Badge type="info" text="optional" /> VerifyOptions.exp: `boolean`

الـ `exp` سيتم التحقق من مُطالَبة (claim) وقت الانتهاء (expiration time) إذا كانت موجودة وكان هذا مضبوطًا على `true`. القيمة الافتراضية هي `true`.
