---
title: "Hash Optimization Strategy"
book: hello-algo
chapter: chapter_searching
slug: replace_linear_by_hashing
order: 66
lang: en
---
In algorithm problems, **we often reduce the time complexity of algorithms by replacing linear search with hash-based search**. Let's use an algorithm problem to deepen our understanding.

<div class="note">

Given an integer array `nums` and a target value `target`, find two elements in the array whose sum is `target`, and return their indices. Any solution will do.

</div>

## Linear Search: Trading Time for Space

Consider directly traversing all possible combinations. As shown in the figure below, we use nested loops and check in each iteration whether the sum of two integers is `target`. If so, return their indices.

![Linear search solution for two sum](/images/hello-algo/chapter_searching--two_sum_brute_force.png)

The code is shown below:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Method 1: Brute force enumeration */
func twoSumBruteForce(nums []int, target int) []int {
	size := len(nums)
	// Two nested loops, time complexity is O(n^2)
	for i := 0; i < size-1; i++ {
		for j := i + 1; j < size; j++ {
			if nums[i]+nums[j] == target {
				return []int{i, j}
			}
		}
	}
	return nil
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Method 1: Brute force enumeration */
function twoSumBruteForce(nums: number[], target: number): number[] {
    const n = nums.length;
    // Two nested loops, time complexity is O(n^2)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}
```

</div>

This method has a time complexity of $O(n^2)$ and a space complexity of $O(1)$, making it very time-consuming on large inputs.

## Hash-Based Search: Trading Space for Time

Consider using a hash table whose keys are array elements and whose values are their indices. Traverse the array and perform the steps shown in the figure below in each iteration:

1. Check if the number `target - nums[i]` is in the hash table. If so, directly return the indices of these two elements.
2. Add the key-value pair `nums[i]` and index `i` to the hash table.

The implementation is shown below and requires only a single loop:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Method 2: Auxiliary hash table */
func twoSumHashTable(nums []int, target int) []int {
	// Auxiliary hash table, space complexity is O(n)
	hashTable := map[int]int{}
	// Single loop, time complexity is O(n)
	for idx, val := range nums {
		if preIdx, ok := hashTable[target-val]; ok {
			return []int{preIdx, idx}
		}
		hashTable[val] = idx
	}
	return nil
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Method 2: Auxiliary hash table */
function twoSumHashTable(nums: number[], target: number): number[] {
    // Auxiliary hash table, space complexity is O(n)
    let m: Map<number, number> = new Map();
    // Single loop, time complexity is O(n)
    for (let i = 0; i < nums.length; i++) {
        let index = m.get(target - nums[i]);
        if (index !== undefined) {
            return [index, i];
        } else {
            m.set(nums[i], i);
        }
    }
    return [];
}
```

</div>

This method reduces the time complexity from $O(n^2)$ to $O(n)$ through hash-based search, greatly improving runtime efficiency.

Since an additional hash table needs to be maintained, the space complexity is $O(n)$. **Nevertheless, this method offers a more balanced overall time-space trade-off, making it the optimal solution to this problem**.
