---
title: "Queue"
book: hello-algo
chapter: chapter_stack_and_queue
slug: queue
order: 32
lang: en
---
A <u>queue</u> is a linear data structure that follows the First In, First Out (FIFO) rule. As the name suggests, it models people lining up: newcomers continuously join the rear of the queue, while the people at the front leave one by one.

As shown in the figure below, we call the front of the queue the "front" and the end the "rear." The operation of adding an element to the rear is called "enqueue," and the operation of removing the front element is called "dequeue."

![FIFO rule of queue](/images/hello-algo/chapter_stack_and_queue--queue_operations.png)

## Common Queue Operations

The common operations on a queue are shown in the table below. Note that method names may vary across programming languages. Here, we use the same naming convention as for stacks.

<p align="center"> Table <id> &nbsp; Efficiency of Queue Operations </p>

| Method   | Description                                | Time Complexity |
| -------- | ------------------------------------------ | --------------- |
| `push()` | Enqueue element, add element to rear       | $O(1)$          |
| `pop()`  | Dequeue front element                      | $O(1)$          |
| `peek()` | Access front element                       | $O(1)$          |

We can directly use the queue classes provided by the programming language:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="queue_test.go"
/* Initialize queue */
// In Go, use list as a queue
queue := list.New()

/* Enqueue elements */
queue.PushBack(1)
queue.PushBack(3)
queue.PushBack(2)
queue.PushBack(5)
queue.PushBack(4)

/* Access front element */
peek := queue.Front()

/* Dequeue element */
pop := queue.Front()
queue.Remove(pop)

/* Get queue length */
size := queue.Len()

/* Check if queue is empty */
isEmpty := queue.Len() == 0
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="queue.ts"
/* Initialize queue */
// TypeScript does not have a built-in queue, can use Array as a queue
const queue: number[] = [];

/* Enqueue elements */
queue.push(1);
queue.push(3);
queue.push(2);
queue.push(5);
queue.push(4);

/* Access front element */
const peek = queue[0];

/* Dequeue element */
// The underlying structure is an array, so shift() has O(n) time complexity
const pop = queue.shift();

/* Get queue length */
const size = queue.length;

/* Check if queue is empty */
const empty = queue.length === 0;
```

</div>

## Queue Implementation

To implement a queue, we need a data structure that allows adding elements at one end and removing elements at the other end. Both linked lists and arrays meet this requirement.

### Linked List Implementation

As shown in the figure below, we can treat the "head node" and "tail node" of a linked list as the "front" and "rear" of the queue, respectively, with the rule that nodes can only be added at the rear and removed from the front.

Below is the code for implementing a queue using a linked list:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Queue based on linked list implementation */
class LinkedListQueue {
    private front: ListNode | null; // Head node front
    private rear: ListNode | null; // Tail node rear
    private queSize: number = 0;

    constructor() {
        this.front = null;
        this.rear = null;
    }

    /* Get the length of the queue */
    get size(): number {
        return this.queSize;
    }

    /* Check if the queue is empty */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /* Enqueue */
    push(num: number): void {
        // Add num after the tail node
        const node = new ListNode(num);
        // If the queue is empty, make both front and rear point to the node
        if (!this.front) {
            this.front = node;
            this.rear = node;
            // If the queue is not empty, add the node after the tail node
        } else {
            this.rear!.next = node;
            this.rear = node;
        }
        this.queSize++;
    }

    /* Dequeue */
    pop(): number {
        const num = this.peek();
        if (!this.front) throw new Error('Queue is empty');
        // Delete head node
        this.front = this.front.next;
        this.queSize--;
        return num;
    }

    /* Return list for printing */
    peek(): number {
        if (this.size === 0) throw new Error('Queue is empty');
        return this.front!.val;
    }

    /* Convert linked list to Array and return */
    toArray(): number[] {
        let node = this.front;
        const res = new Array<number>(this.size);
        for (let i = 0; i < res.length; i++) {
            res[i] = node!.val;
            node = node!.next;
        }
        return res;
    }
}
```

</div>

### Array Implementation

Deleting the first element in an array has a time complexity of $O(n)$, which would make the dequeue operation inefficient. However, we can use the following clever method to avoid this problem.

We can use a variable `front` to point to the index of the front element and maintain a variable `size` to record the queue length. We define `rear = front + size`, which calculates the position right after the rear element.

Based on this design, **the valid interval containing elements in the array is `[front, rear - 1]`**. The implementation methods for various operations are shown in the figure below:

- Enqueue operation: Assign the input element to the `rear` index and increase `size` by 1.
- Dequeue operation: Simply increase `front` by 1 and decrease `size` by 1.

As you can see, both enqueue and dequeue operations require only one operation, with a time complexity of $O(1)$.

You may notice a problem: as we continuously enqueue and dequeue, both `front` and `rear` move to the right. **When they reach the end of the array, they cannot continue moving**. To solve this problem, we can treat the array as a "circular array" with head and tail connected.

For a circular array, we need to let `front` or `rear` wrap around to the beginning of the array when they cross the end. This periodic pattern can be implemented using the "modulo operation," as shown in the code below:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Queue based on circular array implementation */
class ArrayQueue {
    private nums: number[]; // Array for storing queue elements
    private front: number; // Front pointer, points to the front of the queue element
    private queSize: number; // Queue length

    constructor(capacity: number) {
        this.nums = new Array(capacity);
        this.front = this.queSize = 0;
    }

    /* Get the capacity of the queue */
    get capacity(): number {
        return this.nums.length;
    }

    /* Get the length of the queue */
    get size(): number {
        return this.queSize;
    }

    /* Check if the queue is empty */
    isEmpty(): boolean {
        return this.queSize === 0;
    }

    /* Enqueue */
    push(num: number): void {
        if (this.size === this.capacity) {
            console.log('Queue is full');
            return;
        }
        // Use modulo operation to wrap rear around to the head after passing the tail of the array
        // Add num to the rear of the queue
        const rear = (this.front + this.queSize) % this.capacity;
        // Front pointer moves one position backward
        this.nums[rear] = num;
        this.queSize++;
    }

    /* Dequeue */
    pop(): number {
        const num = this.peek();
        // Move front pointer backward by one position, if it passes the tail, return to array head
        this.front = (this.front + 1) % this.capacity;
        this.queSize--;
        return num;
    }

    /* Return list for printing */
    peek(): number {
        if (this.isEmpty()) throw new Error('Queue is empty');
        return this.nums[this.front];
    }

    /* Return Array */
    toArray(): number[] {
        // Elements enqueue
        const arr = new Array(this.size);
        for (let i = 0, j = this.front; i < this.size; i++, j++) {
            arr[i] = this.nums[j % this.capacity];
        }
        return arr;
    }
}
```

</div>

The queue implemented above still has limitations: its length is immutable. However, this problem is not difficult to solve. We can replace the array with a dynamic array to introduce an expansion mechanism. Interested readers can try to implement this themselves.

The comparison conclusions for the two implementations are consistent with those for stacks and will not be repeated here.

## Typical Applications of Queue

- **Taobao orders**. After shoppers place orders, the orders are added to a queue, and the system subsequently processes the orders in the queue according to their sequence. During Double Eleven, massive orders are generated in a short time, and high concurrency becomes a key challenge that engineers need to tackle.
- **Various to-do tasks**. Any scenario that needs to implement "first come, first served" functionality, such as a printer's task queue or a restaurant's order queue, can effectively maintain the processing order using queues.
