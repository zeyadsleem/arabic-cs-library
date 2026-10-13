---
title: "الخطافات"
lang: ar
chapter: concepts
slug: hooks
order: 28
source: https://better-auth.com/docs/concepts/hooks
---

# الخطافات (/docs/concepts/hooks)

تعرّف على كيفية استخدام خطافات before و after لتخصيص سلوك نقاط النهاية (endpoints)، وتعديل الطلبات والاستجابات، والتعامل مع ملفات تعريف الارتباط (cookies)، ورفع الأخطاء، والوصول إلى سياق المصادقة، وتشغيل المهام في الخلفية.

تتيح لك الخطافات في Better Auth "التشبّث" بدورة الحياة وتنفيذ منطق مخصّص. وهي توفّر طريقة لتخصيص سلوك Better Auth دون كتابة إضافة (plugin) كاملة.

::: {note}
نوصي بشدة باستخدام الخطافات إذا كنت تحتاج إلى إجراء تعديلات مخصّصة على نقطة نهاية بدلًا من إنشاء نقطة نهاية أخرى خارج Better Auth.
:::

## خطافات before

تعمل **خطافات before** *قبل* تنفيذ نقطة النهاية. استخدمها لتعديل الطلبات، أو التحقق المسبق من البيانات، أو الإرجاع المبكر.

### مثال: فرض قيد على نطاق البريد الإلكتروني

يضمن هذا الخطاف أن المستخدمين لا يمكنهم التسجيل إلا إذا انتهى بريدهم الإلكتروني بـ `@example.com`:

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== "/sign-up/email") {
                return;
            }
            if (!ctx.body?.email.endsWith("@example.com")) {
                throw new APIError("BAD_REQUEST", {
                    message: "Email must end with @example.com",
                });
            }
        }),
    },
});
```

### مثال: تعديل سياق الطلب

لضبط سياق الطلب قبل المتابعة:

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name: "John Doe",
                        },
                    }
                };
            }
        }),
    },
});
```

## خطافات after

تعمل **خطافات after** *بعد* تنفيذ نقطة النهاية. استخدمها لتعديل الاستجابات.

### مثال: إرسال إشعار إلى قناتك عند تسجيل مستخدم جديد

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { sendMessage } from "@/lib/notification"

export const auth = betterAuth({
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if(ctx.path.startsWith("/sign-up")){
                const newSession = ctx.context.newSession;
                if(newSession){
                    sendMessage({
                        type: "user-register",
                        name: newSession.user.name,
                    })
                }
            }
        }),
    },
});
```

### مثال: التعامل مع عدة نقاط نهاية في خطاف واحد

بما أن `before` و `after` يقبل كل منهما استدعاء `createAuthMiddleware` واحدًا فقط، فاستخدم فحوصات شرطية على `ctx.path` للتعامل مع عدة نقاط نهاية داخل الخطاف نفسه:

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/reset-password") {
                // Auto-login user after password reset
            }
            if (ctx.path.startsWith("/sign-up")) {
                // Send welcome notification after signup
            }
            if (ctx.path === "/sign-in/email") {
                // Track login analytics
            }
        }),
    },
});
```

::: {note}
يأخذ كل خطاف (`before` / `after`) دالة وسيط (middleware) واحدة، وليس مصفوفة. لتشغيل منطق لنقاط نهاية مختلفة، تفرّع حسب `ctx.path` داخل تلك الدالة الواحدة.
:::

## Ctx

عند استدعاء `createAuthMiddleware` يُمرَّر كائن `ctx` يوفّر الكثير من الخصائص المفيدة، ومنها:

* **Path:** `ctx.path` للحصول على مسار نقطة النهاية الحالية.
* **Body:** `ctx.body` للحصول على جسم الطلب المُحلَّل (متاح لطلبات POST).
* **Headers:** `ctx.headers` للوصول إلى ترويسات الطلب.
* **Request:** `ctx.request` للوصول إلى كائن الطلب (قد لا يكون موجودًا في نقاط النهاية الخاصة بالخادم فقط).
* **Query Parameters:** `ctx.query` للوصول إلى معاملات الاستعلام.
* **Context**: `ctx.context` سياق متعلق بالمصادقة، مفيد للوصول إلى الجلسة الجديدة، وإعدادات ملفات تعريف الارتباط الخاصة بالمصادقة، وتجزئة كلمة المرور، والإعدادات...

وغير ذلك.

### الطلب والاستجابة

تتيح لك هذه الأدوات الحصول على معلومات الطلب وإرسال استجابة من داخل الخطاف.

#### استجابات JSON

استخدم `ctx.json` لإرسال استجابات JSON:

```ts
import { createAuthMiddleware } from "better-auth/api";

const hook = createAuthMiddleware(async (ctx) => {
    return ctx.json({
        message: "Hello World",
    });
});
```

#### عمليات إعادة التوجيه

استخدم `ctx.redirect` لإعادة توجيه المستخدمين:

```ts
import { createAuthMiddleware } from "better-auth/api";

const hook = createAuthMiddleware(async (ctx) => {
    throw ctx.redirect("/sign-up/name");
});
```

#### ملفات تعريف الارتباط (Cookies)

* لضبط ملفات تعريف الارتباط: `ctx.setCookie` أو `ctx.setSignedCookie`.
* لقراءة ملفات تعريف الارتباط: `ctx.getCookie` أو `ctx.getSignedCookie`.

مثال:

```ts
import { createAuthMiddleware } from "better-auth/api";

const hook = createAuthMiddleware(async (ctx) => {
    ctx.setCookie("my-cookie", "value");
    await ctx.setSignedCookie("my-signed-cookie", "value", ctx.context.secret, {
        maxAge: 1000,
    });

    const cookie = ctx.getCookie("my-cookie");
    const signedCookie = await ctx.getSignedCookie("my-signed-cookie", ctx.context.secret);
});
```

#### الأخطاء

ارفع الأخطاء باستخدام `APIError` لرمز حالة ورسالة محدّدين:

```ts
import { createAuthMiddleware, APIError } from "better-auth/api";

const hook = createAuthMiddleware(async (ctx) => {
    throw new APIError("BAD_REQUEST", {
        message: "Invalid request",
    });
});
```

### السياق (Context)

يحتوي كائن `ctx` بداخله على كائن `context` آخر مخصّص لاحتواء السياقات المتعلقة بالمصادقة، بما في ذلك جلسة أُنشئت حديثًا في خطاف after، وإعدادات ملفات تعريف الارتباط، وأداة تجزئة كلمة المرور، وما إلى ذلك.

#### الجلسة الجديدة

الجلسة المُنشأة حديثًا بعد تشغيل نقطة النهاية. وهي موجودة فقط في خطاف after.

```ts title="auth.ts"
import { createAuthMiddleware } from "better-auth/api";

createAuthMiddleware(async (ctx) => {
    const newSession = ctx.context.newSession
});
```

#### القيمة المُرجَعة (Returned)

تُمرَّر القيمة المُرجَعة من الخطاف إلى الخطاف التالي في السلسلة.

```ts title="auth.ts"
import { createAuthMiddleware } from "better-auth/api";

createAuthMiddleware(async (ctx) => {
    const returned = ctx.context.returned; //this could be a successful response or an APIError
});
```

#### ترويسات الاستجابة

ترويسات الاستجابة التي تضيفها نقاط النهاية والخطافات التي تعمل قبل هذا الخطاف.

```ts title="auth.ts"
import { createAuthMiddleware } from "better-auth/api";

createAuthMiddleware(async (ctx) => {
    const responseHeaders = ctx.context.responseHeaders;
});
```

#### ملفات تعريف الارتباط المسبقة للمصادقة

الوصول إلى خصائص ملفات تعريف الارتباط المسبقة في BetterAuth:

```ts title="auth.ts"
import { createAuthMiddleware } from "better-auth/api";

createAuthMiddleware(async (ctx) => {
    const cookieName = ctx.context.authCookies.sessionToken.name;
});
```

#### السر (Secret)

يمكنك الوصول إلى `secret` الخاص بنسخة المصادقة لديك عبر `ctx.context.secret`

#### كلمة المرور

يوفّر كائن كلمة المرور `hash` و `verify`

* `ctx.context.password.hash`: يتيح لك تجزئة كلمة مرور معطاة.
* `ctx.context.password.verify`: يتيح لك التحقق من `password` و `hash` معطيين.

#### المحوّل (Adapter)

يعرض المحوّل طرق المحوّل التي يستخدمها Better Auth، بما في ذلك `findOne` و `findMany` و `create` و `delete` و `update` و `updateMany`. وينبغي لك عمومًا استخدام نسخة `db` الفعلية من ORM لديك بدلًا من هذا المحوّل.

#### المحوّل الداخلي

هذه استدعاءات لقاعدة بياناتك تنفّذ إجراءات محدّدة، مثل `createUser` و `createSession` و `updateSession`...

قد يكون استخدامها مفيدًا بدلًا من استخدام قاعدة بياناتك مباشرةً للحصول على وصول إلى `databaseHooks`، ودعم سليم لـ `secondaryStorage`، وما إلى ذلك. إذا كنت تجري استعلامًا مشابهًا لما هو موجود في إجراءات هذا المحوّل الداخلي، فمن الجدير إلقاء نظرة عليه.

#### generateId

يمكنك استخدام `ctx.context.generateId` لتوليد معرّف (Id) لأسباب متنوّعة.

#### runInBackground

يجدول مهمة لتُنفَّذ بعد إرسال الاستجابة. استخدمها لعمليات أطلق وانسَ (fire-and-forget) مثل التنظيف، والتحليلات، وتحديث عدّاد حد المعدل. اضبط المعالج في [advanced.backgroundTasks](https://better-auth.com/docs/reference/options#backgroundtasks).

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          ctx.context.runInBackground(sendAnalyticsEvent(newSession.user.id));
        }
      }
    }),
  },
});
```

#### runInBackgroundOrAwait

يؤجّل المهمة عندما يكون هناك معالج مهيّأ، وإلا فإنه ينتظرها. استخدمها للعمليات التي يجب أن تكتمل (مثل إرسال رسائل البريد الإلكتروني) لكنها تستفيد من عدم الحجب عند وجود معالج. اضبط المعالج في [advanced.backgroundTasks](https://better-auth.com/docs/reference/options#backgroundtasks).

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          await ctx.context.runInBackgroundOrAwait(
            sendWelcomeEmail(newSession.user)
          );
        }
      }
    }),
  },
});
```

## الخطافات القابلة لإعادة الاستخدام

إذا كنت تحتاج إلى إعادة استخدام خطاف عبر عدة نقاط نهاية، ففكّر في إنشاء إضافة (plugin). اعرف المزيد في [Plugins Documentation](https://better-auth.com/docs/concepts/plugins).
