---
title: "إضافة الأنواع إلى طلبات Express"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/adding-types-to-express"
---

لم يُبنَ نظام الأنواع في Express مع أخذ TypeScript في الحسبان. وتوفّر حزمة `@types/express` تعريفات أنواع أساسية، لكن استخدامها بفعالية يتطلب فهم دقائقها.

يدور Express أساسًا حول ثلاثة أنواع جوهرية:

```typescript
import { Request, Response, NextFunction } from 'express';

app.get('/users', (req: Request, res: Response, next: NextFunction) => {
  // Route handler logic
});
```

واجهتا Request و Response عامتان:

```typescript
interface Request<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
>
  extends core.Request {}

interface Response<ResBody = any, Locals extends Record<string, any> = Record<string, any>>
  extends core.Response {}
```

تلك الأنواع `any` مناطق خطر. فهي تمثل الأجزاء الجامحة غير المروَّضة من عقد API لديك التي لا يستطيع TypeScript التحقق منها. ومهمتنا أن نستبدلها بأنواع دقيقة تعكس السلوك الفعلي لـ API الخاص بك.

## معاملات الطلب

تصل معاملات الطلب عبر ثلاث قنوات: معاملات URL، وسلاسل الاستعلام، وأجسام الطلبات. ويحتاج كل منها إلى استراتيجيات تنميط متمايزة.

### تنميط معاملات URL

تمثل معاملات URL متغيّرات المسار في تعريفات مساراتك:

```typescript
// Define the parameter structure
interface UserParams {
  userId: string;
}

app.get('/users/:userId', (req: Request<UserParams>, res: Response) => {
  // TypeScript now knows req.params.userId exists and is a string
  const userId = req.params.userId;
});
```

هذا النهج يعمل، لكن فيه قيد: لا يتحقق TypeScript من أن أسماء المعاملات في سلسلة المسار تطابق واجهتك. ولذلك نحتاج أدوات إضافية مثل [`express-validator`](https://npm.im/express-validator) أو تقنيات متقدمة سنستكشفها لاحقًا.

### تنميط معاملات الاستعلام

تطرح سلاسل الاستعلام تحديًا فريدًا لأنها اختيارية بطبيعتها ويمكن أن تظهر أكثر من مرة:

```typescript
interface UserQuery {
  sort?: string;
  filter?: string;
  page?: string; // Query params are always strings with basic Express typing
}

app.get('/users', (req: Request<{}, {}, {}, UserQuery>, res: Response) => {
  // TypeScript knows about req.query.sort, req.query.filter, etc.
  const page = Number(req.query.page || '1');
});
```

لاحظ الكائنات الفارغة في النوع العام Request؛ فهي تمثل params و body، وهما غير مستخدمين في هذا المسار.

### تنميط أجسام الطلبات

تأتي أجسام الطلبات عادةً من طلبات `POST` أو `PUT` أو `PATCH`:

```typescript
interface CreateUserBody {
  username: string;
  email: string;
  password: string;
}

app.post('/users', (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  // TypeScript knows req.body has username, email, and password properties
  const { username, email, password } = req.body;
});
```

لكن هناك مأخذ: لا يتحقق Express من أن الطلب الوارد يطابق واجهتك. فقد يرسل طلب خبيث أو مشوّه بيانات مختلفة تمامًا، ولن يلتقط TypeScript ذلك في وقت التشغيل.

### تنميط الطلب الشامل

بالنسبة إلى المسارات التي تستخدم مصادر معاملات متعددة، يمكنك الجمع بين هذه الأساليب:

```typescript
interface UserRequest {
  params: {
    userId: string;
  };
  query: {
    fields?: string;
  };
  body: {
    name?: string;
    email?: string;
  };
}

app.patch(
  '/users/:userId',
  (
    req: Request<UserRequest['params'], {}, UserRequest['body'], UserRequest['query']>,
    res: Response,
  ) => {
    // Fully typed request with params, query, and body
  },
);
```

يصبح هذا النمط مطوّلًا سريعًا. ولإدارة التعقيد، سنستكشف مساعدات أنواع مخصّصة لاحقًا.

## توسيع كائن الطلب

يتيح Express توسيع كائن Request بخصائص مخصّصة، وغالبًا ما يحدث ذلك في وسيط. ويحتاج TypeScript إلى معرفة هذه التوسعات.

### الإعلان عن توسعات الطلب

تتيح مساحة أسماء Express توسيع واجهة Request:

```typescript
// In a declaration file (e.g., types.d.ts)
declare namespace Express {
  interface Request {
    user?: {
      id: string;
      roles: string[];
    };
    requestId: string;
  }
}

// Now this works everywhere
app.get('/profile', (req: Request, res: Response) => {
  // TypeScript knows req.user and req.requestId exist
  if (req.user) {
    // Do something with the authenticated user
  }
});
```

يعمل هذا النهج جيدًا للتوسعات على مستوى التطبيق كله، لكن له مساوئ:

1. يطبّق التوسعة عالميًا، حتى حيث قد لا تكون صحيحة.
2. لا يقدم ضمانات في وقت التصريف بأن الوسيط قد أرفق هذه الخصائص فعلًا.

### التوسعات الخاصة بالوسيط

لمزيد من التحكم الدقيق، يمكننا استخدام وسيط يضمن وجود الخصائص:

```typescript
// Define a middleware that attaches user data
const attachUser: RequestHandler = (req, res, next) => {
  // Authenticate and attach user
  req.user = { id: '123', roles: ['admin'] };
  next();
};

// Create a type guard to verify user exists
function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

// Use them together to ensure type safety
app.get('/admin', attachUser, ensureAuth, (req: Request, res: Response) => {
  // TypeScript now knows req.user exists and is non-null
  const { id, roles } = req.user; // No need for null check
});
```

ولأنماط أكثر تطورًا، يمكننا إنشاء أنواع وسيط مخصّصة:

```typescript
// Define a custom request type with guaranteed user property
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    roles: string[];
  };
}

// Define middleware that guarantees the user property
function authenticateMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Authentication logic...
  (req as AuthenticatedRequest).user = { id: '123', roles: ['user'] };
  next();
}

// Define a route handler that uses the authenticated request
function adminHandler(req: AuthenticatedRequest, res: Response): void {
  // TypeScript knows req.user exists and has the correct shape
  const { id, roles } = req.user;

  if (!roles.includes('admin')) {
    return res.status(403).send('Forbidden');
  }

  res.send(`Welcome, admin ${id}!`);
}

// Wire it all together
app.get('/admin', authenticateMiddleware, adminHandler);
```

يضمن هذا النمط ألا يعمل معالج المسار إلا عند وجود `req.user`، فيوفر ضمانات في وقت التشغيل *و* في وقت التصريف معًا.
