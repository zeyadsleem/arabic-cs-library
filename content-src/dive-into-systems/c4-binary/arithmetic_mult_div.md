---
title: "4.4.3. Multiplication & Division"
lang: en
---

This section briefly describes binary multiplication and division with integers. In particular, it shows methods for computing results by hand and does not reflect the behavior of modern hardware. This description is not meant to be comprehensive, as the remainder of the chapter focuses primarily on addition and subtraction.

#### [](#_multiplication)Multiplication

To multiply binary numbers, use the common pencil-and-paper strategy of considering one digit at a time and adding the results. For example, multiplying 0b0101 (5) and 0b0011 (3) is equivalent to summing:

- the result of multiplying d0 by 0b101 (5): 0b0101 (5)
- the result of multiplying d1 by 0b101 (5) and shifting the result to the left by one digit: 0b1010 (10).

```
  0101       0101       0101
x 0011  =  x    1  +  x   10  =  101 + 1010  =  1111 (15)
```

#### [](#_integer_division)(Integer) Division

Unlike the other operations just described, division has the potential to produce a non-integral result. The primary thing to keep in mind when dividing integers is that in most languages (for example, C, Python 2, and Java) the fractional portion of the result gets truncated. Otherwise, binary division uses the same long form method that most students learn in grade school. For example, here’s how computing 11 / 3 produces an integer result of 3:

```
    ____
11 |1011

    00__   11 (3) doesn't fit into 1 (1) or 10 (2),
11 |1011   so the first two digits of the result are 00.

    001_   11 (3) fits into 101 (5) once.
11 |1011

    101    101 (5) - 11 (3) leaves 10 (2).
  -  11
     10

    0011
11 |1011   11 (3) fits into 101 (5) once again.
     101
```

At this point, the arithmetic has produced the expected integer result, 0011 (3), and the hardware truncates any fractional parts. If you’re interested in determining the integral remainder, use the modulus operator (%); for example, 11 % 3 = 2.
