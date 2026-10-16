---
title: "القاموس"
lang: ar
source: "https://programming-26.mooc.fi/part-5/3-dictionary"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستألف هيكل بيانات القاموس
> - ستكون قادرًا على استخدام قاموس بمفاتيح وقيم من أنواع مختلفة
> - ستعرف كيف تمرّ على محتويات القاموس
> - ستكون قادرًا على ذكر بعض حالات الاستخدام النموذجية للقواميس


قد تكون القوائم عملية في مواقف كثيرة، لكنها محدودة لأن عناصرها يُوصَل إليها عبر الفهارس؛ 0 و1 و2 وهكذا. فإذا أردت العثور على عنصر ما في قائمة، فسيتعيّن عليك إما معرفة فهرسه، أو في أسوأ الأحوال المرور على القائمة كلها.

ثمة هيكل بيانات محوري آخر في Python هو _القاموس_ (dictionary). وفي القاموس تُفهرَس العناصر بـ_المفاتيح_ (keys). ويقابل كل مفتاح _قيمة_ (value). ويمكن الوصول إلى القيم المخزّنة في القاموس وتغييرها باستخدام المفتاح.

## استخدام القاموس

يوضّح المثال التالي كيف يعمل هيكل بيانات القاموس. وهذا قاموس بسيط من الفنلندية إلى الإنجليزية:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

print(len(my_dictionary))
print(my_dictionary)
print(my_dictionary["apina"])
```


```
3
{'apina': 'monkey', 'banaani': 'banana', 'cembalo': 'harpsichord'}
monkey
```


يُنشئ الرمز `{}` قاموسًا فارغًا يمكننا الآن إضافة محتوى إليه. وقد أُضيفت ثلاثة أزواج من مفتاح وقيمة: فالمفتاح `"apina"` يقابل `"monkey"`، والمفتاح `"banaani"` يقابل `"banana"`، والمفتاح `"cembalo"` يقابل `"harpsichord"`. وأخيرًا يُطبع عدد أزواج المفتاح والقيمة في القاموس، مع القاموس بأكمله، والقيمة المقابلة للمفتاح `"apina"`.

وبعد تعريف القاموس يمكننا أيضًا استخدامه مع مُدخَل المستخدم:

```python
word = input("Please type in a word: ")
if word in my_dictionary:
    print("Translation: ", my_dictionary[word])
else:
    print("Word not found")
```

لاحظ استخدام المعامل `in` أعلاه. فعند استخدامه على متغيّر من نوع القاموس يتحقّق مما إذا كان المعامل الأول من بين المفاتيح المخزّنة في القاموس. وبحسب المُدخَلات المختلفة قد يطبع هذا البرنامج ما يلي:


```
Please type in a word: **apina**
Translation: monkey
```



```
Please type in a word: **pöllö**
Word not found
```


## ما الذي يمكن تخزينه في القاموس؟

يُسمّى نوع البيانات قاموسًا، لكنه ليس مضطرًّا لأن يحتوي على السلاسل النصية وحدها. فمثلًا، في القاموس التالي المفاتيح سلاسل نصية أما القيم فهي أعداد صحيحة:

```python
results = {}
results["Mary"] = 4
results["Alice"] = 5
results["Larry"] = 2
```

وهنا المفاتيح أعداد صحيحة والقيم قوائم:

```python
lists = {}
lists[5] = [1, 2, 3]
lists[42] = [5, 4, 5, 4, 5]
lists[100] = [5, 2, 3]
```

## كيف تعمل المفاتيح والقيم

لا يمكن أن يظهر أي مفتاح في القاموس أكثر من مرة واحدة. وإذا أضفت مدخلًا بمفتاح موجود أصلًا في القاموس، فستُستبدل القيمة الأصلية المقابلة لذلك المفتاح بالقيمة الجديدة:

```python
my_dictionary["suuri"] = "big"
my_dictionary["suuri"] = "large"
print(my_dictionary["suuri"])
```


```
large
```


يجب أن تكون كل المفاتيح في القاموس _غير قابلة للتغيير_ (immutable). لذا لا يمكن استخدام قائمة مفتاحًا، لأنها قابلة للتغيير. ومثلًا، يؤدي تنفيذ الشيفرة التالية إلى خطأ:

```python
my_dictionary[[1, 2, 3]] = 5
```


```
TypeError: unhashable type: 'list'
```


> **جدول التجزئة**
>
> لاحظ كلمة 'unhashable' في رسالة الخطأ أعلاه. وهي إشارة إلى طريقة العمل الداخلية لنوع البيانات قاموس. فتخزّن Python محتويات القاموس في _جدول تجزئة_ (hash table). ويُختزل كل مفتاح إلى _قيمة تجزئة_ (hash value) تحدّد مكان تخزين المفتاح في ذاكرة الحاسوب. وتشير رسالة الخطأ أعلاه إلى أن القائمة لا يمكن تحويلها إلى قيمة تجزئة، لذا لا يمكن استخدامها مفتاحًا في قاموس.
>
> وستستكشف مقررات _هياكل البيانات والخوارزميات_ جداول التجزئة بمزيد من التفصيل.


وخلافًا للمفاتيح، يمكن أن تتغيّر _القيم_ المخزّنة في القاموس، لذا يُقبل أي نوع من البيانات قيمةً. ويمكن أيضًا أن تقابل القيمة الواحدة أكثر من مفتاح في القاموس نفسه.

> **تمرين برمجي: مضروبة في عشرة**
>
> يُرجى كتابة دالة اسمها `times_ten(start_index: int, end_index: int)`، تُنشئ قاموسًا جديدًا وتعيده. وينبغي أن تكون مفاتيح القاموس هي الأعداد بين `start_index` و`end_index` ضمنا

ينبغي أن تكون القيمة المقابلة لكل مفتاح هي المفتاح مضروبًا في عشرة.

على سبيل المثال:

```python
d = times_ten(3, 6)
print(d)
```


```
{3: 30, 4: 40, 5: 50, 6: 60}
```


> **تمرين برمجي: المضاريب**
>
> يُرجى كتابة دالة اسمها `factorials(n: int)`، تُعيد مضاريب الأعداد من 1 إلى `n` في قاموس. فالعدد هو المفتاح، ومضروب ذلك العدد هو القيمة المقابلة له.

تذكير: يُكتب مضروب العدد `n` على الصورة `n`! ويُحسب بضرب العدد في كل عدد صحيح أصغر منه. فمثلًا، مضروب العدد 4 هو 4 * 3 * 2 * 1 = 24.

مثال على الدالة أثناء عملها:

```python
k = factorials(5)
print(k[1])
print(k[3])
print(k[5])
```


```
1
6
120
```


## المرور على القاموس

يمكن استخدام الحلقة المألوفة `for item in collection` للمرور على القاموس أيضًا. وعند استخدامها على القاموس مباشرة تمرّ الحلقة على المفاتيح المخزّنة فيه واحدًا واحدًا. وفي المثال التالي تُطبع كل المفاتيح والقيم المخزّنة في القاموس:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key in my_dictionary:
    print("key:", key)
    print("value:", my_dictionary[key])
```


```
key: apina
value: monkey
key: banaani
value: banana
key: cembalo
value: harpsichord
```


تحتاج أحيانًا إلى المرور على محتويات القاموس بأكملها. ويُعيد التابع `items` كل المفاتيح والقيم المخزّنة في القاموس، زوجًا واحدًا في كل مرة:

```python

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

لعلك لاحظت في الأمثلة أعلاه أن المفاتيح تُعالَج بالترتيب نفسه الذي أُضيفت به إلى القاموس. وبما أن المفاتيح تُعالَج استنادًا إلى قيمة تجزئة، فلا ينبغي عادةً أن يهمّ الترتيب في التطبيقات. بل إن الترتيب في كثير من إصدارات Python الأقدم ليس مضمونًا أن يتبع زمن الإدراج.

## بعض الطرق الأكثر تقدّمًا لاستخدام القواميس

لنلقِ نظرة على قائمة كلمات:

```python
word_list = [
  "banana", "milk", "beer", "cheese", "sourmilk", "juice", "sausage",
  "tomato", "cucumber", "butter", "margarine", "cheese", "sausage",
  "beer", "sourmilk", "sourmilk", "butter", "beer", "chocolate"
]
```

نودّ تحليل قائمة الكلمات هذه بطرق مختلفة. فمثلًا نودّ معرفة عدد مرات ظهور كل كلمة في القائمة.

قد يكون القاموس أداة مفيدة في إدارة هذا النوع من المعلومات. وفي المثال أدناه نمرّ على عناصر القائمة واحدًا واحدًا. وباستخدام كلمات القائمة مفاتيحَ في قاموس جديد، تكون القيمة المقابلة لكل مفتاح هي عدد مرات ظهور الكلمة:

```python
def counts(my_list):
    words = {}
    for word in my_list:
        # if the word is not yet in the dictionary, initialize the value to zero
        if word not in words:
            words[word] = 0
        # increment the value
        words[word] += 1
    return words

# call the function
print(counts(word_list))
```

يطبع البرنامج ما يلي:


```
{'banana': 1, 'milk': 1, 'beer': 3, 'cheese': 2, 'sourmilk': 3, 'juice': 1, 'sausage': 2, 'tomato': 1, 'cucumber': 1, 'butter': 2, 'margarine': 1, 'chocolate': 1}
```


ماذا لو أردنا تصنيف الكلمات بحسب الحرف الأول في كل كلمة؟ إحدى طرق تحقيق ذلك استخدام القواميس:

```python
def categorize_by_initial(my_list):
    groups = {}
    for word in my_list:
        initial = word[0]
        # initialize a new list when the letter is first encountered
        if initial not in groups:
            groups[initial] = []
        # add the word to the appropriate list
        groups[initial].append(word)
    return groups

groups = categorize_by_initial(word_list)

for key, value in groups.items():
    print(f"words beginning with {key}:")
    for word in value:
        print(word)
```
بنية الدالة شبيهة جدًّا بالتمرين السابق، لكن القيم المقابلة للمفاتيح هذه المرة قوائم. ويطبع البرنامج ما يلي:


```
words beginning with b:
banana
beer
butter
beer
butter
beer
words beginning with m:
milk
margarine
words beginning with c:
cheese
cucumber
cheese
chocolate
words beginning with s:
sourmilk
sausage
sausage
sourmilk
sourmilk
words beginning with j:
juice
words beginning with t:
tomato
```


> **تمرين برمجي: مدرّج تكرار**
>
> يُرجى كتابة دالة اسمها `histogram`، تأخذ سلسلة نصية وسيطًا لها. وينبغي للدالة أن تطبع مخطّطًا تكرارًا (histogram) يمثّل عدد مرات ظهور كل حرف في السلسلة النصية. وينبغي تمثيل كل ظهور لحرف بنجمة على السطر الخاص بذلك الحرف.

فمثلًا، ينبغي أن يطبع استدعاء الدالة `histogram("abba")` ما يلي


```
a **
b **
```


بينما ينبغي أن يطبع `histogram("statistically")` ما يلي


```
s **
t ***
a **
i **
c *
l **
y *
```


> **تمرين برمجي: دفتر الهاتف، الإصدار 1**
>
> يُرجى كتابة تطبيق دفتر هاتف. وينبغي أن يعمل كما يلي:


```
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...
```


كما ترى أعلاه، لا يمكن ربط كل اسم إلا برقم واحد فقط. فإذا أُضيف مدخل جديد بالاسم نفسه، فسيُستبدل الرقم المرتبط بالمدخل القديم بالرقم الجديد.

**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا يجب أن __لا__ تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


> **تمرين برمجي: دفتر الهاتف، الإصدار 2**
>
> يُرجى كتابة نسخة محسّنة من تطبيق دفتر الهاتف. وينبغي أن يستوعب كل مدخل الآن عدة أرقام هاتف. وينبغي أن يعمل التطبيق فيما عدا ذلك تمامًا كما سبق، لكن ينبغي هذه المرة طباعة _كل_ الأرقام المرتبطة بالاسم.


```
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **040-5466745**
ok!
command (1 search, 2 add, 3 quit): **2**
name: **emily**
number: **045-1212344**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
command (1 search, 2 add, 3 quit): **1**
name: **mary**
no number
command (1 search, 2 add, 3 quit): **2**
name: **peter**
number: **09-22223333**
ok!
command (1 search, 2 add, 3 quit): **1**
name: **peter**
040-5466745
09-22223333
command (1 search, 2 add, 3 quit): **3**
quitting...
```


## إزالة المفاتيح والقيم من القاموس

يمكنك بالطبع إزالة أزواج المفتاح والقيمة من القاموس أيضًا. ثمة طريقتان لتحقيق ذلك. والأولى هي الأمر `del`:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["David"]
print(staff)
```



```
{'Alan': 'lecturer', 'Emily': 'professor'}
```


إذا حاولت استخدام أمر `del` لحذف مفتاح غير موجود في القاموس، فسيحدث خطأ:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
del staff["Paul"]
```


```
>>> del staff["Paul"]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'Paul'
```


لذا، قبل حذف مفتاح ينبغي أن تتحقّق من أنه موجود في القاموس:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
if "Paul" in staff:
  del staff["Paul"]
  print("Deleted")
else:
  print("This person is not a staff member")
```

الطريقة الأخرى لحذف المدخلات في القاموس هي التابع `pop`:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("David")
print(staff)
print(deleted, "deleted")
```


```
{'Alan': 'lecturer', 'Emily': 'professor'}
lecturer deleted
```


كما ترى أعلاه، يُعيد `pop` أيضًا القيمة من المدخل المحذوف.

افتراضيًّا، سيتسبّب `pop` أيضًا في خطأ إذا حاولت حذف مفتاح غير موجود في القاموس. ويمكن تجنّب ذلك بإعطاء التابع وسيطًا ثانيًا يحوي _قيمة إرجاع افتراضية_. وتُعاد هذه القيمة في حال عدم العثور على المفتاح في القاموس. وستفي القيمة الخاصة في Python وهي `None` بالغرض هنا:

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
deleted = staff.pop("Paul", None)
if deleted == None:
  print("This person is not a staff member")
else:
  print(deleted, "deleted")
```


```
This person is not a staff member
```


ملاحظة: إذا احتجت إلى حذف محتويات القاموس بأكمله، وحاولت فعل ذلك بحلقة for، هكذا

```python
staff = {"Alan": "lecturer", "Emily": "professor", "David": "lecturer"}
for key in staff:
  del staff[key]
```

فستتلقّى رسالة خطأ:


```
RuntimeError: dictionary changed size during iteration
```


عند المرور على مجموعة بحلقة `for`، لا يجوز أن تتغيّر المحتويات أثناء تنفيذ الحلقة.

لحسن الحظ، هناك تابع في القاموس مخصّص لهذا الغرض تحديدًا:

```python
staff.clear()
```

> **تمرين برمجي: قلب قاموس**
>
> يُرجى كتابة دالة اسمها `invert(dictionary: dict)`، تأخذ قاموسًا وسيطًا لها. وينبغي قلب القاموس في مكانه بحيث تصبح القيم مفاتيح والمفاتيح قيمًا.

مثال على استخدامه:

```python
s = {1: "first", 2: "second", 3: "third", 4: "fourth"}
invert(s)
print(s)
```


```
{"first": 1, "second": 2, "third": 3, "fourth": 4}
```


**ملاحظة:** تنطبق المبادئ المتعلّقة بالقوائم المشروحة [هنا](/book/mooc/part-5/2-references#using-lists-as-parameters-in-functions) على القواميس التي تُمرَّر وسائط أيضًا.

إذا واجهت صعوبة في إتمام هذا التمرين، فقد تساعدك [أداة التصوير المرئي](http://www.pythontutor.com/visualize.html#mode=edit) على فهم ما تفعله شيفرتك وما لا تفعله.


> **تمرين برمجي: الأرقام مكتوبة بالحروف**
>
> يُرجى كتابة دالة اسمها `dict_of_numbers()`، تُعيد قاموسًا جديدًا. وينبغي أن تكون الأعداد من 0 إلى 99 مفاتيحه. وينبغي أن تكون القيمة المرتبطة بكل مفتاح هي العدد مكتوبًا بالكلمات. يُرجى الاطلاع على المثال أدناه:

```python
numbers = dict_of_numbers()
print(numbers[2])
print(numbers[11])
print(numbers[45])
print(numbers[99])
print(numbers[0])
```


```
two
eleven
forty-five
ninety-nine
zero
```


ملاحظة: يُرجى ألا تصوغ كل عدد مكتوب بالكلمات يدويًّا. فكّر كيف يمكنك استخدام الحلقات والقواميس في حلك.


## استخدام القواميس للبيانات المهيكلة

القواميس مفيدة جدًّا لتنظيم البيانات. وستُنشئ الشيفرة التالية قاموسًا يحوي بعض البيانات الشخصية:

```python
person = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
```

وهذا يعني أن لدينا هنا شخصًا اسمه Pippa Python، طوله 154، ووزنه 61، وعمره 44. ويمكن تخزين المعلومات نفسها في متغيّرات بالقدر نفسه من السهولة:

```python
name = "Pippa Python"
height = 154
weight = 61
age = 44
```

ميزة القاموس أنه مجموعة. فهو يجمع بيانات مترابطة تحت متغيّر واحد، لذا يسهل الوصول إلى مكوّناته المختلفة. وتوفّر القائمة الميزة نفسها:

```python
person = ["Pippa Python", 153, 61, 44]
```

مع القوائم سيكون على المبرمج أن يتذكّر ما هو مخزّن عند كل فهرس في القائمة. فليس هناك ما يشير إلى أن `person[2]` يحتوي على الوزن و`person[3]` على عمر الشخص. وعند استخدام قاموس تُتجنّب هذه المشكلة، إذ يُوصَل إلى كل جزء من البيانات عبر مفتاح مسمّى.

وبافتراض أننا عرّفنا عدة أشخاص بالصيغة نفسها، يمكننا الوصول إلى بياناتهم على النحو التالي:

```python
person1 = {"name": "Pippa Python", "height": 154, "weight": 61, "age": 44}
person2 = {"name": "Peter Pythons", "height": 174, "weight": 103, "age": 31}
person3 = {"name": "Pedro Python", "height": 191, "weight": 71, "age": 14}

people = [person1, person2, person3]

for person in people:
    print(person["name"])

combined_height = 0
for person in people:
    combined_height += person["height"]

print("The average height is", combined_height / len(people))
```


```
Pippa Python
Peter Pythons
Pedro Python
The average height is 173.0
```


> **تمرين برمجي: قاعدة بيانات الأفلام**
>
> يُرجى كتابة دالة اسمها `add_movie(database: list, name: str, director: str, year: int, runtime: int)`، تضيف كائن فيلم جديد إلى قاعدة بيانات أفلام.

قاعدة البيانات قائمة، وكل كائن فيلم في القائمة قاموس. وينبغي أن يحوي القاموس المفاتيح التالية.

* name
* director
* year
* runtime

وتُعطى القيم المرتبطة بهذه المفاتيح وسائط للدالة.

مثال على استخدامه:

```python
database = []
add_movie(database, "Gone with the Python", "Victor Pything", 2017, 116)
add_movie(database, "Pythons on a Plane", "Renny Pytholin", 2001, 94)
print(database)
```


```
[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]
```


> **تمرين برمجي: البحث عن الأفلام**
>
> يُرجى كتابة دالة اسمها `find_movies(database: list, search_term: str)`، تعالج قاعدة بيانات الأفلام المنشأة في التمرين السابق. وينبغي للدالة أن تصوغ قائمة جديدة تحوي فقط الأفلام التي يشمل عنوانها الكلمة المبحوث عنها. ولا تهمّ هنا حالة الأحرف. فالبحث عن `ana` ينبغي أن يعيد قائمة تحوي كلًّا من `Anaconda` و`Management`.

مثال على استخدامه:

```python
database = [{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116},
{"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94},
{"name": "Dawn of the Dead Programmers", "director": "M. Night Python", "year": 2011, "runtime": 101}]

my_movies = find_movies(database, "python")
print(my_movies)
```


```
[{"name": "Gone with the Python", "director": "Victor Pything", "year": 2017, "runtime": 116}, {"name": "Pythons on a Plane", "director": "Renny Pytholin", "year": 2001, "runtime": 94}]
```


في هذه المرحلة من الدورة، يمكنك اختيار المشاركة في دراسة بحثية متعلّقة بتعلّم البرمجة. والمشاركة طوعية، ولا يمكن التعرّف على المشاركين الأفراد من البيانات المجموعة في الدراسة. ويمكنك الانسحاب من التجربة في أي وقت بحرية. [اضغط هنا لبدء الدراسة!](https://runestone.academy/ns/books/published/p3pt/index.html)

<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 6361eeca-a2e2-5577-892c-749706d754f0)

-->
