---
title: "المزيد من أمثلة التعاود"
lang: ar
source: "https://programming-26.mooc.fi/part-11/4-more-recursion-examples"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستألف الأشجار الثنائية وبعض الخوارزميات التعاودية المستخدمة في معالجتها


تتّضح المزايا الحقيقية للتعاود حين نصادف مسائل يصعب فيها كتابة حلول تكرارية. فلننظر إلى _الأشجار الثنائية_ (binary trees) على سبيل المثال. فالشجرة الثنائية بنية متفرّعة تكون فيها عقد، وعند كل عقدة تتفرّع البنية إلى فرعين ابنين على الأكثر لهما عقد خاصة بهما. ويمكن أن تبدو الشجرة الثنائية هكذا (غالبًا ما يُعدّ علم الحاسوب فرعًا من العلوم الطبيعية، لكن فهمنا للأشجار مقلوب قليلًا، كما ستلاحظ):

![11_4_1_2.png](/images/mooc/part-11/11_4_1_2.png)

ينبغي أن تكون معالجة الأشجار الثنائية سهلة تعاوديًا نظريًا على الأقل: فإذا أردنا تنفيذ عملية ما على كل عقدة في الشجرة، فكل ما تحتاج إليه خوارزميتنا هو أن

1. تعالج العقدة الحالية
2. تستدعي نفسها على العقدة الابنة على اليسار
3. تستدعي نفسها على العقدة الابنة على اليمين

![11_4_2_2e.png](/images/mooc/part-11/11_4_2_2e.png)

وكما ترى من الصورة أعلاه، فإن «الشجرتين الفرعيتين» اليسرى واليمنى هما بنفسهما شجرتان ثنائيتان كاملتان، والعقدة الوحيدة الباقية خارج الاستدعاءات التعاودية هي العقدة الأب، التي تُعالَج في الخطوة 1، قبل استدعاء الدالة استدعاءً تعاوديًا. لذا يمكننا أن نطمئن إلى أنه عند انتهاء تنفيذ الدالة تكون كل عقدة قد زُيرت مرة واحدة بالضبط.

وستكون النسخة التكرارية لاجتياز شجرة ثنائية أعقد بكثير، إذ سيتعيّن علينا أن نتتبّع بطريقة ما كل العقد التي زرناها من قبل. وتنطبق المبادئ نفسها على كل بنى الأشجار الحسابية، لا على الثنائية وحدها.

ويمكن تمثيل الشجرة الثنائية بسهولة في شيفرة Python أيضًا. فكل ما نحتاج إليه هو كتابة تعريف صنف لعقدة واحدة. ولهذه العقدة خاصية قيمة، وخاصيتان للعقدتين الابنتين اليسرى واليمنى:

```python

class Node:
    """ The class represents a single node in a binary tree """
    def __init__(self, value, left_child:'Node' = None, right_child:'Node' = None):
        self.value = value
        self.left_child = left_child
        self.right_child = right_child
```

والآن لنفترض أننا نريد تمثيل الشجرة التالية:

![11_4_3.png](/images/mooc/part-11/11_4_3.png)

ويمكننا تحقيق ذلك بالشيفرة التالية:

```python
if __name__ == "__main__":
    tree = Node(2)

    tree.left_child = Node(3)
    tree.left_child.left_child = Node(5)
    tree.left_child.right_child = Node(8)

    tree.right_child = Node(4)
    tree.right_child.right_child = Node(11)
```

## خوارزميات تعاودية للأشجار الثنائية

أولًا، لننظر إلى خوارزمية تطبع كل العقد في شجرة ثنائية واحدة تلو الأخرى. وسنعمل في الأمثلة التالية على الشجرة الثنائية المعرّفة أعلاه.

الوسيط الممرَّر إلى دالة الطباعة هو العقدة الجذر للشجرة الثنائية. وهذه هي العقدة في القمة تمامًا في الشكل التوضيحي أعلاه. وكل العقد الأخرى _أبناء_ لهذه العقدة:

```python

def print_nodes(root: Node):
    print(root.value)

    if root.left_child is not None:
        print_nodes(root.left_child)

    if root.right_child is not None:
        print_nodes(root.right_child)

```

تطبع الدالة قيمة العقدة الممرَّرة وسيطًا، ثم تستدعي نفسها على العقدتين الابنتين اليسرى واليمنى، بشرط أن تكون العقدتان معرّفتين. وهذه خوارزمية بسيطة جدًا، لكنها تجتاز كل عقد الشجرة بكفاءة وموثوقية، أيًا كان حجم الشجرة. والأهم أنها لا تزور أي عقدة مرتين. فكل قيمة تُطبع مرة واحدة فقط.

وإذا مرّرنا العقدة الجذر `tree` للشجرة الثنائية الموضّحة أعلاه وسيطًا إلى الدالة، فإنها تطبع


```
2
3
5
8
4
11
```


وكما ترى من ترتيب العقد في المخرجات، تنزل الخوارزمية أولًا عبر «الساق اليسرى» للشجرة حتى القاع تمامًا، ثم تجتاز العقد الأخرى بالترتيب من هناك.

وبالمثل، يمكننا كتابة خوارزمية لحساب مجموع كل القيم المخزّنة في عقد الشجرة:

```python
def sum_of_nodes(root: Node):
    node_sum = root.value

    if root.left_child is not None:
        node_sum += sum_of_nodes(root.left_child)

    if root.right_child is not None:
        node_sum += sum_of_nodes(root.right_child)

    return node_sum
```

يُهيّأ المتغيّر `node_sum` ليكون مساويًا لقيمة العقدة الحالية. ثم تُزاد القيمة في المتغيّر عبر استدعاءات تعاودية لمجاميع عقد الشجرتين الابنتين اليسرى واليمنى (مع التأكد أولًا من وجودهما بالطبع). ثم تُرجع هذه النتيجة

> **تمرين برمجي: أكبر عقدة**
>
> يُرجى كتابة دالة باسم `greatest_node(root: Node)` تأخذ العقدة الجذر لشجرة ثنائية بوصفها وسيطًا لها.

ينبغي أن تُرجع الدالة قيمة العقدة ذات القيمة الأكبر داخل الشجرة. وينبغي أن تُجتاز الشجرة تعاوديًا.

تلميح: قد تفيدك الدالة `sum_of_nodes` في المثال أعلاه.

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


## شجرة ثنائية مرتّبة

تكون الشجرة الثنائية مفيدة بوجه خاص حين تُرتَّب العقد بطريقة معيّنة. فذلك يجعل العثور على العقد في الشجرة سريعًا وفعّالًا.

لننظر إلى شجرة مرتّبة على النحو التالي: العقدة الابنة اليسرى لكل عقدة أصغر من العقدة نفسها، والعقدة الابنة اليمنى أكبر منها على النحو المقابل.

![11_4_1_2.png](/images/mooc/part-11/11_4_1_2.png)

والآن يمكننا كتابة خوارزمية تعاودية للبحث عن العقد. والفكرة شبيهة جدًا بالبحث الثنائي من القسم السابق: فإذا كانت العقدة الحالية هي العقدة التي نبحث عنها، نُرجع `True`. وإلا نواصل تعاوديًا مع الشجرة الابنة اليسرى أو اليمنى. وإذا لم تكن العقدة معرّفة، نُرجع `False`.

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

> **تمرين برمجي: الرؤساء والمرؤوسون**
>
> يمثّل الصنف `Employee` موظفًا في شركة:

```python
class Employee:
    def __init__(self, name: str):
        self.name = name
        self.subordinates = []

    def add_subordinate(self, employee: 'Employee'):
        self.subordinates.append(employee)
```

يُرجى كتابة دالة باسم `count_subordinates(employee: Employee)` تحصي تعاوديًا عدد المرؤوسين لكل موظف.

مثال على الدالة أثناء العمل:

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


## عودة إلى ما قبل التعاود

لنُنهِ هذا الجزء من المادة بتمرين أكبر قليلًا يركّز على مبادئ البرمجة كائنية التوجّه. ولا ننصح باستخدام التعاود في هذه السلسلة من المهام، لكن تقنيات إدراك القوائم (list comprehension) ستكون مفيدة.

> **تمرين برمجي: OrderBook**
>
> ستكتب في هذا التمرين صنفين مختلفين، سيشكّلان بدورهما العمود الفقري للتمرين البرمجي الذي يلي هذا التمرين، حيث ستكتب تطبيقًا تفاعليًا.

## المهمة

يُرجى كتابة صنف باسم `Task` يمثّل مهمة واحدة في قائمة مهام شركة برمجيات. وللمهام
- وصف
- تقدير لعدد الساعات اللازمة لإنجاز المهمة
- اسم المبرمج المُسنَد إليه المهمة
- حقل لتتبّع ما إذا كانت المهمة منتهية
- معرّف فريد

ويُستخدم الصنف على النحو التالي:

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
- يمكن التحقق من حالة المهمة (منتهية أو غير منتهية بعد) بالدالة `is_finished(self)` التي تُرجع قيمة منطقية
- لا تكون المهمة منتهية عند إنشائها
- تُعلَّم المهمة بأنها منتهية باستدعاء التابع `mark_finished(self)`
- معرّف المهمة عدد متسلسل يبدأ من 1. فمعرّف المهمة الأولى 1، ومعرّف الثانية 2، وهكذا دواليك.

**تلميح**: يمكن تنفيذ `id` بوصفه [متغيّر صنف](/book/mooc/part-9/5-class-attributes#class-variables).

## OrderBook

يُرجى كتابة صنف باسم `OrderBook` يجمع كل المهام المطلوبة من شركة البرمجيات. وينبغي تمثيل المهام بالصنف `Task` الذي كتبته للتو.

تُستخدم النسخة الأساسية من OrderBook على النحو التالي:

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


في هذه المرحلة ينبغي أن يوفّر صنفك `OrderBook` ثلاثة توابع:
- `add_order(self, description, programmer, workload)` الذي يضيف طلبًا جديدًا إلى OrderBook. ويخزّن OrderBook الطلبات داخليًا في صورة كائنات `Task`. ملاحظة: ينبغي أن يأخذ التابع الوسائط المذكورة بالضبط، وإلا فلن تعمل الاختبارات الآلية بشكل صحيح.
- `all_orders(self)` يُرجع قائمة بكل المهام المخزّنة في OrderBook
- `programmers(self)` يُرجع قائمة بأسماء كل المبرمجين الذين لهم مهام مخزّنة في OrderBook. وينبغي أن تحتوي القائمة على كل مبرمج مرة واحدة فقط

**تلميح:** طريقة سهلة لإزالة التكرارات هي التعامل مع القائمة ابتداءً بوصفها [مجموعة](https://docs.python.org/3.8/library/stdtypes.html#set). والمجموعة تجميعة من العناصر يظهر فيها كل عنصر فريد مرة واحدة فقط. ويمكن بعد ذلك تحويل `set` مرة أخرى إلى قائمة، وحينها يمكننا أن نطمئن إلى أن كل عنصر صار فريدًا:

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

يُرجى كتابة ثلاثة توابع إضافية في صنفك `OrderBook`.

يأخذ التابع `mark_finished(self, id: int)` معرّف المهمة بوصفه وسيطًا له ويعلّم المهمة المعنية بأنها منتهية:

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


وإذا لم توجد مهمة بالمعرّف المحدّد، ينبغي أن يرفع التابع استثناء `ValueError`. وإذا كنت بحاجة إلى مراجعة رفع الاستثناءات، فيُرجى الاطلاع على [الجزء 6](/book/mooc/part-6/3-errors#raising-exceptions).

ويعمل التابعان `finished_orders(self)` و`unfinished_orders(self)` كما هو متوقّع: فكلاهما يُرجع قائمة تحتوي على المهام المعنية من OrderBook.

## اللمسات الأخيرة على OrderBook

يُرجى كتابة تابع أخير في صنفك `OrderBook`: وهو `status_of_programmer(self, programmer: str)` الذي يُرجع _صفًا_ (tuple). وينبغي أن يحتوي الصف على عدد المهام المنتهية وغير المنتهية المُسنَدة إلى المبرمج، إلى جانب الساعات المقدّرة في الفئتين معًا.

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


العنصر الأول في الصف هو عدد المهام _المنتهية_، أما العنصر الثاني فهو عدد المهام _غير المنتهية_. والعنصران الثالث والرابع هما مجموعا تقديرات عبء العمل للمهام المنتهية وغير المنتهية على الترتيب.

وإذا لم يوجد مبرمج بالاسم المحدّد، ينبغي أن يرفع التابع استثناء `ValueError`.


> **تمرين برمجي: تطبيق دفتر الطلبات**
>
> ستنشئ في هذا التمرين تطبيقًا تفاعليًا لإدارة المهام المطلوبة من شركة برمجيات. والتنفيذ متروك لك بالكامل، لكن يمكنك استخدام اللبنات الأساسية من التمرين السابق في تطبيقك. وقد تفيدك أيضًا الأمثلة في [القسم الأخير من الجزء 10](/book/mooc/part-10/4-application-development).

## دون معالجة الأخطاء

ينبغي أن يعمل التطبيق _تمامًا_ على النحو التالي:


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


تُمنح نقطة التمرين الأولى عن تطبيق يعمل عندما تكون كل مدخلات المستخدم سليمة تمامًا.

## معالجة الأخطاء في مدخلات المستخدم

وللحصول على نقطة التمرين الثانية في هذا التمرين، يُتوقّع أن يتعافى تطبيقك من مدخلات المستخدم الخاطئة. وأي مدخل لا يتبع التنسيق المحدّد ينبغي أن يُنتج رسالة خطأ هي _erroneous input_، وأن يؤدي إلى تكرار آخر للحلقة التي تطلب أمرًا جديدًا:


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


يُرجى الإجابة على استبيان سريع حول هذا الجزء من الدورة.

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 6f999303-e9b3-5aa1-b91f-72283853834b)
