---
title: "جمل شرطية أكثر"
lang: ar
source: "https://programming-26.mooc.fi/part-2/2-else-elif"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to create multiple branches within conditional statements
- You will understand the purpose of `if`, `elif` and `else` statements within a conditional statement
- You will be able to use the modulo operation `%` in Boolean expressions

</text-box>

دعونا نلقي نظرة على برنامج يطلب من المستخدم إدخال رقم، ثم يطبع رسائل مختلفة بناءً على ما إذا كان الرقم سالباً، موجباً، أو مساوياً للصفر:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")

if number >= 0:
    print("The number is positive or zero")
```

هذا يبدو قليلاً ما ضخماً ومتكرراً. نحن نريد فقط تنفيذ أحد كتل `if`، لأن المدخل سيكون دائماً إما أقل من صفر، أو صفر أو أكبر. أي، إما أن `number < 0` أو `number >= 0` صحيحة، لكن لا يمكن أن تكونا صحيحتين في نفس الوقت. لذا، الجملة الشرطية الأولى تحتوي في الواقع على كل ما نحتاجه هنا. إذا كانت صحيحة، فالرقم سالب. إذا كانت خاطئة، فالرقم يساوي صفراً أو موجب.

بدلاً من إنشاء جملة شرطية كاملة أخرى، كما في المثال أعلاه، من الممكن إنشاء فرع آخر من نفس الجملة الشرطية لتغطية جميع الحالات _التي يكون فيها الشرط خاطئاً_. هذا يسمى جملة `else`.

إعادة كتابة المثال السابق:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")
else:
    print("The number is positive or zero")
```

عند استخدام بناء if-else، سيتم تنفيذ أحد الفرعين دائماً وبشكل دقيق. الصورة التالية توضح البنية:

<img src="2_2_1.png">

ملاحظة: لا يمكن أبداً أن يكون هناك فرع else بدون فرع if قبله. بناء if-else ككل يشكل جملة شرطية (conditional statement) واحدة.

المثال التالي يتحقق ما...
