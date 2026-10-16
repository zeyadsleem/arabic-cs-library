---
title: "تطوير تطبيق أكبر"
lang: ar
source: "https://programming-26.mooc.fi/part-10/4-application-development"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون على دراية ببعض المبادئ الأساسية لتطوير التطبيقات
> - ستتمكّن من التمييز بين أجزاء التطبيق المختلفة (واجهة المستخدم، ومنطق البرنامج، ومعالجة الملفات)
> - ستكون قد تمرّنت على كتابة تطبيق أكبر قليلًا بخطك الخاص


حتى الآن في هذه المادة التعليمية غطّينا عددًا كبيرًا من ميزات Python.

قدّمت دورة مقدمة في البرمجة أنماط التحكّم، مثل while وfor، والدوال، وهياكل البيانات الأساسية، مثل القوائم (lists) والصفوف (tuples) والقواميس (dictionaries). ومن حيث المبدأ، فإن تلك الأدوات هي كل ما يلزم للتعبير عن أي شيء قد يرغب المبرمج في التعبير عنه باستخدام Python.

في هذه الدورة المتقدمة في البرمجة، بدءًا من الجزء 8 من المادة، تعرّفتَ على الأصناف (classes) والكائنات (objects). فلنتوقّف لحظة للتفكير في متى تكون هذه الأصناف والكائنات ضرورية ولماذا، إذا كان المفروض أن تكفي تلك الأدوات الأساسية من الأجزاء 1 إلى 7.

## إدارة التعقيد

ليست الكائنات والأصناف ضرورية بأي حال في كل سياق برمجي. فمثلًا، إذا كنت تبرمج سكربتًا صغيرًا لاستخدام مرة واحدة، فإن الكائنات تكون عادةً زائدة عن الحاجة. غير أن الكائنات تصبح مفيدة جدًّا عندما تبرمج شيئًا أكبر وأكثر تعقيدًا.

عندما يزداد تعقيد البرامج، يصبح حجم التفاصيل خارجًا عن السيطرة سريعًا، ما لم يكن البرنامج منظَّمًا بطريقة منهجية ما. بل إن بعض التمارين الأكثر تعقيدًا في هذه الدورة حتى الآن كانت ستستفيد من الأمثلة المقدَّمة في هذا الجزء من المادة.

منذ عقود كان مفهوم [فصل المخاوف (separation of concerns)](https://en.wikipedia.org/wiki/Separation_of_concerns) أحد المبادئ المركزية في البرمجة، وفي مجال علوم الحاسوب الأوسع. ونقتبس من ويكيبيديا:

_يُعدّ فصل المخاوف مبدأً تصميميًّا لتقسيم برنامج حاسوب إلى أقسام متميّزة بحيث يعالج كل قسم مخوفًا منفصلًا. والمخوف مجموعة من المعلومات التي تؤثّر في شيفرة برنامج الحاسوب._

إن تقسيم البرنامج إلى أقسام، بحيث يتولّى كل قسم مخوفه الخاص، يساعد في إدارة التعقيد الحتمي لبرنامج الحاسوب.

تُعدّ الدوال (functions) إحدى طرق تنظيم البرنامج إلى كُلّيات متميّزة يمكن إدارتها. فبدلًا من كتابة سكربت واحد، تكمن الفكرة في صياغة دوال صغيرة قابلة للتحقّق منها على حدة، يحلّ كل منها جزءًا من المشكلة الأكبر.

وثمة نهج شائع آخر لإدارة البرامج الأكبر هو الكائنات، من خلال مبادئ البرمجة الكائنية (object oriented programming). ولكل من النهجين مزايا وعيوب، ولكل مبرمج ما يفضّله. وكما رأينا حتى الآن، تتيح لنا الكائنات والأصناف أن نجمع كل البيانات _و_ الشيفرة التي تعالج تلك البيانات داخل وحدة واحدة، في خصائص الكائن وتوابعه (methods). علاوة على ذلك، توفّر الكائنات طريقة لتغليف البيانات التي تتحكّم فيها، بحيث لا تحتاج أجزاء البرنامج الأخرى إلى الانشغال بالتفاصيل الداخلية للكائن.

## مثال تطبيقي: دفتر الهاتف

كيف ينبغي تقسيم البرنامج إلى أصناف وكائنات؟ هذا ليس سؤالًا سهلًا له جواب واحد مقبول بأي حال، لذا سنمضي في مثال. في الجزء الخامس أتممتَ [تطبيق دفتر هاتف](/book/mooc/part-5/3-dictionary#programming-exercise-phone-book-version-2)، والآن سننفّذ شيئًا مشابهًا باستخدام مبادئ البرمجة الكائنية.

اتباعًا لمبدأ فصل المخاوف، ينبغي تقسيم البرنامج إلى أقسام يتولّى كل منها مخوفه الخاص. وفي البرمجة الكائنية يُترجَم هذا إلى [مبدأ المسؤولية الواحدة (single-responsibility principle)](https://en.wikipedia.org/wiki/Single-responsibility_principle). ودون الدخول في التفاصيل الدقيقة، فغايته الجوهرية واضحة من الاسم: _ينبغي أن يكون للصنف الواحد وللكائنات المنشأة بناءً عليه مسؤولية واحدة داخل البرنامج_.

كثيرًا ما تُستخدم البرمجة الكائنية طريقةً لنمذجة كائنات وظواهر العالم الحقيقي. فكل كائن في العالم الحقيقي يُنمذَج بصنف واحد في شيفرة البرنامج. وفي حالة دفتر الهاتف قد تكون هذه الكائنات
- شخصًا
- اسمًا
- رقم هاتف

يمكن النظر إلى الاسم ورقم الهاتف على أنهما مجرد قطع من البيانات لا تستحقّ صنفين خاصين بهما، لكن _الشخص_ كيان مادّي متميّز في العالم الحقيقي، وفي عالم البرمجة يمكن أن يُنفَّذ كصنف. وسيكون كائن Person مسؤولًا عن الربط بين الاسم وأرقام الهاتف المرتبطة به.

و_دفتر الهاتف_ نفسه قد يكون مرشّحًا جيّدًا ليكون صنفًا. وستكون مسؤوليته إدارة كائنات الأشخاص المختلفة والبيانات التي تحتويها.

الآن رسمنا جوهر تطبيقنا: يشكّل _دفتر الهاتف_ و_الشخص_ منطق برنامجنا، أو _منطق التطبيق_ باختصار. وسيحتاج تطبيقنا إلى أصناف أخرى أيضًا.

من الجيّد عادةً إبقاء أي تفاعل مع المستخدم فصلًا عن منطق التطبيق. فهذه مسؤولية قائمة بذاتها في نهاية المطاف. ولذلك، إضافةً إلى منطق التطبيق الأساسي، ينبغي أن يحتوي برنامجنا على صنف يتولّى واجهة المستخدم.

علاوة على ذلك، ينبغي أن يوفّر دفتر هاتفنا وسيلة ما للتخزين الدائم بين عمليات التنفيذ. ومعالجة الملفات (file handling) هي أيضًا مسؤولية منفصلة بوضوح، لذا تستحقّ صنفًا خاصًا بها.

والآن بعد أن صار لدينا مخطط للمكوّنات الأساسية لبرنامجنا، يبرز السؤال: من أين ينبغي أن نبدأ البرمجة؟ ومرة أخرى، لا يوجد جواب صحيح أو خاطئ، لكن من الجيّد غالبًا البدء بجزء من منطق التطبيق.

## الخطوة 1: مخطط لمنطق التطبيق

لنبدأ بالصنف _PhoneBook_. وقد يبدو التنفيذ الهيكلي هكذا:

```python
class PhoneBook:
    def __init__(self):
        self.__persons = []

    def add_number(self, name: str, number: str):
        pass

    def get_numbers(self, name: str):
        pass

```

يتكوّن هذا الصنف من قائمة أشخاص إلى جانب توابع لإضافة البيانات واسترجاعها معًا.

قد يكون كل شخص مرتبطًا بعدة أرقام، لذا لننفّذ البنية الداخلية للخاصية `persons` بقاموس. يتيح لنا القاموس البحث عن المفاتيح بالاسم، ويمكن أن تكون القيمة المرتبطة بمفتاح القاموس قائمة. وحتى الآن يبدو أننا لا نحتاج فعلًا إلى صنف منفصل لتمثيل الشخص - فمدخلة في قاموس تكفي.

لننفّذ التوابع المذكورة أعلاه، ونختبر دفتر هاتفنا:

```python
class PhoneBook:
    def __init__(self):
        self.__persons = {}

    def add_number(self, name: str, number: str):
        if not name in self.__persons:
            # add a new dictionary entry with an empty list for the numbers
            self.__persons[name] = []

        self.__persons[name].append(number)

    def get_numbers(self, name: str):
        if not name in self.__persons:
            return None

        return self.__persons[name]

# code for testing
phonebook = PhoneBook()
phonebook.add_number("Eric", "02-123456")
print(phonebook.get_numbers("Eric"))
print(phonebook.get_numbers("Emily"))
```

ينبغي أن يطبع هذا ما يلي:


```
['02-123456']
None
```


تعيد الدالة `get_numbers` القيمة `None` إذا لم يكن الاسم مضمَّنًا في دفتر الهاتف. وإذا وُجد الاسم، فإنها تعيد قائمة الأرقام المرتبطة به.

كلما أجريتَ تغييرات على برنامج، كان من المفيد _دائمًا_ اختبار أن الشيفرة تعمل كما هو متوقّع، قبل الانتقال إلى أي تغييرات أخرى. والشيفرة المستخدمة للاختبار عادةً ما تُحذف بعد قليل، وبناءً على ذلك قد تظنّ أنه لا يستحقّ العناء كتابة أي اختبارات من البداية. وفي معظم الحالات ليس هذا صحيحًا. فالاختبار ضروري للوصول إلى نتائج برمجية جيّدة.

ينبغي التقاط أي علّة في البرنامج وإصلاحها في أسرع وقت ممكن. وإذا اعتدتَ التحقق من وظيفة كل سطر شيفرة جديد تقريبًا، فستجد أن العلل يسهل عادةً تحديد موقعها وإصلاحها، إذ يمكنك أن تكون متيقّنًا تمامًا أن العلّة نشأت عن أحدث تغيير. أما إذا اختبرتَ البرنامج فقط بعد إضافة عشرات الأسطر من الشيفرة، فإن المصادر المحتملة للعلل تزداد بدورها عشرات المرات.

## الخطوة 2: مخطط لواجهة المستخدم

وبعد أن فرغنا من منطق التطبيق الأساسي، حان وقت تنفيذ واجهة مستخدم نصية. وسنحتاج إلى صنف جديد هو `PhoneBookApplication`، يقدّم الوظائف الأولية التالية:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("commands: ")
        print("0 exit")

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("command: ")
            if command == "0":
                break

application = PhoneBookApplication()
application.execute()
```

لا يفعل هذا البرنامج الكثير بعد، لكن لنستعرض محتوياته. تنشئ دالة البانية (constructor) كائنًا جديدًا من PhoneBook، يُخزَّن في خاصية خاصة. وتبدأ الدالة `execute(self)` واجهة المستخدم النصية للبرنامج، وجوهرها حلقة `while` التي تظلّ تسأل المستخدم عن الأوامر حتى يكتب أمر الخروج. وهناك أيضًا دالة للتعليمات هي `help(self)`، تُستدعى قبل الدخول في الحلقة حتى تُطبع التعليمات.

والآن لنضف بعض الوظائف الفعلية. أولًا ننفّذ إضافة بيانات جديدة إلى دفتر الهاتف:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("commands: ")
        print("0 exit")
        print("1 add entry")

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("command: ")
            if command == "0":
                break
            elif command == "1":
                name = input("name: ")
                number = input("number: ")
                self.__phonebook.add_number(name, number)

application = PhoneBookApplication()
application.execute()
```

إذا كتب المستخدم _1_ لإضافة رقم جديد، فإن واجهة المستخدم تطلب اسمًا ورقمًا، وتضيفهما إلى كائن PhoneBook باستخدام الدالة المناسبة المعرّفة في الصنف.

المسؤولية الوحيدة لواجهة المستخدم هي التواصل مع المستخدم. وأما أي وظيفة أخرى، مثل تخزين زوج جديد من الاسم والرقم، فهي مسؤولية كائن PhoneBook.

هناك مجال للتحسين في بنية صنف واجهة المستخدم لدينا. لننشئ دالة `add_entry(self)` تتولّى أمر إضافة مدخلة جديدة:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("commands: ")
        print("0 exit")
        print("1 add entry")

    # separation of concerns in action: a new method for adding an entry
    def add_entry(self):
        name = input("name: ")
        number = input("number: ")
        self.__phonebook.add_number(name, number)

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("command: ")
            if command == "0":
                break
            elif command == "1":
                self.add_entry()

application = PhoneBookApplication()
application.execute()
```

يمتدّ مبدأ _فصل المخاوف_ إلى مستوى التوابع أيضًا. كان يمكن أن نضع كل وظائف واجهة المستخدم في حلقة `while` واحدة معقّدة، لكن من الأفضل فصل كل وظيفة في دالتها الخاصة. فمسؤولية الدالة `execute()` هي مجرد تفويض الأوامر التي يكتبها المستخدم إلى التوابع ذات الصلة. وهذا يساعد في إدارة التعقيد المتزايد لبرنامجنا. فمثلًا، إذا أردنا لاحقًا تغيير طريقة عمل إضافة المدخلات، فمن الواضح فورًا أن علينا بعد ذلك أن نركّز جهودنا على الدالة `add_entry()`.

لنضمّ إلى واجهة المستخدم لدينا وظيفة البحث عن مدخلات. وينبغي أن يكون لها دالتها الخاصة أيضًا:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()

    def help(self):
        print("commands: ")
        print("0 exit")
        print("1 add entry")
        print("2 search")

    def add_entry(self):
        name = input("name: ")
        number = input("number: ")
        self.__phonebook.add_number(name, number)

    def search(self):
        name = input("name: ")
        numbers = self.__phonebook.get_numbers(name)
        if numbers == None:
            print("number unknown")
            return
        for number in numbers:
            print(number)

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("command: ")
            if command == "0":
                break
            elif command == "1":
                self.add_entry()
            elif command == "2":
                self.search()
            else:
                self.help()

application = PhoneBookApplication()
application.execute()
```

أصبح لدينا الآن تطبيق دفتر هاتف بسيط يعمل وجاهز للاختبار. وفيما يلي مثال على تشغيل:


```
commands:
0 exit
1 add entry
2 search

command: **1**
name: **Eric**
number: **02-123456**

command: **1**
name: **Eric**
number: **045-4356713**

command: **2**
name: **Eric**
02-123456
045-4356713

command: **2**
name: Emily
number unknown

command: **0**
```


لتطبيق بهذه البساطة كتبنا قدرًا كبيرًا من الشيفرة. ولو كتبناها كلها داخل حلقة `while` الواحدة لكان يمكننا على الأرجح أن نكتفي بقدر أقل كثيرًا من الشيفرة. غير أن قراءة الشيفرة سهلة تمامًا، والبنية واضحة، ولن نواجه عناء في إضافة ميزات جديدة.


## الخطوة 3: استيراد البيانات من ملف

لنفترض أن لدينا بالفعل بعض أرقام الهاتف مخزّنة في ملف، ونريد قراءة هذا الملف عند بدء تشغيل البرنامج. وملف البيانات بالتنسيق CSV التالي:

```csv
Eric;02-1234567;045-4356713
Emily;040-324344
```

معالجة الملفات مجال مسؤولية مستقل بوضوح، لذا تستحقّ صنفًا خاصًا بها:

```python
class FileHandler:
    def __init__(self, filename):
        self.__filename = filename

    def load_file(self):
        names = {}
        with open(self.__filename) as f:
            for line in f:
                parts = line.strip().split(';')
                name, *numbers = parts
                names[name] = numbers

        return names
```

تأخذ دالة البانية اسم الملف وسيطًا لها. وتقرأ الدالة `load_file(self)` محتوى الملف. وهي تقسم كل سطر إلى جزأين: اسم وقائمة أرقام. ثم تضيف هذه إلى قاموس، مستخدمةً الاسم مفتاحًا والقائمة قيمة.

وتستعمل الدالة ميزة بارعة في Python: إذ يمكن أولًا اختيار بعض العناصر من قائمة على حدة، ثم أخذ بقية العناصر في قائمة جديدة. ويمكنك رؤية مثال على ذلك أدناه. وقد تتذكّر من [الجزء 6](/book/mooc/part-6/1-reading-files#reading-csv-files) أن دالة السلسلة النصية `split` تعيد قائمة.

```python
my_list = [1, 2, 3, 4, 5]
first, second, *rest = my_list
print(first)
print(second)
print(rest)
```


```
1
2
[3, 4, 5]
```


يعني الرمز `*` أمام اسم المتغيّر `rest` في جملة الإسناد أن هذا المتغيّر الأخير ينبغي أن يحتوي على كل العناصر المتبقية في القائمة، ابتداءً من العنصر الثالث فصاعدًا.

ينبغي أن نختبر معالج الملفات منفصلًا قبل إدراجه في تطبيقنا:

```python
t = FileHandler("phonebook.txt")
print(t.load_file())
```


```
{'Eric': ['02-1234567', '045-4356713'], 'Emily': ['040-324344']}
```


وبما أن معالج الملفات يبدو يعمل بشكل جيّد، يمكننا إضافته إلى تطبيقنا. لنفترض أننا نريد قراءة الملف أول شيء في كل مرة يُشغَّل فيها البرنامج. والمكان المنطقي لقراءة الملف هو بانية الصنف `PhoneBookApplication`:

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()
        self.__filehandler = FileHandler("phonebook.txt")

        # add the names and numbers from the file to the phone book
        for name, numbers in self.__filehandler.load_file().items():
            for number in numbers:
                self.__phonebook.add_number(name, number)

    # the rest of the program
```

ينبغي اختبار هذه الوظيفة أيضًا. وبمجرّد أن نتأكّد من إمكانية الوصول إلى محتويات الملف عبر واجهة مستخدم تطبيقنا، يمكننا الانتقال إلى المرحلة التالية.

## الخطوة 4: تصدير البيانات إلى ملف

الميزة الأخيرة في نسختنا الأساسية من التطبيق هي حفظ محتويات دفتر الهاتف في الملف نفسه الذي قُرئت منه البيانات.

ويتضمّن هذا تغييرًا في الصنف `PhoneBook`. نحتاج إلى القدرة على تصدير محتويات دفتر الهاتف:

```python
class PhoneBook:
    def __init__(self):
        self.__persons = {}

    # ...

    # return all entries (in dictionary format)
    def all_entries(self):
        return self.__persons
```

ينبغي أن يتولّى الصنف `FileHandler` الحفظ الفعلي في الملف. لنضف الدالة `save_file` التي تأخذ تمثيل دفتر الهاتف على هيئة قاموس وسيطًا لها:

```python
class FileHandler():
    def __init__(self, filename):
        self.__filename = filename

    def load_file(self):
        # ...

    def save_file(self, phonebook: dict):
        with open(self.__filename, "w") as f:
            for name, numbers in phonebook.items():
                line = [name] + numbers
                f.write(";".join(line) + "\n")
```

ينبغي أن يحدث الحفظ عند خروج البرنامج. لنضف دالة لهذا الغرض إلى واجهة المستخدم، ونستدعيها قبل الخروج من حلقة `while`:

```python

class PhoneBookApplication:
    # the rest of the code for the user interface

    # a method which gets executed as the program exits
    def exit(self):
        self.__filehandler.save_file(self.__phonebook.all_entries())

    def execute(self):
        self.help()
        while True:
            print("")
            command = input("command: ")
            if command == "0":

                self.exit()
                break
            elif command == "1":
                self.add_entry()
            elif command == "2":
                self.search()
            else:
                self.help()
```

> **تمرين برمجي: توسعة دفتر الهاتف، الإصدار 1**
>
> في هذا التمرين ستنشئ توسيعًا صغيرًا لتطبيق دفتر الهاتف. وشيفرة المثال أعلاه موجودة في قالب التمرين. يُرجى إضافة أمر يتيح للمستخدم البحث في دفتر الهاتف بالرقم. وينبغي أن يعمل التطبيق بعد الإضافة كما يلي:


```
commands:
0 exit
1 add entry
2 search
3 search by number

command: **1**
name: **Eric**
number: **02-123456**

command: **1**
name: **Eric**
number: **045-4356713**

command: **3**
number: **02-123456**
Eric

command: **3**
number: **0100100**
unknown number

command: **0**
```


يُرجى تنفيذ هذه الإضافة مع مراعاة البنية الحالية للبرنامج. وهذا يعني أنه في الصنف `PhoneBookApplication` ينبغي أن تضيف دالة مساعدة مناسبة لتمكين الوظيفة الجديدة، وكذلك إضافة فرع جديد إلى حلقة `while`. وفي الصنف `PhoneBook` ينبغي أن تضيف دالة تتيح البحث بالرقم.

**ملاحظة:** عندما تختبر برنامجك وتنتهي بك الحال إلى تخزين أعداد كثيرة مختلفة من الأرقام في ملف `phonebook.txt`، فمن المحتمل ألّا تجتاز الاختبارات المحلية إذا قُرئت بيانات متعارضة من الملف عند بدء تشغيل التطبيق. ويمكنك أن تحاول إفراغ محتوى أي ملفات `phonebook.txt` تجدها في دليل التمرين _قبل_ تشغيل الاختبارات المحلية. وقد يعتمد أيّ هذه الملفات يستخدمه برنامجك على إعدادات Visual Studio Code لديك. يُرجى الاطّلاع على التفسير في [الجزء 6](/book/mooc/part-6/1-reading-files#what-if-visual-studio-code-cannot-find-my-file). وإذا كان حلك صحيحًا، فينبغي أن تجتاز اختبارات الخادم بشكل طبيعي على أي حال.


## كائنات داخل قاموس

في التمرين التالي يُطلب منك تغيير دفتر هاتفك بحيث تكون القيم في القاموس _كائنات_ لا قوائم.

لا شيء غريب جوهريًّا في هذا، لكنها أول مرة في هذه الدورة يُقترح فيها شيء من هذا القبيل، لذا لنستعرض مثالًا أبسط قبل الغوص في التمرين.

لدينا هنا تطبيق يتتبّع عدد التمارين التي أنجزها الطلاب في مساق. ويُخزَّن عدّاد تمارين كل طالب في كائن بسيط:

```python
class ExerciseCounter:
    def __init__(self):
        self.__exercises = 0

    def done(self):
        self.__exercises += 1

    def how_many(self):
        return self.__exercises
```

وتستخدم الدالة الرئيسية التالية الصنف أعلاه:

```python
students = {}

print("let's do some exercises")
while True:
    name = input("student: ")
    if len(name) == 0:
        break

    # create a new object if it doesn't exist yet
    if not name in students:
        students[name] = ExerciseCounter()

    # add a new done exercise to the counter
    students[name].done()

print()
print("exercises completed:")

for student, exercises in students.items():
    print(f"{student}'s exercises: {exercises.how_many()}")
```

ومثال تشغيل ما سبق قد يبدو هكذا:


```
let's do some exercises
student: **peter**
student: **sarah**
student: **andy**
student: **sarah**
student: **charlotte**
student: **charlotte**
student: **andy**
student: **sarah**
student:

exercises completed:
peter's exercises: 1
andy's exercises: 2
sarah's exercises: 3
charlotte's exercises: 2
```


هناك أمران ينبغي مراعاتهما في المثال أعلاه. عندما يُدخِل المستخدم اسمًا، يتحقّق البرنامج أولًا مما إذا كان الاسم مفتاحًا في القاموس بالفعل. وإذا لم يكن الاسم موجودًا، يُنشأ كائن جديد ويُضاف كمدخلة في القاموس:

```python
if not name in students:
    students[name] = ExerciseCounter()
```

وبعد ذلك يمكننا أن نكون _متيقّنين_ من أن الكائن موجود، مرتبطًا باسم الطالب المستخدم مفتاحًا. فإما أنه أُنشئ للتو، وإما أنه كان موجودًا من تكرار سابق للحلقة. وفي كلتا الحالتين، يمكننا الآن استرجاع الكائن بالمفتاح واستدعاء الدالة `done`:

```python
students[name].done()
```

يحتوي السطر أعلاه في الواقع على حدثين منفصلين. وكان يمكننا بالمثل استخدام متغيّر مساعد وكتابته في سطري شيفرة منفصلين:

```python
students_counter = students[name]
students_counter.done()
```

ملاحظة: مع أن الكائن مُسنَد هنا إلى متغيّر مساعد، فإن الكائن لا يزال موجودًا في القاموس تمامًا كما كان. ويحوي المتغيّر المساعد _مرجعًا_ إلى الكائن الموجود في القاموس.

إذا لم تكن متأكّدًا تمامًا مما يحدث فعليًا في الشيفرة أعلاه، فيُرجى تجربتها باستخدام [أداة التصوير المرئي (visualisation tool)](http://www.pythontutor.com/visualize.html#mode=edit).

> **تمرين برمجي: توسعة دفتر الهاتف، الإصدار 2**
>
> في هذا التمرين ستنشئ نسخة أخرى من `PhoneBookApplication`. وستضيف عناوين إلى البيانات يمكن ربطها بالاسم. ولتبسيط الأمر أُزيلت وظيفة الحفظ في ملف، وأُعيدت تسمية بعض التوابع الأخرى لتلائم التغيير على نحو أفضل.

## صنف منفصل لبيانات الشخص

يُرجى تغيير طريقة معالجة بيانات الشخص. نفّذ صنفًا اسمه `Person` يتولّى أرقام هاتف الأشخاص وعناوينهم. وينبغي أن يعمل الصنف كما يلي:

```python
person = Person("Eric")
print(person.name())
print(person.numbers())
print(person.address())
person.add_number("040-123456")
person.add_address("Mannerheimintie 10 Helsinki")
print(person.numbers())
print(person.address())
```


```
Eric
[]
None
['040-123456']
Mannerheimintie 10 Helsinki
```


## يستخدم PhoneBook الصنف Person

يُرجى تغيير التنفيذ الداخلي لتطبيقك بحيث يستخدم صنفك `PhoneBook` كائنات من الصنف `Person` لتخزين البيانات في دفتر الهاتف. أي ينبغي أن تظلّ الخاصية `__persons` تحتوي على قاموس، لكن ينبغي أن تكون القيم كائنات Person لا قوائم. ولا ينبغي أن يلاحظ مستخدم تطبيقك أي فرق؛ إذ يجب ألّا تؤثّر التغييرات في واجهة المستخدم.

**تحذير:** كلما أجريتَ تغييرات بنيوية في شيفرتك، كما هو موصوف في هذا التمرين، فخُذ خطوات صغيرة دائمًا واختبر في كل مرحلة ممكنة. ولا تحاول إجراء كل التغييرات دفعة واحدة. فذلك سبيل أكيد **للوقوع في مشكلات خطيرة في شيفرتك**.

قد تكون الخطوة الأولى المناسبة كتابة بعض الشيفرة للتحقّق من وظيفة الصنف `PhoneBook` مباشرة. فمثلًا، ينبغي ألّا يسبّب ما يلي أي أخطاء على الأقل:

```python
phonebook = PhoneBook()
phonebook.add_number("Eric", "02-123456")
print(phonebook.get_entry("Eric"))
print(phonebook.get_entry("Emily"))
```

لاحظ الاسم الجديد لدالة استرجاع مدخلة من دفتر الهاتف. لا تتحقّق الاختبارات الآلية مما تطبعه دالتك `get_entry`، لكن تأكّد من ألّا تُثير الشيفرة أعلاه أي أخطاء، ومن أن النتيجة منطقية ضمن تنفيذك.

بعد أن تُجري التغييرات اللازمة في برنامجك وتتحقّق تحقّقًا تامًّا من وظيفة الصنف `PhoneBook`، يمكنك الانتقال إلى واجهة المستخدم ومعرفة ما إذا كان كل شيء لا يزال يعمل كما هو متوقّع.

## إضافة عنوان

يُرجى تنفيذ وظيفة إضافة عنوان إلى مدخلة في دفتر هاتفك. وينبغي أن يعمل البرنامج كما يلي:


```
commands:
0 exit
1 add number
2 search
3 add address

command: **1**
name: **Eric**
number: **02-123456**

command: **3**
name: **Emily**
address: **Viherlaaksontie 7, Espoo**

command: **2**
name: **Eric**
02-123456
address unknown

command: **2**
name: **Emily**
number unknown
Viherlaaksontie 7, Espoo

command: **3**
name: **Eric**
address: **Linnankatu 75, Turku**

command: 2
name: **Eric**
02-123456
Linnankatu 75, Turku

command: **2**
name: **Wilhelm**
address unknown
number unknown

command: **0**
```


**تحذير وتلميح:** كما ورد أعلاه في التمرين السابق، لا تحاول إجراء كل التغييرات دفعة واحدة. فذلك سبيل أكيد **للوقوع في مشكلات خطيرة في شيفرتك**.

تأكّد أولًا من أنك تستطيع إضافة العناوين بشكل موثوق باستخدام الصنف `PhoneBook` مباشرة. وبمجرّد أن تتحقّق من ذلك، يمكنك الانتقال إلى التغييرات اللازمة في واجهة المستخدم.


## بعض الملاحظات الختامية

يتبع بناء مثال PhoneBook أعلاه المبادئ الجوهرية للبرمجة الكائنية على نحو جيّد إلى حدّ ما. والفكرة المركزية هي تحديد المسؤوليات المختلفة في البرنامج وتقسيمها منطقيًّا بين الأصناف والتوابع المختلفة. وأحد الدوافع الرئيسية لهذا التقسيم هو إدارة التعقيد. وثمة دافع مهم آخر هو أن التقسيم المنطقي للمسؤوليات - أي الوحدوية (modularity) بالمصطلح المهني - يجعل الشيفرة أسهل في الصيانة والتوسّع غالبًا.

وفي حزم البرمجيات التي تُطوَّر وتُستخدم في العالم الأوسع، فإن الجانب الأغلى تكلفةً في التطوير بفارق ساحق هو الصيانة والتوسّع، أي تصحيح أخطاء البرمجيات القائمة وتنفيذ ميزات جديدة. والوحدوية المنفَّذة تنفيذًا صحيحًا ميزة شديدة الأهمية ماليًّا في تطوير البرمجيات.

وثمة مبادئ أخرى في البرمجة الكائنية جديرة بالإبراز هنا. يُعدّ PhoneBook مثالًا جيّدًا على كيفية فصل منطق التطبيق الأساسي (وينبغي فصله) عن واجهة المستخدم _وعن_ أي وسائل لتخزين البيانات _معًا_. وهذا مهم لسببين مختلفين. أولًا، يتيح هذا الفصل اختبار الشيفرة في وحدات أصغر، صنفًا وتابعًا في كل مرة. وثانيًا، وبما أن المنطق الأساسي أصبح الآن مستقلًّا عن الواجهات المفضية إلى العالم الخارجي، فمن الممكن تغيير تنفيذ المنطق الأساسي أو الواجهات إلى حدّ ما دون كسر التطبيق بأكمله.

تسير عملية معالجة الملفات في تطبيق PhoneBook كما يلي: يقرأ البرنامج الملف مرة واحدة فقط عند بدء تشغيله. وبعد ذلك تُخزَّن كل البيانات في متغيّرات داخل البرنامج. وعند خروج البرنامج يخزّن كل البيانات مجددًا، وهو ما يعني عمليًّا الكتابة فوق الملف. وفي معظم الحالات هذه هي الطريقة الموصى بها للتعامل مع الملفات الخارجية، لأن تعديل البيانات في موضعها يكون غالبًا أكثر تعقيدًا بكثير.

هناك كتب إرشادية جيّدة كثيرة للتعلّم عن ممارسات البرمجة الجيّدة. ومنها [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) لروبرت مارتن. غير أن أمثلة الشيفرة في الكتاب مُنفَّذة بلغة Java، لذا فإن العمل على الأمثلة قد يكون شاقًّا إلى حدّ ما في هذه المرحلة من مسارك البرمجي، وإن كان فريق الدورة يوصي بالكتاب نفسه بشدّة. وستُستكشف موضوعات الشيفرة الجيّدة سهلة الصيانة والقابلة للتوسّع بمزيد من التفصيل في مقرّري
[Software Development Methods](https://studies.helsinki.fi/courses/cu/hy-CU-118024742-2020-08-01) و[Software Engineering](https://studies.helsinki.fi/courses/cu/hy-CU-118024909-2020-08-01).

تأتي كتابة الشيفرة وفقًا لمبادئ البرمجة الكائنية الراسخة بثمن. فمن المرجّح أن تنتهي بك الحال إلى كتابة شيفرة أكثر مما كنت ستكتبه لو نفّذت برنامجك في نوبة واحدة متواصلة من الشيفرة المتشابكة (spaghetti code). وإحدى المهارات الأساسية للمبرمج هي تحديد النهج الأفضل لكل موقف. ففي بعض الأحيان يلزم أن تُجمّع شيئًا ما بسرعة لاستخدام فوري. ومن ناحية أخرى، إذا كان من المتوقّع في المستقبل المنظور أن تُعاد استخدام الشيفرة أو تُصان أو تُطوَّر أكثر، سواء من قبلك أو - وهو الأهم - من شخص آخر تمامًا، فإن قابلية قراءة شيفرة البرنامج ووحدويتها المنطقية تصبحان ضروريّة. وفي أغلب الأحيان، إذا كان الأمر يستحقّ الفعل، فإنه يستحقّ أن يُؤدّى بإتقان، حتى في أشد مراحل التطوير تبكيرًا.

ولإنهاء هذا الجزء من المادة ستنفّذ تطبيقًا أكبر واحدًا آخر.

> **تمرين برمجي: CourseRecords**
>
> يُرجى كتابة تطبيق تفاعلي لتتبّع دراستك. والبنية الداخلية متروكة لك، لكن هذه فرصة جيّدة للتمرين على إنشاء بنية مشابهة لتلك في مثال PhoneBook أعلاه.

وينبغي أن يعمل برنامجك كما يلي:


```
1 add course
2 get course data
3 statistics
0 exit

command: **1**
course: **ItP**
grade: **3**
credits: **5**

command: **2**
course: **ItP**
ItP (5 cr) grade 3

command: **1**
course: **ItP**
grade: **5**
credits: **5**

command: **2**
course: **ItP**
ItP (5 cr) grade 5

command: **1**
course: **ItP**
grade: **1**
credits: **5**

command: **2**
course: **ItP**
ItP (5 cr) grade 5

command: **2**
course: **Introduction to Java**
no entry for this course

command: **1**
course: **ACiP**
grade: **1**
credits: **10**

command: **1**
course: **ItAI**
grade: **2**
credits: **5**

command: **1**
course: **Algo101**
grade: **4**
credits: **1**

command: **1**
course: **CompModels**
grade: **5**
credits: **8**

command: **3**
5 completed courses, a total of 29 credits
mean 3.4
grade distribution
5: xx
4: x
3:
2: x
1: x

command: **0**
```


ينبغي أن يؤدي كل اسم مساق إلى مدخلة واحدة في السجلات. ويمكن رفع الدرجة بإعادة إدخال تفاصيل المساق، لكن ينبغي ألّا تُخفَض الدرجة أبدًا.

هذا التمرين يساوي نقطتي تمرين. وتُمنح الأولى بعد أن تعمل الأوامر 1 و2 و0 بشكل صحيح في برنامجك. وتُمنح الثانية إذا عمل الأمر 3 أيضًا كما هو متوقّع.


## خاتمة

لإنهاء هذا الجزء من المادة، لنعد لحظة إلى واجهة مستخدم مثال دفتر الهاتف.

```python
class PhoneBookApplication:
    def __init__(self):
        self.__phonebook = PhoneBook()
        self.__filehandler = FileHandler("phonebook.txt")

    # the rest of the program

application = PhoneBookApplication()
application.execute()
```

يحتوي كائن `PhoneBookApplication` على كائن `PhoneBook` وكائن `FileHandler` معًا. واسم الملف المُمرَّر إلى FileHandler مضبوط في الوقت الحالي ترميزًا ثابتًا (hard-coded) داخل الصنف `PhoneBookApplication`. وهذا تفصيل لا صلة له إطلاقًا بـ_واجهة المستخدم_ الخاصة بالتطبيق. بل إنه يخرق مبدأ _فصل المخاوف_: فمن المفترض ألّا يكون موضع حفظ كائن `PhoneBook` لمحتوياته موضع اهتمام لـ `PhoneBookApplication`، ومع ذلك لو أردنا تغيير الموقع لاضطررنا إلى تغيير شيفرة `PhoneBookApplication`.

وستكون الفكرة أفضل لو أنشأنا كائن FileHandler في مكان ما _خارج_ الصنف `PhoneBookApplication` ومرّرناه وسيطًا إلى التطبيق:

```python
class PhoneBookApplication:
    def __init__(self, storage_service):
        self.__phonebook = PhoneBook()
        self.__storage_service = storage_service

    # the rest of the user interface

# create a FileHandler
storage_service = FileHandler("phonebook.txt")
# pass it as an argument to PhoneBookApplication's constructor
application = PhoneBookApplication(storage_service)
application.execute()
```

يزيل هذا _تبعية غير ضرورية_ من الصنف `PhoneBookApplication`. فإذا تغيّر اسم الملف، لم تعد واجهة المستخدم بحاجة إلى تغيير. وكل ما نحتاج إليه هو تمرير وسيط مختلف إلى البانية:

```python
class PhoneBookApplication:
    def __init__(self, filename):
        self.__phonebook = PhoneBook()
        self.__filename = filename

    # the rest of the user interface

# use a different filename
storage_service = FileHandler("new_phonebook.txt")
application = PhoneBookApplication(storage_service)
application.execute()
```

يتيح لنا هذا التغيير أيضًا التفكير في مواضع تخزين أكثر غرابة، مثل خدمة سحابية على الإنترنت. وكل ما نحتاج إليه هو تنفيذ صنف يستخدم الخدمة السحابية، ويوفّر لـ `PhoneBookApplication` التوابع نفسها تمامًا التي يوفّرها `FileHandler`.

ويمكن تمرير نسخة من صنف "معالج السحابة" الجديد هذا وسيطًا إلى البانية، دون أن يلزم تغيير سطر واحد من الشيفرة في واجهة المستخدم:

```python
class CloudHandler:
    # code for saving the contents of the phone book
    # in a cloud service on the internet

storage_service = CloudHandler("amazon-cloud", "username", "passwrd")
application = PhoneBookApplication(storage_service)
application.execute()
```

كما رأيتَ سابقًا، فإن استخدام تقنيات كهذه يحمل ثمنًا، إذ إن هناك شيفرة أكثر لكتابتها، لذا يحتاج المبرمج إلى التفكير فيما إذا كان ذلك مقايضة مقبولة.

تُسمّى التقنية الموضّحة أعلاه _حقن التبعيات (dependency injection)_. وكما يوحي الاسم، تكمن الفكرة في توفير أي تبعية يحتاجها الكائن من _خارج_ الكائن. وهي أداة مفيدة جدًّا في صندوق أدوات المبرمج، إذ تسهّل تنفيذ ميزات جديدة في البرامج وتيسّر الاختبار الآلي. وستُستكشف هذه الموضوعة بمزيد من التفصيل في المقرّرين المذكورين أعلاه [Software Development Methods](https://studies.helsinki.fi/courses/cu/hy-CU-118024742-2020-08-01) و[Software Engineering](https://studies.helsinki.fi/courses/cu/hy-CU-118024909-2020-08-01).

يُرجى الإجابة على استبيان سريع حول هذا الجزء من الدورة.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 0341ead5-6a31-5ce5-92e8-215b8c990c32)
