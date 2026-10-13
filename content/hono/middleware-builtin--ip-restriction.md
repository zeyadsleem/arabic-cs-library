---
title: "وسيط تقييد IP"
book: hono
chapter: middleware-builtin
slug: ip-restriction
order: 38
source: https://hono.dev/docs/middleware/builtin/ip-restriction
lang: ar
---

وسيطة تقييد IP (IP Restriction Middleware) هي وسيطة تحد من الوصول إلى الموارد بناءً على عنوان IP الخاص بالمستخدم.

## Import

```ts
import { Hono } from 'hono'
import { ipRestriction } from 'hono/ip-restriction'
```

## الاستخدام

لتطبيقك الذي يعمل على Bun، إذا كنت تريد السماح بالوصول من المحلي (localhost) فقط، يمكنك كتابته كما يلي. حدد القواعد التي تريد رفضها في `denyList` والقواعد التي تريد السماح بها في `allowList`.

```ts
import { Hono } from 'hono'
import { getConnInfo } from '@hono/bun'
import { ipRestriction } from 'hono/ip-restriction'

const app = new Hono()

app.use(
  '*',
  ipRestriction(getConnInfo, {
    denyList: [],
    allowList: ['127.0.0.1', '::1'],
  })
)

app.get('/', (c) => c.text('Hello Hono!'))
```

مرِّر `getConninfo` من [مُساعد ConnInfo](https://hono.dev/docs/helpers/conninfo) المناسب لبيئتك كوسيط أول لـ `ipRestriction`. على سبيل المثال، لـ Deno، سيبدو هكذا:

```ts
import { getConnInfo } from '@hono/deno'
import { ipRestriction } from 'hono/ip-restriction'

//...

app.use(
  '*',
  ipRestriction(getConnInfo, {
    // ...
  })
)
```

## القواعد

اتّبع التعليمات أدناه لكتابة القواعد.

### IPv4

- `192.168.2.0` - عنوان IP ثابت
- `192.168.2.0/24` - تدوين CIDR
- `*` - جميع العناوين

### IPv6

- `::1` - عنوان IP ثابت
- `::1/10` - تدوين CIDR
- `*` - جميع العناوين

## معالجة الأخطاء

لتخصيص الخطأ، أرجِع `Response` في الوسيط الثالث.

```ts
app.use(
  '*',
  ipRestriction(
    getConnInfo,
    {
      denyList: ['192.168.2.0/24'],
    },
    async (remote, c) => {
      return c.text(`Blocking access from ${remote.addr}`, 403)
    }
  )
)
```
