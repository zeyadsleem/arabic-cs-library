---
title: "Adding Client-Side Validation"
lang: "en"
chapter: "full-stack-typescript"
slug: "adding-client-side-validation"
order: 23
source: "https://stevekinney.com/courses/full-stack-typescript/adding-client-side-validation"
---

Now that we have everything set up in our Express application, can we do something similar in our React application.

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

## Validating Our Tasks

Let’s make sure our response is what we think it is.

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

## Get Task

We’ll validate an individual task.

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

## Create Task

For our `POST` requests, we’re going to want to validate the body.

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

Let’s validate the body for updating the task as well.

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

## Delete Task

There is actually nothing to do here.

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

**Next**: [Validating the Data Layer](https://stevekinney.com/courses/full-stack-typescript/validating-the-data-layer)
