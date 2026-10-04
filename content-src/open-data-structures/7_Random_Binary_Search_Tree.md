---
title: "7. Random Binary Search Trees"
lang: en
---

In this chapter, we present a binary search tree structure that uses randomization to achieve $ O(\log \ensuremath{\mathtt{n}})$ expected time for all operations.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 7.1 Random Binary Search Trees

**Subsections**

# 7.1 Random Binary Search Trees

Consider the two binary search trees shown in Figure 7.1, each of which has $ \ensuremath{\mathtt{n}}=15$ nodes. The one on the left is a list and the other is a perfectly balanced binary search tree. The one on the left has a height of $ \ensuremath{\mathtt{n}}-1=14$ and the one on the right has a height of three. **Figure 7.1:** Two binary search trees containing the integers $ 0,\ldots,14$ . ![\includegraphics[scale=0.90909,scale=0.95]{figs/bst-path}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2843.png.webp) ![\includegraphics[scale=0.90909,scale=0.95]{figs/bst-balanced}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2844.png.webp) Imagine how these two trees could have been constructed. The one on the left occurs if we start with an empty BinarySearchTree and add the sequence

![$\displaystyle \langle 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14 \rangle \enspace . $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2847.png.webp)

No other sequence of additions will create this tree (as you can prove by induction on $ \mathtt{n}$ ). On the other hand, the tree on the right can be created by the sequence

![$\displaystyle \langle 7,3,11,1,5,9,13,0,2,4,6,8,10,12,14 \rangle \enspace . $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2849.png.webp)

Other sequences work as well, including

![$\displaystyle \langle 7,3,1,5,0,2,4,6,11,9,13,8,10,12,14 \rangle \enspace , $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2850.png.webp)

and

![$\displaystyle \langle 7,3,1,11,5,0,2,4,6,9,13,8,10,12,14 \rangle \enspace . $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2851.png.webp)

In fact, there are $ 21,964,800$ addition sequences that generate the tree on the right and only one that generates the tree on the left.

The above example gives some anecdotal evidence that, if we choose a random permutation of $ 0,\ldots,14$ , and add it into a binary search tree, then we are more likely to get a very balanced tree (the right side of Figure 7.1) than we are to get a very unbalanced tree (the left side of Figure 7.1). We can formalize this notion by studying random binary search trees. A random binary search tree of size $ \mathtt{n}$ is obtained in the following way: Take a random permutation, $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{\ensuremath{\mathtt{n}}-1}$ , of the integers $ 0,\ldots,\ensuremath{\mathtt{n}}-1$ and add its elements, one by one, into a BinarySearchTree. By random permutation we mean that each of the possible $ \ensuremath{\mathtt{n}}!$ permutations (orderings) of $ 0,\ldots,\ensuremath{\mathtt{n}}-1$ is equally likely, so that the probability of obtaining any particular permutation is $ 1/\ensuremath{\mathtt{n}}!$ . Note that the values $ 0,\ldots,\ensuremath{\mathtt{n}}-1$ could be replaced by any ordered set of $ \mathtt{n}$ elements without changing any of the properties of the random binary search tree. The element $ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ is simply standing in for the element of rank $ \mathtt{x}$ in an ordered set of size $ \mathtt{n}$ . Before we can present our main result about random binary search trees, we must take some time for a short digression to discuss a type of number that comes up frequently when studying randomized structures. For a non-negative integer, $ k$ , the $ k$ -th harmonic number, denoted $ H_k$ , is defined as

![$\displaystyle H_k = 1 + 1/2 + 1/3 + \cdots + 1/k \enspace . $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2869.png.webp)

The harmonic number $ H_k$ has no simple closed form, but it is very closely related to the natural logarithm of $ k$ . In particular,

![$\displaystyle \ln k < H_k \le \ln k + 1 \enspace . $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2872.png.webp)

Readers who have studied calculus might notice that this is because the integral $ \int_1^k\! (1/x)\, \mathrm{d}x= \ln k$ . Keeping in mind that an integral can be interpreted as the area between a curve and the $ x$ -axis, the value of $ H_k$ can be lower-bounded by the integral $ \int_1^k\! (1/x)\, \mathrm{d}x$ and upper-bounded by $ 1+ \int_1^k\! (1/x)\, \mathrm{d}x$ . (See Figure 7.2 for a graphical explanation.)

**Figure 7.2:** The $ k$ th harmonic number $ H_k=\sum_{i=1}^k 1/i$ is upper- and lower-bounded by two integrals. The value of these integrals is given by the area of the shaded region, while the value of $ H_k$ is given by the area of the rectangles. ![\includegraphics[width=\textwidth ]{figs/harmonic-2}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2878.png.webp) ![\includegraphics[width=\textwidth ]{figs/harmonic-3}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2879.png.webp) **Lemma 7..1** *In a random binary search tree of size $ \mathtt{n}$ , the following statements hold: * For any $ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ , the expected length of the search path for $ \mathtt{x}$ is $ H_{\ensuremath{\mathtt{x}}+1} + H_{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}} - O(1)$ .7.1 For any $ \ensuremath{\mathtt{x}}\in(-1,n)\setminus\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ , the expected length of the search path for $ \mathtt{x}$ is $ H_{\lceil\ensuremath{\mathtt{x}}\rceil} + H_{\ensuremath{\mathtt{n}}-\lceil\ensuremath{\mathtt{x}}\rceil}$ .

We will prove Lemma 7.1 in the next section. For now, consider what the two parts of Lemma 7.1 tell us. The first part tells us that if we search for an element in a tree of size $ \mathtt{n}$ , then the expected length of the search path is at most $ 2\ln n + O(1)$ . The second part tells us the same thing about searching for a value not stored in the tree. When we compare the two parts of the lemma, we see that it is only slightly faster to search for something that is in the tree compared to something that is not. 7.1.1 Proof of Lemma 7.1 The key observation needed to prove Lemma 7.1 is the following: The search path for a value $ \mathtt{x}$ in the open interval $ (-1,\ensuremath{\mathtt{n}})$ in a random binary search tree, $ T$ , contains the node with key $ i < \ensuremath{\mathtt{x}}$ if, and only if, in the random permutation used to create $ T$ , $ i$ appears before any of $ \{i+1,i+2,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ . To see this, refer to Figure 7.3 and notice that until some value in $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ is added, the search paths for each value in the open interval $ (i-1,\lfloor\ensuremath{\mathtt{x}}\rfloor+1)$ are identical. (Remember that for two values to have different search paths, there must be some element in the tree that compares differently with them.) Let $ j$ be the first element in $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ to appear in the random permutation. Notice that $ j$ is now and will always be on the search path for $ \mathtt{x}$ . If $ j\neq i$ then the node $ \ensuremath{\mathtt{u}}_j$ containing $ j$ is created before the node $ \ensuremath{\mathtt{u}}_i$ that contains $ i$ . Later, when $ i$ is added, it will be added to the subtree rooted at $ \ensuremath{\mathtt{u}}_j\ensuremath{\mathtt{.left}}$ , since $ i<j$ . On the other hand, the search path for $ \mathtt{x}$ will never visit this subtree because it will proceed to $ \ensuremath{\mathtt{u}}_j\ensuremath{\mathtt{.right}}$ after visiting $ \ensuremath{\mathtt{u}}_j$ . **Figure 7.3:** The value $ i<\ensuremath{\mathtt{x}}$ is on the search path for $ \mathtt{x}$ if and only if $ i$ is the first element among $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ added to the tree. ![% latex2html id marker 54970 \includegraphics[width=\textwidth ]{figs/rbst-records}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2923.png.webp) Similarly, for $ i>\ensuremath{\mathtt{x}}$ , $ i$ appears in the search path for $ \mathtt{x}$ if and only if $ i$ appears before any of $ \{\lceil\ensuremath{\mathtt{x}}\rceil, \lceil\ensuremath{\mathtt{x}}\rceil+1,\ldots,i-1\}$ in the random permutation used to create $ T$ . Notice that, if we start with a random permutation of $ \{0,\ldots,\ensuremath{\mathtt{n}}\}$ , then the subsequences containing only $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ and $ \{\lceil\ensuremath{\mathtt{x}}\rceil, \lceil\ensuremath{\mathtt{x}}\rceil+1,\ldots,i-1\}$ are also random permutations of their respective elements. Each element, then, in the subsets $ \{i,i+1,\ldots,\lfloor\ensuremath{\mathtt{x}}\rfloor\}$ and $ \{\lceil\ensuremath{\mathtt{x}}\rceil, \lceil\ensuremath{\mathtt{x}}\rceil+1,\ldots,i-1\}$ is equally likely to appear before any other in its subset in the random permutation used to create $ T$ . So we have

![$\displaystyle \Pr\{$](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2940.png.webp) ![$\displaystyle \mbox{$i$\ is on the search path for \ensuremath{\mathtt{x}}}$](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2941.png.webp) ![$\displaystyle \} = \left\{ \begin{array}{ll} 1/(\lfloor\ensuremath{\mathtt{x}... ...+1) & \mbox{if $i > \ensuremath{\mathtt{x}}$} \end{array}\right . \enspace . $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2942.png.webp)

With this observation, the proof of Lemma 7.1 involves some simple calculations with harmonic numbers:

*Proof*. [Proof of Lemma 7.1] Let $ I_i$ be the indicator random variable that is equal to one when $ i$ appears on the search path for $ \mathtt{x}$ and zero otherwise. Then the length of the search path is given by

![$\displaystyle \sum_{i\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}\setminus\{\ensuremath{\mathtt{x}}\}} I_i $](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2947.png.webp)

so, if $ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ , the expected length of the search path is given by (see Figure 7.4.a)

| $\displaystyle \mathrm{E}\left[\sum_{i=0}^{\ensuremath{\mathtt{x}}-1} I_i + \sum_{i=\ensuremath{\mathtt{x}}+1}^{\ensuremath{\mathtt{n}}-1} I_i\right]$ | ![المعادلة الأصلية: حساب الطول المتوقع لمسار البحث في شجرة البحث الثنائية العشوائية، الصيغة 1](/images/open-data-structures/math-70abe543986e6ce31249.webp) |  |
| --- | --- | --- |
|  | ![المعادلة الأصلية: حساب الطول المتوقع لمسار البحث في شجرة البحث الثنائية العشوائية، الصيغة 2](/images/open-data-structures/math-662da9b9197de555bcb9.webp) |  |
|  | ![المعادلة الأصلية: حساب الطول المتوقع لمسار البحث في شجرة البحث الثنائية العشوائية، الصيغة 3](/images/open-data-structures/math-42e67a5963e6f0fe7601.webp) |  |
|  | $\displaystyle = \frac{1}{2}+\frac{1}{3}+\cdots+\frac{1}{\ensuremath{\mathtt{x}}+1}$ |  |
|  | $\displaystyle \quad {} + \frac{1}{2}+\frac{1}{3}+\cdots+\frac{1}{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}}$ |  |
|  | $\displaystyle = H_{\ensuremath{\mathtt{x}}+1} + H_{\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}} - 2 \enspace .$ |  |

The corresponding calculations for a search value $ \ensuremath{\mathtt{x}}\in(-1,n)\setminus\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$ are almost identical (see Figure 7.4.b). ![$ \qedsymbol$](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2943.png.webp)

**Figure 7.4:** The probabilities of an element being on the search path for $ \mathtt{x}$ when (a) $ \mathtt{x}$ is an integer and (b) when $ \mathtt{x}$ is not an integer. ![\includegraphics[width=\textwidth ]{figs/rbst-probs-a}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2957.png.webp) (a) ![\includegraphics[width=\textwidth ]{figs/rbst-probs-b}](/images/open-data-structures/7_1_Random_Binary_Search_Tr-img2958.png.webp) (b) 7.1.2 Summary The following theorem summarizes the performance of a random binary search tree: **Theorem 7..1** *A random binary search tree can be constructed in $ O(\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}})$ time. In a random binary search tree, the $ \mathtt{find(x)}$ operation takes $ O(\log \ensuremath{\mathtt{n}})$ expected time.*

We should emphasize again that the expectation in Theorem 7.1 is with respect to the random permutation used to create the random binary search tree. In particular, it does not depend on a random choice of $ \mathtt{x}$ ; it is true for every value of $ \mathtt{x}$ .

#### Footnotes

....7.1 The expressions $ \ensuremath{\mathtt{x}}+1$ and $ \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{x}}$ can be interpreted respectively as the number of elements in the tree less than or equal to $ \mathtt{x}$ and the number of elements in the tree greater than or equal to $ \mathtt{x}$ . [opendatastructures.org](http://opendatastructures.org/)

## 7.2 Treap: A Randomized Binary Search Tree

**Subsections**

# 7.2 Treap: A Randomized Binary Search Tree

The problem with random binary search trees is, of course, that they are not dynamic. They don't support the $ \mathtt{add(x)}$ or $ \mathtt{remove(x)}$ operations needed to implement the SSet interface. In this section we describe a data structure called a Treap that uses Lemma 7.1 to implement the SSet interface.7.2 A node in a Treap is like a node in a BinarySearchTree in that it has a data value, $ \mathtt{x}$ , but it also contains a unique numerical priority, $ \mathtt{p}$ , that is assigned at random:

```
    class Node<T> extends BinarySearchTree.BSTNode<Node<T>,T> {
        int p;
    }
```

In addition to being a binary search tree, the nodes in a Treap also obey the heap property:

- (Heap Property) At every node $ \mathtt{u}$ , except the root, $ \ensuremath{\mathtt{u.parent.p}} < \ensuremath{\mathtt{u.p}}$ .

In other words, each node has a priority smaller than that of its two children. An example is shown in Figure 7.5.

**Figure 7.5:** An example of a Treap containing the integers $ 0,\ldots,9$ . Each node, $ \mathtt{u}$ , is illustrated as a box containing $ \ensuremath{\mathtt{u.x}},\ensuremath{\mathtt{u.p}}$ . ![\includegraphics[width=\textwidth ]{figs/treap}](/images/open-data-structures/7_2_Treap_Randomized_Binary-img2973.png.webp) The heap and binary search tree conditions together ensure that, once the key ( $ \mathtt{x}$ ) and priority ( $ \mathtt{p}$ ) for each node are defined, the shape of the Treap is completely determined. The heap property tells us that the node with minimum priority has to be the root, $ \mathtt{r}$ , of the Treap. The binary search tree property tells us that all nodes with keys smaller than $ \mathtt{r.x}$ are stored in the subtree rooted at $ \mathtt{r.left}$ and all nodes with keys larger than $ \mathtt{r.x}$ are stored in the subtree rooted at $ \mathtt{r.right}$ . The important point about the priority values in a Treap is that they are unique and assigned at random. Because of this, there are two equivalent ways we can think about a Treap. As defined above, a Treap obeys the heap and binary search tree properties. Alternatively, we can think of a Treap as a BinarySearchTree whose nodes were added in increasing order of priority. For example, the Treap in Figure 7.5 can be obtained by adding the sequence of $ (\ensuremath{\mathtt{x}},\ensuremath{\mathtt{p}})$ values

![$\displaystyle \langle (3,1), (1,6), (0,9), (5,11), (4,14), (9,17), (7,22), (6,42), (8,49), (2,99) \rangle $](/images/open-data-structures/7_2_Treap_Randomized_Binary-img2985.png.webp)

into a BinarySearchTree.

Since the priorities are chosen randomly, this is equivalent to taking a random permutation of the keys--in this case the permutation is

![$\displaystyle \langle 3, 1, 0, 5, 9, 4, 7, 6, 8, 2 \rangle $](/images/open-data-structures/7_2_Treap_Randomized_Binary-img2986.png.webp)

--and adding these to a BinarySearchTree. But this means that the shape of a treap is identical to that of a random binary search tree. In particular, if we replace each key $ \mathtt{x}$ by its rank,7.3 then Lemma 7.1 applies. Restating Lemma 7.1 in terms of Treaps, we have:

**Lemma 7..2** *In a Treap that stores a set $ S$ of $ \mathtt{n}$ keys, the following statements hold: * For any $ \ensuremath{\mathtt{x}}\in S$ , the expected length of the search path for $ \mathtt{x}$ is $ H_{r(\ensuremath{\mathtt{x}})+1} + H_{\ensuremath{\mathtt{n}}-r(\ensuremath{\mathtt{x}})} - O(1)$ . For any $ \ensuremath{\mathtt{x}}\not\in S$ , the expected length of the search path for $ \mathtt{x}$ is $ H_{r(\ensuremath{\mathtt{x}})} + H_{\ensuremath{\mathtt{n}}-r(\ensuremath{\mathtt{x}})}$ . * Here, $ r(\ensuremath{\mathtt{x}})$ denotes the rank of $ \mathtt{x}$ in the set $ S\cup\{\ensuremath{\mathtt{x}}\}$ .*

Again, we emphasize that the expectation in Lemma 7.2 is taken over the random choices of the priorities for each node. It does not require any assumptions about the randomness in the keys. Lemma 7.2 tells us that Treaps can implement the $ \mathtt{find(x)}$ operation efficiently. However, the real benefit of a Treap is that it can support the $ \mathtt{add(x)}$ and $ \mathtt{delete(x)}$ operations. To do this, it needs to perform rotations in order to maintain the heap property. Refer to Figure 7.6. A rotation in a binary search tree is a local modification that takes a parent $ \mathtt{u}$ of a node $ \mathtt{w}$ and makes $ \mathtt{w}$ the parent of $ \mathtt{u}$ , while preserving the binary search tree property. Rotations come in two flavours: left or right depending on whether $ \mathtt{w}$ is a right or left child of $ \mathtt{u}$ , respectively.

The code that implements this has to handle these two possibilities and be careful of a boundary case (when $ \mathtt{u}$ is the root), so the actual code is a little longer than Figure 7.6 would lead a reader to believe:

```
    void rotateLeft(Node u) {
        Node w = u.right;
        w.parent = u.parent;
        if (w.parent != nil) {
            if (w.parent.left == u) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        u.right = w.left;
        if (u.right != nil) {
            u.right.parent = u;
        }
        u.parent = w;
        w.left = u;
        if (u == r) { r = w; r.parent = nil; }
    }    
    void rotateRight(Node u) {
        Node w = u.left;
        w.parent = u.parent;
        if (w.parent != nil) {
            if (w.parent.left == u) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        u.left = w.right;
        if (u.left != nil) {
            u.left.parent = u;
        }
        u.parent = w;
        w.right = u;
        if (u == r) { r = w; r.parent = nil; }
    }
```

In terms of the Treap data structure, the most important property of a rotation is that the depth of $ \mathtt{w}$ decreases by one while the depth of $ \mathtt{u}$ increases by one. Using rotations, we can implement the $ \mathtt{add(x)}$ operation as follows: We create a new node, $ \mathtt{u}$ , assign $ \mathtt{u.x=x}$ , and pick a random value for $ \mathtt{u.p}$ . Next we add $ \mathtt{u}$ using the usual $ \mathtt{add(x)}$ algorithm for a BinarySearchTree, so that $ \mathtt{u}$ is now a leaf of the Treap. At this point, our Treap satisfies the binary search tree property, but not necessarily the heap property. In particular, it may be the case that $ \mathtt{u.parent.p > u.p}$ . If this is the case, then we perform a rotation at node $ \mathtt{w}$ = $ \mathtt{u.parent}$ so that $ \mathtt{u}$ becomes the parent of $ \mathtt{w}$ . If $ \mathtt{u}$ continues to violate the heap property, we will have to repeat this, decreasing $ \mathtt{u}$ 's depth by one every time, until $ \mathtt{u}$ either becomes the root or $ \ensuremath{\mathtt{u.parent.p}} < \ensuremath{\mathtt{u.p}}$ .

```
    boolean add(T x) {
        Node<T> u = newNode();
        u.x = x;
        u.p = rand.nextInt();
        if (super.add(u)) {
            bubbleUp(u);
            return true;
        }
        return false;
    }
    void bubbleUp(Node<T> u) {
        while (u.parent != nil && u.parent.p > u.p) {
            if (u.parent.right == u) {
                rotateLeft(u.parent);
            } else {
                rotateRight(u.parent);
            }
        }
        if (u.parent == nil) {
            r = u;
        }
    }
```

An example of an $ \mathtt{add(x)}$ operation is shown in Figure 7.7.

The running time of the $ \mathtt{add(x)}$ operation is given by the time it takes to follow the search path for $ \mathtt{x}$ plus the number of rotations performed to move the newly-added node, $ \mathtt{u}$ , up to its correct location in the Treap. By Lemma 7.2, the expected length of the search path is at most $ 2\ln \ensuremath{\mathtt{n}}+O(1)$ . Furthermore, each rotation decreases the depth of $ \mathtt{u}$ . This stops if $ \mathtt{u}$ becomes the root, so the expected number of rotations cannot exceed the expected length of the search path. Therefore, the expected running time of the $ \mathtt{add(x)}$ operation in a Treap is $ O(\log \ensuremath{\mathtt{n}})$ . (Exercise 7.5 asks you to show that the expected number of rotations performed during an addition is actually only $ O(1)$ .) The $ \mathtt{remove(x)}$ operation in a Treap is the opposite of the $ \mathtt{add(x)}$ operation. We search for the node, $ \mathtt{u}$ , containing $ \mathtt{x}$ , then perform rotations to move $ \mathtt{u}$ downwards until it becomes a leaf, and then we splice $ \mathtt{u}$ from the Treap. Notice that, to move $ \mathtt{u}$ downwards, we can perform either a left or right rotation at $ \mathtt{u}$ , which will replace $ \mathtt{u}$ with $ \mathtt{u.right}$ or $ \mathtt{u.left}$ , respectively. The choice is made by the first of the following that apply:

1. If $ \mathtt{u.left}$ and $ \mathtt{u.right}$ are both $ \mathtt{null}$ , then $ \mathtt{u}$ is a leaf and no rotation is performed.
2. If $ \mathtt{u.left}$ (or $ \mathtt{u.right}$ ) is $ \mathtt{null}$ , then perform a right (or left, respectively) rotation at $ \mathtt{u}$ .
3. If $ \ensuremath{\mathtt{u.left.p}} < \ensuremath{\mathtt{u.right.p}}$ (or $ \ensuremath{\mathtt{u.left.p}} > \ensuremath{\mathtt{u.right.p}})$ , then perform a right rotation (or left rotation, respectively) at $ \mathtt{u}$ .

These three rules ensure that the Treap doesn't become disconnected and that the heap property is restored once $ \mathtt{u}$ is removed.

```
    boolean remove(T x) {
        Node<T> u = findLast(x);
        if (u != nil && compare(u.x, x) == 0) {
            trickleDown(u);
            splice(u);
            return true;
        }
        return false;
    }
    void trickleDown(Node<T> u) {
        while (u.left != nil || u.right != nil) {
            if (u.left == nil) {
                rotateLeft(u);
            } else if (u.right == nil) {
                rotateRight(u);
            } else if (u.left.p < u.right.p) {
                rotateRight(u);
            } else {
                rotateLeft(u);
            }
            if (r == u) {
                r = u.parent;
            }
        }
    }
```

An example of the $ \mathtt{remove(x)}$ operation is shown in Figure 7.8.

The trick to analyze the running time of the $ \mathtt{remove(x)}$ operation is to notice that this operation reverses the $ \mathtt{add(x)}$ operation. In particular, if we were to reinsert $ \mathtt{x}$ , using the same priority $ \mathtt{u.p}$ , then the $ \mathtt{add(x)}$ operation would do exactly the same number of rotations and would restore the Treap to exactly the same state it was in before the $ \mathtt{remove(x)}$ operation took place. (Reading from bottom-to-top, Figure 7.8 illustrates the addition of the value 9 into a Treap.) This means that the expected running time of the $ \mathtt{remove(x)}$ on a Treap of size $ \mathtt{n}$ is proportional to the expected running time of the $ \mathtt{add(x)}$ operation on a Treap of size $ \ensuremath{\mathtt{n}}-1$ . We conclude that the expected running time of $ \mathtt{remove(x)}$ is $ O(\log \ensuremath{\mathtt{n}})$ . 7.2.1 Summary The following theorem summarizes the performance of the Treap data structure: **Theorem 7..2** *A Treap implements the SSet interface. A Treap supports the operations $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ in $ O(\log \ensuremath{\mathtt{n}})$ expected time per operation.*

It is worth comparing the Treap data structure to the SkiplistSSet data structure. Both implement the SSet operations in $ O(\log \ensuremath{\mathtt{n}})$ expected time per operation. In both data structures, $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ involve a search and then a constant number of pointer changes (see Exercise 7.5 below). Thus, for both these structures, the expected length of the search path is the critical value in assessing their performance. In a SkiplistSSet, the expected length of a search path is

![$\displaystyle 2\log \ensuremath{\mathtt{n}} + O(1) \enspace , $](/images/open-data-structures/7_2_Treap_Randomized_Binary-img3092.png.webp)

In a Treap, the expected length of a search path is

![$\displaystyle 2\ln \ensuremath{\mathtt{n}} +O(1) \approx 1.386\log \ensuremath{\mathtt{n}} + O(1) \enspace . $](/images/open-data-structures/7_2_Treap_Randomized_Binary-img3093.png.webp)

Thus, the search paths in a Treap are considerably shorter and this translates into noticeably faster operations on Treaps than Skiplists. Exercise 4.7 in Chapter 4 shows how the expected length of the search path in a Skiplist can be reduced to

![$\displaystyle e\ln \ensuremath{\mathtt{n}} + O(1) \approx 1.884\log \ensuremath{\mathtt{n}} + O(1) $](/images/open-data-structures/7_2_Treap_Randomized_Binary-img3094.png.webp)

by using biased coin tosses. Even with this optimization, the expected length of search paths in a SkiplistSSet is noticeably longer than in a Treap.

#### Footnotes

... interface.7.2 The names Treap comes from the fact that this data structure is simultaneously a binary search tree (Section 6.2) and a heap (Chapter 10). ... rank,7.3 The rank of an element $ \mathtt{x}$ in a set $ S$ of elements is the number of elements in $ S$ that are less than $ \mathtt{x}$ . [opendatastructures.org](http://opendatastructures.org/)

## 7.3 Discussion and Exercises

Random binary search trees have been studied extensively. Devroye [19] gives a proof of Lemma 7.1 and related results. There are much stronger results in the literature as well, the most impressive of which is due to Reed [64], who shows that the expected height of a random binary search tree is

![$\displaystyle \alpha\ln n - \beta\ln\ln n + O(1) $](/images/open-data-structures/7_3_Discussion_Exercises-img3095.png.webp)

where $ \alpha\approx4.31107$ is the unique solution on the interval $ [2,\infty)$ of the equation $ \alpha\ln((2e/\alpha))=1$ and $ \beta=\frac{3}{2\ln(\alpha/2)}$ . Furthermore, the variance of the height is constant.

The name Treap was coined by Seidel and Aragon [67] who discussed Treaps and some of their variants. However, their basic structure was studied much earlier by Vuillemin [76] who called them Cartesian trees. One possible space-optimization of the Treap data structure is the elimination of the explicit storage of the priority $ \mathtt{p}$ in each node. Instead, the priority of a node, $ \mathtt{u}$ , is computed by hashing $ \mathtt{u}$ 's address in memory (in 32-bit Java, this is equivalent to hashing $ \mathtt{u.hashCode()}$ ). Although a number of hash functions will probably work well for this in practice, for the important parts of the proof of Lemma 7.1 to remain valid, the hash function should be randomized and have the min-wise independent property: For any distinct values $ x_1,\ldots,x_k$ , each of the hash values $ h(x_1),\ldots,h(x_k)$ should be distinct with high probability and, for each $ i\in\{1,\ldots,k\}$ ,

![$\displaystyle \Pr\{h(x_i) = \min\{h(x_1),\ldots,h(x_k)\}\} \le c/k $](/images/open-data-structures/7_3_Discussion_Exercises-img3107.png.webp)

for some constant $ c$ . One such class of hash functions that is easy to implement and fairly fast is tabulation hashing (Section 5.2.3).

Another Treap variant that doesn't store priorities at each node is the randomized binary search tree of Mart&#237;nez and Roura [51]. In this variant, every node, $ \mathtt{u}$ , stores the size, $ \mathtt{u.size}$ , of the subtree rooted at $ \mathtt{u}$ . Both the $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ algorithms are randomized. The algorithm for adding $ \mathtt{x}$ to the subtree rooted at $ \mathtt{u}$ does the following: With probability $ 1/(\ensuremath{\mathtt{size(u)}}+1)$ , the value $ \mathtt{x}$ is added the usual way, as a leaf, and rotations are then done to bring $ \mathtt{x}$ up to the root of this subtree. Otherwise (with probability $ 1-1/(\ensuremath{\mathtt{size(u)}}+1)$ ), the value $ \mathtt{x}$ is recursively added into one of the two subtrees rooted at $ \mathtt{u.left}$ or $ \mathtt{u.right}$ , as appropriate. The first case corresponds to an $ \mathtt{add(x)}$ operation in a Treap where $ \mathtt{x}$ 's node receives a random priority that is smaller than any of the $ \mathtt{size(u)}$ priorities in $ \mathtt{u}$ 's subtree, and this case occurs with exactly the same probability. Removing a value $ \mathtt{x}$ from a randomized binary search tree is similar to the process of removing from a Treap. We find the node, $ \mathtt{u}$ , that contains $ \mathtt{x}$ and then perform rotations that repeatedly increase the depth of $ \mathtt{u}$ until it becomes a leaf, at which point we can splice it from the tree. The choice of whether to perform a left or right rotation at each step is randomized. With probability $ \mathtt{u.left.size/(u.size-1)}$ , we perform a right rotation at $ \mathtt{u}$ , making $ \mathtt{u.left}$ the root of the subtree that was formerly rooted at $ \mathtt{u}$ . With probability $ \mathtt{u.right.size/(u.size-1)}$ , we perform a left rotation at $ \mathtt{u}$ , making $ \mathtt{u.right}$ the root of the subtree that was formerly rooted at $ \mathtt{u}$ . Again, we can easily verify that these are exactly the same probabilities that the removal algorithm in a Treap will perform a left or right rotation of $ \mathtt{u}$ . Randomized binary search trees have the disadvantage, compared to treaps, that when adding and removing elements they make many random choices, and they must maintain the sizes of subtrees. One advantage of randomized binary search trees over treaps is that subtree sizes can serve another useful purpose, namely to provide access by rank in $ O(\log \ensuremath{\mathtt{n}})$ expected time (see Exercise 7.10). In comparison, the random priorities stored in treap nodes have no use other than keeping the treap balanced. **Exercise 7..1** Illustrate the addition of 4.5 (with priority 7) and then 7.5 (with priority 20) on the Treap in Figure 7.5.

**Exercise 7..2** Illustrate the removal of 5 and then 7 on the Treap in Figure 7.5.

**Exercise 7..3** Prove the assertion that there are $ 21,964,800$ sequences that generate the tree on the right hand side of Figure 7.1. (Hint: Give a recursive formula for the number of sequences that generate a complete binary tree of height $ h$ and evaluate this formula for $ h=3$ .)

**Exercise 7..4** Design and implement the $ \mathtt{permute(a)}$ method that takes as input an array, $ \mathtt{a}$ , that contains $ \mathtt{n}$ distinct values and randomly permutes $ \mathtt{a}$ . The method should run in $ O(\ensuremath{\mathtt{n}})$ time and you should prove that each of the $ \ensuremath{\mathtt{n}}!$ possible permutations of $ \mathtt{a}$ is equally probable.

**Exercise 7..5** Use both parts of Lemma 7.2 to prove that the expected number of rotations performed by an $ \mathtt{add(x)}$ operation (and hence also a $ \mathtt{remove(x)}$ operation) is $ O(1)$ .

**Exercise 7..6** Modify the Treap implementation given here so that it does not explicitly store priorities. Instead, it should simulate them by hashing the $ \mathtt{hashCode()}$ of each node.

**Exercise 7..7** Suppose that a binary search tree stores, at each node, $ \mathtt{u}$ , the height, $ \mathtt{u.height}$ , of the subtree rooted at $ \mathtt{u}$ , and the size, $ \mathtt{u.size}$ of the subtree rooted at $ \mathtt{u}$ . Show how, if we perform a left or right rotation at $ \mathtt{u}$ , then these two quantities can be updated, in constant time, for all nodes affected by the rotation. Explain why the same result is not possible if we try to also store the depth, $ \mathtt{u.depth}$ , of each node $ \mathtt{u}$ .

**Exercise 7..8** Design and implement an algorithm that constructs a Treap from a sorted array, $ \mathtt{a}$ , of $ \mathtt{n}$ elements. This method should run in $ O(\ensuremath{\mathtt{n}})$ worst-case time and should construct a Treap that is indistinguishable from one in which the elements of $ \mathtt{a}$ were added one at a time using the $ \mathtt{add(x)}$ method.

**Exercise 7..9** This exercise works out the details of how one can efficiently search a Treap given a pointer that is close to the node we are searching for. Design and implement a Treap implementation in which each node keeps track of the minimum and maximum values in its subtree. Using this extra information, add a $ \mathtt{fingerFind(x,u)}$ method that executes the $ \mathtt{find(x)}$ operation with the help of a pointer to the node $ \mathtt{u}$ (which is hopefully not far from the node that contains $ \mathtt{x}$ ). This operation should start at $ \mathtt{u}$ and walk upwards until it reaches a node $ \mathtt{w}$ such that $ \ensuremath{\mathtt{w.min}}\le \ensuremath{\mathtt{x}}\le \ensuremath{\mathtt{w.max}}$ . From that point onwards, it should perform a standard search for $ \mathtt{x}$ starting from $ \mathtt{w}$ . (One can show that $ \mathtt{fingerFind(x,u)}$ takes $ O(1+\log r)$ time, where $ r$ is the number of elements in the treap whose value is between $ \mathtt{x}$ and $ \mathtt{u.x}$ .) Extend your implementation into a version of a treap that starts all its $ \mathtt{find(x)}$ operations from the node most recently found by $ \mathtt{find(x)}$ .

**Exercise 7..10** Design and implement a version of a Treap that includes a $ \mathtt{get(i)}$ operation that returns the key with rank $ \mathtt{i}$ in the Treap. (Hint: Have each node, $ \mathtt{u}$ , keep track of the size of the subtree rooted at $ \mathtt{u}$ .)

**Exercise 7..11** Implement a TreapList, an implementation of the List interface as a treap. Each node in the treap should store a list item, and an in-order traversal of the treap finds the items in the same order that they occur in the list. All the List operations $ \mathtt{get(i)}$ , $ \mathtt{set(i,x)}$ , $ \mathtt{add(i,x)}$ and $ \mathtt{remove(i)}$ should run in $ O(\log \ensuremath{\mathtt{n}})$ expected time.

**Exercise 7..12** Design and implement a version of a Treap that supports the $ \mathtt{split(x)}$ operation. This operation removes all values from the Treap that are greater than $ \mathtt{x}$ and returns a second Treap that contains all the removed values. Example: the code $ \mathtt{t2 = t.split(x)}$ removes from $ \mathtt{t}$ all values greater than $ \mathtt{x}$ and returns a new Treap $ \mathtt{t2}$ containing all these values. The $ \mathtt{split(x)}$ operation should run in $ O(\log \ensuremath{\mathtt{n}})$ expected time. Warning: For this modification to work properly and still allow the $ \mathtt{size()}$ method to run in constant time, it is necessary to implement the modifications in Exercise 7.10.

**Exercise 7..13** Design and implement a version of a Treap that supports the $ \mathtt{absorb(t2)}$ operation, which can be thought of as the inverse of the $ \mathtt{split(x)}$ operation. This operation removes all values from the Treap $ \mathtt{t2}$ and adds them to the receiver. This operation presupposes that the smallest value in $ \mathtt{t2}$ is greater than the largest value in the receiver. The $ \mathtt{absorb(t2)}$ operation should run in $ O(\log \ensuremath{\mathtt{n}})$ expected time.

**Exercise 7..14** Implement Martinez's randomized binary search trees, as discussed in this section. Compare the performance of your implementation with that of the Treap implementation.

[opendatastructures.org](http://opendatastructures.org/)
