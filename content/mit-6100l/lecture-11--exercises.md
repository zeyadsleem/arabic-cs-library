---
book: mit-6100l
chapter: lecture-11
slug: exercises
lang: ar
title: "المحاضرة 11: تمرين الإصبع وحلّه الرسمي — الحذف ثم الترتيب"
---

# المحاضرة 11: تمرين الإصبع وحلّه الرسمي — الحذف ثم الترتيب (Remove and Sort)

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-11-aliasing-cloning/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex11_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex11_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة 11

موعد تسليم الأسئلة أدناه: الأربعاء 19 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 1

نفّذ الدالة التي تستوفي المواصفة التالية:

```python
def remove_and_sort(Lin, k):
    """ Lin is a list of ints
    k is an int >= 0
    Mutates Lin to remove the first k elements in Lin and
    then sorts the remaining elements in ascending order.
    If you run out of items to remove, Lin is mutated to an empty list.
    Does not return anything.
    """
    # Your code here
```

أمثلة:

```python
L = [1,6,3]
k = 1
remove_and_sort(L, k)
print(L)
# prints the list [3, 6]
```

دالتك هنا:

```python
# your function here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
def remove_and_sort(Lin, k):
    if len(Lin) <= k:
        Lin.clear()
        return
    for i in range(k):
        del(Lin[0])
    Lin.sort()
```

ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة.

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms