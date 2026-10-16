---
title: "التغليف"
lang: ar
source: "https://programming-26.mooc.fi/part-9/3-encapsulation"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف ما يعنيه التغليف
> - ستتمكن من إنشاء خصائص خاصة
> - ستعرف كيفية إنشاء دوال قارئة وكاتبة لخصائصك


في البرمجة الكائنية يشير مصطلح _العميل (client)_ إلى برنامج يستخدم صنفًا أو نماذج من صنف. ويقدّم الصنف للعميل _خدمات_ يمكن للعميل من خلالها الوصول إلى الكائنات المُنشأة بناءً على الصنف. والأهداف هنا هي أن

1) يكون استخدام الصنف و/أو الكائنات بأبسط صورة ممكنة من وجهة نظر العميل

2) تُصان _سلامة_ أي كائن في جميع الأوقات

تعني سلامة الكائن أن _حالة_ الكائن تبقى مقبولة دائمًا. وفي الممارسة العملية يعني ذلك أن قيم خصائص الكائن تكون مقبولة دائمًا. فمثلًا، لا ينبغي أن يملك كائن يمثّل تاريخًا قيمة 13 للشهر أبدًا، ولا ينبغي أن يملك كائن يمثّل طالبًا رقمًا سالبًا كقيمة للنقاط الدراسية المكتسبة، وما شابه ذلك.

لننظر إلى صنف يسمى Student:

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number
        self.study_credits = 0

    def add_credits(self, study_credits):
        if study_credits > 0:
            self.study_credits += study_credits
```

يقدّم الكائن `Student` لعملائه التابع `add_credits`، الذي يسمح للعميل بإضافة عدد محدّد من النقاط إلى مجموع نقاط الطالب. ويتأكّد التابع من أن القيمة الممرورة كوساط أكبر من صفر. وتضيف الشيفرة التالية نقاطًا دراسية في ثلاث مناسبات:

```python
sally = Student("Sally Student", "12345")
sally.add_credits(5)
sally.add_credits(5)
sally.add_credits(10)
print("Study credits:", sally.study_credits)
```


```
Study credits: 20
```


رغم وجود تعريف التابع، لا يزال من الممكن الوصول إلى الخاصية `study_credits` مباشرة. وقد يؤدي ذلك إلى حالة خاطئة تُفقد فيها سلامة الكائن:

```python
sally = Student("Sally Student", "12345")
sally.study_credits = -100
print("Study credits:", sally.study_credits)
```


```
Study credits: -100
```


## التغليف {#encapsulation}

من السمات الشائعة في لغات البرمجة الكائنية أن الأصناف تستطيع عادةً إخفاء خصائصها عن أي عملاء محتملين. وتُسمّى الخصائص المخفية عادةً _خاصة_. وفي Python تُحقق هذه الخصوصية بإضافة شرطتين سفليتين `__` إلى بداية اسم الخاصية:

```python
class CreditCard:
    # the attribute number is private, while the attribute name is accessible
    def __init__(self, number: str, name: str):
        self.__number = number
        self.name = name
```

الخاصية الخاصة غير مرئية مباشرة للعميل. ومحاولة الإشارة إليها تُسبّب خطأ. في المثال أعلاه يمكن الوصول إلى الخاصية `name` وتعديلها بسهولة:

```python
card = CreditCard("123456","Randy Riches")
print(card.name)
card.name = "Charlie Churchmouse"
print(card.name)
```


```
Randy Riches
Charlie Churchmouse
```


لكن محاولة طباعة رقم البطاقة تُسبّب خطأ:

```python
card = CreditCard("123456","Randy Riches")
print(card.__number)
```


```
AttributeError: 'CreditCard' object has no attribute '__number'
```


يُسمّى إخفاء الخصائص عن العملاء _التغليف_. وكما يوحي الاسم، فإن الخاصية تُوضع «داخل كبسولة». ثم يُقدَّم للعميل واجهة مناسبة للوصول إلى البيانات المخزّنة في الكائن ومعالجتها.

لنضف خاصية مُغلَّفة أخرى: الرصيد على بطاقة الاعتماد. وفي المرة هذه سنضيف أيضًا توابع مرئية علنًا تسمح للعميل بالوصول إلى الرصيد وتعديله:

```python
class CreditCard:
    def __init__(self, number: str, name: str, balance: float):
        self.__number = number
        self.name = name
        self.__balance = balance

    def deposit_money(self, amount: float):
        if amount > 0:
            self.__balance += amount

    def withdraw_money(self, amount: float):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount

    def retrieve_balance(self):
        return self.__balance
```

```python
card = CreditCard("123456", "Randy Riches", 5000)
print(card.retrieve_balance())
card.deposit_money(100)
print(card.retrieve_balance())
card.withdraw_money(500)
print(card.retrieve_balance())
# The following will not work because the balance is not sufficient
card.withdraw_money(10000)
print(card.retrieve_balance())
```


```
5000
5100
4600
4600
```


لا يمكن تعديل الرصيد مباشرة لأن الخاصية خاصة، لكننا أضفنا التابعين `deposit_money` و`withdraw_money` لتغيير القيمة. ويعيد التابع `retrieve_balance` القيمة المخزّنة في الرصيد. ويتضمن التابعان بعض الفحوصات الأولية للحفاظ على سلامة الكائن: فمثلًا، لا يمكن سحب أكثر من الرصيد المتوفّر في البطاقة.

> **تمرين برمجي: السيارة**
>
> يُرجى تنفيذ صنف يسمى `Car` يحتوي على متغيّرين _مُغلَّفيْن_ خاصين: كمية البنزين في الخزان (من 0 إلى 60 لترًا) وقراءة العدّاد (بالكيلومتر). تستهلك السيارة لترًا واحدًا من البنزين لكل كيلومتر.

يجب أن يحتوي الصنف أيضًا على التابعين التاليين:

- `fill_up()` الذي يملأ الخزان
- `drive(km:int)` الذي يقود السيارة للمسافة المحدَّدة، أو لمدّة ما يسمح به البنزين في الخزان
- `__str__` الذي يُرجع تمثيلًا نصيًا للسيارة وفق الأمثلة أدناه

مثال على كيفية استخدام الصنف:

```python
car = Car()
print(car)
car.fill_up()
print(car)
car.drive(20)
print(car)
car.drive(50)
print(car)
car.drive(10)
print(car)
car.fill_up()
car.fill_up()
print(car)
```


```
Car: odometer reading 0 km, petrol remaining 0 litres
Car: odometer reading 0 km, petrol remaining 60 litres
Car: odometer reading 20 km, petrol remaining 40 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 0 litres
Car: odometer reading 60 km, petrol remaining 60 litres
```


**ملاحظة:** يُطلب منك تغليف كمية البنزين المتبقية وقراءة العدّاد. ينبغي ألّا يكون من الممكن الوصول إليهما مباشرة من خارج توابع الصنف نفسه.


## ملاحظة قصيرة حول الخصائص الخاصة وPython والبرمجة الكائنية

توجد طرق لتجاوز رمز الشرطتين السفليتين `__` المستعمل لإخفاء الخصائص، قد تصادفها إذا بحثت عن موارد عبر الإنترنت. ولا توجد أي خاصية في Python حقيقية الخصوصية، وهذا مقصود من جانب مُنشئي Python. ومن ناحية أخرى، يُتوقّع من المبرمج المتمكّن عمومًا احترام إرشادات الرؤية المحدَّدة في الأصناف، ويتطلب تجاوزها جهدًا خاصًا. وفي لغات برمجة كائنية أخرى مثل Java، غالبًا ما تكون المتغيّرات الخاصة مخفية حقًا، ومن الأفضل أن تعتبر متغيّرات Python الخاصة كذلك.

## الدوال القارئة والكاتبة (getters and setters) {#getters-and-setters}

في البرمجة الكائنية، تُسمّى التوابع المخصّصة للوصول إلى الخصائص وتعديلها عادةً _دوال قارئة_ (getters) و_دوال كاتبة_ (setters). لا يستخدم جميع مبرمجي Python مصطلحي "قارئ" و"كاتب"، لكن مفهوم _الخصائص (properties)_ المبيَّن أدناه مشابه جدًا، ولهذا سنستخدم هنا مصطلحات البرمجة الكائنية المقبولة عمومًا.

إذًا، أنشأنا أعلاه بعض التوابع العامة للوصول إلى الخصائص الخاصة، لكن هناك طريقة أكثر مباشرة و"بايثونية" للوصول إلى الخصائص. لننظر إلى صنف بسيط يسمى `Wallet` بخاصية خاصة واحدة هي `money`:

```python
class Wallet:
    def __init__(self):
        self.__money = 0
```

يمكننا إضافة تابع قارئ وتابع كاتب للوصول إلى الخاصية الخاصة باستخدام المُزيّن `@property`:

```python
class Wallet:
    def __init__(self):
        self.__money = 0

    # A getter method
    @property
    def money(self):
        return self.__money

    # A setter method
    @money.setter
    def money(self, money):
        if money >= 0:
            self.__money = money
```

أولًا، نعرّف تابعًا قارئًا يُرجع كمية المال الموجودة في المحفظة حاليًا. ثم نعرّف تابعًا كاتبًا يضبط قيمة جديدة للخاصية money مع التأكد من أن القيمة الجديدة ليست سالبة.

يمكن استخدام التابعين الجديدين هكذا:

```python
wallet = Wallet()
print(wallet.money)

wallet.money = 50
print(wallet.money)

wallet.money = -30
print(wallet.money)
```


```
0
50
50
```


من وجهة نظر العميل، لا يختلف استخدام هذين التابعين الجديدَين عن الوصول المباشر إلى خاصية. الأقواس غير ضرورية؛ بل من المقبول تمامًا كتابة `wallet.money = 50`، وكأننا نُسند قيمة إلى متغيّر ببساطة. والغرض فعلًا كان إخفاء (أي تغليف) التنفيذ الداخلي للخاصية مع تقديم طريقة سهلة للوصول إلى البيانات المخزّنة في الكائن وتعديلها.

في المثال السابق مشكلة صغيرة: لا يُبلَّغ العميل بفشل ضبط قيمة سالبة للخاصية money. وحين تكون القيمة المُقدَّمة خاطئة بوضوح، فمن الجيد عادةً رفع استثناء (raise) وإبلاغ العميل بذلك. وفي هذه الحالة، ينبغي على الأرجح أن يكون الاستثناء من النوع `ValueError` للإشارة إلى أن القيمة المُقدَّمة غير مقبولة.

إليك نسخة محسّنة من الصنف، مع بعض الشيفرة لاختبارها:

```python
class Wallet:
    def __init__(self):
        self.__money = 0

    # A getter method
    @property
    def money(self):
        return self.__money

    # A setter method
    @money.setter
    def money(self, money):
        if money >= 0:
            self.__money = money
        else:
            raise ValueError("The amount must not be below zero")
```

```python
wallet.money = -30
print(wallet.money)
```


```
ValueError: The amount must not be below zero
```


**ملاحظة:** يجب أن يُعرَض التابع القارئ، أي المُزيّن `@property`، قبل التابع الكاتب، وإلا حدث خطأ عند تنفيذ الصنف. وذلك لأن المُزيّن `@property` يعرّف اسم "الخاصية" المقدَّمة للعميل. أما التابع الكاتب المُضاف بـ`.setter` فيضيف إليه وظيفة جديدة ببساطة.

> **تمرين برمجي: التسجيل**
>
> يُرجى إنشاء صنف يسمى `Recording` يمثّل تسجيلًا واحدًا. يجب أن يحتوي الصنف على متغيّر خاص واحد: `__length` من النوع عدد صحيح.

يُرجى تنفيذ ما يلي:

* مُنشئ يأخذ الطول كوساط
* تابع قارئ `length` يُرجع طول التسجيل
* تابع كاتب يضبط طول التسجيل

ينبغي أن يكون من الممكن استخدام الصنف كما يلي:

```python
the_wall = Recording(43)
print(the_wall.length)
the_wall.length = 44
print(the_wall.length)
```


```
43
44
```



إذا كانت قيمة الوسيط في المُنشئ أو التابع الكاتب أقل من صفر، فهذا ينبغي أن يرفع استثناء `ValueError`.

إذا كنت بحاجة إلى تذكير برفع الاستثناءات، يُرجى الاطلاع على [الجزء 6](/book/mooc/part-6/3-errors#raising-exceptions) من مادة الدورة.


في المثال التالي صنف بخاصيتين خاصتين، مع دوال قارئة وكاتبة لكل منهما. يُرجى تجربة البرنامج بقيم مختلفة تُمرَّر كوسائط:

```python
class Player:
    def __init__(self, name: str, player_number: int):
        self.__name = name
        self.__player_number = player_number

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name: str):
        if name != "":
            self.__name = name
        else:
            raise ValueError("The name may not be an empty string")

    @property
    def player_number(self):
        return self.__player_number

    @player_number.setter
    def player_number(self, player_number: int):
        if player_number > 0:
            self.__player_number = player_number
        else:
            raise ValueError("The player number must be a positive integer")
```

```python
player = Player("Betty Ballmer", 10)
print(player.name)
print(player.player_number)

player.name = "Buster Ballmer"
player.player_number = 11
print(player.name)
print(player.player_number)
```


```
Betty Ballmer
10
Buster Ballmer
11
```


ولإنهاء هذا القسم، لننظر إلى صنف يمثّل دفتر ملاحظات بسيطًا. جميع الخصائص خاصة، لكنها تُدار عبر واجهات مختلفة: لمُالك الدفتر دوال قارئة وكاتبة، أما مُدخَلات الدفتر فتُعالَج بتوابع "تقليدية". وفي هذه الحالة، من المعقول منع العميل من كل وصول إلى بنية البيانات الداخلية للدفتر. فالتوابع العامة وحدها مرئية مباشرة للعميل.

يضمن التغليف أيضًا أن التنفيذ الداخلي للصنف يمكن تغييره بحرية، شريطة أن تبقى الواجهة العامة سليمة. ولا يجب على العميل أن يعرف أو يهتم بما إذا كانت بنية البيانات الداخلية تستند إلى قوائم أو قواميس أو شيء مختلف تمامًا.

```python
class Diary:
    def __init__(self, owner: str):
        self.__owner = owner
        self.__entries = []

    @property
    def owner(self):
        return self.__owner

    @owner.setter
    def owner(self, owner):
        if owner != "":
            self.__owner = owner
        else:
            raise ValueError("The owner may not be an empty string")

    def add_entry(self, entry: str):
        self.__entries.append(entry)

    def print_entries(self):
        print("A total of", len(self.__entries), "entries")
        for entry in self.__entries:
            print("- " + entry)
```

```python
diary = Diary("Peter")
diary.add_entry("Today I ate porridge")
diary.add_entry("Today I learned object oriented programming")
diary.add_entry("Today I went to bed early")
diary.print_entries()
```


```
A total of 3 entries
- Today I ate porridge
- Today I learned object oriented programming
- Today I went to bed early
```


> **تمرين برمجي: محطة الطقس**
>
> يُرجى إنشاء صنف يسمى `WeatherStation` يُستخدم لتخزين ملاحظات عن الطقس. يجب أن يحتوي الصنف على الخصائص العامة التالية:

* مُنشئ يأخذ اسم المحطة كوساط
* تابع يسمى `add_observation(observation: str)` يضيف ملاحظة كآخر مُدخَل في قائمة
* تابع يسمى `latest_observation()` يُرجع آخر ملاحظة أُضيفت إلى القائمة. وإذا لم تكن هناك ملاحظات بعد، يجب أن يُرجع _سلسلة نصية فارغة_.
* تابع يسمى `number_of_observations()` يُرجع العدد الإجمالي للملاحظات المُضافة
* تابع `__str__` يُرجع اسم المحطة والعدد الإجمالي للملاحظات المُضافة وفق المثال أدناه.

يجب أن تكون جميع الخصائص مُغلَّفة بحيث لا يمكن الوصول إليها مباشرة. وطريقة تنفيذ الصنف راجعة إليك، ما دامت الواجهة العامة مطابقة تمامًا للموصوف أعلاه.

مثال على كيفية استخدام الصنف:

```python
station = WeatherStation("Houston")
station.add_observation("Rain 10mm")
station.add_observation("Sunny")
print(station.latest_observation())

station.add_observation("Thunderstorm")
print(station.latest_observation())

print(station.number_of_observations())
print(station)
```


```
Sunny
Thunderstorm
3
Houston, 3 observations
```
