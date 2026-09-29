---
title: "4.4.2. Subtraction"
lang: en
---

Subtraction combines two familiar operations: negation and addition. In other words, subtracting 7 - 3 is equivalent to expressing the operation as 7 + (-3). This portrayal of subtraction aligns well with how the hardware behaves — a CPU already contains circuits for negation and addition, so it makes sense to reuse those circuits rather than build an entirely new subtractor. Recall that a simple procedure to negate a binary number is to [flip the bits and add one](https://diveintosystems.org/book/C4-Binary/signed.html#_negation).

Consider the example 0b0111 (7) - 0b0011 (3), which starts by sending the 3 to a bit-flipping circuit. To get the "plus one," it takes advantage of the **carry in** to the adder circuit. That is, rather than carrying from one digit to another, subtraction feeds a *carry in* to d0 of the adder. Setting the carry in to 1 increases the resulting "ones place" value by one, which is exactly what it needs to get the "plus one" part of the negation. Putting it all together, the example would look like the following:

**Problem Setup**

```
 
  0111
- 0011
```

**Converted to Addition**

```
     1 (carry in)
  0111
+ 1100 (bits flipped)
```

**Worked Example**

```
                1 (carry in)
             0111
           + 1100 (bits flipped)

   Result:   0100
Carry out:  1
```

While the full result of the addition carries into an extra digit, the truncated result (0b0100) represents the expected result (4). Unlike the previous addition example, a carry out from the high-order bit is not necessarily indicative of an overflow problem for subtraction.

Performing subtraction as negation followed by addition also works when subtracting a negative value. For example, 7 - (-3) produces 10:

**Problem Setup**

```
 
  0111
- 1101
```

**Converted to Addition**

```
     1 (carry in)
  0111
+ 0010 (bits flipped)
```

**Worked Example**

```
                1 (carry in)
             0111
           + 0010 (bits flipped)

   Result:   1010
Carry out:  0
```

We further explore the implications of carrying out (or not) in the [overflow section](https://diveintosystems.org/book/C4-Binary/overflow.html#_integer_overflow).
