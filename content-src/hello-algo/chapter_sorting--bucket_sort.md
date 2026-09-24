---
title: "Bucket Sort"
book: hello-algo
chapter: chapter_sorting
slug: bucket_sort
order: 78
lang: en
---
The sorting algorithms discussed earlier are all comparison-based sorting algorithms, which sort by comparing the relative order of elements. The worst-case time complexity of such algorithms has a lower bound of $\Omega(n \log n)$. Next, we will explore several non-comparison sorting algorithms, whose time complexity can be linear.

<u>Bucket sort</u> is a typical application of the divide-and-conquer strategy. It works by creating a sequence of ordered buckets, each corresponding to a data range, and distributing the data evenly among them. The elements within each bucket are then sorted separately. Finally, all buckets are merged in order.

## Algorithm Flow

Consider an array of length $n$, whose elements are floating-point numbers in the range $[0, 1)$. The flow of bucket sort is shown in the figure below.

1. Initialize $k$ buckets and distribute the $n$ elements into the $k$ buckets.
2. Sort each bucket separately (here we use the built-in sorting function of the programming language).
3. Merge the results in order from smallest to largest bucket.

![Bucket sort algorithm flow](/images/hello-algo/chapter_sorting--bucket_sort_overview.png)

The code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Bucket sort */
func bucketSort(nums []float64) {
	// Initialize k = n/2 buckets, expected to allocate 2 elements per bucket
	k := len(nums) / 2
	buckets := make([][]float64, k)
	for i := 0; i < k; i++ {
		buckets[i] = make([]float64, 0)
	}
	// 1. Distribute array elements into various buckets
	for _, num := range nums {
		// Input data range is [0, 1), use num * k to map to index range [0, k-1]
		i := int(num * float64(k))
		// Add num to bucket i
		buckets[i] = append(buckets[i], num)
	}
	// 2. Sort each bucket
	for i := 0; i < k; i++ {
		// Use built-in slice sorting function, can also be replaced with other sorting algorithms
		sort.Float64s(buckets[i])
	}
	// 3. Traverse buckets to merge results
	i := 0
	for _, bucket := range buckets {
		for _, num := range bucket {
			nums[i] = num
			i++
		}
	}
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Bucket sort */
function bucketSort(nums: number[]): void {
    // Initialize k = n/2 buckets, expected to allocate 2 elements per bucket
    const k = nums.length / 2;
    const buckets: number[][] = [];
    for (let i = 0; i < k; i++) {
        buckets.push([]);
    }
    // 1. Distribute array elements into various buckets
    for (const num of nums) {
        // Input data range is [0, 1), use num * k to map to index range [0, k-1]
        const i = Math.floor(num * k);
        // Add num to bucket i
        buckets[i].push(num);
    }
    // 2. Sort each bucket
    for (const bucket of buckets) {
        // Use built-in sorting function, can also replace with other sorting algorithms
        bucket.sort((a, b) => a - b);
    }
    // 3. Traverse buckets to merge results
    let i = 0;
    for (const bucket of buckets) {
        for (const num of bucket) {
            nums[i++] = num;
        }
    }
}
```

</div>

## Algorithm Characteristics

Bucket sort is suitable for processing very large datasets. For example, suppose the input contains 1 million elements, and limited memory prevents the system from loading all of them at once. In that case, the data can be divided into 1000 buckets, each bucket can be sorted separately, and the results can then be merged.

- **Time complexity is $O(n + k)$**: Assuming the elements are evenly distributed across the buckets, each bucket contains $\frac{n}{k}$ elements. If sorting a single bucket takes $O(\frac{n}{k} \log\frac{n}{k})$ time, then sorting all buckets takes $O(n \log\frac{n}{k})$ time. **When the number of buckets $k$ is relatively large, the time complexity approaches $O(n)$**. Merging the results requires traversing all buckets and elements, which takes $O(n + k)$ time. In the worst case, all data is placed into a single bucket, and sorting that bucket takes $O(n^2)$ time.
- **Space complexity is $O(n + k)$, and bucket sort is not in-place**: It requires extra space for $k$ buckets and a total of $n$ elements.
- Whether bucket sort is stable depends on whether the algorithm for sorting elements within buckets is stable.

## How to Achieve Even Distribution

In theory, bucket sort can achieve $O(n)$ time complexity. **The key is to distribute the elements evenly across the buckets**, because real-world data is often not uniformly distributed. For example, suppose we want to divide all products on Taobao evenly into 10 buckets by price range, but the price distribution is uneven: there are many products priced below 100 yuan and very few priced above 1000 yuan. If the price range is divided evenly into 10 intervals, the numbers of products in the buckets will differ greatly.

To achieve a more even distribution, we can first choose a rough boundary and partition the data into 3 buckets. **After that, buckets containing more products can be further divided into 3 buckets until the numbers of elements in all buckets are roughly equal**.

As shown in the figure below, this method essentially builds a recursion tree whose goal is to make the leaf nodes as balanced as possible. Of course, the data does not have to be split into 3 buckets in every round; the specific partitioning strategy can be chosen flexibly based on the characteristics of the data.

![Recursively dividing buckets](/images/hello-algo/chapter_sorting--scatter_in_buckets_recursively.png)

If we know the probability distribution of product prices in advance, **we can set the price boundaries for each bucket according to that distribution**. Notably, the data distribution does not need to be measured exactly; it can also be approximated with a probability model chosen to fit the characteristics of the data.

As shown in the figure below, we assume that product prices follow a normal distribution, which allows us to reasonably set price intervals to evenly distribute products to each bucket.

![Dividing buckets based on probability distribution](/images/hello-algo/chapter_sorting--scatter_in_buckets_distribution.png)
