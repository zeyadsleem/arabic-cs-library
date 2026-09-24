---
title: "Stack"
book: hello-algo
chapter: chapter_stack_and_queue
slug: stack
order: 31
lang: en
---
A <u>stack</u> is a linear data structure that follows the Last In, First Out (LIFO) principle.

We can compare a stack to a pile of plates on a table. If we specify that only one plate can be moved at a time, then to get the bottom plate, we must first remove the plates above it one by one. If we replace the plates with various types of elements (such as integers, characters, objects, etc.), we get the stack data structure.

As shown in the figure below, we call the top of the stacked elements the "top" and the bottom the "bottom." The operation of adding an element to the top is called "push," and the operation of removing the top element is called "pop."

![LIFO rule of stack](/images/hello-algo/chapter_stack_and_queue--stack_operations.png)

## Common Stack Operations

The common operations on a stack are shown in the table below. The specific method names depend on the programming language used. Here, we use the common naming convention of `push()`, `pop()`, and `peek()`.

<p align="center"> Table <id> &nbsp; Efficiency of Stack Operations </p>

| Method   | Description                                    | Time Complexity |
| -------- | ---------------------------------------------- | --------------- |
| `push()` | Push element onto stack (add to top)          | $O(1)$          |
| `pop()`  | Pop top element from stack                     | $O(1)$          |
| `peek()` | Access top element                             | $O(1)$          |

Typically, we can directly use the built-in stack class provided by the programming language. However, some languages may not provide a dedicated stack class. In such cases, we can use the language's "array" or "linked list" as a stack and simply avoid using operations unrelated to stack behavior.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="stack_test.go"
/* Initialize stack */
// In Go, it is recommended to use Slice as a stack
var stack []int

/* Push elements */
stack = append(stack, 1)
stack = append(stack, 3)
stack = append(stack, 2)
stack = append(stack, 5)
stack = append(stack, 4)

/* Access top element */
peek := stack[len(stack)-1]

/* Pop element */
pop := stack[len(stack)-1]
stack = stack[:len(stack)-1]

/* Get stack length */
size := len(stack)

/* Check if empty */
isEmpty := len(stack) == 0
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="stack.ts"
/* Initialize stack */
// TypeScript does not have a built-in stack class, can use Array as a stack
const stack: number[] = [];

/* Push elements */
stack.push(1);
stack.push(3);
stack.push(2);
stack.push(5);
stack.push(4);

/* Access top element */
const peek = stack[stack.length - 1];

/* Pop element */
const pop = stack.pop();

/* Get stack length */
const size = stack.length;

/* Check if empty */
const is_empty = stack.length === 0;
```

</div>

## Stack Implementation

To gain a deeper understanding of how a stack operates, let's try implementing a stack class ourselves.

A stack follows the LIFO principle, so we can only add or remove elements at the top. However, both arrays and linked lists allow adding and removing elements at any position. **Therefore, a stack can be viewed as a restricted array or linked list**. In other words, we can "shield" some irrelevant operations of arrays or linked lists so that their external logic conforms to the characteristics of a stack.

### Linked List Implementation

When implementing a stack using a linked list, we can treat the head node of the linked list as the top of the stack and the tail node as the base.

As shown in the figure below, for the push operation, we simply insert an element at the head of the linked list. This node insertion method is called the "head insertion method." For the pop operation, we just need to remove the head node from the linked list.

Below is sample code for implementing a stack based on a linked list:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Stack based on linked list implementation */
class LinkedListStack {
    private stackPeek: ListNode | null; // Use head node as stack top
    private stkSize: number = 0; // Stack length

    constructor() {
        this.stackPeek = null;
    }

    /* Get the length of the stack */
    get size(): number {
        return this.stkSize;
    }

    /* Check if the stack is empty */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /* Push */
    push(num: number): void {
        const node = new ListNode(num);
        node.next = this.stackPeek;
        this.stackPeek = node;
        this.stkSize++;
    }

    /* Pop */
    pop(): number {
        const num = this.peek();
        if (!this.stackPeek) throw new Error('Stack is empty');
        this.stackPeek = this.stackPeek.next;
        this.stkSize--;
        return num;
    }

    /* Return list for printing */
    peek(): number {
        if (!this.stackPeek) throw new Error('Stack is empty');
        return this.stackPeek.val;
    }

    /* Convert linked list to Array and return */
    toArray(): number[] {
        let node = this.stackPeek;
        const res = new Array<number>(this.size);
        for (let i = res.length - 1; i >= 0; i--) {
            res[i] = node!.val;
            node = node!.next;
        }
        return res;
    }
}
```

</div>

### Array Implementation

When implementing a stack using an array, we can treat the end of the array as the top of the stack. As shown in the figure below, push and pop operations correspond to adding and removing elements at the end of the array, both with a time complexity of $O(1)$.

Since elements pushed onto the stack may increase continuously, we can use a dynamic array, which eliminates the need to handle array expansion ourselves. Here is the sample code:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Stack based on array implementation */
class ArrayStack {
    private stack: number[];
    constructor() {
        this.stack = [];
    }

    /* Get the length of the stack */
    get size(): number {
        return this.stack.length;
    }

    /* Check if the stack is empty */
    isEmpty(): boolean {
        return this.stack.length === 0;
    }

    /* Push */
    push(num: number): void {
        this.stack.push(num);
    }

    /* Pop */
    pop(): number | undefined {
        if (this.isEmpty()) throw new Error('Stack is empty');
        return this.stack.pop();
    }

    /* Return list for printing */
    top(): number | undefined {
        if (this.isEmpty()) throw new Error('Stack is empty');
        return this.stack[this.stack.length - 1];
    }

    /* Return Array */
    toArray() {
        return this.stack;
    }
}
```

</div>

## Comparison of the Two Implementations

**Supported Operations**

Both implementations support all operations defined by the stack. The array implementation additionally supports random access, but this goes beyond the stack definition and is generally not used.

**Time Efficiency**

In the array-based implementation, both push and pop operations occur in pre-allocated contiguous memory, which has good cache locality and is therefore more efficient. However, if pushing exceeds the array capacity, it triggers an expansion mechanism, causing the time complexity of that particular push operation to become $O(n)$.

In the linked list-based implementation, list expansion is very flexible, and there is no issue of reduced efficiency due to array expansion. However, the push operation requires initializing a node object and modifying pointers, so it is relatively less efficient. Nevertheless, if the pushed elements are already node objects, the initialization step can be omitted, thereby improving efficiency.

In summary, when the elements pushed and popped are basic data types such as `int` or `double`, we can draw the following conclusions:

- The array-based stack implementation has reduced efficiency when expansion is triggered, but since expansion is an infrequent operation, the average efficiency is higher.
- The linked list-based stack implementation can provide more stable efficiency performance.

**Space Efficiency**

When initializing a list, the system allocates an "initial capacity" that may exceed the actual need. Additionally, the expansion mechanism typically expands at a specific ratio (e.g., 2x), and the capacity after expansion may also exceed actual needs. Therefore, **the array-based stack implementation may cause some space wastage**.

However, since linked list nodes need to store additional pointers, **the space occupied by linked list nodes is relatively large**.

In summary, we cannot simply determine which implementation is more memory-efficient and need to analyze the specific situation.

## Typical Applications of Stack

- **Back and forward in browsers, undo and redo in software**. Every time we open a new webpage, the browser pushes the previous page onto the stack, allowing us to return to the previous page via the back operation. The back operation is essentially performing a pop. To support both back and forward, two stacks are needed to work together.
- **Program memory management**. Each time a function is called, the system adds a stack frame to the top of the stack to record the function's context information. During recursion, the downward recursive phase continuously performs push operations, while the upward backtracking phase continuously performs pop operations.
