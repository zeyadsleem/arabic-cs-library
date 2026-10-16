---
title: "المزيد من ميزات Python"
lang: ar
source: "https://programming-26.mooc.fi/part-7/6-more-features"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون ملمًّا ببعض ميزات Python الإضافية


وختامًا لهذه الدورة، ستجد هنا ميزات مختلفة مفيدة في Python.

## الجمل الشرطية ذات السطر الواحد

تُنتج العبارتان التاليتان النتيجتين نفسهما تمامًا:

```python
if x%2 == 0:
    print("even")
else:
    print("odd")
```

```python
print("even" if x%2 == 0 else "odd")
```

في المثال الأخير لدينا تعبير شرطي في سطر واحد: `a if [condition] else b`. وتُقدَّر قيمة هذا التعبير بـ`a` إذا كان الشرط صحيحًا، وبـ`b` إذا كان خاطئًا. ويُشار إلى هذه البنية أحيانًا بـ_المعامل الثلاثي_ (ternary operator).

يمكن أن تكون التعبيرات الشرطية مفيدة جدًا حين تحتاج إلى إسناد شيء ما _بشكل شرطي_. فمثلًا، لو كانت لديك المتغيّرات `x` و`y`، وأردت إما زيادة قيمة `y` وإما تعيينها بناءً على زوجية `x`، فيمكنك كتابة ذلك في جملة `if else` عادية هكذا:

```python
if x%2 == 0:
    y += 1
else:
    y = 0
```

ويمكن تحقيق الأمر نفسه بسطر واحد أنيق:

```python
y = y + 1 if x%2 == 0 else 0
```

## كتلة «فارغة»

قد تذكر من الجزء السابق أنه لا يُسمح بوجود كتلة فارغة في برنامج Python. وإذا احتجت إلى كتلة شيفرة لا تفعل شيئًا، مثلًا عند اختبار وظيفة أخرى، فإن الأمر `pass` يتيح لك ذلك. فيمكنك مثلًا كتابة دالة لا تفعل شيئًا:

```python
def testing():
    pass
```

سترجع هذه الدالة ببساطة على الفور. وترك الأمر `pass` خارجًا، أي وجود كتلة فارغة تمامًا، سيُنتج خطأً.

```python
def testing():  # this causes an error!
```

## الحلقات مع كتل else

في Python يمكن أن تحتوي الحلقات على كتل `else` أيضًا. ويُنفَّذ هذا القسم من الشيفرة إذا انتهت الحلقة انتهاءً طبيعيًا.

فمثلًا، في المثال التالي نتصفّح قائمة أعداد. فإذا وُجد عدد زوجي في القائمة، يطبع البرنامج رسالة وتُقطع الحلقة. وإذا لم توجد أعداد زوجية، تنتهي الحلقة انتهاءً طبيعيًا، لكن تُطبع عندئذٍ رسالة مختلفة.

```python
my_list = [3,5,2,8,1]
for x in my_list:
    if x%2 == 0:
        print("found an even number", x)
        break
else:
    print("there were no even numbers")
```

الطريقة الأكثر تقليدية لتحقيق ذلك هي استخدام متغيّر مساعد لتذكّر ما إذا كان العنصر المطلوب قد وُجد:

```python
my_list = [3,5,2,8,1]
found = False
for x in my_list:
    if x%2 == 0:
        print("found an even number", x)
        found = True
        break
if not found:
    print("there were no even numbers")
```

واستخدام جملة `for else` يوفّر علينا عناء كتابة متغيّر منفصل.

## القيمة الافتراضية للمعامل

يمكن أن يكون لدالة Python قيمة افتراضية للمعامل. وتُستخدم كلما لم يُمرَّر أي وسيط إلى الدالة. انظر المثال التالي:

```python
def say_hello(name="Emily"):
    print("Hi there,", name)

say_hello()
say_hello("Eric")
say_hello("Matthew")
say_hello("")
```


```
Hi there, Emily
Hi there, Eric
Hi there, Matthew
Hi there,
```


ملاحظة: السلسلة النصية الفارغة تبقى سلسلة نصية، لذا لا تُستخدم القيمة الافتراضية للمعامل إذا مُرِّرت سلسلة نصية فارغة إلى الدالة.

## عدد متغيّر من المعاملات

يمكنك أيضًا تعريف دالة بعدد متغيّر من المعاملات، بإضافة نجمة قبل اسم المعامل. وتُحتوى كل الوسائط المتبقية المُمرَّرة إلى الدالة في صف (tuple)، ويمكن الوصول إليها عبر المعامل المسمّى.

تحسب الدالة التالية عدد وسائطها ومجموعها:

```python
def testing(*my_args):
    print("You passed", len(my_args), "arguments")
    print("The sum of the arguments is", sum(my_args))

testing(1, 2, 3, 4, 5)
```


```
You passed 5 arguments
The sum of the arguments is 15
```


> **تمرين برمجي: لغتك البرمجية الخاصة**
>
> ستكتب في هذا التمرين منفّذًا للغة برمجة خاصتك. ويمكنك استخدام أي تقنيات ومهارات تعلّمتها في هذه الدورة حتى الآن.

ستتكوّن البرامج من أسطر، وسيكون كل سطر بأحد الصيغ التالية:

* `PRINT [value]`: يطبع القيمة
* `MOV [variable] [value]`: يُسند القيمة إلى المتغيّر
* `ADD [variable] [value]`: يضيف القيمة إلى المتغيّر
* `SUB [variable] [value]`: يطرح القيمة من المتغيّر
* `MUL [variable] [value]`: يضرب المتغيّر في القيمة
* `[location]:`: يسمّي سطر شيفرة، بحيث يمكن القفز إليه من مكان آخر
* `JUMP [location]`: يقفز إلى الموقع المحدّد
* `IF [condition] JUMP [location]`: إذا كان الشرط صحيحًا، يقفز إلى الموقع المحدّد
* `END`: يُنهي التنفيذ

الأقواس المربّعة أعلاه ليست إلا علامة للدلالة على المعاملات؛ انظر أدناه أمثلة على الاستخدام.

يُنفَّذ البرنامج سطرًا بسطر ابتداءً من السطر الأول. وينتهي التنفيذ عندما يصادف المنفّذ الأمر `END`، أو عندما لا يتبقّى أسطر لتنفيذها.

لكل برنامج 26 متغيّرًا معرّفًا مسبقًا، مسمّاة من `A` إلى `Z`. ولكل متغيّر القيمة 0 عند بدء البرنامج. وتشير العلامة `[variable]` إلى أحد هذه المتغيّرات الـ26.

كل القيم التي يعالجها البرنامج أعداد صحيحة. وتشير العلامة `[value]` إما إلى قيمة مخزّنة في متغيّر، وإما إلى عدد صحيح مكتوب مباشرةً.

تشير العلامة `[location]` إلى أي اسم لموقع يتكوّن من الأحرف الصغيرة من `a` إلى `z` و/أو الأرقام من `0` إلى `9`. ولا يجوز أن يكون لموقعين مختلفين الاسم نفسه.

تشير العلامة `[condition]` إلى أي تعبير بالصيغة `[value] [comparison] [value]`، حيث `[comparison]` أحد المشغّلات التالية: `==` و`!=` و`<` و`<=` و`>` و`>=`.

يُرجى كتابة دالة اسمها `run(program)` تأخذ قائمة تحتوي على أوامر البرنامج كوسيط لها. وكل عنصر في القائمة سطر شيفرة في البرنامج. وينبغي أن تُعيد الدالة قائمة جديدة تحتوي على نتائج أوامر `PRINT` المنفَّذة خلال تشغيل البرنامج.

ويمكنك أن تفترض أن الدالة لن تُعطى إلا برامج بصيغة صحيحة تمامًا. ولست مضطرًا إلى تنفيذ أي تحقّق من صحة المُدخلات أو معالجة أخطاء.

يستحق هذا التمرين نقطتين. وستحصل على نقطة واحدة إذا عملت الأوامر `PRINT` و`MOV` و`ADD` و`SUB` و`MUL` و`END` بشكل صحيح. وستحصل على نقطة أخرى إذا عملت بقية الأوامر، التي تُستخدم لتنفيذ الحلقات، بشكل صحيح أيضًا.

فيما يلي بعض الأمثلة، ويمكنك استخدامها للاختبار أيضًا. المثال 1:

```python
program1 = []
program1.append("MOV A 1")
program1.append("MOV B 2")
program1.append("PRINT A")
program1.append("PRINT B")
program1.append("ADD A B")
program1.append("PRINT A")
program1.append("END")
result = run(program1)
print(result)
```


```
[1, 2, 3]
```


المثال 2:

```python
program2 = []
program2.append("MOV A 1")
program2.append("MOV B 10")
program2.append("begin:")
program2.append("IF A >= B JUMP quit")
program2.append("PRINT A")
program2.append("PRINT B")
program2.append("ADD A 1")
program2.append("SUB B 1")
program2.append("JUMP begin")
program2.append("quit:")
program2.append("END")
result = run(program2)
print(result)
```


```
[1, 10, 2, 9, 3, 8, 4, 7, 5, 6]
```


المثال 3 (المضروب):

```python
program3 = []
program3.append("MOV A 1")
program3.append("MOV B 1")
program3.append("begin:")
program3.append("PRINT A")
program3.append("ADD B 1")
program3.append("MUL A B")
program3.append("IF B <= 10 JUMP begin")
program3.append("END")
result = run(program3)
print(result)
```


```
[1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
```


المثال 4 (الأعداد الأولية):

```python
program4 = []
program4.append("MOV N 50")
program4.append("PRINT 2")
program4.append("MOV A 3")
program4.append("begin:")
program4.append("MOV B 2")
program4.append("MOV Z 0")
program4.append("test:")
program4.append("MOV C B")
program4.append("new:")
program4.append("IF C == A JUMP error")
program4.append("IF C > A JUMP over")
program4.append("ADD C B")
program4.append("JUMP new")
program4.append("error:")
program4.append("MOV Z 1")
program4.append("JUMP over2")
program4.append("over:")
program4.append("ADD B 1")
program4.append("IF B < A JUMP test")
program4.append("over2:")
program4.append("IF Z == 1 JUMP over3")
program4.append("PRINT A")
program4.append("over3:")
program4.append("ADD A 1")
program4.append("IF A <= N JUMP begin")
result = run(program4)
print(result)
```


```
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```


يُرجى الإجابة عن استبيان تقييم الدورة. وتساعدنا نتائج الاستبيان على تحسين الدورة.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 8675c2f0-2d0d-54b2-9ce2-7ba7692e95f0)
