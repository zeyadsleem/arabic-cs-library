---
title: "إضافة الأنواع إلى Express مع Zod"
---

لنضف بعض التحقق من المخطط إلى تطبيق Express لدينا. وسنبدأ برسم مخططاتنا.

```typescript
const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
});

const NewTaskSchema = TaskSchema.omit({ id: true, completed: true });
const UpdateTaskSchema = TaskSchema.partial().omit({ id: true });
```

## التحقق من المهام القادمة من قاعدة البيانات

الخطوة الأولى هي التأكد من أن ما نسترجعه من قاعدة البيانات صالح.

```typescript
// Validate the task
const result = TaskSchema.parse(task);

return res.json(result);
```

سينفجر الأمر تقنيًا، لكن السبب أن SQLite تخزّن قيمة `completed` المنطقية إما كـ `1` أو `0`. ولحسن الحظ، يمكننا تحويلها قسريًا إلى ما نتوقعه.

```typescript
const TaskSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.coerce.boolean(),
});
```

ويمكننا أيضًا اختيار اختصار كل شيء هكذا:

```typescript
const task = TaskSchema.or(z.undefined()).parse(await getTask.get([id]));
```

### التحقق من كل المهام

يمكننا فعل شيء مشابه للمسار `/tasks`.

```typescript
const TasksSchema = z.array(TaskSchema);
```

وسيصبح الآن بهذا الشكل:

```typescript
app.get('/tasks', async (req: Request, res: Response) => {
  const { completed } = req.query;
  const query = completed === 'true' ? completedTasks : incompleteTasks;

  try {
    const tasks = TasksSchema.parse(await query.all());
    return res.json(tasks);
  } catch (error) {
    return handleError(req, res, error);
  }
});
```

## إضافة التحقق من المخطط إلى جسم الطلب

يمكننا استخدام `NewTaskSchema` هنا.

```typescript
app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const task = NewTaskSchema.parse(req.body);
    await createTask.run([task.title, task.description]);
    return res.sendStatus(201);
  } catch (error) {
    return handleError(req, res, error);
  }
});
```

### تحديث المهام

ومرة أخرى، لا مفاجآت هنا.

```typescript
app.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const previous = TaskSchema.parse(await getTask.get([id]));
    const updates = UpdateTaskSchema.parse(req.body);
    const task = { ...previous, ...updates };

    await updateTask.run([task.title, task.description, task.completed, id]);
    return res.sendStatus(200);
  } catch (error) {
    return handleError(req, res, error);
  }
});
```

## التالي

- [التحقق من معاملات الطلب](https://stevekinney.com/courses/full-stack-typescript/express-zod-params)
