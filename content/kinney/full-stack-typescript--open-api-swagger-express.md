---
title: "عقود OpenAPI/Swagger"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/open-api-swagger-express"
---

يوفر OpenAPI (المعروف سابقًا بـ Swagger) طريقة قوية لتعريف عقود API وتوثيقها. ويضمن دمجه مع TypeScript سلامة الأنواع والاتساق في تطبيقك. ويرشدك هذا الدليل عبر تعريف API باستخدام OpenAPI، وتوليد أنواع TypeScript، واستخدامها داخل تطبيق Express لديك.

## تعريف API باستخدام OpenAPI

يستخدم OpenAPI صيغة YAML أو JSON لوصف نقاط نهاية API وأجسام الطلبات والاستجابات وتفاصيل أخرى.

### مثال على مواصفة OpenAPI (openapi.yaml):

```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get a list of users
      parameters:
        - name: query
          in: query
          description: Search query
          schema:
            type: string
        - name: page
          in: query
          description: Page number
          schema:
            type: integer
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
  /users/{userId}:
    get:
      summary: Get a user by ID
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        username:
          type: string
        email:
          type: string
    CreateUserRequest:
      type: object
      properties:
        username:
          type: string
        email:
          type: string
```

يعرّف ملف YAML هذا نقاط نهاية لاسترجاع المستخدمين وإنشائهم، مع مخططات طلباتها واستجاباتها.

## توليد أنواع TypeScript

تولّد أداة [`openapi-typescript`](https://www.npmjs.com/package/openapi-typescript) أنواع TypeScript انطلاقًا من مواصفة OpenAPI لديك.

```bash
npm install -D openapi-typescript
```

### توليد الأنواع

```bash
npx openapi-typescript openapi.yaml -o src/types/api.d.ts
```

يولّد هذا الأمر ملف `src/types/api.d.ts` الذي يحتوي أنواع TypeScript المقابلة لمخططات OpenAPI لديك.

### مثال على الأنواع المولَّدة (`api.d.ts`)

```typescript
export interface User {
  id?: string;
  username?: string;
  email?: string;
}

export interface CreateUserRequest {
  username?: string;
  email?: string;
}

export interface paths {
  '/users': {
    get: {
      parameters: {
        query?: {
          query?: string;
          page?: number;
        };
      };
      responses: {
        '200': {
          content: {
            'application/json': components['schemas']['User'][];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          'application/json': components['schemas']['CreateUserRequest'];
        };
      };
      responses: {
        '201': {
          content: {
            'application/json': components['schemas']['User'];
          };
        };
      };
    };
  };
  '/users/{userId}': {
    get: {
      parameters: {
        path: {
          userId: string;
        };
      };
      responses: {
        '200': {
          content: {
            'application/json': components['schemas']['User'];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    User: {
      id?: string;
      username?: string;
      email?: string;
    };
    CreateUserRequest: {
      username?: string;
      email?: string;
    };
  };
}
```

## استخدام الأنواع المولَّدة في Express

استورد الأنواع المولَّدة إلى معالجات مسارات Express لديك:

```typescript
import express, { Request, Response } from 'express';
import { paths } from './types/api';

const app = express();
app.use(express.json());

// Example route handler
app.get(
  '/users',
  (
    req: Request<
      {},
      paths['/users']['get']['responses']['200']['content']['application/json'],
      {},
      paths['/users']['get']['parameters']['query']
    >,
    res: Response<paths['/users']['get']['responses']['200']['content']['application/json']>,
  ) => {
    // Access typed query parameters
    const query = req.query.query;
    const page = req.query.page;
    // ... your logic
    const users: paths['/users']['get']['responses']['200']['content']['application/json'] = [
      { id: '1', username: 'john', email: 'john@example.com' },
    ];
    res.json(users);
  },
);

app.post(
  '/users',
  (
    req: Request<
      {},
      paths['/users']['post']['responses']['201']['content']['application/json'],
      paths['/users']['post']['requestBody']['content']['application/json']
    >,
    res: Response<paths['/users']['post']['responses']['201']['content']['application/json']>,
  ) => {
    // Access typed request body
    const { username, email } = req.body;
    // ... your logic
    const user: paths['/users']['post']['responses']['201']['content']['application/json'] = {
      id: '2',
      username: username,
      email: email,
    };
    res.status(201).json(user);
  },
);

app.get(
  '/users/:userId',
  (
    req: Request<
      paths['/users/{userId}']['get']['parameters']['path'],
      paths['/users/{userId}']['get']['responses']['200']['content']['application/json']
    >,
    res: Response<
      paths['/users/{userId}']['get']['responses']['200']['content']['application/json']
    >,
  ) => {
    const userId = req.params.userId;
    // ... your logic
    const user: paths['/users/{userId}']['get']['responses']['200']['content']['application/json'] =
      { id: userId, username: 'john', email: 'john@example.com' };
    res.json(user);
  },
);

// ... other routes
```

## الفوائد

- **مصدر واحد للحقيقة:** تكون مواصفة OpenAPI لديك التعريف المركزي لـ API الخاص بك.
- **سلامة الأنواع:** تضمن أنواع TypeScript المولَّدة الاتساق بين API لديك وشيفرتك.
- **توثيق محسّن:** يوفر OpenAPI توثيقًا تفاعليًا لـ API الخاص بك.
- **أخطاء أقل:** يلتقط فحص الأنواع الأخطاء المحتملة مبكرًا في أثناء التطوير.

## تحسينات سير العمل

- ادمج `openapi-typescript` في عملية البناء لديك لتوليد الأنواع تلقائيًا كلما تغيّرت مواصفة OpenAPI لديك.
- استخدم أدوات التحقق من OpenAPI للتأكد من أن مواصفتك صالحة.
- فكّر في استخدام أدوات توليد الشيفرة لتوليد معالجات مسارات Express من مواصفة OpenAPI لديك.
- استخدم مكتبات مثل [`express-openapi-validator`](https://www.npmjs.com/package/express-openapi-validator) للتحقق من الطلبات مقابل مواصفة OpenAPI لديك في وقت التشغيل.
