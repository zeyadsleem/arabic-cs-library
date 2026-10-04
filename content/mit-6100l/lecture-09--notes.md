---
book: mit-6100l
chapter: lecture-09
slug: notes
lang: ar
title: "المحاضرة 9: دوال Lambda، والصفوف (Tuples)، والقوائم (Lists)"
---

# المحاضرة 9: دوال Lambda، والصفوف (Tuples)، والقوائم (Lists)

## المصادر والنسبة والترخيص

المادة الأصلية: **آنا بيل (Ana Bell)**، **MIT OpenCourseWare (MIT OCW)**، معهد ماساتشوستس للتكنولوجيا، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، **خريف 2022 (Fall 2022)**.

- [صفحة المحاضرة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-9-lambda-functions-tuples-and-lists/).
- [صفحة الشرائح الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec09_pdf/).
- [ملف الشرائح الأصلي، PDF](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec09.pdf).
- [ملف شيفرة المحاضرة الأصلي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec09_code.py).
- [تفريغ المحاضرة على OCW](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec09/) (النسخة الإنجليزية الرسمية).

هذه ترجمة وتكييف عربي غير رسمي وفق [رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. [شروط الاستخدام والاستشهاد](https://ocw.mit.edu/terms/).

**منهج الترجمة:** لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. شرائح تتبّع البيئة (Environment) تتكرّر فيها الشيفرة نفسها مع جداول جديدة؛ نُقلت كل شريحة على حدة مع جدولها. الشرائح التي تبني الشيفرة تدريجيًّا نُقلت إلى جداول تحافظ على تسلسلها. الشيفرة والشفرة الوهمية محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات.

## الشريحة 1: دوال Lambda والصفوف والقوائم (Lambda Functions, Tuples and Lists)

نزّل الشرائح وملفات `.py` لمتابعة الشرح.

6.100L، المحاضرة 9 — آنا بيل (Ana Bell).

## الشريحة 2: من المحاضرة السابقة (From last time)

```python
def apply(criteria,n):
    """
    * criteria: function that takes in a number and returns a bool
    * n: an int
    Returns how many ints from 0 to n (inclusive) match the
    criteria (i.e. return True when run with criteria) """
    count = 0
    for i in range(n+1):
        if criteria(i):
            count += 1
    return count

def is_even(x):
    return x%2==0

print(apply(is_even,10))
```

## الشريحة 3: الدوال المجهولة (Anonymous Functions)

- أحيانًا لا نريد تسمية الدوال، خصوصًا البسيطة منها. هذه الدالة مثال جيد:

```python
def is_even(x):
    return x%2==0
```

- يمكن استعمال إجراء مجهول (Anonymous Procedure) باستخدام `lambda`:

```python
lambda x: x%2 == 0
```

| الجزء | المقابل في صيغة `def` |
| --- | --- |
| `x` | المعامل (Parameter) |
| `x%2 == 0` | جسم دالة `lambda` (Body of Lambda) |
| — | لا توجد الكلمة المفتاحية `return` (Note no `return` keyword) |

- تنشئ `lambda` كائن إجراء أو دالة، لكنها ببساطة **لا تربط به اسمًا**.

## الشريحة 4: الدوال المجهولة — الاستدعاء

- استدعاء دالة باسمها:

```python
apply( is_even , 10 )
```

- استدعاء دالة بدالة مجهولة كوسيط:

```python
apply( lambda x: x%2 == 0 , 10 )
```

- دالة `lambda` للاستعمال مرة واحدة (One-Time Use). لا يمكن إعادة استعمالها لأنها بلا اسم!

## الشريحة 5: جرّب بنفسك! (YOU TRY IT!)

ماذا يطبع هذا؟

```python
def do_twice(n, fn):
    return fn(fn(n))

print(do_twice(3, lambda x: x**2))
```

## الشريحة 6: جرّب بنفسك! — البيئة العامة (Global environment)

الشيفرة نفسها، وجدول البيئة العامة:

| الاسم | ملاحظات |
| --- | --- |
| `do_twice` | function object |

## الشريحة 7: جرّب بنفسك! — بيئة `do_twice`

الشيفرة نفسها، وأُنشئت بيئة جديدة اسمها `do_twice environment` وطابِقت المعاملات الصورية:

| البيئة | الاسم | القيمة |
| --- | --- | --- |
| Global environment | `do_twice` | function object |
| do_twice environment | `n` | `3` |
| do_twice environment | `fn` | `lambda x: x**2` |

## الشريحة 8: جرّب بنفسك! — تنفيذ الاستدعاء الداخلي الأول

الشيفرة نفسها، وجداول الشريحة 7، وقد ظهر اسم جديد:

| البيئة | الاسم | القيمة |
| --- | --- | --- |
| do_twice environment | — | `lambda x: x**2` environment — بيئتان جديدتان متطابقتان |
| do_twice environment | — | `x` في كلٍّ منهما قيمته `???` |

## الشريحة 9: جرّب بنفسك! — تغيّر قيمة `x`

الشيفرة نفسها. صار في كل من بيئتَي `lambda x: x**2` اسم `x`، وأحدهما صار `9` والآخر ما زال `???`:

| البيئة | الاسم | القيمة |
| --- | --- | --- |
| Global environment | `do_twice` | function object |
| do_twice environment | `n` | `3` |
| do_twice environment | `fn` | `lambda x: x**2` |
| lambda x: x**2 environment | `x` | `9` |
| lambda x: x**2 environment | `x` | `???` |

## الشريحة 10: جرّب بنفسك! — عودة النتيجة الأولى

الشريحة نفسها. أُرجِع `9` من البيئة الأولى، وصار في البيئة الثانية `x = 10`:

| البيئة | الاسم | القيمة |
| --- | --- | --- |
| Global environment | `do_twice` | function object |
| do_twice environment | `n` | `3` |
| do_twice environment | `fn` | `lambda x: x**2` |
| lambda x: x**2 environment | `x` | `10` |

مع عبارة `Returns 9` بجوار البيئة التي أعادت `9`.

## الشريحة 11: جرّب بنفسك! — النتيجة النهائية

الشيفرة نفسها. صارت القيمة في بيئتَي `lambda` هي `81` و`99` على التوالي:

| البيئة | الاسم | القيمة |
| --- | --- | --- |
| lambda x: x**2 environment | `x` | `99` |

مع عبارة `Returns 81` بجوار البيئة التي أعادت `81`.

## الشريحة 12: جرّب بنفسك! — ما الذي يُطبع؟

الشيفرة نفسها. النطاق العام فيه عبارة `PRINTS 81` بجوار `do_twice`:

| البيئة | الاسم | القيمة |
| --- | --- | --- |
| Global environment | `do_twice` | function object — بجواره `PRINTS 81` |

مع عبارة `Returns 81` بجوار بيئة `do_twice`.

**ملاحظة المترجم:** الشرائح 5 إلى 12 تخطّط لتسلسل البيئة كاملًا. الجداول أعلاه تحفظ التسلسل: `n = 3`، ثم `fn = lambda x: x**2`، ثم الاستدعاء الداخلي ينتج `9`، ثم `81`، ثم `99`، ثم الدالة تُرجِع `81`، ثم `print` يطبع `81`.

## الشريحة 13: الصفوف (Tuples)

شريحة فاصلة تعلن موضوعًا جديدًا.

## الشريحة 14: نوع بيانات جديد (A New Data Type)

- رأينا الأنواع العددية (Scalar Types): `int` و`float` و`bool`.
- رأينا نوعًا مركّبًا واحدًا: النص (String).
- نريد تقديم أنواع بيانات مركّبة أكثر عمومية:
  - تسلسلات مفهرسة (Indexed Sequences) من عناصر، وقد تكون هذه العناصر بدورها بنى مركّبة.
  - الصفوف (Tuples) — غير قابلة للتغيير (Immutable).
  - القوائم (Lists) — قابلة للتغيير (Mutable).
- في المحاضرة القادمة سنستكشف أفكار:
  - قابلية التغيير (Mutability).
  - الأسماء المستعارة (Aliasing).
  - الاستنساخ (Cloning).

## الشريحة 15: الصفوف (Tuples)

- تسلسل مرتَّب (Ordered) من الكائنات، قابل للفهرسة (Indexable).
- الكائنات يمكن أن تكون من أي نوع: `int` أو نص أو صف أو صف من صفوف أو ما شابه.
- لا يمكن تغيير قيم العناصر، فهي غير قابلة للتغيير (Immutable).

```python
te = ()
ts = (2,)

t = (2, "mit", 3)
```

| التعبير | النتيجة |
| --- | --- |
| `t[0]` | يُقيَّم إلى `2` |
| `(2,"mit",3) + (5,6)` | يُقيَّم إلى صف جديد `(2,"mit",3,5,6)` |
| `t[1:2]` | صف مُقطَّع (Slice Tuple)، يُقيَّم إلى `("mit",)` |
| `t[1:3]` | صف مُقطَّع، يُقيَّم إلى `("mit",3)` |
| `len(t)` | يُقيَّم إلى `3` |
| `max((3,5,0))` | يُقيَّم إلى `5` |
| `t[1] = 4` | يعطي خطأ: لا يمكن تعديل الكائن |

## الشريحة 16: الفهرسة والتقطيع (Indices and Slicing)

```python
seq = (2,'a',4,(1,2))
```

| الفهرس | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| العنصر | `2` | `'a'` | `4` | `(1,2)` |

```python
print(len(seq))
print(seq[3])
print(seq[-1])
print(seq[3][0])
print(seq[4])
```

المُخرَج بالترتيب: `4` ثم `(1,2)` ثم `(1,2)` ثم `1` ثم خطأ (Error).

```python
print(seq[1])
print(seq[-2:])
print(seq[1:4:2])
print(seq[:-1])
print(seq[1:3])
```

المُخرَج بالترتيب:

| التعبير | النتيجة |
| --- | --- |
| `seq[1]` | `'a'` |
| `seq[-2:]` | `(4,(1,2))` |
| `seq[1:4:2]` | `('a',(1,2))` |
| `seq[:-1]` | `(2,'a',4)` |
| `seq[1:3]` | `('a',4)` |

```python
for e in seq:
    print(e)
```

المُخرَج بالترتيب: `2` ثم `a` ثم `4` ثم `(1,2)`.

## الشريحة 17: الصفوف — تبديل قيم متغيّرين

- تُستخدم الصفوف بسهولة لتبديل قيم المتغيّرات (Swap Variable Values).

الشرائح تبني هذه الحالة خطوة بخطوة:

| الخطوة | السطر | الحالة بعد التنفيذ |
| --- | --- | --- |
| 1 | `x = 1` | `x = 1` |
| 2 | `y = 2` | `x = 1` و`y = 2` |
| 3 | `temp = x` | `x = 1` و`y = 2` و`temp = 1` |
| 4 | `x = y` | `x = 2` و`y = 2` و`temp = 1` |
| 5 | `y = temp` | `x = 2` و`y = 1` و`temp = 1` |

وبدلًا من ذلك يمكن كتابة سطر واحد:

```python
x = 1
y = 2
(x, y) = (y, x)
```

## الشريحة 18: الصفوف — إرجاع أكثر من قيمة

- تُستخدم لإرجاع أكثر من قيمة من دالة:

```python
def quotient_and_remainder(x, y):
    q = x // y
    r = x % y
    return (q, r)

both = quotient_and_remainder(10,3)
(quot, rem) = quotient_and_remainder(5,2)
```

## الشريحة 19: الفكرة الكبرى (BIG IDEA)

> إرجاع كائن واحد (صف) يتيح لك إرجاع قيم متعددة (عناصر الصف).

## الشريحة 20: جرّب بنفسك! (YOU TRY IT!)

- اكتب دالة تحقّق هذه المواصفات.
- تلميح: تذكّر كيف تتحقّق من وجود محرف داخل نص؟

```python
def char_counts(s):
    """ s is a string of lowercase chars
    Return a tuple where the first element is the
    number of vowels in s and the second element
    is the number of consonants in s """
```

## الشريحة 21: عدد متغيّر من الوسائط (Variable Number of Arguments)

- في بايثون بعض الدوال المدمجة تأخذ عددًا متغيّرًا من الوسائط، مثل `min`.
- تتيح بايثون للمبرمج الإمكان نفسه باستخدام رمز النجمة `*`:

```python
def mean(*args):
    tot = 0
    for a in args:
        tot += a
    return tot/len(args)
```

- `numbers` (باسم المتغيّر الموضَّح في الشريحة) مربوطة بصف من القيم المُعطاة.
- مثال: `mean(1,2,3,4,5,6)`.

## الشريحة 22: القوائم (Lists)

شريحة فاصلة تعلن موضوعًا جديدًا.

## الشريحة 23: القوائم (Lists)

- تسلسل مرتَّب (Ordered) من الكائنات، قابل للفهرسة (Indexable).
  - عادةً متجانس (Homogeneous)، أي كل الأعداد الصحيحة أو كل النصوص أو كل القوائم.
  - لكنه قد يحتوي أنواعًا مختلطة (Mixed Types)، وإن كان ذلك غير شائع.
- يُكتب بين أقواس مربّعة `[` `]`.
- قابل للتغيير (Mutable)، أي يمكنك تغيير قيم عناصر محدّدة من القائمة.

## الشريحة 24: الفهرسة والترتيب (Indices and Ordering)

```python
a_list = []
L = [2, 'a', 4, [1,2]]
```

| التعبير | النتيجة |
| --- | --- |
| `[1,2]+[3,4]` | يُقيَّم إلى `[1,2,3,4]` |
| `len(L)` | يُقيَّم إلى `4` |
| `L[0]` | يُقيَّم إلى `2` |
| `L[2]+1` | يُقيَّم إلى `5` |
| `L[3]` | يُقيَّم إلى `[1,2]` — أي قائمة أخرى! |
| `L[4]` | يعطي خطأ (Error) |
| `i = 2` ثم `L[i-1]` | يُقيَّم إلى `'a'` لأن `L[1]='a'` |
| `max([3,5,0])` | يُقيَّم إلى `5` |

## الشريحة 25: المرور على عناصر القائمة (Iterating Over a List)

- احسب مجموع عناصر قائمة (List). هذا نمط شائع (Common Pattern).

الشرائح تعرض طريقتين متكافئتين:

| طريقة `for i in range(len(L))` | طريقة `for i in L` |
| --- | --- |
| `total = 0` | `total = 0` |
| `for i in range(len(L)):` | `for i in L:` |
| `total += L[i]` | `total += i` |
| `print(total)` | `print(total)` |

- لاحظ:
  - عناصر القائمة مفهرسة من `0` إلى `len(L)-1`، و`range(n)` يمضي من `0` إلى `n-1`.

## الشريحة 26: المرور على عناصر القائمة — داخل دالة

- من الطبيعي (Natural) أن نلتقط التكرار على قائمة داخل دالة:

```python
def list_sum(L):
    total = 0
    for i in L:
        # i is 8 then 3 then 5
        total += i
    return total
```

- استدعاء الدالة: `list_sum([8,3,5])`.
- متغيّر الحلقة `i` يأخذ قيم القائمة بالترتيب: `8` ثم `3` ثم `5`.
- لمساعدتك على كتابة الشيفرة وتصحيحها، علّق على قيم متغيّر الحلقة حتى لا تلتبس!

## الشريحة 27: القوائم تدعم التكرار (Lists Support Iteration)

- لأن القوائم تسلسلات مرتّبة من العناصر، فهي تتفاعل طبيعيًّا مع الدوال التكرارية (Iterative Functions).

| جمع عناصر قائمة | جمع أطوال عناصر قائمة |
| --- | --- |
| `def list_sum(L):` | `def len_sum(L):` |
| `total = 0` | `total = 0` |
| `for e in L:` | `for s in L:` |
| `total += e` | `total += len(s)` |
| `return(total)` | `return(total)` |
| `list_sum([1,3,5])` ⟵ `9` | `len_sum(['ab', 'def', 'g'])` ⟵ `6` |

## الشريحة 28: جرّب بنفسك! (YOU TRY IT!)

اكتب دالة تحقّق هذه المواصفات:

```python
def sum_and_prod(L):
    """ L is a list of numbers
    Return a tuple where the first value is the
    sum of all elements in L and the second value
    is the product of all elements in L """
```

## الشريحة 29: الخلاصة (SUMMARY)

- دوال `Lambda` مفيدة حين تحتاج دالة بسيطة مرة واحدة، ويمكن كتابة جسمها في سطر واحد.
- الصفوف (Tuples) تسلسلات قابلة للفهرسة من الكائنات:
  - لا يمكنك تغيير عناصرها، مثلًا لا يمكنك إضافة كائنات أخرى إلى صف.
  - صياغتها باستخدام `()`.
- القوائم (Lists) تسلسلات قابلة للفهرسة من الكائنات:
  - يمكنك تغيير عناصرها. سنرى هذا في المحاضرة القادمة!
  - صياغتها باستخدام `[]`.
- القوائم والصفوف متشابهتان جدًا مع النصوص من حيث:
  - الفهرسة (Indexing).
  - التقطيع (Slicing).
  - المرور على العناصر (Looping Over Elements).

## الشريحة 30: MITOpenCourseWare

https://ocw.mit.edu

مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.

للاطّلاع على كيفية الاستشهاد بهذه المواد أو على شروط الاستخدام: https://ocw.mit.edu/terms.
