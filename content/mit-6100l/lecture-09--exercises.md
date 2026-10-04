---
book: mit-6100l
chapter: lecture-09
slug: exercises
lang: ar
title: "المحاضرة 9: تمرين الإصبع وحلّه الرسمي — حاصل الضرب النقطي"
---

# المحاضرة 9: تمرين الإصبع وحلّه الرسمي — حاصل الضرب النقطي (Dot Product)

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-9-lambda-functions-tuples-and-lists/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex09_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex09_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة 9

موعد تسليم الأسئلة أدناه: الأربعاء 12 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 1

نفّذ الدالة التي تستوفي المواصفة التالية:

```python
def dot_product(tA, tB):
    """
    tA: a tuple of numbers
    tB: a tuple of numbers of the same length as tA
    Assumes tA and tB are the same length.
    Returns a tuple where the:
    * first element is the length of one of the tuples
    * second element is the sum of the pairwise products of tA and tB
    """
    # Your code here
```

أمثلة:

```python
tA = (1, 2, 3)
tB = (4, 5, 6)
print(dot_product(tA, tB)) # prints (3,32)
```

دالتك هنا:

```python
# your function here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
def dot_product(tA, tB):
    tot = 0
    for i in range(len(tA)):
        tot += tA[i]*tB[i]
    return (len(tA), tot)
```

ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة. ملف PDF الاستخراجي لا يملك تسلسل بايتات لملف Python يمكن ادّعاء مطابقته بايتًا ببايت.

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms