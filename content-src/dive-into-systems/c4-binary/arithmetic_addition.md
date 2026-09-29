---
title: "4.4.1. Addition"
lang: en
---

Recall that in a binary number, each digit holds only 0 or 1. Consequently, when adding two bits that are *both* 1, the result *carries out* to the next digit (e.g., 1 + 1 = 0b10, which requires two bits to represent). In practice, programs add multibit variables, where the result of one digit’s *carry out* influences the next digit by *carrying in*.

In general, when summing digits from two binary numbers (*A* and *B*), there are *eight* possible outcomes depending on the values of *DigitA*, *DigitB*, and a *Carryin* from the previous digit. [Table 1](#TabBinarySum) enumerates the eight possibilities that may result from adding one pair of bits. The *Carryin* column refers to a carry feeding into the sum from the previous digit, and the *Carryout* column indicates whether adding the pair of digits will feed a carry out to the next digit.

| Inputs |  | Outputs |  |  |  |
| --- | --- | --- | --- | --- | --- |
| DigitA | DigitB | Carryin |  | Result (Sum) | Carryout |
| 0 | 0 | 0 |  | 0 | 0 |
| 0 | 0 | 1 |  | 1 | 0 |
| 0 | 1 | 0 |  | 1 | 0 |
| 0 | 1 | 1 |  | 0 | 1 |
| 1 | 0 | 0 |  | 1 | 0 |
| 1 | 0 | 1 |  | 0 | 1 |
| 1 | 1 | 0 |  | 0 | 1 |
| 1 | 1 | 1 |  | 1 | 1 |

Consider the addition of two four-bit binary numbers. Start by lining up the numbers so that their corresponding digits match vertically, and then sum each corresponding digit in order, from the low-order digit (d0) to the high-order digit (d3). For example, adding 0b0010 + 0b1011:

**Problem Setup**

```
 
  0010
+ 1011
```

**Worked Example**

```python
         1    <- Carry the 1 from digit 1 into digit 2
        0010
      + 1011

Result: 1101
```

The example shows a 1 carrying from d1 into d2. This situation is analogous to adding two decimal digits that sum to a value larger than 9. For example, when adding 5 + 8 = 13, the resulting ones place contains 3, and a 1 carries into the tens place.

The first operand (0b0010) has a leading 0, so it represents 2 for both two’s complement and unsigned interpretations. The second operand (0b1011) represents -5 if interpreted as a signed two’s complement value. Otherwise, it represents 11 if interpreted as an unsigned value. Fortunately, the interpretation of the operands doesn’t affect the steps for computing the result. That is, the computed result (0b1101) represents either 13 (unsigned: 2 + 11) or -3 (signed: 2 + -5), both of which are correct depending on the interpretation of the second operand.

More generally, a four-bit sequence represents values in the range [0, 15] when interpreted as *unsigned*. When interpreted as *signed*, it represents the range [-8, 7]. In the previous example, the result fits within the representable range either way, but we may not always be so lucky. For example, when adding 0b1100 (unsigned 12) + 0b0111 (7), the answer should be 19, but four bits can’t represent 19:

**Problem Setup**

```
 
  1100
+ 0111
```

**Worked Example**

```
             11     <- Carry a 1 from: digit 2 into digit 3, and
              1100                     digit 3 out of the overall value
           +  0111

   Result:    0011
Carry out:   1
```

Note that the addition in this example carries a 1 from the most significant bit, a condition known as a **carry out** for the overall arithmetic operation. In this example, the carry out suggests that the arithmetic output needs an extra bit to store the intended result. However, when performing four-bit arithmetic, there’s nowhere to put the carry out’s extra bit, so the hardware simply drops or **truncates** it, leaving 0b0011 as the result. Of course, if the goal was to add 12 + 7, a result of 3 is likely to be surprising. The surprise is a consequence of *overflow*. We’ll explore how to detect overflow and why it produces the results that it does in a [later section](https://diveintosystems.org/book/C4-Binary/overflow.html#_integer_overflow).

**Note**

> Multibit adder circuits also support a **carry in** that behaves like a carry into the rightmost digit (that is, it serves as the *Carryin* input for d0). The carry in isn’t useful when performing addition — it’s implicitly set to 0, which is why it doesn’t appear in the preceding example. However, the carry in does become relevant for other operations that use adder circuitry, most notably [subtraction](https://diveintosystems.org/book/C4-Binary/arithmetic_subtraction.html#_subtraction).
