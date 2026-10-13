---
title: "TypeScript"
lang: ar
chapter: concepts
slug: typescript
order: 33
source: https://better-auth.com/docs/concepts/typescript
---

# TypeScript (/docs/concepts/typescript)

تعرّف على تكوين TypeScript من أجل Better Auth، بما في ذلك الوضع الصارم، واستنتاج الأنواع للجلسات والمستخدمين، وتعريف حقول إضافية، واستنتاج الحقول الإضافية في العميل.

صُمّم Better Auth ليكون آمنًا من حيث الأنواع. بُني كلٌّ من العميل والخادم باستخدام TypeScript، ما يتيح لك استنتاج الأنواع بسهولة.

## تكوين TypeScript

### الوضع الصارم

صُمّم Better Auth ليعمل مع الوضع الصارم في TypeScript. نوصي بتمكين الوضع الصارم في ملف تكوين TypeScript لديك:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "strict": true
  }
}
```

إذا لم تتمكّن من ضبط `strict` على `true`، فيمكنك تمكين `strictNullChecks`:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "strictNullChecks": true,
  }
}
```

عندما يكون `strict` مساويًا لـ `true`، يُفعَّل `strictNullChecks` أيضًا. إذا ضبطت `strictNullChecks` صراحةً على `false`، فقد تحدث مشكلات في استنتاج الأنواع.

::: {warning}
إذا واجهت مشكلات مع تجاوز استنتاج TypeScript الحد الأقصى للطول الذي سيسلسله المترجم، فيُرجى التأكد من اتباع التعليمات أعلاه، وكذلك التأكد من أن كلا `declaration` و`composite` غير مُمكَّنين.
:::

## استنتاج الأنواع

يقدّم كلٌّ من SDK العميل والخادم أنواعًا يمكن استنتاجها باستخدام الخاصية `$Infer`. يمكن للإضافات توسيع الأنواع الأساسية مثل `User` و`Session`، ويمكنك استخدام `$Infer` لاستنتاج هذه الأنواع. علاوةً على ذلك، يمكن للإضافات توفير أنواع إضافية يمكن استنتاجها أيضًا عبر `$Infer`.

```ts title="auth-client.ts" 
import { createAuthClient } from "better-auth/client"

const authClient = createAuthClient()

export type Session = typeof authClient.$Infer.Session
```

يتضمّن النوع `Session` كلا الخاصيتين `session` و`user`. تمثّل الخاصية user نوع كائن المستخدم، وتمثّل الخاصة `session` نوع كائن `session`.

يمكنك أيضًا استنتاج الأنواع من جهة الخادم.

```ts title="auth.ts" 
import { betterAuth } from "better-auth"
import Database from "better-sqlite3"

export const auth = betterAuth({
    database: new Database("database.db")
})

type Session = typeof auth.$Infer.Session
```

## الحقول الإضافية

يتيح لك Better Auth إضافة حقول إضافية إلى كائنَي المستخدم والجلسة. تُستنتَج جميع الحقول الإضافية بشكل صحيح وتكون متاحة من جهتي الخادم والعميل.

```ts title="auth.ts"
import { betterAuth } from "better-auth"
import Database from "better-sqlite3"

export const auth = betterAuth({
    database: new Database("database.db"),
    user: {
       additionalFields: {
          role: {
              type: "string",
              input: false
            } 
        }
    }
   
})

type Session = typeof auth.$Infer.Session
```

في المثال أعلاه، أضفنا حقل `role` إلى كائن المستخدم. أصبح هذا الحقل متاحًا الآن على النوع `Session`.

### الخاصية `input`

تحدّد الخاصية `input` في تكوين حقل إضافي ما إذا كان ينبغي تضمين الحقل في مُدخل المستخدم. تكون هذه الخاصية افتراضيًا `true`، أي أن الحقل سيكون جزءًا من مُدخل المستخدم أثناء عمليات مثل التسجيل.

لمنع حقل من أن يكون جزءًا من مُدخل المستخدم، يجب ضبط `input: false` صراحةً:

```ts
additionalFields: {
    role: {
        type: "string",
        input: false
    }
}
```

عندما يُضبط `input` على `false`، يُستبعد الحقل من مُدخل المستخدم، ما يمنع المستخدمين من تمرير قيمة له.

افتراضيًا، تُضمَّن الحقول الإضافية في مُدخل المستخدم، وهو ما قد يؤدي إلى ثغرات أمنية إن لم تُعالَج بعناية. بالنسبة إلى الحقول التي لا ينبغي أن يضبطها المستخدم، مثل `role`، من الضروري ضبط `input: false` في التكوين.

### استنتاج الحقول الإضافية في العميل

لضمان استنتاج الأنواع الصحيح للحقول الإضافية من جهة العميل، تحتاج إلى إعلام العميل بهذه الحقول. هناك طريقتان لتحقيق ذلك، اعتمادًا على بنية مشروعك:

1. لإعدادات المستودع الأحادي أو المشروع الواحد

إذا كان كود الخادم والعميل لديك في المشروع نفسه، فيمكنك استخدام إضافة `inferAdditionalFields` لاستنتاج الحقول الإضافية تلقائيًا من تكوين الخادم لديك.

```ts title="auth-client.ts"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/client";
import type { auth } from "@/lib/auth"; // Import the auth instance as a type

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
```

2. لمشاريع العميل والخادم المنفصلة

إذا كان العميل والخادم لديك في مشروعين منفصلين، فستحتاج إلى تحديد الحقول الإضافية يدويًا عند إنشاء عميل المصادقة.

```ts title="auth-client.ts"
import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields({
      user: {
        role: {
          type: "string"
        }
      }
  })],
});
```
