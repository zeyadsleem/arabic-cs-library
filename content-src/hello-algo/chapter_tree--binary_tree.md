---
title: "Binary Tree"
book: hello-algo
chapter: chapter_tree
slug: binary_tree
order: 43
lang: en
---
A <u>binary tree</u> is a non-linear data structure that models the hierarchical relationship between "ancestors" and "descendants" and embodies a divide-and-conquer pattern in which each split branches into two. Similar to a linked list, the basic unit of a binary tree is a node, and each node contains a value, a reference to its left child node, and a reference to its right child node.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title=""
/* Binary tree node */
type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}
/* Constructor */
func NewTreeNode(v int) *TreeNode {
    return &TreeNode{
        Left:  nil, // Pointer to left child node
        Right: nil, // Pointer to right child node
        Val:   v,   // Node value
    }
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title=""
/* Binary tree node */
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val; // Node value
        this.left = left === undefined ? null : left; // Reference to left child node
        this.right = right === undefined ? null : right; // Reference to right child node
    }
}
```

</div>

Each node has two references (pointers), pointing respectively to the <u>left-child node</u> and <u>right-child node</u>. This node is called the <u>parent node</u> of these two child nodes. When given a node of a binary tree, we call the tree formed by this node's left child and all nodes below it the <u>left subtree</u> of this node. Similarly, the <u>right subtree</u> can be defined.

**In a binary tree, every non-leaf node has child nodes and therefore non-empty subtrees.** As shown in the figure below, if "Node 2" is regarded as a parent node, its left and right child nodes are "Node 4" and "Node 5" respectively. The left subtree is formed by "Node 4" and all nodes beneath it, while the right subtree is formed by "Node 5" and all nodes beneath it.

![Parent Node, child Node, subtree](/images/hello-algo/chapter_tree--binary_tree_definition.png)

## Common Terminology of Binary Trees

The commonly used terminology of binary trees is shown in the figure below.

- <u>Root node</u>: The node at the top level of a binary tree, which does not have a parent node.
- <u>Leaf node</u>: A node that does not have any child nodes, with both of its pointers pointing to `None`.
- <u>Edge</u>: A line segment that connects two nodes, representing a reference (pointer) between the nodes.
- The <u>level</u> of a node: It increases from top to bottom, with the root node being at level 1.
- The <u>degree</u> of a node: The number of child nodes that a node has. In a binary tree, the degree can be 0, 1, or 2.
- The <u>height</u> of a binary tree: The number of edges from the root node to the farthest leaf node.
- The <u>depth</u> of a node: The number of edges from the root node to the node.
- The <u>height</u> of a node: The number of edges from the farthest leaf node to the node.

![Common Terminology of Binary Trees](/images/hello-algo/chapter_tree--binary_tree_terminology.png)

<div class="note">

We usually define "height" and "depth" as the number of edges traversed, but some textbooks and problem statements define them as the number of nodes on the path. In that case, both values are larger by 1.

</div>

## Basic Operations of Binary Trees

### Initializing a Binary Tree

Similar to a linked list, the initialization of a binary tree involves first creating the nodes and then establishing the references (pointers) between them.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="binary_tree.go"
/* Initializing a binary tree */
// Initializing nodes
n1 := NewTreeNode(1)
n2 := NewTreeNode(2)
n3 := NewTreeNode(3)
n4 := NewTreeNode(4)
n5 := NewTreeNode(5)
// Linking references (pointers) between nodes
n1.Left = n2
n1.Right = n3
n2.Left = n4
n2.Right = n5
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="binary_tree.ts"
/* Initializing a binary tree */
// Initializing nodes
let n1 = new TreeNode(1),
    n2 = new TreeNode(2),
    n3 = new TreeNode(3),
    n4 = new TreeNode(4),
    n5 = new TreeNode(5);
// Linking references (pointers) between nodes
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;
```

</div>

### Inserting and Removing Nodes

Similar to a linked list, inserting and removing nodes in a binary tree can be achieved by modifying pointers. The figure below provides an example.

![Inserting and removing nodes in a binary tree](/images/hello-algo/chapter_tree--binary_tree_add_remove.png)

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="binary_tree.go"
/* Inserting and removing nodes */
// Inserting node P between n1 and n2
p := NewTreeNode(0)
n1.Left = p
p.Left = n2
// Removing node P
n1.Left = n2
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="binary_tree.ts"
/* Inserting and removing nodes */
const P = new TreeNode(0);
// Inserting node P between n1 and n2
n1.left = P;
P.left = n2;
// Removing node P
n1.left = n2;
```

</div>

<div class="note">

Keep in mind that inserting a node can alter the original logical structure of a binary tree, while deleting a node usually entails removing that node together with its entire subtree. In practice, insertion and deletion in binary trees are therefore typically implemented as coordinated sequences of operations to achieve a meaningful result.

</div>

## Common Types of Binary Trees

### Perfect Binary Tree

As shown in the figure below, a <u>perfect binary tree</u> has every level completely filled. In a perfect binary tree, leaf nodes have a degree of $0$, while all other nodes have a degree of $2$. If the tree height is $h$, the total number of nodes is $2^{h+1} - 1$, following a standard exponential pattern that mirrors the common phenomenon of cell division in nature.

<div class="note">

Please note that in the Chinese community, a perfect binary tree is often referred to as a <u>full binary tree</u>.

</div>

![Perfect binary tree](/images/hello-algo/chapter_tree--perfect_binary_tree.png)

### Complete Binary Tree

As shown in the figure below, a <u>complete binary tree</u> only allows the bottom level to be incompletely filled, and the nodes at the bottom level must be filled continuously from left to right. Note that a perfect binary tree is also a complete binary tree.

![Complete binary tree](/images/hello-algo/chapter_tree--complete_binary_tree.png)

### Full Binary Tree

As shown in the figure below, in a <u>full binary tree</u>, all nodes except leaf nodes have two child nodes.

![Full binary tree](/images/hello-algo/chapter_tree--full_binary_tree.png)

### Balanced Binary Tree

As shown in the figure below, in a <u>balanced binary tree</u>, the absolute difference between the height of the left and right subtrees of any node does not exceed 1.

![Balanced binary tree](/images/hello-algo/chapter_tree--balanced_binary_tree.png)

## Degeneration of Binary Trees

The figure below contrasts the ideal and degenerate structures of binary trees. When every level is filled, the tree becomes a "perfect binary tree"; when all nodes skew to one side, the binary tree degenerates into a "linked list".

- A perfect binary tree is the ideal case, fully leveraging the divide-and-conquer advantages of binary trees.
- A linked list represents the other extreme, where all operations become linear operations with time complexity degrading to $O(n)$.

![The Best and Worst Structures of Binary Trees](/images/hello-algo/chapter_tree--binary_tree_best_worst_cases.png)

As shown in the table below, in the best and worst structures, the binary tree achieves either maximum or minimum values for leaf node count, total number of nodes, and height.

<p align="center"> Table <id> &nbsp; The Best and Worst Structures of Binary Trees </p>

|                                                 | Perfect binary tree | Linked list |
| ----------------------------------------------- | ------------------- | ----------- |
| Number of nodes at level $i$                    | $2^{i-1}$           | $1$         |
| Number of leaf nodes in a tree with height $h$  | $2^h$               | $1$         |
| Total number of nodes in a tree with height $h$ | $2^{h+1} - 1$       | $h + 1$     |
| Height of a tree with $n$ total nodes           | $\log_2 (n+1) - 1$  | $n - 1$     |
