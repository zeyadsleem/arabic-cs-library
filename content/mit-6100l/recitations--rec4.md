---
book: mit-6100l
chapter: recitations
slug: rec4
lang: ar
title: "الجلسة التطبيقية 4: الدوال والنطاق، ودوال Lambda"
---

# الجلسة التطبيقية 4 (Recitation 4)

## المصادر والنسبة والترخيص

المادة الأصلية: **آنا بيل (Ana Bell)**، **MIT OpenCourseWare (MIT OCW)**، معهد ماساتشوستس للتكنولوجيا، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، **خريف 2022 (Fall 2022)**.

- [صفحة الجلسة الرسمية على OCW](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec04_zip/).

هذه ترجمة وتكييف عربي غير رسمي وفق [رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. [شروط الاستخدام والاستشهاد](https://ocw.mit.edu/terms/).

**منهج الترجمة:** لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.

**ملاحظة المترجم:** المصدر ملف Word. فقد استخراج النصّ المسافات البادئة التي تدلّ على القوائم، فحُذفت. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » وشرطة الطرح « – » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.

## المحاضرة المرتبطة

تُرافق هذه الجلسة التطبيقية [المحاضرة 9: دوال لامدا، والصفوف، والقوائم (Lambda Functions, Tuples, and Lists)](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-9-lambda-functions-tuples-and-lists/). ويعرض ملخّصها مراجعةً للدوال والنطاق في المحاضرة 8، ثم مقدّمةً إلى دوال لامدا وإلى الصفوف (Tuples) والقوائم (Lists).

## تذكيرات (Reminders)

- لا محاضرة يوم الاثنين.
- لا مسابقة MQ الأسبوع المقبل.
- التسليم المرحلي في منتصف مجموعة المسائل PS2 مستحقّ الأربعاء المقبل.

## المحاضرة 8: الدوال والنطاق (Functions and Scope)

### الدوال (Functions)

- تلتقط الدوال العمل الحسابي داخل صندوق أسود.
- نستخدمها لإعادة استخدام الشيفرة وكتابة برامج بصياغة أكثر إيجازًا.
- تأخذ مدخلات وتُعيد مخرجات.
- نسمّي المدخلات معاملات (parameters).
- تُخرَج المخرجات بعبارة `return`.

### تعريف دالة (Defining a function)

```python
def count_letter_e(my_word):
    count = 0
    for letter in my_word:
        if letter == "e":
            count += 1
    return count
```

### استدعاء دالة (Calling a function)

```python
print(count_letter_e("hello, this is a test")
```

### `print` مقابل `return`

- `print`: للمستخدم، ويعرض قيمة فحسب.
- `return`: للحاسوب، ويتيح لك إرسال قيم من الدالة إلى أجزاء أخرى من شيفرتك. القيمة المُعادة الافتراضية في بايثون هي `None`، ولا يُنفَّذ شيء بعد عبارة `return`.

### النطاق (Scope)

- تُتابَع إسنادات المتغيّرات في جدول رموز (symbol table) أو إطار مكدّس (stack frame) يربط أسماء المتغيّرات بقيمها.
- عند استدعاء دالة، يُنشأ إطار مكدّس جديد.
- عند إعادة الدالة، يُزال إطار المكدّس أو يُتلف.
- يقدّم Python Tutor تصورًا جيّدًا لذلك: https://pythontutor.com/.

### الدالة معاملًا (Functions as a Parameter)

**مثال:**

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

## المحاضرة 9: دوال لامدا، ومقدّمة إلى الصفوف والقوائم

### ملاحظات إضافية على الدوال

- للدوال نوع خاص بها.
- يمكن تمريرها كوسائط (arguments) إلى دوال أخرى.
- يمكن إرجاعها قيمةً من إجراء آخر.

### دوال لامدا (Lambda Functions)

- طريقة مجهولة (anonymous) لكتابة دوال لا تكون مربوطة باسم محدّد.

**مثلًا:**

```python
y = lambda x: x + 5
print(y(4))  # this prints 9 to the console
```

### الصفوف (Tuples)

- تسلسلات مرتّبة من الكائنات.
- الصيغة: `my_tuple = (1, 2, "test", 4, "hello")`
- يمكن أن تكون الكائنات من أي نوع.
- وهي غير قابلة للتغيير (immutable) — أي لا يمكن تغييرها بعد إنشائها.

### القوائم (Lists)

- تسلسل مرتّب من الكائنات.
- الصيغة: `my_list = [1, 2, "test", 4, "hello"]`
- يمكن أن تكون الكائنات من أي نوع.
- وهي قابلة للتغيير (mutable) — أي يمكن تغييرها بعد إنشائها.

### عمليات شائعة على القوائم والصفوف

**الفهرسة (Indexing):**

```python
my_list = [1, 2, "test", 4, "hello]
print(my_list[0])  # this prints 1

# similarly
my_tuple = (1, 2, "test", 4)
print(my_tuple[2])  # this prints test
```

**التقطيع (Slicing):**

```python
my_list = [1, 2, "test", 4, "hello]
print(my_list[0:2])  # this prints [1,2]

my_tuple = (1, 2, "test", 4)
print(my_tuple[2:]). # this prints ("test", 4)
```

**المرور على العناصر (Looping over elements):** يمكن كتابة شيفرة مشابهة للصفوف والقوائم معًا.

```python
my_list = [1, 2, "test", 4, "hello]

# this for loop loops through each element of my_list and outputs to console
for elem in my_list:
    print(elem)
```