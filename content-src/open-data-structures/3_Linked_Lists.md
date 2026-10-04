---
title: "3. Linked Lists"
lang: en
---

In this chapter, we continue to study implementations of the List interface, this time using pointer-based data structures rather than arrays. The structures in this chapter are made up of nodes that contain the list items. Using references (pointers), the nodes are linked together into a sequence. We first study singly-linked lists, which can implement Stack and (FIFO) Queue operations in constant time per operation and then move on to doubly-linked lists, which can implement Deque operations in constant time. Linked lists have advantages and disadvantages when compared to array-based implementations of the List interface. The primary disadvantage is that we lose the ability to access any element using $ \mathtt{get(i)}$ or $ \mathtt{set(i,x)}$ in constant time. Instead, we have to walk through the list, one element at a time, until we reach the $ \mathtt{i}$ th element. The primary advantage is that they are more dynamic: Given a reference to any list node $ \mathtt{u}$ , we can delete $ \mathtt{u}$ or insert a node adjacent to $ \mathtt{u}$ in constant time. This is true no matter where $ \mathtt{u}$ is in the list.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 3.1 SLList: A Singly-Linked List

**Subsections**

# 3.1 SLList: A Singly-Linked List

An SLList (singly-linked list) is a sequence of Nodes. Each node $ \mathtt{u}$ stores a data value $ \mathtt{u.x}$ and a reference $ \mathtt{u.next}$ to the next node in the sequence. For the last node $ \mathtt{w}$ in the sequence, $ \ensuremath{\mathtt{w.next}} = \ensuremath{\mathtt{null}}$

```
    class Node {
        T x;
        Node next;
    }
```

For efficiency, an SLList uses variables $ \mathtt{head}$ and $ \mathtt{tail}$ to keep track of the first and last node in the sequence, as well as an integer $ \mathtt{n}$ to keep track of the length of the sequence:

```
    Node head;
    Node tail;
    int n;
```

A sequence of Stack and Queue operations on an SLList is illustrated in Figure 3.1.

An SLList can efficiently implement the Stack operations $ \mathtt{push()}$ and $ \mathtt{pop()}$ by adding and removing elements at the head of the sequence. The $ \mathtt{push()}$ operation simply creates a new node $ \mathtt{u}$ with data value $ \mathtt{x}$ , sets $ \mathtt{u.next}$ to the old head of the list and makes $ \mathtt{u}$ the new head of the list. Finally, it increments $ \mathtt{n}$ since the size of the SLList has increased by one:

```
    T push(T x) {
        Node u = new Node();
        u.x = x;
        u.next = head;
        head = u;
        if (n == 0)
            tail = u;
        n++;
        return x;
    }
```

The $ \mathtt{pop()}$ operation, after checking that the SLList is not empty, removes the head by setting $ \ensuremath{\mathtt{head=head.next}}$ and decrementing $ \mathtt{n}$ . A special case occurs when the last element is being removed, in which case $ \mathtt{tail}$ is set to $ \mathtt{null}$ :

```
    T pop() {
        if (n == 0)    return null;
        T x = head.x;
        head = head.next;
        if (--n == 0) tail = null;
        return x;
    }
```

Clearly, both the $ \mathtt{push(x)}$ and $ \mathtt{pop()}$ operations run in $ O(1)$ time.

## 3.1.1 Queue Operations

An SLList can also implement the FIFO queue operations $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ in constant time. Removals are done from the head of the list, and are identical to the $ \mathtt{pop()}$ operation:

```
    T remove() {
        if (n == 0)    return null;
        T x = head.x;
        head = head.next;
        if (--n == 0) tail = null;
        return x;
    }
```

Additions, on the other hand, are done at the tail of the list. In most cases, this is done by setting $ \ensuremath{\mathtt{tail.next}}=\ensuremath{\mathtt{u}}$ , where $ \mathtt{u}$ is the newly created node that contains $ \mathtt{x}$ . However, a special case occurs when $ \ensuremath{\mathtt{n}}=0$ , in which case $ \ensuremath{\mathtt{tail}}=\ensuremath{\mathtt{head}}=\ensuremath{\mathtt{null}}$ . In this case, both $ \mathtt{tail}$ and $ \mathtt{head}$ are set to $ \mathtt{u}$ .

```
    boolean add(T x) {
        Node u = new Node();
        u.x = x;
        if (n == 0) {
            head = u;
        } else {
            tail.next = u;
        }
        tail = u;
        n++;
        return true;
    }
```

Clearly, both $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ take constant time. 3.1.2 Summary The following theorem summarizes the performance of an SLList: **Theorem 3..1** *An SLList implements the Stack and (FIFO) Queue interfaces. The $ \mathtt{push(x)}$ , $ \mathtt{pop()}$ , $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ operations run in $ O(1)$ time per operation.*

An SLList nearly implements the full set of Deque operations. The only missing operation is removing from the tail of an SLList. Removing from the tail of an SLList is difficult because it requires updating the value of $ \mathtt{tail}$ so that it points to the node $ \mathtt{w}$ that precedes $ \mathtt{tail}$ in the SLList; this is the node $ \mathtt{w}$ such that $ \ensuremath{\mathtt{w.next}}=\ensuremath{\mathtt{tail}}$ . Unfortunately, the only way to get to $ \mathtt{w}$ is by traversing the SLList starting at $ \mathtt{head}$ and taking $ \ensuremath{\mathtt{n}}-2$ steps. [opendatastructures.org](http://opendatastructures.org/)

## 3.2 DLList: A Doubly-Linked List

**Subsections**

# 3.2 DLList: A Doubly-Linked List

A DLList (doubly-linked list) is very similar to an SLList except that each node $ \mathtt{u}$ in a DLList has references to both the node $ \mathtt{u.next}$ that follows it and the node $ \mathtt{u.prev}$ that precedes it.

```
    class Node {
        T x;
        Node prev, next;
    }
```

When implementing an SLList, we saw that there were always several special cases to worry about. For example, removing the last element from an SLList or adding an element to an empty SLList requires care to ensure that $ \mathtt{head}$ and $ \mathtt{tail}$ are correctly updated. In a DLList, the number of these special cases increases considerably. Perhaps the cleanest way to take care of all these special cases in a DLList is to introduce a $ \mathtt{dummy}$ node. This is a node that does not contain any data, but acts as a placeholder so that there are no special nodes; every node has both a $ \mathtt{next}$ and a $ \mathtt{prev}$ , with $ \mathtt{dummy}$ acting as the node that follows the last node in the list and that precedes the first node in the list. In this way, the nodes of the list are (doubly-)linked into a cycle, as illustrated in Figure 3.2.

```
    int n;
    Node dummy;
    DLList() {
        dummy = new Node();
        dummy.next = dummy;
        dummy.prev = dummy;
        n = 0;
    }
```

Finding the node with a particular index in a DLList is easy; we can either start at the head of the list ( $ \mathtt{dummy.next}$ ) and work forward, or start at the tail of the list ( $ \mathtt{dummy.prev}$ ) and work backward. This allows us to reach the $ \mathtt{i}$ th node in $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ time:

```
    Node getNode(int i) {
        Node p = null;
        if (i < n / 2) {
            p = dummy.next;
            for (int j = 0; j < i; j++)
                p = p.next;
        } else {
            p = dummy;
            for (int j = n; j > i; j--)
                p = p.prev;
        }
        return p;
    }
```

The $ \mathtt{get(i)}$ and $ \mathtt{set(i,x)}$ operations are now also easy. We first find the $ \mathtt{i}$ th node and then get or set its $ \mathtt{x}$ value:

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        return getNode(i).x;
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Node u = getNode(i);
        T y = u.x;
        u.x = x;
        return y;
    }
```

The running time of these operations is dominated by the time it takes to find the $ \mathtt{i}$ th node, and is therefore $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ .

## 3.2.1 Adding and Removing

If we have a reference to a node $ \mathtt{w}$ in a DLList and we want to insert a node $ \mathtt{u}$ before $ \mathtt{w}$ , then this is just a matter of setting $ \ensuremath{\mathtt{u.next}}=\ensuremath{\mathtt{w}}$ , $ \ensuremath{\mathtt{u.prev}}=\ensuremath{\mathtt{w.prev}}$ , and then adjusting $ \mathtt{u.prev.next}$ and $ \mathtt{u.next.prev}$ . (See Figure 3.3.) Thanks to the dummy node, there is no need to worry about $ \mathtt{w.prev}$ or $ \mathtt{w.next}$ not existing.

```
    Node addBefore(Node w, T x) {
        Node u = new Node();
        u.x = x;
        u.prev = w.prev;
        u.next = w;
        u.next.prev = u;
        u.prev.next = u;
        n++;
        return u;
    }
```

Now, the list operation $ \mathtt{add(i,x)}$ is trivial to implement. We find the $ \mathtt{i}$ th node in the DLList and insert a new node $ \mathtt{u}$ that contains $ \mathtt{x}$ just before it.

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        addBefore(getNode(i), x);
    }
```

The only non-constant part of the running time of $ \mathtt{add(i,x)}$ is the time it takes to find the $ \mathtt{i}$ th node (using $ \mathtt{getNode(i)}$ ). Thus, $ \mathtt{add(i,x)}$ runs in $ O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ time. Removing a node $ \mathtt{w}$ from a DLList is easy. We only need to adjust pointers at $ \mathtt{w.next}$ and $ \mathtt{w.prev}$ so that they skip over $ \mathtt{w}$ . Again, the use of the dummy node eliminates the need to consider any special cases:

```
    void remove(Node w) {
        w.prev.next = w.next;
        w.next.prev = w.prev;
        n--;
    }
```

Now the $ \mathtt{remove(i)}$ operation is trivial. We find the node with index $ \mathtt{i}$ and remove it:

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Node w = getNode(i);
        remove(w);
        return w.x;
    }
```

Again, the only expensive part of this operation is finding the $ \mathtt{i}$ th node using $ \mathtt{getNode(i)}$ , so $ \mathtt{remove(i)}$ runs in $ O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ time. 3.2.2 Summary The following theorem summarizes the performance of a DLList: **Theorem 3..2** *A DLList implements the List interface. In this implementation, the $ \mathtt{get(i)}$ , $ \mathtt{set(i,x)}$ , $ \mathtt{add(i,x)}$ and $ \mathtt{remove(i)}$ operations run in $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ time per operation.*

It is worth noting that, if we ignore the cost of the $ \mathtt{getNode(i)}$ operation, then all operations on a DLList take constant time. Thus, the only expensive part of operations on a DLList is finding the relevant node. Once we have the relevant node, adding, removing, or accessing the data at that node takes only constant time. This is in sharp contrast to the array-based List implementations of Chapter 2; in those implementations, the relevant array item can be found in constant time. However, addition or removal requires shifting elements in the array and, in general, takes non-constant time. For this reason, linked list structures are well-suited to applications where references to list nodes can be obtained through external means. An example of this is the LinkedHashSet data structure found in the Java Collections Framework, in which a set of items is stored in a doubly-linked list and the nodes of the doubly-linked list are stored in a hash table (discussed in Chapter 5). When elements are removed from a LinkedHashSet, the hash table is used to find the relevant list node in constant time and then the list node is deleted (also in constant time). [opendatastructures.org](http://opendatastructures.org/)

## 3.3 SEList: A Space-Efficient Linked List

**Subsections**

# 3.3 SEList: A Space-Efficient Linked List

One of the drawbacks of linked lists (besides the time it takes to access elements that are deep within the list) is their space usage. Each node in a DLList requires an additional two references to the next and previous nodes in the list. Two of the fields in a Node are dedicated to maintaining the list, and only one of the fields is for storing data! An SEList (space-efficient list) reduces this wasted space using a simple idea: Rather than store individual elements in a DLList, we store a block (array) containing several items. More precisely, an SEList is parameterized by a block size $ \mathtt{b}$ . Each individual node in an SEList stores a block that can hold up to $ \mathtt{b+1}$ elements. For reasons that will become clear later, it will be helpful if we can do Deque operations on each block. The data structure that we choose for this is a BDeque (bounded deque), derived from the ArrayDeque structure described in Section 2.4. The BDeque differs from the ArrayDeque in one small way: When a new BDeque is created, the size of the backing array $ \mathtt{a}$ is fixed at $ \mathtt{b+1}$ and never grows or shrinks. The important property of a BDeque is that it allows for the addition or removal of elements at either the front or back in constant time. This will be useful as elements are shifted from one block to another.

```
    class BDeque extends ArrayDeque<T> {
        BDeque() {
            super(SEList.this.type());
            a = newArray(b+1);
        }
        void resize() { }
    }
```

An SEList is then a doubly-linked list of blocks:

```
    class Node {
        BDeque d;
        Node prev, next;
    }
```

```
    int n;
    Node dummy;
```

3.3.1 Space Requirements An SEList places very tight restrictions on the number of elements in a block: Unless a block is the last block, then that block contains at least $ \ensuremath{\mathtt{b}}-1$ and at most $ \ensuremath{\mathtt{b}}+1$ elements. This means that, if an SEList contains $ \mathtt{n}$ elements, then it has at most

![$\displaystyle \ensuremath{\mathtt{n}}/(\ensuremath{\mathtt{b}}-1) + 1 = O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}}) $](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1306.png.webp)

blocks. The BDeque for each block contains an array of length $ \ensuremath{\mathtt{b}}+1$ but, for every block except the last, at most a constant amount of space is wasted in this array. The remaining memory used by a block is also constant. This means that the wasted space in an SEList is only $ O(\ensuremath{\mathtt{b}}+\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}})$ . By choosing a value of $ \mathtt{b}$ within a constant factor of $ \sqrt{\ensuremath{\mathtt{n}}}$ , we can make the space-overhead of an SEList approach the $ \sqrt{\ensuremath{\mathtt{n}}}$ lower bound given in Section 2.6.2.

## 3.3.2 Finding Elements

The first challenge we face with an SEList is finding the list item with a given index $ \mathtt{i}$ . Note that the location of an element consists of two parts:

1. The node $ \mathtt{u}$ that contains the block that contains the element with index $ \mathtt{i}$ ; and
2. the index $ \mathtt{j}$ of the element within its block.

```
    class Location {
        Node u;
        int j;
        Location(Node u, int j) {
            this.u = u;
            this.j = j;
        }
    }
```

To find the block that contains a particular element, we proceed the same way as we do in a DLList. We either start at the front of the list and traverse in the forward direction, or at the back of the list and traverse backwards until we reach the node we want. The only difference is that, each time we move from one node to the next, we skip over a whole block of elements.

```
    Location getLocation(int i) {
        if (i < n/2) {
            Node u = dummy.next;
            while (i >= u.d.size()) {
                i -= u.d.size();
                u = u.next;
            }
            return new Location(u, i);
        } else {
            Node u = dummy;
            int idx = n;
            while (i < idx) {
                u = u.prev;
                idx -= u.d.size();
            }
            return new Location(u, i-idx);
        }
    }
```

Remember that, with the exception of at most one block, each block contains at least $ \ensuremath{\mathtt{b}}-1$ elements, so each step in our search gets us $ \ensuremath{\mathtt{b}}-1$ elements closer to the element we are looking for. If we are searching forward, this means that we reach the node we want after $ O(1+\ensuremath{\mathtt{i}}/\ensuremath{\mathtt{b}})$ steps. If we search backwards, then we reach the node we want after $ O(1+(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})/\ensuremath{\mathtt{b}})$ steps. The algorithm takes the smaller of these two quantities depending on the value of $ \mathtt{i}$ , so the time to locate the item with index $ \mathtt{i}$ is $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ . Once we know how to locate the item with index $ \mathtt{i}$ , the $ \mathtt{get(i)}$ and $ \mathtt{set(i,x)}$ operations translate into getting or setting a particular index in the correct block:

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Location l = getLocation(i);
        return l.u.d.get(l.j);
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Location l = getLocation(i);
        T y = l.u.d.get(l.j);
        l.u.d.set(l.j,x);
        return y;
    }
```

The running times of these operations are dominated by the time it takes to locate the item, so they also run in $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ time.

## 3.3.3 Adding an Element

Adding elements to an SEList is a little more complicated. Before considering the general case, we consider the easier operation, $ \mathtt{add(x)}$ , in which $ \mathtt{x}$ is added to the end of the list. If the last block is full (or does not exist because there are no blocks yet), then we first allocate a new block and append it to the list of blocks. Now that we are sure that the last block exists and is not full, we append $ \mathtt{x}$ to the last block.

```
    boolean add(T x) {
        Node last = dummy.prev;
        if (last == dummy || last.d.size() == b+1) {
            last = addBefore(dummy);
        }
        last.d.add(x);
        n++;
        return true;
    }
```

Things get more complicated when we add to the interior of the list using $ \mathtt{add(i,x)}$ . We first locate $ \mathtt{i}$ to get the node $ \mathtt{u}$ whose block contains the $ \mathtt{i}$ th list item. The problem is that we want to insert $ \mathtt{x}$ into $ \mathtt{u}$ 's block, but we have to be prepared for the case where $ \mathtt{u}$ 's block already contains $ \ensuremath{\mathtt{b}}+1$ elements, so that it is full and there is no room for $ \mathtt{x}$ . Let $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ denote $ \mathtt{u}$ , $ \mathtt{u.next}$ , $ \mathtt{u.next.next}$ , and so on. We explore $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ looking for a node that can provide space for $ \mathtt{x}$ . Three cases can occur during our space exploration (see Figure 3.4):

|  | ![\includegraphics[width=\textwidth ]{figs/selist-add-a}](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1345.png.webp) |  |
| --- | --- | --- |
|  | ![\includegraphics[width=\textwidth ]{figs/selist-add-b}](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1346.png.webp) |  |
|  | ![\includegraphics[width=\textwidth ]{figs/selist-add-c}](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1347.png.webp) |  |

1. We quickly (in $ r+1\le \ensuremath{\mathtt{b}}$ steps) find a node $ \ensuremath{\mathtt{u}}_r$ whose block is not full. In this case, we perform $ r$ shifts of an element from one block into the next, so that the free space in $ \ensuremath{\mathtt{u}}_r$ becomes a free space in $ \ensuremath{\mathtt{u}}_0$ . We can then insert $ \mathtt{x}$ into $ \ensuremath{\mathtt{u}}_0$ 's block.
2. We quickly (in $ r+1\le \ensuremath{\mathtt{b}}$ steps) run off the end of the list of blocks. In this case, we add a new empty block to the end of the list of blocks and proceed as in the first case.
3. After $ \mathtt{b}$ steps we do not find any block that is not full. In this case, $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ is a sequence of $ \mathtt{b}$ blocks that each contain $ \ensuremath{\mathtt{b}}+1$ elements. We insert a new block $ \ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}}$ at the end of this sequence and spread the original $ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)$ elements so that each block of $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}}$ contains exactly $ \mathtt{b}$ elements. Now $ \ensuremath{\mathtt{u}}_0$ 's block contains only $ \mathtt{b}$ elements so it has room for us to insert $ \mathtt{x}$ .

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (i == n) {
            add(x);
            return;
        }
        Location l = getLocation(i);
        Node u = l.u;
        int r = 0;
        while (r < b && u != dummy && u.d.size() == b+1) {
            u = u.next;
            r++;
        }
        if (r == b) {      // b blocks each with b+1 elements
            spread(l.u);
            u = l.u;
        } 
        if (u == dummy) {  // ran off the end - add new node
            u = addBefore(u);
        }
        while (u != l.u) { // work backwards, shifting elements
            u.d.add(0, u.prev.d.remove(u.prev.d.size()-1));
            u = u.prev;
        }
        u.d.add(l.j, x);
        n++;
    }
```

The running time of the $ \mathtt{add(i,x)}$ operation depends on which of the three cases above occurs. Cases 1 and 2 involve examining and shifting elements through at most $ \mathtt{b}$ blocks and take $ O(\ensuremath{\mathtt{b}})$ time. Case 3 involves calling the $ \mathtt{spread(u)}$ method, which moves $ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)$ elements and takes $ O(\ensuremath{\mathtt{b}}^2)$ time. If we ignore the cost of Case 3 (which we will account for later with amortization) this means that the total running time to locate $ \mathtt{i}$ and perform the insertion of $ \mathtt{x}$ is $ O(\ensuremath{\mathtt{b}}+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ .

## 3.3.4 Removing an Element

Removing an element from an SEList is similar to adding an element. We first locate the node $ \mathtt{u}$ that contains the element with index $ \mathtt{i}$ . Now, we have to be prepared for the case where we cannot remove an element from $ \mathtt{u}$ without causing $ \mathtt{u}$ 's block to become smaller than $ \ensuremath{\mathtt{b}}-1$ . Again, let $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ denote $ \mathtt{u}$ , $ \mathtt{u.next}$ , $ \mathtt{u.next.next}$ , and so on. We examine $ \ensuremath{\mathtt{u}}_0,\ensuremath{\mathtt{u}}_1,\ensuremath{\mathtt{u}}_2,\ldots$ in order to look for a node from which we can borrow an element to make the size of $ \ensuremath{\mathtt{u}}_0$ 's block at least $ \ensuremath{\mathtt{b}}-1$ . There are three cases to consider (see Figure 3.5):

| ![\includegraphics[scale=0.90909]{figs/selist-remove-a}](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1390.png.webp) |
| --- |
| ![\includegraphics[scale=0.90909]{figs/selist-remove-b}](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1391.png.webp) |
| ![\includegraphics[scale=0.90909]{figs/selist-remove-c}](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1392.png.webp) |

1. We quickly (in $ r+1\le \ensuremath{\mathtt{b}}$ steps) find a node whose block contains more than $ \ensuremath{\mathtt{b}}-1$ elements. In this case, we perform $ r$ shifts of an element from one block into the previous one, so that the extra element in $ \ensuremath{\mathtt{u}}_r$ becomes an extra element in $ \ensuremath{\mathtt{u}}_0$ . We can then remove the appropriate element from $ \ensuremath{\mathtt{u}}_0$ 's block.
2. We quickly (in $ r+1\le \ensuremath{\mathtt{b}}$ steps) run off the end of the list of blocks. In this case, $ \ensuremath{\mathtt{u}}_r$ is the last block, and there is no need for $ \ensuremath{\mathtt{u}}_r$ 's block to contain at least $ \ensuremath{\mathtt{b}}-1$ elements. Therefore, we proceed as above, borrowing an element from $ \ensuremath{\mathtt{u}}_r$ to make an extra element in $ \ensuremath{\mathtt{u}}_0$ . If this causes $ \ensuremath{\mathtt{u}}_r$ 's block to become empty, then we remove it.
3. After $ \mathtt{b}$ steps, we do not find any block containing more than $ \ensuremath{\mathtt{b}}-1$ elements. In this case, $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ is a sequence of $ \mathtt{b}$ blocks that each contain $ \ensuremath{\mathtt{b}}-1$ elements. We gather these $ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}-1)$ elements into $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-2}$ so that each of these $ \ensuremath{\mathtt{b}}-1$ blocks contains exactly $ \mathtt{b}$ elements and we remove $ \ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ , which is now empty. Now $ \ensuremath{\mathtt{u}}_0$ 's block contains $ \mathtt{b}$ elements and we can then remove the appropriate element from it.

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        Location l = getLocation(i);
        T y = l.u.d.get(l.j);
        Node u = l.u;
        int r = 0;
        while (r < b && u != dummy && u.d.size() == b-1) {
            u = u.next;
            r++;
        }
        if (r == b) {  // b blocks each with b-1 elements
            gather(l.u);
        }
        u = l.u;
        u.d.remove(l.j);
        while (u.d.size() < b-1 && u.next != dummy) {
            u.d.add(u.next.d.remove(0));
            u = u.next;
        }
        if (u.d.isEmpty()) remove(u);
        n--;
        return y;
    }
```

Like the $ \mathtt{add(i,x)}$ operation, the running time of the $ \mathtt{remove(i)}$ operation is $ O(\ensuremath{\mathtt{b}}+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ if we ignore the cost of the $ \mathtt{gather(u)}$ method that occurs in Case 3.

## 3.3.5 Amortized Analysis of Spreading and Gathering

Next, we consider the cost of the $ \mathtt{gather(u)}$ and $ \mathtt{spread(u)}$ methods that may be executed by the $ \mathtt{add(i,x)}$ and $ \mathtt{remove(i)}$ methods. For the sake of completeness, here they are:

```
    void spread(Node u) {
        Node w = u;
        for (int j = 0; j < b; j++) {
            w = w.next;
        }
        w = addBefore(w);
        while (w != u) {
            while (w.d.size() < b)
                w.d.add(0,w.prev.d.remove(w.prev.d.size()-1));
            w = w.prev;
        }
    }
```

```
    void gather(Node u) {
        Node w = u;
        for (int j = 0; j < b-1; j++) {
            while (w.d.size() < b)
                w.d.add(w.next.d.remove(0));
            w = w.next;
        }
        remove(w);
    }
```

The running time of each of these methods is dominated by the two nested loops. Both the inner and outer loops execute at most $ \ensuremath{\mathtt{b}}+1$ times, so the total running time of each of these methods is $ O((\ensuremath{\mathtt{b}}+1)^2)=O(\ensuremath{\mathtt{b}}^2)$ . However, the following lemma shows that these methods execute on at most one out of every $ \mathtt{b}$ calls to $ \mathtt{add(i,x)}$ or $ \mathtt{remove(i)}$ . **Lemma 3..1** *If an empty SEList is created and any sequence of $ m\ge 1$ calls to $ \mathtt{add(i,x)}$ and $ \mathtt{remove(i)}$ is performed, then the total time spent during all calls to $ \mathtt{spread()}$ and $ \mathtt{gather()}$ is $ O(\ensuremath{\mathtt{b}}m)$ .*

*Proof*. We will use the potential method of amortized analysis. We say that a node $ \mathtt{u}$ is fragile if $ \mathtt{u}$ 's block does not contain $ \mathtt{b}$ elements (so that $ \mathtt{u}$ is either the last node, or contains $ \ensuremath{\mathtt{b}}-1$ or $ \ensuremath{\mathtt{b}}+1$ elements). Any node whose block contains $ \mathtt{b}$ elements is rugged. Define the potential of an SEList as the number of fragile nodes it contains. We will consider only the $ \mathtt{add(i,x)}$ operation and its relation to the number of calls to $ \mathtt{spread(u)}$ . The analysis of $ \mathtt{remove(i)}$ and $ \mathtt{gather(u)}$ is identical.

Notice that, if Case 1 occurs during the $ \mathtt{add(i,x)}$ method, then only one node, $ \ensuremath{\mathtt{u}}_r$ has the size of its block changed. Therefore, at most one node, namely $ \ensuremath{\mathtt{u}}_r$ , goes from being rugged to being fragile. If Case 2 occurs, then a new node is created, and this node is fragile, but no other node changes size, so the number of fragile nodes increases by one. Thus, in either Case 1 or Case 2 the potential of the SEList increases by at most one. Finally, if Case 3 occurs, it is because $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_{\ensuremath{\mathtt{b}}-1}$ are all fragile nodes. Then $ \ensuremath{\mathtt{spread(}}u_0\ensuremath{\mathtt{)}}$ is called and these $ \mathtt{b}$ fragile nodes are replaced with $ \ensuremath{\mathtt{b}}+1$ rugged nodes. Finally, $ \mathtt{x}$ is added to $ \ensuremath{\mathtt{u}}_0$ 's block, making $ \ensuremath{\mathtt{u}}_0$ fragile. In total the potential decreases by $ \ensuremath{\mathtt{b}}-1$ . In summary, the potential starts at 0 (there are no nodes in the list). Each time Case 1 or Case 2 occurs, the potential increases by at most 1. Each time Case 3 occurs, the potential decreases by $ \ensuremath{\mathtt{b}}-1$ . The potential (which counts the number of fragile nodes) is never less than 0. We conclude that, for every occurrence of Case 3, there are at least $ \ensuremath{\mathtt{b}}-1$ occurrences of Case 1 or Case 2. Thus, for every call to $ \mathtt{spread(u)}$ there are at least $ \mathtt{b}$ calls to $ \mathtt{add(i,x)}$ . This completes the proof. ![$ \qedsymbol$](/images/open-data-structures/3_3_SEList_Space_Efficient_-img1439.png.webp)

3.3.6 Summary The following theorem summarizes the performance of the SEList data structure: **Theorem 3..3** *An SEList implements the List interface. Ignoring the cost of calls to $ \mathtt{spread(u)}$ and $ \mathtt{gather(u)}$ , an SEList with block size $ \mathtt{b}$ supports the operations * $ \mathtt{get(i)}$ and $ \mathtt{set(i,x)}$ in $ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ time per operation; and $ \mathtt{add(i,x)}$ and $ \mathtt{remove(i)}$ in $ O(\ensuremath{\mathtt{b}}+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\}/\ensuremath{\mathtt{b}})$ time per operation. * Furthermore, beginning with an empty SEList, any sequence of $ m$ $ \mathtt{add(i,x)}$ and $ \mathtt{remove(i)}$ operations results in a total of $ O(\ensuremath{\mathtt{b}}m)$ time spent during all calls to $ \mathtt{spread(u)}$ and $ \mathtt{gather(u)}$ . * *The space (measured in words)3.1 used by an SEList that stores $ \mathtt{n}$ elements is $ \ensuremath{\mathtt{n}} +O(\ensuremath{\mathtt{b}} + \ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}})$ .*

The SEList is a trade-off between an ArrayList and a DLList where the relative mix of these two structures depends on the block size $ \mathtt{b}$ . At the extreme $ \ensuremath{\mathtt{b}}=2$ , each SEList node stores at most three values, which is not much different than a DLList. At the other extreme, $ \ensuremath{\mathtt{b}}>\ensuremath{\mathtt{n}}$ , all the elements are stored in a single array, just like in an ArrayList. In between these two extremes lies a trade-off between the time it takes to add or remove a list item and the time it takes to locate a particular list item.

#### Footnotes

... words)3.1 Recall Section 1.4 for a discussion of how memory is measured. [opendatastructures.org](http://opendatastructures.org/)

## 3.4 Discussion and Exercises

Both singly-linked and doubly-linked lists are established techniques, having been used in programs for over 40 years. They are discussed, for example, by Knuth [46, Sections 2.2.3-2.2.5]. Even the SEList data structure seems to be a well-known data structures exercise. The SEList is sometimes referred to as an unrolled linked list [69]. Another way to save space in a doubly-linked list is to use so-called XOR-lists. In an XOR-list, each node, $ \mathtt{u}$ , contains only one pointer, called $ \mathtt{u.nextprev}$ , that holds the bitwise exclusive-or of $ \mathtt{u.prev}$ and $ \mathtt{u.next}$ . The list itself needs to store two pointers, one to the $ \mathtt{dummy}$ node and one to $ \mathtt{dummy.next}$ (the first node, or $ \mathtt{dummy}$ if the list is empty). This technique uses the fact that, if we have pointers to $ \mathtt{u}$ and $ \mathtt{u.prev}$ , then we can extract $ \mathtt{u.next}$ using the formula

![$\displaystyle \ensuremath{\mathtt{u.next}} = \ensuremath{\mathtt{u.prev}} \verb+^+ \ensuremath{\mathtt{u.nextprev}} \enspace . $](/images/open-data-structures/3_4_Discussion_Exercises-img1497.png.webp)

(Here `^` computes the bitwise exclusive-or of its two arguments.) This technique complicates the code a little and is not possible in some languages, like Java and Python, that have garbage collection but gives a doubly-linked list implementation that requires only one pointer per node. See Sinha's magazine article [70] for a detailed discussion of XOR-lists.

**Exercise 3..1** Why is it not possible to use a dummy node in an SLList to avoid all the special cases that occur in the operations $ \mathtt{push(x)}$ , $ \mathtt{pop()}$ , $ \mathtt{add(x)}$ , and $ \mathtt{remove()}$ ?

**Exercise 3..2** Design and implement an SLList method, $ \mathtt{secondLast()}$ , that returns the second-last element of an SLList. Do this without using the member variable, $ \mathtt{n}$ , that keeps track of the size of the list.

**Exercise 3..3** Implement the List operations $ \mathtt{get(i)}$ , $ \mathtt{set(i,x)}$ , $ \mathtt{add(i,x)}$ and $ \mathtt{remove(i)}$ on an SLList. Each of these operations should run in $ O(1+\ensuremath{\mathtt{i}})$ time.

**Exercise 3..4** Design and implement an SLList method, $ \mathtt{reverse()}$ that reverses the order of elements in an SLList. This method should run in $ O(\ensuremath{\mathtt{n}})$ time, should not use recursion, should not use any secondary data structures, and should not create any new nodes.

**Exercise 3..5** Design and implement SLList and DLList methods called $ \mathtt{checkSize()}$ . These methods walk through the list and count the number of nodes to see if this matches the value, $ \mathtt{n}$ , stored in the list. These methods return nothing, but throw an exception if the size they compute does not match the value of $ \mathtt{n}$ .

**Exercise 3..6** Try to recreate the code for the $ \mathtt{addBefore(w)}$ operation that creates a node, $ \mathtt{u}$ , and adds it in a DLList just before the node $ \mathtt{w}$ . Do not refer to this chapter. Even if your code does not exactly match the code given in this book it may still be correct. Test it and see if it works.

The next few exercises involve performing manipulations on DLLists. You should complete them without allocating any new nodes or temporary arrays. They can all be done only by changing the $ \mathtt{prev}$ and $ \mathtt{next}$ values of existing nodes. **Exercise 3..7** Write a DLList method $ \mathtt{isPalindrome()}$ that returns $ \mathtt{true}$ if the list is a palindrome, i.e., the element at position $ \mathtt{i}$ is equal to the element at position $ \ensuremath{\mathtt{n}}-i-1$ for all $ i\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ . Your code should run in $ O(\ensuremath{\mathtt{n}})$ time.

**Exercise 3..8** Implement a method $ \mathtt{rotate(r)}$ that ``rotates'' a DLList so that list item $ \mathtt{i}$ becomes list item $ (\ensuremath{\mathtt{i}}+\ensuremath{\mathtt{r}})\bmod \ensuremath{\mathtt{n}}$ . This method should run in $ O(1+\min\{\ensuremath{\mathtt{r}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{r}}\})$ time and should not modify any nodes in the list.

**Exercise 3..9** Write a method, $ \mathtt{truncate(i)}$ , that truncates a DLList at position $ \mathtt{i}$ . After executing this method, the size of the list will be $ \mathtt{i}$ and it should contain only the elements at indices $ 0,\ldots,\ensuremath{\mathtt{i}}-1$ . The return value is another DLList that contains the elements at indices $ \ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{n}}-1$ . This method should run in $ O(\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$ time.

**Exercise 3..10** Write a DLList method, $ \mathtt{absorb(l2)}$ , that takes as an argument a DLList, $ \mathtt{l2}$ , empties it and appends its contents, in order, to the receiver. For example, if $ \mathtt{l1}$ contains $ a,b,c$ and $ \mathtt{l2}$ contains $ d,e,f$ , then after calling $ \mathtt{l1.absorb(l2)}$ , $ \mathtt{l1}$ will contain $ a,b,c,d,e,f$ and $ \mathtt{l2}$ will be empty.

**Exercise 3..11** Write a method $ \mathtt{deal()}$ that removes all the elements with odd-numbered indices from a DLList and return a DLList containing these elements. For example, if $ \mathtt{l1}$ , contains the elements $ a,b,c,d,e,f$ , then after calling $ \mathtt{l1.deal()}$ , $ \mathtt{l1}$ should contain $ a,c,e$ and a list containing $ b,d,f$ should be returned.

**Exercise 3..12** Write a method, $ \mathtt{reverse()}$ , that reverses the order of elements in a DLList.

**Exercise 3..13** This exercise walks you through an implementation of the merge-sort algorithm for sorting a DLList, as discussed in Section 11.1.1. In your implementation, perform comparisons between elements using the $ \mathtt{compareTo(x)}$ method so that the resulting implementation can sort any DLList containing elements that implement the Comparable interface. Write a DLList method called $ \mathtt{takeFirst(l2)}$ . This method takes the first node from $ \mathtt{l2}$ and appends it to the the receiving list. This is equivalent to $ \mathtt{add(size(),l2.remove(0))}$ , except that it should not create a new node. Write a DLList static method, $ \mathtt{merge(l1,l2)}$ , that takes two sorted lists $ \mathtt{l1}$ and $ \mathtt{l2}$ , merges them, and returns a new sorted list containing the result. This causes $ \mathtt{l1}$ and $ \mathtt{l2}$ to be emptied in the proces. For example, if $ \mathtt{l1}$ contains $ a,c,d$ and $ \mathtt{l2}$ contains $ b,e,f$ , then this method returns a new list containing $ a,b,c,d,e,f$ . Write a DLList method $ \mathtt{sort()}$ that sorts the elements contained in the list using the merge sort algorithm. This recursive algorithm works in the following way: If the list contains 0 or 1 elements then there is nothing to do. Otherwise, Using the $ \mathtt{truncate(size()/2)}$ method, split the list into two lists of approximately equal length, $ \mathtt{l1}$ and $ \mathtt{l2}$ ; Recursively sort $ \mathtt{l1}$ ; Recursively sort $ \mathtt{l2}$ ; and, finally, Merge $ \mathtt{l1}$ and $ \mathtt{l2}$ into a single sorted list.

The next few exercises are more advanced and require a clear understanding of what happens to the minimum value stored in a Stack or Queue as items are added and removed. **Exercise 3..14** Design and implement a MinStack data structure that can store comparable elements and supports the stack operations $ \mathtt{push(x)}$ , $ \mathtt{pop()}$ , and $ \mathtt{size()}$ , as well as the $ \mathtt{min()}$ operation, which returns the minimum value currently stored in the data structure. All operations should run in constant time.

**Exercise 3..15** Design and implement a MinQueue data structure that can store comparable elements and supports the queue operations $ \mathtt{add(x)}$ , $ \mathtt{remove()}$ , and $ \mathtt{size()}$ , as well as the $ \mathtt{min()}$ operation, which returns the minimum value currently stored in the data structure. All operations should run in constant amortized time.

**Exercise 3..16** Design and implement a MinDeque data structure that can store comparable elements and supports all the deque operations $ \mathtt{addFirst(x)}$ , $ \mathtt{addLast(x)}$ $ \mathtt{removeFirst()}$ , $ \mathtt{removeLast()}$ and $ \mathtt{size()}$ , and the $ \mathtt{min()}$ operation, which returns the minimum value currently stored in the data structure. All operations should run in constant amortized time.

The next exercises are designed to test the reader's understanding of the implementation and analysis of the space-efficient SEList: **Exercise 3..17** Prove that, if an SEList is used like a Stack (so that the only modifications to the SEList are done using $ \ensuremath{\mathtt{push(x)}}\equiv \ensuremath{\mathtt{add(size(),x)}}$ and $ \ensuremath{\mathtt{pop()}}\equiv \ensuremath{\mathtt{remove(size()-1)}}$ ), then these operations run in constant amortized time, independent of the value of $ \mathtt{b}$ .

**Exercise 3..18** Design and implement of a version of an SEList that supports all the Deque operations in constant amortized time per operation, independent of the value of $ \mathtt{b}$ .

**Exercise 3..19** Explain how to use the bitwise exclusive-or operator, `^`, to swap the values of two $ \mathtt{int}$ variables without using a third variable.

[opendatastructures.org](http://opendatastructures.org/)
