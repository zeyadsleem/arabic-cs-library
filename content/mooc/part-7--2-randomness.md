---
title: "العشوائية"
lang: ar
source: "https://programming-26.mooc.fi/part-7/2-randomness"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون مألوفًا ببعض الدوال في وحدة `random` 
> - ستكون قادرًا على الاستفادة من الأعداد العشوائية في برامجك


يركّز هذا القسم على وحدة [random](https://docs.python.org/3/library/random.html?highlight=random#module-random) من مكتبة Python القياسية. وهي تحتوي على أدوات لتوليد الأعداد العشوائية وغيرها من الوظائف العشوائية.

وتحتوي أقسام هذا الجزء من المادة على روابط كثيرة إلى [وثائق](https://docs.python.org/3/library/) مكتبة Python القياسية. ونوصي بمتابعة الروابط للتعرّف على كيفية عمل الوثائق.

## توليد عدد عشوائي

تُعيد الدالة [randint(a, b)](https://docs.python.org/3/library/random.html?highlight=random#random.randint) قيمة عدد صحيح عشوائية بين `a` و`b` ضمنا. فمثلًا، يعمل البرنامج التالي عمل حجر نرد عادي:

```python
from random import randint

print("The result of the throw:", randint(1, 6))
```

قد يطبع تنفيذ هذا ما يلي:


```
The result of the throw: 4
```


البرنامج التالي يرمي حجر النرد عشر مرات:

```python
from random import randint

for i in range(10):
    print("The result of the throw:", randint(1, 6))
```

قد يطبع تشغيل ما سبق


```
The result of the throw: 5
The result of the throw: 4
The result of the throw: 3
The result of the throw: 2
The result of the throw: 3
The result of the throw: 4
The result of the throw: 6
The result of the throw: 4
The result of the throw: 4
The result of the throw: 3
```


ملاحظة: يجدر التذكير بأن الدالة `randint` تعمل بطريقة مختلفة قليلًا عند مقارنتها، مثلًا، بالشرائح، أو بالدالة `range` التي صادفناها سابقًا. فاستدعاء الدالة `randint(1, 6)` ينتج عددًا بين 1 و6 ضمنا، أما استدعاء الدالة `range(1, 6)` فينتج نطاقًا من الأعداد من 1 إلى 5.

## المزيد من دوال العشوائية

ستخلط الدالة [shuffle](https://docs.python.org/3/library/random.html?highlight=random#random.shuffle) أي بنية بيانات تُمرَّر إليها كوسيط، في مكانها. فمثلًا، يخلط البرنامج التالي قائمة كلمات:

```python
from random import shuffle

words = ["atlas", "banana", "carrot"]
shuffle(words)
print(words)
```


```
['banana', 'atlas', 'carrot']
```


تُعيد الدالة `choice` عنصرًا مختارًا عشوائيًّا من بنية بيانات:

```python
from random import choice

words = ["atlas", "banana", "carrot"]
print(choice(words))
```


```
'carrot'
```


## أعداد اليانصيب

من الأمثلة الشائعة لدراسة العشوائية حالة أعداد اليانصيب. ولنجرّب سحب بعض أعداد اليانصيب. في فنلندا يتكوّن اليانصيب الوطني من مجموعة من 40 عددًا، يُختار منها 7 لكل سحب أسبوعي.

قد تبدو المحاولة الأولى لسحب مجموعة أعداد هكذا:

```python
from random import randint

for i in range(7):
    print(randint(1, 40))
```

لكن هذا لن ينجح على المدى الطويل، إذ قد يظهر العدد نفسه مرتين في سحب أسبوعي واحد من سبعة أعداد. ونحتاج إلى طريقة تضمن أن تكون جميع الأعداد المسحوبة فريدة.

وأحد الاحتمالات هو تخزين الأعداد المسحوبة في قائمة، وإضافة العدد فقط إذا لم يكن موجودًا فيها أصلًا. ويمكن تكرار ذلك حتى يصبح طول القائمة سبعة:

```python
from random import randint

weekly_draw = []
while len(weekly_draw) < 7:
    new_rnd = randint(1, 40)
    if new_rnd not in weekly_draw:
        weekly_draw.append(new_rnd)

print(weekly_draw)
```

ويكون النهج الأكثر إحكامًا استخدام الدالة `shuffle`:

```python
from random import shuffle

number_pool = list(range(1, 41))
shuffle(number_pool)
weekly_draw = number_pool[0:7]
print(weekly_draw)
```

والفكرة هنا أننا ننشئ أولًا قائمة تحتوي على الأعداد المتاحة من 1 إلى 40، تمامًا مثل الكرات في آلة اليانصيب. ثم تُخلط مجموعة الأعداد، وتُختار الأعداد السبعة الأولى للسحب الأسبوعي. وهذا يوفّر علينا عناء كتابة حلقة.

في الواقع، تحتوي وحدة `random` على طريقة أسهل لاختيار أعداد اليانصيب: الدالة [sample](https://docs.python.org/3/library/random.html?highlight=random#random.sample). وهي تُعيد اختيارًا عشوائيًّا بحجم محدّد من بنية بيانات معطاة:

```python
from random import sample

number_pool = list(range(1, 41))
weekly_draw = sample(number_pool, 7)
print(weekly_draw)
```

> **تمرين برمجي: أعداد اليانصيب**
>
> يُرجى كتابة دالة اسمها `lottery_numbers(amount: int, lower: int, upper: int)`، تولّد عددًا من الأعداد العشوائية بقدر ما يحدّده الوسيط الأول. وينبغي أن تقع جميع الأعداد ضمن الحدّين `lower` و`upper`. وينبغي تخزين الأعداد في قائمة وإرجاعها. وينبغي أن تكون الأعداد مرتّبة تصاعديًّا في القائمة المُعادة.

ولأن هذه أعداد يانصيب، فلا ينبغي أن يظهر أي عدد مرتين في القائمة.

ومثال على كيفية عمل الدالة:

```python
for number in lottery_numbers(7, 1, 40):
    print(number)
```


```
4
7
11
16
22
29
38
```


## من أين تأتي هذه الأعداد العشوائية؟

تستند خصائص وحدة [random](https://docs.python.org/3/library/random.html) إلى خوارزمية تولّد أعدادًا عشوائية بناءً على قيمة تهيئة معيّنة وبعض العمليات الحسابية. وتُسمّى قيمة التهيئة غالبًا _قيمة البذرة_ (seed value).

ويمكن للمستخدم تزويد قيمة البذرة بالدالة [seed](https://docs.python.org/3/library/random.html?highlight=random#random.seed):

```python
from random import randint, seed

seed(1337)
# this will always produce the same "random" number
print(randint(1, 100))
```

إذا كانت لدينا دوال تعتمد على العشوائية، وحدّدنا قيمة البذرة، فستُنتج الدالة النتيجة نفسها في كل مرة تُنفَّذ فيها. وقد تختلف النتيجة مع إصدارات Python المختلفة، لكن العشوائية في جوهرها تضيع بتحديد قيمة البذرة. ويمكن أن تكون هذه ميزة مفيدة عند اختبار برنامج، مثلًا.

> **العشوائية الحقيقية**
>
> ولكي نكون دقيقين، فإن الأعداد التي توفّرها وحدة `random` ليست عشوائية حقًّا. بل هي _شبه عشوائية_ (pseudorandom). فالحواسيب في جوهرها آلات حتمية. وفي الوضع المثالي، ينبغي أن يكون بالإمكان التنبؤ بطريقة عملها حتى آخر بِت. لذا يصعب جدًّا إنشاء أعداد عشوائية حقًّا بالحاسوب. ومع ذلك، تكفي الأعداد شبه العشوائية لكثير من التطبيقات. وعندما تُطلب أعداد عشوائية حقيقية، تُولَّد قيمة البذرة عادةً من مصدر خارج الحاسوب، مثل الإشعاع الخلفي أو مستويات الضوضاء أو [مصابيح الحمم](https://blog.cloudflare.com/randomness-101-lavarand-in-production/).
>
> ولمزيد من المعلومات عن العشوائية، يُرجى الاطلاع على <a href="https://www.random.org/randomness/">random.org</a>.


> **تمرين برمجي: مولّد كلمات المرور، الجزء 1**
>
> يُرجى كتابة دالة تنشئ كلمات مرور بطول مرغوب، تتكوّن من المحارف الصغيرة a إلى z.

ومثال على كيفية عمل الدالة:

```python
for i in range(10):
    print(generate_password(8))
```


```
lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib
```


> **تمرين برمجي: مولّد كلمات المرور، الجزء 2**
>
> يُرجى كتابة نسخة محسّنة من مولّد كلمات المرور لديك. تأخذ الدالة الآن ثلاثة وسائط:

* إذا كان الوسيط الثاني `True`، ينبغي أن تحتوي كلمة المرور المولَّدة أيضًا على عدد واحد أو أكثر.
* إذا كان الوسيط الثالث `True`، ينبغي أن تحتوي كلمة المرور المولَّدة أيضًا على محرف واحد أو أكثر من هذه المحارف الخاصة: `!?=+-()#`.

وعلى الرغم من هذين الوسيطين الإضافيين، ينبغي أن تحتوي كلمة المرور دائمًا على حرف أبجدي صغير واحد على الأقل. ويمكنك أن تفترض أن الدالة لن تُستدعى إلا بمجموعات وسائط يمكن صياغتها في كلمات مرور تتبع هذه القواعد. أي أن الوسائط لن تحدّد، مثلًا، كلمة مرور بطول 2 تحتوي على عدد ومحرف خاص معًا، إذ لن يكون هناك عندئذ مكان للحرف الصغير الإلزامي.

ومثال على كيفية عمل الدالة:

```python
for i in range(10):
    print(generate_strong_password(8, True, True))
```


```
2?0n+u31
u=m4nl94
n#=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey
```


> **تمرين برمجي: رامي النرد**
>
> في هذا التمرين ستكتب بعض الدوال التي يمكن استخدامها في الألعاب التي تشمل النرد.

وعوضًا عن النرد العادي، يحدّد هذا التمرين _النرد غير المتعدّي_ (non-transitive dice). ويمكنك القراءة عنه [هنا](https://singingbanana.com/dice/article.htm) أو [مشاهدة هذا الفيديو](https://www.youtube.com/watch?v=LrIp6CKUlH8).

ستستخدم ثلاثة أحجار نرد:

- الحجر A أوجهه 3، 3، 3، 3، 3، 6
- الحجر B أوجهه 2، 2، 2، 5، 5، 5
- الحجر C أوجهه 1، 4، 4، 4، 4، 4

</pre>

يُرجى كتابة دالة اسمها `roll(die: str)`، ترمي حجر النرد الذي يحدّده الوسيط. ومثال على كيفية عمل ذلك:

```python
for i in range(20):
    print(roll("A"), " ", end="")
print()
for i in range(20):
    print(roll("B"), " ", end="")
print()
for i in range(20):
    print(roll("C"), " ", end="")
```


```
3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4
```


واكتب أيضًا دالة اسمها `play(die1: str, die2: str, times: int)`، ترمي حجري النرد معًا بعدد المرات التي يحدّدها الوسيط الثالث. وينبغي أن تُعيد الدالة صفًّا (tuple). وينبغي أن يكون العنصر الأول عدد المرات التي فاز فيها النرد الأول، والثاني عدد المرات التي فاز فيها النرد الثاني، والثالث عدد مرات التعادل.

```python
result = play("A", "C", 1000)
print(result)
result = play("B", "B", 1000)
print(result)
```


```
(292, 708, 0)
(249, 273, 478)
```


> **تمرين برمجي: كلمات عشوائية**
>
> يحتوي قالب التمرين على الملف `words.txt`، الذي يحوي بعض الكلمات الإنجليزية، كلمة في كل سطر.

يُرجى كتابة دالة اسمها `words(n: int, beginning: str)`، تُعيد قائمة تحتوي على `n` كلمة عشوائية من الملف `words.txt`. وينبغي أن تبدأ جميع الكلمات بالسلسلة النصية التي يحدّدها الوسيط الثاني. 

وينبغي ألّا تظهر الكلمة نفسها مرتين في القائمة. وإذا لم تكن هناك كلمات كافية تبدأ بالسلسلة النصية المحدّدة، ينبغي أن ترفع الدالة استثناء `ValueError`.

ومثال على عمل الدالة:

```python
word_list = words(3, "ca")
for word in word_list:
    print(word)
```


```
cat
car
carbon
```


<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: d53a6898-f390-55ef-b266-95694bcbe704)

-->
