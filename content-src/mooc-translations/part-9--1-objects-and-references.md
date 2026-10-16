---
title: "الكائنات والمراجع"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون قادرًا على استخدام هياكل بيانات مختلفة للتعامل مع الكائنات
> - ستعرف كيف يمكن تمرير الكائنات بوصفها أوسيطًا


كل قيمة في Python هي كائن. فأي كائن تنشئه بناءً على صنف (class) حدّدته بنفسك يعمل تمامًا مثل أي كائن «عادي» من Python. وعلى سبيل المثال، يمكن تخزين الكائنات في قائمة:

```python
from datetime import date

class CompletedCourse:

    def __init__(self, course_name: str, credits: int, completion_date: date):
        self.name = course_name
        self.credits = credits
        self.completion_date = completion_date


if __name__ == "__main__":
    # Here we create some completed courses and add these to a list 
    completed = []

    maths1 = CompletedCourse("Mathematics 1", 5, date(2020, 3, 11))
    prog1 = CompletedCourse("Programming 1", 6, date(2019, 12, 17))

    completed.append(maths1)
    completed.append(prog1)

    # Let's add a couple more straight to the list
    completed.append(CompletedCourse("Physics 2", 4, date(2019, 11, 10)))
    completed.append(CompletedCourse("Programming 2", 5, date(2020, 5, 19)))

    # Go through all the completed courses, print out their names 
    # and sum up the credits received
    credits = 0
    for course in completed:
        print(course.name)
        credits += course.credits

    print("Total credits received:", credits)
```


```
Mathematics 1
Programming 1
Physics 2
Programming 2
Total credits received: 20
```


> **تمرين برمجي: أسرع سيارة**
>
> يحتوي قالب التمرين على صنف اسمه `Car` يمثّل ملامح السيارة بوساطة خاصيتين: `make (str)` و`top_speed (int)`.

يُرجى كتابة دالة اسمها `fastest_car(cars: list)` تأخذ قائمة من كائنات `Car` بوصفها وسيطًا لها.

يجب أن تُرجع الدالة العلامة المصنّعة للسيارة الأسرع. يمكنك افتراض أنه سيكون هناك دائمًا سيارة واحدة ذات أعلى سرعة قصوى. لا تغيّر القائمة المُعطاة بوصفها وسيطًا، ولا تُجرِ أي تعريف على تعريف الصنف `Car`.

يمكنك استخدام الشيفرة التالية لاختبار دالتك:

```python
if __name__ == "__main__":
    car1 = Car("Saab", 195)
    car2 = Car("Lada", 110)
    car3 = Car("Ferrari", 280)
    car4 = Car("Trabant", 85)

    cars = [car1, car2, car3, car4]
    print(fastest_car(cars))
```


```
Ferrari
```


> **تمرين برمجي: الإرسالات الناجحة**
>
> يحتوي قالب التمرين على صنف اسمه `ExamSubmission` الذي، كما يوحي اسمه، يمثّل تقديم مترشح في امتحان. وقد عُرِّفت في الصنف خاصيتان: `examinee (str)` و`points (int)`.

يُرجى كتابة دالة اسمها `passed(submissions: list, lowest_passing: int)` تأخذ قائمة من متقدمات الامتحان وعددًا صحيحًا يمثّل أدنى درجة نجاح بوصفهما وسيطين لها.

يجب أن تنشئ الدالة قائمة جديدة وتُرجعها، تتضمّن فقط المتقدمين الناجحين من القائمة الأصلية. يُرجى عدم تغيير القائمة المُعطاة بوصفها وسيطًا، وعدم إجراء أي تعريف على تعريف الصنف `ExamSubmission`.

يمكنك استخدام الشيفرة التالية لاختبار دالتك:

```python
if __name__ == "__main__":
    s1 = ExamSubmission("Peter", 12)
    s2 = ExamSubmission("Pippa", 19)
    s3 = ExamSubmission("Paul", 15)
    s4 = ExamSubmission("Phoebe", 9)
    s5 = ExamSubmission("Persephone", 17)

    passes = passed([s1, s2, s3, s4, s5], 15)
    for passing in passes:
        print(passing)
```


```
ExamSubmission (examinee: Pippa, points: 19)
ExamSubmission (examinee: Paul, points: 15)
ExamSubmission (examinee: Persephone, points: 17)
```


قد تتذكّر أن القوائم لا تحتوي على أي كائنات بحد ذاتها، بل تحتوي على _مراجع إلى الكائنات_. ويمكن أن يظهر الكائن نفسه مرات عديدة في قائمة واحدة، كما يمكن الإشارة إليه مرات عديدة داخل القائمة أو خارجها. لننظر إلى مثال:

```python
class Product:
    def __init__(self, name: str, unit: str):
        self.name = name
        self.unit = unit


if __name__ == "__main__":
    shopping_list = []
    milk = Product("Milk", "litre")

    shopping_list.append(milk)
    shopping_list.append(milk)
    shopping_list.append(Product("Cucumber", "piece"))
```

![9_1_1.png](/images/mooc/part-9/9_1_1.png)

إذا كان هناك أكثر من مرجع واحد إلى الكائن نفسه، فلا يُحدث فرقًا أيّ المراجع يُستخدَم:

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

dogs = []
fluffy = Dog("Fluffy")
dogs.append(fluffy)
dogs.append(fluffy)
dogs.append(Dog("Fluffy"))

print("Dogs initially:")
for dog in dogs:
    print(dog)

print("The dog at index 0 is renamed:")
dogs[0].name = "Pooch"
for dog in dogs:
    print(dog)

print("The dog at index 2 is renamed:")
dogs[2].name = "Fifi"
for dog in dogs:
    print(dog)
```



```
Dogs initially:
Fluffy
Fluffy
Fluffy
The dog at index 0 is renamed:
Pooch
Pooch
Fluffy
The dog at index 2 is renamed:
Pooch
Pooch
Fifi
```


تشير المراجع في الفهرسين 0 و1 في القائمة إلى الكائن نفسه. ويمكن استخدام أيّ من المراجع للوصول إلى الكائن. أما المرجع في الفهرس 2 فيشير إلى كائن مختلف، وإن كان محتواه يبدو مطابقًا. وتغيير محتويات هذا الكائن الأخير لا يؤثر في الآخر.

يُستخدَم المشغّل `is` للتحقق مما إذا كان المرجعان يشيران إلى الكائن نفسه تمامًا، بينما يخبرك المشغّل `==` بما إذا كانت محتويات الكائنين متطابقة. وليوضح المثال التالي الفرق:

```python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(list1 is list2)
print(list1 is list3)
print(list2 is list3)

print()

print(list1 == list2)
print(list1 == list3)
print(list2 == list3)
```


```
False
True
False

True
True
True
```


يمكن أيضًا تخزين أي كائن من Python في قاموس أو أي هيكل بيانات آخر. وينطبق هذا أيضًا على الكائنات المنشأة بناءً على صنف حدّدته بنفسك.

```python
class Student:
    def __init__(self, name: str, cr: int):
        self.name = name
        self.cr = cr

if __name__ == "__main__":
    # The key in this dictionary is the student number, 
    # and the value is an object of type Student
    students = {}
    students["12345"] = Student("Saul Student", 10)
    students["54321"] = Student("Sally Student", 67)
```

يمكن لأداة [التصوّر](http://www.pythontutor.com/visualize.html#mode=edit) أن تساعدك على فهم المثال أعلاه:

![9_1_2.png](/images/mooc/part-9/9_1_2.png)


## هل نستخدم self أم لا؟

حتى الآن لم نمس سوى السطح من استخدام اسم المعامل `self`. لننظر مليًّا في متى ينبغي استخدامه ومتى لا ينبغي.

فيما يلي صنف بسيط يتيح لنا إنشاء كائن مفردات يحتوي على بعض الكلمات:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    def add_word(self, word: str):
        if not word in self.words:
            self.words.append(word)

    def print_vocabulary(self):
        for word in sorted(self.words):
            print(word)

vocab = Vocabulary()
vocab.add_word("python")
vocab.add_word("object")
vocab.add_word("object-oriented programming")
vocab.add_word("object")
vocab.add_word("nerd")

vocab.print_vocabulary()
```


```
nerd
object
object-oriented programming
python
```


تُخزَّن قائمة الكلمات في خاصية اسمها `self.words`. وفي هذه الحالة يُعدّ اسم المعامل `self` إلزاميًا في تابع الإنشاء الخاص بالصنف وفي أي تابع آخر يصل إلى ذلك المتغيّر. وإذا حُذف `self`، فلن تصل التوابع المختلفة إلى قائمة الكلمات نفسها.

لنُضِف تابعًا جديدًا إلى تعريف صنفنا. يُرجع التابع `longest_word(self)` أطول الكلمات في المفردات (أو إحداها).

ما يلي إحدى طرق إنجاز هذه المهمّة، لكننا سنرى قريبًا أنها ليست طريقًا جيّدًا:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # define two helper variables
        self.longest = ""
        self.length_of_longest = 0

        for word in self.words:
            if len(word) > self.length_of_longest:
                self.length_of_longest = len(word)
                self.longest = word

        return self.longest
```

يستخدم هذا التابع متغيّرين مساعدين مُعلَنين باسم المعامل `self`. تذكّر أن أسماء المتغيّرات لا تهمّ من الناحية الوظيفية، لذا يمكن تسمية هذين المتغيّرين أيضًا تسمية أكثر إرباكًا، مثل `helper` و`helper2` مثلًا. وتصبح الشيفرة أشبه بالغامضة:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # define two helper variables
        self.helper = ""
        self.helper2 = 0

        for word in self.words:
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

عندما يُعلَن متغيّر باسم المعامل `self`، يصبح خاصية للكائن. وهذا يعني أن المتغيّر سيستمر في الوجود ما دام الكائن موجودًا. وتحديدًا، سيستمر المتغيّر في الوجود أيضًا بعد أن يُنهي التابع المعلِن له تنفيذه. وفي المثال أعلاه هذا غير ضروري إطلاقًا، لأن المتغيّرين المساعدين مخصّصان للاستخدام فقط داخل التابع `longest_word(self)`. وإذًا، فإن إعلان المتغيّرات المساعدة باسم المعامل `self` ليس فكرة جيّدة هنا.

إضافةً إلى إبقاء المتغيّرات في الوجود بعد «تاريخ انتهاء صلاحيتها»، فإن استخدام `self` لإنشاء خصائص جديدة حيث لا حاجة إليها قد يسبّب أخطاءً صعبة في شيفرتك. وخاصة الخصائص ذات الأسماء العامة مثل `self.helper`، التي تُستخدَم بعد ذلك في توابع مختلفة متنوعة، إذ قد تسبّب سلوكًا غير متوقّع يصعب تتبعه.

مثلًا، إذا أُعلِن متغيّر مساعد بوصفه خاصية وأُسندت إليه قيمة أوّلية في تابع الإنشاء، ثم استُخدَم ذلك المتغيّر في سياق غير متعلق به في تابع آخر، فتكون النتائج غالبًا غير متوقّعة:

```python
class Vocabulary:
    def __init__(self):
        self.words = []
        # define helper variables
        self.helper = ""
        self.helper2 = ""
        self.helper3 = ""
        self.helper4 = ""

    # ...

    def longest_word(self):
        for word in self.words:
            # above the helper variables were all assigned string values
            # the following will not work because the type of helper2 is wrong
            if len(word) > self.helper2:
                self.helper2 = len(word)
                self.helper = word

        return self.helper
```

قد تظن أن هذه المسألة تُحلّ بمجرد إعلان الخصائص حيث تُستخدَم، _خارج_ تابع الإنشاء، لكن ذلك يُفضي إلى حالة تكون فيها الخصائص المتاحة عبر الكائن معتمدة على _التوابع التي نُفِّذت_. وفي الجزء السابق رأينا أن ميزة إعلان الخصائص في تابع الإنشاء هي أن جميع نسخ الصنف (instances) ستملك الخصائص ذاتها تمامًا. وإذا لم يكن هذا هو الحال، فإن استخدام نسخ مختلفة من الصنف يمكن أن يُفضي بسهولة إلى أخطاء.

وخلاصةً، إذا احتجت إلى متغيّرات مساعدة لاستخدامها داخل تابع واحد، فالطريقة الصحيحة لذلك هي _بدون_ `self`. ولكي تجعل شيفرتك أسهل على الفهم، استخدم أيضًا أسماء متغيّرات دلّالة:

```python
class Vocabulary:
    def __init__(self):
        self.words = []

    # ...

    def longest_word(self):
        # the correct way of declaring helper variables 
        # for use within a single method
        longest = ""
        length_of_longest = 0

        for word in self.words:
            if len(word) > length_of_longest:
                length_of_longest = len(word)
                longest = word

        return longest
```

في التنفيذ أعلاه لا يمكن الوصول إلى المتغيّرات المساعدة إلا أثناء تنفيذ التابع. والقيم المخزّنة فيها لا يمكن أن تسبّب تعقيدات في أجزاء أخرى من البرنامج.

## الكائنات بوصفها أوسيطًا للدوال

الكائنات المنشأة بناءً على أصنافنا الخاصة قابلة للتغيير عادةً. قد تتذكّر أنه مثلًا قوائم Python قابلة للتغيير: فعند تمريرها بوصفها أوسيطًا إلى الدوال، يمكن أن يتغيّر محتواها نتيجة التنفيذ.

لننظر إلى مثال بسيط تتلقّى فيه دالة مرجعًا إلى كائن من نوع `Student` بوصفه وسيطًا لها. ثم تغيّر الدالة اسم الطالب. وتصل الدالة والدالة الرئيسية التي تستدعيها معًا إلى الكائن نفسه، فيظهر التغيير في الدالة الرئيسية أيضًا.

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# the type hint here uses the name of the class defined above
def change_name(student: Student):
    student.name = "Saul Student"

# create a Student object
steve = Student("Steve Student", "12345")

print(steve)
change_name(steve)
print(steve)
```


```
Steve Student (12345)
Saul Student (12345)
```


من الممكن أيضًا إنشاء الكائنات داخل الدوال. وإذا أعادت دالة مرجعًا إلى الكائن المنشأ حديثًا، فإنه يصبح متاحًا أيضًا داخل الدالة الرئيسية:

```python
from random import randint, choice

class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number

    def __str__(self):
        return f"{self.name} ({self.student_number})"

# This function creates and returns a new Student object.
# It randomly selects values for the name and the student number.
def new_student():
    first_names = ["Mark","Mindy","Mary","Mike"]
    last_names = ["Javanese", "Rusty", "Scriptor", "Pythons"]

    # randomly determine the name
    name = choice(first_names) + " " + choice(last_names)

    # randomly determine the student number
    student_number = str(randint(10000,99999))

    # Create and return a Student object
    return Student(name, student_number)

if __name__ == "__main__":
    # Call the function five times and store the results in a list
    students = []
    for i in range(5):
        students.append(new_student())

    # Print out the results
    for student in students :
        print(student)
```

قد يؤدي تنفيذ الشيفرة أعلاه إلى المخرجات التالية (ملاحظة: بما أن العشوائية متضمّنة، فإنك إذا جرّبت الشيفرة بنفسك فستكون النتائج مختلفة على الأرجح).


```
Mary Rusty (78218)
Mindy Rusty (80068)
Mike Pythons (70396)
Mark Javanese (83307)
Mary Pythons (45149)
```


## الكائنات بوصفها أوسيطًا للتوابع

وبالمثل، يمكن أن تعمل الكائنات بوصفها أوسيطًا للتوابع. لننظر إلى مثال من حديقة ملاهي:

```python
class Person:
    def __init__(self, name: str, height: int):
        self.name = name
        self.height = height

class Attraction:
    def __init__(self, name: str, min_height: int):
        self.visitors = 0
        self.name = name
        self.min_height = min_height

    def admit_visitor(self, person: Person):
        if person.height >= self.min_height:
            self.visitors += 1
            print(f"{person.name} got on board")
        else:
            print(f"{person.name} was too short :(")

    def __str__(self):
        return f"{self.name} ({self.visitors} visitors)"
```
يحتوي الصنف Attraction على تابع `admit_visitor` يأخذ كائنًا من نوع `Person` بوصفه وسيطًا. وإذا كان الزائر طويلًا بما يكفي، فقد قُبل صعودًا وزيد عدد الزوار. ويمكن اختبار الأصناف كما يلي:

```python
rollercoaster = Attraction("Rollercoaster", 120)
jared = Person("Jared", 172)
alice = Person("Alice", 105)

rollercoaster.admit_visitor(jared)
rollercoaster.admit_visitor(alice)

print(rollercoaster)
```


```
Jared got on board
Alice was too short :(
Rollercoaster (1 visitors)
```


> **تمرين برمجي: مركز الأطفال**
>
> يحتوي قالب التمرين على صنف اسمه `Person` وهيكل عظمي من التنفيذ للصنف `BabyCentre`. ويؤدّي كائن `BabyCentre` إجراءات مختلفة على كائن `Person`؛ فهو قد يزن الشخص مثلًا أو يُطعمه. وفي هذا التمرين ستنفّذ بقية الصنف `BabyCentre`. يُرجى عدم تغيير تعريف الصنف `Person` بأي شكل من الأشكال.

## وزن الأشخاص

يحتوي تعريف الصنف `BabyCentre` على مخطط للدالة `weigh`:

```python
class BabyCentre:
    def weigh(self, person: Person):
        # return the weight of the person passed as an argument
        return -1
```

يأخذ التابع كائن `Person` بوصفه وسيطًا، وينبغي أن يُرجع وزن الشخص. ويمكنك الوصول إلى وزن الشخص عبر الخاصية المناسبة المعرّفة في الصنف `Person`. يُرجى ملء بقية تنفيذ التابع `weigh`.

فيما يلي مثال لدالة رئيسية يزن فيها `BabyCentre` كائني `Person` منفصلين:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```


```
Eric weighs 7 kg
Peter weighs 85 kg
```


## الإطعام

من الممكن تغيير حالة كائن مُمرَّر بوصفه وسيطًا. يُرجى تنفيذ التابع `feed(person: Person)` الذي يزيد وزن الشخص المُمرَّر بوصفه وسيطًا بمقدار واحد.

في المثال التالي يُوزَن شخصان، ثم يُطعَم أحدهما ثلاث مرات. ثم يُوزَن الشخصان مرة أخرى:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
print() 

baby_centre.feed(eric)
baby_centre.feed(eric)
baby_centre.feed(eric)

print(f"{eric.name} weighs {baby_centre.weigh(eric)} kg")
print(f"{peter.name} weighs {baby_centre.weigh(peter)} kg")
```

يجب أن تكشف المخرجات عن أن وزن Eric قد زيد بمقدار ثلاثة:


```
Eric weighs 7 kg
Peter weighs 85 kg

Eric weighs 10 kg
Peter weighs 85 kg
```


## عدّ عمليات الوزن

يُرجى تنفيذ التابع `weigh_ins()` الذي يُرجع العدد الإجمالي لعمليات الوزن التي نفّذها كائن `BabyCentre`. ملاحظة: ستحتاج إلى خاصية جديدة لتتبّع عدد عمليات الوزن. يمكنك استخدام الشيفرة التالية لاختبار تابعك:

```python
baby_centre = BabyCentre()

eric = Person("Eric", 1, 110, 7)
peter = Person("Peter", 33, 176, 85)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")

baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)

print(f"Total number of weigh-ins is {baby_centre.weigh_ins()}")
```


```
Total number of weigh-ins is 0
Total number of weigh-ins is 2
Total number of weigh-ins is 6
```


> **تمرين برمجي: LunchCard وPaymentTerminal**
>
> في الجزء السابق كان هناك [تمرين](/part-8/5-more-examples-of-classes#programming-exercise-lunchcard) نفّذتَ فيه الصنف `LunchCard`. وكانت البطاقة تملك توابع منفصلة لتناول غداء عادي وغداء خاص، إلى جانب تابع لإيداع المال في البطاقة.

لكن الصنف `LunchCard` كما طُلب منك تنفيذه يحمل بعض المشاكل. فالبطاقة بحد ذاتها كانت تعرف أسعار خيارات الغداء المختلفة، وتعرف كيف تطرح المبلغ الصحيح من الرصيد بناءً على هذه الأسعار. لكن تخيّل أن الأسعار تغيّرت، أو أُضيفت عناصر جديدة إلى النظام، بينما كانت عدة بطاقات مسجّلة بالفعل في النظام. وهذا يعني أن كل البطاقات الموجودة يجب أن تُستبدل بإصدارات تعرف الأسعار الجديدة.

والحلّ الأفضل هو جعل البطاقات «غبيّة»، جاهلة بأسعار المنتجات المختلفة. ومهمّة البطاقة تكون ببساطة تتبّع الرصيد المتاح. وكل الميزات الأكثر تعقيدًا ينبغي أن تكون ضمن صنف آخر: طرفية الدفع.

## نسخة أبسط من LunchCard

لنُنفّذ أولًا نسخة أبسط من الصنف `LunchCard`. ينبغي أن تتضمّن البطاقة وظائف فقط لمعرفة الرصيد الحالي، وإيداع المال في البطاقة، والطرح من الرصيد. يُرجى ملء التابع `subtract_from_balance(amount)` في قالب التمرين وفق التعليمات في التعليقات:

```python
class LunchCard:
    def __init__(self, balance: float):
        self.balance = balance

    def deposit_money(self, amount: float):
        self.balance += amount

    def subtract_from_balance(self, amount: float):
        pass
        # The amount should be subtracted from the balance only if
        # there is enough money on the card.
        # If the payment is successful, the method returns True. 
        # Otherwise it returns False.
```

يمكنك استخدام الشيفرة التالية لاختبار دالتك:

```python
if __name__ == "__main__":
    card = LunchCard(10)
    print("Balance", card.balance)
    result = card.subtract_from_balance(8)
    print("Payment successful:", result)
    print("Balance", card.balance)
    result = card.subtract_from_balance(4)
    print("Payment successful:", result)
    print("Balance", card.balance)
```


```
Balance 10
Payment successful: True
Balance 2
Payment successful: False
Balance 2
```


## طرفية الدفع والتعامل مع المدفوعات النقدية

في مقهى الطلبة يمكن الدفع إما نقدًا أو ببطاقة LunchCard. وتُستخدَم طرفية الدفع للتعامل مع كلٍّ من المدفوعات النقدية ومدفوعات البطاقة. لنبدأ بالمدفوعات النقدية.

هنا لدينا هيكل عظمي من التنفيذ لصنف `PaymentTerminal`. يُرجى تنفيذ التوابع كما هو موصوف في التعليقات:

```python
class PaymentTerminal:
    def __init__(self):
        # Initially there is 1000 euros in cash available at the terminal
        self.funds = 1000
        self.lunches = 0
        self.specials = 0

    def eat_lunch(self, payment: float):
        # A regular lunch costs 2.50 euros.
        # Increase the value of the funds at the terminal by the 
        # price of the lunch, increase the number of lunches sold, 
        # and return the appropriate change.
        # If the payment passed as an argument is not large enough to cover
        # the price, the lunch is not sold, and the entire sum is returned.

    def eat_special(self, payment: float):
        # A special lunch costs 4.30 euros.
        # Increase the value of the funds at the terminal by the 
        # price of the lunch, increase the number of lunches sold, 
        # and return the appropriate change.
        # If the payment passed as an argument is not large enough to cover
        # the price, the lunch is not sold, and the entire sum is returned.
```

يمكنك استخدام الشيفرة التالية لاختبار صنفك:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

change = exactum.eat_lunch(5)
print("The change returned was", change)

change = exactum.eat_special(4.3)
print("The change returned was", change)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```


```
The change returned was 7.5
The change returned was 2.5
The change returned was 0.0
Funds available at the terminal: 1009.3
Regular lunches sold: 2
Special lunches sold: 1
```


## التعامل مع معاملات البطاقة

والآن لنُنفّذ معاملات البطاقة. سنحتاج إلى توابع تأخذ `LunchCard` بوصفها وسيطًا، وتُقلّل رصيد البطاقة بسعر الغداء. فيما يلي مخططات هذه التوابع. يُرجى ملء التوابع كما هو موصوف في التعليقات:

```python
class PaymentTerminal:
    # ...

    def eat_lunch_lunchcard(self, card: LunchCard):
        # A regular lunch costs 2.50 euros.
        # If there is enough money on the card, 
        # subtract the price of the lunch from the balance
        # and return True. If not, return False.


    def eat_special_lunchcard(self, card: LunchCard):
        # A special lunch costs 4.30 euros.
        # If there is enough money on the card, 
        # subtract the price of the lunch from the balance
        # and return True. If not, return False.
```

**ملاحظة مهمة:** عند الدفع ببطاقة LunchCard لا يتغيّر المبلغ النقدي المتاح في الطرفية. ومع ذلك، تُباع وجبات الغداء دائمًا متى كان الرصيد المطلوب متاحًا، فتذكّر زيادة عدد الوجبات المباعة بما يناسب.

يمكنك استخدام الشيفرة التالية لاختبار صنفك:

```python
exactum = PaymentTerminal()

change = exactum.eat_lunch(10)
print("The change returned was", change)

card = LunchCard(7)

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
result = exactum.eat_lunch_lunchcard(card)
print("Payment successful:", result)

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```


```
The change returned was 7.5
Payment successful: True
Payment successful: False
Payment successful: True
Funds available at the terminal: 1002.5
Regular lunches sold: 2
Special lunches sold: 1
```


## إيداع المال في البطاقة

أخيرًا، لنُضِف تابعًا يتيح لك إيداع المال في البطاقة. يدفع مالك البطاقة هذا نقدًا، فيُضاف المبلغ المودَع إلى الأموال المتاحة في الطرفية. وهذا مخطط للتابع:

```python
def deposit_money_on_card(self, card: LunchCard, amount: float):
    pass
```

يمكنك استخدام الشيفرة التالية لاختبار تابعك:

```python
exactum = PaymentTerminal()

card = LunchCard(2)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)

exactum.deposit_money_on_card(card, 100)
print(f"Card balance is {card.balance} euros")

result = exactum.eat_special_lunchcard(card)
print("Payment successful:", result)
print(f"Card balance is {card.balance} euros")

print("Funds available at the terminal:", exactum.funds)
print("Regular lunches sold:", exactum.lunches)
print("Special lunches sold:", exactum.specials)
```


```
Card balance is 2 euros
Payment successful: False
Card balance is 102 euros
Payment successful: True
Card balance is 97.7 euros
Funds available at the terminal: 1100
Regular lunches sold: 0
Special lunches sold: 1
```


## نسخة من الصنف نفسه بوصفها وسيطًا للتابع

فيما يلي نسخة أخرى من الصنف `Person`:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth
```

لنفترض أننا نريد كتابة برنامج يقارن أعمار كائنات من نوع Person. يمكننا كتابة دالة منفصلة لهذا الغرض:

```python
def older_than(person1: Person, person2: Person):
    if person1.year_of_birth < person2.year_of_birth:
        return True
    else:
        return False

muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if older_than(muhammad, pascal):
    print(f"{muhammad.name} is older than {pascal.name}")
else:
    print(f"{muhammad.name} is not older than {pascal.name}")

if older_than(grace, pascal):
    print(f"{grace.name} is older than {pascal.name}")
else:
    print(f"{grace.name} is not older than {pascal.name}")
```


```
Muhammad ibn Musa al-Khwarizmi is older than Blaise Pascal
Grace Hopper is not older than Blaise Pascal
```


إحدى مبادئ البرمجة الموجّهة بالكائنات (object oriented programming) هي تضمّن أي وظيفة تتعامل مع كائنات من نوع معين في تعريف الصنف، بوصفها توابع. وإذًا بدلًا من دالة يمكننا كتابة _تابع_ يتيح لنا مقارنة عمر كائن Person مع كائن Person _آخر_:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # NB: type hints must be enclosed in quotation marks if the parameter
    # is of the same type as the class itself!
    def older_than(self, another: "Person"):
        if self.year_of_birth < another.year_of_birth:
            return True
        else:
            return False
```

هنا يُشار إلى الكائن الذي يُستدعى عليه التابع بـ `self`، بينما كائن Person الآخر هو `another`.

تذكّر أن استدعاء التابع يختلف عن استدعاء الدالة. ويُرفَق التابع بكائن باستخدام الترميز النقطي:

```python
muhammad = Person("Muhammad ibn Musa al-Khwarizmi", 780)
pascal = Person("Blaise Pascal", 1623)
grace = Person("Grace Hopper", 1906)

if muhammad.older_than(pascal):
    print(f"{muhammad.name} is older than {pascal.name}")
else:
    print(f"{muhammad.name} is not older than {pascal.name}")

if grace.older_than(pascal):
    print(f"{grace.name} is older than {pascal.name}")
else:
    print(f"{grace.name} is not older than {pascal.name}")
```

إلى يسار النقطة الكائن نفسه، الذي يُشار إليه بـ `self` داخل تعريف التابع. وفي الأقواس وسيط التابع، أي الكائن الذي يُشار إليه بـ `another`.

مخرجات البرنامج مطابقة تمامًا لمخرجات تنفيذ الدالة أعلاه.

نقطة تجميلية لنُختم بها: بنية `if...else` في التابع `older_than` غير ضرورية في العموم. فالقيمة التي يمثّلها التعبير المنطقي في الشرط هي تمامًا قيمة الصدق التي تُعاد. وبالتالي يمكن تبسيط التابع:

```python
class Person:
    def __init__(self, name: str, year_of_birth: int):
        self.name = name
        self.year_of_birth = year_of_birth

    # NB: type hints must be enclosed in quotation marks if the parameter 
    # is of the same type as the class itself!
    def older_than(self, another: "Person"):
        return self.year_of_birth < another.year_of_birth
```

كما ورد في التعليقات في الأمثلة أعلاه، إذا كان المعامل في تعريف تابع من النوع نفسه للصنف، فلا بدّ من إحاطة تلميح النوع (type hint) بعلامات تنصيص. وحذف علامات التنصيص يُسبّب خطأً، ستراه إذا جرّبت ما يلي:

```python
class Person:
    # ...

    # this would cause an error, as Person must be enclosed in quotation marks
    def older_than(self, another: Person):
        return self.year_of_birth < another.year_of_birth:
```

> **تمرين برمجي: مقارنة العقارات**
>
> تحتوي قاعدة بيانات لوكالة عقارية على سجلات للعقارات المتاحة، مُمثَّلة بكائنات معرّفة بالصنف التالي:

```python
class RealProperty:
    def __init__(self, rooms: int, square_metres: int, price_per_sqm: int):
        self.rooms = rooms
        self.square_metres = square_metres
        self.price_per_sqm = price_per_sqm
```

مهمتك تنفيذ توابع تتيح المقارنة بين العقارات المتاحة.

## هل هو أكبر؟

يُرجى كتابة تابع اسمه `bigger(self, compared_to)` يُرجع `True` إذا كان كائن `RealProperty` نفسه أكبر من الكائن الذي يُقارَن به.

مثال على كيفية عمل الدالة:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.bigger(downtown_two_bedroom))
print(suburbs_three_bedroom.bigger(downtown_two_bedroom))
```


```
False
True
```


## فرق السعر

يُرجى كتابة تابع اسمه `price_difference(self, compared_to)` يُرجع فرق السعر بين كائن `RealProperty` نفسه والكائن الذي يُقارَن به. وفرق السعر هو القيمة المطلقة للفرق بين السعرين الإجماليين للعقارين. والسعر الإجمالي للعقار هو سعر المتر المربّع فيه مضروبًا في عدد أمتاره المربّعة.

مثال على كيفية عمل الدالة:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.price_difference(downtown_two_bedroom))
print(suburbs_three_bedroom.price_difference(downtown_two_bedroom))
```


```
71600
35400
```


## هل هو أغلى ثمنًا؟

يُرجى كتابة تابع اسمه `more_expensive(self, compared_to)` يُرجع `True` إذا كان كائن `RealProperty` نفسه أغلى ثمنًا من الكائن الذي يُقارَن به.

مثال على كيفية عمل الدالة:

```python
central_studio = RealProperty(1, 16, 5500)
downtown_two_bedroom = RealProperty(2, 38, 4200)
suburbs_three_bedroom = RealProperty(3, 78, 2500)

print(central_studio.more_expensive(downtown_two_bedroom))
print(suburbs_three_bedroom.more_expensive(downtown_two_bedroom))
```


```
False
True
```

