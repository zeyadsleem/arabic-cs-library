---
title: "Validating Your API with OpenAPI"
lang: en
source: "https://stevekinney.com/courses/full-stack-typescript/validating-your-api-openapi"
---

Again, we want to enforce that your server adheres to the specification. Luckily, we have some fancy middleware that will make sure our requests and responses match the specification. Let’s use [`express-openapi-validator`](https://www.npmjs.com/package/express-openapi-validator).

We can then use it as middleware to make sure that our responses are up-to-snuff.

```typescript
import OpenApiValidator from 'express-openapi-validator';

app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.json',
    validateRequests: true,
    validateResponses: true,
  }),
);
```
