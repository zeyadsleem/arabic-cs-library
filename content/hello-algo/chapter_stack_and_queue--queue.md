---
title: "الطابور"
book: hello-algo
chapter: chapter_stack_and_queue
slug: queue
order: 32
lang: ar
---
<u>الطابور (queue)</u> بنية بيانات خطية تتبع قاعدة «أول ما يدخل يخرج أولاً» (FIFO). وكما يوحي الاسم، فهو يحاكي اصطفاف الناس: يلتحق القادمون الجدد باستمرار بمؤخرة الطابور، بينما يغادر من في المقدمة واحداً تلو الآخر.

وكما هو موضح في الشكل أدناه، نسمي مقدمة الطابور «المقدمة» ونهايته «المؤخرة». وتسمى عملية إضافة عنصر إلى المؤخرة «الإدخال إلى الطابور»، بينما تسمى عملية إزالة العنصر الأمامي «الإخراج من الطابور».

![قاعدة أول ما يدخل يخرج أولاً في الطابور](/images/hello-algo/chapter_stack_and_queue--queue_operations.png)

## العمليات الشائعة على الطابور

يوضح الجدول أدناه العمليات الشائعة على الطابور. ولاحظ أن أسماء الدوال قد تختلف باختلاف لغات البرمجة. وسنستخدم هنا التسمية نفسها المتبعة مع المكدسات.

<p align="center"> جدول <id> &nbsp; كفاءة عمليات الطابور </p>

| الطريقة   | الوصف                                | التعقيد الزمني |
| -------- | ------------------------------------------ | --------------- |
| `push()` | إدخال عنصر، أي إضافة عنصر إلى المؤخرة       | $O(1)$          |
| `pop()`  | إخراج العنصر الأمامي من الطابور             | $O(1)$          |
| `peek()` | الوصول إلى العنصر الأمامي                   | $O(1)$          |

يمكننا استخدام فئات الطابور التي توفرها لغة البرمجة مباشرةً:

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="queue.py"
from collections import deque

# Initialize queue
# In Python, we generally use the deque class as a queue
# Although queue.Queue() is a pure queue class, it is not very user-friendly, so it is not recommended
que: deque[int] = deque()

# Enqueue elements
que.append(1)
que.append(3)
que.append(2)
que.append(5)
que.append(4)

# Access front element
front: int = que[0]

# Dequeue element
pop: int = que.popleft()

# Get queue length
size: int = len(que)

# Check if queue is empty
is_empty: bool = len(que) == 0
```

</div>
## تنفيذ الطابور

لتنفيذ طابور، نحتاج إلى بنية بيانات تتيح إضافة العناصر من أحد الطرفين وإزالة العناصر من الطرف الآخر. وتلبي كل من القوائم المترابطة والمصفوفات هذا المطلب.

### التنفيذ بقائمة مترابطة

وكما هو موضح في الشكل أدناه، يمكننا اعتبار «العقدة الرأسية» و«العقدة الذيلية» في القائمة المترابطة مقدمة الطابور ومؤخرته على التوالي، مع قاعدة أنه لا يمكن إضافة العقد إلا في المؤخرة ولا حذفها إلا من المقدمة.

وفيما يلي الكود الخاص بتنفيذ طابور باستخدام قائمة مترابطة:

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```py
class LinkedListQueue:
    """Queue implemented with a linked list"""

    def __init__(self):
        """Constructor"""
        self._front: ListNode | None = None  # Head node front
        self._rear: ListNode | None = None  # Tail node rear
        self._size: int = 0

    def size(self) -> int:
        """Get the queue size"""
        return self._size

    def is_empty(self) -> bool:
        """Check whether the queue is empty"""
        return self._size == 0

    def push(self, num: int):
        """Enqueue"""
        # Add num after the tail node
        node = ListNode(num)
        # If the queue is empty, make both the head and tail point to this node
        if self._front is None:
            self._front = node
            self._rear = node
        # If the queue is not empty, add this node after the tail node
        else:
            self._rear.next = node
            self._rear = node
        self._size += 1

    def pop(self) -> int:
        """Dequeue"""
        num = self.peek()
        # Remove the head node
        self._front = self._front.next
        self._size -= 1
        return num

    def peek(self) -> int:
        """Access the front element"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self._front.val

    def to_list(self) -> list[int]:
        """Convert to a list for printing"""
        queue = []
        temp = self._front
        while temp:
            queue.append(temp.val)
            temp = temp.next
        return queue
```

</div>
### التنفيذ بالمصفوفة

حذف العنصر الأول في مصفوفة له تعقيد زمني $O(n)$، وهو ما يجعل عملية الإخراج من الطابور غير فعّالة. غير أننا يمكننا استخدام الطريقة الذكية التالية لتجنب هذه المشكلة.

يمكننا استخدام متغير `front` للإشارة إلى فهرس العنصر الأمامي، والاحتفاظ بمتغير `size` لتسجيل طول الطابور. ونعرّف `rear = front + size`، وهو ما يحسب الموضع الذي يلي العنصر الأخير في الطابور مباشرةً.

واستناداً إلى هذا التصميم، **يكون النطاق الصالح الذي يحتوي على عناصر المصفوفة هو `[front, rear - 1]`**. وتوضح الصورة أدناه طرق تنفيذ العمليات المختلفة:

- عملية الإدخال إلى الطابور: أسند العنصر المُدخل إلى الفهرس `rear` وزد `size` بمقدار 1.
- عملية الإخراج من الطابور: ما عليك سوى زيادة `front` بمقدار 1 وإنقاص `size` بمقدار 1.

وكما ترى، لا تتطلب كل من عمليتي الإدخال والإخراج سوى عملية واحدة، بتعقيد زمني $O(1)$.

وقد تلاحظ مشكلة: مع استمرارنا في الإدخال والإخراج، يتحرك كل من `front` و`rear` نحو اليمين. **وعندما يصلان إلى نهاية المصفوفة، لا يمكنهما مواصلة التحرك**. ولحل هذه المشكلة، يمكننا اعتبار المصفوفة «مصفوفة دائرية» يتصل رأسها بذيلها.

بالنسبة إلى المصفوفة الدائرية، نحتاج إلى إعادة `front` أو `rear` إلى بداية المصفوفة عند تجاوزهما النهاية. ويمكن تنفيذ هذا النمط الدوري باستخدام «عملية باقي القسمة» (modulo)، كما هو موضح في الكود أدناه:

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```py
class ArrayQueue:
    """Queue implemented with a circular array"""

    def __init__(self, size: int):
        """Constructor"""
        self._nums: list[int] = [0] * size  # Array that stores the queue elements
        self._front: int = 0  # Front pointer, pointing to the first element
        self._size: int = 0  # Queue size

    def capacity(self) -> int:
        """Get the queue capacity"""
        return len(self._nums)

    def size(self) -> int:
        """Get the queue size"""
        return self._size

    def is_empty(self) -> bool:
        """Check whether the queue is empty"""
        return self._size == 0

    def push(self, num: int):
        """Enqueue"""
        if self._size == self.capacity():
            raise IndexError("Queue is full")
        # Calculate the rear pointer, which points one position past the last element
        # Use modulo to wrap rear to the beginning when it passes the end of the array
        rear: int = (self._front + self._size) % self.capacity()
        # Add num to the rear
        self._nums[rear] = num
        self._size += 1

    def pop(self) -> int:
        """Dequeue"""
        num: int = self.peek()
        # Advance the front pointer by one position, wrapping to the beginning if it passes the end
        self._front = (self._front + 1) % self.capacity()
        self._size -= 1
        return num

    def peek(self) -> int:
        """Access the front element"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self._nums[self._front]

    def to_list(self) -> list[int]:
        """Return a list for printing"""
        res = [0] * self.size()
        j: int = self._front
        for i in range(self.size()):
            res[i] = self._nums[(j % self.capacity())]
            j += 1
        return res
```

</div>
لا يزال الطابور المنفّذ أعلاه محدوداً: فطوله غير قابل للتغيير. غير أن هذه المشكلة ليست صعبة الحل، إذ يمكننا استبدال المصفوفة بمصفوفة ديناميكية لإدخال آلية توسّع. ويمكن للقرّاء المهتمين محاولة تنفيذ ذلك بأنفسهم.

وتتفق استنتاجات المقارنة بين التنفيذين مع نظيراتها الخاصة بالمكدسات، ولن نعيدها هنا.

## التطبيقات النموذجية للطابور

- **طلبات تاوباو**. بعد قيام المتسوقين بالطلب، تُضاف الطلبات إلى طابور، ثم يعالج النظام الطلبات الموجودة في الطابور وفق تسلسلها. وخلال «الدبل إيليفن»، تتولد أعداد هائلة من الطلبات في وقت قصير، ويصبح التزامن العالي تحدياً رئيسياً يتعين على المهندسين مواجهته.
- **مهام قائمة الأعمال المتنوعة**. أي سيناريو يحتاج إلى تنفيذ وظيفة «من سبق يُخدم أولاً»، مثل طابور مهام الطابعة أو طابور طلبات المطعم، يمكنه الحفاظ على ترتيب المعالجة بفعالية باستخدام الطوابير.
