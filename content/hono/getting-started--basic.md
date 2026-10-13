---
title: "البدء"
book: hono
chapter: getting-started
slug: basic
order: 1
source: https://hono.dev/docs/getting-started/basic
lang: ar
---

استخدام Hono سهل للغاية. يمكننا إعداد المشروع وكتابة الكود والتطوير باستخدام خادم محلي والنشر بسرعة. سيعمل نفس الكود على أي وقت تشغيل، فقط بنقاط دخول مختلفة. دعنا نلقي نظرة على الاستخدام الأساسي لـ Hono.

## قوالب البدء

تتوفر قوالب بداية (starter templates) لكل منصة. استخدم أمر "create-hono" التالي.


```sh [npm]
npm create hono@latest my-app
```

```sh [yarn]
yarn create hono my-app
```

```sh [pnpm]
pnpm create hono@latest my-app
```

```sh [bun]
bun create hono@latest my-app
```

```sh [deno]
deno init --npm hono@latest my-app
```


ثم سيُسألك عن القالب (template) الذي تريد استخدامه.
لنختر Cloudflare Workers لهذا المثال.

```
? Which template do you want to use?
    aws-lambda
    bun
    cloudflare-pages
❯   cloudflare-workers
    deno
    fastly
    nextjs
    nodejs
    vercel
```

سيُسحَب القالب إلى `my-app`، فانتقل إليه وثبّت الاعتماديات.


```sh [npm]
cd my-app
npm i
```

```sh [yarn]
cd my-app
yarn
```

```sh [pnpm]
cd my-app
pnpm i
```

```sh [bun]
cd my-app
bun i
```


بمجرد اكتمال تثبيت الحزمة، شغّل الأمر التالي لبدء تشغيل خادم محلي.


```sh [npm]
npm run dev
```

```sh [yarn]
yarn dev
```

```sh [pnpm]
pnpm dev
```

```sh [bun]
bun run dev
```


## مرحبًا بالعالم

يمكنك كتابة كود بلغة TypeScript باستخدام أداة تطوير Cloudflare Workers "Wrangler" أو Deno أو Bun أو غيرها دون أن تدرك أي ترجمة (transpiling).

اكتب تطبيقك الأول باستخدام Hono في `src/index.ts`. المثال أدناه تطبيق Hono ابتدائي.

الـ `import` والنهائي `export default` قد تختلف الأجزاء من بيئة تشغيل إلى أخرى،
لكن كل كود التطبيق سيعمل بنفس الكود في كل مكان.

```ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
```

ابدأ خادم التطوير وادخل إلى `http://localhost:8787` باستخدام متصفحك.


```sh [npm]
npm run dev
```

```sh [yarn]
yarn dev
```

```sh [pnpm]
pnpm dev
```

```sh [bun]
bun run dev
```


## إرجاع JSON

إرجاع JSON سهل أيضًا. فيما يلي مثال على معالجة طلب GET إلى `/api/hello` وإرجاع `application/json` الاستجابة.

```ts
app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})
```

## الطلب والاستجابة

يتم الحصول على معامل مسار وقيمة استعلام في عنوان URL وإلحاق ترويسة استجابة كما يلي.

```ts
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want to see ${page} of ${id}`)
})
```

يمكننا التعامل بسهولة مع POST وPUT وDELETE وليس GET فقط.

```ts
app.post('/posts', (c) => c.text('Created!', 201))
app.delete('/posts/:id', (c) =>
  c.text(`${c.req.param('id')} is deleted!`)
)
```

## إرجاع HTML

يمكنك كتابة HTML باستخدام [مُساعد html](https://hono.dev/docs/helpers/html) أو باستخدام [`JSX`](https://hono.dev/docs/guides/jsx) الصيغة. إذا أردت استخدام JSX، فأعد تسمية الملف إلى `src/index.tsx` وقم بتهيئته (تحقق مع كل بيئة تشغيل لأنها تختلف). فيما يلي مثال باستخدام JSX.

```tsx
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}

app.get('/page', (c) => {
  return c.html(<View />)
})
```

## إرجاع Response خام

يمكنك أيضًا إرجاع المحتوى الخام [الاستجابة](https://developer.mozilla.org/en-US/docs/Web/API/Response).

```ts
app.get('/', () => {
  return new Response('Good morning!')
})
```

## استخدام البرمجيات الوسيطة

يمكن للبرمجية الوسيطة أن تقوم بالعمل الشاق نيابة عنك.
على سبيل المثال، أضف المصادقة الأساسية.

```ts
import { basicAuth } from 'hono/basic-auth'

// ...

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})
```

توجد وسائط مدمجة مفيدة تشمل مصادقة Bearer ومصادقة JWT و CORS و ETag.
يوفر Hono أيضًا وسائط من طرف ثالث تستخدم مكتبات خارجية مثل GraphQL Server و Firebase Auth.
كما يمكنك إنشاء برمجيتك الوسيطة الخاصة.

## المُكيّف

توجد محولات (Adapters) للدوال المعتمدة على المنصة، على سبيل المثال، معالجة الملفات الثابتة أو WebSocket.
تُنشر كحزم منفصلة. على سبيل المثال، للتعامل مع WebSocket في Cloudflare Workers، ثبّت واستورد `@hono/cloudflare-workers`.

```ts
import { upgradeWebSocket } from '@hono/cloudflare-workers'

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    // ...
  })
)
```

## الخطوة التالية

معظم الكود سيعمل على أي منصة، لكن توجد أدلة (guides) لكل منها.
على سبيل المثال، كيفية إعداد المشاريع أو كيفية النشر.
يُرجى الاطلاع على الصفحة الخاصة بالمنصة المحددة التي تريد استخدامها لإنشاء تطبيقك!
