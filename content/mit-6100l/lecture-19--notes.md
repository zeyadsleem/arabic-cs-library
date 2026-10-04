---
book: mit-6100l
chapter: lecture-19
slug: notes
lang: ar
title: "المحاضرة 19: الوراثة (Inheritance)"
---

# المحاضرة 19: الوراثة (Inheritance)

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-19-inheritance/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19_code_py/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (40 شريحة). المواضع التي يعرض فيها النص المستخرَج مخططًا هرميًا (Animal ← Person ← Student، وAnimal ← Rabbit) نُقلت إلى قوائم نصية. الشيفرة وعناوين وثائق الأصناف (docstrings) تُركت بالإنجليزية كما هي. الصور استُبعدت لأن تنويه حقوق النشر في ملف MIT نفسه يذكّر بأن مصادرها غير معروفة وأنها مستثناة من رخصة CC؛ انظر الشريحتين 2 و17.

## الشريحة 1: عنوان المحاضرة

- INHERITANCE
- (download slides and .py files to follow along)
- 6.100L Lecture 19 — Ana Bell

## الشريحة 2: لماذا نستخدم البرمجة كائنية التوجه (OOP) وأصناف الكائنات؟

- نحاكي الحياة الواقعية
- نجمّع كائنات مختلفة تنتمي إلى النوع نفسه

> **ملاحظة المترجم:** تحتوي هذه الشريحة على صور لمصادرها غير معروفة، وهي مستثناة من رخصة CC حسب تنويه حقوق النشر على شريحة MIT نفسها:
> "Images © sources unknown. All rights reserved. This content is excluded from our Creative Commons license."
> لذلك لم تُنشر الصور، ونُقلت قائمة النقاط النصية فقط. للمزيد: <https://ocw.mit.edu/help/faq-fair-use/>

## الشريحة 3: لماذا نستخدم البرمجة كائنية التوجه (OOP) وأصناف الكائنات؟ (تكرار)

- نحاكي الحياة الواقعية
- نجمّع كائنات مختلفة تنتمي إلى النوع نفسه

> **ملاحظة المترجم:** الشريحة نفسها بالصور ذات المصادر غير المعروفة، وهي مستثناة من رخصة CC كما في الشريحة السابقة. لم تُنشر الصور.

## الشريحة 4: مجموعات الكائنات لها سمات (مراجعة)

- **سمات بيانات (Data attributes)**
  - كيف يمكن أن تمثّل كائنك ببيانات؟
  - ما هو الكائن:
    - لإحداثيَّي (coordinate): قيمتَي `x` و`y`
    - لحيوان (animal): العمر (age)
- **سمات إجرائية (Procedural attributes)** — أي السلوك أو العمليات أو الدوال (methods):
  - كيف يمكن أن يتفاعل أحدهم مع الكائن؟
  - ماذا يفعل:
    - لإحداثيَّين: إيجاد المسافة بين إحداثيين
    - لحيوان: طباعة كم مضى على ولادته

## الشريحة 5: كيف تُعرِّف صنفًا (مراجعة)

```python
class Animal(object):
    def __init__(self, age):
        self.age = age
        self.name = None

myanimal = Animal(3)
```

## الشريحة 6: دوال الجلب (Getters) ودوال التعيين (Setters)

```python
class Animal(object):
    def __init__(self, age):
        self.age = age
        self.name = None

    def __str__(self):
        return "animal:"+str(self.name)+":"+str(self.age)
```

- يجب استخدام دوال الجلب ودوال التعيين خارج الصنف للوصول إلى سمات البيانات

## الشريحة 7: دوال الجلب ودوال التعيين (تتمة)

```python
class Animal(object):
    def __init__(self, age):
        self.age = age
        self.name = None

    def __str__(self):
        return "animal:"+str(self.name)+":"+str(self.age)

    def get_age(self):
        return self.age

    def get_name(self):
        return self.name

    def set_age(self, newage):
        self.age = newage

    def set_name(self, newname=""):
        self.name = newname
```

- يجب استخدام دوال الجلب ودوال التعيين خارج الصنف للوصول إلى سمات البيانات

## الشريحة 8: النسخة (instance) وصيغة النقطة (مراجعة)

- إنشاء نسخة (instantiation) يُنشئ نسخة من كائن:

```python
a = Animal(3)
```

- تُستخدم صيغة النقطة للوصول إلى السمات (بيانات ودوال)، مع أنه الأفضل استخدام دوال الجلب ودوال التعيين للوصول إلى سمات البيانات:

```python
a.age
a.get_age()
```

## الشريحة 9: إخفاء المعلومات (Information Hiding)

- قد يغيّر كاتب تعريف الصنف أسماء متغيّرات سمات البيانات:

```python
class Animal(object):
    def __init__(self, age):
        self.years = age

    def get_age(self):
        return self.years
```

- إذا كنت تصل إلى سمات البيانات خارج الصنف وتغيّر تعريف الصنف، فقد تحصل على أخطاء
- خارج الصنف استخدم دوال الجلب ودوال التعيين بدلًا من ذلك
- استخدم `a.get_age()` **وليس** `a.age`
  - أسلوب جيد
  - شيفرة سهلة الصيانة
  - يمنع الأخطاء

## الشريحة 10: تغيير التمثيل الداخلي

```python
class Animal(object):
    def __init__(self, age):
        self.years = age
        self.name = None

    def __str__(self):
        return "animal:"+str(self.name)+":"+str(self.age)

    def get_age(self):
        return self.years

    def set_age(self, newage):
        self.years = newage

a.get_age()   # works
a.age         # error
```

- يجب استخدام دوال الجلب ودوال التعيين خارج الصنف للوصول إلى سمات البيانات

> **ملاحظة المترجم:** السطر `return "animal:"+str(self.name)+":"+str(self.age)` في `__str__` هو منقول حرفيًّا من الملف الأصلي، وهو يُشير إلى `self.age` رغم إعادة تسمية السمة إلى `years`. هذا تعارض موجود في مادة MIT نفسها، ونُقل كما هو دون تصحيح؛ أي أن `__str__` في هذه النسخة يرفع `AttributeError`. (انظر exercise 19 في ملف الشيفرة.)

## الشريحة 11: بايثون ليست متقنة في إخفاء المعلومات

- تتيح لك الوصول إلى البيانات من خارج تعريف الصنف:

```python
print(a.age)
```

- تتيح لك الكتابة في البيانات من خارج تعريف الصنف:

```python
a.age = 'infinite'
```

- تتيح لك إنشاء سمات بيانات لنسخة من خارج تعريف الصنف:

```python
a.size = "tiny"
```

- ليس من الأسلوب الجيد أن تفعل أيًّا من هذه!

## الشريحة 12: استخدام صنفنا الجديد

```python
def animal_dict(L):
    """ L is a list
    Returns a dict, d, mappping an int to an Animal object.
    A key in d is all non-negative ints, n, in L. A value
    corresponding to a key is an Animal object with n as its age. """
    d = {}
    for n in L:
        if type(n) == int and n >= 0:
            d[n] = Animal(n)
    return d

L = [2,5,'a',-5,0]
```

## الشريحة 13: استخدام صنفنا الجديد (تتمة)

- بايثون لا تعرف كيف تنادي `print` على نحو استدعاء ذاتي (recursively)

```python
def animal_dict(L):
    """ L is a list
    Returns a dict, d, mappping an int to an Animal object.
    A key in d is all non-negative ints n L. A value corresponding
    to a key is an Animal object with n as its age. """
    d = {}
    for n in L:
        if type(n) == int and n >= 0:
            d[n] = Animal(n)
    return d

L = [2,5,'a',-5,0]
animals = animal_dict(L)
print(animals)
```

> **ملاحظة المترجم:** لتنسيق النص المستخرَج، ظهر في وثيق الصنف في هذه الشريحة «A key in d is all non-negative ints n L» بينما في الشريحة السابقة «in L.» — النقص الأول خطأ في الأصل المطبوع، وقد نُقل كما هو.

## الشريحة 14: استخدام صنفنا الجديد (تتمة)

```python
def animal_dict(L):
    """ L is a list
    Returns a dict, d, mappping an int to an Animal object.
    A key in d is all non-negative ints n L. A value corresponding
    to a key is an Animal object with n as its age. """
    d = {}
    for n in L:
        if type(n) == int and n >= 0:
            d[n] = Animal(n)
    return d

L = [2,5,'a',-5,0]
animals = animal_dict(L)
for n,a in animals.items():
    print(f'key {n} with val {a}')
```

## الشريحة 15: جرّب بنفسك!

- اكتب دالة تفي بهذه المواصفة

```python
def make_animals(L1, L2):
    """ L1 is a list of ints and L2 is a list of str
    L1 and L2 have the same length

    Creates a list of Animals the same length as L1 and L2.
    An animal object at index i has the age and name

    corresponding to the same index in L1 and L2, respectively. """
```

للاستخدام:

```python
#For example:
L1 = [2,5,1]
L2 = ["blobfish", "crazyant", "parafox"]
animals = make_animals(L1, L2)
print(animals)
for i in animals:
    print(i)
```

- لاحظ أن هذا يطبع قائمة من كائنات الحيوان (animal objects)
- هذه الحلقة تطبع الحيوانات منفردة

## الشريحة 16: الفكرة الكبرى (BIG IDEA)

- الوصول إلى سمات البيانات (الأشياء المعرَّفة بـ `self.xxx`) **عن طريق الدوال** — هذا أسلوب أفضل.

## الشريحة 17: التسلسلات الهرمية (Hierarchies)

> **ملاحظة المترجم:** هذه الشريحة الخالصة رسم لمخطط هرمي، والمحتوى المرئي منها صور لمصادرها غير معروفة وهي مستثناة من رخصة CC حسب تنويه حقوق النشر:
> "Images © sources unknown. All rights reserved. This content is excluded from our Creative Commons license."
> لذلك لم تُنشر الصور، ولا يمكنني وصف المخطط المرئي. المحتويات النصية للشرائح المجاورة (18) تعطي التسلسل الهرمي نفسه: `Animal` ← `Person` ← `Student`، و`Animal` ← `Cat`، و`Animal` ← `Rabbit`.

## الشريحة 18: التسلسلات الهرمية

- **صنف الأب (Parent class)** — أي الصنف الأعلى (superclass)
- **صنف الابن (Child class)** — أي الصنف الأدنى (subclass)
  - يرث كل البيانات والسلوكيات من صنف الأب
  - يضيف معلومات أكثر
  - يضيف سلوكيات أكثر
  - يتجاوز (override) سلوكًا

المخطط الهرمي كما يظهر في النص المستخرَج:

- `Animal`
- `Person` — ابن `Animal`
- `Student` — ابن `Person`
- `Cat` — ابن `Animal`
- `Rabbit` — ابن `Animal`

## الشريحة 19: الوراثة: صنف الأب

```python
class Animal(object):
    def __init__(self, age):
        self.age = age
        self.name = None

    def get_age(self):
        return self.age

    def get_name(self):
        return self.name

    def set_age(self, newage):
        self.age = newage

    def set_name(self, newname=""):
        self.name = newname

    def __str__(self):
        return "animal:"+str(self.name)+":"+str(self.age)
```

## الشريحة 20: الصنف الابن `Cat`

> **ملاحظة المترجم:** نص هذه الشريحة المستخرَج هو العنوان فقط: "SUBCLASS CAT". الكود المعروض على الشريحة (تعريف `class Cat(Animal)` مع `speak` و`__str__`) يظهر كاملًا على الشريحة التالية، وكُتب هنا إحالةً إليها.

## الشريحة 21: الوراثة: الصنف الابن

```python
class Cat(Animal):
    def speak(self):
        print("meow")

    def __str__(self):
        return "cat:"+str(self.name)+":"+str(self.age)
```

- نضيف وظيفة جديدة عبر `speak()`
- يمكن استدعاء نسخة من نوع `Cat` بالدوال الجديدة
- نسخة من نوع `Animal` ترفع خطأ إذا استُدعيت بالدالة الجديدة في `Cat`
- `__init__` ليست مفقودة، بل يستخدم نسخة `Animal`

## الشريحة 22: أي دالة تُستخدم؟

- يمكن أن يحتوي الصنف الابن على دوال لها نفس اسم دوال الصنف الأعلى
- لنسخة من صنف ما، ابحث عن اسم الدالة في تعريف الصنف الحالي
- إذا لم يُعثر عليه، ابحث عن اسم الدالة صعودًا في التسلسل الهرمي (في الصنف الأب، ثم الجد، وهكذا)
- استخدم أول دالة تصعد في التسلسل الهرمي وتجدها بهذا الاسم

## الشريحة 23: الصنف الابن `Person`

> **ملاحظة المترجم:** نص هذه الشريحة المستخرَج هو العنوان فقط: "SUBCLASS PERSON". التعريف الكامل يظهر على الشريحة التالية.

## الشريحة 24: تعريف `Person`

```python
class Person(Animal):
    def __init__(self, name, age):
        Animal.__init__(self, age)
        self.set_name(name)
        self.friends = []

    def get_friends(self):
        return self.friends.copy()

    def add_friend(self, fname):
        if fname not in self.friends:
            self.friends.append(fname)

    def speak(self):
        print("hello")

    def age_diff(self, other):
        diff = self.age - other.age
        print(abs(diff), "year difference")

    def __str__(self):
        return "person:"+str(self.name)+":"+str(self.age)
```

## الشريحة 25: جرّب بنفسك!

- اكتب دالة وفق هذه المواصفة

```python
def make_pets(d):
    """ d is a dict mapping a Person obj to a Cat obj

    Prints, on each line, the name of a person, a colon, and the
    name of that person's cat """
    pass

p1 = Person("ana", 86)
p2 = Person("james", 7)
c1 = Cat(1)
c1.set_name("furball")
c2 = Cat(1)
c2.set_name("fluffsphere")
d = {p1:c1, p2:c2}
make_pets(d)

# prints ana:furball
#
james:fluffsphere
```

## الشريحة 26: الفكرة الكبرى (BIG IDEA)

- يمكن للصنف الابن أن يستخدم سمات الصنف الأب، أو يتجاوز سمات الصنف الأب، أو يعرّف سمات جديدة.
- السمات إمّا بيانات وإمّا دوال.

## الشريحة 27: الصنف الابن `Student`

> **ملاحظة المترجم:** نص هذه الشريحة المستخرَج هو العنوان فقط: "SUBCLASS STUDENT". التعريف الكامل يظهر على الشريحة التالية.

## الشريحة 28: تعريف `Student`

```python
import random

class Student(Person):
    def __init__(self, name, age, major=None):
        Person.__init__(self, name, age)
        self.major = major

    def change_major(self, major):
        self.major = major

    def speak(self):
        r = random.random()
        if r < 0.25:
            print("i have homework")
        elif 0.25 <= r < 0.5:
            print("i need sleep")
        elif 0.5 <= r < 0.75:
            print("i should eat")
        else:
            print("i'm still zooming")

    def __str__(self):
        return "student:"+str(self.name)+":"+str(self.age)+":"+str(self.major)
```

## الشريحة 29: الصنف الابن `Rabbit`

> **ملاحظة المترجم:** نص هذه الشريحة المستخرَج هو العنوان فقط: "SUBCLASS RABBIT". التعريف الكامل يظهر على الشريحة التالية.

## الشريحة 30: متغيّرات الصنف (Class Variables) والصنف الابن `Rabbit`

- متغيّرات الصنف (class variables) وقيمها مشتركة بين كل نسخ الصنف

```python
class Rabbit(Animal):
    tag = 1

    def __init__(self, age, parent1=None,parent2=None):
        Animal.__init__(self, age)
        self.parent1 = parent1
        self.parent2 = parent2
        self.rid = Rabbit.tag
        Rabbit.tag += 1
```

- استُخدم `tag` لإعطاء معرّف (id) فريد لكل نسخة جديدة من `Rabbit`

## الشريحة 31: مراجعة لـ `__init__` في `Rabbit`

```python
def __init__(self, age, parent1=None,parent2=None):
    Animal.__init__(self, age)
    self.parent1 = parent1
    self.parent2 = parent2
    self.rid = Rabbit.tag
    Rabbit.tag += 1
```

مثال:

```python
r1 = Rabbit(8)
```

حالة الذاكرة بعد التنفيذ:

| العنصر | القيمة |
| --- | --- |
| `Rabbit.tag` | `2` |
| `r1` — Age | `8` |
| `r1` — Parent1 | `None` |
| `r1` — Parent2 | `None` |
| `r1` — Rid | `1` |

> **ملاحظة المترجم:** القيم `2` و`1` في هذا الجدول هي حالة `Rabbit.tag` بعد الزيادة، والمُسجَّلة في الملف الأصلي خارج جدول الذاكرة. رتّبتُها هنا في جدول واحد لإبراز العلاقة بينها؛ القيم نفسها منقولة كما هي.

## الشريحة 32: مراجعة لـ `__init__` في `Rabbit` (تتمة)

```python
def __init__(self, age, parent1=None,parent2=None):
    Animal.__init__(self, age)
    self.parent1 = parent1
    self.parent2 = parent2
    self.rid = Rabbit.tag
    Rabbit.tag += 1
```

مثال:

```python
r1 = Rabbit(8)
r2 = Rabbit(6)
```

حالة الذاكرة بعد التنفيذ:

| العنصر | القيمة |
| --- | --- |
| `Rabbit.tag` | `3` |
| `r1` — Age | `8` |
| `r1` — Parent1 | `None` |
| `r1` — Parent2 | `None` |
| `r1` — Rid | `1` |
| `r2` — Age | `6` |
| `r2` — Parent1 | `None` |
| `r2` — Parent2 | `None` |
| `r2` — Rid | `2` |

## الشريحة 33: مراجعة لـ `__init__` في `Rabbit` (تتمة)

```python
def __init__(self, age, parent1=None,parent2=None):
    Animal.__init__(self, age)
    self.parent1 = parent1
    self.parent2 = parent2
    self.rid = Rabbit.tag
    Rabbit.tag += 1
```

مثال:

```python
r1 = Rabbit(8)
r2 = Rabbit(6)
r3 = Rabbit(10)
```

حالة الذاكرة بعد التنفيذ:

| العنصر | القيمة |
| --- | --- |
| `Rabbit.tag` | `4` |
| `r1` — Age | `8` |
| `r1` — Parent1 | `None` |
| `r1` — Parent2 | `None` |
| `r1` — Rid | `1` |
| `r2` — Age | `6` |
| `r2` — Parent1 | `None` |
| `r2` — Parent2 | `None` |
| `r2` — Rid | `2` |
| `r3` — Age | `10` |
| `r3` — Parent1 | `None` |
| `r3` — Parent2 | `None` |
| `r3` — Rid | `3` |

## الشريحة 34: دوال الجلب في `Rabbit`

```python
class Rabbit(Animal):
    tag = 1

    def __init__(self, age, parent1=None,parent2=None):
        Animal.__init__(self, age)
        self.parent1 = parent1
        self.parent2 = parent2
        self.rid = Rabbit.tag
        Rabbit.tag += 1

    def get_rid(self):
        return str(self.rid).zfill(5)

    def get_parent1(self):
        return self.parent1

    def get_parent2(self):
        return self.parent2
```

## الشريحة 35: العمل مع أنواعك الخاصة

```python
def __add__(self, other):
    # returning object of same type as this class
    return Rabbit(0, self, other)
```

(تذكّر `__init__` في `Rabbit`: `__init__(self, age, parent1=None, parent2=None)`)

- عرّف معامل `+` بين نسختين من `Rabbit`
- عرّف ماذا يفعل شيء مثل:

```python
r4 = r1 + r2
```

حيث `r1` و`r2` نسختان من `Rabbit`

- `r4` هي نسخة جديدة من `Rabbit` بعمر `0`
- في `r4` تكون `self` أحد الوالدين و`other` هو الوالد الآخر
- في `__init__`، يكون `parent1` و`parent2` من نوع `Rabbit`

## الشريحة 36: مراجعة لـ `__init__` في `Rabbit` مع `+`

```python
def __init__(self, age, parent1=None,parent2=None):
    Animal.__init__(self, age)
    self.parent1 = parent1
    self.parent2 = parent2
    self.rid = Rabbit.tag
    Rabbit.tag += 1
```

مثال:

```python
r1 = Rabbit(8)
r2 = Rabbit(6)
r3 = Rabbit(10)
r4 = r1 + r2
```

حالة الذاكرة بعد التنفيذ:

| العنصر | القيمة |
| --- | --- |
| `Rabbit.tag` | `5` |
| `r1` — Age | `8` |
| `r1` — Parent1 | `None` |
| `r1` — Parent2 | `None` |
| `r1` — Rid | `1` |
| `r2` — Age | `6` |
| `r2` — Parent1 | `None` |
| `r2` — Parent2 | `None` |
| `r2` — Rid | `2` |
| `r3` — Age | `10` |
| `r3` — Parent1 | `None` |
| `r3` — Parent2 | `None` |
| `r3` — Rid | `3` |
| `r4` — Age | `0` |
| `r4` — Parent1 | obj bound to r1 |
| `r4` — Parent2 | obj bound to r2 |
| `r4` — Rid | `4` |

## الشريحة 37: دالة خاصة لمقارنة أرنبين

- قرر أن الأرنبَين متساويَان إذا كان لهما الوالدان نفسهما

```python
def __eq__(self, other):
    parents_same = (self.p1.rid == oth.p1.rid and self.p2.rid == oth.p2.rid)
    parents_opp = (self.p2.rid == oth.p1.rid and self.p1.rid == oth.p2.rid)
    return parents_same or parents_opp
```

- قارن معرّفات الوالدين لأن المعرّفات فريدة (بفضل متغيّر الصنف)
- لاحظ أنه لا يمكنك مقارنة الكائنات مباشرة
- على سبيل المثال بـ `self.parent1 == other.parent1`
- هذا ينادي دالة `__eq` مرارًا وتكرارًا حتى يناديها على `None` ويعطي `AttributeError` عندما يحاول تنفيذ `None.parent1`

> **ملاحظة المترجم:** في الكود أعلاه يستعمل النص الأصلي `self.p1` و`oth.p1` بينما تعريف الصنف يستعمل `self.parent1` و`other`؛ وقد نُقل الكود كما هو في الأصل مع الإبقاء على `oth` دون تصحيح. (وفي ملفات الشيفرة المرافقة لهذه المحاضرة أُعيدت صياغة هذا التباين إلى `self.parent1` و`other.parent1`.)

## الشريحة 38: الفكرة الكبرى (BIG IDEA)

- متغيّرات الصنف (class variables) مشتركة بين كل النسخ.
- إذا غيّرتها نسخة واحدة، فهي تتغيّر لكل النسخ.

## الشريحة 39: البرمجة الكائنية التوجه (Object Oriented Programming)

- أنشئ مجموعات بياناتك الخاصة
- نظّم المعلومات
- قسّم العمل
- الوصول إلى المعلومات بطريقة متسقة
- أضف طبقات من التعقيد
  - **التسلسلات الهرمية (Hierarchies)**
  - أصناف الأبناء ترث البيانات والدوال من أصناف الآباء
- مثل الدوال تمامًا، الأصناف آلية للتفكيك (decomposition) والتجريد (abstraction) في البرمجة

## الشريحة 40: MIT OpenCourseWare

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- ولمعلومات كيفية الاستشهاد بهذه المواد أو شروط استخدامها، راجع: <https://ocw.mit.edu/terms>
