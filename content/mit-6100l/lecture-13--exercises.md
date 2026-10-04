---
book: mit-6100l
chapter: lecture-13
slug: exercises
lang: ar
title: "المحاضرة 13: تمرين أطوال السلاسل النصية وحله"
---

# تمارين التطبيق القصيرة — المحاضرة 13

## المصادر والنسبة والترخيص

المصادر الأصلية الدقيقة: [صفحة المحاضرة ونص التمرين](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-13-exceptions-assertions/)، [صفحة التمارين](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/finger-exercises/)، [صفحة الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex13_sol_pdf/)، [ملف الحل الأصلي PDF](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex13_sol.pdf).

المادة الأصلية: **Ana Bell (آنا بيل)، MIT OpenCourseWare، Massachusetts Institute of Technology**، [6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022 (Fall 2022)](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/)، برخصة [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). هذه ترجمة وتكييف عربي **غير رسمي وغير تجاري**، لا تأييد ولا اعتماد له من MIT؛ تُشارك الترجمة بالمثل بالرخصة نفسها مع النسبة. لا صور مستبعدة من البيان هنا.

## الصفحة 1 — السؤال 1 من 1

الموعد النهائي للأسئلة أدناه: **الأربعاء 26 أكتوبر 2022، الساعة 03:00:00 مساءً**. هذا موعد تاريخي كما في المصدر، وليس تكليفًا حاليًا.

نفّذ الدالة التي تحقق المواصفات الآتية:

- `L` قائمة غير فارغة (Non-empty list) تتكون من أحد النوعين: عناصر سلسلة نصية (String)، أو قائمة فرعية غير فارغة من عناصر سلسلة نصية.
- تُعيد مجموع أطوال جميع السلاسل النصية في `L` وأطوال السلاسل النصية في القوائم الفرعية لـ`L`.
- إذا احتوت `L` عنصرًا ليس سلسلة نصية ولا قائمة، أو احتوت قوائم `L` الفرعية عنصرًا ليس سلسلة نصية، فأثِر استثناء خطأ القيمة (`ValueError`).

الشفرة التالية محفوظة حرفيًا من نص التمرين في صفحة المحاضرة، بما في ذلك النص الإنجليزي داخل سلسلة التوثيق (Docstring) والتعليقات:

```python
def sum_str_lengths(L):
    """
    L is a non-empty list containing either: 
    * string elements or 
    * a non-empty sublist of string elements
    Returns the sum of the length of all strings in L and 
    lengths of strings in the sublists of L. If L contains an 
    element that is not a string or a list, or L's sublists 
    contain an element that is not a string, raise a ValueError.
    """
    # Your code here  

# Examples:
print(sum_str_lengths(["abcd", ["e", "fg"]]))  # prints 7
print(sum_str_lengths([12, ["e", "fg"]]))      # raises ValueError
print(sum_str_lengths(["abcd", [3, "fg"]]))    # raises ValueError
```

ترجمة التعليقات: «شفرتك هنا». الأمثلة: الأول يطبع `7`، والثاني يثير `ValueError` لوجود `12`، والثالث يثير `ValueError` لوجود `3` داخل القائمة الفرعية.

يعرض حقل الإجابة في PDF السطر الآتي؛ ترجمة التعليق: «دالتك هنا»:

```python
# your function here
```

**بقي لديك عدد غير محدود من محاولات التسليم.** هذه عبارة واجهة التسليم في الأصل.

## الصفحة 2 — هذا هو الحل الذي كتبناه

الحل الرسمي كاملًا، دون تغيير أسماء المتغيرات أو الاختبارات أو الاستثناءات. استُعيدت إزاحات الأسطر من تخطيط PDF؛ لأن المسافات في استخراج النص ليست ملف Python أصليًا، لا يُدّعى التطابق البايتّي مع PDF نفسه.

```python
def sum_str_lengths(L):
    total = 0
    for i in L:
        if type(i) == str:
            total += len(i)
        elif type(i) == list:
            for e in i:
                if type(e) == str:
                    total += len(e)
                else:
                    raise ValueError
        else:
            raise ValueError
    return total
```

## الصفحة 3 — بيانات النشر الأصلية

MIT OpenCourseWare — <https://ocw.mit.edu>

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python. خريف 2022.

للمعلومات حول الاستشهاد بهذه المواد أو شروط الاستخدام، زُر: <https://ocw.mit.edu/terms>.
