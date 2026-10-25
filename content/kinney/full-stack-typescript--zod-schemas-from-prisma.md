---
title: "توليد مخططات Zod من Prisma"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/zod-schemas-from-prisma"
---

الآن وقد أعددنا Prisma، الجزء التالي سهل. سنستخدم أداة مُسمّاة aptly، تُدعى [`zod-prisma-types`](https://www.npmjs.com/package/zod-prisma-types).

في إعداد Prisma الخاص بك أضف ما يلي.

```prisma
generator zod {
  provider       = "zod-prisma-types"
}
```

والآن نفّذ: `npx prisma generate zod`.

**رائع.** هذا كل ما في الأمر. ولكن، ماذا لو تمكّنا أيضًا من توليد [مخطط tRPC](https://stevekinney.com/courses/full-stack-typescript/prisma-trpc)؟
