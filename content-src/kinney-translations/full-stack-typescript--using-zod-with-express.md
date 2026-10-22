---
title: "استخدام Zod مع Express"
---

تساعدك تعريفات الأنواع في TypeScript على التقاط الأخطاء في وقت التصريف، لكنها لا تستطيع التحقق من البيانات عندما تكون شيفرتك قيد التشغيل فعلًا. وهنا تتألق مكتبة للتحقق من المخططات مثل [zod](https://www.npmjs.com/package/zod). فهي تردم الفجوة بفرض فحوص وقت التشغيل مع الحفاظ على سلامة الأنواع.

وفيما يلي مثال على استخدام Zod في تطبيق [Express](https://expressjs.com/) للتأكد من أن الطلبات الواردة تطابق البنية المتوقعة قبل أن يعالجها معالج المسار.

```typescript
import { z } from 'zod';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

// Define a schema for creating users
const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().positive().optional(),
});

// Infer the TypeScript type from the schema
type CreateUserInput = z.infer<typeof createUserSchema>;

// Middleware for validating request body
function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      }
      next(error);
    }
  };
}

app.post(
  '/users',
  validateBody(createUserSchema),
  (req: Request<{}, {}, CreateUserInput>, res: Response) => {
    // req.body is validated & typed as CreateUserInput
    const { username, email, password, age } = req.body;
    // … create user logic here …
    res.status(201).json({ message: 'User created' });
  },
);
```

> **Zod v4**
>
> في Zod v4، يُفضَّل استخدام `z.email()` بدلًا من `z.string().email()`. كما تغيّرت بصمة النوع العام `ZodType` من `ZodType<Output, Def, Input>` إلى `ZodType<Output, Input>` (إذ حُذفت المعلمة `Def`). ولا يزال المرادف `z.ZodTypeAny` المستخدم هنا يعمل في الإصدار v4.

## التحقق من معاملات الاستعلام

عند التعامل مع نقاط نهاية GET التي تتضمن سلاسل استعلام، يمكنك تعريف مخطط لـ req.query. ولأن معاملات الاستعلام تصل دائمًا كسلاسل، فقد تحتاج إلى z.string().transform(…) أو z.coerce.number() لتحويلها.

```typescript
const searchQuerySchema = z.object({
  q: z.string().optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});
type SearchQuery = z.infer<typeof searchQuerySchema>;

function validateQuery<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Invalid query', details: error });
    }
  };
}

app.get(
  '/search',
  validateQuery(searchQuerySchema),
  (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
    // req.query is validated & typed as SearchQuery
    const { q, page = 1, limit = 10 } = req.query;
    // … search logic …
    res.json({ query: q, page, limit });
  },
);
```

### التحقق من معاملات URL

إذا كانت مساراتك تتضمن معاملات مسار (مثل /:userId)، فيمكنك التحقق من req.params بنهج مشابه.

```typescript
const userParamsSchema = z.object({
  userId: z.string().uuid(),
});
type UserParams = z.infer<typeof userParamsSchema>;

function validateParams<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Invalid params', details: error });
    }
  };
}

app.get(
  '/users/:userId',
  validateParams(userParamsSchema),
  (req: Request<UserParams>, res: Response) => {
    // req.params.userId is validated & typed as a string UUID
    res.json({ userId: req.params.userId });
  },
);
```

> **Zod v4**
>
> في Zod v4، يُفضَّل استخدام `z.uuid()` بدلًا من `z.string().uuid()`. ويفرض `z.uuid()` في الإصدار v4 تحققًا أشد صرامة وفق RFC 9562؛ فاستخدم `z.guid()` للحصول على السلوك المتوافق مع v3.

## التحقق من الاستجابات

يستطيع Zod أيضًا التحقق من بياناتك الصادرة. وهذا ليس ضروريًا دائمًا، لكن في البيئات العالية المخاطر (مثل البيانات المالية أو الطبية)، قد يكون مفيدًا للتأكد من أن شيفرتك تعيد بالضبط التنسيق الذي تقصده.

```typescript
const userListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(createUserSchema), // returning a list of users
});

function sendUserListResponse(res: Response, payload: unknown) {
  // Validate the shape before sending
  const parsedPayload = userListResponseSchema.parse(payload);
  res.json(parsedPayload);
}
```

### التحليل الآمن مقابل الرمي

إذا كنت تفضّل ألا تتعامل مع الاستثناءات بـ `try`/`catch`، ففكّر في `schema.safeParse(data)` بدلًا من `schema.parse(data)`. فهو يعيد `{ success: boolean; data?: T; error?: ZodError }`، ما يتيح لك الرد بحالة 400 إذا كانت success تساوي false.

```typescript
const result = createUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.errors });
}
// result.data is valid
```

## لماذا تستخدم Zod؟

1. تحصل على تحقق في وقت التشغيل *و* تنميط ساكن من المخطط نفسه.
2. تضمن ألا تصل إلى معالجات مساراتك إلا بيانات صالحة، فتجنّب الأعطال المحتملة أو الثغرات الأمنية.
3. يتكامل Zod جيدًا مع أطر شائعة مثل [Express](https://www.npmjs.com/package/express) وNestJS، أو أي شيء آخر في منظومة Node.js.
4. يمكنك توسيع هذا النمط ليشمل معاملات الاستعلام ومعاملات URL وحتى بيانات الاستجابة، لتبقى سلسلة البيانات كلها قوية الأنواع ومتحقَّقًا منها.
