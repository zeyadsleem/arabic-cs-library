---
title: "وسم الأنواع مع Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/type-branding-with-zod"
---

يمكنك «وسم» أنواعك بحيث يراها TypeScript فريدة، حتى لو كانت في وقت التشغيل مجرّد نصوص أو أعداد عادية.

```typescript
import { z } from 'zod';

const emailSchema = z.string().email().brand<'EmailAddress'>();

type EmailAddress = z.infer<typeof emailSchema>;
// => string & { __brand: "EmailAddress" }

const email = emailSchema.parse('test@example.com');
// Type is EmailAddress

function sendEmail(to: EmailAddress) {
  console.log('Sending email to', to);
}

sendEmail(email);
// Works

sendEmail('unbranded string');
// Type error: not EmailAddress
```

> **Zod v4**
>
> في Zod v4، يُفضَّل كتابة `z.string().email()` بالصيغة `z.email()`. كما تقبل طريقة `.brand()` وسيطًا ثانيًا اختياريًا (`"in"` أو `"out"` أو `"inout"`) للتحكّم في موضع الوسم في النوع المستنتَج.

الوسم مجرّد حيلة في TypeScript وقت الترجمة، لكنه يساعدك على تجنّب تمرير نص عادي — مثلًا — حيث يُطلب `EmailAddress`. ويمكنك وسم الكائنات أيضًا.
