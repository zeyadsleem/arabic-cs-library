---
title: "Linked List"
book: hello-algo
chapter: chapter_array_and_linkedlist
slug: linked_list
order: 25
lang: en
---
Memory is a shared resource for all programs. In a complex runtime environment, free memory may be scattered throughout the address space. We know that arrays require contiguous memory, and when an array is very large, the system may not be able to provide such a large contiguous block. This is where the flexibility of linked lists becomes apparent.

A <u>linked list</u> is a linear data structure in which each element is a node object, and the nodes are connected through "references". A reference records the memory address of the next node, through which the next node can be accessed from the current node.

This design allows linked-list nodes to be stored in different locations in memory, and their addresses do not need to be contiguous.

![Linked list definition and storage method](/images/hello-algo/chapter_array_and_linkedlist--linkedlist_definition.png)

Observing the figure above, the basic unit of a linked list is a <u>node</u> object. Each node contains two pieces of data: the node's "value" and a "reference" to the next node.

- The first node of a linked list is called the "head node", and the last node is called the "tail node".
- The tail node points to "null", which is denoted as `null`, `nullptr`, and `None` in Java, C++, and Python, respectively.
- In languages that support pointers, such as C, C++, Go, and Rust, the aforementioned "reference" should be replaced with "pointer".

As shown in the following code, a linked list node `ListNode` contains not only a value but also an additional reference (pointer). Therefore, **linked lists occupy more memory space than arrays when storing the same amount of data**.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title=""
/* Linked list node structure */
type ListNode struct {
    Val  int       // Node value
    Next *ListNode // Pointer to the next node
}

// NewListNode Constructor, creates a new linked list
func NewListNode(val int) *ListNode {
    return &ListNode{
        Val:  val,
        Next: nil,
    }
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title=""
/* Linked list node class */
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;        // Node value
        this.next = next === undefined ? null : next;  // Reference to the next node
    }
}
```

</div>

## Common Linked List Operations

### Initializing a Linked List

Building a linked list involves two steps: first, initializing each node object; second, constructing the reference relationships between nodes. Once initialization is complete, we can traverse all nodes starting from the head node of the linked list through the reference `next`.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="linked_list.go"
/* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
// Initialize each node
n0 := NewListNode(1)
n1 := NewListNode(3)
n2 := NewListNode(2)
n3 := NewListNode(5)
n4 := NewListNode(4)
// Build references between nodes
n0.Next = n1
n1.Next = n2
n2.Next = n3
n3.Next = n4
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="linked_list.ts"
/* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
// Initialize each node
const n0 = new ListNode(1);
const n1 = new ListNode(3);
const n2 = new ListNode(2);
const n3 = new ListNode(5);
const n4 = new ListNode(4);
// Build references between nodes
n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;
```

</div>

An array is a single variable; for example, an array `nums` contains elements `nums[0]`, `nums[1]`, and so on. A linked list, by contrast, is composed of multiple independent node objects. **We usually use the head node as a stand-in for the entire linked list**; for example, the linked list in the above code can be referred to as linked list `n0`.

### Inserting a Node

Inserting a node in a linked list is very easy. As shown in the figure below, suppose we want to insert a new node `P` between two adjacent nodes `n0` and `n1`. **We only need to change two node references (pointers)**, with a time complexity of $O(1)$.

In contrast, the time complexity of inserting an element in an array is $O(n)$, which is inefficient when dealing with large amounts of data.

![Example of inserting a node into a linked list](/images/hello-algo/chapter_array_and_linkedlist--linkedlist_insert_node.png)

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Insert node P after node n0 in the linked list */
function insert(n0: ListNode, P: ListNode): void {
    const n1 = n0.next;
    P.next = n1;
    n0.next = P;
}
```

</div>

### Removing a Node

As shown in the figure below, removing a node in a linked list is also very convenient. **We only need to change one node's reference (pointer)**.

Note that although node `P` still points to `n1` after the deletion operation is complete, the linked list can no longer access `P` when traversing, which means `P` no longer belongs to this linked list.

![Removing a node from a linked list](/images/hello-algo/chapter_array_and_linkedlist--linkedlist_remove_node.png)

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Remove the first node after node n0 in the linked list */
function remove(n0: ListNode): void {
    if (!n0.next) {
        return;
    }
    // n0 -> P -> n1
    const P = n0.next;
    const n1 = P.next;
    n0.next = n1;
}
```

</div>

### Accessing a Node

**Accessing nodes in a linked list is less efficient**. As mentioned in the previous section, we can access any element in an array in $O(1)$ time. This is not the case with linked lists. The program needs to start from the head node and traverse backward one by one until the target node is found. That is, accessing the $i$-th node in a linked list requires $i - 1$ iterations, with a time complexity of $O(n)$.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Access the node at index index in the linked list */
func access(head *ListNode, index int) *ListNode {
	for i := 0; i < index; i++ {
		if head == nil {
			return nil
		}
		head = head.Next
	}
	return head
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Access the node at index index in the linked list */
function access(head: ListNode | null, index: number): ListNode | null {
    for (let i = 0; i < index; i++) {
        if (!head) {
            return null;
        }
        head = head.next;
    }
    return head;
}
```

</div>

### Finding a Node

Traverse the linked list to find a node with value `target`, and output the index of that node in the linked list. This process is also a linear search. The code is shown below:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Find the first node with value target in the linked list */
function find(head: ListNode | null, target: number): number {
    let index = 0;
    while (head !== null) {
        if (head.val === target) {
            return index;
        }
        head = head.next;
        index += 1;
    }
    return -1;
}
```

</div>

## Arrays vs. Linked Lists

The table below summarizes the characteristics of arrays and linked lists and compares their operational efficiencies. Since they employ two opposite storage strategies, their various properties and operational efficiencies also exhibit contrasting characteristics.

<p align="center"> Table <id> &nbsp; Comparison of array and linked list efficiencies </p>

|                        | Array                                         | Linked List                |
| ---------------------- | --------------------------------------------- | -------------------------- |
| Storage method         | Contiguous memory space                       | Scattered memory space     |
| Capacity expansion     | Immutable length                              | Flexible expansion         |
| Memory efficiency      | Elements occupy less memory, but space may be wasted | Elements occupy more memory |
| Accessing an element   | $O(1)$                                        | $O(n)$                     |
| Adding an element      | $O(n)$                                        | $O(1)$                     |
| Removing an element    | $O(n)$                                        | $O(1)$                     |

## Common Types of Linked Lists

As shown in the figure below, there are three common types of linked lists:

- **Singly linked list**: This is the ordinary linked list introduced earlier. The nodes of a singly linked list contain a value and a reference to the next node. We call the first node the head node and the last node the tail node; the tail node points to `None`.
- **Circular linked list**: If we make the tail node of a singly linked list point to the head node (connecting the tail to the head), we get a circular linked list. In a circular linked list, any node can be viewed as the head node.
- **Doubly linked list**: Compared to a singly linked list, a doubly linked list records references in both directions. The node definition of a doubly linked list includes references to both the successor node (next node) and the predecessor node (previous node). Compared to a singly linked list, a doubly linked list is more flexible and can traverse the linked list in both directions, but it also requires more memory space.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title=""
/* Doubly linked list node structure */
type DoublyListNode struct {
    Val  int             // Node value
    Next *DoublyListNode // Pointer to the successor node
    Prev *DoublyListNode // Pointer to the predecessor node
}

// NewDoublyListNode Initialization
func NewDoublyListNode(val int) *DoublyListNode {
    return &DoublyListNode{
        Val:  val,
        Next: nil,
        Prev: nil,
    }
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title=""
/* Doubly linked list node class */
class ListNode {
    val: number;
    next: ListNode | null;
    prev: ListNode | null;
    constructor(val?: number, next?: ListNode | null, prev?: ListNode | null) {
        this.val = val  ===  undefined ? 0 : val;        // Node value
        this.next = next  ===  undefined ? null : next;  // Reference to the successor node
        this.prev = prev  ===  undefined ? null : prev;  // Reference to the predecessor node
    }
}
```

</div>

![Common types of linked lists](/images/hello-algo/chapter_array_and_linkedlist--linkedlist_common_types.png)

## Typical Applications of Linked Lists

Singly linked lists are commonly used to implement stacks, queues, hash tables, and graphs.

- **Stacks and queues**: When insertion and deletion operations both occur at one end of the linked list, it exhibits last-in-first-out characteristics, corresponding to a stack. When insertion operations occur at one end of the linked list and deletion operations occur at the other end, it exhibits first-in-first-out characteristics, corresponding to a queue.
- **Hash tables**: Separate chaining is one of the mainstream solutions for resolving hash collisions. In this approach, all colliding elements are placed in a linked list.
- **Graphs**: An adjacency list is a common way to represent a graph, where each vertex in the graph is associated with a linked list, and each element in the linked list represents another vertex connected to that vertex.

Doubly linked lists are commonly used in scenarios where quick access to the previous and next elements is needed.

- **Advanced data structures**: For example, in red-black trees and B-trees, we need to access the parent node of a node, which can be achieved by saving a reference to the parent node in the node, similar to a doubly linked list.
- **Browser history**: In web browsers, when a user clicks the forward or backward button, the browser needs to know the previous and next web pages the user visited. The characteristics of doubly linked lists make this operation simple.
- **LRU algorithm**: In cache eviction (LRU) algorithms, we need to quickly find the least recently used data and support quick addition and deletion of nodes. Using a doubly linked list is very suitable for this.

Circular linked lists are commonly used in scenarios that require periodic operations, such as operating system resource scheduling.

- **Round-robin scheduling algorithm**: In operating systems, round-robin scheduling is a common CPU scheduling algorithm that needs to cycle through a set of processes. Each process is assigned a time slice, and when the time slice expires, the CPU switches to the next process. This cyclic operation can be implemented using a circular linked list.
- **Data buffers**: In some data buffer implementations, circular linked lists may also be used. For example, in audio and video players, the data stream may be divided into multiple buffer blocks and placed in a circular linked list to achieve seamless playback.
