---
title: "خصائص الصنف"
lang: ar
source: "https://programming-26.mooc.fi/part-9/5-class-attributes"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستألف مصطلحي متغيّر الصنف وتابع الصنف
> - ستعرف كيف تختلف السمات الساكنة عن سمات النسخ
> - ستكون قادرًا على إضافة سمات ساكنة إلى أصنافك الخاصة


_السمات_ (traits) مفهوم جوهري في البرمجة الكائنية. ويشمل المصطلح التوابع والمتغيّرات المُعرَّفة في تعريف الصنف. ولا يستعمل كل مبرمجي Python مصطلح «السمات»، بل يفضّل بعضهم «الخصائص» أو «الميزات» أو «الأعضاء». وقد رُحب بمصطلح السمات على نحو واسع في عالم البرمجة الكائنية الأوسع، ولهذا فهو المصطلح الذي نستعمله هنا.

وإلى الآن تعاملنا مع _سمات الكائنات_ في معظمها. وتشمل التوابع والخصائص المتاحة في أي نسخة من صنف. وفي الحقيقة، يمكن أن يكون للصنف _نفسه_ أيضًا سمات، تُسمّى أحيانًا _السمات الساكنة_، أو بتحديد أكثر _متغيّرات الصنف_ و_توابع الصنف_.

## متغيّرات الصنف {#class-variables}

لكل نسخة من صنف قيمها المحدَّدة الخاصة بكل خاصية مُعرَّفة في الصنف، كما رأينا في أمثلة الأقسام السابقة. لكن ماذا لو أردنا أن نملك بعض البيانات التي تتشاركها النسخ المختلفة؟ هنا يظهر _متغيّر الصنف_، المعروف أيضًا بالمتغيّر الساكن. فمتغيّر الصنف متغيّر يُوصَل إليه من خلال الصنف نفسه، لا من خلال النسخ المُنشأة بناءً عليه. وفي أي لحظة محدَّدة أثناء تنفيذ البرنامج يكون لمتغيّر الصنف قيمة واحدة فقط، مهما كان عدد النسخ المُنشأة من الصنف.

يُعلن متغيّر الصنف دون بادئة `self`، وعادةً خارج أي تعريف تابع، لأنه ينبغي أن يكون متاحًا من أي مكان داخل الصنف، بل وحتى من خارج الصنف.

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # The total interest rate equals 
        # the general rate + the interest rate of the account
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance
```

وبما أن المتغيّر `general_rate` مُعرَّف داخل الصنف لكنه خارج أي تعريفات التوابع، ولا يستخدم بادئة `self`، فهو متغيّر صنف.

ويُوصَل إلى متغيّر الصنف من خلال اسم الصنف، فمثلًا هكذا:

```python
# The general rate exists independently of any object instances
print("The general interest rate is", SavingsAccount.general_rate)

account = SavingsAccount("12345", 1000, 0.05)
# Add the total interest accrued to the balance on the account
account.add_interest()
print(account.balance)
```


```
The general interest rate is 0.03
1080.0
```


إذًا، تُوصَل متغيّرات الصنف من خلال اسم الصنف، فمثلًا عبر `SavingsAccount.general_rate`، بينما تُوصَل متغيّرات النسخ من خلال اسم متغيّر الكائن، مثل `account.balance`. ومتغيّر النسخ لا يوجد بطبيعته إلا حين تُنشأ نسخة من الصنف، لكن متغيّر الصنف متاح في كل مكان وفي كل لحظة يكون فيها الصنف نفسه متاحًا.

تكون متغيّرات الصنف مفيدة حين تُرد قيم تتشاركها كل نسخات الصنف. وفي المثال أعلاه افترضنا أن نسبة الفائدة الكلية لكل حسابات الادخار تتكوّن من مكوّنين: نسبة الفائدة العامة تتشاركها كل الحسابات، لكن لكل حساب أيضًا نسبة فائدة تخصّه في متغيّر نسخة. وقد تتغيّر النسبة العامة أيضًا، لكن التغيير يؤثر حينها في كل نسخات الصنف بالتساوي.

```python
class SavingsAccount:
    general_rate = 0.03

    def __init__(self, account_number: str, balance: float, interest_rate: float):
        self.__account_number = account_number
        self.__balance = balance
        self.__interest_rate = interest_rate

    def add_interest(self):
        # The total interest rate equals 
        # the general rate + the interest rate of the account
        total_interest = SavingsAccount.general_rate + self.__interest_rate
        self.__balance += self.__balance * total_interest

    @property
    def balance(self):
        return self.__balance

    @property
    def total_interest(self):
        return self.__interest_rate + SavingsAccount.general_rate
```

```python
account1 = SavingsAccount("12345", 100, 0.03)
account2 = SavingsAccount("54321", 200, 0.06)

print("General interest rate:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)

# The general rate of interest is now 10 percent
SavingsAccount.general_rate = 0.10

print("General interest rate:", SavingsAccount.general_rate)
print(account1.total_interest)
print(account2.total_interest)
```


```
General interest rate: 0.03
0.06
0.09
General interest rate: 0.1
0.13
0.16
```


ومتى تغيّرت نسبة الفائدة العامة، تغيّرت نسبة الفائدة الكلية لكل نسخات الصنف. وكما ترى أعلاه، يمكن إضافة تابع قراءة باستخدام زينة `@property` حتى وإن لم تكن هناك خاصية بنفس الاسم في الصنف. وهذا التابع يُرجع مجموع نسبة الفائدة العامة ونسبة فائدة الحساب الخاصة به.

لننظر إلى مثال آخر. يُستخدم الصنف `PhoneNumber` لتعريف رقم هاتف واحد، لكنه يحوي أيضًا بعض رموز الدول في قاموس. وهذا القاموس متغيّر صنف، وبذلك يتشاركه كل نسخات الصنف، لأن رمز الدولة لأرقام الهاتف من دولة واحدة يكون دائمًا نفسه.

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        self.__phone_number = phone_number
        self.__country = country

    @property
    def phone_number(self):
        # When the country code prefix is added 
        # the initial zero is removed from the phone number
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]
```

```python
paulas_no = PhoneNumber("Paula Pythons", "050 1234 567", "Finland")
print(paulas_no.phone_number)
```


```
+358 50 1234 567
```


يحوي كل كائن `PhoneNumber` اسم المالك، والرقم نفسه، ودولة رقم الهاتف. وحين يُوصَل إلى الخاصية التي تحوي رقم الهاتف عبر تابع القراءة، يُستخرج رمز الدولة المناسب من قاموس متغيّر الصنف بناءً على خاصية الدولة، ويُضاف الناتج في مقدمة الرقم.

تنفيذ المثال أعلاه ليس عمليًّا على نحو يُذكر في بقية الجوانب. وفي المثال التالي أضفنا توابع قراءة وكتابة لكل الخصائص:

```python
class PhoneNumber:
    country_codes = {"Finland": "+358", "Sweden": "+46", "United States": "+1"}

    def __init__(self, name: str, phone_number: str, country: str):
        self.__name = name
        # This is a call to the phone_number.setter method
        self.phone_number = phone_number
        # This is a call to the country.setter method
        self.country = country

    # the getter method for phone_number combines the country code 
    # and the attribute phone_number
    @property
    def phone_number(self):
        # the initial zero is removed as the country code is prefixed
        return PhoneNumber.country_codes[self.__country] + " " + self.__phone_number[1:]

    @phone_number.setter
    def phone_number(self, number):
        # Making sure the number contains only numbers and space characters
        for character in number:
            if character not in "1234567890 ":
                raise ValueError("A phone number can only contain numbers and spaces")
        self.__phone_number = number

    # a getter for only the number itself without the country code
    @property
    def local_number(self):
        return self.__phone_number

    @property
    def country(self):
        return self.__country

    @country.setter
    def country(self, country):
        # Making sure the country is a key in the dictionary of country codes
        if country not in PhoneNumber.country_codes:
            raise ValueError("This country is not on the list.")
        self.__country = country

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name

    def __str__(self):
        return f"{self.phone_number} ({self.__name})"
```

```python
if __name__ == "__main__":
    pn = PhoneNumber("Peter Pythons", "040 111 1111", "Sweden")
    print(pn)
    print(pn.phone_number)
    print(pn.local_number)
```


```
+46 40 111 1111 (Peter Pythons)
+46 40 111 1111
040 111 1111
```


> **تمرين برمجي: الرموز البريدية**
>
> يحوي قالب التمرين تعريف الصنف `City` الذي يمثّل مدينة واحدة.

يُرجى إضافة متغيّر صنف اسمه `postcodes` يشير إلى قاموس. مفاتيح القاموس أسماء مدن، والقيم المرتبطة بها الرموز البريدية لتلك المدن. وكلاهما سلسلة نصية.

وينبغي أن يحوي القاموس (على الأقل) الرموز البريدية التالية:

* هلسنكي 00100
* توركو 20100
* تامبيري 33100
* روفانييمي 96100
* أولو 90100

ولا تحتاج إلى تنفيذ أي وظيفة أخرى.


## توابع الصنف

تابع الصنف، المسمّى أيضًا تابعًا ساكنًا، تابع لا يرتبط بأي نسخة مفردة من الصنف. ويمكن استدعاء تابع الصنف دون إنشاء أي نسخة من الصنف.

التوابع الساكنة عادةً أدوات تتعلق بغرض الصنف، لكنها منفصلة عن النسخ بمعنى أنه لا ينبغي أن يكون من الضروري إنشاء نسخ من الصنف لتتمكن من استدعائها. والتوابع الساكنة عادةً عامة، بحيث يمكن استدعاؤها من خارج الصنف ومن داخله، بما في ذلك من داخل نسخ الصنف.

يُعرَّف تابع الصنف بالزينة `@classmethod`. والمعامل الأول دائمًا `cls`. واسم المتغيّر `cls` يشبه المعامل `self`. والفرق أن `cls` يشير إلى الصنف بينما `self` يشير إلى نسخة من الصنف. ولا يُدرج أيٌّ من المعاملَين في قائمة الوسائط حين تُستدعى الدالة؛ بل تملأ Python القيمة المناسبة تلقائيًّا.

في المثال التالي لدينا صنف ينمذج تسجيلات المركبات. ويحوي الصنف `Registration` تابعًا ساكنًا للتحقّق من صحة لوحة التسجيل. وهذا التابع تابع صنف ساكن لأنه من المفيد التحقّق من صحة لوحة التسجيل حتى قبل إنشاء أي كائن `Registration` على الإطلاق:

```python
class Registration:
    def __init__(self, owner: str, make: str, year: int, license_plate: str):
        self.__owner = owner
        self.__make = make
        self.__year = year

        # Call the license_plate.setter method
        self.license_plate = license_plate

    @property
    def license_plate(self):
        return self.__license_plate

    @license_plate.setter
    def license_plate(self, plate):
        if Registration.license_plate_valid(plate):
            self.__license_plate = plate
        else:
            raise ValueError("The license plate is not valid")

    # A class method for validating the license plate
    @classmethod
    def license_plate_valid(cls, plate: str):
        if len(plate) < 3 or "-" not in plate:
            return False

        # Check the beginning and end sections of the plate separately
        letters, numbers = plate.split("-")

        # the beginning section can have only letters
        for character in letters:
            if character.lower() not in "abcdefghijklmnopqrstuvwxyzåäö":
                return False

        # the end section can have only numbers
        for character in numbers:
            if character not in "1234567890":
                return False

        return True
```

```python
registration = Registration("Mary Motorist", "Volvo", "1992", "abc-123")

if Registration.license_plate_valid("xyz-789"):
    print("This is a valid license plate!")
```


```
This is a valid license plate!
```


يمكن التحقّق من صحة لوحة التسجيل حتى دون إنشاء أي نسخة من الصنف، فمثلًا عبر `Registration.license_plate_valid("xyz-789")`. ونفس التابع يُستدعى داخل باني الصنف. لاحظ: حتى داخل الباني يُوصَل إلى هذا التابع من خلال اسم الصنف، لا `self`!

> **تمرين برمجي: مساعد القائمة**
>
> يُرجى إنشاء صنف اسمه `ListHelper` يحوي التابعَين الصنفيين التاليين.

* `greatest_frequency(my_list: list)` يُرجع العنصر الأكثر تكرارًا في القائمة
* `doubles(my_list: list)` يُرجع عدد العناصر الفريدة التي تظهر مرتين على الأقل في القائمة

وينبغي أن يمكن استخدام هذين التابعين دون إنشاء نسخة من الصنف. وهذا مثال على كيفية استخدام هذين التابعين:

```python
numbers = [1, 1, 2, 1, 3, 3, 4, 5, 5, 5, 6, 5, 5, 5]
print(ListHelper.greatest_frequency(numbers))
print(ListHelper.doubles(numbers))
```


```
5
3
```
