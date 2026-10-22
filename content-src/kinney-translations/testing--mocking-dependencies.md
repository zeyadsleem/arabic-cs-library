---
title: "محاكاة الاعتماديات (Mocking Dependencies)"
---

عند كتابة اختبارات الوحدات، من *بالغ الأهمية* عزل الشيفرة قيد الاختبار عن اعتمادياتها الخارجية. قد تشمل الاعتماديات خدمات مثل قواعد البيانات، وواجهات برمجة التطبيقات الخارجية، وأنظمة الملفات، أو مكتبات خارجية لا تريد التفاعل معها مباشرة في اختباراتك. بمحاكاة هذه الاعتماديات، يمكنك محاكاة سلوكها والتحكم في مخرجاتها وضمان بقاء اختباراتك سريعة وموثوقة ومركّزة على المنطق الذي تختبره.

## لماذا نحاكي الاعتماديات؟

- **العزل**: بمحاكاة الاعتماديات، يمكنك اختبار شيفرتك بمعزل عن الخدمات أو الأنظمة الخارجية.
- **التحكم**: يمكنك التحكم في سلوك الاعتماديات، مثل محاكاة الأخطاء أو إرجاع بيانات محددة أو اختبار سيناريوهات مختلفة.
- **الأداء**: تتيح لك المحاكاة تجنب عبء التفاعل مع خدمات بطيئة أو غير متاحة مثل قواعد البيانات أو نداءات الشبكة.
- **قابلية التكرار**: تضمن البدائل المُحاكاة سلوكًا متسقًا، ما يجعل الاختبارات أكثر قابلية للتوقع وأسهل في تصحيح الأخطاء عند فشلها.

## كيف تحاكي الاعتماديات في Vitest

يوفر Vitest توابع قوية مثل `vi.fn()` و`vi.mock()` لمحاكاة الدوال والوحدات والخدمات التي تعتمد عليها شيفرتك. يمكنك محاكاة دوال فردية، أو محاكاة وحدات كاملة لاستبدال تنفيذاتها الحقيقية أثناء الاختبار.

إذا عدنا إلى دالتنا `log` في `examples/logjam` — سترى أننا في الإنتاج نرسل السجل إلى «الخادم» إذا كنا في وضع الإنتاج. إن `sendToServer` دالة فارغة (no-op) لأنني في مثال سابق لم أرد أن ينفجر اختبارنا، لكن يمكنك تخيل أنها تستدعي `fetch` أو شيئًا مشابهًا. وأنت لا تريد تحديدًا أن يحدث ذلك في كل مرة تشغّل فيها اختباراتك. لذا يمكننا اختيار محاكاة تلك الدالة بدلًا من ذلك.

```javascript
vi.mock('./send-to-server', {
  sendToServer: vi.fn(),
});
```

يأخذ `vi.mock()` مسارًا لاعتمادية ويتيح لك استبدال تلك الوظيفة ببديل مُحاكى.

الآن، يمكننا تشغيل اختباراتنا مع محاكاة تلك الدالة.

```javascript
beforeEach(() => {
  vi.stubEnv('MODE', 'production');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetAllMocks();
});

it('sends messages to the server in production mode', () => {
  log('Hello, world!');

  expect(sendToServer).toHaveBeenCalledWith('info', 'Hello, world!');
});
```

### المحاكاة التلقائية (Auto-Mocking)

إذا كان كل ما تفعله هو محاكاة كل دالة في وحدة ما، فيمكنك ببساطة استخدام ميزة [المحاكاة التلقائية](https://stevekinney.com/courses/testing/auto-mocking) في Vite.

```javascript
vi.mock('./send-to-server');
```

سيفعل هذا الشيء نفسه كما في المثال أعلاه. تعمل خوارزمية المحاكاة التلقائية على نحو كهذا:

- ستُفرَّغ كل المصفوفات.
- ستبقى كل القيم الأولية (primitives) والمجموعات كما هي.
- ستُستنسخ كل الكائنات استنساخًا عميقًا.
- ستُستنسخ كل نسخ الأصناف ونماذجها الأولية استنساخًا عميقًا.

## محاكاة دوال فردية

إذا كانت شيفرتك تعتمد على دوال فردية من خدمة أو وحدة، يمكنك محاكاة تلك الدوال المحددة باستخدام `vi.fn()` لمحاكاة سلوكها.

إليك مثالًا على محاكاة دالة خدمة قاعدة بيانات:

```javascript
// Database service that will be mocked
function fetchBandData(bandName) {
  // Normally this would fetch from a database
  return database.query(`SELECT * FROM bands WHERE name = '${bandName}'`);
}

// Code under test
async function getBandDetails(bandName) {
  return await fetchBandData(bandName);
}

describe('getBandDetails', () => {
  it('should return mocked band data', async () => {
    // Mock fetchBandData to simulate database response
    const mockFetchBandData = vi.fn(() =>
      Promise.resolve({ name: 'Green Day', genre: 'Punk Rock' }),
    );

    // Call the function with the mocked dependency
    const result = await mockFetchBandData('Green Day');

    // Check that the function was called with the correct argument
    expect(mockFetchBandData).toHaveBeenCalledWith('Green Day');

    // Assert the return value
    expect(result).toEqual({ name: 'Green Day', genre: 'Punk Rock' });
  });
});
```

في هذا المثال، نستبدل الدالة الحقيقية `fetchBandData` بتنفيذ بديل مُحاكى يحاكي نداء قاعدة بيانات. يضمن ذلك أن يعمل اختبارنا بسرعة وبمعزل.

## محاكاة وحدات كاملة

في الحالات التي تعتمد فيها شيفرتك على دوال متعددة من وحدة أو خدمة، يمكنك محاكاة الوحدة بأكملها باستخدام `vi.mock()`. هذا مفيد بشكل خاص لمحاكاة المكتبات أو الخدمات الخارجية التي توفر وظائف متعددة.

إليك كيفية محاكاة وحدة كاملة:

```javascript
// Imagine you have a module called 'api' with various functions
import * as api from './api';

// Code under test
async function getConcertDetails(bandName) {
  return await api.fetchConcerts(bandName);
}

describe('getConcertDetails', () => {
  // Mock the entire api module
  vi.mock('./api', () => ({
    fetchConcerts: vi.fn(() =>
      Promise.resolve([{ venue: 'Madison Square Garden', date: '2024-09-01' }]),
    ),
  }));

  it('should return mocked concert details', async () => {
    // Call the function with the mocked module
    const result = await getConcertDetails('Green Day');

    // Check that the fetchConcerts mock was called
    expect(api.fetchConcerts).toHaveBeenCalledWith('Green Day');

    // Assert the return value
    expect(result).toEqual([{ venue: 'Madison Square Garden', date: '2024-09-01' }]);
  });
});
```

في هذا المثال، تُحاكى الوحدة `api` بأكملها، وتُستبدل الدالة `fetchConcerts` ببديل مُحاكى يعيد بيانات حفلات محددة مسبقًا. يتيح ذلك للاختبار العمل دون إجراء نداءات حقيقية إلى واجهة برمجة التطبيقات.

## محاكاة وحدات Node.js المدمجة

يمكنك أيضًا محاكاة وحدات Node.js المدمجة مثل `fs` أو `http` إذا كانت شيفرتك تتفاعل مع نظام الملفات أو تجري طلبات شبكة.

إليك مثالًا على محاكاة وحدة `fs`:

```javascript
import * as fs from 'fs';

// Code under test
function readConfigFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

describe('readConfigFile', () => {
  // Mock the fs module
  vi.mock('fs');

  it('should read the mocked config file', () => {
    // Mock the fs.readFileSync method
    vi.spyOn(fs, 'readFileSync').mockReturnValue('mocked file content');

    // Call the function under test
    const result = readConfigFile('/path/to/config');

    // Assert the returned file content
    expect(result).toBe('mocked file content');
  });
});
```

في هذا الاختبار، تُحاكى الدالة `fs.readFileSync` لإرجاع محتوى محدد مسبقًا، ما يتيح لك اختبار دالتك دون الحاجة إلى ملف فعلي على نظام الملفات.

## مثال: محاكاة واجهة برمجة تطبيقات خارجية

إليك مثالًا كاملًا على محاكاة اعتمادية واجهة برمجة تطبيقات خارجية باستخدام Vitest:

```javascript
// Assume you have an API module
import * as api from './api';

// Code under test
async function fetchConcertData(bandName) {
  const response = await api.getConcerts(bandName);
  return response.data;
}

describe('fetchConcertData', () => {
  // Mock the API module
  vi.mock('./api', () => ({
    getConcerts: vi.fn(() => Promise.resolve({ data: [{ venue: 'Wembley', date: '2024-10-05' }] })),
  }));

  it('should fetch concert data using the mocked API', async () => {
    // Call the function under test
    const result = await fetchConcertData('Green Day');

    // Assert that the API was called with the correct argument
    expect(api.getConcerts).toHaveBeenCalledWith('Green Day');

    // Check the returned data
    expect(result).toEqual([{ venue: 'Wembley', date: '2024-10-05' }]);
  });
});
```

في هذا المثال، نحاكي وحدة واجهة برمجة التطبيقات بأكملها، بما يضمن ألا يجري الاختبار أي طلبات حقيقية إليها. يعيد البديل المُحاكى بيانات محددة مسبقًا، ما يتيح لك التحكم في سيناريو الاختبار بالكامل.

سواء كنت تحاكي واجهات برمجة التطبيقات أو قواعد البيانات أو أنظمة الملفات، فإن المحاكاة تضمن بقاء اختباراتك قابلة للتوقع وسريعة ومركّزة على المنطق قيد الاختبار. تذكّر دائمًا ودائمًا ودائمًا بإعادة تعيين البدائل المُحاكاة أو استعادتها بعد الاختبارات للحفاظ على بيئة اختبار نظيفة ومتسقة.

## `vi.doMock`

[`vi.doMock`](https://vitest.dev/api/vi.html#vi-domock) هو في الأساس نفس `vi.mock` باستثناء أنه *غير* مرفوع إلى الأعلى (hoisted)، مما يعني أن لديك وصولًا إلى المتغيرات. سيُحاكى الاستيراد *التالي* لتلك الوحدة.

## قراءات إضافية

- [محاكاة نظام الملفات](https://stevekinney.com/courses/testing/mocking-the-file-system)
