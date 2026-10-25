---
title: "تمرين"
lang: ar
source: "https://stevekinney.com/courses/testing/asymmetric-matchers-exercise"
---

لننتقل إلى `examples/characters` ونقضي لحظة في التأمل في صنف `Character` هذا، وهو مجموعة فرعية من صنف `Person` الذي نظرنا إليه للتو.

```javascript
import { Person } from './person.js';
import { rollDice } from './roll-dice.js';

export class Character extends Person {
  constructor(firstName, lastName, role) {
    super(firstName, lastName);

    this.role = role;
    this.level = 1;

    this.createdAt = new Date();
    this.lastModified = this.createdAt;

    this.strength = rollDice(4, 6);
    this.dexterity = rollDice(4, 6);
    this.intelligence = rollDice(4, 6);
    this.wisdom = rollDice(4, 6);
    this.charisma = rollDice(4, 6);
    this.constitution = rollDice(4, 6);
  }

  levelUp() {
    this.level++;
    this.lastModified = new Date();
  }
}
```

يمكنك إلقاء نظرة على `roll-dice.js`، لكنني سأحرق المفاجأة: إنه *في الأساس* مولّد أرقام عشوائية. وله أيضًا تاريخان — `createdAt` و`lastModified` — سيكونان صعبَي التثبيت نوعًا ما. هل يمكنك كتابة بعض الاختبارات التي تختبر الأجزاء التي يمكننا تثبيتها؟

- نعلم أن الاسم الأول والأخير يجب أن يكونا ما نمرره.
- الاسم الكامل يجب أن يكون على الأرجح الاسم الأول والأخير مجتمعين.
- نعلم أن الدور يجب أن يكون ما أُعطي للمنشئ.
- نعلم أن مستوى الشخصية سيكون دائمًا افتراضيًا `1`.
- **إضافة**: هل يمكنك إيجاد طريقة ذكية لمعرفة ما إذا كان التاريخ قد عُدّل بنجاح؟

يمكنك إلقاء نظرة على [حل محتمل هنا](https://stevekinney.com/courses/testing/asymmetric-matchers-solution).
