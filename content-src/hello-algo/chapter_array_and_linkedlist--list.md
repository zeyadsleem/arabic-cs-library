---
title: "List"
book: hello-algo
chapter: chapter_array_and_linkedlist
slug: list
order: 26
lang: en
---
A <u>list</u> is an abstract data structure concept that represents an ordered collection of elements, supporting operations such as element access, modification, insertion, deletion, and traversal, without requiring users to consider capacity limitations. Lists can be implemented based on linked lists or arrays.

- A linked list can naturally be viewed as a list: it supports insertion, deletion, search, and update, and can grow flexibly as needed.
- An array also supports insertion, deletion, search, and update, but because its length is fixed, it can only be regarded as a list with a capacity limit.

When a list is implemented with an array, **its fixed length makes it less practical**. This is because we usually cannot determine in advance how much data we need to store, making it difficult to choose an appropriate capacity. If the capacity is too small, it may fail to meet our needs; if it is too large, memory space will be wasted.

To solve this problem, we can use a <u>dynamic array</u> to implement a list. It inherits all the advantages of arrays while supporting dynamic resizing during program execution.

In fact, **the list types provided by the standard libraries of many programming languages are implemented with dynamic arrays**, such as `list` in Python, `ArrayList` in Java, `vector` in C++, and `List` in C#. In the following discussion, we will treat "list" and "dynamic array" as equivalent concepts.

## Common List Operations

### Initialize a List

We typically initialize a list in one of two ways: empty or with predefined values:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* Initialize a list */
// Without initial values
nums1 := []int{}
// With initial values
nums := []int{1, 3, 2, 5, 4}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* Initialize a list */
// Without initial values
const nums1: number[] = [];
// With initial values
const nums: number[] = [1, 3, 2, 5, 4];
```

</div>

### Access Elements

Since a list is essentially an array, we can access and update elements in $O(1)$ time complexity, which is very efficient.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* Access an element */
num := nums[1]  // Access element at index 1

/* Update an element */
nums[1] = 0     // Update element at index 1 to 0
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* Access an element */
const num: number = nums[1];  // Access element at index 1

/* Update an element */
nums[1] = 0;  // Update element at index 1 to 0
```

</div>

### Insert and Delete Elements

Compared to arrays, lists can freely add and delete elements. Adding an element at the end of a list has a time complexity of $O(1)$, but inserting and deleting elements still have the same efficiency as arrays, with a time complexity of $O(n)$.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* Clear the list */
nums = nil

/* Add elements at the end */
nums = append(nums, 1)
nums = append(nums, 3)
nums = append(nums, 2)
nums = append(nums, 5)
nums = append(nums, 4)

/* Insert an element in the middle */
nums = append(nums[:3], append([]int{6}, nums[3:]...)...) // Insert number 6 at index 3

/* Delete an element */
nums = append(nums[:3], nums[4:]...) // Delete element at index 3
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* Clear the list */
nums.length = 0;

/* Add elements at the end */
nums.push(1);
nums.push(3);
nums.push(2);
nums.push(5);
nums.push(4);

/* Insert an element in the middle */
nums.splice(3, 0, 6); // Insert number 6 at index 3

/* Delete an element */
nums.splice(3, 1);  // Delete element at index 3
```

</div>

### Traverse a List

Like arrays, lists can be traversed by index or by directly iterating through elements.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* Traverse the list by index */
count := 0
for i := 0; i < len(nums); i++ {
    count += nums[i]
}

/* Traverse list elements directly */
count = 0
for _, num := range nums {
    count += num
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* Traverse the list by index */
let count = 0;
for (let i = 0; i < nums.length; i++) {
    count += nums[i];
}

/* Traverse list elements directly */
count = 0;
for (const num of nums) {
    count += num;
}
```

</div>

### Concatenate Lists

Given a new list `nums1`, we can concatenate it to the end of the original list.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* Concatenate two lists */
nums1 := []int{6, 8, 7, 10, 9}
nums = append(nums, nums1...)  // Concatenate list nums1 to the end of nums
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* Concatenate two lists */
const nums1: number[] = [6, 8, 7, 10, 9];
nums.push(...nums1);  // Concatenate list nums1 to the end of nums
```

</div>

### Sort a List

After sorting a list, we can use "binary search" and "two-pointer" algorithms, which are frequently tested in array algorithm problems.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* Sort a list */
sort.Ints(nums)  // After sorting, list elements are arranged from smallest to largest
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* Sort a list */
nums.sort((a, b) => a - b);  // After sorting, list elements are arranged from smallest to largest
```

</div>

## List Implementation

Many programming languages have built-in lists, such as Java, C++, and Python. Their implementations are quite complex, and the parameters are carefully considered, such as initial capacity, expansion multiples, and so on. Interested readers can consult the source code to learn more.

To deepen our understanding of how lists work, we attempt to implement a simple list with three key design considerations:

- **Initial capacity**: Select a reasonable initial capacity for the underlying array. In this example, we choose 10 as the initial capacity.
- **Size tracking**: Declare a variable `size` to record the current number of elements in the list and update it in real-time as elements are inserted and deleted. Based on this variable, we can locate the end of the list and determine whether expansion is needed.
- **Expansion mechanism**: When the list capacity is full upon inserting an element, we need to expand. We create a larger array based on the expansion multiple and then move all elements from the current array to the new array in order. In this example, we specify that the array should be expanded to 2 times its previous size each time.

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* List class */
class MyList {
    private arr: Array<number>; // Array (stores list elements)
    private _capacity: number = 10; // List capacity
    private _size: number = 0; // List length (current number of elements)
    private extendRatio: number = 2; // Multiple by which the list capacity is extended each time

    /* Constructor */
    constructor() {
        this.arr = new Array(this._capacity);
    }

    /* Get list length (current number of elements) */
    public size(): number {
        return this._size;
    }

    /* Get list capacity */
    public capacity(): number {
        return this._capacity;
    }

    /* Update element */
    public get(index: number): number {
        // If the index is out of bounds, throw an exception, as below
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        return this.arr[index];
    }

    /* Add elements at the end */
    public set(index: number, num: number): void {
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        this.arr[index] = num;
    }

    /* Direct traversal of list elements */
    public add(num: number): void {
        // If length equals capacity, need to expand
        if (this._size === this._capacity) this.extendCapacity();
        // Add new element to end of list
        this.arr[this._size] = num;
        this._size++;
    }

    /* Sort list */
    public insert(index: number, num: number): void {
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        // When the number of elements exceeds capacity, trigger the extension mechanism
        if (this._size === this._capacity) {
            this.extendCapacity();
        }
        // Move all elements after index index forward by one position
        for (let j = this._size - 1; j >= index; j--) {
            this.arr[j + 1] = this.arr[j];
        }
        // Update the number of elements
        this.arr[index] = num;
        this._size++;
    }

    /* Remove element */
    public remove(index: number): number {
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        let num = this.arr[index];
        // Move all elements after index forward by one position
        for (let j = index; j < this._size - 1; j++) {
            this.arr[j] = this.arr[j + 1];
        }
        // Update the number of elements
        this._size--;
        // Return the removed element
        return num;
    }

    /* Driver Code */
    public extendCapacity(): void {
        // Create new array of length size and copy original array to new array
        this.arr = this.arr.concat(
            new Array(this.capacity() * (this.extendRatio - 1))
        );
        // Add elements at the end
        this._capacity = this.arr.length;
    }

    /* Convert list to array */
    public toArray(): number[] {
        let size = this.size();
        // Elements enqueue
        const arr = new Array(size);
        for (let i = 0; i < size; i++) {
            arr[i] = this.get(i);
        }
        return arr;
    }
}
```

</div>
