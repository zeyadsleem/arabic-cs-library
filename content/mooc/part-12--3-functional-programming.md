---
title: "البرمجة الدالية"
lang: ar
source: "https://programming-26.mooc.fi/part-12/3-functional-programming"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف ما تعنيه البرمجة الدالية
> - ستكون قادرًا على استخدام الدوال `map` و`reduce` و`filter` في برامجك الخاصة


تشير البرمجة الدالية إلى _نمط برمجي_ يتجنّب التغييرات في حالة البرنامج قدر الإمكان. ويُتجنّب استخدام المتغيّرات عمومًا. وبدلًا من ذلك، تشكّل سلاسل استدعاءات الدوال العمود الفقري للبرنامج.

تُعدّ تعبيرات lambda وأنواع الإدراك المختلفة تقنيات شائعة في نمط البرمجة الدالية، إذ تتيح لك معالجة البيانات دون تخزينها في متغيّرات، بحيث لا تتغيّر حالة البرنامج. فمثلًا، تعبير lambda هو دالة من كل النواحي العملية، لكننا لا نحتاج إلى تخزين إشارة مسمّاة إليه في أي مكان.

وكما ذُكر أعلاه، فإن البرمجة الدالية نمط برمجي، أو أسلوب في البرمجة. وهناك أنماط برمجية كثيرة ومختلفة، وقد صادفنا بعضها بالفعل:

* البرمجة الأمرية، حيث يتكوّن البرنامج من سلسلة أوامر تُنفَّذ بالترتيب
* البرمجة الإجرائية، حيث يُجمَّع البرنامج في إجراءات أو برامج فرعية
* البرمجة الكائنية التوجّه، حيث يُخزَّن البرنامج وحالته في كائنات معرّفة في أصناف.

وهناك آراء متباينة حول الفواصل بين الأنماط المختلفة؛ فمثلًا، يرى بعضهم أن البرمجة الأمرية والبرمجة الإجرائية تعنيان الشيء نفسه، بينما يضع آخرون البرمجة الأمرية مصطلحًا شاملًا يغطّي كلاًّ من البرمجة الإجرائية والبرمجة الكائنية التوجّه. ولا تُعدّ المصطلحات والفواصل مهمة إلى هذا الحد، ولا الالتزام الصارم بأحد النمطين دون الآخر، لكن من المهم أن تفهم أن مثل هذه المقاربات المختلفة موجودة، لأنها تؤثّر في الخيارات التي يتخذها المبرمجون.

صُمِّمت لغات برمجة كثيرة مع أخذ أحد النمطين البرمجيين أو الآخر في الاعتبار، لكن Python لغة برمجة متعددة الاستخدامات إلى حد كبير، وتتيح اتباع عدة أنماط برمجية مختلفة، حتى داخل برنامج واحد. وهذا يتيح لنا اختيار الطريقة الأكثر كفاءة ووضوحًا لحلّ كل مسألة.

لننظر إلى بعض أدوات البرمجة الدالية التي توفّرها Python.

## map

تنفّذ دالة `map` عملية ما على كل عنصر في سلسلة قابلة للتكرار. ويبدو هذا أشبه كثيرًا بالأثر الذي يُحدثه الإدراك، لكن الصيغة مختلفة.

لنفترض أن لدينا قائمة سلاسل نصية نريد تحويلها إلى قائمة أعداد صحيحة:

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


الصيغة العامة لدالة `map` هي

`map(<function>, <series>)`

حيث `function` هي العملية التي نريد تنفيذها على كل عنصر في `series`.

تعيد دالة `map` كائنًا من النوع `map`، وهو قابل للتكرار، ويمكن تحويله إلى قائمة:

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


كما ترى من الأمثلة أعلاه، تقبل دالة `map` كلاًّ من دالة lambda المجهولة ودالة مسمّاة معرّفة بالكلمة المفتاحية `def`.

يمكننا تحقيق النتيجة نفسها بإدراك قائمة:

```python
def capitalize(my_string: str):
    first = my_string[0]
    first = first.upper()
    return first + my_string[1:]

test_list = ["first", "second", "third", "fourth"]

capitalized_list = [capitalize(item) for item in test_list]
print(capitalized_list)
```

...أو يمكننا المرور عبر القائمة الأصلية بحلقة `for` وحفظ العناصر المعالَجة في قائمة جديدة بالتابع `append`. وفي العادة تكون هناك حلول كثيرة ومختلفة لكل مسألة في البرمجة. ونادرًا ما توجد إجابات صحيحة أو خاطئة تمامًا. ومعرفة مقاربات كثيرة ومختلفة تساعدك على اختيار الأنسب لكل موقف، أو المقاربة التي تناسب ذوقك الخاص أكثر من غيرها.

يجدر الإشارة إلى أن دالة `map` لا تعيد قائمة، بل كائن _مكرّر_ من النوع map. ويتصرّف المكرّر من نواحٍ كثيرة تصرّف القائمة، لكن هناك استثناءات، كما يظهر في المثال التالي:

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

سيطبع هذا ما يلي:


```
First
Second
Third
Fourth
print the same again:
```


حاولنا أعلاه طباعة محتويات مكرّر `map` مرتين، لكن المحاولة الثانية لم تُنتج أي مخرجات. والسبب هو أن `map` مكرّر؛ فالمرور عبره بحلقة `for` "يستنفده"، تمامًا كما يُستنفد المولّد عند بلوغ قيمته القصوى. وبمجرد اجتياز العناصر في المكرّر بحلقة `for`، لا يبقى شيء للمرور عليه.

إذا كنت بحاجة إلى المرور عبر محتويات مكرّر `map` أكثر من مرة، فيمكنك مثلًا تحويل map إلى قائمة:

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


## دالة map وأصنافك الخاصة

يمكنك بطبيعة الحال معالجة نسخ من أصنافك الخاصة بدالة `map` أيضًا. ولا توجد حِيَل خاصة في ذلك، كما ترى في المثال أدناه:

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


هنا نجمع أولًا أسماء أصحاب الحسابات بدالة `map`. وتُستخدم دالة lambda مجهولة لاسترجاع قيمة الخاصية `name` من كل كائن BankAccount:

```python
clients = map(lambda t: t.name, accounts)
```

وبالمثل، يُجمع رصيد كل BankAccount. وتبدو دالة lambda مختلفة قليلًا، لأن الرصيد يُسترجع باستدعاء تابع، وليس من الخاصية مباشرةً:

```python
balances = map(lambda t: t.get_balance(), accounts)
```

> **تمرين برمجي: الدورات المُحاوَلة**
>
> يحتوي قالب التمرين على تعريف صنف `CourseAttempt`. وهو يعمل هكذا:

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

يُرجى كتابة دالة اسمها `names_of_students(attempts: list)` تأخذ قائمة كائنات CourseAttempt كوسيط لها. وينبغي أن تعيد الدالة قائمة جديدة بأسماء الطلاب الذين حاولوا إتمام المساق.

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


يُرجى تنفيذ الدالة باستخدام دالة `map`.

## المساقات

يُرجى كتابة دالة اسمها `course_names(attempts: list)` تأخذ قائمة كائنات CourseAttempt كوسيط لها. وينبغي أن تعيد الدالة قائمة جديدة تحتوي على أسماء المساقات الواردة في القائمة الأصلية بترتيب أبجدي. وينبغي أن يظهر كل اسم مساق مرة واحدة فقط في القائمة.

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


يُرجى تنفيذ الدالة باستخدام دالة `map`. لكن هذا وحده لن يكفي على الأرجح. وستحتاج إلى شيء آخر أيضًا للتأكد من أن أسماء المساقات فريدة.


## filter

تشبه دالة `filter` المدمجة في Python دالة `map`، لكنها، كما يوحي الاسم، لا تأخذ كل العناصر من المصدر. بل تصفّيها بدالة معيار تُمرَّر كوسيط. وإذا أعادت دالة المعيار `True`، يُختار العنصر.

لننظر إلى مثال باستخدام `filter`:

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


قد يجعل المثال أعلاه أوضح قليلًا إذا استخدمنا دالة مسمّاة بدلًا من ذلك:

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

هذان البرنامجان متطابقان تمامًا من الناحية الوظيفية. والمسألة مسألة رأي في الغالب أيّهما تعدّ المقاربة الأفضل.

لننظر إلى مثال آخر على التصفية. يحاكي هذا البرنامج أسماكًا، ويختار فقط تلك التي تزن 1000 غرام على الأقل:

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


يمكننا بالمثل استخدام إدراك قائمة وتحقيق النتيجة نفسها:

```python
over_a_kilo = [fish for fish in fishes if fish.weight >= 1000]
```

## القيمة التي تعيدها filter هي مكرّر {#the-return-value-of-filter-is-an-iterator}

تشبه دالة `filter` دالة `map` أيضًا في أنها تعيد _مكرّرًا_. وهناك مواقف ينبغي أن تكون فيها حذرًا بشكل خاص مع `filter` لأن المكرّرات لا يمكن اجتيازها إلا مرة واحدة. لذا فإن محاولة طباعة مجموعة الأسماك الكبيرة مرتين لن تعمل بالبساطة التي قد تتوقّعها:

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

سيطبع هذا ما يلي:


```
Pike (1870 g.)
Pike (3410 g.)
Cod (2449 g.)
print the same again:
```


إذا كنت بحاجة إلى المرور عبر محتويات مكرّر `filter` أكثر من مرة، فيمكنك تحويل النتيجة إلى قائمة:

```python
fishes = [f1, f2, f3, f4, f5]

# convert the return value of the filter function into a list
over_a_kilo = list(filter(lambda fish : fish.weight >= 1000, fishes))
```

> **تمرين برمجي: تصفية المحاولات**
>
> في هذا التمرين سنواصل مع صنف `CourseAttempt`.

## المحاولات المقبولة

يُرجى كتابة دالة اسمها `accepted(attempts: list)` تأخذ قائمة كائنات CourseAttempt كوسيط لها. وينبغي أن تعيد الدالة قائمة جديدة من كائنات CourseAttempt، تتضمّن فقط العناصر من القائمة الأصلية التي تكون درجتها 1 على الأقل.

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


يُرجى تنفيذ الدالة باستخدام دالة `filter`.

## المحاولات ذات درجة

يُرجى كتابة دالة اسمها `attempts_with_grade(attempts: list, grade: int)` تأخذ قائمة كائنات CourseAttempt وعددًا صحيحًا كوسيطين لها. وينبغي أن تعيد الدالة قائمة جديدة تحتوي فقط على كائنات CourseAttempt من القائمة الأصلية التي تطابق درجتها الوسيط الثاني.

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


يُرجى تنفيذ الدالة باستخدام دالة `filter`.

## الطلاب الذين نجحوا في المساق

يُرجى كتابة دالة اسمها `passed_students(attempts: list, course: str)` تأخذ قائمة كائنات CourseAttempt واسم مساق كوسيطين لها. وينبغي أن تعيد الدالة قائمة _مرتّبة أبجديًا_ بأسماء الطلاب الذين نجحوا في المساق، أي كانت درجتهم في المساق المعطى أعلى من 0.

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


يُرجى تنفيذ الدالة باستخدام دالتي `filter` و`map`.


## reduce

الدالة الأساسية الثالثة في هذه المقدمة إلى مبادئ البرمجة الدالية هي `reduce`، من وحدة `functools`. وكما يوحي الاسم، غرضها _تقليص_ العناصر في سلسلة إلى قيمة واحدة.

تبدأ دالة `reduce` بعملية وقيمة ابتدائية. وتنفّذ العملية المعطاة على كل عنصر في السلسلة بالتناوب، بحيث تتغيّر القيمة في كل خطوة. وبمجرد معالجة كل العناصر، تُعاد القيمة الناتجة.

لقد قمنا بجمع قوائم الأعداد الصحيحة بطرق مختلفة من قبل، لكن لدينا هنا مثالًا بمساعدة دالة `reduce`. لاحظ أمر `import`؛ فهو ضروري في إصدارات Python 3 وما بعدها للوصول إلى دالة `reduce`. وفي إصدارات Python الأقدم لم يكن أمر `import` مطلوبًا، لذا قد تصادف أمثلة دونه على الإنترنت.

```python
from functools import reduce

my_list = [2, 3, 1, 5]

sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list, 0)

print(sum_of_numbers)
```


```
11
```


لننظر عن قرب أكثر إلى ما يحدث هنا. تأخذ دالة `reduce` ثلاثة وسائط: دالة، وسلسلة عناصر، وقيمة ابتدائية. وفي هذه الحالة، السلسلة قائمة أعداد صحيحة، ولأننا نحسب مجموعًا، فإن القيمة الابتدائية المناسبة هي صفر.

الوسيط الأول دالة تمثّل العملية التي نريد تنفيذها على كل عنصر. وهنا الدالة هي دالة lambda مجهولة:

```python
lambda reduced_sum, item: reduced_sum + item
```

تأخذ هذه الدالة وسيطين: القيمة المقلَّصة الحالية، والعنصر الذي جاء دوره للمعالجة. ويُستخدمان لحساب قيمة جديدة للقيمة المقلَّصة. وفي هذه الحالة تكون القيمة الجديدة مجموع القيمة القديمة والعنصر الحالي.

قد يكون فهم ما تفعله دالة `reduce` فعليًا أسهل إذا استخدمنا دالة مسمّاة عادية بدلًا من دالة lambda. وبهذه الطريقة يمكننا أيضًا تضمين مطبوعات مفيدة:

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

يطبع البرنامج ما يلي:


```
the reduced sum is now 0, next item is 2
the reduced sum is now 2, next item is 3
the reduced sum is now 5, next item is 1
the reduced sum is now 6, next item is 5
11
```


أولًا، تعالج الدالة العنصر ذا القيمة 2. في البداية، المجموع المقلَّص هو 0، وهي القيمة الابتدائية الممرَّرة إلى دالة `reduce`. وتحسب الدالة مجموع هذين وتعيده: `0 + 2 = 2`.

وهذه هي القيمة المخزّنة في `reduced_sum` عندما تعالج دالة `reduce` العنصر التالي في القائمة، ذا القيمة 3. وتحسب الدالة مجموع هذين وتعيده: `2 + 3 = 5`. ثم تُستخدم هذه النتيجة عند معالجة العنصر التالي، وهكذا دواليك.

الآن، الجمع بسيط، إذ توجد حتى الدالة المدمجة `sum` لهذا الغرض. لكن ماذا عن الضرب؟ لا حاجة إلا إلى تغييرات طفيفة لإنشاء جداء مقلَّص:

```python
from functools import reduce

my_list = [2, 2, 4, 3, 5, 2]

product_of_list = reduce(lambda product, item: product * item, my_list, 1)

print(product_of_list)
```


```
480
```


ولأننا نتعامل مع الضرب، فالقيمة الابتدائية ليست صفرًا. بل نستخدم 1. فماذا سيحدث لو استخدمنا 0 قيمةً ابتدائية؟

تعاملنا أعلاه في معظم الأحيان مع الأعداد الصحيحة، لكن `map` و`filter` و`reduce` يمكنها جميعًا التعامل مع مجموعة كائنات من أي نوع.

وكمثال، لنولّد مجموع أرصدة كل الحسابات في مصرف، بمساعدة `reduce`:

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

سيطبع هذا البرنامج ما يلي:


```
The total of the bank's balances:
1005001
```


تلتقط دالة `balance_sum_helper` رصيد كل حساب مصرفي، بالتابع المخصّص لهذا الغرض في تعريف صنف `BankAccount`:

```python
def balance_sum_helper(balance_sum, account):
  return balance_sum + account.get_balance()
```

> **reduce بدون قيمة ابتدائية**
>
> لا تحتاج إلى تمرير وسيط ثالث إلى دالة `reduce` دائمًا. فمثلًا، سيعمل الجمع بشكل جيد تمامًا _بدون_ القيمة الابتدائية:
>
> ```python
> my_list = [2, 3, 1, 5]
>
> sum_of_numbers = reduce(lambda reduced_sum, item: reduced_sum + item, my_list)
>
> print(sum_of_numbers)
> ```
>
> إذا حُذفت القيمة الابتدائية، فإن `reduce` تأخذ العنصر الأول في القائمة قيمةً ابتدائية وتبدأ التقليص من العنصر الثاني فصاعدًا.


**ملاحظة:** إذا كانت العناصر في السلسلة من نوع مختلف عن النتيجة المقلَّصة المقصودة، فإن الوسيط الثالث إلزامي. فلن يعمل المثال الخاص بالحسابات المصرفية بدون القيمة الابتدائية. أي أن محاولة هذا

```python
balances_total = reduce(balance_sum_helper, accounts)
```

ستُنتج خطأً:

```python
TypeError: unsupported operand type(s) for +: 'BankAccount' and 'int'
```

في الحالة أعلاه، عندما تحاول `reduce` تنفيذ الدالة `balance_sum_helper` للمرة الأولى، تكون الوسائط التي تستخدمها هي _العنصران الأولان في القائمة_، وكلاهما من النوع BankAccount. وبشكل أكثر تحديدًا، القيمة المُسنَدة إلى المعامل `balance_sum` هي العنصر الأول في القائمة. وتحاول دالة `balance_sum_helper` إضافة قيمة صحيحة إليها، لكن إضافة عدد صحيح مباشرةً إلى كائن BankAccount عملية غير مدعومة.

> **تمرين برمجي: النقاط الدراسية**
>
> في هذا التمرين سنعمل مع نسخة معدّلة قليلًا من صنف `CourseAttempt`. فقد حُذف اسم الطالب، لكن عدد النقاط الدراسية مُضمَّن. ويعمل الصنف هكذا:

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


## مجموع كل النقاط الدراسية

يُرجى تنفيذ دالة اسمها `sum_of_all_credits` تأخذ قائمة محاولات مساقات كوسيط لها. وتجمع الدالة العدد الإجمالي للنقاط الدراسية التي تغطّيها المساقات. وينبغي أن تعمل هكذا:

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


يُرجى تنفيذ الدالة باستخدام دالة `reduce`.

## مجموع النقاط الدراسية المُجتازة

يُرجى تنفيذ دالة اسمها `sum_of_passed_credits` تأخذ قائمة محاولات مساقات كوسيط لها. وتجمع الدالة النقاط الدراسية لمحاولات المساقات ذات الدرجة 1 أو أعلى. وينبغي أن تعمل هكذا:

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


يُرجى تنفيذ الدالة باستخدام دالتي `reduce` و`filter`.

## متوسط الدرجات للمساقات المُجتازة

يُرجى تنفيذ دالة اسمها `average` تأخذ قائمة محاولات مساقات كوسيط لها. وتحسب الدالة متوسط الدرجات لمحاولات المساقات ذات الدرجة 1 أو أعلى. وينبغي أن تعمل هكذا:

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


يُرجى تنفيذ الدالة باستخدام دالتي `reduce` و`filter`. ملاحظة: يطلب التمرين متوسطًا حسابيًا بسيطًا، وليس متوسطًا مرجّحًا.

أثناء عملك على هذا التمرين، يجدر بك على الأرجح أن تتذكّر أن [القيمة التي تعيدها filter هي مكرّر](/book/mooc/part-12/3-functional-programming#the-return-value-of-filter-is-an-iterator).
