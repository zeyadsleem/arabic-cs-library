---
title: "ميزات Python إضافية"
lang: ar
source: "https://programming-26.mooc.fi/part-7/6-more-features"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستتعرف على بعض ميزات Python الإضافية

</text-box>

لإنهاء هذه الدورة، ستجد هنا العديد من ميزات Python المفيدة.

## جمل شرطية في سطر واحد

العبارتان التاليتان تنتجان نفس النتيجة تمامًا:

```python
if x%2 == 0:
    print("even")
else:
    print("odd")
```

```python
print("even" if x%2 == 0 else "odd")
```

في المثال الأخير، لدينا تعبير شرطي (conditional expression) في سطر واحد: `a if [condition] else b`. قيمة هذا التعبير تُقيّم إلى `a` إذا كان الشرط صحيحًا، و `b` إذا كان خاطئًا. تُعرف هذه البنية أحيانًا باسم _العامل الثلاثي (ternary operator)_.

يمكن أن تكون التعبيرات الشرطية مفيدة جدًا عندما تحتاج إلى إسناد شيء ما _بشكل مشروط_. على سبيل المثال، إذا كان لديك المتغيران `x` و `y`، وأردت إما زيادة قيمة `y` أو تعيينها بناءً على زوجية `x`، يمكنك كتابتها في عبارة `if else` عادية، كالتالي:

```python
if x%2 == 0:
    y += 1
else:
    y = 0
```

يمكن تحقيق نفس الشيء بسطر واحد أنيق:

```python
y = y + 1 if x%2 == 0 else 0
```

## كتلة "فارغة"

قد تتذكر من الجزء السابق أنه لا يُسمح بوجود كتلة فارغة في برنامج Python. إذا كنت بحاجة إلى كتلة كود لا تفعل شيئًا، على سبيل المثال عند اختبار وظيفة أخرى، سيسمح لك الأمر `pass` بفعل ذلك. يمكنك، على سبيل المثال، كتابة دالة لا تفعل شيئًا:

```python
def testing():
    pass
```

هذه الدالة ستعيد التحكم فورًا. ترك أمر `pass`، أي وجود كتلة فارغة تمامًا، سيؤدي إلى خطأ.

```python
def testing():  # هذا يسبب خطأ!
```

## حلقات مع كتل else

في Python، يمكن للحلقات أيضًا أن تحتوي على كتل `else`. يتم تنفيذ هذا القسم من الكود إذا انتهت الحلقة بشكل طبيعي (أي لم يتم إيقافها بواسطة عبارة `break`).

على سبيل المثال، في المثال التالي، نبحث عن رقم في قائمة:

```python
numbers = [1, 3, 5, 7, 9]
target = 5

for number in numbers:
    if number == target:
        print("Found")
        break
else:
    print("Not found")
```

إذا تم العثور على الرقم، سيتم طباعة "Found" وسيتم تنفيذ `break`، مما يؤدي إلى تخطي كتلة `else`. إذا لم يتم العثور على الرقم، فستنتهي الحلقة بشكل طبيعي، وسيتم تنفيذ كتلة `else`، وسيتم طباعة "Not found".

ينطبق نفس المبدأ على حلقات `while`:

```python
i = 0
while i < 5:
    print(i)
    i += 1
else:
    print("Loop finished normally")
```

سيطبع هذا:

```
0
1
2
3
4
Loop finished normally
```

ولكن إذا قمنا بإيقاف الحلقة باستخدام `break`:

```python
i = 0
while i < 5:
    if i == 3:
        break
    print(i)
    i += 1
else:
    print("Loop finished normally")
```
فسيتم طباعة:

```
0
1
2
```

ولن يتم تنفيذ كتلة `else` لأن الحلقة لم تنتهِ بشكل طبيعي.

## حلقة for مع enumerate

عندما تحتاج إلى كل من الفهرس (index) والقيمة عند التكرار على تسلسل، يمكنك استخدام الدالة المضمنة `enumerate`:

```python
names = ["Alice", "Bob", "Charlie"]

for index, name in enumerate(names):
    print(f"Index {index}: {name}")
```

الناتج:

```
Index 0: Alice
Index 1: Bob
Index 2: Charlie
```

بشكل افتراضي، يبدأ `enumerate` العد من 0، ولكن يمكنك تحديد قيمة بداية مختلفة باستخدام المعامل `start`:

```python
for index, name in enumerate(names, start=1):
    print(f"{index}. {name}")
```

الناتج:

```
1. Alice
2. Bob
3. Charlie
```

## فك التعبئة (Unpacking) مع *

يمكنك استخدام عامل `*` لفك تعبئة القيم المتبقية في تسلسل:

```python
first, *middle, last = [1, 2, 3, 4, 5]
print(first)   # 1
print(middle)  # [2, 3, 4]
print(last)    # 5
```

هذا مفيد بشكل خاص عند العمل مع دوال تقبل عددًا متغيرًا من المعاملات، أو عند الرغبة في فصل أجزاء من تسلسل.

## دمج القواميس (Dictionaries)

ابتداءً من Python 3.9، يمكنك دمج القواميس باستخدام عامل `|`:

```python
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}

merged = dict1 | dict2
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

يمكنك أيضًا تحديث قاموس في مكانه باستخدام `|=`:

```python
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}

dict1 |= dict2
print(dict1)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

في الإصدارات الأقدم من Python، يمكنك تحقيق نفس الشيء باستخدام طريقة `update` أو فك التعبئة:

```python
# Python 3.5+
merged = {**dict1, **dict2}
```

## f-strings مع محددات التنسيق

تسمح f-strings بتضمين محددات تنسيق (format specifiers) بعد النقطتين:

```python
import math

print(f"Pi is approximately {math.pi:.2f}")
print(f"Pi is approximately {math.pi:.4f}")
```

الناتج:

```
Pi is approximately 3.14
Pi is approximately 3.1416
```

يحدد `.2f` عددًا عشريًا بنقطتين عشريتين، و `.4f` بأربع نقاط عشريتين.

## تعبيرات المولدات (Generator expressions)

تشبه تعبيرات المولدات قوائم الفهم (list comprehensions)، لكنها تستخدم أقواسًا بدلاً من أقواس مربعة، وتنتج مولدًا (generator) بدلاً من قائمة. هذا يعني أنها تنتج القيم واحدة تلو الأخرى عند الطلب، بدلاً من إنشاء القائمة بأكملها في الذاكرة مرة واحدة.

```python
# قائمة فهم - تنشئ القائمة كاملة في الذاكرة
squares_list = [x**2 for x in range(1000000)]

# تعبير مولد - ينتج القيم عند الطلب
squares_gen = (x**2 for x in range(1000000))
```

المولدات أكثر كفاءة في استخدام الذاكرة عند التعامل مع تسلسلات كبيرة، حيث لا تحتاج إلى تخزين جميع القيم في الذاكرة في وقت واحد.

> **ملاحظة:** يمكنك التكرار على المولد مرة واحدة فقط. بمجرد استنفاد المولد، لا يمكن إعادة استخدامه.

## وحدة `pathlib` للمسارات

توفر وحدة `pathlib` (المتوفرة منذ Python 3.4) طريقة كائنية التوجه (object-oriented) للعمل مع مسارات نظام الملفات، وهي بديل حديث وأكثر سهولة من وحدة `os.path`:

```python
from pathlib import Path

# إنشاء كائن مسار
path = Path("folder/subfolder/file.txt")

# التحقق من وجود المسار
print(path.exists())

# الحصول على اسم الملف
print(path.name)        # file.txt
print(path.stem)        # file (بدون امتداد)
print(path.suffix)      # .txt

# الحصول على الدليل الأب
print(path.parent)      # folder/subfolder

# قراءة وكتابة الملفات
path.write_text("Hello, world!")
content = path.read_text()
```

تجعل `pathlib` عمليات المسار الشائعة أكثر وضوحًا وأقل عرضة للأخطاء مقارنة بالتلاعب بالسلاسل النصية.

## إدارة السياق (Context managers) مع `contextlib`

يمكنك إنشاء مديري سياق مخصصين باستخدام دالة `contextmanager` من وحدة `contextlib`:

```python
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"Elapsed: {end - start:.2f} seconds")

with timer():
    # بعض العمليات التي تستغرق وقتًا
    sum(range(1000000))
```

هذا يسمح بكتابة كود إعداد وتنظيف (setup/teardown) قابل لإعادة الاستخدام بطريقة نظيفة.

## وحدة `dataclasses`

توفر وحدة `dataclasses` (منذ Python 3.7) مُزخرفًا (decorator) يولد تلقائيًا طرقًا خاصة مثل `__init__`، `__repr__`، و `__eq__` للفئات التي تخزن البيانات بشكل أساسي:

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    city: str = "Unknown"  # قيمة افتراضية

person = Person("Alice", 30, "New York")
print(person)        # Person(name='Alice', age=30, city='New York')
print(person.name)   # Alice
```

هذا يقلل بشكل كبير من الكود النمطي (boilerplate) اللازم لفئات البيانات البسيطة.

## التلميحات النوعية المتقدمة

يدعم Python تلميحات أنواع متقدمة مثل `Union`، `Optional`، `List`، `Dict`، `Tuple`، و `Callable` من وحدة `typing`:

```python
from typing import Union, Optional, List, Dict, Tuple, Callable

def process_items(items: List[str]) -> Dict[str, int]:
    return {item: len(item) for item in items}

def greet(name: Optional[str] = None) -> str:
    if name is None:
        return "Hello, stranger!"
    return f"Hello, {name}!"

# Union - يمكن أن يكون إما int أو str
def stringify(value: Union[int, str]) -> str:
    return str(value)
```

ابتداءً من Python 3.10، يمكنك استخدام بناء الجملة `X | Y` بدلاً من `Union[X, Y]`:

```python
def stringify(value: int | str) -> str:
    return str(value)
```

> **ملاحظة:** التلميحات النوعية في Python اختيارية ولا يتم فرضها وقت التشغيل (runtime). إنها أدوات للمطورين ومحللي الكود الثابت (static analyzers) للمساعدة في اكتشاف الأخطاء مبكرًا.
