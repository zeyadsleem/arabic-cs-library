---
title: "Type Safe Routes in Express"
lang: en
source: "https://stevekinney.com/courses/full-stack-typescript/type-safe-routes-in-express"
---

One limitation of Express is that route paths are just strings, not checked against parameter types. We can build a type-safe router:

```typescript
function route<
  P extends Record<string, string> = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
>(path: string, …handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery>>) {
  return { path, handlers };
}
```

```typescript
const userRoutes = [
  route<{ id: string }, UserResponse>('/users/:id', (req, res) => {
    const userId = req.params.id;
    // …
  }),
  route<{}, UserResponse[], {}, { query?: string }>('/users', (req, res) => {
    const searchQuery = req.query.query;
    // …
  }),
];
```

```typescript
userRoutes.forEach(({ path, handlers }) => {
  app.get(path, …handlers);
});
```

While this doesn’t validate that `:id` in the path corresponds to the `id` in your params type, it does ensure that handlers receive correctly typed requests.
