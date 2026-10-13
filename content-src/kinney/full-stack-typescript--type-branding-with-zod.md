---
title: "Type Branding with Zod"
lang: "en"
chapter: "full-stack-typescript"
slug: "type-branding-with-zod"
order: 8
source: "https://stevekinney.com/courses/full-stack-typescript/type-branding-with-zod"
---

You can “brand” your types so that TypeScript sees them as unique, even if they’re plain strings or numbers at runtime.

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
> In Zod v4, `z.string().email()` is preferably written as `z.email()`. The `.brand()` method also accepts an optional second argument (`"in"`, `"out"`, or `"inout"`) to control where the brand appears in the inferred type.

Branding is purely a TypeScript compile-time trick, but it helps you avoid passing, for example, a plain string where an `EmailAddress` is required. You can brand objects, too.
