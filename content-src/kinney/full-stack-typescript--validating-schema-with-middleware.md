---
title: "Validating Schema with Middleware"
lang: "en"
chapter: "full-stack-typescript"
slug: "validating-schema-with-middleware"
order: 21
source: "https://stevekinney.com/courses/full-stack-typescript/validating-schema-with-middleware"
---

We could create a middleware that allows us to validate the body of a request with a Zod schema.

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

Even better, we could try to hold on to the type.

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
> In Zod v4, `ZodSchema` still works as a type alias. The underlying `ZodType` generic changed from `ZodType<Output, Def, Input>` to `ZodType<Output, Input>`, but this middleware pattern works identically in both versions.

## Validating `POST`

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

## Validating `PUT`

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

**Next**: [Validating Query and Path Parameters with Middleware](https://stevekinney.com/courses/full-stack-typescript/validating-query-and-path-parameters)
