---
title: "Proof by Induction"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_seq-induction.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 4.5 Proof by Induction

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_seq-induction-5-1-1)

1. Identify the parts of a proof by mathematical induction and how they relate to the statement being proved.[🔗](#sec_seq-induction-5-2-1-1) [🔗](#sec_seq-induction-5-2-1)
2. Prove statements using mathematical induction.[🔗](#sec_seq-induction-5-2-2-1) [🔗](#sec_seq-induction-5-2-2)
3. Explain why a proof by mathematical induction is valid.[🔗](#sec_seq-induction-5-2-3-1) [🔗](#sec_seq-induction-5-2-3)

[🔗](#sec_seq-induction-5)

### Subsection Section Preview

#### Investigate!

What is the unit digit (the right-most digit) of \(6^n\text{?}\) Does the answer depend on \(n\text{?}\)[🔗](#subsec-induction-preview-2-1-1) [🔗](#subsec-induction-preview-2) Mathematical induction is a powerful proof technique that can be used to prove statements are true for a *sequence* of statements, as long as that sequence of statements has some starting place. For example, if we are trying to say something about the unit digit of \(6^n\text{,}\) we are making that claim for \(n=1\text{,}\) then \(n = 2\text{,}\) then \(n = 3\text{,}\) and so on.[🔗](#subsec-induction-preview-3) Induction is closely related to recursive definitions; the main idea in a proof by induction is to explain how you can get from one statement in the sequence to the next.[🔗](#subsec-induction-preview-4)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-seq-induction)

#### 1.

Suppose that \(6^{472}\) had a 2 for its unit digit. That is, suppose \(6^{472} = 19,381,6\ldots\ldots 2\text{.}\) What would the unit digit of \(6^{473}\) be? [🔗](#prev-induction-unit-digit-2-1-1) Hint. \(6^{473} = 6 \cdot 6^{472}\text{.}\)[🔗](#prev-induction-unit-digit-2-2-1) [🔗](#prev-induction-unit-digit-2-2) [🔗](#prev-induction-unit-digit-2)

#### 2.

What is the unit digit of \(6^{2}\text{,}\) of \(6^3\text{,}\) and of \(6^4\text{?}\)[🔗](#prev-induction-unit-digit-6-1-1) The unit’s digit of \(6^2\) is .[🔗](#prev-induction-unit-digit-6-1-2) The unit’s digit of \(6^3\) is .[🔗](#prev-induction-unit-digit-6-1-3) The unit’s digit of \(6^4\) is .[🔗](#prev-induction-unit-digit-6-1-4) [🔗](#prev-induction-unit-digit-6)

#### 3.

Which of the following are true? Select all that apply.[🔗](#prev-induction-mc-1-1)

- If the unit’s digit of \(6^k\) is a 6, then the unit’s digit of \(6^{k+1}\) is a 6.
- If the unit’s digit of \(6^k\) is a 2, then the unit’s digit of \(6^{k+1}\) is a 2.
- The unit’s digit of \(6^{472}\) is a 2.
- The unit’s digit of \(6^{472}\) is a 6.

[🔗](#prev-induction-mc)

#### 4.

Explain your answer to the previous question.[🔗](#prev-induction-explain.-1-1) [🔗](#prev-induction-explain.)[🔗](#PA-seq-induction)[🔗](#subsec-induction-preview)

### Subsection Recursive Reasoning

We have seen that describing a sequence recursively can often be easier than describing the sequence with a closed formula. We will now see how using similar recursive reasoning can help us prove statements using a proof technique called mathematical induction. This style of proof is especially useful when the different instances of the statement (for different values of \(n\text{,}\) say) are related recursively.[🔗](#subsec_induction-recursion-2) For example, suppose we wanted to prove a fact about all the terms in a sequence for which we have a recursive definition. Consider the sequence \((a_n)_{n\ge 0}\) defined recursively by \(a_n = 3a_{n-1} - 2\) with \(a_0 = 5\text{.}\) Could we prove that every term in this sequence is odd?[🔗](#subsec_induction-recursion-3) Let’s start by writing out the first few terms of the sequence: \begin{equation*} 5, 13, 37, 109, \ldots\text{.} \end{equation*} So far, all these numbers look odd. Will the next number be odd? Of course, we could just compute it using the recurrence relation. We would take \(3\cdot 109 - 2\text{.}\) We don’t actually care *which* odd number this is, just that it is, in fact, odd. We know it will be odd because the product of two odd numbers is odd, and subtracting 2 from an odd number results in an odd number. [🔗](#subsec_induction-recursion-4) Great, so \(a_4\) is odd. Will \(a_5\) be odd too? Yes, use the same argument as above: \(a_5 = 3 a_4 - 2\text{.}\) We just convinced ourselves that \(a_4\) is odd (without finding its actual value), so \(3 a_4\) is odd, and 2 less than it will be odd too.[🔗](#subsec_induction-recursion-5) What about \(a_6\text{?}\) Do the same thing. In fact, why are we using any particular number as the index? If it is the same argument each time, we should be able to just give this argument once and say it always works.[🔗](#subsec_induction-recursion-6) Suppose we have found that \(a_k\) is odd (where \(k\) is some arbitrary natural number). From this, we can find that \(a_{k+1}\) is odd, since \(a_{k+1} = 3 a_k - 2\text{,}\) and \(3\) times the odd number \(a_{k}\) will be odd, and subtracting 2 will result in an odd number. Yay. Let’s put this all together as a proof.[🔗](#subsec_induction-recursion-7)

#### Proof.

We claim that for any \(n \ge 0\text{,}\) the number \(a_n\) is odd, where \(a_n = 3a_{n-1} - 2\) and \(a_0 = 5\text{.}\)[🔗](#subsec_induction-recursion-8-1) When \(n = 0\text{,}\) the claim is true, since \(a_0 = 5\) is an odd number.[🔗](#subsec_induction-recursion-8-2) Further, we can prove that every larger \(n\) has \(a_n\) odd because as long as \(a_k\) is odd, so is \(a_{k+1}\) (since \(a_{k+1} = 3a_{k} - 2\text{,}\) and 3 times an odd number minus 2 is always odd).[🔗](#subsec_induction-recursion-8-3) Therefore \(a_n\) is odd for all \(n \ge 0\text{.}\)[🔗](#subsec_induction-recursion-8-4) [🔗](#subsec_induction-recursion-8)Soon we will give a more rigid structure for proofs by induction, but the basic idea is exactly what we have above.[🔗](#subsec_induction-recursion-9) [🔗](#subsec_induction-recursion)

### Subsection Formalizing Proofs

Induction can prove many statements that hold for all natural numbers, not just statements about sequences. In particular, induction should be used when there is some way to go from one case to the next – when you can see how to always “do one more.”[🔗](#subsec_induction-formproofs-2) Thinking about how we write statements in logical symbols, we will use induction to prove statements of the form \begin{equation*} \forall n P(n)\text{,} \end{equation*} where the domain of discourse (the values of \(n\) we quantify over) has some least element. Say that domain of discourse is the natural numbers. We are then proving this *sequence* of statements: \begin{equation*} P(0), P(1), P(2), P(3), \ldots\text{.} \end{equation*} The way we do this with induction is to prove a base case, that \(P(0)\) is true (or \(P(a)\) where \(a\) is the least element of our domain of discourse). Next, we prove the inductive case, that \(P(k) \imp P(k+1)\) for all \(k \ge 0\) (or \(k \ge a\)). [🔗](#subsec_induction-formproofs-3) Together, these are enough to prove \(P(n)\) is true for all \(n\text{.}\) How do we know? That is, why is this style of proof valid? Well, let’s convince ourselves that \(P(3)\) is true. We know \(P(0)\) is true. And because we know that \(P(0) \imp P(1)\text{,}\) we then also know that \(P(1)\) is true. Because \(P(1) \imp P(2)\text{,}\) we then get that \(P(2)\) is true. Finally, because \(P(2) \imp P(3)\text{,}\) we have that \(P(3)\text{.}\) There is nothing special about 3 here. We could have gone up as far as we like, *to any \(n\) value!*[🔗](#subsec_induction-formproofs-4) Think of a row of dominoes set up standing on their edges. We want to argue that in a minute, all the dominoes will have fallen. For this to happen, you will need to push the first domino. That is the base case. It will also have to be that the dominoes are close enough together that when any particular domino falls, it will cause the next domino to fall. That is the inductive case. If both of these conditions are met – you push the first domino over, and each domino will cause the next to fall – then all the dominoes will fall.[🔗](#subsec_induction-formproofs-5) Induction is powerful! Think how much easier it is to knock over dominoes when you don’t have to push over each domino yourself. You just start the chain reaction and then rely on the relative nearness of the dominoes to take care of the rest.[🔗](#subsec_induction-formproofs-6) When writing a proof by induction, we will follow a standard style. Writing in this style allows us to keep our ideas organized and might even help us formulate the proof.[🔗](#subsec_induction-formproofs-7) Here is the general structure of a proof by mathematical induction:[🔗](#subsec_induction-formproofs-8)

#### Induction Proof Structure.

Start by saying what the statement is that you want to prove: “Let \(P(n)\) be the statement….” To prove that \(P(n)\) is true for all \(n \ge 0\text{,}\) you must prove two facts:

1. Base case: Prove that \(P(0)\) is true. You do this directly. This is often easy.[🔗](#subsec_induction-formproofs-9-4-5-1-1) [🔗](#subsec_induction-formproofs-9-4-5-1)
2. Inductive case: Prove that \(P(k) \imp P(k+1)\) for all \(k \ge 0\text{.}\) That is, prove that for any \(k \ge 0\) if \(P(k)\) is true, then \(P(k+1)\) is true as well. This is the proof of an if … then … statement, so you can assume \(P(k)\) is true (\(P(k)\) is called the *inductive hypothesis*). You must then explain why \(P(k+1)\) is also true, given that assumption.[🔗](#subsec_induction-formproofs-9-4-5-2-1) [🔗](#subsec_induction-formproofs-9-4-5-2)

[🔗](#subsec_induction-formproofs-9-4) Assuming you are successful on both parts above, you can conclude, “Therefore by the principle of mathematical induction, the statement \(P(n)\) is true for all \(n \ge 0\text{.}\)”[🔗](#subsec_induction-formproofs-9-5) [🔗](#subsec_induction-formproofs-9)Sometimes the statement \(P(n)\) will only be true for values of \(n \ge 4\text{,}\) for example, or some other value. In such cases, replace all the 0’s above with 4’s (or the other value).[🔗](#subsec_induction-formproofs-10) Before attempting to prove a statement by mathematical induction, first think about *why* the statement is true using inductive reasoning. Explain why induction is the right thing to do, and roughly why the inductive case will work. Then, sit down and write out a careful, formal proof using the structure above.[🔗](#subsec_induction-formproofs-11) [🔗](#subsec_induction-formproofs)

### Subsection Examples

Here are some examples of proof by mathematical induction.[🔗](#subsec_induction-examples-2)

#### Example 4.5.1.

Prove for each natural number \(n \ge 1\) that \(1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}\text{.}\)[🔗](#subsec_induction-examples-3-1-1) Solution. First, let’s think inductively about this equation. In fact, we know this is true for other reasons (reverse and add comes to mind). But why might induction be applicable? The left-hand side adds up the numbers from 1 to \(n\text{.}\) If we know how to do that, adding just one more term (\(n+1\)) would not be that hard. For example, if \(n = 100\text{,}\) suppose we know that the sum of the first 100 numbers is \(5050\) (so \(1 + 2 + 3 + \cdots + 100 = 5050\text{,}\) which is true). Now to find the sum of the first 101 numbers, it makes more sense to just add 101 to 5050, instead of computing the entire sum again. We would have \(1 + 2 + 3 + \cdots + 100 + 101 = 5050 + 101 = 5151\text{.}\) In fact, it would always be easy to add just one more term. This is why we should use induction.[🔗](#subsec_induction-examples-3-2-1) Now the formal proof:[🔗](#subsec_induction-examples-3-2-2)

#### Proof.

Let \(P(n)\) be the statement \(1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}\text{.}\) We will show that \(P(n)\) is true for all natural numbers \(n \ge 1\text{.}\)[🔗](#subsec_induction-examples-3-2-3-1) Base case: \(P(1)\) is the statement \(1 = \frac{1(1+1)}{2}\) which is clearly true.[🔗](#subsec_induction-examples-3-2-3-2) Inductive case: Let \(k \ge 1\) be a natural number. Assume (for induction) that \(P(k)\) is true. That means \(1 + 2 + 3 + \cdots + k = \frac{k(k+1)}{2}\text{.}\) We will prove that \(P(k+1)\) is true as well. That is, we must prove that \(1 + 2 + 3 + \cdots + k + (k+1) = \frac{(k+1)(k+2)}{2}\text{.}\) To prove this equation, start by adding \(k+1\) to both sides of the inductive hypothesis: \begin{equation*} 1 + 2 + 3 + \cdots + k + (k+1) = \frac{k(k+1)}{2} + (k+1)\text{.} \end{equation*} [🔗](#subsec_induction-examples-3-2-3-3) Now, simplifying the right side we get: \begin{align*} \frac{k(k+1)}{2} + k+1 \amp = \frac{k(k+1)}{2} + \frac{2(k+1)}{2}\\ \amp = \frac{k(k+1) + 2(k+1)}{2}\\ \amp = \frac{(k+2)(k+1)}{2}\text{.} \end{align*} [🔗](#subsec_induction-examples-3-2-3-4) Thus \(P(k+1)\) is true, so by the principle of mathematical induction, \(P(n)\) is true for all natural numbers \(n \ge 1\text{.}\)[🔗](#subsec_induction-examples-3-2-3-5) [🔗](#subsec_induction-examples-3-2-3)[🔗](#subsec_induction-examples-3-2) [🔗](#subsec_induction-examples-3)Note that in the part of the proof where we proved \(P(k+1)\) from \(P(k)\text{,}\) we used the equation \(P(k)\text{.}\) This was the inductive hypothesis. Seeing how to use the inductive hypotheses is usually straightforward when proving a fact about a sum like this. In other proofs, it can be less obvious where it fits in.[🔗](#subsec_induction-examples-4)

#### Example 4.5.2.

Prove that for all \(n \in \N\text{,}\) \(6^n - 1\) is a multiple of 5.[🔗](#subsec_induction-examples-5-1-1) Solution. Again, start by understanding the dynamics of the problem. What does increasing \(n\) do? Let’s try with a few examples. If \(n = 1\text{,}\) then yes, \(6^1 - 1 = 5\) is a multiple of 5. What does incrementing \(n\) to 2 look like? We get \(6^2 - 1 = 35\text{,}\) which again is a multiple of 5. Next, \(n = 3\text{:}\) But instead of just finding \(6^3 - 1\text{,}\) what did the increase in \(n\) do? We will still subtract 1, but now we are multiplying by another 6 first. Viewed another way, we are multiplying a number that is one more than a multiple of 5 by 6 (because \(6^2 - 1\) is a multiple of 5, so \(6^2\) is one more than a multiple of 5). What do numbers that are one more than a multiple of 5 look like? They must have last digit 1 or 6. What happens when you multiply such a number by 6? It depends on the number, but in any case, the last digit of the new number must be a 6. And then if you subtract 1, you get last digit 5, so a multiple of 5.[🔗](#subsec_induction-examples-5-2-1) The point is, every time we multiply by just one more six, we still get a number with last digit 6, so subtracting 1 gives us a multiple of 5. Now the formal proof:[🔗](#subsec_induction-examples-5-2-2)

#### Proof.

Let \(P(n)\) be the statement, “\(6^n - 1\) is a multiple of 5.” We will prove that \(P(n)\) is true for all \(n \in \N\text{.}\)[🔗](#subsec_induction-examples-5-2-3-1) Base case: \(P(0)\) is true: \(6^0 -1 = 0\text{,}\) which is a multiple of 5.[🔗](#subsec_induction-examples-5-2-3-2) Inductive case: Let \(k\) be an arbitrary natural number. Assume, for induction, that \(P(k)\) is true. That is, \(6^k - 1\) is a multiple of \(5\text{.}\) Then \(6^k - 1 = 5j\) for some integer \(j\text{.}\) This means that \(6^k = 5j + 1\text{.}\) Multiply both sides by \(6\text{:}\) \begin{equation*} 6^{k+1} = 6(5j+1) = 30j + 6\text{.} \end{equation*} [🔗](#subsec_induction-examples-5-2-3-3) But we want to know about \(6^{k+1} - 1\text{,}\) so subtract 1 from both sides: \begin{equation*} 6^{k+1} - 1 = 30j + 5\text{.} \end{equation*} [🔗](#subsec_induction-examples-5-2-3-4) Of course \(30j+5 = 5(6j+1)\text{,}\) so is a multiple of 5.[🔗](#subsec_induction-examples-5-2-3-5) Therefore \(6^{k+1} - 1\) is a multiple of 5, or in other words, \(P(k+1)\) is true. Thus, by the principle of mathematical induction \(P(n)\) is true for all \(n \in \N\text{.}\)[🔗](#subsec_induction-examples-5-2-3-6) [🔗](#subsec_induction-examples-5-2-3)[🔗](#subsec_induction-examples-5-2) [🔗](#subsec_induction-examples-5)We had to be a little bit clever (i.e., use some algebra) to locate the \(6^k - 1\) inside of \(6^{k+1} - 1\) before we could apply the inductive hypothesis. This is what can make inductive proofs challenging.[🔗](#subsec_induction-examples-6) In the two examples above, we started with \(n = 1\) or \(n = 0\text{.}\) We can start later if we need to.[🔗](#subsec_induction-examples-7)

#### Example 4.5.3.

Prove that \(n^2 \lt 2^n\) for all integers \(n \ge 5\text{.}\)[🔗](#subsec_induction-examples-8-1-1) Solution. First, the idea of the argument. What happens when we increase \(n\) by 1? On the left-hand side, we increase the base of the square and go to the next square number. On the right-hand side, we increase the power of 2. This means we double the number. So the question is, how does doubling a number relate to increasing to the next square? Think about what the difference of two consecutive squares looks like. We have \((n+1)^2 - n^2\text{.}\) This factors: \begin{equation*} (n+1)^2 - n^2 = (n+1-n)(n+1+n) = 2n+1\text{.} \end{equation*} [🔗](#subsec_induction-examples-8-2-1) But doubling the right-hand side increases it by \(2^n\text{,}\) since \(2^{n+1} = 2^n + 2^n\text{.}\) When \(n\) is large enough, \(2^n > 2n + 1\text{.}\)[🔗](#subsec_induction-examples-8-2-2) What we are saying here is that each time \(n\) increases, the left-hand side grows by less than the right-hand side. So if the left-hand side starts smaller (as it does when \(n = 5\)), it will never catch up. Now the formal proof:[🔗](#subsec_induction-examples-8-2-3)

#### Proof.

Let \(P(n)\) be the statement \(n^2 \lt 2^n\text{.}\) We will prove \(P(n)\) is true for all integers \(n \ge 5\text{.}\)[🔗](#subsec_induction-examples-8-2-4-1) Base case: \(P(5)\) is the statement \(5^2 \lt 2^5\text{.}\) Since \(5^2 = 25\) and \(2^5 = 32\text{,}\) we see that \(P(5)\) is indeed true.[🔗](#subsec_induction-examples-8-2-4-2) Inductive case: Let \(k \ge 5\) be an arbitrary integer. Assume, for induction, that \(P(k)\) is true. That is, assume \(k^2 \lt 2^k\text{.}\) We will prove that \(P(k+1)\) is true, i.e., \((k+1)^2 \lt 2^{k+1}\text{.}\) To prove such an inequality, start with the left-hand side and work towards the right-hand side: \begin{align*} (k+1)^2 \amp = k^2 + 2k + 1 \amp\\ \amp \lt 2^k + 2k + 1 \amp \ldots\text{by the inductive hypothesis.}\\ \amp \lt 2^k + 2^k \amp \ldots\text{ since } 2k + 1 \lt 2^k \text{ for }k \ge 5.\\ \amp = 2^{k+1}. \amp \end{align*} [🔗](#subsec_induction-examples-8-2-4-3) Following the equalities and inequalities through, we get \((k+1)^2 \lt 2^{k+1}\text{,}\) in other words, \(P(k+1)\text{.}\) Therefore by the principle of mathematical induction, \(P(n)\) is true for all \(n \ge 5\text{.}\)[🔗](#subsec_induction-examples-8-2-4-4) [🔗](#subsec_induction-examples-8-2-4)[🔗](#subsec_induction-examples-8-2) [🔗](#subsec_induction-examples-8)The previous example might remind you of the *racetrack principle* from calculus, which says that if \(f(a) \lt g(a)\text{,}\) and \(f'(x) \lt g'(x)\) for \(x > a\text{,}\) then \(f(x) \lt g(x)\) for \(x > a\text{.}\) Same idea: the larger function is increasing more than the smaller function, so the larger function will stay larger. In discrete math, we don’t have derivatives, so we look at differences. Thus induction is the way to go.[🔗](#subsec_induction-examples-9)

#### A Warning.

With great power, comes great responsibility. Induction isn’t magic. It seems very powerful to be able to assume \(P(k)\) is true. After all, we are trying to prove \(P(n)\) is true, and the only difference is in the variable: \(k\) vs. \(n\text{.}\) Are we assuming that what we want to prove is true? Not really. We assume \(P(k)\) is true only for the sake of proving that \(P(k+1)\) is true.[🔗](#subsec_induction-examples-10-3) Still you might start to believe that you can prove anything with induction. Consider this incorrect “proof” that every Canadian has the same eye color: Let \(P(n)\) be the statement that any \(n\) Canadians have the same eye color. \(P(1)\) is true, since everyone has the same eye color as themselves. Now assume \(P(k)\) is true. That is, assume that in any group of \(k\) Canadians, everyone has the same eye color. Now consider an arbitrary group of \(k+1\) Canadians. The first \(k\) of these must all have the same eye color, since \(P(k)\) is true. Also, the last \(k\) of these must have the same eye color, since \(P(k)\) is true. So in fact, everyone in the group must have the same eye color. Thus \(P(k+1)\) is true. So by the principle of mathematical induction, \(P(n)\) is true for all \(n\text{.}\)[🔗](#subsec_induction-examples-10-4) Clearly something went wrong. The problem is that the proof that \(P(k)\) implies \(P(k+1)\) assumes that \(k \ge 2\text{.}\) We have only shown \(P(1)\) is true. In fact, \(P(2)\) is false. Try this: read through the previous paragraph again, substituting \(1\) for each \(k\text{.}\) Can you spot the error in that argument?[🔗](#subsec_induction-examples-10-5) [🔗](#subsec_induction-examples-10)[🔗](#subsec_induction-examples)

### Reading Questions Reading Questions

#### 1.

Suppose you wanted to prove, using mathematical induction, that \(1+3+5+\cdots+2n-1 = n^2\) for all values of \(n \ge 1\text{.}\) Which of the following would be an appropriate *first line* of the proof? Select all that apply.[🔗](#rq-seq-induction-mc-1-1)

- Let \(P(n)\) be the statement “\(1+3+5+\cdots+2n-1 = n^2\text{.}\)”
- Correct. Note in particular, we do not include the “for all \(n \ge 1\)” as part of the definition of \(P(n)\text{.}\)
- For each \(n \ge 1\text{,}\) let \(P(n)\) be the statement, “the sum of the first \(n\) odd numbers is \(n^2\text{.}\)”
- This is correct. Note that saying that we define \(P(n)\) for each \(n\ge 1\) is different from saying that \(P(n)\) includes “...for all \(n\ge 1\text{.}\)”
- Assume \(1+3+\cdots + 2n-1 = n^2\) for all \(n \ge 1\text{.}\)
- This is what you are trying to prove, so you cannot assume it. Later in the proof (in the inductive case) we will assume that \(P(k)\) is true for some arbitrary \(k\text{,}\) but this is not assuming it is true for all \(n\) at once.
- Let \(P(n)\) be the statement, “\(1+3+\cdots+2n-1 = n^2\) for all \(n \ge 1\text{.}\)”
- This doesn’t make sense: what would \(P(3)\) be? That \(1 + 3 + 5 = 3^2\) for all \(3 \ge 1\text{??}\)
- Since \(P(1) = 1 = 1^2\text{,}\) the base case is true.
- Two problems here: first, you need to say what \(P(n)\) is. Second, \(P(1)\) is a statement, so it cannot be equal to the number 1.

[🔗](#rq-seq-induction-mc)

#### 2.

Suppose you wanted to prove that \(P(n,3) \ge \binom{n}{3}\) for all \(n \ge 4\text{.}\) Write the first line of a proof by induction.[🔗](#rq-seq-induction-first-line-1-1) [🔗](#rq-seq-induction-first-line)

#### 3.

What questions do you have? Write at least one question about the content of this section that you or a classmate might be curious about after reading this section.[🔗](#rq-seq-induction-q-1-1) [🔗](#rq-seq-induction-q)[🔗](#rqs-seq-induction)

### Exercises Practice Problems

#### 1.

Suppose you are trying to prove, by mathematical induction, that a statement \(P(n)\) is true for all \(n \ge 0\text{.}\) What would you attempt to prove in the *induction step* of the proof? (Select all that apply.)[🔗](#ind-mc-induction-step-1-1)

- That assuming \(P(k)\) is true for an arbitrary \(k \ge 0\text{,}\) we can prove that \(P(k+1)\) is true.
- That \(P(k)\) implies \(P(k+1)\) for all \(k \ge 0\text{.}\)
- That assuming \(P(k+1)\) is true for an arbitrary \(k \ge 0\text{,}\) we can prove that \(P(k)\) is true.
- That \(P(k+1)\) implies \(P(k)\) for all \(k \ge 0\text{.}\)
- That \(P(k)\) implies \(P(k+1)\) for at least one \(k \ge 0\text{.}\)

[🔗](#ind-mc-induction-step)

#### 2.

Suppose you wanted to prove the following statement: \begin{equation*} 2 + 4 + 6 + \cdots + 2n = n(n+1) \text{ for all } n \ge 1\text{.} \end{equation*} What would the first line of a proof by induction be? [🔗](#ind-mc-steps1-1-1)

- Let \(P(n)\) be the statement “\(2 + 4 + 6 + \cdots + 2n = n(n+1)\text{.}\)”
- Let \(P(n)\) be the statement “\(2 + 4 + 6 + \cdots + 2n = n(n-1)\) for all \(n \ge 1\text{.}\)”
- Assume \(P(n)\) is true for all \(n \ge 1\text{.}\)
- Let \(P(n) = 2 + 4 + 6 + \cdots + 2n\text{.}\)
- Suppose \(P(n) = n(n+1)\) for all \(n \ge 1\text{.}\)

[🔗](#ind-mc-steps1)

#### 3.

Suppose you were proving the following statement by mathematical induction: \begin{equation*} 2 + 4 + 6 + \cdots + 2n = n(n+1) \text{ for all } n \ge 1\text{.} \end{equation*} What would you need to show to establish the base case? [🔗](#ind-mc-steps2-1-1)

- Show that \(P(1)\) is true. That is, show that \(2 = 1(1+1)\text{.}\)
- Show that \(P(2)\) is true. That is, show that \(2 + 4 = 2(2+1)\text{.}\)
- Even though the sum starts with \(2\text{,}\) we need to consider the smallest \(n\) for which the statement \(P(n)\) is true.
- Show that \(P(1)\) and \(P(2)\) are both true.
- Show that \(P(1)\) implies \(P(2)\text{.}\)
- Nothing, since the sum already has more than \(n = 1\) terms.

[🔗](#ind-mc-steps2)

#### 4.

Suppose you were proving the following statement by mathematical induction: \begin{equation*} 2 + 4 + 6 + \cdots + 2n = n(n+1) \text{ for all } n \ge 1\text{.} \end{equation*} What would the first line of the inductive case be? [🔗](#ind-mc-steps3-1-1)

- Assume \(P(k)\) is true for some arbitrary \(k \ge 1\text{,}\) that is, assume \(2+4+6+\cdots + 2k = k(k+1)\text{.}\)
- Assume \(P(k)\) is true for all \(k \ge 1\text{,}\) that is, assume \(2+4+6+\cdots + 2k = k(k+1)\text{.}\)
- Assume \(P(k)\) and \(P(k)\) are both true for an arbitrary \(k \ge 1\text{;}\) that is, assume \(2+4+6+\cdots + 2k = k(k+1)\) and \(2+4+6+\cdots + 2k+ 2k+2) = (k+1)(k+2)\text{.}\)
- Assume \(P(k)\) implies \(P(k+1)\) for an arbitrary \(k \ge 1\text{.}\)
- Assume \(P(k)\) is true for some large \(k \ge 1\text{;}\) say, assume \(2 + 4 + 6 + \cdots + 432 = 216(217)\text{.}\)

[🔗](#ind-mc-steps3)

#### 5.

Arrange some of the statements below to create a correct proof by induction that the recurrence relation \(a_n = 5a_{n-1} + 4\text{,}\) with initial condition \(a_0 = 0\) has closed formula \(a_n = 5^n - 1\text{.}\)[🔗](#ind-drag-recurrence-1-1)

```natural
Let \(P(n)\) be the statement, “\(a_n = 5^n - 1\)”.
---
Note that \(a_0 = 5^0 - 1 = 0\text{,}\) so \(P(0)\) is true.
---
Now assume that \(P(k)\) is true for an arbitrary integer \(k \ge 0\text{.}\)

---
Then \(a_k = 5^k - 1\text{.}\)

---
By the recurrence relation, we have \(a_{k+1} = 5 a_k + 4 = 5 (5^k -1) + 4\text{.}\)

---
This simplifies to \(a_{k+1} = 5^{k+1} - 5 + 4 = 5^{k+1} - 1\text{,}\) so \(P(k+1)\) is true.
---
Therefore, by the principle of mathematical induction, \(P(n)\) is true for all \(n \ge 0\text{.}\)

---
Now assume that \(P(k+1)\) is true for an arbitrary integer \(k \ge 0\text{.}\)
 #distractor
---
Then \(a_{k+1} = 5a_k+4\text{,}\) so \(P(k+1)\) is true. #distractor
```

[🔗](#ind-drag-recurrence)

#### 6.

Arrange some of the statements below to create a correct proof by induction that for all \(n \ge 1\text{,}\) the number \(14^n - 1\) is a multiple of \(13\text{.}\)[🔗](#ind-drag-multiple-1-1)

```natural
Let \(P(n)\) be the statement, “\(14^n - 1\) is a multiple of \(13\text{.}\)”
---
Note that \(14^1 - 1 = 13\text{,}\) so this is definitely a multiple of \(13\text{.}\)

---
Now assume that \(P(k)\) is true for an arbitrary integers \(k \ge 1\text{.}\)

---
Then \(14^k - 1 = 13\cdot j\) for some integer \(j\text{.}\)

---
Since \(14^{k+1} - 1 = 14(14^k - 1) + 14 - 1 = 14(13\cdot j) + 13\text{,}\) we see that \(14^{k+1} - 1\) is a multiple of \(13\text{.}\)

---
Thus \(P(k+1)\) is true.
---
Therefore, by the principle of mathematical induction, \(P(n)\) is true for all \(n \ge 1\text{.}\)

---
Note that \(14^2 - 1 = (14-1)(14+1)\) by difference of squares, so this is a multiple of 13. #distractor
---
Now assume that \(P(n)\) is true for all \(n \ge 1\text{.}\)
 #distractor
---
Thus \(14^k = \frac{14^{k+1} - 1}{14}\text{,}\) which must also be a multiple of 13. #distractor
```

[🔗](#ind-drag-multiple)

#### 7.

Arrange some of the statements below to create a correct proof by induction that for all \(n \ge 1\text{,}\) \(1+1+2+3+5+\cdots + F_n = F_{n+2} - 1\text{,}\) where \(F_n\) is the \(n\)th Fibonacci number.[🔗](#ind-drag-sum-1-1)

```natural
Let \(P(n)\) be the statement, “\(1+1+2+3+5+\cdots + F_n = F_{n+2} - 1\text{.}\)”
---
For the base case, note that \(P(1)\) and \(P(2)\) are true, because \(1 = 2-1\) and \(1+1 = 3-1\text{.}\)

---
Now assume that \(P(k)\) is true for an arbitrary integer \(k \ge 2\text{.}\)

---
That is, assume \(1+1+2+3 + 5+F_k = F_{k+2} - 1\text{.}\)

---
Then adding \(F_{k+1}\) to both sides, we get \(1+1+2+3+5+\cdots + F_k + F_{k+1} = F_{k+1} + F_{k+2} - 1\text{.}\)

---
By the definition of Fibonacci numbers, \(F_{k+1} + F_{k+2} = F_{k+3}\text{,}\) so the right-hand side simplifies to \(F_{k+3} - 1\text{.}\)

---
Thus \(P(k+1)\) is true, and therefore by the principle of mathematical induction, \(P(n)\) is true for all \(n \ge 1\text{.}\)

---
For the base case, note that \(1+1+2 = 4 = F_{5}-1\text{.}\)
 #distractor
---
Then by the inductive hypothesis, \(1+1+2+3+\cdots+F_{k+1} = F_{k+2} - 1\text{.}\)
 #distractor
---
Subtracting \(F_{k+1}\) from both sides gives us \(P(k)\text{,}\) which we also assumed to be true. #distractor
```

[🔗](#ind-drag-sum)[🔗](#practice-sec-induction)

### Exercises Additional Exercises

#### 1.

On the way to the market, you exchange your cow for some magic dark chocolate espresso beans. These beans have the property that every night at midnight, each bean splits into two, effectively doubling your collection. You decide to take advantage of this, and each morning (around 8 am) you eat 5 beans.

1. Explain why it is true that *if* at noon on day \(n\) you have a number of beans ending in a 5, then at noon on day \(n+1\) you will still have a number of beans ending in a 5.[🔗](#exercises_seq-induction-2-1-1-1-1-1) [🔗](#exercises_seq-induction-2-1-1-1-1)
2. Why is the previous fact not enough to conclude that you will always have a number of beans ending in a 5? What additional fact would you need?[🔗](#exercises_seq-induction-2-1-1-1-2-1) [🔗](#exercises_seq-induction-2-1-1-1-2)
3. Assuming you have the additional fact in part (b), and have successfully proved the fact in part (a), how do you know that you will always have a number of beans ending in a 5? Illustrate what is going on by carefully explaining how the two facts above prove that you will have a number of beans ending in a 5 on *day 4* specifically. In other words, explain why induction works in this context.[🔗](#exercises_seq-induction-2-1-1-1-3-1) [🔗](#exercises_seq-induction-2-1-1-1-3)

[🔗](#exercises_seq-induction-2-1-1) [🔗](#exercises_seq-induction-2)

#### 2.

Use induction to prove for all \(n \in \N\) that \(\d\sum_{k=0}^n 2^k = 2^{n+1} - 1\text{.}\)[🔗](#exercises_seq-induction-3-1-1) [🔗](#exercises_seq-induction-3)

#### 3.

Prove that \(7^n - 1\) is a multiple of 6 for all \(n \in \N\text{.}\)[🔗](#exercises_seq-induction-4-1-1) [🔗](#exercises_seq-induction-4)

#### 4.

Prove that \(1 + 3 + 5 + \cdots + (2n-1) = n^2\) for all \(n \ge 1\text{.}\)[🔗](#exercises_seq-induction-5-1-1) [🔗](#exercises_seq-induction-5)

#### 5.

Prove that \(F_0 + F_2 + F_4 + \cdots + F_{2n} = F_{2n+1} - 1\) where \(F_n\) is the \(n\)th Fibonacci number.[🔗](#exercises_seq-induction-6-2-1) [🔗](#exercises_seq-induction-6)

#### 6.

Prove that \(2^n \lt n!\) for all \(n \ge 4\text{.}\) (Recall, \(n! = 1\cdot 2 \cdot 3 \cdot \cdots\cdot n\text{.}\))[🔗](#exercises_seq-induction-7-1-1) [🔗](#exercises_seq-induction-7)

#### 7.

Prove, by mathematical induction, that \(F_0 + F_1 + F_2 + \cdots + F_{n} = F_{n+2} - 1\text{,}\) where \(F_n\) is the \(n\)th Fibonacci number (\(F_0 = 0\text{,}\) \(F_1 = 1\) and \(F_n = F_{n-1} + F_{n-2}\)).[🔗](#exercises_seq-induction-8-2-1) [🔗](#exercises_seq-induction-8)

#### 8.

Zombie Euler and Zombie Cauchy, two famous zombie mathematicians, have just signed up for Myspace accounts. After one day, Zombie Cauchy has more followers than Zombie Euler. Each day after that, the number of new followers of Zombie Cauchy is exactly the same as the number of new followers of Zombie Euler (and neither lose any followers). Explain how a proof by mathematical induction can show that on every day after the first day, Zombie Cauchy will have more followers than Zombie Euler. That is, explain what the base case and inductive case are, and why they together prove that Zombie Cauchy will have more followers on the 4th day.[🔗](#exercises_seq-induction-9-2-1) [🔗](#exercises_seq-induction-9)

#### 9.

Find the largest number of points that it is impossible for a football team to get exactly, using just 3-point field goals and 7-point touchdowns (ignore the possibilities of safeties, missed extra points, and two-point conversions). Prove your answer is correct by mathematical induction.[🔗](#exercises_seq-induction-10-2-1) Hint. It is not possible to score exactly 11 points. Can you prove that you can score \(n\) points for any \(n \ge 12\text{?}\)[🔗](#exercises_seq-induction-10-3-1) [🔗](#exercises_seq-induction-10-3) [🔗](#exercises_seq-induction-10)

#### 10.

Prove that the sum of \(n\) squares can be found as follows \begin{equation*} 1^2 +2^2 +3^2+\cdots+n^2 = \frac{n(n+1)(2n+1)}{6}\text{.} \end{equation*} [🔗](#exercises_seq-induction-11-1-1) [🔗](#exercises_seq-induction-11)

#### 11.

Prove that the sum of the interior angles of a convex \(n\)-gon is \((n-2)\cdot 180^\circ\text{.}\) (A convex \(n\)-gon is a polygon with \(n\) sides for which each interior angle is less than \(180^\circ\text{.}\))[🔗](#exercises_seq-induction-12-2-1) Hint. Start with \((k+1)\)-gon, and divide it up into a \(k\)-gon and a triangle.[🔗](#exercises_seq-induction-12-3-1) [🔗](#exercises_seq-induction-12-3) [🔗](#exercises_seq-induction-12)

#### 12.

What is wrong with the following “proof” of the “fact” that \(n+3 = n+7\) for all values of \(n\) (besides of course that the thing it is claiming to prove is false)?[🔗](#exercises_seq-induction-13-1-1)

#### Proof.

Let \(P(n)\) be the statement that \(n + 3 = n + 7\text{.}\) We will prove that \(P(n)\) is true for all \(n \in \N\text{.}\) Assume, for induction, that \(P(k)\) is true. That is, \(k+3 = k+7\text{.}\) We must show that \(P(k+1)\) is true. Now since \(k + 3 = k + 7\text{,}\) add 1 to both sides. This gives \(k + 3 + 1 = k + 7 + 1\text{.}\) Regrouping \((k+1) + 3 = (k+1) + 7\text{.}\) But this is simply \(P(k+1)\text{.}\) Thus by the principle of mathematical induction \(P(n)\) is true for all \(n \in \N\text{.}\)[🔗](#exercises_seq-induction-13-1-2-1) [🔗](#exercises_seq-induction-13-1-2)[🔗](#exercises_seq-induction-13)

#### 13.

The proof in the previous problem does not work. But if we modify the “fact,” we can get a working proof. Prove that \(n + 3 \lt n + 7\) for all values of \(n \in \N\text{.}\) You can do this proof with algebra (without induction), but the goal of this exercise is to write out a valid induction proof.[🔗](#exercises_seq-induction-14-1-1) [🔗](#exercises_seq-induction-14)

#### 14.

Find the flaw in the following “proof” of the “fact” that \(n \lt 100\) for every \(n \in \N\text{.}\)[🔗](#exercises_seq-induction-15-1-1)

#### Proof.

Let \(P(n)\) be the statement \(n \lt 100\text{.}\) We will prove \(P(n)\) is true for all \(n \in \N\text{.}\) First we establish the base case: when \(n = 0\text{,}\) \(P(n)\) is true, because \(0 \lt 100\text{.}\) Now for the inductive step, assume \(P(k)\) is true. That is, \(k \lt 100\text{.}\) Now if \(k \lt 100\text{,}\) then \(k\) is some number, like 80. Of course \(80+1 = 81\) which is still less than 100. So \(k +1 \lt 100\) as well. But this is what \(P(k+1)\) claims, so we have shown that \(P(k) \imp P(k+1)\text{.}\) Thus by the principle of mathematical induction, \(P(n)\) is true for all \(n \in \N\text{.}\)[🔗](#exercises_seq-induction-15-1-2-1) [🔗](#exercises_seq-induction-15-1-2)[🔗](#exercises_seq-induction-15)

#### 15.

While the above proof does not work (it better not since the statement it is trying to prove is false!) we can prove something similar. Prove that there is a strictly increasing sequence \(a_1, a_2, a_3, \ldots\) of numbers (not necessarily integers) such that \(a_n \lt 100\) for all \(n \in \N\text{.}\) (By strictly increasing we mean \(a_n \lt a_{n+1}\) for all \(n\text{.}\) So each term must be larger than the last.)[🔗](#exc-seq-lessthan-100-1-1) Hint. For the inductive step, you can assume you have a strictly increasing sequence up to \(a_k\) where \(a_k \lt 100\text{.}\) Now you just need to find the next term \(a_{k+1}\) so that \(a_{k} \lt a_{k+1} \lt 100\text{.}\) What should \(a_{k+1}\) be?[🔗](#exc-seq-lessthan-100-2-1) [🔗](#exc-seq-lessthan-100-2) [🔗](#exc-seq-lessthan-100)

#### 16.

What is wrong with the following “proof” of the “fact” that for all \(n \in \N\text{,}\) the number \(n^2 + n\) is odd?[🔗](#exercises_seq-induction-17-1-1)

#### Proof.

Let \(P(n)\) be the statement “\(n^2 + n\) is odd.” We will prove that \(P(n)\) is true for all \(n \in \N\text{.}\) Suppose, for induction, that \(P(k)\) is true, that is, that \(k^2 + k\) is odd. Now consider the statement \(P(k+1)\text{.}\) Now \((k+1)^2 + (k+1) = k^2 + 2k + 1 + k + 1 = k^2 + k + 2k + 2\text{.}\) By the inductive hypothesis, \(k^2 + k\) is odd, and of course \(2k + 2\) is even. An odd plus an even is always odd, so therefore \((k+1)^2 + (k+1)\) is odd. Therefore by the principle of mathematical induction, \(P(n)\) is true for all \(n \in \N\text{.}\)[🔗](#exercises_seq-induction-17-1-2-1) [🔗](#exercises_seq-induction-17-1-2)[🔗](#exercises_seq-induction-17)

#### 17.

Now give a valid proof (by induction, even though you might be able to do so without using induction) of the statement, “For all \(n \in \N\text{,}\) the number \(n^2 + n\) is even.”[🔗](#exercises_seq-induction-18-1-1) Hint. For the inductive case, you will need to show that \((k+1)^2 + (k+1)\) is even. Factor this out, and locate the part of it that is \(k^2 + k\text{.}\) What have you assumed about that quantity?[🔗](#exercises_seq-induction-18-2-1) [🔗](#exercises_seq-induction-18-2) [🔗](#exercises_seq-induction-18)

#### 18.

Prove that there is a sequence of positive real numbers \(a_0, a_1, a_2, \ldots\) such that the partial sum \(a_0 + a_1 + a_2 + \cdots + a_n\) is strictly less than \(2\) for all \(n \in \N\text{.}\) Hint: Think about how you could define what \(a_{k+1}\) is to make the induction argument work.[🔗](#exercises_seq-induction-19-2-1) Hint. This is similar to [Exercise 15](sec_seq-induction.html#exc-seq-lessthan-100), although there you were showing that a sequence had all its terms less than some value, and here you are showing that the sum is less than some value. But the partial sums forms a sequence, so this is actually very similar.[🔗](#exercises_seq-induction-19-3-1) [🔗](#exercises_seq-induction-19-3) [🔗](#exercises_seq-induction-19)

#### 19.

Use induction to prove that if \(n\) people all shake hands with each other, that the total number of handshakes is \(\frac{n(n-1)}{2}\text{.}\)[🔗](#exercises_seq-induction-20-2-1) Hint. We have already proved this without using induction, but looking at it inductively sheds light onto the problem (and is fun).[🔗](#exercises_seq-induction-20-3-1) The question you need to answer to complete the inductive step is, how many new handshakes take place when a person \(k+1\) enters the room? Why does adding this give you the correct formula?[🔗](#exercises_seq-induction-20-3-2) [🔗](#exercises_seq-induction-20-3) [🔗](#exercises_seq-induction-20)

#### 20.

Use induction to prove that \(\d\sum_{k=0}^n {n \choose k} = 2^n\text{.}\) That is, the sum of the \(n\)th row of Pascal’s triangle is \(2^n\text{.}\)[🔗](#exercises_seq-induction-21-2-1) Hint. Here’s the idea: Since every entry in Pascal’s triangle is the sum of the two entries above it, we can get the \(k+1\)st row by adding up all the pairs of entry from the \(k\)th row. But doing this uses each entry on the \(k\)th row twice. Thus each time we drop to the next row, we double the total. Of course, row 0 has sum \(1 = 2^0\) (the base case). Now try to make this precise with a formal induction proof. You will use the fact that \({n \choose k} = {n-1 \choose k-1} + {n-1 \choose k}\) for the inductive case.[🔗](#exercises_seq-induction-21-3-1) [🔗](#exercises_seq-induction-21-3) [🔗](#exercises_seq-induction-21)

#### 21.

Use induction to prove \({4 \choose 0} + {5 \choose 1} + {6 \choose 2} + \cdots + {4+n \choose n} = {5+n \choose n}\text{.}\) (This is an example of the hockey stick theorem.)[🔗](#exercises_seq-induction-22-2-1) Hint. To see why this works, try it on a copy of Pascal’s triangle. We are adding up the entries along a diagonal, starting with the 1 on the left-hand side of the 4th row. Suppose we add up the first 5 entries on this diagonal. The claim is that the sum is the entry below and to the left of the last of these 5 entries. Note that if this is true, and we instead add up the first 6 entries, we will need to add the entry one spot to the right of the previous sum. But these two together give the entry below them, which is below and left of the last of the 6 entries on the diagonal. If you follow that, you can see what is going on. But it is not a great proof. A formal induction proof is needed.[🔗](#exercises_seq-induction-22-3-1) [🔗](#exercises_seq-induction-22-3) [🔗](#exercises_seq-induction-22)

#### 22.

Use the product rule for logarithms (\(\log(ab) = \log(a) + \log(b)\)) to prove, by induction on \(n\text{,}\) that \(\log(a^n) = n \log(a)\text{,}\) for all natural numbers \(n \ge 2\text{.}\)[🔗](#exercises_seq-induction-23-1-1) [🔗](#exercises_seq-induction-23)

#### 23.

Let \(f_1, f_2,\ldots, f_n\) be differentiable functions. Prove, using induction, that \begin{equation*} (f_1 + f_2 + \cdots + f_n)' = f_1' + f_2' + \cdots + f_n'\text{.} \end{equation*} [🔗](#exercises_seq-induction-24-2-1) You may assume \((f+g)' = f' + g'\) for any differentiable functions \(f\) and \(g\text{.}\)[🔗](#exercises_seq-induction-24-2-2) Hint. You are allowed to assume the base case. For the inductive case, group all but the last function together as one sum of functions, and then apply the usual sum of derivatives rule, and then the inductive hypothesis.[🔗](#exercises_seq-induction-24-3-1) [🔗](#exercises_seq-induction-24-3) [🔗](#exercises_seq-induction-24)

#### 24.

Suppose \(f_1, f_2, \ldots, f_n\) are differentiable functions. Use mathematical induction to prove the generalized product rule: \begin{equation*} (f_1 f_2 f_3 \cdots f_n)' = f_1' f_2 f_3 \cdots f_n + f_1 f_2' f_3 \cdots f_n + f_1 f_2 f_3' \cdots f_n + \cdots + f_1 f_2 f_3 \cdots f_n'\text{.} \end{equation*} [🔗](#exercises_seq-induction-25-2-1) You may assume the product rule for two functions is true.[🔗](#exercises_seq-induction-25-2-2) Hint. For the inductive step, we know by the product rule for two functions that \begin{equation*} (f_1f_2f_3 \cdots f_k f_{k+1})' = (f_1f_2f_3\cdots f_k)'f_{k+1} + (f_1f_2f_3\cdots f_k)f_{k+1}'\text{.} \end{equation*} [🔗](#exercises_seq-induction-25-3-1) Then use the inductive hypothesis on the first summand, and distribute.[🔗](#exercises_seq-induction-25-3-2) [🔗](#exercises_seq-induction-25-3) [🔗](#exercises_seq-induction-25)

#### 25.

In [Exercises](sec_logic-rules.html#exercises-logic-rules) we proved that the following is a valid deduction rule:[🔗](#exercises_seq-induction-26-1-1)

|  | \(P \imp Q\) |
| --- | --- |
|  | \(Q \imp R\) |
| \(\therefore\) | \(P \imp R\) |

Now use mathematical induction to prove you can chain together any number of statements like this. That is, prove for any \(n\) that the following is a valid deduction rule:[🔗](#exercises_seq-induction-26-1-3)

|  | \(P_1 \imp P_2\) |
| --- | --- |
|  | \(P_2 \imp P_3\) |
|  | \(\vdots\) |
|  | \(P_{n-1} \imp P_n\) |
| \(\therefore\) | \(P_1 \imp P_n\text{.}\) |

Hint. You can inductively assume that from the first \(n-2\) implications you can deduce \(P_1 \imp P_{n-1}\text{.}\) Then you can use a truth table to verify that this simplified deduction rule is valid.[🔗](#exercises_seq-induction-26-2-1) [🔗](#exercises_seq-induction-26-2) [🔗](#exercises_seq-induction-26)[🔗](#exercises_seq-induction)[🔗](#sec_seq-induction) [&#xe5cb;Prev](sec_seq-exponential.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_seq-strong-induction.html) [Feedback](/cdn-cgi/l/email-protection#8de2feeeecffa3e1e8fbe4e3cdf8e3eee2a3e8e9f8)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_seq-induction-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_seq-induction-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
