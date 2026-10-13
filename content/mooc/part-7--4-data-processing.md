---
title: "معالجة البيانات"
lang: ar
source: "https://programming-26.mooc.fi/part-7/4-data-processing"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستعرف كيفية استخدام وحدة (module) لمعالجة ملفات CSV
- ستعرف كيفية استخدام وحدة (module) لمعالجة ملفات JSON
- ستتمكن من استرجاع وقراءة الملفات من الإنترنت

</text-box>

## قراءة ملفات CSV

يُعد تنسيق CSV بسيطًا للغاية لدرجة أننا حتى الآن كنا نصل إليه باستخدام كود مكتوب يدويًا. ومع ذلك، توجد وحدة جاهزة في المكتبة القياسية لـ Python للعمل مع ملفات CSV: [csv](https://docs.python.org/3/library/csv.html). تعمل كالتالي:

```python
import csv

with open("test.csv") as my_file:
    for line in csv.reader(my_file, delimiter=";"):
        print(line)
```

يقوم الكود أعلاه بقراءة جميع الأسطر في ملف CSV المسمى `test.csv`، ويفصل محتويات كل سطر إلى قائمة باستخدام الفاصل `;`، ويطبع كل قائمة. لذا، بافتراض أن محتويات الأسطر كالتالي:

```x
012121212;5
012345678;2
015151515;4
```

فإن الكود سيطبع ما يلي:


```
['012121212', '5']
['012345678', '2']
['015151515', '4']
```


نظرًا لبساطة تنسيق CSV، فما فائدة وجود وحدة منفصلة بينما يمكننا استخدام الدالة `split` بسهولة؟ حسنًا، أولاً، الطريقة التي صُممت بها الوحدة تجعلها تعمل بشكل صحيح حتى إذا كانت القيم في الملف سلاسل نصية (strings)، والتي قد تحتوي أيضًا على حرف الفاصل. إذا كان أحد الأسطر في الملف يبدو كالتالي:

```x
"aaa;bbb";"ccc;ddd"
```

فإن الكود أعلاه سينتج هذا:


```
['aaa;bbb', 'ccc;ddd']
```


استخدام الدالة `split` سيقوم أيضًا بالتقسيم داخل السلاسل النصية، مما قد يؤدي إلى تلف البيانات، وبرنامجنا في هذه العملية.

## قراءة ملفات JSON

يُعد CSV واحدًا فقط من بين العديد من تنسيقات البيانات القابلة للقراءة آليًا. [JSON](https://www.json.org/json-en.html) هو تنسيق آخر، ويُستخدم كثيرًا عند نقل البيانات بين التطبيقات.

ملفات JSON هي ملفات نصية بتنسيق صارم، وهو ربما أقل سهولة في الوصول إليها من قبل البشر مقارنة بـ CSV، ولكن يمكن تحليلها (parsing) بسهولة أكبر برمجيًا. توفر Python وحدة `json` في مكتبتها القياسية للعمل مع بيانات JSON.

```python
import json

with open("test.json") as my_file:
    data = json.load(my_file)

print(data)
```

إذا كان محتوى الملف `test.json` كالتالي:

```json
{
  "name": "Peter",
  "age": 30,
  "city": "New York"
}
```

فإن الكود سيطبع قاموسًا (dictionary) في Python:

```
{'name': 'Peter', 'age': 30, 'city': 'New York'}
```

يمكنك أيضًا كتابة بيانات JSON إلى ملف:

```python
import json

my_data = {
  "name": "Peter",
  "age": 30,
  "city": "New York"
}

with open("test.json", "w") as my_file:
    json.dump(my_data, my_file)
```

## قراءة الملفات من الإنترنت

يمكنك أيضًا قراءة الملفات مباشرة من الإنترنت باستخدام وحدة `urllib` في المكتبة القياسية. إليك مثال يوضح كيفية قراءة ملف CSV من الويب:

```python
import csv
import urllib.request

url = "https://example.com/data.csv"

with urllib.request.urlopen(url) as response:
    lines = [line.decode("utf-8") for line in response]
    reader = csv.reader(lines, delimiter=";")
    for row in reader:
        print(row)
```

وبالمثل، لقراءة بيانات JSON من الويب:

```python
import json
import urllib.request

url = "https://example.com/data.json"

with urllib.request.urlopen(url) as response:
    data = json.load(response)
    print(data)
```

> **ملاحظة:** عند العمل مع بيانات من الإنترنت، يجب دائمًا مراعاة معالجة الأخطاء (error handling) لأن طلبات الشبكة قد تفشل لأسباب مختلفة (انقطاع الاتصال، الخادم معطل، إلخ).
