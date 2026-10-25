---
title: "العمل عكسيًا من الأنواع مع Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/working-backwards-from-types-with-zod"
---

نعلم أننا نستطيع إنشاء أنواع من مخططات Zod باستخدام `z.infer()`، لكن أحيانًا نجد أنفسنا في موقف تكون فيه الأنواع *جاهزة لدينا بالفعل* ونريد إنشاء مخططات والتأكّد بنسبة 100% من أن تلك المخططات تطابق الأنواع.

لنقل إن لدينا النوع التالي:

```typescript
type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};
```

يمكننا استخدام `satisfies` للتأكّد من مطابقة مخططنا.

```typescript
const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
}) satisfies z.ZodType<Task>;
```

> **Zod v4**
>
> في Zod v4، يُفضَّل أن يكون `z.string().uuid()` بالصيغة `z.uuid()`. وقد تغيّر النوع العام `z.ZodType` من ثلاثة وسائط إلى اثنين (حُذف وسيط `Def`)، لكن `satisfies z.ZodType<Task>` ما زال يعمل لأنه يستخدم الوسيط الأول فقط.

وإذا كان مخططنا *لا* يطابق النوع الذي يُفترض أن يرضيه، فسيكون TypeScript هو من يصيح في وجهنا.
