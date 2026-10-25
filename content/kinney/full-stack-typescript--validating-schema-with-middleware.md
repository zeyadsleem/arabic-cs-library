---
title: "التحقق من المخطط باستخدام وسيط"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/validating-schema-with-middleware"
---

يمكننا إنشاء وسيط يتيح لنا التحقق من جسم الطلب باستخدام مخطط Zod.

```typescript
const validateBody =
  (schema: ZodSchema) => (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      return handleError(request, response, error);
    }
  };
```

والأفضل من ذلك، يمكننا أن نحاول الاحتفاظ بالنوع.

```typescript
const validateBody =
  <T>(schema: ZodSchema<T>): RequestHandler<NonNullable<unknown>, NonNullable<unknown>, T> =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      return handleError(request, response, error);
    }
  };
```

> **Zod v4**
>
> في Zod v4، لا يزال `ZodSchema` يعمل كمرادف للنوع. تغيّر النوع العام الأساسي `ZodType` من `ZodType<Output, Def, Input>` إلى `ZodType<Output, Input>`، لكن نمط الوسيط هذا يعمل بالطريقة نفسها في كلا الإصدارين.

## التحقق من `POST`

```typescript
app.post('/tasks', validateBody(NewTaskSchema), async (req, res) => {
  try {
    const task = NewTaskSchema.parse(req.body);
    await createTask.run([task.title, task.description]);
    return res.sendStatus(201);
  } catch (error) {
    return handleError(req, res, error);
  }
});
```

## التحقق من `PUT`

```typescript
app.put('/tasks/:id', validateBody(UpdateTaskSchema), async (req, res) => {
  try {
    const { id } = TaskParamsSchema.parse(req.params);

    const previous = TaskSchema.parse(await getTask.get([id]));
    const updates = req.body;
    const task = { ...previous, ...updates };

    await updateTask.run([task.title, task.description, task.completed, id]);
    return res.sendStatus(200);
  } catch (error) {
    return handleError(req, res, error);
  }
});
```

**التالي**: [التحقق من معاملات الاستعلام والمسار باستخدام وسيط](https://stevekinney.com/courses/full-stack-typescript/validating-query-and-path-parameters)
