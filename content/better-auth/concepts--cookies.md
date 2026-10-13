---
title: "ملفات تعريف الارتباط"
lang: ar
chapter: concepts
slug: cookies
order: 25
source: https://better-auth.com/docs/concepts/cookies
---

# ملفات تعريف الارتباط (/docs/concepts/cookies)

تعرّف على كيفية استخدام Better Auth لملفات تعريف الارتباط، بما في ذلك بادئات ملفات تعريف الارتباط، والسمات المخصّصة لها، والمشاركة عبر النطاقات الفرعية، والملفات الآمنة، والتعامل مع ITP في Safari باستخدام الوسائط (proxies).

تُستخدم ملفات تعريف الارتباط لتخزين بيانات مثل رموز الجلسة (session tokens)، وبيانات الجلسة، وحالة OAuth، والمزيد.

* تظل ملف تعريف الارتباط الأساسية `session_token` معرّف جلسة مبهمًا وموقّعًا بالسر.
* لا توجد ملف تعريف الارتباط `session_data` إلا عند تمكين `session.cookieCache`، ويعتمد ترميزها على الاستراتيجية المهيّأة:
  * `compact`: base64url + HMAC باستخدام سر Better Auth الخاص بك
  * `jwt`: HS256 افتراضيًا، أو توقيع غير متماثل عند تمكين `sessionCookieCache` في إضافة JWT
  * `jwe`: مشفّرة باستخدام سر Better Auth الخاص بك

إذا استخدمت [versioned secrets](https://better-auth.com/docs/reference/options#secrets) لتدوير المفاتيح، فستستخدم بيانات ملفات تعريف الارتباط المعتمدة على السر (بما في ذلك ملفات تعريف الارتباط الموقّعة وذاكرات جلسة JWE المشفّرة) المفتاح الحالي تلقائيًا وتبقى متوافقة مع المفاتيح السابقة حيث يُدعم ذلك.

### بادئة ملفات تعريف الارتباط

افتراضيًا، تتبع ملفات تعريف الارتباط في Better Auth الصيغة `${prefix}.${cookie_name}`. البادئة الافتراضية هي "better-auth". يمكنك تغيير البادئة عبر ضبط `cookiePrefix` في كائن `advanced` ضمن خيارات المصادقة.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    advanced: {
        cookiePrefix: "my-app"
    }
})
```

### ملفات تعريف ارتباط مخصّصة

تكون جميع ملفات تعريف الارتباط `httpOnly` و `secure` عندما يعمل الخادم في وضع الإنتاج.

إذا أردت ضبط أسماء وسمات مخصّصة لملفات تعريف الارتباط، فيمكنك فعل ذلك عبر ضبط `cookies` في كائن `advanced` ضمن خيارات المصادقة.

افتراضيًا، يستخدم Better Auth ملفات تعريف الارتباط التالية:

* `session_token` لتخزين رمز الجلسة
* `session_data` لتخزين بيانات الجلسة إذا كانت ذاكرة ملفات تعريف الارتباط ممكّنة
* `dont_remember` لتخزين العلامة عندما تكون `rememberMe` معطّلة

قد تستخدم الإضافات أيضًا ملفات تعريف الارتباط لتخزين البيانات. على سبيل المثال، تستخدم إضافة المصادقة الثنائية (Two Factor Authentication) ملف تعريف الارتباط `two_factor` لتخزين حالة المصادقة الثنائية.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    advanced: {
        cookies: {
            session_token: {
                name: "custom_session_token",
                attributes: {
                    // Set custom cookie attributes
                }
            },
        }
    }
})
```

### ملفات تعريف الارتباط عبر النطاقات الفرعية

قد تحتاج أحيانًا إلى مشاركة ملفات تعريف الارتباط عبر النطاقات الفرعية.
على سبيل المثال، إذا صادقت على `auth.example.com`، فقد ترغب أيضًا في الوصول إلى الجلسة نفسها على `app.example.com`.

::: {warning}
تتحكم سمة `domain` في النطاقات التي يمكنها الوصول إلى ملف تعريف الارتباط. ضبطها على نطاقك الجذر (مثل `example.com`) يجعل ملف تعريف الارتباط متاحًا عبر جميع النطاقات الفرعية. لأغراض الأمان، اتبع هذه الإرشادات:

1. لا تمكّن ملفات تعريف الارتباط عبر النطاقات الفرعية إلا عند الضرورة
2. اضبط النطاق على أضيق نطاق مطلوب (مثل `app.example.com` بدلًا من `.example.com`)
3. احترس من النطاقات الفرعية غير الموثوقة التي قد تتمكن من الوصول إلى ملفات تعريف الارتباط هذه
4. فكّر في استخدام نطاقات منفصلة للخدمات غير الموثوقة (مثل `status.company.com` مقابل `app.company.com`)
:::

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: "app.example.com", // your domain
        },
    },
    trustedOrigins: [
        'https://example.com',
        'https://app1.example.com',
        'https://app2.example.com',
    ],
})
```

### ملفات تعريف الارتباط الآمنة

افتراضيًا، تكون ملفات تعريف الارتباط آمنة فقط عندما يعمل الخادم في وضع الإنتاج. يمكنك فرض أن تكون ملفات تعريف الارتباط آمنة دائمًا عبر ضبط `useSecureCookies` على `true` في كائن `advanced` ضمن خيارات المصادقة.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    advanced: {
        useSecureCookies: true
    }
})
```

## Safari و ITP والإعدادات عبر النطاقات

يتضمن Safari ميزة خصوصية تُسمّى Intelligent Tracking Prevention (ITP) تحجب ملفات تعريف الارتباط الخاصة بطرف ثالث.

إذا كانت واجهة Better Auth API مستضافة على نطاق مختلف عن الواجهة الأمامية لديك، فقد يحجب Safari ملفات تعريف الارتباط الخاصة بالمصادقة تمامًا.

مثال لا يعمل في Safari:

```
Frontend: https://app.domainB.com
API:      https://domainA.com
```

إذا أرسلت واجهتك الأمامية طلبًا مثل:

```ts
fetch("https://domainA.com/api/auth/get-session", {
  credentials: "include"
})
```

يعامل Safari النطاق `domainA.com` باعتباره طرفًا ثالثًا ويحجب ملفات تعريف الارتباط الخاصة به. وقد يؤدي ذلك إلى عدم استمرار الجلسات،
وتجاهل `Set-Cookie`، وظهور المستخدمين وكأنهم سجّلوا الخروج بعد تسجيل الدخول، أو نجاح المصادقة في Chrome وفشلها في Safari.

لحل هذه المشكلة، هناك حلّان:

1. استخدام وسيط عكسي (reverse proxy) لتمرير الطلب إلى الـ API.
2. استخدام نطاق أب مشترك.

### استخدام وسيط عكسي

بدلًا من استدعاء الـ API مباشرةً، يمكنك تمريره عبر الوسيط باستخدام النطاق نفسه الخاص بواجهتك الأمامية.

على سبيل المثال، بدلًا من استدعاء:

```
https://domainA.com/api/auth/*
```

يمكنك استدعاء:

```
https://app.domainB.com/api/auth/*
```

ثم اضبط مزوّد الاستضافة لديك بحيث يمرّر الطلب إلى خادم الـ API الفعلي.

يجعل هذا الطلب يبدو كطلب طرف أول (first-party) بالنسبة إلى Safari، ما يسمح لملفات تعريف الارتباط بالعمل بشكل صحيح.

#### مثال باستخدام Netlify

```toml title="netlify.toml"
[[redirects]]
  from = "/api/*"
  to = "https://domainA.com/api/:splat"
  status = 200
  force = true
```

#### مثال باستخدام Vercel

```ts title="vercel.json"
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://domainA.com/api/:path*"
    }
  ]
}
```

### استخدام نطاق أب مشترك

يمكنك أيضًا استخدام نطاق أب مشترك للسماح بمشاركة ملفات تعريف الارتباط عبر النطاقات الفرعية:

```
https://app.example.com
https://api.example.com
```

ثم مكّن ملفات تعريف الارتباط عبر النطاقات الفرعية مع تحديد النطاق:

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: "example.com",
        },
    },
})
```

اعرف المزيد عن ملفات تعريف الارتباط عبر النطاقات الفرعية في [documentation above](#cross-subdomain-cookies).

يتجنّب هذا أن يعامل Safari الـ API باعتباره طرفًا ثالثًا.
