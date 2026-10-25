---
title: "تجاوز خصائص الكائنات"
lang: ar
source: "https://stevekinney.com/courses/testing/overriding-object-properties"
---

في بعض سيناريوهات الاختبار، قد تحتاج إلى تجاوز خصائص معيّنة في الكائنات أو محاكاتها بدلًا من الدوال. يمكن أن يكون هذا مفيدًا عند اختبار شيفرة تعتمد على خصائص كائنات مثل متغيّرات البيئة، أو إعدادات التهيئة، أو قيم ديناميكية تُقرأ من الكائنات وقت التشغيل. في Vitest، يمكنك تجاوز خصائص الكائنات باستخدام `vi.spyOn()` أو بتعيين الخصائص مباشرةً إلى قيم مُحاكاة أثناء اختباراتك.

## حالات استخدام تجاوز خصائص الكائنات

- **متغيّرات البيئة**: محاكاة بيئات مختلفة بتجاوز خصائص `process.env`.
- **كائنات التهيئة**: تغيير قيم إعدادات التهيئة لاختبار كيفية تصرف شيفرتك في ظروف مختلفة.
- **الكائنات العامة**: تجاوز كائنات عامة مثل `window` أو `navigator` أو `document` في التطبيقات القائمة على المتصفّح.
- **الخصائص الديناميكية**: محاكاة قيم خصائص تتغيّر مع الوقت، مثل `Date.now` أو `Math.random`.

## تجاوز خصائص الكائنات باستخدام `vi.spyOn()`

عند تجاوز خصائص الجامع (getter) أو الضابط (setter)، يمكنك استخدام `vi.spyOn()` لاستبدال سلوكها. هذا مفيد بشكل خاص في خصائص الكائنات المدمجة مثل `window.location` أو `process.env` التي تحتاج إلى تجاوزها في اختبار.

إليك مثالًا على تجاوز جامع:

```javascript
// Spy on the global object property (e.g., window.location.href)
vi.spyOn(window, 'location', 'get').mockReturnValue({
  href: 'https://mocked-url.com',
});

describe('URL Test', () => {
  it('should use the mocked location', () => {
    // Test that the code uses the mocked URL
    expect(window.location.href).toBe('https://mocked-url.com');
  });
});
```

في هذا المثال، تُستخدم الدالة `vi.spyOn()` للتجسّس على خاصية `location` في الكائن `window` ومحاكاتها. وهي تستبدل الجامع بحيث تُعيد `window.location.href` القيمة المُحاكاة `'https://mocked-url.com'` بدلًا من الرابط الحقيقي.

## تجاوز خصائص الكائنات مباشرةً

يمكنك أيضًا تجاوز خصائص الكائنات مباشرةً في السيناريوهات الأبسط، مثل تعديل الكائن `process.env` أو خصائص مخصّصة أخرى.

```javascript
// Override process.env property directly
process.env.API_KEY = 'mocked-api-key';

describe('API Key Test', () => {
  it('should use the mocked API key', () => {
    // Test that the code reads the mocked API key
    expect(process.env.API_KEY).toBe('mocked-api-key');
  });
});
```

في هذا المثال، تُتجاوز الخاصية `process.env.API_KEY` مباشرةً لمحاكاة تهيئة بيئة مختلفة للاختبار. وبعد الاختبار، يمكنك إعادة القيمة الأصلية لضمان عدم وجود آثار جانبية على اختبارات أخرى.

## تجاوز الجامعات والضوابط

في السيناريوهات الأكثر تعقيدًا حين تستخدم الخصائص جامعات أو ضوابط، يمكنك تجاوزها مباشرةً بإعادة تعريف الخاصية باستخدام `Object.defineProperty()`.

إليك كيفية تجاوز خاصية بجامع مخصّص:

```javascript
// Override a property with a custom getter
Object.defineProperty(window, 'innerWidth', {
  get: vi.fn(() => 1024),
});

describe('Window Width Test', () => {
  it('should return the mocked window width', () => {
    // Test that the code returns the mocked width
    expect(window.innerWidth).toBe(1024);
  });
});
```

في هذا المثال، نستخدم `Object.defineProperty()` لمحاكاة `window.innerWidth` بجامع مخصّص يُعيد القيمة `1024`. يتيح لك ذلك التحكم في كيفية تصرّف الخاصية أثناء اختباراتك.

## إعادة الخصائص المتجاوَزة

بعد تجاوز خصائص الكائنات، من المهم إعادتها إلى حالتها الأصلية لتجنّب آثار جانبية في اختبارات أخرى. يوفّر Vitest `mockRestore()` لإعادة ضبط الخصائص المتجسَّس عليها أو المُحاكاة.

```javascript
const originalHref = window.location.href;

vi.spyOn(window, 'location', 'get').mockReturnValue({
  href: 'https://mocked-url.com',
});

describe('URL Test', () => {
  afterEach(() => {
    // Restore the original property after each test
    window.location.href = originalHref;
  });

  it('should use the mocked location', () => {
    expect(window.location.href).toBe('https://mocked-url.com');
  });
});
```

بإعادة القيمة الأصلية لـ `window.location.href` داخل كتلة `afterEach()`، تضمن ألا تتعارض الخاصية المتجاوَزة مع اختبارات أخرى.

## الخلاصة {#conclusion}

تجاوز خصائص الكائنات في Vitest تقنية قوية لاختبار شيفرة تعتمد على قيم ديناميكية أو خارجية مثل متغيّرات البيئة، أو كائنات التهيئة، أو الخصائص العامة. وسواء استخدمت `vi.spyOn()` لمحاكاة الجامعات والضوابط، أو عدّلت الخصائص مباشرةً، أو استخدمت `Object.defineProperty()` لتحكّم أكثر تقدمًا، فإن تجاوز الخصائص يتيح لك اختبار سيناريوهات مختلفة في عزلة. تذكّر دائمًا إعادة ضبط الخصائص الأصلية أو استعادتها بعد الاختبار للحفاظ على بيئات اختبار نظيفة ومعزولة.
