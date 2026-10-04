---
title: "8. Scapegoat Trees"
lang: en
---

In this chapter, we study a binary search tree data structure, the ScapegoatTree. This structure is based on the common wisdom that, when something goes wrong, the first thing people tend to do is find someone to blame (the scapegoat). Once blame is firmly established, we can leave the scapegoat to fix the problem. A ScapegoatTree keeps itself balanced by partial rebuilding operations. During a partial rebuilding operation, an entire subtree is deconstructed and rebuilt into a perfectly balanced subtree. There are many ways of rebuilding a subtree rooted at node $ \mathtt{u}$ into a perfectly balanced tree. One of the simplest is to traverse $ \mathtt{u}$ 's subtree, gathering all its nodes into an array, $ \mathtt{a}$ , and then to recursively build a balanced subtree using $ \mathtt{a}$ . If we let $ \ensuremath{\mathtt{m}}=\ensuremath{\mathtt{a.length}}/2$ , then the element $ \mathtt{a[m]}$ becomes the root of the new subtree, $ \ensuremath{\mathtt{a}}[0],\ldots,\ensuremath{\mathtt{a}}[\ensuremath{\mathtt{m}}-1]$ get stored recursively in the left subtree and $ \ensuremath{\mathtt{a}}[\ensuremath{\mathtt{m}}+1],\ldots,\ensuremath{\mathtt{a}}[\ensuremath{\mathtt{a.length}}-1]$ get stored recursively in the right subtree.

```
    void rebuild(Node<T> u) {
        int ns = size(u);
        Node<T> p = u.parent;
        Node<T>[] a = (Node<T>[]) Array.newInstance(Node.class, ns);
        packIntoArray(u, a, 0);
        if (p == nil) {
            r = buildBalanced(a, 0, ns);
            r.parent = nil;
        } else if (p.right == u) {
            p.right = buildBalanced(a, 0, ns);
            p.right.parent = p;
        } else {
            p.left = buildBalanced(a, 0, ns);
            p.left.parent = p;
        }
    }
    int packIntoArray(Node<T> u, Node<T>[] a, int i) {
        if (u == nil) {
            return i;
        }
        i = packIntoArray(u.left, a, i);
        a[i++] = u;
        return packIntoArray(u.right, a, i);
    }
    Node<T> buildBalanced(Node<T>[] a, int i, int ns) {
        if (ns == 0)
            return nil;
        int m = ns / 2;
        a[i + m].left = buildBalanced(a, i, m);
        if (a[i + m].left != nil)
            a[i + m].left.parent = a[i + m];
        a[i + m].right = buildBalanced(a, i + m + 1, ns - m - 1);
        if (a[i + m].right != nil)
            a[i + m].right.parent = a[i + m];
        return a[i + m];
    }
```

A call to $ \mathtt{rebuild(u)}$ takes $ O(\ensuremath{\mathtt{size(u)}})$ time. The resulting subtree has minimum height; there is no tree of smaller height that has $ \mathtt{size(u)}$ nodes.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 8.1 ScapegoatTree: A Binary Search Tree with Partial Rebuilding

**Subsections**

# 8.1 ScapegoatTree: A Binary Search Tree with Partial Rebuilding

A ScapegoatTree is a BinarySearchTree that, in addition to keeping track of the number, $ \mathtt{n}$ , of nodes in the tree also keeps a counter, $ \mathtt{q}$ , that maintains an upper-bound on the number of nodes.

```
    int q;
```

At all times, $ \mathtt{n}$ and $ \mathtt{q}$ obey the following inequalities:

![$\displaystyle \ensuremath{\mathtt{q}}/2 \le \ensuremath{\mathtt{n}} \le \ensuremath{\mathtt{q}} \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3223.png.webp)

In addition, a ScapegoatTree has logarithmic height; at all times, the height of the scapegoat tree does not exceed

Even with this constraint, a ScapegoatTree can look surprisingly unbalanced. The tree in Figure 8.1 has $ \ensuremath{\mathtt{q}}=\ensuremath{\mathtt{n}}=10$ and height $ 5<\log_{3/2}10 \approx 5.679$ .

**Figure 8.1:** A ScapegoatTree with 10 nodes and height 5. ![\includegraphics[scale=0.90909]{figs/scapegoat-insert-1}](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3227.png.webp) Implementing the $ \mathtt{find(x)}$ operation in a ScapegoatTree is done using the standard algorithm for searching in a BinarySearchTree (see Section 6.2). This takes time proportional to the height of the tree which, by (8.1) is $ O(\log \ensuremath{\mathtt{n}})$ . To implement the $ \mathtt{add(x)}$ operation, we first increment $ \mathtt{n}$ and $ \mathtt{q}$ and then use the usual algorithm for adding $ \mathtt{x}$ to a binary search tree; we search for $ \mathtt{x}$ and then add a new leaf $ \mathtt{u}$ with $ \ensuremath{\mathtt{u.x}}=\ensuremath{\mathtt{x}}$ . At this point, we may get lucky and the depth of $ \mathtt{u}$ might not exceed $ \log_{3/2}\ensuremath{\mathtt{q}}$ . If so, then we leave well enough alone and don't do anything else. Unfortunately, it will sometimes happen that $ \ensuremath{\mathtt{depth(u)}} > \log_{3/2} \ensuremath{\mathtt{q}}$ . In this case, we need to reduce the height. This isn't a big job; there is only one node, namely $ \mathtt{u}$ , whose depth exceeds $ \log_{3/2} \ensuremath{\mathtt{q}}$ . To fix $ \mathtt{u}$ , we walk from $ \mathtt{u}$ back up to the root looking for a scapegoat, $ \mathtt{w}$ . The scapegoat, $ \mathtt{w}$ , is a very unbalanced node. It has the property that

where $ \mathtt{w.child}$ is the child of $ \mathtt{w}$ on the path from the root to $ \mathtt{u}$ . We'll very shortly prove that a scapegoat exists. For now, we can take it for granted. Once we've found the scapegoat $ \mathtt{w}$ , we completely destroy the subtree rooted at $ \mathtt{w}$ and rebuild it into a perfectly balanced binary search tree. We know, from (8.2), that, even before the addition of $ \mathtt{u}$ , $ \mathtt{w}$ 's subtree was not a complete binary tree. Therefore, when we rebuild $ \mathtt{w}$ , the height decreases by at least 1 so that the height of the ScapegoatTree is once again at most $ \log_{3/2}\ensuremath{\mathtt{q}}$ .

```
    boolean add(T x) {
        // first do basic insertion keeping track of depth
        Node<T> u = newNode(x);
        int d = addWithDepth(u);
        if (d > log32(q)) {
            // depth exceeded, find scapegoat
            Node<T> w = u.parent;
            while (3*size(w) <= 2*size(w.parent))
                w = w.parent;
            rebuild(w.parent);
        }
        return d >= 0;
    }
```

If we ignore the cost of finding the scapegoat $ \mathtt{w}$ and rebuilding the subtree rooted at $ \mathtt{w}$ , then the running time of $ \mathtt{add(x)}$ is dominated by the initial search, which takes $ O(\log \ensuremath{\mathtt{q}}) = O(\log \ensuremath{\mathtt{n}})$ time. We will account for the cost of finding the scapegoat and rebuilding using amortized analysis in the next section. The implementation of $ \mathtt{remove(x)}$ in a ScapegoatTree is very simple. We search for $ \mathtt{x}$ and remove it using the usual algorithm for removing a node from a BinarySearchTree. (Note that this can never increase the height of the tree.) Next, we decrement $ \mathtt{n}$ , but leave $ \mathtt{q}$ unchanged. Finally, we check if $ \ensuremath{\mathtt{q}} > 2\ensuremath{\mathtt{n}}$ and, if so, then we rebuild the entire tree into a perfectly balanced binary search tree and set $ \ensuremath{\mathtt{q}}=\ensuremath{\mathtt{n}}$ .

```
    boolean remove(T x) {
        if (super.remove(x)) {
            if (2*n < q) {
                rebuild(r);
                q = n;
            }
            return true;
        }
        return false;
    }
```

Again, if we ignore the cost of rebuilding, the running time of the $ \mathtt{remove(x)}$ operation is proportional to the height of the tree, and is therefore $ O(\log \ensuremath{\mathtt{n}})$ .

8.1.1 Analysis of Correctness and Running-Time In this section, we analyze the correctness and amortized running time of operations on a ScapegoatTree. We first prove the correctness by showing that, when the $ \mathtt{add(x)}$ operation results in a node that violates Condition (8.1), then we can always find a scapegoat: **Lemma 8..1** *Let $ \mathtt{u}$ be a node of depth $ h>\log_{3/2} \ensuremath{\mathtt{q}}$ in a ScapegoatTree. Then there exists a node $ \ensuremath{\mathtt{w}}$ on the path from $ \mathtt{u}$ to the root such that *

![$\displaystyle \frac{\ensuremath{\mathtt{size(w)}}}{\ensuremath{\mathtt{size(parent(w))}}} > 2/3 \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3276.png.webp)

*Proof*. Suppose, for the sake of contradiction, that this is not the case, and

![$\displaystyle \frac{\ensuremath{\mathtt{size(w)}}}{\ensuremath{\mathtt{size(parent(w))}}} \le 2/3 \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3278.png.webp)

for all nodes $ \mathtt{w}$ on the path from $ \mathtt{u}$ to the root. Denote the path from the root to $ \mathtt{u}$ as $ \ensuremath{\mathtt{r}}=\ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_h=\ensuremath{\mathtt{u}}$ . Then, we have $ \ensuremath{\mathtt{size(u}}_0\ensuremath{\mathtt{)}}=\ensuremath{\mathtt{n}}$ , $ \ensuremath{\mathtt{size(u}}_1\ensuremath{\mathtt{)}}\le\frac{2}{3}\ensuremath{\mathtt{n}}$ , $ \ensuremath{\mathtt{size(u}}_2\ensuremath{\mathtt{)}}\le\frac{4}{9}\ensuremath{\mathtt{n}}$ and, more generally,

![$\displaystyle \ensuremath{\mathtt{size(u}}_i\ensuremath{\mathtt{)}}\le\left(\frac{2}{3}\right)^i\ensuremath{\mathtt{n}} \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3286.png.webp)

But this gives a contradiction, since $ \ensuremath{\mathtt{size(u)}}\ge 1$ , hence

![$\displaystyle 1 \le \ensuremath{\mathtt{size(u)}} \le \left(\frac{2}{3}\right)^... ...suremath{\mathtt{n}}}\right) \ensuremath{\mathtt{n}} = 1 \enspace . \qedhere $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3288.png.webp)

![$ \qedsymbol$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3277.png.webp)

Next, we analyze the parts of the running time that are not yet accounted for. There are two parts: The cost of calls to $ \mathtt{size(u)}$ when searching for scapegoat nodes, and the cost of calls to $ \mathtt{rebuild(w)}$ when we find a scapegoat $ \mathtt{w}$ . The cost of calls to $ \mathtt{size(u)}$ can be related to the cost of calls to $ \mathtt{rebuild(w)}$ , as follows: **Lemma 8..2** *During a call to $ \mathtt{add(x)}$ in a ScapegoatTree, the cost of finding the scapegoat $ \mathtt{w}$ and rebuilding the subtree rooted at $ \mathtt{w}$ is $ O(\ensuremath{\mathtt{size(w)}})$ .*

*Proof*. The cost of rebuilding the scapegoat node $ \mathtt{w}$ , once we find it, is $ O(\ensuremath{\mathtt{size(w)}})$ . When searching for the scapegoat node, we call $ \mathtt{size(u)}$ on a sequence of nodes $ \ensuremath{\mathtt{u}}_0,\ldots,\ensuremath{\mathtt{u}}_k$ until we find the scapegoat $ \ensuremath{\mathtt{u}}_k=\ensuremath{\mathtt{w}}$ . However, since $ \ensuremath{\mathtt{u}}_k$ is the first node in this sequence that is a scapegoat, we know that

![$\displaystyle \ensuremath{\mathtt{size(u}}_{i}\ensuremath{\mathtt{)}} < \frac{2}{3}\ensuremath{\mathtt{size(u}}_{i+1}\ensuremath{\mathtt{)}} $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3305.png.webp)

for all $ i\in\{0,\ldots,k-2\}$ . Therefore, the cost of all calls to $ \mathtt{size(u)}$ is

| ![$\displaystyle O\left( \sum_{i=0}^k \ensuremath{\mathtt{size(u}}_{k-i}\ensuremath{\mathtt{)}} \right)$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3308.png.webp) | ![$\displaystyle =$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3309.png.webp) | ![$\displaystyle O\left( \ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}} + \... ...{i=0}^{k-1} \ensuremath{\mathtt{size(u}}_{k-i-1}\ensuremath{\mathtt{)}} \right)$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3310.png.webp) |  |
| --- | --- | --- | --- |
|  | ![$\displaystyle =$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3311.png.webp) | ![$\displaystyle O\left( \ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}} + \... ...c{2}{3}\right)^i\ensuremath{\mathtt{size(u}}_{k}\ensuremath{\mathtt{)}} \right)$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3312.png.webp) |  |
|  | ![$\displaystyle =$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3313.png.webp) | ![$\displaystyle O\left( \ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}}\left(1+ \sum_{i=0}^{k-1} \left(\frac{2}{3}\right)^i \right)\right)$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3314.png.webp) |  |
|  | ![$\displaystyle =$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3315.png.webp) | ![$\displaystyle O(\ensuremath{\mathtt{size(u}}_k\ensuremath{\mathtt{)}}) = O(\ensuremath{\mathtt{size(w)}}) \enspace ,$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3316.png.webp) |  |

where the last line follows from the fact that the sum is a geometrically decreasing series. ![$ \qedsymbol$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3298.png.webp)

All that remains is to prove an upper-bound on the cost of all calls to $ \mathtt{rebuild(u)}$ during a sequence of $ m$ operations: **Lemma 8..3** *Starting with an empty ScapegoatTree any sequence of $ m$ $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations causes at most $ O(m\log m)$ time to be used by $ \mathtt{rebuild(u)}$ operations.*

*Proof*. To prove this, we will use a credit scheme. We imagine that each node stores a number of credits. Each credit can pay for some constant, $ c$ , units of time spent rebuilding. The scheme gives out a total of $ O(m\log m)$ credits and every call to $ \mathtt{rebuild(u)}$ is paid for with credits stored at $ \mathtt{u}$ .

During an insertion or deletion, we give one credit to each node on the path to the inserted node, or deleted node, $ \mathtt{u}$ . In this way we hand out at most $ \log_{3/2}\ensuremath{\mathtt{q}}\le \log_{3/2}m$ credits per operation. During a deletion we also store an additional credit ``on the side.'' Thus, in total we give out at most $ O(m\log m)$ credits. All that remains is to show that these credits are sufficient to pay for all calls to $ \mathtt{rebuild(u)}$ . If we call $ \mathtt{rebuild(u)}$ during an insertion, it is because $ \mathtt{u}$ is a scapegoat. Suppose, without loss of generality, that

![$\displaystyle \frac{\ensuremath{\mathtt{size(u.left)}}}{\ensuremath{\mathtt{size(u)}}} > \frac{2}{3} \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3335.png.webp)

Using the fact that

![$\displaystyle \ensuremath{\mathtt{size(u)}} = 1 + \ensuremath{\mathtt{size(u.left)}} + \ensuremath{\mathtt{size(u.right)}} $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3336.png.webp)

we deduce that

![$\displaystyle \frac{1}{2}\ensuremath{\mathtt{size(u.left)}} > \ensuremath{\mathtt{size(u.right)}} \enspace $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3337.png.webp)

and therefore

![$\displaystyle \ensuremath{\mathtt{size(u.left)}} - \ensuremath{\mathtt{size(u.r... ...\mathtt{size(u.left)}} > \frac{1}{3}\ensuremath{\mathtt{size(u)}} \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3338.png.webp)

Now, the last time a subtree containing $ \mathtt{u}$ was rebuilt (or when $ \mathtt{u}$ was inserted, if a subtree containing $ \mathtt{u}$ was never rebuilt), we had

![$\displaystyle \ensuremath{\mathtt{size(u.left)}} - \ensuremath{\mathtt{size(u.right)}} \le 1 \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3342.png.webp)

Therefore, the number of $ \mathtt{add(x)}$ or $ \mathtt{remove(x)}$ operations that have affected $ \mathtt{u.left}$ or $ \mathtt{u.right}$ since then is at least

![$\displaystyle \frac{1}{3}\ensuremath{\mathtt{size(u)}} - 1 \enspace . $](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3347.png.webp)

and there are therefore at least this many credits stored at $ \mathtt{u}$ that are available to pay for the $ O(\ensuremath{\mathtt{size(u)}})$ time it takes to call $ \mathtt{rebuild(u)}$ .

If we call $ \mathtt{rebuild(u)}$ during a deletion, it is because $ \ensuremath{\mathtt{q}} > 2\ensuremath{\mathtt{n}}$ . In this case, we have $ \ensuremath{\mathtt{q}}-\ensuremath{\mathtt{n}}> \ensuremath{\mathtt{n}}$ credits stored ``on the side,'' and we use these to pay for the $ O(\ensuremath{\mathtt{n}})$ time it takes to rebuild the root. This completes the proof. ![$ \qedsymbol$](/images/open-data-structures/8_1_ScapegoatTree_Binary_Se-img3324.png.webp)

8.1.2 Summary The following theorem summarizes the performance of the ScapegoatTree data structure: **Theorem 8..1** *A ScapegoatTree implements the SSet interface. Ignoring the cost of $ \mathtt{rebuild(u)}$ operations, a ScapegoatTree supports the operations $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ in $ O(\log \ensuremath{\mathtt{n}})$ time per operation. * *Furthermore, beginning with an empty ScapegoatTree, any sequence of $ m$ $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations results in a total of $ O(m\log m)$ time spent during all calls to $ \mathtt{rebuild(u)}$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 8.2 Discussion and Exercises

The term scapegoat tree is due to Galperin and Rivest [33], who define and analyze these trees. However, the same structure was discovered earlier by Andersson [5,7], who called them general balanced trees since they can have any shape as long as their height is small. Experimenting with the ScapegoatTree implementation will reveal that it is often considerably slower than the other SSet implementations in this book. This may be somewhat surprising, since height bound of

![$\displaystyle \log_{3/2}\ensuremath{\mathtt{q}} \approx 1.709\log \ensuremath{\mathtt{n}} + O(1) $](/images/open-data-structures/8_2_Discussion_Exercises-img3365.png.webp)

is better than the expected length of a search path in a Skiplist and not too far from that of a Treap. The implementation could be optimized by storing the sizes of subtrees explicitly at each node or by reusing already computed subtree sizes (Exercises 8.5 and 8.6). Even with these optimizations, there will always be sequences of $ \mathtt{add(x)}$ and $ \mathtt{delete(x)}$ operation for which a ScapegoatTree takes longer than other SSet implementations.

This gap in performance is due to the fact that, unlike the other SSet implementations discussed in this book, a ScapegoatTree can spend a lot of time restructuring itself. Exercise 8.3 asks you to prove that there are sequences of $ \mathtt{n}$ operations in which a ScapegoatTree will spend on the order of $ \ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$ time in calls to $ \mathtt{rebuild(u)}$ . This is in contrast to other SSet implementations discussed in this book, which only make $ O(\ensuremath{\mathtt{n}})$ structural changes during a sequence of $ \mathtt{n}$ operations. This is, unfortunately, a necessary consequence of the fact that a ScapegoatTree does all its restructuring by calls to $ \mathtt{rebuild(u)}$ [20]. Despite their lack of performance, there are applications in which a ScapegoatTree could be the right choice. This would occur any time there is additional data associated with nodes that cannot be updated in constant time when a rotation is performed, but that can be updated during a $ \mathtt{rebuild(u)}$ operation. In such cases, the ScapegoatTree and related structures based on partial rebuilding may work. An example of such an application is outlined in Exercise 8.11. **Exercise 8..1** Illustrate the addition of the values 1.5 and then 1.6 on the ScapegoatTree in Figure 8.1.

**Exercise 8..2** Illustrate what happens when the sequence $ 1,5,2,4,3$ is added to an empty ScapegoatTree, and show where the credits described in the proof of Lemma 8.3 go, and how they are used during this sequence of additions.

**Exercise 8..3** Show that, if we start with an empty ScapegoatTree and call $ \mathtt{add(x)}$ for $ \ensuremath{\mathtt{x}}=1,2,3,\ldots,\ensuremath{\mathtt{n}}$ , then the total time spent during calls to $ \mathtt{rebuild(u)}$ is at least $ c\ensuremath{\mathtt{n}}\log \ensuremath{\mathtt{n}}$ for some constant $ c>0$ .

**Exercise 8..4** The ScapegoatTree, as described in this chapter, guarantees that the length of the search path does not exceed $ \log_{3/2}\ensuremath{\mathtt{q}}$ . Design, analyze, and implement a modified version of ScapegoatTree where the length of the search path does not exceed $ \log_{\ensuremath{\mathtt{b}}} \ensuremath{\mathtt{q}}$ , where $ \mathtt{b}$ is a parameter with $ 1<\ensuremath{\mathtt{b}}<2$ . What does your analysis and/or your experiments say about the amortized cost of $ \mathtt{find(x)}$ , $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ as a function of $ \mathtt{n}$ and $ \mathtt{b}$ ?

**Exercise 8..5** Modify the $ \mathtt{add(x)}$ method of the ScapegoatTree so that it does not waste any time recomputing the sizes of subtrees that have already been computed. This is possible because, by the time the method wants to compute $ \mathtt{size(w)}$ , it has already computed one of $ \mathtt{size(w.left)}$ or $ \mathtt{size(w.right)}$ . Compare the performance of your modified implementation with the implementation given here.

**Exercise 8..6** Implement a second version of the ScapegoatTree data structure that explicitly stores and maintains the sizes of the subtree rooted at each node. Compare the performance of the resulting implementation with that of the original ScapegoatTree implementation as well as the implementation from Exercise 8.5.

**Exercise 8..7** Reimplement the $ \mathtt{rebuild(u)}$ method discussed at the beginning of this chapter so that it does not require the use of an array to store the nodes of the subtree being rebuilt. Instead, it should use recursion to first connect the nodes into a linked list and then convert this linked list into a perfectly balanced binary tree. (There are very elegant recursive implementations of both steps.)

**Exercise 8..8** Analyze and implement a WeightBalancedTree. This is a tree in which each node $ \mathtt{u}$ , except the root, maintains the balance invariant that $ \ensuremath{\mathtt{size(u)}} \le (2/3)\ensuremath{\mathtt{size(u.parent)}}$ . The $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations are identical to the standard BinarySearchTree operations, except that any time the balance invariant is violated at a node $ \mathtt{u}$ , the subtree rooted at $ \mathtt{u.parent}$ is rebuilt. Your analysis should show that operations on a WeightBalancedTree run in $ O(\log\ensuremath{\mathtt{n}})$ amortized time.

**Exercise 8..9** Analyze and implement a CountdownTree. In a CountdownTree each node $ \mathtt{u}$ keeps a timer $ \mathtt{u.t}$ . The $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations are exactly the same as in a standard BinarySearchTree except that, whenever one of these operations affects $ \mathtt{u}$ 's subtree, $ \mathtt{u.t}$ is decremented. When $ \ensuremath{\mathtt{u.t}}=0$ the entire subtree rooted at $ \mathtt{u}$ is rebuilt into a perfectly balanced binary search tree. When a node $ \mathtt{u}$ is involved in a rebuilding operation (either because $ \mathtt{u}$ is rebuilt or one of $ \mathtt{u}$ 's ancestors is rebuilt) $ \mathtt{u.t}$ is reset to $ \ensuremath{\mathtt{size(u)}}/3$ . Your analysis should show that operations on a CountdownTree run in $ O(\log \ensuremath{\mathtt{n}})$ amortized time. (Hint: First show that each node $ \mathtt{u}$ satisfies some version of a balance invariant.)

**Exercise 8..10** Analyze and implement a DynamiteTree. In a DynamiteTree each node $ \mathtt{u}$ keeps tracks of the size of the subtree rooted at $ \mathtt{u}$ in a variable $ \mathtt{u.size}$ . The $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations are exactly the same as in a standard BinarySearchTree except that, whenever one of these operations affects a node $ \mathtt{u}$ 's subtree, $ \mathtt{u}$ explodes with probability $ 1/\ensuremath{\mathtt{u.size}}$ . When $ \mathtt{u}$ explodes, its entire subtree is rebuilt into a perfectly balanced binary search tree. Your analysis should show that operations on a DynamiteTree run in $ O(\log \ensuremath{\mathtt{n}})$ expected time.

**Exercise 8..11** Design and implement a Sequence data structure that maintains a sequence (list) of elements. It supports these operations: $ \mathtt{addAfter(e)}$ : Add a new element after the element $ \mathtt{e}$ in the sequence. Return the newly added element. (If $ \mathtt{e}$ is null, the new element is added at the beginning of the sequence.) $ \mathtt{remove(e)}$ : Remove $ \mathtt{e}$ from the sequence. $ \mathtt{testBefore(e1,e2)}$ : return $ \mathtt{true}$ if and only if $ \mathtt{e1}$ comes before $ \mathtt{e2}$ in the sequence. The first two operations should run in $ O(\log \ensuremath{\mathtt{n}})$ amortized time. The third operation should run in constant time. The Sequence data structure can be implemented by storing the elements in something like a ScapegoatTree, in the same order that they occur in the sequence. To implement $ \mathtt{testBefore(e1,e2)}$ in constant time, each element $ \mathtt{e}$ is labelled with an integer that encodes the path from the root to $ \mathtt{e}$ . In this way, $ \mathtt{testBefore(e1,e2)}$ can be implemented by comparing the labels of $ \mathtt{e1}$ and $ \mathtt{e2}$ .

[opendatastructures.org](http://opendatastructures.org/)
