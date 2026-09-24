---
title: "Binary Search Tree"
book: hello-algo
chapter: chapter_tree
slug: binary_search_tree
order: 46
lang: en
---
As shown in the figure below, a <u>binary search tree</u> satisfies the following conditions.

1. For the root node, the value of all nodes in the left subtree $<$ the value of the root node $<$ the value of all nodes in the right subtree.
2. The left and right subtrees of any node are also binary search trees, i.e., they satisfy condition `1.` as well.

![Binary search tree](/images/hello-algo/chapter_tree--binary_search_tree.png)

## Operations on a Binary Search Tree

We encapsulate the binary search tree as a class `BinarySearchTree` and declare a member variable `root` pointing to the tree's root node.

### Searching for a Node

Given a target node value `num`, we can search according to the properties of the binary search tree. As shown in the figure below, we declare a node `cur` and start from the binary search tree's root node `root`, looping to compare `cur.val` with `num`.

- If `cur.val < num`, it means the target node is in `cur`'s right subtree, thus execute `cur = cur.right`.
- If `cur.val > num`, it means the target node is in `cur`'s left subtree, thus execute `cur = cur.left`.
- If `cur.val = num`, it means the target node is found, exit the loop, and return the node.

The search operation in a binary search tree follows the same principle as binary search: each round rules out half of the remaining cases. The number of loop iterations is at most the height of the tree. When the tree is balanced, the search takes $O(\log n)$ time. The example code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Search node */
func (bst *binarySearchTree) search(num int) *TreeNode {
	node := bst.root
	// Loop search, exit after passing leaf node
	for node != nil {
		if node.Val.(int) < num {
			// Target node is in cur's right subtree
			node = node.Right
		} else if node.Val.(int) > num {
			// Target node is in cur's left subtree
			node = node.Left
		} else {
			// Found target node, exit loop
			break
		}
	}
	// Return target node
	return node
}
```

</div>

### Inserting a Node

Given an element `num` to be inserted, in order to maintain the property of the binary search tree "left subtree < root node < right subtree," the insertion process is as shown in the figure below.

1. **Finding the insertion position**: Similar to the search operation, start from the root node and loop downward searching according to the size relationship between the current node value and `num`, until passing the leaf node (traversing to `None`) and then exit the loop.
2. **Insert the node at that position**: Create a node for `num` and place it at the `None` position.

![Inserting a node into a binary search tree](/images/hello-algo/chapter_tree--bst_insert.png)

In the code implementation, note the following two points:

- Binary search trees do not allow duplicate nodes; otherwise, the tree would no longer satisfy its definition. Therefore, if the node to be inserted already exists in the tree, the insertion is skipped and the function returns directly.
- To implement the node insertion, we need to use node `pre` to save the node from the previous loop iteration. This way, when traversing to `None`, we can obtain its parent node, thereby completing the node insertion operation.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Insert node */
func (bst *binarySearchTree) insert(num int) {
	cur := bst.root
	// If tree is empty, initialize root node
	if cur == nil {
		bst.root = NewTreeNode(num)
		return
	}
	// Node position before the node to be inserted
	var pre *TreeNode = nil
	// Loop search, exit after passing leaf node
	for cur != nil {
		if cur.Val == num {
			return
		}
		pre = cur
		if cur.Val.(int) < num {
			cur = cur.Right
		} else {
			cur = cur.Left
		}
	}
	// Insert node
	node := NewTreeNode(num)
	if pre.Val.(int) < num {
		pre.Right = node
	} else {
		pre.Left = node
	}
}
```

</div>

Similar to searching for a node, inserting a node uses $O(\log n)$ time.

### Removing a Node

First, find the target node in the binary search tree, then remove it. Similar to node insertion, we need to ensure that after the removal operation is completed, the binary search tree's property of "left subtree $<$ root node $<$ right subtree" is still maintained. Therefore, depending on the number of child nodes the target node has, we consider three cases: degree $0$, degree $1$, and degree $2$, and perform the corresponding removal operation.

As shown in the figure below, when the degree of the node to be removed is $0$, it means the node is a leaf node and can be directly removed.

![Removing a node in a binary search tree (degree 0)](/images/hello-algo/chapter_tree--bst_remove_case1.png)

As shown in the figure below, when the degree of the node to be removed is $1$, replacing the node to be removed with its child node is sufficient.

![Removing a node in a binary search tree (degree 1)](/images/hello-algo/chapter_tree--bst_remove_case2.png)

When the degree of the node to be removed is $2$, we cannot directly remove it; instead, we need to use a node to replace it. To maintain the binary search tree's property of "left subtree $<$ root node $<$ right subtree," **this node can be either the smallest node in the right subtree or the largest node in the left subtree**.

Assuming we choose the smallest node in the right subtree, that is, the inorder successor, the removal process is as shown in the figure below.

1. Find the next node of the node to be removed in the "inorder traversal sequence," denoted as `tmp`.
2. Replace the value of the node to be removed with the value of `tmp`, and recursively remove node `tmp` in the tree.

The node removal operation also uses $O(\log n)$ time, where finding the node to be removed requires $O(\log n)$ time, and obtaining the inorder successor node requires $O(\log n)$ time. Example code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Remove node */
func (bst *binarySearchTree) remove(num int) {
	cur := bst.root
	// If tree is empty, return directly
	if cur == nil {
		return
	}
	// Node position before the node to be removed
	var pre *TreeNode = nil
	// Loop search, exit after passing leaf node
	for cur != nil {
		if cur.Val == num {
			break
		}
		pre = cur
		if cur.Val.(int) < num {
			// Node to be removed is in right subtree
			cur = cur.Right
		} else {
			// Node to be removed is in left subtree
			cur = cur.Left
		}
	}
	// If no node to delete, return directly
	if cur == nil {
		return
	}
	// Number of child nodes is 0 or 1
	if cur.Left == nil || cur.Right == nil {
		var child *TreeNode = nil
		// Get child node of node to be removed
		if cur.Left != nil {
			child = cur.Left
		} else {
			child = cur.Right
		}
		// Delete node cur
		if cur != bst.root {
			if pre.Left == cur {
				pre.Left = child
			} else {
				pre.Right = child
			}
		} else {
			// If deleted node is root node, reassign root node
			bst.root = child
		}
		// Number of child nodes is 2
	} else {
		// Get next node of node cur to be removed in in-order traversal
		tmp := cur.Right
		for tmp.Left != nil {
			tmp = tmp.Left
		}
		// Recursively delete node tmp
		bst.remove(tmp.Val.(int))
		// Replace cur with tmp
		cur.Val = tmp.Val
	}
}
```

</div>

### Inorder Traversal Is Ordered

As shown in the figure below, the inorder traversal of a binary tree follows the "left $\rightarrow$ root $\rightarrow$ right" traversal order, while the binary search tree satisfies the "left child node $<$ root node $<$ right child node" size relationship.

This means that when performing an inorder traversal in a binary search tree, the next smallest node is always traversed first, thus yielding an important property: **The inorder traversal sequence of a binary search tree is ascending**.

Using the property of inorder traversal being ascending, we can obtain ordered data in a binary search tree in only $O(n)$ time, without the need for additional sorting operations, which is very efficient.

![Inorder traversal sequence of a binary search tree](/images/hello-algo/chapter_tree--bst_inorder_traversal.png)

## Efficiency of Binary Search Trees

Given a set of data, we consider using an array or a binary search tree for storage. Observing the table below, all operations in a binary search tree have logarithmic time complexity, providing stable and efficient performance. Arrays are more efficient than binary search trees only in scenarios with high-frequency additions and low-frequency searches and deletions.

<p align="center"> Table <id> &nbsp; Efficiency comparison between arrays and search trees </p>

|                | Unsorted array | Binary search tree |
| -------------- | -------------- | ------------------ |
| Search element | $O(n)$         | $O(\log n)$        |
| Insert element | $O(1)$         | $O(\log n)$        |
| Remove element | $O(n)$         | $O(\log n)$        |

In the ideal case, a binary search tree is balanced, so any node can be found within $O(\log n)$ loop iterations.

However, if we continuously insert and remove nodes in a binary search tree, it may degenerate into a linked list as shown in the figure below, where the time complexity of various operations also degrades to $O(n)$.

![Degradation of a binary search tree](/images/hello-algo/chapter_tree--bst_degradation.png)

## Common Applications of Binary Search Trees

- Used as multi-level indexes in systems to implement efficient search, insertion, and removal operations.
- Serves as the underlying data structure for certain search algorithms.
- Used to store data streams to maintain their ordered state.
