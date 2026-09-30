---
title: "Polynomial Sequences"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_seq-polynomial.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 4.3 Polynomial Sequences

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_seq-polynomial-3-1-1)

1. Identify a sequence as having a polynomial closed formula based on its sequence of differences, and determine the polynomial’s degree.[🔗](#sec_seq-polynomial-3-2-1-1) [🔗](#sec_seq-polynomial-3-2-1)
2. Fit an appropriate degree polynomial to a sequence of initial terms.[🔗](#sec_seq-polynomial-3-2-2-1) [🔗](#sec_seq-polynomial-3-2-2)
3. Explain how recurrence relations for polynomial sequences relate to their closed formulas.[🔗](#sec_seq-polynomial-3-2-3-1) [🔗](#sec_seq-polynomial-3-2-3)

[🔗](#sec_seq-polynomial-3)

### Subsection Section Preview

#### Investigate!

A standard \(8 \times 8\) chessboard contains 64 squares. Actually, this is just the number of unit squares. How many squares of all sizes are there on a chessboard? Start with smaller boards: \(1\times 1\text{,}\) \(2 \times 2\text{,}\) \(3\times 3\text{,}\) etc. Find a formula for the total number of squares in an \(n\times n\) board.[🔗](#sec_seq-polynomial-4-2-1) [🔗](#sec_seq-polynomial-4-2)We have seen that arithmetic sequences grow at a constant rate, and so their closed formulas are linear functions. What about sequences that grow faster? What if their rate of change (really the differences between terms) is itself growing at a constant rate?[🔗](#sec_seq-polynomial-4-3) In [Section 4.2](sec_seq-growth.html) we claimed that the triangular numbers, the sum of the first \(n\) positive integers, have closed formula \begin{equation*} T_n = \frac{n(n+1)}{2} = \frac{n^2}{2} + \frac{n}{2}\text{.} \end{equation*} So this sequence, whose sequence of differences is arithmetic, is a degree 2 polynomial (a quadratic function). [🔗](#sec_seq-polynomial-4-4) Our goal in this section is to explore this phenomenon. We will verify that this really is the closed formula for the triangular numbers, extend it to other sequences with arithmetic differences, and then explore sequences that grow at even faster rates.[🔗](#sec_seq-polynomial-4-5)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-seq-polynomial)

#### 1.

Activate While wandering the halls of the math department, you find yourself staring at the captivating artwork shown below.[🔗](#extracted-webwork-197-1-1-1) ![A square array of dots with L-shaped lines separating collections of odd numbers of dots.](generated/webwork/images/webwork-197-image-1.svg)

#### (a)

How many dots are in the figure?[🔗](#extracted-webwork-197-1-2-1-1) The dots form a by square, for a total of dots.[🔗](#extracted-webwork-197-1-2-1-2) [🔗](#extracted-webwork-197-1-2)

#### (b)

We can also compute the total number of dots by summing each “hook” region, from smallest to largest:[🔗](#extracted-webwork-197-1-3-1-1) + + + + + .[🔗](#extracted-webwork-197-1-3-1-2) [🔗](#extracted-webwork-197-1-3)

#### (c)

Yet another way to calculate the total number of dots is to group the terms of this sum.[🔗](#extracted-webwork-197-1-4-1-1) \(1+11 =\) ; \(3+9 =\) ; \(5+7 =\) .[🔗](#extracted-webwork-197-1-4-1-2) Since there are three pairs of sums, the total is \(3 \cdot\) = .[🔗](#extracted-webwork-197-1-4-1-3) [🔗](#extracted-webwork-197-1-4)

#### (d)

If we generalize the diagram, so it has \(n\) hooks, how many dots will be in the largest hook?[🔗](#extracted-webwork-197-1-5-1-1) How many dots will be in the second largest hook?[🔗](#extracted-webwork-197-1-5-1-2) [🔗](#extracted-webwork-197-1-5)

#### (e)

What will the sum of the smallest and largest hooks be?[🔗](#extracted-webwork-197-1-6-1-1) What will the sum of the second smallest and second largest hooks be?[🔗](#extracted-webwork-197-1-6-1-2) [🔗](#extracted-webwork-197-1-6)

#### (f)

If we continue adding pairs of hooks (next smallest plus next largest), how many pairs will we have?[🔗](#extracted-webwork-197-1-7-1-1) Multiplying then, the total number of dots will be: .[🔗](#extracted-webwork-197-1-7-1-2) Hint. Let’s assume that \(n\) is even. If it wasn’t, then there would be a single “middle” hook that isn’t added to anything, but this is counteracted by the fact that \(n/2\) would count a half hook sum.[🔗](#extracted-webwork-197-1-7-2-1) [🔗](#extracted-webwork-197-1-7-2) [🔗](#extracted-webwork-197-1-7) [🔗](#pa-seq-polynomial)[🔗](#PA-seq-polynomial)[🔗](#sec_seq-polynomial-4)

### Subsection Summing Arithmetic Sequences: Reverse and Add

Let’s find the sum of the first \(n\) positive integers carefully. Call that sum \(T_n\text{,}\) and write it down twice, once in the usual order and once in reverse order. \begin{equation*} \begin{array}{lccccccccc} & T_n & = & 1 & + & 2 &+ & 3 & + \cdots + & n \\ + & T_n & =& n & + &(n-1)& + & (n-2)& + \cdots + &1 \\\hline & 2T_n & =& n+1 & + & n+1 & + & n+1 &+ \cdots + & n+1 \end{array} \end{equation*} [🔗](#sec_seq-polynomial-5-3) We then added the two equations together. The left-hand side is \(2T_n\text{.}\) On the right-hand side, something great happens: All the terms of the sum are the same! So instead of adding up a bunch of different numbers, we now just add a bunch of the same number. That’s a task that multiplication lives for! There are \(n\) terms in the sum, so we get, \begin{equation*} 2T_n = n(n+1)\text{.} \end{equation*} Solving for \(T_n\) gives us, \begin{equation*} T_n = \frac{n(n+1)}{2}\text{,} \end{equation*} as expected. [🔗](#sec_seq-polynomial-5-4) This technique will work for any arithmetic sum.[🔗](#sec_seq-polynomial-5-5)

#### Example 4.3.1.

Find the sum: \(2 + 5 + 8 + 11 + 14 + \cdots + 470\text{.}\)[🔗](#sec_seq-polynomial-5-6-1-1) Solution. The idea is to mimic how we found the formula for triangular numbers. If we add the first and last terms, we get 472. The second term and second-to-last term also add up to 472. To keep track of everything, we might express this as follows. Call the sum \(S\text{.}\) Then,[🔗](#sec_seq-polynomial-5-6-2-1)

| \(S =\) | \(2\) | \(+\) | \(5\) | \(+\) | \(8\) | \(+ \cdots +\) | \(467\) | \(+\) | 470 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| \(+ \quad S =\) | \(470\) | \(+\) | \(467\) | \(+\) | \(464\) | \(+ \cdots +\) | \(5\) | \(+\) | 2 |
| \(2S =\) | \(472\) | \(+\) | \(472\) | \(+\) | \(472\) | \(+ \cdots +\) | \(472\) | \(+\) | \(472\) |

To find \(2S\) then, we add 472 to itself a number of times. What number? We need to decide how many terms (summands) are in the sum. Since the terms form an arithmetic sequence, the \(n\)th term in the sum (counting \(2\) as the 0th term) can be expressed as \(2 + 3n\text{.}\) If \(2 + 3n = 470\) then \(n = 156\text{.}\) So \(n\) ranges from 0 to 156, giving 157 terms in the sum. This is the number of 472’s in the sum for \(2S\text{.}\) Thus \begin{equation*} 2S = 157\cdot 472 = 74104\text{.} \end{equation*} [🔗](#sec_seq-polynomial-5-6-2-3) It is now easy to find \(S\text{:}\) \begin{equation*} S = 74104/2 = 37052\text{.} \end{equation*} [🔗](#sec_seq-polynomial-5-6-2-4) [🔗](#sec_seq-polynomial-5-6-2) [🔗](#sec_seq-polynomial-5-6)This will work for the sum of any *arithmetic* sequence. Call the sum \(S\text{.}\) Reverse and add. This produces a single number added to itself many times. Find the number of times. Multiply. Divide by 2. Done.[🔗](#sec_seq-polynomial-5-7)

#### Example 4.3.2.

Find a closed formula for \(6 + 10 + 14 + \cdots + (4n - 2)\text{.}\)[🔗](#sec_seq-polynomial-5-8-1-1) Solution. Again, we have a sum of an arithmetic sequence. How many terms are in the sequence? Clearly each term in the sequence has the form \(4k -2\) (as evidenced by the last term). For which values of \(k\) though? To get 6, \(k = 2\text{.}\) To get \(4n-2\) take \(k = n\text{.}\) So to find the number of terms, we must count the number of integers in the range \(2,3,\ldots, n\text{.}\) This is \(n-1\text{.}\) (There are \(n\) numbers from 1 to \(n\text{,}\) so one less if we start with 2.)[🔗](#sec_seq-polynomial-5-8-2-1) Now reverse and add:[🔗](#sec_seq-polynomial-5-8-2-2)

| \(S =\) | \(6\) | \(+\) | \(10\) | \(+ \cdots +\) | \(4n-6\) | \(+\) | \(4n-2\) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| \(+ \quad S =\) | \(4n-2\) | \(+\) | \(4n-6\) | \(+ \cdots +\) | \(10\) | \(+\) | 6 |
| \(2S =\) | \(4n+4\) | \(+\) | \(4n+4\) | \(+ \cdots +\) | \(4n+4\) | \(+\) | \(4n+4\) |

Since there are \(n-1\) terms, we get \begin{equation*} 2S = (n-1)(4n+4)\qquad \mbox{ so } \qquad S = \frac{(n-1)(4n+4)}{2}\text{.} \end{equation*} [🔗](#sec_seq-polynomial-5-8-2-4) [🔗](#sec_seq-polynomial-5-8-2) [🔗](#sec_seq-polynomial-5-8)Besides finding sums, we can use this technique to find closed formulas for sequences we recognize as sequences of partial sums.[🔗](#sec_seq-polynomial-5-9)

#### Example 4.3.3.

Use partial sums to find a closed formula for \((a_n)_{n\ge 0}\) which starts \(2, 3, 7, 14, 24, 37,\ldots \ldots\text{.}\) Assume a recurrence relation for the sequence is \(a_n = a_{n-1} + 3n-2\text{.}\)[🔗](#eg-sum-of-arithmetic-2-1) Solution. First, if you look at the differences between terms, you get a sequence of differences \((d_n)_{n \ge 1}\text{:}\) \(1,4,7,10,13, \ldots\text{,}\) which is an arithmetic sequence. Indeed, we notice that \(d_n = 3n-2\text{,}\) which agrees with the recurrence relation. Written another way: \begin{align*} a_0 \amp = 2\\ a_1 \amp = 2+1 = 2 + d_1\\ a_2 \amp = 2+1+4 = 2 + d_1 + d_2\\ a_3 \amp = 2+1+4+7 = 2 + d_1 + d_2 + d_3 \end{align*} and so on. We can write the general term of \((a_n)\) in terms of the arithmetic sequence as follows: \begin{equation*} a_n = 2 + 1 + 4 + 7 + 10 + \cdots + 3n-2\text{.} \end{equation*} [🔗](#eg-sum-of-arithmetic-3-1) We can reverse and add, but the initial 2 does not fit our pattern. This just means we need to keep the 2 out of the reverse part:[🔗](#eg-sum-of-arithmetic-3-2)

| \(a_n =\) | \(2\) | \(+\) | \(1\) | \(+\) | \(4\) | \(+ \cdots +\) | \(3n-2\) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| \(+ \quad a_n =\) | \(2\) | \(+\) | \(3n-2\) | \(+\) | \(3(n-1)-2\) | \(+ \cdots +\) | \(1\) |
| \(2a_n =\) | \(4\) | \(+\) | \(2+3n-3\) | \(+\) | \(2+3n-3\) | \(+ \cdots +\) | \(2+3n-3\) |

Not counting the first term (the 4) there are \(n\) summands of \(2+3n-3 = 3n-1\) so the right-hand side becomes \(4+(3n-1)n\text{.}\)[🔗](#eg-sum-of-arithmetic-3-4) Finally, solving for \(a_n\) we get \begin{equation*} a_n = \d \frac{4+(3n-1)n}{2}\text{.} \end{equation*} Just to be sure, we check \(a_0 = \frac{4}{2} = 2\text{,}\) \(a_1 = \frac{4+2}{2} = 3\text{,}\) etc. We have the correct closed formula. [🔗](#eg-sum-of-arithmetic-3-5) [🔗](#eg-sum-of-arithmetic-3) [🔗](#eg-sum-of-arithmetic)Notice that the closed formula for a sequence that has an arithmetic (i.e., linear) rate of change is a quadratic function. Interesting....[🔗](#sec_seq-polynomial-5-11) [🔗](#sec_seq-polynomial-5)

### Subsection Higher Degree Polynomials

Since we know how to compute the sum of the first \(n\) terms of arithmetic sequences, we can compute the closed formulas for sequences that have an arithmetic sequence of differences between terms. But what if we consider a sequence that is the sum of the first \(n\) terms of a sequence that is itself the sum of an arithmetic sequence?[🔗](#subsec-seq-higher-poly-2) How many squares (of all sizes) are there on a chessboard? A chessboard consists of \(64\) squares, but we also want to consider squares of longer side length. Even though we are only considering an \(8 \times 8\) board, there is already a lot to count. So instead, let us build a sequence: the first term will be the number of squares on a \(1 \times 1\) board, the second term will be the number of squares on a \(2 \times 2\) board, and so on. After a little thought, we arrive at the sequence \begin{equation*} 1,5,14,30, 55,\ldots\text{.} \end{equation*} [🔗](#subsec-seq-higher-poly-3) This sequence is not arithmetic (or geometric for that matter), but perhaps its sequence of differences is. For differences we get \begin{equation*} 4, 9, 16, 25, \ldots\text{.} \end{equation*} [🔗](#subsec-seq-higher-poly-4) Not a huge surprise: One way to count the number of squares in a \(4 \times 4\) chessboard is to notice that there are \(16\) squares with side length 1, 9 with side length 2, 4 with side length 3 and 1 with side length 4. So the original sequence is just the sum of squares. Now this sequence of differences is not arithmetic since its sequence of differences (the differences of the differences of the original sequence) is not constant. In fact, this sequence of second differences is \begin{equation*} 5, 7, 9, \ldots\text{,} \end{equation*} which *is* an arithmetic sequence (with constant difference 2). Notice that our original sequence had third differences (that is, differences of differences of differences of the original) constant. We will call such a sequence \(\Delta^3\)-constant. The sequence \(1, 4, 9, 16, \ldots\) has second differences constant, so it will be a \(\Delta^2\)-constant sequence. In general, we will say a sequence is a \(\Delta^k\)-constant sequence if the \(k\)th differences are constant. [🔗](#subsec-seq-higher-poly-5)

#### Example 4.3.4.

Which of the following sequences are \(\Delta^k\)-constant for some value of \(k\text{?}\)

1. \(2, 3, 7, 14, 24, 37,\ldots\text{.}\) [🔗](#example-deltak-1-1-3-1)
2. \(1, 8, 27, 64, 125, 216, \ldots\text{.}\) [🔗](#example-deltak-1-1-3-2)
3. \(1,2,4,8,16,32,64,\ldots\text{.}\) [🔗](#example-deltak-1-1-3-3)

[🔗](#example-deltak-1-1) Solution.

1. This is the sequence from [Example 4.3.3](sec_seq-polynomial.html#eg-sum-of-arithmetic), in which we found a closed formula by recognizing the sequence as the sequence of partial sums of an arithmetic sequence. Indeed, the sequence of first differences is \(1,4,7, 10, 13,\ldots\text{,}\) which itself has differences \(3,3,3,3,\ldots\text{.}\) Thus \(2, 3, 7, 14, 24, 37,\ldots\) is a \(\Delta^2\)-constant sequence. [🔗](#example-deltak-2-1-1-1)
2. These are the perfect cubes. The sequence of first differences is \(7, 19, 37, 61, 91, \ldots\text{;}\) the sequence of second differences is \(12, 18, 24, 30,\ldots\text{;}\) the sequence of third differences is constant: \(6,6,6,\ldots\text{.}\) Thus the perfect cubes are a \(\Delta^3\)-constant sequence. [🔗](#example-deltak-2-1-1-2)
3. If we take first differences, we get \(1,2,4,8,16,\ldots\text{.}\) Wait, what? That’s the sequence we started with. So taking second differences will give us the same sequence again. No matter how many times we repeat this we will always have the same sequence, which in particular means no finite number of differences will be constant. Thus this sequence is not \(\Delta^k\)-constant for any \(k\text{.}\) [🔗](#example-deltak-2-1-1-3)

[🔗](#example-deltak-2-1) [🔗](#example-deltak-2) [🔗](#example-deltak)The \(\Delta^0\)-constant sequences are themselves constant, so a closed formula for them is easy to compute (it’s just the constant). The \(\Delta^1\)-constant sequences are arithmetic, and we have a method for finding closed formulas for them as well. Every \(\Delta^2\)-constant sequence is the sum of an arithmetic sequence, so we can find formulas for these as well. But notice that the format of the closed formula for a \(\Delta^2\)-constant sequence is always quadratic. For example, the square numbers are \(\Delta^2\)-constant with closed formula \(a_n= n^2\text{.}\) The triangular numbers (also \(\Delta^2\)-constant) have closed formula \(a_n = \frac{n(n+1)}{2}\text{,}\) which when multiplied out gives you an \(n^2\) term as well. It appears that every time we increase the complexity of the sequence, that is, increase the number of differences before we get constants, we also increase the degree of the polynomial used for the closed formula. We go from constant to linear to quadratic. The sequence of differences between terms tells us something about the rate of growth of the sequence. If a sequence is growing at a constant rate, then the formula for the sequence will be linear. If the sequence is growing at a rate which itself is growing at a constant rate, then the formula is quadratic. You might have seen this elsewhere: If a function has a constant second derivative (rate of change), then the function must be quadratic.[🔗](#subsec-seq-higher-poly-7) This works in general:[🔗](#subsec-seq-higher-poly-8)

#### Theorem 4.3.5. Polynomial Fitting.

The closed formula for a sequence will be a degree \(k\) polynomial if and only if the sequence is \(\Delta^k\)-constant (i.e., the \(k\)th sequence of differences is constant).[🔗](#subsec-seq-higher-poly-9-2-1) [🔗](#subsec-seq-higher-poly-9)This tells us that the sequence of numbers of squares on a chessboard, \(1, 5, 14, 30, 55, \ldots\text{,}\) which we saw to be \(\Delta^3\)-constant, will have a cubic (degree 3 polynomial) for its closed formula.[🔗](#subsec-seq-higher-poly-10) Now once we know what format the closed formula for a sequence will take, it is much easier to actually find the closed formula. In the case that the closed formula is a degree \(k\) polynomial, we just need \(k+1\) data points to “fit” the polynomial to the data.[🔗](#subsec-seq-higher-poly-11)

#### Example 4.3.6.

Find a formula for the sequence \(3, 7, 14, 24,\ldots\text{.}\) Assume \(a_1 = 3\text{.}\)[🔗](#subsec-seq-higher-poly-12-1-1) Solution. First, check to see if the formula has constant differences at some level. The sequence of first differences is \(4, 7, 10, \ldots\) which is arithmetic, so the sequence of second differences is constant. The sequence is \(\Delta^2\)-constant, so the formula for \(a_n\) will be a degree 2 polynomial. That is, we know that for some constants \(a\text{,}\) \(b\text{,}\) and \(c\text{,}\) \begin{equation*} a_n = an^2 + bn + c\text{.} \end{equation*} [🔗](#subsec-seq-higher-poly-12-2-1) Now to find \(a\text{,}\) \(b\text{,}\) and \(c\text{.}\) First, it would be nice to know what \(a_0\) is, since plugging in \(n = 0\) simplifies the above formula greatly. In this case, \(a_0 = 2\) (work backward from the sequence of constant differences). Thus \begin{equation*} a_0 = 2 = a\cdot 0^2 + b \cdot 0 + c\text{,} \end{equation*} so \(c = 2\text{.}\) Now plug in \(n =1\) and \(n = 2\text{.}\) We get \begin{equation*} a_1 = 3 = a + b + 2 \end{equation*} \begin{equation*} a_2 = 7 = a4 + b 2 + 2\text{.} \end{equation*} [🔗](#subsec-seq-higher-poly-12-2-2) At this point, we have two (linear) equations and two unknowns, so we can solve the system for \(a\) and \(b\) (using substitution or elimination or even matrices). We find \(a = \frac{3}{2}\) and \(b = \frac{-1}{2}\text{,}\) so \(a_n = \frac{3}{2} n^2 - \frac{1}{2}n + 2\text{.}\)[🔗](#subsec-seq-higher-poly-12-2-3) [🔗](#subsec-seq-higher-poly-12-2) [🔗](#subsec-seq-higher-poly-12)

#### Example 4.3.7.

Find a closed formula for the number of squares on an \(n \times n\) chessboard.[🔗](#subsec-seq-higher-poly-13-1-1) Solution. We have seen that the sequence \(1, 5, 14, 30, 55, \ldots\) is \(\Delta^3\)-constant, so we are looking for a degree 3 polynomial. That is, \begin{equation*} a_n = an^3 + bn^2 + cn + d\text{.} \end{equation*} [🔗](#subsec-seq-higher-poly-13-2-1) We can find \(d\) if we know what \(a_0\) is. Working backward from the third differences, we find \(a_0 = 0\) (unsurprisingly, since there are no squares on a \(0\times 0\) chessboard). Thus \(d = 0\text{.}\) Now plug in \(n = 1\text{,}\) \(n =2\text{,}\) and \(n =3\text{:}\) \begin{align*} 1 = \amp a + b + c\\ 5 = \amp 8a + 4b + 2c\\ 14 = \amp 27a + 9b + 3c\text{.} \end{align*} [🔗](#subsec-seq-higher-poly-13-2-2) If we solve this system of equations, we get \(a = \frac{1}{3}\text{,}\) \(b = \frac{1}{2}\) and \(c = \frac{1}{6}\text{.}\) Therefore the number of squares on an \(n \times n\) chessboard is \(a_n = \frac{1}{3}n^3 + \frac{1}{2}n^2 + \frac{1}{6}n = \frac{1}{6}n(n+1)(2n+1)\text{.}\)[🔗](#subsec-seq-higher-poly-13-2-3) [🔗](#subsec-seq-higher-poly-13-2) [🔗](#subsec-seq-higher-poly-13)Note: Since the squares-on-a-chessboard problem is really asking for the sum of squares, we now have a nice formula for \(\d\sum_{k=1}^n k^2\text{.}\)[🔗](#subsec-seq-higher-poly-14)

#### Example 4.3.8.

Find a closed formula for \((a_n)_{n \ge 0}\) which starts \(2, 3, 7, 14, 24, 37,\ldots\text{.}\) Assume a recurrence relation for the sequence is \(a_n = a_{n-1} + 3n-2\)[🔗](#subsec-seq-higher-poly-15-1-1) Solution. Note that we have already done this in [Example 4.3.3](sec_seq-polynomial.html#eg-sum-of-arithmetic), but now we can solve this using polynomial fitting.[🔗](#subsec-seq-higher-poly-15-2-1) The sequence of (first) differences is \(1, 4, 7, 10, 13,\ldots\) (which agrees with what is given in the recurrence relation). The sequence of second differences is \(3, 3, 3, 3, \ldots\) constant! So we expect that the closed formula for \(a_n\) will be a degree 2 polynomial. That is, we guess, \begin{equation*} a_n = an^2 + bn + c\text{.} \end{equation*} [🔗](#subsec-seq-higher-poly-15-2-2) Since \(a_0 = 2\text{,}\) we know that \(c = 2\) (as \(a\cdot 0^2 + b\cdot 0^2 + c = 2\)). Then, we can see what happens with \(n = 1\) and \(n = 2\text{:}\) \begin{align*} a_1 = 3 = \amp a\cdot 1^2 + b\cdot 1 + 2\\ a_2 = 7 = \amp a\cdot 2^2 + b\cdot 2 + 2\text{.} \end{align*} Simplifying this, we must find \(a\) and \(b\) which satisfy the equations \begin{align*} 1 =\amp a +b\\ 5 = \amp 4a + 2b\text{.} \end{align*} Using a computer algebra system or substitution or elimination, we find that \(a = \frac{3}{2}\) and \(b = -\frac{1}{2}\text{.}\) Therefore the closed formula is, \begin{equation*} a_n = \frac{3}{2}n^2 - \frac{1}{2}n + 2\text{.} \end{equation*} This is the same as we found in [Example 4.3.3](sec_seq-polynomial.html#eg-sum-of-arithmetic), once you multiply out that solution. [🔗](#subsec-seq-higher-poly-15-2-3) [🔗](#subsec-seq-higher-poly-15-2) [🔗](#subsec-seq-higher-poly-15)Not all sequences will have polynomials as their closed formula. We can use the theory of finite differences to identify these.[🔗](#subsec-seq-higher-poly-16)

#### Example 4.3.9.

Determine whether the following sequences can be described by a polynomial, and if so, of what degree.

1. \(\displaystyle 1, 2, 4, 8, 16, \ldots\) [🔗](#subsec-seq-higher-poly-17-1-1-1-1)
2. \(\displaystyle 0, 7, 50, 183, 484, 1055, \ldots\) [🔗](#subsec-seq-higher-poly-17-1-1-1-2)
3. \(\displaystyle 1,1,2,3,5,8,13,\ldots\) [🔗](#subsec-seq-higher-poly-17-1-1-1-3)

[🔗](#subsec-seq-higher-poly-17-1-1) Solution.

1. As we saw in [Example 4.3.4](sec_seq-polynomial.html#example-deltak), this sequence is not \(\Delta^k\)-constant for any \(k\text{.}\) Therefore the closed formula for the sequence is not a polynomial. In fact, we know the closed formula is \(a_n = 2^n\text{,}\) which grows faster than any polynomial (so is not a polynomial).[🔗](#subsec-seq-higher-poly-17-2-1-1-1-1) [🔗](#subsec-seq-higher-poly-17-2-1-1-1)
2. The sequence of first differences is \(7, 43, 133, 301, 571,\ldots\text{.}\) The second differences are: \(36, 90, 168, 270,\ldots\text{.}\) Third differences: \(54, 78, 102,\ldots\text{.}\) Fourth differences: \(24, 24, \ldots\text{.}\) As far as we can tell, this sequence of differences is constant so the sequence is \(\Delta^4\)-constant, and as such the closed formula is a degree 4 polynomial.[🔗](#subsec-seq-higher-poly-17-2-1-1-2-1) [🔗](#subsec-seq-higher-poly-17-2-1-1-2)
3. This is the Fibonacci sequence. The sequence of first differences is \(0, 1, 1, 2, 3, 5, 8, \ldots\text{,}\) the second differences are \(1, 0, 1, 1, 2, 3, 5\ldots\text{.}\) We notice that after the first few terms, we get the original sequence back. So there will never be constant differences, so the closed formula for the Fibonacci sequence is not a polynomial.[🔗](#subsec-seq-higher-poly-17-2-1-1-3-1) [🔗](#subsec-seq-higher-poly-17-2-1-1-3)

[🔗](#subsec-seq-higher-poly-17-2-1) [🔗](#subsec-seq-higher-poly-17-2) [🔗](#subsec-seq-higher-poly-17)

#### Warning 4.3.10.

A degree \(n\) polynomial is completely determined by its \(n+1\) coefficients (the \(+1\) is because of the constant term). Therefore we can always find a degree \(n\) polynomial when given \(n+1\) terms of a sequence.[🔗](#subsec-seq-higher-poly-18-1) If we take the \(n+1\) terms, we can take differences of differences of differences of... until (after \(n\) steps) we are left with just a single number. As far as we can tell, this \(n\)th difference is constant. This doesn’t mean we have found the closed formula for the *right* sequence. This is why it is so important to work with sequences in a particular context.[🔗](#subsec-seq-higher-poly-18-2) [🔗](#subsec-seq-higher-poly-18)[🔗](#subsec-seq-higher-poly)

### Subsection Solving Systems of Equations with Technology

The point of polynomial fitting is that if we can be sure that a sequence has a polynomial as its closed formula, then we can find that formula. Since we know the degree of the polynomial, all we need is to find its coefficients, and with enough terms of the sequence, we can find a system of enough linear equations whose solution will be those coefficients. However, this requires solving a system of linear equations.[🔗](#sec_seq-polynomial-7-2) For a degree 2 polynomial, we need to find three coefficients (the constant term, the coefficient of \(n\text{,}\) and the coefficient of \(n^2\)). A system of three linear equations will be enough to find these three unknowns. In fact, since \(a_0\) will be the constant term, we can really get away with just two equations and two unknowns, and this is not difficult to solve by hand.[🔗](#sec_seq-polynomial-7-3) For higher degree polynomials, the number of equations is larger, and solving by hand can be tedious. Luckily, it is easy for computers to solve these equations. Below we demonstrate how to use the free computer algebra system SageMath, as well as python, to solve these systems of equations. Besides these two choices, pretty much any computer algebra system (including Wolfram Alpha) can solve these systems of equations.[🔗](#sec_seq-polynomial-7-4) Suppose we have the following system of three equations and three unknowns, as in the chess board example above: \begin{align*} 1 = \amp a + b + c\\ 5 = \amp 8a + 4b + 2c\\ 14 = \amp 27a + 9b + 3c \end{align*} [🔗](#sec_seq-polynomial-7-5) In SageMath, we can use the solve method to solve the system of equations. Here is the code:[🔗](#sec_seq-polynomial-7-6) var('a b c') solve( [ a+b+c==1, 8*a+4*b+2*c==5, 27*a+9*b+3*c==14 ], a,b,c) This is easier than in python, but python might be more readily available. One way you can solve the system in python is to use the numpy library. In this case, you would create a matrix of coefficients and a vector of constants, and then use the solve method. Here is the code:[🔗](#sec_seq-polynomial-7-8)

```python
import numpy as np
A = np.array([[1,1,1],[8,4,2],[27,9,3]])
b = np.array([1,5,14])
x = np.linalg.solve(A,b)
print(x)
```

An explanation of what is going on here: We create a matrix `A` of coefficients of the system of equations (not the coefficients of the closed formula we are looking for), \begin{equation*} A = \begin{bmatrix} 1 \amp 1 \amp 1 \\ 8 \amp 4 \amp 2 \\ 27 \amp 9 \amp 3 \end{bmatrix} \end{equation*} and a vector `b` for the constants, \begin{equation*} b = \begin{bmatrix} 1 \\ 5 \\ 14 \end{bmatrix}\text{.} \end{equation*} What numpy does is solve the matrix equation \begin{equation*} Ax = b\text{.} \end{equation*} The vector \(x\) that satisfies this matrix equation will be the values of the unknowns in the system (so the vector \([a,b,c]\)). [🔗](#sec_seq-polynomial-7-10) Of course, once you find the coefficients of the polynomial, you should still write out the closed formula using those coefficients. It is always a good idea to check that the formula appears to work by using an \(n\) that you did not use to get your system of equations.[🔗](#sec_seq-polynomial-7-11) [🔗](#sec_seq-polynomial-7)

### Reading Questions Reading Questions

#### 1.

- \(3,7,11,15,19,\ldots\)
- Linear formula
- \(3,5,8,12,17,\ldots\)
- Quadratic formula
- \(3,4,7,13,23,\ldots\)
- Cubic formula
- \(3,4,7,11,18,29,\ldots\)
- Exponential (not a polynomial)

[🔗](#rq-seq-polyfit-match)

#### 2.

Suppose \((a_n)\) is a sequence whose sequence of differences has a degree 2 polynomial as its closed formula. What can you say about the sequence of partial sums of \((a_n)\text{?}\) Explain.[🔗](#rq-seq-polyfit-fr-1-1) [🔗](#rq-seq-polyfit-fr)

#### 3.

What questions do you have? Write at least one question about the content of this section that you or a classmate might be curious about after reading this section.[🔗](#rq-seq-polyfit-q-1-1) [🔗](#rq-seq-polyfit-q)[🔗](#rqs-seq-polyfit)

### Exercises Practice Problems

#### 1.

Activate Consider the sequence \(10, 14, 18, 22, 26, \ldots\) with \(a_1 = 10\text{.}\)[🔗](#extracted-webwork-198-1-1-1)

1. Which of the following is a recursive definition for the sequence. Select all that apply. \(a_n = 4 \cdot a_{n-1}\); \(a_1 = 10\)[🔗](#extracted-webwork-198-1-1-2-1-1-1-1-1-1) [🔗](#extracted-webwork-198-1-1-2-1-1-1-1-1)
2. \(a_n = 10 \cdot 4^n\)[🔗](#extracted-webwork-198-1-1-2-1-1-1-1-2-1) [🔗](#extracted-webwork-198-1-1-2-1-1-1-1-2)
3. \(a_n = a_{n-1} + 4\); \(a_1 = 10\)[🔗](#extracted-webwork-198-1-1-2-1-1-1-1-3-1) [🔗](#extracted-webwork-198-1-1-2-1-1-1-1-3)
4. \(a_n = a_{n-1} + a_{n-2}\); \(a_1 = 10\)[🔗](#extracted-webwork-198-1-1-2-1-1-1-1-4-1) [🔗](#extracted-webwork-198-1-1-2-1-1-1-1-4)
5. Give a closed formula for the \(n\)th term of the sequence.[🔗](#extracted-webwork-198-1-1-2-1-2-1) \(a_n =\) [🔗](#extracted-webwork-198-1-1-2-1-2-2) [🔗](#extracted-webwork-198-1-1-2-1-2)
6. Is 2030 a term in the sequence? Yes, it is \(a_{2030}\)[🔗](#extracted-webwork-198-1-1-2-1-3-1-1-1-1) [🔗](#extracted-webwork-198-1-1-2-1-3-1-1-1)
7. Yes, it is \(a_{506}\)[🔗](#extracted-webwork-198-1-1-2-1-3-1-1-2-1) [🔗](#extracted-webwork-198-1-1-2-1-3-1-1-2)
8. No, it is between 2028 and 2032[🔗](#extracted-webwork-198-1-1-2-1-3-1-1-3-1) [🔗](#extracted-webwork-198-1-1-2-1-3-1-1-3)
9. No, it is larger than 550[🔗](#extracted-webwork-198-1-1-2-1-3-1-1-4-1) [🔗](#extracted-webwork-198-1-1-2-1-3-1-1-4)
10. Yes, it is \(a_{505}\)[🔗](#extracted-webwork-198-1-1-2-1-3-1-1-5-1) [🔗](#extracted-webwork-198-1-1-2-1-3-1-1-5)
11. How many terms does the finite sequence \(10, 14, 18, 22, 26, \ldots, {550}\) have?[🔗](#extracted-webwork-198-1-1-2-1-4-1) [🔗](#extracted-webwork-198-1-1-2-1-4)
12. Find the sum: \(10 + 14 + 18 + 22 + 26 + \cdots + {550}\)[🔗](#extracted-webwork-198-1-1-2-1-5-1) [🔗](#extracted-webwork-198-1-1-2-1-5)
13. Use what you found above to find \(b_n\text{,}\) the \(n\)th term of \(5, {15}, {29}, {47}, {69}, \ldots\) where \(b_0 = 5\text{.}\)[🔗](#extracted-webwork-198-1-1-2-1-6-1) \(b_n =\)[🔗](#extracted-webwork-198-1-1-2-1-6-2) [🔗](#extracted-webwork-198-1-1-2-1-6)

[🔗](#extracted-webwork-198-1-1-2) [🔗](#ww-arithgeom-multipart)

#### 2.

Activate Consider the sequence \((a_n)_{n \ge 0}\) which starts \(2, 14, 26, 38, \ldots\text{.}\)[🔗](#extracted-webwork-199-1-1-1)

1. What is the next term in the sequence?[🔗](#extracted-webwork-199-1-1-2-1-1-1) [🔗](#extracted-webwork-199-1-1-2-1-1)
2. Find a formula for the \(n\)th term of this sequence.[🔗](#extracted-webwork-199-1-1-2-1-2-1) \(a_n =\) [🔗](#extracted-webwork-199-1-1-2-1-2-2) [🔗](#extracted-webwork-199-1-1-2-1-2)
3. Find the sum of the first 100 terms of the sequence: \(\sum_{k=0}^{99}a_k\text{.}\)[🔗](#extracted-webwork-199-1-1-2-1-3-1) [🔗](#extracted-webwork-199-1-1-2-1-3)

[🔗](#extracted-webwork-199-1-1-2) [🔗](#ww-arithgeom-arith-w-sum)

#### 3.

Activate Consider the sum \(3 + 12 + 21 + 30 + \cdots + 291\text{.}\)[🔗](#extracted-webwork-200-1-1-1)

1. How many terms (summands) are in the sum?[🔗](#extracted-webwork-200-1-1-2-1-1-1) [🔗](#extracted-webwork-200-1-1-2-1-1)
2. Compute the sum using a technique discussed in this section.[🔗](#extracted-webwork-200-1-1-2-1-2-1) [🔗](#extracted-webwork-200-1-1-2-1-2)

[🔗](#extracted-webwork-200-1-1-2) [🔗](#ww-arithgeom-arith-sum)

#### 4.

Activate Consider the sequence \(10, 15, 20, 25, \ldots, 5n + 0\text{.}\)[🔗](#extracted-webwork-201-1-1-1)

1. How many terms are there in the sequence? Your answer will be in terms of \(n\text{.}\)[🔗](#extracted-webwork-201-1-1-2-1-1-1) [🔗](#extracted-webwork-201-1-1-2-1-1)
2. What is the second-to-last term?[🔗](#extracted-webwork-201-1-1-2-1-2-1) [🔗](#extracted-webwork-201-1-1-2-1-2)
3. Find the sum of all the terms in the sequence, in terms of \(n\text{.}\)[🔗](#extracted-webwork-201-1-1-2-1-3-1) [🔗](#extracted-webwork-201-1-1-2-1-3)

[🔗](#extracted-webwork-201-1-1-2) [🔗](#ww-arithgeom-arith-w-sum2)

#### 5.

Activate Find \(6 + 17 + 28 + 39+ \cdots + 3823\) using a technique from this section.[🔗](#extracted-webwork-202-1-1-1) [🔗](#ww-arithgoem-arith-sum2)

#### 6.

Activate Use polynomial fitting to find the formula for the \(n\)th term of the sequence \((a_n)_{n \ge 0}\) which starts,[🔗](#extracted-webwork-203-1-1-1) \({0, 5, 14, 27, 44, 65}, \ldots\)[🔗](#extracted-webwork-203-1-1-2) \(a_n =\) [🔗](#extracted-webwork-203-1-1-3) [🔗](#ww-poly-1)

#### 7.

Activate Use polynomial fitting to find the formula for the \(n\)th term of the sequence \((a_n)_{n \ge 0}\) which starts,[🔗](#extracted-webwork-204-1-1-1) \({-1, 2, 7, 14, 23, 34}, \ldots\)[🔗](#extracted-webwork-204-1-1-2) \(a_n =\) [🔗](#extracted-webwork-204-1-1-3) [🔗](#ww-poly-2)

#### 8.

Activate Use polynomial fitting to find the formula for the \(n\)th term of the sequence \((a_n)_{n \ge 0}\) which starts,[🔗](#extracted-webwork-205-1-1-1) \begin{equation*} {-1, 4, 18, 50, 109, 204}, \ldots \end{equation*} [🔗](#extracted-webwork-205-1-1-2) \(a_n =\) [🔗](#extracted-webwork-205-1-1-3) [🔗](#ww-poly-3)

#### 9.

Activate Use polynomial fitting to find the formula for the \(n\)th term of the sequence \((a_n)_{n \ge 1}\) which starts,[🔗](#extracted-webwork-206-1-1-1) \({5, 36, 107, 236, 441}, \ldots\) Note the first term above is \(a_1\text{,}\) not \(a_0\text{.}\)[🔗](#extracted-webwork-206-1-1-2) \(a_n =\) [🔗](#extracted-webwork-206-1-1-3) [🔗](#ww-poly-4)

#### 10.

Activate Suppose Suppose \(a_n = {3n^{2}-3n-5}\text{.}\) Find a closed formula for the sequence of differences by computing \(a_n - a_{n-1}\text{.}\) Simplify your answer as much as posible.[🔗](#extracted-webwork-207-1-1-1) \(a_n - a_{n-1} =\) [🔗](#extracted-webwork-207-1-1-2) [🔗](#ww-poly-diff)

#### 11.

Activate Use polynomial fitting to find the formula for the \(n\)th term of the sequence \((a_n)_{n \ge 1}\) which starts,[🔗](#extracted-webwork-208-1-1-1) \({8, 34, 84, 164, 280}, \ldots\) Note the first term above is \(a_1\text{,}\) not \(a_0\text{.}\)[🔗](#extracted-webwork-208-1-1-2) \(a_n =\) [🔗](#extracted-webwork-208-1-1-3) [🔗](#ww-poly-5)[🔗](#practice_seq-polynomial)

### Exercises Additional Exercises

#### 1.

Your friendly neighborhood bodega has a candy machine that gives 7 Skittles to the first customer who puts in a quarter, 10 to the second, 13 to the third, 16 to the fourth, etc. How many candies has the machine given out in total after 20 quarters are put into the machine? After \(n\) quarters?[🔗](#exercises_seq-polynomial-2-1-1) [🔗](#exercises_seq-polynomial-2)

#### 2.

Not to be outdone, the mega-mart across the street has installed a candy machine that gives 4 Skittles to the first customer, 7 to the second, 12 to the third, 19 to the fourth, etc. How many Skittles has the machine given out in total after 20 quarters are put into the machine? After \(n\) quarters?[🔗](#exercises_seq-polynomial-3-1-1) [🔗](#exercises_seq-polynomial-3)

#### 3.

Make up sequences that have

1. 3, 3, 3, 3, … as its second differences. [🔗](#exercises_seq-polynomial-4-1-1-1-1)
2. 1, 2, 3, 4, 5, … as its third differences. [🔗](#exercises_seq-polynomial-4-1-1-1-2)
3. 1, 2, 4, 8, 16, … as its 100th differences. [🔗](#exercises_seq-polynomial-4-1-1-1-3)

[🔗](#exercises_seq-polynomial-4-1-1) [🔗](#exercises_seq-polynomial-4)

#### 4.

Consider the sequence \(1, 3, 7, 13, 21, \ldots\text{.}\) Explain how you know the closed formula for the sequence will be quadratic. Then “guess” the correct formula by comparing this sequence to the squares \(1, 4, 9, 16, \ldots\) (do not use polynomial fitting).[🔗](#exercises_seq-polynomial-5-1-1) [🔗](#exercises_seq-polynomial-5)

#### 5.

Use a similar technique as in the previous exercise to find a closed formula for the sequence \(2, 11, 34, 77, 146, 247,\ldots\text{.}\)[🔗](#exercises_seq-polynomial-6-1-1) [🔗](#exercises_seq-polynomial-6)

#### 6.

Consider the sequence \(2, 7, 15, 26, 40, 57, \ldots\) (with \(a_0 = 2\)). By looking at the differences between terms, express the sequence as a sequence of partial sums. Then find a closed formula for the sequence by computing the \(n\)th partial sum.[🔗](#exercises_seq-polynomial-7-1-1) [🔗](#exercises_seq-polynomial-7)

#### 7.

If you have enough toothpicks, you can make a large triangular grid. Below, are the triangular grids of size 1 and of size 2. The size 1 grid requires 3 toothpicks, the size 2 grid requires 9 toothpicks.[🔗](#exercises_seq-polynomial-8-1-1) ![Three toothpicks arranged as the sides of an equilateral triangle.](generated/latex-image/exercises_seq-polynomial-8-1-2-1.svg) ![Nine toothpicks arranged into a triangle with two toothpicks forming each edge, and an upside-down triangle in the center.](generated/latex-image/exercises_seq-polynomial-8-1-2-2.svg)

1. Let \(t_n\) be the number of toothpicks required to make a size \(n\) triangular grid. Write out the first 5 terms of the sequence \(t_1, t_2, \ldots\text{.}\)[🔗](#exercises_seq-polynomial-8-1-3-1-1-1) [🔗](#exercises_seq-polynomial-8-1-3-1-1)
2. Find a recursive definition for the sequence. Explain why you are correct.[🔗](#exercises_seq-polynomial-8-1-3-1-2-1) [🔗](#exercises_seq-polynomial-8-1-3-1-2)
3. Is the sequence arithmetic or geometric? If not, is it the sequence of partial sums of an arithmetic or geometric sequence? Explain why your answer is correct.[🔗](#exercises_seq-polynomial-8-1-3-1-3-1) [🔗](#exercises_seq-polynomial-8-1-3-1-3)
4. Use your results from part (c) to find a closed formula for the sequence. Show your work.[🔗](#exercises_seq-polynomial-8-1-3-1-4-1) [🔗](#exercises_seq-polynomial-8-1-3-1-4)

[🔗](#exercises_seq-polynomial-8-1-3) [🔗](#exercises_seq-polynomial-8)

#### 8.

If you were to shade in an \(n\times n\) square on graph paper, you could do it the boring way (with sides parallel to the edge of the paper) or the interesting way, as illustrated below:[🔗](#exercises_seq-polynomial-9-1-1) ![One square.](generated/latex-image/exercises_seq-polynomial-9-1-2-1.svg) ![Five squares arranged as a plus sign. Viewed another way, the squares are arranged in three centered rows of 1, 3, and 1 squares.](generated/latex-image/exercises_seq-polynomial-9-1-2-2.svg) ![13 squares arranged in five centered rows, containing 1, 3, 5, 3, and 1 square each.](generated/latex-image/exercises_seq-polynomial-9-1-2-3.svg) ![25 squares arranged in rows of length 1, 3, 5, 7, 5, 3, and 1.](generated/latex-image/exercises_seq-polynomial-9-1-2-4.svg) The interesting thing here is that a \(3\times 3\) square now has area 13. Our goal is to find a formula for the area of an \(n \times n\) (diagonal) square.

1. Write out the first few terms of the sequence of areas (assume \(a_1 = 1\text{,}\) \(a_2 = 5\text{,}\) etc). Is the sequence arithmetic or geometric? If not, is it the sequence of partial sums of an arithmetic or geometric sequence? Explain why your answer is correct, referring to the diagonal squares.[🔗](#exercises_seq-polynomial-9-1-3-3-1-1) [🔗](#exercises_seq-polynomial-9-1-3-3-1)
2. Use your results from part (a) to find a closed formula for the sequence. Show your work. Note that while there are lots of ways to find a closed formula here, you should use partial sums specifically.[🔗](#exercises_seq-polynomial-9-1-3-3-2-1) [🔗](#exercises_seq-polynomial-9-1-3-3-2)
3. Find the closed formula in as many other interesting ways as you can.[🔗](#exercises_seq-polynomial-9-1-3-3-3-1) [🔗](#exercises_seq-polynomial-9-1-3-3-3)

[🔗](#exercises_seq-polynomial-9-1-3) [🔗](#exercises_seq-polynomial-9)

#### 9.

Generalize [Practice Problem 5](sec_seq-polynomial.html#ww-poly-diff): Find a closed formula for the sequence of differences of \(a_n = an^2 + bn + c\text{.}\) That is, prove that every quadratic sequence has arithmetic differences.[🔗](#exercises_seq-polynomial-10-1-1) [🔗](#exercises_seq-polynomial-10)

#### 10.

Can you use polynomial fitting to find the formula for the \(n\)th term of the sequence 4, 7, 11, 18, 29, 47, …? Explain why or why not.[🔗](#exercises_seq-polynomial-11-1-1) [🔗](#exercises_seq-polynomial-11)

#### 11.

Will the \(n\)th sequence of differences of \(2, 6, 18, 54, 162, \ldots\) ever be constant? Explain.[🔗](#exercises_seq-polynomial-12-1-1) [🔗](#exercises_seq-polynomial-12)

#### 12.

In their down time, ghost pirates enjoy stacking cannonballs in triangular based pyramids (aka, tetrahedrons), like those pictured here:[🔗](#exercises_seq-polynomial-13-2-1) ![A single shaded circle (meant to represent a cannonball)](generated/latex-image/exercises_seq-polynomial-13-2-2-1.svg) ![Four overlapping circles, drawn to represent cannonballs stacked with a layer of three in a triangle with a single cannonball resting on top.](generated/latex-image/exercises_seq-polynomial-13-2-2-2.svg) ![Overlapping circles drawn to represent a three-dimensional tetrahedron of balls consisting of a triangle of 6 balls supporting a triangle of 3, with a single ball balanced on top.](generated/latex-image/exercises_seq-polynomial-13-2-2-3.svg) Note: These are solid tetrahedrons, so there will be some cannonballs obscured from view (the picture on the right has one cannonball in the back not shown in the picture, for example).[🔗](#exercises_seq-polynomial-13-2-3) The pirates wonder how many cannonballs would be required to build a pyramid 15 layers high (thus breaking the world cannonball stacking record). Can you help?

1. Let \(P(n)\) denote the number of cannonballs needed to create a pyramid \(n\) layers high. So \(P(1) = 1\text{,}\) \(P(2) = 4\text{,}\) and so on. Calculate \(P(3)\text{,}\) \(P(4)\text{,}\) and \(P(5)\text{.}\)[🔗](#exercises_seq-polynomial-13-2-4-1-1-1) [🔗](#exercises_seq-polynomial-13-2-4-1-1)
2. Use polynomial fitting to find a closed formula for \(P(n)\text{.}\) Show your work.[🔗](#exercises_seq-polynomial-13-2-4-1-2-1) [🔗](#exercises_seq-polynomial-13-2-4-1-2)
3. Answer the pirate’s question: How many cannonballs do they need to make a pyramid 15 layers high?[🔗](#exercises_seq-polynomial-13-2-4-1-3-1) [🔗](#exercises_seq-polynomial-13-2-4-1-3)
4. Bonus: Locate this sequence in Pascal’s triangle. Why does that make sense? [🔗](#exercises_seq-polynomial-13-2-4-1-4-1) [🔗](#exercises_seq-polynomial-13-2-4-1-4)

[🔗](#exercises_seq-polynomial-13-2-4) [🔗](#exercises_seq-polynomial-13)[🔗](#exercises_seq-polynomial)[🔗](#sec_seq-polynomial) [&#xe5cb;Prev](sec_seq-growth.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_seq-exponential.html) [Feedback](/cdn-cgi/l/email-protection#e8879b8b899ac6848d9e8186a89d868b87c68d8c9d)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_seq-polynomial-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_seq-polynomial-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
