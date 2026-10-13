---
title: "Supabase Edge Functions"
book: hono
chapter: getting-started
slug: supabase-functions
order: 15
source: https://hono.dev/docs/getting-started/supabase-functions
lang: ar
---

[Supabase](https://supabase.com/) هو بديل مفتوح المصدر لـ Firebase، يقدم مجموعة أدوات مشابهة لقدرات Firebase، بما في ذلك قاعدة البيانات والمصادقة والتخزين والآن الدوال بدون خادم (serverless functions).

دوال Supabase للحافة (Edge Functions) هي دوال TypeScript من جانب الخادم موزعة عالميًا، وتعمل بالقرب من مستخدميك لتحسين الأداء. تُطوَّر هذه الدوال باستخدام [Deno](https://deno.com/)، مما يجلب العديد من الفوائد، بما في ذلك تحسين الأمان وبيئة تشغيل حديثة لـ JavaScript/TypeScript.

إليك كيف يمكنك البدء مع Supabase Edge Functions:

## 1. الإعداد

### المتطلبات المسبقة

قبل أن تبدأ، تأكد من تثبيت Supabase CLI. إذا لم تكن قد ثبّتته بعد، فاتبع التعليمات الواردة في [الوثائق الرسمية](https://supabase.com/docs/guides/cli/getting-started).

### إنشاء مشروع جديد

1. افتح الطرفية أو موجه الأوامر.

2. أنشئ مشروع Supabase جديدًا في دليل على جهازك المحلي عن طريق تشغيل:

```bash
supabase init

```

يقوم هذا الأمر بتهيئة مشروع Supabase جديد في الدليل الحالي.

### إضافة دالة Edge

3. داخل مشروع Supabase الخاص بك، أنشئ دالة Edge جديدة باسم `hello-world`:

```bash
supabase functions new hello-world

```

ينشئ هذا الأمر دالة حافة (Edge Function) جديدة بالاسم المحدد في مشروعك.

## 2. مرحبًا بالعالم

حرِّر `hello-world` الدالة عن طريق تعديل الملف `supabase/functions/hello-world/index.ts`:

```ts
import { Hono } from 'jsr:@hono/hono'

// change this to your function name
const functionName = 'hello-world'
const app = new Hono().basePath(`/${functionName}`)

app.get('/hello', (c) => c.text('Hello from hono-server!'))

Deno.serve(app.fetch)
```

## 3. تشغيل

لتشغيل الدالة محلياً، استخدم الأمر التالي:

1. استخدم الأمر التالي لتشغيل الدالة:

```bash
supabase start # start the supabase stack
supabase functions serve --no-verify-jwt # start the Functions watcher
```

الـ `--no-verify-jwt` يسمح لك هذا العَلَم (flag) بتجاوز التحقق من JWT أثناء التطوير المحلي.

2. أرسل طلب GET باستخدام cURL أو Postman إلى `http://127.0.0.1:54321/functions/v1/hello-world/hello`:

```bash
curl  --location  'http://127.0.0.1:54321/functions/v1/hello-world/hello'
```

يجب أن يُعيد هذا الطلب النص "Hello from hono-server!".

## 4. النشر

يمكنك نشر جميع دوال Edge الخاصة بك في Supabase بأمر واحد:

```bash
supabase functions deploy
```

بدلًا من ذلك، يمكنك نشر دوال الحافة (Edge Functions) الفردية بتحديد اسم الدالة في أمر النشر:

```bash
supabase functions deploy hello-world

```

لمزيد من طرق النشر، تفضل بزيارة توثيق Supabase حول [النشر إلى الإنتاج](https://supabase.com/docs/guides/functions/deploy).
