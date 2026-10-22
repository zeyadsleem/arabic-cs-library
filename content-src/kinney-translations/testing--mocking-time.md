---
title: "اختبار الوقت (Testing Time)"
---

كثير من واجهات المستخدم تميل إلى عرض أشياء مثل الوقت والتواريخ. وكما ناقشنا سابقًا، نريد أن تكون اختباراتنا متسقة. كما [كتب ستيف ميلر ذات مرة](https://www.youtube.com/watch?v=HlItAutxJzk&list=OLAK5uy_lRxgtVPfsBuzpgFdYdFi0Ej0J2mNwzz2A)، (ولكن لنكن صادقين، أنت تفكر في [نسخة سيل من موسيقى فيلم Space Jam](https://www.youtube.com/watch?v=gxbBp9SH81U)):

> الوقت يستمر في الانزلاق نحو المستقبل.
> الوقت يستمر في الانزلاق، والانزلاق، والانزلاق نحو المستقبل.

في العمق، يستخدم Vitest [`@sinonjs/fake-timers`](https://github.com/sinonjs/fake-timers).

عادةً، إذا كنت تحتاج إلى التحكم في الوقت في اختباراتك، فستختار استخدام مؤقتات Sinon المزيفة قبل مجموعة الاختبارات المعنية، ثم تكون مسافرًا عبر الزمن حسن السلوك وتحاول إعادة كل شيء إلى ما كان عليه عندما تنتهي.

```typescript
beforeEach(() => {
  // Take control of time.
  vi.useFakeTimers();
});

afterEach(() => {
  // Put things back the way you found it.
  vi.useRealTimers();
});
```

تستبدل `useFakeTimers()` الدوال العالمية `setTimeout` و`clearTimeout` و`setInterval` و`setImmediate` و`clearImmediate` و`process.hrtime` و`performance.now` و`Date` بتنفيذ مخصص يمكنك التحكم فيه.

تُعيد كائن `clock` يبدأ عند عصر يونكس (أي `0`). إذا أردت بدء الوقت من نقطة أخرى، يمكنك تمرير عدد صحيح مختلف، لكنني سأزعم أنك أفضل حالًا باستخدام `setSystemTime`، كما سنرى أدناه.

```typescript
vi.useFakeTimers(1677952591024);
```

الوقت أيضًا مجمّد فعليًا ما لم تختر تقديمه بنفسك. إذا أردت أن يتقدم الوقت كما يفعل عادةً، يمكنك تمرير خيار إلى `useFakeTimers()`.

```typescript
vi.useFakeTimers({ shouldAdvanceTime: true });
```

## التلاعب بالوقت

### تعيين الوقت

الآن في أي اختبار، يمكنك تعيين الوقت يدويًا إلى ما تحتاجه.

```typescript
const date = new Date(2012, 1, 1, 13);
vi.setSystemTime(date);
```

- يمكنك الوصول إلى الوقت المُحاكى باستخدام `vi.getMockedSystemTime()`.
- يمكنك الوصول إلى الوقت *الحقيقي* باستخدام `vi.getRealSystemTime()`. (لا أستطيع حتى ابتكار سبب قد يدفعك لفعل ذلك. أذكره فقط اكتمالًا.)

### تقديم الوقت إلى الأمام

هذه مفيدة عند إعداد مؤقتات مثل `setInterval` و`setTimeout`.

- `vi.advanceTimersByTime`، `vi.advanceTimersByTimeAsync`: يقدّم الوقت الحالي بعدد محدد من المللي ثانية.
- `vi.advanceTimersToNextTimer`، `vi.advanceTimersToNextTimerAsync`: يقدّم الوقت حتى يُطلق المؤقت التالي.
- `vi.getTimerCount`: يعيد عدد المؤقتات المتبقية.
- `vi.runAllTimers`، `vi.runAllTimersAsync`: يشغّل كل المؤقتات. (هذا الخيار سيرفع خطأ عند 10,000 محاولة إذا كان لديك `setInterval` لا يُمسح أبدًا.)
- `vi.runAllTicks`: يستدعي كل مهمة صغيرة (microtask) أنشأها `process.nextTick`.

## التنظيف

- `vi.clearAllTimers`: يزيل أي مؤقتات مجدولة للتشغيل.
- `vi.restoreCurrentDate`: يعيد كائن `Date` الأصلي إلى مكانه.
- `vi.useRealTimers`: عندما تنتهي كل مؤقتاتك، يعيد هذا التابع كل مؤقتاتك المُحاكاة إلى تنفيذاتها الأصلية.

## محاكاة المؤقتات والتواريخ وأدوات النظام الأخرى

في بعض الحالات، قد تعتمد شيفرتك على أدوات نظام مثل المؤقتات أو التواريخ، وهو ما قد يدخل عدم قابلية التوقع إلى اختباراتك. يوفر Vitest وظائف مدمجة لمحاكاة أدوات النظام مثل `setTimeout` و`setInterval` و`Date` والتحكم فيها لضمان تصرف اختباراتك بشكل متسق.

### محاكاة المؤقتات

عند التعامل مع المؤقتات، مثل `setTimeout` أو `setInterval`، يمكنك محاكاتها للتحكم في سلوكها في الاختبارات باستخدام `vi.useFakeTimers()`.

```javascript
// Mock the timers
vi.useFakeTimers();

// Example function that uses setTimeout
function delay(callback) {
  setTimeout(() => {
    callback('Delayed');
  }, 1000);
}

describe('delay function', () => {
  it('should call callback after delay', () => {
    const callback = vi.fn();

    // Call the function under test
    delay(callback);

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    // Assert that the callback was called
    expect(callback).toHaveBeenCalledWith('Delayed');
  });
});
```

في هذا المثال، يتيح لنا `vi.useFakeTimers()` التحكم في المؤقتات وتقديم الوقت بـ `vi.advanceTimersByTime(1000)` لمحاكاة مرور الوقت دون انتظار تأخيرات العالم الحقيقي.

### محاكاة التواريخ

وبالمثل، يمكنك محاكاة مُنشئ `Date` لإرجاع تواريخ أو أوقات محددة.

```javascript
// Mock the current date to always return a specific date
const mockDate = new Date(2024, 1, 1);
vi.setSystemTime(mockDate);

describe('mocked Date', () => {
  it('should return the mocked date', () => {
    const currentDate = new Date();
    expect(currentDate).toEqual(mockDate);
  });
});
```

باستخدام `vi.setSystemTime()`، يمكنك ضمان أن `new Date()` تعيد دائمًا قيمة متسقة، ما يجعل الاختبارات التي تعتمد على التواريخ قابلة للتوقع.

## محاكاة الوحدات وإعادة تعيين البدائل المُحاكاة

في الأنظمة الأكثر تعقيدًا، قد تريد محاكاة وحدات كاملة لعزل الشيفرة قيد الاختبار. يتيح لك Vitest محاكاة وحدات محددة بـ `vi.mock()`، وهو ما يوفر مرونة في التحكم في سلوك الاعتماديات.

```javascript
// Mock the api module
vi.mock('./api', () => ({
  getConcertDetails: vi
    .fn()
    .mockResolvedValue({ band: 'Green Day', venue: 'Madison Square Garden' }),
}));
```

يتيح لك ذلك محاكاة كل الدوال داخل وحدة `api` دفعة واحدة. عند الاختبار، ستحل هذه النسخة المُحاكاة محل الوحدة الحقيقية، بما يضمن إمكانية محاكاة سيناريوهات متنوعة.

### إعادة تعيين البدائل المُحاكاة

بعد تشغيل اختبار، من المهم إعادة تعيين البدائل المُحاكاة أو استعادتها إلى حالتها الأصلية لتجنب التداخل بين الاختبارات. يمكنك إعادة تعيين البدائل المُحاكاة باستخدام `vi.resetAllMocks()` أو استعادة التنفيذات الأصلية بـ `mockRestore()`.

```javascript
// Reset all mocks after each test
afterEach(() => {
  vi.resetAllMocks();
});
```

يضمن ذلك أن يبدأ كل اختبار ببدائل مُحاكاة حديثة ويزيل السلوك غير المقصود الناتج عن الحالة المشتركة بين الاختبارات.

## دمج البدائل المُحاكاة مع الجواسيس والبدائل

يمكنك دمج وظائف البدائل المُحاكاة والجواسيس والبدائل لسيناريوهات اختبار أكثر تقدمًا. على سبيل المثال، يمكنك محاكاة دالة والتجسس أيضًا على تفاعلاتها أو تثبيت تابع داخل بديل مُحاكى.

```javascript
// Create a mock and spy on one of its methods
const mockObject = {
  method: vi.fn().mockReturnValue('Mocked result'),
};

// Spy on the method
const spy = vi.spyOn(mockObject, 'method');

mockObject.method('argument');

// Verify the interaction
expect(spy).toHaveBeenCalledWith('argument');
expect(spy).toHaveReturnedWith('Mocked result');
```

يجمع هذا المثال بين بديل مُحاكى وجاسوس، ما يتيح لك التحكم في سلوك التابع ومراقبة طريقة استخدامه داخل الاختبار.

## مثال: محاكاة المهلات أو الدوال غير المتزامنة مثل `setTimeout`

محاكاة الدوال غير المتزامنة مثل `setTimeout` حالة استخدام متقدمة أخرى. بمحاكاة المؤقتات، يمكنك محاكاة السلوك غير المتزامن دون الانتظار فعليًا للتأخير الحقيقي.

إليك مثالًا نحاكي فيه `setTimeout` ونستخدم `vi.useFakeTimers()` للتحكم في تدفق الوقت في دالة غير متزامنة:

```javascript
function delayedFunction(callback) {
  setTimeout(() => {
    callback('Done');
  }, 3000);
}

describe('delayedFunction', () => {
  it('should call callback after timeout', () => {
    // Mock the timer
    vi.useFakeTimers();

    const callback = vi.fn();

    // Call the function under test
    delayedFunction(callback);

    // Fast-forward the timer
    vi.advanceTimersByTime(3000);

    // Assert that the callback was called
    expect(callback).toHaveBeenCalledWith('Done');
  });
});
```

في هذا الاختبار، يُتحكم في المؤقت باستخدام `vi.useFakeTimers()` و`vi.advanceTimersByTime()`، وهو ما يحاكي `setTimeout` دون انتظار التأخير الفعلي. يتيح لك ذلك اختبار شيفرة غير متزامنة بطريقة مُتحكَّم بها وقابلة للتوقع.
