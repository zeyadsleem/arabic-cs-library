---
title: "Non-Disjoint Outcomes"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_counting-non-disjoint.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.3 Non-Disjoint Outcomes

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_counting-non-disjoint-2-1-1)

1. Use Venn diagrams to count the number of outcomes in the union of non-disjoint sets.[🔗](#sec_counting-non-disjoint-2-2-1-1) [🔗](#sec_counting-non-disjoint-2-2-1)
2. Apply the principle of inclusion/exclusion for two and three sets.[🔗](#sec_counting-non-disjoint-2-2-2-1) [🔗](#sec_counting-non-disjoint-2-2-2)
3. Explain why the principle of inclusion/exclusion works.[🔗](#sec_counting-non-disjoint-2-2-3-1) [🔗](#sec_counting-non-disjoint-2-2-3)

[🔗](#sec_counting-non-disjoint-2)

### Subsection Section Preview

#### Investigate!

A recent buzz marketing campaign for *The Pie Hole* surveyed patrons on their pie preferences. People were asked whether they enjoyed (A) Apple, (B) Blueberry, or (C) Cherry pie (respondents answered yes or no to each type of pie, and could say yes to more than one type). The following table shows the results of the survey.[🔗](#sec_counting-non-disjoint-3-2-1)

| Pies enjoyed: | A | B | C | AB | AC | BC | ABC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Number of people: | 20 | 13 | 26 | 9 | 15 | 7 | 5 |

How many of those surveyed enjoy at least one of the types of pie? Also, explain why the answer is not 95.[🔗](#sec_counting-non-disjoint-3-2-3) [🔗](#sec_counting-non-disjoint-3-2)In [Section 3.2](sec_counting-combine-outcomes.html) we explored the [sum principle](sec_counting-combine-outcomes.html#principle-sum) as a way of combining two (or more) sets of *disjoint* outcomes. What happens if the outcomes are not disjoint?[🔗](#sec_counting-non-disjoint-3-3) Something different needs to be done. For example, when counting the number of playing cards that are either face cards or red cards, we cannot apply the sum principle to claim there are \(12 + 26 = 38\) cards. The problem is exactly that six cards are both face cards and red cards. There are a few different ways we can handle this that we will explore in this section.[🔗](#sec_counting-non-disjoint-3-4)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-counting-non-disjoint)

#### 1. Bit string counting.

Activate Consider the eight bit strings of length 3. Let’s find the number of strings that start with 1 or have weight 2 (i.e., contain exactly two 1s).[🔗](#extracted-webwork-101-1-1-1)

#### (a)

List all the 3-bit strings that start with 1.[🔗](#extracted-webwork-101-1-2-1-1) [🔗](#extracted-webwork-101-1-2)

#### (b)

List all the 3-bit strings that have weight 2.[🔗](#extracted-webwork-101-1-3-1-1) [🔗](#extracted-webwork-101-1-3)

#### (c)

Now list all the 3-bit strings that start with 1 or have weight 2. But be lazy: Don’t list them from scratch. Use your lists from the two tasks above.[🔗](#extracted-webwork-101-1-4-1-1) [🔗](#extracted-webwork-101-1-4)

#### (d)

How many strings are there in the lists?

- Strings that start with 1: [🔗](#extracted-webwork-101-1-5-1-1-1-1-1) [🔗](#extracted-webwork-101-1-5-1-1-1-1)
- Strings of weight 2: [🔗](#extracted-webwork-101-1-5-1-1-1-2-1) [🔗](#extracted-webwork-101-1-5-1-1-1-2)
- Strings that start with 1 or have weight 2: [🔗](#extracted-webwork-101-1-5-1-1-1-3-1) [🔗](#extracted-webwork-101-1-5-1-1-1-3)
- Strings that both start with a 1 *and* have weight 2: [🔗](#extracted-webwork-101-1-5-1-1-1-4-1) [🔗](#extracted-webwork-101-1-5-1-1-1-4)

[🔗](#extracted-webwork-101-1-5-1-1) [🔗](#extracted-webwork-101-1-5) [🔗](#pa-counting-non-disjoint-1)

#### 2. Combining lists.

How did you combine your two lists above? Explain how you did it. Then think of another method you could have used, and explain how that would be different.[🔗](#pa-counting-non-disjoint-2-2-1) [🔗](#pa-counting-non-disjoint-2)

#### 3. Counting favorite mathematicians.

Activate Xiang and Omari are discussing their favorite mathematicians throughout history. Xiang has a list of 7 favorites, while Omari has a list of 5. They discover that they have 3 mathematicians in common. How many mathematicians are on their combined list?[🔗](#extracted-webwork-102-1-1-1) [🔗](#pa-counting-non-disjoint-3)[🔗](#PA-counting-non-disjoint)[🔗](#sec_counting-non-disjoint-3)

### Subsection Counting with Venn Diagrams

To understand how to deal with combining sets of outcomes that are not disjoint, it will be helpful to use some notation from set theory, which we will briefly review here.[🔗](#subsec_counting-venn-6) Let \(A\) be the set of outcomes for the first event and \(B\) be the set of outcomes for the second event. When we ask for the number of ways either event can happen, the new set of outcomes consists of all outcomes that are in \(A\text{,}\) or \(B\text{,}\) or both. This is nothing more than the union of the set \(A\) and \(B\text{,}\) written \(A \cup B\text{.}\)[🔗](#subsec_counting-venn-7) The sum principle only applies when no outcome belongs to both events. The elements that are common to sets \(A\) and \(B\) are the sets in their intersection, written \(A \cap B\text{.}\) The intersection of two sets is itself a set. If sets \(A\) and \(B\) are disjoint, then there are *no* elements in the intersection, so the intersection is the empty set, written \(\emptyset\text{.}\)[🔗](#subsec_counting-venn-8) We are counting the *number* of outcomes, so what we are really interested in is the size (or cardinality) of the sets. We write the size of a set \(X\) as \(\card{X}\text{.}\)[🔗](#subsec_counting-venn-9) With this notation in hand, we can restate the sum principle as follows.[🔗](#subsec_counting-venn-10)

#### Principle 3.3.1. Sum Principle (with sets).

Given two sets \(A\) and \(B\text{,}\) if \(A \cap B = \emptyset\text{,}\) then \begin{equation*} \card{A \cup B} = \card{A} + \card{B}\text{.} \end{equation*} [🔗](#subsec_counting-venn-11-5-1) [🔗](#subsec_counting-venn-11)Now consider what happens to the sum principle when the sets are NOT disjoint. Suppose we want to find \(\card{A \cup B}\) and know that \(\card{A} = 10\) and \(\card{B} = 8\text{.}\) If we knew that the sets were disjoint, then \(\card{A \cup B}\) would be 18. But if we don’t have that the sets are disjoint, we need more information We must know how many of the 8 elements in \(B\) are also elements of \(A\text{.}\) Suppose we also know that \(\card{A \cap B} = 6\text{.}\) Now we can say exactly how many elements are in \(A\text{,}\) and, of those, how many are in \(B\) and how many are not (6 of the 10 elements are in \(B\text{,}\) so 4 are in \(A\) but not in \(B\)). We could fill in a Venn diagram as follows:[🔗](#subsec_counting-venn-12) ![Intersecting circles labeled A and B. Inside the region enclosed by both circles is the number 6. The number 4 is in the region inside A but outside B. The number 2 is in the region inside B but outside A.](generated/latex-image/subsec_counting-venn-13.svg) This says there are 6 elements in \(A \cap B\text{,}\) 4 elements in \(A\) but not \(B\) (which we can write as \(\card{A \setminus B} = 4\)), and 2 elements in \(B\) but not \(A\) (written \(\card{B \setminus A} = 2\)). Now *these* three sets *are* disjoint, so we can use the sum principle to find the number of elements in \(A \cup B\text{.}\) It is \(6 + 4 + 2 = 12\text{.}\)[🔗](#subsec_counting-venn-14)

#### Example 3.3.2.

How many \(7\)-bit strings of weight \(4\) start with \(11\) or end with \(00\text{,}\) or both?[🔗](#eg-2-set-bit-string-venn-1-1) Solution. Let \(A\) be the set of \(7\)-bit strings of weight \(4\) that start with \(11\text{.}\) We have \(\card{A} = \binom{5}{2} = 10\text{.}\) Let \(B\) be the set of \(7\)-bit strings of weight \(4\) that end with \(00\text{.}\) We have \(\card{B} = \binom{5}{4} = 5\text{.}\)[🔗](#eg-2-set-bit-string-venn-2-1) But it is not true that \(\card{A \cup B} = 10 + 5 = 15\text{,}\) since strings like 1101100 both start with \(11\) and end with \(00\text{.}\) That is included in the 10 strings starting with \(11\) and the five strings ending with \(00\text{.}\) We must find the number of strings that belong to both \(A\) and \(B\text{.}\) We have \begin{equation*} \card{A \cap B} = \binom{3}{2} = 3 \end{equation*} (and indeed, there are three strings in the intersection: 1111000, 1110100, and 1101100). [🔗](#eg-2-set-bit-string-venn-2-2) We can now fill in a Venn diagram:[🔗](#eg-2-set-bit-string-venn-2-3) ![Intersecting circles labeled A and B. Inside the region enclosed by both circles is the number 3. The number 7 is in the region inside A but outside B. The number 2 is in the region inside B but outside A.](generated/latex-image/eg-2-set-bit-string-venn-2-4.svg) The circle for \(A\) contains a total of 10 elements, the 3 that also belong to \(B\) and 7 more that belong to just \(A\text{.}\) The circle for \(B\) contains a total of 5 elements, the 3 that also belong to \(A\) and 2 more that belong to just \(B\text{.}\) The number of elements in \(A \cup B\) is the sum of the elements in each region \begin{equation*} |\card{A \cup B} = 7+3+2 = 12\text{.} \end{equation*} [🔗](#eg-2-set-bit-string-venn-2-5) [🔗](#eg-2-set-bit-string-venn-2) [🔗](#eg-2-set-bit-string-venn)We can do something similar with three sets.[🔗](#subsec_counting-venn-16)

#### Example 3.3.3.

An examination in three subjects, Algebra, Biology, and Chemistry, was taken by 41 students. The following table shows how many students failed in each single subject and in their various combinations:[🔗](#eg-3set-venn-1-1)

| Subject: | A | B | C | AB | AC | BC | ABC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Failed: | 12 | 5 | 8 | 2 | 6 | 3 | 1 |

How many students failed at least one subject?[🔗](#eg-3set-venn-1-3) Solution. The answer is not 37, even though the sum of the numbers above is 37. For example, while 12 students failed Algebra, 2 of those students also failed Biology, 6 also failed Chemistry, and 1 of those failed all three subjects. In fact, that 1 student who failed all three subjects is counted a total of 7 times in the total 37. To clarify things, let us think of the students who failed Algebra as the elements of the set \(A\text{,}\) and similarly for sets \(B\) and \(C\text{.}\) The one student who failed all three subjects is the lone element of the set \(A \cap B \cap C\text{.}\) Thus, in Venn diagrams:[🔗](#eg-3set-venn-2-1) ![Three intersecting circles labeled A, B, and C. The center region inside all three circles contains the number 1.](generated/latex-image/eg-3set-venn-2-2-1.svg) Now let’s fill in the other intersections. We know \(A\cap B\) contains 2 elements, but 1 element has already been counted. So we should put a 1 in the region where \(A\) and \(B\) intersect (but \(C\) does not). Similarly, we calculate the cardinality of \((A\cap C) \setminus B\text{,}\) and \((B \cap C) \setminus A\text{:}\)[🔗](#eg-3set-venn-2-3) ![Three intersecting circles labeled A, B, and C. The center region inside all three circles contains the number 1. The region above this, inside both A and B but outside C, contains the number 1. The region inside both A and C but outside B contains the number 5. The region inside B and C but outside A contains the number 2.](generated/latex-image/eg-3set-venn-2-4-1.svg) Next, we determine the numbers that should go in the remaining regions, including outside of all three circles. This last number is the number of students who did not fail any subject:[🔗](#eg-3set-venn-2-5) ![Three intersecting circles labeled A, B, and C. The center region inside all three circles contains the number 1. The region above this, inside both A and B but outside C, contains the number 1. The region inside both A and C but outside B contains the number 5. The region inside B and C but outside A contains the number 2. The region just inside A contains the number 5; the region just inside B contains the number 1; the region just inside C contains the number 0. The number 26 is outside all three circles.](generated/latex-image/eg-3set-venn-2-6-1.svg) We found 5 goes in the “\(A\) only” region because the entire circle for \(A\) needed to have a total of 12, and 7 were already accounted for. Similarly, we calculate the “\(B\) only” region to contain only 1 student and the “\(C\) only” region to contain no students.[🔗](#eg-3set-venn-2-7) Thus the number of students who failed at least one class is 15 (the sum of the numbers in each of the eight disjoint regions). The number of students who passed all three classes is 26: the total number of students, 41, less the 15 who failed at least one class.[🔗](#eg-3set-venn-2-8) Note that we can also answer other questions. For example, how many students failed just Chemistry? None. How many passed Algebra but failed both Biology and Chemistry? This corresponds to the region inside both \(B\) and \(C\) but outside of \(A\text{,}\) containing 2 students.[🔗](#eg-3set-venn-2-9) [🔗](#eg-3set-venn-2) [🔗](#eg-3set-venn) Here is an interesting math fact. \begin{equation*} 12 + 5 + 8 - 2 - 6 - 3 + 1 = 15\text{.} \end{equation*} Is it a coincidence that this way of combining the numbers of students who failed each subject in the example above gives the same number of students who failed at least one subject? This suggests that there might be a simpler way to find the size of a union of non-disjoint sets. [🔗](#subsec_counting-venn-18) [🔗](#subsec_counting-venn)

### Subsection The Principle of Inclusion/Exclusion

It would be nice to write an algebraic formula that captures what we have done in the previous examples. Even better would be for this algebraic formula to be a generalization of the case where the sets *are* disjoint.[🔗](#subsec-pie-2) Consider again the example where \(\card{A} = 10\text{,}\) \(\card{B} = 8\) and \(\card{A \cap B} = 6\text{.}\) We said that \(\card{A \cup B} = 12\text{,}\) found by adding \(4 + 6 + 2\text{.}\)[🔗](#subsec-pie-3) If \(A\) and \(B\) had been disjoint, then \(\card{A \cup B}\) would have been \(\card{A} + \card{B} = 10 + 8 = 18\text{.}\) We see that is off by exactly 6, which just so happens to be \(\card{A \cap B}\text{.}\) So perhaps we guess, \begin{equation*} \card{A \cup B} = \card{A} + \card{B} - \card{A \cap B}\text{.} \end{equation*} This makes sense! When we add the number of elements in \(A\) to the number of elements in \(B\text{,}\) we have counted the six elements that belong to both sets exactly twice. So if we subtract them out, we have counted them exactly once. [🔗](#subsec-pie-4) In other words, we have:[🔗](#subsec-pie-5)

#### Theorem 3.3.4. Cardinality of a Union (2 Sets).

For any finite sets \(A\) and \(B\text{,}\) \begin{equation*} \card{A \cup B} = \card{A} + \card{B} - \card{A \cap B}\text{.} \end{equation*} [🔗](#thm-pie-2-4) [🔗](#thm-pie-2)

#### Example 3.3.5.

How many \(7\)-bit strings of weight \(4\) start with \(11\) or end with \(00\text{,}\) or both? Use [Theorem 3.3.4](sec_counting-non-disjoint.html#thm-pie-2) and compare to [Example 3.3.2](sec_counting-non-disjoint.html#eg-2-set-bit-string-venn).[🔗](#subsec-pie-7-1-1) Solution. We have \(\card{A} = \binom{5}{2} = 10\text{,}\) \(\card{B} = \binom{5}{4} = 5\text{,}\) and \(\card{A \cap B} = \binom{3}{2} = 3\text{.}\) Therefore: \begin{equation*} \card{A \cup B} = 10 + 5 - 3 = 12\text{.} \end{equation*} This makes sense since the three bit strings that start with \(11\) and end with \(00\) are counted in the 10 strings starting with \(11\) and again among the 5 strings ending with \(00\text{,}\) so we have over-counted these exactly one time before we subtract them out. [🔗](#subsec-pie-7-2-1) [🔗](#subsec-pie-7-2) [🔗](#subsec-pie-7)For three sets, we can also count the elements in the union by carefully removing elements we have counted multiple times. Since there are more ways for the sets to overlap, the formula is more complicated.[🔗](#subsec-pie-8)

#### Theorem 3.3.6. Cardinality of a Union (3 Sets).

For any finite sets \(A\text{,}\) \(B\text{,}\) and \(C\text{,}\) \begin{align*} \card{A \cup B \cup C} = \amp \card{A} + \card{B} + \card{C} \\ - \amp \card{A \cap B} - \card{A \cap C} - \card{B \cap C} \\ + \amp \card{A \cap B \cap C} \text{.} \end{align*} [🔗](#thm-pie-3-4-1) [🔗](#thm-pie-3)To determine how many elements are in at least one of \(A\text{,}\) \(B\text{,}\) or \(C\) we add up all the elements in each of those sets. However, when we do that, any element in both \(A\) and \(B\) is counted twice. Also, each element in both \(A\) and \(C\) is counted twice, as are elements in \(B\) and \(C\text{,}\) so we take each of those out of our sum once. But now what about the elements which are in \(A \cap B \cap C\) (in all three sets)? We added them in three times, but also removed them three times. They have not yet been counted. Thus we add those elements back in at the end.[🔗](#subsec-pie-10)

#### Example 3.3.7.

How many of the numbers in \(\{1, 2, \ldots, 50\}\) are multiples of 2, 3, or 5?[🔗](#subsec-pie-11-1-1) Solution. Of the numbers in \(\{1, 2, \ldots, 50\}\text{,}\) let \(A\) be the set of multiples of 2, \(B\) be the set of multiples of 3, and \(C\) be the set of multiples of 5. We have \(\card{A} = 25\text{,}\) \(\card{B} = 16\text{,}\) and \(\card{C} = 10\text{.}\) (These numbers can be found by division; for example, since a third of the numbers are multiples of three, we can compute \(50/3 = 16.66\text{,}\) so there are 16 multiples of 3 in the set.) Some of the numbers in the set are multiples of both 2 and 3, such as \(6, 12, 18,\ldots\) all the multiples of 6. There are \(\card{A \cap B} = 8\) such numbers. Similarly, there are \(\card{A \cap C} = 5\) multiples of both 2 and 5 (multiples of 10), and \(\card{B \cap C} = 3\) multiples of both 3 and 5 (multiples of 15). There is \(\card{A \cap B \cap C} = 1\) multiples of all three (just the number 30).[🔗](#subsec-pie-11-2-1) Using [Theorem 3.3.6](sec_counting-non-disjoint.html#thm-pie-3), we have: \begin{equation*} \card{A \cup B \cup C} = 25 + 16 + 10 - 8 - 5 - 3 + 1 = 36\text{.} \end{equation*} [🔗](#subsec-pie-11-2-2) Let’s use this example to understand the theorem better. Consider the number \(21\text{.}\) In which sets is it counted? It is in \(B\text{,}\) but not \(A\) or \(C\text{,}\) so it is counting among the 16 multiples of \(3\) and not counted in any of the other sets, so it is included exactly once in our complete count. Similarly for all other numbers that are multiples of just one of \(2\text{,}\) \(3\text{,}\) or \(5\text{.}\)[🔗](#subsec-pie-11-2-3) The number \(18\) is in sets \(A\) and \(B\text{,}\) and so also in \(A \cap B\text{.}\) It is counted in the 25 multiples of \(2\text{,}\) the 16 multiples of \(3\text{,}\) and the 8 multiples of \(6\text{.}\) So it is added twice in our total and subtracted once, meaning it is counted exactly one time. The same will be true of all numbers that belong to exactly two of the individual sets.[🔗](#subsec-pie-11-2-4) What about \(30\text{?}\) It belongs to all the sets. It is therefore added to our total three times, when we add the multiples of \(2\text{,}\) \(3\text{,}\) and \(5\text{.}\) But it is also subtracted three times, once for each of the three pairs of sets. So it is not counted at all in our total... until we add it back in in the last step, after which it is counted exactly once.[🔗](#subsec-pie-11-2-5) [🔗](#subsec-pie-11-2) [🔗](#subsec-pie-11) This process of adding in, then subtracting out, then adding back in, and so on is called the Principle of Inclusion/Exclusion, or simply PIE. This principle can be applied to any number of sets, but the formula becomes more and more complicated the more sets you have. For example, this is what PIE looks like for four sets. \begin{align*} \card{A \cup B \cup C \cup D} = \amp \card{A} + \card{B} + \card{C} + \card{D} \\ - \amp \card{A \cap B} - \card{A \cap C} - \card {A \cap D} - \card{B \cap C} - \card{B \cap D} - \card{C \cap D}\\ + \amp \card{A \cap B \cap C} + \card{A \cap B \cap D} + \card{A \cap C \cap D} + \card{B \cap C \cap D}\\ - \amp \card{A \cap B \cap C \cap D} \text{.} \end{align*} Phew! And for five sets it is... just kidding. But even if we don’t write it down, hopefully we all see what you *would* have to write down. In practice, PIE for more than three sets is only used when we can simplify the computation by recognizing that, for example, all the intersections of two sets will have the same size. Some examples of this are explored in [Section 3.8](sec_advPIE.html). [🔗](#subsec-pie-12) [🔗](#subsec-pie)

### Subsection Overlaps and the Product Principle

Everything we have considered so far in this section has been about how the sum principle applies when the sets of outcomes are not disjoint. Do we need to be similarly worried about overlaps when applying the product principle?[🔗](#subsec-overlaps-and-the-product-principle-2) Not really.[🔗](#subsec-overlaps-and-the-product-principle-3) One use of the product principle is to compute probabilities, and in that context, we do make a distinction between events being independent or dependent. We will explore this more in [Section 3.7](sec-counting-probability.html). Essentially, to find the probability of two events occuring, we can multiply their respective probabilities if and only if the two events are *independent*: if the outcome of one event does not affect the outcome of the other.[🔗](#subsec-overlaps-and-the-product-principle-4) While finding probability is closely related to counting outcomes, the product principle itself does not require that sets of outcomes be disjoint or make a distinction between dependent or independent events. What *does* matter is that the number of outcomes for the second event does not change based on which outcome was the result of the first event.[🔗](#subsec-overlaps-and-the-product-principle-5) A distinction we *do* often make when applying the product principle is whether the outcomes of events can be “repeated.” Consider the following example.[🔗](#subsec-overlaps-and-the-product-principle-6)

#### Example 3.3.8.

How many 3-letter words (sequences of three letters) are there when,

1. repeats are allowed? [🔗](#subsec-overlaps-and-the-product-principle-7-1-1-1-1)
2. repeats are not allowed? [🔗](#subsec-overlaps-and-the-product-principle-7-1-1-1-2)

[🔗](#subsec-overlaps-and-the-product-principle-7-1-1) Solution. Being careful with the product principle, we are combining three events: \(A\) is the event of selecting the first letter, \(B\) is the event of selecting the second letter, and \(C\) is the event of selecting the third letter. If we want to count the number of words when letters in the word can be repeated, then each event contains 26 outcomes. So the number of 3-letter words is \(26^3 = 17,576\) when repeats are allowed.[🔗](#subsec-overlaps-and-the-product-principle-7-2-1) When repeats are not allowed, then the number of outcomes for event \(A\) is still 26, but the number of outcomes for \(B\) is only 25, since no matter what the outcome of event \(A\) is, that letter cannot be selected for the second position in the word. Similarly, no matter what the outcomes of event \(A\) and \(B\) are, the number of outcomes for event \(C\) is always 24: any letter not selected in the first two events. Thus the number of 3-letter words containing no repeated letters is \(26\cdot 25\cdot 24 = 15,600\text{.}\)[🔗](#subsec-overlaps-and-the-product-principle-7-2-2) It’s a little strange that the actual set of outcomes for event \(B\) is different for each possible outcome of event \(A\text{.}\) This doesn’t matter though, as long as the *size* of the outcome set doesn’t change.[🔗](#subsec-overlaps-and-the-product-principle-7-2-3) [🔗](#subsec-overlaps-and-the-product-principle-7-2) [🔗](#subsec-overlaps-and-the-product-principle-7)We will explore problems such as the previous example in much more depth next in [Section 3.4](sec_counting-combperm.html). Before that though, here is a final example of where the product principle does NOT easily work.[🔗](#subsec-overlaps-and-the-product-principle-8)

#### Example 3.3.9.

Explain why the product principle does NOT apply to the following counting question: How many 3-letter words have their letters in alphabetical order?[🔗](#subsec-overlaps-and-the-product-principle-9-1-1) Solution. The first thing we might try is to make event \(A\) be selecting the first letter, \(B\) be selecting the second letter, and \(C\) be selecting the third letter. There are 26 outcomes to event \(A\text{.}\) How many outcomes are there for event \(B\text{?}\) If we selected \(w\) as the first letter, then we can select a letter in the set \(\{w, x, y, z\}\) as our second letter, so it appears there are \(4\) outcomes for event \(B\text{.}\) However, if we selected \(a\) as our first letter, then any letter could be used for the second letter, so event \(B\) has \(26\) outcomes. Oh no![🔗](#subsec-overlaps-and-the-product-principle-9-2-1) The problem is that the number of outcomes for the second (and third) letter in the word changes depending on the outcome of the previous event. The events are not independent, but more than that, their *size* is not independent, so the product principle does not apply.[🔗](#subsec-overlaps-and-the-product-principle-9-2-2) [🔗](#subsec-overlaps-and-the-product-principle-9-2) [🔗](#subsec-overlaps-and-the-product-principle-9)We will see how to answer the counting problem above in the case that letters can be repeated in [Section 3.5](sec_counting-multisets.html). If we restricted the question further and required that the letters be distinct (and in alphabetical order), we already know how to answer the question. Since for any *set* of three letters, there is exactly one 3-letter word that has those letters in alphabetical order, we can simply count the number of sets of three letters. This is \(\binom{26}{3}\text{.}\) Then we just look at [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large) to find the value... oh shoot. Our triangle doesn’t go down that far. I guess we should think of a way to compute the value without the triangle. Read on![🔗](#subsec-overlaps-and-the-product-principle-10) [🔗](#subsec-overlaps-and-the-product-principle)

### Reading Questions Reading Questions

#### 1.

Which of the following best describes what the Principle of Inclusion/Exclusion is used for?[🔗](#rq-counting-non-disjoint-pie-1-1)

- To count the size of a union of two or more not-necessarily disjoint sets.
- That is correct. Note that the Principle of Inclusion/Exclusion works just great even if the sets are disjoint; all the intersections just have size 0.
- To count the size of the union of two or more sets, as long as they are disjoint.
- If the sets are disjoint, you do not need to use the Principle of Inclusion/Exclusion. You can just add the sizes of the sets.
- To count the size of the intersection of two or more independent sets of outcomes.
- The Principle of Inclusion/Exclusion includes intersections of sets, but it is not used to find the size of the intersections.
- To find the size of the intersection of dependent sets of outcomes.
- The Principle of Inclusion/Exclusion includes intersections of sets, but it is not used to find the size of the intersections.

[🔗](#rq-counting-non-disjoint-pie)

#### 2.

Why does the Principle of Inclusion/Exclusion *add* the size of the intersection of three sets, rather than subtract? Explain in your own words.[🔗](#rq-counting-non-disjoint-3set-1-1) [🔗](#rq-counting-non-disjoint-3set)

#### 3.

What questions do you have after reading this section? Write at least one question about the section you are curious about.[🔗](#rq-counting-non-disjoint-q-1-1) [🔗](#rq-counting-non-disjoint-q)[🔗](#rqs-counting-non-disjoint)

### Exercises Practice Problems

#### 1.

Activate Suppose you have sets \(A\) and \(B\) with \(\card{A} = 11\) and \(\card{B} = 19\text{.}\)[🔗](#extracted-webwork-103-1-1-1)

#### (a)

What is the largest possible value for \(\card{A \cap B}\text{?}\)[🔗](#extracted-webwork-103-1-2-1-1) [🔗](#extracted-webwork-103-1-2)

#### (b)

What is the smallest possible value for \(\card{A \cap B}\text{?}\)[🔗](#extracted-webwork-103-1-3-1-1) [🔗](#extracted-webwork-103-1-3)

#### (c)

What are the possible values for \(\card{A \cup B}\text{?}\)[🔗](#extracted-webwork-103-1-4-1-1) \(\le \card{A \cup B} \le\) [🔗](#extracted-webwork-103-1-4-1-2) [🔗](#extracted-webwork-103-1-4) [🔗](#ww-addmult-pie-possible)

#### 2.

Activate If \(\card{A} = 7\) and \(\card{B} = 11\text{,}\) what is \(\card{A \cup B} + \card{A \cap B}\text{?}\)[🔗](#extracted-webwork-104-1-1-1) [🔗](#ww-addmult-union-plus-int)

#### 3.

Activate A group of college students was asked about their TV watching habits. Of those surveyed, 29 students watch *The Walking Dead*, 24 watch *The Blacklist*, and 27 watch *Game of Thrones*. Additionally, 10 watch *The Walking Dead* and *The Blacklist*, 13 watch *The Walking Dead* and *Game of Thrones*, and 17 watch *The Blacklist* and *Game of Thrones*. There are 8 students who watch all three shows. How many students surveyed watched at least one of the shows?[🔗](#extracted-webwork-105-1-1-1) [🔗](#ww-addmult-pie-tv)

#### 4.

Activate In a recent survey, 115 students reported whether they liked their potatoes mashed, French-fried, or twice-baked. 53 liked them mashed, 51 liked French fries, and 70 liked twice baked potatoes. Additionally, 22 students liked both mashed and French-fried potatoes, 33 liked French fries and twice baked potatoes, 36 liked mashed and baked, and 16 liked all three styles. How many students *hate* potatoes? Explain why your answer is correct.[🔗](#extracted-webwork-106-1-1-1) [🔗](#ww-addmult-pie-potato)

#### 5.

Activate How many \(14\)-bit strings (that is, bit strings of length 14) are there which:

1. Start with the sub-string 011?[🔗](#extracted-webwork-107-1-1-1-2-1-1) [🔗](#extracted-webwork-107-1-1-1-2-1)
2. Have weight 8 (i.e., contain exactly 8 1’s) and start with the sub-string 011?[🔗](#extracted-webwork-107-1-1-1-2-2-1) [🔗](#extracted-webwork-107-1-1-1-2-2)
3. Either start with \(011\) or end with \(01\) (or both)?[🔗](#extracted-webwork-107-1-1-1-2-3-1) [🔗](#extracted-webwork-107-1-1-1-2-3)
4. Have weight 8 and either start with \(011\) or end with \(01\) (or both)?[🔗](#extracted-webwork-107-1-1-1-2-4-1) [🔗](#extracted-webwork-107-1-1-1-2-4)

[🔗](#extracted-webwork-107-1-1-1) [🔗](#ww-binom-bitstrings)

#### 6.

Activate For how many \(n \in \{1,2, \ldots, 790\}\) is \(n\) a multiple of one or more of 8, 5, or 9?[🔗](#extracted-webwork-108-1-1-1) Hint. To find out how many numbers are divisible by 8 and 9, for example, take \(790/(8\cdot9)\) and round down.[🔗](#extracted-webwork-108-1-2-1) [🔗](#extracted-webwork-108-1-2) [🔗](#ww-addmult-pie-multiples1)

#### 7.

Activate How many positive integers less than 850 are multiples of 9, 5, or 2? Use the Principle of Inclusion/Exclusion.[🔗](#extracted-webwork-109-1-1-1) [🔗](#ww-addmult-pie-multiples2)

#### 8.

Activate We want to build 12 letter “words” using only the first \(n =7\) letters of the alphabet. For example, if \(n = 5\) we can use the first 5 letters, \(\{a, b, c, d, e \}\) (Recall, words are just strings of letters, not necessarily actual English words.)

1. How many of these words are there total?[🔗](#extracted-webwork-110-1-1-1-6-1-1) [🔗](#extracted-webwork-110-1-1-1-6-1)
2. How many of these words contain no repeated letters?[🔗](#extracted-webwork-110-1-1-1-6-2-1) [🔗](#extracted-webwork-110-1-1-1-6-2)
3. How many of these words start with the sub-word “ade”?[🔗](#extracted-webwork-110-1-1-1-6-3-1) [🔗](#extracted-webwork-110-1-1-1-6-3)
4. How many of these words either start with “ade” or end with “be” or both?[🔗](#extracted-webwork-110-1-1-1-6-4-1) [🔗](#extracted-webwork-110-1-1-1-6-4)
5. How many of the words containing no repeats also do not contain the sub-word “bed”?[🔗](#extracted-webwork-110-1-1-1-6-5-1) [🔗](#extracted-webwork-110-1-1-1-6-5)

[🔗](#extracted-webwork-110-1-1-1) [🔗](#ww-addmult-words)

#### 9.

Activate Gridtown USA, besides having excellent donut shops, is known for its precisely laid out grid of streets and avenues. Streets run east-west, and avenues north-south, for the entire stretch of the town, never curving and never interrupted by parks or schools or the like.[🔗](#extracted-webwork-111-1-1-1) Suppose you live on the corner of 5th and 5th and work on the corner of 18th and 18th. Thus you must travel 26 blocks to get to work as quickly as possible.

1. How many different routes can you take to work, assuming you want to get there as quickly as possible?[🔗](#extracted-webwork-111-1-1-2-1-1-1) [🔗](#extracted-webwork-111-1-1-2-1-1)

[🔗](#extracted-webwork-111-1-1-2)

1. Now suppose you want to stop and get a donut on the way to work, from your favorite donut shop on the corner of 15th Ave. and 14th St. How many routes to work, stopping at the donut shop, can you take (again, ensuring the shortest possible route)?[🔗](#extracted-webwork-111-1-1-3-1-1-1) [🔗](#extracted-webwork-111-1-1-3-1-1)

[🔗](#extracted-webwork-111-1-1-3)

1. Disaster Strikes Gridtown: there is a pothole on 6th Ave. between 7th St. and 8th St. How many routes to work can you take avoiding that unsightly (and dangerous) stretch of road?[🔗](#extracted-webwork-111-1-1-4-1-1-1) [🔗](#extracted-webwork-111-1-1-4-1-1)

[🔗](#extracted-webwork-111-1-1-4)

1. The pothole has been repaired (phew!) and a new donut shop has opened on the corner of 6th Ave. and 7th St. How many routes to work drive by one or the other (or both) donut shops? Hint: the donut shops serve PIE.[🔗](#extracted-webwork-111-1-1-5-1-1-1) [🔗](#extracted-webwork-111-1-1-5-1-1)

[🔗](#extracted-webwork-111-1-1-5) [🔗](#ww-binom-gridtown)[🔗](#practice_counting-repeats)

### Exercises Additional Exercises

#### 1.

Let \(A\text{,}\) \(B\text{,}\) and \(C\) be sets.

1. Find \(\card{(A \cup C)\setminus B}\) provided \(\card{A} = 50\text{,}\) \(\card{B} = 45\text{,}\) \(\card{C} = 40\text{,}\) \(\card{A\cap B} = 20\text{,}\) \(\card{A \cap C} = 15\text{,}\) \(\card{B \cap C} = 23\text{,}\) and \(\card{A \cap B \cap C} = 12\text{.}\) [🔗](#exercises_counting-repeats-2-1-1-4-1)
2. Describe a set in terms of \(A\text{,}\) \(B\text{,}\) and \(C\) with cardinality 26. [🔗](#exercises_counting-repeats-2-1-1-4-2)

[🔗](#exercises_counting-repeats-2-1-1) Hint. For part (a) you could use the formula for PIE, but for part (b) you might be better off drawing a Venn diagram.[🔗](#exercises_counting-repeats-2-2-1) [🔗](#exercises_counting-repeats-2-2) [🔗](#exercises_counting-repeats-2)

#### 2.

For how many three-digit numbers (100 to 999) is the *sum of the digits* even? (For example, \(343\) has an even sum of digits: \(3+4+3 = 10\) which is even.) Find the answer and explain why it is correct in at least two *different* ways.[🔗](#exercises_counting-repeats-3-1-1) Hint. You could consider cases. For example, any number of the form ODD-ODD-EVEN will have an even sum. Alternatively, how many three-digit numbers have the sum of their digits even if the first two digits are 54? What if the first two digits are 19?[🔗](#exercises_counting-repeats-3-2-1) [🔗](#exercises_counting-repeats-3-2) [🔗](#exercises_counting-repeats-3)[🔗](#exercises_counting-repeats)[🔗](#sec_counting-non-disjoint) [&#xe5cb;Prev](sec_counting-combine-outcomes.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_counting-combperm.html) [Feedback](/cdn-cgi/l/email-protection#c7a8b4a4a6b5e9aba2b1aea987b2a9a4a8e9a2a3b2)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_counting-non-disjoint-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_counting-non-disjoint-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
