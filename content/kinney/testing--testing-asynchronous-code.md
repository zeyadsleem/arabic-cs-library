---
title: "اختبار الشيفرة غير المتزامنة"
lang: ar
source: "https://stevekinney.com/courses/testing/testing-asynchronous-code"
---

كما هو الحال مع كل شيء تقريبًا في JavaScript، تجعل الشيفرة غير المتزامنة كل شيء أصعب. (**حرق المفاجأة**: لكن أيضًا—كما هو الحال مع كل شيء تقريبًا في JavaScript يتعلّق بالشيفرة غير المتزامنة، فإن `async`/`await` يميل إلى جعل ذلك الجزء الصعب أسهل.)

تأمّل هذا الاختبار للحظة:

```typescript
test('Asynchronous code accidentally passes', () => {
  setTimeout(() => {
    expect(false).toBe(true);
  }, 1);
});
```

ليست المشكلة أن هذا الاختبار جيد بأي حال، بل إن التحقّق لا يُنفَّذ أبدًا.

```typescript
test('Asynchronous code has zero expectations', () => {
  expect.assertions(0);

  setTimeout(() => {
    expect(false).toBe(true);
  }, 1000);
});
```

بعبارة أخرى، يمكننا التأكيد على أن تحقّقنا لا… همم… *يتحقّق* أبدًا.

```typescript
test.fails('Code inside of callback never runs', () => {
  expect.hasAssertions();

  setTimeout(() => {
    expect(false).toBe(true);
  }, 1000);
});
```

في بعض الأطر، ستستطيع فعل شيء كهذا.

```typescript
// 🚨 This will not work in Vitest.

test('Code inside of callback never runs', (done) => {
  expect.hasAssertions();

  setTimeout(() => {
    expect(false).toBe(true);

    done();
  }, 1000);
});
```

كما تقول التعليقات، هذا *لن* يعمل في Vitest. أذكره فقط لأن هذه الدورة ليست مخصّصة لـVitest—فتلك هي الأداة التي اخترنا استخدامها فحسب. على أي حال، ما يأتي هو *على الأرجح* ما تريده بالفعل.

## استخدام `async`/`await`

لم نعد نعيش في عالم مليء بردود النداء. في هذه الأيام، تستخدم معظم شيفرتنا غير المتزامنة إمّا `async`/`await` أو—على الأقل—الوعود.

تأمّل الاختبارين التاليين:

```typescript
const addAsync = (a: number, b: number) => Promise.resolve(a + b);

it.fails("fails if you don't use an async function", () => {
  const result = addAsync(2, 3);

  expect(result).toBe(5);
});

it('passes if use an `async/await`', async () => {
  const result = await addAsync(2, 3);

  expect(result).toBe(5);
});
```

يفشل الاختبار الأول بالخطأ التالي:

```diff
- Expected "5"

+ Received "Promise {}"
```

> **العمل مع الوعود**
>
> إذا كنت تعمل مع الوعود (Promises)، فإن [لدى Vitest أيضًا بعض الوظائف الخاصة](https://stevekinney.com/courses/testing/testing-promises) التي يمكنك استخدامها اختياريًا.

## قراءات إضافية

- [اختبار الوعود](https://stevekinney.com/courses/testing/testing-promises)
- [اختبار الأخطاء غير المتزامنة](https://stevekinney.com/courses/testing/testing-asynchronous-errors)
