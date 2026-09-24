---
title: "Deque"
book: hello-algo
chapter: chapter_stack_and_queue
slug: deque
order: 33
lang: en
---
In a queue, we can only remove elements from the front or add elements at the rear. As shown in the figure below, a <u>double-ended queue (deque)</u> provides greater flexibility, allowing elements to be added or removed at both the front and the rear.

![Operations of deque](/images/hello-algo/chapter_stack_and_queue--deque_operations.png)

## Common Deque Operations

The common operations on a deque are shown in the table below. The specific method names depend on the programming language used.

<p align="center"> Table <id> &nbsp; Efficiency of Deque Operations </p>

| Method         | Description               | Time Complexity |
| -------------- | ------------------------- | --------------- |
| `push_first()` | Add element to front      | $O(1)$          |
| `push_last()`  | Add element to rear       | $O(1)$          |
| `pop_first()`  | Remove front element      | $O(1)$          |
| `pop_last()`   | Remove rear element       | $O(1)$          |
| `peek_first()` | Access front element      | $O(1)$          |
| `peek_last()`  | Access rear element       | $O(1)$          |

Similarly, we can directly use the deque classes provided by the programming language:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="deque_test.go"
/* Initialize deque */
// In Go, use list as a deque
deque := list.New()

/* Enqueue elements */
deque.PushBack(2)      // Add to rear
deque.PushBack(5)
deque.PushBack(4)
deque.PushFront(3)     // Add to front
deque.PushFront(1)

/* Access elements */
front := deque.Front() // Front element
rear := deque.Back()   // Rear element

/* Dequeue elements */
deque.Remove(front)    // Front element dequeue
deque.Remove(rear)     // Rear element dequeue

/* Get deque length */
size := deque.Len()

/* Check if deque is empty */
isEmpty := deque.Len() == 0
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="deque.ts"
/* Initialize deque */
// TypeScript does not have a built-in deque, can only use Array as a deque
const deque: number[] = [];

/* Enqueue elements */
deque.push(2);
deque.push(5);
deque.push(4);
// Please note that since it's an array, unshift() has O(n) time complexity
deque.unshift(3);
deque.unshift(1);

/* Access elements */
const peekFirst: number = deque[0];
const peekLast: number = deque[deque.length - 1];

/* Dequeue elements */
// Please note that since it's an array, shift() has O(n) time complexity
const popFront: number = deque.shift() as number;
const popBack: number = deque.pop() as number;

/* Get deque length */
const size: number = deque.length;

/* Check if deque is empty */
const isEmpty: boolean = size === 0;
```

</div>

## Deque Implementation *

The implementation of a deque is similar to that of a queue. You can choose either a linked list or an array as the underlying data structure.

### Doubly Linked List Implementation

Reviewing the previous section, we used a regular singly linked list to implement a queue because it conveniently allows deleting the head node (corresponding to dequeue) and adding new nodes after the tail node (corresponding to enqueue).

For a deque, both the front and rear can perform enqueue and dequeue operations. In other words, a deque needs to implement operations in the opposite direction as well. For this reason, we use a "doubly linked list" as the underlying data structure for the deque.

As shown in the figure below, we treat the head and tail nodes of the doubly linked list as the front and rear of the deque, implementing functionality to add and remove nodes at both ends.

The implementation code is shown below:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Double-ended queue based on doubly linked list implementation */
class LinkedListDeque {
    private front: ListNode; // Head node front
    private rear: ListNode; // Tail node rear
    private queSize: number; // Length of the double-ended queue

    constructor() {
        this.front = null;
        this.rear = null;
        this.queSize = 0;
    }

    /* Rear of the queue enqueue operation */
    pushLast(val: number): void {
        const node: ListNode = new ListNode(val);
        // If the linked list is empty, make both front and rear point to node
        if (this.queSize === 0) {
            this.front = node;
            this.rear = node;
        } else {
            // Add node to the tail of the linked list
            this.rear.next = node;
            node.prev = this.rear;
            this.rear = node; // Update tail node
        }
        this.queSize++;
    }

    /* Front of the queue enqueue operation */
    pushFirst(val: number): void {
        const node: ListNode = new ListNode(val);
        // If the linked list is empty, make both front and rear point to node
        if (this.queSize === 0) {
            this.front = node;
            this.rear = node;
        } else {
            // Add node to the head of the linked list
            this.front.prev = node;
            node.next = this.front;
            this.front = node; // Update head node
        }
        this.queSize++;
    }

    /* Temporarily store tail node value */
    popLast(): number {
        if (this.queSize === 0) {
            return null;
        }
        const value: number = this.rear.val; // Store tail node value
        // Update tail node
        let temp: ListNode = this.rear.prev;
        if (temp !== null) {
            temp.next = null;
            this.rear.prev = null;
        }
        this.rear = temp; // Update tail node
        this.queSize--;
        return value;
    }

    /* Temporarily store head node value */
    popFirst(): number {
        if (this.queSize === 0) {
            return null;
        }
        const value: number = this.front.val; // Store tail node value
        // Delete head node
        let temp: ListNode = this.front.next;
        if (temp !== null) {
            temp.prev = null;
            this.front.next = null;
        }
        this.front = temp; // Update head node
        this.queSize--;
        return value;
    }

    /* Driver Code */
    peekLast(): number {
        return this.queSize === 0 ? null : this.rear.val;
    }

    /* Return list for printing */
    peekFirst(): number {
        return this.queSize === 0 ? null : this.front.val;
    }

    /* Get the length of the double-ended queue */
    size(): number {
        return this.queSize;
    }

    /* Check if the double-ended queue is empty */
    isEmpty(): boolean {
        return this.queSize === 0;
    }

    /* Print deque */
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

### Array Implementation

As shown in the figure below, similar to implementing a queue based on an array, we can also use a circular array to implement a deque.

Based on the queue implementation, we only need to add methods for "enqueue at front" and "dequeue from rear":

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Double-ended queue based on circular array implementation */
class ArrayDeque {
    private nums: number[]; // Array for storing double-ended queue elements
    private front: number; // Front pointer, points to the front of the queue element
    private queSize: number; // Double-ended queue length

    /* Constructor */
    constructor(capacity: number) {
        this.nums = new Array(capacity);
        this.front = 0;
        this.queSize = 0;
    }

    /* Get the capacity of the double-ended queue */
    capacity(): number {
        return this.nums.length;
    }

    /* Get the length of the double-ended queue */
    size(): number {
        return this.queSize;
    }

    /* Check if the double-ended queue is empty */
    isEmpty(): boolean {
        return this.queSize === 0;
    }

    /* Calculate circular array index */
    index(i: number): number {
        // Use modulo operation to wrap the array head and tail together
        // When i passes the tail of the array, return to the head
        // When i passes the head of the array, return to the tail
        return (i + this.capacity()) % this.capacity();
    }

    /* Front of the queue enqueue */
    pushFirst(num: number): void {
        if (this.queSize === this.capacity()) {
            console.log('Double-ended queue is full');
            return;
        }
        // Use modulo operation to wrap front around to the tail after passing the head of the array
        // Add num to the front of the queue
        this.front = this.index(this.front - 1);
        // Add num to front of queue
        this.nums[this.front] = num;
        this.queSize++;
    }

    /* Rear of the queue enqueue */
    pushLast(num: number): void {
        if (this.queSize === this.capacity()) {
            console.log('Double-ended queue is full');
            return;
        }
        // Use modulo operation to wrap rear around to the head after passing the tail of the array
        const rear: number = this.index(this.front + this.queSize);
        // Front pointer moves one position backward
        this.nums[rear] = num;
        this.queSize++;
    }

    /* Rear of the queue dequeue */
    popFirst(): number {
        const num: number = this.peekFirst();
        // Move front pointer backward by one position
        this.front = this.index(this.front + 1);
        this.queSize--;
        return num;
    }

    /* Access rear of the queue element */
    popLast(): number {
        const num: number = this.peekLast();
        this.queSize--;
        return num;
    }

    /* Return list for printing */
    peekFirst(): number {
        if (this.isEmpty()) throw new Error('The Deque Is Empty.');
        return this.nums[this.front];
    }

    /* Driver Code */
    peekLast(): number {
        if (this.isEmpty()) throw new Error('The Deque Is Empty.');
        // Initialize double-ended queue
        const last = this.index(this.front + this.queSize - 1);
        return this.nums[last];
    }

    /* Return array for printing */
    toArray(): number[] {
        // Elements enqueue
        const res: number[] = [];
        for (let i = 0, j = this.front; i < this.queSize; i++, j++) {
            res[i] = this.nums[this.index(j)];
        }
        return res;
    }
}
```

</div>

## Deque Applications

A deque combines the logic of both stacks and queues. **Therefore, it can implement all application scenarios of both, while providing greater flexibility**.

We know that the "undo" function in software is typically implemented using a stack: the system pushes each change operation onto the stack and then implements undo through pop. However, considering system resource limitations, software usually limits the number of undo steps (for example, only allowing 50 steps to be saved). When the stack length exceeds 50, the software needs to perform a deletion operation at the bottom of the stack (front of the queue). **But a stack cannot implement this functionality, so a deque is needed to replace the stack**. Note that the core logic of "undo" still follows the LIFO principle of a stack; it's just that the deque can more flexibly implement some additional logic.
