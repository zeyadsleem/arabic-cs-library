---
title: "التحقق من واجهتك (API) باستخدام OpenAPI"
---

مرة أخرى، نريد فرض التزام خادمك بالمواصفة. لحسن الحظ، لدينا وسيط (middleware) أنيق سيضمن تطابق طلباتنا واستجاباتنا مع المواصفة. لِنستخدم [`express-openapi-validator`](https://www.npmjs.com/package/express-openapi-validator).

يمكننا استخدامه كوسطاء للتأكد من أن استجاباتنا مطابقة للمتطلبات.

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