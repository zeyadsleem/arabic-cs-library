---
title: "الاستخدام الأساسي"
lang: ar
chapter: getting-started
slug: basic-usage
order: 5
source: https://better-auth.com/docs/basic-usage
---

# الاستخدام الأساسي (/docs/basic-usage)

البدء مع Better Auth

يوفّر Better Auth دعمًا مدمجًا للمصادقة عبر:

* **البريد الإلكتروني وكلمة المرور**
* **مزوّد الدخول الاجتماعي (Google وGitHub وApple وغيرها)**

لكن يمكن أيضًا توسيعه بسهولة باستخدام الإضافات، مثل: [username](https://better-auth.com/docs/plugins/username)، و[magic link](https://better-auth.com/docs/plugins/magic-link)، و[passkey](https://better-auth.com/docs/plugins/passkey)، و[email-otp](https://better-auth.com/docs/plugins/email-otp)، وغيرها.

## البريد الإلكتروني وكلمة المرور

لتفعيل المصادقة بالبريد الإلكتروني وكلمة المرور:

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    emailAndPassword: {    // [!code highlight]
        enabled: true // [!code highlight]
    } // [!code highlight]
})
```

### التسجيل (Sign Up)

لتسجيل مستخدم جديد، عليك استدعاء طريقة العميل `signUp.email` مع معلومات المستخدم.

```ts title="sign-up.ts"
import { authClient } from "@/lib/auth-client"; //import the auth client // [!code highlight]

const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        image, // User image URL (optional)
        callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
});
```

افتراضيًا، يتم تسجيل دخول المستخدمين تلقائيًا بعد نجاح عملية التسجيل. ولتعطيل هذا السلوك يمكنك ضبط `autoSignIn` على `false`.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    emailAndPassword: {
    	enabled: true,
    	autoSignIn: false //defaults to true // [!code highlight]
  },
})
```

### تسجيل الدخول (Sign In)

لتسجيل دخول مستخدم، يمكنك استخدام الدالة `signIn.email` التي يوفّرها العميل.

```ts title="sign-in"
const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: false
}, {
    //callbacks
})
```

::: {warning}
استدعِ دائمًا طرق العميل من جهة العميل. لا تستدعِها من الخادم.
:::

### المصادقة من جهة الخادم

لمصادقة مستخدم على الخادم، يمكنك استخدام طرق `auth.api`.

```ts title="server.ts"
import { auth } from "./auth"; // path to your Better Auth server instance

const response = await auth.api.signInEmail({
    body: {
        email,
        password
    },
    asResponse: true // returns a response object instead of data
});
```

::: {note}
إذا تعذّر على الخادم إرجاع كائن استجابة (response object)، فستحتاج إلى تحليل الكوكيز (cookies) وضبطها يدويًا. لكن بالنسبة لأطر العمل مثل Next.js نوفّر [إضافة](https://better-auth.com/docs/integrations/next#server-action-cookies) للتعامل مع ذلك تلقائيًا
:::

## الدخول عبر الشبكات الاجتماعية

يدعم Better Auth عدة مزوّدي دخول اجتماعي، من بينهم Google وGitHub وApple وDiscord وغيرهم. لاستخدام مزوّد اجتماعي، عليك تهيئة المزوّدين الذين تحتاجهم في الخيار `socialProviders` على كائن `auth` الخاص بك.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    socialProviders: { // [!code highlight]
        github: { // [!code highlight]
            clientId: process.env.GITHUB_CLIENT_ID!, // [!code highlight]
            clientSecret: process.env.GITHUB_CLIENT_SECRET!, // [!code highlight]
        } // [!code highlight]
    }, // [!code highlight]
})
```

### تسجيل الدخول عبر مزوّدي الدخول الاجتماعي

لتسجيل الدخول باستخدام مزوّد اجتماعي عليك استدعاء `signIn.social`. وهو يستقبل كائنًا يحمل الخصائص التالية:

```ts title="sign-in.ts"
import { authClient } from "@/lib/auth-client"; //import the auth client // [!code highlight]

await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "github",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard", 
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/welcome",
    /**
     * disable the automatic redirect to the provider. 
     * @default false
     */
    disableRedirect: true,
});
```

يمكنك أيضًا المصادقة باستخدام `idToken` أو `accessToken` من المزوّد الاجتماعي بدلًا من إعادة توجيه المستخدم إلى موقع المزوّد. راجع توثيق مزوّدي الدخول الاجتماعي لمزيد من التفاصيل.

## تسجيل الخروج

لتسجيل خروج مستخدم، يمكنك استخدام الدالة `signOut` التي يوفّرها العميل.

```ts title="user-card.tsx"
await authClient.signOut();
```

يمكنك تمرير `fetchOptions` لإعادة التوجيه عند onSuccess

```ts title="user-card.tsx" 
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); // redirect to login page
    },
  },
});
```

## الجلسة

بمجرد تسجيل دخول المستخدم، سترغب في الوصول إلى جلسة المستخدم. يتيح لك Better Auth الوصول بسهولة إلى بيانات الجلسة من جهتي الخادم والعميل.

### جهة العميل

#### استخدام الجلسة

يوفّر Better Auth خطاف `useSession` للوصول بسهولة إلى بيانات الجلسة من جهة العميل. وقد صُمّم هذا الخطاف باستخدام nanostore ويدعم كل إطار عمل مدعوم والعميل العادي (vanilla client)، مما يضمن انعكاس أي تغييرات على الجلسة (مثل تسجيل الخروج) فورًا في واجهة المستخدم لديك.

```tsx title="user.tsx"
import { authClient } from "@/lib/auth-client" // import the auth client // [!code highlight] 

export function User(){

    const { // [!code highlight]
        data: session, // [!code highlight]
        isPending, //loading state // [!code highlight]
        error, //error object // [!code highlight]
        refetch //refetch the session
    } = authClient.useSession() // [!code highlight]

    return (
        //...
    )
}
```

```vue title="index.vue"
<script setup lang="ts">
import { authClient } from "~/lib/auth-client" // [!code highlight]

const session = authClient.useSession() // [!code highlight]
</script>

<template>
    <div>
        <div>
            <pre>{{ session.data }}</pre>
            <button v-if="session.data" @click="authClient.signOut()">
                Sign out
            </button>
        </div>
    </div>
</template>
```

```svelte title="user.svelte"
<script lang="ts">
import { authClient } from "$lib/auth-client"; // [!code highlight]

const session = authClient.useSession(); // [!code highlight]
</script>
<p>
    {$session.data?.user.email}
</p>
```

```ts title="auth-client.ts"
import { authClient } from "~/lib/auth-client"; //import the auth client

authClient.useSession.subscribe((value)=>{
    //do something with the session //
}) 
```

```tsx title="user.tsx"
import { authClient } from "~/lib/auth-client"; // [!code highlight]

export default function Home() {
    const session = authClient.useSession() // [!code highlight]
    return (
        <pre>{JSON.stringify(session(), null, 2)}</pre>
    );
}
```

#### الحصول على الجلسة

إذا كنت تفضّل عدم استخدام الخطاف، يمكنك استخدام الطريقة `getSession` التي يوفّرها العميل.

```ts title="user.tsx"
import { authClient } from "@/lib/auth-client" // import the auth client // [!code highlight]

const { data: session, error } = await authClient.getSession()
```

يمكنك أيضًا استخدامه مع مكتبات جلب البيانات من جهة العميل مثل [TanStack Query](https://tanstack.com/query/latest).

### جهة الخادم

يوفّر الخادم كائن `session` يمكنك استخدامه للوصول إلى بيانات الجلسة. وهو يتطلّب تمرير كائن ترويسات الطلب (request headers) إلى الطريقة `getSession`.

**مثال: الاستخدام مع بعض أطر العمل الشائعة**

```ts title="server.ts"
import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
```

```ts title="route.ts"
import { auth } from "lib/auth"; // path to your Better Auth server instance

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await auth.api.getSession({
        headers: request.headers
    })

    return json({ session })
}
```

```astro title="index.astro"
---
import { auth } from "./auth";

const session = await auth.api.getSession({
    headers: Astro.request.headers,
});
---
<!-- Your Astro Template -->
```

```ts title="+page.ts"
import { auth } from "./auth";

export async function load({ request }) {
    const session = await auth.api.getSession({
        headers: request.headers
    })
    return {
        props: {
            session
        }
    }
}
```

```ts title="index.ts"
import { auth } from "./auth";

const app = new Hono();

app.get("/path", async (c) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers
    })
});
```

```ts title="server/session.ts"
import { auth } from "~/utils/auth";

export default defineEventHandler((event) => {
    const session = await auth.api.getSession({
        headers: event.headers,
    })
});
```

```ts title="app/routes/api/index.ts"
import { auth } from "./auth";
import { createAPIFileRoute } from "@tanstack/start/api";

export const APIRoute = createAPIFileRoute("/api/$")({
    GET: async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers
        })
    },
});
```

::: {note}
لمزيد من التفاصيل راجع توثيق [session-management](https://better-auth.com/docs/concepts/session-management).
:::

## استخدام الإضافات

من الميزات الفريدة في Better Auth منظومة الإضافات. فهي تتيح لك إضافة وظائف مصادقة معقّدة ببضعة أسطر قليلة من الشيفرة.

فيما يلي مثال على كيفية إضافة المصادقة الثنائية باستخدام إضافة العاملين (two factor plugin).

### تهيئة الخادم

لإضافة إضافة (plugin)، عليك استيرادها وتمريرها إلى الخيار `plugins` في نسخة auth. على سبيل المثال، لإضافة المصادقة الثنائية يمكنك استخدام الشيفرة التالية:

```ts title="auth.ts"
import { betterAuth } from "better-auth"
import { twoFactor } from "better-auth/plugins" // [!code highlight]

export const auth = betterAuth({
    //...rest of the options
    plugins: [ // [!code highlight]
        twoFactor() // [!code highlight]
    ] // [!code highlight]
})
```

الآن ستصبح المسارات والطرق المتعلقة بالعاملين متاحة على الخادم.

### ترحيل قاعدة البيانات

بعد إضافة الإضافة، ستحتاج إلى إضافة الجداول المطلوبة إلى قاعدة بياناتك. يمكنك فعل ذلك بتشغيل الأمر `migrate`، أو باستخدام الأمر `generate` لإنشاء المخطط (schema) والتعامل مع الترحيل يدويًا.

لإنشاء المخطط:

```bash title="terminal"
npx auth generate
```

باستخدام الأمر `migrate`:

```bash title="terminal"
npx auth migrate
```

::: {note}
إذا كنت تفضّل إضافة المخطط يدويًا، يمكنك الاطّلاع على المخطط المطلوب في توثيق [إضافة العاملين](https://better-auth.com/docs/plugins/2fa#schema).
:::

### تهيئة العميل

بعد الانتهاء من الخادم، نحتاج إلى إضافة الإضافة إلى العميل. وللقيام بذلك، عليك استيراد الإضافة وتمريرها إلى الخيار `plugins` في عميل المصادقة. على سبيل المثال، لإضافة المصادقة الثنائية يمكنك استخدام الشيفرة التالية:

```ts title="auth-client.ts"  
import { createAuthClient } from "better-auth/client";
import { twoFactorClient } from "better-auth/client/plugins"; // [!code highlight]

const authClient = createAuthClient({
    plugins: [ // [!code highlight]
        twoFactorClient({ // [!code highlight]
            twoFactorPage: "/two-factor" // the page to redirect if a user needs to verify 2nd factor // [!code highlight]
        }) // [!code highlight]
    ] // [!code highlight]
})
```

الآن ستصبح الطرق المتعلقة بالعاملين متاحة على العميل.

```ts title="profile.ts"
import { authClient } from "./auth-client"

const enableTwoFactor = async() => {
    const data = await authClient.twoFactor.enable({
        password // the user password is required
    }) // this will enable two factor
}

const disableTwoFactor = async() => {
    const data = await authClient.twoFactor.disable({
        password // the user password is required
    }) // this will disable two factor
}

const signInWith2Factor = async() => {
    const data = await authClient.signIn.email({
        //...
    })
    //if the user has two factor enabled, it will redirect to the two factor page
}

const verifyTOTP = async() => {
    const data = await authClient.twoFactor.verifyTOTP({
        code: "123456", // the code entered by the user 
        /**
         * If the device is trusted, the user won't
         * need to pass 2FA again on the same device
         */
        trustDevice: true
    })
}
```

الخطوة التالية: راجع [توثيق إضافة العاملين](https://better-auth.com/docs/plugins/2fa).
