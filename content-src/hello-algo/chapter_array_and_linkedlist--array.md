---
title: "Array"
book: hello-algo
chapter: chapter_array_and_linkedlist
slug: array
order: 24
lang: en
---
An <u>array</u> is a linear data structure that stores elements of the same type in contiguous memory space. The position of an element in the array is called the element's <u>index</u>. The figure below illustrates the main concepts and storage method of arrays.

![Array definition and storage method](/images/hello-algo/chapter_array_and_linkedlist--array_definition.png)

## Common Array Operations

### Initializing Arrays

We can choose between two array initialization methods based on our needs: with or without initial values. When no initial values are specified, most programming languages initialize array elements to $0$:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="array.go"
/* Initialize array */
var arr [5]int
// In Go, specifying length ([5]int) creates an array; not specifying length ([]int) creates a slice
// Since Go's arrays are designed to have their length determined at compile time, only constants can be used to specify the length
// For convenience in implementing the extend() method, slices are treated as arrays below
nums := []int{1, 3, 2, 5, 4}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="array.ts"
/* Initialize array */
let arr: number[] = new Array(5).fill(0);
let nums: number[] = [1, 3, 2, 5, 4];
```

</div>

### Accessing Elements

Array elements are stored in contiguous memory space, which means calculating the memory address of array elements is very easy. Given the array's memory address (the memory address of the first element) and an element's index, we can use the formula shown in the figure below to calculate the element's memory address and directly access that element.

![Memory address calculation for array elements](/images/hello-algo/chapter_array_and_linkedlist--array_memory_location_calculation.png)

Observing the figure above, we find that the first element of an array has an index of $0$, which may seem counterintuitive since counting from $1$ would be more natural. However, from the perspective of the address calculation formula, **an index is essentially an offset from the memory address**. The address offset of the first element is $0$, so it is reasonable for its index to be $0$.

Accessing elements in an array is highly efficient; we can randomly access any element in the array in $O(1)$ time.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Random access to element */
func randomAccess(nums []int) (randomNum int) {
	// Randomly select a number in the interval [0, nums.length)
	randomIndex := rand.Intn(len(nums))
	// Retrieve and return the random element
	randomNum = nums[randomIndex]
	return
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Random access to element */
function randomAccess(nums: number[]): number {
    // Randomly select a number in the interval [0, nums.length)
    const random_index = Math.floor(Math.random() * nums.length);
    // Retrieve and return the random element
    const random_num = nums[random_index];
    return random_num;
}
```

</div>

### Inserting Elements

Array elements are packed tightly together in memory, with no extra space between them for additional data. As shown in the figure below, if we want to insert an element in the middle of an array, we need to shift all subsequent elements one position to the right and then assign the value at that index.

![Example of inserting an element into an array](/images/hello-algo/chapter_array_and_linkedlist--array_insert_element.png)

It is worth noting that since the length of an array is fixed, inserting an element will inevitably push the last element out of the array. We will leave the solution to this problem for discussion in the "List" chapter.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Insert element num at index index in the array */
func insert(nums []int, num int, index int) {
	// Move all elements at and after index index backward by one position
	for i := len(nums) - 1; i > index; i-- {
		nums[i] = nums[i-1]
	}
	// Assign num to the element at index index
	nums[index] = num
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Insert element num at index index in the array */
function insert(nums: number[], num: number, index: number): void {
    // Move all elements at and after index index backward by one position
    for (let i = nums.length - 1; i > index; i--) {
        nums[i] = nums[i - 1];
    }
    // Assign num to the element at index index
    nums[index] = num;
}
```

</div>

### Removing Elements

Similarly, as shown in the figure below, to delete the element at index $i$, we need to shift all elements after index $i$ forward by one position.

![Example of removing an element from an array](/images/hello-algo/chapter_array_and_linkedlist--array_remove_element.png)

Note that after the deletion is complete, the original last element is no longer meaningful, so we do not need to modify it explicitly.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Remove the element at index index */
func remove(nums []int, index int) {
	// Move all elements after index index forward by one position
	for i := index; i < len(nums)-1; i++ {
		nums[i] = nums[i+1]
	}
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Remove the element at index index */
function remove(nums: number[], index: number): void {
    // Move all elements after index index forward by one position
    for (let i = index; i < nums.length - 1; i++) {
        nums[i] = nums[i + 1];
    }
}
```

</div>

Overall, array insertion and deletion operations have the following drawbacks:

- **High time complexity**: The average time complexity for both insertion and deletion in arrays is $O(n)$, where $n$ is the length of the array.
- **Loss of elements**: Since the length of an array is immutable, after inserting an element, elements that exceed the array's length will be lost.
- **Memory waste**: We can initialize a relatively long array and use only the front portion, so that any overwritten tail elements are merely unused placeholders, but this wastes some memory space.

### Traversing Arrays

In most programming languages, we can traverse an array either by index or by directly iterating through each element in the array:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Traverse array */
func traverse(nums []int) {
	count := 0
	// Traverse array by index
	for i := 0; i < len(nums); i++ {
		count += nums[i]
	}
	count = 0
	// Direct traversal of array elements
	for _, num := range nums {
		count += num
	}
	// Traverse simultaneously data index and elements
	for i, num := range nums {
		count += nums[i]
		count += num
	}
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Traverse array */
function traverse(nums: number[]): void {
    let count = 0;
    // Traverse array by index
    for (let i = 0; i < nums.length; i++) {
        count += nums[i];
    }
    // Direct traversal of array elements
    for (const num of nums) {
        count += num;
    }
}
```

</div>

### Finding Elements

Finding a specified element in an array requires traversing the array and checking whether the element value matches in each iteration; if it matches, output the corresponding index.

Since an array is a linear data structure, the above search operation is called a "linear search".

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Find the specified element in the array */
func find(nums []int, target int) (index int) {
	index = -1
	for i := 0; i < len(nums); i++ {
		if nums[i] == target {
			index = i
			break
		}
	}
	return
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Find the specified element in the array */
function find(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }
    return -1;
}
```

</div>

### Expanding Arrays

In complex system environments, programs cannot guarantee that the memory space after an array is available, making it unsafe to expand the array's capacity. Therefore, in most programming languages, **the length of an array is immutable**.

If we want to expand an array, we need to create a new, larger array and then copy the original array elements to the new array one by one. This is an $O(n)$ operation, which is very time-consuming when the array is large. The code is shown below:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Extend array length */
func extend(nums []int, enlarge int) []int {
	// Initialize an array with extended length
	res := make([]int, len(nums)+enlarge)
	// Copy all elements from the original array to the new array
	for i, num := range nums {
		res[i] = num
	}
	// Return the extended new array
	return res
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Extend array length */
// Note: TypeScript's Array is dynamic array, can be directly expanded
// For learning purposes, this function treats Array as fixed-length array
function extend(nums: number[], enlarge: number): number[] {
    // Initialize an array with extended length
    const res = new Array(nums.length + enlarge).fill(0);
    // Copy all elements from the original array to the new array
    for (let i = 0; i < nums.length; i++) {
        res[i] = nums[i];
    }
    // Return the extended new array
    return res;
}
```

</div>

## Advantages and Limitations of Arrays

Arrays are stored in contiguous memory space with elements of the same type. This approach contains rich prior information that the system can use to optimize the efficiency of data structure operations.

- **High space efficiency**: Arrays allocate contiguous memory blocks for data without additional structural overhead.
- **Support for random access**: Arrays allow accessing any element in $O(1)$ time.
- **Cache locality**: When accessing array elements, the computer not only loads the element but also caches the surrounding data, thereby leveraging the cache to improve the execution speed of subsequent operations.

Contiguous space storage is a double-edged sword with the following limitations:

- **Low insertion and deletion efficiency**: When an array has many elements, insertion and deletion operations require shifting a large number of elements.
- **Immutable length**: After an array is initialized, its length is fixed. Expanding the array requires copying all data to a new array, which is very costly.
- **Space waste**: If the allocated size of an array exceeds what is actually needed, the extra space is wasted.

## Typical Applications of Arrays

Arrays are a fundamental and common data structure, frequently used in various algorithms and for implementing various complex data structures.

- **Random access**: If we want to randomly sample some items, we can use an array to store them and generate a random sequence to implement random sampling based on indices.
- **Sorting and searching**: Arrays are the most commonly used data structure for sorting and searching algorithms. Quick sort, merge sort, binary search, and others are primarily performed on arrays.
- **Lookup tables**: When we need to quickly find an element or its corresponding relationship, we can use an array as a lookup table. For example, if we want to implement a mapping from characters to ASCII codes, we can use the ASCII code value of a character as an index, with the corresponding element stored at that position in the array.
- **Machine learning**: Neural networks make extensive use of linear algebra operations between vectors, matrices, and tensors, all of which are constructed in the form of arrays. Arrays are the most commonly used data structure in neural network programming.
- **Data structure implementation**: Arrays can be used to implement stacks, queues, hash tables, heaps, graphs, and other data structures. For example, the adjacency matrix representation of a graph is essentially a two-dimensional array.
