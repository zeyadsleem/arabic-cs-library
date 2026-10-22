---
title: "محاكاة fetch وطلبات الشبكة (Mocking Fetch and Network Requests)"
---

لنتحدث عن شيء عزيز على قلب كل مطوّر — التعامل مع **طلبات الشبكة** واختبارها. إذا كنت تعمل على تطبيق حتى *يستنشق* الإنترنت، فستحتاج إلى نداء واجهات برمجة التطبيقات، وفي النهاية ستحتاج إلى اختبار تلك الشيفرة. وعندما يحين ذلك الوقت، لا سبب لضرب واجهة برمجة التطبيقات فعليًا في كل مرة تشغّل فيها مجموعة اختباراتك — ففي النهاية، لن *نُغرق* خادم الواجهة بهجوم حرمان من الخدمة، أو الأسوأ: نجعل اختباراتك بطيئة للغاية. هنا يأتي دور **محاكاة طلبات الشبكة**، ولحسن الحظ فإن محاكاة `fetch` مع Vitest سهلة للغاية.

## اكتب دالة لجلب البيانات

لننشئ دالة أساسية تطلق نداء fetch في البرية وتعيد البيانات. سنبقي الأمور بسيطة باستخدام واجهة برمجة تطبيقات JSON placeholder.

```javascript
async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json();
  return data;
}

export { getData };
```

يبدو جيدًا. الآن إذا أردت اختبار هذه الدالة، فلا ينبغي لك فعليًا ضرب الواجهة الحقيقية في اختباراتك، لأنني أعدك… نداءات شبكة غير موثوقة في اختبارات CI عند الثالثة صباحًا؟ *ليست فكرة مستحبة.* ما نريده هو محاكاتها!

## محاكاة fetch مع Vitest

Vitest يدعمك عندما يتعلق الأمر بالمحاكاة. إليك التفاصيل: `fetch` متاحة على `window` في معظم البيئات. لذا عند المحاكاة، نخبر Vitest باستبدال `window.fetch` بنسختنا.

لنكتب اختبار Vitest بسيطًا سيحاكي `fetch`.

### هنا يحدث السحر

```javascript
import { test, vi, expect } from 'vitest';
import { getData } from './yourFunctionFile';

test('fetches data successfully from API', async () => {
  // Mock the fetch function.
  const mockResponse = {
    userId: 1,
    id: 1,
    title: 'Test Todo',
    completed: false,
  };

  // Here we tell Vitest to mock fetch on the `window` object.
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    }),
  );

  // Call the function and assert the result
  const data = await getData();
  expect(data).toEqual(mockResponse);

  // Check that fetch was called exactly once
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
});
```

بوم! هذا كل شيء. لنمر على هذا سريعًا لأنك قد تفكر «أي سحر هذا؟»

- `vi.fn()` هي دالة المحاكاة في Vitest. أنت تحاكي `fetch`، وتجعلها تعيد بالضبط ما نريد — في هذه الحالة، نحل الوعد بـ `mockResponse`.
- `global.fetch` هو المكان الذي نحاكي فيه دالة fetch لأن `fetch` في Node ليست متاحة عالميًا تلقائيًا كما في المتصفح.
- أنت تتحقق من أن `fetch` تُستدعى مرة واحدة وبعنوان URL الصحيح. ستنام هادئًا في الليل وأنت تعرف أن شيفرتك تصرخ في الفراغ بالضبط كما ينبغي ومتى ينبغي.

## الخطوة الرابعة: نظّف بعد الاختبارات

إخراج القمامة خطوة مهمة في الاختبار. قد تصبح البدائل المُحاكاة «لزجة» بعض الشيء (المصطلح التقني!)، لذا لنتأكد من إعادة تعيين `fetch` بعد كل اختبار.

```javascript
import { afterEach } from 'vitest';

afterEach(() => {
  vi.clearAllMocks(); // Reset all mocked calls between tests
});
```

نعم، إنها مجرد نظافة اختبار جيدة. نظّف بعد نفسك، وسيكون مستقبلك ممتنًا لك.

## حديث صريح: اختبار حالة الخطأ

لأنه، يا إلهي، ماذا يحدث إذا انفجر الإنترنت أو تجاهل الخادم طلبك ببساطة؟ عليك اختبار ذلك أيضًا!

لنرَ كيف نختبر خطأً، مثل عندما ترفض fetch نفسها:

```javascript
test('handles fetch failure', async () => {
  global.fetch = vi.fn(() => Promise.reject('API is down'));

  await expect(getData()).rejects.toEqual('API is down');
  expect(fetch).toHaveBeenCalledTimes(1);
});
```

هنا، ترفض `fetch` بخطأ، ونختبر أن دالتنا ترفض أيضًا بشكل صحيح. سهلة يسيرة.

## خاتمة

تذكّر فقط أن الهدف ليس اختبار ما إذا كانت fetch تعمل. (**تنبيه بالمفسد**: إنها تعمل.) أنت تركّز على ضمان أن شيفرتك تتصرف بشكل صحيح في مجموعة متنوعة من السيناريوهات المتعلقة بـ fetch.
