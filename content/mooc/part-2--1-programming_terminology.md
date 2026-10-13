---
title: "مصطلحات البرمجة"
lang: ar
source: "https://programming-26.mooc.fi/part-2/1-programming-terminology"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be familiar with some essential terminology in programming
- You will know the difference between a statement and an expression
- You will be able to find out the data type of an evaluated expression
- You will have learnt to use debugging methods to find mistakes in your code

</text-box>

في الجزء الأول من هذه الدورة لم نولِ اهتماماً كبيراً للمصطلحات، لذا دعونا نلقي نظرة على بعض المفاهيم الأساسية في البرمجة.

## الجملة البرمجية (Statement)

الجملة البرمجية (statement) هي جزء من البرنامج ينفذ شيئاً ما. غالباً ما تشير، لكن ليس دائماً، إلى أمر واحد.

على سبيل المثال، `print("Hi!")` هي جملة تطبع سطراً من النص. وبالمثل، `number = 2` هي جملة تعين قيمة لمتغير (variable).

يمكن أن تكون الجملة أكثر تعقيداً أيضاً. يمكن أن تحتوي، على سبيل المثال، على جمل أخرى. الجملة التالية تمتد على ثلاثة أسطر:

```python
if name == "Anna":
    print("Hi!")
    number = 2
```

في الحالة أعلاه هناك جملتان (جملة طباعة وجملة تعيين) داخل جملة شرطية (conditional statement).

## الكتلة (Block)

الكتلة (block) هي مجموعة من الجمل المتتالية الموجودة في نفس المستوى في بنية البرنامج. على سبيل المثال، كتلة الجملة الشرطية تحتوي على تلك الجمل التي يتم تنفيذها فقط إذا كان الشرط صحيحاً.

```python
if age > 17:
    # beginning of the conditional block
    print("You are of age!")
    age = age + 1
    print("You are now one year older...")
    # end of the conditional block

print("This here belongs to another block")
```

في Python يتم التعبير عن الكتل عن طريق إزاحة (indenting) جميع الأكواد في الكتلة بنفس مقدار الفراغات.

ملاحظة: الكتلة الرئيسية لبرنامج Python يجب أن تكون دائماً في الحافة اليسرى للملف، بدون إزاحة:

```python
# this program will not work because it is not written at the leftmost egde ...
