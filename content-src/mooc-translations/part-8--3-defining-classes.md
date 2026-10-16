---
title: "تعريف الأصناف"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف كيف تعرّف أصنافك الخاصة
> - ستكون قادرًا على إنشاء كائنات بناءً على أصناف عرّفتها بنفسك
> - ستعرف كيف تكتب بانيًا
> - ستألف اسم المعامل `self`
> - ستعرف ما هي الخصائص وكيف تُستخدم


يُعرَّف الصنف بالكلمة المفتاحية `class`. والبنية النحوية كما يلي:

```python
class NameOfClass:
    # class defition goes here
```

وتُسمّى الأصناف عادةً بصيغة _PascalCase_، المعروفة أيضًا بـ_UpperCamelCase_. وهذا يعني أن كل الكلمات في اسم الصنف تُكتب متصلة، بلا مسافات، ويبدأ كل منها بحرف كبير. وأسماء الأصناف التالية تتبع هذا العرف:

* `Weekday`
* `BankAccount`
* `LibraryDatabase`
* `PythonCourseGrades`

وينبغي أن يمثّل تعريف الصنف الواحد كيانًا واحدًا متكاملًا، ينبغي أن ترتبط محتوياته بعضها ببعض ارتباطًا ذرّيًّا. وفي البرامج الأكثر تعقيدًا يمكن أن تحوي الأصناف أعضاء من أصناف أخرى. فمثلًا، يمكن أن يحوي الصنف `Course` كائنات من الصنفين `Lecture` و`ExerciseSession` وهكذا.

ولننظر إلى هيكل تعريف صنف. الوظائف لا تزال مفقودة في هذه المرحلة.

```python
class BankAccount:
    pass
```

تخبر قطعة الشيفرة أعلاه Python بأننا نعرّف هنا صنفًا اسمه `BankAccount`. ولا يحوي الصنف أي وظائف بعد، لكن يمكننا مع ذلك إنشاء كائن بناءً عليه.

ولننظر إلى برنامج يُضاف فيه متغيّران إلى كائن `BankAccount`: وهما `balance` و`owner`. ويُسمّى أي متغيّر مرتبط بكائن _خاصية_ من خصائصه، أو على وجه التحديد _خاصية بيانية_، أو أحيانًا _متغيّر نسخة_.

ويمكن الوصول إلى الخصائص المرتبطة بكائن من خلال الكائن:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter Python"
peters_account.balance = 5.0

print(peters_account.owner)
print(peters_account.balance)
```


```
Peter Python
5.0
```


والخصائص البيانية متاحة فقط من خلال الكائن المرتبطة به. ولكل كائن `BankAccount` منشأ بناءً على الصنف `BankAccount` قيمه الخاصة المسنَدة إلى الخصائص البيانية. ويمكن الوصول إلى تلك القيم بالإشارة إلى الكائن المعني:

```python
account = BankAccount()
account.balance = 155.50

print(account.balance) # This refers to the data attribute balance attached to the account
print(balance) # THIS CAUSES AN ERROR, as there is no such independent variable available, and the object reference is missing
```

## إضافة باني

رأينا في المثال أعلاه أنه يمكن إنشاء نسخة جديدة من صنف باستدعاء تابع باني الصنف هكذا: `NameOfClass()`. ثم أضفنا في ما سبق خصائص بيانية إلى الكائن منفصلًا، لكن من المريح أكثر غالبًا تمرير هذه القيم الأولية للخصائص مباشرة عند إنشاء الكائن. ففي المثال أعلاه كان لدينا أولًا كائن `BankAccount` بلا هذه الخصائص، ولم توجد الخصائص إلا بعد الإعلان عنها صريحًا.

ويؤدي الإعلان عن الخصائص خارج الباني إلى وضع يمكن أن تكون فيه للنسخ المختلفة من الصنف نفسه خصائص مختلفة. وتُنتج الشيفرة التالية خطأً لأن لدينا الآن كائن `BankAccount` آخر، هو `paulas_account`، ولا يحوي الخصائص نفسها:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter"
peters_account.balance = 1400

paulas_account = BankAccount()
paulas_account.owner = "Paula"

print(peters_account.balance)
print(paulas_account.balance) # THIS CAUSES AN ERROR
```

إذًا، بدلًا من الإعلان عن الخصائص بعد إنشاء كل نسخة من الصنف، تكون الفكرة الأفضل عادةً تهيئة قيم الخصائص عند استدعاء باني الصنف. ولأن تعريف الصنف `BankAccount` ليس حاليًّا سوى هيكل، فإن مفسّر Python يفترض تابع الباني ضمنيًّا، لكن من الممكن تعريف تابعات باني خاصة بك، وهذا بالضبط ما سنفعله الآن.

تابع الباني هو إعلان تابع باسم خاص هو `__init__`، ويُضمَّن عادةً في بداية تعريف الصنف تمامًا.

ولننظر إلى صنف `BankAccount` مضافًا إليه تابع باني:

```python
class BankAccount:

    # The constructor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner
```

اسم تابع الباني دائمًا `__init__`. لاحظ _الشرطتين السفليتين على الجانبين_ من كلمة `init`.

وأول معامل في تعريف الباني اسمه دائمًا `self`. ويشير هذا إلى الكائن نفسه، وهو ضروري للإعلان عن أي خصائص مرتبطة بالكائن. والإسناد

`self.balance = balance`

يسند الرصيد المستلم كوسيط إلى خاصية الرصيد في الكائن. ومن الأعراف الشائعة استخدام أسماء المتغيّرات نفسها للمعاملات والخصائص البيانية المعرَّفة في الباني، لكن اسمَي المتغيّرين `self.balance` و`balance` أعلاه يشيران إلى _متغيّرين مختلفين_:

* المتغيّر `self.balance` خاصية من خصائص الكائن. ولكل كائن `BankAccount` رصيده الخاص.

* المتغيّر `balance` معامل في تابع الباني `__init__`. وتُضبط قيمته على القيمة الممرَّرة كوسيط إلى التابع عند استدعاء الباني (أي عند إنشاء نسخة جديدة من الصنف).

والآن وقد عرّفنا معاملات تابع الباني، يمكننا تمرير القيم الأولية المرغوبة للخصائص البيانية كوسائط عند إنشاء كائن جديد:

```python
class BankAccount:

    # The constructor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

# As the method is called, no argument should be given for the self parameter
# Python assigns the value for self automatically
peters_account = BankAccount(100, "Peter Python")
paulas_account = BankAccount(20000, "Paula Pythons")

print(peters_account.balance)
print(paulas_account.balance)
```


```
100
20000
```


أصبح التعامل مع كائنات `BankAccount` الآن أسهل بكثير، إذ يمكن تمرير القيم عند إنشاء الكائن، ويمكن التعامل مع النسختين المستقلتين الناتجتين على نحو أكثر قابلية للتوقّع واتساقًا. كما يضمن الإعلان عن الخصائص البيانية في الباني أن الخصائص مُعلَنة فعلًا، وأن القيم الأولية المرغوبة يعطيها دائمًا المبرمج الذي يستخدم الصنف.

ولا يزال ممكنًا تغيير القيم الأولية للخصائص البيانية لاحقًا في البرنامج:

```python
class BankAccount:

    # The constructor
    def __init__(self, balance: float, owner: str):
        self.balance = balance
        self.owner = owner

peters_account = BankAccount(100, "Peter Python")
print(peters_account.balance)

# Change the balance to 1500
peters_account.balance = 1500
print(peters_account.balance)

# Add 2000 to the balance
peters_account.balance += 2000
print(peters_account.balance)
```


```
100
1500
3500
```


ولننظر إلى مثال آخر على الأصناف والكائنات. سنكتب صنفًا ينمذج سحبًا واحدًا لأرقام اليانصيب:

```python
from datetime import date

class LotteryDraw:

    def __init__(self, round_week: int, round_date: date, numbers: list):
        self.round_week = round_week
        self.round_date = round_date
        self.numbers = numbers


# Create a new LotteryDraw object
round1 = LotteryDraw(1, date(2021, 1, 2), [1,4,8,12,13,14,33])

# Tulostetaan tiedot
print(round1.round_week)
print(round1.round_date)

for number in round1.numbers:
    print(number)
```


```
1
2021-01-02
1
4
8
12
13
14
33
```


وكما ترى أعلاه، يمكن أن تكون الخصائص من أي نوع. وهنا، لكل كائن LotteryDraw خصائص من النوع `list` والنوع `date`.

> **تمرين برمجي: الكتاب**
>
> يُرجى كتابة صنف اسمه `Book` بالخصائص `name` و`author` و`genre` و`year`، مع باني يسند قيمًا أولية إلى هذه الخصائص.

وينبغي أن يعمل صنفك هكذا:

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)

print(f"{python.author}: {python.name} ({python.year})")
print(f"The genre of the book {everest.name} is {everest.genre}")
```


```
Luciano Ramalho: Fluent Python (2015)
The genre of the book High Adventure is autobiography
```


> **تمرين برمجي: ثلاثة أصناف**
>
> يُرجى كتابة الأصناف الثلاثة المحدَّدة أدناه. وينبغي أن يكون لكل صنف الأسماء والأنواع ذاتها بالضبط للخصائص المدرجة.

ويُرجى أيضًا تضمين باني في كل صنف. وينبغي أن يأخذ الباني القيم الأولية للخصائص كوسيطات له، بالترتيب المدرج أدناه.

1. الصنف Checklist
- خاصية header (سلسلة نصية)
- خاصية entries (قائمة)

2. الصنف Customer
- خاصية id (سلسلة نصية)
- خاصية balance (عدد عشري)
- خاصية discount (عدد صحيح)

3. الصنف Cable
- خاصية model (سلسلة نصية)
- خاصية length (عدد عشري)
- خاصية max_speed (عدد صحيح)
- خاصية bidirectional (قيمة منطقية)


## استخدام كائنات مكوَّنة من أصنافك الخاصة

لا تختلف الكائنات المكوَّنة من تعريفات أصنافك الخاصة عن أي كائنات Python أخرى. فيمكن تمريرها كوسائط وقيم مُعادة مثل أي كائن آخر. ويمكننا، مثلًا، كتابة بعض الدوال المساعدة للتعامل مع الحسابات المصرفية:

```python
# this function creates a new bank account object and returns it
def open_account(name: str):
    new_account =  BankAccount(0, name)
    return new_account

# this function adds the amount passed as an argument to the balance of the bank account also passed as an argument
def deposit_money_on_account(account: BankAccount, amount: int):
    account.balance += amount

peters_account = open_account("Peter Python")
print(peters_account.balance)

deposit_money_on_account(peters_account, 500)

print(peters_account.balance)
```


```
0
500
```


> **تمرين برمجي: تعريف صنف: Pet**
>
> يُرجى تعريف الصنف `Pet`. وينبغي أن يضمّ الصنف بانيًا يأخذ القيم الأولية للخصائص `name` و`species` و`year_of_birth` كوسيطات له، بهذا الترتيب تحديدًا.

ويُرجى أيضًا كتابة دالة اسمها `new_pet(name: str, species: str, year_of_birth: int)` _خارج تعريف الصنف_. وينبغي للدالة أن تنشئ وتُرجع كائنًا جديدًا من نوع `Pet`، كما هو معرَّف في الصنف `Pet`.

ومثال على كيفية استخدام الدالة:

```python
fluffy = new_pet("Fluffy", "dog", 2017)
print(fluffy.name)
print(fluffy.species)
print(fluffy.year_of_birth)
```


```
Fluffy
dog
2017
```


> **تمرين برمجي: الكتاب الأقدم**
>
> يُرجى كتابة دالة اسمها `older_book(book1: Book, book2: Book)` تأخذ كائنين من نوع `Book` كوسيطين لها. وينبغي للدالة أن تطبع رسالة بتفاصيل الكتاب الأقدم منهما. وينبغي أن تطبع رسالة مختلفة إذا كُتب الكتابان في السنة نفسها. يُرجى الاطلاع على الأمثلة أدناه.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

older_book(python, everest)
older_book(python, norma)
```


```
High Adventure is older, it was published in 1956
Fluent Python and Norma were published in 2015
```


> **تمرين برمجي: كتب من نوع أدبي**
>
> يُرجى كتابة دالة اسمها `books_of_genre(books: list, genre: str)` تأخذ قائمة من الكائنات من نوع `Book` وسلسلة نصية تمثّل نوعًا أدبيًّا كوسيطين لها.

وينبغي للدالة أن تُرجع قائمة _جديدة_ تحوي الكتب ذات النوع الأدبي المطلوب من القائمة الأصلية. يُرجى الاطلاع على الأمثلة أدناه.

```python
python = Book("Fluent Python", "Luciano Ramalho", "programming", 2015)
everest = Book("High Adventure", "Edmund Hillary", "autobiography", 1956)
norma = Book("Norma", "Sofi Oksanen", "crime", 2015)

books = [python, everest, norma, Book("The Snowman", "Jo Nesbø", "crime", 2007)]

print("Books in the crime genre:")
for book in books_of_genre(books, "crime"):
    print(f"{book.author}: {book.name}")
```


```
Books in the crime genre:
Sofi Oksanen: Norma
Jo Nesbø: The Snowman
```
