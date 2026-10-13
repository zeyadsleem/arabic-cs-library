---
title: "حماية CSRF"
book: hono
chapter: middleware-builtin
slug: csrf
order: 36
source: https://hono.dev/docs/middleware/builtin/csrf
lang: ar
---

يحمي هذا الوسيط (middleware) من هجمات CSRF عبر التحقق من كلٍ من `Origin` الترويسة و `Sec-Fetch-Site` الترويسة (header). يُسمح بالطلب إذا مرّ أيٌّ من التحققين.

يتحقّق الوسيط فقط من الطلبات التي:

- استخدام طرق HTTP غير الآمنة (ليس GET أو HEAD أو OPTIONS)
- لها أنواع محتوى يمكن إرسالها عبر نماذج HTML (`application/x-www-form-urlencoded`, `multipart/form-data`، أو `text/plain`)

المتصفحات القديمة التي لا تُرسل `Origin` الترويسات، أو البيئات التي تستخدم خوادم وكيلة عكسية (reverse proxies) لإزالة هذه الترويسات، قد لا تعمل جيدًا. في مثل هذه البيئات، استخدم طرق رموز CSRF أخرى.

## Import

```ts
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
```

## الاستخدام

```ts
const app = new Hono()

// Default: both origin and sec-fetch-site validation
app.use(csrf())

// Allow specific origins
app.use(csrf({ origin: 'https://myapp.example.com' }))

// Allow multiple origins
app.use(
  csrf({
    origin: [
      'https://myapp.example.com',
      'https://development.myapp.example.com',
    ],
  })
)

// Allow specific sec-fetch-site values
app.use(csrf({ secFetchSite: 'same-origin' }))
app.use(csrf({ secFetchSite: ['same-origin', 'none'] }))

// Dynamic origin validation
// It is strongly recommended that the protocol be verified to ensure a match to `$`.
// You should *never* do a forward match.
app.use(
  '*',
  csrf({
    origin: (origin) =>
      /https:\/\/(\w+\.)?myapp\.example\.com$/.test(origin),
  })
)

// Dynamic sec-fetch-site validation
app.use(
  csrf({
    secFetchSite: (secFetchSite, c) => {
      // Always allow same-origin
      if (secFetchSite === 'same-origin') return true
      // Allow cross-site for webhook endpoints
      if (
        secFetchSite === 'cross-site' &&
        c.req.path.startsWith('/webhook/')
      ) {
        return true
      }
      return false
    },
  })
)
```

## الخيارات

### <Badge type="info" text="optional" /> origin: `string` | `string[]` | `Function`

حدّد الأصول المسموح بها لحماية CSRF.

- **`string`**: أصل واحد مسموح به (مثل، `'https://example.com'`)
- **`string[]`**: مصفوفة الأصول المسموح بها
- **`Function`**: معالج مخصص `(origin: string, context: Context) => boolean` للتحقّق المرن من الأصل ومنطق التجاوز

**الافتراضي**: أصل الطلب نفسه فقط

يستقبل معالج الدالة `Origin` قيمة الترويسة وسياق الطلب، مما يسمح بالتحقق الديناميكي بناءً على خصائص الطلب مثل المسار أو الترويسات أو بيانات سياق أخرى.

### <Badge type="info" text="optional" /> `secFetchSite`: `string` | `string[]` | `Function`

حدد قيم رأس Sec-Fetch-Site المسموح بها للحماية من CSRF باستخدام [`Fetch Metadata`](https://web.dev/articles/fetch-metadata).

- **`string`**: قيمة واحدة مسموح بها (مثل، `'same-origin'`)
- **`string[]`**: مصفوفة القيم المسموح بها (مثل، `['same-origin', 'none']`)
- **`Function`**: معالج مخصص `(secFetchSite: string, context: Context) => boolean` للتحقق المرن

**افتراضي**: يسمح فقط بـ `'same-origin'`

قيم Sec-Fetch-Site القياسية:

- `same-origin`: طلب من نفس الأصل (origin)
- `same-site`: طلب من نفس الموقع (نطاق فرعي مختلف)
- `cross-site`: طلب من موقع مختلف
- `none`: طلب غير قادم من صفحة ويب (على سبيل المثال، شريط عنوان المتصفح، الإشارة المرجعية)

يستقبل معالج الدالة `Sec-Fetch-Site` قيمة الترويسة وسياق الطلب، مما يتيح التحقق الديناميكي بناءً على خصائص الطلب.
