---
title: "Hono"
book: hono
chapter: getting-started
slug: index
order: 0
source: https://hono.dev/docs/index
lang: ar
---

---
title: Hono - إطار ويب مبني على معايير الويب
titleTemplate: ':title'
---

# Hono

Hono - _**تعني اللهب 🔥 باليابانية**_ - هو إطار عمل ويب صغير وبسيط وفائق السرعة مبني على معايير الويب.
يعمل على أي وقت تشغيل JavaScript: Cloudflare Workers، Fastly Compute، Deno، Bun، Vercel، Netlify، AWS Lambda، Lambda@Edge، و Node.js.

سريع، وليس سريعًا فحسب.

```ts twoslash
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

export default app
```

## البدء السريع

شغّل هذا فقط:


```sh [npm]
npm create hono@latest
```

```sh [yarn]
yarn create hono
```

```sh [pnpm]
pnpm create hono@latest
```

```sh [bun]
bun create hono@latest
```

```sh [deno]
deno init --npm hono@latest
```


## الميزات

- **فائق السرعة** 🚀 - الموجّه `RegExpRouter` سريع حقًا. لا يستخدم حلقات خطية. سريع.
- **خفيف** 🪶 - الـ `hono/tiny` القالب الجاهز (preset) أقل من 14kB. لا يمتلك Hono أي تبعيات (dependencies) ولا يستخدم سوى معايير الويب.
- **متعدد أوقات التشغيل (Multi-runtime)** 🌍 - يعمل على Cloudflare Workers و Fastly Compute و Deno و Bun و AWS Lambda أو Node.js. نفس الكود يعمل على جميع المنصات.
- **بطاريات مشمولة (Batteries Included)** 🔋 - يمتلك Hono وسائط مدمجة ووسائط مخصصة ووسائط خارجية وأدوات مساعدة. كل شيء مشمول.
- **تجربة مطور ممتعة (DX)** 😃 - واجهات API نظيفة للغاية. دعم TypeScript من الدرجة الأولى. الآن، لدينا "الأنواع".

## حالات الاستخدام

Hono هو إطار عمل بسيط لتطبيقات الويب يشبه Express، دون واجهة أمامية (frontend).
لكنه يعمل على حواف CDN (CDN Edges) ويتيح لك بناء تطبيقات أكبر عند دمجه مع الوسائط.
فيما يلي بعض الأمثلة على حالات الاستخدام.

- بناء واجهات برمجة تطبيقات الويب
- وكيل لخوادم الواجهة الخلفية
- أمام CDN
- تطبيق Edge
- خادم أساسي لمكتبة
- تطبيق متكامل (full-stack)

## من يستخدم Hono؟

| المشروع (Project) | المنصة (Platform) | الغرض (What for?) |
| ---------------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| [cdnjs](https://cdnjs.com)                                                         | Cloudflare Workers | خدمة CDN مجانية ومفتوحة المصدر. _يُستخدم Hono لخادم API_. |
| [`Cloudflare D1`](https://www.cloudflare.com/developer-platform/d1/)                 | Cloudflare Workers | قواعد بيانات SQL بدون خادم (Serverless). _يُستخدم Hono لخادم API الداخلي_. |
| [Cloudflare Workers KV](https://www.cloudflare.com/developer-platform/workers-kv/) | Cloudflare Workers | قاعدة بيانات قيم-مفاتيح بدون خادم (key-value). _يُستخدم Hono لخادم API الداخلي_. |
| [BaseAI](https://baseai.dev)                                                       | Local AI Server    | خطوط أنابيب (pipes) لوكيل AI بدون خادم مع ذاكرة. إطار عمل وكلاء AI مفتوح المصدر للويب. _خادم API مع Hono_. |
| [Unkey](https://unkey.dev)                                                         | Cloudflare Workers | مصادقة وتفويض (authentication and authorization) مفتوح المصدر لواجهات API. _يُستخدم Hono لخادم API_. |
| [OpenStatus](https://openstatus.dev)                                               | Bun                | منصة مراقبة مواقع وواجهات API مفتوحة المصدر. _يُستخدم Hono لخادم API_. |
| [اختبارات أداء Deno](https://deno.com/benchmarks)                                     | Deno               | وقت تشغيل TypeScript آمن مبني على V8. _يُستخدم Hono للقياس (benchmarking)_. |
| [Clerk](https://clerk.com)                                                         | Cloudflare Workers | منصة إدارة مستخدمين مفتوحة المصدر. _يُستخدم Hono لخادم API_. |
| [PostHog](https://posthog.com)                                                     | Node.js            | المنصة مفتوحة المصدر لبناء منتجات ذاتية القيادة. _يُستخدم Hono لخادم MCP_. |

وما يلي.

- [Drivly](https://driv.ly/) - Cloudflare Workers
- [repeat.dev](https://repeat.dev/) - Cloudflare Workers

هل تريد رؤية المزيد؟ انظر [من يستخدم Hono في بيئة الإنتاج؟](https://github.com/orgs/honojs/discussions/1510).

## Hono في دقيقة واحدة

عرض توضيحي لإنشاء تطبيق لـ Cloudflare Workers باستخدام Hono.

![صورة متحركة (gif) تُظهر إنشاء تطبيق hono بسرعة مع تكرار سريع.](/images/hono/sc.gif)

## فائق السرعة

**Hono هو الأسرع**، مقارنةً بالموجّهات (routers) الأخرى لـ Cloudflare Workers.

```
Hono x 402,820 ops/sec ±4.78% (80 runs sampled)
itty-router x 212,598 ops/sec ±3.11% (87 runs sampled)
sunder x 297,036 ops/sec ±4.76% (77 runs sampled)
worktop x 197,345 ops/sec ±2.40% (88 runs sampled)
Fastest is Hono
✨  Done in 28.06s.
```

انظر [المزيد من اختبارات الأداء](https://hono.dev/docs/concepts/benchmarks).

## خفيف الوزن

**Hono صغير جدًا**. مع `hono/tiny` الإعداد المسبق (preset)، حجمه **أقل من 14KB** عند التصغير (minified). هناك العديد من الوسائط والمحولات (adapters)، لكنها تُدمج في الحزمة فقط عند استخدامها. للسياق، حجم Express هو 572KB.

```
$ npx wrangler dev --minify ./src/index.ts
 ⛅️ wrangler 2.20.0
--------------------
⬣ Listening at http://0.0.0.0:8787
- http://127.0.0.1:8787
- http://192.168.128.165:8787
Total Upload: 11.47 KiB / gzip: 4.34 KiB
```

## موجّهات متعددة

**لدى Hono عدة موجّهات**.

**RegExpRouter** هو أسرع موجه (router) في عالم JavaScript. يطابق المسار باستخدام Regex كبير واحد يُنشأ قبل التوزيع (dispatch). مع **SmartRouter**، يدعم جميع أنماط المسارات.

**LinearRouter** يسجل المسارات بسرعة كبيرة، لذا فهو مناسب لبيئة تهيئ التطبيقات في كل مرة. **PatternRouter** ببساطة يضيف النمط ويطابقه، مما يجعله صغيرًا.

انظر [مزيد من المعلومات حول المسارات](https://hono.dev/docs/concepts/routers).

## معايير الويب

بفضل استخدام **معايير الويب (Web Standards)**، يعمل Hono على الكثير من المنصات.

- Cloudflare Workers
- Fastly Compute
- Deno
- Bun
- Vercel
- AWS Lambda
- Lambda@Edge
- أخرى

وباستخدام [مُهايئ Node.js](https://github.com/honojs/node-server)، يعمل Hono على Node.js.

انظر [مزيد من المعلومات حول معايير الويب (Web Standards)](https://hono.dev/docs/concepts/web-standard).

## البرمجيات الوسيطة والمساعدات

**يمتلك Hono العديد من الوسائط (middleware) والأدوات المساعدة**. وهذا يجعل "اكتب أقل، أنجز أكثر" حقيقة واقعة.

من دون إعداد إضافي، يوفّر Hono وسيطات (middleware) ومساعدات (helpers) لـ:

- [المصادقة الأساسية](https://hono.dev/docs/middleware/builtin/basic-auth)
- [مصادقة Bearer](https://hono.dev/docs/middleware/builtin/bearer-auth)
- [حدّ حجم الجسم (Body Limit)](https://hono.dev/docs/middleware/builtin/body-limit)
- [التخزين المؤقت](https://hono.dev/docs/middleware/builtin/cache)
- [الضغط (Compress)](https://hono.dev/docs/middleware/builtin/compress)
- [تخزين السياق](https://hono.dev/docs/middleware/builtin/context-storage)
- [Cookie](https://hono.dev/docs/helpers/cookie)
- [CORS](https://hono.dev/docs/middleware/builtin/cors)
- [ETag](https://hono.dev/docs/middleware/builtin/etag)
- [html](https://hono.dev/docs/helpers/html)
- [`JSX`](https://hono.dev/docs/guides/jsx)
- [مصادقة JWT](https://hono.dev/docs/middleware/builtin/jwt)
- [Logger](https://hono.dev/docs/middleware/builtin/logger)
- [اللغة](https://hono.dev/docs/middleware/builtin/language)
- [JSON مُنسَّق (Pretty JSON)](https://hono.dev/docs/middleware/builtin/pretty-json)
- [الترويسات الآمنة](https://hono.dev/docs/middleware/builtin/secure-headers)
- [`SSG`](https://hono.dev/docs/helpers/ssg)
- [البث](https://hono.dev/docs/helpers/streaming)
- [خادم `GraphQL`](https://github.com/honojs/middleware/tree/main/packages/graphql-server)
- [مصادقة Firebase](https://github.com/honojs/middleware/tree/main/packages/firebase-auth)
- [Sentry](https://github.com/honojs/middleware/tree/main/packages/sentry)
- أخرى!

على سبيل المثال، إضافة ETag وتسجيل الطلبات لا يتطلب سوى بضعة أسطر من الكود باستخدام Hono:

```ts
import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'

const app = new Hono()
app.use(etag(), logger())
```

انظر [مزيد من المعلومات حول البرمجيات الوسيطة (Middleware)](https://hono.dev/docs/concepts/middleware).

## تجربة المطوّر

يوفّر Hono "**تجربة مطوّر**" (Developer Experience) ممتعة.

وصول سهل إلى Request/Response بفضل `Context` كائن.
علاوةً على ذلك، Hono مكتوب بـ TypeScript. يمتلك Hono "**أنواعاً**" (Types).

على سبيل المثال، ستكون معاملات المسار (path parameters) من أنواع حرفية (literal types).

![لقطة شاشة تُظهر Hono بكتابة حرفية (literal typing) صحيحة عند معاملات URL. يسمح عنوان URL "/entry/:date/:id" بأن تكون معاملات الطلب "date" أو "id"](/images/hono/ss.png)

و، المدقّق (Validator) وعميل Hono `hc` تفعيل وضع RPC. في وضع RPC،
يمكنك استخدام أداة التحقق (validator) المفضلة لديك مثل Zod ومشاركة مواصفات واجهة API من جانب الخادم مع العميل بسهولة وبناء تطبيقات آمنة من حيث الأنواع (type-safe).

انظر [Hono Stacks](https://hono.dev/docs/concepts/stacks).
