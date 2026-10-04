---
book: mit-6100l
chapter: lecture-04
slug: exercises
lang: ar
title: "المحاضرة ٤: تمرين الأصابع وحلّه الرسمي"
---

# المحاضرة ٤: تمرين الأصابع وحلّه الرسمي

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. لا تُعاد طباعة صور الأطراف الثالثة المستثناة أو ملفات PDF؛ يرد المحتوى نصيًا. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-4-loops-over-strings-guess-and-check-binary/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex04_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex04_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة ٤

موعد تسليم الأسئلة أدناه: الأربعاء 21 سبتمبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 1

افترض أنك أُعطيت متغيّرًا صحيحًا موجبًا اسمه `N`. اكتب قطعة من شيفرة بايثون تجد الجذر التكعيبي (cube root) لـ`N`. تطبع الشيفرة الجذر التكعيبي إذا كان `N` مكعّبًا كاملًا (perfect cube)، أو تطبع `error` إذا لم يكن كذلك.

تلميح: استخدم حلقة (loop) تزيد عدّادًا (counter) — وأنت تقرّر متى يتوقف العدّاد.

محرر الإجابة في الأصل، السطر 1:

```python
# Write your code here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
i = 1
while i**3 < N:
    i += 1
if i**3 == N:
    print(i)
else:
    print('error')
```

ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة والتعليق. ملف PDF لا يملك تسلسل بايتات لملف Python يمكن ادعاء مطابقته بايتًا ببايت.

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms
