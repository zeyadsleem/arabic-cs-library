---
title: "تنظيم الاختبارات والتعليق عليها"
---

ثمّة طريقتان أساسيتان لتنظيم اختباراتنا:

1. يمكننا توزيعها على ملفات مختلفة.
2. يمكننا استخدام `describe` لإنشاء نوع من التجميع المنطقي.

أحترمك أكثر من أن أشرح لك كيف تعمل الملفات، فلنركّز انتباهنا على البند الثاني.

## `describe`

يمكنك تجميع مجموعة من الاختبارات في مجموعة واحدة باستخدام `describe`. وإن لم تستخدم `describe`، فكل الاختبارات في ملف معيّن تُجمع تلقائيًا في مجموعة واحدة.

يُستخدم هذا أساسًا لتنظيم اختباراتك. وهو مفيد لأنه يتيح لك تجاوز مجموعة اختبارات معيّنة أو عزلها.

```typescript
✓ arithmetic.ts (8)
  ✓ add (2)
    ✓ should add two numbers correctly
    ✓ should not add two numbers incorrectly
  ✓ subtract (2)
    ✓ should subtract the subtrahend from the minuend
    ✓ should not subtract two numbers incorrectly
  ✓ multiply (2)
    ✓ should multiply the multiplicand by the multiplier
    ✓ should not multiply two numbers incorrectly
  ✓ divide (2)
    ✓ should multiply the multiplicand by the multiplier
    ✓ should not multiply two numbers incorrectly
```

### فوائد استخدام `describe`

- **قراءة أفضل**: التجميع المنطقي يسهّل فهم ما يُختبر.
- **تهيئة وتنظيف مشتركان**: استخدم خُطّافات مثل `beforeEach` و`afterEach` داخل كتلة `describe` للتهيئة المشتركة.
- **تنفيذ انتقائي**: شغّل مجموعات اختبارات كاملة أو تجاوزها أثناء التطوير.
- **تنظيم هرمي**: اعكس بنية تطبيقك في اختباراتك.

## الخُطّافات

يتيح لك استخدام `describe` تمرير اسم إلى مجموعتك، وهذا مفيد عندما تُنقّح الأخطاء. كما يمنحك الوصول إلى بعض الخُطّافات المفيدة:

- `beforeEach`: يعمل قبل كل اختبار من الاختبارات.
- `afterEach`: يعمل بعد كل اختبار من الاختبارات.
- `beforeAll`: يعمل في البداية تمامًا عند بدء المجموعة.
- `afterAll`: يعمل بعد اكتمال كل اختبارات المجموعة.

سنتناول هذا أكثر قليلًا عندما نصل إلى [التهيئة والتنظيف باستخدام الخُطّافات](https://stevekinney.com/courses/testing/setting-up-and-tearing-down-with-hooks).

## التعليقات التوضيحية

هذه مشابهة تمامًا لما رأيناه مع اختباراتنا الفردية.

لدى `describe` أيضًا بعض التعليقات التوضيحية التي تضيف منطقًا حول متى ينبغي أن تعمل المجموعة:

- `describe.skip`: تجاوز هذه المجموعة.
- `describe.skipIf`: تجاوز هذه المجموعة إن كانت القيمة المقدّمة صادقة.
- `describe.only`: شغّل هذه المجموعة فقط (وأي مجموعات أخرى تستخدم `.only` أيضًا بالطبع). على الأرجح *لا* تريد إيداع هذا سهوًا. ثق بي. إنه محرج.
- `describe.todo`: يضع علامة على مجموعة بأنها شيء ستنفّذه لاحقًا. هذا مفيد عندما تعرف أنواع الاختبارات التي ستحتاجها وتريد تتبّع كم بقي لديك.
- `describe.each`: يُستخدم لتوليد مجموعات متعددة بناءً على مجموعة من البيانات. يُغطى هذا أكثر في [توليد الاختبارات](https://stevekinney.com/courses/testing/parameterizing-tests).
- `describe.concurrent`: شغّل كل اختبارات هذه المجموعة بالتزامن. يُغطى هذا أكثر في [تشغيل الاختبارات بالتوازي](https://stevekinney.com/courses/testing/parallelizing-tests).
- `describe.shuffle`: شغّل هذه الاختبارات بترتيب عشوائي.

يُغطى هذا أيضًا قليلًا في [ترشيح الاختبارات](https://stevekinney.com/courses/testing/filtering-tests).

### أفضل الممارسات

#### جمّع الاختبارات حسب الوظيفة

نظّم الاختبارات حول وظائف أو ميزات محددة.

```javascript
describe('Math Utilities', () => {
  test('adds numbers correctly', () => {
    // Test code
  });

  test('multiplies numbers correctly', () => {
    // Test code
  });
});
```

#### استخدم كتل `describe` المتداخلة للبنى المعقّدة

بالنسبة للوحدات المعقّدة، يمكن للتداخل أن يعكس بنية التطبيق.

```javascript
describe('User Module', () => {
  describe('Authentication', () => {
    test('successfully logs in with valid credentials', () => {
      // Test code
    });

    test('fails to log in with invalid credentials', () => {
      // Test code
    });
  });

  describe('Profile Management', () => {
    test('updates user profile', () => {
      // Test code
    });
  });
});
```

#### اكتب أسماء واضحة ووصفية

ينبغي أن تنصّ الأسماء بوضوح على ما يُختبر.

```javascript
describe('Array', () => {
  describe('push', () => {
    test('adds an element to the end of the array', () => {
      // Test code
    });
  });
});
```

#### استخدم الخُطّافات داخل كتل `describe`

استخدم `beforeEach` و`afterEach` و`beforeAll` و`afterAll` لإدارة التهيئة والتنظيف الخاصين بمجموعة اختبارات معيّنة.

```javascript
describe('Database Tests', () => {
  beforeAll(() => {
    // Connect to database
  });

  afterAll(() => {
    // Disconnect from database
  });

  beforeEach(() => {
    // Seed database
  });

  test('fetches a record successfully', () => {
    // Test code
  });
});
```

#### أبقِ الاختبارات مركّزة ومستقلة

ينبغي أن يركّز كل اختبار على جانب واحد، وأن تكون الاختبارات داخل كتلة `describe` مترابطة لكن مستقلة.

```javascript
describe('String Manipulation', () => {
  test('converts string to uppercase', () => {
    // Test code
  });

  test('trims whitespace from string', () => {
    // Test code
  });
});
```

#### تجنّب التداخل المفرط

التداخل المفرط قد يجعل الاختبارات صعبة القراءة. أبقِ البنية مسطّحة قدر الإمكان مع الحفاظ على الوضوح. لا تندفع بعيدًا.

```javascript
// Instead of deeply nested describes
describe('Module A', () => {
  describe('Component B', () => {
    describe('Function C', () => {
      test('performs action X', () => {
        // Test code
      });
    });
  });
});

// Prefer a flatter structure
describe('Component B - Function C', () => {
  test('performs action X', () => {
    // Test code
  });
});
```

#### استخدم `describe` للسياق المشترك

جمّع الاختبارات التي تشترك في التهيئة نفسها أو السياق نفسه.

```javascript
describe('When user is authenticated', () => {
  beforeEach(() => {
    // Mock authentication
  });

  test('accesses protected route', () => {
    // Test code
  });

  test('sees personalized content', () => {
    // Test code
  });
});
```

#### استخدم `describe.only` و`describe.skip` أثناء التطوير

ركّز على مجموعات اختبارات محددة دون تشغيل مجموعة الاختبارات بأكملها.

- `describe.only`: يشغّل المجموعة المحددة فقط.
- `describe.skip`: يتجاوز المجموعة المحددة.

```javascript
describe.only('Critical Functionality Tests', () => {
  // Tests to focus on
});

describe.skip('Deprecated Functionality Tests', () => {
  // Tests to skip
});
```

تذكّر إزالة `.only` و`.skip` قبل إنهاء شيفرتك لضمان تنفيذ كل الاختبارات.

#### وثّق حالات الاختبار المعقّدة

أضف تعليقات لشرح الاختبارات أو الإعدادات غير الواضحة داخل كتل `describe`.

```javascript
describe('Edge Cases for Date Parsing', () => {
  // Tests for leap years and time zones
  test('correctly parses leap day', () => {
    // Test code
  });
});
```

### الخلاصات الأساسية

- **التجميع المنطقي**: استخدم `describe` لتجميع الاختبارات المترابطة، مما يعزّز الوضوح.
- **تهيئة مشتركة**: استخدم الخُطّافات داخل كتل `describe` للتهيئة والتنظيف الخاصين بمجموعة معيّنة.
- **تسمية وصفية**: الأسماء الواضحة لـ `describe` و`test` تحسّن القراءة.
- **عزل الاختبارات**: أبقِ الاختبارات مستقلة لتجنّب التفاعلات غير المقصودة.
- **تجنّب الإفراط في التداخل**: أبقِ البنية بسيطة للحفاظ على القراءة.
- **اعكس بنية المشروع**: نظّم ملفات الاختبار لتطابق تخطيط الشيفرة المصدرية.
- **التركيز أثناء التطوير**: استخدم `.only` و`.skip` لتبسيط عملية الاختبار.
- **التوثيق**: علّق على الاختبارات أو الإعدادات المعقّدة للرجوع إليها مستقبلًا.
