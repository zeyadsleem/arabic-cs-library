---
title: "Relations and Graphs"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_gt-relations.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 2.6 Relations and Graphs

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_gt-relations-2-1-1)

1. Explain the relationship between a graph and a relation.[🔗](#sec_gt-relations-2-2-1-1) [🔗](#sec_gt-relations-2-2-1)
2. Determine whether a relation is reflexive, symmetric, or transitive.[🔗](#sec_gt-relations-2-2-2-1) [🔗](#sec_gt-relations-2-2-2)
3. Use an equivalence relation to partition a set and use a partition to define an equivalence relation.[🔗](#sec_gt-relations-2-2-3-1) [🔗](#sec_gt-relations-2-2-3)

[🔗](#sec_gt-relations-2)

### Subsection Section Preview

#### Investigate!

Consider the three spinners below.[🔗](#gt-relations-section-previw-2-1-1) ![Three spinners](generated/latex-image/spinners.svg) If you and a friend each pick a different spinner and spin them, we can consider the nine possible outcomes. For example, between spinners \(A\) and \(B\text{,}\) the outcomes are \begin{equation*} (2,1), (2,6), (2,8), (4,1), (4,6), (4,8), (9,1), (9,6), (9,8)\text{.} \end{equation*} This suggests that spinner \(A\) will win five out of nine times. [🔗](#gt-relations-section-previw-2-1-3) Compare the other combinations of spinners. Which spinner is best?[🔗](#gt-relations-section-previw-2-1-4) [🔗](#gt-relations-section-previw-2)In this section, we will explore a generalization of a graph, called a relation. We will see how a relation can be represented by a graph and how a graph can be used to represent a relation. We will also consider some properties that a relation might have, and how these properties can be used to classify relations into different types.[🔗](#gt-relations-section-previw-3)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-gt-relations)

In a given month, some days are more similar than others. For example, the 3rd of the month is more like the 24th than it is like the 15th. What does this possibly mean? We will explore two ways in which this is true.[🔗](#PA-gt-relations-2-1)

#### 1.

Activate We will say that two numbers between 1 and 31 are related, written \(a \sim b\) if their difference is a multiple of 7. So for example, \(3 \sim 24\text{,}\) since \(24-3 = 3\cdot 7\text{,}\) but \(3 \not\sim 15\) since \(15-3 = 12\) which is not a multiple of 7.[🔗](#extracted-webwork-67-1-1-1)

#### (a)

Which of the following are true? That is, which of the following pairs of numbers are related as we have defined above?[🔗](#extracted-webwork-67-1-2-1-1)

- \(\displaystyle 4\sim 14\)[🔗](#extracted-webwork-67-1-2-1-2-1-1-1) [🔗](#extracted-webwork-67-1-2-1-2-1-1)
- \(\displaystyle 7\sim 14\)[🔗](#extracted-webwork-67-1-2-1-2-1-2-1) [🔗](#extracted-webwork-67-1-2-1-2-1-2)
- \(\displaystyle 10 \sim 17\)[🔗](#extracted-webwork-67-1-2-1-2-1-3-1) [🔗](#extracted-webwork-67-1-2-1-2-1-3)
- \(\displaystyle 17\sim 24\)[🔗](#extracted-webwork-67-1-2-1-2-1-4-1) [🔗](#extracted-webwork-67-1-2-1-2-1-4)
- \(\displaystyle 10\sim 24\)[🔗](#extracted-webwork-67-1-2-1-2-1-5-1) [🔗](#extracted-webwork-67-1-2-1-2-1-5)
- \(\displaystyle 20 \sim 10\)[🔗](#extracted-webwork-67-1-2-1-2-1-6-1) [🔗](#extracted-webwork-67-1-2-1-2-1-6)
- \(\displaystyle 31 \sim 3\)[🔗](#extracted-webwork-67-1-2-1-2-1-7-1) [🔗](#extracted-webwork-67-1-2-1-2-1-7)
- \(\displaystyle 25 \sim 25\)[🔗](#extracted-webwork-67-1-2-1-2-1-8-1) [🔗](#extracted-webwork-67-1-2-1-2-1-8)

[🔗](#extracted-webwork-67-1-2-1-2) [🔗](#extracted-webwork-67-1-2)

#### (b)

Which of the following statements are true about the \(\sim\) relation in this case?[🔗](#extracted-webwork-67-1-3-1-1)

- \(a \sim a\) for every number \(a\)[🔗](#extracted-webwork-67-1-3-1-2-1-1-1) [🔗](#extracted-webwork-67-1-3-1-2-1-1)
- \(a \not\sim a\) for any number \(a\)[🔗](#extracted-webwork-67-1-3-1-2-1-2-1) [🔗](#extracted-webwork-67-1-3-1-2-1-2)
- For any numbers \(a\) and \(b\text{,}\) if \(a \sim b\text{,}\) then \(b \sim a\)[🔗](#extracted-webwork-67-1-3-1-2-1-3-1) [🔗](#extracted-webwork-67-1-3-1-2-1-3)
- For any numbers \(a\) and \(b\text{,}\) if \(a \sim b\) and \(b \sim a\text{,}\) then \(a = b\)[🔗](#extracted-webwork-67-1-3-1-2-1-4-1) [🔗](#extracted-webwork-67-1-3-1-2-1-4)
- For any numbers \(a\) and \(b\text{,}\) if \(a \sim b\) and \(b \sim c\text{,}\) then \(a \sim c\)[🔗](#extracted-webwork-67-1-3-1-2-1-5-1) [🔗](#extracted-webwork-67-1-3-1-2-1-5)

[🔗](#extracted-webwork-67-1-3-1-2) [🔗](#extracted-webwork-67-1-3)

#### (c)

We will write \([a]\) for the set of all numbers related to \(a\text{.}\) For example, \([7] = \{7, 14, 21, 28\}\text{.}\) Find each of the following:[🔗](#extracted-webwork-67-1-4-1-1)

- \([1] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-1-1) [🔗](#extracted-webwork-67-1-4-1-2-1-1)
- \([2] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-2-1) [🔗](#extracted-webwork-67-1-4-1-2-1-2)
- \([3] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-3-1) [🔗](#extracted-webwork-67-1-4-1-2-1-3)
- \([4] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-4-1) [🔗](#extracted-webwork-67-1-4-1-2-1-4)
- \([5] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-5-1) [🔗](#extracted-webwork-67-1-4-1-2-1-5)
- \([6] =\) .[🔗](#extracted-webwork-67-1-4-1-2-1-6-1) [🔗](#extracted-webwork-67-1-4-1-2-1-6)

[🔗](#extracted-webwork-67-1-4-1-2) Are there any numbers that are in more than one of the sets \([a]\) above?

- Yes[🔗](#extracted-webwork-67-1-4-1-3-2-1-1) [🔗](#extracted-webwork-67-1-4-1-3-2-1)
- No[🔗](#extracted-webwork-67-1-4-1-3-2-2-1) [🔗](#extracted-webwork-67-1-4-1-3-2-2)

[🔗](#extracted-webwork-67-1-4-1-3) [🔗](#extracted-webwork-67-1-4) [🔗](#pa-gt-relations-1)

#### 2.

When you divide a multiple of 7 by 7, you get a whole number. If you divide another number by 7, you can either write the result as a decimal or as a quotient and a remainder. For example, \(19 \div 7\) is \(2\) with a remainder of 5, since we can write \(19 = 2\cdot 7 + 5\text{.}\) The remainder is also called the modulus. When programming in python (and many other languages), the modulus operator is written as `%`. For example, `19 % 7` is `5`. Try this out for a few numbers.[🔗](#pa-gt-relations-2-1-1) a = 19 print(a % 7) Activate

#### (a)

Find all the numbers \(a\) between 1 and 31 that are \(5 \mod 7\text{.}\) That is, find all \(a\) such that `a % 7 = 5`.[🔗](#extracted-webwork-68-1-1-1-1) [🔗](#extracted-webwork-68-1-1)

#### (b)

Since the modulus is a function, each number has exactly one modulus when divided by 7. This means that the moduli partition the numbers from 1 to 31: every number belongs to exactly one of the sets of numbers with a particular modulus. We have already found the set for modulus 5. Find the other sets.[🔗](#extracted-webwork-68-1-2-1-1)

- `a % 7 = 0`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-1-1) [🔗](#extracted-webwork-68-1-2-1-2-1-1)
- `a % 7 = 1`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-2-1) [🔗](#extracted-webwork-68-1-2-1-2-1-2)
- `a % 7 = 2`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-3-1) [🔗](#extracted-webwork-68-1-2-1-2-1-3)
- `a % 7 = 3`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-4-1) [🔗](#extracted-webwork-68-1-2-1-2-1-4)
- `a % 7 = 4`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-5-1) [🔗](#extracted-webwork-68-1-2-1-2-1-5)
- `a % 7 = 6`: .[🔗](#extracted-webwork-68-1-2-1-2-1-6-1) [🔗](#extracted-webwork-68-1-2-1-2-1-6)

[🔗](#extracted-webwork-68-1-2-1-2) [🔗](#extracted-webwork-68-1-2)

#### (c)

We can use the moduli to define a relation on the numbers from 1 to 31. We will say that \(a \sim b\) if `a % 7 = b % 7`. In other words, two numbers are related if they belong to the same set of the partition we found above.[🔗](#extracted-webwork-68-1-3-1-1) Which of the following are true? That is, which of the following pairs of numbers are related by this modulus relation?[🔗](#extracted-webwork-68-1-3-1-2)

- \(\displaystyle 4\sim 14\)[🔗](#extracted-webwork-68-1-3-1-3-1-1-1) [🔗](#extracted-webwork-68-1-3-1-3-1-1)
- \(\displaystyle 7\sim 14\)[🔗](#extracted-webwork-68-1-3-1-3-1-2-1) [🔗](#extracted-webwork-68-1-3-1-3-1-2)
- \(\displaystyle 10 \sim 17\)[🔗](#extracted-webwork-68-1-3-1-3-1-3-1) [🔗](#extracted-webwork-68-1-3-1-3-1-3)
- \(\displaystyle 17\sim 24\)[🔗](#extracted-webwork-68-1-3-1-3-1-4-1) [🔗](#extracted-webwork-68-1-3-1-3-1-4)
- \(\displaystyle 10\sim 24\)[🔗](#extracted-webwork-68-1-3-1-3-1-5-1) [🔗](#extracted-webwork-68-1-3-1-3-1-5)
- \(\displaystyle 20 \sim 10\)[🔗](#extracted-webwork-68-1-3-1-3-1-6-1) [🔗](#extracted-webwork-68-1-3-1-3-1-6)
- \(\displaystyle 31 \sim 3\)[🔗](#extracted-webwork-68-1-3-1-3-1-7-1) [🔗](#extracted-webwork-68-1-3-1-3-1-7)
- \(\displaystyle 25 \sim 25\)[🔗](#extracted-webwork-68-1-3-1-3-1-8-1) [🔗](#extracted-webwork-68-1-3-1-3-1-8)

[🔗](#extracted-webwork-68-1-3-1-3) [🔗](#extracted-webwork-68-1-3) [🔗](#pa-gt-relations-2)[🔗](#PA-gt-relations)[🔗](#gt-relations-section-previw)

### Subsection Relations Generally

A graph is a way to represent some ways that different objects are related. We have seen how to use graphs to represent which people are friends, or which classes have time conflicts, or which radio stations are too close to have the same frequency. Not all ways in which things can be related can be represented by a graph, however. In this section, we will consider the more general concept of a relation and see how those might be related to graphs.[🔗](#subsec-relations-generally-2) Consider the example of the relation between students and classes that holds when a student is in that class (in a particular semester). This is a relation between two different sets (the students and the classes). If we used a graph to illustrate this relation, the graph would be *bipartite*, since two students are never related to each other, and two classes are never related to each other.[🔗](#subsec-relations-generally-3) A graph is really a set of vertices and a set of edges: \(G = (V, E)\text{;}\) each element of the set \(E\) is a two-element subset of \(V\text{.}\) If we want to draw attention to the bipartiteness of the graph, we can split up \(V\) into its two sets and write \(G = ((A, B), E)\text{.}\) In this notation, for the graph to be bipartite, we want each edge to be a pair \((a,b)\) where \(a\) is an element of \(A\) and \(b\) is an element of \(B\text{.}\) In other words, each edge is an element of the Cartesian product of \(A\) and \(B\text{,}\) written, \begin{equation*} A \times B = \{(a,b) \st a \in A,~b \in B\}. \end{equation*} (Another way to say this is that \(A \times B\) is “the set of all ordered pairs of elements from \(A\) and \(B\text{.}\)”) [🔗](#subsec-relations-generally-4)

#### Note 2.6.1.

There is one subtlety here we should point out: the bipartite graph we have described really has *directed edges* from \(A\) to \(B\) since we are considering *ordered* pairs. Our definition of a graph has edges as two-element *subsets* of vertices, and subsets are not ordered. As long as \(A\) and \(B\) are disjoint sets, there is no confusion here, but we see relations in which \(A\) and \(B\) share some elements, but we still care about the order. More on that soon.[🔗](#subsec-relations-generally-5-1) [🔗](#subsec-relations-generally-5)This example exactly illustrates what a general binary relation is. Here is the careful definition.[🔗](#subsec-relations-generally-6)

#### Definition 2.6.2.

A binary relation is a set of ordered pairs. We say the binary relation is a relation on sets \(A\) and \(B\) provided the ordered pairs are a subset of \(A \times B\text{.}\) We say a binary relation is a relation on a set \(A\) provided the ordered pairs are a subset of \(A \times A\text{.}\)[🔗](#def-binary-relation-1-1) [🔗](#def-binary-relation)Note that \(A \times A\) is just the set of all ordered pairs where both coordinates are elements from \(A\text{.}\)[🔗](#subsec-relations-generally-8)

#### Example 2.6.3.

Consider a set \(A\) of students and a set \(B\) of classes. Say \(A = \{\text{Al, Bob, Cat, Dirk, Eva}\}\) and \(B = \{\text{Calculus, Discrete, Statistics}\}\text{.}\) Everyone except Dirk is in Calculus, Bob and Eva are in Discrete, and Al, Cat, and Dirk are in Statistics.[🔗](#rel-in-class-1-1) We can define a relation \(T\) of “is taking” \(A\) and \(B\) that holds of a student and class precisely if that student is taking that class. Write this relation as a subset of \(A\times B\) and draw its bipartite graph.[🔗](#rel-in-class-1-2) Solution. To write the relation precisely, we just give the set of ordered pairs: \begin{align*} T = \{\amp (\text{Al}, \text{Calculus}), (\text{Al}, \text{Statistics}),\\ \amp (\text{Bob}, \text{Calculus}), (\text{Bob}, \text{Discrete})\\ \amp (\text{Cat}, \text{Calculus}), (\text{Cat}, \text{Statistics})\\ \amp (\text{Dirk}, \text{Statistics})\\ \amp (\text{Eva}, \text{Calculus}), (\text{Eva}, \text{Discrete})\} \end{align*} We can draw this relation as a bipartite graph: [🔗](#rel-in-class-2-1) ! [🔗](#rel-in-class-2) [🔗](#rel-in-class)

#### Example 2.6.4.

Consider the relation \(M\) for “is a multiple of” on the set \(A = \{1,2,3,4,5,6\}\text{.}\) Write this as a set of ordered pairs. Does this relation create a graph?[🔗](#rel-multiple-of-1-1) Solution. First, let’s think about which elements should be related and which should not. We know that \(6\) is a multiple of \(2\text{,}\) so the relation is true of the pair \((6,2)\text{,}\) but \(6\) is not a multiple of \(4\text{,}\) so the pair \((6,4)\) does not satisfy the relation. More precisely, we say that \((6,2) \in M\) but \((6,4) \notin M\text{.}\)[🔗](#rel-multiple-of-2-1) Let’s list all the elements of \(M\text{:}\) \begin{align*} M = \{\amp(1,1), (2,1), (2,2), (3,1), (3,3), (4,1), (4,2), (4,4), \\ \amp (5,1), (5,5), (6,1), (6,2) (6,3), (6,6)\}\text{.} \end{align*} This relation is not a graph for two reasons: first, elements are related to themselves, and second, the order of elements in the relation is not symmetric (\(6\) is related to \(2\text{,}\) but \(2\) is not related to \(6\text{,}\) for example). [🔗](#rel-multiple-of-2-2) We can, however, still draw something like a graph to illustrate this relation: Since the direction of the relation matters, we will have *directed* edges. This alone would create a directed graph. Since vertices can have edges going to themselves, we would call the structure a multigraph, so the relation can be thought of as a directed multigraph.[🔗](#rel-multiple-of-2-3) ! [🔗](#rel-multiple-of-2) [🔗](#rel-multiple-of)A binary relation \(R\) on sets \(A\) and \(B\) can always be “turned around” to give a relation on sets \(B\) and \(A\text{.}\) That is, \(R\) says how things in \(A\) are related to things in \(B\text{;}\) those things in \(B\) are related to things in \(A\text{,}\) just in an *inverse* (backward) way. We will call this new relation the inverse of \(R\text{.}\)[🔗](#subsec-relations-generally-11)

#### Definition 2.6.5.

Given a binary relation \(R\text{,}\) define \(R\inv\) to be the inverse of \(R\) as the set \begin{equation*} R\inv = \{(b,a) \st (a,b) \in R\}\text{.} \end{equation*} [🔗](#def-relation-inverse-1-1) [🔗](#def-relation-inverse)The relation \(T\) from [Example 2.6.3](sec_gt-relations.html#rel-in-class) said that a given student was in a particular class. The inverse relation \(T\inv\) says that a given class has a particular student in it. For example, \((\text{Calculus}, \text{Al})\) is an element of \(T\inv\text{.}\) Graphically, there won’t be any difference in the picture, although we could put the set of classes on top and students on bottom.[🔗](#subsec-relations-generally-13) The relation \(M\) from [Example 2.6.4](sec_gt-relations.html#rel-multiple-of) gave us that, for example, \(6\) is a multiple of \(2\text{,}\) since \((6,2) \in M\text{.}\) For the inverse, we have \((2,6) \in M\inv\text{,}\) which means that \(2\) is a factor of \(6\text{.}\) For this example, we have represented a relation as a directed multigraph. The graph of the inverse will look exactly the same, but all the arrows will point in the opposite direction.[🔗](#subsec-relations-generally-14) Another way to create a new relation is to combine two relations. Suppose in addition to the “is taking” relation from [Example 2.6.3](sec_gt-relations.html#rel-in-class), we define a relation “is taught by” that matches up each course with its instructor. Perhaps Professor X teaches Calculus. In that case, since Al is taking Calculus, and Calculus is taught by Professor X, we can conclude that Al is taking a class with Professor X.[🔗](#subsec-relations-generally-15)

#### Definition 2.6.6.

Let \(R\) be a relation from set \(A\) to \(B\) and \(S\) be a relation from \(B\) to \(C\text{.}\) The composition of \(R\) and \(S\) is \begin{equation*} S \circ R = \{(a,c) \in A \times C \st (a,b) \in R \text{ and } (b,c) \in S \text{ for some } b \in B\} \end{equation*} [🔗](#def-relation-composition-1-1) [🔗](#def-relation-composition)Note the order in which we wrote the two relations: it’s \(S \circ R\text{,}\) not \(R \circ S\text{.}\) The reason we do this (which might seem backward) is that it agrees with the usual notation for composition of *functions*. In fact, functions are nothing but a specific type of relation![🔗](#subsec-relations-generally-17)

#### Example 2.6.7.

Write out the relation \(P \circ T\text{,}\) composing the relations of [Example 2.6.3](sec_gt-relations.html#rel-in-class) and \(P = \{(\text{Calculus}, \text{Prof X}), (\text{Discrete}, \text{Prof L}), (\text{Statistics}, \text{Prof X}), (\text{Statistics}, \text{Prof S})\} \text{.}\) Note that here we are saying the statistic course is co-taught by professors X and S.[🔗](#subsec-relations-generally-18-1-1) Solution. The relation we are looking for is a relation between students and professors. We can start with each element of \(T\) and *extend* it by following the course to the professor(s) via \(P\text{.}\) So for example, start with Cat, and notice that \((\text{Cat}, \text{Calculus}) \in T\text{.}\) Now look at what Calculus is related to via \(P\text{:}\) \((\text{Calculus}, \text{Prof X}) \in P \text{.}\) Thus we can push these together to conclude that \((\text{Cat}, \text{Prof X}) \in P \circ T\text{.}\)[🔗](#subsec-relations-generally-18-2-1) An alternative approach would be to simply consider which pairs of students and professors are linked by a common class. Should the pair \((\text{Al}, \text{Prof L})\) be an element of the composition? No, because there is no class that is both taken by Al and taught by Professor L. On the other hand, we can conclude the \((\text{Al}, \text{Prof X}) \in P \circ T\) since there is a common course. In fact, the common course could be Calculus or Statistics (it doesn’t matter how many common middle steps there are, as long as there is at least one).[🔗](#subsec-relations-generally-18-2-2) Here is the complete relation: \begin{align*} P \circ T = \{\amp (\text{Al}, \text{Prof X}), (\text{Al}, \text{Prof S}), (\text{Bob}, \text{Prof X}), (\text{Bob}, \text{Prof L}), \\ \amp (\text{Cat}, \text{Prof X}), (\text{Cat}, \text{Prof S}), (\text{Dirk}, \text{Prof X}), (\text{Dirk}, \text{Prof S}),\\ \amp (\text{Eva}, \text{Prof X}), (\text{Eva}, \text{Prof L})\} \end{align*} [🔗](#subsec-relations-generally-18-2-3) [🔗](#subsec-relations-generally-18-2) [🔗](#subsec-relations-generally-18)Something interesting often happens when you compose a relation with its inverse. You might have seen something like this for *functions* in calculus or algebra: \(f(x) = e^x\) has an inverse function \(f\inv(x) = \ln(x)\text{,}\) and we know that \(f(f\inv(x)) = e^{\ln(x)} = x\text{.}\) But functions are relations in which every “input” has exactly one “output”, so perhaps it is not surprising that composing with an inverse just gives you the identity function. When inputs can have multiple outputs, and outputs can have multiple inputs, then we get something more.[🔗](#subsec-relations-generally-19)

#### Example 2.6.8.

Describe the relation \(T\inv \circ T\) (using our familiar relation \(T\) from [Example 2.6.3](sec_gt-relations.html#rel-in-class)). What does this tell us about students and classes?[🔗](#subsec-relations-generally-20-1-1) Solution. By following the relation, we could start by saying Al is in Calculus, and Calculus is taken by Al, so Al is related to Al. But also , Calculus is taken by Bob, so now Al is also related to Bob. Is Bob related to Al as well? Yes, since Bob is taking Calculus and Calculus is taken by Al.[🔗](#subsec-relations-generally-20-2-1) The composition is telling us which pairs of students have at least one class in common. That’s almost all pairs of students, except that Dirk is not related to Bob or Eva, since they don’t take Statistics, and that is the only class he takes.[🔗](#subsec-relations-generally-20-2-2) Instead of writing out the relation (which will almost be all of \(A \times A\)), here is the graph representation.[🔗](#subsec-relations-generally-20-2-3) ![The graph representing the composition of T and its inverse.](generated/latex-image/inv-relation.svg) While we drew a directed multigraph here, the arrows going both ways mean that we really could have drawn just a multigraph.[🔗](#subsec-relations-generally-20-2-5) [🔗](#subsec-relations-generally-20-2) [🔗](#subsec-relations-generally-20)[🔗](#subsec-relations-generally)

### Subsection Properties of Relations

From this point on, we will just consider relations on a single set (so from a set to itself). To help understand these relations, let’s consider some basic properties a relation might or might not have.[🔗](#subsec-properties-of-relations-2)

#### Definition 2.6.9. Reflexive, Symmetric, and Transitive.

Let \(R\) be a relation on the set \(A\text{.}\) We say,

- \(R\) is reflexive provided \((a,a) \in R\) for all \(a \in A\text{.}\)[🔗](#def-relation-properties-2-1-3-1-1) [🔗](#def-relation-properties-2-1-3-1)
- \(R\) is symmetric provided, for all \(a, b \in A\text{,}\) if \((a,b) \in R\) then \((b,a) \in R\text{.}\)[🔗](#def-relation-properties-2-1-3-2-1) [🔗](#def-relation-properties-2-1-3-2)
- \(R\) is transitive provided, for all \(a, b,c \in A\text{,}\) if \((a,b) \in R\) and \((b,c) \in R\text{,}\) then \((a,c)\in R\text{.}\)[🔗](#def-relation-properties-2-1-3-3-1) [🔗](#def-relation-properties-2-1-3-3)

[🔗](#def-relation-properties-2-1) [🔗](#def-relation-properties)Let’s examine each of these properties carefully.[🔗](#subsec-properties-of-relations-4) It will be helpful to consider a few standard examples of relations on sets as we go. Most relations we consider here will be written using *infix* notation, just meaning that we put the relation symbol between the two things it is relating. For example, the *less than* relation is almost always written as \(2 \lt 6\) rather than writing \((2,6) \in \lt\text{.}\)[🔗](#subsec-properties-of-relations-5)

#### Example 2.6.10. Reflexive and non-reflexive relations.

A relation is reflexive when every element is related to itself. The following are reflexive relations:

- The “less-than-or-equal-to” relation on any set of numbers. Is it the case that \(3 \le 3\text{?}\) More importantly, is every number no greater than itself? Since the answer is yes, this relation is reflexive.[🔗](#subsec-properties-of-relations-6-2-1-1-1) [🔗](#subsec-properties-of-relations-6-2-1-1)
- The “within 3” relation, that holds of two numbers \(a\) and \(b\) provided \(|a-b| \le 3\text{.}\) To prove that this is reflexive, we simply note that \(|a-a| = 0 \le 3\text{.}\)[🔗](#subsec-properties-of-relations-6-2-1-2-1) [🔗](#subsec-properties-of-relations-6-2-1-2)
- The “is a multiple of” relation from [Example 2.6.4](sec_gt-relations.html#rel-multiple-of). Note that the directed multigraph for this relation had loops at every vertex.[🔗](#subsec-properties-of-relations-6-2-1-3-1) [🔗](#subsec-properties-of-relations-6-2-1-3)

[🔗](#subsec-properties-of-relations-6-2) However, these relations are not reflexive:

- The “sums to zero” relation, that holds on numbers \(a\) and \(b\) if \(a+b = 0\text{.}\) Note that while \(0 + 0 = 0\text{,}\) so \((0,0)\) is an element of the relation, every other number is not related to itself.[🔗](#subsec-properties-of-relations-6-3-1-1-1) [🔗](#subsec-properties-of-relations-6-3-1-1)
- Any relation that is described by a graph. Remember, graphs cannot have edges looping back to a single vertex, so the edge relation on a graph is not reflexive. (A multigraph could be reflexive or not).[🔗](#subsec-properties-of-relations-6-3-1-2-1) [🔗](#subsec-properties-of-relations-6-3-1-2)

[🔗](#subsec-properties-of-relations-6-3) [🔗](#subsec-properties-of-relations-6)If no element is related to itself (such as in the edge relation for a graph), then we call the relation irreflexive. Of course, some relations are neither reflexive nor irreflexive.[🔗](#subsec-properties-of-relations-7) Checking that a relation is reflexive is relatively easy. The other two properties are phrased as implications, which makes them a little more complex.[🔗](#subsec-properties-of-relations-8)

#### Example 2.6.11. Symmetric and non-symmetric relations.

Essentially, symmetric relations are the ones that work “both ways.” More precisely, if \(a\) is related to \(b\text{,}\) then \(b\) is also related to \(a\text{.}\)[🔗](#subsec-properties-of-relations-9-2) The following relations are symmetric.

- The “within 3” relation: if \(|a-b| \le 3\) then \(|b-a| \le 3\text{.}\)[🔗](#subsec-properties-of-relations-9-3-1-1-1) [🔗](#subsec-properties-of-relations-9-3-1-1)
- The “sums to zero” relation: if \(a+b = 0\text{,}\) then certainly \(b + a = 0\text{.}\)[🔗](#subsec-properties-of-relations-9-3-1-2-1) [🔗](#subsec-properties-of-relations-9-3-1-2)
- For any graph, the edge relation is symmetric. Of course, for *directed* graphs this is usually not true.[🔗](#subsec-properties-of-relations-9-3-1-3-1) [🔗](#subsec-properties-of-relations-9-3-1-3)

[🔗](#subsec-properties-of-relations-9-3) On the other hand, these relations are not symmetric.

- \(\le\) is not symmetric. All we need to do to prove that a relation is not symmetric is to find some \(a\) and \(b\) such that \(a \le b\) but \(b \not\le a\text{.}\) Well, \(3 \le 4\text{,}\) but \(4 \not\le 3\text{.}\) QED.[🔗](#subsec-properties-of-relations-9-4-1-1-1) [🔗](#subsec-properties-of-relations-9-4-1-1)
- The “is a multiple of” relation is not symmetric. \(6\) is a multiple of \(2\) but \(2\) is not a multiple of \(6\text{.}\)[🔗](#subsec-properties-of-relations-9-4-1-2-1) [🔗](#subsec-properties-of-relations-9-4-1-2)

[🔗](#subsec-properties-of-relations-9-4) [🔗](#subsec-properties-of-relations-9)Relations that are not symmetric could in fact be antisymmetric, meaning the *only* elements for which both \((a,b)\) and \((b,a)\) are in the relation is when \(a = b\text{.}\) Note that there are relations that are neither symmetric nor antisymmetric.[🔗](#subsec-properties-of-relations-10) Using the language of inverse relations, a relation is symmetric if and only if the relation is equal to its inverse.[🔗](#subsec-properties-of-relations-11)

#### Example 2.6.12. Transitive and non-transitive relations.

If \(a\) is related to \(b\text{,}\) and \(b\) is related to \(c\text{,}\) does that mean \(a\) is related to \(c\text{?}\) If this is true no matter what \(a\text{,}\) \(b\text{,}\) and \(c\) are, then we say the relation is transitive.[🔗](#subsec-properties-of-relations-12-2) Here are some transitive relations.

- \(\le\text{.}\) Suppose \(a \le b\) and \(b \le c\text{.}\) Then clearly \(a \le c\text{.}\)[🔗](#subsec-properties-of-relations-12-3-1-1-1) [🔗](#subsec-properties-of-relations-12-3-1-1)
- The “is a multiple of” relation. This is a good one to write a proof for: Suppose \(a\) is a multiple of \(b\) and that \(b\) is a multiple of \(c\text{.}\) Then \(a = bk\) for some integer \(k\) and \(b = cj\) for some integer \(j\text{.}\) By substitution, \(a = cjk\text{,}\) so \(a\) is a multiple of \(c\text{.}\)[🔗](#subsec-properties-of-relations-12-3-1-2-1) [🔗](#subsec-properties-of-relations-12-3-1-2)

[🔗](#subsec-properties-of-relations-12-3) However, the following relations are not transitive.

- The “within 3” relation is not transitive. All we need to do is find three numbers that fail to meet the condition. How about \(1\text{,}\) \(3\text{,}\) and \(5\text{?}\) Here \(1\) is within 3 of \(3\text{,}\) and \(3\) is within 3 of \(5\text{,}\) but \(|1 - 5| = 4\) so the relation does not hold of \((1,5)\text{.}\)[🔗](#subsec-properties-of-relations-12-4-1-1-1) [🔗](#subsec-properties-of-relations-12-4-1-1)
- The “sums to zero” relation is not transitive. Notice that we never claimed that \(a\text{,}\) \(b\text{,}\) and \(c\) need to be different numbers. Let \(a = 5\text{,}\) \(b = -5\text{,}\) and \(c = 5\text{.}\) Then \(a+b = 0\) and \(b + c = 0\text{,}\) so the relation holds of \((a,b)\) and \((b,c)\text{.}\) But \(a + c = 10\) so the relation does not hold of \((a,c)\text{.}\)[🔗](#subsec-properties-of-relations-12-4-1-2-1) [🔗](#subsec-properties-of-relations-12-4-1-2)

[🔗](#subsec-properties-of-relations-12-4) The edge relation for a graph might or might not be transitive. What would a graph look like if its edge relation was transitive?[🔗](#subsec-properties-of-relations-12-5) [🔗](#subsec-properties-of-relations-12)[🔗](#subsec-properties-of-relations)

### Subsection Equivalence Relations

Now we will do something very typical for mathematics: We will look at our most common types of relations, consider what properties these have, and then classify other relations that also have these properties as a specific class of relations.[🔗](#subsec_equivalence-relations-2) The relation we are all most familiar with is equality. Which properties of relations does the equality relation possess? Certainly everything is equal to itself, so equality is *reflexive*. If \(a = b\text{,}\) then \(b = a\text{,}\) so equality is *symmetric*. If \(a = b\) and \(b = c\text{,}\) then \(a = c\text{,}\) so equality is *transitive*.[🔗](#subsec_equivalence-relations-3) What other relations are *reflexive*, *symmetric*, and *transitive*? Exactly those relations that behave like equality. We call such relations equivalence relations.[🔗](#subsec_equivalence-relations-4)

#### Definition 2.6.13. Equivalence Relation.

A relation that is reflexive, symmetric, and transitive is called an equivalence relation.[🔗](#def-equivalence-relation-2-1) [🔗](#def-equivalence-relation)

#### Remark 2.6.14.

Another example of a type of relation that is modeled after a classic relation is a partial order. This is a relation that is reflexive, *antisymmetric*, and transitive, just like less-than-or-equal-to. Perhaps you noticed already that the subset relation, written \(\subseteq\text{,}\) feels a lot like \(\le\text{.}\) This is because \(\subseteq\) is also a partial order. So is the “is a multiple of” relation we saw above.[🔗](#subsec_equivalence-relations-6-1) There are lots of interesting things we can say about partial orders and the sets they partially order, called partially ordered sets or PoSets. Another time.[🔗](#subsec_equivalence-relations-6-2) [🔗](#subsec_equivalence-relations-6)None of the examples we have considered so far in this section have been equivalence relations, but they are ubiquitous in mathematics. They are so common that it is easy to overlook them as anything worth saying something about at all. Let’s see some examples.[🔗](#subsec_equivalence-relations-7)

#### Example 2.6.15.

Prove that the relation \(\equiv_2\text{,}\) which holds of two integers if their difference is even, is an equivalence relation. That is, \(a \equiv_2 b\) if and only if \(b-a = 2k\) for some integer \(k\text{.}\)[🔗](#eg_cong-mod-2-1-1) Solution. We simply check the three required properties.

1. \(\equiv_2\) is reflexive: for any integer \(a\text{,}\) we have \(a - a = 0\) and \(0 = 2k\) for \(k = 0\text{,}\) so \(a \equiv_2 a\text{.}\)[🔗](#eg_cong-mod-2-2-1-1-1-1) [🔗](#eg_cong-mod-2-2-1-1-1)
2. \(\equiv_2\) is symmetric: Fix arbitrary integers \(a\) and \(b\text{,}\) and assume \(a \equiv_2 b\text{.}\) That means that \(b-a = 2k\) for some integer \(k\text{.}\) What about \(a - b\text{?}\) Well, we will have \(a-b = 2(-k)\text{,}\) and \(-k\) is an integer, so we have \(b \equiv_2 a\text{.}\)[🔗](#eg_cong-mod-2-2-1-1-2-1) [🔗](#eg_cong-mod-2-2-1-1-2)
3. \(\equiv_2\) is transitive: Fix arbitrary integers \(a\text{,}\) \(b\text{,}\) and \(c\) and assume \(a \equiv_2 b\) and \(b \equiv_2 c\text{.}\) This means that \(b-a = 2k\) and \(c-b = 2j\) for some integers \(k\) and \(j\text{.}\) What about \(c - a\text{?}\) Well, \begin{equation*} c - a = (c- b) + (b - a) = 2k+2j = 2(k+j)\text{.} \end{equation*} Since \(k+j\) is an integer, we see that \(a \equiv_2 c\) as required. [🔗](#eg_cong-mod-2-2-1-1-3-1) [🔗](#eg_cong-mod-2-2-1-1-3)

[🔗](#eg_cong-mod-2-2-1) [🔗](#eg_cong-mod-2-2) [🔗](#eg_cong-mod-2)

#### Example 2.6.16.

Let’s call two graphs “degree-sequence-equivalent” if they have the same degree sequence. Is this an equivalence relation?[🔗](#subsec_equivalence-relations-9-1-1) Solution. Yes it is. Clearly every graph has the same degree sequence as itself, so the relation is reflexive. If \(G_1\) has the same degree sequence as \(G_2\text{,}\) then \(G_2\) has the same degree sequence as \(G_1\text{,}\) so the relation is transitive. Finally, if \(G_1\) has the same degree sequence as \(G_2\text{,}\) which has the same degree sequence as \(G_3\text{,}\) then they all have the same degree sequence, so \(G_1\) has the same degree sequence as \(G_3\) (i.e., the relation is transitive).[🔗](#subsec_equivalence-relations-9-2-1) [🔗](#subsec_equivalence-relations-9-2) [🔗](#subsec_equivalence-relations-9)This example is almost too obvious. That’s because we said that two things are related if a well-defined property of those things was *equal*, and equality satisfies the properties of an equivalence relation. Our next goal is to try to make better sense of this and see that it is exactly what gives us an equivalence relation.[🔗](#subsec_equivalence-relations-10) [🔗](#subsec_equivalence-relations)

### Subsection Equivalence Classes and Partitions

Given *any* relation \(R\text{,}\) we can look at the *set* of elements that are related to a particular element. For the “is taking” relation, we can ask what classes Al is taking (i.e., the classes related to Al). For the “is a multiple of”, we can ask which numbers 6 a multiple of. One way to study the relation is to study the sets of things related to each element.[🔗](#subsec-equivalence-classes-and-partitions-2)

#### Definition 2.6.17.

Let \(R\) be a relation on the set \(A\text{,}\) and let \(a\) be an element of \(A\text{.}\) The relation class of \(a\text{,}\) written \([a]\) is the set of all elements \(b\) such that \((a,b) \in R\) (the set of \(b\) that are related to \(a\) by \(R\)). That is, \begin{equation*} [a] = \{b \in A \st (a,b) \in R\}\text{.} \end{equation*} [🔗](#def-relation-classes-1-1) When \(R\) is an equivalence relation, we call relation classes equivalence classes.[🔗](#def-relation-classes-1-2) [🔗](#def-relation-classes)

#### Example 2.6.18.

Find the relation classes for the “is a multiple of” relation on the set \(A = \{1,2,3,4,5,6\}\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-4-1-1) Solution. There will be six relation classes since each element has a relation class. They are: \begin{align*} [1] = \amp \{1\}\\ [2] = \amp \{1,2\}\\ [3] = \amp \{1,3\}\\ [4] = \amp \{1,2,4\}\\ [5] = \amp \{1,5\}\\ [6] = \amp \{1,2,3,6\}. \end{align*} For example, we found \([4]\) by considering all pairs \((4,b)\) that satisfied the relation: 4 is a multiple of 1, 2, and 4, so those are the possible values of \(b\) that we find. [🔗](#subsec-equivalence-classes-and-partitions-4-2-1) Look back at the directed multigraph for this relation shown in the solution to [Example 2.6.4](sec_gt-relations.html#rel-multiple-of). What are the relation classes? They are nothing but the neighbors of each vertex (where neighbor means you follow the arrows in the correct direction).[🔗](#subsec-equivalence-classes-and-partitions-4-2-2) [🔗](#subsec-equivalence-classes-and-partitions-4-2) [🔗](#subsec-equivalence-classes-and-partitions-4)

#### Example 2.6.19.

Find the equivalence classes for the \(\equiv_2\) relation on the integers.[🔗](#subsec-equivalence-classes-and-partitions-5-1-1) Solution. On no! Our set is infinite, so we will have infinitely many relation classes? Well, we better get started...[🔗](#subsec-equivalence-classes-and-partitions-5-2-1) What numbers are related to 1? Remember, we want integers whose difference with 1 is a multiple of 2. So 3 for sure. Also 5, and 7, and -1, and -3, and... all the odds? Yes, because the difference of any two odd numbers is even. We can also say that the difference between any two even numbers is even, so the equivalence class of 2 will contain all the even numbers. So far we have: \begin{align*} [1] = \amp \{\ldots, -3, -1, 1, 3, 5, \ldots\}\\ [2] = \amp \{\ldots, -4, -2, 2, 4, 6, \ldots\} \end{align*} [🔗](#subsec-equivalence-classes-and-partitions-5-2-2) Actually, I think we are done. While \([3]\text{,}\) \([4]\text{,}\) \([5]\text{,}\) and so on are all completely valid equivalence classes, the elements that are related to \(3\) will be exactly the elements related to \(1\text{,}\) since \(1 \equiv_2 3\text{.}\) This is because the relation is transitive! If \(3 \equiv_2 b\text{,}\) then we know \(1 \equiv_2 b\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-5-2-3) So we have exactly two equivalence classes. Every integer is in exactly one of these two equivalence classes, and the equivalence class of any integer is exactly the class it belongs to.[🔗](#subsec-equivalence-classes-and-partitions-5-2-4) [🔗](#subsec-equivalence-classes-and-partitions-5-2) [🔗](#subsec-equivalence-classes-and-partitions-5)Examine the two examples above carefully. For the “is a multiple of” relation, which is NOT an equivalence relation, some elements belong to more than one (different) relation class. But for \(\equiv_2\text{,}\) which is an equivalence relation, every element is in exactly one equivalence class. This is no accident. To make sense of this, we will define a new term.[🔗](#subsec-equivalence-classes-and-partitions-6)

#### Definition 2.6.20.

Given a non-empty set \(A\text{,}\) a partition of \(A\) is a set \(P\) of non-empty subsets of \(A\) such that every element of \(A\) is in exactly one element of \(P\text{.}\)[🔗](#def-partition-1-1) [🔗](#def-partition)That definition has a lot of symbols and sets involved. It’s really not complicated though: A partition is a way to break up a set into *disjoint* subsets that *cover* the whole set. That the subsets are disjoint means no element is in *more than one* subset. That the subsets cover the set means every element is in *at least one* subset.[🔗](#subsec-equivalence-classes-and-partitions-8)

#### Example 2.6.21.

Give a few different partitions of the set \(A = \{1,2,3,4,5\}\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-9-1-1) Solution. There are so many choices here! One choice is: \begin{equation*} P_1 = \{\{1,2,3\}, \{4,5\}\}\text{.} \end{equation*} That’s a partition of \(A\) into two subsets. Another partition: \begin{equation*} P_2 = \{\{1\}, \{2\}, \{3\}, \{4\}, \{5\}\}\text{.} \end{equation*} Another: \begin{equation*} P_3 = \{\{1,3,5\}, \{2,4\}\}\text{,} \end{equation*} which happens to be a partition into even and odd numbers. We also have the trivial partition: \begin{equation*} P_4 = \{\{1,2,3,4,5\}\}\text{.} \end{equation*} Note: that is a single set inside the set \(P_4\text{.}\) [🔗](#subsec-equivalence-classes-and-partitions-9-2-1) [🔗](#subsec-equivalence-classes-and-partitions-9-2) [🔗](#subsec-equivalence-classes-and-partitions-9)It is sometimes a little confusing to think of the elements of a partition as subsets since the partition is a set, and a set of sets can be difficult to talk about. We sometimes call the partition a *collection* and each of the elements of the partition *parts* or *blocks*.[🔗](#subsec-equivalence-classes-and-partitions-10) Now the big idea: For any equivalence relation, the equivalence classes form a partition, and for any partition, we can define a relation “are in the same subset” which will be an equivalence relation. We have already seen that the equivalence classes of \(\equiv_2\) form a partition. Let’s go the other direction.[🔗](#subsec-equivalence-classes-and-partitions-11)

#### Example 2.6.22.

Define an equivalence relation \(\sim\) on the set \(A = \{1,2,3,4,5\}\) from the partition \(P = \{\{1,4\}, \{2,3,5\}\}\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-12-1-1) Solution. Say two elements of \(A\) are equivalent provided they belong to the same element of \(P\text{.}\) That is, \(1 \sim 4\) and \(4\sim 1\text{,}\) and \(2 \sim 3\text{,}\) \(2 \sim 5\text{,}\) \(3 \sim 5\text{,}\) \(3\sim 2\text{,}\) \(5\sim 2\text{,}\) and \(5\sim 3\text{.}\) Wait. We also have \(1\sim 1\text{,}\) \(2\sim 2\text{,}\) and so on, since every number is in the same subset as itself.[🔗](#subsec-equivalence-classes-and-partitions-12-2-1) It is clear from looking that this relation is reflexive, symmetric, and transitive, so is an equivalence relation.[🔗](#subsec-equivalence-classes-and-partitions-12-2-2) [🔗](#subsec-equivalence-classes-and-partitions-12-2) [🔗](#subsec-equivalence-classes-and-partitions-12)

#### Theorem 2.6.23.

Given any equivalence relation \(R\) on a set \(A\text{,}\) the equivalence classes form a partition of \(A\text{.}\)[🔗](#thm-equivalence-partition-1-1) Given any partition \(P = \{B_1, B_2, \ldots, \}\) of a set \(A\text{,}\) the relation \(\equiv_P\) defined by \(a \equiv_P b\) if and only if \(a\) and \(b\) belong to the same block of \(P\text{,}\) is an equivalence relation.[🔗](#thm-equivalence-partition-1-2) Further, the equivalence classes for the equivalence relation formed by a partition are exactly the original partition, and the equivalence relation built by the partition of its equivalence classes is exactly the original equivalence relation.[🔗](#thm-equivalence-partition-1-3) [🔗](#thm-equivalence-partition)[🔗](#subsec-equivalence-classes-and-partitions)

### Reading Questions Reading Questions

#### 1.

Consider the relation \(R\) defined on the integers that holds of \(a\) and \(b\) precisely if \(b-a \ge 4\text{.}\) So for example, \((2,7) \in R\) but \((8,6) \notin R\text{.}\) Which of the following properties of relations does \(R\) have?[🔗](#rq-gt-rel-prop-1-1)

- \(R\) is reflexive.
- If \(R\) were reflexive, then then in particular (2,2) would be in \(R\text{.}\) But \(2-2 = 0\text{,}\) which is not greater than or equal to 4.
- \(R\) is irreflexive.
- Correct. Since no integer is four or more greater than itself, the relation does not hold of any element with itself.
- \(R\) is symmetric.
- If \(R\) were symmetric, then for any \(a\) and \(b\) such that \(b-a \ge 4\text{,}\) we would also have \(a-b \ge 4\text{.}\) But this is not true. For example, \((2,10)\) is in \(R\) but \((10,2)\) is not. (We are not using the *absolute* difference.)
- \(R\) is antisymmetric.
- Correct. There are no numbers \(a\) and \(b\) such that both \(b-a \ge 4\) and \(a-b \ge 4\text{,}\) so the hypothesis of the definition of antisemetric is always false, making the entire statement in the definition true.
- \(R\) is transitive.
- Correct. If \(b-a \ge 4\) and \(c-b \ge 4\text{,}\) then \(c-a = (c-b) + (b-a) \ge 4+4 = 8\text{,}\) so \(c-a \ge 4\text{.}\)

[🔗](#rq-gt-rel-prop)

#### 2.

Not all graphs have a transitive edge relation. But do some of them? If so, give an example and explain why it is transitive. If not, explain why.[🔗](#rq-gt-rel-transgraph-1-1) [🔗](#rq-gt-rel-transgraph)

#### 3.

After reading this section, what questions do you have? Ask at least one question about this section that you are curious about.[🔗](#rq-gt-rel-q-1-1) [🔗](#rq-gt-rel-q)[🔗](#rqs-gt-relations)

### Exercises Practice Problems

#### 1.

Activate Determine which of these relations are reflexive. The variables \(x\text{,}\) \(y\text{,}\) \(x'\text{,}\) \(y'\) represent integers.[🔗](#extracted-webwork-69-1-1-1)

- \(x \sim y\) if and only if \(x + y\) is odd.[🔗](#extracted-webwork-69-1-1-2-1-1-1) [🔗](#extracted-webwork-69-1-1-2-1-1)
- \(x \sim y\) if and only if \(x - y\) is positive.[🔗](#extracted-webwork-69-1-1-2-1-2-1) [🔗](#extracted-webwork-69-1-1-2-1-2)
- \(x \sim y\) if and only if \(xy \geq 0\) .[🔗](#extracted-webwork-69-1-1-2-1-3-1) [🔗](#extracted-webwork-69-1-1-2-1-3)
- \(x \sim y\) if and only if \(x + y\) is even.[🔗](#extracted-webwork-69-1-1-2-1-4-1) [🔗](#extracted-webwork-69-1-1-2-1-4)
- \(x \sim y\) if and only if \(x + y\) is positive.[🔗](#extracted-webwork-69-1-1-2-1-5-1) [🔗](#extracted-webwork-69-1-1-2-1-5)

[🔗](#extracted-webwork-69-1-1-2) [🔗](#ww-gt-relations-reflexive)

#### 2.

Activate Determine which of these relations are symmetric. The variables \(x\text{,}\) \(y\text{,}\) \(x'\text{,}\) \(y'\) represent integers.[🔗](#extracted-webwork-70-1-1-1)

- \(x \sim y\) if and only if \(x = |y|\text{.}\)[🔗](#extracted-webwork-70-1-1-2-1-1-1) [🔗](#extracted-webwork-70-1-1-2-1-1)
- \(x \sim y\) if and only if \(x + y\) is odd.[🔗](#extracted-webwork-70-1-1-2-1-2-1) [🔗](#extracted-webwork-70-1-1-2-1-2)
- \(x \sim y\) if and only if \(xy\) is positive.[🔗](#extracted-webwork-70-1-1-2-1-3-1) [🔗](#extracted-webwork-70-1-1-2-1-3)
- \(x \sim y\) if and only if \(x +2y\) is positive.[🔗](#extracted-webwork-70-1-1-2-1-4-1) [🔗](#extracted-webwork-70-1-1-2-1-4)
- \(x \sim y\) if and only if \(xy\) is negative.[🔗](#extracted-webwork-70-1-1-2-1-5-1) [🔗](#extracted-webwork-70-1-1-2-1-5)

[🔗](#extracted-webwork-70-1-1-2) [🔗](#ww-gt-relations-symmetric)

#### 3.

Activate Determine which of these relations are transitive. The variables \(x\text{,}\) \(y\text{,}\) \(x'\text{,}\) \(y'\) represent integers.[🔗](#extracted-webwork-71-1-1-1)

- \(x \sim y\) if and only if \(x + y\) is positive.[🔗](#extracted-webwork-71-1-1-2-1-1-1) [🔗](#extracted-webwork-71-1-1-2-1-1)
- \(x \sim y\) if and only if \(x + y\) is positive.[🔗](#extracted-webwork-71-1-1-2-1-2-1) [🔗](#extracted-webwork-71-1-1-2-1-2)
- \(x \sim y\) if and only if \(x + y\) is even.[🔗](#extracted-webwork-71-1-1-2-1-3-1) [🔗](#extracted-webwork-71-1-1-2-1-3)
- \(x \sim y\) if and only if \(x - y\) is negative.[🔗](#extracted-webwork-71-1-1-2-1-4-1) [🔗](#extracted-webwork-71-1-1-2-1-4)
- \((x,y) \sim (x',y')\) if and only if \(x+ y' = x' + y\text{.}\)[🔗](#extracted-webwork-71-1-1-2-1-5-1) [🔗](#extracted-webwork-71-1-1-2-1-5)
- \(x \sim y\) if and only if \(xy \geq 0\) .[🔗](#extracted-webwork-71-1-1-2-1-6-1) [🔗](#extracted-webwork-71-1-1-2-1-6)

[🔗](#extracted-webwork-71-1-1-2) [🔗](#ww-gt-relations-transitive)

#### 4.

Activate Define relations \(R_1,\ldots,R_6\) on \({ 1,2,3,4 }\) by[🔗](#extracted-webwork-72-1-1-1) \(R_1=\lbrace (2,2),(2,3),(2,4),(3,2),(3,3),(3,4) \rbrace,\)[🔗](#extracted-webwork-72-1-1-2) \(R_2 = \lbrace (1,1),(1,2),(2,1),(2,2),(3,3),(4,4)\rbrace,\)[🔗](#extracted-webwork-72-1-1-3) \(R_3 = \lbrace (2,4),(4,2) \rbrace\) ,[🔗](#extracted-webwork-72-1-1-4) \(R_4 = \lbrace (1,2),(2,3),(3,4)\rbrace\text{,}\)[🔗](#extracted-webwork-72-1-1-5) \(R_5 = \lbrace (1,1),(2,2),(3,3),(4,4)\rbrace,\)[🔗](#extracted-webwork-72-1-1-6) \(R_6=\lbrace (1,3),(1,4),(2,3),(2,4),(3,1),(3,4) \rbrace,\)[🔗](#extracted-webwork-72-1-1-7) Which of the following statements are correct?[🔗](#extracted-webwork-72-1-1-8) Check ALL correct answers below.[🔗](#extracted-webwork-72-1-1-9)

- \(R_4\) is transitive[🔗](#extracted-webwork-72-1-1-10-1-1-1) [🔗](#extracted-webwork-72-1-1-10-1-1)
- \(R_1\) is reflexive[🔗](#extracted-webwork-72-1-1-10-1-2-1) [🔗](#extracted-webwork-72-1-1-10-1-2)
- \(R_3\) is reflexive[🔗](#extracted-webwork-72-1-1-10-1-3-1) [🔗](#extracted-webwork-72-1-1-10-1-3)
- \(R_4\) is symmetric[🔗](#extracted-webwork-72-1-1-10-1-4-1) [🔗](#extracted-webwork-72-1-1-10-1-4)
- \(R_6\) is symmetric[🔗](#extracted-webwork-72-1-1-10-1-5-1) [🔗](#extracted-webwork-72-1-1-10-1-5)
- \(R_4\) is antisymmetric[🔗](#extracted-webwork-72-1-1-10-1-6-1) [🔗](#extracted-webwork-72-1-1-10-1-6)
- \(R_1\) is not symmetric[🔗](#extracted-webwork-72-1-1-10-1-7-1) [🔗](#extracted-webwork-72-1-1-10-1-7)
- \(R_2\) is reflexive[🔗](#extracted-webwork-72-1-1-10-1-8-1) [🔗](#extracted-webwork-72-1-1-10-1-8)
- \(R_3\) is transitive[🔗](#extracted-webwork-72-1-1-10-1-9-1) [🔗](#extracted-webwork-72-1-1-10-1-9)
- \(R_3\) is symmetric[🔗](#extracted-webwork-72-1-1-10-1-10-1) [🔗](#extracted-webwork-72-1-1-10-1-10)
- \(R_5\) is transitive[🔗](#extracted-webwork-72-1-1-10-1-11-1) [🔗](#extracted-webwork-72-1-1-10-1-11)
- \(R_2\) is not transitive[🔗](#extracted-webwork-72-1-1-10-1-12-1) [🔗](#extracted-webwork-72-1-1-10-1-12)
- \(R_5\) is not reflexive[🔗](#extracted-webwork-72-1-1-10-1-13-1) [🔗](#extracted-webwork-72-1-1-10-1-13)

[🔗](#extracted-webwork-72-1-1-10) [🔗](#ww-gt-relations-pairs)

#### 5.

Activate Given the following relations on the set of all people. Check ALL correct answers from the following lists:[🔗](#extracted-webwork-73-1-1-1) (a) \(a\) is older than \(b\)[🔗](#extracted-webwork-73-1-1-2)

- reflexive[🔗](#extracted-webwork-73-1-1-3-1-1-1) [🔗](#extracted-webwork-73-1-1-3-1-1)
- transitive[🔗](#extracted-webwork-73-1-1-3-1-2-1) [🔗](#extracted-webwork-73-1-1-3-1-2)
- antisymmetric[🔗](#extracted-webwork-73-1-1-3-1-3-1) [🔗](#extracted-webwork-73-1-1-3-1-3)
- symmetric[🔗](#extracted-webwork-73-1-1-3-1-4-1) [🔗](#extracted-webwork-73-1-1-3-1-4)
- irreflexive[🔗](#extracted-webwork-73-1-1-3-1-5-1) [🔗](#extracted-webwork-73-1-1-3-1-5)

[🔗](#extracted-webwork-73-1-1-3) (b) \(a\) and \(b\) have a common grandparent[🔗](#extracted-webwork-73-1-1-4)

- irreflexive[🔗](#extracted-webwork-73-1-1-5-1-1-1) [🔗](#extracted-webwork-73-1-1-5-1-1)
- transitive[🔗](#extracted-webwork-73-1-1-5-1-2-1) [🔗](#extracted-webwork-73-1-1-5-1-2)
- symmetric[🔗](#extracted-webwork-73-1-1-5-1-3-1) [🔗](#extracted-webwork-73-1-1-5-1-3)
- reflexive[🔗](#extracted-webwork-73-1-1-5-1-4-1) [🔗](#extracted-webwork-73-1-1-5-1-4)
- antisymmetric[🔗](#extracted-webwork-73-1-1-5-1-5-1) [🔗](#extracted-webwork-73-1-1-5-1-5)

[🔗](#extracted-webwork-73-1-1-5) (c) \(a\) has the same first name as \(b\)[🔗](#extracted-webwork-73-1-1-6)

- irreflexive[🔗](#extracted-webwork-73-1-1-7-1-1-1) [🔗](#extracted-webwork-73-1-1-7-1-1)
- transitive[🔗](#extracted-webwork-73-1-1-7-1-2-1) [🔗](#extracted-webwork-73-1-1-7-1-2)
- antisymmetric[🔗](#extracted-webwork-73-1-1-7-1-3-1) [🔗](#extracted-webwork-73-1-1-7-1-3)
- symmetric[🔗](#extracted-webwork-73-1-1-7-1-4-1) [🔗](#extracted-webwork-73-1-1-7-1-4)
- reflexive[🔗](#extracted-webwork-73-1-1-7-1-5-1) [🔗](#extracted-webwork-73-1-1-7-1-5)

[🔗](#extracted-webwork-73-1-1-7) (d) \(a\) and \(b\) were born on the same day[🔗](#extracted-webwork-73-1-1-8)

- transitive[🔗](#extracted-webwork-73-1-1-9-1-1-1) [🔗](#extracted-webwork-73-1-1-9-1-1)
- antisymmetric[🔗](#extracted-webwork-73-1-1-9-1-2-1) [🔗](#extracted-webwork-73-1-1-9-1-2)
- irreflexive[🔗](#extracted-webwork-73-1-1-9-1-3-1) [🔗](#extracted-webwork-73-1-1-9-1-3)
- symmetric[🔗](#extracted-webwork-73-1-1-9-1-4-1) [🔗](#extracted-webwork-73-1-1-9-1-4)
- reflexive[🔗](#extracted-webwork-73-1-1-9-1-5-1) [🔗](#extracted-webwork-73-1-1-9-1-5)

[🔗](#extracted-webwork-73-1-1-9) [🔗](#ww-gt-relations-tree)

#### 6.

Activate Given the following relations on the set of all integers where \((x,y) \in R\) if and only if the following is satisfied. (Check ALL correct answers from the following lists ):[🔗](#extracted-webwork-74-1-1-1) (a) \(x+y = 0\)[🔗](#extracted-webwork-74-1-1-2)

- reflexive[🔗](#extracted-webwork-74-1-1-3-1-1-1) [🔗](#extracted-webwork-74-1-1-3-1-1)
- irreflexive[🔗](#extracted-webwork-74-1-1-3-1-2-1) [🔗](#extracted-webwork-74-1-1-3-1-2)
- transitive[🔗](#extracted-webwork-74-1-1-3-1-3-1) [🔗](#extracted-webwork-74-1-1-3-1-3)
- antisymmetric[🔗](#extracted-webwork-74-1-1-3-1-4-1) [🔗](#extracted-webwork-74-1-1-3-1-4)
- symmetric[🔗](#extracted-webwork-74-1-1-3-1-5-1) [🔗](#extracted-webwork-74-1-1-3-1-5)

[🔗](#extracted-webwork-74-1-1-3) (b) \(x - y\) is an integer[🔗](#extracted-webwork-74-1-1-4)

- irreflexive[🔗](#extracted-webwork-74-1-1-5-1-1-1) [🔗](#extracted-webwork-74-1-1-5-1-1)
- reflexive[🔗](#extracted-webwork-74-1-1-5-1-2-1) [🔗](#extracted-webwork-74-1-1-5-1-2)
- symmetric[🔗](#extracted-webwork-74-1-1-5-1-3-1) [🔗](#extracted-webwork-74-1-1-5-1-3)
- antisymmetric[🔗](#extracted-webwork-74-1-1-5-1-4-1) [🔗](#extracted-webwork-74-1-1-5-1-4)
- transitive[🔗](#extracted-webwork-74-1-1-5-1-5-1) [🔗](#extracted-webwork-74-1-1-5-1-5)

[🔗](#extracted-webwork-74-1-1-5) (c) \(x=2y\)[🔗](#extracted-webwork-74-1-1-6)

- irreflexive[🔗](#extracted-webwork-74-1-1-7-1-1-1) [🔗](#extracted-webwork-74-1-1-7-1-1)
- symmetric[🔗](#extracted-webwork-74-1-1-7-1-2-1) [🔗](#extracted-webwork-74-1-1-7-1-2)
- reflexive[🔗](#extracted-webwork-74-1-1-7-1-3-1) [🔗](#extracted-webwork-74-1-1-7-1-3)
- transitive[🔗](#extracted-webwork-74-1-1-7-1-4-1) [🔗](#extracted-webwork-74-1-1-7-1-4)
- antisymmetric[🔗](#extracted-webwork-74-1-1-7-1-5-1) [🔗](#extracted-webwork-74-1-1-7-1-5)

[🔗](#extracted-webwork-74-1-1-7) (d) \(xy > 1\)[🔗](#extracted-webwork-74-1-1-8)

- irreflexive[🔗](#extracted-webwork-74-1-1-9-1-1-1) [🔗](#extracted-webwork-74-1-1-9-1-1)
- antisymmetric[🔗](#extracted-webwork-74-1-1-9-1-2-1) [🔗](#extracted-webwork-74-1-1-9-1-2)
- reflexive[🔗](#extracted-webwork-74-1-1-9-1-3-1) [🔗](#extracted-webwork-74-1-1-9-1-3)
- symmetric[🔗](#extracted-webwork-74-1-1-9-1-4-1) [🔗](#extracted-webwork-74-1-1-9-1-4)
- transitive[🔗](#extracted-webwork-74-1-1-9-1-5-1) [🔗](#extracted-webwork-74-1-1-9-1-5)

[🔗](#extracted-webwork-74-1-1-9) [🔗](#ww-gt-relations-algebraic)[🔗](#practice_gt-relations)

### Exercises Additional Exercises

#### 1.

Consider the relation \(\gt\) on the set \(\{1,2,\ldots,8\}\text{.}\)[🔗](#exercises_gt-relations-2-1-1)

#### (a)

Draw the directed graph of the relation \(\gt\text{.}\)[🔗](#exercises_gt-relations-2-2-1-1) [🔗](#exercises_gt-relations-2-2)

#### (b)

Draw the directed graph for the inverse relation \(\gt\inv\text{.}\)[🔗](#exercises_gt-relations-2-3-1-1) [🔗](#exercises_gt-relations-2-3)

#### (c)

Is the inverse relation of \(\gt\) the same as the relation \(\le\text{?}\) Explain.[🔗](#exercises_gt-relations-2-4-1-1) [🔗](#exercises_gt-relations-2-4)[🔗](#exercises_gt-relations-2)

#### 2.

True or false: for any relation \(R\) on a set \(A\text{,}\) the relation \(R\inv\) is symmetric if and only if \(R\) is symmetric. Justify your answer.[🔗](#exercises_gt-relations-3-1-1) [🔗](#exercises_gt-relations-3)

#### 3.

True or false: for any relation \(R\) on a set \(A\text{,}\) the composition of \(R\) with its inverse, \(R\circ R\inv\text{,}\) is always reflexive. Justify your answer.[🔗](#exercises_gt-relations-4-1-1) [🔗](#exercises_gt-relations-4)

#### 4.

Find, if possible, an example of a relation on the set \(\{1,2,3,4\}\) that is reflexive and symmetric, but not transitive. If such a relation exists, draw the directed multigraph of the relation and list the ordered pairs that define it. Explain your answers.[🔗](#exercises_gt-relations-5-1-1) [🔗](#exercises_gt-relations-5)

#### 5.

Find, if possible, an example of a relation on the set \(\{1,2,3,4\}\) that is reflexive and transitive, but not symmetric. If such a relation exists, draw the directed multigraph of the relation and list the ordered pairs that define it. Explain your answers.[🔗](#exercises_gt-relations-6-1-1) [🔗](#exercises_gt-relations-6)

#### 6.

Find, if possible, an example of a relation on the set \(\{1,2,3,4\}\) that is symmetric and transitive, but not reflexive. If such a relation exists, draw the directed multigraph of the relation and list the ordered pairs that define it. Explain your answers.[🔗](#exercises_gt-relations-7-1-1) [🔗](#exercises_gt-relations-7)

#### 7.

What is wrong with the following argument that any relation that is symmetric and transitive must be reflexive?[🔗](#exercises_gt-relations-8-1-1)

> Suppose \(R\) is a relation on a set \(A\) that is symmetric and transitive. Since \(R\) is symmetric, if \(aRb\text{,}\) then \(bRa\) holds. Since \(R\) is transitive, if \(aRb\) and \(bRa\text{,}\) then \(aRb\) holds. Since this is true for all elements \(a\text{,}\) we have that \(aRa\) is true for all \(a\) in \(A\text{,}\) so \(R\) is reflexive.[🔗](#exercises_gt-relations-8-1-2-1)
> > [🔗](#exercises_gt-relations-8-1-2)

[🔗](#exercises_gt-relations-8)

#### 8.

Suppose \(R\) is an equivalence relation on the set \(A = \{1,2,\ldots,6\}\text{.}\) What could the directed multigraph for \(R\) look like? Give at least two different examples of such \(R\) and their graphs to illustrate your answer.[🔗](#exercises_gt-relations-9-1-1) [🔗](#exercises_gt-relations-9)

#### 9.

Consider the relation \(R\) on the set \(A = \{1,2,3,4,5\}\) defined by \(R = \{(1,2), (2,3), (3,4), (4,5), (5,1), (2,1), (3,1), (4,1), (5,1)\}\text{.}\) Is \(R\) an equivalence relation? Justify your answer.[🔗](#exercises_gt-relations-10-1-1) Regardless of your answer, what do the relation classes \([a]\) for \(a \in R\) look like? Can you tell whether \(R\) is an equivalence relation from this information?[🔗](#exercises_gt-relations-10-1-2) [🔗](#exercises_gt-relations-10)

#### 10.

Consider the “loner” relation on a set of students that describes friendships, and holds *only* between a student and themselves (i.e., nobody is friends with anyone other than themselves). Is this an equivalence relation? Justify your answer. If it is an equivalence relation, what do the equivalence classes look like?[🔗](#exercises_gt-relations-11-1-1) [🔗](#exercises_gt-relations-11)[🔗](#exercises_gt-relations)[🔗](#sec_gt-relations) [&#xe5cb;Prev](sec_coloring.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_matchings.html) [Feedback](/cdn-cgi/l/email-protection#b7d8c4d4d6c599dbd2c1ded9f7c2d9d4d899d2d3c2)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_gt-relations-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_gt-relations-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
