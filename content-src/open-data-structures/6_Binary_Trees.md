---
title: "6. Binary Trees"
lang: en
---

This chapter introduces one of the most fundamental structures in computer science: binary trees. The use of the word tree here comes from the fact that, when we draw them, the resultant drawing often resembles the trees found in a forest. There are many ways of ways of defining binary trees. Mathematically, a binary tree is a connected, undirected, finite graph with no cycles, and no vertex of degree greater than three. For most computer science applications, binary trees are rooted: A special node, $$ \mathtt{r}$$ , of degree at most two is called the root of the tree. For every node, $$ \ensuremath{\mathtt{u}}\neq \ensuremath{\mathtt{r}}$$ , the second node on the path from $$ \mathtt{u}$$ to $$ \mathtt{r}$$ is called the parent of $$ \mathtt{u}$$ . Each of the other nodes adjacent to $$ \mathtt{u}$$ is called a child of $$ \mathtt{u}$$ . Most of the binary trees we are interested in are ordered, so we distinguish between the left child and right child of $$ \mathtt{u}$$ . In illustrations, binary trees are usually drawn from the root downward, with the root at the top of the drawing and the left and right children respectively given by left and right positions in the drawing (Figure 6.1). For example, Figure 6.2.a shows a binary tree with nine nodes.

|  |  |
| --- | --- |
| (a) | (b) |

Because binary trees are so important, a certain terminology has developed for them: The depth of a node, $$ \mathtt{u}$$ , in a binary tree is the length of the path from $$ \mathtt{u}$$ to the root of the tree. If a node, $$ \mathtt{w}$$ , is on the path from $$ \mathtt{u}$$ to $$ \mathtt{r}$$ , then $$ \mathtt{w}$$ is called an ancestor of $$ \mathtt{u}$$ and $$ \mathtt{u}$$ a descendant of $$ \mathtt{w}$$ . The subtree of a node, $$ \mathtt{u}$$ , is the binary tree that is rooted at $$ \mathtt{u}$$ and contains all of $$ \mathtt{u}$$ 's descendants. The height of a node, $$ \mathtt{u}$$ , is the length of the longest path from $$ \mathtt{u}$$ to one of its descendants. The height of a tree is the height of its root. A node, $$ \mathtt{u}$$ , is a leaf if it has no children. We sometimes think of the tree as being augmented with external nodes. Any node that does not have a left child has an external node as its left child, and, correspondingly, any node that does not have a right child has an external node as its right child (see Figure 6.2.b). It is easy to verify, by induction, that a binary tree with $$ \ensuremath{\mathtt{n}}\ge 1$$ real nodes has $$ \ensuremath{\mathtt{n}}+1$$ external nodes.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 6.1 BinaryTree: A Basic Binary Tree

**Subsections**

# 6.1 BinaryTree: A Basic Binary Tree

The simplest way to represent a node, $$ \mathtt{u}$$ , in a binary tree is to explicitly store the (at most three) neighbours of $$ \mathtt{u}$$ :

```
    class BTNode<Node extends BTNode<Node>> {
        Node left;
        Node right;
        Node parent;    
    }
```

When one of these three neighbours is not present, we set it to $$ \mathtt{nil}$$ . In this way, both external nodes of the tree and the parent of the root correspond to the value $$ \mathtt{nil}$$ . The binary tree itself can then be represented by a reference to its root node, $$ \mathtt{r}$$ :

```
    Node r;
```

We can compute the depth of a node, $$ \mathtt{u}$$ , in a binary tree by counting the number of steps on the path from $$ \mathtt{u}$$ to the root:

```
    int depth(Node u) {
        int d = 0;
        while (u != r) {
            u = u.parent;
            d++;
        }
        return d;
    }
```

## 6.1.1 Recursive Algorithms

Using recursive algorithms makes it very easy to compute facts about binary trees. For example, to compute the size of (number of nodes in) a binary tree rooted at node $$ \mathtt{u}$$ , we recursively compute the sizes of the two subtrees rooted at the children of $$ \mathtt{u}$$ , sum up these sizes, and add one:

```
    int size(Node u) {
        if (u == nil) return 0;
        return 1 + size(u.left) + size(u.right);
    }
```

To compute the height of a node $$ \mathtt{u}$$ , we can compute the height of $$ \mathtt{u}$$ 's two subtrees, take the maximum, and add one:

```
    int height(Node u) {
        if (u == nil) return -1;
        return 1 + Math.max(height(u.left), height(u.right));
    }
```

## 6.1.2 Traversing Binary Trees

The two algorithms from the previous section both use recursion to visit all the nodes in a binary tree. Each of them visits the nodes of the binary tree in the same order as the following code:

```
    void traverse(Node u) {
        if (u == nil) return;
        traverse(u.left);
        traverse(u.right);
    }
```

Using recursion this way produces very short, simple code, but it can also be problematic. The maximum depth of the recursion is given by the maximum depth of a node in the binary tree, i.e., the tree's height. If the height of the tree is very large, then this recursion could very well use more stack space than is available, causing a crash. To traverse a binary tree without recursion, you can use an algorithm that relies on where it came from to determine where it will go next. See Figure 6.3. If we arrive at a node $$ \mathtt{u}$$ from $$ \mathtt{u.parent}$$ , then the next thing to do is to visit $$ \mathtt{u.left}$$ . If we arrive at $$ \mathtt{u}$$ from $$ \mathtt{u.left}$$ , then the next thing to do is to visit $$ \mathtt{u.right}$$ . If we arrive at $$ \mathtt{u}$$ from $$ \mathtt{u.right}$$ , then we are done visiting $$ \mathtt{u}$$ 's subtree, and so we return to $$ \mathtt{u.parent}$$ . The following code implements this idea, with code included for handling the cases where any of $$ \mathtt{u.left}$$ , $$ \mathtt{u.right}$$ , or $$ \mathtt{u.parent}$$ is $$ \mathtt{nil}$$ :

```
    void traverse2() {
        Node u = r, prev = nil, next;
        while (u != nil) {
            if (prev == u.parent) {
                if (u.left != nil) next = u.left;
                else if (u.right != nil) next = u.right;
                else next = u.parent;
            } else if (prev == u.left) {
                if (u.right != nil) next = u.right;
                else next = u.parent;
            } else {
                next = u.parent;
            }
            prev = u;
            u = next;
        }
    }
```

The same facts that can be computed with recursive algorithms can also be computed in this way, without recursion. For example, to compute the size of the tree we keep a counter, $$ \mathtt{n}$$ , and increment $$ \mathtt{n}$$ whenever visiting a node for the first time:

```
    int size2() {
        Node u = r, prev = nil, next;
        int n = 0;
        while (u != nil) {
            if (prev == u.parent) {
                n++;
                if (u.left != nil) next = u.left;
                else if (u.right != nil) next = u.right;
                else next = u.parent;
            } else if (prev == u.left) {
                if (u.right != nil) next = u.right;
                else next = u.parent;
            } else {
                next = u.parent;
            }
            prev = u;
            u = next;
        }
        return n;
    }
```

In some implementations of binary trees, the $$ \mathtt{parent}$$ field is not used. When this is the case, a non-recursive implementation is still possible, but the implementation has to use a List (or Stack) to keep track of the path from the current node to the root. A special kind of traversal that does not fit the pattern of the above functions is the breadth-first traversal. In a breadth-first traversal, the nodes are visited level-by-level starting at the root and moving down, visiting the nodes at each level from left to right (see Figure 6.4). This is similar to the way that we would read a page of English text. Breadth-first traversal is implemented using a queue, $$ \mathtt{q}$$ , that initially contains only the root, $$ \mathtt{r}$$ . At each step, we extract the next node, $$ \mathtt{u}$$ , from $$ \mathtt{q}$$ , process $$ \mathtt{u}$$ and add $$ \mathtt{u.left}$$ and $$ \mathtt{u.right}$$ (if they are non- $$ \mathtt{nil}$$ ) to $$ \mathtt{q}$$ :

```
    void bfTraverse() {
        Queue<Node> q = new LinkedList<Node>();
        if (r != nil) q.add(r);
        while (!q.isEmpty()) {
            Node u = q.remove();
            if (u.left != nil) q.add(u.left);
            if (u.right != nil) q.add(u.right);
        }
    }
```

[opendatastructures.org](http://opendatastructures.org/)

## 6.2 BinarySearchTree: An Unbalanced Binary Search Tree

**Subsections**

# 6.2 BinarySearchTree: An Unbalanced Binary Search Tree

A BinarySearchTree is a special kind of binary tree in which each node, $$ \mathtt{u}$$ , also stores a data value, $$ \mathtt{u.x}$$ , from some total order. The data values in a binary search tree obey the binary search tree property: For a node, $$ \mathtt{u}$$ , every data value stored in the subtree rooted at $$ \mathtt{u.left}$$ is less than $$ \mathtt{u.x}$$ and every data value stored in the subtree rooted at $$ \mathtt{u.right}$$ is greater than $$ \mathtt{u.x}$$ . An example of a BinarySearchTree is shown in Figure 6.5.

## 6.2.1 Searching

The binary search tree property is extremely useful because it allows us to quickly locate a value, $$ \mathtt{x}$$ , in a binary search tree. To do this we start searching for $$ \mathtt{x}$$ at the root, $$ \mathtt{r}$$ . When examining a node, $$ \mathtt{u}$$ , there are three cases:

1. If $$ \ensuremath{\mathtt{x}}< \ensuremath{\mathtt{u.x}}$$ , then the search proceeds to $$ \mathtt{u.left}$$ ;
2. If $$ \ensuremath{\mathtt{x}}> \ensuremath{\mathtt{u.x}}$$ , then the search proceeds to $$ \mathtt{u.right}$$ ;
3. If $$ \ensuremath{\mathtt{x}}= \ensuremath{\mathtt{u.x}}$$ , then we have found the node $$ \mathtt{u}$$ containing $$ \mathtt{x}$$ .

The search terminates when Case 3 occurs or when $$ \mathtt{u=nil}$$ . In the former case, we found $$ \mathtt{x}$$ . In the latter case, we conclude that $$ \mathtt{x}$$ is not in the binary search tree.

```
    T findEQ(T x) {
        Node u = r;
        while (u != nil) {
            int comp = compare(x, u.x);
            if (comp < 0) 
                u = u.left;
            else if (comp > 0)
                u = u.right;
            else
                return u.x;
        }
        return null;
    }
```

Two examples of searches in a binary search tree are shown in Figure 6.6. As the second example shows, even if we don't find $$ \mathtt{x}$$ in the tree, we still gain some valuable information. If we look at the last node, $$ \mathtt{u}$$ , at which Case 1 occurred, we see that $$ \mathtt{u.x}$$ is the smallest value in the tree that is greater than $$ \mathtt{x}$$ . Similarly, the last node at which Case 2 occurred contains the largest value in the tree that is less than $$ \mathtt{x}$$ . Therefore, by keeping track of the last node, $$ \mathtt{z}$$ , at which Case 1 occurs, a BinarySearchTree can implement the $$ \mathtt{find(x)}$$ operation that returns the smallest value stored in the tree that is greater than or equal to $$ \mathtt{x}$$ :

```
    T find(T x) {
        Node w = r, z = nil;
        while (w != nil) {
            int comp = compare(x, w.x);
            if (comp < 0) {
                z = w;
                w = w.left;
            } else if (comp > 0) {
                w = w.right;
            } else {
                return w.x;
            }
        }
        return z == nil ? null : z.x;
    }
```

| ![\includegraphics[width=\textwidth ]{figs/bst-example-2}](/images/open-data-structures/6_2_BinarySearchTree_Unbala-img2685.png.webp) | ![\includegraphics[width=\textwidth ]{figs/bst-example-3}](/images/open-data-structures/6_2_BinarySearchTree_Unbala-img2686.png.webp) |
| --- | --- |
| (a) | (b) |

## 6.2.2 Addition

To add a new value, $$ \mathtt{x}$$ , to a BinarySearchTree, we first search for $$ \mathtt{x}$$ . If we find it, then there is no need to insert it. Otherwise, we store $$ \mathtt{x}$$ at a leaf child of the last node, $$ \mathtt{p}$$ , encountered during the search for $$ \mathtt{x}$$ . Whether the new node is the left or right child of $$ \mathtt{p}$$ depends on the result of comparing $$ \mathtt{x}$$ and $$ \mathtt{p.x}$$ .

```
    boolean add(T x) {
        Node p = findLast(x);
        return addChild(p, newNode(x));        
    }
```

```
    Node findLast(T x) {
        Node w = r, prev = nil;
        while (w != nil) {
            prev = w;
            int comp = compare(x, w.x);
            if (comp < 0) {
                w = w.left;
            } else if (comp > 0) {
                w = w.right;
            } else {
                return w;
            }
        }
        return prev;
    }
```

```
    boolean addChild(Node p, Node u) {
        if (p == nil) {
            r = u;              // inserting into empty tree
        } else {
            int comp = compare(u.x, p.x);
            if (comp < 0) {
                p.left = u;
            } else if (comp > 0) {
                p.right = u;
            } else {
                return false;   // u.x is already in the tree
            }
            u.parent = p;
        }
        n++;
        return true;        
    }
```

An example is shown in Figure 6.7. The most time-consuming part of this process is the initial search for $$ \mathtt{x}$$ , which takes an amount of time proportional to the height of the newly added node $$ \mathtt{u}$$ . In the worst case, this is equal to the height of the BinarySearchTree.

## 6.2.3 Removal

Deleting a value stored in a node, $$ \mathtt{u}$$ , of a BinarySearchTree is a little more difficult. If $$ \mathtt{u}$$ is a leaf, then we can just detach $$ \mathtt{u}$$ from its parent. Even better: If $$ \mathtt{u}$$ has only one child, then we can splice $$ \mathtt{u}$$ from the tree by having $$ \mathtt{u.parent}$$ adopt $$ \mathtt{u}$$ 's child (see Figure 6.8):

```
    void splice(Node u) {
        Node s, p;
        if (u.left != nil) {
            s = u.left;
        } else {
            s = u.right;
        }
        if (u == r) {
            r = s;
            p = nil;
        } else {
            p = u.parent;
            if (p.left == u) {
                p.left = s;
            } else {
                p.right = s; 
            }
        }
        if (s != nil) {
            s.parent = p;
        }
        n--;
    }
```

Things get tricky, though, when $$ \mathtt{u}$$ has two children. In this case, the simplest thing to do is to find a node, $$ \mathtt{w}$$ , that has less than two children and such that $$ \mathtt{w.x}$$ can replace $$ \mathtt{u.x}$$ . To maintain the binary search tree property, the value $$ \mathtt{w.x}$$ should be close to the value of $$ \mathtt{u.x}$$ . For example, choosing $$ \mathtt{w}$$ such that $$ \mathtt{w.x}$$ is the smallest value greater than $$ \mathtt{u.x}$$ will work. Finding the node $$ \mathtt{w}$$ is easy; it is the smallest value in the subtree rooted at $$ \mathtt{u.right}$$ . This node can be easily removed because it has no left child (see Figure 6.9).

```
    void remove(Node u) {
        if (u.left == nil || u.right == nil) {
            splice(u);
        } else {
            Node w = u.right;
            while (w.left != nil) 
                w = w.left;
            u.x = w.x;
            splice(w);
        }
    }
```

**Figure 6.9:** Deleting a value ( $$ 11$$ ) from a node, $$ \mathtt{u}$$ , with two children is done by replacing $$ \mathtt{u}$$ 's value with the smallest value in the right subtree of $$ \mathtt{u}$$ . ![\includegraphics[width=\textwidth ]{figs/bst-delete-1}](/images/open-data-structures/6_2_BinarySearchTree_Unbala-img2728.png.webp) ![\includegraphics[width=\textwidth ]{figs/bst-delete-2}](/images/open-data-structures/6_2_BinarySearchTree_Unbala-img2729.png.webp) 6.2.4 Summary The $$ \mathtt{find(x)}$$ , $$ \mathtt{add(x)}$$ , and $$ \mathtt{remove(x)}$$ operations in a BinarySearchTree each involve following a path from the root of the tree to some node in the tree. Without knowing more about the shape of the tree it is difficult to say much about the length of this path, except that it is less than $$ \mathtt{n}$$ , the number of nodes in the tree. The following (unimpressive) theorem summarizes the performance of the BinarySearchTree data structure: **Theorem 6..1** *BinarySearchTree implements the SSet interface and supports the operations $$ \mathtt{add(x)}$$ , $$ \mathtt{remove(x)}$$ , and $$ \mathtt{find(x)}$$ in $$ O(\ensuremath{\mathtt{n}})$$ time per operation.*

Theorem 6.1 compares poorly with Theorem 4.1, which shows that the SkiplistSSet structure can implement the SSet interface with $$ O(\log \ensuremath{\mathtt{n}})$$ expected time per operation. The problem with the BinarySearchTree structure is that it can become unbalanced. Instead of looking like the tree in Figure 6.5 it can look like a long chain of $$ \mathtt{n}$$ nodes, all but the last having exactly one child. There are a number of ways of avoiding unbalanced binary search trees, all of which lead to data structures that have $$ O(\log \ensuremath{\mathtt{n}})$$ time operations. In Chapter 7 we show how $$ O(\log \ensuremath{\mathtt{n}})$$ expected time operations can be achieved with randomization. In Chapter 8 we show how $$ O(\log \ensuremath{\mathtt{n}})$$ amortized time operations can be achieved with partial rebuilding operations. In Chapter 9 we show how $$ O(\log \ensuremath{\mathtt{n}})$$ worst-case time operations can be achieved by simulating a tree that is not binary: one in which nodes can have up to four children. [opendatastructures.org](http://opendatastructures.org/)

## 6.3 Discussion and Exercises

Binary trees have been used to model relationships for thousands of years. One reason for this is that binary trees naturally model (pedigree) family trees. These are the family trees in which the root is a person, the left and right children are the person's parents, and so on, recursively. In more recent centuries binary trees have also been used to model species trees in biology, where the leaves of the tree represent extant species and the internal nodes of the tree represent speciation events in which two populations of a single species evolve into two separate species. Binary search trees appear to have been discovered independently by several groups in the 1950s [48, Section 6.2.2]. Further references to specific kinds of binary search trees are provided in subsequent chapters. When implementing a binary tree from scratch, there are several design decisions to be made. One of these is the question of whether or not each node stores a pointer to its parent. If most of the operations simply follow a root-to-leaf path, then parent pointers are unnecessary, waste space, and are a potential source of coding errors. On the other hand, the lack of parent pointers means that tree traversals must be done recursively or with the use of an explicit stack. Some other methods (like inserting or deleting into some kinds of balanced binary search trees) are also complicated by the lack of parent pointers. Another design decision is concerned with how to store the parent, left child, and right child pointers at a node. In the implementation given here, these pointers are stored as separate variables. Another option is to store them in an array, $$ \mathtt{p}$$ , of length 3, so that $$ \mathtt{u.p[0]}$$ is the left child of $$ \mathtt{u}$$ , $$ \mathtt{u.p[1]}$$ is the right child of $$ \mathtt{u}$$ , and $$ \mathtt{u.p[2]}$$ is the parent of $$ \mathtt{u}$$ . Using an array this way means that some sequences of $$ \mathtt{if}$$ statements can be simplified into algebraic expressions. An example of such a simplification occurs during tree traversal. If a traversal arrives at a node $$ \mathtt{u}$$ from $$ \mathtt{u.p[i]}$$ , then the next node in the traversal is $$ \ensuremath{\mathtt{u.p}}[(\ensuremath{\mathtt{i}}+1)\bmod 3]$$ . Similar examples occur when there is left-right symmetry. For example, the sibling of $$ \mathtt{u.p[i]}$$ is $$ \ensuremath{\mathtt{u.p}}[(\ensuremath{\mathtt{i}}+1)\bmod 2]$$ . This trick works whether $$ \mathtt{u.p[i]}$$ is a left child ( $$ \ensuremath{\mathtt{i}}=0$$ ) or a right child ( $$ \ensuremath{\mathtt{i}}=1$$ ) of $$ \mathtt{u}$$ . In some cases this means that some complicated code that would otherwise need to have both a left version and right version can be written only once. See the methods $$ \mathtt{rotateLeft(u)}$$ and $$ \mathtt{rotateRight(u)}$$ on page ![[*]](/images/open-data-structures/6_3_Discussion_Exercises-crossref.png.webp) for an example. **Exercise 6..1** Prove that a binary tree having $$ \ensuremath{\mathtt{n}}\ge 1$$ nodes has $$ \ensuremath{\mathtt{n}}-1$$ edges.

**Exercise 6..2** Prove that a binary tree having $$ \ensuremath{\mathtt{n}}\ge 1$$ real nodes has $$ \ensuremath{\mathtt{n}}+1$$ external nodes.

**Exercise 6..3** Prove that, if a binary tree, $$ T$$ , has at least one leaf, then either (a) $$ T$$ 's root has at most one child or (b) $$ T$$ has more than one leaf.

**Exercise 6..4** Implement a non-recursive method, $$ \mathtt{size2(u)}$$ , that computes the size of the subtree rooted at node $$ \mathtt{u}$$ .

**Exercise 6..5** Write a non-recursive method, $$ \mathtt{height2(u)}$$ , that computes the height of node $$ \mathtt{u}$$ in a BinaryTree.

**Exercise 6..6** A binary tree is size-balanced if, for every node $$ \mathtt{u}$$ , the size of the subtrees rooted at $$ \mathtt{u.left}$$ and $$ \mathtt{u.right}$$ differ by at most one. Write a recursive method, $$ \mathtt{isBalanced()}$$ , that tests if a binary tree is balanced. Your method should run in $$ O(\ensuremath{\mathtt{n}})$$ time. (Be sure to test your code on some large trees with different shapes; it is easy to write a method that takes much longer than $$ O(\ensuremath{\mathtt{n}})$$ time.)

A pre-order traversal of a binary tree is a traversal that visits each node, $$ \mathtt{u}$$ , before any of its children. An in-order traversal visits $$ \mathtt{u}$$ after visiting all the nodes in $$ \mathtt{u}$$ 's left subtree but before visiting any of the nodes in $$ \mathtt{u}$$ 's right subtree. A post-order traversal visits $$ \mathtt{u}$$ only after visiting all other nodes in $$ \mathtt{u}$$ 's subtree. The pre/in/post-order numbering of a tree labels the nodes of a tree with the integers $$ 0,\ldots,\ensuremath{\mathtt{n}}-1$$ in the order that they are encountered by a pre/in/post-order traversal. See Figure 6.10 for an example. **Figure 6.10:** Pre-order, post-order, and in-order numberings of a binary tree. ![\includegraphics[scale=0.90909]{figs/binarytree-numbering-1}](/images/open-data-structures/6_3_Discussion_Exercises-img2791.png.webp) ![\includegraphics[scale=0.90909]{figs/binarytree-numbering-2}](/images/open-data-structures/6_3_Discussion_Exercises-img2792.png.webp) ![\includegraphics[scale=0.90909]{figs/binarytree-numbering-3}](/images/open-data-structures/6_3_Discussion_Exercises-img2793.png.webp) **Exercise 6..7** Create a subclass of BinaryTree whose nodes have fields for storing pre-order, post-order, and in-order numbers. Write recursive methods $$ \mathtt{preOrderNumber()}$$ , $$ \mathtt{inOrderNumber()}$$ , and $$ \mathtt{postOrderNumbers()}$$ that assign these numbers correctly. These methods should each run in $$ O(\ensuremath{\mathtt{n}})$$ time.

**Exercise 6..8** Implement the non-recursive functions $$ \mathtt{nextPreOrder(u)}$$ , $$ \mathtt{nextInOrder(u)}$$ , and $$ \mathtt{nextPostOrder(u)}$$ that return the node that follows $$ \mathtt{u}$$ in a pre-order, in-order, or post-order traversal, respectively. These functions should take amortized constant time; if we start at any node $$ \mathtt{u}$$ and repeatedly call one of these functions and assign the return value to $$ \mathtt{u}$$ until $$ \ensuremath{\mathtt{u}}=\ensuremath{\mathtt{null}}$$ , then the cost of all these calls should be $$ O(\ensuremath{\mathtt{n}})$$ .

**Exercise 6..9** Suppose we are given a binary tree with pre-, post-, and in-order numbers assigned to the nodes. Show how these numbers can be used to answer each of the following questions in constant time: Given a node $$ \mathtt{u}$$ , determine the size of the subtree rooted at $$ \mathtt{u}$$ . Given a node $$ \mathtt{u}$$ , determine the depth of $$ \mathtt{u}$$ . Given two nodes $$ \mathtt{u}$$ and $$ \mathtt{w}$$ , determine if $$ \mathtt{u}$$ is an ancestor of $$ \mathtt{w}$$

**Exercise 6..10** Suppose you are given a list of nodes with pre-order and in-order numbers assigned. Prove that there is at most one possible tree with this pre-order/in-order numbering and show how to construct it.

**Exercise 6..11** Show that the shape of any binary tree on $$ \mathtt{n}$$ nodes can be represented using at most $$ 2(\ensuremath{\mathtt{n}}-1)$$ bits. (Hint: think about recording what happens during a traversal and then playing back that recording to reconstruct the tree.)

**Exercise 6..12** Illustrate what happens when we add the values $$ 3.5$$ and then 4.5 to the binary search tree in Figure 6.5.

**Exercise 6..13** Illustrate what happens when we remove the values $$ 3$$ and then 5 from the binary search tree in Figure 6.5.

**Exercise 6..14** Implement a BinarySearchTree method, $$ \mathtt{getLE(x)}$$ , that returns a list of all items in the tree that are less than or equal to $$ \mathtt{x}$$ . The running time of your method should be $$ O(\ensuremath{\mathtt{n}}'+\ensuremath{\mathtt{h}})$$ where $$ \ensuremath{\mathtt{n}}'$$ is the number of items less than or equal to $$ \mathtt{x}$$ and $$ \mathtt{h}$$ is the height of the tree.

**Exercise 6..15** Describe how to add the elements $$ \{1,\ldots,\ensuremath{\mathtt{n}}\}$$ to an initially empty BinarySearchTree in such a way that the resulting tree has height $$ \ensuremath{\mathtt{n}}-1$$ . How many ways are there to do this?

**Exercise 6..16** If we have some BinarySearchTree and perform the operations $$ \mathtt{add(x)}$$ followed by $$ \mathtt{remove(x)}$$ (with the same value of $$ \mathtt{x}$$ ) do we necessarily return to the original tree?

**Exercise 6..17** Can a $$ \mathtt{remove(x)}$$ operation increase the height of any node in a BinarySearchTree? If so, by how much?

**Exercise 6..18** Can an $$ \mathtt{add(x)}$$ operation increase the height of any node in a BinarySearchTree? Can it increase the height of the tree? If so, by how much?

**Exercise 6..19** Design and implement a version of BinarySearchTree in which each node, $$ \mathtt{u}$$ , maintains values $$ \mathtt{u.size}$$ (the size of the subtree rooted at $$ \mathtt{u}$$ ), $$ \mathtt{u.depth}$$ (the depth of $$ \mathtt{u}$$ ), and $$ \mathtt{u.height}$$ (the height of the subtree rooted at $$ \mathtt{u}$$ ). These values should be maintained, even during calls to the $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ operations, but this should not increase the cost of these operations by more than a constant factor.

[opendatastructures.org](http://opendatastructures.org/)
