---
book: mit-6100l
chapter: lecture-10
slug: exercises
lang: ar
title: "المحاضرة 10: تمرين الإصبع وحلّه الرسمي — هل كلّ الدوال تُعيد True؟"
---

# المحاضرة 10: تمرين الإصبع وحلّه الرسمي — هل كلّ الدوال تُعيد True؟

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-10-lists-mutability/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex10_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex10_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة 10

موعد تسليم الأسئلة أدناه: الاثنين 17 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 1

نفّذ الدالة التي تستوفي المواصفة التالية:

```python
def all_true(n, Lf):
    """ n is an int
    Lf is a list of functions that take in an int and return a Boolean
    Returns True if each and every function in Lf returns True
    with n as a parameter. Otherwise returns False.
    """
    # Your code here
```

أمثلة:

```python
all_true() # prints 6
```

**ملاحظة المترجم:** سطر المثال في ملف الحل الأصلي يظهر ناقصًا في النسخة المنشورة على OCW (لا تظهر له وسائط ولا مُخرَج متوقَّع)، فنُقل كما هو دون تخمين.

دالتك هنا:

```python
# your function here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
def all_true(n, Lf):
    flag = True
    for f in Lf:
        if not f(n):
            flag = False
            break
    return flag
```

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms