---
title: "Binary Tree Traversal"
book: hello-algo
chapter: chapter_tree
slug: binary_tree_traversal
order: 44
lang: en
---
From a physical structure perspective, a tree is a data structure based on linked lists. Hence, its traversal method involves accessing nodes one by one through pointers. However, a tree is a non-linear data structure, which makes traversing a tree more complex than traversing a linked list, requiring the assistance of search algorithms.

The common traversal methods for binary trees include level-order traversal, pre-order traversal, in-order traversal, and post-order traversal.

## Level-Order Traversal

As shown in the figure below, <u>level-order traversal</u> traverses the binary tree from top to bottom, layer by layer. Within each level, it visits nodes from left to right.

Level-order traversal is essentially <u>breadth-first traversal</u>, also known as <u>breadth-first search (BFS)</u>, which proceeds outward level by level.

![Level-order traversal of a binary tree](/images/hello-algo/chapter_tree--binary_tree_bfs.png)

### Code Implementation

Breadth-first traversal is typically implemented with the help of a "queue". The queue follows the "first in, first out" rule, while breadth-first traversal follows the "layer-by-layer progression" rule; the underlying ideas of the two are consistent. The implementation code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Level-order traversal */
func levelOrder(root *TreeNode) []any {
	// Initialize queue, add root node
	queue := list.New()
	queue.PushBack(root)
	// Initialize a slice to save traversal sequence
	nums := make([]any, 0)
	for queue.Len() > 0 {
		// Dequeue
		node := queue.Remove(queue.Front()).(*TreeNode)
		// Save node value
		nums = append(nums, node.Val)
		if node.Left != nil {
			// Left child node enqueue
			queue.PushBack(node.Left)
		}
		if node.Right != nil {
			// Right child node enqueue
			queue.PushBack(node.Right)
		}
	}
	return nums
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Level-order traversal */
function levelOrder(root: TreeNode | null): number[] {
    // Initialize queue, add root node
    const queue = [root];
    // Initialize a list to save the traversal sequence
    const list: number[] = [];
    while (queue.length) {
        let node = queue.shift() as TreeNode; // Dequeue
        list.push(node.val); // Save node value
        if (node.left) {
            queue.push(node.left); // Left child node enqueue
        }
        if (node.right) {
            queue.push(node.right); // Right child node enqueue
        }
    }
    return list;
}
```

</div>

### Complexity Analysis

- **Time complexity is $O(n)$**: All nodes are visited once, using $O(n)$ time, where $n$ is the number of nodes.
- **Space complexity is $O(n)$**: In the worst case, i.e., a full binary tree, before traversing to the bottom level, the queue contains at most $(n + 1) / 2$ nodes simultaneously, occupying $O(n)$ space.

## Preorder, Inorder, and Postorder Traversal

Correspondingly, preorder, inorder, and postorder traversals all belong to <u>depth-first traversal</u>, also known as <u>depth-first search (DFS)</u>, which goes as deep as possible before backtracking.

The figure below shows how depth-first traversal works on a binary tree. **Depth-first traversal is like "walking" around the perimeter of the entire binary tree**, encountering three positions at each node, corresponding to preorder, inorder, and postorder traversal.

![Preorder, inorder, and postorder traversal of a binary tree](/images/hello-algo/chapter_tree--binary_tree_dfs.png)

### Code Implementation

Depth-first search is usually implemented based on recursion:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Postorder traversal */
func postOrder(node *TreeNode) {
	if node == nil {
		return
	}
	// Visit priority: left subtree -> right subtree -> root node
	postOrder(node.Left)
	postOrder(node.Right)
	nums = append(nums, node.Val)
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Postorder traversal */
function postOrder(root: TreeNode | null): void {
    if (root === null) {
        return;
    }
    // Visit priority: left subtree -> right subtree -> root node
    postOrder(root.left);
    postOrder(root.right);
    list.push(root.val);
}
```

</div>

<div class="note">

Depth-first search can also be implemented iteratively, and interested readers can explore this on their own.

</div>

The figure below shows the recursive process of preorder traversal of a binary tree, which can be divided into two opposite phases: "descending" and "returning".

1. "Descending" means making a new recursive call, during which the program visits the next node.
2. "Returning" means the function call returns, indicating that the current node has been fully processed.

### Complexity Analysis

- **Time complexity is $O(n)$**: All nodes are visited once, using $O(n)$ time.
- **Space complexity is $O(n)$**: In the worst case, i.e., the tree degenerates into a linked list, the recursion depth reaches $n$, and the system occupies $O(n)$ stack frame space.
