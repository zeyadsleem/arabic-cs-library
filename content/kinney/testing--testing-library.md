---
title: "استخدام Testing Library"
lang: ar
source: "https://stevekinney.com/courses/testing/testing-library"
---

[Testing Library](https://testing-library.com/) مصمّمة لمساعدتك في كتابة اختبارات تركّز على سلوك المستخدم بدلًا من تفاصيل التنفيذ. وهي توفّر أدوات للاستعلام عن DOM والتفاعل معه بطريقة تشبه ما يفعله المستخدمون.

لنراجع المثال من [القسم السابق](https://stevekinney.com/courses/testing/testing-local-storage).

```javascript
it('should store the value in localStorage', () => {
  const secretInput = createSecretInput();
  const input = secretInput.querySelector('input');
  const button = secretInput.querySelector('button');

  input.value = 'my secret';
  button.click();

  expect(localStorage.getItem('secret')).toBe('my secret');
});
```

هذا الاختبار ينجح. لذا فهو يعمل من الناحية التقنية. لكن هناك بعض التحفّظات التي تجعله غير رائع جدًا لاختبار سلوك العالم الحقيقي:

1. نضبط قيمة عنصر `input` يدويًا بدلًا من محاكاة كتابة المستخدم فيه.
2. نستدعي تابعًا على الزر بدلًا من النقر عليه فعليًا.

أحد أهداف Testing Library هو مساعدتنا في محاكاة تفاعلات المستخدم الفعلية.

## لماذا تستخدم Testing Library؟

- **اختبار محوره المستخدم**: تركّز على اختبار المكوّنات من منظور المستخدم.
- **تجنّب تفاصيل التنفيذ**: تقلّل الاقتران بين الاختبارات ودواخل المكوّنات.
- **تحسين موثوقية الاختبارات**: تؤدي إلى اختبارات أكثر متانة وأقل عرضة للانكسار بسبب إعادة الهيكلة.
- **استعلامات سهلة الوصول**: تشجّع على الاختبار باستعلامات تعكس أفضل ممارسات إمكانية الوصول.

## مكوّنات Testing Library

بوجه عام، يمكنك أن تنظر إلى Testing Library على أنها جزآن:

1. **نسخة خاصة بإطار معيّن من التوابع المساعدة**: على سبيل المثال، هناك الحزمة الأساسية [`@testing-library/dom`](https://npm.im/@testing-library/dom). لكن هناك أيضًا: [`@testing-library/react`](https://npm.im/@testing-library/react)، و[`@testing-library/vue`](https://npm.im/@testing-library/vue)، و[`@testing-library/svelte`](https://npm.im/@testing-library/svelte)، وغيرها.
2. **User Event** (`@testing-library/user-event`): مكتبة مساعدة مستقلة عن الإطار لمحاكاة أحداث المستخدم.

## إعادة هيكلة حقل الإدخال السرّي

> **User Event غير متزامن**
>
> التوابع التي يوفّرها `userEvent` غير متزامنة، وهذا يعني أن اختباراتك ستحتاج إلى استخدام `async`/`await`.

لننظر إلى هذا الاختبار وقد أُعيد تصوّره باستخدام Testing Library. سننظر إلى الأمر كله ثم نفكّكه قطعة قطعة.

```javascript
describe('createSecretInput', async () => {
  beforeEach(() => {
    document.innerHTML = '';
    document.body.appendChild(createSecretInput());
    localStorage.clear();
  });

  it('should store the value in localStorage', async () => {
    const input = screen.getByLabelText('Secret');
    const button = screen.getByRole('button', { name: 'Store Secret' });

    await userEvent.type(input, 'my secret');
    await userEvent.click(button);

    expect(localStorage.getItem('secret')).toBe('my secret');
  });
});
```

### جلب اعتمادياتنا

إذن، أولًا أحتاج إلى جلب تلك المكتبة المساعدة—تلك التي قلت سابقًا إن لها «نكهة إطار». في هذه الحالة، نستخدم JavaScript العادية فحسب. لذا نختار `@testing-library/dom`. وسنجلب أيضًا `@testing-library/user-event` للتفاعل مع DOM كما قد يفعل المستخدم.

```javascript
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
```

### تهيئة DOM

في التكرار السابق، كنت أعبث بالعناصر في الذاكرة فحسب. لم تُصيَّر قط إلى الصفحة. هذه المرة، لنُصيّرها في المستند. وسأحرص أيضًا على تفريغ `document` قبل كل اختبار.

```javascript
beforeEach(() => {
  // Clear out the DOM.
  document.innerHTML = '';

  // Clear out `localStorage`.
  localStorage.clear();

  // Render our little component.
  document.body.appendChild(createSecretInput());
});
```

### التفاعل مع DOM

الآن، سنستخدم بعض محدّدات إمكانية الوصول. `screen` هي في الأساس نافذة المتصفح. وهذا يعني أن `id` الخاص بك قد يتغيّر أو يُولَّد عشوائيًا أو أيًا كان. نحن نستخدم الوظيفة نفسها التي قد يستخدمها قارئ الشاشة للعثور على العناصر.

```javascript
it('should store the value in localStorage', async () => {
  const input = screen.getByLabelText('Secret');
  const button = screen.getByRole('button', { name: 'Store Secret' });

  await user.type(input, 'my secret');
  await user.click(button);

  expect(localStorage.getItem('secret')).toBe('my secret');
});
```

> **تأكّد من أنك تنتظر أحداث المستخدم**
>
> على سبيل التجربة—امضِ قدمًا واحذف كلمات `await` تلك وانظر ما يحدث. **حرق المفاجأة**: إنه ليس جيدًا.

## متى تستخدم Testing Library

- **اختبار تفاعل المكوّنات**: عندما تحتاج إلى اختبار كيف تستجيب المكوّنات لأفعال المستخدم.
- **الالتزام بإمكانية الوصول**: ضمان أن المكوّنات سهلة الوصول وتتفاعل كما هو متوقّع.
- **التحقّق من السلوك**: التأكّد من أن المكوّنات تُصيَّر وتتحدّث بشكل صحيح بناءً على الخصائص والحالة.

> **تمرين**
>
> هل يمكنك إعادة هيكلة زرّنا من [هذا القسم](https://stevekinney.com/courses/testing/testing-the-dom-example) (الموجود في `examples/element-factory/src/button.js`) لاستخدام Testing Library وUser Event؟ يمكنك رؤية حل محتمل [هنا](https://stevekinney.com/courses/testing/testing-library-solution).

## قراءات إضافية

لدى `@testing-library/dom` دالة تُسمّى `fireEvent` تُطلق أحداثًا خامًا على عُقد DOM. هذا مفيد عند الحاجة إليه، لكن—بوجه عام—ينبغي أن تهدف إلى استخدام `user-event` بدلًا منه لأنه يحاكي تفاعل المستخدم بشكل أفضل. على سبيل المثال، قد يتكوّن حدث مستخدم بسيط من أحداث DOM متعددة.

- قد ينقر المستخدم ليركّز على الحقل (`click`، `focus`).
- وقد يضغط مفتاحًا (`keydown`، `keypress`).
- وعلى الأرجح سيُفلت ذلك المفتاح (`keyup`).
- وسيؤدي ذلك إلى إطلاق حدث `change` على حقل الإدخال.

كتبت المزيد عن [`user-event` هنا](https://stevekinney.com/courses/testing/user-event).
