---
title: "إنشاء وحداتك الخاصة"
lang: ar
source: "https://programming-26.mooc.fi/part-7/5-creating-modules"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستتمكن من كتابة وحداتك (modules) الخاصة
- ستعرف ما يشير إليه متغير Python `__name__` والقيمة `__main__`

</text-box>

كتابة وحدات Python الخاصة بك أمر سهل. أي ملف يحتوي على كود Python صالح يمكن استيراده كوحدة (module). لنفترض أن لدينا ملفًا باسم `words.py` بالمحتوى التالي:

```python
def first_word(my_string: str):
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str):
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str):
    parts = my_string.split(" ")
    return len(parts)
```

يمكن الوصول إلى الدوال المعرفة في الملف عن طريق استيراد الملف:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```


```
Sheila
seashore
6
```


ملاحظة: يجب أن يكون الملف الذي يحتوي على وحدة Python موجودًا إما في نفس الدليل مع البرنامج الذي يستورده، أو في أحد أدلة Python الافتراضية، وإلا فلن يعثر مفسر Python عليه عند تنفيذ عبارة `import`.

يمكننا استخدام وحداتنا الخاصة تمامًا كما تعلمنا استخدام الوحدات من المكتبة القياسية لـ Python:

```python
from words import first_word, last_word

sentence = input("Please type in a sentence: ")

print("The first word was: " + first_word(sentence))
print("The last word was: " + last_word(sentence))
```


```
Please type in a sentence: **Python is a swell programming language**
The first word was: Python
The last word was: language
```


## الاستفادة من تلميحات الأنواع (type hints)

عند استخدام الوحدات، تصبح تلميحات الأنواع مفيدة بشكل خاص. إذا كنت تستخدم محررًا يدعم تلميحات الأنواع بشكل مدمج، فإن استخدام الوحدات المختلفة يصبح أسهل بكثير.

على سبيل المثال، إذا أضفنا تلميحات الأنواع إلى ملف `words.py`:

```python
def first_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str) -> int:
    parts = my_string.split(" ")
    return len(parts)
```

فسيكون المحرر قادرًا على اقتراح الدوال المتاحة وأنواع إرجاعها عند كتابة `words.` بعد استيراد الوحدة.

## متغير `__name__` وقيمة `__main__`

عندما يتم تشغيل ملف Python مباشرة (كبرنامج رئيسي)، يتم تعيين متغير `__name__` في هذا الملف إلى القيمة `__main__`. ومع ذلك، عندما يتم استيراد الملف كوحدة، يتم تعيين `__name__` إلى اسم الوحدة (أي اسم الملف بدون الامتداد `.py`).

هذا السلوك مفيد عندما نريد أن يكون لملف سلوك مختلف عند تشغيله مباشرة مقابل عند استيراده كوحدة. على سبيل المثال، قد نريد تضمين كود اختبار أو عرض توضيحي يتم تنفيذه فقط عند تشغيل الملف مباشرة:

```python
def first_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[0]

def last_word(my_string: str) -> str:
    parts = my_string.split(" ")
    return parts[-1]

def number_of_words(my_string: str) -> int:
    parts = my_string.split(" ")
    return len(parts)

if __name__ == "__main__":
    # هذا الكود سيتم تنفيذه فقط عند تشغيل الملف مباشرة
    # لن يتم تنفيذه عند استيراد الوحدة
    test_string = "This is a test sentence"
    print(first_word(test_string))
    print(last_word(test_string))
    print(number_of_words(test_string))
```

إذا قمنا بتشغيل هذا الملف مباشرة، فسيطبع:

```
This
sentence
5
```

ولكن إذا استوردنا هذا الملف كوحدة في ملف آخر، فلن يتم تنفيذ الكود داخل كتلة `if __name__ == "__main__":`.

هذا نمط شائع جدًا في Python ويُستخدم للسماح للوحدات بأن تكون قابلة للاستيراد وكذلك قابلة للتشغيل مباشرة لأغراض الاختبار أو العرض التوضيحي.
