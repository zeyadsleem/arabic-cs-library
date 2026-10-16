---
title: "معالجة البيانات"
lang: ar
source: "https://programming-26.mooc.fi/part-7/4-data-processing"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستكون قادرًا على استخدام وحدة لمعالجة ملفات CSV
> - ستكون قادرًا على استخدام وحدة لمعالجة ملفات JSON
> - ستكون قادرًا على جلب الملفات من الإنترنت وقراءتها


## قراءة ملفات CSV {#reading-csv-files}

صيغة CSV بسيطة إلى حدّ أننا حتى الآن تعاملنا معها بشيفرة مكتوبة يدويًا. غير أنّ هناك وحدة جاهزة في مكتبة Python القياسية للعمل مع ملفات CSV، وهي [csv](https://docs.python.org/3/library/csv.html). وهي تعمل هكذا:

```python
import csv

with open("test.csv") as my_file:
    for line in csv.reader(my_file, delimiter=";"):
        print(line)
```

تقرأ الشيفرة أعلاه كل الأسطر في ملف CSV المسمّى `test.csv`، وتفصل محتوى كل سطر إلى قائمة باستخدام الفاصل `;`، وتطبع كل قائمة. لذا، بافتراض أن محتوى الأسطر كالتالي:

```x
012121212;5
012345678;2
015151515;4
```

ستطبع الشيفرة ما يلي:


```
['012121212', '5']
['012345678', '2']
['015151515', '4']
```


ما دامت صيغة CSV بسيطة إلى هذا الحد، فما الفائدة من وجود وحدة منفصلة ما دمنا نستطيع استخدام الدالة `split` بالمثل؟ حسنًا، أوّلًا، بسبب طريقة بناء الوحدة، فإنها تعمل بشكل صحيح أيضًا إذا كانت القيم في الملف سلاسل نصية قد تحتوي هي نفسها على محرف الفاصل. فإذا بدا بعض الأسطر في الملف هكذا

```x
"aaa;bbb";"ccc;ddd"
```

فستنتج الشيفرة أعلاه ما يلي:


```
['aaa;bbb', 'ccc;ddd']
```


واستخدام الدالة `split` سيفصل أيضًا داخل السلاسل النصية، وهو ما يُرجَّح أن يُفسد البيانات، ويُفسد برنامجنا في أثناء ذلك.

## قراءة ملفات JSON {#reading-json-files}

ليست CSV سوى واحدة من صيغ كثيرة للبيانات القابلة للقراءة آليًا. و[JSON](https://www.json.org/json-en.html) صيغة أخرى، وتُستخدم كثيرًا حين يلزم نقل البيانات بين التطبيقات.

ملفات JSON هي ملفات نصية ذات صيغة صارمة، وربما تكون أقلّ ألفة للعين البشرية من صيغة CSV. ويستخدم المثال التالي الملف `courses.json`، الذي يحتوي على معلومات عن بعض المقررات:

```x
[
    {
        "name": "Introduction to Programming",
        "abbreviation": "ItP",
        "periods": [1, 3]
    },
    {
        "name": "Advanced Course in Programming",
        "abbreviation": "ACiP",
        "periods": [2, 4]
    },
    {
        "name": "Database Application",
        "abbreviation": "DbApp",
        "periods": [1, 2, 3, 4]
    }
]
```

قد تبدو بنية ملف JSON مألوفة لك تمامًا الآن. فملف JSON أعلاه يشبه تمامًا قائمة في Python تحتوي على ثلاثة قواميس Python.

وتحتوي المكتبة القياسية على وحدة للعمل مع ملفات JSON، وهي [json](https://docs.python.org/3/library/json.html). وتأخذ الدالة `loads` أي وسيط يُمرَّر بصيغة JSON وتحوّله إلى بنية بيانات في Python. لذا، فإن معالجة ملف `courses.json` بالشيفرة أدناه

```python
import json

with open("courses.json") as my_file:
    data = my_file.read()

courses = json.loads(data)
print(courses)
```

ستطبع ما يلي:


```
[{'name': 'Introduction to Programming', 'abbreviation': 'ItP', 'periods': [1, 3]}, {'name': 'Advanced Course in Programming', 'abbreviation': 'ACiP', 'periods': [2, 4]}, {'name': 'Database Application', 'abbreviation': 'DbApp', 'periods': [1, 2, 3, 4]}]
```


وإذا أردنا أيضًا طباعة اسم كل مقرر، فيمكننا توسيع برنامجنا بحلقة `for`:

```python
for course in courses:
    print(course["name"])
```


```
Introduction to Programming
Advanced Course in Programming
Database Application
```



> **تمرين برمجي: التعامل مع ملفات JSON**
>
> لننظر إلى ملف JSON يحتوي على بعض المعلومات عن الطلاب بالصيغة التالية:

```json
[
    {
        "name": "Peter Pythons",
        "age": 27,
        "hobbies": [
            "coding",
            "knitting"
        ]
    },
    {
        "name": "Jean Javanese",
        "age": 24,
        "hobbies": [
            "coding",
            "rock climbing",
            "reading"
        ]
    }
]
```

يُرجى كتابة دالة اسمها `print_persons(filename: str)`، تقرأ ملف JSON بالصيغة أعلاه، وتطبع المحتوى كما هو موضّح أدناه. وقد يحتوي الملف على أي عدد من المدخلات.


```
Peter Pythons 27 years (coding, knitting)
Jean Javanese 24 years (coding, rock climbing, reading)
```


ينبغي إدراج الهوايات بالترتيب نفسه الذي تظهر به في ملف JSON.


## جلب ملف من الإنترنت

تحتوي مكتبة Python القياسية أيضًا على وحدات للتعامل مع المحتوى المتوفّر على الإنترنت، ومن الدوال المفيدة دالة [urllib.request.urlopen](
https://docs.python.org/3/library/urllib.request.html#urllib.request.urlopen). ونشجّعك على الاطّلاع على الوحدة كاملة، لكن المثال التالي ينبغي أن يكون كافيًا لتتقن عمل هذه الدالة. ويمكن استخدامها لجلب محتوى من الإنترنت، لتعالجه في برامجك.

ستطبع الشيفرة التالية محتوى الصفحة الرئيسية لجامعة هلسنكي:

```python
import urllib.request

my_request = urllib.request.urlopen("https://helsinki.fi")
print(my_request.read())
```

لا تبدو الصفحات الموجّهة إلى عيون البشر جميلة عادةً عند طباعة شيفرتها. غير أننا في الأمثلة التالية سنتعامل مع _بيانات_ قابلة للقراءة آليًا من مصدر على الإنترنت. وكثير من البيانات القابلة للقراءة آليًا والمتاحة على الإنترنت يكون بصيغة JSON.

> **تمرين برمجي: إحصاءات الدورة**
>
> #### جلب قائمة المقررات النشطة

ستجد على العنوان <https://studies.cs.helsinki.fi/stats-mock/api/courses> معلومات أساسية عن بعض المقررات التي يقدّمها قسم علوم الحاسوب في جامعة هلسنكي، بصيغة JSON.

يُرجى كتابة دالة اسمها `retrieve_all()` تجلب بيانات كل المقررات النشطة حاليًا (الحقل `enabled` له القيمة `true`). وينبغي إرجاع هذه البيانات في قائمة من الصفوف (tuples) بالصيغة التالية:


```
[
    ('Full Stack Open 2020', 'ofs2019', 2020, 201),
    ('DevOps with Docker 2019', 'docker2019', 2019, 36),
    ('DevOps with Docker 2020', 'docker2020', 2020, 36),
    ('Beta DevOps with Kubernetes', 'beta-dwk-20', 2020, 28)
]
```


يحتوي كل صف على الحقول التالية من البيانات الأصلية:

- اسم المقرر: `fullName`
- `name`
- `year`
- مجموع القيم المدرجة في `exercises`


**ملاحظة**: من الضروري أن تجلب البيانات بالدالة `urllib.request.urlopen`، وإلا فقد لا تعمل الاختبارات الآلية بشكل صحيح.

**ملاحظة 2:** صُمّمت الاختبارات بحيث تُعدّل قليلًا البيانات المجلوبة من الإنترنت، للتأكّد من أنك لا تُرمّز قيم الإرجاع ترميزًا ثابتًا.

**ملاحظة 3:** صادف بعض مستخدمي Mac المشكلة التالية:

```sh
File "/Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/urllib/request.py", line 1353, in do_open
    raise URLError(err)
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1124)>
```

يعتمد الحل على طريقة تثبيت Python على جهازك. وفي بعض الحالات يساعد تنفيذ ما يلي في الطرفية:

```sh
cd "/Applications/Python 3.8/"
sudo "./Install Certificates.command
```

يعتمد المسار المستخدَم في الأمر `cd` أعلاه على إصدار Python المثبَّت لديك. وقد يكون المسار أيضًا، على سبيل المثال، `"/Applications/Python 3.9/"`.

اقتُرحت [حلول متنوّعة](https://stackoverflow.com/questions/27835619/urllib-and-ssl-certificate-verify-failed-error) لهذه المشكلة.

وهناك حيلة وجدها بعضهم مفيدة:

```python
import urllib.request
import json
import ssl # add this library to your import section

def retrieve_all():
    # add the following line to the beginning of all your functions
    context = ssl._create_unverified_context()
    # the rest of your function
```

وحلّ بديل محتمل:

 ```python
import urllib.request
import certifi # add this library to your import section
import json

def retrieve_all():
    address = "https://studies.cs.helsinki.fi/stats-mock/api/courses"
    # add a second argument to the function call
    request = urllib.request.urlopen(address, cafile=certifi.where())
    # the rest of your function
```

#### جلب بيانات مقرر واحد

لكل مقرر أيضًا عنوان URL خاص به، تتوفّر فيه بيانات أسبوعية أكثر تحديدًا عن المقرر. وتتبع عناوين URL الصيغة <https://studies.cs.helsinki.fi/stats-mock/api/courses/****/stats>، حيث تستبدل النجوم بمحتوى الحقل `name` للمقرر الذي تريد الوصول إليه.

فمثلًا، توجد بيانات المقرر `docker2019` على العنوان <https://studies.cs.helsinki.fi/stats-mock/api/courses/docker2019/stats>.

يُرجى كتابة دالة اسمها `retrieve_course(course_name: str)` تُعيد إحصاءات المقرر المحدّد بصيغة قاموس.

فمثلًا، سيُعيد استدعاء الدالة `retrieve_course("docker2019")` قاموسًا بالمحتوى التالي:


```
{
    'weeks': 4,
    'students': 220,
    'hours': 5966,
    'hours_average': 27,
    'exercises': 4988,
    'exercises_average': 22
}
```


وتُحدَّد القيم في القاموس كما يلي:

- `weeks`: عدد كائنات JSON المُسترجَعة
- `students`: أكبر عدد من الطلاب في كل الأسابيع
- `hours`: مجموع كل قيم `hour_total` في الأسابيع المختلفة
- `hours_average`: قيمة `hours` مقسومة على قيمة `students` (مقرّبة للأسفل إلى أقرب عدد صحيح)
- `exercises`: مجموع كل قيم `exercise_total` في الأسابيع المختلفة
- `exercises_average`: قيمة `exercises` مقسومة على قيمة `students` (مقرّبة للأسفل إلى أقرب عدد صحيح)

**ملاحظة**: راجع التنبيهات في الجزء 1 من التمرين، فهي تنطبق هنا أيضًا.

**ملاحظة 2**: تحتوي وحدة [math](https://docs.python.org/3/library/math.html) في Python على دالة مفيدة لتقريب الأعداد الصحيحة للأسفل.


> **تمرين برمجي: من غشّ**
>
> يحتوي الملف `start_times.csv` على أوقات بدء فردية لامتحان برمجة، بالصيغة `name;hh:mm`. ومثال على ذلك:

```csv
jarmo;09:00
timo;18:42
kalle;13:23
```

وبالإضافة إلى ذلك، يحتوي الملف `submissions.csv` على النقاط وأوقات التسليم للتمارين الفردية. والصيغة هنا هي `name;task;points;hh:mm`. ومثال على ذلك:

```csv
jarmo;1;8;16:05
timo;2;10;21:22
jarmo;2;10;19:15
jne...
```

مهمّتك أن تجد الطلاب الذين أمضوا أكثر من 3 ساعات في تمارين الامتحان. أي أن كل طالب سُلِّم _أيٌّ_ من تمارينه بعد أكثر من 3 ساعات من وقت بدء امتحانه يُصنَّف غشّاشًا. وقد يكون هناك أكثر من تسليم واحد للمهمة نفسها لكل طالب. ويمكنك أن تفترض أن كل الأوقات في اليوم نفسه.

يُرجى كتابة دالة اسمها `cheaters()` تُعيد قائمة تحتوي على أسماء الطلاب الذين غشّوا


> **تمرين برمجي: من غشّ، الإصدار 2**
>
> لديك مرة أخرى ملفات CSV من التمرين السابق تحت تصرّفك. يُرجى كتابة دالة اسمها `final_points()` تُعيد نقاط الامتحان النهائية التي حصل عليها الطلاب بصيغة قاموس، وفق المعايير التالية:

* إذا كان هناك عدة تسليمات للمهمة نفسها، فيُؤخذ بالحسبان التسليم الحاصل على أكبر عدد من النقاط.
* إذا قُدِّم التسليم بعد أكثر من 3 ساعات من وقت البدء، فيُتجاهل التسليم.

تُرقَّم المهام من 1 إلى 8، ويُقيَّم كل تسليم من 0 إلى 6 نقاط.

في القاموس المُعاد ينبغي أن يكون المفتاح اسم الطالب، والقيمة مجموع النقاط التي حصل عليها الطالب.

تلميح: قد تكون القواميس المتداخلة منهجًا جيدًا عند معالجة مهام كل طالب وأوقات تسليمه.


## البحث عن الوحدات

تحتوي وثائق Python الرسمية على معلومات عن كل الوحدات المتاحة في المكتبة القياسية:

* https://docs.python.org/3/library/

وبالإضافة إلى المكتبة القياسية، يفيض الإنترنت بوحدات Python متاحة مجانًا لأغراض مختلفة. وهذه بعض الوحدات الشائعة الاستخدام:

* https://wiki.python.org/moin/UsefulModules

> **تمرين برمجي: المدقّق الإملائي، الإصدار 2**
>
> ستكتب في هذا التمرين نسخة محسّنة من مدقّق الإملاء (Spell checker) من [الجزء السابق](/book/mooc/part-6/1-reading-files).

كما في النسخة السابقة، ينبغي أن يطلب البرنامج من المستخدم كتابة سطر من النص. ثم ينبغي أن يجري برنامجك تدقيقًا إملائيًا ويطبع ملاحظات للمستخدم، بحيث تُحاط كل الكلمات المكتوبة خطأً بنجوم. وإضافةً إلى ذلك، _ينبغي أن يطبع البرنامج قائمة اقتراحات للكلمات المكتوبة خطأً_.

يُرجى الاطلاع على المثالين التاليين.


```
We use *ptython* to make a spell checker
suggestions:
ptython: python, pythons, typhon
```



```
this is *acually* a good and *usefull* program
suggestions:
acually: actually, tactually, factually
usefull: usefully, useful, museful
```


ينبغي تحديد الاقتراحات بالدالة [get\_close\_matches](https://docs.python.org/3/library/difflib.html#difflib.get_close_matches) من وحدة المكتبة القياسية في Python [difflib](https://docs.python.org/3/library/difflib.html).

**ملاحظة**: لكي تعمل الاختبارات الآلية بشكل صحيح، يُرجى استخدام الدالة بـ«الإعدادات الافتراضية». أي يُرجى تمرير وسيطين فقط إلى الدالة: الكلمة المكتوبة خطأً، وقائمة الكلمات.


<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 311e3116-a763-50b5-b79e-056fdccb3394)

-->
