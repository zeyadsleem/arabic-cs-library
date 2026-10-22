---
title: "اختبار الوعود (Promises)"
---

*يمكنك* استخدام الاستراتيجيات من [اختبار الشيفرة غير المتزامنة](https://stevekinney.com/courses/testing/testing-asynchronous-code)، لكن دعنا نتعمّق قليلًا أكثر في الوعود (promises) تحديدًا.

## لماذا نختبر الوعود؟

- **ضمان السلوك غير المتزامن الصحيح**: يساعد اختبار الوعود في ضمان أن شيفرتك تتعامل مع العمليات غير المتزامنة بشكل صحيح، مثل انتظار البيانات قبل المتابعة أو التقاط الأخطاء.
- **محاكاة سيناريوهات النجاح والفشل**: باختبار الوعود المحلولة والمرفوضة معًا، يمكنك التحقق من أن شيفرتك تعمل في كل الحالات الممكنة، بما فيها معالجة الأخطاء بلطف.
- **منع الإخفاقات الصامتة**: دون اختبار مناسب، قد تؤدي الإخفاقات الصامتة في الشيفرة غير المتزامنة إلى أخطاء يصعب تتبّعها وتنقيحها.

## الاختبار الأساسي للوعود المحلولة

عندما يُحلّ وعد بنجاح، تريد التحقق من أن القيمة المُعادة تطابق ما تتوقعه. في Vitest، يتم ذلك عادةً باستخدام `async` و`await` أو بإعادة الوعد مباشرة من دالة الاختبار.

إليك مثالًا لاختبار دالة تعيد وعدًا محلولًا:

```javascript
// Function to be tested
function fetchBandData(bandName) {
  return Promise.resolve({ name: bandName, genre: 'Punk Rock' });
}

describe('fetchBandData', () => {
  it('should return band data when the promise resolves', async () => {
    // Call the function
    const result = await fetchBandData('Green Day');

    // Assert that the promise resolved with the correct value
    expect(result).toEqual({ name: 'Green Day', genre: 'Punk Rock' });
  });
});
```

في هذا المثال، تعيد دالة `fetchBandData` وعدًا يُحلّ ببيانات الفرقة الموسيقية. وباستخدام `await` ننتظر حلّ الوعد ثم نتحقق من أن النتيجة صحيحة.

## اختبار الوعود المرفوضة

إضافةً إلى اختبار حلول الوعود الناجحة، لا يقل أهمية اختبار كيفية تعامل شيفرتك مع رفض الوعود (الأخطاء). يتيح لك Vitest اختبار الوعود المرفوضة باستخدام كتل `try/catch` أو `.rejects` في تحققاتك.

إليك كيفية اختبار وعد مرفوض:

```javascript
// Function to be tested
function fetchBandDataWithError(bandName) {
  return Promise.reject(new Error('Band not found'));
}

describe('fetchBandDataWithError', () => {
  it('should throw an error when the promise rejects', async () => {
    // Assert that the promise rejects with an error
    await expect(fetchBandDataWithError('Unknown Band')).rejects.toThrow('Band not found');
  });
});
```

في هذا الاختبار، من المتوقع أن يُرفض الوعد بخطأ، ويضمن `expect(…).rejects.toThrow()` أن الرفض يُلتقط ويُعالج بشكل صحيح.

## استخدام `.resolves` و`.rejects`

يوفر Vitest مطابقات مريحة `.resolves` و`.rejects` لاختبار الوعود مباشرة دون الحاجة إلى `async/await`. تتيح لك هذه المطابقات كتابة اختبارات أكثر إيجازًا وقابلية للقراءة لسيناريوهات الوعود الناجحة والفاشلة معًا.

### اختبار الوعود المحلولة

```javascript
describe('fetchBandData', () => {
  it('should resolve with band data', () => {
    // Test promise resolution using .resolves
    return expect(fetchBandData('Green Day')).resolves.toEqual({
      name: 'Green Day',
      genre: 'Punk Rock',
    });
  });
});
```

في هذا المثال، يتحقق الاختبار من أن الوعد يُحلّ بالبيانات المتوقعة باستخدام `.resolves.toEqual()`.

### اختبار الوعود المرفوضة

```javascript
describe('fetchBandDataWithError', () => {
  it('should reject with an error', () => {
    // Test promise rejection using .rejects
    return expect(fetchBandDataWithError('Unknown Band')).rejects.toThrow('Band not found');
  });
});
```

هنا يُستخدم `.rejects.toThrow()` للتحقق من أن الوعد مرفوض برسالة خطأ محدّدة.

## اختبار الدوال غير المتزامنة باستخدام البدائل المُحاكاة

عندما تعتمد شيفرتك على خدمات خارجية غير متزامنة (مثل واجهات برمجة التطبيقات)، يمكنك استخدام بدائل مُحاكاة (mocks) لمحاكاة سلوكيات الوعود المختلفة — الحل والرفض معًا. هذا مفيد بشكل خاص عند اختبار دوال تعتمد على موارد خارجية دون إجراء طلبات فعلية.

إليك مثالًا يستخدم استدعاء واجهة برمجة تطبيقات مُحاكى:

```javascript
// Simulate an API module
import * as api from './api';

// Code under test
async function getConcertDetails(bandName) {
  const response = await api.fetchConcerts(bandName);
  return response.data;
}

describe('getConcertDetails', () => {
  // Mock the API module
  vi.mock('./api', () => ({
    fetchConcerts: vi.fn(() =>
      Promise.resolve({ data: [{ venue: 'Wembley', date: '2024-10-05' }] }),
    ),
  }));

  it('should return concert details from the mocked API', async () => {
    // Test with the mocked promise
    const result = await getConcertDetails('Green Day');

    // Verify the result
    expect(result).toEqual([{ venue: 'Wembley', date: '2024-10-05' }]);
  });
});
```

في هذا الاختبار، تُحاكى دالة `api.fetchConcerts` لتعيد وعدًا محلولًا. ويمكنك بالمثل محاكاتها لتعيد وعدًا مرفوضًا واختبار مسار معالجة الأخطاء.

## اختبار وعود متعددة باستخدام `Promise.all`

عند العمل مع وعود متعددة في شيفرتك، قد تحتاج إلى اختبارها مجتمعة باستخدام `Promise.all()`. في Vitest، يمكنك ضمان حلّ كل الوعود بشكل صحيح بانتظار `Promise.all` في اختباراتك.

```javascript
// Function to be tested
function fetchMultipleBandData() {
  return Promise.all([
    Promise.resolve({ name: 'Green Day', genre: 'Punk Rock' }),
    Promise.resolve({ name: 'Nirvana', genre: 'Grunge' }),
  ]);
}

describe('fetchMultipleBandData', () => {
  it('should resolve all promises with the correct data', async () => {
    // Await all promises
    const result = await fetchMultipleBandData();

    // Verify the result of each promise
    expect(result).toEqual([
      { name: 'Green Day', genre: 'Punk Rock' },
      { name: 'Nirvana', genre: 'Grunge' },
    ]);
  });
});
```

يوضح هذا المثال كيفية اختبار وعود متعددة، بما يضمن أن `Promise.all()` يُحلّ بالبيانات المتوقعة من الوعدين معًا.

## التعامل مع المهلات غير المتزامنة في اختبارات الوعود

أحيانًا قد تتضمن وعودك تأخيرات باستخدام `setTimeout` أو عمليات غير متزامنة مشابهة. في هذه الحالات، يمكن أن تساعدك `vi.useFakeTimers()` في Vitest على محاكاة مرور الوقت دون انتظار المهلة الحقيقية.

```javascript
// Function that returns a delayed promise
function delayedBandData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Green Day', genre: 'Punk Rock' });
    }, 3000);
  });
}

describe('delayedBandData', () => {
  it('should resolve the promise after a delay', async () => {
    // Use fake timers to control time
    vi.useFakeTimers();

    // Call the function (but do not await yet)
    const promise = delayedBandData();

    // Fast-forward time
    vi.advanceTimersByTime(3000);

    // Now await the promise resolution
    const result = await promise;

    // Verify the resolved data
    expect(result).toEqual({ name: 'Green Day', genre: 'Punk Rock' });
  });
});
```

في هذا المثال، تتيح لنا `vi.useFakeTimers()` محاكاة تأخير الثلاث ثوانٍ في الوعد دون انتظار مرور الوقت الحقيقي.

## ملخّص سريع

يُعدّ اختبار الوعود في Vitest ضروريًا لضمان أن شيفرتك غير المتزامنة تتصرف كما هو متوقع. سواء كنت تختبر وعودًا محلولة أو وعودًا مرفوضة أو تتعامل مع عمليات غير متزامنة متعددة، يوفّر Vitest أدوات واضحة وفعّالة مثل `async/await` و`.resolves` و`.rejects` والدوال المُحاكاة. إضافةً إلى ذلك، يضمن استخدام المؤقتات الوهمية للمهلات أن تبقى الاختبارات سريعة وموثوقة. باختبار الوعود اختبارًا كاملًا، يمكنك التقاط الحالات الحدّية، ومعالجة الأخطاء بشكل صحيح، وبناء تطبيقات أكثر متانة.
