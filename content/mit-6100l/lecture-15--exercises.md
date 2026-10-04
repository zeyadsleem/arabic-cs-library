---
book: mit-6100l
chapter: lecture-15
slug: exercises
lang: ar
title: "تمرين المحاضرة 15 وحلّه: القوة بالاستدعاء الذاتي"
---

# التمرين القصير للمحاضرة 15 (Finger Exercises Lecture 15)

المصادر: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-15-recursion/)، و[ملف الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex15_sol.pdf).

إعداد الأصل: **Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا**، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، مع احترام استثناءات الأطراف الثالثة في الأصل.

كانت الأسئلة أدناه مستحقة يوم الأربعاء 2 نوفمبر 2022، الساعة 03:00:00 مساءً.

## 1) السؤال 1 من 1

نفّذ الدالة التي تستوفي المواصفات التالية:

- `base`: عدد صحيح (Integer) أو عدد ذو فاصلة عائمة (Float).
- `exp`: عدد صحيح أكبر من أو يساوي صفرًا.
- تُرجع `base` مرفوعًا إلى القوة `exp` باستخدام الاستدعاء الذاتي (Recursion).
- تلميح: الحالة الأساسية (Base case) عندما `exp = 0`. وإلا، في الحالة العودية (Recursive case)، تُرجع حاصل ضرب `base` في `base` مرفوعًا إلى القوة `exp-1`.

```python
def recur_power(base, exp):
    """
    base: int or float.
    exp: int >= 0

    Returns base to the power of exp using recursion.
    Hint: Base case is when exp = 0. Otherwise, in the recursive
    case you return base * base^(exp-1).
    """
    # Your code here

# Examples:
print(recur_power(2,5)  # prints 32
```

> **ملاحظة المترجم:** ينقص سطر المثال قوس إغلاق في الأصل نفسه؛ أُبقي كما هو، وليس هذا خطأ في الترجمة. الرمز `^` في نص التلميح وصف رياضي للقوة، وليس معامل القوة في Python.

حقل الإجابة في الأصل:

```python
# your function here
```

لديك عدد غير محدود من محاولات التسليم المتبقية.

## إليك الحل الذي كتبناه

```python
def recur_power(base, exp):
    if exp <= 0:
        return 1
    return base * recur_power(base, exp - 1)
```

## إشعار المصدر الختامي

MIT OpenCourseWare — <https://ocw.mit.edu>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <https://ocw.mit.edu/terms>.
