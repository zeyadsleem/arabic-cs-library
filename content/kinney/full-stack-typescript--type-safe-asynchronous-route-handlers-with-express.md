---
title: "معالجات المسارات غير المتزامنة الآمنة الأنواع"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/type-safe-asynchronous-route-handlers-with-express"
---

لا يتعامل Express أصلًا مع الوعود (promises)، ما قد يؤدي إلى رفضات غير معالَجة. ويساعد غلاف آمن الأنواع في ذلك:

```typescript
// Define a wrapper for async route handlers
function asyncHandler<P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>(
  handler: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

// Use it with async routes
app.get(
  '/users/:id',
  asyncHandler<{ id: string }, UserResponse>(async (req, res) => {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' } as any);
    }

    res.json(user);
  }),
);
```

يضمن هذا النمط تمرير أي أخطاء في المعالجات غير المتزامنة تمريرًا سليمًا إلى وسيط معالجة الأخطاء في Express.
