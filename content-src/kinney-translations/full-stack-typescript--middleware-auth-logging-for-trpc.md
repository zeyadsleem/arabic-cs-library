---
title: "الوسيط والمصادقة والتسجيل في tRPC"
---

### وسيط للمصادقة والتسجيل

يمكنك إنشاء وسيطات مخصّصة:

```typescript
// server/src/trpc.ts
import { TRPCError } from '@trpc/server';

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { user: ctx.user } }); // now user is non-null
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

استخدم `protectedProcedure` عندما تريد مسارات محمية بفحوصات مصادقة. وللتسجيل، بالمثل:

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
