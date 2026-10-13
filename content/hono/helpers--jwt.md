---
title: "مساعد مصادقة JWT"
book: hono
chapter: helpers
slug: jwt
order: 62
source: https://hono.dev/docs/helpers/jwt
lang: ar
---

يوفر هذا المساعد دوالًا لترميز وفك ترميز وتوقيع والتحقق من رموز الويب JSON (JWTs). تُستخدم رموز JWT بشكل شائع لأغراض المصادقة والتفويض في تطبيقات الويب. يقدم هذا المساعد وظائف JWT قوية مع دعم لخوارزميات تشفير متنوعة.

## Import

لاستخدام هذا المساعد، يمكنك استيراده كما يلي:

```ts
import { decode, sign, verify } from 'hono/jwt'
```

[وسيط `JWT`](https://hono.dev/docs/middleware/builtin/jwt) أيضًا استيراد `jwt` دالة من `hono/jwt`.

## `sign()`

تولّد هذه الدالة رمز JWT عن طريق ترميز الحمولة (payload) وتوقيعها باستخدام الخوارزمية والسر (secret) المحددين.

```ts
sign(
  payload: unknown,
  secret: string,
  alg?: 'HS256';

): Promise<string>;
```

### مثال

```ts
import { sign } from 'hono/jwt'

const payload = {
  sub: 'user123',
  role: 'admin',
  exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
}
const secret = 'mySecretKey'
const token = await sign(payload, secret)
```

### الخيارات

<br/>

#### <Badge type="danger" text="required" /> payload: `unknown`

حمولة JWT (payload) التي سيتم توقيعها. يمكنك تضمين مُطالَبات (claims) أخرى كما في [تحقق الحمولة](#payload-validation).

#### <Badge type="danger" text="required" /> secret: `string`

المفتاح السرّي المستخدَم للتحقّق من JWT أو توقيعه.

#### <Badge type="info" text="optional" /> alg: [`AlgorithmTypes`](#supported-algorithmtypes)

الخوارزمية المستخدمة لتوقيع JWT أو التحقق منه. الافتراضي هو HS256.

## `verify()`

تتحقق هذه الدالة مما إذا كان رمز JWT أصليًا ولا يزال صالحًا. تضمن عدم تغيير الرمز وتتحقق من الصلاحية فقط إذا أضفت [تحقق الحمولة](#payload-validation).

```ts
verify(
  token: string,
  secret: string,
  alg: 'HS256';
  issuer?: string | RegExp;
  aud?: string | string[] | RegExp;
): Promise<any>;

```

### مثال

```ts
import { verify } from 'hono/jwt'

const tokenToVerify = 'token'
const secretKey = 'mySecretKey'

const decodedPayload = await verify(tokenToVerify, secretKey, 'HS256')
console.log(decodedPayload)
```

### الخيارات

<br/>

#### <Badge type="danger" text="required" /> token: `string`

رمز JWT المراد التحقق منه.

#### <Badge type="danger" text="required" /> secret: `string`

المفتاح السرّي المستخدَم للتحقّق من JWT أو توقيعه.

#### <Badge type="danger" text="required" /> alg: [`AlgorithmTypes`](#supported-algorithmtypes)

الخوارزمية المستخدَمة لتوقيع JWT أو التحقّق منه.

#### <Badge type="info" text="optional" /> issuer: `string | RegExp`

المُصدِر (issuer) المتوقّع المستخدَم للتحقّق من JWT.

#### <Badge type="info" text="optional" /> aud: `string | string[] | RegExp`

الجمهور المتوقع المستخدم للتحقق من JWT. إذا تم تعيين ذلك، يجب أن يتضمن الرمز المميز `aud` المطلوب، ويجب أن تطابق قيمة جمهور (audience) واحدة على الأقل.

## `decode()`

تفك هذه الدالة ترميز رمز JWT دون إجراء التحقق من التوقيع. تستخرج وتُرجع الترويسة (header) والحمولة (payload) من الرمز.

```ts
decode(token: string): { header: any; payload: any };
```

### مثال

```ts
import { decode } from 'hono/jwt'

// Decode the JWT token
const tokenToDecode =
  'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJzdWIiOiAidXNlcjEyMyIsICJyb2xlIjogImFkbWluIn0.JxUwx6Ua1B0D1B0FtCrj72ok5cm1Pkmr_hL82sd7ELA'

const { header, payload } = decode(tokenToDecode)

console.log('Decoded Header:', header)
console.log('Decoded Payload:', payload)
```

### الخيارات

<br/>

#### <Badge type="danger" text="required" /> token: `string`

رمز JWT المراد فك ترميزه.

> ال `decode` تتيح لك الدالة فحص الترويسة (header) والحمولة (payload) لرمز JWT _**دون**_ إجراء التحقق. يمكن أن يكون هذا مفيدًا لتصحيح الأخطاء أو استخراج المعلومات من رموز JWT.

## التحقق من الحمولة

عند التحقق من رمز JWT المميز (token)، يتم تنفيذ عمليات التحقق التالية على الحمولة (payload):

- `exp`: يُفحَص الرمز للتأكد من أنه لم تنتهِ صلاحيته.
- `nbf`: يتم التحقق من الرمز المميز (token) لضمان عدم استخدامه قبل وقت محدد.
- `iat`: يتم التحقق من الرمز المميز (token) لضمان عدم إصداره في المستقبل.
- `iss`: يتم التحقق من الرمز المميز (token) لضمان أنه صادر عن مُصدر موثوق.
- `aud`: يتم فحص الرمز المميز (token) للتأكد من أنه موجّه لجمهور مقبول عندما `aud` تم تعيين معامل التحقق.

يرجى التأكد من أن حمولة JWT الخاصة بك تتضمن هذه الحقول، ككائن (object)، إذا كنت تنوي إجراء هذه الفحوصات أثناء التحقق.

## أنواع أخطاء مخصصة

يُعرّف هذا الوحدة أيضًا أنواع أخطاء مخصصة للتعامل مع الأخطاء المتعلقة بـ JWT.

- `JwtAlgorithmNotImplemented`: يشير إلى أن خوارزمية JWT المطلوبة غير مُنفَّذة.
- `JwtTokenInvalid`: يشير إلى أن رمز JWT غير صالح.
- `JwtTokenNotBefore`: يشير إلى أن الرمز المميز (token) يُستخدم قبل تاريخ صلاحيته.
- `JwtTokenExpired`: يشير إلى أن الرمز (token) قد انتهت صلاحيته.
- `JwtTokenIssuedAt`: يشير إلى أن ادّعاء "iat" في الرمز (token) غير صحيح.
- `JwtTokenIssuer`: يشير إلى أن ادّعاء "iss" في الرمز (token) غير صحيح.
- `JwtPayloadRequiresAud`: يشير إلى أن `aud` المطالبة مطلوبة عندما `aud` تم تكوين التحقق.
- `JwtTokenAudience`: يشير إلى أن `aud` لا يطابق الجمهور (audience) المتوقّع.
- `JwtTokenSignatureMismatched`: يشير إلى عدم تطابق التوقيع في الرمز.

## AlgorithmTypes المدعومة

يدعم هذا الوحدة خوارزميات التشفير التالية الخاصة بـ JWT (JSON Web Token):

- `HS256`: HMAC باستخدام SHA-256
- `HS384`: HMAC باستخدام SHA-384
- `HS512`: HMAC باستخدام SHA-512
- `RS256`: RSASSA-PKCS1-v1_5 باستخدام SHA-256
- `RS384`: RSASSA-PKCS1-v1_5 باستخدام SHA-384
- `RS512`: RSASSA-PKCS1-v1_5 باستخدام SHA-512
- `PS256`: RSASSA-PSS using SHA-256 and MGF1 with SHA-256
- `PS384`: RSASSA-PSS using SHA-386 and MGF1 with SHA-386
- `PS512`: RSASSA-PSS using SHA-512 and MGF1 with SHA-512
- `ES256`: ECDSA باستخدام P-256 وSHA-256
- `ES384`: ECDSA باستخدام P-384 وSHA-384
- `ES512`: ECDSA باستخدام P-521 وSHA-512
- `EdDSA`: EdDSA باستخدام Ed25519
