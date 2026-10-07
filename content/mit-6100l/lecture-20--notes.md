---
book: mit-6100l
chapter: lecture-20
slug: notes
lang: ar
title: "المحاضرة 20: مثال البرمجة كائنية التوجه: متتبّع اللياقة (Fitness Tracker)"
---

# المحاضرة 20: مثال البرمجة كائنية التوجه: متتبّع اللياقة (Fitness Tracker)

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-20-fitness-tracker-object-oriented-programming-example/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec20_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec20.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec20_code_zip/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec20/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (34 شريحة). المواضع التي يعرض فيها النص المستخرَج مخططًا لكائن وصنف في الذاكرة، أو مخططًا هرميًا، نُقلت إلى جداول أو قوائم. الشيفرة وعناوين وثائق الأصناف (docstrings) تُركت بالإنجليزية كما هي. صور شاشات الأجهزة والمُصنِّعين (Apple وFitbit وGarmin) مستثناة من رخصة CC حسب تنويه حقوق النشر في ملف MIT نفسه، فلم تُنشر.

## الشريحة 1: عنوان المحاضرة

- FITNESS TRACKER — OBJECT ORIENTED PROGRAMMING EXAMPLE
- (download slides and .py files to follow along)
- 6.100L Lecture 20 — Ana Bell

## الشريحة 2: تنفيذ الصنف مقابل استخدام الصنف

مقابل: **تنفيذ الصنف (Implementing the class)** ⟷ **استخدام الصنف (Using the class)**

| تنفيذ نوع كائن جديد بصنف | استخدام نوع الكائن الجديد في الشيفرة |
| --- | --- |
| عرّف الصنف | أنشئ نسخًا (instances) من نوع الكائن |
| عرّف سمات البيانات (ما هو الكائن) | نفّذ عمليات عليها |
| عرّف الدوال (كيفية استخدام الكائن) | النسخ لها قيم محدّدة لكل سمة |

- الصنف يلتقط بشكل مجرّد الخصائص والسلوكيات المشتركة
- منظوران مختلفان لكتابة الشيفرة

## الشريحة 3: مثال متتبّع التمارين (Workout Tracker)

- نشكر Sam Maynard على هذا مثال البرمجة الكائنية التوجه (شرائحه جرى تعديلها)
- نفترض أننا نكتب برنامجًا يتتبّع التمارين الرياضية، مثلًا لساعة ذكية (smart watch)

> **ملاحظة المترجم:** الصور في هذه الشريحة مستثناة من رخصة CC. تنويه حقوق النشر في الملف الأصلي:
> "Watch and fitness tracker screens © Apple. Fitbit © Fitbit Inc. Different kinds of workouts. Apple Garmin watch © Garmin. All rights reserved. This content is excluded from our Creative Commons license."
> لذلك لم تُنشر الصور، ونُقلت النقاط النصية فقط. للمزيد: <https://ocw.mit.edu/help/faq-fair-use/>

## الشريحة 4: Fitness Tracker

أنواع مختلفة من التمارين الرياضية:

**خصائص مشتركة:**

- الأيقونة (Icon)
- التاريخ (Date)
- وقت البداية (Start Time)
- وقت النهاية (End Time)
- معدل ضربات القلب (Heart Rate)
- النوع (Kind)
- السعرات الحرارية (Calories)
- المسافة (Distance)

**خاص بسباحة:**

- سرعة السباحة (Swimming Pace)
- نوع الضربة (Stroke Type)
- تقسيمات كل 100 يارد (100 yd Splits)

**خاص بجرية:**

- الإيقاع (Cadence)
- سرعة الجري (Running Pace)
- تقسيمات كل ميل (Mile Splits)
- الارتفاع (Elevation)

> **ملاحظة المترجم:** صور الشاشة في هذه الشريحة © Apple ومستثناة من رخصة CC، فلم تُنشر؛ ونُقلت القوائم النصية أعلاه.

## الشريحة 5: مجموعات الكائنات لها سمات (مراجعة)

- **سمات بيانات (Data attributes)**
  - كيف يمكن أن تمثّل كائنك ببيانات؟
  - ما هو الكائن:
    - لإحداثيَّي (coordinate): قيمتَي `x` و`y`
    - لتمرين رياضي (workout): وقت البداية، ووقت النهاية، والسعرات الحرارية
- **سمات وظيفية (Functional attributes)** — أي السلوك أو العمليات أو الدوال (methods):
  - كيف يمكن أن يتفاعل أحدهم مع الكائن؟
  - ماذا يفعل:
    - لإحداثيَّين: إيجاد المسافة بين إحداثيين
    - لتمرين رياضي: عرض بطاقة معلومات

> **ملاحظة المترجم:** صورة الشاشة في هذه الشريحة © Apple ومستثناة من رخصة CC، فلم تُنشر.

## الشريحة 6: عرّف صنفًا بسيطًا (مراجعة)

```python
class Workout(object):
    def __init__(self, start, end, calories):
        self.start = start
        self.end = end
        self.calories = calories
        self.icon = '😓😓'
        self.kind = 'Workout'

my_workout = Workout('9/30/2021 1:35 PM', 9/30/2021 1:57 PM', 200)
```

> **ملاحظة المترجم:** السطر الأخير في الملف الأصلي فيه خطأ مطبعي (علامتا اقتباس مفردتان ناقصتان في الوسيط); نُقل كما هو.

## الشريحة 7: دوال الجلب ودوال التعيين (مراجعة)

```python
class Workout(object):
    def __init__(self, start, end, calories):
        self.start = start
        self.end = end
        self.calories = calories
        self.icon = '😓😓'
        self.kind = 'Workout'

    def get_calories(self):
        return self.calories

    def get_start(self):
        return self.start

    def get_end(self):
        return self.end

    def set_calories(self, calories):
        self.calories = calories

    def set_start(self, start):
        self.start = start

    def set_end(self, end):
        self.end = end
```

- تُستخدم دوال الجلب ودوال التعيين خارج الصنف للوصول إلى سمات البيانات

## الشريحة 8: Demo — SELF PROVIDES ACCESS TO CLASS STATE

```python
my_workout = Workout('9/30/2021 1:35 PM', 9/30/2021 1:57 PM', 200)
```

مخطط الكائن في الذاكرة، كما يظهر في النص المستخرَج:

| الصنف (Class State Dictionary) | النسخة (Instance State Dictionary) |
| --- | --- |
| `Workout` — الصنف | `my_workout` — نسخة |
| `__init__()` | `start` |
| `get_calories()` | `end` |
| `get_start()` | `calories` |
| `get_end()` | `icon` |
| `set_calories()` | `kind` |
| `set_start()` | |
| `set_end()` | |

- تُوصول إليها عبر الكلمة المفتاحية `self`

> **ملاحظة المترجم:** هذا المخطط في الأصل رسم يربط كل دالة أو سمة في الصنف بما يقابلها في النسخة عبر أسهم. الأسهم لا تظهر في طبقة النص، لذا نُقلت القائمة الاثنتين كما وردت من اليسار إلى اليمين، والربط بينها هو: `__init__` ينشئ سمات النسخة `start` و`end` و`calories` و`icon` و`kind`، ودوال الجلب/التعيين تقرأ وتكتب هذه السمات.

## الشريحة 9: النسخة (instance) وصيغة النقطة (مراجعة)

- إنشاء نسخة (instantiation) يُنشئ نسخة من كائن:

```python
myWorkout = Workout('9/30/2021 1:35 PM', '9/30/2021 1:57 PM', 200)
```

- تُستخدم صيغة النقطة للوصول إلى السمات (بيانات ودوال)
- الأفضل استخدام دوال الجلب ودوال التعيين للوصول إلى سمات البيانات:

```python
my_workout.calories
my_workout.get_calories()
```

## الشريحة 10: لماذا نخفي المعلومات؟

- أبقِ واجهة صنفك أبسط ما يمكن
- استخدم دوال الجلب ودوال التعيين، لا السمات مباشرة
  - أي: استخدم دالة `get_calories()` **وليس** سمة `calories`
- هذا يمنع الأخطاء الناتجة عن تغيّرات التنفيذ
- قد يبدو تافهًا في البرامج الصغيرة، لكن في البرامج الكبيرة تزيد الواجهات المعقّدة احتمال حدوث الأخطاء
- إذا كنت تكتب صنفًا ليستخدمه آخرون، فأنت تلتزم بصيانة واجهته!

## الشريحة 11: تغيير تنفيذ الصنف

- قد يغيّر كاتب تعريف الصنف التمثيل الداخلي أو طريقة التنفيذ
- استخدم متغيّر صنف (class variable)
- الآن تقدّر `get_calories` السعرات الحرارية بناءً على مدة التمرين إذا لم تُمرَّر سعرات
- إذا كنت تصل إلى سمات البيانات خارج الصنف وتغيّر تنفيذ الصنف، فقد تحصل على أخطاء

## الشريحة 12: Demo — CHANGING THE CLASS IMPLEMENTATION

```python
class Workout:
    cal_per_hr = 200

    def __init__(self, start, end, calories=None):
        self.start = parser.parse(start)
        self.end = parser.parse(end)
        self.calories = calories # may be None
        self.icon = '😓😓'
        self.kind = 'Workout'

    def get_calories(self):
        if (calories == None):
            return Workout.cal_per_hr*(self.end-self.start).total_seconds()/3600
        else:
            return self.calories
```

> **ملاحظة المترجم:** الشرط `if (calories == None)` في الملف الأصلي يشير إلى `calories` غير المعرَّفة بدل `self.calories`، وهو خطأ في الأصل المطبوع؛ نُقل كما هو. (وفي ملفات الشيفرة المرافقة صُحّح إلى `self.calories`.)

## الشريحة 13: ملاحظة جانبية: كائنات `datetime` ومكتبات بايثون أخرى

- تأخذ السلسلة التي تمثّل التاريخ والوقت وتحوّلها إلى كائن `datetime`:

```python
from dateutil import parser
start = '9/30/2021 1:35 PM'
end = '9/30/2021 1:45 PM'
start_date = parser.parse(start)
end_date = parser.parse(end)
type(start_date)
```

- لماذا نفعل ذلك؟ لأنه يجعل العمليات على التواريخ سهلة! كائن `datetime` يتولّى كل شيء:

```python
print((end_date-start_date).total_seconds())
```

> **ملاحظة المترجم:** عنوان الشريحة في الأصل «ASIDE: datetime OBJECTS / OTHER PYTON LIBRARIES»، وفيه خطأ مطبعي (`PYTON` بدل `PYTHON`)؛ نُقل العنوان مع تصحيح الهجاء، والكلمة `ASIDE` تُترجم هنا بـ «ملاحظة جانبية».

## الشريحة 14: متغيّرات الصنف تعيش في قاموس حالة الصنف

| الصنف (Class State Dictionary) | النسخة (Instance State Dictionary) |
| --- | --- |
| `Workout` — الصنف | `my_workout` — نسخة |
| `__init__()` | `start` |
| `get_calories()` | `end` |
| `get_start()` | `calories` |
| `get_end()` | `set_calories()` |
| `set_calories()` | `icon` |
| `set_start()` | `kind` |
| `set_end()` | `cal_per_hr` |

- تُوصول إليها عبر الكلمة المفتاحية `self`

> **ملاحظة المترجم:** هذا هو المخطط نفسه الذي في الشريحة 8 مع إضافة اسم واحد. في النص المستخرَج يتشابك ترتيب عمودَي القائمة، لذا نُقل إلى جدولين. والإضافة هي `cal_per_hr`: هي **متغيّر صنف (class variable)**، ولذلك تقع في قاموس حالة الصنف لا في قاموس حالة النسخة.

## الشريحة 15: متغيّرات الصنف (Class Variables)

- اربط متغيّر صنف مع كل نسخ الصنف
- **تحذير:** إذا غيّرت نسخة واحدة متغيّر الصنف، فهو يتغيّر لكل النسخ

```python
class Workout:
    cal_per_hr = 200

    def __init__(self, start, end, calories):
        …

print(Workout.cal_per_hr)
w = Workout('1/1/2021 2:34', '1/1/2021 3:35', None)
print(w.cal_per_hr)
Workout.cal_per_hr = 250
print(w.cal_per_hr)
```

## الشريحة 16: جرّب بنفسك!

- اكتب أسطر شيفرة لإنشاء كائني `Workout`
- كائن `Workout` واحد يُحفظ في المتغيّر `w_one`، من 1 يناير 2021 الساعة 3:30 مساءً حتى 4 مساءً. تريد تقدير السعرات الحرارية من هذا التمرين. اطبع عدد السعرات الحرارية لـ `w_one`.
- كائن `Workout` آخر يُحفظ في `w_two`، من 1 يناير 2021 الساعة 3:35 مساءً حتى 4 مساءً. أنت تعرف أنك حرقت 300 سعرة حرارية في هذا التمرين. اطبع عدد السعرات الحرارية لـ `w_two`.

## الشريحة 17: التالي: تسلسلات الأصناف (Class Hierarchies)

## الشريحة 18: التسلسلات الهرمية (Hierarchies)

- **صنف الأب (Parent class)** — أي الصنف الأعلى (superclass)
- **صنف الابن (Child class)** — أي الصنف الأدنى (subclass)
  - يرث كل البيانات والسلوكيات من صنف الأب
  - يضيف معلومات أكثر
  - يضيف سلوكيات أكثر
  - يتجاوز (override) سلوكًا

المخطط الهرمي كما يظهر في النص المستخرَج:

- `Workout`
- `Outdoor Workout` — ابن `Workout`
- `Indoor Workout` — ابن `Workout`
- `Swimming` — ابن `Outdoor Workout`
- `Running` — ابن `Outdoor Workout`
- `Treadmill` — ابن `Indoor Workout`
- `Weights` — ابن `Indoor Workout`

## الشريحة 19: Fitness Tracker — أنواع مختلفة من التمارين

**خصائص مشتركة:**

- الأيقونة (Icon)
- التاريخ (Date)
- الوقت (Time)
- وقت البداية (Start)
- وقت النهاية (End Time)
- معدل ضربات القلب (Heart Rate)
- النوع (Kind)
- السعرات الحرارية (Calories)
- المسافة (Distance)

**خاص بسباحة:**

- سرعة السباحة (Swimming Pace)
- نوع الضربة (Stroke Type)
- تقسيمات كل 100 يارد (100 yd Splits)

**خاص بجرية:**

- الإيقاع (Cadence)
- سرعة الجري (Running Pace)
- تقسيمات كل ميل (Mile Splits)
- الارتفاع (Elevation)

> **ملاحظة المترجم:** صور الشاشة في هذه الشريحة © Apple ومستثناة من رخصة CC، فلم تُنشر. ولاحظ أن هذه القائمة تختلف قليلًا عن الشريحة 4: هنا يظهر «Time» و«Start» منفصلين بدل «Start Time» فقط.

## الشريحة 20: الوراثة: صنف الأب

```python
class Workout(object):
    cal_per_hr = 200

    def __init__(self, start, end, calories=None):
        …
```

- كل شيء كائن
- كائن الصنف ينفّذ العمليات الأساسية في بايثون، مثل ربط المتغيّرات

## الشريحة 21: الوراثة: الصنف الابن

```python
class RunWorkout(Workout):
    def __init__(self, start, end, elev=0, calories=None):
        super().__init__(start,end,calories)
        self.icon = '🏃'
        self.kind = 'Running'
        self.elev = elev

    def get_elev(self):
        return self.elev

    def set_elev(self, e):
        self.elev = e
```

- تُضاف وظيفة جديدة، مثل `get_elev()`
- يمكن استدعاء الدوال الجديدة على نسخة من نوع `RunWorkout`
- تستخدم `__init__` الدالة `super()` لإعداد النسخة الأساسية من `Workout` (ويمكن أيضًا استدعاء `Workout.__init__(start,end,calories)` مباشرة)

## الشريحة 22: Demo — تمثيل الوراثة في الذاكرة

| صنف `Workout` (Class State) | صنف `RunWorkout` (Class State) | النسخة (Instance State) |
| --- | --- | --- |
| `__init__()` | `RunWorkout` — الصنف | `start` |
| `get_calories()` | `__init__()` | `end` |
| `get_start()` | `super()` | `calories` |
| `get_end()` | `get_elev()` | `icon` |
| `set_calories()` | `set_elev()` | `kind` |
| `set_start()` | `cals_per_km` — يظهر لاحقًا | `elev` |
| `set_end()` | | |
| `cal_per_hr` | | |

- تُوصول إلى سمات النسخة عبر الكلمة المفتاحية `self`

> **ملاحظة المترجم:** في النص المستخرَج تتشابك أسماء العناصر الثلاثة، لذا نُقلت إلى جدول بثلاثة أعمدة. الترتيب الحرفي للأسماء كما ورد: `Workout`، `Class`، `get_start()`، `get_end()`، `RunWorkout`، `set_calories()`، `instance`، `set_start()`، `super()`، `RunWorkout`، `Class`، `start`، `end`، `set_end()`، `calories`، `__init__()`، `icon`، `cal_per_hr`، `kind`، `elev`، `get_elev()`، `set_elev()`، `Accessed via "self" keyword`، `Instance State`، `Class State`.

## الشريحة 23: لماذا نستخدم الوراثة؟

- **تحسين الوضوح**
  - أوجه التشابه صريحة في صنف الأب
  - أوجه الاختلاف صريحة في الصنف الابن
- **إعادة استخدام الشيفرة**
- **تعزيز الترابطية (Modularity)**
  - يمكن تمرير الأصناف الأبناء إلى أي دالة تستخدم الصنف الأب

## الشريحة 24: الأصناف الأبناء تعيد استخدام شيفرة الصنف الأب

- دالة طباعة معقّدة مشتركة بين كل الأصناف الأبناء

```python
class Workout(object):
    ………

    def __str__(self):
        outputs
        width = 16
        retstr = f"|{'–'*width}|\n"
        retstr += f"|{' ' *width}|\n"
        iconLen = 0
        retstr += f"| {self.icon}{' '*(width-3)}|\n"
        retstr += f"| {self.kind}{' '*(width-len(self.kind)-1)}|\n"
        retstr += f"|{' ' *width}|\n"
        duration_str = str(self.get_duration())
        retstr += f"| {duration_str}{' '*(width-len(duration_str)-1)}|\n"
        cal_str = f"{self.get_calories():.0f}"
        retstr += f"| {cal_str} Calories {' '*(width-len(cal_str)-11)}|\n"
        retstr += f"|{' ' *width}|\n"
        retstr += f"|{'_'*width}|\n"
        return retstr
```

## الشريحة 25: Demo — الأصناف الأبناء تعيد استخدام شيفرة الصنف الأب

```python
w=Workout(…)
rw=RunWorkout(…)
sw=SwimWorkout(…)
print(w)
print(rw)
print(sw)
```

## الشريحة 26: أين يمكنني استخدام نسخة من صنف؟

- يمكننا استخدام نسخة من `RunWorkout` في أي مكان يمكن فيه استخدام `Workout`
- العكس غير صحيح (لا يمكنك استخدام `Workout` في أي مكان يُستخدم فيه `RunWorkout`)
- فكّر في دالتين مساعدتين:

```python
def total_calories(workouts):
    cals = 0
    for w in workouts:
        cals += w.get_cals()
    return cals
```

```python
def total_elevation(run_workouts):
    elev = 0
    for w in run_workouts:
        elev += w.get_elev()
    return elev
```

## الشريحة 27: Demo — أين يمكنني استخدام نسخة من صنف؟

```python
def total_calories(workouts):
    cals = 0
    for w in workouts:
        cals += w.get_cals()
    return cals

def total_elevation(run_workouts):
    elev = 0
    for w in run_workouts:
        elev += w.get_elev()
    return elev

w1 = Workout('9/30/2021 1:35 PM','9/30/2021 2:05 PM')
w2 = Workout('9/30/2021 4:35 PM','9/30/2021 5:05 PM')
rw1 = RunWorkout('9/30/2021 1:35 PM','9/30/2021 3:35 PM', 100)
rw2 = RunWorkout('9/30/2021 1:35 PM','9/30/2021 3:35 PM', 200)

total_calories([w1,w2,rw1,rw2])      # (1)  # cal = 100+100+400+400

total_elevation([rw1,rw2])          # (2)  # elev = 100+200

total_elevation([w1,rw1])           # (3)  # err! w1 has no elev method
```

## الشريحة 28: جرّب بنفسك!

- لكل سطر ينشئ كائنًا أدناه، أخبرني:
  - ما قيمة السعرات الحرارية عبر `get_calories()`؟
  - ما قيمة الارتفاع عبر `get_elev()`؟

```python
w1 = Workout('9/30/2021 2:20 PM','9/30/2021 2:50 PM')
w2 = Workout('9/30/2021 2:20 PM','9/30/2021 2:50 PM',450)
rw1 = RunWorkout('9/30/2021 2:20 PM','9/30/2021 2:50 PM',250)
rw2 = RunWorkout('9/30/2021 2:20 PM','9/30/2021 2:50 PM',250,300)
rw3 = RunWorkout('9/30/2021 2:20 PM','9/30/2021 2:50 PM',calories=300)
```

> **ملاحظة المترجم:** سطرا `rw2` و`rw3` في نص الشريحة المستخرَج مختصران عند نهاية السطر في الملف الأصلي؛ نُقلا كما هما.

## الشريحة 29: Demo — تجاوز دوال الصنف الأعلى (Overriding Superclasses)

- تجاوز الصنف الأعلى — إضافة حساب للسعرات الحرارية اعتمادًا على المسافة

```python
class RunWorkout(Workout):
    cals_per_km = 100
    …

    def get_calories(self):
        if (self.route_gps_points != None):
            dist = 0
            lastP = self.routeGpsPoints[0]
            for p in self.routeGpsPoints[1:]:
                dist += gpsDistance(lastP,p)
                lastP = p
            return dist * RunWorkout.cals_per_km
        else:
            return super().get_calories()
```

> **ملاحظة المترجم:** اسم السمة في شرط `if` هو `self.route_gps_points` بينما يُستعمل في 나머ى الدالة `self.routeGpsPoints`؛ هذا التعارض موجود في الأصل المطبوع وقد نُقل كما هو.

## الشريحة 30: الدوال المُتجاوَزة في الذاكرة

| صنف `Workout` (Class State) | صنف `RunWorkout` (Class State) | النسخة (Instance State) |
| --- | --- | --- |
| `__init__()` | `RunWorkout` — الصنف | `start` |
| `get_start()` | `__init__()` | `end` |
| `get_end()` | `super()` | `calories` |
| `set_calories()` | `get_elev()` | `icon` |
| `set_start()` | `set_elev()` | `kind` |
| `set_end()` | `get_calories()` | `elev` |
| `cal_per_hr` | `cals_per_km` | |
| `get_calories()` | | |

- تُوصول إلى سمات النسخة عبر الكلمة المفتاحية `self`

> **ملاحظة المترجم:** في هذه الشريحة يظهر `get_calories()` مرتين: مرة في صنف `Workout` (الأصل) ومرة في صنف `RunWorkout` (الدالة المُتجاوَزة، وبداخلها `super()`). هذا هو جوهر الشريحة.

## الشريحة 31: أي دالة ستُنادى؟

- **التجاوز (Overriding):** دوال في الصنف الابن لها نفس اسم دوال في الصنف الأعلى
- لنسخة من صنف ما، ابحث عن اسم الدالة في تعريف الصنف الحالي
- إذا لم يُعثر عليه، ابحث عن اسم الدالة صعودًا في التسلسل الهرمي (في الصنف الأب، ثم الجد، وهكذا)
- استخدم أول دالة تصعد في التسلسل الهرمي وتجدها بهذا الاسم

المخطط مع `get_calories()` في كل مستوى:

- `Workout` ← فيه `get_calories()`
- `Outdoor Workout` ← `get_calories()`؟
- `Indoor Workout` ← `get_calories()`؟
- `Swimming`
- `Running` ← `get_calories()`؟
- `Weights`
- `Treadmill`

## الشريحة 32: Demo — اختبار التساوي مع الأصناف الأبناء

- مع الأصناف الأبناء، غالبًا ما نريد ضمان تساوي الصنف الأساسي، إضافةً إلى الخصائص الجديدة في الصنف الابن

```python
class Workout(object):
    ……
    def __eq__(self, other):
        return type(self) == type(other) and \
        self.startDate == other.startDate and \
        self.endDate == other.endDate and \
        self.kind == other.kind and \
        self.get_calories() == other.get_calories()
```

```python
class RunWorkout(Workout):
    ……
    def __eq__(self,other):
        return super().__eq__(other) and self.elev == other.elev
```

## الشريحة 33: تصميم كائني التوجه: فنّ أكثر منه علم

- البرمجة الكائنية التوجه أداة قويّة لتجزئة شيفرتك وتجميع الحالة مع الدوال
- **لكن**
- من الممكن أن تفرط في ذلك
- المبرمجون الجدد في البرمجة الكائنية التوجه كثيرًا ما ينشئون تسلسلات أصناف متقاربة
- ليس بالضرورة فكرة جيدة
- فكّر في مستخدمي شيفرتك: هل سيبدو تفكيكك منطقيًا لهم؟
- لأن الدالة التي ستُنادى ضمنية داخل التسلسل الهرمي للأصناف، قد يصعب أحيانًا استدلال تدفّق التحكّم
- الإنترنت مليء بالآراء حول البرمجة الكائنية التوجه و«تصميم الشيفرة الجيد» — عليك أن تبني ذوقك الخاص من خلال الخبرة!

## الشريحة 34: MIT OpenCourseWare

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- ولمعلومات كيفية الاستشهاد بهذه المواد أو شروط استخدامها، راجع: <https://ocw.mit.edu/terms>