---
title: "Sequences"
lang: en
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 4.1 Describing Sequences

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_seq_intro-2-1-1)

1. Use proper notation to represent a sequence.[🔗](#sec_seq_intro-2-2-1-1) [🔗](#sec_seq_intro-2-2-1)
2. Explain the difference between a closed formula and a recursive definition for a sequence.[🔗](#sec_seq_intro-2-2-2-1) [🔗](#sec_seq_intro-2-2-2)
3. Find a recursive definition for a sequence based on its description.[🔗](#sec_seq_intro-2-2-3-1) [🔗](#sec_seq_intro-2-2-3)

[🔗](#sec_seq_intro-2)

### Subsection Section Preview

#### Investigate!

There is a monastery in Hanoi, as the legend goes, with a great hall containing three tall pillars. Resting on the first pillar were 64 giant disks (or washers), all different sizes, stacked from largest to smallest. The monks of the monastery have been moving the disks for generations, attempting to move the entire stack of disks to the third pillar. However, due to the size of the disks, the monks cannot move more than one at a time. Each disk must be placed on one of the pillars before the next disk is moved. And because the disks are so heavy and fragile, the monks may never place a larger disk on top of a smaller disk. When the monks finally complete their task, the world shall come to an end.[🔗](#subsec-preview-2-4) Your task: Figure out how long it will be before we need to start worrying about the end of the world.[🔗](#subsec-preview-2-5) [🔗](#subsec-preview-2)This puzzle is called the *Tower of Hanoi*. You are tasked with finding the minimum number of moves to complete the puzzle. This certainly sounds like a counting problem. Perhaps you have an answer? If not, what else could we try?[🔗](#subsec-preview-3) The answer to the puzzle depends on the number of disks you need to move. In fact, we could answer the puzzle first for 1 disk, then 2, then 3, and so on. If we list all of the answers for each number of disks, we will get a sequence of numbers. The \(n\)th term in the sequence is the answer to the question, “What is the smallest number of moves required to complete the Tower of Hanoi puzzle with \(n\) disks?”[🔗](#subsec-preview-4) Give it a try. Find the smallest number of moves needed to transport the stack of \(n\) disks to another pillar, for different values of \(n\text{.}\)[🔗](#subsec-preview-5) Figure 4.1.1. The Towers of Hanoi puzzle.[🔗](#interactive-hanoi)You might wonder why we would create such a sequence instead of just answering the question. By looking at how the sequence of numbers grows, we gain insight into the problem. It is easy to count the number of moves required for a small number of disks. We can then look for a pattern among the first few terms of the sequence. Hopefully this will suggest a method for finding the \(n\)th term of the sequence, which is the answer to our question. Of course we will also need to verify that our suspected pattern is correct, and that this correct pattern really does give us the \(n\)th term that we think it does, but it is impossible to prove that your formula is correct without having a formula to start with.[🔗](#subsec-preview-7) In this section, we will explore how to represent sequences of numbers in various ways, and two sorts of formulas that can be used to describe the sequence. We will see that sequences are also interesting mathematical objects to study in their own right.[🔗](#subsec-preview-8)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-seq-basic)

Let’s get a feel for the sequence from the Towers of Hanoi puzzle. Use [Figure 4.1.1](sec_seq_intro.html#interactive-hanoi) to answer the following questions.[🔗](#PA-seq-basic-2-1)

#### 1. Towers of Hanoi data.

Activate

#### (a)

What is the smallest number of moves required to transport 2 disks to another pillar?[🔗](#extracted-webwork-179-1-1-1-1) [🔗](#extracted-webwork-179-1-1)

#### (b)

What is the smallest number of moves required to transport 3 disks to another pillar?[🔗](#extracted-webwork-179-1-2-1-1) [🔗](#extracted-webwork-179-1-2)

#### (c)

What is the smallest number of moves required to transport 4 disks to another pillar?[🔗](#extracted-webwork-179-1-3-1-1) [🔗](#extracted-webwork-179-1-3)

#### (d)

To find the smallest number of moves required to transport 5 disks to another pillar, let’s try to relate this task to the task of moving 4 disks. How many moves do each of the following tasks require?

1. Move the 4 smallest disks to the second pillar: moves.[🔗](#extracted-webwork-179-1-4-1-1-2-1-1) [🔗](#extracted-webwork-179-1-4-1-1-2-1)
2. Move the largest disk to the third pillar: moves.[🔗](#extracted-webwork-179-1-4-1-1-2-2-1) [🔗](#extracted-webwork-179-1-4-1-1-2-2)
3. Move the 4 smallest disks to the third pillar (on top of the largest disk): moves.[🔗](#extracted-webwork-179-1-4-1-1-2-3-1) [🔗](#extracted-webwork-179-1-4-1-1-2-3)

[🔗](#extracted-webwork-179-1-4-1-1) Therefore, the smallest number of moves required to move five disks is: [🔗](#extracted-webwork-179-1-4-1-2) [🔗](#extracted-webwork-179-1-4)

#### (e)

Generalize the last observation. Let \(a_n\) represent the smallest number of moves required to transport \(n\) disks from the start pillar to another pillar. Then \(a_{n-1}\) represents the number of moves required to transport \(n-1\) disks to another pillar.[🔗](#extracted-webwork-179-1-5-1-1) Give a formula for \(a_{n}\) in terms of \(a_{n-1}\text{.}\)[🔗](#extracted-webwork-179-1-5-1-2) \(a_n =\).[🔗](#extracted-webwork-179-1-5-1-3) [🔗](#extracted-webwork-179-1-5) [🔗](#pa-seq-basics)[🔗](#PA-seq-basic)[🔗](#subsec-preview)

### Subsection Sequences and Formulas

A sequence is simply an ordered list of numbers. Unlike a *set* of numbers, the order of the numbers in a sequence is an essential characteristic of the sequence. For this reason, when we use variables to represent terms in a sequence they will look like this: \begin{equation*} a_0, a_1, a_2, a_3, \ldots\text{.} \end{equation*} To refer to the *entire* sequence at once, we will write \((a_n)_{n\in\N}\) or \((a_n)_{n\ge 0}\text{,}\) or sometimes if we are being sloppy, just \((a_n)\) (in which case we assume we start the sequence with \(a_0\)). [🔗](#subsec-formulas-for-sequences-2) We might replace the \(a\) with another letter, and sometimes we omit \(a_0\text{,}\) starting with \(a_1\text{,}\) in which case we would use \((a_n)_{n \ge 1}\) to refer to the sequence as a whole. The numbers in the subscripts are called indices (the plural of index).[🔗](#subsec-formulas-for-sequences-3) While we often just think of a sequence as an ordered list of numbers, it is really a type of function. Specifically, the sequence \((a_n)_{n\ge 0}\) is a function with domain \(\N\) where \(a_n\) is the image of the natural number \(n\text{.}\) Later we will manipulate sequences in much the same way you have manipulated functions in algebra or calculus. We can shift a sequence up or down, add two sequences, or ask for the rate of change of a sequence. These are done exactly as you would for functions.[🔗](#subsec-formulas-for-sequences-4) That said, while keeping the rigorous mathematical definition in mind is helpful, we often describe sequences by writing out the first few terms.[🔗](#subsec-formulas-for-sequences-5)

#### Example 4.1.2.

Can you find the next term in the following sequences?[🔗](#subsec-formulas-for-sequences-6-1-1)

1. \(\displaystyle 7,7,7,7,7, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-1)
2. \(\displaystyle 3, -3, 3, -3, 3, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-2)
3. \(\displaystyle 1, 5, 2, 10, 3, 15, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-3)
4. \(\displaystyle 1, 2, 4, 8, 16, 32, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-4)
5. \(\displaystyle 1, 4, 9, 16, 25, 36, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-5)
6. \(\displaystyle 1, 2, 3, 5, 8, 13, 21, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-6)
7. \(\displaystyle 1, 3, 6, 10, 15, 21, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-7)
8. \(\displaystyle 2, 3, 5, 7, 11, 13, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-8)
9. \(\displaystyle 3, 2, 1, 0, -1, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-9)
10. \(\displaystyle 1, 1, 2, 6, \ldots\) [🔗](#subsec-formulas-for-sequences-6-1-2-1-10)

[🔗](#subsec-formulas-for-sequences-6-1-2) Solution. No, you cannot.[🔗](#subsec-formulas-for-sequences-6-2-1) You might guess that the next terms are:

1. \(\displaystyle 7\) [🔗](#subsec-formulas-for-sequences-6-2-2-1-1)
2. \(\displaystyle -3\) [🔗](#subsec-formulas-for-sequences-6-2-2-1-2)
3. \(\displaystyle 4\) [🔗](#subsec-formulas-for-sequences-6-2-2-1-3)
4. 64[🔗](#subsec-formulas-for-sequences-6-2-2-1-4-1) [🔗](#subsec-formulas-for-sequences-6-2-2-1-4)
5. 49[🔗](#subsec-formulas-for-sequences-6-2-2-1-5-1) [🔗](#subsec-formulas-for-sequences-6-2-2-1-5)
6. 34[🔗](#subsec-formulas-for-sequences-6-2-2-1-6-1) [🔗](#subsec-formulas-for-sequences-6-2-2-1-6)
7. 28[🔗](#subsec-formulas-for-sequences-6-2-2-1-7-1) [🔗](#subsec-formulas-for-sequences-6-2-2-1-7)
8. 17[🔗](#subsec-formulas-for-sequences-6-2-2-1-8-1) [🔗](#subsec-formulas-for-sequences-6-2-2-1-8)
9. \(\displaystyle -2\) [🔗](#subsec-formulas-for-sequences-6-2-2-1-9)
10. \(\displaystyle 24\) [🔗](#subsec-formulas-for-sequences-6-2-2-1-10)

[🔗](#subsec-formulas-for-sequences-6-2-2) In fact, those are the next terms of the sequences I had in mind when I made up the example, but there is no way to be sure they are correct.[🔗](#subsec-formulas-for-sequences-6-2-3) Still, we will often do this. Given the first few terms of a sequence, we can ask what the pattern in the sequence suggests the next terms are.[🔗](#subsec-formulas-for-sequences-6-2-4) [🔗](#subsec-formulas-for-sequences-6-2) [🔗](#subsec-formulas-for-sequences-6)Given that no number of initial terms in a sequence is enough to say for certain which sequence we are dealing with, we need to find another way to specify a sequence. We consider two main ways to do this:[🔗](#subsec-formulas-for-sequences-7)

#### Definition 4.1.3. Closed formula.

A closed formula for a sequence \((a_n)_{n\in\N}\) is a formula for \(a_n\) using a fixed finite number of operations on \(n\text{.}\) This is what you normally think of as a formula in \(n\text{,}\) just as if you were defining a function in terms of \(n\) (because that is exactly what you are doing).[🔗](#subsec-formulas-for-sequences-8-2-1) [🔗](#subsec-formulas-for-sequences-8)

#### Definition 4.1.4. Recursive definition.

A recursive definition (sometimes called an inductive definition) for a sequence \((a_n)_{n\in\N}\) consists of a recurrence relation : an equation relating a term of the sequence to previous terms (terms with smaller index), and an initial condition: a list of a few terms of the sequence (one less than the number of terms in the recurrence relation).[🔗](#subsec-formulas-for-sequences-9-2-1) [🔗](#subsec-formulas-for-sequences-9)It is easier to understand what is going on here with an example:[🔗](#subsec-formulas-for-sequences-10)

#### Example 4.1.5.

Here are a few closed formulas for sequences:

- \(a_n = n^2\text{.}\) [🔗](#subsec-formulas-for-sequences-11-1-1-2-1)
- \(\d a_n = \frac{n(n+1)}{2}\text{.}\) [🔗](#subsec-formulas-for-sequences-11-1-1-2-2)
- \(\d a_n = \frac{\left(\frac{1 + \sqrt 5}{2}\right)^n - \left(\frac{1 - \sqrt 5}{2}\right)^{-n}}{\sqrt{5}}\text{.}\) [🔗](#subsec-formulas-for-sequences-11-1-1-2-3)

[🔗](#subsec-formulas-for-sequences-11-1-1) Note in each formula, if you are given \(n\text{,}\) you can calculate \(a_n\) directly: Just plug in \(n\text{.}\) For example, to find \(a_3\) in the second sequence, just compute \(a_3 = \frac{3(3+1)}{2} = 6\text{.}\)[🔗](#subsec-formulas-for-sequences-11-1-2) Here are a few recursive definitions for sequences:

- \(a_n = 2a_{n-1}\) with \(a_0 = 1\text{.}\) [🔗](#subsec-formulas-for-sequences-11-1-3-2-1)
- \(a_n = 2a_{n-1}\) with \(a_0 = 27\text{.}\) [🔗](#subsec-formulas-for-sequences-11-1-3-2-2)
- \(a_n = a_{n-1} + a_{n-2}\) with \(a_0 = 0\) and \(a_1 = 1\text{.}\) [🔗](#subsec-formulas-for-sequences-11-1-3-2-3)

[🔗](#subsec-formulas-for-sequences-11-1-3) In these formulas, if you are given \(n\text{,}\) you cannot calculate \(a_n\) directly; you first need to find \(a_{n-1}\) (or \(a_{n-1}\) and \(a_{n-2}\)). In the second sequence, to find \(a_3\) you would take \(2a_2\text{,}\) but to find \(a_2 = 2a_1\) we would need to know \(a_1 = 2a_0\text{.}\) We do know this, so we could trace back through these equations to find \(a_1 = 54\text{,}\) \(a_2 = 108\) and finally \(a_3 = 216\text{.}\) [🔗](#subsec-formulas-for-sequences-11-1-4) [🔗](#subsec-formulas-for-sequences-11)You might wonder why we would bother with recursive definitions for sequences. After all, it is harder to find \(a_n\) with a recursive definition than with a closed formula. This is true, but it is also harder to find a closed formula for a sequence than it is to find a recursive definition. So to find a useful closed formula, we might first find the recursive definition, and then use that to find the closed formula.[🔗](#subsec-formulas-for-sequences-12)

#### Example 4.1.6.

For defeating the evil dragon, the king promises you a reward of one grain of rice on the first day, and then twice as many grains the next day as the previous day, for the rest of the month.[🔗](#eg-rice-1-1) Not to be swindled, you barter and get him to agree to add one additional grain of rice each day as well.[🔗](#eg-rice-1-2) How many grains of rice will you receive on the 30th day?[🔗](#eg-rice-1-3) Solution. We can write down the first few terms of the sequence \((a_n)_{n \ge 1}\) that gives the number of grains of rice you receive on day \(n\text{.}\) We get \begin{equation*} 1, 3, 7, 15, \ldots\text{,} \end{equation*} since, for example, on day 4, you take the number of grains of rice you had on day 3 (all seven of them), double that and add 1, to get 15. The next day you would get \(2 \cdot 15 + 1 = 31\text{.}\) [🔗](#eg-rice-2-1) By actually computing these values, we see right away what the recurrence relation is: \begin{equation*} a_n = 2a_{n-1} + 1\text{.} \end{equation*} This is justified because the problem the sequence is modeling says that we double the number of grains each day, and then add 1. We can read the recurrence relation right off the problem. [🔗](#eg-rice-2-2) The original question asked about \(a_{30}\text{.}\) We could find this using the recurrence relation, but we would first need to find \(a_{29}\text{,}\) and to find that we would need \(a_{28}\text{,}\) which requires \(a_{27}\) first, and so on. While I’m sure we could work all the way back to \(a_4\text{,}\) which we already found, this sounds like a lot of work.[🔗](#eg-rice-2-3) It would be so much nicer to have a closed formula. If we could *solve the recurrence relation* and find that closed formula, we could just substitute \(30\) for \(n\text{.}\)[🔗](#eg-rice-2-4) Let’s guess. It looks like the sequence is close to \(2, 4, 8, 16,\ldots\) which has closed formula \(2^n\text{.}\) That sequence has terms one greater than the terms in our sequence, so we might guess that \begin{equation*} a_n = 2^n - 1\text{.} \end{equation*} To be clear, we have no good reason to believe this guess is correct, but maybe later in this chapter we will. However, if it *is* correct, then we are golden (and incredibly sick of rice): \begin{equation*} a_{30} = 2^{30} - 1 = 1,073,741,823\text{.} \end{equation*} [🔗](#eg-rice-2-5) [🔗](#eg-rice-2) [🔗](#eg-rice)This is not to say that recursive definitions aren’t useful in finding \(a_n\text{.}\) You can always calculate \(a_n\) given a recursive definition; it might just take a while.[🔗](#subsec-formulas-for-sequences-14)

#### Example 4.1.7.

Find \(a_6\) in the sequence defined by \(a_n = 2a_{n-1} - a_{n-2}\) with \(a_0 = 3\) and \(a_1 = 4\text{.}\)[🔗](#subsec-formulas-for-sequences-15-1-1) Solution. We know that \(a_6 = 2a_5 - a_4\text{.}\) So to find \(a_6\) we need to find \(a_5\) and \(a_4\text{.}\) Well \begin{equation*} a_5 = 2a_4 - a_3 \qquad \text{and} \qquad a_4 = 2a_3 - a_2\text{,} \end{equation*} so if we can only find \(a_3\) and \(a_2\text{,}\) we would be set. Of course \begin{equation*} a_3 = 2a_2 - a_1 \qquad \text{and} \qquad a_2 = 2a_1 - a_0\text{,} \end{equation*} so we only need to find \(a_1\) and \(a_0\text{.}\) But we are given these. Thus \begin{align*} a_0 \amp = 3\\ a_1 \amp = 4\\ a_2 \amp = 2\cdot 4 - 3 = 5\\ a_3 \amp = 2\cdot 5 - 4 = 6\\ a_4 \amp = 2\cdot 6 - 5 = 7\\ a_5 \amp = 2\cdot 7 - 6 = 8\\ a_6 \amp = 2\cdot 8 - 7 = 9\text{.} \end{align*} [🔗](#subsec-formulas-for-sequences-15-2-1) Note that now we can guess a closed formula for the \(n\)th term of the sequence: \(a_n = n+3\text{.}\) To be sure this will always work, we could plug in this formula into the recurrence relation: \begin{align*} 2a_{n-1} - a_{n-2} \amp = 2((n-1) + 3) - ((n-2) + 3)\\ \amp = 2n + 4 - n - 1\\ \amp = n + 3\\ \amp = a_n\text{.} \end{align*} [🔗](#subsec-formulas-for-sequences-15-2-2) That is not quite enough though, since there can be multiple closed formulas that satisfy the same recurrence relation; we must also check that our closed formula agrees on the initial terms of the sequence. Since \(a_0 = 0 + 3 = 3\) and \(a_1 = 1+3 = 4\) are the correct initial conditions, we can now conclude that we have the correct closed formula.[🔗](#subsec-formulas-for-sequences-15-2-3) [🔗](#subsec-formulas-for-sequences-15-2) [🔗](#subsec-formulas-for-sequences-15)Finding closed formulas, or even recursive definitions, for sequences is not trivial. There is no one method for doing this. Just as in evaluating integrals or solving differential equations, it is useful to have a bag of tricks you can apply, but sometimes there is no easy answer.[🔗](#subsec-formulas-for-sequences-16) One useful method is to relate a given sequence to another sequence for which we already know the closed formula. To do this, we need a few “known sequences” to compare mystery sequences to. Here are a few that are good to know. We will verify the formulas for these in the coming sections.[🔗](#subsec-formulas-for-sequences-17)

#### Common Sequences.

\(1, 4, 9, 16, 25, \ldots\)[🔗](#assemblage-commonsequences-6-1-1) The square numbers. The sequence \((s_n)_{n \ge 1}\) has closed formula \(s_n = n^2\)[🔗](#assemblage-commonsequences-6-1-1-2) \(1, 3, 6, 10, 15, 21, \ldots\)[🔗](#assemblage-commonsequences-6-1-2) The triangular numbers. The sequence \((T_n)_{n \ge 1}\) has closed formula \(T_n = \frac{n(n+1)}{2}\text{.}\) [🔗](#assemblage-commonsequences-6-1-2-2) \(1, 2, 4, 8, 16, 32,\ldots\)[🔗](#assemblage-commonsequences-6-1-3) The powers of 2. The sequence \((a_n)_{n \ge 0}\) with closed formula \(a_n = 2^n\text{.}\)[🔗](#assemblage-commonsequences-6-1-3-2) \(1, 1, 2, 3, 5, 8, 13, \ldots\)[🔗](#assemblage-commonsequences-6-1-4) The Fibonacci numbers (or Fibonacci sequence), defined recursively by \(F_n = F_{n-1} + F_{n-2}\) with \(F_1 = F_2 = 1\text{.}\)[🔗](#assemblage-commonsequences-6-1-4-2) [🔗](#assemblage-commonsequences-6) [🔗](#assemblage-commonsequences)

#### Example 4.1.8.

Use the formulas \(T_n = \frac{n(n+1)}{2}\) and \(a_n = 2^n\) to find closed formulas that agree with the following sequences. Assume each first term corresponds to \(n=0\text{.}\)

1. \((b_n)\text{:}\) \(1, 2, 4, 7, 11, 16, 22, \ldots \text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-1-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-1)
2. \((c_n)\text{:}\) \(3, 5, 9, 17, 33,\ldots \text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-2-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-2)
3. \((d_n)\text{:}\) \(0, 2, 6, 12, 20, 30, 42,\ldots \text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-3-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-3)
4. \((e_n)\text{:}\) \(3, 6, 10, 15, 21, 28, \ldots\text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-4-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-4)
5. \((f_n)\text{:}\) \(0, 1, 3, 7, 15, 31, \ldots \text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-5-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-5)
6. \((g_n)\) \(3, 6, 12, 24, 48, \ldots \text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-6-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-6)
7. \((h_n)\text{:}\) \(6, 10, 18, 34, 66, \ldots \text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-7-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-7)
8. \((j_n)\text{:}\) \(15, 33, 57, 87, 123, \ldots\text{.}\)[🔗](#subsec-formulas-for-sequences-19-1-1-4-8-1) [🔗](#subsec-formulas-for-sequences-19-1-1-4-8)

[🔗](#subsec-formulas-for-sequences-19-1-1) Solution. We wish to compare these sequences to the triangular numbers \((0, 1, 3, 6, 10, 15, 21,\ldots)\text{,}\) when we start with \(n=0\text{,}\) and the powers of 2: \((1, 2, 4, 8, 16, \ldots)\text{.}\)

1. \((1, 2, 4, 7, 11, 16, 22, \ldots)\text{.}\) Note that if we subtract 1 from each term, we get the sequence \((T_n)\text{.}\) So we have \(b_n = T_n + 1\text{.}\) Therefore a closed formula is \(b_n = \frac{n(n+1)}{2} + 1\text{.}\) A quick check of the first few \(n\) confirms we have it right.[🔗](#subsec-formulas-for-sequences-19-2-1-6-1-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-1)
2. \((3, 5, 9, 17, 33, \ldots )\text{.}\) Each term in this sequence is one more than a power of 2, so we might guess the closed formula is \(c_n = a_n+1 = 2^n + 1\text{.}\) If we try this though, we get \(c_0 = 2^0 + 1 = 2\) and \(c_1 = 2^1 + 1 = 3\text{.}\) We are off because the indices are shifted. What we really want is \(c_n = a_{n+1}+1\) giving \(c_n = 2^{n+1} + 1\text{.}\)[🔗](#subsec-formulas-for-sequences-19-2-1-6-2-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-2)
3. (\(0, 2, 6, 12, 20, 30, 42,\ldots \)). Notice that all these terms are even. What happens if we factor out a 2? We get \((T_n)\text{!}\) More precisely, we find that \(d_n/2 = T_n\text{,}\) so this sequence has closed formula \(d_n = n(n+1)\text{.}\)[🔗](#subsec-formulas-for-sequences-19-2-1-6-3-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-3)
4. \((3, 6, 10, 15, 21, 28, \ldots)\text{.}\) These are all triangular numbers. However, we are starting with 3 as our initial term instead of as our third term. So if we could plug in 2 instead of 0 into the formula for \(T_n\text{,}\) we would be set. Therefore the closed formula is \(e_n = \frac{(n+2)(n+3)}{2}\) (where \(n+3\) came from \((n+2)+1\)). Thinking about sequences as functions, we are doing a horizontal shift by 2: \(e_n = T_{n+2}\) which would cause the graph to shift 2 units to the left.[🔗](#subsec-formulas-for-sequences-19-2-1-6-4-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-4)
5. \((0, 1, 3, 7, 15, 31, \ldots )\text{.}\) Try adding 1 to each term, and we get powers of 2. You might guess this because each term is a little more than twice the previous term (the powers of 2 are *exactly* twice the previous term). Closed formula: \(f_n = 2^{n} - 1\text{.}\)[🔗](#subsec-formulas-for-sequences-19-2-1-6-5-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-5)
6. \((3, 6, 12, 24, 48, \ldots )\text{.}\) These numbers are also doubling each time, but are also all multiples of 3. Dividing each by 3 gives 1, 2, 4, 8, …. Aha. We get the closed formula \(g_n = 3\cdot 2^{n}\text{.}\)[🔗](#subsec-formulas-for-sequences-19-2-1-6-6-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-6)
7. \((6, 10, 18, 34, 66, \ldots )\text{.}\) To get from one term to the next, we almost double each term. So maybe we can relate this back to \(2^n\text{.}\) Yes, each term is 2 more than a power of 2. So we get \(h_n = 2^{n+2} + 2\) (the \(n+2\) is because the first term is 2 more than \(2^2\text{,}\) not \(2^0\)). Alternatively, we could have related this sequence to the second sequence in this example: Starting with 3, 5, 9, 17, … we see that this sequence is twice the terms from that sequence. That sequence had closed formula \(c_n = 2^{n+1} + 1\text{.}\) Our sequence here would be twice this, so \(h_n = 2(2^n + 1)\text{,}\) which is the same as what we got before.[🔗](#subsec-formulas-for-sequences-19-2-1-6-7-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-7)
8. \((15, 33, 57, 87, 123, \ldots)\text{.}\) Try dividing each term by 3. That gives the sequence \(5, 11, 19, 29, 41,\ldots\text{.}\) Now add 1 to each term: \(6, 12, 20, 30, 42, \ldots\text{,}\) which is \((d_n)\) in this example, except starting with 6 instead of 0. So let’s start with the formula \(d_n= n(n+1)\text{.}\) To start with the 6, we shift: \((n+2)(n+3)\text{.}\) But this is one too many, so subtract 1: \((n+2)(n+3) - 1\text{.}\) That gives us our sequence, but divided by 3. So we want \(j_n = 3((n+2)(n+3) - 1)\text{.}\)[🔗](#subsec-formulas-for-sequences-19-2-1-6-8-1) [🔗](#subsec-formulas-for-sequences-19-2-1-6-8)

[🔗](#subsec-formulas-for-sequences-19-2-1) [🔗](#subsec-formulas-for-sequences-19-2) [🔗](#subsec-formulas-for-sequences-19)[🔗](#subsec-formulas-for-sequences)

### Subsection Partial Sums and Differences

Some sequences naturally arise as the sum of terms of another sequence.[🔗](#subsec-partial-sums-2)

#### Example 4.1.9.

Sam keeps track of how many push-ups she does each day of her “do lots of push-ups challenge.” Let \((a_n)_{n \ge 1}\) be the sequence that describes the number of push-ups done on the \(n\)th day of the challenge. The sequence starts \begin{equation*} 3, 5, 6, 10, 9, 0, 12, \ldots\text{.} \end{equation*} Describe a sequence \((b_n)_{n \ge 1}\) that gives the *total number* of push-ups done by Sam after the \(n\)th day. [🔗](#ex-first-partial-sums-1-1) Solution. We can find the terms of this sequence easily enough. \begin{equation*} 3, 8, 14, 24, 33, 33, 45,\ldots\text{.} \end{equation*} Here \(b_1\) is just \(a_1\text{,}\) but then \begin{equation*} b_2 = 3+5 = a_1 + a_2\text{,} \end{equation*} \begin{equation*} b_3 = 3+5+6 = a_1 + a_2 + a_3\text{,} \end{equation*} and so on. [🔗](#ex-first-partial-sums-2-1) There are a few ways we might describe \(b_n\) in general. We could do so recursively as, \begin{equation*} b_n = b_{n-1} + a_n\text{,} \end{equation*} since the total number of push-ups done after \(n\) days will be the number done after \(n-1\) days, plus the number done on day \(n\text{.}\) [🔗](#ex-first-partial-sums-2-2) For something closer to a closed formula, we could write \begin{equation*} b_n = a_1 + a_2 + a_3 + \cdots + a_n\text{,} \end{equation*} or the same thing using *summation notation*: \begin{equation*} b_n = \sum_{i=1}^n a_i\text{.} \end{equation*} However, note that these are not really closed formulas since even if we had a formula for \(a_n\text{,}\) we would still have an increasing number of computations to do as \(n\) increases. [🔗](#ex-first-partial-sums-2-3) [🔗](#ex-first-partial-sums-2) [🔗](#ex-first-partial-sums) Given any sequence \((a_n)_{n \in \N}\text{,}\) we can always form a new sequence \((b_n)_{n \in \N}\) by \begin{equation*} b_n = a_0 + a_1 + a_2 + \cdots + a_n\text{.} \end{equation*} Since the terms of \((b_n)\) are the sums of the initial part of the sequence \((a_n)\text{,}\) we call \((b_n)\) the sequence of partial sums of \((a_n)\). Soon we will see that it is sometimes possible to find a closed formula for \((b_n)\) from the closed formula for \((a_n)\text{.}\) [🔗](#subsec-partial-sums-4) To simplify writing out these sums, we will often use notation like \(\d\sum_{k=1}^n a_k\text{.}\) This means add up the \(a_k\)’s where \(k\) changes from 1 to \(n\text{.}\) [🔗](#subsec-partial-sums-5)

#### Example 4.1.10.

Use \(\sum\) notation to rewrite the sums:[🔗](#subsec-partial-sums-6-1-1)

1. \(\displaystyle 1 + 2 + 3 + 4 + \cdots + 100\) [🔗](#subsec-partial-sums-6-1-2-1-1)
2. \(\displaystyle 1 + 2 + 4 + 8 + \cdots + 2^{50}\) [🔗](#subsec-partial-sums-6-1-2-1-2)
3. \(6 + 10 + 14 + \cdots + (4n - 2)\text{.}\) [🔗](#subsec-partial-sums-6-1-2-1-3)

[🔗](#subsec-partial-sums-6-1-2) Solution.

1. \(\displaystyle \d\sum_{k=1}^{100} k\) [🔗](#subsec-partial-sums-6-2-1-1-1)
2. \(\displaystyle \d\sum_{k=0}^{50} 2^k\) [🔗](#subsec-partial-sums-6-2-1-1-2)
3. \(\displaystyle \d\sum_{k=2}^{n} (4k -2)\) [🔗](#subsec-partial-sums-6-2-1-1-3)

[🔗](#subsec-partial-sums-6-2-1) [🔗](#subsec-partial-sums-6-2) [🔗](#subsec-partial-sums-6) It is also often useful to look at the sequence of difference of a sequence \((a_{n})\text{.}\) By this we just mean the sequence \((d_n)\) where \begin{equation*} d_n = a_{n+1} - a_{n}\text{.} \end{equation*} For example, if \((a_n) = (1, 4, 9, 16, 25, \ldots)\) (the square numbers, so \(a_n = n^2\)), then the sequence of differences is \((d_n) = (3, 5, 7, 9, \ldots)\) since \(4-1 = 3\text{,}\) \(9-4 = 5\text{,}\) and so on. We could also find a closed formula for the sequence of differences here since we have a closed formula for \(a_n\text{.}\) We would have \begin{equation*} d_n = a_{n+1} - a_n = (n+1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n+1\text{.} \end{equation*} [🔗](#subsec-partial-sums-7) In general, it is easy to go from a closed formula for a sequence to a closed formula for the sequence of differences. It is not always easy to go the other way around. In fact, what would it look like to start with a sequence of differences and get the “original” sequence?[🔗](#subsec-partial-sums-8) Thinking about a recurrence relation is helpful here. Since \begin{equation*} d_n = a_{n+1} - a_n\text{,} \end{equation*} we have that \begin{equation*} a_{n+1} = a_n + d_n\text{.} \end{equation*} This makes sense: to get from one term of a sequence to the next, you add the difference between those terms. Ah! You add the differences. So the *original sequence is the sequence of partial sums of the sequence of differences!* [🔗](#subsec-partial-sums-9) In upcoming sections we will see that understanding the sequence of differences can tell us exactly where to look for a closed formula. The differences also suggest how to create a recursive definition.[🔗](#subsec-partial-sums-10)

#### Example 4.1.11.

Find a recurrence relation and initial conditions that agree with the terms of this sequence: \(1, 5, 17, 53, 161, 485\ldots\text{.}\)[🔗](#subsec-partial-sums-11-2-1) Solution. Finding the recurrence relation would be easier if we had some context for the problem (like the Tower of Hanoi, for example). Alas, we have only the sequence. Remember, the recurrence relation tells you how to get from previous terms to future terms. What is going on here? We could look at the differences between terms: \(4, 12, 36, 108, \ldots\text{.}\) Notice that these are growing by a factor of 3. Is the original sequence as well? \(1\cdot 3 = 3\text{,}\) \(5 \cdot 3 = 15\text{,}\) \(17 \cdot 3 = 51\) and so on. It appears that we always end up with 2 less than the next term. Aha![🔗](#subsec-partial-sums-11-3-1) So \(a_n = 3a_{n-1} + 2\) is our recurrence relation and the initial condition is \(a_0 = 1\text{.}\)[🔗](#subsec-partial-sums-11-3-2) [🔗](#subsec-partial-sums-11-3) [🔗](#subsec-partial-sums-11)[🔗](#subsec-partial-sums)

### Subsection Sequences in python

Checking that a closed formula agrees with the initial terms in a sequence is easy with a calculator, or better yet, a programming language like python. One way you can do this is to define a function that returns the \(n\)th term of the sequence.[🔗](#subsec-seq-python-2) Here is an example: Suppose you wanted to check whether a formula you found for the sequence \((a_n)_{n \in \N} = (1, 3, 7, 15, 31,\ldots)\) is correct. Perhaps you guess that \(a_n = 2^n-1\text{.}\) Try running the code below. (Note: In python, the `^` symbol means something else, so to do exponentiation, we use `**`.)[🔗](#subsec-seq-python-3) def a(n): return 2**n-1 print(a(3)) Looks promising, but we should be careful: Our sequence started with \(a_0 = 1\text{,}\) which makes \(a_3 = 15\text{.}\) Now try modifying the definition of `a(n)` (by changing the return value) to get the correct closed formula.[🔗](#subsec-seq-python-5) Perhaps you want to print out the first 20 terms of the sequence? This is easy to do with python, by putting the terms in a list:[🔗](#subsec-seq-python-6) def a(n): return 2**(n+1) - 1 sequence = [] for n in range(20): sequence.append(a(n)) print(sequence) Note that `range(20)` starts at 0 and stops at 19 (it is the list `[0,1,2,...,19]`).[🔗](#subsec-seq-python-8) We can also use python to generate terms for a sequence given a recursive definition. Suppose we wanted to explore the sequence \(a_n = 2a_{n-1}+1\) with initial condition \(a_0 = 1\text{.}\) In python, we could generate the sequence as follows.[🔗](#subsec-seq-python-9) def a(n): if n == 0: return 1 else: return 2*a(n-1)+1 # just print out the first 10 terms for i in range(10): print(a(i)) Do you see how to translate a recurrence relation into a recursive python function? Try playing around with the code above to explore other sequences.[🔗](#subsec-seq-python-11) [🔗](#subsec-seq-python)

### Reading Questions Reading Questions

#### 1.

For the formulas for sequences below, select all that are *closed* formulas (as opposed to *recursive* formulas).[🔗](#rq-seq-basics-closed-vs-recursive-1-1)

- \(a_n = 3(n-1) + 2\)
- Correct. You can compute the value of \(a_n\) for any specified \(n\) directly (in a fixed, finite number of steps).
- \(a_n = \frac{n^2 + 2n + 3}{4n}\)
- Correct. Computing \(a_n\) can be done directly from the definition, not relying on knowing other terms in the sequence.
- \(a_n = 3a_{n-1}+2\)
- This is a recursive formula: to find \(a_8\) for example, you need to know \(a_7\text{.}\)
- \(a_n = a_{n-1} + a_{n-2} + a_{n-3}\)
- Can you find \(a_9\) just from the number 9? Or do you need to know other terms in the sequence?

[🔗](#rq-seq-basics-closed-vs-recursive)

#### 2.

- \(1, 2, 3, 4, 5, \ldots\)
- \(a_n = a_{n-1}+1\)
- \(5,5,5,5,5, \ldots\)
- \(a_n = 2a_{n-1}-a_{n-2}\)
- \(2,3,5,9,17, \ldots\)
- \(a_n = 2a_{n-1}-1\)
- \(3, 4, 7, 11, 18, \ldots\)
- \(a_n = a_{n-1}+a_{n-2}\)

[🔗](#rq-seq-basics-match)

#### 3.

What questions do you have? Write at least one question about the content of this section that you or a classmate might be curious about after reading this section.[🔗](#rq-seq-basic-q-1-1) [🔗](#rq-seq-basic-q)[🔗](#rqs-seq-basics)

### Exercises Practice Problems

#### 1.

Activate For the sequence with closed formula \(a_n = {n^{2}+6n+3}\text{,}\) find the term \(a_8\text{.}\)[🔗](#extracted-webwork-180-1-1-1) \(a_8 =\) .[🔗](#extracted-webwork-180-1-1-2) [🔗](#ww-seq-closed-find-term)

#### 2.

Activate Consider the sequence with recurrence relation \(a_n = a_{n-1} + 2\) with initial term \(a_0 = 2\text{.}\) Find the term \(a_4\text{.}\)[🔗](#extracted-webwork-181-1-1-1) \(a_4 =\) .[🔗](#extracted-webwork-181-1-1-2) [🔗](#ww-rec-arith-find-term)

#### 3.

Activate Consider the sequence with recurrence relation \(a_n = 2\cdot a_{n-1}\) with initial term \(a_0 = 8\text{.}\) Find the term \(a_6\text{.}\)[🔗](#extracted-webwork-182-1-1-1) \(a_6 =\) .[🔗](#extracted-webwork-182-1-1-2) [🔗](#ww-rec-geom-find-term)

#### 4.

Activate Find the closed formula for each of the following sequences \((a_n)_{n\ge 1}\) by relating them to a well known sequence. Assume the first term given is \(a_1\text{.}\)

1. \(2, 4, 7, 11, 16, \ldots\)[🔗](#extracted-webwork-183-1-1-1-3-1-1) \(a_n =\) [🔗](#extracted-webwork-183-1-1-1-3-1-2) [🔗](#extracted-webwork-183-1-1-1-3-1)
2. \(0, 3, 8, 15, 24, \ldots\)[🔗](#extracted-webwork-183-1-1-1-3-2-1) \(a_n =\) [🔗](#extracted-webwork-183-1-1-1-3-2-2) [🔗](#extracted-webwork-183-1-1-1-3-2)
3. \(-1, 0, 3, 8, 15, \ldots\)[🔗](#extracted-webwork-183-1-1-1-3-3-1) \(a_n =\) [🔗](#extracted-webwork-183-1-1-1-3-3-2) [🔗](#extracted-webwork-183-1-1-1-3-3)
4. \(0, 4, 22, 118, 718, \ldots\)[🔗](#extracted-webwork-183-1-1-1-3-4-1) \(a_n =\) [🔗](#extracted-webwork-183-1-1-1-3-4-2) [🔗](#extracted-webwork-183-1-1-1-3-4)

[🔗](#extracted-webwork-183-1-1-1) Hint. Try adding or subtracting the same small number from each term to see if you recognize the sequence.[🔗](#extracted-webwork-183-1-2-1) [🔗](#extracted-webwork-183-1-2) [🔗](#ww-seq-intro-related)

#### 5.

Activate For each sequence given below, find a closed formula for \(a_n\text{,}\) the \(n\)th term of the sequence (assume the first terms here are always \(a_0\)) by relating it to another sequence for which you already know the formula.

1. \(0, 2, 8, 18, 32, 50, \ldots\)[🔗](#extracted-webwork-184-1-1-1-4-1-1) \(a_n =\) [🔗](#extracted-webwork-184-1-1-1-4-1-2) [🔗](#extracted-webwork-184-1-1-1-4-1)
2. \(-2, -1, 6, 25, 62, 123, \ldots\)[🔗](#extracted-webwork-184-1-1-1-4-2-1) \(a_n =\) [🔗](#extracted-webwork-184-1-1-1-4-2-2) [🔗](#extracted-webwork-184-1-1-1-4-2)
3. \(0, 10, 30, 60, 100, 150, \ldots\)[🔗](#extracted-webwork-184-1-1-1-4-3-1) \(a_n =\) [🔗](#extracted-webwork-184-1-1-1-4-3-2) [🔗](#extracted-webwork-184-1-1-1-4-3)
4. \(0, 2, 7, 15, 26, 40, \ldots\)[🔗](#extracted-webwork-184-1-1-1-4-4-1) \(a_n =\) [🔗](#extracted-webwork-184-1-1-1-4-4-2) [🔗](#extracted-webwork-184-1-1-1-4-4)

[🔗](#extracted-webwork-184-1-1-1) Hint. Try adding, subtracting, or dividing each term by a constant to make the sequence more recognizable.[🔗](#extracted-webwork-184-1-2-1) For part (d), try expressing the sequence as the sum of two well known sequences.[🔗](#extracted-webwork-184-1-2-2) [🔗](#extracted-webwork-184-1-2) [🔗](#ww-seq-intro-related2)[🔗](#practice_seq_basics)

### Exercises Additional Exercises

#### 1.

Consider the sequence \((a_n)_{n \ge 1}\) that starts \(1, 3, 5, 7, 9, \ldots\) (i.e., the odd numbers in order).

1. Give a recursive definition and closed formula for the sequence.[🔗](#exercises_seq_basics-2-1-1-3-1-1) [🔗](#exercises_seq_basics-2-1-1-3-1)
2. Write out the sequence \((b_n)_{n \ge 2}\) of partial sums of \((a_n)\text{.}\) Write down the recursive definition for \((b_n)\) and guess at the closed formula.[🔗](#exercises_seq_basics-2-1-1-3-2-1) [🔗](#exercises_seq_basics-2-1-1-3-2)

[🔗](#exercises_seq_basics-2-1-1) [🔗](#exercises_seq_basics-2)

#### 2.

The Fibonacci sequence is \(0, 1, 1, 2, 3, 5, 8, 13, \ldots\) (where \(F_0 = 0\)).

1. Write out the first few terms of the sequence of partial sums: \(0\text{,}\) \(0+1\text{,}\) \(0+1+1\text{,}\)…[🔗](#exercises_seq_basics-3-2-2-3-1-1) [🔗](#exercises_seq_basics-3-2-2-3-1)
2. Guess a formula for the sequence of partial sums expressed in terms of a single Fibonacci number. For example, you might say \(F_0 + F_1 + \cdots + F_n = 3F_{n-1}^2 + n\text{,}\) although that is definitely not correct. [🔗](#exercises_seq_basics-3-2-2-3-2-1) [🔗](#exercises_seq_basics-3-2-2-3-2)

[🔗](#exercises_seq_basics-3-2-2) [🔗](#exercises_seq_basics-3)

#### 3.

Consider the three sequences below. For each, find a recursive definition. How are these sequences related?

1. \(2, 4, 6, 10, 16, 26, 42, \ldots\text{.}\) [🔗](#exercises_seq_basics-4-1-1-1-1)
2. \(5, 6, 11, 17, 28, 45, 73, \ldots\text{.}\) [🔗](#exercises_seq_basics-4-1-1-1-2)
3. \(0, 0 , 0 , 0 , 0 , 0 , 0 ,\ldots\text{.}\) [🔗](#exercises_seq_basics-4-1-1-1-3)

[🔗](#exercises_seq_basics-4-1-1) [🔗](#exercises_seq_basics-4)

#### 4.

Write out the first few terms of the sequence given by \(a_1 = 3\text{;}\) \(a_n = 2a_{n-1} + 4\text{.}\) Then find a recursive definition for the sequence \(10, 24, 52, 108, \ldots\text{.}\)[🔗](#exercises_seq_basics-5-1-1) [🔗](#exercises_seq_basics-5)

#### 5.

Write out the first few terms of the sequence given by \(a_n = n^2 - 3n + 1\text{.}\) Then find a closed formula for the sequence (starting with \(a_1\)) \(0, 2, 6, 12, 20, \ldots\text{.}\)[🔗](#exercises_seq_basics-6-1-1) [🔗](#exercises_seq_basics-6)

#### 6.

Show that \(a_n = 3\cdot 2^n + 7\cdot 5^n\) is a solution to the recurrence relation \(a_n = 7a_{n-1} - 10a_{n-2}\text{.}\) What would the initial conditions need to be for this to be the closed formula for the sequence?[🔗](#exercises_seq_basics-7-1-1) [🔗](#exercises_seq_basics-7)

#### 7.

Show that \(a_n = 2^n - 5^n\) is also a solution to the recurrence relation \(a_n = 7a_{n-1} - 10a_{n-2}\text{.}\) What would the initial conditions need to be for this to be the closed formula for the sequence?[🔗](#exercises_seq_basics-8-1-1) [🔗](#exercises_seq_basics-8)

#### 8.

Find a closed formula for the sequence with recursive definition \(a_n = 2a_{n-1} - a_{n-2}\) with \(a_1 = 1\) and \(a_2 = 2\text{.}\)[🔗](#exercises_seq_basics-9-1-1) Hint. You will want to write out the sequence, guess a closed formula, and then verify that you are correct.[🔗](#exercises_seq_basics-9-2-1) [🔗](#exercises_seq_basics-9-2) [🔗](#exercises_seq_basics-9)

#### 9.

Give two different recursive definitions for the sequence with closed formula \(a_n = 3 + 2n\text{.}\) Prove you are correct. At least one of the recursive definitions should make use of two previous terms and no constants.[🔗](#exercises_seq_basics-10-1-1) Hint. Write out the sequence, guess a recursive definition, and verify that the closed formula is a solution to that recursive definition.[🔗](#exercises_seq_basics-10-2-1) [🔗](#exercises_seq_basics-10-2) [🔗](#exercises_seq_basics-10)

#### 10.

Use summation (\(\sum\)) or product (\(\prod\)) notation to rewrite the following.

1. \(2 + 4 + 6 + 8 + \cdots + 2n\text{.}\) [🔗](#exercises_seq_basics-11-3-1-3-1)
2. \(1 + 5 + 9 + 13 + \cdots + 425\text{.}\) [🔗](#exercises_seq_basics-11-3-1-3-2)
3. \(1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots + \frac{1}{50}\text{.}\) [🔗](#exercises_seq_basics-11-3-1-3-3)
4. \(2 \cdot 4 \cdot 6 \cdot \cdots \cdot 2n\text{.}\) [🔗](#exercises_seq_basics-11-3-1-3-4)
5. \((\frac{1}{2})(\frac{2}{3})(\frac{3}{4})\cdots(\frac{100}{101})\text{.}\) [🔗](#exercises_seq_basics-11-3-1-3-5)

[🔗](#exercises_seq_basics-11-3-1) [🔗](#exercises_seq_basics-11)

#### 11.

Expand the following sums and products. That is, write them out the long way.

1. \(\d\sum_{k=1}^{100} (3+4k)\text{.}\) [🔗](#exercises_seq_basics-12-3-1-1-1)
2. \(\d\sum_{k=0}^n 2^k\text{.}\) [🔗](#exercises_seq_basics-12-3-1-1-2)
3. \(\d\sum_{k=2}^{50}\frac{1}{(k^2 - 1)}\text{.}\) [🔗](#exercises_seq_basics-12-3-1-1-3)
4. \(\d\prod_{k=2}^{100}\frac{k^2}{(k^2-1)}\text{.}\) [🔗](#exercises_seq_basics-12-3-1-1-4)
5. \(\d\prod_{k=0}^n (2+3k)\text{.}\) [🔗](#exercises_seq_basics-12-3-1-1-5)

[🔗](#exercises_seq_basics-12-3-1) [🔗](#exercises_seq_basics-12)

#### 12.

Suppose you draw \(n\) lines in the plane so that every pair of lines cross (no lines are parallel) and no three lines cross at the same point. This will create some number of regions in the plane, including some unbounded regions. Call the number of regions \(R_n\text{.}\) Find a recursive formula for the number of regions created by \(n\) lines, and justify why your recursion is correct.[🔗](#exercises_seq_basics-13-1-1) Hint. Try an example: When you draw the 4th line, it will cross three other lines and so will be divided into four segments, two of which are infinite. Each segment will divide a previous region into two.[🔗](#exercises_seq_basics-13-2-1) [🔗](#exercises_seq_basics-13-2) [🔗](#exercises_seq_basics-13)

#### 13.

A ternary string is a sequence of 0’s, 1’s, and 2’s. Just like a bit string, but with three symbols.[🔗](#exercises_seq_basics-14-3-1) Let’s call a ternary string *good* provided it never contains a 2 followed immediately by a 0. Let \(G_n\) be the number of good strings of length \(n\text{.}\) For example, \(G_1 = 3\text{,}\) and \(G_2 = 8\) (since of the 9 ternary strings of length 2, only one is not good).[🔗](#exercises_seq_basics-14-3-2) Find, with justification, a recursive formula for \(G_n\text{,}\) and use it to compute \(G_5\text{.}\)[🔗](#exercises_seq_basics-14-3-3) Hint. Consider three cases: The last digit is a 0, a 1, or a 2. Two of these should be easy to count, but strings ending in 0 cannot be proceeded by a 2, so they require a little more work.[🔗](#exercises_seq_basics-14-4-1) [🔗](#exercises_seq_basics-14-4) [🔗](#exercises_seq_basics-14)

#### 14.

Consider bit strings with length \(l\) and weight \(k\) (so strings of \(l\) 0’s and 1’s, including \(k\) 1’s). We know how to count the number of these for a fixed \(l\) and \(k\text{.}\) Now, we will count the number of strings for which the *sum* of the length and the weight is fixed. For example, let’s count all the bit strings for which \(l+k = 11\text{.}\)

1. Find examples of these strings of different lengths. What is the longest string possible? What is the shortest?[🔗](#exercises_seq_basics-15-2-1-9-1-1) [🔗](#exercises_seq_basics-15-2-1-9-1)
2. How many strings are there of each of these lengths. Use this to count the total number of strings (with sum 11).[🔗](#exercises_seq_basics-15-2-1-9-2-1) [🔗](#exercises_seq_basics-15-2-1-9-2)
3. The other approach: Let \(n = l+k\) vary. How many strings have sum \(n = 1\text{?}\) How many have sum \(n = 2\text{?}\) And so on. Find and explain a recurrence relation for the sequence \((a_n)\) that gives the number of strings with sum \(n\text{.}\)[🔗](#exercises_seq_basics-15-2-1-9-3-1) [🔗](#exercises_seq_basics-15-2-1-9-3)
4. Describe what you have found above in terms of [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large). What pattern have you discovered?[🔗](#exercises_seq_basics-15-2-1-9-4-1) [🔗](#exercises_seq_basics-15-2-1-9-4)

[🔗](#exercises_seq_basics-15-2-1) [🔗](#exercises_seq_basics-15)

#### 15.

When bees play chess, they use a hexagonal board like the one shown below. The queen bee can move one space at a time either directly to the right or angled up-right or down-right (but can never move leftwards). How many different paths can the queen take from the top left hexagon to the bottom right hexagon? Explain your answer, and how this relates to the previous question. (As an example, there are three paths to get to the second hexagon on the bottom row.)[🔗](#exercises_seq_basics-16-1-1) ! Hint. Think recursively, like you did in Pascal’s triangle.[🔗](#exercises_seq_basics-16-2-1) [🔗](#exercises_seq_basics-16-2) [🔗](#exercises_seq_basics-16)

#### 16.

Let \(t_n\) denote the number of ways to tile a \(2\times n\) chessboard using \(1\times 2\) dominoes. Write out the first few terms of the sequence \((t_n)_{n \ge 1}\text{,}\) and then give a recursive definition. Explain why your recursive formula is correct.[🔗](#exercises_seq_basics-17-3-1) Hint. There is only one way to tile a \(2 \times 1\) board, and two ways to tile a \(2\times 2\) board (you can orient the dominoes in two ways). In general, consider the two ways the domino covering the top left corner could be oriented.[🔗](#exercises_seq_basics-17-4-1) [🔗](#exercises_seq_basics-17-4) [🔗](#exercises_seq_basics-17)[🔗](#exercises_seq_basics)[🔗](#sec_seq_intro) [&#xe5cb;Prev](ch_sequences.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_seq-growth.html) [Feedback](/cdn-cgi/l/email-protection#711e021210035f1d1407181f31041f121e5f141504)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_seq_intro-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_seq_intro-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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
