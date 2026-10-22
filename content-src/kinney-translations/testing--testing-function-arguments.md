---
title: "التجسس على وسائط الدوال (Spying on Function Arguments)"
---

في اختبار الوحدات، من المهام الأساسية التحقق من أن الدوال تُستدعى بالوسائط الصحيحة. يضمن ذلك أن تمر شيفرتك البيانات الصحيحة عبر النظام وأن تتفاعل مع الاعتماديات بالطريقة المتوقعة. يوفر Vitest أدوات قوية للتحقق من الوسائط الممرَّرة إلى دالة، سواء باستخدام الجواسيس (spies) أو البدائل المُحاكاة (mocks).

## لماذا نتحقق من وسائط الدوال؟

- **التحقق من تدفق البيانات الصحيح**: ضمان أن دوالك تستقبل وتمرر الوسائط الصحيحة في كل مرحلة.
- **اختبار الدوال المرجعة (callbacks)**: التحقق من أن الدوال المرجعة تُستدعى بالبيانات الصحيحة، خصوصًا في الشيفرة غير المتزامنة.
- **ضمان الاستخدام الصحيح للخدمات الخارجية**: عندما تتفاعل شيفرتك مع واجهات برمجة التطبيقات (APIs) أو قواعد البيانات أو الخدمات الخارجية، فإن التحقق من الوسائط يضمن تكاملًا سليمًا.

## استخدام الجواسيس للتحقق من وسائط الدوال

[الجواسيس](https://stevekinney.com/courses/testing/spies) في Vitest يمكنها تتبع كيفية استدعاء دالة، بما في ذلك الوسائط الممرَّرة إليها. يتيح لك التابع `vi.spyOn()` مراقبة الدوال الموجودة والتحقق من وسائطها دون تعديل سلوكها.

إليك كيف تُنشئ جاسوسًا وتتحقق من الوسائط. لنلقِ نظرة على `examples/logjam/src/log.test.js`.

```javascript
describe('logger', () => {
  it('logs to the console in development mode', () => {
    const spy = vi.spyOn(console, 'log');

    log('Hello, world!');

    expect(spy).toHaveBeenCalledWith('Hello, world!');

    spy.mockRestore();
  });
});
```

في هذا المثال، يتتبع `spy` الاستدعاءات إلى `console.log`. يتحقق التعبير `expect(spy).toHaveBeenCalledWith('Hello, world!')` من أن الدالة استُدعيت بالوسيط الصحيح.

## استخدام البدائل المُحاكاة للتحقق من وسائط الدوال

[البدائل المُحاكاة](https://stevekinney.com/courses/testing/mocks) يمكن استخدامها أيضًا للتحقق من الوسائط التي مُرّرت إلى دالة. عندما تُنشئ بديلًا مُحاكى بـ `vi.fn()`، يتتبع Vitest تلقائيًا الوسائط الممرَّرة إلى البديل، ما يتيح لك التحقق منها لاحقًا.

```javascript
// Create a mock function
const mockFn = vi.fn();

describe('mock function argument checking', () => {
  it('should be called with the correct arguments', () => {
    // Call the mock function with some arguments
    mockFn('Green Day', 'American Idiot');

    // Check the arguments passed to the mock function
    expect(mockFn).toHaveBeenCalledWith('Green Day', 'American Idiot');
  });
});
```

هنا، يُستدعى `mockFn` بوسيطين، ويتحقق `expect(mockFn).toHaveBeenCalledWith('Green Day', 'American Idiot')` من أن البديل استُدعي بالبيانات الصحيحة.

## التحقق من استدعاءات ووسائط متعددة

يتيح لك Vitest التحقق من الوسائط الممرَّرة إلى دالة عبر استدعاءات متعددة. تخزّن مصفوفة `mock.calls` الوسائط الممرَّرة إلى البديل في كل استدعاء، ما يسهّل التحقق من تفاعلات متعددة.

```javascript
const mockFn = vi.fn();

describe('checking multiple calls', () => {
  it('should track all the arguments for multiple calls', () => {
    // Call the mock function multiple times with different arguments
    mockFn('Green Day', 'Dookie');
    mockFn('Nirvana', 'Nevermind');

    // Check arguments of the first call
    expect(mockFn).toHaveBeenNthCalledWith(1, 'Green Day', 'Dookie');

    // Check arguments of the second call
    expect(mockFn).toHaveBeenNthCalledWith(2, 'Nirvana', 'Nevermind');
  });
});
```

تتحقق الدالة `toHaveBeenNthCalledWith()` من وسائط الاستدعاء الأول والاستدعاء الثاني بشكل منفصل، بما يضمن أن كل استدعاء تلقى المعاملات الصحيحة.

## التحقق من وسائط الدوال غير المتزامنة

عند التعامل مع شيفرة غير متزامنة، من المهم ضمان تمرير الوسائط الصحيحة إلى الدوال عند التعامل مع الوعود (promises) أو الدوال المرجعة. يمكن لجواسيس Vitest وبدائله المُحاكاة التعامل مع الدوال غير المتزامنة أيضًا.

```javascript
async function fetchBandData(bandName, callback) {
  // Simulate an async operation
  await new Promise((resolve) => setTimeout(resolve, 100));
  callback(`${bandName} data`);
}

describe('fetchBandData', () => {
  it('should call the callback with the correct data', async () => {
    // Create a mock callback
    const callback = vi.fn();

    // Call the async function with the mock callback
    await fetchBandData('Green Day', callback);

    // Verify that the callback was called with the correct argument
    expect(callback).toHaveBeenCalledWith('Green Day data');
  });
});
```

في هذا المثال، يُمرَّر البديل المُحاكى `callback` إلى دالة غير متزامنة. يتحقق الاختبار من أن الدالة المرجعة استُدعيت بالوسيط الصحيح بعد اكتمال العملية غير المتزامنة.

## الوصول إلى وسائط محددة باستخدام `mock.calls`

في بعض الحالات، قد تحتاج إلى الوصول يدويًا إلى الوسائط الممرَّرة إلى دالة في كل استدعاء. يخزّن Vitest وسائط كل استدعاء في مصفوفة `mock.calls`، ما يتيح لك فحصها أو التحقق منها مباشرة.

```javascript
const mockFn = vi.fn();

mockFn('Green Day', 'Dookie');
mockFn('Blink-182', 'Enema of the State');

describe('accessing arguments manually', () => {
  it('should manually access arguments of each call', () => {
    // Access the arguments of the first call
    const firstCallArgs = mockFn.mock.calls[0];
    expect(firstCallArgs).toEqual(['Green Day', 'Dookie']);

    // Access the arguments of the second call
    const secondCallArgs = mockFn.mock.calls[1];
    expect(secondCallArgs).toEqual(['Blink-182', 'Enema of the State']);
  });
});
```

يوضح هذا المثال كيف يمكنك فحص مصفوفة `mock.calls` يدويًا للوصول إلى الوسائط الممرَّرة إلى كل استدعاء. كل مدخل في `mock.calls` يقابل مصفوفة وسائط من استدعاء واحد للدالة.

## الخلاصة

التحقق من الوسائط الممرَّرة إلى دالة جزء بالغ الأهمية من التأكد من أن شيفرتك تتصرف بشكل صحيح في اختبارات الوحدات. سواء استخدمت الجواسيس لمراقبة دوال حقيقية أو البدائل المُحاكاة لمحاكاتها، يوفر Vitest أدوات قوية مثل `toHaveBeenCalledWith()` و`toHaveBeenNthCalledWith()` و`mock.calls` للتحقق من الوسائط الممرَّرة أثناء التنفيذ. تتيح لك هذه الإمكانات اختبار أن شيفرتك تمرر البيانات الصحيحة إلى الأماكن الصحيحة بثقة.
