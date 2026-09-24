---
title: "AVL Tree *"
book: hello-algo
chapter: chapter_tree
slug: avl_tree
order: 47
lang: en
---
In the "Binary Search Tree" section, we mentioned that after multiple insertion and removal operations, a binary search tree may degenerate into a linked list. In this case, the time complexity of all operations degrades from $O(\log n)$ to $O(n)$.

As shown in the figure below, after two node removal operations, this binary search tree will degrade into a linked list.

![Degradation of an AVL tree after removing nodes](/images/hello-algo/chapter_tree--avltree_degradation_from_removing_node.png)

For example, in the perfect binary tree shown in the figure below, after inserting two nodes, the tree will lean heavily to the left, and the time complexity of search operations will also degrade.

![Degradation of an AVL tree after inserting nodes](/images/hello-algo/chapter_tree--avltree_degradation_from_inserting_node.png)

In 1962, G. M. Adelson-Velsky and E. M. Landis proposed the <u>AVL tree</u> in their paper "An algorithm for the organization of information". The paper describes a series of operations that prevent an AVL tree from degenerating as nodes are inserted and removed, thereby keeping the time complexity of various operations at $O(\log n)$. In other words, in scenarios that require frequent insertion, deletion, lookup, and update operations, AVL trees can maintain consistently efficient performance and therefore have strong practical value.

## Common Terminology in AVL Trees

An AVL tree is both a binary search tree and a balanced binary tree, simultaneously satisfying all the properties of these two types of binary trees, hence it is a <u>balanced binary search tree</u>.

### Node Height

Since the operations related to AVL trees require obtaining node heights, we need to add a `height` variable to the node class:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title=""
/* AVL tree node */
type TreeNode struct {
    Val    int       // Node value
    Height int       // Node height
    Left   *TreeNode // Left child reference
    Right  *TreeNode // Right child reference
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title=""
/* AVL tree node */
class TreeNode {
    val: number;            // Node value
    height: number;         // Node height
    left: TreeNode | null;  // Left child pointer
    right: TreeNode | null; // Right child pointer
    constructor(val?: number, height?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.height = height === undefined ? 0 : height;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
```

</div>

The "node height" refers to the distance from that node to its farthest leaf node, i.e., the number of edges on the path. It is important to note that the height of a leaf node is $0$, and the height of a null node is $-1$. We will create two utility functions for getting and updating the height of a node:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Update node height */
func (t *aVLTree) updateHeight(node *TreeNode) {
	lh := t.height(node.Left)
	rh := t.height(node.Right)
	// Node height equals the height of the tallest subtree + 1
	if lh > rh {
		node.Height = lh + 1
	} else {
		node.Height = rh + 1
	}
}
```

</div>

### Node Balance Factor

The <u>balance factor</u> of a node is defined as the height of the node's left subtree minus the height of its right subtree, and the balance factor of a null node is defined as $0$. We also encapsulate the function to obtain the node's balance factor for convenient subsequent use:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Get balance factor */
func (t *aVLTree) balanceFactor(node *TreeNode) int {
	// Empty node balance factor is 0
	if node == nil {
		return 0
	}
	// Node balance factor = left subtree height - right subtree height
	return t.height(node.Left) - t.height(node.Right)
}
```

</div>

<div class="note">

Let the balance factor be $f$, then the balance factor of any node in an AVL tree satisfies $-1 \le f \le 1$.

</div>

## Rotations in AVL Trees

The characteristic of AVL trees lies in the "rotation" operation, which can restore balance to unbalanced nodes without affecting the inorder traversal sequence of the binary tree. In other words, **rotation operations can both maintain the property of a "binary search tree" and make the tree return to a "balanced binary tree"**.

We call nodes with a balance factor absolute value $> 1$ "unbalanced nodes". Depending on the imbalance situation, rotation operations are divided into four types: right rotation, left rotation, right rotation then left rotation, and left rotation then right rotation. Below we describe these rotation operations in detail.

### Right Rotation

As shown in the figure below, the value below the node is the balance factor. From bottom to top, the first unbalanced node in the binary tree is "node 3". We focus on the subtree with this unbalanced node as the root, denoting the node as `node` and its left child as `child`, and perform a "right rotation" operation. After the right rotation is completed, the subtree regains balance and still maintains the properties of a binary search tree.

As shown in the figure below, when the `child` node has a right child (denoted as `grand_child`), a step needs to be added in the right rotation: set `grand_child` as the left child of `node`.

![Right rotation with grand_child](/images/hello-algo/chapter_tree--avltree_right_rotate_with_grandchild.png)

"Right rotation" is a figurative term; in practice, it is achieved by modifying node pointers, as shown in the following code:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Right rotation operation */
func (t *aVLTree) rightRotate(node *TreeNode) *TreeNode {
	child := node.Left
	grandChild := child.Right
	// Using child as pivot, rotate node to the right
	child.Right = node
	node.Left = grandChild
	// Update node height
	t.updateHeight(node)
	t.updateHeight(child)
	// Return root node of subtree after rotation
	return child
}
```

</div>

### Left Rotation

Correspondingly, if considering the "mirror" of the above unbalanced binary tree, the "left rotation" operation shown in the figure below needs to be performed.

![Left rotation operation](/images/hello-algo/chapter_tree--avltree_left_rotate.png)

Similarly, as shown in the figure below, when the `child` node has a left child (denoted as `grand_child`), a step needs to be added in the left rotation: set `grand_child` as the right child of `node`.

![Left rotation with grand_child](/images/hello-algo/chapter_tree--avltree_left_rotate_with_grandchild.png)

It can be observed that **right rotation and left rotation operations are mirror symmetric in logic, and the two imbalance cases they solve are also symmetric**. Based on symmetry, we only need to replace all `left` in the right rotation implementation code with `right`, and all `right` with `left`, to obtain the left rotation implementation code:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Left rotation operation */
func (t *aVLTree) leftRotate(node *TreeNode) *TreeNode {
	child := node.Right
	grandChild := child.Left
	// Using child as pivot, rotate node to the left
	child.Left = node
	node.Right = grandChild
	// Update node height
	t.updateHeight(node)
	t.updateHeight(child)
	// Return root node of subtree after rotation
	return child
}
```

</div>

### Left Rotation Then Right Rotation

For the unbalanced node 3 in the figure below, using either left rotation or right rotation alone cannot restore the subtree to balance. In this case, a "left rotation" needs to be performed on `child` first, followed by a "right rotation" on `node`.

![Left-right rotation](/images/hello-algo/chapter_tree--avltree_left_right_rotate.png)

### Right Rotation Then Left Rotation

As shown in the figure below, for the mirror case of the above unbalanced binary tree, a "right rotation" needs to be performed on `child` first, then a "left rotation" on `node`.

![Right-left rotation](/images/hello-algo/chapter_tree--avltree_right_left_rotate.png)

### Choice of Rotation

The four imbalances shown in the figure below correspond one-to-one with the above cases, requiring right rotation, left rotation then right rotation, right rotation then left rotation, and left rotation operations respectively.

![The four rotation cases of AVL tree](/images/hello-algo/chapter_tree--avltree_rotation_cases.png)

As shown in the table below, we determine which case the unbalanced node belongs to by judging the signs of the balance factor of the unbalanced node and the balance factor of its taller-side child node.

<p align="center"> Table <id> &nbsp; Conditions for Choosing Among the Four Rotation Cases </p>

| Balance factor of the unbalanced node | Balance factor of the child node | Rotation method to apply          |
| -------------------------------------- | --------------------------------- | --------------------------------- |
| $> 1$ (left-leaning tree)              | $\geq 0$                          | Right rotation                    |
| $> 1$ (left-leaning tree)              | $<0$                              | Left rotation then right rotation |
| $< -1$ (right-leaning tree)            | $\leq 0$                          | Left rotation                     |
| $< -1$ (right-leaning tree)            | $>0$                              | Right rotation then left rotation |

For ease of use, we encapsulate the rotation operations into a function. **With this function, we can perform rotations for various imbalance situations, restoring balance to unbalanced nodes**. The code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Perform rotation operation to restore balance to this subtree */
func (t *aVLTree) rotate(node *TreeNode) *TreeNode {
	// Get balance factor of node
	// Go recommends short variables, here bf refers to t.balanceFactor
	bf := t.balanceFactor(node)
	// Left-leaning tree
	if bf > 1 {
		if t.balanceFactor(node.Left) >= 0 {
			// Right rotation
			return t.rightRotate(node)
		} else {
			// First left rotation then right rotation
			node.Left = t.leftRotate(node.Left)
			return t.rightRotate(node)
		}
	}
	// Right-leaning tree
	if bf < -1 {
		if t.balanceFactor(node.Right) <= 0 {
			// Left rotation
			return t.leftRotate(node)
		} else {
			// First right rotation then left rotation
			node.Right = t.rightRotate(node.Right)
			return t.leftRotate(node)
		}
	}
	// Balanced tree, no rotation needed, return directly
	return node
}
```

</div>

## Common Operations in AVL Trees

### Node Insertion

The node insertion operation in AVL trees is similar in principle to that in binary search trees. The only difference is that after inserting a node in an AVL tree, a series of unbalanced nodes may appear on the path from that node to the root. Therefore, **we need to start from this node and perform rotation operations from bottom to top, restoring balance to all unbalanced nodes**. The code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Recursively insert node (helper function) */
func (t *aVLTree) insertHelper(node *TreeNode, val int) *TreeNode {
	if node == nil {
		return NewTreeNode(val)
	}
	/* 1. Find insertion position and insert node */
	if val < node.Val.(int) {
		node.Left = t.insertHelper(node.Left, val)
	} else if val > node.Val.(int) {
		node.Right = t.insertHelper(node.Right, val)
	} else {
		// Duplicate node not inserted, return directly
		return node
	}
	// Update node height
	t.updateHeight(node)
	/* 2. Perform rotation operation to restore balance to this subtree */
	node = t.rotate(node)
	// Return root node of subtree
	return node
}
```

</div>

### Node Removal

Similarly, on the basis of the binary search tree's node removal method, rotation operations need to be performed from bottom to top to restore balance to all unbalanced nodes. The code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Recursively remove node (helper function) */
func (t *aVLTree) removeHelper(node *TreeNode, val int) *TreeNode {
	if node == nil {
		return nil
	}
	/* 1. Find node and delete */
	if val < node.Val.(int) {
		node.Left = t.removeHelper(node.Left, val)
	} else if val > node.Val.(int) {
		node.Right = t.removeHelper(node.Right, val)
	} else {
		if node.Left == nil || node.Right == nil {
			child := node.Left
			if node.Right != nil {
				child = node.Right
			}
			if child == nil {
				// Number of child nodes = 0, delete node directly and return
				return nil
			} else {
				// Number of child nodes = 1, delete node directly
				node = child
			}
		} else {
			// Number of child nodes = 2, delete the next node in inorder traversal and replace current node with it
			temp := node.Right
			for temp.Left != nil {
				temp = temp.Left
			}
			node.Right = t.removeHelper(node.Right, temp.Val.(int))
			node.Val = temp.Val
		}
	}
	// Update node height
	t.updateHeight(node)
	/* 2. Perform rotation operation to restore balance to this subtree */
	node = t.rotate(node)
	// Return root node of subtree
	return node
}
```

</div>

### Node Search

The node search operation in AVL trees is consistent with that in binary search trees, and will not be elaborated here.

## Typical Applications of AVL Trees

- Organizing and storing large-scale data, suitable for scenarios with high-frequency searches and low-frequency insertions and deletions.
- Used to build index systems in databases.
- Red-black trees are also a common type of balanced binary search tree. Compared to AVL trees, red-black trees have more relaxed balance conditions, require fewer rotation operations for node insertion and deletion, and have higher average efficiency for node addition and deletion operations.
