---
title: "Hash Table"
book: hello-algo
chapter: chapter_hashing
slug: hash_map
order: 37
lang: en
---
A <u>hash table</u>, also known as a <u>hash map</u>, stores mappings from keys `key` to values `value`, enabling efficient lookups. Specifically, given a key `key`, we can retrieve the corresponding value `value` from a hash table in $O(1)$ time.

As shown below, suppose we have $n$ students, each with two pieces of information: a name and a student ID. If we want to support the query "given a student ID, return the corresponding name," we can use the hash table shown below.

![Abstract representation of a hash table](/images/hello-algo/chapter_hashing--hash_table_lookup.png)

In addition to hash tables, arrays and linked lists can also implement query functionality. Their efficiency comparison is shown in the following table.

- **Adding elements**: Simply add elements to the end of the array (linked list), using $O(1)$ time.
- **Querying elements**: Since the array (linked list) is unordered, all elements need to be traversed, using $O(n)$ time.
- **Deleting elements**: The element must first be located, then deleted from the array (linked list), using $O(n)$ time.

<p align="center"> Table <id> &nbsp; Comparison of element query efficiency </p>

|                 | Array  | Linked List | Hash Table |
| --------------- | ------ | ----------- | ---------- |
| Find element    | $O(n)$ | $O(n)$      | $O(1)$     |
| Add element     | $O(1)$ | $O(1)$      | $O(1)$     |
| Delete element  | $O(n)$ | $O(n)$      | $O(1)$     |

As we can see, **insertion, deletion, lookup, and update operations in a hash table all have time complexity $O(1)$**, making hash tables highly efficient.

## Common Hash Table Operations

Common operations on hash tables include: initialization, query operations, adding key-value pairs, and deleting key-value pairs. Example code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="hash_map.py"
# Initialize hash table
hmap: dict = {}

# Add operation
# Add key-value pair (key, value) to hash table
hmap[12836] = "XiaoHa"
hmap[15937] = "XiaoLuo"
hmap[16750] = "XiaoSuan"
hmap[13276] = "XiaoFa"
hmap[10583] = "XiaoYa"

# Query operation
# Input key into hash table to get value
name: str = hmap[15937]

# Delete operation
# Delete key-value pair (key, value) from hash table
hmap.pop(10583)
```

</div>

There are three common ways to traverse a hash table: traversing key-value pairs, traversing keys, and traversing values. Example code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="hash_map.py"
# Traverse hash table
# Traverse key-value pairs key->value
for key, value in hmap.items():
    print(key, "->", value)
# Traverse keys only
for key in hmap.keys():
    print(key)
# Traverse values only
for value in hmap.values():
    print(value)
```

</div>

## Simple Hash Table Implementation

Let's start with the simplest case: **implementing a hash table with just an array**. In a hash table, each empty slot in the array is called a <u>bucket</u>, and each bucket can store one key-value pair. A lookup therefore consists of finding the bucket for `key` and reading the `value` stored there.

So how do we find the right bucket for a given `key`? We do this with a <u>hash function</u>. A hash function maps a larger input space to a smaller output space. In a hash table, the input space is the set of all `key`s, and the output space is the set of all buckets (array indices). In other words, given a `key`, **the hash function tells us where the corresponding key-value pair should be stored in the array**.

Given a `key`, computing the bucket index involves the following two steps:

1. Use a hash algorithm `hash()` to compute a hash value.
2. Take that hash value modulo the number of buckets (array length), `capacity`, to obtain the bucket (array index) `index` corresponding to the `key`.

```shell
index = hash(key) % capacity
```

We can then use `index` to access the corresponding bucket in the hash table and retrieve the `value`.

Suppose the array length is `capacity = 100` and the hash algorithm is `hash(key) = key`. Then the hash function is `key % 100`. The figure below illustrates how this hash function works, using student ID as `key` and name as `value`.

![Working principle of hash function](/images/hello-algo/chapter_hashing--hash_function.png)

The following code implements a simple hash table. Here, we encapsulate `key` and `value` into a class `Pair` to represent a key-value pair.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```py
class ArrayHashMap:
    """Hash table implemented with an array"""

    def __init__(self):
        """Constructor"""
        # مهّد مصفوفة تحوي 100 سلة
        self.buckets: list[Pair | None] = [None] * 100

    def hash_func(self, key: int) -> int:
        """Hash function"""
        index = key % 100
        return index

    def get(self, key: int) -> str | None:
        """Lookup operation"""
        index: int = self.hash_func(key)
        pair: Pair = self.buckets[index]
        if pair is None:
            return None
        return pair.val

    def put(self, key: int, val: str):
        """Insert and update operations"""
        pair = Pair(key, val)
        index: int = self.hash_func(key)
        self.buckets[index] = pair

    def remove(self, key: int):
        """Remove operation"""
        index: int = self.hash_func(key)
        # اجعلها None لتمييز الحذف
        self.buckets[index] = None

    def entry_set(self) -> list[Pair]:
        """Get all key-value pairs"""
        result: list[Pair] = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair)
        return result

    def key_set(self) -> list[int]:
        """Get all keys"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.key)
        return result

    def value_set(self) -> list[str]:
        """Get all values"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.val)
        return result

    def print(self):
        """Print the hash table"""
        for pair in self.buckets:
            if pair is not None:
                print(pair.key, "->", pair.val)
```

</div>

## Hash Collision and Resizing

Fundamentally, a hash function maps the input space consisting of all `key`s to the output space consisting of all array indices, and the input space is often much larger than the output space. Therefore, **in theory, different inputs must sometimes map to the same output**.

For the hash function in the above example, when the input `key`s have the same last two digits, the hash function produces the same output. For example, when querying two students with IDs 12836 and 20336, we get:

```shell
12836 % 100 = 36
20336 % 100 = 36
```

As shown below, two student IDs now point to the same name, which is clearly incorrect. We call this situation, where multiple inputs map to the same output, a <u>hash collision</u>.

![Hash collision example](/images/hello-algo/chapter_hashing--hash_collision.png)

It's easy to see that the larger the hash table capacity $n$, the lower the probability that multiple `key`s will be assigned to the same bucket, and the fewer collisions. Therefore, **we can reduce hash collisions by expanding the hash table**.

As shown in the figure below, before expansion, the key-value pairs `(136, A)` and `(236, D)` collided, but after expansion, the collision disappears.

![Hash table resizing](/images/hello-algo/chapter_hashing--hash_table_reshash.png)

Like resizing an array, resizing a hash table requires migrating all key-value pairs from the original table to the new table, which is expensive. In addition, because the hash table capacity `capacity` changes, we must recompute the storage location of every key-value pair using the hash function, which further increases the cost of resizing. For this reason, programming languages typically reserve a sufficiently large hash table capacity to avoid frequent resizing.

The <u>load factor</u> is an important concept in hash tables. It is defined as the number of elements in the hash table divided by the number of buckets and is used to measure the severity of hash collisions. **It is also commonly used as a threshold for triggering hash table resizing**. For example, in Java, when the load factor exceeds $0.75$, the system expands the hash table to twice its original size.
