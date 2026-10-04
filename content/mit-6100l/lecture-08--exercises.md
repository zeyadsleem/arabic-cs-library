---
book: mit-6100l
chapter: lecture-08
slug: exercises
lang: ar
title: "المحاضرة 8: التمرين القصير والحل الرسمي"
---

# التمارين القصيرة للمحاضرة 8

المصادر الأصلية الدقيقة:

- نص السؤال على صفحة المحاضرة: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-8-functions-as-objects/
- صفحة الحل الرسمي: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex08_sol_pdf/
- ملف السؤال والحل الرسمي: https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex08_sol.pdf

المؤلفة والمحاضِرة: **آنا بيل (Ana Bell)**؛ **MIT OpenCourseWare**، مقرر [6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022 (Fall 2022)](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/). هذا تكييف عربي غير رسمي وغير تجاري، لا يحظى بتأييد MIT ولا يمثل اعتمادًا منه. الأصل والترجمة تحت [CC BY-NC-SA 4.0: النسبة–غير تجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، وتُنشر التكييفات بالشروط نفسها. شروط الاستشهاد والاستخدام: https://ocw.mit.edu/terms/.

موعد تسليم السؤال أدناه في الأصل: **الأربعاء 5 أكتوبر 2022، الساعة 03:00:00 مساءً**. هذا موعد تاريخي للمقرر الأصلي، لا موعد جديد لهذه الترجمة.

## 1) السؤال 1 من 1

نفّذ الدالة التي تحقق المواصفات أدناه.

`s1` و`s2` سلسلتان نصيتان (Strings). تُعيد الدالة القيمة المنطقية (Boolean) `True` إذا كان كل محرف (Character) في `s1` موجودًا أيضًا في `s2`، والعكس صحيح. إذا كان محرف موجودًا في واحدة فقط من `s1` أو `s2`، تُعيد `False`.

كتلة البداية التالية من صفحة المحاضرة، بما في ذلك التعليقات وسلسلة التوثيق الإنجليزية، دون ترجمة داخل Python:

```python
def same_chars(s1, s2):
    """
    s1 and s2 are strings
    Returns boolean True is a character in s1 is also in s2, and vice 
    versa. If a character only exists in one of s1 or s2, returns False.
    """
    # Your code here

# Examples:
print(same_chars("abc", "cab"))     # prints True
print(same_chars("abccc", "caaab")) # prints True
print(same_chars("abcd", "cabaa"))  # prints False
print(same_chars("abcabc", "cabz")) # prints False
```

الأمثلة: المثال الأول يطبع `True`، والثاني `True`، والثالث `False`، والرابع `False`.

حقل الإجابة في نسخة السؤال الأصلية يعرض السطر 1:

```python
# your function here
```

رسالة المنصة الأصلية: **ما زال لديك عدد غير محدود من محاولات التسليم**.

## الحل الرسمي الكامل

«إليك الحل الذي كتبناه»، كما ورد في ملف الحل الرسمي. حُفظت الشيفرة الإنجليزية؛ المسافات البادئة هنا تمثل مستويات Python الظاهرة في PDF، ولا تُعامل مسافات تموضع النص في الصفحة على أنها جزء من الشيفرة.

```python
def same_chars(s1, s2):
    for i in s1:
        if i not in s2:
            return False
    for i in s2:
        if i not in s1:
            return False
    return True
```

## تذييل المصدر

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python. خريف 2022.

لمعلومات الاستشهاد بهذه المواد أو شروط استخدامها، زر https://ocw.mit.edu/terms.
