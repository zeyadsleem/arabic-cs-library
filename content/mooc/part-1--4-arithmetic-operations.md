---
title: "Arithmetic operations"
lang: ar
source: "https://programming-26.mooc.fi/part-1/4-arithmetic-operations"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to use variables in various arithmetic operations
- You will know how to deal with numbers in user input
- You will know how to cast values into other fundamental data types

</text-box>

In the previous sections you've seen examples with basic arithmetics. In the following table you can see the most common arithmetic operators in Python, with examples:

| Operator      | Purpose       | Example      | Result |
|:-------------:|---------------|--------------|-------|
| `+`           | Addition      | `2 + 4`      |`6`    |
| `-`           | Subtraction   | `10 - 2.5`   |`7.5`  |
| `*`           | Multiplication | `-2 * 123`  |`-246` |
| `/`           | Division (floating point result) | `9 / 2`     | `4.5` |
| `//`          | Division (integer result)              | `9 // 2`    | `4`   |
| `%`           | Modulo        | `9 % 2`      |`1`    |
| `**`          | Exponentiation | `2 ** 3`    |`8`    |

The order of operations is familiar from mathematics: first calculate the exponents, then multiplication and division, and finally addition and subtraction. The order can be changed with parentheses.

For example this bit of code

```python
print(2 + 3 * 3)
print((2 + 3) * 3)
```

prints out


```
11
15
```


## Operands, operators and data types

A calculation usually consists of *operands* and *operators*:

<img src="1_4_1.png">

The data type of an operand usually determines the data type of the result: if two integers are added together, the result will also be an integer. If a floating point number is subtracted from another floating point number, the result is a floating point number. In fact, if a single one of the operands in an expression is a floating point number, the result will also be a floating point number, regardless of the other operands.

Division `/` is an exception to this rule.... (truncated)
