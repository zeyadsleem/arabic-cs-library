---
book: mit-6100l
chapter: lecture-07
slug: notes
lang: ar
title: "المحاضرة 7: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)"
---

# المحاضرة 7: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)

## المصادر والنسبة والترخيص

المادة الأصلية: **آنا بيل (Ana Bell)**، **MIT OpenCourseWare (MIT OCW)**، معهد ماساتشوستس للتكنولوجيا، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، **خريف 2022 (Fall 2022)**.

- [صفحة المحاضرة الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-7-decomposition-abstraction-functions/).
- [صفحة الشرائح الرسمية](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec07_pdf/).
- [ملف الشرائح الأصلي، PDF](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec07.pdf).
- [ملف شيفرة المحاضرة الأصلي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec07_code.py).
- [تفريغ المحاضرة على OCW](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec07/) (النسخة الإنجليزية الرسمية).

هذه ترجمة وتكييف عربي غير رسمي وفق [رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. [شروط الاستخدام والاستشهاد](https://ocw.mit.edu/terms/).

**منهج الترجمة:** لكل صفحة في ملف الشرائح عنوان مستقل ورقم مطابق. الشرائح التي تبني الشيفرة تدريجيًّا نُقلت إلى جداول تحافظ على تسلسلها. الشيفرة والشفرة الوهمية محفوظة بالإنجليزية. لم تُضمَّن صور أو صفحات PDF.

## الشريحة 1: التفكيك والتجريد والدوال (Decomposition, Abstraction, Functions)

(نزّل الشرائح وملفات `.py` لمتابعة الشرح).

6.100L، المحاضرة 7 — آنا بيل (Ana Bell).

## الشريحة 2: مثال: الهاتف الذكي (The Smartphone)

- صندوق أسود (black box)، ويمكن النظر إليه في termes:
  - مدخلاته (its inputs).
  - مخرجاته (its outputs).
  - كيف relate المخرجات بالمدخلات، دون أيّ معرفة بتفاصيله الداخلية.
- التنفيذ (implementation) «معتم» (opaque) أو أسود.

## الشريحة 3: مثال: الهاتف الذكي — التجريد (Abstraction)

- المستخدم لا يعرف تفاصيل كيفية عمله.
- لسنا بحاجة إلى معرفة كيفية عمل شيء كي نعرف كيف نستخدمه.
- لكن المستخدم يعرف الواجهة (the interface).
- الجهاز يحوّل سلسلة من اللمسات والأصوات على الشاشة إلى وظائف مفيدة متوقّعة.
- نعرف العلاقة بين المدخل والمخرج.

## الشريحة 4: التجريد يتيح التفكيك (Abstraction Enables Decomposition)

- مئات الأجزاء المتمايزة.
- صُمّمت وصُنعت من شركات مختلفة.
- لا تتواصل فيما بينها إلاّ عبر مواصفات الأجزاء (specifications for components).
- قد تستخدم أجزاء فرعية مشتركة مع غيرها.

- على كلّ صانع جزء أن يعرف كيف يتواصل جزؤه مع بقية الأجزاء.
- يستطيع كلّ صانع جزء حلّ المسائل الجزئية بمعزل عن بقية الأجزاء، ما دام يقدّم المدخلات الموصوفة.
- هذا صحيح في العتاد وفي البرمجيات معًا.

## الشريحة 5: الفكرة الكبرى (Big Idea)

طبّق **التجريد** (الصندوق الأسود) و**التفكيك** (القسمة إلى أجزاء مكتفية ذاتيًا) على البرمجة!

## الشريحة 6: أخفِ التفاصيل بالتجريد (Suppress Details with Abstraction)

- في البرمجة نريد أن نفكّر في قطعة شيفرة كأنّها صندوق أسود.
  - أخفِ تفاصيل الكتابة المملّة عن المستخدم.
  - أعد استخدام الصندوق الأسود في مواضع مختلفة من الشيفرة (بلا نسخ ولصق!).

- المبرمج ينشئ التفاصيل، ويصمّم الواجهة.
- المستخدم لا يحتاج إلى رؤية التفاصيل ولا يريد ذلك.

## الشريحة 7: أخفِ التفاصيل بالتجريد

- المبرمج يحقّق التجريد بواسطة الدالة (function) أو الإجراء (procedure).
- لقد استخدمت الدوال من قبل!
- تتيح لك الدالة التقاط شيفرة داخل صندوق أسود.
- بمجرّد أن ننشئ دالة، فإنّها تُنتج مخرجًا من مدخلات، بينما تخفي تفاصيل كيفية إجراء الحساب.

أمثلة:

```python
max(1,4)
abs(-3)
len("mom's spaghetti")
```

## الشريحة 8: أخفِ التفاصيل بالتجريد

- للدالة مواصفات (specifications) تُلتقط في سلاسل التوثيق (docstrings).
- فكّر في الـ docstring كـ«عقد» (contract) بين المبرمج والمستخدم:
  - إذا قدّم المستخدم مدخلًا يحقّق الشروط المذكورة، فإنّ الدالة ستُنتج مخرجًا وفق المواصفات، بما في ذلك الآثار الجانبية (side effects) المذكورة.
- لا يُتحقَّق من ذلك عادةً في Python (سنرى التحقّقات (assertions) لاحقًا)، لكن المستخدم يعتمد على التزام المبرمج بالعقد.

مثال:

```python
abs(-3)
```

## الشريحة 9: أنشئ البنية بالتفكيك (Create Structure with Decomposition)

- بعد فهم فكرة التجريد كصندوق أسود، نستخدمها لتقسيم الشيفرة إلى وحدات (modules) تكون:
  - مكتفية ذاتيًا.
  - مصمّمة لإعادة الاستخدام.

- تُستخدم الوحدات من أجل:
  - تفكيك الشيفرة إلى قطع منطقية.
  - إبقاء الشيفرة منظّمة.
  - إبقاء الشيفرة متّسقة (مقروءة ومفهومة).

- في هذه المحاضرة نحقّق التفكيك بالدوال.
- وبعد محاضرات قليلة نحقّق التفكيك بالأصناف (classes).
- يعتمد التفكيك على التجريد ليتيح بناء وحدات معقّدة من وحدات أبسط.

## الشريحة 10: الدوال (Functions)

- قطع شيفرة قابلة لإعادة الاستخدام، تُسمّى دوالًّا (functions) أو إجراءات (procedures).
- تلتقط خطوات حسابٍ ما كي نتمكن من استخدامها مع أيّ مدخل.
- الدالة ليست سوى شيفرة مكتوبة بطريقة خاصة قابلة لإعادة الاستخدام.

## الشريحة 11: الدوال

- تعريف دالة يُخبر Python بأنّ شيفرة ما صارت موجودة الآن في الذاكرة.
- الدوال لا تكون نافعة إلاّ حين تُنفَّذ («تُستدعى» أو «تُنادى»).
- تكتب الدالة مرّة واحدة ويمكنك تشغيلها مرّات كثيرة!
- قارن ذلك بالشيفرة في ملف:
  - لا تعمل الشيفرة حين تحمّل الملف.
  - تعمل حين تضغط زر التشغيل.

## الشريحة 12: خصائص الدالة (Function Characteristics)

- لها اسم.
  - (فكّر: متغيّر مربوط بكائن دالة).
- لها معاملات (formal parameters) صفر أو أكثر.
  - هذه هي المدخلات.
- لها سلسلة توثيق (docstring) (اختيارية لكن يُنصح بها).
  - تعليق محدَّد بعلامة `"""` (ثلاث علامات تنصيص) يقدّم مواصفة للدالة — عقد يربط المخرج بالمدخل.
- لها جسم (body)، وهو مجموعة تعليمات تُنفَّذ عند استدعاء الدالة.
- تُعيد شيئًا (returns something).
  - الكلمة المفتاحية `return`.

## الشريحة 13: كيف تكتب دالة (How to Write a Function)

```python
def is_even( i ):
    """
    Input: i, a positive int
    Returns True if i is even, otherwise False
    """
    if i%2 == 0:
        return True
    else:
        return False
```

## الشريحة 14: كيف تفكّر في كتابة دالة

- ما المسألة؟

-Given an int, call it i, نريد أن نعرف إن كان زوجيًّا.

- نستخدم ذلك لكتابة اسم الدالة ومواصفاتها.

```python
def is_even( i ):
    """
    Input: i, a positive int
    Returns True if i is even, otherwise False
    """
```

## الشريحة 15: كيف تفكّر في كتابة دالة

- كيف نحلّ المسألة؟
  - يمكننا أن نتحقّق أنّ الباقي عند القسمة على 2 يساوي 0.
  - فكّر في القيمة التي عليك إعادتها.

```python
def is_even( i ):
    """
    Input: i, a positive int
    Returns True if i is even, otherwise False
    """
    if i%2 == 0:
        return True
    else:
        return False
```

## الشريحة 16: كيف تفكّر في كتابة دالة

- هل تستطيع أن تجعل الشيفرة أنظف؟
  - `i%2` قيمة منطقية (Boolean) تُقيَّم إلى `True`/`False` أصلًا.

```python
def is_even( i ):
    """
    Input: i, a positive int
    Returns True if i is even, otherwise False
    """
    return i%2 == 0
```

## الشريحة 17: الفكرة الكبرى (Big Idea)

حتى هذه اللحظة، كلّ ما فعلناه هو إنشاء **كائن دالة** (function object).

## الشريحة 18: كيف تستدعي دالة (How to Call (Invoke) a Function)

```python
is_even(3)
is_even(8)
```

- هذا كلّ شيء!

## الشريحة 19: كيف تستدعي دالة

```python
is_even(3)
is_even(8)
```

- هذا كلّ شيء!

## الشريحة 20: كلّ ذلك في ملف واحد

- قد تكون هذه الشيفرة في ملف واحد.

```python
def is_even( i ):
    return i%2 == 0

is_even(3)
```

## الشريحة 21: ماذا يحدث حين تستدعي دالة؟

- يستبدل Python المعاملات الرسمية (formal parameters) في تعريف الدالة بقيم من استدعاء الدالة.

`i` ← يُستبدل بـ `3`

```python
def is_even( i ):
    return i%2 == 0

is_even(3)
```

## الشريحة 22: ماذا يحدث حين تستدعي دالة؟

- يستبدل Python المعاملات الرسمية في تعريف الدالة بقيم من استدعاء الدالة: `i` ← `3`.
- ينفّذ Python التعبيرات في جسم الدالة:

`return 3%2 == 0`

```python
def is_even( i ):
    return i%2 == 0

is_even(3)
```

## الشريحة 23: ماذا يحدث حين تستدعي دالة؟

- يستبدل Python المعاملات الرسمية في تعريف الدالة بقيم من استدعاء الدالة: `i` ← `3`.

```python
def is_even( i ):
    return i%2 == 0

is_even(3)

print(is_even(3))
```

## الشريحة 24: الفكرة الكبرى (Big Idea)

شيفرة الدالة **لا تعمل إلاّ حين تستدعي الدالة** (وتُسمّى أيضًا استدعاءً أو نداءً).

## الشريحة 25: جرّب بنفسك!

- اكتب شيفرة تحقّق المواصفات التالية:

```python
def div_by(n, d):
    """ n and d are ints > 0
    Returns True if d divides n evenly and False otherwise """
```

اختبر شيفرتك مع:

- `n = 10` و `d = 3`
- `n = 195` و `d = 13`

## الشريحة 26: نبتعد خطوة للخلف (Zooming Out) — بلا دوال

**نطاق البرنامج (Program Scope):**

```python
a = 3
b = 4
c = a+b
```

## الشريحة 27: نبتعد خطوة للخلف — هذا «الصندوق الأسود» لي

```python
def is_even( i ):
    print("inside is_even")
    return i%2 == 0
```

**نطاق البرنامج (Program Scope):**

| الاسم | الربط |
|---|---|
| `is_even` | دالة (function object) تحوي شيفرة |

وهذا ما أقوله لصندوقي الأسود أن يفعل شيئًا:

```python
a = is_even(3)
b = is_even(10)
c = is_even(123456)
```

## الشريحة 28: نبتعد خطوة للخلف

```python
def is_even( i ):
    print("inside is_even")
    return i%2 == 0

a = is_even(3)
b = is_even(10)
c = is_even(123456)
```

استدعاء دالة واحدة (one function call).

**نطاق البرنامج (Program Scope):**

| الاسم | القيمة |
|---|---|
| `a` | `False` |

## الشريحة 29: نبتعد خطوة للخلف

```python
def is_even( i ):
    print("inside is_even")
    return i%2 == 0

a = is_even(3)
b = is_even(10)
c = is_even(123456)
```

استدعاء دالة واحدة.

**نطاق البرنامج (Program Scope):**

| الاسم | القيمة |
|---|---|
| `a` | `False` |
| `b` | `True` |

## الشريحة 30: نبتعد خطوة للخلف

```python
def is_even( i ):
    print("inside is_even")
    return i%2 == 0

a = is_even(3)
b = is_even(10)
c = is_even(123456)
```

استدعاء دالة واحدة.

**نطاق البرنامج (Program Scope):**

| الاسم | القيمة |
|---|---|
| `a` | `False` |
| `b` | `True` |
| `c` | `True` |

## الشريحة 31: إدراج الدوال في الشيفرة

- تذكّر كيف كان التعبير (expression) يُستبدل بقيمته؟
- استدعاء الدالة يُستبدل بقيمة `return`!

```python
print("Numbers between 1 and 10: even or odd")
for i in range(1,10):
    if is_even(i):
        print(i, "even")
    else:
        print(i, "odd")
```

## الشريحة 32: مثال آخر

- لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).

```python
def sum_odd(a, b):
```

- ما المدخل؟

```python
    # your code here
```

- قيمتا a و b

```python
    return sum_of_odds
```

- ما المخرج؟
- المجموع `sum_of_odds`.

## الشريحة 33: الفكرة الكبرى (Big Idea)

لا تكتب الشيفرة فورًا!

## الشريحة 34: الورق أولًا (Paper First)

- لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).

```python
def sum_odd(a, b):
```

- ابدأ بمثال بسيط على الورق.
- حلّ المثال بشكل منهجي.

```python
    # your code here
    return sum_of_odds
```

## الشريحة 35: حالة اختبار بسيطة (Simple Test Case)

- لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).

```python
def sum_odd(a, b):
```

- ابدأ بمثال بسيط على الورق.
- `a = 2` و `b = 4`

```python
    # your code here
    return sum_of_odds
```

- ينبغي أن تكون `sum_of_odds` يساوي 3.

على خطّ الأعداد: من `a = 2` إلى `b = 4`، والأعداد 2 و 3 و 4.

## الشريحة 36: حالة اختبار أعقد (More Complex Test Case)

- لنفرض أنّنا نريد جمع كلّ الأعداد الصحيحة الفردية بين a و b (شاملةً الطرفين).

```python
def sum_odd(a, b):
```

- ابدأ بمثال بسيط على الورق.
- `a = 2` و `b = 7`

```python
    # your code here
    return sum_of_odds
```

- ينبغي أن تكون `sum_of_odds` يساوي 15.

على خطّ الأعداد: من `a = 2` إلى `b = 7`، والأعداد 2 و 3 و 4 و 5 و 6 و 7.

## الشريحة 37: حلّ مسألة مشابهة (Solve Similar Problem)

على خطّ الأعداد: `a = 2`، ثم 3، ثم 4، ثم `b`.

- ابدأ بالنظر في كلّ عدد بين a و b (شاملةً الطرفين).
- مسألة مشابهة أسهل تعرف كيف تحلّها؟
- اجمع **كلّ** الأعداد بين a و b (شاملةً الطرفين).
- ابدأ بهذه.

```python
def sum_odd(a, b):
    # your code here

    return sum_of_odds
```

## الشريحة 38: اختر بنية الصورة الكبرى (Choose Big-Picture Structure)

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

- اجمع **كلّ** الأعداد بين a و b (شاملةً الطرفين).
- هي بنية تكرار (loop).

```python
def sum_odd(a, b):
    # your code here

    return sum_of_odds
```

- `while` أم `for`؟ — خيارك.

## الشريحة 39: اكتب حلقة التكرار (Write the Loop) — لجمع كلّ الأعداد

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| | `    i = a` |
| `    for i in range(a, b):` | `    while i <= b:` |
| `        # do something` | `        # do something` |
| | `        i += 1` |
| `    return sum_of_odds` | `    return sum_of_odds` |

## الشريحة 40: نفّذ الجمع (Do the Summing) — لجمع كلّ الأعداد

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b):` | `    i = a` |
| `        sum_of_odds += i` | `    while i <= b:` |
| `    return sum_of_odds` | `        sum_of_odds += i` |
| | `        i += 1` |
| | `    return sum_of_odds` |

## الشريحة 41: هيّئ المجموع (Initialize the Sum) — لجمع كلّ الأعداد

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b):` | `    i = a` |
| `        sum_of_odds += i` | `    while i <= b:` |
| `    return sum_of_odds` | `        sum_of_odds += i` |
| | `        i += 1` |
| | `    return sum_of_odds` |

## الشريحة 42: اختبر! (Test!) — لجمع كلّ الأعداد

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b):` | `    i = a` |
| `        sum_of_odds += i` | `    while i <= b:` |
| `    return sum_of_odds` | `        sum_of_odds += i` |
| `    print(sum_odd(2,4))` | `        i += 1` |
| | `    return sum_of_odds` |
| | `    print(sum_odd(2,4))` |

## الشريحة 43: نتائج غريبة… (Weird Results…) — لجمع كلّ الأعداد

على خطّ الأعداد: `a = 2` ثم 3 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b):` | `    i = a` |
| `        sum_of_odds += i` | `    while i <= b:` |
| `    return sum_of_odds` | `        sum_of_odds += i` |
| `    print(sum_odd(2,4))` | `        i += 1` |
| | `    return sum_of_odds` |
| | `    print(sum_odd(2,4))` |
| الناتج | `5` |

## الشريحة 44: صحّح! أي أضف تعليمات طباعة (Debug! aka Add Print Statements) — لجمع كلّ الأعداد

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b):` | `    i = a` |
| `        sum_of_odds += i` | `    while i <= b:` |
| `        print(i, sum_of_odds)` | `        print(i, sum_of_odds)` |
| `    return sum_of_odds` | `        sum_of_odds += i` |
| `    print(sum_odd(2,4))` | `        i += 1` |
| | `    return sum_of_odds` |

القيم التي طُبعتاها بالترتيب:

| الدورة | `i` | `sum_of_odds` |
|---|---|---|
| الأولى | `2` | `22` |
| الثانية | `3` | `35` |
| الثالثة | `4` | `9` |

**ملاحظة المترجم:** الشريحة تُظهر القيمَين اللتين طُبعتا عند كلّ دورة (`i` والمجموع التراكمي) للتأكّد من مسار التنفيذ، وتكشف أنّ حلقة `for` في `range(a, b)` لا تشمل `b`.

## الشريحة 45: أصلح فهرس نهاية حلقة `for` (Fix for Loop End Index) — لجمع كلّ الأعداد

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b+1):` | `    i = a` |
| `        sum_of_odds += i` | `    while i <= b:` |
| `    return sum_of_odds` | `        print(i, sum_of_odds)` |
| `    print(sum_odd(2,4))` | `        sum_of_odds += i` |
| الناتج: `9` | `        print(i, sum_of_odds)` |
| | `        i += 1` |
| | `    return sum_of_odds` |
| | `    print(sum_odd(2,4))` |
| | الناتج: `9` |

## الشريحة 46: أضف الجزء الخاص بالأعداد الفردية! (Add in the Odd Part!)

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم `b`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b+1):` | `    i = a` |
| `        if i%2 == 1:` | `    while i <= b:` |
| `            sum_of_odds += i` | `        if i%2 == 1:` |
| `    return sum_of_odds` | `            sum_of_odds += i` |
| `    print(sum_odd(2,4))` | `        print(i, sum_of_odds)` |
| الناتج | `3` | `        i += 1` |
| | `    return sum_of_odds` |
| | `    print(sum_odd(2,4))` |
| | الناتج `3` |

## الشريحة 47: الفكرة الكبرى (Big Idea)

حلّ مسألة أبسط أولًا. أضِف الوظيفة الجديدة إلى الشيفرة لاحقًا.

## الشريحة 48: جرّبها على مثال آخر (Try It on Another Example)

على خطّ الأعداد: `a = 2` ثم 3 ثم 4 ثم 5 ثم 6 ثم `b = 7`.

| حلقة `for` | حلقة `while` |
|---|---|
| `def sum_odd(a, b):` | `def sum_odd(a, b):` |
| `    sum_of_odds = 0` | `    sum_of_odds = 0` |
| `    for i in range(a, b+1):` | `    i = a` |
| `        if i%2 == 1:` | `    while i <= b:` |
| `            sum_of_odds += i` | `        if i%2 == 1:` |
| `    return sum_of_odds` | `            sum_of_odds += i` |
| `    print(sum_odd(2,7))` | `        i += 1` |
| الناتج | `15` | `    return sum_of_odds` |
| | `    print(sum_odd(2,7))` |
| | الناتج `15` |

## الشريحة 49: Python Tutor

- أيضًا أداة ممتازة لتنقيح الأخطاء (debugging).

## الشريحة 50: الفكرة الكبرى (Big Idea)

اختبر الشيفرة كثيرًا. استخدم تعليمات الطباعة لتنقيح الأخطاء.

## الشريحة 51: جرّب بنفسك!

- اكتب شيفرة تحقّق المواصفات التالية:

```python
def is_palindrome(s):
    """ s is a string
    Returns True if s is a palindrome and False otherwise
    """
```

مثلًا:

- إذا كان `s = "222"` يُعيد `True`
- إذا كان `s = "2222"` يُعيد `True`
- إذا كان `s = "abc"` يُعيد `False`

## الشريحة 52: الخلاصة (Summary)

- تتيح لنا الدوال إخفاء التفاصيل عن المستخدم.
- تلتقط الدوال حسابًا داخل صندوق أسود.
- يكتب المبرمج الدوال بـ:
  - صفر أو أكثر من المدخلات.
  - شيء يُعاد.

- الدالة لا تعمل إلاّ عند استدعائها.
- يُستبدل استدعاء الدالة كاملًا بقيمة `return`.
- فكّر في التعبيرات! وكيف تستبدل تعبيرًا كاملًا بالقيمة التي يُقيَّم إليها.

## الشريحة 53: MIT OpenCourseWare

- [MIT OpenCourseWare](https://ocw.mit.edu)
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022.
- للاستعلام عن كيفية الاستشهاد بهذه المواد أو عن [شروط الاستخدام](https://ocw.mit.edu/terms)، زيارة: https://ocw.mit.edu/terms.
