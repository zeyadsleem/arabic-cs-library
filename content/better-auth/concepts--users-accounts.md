---
title: "المستخدمون والحسابات"
lang: ar
chapter: concepts
slug: users-accounts
order: 34
source: https://better-auth.com/docs/concepts/users-accounts
---

# المستخدمون والحسابات (/docs/concepts/users-accounts)

تعرّف على كيفية إدارة المستخدمين والحسابات، بما في ذلك تحديث معلومات المستخدم، وتغيير عناوين البريد الإلكتروني وكلمات المرور، وحذف المستخدمين مع التحقق، وتشفير الرموز (tokens)، وربط الحسابات وفصلها.

بالإضافة إلى مصادقة المستخدمين، يوفّر Better Auth أيضًا مجموعة من الطرق لإدارة المستخدمين. يشمل ذلك تحديث معلومات المستخدم، وتغيير كلمات المرور، والمزيد.

يخزّن جدول المستخدم بيانات المصادقة الخاصة بالمستخدم [اضغط هنا لعرض المخطط](https://better-auth.com/docs/concepts/database#user).

يمكن توسيع جدول المستخدم باستخدام [حقول إضافية](https://better-auth.com/docs/concepts/database#extending-core-schema) أو عبر الإضافات (plugins) لتخزين بيانات إضافية.

## تحديث المستخدم

### تحديث معلومات المستخدم

لتحديث معلومات المستخدم، يمكنك استخدام الدالة `updateUser` التي يوفّرها العميل (client). تأخذ الدالة `updateUser` كائنًا (object) يحتوي على الخصائص التالية:

```ts
import { authClient } from "@/lib/auth-client"

await authClient.updateUser({
    image: "https://example.com/image.jpg",
    name: "John Doe",
})
```

### تغيير البريد الإلكتروني

للسماح للمستخدمين بتغيير بريدهم الإلكتروني، فعّل أولًا ميزة `changeEmail`، وهي معطّلة افتراضيًا. اضبط `changeEmail.enabled` على `true`:

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { sendEmail } from './email'; // your email sending function

export const auth = betterAuth({
    user: {
        changeEmail: {
            enabled: true,
        }
    },
    emailVerification: {
        // Required to send the verification email
        sendVerificationEmail: async ({ user, url, token }) => {
            void sendEmail({
                to: user.email,
            })
        }
    }
})
```

::: {warning}
تجنّب انتظار (await) إرسال البريد الإلكتروني لمنع هجمات التوقيت (timing attacks). على المنصات بلا خوادم (serverless)، استخدم `waitUntil` أو ما شابه لضمان إرسال البريد.
:::

بشكل افتراضي، عندما يطلب المستخدم تغيير بريده الإلكتروني، يُرسَل بريد تحقق إلى عنوان البريد **الجديد**.
لا يُحدَّث البريد الإلكتروني إلا بعد أن يتحقق المستخدم من البريد الجديد.

#### التأكيد عبر البريد الإلكتروني الحالي

لمزيد من الأمان، يمكنك مطالبة المستخدمين بتأكيد التغيير عبر بريدهم الإلكتروني **الحالي** قبل
إرسال بريد التحقق إلى العنوان الجديد. للقيام بذلك، وفّر الدالة `sendChangeEmailConfirmation`.

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { sendEmail } from './email'; // your email sending function

export const auth = betterAuth({
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailConfirmation: async ({ user, newEmail, url, token }, request) => { 
                void sendEmail({
                    to: user.email, // Sent to the CURRENT email
                    subject: 'Approve email change',
                    text: `Click the link to approve the change to ${newEmail}: ${url}`
                })
            }
        }
    },
    // ...
})
```

#### التحديث دون تحقق

إذا أردت السماح للمستخدمين بتحديث بريدهم الإلكتروني فورًا دون تحقق (فقط إذا كان بريدهم الحالي **غير** مُتحقَّق منه)، يمكنك تفعيل `updateEmailWithoutVerification`.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    user: {
        changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true
        }
    }
})
```

::: {warning}
إذا كانت `updateEmailWithoutVerification` تساوي false (وهو الافتراضي)، فلن يُحدَّث البريد الإلكتروني حتى يتم التحقق من البريد الجديد، حتى لو كان البريد الحالي غير مُتحقَّق منه.
:::

#### الاستخدام من جانب العميل

استخدم الدالة `changeEmail` على العميل لبدء العملية.

```ts
import { authClient } from "@/lib/auth-client"

await authClient.changeEmail({
    newEmail: "new-email@email.com",
    callbackURL: "/dashboard", // to redirect after verification
});
```

### تغيير كلمة المرور

لا تُخزَّن كلمة مرور المستخدم في جدول المستخدم. بدلًا من ذلك، تُخزَّن في جدول الحساب. لتغيير كلمة مرور مستخدم، يمكنك استخدام أحد الأساليب التالية:

**نقطة النهاية:** `POST /change-password`

### جانب العميل

```ts
const { data, error } = await authClient.changePassword({
    newPassword: "newpassword1234", // required, The new password to set
    currentPassword: "oldpassword1234", // required, The current user password
    revokeOtherSessions: true, // When set to true, all other active sessions for this user will be invalidated
});
```

### جانب الخادم

```ts
const data = await auth.api.changePassword({
    body: {
        newPassword: "newpassword1234", // required, The new password to set
        currentPassword: "oldpassword1234", // required, The current user password
        revokeOtherSessions: true, // When set to true, all other active sessions for this user will be invalidated
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
```

### تعريف النوع

```ts
type changePassword = {
    /**
     * The new password to set 
     */
    newPassword: string = "newpassword1234"
    /**
     * The current user password 
     */
    currentPassword: string = "oldpassword1234"
    /**
     * When set to true, all other active sessions for this user will be invalidated
     */
    revokeOtherSessions?: boolean = true
}
```

### تعيين كلمة المرور

إذا سُجّل مستخدم باستخدام OAuth أو مزوّدين آخرين، فلن يكون لديه كلمة مرور أو حساب بيانات اعتماد. في هذه الحالة، يمكنك استخدام إجراء `setPassword` لتعيين كلمة مرور للمستخدم. لأسباب أمنية، لا يمكن استدعاء هذه الدالة إلا من الخادم. نوصي بجعل المستخدمين يمرّون عبر تدفق "نسيت كلمة المرور" لتعيين كلمة مرور لحسابهم.

```ts title="set-password.ts"
import { auth } from "@/lib/auth"

await auth.api.setPassword({
    body: {
        newPassword: "new-password",
    },
    headers: await headers() // headers containing the user's session token
});
```

### التحقق من كلمة المرور

تتيح لك الدالة `verifyPassword` التحقق من كلمة المرور الحالية للمستخدم. هذا مفيد لتأكيد هوية المستخدم قبل تنفيذ عمليات حساسة مثل تحديث إعدادات الأمان. لا يمكن استدعاء هذه الدالة إلا من الخادم.

```ts title="verify-password.ts"
import { auth } from "@/lib/auth"

await auth.api.verifyPassword({
    body: {
        password: "user-password" // required
    },
    headers: await headers() // headers containing the user's session token
});
```

::: {note}
بالنسبة إلى مستخدمي OAuth الذين لا يملكون كلمات مرور، فكّر بدلًا من ذلك في استخدام التحقق عبر البريد الإلكتروني أو فحوصات الجلسة الحديثة (fresh session) للعمليات الحساسة.
:::

## حذف المستخدم

يوفّر Better Auth أداة لحذف مستخدم نهائيًا من قاعدة بياناتك. وهي معطّلة افتراضيًا، لكن يمكنك تفعيلها بسهولة بتمرير `enabled:true`

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other config
    user: {
        deleteUser: { // [!code highlight]
            enabled: true // [!code highlight]
        } // [!code highlight]
    }
})
```

بمجرد التفعيل، يمكنك استدعاء `authClient.deleteUser` لحذف بيانات المستخدم نهائيًا من قاعدة بياناتك.

### إضافة التحقق قبل الحذف

لمزيد من الأمان، سترغب على الأرجح في تأكيد نية المستخدم قبل حذف حسابه. من الأساليب الشائعة إرسال بريد تحقق. يوفّر Better Auth أداة `sendDeleteAccountVerification` لهذا الغرض.
وهذا مطلوب بشكل خاص إذا كان لديك إعداد OAuth وتريد تمكين المستخدمين من حذف حساباتهم دون إجبارهم على تسجيل الدخول مجددًا للحصول على جلسة حديثة.

إليك كيفية إعداد ذلك:

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    user: {
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async (
                {
                    user,   // The user object
                    url, // The auto-generated URL for deletion
                    token  // The verification token  (can be used to generate custom URL)
                },
                request  // The original request object (optional)
            ) => {
                // Your email sending logic here
                // Example: sendEmail(data.user.email, "Verify Deletion", data.url);
            },
        },
    },
});
```

**كيف يعمل التحقق عبر الاستدعاء الراجع (callback):**

* **عنوان URL للاستدعاء الراجع**: عنوان URL المقدَّم في `sendDeleteAccountVerification` هو رابط مُولَّد مسبقًا يحذف بيانات المستخدم عند الوصول إليه.

```ts
import { authClient } from "@/lib/auth-client"

await authClient.deleteUser({
    callbackURL: "/goodbye" // you can provide a callback URL to redirect after deletion
});
```

* **فحص المصادقة**: يجب أن يكون المستخدم مسجّلًا في الحساب الذي يحاول حذفه.
  إذا لم يكن مسجّلًا، ستفشل عملية الحذف.

إذا أرسلت عنوان URL مخصصًا، يمكنك استخدام طريقة `deleteUser` مع الرمز (token) لحذف المستخدم.

```ts
import { authClient } from "@/lib/auth-client"

await authClient.deleteUser({
    token
});
```

### متطلبات المصادقة

لحذف مستخدم، يجب أن يستوفي المستخدم أحد المتطلبات التالية:

1. كلمة مرور صالحة

إذا كان لدى المستخدم كلمة مرور، فيمكنه حذف حسابه بتقديم كلمة المرور.

```ts
import { authClient } from "@/lib/auth-client"

await authClient.deleteUser({
    password: "password"
});
```

2. جلسة حديثة

يجب أن يمتلك المستخدم رمز جلسة `fresh`، بمعنى أنه يجب أن يكون قد سجّل الدخول مؤخرًا. يُفحَص هذا إذا لم تُقدَّم كلمة المرور.

::: {warning}
بشكل افتراضي، تُضبط `session.freshAge` على `60 * 60 * 24` (يوم واحد). يمكنك تغيير هذه القيمة بتمرير كائن `session` إلى تكوين `auth`. إذا ضُبطت على `0`، يُعطَّل فحص الحداثة. يُوصى بعدم تعطيل هذا الفحص إذا لم تكن تستخدم التحقق عبر البريد الإلكتروني لحذف الحساب.
:::

```ts
import { authClient } from "@/lib/auth-client"

await authClient.deleteUser();
```

3. التحقق عبر البريد الإلكتروني المفعَّل (مطلوب لمستخدمي OAuth)

نظرًا لأن مستخدمي OAuth لا يملكون كلمة مرور، نحتاج إلى إرسال بريد تحقق لتأكيد نية المستخدم في حذف حسابه. إذا كنت قد أضفت بالفعل الاستدعاء الراجع `sendDeleteAccountVerification`، فيمكنك ببساطة استدعاء طريقة `deleteUser` دون تقديم أي معلومات أخرى.

```ts
import { authClient } from "@/lib/auth-client"

await authClient.deleteUser();
```

4. إذا كانت لديك صفحة مخصصة لحذف الحساب وأرسلت عنوان URL ذلك عبر الاستدعاء الراجع `sendDeleteAccountVerification`.
   فحينئذٍ تحتاج إلى استدعاء طريقة `deleteUser` مع الرمز لإكمال الحذف.

```ts
import { authClient } from "@/lib/auth-client"

await authClient.deleteUser({
    token
});
```

### الاستدعاءات الراجعة (Callbacks)

**validateUserInfo**: بوّابة تحدّد الهويات التي يقبلها Better Auth. تُستدعى قبيل إنشاء مستخدم (`create-user`) أو ربط حساب مزوّد جديد (`link-account`)، ولكل طريقة مصادقة (OAuth، وOIDC SSO، وSAML SSO، والبريد الإلكتروني/كلمة المرور، والرابط السحري (magic link)، وOTP عبر البريد الإلكتروني، والمجهول (anonymous)، وSIWE، ورقم الهاتف، والمستخدمين المنشأين من قِبل المشرف، وSCIM)، بما في ذلك الإعدادات بلا حالة (stateless) التي لا تملك قاعدة بيانات دائمة، بحيث تبقى السياسة في مكان واحد بدلًا من كل مزوّد على حدة.

تُستدعى أيضًا عندما يسجّل مستخدم **OAuth أو SSO** موجود الدخول مجددًا (`sign-in`)، وهناك تتلقّى البريد الإلكتروني والملف الشخصي *الحديثين* من المزوّد بدلًا من الصف المخزَّن. يتيح ذلك لسياسة نطاق أو مؤسسة رفض مستخدم تحرّكت هوية مزوّده خارج الحدود المسموح بها (على سبيل المثال، بريد إلكتروني خرج من النطاق المسموح). لا يُعاد التحقق من تسجيلات الدخول العائدة من غير المزوّدين، لأن صفّهم المخزَّن لم يتغيّر منذ أن بوّبته `create-user`؛ استخدم أدوات الحظر في إضافة المشرف (admin plugin) أو خطاف `databaseHooks.session.create.before` لحجب هؤلاء.

`source.action` هو `"create-user"` أو `"link-account"` أو `"sign-in"`، و`source.method` هو طريقة المصادقة. بالنسبة إلى OAuth، يحمل `source.oauth` معرّف المزوّد وملفه الشخصي الخام. بالنسبة إلى OIDC وSAML SSO، يحمل `source.sso` معرّف مزوّد SSO ومطالبات المزوّد الخام أو سمات التأكيد (assertion attributes).

لا تُرجع شيئًا للسماح بالتزويد. أرجِع كائنًا يحتوي على `error` لرفضه: ترسل تدفقات المتصفح/إعادة التوجيه الرفض إلى عنوان URL المكوَّن للخطأ، بينما تُرجع التدفقات البرمجية خطأ `403` من واجهة API. تجنّب وضع تفاصيل حساسة في `errorDescription` لأنه يُعاد إلى العميل.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    user: {
        validateUserInfo: ({ user, source }) => {
            if (!user.email?.endsWith("@example.com")) {
                return {
                    error: "email_not_allowed",
                    errorDescription: "Use your example.com email to sign in",
                };
            }

            if (
                source.oauth?.providerId === "company-oauth" &&
                source.oauth?.profile?.hd !== "example.com"
            ) {
                return {
                    error: "invalid_organization",
                    errorDescription: "Use your company OAuth account",
                };
            }
        },
    },
});
```

::: {note}
`validateUserInfo` هي بوّابة السياسة عالية المستوى. يظل خطاف `databaseHooks.user.create.before` الأقل مستوى يعمل بعدها لتشكيل البيانات ويمكنه أيضًا إلغاء الكتابة؛ استخدمه عندما تحتاج إلى تعديل السجل بدلًا من قبول الهوية أو رفضها.
:::

**beforeDelete**: يُستدعى هذا الاستدعاء الراجع قبل حذف المستخدم. يمكنك استخدامه لتنفيذ أي تنظيف أو فحوصات إضافية قبل حذف المستخدم.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    user: {
        deleteUser: {
            enabled: true,
            beforeDelete: async (user) => {
                // Perform any cleanup or additional checks here
            },
        },
    },
});
```

يمكنك أيضًا رفع `APIError` لمقاطعة عملية الحذف.

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";

export const auth = betterAuth({
    user: {
        deleteUser: {
            enabled: true,
            beforeDelete: async (user, request) => {
                if (user.email.includes("admin")) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Admin accounts can't be deleted",
                    });
                }
            },
        },
    },
});
```

**afterDelete**: يُستدعى هذا الاستدعاء الراجع بعد حذف المستخدم. يمكنك استخدامه لتنفيذ أي تنظيف أو إجراءات إضافية بعد حذف المستخدم.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    user: {
        deleteUser: {
            enabled: true,
            afterDelete: async (user, request) => {
                // Perform any cleanup or additional actions here
            },
        },
    },
});
```

## الحسابات

يدعم Better Auth طرق مصادقة متعددة عبر مزوّدين مثل البريد الإلكتروني وكلمة المرور، وGoogle، أو مزوّد هوية مؤسسي. تُخزَّن كل طريقة مرتبطة بمستخدم كحساب.

يمتلك الحساب معرّف سجل محلي وهوية مزوّد. يحدّد `id` سجل حساب Better Auth وهو القيمة التي تُمرَّر كـ`accountId` إلى واجهات API لإدارة الحسابات. يحدّد الزوج `providerId` و`accountId` الحساب الخارجي: يسمّي `providerId` تكوين المزوّد، و`accountId` هو المعرّف الثابت الذي أسنده المزوّد. راجع [مخطط الحساب](https://better-auth.com/docs/concepts/database#account) للحصول على المجموعة الكاملة من الحقول.

### عرض حسابات المستخدم

استخدم `listAccounts` لاسترداد كل طريقة مصادقة مرتبطة بالمستخدم الحالي. احتفظ بالقيمة `id` المُرجَعة عندما تحتاج إلى فصل الحساب أو استدعاء واجهة API أخرى خاصة بالحساب.

```ts
import { authClient } from "@/lib/auth-client"

const { data: accounts, error } = await authClient.listAccounts();

if (error) {
    throw new Error(error.message);
}

const googleAccount = accounts?.find((account) => account.providerId === "google");
```

### تشفير الرموز

لا يشفّر Better Auth الرموز (tokens) افتراضيًا، وهذا مقصود. نريد أن تكون لديك سيطرة كاملة على كيفية التعامل مع التشفير وفك التشفير، بدلًا من تضمين سلوك قد يكون مربكًا أو مقيّدًا. إذا كنت بحاجة إلى تخزين رموز مشفّرة (مثل accessToken أو refreshToken)، يمكنك استخدام databaseHooks لتشفيرها قبل حفظها في قاعدة بياناتك.

```ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    databaseHooks: {
        account: {
            create: {
                before(account, context) {
                    const withEncryptedTokens = { ...account };
                    if (account.accessToken) {
                        const encryptedAccessToken = encrypt(account.accessToken)  // [!code highlight]
                        withEncryptedTokens.accessToken = encryptedAccessToken;
                    }
                    if (account.refreshToken) {
                        const encryptedRefreshToken = encrypt(account.refreshToken); // [!code highlight]
                        withEncryptedTokens.refreshToken = encryptedRefreshToken;
                    }
                    return {
                        data: withEncryptedTokens
                    }
                },
            }
        }
    }
})
```

ثم كلما استرجعت الحساب، تأكد من فك تشفير الرموز قبل استخدامها.

### ربط الحسابات

ربط الحسابات [مفعّل افتراضيًا](https://www.better-auth.com/docs/reference/options#accountlinking) ويتيح للمستخدمين ربط طرق مصادقة متعددة بحساب واحد. مع Better Auth، يمكن للمستخدمين ربط عمليات تسجيل دخول اجتماعية إضافية أو مزوّدي OAuth بحساباتهم الحالية إذا أكّد المزوّد أن البريد الإلكتروني للمستخدم مُتحقَّق منه.

إذا كان ربط الحسابات معطّلًا، فلا يمكن ربط أي حسابات، بغض النظر عن المزوّد أو حالة التحقق من البريد الإلكتروني.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    account: {
        accountLinking: {
            enabled: false, 
        }
    },
});
```

#### الربط القسري

يمكنك تحديد قائمة بـ"المزوّدين الموثوقين". عندما يسجّل مستخدم الدخول باستخدام مزوّد موثوق، سيُربط حسابه تلقائيًا حتى لو لم يؤكّد المزوّد حالة التحقق من البريد الإلكتروني. استخدم هذا بحذر لأنه قد يزيد من خطر الاستيلاء على الحساب (account takeover).

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"]
        }
    },
});
```

#### تعطيل الربط الضمني

بشكل افتراضي، عندما يسجّل مستخدم الدخول باستخدام مزوّد OAuth يتطابق بريده الإلكتروني مع مستخدم موجود (وإما أن يكون المزوّد قد تحقق من البريد أو أنه ضمن `trustedProviders`)، يربط Better Auth حساب OAuth بذلك المستخدم تلقائيًا. اضبط `disableImplicitLinking: true` لإيقاف ذلك. عند تفعيل هذا الخيار:

* تُرفض تسجيلات الدخول عبر OAuth بالبريد نفسه لمستخدم موجود بخطأ [`account_not_linked`](https://better-auth.com/docs/reference/errors/account_not_linked) بدلًا من ربطها بصمت، حتى عندما يكون المزوّد ضمن `trustedProviders` أو يكون البريد مُتحقَّقًا منه.
* لا يزال بإمكان المستخدمين الجدد (لا يوجد مستخدم موجود بالبريد ذاته) التسجيل عبر OAuth.
* لا يزال بإمكان مستخدم مُصادَق عليه مسبقًا ربط المزوّدين صراحةً عبر [`linkSocial()`](#manually-linking-accounts).

استخدم هذا عندما تريد أن يؤكّد المستخدمون الربط من صفحة إعدادات بدلًا من الربط الضمني عند تسجيل الدخول.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    account: {
        accountLinking: {
            disableImplicitLinking: true,
        }
    },
});
```

#### ربط الحسابات يدويًا

يمكن للمستخدمين المسجّلين بالفعل ربط حساباتهم يدويًا بمزوّدي خدمات اجتماعية إضافيين أو بحسابات قائمة على بيانات الاعتماد.

* **ربط الحسابات الاجتماعية:** استخدم طريقة `linkSocial` على العميل لربط مزوّد اجتماعي بحساب المستخدم.

  ```ts
  import { authClient } from "@/lib/auth-client"

  await authClient.linkSocial({
      provider: "google", // Provider to link
      callbackURL: "/callback" // Callback URL after linking completes
  });
  ```

  يمكنك أيضًا طلب نطاقات (scopes) محددة عند ربط حساب اجتماعي، والتي قد تختلف عن النطاقات المستخدمة أثناء المصادقة الأولية:

  ```ts
  import { authClient } from "@/lib/auth-client"

  await authClient.linkSocial({
      provider: "google",
      callbackURL: "/callback",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"] // Request additional scopes
  });
  ```

::: {note}
تُدمج النطاقات الممنوحة حديثًا في `account.scope`، لذا تبقى المنح السابقة صالحة عبر التفويض التدريجي (incremental authorization). لا تعدّل إعادةُ المصادقة عند تسجيل الدخول ولا استجابات رموز التحديث (refresh-token) قيمة `account.scope`.
:::

  يمكنك أيضًا ربط الحسابات باستخدام رموز الهوية (ID tokens) مباشرةً، دون إعادة التوجيه إلى تدفق OAuth الخاص بالمزوّد:

  ```ts
  import { authClient } from "@/lib/auth-client"

  await authClient.linkSocial({
      provider: "google",
      idToken: {
          token: "id_token_from_provider",
          nonce: "nonce_used_for_token", // Optional
          accessToken: "access_token", // Optional, may be required by some providers
          refreshToken: "refresh_token" // Optional
      }
  });
  ```

  هذا مفيد عندما تكون لديك بالفعل رموز صالحة من المزوّد، على سبيل المثال:

  * بعد تسجيل الدخول باستخدام SDK أصلي (native)
  * عند استخدام تطبيق جوال يتولّى المصادقة
  * عند تنفيذ تدفقات OAuth مخصصة

  يجب أن يكون رمز الهوية صالحًا ويجب أن يدعم المزوّد التحقق من رمز الهوية.

  إذا أردت أن يتمكّن مستخدموك من ربط حساب اجتماعي بعنوان بريد إلكتروني مختلف عن المستخدم، أو إذا أردت استخدام مزوّد لا يُرجع عناوين بريد إلكتروني، فستحتاج إلى تفعيل ذلك في إعدادات ربط الحسابات.

  ```ts title="auth.ts"
  import { betterAuth } from "better-auth";

  export const auth = betterAuth({
      account: {
          accountLinking: {
              allowDifferentEmails: true
          }
      },
  });
  ```

  بشكل افتراضي، يترك ربط الحساب ملف المستخدم الشخصي الحالي دون تغيير. فعّل `updateUserInfoOnLink` لنسخ ملف المزوّد الشخصي إلى المستخدم في كل مرة يُربط فيها حساب. الحقول المتزامنة هي نفسها التي تُحفظ عند التسجيل (`name`، و`image`، وأي حقول مسموح بها كمدخلات يضيفها `mapProfileToUser`). لا يتغيّر `email` الخاص بالمستخدم و`emailVerified` أبدًا عند الربط، لذا لا يمكن لربط مزوّد أن يعيد ربط هوية الحساب.

  ```ts title="auth.ts"
  import { betterAuth } from "better-auth";

  export const auth = betterAuth({
      account: {
          accountLinking: {
              updateUserInfoOnLink: true
          }
      },
  });
  ```

* **ربط الحسابات القائمة على بيانات الاعتماد:** لربط حساب قائم على بيانات الاعتماد (مثل البريد الإلكتروني وكلمة المرور)، يمكن للمستخدمين بدء تدفق "نسيت كلمة المرور"، أو يمكنك استدعاء طريقة `setPassword` على الخادم.

  ```ts title="set-password.ts"
  import { auth } from "@/lib/auth"

  await auth.api.setPassword({
    body: {
        newPassword: "new-password", // required
    },
    headers: await headers() // headers containing the user's session token
  });
  ```

::: {note}
لا يمكن استدعاء `setPassword` من العميل لأسباب أمنية.
:::

### فصل الحسابات

افصل حسابًا بتمرير القيمة `id` الخاصة بسجل حساب Better Auth، والتي يمكنك الحصول عليها من `listAccounts`.

```ts
import { authClient } from "@/lib/auth-client"

const { data: accounts, error } = await authClient.listAccounts();

if (error) {
    throw new Error(error.message);
}

const account = accounts?.find((account) => account.providerId === "google");

if (account) {
    await authClient.unlinkAccount({
        accountId: account.id,
    });
}
```

إذا لم يكن الحساب موجودًا أو لم يكن مملوكًا للمستخدم الحالي، يُرجع Better Auth خطأً. كما يمنع Better Auth المستخدم من فصل حسابه الوحيد ما لم تكن `allowUnlinkingAll` تساوي `true`.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    account: {
        accountLinking: {
            allowUnlinkingAll: true
        }
    },
});
```
