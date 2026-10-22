---
title: "من Zod إلى OpenAPI"
---

لنمرّ عبر عملية إضافة توثيق OpenAPI إلى خادم Express مكتوب بـ TypeScript يستخدم Zod للتحقق.

## توسيع مخططات Zod ببيانات OpenAPI الوصفية

أنشئ ملفًا جديدًا `openapi.ts` سيحوّل مخططات Zod لديك إلى صيغة OpenAPI:

```typescript
import { extendZodWithOpenApi, generateSchema } from '@anatine/zod-openapi';
import { OpenAPIObject } from 'openapi3-ts/oas31';
import { z } from 'zod';
import * as schemas from './your-schemas'; // Import your Zod schemas

extendZodWithOpenApi(z);

// Define TaskSchema with OpenAPI metadata
const TaskSchema = schemas.TaskSchema.openapi({
  description: 'A task item',
  example: {
    id: 1,
    title: 'Complete OpenAPI integration',
    description: 'Add OpenAPI specs to the tasks API',
    completed: false,
  },
});

const TasksSchema = schemas.TasksSchema.openapi({
  description: 'A collection of task items',
});

const NewTaskSchema = schemas.NewTaskSchema.openapi({
  description: 'Data required to create a new task',
  example: {
    title: 'Create a new task',
    description: 'This is a new task to be created',
  },
});

const UpdateTaskSchema = schemas.UpdateTaskSchema.openapi({
  description: 'Data for updating an existing task',
  example: {
    title: 'Updated task title',
    description: 'Updated task description',
    completed: true,
  },
});
```

## تعريف مستند OpenAPI

أضف مواصفة OpenAPI الكاملة إلى ملف `openapi.ts` لديك:

```typescript
export const openApiDocument: OpenAPIObject = {
  openapi: '3.1.0',
  info: {
    title: 'Tasks API',
    version: '1.0.0',
    description: 'API for managing tasks',
    contact: {
      name: 'Steve Kinney',
      email: 'hello@stevekinney.net',
    },
  },
  paths: {
    '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Get all tasks',
        description: 'Retrieve all tasks, optionally filtered by completion status',
        parameters: [
          {
            name: 'completed',
            in: 'query',
            required: false,
            schema: {
              type: 'boolean',
            },
            description: 'Filter tasks by completion status',
          },
        ],
        responses: {
          '200': {
            description: 'List of tasks',
            content: {
              'application/json': {
                schema: generateSchema(TasksSchema),
              },
            },
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
        },
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create a new task',
        description: 'Add a new task to the database',
        requestBody: {
          content: {
            'application/json': {
              schema: generateSchema(NewTaskSchema),
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Task created successfully',
          },
          '400': {
            description: 'Invalid input',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
        },
      },
    },
    '/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get a task by ID',
        description: 'Retrieve a single task by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
            description: 'ID of the task to retrieve',
          },
        ],
        responses: {
          '200': {
            description: 'Task found',
            content: {
              'application/json': {
                schema: generateSchema(TaskSchema),
              },
            },
          },
          '404': {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
        },
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update a task',
        description: 'Update an existing task by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
            description: 'ID of the task to update',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: generateSchema(UpdateTaskSchema),
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Task updated successfully',
          },
          '404': {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
          '400': {
            description: 'Invalid input',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
        },
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete a task',
        description: 'Delete a task by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
            description: 'ID of the task to delete',
          },
        ],
        responses: {
          '200': {
            description: 'Task deleted successfully',
          },
          '404': {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: generateSchema(ErrorResponseSchema),
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Task: generateSchema(TaskSchema),
      Tasks: generateSchema(TasksSchema),
      NewTask: generateSchema(NewTaskSchema),
      UpdateTask: generateSchema(UpdateTaskSchema),
      ErrorResponse: generateSchema(ErrorResponseSchema),
    },
  },
};
```

ثم ادمجه مع خادم Express لديك:

```typescript
// server.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './openapi';

export async function createServer() {
  const app = express();
  app.use(express.json());

  // Serve OpenAPI docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  // Expose OpenAPI spec as JSON
  app.get('/openapi.json', (req, res) => {
    res.json(openApiDocument);
  });

  // Your existing routes...

  return app;
}
```

## الوصول إلى التوثيق

بعد التنفيذ، يمكنك الوصول إلى:

- توثيق API التفاعلي على: `/api-docs`
- مواصفة OpenAPI JSON الخام على: `/openapi.json`
