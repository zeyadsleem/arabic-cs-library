---
title: "Validating Query and Path Parameters"
lang: en
source: "https://stevekinney.com/courses/full-stack-typescript/validating-query-and-path-parameters"
---

We can create similar middleware for validating queries and paths.

```typescript
const validateParams =
  <T>(schema: ZodSchema<T>): RequestHandler<Request['params'] & T, ErrorResponse> =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      request.params = schema.parse(request.params) as Request['params'];
      next();
    } catch (error) {
      return handleError(request, response, error);
    }
  };

const validateQuery =
  <T>(
    schema: ZodSchema<T>,
  ): RequestHandler<Request['params'], ErrorResponse, Request['body'], Request['query'] & T> =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      request.query = schema.parse(request.query) as Request['query'];
      next();
    } catch (error) {
      return handleError(request, response, error);
    }
  };
```

## Putting It All Together

Now, we can make one middleware that validates all of the different options.

```typescript
import { type NextFunction, type Request, type Response } from 'express';
import { type ZodSchema } from 'zod';
import { handleError } from './handle-error.js';

type ValidationOptions = { body?: ZodSchema; params?: ZodSchema; query?: ZodSchema };

/**
 * Creates a middleware to validate multiple parts of a request against Zod schemas
 * @param schemas Object containing optional Zod schemas for body, params, and query
 * @returns Express middleware that validates the specified parts of the request
 */
export const validate = (schemas: ValidationOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const validatedBody = schemas.body.parse(req.body);
        req.body = validatedBody as Request['body'];
      }

      if (schemas.params) {
        const validatedParams = schemas.params.parse(req.params);
        req.params = validatedParams as Request['params'];
      }

      if (schemas.query) {
        const validatedQuery = schemas.query.parse(req.query);
        req.query = validatedQuery as Request['query'];
      }

      next();
    } catch (error) {
      return handleError(req, res, error);
    }
  };
};
```

**Next**: [Adding Client-Side Validations](https://stevekinney.com/courses/full-stack-typescript/adding-client-side-validation)
