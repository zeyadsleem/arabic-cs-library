---
title: "البدائل المُحاكاة (Mocks)"
lang: ar
source: "https://stevekinney.com/courses/testing/mocks"
---

بوجه عام، ليس من المفيد اختبار شيفرة لا تتحكّم فيها.

خلاصة المضاهاة أننا نحتاج أحيانًا إلى استبدال أشياء لا نتحكّم فيها بأشياء *نتحكّم* فيها. على سبيل المثال، قد يكون التأكّد من تعطّل API خارجية خارج نطاق اختبارنا. أو إن لم تكن تلك API مجانية، فأنت لا تريد بالضرورة أن تتراكم عليك فاتورة في كل مرة تشغّل فيها مجموعة اختباراتك، أليس كذلك؟

*البديل المُحاكى* نوع أكثر قوة ومرونة من [البدائل الاختبارية](https://stevekinney.com/courses/testing/test-doubles) يستطيع أن يعرّف السلوك (مثل [البديل](https://stevekinney.com/courses/testing/stubs)) ويسجّل المعلومات (مثل [الجاسوس](https://stevekinney.com/courses/testing/spies)) معًا. وتتيح لك البدائل المُحاكاة تحديد كيفية تصرّف الدالة بدقة، بما في ذلك القيم المُعادة والأخطاء المرمية والتفاعلات المعقّدة، مع تتبّع عدد الاستدعاءات والوسائط الممرّرة أيضًا.

> **أفضل الممارسات والمزالق الشائعة**
>
> سنغطّي هذا في الشرائح، لكن يمكنك مراجعة [أفضل الممارسات والمزالق الشائعة في المضاهاة هنا](https://stevekinney.com/courses/testing/mocking-best-practices)

## الخصائص الرئيسية للبدائل المُحاكاة

- **سلوك قابل للتهيئة**: تستطيع البدائل المُحاكاة استبدال التنفيذ الفعلي وتتيح لك تهيئة كيفية تصرّفها في حالات اختبار مختلفة.
- **تسجيل الاستدعاءات**: مثل الجواسيس، تتتبّع البدائل المُحاكاة عدد مرات استدعاء دالة والوسائط التي استُدعيت بها.
- **متعددة الاستخدامات**: تجمع البدائل المُحاكاة مزايا البدائل والجواسيس معًا، مما يجعلها مفيدة في سيناريوهات اختبار أكثر تعقيدًا.

يمكنك إنشاء دالة بديلة مُحاكاة باستخدام `vi.fn()` (أو `jest.fn()`)، التي تأخذ دالة رد نداء. وإن لم تُقدّم واحدة، فستستخدم ببساطة دالة فارغة كتنفيذ (مثل `() => undefined`).

```typescript
const getNumber = vi.fn(() => 5000);

const number = getNumber();

expect(number).toBe(5000);
expect(getNumber).toHaveBeenCalled();
expect(number).toHaveReturnedWith(5000);
```

## التوابع

- `mockImplementation`: يأخذ دالة تريد أن تستدعيها دالتك البديلة المُحاكاة في كل مرة تُستدعى فيها.
- `mockImplementationOnce`: يقبل دالة تُستخدم فقط في *المرة التالية* التي تُستدعى فيها الدالة.
- `withImplementation`: يتجاوز تنفيذ البديل المُحاكى الأصلي مؤقتًا أثناء تنفيذ رد النداء. ويستدعي الدالة فورًا.
- `mockReturnValue`: بغض النظر عن التنفيذ، نعرف فقط أننا نريدها أن تُعيد أيا كانت القيمة.
- `mockReturnValueOnce`: يضبط القيمة المُعادة—لكن في *المرة التالية* فقط التي تُستدعى فيها.
- `mockResolvedValue`: يضبط قيمة الوعد عندما يُحلّ.
- `mockResolvedValueOnce`: يضبط قيمة الوعد المُحلّة *في المرة التالية* التي يُحلّ فيها.
- `mockRejectedValue`: يرفض وعدًا بالخطأ المقدّم.
- `mockRejectedValueOnce`: يرفض وعدًا بالخطأ المقدّم *في المرة التالية*.
- `mockReturnThis`: يضبط قيمة `this`.

### مثال

لنفترض أنك تحتاج إلى محاكاة دالة تعالج مبيعات التذاكر وتتعامل مع سيناريوهات مختلفة (النجاح والفشل):

```javascript
// Mock a payment function
const paymentMock = vi.fn();

// Simulate successful and failed payments in different tests
paymentMock.mockReturnValueOnce('Payment Successful').mockReturnValueOnce('Payment Failed');

expect(paymentMock()).toBe('Payment Successful');
expect(paymentMock()).toBe('Payment Failed');

// Verify that the mock was called twice
expect(paymentMock).toHaveBeenCalledTimes(2);
```

في هذا المثال، يحاكي البديل المُحاكى نتائج مختلفة لعملية الدفع ويتتبّع عدد الاستدعاءات لضمان حدوث كل شيء كما هو متوقّع.

### الفرق بين البدائل المُحاكاة والبدائل

رغم أن البدائل المُحاكاة والبدائل تستبدل التنفيذ الحقيقي للدوال، فهناك فروق مهمة بينها:

- **البدائل**: توفّر البدائل سلوكًا محدّدًا مسبقًا عند الاستدعاء فقط، لكنها لا تتتبّع عدد مرات استدعاء الدالة أو الوسائط التي استُدعيت بها.
- **البدائل المُحاكاة**: لا تستبدل البدائل المُحاكاة التنفيذ الحقيقي فحسب، بل تتتبّع أيضًا الاستدعاءات والوسائط والسياق، بما يتيح لك التحقّق من التفاعلات بتفصيل أكبر. ويمكن تهيئة البدائل المُحاكاة ديناميكيًا لتُعيد قيمًا محدّدة أو تحاكي ظروفًا مختلفة أثناء الاختبار.

البدائل المُحاكاة أقوى من البدائل لأنها توفّر تعريف السلوك وتتبّع التفاعلات معًا، مما يجعلها مناسبة لاختبار سيناريوهات أكثر تعقيدًا.

### إنشاء البدائل المُحاكاة مع Vitest

في Vitest، يمكنك إنشاء بدائل مُحاكاة باستخدام التابع `vi.fn()`، الذي يتيح لك تعريف كيفية تصرّف دالة وتتبّع الاستدعاءات الموجّهة إليها.

إليك مثالًا بسيطًا على إنشاء بديل مُحاكى:

```javascript
const paymentMock = vi.fn();
```

يمكن تخصيص هذا البديل المُحاكى ليُعيد قيمًا أو يرمي أخطاءً أو يحاكي أي سلوك تحتاجه للاختبار.

يمكنك أيضًا تعريف سلوك محدّد لسيناريوهات اختبار مختلفة باستخدام `mockReturnValue` أو `mockImplementation`.

```javascript
paymentMock.mockReturnValueOnce('Payment Successful').mockReturnValueOnce('Payment Failed');
```

في هذه الحالة، سيُعيد البديل المُحاكى «Payment Successful» في المرة الأولى التي يُستدعى فيها و«Payment Failed» في المرة الثانية.

### مثال: محاكاة قاعدة بيانات أو API خارجية

لننظر إلى مثال نحاكي فيه API خارجية تجلب تفاصيل حفلات موسيقية لفرقة. سنستخدم البديل المُحاكى لمحاكاة سيناريوهات مختلفة، مثل استدعاء API ناجح وفشل.

إليك الدالة التي نريد اختبارها:

```javascript
async function getConcertDetails(band) {
  const response = await fetch(`/api/concerts?band=${band}`);
  const data = await response.json();
  return data;
}
```

الآن، سنحاكي دالة `fetch` في اختبارنا:

```javascript
import { describe, it, expect, vi } from 'vitest';
import { getConcertDetails } from './concerts';

describe('getConcertDetails', () => {
  it('returns concert details from the API', async () => {
    // Mock the fetch function to simulate an API response
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ band: 'Green Day', venue: 'Madison Square Garden' }),
      }),
    );

    // Replace the global fetch function with our mock
    global.fetch = fetchMock;

    // Call the function under test
    const result = await getConcertDetails('Green Day');

    // Assert that the mock API returned the correct data
    expect(result).toEqual({ band: 'Green Day', venue: 'Madison Square Garden' });

    // Verify that the mock was called
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Clean up: Restore the original fetch function
    fetchMock.mockRestore();
  });
});
```

في هذا المثال، يحاكي `fetchMock` سلوك دالة `fetch` الحقيقية، بما يتيح لنا اختبار دالة `getConcertDetails` دون إجراء طلب شبكة حقيقي. ونتحقّق أيضًا من أن البديل المُحاكى استُدعي مرة واحدة بالضبط.

### التأكيد على تفاعلات البدائل المُحاكاة وسلوكها

تتيح لك البدائل المُحاكاة في Vitest التأكيد ليس على القيم المُعادة والأخطاء فحسب، بل على التفاعلات أيضًا، مثل عدد مرات استدعاء البديل المُحاكى، والوسائط الممرّرة، وترتيب الاستدعاءات.

إليك كيف يمكنك التأكيد على تفاعلات مختلفة مع البدائل المُحاكاة:

```javascript
// Create a mock function
const fetchMock = vi.fn();

// Define behavior
fetchMock.mockReturnValue('Concert Data');

// Call the mock
fetchMock('Green Day');

// Assert that the mock was called once
expect(fetchMock).toHaveBeenCalledTimes(1);

// Assert that the mock was called with the correct argument
expect(fetchMock).toHaveBeenCalledWith('Green Day');

// Assert the return value of the mock
expect(fetchMock()).toBe('Concert Data');
```

في هذا المثال، نتحقّق من أن `fetchMock` استُدعي مرة واحدة بالضبط، ومُرّر إليه الوسيط الصحيح، وأعاد القيمة المتوقّعة.

توفّر البدائل المُحاكاة تحكّمًا كاملًا في السلوك والتفاعلات معًا، مما يجعلها أداة جوهرية لاختبار الأنظمة المعقّدة التي تحتاج فيها إلى رؤى مفصّلة عن كيفية استخدام الدوال وما تُعيده.
