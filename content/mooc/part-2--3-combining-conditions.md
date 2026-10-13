---
title: "دمج الشروط"
lang: ar
source: "https://programming-26.mooc.fi/part-2/3-combining-conditions"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know how to use the operators `and`, `or` and `not` in conditions
- You will be able to write nested conditionals

</text-box>

## العوامل المنطقية (Logical operators)

يمكنك دمج الشروط باستخدام العوامل المنطقية `and` و `or`. العامل `and` يحدد أن جميع الشروط المعطاة يجب أن تكون صحيحة في نفس الوقت. العامل `or` يحدد أن شرطاً واحداً على الأقل من الشروط المعطاة يجب أن يكون صحيحاً.

على سبيل المثال، الشرط `number >= 5 and number <= 8` يحدد أن `number` يجب أن يكون في نفس الوقت على الأقل 5 وعلى الأكثر 8. أي، يجب أن يكون بين 5 و 8.

```python
number = int(input("Please type in a number: "))
if number >= 5 and number <= 8:
    print("The number is between 5 and 8")
```

في حين أن الشرط `number < 5 or number > 8` يحدد أن `number` يجب أن يكون إما أقل من 5 أو أكبر من 8. أي، يجب ألا يكون ضمن النطاق من 5 إلى 8.

```python
number = int(input("Please type in a number: "))
if number < 5 or number > 8:
    print("The number is not within the range of 5 to 8")
```

جدول الحقيقة التالي يحتوي على سلوك هذه العوامل في مواقف مختلفة:

a     | b     | a and b | a or b |
:----:|:-----:|:-------:|:------:|
False | False | False   | False  |
True  | False | False   | True   |
False | True  | False   | True   |
True  | True  | True    | True   |

أحياناً من الضروري معرفة ما إذا كان شيئاً ما _ليس_ صحيحاً. العامل `not` ينفي الشرط:

a     | not a
:----:|:----:
True  | False
False | True

مثال استبعاد النطاق 5 إلى 8 أعلاه يمكن برمجته أيضاً بهذه الطريقة:

```python
number = int(input("Please type in a number: "))
if not (number >= 5 and number <= 8):
    print("The number is not within the range of 5 to 8")
```

خاصة في البرمجة، العوامل المنطقية غالباً ما تسمى _العوامل البوليانية (Boolean operators)_.

<text-box variant='hint' name="Simplified combined conditions">

الشرط `x >= a and x <= b` هو طريقة شائعة جداً للتحقق مما إذا كان الرقم `x` يقع ضمن نطاق `a` إلى `b`. تعبير بهذه البنية يعمل بنفس الطريقة في معظم لغات البرمجة.

Python تسمح أيضاً بتدوين مبسط لدمج الشروط: `a <= x <= b` يحقق نفس نتيجة الإصدار الأطول باستخدام `and`. هذا التدوين الأقصر قد يكون أكثر ألفة من الرياضيات، لكنه ليس مستخدماً على نطاق واسع في برمجة Python، ربما لأن القليل جداً من لغات البرمجة الأخرى لها اختصار مشابه.

</text-box>

## دمج وتسلسل الشروط

البرنامج التالي يطلب من المستخدم إدخال أربعة أرقام. ثم يحسب أي منها الأكبر، بمساعدة بعض الشروط:

```python
n1 = int(input("Number 1: "))
n2 = int(input("Number 2: "))
n3 = int(input("Number 3: "))
n4 = int(input("Number 4: "))

if n1 > n2 and n1 > n3 and n1 > n4:
    greatest = n1
elif n2 > n3 and n2 > n4:
    greatest = n2
elif n3 > n4:
    greatest = n3
else:
    greatest = n4

print(f" {greatest} is the greatest of the numbers.")
```

```
Number 1: **2**
Number 2: **4**
Number 3: **1**
Number 4: **1**
4 is the greatest of the numbers.
```

في المثال أعلاه الشرط الأول `n1 > n2 and n1 > n3 and n1 > n4` يكون صحيحاً فقط إذا كانت جميع الشروط الثلاثة داخله صحيحة.
