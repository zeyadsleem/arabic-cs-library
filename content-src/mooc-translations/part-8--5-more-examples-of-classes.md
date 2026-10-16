---
title: "المزيد من أمثلة الأصناف"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون قادرًا على إنشاء أصناف أكثر تنوّعًا
> - ستعرف كيف تضيف تابع `__str__` إلى تعريفات أصنافك



## المثال 1: صنف Rectangle

لننظر إلى صنف يمثّل مستطيلًا في فضاء ثنائي الأبعاد:

```python
class Rectangle:
    def __init__(self, left_upper: tuple, right_lower: tuple):
        self.left_upper = left_upper
        self.right_lower = right_lower
        self.width = right_lower[0]-left_upper[0]
        self.height = right_lower[1]-left_upper[1]

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return self.width * 2 + self.height * 2

    def move(self, x_change: int, y_change: int):
        corner = self.left_upper
        self.left_upper = (corner[0]+x_change, corner[1]+y_change)
        corner = self.right_lower
        self.right_lower = (corner[0]+x_change, corner[1]+y_change)
```

يُنشأ كائن `Rectangle` جديد بوسيطين هما صفّان. ويحتوي هذان الصفّان على إحداثيَّي x وy للزاوية العلوية اليسرى والزاوية السفلية اليمنى. ويحسب الباني ارتفاع المستطيل وعرضه انطلاقًا من هاتين القيمتين.

يحسب التابعان `area` و`perimeter` مساحة المستطيل ومحيطه انطلاقًا من الارتفاع والعرض. ويحرّك التابع `move` المستطيل بمقدار قيمتَي x وy المُعطاتين كوسيطين.

ويُمثَّل المستطيل في نظام إحداثيات تتزايد فيه إحداثيات x من اليسار إلى اليمين، وتتزايد فيه إحداثيات y من الأعلى إلى الأسفل. وهذه طريقة شائعة للتعامل مع الإحداثيات في البرمجة، لأن اعتبار الزاوية العلوية اليسرى لشاشة الحاسوب النقطة التي يساوي فيها x وy صفرًا غالبًا أسهل وأكثر طبيعية.

ويعمل البرنامج التالي على اختبار صنف `Rectangle`:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle.left_upper)
print(rectangle.right_lower)
print(rectangle.width)
print(rectangle.height)
print(rectangle.perimeter())
print(rectangle.area())

rectangle.move(3, 3)
print(rectangle.left_upper)
print(rectangle.right_lower)
```


```
(1, 1)
(4, 3)
3
2
10
6
(4, 4)
(7, 6)
```


## طباعة كائن

حين يكون لديك كائن أُنشئ من صنف عرّفته بنفسك، لا تكون الاستجابة الافتراضية لاستدعاء الأمر `print` بذلك الكائن كوسيط له مفيدة كثيرًا:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle)
```

وينبغي أن تبدو المخرجات المطبوعة على نحو يشبه هذا:


```
<__main__.Rectangle object at 0x000002D7BF148A90>
```


ومن الواضح أننا نريد تحكّمًا أكبر بما يُطبع. وأسهل طريقة لفعل ذلك هي إضافة تابع خاص هو `__str__` إلى تعريف الصنف. والغرض منه إرجاع صورة عن حالة الكائن بصيغة سلسلة نصية. وإذا احتوى تعريف الصنف على تابع `__str__`، فإن القيمة التي يُعيدها هذا التابع هي التي تُطبع عند تنفيذ الأمر `print`.

إذًا، لنضف تعريف تابع `__str__` إلى صنفنا `Rectangle`:

```python
class Rectangle:

    # ...the rest of the class goes here the same as above...

    # This method returns the state of the object in string format
    def __str__(self):
        return f"rectangle {self.left_upper} ... {self.right_lower}"
```

والآن ينتج الأمر `print` شيئًا أكثر ملاءمة للمستخدم:

```python
rectangle = Rectangle((1, 1), (4, 3))
print(rectangle)
```


```
rectangle (1, 1) ... (4, 3)
```


وربما يُستخدم التابع `__str__` في كثير من الأحيان أكثر لصياغة تمثيل نصي للكائن بالدالة `str`، كما يظهر في البرنامج التالي:

```python
rectangle = Rectangle((1, 1), (4, 3))
str_rep = str(rectangle)
print(str_rep)
```


```
rectangle (1, 1) ... (4, 3)
```


هناك مزيد من التوابع الخاصة ذات الشرطات السفلية التي يمكن تعريفها للأصناف. ومنها التابع `__repr__`، وهو شبيه إلى حدّ ما بالتابع `__str__`. والغرض منه توفير تمثيل تقني لحالة الكائن. وسنصادف هذا التابع لاحقًا.

> **تمرين برمجي: ساعة الإيقاف**
>
> يحتوي قالب التمرين على الهيكل التالي لصنف `Stopwatch`:

```python
class Stopwatch:
    def __init__(self):
        self.seconds = 0
        self.minutes = 0
```

يُرجى الإضافة إلى تعريف الصنف بحيث يعمل كما يلي:

```python
watch = Stopwatch()
for i in range(3600):
    print(watch)
    watch.tick()
```


```
00:00
00:01
00:02
... many more lines printed out
00:59
01:00
01:01
... many, many more lines printed out
59:58
59:59
00:00
00:01
```


إذًا، يضيف التابع `tick` ثانية واحدة إلى ساعة الإيقاف. والقيمة العظمى للثواني والدقائق معًا هي 59. وينبغي أن يحتوي تعريف صنفك أيضًا على تابع `__str__` يُعيد تمثيلًا نصيًا لحالة ساعة الإيقاف، كما هو موضّح في المثال أعلاه.

**تلميح:** قد يسهّل اختبار التابع `tick` أن تضبط مؤقتًا القيمتين الابتدائيتين للثواني والدقائق على قيمة أقرب إلى 59 في الباني. وإذا غيّرت القيمتين الابتدائيتين، فتذكّر إعادتهما قبل التسليم.


> **تمرين برمجي: الساعة**
>
> يُرجى تعريف صنف جديد اسمه `Clock` يوسّع قدرات صنفك `Stopwatch`. وينبغي أن يعمل كما يلي:

```python
clock = Clock(23, 59, 55)
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)
clock.tick()
print(clock)

clock.set(12, 5)
print(clock)
```


```
23:59:55
23:59:56
23:59:57
23:59:58
23:59:59
00:00:00
00:00:01
12:05:00
```


وكما ترى أعلاه، ينبغي أن يأخذ الباني قيمًا ابتدائية للساعات والدقائق والثواني كوسائط، وأن يضبطها على النحو المناسب. ويضيف التابع `tick` ثانية واحدة إلى الساعة. ويضبط التابع `set` قيمتين جديدتين للساعات والدقائق، و_يضبط الثواني على صفر_.


> **تمرين برمجي: LunchCard**
>
> في Unicafe، مقصف الطلبة في جامعة هلسنكي، يمكن للطلبة أن يدفعوا ثمن غدائهم ببطاقة سحب خاصة.

في هذا التمرين ستكتب صنفًا اسمه `LunchCard`، غرضه محاكاة الوظائف التي توفّرها بطاقة السحب الخاصة بالمقصف.

### بنية الصنف الجديد

يُرجى إنشاء صنف جديد اسمه `LunchCard`.

اكتب أولًا الباني للصنف. وينبغي أن يأخذ الرصيد الابتدائي المتاح على البطاقة كوسيط، وأن يحفظه كخاصية. وهذا موفَّر لك في الهيكل أدناه.

ثم اكتب تابع `__str__` يُعيد سلسلة نصية تحتوي على الرصيد: «الرصيد هو X يورو». وينبغي أن يُطبع الرصيد المتاح بدقة منزلة عشرية واحدة. وراجع المثال أدناه لمعرفة طريقة الاستخدام.

وهذا تنفيذ هيكلي للصنف:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def __str__(self):
        pass
```

ومثال على الاستخدام:

```python
card = LunchCard(50)
print(card)
```

وينبغي أن ينتج تنفيذ ما سبق المخرجات المطبوعة التالية:


```
The balance is 50.0 euros
```


### الدفع مقابل الغداء

يُرجى تنفيذ التوابع التالية في صنفك LunchCard:

- يطرح `eat_lunch` مبلغ 2.60 يورو من الرصيد على البطاقة
- يطرح `eat_special` مبلغ 4.60 يورو من الرصيد على البطاقة

ويمكنك استخدام الدالة الرئيسية التالية لاختبار صنفك:

```python
card = LunchCard(50)
print(card)

card.eat_lunch()
print(card)

card.eat_special()
card.eat_lunch()
print(card)
```

وينبغي أن ينتج هذا المخرجات المطبوعة التالية:


```
The balance is 50.0 euros
The balance is 47.4 euros
The balance is 40.2 euros
```


وتأكّد من أن الرصيد غير مسموح له أبدًا بأن يصل إلى أعداد أقل من الصفر:

```python
card = LunchCard(4)
print(card)

card.eat_lunch()
print(card)

card.eat_lunch()
print(card)
```


```
The balance is 4.0 euros
The balance is 1.4 euros
The balance is 1.4 euros
```


وإذا لم يكن على البطاقة مال كافٍ للدفع مقابل الغداء، فينبغي ألّا يُطرح ثمن الغداء من الرصيد.

### إيداع المال على البطاقة

نفّذ التابع `deposit_money` في صنفك `LunchCard`.

ويزيد التابع الرصيد على البطاقة بالمقدار المُعطى كوسيط.

```python
card = LunchCard(10)
print(card)
card.deposit_money(15)
print(card)
card.deposit_money(10)
print(card)
card.deposit_money(200)
print(card)
```


```
The balance is 10.0 euros
The balance is 25.0 euros
The balance is 35.0 euros
The balance is 235.0 euros
```


وينبغي أن يعالج التابع الوسائط الأقل من الصفر عبر [رفع استثناء](/part-6/3-errors#raising-exceptions) من النوع `ValueError`:

```python
card = LunchCard(10)
card.deposit_money(-10)
```


```
File "testi.py", line 3, in lunchcard
ValueError: You cannot deposit an amount of money less than zero
```


**ملاحظة:** ينبغي أن _يرفع_ هذا التابع استثناءً. وراجع تعليمات رفع الاستثناءات في [الجزء 6](/part-6/3-errors#raising-exceptions). ولا ينبغي تحت أي ظرف أن يطبع التابع نفسه أي شيء — فالمثال أعلاه مخرجات مطبوعة من مفسّر Python حين صادف الاستثناء.

### عدّة بطاقات

يُرجى كتابة دالة رئيسية تحتوي على تسلسل الأحداث التالي:

- أنشئ بطاقة غداء لـ Peter. الرصيد الابتدائي على البطاقة هو 20 يورو.
- أنشئ بطاقة غداء لـ Grace. الرصيد الابتدائي على البطاقة هو 30 يورو.
- يتناول Peter وجبة خاصة
- تتناول Grace غداءً عاديًا
- _اطبع الرصيد على كل بطاقة (في سطور منفصلة، مع اسم المالك في بداية السطر)_
- يودع Peter مبلغ 20 يورو
- تتناول Grace الوجبة الخاصة
- _اطبع الرصيد على كل بطاقة (في سطور منفصلة، مع اسم المالك في بداية السطر)_
- يتناول Peter غداءً عاديًا
- يتناول Peter غداءً عاديًا
- تودع Grace مبلغ 50 يورو
- _اطبع الرصيد على كل بطاقة (في سطور منفصلة، مع اسم المالك في بداية السطر)_

جسم البرنامج الرئيسي

```python
peters_card = LunchCard(20)
graces_card = LunchCard(30)
# the rest of your main function
```

وينبغي أن تطبع دالتك الرئيسية ما يلي بالضبط:


```
Peter: The balance is 15.4 euros
Grace: The balance is 27.4 euros
Peter: The balance is 35.4 euros
Grace: The balance is 22.8 euros
Peter: The balance is 30.2 euros
Grace: The balance is 72.8 euros
```


## المثال 2: قائمة المهام

يمثّل الصنف `TaskList` التالي قائمة بالمهام:

```python
class TaskList:
    def __init__(self):
        self.tasks = []

    def add_task(self, name: str, priority: int):
        self.tasks.append((priority, name))

    def get_next(self):
        self.tasks.sort()
        # The list method pop removes and returns the last item in a list
        task = self.tasks.pop()
        # Return the name of the task (the second item in the tuple)
        return task[1]

    def number_of_tasks(self):
        return len(self.tasks)

    def clear_tasks(self):
        self.tasks = []
```

يضيف التابع `add_task` مهمة جديدة إلى القائمة. ولكل مهمة أيضًا أولوية مرتبطة بها تُستخدم في ترتيب المهام. ويزيل التابع `get_next` المهمة ذات الأولوية الأعلى في القائمة ويُعيدها. وهناك أيضًا التابع `number_of_tasks` الذي يُعيد عدد المهام في القائمة، وأخيرًا التابع `clear_tasks` الذي يفرّغ قائمة المهام.

وداخل الكائن تُخزَّن المهام في قائمة. وكل مهمة صف يحتوي على أولوية المهمة واسمها. وتُخزَّن قيمة الأولوية أولًا، بحيث تكون المهمة ذات الأولوية الأعلى آخر عنصر في القائمة عند ترتيبها. ولهذا يمكننا حينها أن نستخدم ببساطة التابع `pop` لاسترجاع العنصر ذي الأولوية الأعلى وإزالته.

يُرجى الاطلاع على البرنامج التالي مع قائمة المهام وهي قيد الاستخدام:

```python
tasks = TaskList()
tasks.add_task("studying", 50)
tasks.add_task("exercise", 60)
tasks.add_task("cleaning", 10)
print(tasks.number_of_tasks())
print(tasks.get_next())
print(tasks.number_of_tasks())
tasks.add_task("date", 100)
print(tasks.number_of_tasks())
print(tasks.get_next())
print(tasks.get_next())
print(tasks.number_of_tasks())
tasks.clear_tasks()
print(tasks.number_of_tasks())
```


```
3
exercise
2
3
date
studying
1
0
```


> **تمرين برمجي: المسلسل**
>
> ### صنف اسمه Series

يُرجى كتابة صنف اسمه `Series` بالوظائف التالية:

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
print(dexter)
```


```
Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
no ratings
```


وينبغي أن يأخذ الباني عنوان المسلسل وعدد المواسم وقائمة بأنواعه كوسائط له.

**تلميح:** كلما احتجت إلى إنتاج سلسلة نصية من قائمة تحتوي على سلاسل نصية، مع محرف فاصل تختاره بين العناصر، يمكنك استخدام التابع `join` كما يلي:

```python
genre_list = ["Crime", "Drama", "Mystery", "Thriller"]
genre_string = ", ".join(genre_list)
print(genre_string)
```


```
Crime, Drama, Mystery, Thriller
```


### إضافة تقييمات

يُرجى تنفيذ التابع `rate(rating: int)` الذي يتيح لك إضافة تقييم بين 0 و5 إلى أي كائن مسلسل. وستحتاج أيضًا إلى تعديل التابع `__str__` بحيث يطبع عدد التقييمات المُضافة ومتوسطها مقرّبًا إلى منزلة عشرية واحدة، في حال وجود تقييمات.

```python
dexter = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
dexter.rate(4)
dexter.rate(5)
dexter.rate(5)
dexter.rate(3)
dexter.rate(0)
print(dexter)
```


```
Dexter (8 seasons)
genres: Crime, Drama, Mystery, Thriller
5 ratings, average 3.4 points
```


### البحث عن مسلسلات

يُرجى تنفيذ هاتين الدالتين اللتين تتيحان لك البحث في قائمة مسلسلات: `minimum_grade(rating: float, series_list: list)` و`includes_genre(genre: str, series_list: list)`.

وهذا مثال على كيفية استخدام التوابع الجديدة:

```python
s1 = Series("Dexter", 8, ["Crime", "Drama", "Mystery", "Thriller"])
s1.rate(5)

s2 = Series("South Park", 24, ["Animation", "Comedy"])
s2.rate(3)

s3 = Series("Friends", 10, ["Romance", "Comedy"])
s3.rate(2)

series_list = [s1, s2, s3]

print("a minimum grade of 4.5:")
for series in minimum_grade(4.5, series_list):
    print(series.title)

print("genre Comedy:")
for series in includes_genre("Comedy", series_list):
    print(series.title)
```


```
a minimum rating of 4.5:
Dexter
genre Comedy:
South Park
Friends
```


تفترض الشيفرة أعلاه والاختبارات الآلية لهذا التمرين أن صنفك يحتوي على خاصية `title`. وإذا استخدمت اسم خاصية آخر للإشارة إلى اسم المسلسل، فيُرجى تغييره قبل التسليم.


يُرجى الإجابة عن استبيان سريع حول مواد هذا الأسبوع.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: e56e0522-daf3-5ab3-922a-0b23870a6e97)


