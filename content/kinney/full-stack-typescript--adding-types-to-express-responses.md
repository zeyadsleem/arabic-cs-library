---
title: "إضافة الأنواع إلى استجابات Express"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/adding-types-to-express-responses"
---

تمامًا كما ننمّط مدخلات الطلب، ينبغي أن ننمّط مخرجات الاستجابة لضمان اتساق API.

```typescript
interface UserResponse {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

app.get(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response<UserResponse | { error: string }>) => {
    try {
      // Fetch user logic...
      const user: UserResponse = {
        id: '123',
        username: 'johndoe',
        email: 'john@example.com',
        createdAt: new Date().toISOString(),
      };

      res.json(user);
    } catch (error) {
      // TypeScript ensures this matches the error shape we declared
      res.status(404).json({ error: 'User not found' });
    }
  },
);
```

## أنماط استجابة API

من أجل استجابات API متسقة، فكّر في تعريف أنماط قياسية:

```typescript
// Define a standard API response structure
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
}

// Create helper functions for consistent responses
function sendSuccess<T>(res: Response<ApiResponse<T>>, data: T, status = 200) {
  return res.status(status).json({
    success: true,
    data,
  });
}

function sendError(
  res: Response<ApiResponse<never>>,
  message: string,
  code = 'INTERNAL_ERROR',
  status = 500,
  details?: unknown,
) {
  return res.status(status).json({
    success: false,
    error: {
      message,
      code,
      ...(details && { details }),
    },
  });
}

// Example usage
app.get(
  '/users/:id',
  async (req: Request<{ id: string }>, res: Response<ApiResponse<UserResponse>>) => {
    try {
      const user = await findUser(req.params.id);

      if (!user) {
        return sendError(res, 'User not found', 'USER_NOT_FOUND', 404);
      }

      return sendSuccess(res, user);
    } catch (error) {
      return sendError(res, 'Failed to retrieve user', 'RETRIEVAL_ERROR', 500, error);
    }
  },
);
```

يوفر هذا النمط فوائد عدة:

1. تنسيق استجابة API متسق في كل نقاط النهاية
2. سلامة الأنواع لكل من استجابات النجاح والأخطاء
3. فصل واضح بين معالجة النجاح ومعالجة الأخطاء
4. شيفرة متكررة أقل بفضل دوال المساعدة

## بث الاستجابات والأنواع المعقّدة

يستطيع Express إرسال أكثر من JSON فحسب. وبالنسبة إلى استجابات البث أو الأنواع المعقّدة، نحتاج إلى معالجة مخصّصة:

```typescript
// Streaming file response
app.get('/files/:id', (req: Request<{ id: string }>, res: Response) => {
  // For streams, the Response generic type isn't as helpful
  // because we're not using res.json()
  const fileStream = getFileStream(req.params.id);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');

  fileStream.pipe(res);
});

// For HTML responses
interface HtmlResponse {
  html: string;
}

app.get('/page', (req: Request, res: Response<HtmlResponse>) => {
  // This isn't ideal, as we're using res.send() with HTML
  // but typing it as if it's JSON
  res.send('<html><body><h1>Hello World</h1></body></html>');
});
```

في هذه الحالات، للنوع العام Response قيود. والنهج الأفضل هو استخدام أنواع اتحادية بحسب نوع المحتوى:

```typescript
// Define response types for different content types
type JsonResponse<T> = Response<T>;
type HtmlResponse = Response; // HTML responses don't benefit as much from typing
type StreamResponse = Response; // Same for streams

// Create more specific route handler types
interface RouteHandlers {
  json<T, P = {}, Q = {}>(req: Request<P, {}, {}, Q>, res: JsonResponse<T>): void;

  html(req: Request, res: HtmlResponse): void;

  stream(req: Request, res: StreamResponse): void;
}

// Example usage
const handlers: RouteHandlers = {
  json<UserResponse>(req, res) {
    // Handle JSON response
    res.json({ id: '123', username: 'johndoe' });
  },

  html(req, res) {
    // Handle HTML response
    res.send('<html><body><h1>Hello</h1></body></html>');
  },

  stream(req, res) {
    // Handle stream response
    getFileStream().pipe(res);
  },
};

// Register routes
app.get('/api/users', handlers.json);
app.get('/page', handlers.html);
app.get('/download', handlers.stream);
```

يوفر هذا النهج وضوحًا أكبر بشأن نوع الاستجابة في معالجات مساراتك.

## تقنيات تنميط متقدمة: أدوات قوية

الآن وقد غطّينا الأساسيات، لنستكشف تقنيات تنميط متقدمة تجعل Express مع TypeScript أقوى.

### أنواع موسومة لمزيد من الأمان

أحيانًا لا تكفي الأنواع الأساسية. فبالنسبة إلى المعرّفات والرموز وسلاسل النصوص الخاصة الأخرى، يمكننا استخدام الأنواع الموسومة (branded types):

```typescript
// Define branded types
type UserId = string & { readonly _brand: unique symbol };
type SessionToken = string & { readonly _brand: unique symbol };

// Create functions to safely create branded types
function createUserId(id: string): UserId {
  return id as UserId;
}

function createSessionToken(token: string): SessionToken {
  return token as SessionToken;
}

// Use in request and response types
interface GetUserRequest {
  params: {
    userId: UserId;
  };
}

interface UserResponse {
  id: UserId;
  username: string;
  email: string;
}

interface AuthResponse {
  token: SessionToken;
  user: UserResponse;
}

// Example usage
app.get('/users/:userId', (req: Request<GetUserRequest['params']>, res: Response<UserResponse>) => {
  const rawUserId = req.params.userId;

  // Convert string to branded type
  const userId = createUserId(rawUserId);

  // Now we have a type-safe userId that can't be confused with other string IDs
  const user = getUserById(userId);

  res.json(user);
});

app.post('/login', (req: Request, res: Response<AuthResponse>) => {
  // Generate a session token
  const token = createSessionToken(generateRandomToken());

  // Get user
  const userId = createUserId('123');
  const user = getUserById(userId);

  // Return typed response
  res.json({
    token,
    user,
  });
});
```

تضمن الأنواع الموسومة ألا تخلط خطأً بين أنواع مختلفة من المعرّفات أو الرموز، مع أنها كلها سلاسل نصية في الأصل.

### سلاسل وسيط آمنة الأنواع

قد يكون تنميط وسيط Express صعبًا على نحو صحيح، خصوصًا عندما يضيف الوسيط خصائص إلى الطلب:

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

يضمن هذا النمط وجود `req.user` وتنميطه على النحو الصحيح في معالج المسار، بفحوص في وقت التصريف ووقت التشغيل معًا.

### التعامل مع معالجات المسارات اللامتزامنة

لا يتعامل Express أصليًا مع الوعود، ما قد يؤدي إلى رفض غير معالَج. ويساعد غلاف آمن الأنواع في ذلك:

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

يضمن هذا النمط تمرير أي أخطاء في المعالجات اللامتزامنة إلى وسيط معالجة الأخطاء في Express على النحو الصحيح.

## معالجة الأخطاء المتكاملة: شبكة الأمان

معالجة الأخطاء السليمة حاسمة لـ APIs المتينة. ويساعد TypeScript على ضمان معالجة الأخطاء باتساق.

### وسيط أخطاء متنمّط

لوسيط أخطاء Express بصمة مميزة:

```typescript
// Define structured error types
interface AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;
}

// Create typed error classes
class NotFoundError extends Error implements AppError {
  statusCode = 404;
  code = 'NOT_FOUND';

  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

class ValidationError extends Error implements AppError {
  statusCode = 400;
  code = 'VALIDATION_ERROR';
  details: unknown;

  constructor(message = 'Validation failed', details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

// Create a type-safe error handler
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err);

  // Handle known error types
  if ('statusCode' in err && 'code' in err) {
    const appError = err as AppError;

    return res.status(appError.statusCode).json({
      error: {
        message: appError.message,
        code: appError.code,
        ...(appError.details && { details: appError.details }),
      },
    });
  }

  // Handle unknown errors
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}

// Register the error handler (must be last)
app.use(errorHandler);

// Usage in routes
app.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);

    if (!user) {
      throw new NotFoundError(`User with ID ${req.params.id} not found`);
    }

    res.json(user);
  }),
);

app.post(
  '/users',
  asyncHandler(async (req, res) => {
    try {
      // Validation logic
      const validatedData = validateUser(req.body);

      // Create user
      const user = await createUser(validatedData);

      res.status(201).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ValidationError('User validation failed', error.details);
      }
      throw error;
    }
  }),
);
```

تضمن هذه المقاربة المنظمة لمعالجة الأخطاء ما يلي:

1. كل الأخطاء متنمّطة على النحو الصحيح
2. استجابات الأخطاء تتبع تنسيقًا متسقًا
3. أنواع الأخطاء المختلفة تؤدي إلى رموز حالة HTTP مناسبة
4. تفاصيل الأخطاء محفوظة عند الحاجة

### أنواع الأخطاء الشاملة

لمقاربة متسقة في تطبيقك كله، عرّف أنواع الأخطاء في موضع مركزي:

```typescript
// errors.ts
export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
}

export interface ErrorResponse {
  error: {
    message: string;
    code: ErrorCode;
    details?: unknown;
  };
}

export class AppError extends Error {
  statusCode: number;
  code: ErrorCode;
  details?: unknown;

  constructor(message: string, code: ErrorCode, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, ErrorCode.NOT_FOUND, 404, details);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, details);
    this.name = 'ValidationError';
  }
}

// Additional error classes...
```

ثم استخدم هذه الأنواع في تطبيقك:

```typescript
import { NotFoundError, ValidationError, ErrorResponse } from './errors';

app.get(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response<UserResponse | ErrorResponse>) => {
    // Route implementation...
  },
);
```

## تكامل النظام: جعل TypeScript يعمل مع منظومتك

نادرًا ما توجد تطبيقات Express بمعزل عن غيرها. فهي تتكامل مع قواعد البيانات وواجهات API الخارجية وتطبيقات الواجهة الأمامية. ويستطيع TypeScript المساعدة في ضمان أن هذه التكاملات آمنة الأنواع.

### التكامل مع قواعد البيانات

بالنسبة إلى عمليات قواعد البيانات، فكّر في استخدام ORM مثل TypeORM أو Prisma أو Sequelize يوفر دعم TypeScript:

```typescript
// Using Prisma with TypeScript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The User type is automatically generated from your schema
async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

app.get(
  '/users/:id',
  asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const user = await getUserById(req.params.id);

    if (!user) {
      throw new NotFoundError(`User with ID ${req.params.id} not found`);
    }

    // Prisma types match your database schema
    res.json(user);
  }),
);
```

### التكامل مع واجهات API الخارجية

عند نداء واجهات API خارجية، عرّف أنواعًا للاستجابات المتوقعة:

```typescript
// Define types for external API responses
interface GithubUser {
  id: number;
  login: string;
  name: string;
  email: string | null;
  avatar_url: string;
}

// Type-safe API client
async function getGithubUser(username: string): Promise<GithubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json() as Promise<GithubUser>;
}

// Use in a route
app.get(
  '/github/:username',
  asyncHandler(async (req: Request<{ username: string }>, res: Response) => {
    try {
      const githubUser = await getGithubUser(req.params.username);

      // Transform to our API format
      const user = {
        id: githubUser.id.toString(),
        username: githubUser.login,
        name: githubUser.name,
        email: githubUser.email,
        avatarUrl: githubUser.avatar_url,
      };

      res.json(user);
    } catch (error) {
      if (error.message.includes('GitHub API error')) {
        throw new NotFoundError(`GitHub user ${req.params.username} not found`);
      }
      throw error;
    }
  }),
);
```

### التكامل مع الواجهة الأمامية: عقود API

بالنسبة إلى تطبيقات الواجهة الأمامية التي تستهلك API الخاص بك، أنشئ تعريفات أنواع مشتركة:

```typescript
// shared/api-types.ts (used by both frontend and backend)
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// API endpoints type definitions
export interface ApiEndpoints {
  'GET /users': {
    query: {
      page?: number;
      limit?: number;
      search?: string;
    };
    response: ApiResponse<PaginatedResponse<User>>;
  };

  'GET /users/:id': {
    params: {
      id: string;
    };
    response: ApiResponse<User>;
  };

  'POST /users': {
    body: CreateUserRequest;
    response: ApiResponse<User>;
  };

  // Define other endpoints...
}
```

ثم استخدم هذه الأنواع المشتركة في كل من خادم Express لديك وشيفرة الواجهة الأمامية:

```typescript
// Backend usage
import { ApiEndpoints, User, ApiResponse } from '../shared/api-types';

type GetUserParams = ApiEndpoints['GET /users/:id']['params'];
type GetUserResponse = ApiEndpoints['GET /users/:id']['response'];

app.get('/users/:id', (req: Request<GetUserParams>, res: Response<GetUserResponse>) => {
  // Implementation...
});

// Frontend usage (e.g., with fetch or axios)
async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data: ApiResponse<User> = await response.json();

  if (!data.success || !data.data) {
    throw new Error(data.error?.message || 'Failed to fetch user');
  }

  return data.data;
}
```

تضمن مقاربة الأنواع المشتركة هذه فرض عقد API الخاص بك باتساق في الواجهة الأمامية والخلفية معًا.

## التنقيح واستكشاف الأخطاء: عندما تسوء الأنواع

حتى مع TypeScript، ستصادف أحيانًا مشكلات متعلقة بالأنواع. وإليك كيفية تنقيحها وحلها.

### أخطاء الأنواع الشائعة وحلولها

#### خطأ: الخاصية غير موجودة على النوع

```typescript
Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
```

يحدث هذا غالبًا عندما تحاول الوصول إلى خصائص أضافها وسيط. والحلول:

1. أعلن الخاصية في مساحة أسماء Express
2. استخدم واجهة مخصّصة توسّع Request
3. استخدم توكيد النوع (كملاذ أخير)

#### خطأ: النوع غير قابل للإسناد

```typescript
Type '{ id: string; name: string; }' is not assignable to type 'User'.
  Property 'email' is missing in type '{ id: string; name: string; }' but required in type 'User'.
```

يحدث هذا عندما لا يطابق كائنك النوع المتوقع. والحلول:

1. أضف الخصائص الناقصة
2. اجعل الخاصية اختيارية في الواجهة
3. استخدم نوعًا جزئيًا: `Partial<User>`

#### خطأ: لا تحميل مطابق لهذا النداء

```typescript
No overload matches this call.
  The last overload gave the following error.
    Argument of type '(req: Request<{ id: string; }>, res: Response) => Promise<void>' is not assignable to parameter of type 'RequestHandler<...>'.
```

يحدث هذا غالبًا مع المعالجات اللامتزامنة. والحلول:

1. استخدم غلافًا للمعالج اللامتزامن
2. أعد الوعد صراحةً
3. أضف معالجة أخطاء سليمة في الدالة اللامتزامنة

### تقنيات التنقيح

#### فحص الأنواع

استخدم معلومات التمرير في Visual Studio Code لفحص الأنواع:

```typescript
// Hover over 'req' to see its inferred type
app.get('/users', (req, res) => {
  // Check req's type
});
```

#### المعامل `typeof`

استخدم `typeof` لفحص أنواع وقت التشغيل:

```typescript
app.post('/data', (req: Request, res: Response) => {
  console.log(typeof req.body); // "object" if JSON, "string" if text, etc.

  if (typeof req.body !== 'object' || req.body === null) {
    return res.status(400).send('Expected object body');
  }
});
```

#### حرّاس الأنواع

أنشئ حرّاس أنواع مخصّصين للتحقق من الأنواع في وقت التشغيل:

```typescript
// Define a type guard for User objects
function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.username === 'string' &&
    typeof obj.email === 'string'
  );
}

// Use it in a route
app.post('/users', (req: Request, res: Response) => {
  if (!isUser(req.body)) {
    return res.status(400).send('Invalid user data');
  }

  // req.body is now typed as User
  const { id, username, email } = req.body;
});
```

## اعتبارات الأداء: أنواع بلا تنازلات

يضيف TypeScript أمانًا في وقت التصريف دون كلفة في وقت التشغيل، لكن لا تزال هناك اعتبارات أداء.

### حجم الحزمة وزمن البدء

يُصرَّف TypeScript بعيدًا، لكن فحص الأنواع في الشيفرة قد يضيف كلفة:

```typescript
// Runtime type checking can impact performance
function validateUser(data: unknown): User {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('username' in data) ||
    !('email' in data) ||
    typeof data.username !== 'string' ||
    typeof data.email !== 'string'
  ) {
    throw new ValidationError('Invalid user data');
  }

  return data as User;
}

// More efficient with schema validation libraries
const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

function validateUser(data: unknown): User {
  return userSchema.parse(data);
}
```

مكتبات التحقق من المخططات محسّنة للأداء، ما يجعلها أفضل من التحقق المكتوب يدويًا.

### إدارة الذاكرة

لا يغيّر TypeScript إدارة الذاكرة في JavaScript، لكنه يساعد في منع تسريبات الذاكرة عبر التنميط السليم:

```typescript
// Without proper typing, this could leak
let userCache: any = {};

// With proper typing, it's clear what's stored
let userCache: Record<string, { user: User; timestamp: number }> = {};

// Even better, with a proper cache interface
interface Cache<T> {
  get(key: string): T | undefined;
  set(key: string, value: T, ttl?: number): void;
  delete(key: string): boolean;
}

class UserCache implements Cache<User> {
  private cache: Map<string, { value: User; expires: number }> = new Map();

  get(key: string): User | undefined {
    const item = this.cache.get(key);

    if (!item) return undefined;

    if (item.expires < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  set(key: string, value: User, ttl = 3600000): void {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl,
    });
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

// Usage
const userCache = new UserCache();
app.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    // Try cache first
    const cachedUser = userCache.get(req.params.id);

    if (cachedUser) {
      return res.json(cachedUser);
    }

    // Fetch and cache
    const user = await getUserById(req.params.id);

    if (user) {
      userCache.set(req.params.id, user);
    }

    res.json(user);
  }),
);
```

### تحسين أداء التحقق

بالنسبة إلى APIs ذات الإنتاجية العالية، قد يصبح التحقق عنق زجاجة:

```typescript
// Optimize schema validation for performance
const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

// Precompile the validation schema
const validateUser = userSchema.parse;

// Use in route handlers
app.post('/users', (req: Request, res: Response) => {
  try {
    const user = validateUser(req.body);
    // ...
  } catch (error) {
    // ...
  }
});
```

بالنسبة إلى المسارات الحرجة، فكّر في التحقق الانتقائي:

```typescript
// Validate only what you use
app.get('/users', (req: Request, res: Response) => {
  const page = Number(req.query.page || '1');
  const limit = Number(req.query.limit || '10');

  // Only validate pagination parameters
  if (isNaN(page) || page < 1) {
    return res.status(400).send('Invalid page parameter');
  }

  if (isNaN(limit) || limit < 1 || limit > 100) {
    return res.status(400).send('Invalid limit parameter');
  }

  // Proceed with validated parameters
});
```
