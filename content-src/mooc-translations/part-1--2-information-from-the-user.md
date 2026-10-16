---
title: "المعلومات من المستخدم"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
> 
> - ستعرف كيف تكتب برنامجًا يستخدم مُدخَلات من المستخدم
> - ستعرف كيف تستخدم المتغيّرات لتخزين المُدخَل وطباعته
> - ستكون قادرًا على دمج السلاسل النصية


_المُدخَل_ (input) هو أي معلومة يعطيها المستخدم إلى البرنامج. وتحديدًا، يقرأ الأمر `input` في Python سطر مُدخَل يكتبه المستخدم. ويمكن أيضًا استخدامه لعرض رسالة على المستخدم، أي لطلب مُدخَل معيَّن.

يقرأ البرنامج التالي اسم المستخدم بالأمر `input`. ثم يطبعه بالأمر `print`:

```python
name = input("What is your name? ")
print("Hi there, " + name)
```

قد يبدو تنفيذ هذا البرنامج على النحو التالي (المُدخَل الذي أدخله المستخدم بالأحمر):


```
What is your name? **Paul Python**
Hi there, Paul Python
```


ما يطبعه هذا البرنامج يعتمد جزئيًا على المُدخَل الذي يُدخله المستخدم. أي أن تنفيذ البرنامج يمكن أن يبدو أيضًا على النحو التالي:


```
What is your name? **Paula Programmer**
Hi there, Paula Programmer
```


الكلمة `name` في هذا البرنامج هي _متغيّر_ (variable). وفي سياق البرمجة، المتغيّر هو موضع لتخزين _قيمة_ (value) ما، مثل سلسلة نصية أو عدد. ويمكن استخدام هذه القيمة لاحقًا، كما يمكن تغييرها أيضًا.

> **تسمية المتغيّرات**
>
> من حيث المبدأ، يمكن تسمية المتغيّرات بحرية إلى حدٍّ كبير، ضمن بعض القيود التيحدّدها لغة Python.
>
> ومن الممارسات الشائعة في البرمجة الدولية تسمية المتغيّرات بالإنجليزية، لكنك قد تصادف شيفرة تكون فيها المتغيّرات مسمّاة بلغات أخرى، مثل اللغة الأم للمبرمج. ولا يؤثر اسم المتغيّر مباشرةً في محتواه، فالاسم من هذه الناحية لا يهمّ. لكن التسمية المنطقية بالإنجليزية كثيرًا ما تساعد في فهم كيفية عمل الشيفرة.


> **تمرين تفاعلي: الاسم مرتين**
>
> اكتب برنامجًا يطلب اسم المستخدم ثم يطبعه مرتين، على سطرين متتاليين.

مثال على كيف ينبغي أن يعمل البرنامج:


```
What is your name? **Paul**
Paul
Paul
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


## الإشارة إلى متغيّر

يمكن الإشارة إلى المتغيّر الواحد عدّة مرّات في البرنامج:

```python
name = input("What is your name? ")

print("Hi, " + name + "!")
print(name + " is quite a nice name.")
```

إذا أدخل المستخدم الاسم `Paul Python`، فإن هذا البرنامج يطبع ما يلي:


```
What is your name? **Paul Python**
Hi, Paul Python!
Paul Python is quite a nice name.
```


لننظر عن كثب في طريقة استخدام الأمر `print` أعلاه. ففي داخل أقواس الأمر يوجد نص بين علامتَي تنصيص، وكذلك أسماء متغيّرات تشير إلى مُدخَل من المستخدم. وقد جُمعت هذه باستخدام المشغّل `+`، الذي _يدمج_ سلسلتين نصيتين في سلسلة نصية واحدة.

يمكن دمج السلاسل النصية والمتغيّرات بحرية تامة:

```python
name = input("What is your name? ")

print("Hi " + name + "! Let me make sure: your name is " + name + "?")
```

إذا أدخل المستخدم الاسم `Ellen Example` فإن هذا يطبع


```
What is your name? **Ellen Example**
Hi Ellen Example! Let me make sure: your name is Ellen Example?
```


> **تمرين تفاعلي: الاسم وعلامات التعجّب**
>
> اكتب برنامجًا يطلب اسم المستخدم ثم يطبعه مرتين في سطر واحد، بحيث توجد علامة تعجّب في بداية السطر، وأخرى بين الاسمين، وثالثة في نهاية السطر.

يجب أن يعمل البرنامج على النحو التالي:


```
What is your name? **Paul**
!Paul!Paul!
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


## أكثر من مُدخَل واحد

يمكن للبرنامج أن يطلب أكثر من مُدخَل واحد. لاحظ كيف أن كل أمر `input` في المثال التالي يخزّن القيمة المستلَمة في متغيّر مختلف.

```python
name = input("What is your name? ")
email = input("What is your email address? ")
nickname = input("What is your nickname? ")

print("Let's make sure we got this right")
print("Your name: " + name)
print("Your email address: " + email)
print("Your nickname: " + nickname)
```

قد يطبع البرنامج ما يلي، على سبيل المثال:


```
What is your name? **Frances Fictitious**
What is your email address? **frances99@example.com**
What is your nickname? **Fran**
Let's make sure we got this right
Your name: Frances Fictitious
Your email address: frances99@example.com
Your nickname: Fran
```


إذا استُخدم المتغيّر نفسه لتخزين أكثر من مُدخَل، فإن كل قيمة جديدة ستحلّ محلّ القيمة السابقة. فمثلًا:

```python
address = input("What is your address? ")
print("So you live at address " + address)

address = input("Please type in a new address: ")
print("Your address is now " + address)
```

مثال على تنفيذ البرنامج:


```
What is your address? **Python Path 101, Flat 3D**
So you live at address Python Path 101, Flat 3D
Please type in a new address: **New Road 999**
Your address is now New Road 999
```


وهذا يعني أنه إذا استُخدم المتغيّر نفسه لتخزين مُدخَلين متتاليين، فلا توجد طريقة للوصول إلى قيمة المُدخَل الأول بعد أن حلّت محلّها الثانية:

```python
address = input("What is your address? ")
address = input("Please type in a new address: ")

print("Your address is now " + address)
```

مثال على كيف قد يبدو مخرجات البرنامج:


```
What is your address? **Python Path 10**
Please type in a new address: **Programmer's Walk 23**
Your address is now Programmer's Walk 23
```


> **تمرين تفاعلي: الاسم والعنوان**
>
> اكتب برنامجًا يطلب اسم المستخدم وعنوانه. وعلى البرنامج أيضًا أن يطبع المعلومات المُدخَلة، على النحو التالي:


```
Given name: **Steve**
Family name: **Sanders**
Street address: **91 Station Road**
City and postal code: **London EC05 6AW**
Steve Sanders
91 Station Road
London EC05 6AW
```
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: إصلاح الشيفرة: الأقوال**
>
> إليك برنامجًا من المفترض أن يطلب ثلاثة أقسام ويطبعها، على النحو التالي:


```
The 1st part: **hickory**
The 2nd part: **dickory**
The 3rd part: **dock**
hickory-dickory-dock!
```


لكن هناك خلل ما في الشيفرة أدناه. يُرجى إصلاحه.
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


> **تمرين تفاعلي: القصة**
>
> اكتب برنامجًا يطبع القصة التالية. ويعطي المستخدم اسمًا وسنة، ينبغي إدراجهما في المطبوع.


```
Please type in a name: **Mary**
Please type in a year: **1572**

Mary is a valiant knight, born in the year 1572. One morning Mary woke up to an awful racket: a dragon was approaching the village. Only Mary could save the village's residents.
```


القصة ينبغي أن تتغيّر وفق المُدخَل الذي يُعطيه المستخدم.
>
> *ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.*


<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 10cb3510-d8a6-5e9b-b372-c85c4c7eb957)


-->