---
title: "مقدّمة إلى Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/introduction-to-zod"
---

يمنحك TypeScript أمان أنواع في وقت الترجمة، لكن عندما تأتي بياناتك من العالم الخارجي (واجهات API، مدخلات المستخدم، متغيّرات البيئة)، فلا ضمان أن تتصرّف كما ينبغي. هنا يدخل **[Zod](https://www.npmjs.com/package/zod)** — مكتبة تحقّق في وقت التشغيل بلا اعتمادات، مبنية على TypeScript أولًا، وتضمن أن بياناتك آمنة الأنواع مثل شيفرتك (وتنجّيك من كوابيس وقت التشغيل غير المتوقعة).

[Zod](https://www.npmjs.com/package/zod) مكتبة لإعلان المخططات والتحقّق منها مبنية على TypeScript أولًا. وعلى خلاف استخدام واجهات TypeScript الصرفية (التي تختفي في وقت التشغيل)، تستطيع مخططات Zod أن:

- تتحقّق من مدخلات المستخدم في وقت التشغيل (على الخادم أو حتى على العميل).
- تزوّدك بأنواع **مستنتَجة من Zod** فلا تحتاج إلى تعريف أشكال البيانات مرتين.
- **مصدر حقيقة واحد:** مخطط واحد يتحقّق من البيانات ويستنتج أنواع TypeScript.
- **رسائل أخطاء أفضل:** تغذية راجعة واضحة ومنظّمة عن الأخطاء للمطوّرين والمستخدمين معًا.
- **تصميم معياري قابل للتركيب:** ابنِ المخططات وأعد استخدامها لكل احتياجات بياناتك.
- **ميزات متقدمة:** تحويلات، وتحسينات مخصّصة، وتحقّقات غير متزامنة — وكل ما يلزم.

## تثبيت Zod

مثل معظم المكتبات، يمكنك تثبيت Zod باستخدام مدير الحزم المفضل لديك.

```bash
# Using npm:
npm install zod

# Using yarn:
yarn add zod

# Using pnpm:
pnpm add zod
```

## الاستخدام الأساسي {#basic-usage}

## التحقّق من الأوليّات

في أبسط مستوياته، يمكننا استخدام Zod للتحقّق من أن شيئًا ما من نوع معيّن:

```typescript
import { z } from 'zod';

const stringSchema = z.string();

stringSchema.parse('hello');
```

وكما قد تتوقع، ينطبق الأمر نفسه على الأعداد.

```typescript
const numberSchema = z.number();

numberSchema.parse(42); // Valid
// numberSchema.parse("42"); // Throws ZodError: Expected number, received string
```

يمكنك حتى التحقّق من أشياء مثل `BitInt` وكائنات `Date`.

```typescript
const bigintSchema = z.bigint();
const dateSchema = z.date();

bigintSchema.parse(123n);
dateSchema.parse(new Date());
```

### تحليل الكائنات

من الواضح أن الأمثلة أعلاه بسيطة أكثر من اللازم. يتجلّى نفع Zod عندما نريد أن نرى هل يطابق كائنٌ مخططًا معيّنًا.

يمكننا البدء بتعريف المخططات — ويمكنك التفكير فيها كما تفكّر في `type` أو `interface` في TypeScript.

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  age: z.number(),
});

// Automatically infer the TypeScript type
export type UserType = z.infer<typeof UserSchema>;
```

يمكننا أيضًا إضافة بعض التحقّق الإضافي (مثل التأكّد من أن شيئًا ما بريد إلكتروني أو له طول معيّن)، وهو ما لم نكن نستطيع فعله في TypeScript بغير ذلك.

```typescript
import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  email: z.string().email('Invalid email format'),
  age: z.number().int().min(1).max(120),
});

// Automatically infer the TypeScript type
export type UserType = z.infer<typeof UserSchema>;
```

> **Zod v4**
>
> في Zod v4، لمحقّقات صيغ النصوص مثل `.email()` مكافئات على المستوى الأعلى: `z.email()` و`z.uuid()` و`z.url()` وغيرها. وما زالت الصيغة المتسلسلة (`z.string().email()`) تعمل. كما أن خيار `{ message: "..." }` في المحقّقات مهجور لصالح `{ error: "..." }`.

بمجرد أن يكون لديك مخطط، يمكنك استخدام Zod للتحقّق من الكائنات وضمان مطابقتها لذلك المخطط.

```typescript
// Using parse() – throws on failure
try {
  const validUser = UserSchema.parse({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30,
  });
  console.log('Valid user:', validUser);
} catch (error) {
  console.error('Validation error:', error);
}

// Using safeParse() – returns a result object
const result = UserSchema.safeParse({
  name: 'Bob',
  email: 'bob@example', // Invalid email!
  age: 25,
});

if (!result.success) {
  console.error('Validation failed:', result.error.errors);
} else {
  console.log('Valid user:', result.data);
}
```

> **ملاحظة**
>
> استخدم `safeParse()` لتجنّب فوضى `try`/`catch` مع معالجة الأخطاء بأناقة في الوقت نفسه.

## توليد الأنواع من المخطط

سحر Zod هو أن مخططك هو مصدر حقيقتك الوحيد. فلن تكتب أنواعًا مكرّرة!

```typescript
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().positive(),
});

type Product = z.infer<typeof ProductSchema>;

// Now, Product is:
// { id: string; name: string; price: number; }
```

> **Zod v4**
>
> في Zod v4، يمكن كتابة `z.string().uuid()` بالصيغة `z.uuid()`. ولاحظ أن `z.uuid()` في v4 يفرض تحقّقًا أكثر صرامة وفق RFC 9562. واستخدم `z.guid()` إن احتجت سلوك v3 الأكثر تسامحًا.

تحصل بياناتك المتحقَّق منها تلقائيًا على نوع TypeScript الصحيح — لا مزيد من الأنواع غير المتطابقة بين فحوص وقت التشغيل وتوقعات وقت الترجمة.

**التالي**: [أنواع متقدمة مع Zod](https://stevekinney.com/courses/full-stack-typescript/advanced-types-with-zod)
