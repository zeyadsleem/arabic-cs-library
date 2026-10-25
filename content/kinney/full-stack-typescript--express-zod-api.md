---
title: "بناء واجهة برمجية مع Express Zod API"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/express-zod-api"
---

[`express-zod-api`](https://www.npmjs.com/package/express-zod-api) مكتبة قوية تجمع أمان الأنواع الذي يوفّره Zod مع مرونة Express، وتمكّنك من تعريف نقاط نهاية واجهتك البرمجية والتحقق منها بسهولة. وسيرشدك هذا الدليل خلال إعداد واستخدام `express-zod-api` لبناء واجهات برمجية متينة وآمنة الأنواع.

## التثبيت

ثبّت `express-zod-api` واعتماداتها النظيرة:

```bash
npm install express-zod-api zod express
```

## تعريف نقاط نهاية الواجهة البرمجية

يدور `express-zod-api` حول تعريف نقاط نهاية الواجهة البرمجية كائناتٍ تحدّد المسار والتابع (method) والتحقق من المدخلات (باستخدام Zod) ومخطط الخرج.

### مثال: إنشاء نقطة نهاية لمستخدم

```typescript
import express from 'express';
import { createExpressEndpoints, z } from 'express-zod-api';

const app = express();
app.use(express.json());

const createUserEndpoint = {
  method: 'post',
  path: '/users',
  request: {
    body: z.object({
      username: z.string().min(3),
      email: z.string().email(),
      age: z.number().int().positive().optional(),
    }),
  },
  response: z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string(),
    age: z.number().int().positive().optional(),
  }),
  handler: async ({ input, res }) => {
    // Input is automatically validated against the request schema
    const { username, email, age } = input.body;

    // Simulate user creation
    const newUser = {
      id: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
      username,
      email,
      age,
    };

    // Respond with the validated response schema
    res.status(201).json(newUser);
  },
};

// Create Express endpoints from the API definition
createExpressEndpoints({
  endpoints: [createUserEndpoint],
  app,
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

### مفاهيم أساسية

- **`method`:** تابع HTTP المُستخدم في الطلب (مثل ‘get’ و‘post’ و‘put’ و‘delete’).
- **`path`:** مسار نقطة النهاية في واجهتك البرمجية.
- **`request`:** يعرّف التحقق من المدخلات باستخدام مخططات Zod لكل من `body` و`query` و`params`.
- **`response`:** يعرّف مخطط الخرج باستخدام Zod.
- **`handler`:** دالة غير متزامنة تستقبل `input` و`res` بعد التحقق منهما (كائن استجابة Express).

## التعامل مع معاملات الاستعلام والمسار

يجعل `express-zod-api` التعامل مع معاملات الاستعلام والمسار أمرًا سهلًا.

### مثال: جلب مستخدم بالمعرّف

```typescript
const getUserEndpoint = {
  method: 'get',
  path: '/users/:userId',
  request: {
    params: z.object({
      userId: z.string().uuid(),
    }),
  },
  response: z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string(),
  }),
  handler: async ({ input, res }) => {
    const { userId } = input.params;
    // ... logic to get the user
    const user = {
      id: userId,
      username: 'john_doe',
      email: 'john@example.com',
    };
    res.json(user);
  },
};
```

### مثال: البحث عن مستخدمين بمعاملات استعلام

```typescript
const searchUsersEndpoint = {
  method: 'get',
  path: '/search',
  request: {
    query: z.object({
      query: z.string().optional(),
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().default(10),
    }),
  },
  response: z.array(
    z.object({
      id: z.string().uuid(),
      username: z.string(),
      email: z.string(),
    }),
  ),
  handler: async ({ input, res }) => {
    const { query, page, limit } = input.query;
    // ... search logic
    const users = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'john_doe',
        email: 'john@example.com',
      },
    ];
    res.json(users);
  },
};
```

## معالجة الأخطاء

يتعامل `express-zod-api` تلقائيًا مع أخطاء تحقّق Zod، فيعيد حالة 400 مع تفاصيل الخطأ. ويمكنك أيضًا معالجة أخطاء مخصّصة داخل معالجاتك.

### مثال: معالجة أخطاء مخصّصة

```typescript
const exampleEndpoint = {
  // ...
  handler: async ({ res }) => {
    try {
      // some logic that can throw errors.
      throw new Error('custom error');
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ error: e.message });
      } else {
        res.status(500).json({ error: 'unknown error' });
      }
    }
  },
};
```

## فوائد `express-zod-api`

- **أمان الأنواع:** يضمن Zod التحقق من مدخلات واجهتك البرمجية ومخرجاتها وتحديد أنواعها.
- **تعريف مبسّط للواجهة البرمجية:** عرّف نقاط نهاية واجهتك البرمجية كائنات، ما يجعلها سهلة القراءة والصيانة.
- **تحقّق تلقائي:** يُطبَّق تحقّق Zod تلقائيًا على الطلبات الواردة.
- **تقليل الشيفرة المتكرّرة:** يقلّل `express-zod-api` مقدار الشيفرة التي تحتاج إلى كتابتها للتحقق ومعالجة الأخطاء.
- **توثيق واضح:** تعمل مخططات Zod كتوثيق واضح لنقاط نهاية واجهتك البرمجية.
- **تجربة مطوّر محسّنة:** تعزّز المكتبة تجربة التطوير بتوفير أنواع قوية وتحقق سليم.
