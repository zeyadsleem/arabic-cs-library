---
title: "Middleware and Authentication with tRPC"
lang: "en"
chapter: "full-stack-typescript"
slug: "middleware-auth-logging-for-trpc"
order: 36
source: "https://stevekinney.com/courses/full-stack-typescript/middleware-auth-logging-for-trpc"
---

### Middleware for Auth & Logging

You can create custom middlewares:

```typescript
// server/src/trpc.ts
import { TRPCError } from '@trpc/server';

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { user: ctx.user } }); // now user is non-null
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

Use `protectedProcedure` when you want routes behind auth checks. For logging, similarly:

```typescript
const logMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const ms = Date.now() - start;
  console.log(`${type} call to ${path} took ${ms}ms`);
  return result;
});
export const loggedProcedure = t.procedure.use(logMiddleware);
```
