---
title: "تثبيت userEvent"
lang: ar
source: "https://stevekinney.com/courses/testing/accident-counter-with-user-event"
---

> **إن كنت لا تستخدم مستودع المثال**
>
> لقد فعلت هذا لك بالفعل، لكنني سأدرجه هنا للرجوع. إن لم تكن قد ثبّتت `@testing-library/user-event`، فقد تحتاج إلى تنفيذ `npm install --save-dev @testing-library/user-event`.

## إعادة هيكلة ملف الاختبار لاستخدام `userEvent`

حدّث حالات الاختبار لتستخدم `userEvent` بدلًا من `fireEvent`.

### شيفرة الاختبار بعد إعادة الهيكلة

```jsx
// src/counter.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter Component', () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it('renders with an initial count of 0', () => {
    const countElement = screen.getByTestId('counter-count');
    expect(countElement).toHaveTextContent('0');
  });

  it('displays "days" when the count is 0', () => {
    const unitElement = screen.getByTestId('counter-unit');
    expect(unitElement).toHaveTextContent('days');
  });

  it('increments the count when the "Increment" button is clicked', async () => {
    const incrementButton = screen.getByText('Increment');
    await userEvent.click(incrementButton); // Using userEvent for a real click event

    const countElement = screen.getByTestId('counter-count');
    expect(countElement).toHaveTextContent('1');
  });

  it('displays "day" when the count is 1', async () => {
    const incrementButton = screen.getByText('Increment');
    await userEvent.click(incrementButton); // Increment the count

    const unitElement = screen.getByTestId('counter-unit');
    expect(unitElement).toHaveTextContent('day');
  });

  it('decrements the count when the "Decrement" button is clicked', async () => {
    const incrementButton = screen.getByText('Increment');
    const decrementButton = screen.getByText('Decrement');

    await userEvent.click(incrementButton); // Increment first
    await userEvent.click(decrementButton); // Then decrement

    const countElement = screen.getByTestId('counter-count');
    expect(countElement).toHaveTextContent('0');
  });

  it('does not allow decrementing below 0', async () => {
    const decrementButton = screen.getByText('Decrement');
    await userEvent.click(decrementButton); // Should not decrement below 0

    const countElement = screen.getByTestId('counter-count');
    expect(countElement).toHaveTextContent('0');
  });

  it('resets the count when the "Reset" button is clicked', async () => {
    const incrementButton = screen.getByText('Increment');
    const resetButton = screen.getByText('Reset');

    await userEvent.click(incrementButton); // Increment first
    await userEvent.click(resetButton); // Then reset

    const countElement = screen.getByTestId('counter-count');
    expect(countElement).toHaveTextContent('0');
  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    const decrementButton = screen.getByText('Decrement');
    const resetButton = screen.getByText('Reset');

    expect(decrementButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });

  it('updates the document title based on the count', async () => {
    const incrementButton = screen.getByText('Increment');
    await userEvent.click(incrementButton);

    expect(document.title).toBe('1 day');

    await userEvent.click(incrementButton);
    expect(document.title).toBe('2 days');
  });
});
```

## شرح التغييرات

### استبدال `fireEvent` بـ `userEvent`

يطلق `fireEvent` الأحداث مباشرة على عناصر DOM، لكنه لا يحاكي سلوك المستخدم بواقعية `userEvent`.

يحاكي `userEvent.click()` نقر المستخدم على الزر، ما ينتج محاكاة أكثر واقعية لما يحدث في المتصفح.

### `await` للسلوك غير المتزامن

واجهة `userEvent` أكثر لا تزامنية من `fireEvent`، لذا نحتاج إلى استخدام `await` عند النقر على الأزرار لضمان تحديث الواجهة على نحو صحيح قبل التحققات.

### محاكاة محسّنة للمستخدم

يتعامل `userEvent` مع تفاعلات المستخدم المتنوعة (مثل أحداث الفأرة وضغطات المفاتيح والكتابة) على نحو أقرب إلى كيفية تفاعل المستخدم مع المتصفح، ما يجعل الاختبارات أكثر متانة.

## لماذا تستخدم `userEvent` بدلًا من `fireEvent`؟

- **الواقعية**: يحاكي `userEvent` تفاعل المستخدم الفعلي على نحو أفضل، مثل الاستمرار في الضغط على زر، أو الكتابة، أو النقر. وهو يراعي سلوك المتصفح بدقة أكبر.
- **الاستعداد للمستقبل**: يوصي Testing Library بـ `userEvent` وله دعم أفضل لميزات المتصفح المستقبلية.
- **التعامل غير المتزامن**: بعض الإجراءات التي تتطلب تأخيرات في المتصفح (مثل الكتابة أو النقرات المتعددة) تُعالج بشكل أفضل باستخدام `userEvent`.

في مجموعة الاختبارات المعاد هيكلتها هذه، استخدمنا `userEvent` لمحاكاة تفاعلات المستخدم الحقيقية مع مكوّن `Counter`. هذه الطريقة أكثر موثوقية وتمثيلًا لكيفية تفاعل المستخدمين مع تطبيقك، وهي تهيّئ اختباراتك للتعامل مع تفاعلات أكثر تعقيدًا في المستقبل.
