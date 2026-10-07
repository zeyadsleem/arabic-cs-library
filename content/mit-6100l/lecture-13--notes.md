---
book: mit-6100l
chapter: lecture-13
slug: notes
lang: ar
title: "المحاضرة 13: الاستثناءات والتأكيدات"
---

# المحاضرة 13: الاستثناءات (Exceptions) والتأكيدات (Assertions)

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-13-exceptions-assertions/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec13.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13_code_py/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec13/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (24 شريحة)، مع إبقاء الشيفرة والتوثيق (docstrings) كما هي بالإنجليزية. المواضع التي يعرض فيها النص المستخرَج عمودين متجاورين (الشيفرة «قبل» والشيفرة «بعد») نُقلت إلى كتلتين منفصلتين. الأشكال والمخططات لم تُضمَّن.

## الشريحة 1: عنوان المحاضرة

- EXCEPTIONS, ASSERTIONS
- (download slides and .py files to follow along)
- 6.100L Lecture 13 — Ana Bell

## الشريحة 2: عنوان القسم — الاستثناءات (EXCEPTIONS)

شريحة عنوان للقسم الأول.

## الشريحة 3: الحالات غير المتوقّعة (UNEXPECTED CONDITIONS)

- ماذا يحدث عندما يصطدم تنفيذ إجراء (procedure) بحالة غير متوقّعة؟
- تحصل على **استثناء (exception)**… أي حالة لم تكن متوقّعة:

```python
test = [1,7,4]
test[4]
```

← `IndexError`

```python
int(test)
```

← `TypeError`

```python
a
```

← `NameError`

```python
'a'/4
```

← `TypeError`

- الحالات الأربع ناتجة عن:
  - محاولة الوصول إلى ما وراء حدود القائمة.
  - محاولة تحويل نوع غير مناسب.
  - الإشارة إلى متغيّر غير موجود.
  - الخلط بين أنواع البيانات دون تحويل (coercion).

## الشريحة 4: معالجة الاستثناءات (HANDLING EXCEPTIONS)

- عادةً ما يؤدّي الاستثناء إلى حدوث خطأ وتوقّف التنفيذ.
- يمكن لشيفرة Python أن توفّر **معالجات (handlers)** للاستثناءات:

```python
try:
    # do some potentially
    # problematic code
except:
    # do something to
    # handle the problem
```

وهو مقابل بنية `if/else` المعتادة:

```python
if <all potentially problematic code succeeds>:
    # great, all that code
    # just ran fine!
else:
    # do something to
    # handle the problem
```

- إذا نجحت كل التعابير داخل كتلة `try`:
  - يستمرّ التقييم بالشيفرة التي تأتي **بعد** كتلة `except`.
- الاستثناءات التي ترفعها أي عبارة (statement) في جسم `try` تتولّاها عبارة `except`:
  - يستمرّ التنفيذ بجسم عبارة `except`،
  - ثم تُنفَّذ التعابير الأخرى بعد تلك الكتلة من الشيفرة.

## الشريحة 5: مثال على شيفرة رأيتها من قبل (EXAMPLE with CODE YOU MIGHT HAVE ALREADY SEEN)

- دالة تجمع أرقام (digits) في سلسلة (string).
- تُعرض الشيفرة مرّتين: أولًا كما رأيناها من قبل، ثم بعد إضافة الاستثناءات.

**أولًا: الشيفرة كما رأيناها من قبل:**

```python
def sum_digits(s):
    """ s is a non-empty string
        containing digits.
        Returns sum of all chars that
        are digits """
    total = 0
    for char in s:
        if char in '0123456789':
            val = int(char)
            total += val
    return total
```

**ثانيًا: الشيفرة مع الاستثناءات:**

```python
def sum_digits(s):
    """ s is a non-empty string
        containing digits.
        Returns sum of all chars that
        are digits """
    total = 0
    for char in s:
        try:
            val = int(char)
            total += val
        except:
            print("can't convert", char)
    return total
```

## الشريحة 6: مدخلات المستخدم قد تؤدّي إلى استثناءات (USER INPUT CAN LEAD TO EXCEPTIONS)

- قد يُدخل المستخدم حرفًا `:(` — أو قد يجعل `b` يساوي صفرًا `:(`:

```python
a = int(input("Tell me one number:"))
b = int(input("Tell me another number:"))
print(a/b)
```

- الحل: استخدم `try/except` حول الشيفرة المُعطِّلة:

```python
try:
    a = int(input("Tell me one number:"))
    b = int(input("Tell me another number:"))
    print(a/b)
except:
    print("Bug in user input.")
```

## الشريحة 7: معالجة استثناءات محدّدة (HANDLING SPECIFIC EXCEPTIONS)

- اجعل لكل نوع من الاستثناءات عبارة `except` منفصلة:

```python
try:
    a = int(input("Tell me one number: "))
    b = int(input("Tell me another number: "))
    print("a/b = ", a/b)
    print("a+b = ", a+b)
except ValueError:
    print("Could not convert to a number.")
except ZeroDivisionError:
    print("Can't divide by zero")
    print("a/b = infinity")
    print("a+b =", a+b)
except:
    print("Something went very wrong.")
```

انتبه إلى أن `print("a+b =", a+b)` مكرّر مرّتين: مرّة داخل جسم معالج `ValueError` (لأن جمع `a+b` هو ما يمكن أن يفشل في التحويل)، ومرّة داخل جسم معالج `ZeroDivisionError` (لأن القسمة وحدها هي التي تفشل عند القسمة على صفر، بينما يظل الجمع صحيحًا).

## الشريحة 8: كتل أخرى مرتبطة بكتلة `try` (OTHER BLOCKS ASSOCIATED WITH A TRY BLOCK)

- `else`:
  - يُنفَّذ جسمها عندما يكتمل تنفيذ جسم `try` المرتبط بها **دون أي استثناء**.
- `finally`:
  - يُنفَّذ جسمها **دائمًا** بعد عبارات `try` و`else` و`except`، حتى لو رفعت هي نفسها خطأً آخر أو نفّذت `break` أو `continue` أو `return`.
  - مفيدة لشيفرة التنظيف (clean-up) التي يجب أن تعمل مهما حدث شيء آخر (مثل إغلاق ملف).
- من المفيد أن تعرف أنها موجودة، لكننا لا نستخدمها فعليًا في هذه المادة.

## الشريحة 9: ماذا نفعل بالاستثناءات؟ (WHAT TO DO WITH EXCEPTIONS?)

- ماذا نفعل عندما نواجه خطأً؟
- **الفشل صامتًا (Fail silently)**:
  - استبدل بقيم افتراضية أو تابع فقط.
  - فكرة سيّئة! المستخدم لا يحصل على أي تحذير.
- **إعادة قيمة «خطأ» (Return an "error" value)**:
  - أي قيمة نختار؟
  - يُعقّب الشيفرة لأنها يجب أن تتحقّق من قيمة خاصة.
- **إيقاف التنفيذ، والإشارة إلى حالة الخطأ (Stop execution, signal error condition)**:
  - في Python: ارفع استثناءً (raise an exception).

```python
raise ValueError("something is wrong")
```

## الشريحة 10: مثال على شيفرة رأيتها من قبل (EXAMPLE with SOMETHING YOU’VE ALREADY SEEN)

- دالة تجمع أرقامًا (digits) في سلسلة (string).
- إيقاف التنفيذ يعني أن النتيجة السيّئة لا تنتشر (are not propagated).

```python
def sum_digits(s):
    """ s is a non-empty string containing digits.
    Returns sum of all chars that are digits """
    total = 0
    for char in s:
        try:
            val = int(char)
            total += val
        except:
            raise ValueError("string contained a character")
    return total
```

## الشريحة 11: جربها بنفسك! (YOU TRY IT!)

```python
def pairwise_div(Lnum, Ldenom):
    """ Lnum and Ldenom are non-empty lists of equal lengths containing numbers
    Returns a new list whose elements are the pairwise
    division of an element in Lnum by an element in Ldenom.
    Raise a ValueError if Ldenom contains 0. """
    # your code here

# For example:
L1 = [4,5,6]
L2 = [1,2,3]
# print(pairwise_div(L1, L2))

# prints [4.0,2.5,2.0]

L1 = [4,5,6]
L2 = [1,0,3]
# print(pairwise_div(L1, L2))

# raises a ValueError
```

## الشريحة 12: عنوان القسم — التأكيدات (ASSERTIONS)

شريحة عنوان للقسم الثاني.

## الشريحة 13: التأكيدات: أداة برمجة دفاعية (ASSERTIONS: DEFENSIVE PROGRAMMING TOOL)

- نريد التأكّد من أن الافتراضات حول حالة الحساب (state of computation) كما هو متوقّع.
- استخدم عبارة `assert` لترفع استثناء `AssertionError` إذا لم تتحقّق الافتراضات:

```python
assert <statement that should be true>, "message if not true"
```

- هذا مثال على برمجة دفاعية جيدة.
- التأكيدات لا تسمح للمبرمج بالتحكّم في الاستجابة للحالات غير المتوقّعة.
- تأكّد من أن التنفيذ يتوقّف كلما لم تتحقّق حالة متوقّعة.
- تُستخدم عادةً للتحقّق من مداخل الدوال، لكن يمكن استخدامها في أي مكان.
- يمكن استخدامها للتحقّق من مخرجات الدالة تفاديًا لانتشار قيم سيّئة.
- يمكن أن تجعل تحديد مصدر الخطأ (bug) أسهل.

## الشريحة 14: مثال على شيفرة رأيتها من قبل (EXAMPLE with SOMETHING YOU’VE ALREADY SEEN)

- دالة تجمع أرقامًا في سلسلة **غير فارغة** (NON-EMPTY).
- إيقاف التنفيذ يعني أن النتيجة السيّئة لا تنتشر.

```python
def sum_digits(s):
    """ s is a non-empty string containing digits.
    Returns sum of all chars that are digits """
    assert len(s) != 0, "s is empty"
    total = 0
    for char in s:
        try:
            val = int(char)
            total += val
        except:
            raise ValueError("string contained a character")
```

## الشريحة 15: جربها بنفسك! (YOU TRY IT!)

```python
def pairwise_div(Lnum, Ldenom):
    """ Lnum and Ldenom are non-empty lists of equal lengths
    containing numbers
    Returns a new list whose elements are the pairwise
    division of an element in Lnum by an element in Ldenom.
    Raise a ValueError if Ldenom contains 0. """
    # add an assert line here
```

## الشريحة 16: مثال آخر (ANOTHER EXAMPLE)

شريحة عنوان قصيرة تمهّد للمثال الطويل التالي. لم تُضمَّن صورتها.

## الشريحة 17: مثال أطول على الاستثناءات والتأكيدات (LONGER EXAMPLE OF EXCEPTIONS and ASSERTIONS)

- نفترض أننا أعطينا **قائمة فصل** (class list) لمادة دراسية: كل مُدخَل فيها قائمة من جزأين:
  - قائمة من الاسم الأول واسم العائلة لطالبة أو طالب.
  - قائمة من درجات الواجبات.
- سننشئ قائمة فصل جديدة، يُضاف فيها **المتوسّط (average)** في النهاية.

الشيفرة التي ستُعالَج:

```python
test_grades = [[['peter', 'parker'], [80.0, 70.0, 85.0]],
               [['bruce', 'wayne'], [100.0, 80.0, 74.0]]]
```

والنتيجة المطلوبة:

```python
[['peter', 'parker'], [80.0, 70.0, 85.0], 78.33333],
[['bruce', 'wayne'], [100.0, 80.0, 74.0], 84.666667]
```

## الشريحة 18: الشيفرة (EXAMPLE CODE)

```python
test_grades = [[['peter', 'parker'], [80.0, 70.0, 85.0]],
               [['bruce', 'wayne'], [100.0, 80.0, 74.0]]]

def get_stats(class_list):
    new_stats = []
    for stu in class_list:
        new_stats.append([stu[0], stu[1], avg(stu[1])])
    return new_stats

def avg(grades):
    return sum(grades)/len(grades)
```

## الشريحة 19: خطأ إذا لم تكن هناك درجات لطالبة أو طالب (ERROR IF NO GRADE FOR A STUDENT)

- إذا كان أحد الطلبة (أو أكثر) لا يملك أي درجات، نحصل على خطأ:

```python
test_grades = [[['peter', 'parker'], [10.0,55.0,85.0]],
               [['bruce', 'wayne'], [10.0,80.0,75.0]],
               [['captain', 'america'], [80.0,10.0,96.0]],
               [['deadpool'], []]]
```

- نحصل على `ZeroDivisionError: float division by zero`، لأننا نحاول تنفيذ `return sum(grades)/len(grades)` والمقام يساوي صفرًا.

## الشريحة 20: الخيار 1: وسم الخطأ بطباعة رسالة (OPTION 1: FLAG THE ERROR BY PRINTING A MESSAGE)

- نقرّر أن نُشعر بأن شيئًا ما حدث خطأ برسالة (msg):

```python
def avg(grades):
    try:
        return sum(grades)/len(grades)
    except ZeroDivisionError:
        print('warning: no grades data')
```

- التشغيل على بيانات الاختبار نفسها يُعطي:

```text
warning: no grades data
[['peter', 'parker'], [10.0, 55.0, 85.0], 50.0],
[['bruce', 'wayne'], [10.0, 80.0, 75.0], 55.0],
[['captain', 'america'], [80.0, 10.0, 96.0], 62.0],
[['deadpool'], [], None]]
```

لاحظ أن الخانة الأخيرة صارت `None`: لأن الدالة `avg` لا تحتوي على `return` في حالة الاستثناء، وإلا فإنها تعيد `None` تلقائيًا.

## الشريحة 21: الخيار 2: تغيير السياسة (OPTION 2: CHANGE THE POLICY)

- نقرّر أن من لا توجد له درجات يحصل على صفر:

```python
def avg(grades):
    try:
        return sum(grades)/len(grades)
    except ZeroDivisionError:
        print('warning: no grades data')
        return 0.0
```

- التشغيل على بيانات الاختبار نفسها يُعطي:

```text
warning: no grades data
[['peter', 'parker'], [10.0, 55.0, 85.0], 50.0],
[['bruce', 'wayne'], [10.0, 80.0, 75.0], 55.0],
[['captain', 'america'], [80.0, 10.0, 96.0], 62],
[['deadpool'], [], 0.0]]
```

**ملاحظة المترجم:** في النص الأصلي للشرائح ظهر `62` في العمود الثالث بينما ظهر `62.0` في الشريحة السابقة؛ والقيمتان متساويتان عدديًا، والفرق في طريقة العرض لا في المعنى.

## الشريحة 22: الخيار 3: إيقاف التنفيذ إذا لم تتحقّق التأكيد (OPTION 3: HALT EXECUTION IF ASSERT IS NOT MET)

```python
def avg(grades):
    assert len(grades) != 0, 'no grades data'
    return sum(grades)/len(grades)
```

- يرفع `AssertionError` إذا أعطي قائمة فارغة، ويطبع نص الرسالة، ويوقف التنفيذ.
- وفي غير هذه الحالة يعمل كالمعتاد.

## الشريحة 23: التأكيدات مقابل الاستثناءات (ASSERTIONS vs. EXCEPTIONS)

- الهدف هو اكتشاف الأخطاء (bugs) بمجرّد ظهورها، وجعل موضع حدوثها واضحًا.
- **الاستثناءات (Exceptions)** توفّر وسيلة لمعالجة المدخلات غير المتوقّعة:
  - استخدمها حين لا تحتاج إلى إيقاف تنفيذ البرنامج.
  - ارفع استثناءً إذا زوّد المستخدم ببيانات إدخال سيّئة.
- **التأكيدات (Assertions)**:
  - تفرض شروطًا على «عقد» (contract) بين المبرمج والمستخدم.
  - مُكمّل للاختبار (testing).
  - للتحقّق من أنواع الوسائط أو القيم.
  - للتحقّق من تحقّق ثوابت (invariants) بنى البيانات.
  - للتحقّق من قيود قيم الإرجاع.
  - للتحقّق من مخالفة قيود الإجراء (مثل: لا تكرارات في قائمة).

## الشريحة 24: MIT OpenCourseWare

شريحة الختام: شعار MIT OpenCourseWare مع الروابط الرسمية:

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- للاستفسار عن كيفية الاستشهاد بهذه المواد أو عن شروط الاستخدام، زر <https://ocw.mit.edu/terms>