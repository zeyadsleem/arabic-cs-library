---
title: "الترحيل إلى v5"
book: hono
chapter: guides
slug: index
order: 69
source: https://hono.dev/docs/guides/migrating-to-v5
lang: ar
---

يبقي Hono v5 النواة صغيرة وينقل الباقي حولها. تسرد هذه الصفحة التغييرات الجذرية (breaking changes) منذ v4 وكيفية تحديث الكود.

## جرّب الإصدار المرشح

```sh
npm install hono@next
```

## ESM فقط

`hono` يُنشَر كـ ESM فقط. تمت إزالة بنية CommonJS.

على Node.js، يُشترط الإصدار 22.12 أو أحدث. `require('hono')` لا يزال يعمل هناك، لأن Node.js 22.12 يمكنه `require()` وحدات `ES`.

## محوّلات بيئة التشغيل حزم منفصلة

محوّلات بيئة التشغيل (runtime adapters) ضمن `hono/<runtime>` لم تعد مُضمّنة مع `hono`. ثبِّت الحزمة المقابلة واستورِد منها.

| قبل                    | بعد                      |
| ------------------------- | -------------------------- |
| `hono/aws-lambda`         | `@hono/aws-lambda`         |
| `hono/bun`                | `@hono/bun`                |
| `hono/cloudflare-workers` | `@hono/cloudflare-workers` |
| `hono/deno`               | `@hono/deno`               |
| `hono/lambda-edge`        | `@hono/lambda-edge`        |
| `hono/netlify`            | `@hono/netlify`            |
| `hono/service-worker`     | `@hono/service-worker`     |
| `hono/vercel`             | `@hono/vercel`             |

```ts
// Before
import { serveStatic } from 'hono/bun'

// After
import { serveStatic } from '@hono/bun'
```

`hono/cloudflare-pages` تتم إزالته دون بديل. توصي Cloudflare باستخدام Workers مع أصول ثابتة (static assets)، لذا استخدم `hono` على Workers بدلاً من ذلك.

`hono/adapter` (`env()` و `getRuntimeKey()`) يبقى في `hono`.

## `onError()` و `notFound()` تسجيل وسيط قابل للتوجيه

`onError()` يقبل الآن البرمجيات الوسيطة (middleware) باستخدام `(c, next)` التوقيع بدلاً من `(err, c)`. اقرأ الخطأ من `c.error`:

```ts
// From
app.onError((err, c) => {
  console.error(err)
  return c.text('Custom Error', 500)
})

// To
app.onError((c) => {
  console.error(c.error)
  return c.text('Custom Error', 500)
})
```

`notFound((c) => c.text('Not Found', 404))` يحافظ على نفس صيغة المعالج الواحد (single-handler). تقبل كلتا الواجهتين أيضًا مسارًا اختياريًا وعدة وسائط:

```ts
app.notFound(
  '/api/*',
  async (c, next) => {
    c.header('x-not-found', 'api')
    await next()
  },
  (c) => c.text('API resource not found', 404)
)
```

تنطبق قواعد التوجيه التالية على كلٍّ من واجهتي API:

- التسجيلات تُجمَّع (compose) بدلًا من استبدال المعالج السابق. أعد استجابة لإيقاف السلسلة، أو استدعِ `next()` للتفويض.
- المسارات مستقلة عن طريقة HTTP للطلب، وهي نسبية إلى `basePath()`. حذف المسار يسجّل `*` ضمن المسار الأساسي الحالي.
- `route()` يستورد معالجات التطبيق الفرعي (sub-app)، بما في ذلك `notFound()` المعالجات. التطبيقات الفرعية الأكثر تداخلًا بعمق لها الأولوية؛ عند نفس العمق، تعمل المعالجات بترتيب التسجيل، وليس بترتيب خصوصية المسار.
- تتطابق النطاقات (scopes) مع مسار الطلب، بغض النظر عن التطبيق الذي سجل المسار الأصلي. لا تزال معاملات الطلب تأتي من المسار الأصلي، وليس من نطاق الاحتياط (fallback scope).

`notFound()` تعمل الوسيطة (middleware) لكلٍّ من الطلبات غير المتطابقة والصريحة `c.notFound()` الاستدعاءات. إذا وصلت السلسلة إلى نهايتها دون استجابة نهائية، يتم استخدام معالج الأخطاء المدمج أو معالج عدم العثور (not-found). الأخطاء المُرماة من `onError()` يتم التعامل مع الوسائط (middleware) بواسطة معالج الأخطاء المدمج (built-in error handler) بدلًا من تسربها من `app.fetch()`.

## الأخطاء المرميّة غير Error تذهب إلى `onError`

أي قيمة من نوع غير Error تُلقى من معالج أو وسيطة، مثل سلسلة نصية أو كائن بسيط، تذهب الآن إلى `onError` مُغلّف في `Error`. القيمة الأصلية متاحة كـ `c.error.cause`، وتُستخدم سلسلة نصية مرفوعة (thrown) أيضًا كـ `c.error.message`. لم يعد ينتشر خارج `app.fetch()`.

## `getColorEnabledAsync()` يُزال

`getColorEnabledAsync()` من `hono/utils/color` أُزيل. استخدم `getColorEnabled()` وتمرير الارتباطات على Cloudflare Workers. الـ `logger()` تقوم الوسيطة (middleware) بهذا بنفسها، لذا لا تحتاج إلى أي تغيير.

```ts
// Before
const enabled = await getColorEnabledAsync()

// After
const enabled = getColorEnabled(c.env)
```

## `c.req.query()` قد يُرجع `undefined` القيم

`c.req.query()` و `c.req.queries()` بدون مفتاح تُعيد الآن `Record<string, string | undefined>` و `Record<string, string[] | undefined>`، لأنه قد يكون المفتاح غائبًا.

```ts
// Before
const { name } = c.req.query() // string

// After
const { name } = c.req.query() // string | undefined
```

## `c.req.json()` يُرجع `unknown`

`c.req.json()` يُرجع `Promise<unknown>` بدلاً من `Promise<any>`. مرّر النوع صراحةً، أو استخدم `c.req.valid()` باستخدام مُدقِّق.

```ts
// Before
const body = await c.req.json() // any

// After
const body = await c.req.json<{ name: string }>()
```

## `c.json()` يُطلق خطأً لقيمة غير قابلة للتسلسل كـ JSON

`c.json(undefined)` كان يُعيد جسمًا فارغًا. الآن يُطلق `TypeError`، مثل `Response.json()`. الأمر نفسه ينطبق على دالة أو رمز (symbol).

## مطابقة أحرف البدل متطابقة في كل موجّه

A `*` في نهاية المقطع يكون حرف بدل (wildcard) في كل موجّه (router)، وقد لا يطابق أي شيء. `*` في منتصف مقطع (segment)، مثل `/x*y`، ليس حرف بدل. المقطع الذي يكون فقط `*` يطابق مقطعًا واحدًا غير فارغ.

| المسار          | المسار          | v5       |
| -------------- | ------------- | -------- |
| `/x*/y`        | `/x/y`        | تطابق    |
| `/x*/y`        | `/xz/y`       | تطابق    |
| `/x*/y`        | `/x/z/y`      | لا تطابق |
| `/x*y`         | `/xay`        | لا تطابق |
| `/wild/*/card` | `/wild//card` | لا تطابق |

لم يطابق TrieRouter و PatternRouter `/x*/y` إلى `/xz/y` سابقًا. في RegExpRouter، `/x*/y` و `/x/*` لا يمكن تسجيلهما معًا ويُطلق `UnsupportedPathError`، لذلك يتراجع SmartRouter إلى TrieRouter.

## إزالة الميزات المهملة

### `app.mount()`

استخدم [تركيب البرمجية الوسيطة](https://hono.dev/docs/middleware/builtin/mount) بدلاً من ذلك.

```ts
import { mount } from 'hono/mount'

// Before
app.mount('/itty-router', ittyRouter.handle)

// After
app.all('/itty-router/*', mount(ittyRouter.handle))
```

### `app.fire()`

استخدم `fire()` من `@hono/service-worker` بدلاً من ذلك.

```ts
import { fire } from '@hono/service-worker'

// Before
app.fire()

// After
fire(app)
```

### `c.req.matchedRoutes` و `c.req.routePath`

استخدم `matchedRoutes()` و `routePath()` من `hono/route` بدلاً من ذلك.

```ts
import { routePath } from 'hono/route'

// Before
app.get('/posts/:id', (c) => c.text(c.req.routePath))

// After
app.get('/posts/:id', (c) => c.text(routePath(c)))
```

### خيارات خطاف SSG

الـ `beforeRequestHook`, `afterResponseHook`، و `afterGenerateHook` خيارات `toSSG()` تُزال. مرّرها كإضافة (plugin) عبر `plugins` بدلاً من ذلك. `defaultPlugin()`، الذي يتخطى الاستجابات غير 200، يُطبَّق فقط عندما `plugins` مُحذوف، لذا أضفه صراحةً إذا احتجته.

```ts
import { defaultPlugin, toSSG } from 'hono/ssg'

// Before
toSSG(app, fs, { beforeRequestHook })

// After
toSSG(app, fs, { plugins: [{ beforeRequestHook }, defaultPlugin()] })
```

### أخرى

- برمجيات Bearer Auth الوسيطة - `noAuthenticationHeaderMessage`, `invalidAuthenticationHeaderMessage`، و `invalidTokenMessage` أُزيلت. استخدم `noAuthenticationHeader.message`, `invalidAuthenticationHeader.message`، و `invalidToken.message` بدلاً من ذلك.
- برمجية وسيطة لخدمة الملفات الثابتة - `pathResolve` أُزيل الخيار. لم يعد يُستخدم.
- مساعد SSG - `SSG_DISABLED_RESPONSE` أُزيل. استخدم `X_HONO_DISABLE_SSG_HEADER_KEY` بدلاً من ذلك.
- `timingSafeEqual()` في `hono/utils/buffer` يقبل السلاسل النصية فقط. أما `hashFunction` خيار وسيطي المصادقة الأساسية (Basic Auth) ومصادقة الحامل (Bearer Auth) مُعرَّف بنوع `(input: string) => string | null | Promise<string | null>` وفقًا لذلك.
- `getQueryStrings()` في `hono/utils/url` يُزال. استخدم `URL` `API` بدلاً من ذلك.
- `UnOfficalStatusCode` في `hono/utils/http-status` أُزيل. استخدم `UnofficialStatusCode` بدلاً من ذلك.
