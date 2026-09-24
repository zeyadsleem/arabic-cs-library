---
title: "Top-k Problem"
book: hello-algo
chapter: chapter_heap
slug: top_k
order: 53
lang: en
---
<div class="note">

Given an unordered array `nums` of length $n$, return the largest $k$ elements in the array.

</div>

For this problem, we will first introduce two relatively straightforward solutions, followed by a more efficient heap-based solution.

## Method 1: Iterative Selection

We can perform $k$ rounds of traversal as shown in the figure below, extracting the $1^{st}$, $2^{nd}$, $\dots$, $k^{th}$ largest elements in each round, with a time complexity of $O(nk)$.

This method is only suitable when $k \ll n$, because when $k$ is close to $n$, the time complexity approaches $O(n^2)$, making it very inefficient.

![Traversing to find the largest k elements](/images/hello-algo/chapter_heap--top_k_traversal.png)

<div class="note">

When $k = n$, we can obtain a complete sorted sequence, which is equivalent to the "selection sort" algorithm.

</div>

## Method 2: Sorting

As shown in the figure below, we can first sort the array `nums`, then return the rightmost $k$ elements, with a time complexity of $O(n \log n)$.

Clearly, this method does more work than necessary, because we only need to find the largest $k$ elements rather than sort the other elements.

![Sorting to find the largest k elements](/images/hello-algo/chapter_heap--top_k_sorting.png)

## Method 3: Heap

We can solve the Top-k problem more efficiently with a heap, as shown in the figure below.

1. Initialize a min heap, where the heap top element is the smallest.
2. First, insert the first $k$ elements of the array into the heap in sequence.
3. Starting from the $(k + 1)^{th}$ element, if the current element is greater than the heap top element, remove the heap top element and insert the current element into the heap.
4. After traversal is complete, the heap contains the largest $k$ elements.

Example code is as follows:

A total of $n$ rounds of heap insertions and removals are performed, with the heap's maximum length being $k$, so the time complexity is $O(n \log k)$. This method is very efficient; when $k$ is small, the time complexity approaches $O(n)$; when $k$ is large, the time complexity does not exceed $O(n \log n)$.

Additionally, this method is well suited to dynamic data streams. As new data arrives, we can continuously maintain the elements in the heap, enabling dynamic updates to the largest $k$ elements.
