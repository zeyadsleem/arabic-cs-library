---
title: "الاختبار مع Zod وExpress"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/testing-with-zod-and-express"
---

يُعدّ اختبار API الخاص بـ Express أمرًا حاسمًا لضمان موثوقيته وصحته. ويوضح هذا الدليل كيفية استخدام [`zod-fixture`](https://www.npmjs.com/package/zod-fixture) لتوليد بيانات اختبار واقعية انطلاقًا من مخططات Zod لديك، و[`superagent`](https://www.npmjs.com/package/superagent) لتوجيه طلبات HTTP إلى API الخاص بك.

## تثبيت الاعتمادات

ثبّت الاعتمادات اللازمة:

```bash
npm install superagent zod zod-fixture --save-dev
npm install @types/superagent --save-dev # if using TypeScript
```

وهذا يثبّت:

- [`superagent`](https://www.npmjs.com/package/superagent): عميل HTTP لاختبار API الخاص بك
- [`zod`](https://www.npmjs.com/package/zod): مكتبة التحقق من المخططات
- [`zod-fixture`](https://www.npmjs.com/package/zod-fixture): يولّد بيانات اختبار من مخططات Zod

## تعريف مخططات Zod

تأكد من أن API الخاص بـ Express يستخدم مخططات Zod للتحقق من الطلبات والاستجابات.

**مثال:**

```typescript
// schemas.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
  age: z.number().int().positive().optional(),
});
```

## إنشاء بيانات اختبار ثابتة من Zod

استخدم `zod-fixture` لتوليد بيانات اختبار انطلاقًا من مخططات Zod لديك.

**مثال:**

```typescript
// fixtures.ts
import { generateMock } from 'zod-fixture';
import { createUserSchema, userResponseSchema } from './schemas';

export const createUserFixture = () => generateMock(createUserSchema);
export const userResponseFixture = () => generateMock(userResponseSchema);
```

## كتابة حالات الاختبار

استخدم `superagent` لتوجيه طلبات HTTP إلى API الخاص بـ Express، و`zod-fixture` لتوليد بيانات الاختبار.

**مثال (باستخدام Jest):**

```typescript
// app.test.ts
import request from 'superagent';
import { createUserFixture, userResponseFixture } from './fixtures';
import { createUserSchema, userResponseSchema } from './schemas';
import express, { Request, Response } from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

app.post(
  '/users',
  (
    req: Request<{}, {}, z.infer<typeof createUserSchema>>,
    res: Response<z.infer<typeof userResponseSchema>>,
  ) => {
    const newUser: z.infer<typeof userResponseSchema> = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
    };
    res.status(201).json(newUser);
  },
);

const server = app.listen(3001); // Use a different port for testing

describe('User API', () => {
  afterAll(() => {
    server.close();
  });

  it('should create a user', async () => {
    const userData = createUserFixture();
    const response = await request.post('http://localhost:3001/users').send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(userData));
    expect(userResponseSchema.safeParse(response.body).success).toBe(true);
  });

  it('should handle invalid input', async () => {
    const invalidUserData = { username: 'a', email: 'invalid-email' }; // Invalid username and email
    try {
      await request.post('http://localhost:3001/users').send(invalidUserData);
    } catch (error: any) {
      expect(error.response.status).toBe(400); // Assuming your API returns 400 for invalid input
    }
  });

  it('should generate a valid user response fixture', () => {
    const responseData = userResponseFixture();
    expect(userResponseSchema.safeParse(responseData).success).toBe(true);
  });
});
```

## تشغيل الاختبارات

شغّل اختباراتك باستخدام إطار الاختبار الذي اخترته (مثل Jest أو Mocha).

```bash
npx jest app.test.ts
```

## الفوائد

- **بيانات اختبار واقعية:** يولّد `zod-fixture` بيانات اختبار واقعية انطلاقًا من مخططات Zod لديك، ما يضمن أن اختباراتك تشبه السيناريوهات الواقعية عن قرب.
- **سلامة الأنواع:** توفّر مخططات Zod وبياناتها الثابتة سلامة الأنواع، فتقلّل خطر الأخطاء.
- **اختبار مبسّط:** يبسّط `superagent` عملية توجيه طلبات HTTP، فيجعل اختباراتك أكثر قابلية للقراءة والصيانة.
- **التحقق:** يمكنك بسهولة التحقق من جسم الاستجابة مقابل مخططات zod لديك.
- **موثوقية محسّنة:** يحسّن الاختبار الشامل موثوقية API الخاص بك المبني على Express.
