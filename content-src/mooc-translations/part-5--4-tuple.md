---
title: "الصف"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستتعرّف على نوع البيانات الصف (tuple)
> - ستكون قادرًا على إنشاء صفوف من أنواع مختلفة من القيم
> - ستعرف الفرق بين الصف والقائمة
> - ستكون قادرًا على ذكر بعض حالات الاستخدام النموذجية للصفوف


الصف (tuple) هو بنية بيانات تشبه القائمة في جوانب كثيرة. وأهمّ الفروق بين الاثنين هي:

* تُحاط الصفوف بأقواس دائرية `()`، بينما تُحاط القوائم بأقواس مربّعة `[]`
* الصفوف _غير قابلة للتغيير_، في حين قد تتغيّر محتويات القائمة

تنشئ الشيفرة التالية صفًّا يحتوي على إحداثيات نقطة:

```python
point = (10, 20)
```

يُنتَ الوصول إلى العناصر المخزّنة في الصف بالفهرس، تمامًا كما العناصر المخزّنة في القائمة:

```python
point = (10, 20)
print("x coordinate:", point[0])
print("y coordinate:", point[1])
```


```
x coordinate: 10
y coordinate: 20
```


لا يمكن تغيير القيم المخزّنة في الصف بعد تعريف الصف. والشيفرة التالية لن _تعمل_:

```python
point = (10, 20)
point[0] = 15
```


```
TypeError: 'tuple' object does not support item assignment
```


> **تمرين برمجي: إنشاء صف**
>
> اكتب دالة اسمها `create_tuple(x: int, y: int, z: int)`، تأخذ ثلاثة أعداد صحيحة كوسائط لها، وتنشئ صفًّا وتُرجعه بناءً على المعايير التالية:

1. العنصر الأول في الصف أصغر الوسائط
2. العنصر الثاني في الصف أكبر الوسائط
3. العنصر الثالث في الصف هو مجموع الوسائط

مثال على استخدامها:

```python

if __name__ == "__main__":
    print(create_tuple(5, 3, -1))

```


```
(-1, 5, 7)
```


> **تمرين برمجي: أكبر الأشخاص سنًّا**
>
> اكتب دالة اسمها `oldest_person(people: list)`، تأخذ قائمة من الصفوف كوسيط لها. وفي كل صف يكون العنصر الأول اسم شخص، ويكون العنصر الثاني سنة ميلاده. وينبغي أن تجد الدالة أقدم شخص في القائمة وتُرجع اسمه.

مثال على الدالة وهي تعمل:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

print(oldest_person(people))
```


```
Mary
```


> **تمرين برمجي: الأشخاص الأكبر سنًّا**
>
> في هذا التمرين نتعامل مع الصفوف تمامًا كتلك الموصوفة في التمرين السابق.

اكتب دالة اسمها `older_people(people: list, year: int)`، تختار كل الأشخاص في القائمة الذين وُلدوا _قبل_ السنة المعطاة كوسيط. وينبغي أن تُرجع الدالة أسماء هؤلاء الأشخاص في قائمة جديدة.

مثال على استخدامها:

```python
p1 = ("Adam", 1977)
p2 = ("Ellen", 1985)
p3 = ("Mary", 1953)
p4 = ("Ernest", 1997)
people = [p1, p2, p3, p4]

older = older_people(people, 1979)
print(older)
```


```
[ 'Adam', 'Mary' ]
```


## ما الغرض من الصف؟

الصفوف مثالية حين تكون هناك مجموعة قيم مترابطة بطريقة ما. فمثلًا، حين نحتاج إلى التعامل مع إحداثيتي x وy لنقطة، يكون الصف خيارًا طبيعيًا، لأن الإحداثيات تتكون دائمًا من قيمتين:

```python
point = (10, 20)
```

تقنيًا، من الممكن بالطبع استخدام قائمة لتخزين هذه القيم أيضًا:

```python
point = [10, 20]
```

القائمة مجموعة عناصر متتالية بترتيب معيّن. كما أن حجم القائمة قد يتغيّر. وحين نخزّن إحداثيات نقطة، فإننا نريد تخزين إحداثيتي x وy تحديدًا، لا قائمة اعتباطية تحتوي على تلك القيم.

ولأن الصفوف غير قابلة للتغيير، بخلاف القوائم، يمكن استخدامها كمفاتيح في قاموس. وتنشئ الشيفرة التالية قاموسًا، تكون مفاتيحه نقاطًا إحداثية:

```python
points = {}
points[(3, 5)] = "monkey"
points[(5, 0)] = "banana"
points[(1, 2)] = "harpsichord"
print(points[(3, 5)])
```


```
monkey
```


لن _تعمل_ محاولة تعريف قاموس مشابه باستخدام القوائم:

```python
points = {}
points[[3, 5]] = "monkey"
points[[5, 0]] = "banana"
points[[1, 2]] = "harpsichord"
print(points[[3, 5]])
```


```
TypeError: unhashable type: 'list'
```


## الصفوف دون أقواس

الأقواس ليست ضرورية تمامًا عند تعريف الصفوف. وإسنادا المتغيّرين التاليان متطابقان في نتيجتيهما:

```python
numbers = (1, 2, 3)
```

```python
numbers = 1, 2, 3
```

وهذا يعني أننا نستطيع أيضًا إعادة عدة قيم بسهولة باستخدام الصفوف. ولنعُد إلى المثال التالي:

```python
def minmax(my_list):
  return min(my_list), max(my_list)

my_list = [33, 5, 21, 7, 88, 312, 5]

min_value, max_value = minmax(my_list)
print(f"The smallest item is {min_value} and the greatest item is {max_value}")
```


```
The smallest item is 5 and the greatest item is 312
```


تُرجع هذه الدالة قيمتين في صف. وتُسنَد القيمة المُرجَعة إلى متغيّرين دفعة واحدة:

```python
min_value, max_value = minmax(my_list)
```

قد تجعل استخدام الأقواس الصياغة أوضح. فعلى الجانب الأيسر من جملة الإسناد لدينا أيضًا صف يحتوي على اسمي متغيّرين. وتُسنَد القيم الموجودة داخل الصف الذي تُرجعه الدالة إلى هذين المتغيّرين.

```python
(min_value, max_value) = minmax(my_list)
```

قد تذكر تابع القاموس `items` في القسم السابق. استخدمناه للوصول إلى جميع المفاتيح والقيم المخزّنة في القاموس:

```python
my_dictionary = {}

my_dictionary["apina"] = "monkey"
my_dictionary["banaani"] = "banana"
my_dictionary["cembalo"] = "harpsichord"

for key, value in my_dictionary.items():
    print("key:", key)
    print("value:", value)
```

الصفوف تعمل هنا أيضًا. فالتابع `my_dictionary.items()` يُرجع كل زوج من مفتاح وقيمة على هيئة صف، حيث يكون العنصر الأول هو المفتاح والعنصر الثاني هو القيمة.

ومن حالات الاستخدام الشائعة الأخرى للصفوف تبديل قيم متغيّرين:

```python
number1, number2 = number2, number1
```

تبدل جملة الإسناد أعلاه القيم المخزّنة في المتغيّرين `number1` و`number2`. والنتيجة مطابقة تمامًا لما تتحقّق منه الشيفرة التالية باستخدام متغيّر مساعد:

```python
helper_var = number1
number1 = number2
number2 = helper_var
```

> **تمرين برمجي: قاعدة بيانات الطلاب**
>
> في هذه السلسلة من التمارين ستُنشئ قاعدة بيانات طلاب بسيطة. وقبل أن تبدأ، يُرجى أن تقرأ التعليمات وتفكّر فيما إذا كانت هناك حاجة إلى أي هياكل بيانات لتنظيم البيانات التي يخزّنها برنامجك.

#### إضافة الطلاب

اكتب أولًا دالة اسمها `add_student`، تضيف طالبًا جديدًا إلى قاعدة البيانات. واكتب أيضًا نسخة أوّلية من الدالة `print_student`، التي تطبع معلومات طالب واحد.

تُستخدم هاتان الدالتان على النحو التالي:

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
print_student(students, "Peter")
print_student(students, "Eliza")
print_student(students, "Jack")
```

ينبغي أن يطبع برنامجك الآن ما يلي


```
Peter:
 no completed courses
Eliza:
 no completed courses
Jack: no such person in the database
```


#### إضافة المواد المنجَزة

اكتب دالة اسمها `add_course`، تضيف مادة منجَزة إلى معلومات طالب معيّن في قاعدة البيانات. وبيانات المادة صف يتكوّن من اسم المادة والدرجة:

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
print_student(students, "Peter")
```

بعد إضافة بعض المواد، تتغيّر المعلومات المطبوعة:


```
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
```


#### إعادة المواد

ينبغي تجاهل المواد التي درجتها 0 عند إضافة بيانات مادة. وإضافةً إلى ذلك، إذا كانت المادة موجودة بالفعل في قاعدة البيانات ضمن معلومات ذلك الطالب المعيّن، فلا ينبغي أبدًا خفض الدرجة المسجّلة في قاعدة البيانات إذا أُعيدت المادة.

```python
students = {}
add_student(students, "Peter")
add_course(students, "Peter", ("Introduction to Programming", 3))
add_course(students, "Peter", ("Advanced Course in Programming", 2))
add_course(students, "Peter", ("Data Structures and Algorithms", 0))
add_course(students, "Peter", ("Introduction to Programming", 2))
print_student(students, "Peter")
```


```
Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
```


#### ملخّص قاعدة البيانات

اكتب دالة اسمها `summary`، تطبع ملخّصًا استنادًا إلى جميع المعلومات المخزّنة في قاعدة البيانات.

```python
students = {}
add_student(students, "Peter")
add_student(students, "Eliza")
add_course(students, "Peter", ("Data Structures and Algorithms", 1))
add_course(students, "Peter", ("Introduction to Programming", 1))
add_course(students, "Peter", ("Advanced Course in Programming", 1))
add_course(students, "Eliza", ("Introduction to Programming", 5))
add_course(students, "Eliza", ("Introduction to Computer Science", 4))
summary(students)
```

ينبغي أن يطبع هذا ما يلي


```
students 2
most courses completed 3 Peter
best average grade 4.5 Eliza
```


> **تمرين برمجي: مربع من الحروف**
>
> هذا التمرين الأخير في هذا الجزء مسألة حلّ تطلبات متطلّبة نسبيًا. ويمكن حلّها بطرق مختلفة كثيرة. ورغم أن هذا القسم الحالي من المادة يتناول الصفوف، فالصفوف ليست بالضرورة أفضل طريقة للانطلاق في حلّها.

اكتب برنامجًا يطبع مربعًا من الحروف على النحو المبيّن في الأمثلة أدناه. ويمكنك أن تفترض أن عدد الطبقات لن يتجاوز 26.


```
CCCCC
CBBBC
CBABC
CBBBC
CCCCC
```



```
DDDDDDD
DCCCCCD
DCBBBCD
DCBABCD
DCBBBCD
DCCCCCD
DDDDDDD
```


**ملحوظة:** لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي __ألّا__ تضع أي شيفرة داخل كتلة `if __name__ == "__main__"`.


<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 69694e01-4c47-5b9d-8a00-b0d96a477dc7)

-->


يُرجى الرد على استبيان سريع حول مادة هذا الأسبوع.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 751a95a2-e308-58a0-8283-74fbef6259ed)