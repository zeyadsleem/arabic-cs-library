---
title: "الصنفات (Classes) والكائنات (Objects)"
lang: ar
source: "https://programming-26.mooc.fi/part-8/2-classes-and-objects"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد الانتهاء من هذا القسم

- ستعرف ما هو الصنف (class)
- ستفهم ما هي العلاقة بين الصنف والكائن
- ستعرف ما يُقصد بالبرمجة كائنية التوجه (object oriented programming)

</text-box>

في القسم السابق تعاملنا مع القوائم (lists)، الأزواج المرتبة (tuples)، القواميس (dictionaries) والنصوص (strings). هذه كلها حالات خاصة إلى حد ما في برمجة Python. تتميز صياغة Python (syntax) بطريقة فريدة ومحددة مسبقاً لإعلان كائن ينتمي لكل من هذه الأنواع:

```python
# Lists are declared with square brackets
my_list = [1,2,3]

# Strings are declared with quotation marks
my_string = "Hi there!"

# Dictionaries are declared with curly brackets
my_dict = {"one": 1, "two:": 2}

# Tuples are declared with parentheses
my_tuple = (1,2,3)
```

عند إعلان نوع آخر من الكائنات، نحتاج لاستدعاء دالة تهيئة خاصة تسمى _الدالة البانية (constructor)_. لنلق نظرة على التعامل مع الكسور من خلال صنف `Fraction`.

```python
# we are using the class Fraction from the module fractions
from fractions import Fraction

# create some new fractions
half = Fraction(1,2)

third = Fraction(1,3)

another = Fraction(3,11)

# print these out
print(half)
print(third)
print(another)

# Fractions can be added together, for example
print(half + third)
```


```
1/2
1/3
3/11
5/6
```


كما ترى أعلاه، استدعاءات الدالة البانية (constructor method) تبدو مختلفة قليلاً عن استدعاءات الدوال العادية التي تعرفت عليها سابقاً. أولاً، ليست مرتبطة بأي كائن باستخدام تدوين النقطة (dot notation) (لأن استدعاء الدالة البانية مطلوب لإنشاء كائن في المقام الأول). الدالة البانية أيضاً مكتوبة بحرف كبير أول: `half = Fraction(1,2)`. لنلق نظرة فاحصة على كيفية بناء الكائنات من خلال التعرف على مفهوم _الصنف (class)_.

## الصنف (Class) هو المخطط (blueprint) للكائن

لقد استخدمنا مصطلح _صنف (class)_ في المواد عدة مرات. على سبيل المثال، في المثال أعلاه استوردنا صنف `Fraction` من الوحدة (module) `fractions`. تم إنشاء كائنات كسور جديدة باستدعاء _دالة الباني (constructor)_ لصنف `Fraction`.

تعريف الصنف يحتوي على هيكل ووظائف أي كائن يمثله. لهذا السبب يشار أحياناً للصنفات على أنها مخططات (blueprints) للكائنات. لذا، تعريف الصنف يخبرك أي نوع من البيانات يحتويه الكائن، ويحدد أيضاً الدوال المرتبطة (methods) التي يمكن استخدامها على الكائن. _البرمجة كائنية التوجه (Object oriented programming)_ تشير إلى نمط برمجة (paradigm) حيث تُربط وظائف البرنامج باستخدام الصنف والكائنات المنشأة بناءً عليها.

يمكن استخدام تعريف صنف واحد لإنشاء عدة كائنات. كما ذُكر سابقاً، الكائنات مستقلة. التغييرات المُجراة على كائن واحد بشكل عام لا تؤثر على الكائنات الأخرى التي تمثل نفس الصنف. كل كائن لديه مجموعته الفريدة من سمات البيانات (data attributes). قد يكون من المفيد اعتبار هذا تبسيطاً للعلاقة بين الصنف والكائن:

* الصنف يحدد المتغيرات (variables)
* عند إنشاء كائن، تُعيّن قيم لتلك المتغيرات

إذن، يمكننا استخدام كائن من نوع `Fraction` للوصول إلى البسط (numerator) والمقام (denominator) لعدد كسري:

```python
from fractions import Fraction

number = Fraction(2,5)

# Print the numerator
print(number.numerator)

# ...and the denominator
print(number.denominator)
```


```
2
5
```


تعريف صنف `Fraction` يحتوي على إعلانات للمتغيرين `numerator` و `denominator`. كل كائن يتم إنشاؤه بناءً على الصنف له قيمه الخاصة المعينة لهذه المتغيرات.

وبالمثل، الكائنات المنشأة بناءً على صنف `date` تحتوي كل منها على قيم فريدة خاصة بها للسنة، الشهر، ويوم التاريخ:

```python
from datetime import date

xmas_eve = date(2020, 12, 24)
midsummer = date(2020, 6, 20)

# print only the month attribute of both objects
print(xmas_eve.month)
print(midsummer.month)
```


```
12
6
```


تعريف صنف `date` يحتوي على إعلانات متغيرات `year`، `month` و `day`. عند إنشاء كائن `date` جديد بناءً على الصنف، تُعيّن قيم لهذه المتغيرات. كل كائن له قيمه الفريدة المعينة لهذه المتغيرات.

## الدوال (Functions) التي تعمل مع الكائنات

تمرير كائن كمعامل (argument) لدالة يجب أن يكون مألوفاً لك الآن، حيث فعلنا ذلك مرات عديدة في هذه الدورة حتى الآن. لنلق نظرة على المثال التالي. هنا لدينا دالة تتحقق مما إذا كان كائن `date` الممرر كمعامل يقع في عطلة نهاية الأسبوع:

```python
def is_it_weekend(my_date: date):
    weekday = my_date.isoweekday()
    return weekday == 6 or weekday == 7
```

هذه الدالة تستخدم الدالة المرتبطة [isoweekday](https://docs.python.org/3/library/datetime.html#datetime.date.isoweekday)، المعرفة في تعريف صنف `date`، وترجع قيمة عدد صحيح بحيث إذا كان التاريخ المعطى هو يوم اثنين، ترجع 1، وإذا كان ثلاثاء، ترجع 2، وهكذا.

يمكنك استخدام الدالة أعلاه كالتالي:

```python
xmas_eve = date(2020, 12, 24)
midsummer = date(2020, 6, 20)

print(is_it_weekend(xmas_eve))
print(is_it_weekend(midsummer))
```


```
False
True
```


## الدوال المرتبطة (Methods) مقابل المتغيرات (Variables)

عند العمل مع كائن من نوع `date` قد تلاحظ وجود اختلاف طفيف بين كيفية الوصول للمتغيرات المحتوية في الكائن، مقابل كيفية استخدام الدوال المرتبطة بالكائن:

```python
my_date = date(2020, 12, 24)

# calling a method
weekday = my_date.isoweekday()

# accessing a variable
my_month = my_date.month

print("The day of the week:", weekday)
print("The month:", my_month)
```


```
The day of the week: 4
The month: 12
```


يوم الأسبوع الذي يقع فيه التاريخ متاح عبر _الدالة المرتبطة_ `isoweekday`:

```python
weekday = my_date.isoweekday()
```

هذا استدعاء دالة مرتبطة، لذا هناك أقواس بعد اسم الدالة. ترك الأقواس لا يسبب خطأ، لكن النتائج تكون غريبة:

```python
weekday =  my_date.isoweekday
print("The day of the week:", weekday)
```


```
The day of the week: <built-in method isoweekday of datetime.date object at 0x10ed66450>
```


شهر كائن `date` هو متغير، لذا القيمة المرتبطة يمكن الوصول إليها عبر _مرجع (reference)_.

```python
my_month = my_date.month
```

لاحظ _عدم وجود أقواس_ هنا. إضافة أقواس _ستسبب_ خطأ:

```python
my_month = my_date.month()
```


```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not callable
```


> **تمرين برمجي: تمرين برمجي**
>
> يرجى كتابة دالة باسم `list_years(dates: list)` والتي تأخذ قائمة من كائنات نوع `date` كمعامل (argument). يجب أن ترجع الدالة قائمة جديدة، تحتوي على _السنوات في القائمة الأصلية مرتبة زمنياً_، من الأقدم للأحدث.

مثال على الدالة في العمل:

```python
date1 = date(2019, 2, 3)
date2 = date(2006, 10, 10)
date3 = date(1993, 5, 9)

years = list_years([date1, date2, date3])
print(years)
```


```
[1993, 2006, 2019]
```


> **تمرين برمجي: تمرين برمجي**
>
> قالب التمرين يحتوي على صنف `ShoppingList` معرّف مسبقاً، يمكن استخدامه لنمذجة قائمة تسوق. مهمتك هي إضافة دالة مرتبطة لتعريف الصنف. لا تحتاج لتغيير أي دوال مرتبطة معرفة مسبقاً.

بافتراض أن لدينا كائن `ShoppingList` مُشار إليه في متغير اسمه `shopping_list`، يمكن التعامل مع الكائن باستخدام الدوال المرتبطة التالية:

```python

print(shopping_list.number_of_items())
print(shopping_list.item(1))
print(shopping_list.amount(1))
print(shopping_list.item(2))
print(shopping_list.amount(2))

```


```
2
Bananas
4
Milk
1
```


يمكننا أيضاً فعل هذا:

```python
# the items on the shopping list are indexed from 1
for i in range(1, shopping_list.number_of_items()+1):
    item = shopping_list.item(i)
    amount = shopping_list.amount(i)
    print(f"{item}: {amount} units")
```


```
Bananas 4 units
Milk 1 units
```


كما ترى، `ShoppingList` تعمل قليلاً مثل القائمة العادية، لكن يتم الوصول إليها عبر الدوال المرتبطة التي يوفرها صنف ShoppingList. على عكس قوائم Python العادية، الفهرسة (indexing) تبدأ من 1، ليس 0.

يرجى كتابة دالة باسم `total_units(my_list: ShoppingList)`، والتي تأخذ كائن نوع `ShoppingList` كمعامل (argument). يجب أن تحسب الدالة إجمالي عدد الوحدات المدرجة، وترجع القيمة.

يمكنك استخدام الكود التالي لاختبار دوالك:

```python
if __name__ == "__main__":
    my_list = ShoppingList()
    my_list.add("bananas", 10)
    my_list.add("apples", 5)
    my_list.add("pineapple", 1)

    print(total_units(my_list))
```


```
16
```


**ملاحظة:** تعريف صنف `ShoppingList` مضمن بالفعل في قالب التمرين. لا تحتاج لاستخدام بيان `import` لاستيراده، على عكس الأمثلة أعلاه مع صنفي مكتبة Python القياسية `Fraction` و `date`.
