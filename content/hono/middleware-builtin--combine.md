---
title: "دمج البرمجيات الوسيطة"
book: hono
chapter: middleware-builtin
slug: combine
order: 32
source: https://hono.dev/docs/middleware/builtin/combine
lang: ar
---

يجمع وسيط Combine الدوال الوسيطة المتعددة في وسيط واحد. يوفر ثلاث دوال:

- `some` - يشغّل واحدة فقط من البرمجيات الوسيطة المُعطاة.
- `every` - تشغيل كل الوسيطات المعطاة.
- `except` - يشغِّل كل الوسيطات (middleware) المعطاة فقط إذا لم يتحقق شرط.

## Import

```ts
import { Hono } from 'hono'
import { some, every, except } from 'hono/combine'
```

## الاستخدام

فيما يلي مثال على قواعد معقدة للتحكم في الوصول باستخدام وسيط الدمج (Combine Middleware).

```ts
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { getConnInfo } from '@hono/cloudflare-workers'
import { every, some } from 'hono/combine'
import { ipRestriction } from 'hono/ip-restriction'
import { rateLimit } from '@/my-rate-limit'

const app = new Hono()

app.use(
  '*',
  some(
    every(
      ipRestriction(getConnInfo, { allowList: ['192.168.0.2'] }),
      bearerAuth({ token })
    ),
    // If both conditions are met, rateLimit will not execute.
    rateLimit()
  )
)

app.get('/', (c) => c.text('Hello Hono!'))
```

### بعض

يشغّل أول وسيط يُرجع true. تُطبق الوسائط بالترتيب، وإذا نجح أي وسيط، فلن تعمل الوسائط اللاحقة.

```ts
import { some } from 'hono/combine'
import { bearerAuth } from 'hono/bearer-auth'
import { myRateLimit } from '@/rate-limit'

// If client has a valid token, skip rate limiting.
// Otherwise, apply rate limiting.
app.use(
  '/api/*',
  some(bearerAuth({ token }), myRateLimit({ limit: 100 }))
)
```

### every

يشغّل جميع الوسائط ويتوقف إذا فشل أي منها. تُطبق الوسائط بالترتيب، وإذا رمى أي وسيط خطأً، فلن تعمل الوسائط اللاحقة.

```ts
import { some, every } from 'hono/combine'
import { bearerAuth } from 'hono/bearer-auth'
import { myCheckLocalNetwork } from '@/check-local-network'
import { myRateLimit } from '@/rate-limit'

// If client is in local network, skip authentication and rate limiting.
// Otherwise, apply authentication and rate limiting.
app.use(
  '/api/*',
  some(
    myCheckLocalNetwork(),
    every(bearerAuth({ token }), myRateLimit({ limit: 100 }))
  )
)
```

### except

يشغّل جميع الوسائط إلا عند تحقق الشرط. يمكنك تمرير سلسلة (string) أو دالة كشرط. إذا كانت هناك حاجة لمطابقة أهداف متعددة، مررها كمصفوفة (array).

```ts
import { except } from 'hono/combine'
import { bearerAuth } from 'hono/bearer-auth'

// If client is accessing public API, skip authentication.
// Otherwise, require a valid token.
app.use('/api/*', except('/api/public/*', bearerAuth({ token })))
```
