---
title: "البريد الإلكتروني"
lang: ar
chapter: concepts
slug: email
order: 27
source: https://better-auth.com/docs/concepts/email
---

# البريد الإلكتروني (/docs/concepts/email)

تعرّف على كيفية إعداد التحقق من البريد الإلكتروني، واشتراط عناوين بريد موثّقة لتسجيل الدخول، وتسجيل الدخول التلقائي بعد التحقق، ومعالجة عمليات الاستدعاء (callbacks) بعد التحقق، وتنفيذ رسائل إعادة تعيين كلمة المرور.

يُعدّ البريد الإلكتروني جزءًا أساسيًا من Better Auth، وهو مطلوب لجميع المستخدمين بغض النظر عن طريقة المصادقة لديهم. يوفّر Better Auth المصادقة بالبريد الإلكتروني وكلمة المرور جاهزةً للاستخدام، إضافة إلى الكثير من الأدوات المساعدة لإدارة التحقق من البريد الإلكتروني، وإعادة تعيين كلمة المرور، والمزيد.

## أحضِر مزوّد البريد الإلكتروني الخاص بك

يعمل Better Auth مع أي مزوّد بريد إلكتروني معاملاتي (transactional)، ما يمنحك تحكمًا كاملًا في كيفية إرسال رسائل المصادقة الخاصة بك. لإرسال الرسائل، ابدأ بإعداد المزوّد الذي تفضّله.

على سبيل المثال، قد تفكّر في مزوّد البريد الإلكتروني التالي:

* [Resend](https://resend.com/better-auth)
* [SuperSend TX](https://docs.supersendtx.com/guides/better-auth)
* [Mailtrap](https://docs.mailtrap.io/guides/integrations/better-auth)
* [Wraps](https://wraps.dev/docs/guides/better-auth)
* [eusend](https://eusend.dev/docs/integrations/better-auth)

## التحقق من البريد الإلكتروني

التحقق من البريد الإلكتروني ميزة أمنية تضمن أن يقدّم المستخدمون عنوان بريد إلكتروني صالحًا. وهي تساعد في منع البريد المزعج وإساءة الاستخدام من خلال التأكد من أن عنوان البريد الإلكتروني يخصّ المستخدم. في هذا الدليل، ستحصل على شرح تفصيلي لكيفية تنفيذ التحقق من البريد الإلكتروني المعتمد على الرمز (token) في تطبيقك.
لاستخدام التحقق من البريد الإلكتروني المعتمد على رمز OTP، اطّلع على دليل [OTP Verification](https://better-auth.com/docs/plugins/email-otp).

### إضافة التحقق من البريد الإلكتروني إلى تطبيقك

لتمكين التحقق من البريد الإلكتروني، تحتاج إلى تمرير دالة ترسل رسالة تحقق تتضمن رابطًا.

* **sendVerificationEmail**: تُستدعى هذه الدالة عند بدء التحقق من البريد الإلكتروني. وهي تقبل كائن بيانات بالخصائص التالية:
  * `user`: كائن المستخدم الذي يحتوي على عنوان البريد الإلكتروني.
  * `url`: رابط التحقق الذي يجب على المستخدم النقر عليه لتأكيد بريده الإلكتروني.
  * `token`: رمز التحقق المستخدم لإتمام عملية التحقق من البريد الإلكتروني، ويُستخدم عند تنفيذ رابط تحقق مخصّص.

وكائن `request` كمعامل ثانٍ.

```ts title="auth.ts"
import { betterAuth } from 'better-auth';
import { sendEmail } from './email'; // your email sending function

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            void sendEmail({
                to: user.email,
                subject: 'Verify your email address',
                text: `Click the link to verify your email: ${url}`
            })
        }
    }
})
```

::: {warning}
تجنّب انتظار (await) إرسال البريد الإلكتروني لمنع
هجمات التوقيت. على المنصات بلا خادم (serverless)، استخدم `waitUntil` أو ما شابه لضمان إرسال البريد الإلكتروني.
:::

### تشغيل التحقق من البريد الإلكتروني

يمكنك بدء التحقق من البريد الإلكتروني بعدة طرق:

#### ١. أثناء التسجيل

لإرسال رسالة تحقق تلقائيًا عند التسجيل، اضبط `emailVerification.sendOnSignUp` على `true`.

```ts title="auth.ts"
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
    emailVerification: {
        sendOnSignUp: true
    }
})
```

يؤدي هذا إلى إرسال رسالة تحقق عند تسجيل المستخدم. أما بالنسبة لتسجيلات الدخول الاجتماعية، فيُقرأ حالة التحقق من البريد الإلكتروني من SSO.

::: {note}
عند تمكين `sendOnSignUp`، إذا سجّل المستخدم الدخول عبر SSO لا يصرّح بأن البريد الإلكتروني موثّق، فسيقوم Better Auth بإرسال رسالة تحقق، لكن التحقق غير مطلوب لتسجيل الدخول حتى عند تمكين `requireEmailVerification`.
:::

#### ٢. اشتراط التحقق من البريد الإلكتروني

إذا مكّنت اشتراط التحقق من البريد الإلكتروني، فيجب على المستخدمين توثيق بريدهم الإلكتروني قبل أن يتمكنوا من تسجيل الدخول. وفي كل مرة يحاول فيها المستخدم تسجيل الدخول، تُستدعى `sendVerificationEmail`.

::: {note}
يعمل هذا فقط إذا كان لديك `sendVerificationEmail` مُنفَّذة، وإذا كانت `sendOnSignIn` مضبوطة على true، وإذا كان المستخدم يحاول تسجيل الدخول بالبريد الإلكتروني وكلمة المرور.
:::

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { sendEmail } from './email'; // your email sending function

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    sendOnSignIn: true,
  },
  emailAndPassword: {
    requireEmailVerification: true,
  },
});
```

إذا حاول مستخدم تسجيل الدخول دون توثيق بريده الإلكتروني، فيمكنك معالجة الخطأ وعرض رسالة للمستخدم.

```ts title="auth-client.ts"
await authClient.signIn.email({
    email: "email@example.com",
    password: "password"
}, {
    onError: (ctx) => {
        // Handle the error
        if(ctx.error.status === 403) {
            alert("Please verify your email address")
        }
        //you can also show the original error message
        alert(ctx.error.message)
    }
})
```

#### ٣. يدويًا

يمكنك أيضًا تشغيل التحقق من البريد الإلكتروني يدويًا عبر استدعاء `sendVerificationEmail`.

```ts
await authClient.sendVerificationEmail({
    email: "user@email.com",
    callbackURL: "/" // The redirect URL after verification
})
```

### توثيق البريد الإلكتروني

إذا نقر المستخدم على رابط التحقق المقدَّم، فيُوثَّق بريده الإلكتروني تلقائيًا، ويُعاد توجيهه إلى `callbackURL`.

أما للتحقق اليدوي، فيمكنك إرسال رابط مخصّص للمستخدم يتضمن `token` واستدعاء الدالة `verifyEmail`.

```ts
await authClient.verifyEmail({
    query: {
        token: "" // Pass the token here
    }
})
```

### تسجيل الدخول التلقائي بعد التحقق

لتسجيل دخول المستخدم تلقائيًا بعد توثيقه بريده الإلكتروني بنجاح، اضبط الخيار `autoSignInAfterVerification` على `true`:

```ts
import { betterAuth } from "better-auth";

const auth = betterAuth({
    //...your other options
    emailVerification: {
        autoSignInAfterVerification: true
    }
})
```

### الاستدعاء (callback) قبل التحقق من البريد الإلكتروني

يمكنك تشغيل كود مخصّص قبيل وسم بريد المستخدم الإلكتروني بأنه موثّق باستخدام الاستدعاء `beforeEmailVerification`. يفيد هذا في التحقق، أو الفحوصات المسبقة، أو تحضير البيانات قبل إنهاء عملية التحقق.

```ts title="auth.ts"
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
    emailVerification: {
        async beforeEmailVerification(user, request) {
            // Run pre-verification logic
            console.log(`About to verify ${user.email}`);
        }
    }
})
```

### الاستدعاء (callback) بعد نجاح التحقق من البريد الإلكتروني

يمكنك تشغيل كود مخصّص مباشرةً بعد توثيق المستخدم لبريده الإلكتروني باستخدام الاستدعاء `afterEmailVerification`. يفيد هذا في أي تأثيرات جانبية ترغب في تشغيلها، مثل منح الوصول إلى ميزات خاصة أو تسجيل الحدث.

تعمل الدالة `afterEmailVerification` تلقائيًا عند تأكيد بريد المستخدم الإلكتروني، وتستقبل كائن `user` وتفاصيل `request` حتى تتمكن من تنفيذ إجراءات لهذا المستخدم تحديدًا.

إليك كيفية إعداده:

```ts title="auth.ts"
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
    emailVerification: {
        async afterEmailVerification(user, request) {
            // Your custom logic here, e.g., grant access to premium features
            console.log(`${user.email} has been successfully verified!`);
        }
    }
})
```

### الاستدعاء (callback) عند محاولة تسجيل مكرّرة

يُستدعى الاستدعاء `onExistingUserSignUp` عندما يحاول شخص ما التسجيل ببريد إلكتروني موجود بالفعل. يفيد هذا في إخطار المستخدم الحالي بأن أحدهم حاول التسجيل باستخدام عنوان بريده الإلكتروني.

::: {note}
لا يُستدعى هذا الاستدعاء إلا عندما يكون `emailAndPassword.requireEmailVerification` مضبوطًا على `true`، وهو ما يفعّل الاستجابة العامة للتكرار (مستخدم اصطناعي) بدلًا من رفع خطأ بريد إلكتروني مكرّر.
:::

```ts title="auth.ts"
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        onExistingUserSignUp: async ({ user }, request) => {
            // Notify the existing user about the sign-up attempt
            console.log(`Someone tried to sign up with ${user.email}`);
        }
    }
})
```

## رسالة إعادة تعيين كلمة المرور

تتيح إعادة تعيين كلمة المرور للمستخدمين إعادة تعيين كلمة مرورهم إذا نسوها. يوفّر Better Auth طريقة بسيطة لتنفيذ وظيفة إعادة تعيين كلمة المرور.

يمكنك تمكين إعادة تعيين كلمة المرور عبر تمرير دالة ترسل رسالة إعادة تعيين كلمة المرور تتضمن رابطًا.

```ts title="auth.ts"
import { betterAuth } from 'better-auth';
import { sendEmail } from './email'; // your email sending function

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            void sendEmail({
                to: user.email,
                subject: 'Reset your password',
                text: `Click the link to reset your password: ${url}`
            })
        }
    }
})
```

::: {warning}
تجنّب انتظار (await) إرسال البريد الإلكتروني لمنع
هجمات التوقيت. على المنصات بلا خادم (serverless)، استخدم `waitUntil` أو ما شابه لضمان إرسال البريد الإلكتروني.
:::

اطّلع على دليل [Email and Password](https://better-auth.com/docs/authentication/email-password#request-password-reset) لمزيد من التفاصيل حول كيفية تنفيذ إعادة تعيين كلمة المرور في تطبيقك.
ويمكنك أيضًا الاطّلاع على دليل [Otp verification](https://better-auth.com/docs/plugins/email-otp#reset-password-with-otp) لمعرفة كيفية تنفيذ إعادة تعيين كلمة المرور باستخدام OTP في تطبيقك.
