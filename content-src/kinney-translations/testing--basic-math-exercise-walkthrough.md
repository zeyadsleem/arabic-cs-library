---
title: "جولة عملية: تمرين الرياضيات الأساسية"
---

إليك جولة عملية لتمرين نهاية القسم الخاص بـ [تنفيذ بعض الاختبارات الأساسية](https://stevekinney.com/courses/testing/basic-math).

## دالة الطرح

من المثالي أنني نفّذت `add` نيابةً عنك، فلنبدأ بتنفيذ العكس.

### الخطوة 1: اكتب الاختبار (أحمر)

أضف اختبارات للدالة `subtract` في `examples/basic-math/src/arithmetic.test.js`:

```javascript
// examples/basic-math/src/arithmetic.test.js
import { subtract } from './calculator';

describe('subtract', () => {
  it('subtracts two positive numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  it('subtracts a larger number from a smaller number', () => {
    expect(subtract(3, 5)).toBe(-2);
  });

  it('subtracts negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
  });
});
```

**ملاحظة:** تذكّر استيراد `subtract` من `arithmetic.js`.

### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

ستحصل على خطأ: `subtract` غير معرّفة.

### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

نفّذ `subtract` في `arithmetic.js`:

```javascript
// example/basic-math/src/arithmetic.js
export const add = (a, b) => {
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};
```

### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل اختبارات الطرح.

### الخطوة 5: أعد الهيكلة

مجددًا، الشيفرة بسيطة ولا تحتاج إلى إعادة هيكلة.

## دالة الضرب

### الخطوة 1: اكتب الاختبار (أحمر)

أضف اختبارات للدالة `multiply` في `examples/basic-math/src/arithmetic.test.js`:

```javascript
// examples/basic-math/src/arithmetic.test.js
import { multiply } from './calculator';

describe('multiply', () => {
  it('multiplies two positive numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it('multiplies by zero', () => {
    expect(multiply(5, 0)).toBe(0);
  });

  it('multiplies negative numbers', () => {
    expect(multiply(-2, -3)).toBe(6);
  });

  it('multiplies a positive and a negative number', () => {
    expect(multiply(-2, 3)).toBe(-6);
  });
});
```

### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

خطأ: `multiply` غير معرّفة.

### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

نفّذ `multiply` في `arithmetic.js`:

```javascript
// example/basic-math/src/arithmetic.js
export const add = (a, b) => {
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};

export const multiply = (a, b) => {
  return a * b;
};
```

### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل اختبارات الضرب.

### الخطوة 5: أعد الهيكلة

لا حاجة إلى إعادة هيكلة. الحياة بسيطة جدًا الآن.

## دالة القسمة

### الخطوة 1: اكتب الاختبار (أحمر)

أضف اختبارات للدالة `divide` في `examples/basic-math/src/arithmetic.test.js`:

```javascript
// examples/basic-math/src/arithmetic.test.js
import { divide } from './calculator';

describe('divide', () => {
  it('divides two positive numbers', () => {
    expect(divide(6, 3)).toBe(2);
  });

  it('divides a number by one', () => {
    expect(divide(5, 1)).toBe(5);
  });

  it('divides zero by a number', () => {
    expect(divide(0, 5)).toBe(0);
  });

  it('divides negative numbers', () => {
    expect(divide(-6, -3)).toBe(2);
  });

  it('divides a positive and a negative number', () => {
    expect(divide(-6, 3)).toBe(-2);
  });
});
```

### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

خطأ: `divide` غير معرّفة.

### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

نفّذ `divide` في `arithmetic.js`:

```javascript
// example/basic-math/src/arithmetic.js
export const add = (a, b) => {
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};

export const multiply = (a, b) => {
  return a * b;
};

export const divide = (a, b) => {
  return a / b;
};
```

### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل اختبارات القسمة.

### الخطوة 5: أعد الهيكلة

مجددًا. لا حاجة إلى إعادة هيكلة. أنا أحاول فقط إثبات نقطة هنا.
