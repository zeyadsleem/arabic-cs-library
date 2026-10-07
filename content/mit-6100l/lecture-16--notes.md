---
book: mit-6100l
chapter: lecture-16
slug: notes
lang: ar
title: "المحاضرة 16: الاستدعاء الذاتي (Recursion) على غير الأعداد"
---

# المحاضرة 16: الاستدعاء الذاتي (Recursion) على غير الأعداد

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-16-recursion-on-non-numerics/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec16.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16_code_py/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec16/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (85 شريحة)، مع الحفاظ على ترتيب الشرائح كلّها بما فيها شرائح البناء التدريجي المتكرّرة. الشيفرة والشفرة الوهمية (pseudocode) تُركت بالإنجليزية كما هي. الأشكال لم تُضمَّن. وحيث لا يسمح نصّ الملف المستخرَج بإعادة بناء تفصيلة بعينها (أسهم الرسم، وأرقام `id` في الذاكرة، ووسوم `id` unlabeled في أمثلة الدوال) نُصَّ على ذلك صراحةً في «ملاحظة المترجم» بدل التخمين.

## الشريحة 1: عنوان المحاضرة

- RECURSION ON NONNUMERICS
- (download slides and .py files to follow along)
- 6.100L Lecture 16 — Ana Bell

## الشريحة 2: مراجعة الاستدعاء الذاتي (Recursion) من المحاضرة السابقة، مع مثال (REVIEW OF RECURSION FROM LAST LECTURE, WITH AN EXAMPLE)

- أعداد فيبوناتشي (Fibonacci numbers) (حوالي عام 1202)
- ليوناردو بيزا (aka Fibonacci) صوّر تكاثر الأرانب (تحت افتراضات معيّنة) على هيئة متسلسلة فيبوناتشي
- زوجٌ من الأرانب حديثي الولادة (أنثى وذكر) يوضع في حظيرة
- تتزاوج الأرانب في عمر شهر واحد
- مدة الحمل شهر واحد
- نفترض أن الأرانب لا تموت، وأن الأنثى تُنتج دائمًا زوجًا جديدًا (ذكر وأنثى) كل شهر ابتداءً من شهرها الثاني

$$females(n) = females(n-1) + females(n-2)$$

- `females(n-1)`: الإناث الحيّات في الشهر n-1
- كل أنثى حية في الشهر n-2 ستُنتج أنثى واحدة في الشهر n

| الشهر | الإناث |
|---|---|
| 1 | 1 |
| 2 | 1 |
| 3 | 2 |
| 4 | 3 |
| 5 | 5 |
| 6 | 8 |
| 7 | 13 |

## الشريحة 3: فيبوناتشي (FIBONACCI)

- الحالات الأساس (Base cases):
  - `Females(1) = 1`
  - `Females(2) = 1`
- الحالة العودية (Recursive case)
  - `Females(n) = Females(n-1) + Females(n-2)`

## الشريحة 4: شيفرة فيبوناتشي العودية (حالات أساس متعدّدة) — FIBONACCI RECURSIVE CODE (MULTIPLE BASE CASES)

```python
def fib(x):
    if x == 1 or x == 2:
        return 1
    else:
        return fib(x-1) + fib(x-2)
```

- حالتا أساس (Two base cases)
- تنادي نفسها مرّتين (Calls itself twice)
- لكن! عليها أن تصل إلى حالة الأساس في الاستدعاء الأول لـ `fib` قبل أن يُكمل الاستدعاء الثاني لـ `fib`

## الشريحة 5: رؤية عالية المستوى (HIGH-LEVEL VIEW) لفيبوناتشي مع الاستدعاء الذاتي — رابط PYTHON TUTOR

```python
def fib(x):
    if x == 1 or x == 2:
        return 1
    else:
        return fib(x-1) + fib(x-2)
```

شجرة الاستدعاءات عند `Fib(6)`:

- `Fib(6)`
  - `Fib(5)`
    - `Fib(4)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`
    - `Fib(4)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`
  - `Fib(5)`
    - `Fib(4)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`
    - `Fib(4)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`
      - `Fib(3)`
        - `Fib(2)`
        - `Fib(1)`

## الشريحة 6: فيبوناتشي غير الكفؤ (INEFFICIENT FIBONACCI)

نفس الشجرة السابقة تمامًا، لكنّ مؤشّر الشريحة في الأصل يشير إلى إعادة الحساب:

- نُعيد حساب القيم نفسها مرّات كثيرة! (Recalculating the same values many times!)
- يمكننا تتبّع القيم التي حُسبت بالفعل

## الشريحة 7: فيبوناتشي مع الحفظ المؤقّت (MEMOIZATION) — رابط PYTHON TUTOR

```python
def fib_efficient(n, d):
    if n in d:
        return d[n]
    else:
        ans = fib_efficient(n-1, d) + fib_efficient(n-2, d)
        d[n] = ans
        return ans

d = {1:1, 2:1}
print(fib_efficient(6, d))
```

- نُجري بحثًا أولًا (lookup) تحسّبًا لأن تكون القيمة قد حُسبت بالفعل
- نُعدّل القاموس أثناء تقدّمنا في استدعاءات الدالة

## الشريحة 8: فيبوناتشي الكفؤ يتحقّق من القاموس أولًا (EFFICIENT FIBONACCI CHECKS the DICT FIRST)

| n | fib(n) |
|---|---|
| 1 | 1 |
| 2 | 1 |
| 3 | 2 |
| 4 | 3 |
| 5 | 5 |
| 6 | 8 |

- لم نَعُد نُعيد الحساب، بل نتحقّق من القاموس قبل الحساب!
- نضيف إلى القاموس كي نتمكّن من البحث عنه في المرة القادمة التي نراه فيها

## الشريحة 9: مكاسب الكفاءة (EFFICIENCY GAINS)

- استدعاء `fib(34)` يُنتج 11,405,773 استدعاءً عوديًا للإجراء
- استدعاء `fib_efficient(34)` يُنتج 65 استدعاءً عوديًا للإجراء
- استخدام القواميس لالتقاط النتائج الوسيطة قد يكون كفؤًا جدًا
- لكن لاحظ أن هذا لا ينفع إلا مع الإجراءات الخالية من الآثار الجانبية (side effects)، أي أن الإجراء يُنتج دائمًا النتيجة نفسها في مُدخَل معيّن، مستقلًا عن أي عمليات حسابية أخرى تقع بين الاستدعاءات

## الشريحة 10: مثال أكثر عملية (A MORE PRACTICAL EXAMPLE)

ما كل الطرق التي يمكن بها تسجيل score بقيمة x في كرة السلة؟

```python
def score_count(x):
    """ Returns all the ways to make a score of x by adding
    1, 2, and/or 3 together. Order doesn't matter. """
    if x == 1:
        return 1
    elif x == 2:
        return 2
    elif x == 3:
        return 3
    else:
        return score_count(x-1)+score_count(x-2)+score_count(x-3)
```

- في كرة السلة يمكنك تسجيل سلة (basket) بقيمة 1 أو 2 أو 3 نقاط
- ثلاث حالات أساس! (Base cases: 3 of them!)
- يمكنك تسجيل 1 بـ 1+0 (تلك طريقة واحدة)
- يمكنك تسجيل 2 بـ 1+1 أو 2+0 (تلك طرقتان)
- يمكنك تسجيل 3 بـ 1+1+1 أو 2+1 أو 3+0 (تلك ثلاث طرق)

## الشريحة 11: مثال أكثر عملية: رابط PYTHON TUTOR

ما كل الطرق التي يمكن بها تسجيل score بقيمة x في كرة السلة؟

```python
def score_count(x):
    """ Returns all the ways to make a score of x by adding
    1, 2, and/or 3 together. Order doesn't matter. """
    if x == 1:
        return 1
    elif x == 2:
        return 2
    elif x == 3:
        return 3
    else:
        return score_count(x-1)+score_count(x-2)+score_count(x-3)
```

- الخطوة العودية: اترك استدعاءات الدوال المستقبلية تؤدّي العمل حتى الحالات الأساس
- «طرق تسجيل score بقيمة x» تعني أنك كان بإمكانك أن تسجّل:
  - score بقيمة (x-1)
  - أو
  - score بقيمة (x-2)
  - أو
  - score بقيمة (x-3)
- إن سجّلتَ score بقيمة x-1 يمكنك ببساطة إضافة 1 إليه لتصنع score بقيمة x.
- إن سجّلتَ score بقيمة x-2 يمكنك ببساطة إضافة 2 إليه لتصنع score بقيمة x.
- إن سجّلتَ score بقيمة x-3 يمكنك ببساطة إضافة 3 إليه لتصنع score بقيمة x.

## الشريحة 12: رؤية عالية المستوى (HIGH-LEVEL VIEW) لـ score_count

```python
def score_count(x):
    if x == 1:
        return 1
    elif x == 2:
        return 2
    elif x == 3:
        return 3
    else:
        return score_count(x-1)+score_count(x-2)+score_count(x-3)
```

شجرة الاستدعاءات عند `score(6)`:

- `score(6)`
  - `score(5)`
    - `score(4)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`
    - `score(4)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`
  - `score(5)`
    - `score(4)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`
    - `score(4)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`
      - `score(3)`
        - `score(2)`
          - `score(1)`
        - `score(2)`
          - `score(1)`

## الشريحة 13: مجموع عناصر القائمة (SUM of LIST ELEMENTS)

فاصل: ننتقل الآن من الأعداد إلى القوائم.

## الشريحة 14: القوائم عودية بطبيعتها (LISTS ARE NATURALLY RECURSIVE)

```python
def total_iter(L):
    result = 0

    for e in L:
        result += e
    return result

test = [30, 40, 50]
print(total_iter(test))
```

## الشريحة 15: تمثيل القوائم على أنها عودية (VISUALIZING LISTS as RECURSIVE) — ابدأ

القائمة الأصلية:

```text
[10, 20, 30, 40, 50, 60]
```

- اُعثر على مجموع هذه القائمة الأصلية (Find sum of this original list)

> **ملاحظة المترجم:** الشرائح من 15 إلى 29 تبني الفكرة نفسها خطوةً خطوة: تُزال القيمة الأولى من القائمة في كل شريحة، ثم يُكتب «الحلّ هو `L[0]` + مجموع القائمة الجديدة». الأسهم والأقواس في الرسم الأصلي لا يمكن استرجاعها من طبقة النص، لذا نُصّ على ما تعنيه كل شريحة بصياغتنا، ولم يُخمَّن شيء.

## الشريحة 16: تمثيل القوائم على أنها عودية — القيمة الأولى

القائمة بعد إزالة أول عنصر: `[20, 30, 40, 50, 60]`

- `L[0]` + مجموع القائمة الجديدة

## الشريحة 17: تمثيل القوائم على أنها عودية — المسألة نفسها بشكل أصغر

القائمة: `[20, 30, 40, 50, 60]`

- حُلَّت المسألة نفسها، بشكل مختلف قليلًا (طولها أصغر) (Solve the same problem, slightly changed (its length is smaller))

## الشريحة 18: تمثيل القوائم على أنها عودية — القيمة الأولى

القائمة بعد إزالة أول عنصر: `[30, 40, 50, 60]`

- `L[0]` + مجموع القائمة الجديدة

## الشريحة 19: تمثيل القوائم على أنها عودية — المسألة نفسها مرة أخرى

القائمة: `[30, 40, 50, 60]`

- حُلَّت المسألة نفسها مرة أخرى، بشكل مختلف قليلًا (Solve the same problem again, slightly changed)

## الشريحة 20: تمثيل القوائم على أنها عودية — القيمة الأولى

القائمة بعد إزالة أول عنصر: `[40, 50, 60]`

- `L[0]` + مجموع القائمة الجديدة

## الشريحة 21: تمثيل القوائم على أنها عودية — أيضًا

القائمة: `[40, 50, 60]`

- نواصل التكرار، متناقصين حتى حالة الأساس (Keep repeating, decreasing until a base case)

## الشريحة 22: تمثيل القوائم على أنها عودية — أيضًا

القائمة: `[50, 60]`

- نواصل التكرار، متناقصين حتى حالة الأساس (Keep repeating, decreasing until a base case)

## الشريحة 23: تمثيل القوائم على أنها عودية — حالة الأساس

القائمة: `[60]`

- حالة الأساس (The base case)

## الشريحة 24: تمثيل القوائم على أنها عودية — إرجاع المجموع

- نُمرِّر المجموع عائدًا إلى أعلى السلسلة (Pass the sum back up the chain)

## الشريحة 25: تمثيل القوائم على أنها عودية — إرجاع المجموع

- نُمرِّر المجموع عائدًا إلى أعلى السلسلة

## الشريحة 26: تمثيل القوائم على أنها عودية — إرجاع المجموع

- نُمرِّر المجموع عائدًا إلى أعلى السلسلة

## الشريحة 27: تمثيل القوائم على أنها عودية — إرجاع المجموع

- نُمرِّر المجموع عائدًا إلى أعلى السلسلة

## الشريحة 28: تمثيل القوائم على أنها عودية — إرجاع المجموع

- نُمرِّر المجموع عائدًا إلى أعلى السلسلة

## الشريحة 29: تمثيل القوائم على أنها عودية — إرجاع المجموع

- نُمرِّر المجموع عائدًا إلى أعلى السلسلة

## الشريحة 30: مجموع عناصر القائمة: القطع (SUM of LIST ELEMENTS: the PIECES)

```python
def total_recur(L):
    # Base case
    if
    else:
    # Recursive step

test = [30, 40, 50]
print(total_recur(test))
```

- حالة الأساس (Base case)
- الخطوة العودية (Recursive step)

## الشريحة 31: مجموع عناصر القائمة: حالة الأساس (خيار واحد)

```python
def total_recur(L):
    # Base case
    # What is the base case?
    if L == []:
        # One option:
        # An empty list has sum 0
        return 0
    else:
        # Recursive step

test = [30, 40, 50]
print(total_recur(test))
```

- ما هي حالة الأساس؟ (What is the base case?)
- خيار واحد: قائمة فارغة مجموعها 0

## الشريحة 32: مجموع عناصر القائمة: حالة الأساس (خيار آخر)

```python
def total_recur(L):
    # Base case
    # What is the base case?
    if len(L) == 1:
        # Another option:
        # A list with one element has a sum of that one element
        return L[0]
    else:
        # Recursive step

test = [30, 40, 50]
print(total_recur(test))
```

- ما هي حالة الأساس؟
- خيار آخر: القائمة ذات العنصر الواحد مجموعها هو ذلك العنصر وحده
- مثال: `L = [50]`
- تُعيد: `50`

## الشريحة 33: مجموع عناصر القائمة: الخطوة العودية

```python
def total_recur(L):
    # What is the recursive step?
    return L[0]
    # Need to get to the base case somehow
    if len(L) == 1:
    else:
        return L[0] + # something
    # Let's look at elements one at a time
    # Extract the first one and grab its value
    # For example:
    # L = [30,40,50]
    # Returns: 30 + <something>

test = [30, 40, 50]
print(total_recur(test))
```

- ما هي الخطوة العودية؟
- يجب أن نصل إلى حالة الأساس بطريقة ما
- لننظر إلى العناصر واحدًا تلو الآخر
- استخرج الأول وخذ قيمته
- مثال: `L = [30, 40, 50]`
- تُعيد: `30 + <something>`

## الشريحة 34: مجموع عناصر القائمة: الخطوة العودية ستنتهي في النهاية

```python
def total_recur(L):
    # What is the recursive step?
    return L[0]
    # The function call finds the sum of the remaining list elements
    if len(L) == 1:
    else:
        return L[0] + total_recur(L[1:])
    # For example:
    # L = [30,40,50]
    # Returns: 30 + total_recur([40,50])

test = [30, 40, 50]
print(total_recur(test))
```

- استدعاء الدالة يجد مجموع عناصر القائمة المتبقّية

## الشريحة 35: مجموع عناصر القائمة: الخلاصات — رابط PYTHON TUTOR

```python
def total_recur(L):
    # Notice:
    # Every case in the function returns something that is the same type
    # Base case returns an int
    # Recursive step returns an int
    # We need to trust that the recursive calls eventually do the right thing
    return L[0]
    if len(L) == 1:
    else:
        return L[0] + total_recur(L[1:])

test = [30, 40, 50]
print(total_recur(test))
```

- لاحظ:
  - كل حالة في الدالة تُعيد شيئًا من النوع نفسه
  - حالة الأساس تُعيد `int`
  - الخطوة العودية تُعيد `int`
- يجب أن نثق بأن الاستدعاءات العودية ستؤدّي في النهاية العمل الصحيح

## الشريحة 36: جرّب بنفسك (YOU TRY IT!)

- عدّل الشيفرة التي كتبناها لتُعيد الطول الكلي لكل السلاسل النصّية (strings) داخل `L`:

```python
def total_len_recur(L):
    if len(L) == 1:
        return _______
    else:
        return __________________

test = ["ab", "c", "defgh"]
print(total_recur(test))

# prints 8
```

## الشريحة 37: البحث عن عنصر في قائمة (LOOKING for an ELEMENT in a LIST)

فاصل: ننتقل الآن من «المجموع» إلى «البحث».

## الشريحة 38: مثال آخر: هل العنصر موجود في القائمة؟ (انتبه لهذه النسخة)

```python
def in_list(L, e):
    # Base case is when we have one element
    # Check if it's the one we are looking for
    if len(L) == 1:
        return L[0] == e
    else:
        # Recursive step looks at the remaining elements
        # Grab the list from index 1 onward and look for e in it
        return in_list(L[1:], e)
```

- لنبدأ باتباع النمط نفسه كما في المثال السابق
- حالة الأساس هي عندما يكون لدينا عنصر واحد
- تحقّق ممّا إذا كان هو العنصر الذي نبحث عنه
- الخطوة العودية تنظر إلى العناصر المتبقّية
- خذ القائمة من المؤشر 1 فما بعد وابحث عن `e` فيها

## الشريحة 39: مثال آخر: هل العنصر موجود في القائمة؟ (جرّبها) — PYTHON TUTOR

```python
def in_list(L, e):
    if len(L) == 1:
        return L[0] == e
    else:
        return in_list(L[1:], e)

test = [2,5,8,1]
print(in_list(test, 1))
```

- جرّبها
- `test = [2,5,8,1]` و `e=1` تعطي `True` — حسنًا
- `test = [2,1,5,8]` و `e=1` تعطي `False` — ليست صحيحة!
- هي تتحقّق فقط ممّا إذا كان العنصر الأخير هو العنصر الذي نبحث عنه!

## الشريحة 40: مثال آخر: هل العنصر موجود في القائمة؟ (أصلح النسخة)

ملاحظتان على النسخة السابقة:

- ما زلنا نريد النظر إلى العناصر واحدًا تلو الآخر
- يجب أن نتحقّق عند كل استدعاء للدالة ممّا إذا كان العنصر الذي استخرجناه هو العنصر الذي نبحث عنه

## الشريحة 41: مثال آخر: هل العنصر موجود في القائمة؟ (أصلح النسخة)

```python
def in_list(L, e):
    if len(L) == 1:
        return L[0] == e
    else:
        # Check the first element before looking in the rest
        if L[0] == e:
            return True
        else:
            return in_list(L[1:], e)
```

- ما زلنا نريد النظر إلى العناصر واحدًا تلو الآخر
- أضِف التحقّق في الخطوة العودية، قبل النظر في بقيّة القائمة

## الشريحة 42: مثال آخر: هل العنصر موجود في القائمة؟ (اختبر النسخة) — PYTHON TUTOR

```python
def in_list(L, e):
    # Test it now
    # test = [2,5,8,1] and e=1 gives True -- ok
    # test = [2,1,5,8] and e=1 gives True -- ok
    # test = [2,5,8] and e=1 gives False -- ok
    if len(L) == 1:
        return L[0] == e
    else:
        if L[0] == e:
            return True
        else:
            return in_list(L[1:], e)
```

- اختبرها الآن
- `test = [2,5,8,1]` و `e=1` تعطي `True` — حسنًا
- `test = [2,1,5,8]` و `e=1` تعطي `True` — حسنًا
- `test = [2,5,8]` و `e=1` تعطي `False` — حسنًا

## الشريحة 43: مثال آخر: هل العنصر موجود في القائمة؟ (حسِّن النسخة)

```python
def in_list(L, e):
    # Add case when L is empty
    # Simplify the code to check the first element as another base case
    if len(L) == 0:
        return False
    elif L[0] == e:
        return True
    else:
        return in_list(L[1:], e)
```

- حالتان تُعيدان `L[0]` (Two cases that return L[0])
- أضِف حالة عندما تكون `L` فارغة
- بسِّط الشيفرة لتفحص العنصر الأول كحالة أساس أخرى

## الشريحة 44: الفكرة الكبرى (BIG IDEA)

- كل حالة (حالات الأساس، الخطوة العودية) يجب أن تُعيد **النوع نفسه** من الكائن.
- تذكّر أن قيم `return` للدوال تُبنى فوق بعضها!
- إذا أعادت حالة الأساس قيمة `bool` وأعادت الخطوة العودية قيمة `int`، فإن هذا يُنتج **خطأ عدم تطابق في النوع** (type mismatch error) وقت التشغيل.

## الشريحة 45: تسطيح (FLATTEN) قائمة تحتوي مستوى واحدًا فقط من عناصر القوائم

فاصل: ننتقل الآن إلى القوائم التي عناصرها قوائم.

## الشريحة 46: تسطيح قائمة تحتوي قوائم من أعداد صحيحة

مثال: `[[1, 2],[3, 4],[9, 8, 7]]` تعطي `[1, 2, 3, 4, 9, 8, 7]`

```python
def flatten(L):
    # Base case
    # There is only one element in L
    if len(L) == 1:
    else:
    # For example: [[2,3,4]]
```

- حالة الأساس
- لا يوجد سوى عنصر واحد في `L`
- مثال: `[[2,3,4]]`

## الشريحة 47: تسطيح قائمة تحتوي قوائم من أعداد صحيحة

```python
def flatten(L):
    if len(L) == 1:
        # Return that element
        return L[0]
    else:

# For example: [[2,3,4]]
# Returns: [2,3,4]
```

- حالة الأساس
- تُعيد ذلك العنصر
- تُعيد: `[2,3,4]`

## الشريحة 48: تسطيح قائمة تحتوي قوائم من أعداد صحيحة

```python
def flatten(L):
    if len(L) == 1:
        return L[0]
    else:
        return L[0] + #something
```

- الخطوة العودية
- تذكّر أن `+` بين قائمتين يُلحق عناصرهما في قائمة جديدة
- اصنع قائمة جديدة تحتوي العنصر الأول و…

## الشريحة 49: تسطيح قائمة تحتوي قوائم من أعداد صحيحة — رابط PYTHON TUTOR

```python
def flatten(L):
    if len(L) == 1:
        return L[0]
    else:
        return L[0] + flatten(L[1:])
```

- الخطوة العودية
- … تُسطّح بقيّة القائمة المتبقّية
- مثال: `[[1,2],[3,4],[9,8,7]]`
- تُعيد: `[1,2] + flatten([[3,4], [9,8,7]])`

## الشريحة 50: جرّب بنفسك (YOU TRY IT!)

- اكتب دالة عودية وفق المواصفات التالية.

```python
def in_list_of_lists(L, e):
    """
    L is a list whose elements are lists containing ints.
    Returns True if e is an element within the lists of L
    and False otherwise.
    """

    # your code here

test = [[1,2], [3,4], [5,6,7]]

print(in_list_of_lists(test, 0))

# prints False

print(in_list_of_lists(test, 3))

# prints True
```

## الشريحة 51: متى نستخدم الاستدعاء الذاتي (WHEN to USE RECURSION)

- إلى الآن ينبغي أن تكون لديك حدس ما عن كيفية كتابة دوال عودية
- المشكلة أنّك إلى الآن كنت تكتب النسخة العودية من دوال عادةً ما يكون تنفيذها **أسهل بدون استدعاء ذاتي** :(
- إذًا لماذا نتعلّم الاستدعاء الذاتي؟
- بعض المسائل صعبة جدًّا في الحل بالتكرار (iteration)

## الشريحة 52: حدس متى نستخدم الاستدعاء الذاتي (INTUITION for WHEN to use RECURSION)

- تذكّر حين تعلّمنا حلقات `while`؟
- تذكّر حين حاولنا كتابة برنامج يواصل سؤال المستخدم عن أي طريق يختار في «الغابات المفقودة» (the Lost Woods of Zelda)؟
- لم نكن نعرف مسبقًا كم مرّة نحتاج أن نكرّر الحلقة! (أي كم مستوى من `if/else` نحتاج)
- حلقات `while` كانت تكرّر ما دام شرط ما يبقى صادقًا.

```text
if <exit right>:
    <set background to woods_background>
    if <exit right>:
        <set background to woods_background>
        if <exit right>:
            <set background to woods_background>
            ...
        else:
            <set background to exit_background>
    else:
        <set background to exit_background>
else:
    <set background to exit_background>
```

> **ملاحظة المترجم:** في أسفل هذه الشريحة في الأصل إشعار حقوق: «© Nintendo. All rights reserved. This content is excluded from our Creative Commons license. For more information, see https://ocw.mit.edu/help/faq-fair-use/». هذه المادة من طرف ثالث غير مشمولة برخصة CC، لذلك حُذف الرسم المرتبط بها ولم يُنشر، واقتصرت الترجمة على النص أعلاه.

## الشريحة 53: حدس متى نستخدم الاستدعاء الذاتي (مثال آخر)

- في أمثلة الاستدعاء الذاتي على القوائم حتى الآن، كنّا نعرف كم مستوى نحتاج أن نكرّر فيه.
  - إمّا النظر إلى العناصر مباشرةً أو النظر إليها في مستوى واحد أعمق
- لكنّ القوائم قد تحتوي عناصر هي قوائم، والتي قد تحتوي بدورها عناصر هي قوائم، والتي قد تحتوي بدورها عناصر هي قوائم، وهكذا.
- كيف يمكننا استخدام التكرار (iteration) لإجراء هذه الفحوص؟ هذا صعب.

```python
for i in L:
    if type(i) == list:
        for j in i:
            if type(j) == list:
                for k in j:
                    if type(k) == list:
                        # and so on and on
                        ...
                    else:
                        # do what you need to do
            else:
                # do what you need to do
    else:
        # do what you need to do
# done with the loop over L and all its elements
```

## الشريحة 54: مسائل عودية بطبيعتها (PROBLEMS that are NATURALLY RECURSIVE)

- نظام الملفات (A file system)
- ترتيب العمليات في آلة حاسبة (Order of operations in a calculator)
- طاقم سكوبي-doo يبحث في قلعة مسكونة (Scooby Doo gang searching a haunted castle)
- البيروقراطية (Bureaucracy)

## الشريحة 55: لنرَ كيف ننتقل من مستوى واحد إلى مستويات كثيرة (بشكل عودي)

- مثال: عكس عناصر قائمة (reverse a list's elements)
- كيف نقسّم المسألة إلى نسخة أصغر من المسألة نفسها؟

القائمة في هذه الشريحة:

```text
[1, 2, 3, 4]
```

## الشريحة 56: نفس السؤال — القائمة بعد الإزالة الأولى

```text
[2, 3, 4, 1]
```

- مثال: عكس عناصر قائمة
- كيف نقسّم المسألة إلى نسخة أصغر من المسألة نفسها؟

## الشريحة 57: نفس السؤال

```text
[2, 3, 4, 1]
```

## الشريحة 58: نفس السؤال

```text
[3, 4, 2, 1]
```

## الشريحة 59: نفس السؤال

```text
[3, 4, 2, 1]
```

## الشريحة 60: نفس السؤال

```text
[4, 3, 2, 1]
```

## الشريحة 61: نفس السؤال

```text
[4, 3, 2, 1]
```

> **ملاحظة المترجم:** الشرائح من 55 إلى 61 تكرّر السؤال نفسه («كيف نقسّم المسألة إلى نسخة أصغر؟») بينما تُظهر القائمة في حالة مختلفة، ولا يمكن استرجاع الأسهم أو الأرقام الترتيبية من طبقة النص؛ لذلك نُصّ على محتواها النصّي فقط.

## الشريحة 62: عكس قائمة عناصر: المستوى الأعلى فقط (TOP-LEVEL ONLY)

```python
def my_rev(L):
    # Base case
    if len(L) == 1:
    else:
```

- حالة الأساس (Base case)

## الشريحة 63: عكس قائمة عناصر: المستوى الأعلى فقط

```python
def my_rev(L):
    # Base case
    # Reversing a list with one element is just that list.
    if len(L) == 1:
        return L
    else:
```

- حالة الأساس
- عكس قائمة ذات عنصر واحد هو تلك القائمة نفسها.

## الشريحة 64: عكس قائمة عناصر: المستوى الأعلى فقط

```python
def my_rev(L):
    if len(L) == 1:
        return L
    else:
        return <something> + [L[0]]
```

- الخطوة العودية (Recursive step)
- انقل العنصر عند المؤشر 0 إلى النهاية.
- هذا يُكافئ إلحاق ذلك العنصر بشيء ما
- مثال: `[10,20,30,40]`
- تُعيد: `<something> + [10]`

## الشريحة 65: عكس قائمة عناصر: المستوى الأعلى فقط

```python
def my_rev(L):
    if len(L) == 1:
        return L
    else:
        return my_rev(L[1:]) + [L[0]]
```

- الخطوة العودية
- حُلَّت المسألة نفسها، لكن على القائمة التي تحتوي كل العناصر ما عدا الأول
- مثال: `[10,20,30,40]`
- تُعيد: `my_rev([20,30,40]) + [10]`

## الشريحة 66: عكس قائمة عناصر: المستوى الأعلى فقط — رابط PYTHON TUTOR

```python
def my_rev(L):
    if len(L) == 1:
        return L
    else:
        return my_rev(L[1:]) + [L[0]]

test = [1, 2, "abc"]
print(my_rev(test))
# prints ['abc', 2, 1]

test = [1,['d'],['e',['f', 'g']]]
print(my_rev(test))
# prints this, notice it just reverses top-level elems
# [['e', ['f', 'g']], ['d'], 1]
```

- اختبرها

## الشريحة 67: كل العناصر تُعكس (ALL ELEMENTS GET REVERSED)

- مثال: عكس كل العناصر في كل القوائم الفرعية
- يجب أن نعرف ممّا إذا كان لدينا عنصر أم قائمة

القائمة في هذه الشريحة:

```text
[[1, 2], [3, 4], [[5,6], [7,8]]]
```

- العناصر (غير القوائم) تُوضع في النهاية، والقوائم تُعكس بذاتها

## الشريحة 68: كل العناصر تُعكس

القائمة في هذه الشريحة:

```text
[[1,2], [3, 4], [[5,6], [7,8]]]
```

- إن كانت قائمة، …

## الشريحة 69: كل العناصر تُعكس

القائمة في هذه الشريحة:

```text
[[2,1], [3, 4], [[5,6], [7,8]]]
```

- إن كانت قائمة، …

## الشريحة 70: كل العناصر تُعكس

القائمة في هذه الشريحة:

```text
[[2,1], 3, 4, [[5,6], [7,8]]]
```

- إن لم تكن قائمة …

## الشريحة 71: كل العناصر تُعكس

القائمة في هذه الشريحة:

```text
[[2,1], 3, 4, [[5,6], [7,8]]]
```

- وهكذا.

## الشريحة 72: كل العناصر تُعكس

القائمة في هذه الشريحة:

```text
[[2,1], 3, 4, [[7,8], [5,6]]]
```

- القوائم داخل القوائم تُعكس كل واحدة منها

## الشريحة 73: كل العناصر تُعكس

القائمة في هذه الشريحة:

```text
[[2,1], 3, 4, [[7,8], [6,5]]]
```

- القوائم داخل القوائم تُعكس كل واحدة منها

## الشريحة 74: كل العناصر تُعكس

القائمة في هذه الشريحة:

```text
[[2,1], 3, 4, [[8,7], [6,5]]]
```

- القوائم داخل القوائم تُعكس كل واحدة منها

## الشريحة 75: عكس قائمة عناصر: كل العناصر تُعكس

```python
def deep_rev(L):
    # Base case is NOT the same
    # A single element can either be a
    if len(L) == 1:
        if type(L[0]) != list:
    # Non-list:
    # do something
    else:
    # List:
    # do something
```

- حالة الأساس **ليست** نفسها
- العنصر الواحد قد يكون إمّا

## الشريحة 76: عكس قائمة عناصر: كل العناصر تُعكس

```python
def deep_rev(L):
    if len(L) == 1:
        if type(L[0]) != list:
            # Non-list: it's just the list itself, like before
            return L
        else:
            # List:
            return L
```

- حالة الأساس ليست نفسها
- العنصر الواحد قد يكون إمّا
- غير قائمة: إنها القائمة نفسها، كما في السابق
- قائمة: لا بدّ من عكسها!

## الشريحة 77: عكس قائمة عناصر: كل العناصر تُعكس

```python
def deep_rev(L):
    if len(L) == 1:
        if type(L[0]) != list:
            return L
        else:
            return [deep_rev(L[0])]
```

- حالة الأساس ليست نفسها
- العنصر الواحد قد يكون إمّا
- غير قائمة: إنها القائمة نفسها، كما في السابق
- قائمة: لا بدّ من عكسها!

## الشريحة 78: عكس قائمة عناصر: كل العناصر تُعكس

```python
def deep_rev(L):
    if len(L) == 1:
        if type(L[0]) != list:
            return L
        else:
            return [deep_rev(L[0])]
    else:
        # Recursive step
        # Extract the first element. It can either be a
        if type(L[0]) != list:
            # do something
        else:
            # do something
```

- الخطوة العودية
- استخرج العنصر الأول. قد يكون إمّا

## الشريحة 79: عكس قائمة عناصر: كل العناصر تُعكس

```python
def deep_rev(L):
    if len(L) == 1:
        if type(L[0]) != list:
            return L
        else:
            return [deep_rev(L[0])]
    else:
        # Non-list: reverse the remaining elements and
        # concatenate the result with the first element
        if type(L[0]) != list:
            return deep_rev(L[1:]) + [L[0]]
        else:
            # do something
```

- الخطوة العودية
- استخرج العنصر الأول. قد يكون إمّا
- غير قائمة: اعكس العناصر المتبقّية وألحق الناتج بالعنصر الأول
- قائمة:

## الشريحة 80: عكس قائمة عناصر: كل العناصر تُعكس

```python
def deep_rev(L):
    if len(L) == 1:
        if type(L[0]) != list:
            return L
        else:
            return [deep_rev(L[0])]
    else:
        # Non-list: reverse the remaining elements and
        # concatenate the result with the first element
        # List: reverse the remaining elements and concatenate
        # the result with the first element reversed (it's a list! too)
        if type(L[0]) != list:
            return deep_rev(L[1:]) + [L[0]]
        else:
            return deep_rev(L[1:]) + [deep_rev(L[0])]
```

- الخطوة العودية
- استخرج العنصر الأول. قد يكون إمّا
- غير قائمة: اعكس العناصر المتبقّية وألحق الناتج بالعنصر الأول
- قائمة: اعكس العناصر المتبقّية وألحق الناتج بالعنصر الأول **معكوسًا** (إنه قائمة أيضًا!)

## الشريحة 81: عكس قائمة عناصر: كل العناصر تُعكس — الشيفرة المنظّفة (CLEANED UP CODE)

```python
def deep_rev(L):
    # Extract out the empty list
    if L == []:
        return []
    elif type(L[0]) != list:
        return deep_rev(L[1:]) + [L[0]]
    else:
        return deep_rev(L[1:]) + [deep_rev(L[0])]
```

- استخرج حالة القائمة الفارغة
- استخرج `L[0]`

## الشريحة 82: الفكرة الكبرى (BIG IDEA)

- إجراء الاستدعاء الذاتي في هذه المحاضرة يمكن تطبيقه على **أي تسلسل مرتَّب قابل للفهرسة** (any indexable ordered sequence).
- الفكرة نفسها ستنجح في مسائل تتضمّن سلاسل نصّية (strings).
- الفكرة نفسها ستنجح في مسائل تتضمّن صفوفًا (tuples).

## الشريحة 83: أهم الخلاصات حول الاستدعاء الذاتي (MAJOR RECURSION TAKEAWAYS)

- معظم المسائل تُحلّ بشكل حدسيّ أكثر بالتكرار (iteration)
- نُظهر الاستدعاء الذاتي على هذه المسائل من أجل:
  - أن نُريك طريقة تفكير أخرى في المسألة نفسها (الخوارزمية (Algorithm))
  - أن نُريك كيف تكتب دالة عودية (البرمجة (Programming))
- بعض المسائل لها حلول أجمل بالاستدعاء الذاتي
- إن تعرّفت على حلّ المسألة نفسها مرارًا، فاستخدم الاستدعاء الذاتي (Recursion)

**نصائح (Tips)**

- كل حالة في دالتك العودية يجب أن تُعيد **النوع نفسه** من الشيء؛ مثلًا: لا تجعل حالة الأساس تُعيد `[]` بينما الخطوة العودية تُعيد `len(L[0])+recur(L[1:])`
- لا يلزم أن تكون دالتك كفؤة من المحاولة الأولى (Your function doesn't have to be efficient on the first pass)
- من المقبول أن يكون لديك أكثر من حالة أساس واحدة (It's ok to have more than 1 base case)
- من المقبول أن تقسّم المسألة إلى كثير من `if`/`elif` (It's ok to break down the problem into many if/elifs)
- ما دام أنك تتقدّم عوديًا نحو حالة أساس

## الشريحة 84: جرّب بنفسك (YOU TRY IT!)

- أضفتُ أسئلة تدريب كثيرة على الاستدعاء الذاتي في ملف `.py` المرتبط بهذه المحاضرة، للتحضير للاختبار القصير (quiz).
- 1) تمرين لتنفيذ دالة عودية (من غير قوائم داخل قوائم إلخ)
- 2) تمرين لتنفيذ دالة عودية (بقوائم داخل قوائم داخل قوائم إلخ)
- 3) ثلاثة تطبيقات عودية فيها أخطاء لإصلاحها (Three buggy recursion implementations to fix).

## الشريحة 85: MIT OpenCourseWare

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- للاستعلام عن كيفية الاستشهاد بهذه المواد أو شروط الاستخدام، راجع: <https://ocw.mit.edu/terms>