---
book: mit-6100l
chapter: lecture-06
slug: exercises
lang: ar
title: "المحاضرة ٦: تمرين الأصابع وحلّه الرسمي"
---

# المحاضرة ٦: تمرين الأصابع وحلّه الرسمي

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. لا تُعاد طباعة صور الأطراف الثالثة المستثناة أو ملفات PDF؛ يرد المحتوى نصيًا. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-6-bisection-search/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex06_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex06_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة ٦

موعد تسليم الأسئلة أدناه: الأربعاء 28 سبتمبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 1

افترض أنك أُعطيت عددًا صحيحًا بحيث $0 \le N \le 1000$. اكتب قطعة من شيفرة بايثون تستخدم البحث بالتنصيف (bisection search) للتخمين على `N`. تطبع الشيفرة سطرين: `count:` مع عدد التخمينات التي استغرقها إيجاد `N`، و`answer:` مع قيمة `N`.

تلميحات: إذا كانت قيمة المنتصف (halfway value) تقع في المنتصف بالضبط بين عددين صحيحين، فاختر الأصغر.

محرر الإجابة في الأصل، السطر 1:

```python
# Write your code here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
low = 0
high = 1001
guess = (high+low)//2
count = 1
while guess != N:
    if guess < N:
        low = guess
    elif guess > N:
        high = guess
    guess = (high+low)//2
    count += 1

print("count:",count)
print("answer:",guess)
```

ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة والتعليق. ملف PDF لا يملك تسلسل بايتات لملف Python يمكن ادعاء مطابقته بايتًا ببايت.

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms
