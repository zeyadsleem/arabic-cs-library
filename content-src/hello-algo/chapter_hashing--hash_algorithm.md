---
title: "Hash Algorithm"
book: hello-algo
chapter: chapter_hashing
slug: hash_algorithm
order: 39
lang: en
---
The previous two sections introduced the working principle of hash tables and the methods to handle hash collisions. However, both open addressing and separate chaining **can only ensure that the hash table functions normally when hash collisions occur, but cannot reduce the frequency of hash collisions**.

If hash collisions occur too frequently, the performance of the hash table will deteriorate drastically. As shown in the figure below, for a separate chaining hash table, in the ideal case, the key-value pairs are evenly distributed across the buckets, achieving optimal query efficiency; in the worst case, all key-value pairs are stored in the same bucket, degrading the time complexity to $O(n)$.

![Ideal and worst cases of hash collisions](/images/hello-algo/chapter_hashing--hash_collision_best_worst_condition.png)

**The distribution of key-value pairs is determined by the hash function**. Recall the steps of the hash function: first compute the hash value, then take it modulo the array length:

```shell
index = hash(key) % capacity
```

Observing the above formula, when the hash table capacity `capacity` is fixed, **the hash algorithm `hash()` determines the output value**, thereby determining the distribution of key-value pairs in the hash table.

This means that, to reduce the probability of hash collisions, we should focus on the design of the hash algorithm `hash()`.

## Goals of Hash Algorithms

To build a hash table that is both fast and robust, a hash algorithm should have the following properties:

- **Determinism**: For the same input, the hash algorithm should always produce the same output. Only then can the hash table be reliable.
- **High efficiency**: The process of computing the hash value should be fast enough. The smaller the computational overhead, the more practical the hash table.
- **Uniform distribution**: The hash algorithm should ensure that key-value pairs are evenly distributed in the hash table. The more uniform the distribution, the lower the probability of hash collisions.

In fact, hash algorithms are not only used to implement hash tables but are also widely applied in other fields.

- **Password storage**: To protect the security of user passwords, systems usually do not store the plaintext passwords but rather the hash values of the passwords. When a user enters a password, the system calculates the hash value of the input and compares it with the stored hash value. If they match, the password is considered correct.
- **Data integrity check**: The data sender can calculate the hash value of the data and send it along; the receiver can recalculate the hash value of the received data and compare it with the received hash value. If they match, the data is considered intact.

For cryptographic applications, hash algorithms need stronger security properties to prevent reverse engineering, such as inferring the original password from a hash value.

- **Unidirectionality**: It should be impossible to deduce any information about the input data from the hash value.
- **Collision resistance**: It should be extremely difficult to find two different inputs that produce the same hash value.
- **Avalanche effect**: Minor changes in the input should lead to significant and unpredictable changes in the output.

Note that **"uniform distribution" and "collision resistance" are two independent concepts**. Satisfying uniform distribution does not necessarily mean collision resistance. For example, under random input `key`, the hash function `key % 100` can produce a uniformly distributed output. However, this hash algorithm is too simple, and all `key` with the same last two digits will have the same output, making it easy to deduce a usable `key` from the hash value, thereby cracking the password.

## Design of Hash Algorithms

The design of hash algorithms is a complex issue that requires consideration of many factors. However, for some less demanding scenarios, we can also design some simple hash algorithms.

- **Additive hash**: Add up the ASCII codes of each character in the input and use the total sum as the hash value.
- **Multiplicative hash**: Leverage the low correlation introduced by multiplication: multiply by a constant at each step and accumulate the ASCII codes of the characters into the hash value.
- **XOR hash**: Accumulate the hash value by XORing each element of the input data.
- **Rotating hash**: Accumulate the ASCII code of each character into a hash value, performing a rotation operation on the hash value before each accumulation.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Rotational hash */
func rotHash(key string) int {
	var hash int64
	var modulus int64

	modulus = 1000000007
	for _, b := range []byte(key) {
		hash = ((hash << 4) ^ (hash >> 28) ^ int64(b)) % modulus
	}
	return int(hash)
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Rotational hash */
function rotHash(key: string): number {
    let hash = 0;
    const MODULUS = 1000000007;
    for (const c of key) {
        hash = ((hash << 4) ^ (hash >> 28) ^ c.charCodeAt(0)) % MODULUS;
    }
    return hash;
}
```

</div>

We can observe that the final step of each hash algorithm is to take the result modulo the large prime $1000000007$, ensuring that the hash value stays within a suitable range. This naturally raises a question: why emphasize using a prime modulus, and what are the drawbacks of using a composite modulus?

In short: **using a large prime as the modulus helps maximize the uniformity of hash values**. Because a prime shares no common factors with other numbers, it can reduce periodic patterns introduced by the modulo operation and thus mitigate hash collisions.

For example, suppose we choose the composite number $9$ as the modulus, which can be divided by $3$, then all `key` divisible by $3$ will be mapped to hash values $0$, $3$, $6$.

$$
\begin{aligned}
\text{modulus} & = 9 \newline
\text{key} & = \{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \dots \} \newline
\text{hash} & = \{ 0, 3, 6, 0, 3, 6, 0, 3, 6, 0, 3, 6,\dots \}
\end{aligned}
$$

If the input `key` values happen to follow this kind of arithmetic progression, the hash values will cluster, worsening hash collisions. Now suppose we replace `modulus` with the prime number $13$. Because `key` and `modulus` share no common factors, the output hash values become much more evenly distributed.

$$
\begin{aligned}
\text{modulus} & = 13 \newline
\text{key} & = \{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \dots \} \newline
\text{hash} & = \{ 0, 3, 6, 9, 12, 2, 5, 8, 11, 1, 4, 7, \dots \}
\end{aligned}
$$

It is worth noting that if the `key` is guaranteed to be randomly and uniformly distributed, then choosing a prime number or a composite number as the modulus can both produce uniformly distributed hash values. However, when the distribution of `key` has some periodicity, modulo a composite number is more likely to result in clustering.

In summary, we usually choose a prime number as the modulus, and this prime number should be large enough to eliminate periodic patterns as much as possible, enhancing the robustness of the hash algorithm.

## Common Hash Algorithms

It is easy to see that the simple hash algorithms introduced above are fairly "fragile" and fall far short of the design goals of hash algorithms. For example, because addition and XOR are commutative, additive hash and XOR hash cannot distinguish strings with the same characters in a different order, which may worsen hash collisions and introduce security risks.

In practice, we usually use some standard hash algorithms, such as MD5, SHA-1, SHA-2, and SHA-3. They can map input data of any length to a fixed-length hash value.

Over the past century, hash algorithms have been in a continuous process of upgrading and optimization. Some researchers strive to improve the performance of hash algorithms, while others, including hackers, are dedicated to finding security issues in hash algorithms. The table below shows hash algorithms commonly used in practical applications.

- MD5 and SHA-1 have been successfully attacked multiple times and are thus abandoned in various security applications.
- SHA-2 series, especially SHA-256, is one of the most secure hash algorithms to date, with no successful attacks reported, hence commonly used in various security applications and protocols.
- SHA-3 has lower implementation costs and higher computational efficiency compared to SHA-2, but its current usage coverage is not as extensive as the SHA-2 series.

<p align="center"> Table <id> &nbsp; Common hash algorithms </p>

|                 | MD5                                             | SHA-1                               | SHA-2                                                             | SHA-3                        |
| --------------- | ----------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------- | ---------------------------- |
| Release Year    | 1992                                            | 1995                                | 2002                                                              | 2008                         |
| Output Length   | 128 bit                                         | 160 bit                             | 256/512 bit                                                       | 224/256/384/512 bit          |
| Hash Collisions | Frequent                                        | Frequent                            | Rare                                                              | Rare                         |
| Security Level  | Low, has been successfully attacked             | Low, has been successfully attacked | High                                                              | High                         |
| Applications    | Abandoned, still used for data integrity checks | Abandoned                           | Cryptocurrency transaction verification, digital signatures, etc. | Can be used to replace SHA-2 |

## Hash Values in Data Structures

We know that hash table keys can be integers, floating-point numbers, strings, and other data types. Programming languages usually provide built-in hash algorithms for these types to compute bucket indices in a hash table. Taking Python as an example, we can call the `hash()` function to compute hash values for various data types.

- The hash values of integers and booleans are their own values.
- The calculation of hash values for floating-point numbers and strings is more complex, and interested readers are encouraged to study this on their own.
- The hash value of a tuple is obtained by hashing each of its elements and combining those results into a single hash value.
- An object's hash value is typically generated from its memory address. By overriding the object's hash method, it can instead be generated from the object's contents.

<div class="note">

Be aware that the definition and methods of the built-in hash value calculation functions in different programming languages vary.

</div>

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="built_in_hash.go"
// Go does not provide built-in hash code functions
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="built_in_hash.ts"
// TypeScript does not provide built-in hash code functions
```

</div>

In many programming languages, **only immutable objects can serve as the `key` in a hash table**. If we use a list (dynamic array) as a `key`, when the contents of the list change, its hash value also changes, and we would no longer be able to find the original `value` in the hash table.

Although the member variables of a custom object (such as a linked list node) are mutable, it is hashable. **This is because the hash value of an object is usually generated based on its memory address**, and even if the contents of the object change, the memory address remains the same, so the hash value remains unchanged.

You might have noticed that the hash values output in different consoles are different. **This is because the Python interpreter adds a random salt to the string hash function each time it starts up**. This approach effectively prevents HashDoS attacks and enhances the security of the hash algorithm.
