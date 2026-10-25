---
title: "إعادة هيكلة اختبار الزر"
lang: ar
source: "https://stevekinney.com/courses/testing/testing-library-solution"
---

مرة أخرى، سنحتاج على الأرجح إلى جلب مكتباتنا:

```javascript
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
```

بعد ذلك سنستخدم `user-event` للنقر على الزر بدلًا من نداء تابع على العنصر.

```javascript
it('should change the text to "Clicked!" when clicked', async () => {
  const button = createButton();

  await userEvent.click(button);

  expect(button.textContent).toBe('Clicked!');
});
```

> **تذكّر أن تجعل دالة الاختبار غير متزامنة.**

## تصيير الزر إلى DOM

يمكننا أيضًا اختيار تصيير الزر إلى `document` والعثور عليه بهذه الطريقة.

```javascript
it('should change the text to "Clicked!" when clicked', async () => {
  document.body.appendChild(createButton());
  const button = screen.getByRole('button', { name: 'Click Me' });

  await userEvent.click(button);

  expect(button.textContent).toBe('Clicked!');
});
```

هذا لطيف أيضًا لأنه يجعل اختبارنا الذي نتأكد فيه من أن الزر يحمل التسمية الصحيحة عتيقًا. وبالتفكير في الأمر، فإنه يجعل اختبارنا الأول الذي ننظر فيه إلى نوع العنصر عتيقًا أيضًا.
