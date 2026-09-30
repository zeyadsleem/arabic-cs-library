---
title: "9. Red-Black Trees"
lang: en
---

In this chapter, we present red-black trees, a version of binary search trees with logarithmic height. Red-black trees are one of the most widely used data structures. They appear as the primary search structure in many library implementations, including the Java Collections Framework and several implementations of the C++ Standard Template Library. They are also used within the Linux operating system kernel. There are several reasons for the popularity of red-black trees:

1. A red-black tree storing $$ \mathtt{n}$$ values has height at most $$ 2\log \ensuremath{\mathtt{n}}$$ .
2. The $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ operations on a red-black tree run in $$ O(\log \ensuremath{\mathtt{n}})$$ worst-case time.
3. The amortized number of rotations performed during an $$ \mathtt{add(x)}$$ or $$ \mathtt{remove(x)}$$ operation is constant.

The first two of these properties already put red-black trees ahead of skiplists, treaps, and scapegoat trees. Skiplists and treaps rely on randomization and their $$ O(\log \ensuremath{\mathtt{n}})$$ running times are only expected. Scapegoat trees have a guaranteed bound on their height, but $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ only run in $$ O(\log \ensuremath{\mathtt{n}})$$ amortized time. The third property is just icing on the cake. It tells us that that the time needed to add or remove an element $$ \mathtt{x}$$ is dwarfed by the time it takes to find $$ \mathtt{x}$$ .9.1 However, the nice properties of red-black trees come with a price: implementation complexity. Maintaining a bound of $$ 2\log \ensuremath{\mathtt{n}}$$ on the height is not easy. It requires a careful analysis of a number of cases. We must ensure that the implementation does exactly the right thing in each case. One misplaced rotation or change of colour produces a bug that can be very difficult to understand and track down. Rather than jumping directly into the implementation of red-black trees, we will first provide some background on a related data structure: 2-4 trees. This will give some insight into how red-black trees were discovered and why efficiently maintaining them is even possible.

#### Footnotes

....9.1 Note that skiplists and treaps also have this property in the expected sense. See Exercises 4.6 and 7.5.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 9.1 2-4 Trees

**Subsections**

# 9.1 2-4 Trees

A 2-4 tree is a rooted tree with the following properties: **Property 9..1** (height) All leaves have the same depth.

**Property 9..2** (degree) Every internal node has 2, 3, or 4 children.

An example of a 2-4 tree is shown in Figure 9.1.

The properties of 2-4 trees imply that their height is logarithmic in the number of leaves:

**Lemma 9..1** *A 2-4 tree with $$ \mathtt{n}$$ leaves has height at most $$ \log \ensuremath{\mathtt{n}}$$ .*

*Proof*. The lower-bound of 2 on the number of children of an internal node implies that, if the height of a 2-4 tree is $$ h$$ , then it has at least $$ 2^h$$ leaves. In other words,

![$\displaystyle \ensuremath{\mathtt{n}} \ge 2^h \enspace . $](/images/open-data-structures/9_1_2_4_Trees-img3463.png.webp)

Taking logarithms on both sides of this inequality gives $$ h \le \log \ensuremath{\mathtt{n}}$$ . ![$ \qedsymbol$](/images/open-data-structures/9_1_2_4_Trees-img3460.png.webp)

## 9.1.1 Adding a Leaf

Adding a leaf to a 2-4 tree is easy (see Figure 9.2). If we want to add a leaf $$ \mathtt{u}$$ as the child of some node $$ \mathtt{w}$$ on the second-last level, then we simply make $$ \mathtt{u}$$ a child of $$ \mathtt{w}$$ . This certainly maintains the height property, but could violate the degree property; if $$ \mathtt{w}$$ had four children prior to adding $$ \mathtt{u}$$ , then $$ \mathtt{w}$$ now has five children. In this case, we split $$ \mathtt{w}$$ into two nodes, $$ \mathtt{w}$$ and $$ \mathtt{w}$$ ', having two and three children, respectively. But now $$ \mathtt{w}$$ ' has no parent, so we recursively make $$ \mathtt{w}$$ ' a child of $$ \mathtt{w}$$ 's parent. Again, this may cause $$ \mathtt{w}$$ 's parent to have too many children in which case we split it. This process goes on until we reach a node that has fewer than four children, or until we split the root, $$ \mathtt{r}$$ , into two nodes $$ \mathtt{r}$$ and $$ \mathtt{r'}$$ . In the latter case, we make a new root that has $$ \mathtt{r}$$ and $$ \mathtt{r'}$$ as children. This simultaneously increases the depth of all leaves and so maintains the height property.

| ![\includegraphics[scale=0.90909]{figs/24tree-add-1}](/images/open-data-structures/9_1_2_4_Trees-img3484.png.webp) |
| --- |
| ![\includegraphics[scale=0.90909]{figs/24tree-add-2}](/images/open-data-structures/9_1_2_4_Trees-img3485.png.webp) |
| ![\includegraphics[scale=0.90909]{figs/24tree-add-3}](/images/open-data-structures/9_1_2_4_Trees-img3486.png.webp) |

Since the height of the 2-4 tree is never more than $$ \log \ensuremath{\mathtt{n}}$$ , the process of adding a leaf finishes after at most $$ \log \ensuremath{\mathtt{n}}$$ steps.

## 9.1.2 Removing a Leaf

Removing a leaf from a 2-4 tree is a little more tricky (see Figure 9.3). To remove a leaf $$ \mathtt{u}$$ from its parent $$ \mathtt{w}$$ , we just remove it. If $$ \mathtt{w}$$ had only two children prior to the removal of $$ \mathtt{u}$$ , then $$ \mathtt{w}$$ is left with only one child and violates the degree property.

| ![\includegraphics[height=.2\textheight ]{figs/24tree-remove-1}](/images/open-data-structures/9_1_2_4_Trees-img3495.png.webp) |
| --- |
| ![\includegraphics[height=.2\textheight ]{figs/24tree-remove-2}](/images/open-data-structures/9_1_2_4_Trees-img3496.png.webp) |
| ![\includegraphics[height=.2\textheight ]{figs/24tree-remove-3}](/images/open-data-structures/9_1_2_4_Trees-img3497.png.webp) |
| ![\includegraphics[height=.2\textheight ]{figs/24tree-remove-4}](/images/open-data-structures/9_1_2_4_Trees-img3498.png.webp) |
| ![\includegraphics[height=.2\textheight ]{figs/24tree-remove-5}](/images/open-data-structures/9_1_2_4_Trees-img3499.png.webp) |

To correct this, we look at $$ \mathtt{w}$$ 's sibling, $$ \mathtt{w'}$$ . The node $$ \mathtt{w'}$$ is sure to exist since $$ \mathtt{w}$$ 's parent had at least two children. If $$ \mathtt{w'}$$ has three or four children, then we take one of these children from $$ \mathtt{w'}$$ and give it to $$ \mathtt{w}$$ . Now $$ \mathtt{w}$$ has two children and $$ \mathtt{w'}$$ has two or three children and we are done. On the other hand, if $$ \mathtt{w'}$$ has only two children, then we merge $$ \mathtt{w}$$ and $$ \mathtt{w'}$$ into a single node, $$ \mathtt{w}$$ , that has three children. Next we recursively remove $$ \mathtt{w'}$$ from the parent of $$ \mathtt{w'}$$ . This process ends when we reach a node, $$ \mathtt{u}$$ , where $$ \mathtt{u}$$ or its sibling has more than two children, or when we reach the root. In the latter case, if the root is left with only one child, then we delete the root and make its child the new root. Again, this simultaneously decreases the height of every leaf and therefore maintains the height property. Again, since the height of the tree is never more than $$ \log \ensuremath{\mathtt{n}}$$ , the process of removing a leaf finishes after at most $$ \log \ensuremath{\mathtt{n}}$$ steps. [opendatastructures.org](http://opendatastructures.org/)

## 9.2 RedBlackTree: A Simulated 2-4 Tree

**Subsections**

# 9.2 RedBlackTree: A Simulated 2-4 Tree

A red-black tree is a binary search tree in which each node, $$ \mathtt{u}$$ , has a colour which is either red or black. Red is represented by the value and black by the value $$ 1$$ .

```
    class Node<T> extends BinarySearchTree.BSTNode<Node<T>,T> {
        byte colour;
    }
```

Before and after any operation on a red-black tree, the following two properties are satisfied. Each property is defined both in terms of the colours red and black, and in terms of the numeric values 0 and 1. **Property 9..3** (black-height) There are the same number of black nodes on every root to leaf path. (The sum of the colours on any root to leaf path is the same.)

**Property 9..4** (no-red-edge) No two red nodes are adjacent. (For any node $$ \mathtt{u}$$ , except the root, $$ \ensuremath{\mathtt{u.colour}} + \ensuremath{\mathtt{u.parent.colour}} \ge 1$$ .)

Notice that we can always colour the root, $$ \mathtt{r}$$ , of a red-black tree black without violating either of these two properties, so we will assume that the root is black, and the algorithms for updating a red-black tree will maintain this. Another trick that simplifies red-black trees is to treat the external nodes (represented by $$ \mathtt{nil}$$ ) as black nodes. This way, every real node, $$ \mathtt{u}$$ , of a red-black tree has exactly two children, each with a well-defined colour. An example of a red-black tree is shown in Figure 9.4.

**Figure 9.4:** An example of a red-black tree with black-height 3. External ( $$ \mathtt{nil}$$ ) nodes are drawn as squares. ![\includegraphics[scale=0.90909]{figs/24rb-1}](/images/open-data-structures/9_2_RedBlackTree_Simulated_-img3527.png.webp) 9.2.1 Red-Black Trees and 2-4 Trees At first it might seem surprising that a red-black tree can be efficiently updated to maintain the black-height and no-red-edge properties, and it seems unusual to even consider these as useful properties. However, red-black trees were designed to be an efficient simulation of 2-4 trees as binary trees. Refer to Figure 9.5. Consider any red-black tree, $$ T$$ , having $$ \mathtt{n}$$ nodes and perform the following transformation: Remove each red node $$ \mathtt{u}$$ and connect $$ \mathtt{u}$$ 's two children directly to the (black) parent of $$ \mathtt{u}$$ . After this transformation we are left with a tree $$ T'$$ having only black nodes. **Figure 9.5:** Every red-black tree has a corresponding 2-4 tree. ![\includegraphics[scale=0.90909]{figs/24rb-3}](/images/open-data-structures/9_2_RedBlackTree_Simulated_-img3535.png.webp) ![\includegraphics[scale=0.90909]{figs/24rb-2}](/images/open-data-structures/9_2_RedBlackTree_Simulated_-img3536.png.webp) Every internal node in $$ T'$$ has two, three, or four children: A black node that started out with two black children will still have two black children after this transformation. A black node that started out with one red and one black child will have three children after this transformation. A black node that started out with two red children will have four children after this transformation. Furthermore, the black-height property now guarantees that every root-to-leaf path in $$ T'$$ has the same length. In other words, $$ T'$$ is a 2-4 tree! The 2-4 tree $$ T'$$ has $$ \ensuremath{\mathtt{n}}+1$$ leaves that correspond to the $$ \ensuremath{\mathtt{n}}+1$$ external nodes of the red-black tree. Therefore, this tree has height at most $$ \log (\ensuremath{\mathtt{n}}+1)$$ . Now, every root to leaf path in the 2-4 tree corresponds to a path from the root of the red-black tree $$ T$$ to an external node. The first and last node in this path are black and at most one out of every two internal nodes is red, so this path has at most $$ \log(\ensuremath{\mathtt{n}}+1)$$ black nodes and at most $$ \log(\ensuremath{\mathtt{n}}+1)-1$$ red nodes. Therefore, the longest path from the root to any internal node in $$ T$$ is at most

![$\displaystyle 2\log(\ensuremath{\mathtt{n}}+1) -2 \le 2\log \ensuremath{\mathtt{n}} \enspace , $](/images/open-data-structures/9_2_RedBlackTree_Simulated_-img3548.png.webp)

for any $$ \ensuremath{\mathtt{n}}\ge 1$$ . This proves the most important property of red-black trees:

**Lemma 9..2** *The height of red-black tree with $$ \mathtt{n}$$ nodes is at most $$ 2\log \ensuremath{\mathtt{n}}$$ .*

Now that we have seen the relationship between 2-4 trees and red-black trees, it is not hard to believe that we can efficiently maintain a red-black tree while adding and removing elements. We have already seen that adding an element in a BinarySearchTree can be done by adding a new leaf. Therefore, to implement $$ \mathtt{add(x)}$$ in a red-black tree we need a method of simulating splitting a node with five children in a 2-4 tree. A 2-4 tree node with five children is represented by a black node that has two red children, one of which also has a red child. We can ``split'' this node by colouring it red and colouring its two children black. An example of this is shown in Figure 9.6. **Figure 9.6:** Simulating a 2-4 tree split operation during an addition in a red-black tree. (This simulates the 2-4 tree addition shown in Figure 9.2.) ![\includegraphics[scale=0.90909]{figs/rb-split-1}](/images/open-data-structures/9_2_RedBlackTree_Simulated_-img3553.png.webp) ![\includegraphics[scale=0.90909]{figs/rb-split-2}](/images/open-data-structures/9_2_RedBlackTree_Simulated_-img3554.png.webp) ![\includegraphics[scale=0.90909]{figs/rb-split-3}](/images/open-data-structures/9_2_RedBlackTree_Simulated_-img3555.png.webp) Similarly, implementing $$ \mathtt{remove(x)}$$ requires a method of merging two nodes and borrowing a child from a sibling. Merging two nodes is the inverse of a split (shown in Figure 9.6), and involves colouring two (black) siblings red and colouring their (red) parent black. Borrowing from a sibling is the most complicated of the procedures and involves both rotations and recolouring nodes. Of course, during all of this we must still maintain the no-red-edge property and the black-height property. While it is no longer surprising that this can be done, there are a large number of cases that have to be considered if we try to do a direct simulation of a 2-4 tree by a red-black tree. At some point, it just becomes simpler to disregard the underlying 2-4 tree and work directly towards maintaining the properties of the red-black tree. 9.2.2 Left-Leaning Red-Black Trees No single definition of red-black trees exists. Rather, there is a family of structures that manage to maintain the black-height and no-red-edge properties during $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ operations. Different structures do this in different ways. Here, we implement a data structure that we call a RedBlackTree. This structure implements a particular variant of red-black trees that satisfies an additional property: **Property 9..5** (left-leaning) At any node $$ \mathtt{u}$$ , if $$ \mathtt{u.left}$$ is black, then $$ \mathtt{u.right}$$ is black.

Note that the red-black tree shown in Figure 9.4 does not satisfy the left-leaning property; it is violated by the parent of the red node in the rightmost path. The reason for maintaining the left-leaning property is that it reduces the number of cases encountered when updating the tree during $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ operations. In terms of 2-4 trees, it implies that every 2-4 tree has a unique representation: A node of degree two becomes a black node with two black children. A node of degree three becomes a black node whose left child is red and whose right child is black. A node of degree four becomes a black node with two red children. Before we describe the implementation of $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ in detail, we first present some simple subroutines used by these methods that are illustrated in Figure 9.7. The first two subroutines are for manipulating colours while preserving the black-height property. The $$ \mathtt{pushBlack(u)}$$ method takes as input a black node $$ \mathtt{u}$$ that has two red children and colours $$ \mathtt{u}$$ red and its two children black. The $$ \mathtt{pullBlack(u)}$$ method reverses this operation:

```
    void pushBlack(Node<T> u) {
        u.colour--;
        u.left.colour++;
        u.right.colour++;
    }
    void pullBlack(Node<T> u) {
        u.colour++;
        u.left.colour--;
        u.right.colour--;
    }
```

The $$ \mathtt{flipLeft(u)}$$ method swaps the colours of $$ \mathtt{u}$$ and $$ \mathtt{u.right}$$ and then performs a left rotation at $$ \mathtt{u}$$ . This method reverses the colours of these two nodes as well as their parent-child relationship:

```
    void flipLeft(Node<T> u) {
        swapColors(u, u.right);
        rotateLeft(u);
    }
```

The $$ \mathtt{flipLeft(u)}$$ operation is especially useful in restoring the left-leaning property at a node $$ \mathtt{u}$$ that violates it (because $$ \mathtt{u.left}$$ is black and $$ \mathtt{u.right}$$ is red). In this special case, we can be assured that this operation preserves both the black-height and no-red-edge properties. The $$ \mathtt{flipRight(u)}$$ operation is symmetric with $$ \mathtt{flipLeft(u)}$$ , when the roles of left and right are reversed.

```
    void flipRight(Node<T> u) {
        swapColors(u, u.left);
        rotateRight(u);
    }
```

## 9.2.3 Addition

To implement $$ \mathtt{add(x)}$$ in a RedBlackTree, we perform a standard BinarySearchTree insertion to add a new leaf, $$ \mathtt{u}$$ , with $$ \ensuremath{\mathtt{u.x}}=\ensuremath{\mathtt{x}}$$ and set $$ \ensuremath{\mathtt{u.colour}}=\ensuremath{\mathtt{red}}$$ . Note that this does not change the black height of any node, so it does not violate the black-height property. It may, however, violate the left-leaning property (if $$ \mathtt{u}$$ is the right child of its parent), and it may violate the no-red-edge property (if $$ \mathtt{u}$$ 's parent is $$ \mathtt{red}$$ ). To restore these properties, we call the method $$ \mathtt{addFixup(u)}$$ .

```
    boolean add(T x) {
        Node<T> u = newNode(x);
        u.colour = red;
        boolean added = add(u);
        if (added)
            addFixup(u);
        return added;
    }
```

Illustrated in Figure 9.8, the $$ \mathtt{addFixup(u)}$$ method takes as input a node $$ \mathtt{u}$$ whose colour is red and which may violate the no-red-edge property and/or the left-leaning property. The following discussion is probably impossible to follow without referring to Figure 9.8 or recreating it on a piece of paper. Indeed, the reader may wish to study this figure before continuing.

If $$ \mathtt{u}$$ is the root of the tree, then we can colour $$ \mathtt{u}$$ black to restore both properties. If $$ \mathtt{u}$$ 's sibling is also red, then $$ \mathtt{u}$$ 's parent must be black, so both the left-leaning and no-red-edge properties already hold. Otherwise, we first determine if $$ \mathtt{u}$$ 's parent, $$ \mathtt{w}$$ , violates the left-leaning property and, if so, perform a $$ \mathtt{flipLeft(w)}$$ operation and set $$ \ensuremath{\mathtt{u}}=\ensuremath{\mathtt{w}}$$ . This leaves us in a well-defined state: $$ \mathtt{u}$$ is the left child of its parent, $$ \mathtt{w}$$ , so $$ \mathtt{w}$$ now satisfies the left-leaning property. All that remains is to ensure the no-red-edge property at $$ \mathtt{u}$$ . We only have to worry about the case in which $$ \mathtt{w}$$ is red, since otherwise $$ \mathtt{u}$$ already satisfies the no-red-edge property. Since we are not done yet, $$ \mathtt{u}$$ is red and $$ \mathtt{w}$$ is red. The no-red-edge property (which is only violated by $$ \mathtt{u}$$ and not by $$ \mathtt{w}$$ ) implies that $$ \mathtt{u}$$ 's grandparent $$ \mathtt{g}$$ exists and is black. If $$ \mathtt{g}$$ 's right child is red, then the left-leaning property ensures that both $$ \mathtt{g}$$ 's children are red, and a call to $$ \mathtt{pushBlack(g)}$$ makes $$ \mathtt{g}$$ red and $$ \mathtt{w}$$ black. This restores the no-red-edge property at $$ \mathtt{u}$$ , but may cause it to be violated at $$ \mathtt{g}$$ , so the whole process starts over with $$ \ensuremath{\mathtt{u}}=\ensuremath{\mathtt{g}}$$ . If $$ \mathtt{g}$$ 's right child is black, then a call to $$ \mathtt{flipRight(g)}$$ makes $$ \mathtt{w}$$ the (black) parent of $$ \mathtt{g}$$ and gives $$ \mathtt{w}$$ two red children, $$ \mathtt{u}$$ and $$ \mathtt{g}$$ . This ensures that $$ \mathtt{u}$$ satisfies the no-red-edge property and $$ \mathtt{g}$$ satisfies the left-leaning property. In this case we can stop.

```
    void addFixup(Node<T> u) {
        while (u.colour == red) {
            if (u == r) { // u is the root - done
                u.colour = black;
                return;
            }
            Node<T> w = u.parent;
            if (w.left.colour == black) { // ensure left-leaning
                flipLeft(w);
                u = w;
                w = u.parent;
            }
            if (w.colour == black)
                return; // no red-red edge = done
            Node<T> g = w.parent; // grandparent of u
            if (g.right.colour == black) {
                flipRight(g);
                return;
            } else {
                pushBlack(g);
                u = g;
            }
        }
    }
```

The $$ \mathtt{insertFixup(u)}$$ method takes constant time per iteration and each iteration either finishes or moves $$ \mathtt{u}$$ closer to the root. Therefore, the $$ \mathtt{insertFixup(u)}$$ method finishes after $$ O(\log \ensuremath{\mathtt{n}})$$ iterations in $$ O(\log \ensuremath{\mathtt{n}})$$ time.

## 9.2.4 Removal

The $$ \mathtt{remove(x)}$$ operation in a RedBlackTree is the most complicated to implement, and this is true of all known red-black tree variants. Just like the $$ \mathtt{remove(x)}$$ operation in a BinarySearchTree, this operation boils down to finding a node $$ \mathtt{w}$$ with only one child, $$ \mathtt{u}$$ , and splicing $$ \mathtt{w}$$ out of the tree by having $$ \mathtt{w.parent}$$ adopt $$ \mathtt{u}$$ . The problem with this is that, if $$ \mathtt{w}$$ is black, then the black-height property will now be violated at $$ \mathtt{w.parent}$$ . We may avoid this problem, temporarily, by adding $$ \mathtt{w.colour}$$ to $$ \mathtt{u.colour}$$ . Of course, this introduces two other problems: (1) if $$ \mathtt{u}$$ and $$ \mathtt{w}$$ both started out black, then $$ \ensuremath{\mathtt{u.colour}}+\ensuremath{\mathtt{w.colour}}=2$$ (double black), which is an invalid colour. If $$ \mathtt{w}$$ was red, then it is replaced by a black node $$ \mathtt{u}$$ , which may violate the left-leaning property at $$ \ensuremath{\mathtt{u.parent}}$$ . Both of these problems can be resolved with a call to the $$ \mathtt{removeFixup(u)}$$ method.

```
    boolean remove(T x) {
        Node<T> u = findLast(x);
        if (u == nil || compare(u.x, x) != 0)
            return false;
        Node<T> w = u.right;
        if (w == nil) {
            w = u;
            u = w.left;
        } else {
            while (w.left != nil)
                w = w.left;
            u.x = w.x;
            u = w.right;
        }
        splice(w);
        u.colour += w.colour;
        u.parent = w.parent;
        removeFixup(u);
        return true;
    }
```

The $$ \mathtt{removeFixup(u)}$$ method takes as its input a node $$ \mathtt{u}$$ whose colour is black (1) or double-black (2). If $$ \mathtt{u}$$ is double-black, then $$ \mathtt{removeFixup(u)}$$ performs a series of rotations and recolouring operations that move the double-black node up the tree until it can be eliminated. During this process, the node $$ \mathtt{u}$$ changes until, at the end of this process, $$ \mathtt{u}$$ refers to the root of the subtree that has been changed. The root of this subtree may have changed colour. In particular, it may have gone from red to black, so the $$ \mathtt{removeFixup(u)}$$ method finishes by checking if $$ \mathtt{u}$$ 's parent violates the left-leaning property and, if so, fixing it.

```
    void removeFixup(Node<T> u) {
        while (u.colour > black) {
            if (u == r) {
                u.colour = black;
            } else if (u.parent.left.colour == red) {
                u = removeFixupCase1(u);
            } else if (u == u.parent.left) {
                u = removeFixupCase2(u);
            } else { 
                u = removeFixupCase3(u);
            }
        }
        if (u != r) { // restore left-leaning property if needed
            Node<T> w = u.parent;
            if (w.right.colour == red && w.left.colour == black) {
                flipLeft(w);
            }
        }
    }
```

The $$ \mathtt{removeFixup(u)}$$ method is illustrated in Figure 9.9. Again, the following text will be difficult, if not impossible, to follow without referring to Figure 9.9. Each iteration of the loop in $$ \mathtt{removeFixup(u)}$$ processes the double-black node $$ \mathtt{u}$$ , based on one of four cases:

Case 0: $$ \mathtt{u}$$ is the root. This is the easiest case to treat. We recolour $$ \mathtt{u}$$ to be black (this does not violate any of the red-black tree properties). Case 1: $$ \mathtt{u}$$ 's sibling, $$ \mathtt{v}$$ , is red. In this case, $$ \mathtt{u}$$ 's sibling is the left child of its parent, $$ \mathtt{w}$$ (by the left-leaning property). We perform a right-flip at $$ \mathtt{w}$$ and then proceed to the next iteration. Note that this action causes $$ \mathtt{w}$$ 's parent to violate the left-leaning property and the depth of $$ \mathtt{u}$$ to increase. However, it also implies that the next iteration will be in Case 3 with $$ \mathtt{w}$$ coloured red. When examining Case 3 below, we will see that the process will stop during the next iteration.

```
    Node<T> removeFixupCase1(Node<T> u) {
        flipRight(u.parent);
        return u;
    }
```

Case 2: $$ \mathtt{u}$$ 's sibling, $$ \mathtt{v}$$ , is black, and $$ \mathtt{u}$$ is the left child of its parent, $$ \mathtt{w}$$ . In this case, we call $$ \mathtt{pullBlack(w)}$$ , making $$ \mathtt{u}$$ black, $$ \mathtt{v}$$ red, and darkening the colour of $$ \mathtt{w}$$ to black or double-black. At this point, $$ \mathtt{w}$$ does not satisfy the left-leaning property, so we call $$ \mathtt{flipLeft(w)}$$ to fix this. At this point, $$ \mathtt{w}$$ is red and $$ \mathtt{v}$$ is the root of the subtree with which we started. We need to check if $$ \mathtt{w}$$ causes the no-red-edge property to be violated. We do this by inspecting $$ \mathtt{w}$$ 's right child, $$ \mathtt{q}$$ . If $$ \mathtt{q}$$ is black, then $$ \mathtt{w}$$ satisfies the no-red-edge property and we can continue the next iteration with $$ \ensuremath{\mathtt{u}}=\ensuremath{\mathtt{v}}$$ . Otherwise ( $$ \mathtt{q}$$ is red), so both the no-red-edge property and the left-leaning properties are violated at $$ \mathtt{q}$$ and $$ \mathtt{w}$$ , respectively. The left-leaning property is restored with a call to $$ \mathtt{rotateLeft(w)}$$ , but the no-red-edge property is still violated. At this point, $$ \mathtt{q}$$ is the left child of $$ \mathtt{v}$$ , $$ \mathtt{w}$$ is the left child of $$ \mathtt{q}$$ , $$ \mathtt{q}$$ and $$ \mathtt{w}$$ are both red, and $$ \mathtt{v}$$ is black or double-black. A $$ \mathtt{flipRight(v)}$$ makes $$ \mathtt{q}$$ the parent of both $$ \mathtt{v}$$ and $$ \mathtt{w}$$ . Following this up by a $$ \mathtt{pushBlack(q)}$$ makes both $$ \mathtt{v}$$ and $$ \mathtt{w}$$ black and sets the colour of $$ \mathtt{q}$$ back to the original colour of $$ \mathtt{w}$$ . At this point, the double-black node is has been eliminated and the no-red-edge and black-height properties are reestablished. Only one possible problem remains: the right child of $$ \mathtt{v}$$ may be red, in which case the left-leaning property would be violated. We check this and perform a $$ \mathtt{flipLeft(v)}$$ to correct it if necessary.

```
    Node<T> removeFixupCase2(Node<T> u) {
        Node<T> w = u.parent;
        Node<T> v = w.right;
        pullBlack(w); // w.left
        flipLeft(w); // w is now red
        Node<T> q = w.right;
        if (q.colour == red) { // q-w is red-red
            rotateLeft(w);
            flipRight(v);
            pushBlack(q);
            if (v.right.colour == red)
                flipLeft(v);
            return q;
        } else {
            return v;
        }
    }
```

Case 3: $$ \mathtt{u}$$ 's sibling is black and $$ \mathtt{u}$$ is the right child of its parent, $$ \mathtt{w}$$ . This case is symmetric to Case 2 and is handled mostly the same way. The only differences come from the fact that the left-leaning property is asymmetric, so it requires different handling. As before, we begin with a call to $$ \mathtt{pullBlack(w)}$$ , which makes $$ \mathtt{v}$$ red and $$ \mathtt{u}$$ black. A call to $$ \mathtt{flipRight(w)}$$ promotes $$ \mathtt{v}$$ to the root of the subtree. At this point $$ \mathtt{w}$$ is red, and the code branches two ways depending on the colour of $$ \mathtt{w}$$ 's left child, $$ \mathtt{q}$$ . If $$ \mathtt{q}$$ is red, then the code finishes up exactly the same way as Case 2 does, but is even simpler since there is no danger of $$ \mathtt{v}$$ not satisfying the left-leaning property. The more complicated case occurs when $$ \mathtt{q}$$ is black. In this case, we examine the colour of $$ \mathtt{v}$$ 's left child. If it is red, then $$ \mathtt{v}$$ has two red children and its extra black can be pushed down with a call to $$ \mathtt{pushBlack(v)}$$ . At this point, $$ \mathtt{v}$$ now has $$ \mathtt{w}$$ 's original colour, and we are done. If $$ \mathtt{v}$$ 's left child is black, then $$ \mathtt{v}$$ violates the left-leaning property, and we restore this with a call to $$ \mathtt{flipLeft(v)}$$ . We then return the node $$ \mathtt{v}$$ so that the next iteration of $$ \mathtt{removeFixup(u)}$$ then continues with $$ \ensuremath{\mathtt{u}}=\ensuremath{\mathtt{v}}$$ .

```
    Node<T> removeFixupCase3(Node<T> u) {
        Node<T> w = u.parent;
        Node<T> v = w.left;
        pullBlack(w);       
        flipRight(w); // w is now red
        Node<T> q = w.left;
        if (q.colour == red) { // q-w is red-red
            rotateRight(w);
            flipLeft(v);
            pushBlack(q);
            return q;
        } else {
            if (v.left.colour == red) {
                pushBlack(v); // both v's children are red
                return v;
            } else { // ensure left-leaning
                flipLeft(v);
                return w;
            }
        }                
    }
```

Each iteration of $$ \mathtt{removeFixup(u)}$$ takes constant time. Cases 2 and 3 either finish or move $$ \mathtt{u}$$ closer to the root of the tree. Case 0 (where $$ \mathtt{u}$$ is the root) always terminates and Case 1 leads immediately to Case 3, which also terminates. Since the height of the tree is at most $$ 2\log \ensuremath{\mathtt{n}}$$ , we conclude that there are at most $$ O(\log \ensuremath{\mathtt{n}})$$ iterations of $$ \mathtt{removeFixup(u)}$$ , so $$ \mathtt{removeFixup(u)}$$ runs in $$ O(\log \ensuremath{\mathtt{n}})$$ time. [opendatastructures.org](http://opendatastructures.org/)

## 9.3 Summary

The following theorem summarizes the performance of the RedBlackTree data structure: **Theorem 9..1** *A RedBlackTree implements the SSet interface and supports the operations $$ \mathtt{add(x)}$$ , $$ \mathtt{remove(x)}$$ , and $$ \mathtt{find(x)}$$ in $$ O(\log \ensuremath{\mathtt{n}})$$ worst-case time per operation.*

Not included in the above theorem is the following extra bonus: **Theorem 9..2** *Beginning with an empty RedBlackTree, any sequence of $$ m$$ $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ operations results in a total of $$ O(m)$$ time spent during all calls $$ \mathtt{addFixup(u)}$$ and $$ \mathtt{removeFixup(u)}$$ . *

We only sketch a proof of Theorem 9.2. By comparing $$ \mathtt{addFixup(u)}$$ and $$ \mathtt{removeFixup(u)}$$ with the algorithms for adding or removing a leaf in a 2-4 tree, we can convince ourselves that this property is inherited from a 2-4 tree. In particular, if we can show that the total time spent splitting, merging, and borrowing in a 2-4 tree is $$ O(m)$$ , then this implies Theorem 9.2. The proof of this theorem for 2-4 trees uses the potential method of amortized analysis.9.2 Define the potential of an internal node $$ \mathtt{u}$$ in a 2-4 tree as

![$\displaystyle \Phi(\ensuremath{\mathtt{u}}) = \begin{cases} 1 & \text{if \en... ...ildren} \\ 3 & \text{if \ensuremath{\mathtt{u}} has 4 children} \end{cases}$](/images/open-data-structures/9_3_Summary-img3761.png.webp)

and the potential of a 2-4 tree as the sum of the potentials of its nodes. When a split occurs, it is because a node with four children becomes two nodes, with two and three children. This means that the overall potential drops by $$ 3-1-0 = 2$$ . When a merge occurs, two nodes that used to have two children are replaced by one node with three children. The result is a drop in potential of $$ 2-0=2$$ . Therefore, for every split or merge, the potential decreases by two. Next notice that, if we ignore splitting and merging of nodes, there are only a constant number of nodes whose number of children is changed by the addition or removal of a leaf. When adding a node, one node has its number of children increase by one, increasing the potential by at most three. During the removal of a leaf, one node has its number of children decrease by one, increasing the potential by at most one, and two nodes may be involved in a borrowing operation, increasing their total potential by at most one. To summarize, each merge and split causes the potential to drop by at least two. Ignoring merging and splitting, each addition or removal causes the potential to rise by at most three, and the potential is always non-negative. Therefore, the number of splits and merges caused by $$ m$$ additions or removals on an initially empty tree is at most $$ 3m/2$$ . Theorem 9.2 is a consequence of this analysis and the correspondence between 2-4 trees and red-black trees.

#### Footnotes

... analysis.9.2 See the proofs of Lemma 2.2 and Lemma 3.1 for other applications of the potential method. [opendatastructures.org](http://opendatastructures.org/)

## 9.4 Discussion and Exercises

Red-black trees were first introduced by Guibas and Sedgewick [38]. Despite their high implementation complexity they are found in some of the most commonly used libraries and applications. Most algorithms and data structures textbooks discuss some variant of red-black trees. Andersson [6] describes a left-leaning version of balanced trees that is similar to red-black trees but has the additional constraint that any node has at most one red child. This implies that these trees simulate 2-3 trees rather than 2-4 trees. They are significantly simpler, though, than the RedBlackTree structure presented in this chapter. Sedgewick [66] describes two versions of left-leaning red-black trees. These use recursion along with a simulation of top-down splitting and merging in 2-4 trees. The combination of these two techniques makes for particularly short and elegant code. A related, and older, data structure is the AVL tree [3]. AVL trees are height-balanced: At each node $$ u$$ , the height of the subtree rooted at $$ \mathtt{u.left}$$ and the subtree rooted at $$ \mathtt{u.right}$$ differ by at most one. It follows immediately that, if $$ F(h)$$ is the minimum number of leaves in a tree of height $$ h$$ , then $$ F(h)$$ obeys the Fibonacci recurrence

![$\displaystyle F(h) = F(h-1) + F(h-2) $](/images/open-data-structures/9_4_Discussion_Exercises-img3772.png.webp)

with base cases $$ F(0)=1$$ and $$ F(1)=1$$ . This means $$ F(h)$$ is approximately $$ \varphi^h/\sqrt{5}$$ , where $$ \varphi=(1+\sqrt{5})/2\approx1.61803399$$ is the golden ratio. (More precisely, $$ \vert\varphi^h/\sqrt{5} - F(h)\vert\le 1/2$$ .) Arguing as in the proof of Lemma 9.1, this implies

![$\displaystyle h \le \log_\varphi \ensuremath{\mathtt{n}} \approx 1.440420088\log \ensuremath{\mathtt{n}} \enspace , $](/images/open-data-structures/9_4_Discussion_Exercises-img3779.png.webp)

so AVL trees have smaller height than red-black trees. The height balancing can be maintained during $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ operations by walking back up the path to the root and performing a rebalancing operation at each node $$ \mathtt{u}$$ where the height of $$ \mathtt{u}$$ 's left and right subtrees differ by two. See Figure 9.10.

**Figure 9.10:** Rebalancing in an AVL tree. At most two rotations are required to convert a node whose subtrees have a height of $$ h$$ and $$ h+2$$ into a node whose subtrees each have a height of at most $$ h+1$$ . ![\includegraphics[scale=0.90909]{figs/avl-rebalance}](/images/open-data-structures/9_4_Discussion_Exercises-img3784.png.webp) Andersson's variant of red-black trees, Sedgewick's variant of red-black trees, and AVL trees are all simpler to implement than the RedBlackTree structure defined here. Unfortunately, none of them can guarantee that the amortized time spent rebalancing is $$ O(1)$$ per update. In particular, there is no analogue of Theorem 9.2 for those structures. **Figure 9.11:** A red-black tree on which to practice. ![\includegraphics[scale=0.90909]{figs/redblack-example}](/images/open-data-structures/9_4_Discussion_Exercises-img3792.png.webp) **Exercise 9..1** Illustrate the 2-4 tree that corresponds to the RedBlackTree in Figure 9.11.

**Exercise 9..2** Illustrate the addition of 13, then 3.5, then 3.3 on the RedBlackTree in Figure 9.11.

**Exercise 9..3** Illustrate the removal of 11, then 9, then 5 on the RedBlackTree in Figure 9.11.

**Exercise 9..4** Show that, for arbitrarily large values of $$ \mathtt{n}$$ , there are red-black trees with $$ \mathtt{n}$$ nodes that have height $$ 2\log \ensuremath{\mathtt{n}}-O(1)$$ .

**Exercise 9..5** Consider the operations $$ \mathtt{pushBlack(u)}$$ and $$ \mathtt{pullBlack(u)}$$ . What do these operations do to the underlying 2-4 tree that is being simulated by the red-black tree?

**Exercise 9..6** Show that, for arbitrarily large values of $$ \mathtt{n}$$ , there exist sequences of $$ \mathtt{add(x)}$$ and $$ \mathtt{remove(x)}$$ operations that lead to red-black trees with $$ \mathtt{n}$$ nodes that have height $$ 2\log \ensuremath{\mathtt{n}}-O(1)$$ .

**Exercise 9..7** Why does the method $$ \mathtt{remove(x)}$$ in the RedBlackTree implementation perform the assignment $$ \mathtt{u.parent=w.parent}$$ ? Shouldn't this already be done by the call to $$ \mathtt{splice(w)}$$ ?

**Exercise 9..8** Suppose a 2-4 tree, $$ T$$ , has $$ \ensuremath{\mathtt{n}}_\ell$$ leaves and $$ \ensuremath{\mathtt{n}}_i$$ internal nodes. What is the minimum value of $$ \ensuremath{\mathtt{n}}_i$$ , as a function of $$ \ensuremath{\mathtt{n}}_\ell$$ ? What is the maximum value of $$ \ensuremath{\mathtt{n}}_i$$ , as a function of $$ \ensuremath{\mathtt{n}}_\ell$$ ? If $$ T'$$ is a red-black tree that represents $$ T$$ , then how many red nodes does $$ T'$$ have?

**Exercise 9..9** Suppose you are given a binary search tree with $$ \mathtt{n}$$ nodes and a height of at most $$ 2\log \ensuremath{\mathtt{n}}-2$$ . Is it always possible to colour the nodes red and black so that the tree satisfies the black-height and no-red-edge properties? If so, can it also be made to satisfy the left-leaning property?

**Exercise 9..10** Suppose you have two red-black trees $$ T_1$$ and $$ T_2$$ that have the same black height, $$ h$$ , and such that the largest key in $$ T_1$$ is smaller than the smallest key in $$ T_2$$ . Show how to merge $$ T_1$$ and $$ T_2$$ into a single red-black tree in $$ O(h)$$ time.

**Exercise 9..11** Extend your solution to Exercise 9.10 to the case where the two trees $$ T_1$$ and $$ T_2$$ have different black heights, $$ h_1\neq h_2$$ . The running-time should be $$ O(\max\{h_1,h_2\})$$ .

**Exercise 9..12** Prove that, during an $$ \mathtt{add(x)}$$ operation, an AVL tree must perform at most one rebalancing operation (that involves at most two rotations; see Figure 9.10). Give an example of an AVL tree and a $$ \mathtt{remove(x)}$$ operation on that tree that requires on the order of $$ \log \ensuremath{\mathtt{n}}$$ rebalancing operations.

**Exercise 9..13** Implement an AVLTree class that implements AVL trees as described above. Compare its performance to that of the RedBlackTree implementation. Which implementation has a faster $$ \mathtt{find(x)}$$ operation?

**Exercise 9..14** Design and implement a series of experiments that compare the relative performance of $$ \mathtt{find(x)}$$ , $$ \mathtt{add(x)}$$ , and $$ \mathtt{remove(x)}$$ for the SSet implemeentations SkiplistSSet, ScapegoatTree, Treap, and RedBlackTree. Be sure to include multiple test scenarios, including cases where the data is random, already sorted, is removed in random order, is removed in sorted order, and so on.

[opendatastructures.org](http://opendatastructures.org/)
