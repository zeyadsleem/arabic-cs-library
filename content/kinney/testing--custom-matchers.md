---
title: "مطابِقات مخصّصة في Vitest"
lang: ar
source: "https://stevekinney.com/courses/testing/custom-matchers"
---

لنفترض أنك لا تجد تابع `expect` الذي يُسعدك. يمكنك *بالفعل* أن توسّع المطابِقات في Vitest.

```javascript
// vitest.setup.js
import { expect } from 'vitest';

expect.extend({
  toBeWithinRange(received, min, max) {
    const pass = received >= min && received <= max;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${min} - ${max}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${min} - ${max}`,
        pass: false,
      };
    }
  },
});
```

لنرَ ذلك أثناء العمل.

```javascript
test('number is within range', () => {
  expect(10).toBeWithinRange(5, 15);
});
```

## مثال أكثر تشويقًا

لنفترض أنك تعمل على **التواريخ**. قد يكون اختبار سؤال «هل هذا التاريخ بعد ذلك التاريخ؟» مزعجًا قليلًا باستخدام المطابِقات التقليدية.

إليك مطابِقًا مخصّصًا للتحقق من أن تاريخًا متأخر عن تاريخ آخر:

```javascript
expect.extend({
  toBeLaterThan(received, comparedDate) {
    const pass = new Date(received) > new Date(comparedDate);
    if (pass) {
      return {
        message: () => `expected ${received} not to be later than ${comparedDate}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be later than ${comparedDate}`,
        pass: false,
      };
    }
  },
});
```

هذا رائع! الآن يمكنك كتابة مقارنات تواريخ واضحة وموجزة:

```javascript
test('date comparison', () => {
  expect('2023-10-10').toBeLaterThan('2023-09-01'); // ✅ True.
  expect('2023-05-15').toBeLaterThan('2023-07-01'); // 💣 False.
});
```

## أفضل الممارسات {#best-practices}

1. **أبقِ المطابِق بسيطًا**. لا تريد أن تكتب رواية لكل مطابِق. تذكّر أن الشيفرة تُقرأ أكثر مما تُكتب، لذا احرص على أن يكون مطابِقك المخصّص سهل الفهم من نظرة واحدة.
2. **رسائل خطأ مفصّلة**. عندما يفشل اختبار، يحتاج المطوّر (والمفاجأة: أنت في المستقبل) إلى فهم *سبب* الانفجار. الرسالة الجيدة تجعل تنقيح الأخطاء أقل إيلامًا بكثير.
3. **استفد من سياق تطبيقك**. وسّع المطابِقات عندما تجد نفسك تكرّر فحوصًا بعينها. في عالم الاختبارات، لا تعني **DRY** «لا تكرّر نفسك» (Don’t Repeat Yourself) فحسب، بل تعني أيضًا «**لا تغضب بعد**» (Don’t Rage Yet)، لأن الاختبارات مُفترض أن تبقى هادئة وموجزة.
