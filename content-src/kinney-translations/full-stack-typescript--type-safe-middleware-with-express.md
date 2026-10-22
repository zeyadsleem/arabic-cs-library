---
title: "وسيط آمن الأنواع مع Express"
---

### سلاسل وسيط آمنة الأنواع

قد يكون تحديد أنواع وسيط Express تحديدًا صحيحًا أمرًا صعبًا، خصوصًا عندما يضيف الوسيط خصائص إلى الطلب:

```typescript
// Define middleware that adds user to request
interface RequestWithUser extends Request {
  user: {
    id: UserId;
    roles: string[];
  };
}

function attachUser(req: Request, res: Response, next: NextFunction): void {
  // Authenticate and attach user
  (req as RequestWithUser).user = {
    id: createUserId('123'),
    roles: ['user'],
  };
  next();
}

// Type guard middleware
function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (!('user' in req)) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

// Create a type-safe middleware chain builder
function createProtectedRoute<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
>(
  handler: (
    req: RequestWithUser & Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => void,
) {
  return [attachUser, isAuthenticated, handler as RequestHandler];
}

// Use it to define protected routes
app.get(
  '/admin',
  ...createProtectedRoute<{}, { message: string }>((req, res) => {
    // req.user is properly typed and guaranteed to exist
    if (!req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json({ message: 'Welcome to admin area' });
  }),
);
```

يضمن هذا النمط وجود `req.user` وتحديد نوعه تحديدًا سليمًا في معالج مسارك، بفحوصات وقت التصريف ووقت التشغيل معًا.
