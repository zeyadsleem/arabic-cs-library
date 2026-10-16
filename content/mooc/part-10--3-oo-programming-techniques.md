---
title: "تقنيات البرمجة الكائنية"
lang: ar
source: "https://programming-26.mooc.fi/part-10/3-oo-programming-techniques"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون على دراية ببعض الاستخدامات المختلفة لاسم المتغيّر `self`
> - ستعرف كيف تُحمَّل المشغّلات (operators) في أصنافك الخاصة
> - ستكون قادرًا على إنشاء صنف قابل للتكرار (iterable)


يمكن أن يحتوي صنف على تابع يُرجع كائنًا من الصنف نفسه. فمثلًا، لدينا أدناه الصنف `Product`، الذي يُرجع تابعه `product_on_sale` كائن Product جديدًا يحمل الاسم نفسه كالأصل لكن بسعر أقل بنسبة 25٪:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    def product_on_sale(self):
        on_sale = Product(self.__name, self.__price * 0.75)
        return on_sale
```

```python
apple1 = Product("Apple", 2.99)
apple2 = apple1.product_on_sale()
print(apple1)
print(apple2)
```


```
Apple (price 2.99)
Apple (price 2.2425)
```


لنراجع غرض المتغيّر `self`: فداخل تعريف الصنف يشير إلى الكائن نفسه. وهو يُستخدم عادةً للإشارة إلى مواصفات الكائن الذاتية، أي خصائصه (attributes) وتابعاته. ويمكن استخدام المتغيّر للإشارة إلى الكائن بأكمله أيضًا، مثلًا إذا كان لا بد من إرجاع الكائن نفسه إلى شيفرة العميل. وفي المثال أدناه أضفنا التابع `cheaper` إلى تعريف الصنف. وهو يأخذ منتجًا آخر وسيطًا ويرجع الأرخص من المنتجين اثنين:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    def cheaper(self, Product):
        if self.__price < Product.price:
            return self
        else:
            return Product
```

```python
apple = Product("Apple", 2.99)
orange = Product("Orange", 3.95)
banana = Product("Banana", 5.25)

print(orange.cheaper(apple))
print(orange.cheaper(banana))
```


```
Apple (2.99)
Orange (3.95)
```


ومع أن هذا يعمل كما ينبغي، إلا أنه حالة متخصصة جدًّا من مقارنة كائنين. لكن سيكون من الأفضل لو استطعنا استخدام مشغّلات المقارنة في Python مباشرة على كائنات `Product` هذه.

## تحميل المشغّلات

تحتوي Python على بعض التوابع المدمجة المُسمّاة تسمية خاصة للتعامل مع مشغّلات الحساب والمقارنة القياسية. وتُسمى هذه التقنية _تحميل المشغّلات_ (_operator overloading_). فإذا أردت أن تتمكن من استخدام مشغّل معيّن على نسخ من أصناف عرّفتها بنفسك، فيمكنك كتابة تابع خاص يُرجع النتيجة الصحيحة للمشغّل. وقد استخدمنا هذه التقنية سابقًا مع التابع `__str__`: تعرف Python أن تبحث عن تابع بهذا الاسم عندما يُطلب تمثيل الكائن سلسلة نصية.

لنبدأ بالمشغّل `>` الذي يخبرنا هل هو أكبر من الثاني. فتعريف الصنف `Product` أدناه يحتوي على التابع `__gt__`، وهو اختصار لعبارة *g*reater *t*han (أكبر من). ويجب أن يُرجع هذا التابع المُسمّى تسمية خاصة النتيجة الصحيحة للمقارنة. وبالأخص، يجب أن يُرجع `True` إذا كان، وفقط إذا كان، الكائن الحالي أكبر من الكائن المُمرَّر وسيطًا له. ويمكن للمبرمج أن يحدّد المعايير المستخدمة في ذلك. وبالكائن _الحالي_ نعني الكائن الذي يُستدعى عليه التابع بأسلوب النقطة `.`.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    def __gt__(self, another_product):
        return self.price > another_product.price
```

في التنفيذ أعلاه، يُرجع التابع `__gt__` القيمة `True` إذا كان سعر المنتج الحالي أكبر من سعر المنتج المُمرَّر وسيطًا له. وإلا يُرجع التابع `False`.

وأصبح مشغّل المقارنة `>` متاحًا للاستخدام مع كائنات من نوع Product:

```python
orange = Product("Orange", 2.90)
apple = Product("Apple", 3.95)

if orange > apple:
    print("Orange is greater")
else:
    print("Apple is greater")
```


```
Apple is greater
```


وكما ورد أعلاه، يبقى تحديد المعايير التي يُقرر بها أيّهما أكبر وأيّهما أصغر من مسؤولية المبرمج. فمثلًا، يمكننا أن نقرر ألا يستند الترتيب إلى السعر، بل إلى ترتيب الأحرف الأبجدي للاسم. وهذا يعني أن `orange` ستكون الآن «أكبر من» `apple`، إذ تأتي `orange` متأخرة في الترتيب الأبجدي.

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    @property
    def name(self):
        return self.__name

    def __gt__(self, another_product):
        return self.name > another_product.name
```

```python
Orange = Product("Orange", 4.90)
Apple = Product("Apple", 3.95)

if Orange > Apple:
    print("Orange is greater")
else:
    print("Apple is greater")
```


```
Orange is greater
```


## مشغّلات أخرى

فيما يلي جدول يضمّ مشغّلات المقارنة القياسية، إلى جانب التوابع التي ينبغي تنفيذها إذا أردنا أن نجعلها متاحة للاستخدام على كائناتنا:

المشغّل | المعنى التقليدي | اسم التابع
:--:|:--:|:--:
`<` | أصغر من | `__lt__(self, another)`
`>` | أكبر من | `__gt__(self, another)`
`==` | يساوي | `__eq__(self, another)`
`!=` | لا يساوي | `__ne__(self, another)`
`<=` | أصغر من أو يساوي | `__le__(self, another)`
`>=` | أكبر من أو يساوي | `__ge__(self, another)`

كما يمكنك تنفيذ بعض المشغّلات الأخرى، بما في ذلك مشغّلات الحساب التالية:

المشغّل | المعنى التقليدي | اسم التابع
:--:|:--:|:--:
`+` | الجمع | `__add__(self, another)`
`-` | الطرح | `__sub__(self, another)`
`*` | الضرب | `__mul__(self, another)`
`/` | القسمة (بناتج عشري) | `__truediv__(self, another)`
`//` | القسمة (بناتج صحيح) | `__floordiv__(self, another)`

تجد مشغّلات وأسماء توابع أخرى بسهولة على الإنترنت. وتذكّر أيضًا أمر `dir` لسرد التوابع المتاحة للاستخدام على كائن معيّن.

نادرًا جدًّا ما يكون من الضروري تنفيذ جميع مشغّلات الحساب والمقارنة في أصنافك الخاصة. فمثلًا، القسمة عملية لا تكاد تكون ذات معنى خارج الكائنات العددية. فما النتيجة لو قسّمنا كائن Student على ثلاثة، أو على كائن Student آخر؟ ومع ذلك، فإن بعض هذه المشغّلات يكون مفيدًا جدًّا أيضًا مع أصنافك الخاصة. ويعتمد اختيار التوابع المراد تنفيذها على ما يتراءى منطقيًّا مع معرفة خصائص كائناتك.

لننظر إلى صنف يمثّل ملاحظة واحدة. فإذا نفّذنا التابع `__add__` داخل تعريف صنفنا، أصبح مشغّل الجمع `+` متاحًا على كائنات Note لدينا:

```python
from datetime import datetime

class Note:
    def __init__(self, entry_date: datetime, entry: str):
        self.entry_date = entry_date
        self.entry = entry

    def __str__(self):
        return f"{self.entry_date}: {self.entry}"

    def __add__(self, another):
        # The date of the new note is the current time
        new_note = Note(datetime.now(), "")
        new_note.entry = self.entry + " and " + another.entry
        return new_note
```
        
```python
entry1 = Note(datetime(2016, 12, 17), "Remember to buy presents")
entry2 = Note(datetime(2016, 12, 23), "Remember to get a tree")

# These notes can be added together with the + operator
# This calls the  __add__ method in the Note class
both = entry1 + entry2
print(both)
```


```
2020-09-09 14:13:02.163170: Remember to buy presents and Remember to get a tree
```


## التمثيل النصي للكائن

نفّذتَ بالفعل عددًا لا بأس به من التوابع `__str__` في أصنافك. وكما تعلم، يُرجع التابع التمثيل النصي للكائن. وتابع آخر شبه مماثل هو `__repr__` الذي يُرجع تمثيلًا _تقنيًّا_ للكائن. وغالبًا ما يُنفَّذ التابع `__repr__` بحيث يُرجع شيفرة البرنامج التي يمكن تنفيذها لإرجاع كائن ذي _محتوى مطابق_ للكائن الحالي.

تدوال `repr` التمثيل النصي التقني للكائن. كما يُستخدم التمثيل التقني أيضًا في كل مرة لا يكون فيها التابع `__str__` مُعرَّفًا للكائن. وسيوضّح المثال أدناه ذلك:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        
    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"
```

```python3
person1 = Person("Anna", 25)
person2 = Person("Peter", 99)
print(person1)
print(person2)
```


```
Person('Anna', 25)
Person('Peter', 99)
```


لاحظ كيف يستخدم التابع `__repr__` نفسه دالة `repr` لاسترجاع التمثيل التقني للسلسلة النصية. وهذا ضروري لإدراج محارف `'` في النتيجة.

يحتوي الصنف التالي على تعريف لكل من `__repr__` و`__str__`:

```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
        
    def __repr__(self):
        return f"Person({repr(self.name)}, {self.age})"

    def __str__(self):
        return f"{self.name} ({self.age} years)"
```

```python3
Person = Person("Anna", 25)
print(Person)
print(repr(Person))
```


```
Anna (25 years)
Person('Anna', 25)
```


يُذكر أن Python تستخدم دائمًا، مع هياكل البيانات مثل القوائم، التابع `__repr__` للتمثيل النصي للمحتوى. وقد يبدو هذا مربكًا بعض الشيء أحيانًا:

```python3
persons = []
persons.append(Person("Anna", 25))
persons.append(Person("Peter", 99))
persons.append(Person("Mary", 55))
print(persons)
```


```
[Person('Anna', 25), Person('Peter', 99), Person('Mary', 55)]
```


> **تمرين برمجي: المال**
>
> يحتوي قالب التمرين على مخطط لصنف اسمه `Money`. ويطلب منك هذا التمرين تنفيذ بعض التوابع الإضافية وإصلاح بعض المشكلات الصغيرة في القالب.

## إصلاح التمثيل النصي

التابع `__str__` في تعريف الصنف لا يعمل على نحو صحيح تمامًا. فبالنسبة إلى الكائنين التاليين من نوع Money، يُطبع الثاني بشكل خاطئ:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)  # two euros and five cents

print(e1)
print(e2)
```


```
4.10
2.5
```


يرجى إصلاح التابع بحيث يطبع ما يلي:


```
4.10 eur
2.05 eur
```


## مبالغ متساوية

يرجى تعريف تابع جديد اسمه `__eq__(self, another)` يتيح لك استخدام مشغّل المقارنة `==` على كائنات Money. ويمكنك اختبار تنفيذك بالشيفرة التالية:

```python
e1 = Money(4, 10)
e2 = Money(2, 5)
e3 = Money(4, 10)

print(e1)
print(e2)
print(e3)
print(e1 == e2)
print(e1 == e3)
```


```
4.10 eur
2.05 eur
4.10 eur
False
True
```


## مشغّلات المقارنة الأخرى

يرجى تنفيذ التوابع المناسبة لمشغّلات المقارنة `<` و`>` و`!=`.

```python
e1 = Money(4, 10)
e2 = Money(2, 5)

print(e1 != e2)
print(e1 < e2)
print(e1 > e2)
```


```
True
False
True
```


## الجمع والطرح

يرجى تنفيذ مشغّلي الجمع والطرح `+` و`-` لكائنات Money. وينبغي أن يُرجع كلاهما كائنًا جديدًا من نوع Money. ولا ينبغي أن يتغيّر في النتيجة الكائن نفسه ولا الكائن المُمرَّر وسيطًا له.

ملاحظة: لا يمكن أن تكون قيمة كائن Money سالبة. وإذا أدى محاولة الطرح إلى نتيجة سالبة، فيجب أن يرفع التابع استثناء `ValueError`.

```python
e1 = Money(4, 5)
e2 = Money(2, 95)

e3 = e1 + e2
e4 = e1 - e2

print(e3)
print(e4)

e5 = e2-e1
```


```
7.00 eur
1.10 eur
Traceback (most recent call last):
  File "money.py", line 416, in <module>
    e5 = e2-e1
  File "money.py", line 404, in __sub__
    raise ValueError(f"a negative result is not allowed")
ValueError: a negative result is not allowed
```


## يجب ألّا تكون القيمة متاحة للوصول المباشر

لا يزال الصنف يعاني من مشكلة تكامل صغيرة. فبإمكان المستخدم «الغش» بالوصول إلى الخصائص مباشرة وتغيير القيمة المخزّنة في كائن Money:

```python
print(e1)
e1.euros = 1000
print(e1)
```


```
4.05 eur
1000.05 eur
```


يرجى [تغليف](/book/mooc/part-9/3-encapsulation#encapsulation) تنفيذ الخصائص المُعرَّفة في الصنف بحيث يتعذّر الغش المستخدم أعلاه. فلا ينبغي أن يملك الصنف أي خاصية عامة، ولا توابع جلب (getter) أو وضع (setter) لليورو أو للسنت.


> **تمرين برمجي: تاريخ بسيط**
>
> في هذا التمرين يُطلب منك تنفيذ الصنف `SimpleDate` الذي يتيح لك التعامل مع التواريخ. ولامتياز البساطة نفترض هنا أن _كل شهر يحتوي على 30 يومًا_.

وبسبب هذا التبسيط ينبغي ألّا تستخدم وحدة `datetime` من مكتبة Python القياسية، بل ستنفّذ وظائف مشابهة بنفسك.

## المقارنات

يرجى تنفيذ مخطط الصنف، إلى جانب توابع تتيح المقارنة بالمشغّلات `<` و`>` و`==` و`!=`. ويمكنك استخدام الشيفرة التالية لاختبار تنفيذك:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)
d3 = SimpleDate(28, 12, 1985)

print(d1)
print(d2)
print(d1 == d2)
print(d1 != d2)
print(d1 == d3)
print(d1 < d2)
print(d1 > d2)
```


```
4.10.2020
28.12.1985
False
True
False
False
True
```


## الزيادة

يرجى تنفيذ مشغّل الجمع `+` الذي يتيح إضافة عدد محدّد من الأيام إلى كائن SimpleDate. وينبغي أن يُرجع المشغّل كائن SimpleDate جديدًا. ولا ينبغي أن يتغيّر الكائن الأصلي.

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(28, 12, 1985)

d3 = d1 + 3
d4 = d2 + 400

print(d1)
print(d2)
print(d3)
print(d4)
```


```
4.10.2020
28.12.1985
7.10.2020
8.2.1987
```


## الفرق

يرجى تنفيذ مشغّل الطرح `-` الذي يتيح معرفة الفرق بالأيام بين كائنين من نوع SimpleDate. وبما أننا افترضنا أن كل شهر يحتوي على 30 يومًا، فإن السنة في إطار هذا التمرين تساوي 12*30 = 360 يومًا.

يمكنك استخدام الشيفرة التالية لاختبار برنامجك:

```python
d1 = SimpleDate(4, 10, 2020)
d2 = SimpleDate(2, 11, 2020)
d3 = SimpleDate(28, 12, 1985)

print(d2-d1)
print(d1-d2)
print(d1-d3)
```


```
28
28
12516
```


## المُكرِّرات {#iterators}

نعلم أن جملة `for` يمكن استخدامها _لتكرار_ (iteration) العديد من هياكل البيانات المختلفة والملفات ومجموعات العناصر. وحالة استخدام نموذجية هي الدالة التالية:

```python

def count_positives(my_list: list):
    n = 0
    for item in my_list:
        if item > 0:
            n += 1
    return n

```

تمرّ الدالة على عناصر القائمة واحدًا واحدًا، وتحتفظ بعدد العناصر التي كانت موجبة.

من الممكن أيضًا جعل أصنافك الخاصة قابلة للتكرار. وهذا مفيد حين يتضمّن الغرض الأساسي من الصنف تخزين مجموعة من العناصر. فصنف Bookshelf في المثال السابق مرشّح جيّد، إذ من المعقول استخدام حلقة `for` للمرور على الكتب الموضوعة في الرف. ويُقال الشيء نفسه عن سجلّ الطلاب مثلًا. وقد تكون القدرة على التكرار عبر مجموعة الطلاب مفيدة.

لجعل صنف قابلًا للتكرار يجب عليك تنفيذ تابعي المُكرِّر `__iter__` و`__next__`. وسنعود إلى تفاصيل هذين التابعين بعد المثال التالي:

```python
class Book:
    def __init__(self, name: str, author: str, page_count: int):
        self.name = name
        self.author = author
        self.page_count = page_count

class Bookshelf:
    def __init__(self):
        self._books = []

    def add_book(self, book: Book):
        self._books.append(book)

    # This is the iterator initialization method
    # The iteration variable(s) should be initialized here
    def __iter__(self):
        self.n = 0
        # the method returns a reference to the object itself as 
        # the iterator is implemented within the same class definition
        return self

    # This method returns the next item within the object
    # If all items have been traversed, the StopIteration event is raised
    def __next__(self):
        if self.n < len(self._books):
            # Select the current item from the list within the object
            book = self._books[self.n]
            # increase the counter (i.e. iteration variable) by one
            self.n += 1
            # return the current item
            return book
        else:
            # All books have been traversed
            raise StopIteration
```

يُهيّئ التابع `__iter__` متغيّر التكرار أو متغيّرات التكرار. وفي هذه الحالة يكفي وجود عدّاد بسيط يحمل فهرس العنصر الحالي في القائمة. ونحتاج أيضًا إلى التابع `__next__` الذي يُرجع العنصر التالي في المُكرِّر. وفي المثال أعلاه يُرجع التابع العنصر ذا الفهرس `n` من القائمة داخل كائن Bookshelf، ويُزاد كذلك متغيّر التكرار.

وعند اكتمال المرور على جميع الكائنات، يرفع التابع `__next__` استثناء `StopIteration`. ولا يختلف هذا الإجراء عن رفع أي استثناء آخر، لكن Python تتعامل مع هذا الاستثناء تلقائيًّا، وغرضه أن يُبلّغ الشيفرة المستدِعي للمُكرِّر (مثل حلقة `for`) بأن التكرار قد انتهى.

أصبح رفّ الكتب Bookshelf لدينا جاهزًا للتكرار، مثلًا باستخدام حلقة `for`:

```python
if __name__ == "__main__":
    b1 = Book("The Life of Python", "Montague Python", 123)
    b2 = Book("The Old Man and the C", "Ernest Hemingjavay", 204)
    b3 = Book("A Good Cup of Java", "Caffee Coder", 997)

    shelf = Bookshelf()
    shelf.add_book(b1)
    shelf.add_book(b2)
    shelf.add_book(b3)

    # Print the names of all the books
    for book in shelf:
        print(book.name)
```


```
The Life of Python
The Old Man and the C
A Good Cup of Java
```




> **تمرين برمجي: قائمة تسوق قابلة للتكرار**
>
> يحتوي قالب التمرين على الصنف `ShoppingList` من [التمرين في الجزء 8](/book/mooc/part-8/2-classes-and-objects#programming-exercise-shopping-list). يُرجى تعديل الصنف بحيث يصبح قابلًا للتكرار ويمكن استخدامه هكذا:

```python
shopping_list = ShoppingList()
shopping_list.add("bananas", 10)
shopping_list.add("apples", 5)
shopping_list.add("pineapple", 1)

for product in shopping_list:
    print(f"{product[0]}: {product[1]} units")
```


```
bananas: 10 units
apples: 5 units
pineapple: 1 units
```


ينبغي أن يُرجع التابع `__next__` في مُكرِّرك صفوفًا (tuples)، يكون فيها العنصر الأول اسم المنتج والعنصر الثاني الكمية.
