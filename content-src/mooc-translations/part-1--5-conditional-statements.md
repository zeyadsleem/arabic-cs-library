---
title: "الجمل الشرطية"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون قادرًا على استخدام جملة شرطية بسيطة في البرمجة
> - ستعرف ما هي قيمة منطقية (Boolean value)
> - ستكون قادرًا على التعبير عن الشروط بمشغّلات المقارنة


حتى الآن، نُفِّذ كل برنامج كتبناه سطرًا بسطر بالترتيب. وبدلًا من تنفيذ كل سطر من الشيفرة في كل مرة يُشغَّل فيها البرنامج، من المفيد غالبًا إنشاء أجزاء من البرنامج لا تُنفَّذ إلا في ظروف معيّنة.

فمثلًا، تتحقّق الشيفرة التالية ممّا إذا كان المستخدم في سن الرشد:

```python
age = int(input("How old are you? "))

if age > 17:
    print("You are of age!")
    print("Here's a copy of GTA6 for you.")

print("Next customer, please!")
```

وحين يتجاوز المستخدم سنّ 17، ينبغي أن يبدو تنفيذ البرنامج على النحو التالي:


```
How old are you? **18**
You are of age!
Here's a copy of GTA6 for you.
Next customer, please!
```


وإذا كان عمر المستخدم 17 أو أقل، فلا يُطبع سوى ما يلي:


```
How old are you? **16**
Next customer, please!
```


تبيّن لنا هذه الأمثلة أن القيمة المعطاة كمُدخَل تؤثر في أجزاء البرنامج التي تُنفَّذ. فعلى البرنامج أن يحتوي على _جملة شرطية_ (conditional statement) مع كتلة شيفرة لا تُنفَّذ إلا إذا كان الشرط في الجملة صحيحًا.

![1_5_1.png](/images/mooc/part-1/1_5_1.png)

في الجملة الشرطية يأتي الكلمة المفتاحية `if` متبوعةً بـ_شرط_ (condition)، مثل مقارنة بين قيمتين. وكتلة الشيفرة التالية لهذا السطر الترويسي لا تُنفَّذ إلا إذا كان الشرط صحيحًا.

لاحظ محرف النقطتين بعد ترويسة `if`. في الشيفرة التالية لا توجد نقطتان:

```python
age = 10

# no colon at the end of the following line
if age > 17
    print("You are of age.")
```

وعند التنفيذ يسبّب هذا خطأً:


```
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
```


## مشغّلات المقارنة

عادةً ما تتكوّن الشروط من مقارنة بين قيمتين. وفيما يلي جدول بأكثر مشغّلات المقارنة شيوعًا المستخدمة في Python:

| المشغّل | الغرض                  | المثال     |
|:--------:|------------------------|------------|
| `==`     | يساوي                  | `a == b`   |
| `!=`     | لا يساوي               | `a != b`   |
| `>`      | أكبر من                | `a > b`    |
| `>=`     | أكبر من أو يساوي       | `a >= b`   |
| `<`      | أصغر من                | `a < b`    |
| `<=`     | أصغر من أو يساوي       | `a <= b`   |

لننظر إلى برنامج يطبع أشياء مختلفة بناءً على ما إذا كان العدد الذي يُدخله المستخدم سالبًا أو موجبًا أو يساوي صفرًا:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative.")

if number > 0:
    print("The number is positive.")

if number == 0:
    print("The number is zero.")
```

أمثلة على كيفية عمل البرنامج مع ثلاثة مُدخَلات مختلفة:


```
Please type in a number: **15**
The number is positive.
```



```
Please type in a number: **-18**
The number is negative.
```



```
Please type in a number: **0**
The number is zero.
```


## المسافات البادئة

تعرف Python أن كتلة شيفرة هي جزء من جملة شرطية إذا كان كل سطر شيفرة في الكتلة _مزاحًا_ (indented) بالقدر نفسه. أي أنه ينبغي أن تتوفّر المسافات البادئة نفسها في أول كل سطر شيفرة داخل كتلة الشيفرة.

فمثلًا:

````python
password = input("Please type in a password: ")

if password == "kittycat":
    print("You knew the password!")
    print("You must be either the intended user...")
    print("...or quite an accomplished hacker.")

print("The program has finished its execution. Thanks and bye!")
````

يمكنك استخدام مفتاح Tab، وهو اختصار عن مفتاح _الجدولة_ (_tabulator_)، لإدراج كمية محدّدة من المسافات.

![1_5_keyboard.png](/images/mooc/part-1/1_5_keyboard.png)

تُزاح الكثير من محرّرات النصوص للسطر التالي تلقائيًا عند ضغط مفتاح Enter بعد محرف النقطتين. وحين تريد إنهاء كتلة شيفرة مزاحة يمكنك استخدام مفتاح `Backspace` للعودة إلى بداية السطر.

![1_5_keyboard2.png](/images/mooc/part-1/1_5_keyboard2.png)
<small><center>
مصدر صور لوحة المفاتيح:
 <a href="https://pixabay.com/users/Clker-Free-Vector-Images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Clker-Free-Vector-Images</a> من <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=311803">Pixabay</a>
</center></small>

> **تمرين تفاعلي: أورويل**
>
> يُرجى كتابة برنامج يسأل المستخدم عن عدد صحيح. ينبغي للبرنامج أن يطبع "Orwell" إذا كان العدد يساوي 1984 بالضبط، وأن لا يفعل شيئًا آخر.


```
Please type in a number: **2020**
```



```
Please type in a number: **1984**
Orwell
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: القيمة المطلقة**
>
> يُرجى كتابة برنامج يسأل المستخدم عن عدد صحيح. فإذا كان العدد أقل من صفر، فينبغي للبرنامج أن يطبع العدد مضروبًا في -1. وإلا يطبع البرنامج العدد كما هو. يُرجى الاطّلاع على أمثلة السلوك المتوقّع أدناه.


```
Please type in a number: **-7**
The absolute value of this number is 7
```



```
Please type in a number: **1**
The absolute value of this number is 1
```



```
Please type in a number: **-99**
The absolute value of this number is 99
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*



> **تمرين تفاعلي: حساء أم لا حساء**
>
> يُرجى كتابة برنامج يسأل عن اسم المستخدم. فإذا كان الاسم أي شيء سوى "Jerry"، سأل البرنامج بعد ذلك عن عدد الحصص وطبع التكلفة الإجمالية. سعر الحصة الواحدة هو 5.90.

مثالان على تنفيذ البرنامج:


```
Please tell me your name: **Kramer**
How many portions of soup? **2**
The total cost is 11.8
Next please!
```



```
Please tell me your name: **Jerry**
Next please!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*



> **تمرين تفاعلي: رتبة المقدار**
>
> يُرجى كتابة برنامج يسأل المستخدم عن عدد صحيح. ثم ينبغي للبرنامج أن يطبع رتبة العدد وفقًا للأمثلة التالية.


```
Please type in a number: **950**
This number is smaller than 1000
Thank you!
```



```
Please type in a number: **59**
This number is smaller than 1000
This number is smaller than 100
Thank you!
```



```
Please type in a number: **2**
This number is smaller than 1000
This number is smaller than 100
This number is smaller than 10
Thank you!
```



```
Please type in a number: **1123**
Thank you!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*



## القيم المنطقية والتعبيرات المنطقية

أي شرط يُستخدم في جملة شرطية ينتج قيمة حقيقة، أي إمّا صحيح أو خاطئ. فمثلًا، الشرط `a < 5` صحيح إذا كان `a` أقل من 5، وخاطئ إذا كان `a` يساوي 5 أو أكبر منها.

تُسمّى هذه الأنواع من القيم غالبًا القيم _المنطقية_ (_Boolean_)، سمّيت على اسم الرياضي الإنجليزي جورج بول. وفي Python تُعالَج هذه القيم بواسطة نوع البيانات `bool`. ولا يمكن لمتغيّرات من نوع `bool` أن تأخذ سوى قيمتين: `True` أو `False`.

يُسمّى أي مقطع شيفرة ينتج قيمة منطقية _تعبيرًا منطقيًا_ (_Boolean expression_). فمثلًا، الشرط في الجملة الشرطية هو دائمًا تعبير منطقي، وكثيرًا ما يمكن أن يُستخدَم مصطلحا _الشرط_ و_التعبير المنطقي_ بالتبادل.

يمكن تخزين نتيجة تعبير منطقي في متغيّر تمامًا كتخزين نتيجة أي عملية حسابية:

```python
a = 3
condition = a < 5
print(condition)
if condition:
    print("a is less than 5")
```


```
True
a is less than 5
```


ويمكن أيضًا استخدام الكلمتين المفتاحيتين `True` و`False` في Python مباشرةً. وفي المثال التالي يُنفَّذ أمر `print` في كل مرة، لأن قيمة الشرط هي `True`:

```python
condition = True
if condition:
    print("This is printed every time.")
```


```
This is printed every time.
```


برنامج كهذا ليس مفيدًا جدًّا، لكنك سترى لاحقًا في الدورة أمثلة على متغيّرات منطقية تكون مفيدة جدًّا.

> **تمرين تفاعلي: الآلة الحاسبة**
>
> يُرجى كتابة برنامج يسأل المستخدم عن عددين وعن عملية. فإذا كانت العملية هي _الجمع_ (_add_) أو _الضرب_ (_multiply_) أو _الطرح_ (_subtract_)، فينبغي للبرنامج أن يحسب ويطبع نتيجة العملية بالعددَين المُعطَيين. وإذا كتب المستخدم أي شيء آخر، فينبغي للبرنامج ألا يطبع شيئًا.

بعض أمثلة السلوك المتوقّع:


```
Number 1: **10**
Number 2: **17**
Operation: **add**

10 + 17 = 27
```



```
Number 1: **4**
Number 2: **6**
Operation: **multiply**

4 * 6 = 24
```



```
Number 1: **4**
Number 2: **6**
Operation: **subtract**

4 - 6 = -2
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: درجات الحرارة**
>
> يُرجى كتابة برنامج يسأل المستخدم عن درجة حرارة بوحدة درجة فهرنهايت، ثم يطبع الدرجة نفسها بوحدة درجة مئوية. فإذا كانت الحرارة المحوَّلة أقل من صفر درجة مئوية، فينبغي للبرنامج أيضًا أن يطبع "Brr! It's cold in here!".

يمكن العثور بسهولة على معادلة تحويل درجات فهرنهايت إلى درجات مئوية بأي محرك بحث تختاره.

مثالان على السلوك المتوقّع:


```
Please type in a temperature (F): **101**
101 degrees Fahrenheit equals 38.333333333333336 degrees Celsius

Please type in a temperature (F): **21**
21 degrees Fahrenheit equals -6.111111111111111 degrees Celsius
Brr! It's cold in here!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: الأجر اليومي**
>
> يُرجى كتابة برنامج يسأل عن أجر الساعة، وعن عدد ساعات العمل، وعن يوم الأسبوع. ثم ينبغي للبرنامج أن يطبع الأجر اليومي، وهو حاصل ضرب أجر الساعة في عدد ساعات العمل، إلا في أيام الأحد التي يُضاعَف فيها أجر الساعة.


```
Hourly wage: **8.5**
Hours worked: **3**
Day of the week: **Monday**
Daily wages: 25.5 euros
```



```
Hourly wage: **12.5**
Hours worked: **10**
Day of the week: **Sunday**
Daily wages: 250.0 euros
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: مكافأة الولاء**
>
> يحسب هذا البرنامج مكافأة نهاية العام التي يحصل عليها العميل على بطاقة ولائه. وتُحسب المكافأة بالمعادلة التالية:

* إذا كان على البطاقة أقل من مئة نقطة، تكون المكافأة 10 %
* في أي حالة أخرى تكون المكافأة 15 %

ينبغي أن يعمل البرنامج على النحو التالي:


```
How many points are on your card? **55**
Your bonus is 10 %
You now have 60.5 points
```


لكن هناك مشكلة في البرنامج، لذا فهو لا يعمل بشكل صحيح تمامًا مع بعض المُدخَلات:


```
How many points are on your card? **95**
Your bonus is 10 %
Your bonus is 15 %
You now have 120.175 points
```


يُرجى إصلاح البرنامج بحيث تكون المكافأة دائمًا إمّا 10 % أو 15 %، لكن ليس كلاهما أبدًا.
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: ماذا ترتدي غدًا**
>
> يُرجى كتابة برنامج يسأل عن نشرة الطقس لليوم الغد ثم يقترح ملابس مناسبة للطقس.

وينبغي أن يتغيّر الاقتراح إذا كانت الحرارة (بقياس درجات مئوية) أعلى من 20 أو 10 أو 5 درجات، وكذلك إذا كان هناك مطر على الرادار.

بعض أمثلة السلوك المتوقّع:


```
What is the weather forecast for tomorrow?
Temperature: **21**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
```



```
What is the weather forecast for tomorrow?
Temperature: **11**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well
```



```
What is the weather forecast for tomorrow?
Temperature: **7**
Will it rain (yes/no): **no**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you
```



```
What is the weather forecast for tomorrow?
Temperature: **3**
Will it rain (yes/no): **yes**
Wear jeans and a T-shirt
I recommend a jumper as well
Take a jacket with you
Make it a warm coat, actually
I think gloves are in order
Don't forget your umbrella!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: حلّ المعادلة التربيعية**
>
> في وحدة `math` في Python توجد الدالة `sqrt`، التي تحسب الجذر التربيعي لعدد. ويمكنك استخدامها على النحو التالي:

```python
from math import sqrt

print(sqrt(9))
```

ومن المفترض أن يطبع هذا


```
3.0
```


وسنعود لاحقًا إلى مفهوم _الوحدة_ (_module_) إلى عبارة `import`. أما الآن فكفاك أن تفهم أن السطر `from math import sqrt` يتيح لنا استخدام الدالة `sqrt` في برنامجنا.

يُرجى كتابة برنامج لحلّ معادلة تربيعية من الشكل ax²+bx+c. يسأل البرنامج عن قيم a وb وc. ثم ينبغي له أن يستخدم المعادلة التربيعية لحلّ المعادلة. وإليك المعادلة التربيعية معبَّرةً بالدالة `sqrt` في Python:

x = (-b ± sqrt(b²-4ac))/(2a).

يمكنك أن تفترض أن المعادلة ستحتوي دائمًا على جذرين حقيقيَّين، لذا فسيكون ما سبق صالحًا دائمًا.

مثال على السلوك المتوقّع:


```
Value of a: **1**
Value of b: **2**
Value of c: **-8**

The roots are 2.0 and -4.0
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: bc7e500f-a91e-5709-8ae6-34637ff01737)


-->

يُرجى الإجابة على استبيان سريع حول مواد هذا الأسبوع. الاستبيان يستحق نقطة تمرين واحدة.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 9d55d599-eaf4-58c9-933f-7fc1b1f6962b)

