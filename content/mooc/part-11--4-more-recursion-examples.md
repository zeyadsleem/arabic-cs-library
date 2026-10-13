---
title: "المزيد من أمثلة التكرار (recursion)"
lang: ar
source: "https://programming-26.mooc.fi/part-11/4-more-recursion-examples"
---

<text-box variant='learningObjectives' name="Learning objectives">

بعد هذا القسم

- ستتعرف على الأشجار الثنائية (binary trees) وبعض الخوارزميات التكرارية المستخدمة لمعالجتها

</text-box>

تصبح المزايا الحقيقية للتكرار (recursion) واضحة عندما نصادف مشاكل يكون فيها كتابة الحلول التكرارية (iterative) صعبة. دعونا نلقي نظرة على _الأشجار الثنائية (binary trees)_، على سبيل المثال. الشجرة الثنائية هي هيكل متفرع يحتوي على عقد (nodes)، وفي كل عقدة يتفرع الهيكل، كحد أقصى، إلى فرعين فرعيين مع عقد خاصة بهما. يمكن أن تبدو الشجرة الثنائية كالتالي (غالباً ما يُعتبر علم الحاسوب فرعاً من العلوم الطبيعية، لكن فهمنا للأشجار مقلوب قليلاً، كما ستلاحظون):

<img src="11_4_1_2.png">

يجب أن يكون التعامل مع الأشجار الثنائية نظرياً على الأقل سهلاً باستخدام التكرار: إذا أردنا تنفيذ عملية ما على كل عقدة في الشجرة، فإن خوارزميتنا تحتاج ببساطة إلى

1. معالجة العقدة الحالية
2. استدعاء نفسها على العقدة الفرعية على اليسار 
3. استدعاء نفسها على العقدة الفرعية على اليمين

<img src="11_4_2_2e.png">

كما ترى من الصورة أعلاه، كلا "الشجرتين الفرعيتين (subtrees)" اليسرى واليمنى هما أشجار ثنائية مكتملة بحد ذاتهما، والعقدة الوحيدة المتبقية خارج الاستدعاءات التكرارية هي العقدة الأب (parent node)، التي تتم معالجتها في الخطوة 1، قبل استدعاء الدالة بشكل تكراري. لذا، يمكننا التأكد من أنه عند انتهاء تنفيذ الدالة، تكون كل عقدة قد تمت زيارتها مرة واحدة بالضبط. 

ستكون النسخة التكرارية (iterative) لعبور (traversal) الشجرة الثنائية أكثر تعقيداً بكثير، حيث سنضطر بطريقة ما لتتبع جميع العقد التي زرناها بالفعل. تنطبق نفس المبادئ على جميع هياكل الأشجار الحاسوبية، وليس فقط الثنائية منها.

يمكن نمذجة الشجرة الثنائية بسهولة في كود Python أيضاً. نحتاج فقط إلى كتابة تعريف فئة (class) لعقدة واحدة. لديها سمة قيمة (value) وسمات للعقدتين الفرعيتين اليسرى واليمنى:

```python

class Node:
    """ The class represents a single node in a binary tree """
    def __init__(self, value, left_child:'Node' = None, right_child:'Node' = None):
        self.value = value
        self.left_child = left_child
        self.right_child = right_child
```

الآن لنفترض أننا نريد نمذجة الشجرة التالية:

<img src="11_4_3.png">

يمكننا تحقيق ذلك بالكود التالي:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)
```

## خوارزميات الشجرة الثنائية التكرارية

أولاً، لنلقِ نظرة على خوارزمية تطبع جميع العقد في شجرة ثنائية واحدة تلو الأخرى. في الأمثلة التالية سنعمل مع الشجرة الثنائية المعرفة أعلاه.

الحجة الممررة لدالة الطباعة هي العقدة الجذر (root node) للشجرة الثنائية. هذه هي العقدة في الأعلى في رسمنا التوضيحي أعلاه. جميع العقد الأخرى هي _أبناء (children)_ لهذه العقدة:

```python

def print_nodes(root: Node):
    print(root.value)

    if root.left_child is not None:
        print_nodes(root.left_child)

    if root.right_child is not None:
        print_nodes(root.right_child)

```

الدالة تطبع قيمة العقدة الممررة كحجة، ثم تستدعي نفسها على العقدتين الفرعيتين اليسرى واليمنى، بافتراض أن العقدتين معرفتان. هذه خوارزمية بسيطة جداً، لكنها تعبر (traverse) جميع العقد في الشجرة بكفاءة وموثوقية، بغض النظر عن حجم الشجرة. والأهم، لا تتم زيارة أي عقدة مرتين. تُطبع كل قيمة مرة واحدة فقط.

إذا مررنا العقدة الجذر `tree` للشجرة الثنائية الموضحة أعلاه كحجة للدالة، فإنها تطبع


```
2
3
5
8
4
11
```


كما ترى من ترتيب العقد في الطباعة، تتحرك الخوارزمية أولاً نحو الأسفل على "الساق اليسرى" للشجرة حتى القاع، ومن هناك تعبر العقد الأخرى بالترتيب.

بنفس الطريقة، يمكننا كتابة خوارزمية لحساب مجموع جميع القيم المخزنة في عقد الشجرة:

```python
def sum_of_nodes(root: Node):
    node_sum = root.value

    if root.left_child is not None:
        node_sum += sum_of_nodes(root.left_child)

    if root.right_child is not None:
        node_sum += sum_of_nodes(root.right_child)

    return node_sum
```

يتم تهيئة المتغير `node_sum` لي igual قيمة العقدة الحالية. ثم تزداد القيمة في المتغير بواسطة الاستدعاءات التكرارية لمجموعات العقد للشجرتين الفرعيتين اليسرى واليمنى (بعد التأكد من وجودهما، بالطبع). ثم تُعاد هذه النتيجة

> **تمرين تفاعلي: تمرين تفاعلي**
>
> يرجى كتابة دالة باسم `greatest_node(root: Node)` والتي تأخذ عقدة الجذر لشجرة ثنائية كحجة لها.

يجب أن ترجع الدالة قيمة العقدة ذات القيمة الأكبر داخل الشجرة. يجب عبور الشجرة بشكل تكراري.

تلميح: الدالة `sum_of_nodes` في المثال أعلاه قد تكون مفيدة.

مثال على كيفية عمل الدالة:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)

    print(greatest_node(tree))
```


```
11
```


## شجرة ثنائية مرتبة

تكون الشجرة الثنائية مفيدة بشكل خاص عندما تكون العقد مرتبة بطريقة معينة. هذا يجعل العثور على العقد في الشجرة سريعاً وفعالاً.

دعونا نلقي نظرة على شجرة مرتبة كالتالي: العقدة الفرعية اليسرى لكل عقدة أصغر من العقدة نفسها، والعقدة الفرعية اليمنى أكبر بشكل مقابل.

<img src="11_4_1_2.png">

الآن يمكننا كتابة خوارزمية تكرارية للبحث عن العقد. الفكرة مشابهة جداً للبحث الثنائي (binary search) من القسم السابق: إذا كانت العقدة الحالية هي العقدة التي نبحث عنها، أرجع `True`. وإلا، تابع بشكل تكراري مع إما الشجرة الفرعية اليسرى أو اليمنى. إذا لم تكن العقدة معرفة، أرجع `False`.

```python
def find_node(root: Node, value):
    if root is None:
        return False

    if value == root.value:
        return True

    if value > root.value:
        return find_node(root.right_child, value)

    return find_node(root.left_child, value)
```

> **تمرين تفاعلي: تمرين تفاعلي**
>
> فئة `Employee` تمثّل موظفاً في شركة:

```python
class Employee:
    def __init__(self, name: str):
        self.name = name
        self.subordinates = []

    def add_subordinate(self, employee: 'Employee'):
        self.subordinates.append(employee)
```

يرجى كتابة دالة باسم `count_subordinates(employee: Employee)` التي تحسب بشكل تكراري عدد المرؤوسين (subordinates) لكل موظف.

مثال على الدالة في العمل:

```python
if __name__ == "__main__":
    t1 = Employee("Sally")
    t2 = Employee("Eric")
    t3 = Employee("Matthew")
    t4 = Employee("Emily")
    t5 = Employee("Adele")
    t6 = Employee("Claire")
    t1.add_subordinate(t4)
    t1.add_subordinate(t6)
    t4.add_subordinate(t2)
    t4.add_subordinate(t3)
    t4.add_subordinate(t5)
    print(count_subordinates(t1))
    print(count_subordinates(t4))
    print(count_subordinates(t5))
```


```
5
3
0
```


## العودة إلى ما قبل التكرار

لنختم هذا الجزء من المادة بتمرين أكبر قليلاً يركز على مبادئ البرمجة كائنية التوجه (object oriented programming). لا نوصي باستخدام التكرار في سلسلة المهام هذه، لكن تقنيات قائمة الفهم (list comprehension) ستكون مفيدة.

> **تمرين تفاعلي: تمرين تفاعلي**
>
> في هذا التمرين ستكتب فئتين مختلفتين، ستشكلان بدورهما العمود الفقري لتمرين البرمجة الذي يلي هذا، حيث ستكتب تطبيقاً تفاعلياً.

## مهمة

يرجى كتابة فئة باسم `Task` تمثل مهمة واحدة في قائمة مهام شركة برمجيات. المهام لديها
- وصف
- تقدير للساعات المطلوبة لإكمال المهمة
- اسم المبرمج المكلف بالمهمة
- حقل لتتبع ما إذا كانت المهمة منتهية
- معرف فريد

تستخدم الفئة كما يلي:

```python
t1 = Task("program hello world", "Eric", 3)
print(t1.id, t1.description, t1.programmer, t1.workload)
print(t1)
print(t1.is_finished())
t1.mark_finished()
print(t1)
print(t1.is_finished())
t2 = Task("program webstore", "Adele", 10)
t3 = Task("program mobile app for workload accounting", "Eric", 25)
print(t2)
print(t3)
```


```
1 program hello world Eric 3
1: program hello world (3 hours), programmer Eric NOT FINISHED
False
1: program hello world (3 hours), programmer Eric FINISHED
True
2: program webstore (10 hours), programmer Adele NOT FINISHED
3: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
```


بعض التوضيحات:
- يمكن التحقق من حالة المهمة (منتهية أو غير منتهية) باستخدام الدالة `is_finished(self)` التي تُرجع قيمة بولية (Boolean)
- المهمة غير منتهية عند إنشائها
- تُعلَّم المهمة كمنتهية باستدعاء الطريقة `mark_finished(self)`
- معرف المهمة هو رقم متسلسل يبدأ من 1. معرف المهمة الأولى هو 1، والثانية 2، وهكذا.

**تلميح**: يمكن تنفيذ `id` كـ [متغير فئة (class variable)](/part-9/5-class-attributes#class-variables).

## OrderBook (دفتر الطلبات)

يرجى كتابة فئة باسم `OrderBook` تجمع جميع المهام المطلوبة من شركة البرمجيات. يجب نمذجة المهام باستخدام فئة `Task` التي كتبتها للتو.

يستخدم الإصدار الأساسي من OrderBook كما يلي:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

for order in orders.all_orders():
    print(order)

print()

for programmer in orders.programmers():
    print(programmer)
```


```
1: program webstore (10 hours), programmer Adele NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric NOT FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED

Adele
Eric
```


في هذه المرحلة يجب أن يوفر `OrderBook` ثلاث طرق:
- `add_order(self, description, programmer, workload)` تضيف طلباً جديداً إلى OrderBook. يخزن OrderBook الطلبات داخلياً ككائنات `Task`. ملاحظة: يجب أن تأخذ الطريقة الحجج المذكورة بالضبط، وإلا لن تعمل الاختبارات الآلية بشكل صحيح.
- `all_orders(self)` ترجع قائمة بجميع المهام المخزنة في OrderBook
- `programmers(self)` ترجع قائمة بأسماء جميع المبرمجين الذين لديهم مهام مخزنة في OrderBook. يجب أن تحتوي القائمة على كل مبرمج مرة واحدة فقط

**تلميح:** طريقة سهلة لإزالة التكرارات هي التعامل مع القائمة في البداية كـ [مجموعة (set)](https://docs.python.org/3.8/library/stdtypes.html#set). المجموعة هي مجموعة من العناصر حيث يظهر كل عنصر فريد مرة واحدة فقط. يمكن بعد ذلك تحويل `set` مرة أخرى إلى قائمة، وعندها نكون متأكدين من أن كل عنصر فريد الآن:

```python
my_list = [1,1,3,6,4,1,3]
my_list2 = list(set(my_list))
print(my_list)
print(my_list2)
```


```
[1, 1, 3, 6, 4, 1, 3]
[1, 3, 4, 6]
```


## المزيد من الميزات لـ OrderBook

يرجى كتابة ثلاث طرق إضافية في فئة `OrderBook` الخاصة بك.

الطريقة `mark_finished(self, id: int)` تأخذ معرف المهمة كحجة لها وتحدد المهمة ذات الصلة كمنتهية:

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Eric", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)

orders.mark_finished(1)
orders.mark_finished(2)

for order in orders.all_orders():
    print(order)
```


```
1: program webstore (10 hours), programmer Adele FINISHED
2: program mobile app for workload accounting (25 hours), programmer Eric FINISHED
3: program app for practising mathematics (100 hours), programmer Adele NOT FINISHED
```


إذا لم تكن هناك مهمة بالمعرف المعطى، يجب أن تثير الطريقة استثناء `ValueError`. إذا احتجت لمراجعة حول إثارة الاستثناءات، يرجى الاطلاع على [الجزء 6](/part-6/3-errors#raising-exceptions).

الطريقتان `finished_orders(self)` و `unfinished_orders(self)` تعملان كما هو متوقع: كلاهما يرجع قائمة تحتوي على المهام ذات الصلة من OrderBook.

## اللمسات الأخيرة لـ OrderBook

يرجى كتابة طريقة أخيرة في فئة `OrderBook` الخاصة بك: `status_of_programmer(self, programmer: str)` التي ترجع _زوجاً مرتباً (tuple)_. يجب أن يحتوي الزوج على عدد المهام المنتهية وغير المنتهية التي لدى المبرمج، إلى جانب الساعات المقدرة في كلتا الفئتين.

```python
orders = OrderBook()
orders.add_order("program webstore", "Adele", 10)
orders.add_order("program mobile app for workload accounting", "Adele", 25)
orders.add_order("program app for practising mathematics", "Adele", 100)
orders.add_order("program the next facebook", "Eric", 1000)

orders.mark_finished(1)
orders.mark_finished(2)

status = orders.status_of_programmer("Adele")
print(status)
```


```
(2, 1, 35, 100)
```


العنصر الأول في الزوج هو عدد المهام _المنتهية_، بينما العنصر الثاني هو عدد المهام _غير المنتهية_. العنصران الثالث والرابع هما مجمل تقديرات عبء العمل (workload) للمهام المنتهية وغير المنتهية، على التوالي.

إذا لم يكن هناك مبرمج بالاسم المعطى، يجب أن تثير الطريقة استثناء `ValueError`.


> **تمرين تفاعلي: تمرين تفاعلي**
>
> في هذا التمرين ستنشئ تطبيقاً تفاعلياً لإدارة المهام المطلوبة من شركة برمجيات. التنفيذ متروك لك تماماً، لكن يمكنك استخدام اللبنات الأساسية من التمرين السابق في تطبيقك. يمكن أن تكون الأمثلة في [القسم الأخير من الجزء 10](/part-10/4-application-development) مفيدة أيضاً.

## بدون معالجة الأخطاء

يجب أن يعمل التطبيق _تماماً_ كما يلي:


```
commands:
0 exit
1 add order
2 list finished tasks
3 list unfinished tasks
4 mark task as finished
5 programmers
6 status of programmer

command: **1**
description: **program the next facebook**
programmer and workload estimate: **jonah 1000**
added!

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric 25**
added!

command: **1**
description: **program an app for music theory revision**
programmer and workload estimate: **nina 12**
added!

command: **1**
description: **program the next twitter**
programmer and workload estimate: **jonah 55**
added!

command: **2**
no finished tasks

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
2: program mobile app for workload accounting (25 hours), programmer eric NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED
4: program the next twitter (55 hours), programmer jonah NOT FINISHED

command: **4**
id: **2**
marked as finished

command: **4**
id: **4**
marked as finished

command: **2**
2: program mobile app for workload accounting (25 hours), programmer eric FINISHED
4: program the next twitter (55 hours), programmer jonah FINISHED

command: **3**
1: program the next facebook (1000 hours), programmer jonah NOT FINISHED
3: program an app for music theory revision (12 hours), programmer nina NOT FINISHED

command: **5**
jonah
eric
nina

command: **6**
programmer: **jonah**
tasks: finished 1 not finished 1, hours: done 55 scheduled 1000
```


تمنح نقطة التمرين الأولى لتطبيق يعمل عندما تكون جميع مدخلات المستخدم خالية من العيوب.

## التعامل مع أخطاء مدخلات المستخدم

لكسب نقطة التمرين الثانية لهذا التمرين، من المتوقع أن يتعافى تطبيقك من مدخلات المستخدم الخاطئة. أي مدخل لا يتبع التنسيق المحدد يجب أن ينتج رسالة خطأ _erroneous input_، وينتج عنه تكرار آخر للحلقة تطلب أمراً جديداً:


```
command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric xxx**
erroneous input

command: **1**
description: **program mobile app for workload accounting**
programmer and workload estimate: **eric**
erroneous input

command: **4**
id: **1000000**
erroneous input

command: **4**
id: **XXXX**
erroneous input

command: **6**
programmer: **unknownprogrammer**
erroneous input
```


يرجى الرد على استبيان سريع حول هذا الجزء من الدورة.

> **استطلاع:** (يمكن تعبئة الاستطلاع بشكل مجهول تماماً في النهاية - ID: 6f999303-e9b3-5aa1-b91f-72283853834b)
