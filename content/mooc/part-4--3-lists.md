---
title: "القوائم"
lang: ar
source: "https://programming-26.mooc.fi/part-4/3-lists"
---

> **أهداف التعلّم**
>
> بعد هذا القسم
>
> - ستعرف ما هي القوائم في Python
> - ستكون قادرًا على الوصول إلى عنصر محدَّد داخل قائمة
> - ستعرف كيف تُضاف العناصر إلى قائمة، وكيف تُزال منها
> - ستكون على دراية بالدوال والتابعين المدمجين في القوائم


في برامجنا حتى الآن كنّا نخزّن البيانات بالمتغيّرات، وكان لكل قطعة من البيانات عادةً متغيّر خاص بها يحمل اسمًا. ويرتب على ذلك بطبيعة الحال بعض القيود، إذ قد يصبح تعريف متغيّرات منفصلة لكل شيء عبئًا حين تتراكم البيانات المراد معالجتها.

القائمة (list) في Python تجمُّع من القيم يمكن الوصول إليه عبر اسم متغيّر واحد. وتُكتب محتويات القائمة بين قوسين مربّعين. وتُسمّى القيم الموجودة في القائمة _عناصر_ (items)، وأحيانًا _مكوّنات_ (elements).

الأمر التالي ينشئ قائمة جديدة فارغة

```python
my_list = []
```

بينما الأمر التالي ينشئ قائمة تحتوي على خمسة عناصر:

```python
my_list = [7, 2, 2, 5, 2]
```

## الوصول إلى عناصر القائمة

تُرقَّم عناصر القائمة بالطريقة تمامًا نفسها التي تُرقَّم بها محارف السلسلة النصية. ويبدأ الترقيم من الصفر، ويكون آخر فهرس هو طول القائمة ناقص واحدًا:

![تُرقَّم القوائم بدءًا من 0](/images/mooc/part-4/4_3_1.png)

ويمكن الوصول إلى عنصر واحد في القائمة بالطريقة نفسها التي تصل بها إلى محرف واحد في السلسلة النصية، باستخدام الأقواس المربّعة:

```python
my_list = [7, 2, 2, 5, 2]

print(my_list[0])
print(my_list[1])
print(my_list[3])

print("The sum of the first two items:", my_list[0] + my_list[1])
```


```
7
2
5
The sum of the first two items: 9
```


يمكن أيضًا طباعة محتويات القائمة كاملة:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
```


```
[7, 2, 2, 5, 2]
```


على عكس السلاسل النصية، فالقوائم قابلة للتغيير (mutable)، أي أن محتوياتها يمكن أن تتغيّر. ويمكنك إسناد قيمة جديدة إلى عنصر داخل القائمة، تمامًا كما تسند قيمة جديدة إلى متغيّر:

```python
my_list = [7, 2, 2, 5, 2]
print(my_list)
my_list[1] = 3
print(my_list)
```


```
[7, 2, 2, 5, 2]
[7, 3, 2, 5, 2]
```


تُعطيك الدالة `len` عدد العناصر في القائمة:

```python
my_list = [7, 2, 2, 5, 2]
print(len(my_list))
```


```
5
```



> **تمرين برمجي: تغيير قيمة عنصر**
>
> يُرجى كتابة برنامج يُهيّئ قائمة بالقيم `[1, 2, 3, 4, 5]`. ثم يسأل البرنامج المستخدم عن فهرس وعن قيمة جديدة، ويستبدل القيمة الموجودة عند الفهرس المحدَّد، ثم يطبع القائمة مرة أخرى. ويُكرَّر ذلك في حلقة حتى يُدخل المستخدم -1 بدلًا من الفهرس. ويمكنك افتراض أن جميع قيم الفهارس المُدخلة ستقع داخل نطاق قائمتك.

مثال على تنفيذ البرنامج:


```
Index: **0**
New value: **10**
[10, 2, 3, 4, 5]
Index: **2**
New value: **250**
[10, 2, 250, 4, 5]
Index: **4**
New value: **-45**
[10, 2, 250, 4, -45]
Index: **-1**
```


**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن __لا__ تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


## إضافة العناصر إلى القائمة

يضيف التابع `append` العناصر إلى نهاية القائمة. ويعمل هكذا:

```python
numbers = []
numbers.append(5)
numbers.append(10)
numbers.append(3)
print(numbers)
```


```
[5, 10, 3]
```


المثال التالي يستخدم قائمتين منفصلتين:

```python
numbers = []
shoe_sizes = []

numbers.append(5)
numbers.append(10)
numbers.append(3)

shoe_sizes.append(37)
shoe_sizes.append(44)
shoe_sizes.append(40)
shoe_sizes.append(28)

print("Numbers:")
print(numbers)

print("Shoe sizes:")
print(shoe_sizes)
```

يُضاف العنصر إلى القائمة التي استُدعي عليها التابع:


```
Numbers:
[5, 10, 3]
Shoe sizes:
[37, 44, 40, 28]
```


> **تمرين برمجي: إضافة عناصر إلى قائمة**
>
> يُرجى كتابة برنامج يسأل المستخدم أولًا عن عدد العناصر المطلوب إضافتها. ثم يسأل البرنامج عن العدد المحدَّد من القيم، واحدًا تلو الآخر، ويضيفها إلى قائمة بالترتيب الذي أُدخلت به. وأخيرًا تُطبع القائمة.

مثال على السلوك المتوقّع:


```
How many items: **3**
Item 1: **10**
Item 2: **250**
Item 3: **34**
[10, 250, 34]
```


**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن __لا__ تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


## الإضافة إلى موضع محدَّد

إن أردت تحديد موضع في القائمة يُضاف إليه عنصر، فيمكنك استخدام التابع `insert`. يضيف التابع عنصرًا عند الفهرس المحدَّد. وتُزاح فهرسًا واحدًا إلى الخلف، أي «إلى اليمين»، جميع العناصر الموجودة أصلًا في القائمة التي يساوي فهرسها الفهرس المحدَّد أو يزيد عنه:

![إضافة عنصر إلى قائمة](/images/mooc/part-4/4_3_2.png)

فقد، مثلًا، هذا البرنامج

```python
numbers = [1, 2, 3, 4, 5, 6]
numbers.insert(0, 10)
print(numbers)
numbers.insert(2, 20)
print(numbers)
```

يطبع ما يلي:


```
[10, 1, 2, 3, 4, 5, 6]
[10, 1, 20, 2, 3, 4, 5, 6]
```


## إزالة العناصر من القائمة {#removing-items-from-a-list}

هناك نهجان مختلفان لإزالة عنصر من قائمة:

* إذا كان _فهرس_ العنصر معروفًا، فيمكنك استخدام التابع `pop`.
* إذا كان _محتوى_ العنصر معروفًا، فيمكنك استخدام التابع `remove`.

إذًا، يأخذ التابع `pop` فهرس العنصر الذي تريد إزالته كوسيط له. ويزيل البرنامج التالي العنصرين الموجودين عند الفهرس 2 والفهرس 3 من القائمة. ولاحظ كيف تتغيّر فهارس العناصر المتبقية حين يُزال أحدها.

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.pop(2)
print(my_list)
my_list.pop(3)
print(my_list)
```


```
[1, 2, 4, 5, 6]
[1, 2, 4, 6]
```


من المفيد تذكّر أن التابع `pop` يُعيد أيضًا العنصر المُزال:

```python
my_list = [4, 2, 7, 2, 5]

number = my_list.pop(2)
print(number)
print(my_list)
```


```
7
[4, 2, 2, 5]
```


أما التابع `remove` فيأخذ قيمة العنصر المراد إزالته كوسيط له. فقد، مثلًا، هذا البرنامج

```python
my_list = [1, 2, 3, 4, 5, 6]

my_list.remove(2)
print(my_list)
my_list.remove(5)
print(my_list)
```

يطبع ما يلي:


```
[1, 3, 4, 5, 6]
[1, 3, 4, 6]
```


يزيل التابع _أول_ ورود للقيمة في القائمة، تمامًا كما تُعيد دالة السلسلة النصية `find` أول ورود لسلسلة فرعية:

```python
my_list = [1, 2, 1, 2]

my_list.remove(1)
print(my_list)
my_list.remove(1)
print(my_list)
```


```
[2, 1, 2]
[2, 2]
```


> **تمرين برمجي: الإضافة والإزالة**
>
> يُرجى كتابة برنامج يطلب من المستخدم الاختيار بين الإضافة والإزالة. وبحسب الاختيار، _يضيف البرنامج عنصرًا إلى_ نهاية القائمة أو _يزيل عنصرًا منها_. ويجب أن يكون العنصر المضاف دائمًا أكبر بواحد من آخر عنصر في القائمة. ويجب أن يكون أول عنصر يُضاف هو 1.

تُطبع القائمة في البداية وبعد كل عملية. وانظر إلى مثال التنفيذ أدناه:


```
The list is now []
a(d)d, (r)emove or e(x)it: **d**
The list is now [1]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **r**
The list is now [1, 2]
a(d)d, (r)emove or e(x)it: **d**
The list is now [1, 2, 3]
a(d)d, (r)emove or e(x)it: **x**
Bye!
```


يمكنك افتراض أنه إذا كانت القائمة فارغة فلن تتم محاولة إزالة عناصر.

**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن __لا__ تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


وإذا لم يكن العنصر المحدَّد موجودًا في القائمة، فإن الدالة `remove` تُسبّب خطأً. وتمامًا كما في السلاسل النصية، يمكننا التحقق من وجود عنصر باستخدام المشغّل `in`:

```python
my_list = [1, 3, 4]

if 1 in my_list:
    print("The list contains item 1")

if 2 in my_list:
    print("The list contains item 2")
```


```
The list contains item 1
```


> **تمرين برمجي: الكلمة نفسها مرتين**
>
> يُرجى كتابة برنامج يطلب من المستخدم كلمات. وإذا أدخل المستخدم كلمة للمرة الثانية، ينبغي للبرنامج أن يطبع عدد الكلمات المختلفة التي أُدخلت، ثم ينتهي.


```
Word: **once**
Word: **upon**
Word: **a**
Word: **time**
Word: **upon**
You typed in 4 different words
```


**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن __لا__ تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


## ترتيب القوائم

يمكن _ترتيب_ عناصر القائمة من الأصغر إلى الأكبر باستخدام التابع `sort`.

```python
my_list = [2,5,1,2,4]
my_list.sort()
print(my_list)
```


```
[1, 2, 2, 4, 5]
```


لاحظ كيف يُعدّل التابع القائمة نفسها. وفي بعض الأحيان لا نريد تغيير القائمة الأصلية، لذا نستخدم الدالة `sorted` بدلًا منه. وهي تُعيد قائمة مرتّبة:

```python
my_list = [2,5,1,2,4]
print(sorted(my_list)))
```


```
[1, 2, 2, 4, 5]
```


تذكّر الفرق بين الاثنين: يُغيّر `sort` ترتيب القائمة الأصلية في مكانها، بينما تنشئ `sorted` نسخة جديدة مرتّبة من القائمة. وباستخدام `sorted` يمكننا الحفاظ على الترتيب الأصلي للقائمة:

```python
original = [2, 5, 1, 2, 4]
in_order = sorted(original)
print(original)
print(in_order)
```


```
[2, 5, 1, 2, 4]
[1, 2, 2, 4, 5]
```


> **تمرين برمجي: القائمة مرتين**
>
> يُرجى كتابة برنامج يطلب من المستخدم إدخال قيم ويضيفها إلى قائمة. وبعد كل إضافة، تُطبع القائمة بطرقتين مختلفتين:
- بالترتيب الذي أُضيفت به العناصر
- مرتّبة من الأصغر إلى الأكبر

ينتهي البرنامج حين يُدخل المستخدم 0.

مثال على السلوك المتوقّع:


```
New item: **3**
The list now: [3]
The list in order: [3]
New item: **1**
The list now: [3, 1]
The list in order: [1, 3]
New item: **9**
The list now: [3, 1, 9]
The list in order: [1, 3, 9]
New item: **5**
The list now: [3, 1, 9, 5]
The list in order: [1, 3, 5, 9]
New item: **0**
Bye!
```


**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن __لا__ تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


## الأقصى والأصغر والمجموع

تُعيد الدالتان `max` و`min`، وهما اختصار كلمتَي «الأقصى» و«الأدنى»، أكبر عنصر وأصغر عنصر في القائمة على الترتيب. أما الدالة `sum` فتُعيد مجموع جميع عناصر القائمة.

```python
my_list = [5, 2, 3, 1, 4]

greatest = max(my_list)
smallest = min(my_list)
list_sum = sum(my_list)

print("Smallest:", smallest)
print("Greatest:", greatest)
print("Sum:", list_sum)
```


```
Smallest: 1
Greatest: 5
Sum: 15
```


## التابعون مقابل الدوال

هناك طريقتان مختلفتان لمعالجة القوائم في Python، وقد يُثير ذلك اللبس. وفي الغالب ستستخدم _تابعين_ للقائمة، مثل `append` و`sort`. وتُستخدم مع مشغّل النقطة `.` على متغيّر القائمة:

```python
my_list = []

# method calls
my_list.append(3)
my_list.append(1)
my_list.append(7)
my_list.append(2)

# another method call
my_list.sort()
```

بعض _الدوال_ تقبل أخذ قائمة كوسيط. ورأينا في الأعلى أن الدوال `max` و`min` و`len` و`sorted` تفعل ذلك بالضبط:

```python
my_list = [3, 2, 7, 1]

# function calls take the list as an argument
greatest = max(my_list)
smallest = min(my_list)
length = len(my_list)

print("Smallest:", smallest)
print("Greatest:", greatest)
print("Length of the list:", length)

# another function call 
# the list itself is an argument, the function returns a sorted copy
in_order = sorted(my_list)
print(in_order)
```


```
Smallest: 1
Greatest: 7
Length of the list: 4
[1, 2, 3, 7]
```


## قائمة كوسيط أو كقيمة معادة {#a-list-as-an-argument-or-a-return-value}

تمامًا كالدوال المدمجة أعلاه، يمكن لدوالنا الخاصة أيضًا أن تأخذ قائمة كوسيط، وأن تُنتج قائمة كقيمة معادة. وتحسب الدالة التالية القيمة المركزية في قائمة مرتّبة، وتُعرف أيضًا بقيمة _الوسيط_ (median):

```python
def median(my_list: list):
    ordered = sorted(my_list)
    list_centre = len(ordered) // 2
    return ordered[list_centre]
```

تنشئ الدالة نسخة مرتّبة من القائمة المُعطاة كوسيط، وتُرجع العنصر الموجود في وسطها تمامًا. ولاحظ استخدام مشغّل القسمة الصحيحة `//` هنا. فيجب أن يكون فهرس القائمة دائمًا عددًا صحيحًا.

تعمل الدالة هكذا:

```python
shoe_sizes = [45, 44, 36, 39, 40]
print("The median of the shoe sizes is", median(shoe_sizes))

ages = [1, 56, 34, 22, 5, 77, 5]
print("The median of the ages is", median(ages))
```


```
The median of the shoe sizes is 40
The median of the ages is 22
```


يمكن للدالة أيضًا أن تُرجع قائمة. وتسأل الدالة التالية المستخدم إدخال أعداد صحيحة، وتُرجع المُدخل كقائمة:

```python
def input_numbers():
    numbers = []
    while True:
        user_input = input("Please type in an integer, leave empty to exit: ")
        if len(user_input) == 0:
            break
        numbers.append(int(user_input))
    return numbers
```

تستخدم الدالة متغيّرًا مساعدًا اسمه `numbers` وهو قائمة. وتُضاف جميع الأعداد التي أدخلها المستخدم إلى القائمة. وعند الخروج من الحلقة، تُعيد الدالة القائمة بالجملة `return numbers`.

استدعاء الدالة هكذا

```python 
numbers = input_numbers()

print("The greatest number is", max(numbers))
print("The median of the numbers is", median(numbers))
```

قد يطبع هذا، مثلًا:


```
Please type in an integer, leave empty to exit: **5**
Please type in an integer, leave empty to exit: **-22**
Please type in an integer, leave empty to exit: **4**
Please type in an integer, leave empty to exit: **35**
Please type in an integer, leave empty to exit: **1**
Please type in an integer, leave empty to exit:
The greatest number is 35
The median of the numbers is 4
```


يُظهر هذا المثال الصغير أحد أهم استخدامات الدوال: إذ تساعدك على تقسيم شيفرتك إلى كتل أصغر يسهل فهمها وذات معنى منطقي.

بالطبع يمكن تحقيق الوظيفة نفسها دون كتابة أي من دوالنا الخاصة:

```python
numbers = []
while True:
    user_input = input("Please type in an integer, leave empty to exit: ")
    if len(user_input) == 0:
        break
    numbers.append(int(user_input))

ordered = sorted(numbers)
list_centre = len(ordered) // 2
median = ordered[list_centre]

print("The greatest number is", max(numbers))
print("The median of the numbers is", median)
```

في هذه النسخة يكون تتبع المنطق البرمجي أصعب، إذ لم يعد واضحًا أي الأوامر تنتمي إلى أي وظيفة. فالشيفرة تحقق الأغراض نفسها - قراءة المُدخل، وحساب قيمة الوسيط، وما إلى ذلك - لكن بنية أقلّ وضوحًا.

تنظيم شيفرتك في دوال منفصلة سيحسّن وضوح قراءة برنامجك، كما سيجعل التعامل مع الكتل المنطقية أسهل. وهذا بدوره يساعدك على التحقق من أن البرنامج يعمل كما هو مقصود، إذ يمكن اختبار كل دالة على حدة.

ومن الاستخدامات المهمة الأخرى للدوال جعل الشيفرة _قابلة لإعادة الاستخدام_. فإذا احتجت تحقيق وظيفة ما عدة مرات في برنامجك، فمن الجيد إنشاء دالة خاصتك ومنحها اسمًا مناسبًا:

```python
print("Shoe sizes:")
shoe_sizes = input_numbers()

print("Weights:")
weights = input_numbers()

print("Heights:")
heights = input_numbers()
```

> **تمرين برمجي: طول القائمة**
>
> يُرجى كتابة دالة اسمها `length` تأخذ قائمة كوسيط لها، وتُرجع طول القائمة.

```python
my_list = [1, 2, 3, 4, 5]
result = length(my_list)
print("The length is", result)

# the list given as an argument doesn't need to be stored in any variable
result = length([1, 1, 1, 1])
print("The length is", result)
```


```
The length is 5
The length is 4
```


> **تمرين برمجي: المتوسط الحسابي**
>
> يُرجى كتابة دالة اسمها `mean` تأخذ قائمة من الأعداد الصحيحة كوسيط لها. وتُعيد الدالة المتوسط الحسابي للقيم في القائمة.

```python
my_list = [1, 2, 3, 4, 5]
result = mean(my_list))
print("mean value is", result)
```


```
mean value is 3.0
```


> **تمرين برمجي: مدى القائمة**
>
> يُرجى كتابة دالة اسمها `range_of_list` تأخذ قائمة من الأعداد الصحيحة كوسيط لها. وتُعيد الدالة الفرق بين القيمة الصغرى والعظمى في القائمة.


```python
my_list = [1, 2, 3, 4, 5]
result = range_of_list(my_list))
print("The range of the list is", result)
```


```
The range of the list is 4
```



هناك طرق كثيرة أخرى لاستخدام القوائم في Python. و[توثيق](https://docs.python.org/3/tutorial/datastructures.html) Python مكان جيد للبدء إن أردت معرفة المزيد.

<!---

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 4849cd69-1938-5f4f-8805-8445f0f5c015)

-->
