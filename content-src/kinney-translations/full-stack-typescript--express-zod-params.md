---
title: "إضافة مخططات Zod إلى معاملات المسار"
---

معاملات البحث ومعاملات المسار سلاسل نصية من الناحية التقنية. لكنني أعلم أنها ينبغي أن تكون أرقامًا. لا بأس. لنتأكد فقط من أنها تُحوَّل قسريًا إلى أرقام.

```typescript
const TaskSchema = z.object({
  id: z.coerce.number().int(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.coerce.boolean(),
});

const TaskParamsSchema = TaskSchema.pick({ id: true });
```

يمكننا استخدامه هكذا.

```typescript
const { id } = TaskParamsSchema.parse(req.params);
```

## معاملات البحث

تعمل الفكرة الأساسية نفسها مع معاملات البحث.

```typescript
const TaskQuerySchema = z.object({
  completed: z.coerce.boolean().optional(),
});
```

أو قد أفعل شيئًا مثل هذا:

```typescript
const TaskQuerySchema = TaskSchema.pick({ completed: true }).partial();
```

والآن يمكننا التأكد من أن استعلاماتنا منطقية.

**التالي**: [استخدام وسيط للتحقق من المخطط](https://stevekinney.com/courses/full-stack-typescript/validating-schema-with-middleware)
