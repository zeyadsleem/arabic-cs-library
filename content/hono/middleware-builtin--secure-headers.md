---
title: "وسيط الرؤوس الآمنة"
book: hono
chapter: middleware-builtin
slug: secure-headers
order: 49
source: https://hono.dev/docs/middleware/builtin/secure-headers
lang: ar
---

يبسّط وسيط الترويسات الآمنة (Secure Headers Middleware) إعداد ترويسات الأمان. مستوحى جزئيًا من قدرات Helmet، يتيح لك التحكم في تفعيل وتعطيل ترويسات الأمان المحددة.

## Import

```ts
import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'
```

## الاستخدام

يمكنك استخدام الإعدادات المثلى افتراضيًا.

```ts
const app = new Hono()
app.use(secureHeaders())
```

يمكنك كتم الترويسات (headers) غير الضرورية بضبطها على false.

```ts
const app = new Hono()
app.use(
  '*',
  secureHeaders({
    xFrameOptions: false,
    xXssProtection: false,
  })
)
```

يمكنك تجاوز قيم الترويسات (headers) الافتراضية باستخدام نص.

```ts
const app = new Hono()
app.use(
  '*',
  secureHeaders({
    strictTransportSecurity:
      'max-age=63072000; includeSubDomains; preload',
    xFrameOptions: 'DENY',
    xXssProtection: '1',
  })
)
```

## الخيارات المدعومة

يتوافق كل خيار مع أزواج المفتاح-القيمة (Key-Value) التالية للرؤوس (headers).

| الخيار (Option) | الترويسة (Header) | القيمة (Value) | الافتراضي (Default) |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------- |
| - | X-Powered-By | (حذف الترويسة) | True |
| contentSecurityPolicy           | [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)                                                               | الاستخدام: [ضبط Content-Security-Policy](#setting-content-security-policy) | بدون إعداد |
| contentSecurityPolicyReportOnly | [Content-Security-Policy-Report-Only](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)           | الاستخدام: [ضبط Content-Security-Policy](#setting-content-security-policy) | بدون إعداد |
| trustedTypes                    | [الأنواع الموثوقة (`Trusted Types`)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types)                               | الاستخدام: [ضبط Content-Security-Policy](#setting-content-security-policy) | بدون إعداد |
| requireTrustedTypesFor          | [طلب Trusted Types لـ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for)       | الاستخدام: [ضبط Content-Security-Policy](#setting-content-security-policy) | بدون إعداد |
| crossOriginEmbedderPolicy       | [Cross-Origin-Embedder-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)                         | require-corp                                                               | **False**  |
| crossOriginResourcePolicy       | [Cross-Origin-Resource-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)                         | same-origin                                                                | True       |
| crossOriginOpenerPolicy         | [Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)                             | same-origin                                                                | True       |
| originAgentCluster              | [Origin-Agent-Cluster](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin-Agent-Cluster)                                         | ?1                                                                         | True       |
| referrerPolicy                  | [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                                                   | no-referrer                                                                | True       |
| reportingEndpoints              | [Reporting-Endpoints](https://www.w3.org/TR/reporting-1/#header)                                                                               | الاستخدام: [ضبط Content-Security-Policy](#setting-content-security-policy) | بدون إعداد |
| reportTo                        | [Report-To](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to)                                       | الاستخدام: [ضبط Content-Security-Policy](#setting-content-security-policy) | بدون إعداد |
| strictTransportSecurity         | [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                               | max-age=15552000; includeSubDomains                                        | True       |
| xContentTypeOptions             | [X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)                                     | nosniff                                                                    | True       |
| xDnsPrefetchControl             | [X-DNS-Prefetch-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control)                                     | off                                                                        | True       |
| xDownloadOptions                | [X-Download-Options](https://learn.microsoft.com/en-us/archive/blogs/ie/ie8-security-part-v-comprehensive-protection#mime-handling-force-save) | noopen                                                                     | True       |
| xFrameOptions                   | [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                   | SAMEORIGIN                                                                 | True       |
| xPermittedCrossDomainPolicies   | [X-Permitted-Cross-Domain-Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Permitted-Cross-Domain-Policies)               | none                                                                       | True       |
| xXssProtection                  | [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)                                                 | 0                                                                          | True       |
| permissionPolicy                | [Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)                                             | الاستخدام: [تعيين Permission-Policy](#setting-permission-policy)             | بدون إعداد |

## تعارض البرمجيات الوسيطة

يرجى توخي الحذر بشأن ترتيب المواصفة عند التعامل مع وسائط تتعامل مع نفس الترويسة (header).

في هذه الحالة، يعمل Secure-headers و `x-powered-by` يتم حذفه:

```ts
const app = new Hono()
app.use(secureHeaders())
app.use(poweredBy())
```

في هذه الحالة، يعمل Powered-By و `x-powered-by` يُضاف:

```ts
const app = new Hono()
app.use(poweredBy())
app.use(secureHeaders())
```

## ضبط Content-Security-Policy

```ts
const app = new Hono()
app.use(
  '/test',
  secureHeaders({
    reportingEndpoints: [
      {
        name: 'endpoint-1',
        url: 'https://example.com/reports',
      },
    ],
    // -- or alternatively
    // reportTo: [
    //   {
    //     group: 'endpoint-1',
    //     max_age: 10886400,
    //     endpoints: [{ url: 'https://example.com/reports' }],
    //   },
    // ],
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      childSrc: ["'self'"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      frameSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      manifestSrc: ["'self'"],
      mediaSrc: ["'self'"],
      objectSrc: ["'none'"],
      reportTo: 'endpoint-1',
      reportUri: '/csp-report',
      sandbox: ['allow-same-origin', 'allow-scripts'],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      scriptSrcElem: ["'self'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      styleSrcAttr: ['none'],
      styleSrcElem: ["'self'", 'https:', "'unsafe-inline'"],
      upgradeInsecureRequests: [],
      workerSrc: ["'self'"],
    },
  })
)
```

### `nonce` السمة

يمكنك إضافة [`nonce` السمة](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) إلى `script` أو `style` العنصر بإضافة `NONCE` مستوردة من `hono/secure-headers` إلى `scriptSrc` أو `styleSrc`:

```tsx
import { secureHeaders, NONCE } from 'hono/secure-headers'
import type { SecureHeadersVariables } from 'hono/secure-headers'

// Specify the variable types to infer the `c.get('secureHeadersNonce')`:
type Variables = SecureHeadersVariables

const app = new Hono<{ Variables: Variables }>()

// Set the pre-defined nonce value to `scriptSrc`:
app.get(
  '*',
  secureHeaders({
    contentSecurityPolicy: {
      scriptSrc: [NONCE, 'https://allowed1.example.com'],
    },
  })
)

// Get the value from `c.get('secureHeadersNonce')`:
app.get('/', (c) => {
  return c.html(
    <html>
      <body>
        {/** contents */}
        <script
          src='/js/client.js'
          nonce={c.get('secureHeadersNonce')}
        />
      </body>
    </html>
  )
})
```

إذا كنت تريد توليد قيمة nonce بنفسك، يمكنك أيضًا تحديد دالة كما يلي:

```tsx
const app = new Hono<{
  Variables: { myNonce: string }
}>()

const myNonceGenerator: ContentSecurityPolicyOptionHandler = (c) => {
  // This function is called on every request.
  const nonce = Math.random().toString(36).slice(2)
  c.set('myNonce', nonce)
  return `'nonce-${nonce}'`
}

app.get(
  '*',
  secureHeaders({
    contentSecurityPolicy: {
      scriptSrc: [myNonceGenerator, 'https://allowed1.example.com'],
    },
  })
)

app.get('/', (c) => {
  return c.html(
    <html>
      <body>
        {/** contents */}
        <script src='/js/client.js' nonce={c.get('myNonce')} />
      </body>
    </html>
  )
})
```

## ضبط Permission-Policy

تسمح لك ترويسة Permission-Policy بالتحكم في الميزات وواجهات البرمجة (APIs) التي يمكن استخدامها في المتصفح. إليك مثالًا على كيفية تعيينها:

```ts
const app = new Hono()
app.use(
  '*',
  secureHeaders({
    permissionsPolicy: {
      fullscreen: ['self'], // fullscreen=(self)
      bluetooth: ['none'], // bluetooth=(none)
      payment: ['self', 'https://example.com'], // payment=(self "https://example.com")
      syncXhr: [], // sync-xhr=()
      camera: false, // camera=none
      microphone: true, // microphone=*
      geolocation: ['*'], // geolocation=*
      usb: ['self', 'https://a.example.com', 'https://b.example.com'], // usb=(self "https://a.example.com" "https://b.example.com")
      accelerometer: ['https://*.example.com'], // accelerometer=("https://*.example.com")
      gyroscope: ['src'], // gyroscope=(src)
      magnetometer: [
        'https://a.example.com',
        'https://b.example.com',
      ], // magnetometer=("https://a.example.com" "https://b.example.com")
    },
  })
)
```
