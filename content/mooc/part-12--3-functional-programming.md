---
title: "البرمجة الوظيفية"
lang: ar
source: "https://programming-26.mooc.fi/part-12/3-functional-programming"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know what functional programming means
- You will be able to make use of the functions `map`, `reduce` and `filter` in your own programs

</text-box>

تشير البرمجة الوظيفية إلى _نمط برمجة (programming paradigm)_ يتجنب التغييرات في حالة البرنامج قدر الإمكان. يتم تجنب المتغيرات بشكل عام. بدلاً من ذلك، تشكل سلاسل استدعاءات الدوال العمود الفقري للبرنامج.

تعتبر تعابير لامبدا (lambda expressions) وأنواع الاستيعاب (comprehensions) المختلفة تقنيات شائعة في أسلوب البرمجة الوظيفية، لأنها تتيح لك معالجة البيانات دون تخزينها في متغيرات، بحيث لا تتغير حالة البرنامج. على سبيل المثال، تعبير لامبدا هو لجميع الأغراض دالة، لكننا لا نحتاج إلى تخزين مرجع مسمى له في أي مكان.

كما ذُكر أعلاه، البرمجة الوظيفية هي نمط برمجة، أو أسلوب برمجة. هناك العديد من نماذج البرمجة المختلفة، وقد واجهنا بالفعل بعضها:

* البرمجة الأمرية (imperative programming)، حيث يتكون البرنامج من تسلسل من الأوامر التي يتم تنفيذها بالترتيب
* البرمجة الإجرائية (procedural programming)، حيث يتم تجميع البرنامج في إجراءات أو برامج فرعية
* البرمجة كائنية التوجه (object-oriented programming)، حيث يتم تخزين البرنامج وحالته في كائنات معرفة في فئات (classes).

توجد آراء متباينة حول التقسيمات بين النماذج المختلفة؛ فمثلاً، يرى البعض أن البرمجة الأمرية والإجرادية تعني نفس الشيء، بينما يضع آخرون البرمجة الأمرية كمصطلح شامل يغطي كلاً من البرمجة الإجرادية والبرمجة كائنية التوجه. المصطلحات والتقسيمات ليست بهذه الأهمية، ولا يعد التمسك الصارم بنمط واحد أو آخر مهمًا، لكن من المهم فهم وجود مثل هذه المقاربات المختلفة، لأنها تؤثر على الخيارات التي يتخذها المبرمجون.

تم تصميم العديد من لغات البرمجة مع وضع نمط برمجي أو آخر في الاعتبار، لكن Python هي لغة برمجة متعددة الاستخدامات إلى حد ما، وتسمح باتباع عدة نماذج برمجية مختلفة، حتى ضمن برنامج واحد. يتيح لنا هذا اختيار الطريقة الأكثر كفاءة ووضوحًا لحل كل مشكلة.

لنلقِ نظرة على بعض أدوات البرمجة الوظيفية التي توفرها Python.

## map

تُنفذ الدالة `map` عملية معينة على كل عنصر في سلسلة قابلة للتكرار (iterable). هذا يبدو مشابهًا لتأثير الاستيعاب (comprehension)، لكن بناء الجملة (syntax) مختلف.

لنفترض أن لدينا قائمة من السلاسل النصية نريد تحويلها إلى قائمة من الأعداد الصحيحة:

```python
str_list = ["123","-10", "23", "98", "0", "-110"]

integers = map(lambda x : int(x), str_list)

print(integers) # this tells us the type of object we're dealing with

for number in integers:
    print(number)
```


```
<map object at 0x0000021A4BFA9A90>
123
-10
23
98
0
-110
```


بناء الجملة العام للدالة `map` هو:

`map(<function>, <series>)`

حيث `function` هي العملية التي نريد تنفيذها على كل عنصر في `series`.

تُرجع الدالة `map` كائنًا من نوع `map`، وهو قابل للتكرار، ويمكن تحويله إلى قائمة:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

capitalized = map(capitalize, test_list)

capitalized_list = list(capitalized)
print(capitalized_list)
```


```
['First', 'Second', 'Third', 'Fourth']
```


كما ترى من الأمثلة أعلاه، تقبل الدالة `map` كلاً من الدالة غير المسماة (lambda) والدالة المسماة المعرفة بالكلمة المفتاحية `def`.

يمكننا تحقيق نفس النتيجة باستخدام استيعاب القائمة (list comprehension):

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

capitalized_list = [capitalize(item) for item in test_list]
print(capitalized_list)
```

...أو يمكننا المرور عبر القائمة الأصلية بحلقة `for` وحفظ العناصر المعالجة في قائمة جديدة باستخدام دالة `append`. عادةً، في البرمجة توجد حلول عديدة لكل مشكلة. نادرًا ما توجد إجابات صحيحة أو خاطئة بشكل مطلق. إن معرفة مقاربات مختلفة يساعدك على اختيار الأنسب لكل موقف، أو الذي يناسب ذوقك الخاص.\n
تجدر الإشارة إلى أن الدالة `map` لا تُرجع قائمة، بل تُرجع كائن _مكرر (iterator)_ من نوع map. يتصرف المكرر في نواحٍ كثيرة مثل القائمة، لكن هناك استثناءات، كما يمكن رؤيته في المثال التالي:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

# store the return value from the map function
capitalized = map(capitalize, test_list)

for word in capitalized:
  print(word)

print("print the same again:")
for word in capitalized:
  print(word)
```

هذا سيطبع ما يلي:


```
First
Second
Third
Fourth
print the same again:
```


أعلاه حاولنا طباعة محتويات مكرر `map` مرتين، لكن المحاولة الثانية لم تنتج أي طباعة. السبب هو أن `map` هو مكرر؛ المرور عبره بحلقة `for` "يستنزفه"، تمامًا كما يستنفد المولد (generator) بمجرد الوصول إلى قيمته القصوى. بمجرد المرور عبر عناصر المكرر بحلقة `for`، لا يبقى شيء للمرور عليه.

إذا كنت بحاجة للمرور عبر محتويات مكرر `map` أكثر من مرة، يمكنك، على سبيل المثال، تحويل map إلى قائمة:

```python
test_list = ["first", "second", "third", "fourth"]

# convert the return value of the map function into a list
capitalized = list(map(capitalize, test_list))

for word in capitalized:
  print(word)

print("print the same again:")
for word in capitalized:
  print(word)
```


```
First
Second
Third
Fourth
print the same again:
First
Second
Third
Fourth
```


## دالة map وفئاتك الخاصة

يمكنك بطبيعة الحال معالجة كائنات فئاتك الخاصة باستخدام الدالة `map`. لا توجد حيل خاصة، كما ترى في المثال أدناه:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

clients = map(lambda t: t.name, accounts)
for name in clients:
  print(name)

balances = map(lambda t: t.get_balance(), accounts)
for balance in balances:
  print(balance)
```


```
Randy Riches
Paul Pauper
Mary Millionaire
5000
1
1000000
```


هنا نجمع أولاً أسماء أصحاب الحسابات باستخدام دالة `map`. تُستخدم دالة لامبدا غير مسماة لاسترجاع قيمة السمة `name` من كل كائن BankAccount:

```python
clients = map(lambda t: t.name, accounts)
```

وبالمثل، يُجمع رصيد كل BankAccount. تبدو دالة لامبدا مختلفة قليلاً، لأن الرصيد يُسترجع باستدعاء دالة (method)، وليس من السمة مباشرة:

```python
balances = map(lambda t: t.get_balance(), accounts)
```

> **تمرين تفاعلي: تمرين تفاعلي**
>
> يحتوي قالب التمرين على تعريف فئة `CourseAttempt`. تعمل كالتالي:

```python
attempt = CourseAttempt("Peter Python", "Introduction to Programming", 5)
print(attempt.student_name)
print(attempt.course_name)
print(attempt.grade)
print(attempt)
```


```
Peter Python
Introduction to Programming
5
Peter Python, grade for the course Introduction to Programming 5
```


## أسماء الطلاب

اكتب دالة باسم `names_of_students(attempts: list)` تأخذ قائمة من كائنات CourseAttempt كمعامل. يجب أن تُرجع الدالة قائمة جديدة بأسماء الطلاب الذين حاولوا الدورة.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 2)

for name in names_of_students([s1, s2, s3]):
    print(name)
```


```
Peter Python
Olivia C. Objective
Peter Python
```


يرجى تنفيذ الدالة باستخدام دالة `map`.

## الدورات

اكتب دالة باسم `course_names(attempts: list)` تأخذ قائمة من كائنات CourseAttempt كمعامل. يجب أن تُرجع الدالة قائمة جديدة تحتوي على أسماء الدورات من القائمة الأصلية بترتيب أبجدي. يجب أن يظهر كل اسم دورة مرة واحدة فقط في القائمة.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 2)

for name in course_names([s1, s2, s3]):
    print(name)
```

```
Advanced Course in Programming
Introduction to Programming
```


يرجى تنفيذ الدالة باستخدام دالة `map`. هذا وحده لن يكون كافيًا على الأرجح. ستحتاج إلى شيء آخر أيضًا لضمان تميز أسماء الدورات.


## filter

الدالة المدمجة في Python `filter` مشابهة لدالة `map`، لكن كما يوحي الاسم، فهي لا تأخذ جميع العناصر من المصدر. بدلاً من ذلك، تقوم بتصفيتها بدالة معيار (criterion function) تُمرر كمعامل. إذا أرجعت دالة المعيار `True`، يتم اختيار العنصر.

لنلقِ نظرة على مثال باستخدام `filter`:

```python
integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(lambda number: number % 2 == 0, integers)

for number in even_numbers:
    print(number)
```


```
2
6
4
10
14
```


قد يجعل المثال أعلاه أكثر وضوحًا إذا استخدمنا دالة مسماة بدلاً من ذلك:

```python
def is_it_even(number: int):
    if number % 2 == 0:
        return True
    return False

integers = [1, 2, 3, 5, 6, 4, 9, 10, 14, 15]

even_numbers = filter(is_it_even, integers)

for number in even_numbers:
    print(number)
```

هذان البرنامجان متطابقان وظيفيًا تمامًا. الأمر في الغالب مسألة رأي أيهما تعتبر الأسلوب الأفضل.

لنلقِ نظرة على مثال تصفية آخر. هذا البرنامج يمثل أسماكًا، ويختار فقط تلك التي تزن 1000 جرام على الأقل:

```python
class Fish:
    """ The class models a fish of a certain species and weight """
    def __init__(self, species: str, weight: int):
        self.species = species
        self.weight = weight

    def __repr__(self):
        return f"{self.species} ({self.weight} g.)"

if __name__ == "__main__":
    f1 = Fish("Pike", 1870)
    f2 = Fish("Perch", 763)
    f3 = Fish("Pike", 3410)
    f4 = Fish("Cod", 2449)
    f5 = Fish("Roach", 210)

    fishes = [f1, f2, f3, f4, f5]

    over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

    for fish in over_a_kilo:
        print(fish)
```


```
Pike (1870 g.)
Pike (3410 g.)
Cod (2449 g.)
```


يمكننا بسهولة استخدام استيعاب القائمة وتحقيق نفس النتيجة:

```python
over_a_kilo = [fish for fish in fishes if fish.weight >= 1000]
```

## قيمة إرجاع filter هي مكرر

تشبه دالة `filter` دالة `map` في أنها تُرجع أيضًا _مكررًا (iterator)_. توجد حالات يجب أن تكون حذرًا فيها بشكل خاص مع `filter`، لأن المكررات يمكن المرور عليها مرة واحدة فقط. لذا، محاولة طباعة مجموعة الأسماك الكبيرة مرتين لن تعمل بشكل مباشر كما قد تظن:

```python
f1 = Fish("Pike", 1870)
f2 = Fish("Perch", 763)
f3 = Fish("Pike", 3410)
f4 = Fish("Cod", 2449)
f5 = Fish("Roach", 210)

fishes = [f1, f2, f3, f4, f5]

over_a_kilo = filter(lambda fish : fish.weight >= 1000, fishes)

for fish in over_a_kilo:
    print(fish)

print("print the same again:")

for Fish in over_a_kilo:
    print(Fish)
```

هذا سيطبع ما يلي:


```
Pike (1870 g.)
Pike (3410 g.)
Cod (2449 g.)
print the same again:
```


إذا كنت بحاجة للمرور عبر محتويات مكرر `filter` أكثر من مرة، يمكنك تحويل النتيجة إلى قائمة:

```python
fishes = [f1, f2, f3, f4, f5]

# convert the return value of the filter function into a list
over_a_kilo = list(filter(lambda fish : fish.weight >= 1000, fishes))
```

> **تمرين تفاعلي: تمرين تفاعلي**
>
> في هذا التمرين سنستمر مع فئة `CourseAttempt`.

## المحاولات المقبولة

اكتب دالة باسم `accepted(attempts: list)` تأخذ قائمة من كائنات CourseAttempt كمعامل. يجب أن تُرجع الدالة قائمة جديدة من كائنات CourseAttempt، تتضمن فقط تلك العناصر من القائمة الأصلية التي درجة نجاحها 1 على الأقل.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Advanced Course in Programming", 0)

for attempt in accepted([s1, s2, s3]):
    print(attempt)
```


```
Peter Python, grade for the course Introduction to Programming 3
Olivia C. Objective grade for the course Introduction to Programming 5
```


يرجى تنفيذ الدالة باستخدام دالة `filter`.

## المحاولات ذات الدرجة

اكتب دالة בשם `attempts_with_grade(attempts: list, grade: int)` تأخذ قائمة من كائنات CourseAttempt وعددًا صحيحًا كمعاملين. يجب أن تُرجع الدالة قائمة جديدة تحتوي فقط على كائنات CourseAttempt من القائمة الأصلية التي تتطابق درجتها مع المعامل الثاني.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to Programming", 5)
s3 = CourseAttempt("Peter Python", "Introduction to AI", 3)
s4 = CourseAttempt("Olivia C. Objective", "Data Structures and Algorithms", 3)

for attempt in attempts_with_grade([s1, s2, s3, s4], 3):
    print(attempt)
```


```
Peter Python, grade for the course Introduction to Programming 3
Peter Python, grade for the course Introduction to AI 3
Olivia C. Objective, grade for the course Data Structures and Algorithms 3
```


يرجى تنفيذ الدالة باستخدام دالة `filter`.

## الطلاب الذين اجتازوا الدورة

اكتب دالة باسم `passed_students(attempts: list, course: str)` تأخذ قائمة من كائنات CourseAttempt واسم دورة كمعاملين. يجب أن تُرجع الدالة قائمة _مرتبة أبجديًا_ بأسماء الطلاب الذين اجتازوا الدورة، أي أن درجاتهم للدورة المعطاة كانت أعلى من 0.

```python
s1 = CourseAttempt("Peter Python", "Introduction to Programming", 3)
s2 = CourseAttempt("Olivia C. Objective", "Introduction to AI", 5)
s3 = CourseAttempt("Peter Python", "Introduction to AI", 0)
s4 = CourseAttempt("Jack Java", "Introduction to AI", 3)

for attempt in passed_students([s1, s2, s3, s4], "Introduction to AI"):
    print(attempt)
```


```
Jack Java
Olivia C. Objective
```


يرجى تنفيذ الدالة باستخدام دالتي `filter` و `map`.


## reduce

ركيزة ثالثة في هذا المقدمة لمبادئ البرمجة الوظيفية هي `reduce`، من وحدة `functools`. كما يوحي الاسم، غرضها هو _تقليل (reduce)_ العناصر في سلسلة إلى قيمة واحدة.

تبدأ دالة `reduce` بعملية وقيمة أولية. تؤدي العملية المحددة على كل عنصر في السلسلة بدورهم، بحيث تتغير القيمة في كل خطوة. بمجرد معالجة جميع العناصر، تُرجع القيمة الناتجة.

لقد قمنا بجمع قوائم الأعداد الصحيحة بطرق مختلفة من قبل، لكن هنا مثال بمساعدة دالة `reduce`. لاحظ جملة `import`؛ في إصدارات Python 3 وما فوق من الضروري الوصول إلى دالة `reduce`. في إصدارات Python الأقدم لم تكن جملة `import` مطلوبة، لذا قد تصادف أمثلة بدونها على الإنترنت.

```python
from functools import reduce

my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list, 0)

print(sum_of_numbers)
```


```
11
```


لنلقِ نظرة فاحصة على ما يحدث هنا. تأخذ دالة `reduce` ثلاثة معاملات: دالة، وسلسلة من العناصر، وقيمة أولية. في هذه الحالة، السلسلة هي قائمة من الأعداد الصحيحة، وبما أننا نحسب المجموع، فإن القيمة الأولية المناسبة هي صفر.

المعامل الأول هو دالة، تمثل العملية التي نريد تنفيذها على كل عنصر. هنا الدالة هي دالة لامبدا غير مسماة:

```python
lambda reduced_sum, item: reduced_sum + item
```

تأخذ هذه الدالة معاملين: القيمة المختزلة الحالية والعنصر الذي حان دوره للمعالجة. تُستخدم لحساب قيمة جديدة للقيمة المختزلة. في هذه الحالة، القيمة الجديدة هي مجموع القيمة القديمة والعنصر الحالي.

قد يكون من الأسهل فهم ما تفعله دالة `reduce` فعليًا إذا استخدمنا دالة مسماة عادية بدلاً من دالة لامبدا. بهذه الطريقة يمكننا أيضًا تضمين طباعات مساعدة:

```python
from functools import reduce

my_list = [2, 3, 1, 5]

# a helper function for reduce, adds one value to the current reduced sum
def sum_helper(reduced_sum, item):
  print(f"the reduced sum is now {reduced_sum}, next item is {item}")
  # the new reduced sum is the old sum + the next item
  return reduced_sum + item

sum_of_numbers = reduce(sum_helper, my_list, 0)

print(sum_of_numbers)
```

البرنامج يطبع:


```
the reduced sum is now 0, next item is 2
the reduced sum is now 2, next item is 3
the reduced sum is now 5, next item is 1
the reduced sum is now 6, next item is 5
11
```


أولاً، تهتم الدالة بالعنصر ذو القيمة 2. في البداية، المجموع المختزل هو 0، وهي القيمة الأولية الممررة إلى دالة `reduce`. تحسب الدالة وتعيد مجموع هذين: `0 + 2 = 2`.

هذه هي القيمة المخزنة في `reduced_sum` بينما تتعامل دالة `reduce` مع العنصر التالي في القائمة، ذو القيمة 3. تحسب الدالة وتعيد مجموع هذين: `2 + 3 = 5`. تُستخدم هذه النتيجة عند معالجة العنصر التالي، وهكذا دواليك.

الجمع بسيط، حيث توجد حتى دالة `sum` المدمجة لهذا الغرض. لكن ماذا عن الضرب؟ فقط تغييرات طفيفة مطلوبة لإنشاء حاصل ضرب مختزل:

```python
from functools import reduce

my_list = [2, 2, 4, 3, 5, 2]

product_of_list = reduce(lambda product, item: product * item, my_list, 1)

print(product_of_list)
```


```
480
```


بما أننا نتعامل مع الضرب، فإن القيمة الأولية ليست صفرًا. بدلاً من ذلك، نستخدم 1. ماذا سيحدث لو استخدمنا 0 كقيمة أولية؟

أعلاه تعاملنا إلى حد كبير مع الأعداد الصحيحة، لكن `map` و `filter` و `reduce` يمكنهم جميعًا التعامل مع مجموعة من الكائنات من أي نوع.

كمثال، لنولِّد مجموع أرصدة جميع الحسابات في بنك، بمساعدة `reduce`:

```python
class BankAccount:
    def __init__(self, account_number: str, name: str, balance: float):
        self.__account_number = account_number
        self.name = name
        self.__balance = balance

    def deposit(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

a1 = BankAccount("123456", "Randy Riches", 5000)
a2 = BankAccount("12321", "Paul Pauper", 1)
a3 = BankAccount("223344", "Mary Millionaire ", 1000000)

accounts = [a1, a2, a3]

from functools import reduce

def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()

balances_total = reduce(balance_sum_helper, accounts, 0)

print("The total of the bank's balances:")
print(balances_total)
```

هذا البرنامج سيطبع:


```
The total of the bank's balances:
1005001
```


دالة `balance_sum_helper` تأخذ رصيد كل حساب بنكي، بالطريقة المخصصة لذلك في تعريف فئة `BankAccount`:

```python
def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()
```

<text-box variant='hint' name='Reduce without an initial value'>

لا تحتاج دائمًا لتمرير معامل ثالث إلى دالة `reduce`. على سبيل المثال، الجمع سيعمل جيدًا _بدون_ القيمة الأولية:

```python
my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list)

print(sum_of_numbers)
```

إذا تُركت القيمة الأولية، تأخذ `reduce` العنصر الأول في القائمة كقيمة أولية وتبدأ التخفيف من العنصر الثاني فصاعدًا.

</text-box>

**ملاحظة:** إذا كانت العناصر في السلسلة من نوع مختلف عن نتيجة التخفيف المقصودة، فالمعامل الثالث إلزامي. مثال الحسابات البنكية لن يعمل بدون القيمة الأولية. أي أن محاولة هذا:

```python
balances_total = reduce(balance_sum_helper, accounts)
```

ستنتج خطأ:

```python
TypeError: unsupported operand type(s) for +: 'BankAccount' and 'int'
```

في الحالة أعلاه، عندما تحاول `reduce` تنفيذ دالة `balance_sum_helper` لأول مرة، المعاملات التي تستخدمها هي _العنصرين الأولين في القائمة_، وكلاهما من نوع BankAccount. على وجه التحديد، القيمة المعينة للمعلمة `balance_sum` هي العنصر الأول في القائمة. تحاول دالة `balance_sum_helper` إضافة قيمة عدد صحيح إليها، لكن إضافة عدد صحيح مباشرة إلى كائن BankAccount ليست عملية مدعومة.

> **تمرين تفاعلي: تمرين تفاعلي**
>
> في هذا التمرين سنعمل مع نسخة معدلة قليلاً من فئة `CourseAttempt`. يُحذف اسم الطالب، لكن يُضمَّن عدد الأرصدة (credits). تعمل الفئة كالتالي:

```python
attempt = CourseAttempt("Data Structures and Algorithms", 3, 10)
print(attempt)
print(attempt.course_name)
print(attempt.credits)
print(attempt.grade)
```


```
Data Structures and Algorithms (10 cr) grade 3
Data Structures and Algorithms
10
3
```


## مجموع جميع الأرصدة

نفذ دالة باسم `sum_of_all_credits` تأخذ قائمة من محاولات الدورات كمعامل. تجمع الدالة إجمالي عدد الأرصدة الدراسية التي تغطيها الدورات. يجب أن تعمل كالتالي:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 4, 5)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
credit_sum = sum_of_all_credits([s1, s2, s3])
print(credit_sum)
```


```
20
```


يرجى تنفيذ الدالة باستخدام دالة `reduce`.

## مجموع الأرصدة المجتازة

نفذ دالة باسم `sum_of_passed_credits` تأخذ قائمة من محاولات الدورات كمعامل. تجمع الدالة الأرصدة لمحاولات الدورات ذات الدرجة 1 أو أعلى. يجب أن تعمل كالتالي:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 0, 4)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
credit_sum = sum_of_passed_credits([s1, s2, s3])
print(credit_sum)
```


```
15
```


يرجى تنفيذ الدالة باستخدام دالتي `reduce` و `filter`.

## متوسط الدرجات للدورات المجتازة

نفذ دالة باسم `average` تأخذ قائمة من محاولات الدورات كمعامل. تحسب الدالة متوسط الدرجات لمحاولات الدورات ذات الدرجة 1 أو أعلى. يجب أن تعمل كالتالي:

```python
s1 = CourseAttempt("Introduction to Programming", 5, 5)
s2 = CourseAttempt("Advanced Course in Programming", 0, 4)
s3 = CourseAttempt("Data Structures and Algorithms", 3, 10)
ag = average([s1, s2, s3])
print(ag)
```


```
4.0
```


يرجى تنفيذ الدالة باستخدام دالتي `reduce` و `filter`. ملاحظة: التمرين يطلب قيمة متوسط بسيطة، وليس متوسطًا مرجحًا.

أثناء العمل على هذا التمرين، من المفيد تذكر أن [قيمة إرجاع filter هي مكرر](/part-12/3-functional-programming#the-return-value-of-filter-is-an-iterator).
