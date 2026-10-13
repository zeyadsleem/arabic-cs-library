---
title: "الإضافات"
lang: ar
chapter: concepts
slug: plugins
order: 30
source: https://better-auth.com/docs/concepts/plugins
---

# الإضافات (/docs/concepts/plugins)

تعرّف على كيفية استخدام إضافات Better Auth وإنشائها، بما في ذلك تعريف نقاط النهاية والمخططات والخطافات والوسيطات وحدود المعدل والأصول الموثوقة، وبناء إضافات العميل بإجراءات وذرات مخصصة.

تُعدّ الإضافات جزءًا أساسيًا من Better Auth، فهي تتيح لك توسيع الوظائف الأساسية. يمكنك استخدامها لإضافة طرق مصادقة جديدة أو ميزات أو تخصيص السلوكيات.

تأتي Better Auth بالعديد من الإضافات المدمجة الجاهزة للاستخدام. راجع قسم الإضافات للحصول على التفاصيل. يمكنك أيضًا إنشاء إضافاتك الخاصة.

## استخدام إضافة

قد تكون الإضافة إضافة من جهة الخادم أو إضافة من جهة العميل أو كليهما.

لإضافة إضافة على الخادم، ضمّنها في مصفوفة `plugins` في إعداد المصادقة لديك. ستُهيَّأ الإضافة بالخيارات المقدَّمة.

```ts title="server.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    plugins: [
        // Add your plugins here
    ]
});
```

تُضاف إضافات العميل عند إنشاء العميل. تتطلب معظم الإضافات وجود إضافتَي الخادم والعميل معًا لتعمل بشكل صحيح.
يستخدم عميل مصادقة Better Auth في الواجهة الأمامية الدالة `createAuthClient` الموفَّرة من `better-auth/client`.

```ts title="auth-client.ts"
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient({
    plugins: [
        // Add your client plugins here
    ]
});
```

نوصي بإبقاء auth-client وكائن المصادقة العادي لديك في ملفين منفصلين.

`server.ts`

`auth-client.ts`

## إنشاء إضافة

للبدء، ستحتاج إلى إضافة من جهة الخادم.
تُعدّ إضافات الخادم العمود الفقري لكل الإضافات، بينما توجد إضافات العميل لتوفير واجهة مع واجهات برمجة التطبيقات الأمامية للتعامل بسهولة مع إضافات الخادم لديك.

::: {note}
إذا كانت إضافات الخادم لديك تحتوي على نقاط نهاية يجب استدعاؤها من العميل، فستحتاج أيضًا إلى إنشاء إضافة عميل.
:::

### ماذا يمكن للإضافة أن تفعل؟

* إنشاء نقاط نهاية `endpoint` مخصّصة لتنفيذ أي إجراء تريده.
* توسيع جداول قاعدة البيانات باستخدام `schemas` مخصّصة.
* استخدام `middleware` لاستهداف مجموعة من المسارات باستخدام مُطابِق المسارات الخاص به، بحيث يعمل فقط عند استدعاء تلك المسارات عبر طلب.
* استخدام `hooks` لاستهداف مسار أو طلب معيّن. وإذا أردت تشغيل الخطاف حتى عند استدعاء نقطة النهاية مباشرةً.
* استخدام `onRequest` أو `onResponse` إذا أردت تنفيذ شيء يؤثر على جميع الطلبات أو الاستجابات.
* إنشاء قاعدة `rate-limit` مخصّصة.

## إنشاء إضافة خادم

لإنشاء إضافة خادم، عليك تمرير كائن يحقق واجهة `BetterAuthPlugin`.

الخاصية الوحيدة المطلوبة هي `id`، وهي معرّف فريد للإضافة.
يمكن لإضافتَي الخادم والعميل استخدام المعرّف `id` نفسه.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

export const myPlugin = () => {
    return {
        id: "my-plugin",
    } satisfies BetterAuthPlugin
}
```

::: {note}
لا يتعيّن عليك جعل الإضافة دالة، لكن يُوصى بذلك. بهذه الطريقة يمكنك تمرير خيارات إلى الإضافة، ويكون ذلك متسقًا مع الإضافات المدمجة.
:::

### تسجيل نوع إضافة

يمكن للإضافات القابلة لإعادة الاستخدام توسيع `BetterAuthPluginRegistry` بحيث تُعيد `getPlugin()` نوعها الدقيق. يجب أن يطابق مفتاح السجل قيمة `id` الخاصة بالإضافة:

```ts title="plugin.ts"
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "my-plugin": {
      creator: typeof myPlugin;
    };
  }
}
```

يؤثر هذا على TypeScript فقط. لا يزال يتعيّن على المستخدمين إضافة الإضافة إلى مصفوفة `plugins` الخاصة بهم في وقت التشغيل.

::: {note}
إذا نشرت الإضافة كحزمة منفصلة، فأعلن `@better-auth/core` كتبعية نظيرة (peer dependency) بنفس نطاق الإصدارات المدعوم من `better-auth`.
:::

### نقاط النهاية

لإضافة نقاط نهاية إلى الخادم، يمكنك تمرير `endpoints` الذي يتطلب كائنًا يكون المفتاح فيه أي `string` والقيمة فيه `AuthEndpoint`.

لإنشاء نقطة نهاية للمصادقة، ستحتاج إلى استيراد `createAuthEndpoint` من `better-auth`.

تغلّف Better Auth مكتبة أخرى تُسمى [Better Call](https://github.com/bekacru/better-call) لإنشاء نقاط النهاية. وBetter Call هو إطار عمل ويب بسيط بلغة ts من صنع الفريق نفسه الذي يقف خلف Better Auth.

```ts title="plugin.ts"
import { createAuthEndpoint } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth";

const myPlugin = () => {
    return {
        id: "my-plugin",
        endpoints: {
            getHelloWorld: createAuthEndpoint("/my-plugin/hello-world", {
                method: "GET",
            }, async(ctx) => {
                return ctx.json({
                    message: "Hello World"
                })
            })
        }
    } satisfies BetterAuthPlugin
}
```

تغلّف دالة إنشاء نقاط نهاية المصادقة `createEndpoint` من Better Call. داخل كائن `ctx`، ستوفّر كائنًا آخر يُسمى `context` يتيح لك الوصول إلى سياقات خاصة بـ better-auth تشمل `options` و`db` و`baseURL` وغيرها.

**كائن السياق**

* `appName`: اسم التطبيق. القيمة الافتراضية هي "Better Auth".
* `options`: الخيارات الممرَّرة إلى كائن Better Auth.
* `tables`: تعريف الجداول الأساسية. وهو كائن يكون فيه اسم الجدول هو المفتاح وتعريف المخطط هو القيمة.
* `baseURL`: عنوان baseURL الخاص بخادم المصادقة. ويتضمّن المسار. على سبيل المثال، إذا كان الخادم يعمل على `http://localhost:3000`، فسيكون baseURL هو `http://localhost:3000/api/auth` افتراضيًا ما لم يغيّره المستخدم.
* `session`: إعداد الجلسة. ويتضمّن قيمتَي `updateAge` و`expiresIn`.
* `secret`: المفتاح السري المستخدم لأغراض متعددة. ويُحدّده المستخدم.
* `authCookie`: إعداد الكوكي الافتراضي لكوكيز المصادقة الأساسية.
* `logger`: كائن المسجِّل (logger) المستخدم من قِبل Better Auth.
* `db`: كائن Kysely الذي تستخدمه Better Auth للتفاعل مع قاعدة البيانات.
* `adapter`: هذا هو نفسه db لكنه يمنحك دوالًا شبيهة بـ `orm` للتفاعل مع قاعدة البيانات. (نوصي باستخدام هذا بدلًا من `db` ما لم تكن بحاجة إلى استعلامات SQL الخام أو لأسباب تتعلق بالأداء)
* `internalAdapter`: نداءات قاعدة بيانات داخلية تستخدمها Better Auth. على سبيل المثال، يمكنك استخدام هذه النداءات لإنشاء جلسة بدلًا من استخدام `adapter` مباشرةً. `internalAdapter.createSession(userId)`
* `createAuthCookie`: دالة مساعدة تتيح لك الحصول على `name` الكوكي و`options` إما لـ `set` أو `get` الكوكيز. وتطبّق أشياء مثل البادئة `__Secure-` للكوكيز بناءً على ما إذا كان الاتصال آمنًا (HTTPS) أو كان التطبيق يعمل في وضع الإنتاج.
* `trustedOrigins`: قائمة الأصول الموثوقة التي حدّدتها عبر `options.trustedOrigins`.
* `isTrustedOrigin`: دالة مساعدة تتيح لك التحقق سريعًا مما إذا كان عنوان url أو مسار معيّن موثوقًا بناءً على إعداد الأصول الموثوقة.

لمعرفة الخصائص الأخرى، يمكنك مراجعة توثيق [Better Call](https://github.com/bekacru/better-call) و[الشيفرة المصدرية](https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/context/create-context.ts).

**قواعد نقاط النهاية**

* تأكد من استخدام kebab-case لمسار نقطة النهاية
* تأكد من استخدام طريقتي `POST` أو `GET` فقط لنقاط النهاية.
* أي دالة تعدّل البيانات ينبغي أن تكون طريقة `POST`.
* أي دالة تجلب البيانات ينبغي أن تكون طريقة `GET`.
* تأكد من استخدام الدالة `createAuthEndpoint` لإنشاء نقاط نهاية API.
* تأكد من أن مساراتك فريدة لتجنّب التعارض مع الإضافات الأخرى. إذا كنت تستخدم مسارًا شائعًا، فأضف اسم الإضافة كبادئة للمسار. (`/my-plugin/hello-world` بدلًا من `/hello-world`.)

### المخطط

يمكنك تعريف مخطط قاعدة بيانات لإضافتك بتمرير كائن `schema`. وينبغي أن يكون اسم الجدول هو المفتاح وتعريف المخطط هو القيمة في كائن المخطط.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

const myPlugin = () => {
    return {
        id: "my-plugin",
        schema: {
            myTable: {
                fields: {
                    name: {
                        type: "string"
                    }
                },
                modelName: "myTable" // optional if you want to use a different name than the key
            }
        }
    } satisfies BetterAuthPlugin
}
```

**الحقول**

بشكل افتراضي، ستنشئ better-auth حقل `id` لكل جدول. يمكنك إضافة حقول إضافية إلى الجدول بإضافتها إلى كائن `fields`.

المفتاح هو اسم العمود والقيمة هي تعريف العمود. ويمكن أن يحتوي تعريف العمود على الخصائص التالية:

`type`: نوع الحقل. يمكن أن يكون `string` أو `number` أو `boolean` أو `date`.

`required`: ما إذا كان الحقل مطلوبًا في سجل جديد. (القيمة الافتراضية: `true`)

`unique`: ما إذا كان الحقل فريدًا. (القيمة الافتراضية: `false`)

بالنسبة للفهارس التي تشمل عدة حقول، أضف مصفوفة `indexes` إلى الجدول. تستخدم حقول الفهرس المفاتيح المنطقية للحقول من `fields`، حتى عندما يكون للحقل اسم عمود مخصص في قاعدة البيانات.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

const directoryPlugin = {
  id: "directory",
  schema: {
    directoryUser: {
      fields: {
        connectionId: {
          type: "string",
          fieldName: "connection_id",
        },
        externalId: {
          type: "string",
          fieldName: "external_id",
        },
      },
      indexes: [
        {
          fields: ["connectionId", "externalId"],
          unique: true,
        },
      ],
    },
  },
} satisfies BetterAuthPlugin;
```

يمكن أن يتضمّن كل فهرس حتى 16 حقلًا. اضبط `unique: true` عندما يجب أن تحدّد كل مجموعة حقول صفًا واحدًا على الأكثر. يجب أن يكون كل حقل في فهرس فريد على مستوى الجدول مطلوبًا حتى يظل التعامل مع القيم الفارغة متسقًا عبر قواعد البيانات. يمكنك أيضًا توفير `name` على مستوى المخطط بطول يصل إلى 63 بايت بترميز UTF-8 للتحكم في اسم الفهرس في قاعدة البيانات. يجب أن تبدأ الأسماء بحرف أو شرطة سفلية وأن تحتوي فقط على أحرف وأرقام وشرطات سفلية. وتُقارَن الأسماء دون مراعاة حالة الأحرف ولا يمكن أن تتعارض مع جدول أو فهرس آخر. يتضمّن CLI الفهارس على مستوى الجدول في ترحيلات SQL ومخططات Drizzle أو Prisma المُولَّدة. وينشئها محوّل MongoDB قبل أول كتابة مفهرسة إلى المجموعة.

`references`: ما إذا كان الحقل مرجعًا إلى جدول آخر. (اختياري) ويأخذ كائنًا بالخصائص التالية:

* `model`: اسم الجدول المراد الإشارة إليه.
* `field`: اسم الحقل المراد الإشارة إليه.
* `onDelete`: الإجراء الذي يُتَّخذ عند حذف السجل المُشار إليه. (القيمة الافتراضية: `cascade`)

**خصائص مخطط أخرى**

`disableMigration`: ما إذا كان يجب عدم ترحيل الجدول. (القيمة الافتراضية: `false`)

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

const myPlugin = (opts: PluginOptions) => {
    return {
        id: "my-plugin",
        schema: {
            rateLimit: {
                fields: {
                    key: {
                        type: "string",
                    },
                },
                disableMigration: opts.storage.provider !== "database", // [!code highlight]
            },
        },
    } satisfies BetterAuthPlugin
}
```

إذا أضفت حقولًا إضافية إلى جدول `user` أو `session`، فسيُستنتج الأنواع تلقائيًا في نداءات `getSession` و`signUpEmail`.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

const myPlugin = () => {
    return {
        id: "my-plugin",
        schema: {
            user: {
                fields: {
                    age: {
                        type: "number",
                    },
                },
            },
        },
    } satisfies BetterAuthPlugin
}
```

سيؤدي هذا إلى إضافة حقل `age` إلى جدول `user`، وستضمّن جميع نقاط النهاية التي تُعيد `user` حقل `age` وسيستنتجه typescript بشكل صحيح.

::: {warning}
لا تخزّن معلومات حساسة في جدول `user` أو `session`. أنشئ جدولًا جديدًا إذا كنت بحاجة إلى تخزين معلومات حساسة.
:::

### الخطافات

تُستخدم الخطافات لتشغيل شيفرة قبل تنفيذ إجراء أو بعده، سواء من عميل أو مباشرةً على الخادم. يمكنك إضافة خطافات إلى الخادم بتمرير كائن `hooks` ينبغي أن يحتوي على خاصيتَي `before` و`after`.

```ts title="plugin.ts"
import { createAuthMiddleware } from "better-auth/api";

const myPlugin = () => {
    return {
        id: "my-plugin",
        hooks: {
            before: [{
                    matcher: (context) => {
                        return context.headers.get("x-my-header") === "my-value"
                    },
                    handler: createAuthMiddleware(async (ctx) => {
                        // do something before the request
                        return  {
                            context: ctx // if you want to modify the context
                        }
                    })
                }],
            after: [{
                matcher: (context) => {
                    return context.path === "/sign-up/email"
                },
                handler: createAuthMiddleware(async (ctx) => {
                    return ctx.json({
                        message: "Hello World"
                    }) // if you want to modify the response
                })
            }]
        }
    } satisfies BetterAuthPlugin
}
```

### الوسيطات

يمكنك إضافة وسيطات إلى الخادم بتمرير مصفوفة `middlewares`. ينبغي أن تحتوي هذه المصفوفة على كائنات وسيطة، لكل منها خاصيتا `path` و`middleware`. وعلى عكس الخطافات، لا تعمل الوسيطة إلا على طلبات `api` القادمة من عميل. وإذا استُدعيت نقطة النهاية مباشرةً، فلن تعمل الوسيطة.

يمكن أن يكون `path` إما نصًا أو مُطابِق مسار، باستخدام نظام مطابقة المسارات نفسه المستخدم في `better-call`.

إذا رميت `APIError` من الوسيطة أو أعدت كائن `Response`، فسيُوقف الطلب وستُرسل الاستجابة إلى العميل.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";

const myPlugin = () => {
    return {
        id: "my-plugin",
        middlewares: [
            {
                path: "/my-plugin/hello-world",
                middleware: createAuthMiddleware(async(ctx) => {
                    // do something
                })
            }
        ]
    } satisfies BetterAuthPlugin
}
```

### عند الطلب وعند الاستجابة

إضافةً إلى الوسيطات، يمكنك أيضًا الارتباط مباشرةً قبل إجراء الطلب ومباشرةً بعد إرجاع الاستجابة. ويكون هذا مفيدًا غالبًا إذا أردت تنفيذ شيء يؤثر على جميع الطلبات أو الاستجابات.

#### عند الطلب

تُستدعى الدالة `onRequest` مباشرةً قبل إجراء الطلب. وتأخذ معاملين: كائن `request` و`context`.

وإليك كيف يعمل:

* **المتابعة كالمعتاد**: إذا لم تُعِد أي شيء، فسيستمر الطلب كما هو معتاد.
* **مقاطعة الطلب**: لإيقاف الطلب وإرسال استجابة، أعد كائنًا يحتوي على خاصية `response` تضم كائن `Response`.
* **تعديل الطلب**: يمكنك أيضًا إعادة كائن `request` معدّل لتغيير الطلب قبل إرساله.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

const myPlugin = () => {
    return  {
        id: "my-plugin",
        onRequest: async (request, context) => {
            // do something
        },
    } satisfies BetterAuthPlugin
}
```

#### عند الاستجابة

تُنفَّذ الدالة `onResponse` فور إرجاع الاستجابة. وتأخذ معاملين: كائن `response` و`context`.

وإليك كيفية استخدامها:

* **تعديل الاستجابة**: يمكنك إعادة كائن استجابة معدّل لتغيير الاستجابة قبل إرسالها إلى العميل.
* **المتابعة بشكل طبيعي**: إذا لم تُعِد أي شيء، فستُرسل الاستجابة كما هي.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

const myPlugin = () => {
    return {
        id: "my-plugin",
        onResponse: async (response, context) => {
            // do something
        },
    } satisfies BetterAuthPlugin
}
```

### حد المعدل

يمكنك تعريف قواعد مخصصة لحد المعدل لإضافتك بتمرير مصفوفة `rateLimit`. وينبغي أن تحتوي مصفوفة حد المعدل على مصفوفة من كائنات حد المعدل.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";

const myPlugin = () => {
    return {
        id: "my-plugin",
        rateLimit: [
            {
                pathMatcher: (path) => {
                    return path === "/my-plugin/hello-world"
                },
                limit: 10,
                window: 60,
            }
        ]
    } satisfies BetterAuthPlugin
}
```

### الأصول الموثوقة

إذا كنت تبني إضافات أو نقاط نهاية مخصصة، يمكنك استخدام الدالة `isTrustedOrigin()` المتاحة على سياق المصادقة للتحقق من عناوين URL وفقًا لإعداد الأصول الموثوقة لديك.
يضمن ذلك أن تحترم نقاط النهاية المخصصة لديك إعدادات الأمان نفسها التي تحترمها نقاط النهاية المدمجة في Better Auth.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint, APIError } from "better-auth/api";
import * as z from "zod"

const myPlugin = () => {
    return {
        id: "my-plugin",
        trustedOrigins: [
            "http://trusted.com"
        ],
        endpoints: {
            getTrustedHelloWorld: createAuthEndpoint("/my-plugin/hello-world", {
                method: "GET",
                query: z.object({
                    url: z.string()
                }),
            }, async (ctx) => {
                // The allowRelativePaths option can be used to either allow or disallow relative paths
                if (!ctx.context.isTrustedOrigin(ctx.query.url, { allowRelativePaths: false })) {
                    throw new APIError("FORBIDDEN", {
                        message: "origin is not trusted."
                    });
                }

                return ctx.json({
                    message: "Hello World"
                })
            })
        }
    } satisfies BetterAuthPlugin
}
```

راجع توثيق [الأصول الموثوقة والأمان](https://better-auth.com/docs/reference/security#trusted-origins) لمزيد من المعلومات.

### دوال مساعدة لإضافات الخادم

بعض الدوال المساعدة الإضافية لإنشاء إضافات الخادم.

#### `getSessionFromCtx`

تتيح لك الحصول على بيانات جلسة العميل بتمرير `context` الخاص بوسيطة المصادقة.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware, getSessionFromCtx } from "better-auth/api";

const myPlugin = {
    id: "my-plugin",
    hooks: {
        before: [{
                matcher: (context) => {
                    return context.headers.get("x-my-header") === "my-value"
                },
                handler: createAuthMiddleware(async (ctx) => {
                    const session = await getSessionFromCtx(ctx);
                    // do something with the client's session.

                    return  {
                        context: ctx
                    }
                })
            }],
    }
} satisfies BetterAuthPlugin
```

#### `sessionMiddleware`

وسيطة تتحقق مما إذا كان لدى العميل جلسة صالحة. وإذا كان لدى العميل جلسة صالحة، فستضيف بيانات الجلسة إلى كائن السياق.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint, sessionMiddleware } from "better-auth/api";

const myPlugin = () => {
    return {
        id: "my-plugin",
        endpoints: {
            getHelloWorld: createAuthEndpoint("/my-plugin/hello-world", {
                method: "GET",
                use: [sessionMiddleware], // [!code highlight]
            }, async (ctx) => {
                const session = ctx.context.session;
                return ctx.json({
                    message: "Hello World"
                })
            })
        }
    } satisfies BetterAuthPlugin
}
```

#### `requireResourceOwnership`

وسيطة تُحمّل موردًا بواسطة المعرّف وتتحقق من أنه يخص المستخدم المُصادَق عليه. استخدمها بعد `sessionMiddleware` لنقاط النهاية التي تتعامل مع نماذج يملكها المستخدم.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";
import * as z from "zod";
import {
    createAuthEndpoint,
    requireResourceOwnership,
    sessionMiddleware,
} from "better-auth/api";

const myPlugin = () => {
    return {
        id: "my-plugin",
        endpoints: {
            deleteApiKey: createAuthEndpoint("/my-plugin/delete-api-key", {
                method: "POST",
                body: z.object({
                    id: z.string(),
                }),
                use: [
                    sessionMiddleware,
                    requireResourceOwnership({
                        model: "apiKey",
                        idParam: "id",
                        idSource: "body",
                    }),
                ],
            }, async (ctx) => {
                return ctx.json({ success: true });
            })
        }
    } satisfies BetterAuthPlugin
}
```

استخدم `ownerField` إذا كان نموذجك يخزّن المالك تحت اسم حقل مختلف، و`notFoundError` أو `forbiddenError` إذا أردت إرجاع رموز أخطاء خاصة بالإضافة.

#### `requireOrgRole`

وسيطة تتحقق من أن المستخدم المُصادَق عليه عضو في مؤسسة معيّنة، وأن لديه اختياريًا أحد أدوار مجموعة من الأدوار المسموح بها. استخدمها بعد `sessionMiddleware` لنقاط النهاية المرتبطة بالمؤسسة.

```ts title="plugin.ts"
import type { BetterAuthPlugin } from "better-auth";
import * as z from "zod";
import {
    createAuthEndpoint,
    requireOrgRole,
    sessionMiddleware,
} from "better-auth/api";

const myPlugin = () => {
    return {
        id: "my-plugin",
        endpoints: {
            syncDirectory: createAuthEndpoint("/my-plugin/sync-directory", {
                method: "POST",
                body: z.object({
                    organizationId: z.string(),
                }),
                use: [
                    sessionMiddleware,
                    requireOrgRole({
                        orgIdParam: "organizationId",
                        orgIdSource: "body",
                        allowedRoles: ["admin", "owner"],
                    }),
                ],
            }, async (ctx) => {
                return ctx.json({ success: true });
            })
        }
    } satisfies BetterAuthPlugin
}
```

إذا حُذفت `allowedRoles`، فسيُقبل أي عضو في المؤسسة. ويُصرَّح للأعضاء ذوي الأدوار المتعددة عندما يطابق أي من أدوارهم.

## إنشاء إضافة عميل

إذا كانت نقاط النهاية لديك تحتاج إلى استدعاء من العميل، فستحتاج أيضًا إلى إنشاء إضافة عميل. يمكن لعملاء Better Auth استنتاج نقاط النهاية من إضافات الخادم. كما يمكنك إضافة منطق إضافي من جهة العميل.

```ts title="client-plugin.ts"
import type { BetterAuthClientPlugin } from "better-auth/client";

export const myPluginClient = () => {
    return {
        id: "my-plugin",
    } satisfies BetterAuthClientPlugin
}
```

### واجهة نقاط النهاية

تُستنتج نقاط النهاية من إضافة الخادم بإضافة مفتاح `$InferServerPlugin` إلى إضافة العميل.

يستنتج العميل `path` ككائن ويحوّل kebab-case إلى camelCase. على سبيل المثال، يصبح `/my-plugin/hello-world` هو `myPlugin.helloWorld`.

```ts title="client-plugin.ts"
import type { BetterAuthClientPlugin } from "better-auth/client";
import type { myPlugin } from "./plugin";

const myPluginClient = () => {
    return  {
        id: "my-plugin",
        $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
    } satisfies BetterAuthClientPlugin
}
```

### الحصول على الإجراءات

إذا كنت بحاجة إلى إضافة طرق أو ما شابه إلى العميل، فيمكنك استخدام الدالة `getActions`. وتُستدعى هذه الدالة مع دالة `fetch` من العميل.

تستخدم Better Auth [Better fetch](https://better-fetch.vercel.app) لإجراء الطلبات. وBetter Fetch هو غلاف بسيط حول fetch من إنشاء مؤلف Better Auth نفسه.

```ts title="client-plugin.ts"
import type { BetterAuthClientPlugin } from "better-auth/client";
import type { myPlugin } from "./plugin";
import type { BetterFetchOption } from "@better-fetch/fetch";

const myPluginClient = {
    id: "my-plugin",
    $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
    getActions: ($fetch) => {
        return {
            myCustomAction: async (data: {
                foo: string,
            }, fetchOptions?: BetterFetchOption) => {
                const res = $fetch("/custom/action", {
                    method: "POST",
                    body: {
                        foo: data.foo
                    },
                    ...fetchOptions
                })
                return res
            }
        }
    }
} satisfies BetterAuthClientPlugin
```

::: {note}
كإرشاد عام، تأكد من أن كل دالة تقبل معاملًا واحدًا فقط، مع معامل ثانٍ اختياري هو fetchOptions للسماح للمستخدمين بتمرير خيارات إضافية إلى نداء fetch. وينبغي أن تُعيد الدالة كائنًا يحتوي على مفتاحَي data و error.

إذا كانت حالتك تتضمن إجراءات تتجاوز نداءات API، فلا تتردد في الخروج عن هذه القاعدة.
:::

### الحصول على الذرات

هذا مفيد فقط إذا أردت توفير `hooks` مثل `useSession`.

تُستدعى getAtoms مع دالة `fetch` من better fetch، وينبغي أن تُعيد كائنًا يحتوي على الذرات. وينبغي إنشاء الذرات باستخدام [nanostores](https://github.com/nanostores/nanostores). وستُحلّ الذرات بواسطة خطاف `useStore` الخاص بكل إطار عمل والموفَّر من nanostores.

```ts title="client-plugin.ts"
import { atom } from "nanostores";
import type { BetterAuthClientPlugin } from "better-auth/client";

const myPluginClient = {
    id: "my-plugin",
    $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
    getAtoms: ($fetch) => {
        const myAtom = atom<null>()
        return {
            myAtom
        }
    }
} satisfies BetterAuthClientPlugin
```

راجع الإضافات المدمجة للحصول على أمثلة حول كيفية استخدام الذرات بشكل صحيح.

### طرق المسارات

بشكل افتراضي، تستخدم المسارات المُستنتجة طريقة `GET` إذا لم تكن بحاجة إلى جسم، و`POST` إذا كانت بحاجة إليه. يمكنك تجاوز ذلك بتمرير كائن `pathMethods`. وينبغي أن يكون المفتاح هو المسار، والقيمة هي الطريقة ("POST" | "GET").

```ts title="client-plugin.ts"
import type { BetterAuthClientPlugin } from "better-auth/client";
import type { myPlugin } from "./plugin";

const myPluginClient = {
    id: "my-plugin",
    $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
    pathMethods: {
        "/my-plugin/hello-world": "POST"
    }
} satisfies BetterAuthClientPlugin
```

### إضافات fetch

إذا كنت بحاجة إلى استخدام إضافات better fetch، فيمكنك تمريرها إلى مصفوفة `fetchPlugins`. يمكنك قراءة المزيد عن إضافات better fetch في [توثيق better fetch](https://better-fetch.vercel.app/docs/plugins).

### مستمعو الذرات

هذا مفيد فقط إذا أردت توفير `hooks` مثل `useSession` وأردت الاستماع إلى الذرات وإعادة تقييمها عند تغيّرها.

يمكنك رؤية كيفية استخدام هذا في الإضافات المدمجة.
