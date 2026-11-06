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
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Initialize a list
# Without initial values
nums1: list[int] = []
# With initial values
nums: list[int] = [1, 3, 2, 5, 4]
```

</div>

### Access Elements

Since a list is essentially an array, we can access and update elements in $O(1)$ time complexity, which is very efficient.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Access an element
num: int = nums[1]  # Access element at index 1

# Update an element
nums[1] = 0    # Update element at index 1 to 0
```

</div>

### Insert and Delete Elements

Compared to arrays, lists can freely add and delete elements. Adding an element at the end of a list has a time complexity of $O(1)$, but inserting and deleting elements still have the same efficiency as arrays, with a time complexity of $O(n)$.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Clear the list
nums.clear()

# Add elements at the end
nums.append(1)
nums.append(3)
nums.append(2)
nums.append(5)
nums.append(4)

# Insert an element in the middle
nums.insert(3, 6)  # Insert number 6 at index 3

# Delete an element
nums.pop(3)        # Delete element at index 3
```

</div>

### Traverse a List

Like arrays, lists can be traversed by index or by directly iterating through elements.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Traverse the list by index
count = 0
for i in range(len(nums)):
    count += nums[i]

# Traverse list elements directly
for num in nums:
    count += num
```

</div>

### Concatenate Lists

Given a new list `nums1`, we can concatenate it to the end of the original list.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Concatenate two lists
nums1: list[int] = [6, 8, 7, 10, 9]
nums += nums1  # Concatenate list nums1 to the end of nums
```

</div>

### Sort a List

After sorting a list, we can use "binary search" and "two-pointer" algorithms, which are frequently tested in array algorithm problems.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Sort a list
nums.sort()  # After sorting, list elements are arranged from smallest to largest
```

</div>

## List Implementation

Many programming languages have built-in lists, such as Java, C++, and Python. Their implementations are quite complex, and the parameters are carefully considered, such as initial capacity, expansion multiples, and so on. Interested readers can consult the source code to learn more.

To deepen our understanding of how lists work, we attempt to implement a simple list with three key design considerations:

- **Initial capacity**: Select a reasonable initial capacity for the underlying array. In this example, we choose 10 as the initial capacity.
- **Size tracking**: Declare a variable `size` to record the current number of elements in the list and update it in real-time as elements are inserted and deleted. Based on this variable, we can locate the end of the list and determine whether expansion is needed.
- **Expansion mechanism**: When the list capacity is full upon inserting an element, we need to expand. We create a larger array based on the expansion multiple and then move all elements from the current array to the new array in order. In this example, we specify that the array should be expanded to 2 times its previous size each time.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```py
class MyList:
    """صنف القائمة"""

    def __init__(self):
        """المنشئ"""
        self._capacity: int = 10  # سعة القائمة
        self._arr: list[int] = [0] * self._capacity  # المصفوفة (تخزن عناصر القائمة)
        self._size: int = 0  # طول القائمة (عدد العناصر الحالي)
        self._extend_ratio: int = 2  # معامل نمو سعة القائمة في كل مرة

    def size(self) -> int:
        """الحصول على طول القائمة (عدد العناصر الحالي)"""
        return self._size

    def capacity(self) -> int:
        """الحصول على سعة القائمة"""
        return self._capacity

    def get(self, index: int) -> int:
        """وصول إلى عنصر"""
        # أطلق استثناء إذا خرج الفهرس عن الحدود؛ وينطبق الأمر نفسه فيما يلي
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        return self._arr[index]

    def set(self, num: int, index: int):
        """حدّث عنصرًا"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        self._arr[index] = num

    def add(self, num: int):
        """ألحق عنصرًا في النهاية"""
        # زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها
        if self.size() == self.capacity():
            self.extend_capacity()
        self._arr[self._size] = num
        self._size += 1

    def insert(self, num: int, index: int):
        """أدخل عنصرًا في المنتصف"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        # زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها
        if self._size == self.capacity():
            self.extend_capacity()
        # أزح كل العناصر من الفهرس `index` وما بعده موضعًا واحدًا إلى اليمين
        for j in range(self._size - 1, index - 1, -1):
            self._arr[j + 1] = self._arr[j]
        self._arr[index] = num
        # حدّث عدد العناصر
        self._size += 1

    def remove(self, index: int) -> int:
        """احذف عنصرًا"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        num = self._arr[index]
        # أزح كل العناصر بعد الفهرس `index` موضعًا واحدًا إلى اليسار
        for j in range(index, self._size - 1):
            self._arr[j] = self._arr[j + 1]
        # حدّث عدد العناصر
        self._size -= 1
        # أعد العنصر المحذوف
        return num

    def extend_capacity(self):
        """زيادة سعة القائمة"""
        # أنشئ مصفوفة جديدة طولها _extend_ratio ضعف الطول الأصلي وانسخ الأصلية فيها
        self._arr = self._arr + [0] * self.capacity() * (self._extend_ratio - 1)
        # حدّث سعة القائمة
        self._capacity = len(self._arr)

    def to_array(self) -> list[int]:
        """إرجاع الجزء من القائمة الذي يحتوي عناصر"""
        return self._arr[: self._size]
```

</div>
