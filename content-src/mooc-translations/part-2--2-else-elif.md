---
title: "المزيد عن الجمل الشرطية"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف كيف تنشئ فروعًا متعدّدة داخل الجمل الشرطية
> - ستفهم الغرض من جمل `if` و`elif` و`else` داخل الجملة الشرطية
> - ستتمكّن من استخدام عملية معامل الباقي `%` في التعبيرات المنطقية


لننظر إلى برنامج يطلب من المستخدم إدخال عدد، ثم يطبع رسائل مختلفة اعتمادًا على ما إذا كان العدد سالبًا أم موجبًا أم يساوي صفرًا:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")

if number >= 0:
    print("The number is positive or zero")
```

يبدو هذا شيئًا ثقيلًا بعض الشيء ومتكرِّرًا. فنحن لا نريد سوى تنفيذ إحدى كتلتَي `if`، لأن المُدخَل سيكون دائمًا إمّا أقل من صفر، أو يساوي صفرًا أو أكبر منه. أي أن `number < 0` أو `number >= 0` صحيح، لكن ليس كلاهما صحيحًا في الوقت نفسه. لذا فالجملة الشرطية الأولى تحتوي في الواقع على كل ما نحتاجه هنا. فإذا كانت صحيحة، فالعدد سالب. وإذا كانت خاطئة، فالعدد يساوي صفرًا أو يكون موجبًا.

وبدلًا من إنشاء جملة شرطية أخرى بالكامل، كما في المثال أعلاه، يمكن إنشاء فرع آخر من الجملة الشرطية نفسها لتغطية جميع الحالات _التي يكون فيها الشرط خاطئًا_. وتُسمّى هذه بجملة `else`.

المثال السابق بعد إعادة كتابته:

```python
number = int(input("Please type in a number: "))

if number < 0:
    print("The number is negative")
else:
    print("The number is positive or zero")
```

وعند استخدام بنية if-else، سيُنفَّذ دائمًا واحد من الفروع على وجه اليقين، ولا يُنفَّذ في الوقت نفسه سوى فرع واحد. ويوضّح الشكل التالي بنية هذه البنية:

![2_2_1.png](/images/mooc/part-2/2_2_1.png)

ملاحظة: لا يمكن أبدًا أن يوجد فرع else دون أن يسبقه فرع if. وتُشكّل بنية if-else ككلها _جملة شرطية_ واحدة.

يتحقّق المثال التالي مما إذا كان العدد الذي يعطيه المستخدم زوجيًا أم لا. ويمكن التحقّق من الزوجية باستخدام معامل الباقي `%`، الذي ينتج الباقي من عملية قسمة أعداد صحيحة. فإذا كان الباقي عند القسمة على اثنين صفرًا، فإن العدد زوجي. وإلا فإن العدد فردي.

```python
number = int(input("Please type in a number: "))

if number % 2 == 0:
    print("The number is even")
else:
    print("The number is odd")
```


```
Please type in a number: **5**
The number is odd
```


ومثال آخر باستخدام مقارنة السلاسل النصية:

```python
correct = "kittycat"
password = input("Please type in the password: ")

if password == correct:
    print("Welcome")
else:
    print("No admittance")
```

ومع مُدخَلين مختلفين، ينبغي أن يطبع ما يلي:


```
Please type in the password: **kittycat**
Welcome
```



```
Please type in the password: **monkey**
No admittance
```



> **تمرين تفاعلي: سن الرشد**
>
> يُرجى كتابة برنامج يطلب من المستخدم عمره. وينبغي للبرنامج أن يطبع بعد ذلك رسالة اعتمادًا على ما إذا كان المستخدم بلغ سن الرشد أم لا، باستخدام 18 كسنٍّ للرشد.

أمثلة على السلوك المتوقَّع:


```
How old are you? **12**
You are not of age!
```



```
How old are you? **32**
You are of age!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


## فروع بديلة باستخدام جملة elif

كثيرًا ما يكون أمام البرنامج أكثر من خيارين ينبغي أن يراعيها. فمثلًا، قد تكون نتيجة مباراة كرة قدم على ثلاث حالات: فوز الفريق المضيف، أو فوز الفريق الضيف، أو التعادل.

يمكن إضافة فرع `elif` إلى الجملة الشرطية. وهو اختصار لعبارتي "else if"، أي أن الفرع سيحتوي على بديل للشرط الأصلي. ومن المهم أن جملة `elif` لا تُنفَّذ إلا إذا لم يُنفَّذ أي فرع من الفروع السابقة.

![2_2_2.png](/images/mooc/part-2/2_2_2.png)

لننظر إلى برنامج يحدّد الفائز بمباراة:

```python
goals_home = int(input("Home goals scored: "))
goals_away = int(input("Away goals scored: "))

if goals_home > goals_away:
    print("The home team won!")
elif goals_away > goals_home:
    print("The away team won!")
else:
    print("It's a tie!")
```

ويمكن لهذا البرنامج أن يطبع ثلاث جمل مختلفة مع مُدخَلات مختلفة:


```
Home goals scored: **4**
Away goals scored: **2**
The home team won!
```



```
Home goals scored: **0**
Away goals scored: **6**
The away team won!
```



```
Home goals scored: **3**
Away goals scored: **3**
It's a tie!
```


في المثال أعلاه ثلاثة فروع بديلة، يُنفَّذ منها دائمًا واحد على وجه اليقين. غير أنه لا يوجد حدّ لعدد فروع `elif` التي يمكن أن تحتويها الجملة الشرطية، وفرع `else` ليس إلزاميًا.

وهذه أيضًا جملة شرطية صحيحة:

```python
print("Holiday calendar")
date = input("What is the date today? ")

if date == "Dec 26":
    print("It's Boxing Day")
elif date == "Dec 31":
    print("It's Hogmanay")
elif date == "Jan 1":
    print("It's New Year's Day")

print("Thanks and bye.")
```


```
Holiday calendar
What is the date today? **Dec 31**
It's Hogmanay
Thanks and bye.
```


لاحظ أن المثال السابق لا يحتوي على فرع `else`. فإذا أدخل المستخدم تاريخًا لم يُذكر في أي من فرعي `if` أو `elif`، أو أدخل تاريخًا بصيغة مختلفة، فلا يُنفَّذ أيٌّ من الفروع الثلاثة للجملة الشرطية.


```
Holiday calendar
What is the date today? **Dec 25**
Thanks and bye.
```


> **تمرين تفاعلي: أكبر من أو يساوي**
>
> يُرجى كتابة برنامج يطلب عددين صحيحين. وينبغي للبرنامج أن يطبع بعد ذلك أيًّا منهما كان أكبر. وإذا كان العددان متساويين، فينبغي للبرنامج أن يطبع رسالة مختلفة.

أمثلة على السلوك المتوقَّع:


```
Please type in the first number: **5**
Please type in another number: **3**
The greater number was: 5
```



```
Please type in the first number: **5**
Please type in another number: **8**
The greater number was: 8
```



```
Please type in the first number: **5**
Please type in another number: **5**
The numbers are equal!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*



> **تمرين تفاعلي: الأكبر سنًّا**
>
> يُرجى كتابة برنامج يطلب اسمَي شخصين وعمرَيهما. وينبغي للبرنامج أن يطبع بعد ذلك اسم الأكبر سنًّا.

أمثلة على السلوك المتوقَّع:


```
Person 1:
Name: **Alan**
Age: **26**
Person 2:
Name: **Ada**
Age: **27**
The elder is Ada
```



```
Person 1:
Name: **Bill**
Age: **1**
Person 2:
Name: **Jean**
Age: **1**
Bill and Jean are the same age
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: الأخير أبجديًّا**
>
> يمكن استخدام مشغّلات المقارنة في Python أيضًا مع السلاسل النصية. فالسلسلة النصية `a` أصغر من السلسلة النصية `b` إذا سبقت `b` أبجديًّا. ولاحظ مع ذلك أن المقارنة موثوقة فقط إذا
- كانت المحارف المُقارَنة من الحالة نفسها، أي كلاهما بأحرف كبيرة أو كلاهما بأحرف صغيرة
- كان يُستخدم فقط الأبجدية الإنجليزية المعيارية من a إلى z، أو من A إلى Z.

يُرجى كتابة برنامج يطلب من المستخدم كلمتين. وينبغي للبرنامج أن يطبع بعد ذلك الكلمة التي تأتي أخيرًا أبجديًّا من الكلمتين.

يمكنك افتراض أن جميع الكلمات ستُكتب بأحرف صغيرة بالكامل.

أمثلة على السلوك المتوقَّع:


```
Please type in the 1st word: **car**
Please type in the 2nd word: **scooter**
scooter comes alphabetically last.
```



```
Please type in the 1st word: **zorro**
Please type in the 2nd word: **batman**
zorro comes alphabetically last.
```



```
Please type in the 1st word: **python**
Please type in the 2nd word: **python**
You gave the same word twice.
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 82f644fe-5d89-5153-842a-11d5d11bc059)


-->
