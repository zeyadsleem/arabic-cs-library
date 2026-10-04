---
book: mit-6100l
chapter: recitations
slug: rec7
lang: ar
title: "الجلسة التطبيقية 7: الاستثناءات والتأكيدات، والقواميس"
---

# الجلسة التطبيقية 7 (Recitation 7)

## المصادر والنسبة والترخيص

المادة الأصلية: **آنا بيل (Ana Bell)**، **MIT OpenCourseWare (MIT OCW)**، معهد ماساتشوستس للتكنولوجيا، مقرر **6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python**، **خريف 2022 (Fall 2022)**.

- [صفحة الجلسة الرسمية على OCW](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec07_zip/).

هذه ترجمة وتكييف عربي غير رسمي وفق [رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل](https://creativecommons.org/licenses/by-nc-sa/4.0/)، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. [شروط الاستخدام والاستشهاد](https://ocw.mit.edu/terms/).

**منهج الترجمة:** لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.

**ملاحظة المترجم:** المصدر ملف PDF. الأجزاء التي يعرضها المصدر صورًا لشيفرة مطبوع بنصوص تعليمية داخل الصورة، فنُقلت الشيفرة نفسها نصًّا في مواضعها، وذُكرت تعليقات الصورة عند كلّ موضع. وعوّضت علامات التنصيص المنحنية « “ ” » و« ‘ ’ » بعلامات ASCII حتى تعمل الشيفرة كما كُتبت، وأُبقيت الأخطاء الواردة في الأصل كما هي.

## المحاضرة المرتبطة

تُرافق هذه الجلسة التطبيقية [المحاضرة 14: القواميس (Dictionaries)](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-14-dictionaries/). ويعرض ملخّصها معالجة الاستثناءات (Exception Handling) والتأكيدات (Assertions) في المحاضرة 13، ثم القواميس (Dictionaries) في المحاضرة 14.

## تذكيرات (Reminders)

6.100L، الجلسة التطبيقية 7 — 28 أكتوبر 2022.

- مسابقة MQ7 الاثنين المقبل 10/31.
- مجموعة المسائل PS3 مستحقّة الأربعاء المقبل 11/2.

## المحاضرة 13: الاستثناءات والتأكيدات (Exceptions & Assertions)

### معالجة الاستثناءات (Exception Handling)

تحدث الاستثناءات (exceptions) عندما تكون الصياغة (syntax) صحيحة، لكنّ الشيفرة تؤدّي عملية غير مسموح بها. ويمكننا معالجتها بطرق عدّة، وفيما يلي بضع خيارات.

#### 1. `try`/`except`

- استعمل هذا لمعالجة استثناء، أي لمنع البرنامج من الانهيار.
- إن لم تحدّد استثناءً بعينه، فإنّه يتعامل مع **جميع** الاستثناءات التي تقع في كتلة `try`.
- إن حدّدت استثناءً بعينه، فإنّ بند `except` لا يتعامل إلا مع أخطاء ذلك النوع.
- هذا اختياري، لكنّه يمكن أن يتضمّن رسالة بعد رمي الخطأ:

```python
except ZeroDivisionError("Cannot divide by zero")
```

**ملاحظة المترجم:** في المصدر مثال على `try`/`except` مطبوع صورةً، وهذه شيفرته منقولًا نصًّا. وكانت على الصورة تعليقات بالأحمر: على بندي `except ValueError` و`except ZeroDivisionError` التعليق أنّهما «يُنفَّذان فقط إذا ظهر هذان الخطآن»، وعلى بند `except` المجرّد التعليق أنّه «لبقيّة الأخطاء».

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
    print("a+b = ", a+b)
except:
    print("Something went very wrong.")
```

#### 2. `raise`

- يُستعمل عندما تريد حدوث استثناء.
- مثلًا:

```python
raise ValueError("string contained a character")
```

**ملاحظة المترجم:** في المصدر مثال على `raise` داخل دالة مطبوع صورةً، وهذه شيفرته منقولًا نصًّا. وكان على سطر `raise` تعليق بالأحمر يقول: «أوقف التنفيذ حالما تصادف محرفًا ليس رقمًا، برسالتنا التوضيحية الخاصة».

```python
def sum_digits(s):
    """ s is a non-empty string containing digits.
    Returns sum of all chars that are digits  """
    total = 0
    for char in s:
        try:
            val = int(char)
            total += val
        except:
            raise ValueError("string contained a character")
    return total
```

#### 3. `assert`

- تقنية برمجية دفاعية جيّدة، إذ يتوقّف التنفيذ عند عدم تحقّق الشرط المتوقَّع.
- صيغتها:

```python
assert <Boolean condition>
assert <Boolean condition>, <assertion message>
```

## المحاضرة 14: القواميس (Dictionaries)

- مثال على قاموس: `my_dict = {'key1': 'value1', 'key2': 2}`
- القاموس (dictionary) بنية بيانات أخرى تربط المفاتيح (keys) بالقيم (values).
- المفاتيح (Keys):
  - يجب أن تكون غير قابلة للتغيير (immutable).
  - يجب أن تكون فريدة.
  - الترتيب غير مضمون.
  - `my_dict.keys()` — يُعيد كلّ مفاتيح القاموس.
- القيم (Values):
  - لا يلزم أن تكون غير قابلة للتغيير ولا فريدة.
  - `my_dict['key1']` — يُعيد `'value1'`.
  - `my_dict['key2']` — يُعيد 2.
  - `my_dict.values()` — يُعيد كلّ قيم القاموس.
- المرور على قاموس يعني المرور على مفاتيحه.
- استعمال الكلمة المفتاحية `in` لاختبار الانتماء بين المفاتيح.
- افحص دائمًا بـ `in my_dict`، لا بـ `in my_dict.keys()`، لأسباب الكفاءة.
- `dict.items()` — يُعيد أزواج المفاتيح والقيم في القاموس.