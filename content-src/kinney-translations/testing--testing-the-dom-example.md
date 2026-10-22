---
title: "مثال أساسي"
---

تخيّل أن لديك زرًا، وعندما تنقر عليه يحدث شيء ما. حالة كلاسيكية، أليس كذلك؟ لنُعِدّ اختبارًا أساسيًا لذلك التفاعل. إليك دالة بسيطة، موجودة في `examples/element-factory/src/button.js`، تُنشئ بنية DOM لدينا وتضيف بعض السلوك:

```javascript
// examples/element-factory/src/button.js
export function createButton() {
  const button = document.createElement('button');
  button.textContent = 'Click Me';

  button.addEventListener('click', () => {
    button.textContent = 'Clicked!';
  });

  return button;
}
```

لا شيء مبهر—مجرد زر يقول «Click Me»، وعندما تنقر عليه يتغيّر إلى «Clicked!». إنه أشبه بمستوى تعليمي في لعبة عن الميكروويف بالنسبة لاختبار DOM.

## كتابة الاختبار

الآن لنختبر هذا الشيء ونتأكّد من أنه لا يكذب علينا. سنضيف حالة اختبار جديدة لضمان أن الزر يغيّر النص بنجاح عند النقر.

```javascript
import { it, expect, describe } from 'vitest';
import { createButton } from './button.js';

describe('createButton', () => {
  it('should create a button element', () => {
    const button = createButton();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should have the text "Click Me"', () => {
    const button = createButton();
    expect(button.textContent).toBe('Click Me');
  });

  it('should change the text to "Clicked!" when clicked', () => {
    const button = createButton();
    button.click();
    expect(button.textContent).toBe('Clicked!');
  });
});
```

سواء كنت تستخدم `jsdom` أو `happy-dom`، فقد تمّت تعبئة كل توابع DOM نيابةً عنك. ما زالت الشيفرة تعمل في Node من الناحية التقنية—لكنها تستطيع الوصول إلى كل التوابع التي قد تجدها عادةً في المتصفح فقط.
