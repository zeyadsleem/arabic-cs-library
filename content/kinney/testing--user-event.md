---
title: "FireEvent مقابل UserEvent في الاختبار"
lang: ar
source: "https://stevekinney.com/courses/testing/user-event"
---

`fireEvent` مفيدة في — همم — إطلاق الأحداث، لكن بشكل عام هناك أكثر من حدث واحد في تفاعل المستخدم. [تأمّل قائمة الأحداث](https://stevekinney.com/courses/testing/fire-event-events) التي تدعمها `fireEvent`. التي تدعمها `fireEvent`. لنلقِ نظرة على قائمة مبسّطة جدًا لما يحدث عندما يكتب مستخدم في حقل `input`:

- قد ينقر المستخدم لتركيز الحقل (`click`، `focus`).
- قد يضغط مفتاحًا (`keydown`، `keypress`).
- سيحرّر ذلك المفتاح على الأرجح (`keyup`).
- سيؤدي ذلك إلى إطلاق حدث `change` على حقل الإدخال.

هذا ليس كل شيء حتى. لكنك فهمت الفكرة. الفكرة أننا نريد محاكاة ما سيفعله مستخدم حقيقي فعلًا بدلًا من التورّط كثيرًا في الأحداث التي يطلقها المتصفح نيابةً عنا.

في *معظم* الحالات، ستريد تفضيل [`@testing-library/user-event`](https://www.npmjs.com/package/@testing-library/user-event) على `fireEvent` المدمجة.

لنجرّبها مع ملف `counter.test.ts` الذي كنا ننظر إليه سابقًا:

```typescript
test('it should increment with the "Increment" button is pressed', () => {
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  fireEvent.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});
```

## استخدام `userEvent`

قد تكون محاولتنا الأولى شيئًا كهذا:

```typescript
test('it should increment with the "Increment" button is pressed', () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});
```

سيفشل هذا الاختبار. لكن لماذا؟

المشكلة أن `user.click()` تعيد `Promise`، لذا علينا جعل دالة اختبارنا غير متزامنة. لحسن الحظ، هذه مشكلة سهلة الحل:

```typescript
test('it should increment with the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});
```

## ترويج إضافي لـ `user-event`

قد لا تكون مقتنعًا تمامًا بـ `user-event` بعد، لكنها تأتي مع مجموعة أخرى من المزايا يصعب محاكاتها يدويًا. على سبيل المثال، لنفترض أنك أردت محاكاة مستخدم يضغط باستمرار على مفتاح Shift الأيسر:

```typescript
const user = userEvent.setup();

await user.keyboard('[<ShiftLeft>]'); // Press Shift (without releasing it)
await user.click(element); // Perform a click with `shiftKey: true`
```

(**المصدر**: [توثيق `user-event`](https://testing-library.com/docs/user-event/setup#starting-a-session-per-setup))

> **عدّاد الحوادث مع حدث المستخدم**
>
> يمكنك الاطلاع على حل لمثال عدّاد الحوادث [باستخدام حدث المستخدم](https://stevekinney.com/courses/testing/accident-counter-with-user-event).
