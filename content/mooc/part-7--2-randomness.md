---
title: "العشوائية (Randomness)"
lang: ar
source: "https://programming-26.mooc.fi/part-7/2-randomness"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستكون مألوفاً مع بعض الدوال في الوحدة `random`
- ستتمكن من الاستفادة من الأرقام العشوائية في برامجك

</text-box>

يركز هذا القسم على الوحدة [random](https://docs.python.org/3/library/random.html?highlight=random#module-random) من المكتبة القياسية لـ Python. إنها تحتوي على أدوات لتوليد أرقام عشوائية ووظائف عشوائية أخرى.

الأقسام في هذا الجزء من المادة تحتوي على العديد من الروابط إلى [التوثيق](https://docs.python.org/3/library/) للمكتبة القياسية لـ Python. نوصي بمتابعة الروابط للتعرف على كيفية عمل التوثيق.

## توليد رقم عشوائي

الدالة [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) تعيد قيمة عدد صحيح عشوائي بين `a` و `b`، شاملة. مثلاً، البرنامج التالي يعمل كنرد عام:

```python
from random import randint

print("The result of the throw:", randint(1, 6))
```

تنفيذ هذا قد يطبع:


```
The result of the throw: 4
```


البرنامج التالي يرمي النرد عشر مرات:

```python
from random import randint

for i in range(10):
    print("The result of the throw:", randint(1, 6))
```

تشغيل ما سبق قد يطبع:


```
The result of the throw: 5
The result of the throw: 4
The result of the throw: 3
The result of the throw: 2
The result of the throw: 3
The result of the throw: 4
The result of the throw: 6
The result of the throw: 4
The result of the throw: 4
The result of the throw: 3
```


ملاحظة: من المفيد تذكر أن الدالة `randint` تعمل بشكل مختلف قليلاً مقارنة بـ، مثلاً، الشرائح (slices)، أو الدالة `range`، التي تعرفنا عليها سابقاً. استدعاء الدالة `randint(1, 6)` ينتج رقم بين 1 و 6 شامل، لكن استدعاء الدالة... (truncated in source)
