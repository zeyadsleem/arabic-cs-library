---
title: "نمط الترتيب والتنفيذ والتحقق (AAA)"
---

## نمط الترتيب والتنفيذ والتحقق (AAA)

نمط Arrange-Act-Assert (AAA) مقاربة منظّمة لكتابة اختبارات الوحدات تعزّز القابلية للقراءة والصيانة. وهو يقسّم كل اختبار إلى ثلاثة أقسام متمايزة:

1. **الترتيب (Arrange)**: جهّز الشروط والمُدخلات المطلوبة للاختبار.
2. **التنفيذ (Act)**: نفّذ الشيفرة أو الدالة قيد الاختبار.
3. **التحقق (Assert)**: تحقّق من أن النتيجة تطابق بالنتيجة المتوقعة.

### لماذا يُعدّ أفضل ممارسة

- **الوضوح**: الفصل الواضح بين التجهيز والتنفيذ والتحقق يجعل الاختبارات أسهل في القراءة والفهم.
- **الاتساق**: البنية الموحّدة بين الاختبارات تبسّط كتابتها وصيانتها.
- **القابلية للصيانة**: الاختبارات المنظّمة جيدًا أسهل في التحديث مع تطوّر قاعدة الشيفرة.
- **كفاءة التنقيح**: يصبح تحديد موضع فشل الاختبار مباشرًا.
- **المسؤولية الواحدة**: يشجّع على اختبار وظيفة واحدة في كل مرة، ما يؤدي إلى اختبارات أكثر دقة.

### أمثلة في الممارسة

#### المثال 1: اختبار دالة بسيطة

تأمّل دالة تحسب مضروب عدد:

```javascript
function factorial(n) {
  if (n < 0) throw new Error('Negative input not allowed');
  return n === 0 ? 1 : n * factorial(n - 1);
}
```

**اختبار باستخدام نمط AAA:**

```javascript
test('calculates factorial of a positive integer', () => {
  // Arrange
  const input = 5;
  const expectedOutput = 120;

  // Act
  const result = factorial(input);

  // Assert
  expect(result).toBe(expectedOutput);
});
```

**الشرح:**

- *الترتيب*: جهّز قيمة المُدخل والمخرج المتوقع.
- *التنفيذ*: نادِ دالة `factorial` بالمُدخل.
- *التحقق*: تأكد من أن النتيجة تطابق المخرج المتوقع.

#### المثال 2: اختبار معالجة الأخطاء

اختبار كيفية تعامل دالة مع مُدخل غير صالح:

```javascript
function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}
```

**اختبار باستخدام نمط AAA:**

```javascript
test('throws an error when dividing by zero', () => {
  // Arrange
  const numerator = 10;
  const denominator = 0;

  // Act and Assert
  expect(() => {
    divide(numerator, denominator);
  }).toThrow('Cannot divide by zero');
});
```

**الشرح:**

- *الترتيب*: هيّئ البسط واضبط المقام على صفر.
- *التنفيذ والتحقق*: نفّذ الدالة داخل تحقّق للبحث عن الخطأ المتوقع.

#### المثال 3: اختبار الشيفرة غير المتزامنة

افترض وجود دالة غير متزامنة تجلب بيانات من واجهة برمجة تطبيقات:

```javascript
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
```

**اختبار باستخدام نمط AAA:**

```javascript
test('fetches data successfully from an API', async () => {
  // Arrange
  const url = 'https://api.example.com/data';
  const mockData = { id: 1, name: 'Test Data' };
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    }),
  );

  // Act
  const data = await fetchData(url);

  // Assert
  expect(data).toEqual(mockData);
  expect(global.fetch).toHaveBeenCalledWith(url);

  // Cleanup
  global.fetch.mockClear();
  delete global.fetch;
});
```

**الشرح:**

- *الترتيب*: استبدل دالة `fetch` ببديل مُحاكى يعيد بيانات محدّدة مسبقًا.
- *التنفيذ*: نادِ دالة `fetchData`.
- *التحقق*: تأكد من أن البيانات المُعادة تطابق البيانات المُحاكاة وأن `fetch` نُوديت بعنوان URL الصحيح.

#### المثال 4: اختبار تابع في صنف

تأمّل صنف `Calculator` بسيطًا:

```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

**اختبار باستخدام نمط AAA:**

```javascript
test('adds two numbers correctly using Calculator class', () => {
  // Arrange
  const calculator = new Calculator();
  const num1 = 7;
  const num2 = 3;
  const expected = 10;

  // Act
  const result = calculator.add(num1, num2);

  // Assert
  expect(result).toBe(expected);
});
```

**الشرح:**

- *الترتيب*: أنشئ نسخة من `Calculator` وجهّز الأعداد.
- *التنفيذ*: استدعِ التابع `add` بالأعداد.
- *التحقق*: تأكد من أن النتيجة تساوي المجموع المتوقع.

#### المثال 5: اختبار دالة ذات تأثيرات جانبية

افترض أن دالة تسجّل رسالة في الطرفية:

```javascript
function logMessage(message) {
  console.log(message);
}
```

**اختبار باستخدام نمط AAA:**

```javascript
test('logs the correct message to the console', () => {
  // Arrange
  const consoleSpy = vi.spyOn(console, 'log');
  const message = 'Hello, World!';

  // Act
  logMessage(message);

  // Assert
  expect(consoleSpy).toHaveBeenCalledWith(message);

  // Cleanup
  consoleSpy.mockRestore();
});
```

**الشرح:**

- *الترتيب*: راقب التابع `console.log`.
- *التنفيذ*: نادِ `logMessage` برسالة اختبار.
- *التحقق*: تأكد من أن `console.log` نُوديت بالرسالة الصحيحة.
- *التنظيف*: استعد التابع الأصلي `console.log`.

#### المثال 6: اختبار الحالات الحدّية

اختبار دالة تعالج مصفوفة:

```javascript
function getFirstElement(array) {
  if (!Array.isArray(array)) throw new Error('Input must be an array');
  return array[0];
}
```

**اختبار باستخدام نمط AAA:**

```javascript
test('returns undefined for an empty array', () => {
  // Arrange
  const inputArray = [];
  const expectedOutput = undefined;

  // Act
  const result = getFirstElement(inputArray);

  // Assert
  expect(result).toBe(expectedOutput);
});
```

**الشرح:**

- *الترتيب*: جهّز مصفوفة فارغة.
- *التنفيذ*: نادِ `getFirstElement` بالمصفوفة الفارغة.
- *التحقق*: تأكد من أن النتيجة هي `undefined`.

#### المثال 7: الاختبار باستخدام Mock Service Worker (MSW)

اختبار دالة تُجري طلبًا إلى واجهة برمجة تطبيقات، باستخدام MSW لمحاكاة طلب الشبكة:

```javascript
// Function to fetch user data
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

**اختبار باستخدام نمط AAA مع MSW:**

```javascript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json({ id, name: 'John Doe' }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches user data successfully', async () => {
  // Arrange
  const userId = '123';

  // Act
  const user = await getUser(userId);

  // Assert
  expect(user).toEqual({ id: '123', name: 'John Doe' });
});
```

**الشرح:**

- *الترتيب*: جهّز MSW لاعتراض طلبات الشبكة وإعادة بيانات مُحاكاة.
- *التنفيذ*: نادِ دالة `getUser` بمعرّف مستخدم للاختبار.
- *التحقق*: تأكد من أن بيانات المستخدم المُعادة تطابق البيانات المُحاكاة.

### الخلاصات الرئيسية

بعد كل ما سبق، هذا هو جوهر الأمر:

- **فصل الاهتمامات**: يفرض نمط AAA فصلًا واضحًا بين التجهيز والتنفيذ والتحقق.
- **القابلية للقراءة**: تصبح الاختبارات مفسّرة لنفسها، وتعمل توثيقًا للسلوك المتوقع للشيفرة.
- **الاتساق**: اتباع نمط قياسي يقلل الحمل المعرفي عند الانتقال بين اختبارات أو مشاريع مختلفة.
- **القابلية للصيانة**: يصبح تحديث الاختبارات أسهل عند حدوث تغييرات في قاعدة الشيفرة.
- **كفاءة التنقيح**: يبسّط تحديد موضع فشل الاختبار المحتمل.
