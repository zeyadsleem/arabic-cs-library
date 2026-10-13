---
title: "Vercel"
book: hono
chapter: getting-started
slug: vercel
order: 8
source: https://hono.dev/docs/getting-started/vercel
lang: ar
---

Vercel هي سحابة الذكاء الاصطناعي (AI cloud)، حيث توفر أدوات المطورين والبنية التحتية السحابية لبناء ويب أسرع وأكثر تخصيصًا وتوسيعه وتأمينه.

يمكن نشر Hono على Vercel دون أي تهيئة (zero-configuration).

## 1. الإعداد

يتوفر قالب بداية لـ Vercel.
ابدأ مشروعك باستخدام الأمر "create-hono".
اختر `vercel` قالب لهذا المثال.


```sh [npm]
npm create hono@latest my-app
```

```sh [yarn]
yarn create hono my-app
```

```sh [pnpm]
pnpm create hono my-app
```

```sh [bun]
bun create hono@latest my-app
```

```sh [deno]
deno init --npm hono my-app
```


انتقل إلى `my-app` وثبّت التبعيات.


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


سنستخدم Vercel CLI للعمل على التطبيق محليًا في الخطوة التالية. إذا لم تكن قد ثبّتته بالفعل، ثبّته عالميًا باتباع [توثيق Vercel CLI](https://vercel.com/docs/cli).

## 2. مرحبًا بالعالم

في `index.ts` أو `src/index.ts` من مشروعك، صدّر تطبيق Hono كتصدير افتراضي (default export).

```ts
import { Hono } from 'hono'

const app = new Hono()

const welcomeStrings = [
  'Hello Hono!',
  'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono',
]

app.get('/', (c) => {
  return c.text(welcomeStrings.join('\n\n'))
})

export default app
```

إذا بدأت بـ `vercel` القَالَب، فهذا مُهيّأ لك بالفعل.

## 3. تشغيل

لتشغيل خادم التطوير محليًا:

```sh
vercel dev
```

زيارة `localhost:3000` سيستجيب باستجابة نصية.

## 4. النشر

النشر إلى Vercel باستخدام `vc deploy`.

```sh
vercel deploy
```

## قراءة إضافية

[تعرّف على المزيد حول Hono في توثيق Vercel](https://vercel.com/docs/frameworks/backend/hono).
