---
title: "Generate Zod Schemas from Prisma"
lang: "en"
chapter: "full-stack-typescript"
slug: "zod-schemas-from-prisma"
order: 40
source: "https://stevekinney.com/courses/full-stack-typescript/zod-schemas-from-prisma"
---

Now that we have Prisma set up, the next part is easy. We’re going to use an aptly-named tool called [`zod-prisma-types`](https://www.npmjs.com/package/zod-prisma-types).

In your Prisma configuration add the following.

```prisma
generator zod {
  provider       = "zod-prisma-types"
}
```

And now run: `npx prisma generate zod`.

**Boom.** That’s all there is to it. But, like what if we could also generate a [tRPC schema](https://stevekinney.com/courses/full-stack-typescript/prisma-trpc) as well?
