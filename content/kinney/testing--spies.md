---
title: "الجواسيس (Spies)"
lang: ar
source: "https://stevekinney.com/courses/testing/spies"
---

الجاسوس نوع من [البدائل الاختبارية](https://stevekinney.com/courses/testing/test-doubles) يُستخدم لمراقبة معلومات عن استدعاءات الدوال وتسجيلها دون تعديل سلوك الدالة الفعلي افتراضيًا. وتُستخدم الجواسيس لملاحظة كيفية استدعاء الدوال أثناء التنفيذ، بما يتيح لك التحقّق من تفاصيل مثل عدد مرات استدعاء الدالة، والوسائط الممرّرة إليها، وقيمها المُعادة. وخلافًا للبدائل أو البدائل المُحاكاة، لا تستبدل الجواسيس الدالة بسلوك محدّد مسبقًا إلا إذا ضُبطت صراحةً على ذلك.

تكون الجواسيس مفيدة بشكل خاص عندما تريد فحص التفاعلات داخل النظام قيد الاختبار مع السماح للدالة الحقيقية بالتنفيذ كالمعتاد.

## الخصائص الرئيسية للجواسيس

- **تتبّع السلوك**: تستطيع الجواسيس تتبّع ما إذا استُدعيت دالة، وكم مرة استُدعيت، وبأي وسائط.
- **التحقّق**: يمكنك استخدام الجواسيس للتحقّق من أن دوال معيّنة أُطلقت في الظروف المناسبة.
- **غير تدخّلية**: لا تعدّل الجواسيس سلوك الدالة الأصلي إلا إذا ضُبطت صراحةً على ذلك.

## متى تستخدم الجواسيس

- تريد التحقّق من عدد مرات استدعاء دالة وبأي وسائط.
- الدالة التي تختبرها تتفاعل مع دوال خارجية أو داخلية، وتحتاج إلى مراقبة تلك التفاعلات.
- تريد تأكيد ما إذا استُدعي رد نداء أو معالج أثناء عملية معيّنة.
- تختبر دوالًا ليس من السهل عزلها أو تعديلها، لكنك ما زلت بحاجة إلى ملاحظة استخدامها.

## إنشاء جاسوس في Vitest

في Vitest، يمكنك إنشاء جواسيس باستخدام التابع `vi.spyOn()`، الذي يراقب دالة موجودة. وهو لا يغيّر السلوك الفعلي للدالة إلا إذا أمرته صراحةً بذلك.

إليك كيف تُنشئ جاسوسًا أساسيًا:

```javascript
const spy = vi.spyOn(console, 'log');
```

سيراقب هذا الجاسوس دالة `console.log` ويسجّل عدد مرات استدعائها، والوسائط الممرّرة إليها، وتفاصيل أخرى عن الاستدعاء.

## التجسّس على استدعاءات الدوال ووسائطها وقيمها المُعادة

لنمضِ عبر مثال نتجسّس فيه على دالة ونتحقّق من سلوكها. تأمّل دالة تسجّل رسالة خطأ عندما تفشل عملية بيع تذكرة:

```javascript
function handleTicketSaleError(errorMessage) {
  console.error(`Error: ${errorMessage}`);
}
```

في اختبارنا، يمكننا التجسّس على `console.error` لضمان استدعائها بالوسيط الصحيح:

```javascript
import { describe, it, expect, vi } from 'vitest';

describe('handleTicketSaleError', () => {
  it('logs an error message when ticket sale fails', () => {
    // Spy on console.error
    const errorSpy = vi.spyOn(console, 'error');

    // Call the function under test
    handleTicketSaleError('Payment declined');

    // Assert that the spy tracked the correct call
    expect(errorSpy).toHaveBeenCalledWith('Error: Payment declined');

    // Clean up: Restore the original function
    errorSpy.mockRestore();
  });
});
```

في هذا المثال، يراقب `errorSpy` دالة `console.error` ويتحقّق من تسجيل رسالة الخطأ الصحيحة عند استدعاء `handleTicketSaleError`.

## التحقّق من عدد الاستدعاءات والوسائط الممرّرة وسياق الاستدعاءات باستخدام الجواسيس

من أهم مزايا الجواسيس قدرتها على تقديم معلومات مفصّلة عن كيفية استدعاء الدوال. يمكنك التحقّق من:

- **عدد مرات استدعاء الدالة**.
- **الوسائط الممرّرة إلى الدالة**.
- **القيمة المُعادة من الدالة**.
- **السياق (قيمة `this`)** الذي استُدعيت فيه الدالة.

إليك مثالًا يوضّح كيفية فحص هذه الخصائص:

```javascript
function processOrder(orderId) {
  console.log(`Processing order: ${orderId}`);
}

describe('processOrder', () => {
  it('should log the correct order ID', () => {
    // Spy on console.log
    const logSpy = vi.spyOn(console, 'log');

    // Call the function under test
    processOrder('12345');

    // Verify the spy was called exactly once
    expect(logSpy).toHaveBeenCalledTimes(1);

    // Verify the spy was called with the correct argument
    expect(logSpy).toHaveBeenCalledWith('Processing order: 12345');

    // Clean up: Restore the original function
    logSpy.mockRestore();
  });
});
```

في هذا الاختبار، نستخدم `logSpy` للتحقّق من:

1. أن الدالة استُدعيت مرة واحدة (`toHaveBeenCalledTimes`).
2. أن الدالة استُدعيت بالوسيط `'Processing order: 12345'` (`toHaveBeenCalledWith`).

تمنحك الجواسيس تحكّمًا قويًا في اختبار التفاعلات، فتتيح لك التحقّق من أن شيفرتك تُجري الاستدعاءات الصحيحة وتمرّر الوسائط الصحيحة دون تغيير السلوك الحقيقي للدوال قيد الاختبار.

## توابع Expect

- `toHaveBeenCalled()`: ينجح إذا استُدعي الجاسوس في أي وقت.
- `toHaveBeenCalledTimes(times)`: ينجح إذا استُدعي الجاسوس العدد الصحيح من المرات.
- `toHaveBeenCalledWith(…args)`: ينجح إذا استُدعيت الدالة *في أي وقت* بالوسائط التي تحدّدها.
- `toHaveBeenLastCalledWith`: ينجح إذا استُدعيت الدالة في أحدث مرة بالوسائط التي تحدّدها.
- `toHaveBeenNthCalledWith(time, …args)`: ينجح إذا استُدعيت الدالة في المرة التي تحدّدها بالوسائط التي تحدّدها.
- `toHaveReturned()`: ينجح إذا أعادت الدالة (أي أنها لم ترمِ خطأً).
- `toHaveReturnedTimes(times)`: ينجح إذا أعادت الدالة بعدد المرات الذي تحدّده.
- `toHaveReturnedWith(value)`: ينجح إذا أعادت الدالة بنجاح في أي وقت القيمة التي تحدّدها.
- `toHaveLastReturnedWith(value)`: ينجح إذا أعادت الدالة في أحدث مرة القيمة التي تحدّدها.
- `toHaveNthReturnedWith(time, value)`: ينجح إذا أعادت الدالة في المرة التي تحدّدها القيمة التي تحدّدها.

## مثال آخر: الرياضيات الأساسية

```javascript
// math.test.js
import { test, expect, vi } from 'vitest';
import * as math from './arithmetic';

test('calls add with correct arguments', () => {
  // Arrange
  const addSpy = vi.spyOn(math, 'add');

  // Act
  const result = math.add(2, 3);

  // Assert
  expect(addSpy).toHaveBeenCalledWith(2, 3);
  expect(result).toBe(5);

  // Cleanup
  addSpy.mockRestore();
});
```

**الشرح:**

- **`vi.spyOn(object, methodName)`**: يُنشئ جاسوسًا على التابع المحدّد.
- يتيح لنا الجاسوس التحقّق من استدعاء `add` بالوسائط الصحيحة.
- **التنظيف**: أعِد التابع الأصلي لتجنّب الآثار الجانبية.
