---
title: "Adding Zod Schemas to Path Parameters"
lang: "en"
chapter: "full-stack-typescript"
slug: "express-zod-params"
order: 19
source: "https://stevekinney.com/courses/full-stack-typescript/express-zod-params"
---

Search parameters and path parameters are technically strings. But, I know they should be numbers. It’s fine. Let’s just make sure that they coerce into numbers.

```typescript
const TaskSchema = z.object({
  id: z.coerce.number().int(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.coerce.boolean(),
});

const TaskParamsSchema = TaskSchema.pick({ id: true });
```

We can use it like this.

```typescript
const { id } = TaskParamsSchema.parse(req.params);
```

## Search Parameters

The same basic idea works for search parameters.

```typescript
const TaskQuerySchema = z.object({
  completed: z.coerce.boolean().optional(),
});
```

Or, I might do something like this:

```typescript
const TaskQuerySchema = TaskSchema.pick({ completed: true }).partial();
```

And now we can make sure our queries make sense.

**Next**: [Using Middleware to Validate Schema](https://stevekinney.com/courses/full-stack-typescript/validating-schema-with-middleware)
