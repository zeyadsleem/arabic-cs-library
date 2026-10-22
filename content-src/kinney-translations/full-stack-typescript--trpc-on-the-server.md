---
title: "استخدام tRPC على الخادم"
---

## تثبيت الاعتمادات

```bash
npm install express @trpc/server zod sqlite3
npm install -D typescript ts-node nodemon @types/node @types/express
```

- [`express`](https://npm.im/express): لخادم HTTP الخاص بنا.
- [`@trpc/server`](https://npm.im/@trpc/server): لنواة tRPC وتكاملها مع Express.
- [`zod`](https://npm.im/zod): مكتبة للتحقق من المخططات (الرفيق الذي لا يكلّ في التحقق من المدخلات).
- [`sqlite3`](https://npm.im/sqlite3): مشغّل قاعدة البيانات في مثالنا (لأن «SQLite أو لا شيء» في الأمثلة السريعة).
- [`typescript`](https://npm.im/typescript): أنت تعرف السبب.

## تعريف واجهة tRPC البرمجية

يعمل tRPC حول **الموجّهات (routers)** (مجموعات من الإجراءات) و**الإجراءات (procedures)** (دوال يمكن أن تكون استعلامات أو تعديلات أو اشتراكات).

### إنشاء قاعدة tRPC

أنشئ ملف `trpc.ts` يهيّئ الوظائف الأساسية لـ tRPC:

```typescript
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import {
  NewTaskSchema,
  TaskParamsSchema,
  TaskQuerySchema,
  UpdateTaskSchema,
} from 'busy-bee-schema';
import type { Context } from './trpc-context.js';

// Initialize tRPC with context
const t = initTRPC.context<Context>().create();

// Create router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Create the task router with procedures
export const taskRouter = router({
  // Get all tasks with optional filtering by completion status
  getTasks: publicProcedure
    .input(TaskQuerySchema) // Use Zod schema for input validation
    .query(async ({ input, ctx }) => {
      return await ctx.taskClient.getTasks(input);
    }),

  // Get a single task by ID
  getTask: publicProcedure.input(TaskParamsSchema).query(async ({ input, ctx }) => {
    const task = await ctx.taskClient.getTask(input.id);
    return task;
  }),

  // Create a new task
  createTask: publicProcedure.input(NewTaskSchema).mutation(async ({ input, ctx }) => {
    await ctx.taskClient.createTask({ task: input });
    return { success: true };
  }),

  // Update an existing task
  updateTask: publicProcedure
    .input(
      z.object({
        id: z.coerce.number().int(),
        task: UpdateTaskSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.taskClient.updateTask(input.id, input.task);
      return { success: true };
    }),

  // Delete a task
  deleteTask: publicProcedure.input(TaskParamsSchema).mutation(async ({ input, ctx }) => {
    await ctx.taskClient.deleteTask(input.id);
    return { success: true };
  }),
});

// Create the app router
export const appRouter = router({
  task: taskRouter,
});

// Export type definition of API for client usage
export type AppRouter = typeof appRouter;
```

### إعداد السياق

أنشئ ملف `trpc-context.ts` لتزويد كل إجراءات tRPC بالسياق اللازم:

```typescript
import { inferAsyncReturnType } from '@trpc/server';
import { TaskClient } from './client.js';
import { getDatabase } from './database.js';

/**
 * Creates context for tRPC procedures
 * Initializes database connection and task client
 */
export async function createContext() {
  const database = await getDatabase();
  const taskClient = new TaskClient(database);

  return {
    taskClient,
  };
}

// Export the context type for use in tRPC setup
export type Context = inferAsyncReturnType<typeof createContext>;
```

### إنشاء محوّل لـ Express

أنشئ ملف `trpc-adapter.ts` لدمج tRPC مع Express:

```typescript
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import { createContext } from './trpc-context.js';
import { appRouter } from './trpc.js';

/**
 * Creates an Express router with tRPC endpoints
 * @returns Express router with tRPC middleware
 */
export function createTRPCRouter() {
  const router = express.Router();

  router.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  return router;
}
```

### إضافة tRPC إلى تطبيق Express لديك

حدّث ملف `server.ts` الرئيسي لديك ليتضمّن موجّه tRPC:

```typescript
import { createTRPCRouter } from './trpc-adapter.js';

export async function createServer(database: Database) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Add tRPC router
  app.use('/api', createTRPCRouter());

  // ... rest of your Express setup
}
```

## استخدام tRPC

بعد تنفيذ هذه الخطوات، ستكون واجهة tRPC البرمجية متاحة على:

```typescript
/api/cprt / [procedure - path];
```

على سبيل المثال:

- `GET /api/trpc/task.getTasks` - جلب كل المهام
- `GET /api/trpc/task.getTask` - جلب مهمة محدّدة بعينها
- `POST /api/trpc/task.createTask` - إنشاء مهمة
- `POST /api/trpc/task.updateTask` - تحديث مهمة
- `POST /api/trpc/task.deleteTask` - حذف مهمة

## فوائد tRPC

1. **أمان الأنواع**: أمان كامل للأنواع من طرف إلى طرف بين العميل والخادم
2. **التحقق من المخططات**: تحقّق تلقائي من المدخلات باستخدام مخططات Zod
3. **تجربة المطوّر**: إكمال تلقائي أفضل وفحص للأنواع في محرّرك
4. **توثيق الواجهة البرمجية**: تعمل تعريفات الأنواع كتوثيق لواجهتك البرمجية
5. **الأداء**: يستخدم tRPC تقنية WebSockets للاشتراكات ونقلًا فعّالًا للبيانات

## الخطوات التالية

- أنشئ عميل tRPC في تطبيق الواجهة الأمامية لديك لاستهلاك نقاط النهاية هذه
- أضف وسيطًا للمصادقة والتفويض
- نفّذ استراتيجيات لمعالجة الأخطاء
- أضف إجراءات أكثر تعقيدًا بموجّهات متداخلة
