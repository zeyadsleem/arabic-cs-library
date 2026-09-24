---
title: "Basic Data Types"
book: hello-algo
chapter: chapter_data_structure
slug: basic_data_types
order: 18
lang: en
---
When we talk about data stored in computers, we think of various forms such as text, images, videos, audio, 3D models, and more. Although these kinds of data are organized in different ways, they are all composed of various basic data types.

**Basic data types are types that the CPU can directly operate on**, and they are directly used in algorithms, mainly including the following.

- Integer types `byte`, `short`, `int`, `long`.
- Floating-point types `float`, `double`, used to represent decimal numbers.
- Character type `char`, used to represent letters, punctuation marks, and even emojis in various languages.
- Boolean type `bool`, used to represent "yes" and "no" judgments.

**Basic data types are stored in binary form in computers**. A binary digit is one bit. In most modern operating systems, $1$ byte consists of $8$ bits.

The range of values for basic data types depends on the size of the space they occupy. Below is an example using Java.

- Integer type `byte` occupies $1$ byte = $8$ bits, and can represent $2^{8}$ numbers.
- Integer type `int` occupies $4$ bytes = $32$ bits, and can represent $2^{32}$ numbers.

The following table lists the space occupied, value ranges, and default values of various basic data types in Java. You don't need to memorize this table; a general understanding is sufficient, and you can refer to it when needed.

<p align="center"> Table <id> &nbsp; Space occupied and value ranges of basic data types </p>

| Type       | Symbol   | Space Occupied | Minimum Value            | Maximum Value           | Default Value  |
| ---------- | -------- | -------------- | ------------------------ | ----------------------- | -------------- |
| Integer    | `byte`   | 1 byte         | $-2^7$ ($-128$)          | $2^7 - 1$ ($127$)       | $0$            |
|            | `short`  | 2 bytes        | $-2^{15}$                | $2^{15} - 1$            | $0$            |
|            | `int`    | 4 bytes        | $-2^{31}$                | $2^{31} - 1$            | $0$            |
|            | `long`   | 8 bytes        | $-2^{63}$                | $2^{63} - 1$            | $0$            |
| Float      | `float`  | 4 bytes        | $1.175 \times 10^{-38}$  | $3.403 \times 10^{38}$  | $0.0\text{f}$  |
|            | `double` | 8 bytes        | $2.225 \times 10^{-308}$ | $1.798 \times 10^{308}$ | $0.0$          |
| Character  | `char`   | 2 bytes        | $0$                      | $2^{16} - 1$            | $0$            |
| Boolean    | `bool`   | 1 byte         | $\text{false}$           | $\text{true}$           | $\text{false}$ |

Please note that the table above applies specifically to Java's basic data types. Each programming language has its own type definitions, and their space usage, value ranges, and default values may vary.

- In Python, the integer type `int` can be of any size, limited only by available memory; the floating-point type `float` is double-precision 64-bit; there is no `char` type, a single character is actually a string `str` of length 1.
- C and C++ do not explicitly specify the size of basic data types, which varies by implementation and platform. The above table follows the LP64 [data model](https://en.cppreference.com/w/cpp/language/types#Properties), which is used in Unix 64-bit operating systems including Linux and macOS.
- The size of character `char` is 1 byte in C and C++, and in most programming languages it depends on the specific character encoding method, as detailed in the "Character Encoding" section.
- Even though representing a boolean value requires only 1 bit ($0$ or $1$), it is usually stored as 1 byte in memory. This is because modern computer CPUs typically use 1 byte as the minimum addressable memory unit.

So, what is the relationship between basic data types and data structures? We know that data structures are ways of organizing and storing data in computers. Here, the emphasis is on the "structure", not the "data".

If we want to represent "a row of numbers", we naturally think of using an array. This is because the linear structure of an array can represent the adjacency and order relationships of numbers, but whether the stored content is integer `int`, floating-point `float`, or character `char` is unrelated to the "data structure".

In other words, **basic data types provide the "content type" of data, while data structures provide the "organization method" of data**. For example, in the following code, we use the same data structure (array) to store and represent different basic data types, including `int`, `float`, `char`, `bool`, etc.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title=""
// Initialize arrays using various basic data types
var numbers = [5]int{}
var decimals = [5]float64{}
var characters = [5]byte{}
var bools = [5]bool{}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title=""
// Initialize arrays using various basic data types
const numbers: number[] = [];
const characters: string[] = [];
const bools: boolean[] = [];
```

</div>
