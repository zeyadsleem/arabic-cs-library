---
title: "بروتوكول OAuth"
lang: ar
chapter: concepts
slug: oauth
order: 29
source: https://better-auth.com/docs/concepts/oauth
---

# بروتوكول OAuth (/docs/concepts/oauth)

تعرّف على كيفية تهيئة مزوّدي OAuth الاجتماعيين، وتسجيل الدخول وربط الحسابات، وطلب النطاقات (scopes)، وتمرير بيانات إضافية، وتحديث رموز الوصول (access tokens)، وتعيين الملفات الشخصية (profiles)، وتخصيص خيارات المزوّد.

يأتي Better Auth بدعم مدمج لـ OAuth 2.0 و OpenID Connect. وهذا يتيح لك مصادقة المستخدمين عبر مزوّدي OAuth الشائعين مثل Google وFacebook وGitHub وغيرهم.

إذا لم يكن المزوّد الذي تريده مدعومًا مباشرةً، يمكنك استخدام [إضافة OAuth العامة (Generic OAuth Plugin)](https://better-auth.com/docs/plugins/generic-oauth) للتكاملات المخصّصة.

## تهيئة المزوّدين الاجتماعيين

لتمكين مزوّد اجتماعي، تحتاج إلى توفير `clientId` و`clientSecret` الخاصّين بالمزوّد.

إليك مثالًا لكيفية تهيئة Google كمزوّد:

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    },
  },
});
```

## الاستخدام

### تسجيل الدخول

لتسجيل الدخول باستخدام مزوّد اجتماعي، يمكنك استخدام الدالة `signIn.social` مع `authClient` أو `auth.api` للاستخدام من جانب الخادم.

```ts
// client-side usage
await authClient.signIn.social({
  provider: "google", // or any other provider id
})
```

```ts
// server-side usage
await auth.api.signInSocial({
  body: {
    provider: "google", // or any other provider id
  },
});
```

### ربط الحساب

لربط حساب بمزوّد اجتماعي، يمكنك استخدام الدالة `linkAccount` مع `authClient` أو `auth.api` للاستخدام من جانب الخادم.

```ts
await authClient.linkSocial({
  provider: "google", // or any other provider id
})
```

الاستخدام من جانب الخادم:

```ts
await auth.api.linkSocialAccount({
  body: {
    provider: "google", // or any other provider id
  },
  headers: await headers() // headers containing the user's session token
});
```

### التحقق من معلومات مستخدم OAuth

استخدم [`user.validateUserInfo`](https://better-auth.com/docs/concepts/users-accounts#callbacks) لرفض هوية OAuth قبل أن ينشئ Better Auth مستخدمًا أو يربط حسابًا جديدًا أو يعيد تسجيل دخول مستخدم عائد. يستقبل الاستدعاء (callback) كائن `user` المُعيَّن، ويحمّل في `source.oauth` معرّف المزوّد والملف الشخصي الخام للمزوّد.

ويُشغَّل عند أول تجهيز (provisioning) لهوية OAuth (`create-user` من استدعاء عادي، أو تسجيل دخول عبر رمز الهوية (ID token)، أو One Tap، أو OAuth Proxy)، وعند ربط حساب جديد (`link-account`)، وكذلك في كل مرة يسجّل فيها مستخدم OAuth موجود دخوله (`sign-in`). وفي إجراء `sign-in` يحمل `user` البريد الإلكتروني *الحديث* الصادر من المزوّد، لذا يرفض فحص النطاق (domain) أي مستخدم انتقل بريده لدى المزوّد لاحقًا إلى نطاق غير مسموح. وهو يعمل في الإعدادات بلا حالة (stateless) لأنه يُنفَّذ في النقاط نفسها بغض النظر عن قاعدة البيانات.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  user: {
    validateUserInfo: ({ user, source }) => {
      if (source.oauth?.providerId !== "google") return;

      if (!user.email?.endsWith("@example.com")) {
        return {
          error: "email_not_allowed",
          errorDescription: "Use your example.com email to sign in",
        };
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
```

### الحصول على رمز الوصول

استخدم `getAccessToken` لاسترداد رمز الوصول لحساب مرتبط. يجب على كل طلب للحصول على رمز أو على ملف شخصي من المزوّد أن يحدّد الحساب صراحةً: مرِّر `id` الخاص بسجل حساب Better Auth في الحقل `accountId`، أو مرِّر `useAccountCookie: true` لتحديد الحساب من ملف تعريف الارتباط (cookie) الموقَّع الخاص به. ولا يُعدّ `providerId` أبدًا محدِّدًا للحساب، وأي طلب يخلو من أيٍّ من المحدِّدين المدعومين يُعدّ غير صالح.

يتوفّر معرّف سجل الحساب من `listAccounts`. وإذا كان رمز الوصول الخاص به منتهي الصلاحية، يحدّثه Better Auth قبل إعادته.

```ts
const { data: accounts, error } = await authClient.listAccounts();

if (error) {
  throw new Error(error.message);
}

const account = accounts?.find((account) => account.providerId === "google");

if (!account) {
  throw new Error("Google account is not linked");
}

const { accessToken } = await authClient.getAccessToken({
  accountId: account.id,
})
```

عند تمكين [`account.storeAccountCookie`](https://better-auth.com/docs/reference/options#storeaccountcookie)، حدِّد الحساب من ملف تعريف الارتباط الموقَّع صراحةً:

```ts
const { accessToken } = await authClient.getAccessToken({
  useAccountCookie: true,
});
```

للاستخدام من جانب الخادم، مرِّر معرّف سجل الحساب نفسه. ويمكن لاستدعاء خادم موثوق أيضًا توفير `userId` عندما لا يتضمّن ترويسات الجلسة (session headers).

```ts
await auth.api.getAccessToken({
  body: {
    accountId: account.id,
  },
  headers: await headers(), // headers containing the user's session token
});
```

### تحديث رمز الوصول

استخدم `refreshToken` عندما تحتاج إلى تحديث رمز الوصول للحساب المحدَّد فورًا. وهو يستعمل عقد المحدِّد الصريح نفسه الذي يستعمله `getAccessToken`.

```ts
const tokens = await authClient.refreshToken({
  accountId: account.id,
});
```

لاستخدام ملف تعريف الارتباط الموقَّع للحساب بدلاً من ذلك:

```ts
await auth.api.refreshToken({
  body: {
    useAccountCookie: true,
  },
  headers: await headers(),
});
```

### الحصول على معلومات الحساب المقدَّمة من المزوّد

استخدم `accountInfo` لاسترداد بيانات الملف الشخصي الحالية من المزوّد لحساب مرتبط. مرِّر `id` الخاص بسجل حساب Better Auth، وليس معرّف الموضوع (subject identifier) الخاص بالمزوّد.

تُبقي الاستجابة بيانات الهوية والملف الشخصي منفصلة. فيحتوي `account` على سجل Better Auth المحدَّد ومفتاح المزوّد الخاص به، ويحتوي `user` على حقول الملف الشخصي القابلة للتغيير، ويحتوي `data` على استجابة المزوّد الخام.

```ts
const info = await authClient.accountInfo({
  query: { accountId: account.id },
});

console.log(info.data?.account.accountId);
console.log(info.data?.user.email);
```

عندما ينبغي لملف تعريف الارتباط الموقَّع للحساب أن يحدِّد الحساب:

```ts
const info = await authClient.accountInfo({
  query: { useAccountCookie: true },
});
```

للاستخدام من جانب الخادم:

```ts
await auth.api.accountInfo({
  query: {
    accountId: account.id,
  },
  headers: await headers(), // headers containing the user's session token
});
```

### طلب نطاقات إضافية

قد يحتاج تطبيقك أحيانًا إلى نطاقات OAuth إضافية بعد أن يكون المستخدم قد سجّل بالفعل (مثل الوصول إلى مستودعات GitHub أو Google Drive). وقد لا يرغب المستخدمون في منح صلاحيات واسعة مبدئيًا، مفضّلين البدء بأقل صلاحيات ومنح وصول إضافي عند الحاجة.

يمكنك طلب نطاقات إضافية باستخدام الدالة `linkSocial` مع المزوّد نفسه. وسيؤدي ذلك إلى تشغيل تدفّق OAuth جديد يطلب النطاقات الإضافية مع الحفاظ على اتصال الحساب القائم.

```ts
const requestAdditionalScopes = async () => {
    await authClient.linkSocial({
        provider: "google",
        scopes: ["https://www.googleapis.com/auth/drive.file"],
    });
};
```

::: {note}
تأكد من تشغيلك الإصدار 1.2.7 من Better Auth أو أحدث. وقد تُظهر الإصدارات الأقدم (مثل 1.2.2) خطأ "Social account already linked" عند محاولة الربط بمزوّد موجود لطلب نطاقات إضافية.
:::

### تخصيص رابط التفويض (Authorization URL)

لتمرير معاملات استعلام (query parameters) إضافية إلى نقطة نهاية التفويض لدى المزوّد، مرِّر `additionalParams` عند استدعاء `signIn.social` أو `linkSocial`. وتُطبَّق القيم بعد أن يكتب الإطار حالة OAuth وتحدّي PKCE و`redirect_uri`؛ وتُرفض المفاتيح المحجوزة `state` و`client_id` و`redirect_uri` و`response_type` و`code_challenge` و`code_challenge_method` و`scope` برمز 400 حتى لا يستطيع المستدعي إفساد ارتباط الاستدعاء.

```ts
await authClient.signIn.social({
  provider: "cognito",
  additionalParams: {
    identity_provider: "Google", // skip the Cognito hosted-UI picker
  },
});

await authClient.linkSocial({
  provider: "google",
  loginHint: "user@example.com",
  additionalParams: {
    access_type: "offline",
    prompt: "consent",
  },
});
```

تُدمج معاملات الاستعلام المضمّنة الخاصة بالمزوّد (على سبيل المثال `include_granted_scopes=true` لدى Google، و`config_id` لدى Facebook، و`identity_provider` لدى Cognito عند ضبطه عبر `identityProvider`) مع `additionalParams` الممرَّرة وقت الاستدعاء؛ وتفوز القيمة الممرَّرة وقت الاستدعاء عند تعارض المفاتيح.

### تمرير بيانات إضافية عبر تدفّق OAuth

يتيح لك Better Auth تمرير بيانات إضافية عبر تدفّق OAuth دون تخزينها في قاعدة البيانات. وهذا مفيد في حالات مثل تتبّع رموز الإحالة (referral codes)، أو مصادر التحليلات، أو أي بيانات مؤقتة أخرى ينبغي معالجتها أثناء المصادقة دون حفظها.

عند بدء تسجيل الدخول عبر OAuth أو ربط الحساب، مرِّر البيانات الإضافية:

```ts
// Client-side: Sign in with additional data
await authClient.signIn.social({
  provider: "google",
  additionalData: {
    referralCode: "ABC123",
    source: "landing-page",
  },
});

// Client-side: Link account with additional data
await authClient.linkSocial({
  provider: "google",
  additionalData: {
    referralCode: "ABC123",
  },
});

// Server-side: Sign in with additional data
await auth.api.signInSocial({
  body: {
    provider: "google",
    additionalData: {
      referralCode: "ABC123",
      source: "admin-panel",
    },
  },
});
```

#### الوصول إلى البيانات الإضافية في الخطافات (Hooks)

تتوفّر البيانات الإضافية في خطافاتك أثناء استدعاء OAuth عبر `getOAuthState`.

::: {note}
يعمل هذا عادةً مع مسارات استدعاء OAuth مثل `/callback/:id`.
:::

مثال باستخدام خطاف after:

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createAuthMiddleware, getOAuthState } from "better-auth/api";

export const auth = betterAuth({
  // Other configurations...
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Additional data is only available during OAuth callback
      if (ctx.path === "/callback/:id") {
        const additionalData = await getOAuthState<{
          referralCode?: string;
          source?: string;
        }>();

        if (additionalData) {
          // IMPORTANT: Validate and sanitize the data before using it
          // This data comes from the client and should not be trusted

          // Example: Validate and process referral code
          if (additionalData.referralCode) {
            const isValidFormat = /^[A-Z0-9]{6}$/.test(additionalData.referralCode);
            if (isValidFormat) {
              // Verify the referral code exists in your database
              const referral = await db.referrals.findByCode(additionalData.referralCode);
              if (referral) {
                // Safe to use the verified referral
                await db.referrals.incrementUsage(referral.id);
              }
            }
          }

          // Track analytics (low-risk usage)
          if (additionalData.source) {
            await analytics.track("oauth_signin", {
              source: additionalData.source,
              userId: ctx.context.session?.user.id,
            });
          }
        }
      }
    }),
  },
});
```

مثال باستخدام خطاف قاعدة البيانات:

```ts title="auth.ts"
 // You can also access additional data in database hooks
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          if (ctx.path === "/callback/:id") {
            const additionalData = await getOAuthState<{ referredFrom?: string }>();
            if (additionalData?.referredFrom) {
              return {
                data: {
                  referredFrom: additionalData.referredFrom,
                },
              };
            }
          }
        },
      },
    },
  },
```

::: {note}
بشكل افتراضي، تتضمّن حالة OAuth البيانات التالية:

* `callbackURL` - رابط الاستدعاء (callback URL) لتدفّق OAuth
* `codeVerifier` - مدقّق الرمز (code verifier) لتدفّق OAuth
* `errorURL` - رابط الخطأ لتدفّق OAuth
* `newUserURL` - رابط المستخدم الجديد لتدفّق OAuth
* `link` - الربط الخاص بتدفّق OAuth (البريد الإلكتروني ومعرّف المستخدم)
* `requestSignUp` - ما إذا كان ينبغي طلب التسجيل لتدفّق OAuth
* `expiresAt` - وقت انتهاء صلاحية حالة OAuth
* `serverContext` - قيم يضبطها الخادم وتبقى عبر إعادة التوجيه (انظر [تمرير بيانات موثوقة من الخادم](#passing-server-trusted-data))
* `[key: string]` - البيانات `additionalData` التي مرّرتها. وهي مصدرها العميل، لذا تعامل معها على أنها غير موثوقة.
:::

#### تمرير بيانات موثوقة من الخادم

البيانات `additionalData` يوفّرها العميل، لذا يجب التحقق من صحتها قبل استخدامها في الاستدعاء. وعندما تحتاج إضافة (plugin) (أو خطاف `before` الخاص بك) إلى نقل بيانات مشتقّة من الخادم عبر إعادة التوجيه، استخدم `addOAuthServerContext`. فهي تكتب في خانة خاصة بالخادم وحده لا يستطيع العميل تعبئتها، ويمكن قراءة القيم في الاستدعاء ضمن `serverContext`.

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import {
  addOAuthServerContext,
  createAuthMiddleware,
  getOAuthState,
} from "better-auth/api";

export const auth = betterAuth({
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Social and generic OAuth providers both sign in here.
      if (ctx.path === "/sign-in/social") {
        // Derived on the server, so it is safe to trust on the callback.
        await addOAuthServerContext({ tenantId: ctx.context.tenantId });
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/callback/:id") {
        const tenantId = (await getOAuthState())?.serverContext?.tenantId;
        // Safe to use without re-validation: the client could not set this.
      }
    }),
  },
});
```

## التعامل مع المزوّدين الذين لا يوفّرون البريد الإلكتروني

يتطلّب Better Auth حاليًا وجود عنوان بريد إلكتروني في كل سجل مستخدم. ويعيد معظم المزوّدين بريدًا إلكترونيًا مع نطاق `email`، لكن يمكن لعدة مزوّدين حذفه بشكل مشروع. وعندما يحدث ذلك يفشل تدفّق OAuth بالخطأ `error=email_not_found` (أو `error=email_is_missing` لإضافة OAuth العامة).

يلخّص الجدول أدناه، لكل مزوّد متأثّر، متى قد يكون `email` غائبًا، وأي معرّف مستقرّ يمكنك استخدامه كبديل في `mapProfileToUser`، وإلى أي مدى ينبغي الوثوق بإشارة `email_verified` الصادرة من المزوّد.

| المزوّد | متى قد يكون `email` غائبًا | معرّف بديل مستقرّ | الثقة بـ `email_verified` |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Apple              | كل تسجيل دخول بعد الأول (فإن Apple تصدر `email` عند الموافقة الأولية فقط)                                                                                                 | `profile.sub` (مستقرّ لكل فريق Apple)       | موثوق؛ كما تُوسم عناوين إعادة التوجيه (relay) كمُتحقَّق منها                                                                                                          |
| Discord            | الحسابات المعتمدة على الهاتف فقط؛ ولم يُمنح نطاق `email`                                                                                                                    | `profile.id` (snowflake)                    | موثوق (حقل `verified` مخصّص)                                                                                                                                         |
| Facebook           | لا يوجد بريد إلكتروني صالح مسجّل، حتى مع منح إذن `email`                                                                                                                    | `profile.id` (مقيّد بالتطبيق)               | غير معروف: لا يكشف Graph API عن علامة تحقّق لكل بريد                                                                                                                 |
| GitHub             | ضبط المستخدم بريده الإلكتروني على الوضع الخاص؛ أو يفتقر تطبيق GitHub إلى إذن "Email addresses"                                                                             | `profile.id` (رقمي)                         | موثوق                                                                                                                                                                |
| LinkedIn           | لا يوجد بريد مؤكَّد للعضو؛ ولم يُمنح نطاق `email`                                                                                                                           | `profile.sub` (مزدوج لكل تطبيق)             | موثوق عند وجوده                                                                                                                                                      |
| Microsoft Entra ID | المستخدمون المُدارون دون سمة `mail`، ما لم يُضبط `email` كـ[مطالبة اختيارية (optional claim)](https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims) | `profile.oid` (مستقرّ ضمن `profile.tid`)    | **غير موثوق**: تحذّر Microsoft [صراحةً](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference) من استخدامه للتفويض                    |
| Roblox             | لا يعيد تدفّق الملف الشخصي الافتراضي في Roblox بريدًا إلكترونيًا؛ وينشئ Better Auth بديلًا غير قابل للتوجيه من `profile.sub`                                               | `profile.sub` (معرّف مستخدم Roblox)         | غير معروف في تدفّق الملف الشخصي الافتراضي                                                                                                                            |

### إنشاء بريد إلكتروني بديل باستخدام `mapProfileToUser`

استخدم المعرّف المستقرّ للمزوّد عند يكون حقل `email` فارغًا (null) أو غائبًا:

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      mapProfileToUser: (profile) => ({
        email: profile.email ?? `${profile.id}@discord.placeholder.invalid`,
      }),
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
      mapProfileToUser: (profile) => ({
        email: profile.email ?? `${profile.sub}@apple.placeholder.invalid`,
      }),
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      mapProfileToUser: (profile) => ({
        email: profile.email ?? `${profile.oid}@entra.placeholder.invalid`,
      }),
    },
  },
});
```

::: {warning}
عناوين البريد الإلكتروني البديلة ليست عناوين تواصل. ولا تستطيع الإضافات التي ترسل بريدًا (إعادة تعيين كلمة المرور، والرابط السحري، والتحقق من البريد الإلكتروني، ودعوات المؤسسة) التسليم إليها. استخدم نطاقًا تملكه أو النطاق المحجوز `.invalid` حتى لا يُستهدف أي صندوق بريد حقيقي عن طريق الخطأ.
:::

### ملاحظات خاصة بكل مزوّد

* **Apple**: احفظ البريد الإلكتروني في أول مرة تراه. فلا توفّر Apple نقطة نهاية لمعلومات المستخدم، لذا إن لم تخزّنه عند أول تسجيل دخول فلن تستطيع استرداده لاحقًا. ويُسلسَل كلٌّ من `email_verified` و`is_private_email` كـ**سلاسل نصية** (`"true"` / `"false"`)، لا كقيم منطقية.
* **GitHub**: يُطلب نطاق `user:email` افتراضيًا. ومع ذلك تعيد رسائل البريد الخاصة `null` على `/user`؛ ويتوفّر العنوان الأساسي المُتحقَّق منه على [`/user/emails`](https://docs.github.com/en/rest/users/emails).
* **Microsoft Entra ID**: لأن `email` قابل للتغيير على مستوى المستأجر (tenant) وغير مُتحقَّق منه أبدًا، استخدم `profile.oid` (ثابت لا يتغيّر، ومستقرّ ضمن المستأجر) كمرتكز للهوية؛ وتعامل مع `email` كسمة للملف الشخصي فقط. وتحذّر [إرشادات التحقق من المطالبات](https://learn.microsoft.com/en-us/entra/identity-platform/claims-validation) من Microsoft صراحةً من استخدام `email` أو `preferred_username` أو `unique_name` لاتخاذ قرارات التفويض.
* **Facebook**: في غياب علامة تحقّق لكل بريد، تعامل مع كل بريد من Facebook على أنه غير مُتحقَّق منه ما لم تُجرِ تحدّي تحقّق خاصًا بك.

يتعرّف Better Auth على حساب OAuth العائد عبر مفتاحه المستقرّ `(providerId, accountId)`، لكن مستخدم Better Auth المرتبط لا يزال يتطلّب عنوان بريد إلكتروني. وتُتابَع مسألة دعم المستخدمين الذين لا يملكون بريدًا إلكترونيًا في [#9124](https://github.com/better-auth/better-auth/issues/9124).

## خيارات المزوّد

### clientId

معرّف عميل OAuth 2.0 (Client ID) الصادر من المزوّد.

بالنسبة للمزوّدين الذين يتحقّقون من رموز الهوية (ID tokens) حسب الجمهور (audience) (مثل Google وApple وMicrosoft Entra وFacebook وCognito)، يمكنك تمرير مصفوفة لقبول الرموز الصادرة لأيٍّ من العملاء المهيّئين. وتُستخدم القيمة الأولى عندما يدير Better Auth تدفّق رمز التفويض (authorization code)؛ وتُقبل جميع القيم عند التحقق من مطالبة `aud` لرمز الهوية. ويتيح ذلك تسجيل دخول عابرًا للمنصات (الويب، وiOS، وAndroid) بتهيئة خلفية واحدة، حيث يُصدر SDK الأصلي لكل منصة رموزًا تحت معرّف العميل الخاص به.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: [
        process.env.GOOGLE_WEB_CLIENT_ID as string,
        process.env.GOOGLE_IOS_CLIENT_ID as string,
        process.env.GOOGLE_ANDROID_CLIENT_ID as string,
      ],
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
```

يجب أن تكون جميع معرّفات العميل ضمن مشروع المزوّد نفسه حتى تكون الموافقة مشتركة. وبالنسبة للمزوّدين الذين لا يتحقّقون من رموز الهوية حسب الجمهور، تُقبل سلسلة نصية واحدة فقط.

### scope

نطاق طلب الوصول (scope). على سبيل المثال `email` أو `profile`.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      scope: ["email", "profile"],
    },
  },
});
```

### redirectURI

رابط إعادة التوجيه المخصّص (redirect URI) للمزوّد. ويستخدم افتراضيًا `/api/auth/callback/${providerName}`

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      redirectURI: "https://your-app.com/auth/callback",
    },
  },
});
```

### disableSignUp

يعطّل التسجيل للمستخدمين الجدد.

### disableIdTokenSignIn

يعطّل استخدام رمز الهوية (ID token) لتسجيل الدخول. ويكون مُمكّنًا افتراضيًا لدى بعض المزوّدين مثل Google وApple.

### verifyIdToken

دالة مخصّصة للتحقق من رمز الهوية. تستقبل الرمز، وnonce اختياريًا، وسياق نقطة نهاية الطلب حتى تتمكّن من التفرّع حسب الترويسات أو بيانات الطلب الأخرى.

::: {warning}
توفير `verifyIdToken` **يستبدل** التحقق المدمج لدى المزوّد (التوقيع، والمُصدر، والجمهور، والانتهاء). ويجب على الاستدعاء (callback) الخاص بك إجراء تلك الفحوصات بنفسه. والترويسات التي يوفّرها العميل مثل `x-platform` يتحكّم بها المهاجم — استخدمها فقط لاختيار الجمهور (أو المطالبة الأخرى) الذي تتحقّق مقابله، لا كدليل على الهوية بحد ذاتها.
:::

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { createRemoteJWKSet, jwtVerify } from "jose";

const appleJwks = createRemoteJWKSet(
  new URL("https://appleid.apple.com/auth/keys"),
);

export const auth = betterAuth({
  socialProviders: {
    apple: {
      clientId: "YOUR_APPLE_CLIENT_ID",
      clientSecret: "YOUR_APPLE_CLIENT_SECRET",
      verifyIdToken: async (token, nonce, ctx) => {
        // Select audience from the request, then cryptographically verify.
        const audience =
          ctx?.headers?.get("x-platform") === "ios"
            ? process.env.APPLE_APP_BUNDLE_IDENTIFIER!
            : process.env.APPLE_CLIENT_ID!;
        try {
          const { payload } = await jwtVerify(token, appleJwks, {
            issuer: "https://appleid.apple.com",
            audience,
            maxTokenAge: "1h",
          });
          if (nonce && payload.nonce !== nonce) {
            return false;
          }
          return true;
        } catch {
          return false;
        }
      },
    },
  },
});
```

### overrideUserInfoOnSignIn

قيمة منطقية تحدّد ما إذا كان ينبغي تجاوز معلومات المستخدم في قاعدة البيانات عند تسجيل الدخول. وهي مضبوطة افتراضيًا على `false`، بمعنى عدم تجاوز معلومات المستخدم أثناء تسجيل الدخول. وإذا أردت تحديث معلومات المستخدم في كل مرة يسجّل فيها دخوله، فاضبطها على `true`.

### requireEmailVerification

يتطلّب التحقق من البريد الإلكتروني لهذا المزوّد قبل إنشاء جلسة. القيمة الافتراضية `false`.

عندما يُبلغ المزوّد بأن البريد الإلكتروني غير مُتحقَّق منه، لا يزال Better Auth ينشئ المستخدم والحساب أو يربطهما، لكنه لا يصدر جلسة. ويعيد استدعاء OAuth التوجيه مع `?error=email_not_verified`، ويعيد تسجيل الدخول عبر رمز الهوية رمز `403` مع رمز الخطأ `EMAIL_NOT_VERIFIED`. ويُرسَل بريد التحقق (أو يُعاد إرساله) وفق إعدادات `emailVerification` لديك: فيغطّي `sendOnSignUp` المستخدمين الجدد ويغطّي `sendOnSignIn` المستخدمين العائدين. هيّئ `emailVerification.sendVerificationEmail` وأبقِ `sendOnSignUp` مُمكّنًا حتى يتلقّى المستخدمون المحجوبون دائمًا رابطًا للتحقق.

يفحص هذا الحاجز حالة تحقّق المستخدم المحلي بدلاً من ادّعاء المزوّد في كل طلب. ويحتفظ المستخدم الذي تحقّق بالفعل عبر طريقة أخرى (مثل البريد الإلكتروني وكلمة المرور) بوصوله حتى لو أبلغ المزوّد لاحقًا بأن البريد غير مُتحقَّق منه.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      requireEmailVerification: true,
    },
  },
});
```

هذا خيار اختياري لكل مزوّد ومستقلّ عن `emailAndPassword.requireEmailVerification`: فتمكين التحقق عبر البريد الإلكتروني وكلمة المرور لا يحجب تسجيل الدخول الاجتماعي.

::: {warning}
مكّن هذا فقط للمزوّدين الذين يُبلغون بإشارة `email_verified` موثوقة. فعدة مزوّدين يُبلغون دائمًا بأن البريد غير مُتحقَّق منه (أو لا يعيدون بريدًا أصلًا)، لذا فإن تمكينه لديهم يحجب كل عمليات تسجيل الدخول. انظر [التعامل مع المزوّدين الذين لا يوفّرون البريد الإلكتروني](https://better-auth.com/docs/concepts/oauth#handling-providers-without-email).
:::

### mapProfileToUser

استخدم `mapProfileToUser` لتغيير تعيين المستخدم الافتراضي أو لتعبئة حقول مستخدم إضافية من ملف المزوّد الشخصي.

يتعامل Better Auth مع القيمة المُعادة من الدالة كمدخل من المزوّد، حتى وإن كانت الدالة تعمل على خادمك. ويطبّق قواعد الإدخال من `user.additionalFields` أثناء التسجيل عبر OAuth، وتجاوز الملف الشخصي عند تسجيل الدخول، ومزامنة الملف الشخصي عند ربط الحساب. وتُحلَّل الحقول المُعيَّنة التي تسمح بالإدخال وتُخزَّن، بينما تُتجاهل القيم المُعيَّنة للحقول الموسومة بـ `input: false`.

لا يمكن لتعيين الملف الشخصي إعادة تعريف هوية حساب المزوّد. فالمزوّدون المدمجون يشتقّون الهوية من حقل الملف الشخصي غير القابل للتغيير والموثّق لديهم. ويستعمل مزوّدو OAuth العامة `accountSubject` عندما لا يكون الحقل الافتراضي `sub` أو `id` هو المعرّف الصحيح.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },
});
```

::: {note}
صرّح بالحقول المُعيَّنة في [خيار](https://better-auth.com/docs/concepts/database#extending-core-schema) `user.additionalFields` واسمح بتلك الحقول كمدخلات. وتنطبق القاعدة نفسها على إعدادات المصادقة بلا حالة.
:::

#### الحقول المملوكة للخادم ومطالبات التفويض

أبقِ الحقول الحسّاسة أمنيًا مثل الأدوار (roles) والحظر (bans) والعلامات الداخلية وعضوية المؤسسة عند `input: false`. ولا تمكّن الإدخال فقط لكي يتمكّن `mapProfileToUser` من حفظ مطالبة من المزوّد، لأن الإعداد نفسه يتيح لطلبات التسجيل العامة وتحديث المستخدم توفير ذلك الحقل أيضًا.

يتحكّم `input` و`returned` في اتجاهين منفصلين. على سبيل المثال، `{ input: false, returned: true }` يعرّف حقلًا مملوكًا للخادم قابلًا للقراءة. ولا يمكن لمدخلات API ولا لـ `mapProfileToUser` توفيره، لكن Better Auth يضمّن قيمته المخزّنة في الاستجابات.

إذا كانت مطالبة من المزوّد تتحكّم في من يحقّ له تسجيل الدخول، ففرض السياسة قبل أن يُكمل Better Auth تسجيل الدخول عبر OAuth. ولا تؤجّل الفحص إلى ما بعد تسجيل الدخول، لأن Better Auth قد يكون قد أصدر بالفعل جلسة صالحة. وفضّل خيارًا خاصًا بالمزوّد إن وُجد، مثل [خيار `hd`](https://better-auth.com/docs/authentication/google#restrict-sign-in-to-google-workspace) لدى مزوّد Google لنطاق Google Workspace. وفي التدفّقات التي تستدعي [`getUserInfo`](https://better-auth.com/docs/concepts/oauth#getuserinfo)، يمكن لتنفيذ مخصّص التحقق من استجابة المزوّد وإعادة `null` عند فشل السياسة. وهيّئ فرضًا مماثلًا لمسارات تسجيل الدخول المنفصلة التي لا تستدعي `getUserInfo`.

وإذا كنت بحاجة أيضًا إلى تخزين المطالبة المُتحقَّق منها، فأبقِ الحقل عند `input: false` واكتبه عبر طبقة قاعدة بيانات تطبيقك. واستخدم `defaultValue` فقط لقيمة ثابتة تنطبق على كل مستخدم يُنشأ عبر تهيئة المصادقة تلك، لا لقيمة مشتقّة من ملف المزوّد الشخصي.

### refreshAccessToken

دالة مخصّصة لتحديث الرمز. هذه الميزة مدعومة فقط للمزوّدين الاجتماعيين المدمجين (Google وFacebook وGitHub وغيرهم)، وغير مدعومة حاليًا لمزوّدي OAuth المخصّصين المهيّئين عبر إضافة OAuth العامة. وبالنسبة للمزوّدين المدمجين، يمكنك توفير دالة مخصّصة لتحديث الرمز عند الحاجة.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      refreshAccessToken: async (token) => {
        return {
          accessToken: "new-access-token",
          refreshToken: "new-refresh-token",
        };
      },
    },
  },
});
```

### clientKey

مفتاح العميل (client key) لتطبيقك. ويستخدمه مزوّد TikTok الاجتماعي بدلاً من `clientId`.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    tiktok: {
      clientKey: "YOUR_TIKTOK_CLIENT_KEY",
      clientSecret: "YOUR_TIKTOK_CLIENT_SECRET",
    },
  },
});
```

### getUserInfo

دالة مخصّصة للحصول على معلومات المستخدم من المزوّد. ويتيح لك ذلك تجاوز عملية استرداد معلومات المستخدم الافتراضية.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      getUserInfo: async (token) => {
        // Custom implementation to get user info
        const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        const profile = await response.json();
        return {
          user: {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: profile.verified_email,
          },
          data: profile,
        };
      },
    },
  },
});
```

### disableImplicitSignUp

يعطّل التسجيل الضمني للمستخدمين الجدد. وعند ضبطه على true للمزوّد، يجب استدعاء تسجيل الدخول مع `requestSignUp` بقيمة true لإنشاء مستخدمين جدد.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      disableImplicitSignUp: true,
    },
  },
});
```

### prompt

المطالبة (prompt) المستخدمة لطلب رمز التفويض. وهي تتحكّم في سلوك تدفّق المصادقة.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      prompt: "select_account", // or "consent", "login", "none", "select_account+consent"
    },
  },
});
```

### responseMode

وضع الاستجابة (response mode) المستخدم لطلب رمز التفويض. وهو يحدّد كيفية إرجاع استجابة التفويض.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      responseMode: "query", // or "form_post"
    },
  },
});
```

### disableDefaultScope

يزيل النطاقات الافتراضية للمزوّد. فبشكل افتراضي، يضمّن المزوّدون نطاقات معيّنة مثل `email` و`profile`. اضبط هذا على `true` لإزالة هذه النطاقات الافتراضية واستخدام النطاقات التي تحدّدها فقط.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Other configurations...
  socialProviders: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      disableDefaultScope: true,
      scope: ["https://www.googleapis.com/auth/userinfo.email"], // Only this scope will be used
    },
  },
});
```

### تهيئات أخرى للمزوّد

قد يكون لكل مزوّد خيارات إضافية؛ راجع توثيق المزوّد المحدّد لمزيد من التفاصيل.
