---
title: "تحديد المعدل"
lang: ar
chapter: concepts
slug: rate-limit
order: 31
source: https://better-auth.com/docs/concepts/rate-limit
---

# تحديد المعدل (/docs/concepts/rate-limit)

تعرّف على كيفية تكوين تحديد المعدل في Better Auth، بما في ذلك اكتشاف عنوان IP، ودعم IPv6، ونوافذ تحديد المعدل المخصّصة، وخلفيات التخزين، ومعالجة الأخطاء، والقواعد لكل نقطة نهاية.

يتضمّن Better Auth محدِّد معدل مدمجًا للمساعدة في إدارة حركة المرور ومنع إساءة الاستخدام. تكون محدِّد المعدل افتراضيًا، في وضع الإنتاج، مضبوطًا على:

* النافذة: 10 ثوانٍ
* الحد الأقصى للطلبات: 100 طلب

::: {warning}
لا تتأثر الطلبات من جهة الخادم التي تُجرى باستخدام `auth.api` بتحديد المعدل. تنطبق حدود المعدل فقط على الطلبات التي يبدأها العميل.
:::

يمكنك تخصيص هذه الإعدادات بسهولة عبر تمرير الكائن rateLimit إلى الدالة betterAuth.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    rateLimit: {
        window: 10, // time window in seconds
        max: 100, // max requests in the window
    },
})
```

يكون تحديد المعدل معطّلًا في وضع التطوير افتراضيًا. ولتمكينه، اضبط `enabled` على `true`:

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    rateLimit: {
        enabled: true,
        //...other options
    },
})
```

بالإضافة إلى الإعدادات الافتراضية، يوفّر Better Auth قواعد مخصّصة لمسارات محدّدة. على سبيل المثال:

* `/sign-in/email`: محدود بـ 3 طلبات خلال 10 ثوانٍ.

إضافةً إلى ذلك، تُعرِّف الإضافات أيضًا قواعد مخصّصة لمسارات محدّدة. على سبيل المثال، تمتلك إضافة `twoFactor` قواعد مخصّصة:

* `/two-factor/*`: محدود بـ 3 طلبات خلال 10 ثوانٍ.

تضمن هذه القواعد المخصّصة حماية العمليات الحسّاسة بحدود أكثر صرامة.

## تكوين تحديد المعدل

### عنوان IP المتصل

يستخدم تحديد المعدل عنوان IP المتصل لتتبّع عدد الطلبات التي يجريها المستخدم. الترويسة الافتراضية التي يُتحقق منها هي `x-forwarded-for`، وهي شائعة الاستخدام في بيئات الإنتاج. إذا كنت تستخدم ترويسة مختلفة لتتبّع عنوان IP الخاص بالمستخدم، فستحتاج إلى تحديدها.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    advanced: {
        ipAddress: {
          ipAddressHeaders: ["cf-connecting-ip"], // Cloudflare specific header example
      },
    },
    rateLimit: {
        enabled: true,
        window: 60, // time window in seconds
        max: 100, // max requests in the window
    },
})
```

افتراضيًا، لا يثق Better Auth بسلاسل عناوين IP المُمرَّرة المفصولة بفواصل، لأن الرمز `X-Forwarded-For` الأيسر يتحكّم به العميل خلف وكيل يضيف القيم. خلف وكيل عكسي أو موازن أحمال، افعل أحد ما يلي.

وجّه `ipAddressHeaders` إلى ترويسة موثوقة واحدة يضبطها الوكيل لديك (على سبيل المثال `x-real-ip` أو `cf-connecting-ip`):

```ts title="auth.ts"
export const auth = betterAuth({
    advanced: {
        ipAddress: {
            ipAddressHeaders: ["x-real-ip"],
        },
    },
})
```

أو اذكر وكلاءك في `trustedProxies`. يسير Better Auth في السلسلة من اليمين إلى اليسار، ويتخطّى القفزات الموثوقة، ويأخذ أول عنوان غير موثوق باعتباره العميل:

```ts title="auth.ts"
export const auth = betterAuth({
    advanced: {
        ipAddress: {
            // your proxies' addresses, not a broad private range that also covers clients
            trustedProxies: ["192.0.2.10", "10.0.0.0/24"],
        },
    },
})
```

::: {warning}
يفسّر `trustedProxies` سلسلة الترويسات المُمرَّرة فقط ولا يستطيع التحقق من المُرسل المباشر. أبقِ الأصل (origin) قابلاً للوصول عبر هؤلاء الوكلاء فقط، واجعل كل وكيل يستبدل ترويسات IP المُمرَّرة أو ينقّيها. وإلا فيمكن للعميل ضبط `X-Forwarded-For` مباشرةً وانتحال عنوانه.
:::

#### دعم عناوين IPv6

يقوم Better Auth تلقائيًا بتطبيع عناوين IPv6 لمنع هجمات التجاوز حيث يستخدم المهاجمون تمثيلات مختلفة للعنوان IPv6 نفسه (مثل `2001:db8::1` مقابل `2001:0db8:0000:0000:0000:0000:0000:0001`). يضمن ذلك أن جميع تمثيلات العنوان IPv6 نفسه تُعامَل على أنها نفسها لأغراض تحديد المعدل.

بالإضافة إلى ذلك، تُحوَّل عناوين IPv6 المُعيَّنة إلى IPv4 (مثل `::ffff:192.0.2.1`) تلقائيًا إلى صيغتها IPv4 (`192.0.2.1`) لمنع المهاجمين من تجاوز حدود المعدل عبر التبديل بين تمثيلات IPv4 وIPv6.

#### تحديد المعدل حسب الشبكة الفرعية IPv6

افتراضيًا، تُحدَّد عناوين IPv6 لكل شبكة فرعية `/64`، لا لكل عنوان فردي. يخصّص مزوّدو خدمة الإنترنت ومزوّدو السحابة بادئات IPv6 (عادةً `/64` للمستخدمين السكنيين وفق [RFC 6177](https://datatracker.ietf.org/doc/html/rfc6177)) بدلًا من عناوين مفردة، لذا فإن أي عدّاد لكل عنوان سيسمح لعميل واحد بالتنقل عبر 2^64 من عناوين المصدر دون استنفاد الحد.

يمكنك تجاوز طول البادئة عبر الخيار `ipv6Subnet` إذا كان نشرك يحتاج إلى حدّ تخصيص مختلف:

```ts title="auth.ts"
export const auth = betterAuth({
    //...other options
    advanced: {
        ipAddress: {
            ipv6Subnet: 56, // Rate limit by /56 subnet (residential ISP allocation)
        },
    },
    rateLimit: {
        enabled: true,
        window: 60,
        max: 100,
    },
})
```

أطوال بادئات IPv6 الشائعة:

* `128`: عنوان IPv6 فردي. الأكثر تقييدًا. آمن فقط عندما تتحكّم في الشبكة وتثق بأن كل عنوان يقابل عميلًا مميزًا.
* `64` (الافتراضي): شبكة فرعية /64. التخصيص النموذجي للمنزل أو العمل.
* `56`: شبكة فرعية /56. تخصيص مزوّد خدمة الإنترنت السكني وفق [RFC 6177](https://datatracker.ietf.org/doc/html/rfc6177).
* `48`: شبكة فرعية /48. تخصيص شبكة أكبر.
* `32`: شبكة فرعية /32. تخصيص على مستوى مزوّد خدمة الإنترنت.

يُقبل أي طول بادئة صحيح من `0` إلى `128`؛ والقيم أعلاه هي الأكثر شيوعًا.

::: {note}
يؤثر تكوين الشبكة الفرعية IPv6 على عناوين IPv6 فقط. تُحدَّد عناوين IPv4 دائمًا بشكل فردي.
:::

### نافذة تحديد المعدل

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        window: 60, // time window in seconds
        max: 100, // max requests in the window
    },
})
```

يمكنك أيضًا تمرير قواعد مخصّصة لمسارات محدّدة.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        window: 60, // time window in seconds
        max: 100, // max requests in the window
        customRules: {
            "/sign-in/email": {
                window: 10,
                max: 3,
            },
            "/two-factor/*": async (request)=> {
                // custom function to return rate limit window and max
                return {
                    window: 10,
                    max: 3,
                }
            }
        },
    },
})
```

إذا أردت تعطيل تحديد المعدل لمسار محدّد، يمكنك ضبطه على `false` أو إرجاع `false` من دالة القاعدة المخصّصة.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        customRules: {
            "/get-session": false,
        },
    },
})
```

### التخزين

افتراضيًا، تُخزَّن بيانات تحديد المعدل في الذاكرة، وهو ما قد لا يناسب العديد من حالات الاستخدام، خاصةً في البيئات اللامخدمية (serverless). ولمعالجة ذلك، يمكنك استخدام قاعدة بيانات أو تخزين ثانوي أو تخزين مخصّص لتخزين بيانات تحديد المعدل.

**استخدام قاعدة البيانات**

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        storage: "database",
        modelName: "rateLimit", //optional by default "rateLimit" is used
    },
})
```

تأكّد من تشغيل `migrate` لإنشاء جدول تحديد المعدل في قاعدة بياناتك:
