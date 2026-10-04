---
book: mit-6100l
chapter: lecture-12
slug: notes
lang: ar
title: "المحاضرة 12: قوائم الفهم، والدوال ككائنات، والاختبار، وتصحيح الأخطاء"
---

# المحاضرة 12: قوائم الفهم (List Comprehensions)، والدوال ككائنات (Functions as Objects)، والاختبار (Testing)، وتصحيح الأخطاء (Debugging)

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-12-list-comprehension-functions-as-objects-testing-debugging/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec12_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec12.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec12_code_zip/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec12/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (47 شريحة)، بما في ذلك الشرائح التي تُبنى فيها الشيفرة خطوةً خطوة. أُبقيت الشيفرة كما هي بالإنجليزية دون تغيير؛ والنصوص التي كانت سطرًا سطرًا (trace) تُنقل إلى جداول قيم. الأشكال (diagrams) والمخططات لم تُضمَّن ولم يُخمَّن مضمونها.

## الشريحة 1: عنوان المحاضرة

- LIST COMPREHENSION, FUNCTIONS AS OBJECTS, TESTING, DEBUGGING
- (download slides and .py files to follow along)
- 6.100L Lecture 12 — Ana Bell

أي: «قوائم الفهم، والدوال ككائنات، والاختبار، وتصحيح الأخطاء»، مع تنويه بأن الشرائح وملفات `.py` متاحة للتنزيل لمتابعة الدرس عمليًا.

## الشريحة 2: عنوان القسم — قوائم الفهم (LIST COMPREHENSIONS)

شريحة عنوان للقسم الأول من المحاضرة.

## الشريحة 3: قوائم الفهم (LIST COMPREHENSIONS)

- تطبيق دالة (Applying a function) على كل عنصر في تتابع (sequence)، ثم إنشاء قائمة جديدة بهذه القيم، هو مفهوم شائع.
- مثال:

```python
def f(L):
    Lnew = []
    for e in L:
        Lnew.append(e**2)
    return Lnew
```

- توفّر Python طريقة مختصرة من سطر واحد للقيام بذلك، تُسمّى **قائمة الفهم (list comprehension)**:
  - تنشئ قائمة جديدة.
  - تطبّق دالة على كل عنصر في **كائن قابل للتكرار (iterable)** آخر.
  - اختياريًا: تطبَّق فقط على العناصر التي تحقّق اختبارًا (test) معيّنًا.

```text
[expression for elem in iterable if test]
```

## الشريحة 4: قوائم الفهم — forma مختصرة بلا شرط

نفس المثال السابق:

```python
def f(L):
    Lnew = []
    for e in L:
        Lnew.append(e**2)
    return Lnew
```

تُختصر في:

```python
Lnew = [e**2 for e in L]
```

## الشريحة 5: قوائم الفهم — إضافة الاختبار

الصيغة الموسَّعة: إنشاء قائمة جديدة بتطبيق دالة على كل عنصر في كائن قابل للتكرار آخر **يحقّق اختبارًا**:

```python
def f(L):
    Lnew = []
    for e in L:
        if e%2==0:
            Lnew.append(e**2)
    return Lnew
```

## الشريحة 6: قوائم الفهم — صيغة الاختبار داخل الأقواس

لاحظ أن الاختبار انتقل إلى **داخل الأقواس المربّعة**، في نهاية التعبير:

```python
Lnew = [e**2 for e in L if e%2==0]
```

## الشريحة 7: قوائم الفهم — تذكير الصيغة

تظهر صيغة الاختصار مرة أخرى إلى جانب الطريقتين الطويلتين (بشرط وبدون شرط):

- `Lnew = [e**2 for e in L]`
- `Lnew = [e**2 for e in L if e%2==0]`

## الشريحة 8: قوائم الفهم — المعنى المكافئ كدالة

هذه الشريحة تعطي **المعنى المكافئ** لقائمة الفهم: أي أنها تعادل استدعاء هذه الدالة، حيث `expression` هي دالة تحسب ذلك التعبير:

```python
def f(expr, old_list, test = lambda x: True):
    new_list = []
    for e in old_list:
        if test(e):
            new_list.append(expr(e))
    return new_list
```

مع أمثلة تنفيذية:

```python
[e**2 for e in range(6)]
# → [0, 1, 4, 9, 16, 25]

[e**2 for e in range(8) if e%2 == 0]
# → [0, 4, 16, 36]

[[e,e**2] for e in range(4) if e%2 != 0]
# → [[1,1], [3,9]]
```

## الشريحة 9: جربها بنفسك! (YOU TRY IT!)

- ما القيمة التي يُعيدها هذا التعبير؟

```python
[len(x) for x in ['xy', 'abcd', 7, '4.0'] if type(x) == str]
```

- الخطوات:
  1. الخطوة 1: ما كل القيم الموجودة في التتابع؟
  2. الخطوة 2: أي مجموعة جزئية من القيم يستبعدها الشرط؟
  3. الخطوة 3: طبّق الدالة على تلك القيم.

## الشريحة 10: عنوان القسم — الدوال: المعاملات الافتراضية (FUNCTIONS: DEFAULT PARAMETERS)

شريحة عنوان للقسم التالي.

## الشريحة 11: الجذر التربيعي بالبحث بالتنصيف (SQUARE ROOT with BISECTION)

نعود إلى دالة الجذر التربيعي بالبحث بالتنصيف التي كتبناها في محاضرات سابقة:

```python
def bisection_root(x):
    epsilon = 0.01
    low = 0
    high = x
    guess = (high + low)/2.0
    while abs(guess**2 - x) >= epsilon:
        if guess**2 < x:
            low = guess
        else:
            high = guess
        guess = (high + low)/2.0
    return guess

print(bisection_root(123))
```

## الشريحة 12: معامل آخر (ANOTHER PARAMETER)

- الدافع: نريد إجابة أدق (a more accurate answer).

```python
def bisection_root(x)
```

يمكن تحسينها.

- الخيارات؟

  - تغيير `epsilon` داخل الدالة (سيؤثّر في كل استدعاءات الدالة).
  - استخدام `epsilon` خارج الدالة (المتغيّرات العامة (global variables) سيّئة).
  - إضافة `epsilon` كوسيط (argument) للدالة.

## الشريحة 13: epsilon كمعامل (epsilon as a PARAMETER)

نُضيف `epsilon` إلى قائمة المعاملات:

```python
def bisection_root(x, epsilon):
    low = 0
    high = x
    guess = (high + low)/2.0
    while abs(guess**2 - x) >= epsilon:
        if guess**2 < x:
            low = guess
        else:
            high = guess
        guess = (high + low)/2.0
    return guess

print(bisection_root(123, 0.01))
```

## الشريحة 14: المعاملات المسمّاة (KEYWORD PARAMETERS) والقيم الافتراضية (DEFAULT VALUES)

```python
def bisection_root(x, epsilon)
```

يمكن تحسينها.

- أضفنا `epsilon` كوسيط للدالة.
- معظم الوقت نريد قيمة معيارية (standard value) وهي `0.01`.
- وأحيانًا قد نريد قيمة أخرى.

الحل: استخدم **معاملًا مسمّى (keyword parameter)** ويُعرف أيضًا بـ**المعامل الافتراضي (default parameter)**.

## الشريحة 15: epsilon كمعامل مسمّى (Epsilon as a KEYWORD PARAMETER)

```python
def bisection_root(x, epsilon=0.01):
    low = 0
    high = x
    guess = (high + low)/2.0
    while abs(guess**2 - x) >= epsilon:
        if guess**2 < x:
            low = guess
        else:
            high = guess
        guess = (high + low)/2.0
    return guess

print(bisection_root(123))

print(bisection_root(123, 0.5))
```

## الشريحة 16: قواعد المعاملات المسمّاة (RULES for KEYWORD PARAMETERS)

- في تعريف الدالة:
  - يجب أن تأتي المعاملات الافتراضية في النهاية (Default parameters must go at the end).

- هذه الاستدعاءات صحيحة:

```python
bisection_root_new(123)
bisection_root_new(123, 0.001)
bisection_root_new(123, epsilon=0.001)
bisection_root_new(x=123, epsilon=0.1)
bisection_root_new(epsilon=0.1, x=123)
```

- وهذه غير صحيحة:

```python
bisection_root_new(epsilon=0.001, 123)  # خطأ
bisection_root_new(0.001, 123)          # لا خطأ نحوي، لكنه خاطئ
```

في الاستدعاء الثاني غير الصحيح، القيمة `0.001` تذهب إلى المعامل `x` (because it is given positionally)، و`123` تذهب إلى `epsilon`، وهو عكس المقصود تمامًا.

## الشريحة 17: عنوان القسم — الدوال التي تُعيد دوالًا (FUNCTIONS RETURNING FUNCTIONS)

شريحة عنوان للقسم التالي.

## الشريحة 18: الكائنات داخل البرنامج (OBJECTS IN A PROGRAM)

تُظهر الشريحة أن في البرنامج أشياء من أنواع مختلفة: كائن دالة (function object) باسم `is_even`، وكائن عدد صحيح (int object) بقيمة `2` مرتبط بالاسم `r`، وكائن عدد عشري (float object) بقيمة `3.14285714` مرتبط بالاسم `pi`، وقيمتان منطقيّتان (boolean) `False` و`True` مرتبطتان بالاسمين `a` و`b`، وكائن دالة آخر مرتبط بالاسم `my_func`.

والشيفرة التي تُنتج ذلك:

```python
def is_even(i):
    return i%2 == 0

r = 2
pi = 22/7
my_func = is_even
a = is_even(3)
b = my_func(4)
```

## الشريحة 19: الدوال يمكن أن تُعيد دوالًا (FUNCTIONS CAN RETURN FUNCTIONS)

```python
def make_prod(a):
    def g(b):
        return a*b
    return g

val = make_prod(2)(3)

doubler = make_prod(2)

print(val)

val = doubler(3)
print(val)
```

انتبه إلى الشيفرة `make_prod(2)(3)`: نستدعي `make_prod` أولًا فتحصل على **كائن دالة**، ثم نستدعي هذا الكائن فورًا بالمعامل `3`.

## الشريحة 20: تفاصيل النطاق للطريقة الأولى (SCOPE DETAILS FOR WAY 1)

```python
def make_prod(a):
    def g(b):
        return a*b
    return g

val = make_prod(2)(3)
print(val)
```

## الشريحة 21: تفاصيل النطاق للطريقة الأولى — النطاق العام

الشريحة نفسها، ومعها الرسم الأول: **النطاق العام (Global scope)** يحتوي على الكائن `make_prod`، ويحتوي أيضًا على «بعض الشيفرة» (Some code) هي `val = make_prod(2)(3)` و`print(val)`.

**ملاحظة المترجم:** الرسم في الشريحة يوضّح عملية استدعاء الدالة وإطار النطاق (stack frame) الذي تنشئه؛ النص المستخرَج من الملف لا يحفظ مواضع الأسهم، فذكرناLambdas الشريحة وصفًا لا شكلًا.

## الشريحة 22: تفاصيل النطاق للطريقة الأولى — نطاق make_prod

تظهر في الرسم **نطاق make_prod (make_prod scope)** إلى جانب النطاق العام، وهو الإطار الذي أُنشئ عند تنفيذ `make_prod(2)`.

## الشريحة 23: تفاصيل النطاق للطريقة الأولى — g مرتبطة داخل نطاق make_prod

الشريحة نفسها بتفصيل أكثر، وتنصّ على ما يلي:

- تعريف `g` يتم **داخل نطاق** `make_prod`، لذا فإن ربط (binding) الاسم `g` يقع داخل ذلك الإطار/النطاق.
- ولأن `g` مرتبطة في هذا الإطار، فلا يمكن الوصول إليها بالتقييم داخل الإطار العام.
- يمكن الوصول إلى `g` فقط **داخل الاستدعاء لـ `make_prod`**، وكل استدعاء يُنشئ نسخة داخلية جديدة من `g`.

## الشريحة 24: تفاصيل النطاق للطريقة الأولى — استدعاء make_prod(2) يُعيد دالة مجهولة

نصّ الشريحة: تقييم `make_prod(2)` قد أعاد **procedure مجهولة (anonymous procedure)**، أي مؤشّرًا إلى شيفرة `g`.

## الشريحة 25: تفاصيل النطاق للطريقة الأولى — المؤشّر إلى شيفرة g

نصّ الشريحة: «يعيد مؤشّرًا إلى شيفرة `g`» (Returns pointer to g code).

## الشريحة 26: تفاصيل النطاق للطريقة الأولى — نطاق g

الشريحة نفسها، ومعها **نطاق g (g scope)** الذي تظهر فيه `b` بقيمة `3`. وتوجد في الشريحة ملاحظتان مهمّتان:

- كيف تحصل `g` على قيمة `a`؟
- يستطيع المُفسِّر (interpreter) أن يصعد في تسلسل الإطارات (hierarchy of frames) ليرى قيمتَي `b` و`a` معًا.

## الشريحة 27: تفاصيل النطاق للطريقة الثانية (SCOPE DETAILS FOR WAY 2)

نفس الدالة، لكن الاستدعاء مكتوب على خطوتين منفصلتين:

```python
def make_prod(a):
    def g(b):
        return a*b
    return g

doubler = make_prod(2)
val = doubler(3)
print(val)
```

الفرق الجوهري: في الشريحة `val` صارت الآن تشير إلى نتيجة الاستدعاء الثاني (`doubler(3)`) لا إلى نتيجة الاستدعاء المتسلسل.

## الشريحة 28: تفاصيل النطاق للطريقة الثانية — بعد `doubler = make_prod(2)`

الشريحة نفسها، ومعها الرسم الذي فيه:

- النطاق العام (Global scope): فيه `make_prod` و«بعض الشيفرة» واسم `doubler`.
- نطاق `make_prod` (make_prod scope): فيه `a` بقيمة `2` وشيفرة `g`.

## الشريحة 29: تفاصيل النطاق للطريقة الثانية — النطاق العام كاملًا

الشريحة نفسها مع توضيح شيفرة النطاق العام كاملة:

```python
doubler = make_prod(2)
val = doubler(3)
print(val)
```

## الشريحة 30: تفاصيل النطاق للطريقة الثانية — نطاق doubler

الشريحة نفسها، ومعها **نطاق doubler (doubler scope)** الذي تظهر فيه `b` بقيمة `3`، ويظهر فيه أيضًا `val`، ونصّها: «يعيد قيمة» (Returns value).

**ملاحظة المترجم:** الرسم هنا يُظهر أن نطاق الاستدعاء الثاني هو **`doubler`** لا `g`: أي أن الإطار الذي أنشئه `doubler(3)` يحمل اسم الكائن الدالة الذي استُدعي، وهذا ما يفسّر لماذا لا يظهر اسم `g` في الرسم. أما الوصول إلى `a` فيبقى بالتصعيد في تسلسل الإطارات كما في الشريحة 26.

## الشريحة 31: لماذا نُعيد الدوال أصلًا؟ (WHY BOTHER RETURNING FUNCTIONS?)

- يمكن إعادة كتابة الشيفرة دون إعادة كائنات دوال.
- تصميم برمجيات جيد (Good software design).
- تبنّي أفكار التفكيك (decomposition) والتجريد (abstraction).
- أداة أخرى لبناء بنية الشيفرة.
- قطع التنفيذ (Interrupting execution):
  - مثال على تدفّق التحكم (control flow).
  - وسيلة لتحقيق تنفيذ جزئي واستخدام النتيجة في مكان آخر **قبل** إتمام التقييم الكامل.

## الشريحة 32: عنوان القسم — الاختبار وتصحيح الأخطاء (TESTING and DEBUGGING)

شريحة عنوان للقسم الأخير.

## الشريحة 33: ثلاثة أعمدة: البرمجة الدفاعية، الاختبار/التحقّق، تصحيح الأخطاء

العمود الأول — **البرمجة الدفاعية (DEFENSIVE PROGRAMMING)**:
- اكتب مواصفات (specifications) للدوال.
- فكّك البرنامج إلى وحدات (modularize programs).
- افحص شروط المدخلات والمخرجات (تأكيدات — assertions).

العمود الثاني — **الاختبار/التحقّق (TESTING/VALIDATION)**:
- قارن أزواج المدخلات/المخرجات بالمواصفة.
- «لا يعمل!»
- «كيف أكسر برنامجي؟»

العمود الثالث — **تصحيح الأخطاء (DEBUGGING)**:
- ادرس الأحداث التي أدّت إلى الخطأ.
- «لماذا لا يعمل؟»
- «كيف أصلح برنامجي؟»

## الشريحة 34: هيّئ نفسك لتسهيل الاختبار وتصحيح الأخطاء (SET YOURSELF UP FOR EASY TESTING AND DEBUGGING)

- ابدأ من الأول: صمّم الشيفرة لتسهّل هذه المرحلة.
- قسّم البرنامج إلى وحدات (modules) يمكن اختبارها وتصحيحها كلٌّ على حدة.
- وثّق القيود (constraints) على الوحدات:
  - ما المدخل الذي تتوقعه؟
  - ما المخرج الذي تتوقعه؟
- وثّق الافتراضات (assumptions) الكامنة وراء تصميم الشيفرة.

## الشريحة 35: متى تكون جاهزًا للاختبار؟ (WHEN ARE YOU READY TO TEST?)

- تأكّد أن الشيفرة تعمل:
  - أزل أخطاء الصياغة (syntax errors).
  - أزل أخطاء المعنى الساكنة (static semantic errors).
  - يستطيع مُفسِّر Python عادةً أن يجد هذين النوعين نيابةً عنك.
- جهّز مجموعة نتائج متوقّعة:
  - مجموعة مدخلات.
  - لكل مدخل، المخرج المتوقّع.

## الشريحة 36: أصناف الاختبارات (CLASSES OF TESTS)

- **اختبار الوحدات (Unit testing)**:
  - تحقّق من كل قطعة في البرنامج.
  - اختبار كل دالة على حدة.
- **اختبار الانحدار (Regression testing)**:
  - أضف اختبارًا لكل خطأ تكتشفه.
  - التقط الأخطاء التي أُعيد إدخالها بعد إصلاحها سابقًا.
- **اختبار التكامل (Integration testing)**:
  - هل يعمل البرنامج ككل؟
  - عادةً ما نُسرع إلى.package هذا النوع.

## الشريحة 37: أساليب الاختبار (TESTING APPROACHES)

- الحدس بشأن الحدود الطبيعية للمشكلة:

```python
def is_bigger(x, y):
    """ Assumes x and y are ints
    Returns True if y is less than x, else False """
```

  - هل تستطيع أن تأتي ببعض التقسيمات الطبيعية؟
- إن لم توجد تقسيمات طبيعية، يمكن إجراء **اختبار عشوائي (random testing)**:
  - احتمال صحة الشيفرة يزداد مع زيادة عدد الاختبارات.
  - هناك خيارات أفضل ( فيما يلي).
- **الاختبار الصندوق الأسود (Black box testing)**:
  - استكشف المسارات عبر المواصفة.
- **الاختبار الصندوق الزجاجي (Glass box testing)**:
  - استكشف المسارات عبر الشيفرة.

## الشريحة 38: الاختبار الصندوق الأسود (BLACK BOX TESTING)

```python
def sqrt(x, eps):
    """ Assumes x, eps floats, x >= 0, eps > 0
    Returns res such that x-eps <= res*res <= x+eps """
```

- مصمَّم دون النظر في الشيفرة.
- يمكن أن يقوم به شخص غير منفِّذ (implementer) لتجنّب بعض تحيّزات المنفّذ.
- يمكن إعادة استخدام الاختبار إذا تغيّرت النسخة المنفَّذة.
- المسارات عبر المواصفة:
  - ابنِ حالات اختبار في تقسيمات المكان الطبيعية المختلفة.
  - راعِ أيضًا **حالات الحدّ (boundary conditions)**: قوائم فارغة، قائمة بعنصر واحد، أعداد كبيرة، أعداد صغيرة.

## الشريحة 39: الاختبار الصندوق الأسود — جدول الحالات

| الحالة | x | eps |
|---|---|---|
| الحدّ (boundary) | `0` | `0.0001` |
| مربع كامل (perfect square) | `25` | `0.0001` |
| أصغر من 1 (less than 1) | `0.05` | `0.0001` |
| جذر تربيعي غير ناطق (irrational square root) | `2` | `0.0001` |
| التطرف (extremes) | `2` | `1.0/2.0**64.0` |
| التطرف | `1.0/2.0**64.0` | `1.0/2.0**64.0` |
| التطرف | `2.0**64.0` | `1.0/2.0**64.0` |
| التطرف | `1.0/2.0**64.0` | `2.0**64.0` |
| التطرف | `2.0**64.0` | `2.0**64.0` |

**ملاحظة المترجم:** أُعيد ترتيب صفوف الجدول لتطابق تسلسل «الحالة» و«x» و«eps»؛ فالنص المستخرَج فصل الأعمدة الثلاثة عن بعضها، وجاء العمود `x` بعد العمود `eps` فيبتل الترتيب.

## الشريحة 40: الاختبار الصندوق الزجاجي (GLASS BOX TESTING)

- استخدم الشيفرة نفسها لتوجيه تصميم حالات الاختبار.
- يُسمّى **كامل المسارات (path-complete)** إذا اختُبر كل مسار محتمل عبر الشيفرة مرة واحدة على الأقل.
- ما بعض عيوب هذا النوع من الاختبار؟
  - قد يمرّ عبر الحلقات عددًا عشوائيًا من المرات.
  - مسارات مفقودة (Missing paths).
- إرشادات:
  - الفروع (Branches).
  - حلقات `for`.
  - حلقات `while`.

## الشريحة 41: الاختبار الصندوق الزجاجي — اختبار كامل المسارات قد يفوّت خطأً

```python
def abs(x):
    """ Assumes x is an int
    Returns x if x>=0 and –x otherwise """
    if x < -1:
        return –x
    else:
        return x
```

- قد تفوّت مجموعة اختبار كاملة المسارات خطأً.
- مجموعة اختبار كاملة المسارات: `2` و`-2`.
- لكن `abs(-1)` يُعيد خطأً `-1` بدل `1`.
- لذلك يجب أن تختبر حالات الحدّ (boundary cases) رغم ذلك.

## الشريحة 42: تصحيح الأخطاء (DEBUGGING)

- بمجرّد أن تكتشف أن شيفرتك لا تعمل بشكل صحيح، تريد أن:
  - تعزل الأخطاء (Isolate the bug(s)).
  - تقضي على الأخطاء (Eradicate the bug(s)).
  - تعيد الاختبار حتى تعمل الشيفرة صحيحًا في كل الحالات.
- منحنى تعلّم شديد الانحدار (Steep learning curve).
- الهدف: برنامج خالٍ من الأخطاء.
- الأدوات:
  - مدمجة في IDLE و Anaconda.
  - Python Tutor.
  - تعليمة `print`.
  - استخدم عقلك، وكن منهجيًا في مطاردتك للخطأ.

## الشريحة 43: رسائل الأخطاء — السهلة (ERROR MESSAGES – EASY)

- محاولة الوصول إلى ما وراء حدود قائمة (Trying to access beyond the limits of a list):

```python
test = [1,2,3]
test[4]
```

  - ← `IndexError`

- محاولة تحويل نوع غير مناسب (Trying to convert an inappropriate type):

```python
int(test)
```

  - ← `TypeError`

- الإشارة إلى متغيّر غير موجود (Referencing a non-existent variable):

```python
a
```

  - ← `NameError`

- الخلط بين أنواع البيانات دون تحويل مناسب (Mixing data types without appropriate coercion):

```python
'3'/4
```

  - ← `TypeError`

- نسيان إغلاق قوس أو علامة اقتباس (Forgetting to close parenthesis, quotation, etc.):

```python
a = len([1,2,3]
print(a)
```

  - ← `SyntaxError`

**ملاحظة المترجم:** الشيفرة أعلاه ناقصة القوس بالعمد، وهذا هو مثال الخطأ الذي تعرضه الشريحة نفسها، فلم أُكمله.

## الشريحة 44: الأخطاء المنطقية — الصعبة (LOGIC ERRORS - HARD)

- فكّر قبل أن تكتب شيفرة جديدة (think before writing new code).
- ارسم صورًا، وخذ استراحة (draw pictures, take a break).
- اشرح الشيفرة:
  - لشخص آخر.
  - أو لـ«بطة مطاطية» (a rubber ducky).

## الشريحة 45: خطوات تصحيح الأخطاء (DEBUGGING STEPS)

- ادرس شيفرة البرنامج:
  - لا تسأل: ما الخطأ؟
  - اسأل: كيف وصلت إلى هذه النتيجة غير المتوقّعة؟
  - هل هو جزء من عائلة (family) من الأخطاء؟
- **المنهج العلمي (The scientific method)**:
  - ادرس البيانات المتاحة.
  - صُغ فرضية (Form hypothesis).
  - نفّذ تجارب قابلة للتكرار (Repeatable experiments).
  - اختر أبسط مدخل للاختبار به.

## الشريحة 46: تعليمة print (PRINT STATEMENTS)

- طريقة جيدة لاختبار الفرضية.
- متى نطبع؟
  - عند دخول الدالة.
  - المعاملات (Parameters).
  - نتائج الدالة.
- استخدم **طريقة التنصيف (bisection method)**:
  - ضع `print` في منتصف الشيفرة.
  - قرّر أين قد يكون الخطأ بحسب القيم.

## الشريحة 47: MIT OpenCourseWare

شريحة الختام: شعار MIT OpenCourseWare مع الروابط الرسمية:

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- للاستفسار عن كيفية الاستشهاد بهذه المواد أو عن شروط الاستخدام، زر <https://ocw.mit.edu/terms>