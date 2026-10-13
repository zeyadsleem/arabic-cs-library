---
title: "الدوال كوسائط (Arguments)"
lang: ar
source: "https://programming-26.mooc.fi/part-12/1-functions-as-arguments"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to sort lists according to different criteria
- You will know what a lambda expression is
- You will be able to use lambda expression with other Python functions
- You will know how a function is passed as an argument to another function

</text-box>

نحن بالفعل على دراية بالطريقة `sort` والدالة `sorted`، اللتين تُستخدمان لترتيب القوائم في ترتيبها الطبيعي. للأرقام والنصوص، هذا يعمل عادةً بشكل جيد. ومع ذلك، لأي شيء أكثر تعقيدًا من ذلك، ما يعتبره Python الترتيب الطبيعي للعناصر ليس دائمًا ما كان يقصده المبرمجون.

على سبيل المثال، قائمة من الأزواج (tuples) تُرتّب افتراضيًا بناءً على العنصر الأول من كل زوج:

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

## الدوال كوسائط (Functions as arguments)

طريقة الترتيب أو دالة الترتيب عادةً ما تقبل وسيطًا اختياريًا ثانيًا يسمح لك بتجاوز معايير الترتيب الافتراضية. هذا الوسيط الثاني هو دالة تحدد كيفية تحديد قيمة كل عنصر في القائمة. أثناء ترتيب القائمة، تستدعي Python هذه الدالة عند مقارنة العناصر ببعضها البعض.

لنلقِ نظرة على مثال:

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


الآن القائمة مرتبة بناءً على أسعار العناصر، لكن ماذا يحدث حقًا في البرنامج؟

الدالة `order_by_price` بسيطة جدًا. تأخذ عنصرًا واحدًا كوسيط وتُعيد قيمة لذلك العنصر. تحديدًا، تُعيد العنصر الثاني في الزوج (tuple)، الذي يمثل السعر. لكن لدينا هذا السطر من الكود، حيث يتم استدعاء الطريقة `sort`:

`products.sort(key=order_by_price)`

هنا يتم استدعاء طريقة `sort` مع دالة كوسيط لها. هذا ليس إشارة إلى قيمة الإرجاع للدالة، بل إشارة إلى **الدالة نفسها**. تستدعي طريقة `sort` هذه الدالة عدة مرات، باستخدام كل عنصر في القائمة كوسيط بالتتابع.

إذا أضفنا عبارة طباعة إضافية في تعريف الدالة `order_by_price`، يمكننا التحقق من أن الدالة تُستدعى مرة واحدة لكل عنصر في القائمة:

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


يمكن **عكس** الترتيب باستخدام وسيط مفتاحي آخر؛ `reverse`، المتاح مع كل من طريقة `sort` والدالة `sorted`:

```python
products.sort(key=order_by_price, reverse=True)

t2 = sorted(products, key=order_by_price, reverse=True)
```

## تعريف دالة داخل تعريف دالة (A function definition within a function definition)

يمكننا أيضًا تضمين دالة مسماة لوظيفة الترتيب الجديدة المستندة إلى السعر التي أنشأناها. لنضيف دالة باسم `sort_by_price`:

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

إذا علمنا أن الدالة المساعدة `order_by_price` غير مستخدمة في أي مكان خارج دالة `sort_by_price`، يمكننا وضع تعريف الدالة الأولى داخل تعريف الثانية:

```python
def sort_by_price(items: list):
    # helper function defined within the function
    def order_by_price(item: tuple):
        return item[1]

    return sorted(items, key=order_by_price)
```

> **تمرين برمجي: تمرين برمجي**
>
> يرجى كتابة دالة باسم `sort_by_remaining_stock(items: list)`. الدالة تأخذ قائمة من الأزواج (tuples) كوسيط. تتكون الأزواج من اسم وسعر ومخزون متبقٍ لمنتج. يجب أن تُعيد الدالة قائمة جديدة، حيث يتم ترتيب العناصر وفقًا للمخزون المتبقي، من أقل قيمة إلى أعلى. القائمة الأصلية لا يجب أن تتغير.

يجب أن تعمل الدالة كما يلي:

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


> **تمرين برمجي: تمرين برمجي**
>
> يرجى كتابة دالة باسم `sort_by_seasons(items: list)` تأخذ قائمة من القواميس (dictionaries) كوسيط. كل قاموس يحتوي على معلومات برنامج تلفزيوني واحد. يجب أن ترتب هذه الدالة القائمة حسب عدد المواسم لكل برنامج، بترتيب تصاعدي. يجب ألا تغير الدالة القائمة الأصلية، بل تُعيد قائمة جديدة بدلاً منها.

يجب أن تعمل الدالة كما يلي:

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


> **تمرين برمجي: تمرين برمجي**
>
> يرجى كتابة دالة باسم `sort_by_ratings(items: list)` تأخذ قائمة من القواميس كوسيط. هيكل القواميس مطابق للتمرين السابق. يجب أن ترتب هذه الدالة القواميس **بترتيب تنازلي بناءً على تقييمات البرامج**. يجب ألا تغير الدالة القائمة الأصلية، بل تُعيد قائمة جديدة بدلاً منها.

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


## ترتيب مجموعات من كائناتك الخاصة (Sorting collections of your own objects)

باستخدام نفس المبدأ، لنكتب برنامجًا يرتّب قائمة من كائنات فئة `Student` الخاصة بنا بطريقتين مختلفتين:

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


كما ترى أعلاه، الترتيب بمعايير مختلفة يعمل تمامًا كما هو مقصود. إذا لم تكن الدالتان `by_id` و `by_credits` مطلوبتين في مكان آخر، هناك طرق لجعل التنفيذ أبسط. سنعود لهذا الموضوع بعد هذه التمارين.

> **تمرين برمجي: تمرين برمجي**
>
> قالب التمرين يحتوي على تعريف فئة `ClimbingRoute`. تعمل كما يلي:

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


## الترتيب حسب الطول (Sort by length)

يرجى كتابة دالة باسم `sort_by_length(routes: list)` تُعيد قائمة جديدة من المسارات، مرتبة حسب الطول من الأطول إلى الأقصر.

يجب أن تعمل الدالة كما يلي:

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


## الترتيب حسب الصعوبة (Sort by difficulty)

يرجى كتابة دالة باسم `sort_by_difficulty(routes: list)` تُعيد قائمة جديدة من المسارات، مرتبة حسب الصعوبة، أي الدرجة، من الأصعب إلى الأسهل. للمسارات ذات نفس الدرجة، الأطول هو الأصعب. مقياس درجات مسارات التسلق هو _4, 4+, 5, 5+, 6A, 6A+, ..._، والذي يعمل عمليًا كترتيب أبجدي للنصوص (strings).

يجب أن تعمل الدالة كما يلي:

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


**تلميح:** إذا كان الترتيب يعتمد على قائمة أو زوج (tuple)، افتراضيًا Python ترتب العناصر أولاً بناءً على العنصر الأول، ثم بناءً على العنصر الثاني، وهكذا:

```python
my_list = [("a", 4),("a", 2),("b", 30), ("b", 0) ]
print(sorted(my_list))
```


```
[('a', 2), ('a', 4), ('b', 0), ('b', 30)]
```


> **تمرين برمجي: تمرين برمجي**
>
> بالإضافة إلى `ClimbingRoute` من التمرين السابق، قالب التمرين يحتوي على تعريف فئة `ClimbingArea`.

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


## الترتيب حسب عدد المسارات (Sort by number of routes)

يرجى كتابة دالة باسم `sort_by_number_of_routes` ترتّب مناطق التسلق بترتيب تصاعدي بناءً على عدد المسارات في كل منها.

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


## الترتيب حسب أصعب مسار (Sort by the most difficult route)

يرجى كتابة دالة باسم `sort_by_most_difficult` ترتّب مناطق التسلق **بترتيب تنازلي** بناءً على أصعب مسار في كل منطقة.

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


## تعابير لامدا (Lambda expressions)

عملنا في الغالب مع الدوال من منظور التركيبية (modularity). صحيح أن الدوال تلعب دورًا مهمًا في إدارة تعقيد برامجك وتجنب تكرار الكود. الدوال عادةً تُكتب بحيث يمكن استخدامها عدة مرات.

لكن في بعض الأحيان تحتاج إلى شيء يشبه الدالة ستستخدمه مرة واحدة فقط. تعابير لامدا (Lambda expressions) تسمح لك بإنشاء دوال صغيرة مجهولة (anonymous) يتم إنشاؤها (والتخلص منها) عند الحاجة في الكود. بناء الجملة (syntax) العام كالتالي:

`lambda <parameters> : <expression>`

ترتيب قائمة من الأزواج (tuples) بالعنصر الثاني في كل زوج سيبدو هكذا باستخدام تعبير لامدا:

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

ما عدا حقيقة أن دالة لامدا ليس لها اسم. لهذا تُسمى دوال لامدا بالدوال المجهولة (anonymous functions).

في كل جانب آخر، دالة لامدا لا تختلف عن أي دالة أخرى، ويمكن استخدامها في جميع السياقات نفسها التي يمكن استخدام أي دالة مسماة مكافئة فيها. على سبيل المثال، البرنامج التالي يرتّب قائمة من النصوص أبجديًا حسب **آخر** حرف في كل نص:

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


يمكننا أيضًا دمج قائمة الفهم (list comprehensions)، طريقة `join`، وتعبيرات لامدا. على سبيل المثال، يمكننا ترتيب النصوص بناءً على الحروف المتحركة (vowels) فيها فقط، متجاهلين جميع الحروف الأخرى:

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


يمكن أيضًا استخدام الدوال المجهولة مع دوال Python المضمنة (built-in) الأخرى، وليس فقط تلك المستخدمة للترتيب. على سبيل المثال، الدالتان `min` و `max` تقبلان أيضًا وسيطًا مفتاحيًا باسم `key`. يُستخدم كمعيار لمقارنة العناصر عند اختيار القيمة الأدنى أو الأعلى.

في المثال التالي نتعامل مع تسجيلات صوتية. أولاً نختار أقدم تسجيل، ثم الأطول:

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


> **تمرين برمجي: تمرين برمجي**
>
> قالب التمرين يحتوي على تعريف لفئة باسم `BallPlayer`. لها السمات العامة التالية:

* name
* رقم القميص `number`
* الأهداف المسجلة `goals`
* التمريرات الحاسمة `assists`
* الدقائق الملعوبة `minutes`

يرجى تنفيذ الدوال التالية. ملاحظة: كل دالة لها نوع إرجاع مختلف.

## أكثر الأهداف (Most goals)

يرجى كتابة دالة باسم `most_goals` تأخذ قائمة من لاعبي الكرة كوسيط.

يجب أن تُعيد الدالة اسم اللاعب الذي سجل أكبر عدد من الأهداف، بتنسيق نصي (string).

## أكثر النقاط (Most points)

يرجى كتابة دالة باسم `most_points`، تأخذ قائمة من لاعبي الكرة كوسيط.

يجب أن تُعيد الدالة زوجًا (tuple) يحتوي على اسم ورقم قميص اللاعب الذي سجل أكبر عدد من النقاط. إجمالي النقاط هو عدد الأهداف بالإضافة إلى عدد التمريرات الحاسمة.

## أقل دقائق (Least minutes)

يرجى كتابة دالة باسم `least_minutes`، تأخذ قائمة من لاعبي الكرة كوسيط.

يجب أن تُعيد الدالة كائن `BallPlayer` الذي لديه أقل قيمة للدقائق الملعوبة.

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

يجب أن يطبع هذا:


```
Archie Bonkers
('Cruella De Hill', 9)
BallPlayer(name=Donald Quack, number=4, goals=3, passes=9, minutes=12)
```


## الدوال كوسائط داخل دوالك الخاصة (Functions as arguments within your own functions)

أثبتنا أعلاه أنه يمكن تمرير مرجع إلى دالة كوسيط لدالة أخرى. لنختتم هذا القسم بكتابة دالتنا الخاصة التي تأخذ دالة كوسيط لها.

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


القيمة التي تُعيدها الدالة `perform_operation` تعتمد على أي دالة تم تمريرها كوسيط. أي دالة تقبل وسيطين ستعمل، بغض النظر عما إذا كانت مجهولة أو مسماة.

تمرير مراجع إلى دوال كوسائط لدوال أخرى قد لا يكون شيئًا ستقوم به يوميًا في مسيرتك البرمجية، لكن يمكن أن يكون تقنية مفيدة. البرنامج التالي يختار بعض الأسطر من ملف ويكتبها إلى ملف آخر. طريقة اختيار الأسطر تحددها دالة تُعيد `True` فقط إذا كان يجب نسخ الأسطر:

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

تعريف الدالة يحتوي على قيمة افتراضية للوسيط المفتاحي `criterion`: `lambda x: True`. هذه الدالة المجهولة تُعيد `True` بغض النظر عن المدخلات. لذا، السلوك الافتراضي هو نسخ جميع الأسطر. كالمعتاد، إذا تم إعطاء قيمة لوسيط له قيمة افتراضية، تحل القيمة الجديدة محل القيمة الافتراضية.

> **تمرين برمجي: تمرين برمجي**
>
> هذا التمرين يتعامل مع منتجات مخزنة في أزواج (tuples). الأمثلة كلها تفترض متغيرًا باسم `products`، المعين للقيمة التالية:

```python
products = [("banana", 5.95, 12), ("apple", 3.95, 3), ("orange", 4.50, 2), ("watermelon", 4.95, 22), ("kale", 0.99, 1)]
```

كل زوج يحتوي على ثلاثة عناصر: الاسم، السعر والكمية.

يرجى كتابة دالة باسم `search(products: list, criterion: callable)`. الوسيط الثاني للدالة هو دالة بحد ذاتها، ويجب أن تكون قادرة على معالجة زوج كما هو معرف أعلاه، وإعادة قيمة منطقية (Boolean). دالة البحث يجب أن تُعيد قائمة جديدة تحتوي على تلك الأزواج من الأصلية التي تفي بالمعيار.

إذا أردنا تضمين المنتجات التي سعرها أقل من 4 يورو فقط، يمكننا استخدام دالة المعيار التالية:

```python
def price_under_4_euros(product):
    return product[1] < 4
```

الدالة تُعيد `True` إذا كان العنصر الثاني في الزوج أقل من أربعة في القيمة.

مثال على استخدام دالة `search`:

```python
for product in search(products, price_under_4_euros):
    print(product)
```


```
('apple', 3.95, 3)
('kale', 0.99, 1)
```


دالة المعيار يمكن أن تكون أيضًا دالة لامدا. إذا أردنا البحث عن المنتجات التي كميتها 11 على الأقل، يمكننا كتابة ما يلي:

```python
for product in search(products, lambda t: t[2]>10):
    print(product)
```


```
('banana', 5.95, 12)
('watermelon', 4.95, 22)
```
