---
title: "13. Data Structures for Integers"
lang: en
---

In this chapter, we return to the problem of implementing an SSet. The difference now is that we assume the elements stored in the SSet are $ \mathtt{w}$ -bit integers. That is, we want to implement $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ where $ \ensuremath{\mathtt{x}}\in\{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ . It is not too hard to think of plenty of applications where the data--or at least the key that we use for sorting the data--is an integer. We will discuss three data structures, each building on the ideas of the previous. The first structure, the BinaryTrie performs all three SSet operations in $ O(\ensuremath{\mathtt{w}})$ time. This is not very impressive, since any subset of $ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ has size $ \ensuremath{\mathtt{n}}\le 2^{\ensuremath{\mathtt{w}}}$ , so that $ \log \ensuremath{\mathtt{n}} \le \ensuremath{\mathtt{w}}$ . All the other SSet implementations discussed in this book perform all operations in $ O(\log \ensuremath{\mathtt{n}})$ time so they are all at least as fast as a BinaryTrie. The second structure, the XFastTrie, speeds up the search in a BinaryTrie by using hashing. With this speedup, the $ \mathtt{find(x)}$ operation runs in $ O(\log \ensuremath{\mathtt{w}})$ time. However, $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations in an XFastTrie still take $ O(\ensuremath{\mathtt{w}})$ time and the space used by an XFastTrie is $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ . The third data structure, the YFastTrie, uses an XFastTrie to store only a sample of roughly one out of every $ \ensuremath{\mathtt{w}}$ elements and stores the remaining elements in a standard SSet structure. This trick reduces the running time of $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ to $ O(\log \ensuremath{\mathtt{w}})$ and decreases the space to $ O(\ensuremath{\mathtt{n}})$ . The implementations used as examples in this chapter can store any type of data, as long as an integer can be associated with it. In the code samples, the variable $ \mathtt{ix}$ is always the integer value associated with $ \mathtt{x}$ , and the method $ \mathtt{in.}$ $ \mathtt{intValue(x)}$ converts $ \mathtt{x}$ to its associated integer. In the text, however, we will simply treat $ \mathtt{x}$ as if it is an integer.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 13.1 BinaryTrie: A digital search tree

A BinaryTrie encodes a set of $ \mathtt{w}$ bit integers in a binary tree. All leaves in the tree have depth $ \mathtt{w}$ and each integer is encoded as a root-to-leaf path. The path for the integer $ \mathtt{x}$ turns left at level $ \mathtt{i}$ if the $ \mathtt{i}$ th most significant bit of $ \mathtt{x}$ is a 0 and turns right if it is a 1. Figure 13.1 shows an example for the case $ \ensuremath{\mathtt{w}}=4$ , in which the trie stores the integers 3(0011), 9(1001), 12(1100), and 13(1101).

Because the search path for a value $ \mathtt{x}$ depends on the bits of $ \mathtt{x}$ , it will be helpful to name the children of a node, $ \mathtt{u}$ , $ \mathtt{u.child[0]}$ ( $ \mathtt{left}$ ) and $ \mathtt{u.child[1]}$ ( $ \mathtt{right}$ ). These child pointers will actually serve double-duty. Since the leaves in a binary trie have no children, the pointers are used to string the leaves together into a doubly-linked list. For a leaf in the binary trie $ \mathtt{u.child[0]}$ ( $ \mathtt{prev}$ ) is the node that comes before $ \mathtt{u}$ in the list and $ \mathtt{u.child[1]}$ ( $ \mathtt{next}$ ) is the node that follows $ \mathtt{u}$ in the list. A special node, $ \mathtt{dummy}$ , is used both before the first node and after the last node in the list (see Section 3.2). Each node, $ \mathtt{u}$ , also contains an additional pointer $ \mathtt{u.jump}$ . If $ \mathtt{u}$ 's left child is missing, then $ \mathtt{u.jump}$ points to the smallest leaf in $ \mathtt{u}$ 's subtree. If $ \mathtt{u}$ 's right child is missing, then $ \mathtt{u.jump}$ points to the largest leaf in $ \mathtt{u}$ 's subtree. An example of a BinaryTrie, showing $ \mathtt{jump}$ pointers and the doubly-linked list at the leaves, is shown in Figure 13.2.

The $ \mathtt{find(x)}$ operation in a BinaryTrie is fairly straightforward. We try to follow the search path for $ \mathtt{x}$ in the trie. If we reach a leaf, then we have found $ \mathtt{x}$ . If we reach a node $ \mathtt{u}$ where we cannot proceed (because $ \mathtt{u}$ is missing a child), then we follow $ \mathtt{u.jump}$ , which takes us either to the smallest leaf larger than $ \mathtt{x}$ or the largest leaf smaller than $ \mathtt{x}$ . Which of these two cases occurs depends on whether $ \mathtt{u}$ is missing its left or right child, respectively. In the former case ( $ \mathtt{u}$ is missing its left child), we have found the node we want. In the latter case ( $ \mathtt{u}$ is missing its right child), we can use the linked list to reach the node we want. Each of these cases is illustrated in Figure 13.3.

```
    T find(T x) {
        int i, c = 0, ix = it.intValue(x);
        Node u = r;
        for (i = 0; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            if (u.child[c] == null) break;
            u = u.child[c];
        }
        if (i == w) return u.x;  // found it
        u = (c == 0) ? u.jump : u.jump.child[next]; 
        return u == dummy ? null : u.x;
    }
```

The running-time of the $ \mathtt{find(x)}$ method is dominated by the time it takes to follow a root-to-leaf path, so it runs in $ O(\ensuremath{\mathtt{w}})$ time. The $ \mathtt{add(x)}$ operation in a BinaryTrie is also fairly straightforward, but has a lot of work to do:

1. It follows the search path for $ \mathtt{x}$ until reaching a node $ \mathtt{u}$ where it can no longer proceed.
2. It creates the remainder of the search path from $ \mathtt{u}$ to a leaf that contains $ \mathtt{x}$ .
3. It adds the node, $ \mathtt{u'}$ , containing $ \mathtt{x}$ to the linked list of leaves (it has access to the predecessor, $ \mathtt{pred}$ , of $ \mathtt{u'}$ in the linked list from the $ \mathtt{jump}$ pointer of the last node, $ \mathtt{u}$ , encountered during step 1.)
4. It walks back up the search path for $ \mathtt{x}$ adjusting $ \mathtt{jump}$ pointers at the nodes whose $ \mathtt{jump}$ pointer should now point to $ \mathtt{x}$ .

An addition is illustrated in Figure 13.4.

```
    boolean add(T x) {
        int i, c = 0, ix = it.intValue(x);
        Node u = r;
        // 1 - search for ix until falling out of the trie
        for (i = 0; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            if (u.child[c] == null) break;
            u = u.child[c];
        }        
        if (i == w) return false; // already contains x - abort
        Node pred = (c == right) ? u.jump : u.jump.child[0];
        u.jump = null;  // u will have two children shortly
        // 2 - add path to ix
        for (; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            u.child[c] = newNode();
            u.child[c].parent = u;
            u = u.child[c];
        }
        u.x = x;
        // 3 - add u to linked list
        u.child[prev] = pred;
        u.child[next] = pred.child[next];
        u.child[prev].child[next] = u;
        u.child[next].child[prev] = u;
        // 4 - walk back up, updating jump pointers
        Node v = u.parent;
        while (v != null) {
            if ((v.child[left] == null 
                    && (v.jump == null || it.intValue(v.jump.x) > ix))
            || (v.child[right] == null 
                    && (v.jump == null || it.intValue(v.jump.x) < ix)))
                v.jump = u;
            v = v.parent;
        }
        n++;
        return true;
    }
```

This method performs one walk down the search path for $ \mathtt{x}$ and one walk back up. Each step of these walks takes constant time, so the $ \mathtt{add(x)}$ method runs in $ O(\ensuremath{\mathtt{w}})$ time. The $ \mathtt{remove(x)}$ operation undoes the work of $ \mathtt{add(x)}$ . Like $ \mathtt{add(x)}$ , it has a lot of work to do:

1. It follows the search path for $ \mathtt{x}$ until reaching the leaf, $ \mathtt{u}$ , containing $ \mathtt{x}$ .
2. It removes $ \mathtt{u}$ from the doubly-linked list.
3. It deletes $ \mathtt{u}$ and then walks back up the search path for $ \mathtt{x}$ deleting nodes until reaching a node $ \mathtt{v}$ that has a child that is not on the search path for $ \mathtt{x}$ .
4. It walks upwards from $ \mathtt{v}$ to the root updating any $ \mathtt{jump}$ pointers that point to $ \mathtt{u}$ .

A removal is illustrated in Figure 13.5.

```python
    boolean remove(T x) {
        // 1 - find leaf, u, containing x
        int i, c, ix = it.intValue(x);
        Node u = r;
        for (i = 0; i < w; i++) {
            c = (ix >>> w-i-1) & 1;
            if (u.child[c] == null) return false;
            u = u.child[c];
        }
        // 2 - remove u from linked list
        u.child[prev].child[next] = u.child[next];
        u.child[next].child[prev] = u.child[prev];
        Node v = u;
        // 3 - delete nodes on path to u
        for (i = w-1; i >= 0; i--) {
            c = (ix >>> w-i-1) & 1;
            v = v.parent;
            v.child[c] = null;
            if (v.child[1-c] != null) break;
        }
        // 4 - update jump pointers
        c = (ix >>> w-i-1) & 1;
        v.jump = u.child[1-c];
        v = v.parent;
        i--;
        for (; i >= 0; i--) {
            c = (ix >>> w-i-1) & 1;
            if (v.jump == u) 
                v.jump = u.child[1-c];
            v = v.parent;
        }
        n--;
        return true;
    }
```

**Theorem 13..1** *A BinaryTrie implements the SSet interface for $ \mathtt{w}$ -bit integers. A BinaryTrie supports the operations $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ in $ O(\ensuremath{\mathtt{w}})$ time per operation. The space used by a BinaryTrie that stores $ \mathtt{n}$ values is $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 13.2 XFastTrie: Searching in Doubly-Logarithmic Time

The performance of the BinaryTrie structure is not very impressive. The number of elements, $ \mathtt{n}$ , stored in the structure is at most $ 2^{\ensuremath{\mathtt{w}}}$ , so $ \log \ensuremath{\mathtt{n}}\le \ensuremath{\mathtt{w}}$ . In other words, any of the comparison-based SSet structures described in other parts of this book are at least as efficient as a BinaryTrie, and are not restricted to only storing integers. Next we describe the XFastTrie, which is just a BinaryTrie with $ \mathtt{w+1}$ hash tables--one for each level of the trie. These hash tables are used to speed up the $ \mathtt{find(x)}$ operation to $ O(\log \ensuremath{\mathtt{w}})$ time. Recall that the $ \mathtt{find(x)}$ operation in a BinaryTrie is almost complete once we reach a node, $ \mathtt{u}$ , where the search path for $ \mathtt{x}$ would like to proceed to $ \mathtt{u.right}$ (or $ \mathtt{u.left}$ ) but $ \mathtt{u}$ has no right (respectively, left) child. At this point, the search uses $ \mathtt{u.jump}$ to jump to a leaf, $ \mathtt{v}$ , of the BinaryTrie and either return $ \mathtt{v}$ or its successor in the linked list of leaves. An XFastTrie speeds up the search process by using binary search on the levels of the trie to locate the node $ \mathtt{u}$ . To use binary search, we need a way to determine if the node $ \mathtt{u}$ we are looking for is above a particular level, $ \mathtt{i}$ , of if $ \mathtt{u}$ is at or below level $ \mathtt{i}$ . This information is given by the highest-order $ \mathtt{i}$ bits in the binary representation of $ \mathtt{x}$ ; these bits determine the search path that $ \mathtt{x}$ takes from the root to level $ \mathtt{i}$ . For an example, refer to Figure 13.6; in this figure the last node, $ \mathtt{u}$ , on search path for 14 (whose binary representation is 1110) is the node labelled $ 11{\star\star}$ at level 2 because there is no node labelled $ 111{\star}$ at level 3. Thus, we can label each node at level $ \mathtt{i}$ with an $ \mathtt{i}$ -bit integer. Then, the node $ \mathtt{u}$ we are searching for would be at or below level $ \mathtt{i}$ if and only if there is a node at level $ \mathtt{i}$ whose label matches the highest-order $ \mathtt{i}$ bits of $ \mathtt{x}$ .

In an XFastTrie, we store, for each $ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{w}}\}$ , all the nodes at level $ \mathtt{i}$ in a USet, $ \mathtt{t[i]}$ , that is implemented as a hash table (Chapter 5). Using this USet allows us to check in constant expected time if there is a node at level $ \mathtt{i}$ whose label matches the highest-order $ \mathtt{i}$ bits of $ \mathtt{x}$ . In fact, we can even find this node using $ \mathtt{t[i].find(x\text{\ttfamily >>>}(w-i))}$ The hash tables $ \ensuremath{\mathtt{t[0]}},\ldots,\ensuremath{\mathtt{t[w]}}$ allow us to use binary search to find $ \mathtt{u}$ . Initially, we know that $ \mathtt{u}$ is at some level $ \mathtt{i}$ with $ 0\le \ensuremath{\mathtt{i}}< \ensuremath{\mathtt{w}}+1$ . We therefore initialize $ \ensuremath{\mathtt{l}}=0$ and $ \ensuremath{\mathtt{h}}=\ensuremath{\mathtt{w}}+1$ and repeatedly look at the hash table $ \mathtt{t[i]}$ , where $ \ensuremath{\mathtt{i}}=\lfloor (\ensuremath{\mathtt{l+h}})/2\rfloor$ . If $ \ensuremath{\mathtt{t[i]}}$ contains a node whose label matches $ \mathtt{x}$ 's highest-order $ \mathtt{i}$ bits then we set $ \mathtt{l=i}$ ( $ \mathtt{u}$ is at or below level $ \mathtt{i}$ ); otherwise we set $ \mathtt{h=i}$ ( $ \mathtt{u}$ is above level $ \mathtt{i}$ ). This process terminates when $ \ensuremath{\mathtt{h-l}}\le 1$ , in which case we determine that $ \mathtt{u}$ is at level $ \mathtt{l}$ . We then complete the $ \mathtt{find(x)}$ operation using $ \mathtt{u.jump}$ and the doubly-linked list of leaves.

```
    T find(T x) {
        int l = 0, h = w+1, ix = it.intValue(x);
        Node v, u = r, q = newNode();
        while (h-l > 1) {
            int i = (l+h)/2;
            q.prefix = ix >>> w-i;
            if ((v = t[i].find(q)) == null) {
                h = i;
            } else {
                u = v;
                l = i;
            }
        }
        if (l == w) return u.x;
        Node pred = (((ix >>> w-l-1) & 1) == 1) 
                 ? u.jump : u.jump.child[0];
        return (pred.child[next] == dummy) 
                     ? null : pred.child[next].x;
    }
```

Each iteration of the $ \mathtt{while}$ loop in the above method decreases $ \mathtt{h-l}$ by roughly a factor of two, so this loop finds $ \mathtt{u}$ after $ O(\log \ensuremath{\mathtt{w}})$ iterations. Each iteration performs a constant amount of work and one $ \mathtt{find(x)}$ operation in a USet, which takes a constant expected amount of time. The remaining work takes only constant time, so the $ \mathtt{find(x)}$ method in an XFastTrie takes only $ O(\log\ensuremath{\mathtt{w}})$ expected time.

The $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ methods for an XFastTrie are almost identical to the same methods in a BinaryTrie. The only modifications are for managing the hash tables $ \mathtt{t[0]}$ ,..., $ \mathtt{t[w]}$ . During the $ \mathtt{add(x)}$ operation, when a new node is created at level $ \mathtt{i}$ , this node is added to $ \mathtt{t[i]}$ . During a $ \mathtt{remove(x)}$ operation, when a node is removed form level $ \mathtt{i}$ , this node is removed from $ \mathtt{t[i]}$ . Since adding and removing from a hash table take constant expected time, this does not increase the running times of $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ by more than a constant factor. We omit a code listing for $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ since the code is almost identical to the (long) code listing already provided for the same methods in a BinaryTrie. The following theorem summarizes the performance of an XFastTrie: **Theorem 13..2** *An XFastTrie implements the SSet interface for $ \mathtt{w}$ -bit integers. An XFastTrie supports the operations * $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ in $ O(\ensuremath{\mathtt{w}})$ expected time per operation and $ \mathtt{find(x)}$ in $ O(\log \ensuremath{\mathtt{w}})$ expected time per operation. * The space used by an XFastTrie that stores $ \mathtt{n}$ values is $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 13.3 YFastTrie: A Doubly-Logarithmic Time SSet

The XFastTrie is a vast--even exponential--improvement over the BinaryTrie in terms of query time, but the $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations are still not terribly fast. Furthermore, the space usage, $ O(\ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}})$ , is higher than the other SSet implementations described in this book, which all use $ O(\ensuremath{\mathtt{n}})$ space. These two problems are related; if $ \mathtt{n}$ $ \mathtt{add(x)}$ operations build a structure of size $ \ensuremath{\mathtt{n}}\cdot\ensuremath{\mathtt{w}}$ , then the $ \mathtt{add(x)}$ operation requires at least on the order of $ \mathtt{w}$ time (and space) per operation. The YFastTrie, discussed next, simultaneously improves the space and speed of XFastTries. A YFastTrie uses an XFastTrie, $ \mathtt{xft}$ , but only stores $ O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{w}})$ values in $ \mathtt{xft}$ . In this way, the total space used by $ \mathtt{xft}$ is only $ O(\ensuremath{\mathtt{n}})$ . Furthermore, only one out of every $ \mathtt{w}$ $ \mathtt{add(x)}$ or $ \mathtt{remove(x)}$ operations in the YFastTrie results in an $ \mathtt{add(x)}$ or $ \mathtt{remove(x)}$ operation in $ \mathtt{xft}$ . By doing this, the average cost incurred by calls to $ \mathtt{xft}$ 's $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations is only constant. The obvious question becomes: If $ \mathtt{xft}$ only stores $ \mathtt{n}$ / $ \mathtt{w}$ elements, where do the remaining $ \ensuremath{\mathtt{n}}(1-1/\ensuremath{\mathtt{w}})$ elements go? These elements move into secondary structures, in this case an extended version of treaps (Section 7.2). There are roughly $ \mathtt{n}$ / $ \mathtt{w}$ of these secondary structures so, on average, each of them stores $ O(\ensuremath{\mathtt{w}})$ items. Treaps support logarithmic time SSet operations, so the operations on these treaps will run in $ O(\log \ensuremath{\mathtt{w}})$ time, as required. More concretely, a YFastTrie contains an XFastTrie, $ \mathtt{xft}$ , that contains a random sample of the data, where each element appears in the sample independently with probability $ 1/\ensuremath{\mathtt{w}}$ . For convenience, the value $ 2^{\ensuremath{\mathtt{w}}}-1$ , is always contained in $ \mathtt{xft}$ . Let $ \ensuremath{\mathtt{x}}_0<\ensuremath{\mathtt{x}}_1<\cdots<\ensuremath{\mathtt{x}}_{k-1}$ denote the elements stored in $ \mathtt{xft}$ . Associated with each element, $ \ensuremath{\mathtt{x}}_i$ , is a treap, $ \ensuremath{\mathtt{t}}_i$ , that stores all values in the range $ \ensuremath{\mathtt{x}}_{i-1}+1,\ldots,\ensuremath{\mathtt{x}}_i$ . This is illustrated in Figure 13.7.

The $ \mathtt{find(x)}$ operation in a YFastTrie is fairly easy. We search for $ \mathtt{x}$ in $ \mathtt{xft}$ and find some value $ \ensuremath{\mathtt{x}}_i$ associated with the treap $ \ensuremath{\mathtt{t}}_i$ . We then use the treap $ \mathtt{find(x)}$ method on $ \ensuremath{\mathtt{t}}_i$ to answer the query. The entire method is a one-liner:

```
    T find(T x) {
        return xft.find(new Pair<T>(it.intValue(x))).t.find(x);
    }
```

The first $ \mathtt{find(x)}$ operation (on $ \mathtt{xft}$ ) takes $ O(\log\ensuremath{\mathtt{w}})$ time. The second $ \mathtt{find(x)}$ operation (on a treap) takes $ O(\log r)$ time, where $ r$ is the size of the treap. Later in this section, we will show that the expected size of the treap is $ O(\ensuremath{\mathtt{w}})$ so that this operation takes $ O(\log \ensuremath{\mathtt{w}})$ time.13.1 Adding an element to a YFastTrie is also fairly simple--most of the time. The $ \mathtt{add(x)}$ method calls $ \mathtt{xft.find(x)}$ to locate the treap, $ \mathtt{t}$ , into which $ \mathtt{x}$ should be inserted. It then calls $ \mathtt{t.add(x)}$ to add $ \mathtt{x}$ to $ \mathtt{t}$ . At this point, it tosses a biased coin that comes up as heads with probability $ 1/\ensuremath{\mathtt{w}}$ and as tails with probability $ 1-1/\ensuremath{\mathtt{w}}$ . If this coin comes up heads, then $ \mathtt{x}$ will be added to $ \mathtt{xft}$ . This is where things get a little more complicated. When $ \mathtt{x}$ is added to $ \mathtt{xft}$ , the treap $ \mathtt{t}$ needs to be split into two treaps, $ \mathtt{t1}$ and $ \mathtt{t'}$ . The treap $ \mathtt{t1}$ contains all the values less than or equal to $ \mathtt{x}$ ; $ \mathtt{t'}$ is the original treap, $ \mathtt{t}$ , with the elements of $ \mathtt{t1}$ removed. Once this is done, we add the pair $ \mathtt{(x,t1)}$ to $ \mathtt{xft}$ . Figure 13.8 shows an example.

```
    boolean add(T x) {
        int ix = it.intValue(x);
        STreap<T> t = xft.find(new Pair<T>(ix)).t;
        if (t.add(x)) {
            n++;
            if (rand.nextInt(w) == 0) {
                STreap<T> t1 = t.split(x);
                xft.add(new Pair<T>(ix, t1));
            }
            return true;
        } 
        return false;
    }
```

Adding $ \mathtt{x}$ to $ \mathtt{t}$ takes $ O(\log \ensuremath{\mathtt{w}})$ time. Exercise 7.12 shows that splitting $ \mathtt{t}$ into $ \mathtt{t1}$ and $ \mathtt{t'}$ can also be done in $ O(\log \ensuremath{\mathtt{w}})$ expected time. Adding the pair ( $ \mathtt{x}$ , $ \mathtt{t1}$ ) to $ \mathtt{xft}$ takes $ O(\ensuremath{\mathtt{w}})$ time, but only happens with probability $ 1/\ensuremath{\mathtt{w}}$ . Therefore, the expected running time of the $ \mathtt{add(x)}$ operation is

![$\displaystyle O(\log\ensuremath{\mathtt{w}}) + \frac{1}{\ensuremath{\mathtt{w}}}O(\ensuremath{\mathtt{w}}) = O(\log \ensuremath{\mathtt{w}}) \enspace . $](/images/open-data-structures/13_3_YFastTrie_Doubly_Logar-img5153.png.webp)

The $ \mathtt{remove(x)}$ method undoes the work performed by $ \mathtt{add(x)}$ . We use $ \mathtt{xft}$ to find the leaf, $ \mathtt{u}$ , in $ \mathtt{xft}$ that contains the answer to $ \mathtt{xft.find(x)}$ . From $ \mathtt{u}$ , we get the treap, $ \mathtt{t}$ , containing $ \mathtt{x}$ and remove $ \mathtt{x}$ from $ \mathtt{t}$ . If $ \mathtt{x}$ was also stored in $ \mathtt{xft}$ (and $ \mathtt{x}$ is not equal to $ 2^{\ensuremath{\mathtt{w}}}-1$ ) then we remove $ \mathtt{x}$ from $ \mathtt{xft}$ and add the elements from $ \mathtt{x}$ 's treap to the treap, $ \mathtt{t2}$ , that is stored by $ \mathtt{u}$ 's successor in the linked list. This is illustrated in Figure 13.9.

```
    boolean remove(T x) {
        int ix = it.intValue(x);
        Node<T> u = xft.findNode(ix);
        boolean ret = u.x.t.remove(x);
        if (ret) n--;
        if (u.x.x == ix && ix != 0xffffffff) {
            STreap<T> t2 = u.child[1].x.t;
            t2.absorb(u.x.t);
            xft.remove(u.x);
        }
        return ret;
    }
```

Finding the node $ \mathtt{u}$ in $ \mathtt{xft}$ takes $ O(\log\ensuremath{\mathtt{w}})$ expected time. Removing $ \mathtt{x}$ from $ \mathtt{t}$ takes $ O(\log\ensuremath{\mathtt{w}})$ expected time. Again, Exercise 7.12 shows that merging all the elements of $ \mathtt{t}$ into $ \mathtt{t2}$ can be done in $ O(\log\ensuremath{\mathtt{w}})$ time. If necessary, removing $ \mathtt{x}$ from $ \mathtt{xft}$ takes $ O(\ensuremath{\mathtt{w}})$ time, but $ \mathtt{x}$ is only contained in $ \mathtt{xft}$ with probability $ 1/\ensuremath{\mathtt{w}}$ . Therefore, the expected time to remove an element from a YFastTrie is $ O(\log \ensuremath{\mathtt{w}})$ .

Earlier in the discussion, we delayed arguing about the sizes of treaps in this structure until later. Before finishing this chapter, we prove the result we need. **Lemma 13..1** *Let $ \mathtt{x}$ be an integer stored in a YFastTrie and let $ \ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}$ denote the number of elements in the treap, $ \mathtt{t}$ , that contains $ \mathtt{x}$ . Then $ \mathrm{E}[\ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}] \le 2\ensuremath{\mathtt{w}}-1$ .*

*Proof*. Refer to Figure 13.10. Let ![المعادلة الأصلية: ترتيب العناصر المخزنة في بنية واي فاست تراي، الصيغة 1](/images/open-data-structures/math-aa7dab8b971ea473c3d0.webp) denote the elements stored in the YFastTrie. The treap $ \mathtt{t}$ contains some elements greater than or equal to $ \mathtt{x}$ . These are $ \ensuremath{\mathtt{x}}_i,\ensuremath{\mathtt{x}}_{i+1},\ldots,\ensuremath{\mathtt{x}}_{i+j-1}$ , where $ \ensuremath{\mathtt{x}}_{i+j-1}$ is the only one of these elements in which the biased coin toss performed in the $ \mathtt{add(x)}$ method turned up as heads. In other words, $ \mathrm{E}[j]$ is equal to the expected number of biased coin tosses required to obtain the first heads.13.2 Each coin toss is independent and turns up as heads with probability $ 1/\ensuremath{\mathtt{w}}$ , so $ \mathrm{E}[j]\le\ensuremath{\mathtt{w}}$ . (See Lemma 4.2 for an analysis of this for the case $ \ensuremath{\mathtt{w}}=2$ .)

Similarly, the elements of $ \mathtt{t}$ smaller than $ \mathtt{x}$ are $ \ensuremath{\mathtt{x}}_{i-1},\ldots,\ensuremath{\mathtt{x}}_{i-k}$ where all these $ k$ coin tosses turn up as tails and the coin toss for $ \ensuremath{\mathtt{x}}_{i-k-1}$ turns up as heads. Therefore, $ \mathrm{E}[k]\le\ensuremath{\mathtt{w}}-1$ , since this is the same coin tossing experiment considered in the preceding paragraph, but one in which the last toss is not counted. In summary, $ \ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}=j+k$ , so

![$\displaystyle \mathrm{E}[\ensuremath{\mathtt{n}}_\ensuremath{\mathtt{x}}] = \ma... ...athrm{E}[j] + \mathrm{E}[k] \le 2\ensuremath{\mathtt{w}}-1 \enspace . \qedhere $](/images/open-data-structures/13_3_YFastTrie_Doubly_Logar-img5217.png.webp)

![$ \qedsymbol$](/images/open-data-structures/13_3_YFastTrie_Doubly_Logar-img5196.png.webp)

Lemma 13.1 was the last piece in the proof of the following theorem, which summarizes the performance of the YFastTrie: **Theorem 13..3** *A YFastTrie implements the SSet interface for $ \mathtt{w}$ -bit integers. A YFastTrie supports the operations $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ in $ O(\log \ensuremath{\mathtt{w}})$ expected time per operation. The space used by a YFastTrie that stores $ \mathtt{n}$ values is $ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{w}})$ .*

The $ \mathtt{w}$ term in the space requirement comes from the fact that $ \mathtt{xft}$ always stores the value $ 2^\ensuremath{\mathtt{w}}-1$ . The implementation could be modified (at the expense of adding some extra cases to the code) so that it is unnecessary to store this value. In this case, the space requirement in the theorem becomes $ O(\ensuremath{\mathtt{n}})$ .

#### Footnotes

... time.13.1 This is an application of Jensen's Inequality: If $ \mathrm{E}[r]=\ensuremath{\mathtt{w}}$ , then $ \mathrm{E}[\log r] \le \log w$ . ... heads.13.2 This analysis ignores the fact that $ j$ never exceeds $ \ensuremath{\mathtt{n}}-i+1$ . However, this only decreases $ \mathrm{E}[j]$ , so the upper bound still holds. [opendatastructures.org](http://opendatastructures.org/)

## 13.4 Discussion and Exercises

The first data structure to provide $ O(\log\ensuremath{\mathtt{w}})$ time $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ operations was proposed by van Emde Boas and has since become known as the van Emde Boas (or stratified) tree [74]. The original van Emde Boas structure had size $ 2^{\ensuremath{\mathtt{w}}}$ , making it impractical for large integers. The XFastTrie and YFastTrie data structures were discovered by Willard [77]. The XFastTrie structure is closely related to van Emde Boas trees; for instance, the hash tables in an XFastTrie replace arrays in a van Emde Boas tree. That is, instead of storing the hash table $ \mathtt{t[i]}$ , a van Emde Boas tree stores an array of length $ 2^{\ensuremath{\mathtt{i}}}$ . Another structure for storing integers is Fredman and Willard's fusion trees [32]. This structure can store $ \mathtt{n}$ $ \mathtt{w}$ -bit integers in $ O(\ensuremath{\mathtt{n}})$ space so that the $ \mathtt{find(x)}$ operation runs in $ O((\log \ensuremath{\mathtt{n}})/(\log \ensuremath{\mathtt{w}}))$ time. By using a fusion tree when $ \log \ensuremath{\mathtt{w}} > \sqrt{\log \ensuremath{\mathtt{n}}}$ and a YFastTrie when $ \log \ensuremath{\mathtt{w}} \le \sqrt{\log \ensuremath{\mathtt{n}}}$ , one obtains an $ O(\ensuremath{\mathtt{n}})$ space data structure that can implement the $ \mathtt{find(x)}$ operation in $ O(\sqrt{\log \ensuremath{\mathtt{n}}})$ time. Recent lower-bound results of P ![{\v{a\/}}\kern.05em](/images/open-data-structures/13_4_Discussion_Exercises-img5275.png.webp) tra ![{\c{s\/}}](/images/open-data-structures/13_4_Discussion_Exercises-img5276.png.webp) cu and Thorup [59] show that these results are more or less optimal, at least for structures that use only $ O(\ensuremath{\mathtt{n}})$ space. **Exercise 13..1** Design and implement a simplified version of a BinaryTrie that does not have a linked list or jump pointers, but for which $ \mathtt{find(x)}$ still runs in $ O(\ensuremath{\mathtt{w}})$ time.

**Exercise 13..2** Design and implement a simplified implementation of an XFastTrie that doesn't use a binary trie at all. Instead, your implementation should store everything in a doubly-linked list and $ \ensuremath{\mathtt{w}}+1$ hash tables.

**Exercise 13..3** We can think of a BinaryTrie as a structure that stores bit strings of length $ \mathtt{w}$ in such a way that each bitstring is represented as a root to leaf path. Extend this idea into an SSet implementation that stores variable-length strings and implements $ \mathtt{add(s)}$ , $ \mathtt{remove(s)}$ , and $ \mathtt{find(s)}$ in time proporitional to the length of $ \mathtt{s}$ . Hint: Each node in your data structure should store a hash table that is indexed by character values.

**Exercise 13..4** For an integer $ \ensuremath{\mathtt{x}}\in\{0,\ldots2^{\ensuremath{\mathtt{w}}}-1\}$ , let $ d(\ensuremath{\mathtt{x}})$ denote the difference between $ \mathtt{x}$ and the value returned by $ \mathtt{find(x)}$ [if $ \mathtt{find(x)}$ returns $ \mathtt{null}$ , then define $ d(\ensuremath{\mathtt{x}})$ as $ 2^\ensuremath{\mathtt{w}}$ ]. For example, if $ \mathtt{find(23)}$ returns 43, then $ d(23)=20$ . Design and implement a modified version of the $ \mathtt{find(x)}$ operation in an XFastTrie that runs in $ O(1+\log d(\ensuremath{\mathtt{x}}))$ expected time. Hint: The hash table $ t[\ensuremath{\mathtt{w}}]$ contains all the values, $ \mathtt{x}$ , such that $ d(\ensuremath{\mathtt{x}})=0$ , so that would be a good place to start. Design and implement a modified version of the $ \mathtt{find(x)}$ operation in an XFastTrie that runs in $ O(1+\log\log d(\ensuremath{\mathtt{x}}))$ expected time.

[opendatastructures.org](http://opendatastructures.org/)
