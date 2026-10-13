---
title: "إدارة الجلسات"
lang: ar
chapter: concepts
slug: session-management
order: 32
source: https://better-auth.com/docs/concepts/session-management
---

# إدارة الجلسات (/docs/concepts/session-management)

تعرّف على إدارة الجلسات في Better Auth، بما في ذلك انتهاء صلاحية الجلسة وحداثتها واستراتيجيات التخزين المؤقت للكوكيز والتخزين الثانوي والجلسات عديمة الحالة وتخصيص استجابات الجلسة.

تدير Better Auth الجلسة باستخدام إدارة جلسات تقليدية قائمة على الكوكيز. تُخزَّن الجلسة في كوكي وتُرسَل إلى الخادم مع كل طلب. ثم يتحقق الخادم من الجلسة ويعيد بيانات المستخدم إذا كانت الجلسة صالحة.

لا يزال الكوكي الرئيسي `session_token` هو معرّف الجلسة من جهة الخادم. إذا فعّلت `session.cookieCache`، تكتب Better Auth أيضًا كوكي `session_data` منفصلًا لبيانات الجلسة المخزَّنة مؤقتًا قصيرة العمر. هذا الكوكي المؤقت متميز عن نقطة النهاية `/token` الخاصة بإضافة JWT وعن ناتج الترويسة `set-auth-jwt`.

## جدول الجلسة

يخزّن جدول الجلسة بيانات الجلسة. يحتوي جدول الجلسة على الحقول التالية:

* `id`: معرّف فريد للجلسة.
* `token`: رمز الجلسة. ويُستخدم أيضًا ككوكي الجلسة.
* `userId`: معرّف المستخدم.
* `expiresAt`: تاريخ انتهاء صلاحية الجلسة.
* `ipAddress`: عنوان IP الخاص بالمستخدم.
* `userAgent`: وكيل المستخدم الخاص بالمستخدم. يخزّن ترويسة وكيل المستخدم من الطلب.

## انتهاء صلاحية الجلسة

تنتهي صلاحية الجلسة بعد 7 أيام افتراضيًا. لكن كلما استُخدمت الجلسة وتم الوصول إلى `updateAge`، يُحدَّث انتهاء صلاحية الجلسة إلى الوقت الحالي زائد قيمة `expiresIn`.

يمكنك تغيير قيمتَي `expiresIn` و `updateAge` بتمرير كائن `session` إلى إعداد `auth`.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    //... other config options
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
    }
})
```

### تعطيل تحديث الجلسة

يمكنك تعطيل تحديث الجلسة بحيث لا تُحدَّث الجلسة بغضّ النظر عن خيار `updateAge`.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    //... other config options
    session: {
        disableSessionRefresh: true
    }
})
```

### تأجيل تحديث الجلسة

افتراضيًا، ينفّذ `GET /get-session` عمليات كتابة في قاعدة البيانات لتحديث الجلسة. قد يسبب ذلك مشكلات في إعدادات قاعدة البيانات ذات النسخ المتماثلة للقراءة حيث تُوجَّه طلبات GET إلى نسخ متماثلة للقراءة فقط.

عند تفعيله، يصبح GET للقراءة فقط ويعيد `needsRefresh: true` عند الحاجة إلى التحديث. ويستدعي العميل تلقائيًا POST لتنفيذ التحديث.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    session: {
        deferSessionRefresh: true
    }
})
```

## حداثة الجلسة

تتطلب بعض نقاط النهاية في Better Auth أن تكون الجلسة **حديثة**. تُعدّ الجلسة حديثة إذا كان `createdAt` الخاص بها ضمن حد `freshAge`. افتراضيًا، تُضبط `freshAge` على **يوم واحد** (60 \* 60 \* 24).

يمكنك تخصيص قيمة `freshAge` بتمرير كائن `session` في إعداد `auth`:

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    //... other config options
    session: {
        freshAge: 60 * 5 // 5 minutes (the session is fresh if created within the last 5 minutes)
    }
})
```

**لتعطيل فحص الحداثة**، اضبط `freshAge` على `0`:

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    //... other config options
    session: {
        freshAge: 0 // Disable freshness check
    }
})
```

## إدارة الجلسات

توفّر Better Auth مجموعة من الدوال لإدارة الجلسات.

### الحصول على الجلسة

تسترد دالة `getSession` الجلسة النشطة الحالية.

```ts
import { authClient } from "@/lib/auth-client"

const { data: session } = await authClient.getSession()
```

لمعرفة كيفية تخصيص استجابة الجلسة، راجع قسم [تخصيص استجابة الجلسة](#customizing-session-response).

### استخدام الجلسة

توفّر أداة `useSession` طريقة تفاعلية للوصول إلى الجلسة الحالية.

```ts title="auth-client.ts"
import { authClient } from "@/lib/auth-client"

const { data: session } = authClient.useSession()
```

### سرد الجلسات

تُعيد دالة `listSessions` قائمة بالجلسات النشطة للمستخدم.

```ts title="auth-client.ts"
import { authClient } from "@/lib/auth-client"

const sessions = await authClient.listSessions()
```

### إبطال الجلسة

عندما يسجّل المستخدم خروجه من جهاز، تُنهى الجلسة تلقائيًا. ومع ذلك، يمكنك أيضًا إنهاء جلسة يدويًا من أي جهاز مسجَّل فيه دخول المستخدم.

لإنهاء جلسة، استخدم دالة `revokeSession`. مرِّر رمز الجلسة فقط كمعامل.

```ts title="auth-client.ts"
import { authClient } from "@/lib/auth-client"

await authClient.revokeSession({
    token: "session-token"
})
```

### إبطال الجلسات الأخرى

لإبطال جميع الجلسات الأخرى باستثناء الجلسة الحالية، يمكنك استخدام دالة `revokeOtherSessions`.

```ts title="auth-client.ts"
import { authClient } from "@/lib/auth-client"

await authClient.revokeOtherSessions()
```

### إبطال جميع الجلسات

لإبطال جميع الجلسات، يمكنك استخدام دالة `revokeSessions`.

```ts title="auth-client.ts"
import { authClient } from "@/lib/auth-client"

await authClient.revokeSessions()
```

### تحديث الجلسة

إذا كانت لديك [حقول إضافية](https://better-auth.com/docs/concepts/database#extending-core-schema) مهيّأة على الجلسة، يمكنك تحديثها باستخدام دالة `updateSession`.

```ts title="auth-client.ts"
import { authClient } from "@/lib/auth-client"

await authClient.updateSession({
    theme: "dark",
    language: "en",
})
```

لا يمكن تحديث حقول الجلسة الأساسية (`token` و`userId` و`expiresAt` و`createdAt` و`updatedAt` و`ipAddress` و`userAgent`) عبر نقطة النهاية هذه. يُسمح فقط بالحقول الإضافية المخصّصة.

على الخادم:

```ts title="server.ts"
await auth.api.updateSession({
    body: {
        theme: "dark",
    },
    headers: await headers() // headers containing the user's session token
});
```

### إبطال الجلسات عند تغيير كلمة المرور

يمكنك إبطال جميع الجلسات عندما يغيّر المستخدم كلمة مروره بتمرير `revokeOtherSessions` بالقيمة true على دالة `changePassword`.

```ts title="auth.ts"
import { authClient } from "@/lib/auth-client"

await authClient.changePassword({
    newPassword: newPassword,
    currentPassword: currentPassword,
    revokeOtherSessions: true,
})
```

بالنسبة للجلسات المخزّنة في قاعدة البيانات، يجري تغيير كلمة المرور وإبطال الجلسات في معاملة واحدة عندما تكون المعاملات مفعّلة لمُهايئك، وتُبطَل الجلسات أولًا. إذا فشل الإبطال، يعيد الطلب خطأً وتبقى كلمة المرور الحالية كما هي. وبدون المعاملات، يؤدي الفشل أثناء حفظ كلمة المرور الجديدة إلى بقاء كلمة المرور الحالية مع كون الجلسات قد أُبطِلت بالفعل. ومع [التخزين الثانوي](https://better-auth.com/docs/concepts/database#secondary-storage)، تُزال الجلسات منه بعد الالتزام (commit). ويُسجَّل أي فشل هناك، وتُحتفظ بكلمة المرور الجديدة، ويمكن لتلك الجلسات أن تظل صالحة حتى تنتهي صلاحيتها.

## التخزين المؤقت للجلسات

### التخزين المؤقت للكوكيز

ليس مثاليًا استدعاء قاعدة بياناتك في كل مرة يُستدعى فيها `useSession` أو `getSession`، خاصةً إذا لم تتغيّر الجلسات كثيرًا. يعالج التخزين المؤقت للكوكيز ذلك عبر تخزين بيانات الجلسة في كوكي موقّع قصير العمر—على غرار طريقة استخدام رموز وصول JWT مع رموز التحديث.

عند تفعيل التخزين المؤقت للكوكيز، يمكن للخادم التحقق من صلاحية الجلسة من الكوكي نفسه بدلًا من الوصول إلى قاعدة البيانات في كل مرة. يُوقَّع الكوكي لمنع التلاعب، وتضمن `maxAge` القصيرة تحديث بيانات الجلسة بانتظام. وإذا أُبطِلت الجلسة أو انتهت صلاحيتها، يُبطَل الكوكي تلقائيًا.

لتفعيل التخزين المؤقت للكوكيز، ما عليك سوى ضبط `session.cookieCache` في إعداد auth:

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds (5 minutes)
        }
    }
});
```

::: {note}
**ملاحظات**

عند تفعيل `cookieCache`، قد تظل الجلسات المُبطَلة نشطة على الأجهزة الأخرى حتى ينتهي التخزين المؤقت للكوكيز (`maxAge`). ويعود ذلك إلى:

* يخزّن التخزين المؤقت للكوكيز بيانات الجلسة في متصفح العميل
* لا يمكن للخادم حذف الكوكيز مباشرةً من الأجهزة الأخرى
* لا يُعاد التحقق من الجلسات إلا عند انتهاء التخزين المؤقت أو عند استخدام `disableCookieCache: true`

**إذا كان الإبطال الفوري للجلسة أمرًا بالغ الأهمية:**

* عطّل `cookieCache` بالكامل، أو
* اضبط `maxAge` أقصر (مثل 60 ثانية)، أو
* استخدم `disableCookieCache: true` للعمليات الحساسة
:::

#### استراتيجيات التخزين المؤقت للكوكيز

تدعم Better Auth ثلاث استراتيجيات ترميز مختلفة للتخزين المؤقت للكوكيز:

* **`compact`** (افتراضي): يستخدم ترميز base64url مع توقيع HMAC-SHA256. الصيغة الأكثر إحكامًا دون أي عبء إضافي من مواصفة JWT. الأفضل للأداء والحجم.
* **`jwt`**: JWT قياسي. يستخدم افتراضيًا HMAC-SHA256 (HS256) مع سرّ Better Auth الخاص بك. موقّع لكن غير مشفّر - يمكن لأي شخص قراءته لكنه محصّن ضد التلاعب. إذا كنت بحاجة إلى كوكيز تخزين مؤقت للجلسة تتحقق مقابل JWKS الخاص بإضافة JWT، فثبّت إضافة `jwt()` مع `sessionCookieCache: true` لاستخدام مفاتيح التوقيع غير المتماثلة الخاصة بها بدلًا من ذلك.
* **`jwe`**: يستخدم JWE (تشفير الويب JSON) مع A256CBC-HS512 واشتقاق مفاتيح HKDF. رموز مشفّرة بالكامل - غير قابلة للقراءة ولا للتلاعب. الأكثر أمانًا لكن الأكبر حجمًا.

**المقارنة:**

| الاستراتيجية | الحجم | الأمان | قابل للقراءة | قابل للتشغيل المتبادل | حالة الاستخدام |
| --------- | -------- | ---------------- | -------- | ------------- | --------------------------------------------- |
| `compact` | الأصغر | جيد (موقّع) | نعم | لا | حرج الأداء، الاستخدام الداخلي |
| `jwt` | متوسط | جيد (موقّع) | نعم | نعم | الحاجة إلى توافق JWT، التكاملات الخارجية |
| `jwe` | الأكبر | الأفضل (مشفّر) | لا | نعم | البيانات الحساسة، أقصى أمان |

```ts title="auth.ts"
export const auth = betterAuth({
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
            strategy: "compact" // or "jwt" or "jwe"
        }
    }
});
```

**ملاحظة:** جميع الاستراتيجيات آمنة تشفيريًا وتمنع التلاعب. الفروق الأساسية هي الحجم وقابلية القراءة والتوافق مع مواصفة JWT.

**متى تستخدم كلًّا منها:**

* **استخدم `compact`** عندما تحتاج إلى أقصى أداء وأصغر حجم كوكي. الأفضل لمعظم التطبيقات التي تُستخدم فيها الكوكيز داخليًا فقط من قِبل Better Auth.
* **استخدم `jwt`** عندما تحتاج إلى توافق JWT مع الأنظمة الخارجية، أو عندما تريد رموز JWT قياسية يمكن التحقق منها بواسطة أدوات خارجية. الرموز قابلة للقراءة (JSON بترميز base64) لكنها محصّنة ضد التلاعب. فعّل `sessionCookieCache` على إضافة JWT إذا أردت أن يتحقق JWT الخاص بالتخزين المؤقت للكوكيز مقابل JWKS الخاصة بها بدلًا من سرّ مشترك.
* **استخدم `jwe`** عندما تحتاج إلى أقصى أمان وتريد إخفاء بيانات الجلسة عن العميل. الرموز مشفّرة بالكامل ولا يمكن قراءتها دون المفتاح السري. استخدم هذا للبيانات الحساسة أو متطلبات الامتثال.

### رموز JWT للتخزين المؤقت للكوكيز المدعومة بـ JWKS

إذا أردت أن يكون كوكي `session_data` قابلًا للتحقق عبر نقطة نهاية JWKS الخاصة بإضافة JWT بدلًا من سرّ مشترك، ففعّل إضافة JWT واختر صراحةً التوقيع المدعوم بـ JWKS:

```ts title="auth.ts"
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [jwt({
        sessionCookieCache: true
    })],
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt"
        }
    }
})
```

يؤثر هذا فقط على كوكي `session_data`. لا يزال كوكي `session_token` الأساسي معرّف جلسة مبهمًا ولا يُكشَف عنه عبر JWKS. كما تستخدم رموز JWT الخاصة بالتخزين المؤقت للكوكيز ملف تعريف رمز منفصلًا عن نقطة النهاية `/token` الخاصة بإضافة JWT، لذا فإن تلك الرموز غير قابلة للتبادل.

إذا أردت تعطيل الإرجاع من التخزين المؤقت للكوكيز عند جلب الجلسة، فيمكنك تمرير `disableCookieCache:true`؛ سيفرض هذا على الخادم جلب الجلسة من قاعدة البيانات وتحديث التخزين المؤقت للكوكيز أيضًا.

```ts title="auth-client.ts"
import { authClient } from "@/lib/auth-client"

const session = await authClient.getSession({ query: {
    disableCookieCache: true
}})
```

أو على الخادم

```ts title="server.ts"
await auth.api.getSession({
    query: {
        disableCookieCache: true,
    }, 
    headers: await headers() // headers containing the user's session token
});
```

## الجلسات في التخزين الثانوي

افتراضيًا، إذا وفّرت [تخزينًا ثانويًا](https://better-auth.com/docs/concepts/database#secondary-storage) في إعداد auth الخاص بك، فستُخزَّن الجلسة في التخزين الثانوي.

```ts
import { betterAuth } from "better-auth";

betterAuth({
  // ... other options
  secondaryStorage: {
    // Your implementation here
  },
});
```

### تخزين الجلسات في قاعدة البيانات

افتراضيًا، تخزّن Better Auth الجلسات بالفعل في قاعدة البيانات، لكن إذا وفّرت تخزينًا ثانويًا، فستخزّن Better Auth الجلسات في التخزين الثانوي بدلًا من قاعدة البيانات.

اضبط `storeSessionInDatabase: true` لتخزين الجلسات في كلٍّ من قاعدة البيانات والتخزين الثانوي. تتحقق عمليات البحث عن رمز الجلسة في التخزين الثانوي أولًا، ثم تعود إلى قاعدة البيانات للإدخالات المفقودة ما لم تكن `preserveSessionInDatabase` مفعّلة.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    secondaryStorage: { /** your secondary storage implementation here */ },
    session: { // [!code highlight]
        storeSessionInDatabase: true, // [!code highlight]
    } // [!code highlight]
});
```

### الحفاظ على الجلسات

عند إبطال جلسة، ستُزال من التخزين الثانوي، لكن إذا فعّلت `preserveSessionInDatabase`، فسيُحتفظ بصف الجلسة في قاعدة البيانات بدلًا من حذفه. يُعلَّم الصف المحفوظ كمنتهٍ (تُضبط `expiresAt` الخاصة به على وقت الإبطال)، لذا لا يُستعاد أبدًا كجلسة حية وتُعامَل أي رموز مرتبطة به (مثل رموز وصول مزوّد OAuth) كمنتهية.

يفيد هذا إذا أردت تتبّع الجلسات التي أُبطِلت.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    secondaryStorage: { /** your secondary storage implementation here */ },
    session: { // [!code highlight]
        preserveSessionInDatabase: true, // [!code highlight]
    } // [!code highlight]
});
```

## إدارة الجلسات عديمة الحالة

تدعم Better Auth إدارة الجلسات عديمة الحالة دون أي قاعدة بيانات. وهذا يعني أن بيانات الجلسة تُخزَّن في كوكي موقّع/مشفّر ولا يستعلم الخادم أبدًا من قاعدة بيانات للتحقق من صحة الجلسات - بل يتحقق فقط من توقيع الكوكي ويفحص انتهاء الصلاحية.

### الإعداد الأساسي عديم الحالة

إذا لم تمرّر إعداد قاعدة بيانات، فستفعّل Better Auth تلقائيًا الوضع عديم الحالة.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    // No database configuration
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});
```

لتفعيل الوضع عديم الحالة يدويًا، تحتاج إلى تهيئة `cookieCache` و`account` بالخيارات التالية:

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
            strategy: "jwe", // can be "jwe", "jwt" or "compact"
            refreshCache: true, // Enable stateless refresh
        },
    },
    account: {
        storeStateStrategy: "cookie",
        storeAccountCookie: true, // Store provider account data after OAuth flow in an encrypted cookie
    }
});
```

::: {note}
إذا لم توفّر قاعدة بيانات، نوفّر لك الإعداد أعلاه افتراضيًا.
:::

في تدفقات OAuth عديمة الحالة، يخزّن `storeAccountCookie` بيانات حساب المزوّد، بما في ذلك مادة رمز OAuth، في كوكي `account_data` المشفّر. ويمكن لـ `getAccessToken({ useAccountCookie: true })` تحديث رموز وصول المزوّد المنتهية الصلاحية عندما يحتوي كوكي الحساب على رمز تحديث وانتهاء صلاحية معروف لرمز الوصول. وتضبط استجابات تحديث الرموز كوكي حساب محدَّثًا، لذا يجب على التكاملات من جهة الخادم تمرير ترويسة `Set-Cookie` المُعادة إلى المتصفح.

تقسّم Better Auth كوكيز الحساب المفرطة الحجم إلى أجزاء، لكن قد تفرض المتصفحات والوسطاء حدودًا إجمالية للكوكيز أو الترويسات. استخدم تخزين الحساب المدعوم بقاعدة بيانات للمزوّدين الذين يصدرون رموز JWT كبيرة أو لتدفقات الإنتاج التي تحتاج إلى تخزين رموز دائم.

### فهم `refreshCache`

يتحكم خيار `refreshCache` في التحديث التلقائي للكوكي **قبل انتهاء الصلاحية** دون الاستعلام من أي قاعدة بيانات:

* **`false`** (افتراضي): لا يوجد تحديث تلقائي. وعندما ينتهي التخزين المؤقت للكوكيز (يصل إلى `maxAge`)، سيحاول الجلب من قاعدة البيانات إن كانت متاحة.
* **`true`**: تفعيل التحديث التلقائي بالإعدادات الافتراضية. يحدّث عند بلوغ 80% من `maxAge` (تبقّي 20% من الوقت).
* **`object`**: إعداد تحديث مخصّص بخاصية `updateAge`.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 300, // 5 minutes
            refreshCache: {
                updateAge: 60 // Refresh when 60 seconds remain before expiry
            }
        }
    }
});
```

### إصدار الجلسات عديمة الحالة

من أكبر مساوئ الجلسات عديمة الحالة أنه لا يمكنك إبطال الجلسة بسهولة. لحل ذلك مع Better Auth، إذا أردت إبطال جميع الجلسات، يمكنك تغيير إصدار التخزين المؤقت للكوكيز وإعادة نشر تطبيقك.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    session: {
        cookieCache: {
            version: "2", // [!code highlight] Change the version to invalidate all sessions
        }
    }
});
```

::: {warning}
سيؤدي هذا إلى إبطال جميع الجلسات التي لا تطابق الإصدار الجديد.
:::

### عديم الحالة مع التخزين الثانوي

يمكنك الجمع بين الجلسات عديمة الحالة والتخزين الثانوي (Redis، إلخ) للحصول على أفضل ما في العالمين:

```ts title="auth.ts"
import { betterAuth } from "better-auth"
import { redis } from "./redis"

export const auth = betterAuth({
    // No primary database needed
    secondaryStorage: {
        get: async (key) => await redis.get(key),
        set: async (key, value, ttl) => await redis.set(key, value, "EX", ttl),
        delete: async (key) => await redis.del(key)
    },
    session: {
        cookieCache: {
            maxAge: 5 * 60, // [!code highlight] 5 minutes (short-lived cookie)
            refreshCache: false // [!code highlight] Disable stateless refresh
        }
    }
});
```

هذا الإعداد:

* يستخدم الكوكيز للتحقق من الجلسة (دون استعلامات قاعدة بيانات)
* يستخدم Redis لتخزين بيانات الجلسة وتحديث التخزين المؤقت للكوكيز قبل انتهاء الصلاحية
* يمكنك إبطال الجلسات من التخزين الثانوي وسيُبطَل التخزين المؤقت للكوكيز عند التحديث

## تخصيص استجابة الجلسة

عند استدعاء `getSession` أو `useSession`، تُعاد بيانات الجلسة ككائنَي `user` و`session`. يمكنك تخصيص هذه الاستجابة باستخدام إضافة `customSession`.

```ts title="auth.ts"
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
    plugins: [
        customSession(async ({ user, session }) => {
            const roles = findUserRoles(session.session.userId);
            return {
                roles,
                user: {
                    ...user,
                    newField: "newField",
                },
                session
            };
        }),
    ],
});
```

سيضيف هذا `roles` و`user.newField` إلى استجابة الجلسة.

**الاستدلال على العميل**

```ts title="auth-client.ts"
import { customSessionClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth"; // Import the auth instance as a type

const authClient = createAuthClient({
    plugins: [customSessionClient<typeof auth>()],
});

const { data } = authClient.useSession();
const { data: sessionData } = await authClient.getSession();
// data.roles
// data.user.newField
```

### تحذيرات بشأن تخصيص استجابة الجلسة

1. لا يستدلّ كائن `session` المُمرَّر إلى دالة الاستدعاء على الحقول التي تضيفها الإضافات.

ومع ذلك، كحل بديل، يمكنك رفع خيارات auth الخاصة بك وتمريرها إلى الإضافة للاستدلال على الحقول.

```ts
import { betterAuth, BetterAuthOptions } from "better-auth";

const options = {
  //...config options
  plugins: [
    //...plugins 
  ]
} satisfies BetterAuthOptions;

export const auth = betterAuth({
    ...options,
    plugins: [
        ...(options.plugins ?? []),
        customSession(async ({ user, session }, ctx) => {
            // now both user and session will infer the fields added by plugins and your custom fields
            return {
                user,
                session
            }
        }, options), // pass options here  // [!code highlight]
    ]
})
```

2. عندما يكون كود الخادم والعميل في مشروعين أو مستودعين منفصلين، ولا يمكنك استيراد نسخة `auth` كمرجع نوع، فلن يعمل استدلال الأنواع لحقول الجلسة المخصّصة على جانب العميل.
3. لا يشمل التخزين المؤقت للجلسة، بما في ذلك التخزين الثانوي أو التخزين المؤقت للكوكيز، الحقول المخصّصة. وفي كل مرة تُجلَب فيها الجلسة، ستُستدعى دالة الجلسة المخصّصة الخاصة بك.

**تعديل نقطة النهاية list-device-sessions**
تُستخدم نقطة النهاية `/multi-session/list-device-sessions` من إضافة [multi-session](https://better-auth.com/docs/plugins/multi-session) لسرد الأجهزة المسجَّل فيها دخول المستخدم.

يمكنك تعديل استجابة نقطة النهاية هذه بتمرير خيار `shouldMutateListDeviceSessionsEndpoint` إلى إضافة `customSession`.

افتراضيًا، لا نعدّل استجابة نقطة النهاية هذه.

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
    plugins: [
        customSession(async ({ user, session }, ctx) => {
            return {
                user,
                session
            }
        }, {}, { shouldMutateListDeviceSessionsEndpoint: true }), // [!code highlight]
    ],
});
```
