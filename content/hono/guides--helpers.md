---
title: "المساعدات"
book: hono
chapter: guides
slug: helpers
order: 73
source: https://hono.dev/docs/guides/helpers
lang: ar
---

تتوفر أدوات مساعدة (Helpers) للمساعدة في تطوير تطبيقك. على عكس الوسائط (middleware)، فهي لا تعمل كمعالجات، بل توفر دوالًا مفيدة.

على سبيل المثال، إليك كيفية استخدام [مساعد `Cookie`](https://hono.dev/docs/helpers/cookie):

```ts
import { getCookie, setCookie } from 'hono/cookie'

const app = new Hono()

app.get('/cookie', (c) => {
  const yummyCookie = getCookie(c, 'yummy_cookie')
  // ...
  setCookie(c, 'delicious_cookie', 'macha')
  //
})
```

## المساعدات المتاحة

- [يقبل](https://hono.dev/docs/helpers/accepts)
- [المهايئ](https://hono.dev/docs/helpers/adapter)
- [Cookie](https://hono.dev/docs/helpers/cookie)
- [`css`](https://hono.dev/docs/helpers/css)
- [`Dev`](https://hono.dev/docs/helpers/dev)
- [المصنع](https://hono.dev/docs/helpers/factory)
- [html](https://hono.dev/docs/helpers/html)
- [`JWT`](https://hono.dev/docs/helpers/jwt)
- [`SSG`](https://hono.dev/docs/helpers/ssg)
- [البث](https://hono.dev/docs/helpers/streaming)
- [الاختبار](https://hono.dev/docs/helpers/testing)
- [WebSocket](https://hono.dev/docs/helpers/websocket)
