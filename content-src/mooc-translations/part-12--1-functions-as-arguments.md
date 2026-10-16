---
title: "الدوال كوسائط"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون قادرًا على ترتيب القوائم وفق معايير مختلفة
> - ستعرف ما هو تعبير lambda
> - ستكون قادرًا على استخدام تعبير lambda مع دوال Python الأخرى
> - ستعرف كيف تُمرَّر دالة كوسيط إلى دالة أخرى


نحن نعرف بالفعل التابع `sort` والدالة `sorted`، اللذين يُستخدمان لترتيب القوائم وفق ترتيبها الطبيعي. وبالنسبة إلى الأعداد والسلاسل النصية يعمل هذا على ما يرام عادةً. أما فيما هو أعقد من ذلك، فالترتيب الذي تعتبره Python الترتيب الطبيعي للعناصر ليس دائمًا هو ما نقصده نحن كمبرمجين.

مثلًا، تُرتَّب قائمة الصفوف افتراضيًا بناءً على العنصر الأول في كل صف:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

products.sort()

for product in products:
    print(product)
```


```
('apple', 3.95)
('banana', 5.95)
('orange', 4.5)
('watermelon', 4.95)
```


لكن ماذا لو أردنا ترتيب القائمة بناءً على السعر؟

## الدوال كوسائط

يقبل تابع الترتيب أو دالته عادةً وسيطًا ثانيًا اختياريًا يتيح لك تجاوز معايير الترتيب الافتراضية. وهذا الوسيط الثاني دالة تحدّد كيف تُحسب قيمة كل عنصر في القائمة. وأثناء ترتيب القائمة تستدعي Python هذه الدالة عندما تقارن العناصر بعضها ببعض.

لننظر إلى مثال:

```python
def order_by_price(item: tuple):
    # Return the price, which is the second item within the tuple
    return item[1]

if __name__ == "__main__":
    products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

    # Use the function order_by_price for sorting
    products.sort(key=order_by_price)

    for product in products:
        print(product)
```


```
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)
```


الآن أُرتّبت القائمة بناءً على أسعار العناصر، لكن ما الذي يحدث فعليًا في البرنامج؟

الدالة `order_by_price` بسيطة في الواقع. فهي تأخذ عنصرًا واحدًا كوسيط لها وتعيد قيمة لذلك العنصر. وبشكل أكثر تحديدًا، تعيد العنصر الثاني في الصف، وهو الذي يمثّل السعر. لكن بعد ذلك لدينا سطر الشيفرة هذا، حيث يُستدعى التابع `sort`:

`products.sort(key=order_by_price)`

هنا يُستدعى التابع `sort` بدالة كوسيط له. وليس هذا إشارة إلى القيمة التي تعيدها الدالة، بل إشارة إلى _الدالة نفسها_. ويستدعي التابع `sort` هذه الدالة مرات عديدة، مستخدمًا كل عنصر في القائمة كوسيط له بالتناوب.

إذا أضفنا أمر `print` إضافيًا إلى تعريف الدالة `order_by_price`، فيمكننا التحقق من أن الدالة تُستدعى فعلًا مرة واحدة مقابل كل عنصر في القائمة:

```python
def order_by_price(item: tuple):
    # Print the item
    print(f"Function call: order_by_price({item})")

    # Return the price, which is the second item within the tuple
    return item[1]


products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Use the function order_by_price for sorting
products.sort(key=order_by_price)

for product in products:
    print(product)
```


```
Function call: order_by_price(('banana', 5.95))
Function call: order_by_price(('apple', 3.95))
Function call: order_by_price(('orange', 4.5))
Function call: order_by_price(('watermelon', 4.95))
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)
```


ويمكن _عكس_ الترتيب بوسيط مسمّى آخر؛ وهو `reverse`، المتاح مع كلٍّ من التابع `sort` والدالة `sorted`:

```python
products.sort(key=order_by_price, reverse=True)

t2 = sorted(products, key=order_by_price, reverse=True)
```

## تعريف دالة داخل تعريف دالة

يمكننا أيضًا أن نضيف دالة مسمّاة لوظيفة الترتيب الجديدة القائمة على السعر التي أنشأناها. لنضف دالة اسمها `sort_by_price`:

```python
def order_by_price(item: tuple):
    return item[1]

def sort_by_price(items: list):
    # use the order_by_price function here
    return sorted(items, key=order_by_price)

products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

for product in sort_by_price(products):
    print(product)
```

إذا علمنا أن الدالة المساعدة `order_by_price` لا تُستخدم في أي مكان خارج الدالة `sort_by_price`، فيمكننا وضع تعريف الدالة الأولى داخل تعريف الدالة الثانية:

```python
def sort_by_price(items: list):
    # helper function defined within the function
    def order_by_price(item: tuple):
        return item[1]

    return sorted(items, key=order_by_price)
```

> **تمرين برمجي: الترتيب حسب المخزون المتبقي**
>
> يُرجى كتابة دالة اسمها `sort_by_remaining_stock(items: list)`. تأخذ الدالة قائمة صفوف كوسيط لها. وتتكوّن الصفوف من اسم المنتج وسعره ومخزونه المتبقي. وينبغي أن تعيد الدالة قائمة جديدة تُرتَّب فيها العناصر وفق المخزون المتبقي، بدءًا من القيمة الأصغر. ولا ينبغي تغيير القائمة الأصلية.

ينبغي أن تعمل الدالة هكذا:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22)]

for product in sort_by_remaining_stock(products):
    print(f"{product[0]} {product[2]} pcs")
```


```
orange 2 pcs
apple 3 pcs
banana 12 pcs
watermelon 22 pcs
```


> **تمرين برمجي: الترتيب حسب عدد المواسم**
>
> يُرجى كتابة دالة اسمها `sort_by_seasons(items: list)` تأخذ قائمة قواميس كوسيط لها. ويحتوي كل قاموس على معلومات برنامج تلفزيوني واحد. وينبغي أن ترتّب الدالة هذه القائمة وفق عدد المواسم التي يضمّها كل برنامج، ترتيبًا تصاعديًا. ولا ينبغي أن تغيّر الدالة القائمة الأصلية، بل أن تعيد قائمة جديدة بدلًا منها.

ينبغي أن تعمل الدالة هكذا:

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

for show in sort_by_seasons(shows):
    print(f"{show['name']} {show['seasons']} seasons")
```


```
Dexter 9 seasons
Friends 10 seasons
Simpsons 32 seasons
```


> **تمرين برمجي: الترتيب حسب التقييمات**
>
> يُرجى كتابة دالة اسمها `sort_by_ratings(items: list)` تأخذ قائمة قواميس كوسيط لها. وبنية القواميس مطابقة للتمرين السابق. وينبغي أن ترتّب هذه الدالة القواميس _ترتيبًا تنازليًا بناءً على تقييمات البرامج_. ولا ينبغي أن تغيّر الدالة القائمة الأصلية، بل أن تعيد قائمة جديدة بدلًا منها.

```python
shows = [{ "name": "Dexter", "rating" : 8.6, "seasons":9 }, { "name": "Friends", "rating" : 8.9, "seasons":10 },  { "name": "Simpsons", "rating" : 8.7, "seasons":32 }  ]

print("Rating according to IMDB")
for show in sort_by_ratings(shows):
    print(f"{show['name']}  {show['rating']}")
```


```
Rating according to IMDB
Friends 8.9
Simpsons 8.7
Dexter 8.6
```


## ترتيب مجموعات كائناتك الخاصة

وباستخدام المبدأ نفسه، لنكتب برنامجًا يرتّب قائمة كائنات من صنف `Student` الخاص بنا بطريقتين مختلفتين:

```python
class Student:
    """ The class models a single student """
    def __init__(self, name: str, id: str, credits: int):
        self.name = name
        self.id = id
        self.credits = credits

    def __str__(self):
        return f"{self.name} ({self.id}), {self.credits} cr."


def by_id(item: Student):
    return item.id

def by_credits(item: Student):
    return item.credits


if __name__ == "__main__":
    o1 = Student("Archie", "a123", 220)
    o2 = Student("Marvin", "m321", 210)
    o3 = Student("Anna", "a999", 131)

    students = [o1, o2, o3]

    print("Sort by id:")
    for student in sorted(students, key=by_id):
        print(student)

    print()

    print("Sort by credits:")
    for student in sorted(students, key=by_credits):
        print(student)
```


```
Sort by id:
Archie (a123), 220 cr.
Anna (a999), 131 cr.
Marvin (m321), 210 cr.

Sort by credits:
Anna (a999), 131 cr.
Marvin (m321), 210 cr.
Archie (a123), 220 cr.
```


كما ترى أعلاه، يعمل الترتيب وفق معايير مختلفة تمامًا كما هو مقصود. وإذا لم تكن الدالتان `by_id` و`by_credits` مطلوبتين في مكان آخر، فهناك طرق لجعل التنفيذ أبسط. وسنعود إلى هذا الموضوع بعد هذه التمارين.

> **تمرين برمجي: ClimbingRoute**
>
> يحتوي قالب التمرين على تعريف صنف `ClimbingRoute`. وهو يعمل هكذا:

```python
route1 = ClimbingRoute("Edge", 38, "6A+")
route2 = ClimbingRoute("Smooth operator", 11, "7A")
route3 = ClimbingRoute("Synchro", 14, "8C+")


print(route1)
print(route2)
print(route3.name, route3.length, route3.grade)
```


```
Edge, length 38 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A
Synchro 14 8C+
```


## الترتيب حسب الطول

يُرجى كتابة دالة اسمها `sort_by_length(routes: list)` تعيد قائمة جديدة من المسارات، مرتّبة حسب الطول من الأطول إلى الأقصر.

ينبغي أن تعمل الدالة هكذا:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]

for route in sort_by_length(routes):
    print(route)
```


```
Edge, length 38 metres, grade 6A+
Synchro, length 14 metres, grade 8C+
Small steps, length 12 metres, grade 6A+
Smooth operator, length 11 metres, grade 7A
```


## الترتيب حسب الصعوبة

يُرجى كتابة دالة اسمها `sort_by_difficulty(routes: list)` تعيد قائمة جديدة من المسارات، مرتّبة حسب الصعوبة، أي حسب الدرجة، من الأصعب إلى الأسهل. وبالنسبة إلى المسارات ذات الدرجة نفسها، يكون الأطول أصعب. وتدرّج درجات مسارات التسلّق هو _4, 4+, 5, 5+, 6A, 6A+, ..._، وهو ما يعادل عمليًا الترتيب الأبجدي للسلاسل النصية.

ينبغي أن تعمل الدالة هكذا:

```python
r1 = ClimbingRoute("Edge", 38, "6A+")
r2 = ClimbingRoute("Smooth operator", 11, "7A")
r3 = ClimbingRoute("Synchro", 14, "8C+")
r4 = ClimbingRoute("Small steps", 12, "6A+")

routes = [r1, r2, r3, r4]
for route in sort_by_difficulty(routes):
    print(route)
```


```
Synchro, length 14 metres, grade 8C+
Smooth operator, length 11 metres, grade 7A
Edge, length 38 metres, grade 6A+
Small steps, length 12 metres, grade 6A+
```


**تلميح:** إذا كان الترتيب مبنيًا على قائمة أو صف، فإن Python ترتّب العناصر افتراضيًا أولًا بناءً على العنصر الأول، ثم بناءً على العنصر الثاني، وهكذا:

```python
my_list = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(my_list))
```


```
[('a', 2), ('a', 4), ('b', 0), ('b', 30)]
```


> **تمرين برمجي: مناطق التسلّق**
>
> بالإضافة إلى الصنف `ClimbingRoute` من التمرين السابق، يحتوي قالب التمرين على تعريف صنف `ClimbingArea`.

```python
ca1 = ClimbingArea("Olhava")
ca1.add_route(ClimbingRoute("Edge", 38, "6A+"))
ca1.add_route(ClimbingRoute("Great cut", 36, "6B"))
ca1.add_route(ClimbingRoute("Swedish route", 42, "5+"))

ca2 = ClimbingArea("Nummi")
ca2.add_route(ClimbingRoute("Synchro", 14, "8C+"))

ca3 = ClimbingArea("Nalkkila slab")
ca3.add_route(ClimbingRoute("Small steps", 12, "6A+"))
ca3.add_route(ClimbingRoute("Smooth operator", 11, "7A"))
ca3.add_route(ClimbingRoute("Piggy not likey", 12 , "6B+"))
ca3.add_route(ClimbingRoute("Orchard", 8, "6A"))

print(ca1)
print(ca3.name, ca3.routes())
print(ca3.hardest_route())
```


```
Olhava, 3 routes, hardest 6B
Nalkkila slab 4
Smooth operator, length 9 metres, grade 7A
```


## الترتيب حسب عدد المسارات

يُرجى كتابة دالة اسمها `sort_by_number_of_routes` ترتّب مناطق التسلّق ترتيبًا تصاعديًا بناءً على عدد المسارات في كل منها.

```python
# ca1, ca2 and ca3 declared as above
areas = [ca1, ca2, ca3]
for area in sort_by_number_of_routes(areas):
    print(area)

```


```
Nummi, 1 routes, hardest 8C+
Olhava, 3 routes, hardest 6B
Nalkkila slab, 4 routes, hardest 7A
```


## الترتيب حسب أصعب مسار

يُرجى كتابة دالة اسمها `sort_by_most_difficult` ترتّب مناطق التسلّق ترتيبًا _تنازليًا_ بناءً على أصعب مسار في كل منطقة.

```python
# ca1, ca2 and ca3 declared as above
areas = [ca1, ca2, ca3]
for area in sort_by_most_difficult(areas):
    print(area)
```


```
Nummi, 1 routes, hardest 8C+
Nalkkila slab, 4 routes, hardest 7A
Olhava, 3 routes, hardest 6B
```


## تعبيرات lambda

لقد تعاملنا مع الدوال في معظم الأحيان من منظور التقسيم إلى وحدات. وصحيح أن للدوال دورًا مهمًا في إدارة تعقيد برامجك وتجنّب تكرار الشيفرة. وتُكتب الدوال عادةً بحيث يمكن استخدامها مرات عديدة.

لكنك تحتاج أحيانًا إلى شيء يشبه الدالة تستخدمه مرة واحدة فقط. وتتيح لك تعبيرات lambda إنشاء دوال صغيرة مجهولة تُنشأ (وتُهمَل) عند الحاجة إليها في الشيفرة. والصيغة العامة هي كما يلي:

`lambda <parameters> : <expression>`

ترتيب قائمة صفوف حسب العنصر الثاني في كل صف سيبدو هكذا عند تنفيذه بتعبير lambda:

```python
products = [("banana", 5.95), ("apple", 3.95), ("orange", 4.50), ("watermelon", 4.95)]

# Function is created "on the fly" with a lambda expression:
products.sort(key=lambda item: item[1])

for product in products:
    print(product)
```


```
('apple', 3.95)
('orange', 4.5)
('watermelon', 4.95)
('banana', 5.95)
```


التعبير

`lambda item: item[1]`

مكافئ لتعريف الدالة

```python
def price(item):
    return item[1]
```

إلا أن دالة lambda لا تملك اسمًا. ولهذا تُسمّى دوال lambda الدوال المجهولة.

ومن كل ناحية أخرى لا تختلف دالة lambda عن أي دالة أخرى، ويمكن استخدامها في السياقات جميعها التي تُستخدم فيها أي دالة مسمّاة مكافئة. فمثلًا، يرتّب البرنامج التالي قائمة سلاسل نصية أبجديًا حسب المحرف _الأخير_ في كل سلسلة نصية:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: word[-1]):
    print(word)
```


```
Minnie
Mack
Merl
Marvin
Mickey
```


يمكننا أيضًا الجمع بين إدراكات القوائم والتابع `join` وتعبيرات lambda. فمثلًا، يمكننا ترتيب السلاسل النصية بناءً على حروف العلة فيها فقط، مع تجاهل كل المحارف الأخرى:

```python
strings = ["Mickey", "Mack", "Marvin", "Minnie", "Merl"]

for word in sorted(strings, key=lambda word: "".join([c for c in word if c in "aeiou"])):
    print(word)
```


```
Mack
Marvin
Merl
Mickey
Minnie
```


يمكن أيضًا استخدام الدوال المجهولة مع دوال Python المدمجة الأخرى، وليس فقط مع الدوال المستخدمة في الترتيب. فمثلًا، تأخذ الدالتان `min` و`max` أيضًا وسيطًا مسمّى اسمه `key`. ويُستخدم كمعيار لمقارنة العناصر عند اختيار القيمة الصغرى أو العظمى.

في المثال التالي نتعامل مع تسجيلات صوتية. أولًا نختار أقدم تسجيل، ثم الأطول:

```python

class Recording:
    """ The class models a single audio recording """
    def __init__(self, name: str, performer: str, year: int, runtime: int):
        self.name = name
        self.performer = performer
        self.year = year
        self.runtime = runtime


    def __str__(self):
        return f"{self.name} ({self.performer}), {self.year}. {self.runtime} min."

if __name__ == "__main__":
    r1 = Recording("Nevermind", "Nirvana", 1991, 43)
    r2 = Recording("Let It Be", "Beatles", 1969, 35)
    r3 = Recording("Joshua Tree", "U2", 1986, 50)

    recordings = [r1, r2, r3]


    print("The oldest recording:")
    print(min(recordings, key=lambda rec: rec.year))

    print("The longest recording:")
    print(max(recordings, key=lambda rec: rec.runtime))
```


```
The oldest recording:
Let It Be (Beatles), 1969. 35 min.
The longest recording:
U2 (Joshua Tree), 1986. 50 min.
```


> **تمرين برمجي: BallPlayers**
>
> يحتوي قالب التمرين على تعريف صنف اسمه `BallPlayer`. وله الخواص العامة التالية:

* الاسم
* رقم القميص `number`
* الأهداف المسجّلة `goals`
* التمريرات الحاسمة المكتملة `assists`
* الدقائق الملعوبة `minutes`

يُرجى تنفيذ الدوال التالية. ملاحظة: لكل دالة نوع مختلف من القيم المُعادة.

## الأكثر أهدافًا

يُرجى كتابة دالة اسمها `most_goals` تأخذ قائمة لاعبي كرة كوسيط لها.

ينبغي أن تعيد الدالة اسم اللاعب الذي سجّل أكثر عدد من الأهداف، بصيغة سلسلة نصية.

## الأكثر نقاطًا

يُرجى كتابة دالة اسمها `most_points` تأخذ قائمة لاعبي كرة كوسيط لها.

ينبغي أن تعيد الدالة صفًا يحتوي على اسم اللاعب ورقم قميصه الذي سجّل أكثر عدد من النقاط. والعدد الإجمالي للنقاط هو مجموع عدد الأهداف وعدد التمريرات الحاسمة.

## الأقل دقائق

يُرجى كتابة دالة اسمها `least_minutes` تأخذ قائمة لاعبي كرة كوسيط لها.

ينبغي أن تعيد الدالة كائن `BallPlayer` الذي له أصغر قيمة من الدقائق الملعوبة.

يمكنك اختبار دوالك بالبرنامج التالي:

```python
if __name__ == "__main__":
    player1 = BallPlayer("Archie Bonkers", 13, 5, 12, 46)
    player2 = BallPlayer("Speedy Tickets", 7, 2, 26, 55)
    player3 = BallPlayer("Cruella De Hill", 9, 1, 32, 26)
    player4 = BallPlayer("Devilled Tasmanian", 12, 1, 11, 41)
    player5 = BallPlayer("Donald Quack", 4, 3, 9, 12)
    
    team = [player1, player2, player3, player4, player5]
    print(most_goals(team))
    print(most_points(team))
    print(least_minutes(team))
```

سيطبع هذا ما يلي:


```
Archie Bonkers
('Cruella De Hill', 9)
BallPlayer(name=Donald Quack, number=4, goals=3, passes=9, minutes=12)
```


## الدوال كوسائط داخل دوالك الخاصة

أثبتنا أعلاه أنه يمكن تمرير إشارة إلى دالة كوسيط إلى دالة أخرى. ولنختم هذا القسم بكتابة دالتنا الخاصة التي تأخذ دالة كوسيط لها.

```python
# the type hint "callable" refers to a function
def perform_operation(operation: callable):
    # Call the function which was passed as an argument
    return operation(10, 5)

def my_sum(a: int, b: int):
    return a + b

def my_product(a: int, b: int):
    return a * b


if __name__ == "__main__":
    print(perform_operation(my_sum))
    print(perform_operation(my_product))
    print(perform_operation(lambda x,y: x - y))

```


```
15
50
5
```


تعتمد القيمة التي تعيدها الدالة `perform_operation` على الدالة التي مُرّرت كوسيط. وأي دالة تقبل وسيطين ستفي بالغرض، سواء كانت مجهولة أو مسمّاة.

قد لا يكون تمرير إشارات إلى دوال كوسائط إلى دوال أخرى شيئًا ستفعله يوميًا في مسيرتك البرمجية، لكنه قد يكون تقنية مفيدة. ويختار البرنامج التالي بعض الأسطر من ملف ويكتبها في ملف آخر. وتُحدَّد طريقة اختيار الأسطر بدالة تعيد `True` فقط إذا كان ينبغي نسخ الأسطر:

```python
def copy_lines(source_file: str, target_file: str, criterion= lambda x: True):
    with open(source_file) as source, open(target_file, "w") as target:
        for line in source:
            # Remove any whitespace from beginning and end of line
            line = line.strip()

            if criterion(line):
                target.write(line + "\n")

# Some examples
if __name__ == "__main__":
    # If the third parameter is not given, copy all lines
    copy_lines("first.txt", "second.txt")

    # Copy all non-empty lines
    copy_lines("first.txt", "second.txt", lambda line: len(line) > 0)

    # Copy all lines which contain the word "Python"
    copy_lines("first.txt", "second.txt", lambda line: "Python" in line)

    # Copy all lines which do not end in a full stop
    copy_lines("first.txt", "second.txt", lambda line: line[-1] != ".")
```

يحتوي تعريف الدالة على قيمة افتراضية للمعامل المسمّى `criterion`، وهي `lambda x: True`. وتعيد هذه الدالة المجهولة دائمًا `True` بصرف النظر عن المُدخَل. لذا فالسلوك الافتراضي هو نسخ كل الأسطر. وكالمعتاد، إذا مُنحت قيمة لمعامل له قيمة افتراضية، فإن القيمة الجديدة تحلّ محلّ القيمة الافتراضية.

> **تمرين برمجي: البحث عن منتج**
>
> يتعامل هذا التمرين مع منتجات مخزّنة في صفوف. وتفترض الأمثلة كلها متغيّرًا اسمه `products`، مُسنَدًا إليه القيمة التالية:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22), ("kale", 0.99, 1)]
```

يحتوي كل صف على ثلاثة عناصر: الاسم والسعر والكمية.

يُرجى كتابة دالة اسمها `search(products: list, criterion: callable)`. والوسيط الثاني للدالة هو دالة بنفسها، وينبغي أن تكون قادرة على معالجة صف كما هو معرّف أعلاه، وأن تعيد قيمة منطقية. وينبغي أن تعيد دالة البحث قائمة جديدة تحتوي على تلك الصفوف من القائمة الأصلية التي تستوفي المعيار.

إذا أردنا تضمين المنتجات التي كان سعرها أقل من 4 يورو فقط، فيمكننا استخدام دالة المعيار التالية:

```python
def price_under_4_euros(product):
    return product[1] < 4
```

تعيد الدالة `True` إذا كانت قيمة العنصر الثاني في الصف أقل من أربعة.

مثال على استخدام دالة `search`:

```python
for product in search(products, price_under_4_euros):
    print(product)
```


```
('apple', 3.95, 3)
('kale', 0.99, 1)
```


يمكن أن تكون دالة المعيار أيضًا دالة lambda. وإذا أردنا البحث عن المنتجات التي كانت كميتها 11 على الأقل فقط، فيمكننا كتابة ما يلي:

```python
for product in search(products, lambda t: t[2]>10):
    print(product)
```


```
('banana', 5.95, 12)
('watermelon', 4.95, 22)
```
