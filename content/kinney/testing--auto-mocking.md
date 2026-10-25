---
title: "المحاكاة التلقائية في Vitest"
lang: ar
source: "https://stevekinney.com/courses/testing/auto-mocking"
---

يتيح لك Vitest أن تُحاكي تلقائيًا [وحدات](https://stevekinney.com/courses/testing/mocks) كاملة أو دوال بعينها، مما يسهّل عزل الشيفرة واختبارها دون إنشاء بديل مُحاكى يدويًا لكل دالة. تكون المحاكاة التلقائية مفيدة بشكل خاص عندما تختبر أنظمة معقّدة كثيرة الاعتمادات.

يمكنك محاكاة وحدة تلقائيًا باستخدام `vi.mock()`:

```javascript
vi.mock('./api', () => ({
  getConcertDetails: vi
    .fn()
    .mockResolvedValue({ band: 'Green Day', venue: 'Madison Square Garden' }),
}));
```

سيُحاكي هذا الوحدة `api` بأكملها ويستبدل `getConcertDetails` بدالة مُحاكاة تُعيد بيانات محددة مسبقًا. تُبسّط المحاكاة التلقائية عملية إدارة البدائل المُحاكاة في الاختبارات الكبيرة إذ تتيح لك تعريف تلك البدائل مسبقًا.
