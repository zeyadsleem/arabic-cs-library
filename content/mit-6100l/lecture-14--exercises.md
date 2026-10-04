---
book: mit-6100l
chapter: lecture-14
slug: exercises
lang: ar
title: "المحاضرة 14: تمارين الأصابع وحلولها — المعاجم"
---

# المحاضرة 14: تمارين الأصابع وحلولها — المعاجم (Dictionaries)

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-14-dictionaries/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex14_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex14_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة 14

موعد تسليم الأسئلة أدناه: الاثنين 31 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 2

نفّذ الدالة التي تستوفي المواصفة التالية:

```python
def keys_with_value(aDict, target):
    """
    aDict: a dictionary
    target: an integer or string
    Assume that keys and values in aDict are integers or strings.
    Returns a sorted list of the keys in aDict with the value target.
    If aDict does not contain the value target, returns an empty list.
    """
    # Your code here
```

أمثلة:

```python
aDict = {1:2, 2:4, 5:2}
target = 2
print(keys_with_value(aDict, target)) # prints the list [1,5]
```

دالتك هنا:

```python
# your function here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
def keys_with_value(aDict, target):
    target_keys = []
    for i in aDict.keys():
        if aDict[i] == target:
            target_keys.append(i)
    target_keys.sort()
    return target_keys
```

### 2) السؤال 2 من 2

نفّذ الدالة التي تستوفي المواصفة التالية:

```python
def all_positive(d):
    """
    d is a dictionary that maps int:list
    Suppose an element in d is a key k mapping to value v (a non-empty list).
    Returns the sorted list of all k whose v elements sums up to a
    positive value.
    """
    # Your code here
```

أمثلة:

```python
d = {5:[2,-4], 2:[1,2,3], 1:[2]}
print(all_positive(d)) # prints the list [1, 2]
```

دالتك هنا:

```python
# your function here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
def all_positive(d):
    L = []
    for k,v in d.items():
        if sum(v) > 0:
            L.append(k)
    return sorted(L)
```

ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة.

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms