---
book: mit-6100l
chapter: recitations
slug: rec6
lang: ar
title: "الجلسة التطبيقية 6: التشارك بالاسم والاستنساخ، وقوائم الفهم"
---

# الجلسة التطبيقية 6 (Recitation 6)

## المصادر والنسبة والترخيص

المادة الأصلية: **آنا بيل (Ana Bell)**، **MIT OpenCourseWare (MIT OCW)**، معهد ماساتشوستس للتكنولوجيا، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، **خريف 2022 (Fall 2022)**.

- [صفحة الجلسة الرسمية على OCW](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec06_zip/).

هذه ترجمة وتكييف عربي غير رسمي وفق [رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. [شروط الاستخدام والاستشهاد](https://ocw.mit.edu/terms/).

**منهج الترجمة:** لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.

**ملاحظة المترجم:** المصدر ملف Word. فقد استخراج النصّ المسافات البادئة التي تدلّ على القوائم، فحُذفت، بينما حُفظت المسافات البادئة داخل الشيفرة. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » وشرطة الطرح « – » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.

## المحاضرة المرتبطة

تُرافق هذه الجلسة التطبيقية [المحاضرة 12: إنشاء القوائم، والدوال ككائنات، والاختبار، وتنقيح الأخطاء (List Comprehension, Functions as Objects, Testing, Debugging)](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-12-list-comprehension-functions-as-objects-testing-debugging/). ويعرض ملخّصها التشارك بالاسم (Aliasing) والاستنساخ (Cloning) في المحاضرة 11، ثم إنشاء القوائم (List Comprehension) والمعاملات الافتراضية (Default Parameters) والاختبار (Testing) وتنقيح الأخطاء (Debugging) في المحاضرة 12.

## تذكيرات (Reminders)

6.100L، الجلسة التطبيقية 6 — 21 أكتوبر 2022.

- مسابقة MQ6 الاثنين المقبل 10/24.
- التسليم المرحلي في منتصف مجموعة المسائل PS3 مستحقّ الأربعاء المقبل 10/26.

## المحاضرة 11: التشارك بالاسم والاستنساخ

### التشارك بالاسم (Aliasing) والاستنساخ (Cloning)

- يمكن تغيير الكائنات القابلة للتغيير بعد إنشائها.
- ما أنواع البيانات القابلة للتغيير التي نعرفها حتى الآن؟ القوائم.
- التشارك بالاسم (Aliasing): عندما يشير اسما متغيّرين إلى الكائن نفسه.
- الاستنساخ (Cloning): إنشاء نسخة من كائن (وهو عادةً الخيار الآمن).

**المثال 1:** هنا لا نغيّر فعليًا نسخةَ `word`. لماذا؟ لأنّ السلاسل النصية غير قابلة للتغيير.

```python
word = "the"
word_copy = word
word += " bird"
print(word) # "the bird"
print(word_copy) # "the"
```

**المثال 2:**

```python
a = [1,2,3,4]
b = a
b += [5]
print(b)  # [1,2,3,4,5]
print(a)  # [1,2,3,4,5]
```

- الآن يشير `b` إلى `a`. ولأنّ القائمة قابلة للتغيير، فإنّك إذا أجريت تغييرات على `b` فستغيّر `a`.

### `=` في الأنواع غير القابلة للتغيير مقابل القابلة للتغيير

- في الأنواع غير القابلة للتغيير، ينشئ `=` كائنًا جديدًا.
- في الأنواع القابلة للتغيير، يُسند `=` المتغيّر الجديد إلى الكائن نفسه.

### لماذا تهمّ قابلية التغيير؟

- تجعل شيفرتك تفعل أمورًا غير متوقّعة. مثلًا، قد تغيّر متغيّرًا لم تقصد تغييره.

### كيف أتفادى مشكلات قابلية التغيير؟

- اصنع نسخًا (clones).

```python
List_copy = list[:]
List_copy = list.copy()
List_copy = copy.copy(list)
```

### النسخ السطحي مقابل النسخ العميق

- النسخ السطحي (shallow copy) ينشئ بنية بيانات جديدة لكنّ العناصر الفعلية مشتركة — أي نسخ من المستوى الأوّل فقط.

```python
copy.copy(example_list)  # this is a shallow copy
copy.deepcopy(example_list)  # this is a deepcopy
```

- تذكير مفيد: لا تغيّر القوائم وأنت تمرّ عليها في حلقة.

### `sort` مقابل `sorted`

- `sort`: يغيّر القائمة، ولا يُعيد شيئًا.
- `sorted`: لا يغيّر القائمة، ويُعيد قائمة جديدة مرتّبة.

### طرائق القوائم المفيدة (Useful List Methods)

```python
my_list.copy()  # no mutation - returns copy
my_list.reverse()  # mutation
sorted(my_list)  # no mutation - returns sorted list
my_list.sort()  # mutation
my_list.extend([x,y])  # mutation
my_list[:]  # makes clone
my_list.remove(2) # mutation
my_list.pop()  # pops last element - mutation
my_list.pop(2)  # pops 3rd element
my_list.insert(1, 7)  # inserts 7 in the 2nd position - mutation
```

## المحاضرة 12

### إنشاء القوائم (List Comprehension)

- هذه طريقة أقصر لإنشاء قائمة جديدة انطلاقًا من قيم بنية بيانات موجودة.

```python
# standard method
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]
new_list = []

for x in fruits: # standard for loop
  if "a" in x:
    newlist.append(x)

# using list comprehension
newlist = [x for x in fruits if "a" in x]
```

### المعاملات الافتراضية في الدوال (Default Parameters in Functions)

**مثال:** هنا `y` معامل افتراضي.

```python
def multiply(x, y=2):
    output = x * y
    return output

print(multiply(3))  # outputs 6
print(multiply(3,4))  # outputs 12
```

### الاختبار (Testing)

- اكتب شيفرة يمكن تفكيكها إلى أجزاء ويمكن اختبارها بسهولة (بما في ذلك التعليقات والافتراضات).

**ثلاث فئات من الاختبارات:**

- اختبار الوحدة (Unit testing): اختبر كلّ دالة على حدة.
- اختبار الانحدار (Regression testing): أضف اختبارات للأخطاء كلّما عثرت عليها.
- اختبار التكامل (Integration testing): على المستوى الأعلى — هل يفعل البرنامج ما تريده؟

**منهجيتا الاختبار الرئيسيتان:**

- الاختبار الصندوق الأسود (Black box testing): يُصمَّم دون النظر في الشيفرة، ويتجنّب تحيّز المنفّذ، ويمكن إعادة استخدامه إذا تغيّر التنفيذ.
- الاختبار الصندوق الزجاجي (Glass box testing): استخدم الشيفرة لتوجيه تصميم حالات الاختبار.
- تذكّر باختبار الحالات الحديّة (edge cases).

### تنقيح الأخطاء (Debugging)

**نصائح عامّة:**

- اطبع قيم متغيّراتك.
- محرّك البحث في الويب صديقك إذا صادفت خطأً لا تفهمه.
- يُظهر أثر المكدّس (stack trace) أيّ سطر (أو أسطر) سبّب الخطأ — فاستفد منه.

### رسائل الخطأ الشائعة

```python
test = [1,2,3]

test[4]  # will throw an IndexError since there doesn't exist an element at index 4
int(test)  # will throw a TypeError since lists cannot be converted into integer

# Any error in Python syntax will throw a SyntaxError
```