---
title: "برمجيات وسيطة من طرف ثالث"
book: hono
chapter: middleware-third-party
slug: index
order: 53
source: https://hono.dev/docs/middleware/third-party
lang: ar
---

يشير مصطلح الوسائط من طرف ثالث (third-party middleware) إلى الوسائط غير المضمّنة داخل حزمة Hono.
يعتمد معظم هذه الوسيطة (middleware) على مكتبات خارجية.

### المصادقة

- [Auth.js(Next Auth)](https://github.com/honojs/middleware/tree/main/packages/auth-js)
- [Casbin](https://github.com/honojs/middleware/tree/main/packages/casbin)
- [مصادقة Clerk](https://github.com/honojs/middleware/tree/main/packages/clerk-auth)
- [Cloudflare Access](https://github.com/honojs/middleware/tree/main/packages/cloudflare-access)
- [موفرو OAuth](https://github.com/honojs/middleware/tree/main/packages/oauth-providers)
- [مصادقة OIDC](https://github.com/honojs/middleware/tree/main/packages/oidc-auth)
- [`Firebase Auth`](https://github.com/honojs/middleware/tree/main/packages/firebase-auth)
- [التحقق من RSA JWT (JWKS)](https://github.com/wataruoguchi/verify-rsa-jwt-cloudflare-worker)
- [مصادقة SSOJet](https://github.com/ssojet/ssojet-hono)
- [مصادقة Stytch](https://github.com/honojs/middleware/tree/main/packages/stytch-auth)
- [`Shopify Auth`](https://github.com/besart-k/hono-shopify-auth)

### المدققات

- [مدقّق `Ajv`](https://github.com/honojs/middleware/tree/main/packages/ajv-validator)
- [مُدقِّق ArkType](https://github.com/honojs/middleware/tree/main/packages/arktype-validator)
- [مُدقِّق Class](https://github.com/honojs/middleware/tree/main/packages/class-validator)
- [مُدقِّق Conform](https://github.com/honojs/middleware/tree/main/packages/conform-validator)
- [مُحقِّق Effect Schema](https://github.com/honojs/middleware/tree/main/packages/effect-validator)
- [مدقّق Standard Schema](https://github.com/honojs/middleware/tree/main/packages/standard-validator)
- [مُدقِّق TypeBox](https://github.com/honojs/middleware/tree/main/packages/typebox-validator)
- [مُدقِّق Typia](https://github.com/honojs/middleware/tree/main/packages/typia-validator)
- [مُحقِّق unknownutil](https://github.com/ryoppippi/hono-unknownutil-validator)
- [مُدقِّق Valibot](https://github.com/honojs/middleware/tree/main/packages/valibot-validator)
- [مدقّق `Zod`](https://github.com/honojs/middleware/tree/main/packages/zod-validator)

### OpenAPI

- [Zod OpenAPI](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- [Scalar](https://github.com/scalar/scalar/tree/main/integrations/hono)
- [Swagger UI](https://github.com/honojs/middleware/tree/main/packages/swagger-ui)
- [محرّر `Swagger`](https://github.com/honojs/middleware/tree/main/packages/swagger-editor)
- [`Hono OpenAPI`](https://github.com/rhinobase/hono-openapi)
- [hono-zod-openapi](https://github.com/paolostyle/hono-zod-openapi)

### التطوير

- [إعداد `ESLint`](https://github.com/honojs/middleware/tree/main/packages/eslint-config)
- [`hono-testkit`](https://github.com/md-sagban/hono-testkit)
- [إضافة SSG الأساسية](https://github.com/honojs/middleware/tree/main/packages/ssg-plugins-essential)

### المراقبة / التتبع

- [Apitally (مراقبة وتحليلات API)](https://docs.apitally.io/frameworks/hono)
- [`Highlight.io`](https://www.highlight.io/docs/getting-started/backend-sdk/js/hono)
- [LogTape (التسجيل)](https://logtape.org/manual/integrations#hono)
- [`OpenTelemetry`](https://github.com/honojs/middleware/tree/main/packages/otel)
- [مقاييس Prometheus](https://github.com/honojs/middleware/tree/main/packages/prometheus)
- [Sentry](https://github.com/honojs/middleware/tree/main/packages/sentry)
- [مسجِّل Pino](https://github.com/maou-shonen/hono-pino)

### الخادم / المهايئ

- [خادم `GraphQL`](https://github.com/honojs/middleware/tree/main/packages/graphql-server)
- [oRPC](https://orpc.dev/docs/adapters/hono)
- [خادم tRPC](https://github.com/honojs/middleware/tree/main/packages/trpc-server)
- [mcp-use (خادم MCP)](https://github.com/mcp-use/mcp-use)

### المُحوِّل

- [مُحوّل `Bun`](https://github.com/honojs/middleware/tree/main/packages/bun-transpiler)
- [مُحوِّل esbuild](https://github.com/honojs/middleware/tree/main/packages/esbuild-transpiler)

### واجهة المستخدم / العارض

- [Qwik City](https://github.com/honojs/middleware/tree/main/packages/qwik-city)
- [التوافق مع React](https://github.com/honojs/middleware/tree/main/packages/react-compat)
- [مُصيّر `React`](https://github.com/honojs/middleware/tree/main/packages/react-renderer)

### الطابور / معالجة المهام

- [GlideMQ (واجهة REST API لقائمة انتظار الرسائل + SSE)](https://github.com/avifenesh/glidemq-hono)

### التدويل

- [`Intlayer i18n`](https://intlayer.org/doc/environment/hono)

### الأدوات المساعدة

- [`Bun Compress`](https://github.com/honojs/middleware/tree/main/packages/bun-compress)
- [`Cap Checkpoint`](https://capjs.js.org/guide/middleware/hono.html)
- [باعث الأحداث](https://github.com/honojs/middleware/tree/main/packages/event-emitter)
- [`Geo`](https://github.com/ktkongtong/hono-geo-middleware/tree/main/packages/middleware)
- [محدِّد معدّل Hono](https://github.com/rhinobase/hono-rate-limiter)
- [تفاصيل مشاكل Hono (RFC 9457)](https://github.com/paveg/hono-problem-details)
- [`Hono Simple DI`](https://github.com/maou-shonen/hono-simple-DI)
- [InferDI](https://github.com/inferdi/inferdi/tree/main/packages/hono)
- [اللااتّساقية (Idempotency) (مفاتيح idempotency بنمط Stripe)](https://github.com/paveg/hono-idempotency)
- [idempot-js](https://js.idempot.dev) - وسيطة متوافقة مع المواصفات، تدعم عدة خلفيات تخزين (redis و postgres و mysql و sqlite)
- [jsonv-ts (Validator، OpenAPI، MCP)](https://github.com/dswbx/jsonv-ts)
- [`MCP`](https://github.com/honojs/middleware/tree/main/packages/mcp)
- [RONIN (قاعدة بيانات)](https://github.com/ronin-co/hono-client)
- [الجلسة](https://github.com/honojs/middleware/tree/main/packages/session)
- [StitchAPI (نداءات API مُنمّطة ومرنة + SSE)](https://github.com/rejifald/StitchAPI/tree/main/packages/hono)
- [tsyringe](https://github.com/honojs/middleware/tree/main/packages/tsyringe)
- [حاجب قائم على User Agent](https://github.com/honojs/middleware/tree/main/packages/ua-blocker)
