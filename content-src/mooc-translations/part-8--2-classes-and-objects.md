---
title: "الأصناف والكائنات"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف ما هو الصنف
> - ستفهم الصلة بين الصنف والكائن
> - ستعرف المقصود بالبرمجة الكائنية


في القسم السابق تعاملنا مع القوائم والصفوف والقواميس والسلاسل النصية. وكلها حالات خاصة إلى حد ما في برمجة Python. فبنية Python النحوية تتضمّن طريقة فريدة معرَّفة مسبقًا للإعلان عن كائن ينتمي إلى كل من هذه الأنواع:

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

وعند الإعلان عن نوع آخر من الكائنات، نحتاج إلى استدعاء دالة تهيئة خاصة تُسمّى _الباني_ (constructor). ولننظر إلى التعامل مع الكسور من خلال الصنف `Fraction`.

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


كما ترى أعلاه، تبدو استدعاءات تابع الباني مختلفة قليلًا عن استدعاءات التابعات العادية التي صادفناها من قبل. فأولًا، هي غير مرتبطة بأي كائن بصيغة النقطة (إذ إن استدعاء الباني ضروري لإنشاء كائن أصلًا). كما أن اسم تابع الباني يبدأ بحرف كبير: `half = Fraction(1,2)`. ولننظر عن قرب إلى كيفية بناء الكائنات بأن نألف مفهوم _الصنف_.

## الصنف مخطط للكائن

لقد استخدمنا مصطلح _الصنف_ في هذه المادة مرات عديدة. فمثلًا، في المثال أعلاه استوردنا الصنف `Fraction` من الوحدة `fractions`. وقد أُنشئت كائنات كسور جديدة باستدعاء تابع _الباني_ للصنف `Fraction`.

ويحوي تعريف الصنف بنية أي كائن يمثّله ووظائفه. ولهذا تُوصف الأصناف أحيانًا بأنها مخططات للكائنات. إذًا، يخبرك تعريف الصنف بنوع البيانات التي يحويها الكائن، ويعرّف أيضًا التابعات التي يمكن استخدامها على الكائن. وتشير _البرمجة الكائنية_ إلى نمط برمجي ترتبط فيه وظائف البرنامج باستخدام الأصناف والكائنات المنشأة بناءً عليها.

ويمكن استخدام تعريف صنف واحد لإنشاء عدة كائنات. وكما ذُكر سابقًا، فالكائنات مستقلة. والتغييرات التي تُجرى في كائن واحد لا تؤثر عمومًا في الكائنات الأخرى التي تمثّل الصنف نفسه. ولكل كائن مجموعته الفريدة من الخصائص البيانية. وقد يكون من المفيد أن تتأمّل هذا التبسيط للعلاقة بين الصنف والكائن:

* يحدّد الصنف المتغيّرات
* عند إنشاء الكائن، تُسنَد قيم إلى تلك المتغيّرات

إذًا، يمكننا استخدام كائن من نوع `Fraction` للوصول إلى بسط عدد كسري ومقامه:

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


ويحوي تعريف الصنف `Fraction` إعلانات للمتغيّرين `numerator` و`denominator`. ولكل كائن منشأ بناءً على هذا الصنف قيمه الخاصة المسنَدة إلى هذين المتغيّرين.

وبالمثل، يحوي كل كائن منشأ بناءً على الصنف `date` قيمه الفريدة الخاصة بالسنة والشهر واليوم من التاريخ:

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


ويحوي تعريف الصنف `date` إعلانات المتغيّرات `year` و`month` و`day`. وعند إنشاء كائن `date` جديد بناءً على هذا الصنف، تُسنَد قيم إلى هذه المتغيّرات. ولكل كائن قيمه الفريدة المسنَدة إلى هذه المتغيّرات.

## دوال تعمل مع الكائنات

ينبغي أن يكون تمرير كائن كوسيط إلى دالة مألوفًا لديك الآن، فقد فعلنا ذلك مرات عديدة في هذه الدورة حتى الآن. ولننظر إلى المثال التالي. لدينا هنا دالة تتحقق مما إذا كان كائن `date` الممرَّر كوسيط يوافق يوم عطلة الأسبوع:

```python
def is_it_weekend(my_date: date):
    weekday = my_date.isoweekday()
    return weekday == 6 or weekday == 7
```

وتستخدم هذه الدالة التابع [isoweekday](https://docs.python.org/3/library/datetime.html#datetime.date.isoweekday)، المعرَّف في تعريف الصنف `date`، وتُعيد قيمة عددية صحيحة، بحيث إذا كان التاريخ المُعطى يوم اثنين أرجعت 1، وإذا كان يوم ثلاثاء أرجعت 2، وهكذا.

ويمكنك استخدام الدالة أعلاه هكذا:

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


## التابعات مقابل المتغيّرات

عند التعامل مع كائن من نوع `date` قد تلاحظ فرقًا بسيطًا بين طريقة الوصول إلى المتغيّرات الموجودة في الكائن، وطريقة استخدام التابعات المرتبطة به:

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


ويتوفّر يوم الأسبوع الذي يوافق التاريخ عبر _التابع_ `isoweekday`:

```python
weekday = my_date.isoweekday()
```

وهذا استدعاء تابع، لذا توجد أقواس بعد اسم التابع. وترك الأقواس لا يسبّب خطأً، لكن النتائج تكون غريبة:

```python
weekday =  my_date.isoweekday
print("The day of the week:", weekday)
```


```
The day of the week: <built-in method isoweekday of datetime.date object at 0x10ed66450>
```


أما شهر كائن `date` فهو متغيّر، لذا يمكن الوصول إلى القيمة المرتبطة به بـ_مرجع_.

```python
my_month = my_date.month
```

لاحظ أنه _لا توجد أقواس_ هنا. وإضافة الأقواس _ستسبّب_ خطأً:

```python
my_month = my_date.month()
```


```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not callable
```


> **تمرين برمجي: قائمة السنوات**
>
> يُرجى كتابة دالة اسمها `list_years(dates: list)` تأخذ قائمة من الكائنات من نوع `date` كوسيط لها. وينبغي للدالة أن تُرجع قائمة جديدة تحوي _السنوات الموجودة في القائمة الأصلية بترتيب زمني_، من الأقدم إلى الأحدث.

ومثال على عمل الدالة:

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



> **تمرين برمجي: قائمة التسوق**
>
> يحوي قالب التمرين صنفًا معرَّفًا مسبقًا هو `ShoppingList`، ويمكن استخدامه لنمذجة قائمة تسوّق. ومهمتك أن تضيف تابعًا إلى تعريف الصنف. ولا حاجة إلى تغيير أي تابعات معرَّفة أصلًا.

بافتراض أن لدينا كائن `ShoppingList` مشارًا إليه في متغيّر اسمه `shopping_list`، فيمكن التعامل مع الكائن بالتابعات التالية:

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


ويمكننا أيضًا فعل هذا:

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


وكما ترى، يعمل `ShoppingList` قليلًا مثل قائمة عادية، لكن يُوصَل إليه عبر التابعات التي يوفّرها الصنف ShoppingList. وخلافًا لقوائم Python العادية، تبدأ الفهرسة من 1 لا من 0.

يُرجى كتابة دالة اسمها `total_units(my_list: ShoppingList)`، تأخذ كائنًا من نوع `ShoppingList` كوسيط لها. وينبغي للدالة أن تحسب مجموع الوحدات المدرجة، وتُرجع القيمة.

ويمكنك استخدام الشيفرة التالية لاختبار دالتك:

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


**ملاحظة:** تعريف الصنف `ShoppingList` مُضمَّن أصلًا في قالب التمرين. ولا حاجة إلى استخدام أمر `import` لاستيراده، خلافًا لما في الأمثلة أعلاه مع صنفَي المكتبة القياسية في Python وهما `Fraction` و`date`.
