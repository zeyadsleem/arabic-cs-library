---
title: "الحلقات البسيطة"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف ما معنى الحلقة في البرمجة
> - ستتمكّن من استخدام حلقة `while True` في برامجك
> - ستعرف كيف تستخدم الأمر `break` للخروج من حلقة


لقد غطّينا الآن البنى الشرطية بتفصيل. وهناك تقنية أساسية أخرى في البرمجة وهي _التكرار_ (_iteration_). وهما معًا يشكّلان بنى التحكّم الأساسية التي يجب على كل مبرمج إتقانها. وتُسمّيان بنى التحكّم لأنهما يسمحان لك أساسًا بالتحكّم في أي سطور من الشيفرة ستُنفَّذ ومتى. فبينما تتيح لك البنى الشرطية _الاختيار بين_ أجزاء من الشيفرة، تتيح لك بنى التكرار _تكرار_ أجزاء من الشيفرة. وكثيرًا ما تُسمّى _حلقات_ (_loops_)، لأنها تتيح للبرنامج أن "يلتف" إلى سطر سبق أن نُفِّذ. وتُسمّى عملية تنفيذ تكرار واحد من الحلقة أيضًا تكرارًا (_iteration_) للحلقة.

يُقدّم هذا القسم حلقة `while` بسيطة. بنيتها مشابهة للجمل الشرطية التي غطّيناها من قبل. وفي الجزء التالي سنغوص في بعض الأمثلة الأكثر تقدّمًا.

لننظر إلى برنامج يطلب من المستخدم إدخال عدد ثم يطبع مربّع هذا العدد. ويستمر ذلك حتى يكتب المستخدم -1.

```python
while True:
    number = int(input("Please type in a number, -1 to quit: "))

    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

قد يبدو تشغيل البرنامج على النحو التالي:


```
Please type in a number, -1 to quit: **2**
4
Please type in a number, -1 to quit: **4**
16
Please type in a number, -1 to quit: **10**
100
Please type in a number, -1 to quit: **-1**
Thanks and bye!
```


وكما ترى أعلاه، يطلب البرنامج عدة أعداد بفضل جملة `while` الموجودة فيه. وعندما يكتب المستخدم -1، يُنفَّذ الأمر `break`، الذي يخرج من الحلقة ويستأنف التنفيذ من أول سطر بعد كتلة `while`.

وفي الحلقات، من الضروري دائمًا أن تتوفّر طريقة للخروج من الحلقة عند نقطة ما في الشيفرة، وإلا فقد يستمر التكرار إلى ما لا نهاية. ولتوضيح ذلك، لنغيّر قليلًا المثال أعلاه:

```python
number = int(input("Please type in a number, -1 to quit: "))
while True:
    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

في هذه النسخة يطلب البرنامج من المستخدم كتابة عدد _خارج الحلقة_. وإذا كتب المستخدم أي عدد آخر غير -1، فلا يُخرَج من الحلقة أبدًا. وهذا يشكّل _حلقة لا نهائية_ (_infinite loop_)، أي أن كتلة الشيفرة داخل الحلقة تتكرّر بلا نهاية:


```
Please type in a number, -1 to quit: **2**
4
4
4
4
4
4
4
4
(continued ad infinitum...)
```


والبرنامج التالي له بنية مشابهة للمثال السابق على الحلقة اللانهائية، لكن تجربة المستخدم مختلفة كثيرًا. إذ يتيح هذا البرنامج للمستخدم المتابعة فقط إذا كتب الرمز السري الصحيح _1234_:

```python
while True:
    code = input("Please type in your PIN: ")
    if code == "1234":
        break
    print("Incorrect...try again")

print("Correct PIN entered!")
```


```
Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!
```


> **تمرين تفاعلي: هل نواصل؟**
>
> لننشئ برنامجًا على غرار المثال أعلاه. ينبغي أن يطبع هذا البرنامج الرسالة "hi" ثم أن يسأل "Shall we continue?" حتى يُدخل المستخدم كلمة "no". ثم ينبغي للبرنامج أن يطبع "okay then" وينتهي. يُرجى الاطلاع على المثال أدناه.


```
hi
Shall we continue? **yes**
hi
Shall we continue? **oui**
hi
Shall we continue? **jawohl**
hi
Shall we continue? **no**
okay then
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: التحقّق من صحّة المُدخَل**
>
> يُرجى كتابة برنامج يطلب من المستخدم أعدادًا صحيحة.

وإذا كان العدد أقل من صفر، فينبغي للبرنامج أن يطبع الرسالة "Invalid number".

وإذا كان العدد أكبر من صفر، فينبغي للبرنامج أن يطبع الجذر التربيعي للعدد باستخدام دالة `sqrt` في Python.

وفي الحالتين، ينبغي للبرنامج بعد ذلك أن يطلب عددًا آخر.

وإذا أدخل المستخدم العدد صفر، فينبغي للبرنامج أن يتوقّف عن طلب الأعداد وأن يخرج من الحلقة.

تجد أدناه تذكيرًا بكيفية استخدام دالة `sqrt`. ولا تنسَ أن تستوردها بـ`import` في بداية البرنامج.

```python
# sqrt function will not work without this line in the beginning of the program
from math import sqrt

print(sqrt(9))
```


```
3.0
```


مثال على السلوك المتوقَّع لبرنامجك:


```
Please type in a number: **16**
4.0
Please type in a number: **4**
2.0
Please type in a number: **-3**
Invalid number
Please type in a number: **1**
1.0
Please type in a number: **0**
Exiting...
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: إصلاح الشيفرة: العدّ التنازلي**
>
> ينبغي أن يطبع هذا برنامج تنازليًا. والشيفرة على النحو التالي:

```python
number = 5
print("Countdown!")
while True:
  print(number)
  number = number - 1
  if number > 0:
    break

print("Now!")
```

وينبغي أن يطبع هذا


```
Countdown!
5
4
3
2
1
Now!
```


لكن البرنامج لا يعمل تمامًا كما ينبغي. يُرجى إصلاحه.
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: تكرار كلمة المرور**
>
> يُرجى كتابة برنامج يطلب من المستخدم كلمة مرور. ثم ينبغي للبرنامج أن يطلب من المستخدم كتابة كلمة المرور مرة أخرى. وإذا كتب المستخدم شيئًا غير كلمة المرور الأولى، فينبغي للبرنامج أن يواصل الطلب حتى يكتب المستخدم كلمة المرور الأولى مرة أخرى بشكل صحيح.

اطّلع على السلوك المتوقَّع أدناه:


```
Password: **sekred**
Repeat password: **secret**
They do not match!
Repeat password: **cantremember**
They do not match!
Repeat password: **sekred**
User account created!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


## الحلقات والمتغيّرات المساعدة

لنجعل مثال التحقّق من الرمز السري أكثر واقعية قليلًا. فهذه النسخة تتيح للمستخدم ثلاث محاولات فقط لكتابة الرمز السري.

يستخدم البرنامج متغيّرَي مساعدَين. فالمتغيّر `attempts` يتتبّع عدد المرات التي كتب فيها المستخدم رمزًا سريًا. والمتغيّر `success` يُعيَّن على `True` أو `False` بناءً على ما إذا كان المستخدم قد نجح في تسجيل الدخول.

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if code == "1234":
        success = True
        break

    if attempts == 3:
        success = False
        break

    # this is printed if the code was incorrect AND there have been less than three attempts
    print("Incorrect...try again")

if success:
    print("Correct PIN entered!")
else:
    print("Too many attempts...")
```


```
Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!
```



```
Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **4321**
Too many attempts...
```


تُخرَج الحلقة _إما_ عندما يكتب المستخدم الرمز السري الصحيح _أو_ عندما تكون المحاولات قد تجاوزت الحد. وتتحقّق جملة `if` التالية للحلقة من قيمة المتغيّر `success` وتطبع رسالة وفق ذلك.

## تنقيح عبارات الطباعة داخل الحلقات

إن إضافة الحلقات إلى البرامج تضيف أيضًا مصادر محتملة للأخطاء. فيصبح إتقان استخدام عبارات الطباعة للتنقيح، كما عُرِّفت في [القسم الأول من هذا الجزء](/part-2/1-programming-terminology)، أكثر أهمية.

لننظر إلى برنامج يكاد يكون مطابقًا للمثال السابق، مع فارق وحيد مهم:

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1

    if attempts == 3:
        success = False
        break

    if code == "1234":
        success = True
        break

    print("Incorrect...try again")

if success:
    print("Correct PIN entered!")
else:
    print("Too many attempts...")
```

تتصرّف هذه النسخة على نحو غريب عندما يكتب المستخدم الرمز الصحيح في المحاولة الثالثة:


```
Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Too many attempts...
```


إذن، لنحاول أن نجد السبب بإضافة بعض عبارات الطباعة للتنقيح في مواقع مدروسة داخل الحلقة:

```python
while True:
    print("beginning of the while block:")
    code = input("Please type in your PIN: ")
    attempts += 1

    print("attempts:", attempts)
    print("condition1:", attempts == 3)
    if attempts == 3:
        success = False
        break

    print("code:", code)
    print("condition2:", code == "1234")
    if code == "1234":
        success = True
        break

    print("Incorrect...try again")
```


```
beginning of the while block:
Please type in your PIN: **2233**
attempts: 1
condition1: False
code: 2233
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **4545**
attempts: 2
condition1: False
code: 4545
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **1234**
attempts: 3
condition1: True
Too many attempts...
```


ومن المخرجات أعلاه نرى أن شرط جملة `if` الأولى يكون `True` أثناء التكرار الثالث للحلقة، فتُنهى الحلقة. ولا يصل هذا التكرار أبدًا إلى جملة `if` الثانية، التي تتحقّق مما إذا كانت الشيفرة قد كُتبت بشكل صحيح:

```python
  while True:
    # ....

    # this block is executed too early
    if attempts == 3:
        success = False
        break

    # the third iteration never gets this far
    if code == "1234":
        success = True
        break
```

إنّ ترتيب الجمل الشرطية، أو ترتيب الفروع المختلفة داخل جملة شرطية، سبب شائع للأخطاء، خاصةً في الحلقات. وعبارات الطباعة للتنقيح هي غالبًا أبسط طريقة للعثور على سببها.

> **تمرين تفاعلي: الرمز السري وعدد المحاولات**
>
> يُرجى كتابة برنامج يواصل سؤال المستخدم عن رمز سري حتى يكتب الرمز الصحيح، وهو _4321_. وينبغي للبرنامج بعد ذلك أن يطبع عدد المرات التي جرّب فيها المستخدم رموزًا مختلفة.


```
PIN: **3245**
Wrong
PIN: **1234**
Wrong
PIN: **0000**
Wrong
PIN: **4321**
Correct! It took you 4 attempts
```


وإذا أصاب المستخدم في المحاولة الأولى، فينبغي للبرنامج أن يطبع شيئًا مختلفًا قليلًا:


```
PIN: **4321**
Correct! It only took you one single attempt!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*



> **تمرين تفاعلي: السنة الكبيسة التالية**
>
> يُرجى كتابة برنامج يطلب من المستخدم سنة، ثم يطبع السنة الكبيسة التالية.


```
Year: **2023**
The next leap year after 2023 is 2024
```


وإذا أدخل المستخدم سنة كبيسة (مثل 2024)، فينبغي للبرنامج أن يطبع السنة الكبيسة التالية:


```
Year: **2024**
The next leap year after 2024 is 2028
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


## دمج السلاسل النصية بالمشغّل +

استخدم مثال التحقّق من الرمز السري أعلاه متغيّرًا مساعدًا هو `attempts` لتتبّع عدد المرات التي حاول فيها المستخدم كتابة شيفرة:

```python
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1
    # ...
```

يُعيَّن هذا المتغيّر على صفر خارج الحلقة، ويزيد كل تكرار قيمته بمقدار واحد.

وتنطبق فكرة الزيادة المشابهة على متغيّرات السلاسل النصية أيضًا. فمثلًا يمكن للبرنامج أن يتتبّع جميع الرموز السرّية التي كتبها المستخدم:

```python

codes = ""
attempts = 0

while True:
    code = input("Please type in your PIN: ")
    attempts += 1
    codes += code + ", "
    # ...
```

يُهيَّأ المتغيّر المساعد على _سلسلة نصية فارغة_، أي سلسلة نصية لا تحوي أي محارف:

```python
codes = ""
```

ومع كل تكرار تصير السلسلة النصية أطول، إذ تُضاف الشيفرة التي كتبها المستخدم مع فاصلة:

```python
    code = input("Please type in your PIN: ")
    codes += code + ", "
```

وإذا كتب المستخدم الرموز _1111 2222 1234_، فإن قيمة `codes` في نهاية تنفيذ البرنامج ستكون


```
1111, 2222, 1234,
```



> **تمرين تفاعلي: القصّة**
>
> ### الجزء 1

يُرجى كتابة برنامج يواصل سؤال المستخدم عن كلمات. وإذا كتب المستخدم `end`، فينبغي للبرنامج أن يطبع القصّة التي شكّلتها الكلمات، ثم ينتهي.


```
Please type in a word: **Once**
Please type in a word: **upon**
Please type in a word: **a**
Please type in a word: **time**
Please type in a word: **there**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **girl**
Please type in a word: **end**
Once upon a time there was a girl
```


### الجزء 2

غيّر البرنامج بحيث تنتهي الحلقة أيضًا إذا كتب المستخدم الكلمة نفسها مرتين متتاليتين.


```
Please type in a word: **It**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **dark**
Please type in a word: **and**
Please type in a word: **stormy**
Please type in a word: **night**
Please type in a word: **night**
It was a dark and stormy night
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: العمل مع الأعداد**
>
> ### ما قبل التمرين

يُرجى كتابة برنامج يطلب من المستخدم أعدادًا صحيحة. وينبغي للبرنامج أن يواصل طلب الأعداد حتى يكتب المستخدم صفرًا.


```
Please type in integer numbers. Type in 0 to finish.
Number: **5**
Number: **22**
Number: **9**
Number: **-2**
Number: **0**
```


### الجزء 1: العدّ

بعد قراءة الأعداد، ينبغي للبرنامج أن يطبع عدد الأعداد التي كُتبت. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذا العدد.

وستحتاج هنا إلى متغيّر جديد يتتبّع الأعداد المكتوبة.


```
... the program asks for numbers
Numbers typed in 4
```


### الجزء 2: المجموع

ينبغي للبرنامج أيضًا أن يطبع مجموع جميع الأعداد التي كُتبت. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذه العملية الحسابية.

وينبغي للبرنامج الآن أن يطبع ما يلي:


```
... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
```


### الجزء 3: المعدّل

ينبغي للبرنامج أيضًا أن يطبع معدّل الأعداد. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذه العملية الحسابية. ويمكنك افتراض أن المستخدم سيكتب دائمًا عددًا صحيحًا صالحًا واحدًا على الأقل لا يساوي صفرًا.


```
... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5
```


#### الجزء 4: الموجب والسالب

ينبغي للبرنامج أيضًا أن يطبع إحصاءات عن كم من الأعداد كانت موجبة وكم منها كانت سالبة. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذه العملية الحسابية.


```
... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5
Positive numbers 3
Negative numbers 1
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 63a51999-e525-5f1d-a333-b26392a5585b)


-->

يُرجى الإجابة على استبيان سريع حول مواد هذا الأسبوع.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 21a09240-92d7-5eb0-bae0-a5f89b5045c2)
