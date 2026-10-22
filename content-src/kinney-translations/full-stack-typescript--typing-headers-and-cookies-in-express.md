---
title: "تحديد أنواع الترويسات وملفات تعريف الارتباط"
---

تؤدّي ترويسات الطلب والاستجابة دورًا حاسمًا في تواصل HTTP. ويمكن لـ TypeScript أن يساعد في ضمان تحديد أنواعها تحديدًا سليمًا.

## تحديد أنواع ترويسات الطلب

تصل الترويسات كنصوص أو بلا قيمة (undefined):

```typescript
// Define expected authorization header

interface AuthHeaders {
  authorization?: string;
}

app.get('/protected', (req: Request<{}, {}, {}, {}, AuthHeaders>, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }

  // Process authorization header

  const token = authHeader.replace('Bearer ', '');

  // …
});
```

لكن المعامل العام الخامس في Request أقل استخدامًا شيوعًا. والمقاربة العملية أكثر هي استخدام تأكيدات الأنواع أو التحقق من الترويسات:

```typescript
// Header validation middleware

function requireHeader(headerName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers[headerName]) {
      return res.status(400).json({
        error: `Missing required header: ${headerName}`,
      });
    }

    next();
  };
}

// Using the middleware

app.get('/protected', requireHeader('authorization'), (req: Request, res: Response) => {
  // We can now safely assert this exists

  const authHeader = req.headers.authorization as string;

  // …
});
```

## تعيين ترويسات الاستجابة

في شأن ترويسات الاستجابة، تساعدك TypeScript بقدر أكثر محدودية لأن الترويسات تُعيَّن إجرائيًا:

```typescript
app.get('/api/data', (req: Request, res: Response) => {
  // Set headers

  res.setHeader('Content-Type', 'application/json');

  res.setHeader('Cache-Control', 'no-cache');

  // Send response

  res.json({ data: 'example' });
});
```

ويمكننا تحسين ذلك بالثوابت ودوال مساعدة:

```typescript
// Define header constants

const HEADERS = {
  CONTENT_TYPE: 'Content-Type',

  CACHE_CONTROL: 'Cache-Control',

  AUTHORIZATION: 'Authorization',
} as const;

// Define header value constants

const CONTENT_TYPES = {
  JSON: 'application/json',

  HTML: 'text/html',

  XML: 'application/xml',
} as const;

// Helper function for setting common headers

function setStandardHeaders(res: Response): void {
  res.setHeader(HEADERS.CONTENT_TYPE, CONTENT_TYPES.JSON);

  res.setHeader(HEADERS.CACHE_CONTROL, 'no-cache');
}

// Usage

app.get('/api/data', (req: Request, res: Response) => {
  setStandardHeaders(res);

  // Additional custom headers

  res.setHeader('X-Custom-Header', 'value');

  res.json({ data: 'example' });
});
```

## العمل بملفات تعريف الارتباط

تضيف ملفات تعريف الارتباط (cookies) طبقة أخرى من التعقيد. ويوسّع وسيط `cookie-parser` الشائع كائن الطلب:

```typescript
import cookieParser from 'cookie-parser';

// Setup cookie parser

app.use(cookieParser());

// Define expected cookies

interface AuthCookies {
  sessionId?: string;
}

// Create a middleware to validate required cookies

function requireCookie(cookieName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies?.[cookieName]) {
      return res.status(400).json({
        error: `Missing required cookie: ${cookieName}`,
      });
    }

    next();
  };
}

// Use it in routes

app.get('/dashboard', requireCookie('sessionId'), (req: Request, res: Response) => {
  // Safe to assert this cookie exists

  const sessionId = req.cookies.sessionId as string;

  // Use the session ID

  // …

  res.send('Dashboard');
});

// Setting cookies

app.post('/login', (req: Request, res: Response) => {
  // Authentication logic

  // …

  // Set cookie

  res.cookie('sessionId', 'abc123', {
    httpOnly: true,

    secure: process.env.NODE_ENV === 'production',

    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.json({ success: true });
});
```

تأتي أنواع cookie-parser مضمنة في `@types/cookie-parser`، الذي يوسّع واجهة Request في Express.
