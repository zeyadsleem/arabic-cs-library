---
title: "البدائل (Stubs)"
---

البديل (stub) نوع من البدائل الاختبارية يُستخدم لاستبدال دالة حقيقية بنسخة مبسّطة ومحكومة لأغراض الاختبار. الغرض الأساسي من البديل هو محاكاة سلوك الشيفرة الحقيقية بتوفير استجابات محدّدة مسبقًا. ولا تتتبّع البدائل عدد مرات استدعاء الدالة أو الوسائط التي استُدعيت بها—بل تستبدل التنفيذ الحقيقي فقط لضمان أن الاختبارات تعمل في بيئة متوقّعة ومعزولة.

تكون البدائل مفيدة عندما تحتاج إلى عزل وحدة من الشيفرة والتحكّم في سلوك اعتمادياتها دون القلق بشأن أنظمة خارجية مثل واجهات API أو قواعد البيانات.

## متى تستخدم البدائل

استخدم البدائل عندما:

- تريد استبدال اعتمادية لعزل الدالة قيد الاختبار.
- تتضمّن الاعتمادية الحقيقية آثارًا جانبية، مثل عمليات الإدخال/الإخراج أو استدعاءات الشبكة أو استعلامات قاعدة البيانات، ولا تريد تشغيلها أثناء الاختبار.
- تحتاج إلى محاكاة سلوكيات مختلفة من الأنظمة الخارجية (مثل إعادة بيانات محدّدة أو إطلاق خطأ) لتغطية حالات اختبار متنوّعة.
- تريد تسريع الاختبارات بإزالة العمليات المستهلكة للوقت الحقيقي، مثل طلبات الشبكة أو إدخال/إخراج الملفات.

البدائل هي الأنسب للحالات التي لا تحتاج فيها إلى التحقّق من عدد مرات استدعاء دالة أو كيفية استدعائها، بل تريد ببساطة التحكّم فيما تُعيده.

## إنشاء البدائل مع Vitest

في Vitest، يمكنك إنشاء البدائل بسهولة باستخدام التابع `vi.fn()`. يتيح لك هذا التابع استبدال التنفيذ الفعلي لاعتمادية وإعادة قيم محدّدة عند استدعاء الدالة البديلة.

إليك كيف تُنشئ بديلًا بسيطًا:

```javascript
const fetchStub = vi.fn(() =>
  Promise.resolve({ band: 'Green Day', venue: 'Madison Square Garden' }),
);
```

سيُعيد `fetchStub` دائمًا وعدًا مُحلًّا ببيانات محدّدة مسبقًا، محاكيًا استجابة API. ويمكن استخدام هذا لاستبدال طلب شبكة فعلي في اختبار.

## مثال: استبدال الاعتماديات الخارجية (مثل استدعاءات API والتفاعل مع نظام الملفات)

لنمضِ عبر مثال من العالم الحقيقي. تخيّل أنك تختبر دالة تجلب تفاصيل حفلات موسيقية لفرقة عبر استدعاء API. وتريد تجنّب إجراء استدعاء API الفعلي في اختبارك، وأن تتحكّم في السلوك باستخدام بديل بدلًا من ذلك.

إليك الدالة قيد الاختبار:

```javascript
async function getConcertDetails(band) {
  const response = await fetch(`/api/concerts?band=${band}`);
  const data = await response.json();
  return data;
}
```

الآن، في الاختبار، يمكننا إنشاء بديل لدالة `fetch` لمحاكاة استجابة API دون إجراء طلب شبكة حقيقي:

```javascript
import { describe, it, expect, vi } from 'vitest';
import { getConcertDetails } from './concerts';

describe('getConcertDetails', () => {
  it('returns concert details from the API', async () => {
    // Stub the fetch function to simulate an API response
    const fetchStub = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ band: 'Green Day', venue: 'Madison Square Garden' }),
      }),
    );

    // Replace the global fetch function with our stub
    global.fetch = fetchStub;

    // Call the function under test
    const result = await getConcertDetails('Green Day');

    // Assert that the stubbed API returned the correct data
    expect(result).toEqual({ band: 'Green Day', venue: 'Madison Square Garden' });

    // Clean up: Restore the original fetch function
    fetchStub.mockRestore();
  });
});
```

في هذا الاختبار، نستبدل دالة `fetch` الحقيقية ببديل يحاكي استدعاء API ويُعيد استجابة JSON محدّدة مسبقًا. وهذا يتيح لنا اختبار دالة `getConcertDetails` دون إجراء طلب شبكة حقيقي.

## التأكيد على سلوك الشيفرة باستخدام البدائل

عند استخدام البدائل، تريد عادةً أن تؤكّد على أن الدالة التي تختبرها تتصرّف بشكل صحيح في ضوء الاستجابات المحدّدة مسبقًا. في المثال أعلاه، نتحقّق من أن `getConcertDetails` تُعيد معلومات الحفل الصحيحة عندما يوفّر `fetchStub` بيانات API المحاكاة.

يوفّر Vitest أيضًا توابع للتحقّق من عدد مرات استدعاء البديل، رغم أن هذا ليس الاستخدام الأساسي للبديل. ومع ذلك، يمكنك التأكيد على أن الدالة البديلة استُدعيت إن احتجت:

```javascript
expect(fetchStub).toHaveBeenCalledTimes(1);
```

هذا يضمن أن `fetchStub` استُدعي مرة واحدة بالضبط، مما يساعد في التحقّق من أن دالة `getConcertDetails` أطلقت سلوك طلب الشبكة المتوقّع.

باستخدام البدائل، يمكنك محاكاة استجابات متنوّعة (مثل أخطاء API أو المهل المنتهية أو بيانات مختلفة) والتأكيد على أن شيفرتك تتفاعل وفقًا لذلك، كل ذلك دون الاعتماد على أنظمة خارجية حقيقية.

## البدائل

*البديل* هو بديل اختباري يوفّر استجابات محدّدة سلفًا لاستدعاءات الدوال، وعادةً لاستبدال اعتمادية حقيقية بسلوك محكوم. ولا تتتبّع البدائل كيفية استدعاء الدالة؛ بل تعمل ببساطة كبدائل تُعيد قيمًا ثابتة.

### الخصائص الرئيسية للبدائل

- **السلوك المحدّد مسبقًا**: تُستخدم البدائل لتعريف كيفية تصرّف دالة في اختبار. يمكنك التحكّم في القيمة المُعادة أو الإجراءات المتّخذة عند استدعاء الدالة البديلة.
- **العزل**: تساعد البدائل في عزل الدالة قيد الاختبار عن التنفيذ الفعلي لاعتمادياتها.
- **البساطة**: البدائل استبدالات بسيطة ولا تتتبّع أو تسجّل عدد مرات استدعائها أو الوسائط التي استُدعيت بها.

### مثال

تخيّل دالة تجلب بيانات حفل من API. يمكنك إنشاء بديل لمحاكاة إعادة API للبيانات دون إجراء استدعاء شبكة حقيقي.

```javascript
// Stub the fetch function to always return fixed data
const fetchStub = vi.fn(() =>
  Promise.resolve({ band: 'Green Day', venue: 'Madison Square Garden' }),
);

// Now use this stubbed version in your test instead of making a real API call.
```

في هذا المثال، يضمن `fetchStub` أن الاختبار يعمل ببيانات متّسقة، حتى دون إجراء طلب الشبكة الفعلي.

### استخدام البدائل في Vitest

**البديل** شبيه بالبديل المُحاكى لكنه يركّز على توفير استجابات محدّدة مسبقًا بدلًا من تتبّع التفاعلات.

**مثال: استبدال دالة**

```javascript
// notifier.js
export function notify(message) {
  // Sends a notification (e.g., email, SMS)
}
```

**الاختبار:**

```javascript
// notifier.test.js
import { test, expect, vi } from 'vitest';
import { notify } from './notifier';

test('sends a notification', () => {
  // Arrange
  const notifyStub = vi.fn();

  // Replace the real notify function with the stub
  notifyStub('Test message');

  // Act
  // (No action needed since we're stubbing the function)

  // Assert
  expect(notifyStub).toHaveBeenCalledWith('Test message');
});
```

**الشرح:**

- البديل `notifyStub` يستبدل دالة `notify` الحقيقية.
- التركيز على ضمان استدعاء `notify` بالوسائط الصحيحة.
