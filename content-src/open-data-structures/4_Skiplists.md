---
title: "4. Skiplists"
lang: en
---

In this chapter, we discuss a beautiful data structure: the skiplist, which has a variety of applications. Using a skiplist we can implement a List that has $ O(\log n)$ time implementations of $ \mathtt{get(i)}$ , $ \mathtt{set(i,x)}$ , $ \mathtt{add(i,x)}$ , and $ \mathtt{remove(i)}$ . We can also implement an SSet in which all operations run in $ O(\log \ensuremath{\mathtt{n}})$ expected time. The efficiency of skiplists relies on their use of randomization. When a new element is added to a skiplist, the skiplist uses random coin tosses to determine the height of the new element. The performance of skiplists is expressed in terms of expected running times and path lengths. This expectation is taken over the random coin tosses used by the skiplist. In the implementation, the random coin tosses used by a skiplist are simulated using a pseudo-random number (or bit) generator.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 4.1 The Basic Structure

Conceptually, a skiplist is a sequence of singly-linked lists $ L_0,\ldots,L_h$ . Each list $ L_r$ contains a subset of the items in $ L_{r-1}$ . We start with the input list $ L_0$ that contains $ \mathtt{n}$ items and construct $ L_1$ from $ L_0$ , $ L_2$ from $ L_1$ , and so on. The items in $ L_r$ are obtained by tossing a coin for each element, $ \mathtt{x}$ , in $ L_{r-1}$ and including $ \mathtt{x}$ in $ L_r$ if the coin turns up as heads. This process ends when we create a list $ L_r$ that is empty. An example of a skiplist is shown in Figure 4.1. **Figure 4.1:** A skiplist containing seven elements. ![\includegraphics[width=\textwidth ]{figs/skiplist}](/images/open-data-structures/4_1_Basic_Structure-img1615.png.webp) For an element, $ \mathtt{x}$ , in a skiplist, we call the height of $ \mathtt{x}$ the largest value $ r$ such that $ \mathtt{x}$ appears in $ L_r$ . Thus, for example, elements that only appear in $ L_0$ have height . If we spend a few moments thinking about it, we notice that the height of $ \mathtt{x}$ corresponds to the following experiment: Toss a coin repeatedly until it comes up as tails. How many times did it come up as heads? The answer, not surprisingly, is that the expected height of a node is 1. (We expect to toss the coin twice before getting tails, but we don't count the last toss.) The height of a skiplist is the height of its tallest node. At the head of every list is a special node, called the sentinel, that acts as a dummy node for the list. The key property of skiplists is that there is a short path, called the search path, from the sentinel in $ L_h$ to every node in $ L_0$ . Remembering how to construct a search path for a node, $ \mathtt{u}$ , is easy (see Figure 4.2) : Start at the top left corner of your skiplist (the sentinel in $ L_h$ ) and always go right unless that would overshoot $ \mathtt{u}$ , in which case you should take a step down into the list below. More precisely, to construct the search path for the node $ \mathtt{u}$ in $ L_0$ , we start at the sentinel, $ \mathtt{w}$ , in $ L_h$ . Next, we examine $ \mathtt{w.next}$ . If $ \mathtt{w.next}$ contains an item that appears before $ \mathtt{u}$ in $ L_0$ , then we set $ \ensuremath{\mathtt{w}}=\ensuremath{\mathtt{w.next}}$ . Otherwise, we move down and continue the search at the occurrence of $ \mathtt{w}$ in the list $ L_{h-1}$ . We continue this way until we reach the predecessor of $ \mathtt{u}$ in $ L_0$ . **Figure 4.2:** The search path for the node containing $ 4$ in a skiplist. ![\includegraphics[width=\textwidth ]{figs/skiplist-searchpath}](/images/open-data-structures/4_1_Basic_Structure-img1641.png.webp) The following result, which we will prove in Section 4.4, shows that the search path is quite short: **Lemma 4.1** *The expected length of the search path for any node, $ \mathtt{u}$ , in $ L_0$ is at most $ 2\log \ensuremath{\mathtt{n}} + O(1) = O(\log \ensuremath{\mathtt{n}})$ .*

A space-efficient way to implement a skiplist is to define a Node, $ \mathtt{u}$ , as consisting of a data value, $ \mathtt{x}$ , and an array, $ \mathtt{next}$ , of pointers, where $ \mathtt{u.next[i]}$ points to $ \mathtt{u}$ 's successor in the list $ L_{\ensuremath{\mathtt{i}}}$ . In this way, the data, $ \mathtt{x}$ , in a node is referenced only once, even though $ \mathtt{x}$ may appear in several lists.

```
    class Node<T> {
        T x;
        Node<T>[] next;
        Node(T ix, int h) {
            x = ix;
            next = (Node<T>[])Array.newInstance(Node.class, h+1);
        }
        int height() {
            return next.length - 1;
        }
    }
```

The next two sections of this chapter discuss two different applications of skiplists. In each of these applications, $ L_0$ stores the main structure (a list of elements or a sorted set of elements). The primary difference between these structures is in how a search path is navigated; in particular, they differ in how they decide if a search path should go down into $ L_{r-1}$ or go right within $ L_r$ . [opendatastructures.org](http://opendatastructures.org/)

## 4.2 SkiplistSSet: An Efficient SSet

**Subsections**

# 4.2 SkiplistSSet: An Efficient SSet

A SkiplistSSet uses a skiplist structure to implement the SSet interface. When used in this way, the list $ L_0$ stores the elements of the SSet in sorted order. The $ \mathtt{find(x)}$ method works by following the search path for the smallest value $ \mathtt{y}$ such that $ \ensuremath{\mathtt{y}}\ge\ensuremath{\mathtt{x}}$ :

```
    Node<T> findPredNode(T x) {
        Node<T> u = sentinel;
        int r = h;
        while (r >= 0) {
            while (u.next[r] != null && compare(u.next[r].x,x) < 0)
                u = u.next[r];   // go right in list r
            r--;               // go down into list r-1
        }
        return u;
    }
    T find(T x) {
        Node<T> u = findPredNode(x);
        return u.next[0] == null ? null : u.next[0].x;
    }
```

Following the search path for $ \mathtt{y}$ is easy: when situated at some node, $ \mathtt{u}$ , in $ L_{\ensuremath{\mathtt{r}}}$ , we look right to $ \mathtt{u.next[r].x}$ . If $ \ensuremath{\mathtt{x}}>\ensuremath{\mathtt{u.next[r].x}}$ , then we take a step to the right in $ L_{\ensuremath{\mathtt{r}}}$ ; otherwise, we move down into $ L_{\ensuremath{\mathtt{r}}-1}$ . Each step (right or down) in this search takes only constant time; thus, by Lemma 4.1, the expected running time of $ \mathtt{find(x)}$ is $ O(\log \ensuremath{\mathtt{n}})$ . Before we can add an element to a SkipListSSet, we need a method to simulate tossing coins to determine the height, $ \mathtt{k}$ , of a new node. We do so by picking a random integer, $ \mathtt{z}$ , and counting the number of trailing $ 1$ s in the binary representation of $ \mathtt{z}$ :4.1

```
    int pickHeight() {
        int z = rand.nextInt();
        int k = 0;
        int m = 1;
        while ((z & m) != 0) {
            k++;
            m <<= 1;
        }
        return k;
    }
```

To implement the $ \mathtt{add(x)}$ method in a SkiplistSSet we search for $ \mathtt{x}$ and then splice $ \mathtt{x}$ into a few lists $ L_0$ ,..., $ L_{\ensuremath{\mathtt{k}}}$ , where $ \mathtt{k}$ is selected using the $ \mathtt{pickHeight()}$ method. The easiest way to do this is to use an array, $ \mathtt{stack}$ , that keeps track of the nodes at which the search path goes down from some list $ L_{\ensuremath{\mathtt{r}}}$ into $ L_{\ensuremath{\mathtt{r}}-1}$ . More precisely, $ \mathtt{stack[r]}$ is the node in $ L_{\ensuremath{\mathtt{r}}}$ where the search path proceeded down into $ L_{\ensuremath{\mathtt{r}}-1}$ . The nodes that we modify to insert $ \mathtt{x}$ are precisely the nodes $ \ensuremath{\mathtt{stack[0]}},\ldots,\ensuremath{\mathtt{stack[k]}}$ . The following code implements this algorithm for $ \mathtt{add(x)}$ :

```
    boolean add(T x) {
        Node<T> u = sentinel;
        int r = h;
        int comp = 0;
        while (r >= 0) {
            while (u.next[r] != null 
                   && (comp = compare(u.next[r].x,x)) < 0)
                u = u.next[r];
            if (u.next[r] != null && comp == 0) return false;
            stack[r--] = u;          // going down, store u
        }
        Node<T> w = new Node<T>(x, pickHeight());
        while (h < w.height())
            stack[++h] = sentinel;   // height increased
        for (int i = 0; i < w.next.length; i++) {
            w.next[i] = stack[i].next[i];
            stack[i].next[i] = w;
        }
        n++;
        return true;
    }
```

Removing an element, $ \mathtt{x}$ , is done in a similar way, except that there is no need for $ \mathtt{stack}$ to keep track of the search path. The removal can be done as we are following the search path. We search for $ \mathtt{x}$ and each time the search moves downward from a node $ \mathtt{u}$ , we check if $ \ensuremath{\mathtt{u.next.x}}=\ensuremath{\mathtt{x}}$ and if so, we splice $ \mathtt{u}$ out of the list:

```
    boolean remove(T x) {
        boolean removed = false;
        Node<T> u = sentinel;
        int r = h;
        int comp = 0;
        while (r >= 0) {
            while (u.next[r] != null 
                   && (comp = compare(u.next[r].x, x)) < 0) {
                u = u.next[r];
            }
            if (u.next[r] != null && comp == 0) {
                removed = true;
                u.next[r] = u.next[r].next[r];
                if (u == sentinel && u.next[r] == null)
                    h--;  // height has gone down
            }
            r--;
        }
        if (removed) n--;
        return removed;
    }
```

**Figure 4.4:** Removing the node containing $ 3$ from a skiplist. ![\includegraphics[width=\textwidth ]{figs/skiplist-remove}](/images/open-data-structures/4_2_SkiplistSSet_Efficient_-img1703.png.webp) 4.2.1 Summary The following theorem summarizes the performance of skiplists when used to implement sorted sets: **Theorem 4.1** *SkiplistSSet implements the SSet interface. A SkiplistSSet supports the operations $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ in $ O(\log \ensuremath{\mathtt{n}})$ expected time per operation.*

#### Footnotes

...:4.1 This method does not exactly replicate the coin-tossing experiment since the value of $ \mathtt{k}$ will always be less than the number of bits in an $ \mathtt{int}$ . However, this will have negligible impact unless the number of elements in the structure is much greater than $ 2^{32}=4294967296$ . [opendatastructures.org](http://opendatastructures.org/)

## 4.3 SkiplistList: An Efficient Random-Access List

**Subsections**

# 4.3 SkiplistList: An Efficient Random-Access List

A SkiplistList implements the List interface using a skiplist structure. In a SkiplistList, $ L_0$ contains the elements of the list in the order in which they appear in the list. As in a SkiplistSSet, elements can be added, removed, and accessed in $ O(\log \ensuremath{\mathtt{n}})$ time. For this to be possible, we need a way to follow the search path for the $ \mathtt{i}$ th element in $ L_0$ . The easiest way to do this is to define the notion of the length of an edge in some list, $ L_{\ensuremath{\mathtt{r}}}$ . We define the length of every edge in $ L_{0}$ as 1. The length of an edge, $ \mathtt{e}$ , in $ L_{\ensuremath{\mathtt{r}}}$ , $ \ensuremath{\mathtt{r}}>0$ , is defined as the sum of the lengths of the edges below $ \mathtt{e}$ in $ L_{\ensuremath{\mathtt{r}}-1}$ . Equivalently, the length of $ \mathtt{e}$ is the number of edges in $ L_0$ below $ \mathtt{e}$ . See Figure 4.5 for an example of a skiplist with the lengths of its edges shown. Since the edges of skiplists are stored in arrays, the lengths can be stored the same way:

```
    class Node {
        T x;
        Node[] next;
        int[] length;
        @SuppressWarnings("unchecked")
        Node(T ix, int h) {
            x = ix;
            next = (Node[])Array.newInstance(Node.class, h+1);
            length = new int[h+1];
        }
        int height() {
            return next.length - 1;
        }
    }
```

The useful property of this definition of length is that, if we are currently at a node that is at position $ \mathtt{j}$ in $ L_0$ and we follow an edge of length $ \ell$ , then we move to a node whose position, in $ L_0$ , is $ \ensuremath{\mathtt{j}}+\ell$ . In this way, while following a search path, we can keep track of the position, $ \mathtt{j}$ , of the current node in $ L_0$ . When at a node, $ \mathtt{u}$ , in $ L_{\ensuremath{\mathtt{r}}}$ , we go right if $ \mathtt{j}$ plus the length of the edge $ \mathtt{u.next[r]}$ is less than $ \mathtt{i}$ . Otherwise, we go down into $ L_{\ensuremath{\mathtt{r}}-1}$ .

```
    Node findPred(int i) {
        Node u = sentinel;
        int r = h;
        int j = -1;   // index of the current node in list 0
        while (r >= 0) {
            while (u.next[r] != null && j + u.length[r] < i) {
                j += u.length[r];
                u = u.next[r];
            }
            r--;
        }
        return u;
    }
```

```
    T get(int i) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        return findPred(i).next[0].x;
    }
    T set(int i, T x) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        Node u = findPred(i).next[0];
        T y = u.x;
        u.x = x;
        return y;
    }
```

Since the hardest part of the operations $ \mathtt{get(i)}$ and $ \mathtt{set(i,x)}$ is finding the $ \mathtt{i}$ th node in $ L_0$ , these operations run in $ O(\log \ensuremath{\mathtt{n}})$ time. Adding an element to a SkiplistList at a position, $ \mathtt{i}$ , is fairly simple. Unlike in a SkiplistSSet, we are sure that a new node will actually be added, so we can do the addition at the same time as we search for the new node's location. We first pick the height, $ \mathtt{k}$ , of the newly inserted node, $ \mathtt{w}$ , and then follow the search path for $ \mathtt{i}$ . Any time the search path moves down from $ L_{\ensuremath{\mathtt{r}}}$ with $ \ensuremath{\mathtt{r}}\le \ensuremath{\mathtt{k}}$ , we splice $ \mathtt{w}$ into $ L_{\ensuremath{\mathtt{r}}}$ . The only extra care needed is to ensure that the lengths of edges are updated properly. See Figure 4.6.

Note that, each time the search path goes down at a node, $ \mathtt{u}$ , in $ L_{\ensuremath{\mathtt{r}}}$ , the length of the edge $ \mathtt{u.next[r]}$ increases by one, since we are adding an element below that edge at position $ \mathtt{i}$ . Splicing the node $ \mathtt{w}$ between two nodes, $ \mathtt{u}$ and $ \mathtt{z}$ , works as shown in Figure 4.7. While following the search path we are already keeping track of the position, $ \mathtt{j}$ , of $ \mathtt{u}$ in $ L_0$ . Therefore, we know that the length of the edge from $ \mathtt{u}$ to $ \mathtt{w}$ is $ \ensuremath{\mathtt{i}}-\ensuremath{\mathtt{j}}$ . We can also deduce the length of the edge from $ \mathtt{w}$ to $ \mathtt{z}$ from the length, $ \ell$ , of the edge from $ \mathtt{u}$ to $ \mathtt{z}$ . Therefore, we can splice in $ \mathtt{w}$ and update the lengths of the edges in constant time.

This sounds more complicated than it is, for the code is actually quite simple:

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        Node w = new Node(x, pickHeight());
        if (w.height() > h) 
            h = w.height();
        add(i, w);
    }
```

```
    Node add(int i, Node w) {
        Node u = sentinel;
        int k = w.height();
        int r = h;
        int j = -1; // index of u
        while (r >= 0) {
            while (u.next[r] != null && j+u.length[r] < i) {
                j += u.length[r];
                u = u.next[r];
            }
            u.length[r]++; // accounts for new node in list 0
            if (r <= k) {
                w.next[r] = u.next[r];
                u.next[r] = w;
                w.length[r] = u.length[r] - (i - j);
                u.length[r] = i - j;
            }
            r--;
        }
        n++;
        return u;
    }
```

By now, the implementation of the $ \mathtt{remove(i)}$ operation in a SkiplistList should be obvious. We follow the search path for the node at position $ \mathtt{i}$ . Each time the search path takes a step down from a node, $ \mathtt{u}$ , at level $ \mathtt{r}$ we decrement the length of the edge leaving $ \mathtt{u}$ at that level. We also check if $ \mathtt{u.next[r]}$ is the element of rank $ \mathtt{i}$ and, if so, splice it out of the list at that level. An example is shown in Figure 4.8.

```
    T remove(int i) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        T x = null;
        Node u = sentinel;
        int r = h;
        int j = -1; // index of node u
        while (r >= 0) {
            while (u.next[r] != null && j+u.length[r] < i) {
                j += u.length[r];
                u = u.next[r];
            }
            u.length[r]--;  // for the node we are removing
            if (j + u.length[r] + 1 == i && u.next[r] != null) {
                x = u.next[r].x;
                u.length[r] += u.next[r].length[r];
                u.next[r] = u.next[r].next[r];
                if (u == sentinel && u.next[r] == null)
                    h--;
            }
            r--;
        }
        n--;
        return x;
    }
```

4.3.1 Summary The following theorem summarizes the performance of the SkiplistList data structure: **Theorem 4.2** *A SkiplistList implements the List interface. A SkiplistList supports the operations $ \mathtt{get(i)}$ , $ \mathtt{set(i,x)}$ , $ \mathtt{add(i,x)}$ , and $ \mathtt{remove(i)}$ in $ O(\log \ensuremath{\mathtt{n}})$ expected time per operation.*

[opendatastructures.org](http://opendatastructures.org/)

## 4.4 Analysis of Skiplists

In this section, we analyze the expected height, size, and length of the search path in a skiplist. This section requires a background in basic probability. Several proofs are based on the following basic observation about coin tosses. **Lemma 4.2** *Let $ T$ be the number of times a fair coin is tossed up to and including the first time the coin comes up heads. Then $ \mathrm{E}[T]=2$ .*

*Proof*. Suppose we stop tossing the coin the first time it comes up heads. Define the indicator variable

![$\displaystyle I_{i} = \left\{\begin{array}{ll} 0 & \mbox{if the coin is tossed... ...\\ 1 & \mbox{if the coin is tossed $i$\ or more times} \end{array}\right. $](/images/open-data-structures/4_4_Analysis_Skiplists-img1789.png.webp)

Note that $ I_i=1$ if and only if the first $ i-1$ coin tosses are tails, so $ \mathrm{E}[I_i]=\Pr\{I_i=1\}=1/2^{i-1}$ . Observe that $ T$ , the total number of coin tosses, can be written as $ T=\sum_{i=1}^{\infty} I_i$ . Therefore,

| $\displaystyle \mathrm{E}[T]$ | $\displaystyle = \mathrm{E}\left[\sum_{i=1}^\infty I_i\right]$ |  |
| --- | --- | --- |
|  | $\displaystyle = \sum_{i=1}^\infty \mathrm{E}\left[I_i\right]$ |  |
|  | $\displaystyle = \sum_{i=1}^\infty 1/2^{i-1}$ |  |
|  | $\displaystyle = 1 + 1/2 + 1/4 + 1/8 + \cdots$ |  |
|  | $\displaystyle = 2 \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1788.png.webp)

The next two lemmata tell us that skiplists have linear size: **Lemma 4.3** *The expected number of nodes in a skiplist containing $ \ensuremath{\mathtt{n}}$ elements, not including occurrences of the sentinel, is $ 2\ensuremath{\mathtt{n}}$ .*

*Proof*. The probability that any particular element, $ \mathtt{x}$ , is included in list $ L_{\ensuremath{\mathtt{r}}}$ is $ 1/2^{\ensuremath{\mathtt{r}}}$ , so the expected number of nodes in $ L_{\ensuremath{\mathtt{r}}}$ is $ \ensuremath{\mathtt{n}}/2^{\ensuremath{\mathtt{r}}}$ .4.2 Therefore, the total expected number of nodes in all lists is

![$\displaystyle \sum_{\ensuremath{\mathtt{r}}=0}^\infty \ensuremath{\mathtt{n}}/2... ...athtt{n}}(1+1/2+1/4+1/8+\cdots) = 2\ensuremath{\mathtt{n}} \enspace . \qedhere $](/images/open-data-structures/4_4_Analysis_Skiplists-img1809.png.webp)

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1803.png.webp)

**Lemma 4.4** *The expected height of a skiplist containing $ \mathtt{n}$ elements is at most $ \log \ensuremath{\mathtt{n}} + 2$ .*

*Proof*. For each $ \ensuremath{\mathtt{r}}\in\{1,2,3,\ldots,\infty\}$ , define the indicator random variable

![$\displaystyle I_{\ensuremath{\mathtt{r}}} = \left\{\begin{array}{ll} 0 & \mbox... ...1 & \mbox{if $L_{\ensuremath{\mathtt{r}}}$\ is non-empty} \end{array}\right. $](/images/open-data-structures/4_4_Analysis_Skiplists-img1814.png.webp)

The height, $ \mathtt{h}$ , of the skiplist is then given by

![$\displaystyle \ensuremath{\mathtt{h}} = \sum_{i=1}^\infty I_{\ensuremath{\mathtt{r}}} \enspace . $](/images/open-data-structures/4_4_Analysis_Skiplists-img1816.png.webp)

Note that $ I_{\ensuremath{\mathtt{r}}}$ is never more than the length, $ \vert L_{\ensuremath{\mathtt{r}}}\vert$ , of $ L_{\ensuremath{\mathtt{r}}}$ , so

![$\displaystyle \mathrm{E}[I_{\ensuremath{\mathtt{r}}}] \le \mathrm{E}[\vert L_{\... ...t{r}}}\vert] = \ensuremath{\mathtt{n}}/2^{\ensuremath{\mathtt{r}}} \enspace . $](/images/open-data-structures/4_4_Analysis_Skiplists-img1820.png.webp)

Therefore, we have

| $\displaystyle \mathrm{E}[\ensuremath{\mathtt{h}}]$ | $\displaystyle = \mathrm{E}\left[\sum_{r=1}^\infty I_{\ensuremath{\mathtt{r}}}\right]$ |  |
| --- | --- | --- |
|  | $\displaystyle = \sum_{\ensuremath{\mathtt{r}}=1}^{\infty} E[I_{\ensuremath{\mathtt{r}}}]$ |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 1](/images/open-data-structures/math-d2fcf0265b52a9f28c66.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 2](/images/open-data-structures/math-f005f04aba9cc1995529.webp) |  |
|  | $\displaystyle \le \log \ensuremath{\mathtt{n}} + \sum_{\ensuremath{\mathtt{r}}=0}^\infty 1/2^{\ensuremath{\mathtt{r}}}$ |  |
|  | $\displaystyle = \log \ensuremath{\mathtt{n}} + 2 \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1812.png.webp)

**Lemma 4.5** *The expected number of nodes in a skiplist containing $ \ensuremath{\mathtt{n}}$ elements, including all occurrences of the sentinel, is $ 2\ensuremath{\mathtt{n}}+O(\log \ensuremath{\mathtt{n}})$ .*

*Proof*. By Lemma 4.3, the expected number of nodes, not including the sentinel, is $ 2\ensuremath{\mathtt{n}}$ . The number of occurrences of the sentinel is equal to the height, $ \ensuremath{\mathtt{h}}$ , of the skiplist so, by Lemma 4.4 the expected number of occurrences of the sentinel is at most $ \log \ensuremath{\mathtt{n}}+2 = O(\log \ensuremath{\mathtt{n}})$ . ![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1830.png.webp)

**Lemma 4.6** *The expected length of a search path in a skiplist is at most $ 2\log \ensuremath{\mathtt{n}} + O(1)$ .*

*Proof*. The easiest way to see this is to consider the reverse search path for a node, $ \mathtt{x}$ . This path starts at the predecessor of $ \mathtt{x}$ in $ L_0$ . At any point in time, if the path can go up a level, then it does. If it cannot go up a level then it goes left. Thinking about this for a few moments will convince us that the reverse search path for $ \mathtt{x}$ is identical to the search path for $ \mathtt{x}$ , except that it is reversed.

The number of nodes that the reverse search path visits at a particular level, $ \mathtt{r}$ , is related to the following experiment: Toss a coin. If the coin comes up as heads, then move up and stop. Otherwise, move left and repeat the experiment. The number of coin tosses before the heads represents the number of steps to the left that a reverse search path takes at a particular level.4.3 Lemma 4.2 tells us that the expected number of coin tosses before the first heads is 1. Let $ S_{\ensuremath{\mathtt{r}}}$ denote the number of steps the forward search path takes at level $ \ensuremath{\mathtt{r}}$ that go to the right. We have just argued that $ \mathrm{E}[S_{\ensuremath{\mathtt{r}}}]\le 1$ . Furthermore, $ S_{\ensuremath{\mathtt{r}}}\le \vert L_{\ensuremath{\mathtt{r}}}\vert$ , since we can't take more steps in $ L_{\ensuremath{\mathtt{r}}}$ than the length of $ L_{\ensuremath{\mathtt{r}}}$ , so

![$\displaystyle \mathrm{E}[S_{\ensuremath{\mathtt{r}}}] \le \mathrm{E}[\vert L_{\... ...t{r}}}\vert] = \ensuremath{\mathtt{n}}/2^{\ensuremath{\mathtt{r}}} \enspace . $](/images/open-data-structures/4_4_Analysis_Skiplists-img1848.png.webp)

We can now finish as in the proof of Lemma 4.4. Let $ S$ be the length of the search path for some node, $ \mathtt{u}$ , in a skiplist, and let $ \ensuremath{\mathtt{h}}$ be the height of the skiplist. Then

| $\displaystyle \mathrm{E}[S]$ | $\displaystyle = \mathrm{E}\left[ \ensuremath{\mathtt{h}} + \sum_{\ensuremath{\mathtt{r}}=0}^\infty S_{\ensuremath{\mathtt{r}}} \right]$ |  |
| --- | --- | --- |
|  | $\displaystyle = \mathrm{E}[\ensuremath{\mathtt{h}}] + \sum_{\ensuremath{\mathtt{r}}=0}^\infty \mathrm{E}[S_{\ensuremath{\mathtt{r}}}]$ |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 3](/images/open-data-structures/math-ea7d1bbd5d990b5dc692.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 4](/images/open-data-structures/math-a1ec5ea486749c62ec98.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 5](/images/open-data-structures/math-bba1e5036c0dbda1de84.webp) |  |
|  | ![المعادلة الأصلية: تحليل الارتفاع وطول مسار البحث في قوائم التخطي، الصيغة 6](/images/open-data-structures/math-6ee314f429351b9ab936.webp) |  |
|  | $\displaystyle \le \mathrm{E}[\ensuremath{\mathtt{h}}] + \log \ensuremath{\mathtt{n}} + 3$ |  |
|  | $\displaystyle \le 2\log \ensuremath{\mathtt{n}} + 5 \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/4_4_Analysis_Skiplists-img1835.png.webp)

The following theorem summarizes the results in this section: **Theorem 4.3** *A skiplist containing $ \ensuremath{\mathtt{n}}$ elements has expected size $ O(\ensuremath{\mathtt{n}})$ and the expected length of the search path for any particular element is at most $ 2\log \ensuremath{\mathtt{n}} + O(1)$ .*

#### Footnotes

....4.2 See Section 1.3.4 to see how this is derived using indicator variables and linearity of expectation. ... level.4.3 Note that this might overcount the number of steps to the left, since the experiment should end either at the first heads or when the search path reaches the sentinel, whichever comes first. This is not a problem since the lemma is only stating an upper bound. [opendatastructures.org](http://opendatastructures.org/)

## 4.5 Discussion and Exercises

Skiplists were introduced by Pugh [62] who also presented a number of applications and extensions of skiplists [61]. Since then they have been studied extensively. Several researchers have done very precise analyses of the expected length and variance of the length of the search path for the $ \mathtt{i}$ th element in a skiplist [45,44,58]. Deterministic versions [53], biased versions [8,26], and self-adjusting versions [12] of skiplists have all been developed. Skiplist implementations have been written for various languages and frameworks and have been used in open-source database systems [71,63]. A variant of skiplists is used in the HP-UX operating system kernel's process management structures [42]. Skiplists are even part of the Java 1.6 API [55]. **Exercise 4.1** Illustrate the search paths for 2.5 and 5.5 on the skiplist in Figure 4.1.

**Exercise 4.2** Illustrate the addition of the values 0.5 (with a height of 1) and then 3.5 (with a height of 2) to the skiplist in Figure 4.1.

**Exercise 4.3** Illustrate the removal of the values 1 and then 3 from the skiplist in Figure 4.1.

**Exercise 4.4** Illustrate the execution of $ \mathtt{remove(2)}$ on the SkiplistList in Figure 4.5.

**Exercise 4.5** Illustrate the execution of $ \mathtt{add(3,x)}$ on the SkiplistList in Figure 4.5. Assume that $ \mathtt{pickHeight()}$ selects a height of 4 for the newly created node.

**Exercise 4.6** Show that, during an $ \mathtt{add(x)}$ or a $ \mathtt{remove(x)}$ operation, the expected number of pointers in a SkiplistSet that get changed is constant.

**Exercise 4.7** Suppose that, instead of promoting an element from $ L_{i-1}$ into $ L_i$ based on a coin toss, we promote it with some probability $ p$ , $ 0 < p < 1$ . Show that, with this modification, the expected length of a search path is at most $ (1/p)\log_{1/p} \ensuremath{\mathtt{n}} + O(1)$ . What is the value of $ p$ that minimizes the preceding expression? What is the expected height of the skiplist? What is the expected number of nodes in the skiplist?

**Exercise 4.8** The $ \mathtt{find(x)}$ method in a SkiplistSet sometimes performs redundant comparisons; these occur when $ \mathtt{x}$ is compared to the same value more than once. They can occur when, for some node, $ \mathtt{u}$ , $ \ensuremath{\mathtt{u.next[r]}} = \ensuremath{\mathtt{u.next[r-1]}}$ . Show how these redundant comparisons happen and modify $ \mathtt{find(x)}$ so that they are avoided. Analyze the expected number of comparisons done by your modified $ \mathtt{find(x)}$ method.

**Exercise 4.9** Design and implement a version of a skiplist that implements the SSet interface, but also allows fast access to elements by rank. That is, it also supports the function $ \mathtt{get(i)}$ , which returns the element whose rank is $ \mathtt{i}$ in $ O(\log \ensuremath{\mathtt{n}})$ expected time. (The rank of an element $ \mathtt{x}$ in an SSet is the number of elements in the SSet that are less than $ \mathtt{x}$ .)

**Exercise 4.10** A finger in a skiplist is an array that stores the sequence of nodes on a search path at which the search path goes down. (The variable $ \mathtt{stack}$ in the $ \mathtt{add(x)}$ code on page ![[*]](/images/open-data-structures/4_5_Discussion_Exercises-crossref.png.webp) is a finger; the shaded nodes in Figure 4.3 show the contents of the finger.) One can think of a finger as pointing out the path to a node in the lowest list, $ L_0$ . A finger search implements the $ \mathtt{find(x)}$ operation using a finger, by walking up the list using the finger until reaching a node $ \mathtt{u}$ such that $ \ensuremath{\mathtt{u.x}} < \ensuremath{\mathtt{x}}$ and $ \ensuremath{\mathtt{u.next}}=\ensuremath{\mathtt{null}}$ or $ \ensuremath{\mathtt{u.next.x}} > \ensuremath{\mathtt{x}}$ and then performing a normal search for $ \mathtt{x}$ starting from $ \mathtt{u}$ . It is possible to prove that the expected number of steps required for a finger search is $ O(1+\log r)$ , where $ r$ is the number values in $ L_0$ between $ \mathtt{x}$ and the value pointed to by the finger. Implement a subclass of Skiplist called SkiplistWithFinger that implements $ \mathtt{find(x)}$ operations using an internal finger. This subclass stores a finger, which is then used so that every $ \mathtt{find(x)}$ operation is implemented as a finger search. During each $ \mathtt{find(x)}$ operation the finger is updated so that each $ \mathtt{find(x)}$ operation uses, as a starting point, a finger that points to the result of the previous $ \mathtt{find(x)}$ operation.

**Exercise 4.11** Write a method, $ \mathtt{truncate(i)}$ , that truncates a SkiplistList at position $ \mathtt{i}$ . After the execution of this method, the size of the list is $ \mathtt{i}$ and it contains only the elements at indices $ 0,\ldots,\ensuremath{\mathtt{i}}-1$ . The return value is another SkiplistList that contains the elements at indices $ \ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{n}}-1$ . This method should run in $ O(\log \ensuremath{\mathtt{n}})$ time.

**Exercise 4.12** Write a SkiplistList method, $ \mathtt{absorb(l2)}$ , that takes as an argument a SkiplistList, $ \mathtt{l2}$ , empties it and appends its contents, in order, to the receiver. For example, if $ \mathtt{l1}$ contains $ a,b,c$ and $ \mathtt{l2}$ contains $ d,e,f$ , then after calling $ \mathtt{l1.absorb(l2)}$ , $ \mathtt{l1}$ will contain $ a,b,c,d,e,f$ and $ \mathtt{l2}$ will be empty. This method should run in $ O(\log \ensuremath{\mathtt{n}})$ time.

**Exercise 4.13** Using the ideas from the space-efficient list, SEList, design and implement a space-efficient SSet, SESSet. To do this, store the data, in order, in an SEList, and store the blocks of this SEList in an SSet. If the original SSet implementation uses $ O(\ensuremath{\mathtt{n}})$ space to store $ \mathtt{n}$ elements, then the SESSet will use enough space for $ \mathtt{n}$ elements plus $ O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{b}}+\ensuremath{\mathtt{b}})$ wasted space.

**Exercise 4.14** Using an SSet as your underlying structure, design and implement an application that reads a (large) text file and allows you to search, interactively, for any substring contained in the text. As the user types their query, a matching part of the text (if any) should appear as a result. Hint 1: Every substring is a prefix of some suffix, so it suffices to store all suffixes of the text file. Hint 2: Any suffix can be represented compactly as a single integer indicating where the suffix begins in the text. Test your application on some large texts, such as some of the books available at Project Gutenberg [1]. If done correctly, your applications will be very responsive; there should be no noticeable lag between typing keystrokes and seeing the results.

**Exercise 4.15** (This exercise should be done after reading about binary search trees, in Section 6.2.) Compare skiplists with binary search trees in the following ways: Explain how removing some edges of a skiplist leads to a structure that looks like a binary tree and is similar to a binary search tree. Skiplists and binary search trees each use about the same number of pointers (2 per node). Skiplists make better use of those pointers, though. Explain why.

[opendatastructures.org](http://opendatastructures.org/)
