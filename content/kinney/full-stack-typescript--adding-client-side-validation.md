---
title: "إضافة التحقق من جهة العميل"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/adding-client-side-validation"
---

الآن وقد أعددنا كل شيء في تطبيق Express لدينا، فهل يمكننا فعل شيء مشابه في تطبيق React لدينا؟

```typescript
import {
  type NewTask,
  NewTaskSchema,
  type Task,
  TaskSchema,
  TasksSchema,
  type UpdateTask,
  UpdateTaskSchema,
} from 'busy-bee-schema';

const API_URL = 'http://localhost:4001';
```

## التحقق من مهامنا

لنتأكد من أن استجابتنا هي ما نعتقد أنها كذلك.

```typescript
export const fetchTasks = async (showCompleted: boolean): Promise<Task[]> => {
  const url = new URL(`/tasks`, API_URL);

  if (showCompleted) {
    url.searchParams.set('completed', 'true');
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return TasksSchema.parse(await response.json());
};
```

## جلب مهمة

سنتحقق من مهمة واحدة.

```typescript
export const getTask = async (id: string): Promise<Task> => {
  const url = new URL(`/tasks/${id}`, API_URL);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }

  return TaskSchema.parse(await response.json());
};
```

## إنشاء مهمة

بالنسبة إلى طلبات `POST`، سنرغب في التحقق من الجسم.

```typescript
export const createTask = async (task: NewTask): Promise<void> => {
  const url = new URL('/tasks', API_URL);

  const body = JSON.stringify(NewTaskSchema.parse(task));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }
};
```

لنتحقق من الجسم الخاص بتحديث المهمة أيضًا.

```typescript
export const updateTask = async (id: string, task: UpdateTask): Promise<void> => {
  const url = new URL(`/tasks/${id}`, API_URL);

  const body = JSON.stringify(UpdateTaskSchema.parse(task));

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }
};
```

## حذف مهمة

لا يوجد في الواقع شيء نفعله هنا.

```typescript
export const deleteTask = async (id: string): Promise<void> => {
  const url = new URL(`/tasks/${id}`, API_URL);

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
```

**التالي**: [التحقق من طبقة البيانات](https://stevekinney.com/courses/full-stack-typescript/validating-the-data-layer)
