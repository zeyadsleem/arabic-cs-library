---
title: "تعريف التوابع"
lang: ar
source: "https://programming-26.mooc.fi/part-8/4-defining-methods"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف كيف تعمل توابع الصنف
> - ستكون قادرًا على كتابة توابع جديدة في أصنافك الخاصة
> - ستفهم مفهومي التغليف والعميل في البرمجة كائنية التوجّه


الصنوف التي لا تحتوي إلا على خصائص بيانات لا تختلف كثيرًا عن القواميس. وستجد أدناه طريقتين لتمثيل حساب مصرفي، الأولى بتعريف صنف، ثم باستخدام قاموس.

```python
# Example 1: bank account with class definition
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
```

```python
# Example 2: bank account with dictionary
peters_account = {"account_number": "12345-678", "owner": "Peter Python", "balance": 1500.0, "annual_interest": 0.015}
```

مع القاموس يكون التنفيذ أقصر بكثير وأكثر مباشرة. أما مع الصنف فالبنية أكثر «إحكامًا»، بحيث يمكننا أن نتوقّع أن تكون كل كائنات `BankAccount` متشابهة في البنية. والصنف يحمل اسمًا أيضًا. فيُشار إلى الصنف `BankAccount` عند إنشاء حساب مصرفي جديد، ويكون نوع الكائن `BankAccount` لا `dict`.

ومن المزايا المهمّة الأخرى للأصناف أنها، إضافة إلى البيانات، يمكن أن تحتوي على وظائف. ومن المبادئ الموجِّهة في البرمجة كائنية التوجّه أن الكائن يُستخدم للوصول إلى كلٍّ من البيانات المرتبطة بالكائن والوظائف اللازمة لمعالجة تلك البيانات.

## التوابع في الأصناف

التابع هو برنامج فرعي أو دالة مرتبطة بصنف معيّن. وعادةً لا يؤثر التابع إلا في كائن واحد. ويُعرَّف التابع داخل تعريف الصنف، ويمكنه الوصول إلى خصائص بيانات الصنف تمامًا مثل أي متغيّر آخر.

لنواصل مع الصنف `BankAccount` الذي قدّمناه أعلاه. ولدينا أدناه تابع جديد يضيف الفائدة إلى الحساب:

```python
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

    # This method adds the annual interest to the balance of the account
    def add_interest(self):
        self.balance += self.balance * self.annual_interest


peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
peters_account.add_interest()
print(peters_account.balance)
```


```
1522.5
```


يضرب التابع `add_interest` رصيد الحساب في نسبة الفائدة السنوية، ثم يضيف الناتج إلى الرصيد الحالي. ولا يعمل التابع إلا على الكائن الذي استُدعي عليه.

لنرَ كيف يعمل ذلك حين نكون قد أنشأنا عدّة نسخ من الصنف:

```python
# The class BankAccount is defined in the previous example

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
paulas_account = BankAccount("99999-999", "Paula Pythonen", 1500.0, 0.05)
pippas_account = BankAccount("1111-222", "Pippa Programmer", 1500.0, 0.001)

# Add interest on Peter's and Paula's accounts, but not on Pippa's
peters_account.add_interest()
paulas_account.add_interest()

# Print all account balances
print(peters_account.balance)
print(paulas_account.balance)
print(pippas_account.balance)
```


```
1522.5
1575.0
1500.0
```


وكما ترى أعلاه، لا تُضاف الفائدة السنوية إلا إلى الحسابات التي استُدعي التابع عليها. ولأن نسب الفائدة السنوية مختلفة في حسابَي Peter وPaula، فإن النتائج تختلف في هذين الحسابين. أما رصيد حساب Pippa فلا يتغيّر، لأن التابع `add_interest` لم يُستدعَ على الكائن `pippas_account`.

## التغليف {#encapsulation}

في البرمجة كائنية التوجّه تظهر كلمة _العميل_ من حين إلى آخر. ويُقصد بها قسم من الشيفرة ينشئ كائنًا ويستخدم الخدمة التي توفّرها توابعه. وعندما تُستخدم البيانات التي يحتويها كائن عبر التوابع التي يوفّرها فقط، يُضمن _التكامل الداخلي_ للكائن. وعمليًا يعني هذا أن صنف `BankAccount` مثلًا يوفّر توابع للتعامل مع خاصية `balance`، فلا يصل العميل إلى الرصيد مباشرةً أبدًا. ويمكن لهذه التوابع حينها أن تتحقّق من أن الرصيد غير مسموح له بأن يهبط تحت الصفر، على سبيل المثال.

ومثال على كيفية عمل ذلك:

```python
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

    # This method adds the annual interest to the balance of the account
    def add_interest(self):
        self.balance += self.balance * self.annual_interest

    # This method "withdraws" money from the account
    # If the withdrawal is successful the method returns True, and False otherwise
    def withdraw(self, amount: float):
        if amount <= self.balance:
            self.balance -= amount
            return True

        return False

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)

if peters_account.withdraw(1000):
    print("The withdrawal was successful, the balance is now", peters_account.balance)
else:
    print("The withdrawal was unsuccessful, the balance is insufficient")

# Yritetään uudestaan
if peters_account.withdraw(1000):
    print("The withdrawal was successful, the balance is now", peters_account.balance)
else:
    print("The withdrawal was unsuccessful, the balance is insufficient")
```


```
The withdrawal was successful, the balance is now 500.0
The withdrawal was unsuccessful, the balance is insufficient
```


تُسمّى المحافظة على التكامل الداخلي للكائن وتوفير توابع ملائمة لضمان ذلك _التغليف_. والفكرة أن أعمال الكائن الداخلية تبقى مخفية عن العميل، لكن الكائن يوفّر توابع يمكن استخدامها للوصول إلى البيانات المخزّنة فيه.

إضافة تابع لا تخفي الخاصية تلقائيًا. فرغم أن تعريف صنف `BankAccount` يحتوي على التابع `withdraw` لسحب المال، فإن شيفرة العميل لا تزال قادرة على الوصول إلى خاصية `balance` وتغييرها مباشرةً:

```python
peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)

# Attempt to withdraw 2000
if peters_account.withdraw(2000):
    print("The withdrawal was successful, the balance is now", peters_account.balance)
else:
    print("The withdrawal was unsuccessful, the balance is insufficient")

    # "Force" the withdrawal of 2000
    peters_account.balance -= 2000

print("The balance is now:", peters_account.balance)
```


```
The withdrawal was unsuccessful, the balance is insufficient
The balance is now: -500.0
```


من الممكن إخفاء خصائص البيانات عن شيفرة العميل، وقد يساعد ذلك في حلّ هذه المشكلة. وسنعود إلى هذا الموضوع في الجزء التالي.

> **تمرين برمجي: عدّاد تنازلي**
>
> يتضمّن هذا التمرين عدّة أجزاء. ويمكنك تسليم الأجزاء منفصلة. ويستحق كل جزء نقطة تمرين واحدة.

يحتوي قالب التمرين على صنف مكتمل جزئيًا هو `DecreasingCounter`:

```python
class DecreasingCounter:
    def __init__(self, initial_value: int):
        self.value = initial_value

    def print_value(self):
        print("value:", self.value)

    def decrease(self):
        pass

    # define the rest of your methods here
```

يمكن الآن استخدام الصنف كما هو موضّح أدناه، وينبغي أن ينتج المخرجات التالية بعد إكمال الجزء الأول من التمرين:

```python
counter = DecreasingCounter(10)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
```


```
value: 10
value: 9
value: 8
```



### إنقاص قيمة العدّاد

يُرجى إكمال التابع `decrease` المعرَّف في القالب، بحيث ينقص القيمة المخزّنة في العدّاد بمقدار واحد. وراجع المثال أعلاه لمعرفة السلوك المتوقّع.

### يجب ألّا تكون قيمة العدّاد سالبة

يُرجى إضافة وظيفة إلى تابعك `decrease`، بحيث لا تصل قيمة العدّاد أبدًا إلى قيم سالبة. فإذا كانت قيمة العدّاد 0، فلن تُنقَص أكثر.

```python
counter = DecreasingCounter(2)
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
counter.decrease()
counter.print_value()
```


```
value: 2
value: 1
value: 0
value: 0
```


### ضبط القيمة على صفر

يُرجى إضافة تابع `set_to_zero` يضبط قيمة العدّاد على 0:

```python
counter = DecreasingCounter(100)
counter.print_value()
counter.set_to_zero()
counter.print_value()
```


```
value: 100
value: 0
```


### إعادة ضبط العدّاد

يُرجى إضافة تابع `reset_original_value()` يعيد العدّاد إلى حالته الابتدائية:

```python
counter = DecreasingCounter(55)
counter.decrease()
counter.decrease()
counter.decrease()
counter.decrease()
counter.print_value()
counter.reset_original_value()
counter.print_value()
```


```
value: 51
value: 55
```


وختامًا لهذا القسم، لننظر إلى صنف يمثّل أفضل نتيجة شخصية للاعب. ويحتوي تعريف الصنف على توابع تحقّق منفصلة تتأكّد من صلاحية الوسائط المُمرَّرة. وتُستدعى هذه التوابع بالفعل داخل الباني. ويضمن ذلك أن الكائن المُنشأ سليم داخليًا.

```python
from datetime import date

class PersonalBest:

    def __init__(self, player: str, day: int, month: int, year: int, points: int):
        # Default values
        self.player = ""
        self.date_of_pb = date(1900, 1, 1)
        self.points = 0

        if self.name_ok(player):
            self.player = player

        if self.date_ok(day, month, year):
            self.date_of_pb = date(year, month, day)

        if self.points_ok(points):
            self.points = points

    # Helper methods to check the arguments are valid
    def name_ok(self, name: str):
        return len(name) >= 2 # Name should be at least two characters long

    def date_ok(self, day, month, year):
        try:
            date(year, month, day)
            return True
        except:
            # an exception is raised if the arguments are not valid
            return False

    def points_ok(self, points):
        return points >= 0

if __name__ == "__main__":
    result1 = PersonalBest("Peter", 1, 11, 2020, 235)
    print(result1.points)
    print(result1.player)
    print(result1.date_of_pb)

    # The date was not valid
    result2 = PersonalBest("Paula", 4, 13, 2019, 4555)
    print(result2.points)
    print(result2.player)
    print(result2.date_of_pb) # Tulostaa oletusarvon 1900-01-01
```


```
235
Peter
2020-11-01
4555
Paula
1900-01-01
```


وفي المثال أعلاه استُدعيت التوابع المساعدة أيضًا عبر اسم المعامل `self` حين استُخدمت في الباني. ومن الممكن كذلك تضمين تعريفات توابع _ساكنة_ في تعريفات الأصناف. وهذه توابع يمكن استدعاؤها دون إنشاء نسخة من الصنف على الإطلاق. وسنعود إلى هذا الموضوع في الجزء التالي.

لا يُستخدم اسم المعامل `self` إلا عند الإشارة إلى ميزات _الكائن بوصفه نسخة من الصنف_. وتشمل هذه كلًّا من خصائص البيانات والتوابع المرتبطة بالكائن. ولزيادة الالتباس في المصطلحات، يُشار إلى خصائص البيانات والتوابع معًا أحيانًا ببساطة باسم _خصائص_ الكائن، ولهذا حدّدنا في هذه المادة غالبًا _خصائص البيانات_ حين نعني المتغيّرات المعرَّفة داخل الصنف. وهنا تختلف مصطلحات بعض مبرمجي Python قليلًا عن المصطلحات المستخدمة في البرمجة كائنية التوجّه على نطاق أوسع، حيث تشير _الخصائص_ عادةً إلى خصائص بيانات الكائن فقط.

ومن الممكن أيضًا إنشاء متغيّرات محلية داخل تعريفات التوابع دون الإشارة إلى `self`. وينبغي أن تفعل ذلك إن لم تكن هناك حاجة إلى الوصول إلى المتغيّرات خارج التابع. ولا تحتاج المتغيّرات المحلية داخل التوابع إلى كلمات مفتاحية خاصة؛ فهي تُستخدم تمامًا مثل أي متغيّرات عادية صادفتها حتى الآن.

فهذا مثلًا سيعمل:

```python
class BonusCard:
    def __init__(self, name: str, balance: float):
        self.name = name
        self.balance = balance

    def add_bonus(self):
        # The variable bonus below is a local variable.
        # It is not a data attribute of the object.
        # It can not be accessed directly through the object.
        bonus = self.balance * 0.25
        self.balance += bonus

    def add_superbonus(self):
        # The superbonus variable is also a local variable.
        # Usually helper variables are local variables because
        # there is no need to access them from the other
        # methods in the class or directly through an object.
        superbonus = self.balance * 0.5
        self.balance += superbonus

    def __str__(self):
        return f"BonusCard(name={self.name}, balance={self.balance})"
```

> **تمرين برمجي: الاسم الأول واسم العائلة**
>
> يُرجى كتابة صنف اسمه `Person` له _خاصية واحدة_ هي `name`، وتُضبط بوسيط يُعطى للباني.

يُرجى أيضًا إضافة تابعين:

ينبغي أن يُعيد التابع `return_first_name` الاسم الأول للشخص، بينما ينبغي أن يُعيد التابع `return_last_name` اسم العائلة للشخص.

يمكنك أن تفترض أن الاسم المُمرَّر إلى الباني سيحوي عنصرَي اسم بالضبط يفصلهما محرف مسافة.

ومثال على الاستخدام:

```python
if __name__ == "__main__":
    peter = Person("Peter Pythons")
    print(peter.return_first_name())
    print(peter.return_last_name())

    paula = Person("Paula Pythonnen")
    print(paula.return_first_name())
    print(paula.return_last_name())
```


```
Peter
Pythons
Paula
Pythonnen
```


> **تمرين برمجي: إحصاءات على الأعداد**
>
> يُطلب منك في هذا التمرين إنشاء برنامج للتعامل مع الأعداد، على غرار التمرين الذي أنجزته في [نهاية الجزء 2](/book/mooc/part-2/4-simple-loops#programming-exercise-working-with-numbers) في دورة مقدّمة إلى البرمجة. وهذه المرة ستعرّف صنفًا لهذا الغرض.

### عدّ الأعداد

يُرجى كتابة صنف اسمه `NumberStats` بالتوابع التالية:

- يضيف التابع `add_number` عددًا جديدًا إلى السجل الإحصائي
- يُعيد التابع `count_numbers` عدد الأعداد التي أُضيفت

في هذه المرحلة لا حاجة إلى تخزين الأعداد نفسها في أي هيكل بيانات. ويكفي أن تتذكّر ببساطة كم عددًا أُضيف. والتابع `add_number` يأخذ وسيطًا بالفعل، لكن لا حاجة إلى معالجة القيمة الفعلية بأي شكل بعد.

يحتوي قالب التمرين على الهيكل التالي لتعريف الصنف:

```python
class  NumberStats:
    def __init__(self):
        self.numbers = 0

    def add_number(self, number:int):
        pass

    def count_numbers(self):
        pass
```

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Numbers added:", stats.count_numbers())
```


```
Numbers added: 4
```


### المجموع والمتوسط

يُرجى إضافة التوابع التالية إلى تعريف صنفك:

- ينبغي أن يُعيد التابع `get_sum` مجموع الأعداد المُضافة (وإذا لم تُضف أي أعداد، فينبغي أن يُعيد التابع 0)
- ينبغي أن يُعيد التابع `average` متوسط الأعداد المُضافة (وإذا لم تُضف أي أعداد، فينبغي أن يُعيد التابع 0)

```python
stats = NumberStats()
stats.add_number(3)
stats.add_number(5)
stats.add_number(1)
stats.add_number(2)
print("Numbers added:", stats.count_numbers())
print("Sum of numbers:", stats.get_sum())
print("Mean of numbers:", stats.average())
```


```
Numbers added: 4
Sum of numbers: 11
Mean of numbers: 2.75
```


### مُدخَل المستخدم

يُرجى كتابة برنامج رئيسي يظلّ يسأل المستخدم عن أعداد صحيحة حتى يُدخل المستخدم -1. وينبغي للبرنامج حينها أن يطبع مجموع الأعداد المُدخلة ومتوسطها.

ينبغي أن يستخدم برنامجك كائنًا من `NumberStats` لتسجيل الأعداد المُضافة.

ملاحظة: لا حاجة إلى تغيير صنف `NumberStats` في هذا الجزء من التمرين، ما دام قد اجتاز اختبارات الجزء السابق من التمرين. واستخدم نسخة من الصنف لإكمال هذا الجزء.

ملاحظة 2: ينبغي ألّا يوضع برنامجك الرئيسي داخل كتلة `if __name__ == "__main__"`، وإلا فلن تعمل الاختبارات.


```
Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 3.25
```


### مجاميع متعدّدة

يُرجى الإضافة إلى برنامجك الرئيسي بحيث يحسب أيضًا بشكل منفصل مجموع الأعداد الزوجية والأعداد الفردية المُضافة.

ملاحظة: لا تغيّر تعريف صنف `NumberStats` في هذا الجزء من التمرين أيضًا. بل عرّف ثلاثة كائنات من `NumberStats`. ويتتبّع أحدها كل الأعداد، ويتتبّع آخر الأعداد الزوجية، ويتتبّع الثالث الأعداد الفردية المُدخلة.

ملاحظة 2: ينبغي ألّا يوضع برنامجك الرئيسي داخل كتلة `if __name__ == "__main__"`، وإلا فلن تعمل الاختبارات.

يُرجى الاطلاع على هذا المثال لمعرفة كيف ينبغي أن تعمل دالتك الرئيسية:


```
Please type in integer numbers:
**4**
**2**
**5**
**2**
**-1**
Sum of numbers: 13
Mean of numbers: 3.25
Sum of even numbers: 8
Sum of odd numbers: 5
```
