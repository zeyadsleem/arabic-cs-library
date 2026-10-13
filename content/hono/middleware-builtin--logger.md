---
title: "برمجية وسيطة للتسجيل"
book: hono
chapter: middleware-builtin
slug: logger
order: 42
source: https://hono.dev/docs/middleware/builtin/logger
lang: ar
---

إنه مُسجِّل بسيط.

## Import

```ts
import { Hono } from 'hono'
import { logger } from 'hono/logger'
```

## الاستخدام

```ts
const app = new Hono()

app.use(logger())
app.get('/', (c) => c.text('Hello Hono!'))
```

## تفاصيل التسجيل

يسجل وسيط المسجّل (Logger Middleware) التفاصيل التالية لكل طلب:

- **الطلب الوارد**: يسجّل أسلوب HTTP ومسار الطلب والطلب الوارد.
- **الاستجابة الصادرة**: تسجّل أسلوب HTTP ومسار الطلب ورمز حالة الاستجابة وأوقات الطلب/الاستجابة.
- **تلوين رموز الحالة**: رموز حالة الاستجابة ملونة لرؤية أفضل وتحديد سريع لفئات الحالة. تُستخدم ألوان مختلفة لتمثيل فئات رموز الحالة المختلفة.
- **الوقت المنقضي (Elapsed Time)**: يُسجل الوقت المستغرق لدورة الطلب/الاستجابة بصيغة مقروءة للبشر، إما بالميلي ثانية (ms) أو بالثواني (s).

باستخدام وسيط التسجيل (Logger Middleware)، يمكنك بسهولة مراقبة تدفق الطلبات والاستجابات في تطبيق Hono الخاص بك وتحديد أي مشكلات أو اختناقات في الأداء بسرعة.

يمكنك أيضًا توسيع الوسيط (middleware) أكثر من خلال توفير `PrintFunc` دالة لسلوك تسجيل مُخصَّص.


لتعطيل _تلوين رموز الحالة_، يمكنك تعيين `NO_COLOR` متغير بيئة. هذه طريقة شائعة لتعطيل رموز الهروب اللونية ANSI (ANSI color escape codes) في مكتبات التسجيل، وهي موصوفة في <https://no-color.org/>. لاحظ أن Cloudflare Workers ليس لديها `process.env` كائن، لذا سيتحوّل افتراضيًا إلى مخرجات سجل نصية عادية.

## PrintFunc

يقبل وسيط السجل (Logger Middleware) خيارًا اختياريًا `PrintFunc` كدالة كمعامل. تتيح لك هذه الدالة تخصيص المسجّل (logger) وإضافة سجلات إضافية.

## الخيارات

### <Badge type="info" text="optional" /> `fn:` `PrintFunc(str: string, ...rest: string[])`

- `str`: تم تمريره بواسطة المُسجِّل.
- `...rest`: خصائص نصّية إضافية تُطبع إلى الطرفية.

### مثال

إعداد مخصص لـ `PrintFunc` الدالة إلى برمجية Logger الوسيطة:

```ts
export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

app.use(logger(customLogger))
```

إعداد المُسجّل (logger) المخصص في مسار:

```ts
app.post('/blog', (c) => {
  // Routing logic

  customLogger('Blog saved:', `Path: ${blog.url},`, `ID: ${blog.id}`)
  // Output
  // <-- POST /blog
  // Blog saved: Path: /blog/example, ID: 1
  // --> POST /blog 201 93ms

  // Return Context
})
```
