---
book: mit-6100l
chapter: lecture-02
slug: exercises
lang: ar
title: "المحاضرة ٢: تمرين الأصابع وحلّه الرسمي"
---

# المحاضرة ٢: تمرين الأصابع وحلّه الرسمي

المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون**، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميين بموجب [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعنيان اعتماد MIT أو تأييده. لا تُعاد طباعة صور الأطراف الثالثة المستثناة أو ملفات PDF؛ يرد المحتوى نصيًا. [شروط الاستخدام والإسناد](https://ocw.mit.edu/terms/).

المصادر الدقيقة: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-2-strings-inputoutput-branching/)، [صفحة مورد الحل](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex02_sol_pdf/)، [PDF الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex02_sol.pdf).

## صفحة المصدر 1: تمارين الأصابع للمحاضرة ٢

موعد تسليم الأسئلة أدناه: الأربعاء 14 سبتمبر 2022، الساعة 03:00:00 مساءً. هذا موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.

### 1) السؤال 1 من 1

افترض أنك أُعطيت متغيرًا (variable) اسمه `number` وله قيمة عددية (numerical value). اكتب قطعة من شفرة بايثون تطبع إحدى السلاسل النصية (strings) الآتية:

- `positive` إذا كان المتغير `number` موجبًا.
- `negative` إذا كان المتغير `number` سالبًا.
- `zero` إذا كان المتغير `number` يساوي صفرًا.

محرر الإجابة في الأصل، السطر 1:

```python
# Write your code here
```

تبقّى لك عدد لا نهائي من مرات التسليم.

هذا هو الحل الذي كتبناه:

```python
if number > 0:
    print('positive')
elif number < 0:
    print('negative')
else:
    print('zero')
```

ملاحظة تحريرية: لا يوجد ملف شفرة مستقل لهذا الحل في ارتباطات المحاضرة. نُسخت الشفرة من PDF مع الحفاظ على التعليق وأسماء المتغيرات وعلامات الاقتباس والمسافة البادئة الظاهرة. لا يملك PDF تسلسل بايتات لملف Python يمكن ادعاء مطابقته؛ أما ملف شفرة المحاضرة المستقل فيرد في [الملاحظات](/book/mit-6100l/lecture-02/notes) للتحقق البايتي.

## صفحة المصدر 2: الإسناد

MIT OpenCourseWare — https://ocw.mit.edu

6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.

خريف 2022.

للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms
