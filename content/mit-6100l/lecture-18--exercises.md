---
book: mit-6100l
chapter: lecture-18
slug: exercises
lang: ar
title: "تمرين المحاضرة 18 وحلّه: جمع الدوائر وتمثيلها النصي"
---

# التمرين القصير للمحاضرة 18 (Finger Exercises Lecture 18)

المصادر: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-18-more-python-class-methods/)، و[ملف الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex18_sol.pdf).

إعداد الأصل: **Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا**، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، مع احترام استثناءات الأطراف الثالثة في الأصل.

كانت الأسئلة أدناه مستحقة يوم الاثنين 14 نوفمبر 2022، الساعة 03:00:00 مساءً.

## 1) السؤال 1 من 1

اكتب الصنف (Class) وفق المواصفات أدناه:

- `__init__`: يهيّئ `self` بنصف القطر `radius`.
- `get_radius`: يُرجع نصف قطر `self`.
- `__add__`: المعامل `c` كائن (Object) من الصنف `Circle`؛ يُرجع كائن `Circle` جديدًا نصف قطره هو مجموع نصفي قطر `self` و`c`.
- `__str__`: التمثيل النصي (String representation) للدائرة هو نصف قطرها.

```python
class Circle():
    def __init__(self, radius):
        """ Initializes self with radius """
        # your code here

    def get_radius(self):
        """ Returns the radius of self """
        # your code here

    def __add__(self, c):
        """ c is a Circle object
        Returns a new Circle object whose radius is
        the sum of self and c's radius """
        # your code here

    def __str__(self):
        """ A Circle's string representation is the radius """
        # your code here
```

حقل الإجابة في الأصل:

```python
# your class here
```

لديك عدد غير محدود من محاولات التسليم المتبقية.

## إليك الحل الذي كتبناه

```python
class Circle():
    def __init__(self, radius):
        self.r = radius
    def get_radius(self):
        return self.r
    def __add__(self, c):
        return Circle(self.r + c.r)
    def __str__(self):
        return str(self.r)
```

## إشعار المصدر الختامي

MIT OpenCourseWare — <https://ocw.mit.edu>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <https://ocw.mit.edu/terms>.
