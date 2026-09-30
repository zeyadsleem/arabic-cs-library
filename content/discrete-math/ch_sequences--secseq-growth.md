---
title: "Rate of Growth"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_seq-growth.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 4.2 Rate of Growth

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_seq-growth-2-1-1)

1. Identify a sequence as arithmetic or geometric based on its rate of growth.[🔗](#sec_seq-growth-2-2-1-1) [🔗](#sec_seq-growth-2-2-1)
2. Give recursive definitions and closed formulas for arithmetic and geometric sequences.[🔗](#sec_seq-growth-2-2-2-1) [🔗](#sec_seq-growth-2-2-2)

[🔗](#sec_seq-growth-2)

### Subsection Section Preview

#### Investigate!

For each of the patterns of dots below, draw the next pattern in the sequence. Describe the rate of growth of the number of dots in the patterns. Then guess a recursive definition and a closed formula for the number of dots in the \(n\)th pattern.[🔗](#investigation-seqdots-1-1) ![A sequence of three dot patterns, starting with a single dot (labeled n = 0), then the same dot with four new dots extending into an X (labeled n = 1) and finally the same pattern but with four new dots extending onto the limbs of the X (labeled n = 2).](generated/latex-image/inv_dots-seq1.svg) ![A sequence of three dot patterns, labeled n = 0, n = 1, and n = 2, from left to right. The first pattern contains two dots, on above the other. The second pattern can be viewed as each of the dots from the first pattern splitting into 3, forming two triangles (so six dots total). The third patter again takes each dot from the second pattern and splits them into three, arranged as triangles (so 18 dots in total).](generated/latex-image/inv_dots-seq2.svg) ![A sequence of four dot patters, labeled n = 1 through n = 4. The first pattern is a single dot. The second adds a row of two dots below the single dot (so three dots in a triangle). The third pattern adds a row of three dots, creating six dots arranged in a triangle. Finally we add four dots below the previous six, still forming a triangle, this time of 10 dots.](generated/latex-image/inv_dots-seq3.svg) [🔗](#investigation-seqdots)Our goal is to find closed formulas for sequences. Our primary strategy will be to first determine how the sequence is changing from term to term. This will lead to a recurrence relation for the sequence, and from that recurrence relation, we will find a closed formula. We start with two types of sequences that are particularly common and useful: arithmetic and geometric sequences. Along the way, we will explore some techniques for solving recurrence relations.[🔗](#sec_seq-growth-3-3)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-seq-growth)

#### 1. Dots.

Activate Explore the first sequence of dots from the *Investigate!* activity. We will let \(a_n\) represent the number of dots in figure \(n\text{.}\) The sequence starts \(1, 5, 9,\ldots\)[🔗](#extracted-webwork-185-1-1-1)

#### (a)

How many dots would you expect in the next two figures in the sequence?[🔗](#extracted-webwork-185-1-2-1-1) Dots in \(n = 3\) figure: \(a_3 =\).[🔗](#extracted-webwork-185-1-2-1-2) Dots in \(n = 4\) figure: \(a_4 =\).[🔗](#extracted-webwork-185-1-2-1-3) [🔗](#extracted-webwork-185-1-2)

#### (b)

How is the sequence growing? To get the next figure, take the current figure and

- add[🔗](#extracted-webwork-185-1-3-1-1-1-1-1) [🔗](#extracted-webwork-185-1-3-1-1-1-1)
- multiply by[🔗](#extracted-webwork-185-1-3-1-1-1-2-1) [🔗](#extracted-webwork-185-1-3-1-1-1-2)

the constant dots. [🔗](#extracted-webwork-185-1-3-1-1) [🔗](#extracted-webwork-185-1-3)

#### (c)

Let \(a_n\) be the number of dots in figure \(n\text{.}\) Write a recursive definition for \(a_n\text{.}\)[🔗](#extracted-webwork-185-1-4-1-1) \(a_n =\) ; with \(a_0 =\) .[🔗](#extracted-webwork-185-1-4-1-2) [🔗](#extracted-webwork-185-1-4)

#### (d)

Guess a closed formula for the number of dots in the \(n\)th figure.[🔗](#extracted-webwork-185-1-5-1-1) \(a_n =\) .[🔗](#extracted-webwork-185-1-5-1-2) [🔗](#extracted-webwork-185-1-5) [🔗](#pa-sec-growth-1)

#### 2. More dots.

Activate Now look at the second sequence of dots from the *Investigate!* activity. We will let \(a_n\) represent the number of dots in figure \(n\text{.}\) The sequence starts \(2, 6, 18,\ldots\)[🔗](#extracted-webwork-186-1-1-1)

#### (a)

How many dots would you expect in the next two figures in the sequence?[🔗](#extracted-webwork-186-1-2-1-1) Dots in \(n = 3\) figure: \(a_3 =\).[🔗](#extracted-webwork-186-1-2-1-2) Dots in \(n = 4\) figure: \(a_4 =\).[🔗](#extracted-webwork-186-1-2-1-3) [🔗](#extracted-webwork-186-1-2)

#### (b)

How is the sequence growing? To get the next figure, take the current figure and

- add[🔗](#extracted-webwork-186-1-3-1-1-1-1-1) [🔗](#extracted-webwork-186-1-3-1-1-1-1)
- multiply by[🔗](#extracted-webwork-186-1-3-1-1-1-2-1) [🔗](#extracted-webwork-186-1-3-1-1-1-2)

the constant . [🔗](#extracted-webwork-186-1-3-1-1) [🔗](#extracted-webwork-186-1-3)

#### (c)

Let \(a_n\) be the number of dots in figure \(n\text{.}\) Write a recursive definition for \(a_n\text{.}\)[🔗](#extracted-webwork-186-1-4-1-1) \(a_n =\) ; with \(a_0 =\) .[🔗](#extracted-webwork-186-1-4-1-2) [🔗](#extracted-webwork-186-1-4)

#### (d)

Guess a closed formula for the number of dots in the \(n\)th figure.[🔗](#extracted-webwork-186-1-5-1-1) \(a_n =\) .[🔗](#extracted-webwork-186-1-5-1-2) [🔗](#extracted-webwork-186-1-5) [🔗](#pa-sec-growth-2)

#### 3. Even more dots.

Activate Now look at the third sequence of dots from the *Investigate!* activity. We will let \(a_n\) represent the number of dots in figure \(n\text{.}\) The sequence starts \(1, 3, 6, 10,\ldots\)[🔗](#extracted-webwork-187-1-1-1)

#### (a)

How many dots would you expect in the next two figures in the sequence?[🔗](#extracted-webwork-187-1-2-1-1) Dots in \(n = 5\) figure: \(a_5 =\).[🔗](#extracted-webwork-187-1-2-1-2) Dots in \(n = 6\) figure: \(a_6 =\).[🔗](#extracted-webwork-187-1-2-1-3) [🔗](#extracted-webwork-187-1-2)

#### (b)

Let \(a_n\) be the number of dots in figure \(n\text{.}\) Write a recursive definition for \(a_n\text{.}\)[🔗](#extracted-webwork-187-1-3-1-1) \(a_n =\) ; with \(a_1 =\) .[🔗](#extracted-webwork-187-1-3-1-2) [🔗](#extracted-webwork-187-1-3)

#### (c)

Guess a closed formula for the number of dots in the \(n\)th figure.[🔗](#extracted-webwork-187-1-4-1-1) \(a_n =\) .[🔗](#extracted-webwork-187-1-4-1-2) [🔗](#extracted-webwork-187-1-4) [🔗](#pa-sec-growth-3)[🔗](#PA-seq-growth)[🔗](#sec_seq-growth-3)

### Subsection Arithmetic Sequences

Suppose you start a business selling prints of mathematical art. In week zero, you sell two prints. Each week after that, you sell four more prints than you did the previous week. How many prints will you sell in the \(n\)th week?[🔗](#subsec-arithmetic-2) We can easily compute the first few terms of the sequence: \(2, 6, 10, 14,\ldots\text{.}\) How do I know this is correct? From the problem, we see that to get from one term to the next, we must add 4. It is clear then that the recurrence relation for the sequence is \begin{equation*} a_n = a_{n-1} + 4\text{.} \end{equation*} The *rate of growth* for the sequence is the constant \(4\) since the *difference* between any two terms is 4 (note, we could write the recurrence relation as \(a_n - a_{n-1} = 4\)). [🔗](#subsec-arithmetic-3) We call sequences with a *constant rate of change* arithmetic sequences.[🔗](#subsec-arithmetic-4) Now let’s find a closed formula for our sequence. The first term is \(a_0 = 2\text{.}\) To get \(a_1\text{,}\) we add \(4\text{.}\) The next term requires us to add \(4\) again, which means we have added \(4\) to our initial term twice. Then we add \(4\) again, for a total of three times for \(a_3\text{.}\) In fact, to get \(a_n\text{,}\) we will have added \(4\) to \(a_0\) a total of \(n\) times. Thus, the closed formula for the sequence is \begin{equation*} a_n = 2 + 4n\text{.} \end{equation*} [🔗](#subsec-arithmetic-5) This works for any arithmetic sequence. That is, any sequence with a constant difference will have a *linear* closed formula, where the “slope” of the linear function is the common difference.[🔗](#subsec-arithmetic-6)

#### Arithmetic Sequences.

If the terms of a sequence differ by a constant, we say the sequence is arithmetic. If the initial term (\(a_0\)) of the sequence is \(a\) and the common difference is \(d\text{,}\) then we have,[🔗](#subsec-arithmetic-7-6) Recursive definition: \(a_n = a_{n-1} + d\) with \(a_0 = a\text{.}\)[🔗](#subsec-arithmetic-7-7) Closed formula: \(a_n = a + dn\text{.}\)[🔗](#subsec-arithmetic-7-8) [🔗](#subsec-arithmetic-7) As we did for our example above, for the recursive definition, we need to specify \(a_0\text{.}\) Then we need to express \(a_n\) in terms of \(a_{n-1}\text{.}\) If we call the first term \(a\text{,}\) then \(a_0 = a\text{.}\) For the recurrence relation, by the definition of an arithmetic sequence, the difference between successive terms is some constant, say \(d\text{.}\) So \(a_n - a_{n-1} = d\text{,}\) or in other words, \begin{equation*} a_0 = a \qquad a_n = a_{n-1} + d\text{.} \end{equation*} [🔗](#subsec-arithmetic-8) Let’s now argue why the closed formula is correct. One way we could do this is by using a technique sometimes called telescoping (a name which hopefully we become meaningful momentarily).[🔗](#subsec-arithmetic-9) We write the recurrence relation in its *difference* form, \(a_n - a_{n-1} = d\) for all terms starting with \(a_1\) and going up to \(a_n\text{.}\) This gives the following: \begin{align*} a_1 - a_0 = \amp d\\ a_2 - a_1 = \amp d\\ a_3 - a_2 = \amp d\\ \vdots \amp \\ a_{n-1} - a_{n-2} = \amp d\\ a_n - a_{n-1} = \amp d\text{.} \end{align*} Now we add all \(n\) equations together. [🔗](#subsec-arithmetic-10) On the right-hand side, we have added \(d\) to itself \(n\) times, so the sum is \(d\cdot n\text{.}\)[🔗](#subsec-arithmetic-11) On the left-hand side, we get the sum: \begin{equation*} (a_1 - a_0) + (a_2 - a_1) + (a_3 - a_2) + \cdots + (a_{n-1} - a_{n-2}) + (a_n - a_{n-1})\text{.} \end{equation*} But look what happens when we regroup and cancel like terms: \begin{equation*} \cancel{a_1} - a_0 + \cancel{a_2} - \cancel{a_1} + \cancel{a_3} - \cancel{a_2} + \cdots + \cancel{a_{n-1}} - \cancel{a_{n-2}} + a_n - \cancel{a_{n-1}} = a_n - a_0\text{.} \end{equation*} The sum *telescopes* down to be nice and compact for easy storage. [🔗](#subsec-arithmetic-12) Putting the two sides together gives us \begin{equation*} a_n - a_0 = d \cdot n \end{equation*} which becomes \begin{equation*} a_n = a_0 + d \cdot n \end{equation*} as we claimed. [🔗](#subsec-arithmetic-13) The telescoping we did above is useful in other contexts (see [Exercise 6](sec_seq-growth.html#ex-telescoping-sum)), but now that we have established a general form of the closed formula, we can apply it to any arithmetic sequence.[🔗](#subsec-arithmetic-14)

#### Example 4.2.1.

Find recursive definitions and closed formulas for the arithmetic sequences below. Assume the first term listed is \(a_0\text{.}\)[🔗](#subsec-arithmetic-15-1-1)

1. \(2, 5, 8, 11, 14, \ldots\text{.}\) [🔗](#subsec-arithmetic-15-1-2-1-1)
2. \(50, 43, 36, 29, \ldots\text{.}\) [🔗](#subsec-arithmetic-15-1-2-1-2)

[🔗](#subsec-arithmetic-15-1-2) Solution. First we should check that these sequences really are arithmetic by taking differences of successive terms. Doing so will reveal the common difference \(d\text{.}\)[🔗](#subsec-arithmetic-15-2-1)

1. \(5-2 = 3\text{,}\) \(8-5 = 3\text{,}\) etc. To get from each term to the next, we add three, so \(d = 3\text{.}\) The recursive definition is therefore \(a_n = a_{n-1} + 3\) with \(a_0 = 2\text{.}\) The closed formula is \(a_n = 2 + 3n\text{.}\) [🔗](#subsec-arithmetic-15-2-2-1-1)
2. Here the common difference is \(-7\text{,}\) since we add \(-7\) to 50 to get 43, and so on. Thus we have a recursive definition of \(a_n = a_{n-1} - 7\) with \(a_0 = 50\text{.}\) The closed formula is \(a_n = 50 - 7n\text{.}\)[🔗](#subsec-arithmetic-15-2-2-1-2-1) [🔗](#subsec-arithmetic-15-2-2-1-2)

[🔗](#subsec-arithmetic-15-2-2) [🔗](#subsec-arithmetic-15-2) [🔗](#subsec-arithmetic-15)[🔗](#subsec-arithmetic)

### Subsection Geometric Sequences

What about sequences like \(3, 6, 12, 24, 48, \ldots\text{?}\) This is not arithmetic because the difference between terms is not constant. However, the *ratio* between successive terms is constant: \(\frac{6}{3} = \frac{12}{6} = \frac{24}{12} = \cdots = 2\) We call such sequences geometric.[🔗](#subsec-geometric-sequences-2) Recognizing that the sequence is geometric lets us easily write down a recursive definition. \(a_n = 2 a_{n-1}\text{,}\) with \(a_0 = 3\text{.}\)[🔗](#subsec-geometric-sequences-3) A closed formula is also not difficult to reason out. How do we get the term \(a_3\) for example? We start with \(3\text{,}\) then multiply by 2 to get \(a_1\text{,}\) multiply by \(2\) again to get \(a_2\text{,}\) and multiply by \(2\) a third time to get \(a_3\text{.}\) So we multiplied \(3\) by \(2\) a total of three times, or \(a_3 = 3\cdot 2^3\text{.}\) It looks like \(a_n = 3\cdot 2^n\text{.}\)[🔗](#subsec-geometric-sequences-4) In general, the recursive definition for the geometric sequence with initial term \(a\) and common ratio \(r\) will be \begin{equation*} a_n = a_{n-1}\cdot r; a_0 = a\text{.} \end{equation*} To get the next term we multiply the previous term by \(r\text{.}\) [🔗](#subsec-geometric-sequences-5) For the general closed formula, we could try something like telescoping again, although we would need to cancel fractions. Instead, let’s illustrate another technique for solving recurrence relations called iteration. The idea here is that we work our way up to \(a_n\) and notice the pattern. Write \begin{align*} a_0 \amp = a\\ a_1 \amp = a_0\cdot r\\ a_2 \amp = a_1 \cdot r = a_0\cdot r\cdot r = a_0\cdot r^2\\ a_3 \amp = a_2 \cdot r = a_0 \cdot r^2 \cdot r = a_0 \cdot r^3\\ \amp \vdots\\ a_n \amp = a_{n-1} \cdot r = a_0 \cdot r^{n-1}\cdot r = a_0 r^n\text{.} \end{align*} We must multiply the first term \(a\) by \(r\) a number of times, \(n\) times to be precise. We get \(a_n = a\cdot r^{n}\text{.}\) [🔗](#subsec-geometric-sequences-6)

#### Geometric Sequences.

A sequence is called geometric if the ratio between successive terms is constant. Suppose the initial term \(a_0\) is \(a\) and the common ratio is \(r\text{.}\) Then we have,[🔗](#subsec-geometric-sequences-7-6) Recursive definition: \(a_n = ra_{n-1}\) with \(a_0 = a\text{.}\)[🔗](#subsec-geometric-sequences-7-7) Closed formula: \(a_n = a\cdot r^{n}\text{.}\)[🔗](#subsec-geometric-sequences-7-8) [🔗](#subsec-geometric-sequences-7)

#### Example 4.2.2.

Find the recursive and closed formula for the geometric sequences below. Again, the first term listed is \(a_0\text{.}\)

1. \(\displaystyle 3, 6, 12, 24, 48, \ldots\) [🔗](#subsec-geometric-sequences-8-1-1-2-1)
2. \(\displaystyle 27, 9, 3, 1, 1/3, \ldots\) [🔗](#subsec-geometric-sequences-8-1-1-2-2)

[🔗](#subsec-geometric-sequences-8-1-1) Solution. Start by checking that these sequences really are geometric by dividing each term by its previous term. If this ratio really is constant, we will have found \(r\text{.}\)

1. \(6/3 = 2\text{,}\) \(12/6 = 2\text{,}\) \(24/12 = 2\text{,}\) etc. Yes, to get from any term to the next, we multiply by \(r = 2\text{.}\) So the recursive definition is \(a_n = 2a_{n-1}\) with \(a_0 = 3\text{.}\) The closed formula is \(a_n = 3\cdot 2^{n}\text{.}\) [🔗](#subsec-geometric-sequences-8-2-1-2-1)
2. The common ratio is \(r = 1/3\text{.}\) So the sequence has recursive definition \(a_n = \frac{1}{3}a_{n-1}\) with \(a_0 = 27\) and closed formula \(a_n = 27\cdot \frac{1}{3}^{n}\text{.}\)[🔗](#subsec-geometric-sequences-8-2-1-2-2-1) [🔗](#subsec-geometric-sequences-8-2-1-2-2)

[🔗](#subsec-geometric-sequences-8-2-1) [🔗](#subsec-geometric-sequences-8-2) [🔗](#subsec-geometric-sequences-8)Geometric sequences are those which have a growth rate that is *proportional* to the sequence itself. Just like you might have seen in calculus, it is exactly the exponential functions that have this property.[🔗](#subsec-geometric-sequences-9) In the examples and formulas above, we assumed that the *initial* term was \(a_0\text{.}\) If your sequence starts with \(a_1\text{,}\) you can easily find the term that would have been \(a_0\) and use that in the formula. For example, if we want a formula for the sequence \(2, 5, 8,\ldots\) and insist that \(2= a_1\text{,}\) then we can find \(a_0 = -1\) (since the sequence is arithmetic with common difference 3, we have \(a_0 + 3 = a_1\)). Then the closed formula will be \(a_n = -1 + 3n\text{.}\)[🔗](#subsec-geometric-sequences-10)

#### Remark 4.2.3.

If you look at other sources, you might find that their closed formulas for arithmetic and geometric sequences differ from ours. Specifically, you might find the formulas \(a_n = a +(n-1)d\) (arithmetic) and \(a_n = a\cdot r^{n-1}\) (geometric). Which is correct? Both! In our case, we take \(a\) to be \(a_0\text{.}\) If instead we had \(a_1\) as our initial term, we would get the (slightly more complicated) formulas you find elsewhere.[🔗](#subsec-geometric-sequences-11-1) [🔗](#subsec-geometric-sequences-11)[🔗](#subsec-geometric-sequences)

### Subsection Beyond Arithmetic and Geometric Sequences

Look at the sequence \((T_n)_{n\ge 1}\) which starts \(1, 3, 6, 10, 15,\ldots\text{.}\) These are called the triangular numbers since they represent the number of dots in an equilateral triangle (think of how you arrange 10 bowling pins: a row of 4 plus a row of 3 plus a row of 2 and a row of 1).[🔗](#subsec-beyond-arithmetic-and-geometric-sequences-2) ![A sequence of four dot patters, showing the first four triangular numbers: the patterns contain 1, 3, 6, and 10 dots, arranged in triangles with base 1, 2, 3, and 4, respectively.](generated/latex-image/subsec-beyond-arithmetic-and-geometric-sequences-3-1.svg) Is this sequence arithmetic? No, since \(3-1 = 2\) and \(6-3 = 3 \ne 2\text{,}\) so there is no common difference. Is the sequence geometric? No. \(3/1 = 3\) but \(6/3 = 2\text{,}\) so there is no common ratio. What to do?[🔗](#subsec-beyond-arithmetic-and-geometric-sequences-4) Notice that the *differences* between terms *do* form an arithmetic sequence: \(2, 3, 4, 5, 6,\ldots\text{.}\) In other words, the rate of change of this sequence is arithmetic: \(T_n - T_{n-1} = n\text{,}\) which immediately gives us the recurrence relation \(T_n = T_{n-1} + n\text{.}\)[🔗](#subsec-beyond-arithmetic-and-geometric-sequences-5) Another way to think of this is that the \(n\)th term of the sequence \((T_n)\) is the *sum* of the first \(n\) terms in the sequence \(1,2,3,4,5,\ldots\text{.}\) Thus \((T_n)\) is the sequence of partial sums of the sequence \(1,2,3,\ldots\) (*partial* sums because we are not taking the sum of all infinitely many terms).[🔗](#subsec-beyond-arithmetic-and-geometric-sequences-6) This should become clearer if we expand the recurrence relation to write the triangular numbers like this: \begin{align*} T_1 = 1 \amp = 1\\ T_2 = 3 \amp = 1+2\\ T_3 = 6 \amp = 1 + 2 + 3\\ T_4 = 10 \amp = 1+ 2 + 3+ 4\\ \vdots \amp \qquad \vdots\\ T_n \amp = 1 + 2 + 3 + \cdots + n\text{.} \end{align*} We are really using *iteration* here. We could also have seen this by using telescoping, taking \(T_0 = 0\text{:}\) \begin{align*} T_1-T_0 = \amp 1\\ T_2 - T_1 = \amp 2\\ T_3 - T_2 = \amp 3\\ \vdots \amp \\ T_n - T_{n-1} = \amp n\text{.} \end{align*} Summing these equations, the right-hand side becomes \(1+2+3+\cdots + n\text{;}\) the left-hand side cancels to leave just \(T_n - T_0 = T_n\text{.}\) [🔗](#subsec-beyond-arithmetic-and-geometric-sequences-7) If we know how to add up the terms of an arithmetic sequence, we can find a closed formula for a sequence whose differences are the terms of that arithmetic sequence. Consider how we could find the sum of the first 100 positive integers (that is, \(T_{100}\)). Instead of adding them in order, we regroup and add \(1+100 = 101\text{.}\) The next pair to combine is \(2+99 = 101\text{.}\) Then \(3+98 = 101\text{.}\) Keep going. This gives 50 pairs which each add up to \(101\text{,}\) so \(T_{100} = 101\cdot 50 = 5050\text{.}\) 1 This insight is usually attributed to Carl Friedrich Gauss, one of the greatest mathematicians of all time, who discovered it as a child when his unpleasant elementary teacher thought he would keep the class busy by requiring them to compute the lengthy sum.[🔗](#subsec-beyond-arithmetic-and-geometric-sequences-8) In general, using this same sort of regrouping, we find that \(T_n = \frac{n(n+1)}{2}\text{.}\) Incidentally, this is exactly the same as \({n+1 \choose 2}\text{,}\) which makes sense if you think of the triangular numbers as counting the number of handshakes that take place at a party with \(n+1\) people: the first person shakes \(n\) hands, the next shakes an additional \(n-1\) hands and so on.[🔗](#subsec-beyond-arithmetic-and-geometric-sequences-9) The point of all of this is that some sequences, while not arithmetic or geometric, can be interpreted as the sequence of partial sums of arithmetic and geometric sequences. Luckily there are methods we can use to compute these sums quickly, which we will explore in the next two sections.[🔗](#subsec-beyond-arithmetic-and-geometric-sequences-10) [🔗](#subsec-beyond-arithmetic-and-geometric-sequences)

### Reading Questions Reading Questions

#### 1.

- \(a_n = 2n+3\)
- Arithmetic; closed
- \(a_n = a_{n-1} + 3\)
- Arithmetic; recursive
- \(a_n = 3\cdot 2^n\)
- Geometric; closed
- \(a_n = 3a_{n-1}\)
- Geometric; recursive

[🔗](#rq-seq-arithgeom-match)

#### 2.

How can you decide whether a sequence is the sequence of partial sums of an arithmetic or geometric sequence? Describe what you would do to check, using an example.[🔗](#rq-seq-arithgeom-fr-difference-1-1) [🔗](#rq-seq-arithgeom-fr-difference)

#### 3.

What questions do you have? Write at least one question about the content of this section that you or a classmate might be curious about after reading this section.[🔗](#rq-seq-arithgeom-q-1-1) [🔗](#rq-seq-arithgeom-q)[🔗](#rqs-seq-arithgeom)

### Exercises Practice Problems

#### 1.

Activate Consider the recurrence relation \(a_n = a_{n-1} + 9\text{.}\)[🔗](#extracted-webwork-188-1-1-1)

#### (a)

Find the first five terms of the sequence defined by the recurrence relation and initial condition \(a_0 = 16\text{.}\)[🔗](#extracted-webwork-188-1-2-1-1) [🔗](#extracted-webwork-188-1-2)

#### (b)

Find the closed formula for the sequence defined by the recurrence relation and initial condition \(a_0 = 16\text{.}\)[🔗](#extracted-webwork-188-1-3-1-1) \(a_n =\)[🔗](#extracted-webwork-188-1-3-1-2) [🔗](#extracted-webwork-188-1-3)

#### (c)

Find the first five terms of another sequence, also defined by the same recurrence relation but this time with initial condition \(a_0 = 3\text{.}\)[🔗](#extracted-webwork-188-1-4-1-1) [🔗](#extracted-webwork-188-1-4)

#### (d)

Find the closed formula for this second sequence.[🔗](#extracted-webwork-188-1-5-1-1) \(a_n =\)[🔗](#extracted-webwork-188-1-5-1-2) [🔗](#extracted-webwork-188-1-5) [🔗](#ww-arithgeom-solve-recurrence-arith)

#### 2.

Activate Consider the recurrence relation \(a_n = 9a_{n-1}\text{.}\)[🔗](#extracted-webwork-189-1-1-1)

#### (a)

Find the first five terms of the sequence defined by the recurrence relation and initial condition \(a_0 = 9\text{.}\)[🔗](#extracted-webwork-189-1-2-1-1) [🔗](#extracted-webwork-189-1-2)

#### (b)

Find the closed formula for the sequence defined by the recurrence relation and initial condition \(a_0 = 9\text{.}\)[🔗](#extracted-webwork-189-1-3-1-1) \(a_n =\)[🔗](#extracted-webwork-189-1-3-1-2) [🔗](#extracted-webwork-189-1-3)

#### (c)

Find the first five terms of another sequence, also defined by the same recurrence relation but this time with initial condition \(a_0 = 12\text{.}\)[🔗](#extracted-webwork-189-1-4-1-1) [🔗](#extracted-webwork-189-1-4)

#### (d)

Find the closed formula for this second sequence.[🔗](#extracted-webwork-189-1-5-1-1) \(a_n =\)[🔗](#extracted-webwork-189-1-5-1-2) [🔗](#extracted-webwork-189-1-5) [🔗](#ww-arithgeom-solve-recurrence-geom)

#### 3.

Activate Find a closed formula for the sequence that starts \(2, {4}, {8}, {16}, {32},\ldots\text{.}\) Assume \(a_0 = 2\text{.}\)[🔗](#extracted-webwork-190-1-1-1) \(a_n =\)[🔗](#extracted-webwork-190-1-1-2) [🔗](#ww-arithgeom-seq-to-formula-1)

#### 4.

Activate Find a closed formula for the sequence that starts \(15, {18}, {21}, {24}, {27},\ldots\text{.}\) Assume \(a_0 = 15\text{.}\)[🔗](#extracted-webwork-191-1-1-1) \(a_n =\)[🔗](#extracted-webwork-191-1-1-2) [🔗](#ww-arithgeom-seq-to-formula-2)

#### 5.

Activate Consider the sequence that starts \(3, 8, 13, 18, 23,\ldots\) where \(a_0 = 3\text{.}\)[🔗](#extracted-webwork-192-1-1-1)

#### (a)

Which of the following could be a recursive definition for the sequence?[🔗](#extracted-webwork-192-1-2-1-1)

- \(a_n = a_{n-1} + a_{n-2}\text{;}\) \(a_0 = 3\)[🔗](#extracted-webwork-192-1-2-1-2-1-1-1) [🔗](#extracted-webwork-192-1-2-1-2-1-1)
- \(a_n = 5 \cdot a_{n-1}\text{;}\) \(a_0 = 3\)[🔗](#extracted-webwork-192-1-2-1-2-1-2-1) [🔗](#extracted-webwork-192-1-2-1-2-1-2)
- \(a_n = a_{n-1} + 5\text{;}\) \(a_0 = 3\)[🔗](#extracted-webwork-192-1-2-1-2-1-3-1) [🔗](#extracted-webwork-192-1-2-1-2-1-3)
- \(\displaystyle a_n = 3 \cdot 5^n\)[🔗](#extracted-webwork-192-1-2-1-2-1-4-1) [🔗](#extracted-webwork-192-1-2-1-2-1-4)
- None of the above[🔗](#extracted-webwork-192-1-2-1-2-1-5-1) [🔗](#extracted-webwork-192-1-2-1-2-1-5)

[🔗](#extracted-webwork-192-1-2-1-2) [🔗](#extracted-webwork-192-1-2)

#### (b)

Find the closed formula for the sequence.[🔗](#extracted-webwork-192-1-3-1-1) [🔗](#extracted-webwork-192-1-3)

#### (c)

Is 2598 a term of the sequence?[🔗](#extracted-webwork-192-1-4-1-1)

- Yes, it is \(a_{518}\)[🔗](#extracted-webwork-192-1-4-1-2-1-1-1) [🔗](#extracted-webwork-192-1-4-1-2-1-1)
- Yes, it is \(a_{2598}\)[🔗](#extracted-webwork-192-1-4-1-2-1-2-1) [🔗](#extracted-webwork-192-1-4-1-2-1-2)
- No, it is larger than 733[🔗](#extracted-webwork-192-1-4-1-2-1-3-1) [🔗](#extracted-webwork-192-1-4-1-2-1-3)
- No, it is between 2596 and 2601[🔗](#extracted-webwork-192-1-4-1-2-1-4-1) [🔗](#extracted-webwork-192-1-4-1-2-1-4)
- Yes, it is \(a_{519}\)[🔗](#extracted-webwork-192-1-4-1-2-1-5-1) [🔗](#extracted-webwork-192-1-4-1-2-1-5)
- None of the above[🔗](#extracted-webwork-192-1-4-1-2-1-6-1) [🔗](#extracted-webwork-192-1-4-1-2-1-6)

[🔗](#extracted-webwork-192-1-4-1-2) [🔗](#extracted-webwork-192-1-4) [🔗](#ww-arithgeom-seq-info)

#### 6.

Activate Your summer job pays you $1000 per week, with a raise of $50 per week as a bonus for not being a quitter. How much will you make in the 10th week?[🔗](#extracted-webwork-193-1-1-1) [🔗](#ww-arithgeom-arith-application)

#### 7.

Activate Your sister’s summer job pays her $1000 per week, with a raise of 5% per week as a bonus for not being a quitter. How much will she make in the 10th week?[🔗](#extracted-webwork-194-1-1-1) [🔗](#ww-arithgeom-geom-application)

#### 8.

Activate Find \(x\) and \(y\) such that \(125, x, y, 1\) is part of an arithmetic sequence.[🔗](#extracted-webwork-195-1-1-1) \(x =\) , \(y =\) [🔗](#extracted-webwork-195-1-1-2) Then find \(x\) and \(y\) so that the sequence is part of a geometric sequence.[🔗](#extracted-webwork-195-1-1-3) \(x =\) , \(y =\) [🔗](#extracted-webwork-195-1-1-4) (Warning: \(x\) and \(y\) might not be integers.)[🔗](#extracted-webwork-195-1-1-5) [🔗](#ww-arithgeom-middle-terms1)

#### 9.

Activate Find \(x\) and \(y\) such that \(5, x, y, 44\) is part of an arithmetic sequence.[🔗](#extracted-webwork-196-1-1-1) \(x =\) , \(y =\) [🔗](#extracted-webwork-196-1-1-2) Then find \(x\) and \(y\) so that the sequence is part of a geometric sequence.[🔗](#extracted-webwork-196-1-1-3) \(x =\) , \(y =\) [🔗](#extracted-webwork-196-1-1-4) (Warning: \(x\) and \(y\) might not be integers.)[🔗](#extracted-webwork-196-1-1-5) [🔗](#ww-arithgoem-middle-terms2)[🔗](#practice_seq-growth)

### Exercises Additional Exercises

#### 1.

Suppose that the candy machine currently holds exactly 650 Skittles, and every time someone inserts a quarter, exactly 7 Skittles come out of the machine.

1. How many Skittles will be left in the machine after 20 quarters have been inserted?[🔗](#exercises_seq-growth-2-1-1-1-1-1) [🔗](#exercises_seq-growth-2-1-1-1-1)
2. Will there ever be exactly zero Skittles left in the machine? Explain.[🔗](#exercises_seq-growth-2-1-1-1-2-1) [🔗](#exercises_seq-growth-2-1-1-1-2)

[🔗](#exercises_seq-growth-2-1-1) [🔗](#exercises_seq-growth-2)

#### 2.

Is there a pair of integers \((a,b)\) such that \(a, x_1, y_1, b\) is part of an arithmetic sequence and \(a, x_2, y_2, b\) is part of a geometric sequence with \(x_1, x_2, y_1, y_2\) all integers?[🔗](#exercises_seq-growth-3-1-1) [🔗](#exercises_seq-growth-3)

#### 3.

Are there any sequences that are both arithmetic and geometric? If so, how many can you find? If not, explain why not.[🔗](#exercises_seq-growth-4-1-1) [🔗](#exercises_seq-growth-4)

#### 4.

Starting with any rectangle, we can create a new, larger rectangle by attaching a square to the longer side. For example, if we start with a \(2\times 5\) rectangle, we would glue on a \(5\times 5\) square, forming a \(5 \times 7\) rectangle:[🔗](#exercises_seq-growth-5-1-1) ![On the left, a 5x5 square to the right of a rectangle with base 2 and height 5, separated by a small gap. An arrow points to the right, where a rectangle of base 7 and height 5 is shown, including a dotted line representing where the square and triangle on the left were glued together.](generated/latex-image/exercises_seq-growth-5-1-2-1.svg) The next rectangle would be formed by attaching a \(7 \times 7\) square to the top or bottom of the \(5\times 7\) rectangle.

1. Create a sequence of rectangles using this rule starting with a \(1\times 2\) rectangle. Then write out the sequence of *perimeters* for the rectangles (the first term of the sequence would be 6, since the perimeter of a \(1\times 2\) rectangle is 6; the next term would be 10).[🔗](#exercises_seq-growth-5-1-3-3-1-1) [🔗](#exercises_seq-growth-5-1-3-3-1)
2. Repeat the above part, this time starting with a \(1 \times 3\) rectangle.[🔗](#exercises_seq-growth-5-1-3-3-2-1) [🔗](#exercises_seq-growth-5-1-3-3-2)
3. Find recursive formulas for each of the sequences of perimeters you found in parts (a) and (b). Don’t forget to give the initial conditions as well.[🔗](#exercises_seq-growth-5-1-3-3-3-1) [🔗](#exercises_seq-growth-5-1-3-3-3)
4. Are the sequences arithmetic? Geometric? If not, are they *close* to being either of these (i.e., are the differences or ratios *almost* constant)? Explain.[🔗](#exercises_seq-growth-5-1-3-3-4-1) [🔗](#exercises_seq-growth-5-1-3-3-4)

[🔗](#exercises_seq-growth-5-1-3) [🔗](#exercises_seq-growth-5)

#### 5.

Prove that the closed formula for a geometric sequence with initial term \(a \ne 0\) and common ratio \(r\) is \(a_n = a r^n\text{,}\) using *telescoping*.[🔗](#exercises_seq-growth-6-1-1) Hint. We can write the recurrence relation as \(\frac{a_n}{a_{n-1}} = r\text{.}\) What happens when you multiply all the different versions of this recurrence relation (for different values of \(n\)) together?[🔗](#exercises_seq-growth-6-2-1) [🔗](#exercises_seq-growth-6-2) [🔗](#exercises_seq-growth-6)

#### 6. Telescoping to find a sum.

Another context in which sequences arise is calculus when you study sequences and series (which is the word in calculus for what we call a sequence of partial sums). Some of the techniques we have developed here can be applied there as well. This is an example of a telescoping sum, similar to the telescoping technique we used.[🔗](#ex-telescoping-sum-2-1) Consider the sequence \((a_n)_{n \ge 1}\) that starts \begin{equation*} \frac{1}{1}, \frac{1}{3}, \frac{1}{6}, \frac{1}{10}, \frac{1}{15}, \ldots\text{.} \end{equation*} That is, each term is the reciprocal of the \(n\)th triangular number. Find the sum of the first \(n\) terms of this sequence: \begin{equation*} \sum_{k=1}^n \frac{1}{T_k} = \frac{1}{1} + \frac{1}{3} + \frac{1}{6} + \frac{1}{10} + \cdots + \frac{1}{T_n}\text{.} \end{equation*} [🔗](#ex-telescoping-sum-2-2) Hint. Using the fact that \(T_n = \frac{n(n+1)}{2}\text{,}\) each term in the sequence is \(\frac{2}{n(n+1)}\text{.}\)[🔗](#ex-telescoping-sum-3-1) What is the result of the following fraction subtraction: \(\frac{2}{3}- \frac{2}{4}\text{,}\) or \(\frac{2}{4}-\frac{2}{5}\text{?}\) What is happening in general?[🔗](#ex-telescoping-sum-3-2) [🔗](#ex-telescoping-sum-3) [🔗](#ex-telescoping-sum)

#### 7.

A geometric sequence has a constant rate of growth in the sense that the ratio of consecutive terms is always the same. But what can we say about the *difference* of consecutive terms in an geometric sequence?[🔗](#exercises_seq-growth-8-1-1)

#### (a)

Consider the geometric sequence \(1, 2, 4, 8, 16, \ldots\text{.}\) Find the differences between consecutive terms. That is, find its sequence of differences.[🔗](#exercises_seq-growth-8-2-1-1) [🔗](#exercises_seq-growth-8-2)

#### (b)

Find a closed formula for the sequence of differences. Then use this closed formula to find a different recurrence relation for the original sequence (other than \(a_n = 2a_{n-1}\)).[🔗](#exercises_seq-growth-8-3-1-1) [🔗](#exercises_seq-growth-8-3)

#### (c)

Repeat the two parts above for a different geometric sequence of your choice. Then explain what you found in general.[🔗](#exercises_seq-growth-8-4-1-1) [🔗](#exercises_seq-growth-8-4)[🔗](#exercises_seq-growth-8)

#### 8.

None of the following sequences are arithmetic or geometric: \begin{equation*} 1, 3, 6, 10, 15, \ldots \end{equation*} \begin{equation*} 3, 5, 8, 12, 17, \ldots \end{equation*} \begin{equation*} 0, 2, 5, 9, 14, \ldots \end{equation*} Explain what these sequences have in common with each other and then use that to find a closed formula for each of them. How do their closed formulas relate to each other? What can you say in general? [🔗](#exercises_seq-growth-9-1-1) [🔗](#exercises_seq-growth-9)[🔗](#exercises_seq-growth)[🔗](#sec_seq-growth) [&#xe5cb;Prev](sec_seq_intro.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_seq-polynomial.html) [Feedback](/cdn-cgi/l/email-protection#771804141605591b12011e19370219141859121302)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_seq-growth-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_seq-growth-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
