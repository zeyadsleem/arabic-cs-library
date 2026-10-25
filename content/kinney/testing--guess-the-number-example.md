---
title: "بناء لعبة «خمّن الرقم» باستخدام Vitest"
lang: ar
source: "https://stevekinney.com/courses/testing/guess-the-number-example"
---

## بناء لعبة «خمّن الرقم» باستخدام التطوير الموجّه بالاختبارات مع Vitest

**جدول المحتويات**

1. [المقدمة](#introduction)
2. [المتطلبات المسبقة](#prerequisites)
3. [إعداد المشروع](#project-setup)
4. [فهم التطوير الموجّه بالاختبارات](#understanding-test-driven-development)
5. [تهيئة Vitest](#setting-up-vitest)
6. [تصميم منطق اللعبة](#designing-the-game-logic)
7. [تنفيذ منطق اللعبة باستخدام TDD](#implementing-the-game-logic-with-tdd) [1. توليد رقم عشوائي](#generating-a-random-number) [2. إجراء تخمين](#making-a-guess) [3. تقديم التغذية الراجعة](#providing-feedback) [4. تتبّع المحاولات](#tracking-attempts) [5. التعامل مع المدخلات غير الصالحة](#handling-invalid-inputs)
  - [1. توليد رقم عشوائي](#generating-a-random-number)
  - [2. إجراء تخمين](#making-a-guess)
  - [3. تقديم التغذية الراجعة](#providing-feedback)
  - [4. تتبّع المحاولات](#tracking-attempts)
  - [5. التعامل مع المدخلات غير الصالحة](#handling-invalid-inputs)
8. [تشغيل الاختبارات](#running-the-tests)
9. [الخاتمة](#conclusion)
10. [تمارين إضافية](#additional-exercises)

---

### المقدمة {#introduction}

في هذا الدليل، سنبني لعبة بسيطة هي **«خمّن الرقم»** باستخدام **التطوير الموجّه بالاختبارات (TDD)** مع **Vitest**، إطار اختبارات JavaScript حديث. سيُطوَّر منطق اللعبة عبر اختبارات الوحدات دون أي واجهة مستخدم. سيساعدك هذا الأسلوب على التركيز على كتابة شيفرة نظيفة قابلة للاختبار وعلى فهم مبادئ TDD.

**الأهداف:**

- تعلّم كيفية تطبيق TDD لبناء لعبة.
- فهم كيفية كتابة اختبارات الوحدات باستخدام Vitest.
- تطوير منطق لعبة «خمّن الرقم».
- كتابة اختبارات لوظائف متنوّعة، منها توليد الأرقام العشوائية والتعامل مع مدخلات المستخدم.

### المتطلبات المسبقة {#prerequisites}

- معرفة أساسية بـ JavaScript (صياغة ES6+).
- إلمام بـ Node.js وnpm.
- فهم مفاهيم اختبار الوحدات.
- تثبيت Node.js وnpm على جهازك.

### إعداد المشروع {#project-setup}

1. **أنشئ دليلًا جديدًا** <code><span class="line"><span style="color:#82AAFF;font-style:italic">mkdir</span><span style="color:#ECC48D"> guess-the-number-tdd</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> guess-the-number-tdd</span></span></code>
2. **هيّئ npm** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> init</span><span style="color:#82AAFF"> -y</span></span></code>
3. **ثبّت Vitest** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span></span></code>
4. **أعدّ بنية المشروع** <code><span class="line"><span style="color:#D6DEEB">guess</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">the</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">number</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">└── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> └── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code> `src/`: يحتوي على الشيفرة المصدرية لمنطق اللعبة. `tests/`: يحتوي على ملفات الاختبار.
  - `src/`: يحتوي على الشيفرة المصدرية لمنطق اللعبة.
  - `tests/`: يحتوي على ملفات الاختبار.

### فهم التطوير الموجّه بالاختبارات {#understanding-test-driven-development}

**التطوير الموجّه بالاختبارات (TDD)** أسلوب لتطوير البرمجيات يقوم فيه المطوّر بما يلي:

1. **كتابة اختبار**: اكتب اختبارًا للجزء التالي من الوظيفة.
2. **تشغيل الاختبار ورؤيته يفشل**: يضمن أن الاختبار يكتشف غياب الوظيفة.
3. **كتابة أقل شيفرة تجعل الاختبار ينجح**: نفّذ ما يكفي فقط من الشيفرة لجعل الاختبار ينجح.
4. **إعادة الهيكلة**: حسّن الشيفرة مع إبقاء الاختبارات ناجحة.
5. **التكرار**: تابع مع الوظيفة التالية.

غالبًا ما تُسمّى هذه الدورة **أحمر-أخضر-إعادة هيكلة**.

### تهيئة Vitest {#setting-up-vitest}

أضف سكربت اختبار إلى `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

أنشئ ملف `vitest.config.js` (اختياري في الإعدادات البسيطة):

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
});
```

### تصميم منطق اللعبة {#designing-the-game-logic}

قبل أن نبدأ بالبرمجة، لنحدّد منطق اللعبة بإيجاز:

- تولّد اللعبة رقمًا عشوائيًا داخل نطاق محدّد (مثلًا من 1 إلى 100).
- يقوم اللاعب بتخمينات للعثور على الرقم.
- بعد كل تخمين، تقدّم اللعبة تغذية راجعة: إن كان التخمين مرتفعًا جدًا، أو منخفضًا جدًا، أو صحيحًا.
  - إن كان التخمين مرتفعًا جدًا.
  - إن كان التخمين منخفضًا جدًا.
  - إن كان التخمين صحيحًا.
- تتتبّع اللعبة عدد المحاولات.
- تنتهي اللعبة عندما يخمّن اللاعب الرقم الصحيح.
- يضمن التحقق من المدخلات أن التخمينات أرقام صالحة داخل النطاق.

### تنفيذ منطق اللعبة باستخدام TDD {#implementing-the-game-logic-with-tdd}

#### توليد رقم عشوائي {#generating-a-random-number}

##### الخطوة 1: اكتب الاختبار (أحمر)

أنشئ `tests/game.test.js`:

```javascript
// tests/game.test.js
import { describe, it, expect } from 'vitest';
import { createGame } from '../src/game';

describe('Guess the Number Game', () => {
  it('generates a random number between 1 and 100 by default', () => {
    const game = createGame();
    expect(game.secretNumber).toBeGreaterThanOrEqual(1);
    expect(game.secretNumber).toBeLessThanOrEqual(100);
  });

  it('allows setting a custom range', () => {
    const game = createGame(1, 50);
    expect(game.secretNumber).toBeGreaterThanOrEqual(1);
    expect(game.secretNumber).toBeLessThanOrEqual(50);
  });
});
```

**الشرح:**

- نختبر أن `createGame` تولّد رقمًا عشوائيًا داخل النطاق الافتراضي (من 1 إلى 100).
- نختبر أنه يمكن تحديد نطاق مخصّص.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

ستحصل على خطأ: `createGame` غير معرّفة.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

نفّذ `createGame` في `src/game.js`:

```javascript
// src/game.js
export function createGame(min = 1, max = 100) {
  return {
    secretNumber: Math.floor(Math.random() * (max - min + 1)) + min,
    min,
    max,
    attempts: 0,
  };
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح الاختبارات الآن.

##### الخطوة 5: أعد الهيكلة (إن لزم)

شيفرتنا مقبولة كما هي.

#### إجراء تخمين {#making-a-guess}

نحتاج إلى تنفيذ دالة لإجراء تخمين.

##### الخطوة 1: اكتب الاختبار (أحمر)

أضف إلى `tests/game.test.js`:

```javascript
describe('makeGuess', () => {
  it('increments the number of attempts', () => {
    const game = createGame();
    game.makeGuess(50);
    expect(game.attempts).toBe(1);
  });

  it('returns "correct" when the guess is equal to the secret number', () => {
    const game = createGame();
    game.secretNumber = 42;
    const result = game.makeGuess(42);
    expect(result).toBe('correct');
  });

  it('returns "too high" when the guess is greater than the secret number', () => {
    const game = createGame();
    game.secretNumber = 42;
    const result = game.makeGuess(50);
    expect(result).toBe('too high');
  });

  it('returns "too low" when the guess is less than the secret number', () => {
    const game = createGame();
    game.secretNumber = 42;
    const result = game.makeGuess(30);
    expect(result).toBe('too low');
  });
});
```

**الشرح:**

- نختبر أن `makeGuess` تزيد عدد المحاولات.
- نختبر التغذية الراجعة للتخمينات الصحيحة والمرتفعة جدًا والمنخفضة جدًا.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

تحدث أخطاء لأن `makeGuess` غير معرّفة.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

حدّث `src/game.js`:

```javascript
export function createGame(min = 1, max = 100) {
  return {
    secretNumber: Math.floor(Math.random() * (max - min + 1)) + min,
    min,
    max,
    attempts: 0,
    makeGuess(guess) {
      this.attempts++;
      if (guess === this.secretNumber) {
        return 'correct';
      } else if (guess > this.secretNumber) {
        return 'too high';
      } else {
        return 'too low';
      }
    },
  };
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل الاختبارات.

##### الخطوة 5: أعد الهيكلة

لا حاجة إلى إعادة هيكلة فورية.

#### تقديم التغذية الراجعة {#providing-feedback}

نفّذنا التغذية الراجعة بالفعل في الخطوة السابقة، لكن لنضف اختبارات للحالات الحدّية.

##### الخطوة 1: اكتب اختبارات إضافية (أحمر)

أضف إلى `tests/game.test.js`:

```javascript
describe('makeGuess', () => {
  // … previous tests …

  it('handles negative numbers correctly', () => {
    const game = createGame(-50, 50);
    game.secretNumber = -10;
    expect(game.makeGuess(-20)).toBe('too low');
    expect(game.makeGuess(0)).toBe('too high');
  });
});
```

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

ينبغي أن ينجح الاختبار إن كان التنفيذ السابق يتعامل مع الأرقام السالبة.

##### الخطوة 3: تحقّق من التنفيذ

دالتنا `makeGuess` تقارن الأرقام بشكل صحيح بالفعل، بما في ذلك الأرقام السالبة.

##### الخطوة 4: أعد الهيكلة

تأكد من أن المقارنات تتعامل مع الحالات الحدّية بشكل صحيح.

#### تتبّع المحاولات {#tracking-attempts}

نحتاج إلى التأكد من أن اللعبة تتبّع عدد المحاولات بدقة.

##### الخطوة 1: اكتب اختبارات إضافية (أحمر)

أضف إلى `tests/game.test.js`:

```javascript
describe('attempts tracking', () => {
  it('counts the number of attempts made', () => {
    const game = createGame();
    game.makeGuess(10);
    game.makeGuess(20);
    game.makeGuess(30);
    expect(game.attempts).toBe(3);
  });
});
```

##### الخطوة 2: شغّل الاختبار

شغّل الاختبار:

```bash
npm test
```

ينبغي أن ينجح الاختبار، مؤكدًا تتبّع المحاولات.

#### التعامل مع المدخلات غير الصالحة {#handling-invalid-inputs}

نحتاج إلى التعامل مع الحالات التي لا يكون فيها التخمين رقمًا صالحًا أو يكون خارج النطاق.

##### الخطوة 1: اكتب الاختبار (أحمر)

أضف إلى `tests/game.test.js`:

```javascript
describe('input validation', () => {
  it('throws an error when the guess is not a number', () => {
    const game = createGame();
    expect(() => game.makeGuess('a')).toThrow('Invalid guess');
  });

  it('throws an error when the guess is out of range', () => {
    const game = createGame(1, 50);
    expect(() => game.makeGuess(0)).toThrow('Guess must be between 1 and 50');
    expect(() => game.makeGuess(51)).toThrow('Guess must be between 1 and 50');
  });
});
```

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

تحدث أخطاء لأننا لم ننفّذ التحقق من المدخلات.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

حدّث `src/game.js`:

```javascript
export function createGame(min = 1, max = 100) {
  return {
    secretNumber: Math.floor(Math.random() * (max - min + 1)) + min,
    min,
    max,
    attempts: 0,
    makeGuess(guess) {
      if (typeof guess !== 'number' || isNaN(guess)) {
        throw new Error('Invalid guess');
      }
      if (guess < this.min || guess > this.max) {
        throw new Error(`Guess must be between ${this.min} and ${this.max}`);
      }
      this.attempts++;
      if (guess === this.secretNumber) {
        return 'correct';
      } else if (guess > this.secretNumber) {
        return 'too high';
      } else {
        return 'too low';
      }
    },
  };
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل الاختبارات.

##### الخطوة 5: أعد الهيكلة

فكّر في نقل منطق التحقق إلى دوال منفصلة إن لزم.

---

في هذه المرحلة، نفّذنا منطق اللعبة الأساسي باستخدام TDD.

### تشغيل الاختبارات {#running-the-tests}

يمكنك في أي وقت تشغيل كل الاختبارات باستخدام:

```bash
npm test
```

سينفّذ Vitest كل الاختبارات في دليل `tests/` ويبلّغ بالنتائج.

### الخاتمة {#conclusion}

باتّباع مبادئ التطوير الموجّه بالاختبارات، بنينا لعبة «خمّن الرقم» عاملة دون واجهة مستخدم. كتبنا اختبارات وحدات لمنطق اللعبة، ضامنين أن شيفرتنا موثوقة وتتصرّف كما هو متوقع.

**الخلاصات الأساسية:**

- **سير عمل TDD:** كتابة الاختبارات أولًا تساعد في تحديد السلوك المتوقع وتؤدي إلى شيفرة أفضل تصميمًا.
- **Vitest للاختبار:** يوفّر Vitest تجربة اختبار سريعة وحديثة لتطبيقات JavaScript.
- **التركيز على اختبار الوحدات:** يتيح لنا التركيز على اختبارات الوحدات ضمان أن كل جزء من شيفرتنا يعمل بشكل صحيح في عزلة.

### تمارين إضافية {#additional-exercises}

لتعزيز لعبة «خمّن الرقم» ومهاراتك في الاختبار أكثر، فكّر في تنفيذ الميزات التالية:

1. **تحديد الحد الأقصى للمحاولات** عدّل اللعبة لتسمح بعدد أقصى من المحاولات. اكتب اختبارات لضمان انتهاء اللعبة بعد بلوغ الحد الأقصى من المحاولات.
  - عدّل اللعبة لتسمح بعدد أقصى من المحاولات.
  - اكتب اختبارات لضمان انتهاء اللعبة بعد بلوغ الحد الأقصى من المحاولات.
2. **نظام تلميحات** نفّذ نظام تلميحات يقدّم قرائن إضافية. اكتب اختبارات للتحقق من دقة التلميحات وتقديمها بشكل صحيح.
  - نفّذ نظام تلميحات يقدّم قرائن إضافية.
  - اكتب اختبارات للتحقق من دقة التلميحات وتقديمها بشكل صحيح.
3. **وظيفة إعادة اللعب** أضف تابعًا لإعادة ضبط اللعبة والبدء من جديد. اكتب اختبارات لضمان إعادة ضبط اللعبة بشكل صحيح.
  - أضف تابعًا لإعادة ضبط اللعبة والبدء من جديد.
  - اكتب اختبارات لضمان إعادة ضبط اللعبة بشكل صحيح.
4. **مستويات الصعوبة** أدخل مستويات صعوبة تعدّل النطاق أو عدد المحاولات. اكتب اختبارات للتحقق من تصرّف اللعبة بشكل صحيح عند مستويات صعوبة مختلفة.
  - أدخل مستويات صعوبة تعدّل النطاق أو عدد المحاولات.
  - اكتب اختبارات للتحقق من تصرّف اللعبة بشكل صحيح عند مستويات صعوبة مختلفة.
5. **تتبّع إحصائي** تتبّع إحصاءات مثل إجمالي الألعاب الملعوبة، والفوزات، ومتوسط المحاولات. اكتب اختبارات لضمان تسجيل الإحصاءات بدقة.
  - تتبّع إحصاءات مثل إجمالي الألعاب الملعوبة، والفوزات، ومتوسط المحاولات.
  - اكتب اختبارات لضمان تسجيل الإحصاءات بدقة.
6. **تحليل المدخلات** حسّن التعامل مع المدخلات لقبول النصوص وتحويلها إلى أرقام. اكتب اختبارات لضمان تفسير مدخلات مثل `'42'` بشكل صحيح.
  - حسّن التعامل مع المدخلات لقبول النصوص وتحويلها إلى أرقام.
  - اكتب اختبارات لضمان تفسير مدخلات مثل `'42'` بشكل صحيح.
7. **وضع اللاعبين المتعددين** اسمح لعدة لاعبين بالتخمين بالتناوب. اكتب اختبارات لضمان إدارة أدوار اللاعبين ونتائجهم بشكل صحيح.
  - اسمح لعدة لاعبين بالتخمين بالتناوب.
  - اكتب اختبارات لضمان إدارة أدوار اللاعبين ونتائجهم بشكل صحيح.
8. **قائمة أفضل النتائج** نفّذ نظام أفضل النتائج الذي يسجّل أفضل الدرجات. اكتب اختبارات لضمان تحديث أفضل النتائج واسترجاعها بشكل صحيح.
  - نفّذ نظام أفضل النتائج الذي يسجّل أفضل الدرجات.
  - اكتب اختبارات لضمان تحديث أفضل النتائج واسترجاعها بشكل صحيح.

---

بتوسيع اللعبة وكتابة اختبارات لميزات جديدة، ستعمّق فهمك لـ TDD وتحسّن كفاءتك في الاختبار.
