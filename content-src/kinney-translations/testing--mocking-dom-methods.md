---
title: "محاكاة توابع DOM"
---

في [البداية](https://stevekinney.com/courses/testing/the-basics) منذ زمن، جعلنا `add` يعمل، لكن لنرفع مستوى لعبتنا. لنفترض أن لدينا زرًا يزيد عدّادًا عند النقر عليه. نريد أن نختبر أن المستخدم يرى العدّاد يزداد.

سنحتاج إلى تعديل إعدادنا قليلًا من أجل DOM:

```html
<!-- index.html -->
<html lang="en">
  <head>
    <title>Counter</title>
  </head>
  <body>
    <div id="app">
      <p id="counter">0</p>
      <button id="increment">Increment</button>
    </div>

    <script>
      const counterElement = document.getElementById('counter');
      const buttonElement = document.getElementById('increment');
      let count = 0;

      buttonElement.addEventListener('click', () => {
        count += 1;
        counterElement.textContent = count;
      });
    </script>
  </body>
</html>
```

إليك اختبار ذلك السلوك:

```javascript
import { describe, it, expect } from 'vitest';

describe('Counter app', () => {
  it('should increment the count when the button is clicked', () => {
    // Set up DOM
    document.body.innerHTML = `
      <p id="counter">0</p>
      <button id="increment">Increment</button>
    `;

    const button = document.getElementById('increment');
    const counter = document.getElementById('counter');

    // Fake our state
    let count = 0;
    button.addEventListener('click', () => {
      count += 1;
      counter.textContent = count;
    });

    // Simulate the button click
    button.click();

    // Check if the behavior is what we expect
    expect(counter.textContent).toBe('1');
  });
});
```

فبدلًا من اختبار الحالة الداخلية مباشرةً، نتحقق من **الشيء الذي يهمّنا أكثر**: ما يراه المستخدم، أي أن الرقم يزداد عند النقر على الزر. وهكذا عندما يعتني شخص مسكين بتطبيقك في المستقبل، يستطيع *أن يعرف فورًا* ما يجري: آه، النقر على الزر يعني تغيّر العدّاد، رائع. ليس عليه أن يحفر في كيفية عمل الحالة الداخلية لـ `count`.

## محاكاة توابع DOM

أحيانًا تحتاج إلى محاكاة توابع DOM أو خدمات خارجية، وهي أمور تصبح أعقد قليلًا في الاختبارات. لنُحاكِ الدالة `getElementById` لنرى مدى سهولة ذلك في Vitest:

```javascript
import { describe, it, vi } from 'vitest';

describe('DOM tests', () => {
  it('should call getElementById', () => {
    const spy = vi.spyOn(global.document, 'getElementById').mockReturnValue({
      textContent: '0',
    });

    const element = document.getElementById('counter');

    expect(spy).toHaveBeenCalled();
    expect(element.textContent).toBe('0');

    spy.mockRestore();
  });
});
```

لقد حاكيت للتوّ `getElementById` وتحقّقت من أنه نُودي عليه. يأتي Vitest بمكتبة محاكاة مدمجة، لذا لا تحتاج إلى جلب اعتمادات إضافية لمجرد الأساسيات مثل الجواسيس والبدائل المُحاكاة والبدائل.
