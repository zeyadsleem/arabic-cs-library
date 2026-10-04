---
book: mit-6100l
chapter: lecture-12
slug: exercises
lang: ar
title: "المحاضرة 12: تمرين الإصبع وحلّه الرسمي — عدّ الجذور التربيعية"
---

# المحاضرة 12: تمرين الإصبع وحلّه الرسمي — عدّ الجذور التربيعية (Count Square Roots)

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-12-list-comprehension-functions-as-objects-testing-debugging/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex12_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex12_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة 12

موعد تسليم الأسئلة أدناه: الاثنين 24 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 1

نفّذ الدالة التي تستوفي المواصفة التالية:

```python
def count_sqrts(nums_list):
    """
    nums_list: a list
    Assumes that nums_list only contains positive numbers and that there are no duplicates.
    Returns how many elements in nums_list are exact squares of
    elements in the same list, including
    """
    # Your code here
```

**ملاحظة المترجم:** تنتهي جملة المواصفة في ملف الحل الأصلي عند كلمة `including` وهي ناقصة؛ يبدو أنّ هذا هو النصّ المنشور على OCW. نُقل بحذافيره ولم يُخمَّن تتمّة له.

أمثلة:

```python
print(count_sqrts([3,4,2,1,9,25])) # prints 3
```

دالتك هنا:

```python
# your function here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
def count_sqrts(nums_list):
    cnt = 0
    for i in nums_list:
        if i*i in nums_list:
            cnt += 1
    return cnt
```

ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة.

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms