---
book: mit-6100l
chapter: lecture-18
slug: notes
lang: ar
title: "المحاضرة 18: المزيد من دوال الأصناف في Python (More Python Class Methods)"
---

# المحاضرة 18: المزيد من دوال الأصناف في Python (More Python Class Methods)

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-18-more-python-class-methods/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec18_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec18.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec18_code_py/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec18/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (41 شريحة). المواضع التي يعرض فيها النص المستخرَج عمودين متجاورين (صنف ونسخة، أو `SimpleFraction` و`Fraction`) نُقلت إلى جداول. الشيفرة وعناوين وثائق الأصناف (docstrings) تُركت بالإنجليزية كما هي. الأشكال لم تُضمَّن.

## الشريحة 1: عنوان المحاضرة

- MORE PYTHON CLASS METHODS
- (download slides and .py files to follow along)
- 6.100L Lecture 18 — Ana Bell

## الشريحة 2: منظوران لكتابة الشيفرة

| تنفيذ الصنف (Implementing the class) | استخدام الصنف (Using the class) |
|---|---|
| اكتب الشيفرة من منظور جديد كائن من نوع | استعمل كائن النوع الجديد في الشيفرة |
| عرّف الصنف (Define the class) | أنشئ نسخًا من نوع الكائن (Create instances) |
| عرّف سمات البيانات (**ما هو** الكائن) | أجرِ عمليات عليها |
| عرّف الدوال (**كيف تُستخدم** الكائن) | |
| الصنف يلتزم بشكل تجريدي الخصائص والسلوكيات المشتركة | النسخ لها قيم محدّدة لسماتها |

## الشريحة 3: تذكّر صنف الإحداثيّ (RECALL THE COORDINATE CLASS)

- تعريف الصنف يخبر Python بالمخطّط (blueprint) لنوع `Coordinate`

```python
class Coordinate(object):
    """ A coordinate made up of an x and y value """
    def __init__(self, x, y):
        """ Sets the x and y values """
        self.x = x
        self.y = y

    def distance(self, other):
        """ Returns euclidean dist between two Coord obj """
        x_diff_sq = (self.x-other.x)**2
        y_diff_sq = (self.y-other.y)**2
        return (x_diff_sq + y_diff_sq)**0.5
```

## الشريحة 4: إضافة دوال إلى صنف `Coordinate` (ADDING METHODS TO THE Coordinate CLASS)

- الدوال هي دوال تعمل مع كائنات من هذا النوع وحدها

```python
class Coordinate(object):
    """ A coordinate made up of an x and y value """
    def __init__(self, x, y):
        """ Sets the x and y values """
        self.x = x
        self.y = y

    def distance(self, other):
        """ Returns euclidean dist between two Coord obj """
        x_diff_sq = (self.x-other.x)**2
        y_diff_sq = (self.y-other.y)**2
        return (x_diff_sq + y_diff_sq)**0.5

    def to_origin(self):
        """ always sets self.x and self.y to 0,0 """
        self.x = 0
        self.y = 0
```

## الشريحة 5: إنشاء نسخ `Coordinate` (MAKING COORDINATE INSTANCES)

- إنشاء النسخ يُنشئ كائنات `Coordinate` فعلية في الذاكرة
- يمكن التعامل مع هذه الكائنات
- استخدم ترميز النقطة (dot notation) لاستدعاء الدوال والوصول إلى سمات البيانات

```python
c = Coordinate(3,4)
origin = Coordinate(0,0)
print(f"c's x is {c.x} and origin's x is {origin.x}")
print(c.distance(origin))
c.to_origin()
print(c.x, c.y)
```

## الشريحة 6: تعريف الصنف مقابل نسخة من الصنف

| تعريف صنف لنوع كائن | نسخة من صنف |
|---|---|
| اسم الصنف هو النوع (type) | النسخة كائن واحد محدّد |
| الصنف مُعرَّف بشكل عام (generically) | قيم سمات البيانات تختلف بين النسخ |
| استخدم `self` للإشارة إلى نسخة ما أثناء تعريف الصنف | |
| `(self.x – self.y)**2` | `c1 = Coordinate(1,2)` / `c2 = Coordinate(3,4)` |
| `self` مُدخَل (parameter) للدوال في تعريف الصنف | لـ `c1` و `c2` قيمتا سمات بيانات مختلفتان `c1.x` و `c2.x` لأنهما كائنان مختلفان |
| النسخة تملك بنية الصنف | |
| الصنف يعرّف البيانات والدوال المشتركة عبر جميع النسخ | |

## الشريحة 7: استخدام الأصناف لبناء أصناف أخرى (USING CLASSES TO BUILD OTHER CLASSES)

- مثال: استخدم `Coordinate` لبناء `Circle` (دوائر)
- سيستخدم تنفيذنا سمتَي بيانات
  - كائن `Coordinate` يمثّل المركز (center)
  - كائن `int` يمثّل نصف القطر (radius)

```text
Center coordinate
radius
```

## الشريحة 8: صنف `Circle`: التعريف والنسخ (DEFINITION and INSTANCES)

```python
class Circle(object):
    def __init__(self, center, radius):
        self.center = center
        self.radius = radius

center = Coordinate(2, 2)
my_circle = Circle(center, 2)
```

## الشريحة 9: جرّب بنفسك (YOU TRY IT!)

- أضِف شيفرةً داخل دالة `init` تتحقّق من أنّ نوع `center` هو كائن `Coordinate` وأنّ نوع `radius` هو `int`. إن لم يكن أيٌّ منهما من هذين النوعين، فرِمْ (raise) خطأ `ValueError`.

```python
def __init__(self, center, radius):
    self.center = center
    self.radius = radius
```

## الشريحة 10: صنف `Circle`: التعريف والنسخ (DEFINITION and INSTANCES)

```python
class Circle(object):
    def __init__(self, center, radius):
        self.center = center
        self.radius = radius

    def is_inside(self, point):
        """ Returns True if point is in self, False otherwise """
        return point.distance(self.center) < self.radius

center = Coordinate(2, 2)
my_circle = Circle(center, 2)
p = Coordinate(1,1)
print(my_circle.is_inside(p))
```

## الشريحة 11: جرّب بنفسك (YOU TRY IT!)

- هل الدالتان التاليتان في صنف `Circle` متكافئتان وظيفيًا؟

```python
class Circle(object):
    def __init__(self, center, radius):
        self.center = center
        self.radius = radius

    def is_inside1(self, point):
        return point.distance(self.center) < self.radius

    def is_inside2(self, point):
        return self.center.distance(point) < self.radius
```

## الشريحة 12: مثال: الكسور (EXAMPLE: FRACTIONS)

- أنشئ نوعًا جديدًا يمثّل عددًا ككسر
- التمثيل الداخلي هو عددان صحيحان
  - البسط (numerator)
  - المقام (denominator)
- الواجهة، أي الدوال، أي كيفية التفاعل مع كائنات `Fraction`
  - الجمع، الطرح
  - عكس الكسر (invert)
- لنكتبها معًا!

## الشريحة 13: نحتاج إلى إنشاء نسخ (NEED TO CREATE INSTANCES)

```python
class SimpleFraction(object):
    def __init__(self, n, d):
        self.num = n
        self.denom = d
```

## الشريحة 14: ضرب الكسور (MULTIPLY FRACTIONS)

```python
class SimpleFraction(object):
    def __init__(self, n, d):
        self.num = n
        self.denom = d

    def times(self, oth):
        top = self.num*oth.num
        bottom = self.denom*oth.denom
        return top/bottom
```

## الشريحة 15: جمع الكسور (ADD FRACTIONS)

```python
class SimpleFraction(object):
    def __init__(self, n, d):
        self.num = n
        …………
        self.denom = d

    def plus(self, oth):
        top = self.num*oth.denom + self.denom*oth.num
        bottom = self.denom*oth.denom
        return top/bottom
```

## الشريحة 16: لنجرّبها (LET’S TRY IT OUT)

```python
f1 = SimpleFraction(3, 4)
f2 = SimpleFraction(1, 4)
print(f1.num)
print(f1.denom)
print(f1.plus(f2))
print(f1.times(f2))
```

| الأمر | النتيجة |
|---|---|
| `f1.num` | `3` |
| `f1.denom` | `4` |
| `f1.plus(f2)` | `1.0` |
| `f1.times(f2)` | `0.1875` |

## الشريحة 17: جرّب بنفسك (YOU TRY IT!)

- أضِف دالتين تعكسان كائن الكسر وفق المواصفات التالية:

```python
class SimpleFraction(object):
    """ A number represented as a fraction """
    def __init__(self, num, denom):
        self.num = num
        self.denom = denom

    def get_inverse(self):
        """ Returns a float representing 1/self """
        pass

    def invert(self):
        """ Sets self's num to denom and vice versa.
        Returns None. """
        pass

# Example:
f1 = SimpleFraction(3,4)
print(f1.get_inverse())
f1.invert()
print(f1.num, f1.denom)

# prints 1.33333333 (note this one returns value)
# prints 4 3
```

- الأولى تُعيد قيمة، والثانية تعمل على سمات البيانات داخليًا دون `return`.

## الشريحة 18: لنجرّبها مع أشياء أخرى (LET’S TRY IT OUT WITH MORE THINGS)

```python
f1 = SimpleFraction(3, 4)
f2 = SimpleFraction(1, 4)
print(f1.num)
print(f1.denom)
print(f1.plus(f2))
print(f1.times(f2))
print(f1)
print(f1 * f2)
```

| الأمر | النتيجة |
|---|---|
| `f1.num` | `3` |
| `f1.denom` | `4` |
| `f1.plus(f2)` | `1.0` |
| `f1.times(f2)` | `0.1875` |
| `print(f1)` | `<__main__.SimpleFraction object at 0x00000234A8C41DF0>` |
| `print(f1 * f2)` | `Error!` |

## الشريحة 19: معاملات خاصة نُنفَّذها بدوال «dunder» (SPECIAL OPERATORS IMPLEMENTED WITH DUNDER METHODS)

- رموز مثل `+`، `-`، `==`، `<`، `>`، `len()`، `print` وغيرها الكثير هي **ترميزات مختصرة** (shorthand notations)
- في الكواليس، تُستبدل هذه بدالة!

<https://docs.python.org/3/reference/datamodel.html#basic-customization>

- يمكنك تجاوز هذه العمليات لتعمل مع صنفك

## الشريحة 20: المعاملات الخاصة نُنفَّذها بدوال «dunder»

- عرِّفها بشرطة سفلية مزدوجة قبل الاسم و/أو بعده

| الدالة | المعامل المكافئ |
|---|---|
| `__add__(self, other)` | `self + other` |
| `__sub__(self, other)` | `self - other` |
| `__mul__(self, other)` | `self * other` |
| `__truediv__(self, other)` | `self / other` |
| `__eq__(self, other)` | `self == other` |
| `__lt__(self, other)` | `self < other` |
| `__len__(self)` | `len(self)` |
| `__str__(self)` | `print(self)` |
| `__float__(self)` | `float(self)` أي التحويل (cast) |
| `__pow__` | `self**other` |
| وغيرها | … |

## الشريحة 21: طباعة أنواع البيانات الخاصة بنا (PRINTING OUR OWN DATA TYPES)

فاصل: كيف نتحكّم في تمثيل كائناتنا عند الطباعة؟

## الشريحة 22: اطبع تمثيل الكائن (PRINT REPRESENTATION OF AN OBJECT)

```text
>>> c = Coordinate(3,4)
>>> print(c)
<__main__.Coordinate object at 0x7fa918510488>
```

- تمثيل الطباعة الافتراضي غير مفيد
- عرّف دالة `__str__` لصنفك
- تستدعي Python دالة `__str__` عند استخدامها مع `print` على كائن صنفك
- **أنت تقرّر ماذا تفعل!** لنقل إنّنا عندما نطبع كائن `Coordinate` نريد أن نُظهر

```text
>>> print(c)
<3,4>
```

## الشريحة 23: عرّف دالة الطباعة الخاصة بك (DEFINING YOUR OWN PRINT METHOD)

```python
class Coordinate(object):
    def __init__(self, xval, yval):
        self.x = xval
        self.y = yval

    def distance(self, other):
        x_diff_sq = (self.x-other.x)**2
        y_diff_sq = (self.y-other.y)**2
        return (x_diff_sq + y_diff_sq)**0.5

    def __str__(self):
        return "<"+str(self.x)+","+str(self.y)+">"
```

## الشريحة 24: لنسمي الأمر أن نفهم الأنواع والأصناف (WRAPPING YOUR HEAD AROUND TYPES AND CLASSES)

- يمكنك سؤال Python عن نوع نسخة كائن

```text
>>> c = Coordinate(3,4)
>>> print(c)
<3,4>
>>> print(type(c))
<class __main__.Coordinate>
```

- هذا منطقيّ، لأنّ

```text
>>> print(Coordinate)
<class __main__.Coordinate>
>>> print(type(Coordinate))
<type 'type'>
```

- استخدم `isinstance()` للتحقّق ممّا إذا كان كائن ما هو `Coordinate`

```text
>>> print(isinstance(c, Coordinate))
True
```

## الشريحة 25: مثال: الكسور بدوال «dunder» (EXAMPLE: FRACTIONS WITH DUNDER METHODS)

- أنشئ نوعًا جديدًا يمثّل عددًا ككسر
- التمثيل الداخلي هو عددان صحيحان
  - البسط (numerator)
  - المقام (denominator)
- الواجهة، أي الدوال، أي كيفية التفاعل مع كائنات `Fraction`
  - الجمع، الطرح، الضرب، القسمة، للعمل مع `+`، `-`، `*`، `/`
  - طباعة التمثيل، والتحويل إلى `float`
  - عكس الكسر
- لنكتبها معًا!

## الشريحة 26: إنشاء النسخ والطباعة (CREATE & PRINT INSTANCES)

```python
class Fraction(object):
    def __init__(self, n, d):
        self.num = n
        self.denom = d

    def __str__(self):
        return str(self.num) + "/" + str(self.denom)
```

## الشريحة 27: لنجرّبها (LET’S TRY IT OUT)

```python
f1 = Fraction(3, 4)
f2 = Fraction(1, 4)
f3 = Fraction(5, 1)
print(f1)
print(f2)
print(f3)
```

| الأمر | النتيجة |
|---|---|
| `print(f1)` | `3/4` |
| `print(f2)` | `1/4` |
| `print(f3)` | `5/1` |

حسنًا، لكنه يبدو غريبًا!

## الشريحة 28: جرّب بنفسك (YOU TRY IT!)

- عدّل دالة `str` لتمثّل `Fraction` كبسط فقط عندما يكون المقام 1. وإلا فإنّ تمثيله هو البسط ثم `/` ثم المقام.

```python
class Fraction(object):
    def __init__(self, num, denom):
        self.num = num
        self.denom = denom

    def __str__(self):
        return str(self.num) + "/" + str(self.denom)

# Example:
a = Fraction(1,4)
b = Fraction(3,1)
print(a)
# prints 1/4
print(b)
# prints 3
```

## الشريحة 29: تنفيذ المعاملات `+ - * /` و `float()` (IMPLEMENTING `+ - * /` `float()`)

فاصل: ننتقل الآن من الطباعة إلى العمليات الحسابية على الكسور.

## الشريحة 30: مقارنة بين الدالة العادية ودالة «dunder» (COMPARING METHOD vs. DUNDER METHOD)

| `SimpleFraction` | `Fraction` |
|---|---|
| `def times(self, oth):` | `def __mul__(self, other):` |
| `top = self.num*oth.num` | `top = self.num*other.num` |
| `bottom = self.denom*oth.denom` | `bottom = self.denom*other.denom` |
| `return top/bottom` | `return Fraction(top, bottom)` |

## الشريحة 31: لنجرّبها (LETS TRY IT OUT)

```python
a = Fraction(1,4)
b = Fraction(3,4)
c = a * b
print(a)
print(c)
```

| الأمر | النتيجة |
|---|---|
| `print(a)` | `1/4` |
| `print(c)` | `3/16` |

## الشريحة 32: الأصناف تستطيع إخفاء التفاصيل (CLASSES CAN HIDE DETAILS)

هذه الثلاثة متكافئة تمامًا:

```python
print(a * b)
print(a.__mul__(b))
print(Fraction.__mul__(a, b))
```

- كل عملية في Python تعود في النهاية إلى استدعاء دالة
- النسخة الأولى تجعل العملية واضحة دون أن نهتمّ بالتفاصيل الداخلية!
- **التجريد (abstraction) في العمل**

## الشريحة 33: الفكرة الكبرى (BIG IDEA)

- العمليات الخاصة التي كنا نستخدمها ليست سوى دوال في الكواليس.
- أشياء مثل:
  - `print`، `len`
  - `+`، `*`، `-`، `/`، `<`، `>`، `<=`، `>=`، `==`، `!=`
  - `[]`
  - وغيرها كثير!

## الشريحة 34: يمكننا الإبقاء على الخيارين بإضافة دالة للتحويل إلى `float` (CAN KEEP BOTH OPTIONS BY ADDING A METHOD TO CAST TO A float)

```python
class Fraction(object):
    def __init__(self, n, d):
        self.num = n
        …………
        self.denom = d

    def __float__(self):
        return self.num/self.denom

c = a * b
print(c)
print(float(c))
```

| الأمر | النتيجة |
|---|---|
| `print(c)` | `3/16` |
| `print(float(c)) | `0.1875` |

## الشريحة 35: لنجرّبها أكثر (LETS TRY IT OUT SOME MORE)

```python
a = Fraction(1,4)
b = Fraction(2,3)
c = a * b
print(c)
```

| الأمر | النتيجة |
|---|---|
| `print(c)` | `2/12` |

- ليس تمامًا ما قد نتوقّعه! الكسر لم يُبسَّط (not reduced).
- هل يمكننا إصلاح ذلك؟

## الشريحة 36: أضِف دالة (ADD A METHOD)

```python
class Fraction(object):
    …………
    def reduce(self):
        def gcd(n, d):
            while d != 0:
                (d, n) = (n%d, d)
            return n

        if self.denom == 0:
            return None
        elif self.denom == 1:
            return self.num
        else:
            greatest_common_divisor = gcd(self.num, self.denom)
            top = int(self.num/greatest_common_divisor)
            bottom = int(self.denom/greatest_common_divisor)
            return Fraction(top, bottom)

c = a*b
print(c)
print(c.reduce())
```

| الأمر | النتيجة |
|---|---|
| `print(c)` | `2/12` |
| `print(c.reduce())` | `1/6` |

## الشريحة 37: لدينا بعض التحسينات المطلوبة (WE HAVE SOME IMPROVEMENTS TO MAKE)

نفس دالة `reduce` أعلاه، لكنّها تحتوي على ملاحظة واحدة لم تُستكمل في الشريحة:

```python
class Fraction(object):
    …………
    def reduce(self):
        def gcd(n, d):
            while d != 0:
                (d, n) = (n%d, d)
            return n

        if self.denom == 0:
            return None
        elif self.denom == 1:
            s
            return self.num
        else:
            greatest_common_divisor = gcd(self.num, self.denom)
            top = int(self.num/greatest_common_divisor)
            bottom = int(self.denom/greatest_common_divisor)
            return Fraction(top, bottom)
```

> **ملاحظة المترجم:** يظهر في الشريحة سطر مبتور `s` فوق `return self.num` في فرع `self.denom == 1`. لم يُخمَّن مضمونه، ونُصَّ على ما يظهر في النص المستخرَج فقط.

## الشريحة 38: تحقّق من الأنواع، فهي مختلفة (CHECK THE TYPES, THEY’RE DIFFERENT)

```python
a = Fraction(4,1)
b = Fraction(3,9)
ar = a.reduce()
br = b.reduce()
print(ar, type(ar))
print(br, type(br))
c = ar * br
```

| الأمر | النتيجة |
|---|---|
| `print(ar, type(ar))` | `4 <class 'int'>` |
| `print(br, type(br))` | `1/3 <class '__main__.Fraction'>` |

## الشريحة 39: جرّب بنفسك (YOU TRY IT!)

- عدّل الشيفرة لتُعيد كائن `Fraction` عندما يكون المقام 1

```python
class Fraction(object):
    def reduce(self):
        def gcd(n, d):
            while d != 0:
                (d, n) = (n%d, d)
            return n

        if self.denom == 0:
            return None
        elif self.denom == 1:
            return self.num
        else:
            greatest_common_divisor = gcd(self.num, self.denom)
            top = int(self.num/greatest_common_divisor)
            bottom = int(self.denom/greatest_common_divisor)
            return Fraction(top, bottom)

# Example:
f1 = Fraction(5,1)
print(f1.reduce())

# prints 5/1
# not 5
```

## الشريحة 40: لماذا البرمجة الكينونية وتجميع البيانات بهذه الطريقة؟ (WHY OOP and BUNDLING THE DATA IN THIS WAY?)

- الشيفرة منظّمة وقابلة للتقسيم إلى وحدات (modular)
- الشيفرة سهلة الصيانة
- من السهل البناء على الكائنات للحصول على كائنات أكثر تعقيدًا
- **التفكيك (decomposition) والتجريد (abstraction) في العمل مع أصناف Python**
- تجميع البيانات والسلوكيات يعني أنّك تستطيع استخدام الكائنات باتّساق
- دوال «dunder» مُجرَّدة خلف عمليات مشتركة، لكنّها دوال في الكواليس!

## الشريحة 41: MIT OpenCourseWare

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- للاستعلام عن كيفية الاستشهاد بهذه المواد أو شروط الاستخدام، راجع: <https://ocw.mit.edu/terms>