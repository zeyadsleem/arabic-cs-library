---
title: "الطابور المزدوج"
book: hello-algo
chapter: chapter_stack_and_queue
slug: deque
order: 33
lang: ar
---
في الطابور، لا يمكننا سوى إزالة العناصر من المقدمة أو إضافة العناصر في المؤخرة. وكما هو موضح في الشكل أدناه، يوفّر <u>الطابور المزدوج (deque)</u> مرونة أكبر، إذ يتيح إضافة العناصر وإزالتها من المقدمة والمؤخرة معاً.

![عمليات الطابور المزدوج](/images/hello-algo/chapter_stack_and_queue--deque_operations.png)

## العمليات الشائعة على الطابور المزدوج

يوضح الجدول أدناه العمليات الشائعة على الطابور المزدوج. وتتحدد أسماء الدوال المحددة بلغة البرمجة المستخدمة.

<p align="center"> جدول <id> &nbsp; كفاءة عمليات الطابور المزدوج </p>

| الدالة         | الوصف               | التعقيد الزمني |
| -------------- | ------------------------- | --------------- |
| `push_first()` | إضافة عنصر إلى المقدمة      | $O(1)$          |
| `push_last()`  | إضافة عنصر إلى المؤخرة       | $O(1)$          |
| `pop_first()`  | إزالة العنصر الأمامي      | $O(1)$          |
| `pop_last()`   | إزالة العنصر الخلفي       | $O(1)$          |
| `peek_first()` | الوصول إلى العنصر الأمامي      | $O(1)$          |
| `peek_last()`  | الوصول إلى العنصر الخلفي       | $O(1)$          |

وبالمثل، يمكننا استخدام فئات الطابور المزدوج التي توفّرها لغة البرمجة مباشرةً:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="deque_test.go"
/* تهيئة الطابور المزدوج */
// في Go، استخدم list كطابور مزدوج
deque := list.New()

/* إدخال العناصر إلى الطابور */
deque.PushBack(2)      // أضف إلى المؤخرة
deque.PushBack(5)
deque.PushBack(4)
deque.PushFront(3)     // أضف إلى المقدمة
deque.PushFront(1)

/* الوصول إلى العناصر */
front := deque.Front() // العنصر الأمامي
rear := deque.Back()   // العنصر الخلفي

/* إخراج العناصر من الطابور */
deque.Remove(front)    // إخراج العنصر الأمامي
deque.Remove(rear)     // إخراج العنصر الخلفي

/* الحصول على طول الطابور المزدوج */
size := deque.Len()

/* فحص ما إذا كان الطابور المزدوج فارغاً */
isEmpty := deque.Len() == 0
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="deque.ts"
/* تهيئة الطابور المزدوج */
// لا يوفّر TypeScript طابوراً مزدوجاً مدمجاً، ولا يمكن استخدام Array إلا كطابور مزدوج
const deque: number[] = [];

/* إدخال العناصر إلى الطابور */
deque.push(2);
deque.push(5);
deque.push(4);
// يرجى ملاحظة أن unshift() له تعقيد زمني O(n) لأنه يعمل على مصفوفة
deque.unshift(3);
deque.unshift(1);

/* الوصول إلى العناصر */
const peekFirst: number = deque[0];
const peekLast: number = deque[deque.length - 1];

/* إخراج العناصر من الطابور */
// يرجى ملاحظة أن shift() له تعقيد زمني O(n) لأنه يعمل على مصفوفة
const popFront: number = deque.shift() as number;
const popBack: number = deque.pop() as number;

/* الحصول على طول الطابور المزدوج */
const size: number = deque.length;

/* فحص ما إذا كان الطابور المزدوج فارغاً */
const isEmpty: boolean = size === 0;
```

</div>

## تنفيذ الطابور المزدوج *

تنفيذ الطابور المزدوج مشابه لتنفيذ الطابور. ويمكنك اختيار قائمة مترابطة أو مصفوفة كبنية بيانات أساسية.

### التنفيذ بقائمة مترابطة مزدوجة

وبمراجعة القسم السابق، استخدمنا قائمة مترابطة أحادية عادية لتنفيذ طابور، لأنها تتيح بسهولة حذف العقدة الرأسية (المقابلة للإخراج من الطابور) وإضافة عقد جديدة بعد العقدة الذيلية (المقابلة للإدخال إلى الطابور).

أما الطابور المزدوج، فيمكن للمقدمة والمؤخرة فيه إجراء عمليتي الإدخال والإخراج معاً. وبعبارة أخرى، يحتاج الطابور المزدوج إلى تنفيذ عمليات في الاتجاه المعاكس أيضاً. لهذا السبب، نستخدم «قائمة مترابطة مزدوجة» كبنية بيانات أساسية للطابور المزدوج.

وكما هو موضح في الشكل أدناه، نتعامل مع العقدة الرأسية والعقدة الذيلية في القائمة المترابطة المزدوجة على أنهما مقدمة الطابور المزدوج ومؤخرته، منفّذين وظيفة إضافة العقد وحذفها من كلا الطرفين.

وتظهر شيفرة التنفيذ أدناه:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* طابور مزدوج منفّذ بقائمة مترابطة مزدوجة */
class LinkedListDeque {
    private front: ListNode; // العقدة الرأسية: المقدمة
    private rear: ListNode; // العقدة الذيلية: المؤخرة
    private queSize: number; // طول الطابور المزدوج

    constructor() {
        this.front = null;
        this.rear = null;
        this.queSize = 0;
    }

    /* عملية الإدخال في مؤخرة الطابور */
    pushLast(val: number): void {
        const node: ListNode = new ListNode(val);
        // إذا كانت القائمة المترابطة فارغة، اجعل المقدمة والمؤخرة معاً تشيران إلى node
        if (this.queSize === 0) {
            this.front = node;
            this.rear = node;
        } else {
            // أضف node إلى ذيل القائمة المترابطة
            this.rear.next = node;
            node.prev = this.rear;
            this.rear = node; // حدّث العقدة الذيلية
        }
        this.queSize++;
    }

    /* عملية الإدخال في مقدمة الطابور */
    pushFirst(val: number): void {
        const node: ListNode = new ListNode(val);
        // إذا كانت القائمة المترابطة فارغة، اجعل المقدمة والمؤخرة معاً تشيران إلى node
        if (this.queSize === 0) {
            this.front = node;
            this.rear = node;
        } else {
            // أضف node إلى رأس القائمة المترابطة
            this.front.prev = node;
            node.next = this.front;
            this.front = node; // حدّث العقدة الرأسية
        }
        this.queSize++;
    }

    /* تخزين قيمة العقدة الذيلية مؤقتاً */
    popLast(): number {
        if (this.queSize === 0) {
            return null;
        }
        const value: number = this.rear.val; // خزّن قيمة العقدة الذيلية
        // حدّث العقدة الذيلية
        let temp: ListNode = this.rear.prev;
        if (temp !== null) {
            temp.next = null;
            this.rear.prev = null;
        }
        this.rear = temp; // حدّث العقدة الذيلية
        this.queSize--;
        return value;
    }

    /* تخزين قيمة العقدة الرأسية مؤقتاً */
    popFirst(): number {
        if (this.queSize === 0) {
            return null;
        }
        const value: number = this.front.val; // خزّن قيمة العقدة الذيلية
        // احذف العقدة الرأسية
        let temp: ListNode = this.front.next;
        if (temp !== null) {
            temp.prev = null;
            this.front.next = null;
        }
        this.front = temp; // حدّث العقدة الرأسية
        this.queSize--;
        return value;
    }

    /* شيفرة الاختبار */
    peekLast(): number {
        return this.queSize === 0 ? null : this.rear.val;
    }

    /* إعادة قائمة للطباعة */
    peekFirst(): number {
        return this.queSize === 0 ? null : this.front.val;
    }

    /* الحصول على طول الطابور المزدوج */
    size(): number {
        return this.queSize;
    }

    /* فحص ما إذا كان الطابور المزدوج فارغاً */
    isEmpty(): boolean {
        return this.queSize === 0;
    }

    /* طباعة الطابور المزدوج */
    print(): void {
        const arr: number[] = [];
        let temp: ListNode = this.front;
        while (temp !== null) {
            arr.push(temp.val);
            temp = temp.next;
        }
        console.log('[' + arr.join(', ') + ']');
    }
}
```

</div>

### التنفيذ بالمصفوفة

وكما هو موضح في الشكل أدناه، على غرار تنفيذ طابور باستخدام مصفوفة، يمكننا أيضاً استخدام مصفوفة دائرية لتنفيذ طابور مزدوج.

واستناداً إلى تنفيذ الطابور، لا نحتاج إلا إلى إضافة دالتين: «الإدخال في المقدمة» و«الإخراج من المؤخرة»:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* طابور مزدوج منفّذ بمصفوفة دائرية */
class ArrayDeque {
    private nums: number[]; // مصفوفة لتخزين عناصر الطابور المزدوج
    private front: number; // مؤشر المقدمة، يشير إلى مقدمة عنصر الطابور
    private queSize: number; // طول الطابور المزدوج

    /* البانية */
    constructor(capacity: number) {
        this.nums = new Array(capacity);
        this.front = 0;
        this.queSize = 0;
    }

    /* الحصول على سعة الطابور المزدوج */
    capacity(): number {
        return this.nums.length;
    }

    /* الحصول على طول الطابور المزدوج */
    size(): number {
        return this.queSize;
    }

    /* فحص ما إذا كان الطابور المزدوج فارغاً */
    isEmpty(): boolean {
        return this.queSize === 0;
    }

    /* حساب فهرس المصفوفة الدائرية */
    index(i: number): number {
        // استخدم عملية باقي القسمة لوصل رأس المصفوفة بذيلها
        // عندما يتجاوز i ذيل المصفوفة، أعِده إلى الرأس
        // عندما يتجاوز i رأس المصفوفة، أعِده إلى الذيل
        return (i + this.capacity()) % this.capacity();
    }

    /* الإدخال في مقدمة الطابور */
    pushFirst(num: number): void {
        if (this.queSize === this.capacity()) {
            console.log('Double-ended queue is full');
            return;
        }
        // استخدم عملية باقي القسمة لالتفاف front إلى الذيل بعد تجاوز رأس المصفوفة
        // أضف num إلى مقدمة الطابور
        this.front = this.index(this.front - 1);
        // أضف num إلى مقدمة الطابور
        this.nums[this.front] = num;
        this.queSize++;
    }

    /* الإدخال في مؤخرة الطابور */
    pushLast(num: number): void {
        if (this.queSize === this.capacity()) {
            console.log('Double-ended queue is full');
            return;
        }
        // استخدم عملية باقي القسمة لالتفاف rear إلى الرأس بعد تجاوز ذيل المصفوفة
        const rear: number = this.index(this.front + this.queSize);
        // يتحرك مؤشر المقدمة خطوة واحدة إلى الخلف
        this.nums[rear] = num;
        this.queSize++;
    }

    /* الإخراج من مقدمة الطابور */
    popFirst(): number {
        const num: number = this.peekFirst();
        // حرّك مؤشر المقدمة خطوة واحدة إلى الخلف
        this.front = this.index(this.front + 1);
        this.queSize--;
        return num;
    }

    /* الوصول إلى العنصر الخلفي في الطابور */
    popLast(): number {
        const num: number = this.peekLast();
        this.queSize--;
        return num;
    }

    /* إعادة قائمة للطباعة */
    peekFirst(): number {
        if (this.isEmpty()) throw new Error('The Deque Is Empty.');
        return this.nums[this.front];
    }

    /* شيفرة الاختبار */
    peekLast(): number {
        if (this.isEmpty()) throw new Error('The Deque Is Empty.');
        // تهيئة الطابور المزدوج
        const last = this.index(this.front + this.queSize - 1);
        return this.nums[last];
    }

    /* إعادة مصفوفة للطباعة */
    toArray(): number[] {
        // إدخال العناصر إلى الطابور
        const res: number[] = [];
        for (let i = 0, j = this.front; i < this.queSize; i++, j++) {
            res[i] = this.nums[this.index(j)];
        }
        return res;
    }
}
```

</div>

## تطبيقات الطابور المزدوج

يجمع الطابور المزدوج منطق المكدسات والطوابير معاً. **لذلك يمكنه تنفيذ جميع حالات التطبيق لكليهما، مع توفير مرونة أكبر**.

نعلم أن وظيفة «التراجع» في البرمجيات تُنفَّذ عادةً باستخدام مكدس: إذ يدفع النظام كل عملية تغيير إلى المكدس ثم ينفّذ التراجع عبر الإخراج. غير أن البرمجيات تحدّ عادةً عدد خطوات التراجع مراعاةً لقيود موارد النظام (فمثلاً يُسمح بحفظ 50 خطوة فقط). وعندما يتجاوز طول المكدس 50، تحتاج البرمجية إلى إجراء عملية حذف في قاعدة المكدس (مقدمة الطابور). **لكن المكدس لا يستطيع تنفيذ هذه الوظيفة، لذا نحتاج إلى طابور مزدوج ليحل محل المكدس**. ولاحظ أن المنطق الجوهري لـ«التراجع» ما زال يتبع مبدأ آخر ما يدخل يخرج أولاً في المكدس؛ غير أن الطابور المزدوج يستطيع تنفيذ بعض المنطق الإضافي بمرونة أكبر.
