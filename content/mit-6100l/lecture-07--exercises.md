---
book: mit-6100l
chapter: lecture-07
slug: exercises
lang: ar
title: "المحاضرة ٧: التمارين القصيرة وحلولها"
---

# المحاضرة ٧: التمارين القصيرة وحلولها

المصدران: [مطالب التمارين في صفحة المحاضرة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-7-decomposition-abstraction-functions/)، و[حلول التمارين الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex07_sol.pdf) ([صفحة المورد](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex07_sol_pdf/)).

تُترك الشيفرة والتعليقات الإنجليزية كما في المصدر، وتُترجم المواصفات خارج كتل الشيفرة. النص الموجود أصلًا مثل `# Your code here` هو جزء من مطلب التمرين، وليس موضعًا ناقصًا في الترجمة.

## صفحة المصدر ١ — السؤال ١ من ٢

**تمارين المحاضرة ٧ القصيرة (Finger Exercises Lecture 7).** موعد تسليم الأسئلة أدناه، كما ورد في المصدر التاريخي: الاثنين ٣ أكتوبر ٢٠٢٢، الساعة 03:00:00 مساءً.

نفّذ الدالة التي تحقق المواصفات أدناه:

- `a, b, c`: قيم عددية لمعاملات معادلة تربيعية (Quadratic Equation).
- `x`: القيمة العددية التي تُحسب عندها التربيعية.
- تُرجع قيمة التربيعية `a×x² + b×x + c`.

```python
def eval_quadratic(a, b, c, x):
    """
    a, b, c: numerical values for the coefficients of a quadratic equation
    x: numerical value at which to evaluate the quadratic.
    Returns the value of the quadratic a×x² + b×x + c.
    """
    # Your code here

# Examples:    
print(eval_quadratic(1, 1, 1, 1)) # prints 3
```

المثال يطبع `3`. يظهر في محرر الإجابة بالسطر ١ التعليق التالي:

```python
# your function here
```

بقي لك عدد غير محدود من محاولات التسليم.

هذا هو الحل الذي كتبناه:

```python
def eval_quadratic(a,b,c,x):
    return a*x*x + b*x + c
```

## صفحة المصدر ٢ — السؤال ٢ من ٢

نفّذ الدالة التي تحقق المواصفات أدناه:

- `a1, b1, c1`: مجموعة معاملات لمعادلة تربيعية.
- `a2, b2, c2`: مجموعة أخرى من معاملات معادلة تربيعية.
- `x1, x2`: القيمتان اللتان تُحسب عندهما التربيعيتان.
- تحسب تربيعية بمعاملات `a1, b1, c1` عند `x1`.
- تحسب تربيعية أخرى بمعاملات `a2, b2, c2` عند `x2`.
- تطبع مجموع نتيجتي الحساب. لا تُرجع شيئًا.

```python
def two_quadratics(a1, b1, c1, x1, a2, b2, c2, x2):
    """
    a1, b1, c1: one set of coefficients of a quadratic equation
    a2, b2, c2: another set of coefficients of a quadratic equation
    x1, x2: values at which to evaluate the quadratics
    Evaluates one quadratic with coefficients a1, b1, c1, at x1.
    Evaluates another quadratic with coefficients a2, b2, c2, at x2.
    Prints the sum of the two evaluations. Does not return anything.
    """
    # Your code here

# Examples:    
two_quadratics(1, 1, 1, 1, 1, 1, 1, 1) # prints 6
print(two_quadratics(1, 1, 1, 1, 1, 1, 1, 1)) # prints 6 then None
```

المثال الأول يطبع `6`. الثاني يطبع `6` ثم `None`. يظهر في محرر الإجابة بالسطر ١:

```python
# your function here
```

بقي لك عدد غير محدود من محاولات التسليم.

هذا هو الحل الذي كتبناه:

```python
def two_quadratics(a1, b1, c1, x1, a2, b2, c2, x2):
    print(eval_quadratic(a1, b1, c1, x1) + eval_quadratic(a2, b2, c2, x2))
```

## صفحة المصدر ٣ — بيانات النشر

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف ٢٠٢٢.

للحصول على معلومات عن الاستشهاد بهذه المواد أو شروط استخدامها، زر: https://ocw.mit.edu/terms

## النسبة والترخيص

آنا بيل (Ana Bell)، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، خريف ٢٠٢٢ (Fall 2022)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare. [المقرر الأصلي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/). الترخيص: [CC BY-NC-SA 4.0 — النسبة، غير تجاري، المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/).

هذه ترجمة وتكييف عربيان غير رسميين، ولا تعنيان تأييد MIT. الترجمة تحت الترخيص نفسه؛ الشيفرة الأصلية محفوظة دون ترجمة تعليقاتها. لا يُعاد نشر ملف PDF أو صور الأطراف الثالثة. [شروط الاستخدام](https://ocw.mit.edu/pages/privacy-and-terms-of-use/).
