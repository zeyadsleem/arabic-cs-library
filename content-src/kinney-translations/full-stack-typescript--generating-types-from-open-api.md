---
title: "توليد الأنواع من مواصفة OpenAPI"
---

بعد أن تصبح لديك مواصفة OpenAPI، يمكنك استخدام [`openapi-typescript`](https://npm.im/openapi-typescript) لتوليد الأنواع.

```bash
npx openapi-typescript ./openapi.json -o src/api.types.ts
```

النتائج كبيرة ومتشابكة. ويمكنك إلقاء نظرة على المخرجات [هنا](https://gist.github.com/stevekinney/a43731e45e8822bc0b7b7d814938ab27).

## توليد عميل من أنواع OpenAPI

الآن وقد صارت لدينا الأنواع، يمكننا توليد عميل تلقائيًا. بل لم نعد نحتاج إلى Zod!

لنبدأ بتوليد تعريفات الأنواع من مواصفة OpenAPI لديك:

```bash
npx openapi-typescript openapi.json -o src/api.types.ts
```

وهذا ينشئ ملف TypeScript بتعريفات أنواع تطابق بنية API لديك.

### إنشاء عميل API آمن الأنواع

لنُنفّذ الآن عميل API باستخدام الأنواع المولَّدة:

```typescript
// src/api.ts
import createClient from 'openapi-fetch';
import type { paths } from './api.types';

// Set your API base URL

const API_URL = 'http://localhost:4001';

// Create the client with type information

const { GET, POST, PUT, DELETE } = createClient<paths>({ baseUrl: API_URL });
```

## تنفيذ دوال API آمنة الأنواع

لنستبدل نداءات fetch التقليدية بدوال API متنمّطة:

### جلب مجموعة (GET)

```typescript
export const fetchTasks = async (showCompleted: boolean) => {
  const { data, error } = await GET('/tasks', {
    params: {
      query: showCompleted ? { completed: true } : {},
    },
  });

  if (error) throw new Error('Failed to fetch tasks');

  return data || [];
};
```

### جلب مورد واحد (GET مع معامل مسار)

```typescript
export const getTask = async (id: string) => {
  const { data, error } = await GET('/tasks/{id}', {
    params: {
      path: { id: Number(id) },
    },
  });

  if (error) throw new Error('Failed to fetch task');

  return data;
};
```

### إنشاء مورد (POST)

```typescript
export const createTask = async (task: { title: string; description?: string }) => {
  const { error } = await POST('/tasks', {
    body: task,
  });

  if (error) throw new Error('Failed to create task');
};
```

### تحديث مورد (PUT)

```typescript
export const updateTask = async (
  id: string,

  task: { title?: string; description?: string; completed?: boolean },
) => {
  const { error } = await PUT('/tasks/{id}', {
    params: {
      path: { id: Number(id) },
    },

    body: task,
  });

  if (error) throw new Error('Failed to update task');
};
```

### حذف مورد (DELETE)

```typescript
export const deleteTask = async (id: string) => {
  const { error } = await DELETE('/tasks/{id}', {
    params: {
      path: { id: Number(id) },
    },
  });

  if (error) throw new Error('Failed to delete task');
};
```

## فوائد هذا النهج

1. **سلامة الأنواع**: التقاط الأخطاء في وقت التصريف بدلًا من وقت التشغيل
2. **تجربة المطوّر**:

- إكمال تلقائي لنقاط نهاية API
- تلميحات أنواع للمعاملات المطلوبة والاختيارية
- تنميط سليم لأجسام الطلبات والاستجابات

1. **معالجة الأخطاء**: نمط متسق لمعالجة الأخطاء
2. **قابلية الصيانة**: عندما يتغيّر API، حدّث مواصفة OpenAPI وأعد توليد الأنواع

إن استخدام `openapi-fetch` مع أنواع TypeScript المولَّدة ينشئ عميل API سهلًا للغاية وآمن الأنواع، يحسّن إنتاجية المطوّر ويقلل أخطاء وقت التشغيل. ومع تطوّر API لديك، ما عليك سوى تحديث مواصفة OpenAPI وإعادة توليد الأنواع لإبقاء عميلك متزامنًا.
