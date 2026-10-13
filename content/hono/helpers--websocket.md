---
title: "مُساعد WebSocket"
book: hono
chapter: helpers
slug: websocket
order: 68
source: https://hono.dev/docs/helpers/websocket
lang: ar
---

مساعد WebSocket (WebSocket Helper) هو أداة مساعدة لـ WebSockets من جانب الخادم في تطبيقات Hono.
تتوفر حاليًا محولات (adapters) لـ Cloudflare Workers / Pages و Deno و Bun و Node.js.

## Import

محوّل كل بيئة تشغيل حزمة منفصلة (`@hono/cloudflare-workers`, `@hono/deno`, `@hono/bun`، ...). ثبّت الواحد المناسب لبيئة تشغيلك.


```ts [Cloudflare Workers]
import { Hono } from 'hono'
import { upgradeWebSocket } from '@hono/cloudflare-workers'
```

```ts [Deno]
import { Hono } from 'hono'
import { upgradeWebSocket } from '@hono/deno'
```

```ts [Bun]
import { Hono } from 'hono'
import { upgradeWebSocket, websocket } from '@hono/bun'

// ...

export default {
  fetch: app.fetch,
  websocket,
}
```

```ts [Node.js]
import { serve, upgradeWebSocket } from '@hono/node-server'
import { Hono } from 'hono'
import { WebSocketServer } from 'ws'
```


على Node.js، دعم WebSocket مدمج في `@hono/node-server`. لتفعيله، ثبّت `ws` وإذا كنت تستخدم TypeScript، `@types/ws`. ثم أنشئ `WebSocketServer` مع `{ noServer: true }` وتمريره إلى `serve()` عبر `websocket` خيار.

`@hono/node-ws` مهمَل.

## `upgradeWebSocket()`

`upgradeWebSocket()` يُعيد معالجًا لمعالجة WebSocket.

```ts
const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`)
        ws.send('Hello from server!')
      },
      onClose: () => {
        console.log('Connection closed')
      },
    }
  })
)
```

الأحداث المتاحة:

- `onOpen` - حاليًا، لا يدعمه Cloudflare Workers.
- `onMessage`
- `onClose`
- `onError`


إذا استخدمت وسيطًا يعدل الترويسات (مثل تطبيق CORS) على مسار يستخدم WebSocket Helper، فقد تواجه خطأً يفيد بأنه لا يمكنك تعديل الترويسات غير القابلة للتغيير (immutable headers). هذا لأن `upgradeWebSocket()` يغيّر أيضًا الترويسات داخليًا.

لذلك، يرجى توخي الحذر إذا كنت تستخدم أداة WebSocket المساعدة والوسائط في الوقت نفسه.


## RPC-mode

المعالجات (Handlers) المعرَّفة باستخدام WebSocket Helper تدعم وضع RPC.

```ts
// server.ts
const wsApp = app.get(
  '/ws',
  upgradeWebSocket((c) => {
    //...
  })
)

export type WebSocketApp = typeof wsApp

// client.ts
const client = hc<WebSocketApp>('http://localhost:8787')
const socket = client.ws.$ws() // A WebSocket object for a client
```

## أمثلة

اطّلع على الأمثلة التي تستخدم WebSocket Helper.

### الخادم والعميل

```ts
// server.ts
import { Hono } from 'hono'
import { upgradeWebSocket } from '@hono/cloudflare-workers'

const app = new Hono().get(
  '/ws',
  upgradeWebSocket(() => {
    return {
      onMessage: (event) => {
        console.log(event.data)
      },
    }
  })
)

export default app
```

```ts
// client.ts
import { hc } from 'hono/client'
import type app from './server'

const client = hc<typeof app>('http://localhost:8787')
const ws = client.ws.$ws(0)

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send(new Date().toString())
  }, 1000)
})
```

### Bun مع JSX

```tsx
import { Hono } from 'hono'
import { upgradeWebSocket, websocket } from '@hono/bun'
import { html } from 'hono/html'

const app = new Hono()

app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <meta charset='UTF-8' />
      </head>
      <body>
        <div id='now-time'></div>
        {html`
          <script>
            const ws = new WebSocket('ws://localhost:3000/ws')
            const $nowTime = document.getElementById('now-time')
            ws.onmessage = (event) => {
              $nowTime.textContent = event.data
            }
          </script>
        `}
      </body>
    </html>
  )
})

const ws = app.get(
  '/ws',
  upgradeWebSocket((c) => {
    let intervalId
    return {
      onOpen(_event, ws) {
        intervalId = setInterval(() => {
          ws.send(new Date().toString())
        }, 200)
      },
      onClose() {
        clearInterval(intervalId)
      },
    }
  })
)

export default {
  fetch: app.fetch,
  websocket,
}
```

### Node.js

```ts
import { serve, upgradeWebSocket } from '@hono/node-server'
import { Hono } from 'hono'
import { WebSocketServer } from 'ws'

const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      ws.send(event.data)
    },
  }))
)

const wss = new WebSocketServer({ noServer: true })

serve({
  fetch: app.fetch,
  websocket: { server: wss },
})
```
