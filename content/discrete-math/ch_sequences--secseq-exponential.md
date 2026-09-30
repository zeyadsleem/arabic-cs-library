---
title: "Exponential Sequences"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_seq-exponential.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 4.4 Exponential Sequences

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_seq-exponential-3-1-1)

1. Identify a sequence as exponential based on its recurrence relation.[🔗](#sec_seq-exponential-3-2-1-1) [🔗](#sec_seq-exponential-3-2-1)
2. Apply the characteristic root technique to solve appropriate recurrence relations.[🔗](#sec_seq-exponential-3-2-2-1) [🔗](#sec_seq-exponential-3-2-2)

[🔗](#sec_seq-exponential-3)

### Subsection Section Preview

#### Investigate!

You have a large collection of \(1\times 1\) squares and \(1\times 2\) dominoes. You want to arrange these to make a \(1 \times 15\) strip. How many ways can you do this?[🔗](#sec_seq-exponential-4-2-2-1) What if the squares come in three different colors and the dominos come in four different colors? And why is this second question easier than the first?[🔗](#sec_seq-exponential-4-2-2-2) Hint. Start by creating a recurrence relation. How are the different \(1\times 3\) strips and \(1 \times 4\) strips related to the \(1 \times 5\) strips?[🔗](#sec_seq-exponential-4-2-3-1) [🔗](#sec_seq-exponential-4-2-3) [🔗](#sec_seq-exponential-4-2)In [Section 4.3](sec_seq-polynomial.html) we saw that if a sequence has some sequence of differences that is constant, then the sequence has a polynomial closed formula. Are there sequences that never have constant differences? And what would their closed formulas look like?[🔗](#sec_seq-exponential-4-3) Consider the Fibonacci sequence: \begin{equation*} 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, \ldots\text{.} \end{equation*} If we look at the first differences, we get this sequence: \begin{equation*} 1, 1, 2, 3, 5, 8, 13, 21, 34, \ldots\text{,} \end{equation*} which is the Fibonacci sequence itself. This is not surprising, since the Fibonacci sequence is defined by the recurrence relation \(F_n = F_{n-1} + F_{n-2}\text{.}\) That is saying precisely that to get the next turn of the sequence, we take the current term and add... a term in the sequence! [🔗](#sec_seq-exponential-4-4) Of course, if we take another difference, we will get the same sequence back, and again and again, so no \(n\)th differences will be constant.[🔗](#sec_seq-exponential-4-5) Another sequence that has this behavior is the powers of 2: \begin{equation*} 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, \ldots \end{equation*} which has differences \begin{equation*} 1, 2, 4, 8, 16, 32, 64, 128, 256, \ldots\text{.} \end{equation*} We can also see this from the recurrence relation, since \begin{equation*} a_n = 2a_{n-1} = a_{n-1} + a_{n-1}\text{.} \end{equation*} The rate of growth for this, and in fact any geometric sequence, is the sequence itself. [🔗](#sec_seq-exponential-4-6) If you have studied calculus, you may recall that the functions that have themselves (or close) as their rate of change (derivative, in the calculus context) are exactly the exponential functions. Here too, geometric sequences, which have exponential closed formulas, have themselves as their rate of change.[🔗](#sec_seq-exponential-4-7) In this section, we will explore sequences that are changing at a rate proportional to the sequence itself, and see how these all have an exponential closed formula, or some variation of that.[🔗](#sec_seq-exponential-4-8)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-seq-exponential)

#### 1.

Activate Consider the recurrence relation[🔗](#extracted-webwork-209-1-1-1) \begin{equation*} a_n = 5a_{n-1} - 6a_{n-2} \text{.} \end{equation*} [🔗](#extracted-webwork-209-1-1-2) Since the \(n\)th term is given as a combination of the two previous terms, we will need two initial terms to determine the sequence. Different initial terms will give different sequences.[🔗](#extracted-webwork-209-1-1-3)

#### (a)

What sequence do you get if the initial conditions are \(a_0 = 1\text{,}\) \(a_1 = 2\text{?}\) Give the first five terms (including 1 and 2).[🔗](#extracted-webwork-209-1-2-1-1) [🔗](#extracted-webwork-209-1-2)

#### (b)

Based on the first few terms, what is a closed formula for this sequence?[🔗](#extracted-webwork-209-1-3-1-1) \(a_n =\)[🔗](#extracted-webwork-209-1-3-1-2) [🔗](#extracted-webwork-209-1-3)

#### (c)

What sequence do you get if the initial conditions are \(a_0 = 1\text{,}\) \(a_1 = 3\text{?}\) Give the first five terms.[🔗](#extracted-webwork-209-1-4-1-1) [🔗](#extracted-webwork-209-1-4)

#### (d)

Based on the first few terms, what is a closed formula for this sequence?[🔗](#extracted-webwork-209-1-5-1-1) \(a_n =\)[🔗](#extracted-webwork-209-1-5-1-2) [🔗](#extracted-webwork-209-1-5)

#### (e)

What sequence do you get if the initial conditions are \(a_0 = 2\text{,}\) \(a_1 = 5\text{?}\) Give the first five terms.[🔗](#extracted-webwork-209-1-6-1-1) [🔗](#extracted-webwork-209-1-6)

#### (f)

Based on the first few terms, what is a closed formula for this sequence?[🔗](#extracted-webwork-209-1-7-1-1) \(a_n =\)[🔗](#extracted-webwork-209-1-7-1-2) Hint. How do the terms in this sequence relate to the terms in the previous two sequences?[🔗](#extracted-webwork-209-1-7-2-1) [🔗](#extracted-webwork-209-1-7-2) [🔗](#extracted-webwork-209-1-7) [🔗](#pa-seq-exponential)[🔗](#PA-seq-exponential)[🔗](#sec_seq-exponential-4)

### Subsection Summing Geometric Sequences: Multiply, Shift, and Subtract

Suppose a candy machine dispenses candy in a geometric sequence by first giving 1 candy, then 2 candies, then 4, then 8, and so on. How many candies will you have received in total after 10 turns of the machine?[🔗](#subsec-sum-geometric-3) We can create the sequence of partials sum as \(1, 1+2, 1+2+4, 1+2+4+8, \ldots\) that gives \begin{equation*} 1, 3, 7, 15, 31, 63, \ldots \end{equation*} This is not a geometric sequence, but is almost. In fact, if we add 1 to each term, we get what sure looks like the geometric sequence \(2, 4, 8, 16, 32, 64,\ldots\text{,}\) so we might guess that the closed formula for the sequence of sums is \(2^{n+1} - 1\text{.}\) If this is correct, then the answer to the candy question would be \(2^{11} - 1 = 2047\text{.}\) [🔗](#subsec-sum-geometric-4) More intriguing though is the observation that the sequence of partial sums of a geometric sequence is again geometric-ish. Let’s consider how to find the sum of a geometric sequence in general.[🔗](#subsec-sum-geometric-5) We cannot just reverse and add as we did for the sum of an arithmetic sequence. Do you see why? The reason we got the same term added to itself many times is because there was a constant difference. So as we added that difference in one direction, we subtracted the difference going the other way, leaving a constant total. For geometric sums; we have a different technique.[🔗](#subsec-sum-geometric-6)

#### Example 4.4.1.

What is \(3 + 6 + 12 + 24 + \cdots + 12288\text{?}\)[🔗](#subsec-sum-geometric-7-1-1) Solution. Multiply each term by 2, the common ratio. We get \(2S = 6 + 12 + 24 + \cdots + 24576\text{.}\) Now subtract: \(2S - S = -3 + 24576 = 24573\text{.}\) Since \(2S - S = S\text{,}\) we have our answer.[🔗](#subsec-sum-geometric-7-2-1) [🔗](#subsec-sum-geometric-7-2) [🔗](#subsec-sum-geometric-7)To better see what happened in the above example, we can write it this way:[🔗](#subsec-sum-geometric-8)

| \(S=\) | \(3 \, +\) | \(6 + 12 + 24 + \cdots + 12288\) |  |
| --- | --- | --- | --- |
| \(- \qquad 2S=\) |  | \(6 + 12 + 24 + \cdots + 12288\) | \(+ 24576\) |
| \(-S = \) | \(3 \, +\) | \(0 + 0 + 0 + \cdots + 0 \) | \(-24576\) |

Then divide both sides by \(-1\) and we have the same result for \(S\text{.}\) The idea is, by multiplying the sum by the common ratio, each term becomes the next term. We shift over the sum to get the subtraction to mostly cancel out, leaving just the first term and the new last term.[🔗](#subsec-sum-geometric-10)

#### Example 4.4.2.

Find a closed formula for \(S(n) = 2 + 10 + 50 + \cdots + 2\cdot 5^n\text{.}\)[🔗](#subsec-sum-geometric-11-1-1) Solution. The common ratio is 5. So we have[🔗](#subsec-sum-geometric-11-2-1)

| \(S\) | \(= 2 + 10 + 50 + \cdots + 2\cdot 5^n\) |
| --- | --- |
| \(- \qquad 5S\) | \(= ~~~~~~10 + 50 + \cdots + 2\cdot 5^n + 2\cdot5^{n+1}\) |
| \(-4S\) | \(= 2 - 2\cdot5^{n+1}\) |

Thus \(S = \dfrac{2-2\cdot 5^{n+1}}{-4}\)[🔗](#subsec-sum-geometric-11-2-3) [🔗](#subsec-sum-geometric-11-2) [🔗](#subsec-sum-geometric-11)Even though this might seem like a new technique, you have probably used it before.[🔗](#subsec-sum-geometric-12)

#### Example 4.4.3.

Express \(0.464646\ldots\) as a fraction.[🔗](#subsec-sum-geometric-13-1-1) Solution. Let \(N = 0.46464646\ldots\text{.}\) Consider \(0.01N\text{.}\) We get:[🔗](#subsec-sum-geometric-13-2-1)

| \(N =\) | \(0.4646464\ldots\) |
| --- | --- |
| \(- \qquad 0.01N =\) | \(0.00464646\ldots\) |
| \(0.99N =\) | \(0.46\) |

So \(N = \frac{46}{99}\text{.}\) What have we done? We viewed the repeating decimal \(0.464646\ldots\) as a sum of the geometric sequence \(0.46, 0.0046, 0.000046, \ldots\) The common ratio is \(0.01\text{.}\) The only real difference is that we are now computing an *infinite* geometric sum, we do not have the extra “last” term to consider. Really, this is the result of taking a limit as we would in calculus when we compute *infinite* geometric sums.[🔗](#subsec-sum-geometric-13-2-3) [🔗](#subsec-sum-geometric-13-2) [🔗](#subsec-sum-geometric-13)To summarize, we now can find a closed formula for a sequence \(a_n\) that has a rate of growth that is an exponential function: \(a_n - a_{n-1} = b_n\text{,}\) where \(b_n\) is a geometric sequence (i.e., an exponential function). What sort of closed formula do we get here? It’s *another* exponential function![🔗](#subsec-sum-geometric-14) [🔗](#subsec-sum-geometric)

### Subsection The Characteristic Root Technique

Suppose we want to solve a recurrence relation expressed as a combination of the two previous terms, such as \(a_n = a_{n-1} + 6a_{n-2}\text{.}\) In other words, we want to find a function of \(n\) which satisfies \(a_n - a_{n-1} - 6a_{n-2} = 0\text{.}\) Think about how we build up this sequence iteratively. \begin{align*} a_2 \amp = a_1 + 6a_0 \\ a_3 \amp = a_2 + 6a_1 = a_1 + 6a_0 + 6a_1\\ a_4 \amp = a_3 + 6a_2 = a_1 + 6a_0 + 6a_1 + 6^2a_0 +6a_1 \end{align*} Let’s stop there and agree this is getting very complicated. However, we do notice that in each step, we would, among other things, multiply a previous iteration by 6. So our closed formula would include \(6\) multiplied some number of times. Thus it is reasonable to guess the solution will contain parts that look geometric. Perhaps the solution will take the form \(r^n\) for some constant \(r\text{.}\) [🔗](#sec_seq-exponential-6-3) The nice thing is, we know how to check whether a formula is actually a solution to a recurrence relation: plug it in. What happens if we plug in \(r^n\) into the recursion above? We get \begin{equation*} r^n - r^{n-1} - 6r^{n-2} = 0\text{.} \end{equation*} [🔗](#sec_seq-exponential-6-4) Now solve for \(r\text{:}\) \begin{equation*} r^{n-2}(r^2 - r - 6) = 0\text{,} \end{equation*} so by factoring, \(r = -2\) or \(r = 3\) (or \(r = 0\text{,}\) although this does not help us). This tells us that \(a_n = (-2)^n\) is a solution to the recurrence relation, as is \(a_n = 3^n\text{.}\) Which one is correct? They both are, unless we specify initial conditions. Notice we could also have \(a_n = (-2)^n + 3^n\text{.}\) Or \(a_n = 7(-2)^n + 4\cdot 3^n\text{.}\) In fact, for any \(a\) and \(b\text{,}\) \(a_n = a(-2)^n + b 3^n\) is a solution (try plugging this into the recurrence relation). To find the values of \(a\) and \(b\text{,}\) use the initial conditions. [🔗](#sec_seq-exponential-6-5) This points us in the direction of a more general technique for solving recurrence relations. Notice we will always be able to factor out the \(r^{n-2}\) as we did above. So we really only care about the other part. We call this other part the characteristic equation for the recurrence relation. We are interested in finding the roots of the characteristic equation, which are called (surprise) the characteristic roots.[🔗](#sec_seq-exponential-6-6)

#### Characteristic Roots.

Given a recurrence relation \(a_n + \alpha a_{n-1} + \beta a_{n-2} = 0\text{,}\) the characteristic polynomial is \begin{equation*} x^2 + \alpha x + \beta \end{equation*} giving the characteristic equation: \begin{equation*} x^2 + \alpha x + \beta = 0\text{.} \end{equation*} [🔗](#sec_seq-exponential-6-7-2) If \(r_1\) and \(r_2\) are two distinct roots of the characteristic polynomial (i.e., solutions to the characteristic equation), then the solution to the recurrence relation is \begin{equation*} a_n = ar_1^n + br_2^n\text{,} \end{equation*} where \(a\) and \(b\) are constants determined by the initial conditions. [🔗](#sec_seq-exponential-6-7-3) [🔗](#sec_seq-exponential-6-7)

#### Example 4.4.4.

Solve the recurrence relation \(a_n = 7a_{n-1} - 10 a_{n-2}\) with \(a_0 = 2\) and \(a_1 = 3\text{.}\)[🔗](#sec_seq-exponential-6-8-1-1) Solution. Rewrite the recurrence relation \(a_n - 7a_{n-1} + 10a_{n-2} = 0\text{.}\) Now form the characteristic equation: \begin{equation*} x^2 - 7x + 10 = 0 \end{equation*} and solve for \(x\text{:}\) \begin{equation*} (x - 2) (x - 5) = 0\text{,} \end{equation*} so \(x = 2\) and \(x = 5\) are the characteristic roots. We therefore know that the solution to the recurrence relation will have the form \begin{equation*} a_n = a 2^n + b 5^n\text{.} \end{equation*} [🔗](#sec_seq-exponential-6-8-2-1) To find \(a\) and \(b\text{,}\) plug in \(n =0\) and \(n = 1\) to get a system of two equations with two unknowns: \begin{align*} 2 \amp = a 2^0 + b 5^0 = a + b\\ 3 \amp = a 2^1 + b 5^1 = 2a + 5b\text{.} \end{align*} [🔗](#sec_seq-exponential-6-8-2-2) Solving this system gives \(a = \frac{7}{3}\) and \(b = -\frac{1}{3}\text{,}\) so the solution to the recurrence relation is \begin{equation*} a_n = \frac{7}{3}2^n - \frac{1}{3} 5^n\text{.} \end{equation*} [🔗](#sec_seq-exponential-6-8-2-3) [🔗](#sec_seq-exponential-6-8-2) [🔗](#sec_seq-exponential-6-8)Perhaps the most famous recurrence relation is \(F_n = F_{n-1} + F_{n-2}\text{,}\) which together with the initial conditions \(F_0 = 0\) and \(F_1= 1\) defines the Fibonacci sequence. But notice that this is precisely the type of recurrence relation on which we can use the characteristic root technique. When we do, the only thing that changes is that the characteristic equation does not factor, so we must use the quadratic formula to find the characteristic roots. In fact, doing so gives the third most famous irrational number, \(\varphi\text{,}\) the golden ratio. [🔗](#sec_seq-exponential-6-9) Before leaving the characteristic root technique, we should think about what might happen when solving the characteristic equation. We have an example above in which the characteristic polynomial has two distinct roots. These roots can be integers, or perhaps irrational numbers (requiring the quadratic formula to find them). In these cases, we know what the solution to the recurrence relation looks like.[🔗](#sec_seq-exponential-6-10) However, it is possible for the characteristic polynomial to have only one root. This can happen if the characteristic polynomial factors as \((x - r)^2\text{.}\) It is still the case that \(r^n\) would be a solution to the recurrence relation, but we won’t be able to find solutions for all initial conditions using the general form \(a_n = ar_1^n + br_2^n\text{,}\) since we can’t distinguish between \(r_1^n\) and \(r_2^n\text{.}\) We are in luck though:[🔗](#sec_seq-exponential-6-11)

#### Characteristic Root Technique for Repeated Roots.

Suppose the recurrence relation \(a_n = \alpha a_{n-1} + \beta a_{n-2}\) has a characteristic polynomial with only one root \(r\text{.}\) Then the solution to the recurrence relation is \begin{equation*} a_n = ar^n + bnr^n \end{equation*} where \(a\) and \(b\) are constants determined by the initial conditions. [🔗](#asmb-char-rep-roots-4) [🔗](#asmb-char-rep-roots)Notice the extra \(n\) in \(bnr^n\text{.}\) This allows us to solve for the constants \(a\) and \(b\) from the initial conditions.[🔗](#sec_seq-exponential-6-13)

#### Example 4.4.5.

Solve the recurrence relation \(a_n = 6a_{n-1} - 9a_{n-2}\) with initial conditions \(a_0 = 1\) and \(a_1 = 4\text{.}\)[🔗](#sec_seq-exponential-6-14-1-1) Solution. The characteristic polynomial is \(x^2 - 6x + 9\text{.}\) We solve the characteristic equation \begin{equation*} x^2 - 6x + 9 = 0 \end{equation*} by factoring: \begin{equation*} (x - 3)^2 = 0, \end{equation*} so \(x =3\) is the only characteristic root. Therefore we know that the solution to the recurrence relation has the form \begin{equation*} a_n = a 3^n + bn3^n \end{equation*} for some constants \(a\) and \(b\text{.}\) Now use the initial conditions: \begin{align*} a_0 = 1 \amp = a 3^0 + b\cdot 0 \cdot 3^0 = a\\ a_1 = 4 \amp = a\cdot 3 + b\cdot 1 \cdot3 = 3a + 3b\text{.} \end{align*} Since \(a = 1\text{,}\) we find that \(b = \frac{1}{3}\text{.}\) Therefore the solution to the recurrence relation is \begin{equation*} a_n = 3^n + \frac{1}{3}n3^n\text{.} \end{equation*} [🔗](#sec_seq-exponential-6-14-2-1) [🔗](#sec_seq-exponential-6-14-2) [🔗](#sec_seq-exponential-6-14)Although we will not consider examples more complicated than these, this characteristic root technique can be applied to much more complicated recurrence relations. For example, \(a_n = 2a_{n-1} + a_{n-2} - 3a_{n-3}\) has characteristic polynomial \(x^3 - 2 x^2 - x + 3\text{.}\) Assuming we see how to factor such a degree 3 (or more) polynomial, we can easily find the characteristic roots and as such solve the recurrence relation (the solution would look like \(a_n = ar_1^n + br_2^n + cr_3^n\) if there were 3 distinct roots). It is also possible that the characteristic roots are complex numbers. [🔗](#sec_seq-exponential-6-15) However, the characteristic root technique is only useful for solving recurrence relations in a particular form: \(a_n\) is given as a linear combination of some number of previous terms. These recurrence relations are called linear homogeneous recurrence relations with constant coefficients. The “homogeneous” refers to the fact that there is no additional term in the recurrence relation other than a multiple of \(a_j\) terms. For example, \(a_n = 2a_{n-1} + 1\) is *non-homogeneous* because of the additional constant 1. There are general methods of solving such things, but we will not consider them here, other than through the use of telescoping or iteration described above.[🔗](#sec_seq-exponential-6-16) [🔗](#sec_seq-exponential-6)

### Reading Questions Reading Questions

#### 1.

Which of the following recurrence relations would be good candidates to try the characteristic root technique on? Select all that apply[🔗](#rq-seq-recurrence-mc-1-1)

- \(a_n = 3a_{n-1} + a_{n-2}\)
- Correct: \(a_n\) is written in terms of only multiple of previous terms.
- \(a_n = a_{n-1}+2a_{n-2} + 3a_{n-3}\)
- This works too, although the characteristic polynomial will have degree 3, so finding characteristic roots will be difficult.
- \(a_{n} = \frac{1}{3}\cdot 2^n + \frac{2}{3}(-1)^n\)
- This looks like it is the closed formula that would result from a characteristic root technique application, but isn’t a recursive formula.
- \(a_n = a_{n-1} + 3a_{n-2} + 5\)
- The addition of the constant makes it so we cannot use the characteristic root technique directly. While there are methods for dealing with this, we have not considered them in this section.
- \(x^2 -3x - 1 = 0\)
- This might be a characteristic polynomial (in fact, it is for the sequence given by \(a_n = 3a_{n-1} + a_n\)), but it is not a recursive definition itself.

[🔗](#rq-seq-recurrence-mc)

#### 2.

At what step do you need to refer to the initial conditions when completing the characteristic root technique? What would happen if you didn’t use these? Explain.[🔗](#rq-seq-recurrence-fr-1-1) [🔗](#rq-seq-recurrence-fr)

#### 3.

What questions do you have? Write at least one question about the content of this section that you or a classmate might be curious about.[🔗](#rq-seq-recurrence-q-1-1) [🔗](#rq-seq-recurrence-q)[🔗](#rqs-seq-recurrence)

### Exercises Practice Problems

#### 1.

Activate Find \(3 + 6 + 12 + \cdots + 3\cdot 2^{18}\text{.}\)[🔗](#extracted-webwork-210-1-1-1) [🔗](#ww-arithgeom-geom-sm)

#### 2.

Activate Find \(1 - \frac{3}{5} + \frac{9}{25} - \cdots +(-1)^{27} \frac{3^{27}}{5^{27}}\text{.}\)[🔗](#extracted-webwork-211-1-1-1) [🔗](#ww-arithgeom-goem-fraction-sum)

#### 3.

Activate Solve the recurrence relation \(a_n = a_{n-1} + 2^n\) with \(a_0 = 3\text{.}\)[🔗](#extracted-webwork-212-1-1-1) \(a_n =\)[🔗](#extracted-webwork-212-1-1-2) Hint. Use telescoping or iteration.[🔗](#extracted-webwork-212-1-2-1) [🔗](#extracted-webwork-212-1-2) [🔗](#ww-rec-tel-itr)

#### 4.

Activate Find the solution to the recurrence relation \(a_n = -3a_{n-1} + 10a_{n-2}\) with initial terms \(a_0 = {2}\) and \(a_1 = {-3}\text{.}\)[🔗](#extracted-webwork-213-1-1-1) \(a_n =\) [🔗](#extracted-webwork-213-1-1-2) [🔗](#ww-rec-croots1)

#### 5.

Activate Find the solution to the recurrence relation \(a_n = a_{n-1} + 12a_{n-2}\) with initial terms \(a_0 = {2}\) and \(a_1 = {1}\text{.}\)[🔗](#extracted-webwork-214-1-1-1) \(a_n =\) [🔗](#extracted-webwork-214-1-1-2) Find the solution to the recurrence relation \(b_n = b_{n-1} + 12b_{n-2}\) with initial terms \(b_0 = 5\) and \(b_1 = {10}\text{.}\)[🔗](#extracted-webwork-214-1-1-3) \(b_n =\) [🔗](#extracted-webwork-214-1-1-4) [🔗](#ww-rec-croots-diff-inits)

#### 6.

Activate Find the solution to the recurrence relation \(a_n = a_{n-1} + 6a_{n-2}\) with initial terms \(a_0 = 1\) and \(a_1 = 16\text{.}\)[🔗](#extracted-webwork-215-1-1-1) \(a_n =\) [🔗](#extracted-webwork-215-1-1-2) [🔗](#ww-rec-croots2)[🔗](#practice-sec-recurrence)

### Exercises Additional Exercises

#### 1.

Find the next two terms in \((a_n)_{n\ge 0}\) beginning \(3, 5, 11, 21, 43, 85\ldots\text{.}\) Then give a recursive definition for the sequence. Finally, use the characteristic root technique to find a closed formula for the sequence.[🔗](#exercises-sec-recurrence-2-1-1) [🔗](#exercises-sec-recurrence-2)

#### 2.

Consider the sequences \(2, 5, 12, 29, 70, 169, 408,\ldots\) (with \(a_0 = 2\)).

1. Describe the rate of growth of this sequence.[🔗](#exercises-sec-recurrence-3-1-1-3-1-1) [🔗](#exercises-sec-recurrence-3-1-1-3-1)
2. Find a recursive definition for the sequence.[🔗](#exercises-sec-recurrence-3-1-1-3-2-1) [🔗](#exercises-sec-recurrence-3-1-1-3-2)
3. Find a closed formula for the sequence.[🔗](#exercises-sec-recurrence-3-1-1-3-3-1) [🔗](#exercises-sec-recurrence-3-1-1-3-3)
4. If you look at the sequence of differences between terms, and then the sequence of second differences, the sequence of third differences, and so on, will you ever get a constant sequence? Explain how you know.[🔗](#exercises-sec-recurrence-3-1-1-3-4-1) [🔗](#exercises-sec-recurrence-3-1-1-3-4)

[🔗](#exercises-sec-recurrence-3-1-1) [🔗](#exercises-sec-recurrence-3)

#### 3.

Show that \(4^n\) is a solution to the recurrence relation \(a_n = 3a_{n-1} + 4a_{n-2}\text{.}\)[🔗](#exercises-sec-recurrence-4-1-1) [🔗](#exercises-sec-recurrence-4)

#### 4.

Suppose that \(r^n\) and \(q^n\) are both solutions to a recurrence relation of the form \(a_n = \alpha a_{n-1} + \beta a_{n-2}\text{.}\) Prove that \(c\cdot r^n + d \cdot q^n\) is also a solution to the recurrence relation, for any constants \(c, d\text{.}\)[🔗](#exercises-sec-recurrence-5-1-1) [🔗](#exercises-sec-recurrence-5)

#### 5.

Think back to the magical candy machine at your neighborhood grocery store. Suppose that the first time a quarter is put into the machine 1 Skittle comes out. The second time, 4 Skittles, the third time 16 Skittles, the fourth time 64 Skittles, etc.

1. Find both a recursive and closed formula for how many Skittles the *n*th customer gets.[🔗](#exercises-sec-recurrence-6-1-1-1-1-1) [🔗](#exercises-sec-recurrence-6-1-1-1-1)
2. Check your solution for the closed formula by solving the recurrence relation using the characteristic root technique.[🔗](#exercises-sec-recurrence-6-1-1-1-2-1) [🔗](#exercises-sec-recurrence-6-1-1-1-2)

[🔗](#exercises-sec-recurrence-6-1-1) [🔗](#exercises-sec-recurrence-6)

#### 6.

Let \(a_n\) be the number of \(1 \times n\) tile designs you can make using \(1 \times 1\) squares available in 4 colors and \(1 \times 2\) dominoes available in 5 colors.

1. First, find a recurrence relation to describe the problem. Explain why the recurrence relation is correct (in the context of the problem).[🔗](#exercises-sec-recurrence-7-1-1-5-1-1) [🔗](#exercises-sec-recurrence-7-1-1-5-1)
2. Write out the first 6 terms of the sequence \(a_1, a_2, \ldots\text{.}\)[🔗](#exercises-sec-recurrence-7-1-1-5-2-1) [🔗](#exercises-sec-recurrence-7-1-1-5-2)
3. Solve the recurrence relation. That is, find a closed formula for \(a_n\text{.}\)[🔗](#exercises-sec-recurrence-7-1-1-5-3-1) [🔗](#exercises-sec-recurrence-7-1-1-5-3)

[🔗](#exercises-sec-recurrence-7-1-1) [🔗](#exercises-sec-recurrence-7)

#### 7.

You have access to \(1 \times 1\) tiles which come in 2 different colors and \(1\times 2\) tiles which come in 3 different colors. We want to figure out how many different \(1 \times n\) path designs we can make out of these tiles.

1. Find a recursive definition for the sequence \(a_n\) of paths of length \(n\text{.}\)[🔗](#exercises-sec-recurrence-8-1-1-4-1-1) [🔗](#exercises-sec-recurrence-8-1-1-4-1)
2. Solve the recurrence relation using the characteristic root technique.[🔗](#exercises-sec-recurrence-8-1-1-4-2-1) [🔗](#exercises-sec-recurrence-8-1-1-4-2)

[🔗](#exercises-sec-recurrence-8-1-1) [🔗](#exercises-sec-recurrence-8)

#### 8.

Solve the recurrence relation \(a_n = 2a_{n-1} - a_{n-2}\text{.}\)

1. What is the solution if the initial terms are \(a_0 = 1\) and \(a_1 = 2\text{?}\)[🔗](#exercises-sec-recurrence-9-1-1-2-1-1) [🔗](#exercises-sec-recurrence-9-1-1-2-1)
2. What do the initial terms need to be in order for \(a_9 = 30\text{?}\)[🔗](#exercises-sec-recurrence-9-1-1-2-2-1) [🔗](#exercises-sec-recurrence-9-1-1-2-2)
3. For which \(x\) are there initial terms which make \(a_9 = x\text{?}\)[🔗](#exercises-sec-recurrence-9-1-1-2-3-1) [🔗](#exercises-sec-recurrence-9-1-1-2-3)

[🔗](#exercises-sec-recurrence-9-1-1) [🔗](#exercises-sec-recurrence-9)

#### 9.

Consider the recurrence relation \(a_n = 4a_{n-1} - 4a_{n-2}\text{.}\)

1. Find the general solution to the recurrence relation (beware the repeated root).[🔗](#exercises-sec-recurrence-10-1-1-2-1-1) [🔗](#exercises-sec-recurrence-10-1-1-2-1)
2. Find the solution when \(a_0 = 1\) and \(a_1 = 2\text{.}\)[🔗](#exercises-sec-recurrence-10-1-1-2-2-1) [🔗](#exercises-sec-recurrence-10-1-1-2-2)
3. Find the solution when \(a_0 = 1\) and \(a_1 = 8\text{.}\)[🔗](#exercises-sec-recurrence-10-1-1-2-3-1) [🔗](#exercises-sec-recurrence-10-1-1-2-3)

[🔗](#exercises-sec-recurrence-10-1-1) [🔗](#exercises-sec-recurrence-10)

#### 10.

Here is a surprising use of sequences to answer a counting question: How many license plates consist of 6 symbols, using only the three numerals 1, 2, and 3 and the four letters a, b, c, and d, so that no numeral appears after any letter? For example, “31ddac”, “123321”, and “ababab” are each acceptable license plates, but “13ba2c” is not.

1. First answer this question by considering different cases: how many of the license plates contain no numerals? How many contain one numeral, etc.[🔗](#exercises-sec-recurrence-11-1-1-5-1-1) [🔗](#exercises-sec-recurrence-11-1-1-5-1)
2. Now use the techniques of this section to show why the answer is \(4^7 - 3^7\text{.}\)[🔗](#exercises-sec-recurrence-11-1-1-5-2-1) [🔗](#exercises-sec-recurrence-11-1-1-5-2)

[🔗](#exercises-sec-recurrence-11-1-1) [🔗](#exercises-sec-recurrence-11)[🔗](#exercises-sec-recurrence)[🔗](#sec_seq-exponential) [&#xe5cb;Prev](sec_seq-polynomial.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_seq-induction.html) [Feedback](/cdn-cgi/l/email-protection#a0cfd3c3c1d28eccc5d6c9cee0d5cec3cf8ec5c4d5)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_seq-exponential-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_seq-exponential-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
