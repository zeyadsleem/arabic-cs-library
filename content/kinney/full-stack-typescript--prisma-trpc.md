---
title: "Generate tRPC with Prisma"
lang: en
source: "https://stevekinney.com/courses/full-stack-typescript/prisma-trpc"
---

Alright it’s time for another library! This time, we’re going to go with another well-named piece of technology: [prisma-trpc-generator](https://github.com/omar-dulaimi/prisma-trpc-generator).

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
