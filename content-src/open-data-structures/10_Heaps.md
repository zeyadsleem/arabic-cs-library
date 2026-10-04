---
title: "10. Heaps"
lang: en
---

In this chapter, we discuss two implementations of the extremely useful priority Queue data structure. Both of these structures are a special kind of binary tree called a heap, which means ``a disorganized pile.'' This is in contrast to binary search trees that can be thought of as a highly organized pile. The first heap implementation uses an array to simulate a complete binary tree. This very fast implementation is the basis of one of the fastest known sorting algorithms, namely heapsort (see Section 11.1.3). The second implementation is based on more flexible binary trees. It supports a $ \mathtt{meld(h)}$ operation that allows the priority queue to absorb the elements of a second priority queue $ \mathtt{h}$ .

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 10.1 BinaryHeap: An Implicit Binary Tree

**Subsections**

# 10.1 BinaryHeap: An Implicit Binary Tree

Our first implementation of a (priority) Queue is based on a technique that is over four hundred years old. Eytzinger's method allows us to represent a complete binary tree as an array by laying out the nodes of the tree in breadth-first order (see Section 6.1.2). In this way, the root is stored at position 0, the root's left child is stored at position 1, the root's right child at position 2, the left child of the left child of the root is stored at position 3, and so on. See Figure 10.1.

If we apply Eytzinger's method to a sufficiently large tree, some patterns emerge. The left child of the node at index $ \mathtt{i}$ is at index $ \ensuremath{\mathtt{left(i)}}=2\ensuremath{\mathtt{i}}+1$ and the right child of the node at index $ \mathtt{i}$ is at index $ \ensuremath{\mathtt{right(i)}}=2\ensuremath{\mathtt{i}}+2$ . The parent of the node at index $ \mathtt{i}$ is at index $ \ensuremath{\mathtt{parent(i)}}=(\ensuremath{\mathtt{i}}-1)/2$ .

```
    int left(int i) {
        return 2*i + 1;
    }
    int right(int i) {
        return 2*i + 2;
    }
    int parent(int i) {
        return (i-1)/2;
    }
```

A BinaryHeap uses this technique to implicitly represent a complete binary tree in which the elements are heap-ordered: The value stored at any index $ \mathtt{i}$ is not smaller than the value stored at index $ \mathtt{parent(i)}$ , with the exception of the root value, $ \ensuremath{\mathtt{i}}=0$ . It follows that the smallest value in the priority Queue is therefore stored at position 0 (the root). In a BinaryHeap, the $ \mathtt{n}$ elements are stored in an array $ \mathtt{a}$ :

```
    T[] a;
    int n;
```

Implementing the $ \mathtt{add(x)}$ operation is fairly straightforward. As with all array-based structures, we first check to see if $ \mathtt{a}$ is full (by checking if $ \ensuremath{\mathtt{a.length}}=\ensuremath{\mathtt{n}}$ ) and, if so, we grow $ \mathtt{a}$ . Next, we place $ \mathtt{x}$ at location $ \mathtt{a[n]}$ and increment $ \mathtt{n}$ . At this point, all that remains is to ensure that we maintain the heap property. We do this by repeatedly swapping $ \mathtt{x}$ with its parent until $ \mathtt{x}$ is no longer smaller than its parent. See Figure 10.2.

```
    boolean add(T x) {
        if (n + 1 > a.length) resize();
        a[n++] = x;
        bubbleUp(n-1);
        return true;
    }
    void bubbleUp(int i) {
        int p = parent(i);
        while (i > 0 && compare(a[i], a[p]) < 0) {
            swap(i,p);
            i = p;
            p = parent(i);
        }
    }
```

Implementing the $ \mathtt{remove()}$ operation, which removes the smallest value from the heap, is a little trickier. We know where the smallest value is (at the root), but we need to replace it after we remove it and ensure that we maintain the heap property. The easiest way to do this is to replace the root with the value $ \mathtt{a[n-1]}$ , delete that value, and decrement $ \mathtt{n}$ . Unfortunately, the new root element is now probably not the smallest element, so it needs to be moved downwards. We do this by repeatedly comparing this element to its two children. If it is the smallest of the three then we are done. Otherwise, we swap this element with the smallest of its two children and continue.

```
    T remove() {
        T x = a[0];
        a[0] = a[--n];
        trickleDown(0);
        if (3*n < a.length) resize();
        return x;
    }
    void trickleDown(int i) {
        do {
            int j = -1;
            int r = right(i);
            if (r < n && compare(a[r], a[i]) < 0) {
                int l = left(i);
                if (compare(a[l], a[r]) < 0) {
                    j = l;
                } else {
                    j = r;
                }
            } else {
                int l = left(i);
                if (l < n && compare(a[l], a[i]) < 0) {
                    j = l;
                }
            }
            if (j >= 0)    swap(i, j);
            i = j;
        } while (i >= 0);
    }
```

**Figure 10.3:** Removing the minimum value, 4, from a BinaryHeap. ![\includegraphics[height=.25\textheight ]{figs/heap-remove-1}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3867.png.webp) ![\includegraphics[height=.25\textheight ]{figs/heap-remove-2}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3868.png.webp) ![\includegraphics[height=.25\textheight ]{figs/heap-remove-3}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3869.png.webp) ![\includegraphics[height=.25\textheight ]{figs/heap-remove-4}](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3870.png.webp) As with other array-based structures, we will ignore the time spent in calls to $ \mathtt{resize()}$ , since these can be accounted for using the amortization argument from Lemma 2.1. The running times of both $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ then depend on the height of the (implicit) binary tree. Luckily, this is a complete binary tree; every level except the last has the maximum possible number of nodes. Therefore, if the height of this tree is $ h$ , then it has at least $ 2^h$ nodes. Stated another way

![$\displaystyle \ensuremath{\mathtt{n}} \ge 2^h \enspace . $](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3876.png.webp)

Taking logarithms on both sides of this equation gives

![$\displaystyle h \le \log \ensuremath{\mathtt{n}} \enspace . $](/images/open-data-structures/10_1_BinaryHeap_Implicit_Bi-img3877.png.webp)

Therefore, both the $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ operation run in $ O(\log \ensuremath{\mathtt{n}})$ time.

10.1.1 Summary The following theorem summarizes the performance of a BinaryHeap: **Theorem 10.1** *A BinaryHeap implements the (priority) Queue interface. Ignoring the cost of calls to $ \mathtt{resize()}$ , a BinaryHeap supports the operations $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ in $ O(\log \ensuremath{\mathtt{n}})$ time per operation. * *Furthermore, beginning with an empty BinaryHeap, any sequence of $ m$ $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ operations results in a total of $ O(m)$ time spent during all calls to $ \mathtt{resize()}$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 10.2 MeldableHeap: A Randomized Meldable Heap

**Subsections**

# 10.2 MeldableHeap: A Randomized Meldable Heap

In this section, we describe the MeldableHeap, a priority Queue implementation in which the underlying structure is also a heap-ordered binary tree. However, unlike a BinaryHeap in which the underlying binary tree is completely defined by the number of elements, there are no restrictions on the shape of the binary tree that underlies a MeldableHeap; anything goes. The $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ operations in a MeldableHeap are implemented in terms of the $ \mathtt{merge(h1,h2)}$ operation. This operation takes two heap nodes $ \mathtt{h1}$ and $ \mathtt{h2}$ and merges them, returning a heap node that is the root of a heap that contains all elements in the subtree rooted at $ \mathtt{h1}$ and all elements in the subtree rooted at $ \mathtt{h2}$ . The nice thing about a $ \mathtt{merge(h1,h2)}$ operation is that it can be defined recursively. See Figure 10.4. If either $ \mathtt{h1}$ or $ \mathtt{h2}$ is $ \mathtt{nil}$ , then we are merging with an empty set, so we return $ \mathtt{h2}$ or $ \mathtt{h1}$ , respectively. Otherwise, assume $ \ensuremath{\mathtt{h1.x}} \le \ensuremath{\mathtt{h2.x}}$ since, if $ \ensuremath{\mathtt{h1.x}} > \ensuremath{\mathtt{h2.x}}$ , then we can reverse the roles of $ \mathtt{h1}$ and $ \mathtt{h2}$ . Then we know that the root of the merged heap will contain $ \mathtt{h1.x}$ , and we can recursively merge $ \mathtt{h2}$ with $ \mathtt{h1.left}$ or $ \mathtt{h1.right}$ , as we wish. This is where randomization comes in, and we toss a coin to decide whether to merge $ \mathtt{h2}$ with $ \mathtt{h1.left}$ or $ \mathtt{h1.right}$ :

```
    Node<T> merge(Node<T> h1, Node<T> h2) {
        if (h1 == nil) return h2;
        if (h2 == nil) return h1;
        if (compare(h2.x, h1.x) < 0) return merge(h2, h1);
        // now we know h1.x <= h2.x
        if (rand.nextBoolean()) {
            h1.left = merge(h1.left, h2);
            h1.left.parent = h1;
        } else {
            h1.right = merge(h1.right, h2);
            h1.right.parent = h1;
        }
        return h1;
    }
```

In the next section, we show that $ \mathtt{merge(h1,h2)}$ runs in $ O(\log \ensuremath{\mathtt{n}})$ expected time, where $ \mathtt{n}$ is the total number of elements in $ \mathtt{h1}$ and $ \mathtt{h2}$ . With access to a $ \mathtt{merge(h1,h2)}$ operation, the $ \mathtt{add(x)}$ operation is easy. We create a new node $ \mathtt{u}$ containing $ \mathtt{x}$ and then merge $ \mathtt{u}$ with the root of our heap:

```
    boolean add(T x) {
        Node<T> u = newNode();
        u.x = x;
        r = merge(u, r);
        r.parent = nil;
        n++;
        return true;
    }
```

This takes $ O(\log (\ensuremath{\mathtt{n}}+1)) = O(\log \ensuremath{\mathtt{n}})$ expected time. The $ \mathtt{remove()}$ operation is similarly easy. The node we want to remove is the root, so we just merge its two children and make the result the root:

```
    T remove() {
        T x = r.x;
        r = merge(r.left, r.right);
        if (r != nil) r.parent = nil;
        n--;
        return x;
    }
```

Again, this takes $ O(\log \ensuremath{\mathtt{n}})$ expected time.

Additionally, a MeldableHeap can implement many other operations in $ O(\log \ensuremath{\mathtt{n}})$ expected time, including: $ \mathtt{remove(u)}$ : remove the node $ \mathtt{u}$ (and its key $ \mathtt{u.x}$ ) from the heap. $ \mathtt{absorb(h)}$ : add all the elements of the MeldableHeap $ \mathtt{h}$ to this heap, emptying $ \mathtt{h}$ in the process. Each of these operations can be implemented using a constant number of $ \mathtt{merge(h1,h2)}$ operations that each take $ O(\log \ensuremath{\mathtt{n}})$ expected time. 10.2.1 Analysis of $ \mathtt{merge(h1,h2)}$ The analysis of $ \mathtt{merge(h1,h2)}$ is based on the analysis of a random walk in a binary tree. A random walk in a binary tree starts at the root of the tree. At each step in the random walk, a coin is tossed and, depending on the result of this coin toss, the walk proceeds to the left or to the right child of the current node. The walk ends when it falls off the tree (the current node becomes $ \mathtt{nil}$ ). The following lemma is somewhat remarkable because it does not depend at all on the shape of the binary tree: **Lemma 10.1** *The expected length of a random walk in a binary tree with $ \mathtt{n}$ nodes is at most $ \mathtt{\log (n+1)}$ .*

*Proof*. The proof is by induction on $ \mathtt{n}$ . In the base case, $ \ensuremath{\mathtt{n}}=0$ and the walk has length $ 0=\log (\ensuremath{\mathtt{n}}+1)$ . Suppose now that the result is true for all non-negative integers $ \ensuremath{\mathtt{n}}'< \ensuremath{\mathtt{n}}$ .

Let $ \ensuremath{\mathtt{n}}_1$ denote the size of the root's left subtree, so that $ \ensuremath{\mathtt{n}}_2=\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{n}}_1-1$ is the size of the root's right subtree. Starting at the root, the walk takes one step and then continues in a subtree of size $ \ensuremath{\mathtt{n}}_1$ or $ \ensuremath{\mathtt{n}}_2$ . By our inductive hypothesis, the expected length of the walk is then

![$\displaystyle \mathrm{E}[W] = 1 + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_1+1) + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_2+1) \enspace , $](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3956.png.webp)

since each of $ \ensuremath{\mathtt{n}}_1$ and $ \ensuremath{\mathtt{n}}_2$ are less than $ \ensuremath{\mathtt{n}}$ . Since $ \log$ is a concave function, $ \mathrm{E}[W]$ is maximized when $ \ensuremath{\mathtt{n}}_1=\ensuremath{\mathtt{n}}_2=(\ensuremath{\mathtt{n}}-1)/2$ . Therefore, the expected number of steps taken by the random walk is

| $\displaystyle \mathrm{E}[W]$ | $\displaystyle = 1 + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_1+1) + \frac{1}{2}\log (\ensuremath{\mathtt{n}}_2+1)$ |  |
| --- | --- | --- |
|  | $\displaystyle \le 1 + \log ((\ensuremath{\mathtt{n}}-1)/2+1)$ |  |
|  | $\displaystyle = 1 + \log ((\ensuremath{\mathtt{n}}+1)/2)$ |  |
|  | $\displaystyle = \log (\ensuremath{\mathtt{n}}+1) \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3947.png.webp)

We make a quick digression to note that, for readers who know a little about information theory, the proof of Lemma 10.1 can be stated in terms of entropy.

*Proof*. [Information Theoretic Proof of Lemma 10.1] Let $ d_i$ denote the depth of the $ i$ th external node and recall that a binary tree with $ \mathtt{n}$ nodes has $ \mathtt{n+1}$ external nodes. The probability of the random walk reaching the $ i$ th external node is exactly $ p_i=1/2^{d_i}$ , so the expected length of the random walk is given by

![$\displaystyle H=\sum_{i=0}^{\ensuremath{\mathtt{n}}} p_id_i =\sum_{i=0}^{\ensu... ...og\left(2^{d_i}\right) = \sum_{i=0}^{\ensuremath{\mathtt{n}}}p_i\log({1/p_i}) $](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3975.png.webp)

The right hand side of this equation is easily recognizable as the entropy of a probability distribution over $ \ensuremath{\mathtt{n}}+1$ elements. A basic fact about the entropy of a distribution over $ \ensuremath{\mathtt{n}}+1$ elements is that it does not exceed $ \log(\ensuremath{\mathtt{n}}+1)$ , which proves the lemma. ![$ \qedsymbol$](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3968.png.webp)

With this result on random walks, we can now easily prove that the running time of the $ \mathtt{merge(h1,h2)}$ operation is $ O(\log \ensuremath{\mathtt{n}})$ . **Lemma 10.2** *If $ \mathtt{h1}$ and $ \mathtt{h2}$ are the roots of two heaps containing $ \ensuremath{\mathtt{n}}_1$ and $ \ensuremath{\mathtt{n}}_2$ nodes, respectively, then the expected running time of $ \mathtt{merge(h1,h2)}$ is at most $ O(\log \ensuremath{\mathtt{n}})$ , where $ \ensuremath{\mathtt{n}}=\ensuremath{\mathtt{n}}_1+\ensuremath{\mathtt{n}}_2$ .*

*Proof*. Each step of the merge algorithm takes one step of a random walk, either in the heap rooted at $ \mathtt{h1}$ or the heap rooted at $ \mathtt{h2}$ . The algorithm terminates when either of these two random walks fall out of its corresponding tree (when $ \ensuremath{\mathtt{h1}}=\ensuremath{\mathtt{null}}$ or $ \ensuremath{\mathtt{h2}}=\ensuremath{\mathtt{null}}$ ). Therefore, the expected number of steps performed by the merge algorithm is at most

![$\displaystyle \log (\ensuremath{\mathtt{n}}_1+1) + \log (\ensuremath{\mathtt{n}}_2+1) \le 2\log \ensuremath{\mathtt{n}} \enspace . \qedhere $](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3993.png.webp)

![$ \qedsymbol$](/images/open-data-structures/10_2_MeldableHeap_Randomize-img3988.png.webp)

10.2.2 Summary The following theorem summarizes the performance of a MeldableHeap: **Theorem 10.2** *A MeldableHeap implements the (priority) Queue interface. A MeldableHeap supports the operations $ \mathtt{add(x)}$ and $ \mathtt{remove()}$ in $ O(\log \ensuremath{\mathtt{n}})$ expected time per operation.*

[opendatastructures.org](http://opendatastructures.org/)

## 10.3 Discussion and Exercises

The implicit representation of a complete binary tree as an array, or list, seems to have been first proposed by Eytzinger [27]. He used this representation in books containing pedigree family trees of noble families. The BinaryHeap data structure described here was first introduced by Williams [78]. The randomized MeldableHeap data structure described here appears to have first been proposed by Gambin and Malinowski [34]. Other meldable heap implementations exist, including leftist heaps [16,48, Section 5.3.2], binomial heaps [75], Fibonacci heaps [30], pairing heaps [29], and skew heaps [72], although none of these are as simple as the MeldableHeap structure. Some of the above structures also support a $ \mathtt{decreaseKey(u,y)}$ operation in which the value stored at node $ \mathtt{u}$ is decreased to $ \mathtt{y}$ . (It is a pre-condition that $ \ensuremath{\mathtt{y}}\le\ensuremath{\mathtt{u.x}}$ .) In most of the preceding structures, this operation can be supported in $ O(\log \ensuremath{\mathtt{n}})$ time by removing node $ \mathtt{u}$ and adding $ \mathtt{y}$ . However, some of these structures can implement $ \mathtt{decreaseKey(u,y)}$ more efficiently. In particular, $ \mathtt{decreaseKey(u,y)}$ takes $ O(1)$ amortized time in Fibonacci heaps and $ O(\log\log \ensuremath{\mathtt{n}})$ amortized time in a special version of pairing heaps [25]. This more efficient $ \mathtt{decreaseKey(u,y)}$ operation has applications in speeding up several graph algorithms, including Dijkstra's shortest path algorithm [30]. **Exercise 10.1** Illustrate the addition of the values 7 and then 3 to the BinaryHeap shown at the end of Figure 10.2.

**Exercise 10.2** Illustrate the removal of the next two values (6 and 8) on the BinaryHeap shown at the end of Figure 10.3.

**Exercise 10.3** Implement the $ \mathtt{remove(i)}$ method, that removes the value stored in $ \mathtt{a[i]}$ in a BinaryHeap. This method should run in $ O(\log \ensuremath{\mathtt{n}})$ time. Next, explain why this method is not likely to be useful.

**Exercise 10.4** A $ d$ -ary tree is a generalization of a binary tree in which each internal node has $ d$ children. Using Eytzinger's method it is also possible to represent complete $ d$ -ary trees using arrays. Work out the equations that, given an index $ \mathtt{i}$ , determine the index of $ \mathtt{i}$ 's parent and each of $ \mathtt{i}$ 's $ d$ children in this representation.

**Exercise 10.5** Using what you learned in Exercise 10.4, design and implement a DaryHeap, the $ d$ -ary generalization of a BinaryHeap. Analyze the running times of operations on a DaryHeap and test the performance of your DaryHeap implementation against that of the BinaryHeap implementation given here.

**Exercise 10.6** Illustrate the addition of the values 17 and then 82 in the MeldableHeap $ \mathtt{h1}$ shown in Figure 10.4. Use a coin to simulate a random bit when needed.

**Exercise 10.7** Illustrate the removal of the next two values (4 and 8) in the MeldableHeap $ \mathtt{h1}$ shown in Figure 10.4. Use a coin to simulate a random bit when needed.

**Exercise 10.8** Implement the $ \mathtt{remove(u)}$ method, that removes the node $ \mathtt{u}$ from a MeldableHeap. This method should run in $ O(\log \ensuremath{\mathtt{n}})$ expected time.

**Exercise 10.9** Show how to find the second smallest value in a BinaryHeap or MeldableHeap in constant time.

**Exercise 10.10** Show how to find the $ k$ th smallest value in a BinaryHeap or MeldableHeap in $ O(k\log k)$ time. (Hint: Using another heap might help.)

**Exercise 10.11** Suppose you are given $ \mathtt{k}$ sorted lists, of total length $ \mathtt{n}$ . Using a heap, show how to merge these into a single sorted list in $ O(n\log k)$ time. (Hint: Starting with the case $ k=2$ can be instructive.)

[opendatastructures.org](http://opendatastructures.org/)
