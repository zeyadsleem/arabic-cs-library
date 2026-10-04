---
book: mit-6100l
chapter: lecture-08
slug: notes
lang: ar
title: "المحاضرة 8: الدوال ككائنات (Functions as Objects)"
---

# المحاضرة 8: الدوال ككائنات (Functions as Objects)

## المصادر والنسبة والترخيص

المادة الأصلية: **آنا بيل (Ana Bell)**، **MIT OpenCourseWare (MIT OCW)**، معهد ماساتشوستس للتكنولوجيا، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، **خريف 2022 (Fall 2022)**.

- [صفحة المحاضرة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-8-functions-as-objects/).
- [صفحة الشرائح الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec08_pdf/).
- [ملف الشرائح الأصلي، PDF](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec08.pdf).
- [ملف شيفرة المحاضرة الأصلي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec08_code.py).
- [تفريغ المحاضرة على OCW](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec08/) (النسخة الإنجليزية الرسمية).

هذه ترجمة وتكييف عربي غير رسمي وفق [رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. [شروط الاستخدام والاستشهاد](https://ocw.mit.edu/terms/).

**منهج الترجمة:** لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. شرائح «التكبير» (ZOOMING OUT) وشرائح تتبّع النطاق (Scope) تتكرّر فيها الشيفرة نفسها مع جدول جديد من أسماء الكائنات وقيمها؛ نُقلت كل شريحة على حدة مع جدولها، لأن معنى الشريحة هو الجدول لا الشيفرة. الشيفرة والشفرة الوهمية محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. ولم تُضمَّن صور أو صفحات من ملف PDF.

## الشريحة 1: الدوال ككائنات (Functions as Objects)

نزّل الشرائح وملفات `.py` لمتابعة الشرح.

6.100L، المحاضرة 8 — آنا بيل (Ana Bell).

## الشريحة 2: الدالة من المحاضرة السابقة (Function from last lecture)

```python
def is_even( i ):
    """
    Input: i, a positive int

    Returns True if i is even and False otherwise
    """
    return i%2 == 0
```

- الدالة تُرجِع دائمًا قيمة.

## الشريحة 3: ماذا لو لم تكن هناك الكلمة المفتاحية `return`؟ (What if there is no `return` keyword)

```python
def is_even( i ):
    """
    Input: i, a positive int

    Does not return anything
    """
    i%2 == 0
```

- بايثون تُرجِع القيمة `None` إذا لم يُعطَ أي `return`.
- تمثّل `None` غياب القيمة (Absence of a Value).
- إذا استدعيتَها في صدفة (Shell) فلا يُطبع شيء.
- لا يُولِّد ذلك خطأً دلاليًّا ساكنًا (Static Semantic Error).

## الشريحة 4: إضافة `return None` صراحةً

```python
def is_even( i ):
    """
    Input: i, a positive int

    Does not return anything
    """
    i%2 == 0
    return None
```

## الشريحة 5: جرّب بنفسك! (YOU TRY IT!)

ما الذي يُطبع إذا شغّلتَ هذه الشيفرة كملف؟

```python
def add(x,y):
    return x+y

def mult(x,y):
    print(x*y)

add(1,2)
print(add(2,3))
mult(3,4)
print(mult(4,5))
```

## الشريحة 6: `print` مقابل `return`

| `print` | `return` |
| --- | --- |
| يمكن استعماله خارج الدوال. | لا معنى له إلا داخل دالة. |
| يمكن تنفيذ عبارات `print` كثيرة داخل الدالة. | يُنفَّذ واحد فقط من `return` داخل الدالة. |
| يمكن تنفيذ الشيفرة داخل الدالة بعد عبارة `print`. | الشيفرة داخل الدالة بعد عبارة `return` لا تُنفَّذ. |
| له قيمة مرتبطة به، تُخرَج إلى الطرفية (Console). | له قيمة مرتبطة به، تُسلَّم إلى الدالة المستدعِيَة (Calling Function). |
| تعبير `print` نفسه يُرجِع القيمة `None`. | — |

## الشريحة 7: جرّب بنفسك! — أصلح الدالة (YOU TRY IT!)

أصلح الشيفرة التي تحاول كتابة هذه الدالة:

```python
def is_triangular(n):
    """ n is an int > 0
    Returns True if n is triangular, i.e. equals a continued
    summation of natural numbers (1+2+3+...+k), False otherwise """
    total = 0
    for i in range(n):
        total += i
    if total == n:
        print(True)
    print(False)
```

## الشريحة 8: الدوال تدعم التعدُّد الوحداتي (Modularity)

إليك طريقة الجذر التربيعي بالتنصيف (Bisection Square Root Method) بوصفها دالة:

```python
def bisection_root(x):
    # Initialize variables
    epsilon = 0.01
    low = 0
    high = x
    ans = (high + low)/2.0
    while abs(ans**2 - x) >= epsilon:
        # iterate
        if ans**2 < x:
            low = ans
        else:
            high = ans
        ans = (high + low)/2.0
    # print(ans, 'is close to the root of', x)
    return ans
```

## الشريحة 9: استدعِها بقيم مختلفة

ملاحظات الشريحة مربوطة بأسطر الشيفرة في الشريحة السابقة:

| الملاحظة في الشريحة | موضعها في الشيفرة |
| --- | --- |
| guess not close enough — التخمين ليس قريبًا كفاية | شرط `while abs(ans**2 - x) >= epsilon:` |
| update low or high, depends on guess too small or too large — حدّث `low` أو `high` حسب هل التخمين صغير جدًا أم كبير جدًا | الفرع `if ans**2 < x: low = ans` و`else: high = ans` |
| new value for guess — القيمة الجديدة للتخمين | `ans = (high + low)/2.0` داخل الحلقة |
| return result — إرجاع النتيجة | `return ans` |

نادِها بقيم مختلفة:

```python
print(bisection_root(4))

print(bisection_root(123))
```

اكتب دالة تستدعي هذه الدالة!

## الشريحة 10: جرّب بنفسك! (YOU TRY IT!)

اكتب دالة تحقّق المواصفات التالية:

```python
def count_nums_with_sqrt_close_to (n, epsilon):
    """ n is an int > 2
    epsilon is a positive number < 1
    Returns how many integers have a square root within epsilon of n """
```

استعمل `bisection_root` التي كتبناها للحصول على تقريب (Approximation) للجذر التربيعي لعدد صحيح.

مثلًا: `print(count_nums_with_sqrt_close_to(10, 0.1))` يطبع `4` لأن جذر كل هذه الأعداد الصحيحة على مسافة أقل من `0.1`:

- جذر `99` هو `9.949699401855469`
- جذر `100` هو `9.999847412109375`
- جذر `101` هو `10.049758911132812`
- جذر `102` هو `10.099456787109375`

## الشريحة 11: التكبير (ZOOMING OUT) — هذا صندوقي الأسود

البرنامج:

```python
def sum_odd(a, b):
    sum_of_odds = 0
    for i in range(a, b+1):
        if i%2 == 1:
            sum_of_odds += i
    return sum_of_odds

low = 2
high = 7
my_sum = sum_odd(low, high)
```

جدول نطاق البرنامج (Program Scope):

| الاسم | القيمة | ملاحظة |
| --- | --- | --- |
| `sum_odd` | Some function code object — كائن دالة فيه شيفرة | مُعرَّفة بـ`def` |
| `low` | `2` | |
| `high` | `7` | |
| `my_sum` | — | بعد استدعاء دالة واحدة (One function call) |

## الشريحة 12: التكبير (ZOOMING OUT)

الشريحة نفسها، وجدول نطاق البرنامج فيه الآن اسمًا إضافيًّا بعد تنفيذ جسم الدالة:

| الاسم | القيمة | ملاحظة |
| --- | --- | --- |
| `sum_odd` | Some function code object | |
| `low` | `2` | |
| `high` | `7` | |
| `my_sum` | — | لم يُنفَّذ استدعاء بعد |

## الشريحة 13: التكبير (ZOOMING OUT)

الشريحة نفسها، وجدول نطاق البرنامج بعد اكتمال الاستدعاء:

| الاسم | القيمة | ملاحظة |
| --- | --- | --- |
| `sum_odd` | Some function code object | الصندوق الأسود |
| `low` | `2` | |
| `high` | `7` | |
| `my_sum` | `15` | |

## الشريحة 14: نطاق الدالة (Function Scope)

شريحة فاصلة: ترقيم الشرائح من 11 إلى 13 يتبع ترتيب الصفحات في ملف PDF، وهذه الشريحة تعلن انتقال المحاضرة إلى فهم استدعاءات الدوال.

## الشريحة 15: فهم استدعاءات الدوال (Understanding Function Calls)

- كيف ينفّذ بايثون استدعاء دالة؟
- كيف يعرف بايثون أي قيمة مرتبطة باسم متغيّر؟
- ينشئ بيئة جديدة (New Environment) مع كل استدعاء دالة!
- مثل برنامج مصغّر (Mini Program) عليه أن يُنجزه.
- يعمل هذا البرنامج المصغّر بعد إسناد معاملاته (Parameters) إلى بعض المدخلات (Inputs).
- يؤدّي العمل، أي جسم الدالة (Body of the Function).
- يُرجِع قيمة.
- تختفي البيئة بعد أن يُرجِع القيمة.

## الشريحة 16: البيئات (Environments)

- البيئة العامة (Global Environment):
  - حيث يتفاعل المستخدم مع مفسّر بايثون (Python Interpreter).
  - حيث يبدأ البرنامج.
- استدعاء دالة يُنشئ بيئة جديدة (Frame / Scope).

## الشريحة 17: نطاق المتغيّرات (Variable Scope)

- المعاملات الصورية (Formal Parameters) تُربط بقيمة معاملات المدخلات (Input Parameters).
- النطاق (Scope) هو خريطة (Mapping) من الأسماء إلى الكائنات (Objects):
  - يعرّف السياق (Context) الذي يُقيَّم فيه جسم الدالة.
  - قيم المتغيّرات تُعطى بارتباطات الأسماء (Bindings of Names).
- تعبيرات جسم الدالة تُقيَّم بالنسبة إلى هذا النطاق الجديد.

```python
def f( x ):
    x = x + 1
    print('in f(x): x =', x)
    return x

x = 3
y = f( x )
```

**ملاحظة المترجم:** في النصّ المستخرَج ظهر سطران متباعدان هما `xy = 3` و`z = f( y` `x )` بسبب انتقال الأعمدة في ملف PDF؛ والمقصود `x = 3` ثم `y = f( x )` كما هو واضح من الشرائح 18 إلى 24. اعتُمد التصحيح الظاهر من بقية الشرائح.

## الشريحة 18: نطاق المتغيّرات — بعد تقييم `def`

جدول النطاق العام (Global Scope):

| الاسم | القيمة | ملاحظة |
| --- | --- | --- |
| `x` | — | لم يُسنَد بعد |
| `f` | Some function code object | كائن الدالة |

## الشريحة 19: نطاق المتغيّرات — بعد تنفيذ أول إسناد

جدول النطاق العام:

| الاسم | القيمة | ملاحظة |
| --- | --- | --- |
| `x` | `3` | |
| `f` | Some function code object | |

## الشريحة 20: نطاق المتغيّرات — بعد استدعاء `f`

الجداول صارت ثلاثة: النطاق العام، ونطاق جديد باسم `f scope`.

| النطاق | الاسم | القيمة | ملاحظة |
| --- | --- | --- | --- |
| Global scope | `x` | `3` | |
| Global scope | `f` | Some function code object | |
| f scope | `x` | `3` | المعامل الصوري مربوط بالمُدخل `3` |

## الشريحة 21: نطاق المتغيّرات — بعد استدعاء `f` مع المتغيّر `y`

النطاق العام فيه `y = 3` بدلًا من `x = 3`، ونطاق `f` كما هو.

| النطاق | الاسم | القيمة |
| --- | --- | --- |
| Global scope | `y` | `3` |
| Global scope | `f` | Some function code object |
| f scope | `x` | `3` |

## الشريحة 22: نطاق المتغيّرات — تقييم جسم `f` في نطاق `f`

يُطبع `in f(x): x = 4`، واسم `x` في النطاق العام ما زال `3`.

| النطاق | الاسم | القيمة |
| --- | --- | --- |
| Global scope | `x` | `3` |
| Global scope | `f` | Some function code object |
| f scope | `x` | `4` |

## الشريحة 23: نطاق المتغيّرات — أثناء `return`

نفس جداول الشريحة 22، مع عبارة `returns 4` بجوار نطاق `f`.

## الشريحة 24: نطاق المتغيّرات — بعد تنفيذ الإسناد الثاني

نطاق `f` اختفى، وظهر اسم جديد في النطاق العام.

| النطاق | الاسم | القيمة |
| --- | --- | --- |
| Global scope | `x` | `3` |
| Global scope | `f` | Some function code object |
| Global scope | `z` | `4` |

## الشريحة 25: الفكرة الكبرى (BIG IDEA)

عليك أن تعرف أي تعبيرٍ تنفّذه لتعرف في أي نطاقٍ أنت.

## الشريحة 26: مثال آخر على النطاق (Another Scope Example)

- داخل الدالة، يمكنك الوصول إلى متغيّر مُعرَّف في الخارج.
- داخل الدالة، لا يمكنك تعديل متغيّر مُعرَّف في الخارج. يمكن ذلك باستعمال المتغيّرات العامة `global`، لكن هذا غير مُستحسن.
- استعمل Python Tutor لتنفّذ هذه الأمثلة خطوة بخطوة!

```python
def f(y):
    x = 1
    x += 1
    print(x)

x = 5
f(x)
print(x)
```

المُخرَج: `2` ثم `5`.

```python
def g(y):
    print(x)
    print(x + 1)

x = 5
g(x)
print(x)
```

المُخرَج: `5` ثم `6` ثم `5`.

```python
def h(y):
    x += 1

x = 5
h(x)
print(x)
```

المُخرَج: خطأ (Error).

## الشريحة 27: الدوال كوسائط (Functions as Arguments)

شريحة فاصلة تعلن موضوعًا جديدًا.

## الشريحة 28: الإجراءات من الرتبة العليا (Higher Order Procedures)

- الكائنات (Objects) في بايثون لها نوع (Type): `int` و`float` و`str` و`Boolean` و`NoneType` و`function`.
- الكائنات يمكن أن تظهر في الطرف الأيمن (RHS) من عبارة إسناد (Assignment): تربط اسمًا بكائن.
- الكائنات يمكن استعمالها كوسيط (Argument) لإجراء (Procedure)، ويمكن إرجاعها كقيمة من إجراء.
- الدوال كائنات من الفئة الأولى أيضًا (First Class Objects):
  - تعامل الدوال معاملة الأنواع الأخرى بالضبط.
  - يمكن أن تكون الدوال وسائط لدالة أخرى.
  - يمكن أن تُرجِع دالة أخرى دوالًا كقيم.

## الشريحة 29: الكائنات في البرنامج (Objects in a Program)

```python
def is_even(i):
    return i%2 == 0

r = 2
pi = 22/7
my_func = is_even
a = is_even(3)
b = my_func(4)
```

جدول الكائنات في النطاق العام:

| الاسم | ملاحظات | القيمة |
| --- | --- | --- |
| `is_even` | Some function code object — كائن دالة فيه شيفرة | |
| `my_func` | Some function code object — مرتبط بالكائن نفسه | |
| `r` | int object | `2` |
| `pi` | float object | `3.14285714` |
| `a` | | `False` |
| `b` | | `True` |

## الشريحة 30: الفكرة الكبرى (BIG IDEA)

كل شيء في بايثون كائن (an object).

## الشريحة 31: دالة كمعامل (Function as a Parameter)

```python
def calc(op, x, y):
    return op(x,y)

def add(a,b):
    return a+b

def div(a,b):
    if b != 0:
        return a/b
    print("Denominator was 0.")

print(calc(add, 2, 3))
```

## الشريحة 32: نفّذ الشيفرة خطوة بخطوة (Step through the code)

الشيفرة نفسها، ومعها جدول نطاق البرنامج:

| الاسم | ملاحظات |
| --- | --- |
| `calc` | Some function code object |
| `add` | Some function code object |
| `div` | Some function code object |
| `res` | — |

السطر المطلوب تنفيذه هو `res = calc(add, 2, 3)`.

## الشريحة 33: أنشئ نطاق `calc` (Create calc scope)

الشريحة نفسها، وجدول نطاق البرنامج كما هو، وقد ظهر نطاق جديد فارغ باسم `calc scope`.

## الشريحة 34: طابِق المعاملات الصورية في `calc` (Match formal params in calc)

| النطاق | الاسم | القيمة | ملاحظات |
| --- | --- | --- | --- |
| Program Scope | `calc` | — | Some function code object |
| Program Scope | `add` | — | Some function code object |
| Program Scope | `div` | — | Some function code object |
| Program Scope | `res` | — | |
| calc scope | `op` | `add` | Some function code object |
| calc scope | `x` | `2` | |
| calc scope | `y` | `3` | |

## الشريحة 35: السطر الأول والوحيد في `calc`

الشريحة نفسها، بنفس جداول الشريحة 34، والموجَّه الآن على تنفيذ `return op(x,y)`.

## الشريحة 36: أنشئ نطاق `add` (Create scope of add)

الشريحة نفسها، بنفس جداول الشريحة 34، وقد ظهر نطاق ثالث باسم `add scope`.

## الشريحة 37: طابِق المعاملات الصورية في `add` (Match formal params in add)

| النطاق | الاسم | القيمة | ملاحظات |
| --- | --- | --- | --- |
| Program Scope | `calc` | — | Some function code object |
| Program Scope | `add` | — | Some function code object |
| Program Scope | `div` | — | Some function code object |
| Program Scope | `res` | — | |
| calc scope | `op` | `add` | Some function code object |
| calc scope | `x` | `2` | |
| calc scope | `y` | `3` | |
| add scope | `a` | `2` | |
| add scope | `b` | `3` | |

## الشريحة 38: نفّذ سطر `add`

الشريحة نفسها، بنفس جداول الشريحة 37، مع عبارة `returns 5` بجوار نطاق `add`.

## الشريحة 39: استبدل استدعاء الدالة بقيمة `return` (Replace func call with return)

الشريحة نفسها، ونطاق `add` اختفى من الجداول بعد انتهاء الدالة:

| النطاق | الاسم | القيمة | ملاحظات |
| --- | --- | --- | --- |
| Program Scope | `calc` | — | Some function code object |
| Program Scope | `add` | — | Some function code object |
| Program Scope | `div` | — | Some function code object |
| Program Scope | `res` | — | |
| calc scope | `op` | `add` | Some function code object |
| calc scope | `x` | `2` | |
| calc scope | `y` | `3` | |

## الشريحة 40: نفّذ سطر `calc`

الشريحة نفسها، بنفس جداول الشريحة 39، مع عبارة `returns 5` بجوار نطاق `calc`.

## الشريحة 41: استبدل استدعاء الدالة بقيمة `return`

الشريحة نفسها، وبقي جدول النطاق العام فقط:

| النطاق | الاسم | القيمة | ملاحظات |
| --- | --- | --- | --- |
| Program Scope | `calc` | — | Some function code object |
| Program Scope | `add` | — | Some function code object |
| Program Scope | `div` | — | Some function code object |
| Program Scope | `res` | `5` | |

## الشريحة 42: جرّب بنفسك! (YOU TRY IT!)

نفّذ تتبّعًا مشابهًا (Similar Trace) لاستدعاء الدالة:

```python
def calc(op, x, y):
    return op(x,y)

def div(a,b):
    if b != 0:
        return a/b
    print("Denom was 0.")

res = calc(div,2,0)
```

ما قيمة `res`؟ وما الذي يُطبع؟

## الشريحة 43: مثال آخر — الدوال كمعاملات (Another Example: Functions as Params)

```python
def func_a():
    print('inside func_a')

def func_b(y):
    print('inside func_b')
    return y

def func_c(f, z):
    print('inside func_c')
    return f(z)

print(func_a())

print(5 + func_b(2))

print(func_c(func_b, 3))
```

## الشريحة 44: الدوال كمعاملات — النطاق العام (Functions as Parameters)

جدول النطاق العام:

| الاسم | ملاحظات |
| --- | --- |
| `func_a` | Some function code object |
| `func_b` | Some function code object |
| `func_c` | Some function code object |

## الشريحة 45: الدوال كمعاملات — نطاق `func_a`

نفس جدول النطاق العام، وقد ظهر `func_a scope`، وأصبح في النطاق العام اسم جديد قيمته `None`.

**ملاحظة المترجم:** يبيّن النصّ أن تنفيذ `print(func_a())` ينشئ اسمًا في النطاق العام قيمته `None`؛ وهذا يوافق كون `func_a` لا تُرجِع شيئًا، فتُرجِع `None` ضمنًا.

## الشريحة 46: الدوال كمعاملات — إكمال تنفيذ `print(func_a())`

الشريحة نفسها، بنفس جداول الشريحة 45.

## الشريحة 47: الدوال كمعاملات — نطاق `func_b`

ظهر `func_b scope` بالمحتوى:

| النطاق | الاسم | القيمة |
| --- | --- | --- |
| func_b scope | `y` | `2` |

وبقي جدول النطاق العام كما في الشريحة 44 مع اسم إضافي قيمته `None`.

## الشريحة 48: الدوال كمعاملات — تنفيذ جسم `func_b`

الشريحة نفسها، والاسم في النطاق العام صارت قيمته `7`، لأن `5 + func_b(2)` تُنتج `7`.

## الشريحة 49: الدوال كمعاملات — `func_b` تُرجِع

عبارة `returns 2` بجوار نطاق `func_b` الذي صار:

| النطاق | الاسم | القيمة |
| --- | --- | --- |
| func_b scope | `y` | `2` |

## الشريحة 50: الدوال كمعاملات — إكمال السطر

الشريحة نفسها، وجدول النطاق العام فيه `7`، وبقي `func_b scope` بقيمة `y = 2`.

## الشريحة 51: الدوال كمعاملات — نطاق `func_c`

ظهر `func_c scope`:

| النطاق | الاسم | القيمة | ملاحظات |
| --- | --- | --- | --- |
| func_c scope | `f` | `func_b` | Some function code object |
| func_c scope | `z` | — | |

## الشريحة 52: الدوال كمعاملات — مطابقة المعاملات في `func_c`

| النطاق | الاسم | القيمة | ملاحظات |
| --- | --- | --- | --- |
| func_c scope | `f` | `func_b` | Some function code object |
| func_c scope | `z` | `3` | |
| func_b scope | `y` | `3` | |

مع عبارة `returns 3` بجوار نطاق `func_b`.

## الشريحة 53: الدوال كمعاملات — تنفيذ جسم `func_c`

جدول النطاق العام فيه `7` و`3`، ويظهر نطاقا `func_c` و`func_b`، مع عبارة `returns 3` بجوار نطاق `func_c`.

## الشريحة 54: جرّب بنفسك! (YOU TRY IT!)

اكتب دالة تحقّق هذه المواصفات:

```python
def apply(criteria,n):
    """
    * criteria is a func that takes in a number and returns a bool
    * n is an int
    Returns how many ints from 0 to n (inclusive) match
    the criteria (i.e. return True when run with criteria)
    """
```

## الشريحة 55: الخلاصة (SUMMARY)

- الدوال كائنات من الفئة الأولى (First Class Objects):
  - لها نوع.
  - يمكن إسنادها قيمة تُربط باسم.
  - يمكن استعمالها كوسيط لإجراء آخر.
  - يمكن إرجاعها كقيمة من إجراء آخر.
- يجب الحذر من البيئات (Environments):
  - البرنامج الرئيسي يعمل في البيئة العامة (Global Environment).
  - كل استدعاء دالة يحصل على بيئة مؤقتة جديدة.
- هذا يتيح إنشاء شيفرة موجزة وسهلة القراءة.

## الشريحة 56: MITOpenCourseWare

https://ocw.mit.edu

مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.

للاطّلاع على كيفية الاستشهاد بهذه المواد أو على شروط الاستخدام: https://ocw.mit.edu/terms.
