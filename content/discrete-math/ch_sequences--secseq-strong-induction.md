---
title: "Strong Induction"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_seq-strong-induction.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 4.6 Strong Induction

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_seq-strong-induction-4-1-1)

1. Explain the difference between proof by induction and proof by strong induction.[🔗](#sec_seq-strong-induction-4-2-1-1) [🔗](#sec_seq-strong-induction-4-2-1)
2. Use strong induction to prove statements.[🔗](#sec_seq-strong-induction-4-2-2-1) [🔗](#sec_seq-strong-induction-4-2-2)

[🔗](#sec_seq-strong-induction-4)

### Subsection Section Preview

#### Investigate!

Start with a square piece of paper. You want to cut this square into smaller squares, leaving no waste (every piece of paper you end up with must be a square). Obviously it is possible to cut the square into 4 squares. You can also cut it into 9 squares. It turns out you can cut the square into 7 squares (although not all the same size). What other numbers of squares could you end up with?[🔗](#subsec-going-farther-back-2-1) [🔗](#subsec-going-farther-back-2)Sometimes, to prove that \(P(k+1)\) is true, it would be helpful to know that \(P(k)\) *and* \(P(k-1)\) *and* \(P(k-2)\) are all true. This is certainly the case when proving something about a recurrence relation that is given as a combination of two previous terms.[🔗](#subsec-going-farther-back-3)

#### Example 4.6.1.

Prove that \(2^n\) is a solution to the recurrence relation \(a_n = 5a_{n-1} - 6a_{n-2}\) with initial conditions \(a_0 = 1\) and \(a_1 = 2\text{.}\)[🔗](#subsec-going-farther-back-4-1-1) Solution.

#### Proof.

Let \(P(n)\) be the statement, “\(a_n = 2^n\text{.}\)” We will show this is true for all \(n \ge 0\text{.}\)[🔗](#subsec-going-farther-back-4-2-1-1) Base cases: \(a_0 = 2^0 = 1\) and \(a_1 = 2^1 = 2\) both agree with the initial conditions.[🔗](#subsec-going-farther-back-4-2-1-2) Inductive case: Let \(k \ge 2\) be arbitrary. Assume \(P(k)\) and \(P(k-1)\) are both true. That is, assume \(a_k = 2^k\) and \(a_{k-1} = 2^{k-1}\text{.}\) We will show that \(P(k+1)\) is true. Consider \(a_{k+1}\text{.}\) We have \begin{align*} a_{k+1} = \amp 5a_k - 6a_{k-1}\\ = \amp 5\cdot 2^k - 6\cdot 2^{k-1}\\ = \amp 10 \cdot 2^{k-1} - 6 \cdot 2^{k-1}\\ = \amp 4\cdot 2^{k-1}\\ = \amp 2^{k+1}\text{.} \end{align*} Therefore, by the principle of mathematical induction, \(P(n)\) is true for all \(n \ge 0\text{.}\) [🔗](#subsec-going-farther-back-4-2-1-3) [🔗](#subsec-going-farther-back-4-2-1)Well, almost the principle of mathematical induction. Is what we did okay?[🔗](#subsec-going-farther-back-4-2-2) [🔗](#subsec-going-farther-back-4-2) [🔗](#subsec-going-farther-back-4)There are also times when we might want to go even farther back to use an assumption that \(P(j)\) is true for \(j\) much smaller than \(k+1\text{.}\) This is the idea behind strong induction and the topic of this short section.[🔗](#subsec-going-farther-back-5)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-strong-indcution)

#### 1.

Activate Consider the following puzzle:[🔗](#extracted-webwork-216-1-1-1) You have a rectangular chocolate bar, made up of \(n\) identical squares of chocolate. You can take such a bar and break it along any row or column. How many times will you have to break the bar to reduce it to \(n\) single chocolate squares?[🔗](#extracted-webwork-216-1-1-2) At first, this question might seem impossible. Perhaps we meant to ask for the *smallest* number of breaks needed. Let’s investigate.[🔗](#extracted-webwork-216-1-1-3)

#### (a)

Suppose you started with a \(1\times 3\) bar. How many breaks would you need to reduce it to single squares?[🔗](#extracted-webwork-216-1-2-1-1) [🔗](#extracted-webwork-216-1-2)

#### (b)

If you had a \(1\times 4\) bar, how many breaks are required?[🔗](#extracted-webwork-216-1-3-1-1) If you had 4 squares arranged in a \(2\times 2\) square, your first break would require you to break the chocolate into two \(1 \times 2\) bars. Then each of these would require more break(s), for a total of breaks to go from the \(2\times 2\) to single squares.[🔗](#extracted-webwork-216-1-3-1-2) [🔗](#extracted-webwork-216-1-3)

#### (c)

A \(6\)-square bar could either be a \(1 \times 6\) bar, requiring breaks, or a \(2 \times 3\) bar.[🔗](#extracted-webwork-216-1-4-1-1) There are two ways to proceed now.

1. Break the bar into two \(1 \times 3\) bars, each requiring more breaks, for a total of breaks.[🔗](#extracted-webwork-216-1-4-1-2-1-1-1) [🔗](#extracted-webwork-216-1-4-1-2-1-1)
2. Break the bar into a \(1\times 2\) bar and a \(2 \times 2\) bar. The \(1 \times 2\) bar takes more break(s) and the \(2 \times 2\) bar takes more break(s), for a total of breaks.[🔗](#extracted-webwork-216-1-4-1-2-1-2-1) [🔗](#extracted-webwork-216-1-4-1-2-1-2)

[🔗](#extracted-webwork-216-1-4-1-2) [🔗](#extracted-webwork-216-1-4)

#### (d)

Based on the above data, what should our conjecture be for the number of breaks to reduce an \(n\)-square bar to single squares, in terms of \(n\text{?}\)[🔗](#extracted-webwork-216-1-5-1-1) It will take breaks to reduce an \(n\)-square bar to single squares.[🔗](#extracted-webwork-216-1-5-1-2) [🔗](#extracted-webwork-216-1-5)

#### (e)

Do we believe this? Suppose you used one break to reduce the bar into two smaller bars, with \(a\) and \(b\) squares respectively. If the conjecture is correct, how many more breaks will it take to reduce the size \(a\) bar?[🔗](#extracted-webwork-216-1-6-1-1) How many more breaks will it take to reduce the size \(b\) bar?[🔗](#extracted-webwork-216-1-6-1-2) How many breaks is this all together, in terms of \(a\) and \(b\text{,}\) including the initial break?[🔗](#extracted-webwork-216-1-6-1-3) But what is \(a+b\text{?}\) We got \(a\) and \(b\) by breaking the \(n\) squares in two pieces, so \(a+b =\). This gives us a total number of breaks as .[🔗](#extracted-webwork-216-1-6-1-4) [🔗](#extracted-webwork-216-1-6) [🔗](#pa-strong-indcution-1)[🔗](#PA-strong-indcution)[🔗](#subsec-going-farther-back)

### Subsection Divide and Conquer

Think of recursive definitions as instructions for building a ladder. You can build the ladder as tall as you like because you have instructions for building the next rung, as long as you are standing on the rung before it.[🔗](#sec_seq-strong-induction-6-2) Induction is the corresponding proof technique. To prove that you can climb the ladder as high as you like, you prove that you can step onto the ladder (the base case) and then prove that, from any rung, you can get to the next rung (the inductive step).[🔗](#sec_seq-strong-induction-6-3) More specifically, suppose you were trying to prove that you can get to rung 4 on the ladder. You have successfully proved that you can get to rung 1, and that from any rung, you can get to the next. So you can get to rung 1, and from 1 you can get to 2. From 2 you can get to 3, and from 3 you can get to 4. Therefore, you can get to 4.[🔗](#sec_seq-strong-induction-6-4) But notice that along the way, you know you have visited rungs 1 through 3. We might as well assume that we have visited all the rungs below the next one we are trying to reach. This is the idea behind strong induction.[🔗](#sec_seq-strong-induction-6-5) A better ladder metaphor for strong induction is to think of ladders as things we can stack on top of each other. We want to argue that it is possible to climb 20 rungs of a ladder. Let’s divide that into two smaller ladders, say a 12-rung ladder and an 8-rung ladder. We can assume that we can climb both of these since 20 is the least size we are not yet convinced of. Well, put those two ladders together, and you get \(12+8 = 20\) rungs.[🔗](#sec_seq-strong-induction-6-6) We better climb down from our shaky metaphor before we hurt ourselves. Let’s look at a formal definition of strong induction.[🔗](#sec_seq-strong-induction-6-7)

#### Strong Induction Proof Structure.

Start by saying what we want to prove: “Let \(P(n)\) be the statement….” Then establish two facts:

1. Base case: Prove that \(P(0)\) is true. (Perhaps also prove other needed base cases.) [🔗](#sec_seq-strong-induction-6-8-3-2-1-1) [🔗](#sec_seq-strong-induction-6-8-3-2-1)
2. Inductive case: Assume \(P(j)\) is true for all \(j \le k\text{.}\) Prove that \(P(k+1)\) is true. [🔗](#sec_seq-strong-induction-6-8-3-2-2-1) [🔗](#sec_seq-strong-induction-6-8-3-2-2)

Conclude, “Therefore, by strong induction, \(P(n)\) is true for all \(n \gt 0\text{.}\)” [🔗](#sec_seq-strong-induction-6-8-3) [🔗](#sec_seq-strong-induction-6-8)Of course, it is acceptable to replace 0 with a larger base case if needed. 2 Technically, strong induction does not require you to prove a separate base case. This is because when proving the inductive case, you must show that \(P(0)\) is true, assuming \(P(k)\) is true for all \(k \lt 0\text{.}\) But this is not any help so you end up proving \(P(0)\) anyway. To be on the safe side, we will always include the base case separately.[🔗](#sec_seq-strong-induction-6-9) To illustrate strong induction, let’s return to the chocolate bar problem.[🔗](#sec_seq-strong-induction-6-10)

#### Proposition 4.6.2.

Given an \(n\)-square rectangular chocolate bar, it always takes \(n-1\) breaks to reduce the bar to single squares.[🔗](#prop-chocolate-1-1) [🔗](#prop-chocolate)

#### Proof.

Let \(P(n)\) be the statement, “It takes \(n-1\) breaks to reduce a \(n\)-square chocolate bar to single squares.”[🔗](#sec_seq-strong-induction-6-12-1) Base case: Consider \(P(2)\text{.}\) The squares must be arranged into a \(1\times 2\) rectangle, and we require \(2-1 = 1\) breaks to reduce this to single squares.[🔗](#sec_seq-strong-induction-6-12-2) Inductive case: Fix an arbitrary \(k\ge 2\) and assume \(P(j)\) is true for all \(j \le k\text{.}\) Consider a \((k+1)\)-square rectangular chocolate bar. Break the bar once along any row or column. This results in two chocolate bars, say of sizes \(a\) and \(b\) . That is, we have an \(a\)-square rectangular chocolate bar, a \(b\)-square rectangular chocolate bar, and \(a+b = k+1\text{.}\)[🔗](#sec_seq-strong-induction-6-12-3) We also know that \(a \le k\) and \(b \le k\text{,}\) so by our inductive hypothesis, \(P(a)\) and \(P(b)\) are true. To reduce the \(a\)-square bar to single squares takes \(a-1\) breaks; to reduce the \(b\)-square bar to single squares takes \(b-1\) breaks. Doing this results in our original bar being reduced to single squares. All together it took the initial break, plus the \(a-1\) and \(b-1\) breaks, for a total of \begin{equation*} 1+a-1+b-1 = a+b-1 = k+1 - 1 = k \end{equation*} breaks. Thus \(P(k+1)\) is true. [🔗](#sec_seq-strong-induction-6-12-4) Therefore, by strong induction, \(P(n)\) is true for all \(n \ge 2\text{.}\)[🔗](#sec_seq-strong-induction-6-12-5) [🔗](#sec_seq-strong-induction-6-12)Here is a more mathematically relevant example:[🔗](#sec_seq-strong-induction-6-13)

#### Example 4.6.3.

Prove that any natural number greater than 1 is either prime or can be written as the product of primes.[🔗](#sec_seq-strong-induction-6-14-1-1) Solution. First, the idea: If we take some number \(n\text{,}\) maybe it is prime. If so, we are done. If not, then it is composite, so it is the product of two smaller numbers. Each of these factors is smaller than \(n\) (but at least 2), so we can repeat the argument with these numbers. We have reduced to a smaller case.[🔗](#sec_seq-strong-induction-6-14-2-1) Now the formal proof:[🔗](#sec_seq-strong-induction-6-14-2-2)

#### Proof.

Let \(P(n)\) be the statement, “\(n\) is either prime or can be written as the product of primes.” We will prove \(P(n)\) is true for all \(n \ge 2\text{.}\)[🔗](#sec_seq-strong-induction-6-14-2-3-1) Base case: \(P(2)\) is true because \(2\) is indeed prime.[🔗](#sec_seq-strong-induction-6-14-2-3-2) Inductive case: assume \(P(j)\) is true for all \(j \le k\text{.}\) We want to show that \(P(k+1)\) is true. That is, we want to show that \(k+1\) is either prime or is the product of primes. If \(k+1\) is prime, we are done. If not, then \(k+1\) has more than 2 divisors, so we can write \(k+1 = m_1 \cdot m_2\text{,}\) with \(m_1\) and \(m_2\) less than \(k+1\) (and greater than 1). By the inductive hypothesis, \(m_1\) and \(m_2\) are each either prime or can be written as the product of primes. In either case, we have that \(m_1\cdot m_2 = k+1\) can be written as the product of primes.[🔗](#sec_seq-strong-induction-6-14-2-3-3) Thus by strong induction, \(P(n)\) is true for all \(n \ge 2\text{.}\)[🔗](#sec_seq-strong-induction-6-14-2-3-4) [🔗](#sec_seq-strong-induction-6-14-2-3)[🔗](#sec_seq-strong-induction-6-14-2) [🔗](#sec_seq-strong-induction-6-14)Whether you use regular induction or strong induction depends on the statement you want to prove. If you wanted to be safe, you could always use strong induction. It really is *stronger*, so can accomplish everything “weak” induction can. That said, using regular induction is often easier since there is only one place you can use the induction hypothesis. There is also something to be said for *elegance* in proofs. If you can prove a statement using simpler tools, it is nice to do so.[🔗](#sec_seq-strong-induction-6-15) [🔗](#sec_seq-strong-induction-6)

### Reading Questions Reading Questions

#### 1.

- True.
- This is backwards. You still prove the next case, you just get to assume all previous cases (not just the one previous case).
- False.
- This is backwards. You still prove the next case, you just get to assume all previous cases (not just the one previous case).

[🔗](#rq-seq-strong-induction-tf)

#### 2.

Which of the following claims about the relationship between proof by induction and proof by strong induction are true?[🔗](#rq-seq-strong-induction-compare-1-1)

- Any proof by induction can be written as a proof by strong induction.
- Any proof by strong induction can be written as a proof by induction.
- Strong induction is “stronger” because the base case is stronger.
- Strong induction is “stronger” because the inductive hypothesis is stronger.

[🔗](#rq-seq-strong-induction-compare)

#### 3.

What questions do you have? Write at least one question about the content of this section that you or a classmate might be curious about after reading this section.[🔗](#rq-seq-strong-induction-q-1-1) [🔗](#rq-seq-strong-induction-q)[🔗](#rqs-seq-strong-induction)

### Exercises Practice Problems

#### 1.

Suppose you are trying to prove, by strong induction, that a statement \(P(n)\) is true for all \(n \ge 0\text{.}\) What would you attempt to prove in the *induction step* of the proof? (Select all that apply.)[🔗](#mc-strong-induction-step-1-1)

- That assuming \(P(j)\) is true for all \(j \le k\text{,}\) for an arbitrary \(k \ge 0\text{,}\) we can prove that \(P(k+1)\) is true.
- That \((P(0) \wedge P(1) \wedge \cdots \wedge P(k))\) implies \(P(k+1)\) for all \(k \ge 0\text{.}\)
- That assuming \(P(k+1)\) is true for an arbitrary \(k \ge 0\text{,}\) we can prove that \(P(j)\) is true for all \(j \le k\text{.}\)
- That \(P(k+1)\) implies \(P(j)\) for all \(j \le k\text{.}\)
- That \(P(k-2)\) implies \(P(k+1)\) for at least one \(k \ge 0\text{.}\)

[🔗](#mc-strong-induction-step)

#### 2.

A simpler version of the chocolate bar problem is as follows: Suppose you have a chocolate bar that is \(n\) squares long. You can break the chocolate bar into two pieces by making a single straight break across the bar. No matter where you make the breaks, you will break the chocolate bar into \(n\) pieces by making \(n-1\) breaks.[🔗](#parsons-strong-induction-chocolate-1-1) Arrange some of the following statements in the correct order to form a proof of this claim by strong induction.[🔗](#parsons-strong-induction-chocolate-1-2)

```natural
Let \(P(n)\) be the statement that a chocolate bar that is \(n\) squares long can be broken into \(n\) pieces by making \(n-1\) breaks.
---

\(P(1)\) is true because a chocolate bar that is 1 square long is already in one piece.
---
Assume that \(P(j)\) is true for all \(j \le k\) for an arbitrary \(k \ge 1\text{.}\)

---
Consider a chocolate bar that is \(k+1\) squares long.
---
Anywhere you break this bar will result in two smaller bars, say of length \(a\) and \(b\text{.}\)

---
Since \(a\) and \(b\) are no more than \(k\text{,}\) it will be possible to break these smaller bars into single squares using \(a-1\) and \(b-1\) breaks, respectively.
---
The total number of breaks is therefore \(a-1 + b-1 + 1 = a+b -1\text{,}\) which is \(k+1-1 = k\text{.}\)

---
Therefore, by the principle of strong induction, \(P(n)\) is true for all \(n \ge 1\text{.}\)
```

[🔗](#parsons-strong-induction-chocolate)[🔗](#practice-sec-strong-induction)

### Exercises Additional Exercises

#### 1.

Suppose a football team only scores 3-point field goals and 7-point touchdowns (ignore the possibilities of safeties, missed extra points, and two-point conversions). Prove, using *strong* induction, that the team can get any number of points, 12 points or greater.[🔗](#exercises_seq-strong-induction-2-2-1) Hint. If you have three base cases, can you always be sure you can get three points more?[🔗](#exercises_seq-strong-induction-2-3-1) [🔗](#exercises_seq-strong-induction-2-3) [🔗](#exercises_seq-strong-induction-2)

#### 2.

Prove using *strong* induction that the sum of the interior angles of a convex \(n\)-gon is \((n-2)\cdot 180^\circ\text{.}\) (A convex \(n\)-gon is a polygon with \(n\) sides for which each interior angle is less than \(180^\circ\text{.}\))[🔗](#exercises_seq-strong-induction-3-2-1) Hint. Start with a \((k+1)\)-gon, and divide it into two smaller polygons.[🔗](#exercises_seq-strong-induction-3-3-1) [🔗](#exercises_seq-strong-induction-3-3) [🔗](#exercises_seq-strong-induction-3)

#### 3.

Prove that every positive integer is either a power of 2 or can be written as the sum of distinct powers of 2.[🔗](#exercises_seq-strong-induction-4-2-1) [🔗](#exercises_seq-strong-induction-4)

#### 4.

Prove, using strong induction, that every natural number is either a Fibonacci number or can be written as the *sum* of *distinct* Fibonacci numbers.[🔗](#exercises_seq-strong-induction-5-2-1) Hint. As with the previous question, we will want to subtract something from \(n\) in the inductive step. There we subtracted the largest power of 2 less than \(n\text{.}\) So what should you subtract here?[🔗](#exercises_seq-strong-induction-5-3-1) Note that you will still need to take care here that the sum you get from the inductive hypothesis, together with the number you subtracted, will be a sum of *distinct* Fibonacci numbers. In fact, you could prove that the Fibonacci numbers in the sum are non-consecutive![🔗](#exercises_seq-strong-induction-5-3-2) [🔗](#exercises_seq-strong-induction-5-3) [🔗](#exercises_seq-strong-induction-5)

#### 5.

We have previously proved that for any tree, the number of edges is always one less than the number of vertices. That is, a tree with \(v\) vertices and \(e\) edges satisfies \(v = e+1\text{.}\)[🔗](#exercises_seq-strong-induction-6-1-1) Give an alternate proof of this fact using strong induction on the number of vertices. Do so by taking a non-leaf vertex and “splitting” it into two vertices, each belonging to a separate tree.[🔗](#exercises_seq-strong-induction-6-1-2) [🔗](#exercises_seq-strong-induction-6)

#### 6.

Suppose that a particular real number \(x\) has the property that \(x + \frac{1}{x}\) is an integer. Prove that \(x^n + \frac{1}{x^n}\) is an integer for all natural numbers \(n\text{.}\)[🔗](#exercises_seq-strong-induction-7-1-1) Hint. You will need to use strong induction. For the inductive case, try multiplying \(\left (x^k + \frac{1}{x^{k}}\right)\left(x+\frac{1}{x}\right)\text{,}\) and collect which terms together are integers.[🔗](#exercises_seq-strong-induction-7-2-1) [🔗](#exercises_seq-strong-induction-7-2) [🔗](#exercises_seq-strong-induction-7)

#### 7.

Here is an example of a more complicated induction technique called double induction.[🔗](#exercises_seq-strong-induction-8-4-1) You will prove that the Fibonacci numbers satisfy the identity \(F_n^2 + F_{n+1}^2 = F_{2n+1}\text{.}\) One way to do this is to prove the more general identity, \begin{equation*} F_mF_n + F_{m+1}F_{n+1} = F_{m+n+1}\text{,} \end{equation*} and realize that when \(m = n\) we get our desired result. [🔗](#exercises_seq-strong-induction-8-4-2) Note that we now have two variables, so we want to prove this for all \(m \ge 0\) *and* all \(n \ge 0\) at the same time. For each such pair \((m,n)\text{,}\) let \(P(m,n)\) be the statement \(F_mF_n + F_{m+1}F_{n+1} = F_{m+n+1}\)[🔗](#exercises_seq-strong-induction-8-4-3)

#### (a)

First fix \(m = 0\text{,}\) and give a proof by mathematical induction that \(P(0,n)\) holds for all \(n \ge 0\text{.}\) Note that this proof will be very easy.[🔗](#exercises_seq-strong-induction-8-5-1-1) [🔗](#exercises_seq-strong-induction-8-5)

#### (b)

Now fix an arbitrary \(n\text{,}\) and give a proof by *strong* mathematical induction that \(P(m,n)\) holds for all \(m \ge 0\text{.}\)[🔗](#exercises_seq-strong-induction-8-6-1-1) [🔗](#exercises_seq-strong-induction-8-6)

#### (c)

You can now conclude that \(P(m,n)\) holds for all \(m,n\ge 0\text{.}\) Do you believe that? Explain why this sort of induction is valid. For example, why do your proofs above guarantee that \(P(2,3)\) is true?[🔗](#exercises_seq-strong-induction-8-7-1-1) [🔗](#exercises_seq-strong-induction-8-7)[🔗](#exercises_seq-strong-induction-8)

#### 8.

Given a square, you can cut the square into smaller squares by cutting along lines parallel to the sides of the original square (these lines do not need to travel the entire side length of the original square). For example, by cutting along the lines below, you will divide a square into 6 smaller squares:[🔗](#exercises_seq-strong-induction-9-2-1) ![One large square with five squares of half the side length wrapping around the top and right side, forming an even larger square.](generated/latex-image/exercises_seq-strong-induction-9-2-2-1.svg) Prove, using strong induction, that it is possible to cut a square into \(n\) smaller squares for any \(n \ge 6\text{.}\)[🔗](#exercises_seq-strong-induction-9-2-3) Hint. You will need three base cases. This is a very good hint actually, as it suggests that to prove \(P(n)\) is true, you would want to use the fact that \(P(n-3)\) is true. So somehow you need to increase the number of squares by 3.[🔗](#exercises_seq-strong-induction-9-3-1) [🔗](#exercises_seq-strong-induction-9-3) [🔗](#exercises_seq-strong-induction-9)[🔗](#exercises_seq-strong-induction)[🔗](#sec_seq-strong-induction) [&#xe5cb;Prev](sec_seq-induction.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_sequences-conc.html) [Feedback](/cdn-cgi/l/email-protection#b1dec2d2d0c39fddd4c7d8dff1c4dfd2de9fd4d5c4)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_seq-strong-induction-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_seq-strong-induction-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
