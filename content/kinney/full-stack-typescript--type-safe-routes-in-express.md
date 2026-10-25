---
title: "المسارات الآمنة الأنواع في Express"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/type-safe-routes-in-express"
---

من قيود Express أن مسارات الطرق ليست سوى نصوص، ولا تُفحص مقابل أنواع المعاملات. ويمكننا بناء موجّه آمن الأنواع:

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

ومع أن هذا لا يتحقق من أن `:id` في المسار يقابل `id` في نوع معاملاتك، فإنه يضمن أن تستقبل المعالجات طلبات محدّدة الأنواع تحديدًا سليمًا.
