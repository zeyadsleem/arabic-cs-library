---
title: "وسيط الشرطة المائلة اللاحقة"
book: hono
chapter: middleware-builtin
slug: trailing-slash
order: 52
source: https://hono.dev/docs/middleware/builtin/trailing-slash
lang: ar
---

يعالج هذا الوسيط (middleware) الشرطة المائلة الزائدة (Trailing Slash) في عنوان URL عند طلب GET.

`appendTrailingSlash` يعيد توجيه عنوان URL الذي أضاف إليه الشرطة المائلة اللاحقة (Trailing Slash) إذا لم يتم العثور على المحتوى. أيضًا، `trimTrailingSlash` سيزيل الشرطة المائلة الزائدة (Trailing Slash).

## Import

```ts
import { Hono } from 'hono'
import {
  appendTrailingSlash,
  trimTrailingSlash,
} from 'hono/trailing-slash'
```

## الاستخدام

مثال على إعادة توجيه طلب GET لـ `/about/me` إلى `/about/me/`.

```ts
import { Hono } from 'hono'
import { appendTrailingSlash } from 'hono/trailing-slash'

const app = new Hono({ strict: true })

app.use(appendTrailingSlash())
app.get('/about/me/', (c) => c.text('With Trailing Slash'))
```

مثال على إعادة توجيه طلب GET لـ `/about/me/` إلى `/about/me`.

```ts
import { Hono } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'

const app = new Hono({ strict: true })

app.use(trimTrailingSlash())
app.get('/about/me', (c) => c.text('Without Trailing Slash'))
```

## الخيارات

### <Badge type="info" text="optional" /> alwaysRedirect: `boolean`

افتراضيًا، لا يعيد وسيط الشرطة المائلة الزائدة (trailing slash) التوجيه إلا عندما تكون حالة الاستجابة `404`. عندما `alwaysRedirect` مضبوط على `true`، تقوم الوسيطة بإعادة التوجيه قبل تنفيذ المعالجات. هذا مفيد للمسارات الجامعة (wildcard routes) (`*`) حيث لا يعمل السلوك الافتراضي.

```ts
const app = new Hono()

app.use(trimTrailingSlash({ alwaysRedirect: true }))
app.get('/my-path/*', (c) => c.text('Wildcard route'))
```

هذا الخيار متاح لكلٍّ من `trimTrailingSlash` و `appendTrailingSlash`.

### <Badge type="info" text="optional" /> skip: `(path: string) => boolean`

دالة تحدد ما إذا كان يجب تخطي إعادة التوجيه (redirect) بناءً على مسار الطلب. إذا أرجعت الدالة `true`، سيتم تخطي إعادة التوجيه. هذا مفيد عندما تريد استبعاد مسارات معينة، مثل تلك التي تحتوي على امتدادات ملفات، من إعادة التوجيه.

```ts
app.use(
  appendTrailingSlash({
    skip: (path) => /\.\w+$/.test(path),
  })
)
```

هذا الخيار متاح لكلٍّ من `trimTrailingSlash` و `appendTrailingSlash`.

## ملاحظة

سيُفعّل عندما تكون طريقة الطلب `GET` وحالة الاستجابة هي `404`.
