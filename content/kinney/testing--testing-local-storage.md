---
title: "اختبار التخزين المحلي"
lang: ar
source: "https://stevekinney.com/courses/testing/testing-local-storage"
---

لنفترض أن لدينا شيفرة تلمس `localStorage`. عادةً تعمل اختباراتنا في Node، لكن `localStorage` ليست في Node. صحيح أننا *نستطيع* استخدام [البدائل المُحاكاة](https://stevekinney.com/courses/testing/mocks) أو [البدائل](https://stevekinney.com/courses/testing/stubs)، لكن يمكننا أيضًا أن نحاكي بيئة المتصفح فحسب.

```javascript
it('should properly assign to localStorage', () => {
  const key = 'secret';
  const message = "It's a secret to everybody.";

  localStorage.setItem(key, message);
  expect(localStorage.getItem(key)).toBe(message);
});
```

## مرة أخرى: مع بعض التفاعل مع DOM

تأمّل هذه الدالة التي تُنشئ بعض العناصر لتخزين سرّ في `localStorage`. يمكنك العثور على هذا المثال في `examples/element-factory/src/secret-input.js`.

```javascript
export function createSecretInput() {
  const id = 'secret-input';

  const container = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const button = document.createElement('button');

  input.id = id;
  input.type = 'password';
  input.placeholder = 'Enter your secret…';

  label.htmlFor = id;
  label.textContent = 'Secret';

  button.textContent = 'Store Secret';
  button.addEventListener('click', () => {
    localStorage.setItem('secret', input.value);
    input.value = '';
  });

  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(button);

  return container;
}
```

يمكننا كتابة الاختبارات التالية للتحقّق من أنها تفعل ما نعتقد أنه ينبغي أن تفعله. ألقِ نظرة على `examples/element-factory/src/secret-input.test.js`:

```javascript
import { describe, expect, it, beforeEach } from 'vitest';
import { createSecretInput } from './secret-input.js';

describe('createSecretInput', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store the value in localStorage', () => {
    const secretInput = createSecretInput();
    const input = secretInput.querySelector('input');
    const button = secretInput.querySelector('button');

    input.value = 'my secret';
    button.click();

    expect(localStorage.getItem('secret')).toBe('my secret');
  });
});
```
