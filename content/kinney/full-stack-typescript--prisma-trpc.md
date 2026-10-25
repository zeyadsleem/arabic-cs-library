---
title: "توليد tRPC من Prisma"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/prisma-trpc"
---

حسنًا، حان وقت مكتبة أخرى! هذه المرة، سنستخدم قطعة تقنية أخرى مُسمّاة جيدًا: [prisma-trpc-generator](https://github.com/omar-dulaimi/prisma-trpc-generator).

```prisma
generator trpc {
  provider          = "prisma-trpc-generator"
  withZod           = true
  withMiddleware    = false
  withShield        = false
  contextPath       = "../src/context"
  trpcOptionsPath   = "../src/trpcOptions"
}
```
