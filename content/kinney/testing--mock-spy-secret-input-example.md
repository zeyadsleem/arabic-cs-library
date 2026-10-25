---
title: "محاكاة الطرق المدمجة والتجسس عليها (Mocking and Spying on Built-in Methods)"
lang: ar
source: "https://stevekinney.com/courses/testing/mock-spy-secret-input-example"
---

لنلقِ نظرة على `examples/element-factory/src/secret-input.test.js` مرة أخرى. لدينا بعض الوظائف حيث يمكن تعبئة حقل الإدخال مسبقًا بأي شيء موجود حاليًا في `localStorage`. لنفترض أننا نريد في الوقت نفسه تثبيت قيمة `localStorage` وأن نكون قادرين على فحص المعاملات التي استُدعي بها `localStorage.getItem`.

لنبدأ بتعديل تهيئتنا:

```javascript
beforeEach(() => {
  vi.spyOn(localStorage, 'getItem').mockReturnValue('test secret');
  vi.spyOn(localStorage, 'setItem');

  document.body.innerHTML = '';
  document.body.appendChild(createSecretInput());
});
```

الآن، لنفترض أننا نريد أن نلقي نظرة على ما إذا كان حقل الإدخال يحمل القيمة الصحيحة *و* ما إذا كان يجلب تلك القيمة من `localStorage`.

```javascript
it('should have loaded the secret from localStorage', async () => {
  expect(screen.getByLabelText('Secret')).toHaveValue('test secret');
  expect(localStorage.getItem).toHaveBeenCalledWith('secret');
});
```

> **هل يمكننا ببساطة تعيين التخزين المحلي (local storage) ومسحه باستخدام JSDOM أو Happy DOM؟**
>
> غالبًا، نعم. يمكننا ذلك. وربما ينبغي لنا. الميزة الوحيدة الإضافية هنا هي أننا نستطيع النظر في القيم التي استُدعي بها `localStorage.getItem` و`localStorage.setItem`.
>
> ولكي أكون صريحًا تمامًا، أفعل هذا غالبًا لأنني سأكلفك بأمثلة عملية أكثر بعد قليل.

يمكننا فعل الشيء نفسه لتعيين القيمة. تذكّر أنه بما أن السر يُحمَّل من `localStorage`، فستحتاج إلى مسح حقل الإدخال قبل الكتابة فيه.

```javascript
it('should save the secret to localStorage', async () => {
  const input = screen.getByLabelText('Secret');
  const button = screen.getByText('Store Secret');

  await userEvent.clear(input);
  await userEvent.type(input, 'new secret');
  await userEvent.click(button);

  expect(localStorage.setItem).toHaveBeenCalledWith('secret', 'new secret');
});
```

## دورك الآن

> **هل يمكنك محاكاة الأرقام العشوائية؟**
>
> انتقل إلى `examples/guessing-game`. تستخدم هذه اللعبة `Math.random` لتوليد رقم عشوائي — وهو ما قد يجعل اختبارها صعبًا. هل يمكنك استخدام الاستراتيجيات أعلاه لإبقاء `Math.random()` في مكان ثابت؟ **تلميح**: `0.5` خيار جيد.

يمكنك رؤية حل نموذجي [هنا](https://stevekinney.com/courses/testing/guessing-game-solution).

## قراءات إضافية

يمكنك مراجعة المزيد من الأمثلة [هنا](https://stevekinney.com/courses/testing/overriding-object-properties).

- [تجاوز خصائص الكائنات](https://stevekinney.com/courses/testing/overriding-object-properties)
- [محاكاة طرق DOM](https://stevekinney.com/courses/testing/mocking-dom-methods)
