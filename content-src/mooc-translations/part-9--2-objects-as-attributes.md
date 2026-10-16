---
title: "الكائنات كخصائص"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف كيفية استخدام الكائنات كخصائص في كائنات أخرى
> - ستكون على دراية بالكلمة المفتاحية `None`


لقد رأينا سابقًا أمثلة على أصناف تحتوي على قوائم كخصائص. وبما أنه لا يوجد ما يمنعنا من تضمين كائنات قابلة للتغيير كخصائص في أصنافنا، فمن الحسن كذلك استخدام نماذج من أصنافنا الخاصة كخصائص في أصناف أخرى عرّفناها بأنفسنا. وفي الأمثلة التالية سنعرّف الأصناف `Course` و`Student` و`CompletedCourse`. ويستعمل المقرر المُنجَز الصنفين الأوّلين. تعريفات الأصناف قصيرة جدًا وبسيطة حتى نركّز بشكل أفضل على تقنية استخدام نماذج أصنافنا الخاصة كخصائص.

نفترض أن كل صنف معرّف في ملف مستقل.

أولًا نعرّف الصنف `Course` في ملف يسمى `course.py`:

```python
class Course:
    def __init__(self, name: str, code: str, credits: int):
        self.name = name
        self.code = code
        self.credits = credits
```

ثم الصنف `Student` في ملف يسمى `student.py`:

```python
class Student:
    def __init__(self, name: str, student_number: str, credits: int):
        self.name = name
        self.student_number = student_number
        self.credits = credits
```

أخيرًا، يُعرَّف الصنف `CompletedCourse` في ملف يسمى `completedcourse.py`. وبما أنه يستخدم الصنفين الآخرين، فإنه يجب استيرادهما قبل أن يمكن استخدامهما:

```python
from course import Course
from student import Student

class CompletedCourse:
    def __init__(self, student: Student, course: Course, grade: int):
        self.student = student
        self.course = course
        self.grade = grade
```

إليكم مثال على دالة رئيسية تضيف بعض المقررات المنجزة إلى قائمة:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# Create a list of students
students = []
students.append(Student("Ollie", "1234", 10))
students.append(Student("Peter", "3210", 23))
students.append(Student("Lena", "9999", 43))
students.append(Student("Tina", "3333", 8))

# Create a course named Introduction to Programming
itp = Course("Introduction to Programming", "itp1", 5)

# Add completed courses for each student, with grade 3 for all
completed = []
for student in students:
    completed.append(CompletedCourse(student, itp, 3))

# Print out the name of the student for each completed course
for course in completed:
    print(course.student.name)
```


```
Ollie
Peter
Lena
Tina
```


ما الذي يحدث بالضبط مع كل تلك النقاط في السطر `print(course.student.name)`؟

* `course` نموذج من الصنف `CompletedCourse`
* `student` يشير إلى خاصية من خصائص الكائن `CompletedCourse`، وهو كائن من النوع `Student`
* تحتوي الخاصية `name` في الكائن `Student` على اسم الطالب

## متى يكون الاستيراد ضروريًا؟

في الأمثلة السابقة ظهرت جملة `import` عدة مرات:

```python
from completedcourse import CompletedCourse
from course import Course
from student import Student

# rest of the main function
```

جملة `import` لا تكون ضرورية إلا عند استخدام شيفرة معرّفة في مكان ما خارج الملف الحالي (أو جلسة مفسّر Python). ويشمل ذلك الحالات التي نريد فيها استخدام شيء معرّف في مكتبة Python القياسية. فمثلًا، تحتوي الوحدة `math` على بعض العمليات الرياضية:

```python
import math

x = 10
print(f"the square root of {x} is {math.sqrt(x)}")
```

في المثال السابق افترضنا أن الأصناف الثلاثة معرّفة كلٌّ منها في ملف مستقل، وأن الدالة الرئيسية تُشغَّل من ملف آخر. ولهذا كانت جمل `import` ضرورية.

إذا كُتبت كل شيفرة البرنامج في الملف نفسه، كما تُنصحك به معظم تمارين هذه الدورة، **فلن تحتاج** إلى جمل `import` لاستخدام الأصناف التي عرّفتها.

إذا وجدتَ نفسك تكتب شيئًا على النحو التالي

```python
from person import Person

# more code goes here
```

فمن المحتمل أن تكون قد أخطأت في شيء ما. وإذا كنت بحاجة إلى تذكير، فقد وردت جملة `import` لأول مرة في [الجزء 7](/part-7/1-modules) من مادة هذه الدورة.

> **تمرين برمجي: الحيوانات الأليفة**
>
> يحتوي قالب التمرين على مخطط صنفين: `Person` و`Pet`. لكل شخص حيوان أليف واحد. يُرجى تعديل التابع `__str__` في الصنف `Person` بحيث يطبع أيضًا معلومات عن الحيوان الأليف للشخص كما في المثال أدناه.

يجب أن تتبع السلسلة النصية التي يُرجعها التابع _التنسيق المحدّد أدناه بالضبط_.

```python
hulda = Pet("Hulda", "mixed-breed dog")
levi = Person("Levi", hulda)

print(levi)
```


```
Levi, whose pal is Hulda, a mixed-breed dog
```


**ملاحظة:** جميع تعريفات الأصناف في ملف نصي واحد. لا ينبغي أن تحتاج إلى عمل `import` لأي شيء.


## قائمة من الكائنات كخاصية لكائن

في الأمثلة السابقة استخدمنا نماذج مفردة من أصناف أخرى كخصائص: فالشخص يملك حيوانًا أليفًا واحدًا كخاصية، والمقرر المُنجَز يملك طالبًا واحدًا ومقررًا واحدًا كخصائصه.

في البرمجة الكائنية كثيرًا ما نريد أن يكون لدينا _مجموعة_ من الكائنات كخاصية. فمثلًا، العلاقة بين فريق رياضي ولاعبيه تتبع هذا النمط:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def summary(self):
        goals = []
        for player in self.players:
            goals.append(player.goals)
        print("Team:", self.name)
        print("Players:", len(self.players))
        print("Goals scored by each player:", goals)
```

مثال على صنفنا أثناء العمل:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Emily", 22))
ca.add_player(Player("Andy", 1))
ca.summary()
```


```
Team: Campus Allstars
Players: 3
Goals scored by each player: [10, 22, 1]
```


> **تمرين برمجي: صندوق هدايا**
>
> في هذا التمرين ستتدرّب على تغليف الهدايا. ستكتب صنفين: `Present` و`Box`. الهدية لها اسم ووزن، والصندوق يحتوي على هدايا.

## صنف Present

يُرجى تعريف الصنف `Present` الذي يمكن استخدامه للتمثيل بأنواع مختلفة من الهدايا. يجب أن يحتوي تعريف الصنف على خاصية لاسم الهدية وخاصية لوزنها (بالكيلوغرام). وينبغي أن تعمل نماذج الصنف كما يلي:

```python
book = Present("ABC Book", 2)

print("The name of the present:", book.name)
print("The weight of the present:", book.weight)
print("Present:", book)
```

ينبغي أن يطبع هذا ما يلي


```
The name of the present: ABC Book
The weight of the present: 2
Present: ABC Book (2 kg)
```


## صنف Box

يُرجى تعريف الصنف `Box`. ينبغي أن تتمكن من إضافة هدايا إلى الصندوق، وأن يتعقّب الصندوق الوزن الإجمالي للهدايا الموجودة داخله. يجب أن يحتوي تعريف الصنف على التابعين التاليين:

- `add_present(self, present: Present)` الذي يضيف الهدية المُعطاة كوساط إلى الصندوق. لا يُرجع هذا التابع قيمة.
- `total_weight(self)` الذي يُرجع الوزن الإجمالي للهدايا في الصندوق.

يمكنك استخدام الشيفرة التالية لاختبار صنفك:

```python
book = Present("ABC Book", 2)

box = Box()
box.add_present(book)
print(box.total_weight())

cd = Present("Pink Floyd: Dark Side of the Moon", 1)
box.add_present(cd)
print(box.total_weight())
```


```
2
3
```


## `None`: مرجع إلى لا شيء

في برمجة Python تشير كل المتغيّرات المُهيّأة إلى كائن. غير أنه توجد بالضرورة حالات نحتاج فيها إلى الإشارة إلى شيء غير موجود، دون أن نُسبّب أخطاء. والكلمة المفتاحية `None` تمثّل تمامًا كائنًا "فارغًا" كهذا.

معتمدًا على مثال الصنفين Team وPlayer أعلاه، لنفترض أننا نريد إضافة تابع للبحث عن لاعبي الفريق باسم اللاعب. وإذا لم يُعثر على أي لاعب بهذا الاسم، فقد يكون من المعقول إرجاع `None`:

```python
class Player:
    def __init__(self, name: str, goals: int):
        self.name = name
        self.goals = goals

    def __str__(self):
        return f"{self.name} ({self.goals} goals)"

class Team:
    def __init__(self, name: str):
        self.name = name
        self.players = []

    def add_player(self, player: Player):
        self.players.append(player)

    def find_player(self, name: str):
        for player in self.players:
            if player.name == name:
                return player
        return None
```

لنختبر دالتنا:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))
ca.add_player(Player("Amily", 22))
ca.add_player(Player("Andy", 1))

player1 = ca.find_player("Andy")
print(player1)
player2 = ca.find_player("Charlie")
print(player2)
```


```
Andy (1 goals)
None
```


لكن كُن حذرًا مع `None`. فقد يسبّب في بعض الأحيان متاعب أكثر مما يحلّها. ومن الأخطاء البرمجية الشائعة محاولة الوصول إلى تابع أو خاصية من خلال مرجع تُقيَّم قيمته إلى `None`:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
print(f"Goals by Charlie: {player.goals}")
```

سيؤدي تنفيذ ما سبق إلى خطأ:

```
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'NoneType' object has no attribute 'goals'
```


من الجيد التحقق من `None` قبل محاولة الوصول إلى أي خصائص أو توابع لقيم الإرجاع:

```python
ca = Team("Campus Allstars")
ca.add_player(Player("Eric", 10))

player = ca.find_player("Charlie")
if player is not None:
    print(f"Goals by Charlie: {player.goals}")
else:
    print(f"Charlie doesn't play in Campus Allstars :(")
```


```
Charlie doesn't play in Campus Allstars :(
```


> **تمرين برمجي: أقصر شخص في الغرفة**
>
> يحتوي قالب التمرين على الصنف `Person`. للشخص اسم وطول. في هذا التمرين ستنفّذ الصنف `Room`. يمكنك إضافة أي عدد من الأشخاص إلى الغرفة، ويمكنك أيضًا البحث عن أقصر شخص في الغرفة وإزالته.

## صنف Room

يُرجى تعريف الصنف `Room`. ينبغي أن يكون لديه قائمة من الأشخاص كخاصية، وأن يحتوي أيضًا على التابعين التاليين:

- `add(person: Person)` يضيف الشخص المُعطى كوساط إلى الغرفة.
- `is_empty()` يُرجع `True` أو `False` بحسب ما إذا كانت الغرفة فارغة.
- `print_contents()` يطبع محتويات قائمة الأشخاص في الغرفة.

يُرجى الاطلاع على مثال الاستخدام التالي:

```python
room = Room()
print("Is the room empty?", room.is_empty())
room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Ally", 166))
room.add(Person("Nina", 162))
room.add(Person("Dorothy", 155))
print("Is the room empty?", room.is_empty())
room.print_contents()
```


```
Is the room empty? True
Is the room empty? False
There are 5 persons in the room, and their combined height is 838 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
Nina (162 cm)
Dorothy (155 cm)
```


## أقصر شخص

يُرجى تعريف التابع `shortest()` داخل تعريف الصنف `Room`. يجب أن يُرجع التابع أقصر شخص في الغرفة التي استُدعي عليها. وإذا كانت الغرفة فارغة، يجب أن يُرجع `None`. كما يجب ألّا يُزيل التابع الشخص من الغرفة.

```python
room = Room()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))

print()

print("Is the room empty?", room.is_empty())
print("Shortest:", room.shortest())

print()

room.print_contents()
```


```
Is the room empty? True
Shortest: None

Is the room empty? False
Shortest: Nina

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)
```


## إزالة شخص من الغرفة

يُرجى تعريف التابع `remove_shortest()` داخل تعريف الصنف `Room`. يجب أن يزيل التابع أقصر كائن `Person` من الغرفة وأن يُرجع المرجع إلى الكائن. وإذا كانت الغرفة فارغة، يجب أن يُرجع `None`.

```python
room = Room()

room.add(Person("Lea", 183))
room.add(Person("Kenya", 172))
room.add(Person("Nina", 162))
room.add(Person("Ally", 166))
room.print_contents()

print()

removed = room.remove_shortest()
print(f"Removed from room: {removed.name}")

print()

room.print_contents()
```


```
There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

Removed from room: Nina

There are 3 persons in the room, and their combined height is 521 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
```


**تلميح**: في [الجزء 4](/part-4/3-lists#removing-items-from-a-list) ستجد تعليمات لإزالة عناصر من قائمة.

**تلميح 2**: من الممكن دائمًا استدعاء تابع آخر من الصنف نفسه من داخل تابع. والشيفرة التالية ينبغي أن تعمل كما ينبغي:

```python
class Room:
    # ...
    def shortest(self):
        # your code goes here

    def remove_shortest(self):
        shortest_person = self.shortest()
        # ...
```
