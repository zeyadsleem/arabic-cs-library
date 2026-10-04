---
book: mit-6100l
chapter: lecture-16
slug: exercises
lang: ar
title: "تمرين المحاضرة 16 وحلّه: تسطيح قائمة"
---

# التمرين القصير للمحاضرة 16 (Finger Exercises Lecture 16)

المصادر: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-16-recursion-on-non-numerics/)، و[ملف الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex16_sol.pdf).

إعداد الأصل: **Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا**، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، مع احترام استثناءات الأطراف الثالثة في الأصل.

كانت الأسئلة أدناه مستحقة يوم الاثنين 7 نوفمبر 2022، الساعة 03:00:00 مساءً.

## 1) السؤال 1 من 1

نفّذ الدالة التي تستوفي المواصفات التالية:

- `L`: قائمة (List).
- تُرجع نسخة من `L` تكون نسخة مسطّحة (Flattened version) منها.

```python
def flatten(L):
    """
    L: a list
    Returns a copy of L, which is a flattened version of L
    """
    # Your code here

# Examples:
L = [[1,4,[6],2],[[[3]],2],4,5]
print(flatten(L)) # prints the list [1,4,6,2,3,2,4,5]
```

المثال يطبع القائمة `[1,4,6,2,3,2,4,5]`.

حقل الإجابة في الأصل:

```python
# your function here
```

لديك عدد غير محدود من محاولات التسليم المتبقية.

## إليك الحل الذي كتبناه

```python
def flatten(L):
    result = []
    for i in L:
        if type(i) == list:
            result.extend(flatten(i))
        else:
            result.append(i)
    return result
```

> **ملاحظة المترجم:** استُعيدت المسافات البادئة من ترتيب الكود في PDF، لا من الأعمدة المشوّهة في النص المستخرج؛ لم يُغيَّر منطق الحل.

## إشعار المصدر الختامي

MIT OpenCourseWare — <https://ocw.mit.edu>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <https://ocw.mit.edu/terms>.
