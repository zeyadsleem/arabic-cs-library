---
title: "Combinatorial Proofs"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_comb-proofs.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.6 Combinatorial Proofs

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_comb-proofs-4-1-1)

1. Write counting problems that have a given answer.[🔗](#sec_comb-proofs-4-2-1-1) [🔗](#sec_comb-proofs-4-2-1)
2. Write two different solutions to a counting problem.[🔗](#sec_comb-proofs-4-2-2-1) [🔗](#sec_comb-proofs-4-2-2)
3. Prove binomial identities using combinatorial proofs.[🔗](#sec_comb-proofs-4-2-3-1) [🔗](#sec_comb-proofs-4-2-3)

[🔗](#sec_comb-proofs-4)

### Subsection Section Preview

#### Investigate!

Look at any cell in the interior [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large) and the six numbers that surround it. For example, you might look at this cell:[🔗](#sec_comb-proofs-5-2-1-1) ![a cell in Pascal’s triangle surrounded by six other cells.](generated/latex-image/img-pascal-hexagaon.svg) Of the six numbers surrounding our selected cell, we will divide them into two groups of three, alternating between the groups. So for this example, we have a group with 4, 10, and 15, and a second group with 5, 6, and 20. But notice: \begin{equation*} 4\cdot 10 \cdot 15 = 600 = 5\cdot 6 \cdot 20\text{.} \end{equation*} Does this work no matter what center cell you pick? Why?? [🔗](#sec_comb-proofs-5-2-1-3) [🔗](#sec_comb-proofs-5-2)One of the coolest things about combinatorics is that you can often answer the same counting question in dramatically different ways. When we recognize this about a particular problem, we can often generalize the question to reveal two different expressions that must represent the same quantity. The counting problem itself becomes a proof of the equality of the two expressions. This style of proof is called a combinatorial proof.[🔗](#sec_comb-proofs-5-3)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=Activity-13-combinatorial-proofs)

It is often possible to find the answer to a counting question in two different ways. Doing so results in two formulas that give the answer, which might look different, but must be equal (since they are both the correct answer to the same question). This provides a proof of the equality of the two formulas, called a combinatorial proof.[🔗](#Activity-13-combinatorial-proofs-2-1-1) Let’s explore a couple of examples.[🔗](#Activity-13-combinatorial-proofs-2-1-2)

#### 1.

Activate Consider the set of 7-bit strings of weight 3. That is, strings of 0s and 1s that are seven characters long and have exactly three 1s. How many such strings are there?[🔗](#extracted-webwork-137-1-1-1)

#### (a)

Give the answer as a single binomial coefficient.[🔗](#extracted-webwork-137-1-2-1-1) [🔗](#extracted-webwork-137-1-2)

#### (b)

Now count just those 7-bit strings of weight 3 that start with a 1. How many are there?[🔗](#extracted-webwork-137-1-3-1-1) [🔗](#extracted-webwork-137-1-3)

#### (c)

Now count just those 7-bit strings of weight 3 that start with 01. How many are there?[🔗](#extracted-webwork-137-1-4-1-1) [🔗](#extracted-webwork-137-1-4)

#### (d)

Now count just those 7-bit strings of weight 3 that start with 001. How many are there?[🔗](#extracted-webwork-137-1-5-1-1) [🔗](#extracted-webwork-137-1-5)

#### (e)

Continue this process until you have counted all 7-bit strings of weight 3, as a *sum* of binomial coefficients. What is this sum?[🔗](#extracted-webwork-137-1-6-1-1) [🔗](#extracted-webwork-137-1-6) [🔗](#ws-comb-proof-bitstrings)

#### 2.

Activate Consider the counting question “How many ways can you permute the letters of the word *STATISTICS*?” Note that this is not just a permutation, since there are repeated letters.[🔗](#extracted-webwork-138-1-1-1)

#### (a)

How many ways can you select three of the ten positions in the anagram to be occupied by the letter *S*?[🔗](#extracted-webwork-138-1-2-1-1) [🔗](#extracted-webwork-138-1-2)

#### (b)

How many ways can you select three of the remaining seven positions in the anagram to be occupied by the letter *T*?[🔗](#extracted-webwork-138-1-3-1-1) [🔗](#extracted-webwork-138-1-3)

#### (c)

Continue with this approach until you have found an expression for the number of ways to permute the letters of *STATISTICS* as a product of binomial coefficients. Write out this product.[🔗](#extracted-webwork-138-1-4-1-1) [🔗](#extracted-webwork-138-1-4)

#### (d)

Now answer the counting question again, this time starting by asking how many ways you can select positions for the letter *A* first. Continue in any way you like until you have found a different expression for the number of ways to permute the letters of *STATISTICS* as a product of binomial coefficients. Write out this product.[🔗](#extracted-webwork-138-1-5-1-1) [🔗](#extracted-webwork-138-1-5)

#### (e)

Try yet another approach. What is wrong with saying the answer is \(10!\text{?}\) This is too large, but we can correct it by dividing to account for outcomes that are equivalent. What should you divide by?[🔗](#extracted-webwork-138-1-6-1-1) Write your answer as a quotient of factorials. Do you get the same answer as before?[🔗](#extracted-webwork-138-1-6-1-2) [🔗](#extracted-webwork-138-1-6) [🔗](#ws-comb-proofs-anagram)[🔗](#Activity-13-combinatorial-proofs)[🔗](#sec_comb-proofs-5)

### Subsection Patterns in Pascal’s Triangle

Have a look again at Pascal’s triangle. Forget for a moment where it comes from. Just look at it as a mathematical object. What do you notice?[🔗](#subsec_patternsPascal-3) ![The first 7 rows of Pascal’s triangle. A triangular array of hexagons, each row containing one more hexagon that the row above it. In each hexagon is an integer: 1’s on the border of the triangle, and every integer inside the triangle the sum of the two integers above it. The last row contains the numbers 1, 7, 21, 35, 35, 21, 7, and 1.](generated/latex-image/pascal-small.svg) There are lots of patterns hidden away in the triangle, enough to fill a reasonably sized book. Here are just a few of the most obvious ones:

1. The entries on the border of the triangle are all 1.[🔗](#subsec_patternsPascal-5-1-1-1) [🔗](#subsec_patternsPascal-5-1-1)
2. Any entry not on the border is the sum of the two entries above it.[🔗](#subsec_patternsPascal-5-1-2-1) [🔗](#subsec_patternsPascal-5-1-2)
3. The triangle is symmetric. In any row, entries on the left side are mirrored on the right side.[🔗](#subsec_patternsPascal-5-1-3-1) [🔗](#subsec_patternsPascal-5-1-3)
4. The sum of all entries on a given row is a power of 2. (You should check this!)[🔗](#subsec_patternsPascal-5-1-4-1) [🔗](#subsec_patternsPascal-5-1-4)

[🔗](#subsec_patternsPascal-5) We would like to state these observations in a more precise way, and then prove that they are correct. Now each entry in Pascal’s triangle is in fact a binomial coefficient. The 1 on the very top of the triangle is \(\binom{0}{0}\text{.}\) The next row (which we will call row 1, even though it is not the top-most row) consists of \(\binom{1}{0}\) and \(\binom{1}{1}\text{.}\) Row 4 (the row 1, 4, 6, 4, 1) consists of the binomial coefficients \begin{equation*} \binom{4}{0} ~~ \binom{4}{1} ~~ \binom{4}{2} ~~ \binom{4}{3} ~~ \binom{4}{4}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-6) Given this description of the elements in Pascal’s triangle, we can rewrite the above observations as follows:

1. \(\binom{n}{0} = 1\) and \(\binom{n}{n} = 1\text{.}\) [🔗](#subsec_patternsPascal-7-2-1)
2. \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\) [🔗](#subsec_patternsPascal-7-2-2)
3. \(\binom{n}{k} = \binom{n}{n-k}\text{.}\) [🔗](#subsec_patternsPascal-7-2-3)
4. \(\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n} = 2^n\text{.}\) [🔗](#subsec_patternsPascal-7-2-4)

[🔗](#subsec_patternsPascal-7) Each of these is an example of a binomial identity : an identity (i.e., equation) involving binomial coefficients.[🔗](#subsec_patternsPascal-8) Our goal is to establish these identities. We wish to prove that they hold for all values of \(n\) and \(k\text{.}\) These proofs can be done in many ways. One option would be to give algebraic proofs, using the formula for \(\binom{n}{k}\text{:}\) \begin{equation*} \binom{n}{k} = \frac{n!}{(n-k)!\,k!}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-9) Here’s how you might do that for the second identity above.[🔗](#subsec_patternsPascal-10)

#### Example 3.6.1.

Give an algebraic proof for the binomial identity \begin{equation*} \binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-11-1-1) Solution.

#### Proof.

By the definition of \(\binom{n}{k}\text{,}\) we have \begin{equation*} \binom{n-1}{k-1} = \frac{(n-1)!}{(n-1-(k-1))!(k-1)!} = \frac{(n-1)!}{(n-k)!(k-1)!} \end{equation*} and \begin{equation*} \binom{n-1}{k} = \frac{(n-1)!}{(n-1-k)!k!}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-11-2-1-1) Thus, starting with the right-hand side of the equation: \begin{align*} \binom{n-1}{k-1} + \binom{n-1}{k} \amp = \frac{(n-1)!}{(n-k)!(k-1)!}+ \frac{(n-1)!}{(n-1-k)!\,k!}\\ \amp = \frac{(n-1)!k}{(n-k)!\,k!} + \frac{(n-1)!(n-k)}{(n-k)!\,k!}\\ \amp = \frac{(n-1)!(k+n-k)}{(n-k)!\,k!}\\ \amp = \frac{n!}{(n-k)!\, k!}\\ \amp = \binom{n}{k}\text{.} \end{align*} [🔗](#subsec_patternsPascal-11-2-1-2) The second line (where the common denominator is found) works because \(k(k-1)! = k!\) and \((n-k)(n-k-1)! = (n-k)!\text{.}\)[🔗](#subsec_patternsPascal-11-2-1-3) [🔗](#subsec_patternsPascal-11-2-1)[🔗](#subsec_patternsPascal-11-2) [🔗](#subsec_patternsPascal-11)This is certainly a valid proof but also is entirely useless. Even if you understand the proof perfectly, it does not tell you *why* the identity is true. A better approach would be to explain what \(\binom{n}{k}\) *means* and then say why that is also what \(\binom{n-1}{k-1} + \binom{n-1}{k}\) means. Let’s see how this works for the four identities we observed above.[🔗](#subsec_patternsPascal-12)

#### Example 3.6.2.

Explain why \(\binom{n}{0} = 1\) and \(\binom{n}{n} = 1\text{.}\)[🔗](#subsec_patternsPascal-13-1-1) Solution. What do these binomial coefficients tell us? Well, \(\binom{n}{0}\) gives the number of ways to select 0 objects from a collection of \(n\) objects. There is only one way to do this, namely to not select any of the objects. Thus \(\binom{n}{0} = 1\text{.}\) Similarly, \(\binom{n}{n}\) gives the number of ways to select \(n\) objects from a collection of \(n\) objects. There is only one way to do this: Select all \(n\) objects. Thus \(\binom{n}{n} = 1\text{.}\)[🔗](#subsec_patternsPascal-13-2-1) Alternatively, we know that \(\binom{n}{0}\) is the number of \(n\)-bit strings with weight 0. There is only one such string, the string of all 0’s. So \(\binom{n}{0} = 1\text{.}\) Similarly \(\binom{n}{n}\) is the number of \(n\)-bit strings with weight \(n\text{.}\) There is only one string with this property, the string of all 1’s.[🔗](#subsec_patternsPascal-13-2-2) Another way: \(\binom{n}{0}\) gives the number of subsets of a set of size \(n\) containing 0 elements. There is only one such subset, the empty set. \(\binom{n}{n}\) gives the number of subsets containing \(n\) elements. The only such subset is the original set (of all elements).[🔗](#subsec_patternsPascal-13-2-3) [🔗](#subsec_patternsPascal-13-2) [🔗](#subsec_patternsPascal-13)

#### Example 3.6.3.

Explain why \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\)[🔗](#subsec_patternsPascal-14-1-1) Solution. The easiest way to see this is to consider bit strings. \(\binom{n}{k}\) is the number of bit strings of length \(n\) containing \(k\) 1’s. Of all of these strings, some start with a 1 and the rest start with a 0. First consider all the bit strings which start with a 1. After the 1, there must be \(n-1\) more bits (to get the total length up to \(n\)) and exactly \(k-1\) of them must be 1’s (as we already have one, and we need \(k\) total). How many strings are there like that? There are exactly \(\binom{n-1}{k-1}\) such bit strings, so of all the length \(n\) bit strings containing \(k\) 1’s, \(\binom{n-1}{k-1}\) of them start with a 1. Similarly, there are \(\binom{n-1}{k}\) which start with a 0 (we still need \(n-1\) bits and now \(k\) of them must be 1’s). Since there are \(\binom{n-1}{k}\) bit strings containing \(n-1\) bits with \(k\) 1’s, that is the number of length \(n\) bit strings with \(k\) 1’s which start with a 0. Therefore \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\)[🔗](#subsec_patternsPascal-14-2-1) Another way: Consider the question, how many ways can you select \(k\) pizza toppings from a menu containing \(n\) choices? One way to do this is just \(\binom{n}{k}\text{.}\) Another way to answer the same question is to first decide whether or not you want anchovies. If you do want anchovies, you still need to pick \(k-1\) toppings, now from just \(n-1\) choices. That can be done in \(\binom{n-1}{k-1}\) ways. If you do not want anchovies, then you still need to select \(k\) toppings from \(n-1\) choices (the anchovies are out). You can do that in \(\binom{n-1}{k}\) ways. Since the choices with anchovies are disjoint from the choices without anchovies, the total choices are \(\binom{n-1}{k-1}+\binom{n-1}{k}\text{.}\) But wait. We answered the same question in two different ways, so the two answers must be the same. Thus \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\)[🔗](#subsec_patternsPascal-14-2-2) You can also explain (prove) this identity by counting subsets, or even lattice paths.[🔗](#subsec_patternsPascal-14-2-3) [🔗](#subsec_patternsPascal-14-2) [🔗](#subsec_patternsPascal-14)

#### Example 3.6.4.

Prove the binomial identity \(\binom{n}{k} = \binom{n}{n-k}\text{.}\)[🔗](#example-symmetry-formula-1-1) Solution. Why is this true? \(\binom{n}{k}\) counts the number of ways to select \(k\) things from \(n\) choices. On the other hand, \(\binom{n}{n-k}\) counts the number of ways to select \(n-k\) things from \(n\) choices. Are these really the same? Well, what if instead of selecting the \(n-k\) things you choose to exclude them. How many ways are there to choose \(n-k\) things to exclude from \(n\) choices? Clearly this is \(\binom{n}{n-k}\) as well (it doesn’t matter whether you include or exclude the things once you have chosen them). And if you exclude \(n-k\) things, then you are including the other \(k\) things. So the set of outcomes should be the same.[🔗](#example-symmetry-formula-2-1) Let’s try the pizza counting example like we did above. How many ways are there to pick \(k\) toppings from a list of \(n\) choices? On the one hand, the answer is simply \(\binom{n}{k}\text{.}\) Alternatively, you could make a list of all the toppings you don’t want. To end up with a pizza containing exactly \(k\) toppings, you need to pick \(n-k\) toppings to not put on the pizza. You have \(\binom{n}{n-k}\) choices for the toppings you don’t want. Both of these ways give you a pizza with \(k\) toppings, in fact all the ways to get a pizza with \(k\) toppings. Thus these two answers must be the same: \(\binom{n}{k} = \binom{n}{n-k}\text{.}\)[🔗](#example-symmetry-formula-2-2) You can also prove (explain) this identity using bit strings, subsets, or lattice paths. The bit string argument is nice: \(\binom{n}{k}\) counts the number of bit strings of length \(n\) with \(k\) 1’s. This is also the number of bit strings of length \(n\) with \(k\) 0’s (just replace each 1 with a 0 and each 0 with a 1). But if a string of length \(n\) has \(k\) 0’s, it must have \(n-k\) 1’s. And there are exactly \(\binom{n}{n-k}\) strings of length \(n\) with \(n-k\) 1’s.[🔗](#example-symmetry-formula-2-3) [🔗](#example-symmetry-formula-2) [🔗](#example-symmetry-formula)

#### Example 3.6.5.

Prove the binomial identity \(\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n} = 2^n\text{.}\)[🔗](#ex-comb-proof-rowsum-1-1) Solution. Let’s do a “pizza proof” again. We need to find a question about pizza toppings which has \(2^n\) as the answer. How about this: If a pizza joint offers \(n\) toppings, how many pizzas can you build using any number of toppings from no toppings to all toppings, using each topping at most once?[🔗](#ex-comb-proof-rowsum-2-1) On one hand, the answer is \(2^n\text{.}\) For each topping, you can say “yes” or “no,” so you have two choices for each topping.[🔗](#ex-comb-proof-rowsum-2-2) On the other hand, divide the possible pizzas into disjoint groups: the pizzas with no toppings, the pizzas with one topping, the pizzas with two toppings, etc. If we want no toppings, there is only one pizza like that (the empty pizza, if you will), but it would be better to think of that number as \(\binom{n}{0}\) since we choose 0 of the \(n\) toppings. How many pizzas have 1 topping? We need to choose 1 of the \(n\) toppings, so \(\binom{n}{1}\text{.}\) We have:[🔗](#ex-comb-proof-rowsum-2-3)

- Pizzas with 0 toppings: \(\binom{n}{0}\) [🔗](#ex-comb-proof-rowsum-2-4-1-1)
- Pizzas with 1 topping: \(\binom{n}{1}\) [🔗](#ex-comb-proof-rowsum-2-4-1-2)
- Pizzas with 2 toppings: \(\binom{n}{2}\) [🔗](#ex-comb-proof-rowsum-2-4-1-3)
- \(\displaystyle \vdots\) [🔗](#ex-comb-proof-rowsum-2-4-1-4)
- Pizzas with \(n\) toppings: \(\binom{n}{n}\text{.}\) [🔗](#ex-comb-proof-rowsum-2-4-1-5)

[🔗](#ex-comb-proof-rowsum-2-4) The total number of possible pizzas will be the sum of these, which is exactly the left-hand side of the identity we are trying to prove.[🔗](#ex-comb-proof-rowsum-2-5) Again, we could have proved the identity using subsets, bit strings, or lattice paths (although the lattice path argument is a little tricky).[🔗](#ex-comb-proof-rowsum-2-6) [🔗](#ex-comb-proof-rowsum-2) [🔗](#ex-comb-proof-rowsum)Hopefully this gives some idea of how explanatory proofs of binomial identities can go. It is worth pointing out that more traditional proofs can also be beautiful. 4 Most every binomial identity can be proved using mathematical induction, using the recursive definition for \(\binom{n}{k}\text{.}\) We will discuss induction in [Section 4.5](sec_seq-induction.html). For example, consider the following rather slick proof of the last identity.[🔗](#subsec_patternsPascal-17) Expand the binomial \((x+y)^n\text{:}\) \begin{equation*} (x + y)^n = \binom{n}{0}x^n + \binom{n}{1}x^{n-1}y + \binom{n}{2}x^{n-2}y^2 + \cdots + \binom{n}{n-1}x\cdot y^{n-1} + \binom{n}{n}y^n\text{.} \end{equation*} [🔗](#subsec_patternsPascal-18) Let \(x = 1\) and \(y = 1\text{.}\) We get: \begin{equation*} (1 + 1)^n = \binom{n}{0}1^n + \binom{n}{1}1^{n-1}1 + \binom{n}{2}1^{n-2}1^2 + \cdots + \binom{n}{n-1}1\cdot 1^{n-1} + \binom{n}{n}1^n\text{.} \end{equation*} [🔗](#subsec_patternsPascal-19) Of course this simplifies to: \begin{equation*} (2)^n = \binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n-1} + \binom{n}{n}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-20) Something fun to try: Let \(x = 1\) and \(y = 2\text{.}\) Neat huh?[🔗](#subsec_patternsPascal-21) [🔗](#subsec_patternsPascal)

### Subsection More Proofs

The explanatory proofs given in the above examples are typically called combinatorial proofs. In general, to give a combinatorial proof for a binomial identity, say \(A = B\text{,}\) you do the following:[🔗](#subsec_moreProofs-2)

1. Find a counting problem you will be able to answer in two ways.[🔗](#subsec_moreProofs-3-1-1-1) [🔗](#subsec_moreProofs-3-1-1)
2. Explain why one answer to the counting problem is \(A\text{.}\)[🔗](#subsec_moreProofs-3-1-2-1) [🔗](#subsec_moreProofs-3-1-2)
3. Explain why the other answer to the counting problem is \(B\text{.}\)[🔗](#subsec_moreProofs-3-1-3-1) [🔗](#subsec_moreProofs-3-1-3)

[🔗](#subsec_moreProofs-3) Since both \(A\) and \(B\) are the answers to the same question, we must have \(A = B\text{.}\)[🔗](#subsec_moreProofs-4) The tricky thing is coming up with the question. This is not always obvious, but it gets easier the more counting problems you solve. You will start to recognize types of answers as the answers to types of questions. More often what will happen is that you will be solving a counting problem and happen to think up two different ways of finding the answer. Now you have a binomial identity, and the proof is right there. The proof *is* the problem you just solved together with your two solutions.[🔗](#subsec_moreProofs-5) For example, consider this counting question:[🔗](#subsec_moreProofs-6)

> How many 10-letter words use exactly four A’s, three B’s, two C’s, and one D?[🔗](#subsec_moreProofs-7-1)
> > [🔗](#subsec_moreProofs-7)

Let’s try to solve this problem. We have 10 spots for letters to go. Four of those need to be A’s. We can pick the four A-spots in \(\binom{10}{4}\) ways. Now where can we put the B’s? Well there are only 6 spots left; we need to pick \(3\) of them. This can be done in \(\binom{6}{3}\) ways. The two C’s need to go in two of the 3 remaining spots, so we have \(\binom{3}{2}\) ways of doing that. That leaves just one spot of the D, but we could write that 1 choice as \(\binom{1}{1}\text{.}\) Thus the answer is: \begin{equation*} \binom{10}{4}\binom{6}{3}\binom{3}{2}\binom{1}{1}\text{.} \end{equation*} [🔗](#subsec_moreProofs-8) But why stop there? We can find the answer another way too. First let’s decide where to put the one D: we have 10 spots and we need to choose 1 of them, so this can be done in \(\binom{10}{1}\) ways. Next, choose one of the \(\binom{9}{2}\) ways to place the two C’s. We now have \(7\) spots left, and three of them need to be filled with B’s. There are \(\binom{7}{3}\) ways to do this. Finally the A’s can be placed in \(\binom{4}{4}\) (that is, only one) ways. So another answer to the question is \begin{equation*} \binom{10}{1}\binom{9}{2}\binom{7}{3}\binom{4}{4}\text{.} \end{equation*} [🔗](#subsec_moreProofs-9) Interesting. This gives us the binomial identity: \begin{equation*} \binom{10}{4}\binom{6}{3}\binom{3}{2}\binom{1}{1} = \binom{10}{1}\binom{9}{2}\binom{7}{3}\binom{4}{4}\text{.} \end{equation*} [🔗](#subsec_moreProofs-10) Here are a couple more binomial identities with combinatorial proofs.[🔗](#subsec_moreProofs-11)

#### Example 3.6.6.

Prove the identity \begin{equation*} 1 n + 2(n-1) + 3 (n-2) + \cdots + (n-1) 2 + n 1 = \binom{n+2}{3}\text{.} \end{equation*} [🔗](#ex-comb-proof-3elemsets-1-1) Solution. To give a combinatorial proof we need to think up a question we can answer in two ways: one way needs to give the left-hand side of the identity, and the other way needs to be the right-hand side of the identity. Our clue to what question to ask comes from the right-hand side: \(\binom{n+2}{3}\) counts the number of ways to select 3 things from a group of \(n+2\) things. Let’s name those things \(1, 2, 3, \ldots, n+2\text{.}\) In other words, we want to find 3-element subsets of those numbers (since order should not matter, subsets are exactly the right thing to think about). We will have to be a bit clever to explain why the left-hand side also gives the number of these subsets. Here’s the proof.[🔗](#ex-comb-proof-3elemsets-2-1)

#### Proof.

Consider the question “How many 3-element subsets are there of the set \(\{1,2,3,\ldots, n+2\}\text{?}\)” We answer this in two ways:[🔗](#ex-comb-proof-3elemsets-2-2-1) Answer 1: We must select 3 elements from the collection of \(n+2\) elements. This can be done in \(\binom{n+2}{3}\) ways.[🔗](#ex-comb-proof-3elemsets-2-2-2) Answer 2: Break this problem up into cases by what the middle number in the subset is. Say each subset is \(\{a,b,c\}\) written in increasing order. We count the number of subsets for each distinct value of \(b\text{.}\) The smallest possible value of \(b\) is \(2\text{,}\) and the largest is \(n+1\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-3) When \(b = 2\text{,}\) there are \(1 \cdot n\) subsets: 1 choice for \(a\) and \(n\) choices (3 through \(n+2\)) for \(c\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-4) When \(b = 3\text{,}\) there are \(2 \cdot (n-1)\) subsets: 2 choices for \(a\) and \(n-1\) choices for \(c\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-5) When \(b = 4\text{,}\) there are \(3 \cdot (n-2)\) subsets: 3 choices for \(a\) and \(n-2\) choices for \(c\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-6) And so on. When \(b = n+1\text{,}\) there are \(n\) choices for \(a\) and only 1 choice for \(c\text{,}\) so \(n \cdot 1\) subsets.[🔗](#ex-comb-proof-3elemsets-2-2-7) Therefore the total number of subsets is \begin{equation*} 1 n + 2 (n-1) + 3 (n-2) + \cdots + (n-1)2 + n 1\text{.} \end{equation*} [🔗](#ex-comb-proof-3elemsets-2-2-8) Since Answer 1 and Answer 2 are answers to the same question, they must be equal. Therefore \begin{equation*} 1 n + 2 (n-1) + 3 (n-2) + \cdots + (n-1) 2 + n 1 = \binom{n+2}{3}\text{.} \end{equation*} [🔗](#ex-comb-proof-3elemsets-2-2-9) [🔗](#ex-comb-proof-3elemsets-2-2)[🔗](#ex-comb-proof-3elemsets-2) [🔗](#ex-comb-proof-3elemsets)

#### Example 3.6.7.

Prove the binomial identity \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2 = \binom{2n}{n}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-1-1) Solution. We will give two different proofs of this fact. The first will be very similar to the previous example (counting subsets). The second proof is a little slicker, using lattice paths.[🔗](#subsec_moreProofs-13-2-1)

#### Proof.

Consider the question: “How many pizzas can you make using \(n\) toppings when there are \(2n\) toppings to choose from?”[🔗](#subsec_moreProofs-13-2-2-1) Answer 1: There are \(2n\) toppings, from which you must choose \(n\text{.}\) This can be done in \(\binom{2n}{n}\) ways.[🔗](#subsec_moreProofs-13-2-2-2) Answer 2: Divide the toppings into two groups of \(n\) toppings (perhaps \(n\) meats and \(n\) veggies). Any choice of \(n\) toppings must include some number from the first group and some number from the second group. Consider each possible number of meat toppings separately:[🔗](#subsec_moreProofs-13-2-2-3) 0 meats: \(\binom{n}{0}\binom{n}{n}\text{,}\) since you need to choose 0 of the \(n\) meats and \(n\) of the \(n\) veggies.[🔗](#subsec_moreProofs-13-2-2-4) 1 meat: \(\binom{n}{1}\binom{n}{n-1}\text{,}\) since you need 1 of \(n\) meats so \(n-1\) of \(n\) veggies.[🔗](#subsec_moreProofs-13-2-2-5) 2 meats: \(\binom{n}{2}\binom{n}{n-2}\text{.}\) Choose 2 meats and the remaining \(n-2\) toppings from the \(n\) veggies.[🔗](#subsec_moreProofs-13-2-2-6) And so on. The last case is \(n\) meats, which can be done in \(\binom{n}{n}\binom{n}{0}\) ways.[🔗](#subsec_moreProofs-13-2-2-7) Thus the total number of pizzas possible is \begin{equation*} \binom{n}{0}\binom{n}{n} + \binom{n}{1}\binom{n}{n-1} + \binom{n}{2}\binom{n}{n-2} + \cdots + \binom{n}{n}\binom{n}{0}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-2-8) This is not quite the left-hand side … yet. Notice that \(\binom{n}{n} = \binom{n}{0}\) and \(\binom{n}{n-1} = \binom{n}{1}\) and so on, by the identity in [Example 3.6.4](sec_comb-proofs.html#example-symmetry-formula). Thus we do indeed get \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-2-9) Since these two answers are answers to the same question, they must be equal, and thus \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2 = \binom{2n}{n}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-2-10) [🔗](#subsec_moreProofs-13-2-2)For an alternative proof, we use lattice paths. This is reasonable to consider because the right-hand side of the identity reminds us of the number of paths from \((0,0)\) to \((n,n)\text{.}\)[🔗](#subsec_moreProofs-13-2-3)

#### Proof.

Consider the question: How many lattice paths are there from \((0,0)\) to \((n,n)\text{?}\)[🔗](#subsec_moreProofs-13-2-4-1) Answer 1: We must travel \(2n\) steps, and \(n\) of them must be in the up direction. Thus there are \(\binom{2n}{n}\) paths.[🔗](#subsec_moreProofs-13-2-4-2) Answer 2: Note that any path from \((0,0)\) to \((n,n)\) must cross the line \(x + y = n\text{.}\) That is, any path must pass through exactly one of the points: \((0,n)\text{,}\) \((1,n-1)\text{,}\) \((2,n-2)\text{,}\) …, \((n, 0)\text{.}\) For example, this is what happens in the case \(n = 4\text{:}\)[🔗](#subsec_moreProofs-13-2-4-3) ![A light gray grid with points (0,0) and (4,4) identified in the lower left and upper right corners respectively. The line x + y = 4 is shown extending from the top left to bottom right corner. The line intersects the labeled points (0,4), (1,3), (2,2), (3,1), and (4,0).](generated/latex-image/lattice-paths-comb-proof.svg) How many paths pass through \((0,n)\text{?}\) To get to that point, you must travel \(n\) units, and \(0\) of them are to the right, so there are \(\binom{n}{0}\) ways to get to \((0,n)\text{.}\) From \((0,n)\) to \((n,n)\) takes \(n\) steps, and \(0\) of them are up. So there are \(\binom{n}{0}\) ways to get from \((0,n)\) to \((n,n)\text{.}\) Therefore there are \(\binom{n}{0}\binom{n}{0}\) paths from \((0,0)\) to \((n,n)\) through the point \((0,n)\) .[🔗](#subsec_moreProofs-13-2-4-5) What about through \((1,n-1)\text{?}\) There are \(\binom{n}{1}\) paths to get there (\(n\) steps, 1 to the right) and \(\binom{n}{1}\) paths to complete the journey to \((n,n)\) (\(n\) steps, \(1\) up). So there are \(\binom{n}{1}\binom{n}{1}\) paths from \((0,0)\) to \((n,n)\) through \((1,n-1)\text{.}\)[🔗](#subsec_moreProofs-13-2-4-6) In general, to get to \((n,n)\) through the point \((k,n-k)\) we have \(\binom{n}{k}\) paths to the midpoint and then \(\binom{n}{k}\) paths from the midpoint to \((n,n)\text{.}\) So there are \(\binom{n}{k}\binom{n}{k}\) paths from \((0,0)\) to \((n,n)\) through \((k, n-k)\text{.}\)[🔗](#subsec_moreProofs-13-2-4-7) All together then, the total paths from \((0,0)\) to \((n,n)\) passing through exactly one of these midpoints is \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-4-8) Since these two answers are answers to the same question, they must be equal, and thus \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2 = \binom{2n}{n}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-4-9) [🔗](#subsec_moreProofs-13-2-4)[🔗](#subsec_moreProofs-13-2) [🔗](#subsec_moreProofs-13)[🔗](#subsec_moreProofs)

### Reading Questions Reading Questions

#### 1.

Which of the following describes the overall strategy for a combinatorial proof?[🔗](#rq-counting-proofs-format-1-1)

- Ask a counting question that can be answered in two ways (and answer it).
- Correct. Each way of answering the question should be one side of the identity.
- Ask two counting questions that can both be answered in the same way (and answer the questions).
- Not quite. You use combinatorial proofs to establish an identity that has two different “sides.”
- Simplify the algebraic expressions for each side of the combinatorial identity.
- While some identities can be established with an algebraic proof, this is not what a combinatorial proof uses.
- Assume the identity fails to hold for some smallest value, and get a contradiction by looking at a smaller value.
- This would be a minimal-criminal style argument, which might also be a valid proof, but not what we mean by a combinatorial proof.

[🔗](#rq-counting-proofs-format)

#### 2.

Write a counting question that you could use to establish the identity: \begin{equation*} \binom{x+y}{x} = \binom{x+y}{y}\text{.} \end{equation*} [🔗](#rq-counting-proofs-question-1-1) [🔗](#rq-counting-proofs-question)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-counting-proofs-q-1-1) [🔗](#rq-counting-proofs-q)[🔗](#rqs-counting-proofs)

### Exercises Practice Problems

#### 1.

Create a combinatorial proof of the identity \(10+10 = 2\cdot 10\text{.}\)[🔗](#parsons-comb-proof-basic-1-1)

```natural
Consider the question, “How many two-digit numbers start with a 3 or 4?”
---
Consider the question, “How many 2-topping pizzas can you make choosing from 10 toppings?” #paired
---
The first way to answer this is \(10+10\text{.}\)

---
This is because there are 10 numbers that start with 3, and another 10 that start with 4.
---
This is because there are 10 choices for the first topping, and 10 choices for the second topping. #paired
---
A second answer to the question is \(2\cdot 10\text{.}\)

---
This is because you have 2 choices for the first digit, and 10 choices for the second digit.
---
This is because you must either choose 2 identical toppings or two different toppings. #paired
---
Since both expressions answer the same question, they must be equal.  Therefore \(10+10 = 2\cdot 10\text{.}\)
```

[🔗](#parsons-comb-proof-basic)

#### 2.

If you were asked to give a combinatorial proof of the identity \(\binom{n}{2}\binom{n-2}{k} = \binom{n}{k}\binom{n-k}{2}\text{,}\) which of the following would be reasonable questions to use?[🔗](#rs-comb-proof-question-1-1)

- How many ways can you select \(2\) flavors of ice cream from \(n\) choices and \(k\) toppings for your sundae?
- This is not going to be helpful, since when we switch from one side of the equation to the other, we will not be counting the same thing. We need a question where the \(k\) things and the \(2\) things come from the same set of \(n\) things.
- How many ways can you select \(k\) bow ties to pack in your checked bag and 2 more bow ties to pack in your carry-on, from a collection of \(n\) bow ties?
- There are \(n\) students in Math Club. How many ways can you pick a subset of size \(2\) or \(k\) that will run your fall fundraiser?
- If we wanted either \(2\) or \(k\) people, we would need to add the number of outcomes from each.
- From a class of \(n\) students, how many ways can you select 2 to be prefects and another \(k\) to be on the party planning committee?

[🔗](#rs-comb-proof-question)[🔗](#practice-comb-proofs)

### Exercises Additional Exercises

#### 1.

Give a combinatorial proof of the identity \(2+2+2 = 3\cdot 2\text{.}\)[🔗](#exercises_comb-proofs-2-1-1) [🔗](#exercises_comb-proofs-2)

#### 2.

Suppose you own \(x\) fezzes and \(y\) bow ties. Of course, \(x\) and \(y\) are both greater than 1.

1. How many combinations of fez and bow tie can you make? You can wear only one fez and one bow tie at a time. Explain.[🔗](#exercises_comb-proofs-3-2-1-5-1-1) [🔗](#exercises_comb-proofs-3-2-1-5-1)
2. Explain why the answer is *also* \({x+y \choose 2} - {x \choose 2} - {y \choose 2}\text{.}\) (If this is what you claimed the answer was in part (a), try it again.)[🔗](#exercises_comb-proofs-3-2-1-5-2-1) [🔗](#exercises_comb-proofs-3-2-1-5-2)
3. Use your answers to parts (a) and (b) to give a combinatorial proof of the identity \begin{equation*} {x+y \choose 2} - {x \choose 2} - {y \choose 2} = xy\text{.} \end{equation*} [🔗](#exercises_comb-proofs-3-2-1-5-3-1) [🔗](#exercises_comb-proofs-3-2-1-5-3)

[🔗](#exercises_comb-proofs-3-2-1) [🔗](#exercises_comb-proofs-3)

#### 3.

How many triangles can you draw using the dots below as vertices?[🔗](#exercises_comb-proofs-4-1-1) ![Twelve dots arranged in a half circle. Seven dots lie on the horizontal diameter of the circle, the remaining five lie on the circumference of the circle.](generated/latex-image/img-semicircle-triangles.svg)

1. Find an expression for the answer which is the sum of three terms involving binomial coefficients.[🔗](#exercises_comb-proofs-4-1-3-1-1-1) [🔗](#exercises_comb-proofs-4-1-3-1-1)
2. Find an expression for the answer which is the difference of two binomial coefficients.[🔗](#exercises_comb-proofs-4-1-3-1-2-1) [🔗](#exercises_comb-proofs-4-1-3-1-2)
3. Generalize the above to state and prove a binomial identity using a combinatorial proof. Say you have \(x\) points on the horizontal axis and \(y\) points in the semi-circle.[🔗](#exercises_comb-proofs-4-1-3-1-3-1) [🔗](#exercises_comb-proofs-4-1-3-1-3)

[🔗](#exercises_comb-proofs-4-1-3) Hint. There will be 185 triangles. But to find them …

1. How many vertices of the triangle can be on the horizontal axis?[🔗](#exercises_comb-proofs-4-2-1-2-1-1) [🔗](#exercises_comb-proofs-4-2-1-2-1)
2. Will *any* three dots work as the vertices?[🔗](#exercises_comb-proofs-4-2-1-2-2-1) [🔗](#exercises_comb-proofs-4-2-1-2-2)

[🔗](#exercises_comb-proofs-4-2-1) [🔗](#exercises_comb-proofs-4-2) [🔗](#exercises_comb-proofs-4)

#### 4.

Consider all the triangles you can create using the points shown below as vertices. Note that we are not allowing degenerate triangles (ones with all three vertices on the same line), but we do allow non-right triangles.[🔗](#exercises_comb-proofs-5-1-1) ![Five equally spaced dots in a vertical line and six additional equally spaced dots extending to the right in a horizontal line from the lowest dot (forming a right angle).](generated/latex-image/triangle-dots-repeat.svg)

1. Find the number of triangles, and explain why your answer is correct.[🔗](#exercises_comb-proofs-5-1-3-1-1-1) [🔗](#exercises_comb-proofs-5-1-3-1-1)
2. Find the number of triangles again, using a different method. Explain why your new method works.[🔗](#exercises_comb-proofs-5-1-3-1-2-1) [🔗](#exercises_comb-proofs-5-1-3-1-2)
3. State a binomial identity that your two answers above establish (that is, give the binomial identity that your two answers are a proof for). Then generalize this using \(m\)’s and \(n\)’s.[🔗](#exercises_comb-proofs-5-1-3-1-3-1) [🔗](#exercises_comb-proofs-5-1-3-1-3)

[🔗](#exercises_comb-proofs-5-1-3) Hint. The answer is 120.[🔗](#exercises_comb-proofs-5-2-1) [🔗](#exercises_comb-proofs-5-2) [🔗](#exercises_comb-proofs-5)

#### 5.

A woman is getting married. She has 15 best friends but can only select 6 of them to be her bridesmaids, one of which needs to be her maid of honor. How many ways can she do this?[🔗](#exc-bridesmaids-1-1)

1. What if she first selects the 6 bridesmaids, and then selects one of them to be the maid of honor?[🔗](#exc-bridesmaids-1-2-1-1) [🔗](#exc-bridesmaids-1-2-1)
2. What if she first selects her maid of honor, and then 5 other bridesmaids?[🔗](#exc-bridesmaids-1-2-2-1) [🔗](#exc-bridesmaids-1-2-2)
3. Explain why \(6 {15 \choose 6} = 15 {14 \choose 5}\text{.}\)[🔗](#exc-bridesmaids-1-2-3-1) [🔗](#exc-bridesmaids-1-2-3)

[🔗](#exc-bridesmaids)

#### 6.

Consider the identity: \begin{equation*} k{n\choose k} = n{n-1 \choose k-1}\text{.} \end{equation*}

1. Is this true? Try it for a few values of \(n\) and \(k\text{.}\)[🔗](#exercises_comb-proofs-7-1-1-2-1-1) [🔗](#exercises_comb-proofs-7-1-1-2-1)
2. Use the formula for \({n \choose k}\) to give an algebraic proof of the identity.[🔗](#exercises_comb-proofs-7-1-1-2-2-1) [🔗](#exercises_comb-proofs-7-1-1-2-2)
3. Give a combinatorial proof of the identity.[🔗](#exercises_comb-proofs-7-1-1-2-3-1) [🔗](#exercises_comb-proofs-7-1-1-2-3)

[🔗](#exercises_comb-proofs-7-1-1) Hint. Try [Exercise 5](sec_comb-proofs.html#exc-bridesmaids).[🔗](#exercises_comb-proofs-7-2-1) [🔗](#exercises_comb-proofs-7-2) [🔗](#exercises_comb-proofs-7)

#### 7.

Give a combinatorial proof of the identity \({n \choose 2}{n-2 \choose k-2} = {n\choose k}{k \choose 2}\text{.}\)[🔗](#exercises_comb-proofs-8-1-1) Hint. What if you wanted a pair of co-maids-of-honor?[🔗](#exercises_comb-proofs-8-2-1) [🔗](#exercises_comb-proofs-8-2) [🔗](#exercises_comb-proofs-8)

#### 8.

Consider the binomial identity \begin{equation*} \binom{n}{1} + 2 \binom{n}{2} + 3 \binom{n}{3} + \cdots + n\binom{n}{n} = n2^{n-1}\text{.} \end{equation*}

1. Give a combinatorial proof of this identity. Hint: What if some number of a group of \(n\) people wanted to go to an escape room, and among those going, one needed to be the team captain?[🔗](#exercises_comb-proofs-9-1-1-2-1-1) [🔗](#exercises_comb-proofs-9-1-1-2-1)
2. Give an alternate proof by multiplying out \((1+x)^n\) and taking derivatives of both sides.[🔗](#exercises_comb-proofs-9-1-1-2-2-1) [🔗](#exercises_comb-proofs-9-1-1-2-2)

[🔗](#exercises_comb-proofs-9-1-1) Hint. For the combinatorial proof: What if you don’t yet know how many bridesmaids you will have?[🔗](#exercises_comb-proofs-9-2-1) [🔗](#exercises_comb-proofs-9-2) [🔗](#exercises_comb-proofs-9)

#### 9.

Give a combinatorial proof for the identity \(1 + 2 + 3 + \cdots + n = {n+1 \choose 2}\text{.}\)[🔗](#exercises_comb-proofs-10-1-1) Hint. Count handshakes.[🔗](#exercises_comb-proofs-10-2-1) [🔗](#exercises_comb-proofs-10-2) [🔗](#exercises_comb-proofs-10)

#### 10.

Consider the bit strings in \(\B^6_2\) (bit strings of length 6 and weight 2).[🔗](#exercises_comb-proofs-11-1-2)

1. How many of those bit strings start with 1?[🔗](#exercises_comb-proofs-11-1-3-1-1) [🔗](#exercises_comb-proofs-11-1-3-1)
2. How many of those bit strings start with 01?[🔗](#exercises_comb-proofs-11-1-3-2-1) [🔗](#exercises_comb-proofs-11-1-3-2)
3. How many of those bit strings start with 001?[🔗](#exercises_comb-proofs-11-1-3-3-1) [🔗](#exercises_comb-proofs-11-1-3-3)
4. Are there any other strings we have not counted yet? Which ones, and how many are there?[🔗](#exercises_comb-proofs-11-1-3-4-1) [🔗](#exercises_comb-proofs-11-1-3-4)
5. How many bit strings are there total in \(\B^6_2\text{?}\)[🔗](#exercises_comb-proofs-11-1-3-5-1) [🔗](#exercises_comb-proofs-11-1-3-5)
6. What binomial identity have you just given a combinatorial proof for?[🔗](#exercises_comb-proofs-11-1-3-6-1) [🔗](#exercises_comb-proofs-11-1-3-6)

[🔗](#exercises_comb-proofs-11)

#### 11.

Let’s count ternary digit strings, that is, strings in which each digit can be 0, 1, or 2.

1. How many ternary digit strings contain exactly \(n\) digits?[🔗](#exercises_comb-proofs-12-3-1-2-1-1) [🔗](#exercises_comb-proofs-12-3-1-2-1)
2. How many ternary digit strings contain exactly \(n\) digits and \(n\) 2’s.[🔗](#exercises_comb-proofs-12-3-1-2-2-1) [🔗](#exercises_comb-proofs-12-3-1-2-2)
3. How many ternary digit strings contain exactly \(n\) digits and \(n-1\) 2’s. (Hint: Where can you put the non-2 digit, and then what could it be?)[🔗](#exercises_comb-proofs-12-3-1-2-3-1) [🔗](#exercises_comb-proofs-12-3-1-2-3)
4. How many ternary digit strings contain exactly \(n\) digits and \(n-2\) 2’s. (Hint: See previous hint.)[🔗](#exercises_comb-proofs-12-3-1-2-4-1) [🔗](#exercises_comb-proofs-12-3-1-2-4)
5. How many ternary digit strings contain exactly \(n\) digits and \(n-k\) 2’s.[🔗](#exercises_comb-proofs-12-3-1-2-5-1) [🔗](#exercises_comb-proofs-12-3-1-2-5)
6. How many ternary digit strings contain exactly \(n\) digits and no 2’s. (Hint: What kind of a string is this?)[🔗](#exercises_comb-proofs-12-3-1-2-6-1) [🔗](#exercises_comb-proofs-12-3-1-2-6)
7. Use the above parts to give a combinatorial proof for the identity \begin{equation*} {n \choose 0} + 2{n \choose 1} + 2^2{n \choose 2} + 2^3{n \choose 3} + \cdots + 2^n{n \choose n} = 3^n\text{.} \end{equation*} [🔗](#exercises_comb-proofs-12-3-1-2-7-1) [🔗](#exercises_comb-proofs-12-3-1-2-7)

[🔗](#exercises_comb-proofs-12-3-1) [🔗](#exercises_comb-proofs-12)

#### 12.

How many ways are there to rearrange the letters in the word “rearrange”? Answer this question in at least two different ways to establish a binomial identity.[🔗](#exercises_comb-proofs-13-1-1) [🔗](#exercises_comb-proofs-13)

#### 13.

Establish the identity below using a combinatorial proof. \begin{equation*} {2 \choose 2}{n \choose 2} + {3 \choose 2}{n-1 \choose 2} + {4\choose 2}{n-2 \choose 2} + \cdots + {n\choose 2}{2\choose 2} = {n+3 \choose 5}\text{.} \end{equation*} [🔗](#exercises_comb-proofs-14-1-1) Hint. This one might remind you of [Example 3.6.6](sec_comb-proofs.html#ex-comb-proof-3elemsets)[🔗](#exercises_comb-proofs-14-2-1) [🔗](#exercises_comb-proofs-14-2) [🔗](#exercises_comb-proofs-14)

#### 14.

In [Example 3.6.5](sec_comb-proofs.html#ex-comb-proof-rowsum) we established that the sum of any row in Pascal’s triangle is a power of two. Specifically, \begin{equation*} {n\choose 0} + {n \choose 1} + {n\choose 2} + \cdots + {n \choose n} = 2^n\text{.} \end{equation*} The argument given there used the counting question, “How many pizzas can you build using any number of \(n\) different toppings?” To practice, give new proofs of this identity using different questions.

1. Use a question about counting subsets.[🔗](#exercises_comb-proofs-15-1-1-4-1-1) [🔗](#exercises_comb-proofs-15-1-1-4-1)
2. Use a question about counting bit strings.[🔗](#exercises_comb-proofs-15-1-1-4-2-1) [🔗](#exercises_comb-proofs-15-1-1-4-2)
3. Use a question about counting lattice paths.[🔗](#exercises_comb-proofs-15-1-1-4-3-1) [🔗](#exercises_comb-proofs-15-1-1-4-3)

[🔗](#exercises_comb-proofs-15-1-1) Hint. For the lattice paths, think about what sort of paths \(2^n\) would count. Not all the paths will end at the same point, but you could describe the set of end points as a line.[🔗](#exercises_comb-proofs-15-2-1) [🔗](#exercises_comb-proofs-15-2) [🔗](#exercises_comb-proofs-15)

#### 15.

1. The Stanley Cup is decided in a best of 7 tournament between two teams. In how many ways can your team win? Let’s answer this question two ways: How many of the 7 games does your team need to win? How many ways can this happen?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-1-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-1)
2. What if the tournament goes all 7 games? So you win the last game. How many ways can the first 6 games go down?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-2-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-2)
3. What if the tournament goes just 6 games? How many ways can this happen? What about 5 games? 4 games?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-3-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-3)
4. What are the two different ways to compute the number of ways your team can win? Write down an equation involving binomial coefficients (that is, \({n \choose k}\)’s). What pattern in Pascal’s triangle is this an example of?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-4-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-4)

[🔗](#exercises_comb-proofs-16-1-1-1-1-1) [🔗](#exercises_comb-proofs-16-1-1-1-1) Generalize. What if the rules changed, and you played a best of \(9\) tournament (5 wins required)? What if you played an \(n\) game tournament with \(k\) wins required to be named champion?[🔗](#exercises_comb-proofs-16-1-1-1-2-1) [🔗](#exercises_comb-proofs-16-1-1-1-2) [🔗](#exercises_comb-proofs-16-1-1) [🔗](#exercises_comb-proofs-16)

#### 16.

Let \(k_1, k_2, \ldots, k_j\) be a list of positive integers that sum to \(n\) (i.e., \(\sum_{i=1}^j k_i = n\)). Use two graphs containing \(n\) vertices to explain why \begin{equation*} \sum_{i = 1}^j \binom{k_i}{2} \le \binom{n}{2}\text{.} \end{equation*} [🔗](#exercises_comb-proofs-17-1-1) Hint. How many edges does \(K_n\) have? One of the two graphs will not be connected (unless \(j=1\) ).[🔗](#exercises_comb-proofs-17-2-1) [🔗](#exercises_comb-proofs-17-2) [🔗](#exercises_comb-proofs-17)[🔗](#exercises_comb-proofs)[🔗](#sec_comb-proofs) [&#xe5cb;Prev](sec_counting-multisets.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec-counting-probability.html) [Feedback](/cdn-cgi/l/email-protection#2b4458484a5905474e5d42456b5e454844054e4f5e)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_comb-proofs-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_comb-proofs-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
