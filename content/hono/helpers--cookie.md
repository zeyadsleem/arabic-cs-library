---
title: "مساعد `Cookie`"
book: hono
chapter: helpers
slug: cookie
order: 57
source: https://hono.dev/docs/helpers/cookie
lang: ar
---

يوفر Cookie Helper واجهة سهلة لإدارة ملفات تعريف الارتباط، مما يتيح للمطورين تعيين وتحليل وحذف ملفات تعريف الارتباط بسلاسة.

## Import

```ts
import { Hono } from 'hono'
import {
  deleteCookie,
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  generateCookie,
  generateSignedCookie,
} from 'hono/cookie'
```

## الاستخدام

### ملفات تعريف ارتباط عادية

```ts
app.get('/cookie', (c) => {
  setCookie(c, 'cookie_name', 'cookie_value')
  const yummyCookie = getCookie(c, 'cookie_name')
  deleteCookie(c, 'cookie_name')
  const allCookies = getCookie(c)
  // ...
})
```

### ملفات تعريف ارتباط موقّعة

**ملاحظة**: تعيين واسترجاع ملفات تعريف الارتباط الموقعة يُرجع وعدًا (Promise) بسبب الطبيعة غير المتزامنة لـ WebCrypto API، المستخدمة لإنشاء توقيعات HMAC SHA-256.

```ts
app.get('/signed-cookie', (c) => {
  const secret = 'secret' // make sure it's a large enough string to be secure

  await setSignedCookie(c, 'cookie_name0', 'cookie_value', secret)
  const fortuneCookie = await getSignedCookie(
    c,
    secret,
    'cookie_name0'
  )
  deleteCookie(c, 'cookie_name0')
  // `getSignedCookie` will return `false` for a specified cookie if its signature fails verification
  const allSignedCookies = await getSignedCookie(c, secret)
  // ...
})
```

> [!NOTE]
> `getSignedCookie` يميّز بين حالتين. ملف تعريف الارتباط (cookie) الذي يحمل توقيعًا لكنه يفشل في التحقق يعيد `false`. يتم التعامل مع ملف تعريف الارتباط (cookie) الذي لا يمتلك تنسيق توقيع صالحًا على أنه ليس ملف تعريف ارتباط موقّعًا أصلًا، ويُرجع `undefined` — تمامًا كما هو الحال عندما لا يكون ملف تعريف الارتباط موجودًا. تنطبق هذه القاعدة عند استرجاع ملف تعريف ارتباط واحد بالاسم وعند استرجاع جميع ملفات تعريف الارتباط الموقعة. نظرًا لأن كليهما `false` و `undefined` قيم falsy، `if (!value)` يتعامل مع كلتا الحالتين.

### إنشاء ملفات تعريف الارتباط

`generateCookie` و `generateSignedCookie` تتيح لك الدوال إنشاء سلاسل ملفات تعريف الارتباط مباشرة دون تعيينها في ترويسات الاستجابة.

#### `generateCookie`

```ts
// Basic cookie generation
const cookie = generateCookie('delicious_cookie', 'macha')
// Returns: 'delicious_cookie=macha; Path=/'

// Cookie with options
const cookie = generateCookie('delicious_cookie', 'macha', {
  path: '/',
  secure: true,
  httpOnly: true,
  domain: 'example.com',
})
```

#### `generateSignedCookie`

```ts
// Basic signed cookie generation
const signedCookie = await generateSignedCookie(
  'delicious_cookie',
  'macha',
  'secret chocolate chips'
)

// Signed cookie with options
const signedCookie = await generateSignedCookie(
  'delicious_cookie',
  'macha',
  'secret chocolate chips',
  {
    path: '/',
    secure: true,
    httpOnly: true,
  }
)
```

**ملاحظة**: على عكس `setCookie` و `setSignedCookie`، تعمل هذه الدوال فقط على توليد سلاسل ملفات تعريف الارتباط. تحتاج إلى تعيينها يدويًا في الترويسات إذا لزم الأمر.

## الخيارات

### `setCookie` & `setSignedCookie`

- domain: `string`
- expires: `Date`
- httpOnly: `boolean`
- maxAge: `number`
- path: `string`
- secure: `boolean`
- sameSite: `'Strict'` | `'Lax'` | `'None'`
- priority: `'Low' | 'Medium' | 'High'`
- prefix: `secure` | `'host'`
- partitioned: `boolean`

مثال:

```ts
// Regular cookies
setCookie(c, 'great_cookie', 'banana', {
  path: '/',
  secure: true,
  domain: 'example.com',
  httpOnly: true,
  maxAge: 1000,
  expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
  sameSite: 'Strict',
})

// Signed cookies
await setSignedCookie(
  c,
  'fortune_cookie',
  'lots-of-money',
  'secret ingredient',
  {
    path: '/',
    secure: true,
    domain: 'example.com',
    httpOnly: true,
    maxAge: 1000,
    expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
    sameSite: 'Strict',
  }
)
```

### `deleteCookie`

- path: `string`
- secure: `boolean`
- domain: `string`

مثال:

```ts
deleteCookie(c, 'banana', {
  path: '/',
  secure: true,
  domain: 'example.com',
})
```

`deleteCookie` تُعيد القيمة المحذوفة:

```ts
const deletedCookie = deleteCookie(c, 'delicious_cookie')
```

## `__Secure-` و `__Host-` بادئة

يدعم مساعد الكوكيز (Cookie) `__Secure-` و `__Host-` بادئات لأسماء الكوكيز.

إذا كنت تريد التحقق مما إذا كان اسم ملف تعريف الارتباط (cookie) يحتوي على بادئة، فحدد خيار البادئة (prefix).

```ts
const securePrefixCookie = getCookie(c, 'yummy_cookie', 'secure')
const hostPrefixCookie = getCookie(c, 'yummy_cookie', 'host')

const securePrefixSignedCookie = await getSignedCookie(
  c,
  secret,
  'fortune_cookie',
  'secure'
)
const hostPrefixSignedCookie = await getSignedCookie(
  c,
  secret,
  'fortune_cookie',
  'host'
)
```

أيضًا، إذا كنت ترغب في تحديد بادئة عند تعيين ملف تعريف الارتباط، فحدد قيمة لخيار البادئة (prefix).

```ts
setCookie(c, 'delicious_cookie', 'macha', {
  prefix: 'secure', // or `host`
})

await setSignedCookie(
  c,
  'delicious_cookie',
  'macha',
  'secret choco chips',
  {
    prefix: 'secure', // or `host`
  }
)
```

## اتباع أفضل الممارسات

تتضمن مواصفة RFC الجديدة لملفات تعريف الارتباط (المعروفة باسم cookie-bis) و CHIPS بعض أفضل الممارسات لإعدادات ملفات تعريف الارتباط (cookies) التي يجب على المطورين اتباعها.

- [`RFC6265bis-13`](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-13)
  - `Max-Age`/`Expires` قيد
  - `__Host-`/`__Secure-` قيد البادئة
- [CHIPS-01](https://www.ietf.org/archive/id/draft-cutler-httpbis-partitioned-cookies-01.html)
  - `Partitioned` قيد

يتبع Hono أفضل الممارسات.
سيرفع مساعد الكوكي `Error` عند تحليل الكوكيز تحت الشروط التالية:

- يبدأ اسم الكوكي بـ `__Secure-`، لكن `secure` لم يتم ضبط الخيار.
- يبدأ اسم الكوكي بـ `__Host-`، لكن `secure` لم يتم ضبط الخيار.
- يبدأ اسم الكوكي بـ `__Host-`، لكن `path` ليس `/`.
- يبدأ اسم الكوكي بـ `__Host-`، لكن `domain` مُعيّن.
- ال `maxAge` قيمة الخيار أكبر من 400 يوم.
- ال `expires` قيمة الخيار تكون بعد 400 يوم من الوقت الحالي.
