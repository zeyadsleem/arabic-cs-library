---
title: "مساواة المراجع"
---

عاش معظمنا في عالم «يجب أن يكون كل شيء غير قابل للتغيير» بما يكفي لنعرف أن هناك فرقًا بين مقارنة الكائنات بالمرجع ومقارنتها بكائن *يبدو* مماثلًا من حيث قيمته، لكن له مرجع مختلف في الذاكرة.

## toBe

حتى الآن، استخدمنا فقط `.toBe`، الذي يتحقّق من المساواة الصارمة (أي `===` أو `Object.is`).

هذا يعمل كما نتوقّع للأنواع البسيطة:

```typescript
test('strings should be strictly equal', () => {
  expect('string').toBe('string');
});

test('numbers should be strictly equal', () => {
  expect(2).toBe(2);
});

test('booleans should be strictly equal', () => {
  expect(true).toBe(true);

  expect(false).toBe(false);
});

test('undefined should be strictly equal to itself', () => {
  expect(undefined).toBe(undefined);
});

test('null should be strictly equal to itself', () => {
  expect(null).toBe(null);
});

test('BigInts should be strickly equal', () => {
  expect(BigInt(Number.MAX_SAFE_INTEGER)).toBe(BigInt(Number.MAX_SAFE_INTEGER));
});
```

لكن الأمور تصير أكثر تعقيدًا قليلًا عند مقارنة الكائنات (المصفوفات *والدوال* كائنات في JavaScript).

```typescript
describe('toBe', () => {
  test.fails('objects should not be strictly equal', () => {
    expect({ a: 1 }).toBe({ a: 1 });
  });

  test.fails('arrays should be strictly equal', () => {
    expect([1, 2, 3]).toBe([1, 2, 3]);
  });

  test.fails('functions should to be strictly equal', () => {
    expect(() => {}).toBe(() => {});
  });
});
```

## toEqual

انظر إلى هذه الدالة:

```javascript
export const generateFibonacci = (n) => {
  const sequence = [0, 1];

  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }

  return sequence;
};
```

يبدو هذا شيئًا أود اختباره، أليس كذلك؟ المشكلة هنا أن هذا الاختبار الرائع في ما عدا ذلك سينفجر في وجهي.

```javascript
it('should generate fibonacci sequence', () => {
  const fibonacci = generateFibonacci(10);
  expect(fibonacci).toBe([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
});
```

وVitest يعرف أنهما يُسلسَلان إلى الشيء نفسه. لكنه يجبرنا على أن نكون أكثر تحديدًا. بدلًا من ذلك، حين نقارن كائنين غير متساويين بالمرجع، يمكننا استخدام `toEqual`. سأقتبس [من التوثيق](https://vitest.dev/api/expect.html#toequal) لدقيقة سريعة:

> **تسمية الأشياء صعبة**
>
> يؤكّد `toEqual` ما إذا كانت القيمة الفعلية مساوية للقيمة المستلمة أو لها البنية نفسها، إن كانت كائنًا (يقارنهما تكراريًا).

لننظر إلى مثال آخر:

```typescript
describe('toEqual', () => {
  test('similar objects should pass with #toEqual', () => {
    expect({ a: 1 }).toEqual({ a: 1 });
  });

  test('similar nested objects should pass with #toEqual', () => {
    expect({ a: 1, b: { c: 2 } }).toEqual({ a: 1, b: { c: 2 } });
  });

  test('similar arrays should pass with #toEqual', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  test('similar multi-dimensional arrays should pass with #toEqual', () => {
    expect([1, [2, 3]]).toEqual([1, [2, 3]]);
  });

  test('functions should to be strictly equal if compared by reference', () => {
    const fn = () => {};
    expect(fn).toBe(fn);
  });
});
```

## toEqual مقابل toStrictEqual

`toStrictEqual` أكثر… صرامة بقليل.

- `{ a: 1, b: undefined }` و`{ a: 1 }` متساويان لكنهما غير متساويين *تمامًا*.
- كائن حرفي (object literal) ونسخة صنف (class instance) لهما الخصائص نفسها تمامًا غير متساويين صرامةً أيضًا.

إليك بعض الاختبارات التي يمكنك مراجعتها وقد تساعد في توضيح الفرق. يمكنك أيضًا أن تجرّب هذه الاختبارات في `examples/strictly-speaking/strictly-speaking.test.js`.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

test('objects with the same properties are equal', () => {
  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
});

test('objects with different properties are not equal', () => {
  expect({ a: 1, b: 2 }).not.toEqual({ a: 1, b: 3 });
});

test('objects with undefined properties are equal to objects without those properties', () => {
  expect({ a: 1 }).toEqual({ a: 1, b: undefined });
});

test('objects with undefined properties are *not* strictly equal to objects without those properties', () => {
  expect({ a: 1 }).not.toStrictEqual({ a: 1, b: undefined });
});

test('instances are equal to object literals with the same properties', () => {
  expect(new Person('Alice')).toEqual({ name: 'Alice' });
});

test('instances are not strictly equal to object literals with the same properties', () => {
  expect(new Person('Alice')).not.toStrictEqual({ name: 'Alice' });
});
```

## قراءات إضافية

إليك بعض التحقّقات التي *قد* ترغب في أخذها بعين الاعتبار:

- [`toBe`](https://vitest.dev/api/expect.html#tobe)
- [`toBeCloseTo`](https://vitest.dev/api/expect.html#tobecloseto)
- [`toBeInstanceOf`](https://vitest.dev/api/expect.html#tobeinstanceof)
- [`toBeUndefined`](https://vitest.dev/api/expect.html#tobeundefined)
- [`toContain`](https://vitest.dev/api/expect.html#tocontain)
- [`toThrow`](https://vitest.dev/api/expect.html#tothrow)
- [`toThrowError`](https://vitest.dev/api/expect.html#tothrowerror)

يمكنك رؤية واجهة `expect` الكاملة هنا:

- [واجهة Expect في Vitest](https://vitest.dev/api/expect.html).
- [واجهة Expect في Jest](https://jestjs.io/docs/expect)
