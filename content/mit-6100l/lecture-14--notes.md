---
book: mit-6100l
chapter: lecture-14
slug: notes
lang: ar
title: "المحاضرة 14: القواميس (Dictionaries)"
---

# المحاضرة 14: القواميس (Dictionaries)

## المصادر والنسبة والترخيص

هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:

> Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.

- صفحة المحاضرة الرسمية على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-14-dictionaries/>
- الشرائح (ملف PDF): <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec14_pdf/> — والملف المباشر: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec14.pdf>
- ملفات الشيفرة للتمرين: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec14_code_py/>
- النص الكامل (Transcript) للمحاضرة على OCW: <https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec14/>
- رخصة CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>
- شروط الاستخدام في MIT OCW: <https://ocw.mit.edu/terms/>

**منهج الترجمة:** عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (40 شريحة). المواضع التي يعرض فيها النص المستخرَج عمودين متجاورين (القائمة والقاموس) نُقلت إلى جداول. شرائح مخططات الذاكرة (memory block) نُقلت إلى جداول، وعمودا «المفتاح» و«القيمة» في جدول المقارنة أُعيد إقرانهما وفق ترتيب الشرائح. الأشكال لم تُضمَّن.

## الشريحة 1: عنوان المحاضرة

- DICTIONARIES
- (download slides and .py files to follow along)
- 6.100L Lecture 14 — Ana Bell

## الشريحة 2: كيف نخزّن معلومات الطلبة؟ (HOW TO STORE STUDENT INFO)

- لنفترض أننا نريد تخزين معلومات درجات مجموعة من الطلبة واستخدامها.
- يمكننا التخزين باستخدام **قوائم منفصلة لكل نوع من المعلومات**:

```python
names = ['Ana', 'John', 'Matt', 'Katy']
grades = ['A+' , 'B' , 'A' , 'A' ]
microquizzes = ...
psets = ...
```

- تُخزَّن المعلومات موزّعة على قوائم عند **الؤشر (index) نفسه**، وكل مؤشر يشير إلى معلومات شخص مختلف.
- الوصول إلى المعلومات غير مباشر: تجد الموضع في القوائم المقابل للشخص، ثم تستخرج.

## الشريحة 3: كيف نصل إلى معلومات الطلبة؟ (HOW TO ACCESS STUDENT INFO)

```python
def get_grade(student, name_list, grade_list):
    i = name_list.index(student)
    grade = grade_list[i]
    return (student, grade)
```

- تصبح الشيفرة فوضوية إذا كان لدينا الكثير من المعلومات المختلفة التي يجب تتبّعها، مثل: قائمة منفصلة لدرجات الاختبارات المصغّرة (microquiz)، وقائمة لدرجات الواجبات (pset)، وهكذا.
- يجب صيانة قوائم كثيرة وتمريرها كوسائط.
- يجب دائمًا الفهرسة باستخدام أعداد صحيحة.
- يجب تذكّر تغيير عدّة قوائم عند إضافة معلومات أو تحديثها.

## الشريحة 4: كيف نخزّن معلومات الطلبة ونصل إليها؟ (HOW TO STORE AND ACCESS STUDENT INFO)

- البديل هو استخدام **قائمة من القوائم**:

```python
eric = ['eric', ['ps', [8, 4, 5]], ['mq', [6, 7]]]
ana = ['ana', ['ps', [10, 10, 10]], ['mq', [9, 10]]]
john = ['john', ['ps', [7, 6, 5]], ['mq', [8, 5]]]
grades = [eric, ana, john]
```

- عندئذ يمكننا الوصول بالبحث في القوائم، لكن الشيفرة تبقى فوضوية:

```python
def get_grades(who, what, data):
    for stud in data:
        if stud[0] == who:
            for info in stud[1:]:
                if info[0] == what:
                    return who, info

print(get_grades('eric', 'mq', grades))
print(get_grades('ana', 'ps', grades))
```

## الشريحة 5: طريقة أفضل وأنظف — قاموس (A BETTER AND CLEANER WAY – A DICTIONARY)

- من الجيد أن نستخدم **بنية بيانات واحدة**، بلا قوائم منفصلة.
- من الجيد أن نفهرس العنصر الذي يهمّنا مباشرةً.
- قاموس (dictionary) في Python يحتوي على مُدخَلات (entries) تربط **مفتاحًا بقيمة (key:value)**.

مقارنة تخطيطية بين قائمة وقاموس:

| القائمة | القاموس |
|---|---|
| `0` → Elem 1 | Key 1 → Val 1 |
| `1` → Elem 2 | Key 2 → Val 2 |
| `2` → Elem 3 | Key 3 → Val 3 |
| `3` → Elem 4 | Key 4 → Val 4 |
| … | … |

## الشريحة 6: الفكرة الكبرى (BIG IDEA)

- قيمة القاموس (Dict value) تشير إلى القيمة المرتبطة بمفتاح (key).
- قد تختلط هذه المصطلحات أحيانًا مع القيمة العادية (regular value) لمتغيّر ما.

## الشريحة 7: قاموس في Python (A PYTHON DICTIONARY)

- نخزّن أزواج البيانات في مُدخَل واحد:
  - **مفتاح (key)**: أي كائن غير قابل للتغيير (any immutable object):
    - `str` و `int` و `float` و `bool` و `tuple` وغيرها.
  - **قيمة (value)**: أي كائن بيانات:
    - كل ما سبق، إضافةً إلى القوائم والقواميس الأخرى.

مثال:

```python
my_dict = {}
d = {4:16}

grades = {'Ana':'B', 'Matt':'A', 'John':'B', 'Katy':'A'}
```

والتخطيط:

| المفتاح | القيمة |
|---|---|
| `'Ana'` | `'B'` |
| `'Matt'` | `'A'` |
| `'John'` | `'B'` |
| `'Katy'` | `'A'` |

## الشريحة 8: البحث في القاموس (DICTIONARY LOOKUP)

- شبيهة بالفهرسة في قائمة:

```python
grades = {'Ana':'B', 'Matt':'A', 'John':'B', 'Katy':'A'}
grades['John']   # → يُقوَّم إلى 'B'
grades['Grace']  # → يعطي KeyError
```

- يبحث عن **المفتاح (key)**.
- يُعيد **القيمة (value)** المرتبطة بهذا المفتاح.
- إذا لم يُعثر على المفتاح، تحصل على خطأ.
- لا يوجد تعبير بسيط يُعيد المفتاح انطلاقًا من قيمة ما!

## الشريحة 9: جربها بنفسك! (YOU TRY IT!)

- اكتب دالة وفق هذه المواصفة:

```python
def find_grades(grades, students):
    """ grades is a dict mapping student names (str) to grades (str)
    students is a list of student names
    Returns a list containing the grades for students (in same order) """
    # for example
    d = {'Ana':'B', 'Matt':'C', 'John':'B', 'Katy':'A'}
    print(find_grades(d, ['Matt', 'Katy']))  # returns ['C', 'A']
```

## الشريحة 10: الفكرة الكبرى (BIG IDEA)

- الحصول على قيمة من القاموس مسألة **فهرسة بمفتاح (indexing with a key)** فقط.
- **لا حاجة** إلى حلقة (loop).

## الشريحة 11: عمليات القاموس (DICTIONARY OPERATIONS) — الإضافة والتغيير والحذف

```python
grades = {'Ana':'B', 'Matt':'A', 'John':'B', 'Katy':'A'}
```

- **إضافة مُدخَل:**

```python
grades['Grace'] = 'A'
```

- **تغيير مُدخَل:**

```python
grades['Grace'] = 'C'
```

- **حذف مُدخَل:**

```python
del(grades['Ana'])
```

## الشريحة 12: عمليات القاموس — الاختبار عن وجود مفتاح

```python
grades = {'Ana':'B', 'Matt':'A', 'John':'B', 'Katy':'A'}
```

- **اختبار هل المفتاح موجود في القاموس:**

```python
'John' in grades    # → يُعيد True
'Daniel' in grades  # → يُعيد False
'B' in grades       # → يُعيد False
```

لاحظ أن `'B'` هي **قيمة** لا مفتاح، لذا النتيجة `False`.

## الشريحة 13: جربها بنفسك! (YOU TRY IT!)

- اكتب دالة وفق هذه المواصفات:

```python
def find_in_L(Ld, k):
    """ Ld is a list of dicts
    k is an int
    Returns True if k is a key in any dicts of Ld and False otherwise """
    # for example
    d1 = {1:2, 3:4, 5:6}
    d2 = {2:4, 4:6}
    d3 = {1:1, 3:9, 4:16, 5:25}
    print(find_in_L([d1, d2, d3], 2)   # returns True
    print(find_in_L([d1, d2, d3], 25)  # returns False
```

## الشريحة 14: عمليات القاموس — المرور على القاموس

- يمكن المرور على القواميس، لكن **افترض أنه لا يوجد ترتيب مضمون (no guaranteed order)**.

```python
grades = {'Ana':'B', 'Matt':'A', 'John':'B', 'Katy':'A'}
```

- **الحصول على كائن قابل للتكرار (iterable) يشبه مجموعة كل المفاتيح:**

```python
grades.keys()
# → يُعيد dict_keys(['Ana', 'Matt', 'John', 'Katy'])

list(grades.keys())  # → يُعيد ['Ana', 'Matt', 'John', 'Katy']
```

- **الحصول على كائن قابل للتكرار يشبه مجموعة كل قيم القاموس:**

```python
grades.values()
# → يُعيد dict_values(['B', 'A', 'B', 'A'])

list(grades.values())  # → يُعيد ['B', 'A', 'B', 'A']
```

## الشريحة 15: عمليات القاموس — المرور على المُدخَلات (المفاتيح والقيم معًا)

هذه **أنفع طريقة** للمرور على مُدخَلات القاموس (كل من المفاتيح والقيم).

- يمكن المرور على القواميس، لكن افترض أنه لا يوجد ترتيب مضمون.

```python
grades = {'Ana':'B', 'Matt':'A', 'John':'B', 'Katy':'A'}
```

- **الحصول على كائن قابل للتكرار يشبه مجموعة كل المُدخَلات:**

```python
grades.items()
# → يُعيد dict_items([('Ana', 'B'), ('Matt', 'A'), ('John', 'B'), ('Katy', 'A')])

list(grades.items())
# → يُعيد [('Ana', 'B'), ('Matt', 'A'), ('John', 'B'), ('Katy', 'A')]
```

- الاستخدام المعتاد هو المرور على زوج (مفتاح، قيمة):

```python
for k,v in grades.items():
    print(f"key {k} has value {v}")
```

## الشريحة 16: جربها بنفسك! (YOU TRY IT!)

- اكتب دالة تحقّ هذه المواصفة:

```python
def count_matches(d):
    """ d is a dict
    Returns how many entries in d have the key equal to its value """
    # for example
    d = {1:2, 3:4, 5:6}
    print(count_matches(d))

    # prints 0

    d = {1:2, 'a':'a', 5:5}
    print(count_matches(d))

    # prints 2
```

## الشريحة 17: مفاتيح القاموس وقيمه (DICTIONARY KEYS & VALUES)

- القواميس كائنات **قابلة للتغيير (mutable)**، لذا تنطبق قواعد **الأسماء المستعارة (aliasing)** و**الاستنساخ (cloning)**.
- استخدم علامة `=` لإنشاء اسم مستعار (alias).
- استخدم `d.copy()` لإنشاء نسخة.
- افترض أنه لا يوجد ترتيب للمفاتيح أو القيم!

**قيم القاموس (Dict values)**:
- أي نوع (غير قابل للتغيير وقابل للتغيير معًا).
- يمكن أن تكون قيم القاموس قوائم، بل وحتى قواميس أخرى!
- يمكن أن تتكرّر (Can be duplicates).

**المفاتيح (Keys)**:
- يجب أن تكون **فريدة (unique)**.
- من نوع غير قابل للتغيير (int، float، string، tuple، bool).
- في الحقيقة نحتاج كائنًا يكون **قابلًا للتجزئة (hashable)**، لكن فكّر فيها على أنها غير قابلة للتغيير لأن كل الأنواع غير القابلة للتغيير قابلة للتجزئة.
- كن حذرًا عند استخدام نوع `float` كمفتاح.

## الشريحة 18: لماذا المفاتيح غير القابلة للتغيير/القابلة للتجزئة؟ (WHY IMMUTABLE/HASHABLE KEYS?)

- يُخزَّن القاموس في الذاكرة بطريقة خاصة (الشرائح التالية تعرض مثالًا).
- **الخطوة 1:** تُشغَّل دالة (دالة التجزئة — hash function) على مفتاح القاموس:
  - الدالة تُسقِط أي كائن إلى عدد صحيح (int).
  - مثال: تُسقِط `"a"` إلى `1`، و`"b"` إلى `2`، وهكذا، فيمكن لـ `"ab"` أن تُسقِط إلى `3`.
  - العدد الصحيح يقابل موضعًا (position) في كتلة من عناوين الذاكرة.
- **الخطوة 2:** عند عنوان الذاكرة ذلك، تُخزَّن قيمة القاموس.
- لإجراء بحث بمفتاح، تُشغَّل الدالة نفسها:
  - إذا كان الكائن غير قابل للتغيير/قابل للتجزئة، تحصل على العدد الصحيح نفسه.
  - إذا تغيّر الكائن، فإن الدالة تُعيد عددًا صحيحًا مختلفًا!

## الشريحة 19: دالة التجزئة (Hash function)

قواعد دالة التجزئة في هذا المثال:
1. نجمع (نُجموع) قيم الحروف.
2. نأخذ الباقي عند القسمة على 16 (`mod 16`) (حتى يناسب كتلة ذاكرة من 16 مُدخَلًا).

**الحساب الأول** (اسمه غير ظاهر في النص المستخرَج من الملف، ولا نخمّنه):

```text
1 + 14 + 1 = 16
16%16 = 0
```

**Ana:**

```text
5 + 18 + 9 + 3 = 35
35%16 = 3
```

**Eric:**

```text
10 + 15 + 8 + 14 = 47
47%16 = 15
```

**John:**

```text
11 + 1 + 20 + 5 = 37
37%16 = 5
```

**[K, a, t, e]:**

```text
11 + 1 + 20 + 5 = 37
37%16 = 5
```

ونتيجة ذلك في **كتلة الذاكرة (memory block)** — مثل القائمة، وتحتوي على 16 خانة (0 إلى 15):

| الخانة | ما فيها |
|---|---|
| 0 | القيمة الناتجة عن الحساب الأول |
| 3 | `Ana: C` |
| 5 | `John: B` |
| 5 | `[K,a,t,e]: B` |
| 15 | `Eric: A` |

**ملاحظة المترجم:** يلاحظ أن `John` و`[K, a, t, e]` يُسقطان إلى الموضع نفسه (5)، فتخزّنان في الخانة نفسها. هذا هو **التصادم (collision)** الذي تنبّه إليه الشريحة التالية.

## الشريحة 20: دالة التجزئة — تغيير الاسم

القواعد نفسها: اجمع قيم الحروف، ثم خذ الباقي عند القسمة على 16.

- **Kate تغيّر اسمها إلى Cate.** الشخص نفسه، والاسم مختلف. كيف نجد درجتها؟

```text
3 + 1 + 20 + 5 = 29
29%16 = 13
```

أي أن `[C, a, t, e]` تُسقط إلى الموضع 13.

وفي **كتلة الذاكرة** (memory block) إلى جانب الحسابات السابقة:

| الخانة | ما فيها |
|---|---|
| 0 | — |
| 3 | `Ana: C` |
| 5 | `[K,a,t,e]: B` |
| 13 | **غير موجودة** — الموضع الذي كانت ستوضع فيه `Cate` |
| 15 | `Eric: A` |

النص الأصلي يشير إلى الموضع 13 بسهم وعلامة استفهام: «ليس هنا!» (Not here!). أي أن البحث بالاسم الجديد لن يجد الدرجة، لأن البحث يجري على **المفتاح القديم** `[K, a, t, e]` لا على الاسم الجديد.

**ملاحظة المترجم:** جدول الذاكرة أعلاه بيّن المواضع التي تخصّ الأمثلة؛ أما بقية الخانات (1، 2، 4، …) فهي فارغة في الشريحة.

## الشريحة 21: قاموس Python لدرجات الطلبة (A PYTHON DICTIONARY for STUDENT GRADES)

- كل طالب منفصل هو مُدخَل منفصل في القاموس.
- تُفصل المُدخَالات بفاصلة.

```python
grades = {'Ana':{'mq':[5,4,4], 'ps': [10,9,9], 'fin': 'B'},
'Bob':{'mq':[6,7,8], 'ps': [8,9,10], 'fin': 'A'}}
```

## الشريحة 22: قاموس Python لدرجات الطلبة — كل مُدخَل يربط مفتاحًا بقيمة

- كل مُدخَل في القاموس يربط مفتاحًا بقيمة.
- يتم الربط بواسطة المحرف `:`.
- إذن `grades` تربط `str` بـ `dict`.

| `'Ana'` — المفتاح 1 | `'Bob'` — المفتاح 2 |
|---|---|
| `'mq'` | `'mq'` |
| `'ps'` | `'ps'` |
| `'fin'` | `'fin'` |
| `[5,4,4]` — القيمة 1 | `[6,7,8]` — القيمة 2 |
| `[10,9,9]` | `[8,9,10]` |
| `'B'` | `'A'` |

## الشريحة 23: قاموس Python لدرجات الطلبة — قيم `grades` هي قواميس

- قيم `grades` هي قواميس (dicts).
- كل قيمة تربط… (الباقي في الشريحة على الرسم التخطيطي).

| | `'Ana'` — المفتاح 1 | `'Bob'` — المفتاح 1 |
|---|---|---|
| `'mq'` | `str:list` → `[5,4,4]` | `str:list` → `[6,7,8]` |
| `'ps'` | `str:list` → `[10,9,9]` | `str:list` → `[8,9,10]` |
| `'fin'` | `str:str` → `'B'` | `str:str` → `'A'` |

## الشريحة 24: قاموس Python لدرجات الطلبة — الوصول عبر مستويات متعدّدة

- قيم `grades` هي قواميس (dicts).
- كل قيمة تربط مفتاحًا (`'mq'`) بقائمة، ومفتاحًا (`'fin'`) بسلسلة.

```python
grades = {'Ana':{'mq':[5,4,4], 'ps': [10,9,9], 'fin': 'B'},
'Bob':{'mq':[6,7,8], 'ps': [8,9,10], 'fin': 'A'}}

grades['Ana']['mq'][0]  # يُعيد 5
```

## الشريحة 25: جربها بنفسك! (YOU TRY IT!)

```python
my_d ={'Ana':{'mq':[10], 'ps':[10,10]},
'Bob':{'ps':[7,8], 'mq':[8]},
'Eric':{'mq':[3], 'ps':[0]}
}
def get_average(data, what):
    all_data = []
    for stud in data.keys():
        INSERT LINE HERE
    return sum(all_data)/len(all_data)
```

السؤال: «بمعطى القاموس `my_d`، والهيكل الناقص لدالة تحسب متوسّطًا، أي سطر يجب أن يُدرج في الموضع المُحدَّد بحيث تكون `get_average(my_d, 'mq')` تحسب المتوسّط لكل مُدخَلات `'mq'`؟ أي: ابحث عن متوسّط كل درجات `mq` لكل الطلبة.»

- A) `all_data = all_data + data[stud][what]`
- B) `all_data.append(data[stud][what])`
- C) `all_data = all_data + data[stud[what]]`
- D) `all_data.append(data[stud[what]])`

## الشريحة 26: قائمة مقابل قاموس (list vs dict)

| القائمة | القاموس |
|---|---|
| تتلسل مرتَّب من العناصر | يطابق «المفاتيح» بـ«القيم» |
| تبحث عن العناصر بفهرس عدد صحيح | يبحث عن مُدخَل واحد بواسطة مُدخَل آخر |
| الفهارس لها ترتيب | لا ترتيب مضمون |
| الفهرس عدد صحيح | المفتاح قد يكون أي نوع غير قابل للتغيير |
| القيمة قد تكون أي نوع | القيمة قد تكون أي نوع |

## الشريحة 27: مثال: إيجاد الكلمات الأكثر تكرارًا في كلمات أغنية (EXAMPLE: FIND MOST COMMON WORDS IN A SONG’S LYRICS)

1. أنشئ **قاموس تكرارات (frequency dictionary)** يربط `str` بـ `int`.
2. ابحث عن الكلمة الأكثر تكرارًا وعدد مراتها:
   - استخدم **قائمة**، تحسّبًا لأن أكثر من كلمة قد تتساوى في التكرار.
   - أرجع مجموعة (tuple) من نوع `(list, int)` لـ `(words_list, highest_freq)`.
3. ابحث عن الكلمات التي تتكرّر **مرّة X على الأقل**:
   - دع المستخدم يختار «مرّة X على الأقل»، فاسمح بذلك كمعامل (parameter).
   - أرجع قائمة من المجموعات، كل مجموعة منها `(list, int)` تحتوي على قائمة الكلمات مرتّبة حسب تكرارها.
   - **الفكرة (IDEA):** من قاموس الأغنية، ابحث عن الكلمة الأكثر تكرارًا. احذف الكلمة الأكثر شيوعًا. كرّر. تعمل هذه الطريقة لأنك تُعدّل (mutate) قاموس الأغنية.

## الشريحة 28: إنشاء قاموس (CREATING A DICTIONARY)

مع رابط إلى Python Tutor:

```python
song = "RAH RAH AH AH AH ROM MAH RO MAH MAH"

def generate_word_dict(song):
    song_words = song.lower()
    words_list = song_words.split()
    word_dict = {}
    for w in words_list:
        if w in word_dict:
            word_dict[w] += 1
        else:
            word_dict[w] = 1
    return word_dict
```

## الشريحة 29: استخدام القاموس (USING THE DICTIONARY)

مع رابط إلى Python Tutor:

```python
word_dict = {'rah':2, 'ah':3, 'rom':1, 'mah':3, 'ro':1}

def find_frequent_word(word_dict):
    words = []
    highest = max(word_dict.values())
    for k,v in word_dict.items():
        if v == highest:
            words.append(k)
    return (words, highest)
```

## الشريحة 30: إيجاد الكلمات التي تكرارها أكبر من x=1

- كرّر الخطوات التالية طالما كان أعلى تكرار أكبر من `x`.
- **ابحث عن أعلى تكرار.**

```python
word_dict = {'rah':2, 'ah':3, 'rom':1, 'mah':3, 'ro':1}
```

## الشريحة 31: إيجاد الكلمات التي تكرارها أكبر من x=1

- استخدم الدالة `find_frequent_word` للحصول على الكلمات ذات أعلى تكرار.

```python
word_dict = {'rah':2, 'ah':3, 'rom':1, 'mah':3, 'ro':1}
```

## الشريحة 32: إيجاد الكلمات التي تكرارها أكبر من x=1

- **احذف المُدخَلات** المقابلة لهذه الكلمات من القاموس **عن طريق التعديل (by mutation)**:

```python
word_dict = {'rah':2, 'ah':3, 'rom':1, 'mah':3, 'ro':1}
```

بعد الحذف صارت:

```python
word_dict = {'rah':2,
'rom':1,
'ro':1}
```

- **احفظها في النتيجة:**

```python
freq_list = [(['ah','mah'],3)]
```

## الشريحة 33: إيجاد الكلمات التي تكرارها أكبر من x=1

- **ابحث عن أعلى تكرار في القاموس بعد تعديله.**

```python
word_dict = {'rah':2,
'rom':1,
'ro':1}
```

- النتيجة حتى الآن:

```python
freq_list = [(['ah','mah'],3)]
```

## الشريحة 34: إيجاد الكلمات التي تكرارها أكبر من x=1

- **استخدم الدالة `find_frequent_word`** للحصول على الكلمات التي لها ذلك التكرار.

```python
word_dict = {'rah':2,
'rom':1,
'ro':1}
```

- النتيجة حتى الآن:

```python
freq_list = [(['ah','mah'],3)]
```

## الشريحة 35: إيجاد الكلمات التي تكرارها أكبر من x=1

- **احذف المُدخَلات** المقابلة لهذه الكلمات من القاموس **عن طريق التعديل**.

```python
word_dict = {'rah':2,
'rom':1,
'ro':1}
```

تصبح بعد الحذف:

```python
word_dict = {
'rom':1,
'ro':1}
```

- **أضفها إلى النتيجة حتى الآن:**

```python
freq_list = [(['ah','mah'],3), (['rah'],2)]
```

## الشريحة 36: إيجاد الكلمات التي تكرارها أكبر من x=1

- أعلى تكرار صار الآن أصغر من `x=2`، فتوقّف.

```python
word_dict = {
'rom':1,
'ro':1}
```

- **النتيجة النهائية:**

```python
freq_list = [(['ah','mah'],3), (['rah'],2)]
```

**ملاحظة المترجم:** الشرائح من 30 إلى 36 تعرض حالة القاموس قبل وبعد كل خطوة؛ النص المستخرَج من الملف يضع سطور القاموس المتبقّية في نهاية الشريحة بعد رقمها، وقد رُتّبت هنا لتُقرأ في تسلسلها المنطقي.

## الشريحة 37: الاستفادة من خواص القاموس (LEVERAGING DICT PROPERTIES)

مع رابط إلى Python Tutor:

```python
word_dict = {'rah':2, 'ah':3, 'rom':1, 'mah':3, 'ro':1}

def occurs_often(word_dict, x):
    freq_list = []
    word_freq_tuple = find_frequent_word(word_dict)
    while word_freq_tuple[1] > x:
        word_freq_tuple = find_frequent_word(word_dict)
        freq_list.append(word_freq_tuple)
        for word in word_freq_tuple[0]:
            del(word_dict[word])
    return freq_list
```

## الشريحة 38: بعض الملاحظات (SOME OBSERVATIONS)

- تحويل السلسلة (string) إلى قائمة كلمات يتيح استخدام دوال القوائم:
  - استُخدم `words_list = song_words.split()`.
- المرور على القائمة يمرّ بشكل طبيعي من بنية القوائم:
  - استُخدم `for w in words_list:`.
- خزّن القاموس البيانات نفسها بطريقة أنسب:
  - القدرة على الوصول إلى كل قيم القاموس وكل مفاتيحه تتيح دوال مرور (looping methods) طبيعية.
  - استُخدم `for k,v in word_dict.items():`.
- قابلية تغيير القاموس (mutability) تتيح المعالجة التكرارية:
  - استُخدم `del(word_dict[word])`.
- أعدنا استخدام دوال كتبناها من قبل!

## الشريحة 39: الخلاصة (SUMMARY)

- القواميس تحتوي مُدخَلات تربط مفتاحًا بقيمة.
- المفاتيح كائنات **غير قابلة للتغيير/قابلة للتجزئة (immutable/hashable)** و**فريدة (unique)**.
- القيم يمكن أن تكون أي كائن.
- يمكن للقواميس أن تجعل الشيفرة أكثر كفاءة:
  - من ناحية التنفيذ (Implementation-wise).
  - من ناحية زمن التشغيل (Runtime-wise).

## الشريحة 40: MIT OpenCourseWare

شريحة الختام: شعار MIT OpenCourseWare مع الروابط الرسمية:

- <https://ocw.mit.edu>
- 6.100L Introduction to Computer Science and Programming Using Python — Fall 2022
- للاستفسار عن كيفية الاستشهاد بهذه المواد أو عن شروط الاستخدام، زر <https://ocw.mit.edu/terms>