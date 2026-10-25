---
title: "كتابة اختباراتك الأولى"
lang: ar
source: "https://stevekinney.com/courses/testing/the-basics"
---

> **مستودع الشيفرة النموذجية**
>
> إن لم تكن قد فعلت ذلك بعد، فهذا وقت مناسب لاستنساخ [المستودع الذي يحتوي على الشيفرة النموذجية لهذه الدورة](https://github.com/stevekinney/introduction-to-testing).

لنبدأ بأبسط اختبار في العالم. لديّ مثال على هذه الشيفرة في `examples/scratchpad/index.test.js`، لكنك على الأرجح لست بحاجة إلى القلق بشأن تشغيله الآن.

```javascript
import { test, expect } from 'vitest';

it('is a super simple test', () => {
  expect(true).toBe(true);
});
```

يمكنك *أن* تشغّل هذا الاختبار بتنفيذ `npm test` من سطر الأوامر، لكن لا تتوقّع أي مفاجآت.

على أعلى مستوى، يمكننا ملاحظة ما يلي:

- توجد دالة تُسمّى `test` تأخذ وسيطين: نصًّا يمثّل اسم الاختبار. ودالة تحتوي على جسم الاختبار.
  - نصًّا يمثّل اسم الاختبار.
  - ودالة تحتوي على جسم الاختبار.
- داخل تلك الدالة، نستخدم مكتبة تحقّق لنُصدر حكمًا على ما نتوقّع أن تكون عليه طريقة عمل العالم. في هذه الحالة، نتوقّع أن يكون هذان الشيئان متساويين، وهما كذلك.
  - في هذه الحالة، نتوقّع أن يكون هذان الشيئان متساويين، وهما كذلك.

> **نصيحة احترافية**
>
> سترى اختبارات أخرى نستخدم فيها `it` بدلًا من `test`. لا يوجد حرفيًا أي فرق بين هاتين الدالتين. إنهما اسمان مستعاران لبعضهما. يمكنك استخدامهما بالتبادل.

حسنًا، هذا يعمل—لكنه سخيف بعض الشيء. لنختبر فعليًا بعض التعابير، أو ربما دالة أيضًا.

```javascript
test('another test, but with some logic', () => {
  expect(1 + 1).toBe(2);
});
```

```javascript
test('a test with a function', () => {
  const add = (a, b) => a + b;
  expect(add(1, 2)).toBe(3);
});
```

نقطة الجذب هنا أننا حين نكتب الاختبارات، يمكننا إصدار مجموعة من الأحكام حول كيف *نتوقّع* أن تعمل شيفرتنا. ومهمة مجموعة اختباراتنا أن توفّر علينا عناء التحقّق يدويًا من كل هذه الأشياء. بدلًا من ذلك، سيأخذ مُشغّل الاختبارات شيفرتنا ويتأكّد من أن كل شيء لا يزال يعمل بالطريقة التي نتوقّعها أثناء مضيّنا في عملنا بإضافة الميزات وإعادة هيكلة الشيفرة.

بوجه عام، من غير المرجّح أن تعيش دالتنا `add` داخل اختبار. والأرجح أنها دالة مساعدة من نوع ما نستخدمها في تطبيقنا.

سنُبقي مساحة التجارب لدينا في المستودع لأي وقت نريد فيه إجراء بعض التجارب السريعة، لكن لننتقل بدلًا من ذلك إلى `examples/basic-math/src/arithmetic.js`.

يمكننا استخراج دالتنا *الشيّقة جدًا* إلى ملف خاص بها كما قد نتوقّع أن نراه في يومنا العادي.

```javascript
// arithmetic.js
export const add = (a, b) => {
  return a + b;
};
```

يمكننا إضافة الاختبار في `arithmetic.test.js`.

```javascript
// src/arithmetic.test.js
import { describe, it, expect } from 'vitest';
import { add } from './arithmetic';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});

describe.todo('subtract', () => {});

describe.todo('multiply', () => {});

describe.todo('divide', () => {});
```

## إضافة الاختبارات

كل اختبار تكتبه يأتي بتكلفة صغيرة للغاية، يمكن أن تتراكم بمرور الوقت على ما أظن. القاعدة غير المفيدة لعدد الاختبارات التي ينبغي أن تكتبها هي «بالقدر الذي تحتاجه». لكن بوجه عام—نريد على الأقل تغطية بعض الحالات الحدّية.

```javascript
// src/arithmetic.test.js
import { describe, it, expect } from 'vitest';
import { add } from './arithmetic';

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it('should a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });
});
```

سنضيف المزيد في قسم لاحق، لكن هذه بداية جيدة جدًا الآن. خصوصًا لأننا لم ننظر بعد إلى [تشغيل اختباراتك](https://stevekinney.com/courses/testing/running-tests).

لكن أولًا، لنأخذ لحظة قصيرة للحديث عن [كيف تعمل الاختبارات](https://stevekinney.com/courses/testing/how-tests-work).

## قراءات ذات صلة

- [تشغيل الاختبارات](https://stevekinney.com/courses/testing/running-tests)
- [كيف تعمل الاختبارات](https://stevekinney.com/courses/testing/how-tests-work)
- [تصفية الاختبارات](https://stevekinney.com/courses/testing/filtering-tests)
- [تنظيم الاختبارات والتعليق عليها](https://stevekinney.com/courses/testing/organizing-and-annotating-tests)
