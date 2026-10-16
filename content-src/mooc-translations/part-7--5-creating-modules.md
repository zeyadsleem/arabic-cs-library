---
title: "إنشاء وحداتك الخاصة"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون قادرًا على كتابة وحداتك الخاصة
> - ستعرف ما الذي يعنيه المتغيّر `__name__` في Python والقيمة `__main__`


كتابة وحدات Python الخاصة بك أمر سهل. فأي ملف يحتوي على شيفرة Python صحيحة يمكن استيراده كوحدة. ولنفترض أن لدينا ملفًا اسمه `words.py` بالمحتوى التالي:

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

يمكن الوصول إلى الدوال المعرّفة في الملف باستيراد الملف:

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


ملاحظة: يجب أن يكون الملف الذي يحتوي على وحدة Python موجودًا إما في الدليل نفسه مع البرنامج الذي يستوردها، وإما في أحد أدلة Python الافتراضية، وإلا فلن يعثر عليه مفسّر Python عند تنفيذ عبارة `import`.

يمكننا استخدام وحداتنا الخاصة تمامًا كما تعلّمنا استخدام الوحدات من مكتبة Python القياسية:

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


## الاستفادة من تلميحات النوع

عند استخدام الوحدات تصبح تلميحات النوع مفيدة بشكل خاص. وإذا كنت تستخدم محرّرًا يدعم تلميحات النوع مدمجًا، فيصبح استخدام الوحدات المختلفة أسهل بكثير.

فمثلًا، يعرض Visual Studio Code تلميحات النوع أثناء كتابتك للشيفرة:

![7_vihje.png](/images/mooc/part-7/7_vihje.png)

## شيفرة الدالة الرئيسية داخل وحدة

إذا احتوت وحدة على أي شيفرة غير موجودة داخل تعريف دالة (أي إذا احتوت الوحدة على شيفرة في الدالة الرئيسية لها)، فإن هذه الشيفرة تُنفَّذ تلقائيًا كلما استُوردت الوحدة.

ولنفترض أن ملف `words.py` لدينا احتوى أيضًا على بعض حالات الاختبار:

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

print(first_word("This is a test"))
print(last_word("Here we are still testing"))
print(number_of_words("One two three four five"))
```

الآن، إذا استوردنا الوحدة بعبارة `import`، فستُنفَّذ تلقائيًا كل الشيفرة في الوحدة الموجودة خارج الدوال المعرّفة:

```python
import words

my_string = "Sheila sells seashells by the seashore"

print(words.first_word(my_string))
print(words.last_word(my_string))
print(words.number_of_words(my_string))
```


```
This
testing
5
Sheila
seashore
6
```


وكما ترى أعلاه، ليست هذه نتيجة جيدة، لأن البرنامج الذي نحاول كتابته يتشوّش بسبب حالات الاختبار من الوحدة نفسها.

لحسن الحظ، هناك حل، وهو حل استخدمته مرات عديدة من قبل في تمارين هذه الدورة. كل ما نحتاجه هو اختبار ما إذا كان البرنامج قيد التنفيذ بمفرده، أو ما إذا كانت الشيفرة قد استُوردت بعبارة `import`. فللـ Python متغيّر مدمج هو `__name__`، يحتوي على اسم البرنامج قيد التنفيذ. وإذا كان البرنامج قيد التنفيذ بمفرده، فإن قيمة المتغيّر هي `__main__`. أما إذا كان البرنامج قد استُورد، فإن قيمة المتغيّر هي اسم الوحدة المستورَدة (في هذه الحالة `words`).

وبمعرفة ذلك، يمكننا إضافة جملة شرطية تتيح لنا تنفيذ حالات الاختبار فقط إذا نُفِّذ البرنامج بمفرده. وكما ترى أدناه، تبدو البنية مألوفة:

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
    # testing functionality
    print(first_word("This is a test"))
    print(last_word("Here we are still testing"))
    print(number_of_words("One two three four five"))
```

وإذا نفّذت الوحدة بمفردها، فستُطبع حالات الاختبار:


```
This
testing
5
```


وعند استيراد الوحدة في برنامج آخر، لا تُنفَّذ حالات الاختبار:

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


في تمارين هذه الدورة، كلما طُلب منك كتابة دوال، كان يُتوقَّع منك عادةً أيضًا أن تلفّ حالات الاختبار في كتلة `if __name__ == "__main__"` تمامًا مثل الكتلة أعلاه. والآن تعرف السبب.

> **تمرين برمجي: مساعد السلاسل**
>
> يُرجى كتابة وحدة اسمها `string_helper` تحتوي على الدوال التالية:

تُنشئ الدالة `change_case(orig_string: str)` نسخة جديدة من السلسلة النصية المُمرَّرة كمعامل وتُعيدها. وينبغي أن تصبح الأحرف الصغيرة في الأصل أحرفًا كبيرة، والأحرف الكبيرة أحرفًا صغيرة.

تقسم الدالة `split_in_half(orig_string: str)` السلسلة النصية المُمرَّرة كمعامل إلى نصفين، وتُعيد النتيجتين في صف (tuple). وإذا كان عدد محارف الأصل فرديًا، ينبغي أن يكون النصف الأول أقصر.

تُعيد الدالة `remove_special_characters(orig_string: str)` نسخة جديدة من السلسلة النصية المُمرَّرة كمعامل، بعد إزالة كل المحارف الخاصة. ولا يُسمح في السلسلة النصية المُعادة إلا بالأحرف الصغيرة والكبيرة والأرقام والمسافات.

وفيما يلي بعض الأمثلة على كيفية استخدام الوحدة:

```python
import string_helper

my_string = "Well hello there!"

print(string_helper.change_case(my_string))

p1, p2 = string_helper.split_in_half(my_string)

print(p1)
print(p2)

m2 = string_helper.remove_special_characters("This is a test, lets see how it goes!!!11!")
print(m2)
```


```
wELL HELLO THERE!
Well hel
lo there!
This is a test lets see how it goes11
```


<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 2203412c-628c-54a3-bd77-edebd5ce4f67)

-->

يُرجى الإجابة عن استبيان سريع عن مواد هذا الأسبوع.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 953a13c1-b365-557e-b3f5-da39f8814f3e)
