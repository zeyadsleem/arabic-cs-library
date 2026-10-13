---
title: "مُساعد ConnInfo"
book: hono
chapter: helpers
slug: conninfo
order: 56
source: https://hono.dev/docs/helpers/conninfo
lang: ar
---

يساعدك ConnInfo Helper في الحصول على معلومات الاتصال. على سبيل المثال، يمكنك الحصول على العنوان البعيد (remote address) للعميل بسهولة.

## Import

محوّل كل بيئة تشغيل حزمة منفصلة (`@hono/cloudflare-workers`, `@hono/deno`, `@hono/bun`، ...). ثبّت الواحد المناسب لبيئة تشغيلك.


```ts [Cloudflare Workers]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/cloudflare-workers'
```

```ts [Deno]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/deno'
```

```ts [Bun]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/bun'
```

```ts [Vercel]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/vercel'
```

```ts [AWS Lambda]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/aws-lambda'
```

```ts [Netlify]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/netlify'
```

```ts [Lambda@Edge]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/lambda-edge'
```

```ts [Node.js]
import { Hono } from 'hono'
import { getConnInfo } from '@hono/node-server/conninfo'
```


## الاستخدام

```ts
const app = new Hono()

app.get('/', (c) => {
  const info = getConnInfo(c) // info is `ConnInfo`
  return c.text(`Your remote address is ${info.remote.address}`)
})
```

## تعريفات الأنواع

تعريفات أنواع القيم التي يمكنك الحصول عليها من `getConnInfo()` هي التالية:

```ts
type AddressType = 'IPv6' | 'IPv4' | undefined

type NetAddrInfo = {
  /**
   * Transport protocol type
   */
  transport?: 'tcp' | 'udp'
  /**
   * Transport port number
   */
  port?: number

  address?: string
  addressType?: AddressType
} & (
  | {
      /**
       * Host name such as IP Addr
       */
      address: string

      /**
       * Host name type
       */
      addressType: AddressType
    }
  | {}
)

/**
 * HTTP Connection information
 */
interface ConnInfo {
  /**
   * Remote information
   */
  remote: NetAddrInfo
}
```
