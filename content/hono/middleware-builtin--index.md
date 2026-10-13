---
title: "البرمجية الوسيطة Basic Auth"
book: hono
chapter: middleware-builtin
slug: index
order: 28
source: https://hono.dev/docs/middleware/builtin/basic-auth
lang: ar
---

يمكن لهذا الوسيط (middleware) تطبيق المصادقة الأساسية (Basic authentication) على مسار محدد.
تنفيذ المصادقة الأساسية (Basic authentication) مع Cloudflare Workers أو منصات أخرى أكثر تعقيدًا مما يبدو، لكن مع هذا الوسيط، يصبح الأمر سهلاً للغاية.

لمزيد من المعلومات حول كيفية عمل مخطط المصادقة الأساسية (Basic auth) داخليًا، راجع [وثائق MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#basic_authentication_scheme).

## Import

```ts
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
```

## الاستخدام

```ts
const app = new Hono()

app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

app.get('/auth/page', (c) => {
  return c.text('You are authorized')
})
```

للاقتصار على مسار + طريقة محددة:

```ts
const app = new Hono()

app.get('/auth/page', (c) => {
  return c.text('Viewing page')
})

app.delete(
  '/auth/page',
  basicAuth({ username: 'hono', password: 'acoolproject' }),
  (c) => {
    return c.text('Page deleted')
  }
)
```

إذا أردت التحقق من المستخدم بنفسك، فحدِّد `verifyUser` خيار؛ إرجاع `true` يعني أنه مقبول.

```ts
const app = new Hono()

app.use(
  basicAuth({
    verifyUser: (username, password, c) => {
      return (
        username === 'dynamic-user' && password === 'hono-password'
      )
    },
  })
)
```

## الخيارات

### <Badge type="danger" text="required" /> اسم المستخدم: `string`

اسم المستخدم للمستخدم الذي يقوم بالمصادقة.

### <Badge type="danger" text="required" /> كلمة المرور: `string`

قيمة كلمة المرور الخاصة باسم المستخدم المُقدَّم للمصادقة ضده.

### <Badge type="info" text="optional" /> realm: `string`

اسم نطاق المجال (realm)، كجزء من ترويسة التحدي WWW-Authenticate المرتجعة. الافتراضي هو `"Secure Area"`.  
اعرف المزيد: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate#directives

### <Badge type="info" text="optional" /> `hashFunction`: `Function`

دالة للتعامل مع التجزئة (hashing) للمقارنة الآمنة لكلمات المرور.

### <Badge type="info" text="optional" /> `verifyUser`: `(username: string, password: string, c: Context) => boolean | Promise<boolean>`

الدالة للتحقق من المستخدم.

### <Badge type="info" text="optional" /> invalidUserMessage: `string | object | MessageFunction`

`MessageFunction` هو `(c: Context) => string | object | Promise<string | object>`. الرسالة المخصّصة إذا كان المستخدم غير صالح.

### <Badge type="info" text="optional" /> `onAuthSuccess`: `(c: Context, username: string) => void | Promise<void>`

دالة استدعاء (callback) تُستدعى بعد المصادقة الناجحة. يتيح لك هذا تعيين متغيرات السياق أو تنفيذ تأثيرات جانبية دون إعادة تحليل ترويسة Authorization.

```ts
app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
    onAuthSuccess: (c, username) => {
      c.set('username', username)
    },
  })
)

app.get('/auth/page', (c) => {
  const username = c.get('username')
  return c.text(`Hello, ${username}!`)
})
```

## مزيد من الخيارات

### <Badge type="info" text="optional" /> ...users: `{ username: string, password: string }[]`

## وصفات

### تعريف مستخدمين متعددين

تتيح لك هذه الوسيطة أيضًا تمرير معاملات عشوائية تحتوي على كائنات تحدد المزيد `username` و `password` أزواج.

```ts
app.use(
  '/auth/*',
  basicAuth(
    {
      username: 'hono',
      password: 'acoolproject',
      // Define other params in the first object
      realm: 'www.example.com',
    },
    {
      username: 'hono-admin',
      password: 'super-secure',
      // Cannot redefine other params here
    },
    {
      username: 'hono-user-1',
      password: 'a-secret',
      // Or here
    }
  )
)
```

أو بترميز صلب أقل:

```ts
import { users } from '../config/users'

app.use(
  '/auth/*',
  basicAuth(
    {
      realm: 'www.example.com',
      ...users[0],
    },
    ...users.slice(1)
  )
)
```
