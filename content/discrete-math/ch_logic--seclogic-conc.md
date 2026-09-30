---
title: "Chapter Summary"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_logic-conc.html
---

\At the most basic level, a statement might combine simpler statements using *logical connectives*. We often make use of variables and *quantify* over those variables. How to resolve the truth or falsity of a statement based on these connectives and quantifiers is what logic is all about. From this, we can decide whether two statements are logically equivalent or if one or more statements (logically) imply another.[🔗](#sec_logic-conc-2-2) When writing proofs (in any area of mathematics) our goal is to explain why a mathematical statement is true. Thus it is vital that our argument implies the truth of the statement. To be sure of this, we first must know what it means for the statement to be true, as well as ensure that the statements that make up the proof correctly imply the conclusion. A firm understanding of logic is required to check whether a proof is correct.[🔗](#sec_logic-conc-2-3) There is, however, another reason that understanding logic can be helpful. Understanding the logical structure of a statement often gives clues for how to write a proof of the statement.[🔗](#sec_logic-conc-2-4) This is not to say that writing proofs is always straight-forward. Consider again the *Goldbach conjecture*: [🔗](#sec_logic-conc-2-5)

> Every even number greater than 2 can be written as the sum of two primes.[🔗](#sec_logic-conc-2-6-1)
> > [🔗](#sec_logic-conc-2-6)

We are not going to try to prove the statement here, but we can at least say what a proof might look like, based on the logical form of the statement. Perhaps we should write the statement to highlight the quantifiers and connectives:[🔗](#sec_logic-conc-2-7)

> For all integers \(n\text{,}\) if \(n\) is even and greater than 2, then there exist integers \(p\) and \(q\) such that \(p\) and \(q\) are prime, and \(n = p+q\text{.}\)[🔗](#sec_logic-conc-2-8-1)
> > [🔗](#sec_logic-conc-2-8)

What would a direct proof look like? Since the statement starts with a universal quantifier, we would start, ``Let \(n\) be an arbitrary integer." The rest of the statement is an implication. In a direct proof we assume the “if” part, so the next line would be, “Assume \(n\) is greater than 2 and is even.” I have no idea what comes next, but eventually, we would need to find two prime numbers \(p\) and \(q\) (depending on \(n\)) and explain how we know that \(n = p+q\text{.}\)[🔗](#sec_logic-conc-2-9) Or maybe we try a proof by contradiction. To do this, we first assume the negation of the statement we want to prove. What is the negation? From what we have studied we should be able to see that it is,[🔗](#sec_logic-conc-2-10)

> There is an integer \(n\) such that \(n\) is even and greater than \(2\text{,}\) but for all integers \(p\) and \(q\text{,}\) either \(p\) or \(q\) is not prime, or \(n \ne p+q\text{.}\)[🔗](#sec_logic-conc-2-11-1)
> > [🔗](#sec_logic-conc-2-11)

Could this statement be true? A proof by contradiction would start by assuming it was and eventually conclude with a contradiction, proving that our assumption of truth was incorrect. And if you can find such a contradiction, you will have proved one of the most famous open problems in mathematics. Good luck.[🔗](#sec_logic-conc-2-12)

### Exercises Chapter Review

#### 1.

Complete a truth table for the statement \(\neg P \imp (Q \wedge R)\text{.}\)[🔗](#tt-1-1) [🔗](#tt)

#### 2.

Suppose you know that the statement “if Peter is not tall, then Quincy is fat and Robert is skinny” is false. What, if anything, can you conclude about Peter and Robert if you know that Quincy is indeed fat? Explain (you may reference [Question 1.6.1](sec_logic-conc.html#tt)).[🔗](#exercises_logic-conc-3-1-1) [🔗](#exercises_logic-conc-3)

#### 3.

Are the statements \(P \imp (Q \vee R)\) and \((P \imp Q) \vee (P \imp R)\) logically equivalent? Explain your answer.[🔗](#exercises_logic-conc-4-1-1) [🔗](#exercises_logic-conc-4)

#### 4.

Is the following a valid deduction rule? Explain.[🔗](#exercises_logic-conc-5-1-1)

|  | \(P \imp Q\) |
| --- | --- |
|  | \(P\imp R\) |
| \(\therefore\) | \(P \imp (Q \wedge R)\text{.}\) |

[🔗](#exercises_logic-conc-5)

#### 5.

Write the negation, converse and contrapositive for each of the statements below.

1. If the power goes off, then the food will spoil.[🔗](#exercises_logic-conc-6-1-1-1-1-1) [🔗](#exercises_logic-conc-6-1-1-1-1)
2. If the door is closed, then the light is off.[🔗](#exercises_logic-conc-6-1-1-1-2-1) [🔗](#exercises_logic-conc-6-1-1-1-2)
3. \(\forall x (x \lt 1 \imp x^2 \lt 1)\text{.}\) [🔗](#exercises_logic-conc-6-1-1-1-3)
4. For all natural numbers \(n\text{,}\) if \(n\) is prime, then \(n\) is solitary.[🔗](#exercises_logic-conc-6-1-1-1-4-1) [🔗](#exercises_logic-conc-6-1-1-1-4)
5. For all functions \(f\text{,}\) if \(f\) is differentiable, then \(f\) is continuous.[🔗](#exercises_logic-conc-6-1-1-1-5-1) [🔗](#exercises_logic-conc-6-1-1-1-5)
6. For all integers \(a\) and \(b\text{,}\) if \(a\cdot b\) is even, then \(a\) and \(b\) are even.[🔗](#exercises_logic-conc-6-1-1-1-6-1) [🔗](#exercises_logic-conc-6-1-1-1-6)
7. For every integer \(x\) and every integer \(y\text{,}\) there is an integer \(n\) such that if \(x > 0\) then \(nx > y\text{.}\)[🔗](#exercises_logic-conc-6-1-1-1-7-1) [🔗](#exercises_logic-conc-6-1-1-1-7)
8. For all real numbers \(x\) and \(y\text{,}\) if \(xy = 0\) then \(x = 0\) or \(y = 0\text{.}\)[🔗](#exercises_logic-conc-6-1-1-1-8-1) [🔗](#exercises_logic-conc-6-1-1-1-8)
9. For every student in Math 228, if they do not understand implications, then they will fail the exam.[🔗](#exercises_logic-conc-6-1-1-1-9-1) [🔗](#exercises_logic-conc-6-1-1-1-9)

[🔗](#exercises_logic-conc-6-1-1) [🔗](#exercises_logic-conc-6)

#### 6.

Consider the statement, “For all integers \(n\text{,}\) if \(n\) is even and \(n \le 7\text{,}\) then \(n\) is negative or \(n \in \{0,2,4,6\}\text{.}\)”

1. Is the statement true? Explain why.[🔗](#exercises_logic-conc-7-1-1-2-1-1) [🔗](#exercises_logic-conc-7-1-1-2-1)
2. Write the negation of the statement. Is it true? Explain.[🔗](#exercises_logic-conc-7-1-1-2-2-1) [🔗](#exercises_logic-conc-7-1-1-2-2)
3. State the contrapositive of the statement. Is it true? Explain.[🔗](#exercises_logic-conc-7-1-1-2-3-1) [🔗](#exercises_logic-conc-7-1-1-2-3)
4. State the converse of the statement. Is it true? Explain.[🔗](#exercises_logic-conc-7-1-1-2-4-1) [🔗](#exercises_logic-conc-7-1-1-2-4)

[🔗](#exercises_logic-conc-7-1-1) [🔗](#exercises_logic-conc-7)

#### 7.

Consider the statement: \(\forall x (\forall y (x + y = y) \imp \forall z (x\cdot z = 0))\text{.}\)

1. Explain what the statement says in words. Is this statement true? Be sure to state what you are taking the universe of discourse to be.[🔗](#exercises_logic-conc-8-1-1-2-1-1) [🔗](#exercises_logic-conc-8-1-1-2-1)
2. Write the converse of the statement, both in words and in symbols. Is the converse true?[🔗](#exercises_logic-conc-8-1-1-2-2-1) [🔗](#exercises_logic-conc-8-1-1-2-2)
3. Write the contrapositive of the statement, both in words and in symbols. Is the contrapositive true?[🔗](#exercises_logic-conc-8-1-1-2-3-1) [🔗](#exercises_logic-conc-8-1-1-2-3)
4. Write the negation of the statement, both in words and in symbols. Is the negation true?[🔗](#exercises_logic-conc-8-1-1-2-4-1) [🔗](#exercises_logic-conc-8-1-1-2-4)

[🔗](#exercises_logic-conc-8-1-1) [🔗](#exercises_logic-conc-8)

#### 8.

Simplify the following.

1. \(\neg (\neg (P \wedge \neg Q) \imp \neg(\neg R \vee \neg(P \imp R)))\text{.}\) [🔗](#exercises_logic-conc-9-1-1-1-1)
2. \(\neg \exists x \neg \forall y \neg \exists z (z = x + y \imp \exists w (x - y = w))\text{.}\) [🔗](#exercises_logic-conc-9-1-1-1-2)

[🔗](#exercises_logic-conc-9-1-1) [🔗](#exercises_logic-conc-9)

#### 9.

Consider the statement, “For all integers \(n\text{,}\) if \(n\) is odd, then \(7n\) is odd.”

1. Prove the statement. What sort of proof are you using?[🔗](#exercises_logic-conc-10-1-1-2-1-1) [🔗](#exercises_logic-conc-10-1-1-2-1)
2. Prove the converse. What sort of proof are you using?[🔗](#exercises_logic-conc-10-1-1-2-2-1) [🔗](#exercises_logic-conc-10-1-1-2-2)

[🔗](#exercises_logic-conc-10-1-1) [🔗](#exercises_logic-conc-10)

#### 10.

Suppose you break your piggy bank and scoop up a handful of 22 coins (pennies, nickels, dimes, and quarters).

1. Prove that you must have at least 6 coins of a single denomination.[🔗](#exercises_logic-conc-11-1-1-1-1-1) [🔗](#exercises_logic-conc-11-1-1-1-1)
2. Suppose you have an odd number of pennies. Prove that you must have an odd number of at least one of the other types of coins.[🔗](#exercises_logic-conc-11-1-1-1-2-1) [🔗](#exercises_logic-conc-11-1-1-1-2)
3. How many coins would you need to scoop up to be sure that you either had 4 coins that were all the same or 4 coins that were all different? Prove your answer.[🔗](#exercises_logic-conc-11-1-1-1-3-1) [🔗](#exercises_logic-conc-11-1-1-1-3)

[🔗](#exercises_logic-conc-11-1-1) [🔗](#exercises_logic-conc-11)

#### 11.

You come across four trolls playing bridge. They declare:[🔗](#exercises_logic-conc-12-3-1)

> Troll 1: All trolls here see at least one knave.[🔗](#exercises_logic-conc-12-3-2-1)
> > Troll 2: I see at least one troll that sees only knaves.[🔗](#exercises_logic-conc-12-3-2-2)
> > Troll 3: Some trolls are scared of goats.[🔗](#exercises_logic-conc-12-3-2-3)
> > Troll 4: All trolls are scared of goats.[🔗](#exercises_logic-conc-12-3-2-4)
> > [🔗](#exercises_logic-conc-12-3-2)

Are there any trolls that are not scared of goats? Recall, of course, that all trolls are either knights (who always tell the truth) or knaves (who always lie).[🔗](#exercises_logic-conc-12-3-3) [🔗](#exercises_logic-conc-12)[🔗](#exercises_logic-conc)[🔗](#sec_logic-conc) [&#xe5cb;Prev](sec_logic-structures.html)[&#xe5ce;Top](#)[Next&#xe5cc;](ch_graphtheory.html) [Feedback](/cdn-cgi/l/email-protection#deb1adbdbfacf0b2bba8b7b09eabb0bdb1f0bbbaab)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_logic-conc-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_logic-conc-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
