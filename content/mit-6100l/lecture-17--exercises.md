---
book: mit-6100l
chapter: lecture-17
slug: exercises
lang: ar
title: "تمرين المحاضرة 17 وحلّه: صنف الدائرة"
---

# التمرين القصير للمحاضرة 17 (Finger Exercises Lecture 17)

المصادر: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-17-python-classes/)، و[ملف الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex17_sol.pdf).

إعداد الأصل: **Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا**، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، مع احترام استثناءات الأطراف الثالثة في الأصل.

كانت الأسئلة أدناه مستحقة يوم الأربعاء 9 نوفمبر 2022، الساعة 03:00:00 مساءً.

## 1) السؤال 1 من 1

اكتب الصنف (Class) وفق المواصفات أدناه:

- `__init__`: يهيّئ `self` بنصف القطر `radius`.
- `get_radius`: يُرجع نصف قطر `self`.
- `set_radius`: المعامل `radius` عدد؛ يغيّر نصف قطر `self` إلى `radius`.
- `get_area`: يُرجع مساحة `self` باستخدام `pi = 3.14`.
- `equal`: المعامل `c` كائن (Object) من الصنف `Circle`؛ يُرجع `True` إذا كانت قيمة نصف القطر متساوية في `self` و`c`.
- `bigger`: المعامل `c` كائن `Circle`؛ يُرجع `self` أو `c`، أي كائن الدائرة ذي نصف القطر الأكبر.

```python
class Circle():
    def __init__(self, radius):
        """ Initializes self with radius """
        # your code here

    def get_radius(self):
        """ Returns the radius of self """
        # your code here

    def set_radius(self, radius):
        """ radius is a number
        Changes the radius of self to radius """
        # your code here

    def get_area(self):
        """ Returns the area of self using pi = 3.14 """
        # your code here

    def equal(self, c):
        """ c is a Circle object
        Returns True if self and c have the same radius value """
        # your code here

    def bigger(self, c):
        """ c is a Circle object
        Returns self or c, the Circle object with the bigger radius """
        # your code here
```

حقل الإجابة في الأصل:

```python
# your class here
```

## إليك الحل الذي كتبناه

```python
class Circle():
    def __init__(self, radius):
        self.r = radius
    def get_radius(self):
        return self.r
    def set_radius(self, radius):
        self.r = radius
    def get_area(self):
        return 3.14*self.r*self.r
    def equal(self, c):
        return (c.r == self.r)
    def bigger(self, c):
        if c.r > self.r:
            return c
        elif c.r < self.r:
            return self
```

> **ملاحظة المترجم:** لا يعالج الحل المنشور تساوي نصفي القطر داخل `bigger`؛ في هذه الحالة يُرجع Python القيمة `None` ضمنيًا. أُبقي الحل الرسمي دون إضافة فرع جديد. استُعيدت المسافات البادئة من الأصل بدل ترتيب النص المستخرج المشوّه.

## إشعار المصدر الختامي

MIT OpenCourseWare — <https://ocw.mit.edu>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <https://ocw.mit.edu/terms>.
