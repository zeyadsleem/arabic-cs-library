---
title: "الحلقات البسيطة"
lang: ar
source: "https://programming-26.mooc.fi/part-2/4-simple-loops"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know what a loop means in programming
- You will be able to use a `while True` loop in your programs
- You will know how to use the `break` command to break out of a loop

</text-box>

لقد غطينا الهياكل الشرطية (conditional structures) بتفصيل ما. تقنية مركزية أخرى في البرمجة هي التكرار (repetition)، أو التكرار المبرمج (iteration). معاً تشكلان الهياكل الأساسية للتحكم التي يجب على أي مبرمج إتقانها. تسمى هياكل التحكم لأنها بشكل أساسي تسمح لك بالتحكم في أي أسطر من الكود يتم تنفيذها ومتى. بينما تسمح الهياكل الشرطية لك _بالاختيار بين_ أقسام الكود، تسمح هياكل التكرار لك _بتكرار_ أقسام الكود. غالباً ما تسمى _الحلقات (loops)_ لأنها تسمح للبرنامج بـ "العودة" إلى سطر تم تنفيذه مسبقاً. عملية تنفيذ تكرار واحد من الحلقة تسمى أيضاً تكراراً للحلقة.

هذا القسم يقدم حلقة `while` بسيطة. بناؤها مشابه للجمل الشرطية التي غطيناها بالفعل. في الجزء التالي سنتعمق في أمثلة أكثر تعقيداً.

دعونا نلقي نظرة على برنامج يطلب من المستخدم كتابة رقم ثم يطبع مربع الرقم. يستمر هذا حتى يكتب المستخدم -1.

```python
while True:
    number = int(input("Please type in a number, -1 to quit: "))

    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

تشغيل البرنامج قد يبدو كالتالي:

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

كما ترى أعلاه، البرنامج يطلب عدة أرقام، بفضل جملة `while` في البرنامج. عندما يكتب المستخدم -1، يتم تنفيذ أمر `break`، الذي يخرج من الحلقة ويستمر التنفيذ من أول سطر بعد كتلة `while`.

مع الحلقات، من الضروري أن يكون هناك دائماً طريقة للخروج من الحلقة في مرحلة ما من الكود، وإلا قد يستمر التكرار إلى الأبد. لتوضيح هذا، لنغير المثال أعلاه قليلاً:

```python
number = int(input("Please type in a number, -1 to quit: "))
while True:
    if number == -1:
        break

    print(number ** 2)

print("Thanks and bye!")
```

في هذا الإصدار البرنامج يطلب من المستخدم كتابة رقم _خارج الحلقة_. إذا كتب المستخدم أي رقم غير -1، فلن يتم الخروج من الحلقة أبداً. هذا يشكل _حلقة لا نهائية (infinite loop)_، مما يعني أن كتلة الكود داخل الحلقة تتكرر بلا نهاية:

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

البرنامج التالي له بنية مشابهة للمثال أعلاه الحلقة اللانهائية، لكن تجربة المستخدم مختلفة تماماً. هذا البرنامج يسمح للمستخدم بالمتابعة فقط إذا كتب رمز PIN الصحيح _1234_:

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
