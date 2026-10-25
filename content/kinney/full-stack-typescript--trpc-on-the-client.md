---
title: "استخدام tRPC على العميل"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/trpc-on-the-client"
---

يوثّق هذا الدليل كيف نقلنا واجهة العميل البرمجية من استخدام طلبات REST المباشرة إلى استخدام tRPC. وقبل تنفيذ هذه التغييرات كان ما يلي قد جُهّز:

- خادم tRPC (في `/server/src/trpc.ts`)
- مخططات مشتركة بين العميل والخادم (في `shared/schemas.ts`)
- عميل REST API قائم بالفعل (في `/client/src/api.ts`)

## تثبيت الاعتمادات

فعلت ذلك نيابةً عنك بالفعل، لكن يبدو من المناسب التنبيه إليه صراحةً. كانت الخطوة الأولى هي تثبيت حزم tRPC اللازمة على جانب العميل:

```bash
npm install @trpc/client
```

## تحديث عميل الواجهة البرمجية

أُعيدت هيكلة عميل REST API القائم بالكامل لاستخدام tRPC:

```typescript
import { type NewTask, type Task, type UpdateTask } from 'busy-bee-schema';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '../../server/src/trpc';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4001/api/trpc',
    }),
  ],
});

export const fetchTasks = async (showCompleted: boolean): Promise<Task[]> => {
  return client.task.getTasks.query({ completed: showCompleted ? true : undefined });
};
```

### أبرز التغييرات التي أُجريت

**إعداد العميل**: أنشأنا عميل tRPC الوسيط الذي يتصل بنقطة نهاية الخادم:

```typescript
const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4001/trpc',
    }),
  ],
});
```

### جلب المهام

حُدِّث لاستخدام استعلام tRPC

```typescript
export const fetchTasks = async (showCompleted: boolean): Promise<Task[]> => {
  return client.task.getTasks.query({ completed: showCompleted ? true : undefined });
};
```

### جلب مهمة واحدة

حُدِّث لاستخدام استعلام tRPC مع معامل المعرّف

```typescript
export const getTask = async (id: string): Promise<Task> => {
  const task = await client.task.getTask.query({ id: parseInt(id, 10) });

  if (!task) throw new Error('Failed to fetch task');

  return task;
};
```

### إنشاء مهمة

حُدِّث لاستخدام تعديل tRPC

```typescript
export const createTask = async (task: NewTask): Promise<void> => {
  await client.task.createTask.mutate(task);
};
```

### تحديث مهمة

حُدِّث لاستخدام تعديل tRPC مع بنية معاملات سليمة

```typescript
export const updateTask = async (id: string, task: UpdateTask): Promise<void> => {
  await client.task.updateTask.mutate({
    id: parseInt(id, 10),

    task,
  });
};
```

### حذف مهمة

حُدِّث لاستخدام تعديل tRPC

```typescript
export const deleteTask = async (id: string): Promise<void> => {
  await client.task.deleteTask.mutate({ id: parseInt(id, 10) });
};
```

## فوائد استخدام tRPC

1. **أمان الأنواع**: أمان كامل للأنواع من طرف إلى طرف بين العميل والخادم
2. **استدعاءات واجهة برمجية مبسّطة**: لا حاجة إلى بناء عناوين URL يدويًا أو التعامل مع أخطاء HTTP
3. **استنتاج تلقائي للأنواع**: يعرف العميل تلقائيًا شكل البيانات القادمة من الخادم
4. **تقليل الشيفرة المتكرّرة**: لا حاجة إلى تحقق صريح من البيانات أو تحليلها
5. **تجربة مطوّر أفضل**: إكمال تلقائي لنقاط النهاية المتاحة

## الخطوات التالية

- نفّذ تحديثات تفاؤلية لتحسين تجربة المستخدم
- أضف وسيطًا لمعالجة الأخطاء
- فكّر في تنفيذ تحديثات فورية باستخدام اشتراكات tRPC
