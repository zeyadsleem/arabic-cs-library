---
title: "API"
lang: ar
chapter: concepts
slug: index
order: 22
source: https://better-auth.com/docs/concepts/api
---

# API (/docs/concepts/api)

تعرّف على كيفية استدعاء نقاط نهاية Better Auth API على الخادم، وتمرير body وheaders ومعاملات الاستعلام، واسترجاع ترويسات الاستجابة، ومعالجة الأخطاء.

عند إنشاء مثيل Better Auth جديد، فإنه يوفّر لك كائن `api`. يعرض هذا الكائن كل نقطة نهاية موجودة في مثيل Better Auth لديك. ويمكنك استخدامه للتفاعل مع Better Auth من جهة الخادم.

أي نقطة نهاية تُضاف إلى Better Auth، سواء من الإضافات أو النواة، ستكون متاحة عبر الكائن `api`.

## استدعاء نقاط نهاية API على الخادم

لاستدعاء نقطة نهاية API على الخادم، استورد مثيل `auth` لديك واستدعِ نقطة النهاية باستخدام الكائن `api`.

```ts title="server.ts"
import { betterAuth } from "better-auth";
import { headers } from "next/headers";

export const auth = betterAuth({
    //...
})

// calling get session on the server
await auth.api.getSession({
    headers: await headers() // some endpoints might require headers
})
```

### Body وHeaders وQuery

على عكس العميل، يحتاج الخادم إلى تمرير القيم ككائن بالمفتاح `body` للمتن، و`headers` للترويسات، و`query` لمعاملات الاستعلام.

```ts title="server.ts"
import { auth } from "@/lib/auth"

await auth.api.getSession({
    headers: await headers() // headers containing the user's session token
})

await auth.api.signInEmail({
    body: {
        email: "john@doe.com",
        password: "password"
    },
    headers: await headers() // optional but would be useful to get the user IP, user agent, etc.
})

await auth.api.verifyEmail({
    query: {
        token: "my_token"
    }
})
```

::: {note}
بُنيت نقاط نهاية Better Auth API فوق [better-call](https://github.com/bekacru/better-call)، وهو إطار ويب صغير يتيح لك استدعاء نقاط نهاية REST API كأنها دوال عادية ويسمح لنا باستنتاج أنواع العميل من الخادم بسهولة.
:::

### الحصول على كائن `headers` و`Response`

عند استدعاء نقطة نهاية API على الخادم، فإنها سترجع كائن JavaScript قياسيًا أو مصفوفة مباشرةً لأنها مجرد استدعاء دالة عادي.

لكن هناك أوقات قد ترغب فيها بدلًا من ذلك في الحصول على الكائن `headers` أو `Response`. على سبيل المثال، إذا احتجت إلى الحصول على ملفات تعريف الارتباط (cookies) أو الترويسات.

#### الحصول على `headers`

للحصول على `headers`، يمكنك تمرير الخيار `returnHeaders` إلى نقطة النهاية.

```ts title="server.ts"
import { auth } from "@/lib/auth"

const { headers, response } = await auth.api.signUpEmail({
	returnHeaders: true,
	body: {
		email: "john@doe.com",
		password: "password",
		name: "John Doe",
	},
});
```

سيكون `headers` كائن `Headers`، وهو ما يمكنك استخدامه للحصول على ملفات تعريف الارتباط أو الترويسات.

```ts
const cookies = headers.getSetCookie();
const customHeader = headers.get("x-custom-header");
```

#### الحصول على كائن `Response`

للحصول على كائن `Response`، يمكنك تمرير الخيار `asResponse` إلى نقطة النهاية.

```ts title="server.ts"
import { auth } from "@/lib/auth"

const response = await auth.api.signInEmail({
    body: {
        email: "",
        password: ""
    },
    asResponse: true
})
```

### معالجة الأخطاء

عند استدعاء نقطة نهاية API على الخادم، فإنها ستطرح خطأً إذا فشل الطلب. يمكنك التقاط الخطأ ومعالجته كما تراه مناسبًا. مثيل الخطأ هو مثيل من `APIError`.

```ts title="server.ts"
import { auth } from "@/lib/auth"
import { APIError, isAPIError } from "better-auth/api";

try {
    await auth.api.signInEmail({
        body: {
            email: "",
            password: ""
        }
    })
} catch (error) {
    if (isAPIError(error)) {
        console.log(error.message, error.status)
    }
}
```
