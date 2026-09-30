---
title: "Describing Sequences"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_seq_intro.html
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
