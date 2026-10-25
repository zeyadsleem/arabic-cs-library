---
title: "مُحوّلات البيانات المخصّصة (Custom Data Transformers) في tRPC"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/custom-data-transformers-with-trpc"
---

### مُحوّلات البيانات المخصّصة

عندما تحتاج إلى تسلسل (serialization) حقول من نوع `Date` أو `Map` أو `BigInt`، فكّر في [SuperJSON](https://github.com/blitz-js/superjson). ثبّت `superjson` وسجّله على الخادم والعميل:

```typescript
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});
```

وعلى العميل:

```typescript
createTRPCClient<AppRouter>({
  transformer: superjson,
  links: [/* ... */],
});
```

الآن ستبقى كائنات التاريخ (date) كائنات `Date` حقيقية على العميل، لا سلاسل نصية عشوائية.
