---
title: "Binary Search Boundaries"
book: hello-algo
chapter: chapter_searching
slug: binary_search_edge
order: 65
lang: en
---
## Finding the Left Boundary

<div class="note">

Given a sorted array `nums` of length $n$ that may contain duplicate elements, return the index of the leftmost occurrence of `target`. If the array does not contain `target`, return $-1$.

</div>

Recall the method for finding the insertion point with binary search. After the search completes, $i$ points to the leftmost `target`, **so finding the insertion point is essentially finding the index of the leftmost `target`**.

Consider implementing the left boundary search using the insertion point finding function. Note that the array may not contain `target`, which could result in the following two cases:

- The insertion point index $i$ is out of bounds.
- The element `nums[i]` is not equal to `target`.

When either of these situations occurs, simply return $-1$. The code is shown below:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Binary search for the leftmost target */
func binarySearchLeftEdge(nums []int, target int) int {
	// Equivalent to finding the insertion point of target
	i := binarySearchInsertion(nums, target)
	// Target not found, return -1
	if i == len(nums) || nums[i] != target {
		return -1
	}
	// Found target, return index i
	return i
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Binary search for the leftmost target */
function binarySearchLeftEdge(nums: Array<number>, target: number): number {
    // Equivalent to finding the insertion point of target
    const i = binarySearchInsertion(nums, target);
    // Target not found, return -1
    if (i === nums.length || nums[i] !== target) {
        return -1;
    }
    // Found target, return index i
    return i;
}
```

</div>

## Finding the Right Boundary

So how do we find the rightmost `target`? The most direct approach is to modify the code and replace the pointer shrinking operation in the `nums[m] == target` case. The code is omitted here; interested readers can implement it themselves.

Below we introduce two more clever methods.

### Reusing Left Boundary Search

In fact, we can use the function for finding the leftmost `target` to find the rightmost `target`. The specific method is: **convert finding the rightmost `target` into finding the leftmost `target + 1`**.

As shown in the figure below, after the search completes, the pointer $i$ points to the leftmost `target + 1` (if it exists), while $j$ points to the rightmost `target`, **so we can return $j$**.

![Converting right boundary search to left boundary search](/images/hello-algo/chapter_searching--binary_search_right_edge_by_left_edge.png)

Note that the returned insertion point is $i$, so we need to subtract $1$ from it to obtain $j$:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Binary search for the rightmost target */
func binarySearchRightEdge(nums []int, target int) int {
	// Convert to finding the leftmost target + 1
	i := binarySearchInsertion(nums, target+1)
	// j points to the rightmost target, i points to the first element greater than target
	j := i - 1
	// Target not found, return -1
	if j == -1 || nums[j] != target {
		return -1
	}
	// Found target, return index j
	return j
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Binary search for the rightmost target */
function binarySearchRightEdge(nums: Array<number>, target: number): number {
    // Convert to finding the leftmost target + 1
    const i = binarySearchInsertion(nums, target + 1);
    // j points to the rightmost target, i points to the first element greater than target
    const j = i - 1;
    // Target not found, return -1
    if (j === -1 || nums[j] !== target) {
        return -1;
    }
    // Found target, return index j
    return j;
}
```

</div>

### Converting to Element Search

We know that when the array does not contain `target`, $i$ and $j$ will eventually point to the first element greater than `target` and the rightmost element less than `target`, respectively.

Therefore, as shown in the figure below, we can construct an element that does not exist in the array to find the left and right boundaries.

- Finding the leftmost `target`: This can be converted to finding `target - 0.5` and returning the pointer $i$.
- Finding the rightmost `target`: This can be converted to finding `target + 0.5` and returning the pointer $j$.

![Converting boundary search to element search](/images/hello-algo/chapter_searching--binary_search_edge_by_element.png)

The code is omitted here, but the following two points are worth noting:

- Since the given array does not contain decimal values, we do not need to worry about how to handle equality.
- Because this method introduces decimals, the variable `target` in the function needs to be changed to a floating-point type (Python does not require this change).
