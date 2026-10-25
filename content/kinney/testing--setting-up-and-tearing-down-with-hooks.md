---
title: "خطّافات قبل وبعد"
lang: ar
source: "https://stevekinney.com/courses/testing/setting-up-and-tearing-down-with-hooks"
---

الخطّافات (hooks) هي دوال تعمل في مراحل محدّدة من دورة حياة تنفيذ اختباراتك. تتيح لك أداء عمليات التهيئة والتفكيك، بما يضمن أن كل اختبار يعمل في بيئة متّسقة. ويوفّر Vitest عدّة خطّافات تحاكي تلك الموجودة في أطر الاختبار الأخرى:

- `beforeAll`: يعمل مرة واحدة قبل كل الاختبارات في مجموعة الاختبارات.
- `afterAll`: يعمل مرة واحدة بعد كل الاختبارات في مجموعة الاختبارات.
- `beforeEach`: يعمل قبل كل اختبار في مجموعة الاختبارات.
- `afterEach`: يعمل بعد كل اختبار في مجموعة الاختبارات.

## لماذا تستخدم الخطّافات؟

- **التهيئة والتفكيك**: جهّز بيئة الاختبار قبل تشغيل الاختبارات ونظّف بعدها.
- **تجنّب تكرار الشيفرة**: شارك شيفرة التهيئة المشتركة بين اختبارات متعددة.
- **عزل الاختبارات**: اضمن ألّا تتداخل الاختبارات مع بعضها بإعادة ضبط الحالة قبل كل اختبار.
- **تحسين القراءة**: أبقِ الاختبارات مركّزة على التحقّقات بدلًا من تفاصيل التهيئة.

## المثال 1: استخدام `beforeEach` و`afterEach`

لنفترض أنك تختبر كائن عدّاد بسيطًا:

```javascript
// counter.js
let value = 0;

export const counter = {
  get value() {
    return value;
  },
  increment() {
    value++;
  },
  decrement() {
    value--;
  },
  reset() {
    value = 0;
  },
};
```

هذه الاختبارات ستفشل لأن العدّاد سيحتفظ بالحالة بين الاختبارات.

```javascript
describe('Counter', () => {
  it('starts at zero', () => {
    expect(counter.value).toBe(0);
  });

  it('can increment', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });

  // Let's get this test to *not* fail.
  it('can decrement', () => {
    counter.increment();
    counter.decrement();
    expect(counter.value).toBe(0);
  });
});
```

لمزيد من المتعة، جرّب `describe.shuffle` لتراه يدخل في بعض الحالات الغريبة الأخرى.

### الحل: استخدام الخطّاف `beforeEach`

```javascript
// counter.test.js
import { expect, test, beforeEach } from 'vitest';
import { counter } from './counter';

describe('Counter', () => {
  beforeEach(() => {
    counter.reset();
  });

  it('starts at zero', () => {
    expect(counter.value).toBe(0);
  });

  it('can increment', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });

  // Let's get this test to *not* fail.
  it('can decrement', () => {
    counter.increment();
    counter.decrement();
    expect(counter.value).toBe(0);
  });
});
```

- يعيد الخطّاف `beforeEach` ضبط العدّاد إلى الصفر قبل كل اختبار.
- يمكن لكل اختبار أن يفترض أن العدّاد يبدأ من الصفر، بما يضمن عزل الاختبارات.

## استخدام `beforeAll` و`afterAll`

لنفترض أن لديك اختبارات تتطلّب إعداد اتصال بقاعدة بيانات:

```javascript
// db.js
export const db = {
  connect: async () => {
    /* … */
  },
  disconnect: async () => {
    /* … */
  },
  clear: async () => {
    /* … */
  },
};
```

إليك مثالًا ممتعًا على شكل مجموعة اختبارات قد تستخدم الخطّافات.

```javascript
// db.test.js
import { expect, test, beforeAll, afterAll, beforeEach } from 'vitest';
import { db } from './db';

beforeAll(async () => {
  // Arrange: Connect to the database once before all tests
  await db.connect();
});

afterAll(async () => {
  // Cleanup: Disconnect from the database after all tests
  await db.disconnect();
});

beforeEach(async () => {
  // Arrange: Clear the database before each test
  await db.clear();
});

test('fetches data from the database', async () => {
  // Act: Insert test data and fetch it
  // Assert: Verify the fetched data
});

test('updates data in the database', async () => {
  // Act: Update test data
  // Assert: Verify the data was updated
});
```

**الشرح:**

- يتّصل `beforeAll` بقاعدة البيانات مرة واحدة قبل تشغيل الاختبارات.
- يقطع `afterAll` الاتصال بقاعدة البيانات بعد اكتمال كل الاختبارات.
- يُفرغ `beforeEach` قاعدة البيانات قبل كل اختبار لضمان حالة نظيفة.

## تداخل الخطّافات مع `describe`

عند تنظيم الاختبارات في مجموعات باستخدام `describe`، يمكن أن تكون لديك خطّافات تنطبق على تلك المجموعة وحدها.

```javascript
import { test, expect, describe, beforeEach } from 'vitest';

let data;

describe('Group 1', () => {
  beforeEach(() => {
    data = { value: 1 };
  });

  test('data value is 1', () => {
    expect(data.value).toBe(1);
  });
});

describe('Group 2', () => {
  beforeEach(() => {
    data = { value: 2 };
  });

  test('data value is 2', () => {
    expect(data.value).toBe(2);
  });
});
```

**الشرح:**

- لكل كتلة `describe` خطّاف `beforeEach` خاص بها.
- يُضبط المتغيّر `data` بقيمة مختلفة لكل مجموعة، بما يعزل الاختبارات.

### المثال 4: الخطّافات غير المتزامنة

يمكن أن تكون الخطّافات غير متزامنة، بما يتيح لك أداء عمليات مثل جلب البيانات أو انتظار الوعود.

```javascript
import { test, expect, beforeEach } from 'vitest';

let user;

beforeEach(async () => {
  // Simulate fetching user data
  user = await fetchUser();
});

test('user name is Alice', () => {
  expect(user.name).toBe('Alice');
});

async function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Alice' });
    }, 100);
  });
}
```

**الشرح:**

- الخطّاف `beforeEach` مُعلَّم بـ`async` وينتظر `fetchUser`.
- يمكن للاختبارات أن تعتمد على توفّر `user` واحتوائه على البيانات.

## بعض أفضل الممارسات مع الخطّافات في Vitest

- **أبقِ الخطّافات خفيفة**: تجنّب وضع منطق كثير في الخطّافات. ينبغي أن تهيّئ البيئة، لا أن تؤدّي عمليات معقّدة.
- **استخدم الخطّاف المناسب**: اختر `beforeAll` أو `beforeEach` بناءً على ما إذا كانت التهيئة تحتاج إلى العمل مرة واحدة أو قبل كل اختبار.
- **عزل الاختبارات**: اضمن إعادة ضبط الحالة بين الاختبارات لمنع الاختبارات المتذبذبة.
- **تجنّب الحالة المشتركة**: كن حذرًا مع المتغيّرات العامة. إن استخدمتها، فتأكّد من إدارتها بشكل سليم داخل الخطّافات.
- **تعامل مع الشيفرة غير المتزامنة بشكل صحيح**: استخدم `async`/`await` في الخطّافات عند التعامل مع عمليات غير متزامنة.
- **معالجة الأخطاء في الخطّافات**: إذا فشل خطّاف، سيتخطّى Vitest الاختبارات في تلك المجموعة. تأكّد من معالجة الأخطاء بشكل مناسب.

## المزالق الشائعة

- **نسيان إعادة الوعد أو انتظاره**: إذا كانت لديك شيفرة غير متزامنة في خطّافاتك، فتأكّد من إعادة الوعد أو استخدام `async`/`await`.
- **الإفراط في استخدام الخطّافات العامة**: وضع منطق كثير في `beforeAll` قد يؤدي إلى اختبارات يصعب فهمها أو تنقيحها.
- **عدم التنظيف**: الفشل في إعادة ضبط الموارد أو تنظيفها قد يجعل الاختبارات تتداخل مع بعضها.
