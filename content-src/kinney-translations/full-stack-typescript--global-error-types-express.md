---
title: "أنواع الأخطاء العامة مع Express"
---

لمقاربة متسقة في أنحاء تطبيقك، عرّف أنواع الأخطاء في موضع مركزي:

```typescript
// errors.ts
export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
}

export interface ErrorResponse {
  error: {
    message: string;
    code: ErrorCode;
    details?: unknown;
  };
}

export class AppError extends Error {
  statusCode: number;
  code: ErrorCode;
  details?: unknown;

  constructor(message: string, code: ErrorCode, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, ErrorCode.NOT_FOUND, 404, details);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, details);
    this.name = 'ValidationError';
  }
}

// Additional error classes…
```

ثم استخدم هذه الأنواع في أنحاء تطبيقك:

```typescript
import { NotFoundError, ValidationError, ErrorResponse } from './errors';

app.get(
  '/users/:id',
  (req: Request<{ id: string }>, res: Response<UserResponse | ErrorResponse>) => {
    // Route implementation…
  },
);
```
