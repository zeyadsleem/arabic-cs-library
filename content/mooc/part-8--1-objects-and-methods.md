---
title: "الكائنات (Objects) والدوال المرتبطة بها (Methods)"
lang: ar
source: "https://programming-26.mooc.fi/part-8/1-objects-and-methods"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد الانتهاء من هذا القسم

- ستعرف ما هو الكائن (object) في البرمجة
- ستفهم ما يُقصد باستقلالية الكائنات الفردية
- ستكون قادراً على إنشاء الكائنات والوصول إليها

</text-box>

هذا هو الجزء الأول من دورة البرمجة المتقدمة. المواد مصممة للاستخدام مع محرر Visual Studio Code، تماماً مثل دورة مقدمة في البرمجة السابقة. إذا لم تكن قد استخدمت Visual Studio Code من قبل، ستجد تعليمات التثبيت [هنا](https://www.mooc.fi/en/installation/vscode)، ومقدمة لبيئة البرمجة من الدورة السابقة [هنا](/part-4/1-vscode).

في دورة مقدمة في البرمجة لاحظنا أنه غالباً ما يكون من المنطقي تجميع البيانات ذات الصلة معاً في برامجنا. على سبيل المثال، إذا كنا نحاول تخزين معلومات عن كتاب، فقد يكون من المنطقي استخدام tuples (أزواج مرتبة) أو dictionaries (قواميس) لتنظيم البيانات في بنية بيانات واحدة.

قد يبدو الحل كالتالي عند استخدام tuple:

```python
name = "In Search of Lost Typing"
author = "Marcel Pythons"
year = 1992

# Combine these in a tuple
book = (name, author, year)

# Print the name of the book
print(book[0])
```

في حالة كهذه، تكمن ميزة استخدام القاموس (dictionary) في إمكانية استخدام النصوص (strings) بدلاً من الفهارس (indexes) كمفاتيح (keys). أي يمكننا إعطاء أسماء وصفية للعناصر المخزنة في بنية البيانات:

```python
name = "In Search of Lost Typing"
author = "Marcel Pythons"
year = 1992

# Combine these in a dictionary
book = {"name": name, "author": author, "year": year}

# Print the name of the book
print(book["name"])
```

في كلا الحالتين نحن ننشئ _كائناً (object)_. في البرمجة، للمصطلح معنى محدد وهو كيان مستقل، في هذه الحالة يحتوي على بعض أجزاء البيانات المرتبطة ببعضها بطريقة ما. الاستقلالية تعني أن أي تغييرات تُجرى على كائن واحد لن تؤثر على الكائنات الأخرى.

إذا أنشأنا تمثيلين متطابقين هيكلياً للكتب، باستخدام قواميس بمفاتيح متطابقة، فإن أي تغييرات تُجرى على أحدهما لن يكون لها أي تأثير على الآخر:

```python
book1 = {"name": "The Old Man and the Pythons", "author": "Ernest Pythons", "year": 1952}
book2 = {"name": "Seven Pythons", "author": "Aleksis Python", "year": 1894}

print(book1["name"])
print(book2["name"])

book1["name"] = "A Farewell to ARM Processors"

print(book1["name"])
print(book2["name"])
```


```
The Old Man and the Pythons
Seven Pythons
A Farewell to ARM Processors
Seven Pythons
```


<img src="8_1_1.png">

<text-box variant="info" name="كائنات Python (Python objects)">

قد تتذكر من دورة مقدمة في البرمجة أن أي قيمة في Python تتم معالجتها داخلياً ككائن (object). هذا يعني أن القيمة المخزنة في متغير (variable) هي _مرجع (reference) لكائن_. البيانات نفسها مخزنة داخل الكائن في ذاكرة الكمبيوتر. إذا عينت قيمة لمتغير جديد بالأمر `a = 3`، فإن القيمة المخزنة في المتغير _ليست_ 3، بل _مرجع لكائن يحتوي على القيمة 3_.

معظم لغات البرمجة الأخرى (على الأقل تلك التي تدعم البرمجة كائنية التوجه) تتضمن بعض _أنواع البيانات البدائية (primitive data types) المعرفة خصيصاً_. هذه عادة ما تتضمن على الأقل الأعداد الصحيحة، الأعداد العشرية، والقيم المنطقية (Boolean). يتم معالجة البدائيات (primitives) مباشرة، مما يعني أنها مخزنة مباشرة في المتغيرات، وليس كمراجع. Python ليس لديها مثل هذه البدائيات، لكن التعامل مع أنواع البيانات الأساسية في Python متشابه جداً عملياً. كائنات أنواع البيانات الأساسية هذه (مثل الأعداد، القيم المنطقية، والنصوص) _غير قابلة للتغيير (immutable)_، مما يعني أنه لا يمكن تغييرها في الذاكرة. إذا كانت القيمة المخزنة في متغير من نوع بيانات أساسي تحتاج للتغيير، يتم استبدال المرجع بالكامل، لكن الكائن نفسه يظل سليماً في الذاكرة.

</text-box>

## الكائنات (Objects) والدوال المرتبطة بها (Methods)

يمكن الوصول للبيانات المخزنة في كائن عبر _الدوال المرتبطة (methods)_. الدالة المرتبطة (method) هي دالة (function) تعمل على الكائن المحدد المرتبط بها. الطريقة للتمييز بين الدوال المرتبطة والدوال الأخرى هي طريقة استدعائها: أولاً تكتب اسم الكائن المستهدف، يتبعه نقطة، ثم اسم الدالة المرتبطة، مع المعاملات (arguments) إن وجدت. على سبيل المثال، الدالة المرتبطة `values` ترجع جميع القيم المخزنة في كائن من نوع قاموس، أو `dict`:

```python
# this creates an object of type dictionary with the name book
book = {"name": "The Old Man and the Pythons", "author": "Ernest Pythons", "year": 1952}

# Print out all the values
# The method call values() is written after the name of the variable
# Remember the dot notation!
for value in book.values():
    print(value)
```


```
The Old Man and the Pythons
Ernest Pythons
1952
```


وبالمثل، دوال النصوص (string methods) تستهدف كائن النص الذي تُستدعى عليه. بعض الأمثلة على دوال النصوص تتضمن `count` و `find`:

```python
name = "Imaginary Irene"

# Print out the number of times the letter I is found
print(name.count("I"))

# The number of letters I found in another string
print("Irreverent Irises in Islington".count("I"))

# The index of the substring Irene
print(name.find("Irene"))

# This string has no such substring
print("A completely different string".find("Irene"))
```


```
2
3
10
-1
```


دوال النصوص ترجع قيم، لكنها لن تغير محتويات النص. كما ذُكر أعلاه، النصوص في Python غير قابلة للتغيير (immutable). هذا لا ينطبق على جميع الدوال المرتبطة، مع ذلك. قوائم Python قابلة للتغيير (mutable)، لذا دوال القوائم المرتبطة قد تغير محتويات القائمة التي تُستدعى عليها:

```python
my_list = [1,2,3]

# Add a couple of items
my_list.append(5)
my_list.append(1)

print(my_list)

# Remove the first item
my_list.pop(0)

print(my_list)
```


```
[1, 2, 3, 5, 1]
[2, 3, 5, 1]
```


> **تمرين برمجي: تمرين برمجي**
>
> يرجى كتابة دالة باسم `smallest_average(person1: dict, person2: dict, person3: dict)`، والتي تأخذ ثلاثة كائنات قاموس (dictionary) كمعاملات (arguments).

كل كائن قاموس يحتوي على قيم مرتبطة بالمفاتيح التالية:

* `"name"`: اسم المتسابق
* `"result1"`: النتيجة الأولى للمتسابق (عدد صحيح بين 1 و 10)
* `"result2"`: النتيجة الثانية للمتسابق (كما أعلاه)
* `"result3"`: النتيجة الثالثة للمتسابق (كما أعلاه)

يجب على الدالة حساب متوسط النتائج الثلاث لكل متسابق، ثم إعادة المتسابق الذي كان متوسط نتائجه الأصغر. قيمة الإرجاع يجب أن تكون كائن القاموس الكامل الذي يحتوي على معلومات المتسابق.

يمكنك افتراض عدم وجود تعادل، أي أن متسابقاً واحداً فقط سيكون لديه أصغر متوسط نتيجة.

مثال على الدالة في العمل:

```python
person1 = {"name": "Mary", "result1": 2, "result2": 3, "result3": 3}
person2 = {"name": "Gary", "result1": 5, "result2": 1, "result3": 8}
person3 = {"name": "Larry", "result1": 3, "result2": 1, "result3": 1}

print(smallest_average(person1, person2, person3))
```


```
{'name': 'Larry', 'result1': 3, 'result2': 1, 'result3': 1}
```


> **تمرين برمجي: تمرين برمجي**
>
> في Python، كل قيمة مخزنة في متغير هي مرجع لكائن، لذا أي قيمة مخزنة في قائمة هي أيضاً مرجع لكائن. هذا صحيح أيضاً عند نمذجة بنية بيانات المصفوفة (matrix): كل قيمة في القائمة ذات المستوى الأعلى هي مرجع لقائمة أخرى، والتي بدورها تحتوي على مراجع للكائنات التي تمثل عناصر المصفوفة.

يرجى كتابة دالة باسم `row_sums(my_matrix: list)`، والتي تأخذ مصفوفة أعداد صحيحة كمعامل (argument).

يجب على الدالة إضافة عنصر جديد في كل صف في المصفوفة. هذا العنصر يحتوي على مجموع العناصر الأخرى في ذلك الصف. الدالة ليس لها قيمة إرجاع. يجب أن تعدل مصفوفة المعامل في مكانها (in place).

مثال على الدالة في العمل:

```python
my_matrix = [[1, 2], [3, 4]]
row_sums(my_matrix)
print(my_matrix)
```


```
[[1, 2, 3], [3, 4, 7]]
```
