---
title: "مُطابِقات Testing Library"
---

تضمّن Testing Library أيضًا بعض المُطابِقات المفيدة لإصدار توقّعات على عناصر DOM. وكإضافة ممتعة، سنستخدم React أيضًا—فقط لنُظهر لك كم الفرق ضئيل عندما يتعلّق الأمر باختبار واجهتك في DOM.

لننتقل إلى `examples/accident-counter`.

## تهيئة مُطابِقات Testing Library

في `examples/accident-counter/src/counter.test.jsx`، يمكننا توسيع التوابع التي يوفّرها `expect` بجلب `@testing-library/jest-dom/vitest`.

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Counter } from './counter';

import '@testing-library/jest-dom/vitest';
```

سيستدعي هذا `expect.extend()`، مما يتيح لنا إعداد [مُطابِقات مخصّصة](https://stevekinney.com/courses/testing/custom-matchers). وسيمنحنا التوابع الجديدة التالية على `expect`.

- `toBeDisabled`
- `toBeEnabled`
- `toBeEmptyDOMElement`
- `toBeInTheDocument`
- `toBeInvalid`
- `toBeRequired`
- `toBeValid`
- `toBeVisible`
- `toContainElement`
- `toContainHTML`
- `toHaveAccessibleDescription`
- `toHaveAccessibleErrorMessage`
- `toHaveAccessibleName`
- `toHaveAttribute`
- `toHaveClass`
- `toHaveFocus`
- `toHaveFormValues`
- `toHaveStyle`
- `toHaveTextContent`
- `toHaveValue`
- `toHaveDisplayValue`
- `toBeChecked`
- `toBePartiallyChecked`
- `toHaveRole`
- `toHaveErrorMessage`

يمكنك القراءة أكثر عن `@testing-library/jest-dom` [هنا](https://github.com/testing-library/jest-dom).

## تصيير العدّاد

نريد تصيير مكوّن `Counter` قبل كل اختبار. وهذا سيعيده إلى حالته الأصلية.

```javascript
describe('Counter', () => {
  beforeEach(() => {
    render(<Counter />);
  });
});
```

## اختبار العدّاد

الآن، لنكتب اختبارًا سريعًا لنرى ما إذا كان يُصيَّر كما هو متوقّع.

```javascript
it('renders with an initial count of 0', () => {
  const countElement = screen.getByTestId('counter-count');
  expect(countElement).toHaveTextContent('0');
});
```

لاحظ التابع الجديد `toHaveTextContent`.

يمكننا أيضًا التحقّق من أن زرّي `decrement` و`reset` معطّلان عندما يكون العدّاد عند الصفر.

```javascript
it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
  const decrementButton = screen.getByRole('button', { name: 'Decrement' });
  const resetButton = screen.getByRole('button', { name: 'Reset' });

  expect(decrementButton).toBeDisabled();
  expect(resetButton).toBeDisabled();
});
```

## دورك

> **تمرين**

نفّذ أكبر عدد تستطيعه من الاختبارات التالية:

- يعرض «days» عندما يكون العدّاد 0.
- يزيد العدّاد عند النقر على زر «Increment».
- يعرض «day» عندما يكون العدّاد 1.
- ينقص العدّاد عند النقر على زر «Decrement».
- لا يسمح بالإنقاص إلى ما دون 0.
- يعيد ضبط العدّاد عند النقر على زر «Reset».
- يعطّل زرّي «Decrement» و«Reset» عندما يكون العدّاد 0.
- يحدّث عنوان المستند بناءً على العدّاد.

يمكنك رؤية حل محتمل [هنا](https://stevekinney.com/courses/testing/accident-counter-solution).
