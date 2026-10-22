---
title: "اختبار الأخطاء غير المتزامنة"
---

عند العمل مع دوال غير متزامنة ترمي أخطاء، تحتاج إلى التعامل مع الوعود (promises) والأخطاء المرفوضة. في Vitest، يمكنك اختبار معالجة الأخطاء غير المتزامنة باستخدام `async/await` أو مطابق `.rejects` للوعود.

## استخدام `async/await` لاختبار الأخطاء المرفوضة

```javascript
// Asynchronous function to be tested
async function fetchData() {
  throw new Error('Network error');
}

describe('fetchData', () => {
  it('should throw an error when the promise is rejected', async () => {
    // Use try/catch to verify the error thrown by the asynchronous function
    await expect(fetchData()).rejects.toThrow('Network error');
  });
});
```

في هذا المثال:

- ترمي دالة `fetchData` خطأً بشكل غير متزامن (داخل وعد مرفوض).
- يستخدم الاختبار `await expect(fetchData()).rejects.toThrow('Network error')` للتحقق من أن الخطأ يُرمى بشكل صحيح ويطابق الرسالة المتوقعة.

## استخدام `.rejects` لمعالجة الأخطاء القائمة على الوعود

يوفر Vitest مطابق `.rejects` لاختبار ما إذا كان وعد ما مرفوضًا بخطأ. هذه طريقة موجزة لفحص الأخطاء غير المتزامنة دون الحاجة إلى كتل `try/catch`.

```javascript
// Asynchronous function to be tested
async function fetchUserData() {
  return Promise.reject(new Error('User not found'));
}

describe('fetchUserData', () => {
  it('should reject with an error', () => {
    // Test that the promise rejects with the correct error message
    return expect(fetchUserData()).rejects.toThrow('User not found');
  });
});
```

في هذا المثال:

- تعيد `fetchUserData()` وعدًا مرفوضًا.
- يتحقق الاختبار من أن الوعد مرفوض وأن رسالة الخطأ تطابق `'User not found'`.
