---
title: "البرمجية الوسيطة JWK Auth"
book: hono
chapter: middleware-builtin
slug: jwk
order: 40
source: https://hono.dev/docs/middleware/builtin/jwk
lang: ar
---

تصادق وسيطة مصادقة JWK (JWK Auth Middleware) على الطلبات عن طريق التحقق من الرموز المميزة باستخدام JWK (JSON Web Key). تتحقق من وجود `Authorization` الترويسة ومصادر أخرى مهيأة، مثل ملفات تعريف الارتباط، إذا تم تحديدها. يتحقق من الرموز المميزة باستخدام القيم المقدمة `keys`، يسترجع المفاتيح من `jwks_uri` إذا حُدِّد، ويدعم استخراج الرمز (token) من ملفات تعريف الارتباط (cookies) إذا `cookie` الخيار مُضبط.

## ما تتحقق منه هذه البرمجية الوسيطة

لكل رمز، `jwk()`:

- يحلّل ويتحقق من صيغة ترويسة JWT.
- يتطلب `kid` الترويسة ويجد مفتاحًا مطابقًا بواسطة `kid`.
- يرفض الخوارزميات المتماثلة (`HS256`, `HS384`, `HS512`).
- يتطلب الترويسة `alg` ليُضمَّن في المُهيَّأ `alg` قائمة السماح.
- إذا كان JWK المطابق يحتوي على `alg` الحقل، فإنه يتطلّب مطابقته لترويسة JWT `alg`.
- يتحقق من توقيع الرمز باستخدام المفتاح المطابق.
- افتراضيًا، يتحقق من المطالبات الزمنية: `nbf`, `exp`، و `iat`.

يمكن تهيئة التحقّق الاختياري من المطالبات (claims) عبر `verification` option:

- `iss`: يتحقق من المُصدِر (issuer) عند توفيره.
- `aud`: يتحقق من الجمهور (audience) عند توفيره.

إذا كنت بحاجة إلى فحوصات رموز إضافية تتجاوز ما سبق (على سبيل المثال، قواعد تفويض مخصصة على مستوى التطبيق)، أضفها في الوسيط الخاص بك بعد `jwk()`.

يجب أن يحتوي رأس التخويل (Authorization) المُرسل من العميل على مخطط (scheme) محدد.

مثال: `Bearer my.token.value` أو `Basic my.token.value`

## Import

```ts
import { Hono } from 'hono'
import { jwk } from 'hono/jwk'
import { verifyWithJwks } from 'hono/jwt'
```

## الاستخدام

```ts
const app = new Hono()

app.use(
  '/auth/*',
  jwk({
    jwks_uri: `https://${backendServer}/.well-known/jwks.json`,
    alg: ['RS256'],
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
  jwk({
    jwks_uri: `https://${backendServer}/.well-known/jwks.json`,
    alg: ['RS256'],
  })
)

app.get('/auth/page', (c) => {
  const payload = c.get('jwtPayload')
  return c.json(payload) // eg: { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }
})
```

وصول مجهول:

```ts
const app = new Hono()

app.use(
  '/auth/*',
  jwk({
    jwks_uri: (c) =>
      `https://${c.env.authServer}/.well-known/jwks.json`,
    alg: ['RS256'],
    allow_anon: true,
  })
)

app.get('/auth/page', (c) => {
  const payload = c.get('jwtPayload')
  return c.json(payload ?? { message: 'hello anon' })
})
```

## استخدام `verifyWithJwks` خارج البرمجيات الوسيطة

الـ `verifyWithJwks` يمكن استخدام الدالة المساعدة للتحقق من رموز JWT خارج سياق وسائط Hono، مثل صفحات SvelteKit SSR أو بيئات جانب الخادم الأخرى:

```ts
const id_payload = await verifyWithJwks(
  id_token,
  {
    jwks_uri: 'https://your-auth-server/.well-known/jwks.json',
    allowedAlgorithms: ['RS256'],
  },
  {
    cf: { cacheEverything: true, cacheTtl: 3600 },
  }
)
```

## ضبط خيارات طلب جلب JWKS

لتكوين كيفية استرجاع JWKS من `jwks_uri`، مرِّر خيارات طلب fetch كوسيط ثانٍ لـ `jwk()`.

هذه الوسيطة هي `RequestInit` ويُستخدم فقط لطلب جلب JWKS.

```ts
const app = new Hono()

app.use(
  '/auth/*',
  jwk(
    {
      jwks_uri: `https://${backendServer}/.well-known/jwks.json`,
      alg: ['RS256'],
    },
    {
      headers: {
        Authorization: 'Bearer TOKEN',
      },
    }
  )
)
```

## الخيارات

### <Badge type="danger" text="required" /> alg: `AsymmetricAlgorithm[]`

مصفوفة من الخوارزميات غير المتماثلة (asymmetric) المسموح بها والمستخدمة للتحقق من الرمز المميز (token).

الأنواع المتاحة هي `RS256` | `RS384` | `RS512` | `PS256` | `PS384` | `PS512` | `ES256` | `ES384` | `ES512` | `EdDSA`.

### <Badge type="info" text="optional" /> keys: `HonoJsonWebKey[] | (c: Context) => Promise<HonoJsonWebKey[]>`

قيم مفاتيحك العامة، أو دالة تعيدها. تستقبل الدالة كائن Context.

### <Badge type="info" text="optional" /> jwks_uri: `string` | `(c: Context) => Promise<string>`

إذا تم تعيين هذه القيمة، فحاول جلب مفاتيح JWK من هذا URI، متوقعًا استجابة JSON تحتوي على `keys`، والتي تُضاف إلى المُقدَّم `keys` خيار. يمكنك أيضًا تمرير دالة استدعاء لتحديد URI لمفاتيح JWKS ديناميكيًا باستخدام Context.

### <Badge type="info" text="optional" /> `allow_anon`: `boolean`

إذا تم ضبط هذه القيمة على `true`، سيُسمح للطلبات التي لا تحتوي على رمز مميز (token) صالح بالمرور عبر الوسيطة. استخدم `c.get('jwtPayload')` للتحقق مما إذا كان الطلب موثَّقاً (authenticated). الافتراضي هو `false`.

### <Badge type="info" text="optional" /> cookie: `string`

إذا تم تعيين هذه القيمة، يتم استرجاع القيمة من ترويسة ملفات تعريف الارتباط باستخدام تلك القيمة كمفتاح، ثم يتم التحقق منها كرمز (token).

### <Badge type="info" text="optional" /> `headerName`: `string`

اسم الرأس (header) الذي يُبحث فيه عن الرمز المميز (token) الخاص بـ JWT. الافتراضي هو `Authorization`.

### <Badge type="info" text="optional" /> realm: `string`

نطاق الحماية الموصوف بواسطة `realm` معامل `WWW-Authenticate` ترويسة التحدي (challenge) المُعادة عند `401` الاستجابات. القيمة الافتراضية هي عنوان URL للطلب.

### <Badge type="info" text="optional" /> `verification`: `VerifyOptions`

قم بتكوين سلوك التحقق من المُطالَبات (claims) بالإضافة إلى التحقق من التوقيع (signature):

[Keep in sync with jwt.md]: #

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
