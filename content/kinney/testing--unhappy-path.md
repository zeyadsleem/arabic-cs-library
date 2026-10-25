---
title: "المسار غير السعيد"
lang: ar
source: "https://stevekinney.com/courses/testing/unhappy-path"
---

لا، هذا *ليس* اسم فرقتي الموسيقية الجديدة.

يشير «المسار السعيد» إلى السيناريو الذي يعمل فيه كل شيء كما هو متوقّع—المدخلات صالحة، والظروف مثالية، ولا تحدث أخطاء. لكن العالم الحقيقي™ ليس لطيفًا إلى هذا الحد أبدًا.

هنا يأتي دور اختبار **المسار غير السعيد™**. يختبر المسار غير السعيد كيف تتصرّف شيفرتك عندما تسوء الأمور—مدخلات غير صالحة، أو عمليات فاشلة، أو ظروف غير متوقّعة.

اختبار المسار غير السعيد يضمن أن تطبيقك يتعامل مع الحالات الحدّية والأخطاء والمدخلات غير المتوقّعة بلطف. ويوفّر Vitest أدوات متنوّعة لاختبار هذه السيناريوهات بفعالية.

## لماذا تختبر المسار غير السعيد؟

أظن أنني لست بحاجة حقًا إلى إقناعك بهذا، لكن على سبيل الاحتياط:

- **المتانة**: باختبار كيف تتصرّف شيفرتك في ظروف غير طبيعية، تضمن أن تطبيقك متين ويستطيع التعامل مع مشكلات العالم الحقيقي مثل المدخلات غير الصالحة وفشل الشبكة وغيرها.
- **معالجة الأخطاء**: التحقّق من أن شيفرتك ترمي الأخطاء وتلتقطها بشكل صحيح أمر جوهري لضمان التعافي السلس من الإخفاقات.
- **الأمان**: يساعد اختبار الحالات الحدّية في منع السلوكيات غير المتوقّعة التي قد تكشف ثغرات.
- **تجربة المستخدم**: يفعل المستخدمون أغرب الأشياء—أليس كذلك؟ التعامل بلطف مع الأخطاء يوفّر تجارب مستخدم أفضل بمنع الأعطال أو الاستثناءات غير المعالجة.

## سيناريوهات شائعة للمسار غير السعيد

يشمل اختبار المسار غير السعيد سيناريوهات فشل متنوّعة، مثل:

- مدخلات غير صالحة (مثل السلاسل الفارغة، و`null`، و`undefined`، وأنواع بيانات خاطئة).
- عمليات غير ناجحة (مثل فشل الشبكة وأخطاء قاعدة البيانات).
- شروط حدّية (مثل القيم الخارجة عن النطاق).
- استثناءات ترميها اعتماديات أو دوال خارجية.

## اختبار المدخلات غير الصالحة

يكفي نحو ثلاث دقائق من الحديث مع شخص يكتب لغة برمجة أخرى لتسمع النكات عن JavaScript.

- `true + true === 2`
- `1 + '1' === '11'`
- `NaN !== NaN`

القائمة تطول—لكن لدينا ما هو أهم. من المؤكد أن دوالنا الحسابية الأساسية من قبل عرضة لهذا، أليس كذلك؟ ماذا سيحدث في الحالات التالية؟

- `add(1)`
- `add(null, 1)`
- `add('1', 2)`
- `add(2, 'potato')`
- `subtract('1', 1)`
- `divide(5, 0)`

وهكذا دواليك. الإجابة *الخاطئة* الوحيدة هنا هي `:shrug:`. في أي من هذه الحالات حقًا، لدينا نحو خيارين اثنين لا أكثر:

- أن نفشل بلطف.
- أن نقلب طاولة (أي نرمي خطأً)

*يجب* أن تغطي اختباراتنا هذه الحالات الحدّية، وهذا أحد الفروق الدقيقة في التطوير المدفوع بالاختبارات. لا يوجد في TDD ما يمنعك من فعل هذه الأشياء—لكن الاكتفاء بدورة الأحمر-الأخضر-إعادة الهيكلة *أيضًا* لن يوصلك إلى هناك تمامًا.

### أمثلة إضافية على المدخلات غير الصالحة

من المسارات غير السعيدة الشائعة أن يقدّم المستخدم مدخلات غير صالحة. ينبغي أن تختبر كيف تتصرّف شيفرتك حين تتلقّى مدخلات لا تلبي التوقّعات.

```javascript
// Function to be tested
function parseAge(age) {
  if (typeof age !== 'number') {
    throw new Error('Invalid age format');
  }
  if (age < 0 || age > 120) {
    throw new Error('Age must be between 0 and 120');
  }
  return age;
}

describe('parseAge', () => {
  it('should throw an error for non-number input', () => {
    // Test invalid input: string
    expect(() => parseAge('thirty')).toThrow('Invalid age format');

    // Test invalid input: null
    expect(() => parseAge(null)).toThrow('Invalid age format');
  });

  it('should throw an error for out-of-range age', () => {
    // Test invalid age: negative number
    expect(() => parseAge(-5)).toThrow('Age must be between 0 and 120');

    // Test invalid age: too high
    expect(() => parseAge(130)).toThrow('Age must be between 0 and 120');
  });

  it('should return the valid age for a number between 0 and 120', () => {
    // Test valid input
    expect(parseAge(25)).toBe(25);
  });
});
```

في هذا المثال:

- نختبر مدخلات غير صالحة مختلفة (سلسلة و`null`) ونتوقّع أن ترمي الدالة خطأً.
- نختبر أعدادًا خارج النطاق للتأكّد من أن الدالة ترمي خطأً عندما يكون المدخل خارج النطاق المقبول.
- يُضمَّن المسار السعيد أيضًا للتحقّق من أن الدالة تتصرّف بشكل صحيح مع مدخل صالح.

> **لنتعلّم كيف نختبر المسار غير السعيد**
>
> هناك مجموعة من الأمثلة الأخرى أدناه، لكن لنأخذ لحظة للنظر في كيفية إضافة مزيد من الصلابة إلى المثال الذي كنا نعمل عليه في [اختبار معالجة الأخطاء والحالات الحدّية](https://stevekinney.com/courses/testing/error-handling-and-edge-case-testing).

## اختبار الأخطاء في الدوال غير المتزامنة

عند العمل مع دوال غير متزامنة، مثل استدعاءات API أو استعلامات قاعدة البيانات، من المهم اختبار سيناريوهات الفشل مثل أخطاء الشبكة أو المهل المنتهية أو عدم توفّر الخدمة.

```javascript
// Asynchronous function to be tested
async function fetchUserData(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

describe('fetchUserData', () => {
  it('should throw an error if userId is not provided', async () => {
    // Test for missing userId
    await expect(fetchUserData()).rejects.toThrow('User ID is required');
  });

  it('should throw an error if the API response is not ok', async () => {
    // Mock the fetch function to simulate an API error
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

    // Test for API failure
    await expect(fetchUserData(1)).rejects.toThrow('Failed to fetch user data');
  });

  it('should return user data on success', async () => {
    // Mock fetch to return valid data
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
      }),
    );

    // Test happy path
    const result = await fetchUserData(1);
    expect(result).toEqual({ id: 1, name: 'John Doe' });
  });
});
```

في هذا المثال:

- يتحقّق الاختبار الأول من أن الدالة ترمي خطأً إذا كان `userId` مفقودًا.
- يحاكي الاختبار الثاني دالة `fetch` لمضاهاة خطأ في API ويتحقّق من أن الدالة ترمي خطأً.
- يُختبر المسار السعيد أيضًا لضمان التعامل الصحيح مع البيانات الصالحة.

## اختبار الشروط الحدّية

الشروط الحدّية مصدر شائع آخر للأخطاء. اختبار أطراف النطاقات الصالحة يضمن أن شيفرتك تتصرّف بشكل صحيح مع القيم الحدّية الصالحة وغير الصالحة معًا.

```javascript
// Function to be tested
function calculateDiscount(price) {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }
  if (price > 1000) {
    return price * 0.2; // 20% discount for high prices
  }
  return price * 0.1; // 10% discount otherwise
}

describe('calculateDiscount', () => {
  it('should throw an error for negative prices', () => {
    // Test boundary condition: negative price
    expect(() => calculateDiscount(-10)).toThrow('Price cannot be negative');
  });

  it('should apply 10% discount for prices less than 1000', () => {
    // Test boundary condition: price below 1000
    expect(calculateDiscount(500)).toBe(50);
  });

  it('should apply 20% discount for prices above 1000', () => {
    // Test boundary condition: price above 1000
    expect(calculateDiscount(1500)).toBe(300);
  });
});
```

في هذا المثال:

- يُختبر المسار غير السعيد بالتحقّق من أن الأسعار السالبة ترمي خطأً.
- يُختبر الشرط الحدّي للأسعار فوق 1000 لضمان تطبيق الخصم الصحيح.

## اختبار الاعتماديات الخارجية وإخفاقاتها

تعتمد تطبيقات كثيرة على خدمات خارجية، مثل قواعد البيانات أو واجهات API. اختبار المسار غير السعيد يعني مضاهاة فشل هذه الاعتماديات الخارجية أو إعادتها نتائج غير متوقّعة.

```javascript
// Mocking a database call
import * as db from './db';

// Function to be tested
async function getUserData(userId) {
  try {
    const user = await db.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Database error');
  }
}

describe('getUserData', () => {
  it('should throw an error if the user is not found', async () => {
    // Mock the database to return null (user not found)
    vi.spyOn(db, 'findUserById').mockResolvedValue(null);

    // Test that the function throws the correct error
    await expect(getUserData(1)).rejects.toThrow('User not found');
  });

  it('should throw an error for database failure', async () => {
    // Mock the database to simulate an error
    vi.spyOn(db, 'findUserById').mockRejectedValue(new Error('Database failure'));

    // Test that the function throws a database error
    await expect(getUserData(1)).rejects.toThrow('Database error');
  });

  it('should return user data if the user exists', async () => {
    // Mock the database to return a valid user
    vi.spyOn(db, 'findUserById').mockResolvedValue({ id: 1, name: 'John Doe' });

    // Test happy path
    const result = await getUserData(1);
    expect(result).toEqual({ id: 1, name: 'John Doe' });
  });
});
```

في هذا المثال:

- نحاكي قاعدة بيانات تُعيد `null` لاختبار سيناريو عدم العثور على المستخدم.
- نحاكي قاعدة البيانات لمضاهاة إخفاق ونتحقّق من أن الدالة ترمي الخطأ الصحيح.
- يُختبر المسار السعيد أيضًا لضمان أن الدالة تعمل بشكل صحيح عند العثور على المستخدم.

## الخاتمة {#conclusion}

اختبار المسار غير السعيد™ جوهري لضمان أن تطبيقك يستطيع التعامل مع سيناريوهات العالم الحقيقي، بما فيها المدخلات غير الصالحة والعمليات الفاشلة وإخفاقات الخدمات الخارجية. باستخدام أدوات Vitest القوية مثل `toThrow()` و`rejects.toThrow()` والمضاهاة، يمكنك محاكاة هذه الحالات الحدّية والتحقّق من أن شيفرتك تستجيب بشكل مناسب. اختبار المسار غير السعيد يؤدي إلى تطبيقات أكثر متانة وتجارب مستخدم أفضل بالتعامل بلطف مع الأخطاء ومنع الأعطال أو السلوك غير المتوقّع.
