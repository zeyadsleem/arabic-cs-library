---
title: "المزيد من أمثلة الأصناف"
lang: ar
source: "https://programming-26.mooc.fi/part-8/5-more-examples-of-classes"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستكون قادراً على إنشاء أصناف أكثر تنوعاً
- ستعرف كيف تضيف دالة `__str__` إلى تعريفات أصنافك

</text-box>


## مثال 1: صنف Rectangle (المستطيل)

لنلقي نظرة على صنف يمثل مستطيلاً في فضاء ثنائي الأبعاد:

```python
class Rectangle:
    def __init__(self, left_upper: tuple, right_lower: tuple):
        self.left_upper = left_upper
        self.right_lower = right_lower
        self.width = right_lower[0]-left_upper[0]
        self.height = right_lower[1]-left_upper[1]

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return self.width * 2 + self.height * 2

    def move(self, x_change: int, y_change: int):
        corner = self.left_upper
        self.left_upper = (corner[0]+x_change, corner[1]+y_change)
        corner = self.right_lower
        self.right_lower = (corner[0]+x_change, corner[1]+y_change)
```

يتم إنشاء `Rectangle` جديد مع زوجين مرتبين (tuples) كمعاملين. هذان الزوجان يحتويان على إحداثيات x و y للزاوية العلوية اليسرى والزاوية السفلية اليمنى. تحسب الدالة البانية ارتفاع وعرض المستطيل بناءً على هذه القيم.\n
تحسب الدالتان `area` و `perimeter` مساحة ومحيط المستطيل بناءً على الارتفاع والعرض. تقوم الدالة `move` بتحريك المستطيل بقيم x و y المعطاة كمعاملين.

يمثل المستطيل في نظام إحداثيات حيث تزداد إحداثيات x من اليسار إلى اليمين، وتزداد إحداثيات y من الأعلى إلى الأسفل. هذه طريقة شائعة للتعامل مع الإحداثيات في البرمجة لأن اعتبار الزاوية العلوية اليسرى للشاشة كنقطة يساوي فيها x و y الصفر يكون أسهل وأكثر طبيعية في كثير من الأحيان.

البرنامج التالي يختبر صنف `Rectangle`:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle.left_upper)
print(re...
