---
book: mit-6100l
chapter: lecture-17
slug: notes
lang: ar
title: "المحاضرة 17: الأصناف في Python (Python Classes)"
---

# المحاضرة 17: الأصناف في Python (Python Classes)

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-17-python-classes/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17_code_py/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec17/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (30 شريحة). المواضع التي يعرض فيها النص المستخرَج قائمة بيانات على يسار الشريحة نُقلت إلى جداول أو إلى صيغة `code`، والرسوم التخطيطية للذاكرة نُقلت إلى جداول. الشيفرة تُركت بالإنجليزية كما هي. الأشكال لم تُضمَّن، وحيث توجد صورة غير مشمولة بالرخصة أُشير إلى ذلك صراحةً.

## الشريحة 1: عنوان المحاضرة

- PYTHON CLASSES
- (download slides and .py files to follow along)
- 6.100L Lecture 17 — Ana Bell

## الشريحة 2: الكائنات (OBJECTS)

يدعم Python أنواعًا كثيرة مختلفة من البيانات:

```text
1234
3.14159
"Hello"
[1, 5, 7, 11, 13]
{"CA": "California", "MA": "Massachusetts"}
```

- كل واحد منها **كائن (object)**، وكل كائن له:
  - **تمثيل داخلي للبيانات** (internal data representation) — أولي (primitive) أو مركّب (composite)
  - مجموعة من الإجراءات (procedures) للتفاعل مع الكائن
- الكائن هو **نسخة (instance)** من **نوع (type)**
  - `1234` نسخة من `int`
  - `"hello"` نسخة من `str`

## الشريحة 3: البرمجة الكينونية (OBJECT ORIENTED PROGRAMMING — OOP)

- **كل شيء في Python كائن** (وله نوع)
- يمكن إنشاء كائنات جديدة من نوع ما
- يمكن التعامل مع الكائنات
- يمكن إتلاف الكائنات
  - إمّا صراحةً باستخدام `del` أو بمجرد «نسيانها»
- سيستعيد نظام Python الكائنات المدمَّرة أو التي لا يمكن الوصول إليها — ويُسمّى ذلك **جمع القمامة (garbage collection)**

## الشريحة 4: ما هي الكائنات؟ (WHAT ARE OBJECTS?)

- الكائنات هي **تجريد للبيانات (data abstraction)** يلتقط:
  1. **تمثيلًا داخليًا** — عبر **سمات بيانات (data attributes)**
  2. **واجهة (interface)** للتفاعل مع الكائن — عبر **الدوال (methods)** (أي procedures/functions)
- يعرّف السلوك (behaviors) لكن يُخفي التنفيذ (implementation)

## الشريحة 5: مثال: `list` من نوع `[1,2,3,4]`

- (1) كيف تُمثَّل القوائم داخليًا؟
  - لا يهمّنا الأمر كثيرًا بصفتنا مستخدمين (تمثيل خاص (private representation))
- التمثيل الداخلي ينبغي أن يكون خاصًا
- قد يُفسِد السلوك الصحيح إذا تعاملتَ مع التمثيل الداخلي مباشرةً

- (2) كيف تتعامل مع القوائم وتُعِدّها؟
  - `L[i]`، `L[i:j]`، `+`
  - `len()`، `min()`، `max()`، `del(L[i])`
  - `L.append()`، `L.extend()`، `L.count()`، `L.index()`، `L.insert()`، `L.pop()`، `L.remove()`، `L.reverse()`، `L.sort()`

> **ملاحظة المترجم:** رُسم في الشريحة الأصلية تمثيلان محتملان للقائمة نفسها (`L = 1 -> 2 -> 3` و`L = 1 -> 2 -> 3 ->`)، بغرض الإشارة إلى أنّ الشكل الداخلي لا يهمّ المستخدم. الأشكال غير قابلة للاسترجاع من طبقة النص، لذلك نُصَّ على المعنى ولم يُرسم شيء.

## الشريحة 6: أمثلة من الحياة الواقعية (REAL-LIFE EXAMPLES)

- **المصعد (Elevator)**: صندوق يمكنه تغيير الطوابق
  - يمثَّل بـ `length`، `width`، `height`، `max_capacity`، `current_floor`
  - ينقل موقعه إلى طابق مختلف، ويضيف أشخاصًا، ويزيل أشخاصًا

- **الموظف (Employee)**: شخص يعمل في شركة
  - يمثَّل بـ `name`، `birth_date`، `salary`
  - يمكنه تغيير اسمه أو راتبه

- **طابور في متجر (Queue at a store)**: أوّل زبون يصل هو أوّل من يُخدَم
  - يمثَّل الزبائن كقائمة أسماء نصّية (`str`)
  - تُضاف الأسماء إلى النهاية وتُزال الأسماء من البداية

- **كعكة الفطور (Stack of pancakes)**: أوّل فطيرة تُصنع هي آخر فطيرة تُؤكل
  - يمثَّل المكدّس كقائمة `str`
  - تُضاف الفطيرة إلى النهاية وتُزال من النهاية

## الشريحة 7: مزايا البرمجة الكينونية (ADVANTAGES OF OOP)

- تجميع البيانات في حزم مع الإجراءات التي تعمل عليها عبر واجهات محدّدة بوضوح
- تطوير على مبدأ «قسِّم وغلب» (divide-and-conquer)
  - ننفّذ ونختبر سلوك كل صنف على حدة
  - زيادة الوحدات النمطية (modularity) تُقلّل التعقيد
- الأصناف تجعل إعادة استخدام الشيفرة سهلة
  - كثير من وحدات Python (modules) تُعرِّف أصنافًا جديدة
  - لكل صنف بيئة منفصلة (لا تعارض في أسماء الدوال)
  - الوراثة (inheritance) تتيح للأصناف الفرعية (subclasses) أن تُعيد تعريف سلوك محدّد من صنف أب أو توسّعه

## الشريحة 8: الفكرة الكبرى (BIG IDEA)

- أنت تكتب الصنف، وأنت من يتّخذ القرارات التصميمية.
- أنت تقرّر أي بيانات تمثّل الصنف.
- أنت تقرّر ما العمليات التي يستطيع المستخدم إجراؤها على الصنف.

## الشريحة 9: إنشاء أنواعك الخاصة واستخدامها بالأصناف (CREATING AND USING YOUR OWN TYPES WITH CLASSES)

نميّز بين **إنشاء صنف (class)** و**استخدام نسخة (instance)** من ذلك الصنف.

- إنشاء الصنف ينطوي على:
  - تعريف اسم الصنف
  - تعريف سمات الصنف (class attributes)
  - مثال: كتب شخصٌ شيفرةً لتنفيذ صنف قائمة (list class)
- استخدام الصنف ينطوي على:
  - إنشاء نسخ جديدة من الصنف
  - إجراء عمليات على تلك النسخ
  - مثال: `L=[1,2]` و `len(L)`

## الشريحة 10: تناظر مع الدوال (A PARALLEL with FUNCTIONS)

- تعريف صنف يشبه تعريف دالة (defining a class is like defining a function)
  - مع الدوال، نخبر Python أنّ هذا الإجراء موجود
  - مع الأصناف، نخبر Python عن مخطّط (blueprint) لهذا النوع الجديد من البيانات
    - سمات البيانات الخاصة به (data attributes)
    - سماته الإجرائية (procedural attributes)
- إنشاء نسخ من الكائنات يشبه استدعاء الدالة (calling the function)
  - مع الدوال نُجري استدعاءات بمُدخَلات فعلية (actual parameters) مختلفة
  - مع الأصناف، نُنشئ كائنات جديدة من هذا النوع في الذاكرة
  - `L1 = [1,2,3]` / `L2 = [5,6,7]`

## الشريحة 11: قرارات تصميم نوع الإحداثيات (COORDINATE TYPE DESIGN DECISIONS)

- نقرّر ما عناصر البيانات التي تُكوِّن كائنًا
  - في مستوٍى ثنائي الأبعاد (2D plane)
  - الإحداثيّ يُعرَّف بقيمة `x` وقيمة `y`

```text
(1 , 1)
```

- نقرّر ماذا نفعل بالإحداثيّات
  - تخبرنا بمدى بُعد الإحداثيّ على المحور `x` أو على المحور `y`
  - نقيس المسافة بين إحداثيّين، بفيثاغورس (Pythagoras)

```text
(3 , 4)
```

يمكن إنشاء نسخ من كائن `Coordinate`.

## الشريحة 12: عرّف أنواعك الخاصة (DEFINE YOUR OWN TYPES)

- استخدم الكلمة المفتاحية `class` لتعريف نوع جديد

```python
class Coordinate(object):
    #define attributes here
```

- مشابهة لـ `def`: شفّر الكود (indentation) لتبيّن أيّ الجمل تنتمي إلى تعريف الصنف
- كلمة `object` تعني أنّ `Coordinate` هو كائن في Python وأنّه يرث كل سماته (سنرى ذلك في محاضرات لاحقة)

## الشريحة 13: ما هي السمات؟ (WHAT ARE ATTRIBUTES?)

- بيانات وإجراءات «تنتمي» إلى الصنف

- **سمات البيانات (data attributes)**
  - تخيّل البيانات ككائنات/متغيّرات أخرى تُكوِّن الصنف
  - مثال: الإحداثيّ يتكوّن من عددين

- **الدوال (Methods — سمات إجرائية procedural attributes)**
  - تخيّل الدوال كدوال تعمل مع هذا الصنف وحده
  - كيف تتفاعل مع الكائن
  - مثال: يمكنك تعريف مسافة بين كائنَي إحداثيّ، لكن لا معنى لمسافة بين كائنَي قائمة

## الشريحة 14: تعريف كيفية إنشاء نسخة من صنف (DEFINING HOW TO CREATE AN INSTANCE OF A CLASS)

- أوّلًا يجب أن نعرّف كيفية إنشاء نسخة من الصنف
- استخدم دالة خاصة اسمها `__init__` لتهيئة بعض سمات البيانات أو لتنفيذ عمليات تهيئة

```python
class Coordinate(object):
    def __init__(self, xval, yval):
        self.x = xval
        self.y = yval
```

- تتيح لك `self` إنشاء متغيّرات تنتمي إلى هذا الكائن
- بدون `self`، أنت لا تنشئ سوى متغيّرات عادية!

## الشريحة 15: ما هي `self`؟ مثال الغرفة (WHAT is self? ROOM EXAMPLE)

- الآن عندما تنشئ نسخة واحدة (سمِّها `living_room`)، تصبح `self` هي هذا الكائن الفعلي
- تخيّل تعريف الصنف كمخطّط (blueprint) فيه أماكن فارغة لعناصر فعلية
  - لدى `self` كرسيّ
  - لدى `self` طاولة قهوة
  - لدى `self` أريكة
- لدى `living_room` كرسيّ أزرق
- لدى `living_room` طاولة سوداء
- لدى `living_room` أريكة بيضاء
- يمكن إنشاء نسخ كثيرة باستخدام المخطّط نفسه

> **ملاحظة المترجم:** في أسفل هذه الشريحة في الأصل إشعار حقوق: «Image © source unknown. All rights reserved. This content is excluded from our Creative Commons license. For more information, see https://ocw.mit.edu/help/faq-fair-use/». الصورة من طرف ثالث مصدرها مجهول وغير مشمولة برخصة CC، لذلك حُذفت ولم تُنشر، واقتصرت الترجمة على النص أعلاه.

## الشريحة 16: الفكرة الكبرى (BIG IDEA)

- عند تعريف صنف، لا يوجد هنا كائن ملموس فعلي.
- هذا تعريف فقط.

## الشريحة 17: إنشاء نسخة من صنف فعليًا (ACTUALLY CREATING AN INSTANCE OF A CLASS)

تذكّر دالة `__init__` في تعريف الصنف:

```python
def __init__(self, xval, yval):
    self.x = xval
    self.y = yval
```

- لا تُمرِّر مُدخَلًا لـ `self`، فـ Python تفعل ذلك تلقائيًا

```python
c = Coordinate(3,4)
origin = Coordinate(0,0)
print(c.x)
print(origin.x)
```

- سمات البيانات الخاصة بنسخة ما تُسمّى **متغيّرات النسخة (instance variables)**
- عُرِّفت سمات البيانات بـ `self.XXX` وهي قابلة للوصول عبر **ترميز النقطة (dot notation)** طوال عمر الكائن
- كل النسخ لها سمات البيانات هذه، لكن بقيم مختلفة!

## الشريحة 18: تمثيل النسخ (VISUALIZING INSTANCES)

- لنفترض أنّنا أنشأنا نسخة من إحداثيّ

```python
c = Coordinate(3,4)
```

| الكائن | النوع | `x` | `y` |
|---|---|---|---|
| `c` | `Coordinate` | 3 | 4 |

- تخيّل هذا كأنّنا ننشئ بنية (structure) في الذاكرة
- ثم إن قِسْنا `c.x` فإننا نبحث عن البنية التي يشير إليها `c`، ثم نبحث عن الربط (binding) لـ `x` داخل تلك البنية

## الشريحة 19: تمثيل النسخ: في الذاكرة (VISUALIZING INSTANCES: in memory)

- اصنع نسخة أخرى باستخدام متغيّر

```python
a = 0
orig = Coordinate(a,a)
```

| الكائن | النوع | `x` | `y` |
|---|---|---|---|
| `c` | `Coordinate` | 3 | 4 |
| `orig` | `Coordinate` | 0 | 0 |
| `a` | `int` | 0 | — |

- كل هذه مجرّد كائنات في الذاكرة!
- نحن لا نتعامل سوى مع سمات هذه الكائنات

## الشريحة 20: تمثيل النسخ: ارسمها (VISUALIZING INSTANCES: draw it)

```python
class Coordinate(object):
    def __init__(self, xval, yval):
        self.x = xval
        self.y = yval

c = Coordinate(3,4)
origin = Coordinate(0,0)
print(c.x)
print(origin.x)
```

| الكائن | النوع | `x` | `y` |
|---|---|---|---|
| `c` | `Coordinate` | 3 | 4 |
| `origin` | `Coordinate` | 0 | 0 |

## الشريحة 21: ما هي الدالة (method)؟ (WHAT IS A METHOD?)

- سمة إجرائية (procedural attribute)
- تخيّلها كدالة تعمل مع هذا الصنف وحده
- يمرّر Python دائمًا الكائن كالمُدخَل (argument) الأول
- العُرف أن نستخدم `self` كاسم المُدخَل الأول لكل الدوال

## الشريحة 22: عرّف دالة (method) لصنف `Coordinate` (DEFINE A METHOD FOR THE Coordinate CLASS)

```python
class Coordinate(object):
    def __init__(self, xval, yval):
        self.x = xval
        self.y = yval

    def distance(self, other):
        x_diff_sq = (self.x-other.x)**2
        y_diff_sq = (self.y-other.y)**2
        return (x_diff_sq + y_diff_sq)**0.5
```

- بخلاف `self` وترميز النقطة، تتصرّف الدوال تمامًا كالدوال العادية (تأخذ مُدخَلات، وتنفّذ عمليات، وتُعيد قيمة)

## الشريحة 23: كيف تُستدعى الدالة؟ (HOW TO CALL A METHOD?)

- يُستخدم معامل `.` للوصول إلى أي سمة
  - سمة بيانات لكائن (رأينا `c.x`)
  - دالة لكائن
- ترميز النقطة:

```text
<object_variable>.<method>(<parameters>)
```

- مألوف؟

```python
my_list.append(4)
my_list.sort()
```

## الشريحة 24: كيف تستخدم دالة (HOW TO USE A METHOD)

تذكّر تعريف دالة `distance`:

```python
def distance(self, other):
    x_diff_sq = (self.x-other.x)**2
    y_diff_sq = (self.y-other.y)**2
    return (x_diff_sq + y_diff_sq)**0.5
```

استخدام الصنف:

```python
c = Coordinate(3,4)
orig = Coordinate(0,0)
print(c.distance(orig))
```

- لاحظ أنّ `self` تصبح الكائن الذي تستدعي عليه الدالة (الشيء الذي قبل النقطة!)

## الشريحة 25: تمثيل الاستدعاء (VISUALIZING INVOCATION)

- صنف `Coordinate` كائن في الذاكرة، قادمٌ من تعريف الصنف

| العنصر | القيمة |
|---|---|
| `self.x` | some code |
| `self.y` | some code |
| `__init__` | some code |
| `distance` | some code |

- أنشئ كائنَي `Coordinate`

```python
c = Coordinate(3,4)
orig = Coordinate(0,0)
```

| الكائن | النوع | `x` | `y` |
|---|---|---|---|
| `c` | `Coordinate` | 3 | 4 |
| `orig` | `Coordinate` | 0 | 0 |

## الشريحة 26: تمثيل الاستدعاء (VISUALIZING INVOCATION)

- قِسْ استدعاء الدالة `c.distance(orig)`
  1) الكائن هو ما قبل النقطة
  2) نبحث عن نوع `c`
  3) الدالة التي ستُستدعى هي ما بعد النقطة.
  4) نبحث عن الربط (binding) لـ `distance` في صنف الكائن ذلك
  5) نُنادي تلك الدالة بحيث `c` هي `self` و `orig` هي `other`

## الشريحة 27: طريقة استخدام الدالة (HOW TO USE A METHOD)

- الطريقة المعتادة

```python
c = Coordinate(3,4)
zero = Coordinate(0,0)
c.distance(zero)
```

- تُكافئ تمامًا

```python
c = Coordinate(3,4)
zero = Coordinate(0,0)
Coordinate.distance(c, zero)
```

## الشريحة 28: الفكرة الكبرى (BIG IDEA)

- معامل `.` يصل إمّا إلى سمات بيانات وإمّا إلى دوال.
- سمات البيانات تُعرَّف بـ `self.something`
- الدوال هي دوال مُعرَّفة داخل الصنف مع `self` كأول مُدخَل.

## الشريحة 29: قوة البرمجة الكينونية (THE POWER OF OOP)

- نجمع معًا كائنات تتشارك:
  - سمات مشتركة
  - إجراءات تعمل على تلك السمات
- نستخدم التجريد (abstraction) للتمييز بين كيفية تنفيذ كائن وكيفية استخدامه
- نبني طبقات من تجريدات الكائنات ترث سلوكًا من أصناف كائنات أخرى
- ننشئ أصنافنا الخاصة من الكائنات فوق الأصناف الأساسية في Python

## الشريحة 30: MIT OpenCourseWare

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- للاستعلام عن كيفية الاستشهاد بهذه المواد أو شروط الاستخدام، راجع: <https://ocw.mit.edu/terms>