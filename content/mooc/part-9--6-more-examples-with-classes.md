---
title: "مزيد من الأمثلة على الأصناف"
lang: ar
source: "https://programming-26.mooc.fi/part-9/6-more-examples-with-classes"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستألف أمثلة إضافية على الأصناف والكائنات
> - ستكون قادرًا على استخدام قيم افتراضية للمعاملات في توابعك


يتكوّن المثال التالي من صنفين. الصنف `Point` يمثّل نقطة في فضاء ثنائي الأبعاد. والصنف `Line` يمثّل مقطعًا بين نقطتين. والشيفرة أدناه تحتوي تعليقات؛ يُرجى قراءة التعليقات لتفهم كيف يعمل هذان الصنفان.

```python
import math

class Point:
    """ The class represents a point in two-dimensional space """

    def __init__(self, x: float, y: float):
        # These attributes are public because any value is acceptable for x and y
        self.x = x
        self.y = y

    # This class method returns a new Point at origo (0, 0)
    # It is possible to return a new instance of the class from within the class
    @classmethod
    def origo(cls):
        return Point(0, 0)

    # This class method creates a new Point based on an existing Point
    # The original Point can be mirrored on either or both of the x and y axes
    # For example, the Point (1, 3) mirrored on the x-axis is (1, -3)
    @classmethod
    def mirrored(cls, point: "Point", mirror_x: bool, mirror_y: bool):
        x = point.x
        y = point.y
        if mirror_x:
            y = -y
        if mirror_y:
            x = -x

        return Point(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"


class Line:
    """ The class represents a line segment in two-dimensional space """

    def __init__(self, beginning: Point, end: Point):
        # These attributes are public because any two Points are acceptable
        self.beginning = beginning
        self.end = end

    # This method uses the Pythagorean theorem to calculate the length of the line segment
    def length(self):
        sum_of_squares = (self.end.x - self.beginning.x) ** 2 + (self.end.y - self.beginning.y) ** 2
        return math.sqrt(sum_of_squares)

    # This method returns the Point in the middle of the line segment
    def centre_point(self):
        centre_x = (self.beginning.x + self.end.x) / 2
        centre_y = (self.beginning.y + self.end.y) / 2
        return Point(centre_x, centre_y)

    def __str__(self):
        return f"{self.beginning} ... {self.end}"
```

```python
point = Point(1,3)
print(point)

origo = Point.origo()
print(origo)

point2 = Point.mirrored(point, True, True)
print(point2)

line = Line(point, point2)
print(line.length())
print(line.centre_point())
print(line)
```


```
(1, 3)
(0, 0)
(-1, -3)
6.324555320336759
(0.0, 0.0)
(1, 3) ... (-1, -3)
```


## القيم الافتراضية للمعاملات

في برمجة Python يمكنك عمومًا تعيين قيمة افتراضية لأي معامل. ويمكن استخدام القيم الافتراضية في كلٍّ من الدوال والتوابع.

إذا كان لمعامل قيمة افتراضية، فلا حاجة إلى إدراج قيمة كوسيط عند استدعاء الدالة. وإذا أُعطي الوسيط، تُهمَل القيمة الافتراضية. وإذا لم يُعطَ، تُستخدم القيمة الافتراضية.

تُستخدم القيم الافتراضية كثيرًا في البانيات. فإذا كان من المتوقع ألّا تكون كل المعلومات متاحة عند إنشاء كائن، فمن الأفضل إدراج قيمة افتراضية في تعريف تابع الباني من إجبار العميل على التعرّض لهذه المسألة. وهذا يسهّل استخدام الصنف من منظور العميل، لكنه يضمن أيضًا تماسك الكائن. فمثلًا، بفضل قيمة افتراضية مُعيَّنة يمكننا أن نكون واثقين من أن القيمة «الفارغة» تكون دائمًا نفسها، ما لم يرغب العميل تزويدها بشيء مختلف. وإذا لم تُحدَّد قيمة افتراضية، فمسؤولية توفير «قيمة فارغة» تقع على العميل. وقد تكون هذه، مثلًا، سلسلة نصية فارغة `""`، أو الكائن الفارغ الخاص `None`، أو السلسلة النصية `"not set"`.

لننظر إلى صنف آخر يمثّل طالبًا. وعند إنشاء كائن `Student` جديد يجب على العميل تزويده باسم ورقم طالب. ورقم الطالب خاص ولا ينبغي تغييره لاحقًا. وبالإضافة إلى ذلك، يمتلك كائن `Student` خصائص لرصيد الدراسة والملاحظات، لهما قيم افتراضية مُعيَّنة في الباني. ويمكن تمرير قيم جديدة كوسيطات إلى الباني، ويمكن أيضًا حذفها لتُستخدم القيم الافتراضية بدلًا منها. يُرجى الاطلاع على التعليقات في الشيفرة لتفهم بدقة ما يفعله كل تابع.

```python
class Student:
    """ This class models a student """

    def __init__(self, name: str, student_number: str, credits: int = 0, notes: str = ""):
        # calling the setter method for the name attribute
        self.name = name

        if len(student_number) < 5:
            raise ValueError("A student number should have at least five characters")

        self.__student_number = student_number

        # calling the setter method for the credits attribute
        self.credits = credits

        self.__notes = notes

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        if name != "":
            self.__name = name
        else:
            raise ValueError("The name cannot be an empty string")

    @property
    def student_number(self):
        return self.__student_number

    @property
    def credits(self):
        return self.__credits

    @credits.setter
    def credits(self, op):
        if op >= 0:
            self.__credits = op
        else:
            raise ValueError("The number of study credits cannot be below zero")

    @property
    def notes(self):
        return self.__notes

    @notes.setter
    def notes(self, notes):
        self.__notes = notes

    def summary(self):
        print(f"Student {self.__name} ({self.student_number}):")
        print(f"- credits: {self.__credits}")
        print(f"- notes: {self.notes}")
```

```python
# Passing only the name and the student number as arguments to the constructor
student1 = Student("Sally Student", "12345")
student1.summary()

# Passing the name, the student number and the number of study credits
student2 = Student("Sassy Student", "54321", 25)
student2.summary()

# Passing values for all the parameters
student3 = Student("Saul Student", "99999", 140, "extra time in exam")
student3.summary()

# Passing a value for notes, but not for study credits
# NB: the parameter must be named now that the arguments are not in order
student4 = Student("Sandy Student", "98765", notes="absent in academic year 20-21")
student4.summary()
```


```
Student Sally Student (12345):
- credits: 0
- notes:
Student Sassy Student (54321):
- credits: 25
- notes:
Student Saul Student (99999):
- credits: 140
- notes: extra time in exam
Student Sandy Student (98765):
- credits: 0
- notes: absent in academic year 20-21
```


لاحظ ألّا يوجد تابع كتابة للخاصية `student_number` لأن رقم الطالب لا يُفترض أن يتغيّر.

وهناك عثرة جديرة بالاهتمام عند استخدام القيم الافتراضية للمعاملات. والمثال التالي الذي ينمذج نوعًا آخر من الطلاب سيُضيء على هذا الأمر ضوءًا أوضح:

```python
class Student:
    def __init__(self, name, completed_courses=[]):
        self.name = name
        self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```


```
['ItP', 'ACiP']
['ItP', 'ACiP']
```


إضافة المساقات المكتملة إلى قائمة Sally تضيف تلك المساقات أيضًا إلى قائمة Sassy. وفي الحقيقة، هاتان القائمتان هما القائمة نفسها تمامًا، لأن Python تُعيد استخدام المرجع المخزَّن في القيمة الافتراضية. وإنشاء الكائنين الجديدين من `Student` في المثال أعلاه يعادل ما يلي:

```python
courses = []
student1 = Student("Sally Student", courses)
student2 = Student("Sassy Student", courses)
```

لا ينبغي أبدًا أن تكون القيم الافتراضية للمعاملات نسخًا من هياكل بيانات أكثر تعقيدًا وقابلة للتغيير، مثل القوائم. ويمكن الالتفاف على هذه المشكلة بإجراء التغييرات التالية على باني الصنف `Student`:

```python
class Student:
    def __init__(self, name, completed_courses=None):
        self.name = name
        if completed_courses is None:
            self.completed_courses = []
        else:
            self.completed_courses = completed_courses

    def add_course(self, course):
        self.completed_courses.append(course)
```

```python
student1 = Student("Sally Student")
student2 = Student("Sassy Student")

student1.add_course("ItP")
student1.add_course("ACiP")

print(student1.completed_courses)
print(student2.completed_courses)
```


```
['ItP', 'ACiP']
[]
```

## الخاتمة الكبرى

وإذا كان التمرين التالي يختم هذا الجزء من المادّة، فإن التقنيات اللازمة لحلّه كانت كلها مُتضمَّنة سابقًا في القسم المعنون [الكائنات كخصائص](/book/mooc/part-9/2-objects-as-attributes). وبالتحديد، لا يُطلب منك في هذا التمرين استخدام زينة `@property` أو القيم الافتراضية للمعاملات. وهذا التمرين مشابه جدًّا للتمرينَين [صندوق الهدايا](/book/mooc/part-9/2-objects-as-attributes#programming-exercise-a-box-of-presents) و[أقصر شخص في الغرفة](/book/mooc/part-9/2-objects-as-attributes#programming-exercise-the-shortest-person-in-the-room).


#### معلومات هامة بخصوص التمرين التالي
يُرجى ملاحظة أن هناك مشكلة ناجمة عن تحديث في Python تتعارض مع المكتبة المدمجة واسم الملف الأصلي لهذا التمرين. وإذا واجهت أي مشكلة، فنوصي بإعادة تنزيل مجلد التمرين. وبمجرد الحصول على ملفات الاختبار المحلية الجديدة، يمكنك استخدام `code.py` أو `code_1.py` كاسم للملف. وعند استخدام Visual Studio Code قد تتلقى إشعارات عن مشكلات في ملف الاختبار. غير أن هذه الإشعارات يمكن تجاهلها بأمان، لأنها ناتجة عن عجز الاختبار عن الاستيراد من ملفَي `code.py` أو `code_1.py`.

> **تمرين برمجي: العنصر والحقيبة وعنبر الشحن**
>
> في هذه السلسلة من التمارين ستنشئ الأصناف `Item` و`Suitcase` و`Cargo Hold`، التي ستتيح لك مزيدًا من التدريب على العمل بكائنات تحتوي مراجع إلى كائنات أخرى.

## العنصر

يُرجى إنشاء صنف اسمه `Item` يُستخدم لإنشاء عناصر من أنواع مختلفة. ولكل عنصر اسم ووزن (بالكيلوغرام).

يمكنك استخدام الشيفرة التالية لاختبار صنفك:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)

print("Name of the book:", book.name())
print("Weight of the book:", book.weight())

print("Book:", book)
print("Phone:", phone)
```

ينبغي لبرنامجك أن يطبع ما يلي:


```
Name of the book: ABC Book
Weight of the book: 2
Book: ABC Book (2 kg)
Phone: Nokia 3210 (1 kg)
```


وينبغي أن يوفّر الصنف `Item` التابعين `weight` و`name`، اللذين يُرجعان القيمتين المخزَّنتين في هاتين الخصائص.

وينبغي تغليف الاسم والوزن داخل الصنف. وينبغي ألّا تعمل الشيفرة التالية:

```python
book = Item("ABC Book", 2)
book.weight = 10
```

## الحقيبة

يُرجى كتابة صنف اسمه `Suitcase`. ينبغي أن تتمكن من وضع العناصر داخل الحقيبة. وللحقيبة أيضًا وزن أقصى مجموع للعناصر المخزَّنة فيها.

وينبغي أن يحوي صنفك الأعضاء التالية:

- بانيًا يأخذ الوزن الأقصى كوسيط
- تابعًا اسمه `add_item` يضيف العنصر المُعطى كوسيط إلى الحقيبة. ولا يُرجع هذا التابع أي قيمة
- تابع `__str__` يُرجع سلسلة نصية بصيغة "x items (y kg)"

وينبغي للصنف أن يضمن ألّا يتجاوز الوزن المجموع للعناصر المخزَّنة في أي `Suitcase` الوزن الأقصى المُعيَّن لتلك النسخة. وإذا كان من المفروض أن يُتجاوز الوزن الأقصى عند استدعاء التابع `add_item`، فلا يُضَف العنصر الجديد إلى الحقيبة.

وينبغي أن يعمل صنفك كالتالي:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(5)
print(suitcase)

suitcase.add_item(book)
print(suitcase)

suitcase.add_item(phone)
print(suitcase)

suitcase.add_item(brick)
print(suitcase)
```

يجب أن يؤدي تنفيذ ما سبق إلى طباعة ما يلي:


```
0 items (0 kg)
1 items (2 kg)
2 items (3 kg)
2 items (3 kg)
```


## انتبه إلى لغتك

العبارة "1 items" ليست سليمة نحويًّا على نحو يُذكر. وبدلًا منها، ينبغي أن تقول "1 item". يُرجى إجراء التغييرات المطلوبة في تابعك `__str__`.

وينبغي للمثال السابق أن يطبع الآن ما يلي:


```
0 items (0 kg)
1 item (2 kg)
2 items (3 kg)
2 items (3 kg)
```


## كل العناصر

يُرجى إضافة التوابع التالية إلى تعريف صنفك `Suitcase`:

- `print_items` يطبع كل العناصر المخزَّنة في الحقيبة
- `weight` يُرجع عددًا صحيحًا يمثّل الوزن المجموع لكل العناصر المخزَّنة في الحقيبة

وينبغي أن يعمل صنفك الآن مع البرنامج التالي:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

print("The suitcase contains the following items:")
suitcase.print_items()
combined_weight = suitcase.weight()
print(f"Combined weight: {combined_weight} kg")
```

ينبغي أن يؤدي تنفيذ البرنامج أعلاه إلى طباعة ما يلي:


```
The suitcase contains the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)
Combined weight: 7 kg
```


إذا نفّذت صنفك `Suitcase` بأكثر من متغيّرَي نسخة، يُرجى إجراء التغييرات المطلوبة بحيث تكون لكل نسخة خاصيتان بياناتيان فقط: الوزن الأقصى وقائمة العناصر الموجودة فيها.

## العنصر الأثقل

يُرجى إضافة تابع جديد إلى صنفك `Suitcase`: ينبغي أن يُرجع التابع `heaviest_item` العنصر `Item` الأثقل. وإذا كان هناك عنصران أو أكثر بالوزن الأثقل نفسه، فيمكن للتابع أن يُرجع أيًّا منها. وينبغي للتابع أن يُرجع مرجعًا إلى كائن. وإذا كانت الحقيبة فارغة، فيجب على التابع أن يُرجع `None`.

وينبغي أن يعمل صنفك الآن مع البرنامج التالي:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

suitcase = Suitcase(10)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

heaviest = suitcase.heaviest_item()
print(f"The heaviest item: {heaviest}")
```

ينبغي أن يؤدي تنفيذ البرنامج أعلاه إلى طباعة ما يلي:


```
The heaviest item: Brick (4 kg)
```


## صندوق الشحن

يُرجى كتابة صنف اسمه `CargoHold` بالأعضاء التالية:

- بانيًا يأخذ الوزن الأقصى كوسيط
- تابعًا اسمه `add_suitcase` يضيف الحقيبة المُعطاة كوسيط إلى صندوق الشحن
- تابع `__str__` يُرجع سلسلة نصية بصيغة "x suitcases, space for y kg"

وينبغي للصنف أن يضمن ألّا يتجاوز الوزن المجموع للعناصر المخزَّنة في أي `CargoHold` الوزن الأقصى المُعيَّن لتلك النسخة. وإذا كان من المفروض أن يُتجاوز الوزن الأقصى عند استدعاء التابع `add_suitcase`، فلا تُضَف الحقيبة الجديدة إلى صندوق الشحن.

وينبغي أن يعمل صنفك الآن مع البرنامج التالي:

```python
cargo_hold = CargoHold(1000)
print(cargo_hold)

book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold.add_suitcase(adas_suitcase)
print(cargo_hold)

cargo_hold.add_suitcase(peters_suitcase)
print(cargo_hold)
```


```
0 suitcases, space for 1000 kg
1 suitcase, space for 997 kg
2 suitcases, space for 993 kg
```


## محتويات صندوق الشحن

يُرجى إضافة تابع اسمه `print_items` إلى صنفك `CargoHold`. وينبغي أن يطبع كل العناصر في كل الحقائب الموجودة داخل صندوق الشحن.

وينبغي أن يعمل صنفك الآن مع البرنامج التالي:

```python
book = Item("ABC Book", 2)
phone = Item("Nokia 3210", 1)
brick = Item("Brick", 4)

adas_suitcase = Suitcase(10)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(10)
peters_suitcase.add_item(brick)

cargo_hold = CargoHold(1000)
cargo_hold.add_suitcase(adas_suitcase)
cargo_hold.add_suitcase(peters_suitcase)

print("The suitcases in the cargo hold contain the following items:")
cargo_hold.print_items()
```

ينبغي أن يؤدي تنفيذ البرنامج أعلاه إلى طباعة ما يلي:


```
The suitcases in the cargo hold contain the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)
```


يُرجى الإجابة على استبيان سريع حول مادّات هذا الأسبوع.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 42accf05-8328-5277-bf26-259a59852362)
