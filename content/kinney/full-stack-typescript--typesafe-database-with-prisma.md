---
title: "قاعدة بيانات آمنة الأنواع مع Prisma"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/typesafe-database-with-prisma"
---

في ما يلي درس تعليمي خطوة بخطوة لا يوضّح لك كيفية إعداد Prisma مع Express و TypeScript لتطبيق مهام بسيط فحسب، بل يسلّط الضوء أيضًا على التغييرات التي أجريتها — باستبدالك عميل `TaskClient` المخصّص لديك بـ Prisma للحصول على أمان كامل للأنواع. لِنبدأ.

## تهيئة Prisma

هيّئ Prisma بتشغيل:

```bash
npx prisma init
```

ينشئ هذا مجلد `prisma/` يحتوي على ملف `schema.prisma`. حرّر الملف لتعريف نموذج Task لديك:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
}
```

ثم شغّل ترحيلًا وولّد عميل Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## دمج Prisma في خادم Express لديك

في السابق كنت تستخدم `TaskClient` مخصّصًا (ونوع `Database` من SQLite) للتعامل مع عمليات قاعدة البيانات لديك. والآن ننتقل إلى Prisma للحصول على أمان أنواع حقيقي. وإليك نظرة على الفرق مع التغييرات:

```diff
diff --git a/server/src/server.ts b/server/src/server.ts
index bbdd593..53ee07a 100644
--- a/server/src/server.ts
+++ b/server/src/server.ts
@@ -1,8 +1,10 @@
 import cors from 'cors';
 import express from 'express';
-import type { Database } from 'sqlite';
 import swaggerUi from 'swagger-ui-express';

+import { PrismaClient } from '@prisma/client';
+const prisma = new PrismaClient();
+
```

### استبدال توابع CRUD

بدلًا من استدعاء توابع على عميلك المخصّص، تستخدم الآن توابع Prisma:

### `GET /tasks`

```typescript
const tasks = await prisma.task.findMany();
```

### `GET /tasks/:id`

```typescript
const task = await prisma.task.findUnique({ where: { id } });
```

### `POST /tasks`

```typescript
await prisma.task.create({ data: task });
```

### `PUT /tasks/:id`

```typescript
const data = req.body;
await prisma.task.update({ where: { id }, data });
```

### `DELETE /tasks/:id`

```typescript
await prisma.task.delete({ where: { id } });
```

## مثال `server.ts` المحدَّث بالكامل

إليك كيف قد يبدو ملف `server.ts` الكامل لديك بعد دمج Prisma:

```typescript
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {
  NewTaskSchema,
  TaskParamsSchema,
  TaskQuerySchema,
  UpdateTaskSchema,
} from 'busy-bee-schema';

import { handleError } from './handle-error.js';
import { openApiDocument } from './openapi.js';
import { validate } from './validate.js';

export async function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Serve OpenAPI docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  // Expose OpenAPI spec as JSON
  app.get('/openapi.json', (req, res) => {
    res.json(openApiDocument);
  });

  app.get('/tasks', validate({ query: TaskQuerySchema }), async (req, res) => {
    try {
      const tasks = await prisma.task.findMany();
      return res.json(tasks);
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  // Get a specific task
  app.get('/tasks/:id', validate({ params: TaskParamsSchema }), async (req, res) => {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({ where: { id } });

      if (!task) return res.status(404).json({ message: 'Task not found' });

      return res.json(task);
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  app.post('/tasks', validate({ body: NewTaskSchema }), async (req, res) => {
    try {
      const task = req.body;
      await prisma.task.create({ data: task });
      return res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  // Update a task
  app.put(
    '/tasks/:id',
    validate({ params: TaskParamsSchema, body: UpdateTaskSchema }),
    async (req, res) => {
      try {
        const { id } = req.params;

        const data = req.body;
        await prisma.task.update({ where: { id }, data });

        return res.status(200).json({ message: 'Task updated successfully' });
      } catch (error) {
        return handleError(req, res, error);
      }
    },
  );

  // Delete a task
  app.delete('/tasks/:id', validate({ params: TaskParamsSchema }), async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.task.delete({ where: { id } });
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      return handleError(req, res, error);
    }
  });

  return app;
}
```

*ملاحظة:* تأكد من التعامل مع تحويلات الأنواع إذا كانت معاملات مساراتك (مثل `id`) تحتاج إلى أن تكون أرقامًا. ووفقًا لمخطط Prisma لديك، قد تحتاج إلى تحويل `id` من نص إلى رقم (مثلًا باستخدام `Number(id)`).
