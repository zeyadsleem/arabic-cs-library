---
title: "Chapter Summary"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_sequences-conc.html
---

\[🔗](#sec_sequences-conc-2-1-1-1-1) Prove, using induction, that the last digit of the number of beans you have on the \(n\)th day is always a 5 for all \(n \ge 1\text{.}\)[🔗](#sec_sequences-conc-2-1-1-1-2-1) [🔗](#sec_sequences-conc-2-1-1-1-2) Find a closed formula for the \(n\)th term of the sequence, and prove it is correct by induction.[🔗](#sec_sequences-conc-2-1-1-1-3-1) [🔗](#sec_sequences-conc-2-1-1-1-3) [🔗](#sec_sequences-conc-2-1-1) [🔗](#sec_sequences-conc-2-1)In this chapter, we explored sequences and mathematical induction. At first, these might not seem entirely related, but there is a link: recursive reasoning. When we have many cases (maybe infinitely many), it is often easier to describe a particular case by saying how it relates to other cases, instead of describing it from scratch. For sequences, we can describe the \(n\)th term in the sequence by saying how it is related to the *previous* term. When showing a statement involving the variable \(n\) is true for all values of \(n\text{,}\) we can describe why the case for \(n = k\) is true based on why the case for \(n = k-1\) is true.[🔗](#sec_sequences-conc-2-2) While thinking of problems recursively is often easier than thinking of them absolutely (at least after you get used to thinking in this way), our ultimate goal is to move beyond this recursive description. For sequences, we want to find *closed formulas* for the \(n\)th term of the sequence. For proofs, we want to know that the statement is true for a particular \(n\) (not only under the assumption that the statement is true for the previous value of \(n\)). In this chapter, we saw some methods for moving from recursive descriptions to absolute descriptions.[🔗](#sec_sequences-conc-2-3)

- If the terms of a sequence increase by a constant difference or constant ratio (these are both recursive descriptions), then the sequence is arithmetic or geometric, respectively, and we have closed formulas for each of these based on the initial terms and common difference or ratio.[🔗](#sec_sequences-conc-2-4-1-1-1) [🔗](#sec_sequences-conc-2-4-1-1)
- If the terms of a sequence increase at a polynomial rate (that is, if the differences between terms form a sequence with a polynomial closed formula), then the sequence is given by a polynomial closed formula (of degree one more than the sequence of differences).[🔗](#sec_sequences-conc-2-4-1-2-1) [🔗](#sec_sequences-conc-2-4-1-2)
- If the terms of a sequence increase at an exponential rate, then we expect the closed formula for the sequence to be exponential. These sequences often have relatively nice recursive formulas, and the *characteristic root technique* allows us to find the closed formula for these sequences.[🔗](#sec_sequences-conc-2-4-1-3-1) [🔗](#sec_sequences-conc-2-4-1-3)
- If we want to prove that a statement is true for all values of \(n\) (greater than some first small value), and we can describe why the statement for \(n = k\) implies the statement for \(n = k+1\text{,}\) then the *principle of mathematical induction* gives us that the statement is true for all values of \(n\) (greater than the base case).[🔗](#sec_sequences-conc-2-4-1-4-1) [🔗](#sec_sequences-conc-2-4-1-4)

[🔗](#sec_sequences-conc-2-4) Throughout the chapter we tried to understand *why* these facts listed above are true. In part, that is what proofs, by induction or not, attempt to accomplish: They explain why mathematical truths are, in fact, truths. As we develop our ability to reason about mathematics, it is a good idea to make sure that the methods of our reasoning are sound. The branch of mathematics that deals with deciding whether reasoning is good or not is *mathematical logic*, the subject of the next chapter.[🔗](#sec_sequences-conc-2-5)

### Exercises Chapter Review

#### 1.

Activate Find \(2 + 10 + 18+ \cdots + 1026\text{.}\)[🔗](#extracted-webwork-217-1-1-1) [🔗](#ww-seq-sum)

#### 2.

Activate Consider the sequence \(13, 17, 21, 25, \ldots, 4n + 1\text{.}\)[🔗](#extracted-webwork-218-1-1-1)

1. How many terms are there in the sequence?[🔗](#extracted-webwork-218-1-1-2-1-1-1) [🔗](#extracted-webwork-218-1-1-2-1-1)
2. What is the second-to-last term?[🔗](#extracted-webwork-218-1-1-2-1-2-1) [🔗](#extracted-webwork-218-1-1-2-1-2)
3. Find the sum of all the terms in the sequence.[🔗](#extracted-webwork-218-1-1-2-1-3-1) [🔗](#extracted-webwork-218-1-1-2-1-3)

[🔗](#extracted-webwork-218-1-1-2) [🔗](#ww-seq-arith)

#### 3.

Activate Consider the sequence given by \(a_n = 3\cdot 5^{n-1}\text{.}\)[🔗](#extracted-webwork-219-1-1-1)

1. Find the first 4 terms of the sequence.[🔗](#extracted-webwork-219-1-1-2-1-1-1) \(a_1 =\) , \(a_2 =\) , \(a_3 =\) , \(a_4 =\) ,...[🔗](#extracted-webwork-219-1-1-2-1-1-2) What sort of sequence is this?[🔗](#extracted-webwork-219-1-1-2-1-1-3) arithmetic[🔗](#extracted-webwork-219-1-1-2-1-1-4-1-1-1) [🔗](#extracted-webwork-219-1-1-2-1-1-4-1-1)
2. geometric[🔗](#extracted-webwork-219-1-1-2-1-1-4-1-2-1) [🔗](#extracted-webwork-219-1-1-2-1-1-4-1-2)
3. neither[🔗](#extracted-webwork-219-1-1-2-1-1-4-1-3-1) [🔗](#extracted-webwork-219-1-1-2-1-1-4-1-3)
4. Find the *sum* of the first 21 terms. That is, compute \(\sum_{k=1}^{21}a_k\text{.}\)[🔗](#extracted-webwork-219-1-1-2-1-2-1) [🔗](#extracted-webwork-219-1-1-2-1-2)

[🔗](#extracted-webwork-219-1-1-2) [🔗](#ww-seq-geom)

#### 4.

Consider the sequence \(5, 11, 19, 29, 41, 55,\ldots\text{.}\) Assume \(a_1 = 5\text{.}\)

1. Find a closed formula for \(a_n\text{,}\) the \(n\)th term of the sequence, by writing each term as a sum of a sequence. Hint: first find \(a_0\text{,}\) but ignore it when collapsing the sum.[🔗](#exercises_seq-conc-5-1-1-3-1-1) [🔗](#exercises_seq-conc-5-1-1-3-1)
2. Find a closed formula again, this time using either polynomial fitting or the characteristic root technique (whichever is appropriate). Show your work.[🔗](#exercises_seq-conc-5-1-1-3-2-1) [🔗](#exercises_seq-conc-5-1-1-3-2)
3. Find a closed formula once again, this time by recognizing the sequence as a modification of some well-known sequence(s). Explain.[🔗](#exercises_seq-conc-5-1-1-3-3-1) [🔗](#exercises_seq-conc-5-1-1-3-3)

[🔗](#exercises_seq-conc-5-1-1) [🔗](#exercises_seq-conc-5)

#### 5.

Activate Use polynomial fitting to find the formula for the \(n\)th term of the sequence \((a_n)_{n \ge 1}\) which starts,[🔗](#extracted-webwork-220-1-1-1) \begin{equation*} {3, 5, 9, 15, 23}, \ldots \end{equation*} Note the first term above is \(a_1\text{,}\) not \(a_0\text{.}\) [🔗](#extracted-webwork-220-1-1-2) \(a_n =\) [🔗](#extracted-webwork-220-1-1-3) [🔗](#ww-seq-poly)

#### 6.

Suppose the closed formula for a particular sequence is a degree 3 polynomial. What can you say about the closed formula for:

1. The sequence of partial sums?[🔗](#exercises_seq-conc-7-1-1-1-1-1) [🔗](#exercises_seq-conc-7-1-1-1-1)
2. The sequence of second differences?[🔗](#exercises_seq-conc-7-1-1-1-2-1) [🔗](#exercises_seq-conc-7-1-1-1-2)

[🔗](#exercises_seq-conc-7-1-1) [🔗](#exercises_seq-conc-7)

#### 7.

Consider the sequence given recursively by \(a_1 = 4\text{,}\) \(a_2 = 6\text{,}\) and \(a_n = a_{n-1} + a_{n-2}\text{.}\)

1. Write out the first 6 terms of the sequence.[🔗](#exercises_seq-conc-8-1-1-4-1-1) [🔗](#exercises_seq-conc-8-1-1-4-1)
2. Could the closed formula for \(a_n\) be a polynomial? Explain.[🔗](#exercises_seq-conc-8-1-1-4-2-1) [🔗](#exercises_seq-conc-8-1-1-4-2)

[🔗](#exercises_seq-conc-8-1-1) [🔗](#exercises_seq-conc-8)

#### 8.

Activate The sequence \((a_n)_{n \ge 1}\) starts \(-1, 0, 2, 5, 9, 14\ldots\) and has closed formula[🔗](#extracted-webwork-221-1-1-1) \begin{equation*} a_n = \dfrac{(n+1)(n-2)}{2}\text{.} \end{equation*} [🔗](#extracted-webwork-221-1-1-2) Use this fact to find a closed formula for the sequence \((b_n)_{n \ge 1}\) which starts \(4, 10, 18, 28, 40, \ldots\text{.}\)[🔗](#extracted-webwork-221-1-1-3) [🔗](#ww-seq-relate)

#### 9.

In the song *The Twelve Days of Christmas*, my true love gave to me first 1 gift; then 2 gifts and 1 gift; then 3 gifts, 2 gifts, and 1 gift; and so on. How many gifts did my true love give me all together during the twelve days?[🔗](#exercises_seq-conc-10-3-1) [🔗](#exercises_seq-conc-10)

#### 10.

Activate Consider the recurrence relation \(a_n = -3a_{n-1} + 10a_{n-2}\) with first two terms \(a_0 = 3\) and \(a_1 = 6\text{.}\)

1. Write out the first 5 terms of the sequence defined by this recurrence relation.[🔗](#extracted-webwork-222-1-1-1-4-1-1) \(a_2 =\) , \(a_3 =\) , \(a_4 =\) , ...[🔗](#extracted-webwork-222-1-1-1-4-1-2) [🔗](#extracted-webwork-222-1-1-1-4-1)
2. Solve the recurrence relation. That is, find a closed formula for \(a_n\text{.}\)[🔗](#extracted-webwork-222-1-1-1-4-2-1) [🔗](#extracted-webwork-222-1-1-1-4-2)

[🔗](#extracted-webwork-222-1-1-1) \(a_n =\) [🔗](#extracted-webwork-222-1-1-2) [🔗](#ww-seq-croots1)

#### 11.

Activate Consider the recurrence relation \(a_n = a_{n-1} + 6a_{n-2}\) with first two terms \(a_0 = 5\) and \(a_1 = 9\text{.}\)

1. Find the next two terms of the sequence (\(a_2\) and \(a_3\)):[🔗](#extracted-webwork-223-1-1-1-4-1-1) \(a_2 =\) [🔗](#extracted-webwork-223-1-1-1-4-1-2) \(a_3 =\) [🔗](#extracted-webwork-223-1-1-1-4-1-3) [🔗](#extracted-webwork-223-1-1-1-4-1)
2. Solve the recurrence relation. That is, find a closed formula for \(a_n\text{.}\)[🔗](#extracted-webwork-223-1-1-1-4-2-1) \(a_n =\) [🔗](#extracted-webwork-223-1-1-1-4-2-2) [🔗](#extracted-webwork-223-1-1-1-4-2)

[🔗](#extracted-webwork-223-1-1-1) [🔗](#ww-seq-croots2)

#### 12.

Your magic chocolate bunnies reproduce like rabbits: every large bunny produces 2 new mini bunnies each day, and each day every mini bunny born the previous day grows into a large bunny. Assume you start with 2 mini bunnies and no bunny ever dies (or gets eaten).

1. Write out the first few terms of the sequence.[🔗](#exercises_seq-conc-13-1-1-2-1-1) [🔗](#exercises_seq-conc-13-1-1-2-1)
2. Give a recursive definition of the sequence, and explain why it is correct.[🔗](#exercises_seq-conc-13-1-1-2-2-1) [🔗](#exercises_seq-conc-13-1-1-2-2)
3. Find a closed formula for the \(n\)th term of the sequence.[🔗](#exercises_seq-conc-13-1-1-2-3-1) [🔗](#exercises_seq-conc-13-1-1-2-3)

[🔗](#exercises_seq-conc-13-1-1) [🔗](#exercises_seq-conc-13)

#### 13.

Consider the sequence of partial sums of *squares* of Fibonacci numbers: \(F_1^2\text{,}\) \(F_1^2 + F_2^2\text{,}\) \(F_1^2 + F_2^2 + F_3^2, \ldots\text{.}\) The sequence starts \(1, 2, 6, 15, 40,\ldots\)

1. Guess a formula for the \(n\)th partial sum, in terms of Fibonacci numbers. Hint: Write each term as a product.[🔗](#exercises_seq-conc-14-3-1-6-1-1) [🔗](#exercises_seq-conc-14-3-1-6-1)
2. Prove your formula is correct by mathematical induction.[🔗](#exercises_seq-conc-14-3-1-6-2-1) [🔗](#exercises_seq-conc-14-3-1-6-2)
3. Explain what this problem has to do with the following picture:[🔗](#exercises_seq-conc-14-3-1-6-3-1) ![A rectangle repeatedly divided into a square and a divided rectangle.](generated/latex-image/goldenrectangles.svg) &#xe88e;A rectangle, divided into a square (left) and similar rectangle (right). The similar rectangle is divided into a square (bottom) and similar rectangle (top). This top rectangle is divided into a sqaure (right) and rectangle (left). The left rectangle is divided into a sqaure (top) and rectangle (bottom). The bottom rectangle is divided into two equal squares.[🔗](#goldenrectangles-2-1) [🔗](#exercises_seq-conc-14-3-1-6-3)

[🔗](#exercises_seq-conc-14-3-1) [🔗](#exercises_seq-conc-14)

#### 14.

Prove the following statements by mathematical induction:

1. \(n! \lt n^n\) for \(n \ge 2\) [🔗](#exercises_seq-conc-15-1-1-1-1)
2. \(\d\frac{1}{1\cdot 2} + \frac{1}{2\cdot 3} +\frac{1}{3\cdot 4}+\cdots + \frac{1}{n\cdot(n+1)} = \d\frac{n}{n+1}\) for all \(n \in \Z^+\text{.}\) [🔗](#exercises_seq-conc-15-1-1-1-2)
3. \(4^n - 1\) is a multiple of 3 for all \(n \in \N\text{.}\) [🔗](#exercises_seq-conc-15-1-1-1-3)
4. The *greatest* amount of postage you *cannot* make exactly using 4 and 9 cent stamps is 23 cents.[🔗](#exercises_seq-conc-15-1-1-1-4-1) [🔗](#exercises_seq-conc-15-1-1-1-4)
5. Every even number squared is divisible by 4.[🔗](#exercises_seq-conc-15-1-1-1-5-1) [🔗](#exercises_seq-conc-15-1-1-1-5)

[🔗](#exercises_seq-conc-15-1-1) Hint.

1. \((n+1)^{n+1} > (n+1) \cdot n^{n}\text{.}\)[🔗](#exercises_seq-conc-15-2-1-1-1-1) [🔗](#exercises_seq-conc-15-2-1-1-1)
2. This should be similar to the other sum proofs. The last bit comes down to adding fractions.[🔗](#exercises_seq-conc-15-2-1-1-2-1) [🔗](#exercises_seq-conc-15-2-1-1-2)
3. Write \(4^{k+1} - 1 = 4\cdot 4^k - 4 + 3\text{.}\)[🔗](#exercises_seq-conc-15-2-1-1-3-1) [🔗](#exercises_seq-conc-15-2-1-1-3)
4. One 9-cent stamp is 1 more than two 4-cent stamps, and seven 4-cent stamps is 1 more than three 9-cent stamps.[🔗](#exercises_seq-conc-15-2-1-1-4-1) [🔗](#exercises_seq-conc-15-2-1-1-4)
5. Be careful to actually use induction here. The base case: \(2^2 = 4\text{.}\) The inductive case: Assume \((2n)^2\) is divisible by 4, and consider \((2n+2)^2 = (2n)^2 + 4n + 4\text{.}\) This is divisible by 4 because \(4n +4\) clearly is, and by our inductive hypothesis, so is \((2n)^2\text{.}\)[🔗](#exercises_seq-conc-15-2-1-1-5-1) [🔗](#exercises_seq-conc-15-2-1-1-5)

[🔗](#exercises_seq-conc-15-2-1) [🔗](#exercises_seq-conc-15-2) [🔗](#exercises_seq-conc-15)

#### 15.

Prove \(1^3 + 2^3 + 3^3 + \cdots + n^3 = \left(\frac{n(n+1)}{2}\right)^2\) holds for all \(n \ge 1\text{,}\) by mathematical induction.[🔗](#exercises_seq-conc-16-1-1) Hint. This is a straight-forward induction proof. Note that you will need to simplify \(\left(\frac{n(n+1)}{2}\right)^2 + (n+1)^3\) and get \(\left(\frac{(n+1)(n+2)}{2}\right)^2\text{.}\)[🔗](#exercises_seq-conc-16-2-1) [🔗](#exercises_seq-conc-16-2) [🔗](#exercises_seq-conc-16)

#### 16.

Suppose \(a_0 = 1\text{,}\) \(a_1 = 1\) and \(a_n = 3a_{n-1} - 2a_{n-2}\text{.}\) Prove, using strong induction, that \(a_n = 1\) for all \(n\text{.}\)[🔗](#exercises_seq-conc-17-1-1) Hint. There are two base cases \(P(0)\) and \(P(1)\text{.}\) Then, for the inductive case, assume \(P(k)\) is true for all \(k \lt n\text{.}\) This allows you to assume \(a_{n-1} = 1\) and \(a_{n-2} = 1\text{.}\) Apply the recurrence relation.[🔗](#exercises_seq-conc-17-2-1) [🔗](#exercises_seq-conc-17-2) [🔗](#exercises_seq-conc-17)

#### 17.

Prove using induction that every set containing \(n\) elements has \(2^n\) different subsets for any \(n \ge 1\text{.}\)[🔗](#exercises_seq-conc-18-3-1) [🔗](#exercises_seq-conc-18)[🔗](#exercises_seq-conc)[🔗](#sec_sequences-conc) [&#xe5cb;Prev](sec_seq-strong-induction.html)[&#xe5ce;Top](#)[Next&#xe5cc;](ch_structures.html) [Feedback](/cdn-cgi/l/email-protection#abc4d8c8cad985c7ceddc2c5ebdec5c8c485cecfde)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_sequences-conc-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_sequences-conc-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
