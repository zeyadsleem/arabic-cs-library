---
title: "كتابة الملفات"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستعرف كيف تنشئ ملفات بشيفرة Python
> - ستكون قادرًا على كتابة بيانات نصية داخل ملف
> - ستعرف كيف تنشئ ملف CSV


حتى الآن قرأنا البيانات من الملفات، ومن الطبيعي أيضًا أن يكون من الممكن كتابة البيانات في الملفات. وعادةً يعالج البرنامج البيانات ويخزّن النتائج في ملف، لتُستخدم لاحقًا أو تُعالَج مزيدًا من خلال برنامج آخر.

يمكننا إنشاء ملف جديد في كل مرة نريد فيها كتابة البيانات في ملف، لكن يمكننا أيضًا إلحاق بيانات جديدة بنهاية ملف موجود. وفي الحالتين نستخدم الدالة `open` من القسم السابق. أما للكتابة في الملفات فتتطلب الدالة وسيطًا ثانيًا.

## إنشاء ملف جديد

إذا أردت إنشاء ملف جديد، فستستدعي الدالة `open` بالوسيط الإضافي `w`، ليشير إلى أن الملف ينبغي فتحه في وضع الكتابة. وعندها قد يبدو استدعاء الدالة هكذا:

```python
with open("new_file.txt", "w") as my_file:
    # code to write something to the file
```

**ملاحظة: إذا كان الملف موجودًا أصلًا فسيُستبدل كل محتواه بالكامل**. ينبغي أن تكون شديد الحذر عند إنشاء ملفات جديدة.

وبفتح الملف يمكنك كتابة البيانات فيه. ويمكنك استخدام التابع `write`، الذي يأخذ السلسلة النصية المراد كتابتها كوسيط له.

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
```

وعند تنفيذ البرنامج يظهر ملف جديد اسمه `new_file.txt` في الدليل. ويبدو المحتوى هكذا:


```
Hello there!
```


وإذا أردت فواصل أسطر في الملف فستضيفها يدويًا — الدالة `write` لا تعمل تمامًا مثل الدالة `print` الأكثر إلفة، مع أنهما متشابهتان. إذًا، فإن البرنامج التالي

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!")
    my_file.write("This is the second line")
    my_file.write("This is the last line")
```

ينتج عنه ملف بهذا المحتوى:


```
Hello there!This is the second lineThis is the last line
```


وتُحقَّق فواصل الأسطر بإضافة محارف السطر الجديد `\n` إلى السلاسل النصية الخاصة بالوسيط:

```python
with open("new_file.txt", "w") as my_file:
    my_file.write("Hello there!\n")
    my_file.write("This is the second line\n")
    my_file.write("This is the last line\n")
```

الآن يبدو محتوى `new_file.txt` هكذا:


```
Hello there!
This is the second line
This is the last line
```


> **تمرين برمجي: النقش**
>
> يُرجى كتابة برنامج يسأل عن اسم المستخدم ثم ينشئ «نقشًا» في ملف يحدّده المستخدم. يُرجى الاطلاع على المثال أدناه.


```
Whom should I sign this to: **Ada**
Where shall I save it: **inscribed.txt**
```


ويكون محتوى الملف `inscribed.txt` هو


```
Hi Ada, we hope you enjoy learning Python with us! Best, Mooc.fi Team
```


**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


## إلحاق بيانات بملف موجود

إذا أردت إلحاق بيانات بنهاية الملف بدل استبدال الملف كله، فتحتاج إلى فتح الملف في وضع الإلحاق بالوسيط `a`.

وإذا لم يكن الملف موجودًا بعد، فإن وضع الإلحاق يعمل تمامًا مثل وضع الكتابة.

يفتح البرنامج التالي الملف `new_file.txt` ويُلحق بضع أسطر نصية بالنهاية:

```python
with open("new_file.txt", "a") as my_file:
    my_file.write("This is the 4th line\n")
    my_file.write("And yet another line.\n")
```

وبعد تنفيذ هذا البرنامج يبدو محتوى الملف هكذا:


```
Hello there!
This is the second line
This is the last line
This is the 4th line
And yet another line.
```


وفي ممارسة البرمجة، ليست إلحاق البيانات بالملفات من المهام الشائعة جدًّا.

وغالبًا ما يُقرأ الملف ويُعالَج ويُستبدل بالكامل. فمثلًا، حين ينبغي تغيير المحتوى في _وسط_ الملف، يكون الأسهل عادةً استبدال الملف كله.

> **تمرين برمجي: المذكرة اليومية**
>
> يُرجى كتابة برنامج يعمل كدفتر يوميات بسيط. وتُحفظ قيود اليوميات في الملف `diary.txt`. وعند تنفيذ البرنامج ينبغي أن يقرأ أولًا أي قيود موجودة في الملف أصلًا.

ملاحظة: ستغيّر الاختبارات الآلية لهذا التمرين محتوى الملف. إذا أردت الاحتفاظ بمحتواه، فانسخ الملف أولًا باسم مختلف.

ويجب أن يعمل البرنامج على النحو التالي:


```
1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **Today I ate porridge**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
1 - add an entry, 2 - read entries, 0 - quit
Function: **1**
Diary entry: **I went to the sauna in the evening**
Diary saved

1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!
```


وعند تنفيذ البرنامج للمرة الثانية، ينبغي أن يحدث ما يلي:


```
1 - add an entry, 2 - read entries, 0 - quit
Function: **2**
Entries:
Today I ate porridge
I went to the sauna in the evening
1 - add an entry, 2 - read entries, 0 - quit
Function: **0**
Bye now!
```


**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


## كتابة ملفات CSV

يمكن كتابة ملفات CSV سطرًا بسطر بالتابع `write` تمامًا كما يُكتب أي ملف آخر. ينشئ المثال التالي الملف `coders.csv`، حيث يحوي كل سطر على اسم وبيئة عمل ولغة مفضّلة وسنوات خبرة لمبرمج واحد. وتفصل الحقول عن بعضها فاصلة منقوطة.

```python
with open("coders.csv", "w") as my_file:
    my_file.write("Eric;Windows;Pascal;10\n")
    my_file.write("Matt;Linux;PHP;2\n")
    my_file.write("Alan;Linux;Java;17\n")
    my_file.write("Emily;Mac;Cobol;9\n")
```

ينتج عن تنفيذ هذا البرنامج الملف التالي:


```
Eric;Windows;Pascal;10
Matt;Linux;PHP;2
Alan;Linux;Java;17
Emily;Mac;Cobol;9
```


وماذا لو كانت البيانات المراد كتابتها مخزّنة في ذاكرة الحاسوب داخل قائمة (list)؟

```python
coders = []
coders.append(["Eric", "Windows", "Pascal", 10])
coders.append(["Matt", "Linux", "PHP", 2])
coders.append(["Alan", "Linux", "Java", 17])
coders.append(["Emily", "Mac", "Cobol", 9])
```

يمكننا بناء السلسلة النصية التي نريد كتابتها كسلسلة نصية ذات بادئة f، ثم كتابة السطر الجاهز في الملف هكذا:

```python
with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = f"{coder[0]};{coder[1]};{coder[2]};{coder[3]}"
        my_file.write(line+"\n")
```

ولو كانت كل قائمة بيانات مبرمج طويلة جدًّا وتحوي عناصر أكثر بكثير، لكان بناء السلسلة النصية يدويًا أمرًا مُرهقًا. ويمكننا استخدام حلقة `for` لبناء السلسلة النصية بدلًا من ذلك:

```python
with open("coders.csv", "w") as my_file:
    for coder in coders:
        line = ""
        for value in coder:
            line += f"{value};"
        line = line[:-1]
        my_file.write(line+"\n")
```

## مسح محتوى الملفات وحذفها

قد يلزم أحيانًا مسح محتوى ملف موجود. ففتح الملف في وضع الكتابة وإغلاقه فورًا يُحدث هذا بالضبط:

```python
with open("file_to_be_cleared.txt", "w") as my_file:
    pass
```

والآن لا يحتوي كتلة `with` سوى الأمر `pass`، الذي لا يفعل شيئًا في الواقع. ولا تسمح Python بالكتل الفارغة، لذا يكون الأمر هنا ضروريًا.

ومن الممكن أيضًا تجاوز كتلة `with` باستخدام أمر من سطر واحد كما يلي:

```python
open('file_to_be_cleared.txt', 'w').close()
```

> **حذف الملفات**
>
> يمكنك أيضًا حذف ملف بالكامل. وسنحتاج إلى طلب المساعدة من نظام التشغيل لتحقيق ذلك:
>
> ```python
> # the command to delete files is in the os module
> import os
>
> os.remove("unnecessary_file.csv")
> ```
>
> ملاحظة: لن يعمل هذا عند تشغيل الاختبارات الآلية على خوادم الدورة بسبب قيود تقنية في بيئة الاختبار. وإذا طُلب منك مسح محتوى ملف، فاستخدم الطرق الموصوفة أعلاه.



> **تمرين برمجي: تصفية محتويات ملف**
>
> يحتوي الملف `solutions.csv` على بعض حلول مسائل رياضية:

```csv
Arto;2+5;7
Pekka;3-2;1
Erkki;9+3;11
Arto;8-3;4
Pekka;5+5;10
...jne...
```

وكما ترى أعلاه، فالصيغة في كل سطر هي `name_of_student;problem;result`. وكل العمليات إمّا جمع وإمّا طرح، ولكل واحدة وسيطان بالضبط.

يُرجى كتابة دالة اسمها `filter_solutions()` والتي:

* تقرأ محتوى الملف `solutions.csv`
* تكتب السطور التي نتيجتها _صحيحة_ في الملف `correct.csv`
* تكتب السطور التي نتيجتها _خاطئة_ في الملف `incorrect.csv`

وباستخدام المثال أعلاه، يحوي الملف `correct.csv` على السطور التالية

```sh
Arto;2+5;7
Pekka;3-2;1
Pekka;5+5;10
```

أما السطورتان الأخريان فتكونان في الملف `incorrect.csv`.

يُرجى كتابة السطور بنفس الترتيب الذي تظهر به في الملف الأصلي. ولا تغيّر الملف الأصلي.

ملاحظة: ينبغي أن تُعطي الدالة النتيجة ذاتها بالضبط، مهما كان عدد مرات استدعائها. أي أنه لا يهم إن استُدعيت الدالة مرة واحدة

```python
filter_solutions()
```

أو عدة مرات متتالية

```python
filter_solutions()
filter_solutions()
filter_solutions()
filter_solutions()
```

وبعد التنفيذ، ينبغي أن يكون محتوى الملفين `correct.csv` و`incorrect.csv` متطابقًا بالضبط في الحالتين.


> **تمرين برمجي: تخزين البيانات الشخصية**
>
> يُرجى كتابة دالة اسمها `store_personal_data(person: tuple)`، تأخذ صفًّا (tuple) يحوي بعض المعلومات التعريفية كوسيط لها.

ويحوي الصف العناصر التالية:

* الاسم (سلسلة نصية)
* العمر (عدد صحيح)
* الطول (عدد عشري)

تُعالَج هذه البيانات وتُكتب في الملف `people.csv`. وقد يحوي الملف بعض البيانات أصلًا؛ ويذهب السطر الجديد إلى نهاية الملف. وينبغي كتابة البيانات بالصيغة

name;age;height

ويجب أن يكون كل سطر في سطر مستقل. وإذا استدعينا الدالة بالوسيط `("Paul Paulson", 37, 175.5)`، فكتبت الدالة هذا السطر في نهاية الملف:

`Paul Paulson;37;175.5`


## معالجة البيانات بصيغة CSV

لنكتب برنامجًا يقيّم أداء الطلاب في مقرر. يقرأ البرنامج ملف CSV يحوي نقاط التمارين الأسبوعية التي حصل عليها الطلاب. ثم يحسب البرنامج مجموع النقاط ويحدّد الدرجة التي حصل عليها كل طالب. وأخيرًا، ينشئ البرنامج ملف CSV يحوي مجموع النقاط والدرجة لكل طالب.

ويبدو ملف CSV المُعطى مُدخَلًا للبرنامج هكذا:


```
Peter;4;2;3;5;4;0;0
Paula;7;2;8;3;5;4;5
Susan;3;4;3;5;3;4;4
Emily;6;6;5;5;0;4;8
```


ينقسم منطق البرنامج إلى ثلاث دوال: قراءة الملف ومعالجة محتواه إلى صيغة يمكن التعامل معها، وتحديد الدرجة، وكتابة الملف.

ويُقرأ الملف وفق المبادئ المذكورة في القسم السابق. وتُخزَّن البيانات في قاموس (dictionary)، حيث يكون المفتاح اسم الطالب، والقيمة قائمة بالنقاط التي حصل عليها الطالب، بصيغة عدد صحيح:

```python
def read_weekly_points(filename):
    weekly_points = {}
    with open(filename) as my_file:
        for line in my_file:
            parts = line.split(";")
            point_list = []
            for points in parts[1:]:
                point_list.append(int(points))
            weekly_points[parts[0]] = point_list

    return weekly_points
```

والدالة الثانية لتحديد الدرجة بناءً على النقاط المُستلَمة. وتُستخدم هذه الدالة بدورها من قبل الدالة الثالثة، التي تكتب النتائج في الملف.

```python
def grade(points):
    if points < 20:
        return 0
    elif points < 25:
        return 1
    elif points < 30:
        return 2
    elif points < 35:
        return 3
    elif points < 40:
        return 4
    else:
        return 5

def save_results(filename, weekly_points):
    with open(filename, "w") as my_file:
        for name, point_list in weekly_points.items():
            point_sum = sum(point_list)
            my_file.write(f"{name};{point_sum};{grade(point_sum)}\n")
```

يتيح لنا هذا البناء كتابة دالة رئيسية بسيطة للغاية. لاحظ كيف تُعطى أسماء الملفات التي تُقرأ وتُكتب ضمن وسائط الدالة الرئيسية:

```python
weekly_points = read_weekly_points("weekly_points.csv")
save_results("results.csv", weekly_points)
```

وعند تنفيذ الدالة الرئيسية يبدو محتوى الملف `results.csv` الناتج هكذا:


```
Peter;18;0
Paula;34;3
Susan;26;2
Emily;41;5
```


لاحظ أن كل دالة معرّفة أعلاه بسيطة نسبيًّا، ولكل منها مسؤولية واحدة. وهذا منهج شائع ومُوصى به عند برمجة مجموعات أكبر. ويجعل مبدأ المسؤولية الواحدة التحقق من الوظائف أسهل، كما أنه يسهّل إجراء تعديلات على البرنامج لاحقًا وإضافة ميزات جديدة.

فلنقول إن أردنا إضافة دالة لطباعة درجة طالب بعينه. فلدينا بالفعل دالة تحدّد درجة الطالب، لذا يمكننا استخدامها في دالتنا الجديدة:

```python
def get_grade(student_name, weekly_points):
    for name, point_list in weekly_points.items():
        if name == student_name:
            return grade(sum(point_list))


weekly_points = read_weekly_points("weekly_points.csv")
print(get_grade("Paula", weekly_points))

```


```
3
```


وإذا قررنا أن وظيفة معينة في البرنامج بحاجة إلى إصلاح، فإن التغيير في البرنامج المُصمَّم جيدًا لا يمسّ إلا أقسامًا محدَّدة من الشيفرة، وسيكون تحديد مواضع التغيير أسهل. فمثلًا، لو أردنا تغيير حدود الدرجات، لكفانا بتطبيق التغيير في الدالة المخصّصة لتحديد الدرجة، وسينجح ذلك أيضًا في جميع الدوال الأخرى التي تستخدم هذه الدالة. ولو كانت شيفرة هذه الوظيفة الواحدة مُطبَّقة في مواضع متعددة، لكان هناك خطر محدَّد بأن ننسى تغيير جميع مواضعها عند تغيير الوظيفة.

> **تمرين برمجي: تقييم الدورة، الجزء 4**
>
> لنعد إلى مشروع درجة المقرر من القسم السابق.

وكما توقفنا عند ذلك في المرة الماضية، كان البرنامج يقرأ ملفات تحتوي على معلومات الطلاب والتمارين المنجزة ونتائج الاختبارات ويعالجها. وسنضيف ملفًا يحوي معلومات عن المقرر. ومثال على صيغة الملف:


```
<pre>

name: Introduction to Programming
study credits: 5
</pre>
```


ثم ينبغي للبرنامج إنشاء ملفين. ينبغي أن يكون هناك ملف اسمه `results.txt` بالمحتوى التالي:


```
<pre>
Introduction to Programming, 5 credits
======================================
name                          exec_nbr  exec_pts. exm_pts.  tot_pts.  grade
pekka peloton                 21        5         9         14        0
jaana javanainen              27        6         11        17        1
liisa virtanen                35        8         14        22        3
</pre>
```


قسم الإحصاءات مطابق للنتائج المطبوعة في الجزء الثالث من المشروع. والإضافة الوحيدة هنا هي قسم الترويسة.

بالإضافة إلى ذلك، ينبغي أن يكون هناك ملف اسمه `results.csv` بالصيغة التالية:


```
<pre>
12345678;pekka peloton;0
12345687;jaana javanainen;1
12345699;liisa virtanen;3
</pre>
```


وعند تنفيذ البرنامج، ينبغي أن يبدو هكذا:


```
Student information: **students1.csv**
Exercises completed: **exercises1.csv**
Exam points: **exam_points1.csv**
Course information: **course1.txt**
Results written to files results.txt and results.csv
```


أي أن البرنامج لا يسأل إلا عن أسماء ملفات الإدخال. وينبغي كتابة كل المخرجات في الملفات. ولن يرى المستخدم سوى رسالة تؤكّد ذلك.

**ملاحظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.




> **تمرين برمجي: البحث عن الكلمات**
>
> يضمّ قالب التمرين الملف `words.txt`، الذي يحوي كلمات بالإنجليزية.

يُرجى كتابة دالة اسمها `find_words(search_term: str)`. تُعيد الدالة قائمة تحوي جميع كلمات الملف التي تطابق مصطلح البحث.

وقد يحوي مصطلح البحث أحرفًا صغيرة ومحارف البدل التالية:

* يعني المحور `.` أنه يُقبَل أي محرف واحد مكانه. فمثلًا، يُرجع `ca.` كلمات مثل _cat_ و_car_، ويرجع `p.ng` كلمات مثل _ping_ و_pong_، ويرجع `.a.e` كلمات مثل _sane_ و_care_ و_late_.
* تعني النجمة `*` في _نهاية_ مصطلح البحث أنه يُقبَل أي كلمة _تبدأ_ بمصطلح البحث. وتعني النجمة في _بداية_ مصطلح البحث أنه يُقبَل أي كلمة _تنتهي_ بمصطلح البحث. فمثلًا، يُرجع `ca*` كلمات مثل _california_ و_cat_ و_caring_ و_catapult_، بينما يُرجع `*ane` كلمات مثل _crane_ و_insane_ و_aeroplane_. ولا يمكن أن تكون هناك أكثر من نجمة واحدة في مصطلح البحث.
* وإذا لم تكن هناك محارف بدل في مصطلح البحث، تُعاد الكلمات التي تطابق مصطلح البحث تمامًا فقط.

يمكنك أن تفترض أن كلا البدلتين لا تُستخدمان معًا في مصطلح البحث الواحد.

وكلمات الملف مكتوبة بأحرف صغيرة. ويمكنك أيضًا أن تفترض أن وسيط الدالة سيكون بأحرف صغيرة بالكامل.

وإذا لم تُعثر على كلمات مطابقة، ينبغي أن تُعيد الدالة قائمة فارغة.

تلميح: قد يكون تابعا السلسلة النصية في Python وهما `startswith()` و`endswith()` مفيدين هنا. ويمكنك البحث عن مزيد من المعلومات عنهما عبر الإنترنت.

ومثال على عمل الدالة:

```python
print(find_words("*vokes"))
```


```
['convokes', 'equivokes', 'evokes', 'invokes', 'provokes', 'reinvokes', 'revokes']
```


> **تمرين برمجي: قاموس مخزَّن في ملف**
>
> يُرجى كتابة برنامج يعمل كقاموس. يمكن للمستخدم كتابة سطور جديدة أو البحث عن سطور موجودة.

ويجب أن يعمل البرنامج على النحو التالي:


```
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **auto**
The word in English: **car**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **roska**
The word in English: **garbage**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **1**
The word in Finnish: **laukku**
The word in English: **bag**
Dictionary entry added
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **bag**
roska - garbage
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **car**
auto - car
1 - Add word, 2 - Search, 3 - Quit
Function: **2**
Search term: **laukku**
laukku - bag
1 - Add word, 2 - Search, 3 - Quit
Function: **3**
Bye!
```


وتُكتب سطور القاموس في ملف اسمه `dictionary.txt`. وينبغي للبرنامج قراءة محتوى الملف أولًا. وتُكتب السطور الجديدة في نهاية الملف كلما أُضيفت إلى القاموس.

وتبقى صيغة البيانات المخزّنة في القاموس اختيارًا منك.

**ملاحظة:** قد تغيّر الاختبارات الآلية لهذا التمرين محتوى الملف. إذا أردت الاحتفاظ بمحتواه، فانسخ الملف أولًا باسم مختلف.

**ملاحظة 2:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي ألّا تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 69694e01-4c47-5b9d-8a00-b0d96a477dc7)

-->
