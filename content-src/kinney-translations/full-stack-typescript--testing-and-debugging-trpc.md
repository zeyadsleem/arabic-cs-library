---
title: "الاختبار وتصحيح الأخطاء في tRPC"
---

## اختبارات الوحدة على جانب الخادم

يوفّر tRPC تابعًا مفيدًا هو `createCaller()` لاستدعاء إجراءاتك مباشرةً دون تشغيل خادم Express. اجمع ذلك مع قاعدة بيانات اختبارية أو مع بديل مُحاكى:

```typescript
// server/test/userRouter.test.ts
import { test, expect, beforeEach } from 'vitest';
import { appRouter } from '../src/index';
import Database from 'better-sqlite3';

let db: Database;

beforeEach(() => {
  db = new Database(':memory:');
  db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, password TEXT)').run();
  db.prepare('INSERT INTO user (name, password) VALUES (?, ?)').run('Alice', 'pass123');
});

test('getUser finds existing user', async () => {
  const caller = appRouter.createCaller({ db, user: null });
  const user = await caller.user.getUser(1);
  expect(user?.name).toBe('Alice');
});
```

بلا تلاعب باستدعاءات HTTP، لذا فهو سريع. وإن أردت اختبارات تكامل أو اختبارات من طرف إلى طرف، فيمكنك تشغيل خادمك واستعلامه بشكل معتاد. وفي التطبيقات الكبيرة قد تُجري أيضًا اختبارات تكامل للواجهة الأمامية باستخدام Cypress أو Playwright.

## تصحيح الأخطاء

- **افحص السجلات**: أضف `onError` إلى وسيط tRPC أو استخدم وسيطًا للتسجيل.
- **أدوات تطوير React Query**: إذا كنت تستخدم React، فيمكن لأدوات التطوير أن تكشف حالات الاستعلام والتخزين المؤقت وغير ذلك.
- **سجلات الطرفية**: عند الشك، انثرها هنا وهناك (وأزلها بعد أن تنتهي!).
- **CORS**: تأكد من تفعيله إذا كانت واجهتك العميلة تُقدَّم من أصل مختلف.
