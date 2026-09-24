---
title: "Binary Search"
book: hello-algo
chapter: chapter_searching
slug: binary_search
order: 63
lang: en
---
<u>Binary search</u> is an efficient search algorithm based on the divide-and-conquer strategy. It leverages the sorted order of the data to reduce the search range by half in each round until the target element is found or the search interval becomes empty.

<div class="note">

Given an array `nums` of length $n$ with elements arranged in ascending order and no duplicates, search for and return the index of element `target` in the array. If the array does not contain the element, return $-1$. An example is shown in the figure below.

</div>

![Binary search example data](/images/hello-algo/chapter_searching--binary_search_example.png)

As shown in the figure below, we first initialize pointers $i = 0$ and $j = n - 1$, pointing to the first and last elements of the array respectively, representing the search interval $[0, n - 1]$. Note that square brackets denote a closed interval, which includes the boundary values themselves.

Next, perform the following two steps in a loop:

1. Calculate the midpoint index $m = \lfloor {(i + j) / 2} \rfloor$, where $\lfloor \: \rfloor$ denotes the floor operation.
2. Compare `nums[m]` and `target`, which results in three cases:
    1. When `nums[m] < target`, it indicates that `target` is in the interval $[m + 1, j]$, so execute $i = m + 1$.
    2. When `nums[m] > target`, it indicates that `target` is in the interval $[i, m - 1]$, so execute $j = m - 1$.
    3. When `nums[m] = target`, it indicates that `target` has been found, so return index $m$.

If the array does not contain the target element, the search interval will eventually become empty. In this case, return $-1$.

It's worth noting that since both $i$ and $j$ are of `int` type, **$i + j$ may exceed the range of the `int` type**. To avoid integer overflow, we typically use the formula $m = \lfloor {i + (j - i) / 2} \rfloor$ to calculate the midpoint.

The code is shown below:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Binary search (closed interval on both sides) */
func binarySearch(nums []int, target int) int {
	// Initialize closed interval [0, n-1], i.e., i, j point to the first and last elements of the array
	i, j := 0, len(nums)-1
	// Loop, exit when the search interval is empty (empty when i > j)
	for i <= j {
		m := i + (j-i)/2      // Calculate the midpoint index m
		if nums[m] < target { // This means target is in the interval [m+1, j]
			i = m + 1
		} else if nums[m] > target { // This means target is in the interval [i, m-1]
			j = m - 1
		} else { // Found the target element, return its index
			return m
		}
	}
	// Target element not found, return -1
	return -1
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Binary search (closed interval on both sides) */
function binarySearch(nums: number[], target: number): number {
    // Initialize closed interval [0, n-1], i.e., i, j point to the first and last elements of the array
    let i = 0,
        j = nums.length - 1;
    // Loop, exit when the search interval is empty (empty when i > j)
    while (i <= j) {
        // Calculate the midpoint index m
        const m = Math.floor(i + (j - i) / 2);
        if (nums[m] < target) {
            // This means target is in the interval [m+1, j]
            i = m + 1;
        } else if (nums[m] > target) {
            // This means target is in the interval [i, m-1]
            j = m - 1;
        } else {
            // Found the target element, return its index
            return m;
        }
    }
    return -1; // Target element not found, return -1
}
```

</div>

**Time complexity is $O(\log n)$**: In the binary search loop, the interval is reduced by half each round, so the number of iterations is $\log_2 n$.

**Space complexity is $O(1)$**: Pointers $i$ and $j$ use constant-size space.

## Interval Representation Methods

In addition to the closed interval mentioned above, another common interval representation is the "left-closed right-open" interval, defined as $[0, n)$, meaning that the left boundary is inclusive while the right boundary is exclusive. Under this representation, the interval $[i, j)$ is empty when $i = j$.

We can implement a binary search algorithm with the same functionality based on this representation:

As shown in the figure below, under the two interval representations, the initialization, loop condition, and interval narrowing operations of the binary search algorithm are all different.

Since both the left and right boundaries in the "closed interval" representation are defined as closed, the operations to narrow the interval through pointers $i$ and $j$ are also symmetric. This makes it less error-prone, **so the "closed interval" approach is generally recommended**.

![Two interval definitions](/images/hello-algo/chapter_searching--binary_search_ranges.png)

## Advantages and Limitations

Binary search offers good performance in both time and space.

- Binary search has high time efficiency. With large data volumes, the logarithmic time complexity has significant advantages. For example, when the data size $n = 2^{20}$, linear search requires $2^{20} = 1048576$ iterations, while binary search only needs $\log_2 2^{20} = 20$ iterations.
- Binary search requires no extra space. Compared to searching algorithms that require additional space (such as hash-based search), binary search is more space-efficient.

However, binary search is not suitable for all situations, mainly for the following reasons:

- Binary search is only applicable to sorted data. If the input data is unsorted, sorting specifically to use binary search would be counterproductive, as sorting algorithms typically have a time complexity of $O(n \log n)$, which is higher than both linear search and binary search. For scenarios with frequent element insertions, keeping the array sorted requires inserting elements at specific positions with a time complexity of $O(n)$, which is also very expensive.
- Binary search is only applicable to arrays. Binary search requires non-contiguous, jump-style access to elements, and this kind of access is inefficient in linked lists, making it unsuitable for linked lists or linked-list-based data structures.
- For small data volumes, linear search performs better. In linear search, each round requires only 1 comparison operation; while in binary search, it requires 1 addition, 1 division, 1-3 comparison operations, and 1 addition (subtraction), totaling 4-6 unit operations. Therefore, when the data volume $n$ is small, linear search is actually faster than binary search.
