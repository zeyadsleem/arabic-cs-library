---
title: "Proofs about Discrete Structures"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_logic-structures.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 1.5 Proofs about Discrete Structures

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_logic-structures-2-1-1)

- Read and comprehend definitions related to discrete structures, so you can apply the definitions correctly.[🔗](#sec_logic-structures-2-2-1-1) [🔗](#sec_logic-structures-2-2-1)
- Write proofs about discrete structures.[🔗](#sec_logic-structures-2-2-2-1) [🔗](#sec_logic-structures-2-2-2)

[🔗](#sec_logic-structures-2)

### Subsection Section Preview

#### Investigate!

Suppose there are 15 people at a party. Most people know each other already, but there are still some people who decide to shake hands. Is it possible for everyone at the party to shake hands with exactly three other people?[🔗](#logic-structures-intro-2-1-1) [🔗](#logic-structures-intro-2)So far we have seen how the logical form of a statement can inform how to build the scaffolding of a proof. This can only get us so far though: To flesh out the proof skeleton requires an understanding of the mathematical objects and structures the proofs are about. Some of this can come from carefully reading definitions. Yet there is also some less concrete understanding and intuition that comes from working with the objects and structures that can lead to that “ah-ha!” moment of inspiration that suggests how to proceed with a proof.[🔗](#logic-structures-intro-3)

#### By the way...

Why are we writing proofs? Besides practice in becoming better reasoners, diving into careful proofs about discrete structures is a way to learn more about the structures themselves. They are a playground for exploring mathematics, to help us build intuition for mathematical structures. So we study structures to help us write proofs about them, and we write proofs about them to help understand the structures. Bootstrapping![🔗](#logic-structures-intro-4-1) Another reason to shift our focus toward proofs about discrete structures is that doing so illustrates an important feature of mathematics: abstraction. We have been proving particular facts about particular problems. We might even start to notice similarities between the proofs for some statements. This might be due to the underlying mathematical structures that the problems are (secretly) about. If we prove the general facts about these structures, then we can apply these “theorems” to many different problems.[🔗](#logic-structures-intro-5) Some discrete structures lend themselves to particular styles of proof and some “standard” proof techniques can apply to particular structures. We will see some of this here, but mostly we take this opportunity to remind ourselves of some of the basic definitions and properties for discrete structures, and use the proofs about them to help understand these better.[🔗](#logic-structures-intro-6)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-logic-structures)

In this preview activity, we will explore some basic properties of sets and functions. Later in this section, we will write proofs about these ideas.[🔗](#PA-logic-structures-2-1)

#### 1.

Activate Remember that a set is just a collection of elements. Here are two definitions about sets:

1. A set \(A\) is a subset of a set \(B\text{,}\) written \(A \subseteq B\text{,}\) provided every element in \(A\) is also an element of \(B\text{.}\)[🔗](#extracted-webwork-21-1-1-1-1-1-1) [🔗](#extracted-webwork-21-1-1-1-1-1)
2. Given sets \(A\) and \(B\text{,}\) the union of \(A\) and \(B\text{,}\) written \(A \cup B\text{,}\) is the set containing every element that is in \(A\) or \(B\) or both.[🔗](#extracted-webwork-21-1-1-1-1-2-1) [🔗](#extracted-webwork-21-1-1-1-1-2)

[🔗](#extracted-webwork-21-1-1-1) Let’s build some examples.[🔗](#extracted-webwork-21-1-1-2)

#### (a)

Let \(B = \{1, 3, 5, 7, 9\}\text{.}\) Give an example of a set \(A\) containing \(3\) elements that is a subset of \(B\text{.}\)[🔗](#extracted-webwork-21-1-2-1-1) What is \(A \cup B\) for the set \(A\) you gave as an example?[🔗](#extracted-webwork-21-1-2-1-2) [🔗](#extracted-webwork-21-1-2)

#### (b)

Give an example of two distinct sets \(A\) and \(B\) such that \(A \cup B = B\text{.}\)[🔗](#extracted-webwork-21-1-3-1-1) \(A =\) ; \(B =\) [🔗](#extracted-webwork-21-1-3-1-2) For the example you gave, is \(A \subseteq B\text{?}\)

- yes[🔗](#extracted-webwork-21-1-3-1-3-2-1-1) [🔗](#extracted-webwork-21-1-3-1-3-2-1)
- no[🔗](#extracted-webwork-21-1-3-1-3-2-2-1) [🔗](#extracted-webwork-21-1-3-1-3-2-2)

[🔗](#extracted-webwork-21-1-3-1-3) [🔗](#extracted-webwork-21-1-3)

#### (c)

Find examples, if they exist, of sets \(A\) and \(B\) such that \(A \cup B \ne B\text{.}\)[🔗](#extracted-webwork-21-1-4-1-1) \(A =\) ; \(B =\) .[🔗](#extracted-webwork-21-1-4-1-2) For the example you gave, is \(A \subseteq B\text{?}\)

- yes[🔗](#extracted-webwork-21-1-4-1-3-2-1-1) [🔗](#extracted-webwork-21-1-4-1-3-2-1)
- no[🔗](#extracted-webwork-21-1-4-1-3-2-2-1) [🔗](#extracted-webwork-21-1-4-1-3-2-2)

[🔗](#extracted-webwork-21-1-4-1-3) [🔗](#extracted-webwork-21-1-4) [🔗](#pa-logic-structure-1)

#### 2.

Which of the following are always true?[🔗](#pa-logic-structure-2-1-1)

- For any sets \(A\) and \(B\text{,}\) \(A \cup B \subseteq B\text{.}\)
- What if \(A = \{1,2,3\}\) and \(B = \{1, 3, 5\}\text{?}\)
- For any sets \(A\) and \(B\text{,}\) \(B \subseteq A \cup B\text{.}\)
- For any sets \(A\) and \(B\text{,}\) if \(A \subseteq B\text{,}\) then \(A \cup B \subseteq B\text{.}\)
- For any sets \(A\) and \(B\text{,}\) if \(A \cup B = B\text{,}\) then \(A \subseteq B\text{.}\)

[🔗](#pa-logic-structure-2)

#### 3.

Activate For any function \(f: \mathbb{N} \to \mathbb{N}\) and any set \(A \subseteq \mathbb{N}\text{,}\) we can define the image of \(A\) under \(f\) to be the set of all outputs of \(f\) when the input is an element of \(A\text{.}\) We write this as \(f(A) = \{f(x) ~:~ x \in A\}\text{.}\)[🔗](#extracted-webwork-22-1-1-1) For the following tasks, let’s explore the function \(f: \mathbb{N} \to \mathbb{N}\) defined by \(f(x) = x^2 - 3x + 8\text{.}\)[🔗](#extracted-webwork-22-1-1-2)

#### (a)

Let \(A = \{1,2,3\}\) and \(B = \{2, 4, 6\}\text{.}\) Find \(f(A)\) and \(f(B)\text{.}\) Then find \(f(A) \cup f(B)\text{.}\)[🔗](#extracted-webwork-22-1-2-1-1) \(f(A) =\) ; \(f(B) =\) ; \(f(A) \cup f(b) =\) .[🔗](#extracted-webwork-22-1-2-1-2) [🔗](#extracted-webwork-22-1-2)

#### (b)

Now find \(A \cup B\) and \(f(A \cup B)\text{.}\)[🔗](#extracted-webwork-22-1-3-1-1) \(A \cup B =\) ; \(f(A \cup B) =\) .[🔗](#extracted-webwork-22-1-3-1-2) [🔗](#extracted-webwork-22-1-3)

#### (c)

Give an example, if one exists, of two distinct sets \(A\) and \(B\) such that \(A \subseteq B\) and \(f(A) \subseteq f(B)\text{.}\)[🔗](#extracted-webwork-22-1-4-1-1) \(A =\); \(B =\).[🔗](#extracted-webwork-22-1-4-1-2) Give an example, if one exists, of two distinct sets \(A\) and \(B\) such that \(A \subseteq B\) but \(f(A) \not\subseteq f(B)\text{.}\)[🔗](#extracted-webwork-22-1-4-1-3) \(A =\); \(B =\).[🔗](#extracted-webwork-22-1-4-1-4) [🔗](#extracted-webwork-22-1-4) [🔗](#pa-logic-structure-3)[🔗](#PA-logic-structures)[🔗](#logic-structures-intro)

### Subsection Proofs about Sets

Recall that a set is an unordered collection of elements. We can describe a set by listing these elements, or by specifying a property that all elements in the set satisfy. For example, \begin{equation*} A = \{1,2,3,4,5\}\text{,} \end{equation*} or \begin{equation*} B = \{x \in \N \st x \lt 10 \}\text{.} \end{equation*} The second set here is the set of natural numbers (\(0, 1, 2, \ldots\)) less than 10. Notice that every element in \(A\) is also an element of \(B\text{.}\) Here is a definition that captures that idea. [🔗](#sec_logic-structures-4-2)

#### Definition 1.5.1.

A set \(A\) is a subset of a set \(B\text{,}\) written \(A \subseteq B\text{,}\) provided every element of \(A\) is also an element of \(B\text{.}\)[🔗](#def-subset-1-1) The set \(B\) is sometimes called a superset of \(A\text{.}\)[🔗](#def-subset-1-2) We say \(A\) is a proper subset of \(B\text{,}\) written \(A \subset B\text{,}\) provided \(A \subseteq B\) and \(A \neq B\text{.}\) In other words, if every element in \(A\) is an element in \(B\text{,}\) and there is at least one element in \(B\) that is *not* in \(A\text{.}\)[🔗](#def-subset-1-3) [🔗](#def-subset)

#### Example 1.5.2.

Let \(A = \{x \in \N \st x \lt 5\}\) and \(B = \{ x \in \N \st x^2 \lt 10\}\text{.}\) Is \(B \subseteq A\text{?}\) Is \(B\) a *proper* subset of \(A\text{?}\)[🔗](#sec_logic-structures-4-4-1-1) Solution. We are asking whether every natural number less than 5 is also a natural number whose square is less than 10. Okay, we could just write out the elements of the sets: \(A = \{0,1,2,3,4\}\) and \(B = \{0,1,2,3\}\) (since \(3^2 = 9\) and \(4^2 = 16\)). So \(B \subseteq A\text{.}\) But \(B \neq A\text{,}\) so in fact \(B \subset A\text{.}\)[🔗](#sec_logic-structures-4-4-2-1) [🔗](#sec_logic-structures-4-4-2) [🔗](#sec_logic-structures-4-4)The sets in the example above were small, and it is easy enough to write down the elements of the sets. However, we can also prove subset relationships between sets if this isn’t practical or even possible (perhaps the sets are infinite). Let’s look carefully at how we could have reasoned about the example above.[🔗](#sec_logic-structures-4-5) We claimed that every element of \(B\) was also an element of \(A\text{.}\) Another way to say this: For all numbers \(n\text{,}\) *if* \(n\) is an element of \(B\text{,}\) *then* \(n\) is also an element of \(A\text{.}\) Recognizing this as a conditional statement, we can proceed to give a direct, contrapositive, or contradiction proof of the fact. Here a direct proof would be perfectly acceptable. Let’s try it:[🔗](#sec_logic-structures-4-6)

#### Proof.

Let \(n\) be an element of the set \(B\text{.}\) Then \(n^2 \lt 10\text{,}\) by the definition of \(B\text{.}\) Since \(4^2 = 16\text{,}\) we must have that \(n \lt 4\text{.}\) By the definition of \(A\text{,}\) and the fact that \(4 \lt 5\text{,}\) we see that \(n \in A\text{.}\)[🔗](#sec_logic-structures-4-7-1) [🔗](#sec_logic-structures-4-7)To be clear, this proof is *way* more than we would normally do for this example, but its format should be illuminating. Proving that one set is a subset of another is really the same as proving an implication![🔗](#sec_logic-structures-4-8) To give an example of how we can apply the definition of “subset” in a more general setting, let’s prove a basic fact about subsets.[🔗](#sec_logic-structures-4-9)

#### Proposition 1.5.3.

For any sets \(A\text{,}\) \(B\text{,}\) and \(C\text{,}\) if \(A \subseteq B\) and \(B \subseteq C\text{,}\) then \(A \subseteq C\text{.}\)[🔗](#prop-subset-transitive-1-1) [🔗](#prop-subset-transitive)

#### Proof.

We will give a direct proof. Let \(A\text{,}\) \(B\text{,}\) and \(C\) be sets, and assume that \(A \subseteq B\) and \(B \subseteq C\text{.}\) We will prove that \(A \subseteq C\text{.}\)[🔗](#prop-subset-transitive-2-1) Let \(x\) be an element of \(A\text{.}\) Since \(A \subseteq B\text{,}\) we know that \(x \in B\text{.}\) Since \(B \subseteq C\text{,}\) we know that \(x \in C\text{.}\) Therefore, \(A \subseteq C\text{.}\)[🔗](#prop-subset-transitive-2-2) [🔗](#prop-subset-transitive-2)Now let’s prove a fact about numbers: Every multiple of 9100 is also a multiple of 13. We could factor 9100, but here is an easier way. The set of multiples of 9100 is a subset of the set of multiples of 91. And the set of multiples of 91 is a subset of the set of multiples of 13. Now apply the proposition above.[🔗](#sec_logic-structures-4-11) The proof of [Proposition 1.5.3](sec_logic-structures.html#prop-subset-transitive) is what is sometimes called an element chasing proof. By the definition of subset, \(A \subseteq B\) means every element of \(A\) is an element of \(B\text{,}\) or equivalently, for all \(x\text{,}\) if \(x\) is an element of \(A\text{,}\) then \(x\) is an element of \(B\text{.}\) One way to prove this is to “chase” the element \(x\) from \(A\) to \(B\text{.}\)[🔗](#sec_logic-structures-4-12)

#### Example 1.5.4.

Prove that if \(A \subseteq B\text{,}\) then \(A \cup B \subseteq B\text{.}\) Recall that \(A \cup B\) is the union of sets \(A\) and \(B\text{,}\) and contains all elements that are in \(A\) or \(B\) or both.[🔗](#sec_logic-structures-4-13-1-1) Solution. We will write a direct proof. So we will assume that \(A \subseteq B\) and prove that \(A \cup B \subseteq B\text{.}\) Our desired conclusion is a statement about subsets, so let’s do an element chasing proof for it.[🔗](#sec_logic-structures-4-13-2-1)

#### Proof.

Let \(A\) and \(B\) be sets and assume \(A \subseteq B\text{.}\) Now let \(x\) be an element in \(A \cup B\text{.}\) This means that \(x\) is an element of \(A\text{,}\) or \(x\) is an element of \(B\text{,}\) or both. 6 From the definition of union.[🔗](#sec_logic-structures-4-13-2-2-1) Consider the cases. If \(x\) is an element of \(A\text{,}\) then since \(A \subseteq B\text{,}\) we know that \(x\) is an element of \(B\text{.}\) On the other hand, if \(x\) is not an element of \(A\text{,}\) then \(x\) must be an element of \(B\) (since \(x\) is in \(A \cup B\)). In either case, \(x\) is an element of \(B\text{.}\) Therefore, \(A \cup B \subseteq B\text{.}\)[🔗](#sec_logic-structures-4-13-2-2-2) [🔗](#sec_logic-structures-4-13-2-2)We can actually prove a strong statement: \(A \subseteq B\) if and only if \(A \cup B = B\text{.}\) You are asked to do this in the exercises.[🔗](#sec_logic-structures-4-13-2-3) [🔗](#sec_logic-structures-4-13-2) [🔗](#sec_logic-structures-4-13)[🔗](#sec_logic-structures-4)

### Subsection Proofs about Functions

A function \(f:A \to B\) is a rule that assigns each element of the set \(A\) (the domain) to exactly one element of the set \(B\) (the codomain). It is any rule: There doesn’t have to be a formula or rationale for it; we just need to match up elements from \(A\) to elements in \(B\text{.}\) For example, we could let \(A\) be the set of students enrolled in a particular Discrete Math course and let \(B\) be the set of months of the year. Now define the function \(f:A \to B\) to be the rule that assigns to each student the month in which their birthday falls. Since every student has an assigned month, and no more than one month, this is a function.[🔗](#subsec-logic-proofs-functions-2) Here is a definition of a particular type of function.[🔗](#subsec-logic-proofs-functions-3)

#### Definition 1.5.5.

A function \(f:A \to B\) is injective (or one-to-one) provided every element in \(B\) is the image of at most one element in \(A\text{.}\) In other words, no element in \(B\) is the *output* for more than one *input* from \(A\text{.}\)[🔗](#def-func-inj-1-1) [🔗](#def-func-inj) In the example below, we use *two-line notation* to describe a function. The top row contains the inputs, and the bottom row lists the corresponding outputs. So \(f:\{1,2,3,4\} \to \{a,b,c,d\}\) might be defined as, \begin{equation*} f = \twoline{1 \amp 2 \amp 3 \amp 4}{a \amp b \amp c \amp d}\text{,} \end{equation*} which means that \(f(1) = a\text{,}\) \(f(2) = b\text{,}\) \(f(3) = c\text{,}\) and \(f(4) = d\text{.}\) [🔗](#subsec-logic-proofs-functions-5)

#### Example 1.5.6.

Let \(A = \{1,2,3\}\) and \(B = \{2, 4, 6, 8\}\text{.}\) Consider the functions \(f:A \to B\) and \(g:A \to B\) defined by, \begin{equation*} f = \twoline{1 \amp 2 \amp 3}{2 \amp 8 \amp 6}, \qquad g = \twoline{1 \amp 2 \amp 3}{4 \amp 6 \amp 4}. \end{equation*} Which of these functions is injective? [🔗](#subsec-logic-proofs-functions-6-1-1) Solution. The function \(f\) is injective: Each element of \(B\) is the image of at most one element of \(A\text{.}\) The function \(g\) is not injective: The element 4 in \(B\) is the image of both 1 and 3 in \(A\text{.}\)[🔗](#subsec-logic-proofs-functions-6-2-1) [🔗](#subsec-logic-proofs-functions-6-2) [🔗](#subsec-logic-proofs-functions-6)Consider the student-to-birth-month function again. Could this possibly be injective? Or put another way, must there be two students in the course with the same birth month (which would say the function is *not* injective)? The answer seems to depend on how many students are in the class.[🔗](#subsec-logic-proofs-functions-7) But let’s pause and think about the more general fact about functions we have here. Let’s prove the following fact. Recall that \(|A|\) denotes the cardinality (size) of the set \(A\text{:}\) the number of elements in \(A\text{.}\)[🔗](#subsec-logic-proofs-functions-8)

#### Proposition 1.5.7.

Suppose \(f:A \to B\) is a function with \(A\) and \(B\) both finite sets. If \(|A| \gt |B|\text{,}\) then \(f\) is *not* injective.[🔗](#prop-non-injective-1-1) [🔗](#prop-non-injective)

#### Proof.

We will give a proof of the contrapositive: If \(f\) is injective, then \(|A| \le |B|\text{.}\) Let \(|B| = n\text{.}\) Since \(f\) is injective, each element of \(B\) must be the output for *at most* one element of \(A\text{.}\) Thus there are at most \(n\) elements in \(A\) that get mapped to \(B\) by \(f\text{.}\) But the definition of a function requires that every element of the domain is mapped to exactly one element of the codomain, so there must be at most \(n\) elements in \(A\text{.}\)[🔗](#prop-non-injective-2-1) [🔗](#prop-non-injective-2) Does this proof remind you of our pigeonhole-like proofs? It should, since this is precisely (one of) the careful formulations of the pigeonhole principle. We could have proved the fact about students sharing a birth month, but now we can just apply the proposition above and be done. When you apply a theorem or proposition to directly prove another result, we call the latter result a corollary.[🔗](#subsec-logic-proofs-functions-10)

#### Corollary 1.5.8.

Suppose a class has 25 students. Then at least two students share the same birth month.[🔗](#cor-birth-month-1-1) [🔗](#cor-birth-month)

#### Proof.

Consider the function that maps each student to their birth month. Since the domain has 25 elements and the codomain has 12 elements, the function is not injective, by [Proposition 1.5.7](sec_logic-structures.html#prop-non-injective). Therefore, at least two students share the same birth month.[🔗](#cor-birth-month-2-1) [🔗](#cor-birth-month-2)Functions always have inputs from a *set* (called the domain) and outputs in a set as well (called the codomain). This naturally leads to facts to consider about the interaction between sets and functions.[🔗](#subsec-logic-proofs-functions-12)

#### Definition 1.5.9.

Given a function \(f:X \to Y\) and a set \(A \subseteq X\text{,}\) we define the image of \(A\) under \(f\) to be the set \(f(A) = \{f(a) \in Y \st a \in A\}\text{.}\) That is, \(f(A)\) is the set of all outputs of the function for inputs in \(A\text{.}\)[🔗](#def-function-image-1-1) [🔗](#def-function-image)

#### Example 1.5.10.

Let \(f: \N \to \N\) be defined by \(f(n) = 2n\text{.}\) Let \(A = \{1,2,3\}\text{.}\) Find \(f(A)\text{.}\)[🔗](#subsec-logic-proofs-functions-14-1-1) Solution. Evaluate each element of \(A\) by \(f\text{.}\) \begin{equation*} f(1) = 2;\qquad f(2) = 4; \qquad f(3) = 6\text{.} \end{equation*} We want the set of these outputs. So \(f(A) = \{2, 4, 6\}\text{.}\) [🔗](#subsec-logic-proofs-functions-14-2-1) [🔗](#subsec-logic-proofs-functions-14-2) [🔗](#subsec-logic-proofs-functions-14)Now let’s prove something.[🔗](#subsec-logic-proofs-functions-15)

#### Proposition 1.5.11.

Let \(f:X \to Y\) be a function, and let \(A\) and \(B\) be subsets of \(X\text{.}\) If \(A \subseteq B\text{,}\) then \(f(A) \subseteq f(B)\text{.}\)[🔗](#prop-subset-image-1-1) [🔗](#prop-subset-image)

#### Proof.

Let \(f\text{,}\) \(A\text{,}\) and \(B\) be as in the proposition. Assume that \(A \subseteq B\text{.}\) Now consider an element \(y \in f(A)\text{.}\) By definition, this means that there is some \(a \in A\) such that \(f(a) = y\text{.}\) Since \(a \in A\) and \(A \subseteq B\text{,}\) we have that \(a \in B\text{.}\) Then by definition, \begin{equation*} y = f(a) \in f(B)\text{.} \end{equation*} Since \(y\) was an arbitrary element of \(f(A)\text{,}\) we have proved that \(f(A) \subseteq f(B)\text{.}\) [🔗](#prop-subset-image-2-1) [🔗](#prop-subset-image-2)Notice that the proof above is an element chasing proof again. This makes sense as soon as you remember that \(f(A)\) and \(f(B)\) are just the names of sets. To prove one set is a subset of another, we chase elements from the subset to the superset.[🔗](#subsec-logic-proofs-functions-17) [🔗](#subsec-logic-proofs-functions)

### Subsection Proofs about Relations

A relation on a set \(A\) is a set of ordered pairs of elements from \(A\text{.}\) We can think of a relation as a way to describe a type of relationship between elements of \(A\text{.}\) For example, we might have a relation on the set of people at a party that describes who is friends with whom. We might have a relation on the set of natural numbers that describes which pairs of numbers are related by the relation \(x \lt y\text{.}\)[🔗](#subsec-proofs-about-relations-2) Relations permeate all of mathematics, often without us even thinking of them. Whenever we make a statement about two elements of a set, we are implicitly defining a relation. The statement is true when the pair is in the relation. For example, the statement, “3 is less than 5,” is true because the pair \((3,5)\) is in the relation \(\lt\text{.}\) In fact, using the language we developed in the subsection [Quantifiers and Predicates](sec_logic-statements.html#subsec_logic-statements-quant), we can say that a relation is just a predicate, where the variables come from the same set.[🔗](#subsec-proofs-about-relations-3) Often relations have special symbols like “\(=\)” or “\(\le\)” or “\(\perp\)”. When we talk about a general relation, we will either use \(\sim\) and write \(x \sim y\text{,}\) or use a capital letter like \(R\text{,}\) and write \(R(x,y)\) or \(xRy\) or even \((x,y) \in R\) (these all mean the same thing).[🔗](#subsec-proofs-about-relations-4) When we study relations, we try to identify properties that relations might have. Here is an example of a very common property.[🔗](#subsec-proofs-about-relations-5)

#### Definition 1.5.12.

A relation \(R\) on a set \(A\) is transitive provided for all \(x,y,z \in A\text{,}\) if \(xRy\) and \(yRz\text{,}\) then \(xRz\text{.}\)[🔗](#def-transitive-1-1) [🔗](#def-transitive)

#### Example 1.5.13.

Consider the relation \(\sim\) on the set of students in your Discrete Math course that holds of two students, provided they have some other class together. Is this relation transitive?[🔗](#subsec-proofs-about-relations-7-1-1) Solution. No, not necessarily (although for some sets of students it could be). For example, suppose Alice has another class with Bruce, say Introduction to Programming. Carlos is not in Intro to Programming, but he and Bruce are both in Organic Chemistry. So then Alice\(\sim\)Bruce and Bruce\(\sim\)Carlos, but it might not be the case that Alice\(\sim\)Carlos (since Alice need not be in Organic Chemistry with Carlos).[🔗](#subsec-proofs-about-relations-7-2-1) [🔗](#subsec-proofs-about-relations-7-2) [🔗](#subsec-proofs-about-relations-7)Proving that a relation is *not* transitive takes nothing more than finding a counterexample, which means finding three elements \(a\text{,}\) \(b\text{,}\) and \(c\) such that \(a \sim b\text{,}\) \(b \sim c\text{,}\) but \(a \not\sim c\) (remember, the only way for an implication to be false is for the hypothesis to be true and the conclusion to be false).[🔗](#subsec-proofs-about-relations-8) Perhaps slightly more interesting would be proof that a relation is transitive.[🔗](#subsec-proofs-about-relations-9)

#### Example 1.5.14.

Consider the set of all students in your Discrete Mathematics class, and define the relation \(\sim\) that holds of students \(a\) and \(b\) (so \(a \sim b\) is true), provided \(a\) is taller than \(b\text{.}\) Prove that this relation is transitive.[🔗](#subsec-proofs-about-relations-10-1-1) Solution. The definition of transitive is an implication, so we can try a direct proof.[🔗](#subsec-proofs-about-relations-10-2-1)

#### Proof.

Let \(a\text{,}\) \(b\text{,}\) and \(c\) be arbitrary students in your Discrete Math course. Assume, \(a \sim b\) and \(b \sim c\text{.}\) That means that \(a\) is taller than \(b\text{,}\) and that \(b\) is taller than \(c\text{.}\) But then surely \(a\) must be even taller than \(c\) than they are taller than \(b\text{,}\) so we have that \(a \sim c\) is true as well. Thus \(\sim\) is transitive on this set.[🔗](#subsec-proofs-about-relations-10-2-2-1) [🔗](#subsec-proofs-about-relations-10-2-2)[🔗](#subsec-proofs-about-relations-10-2) [🔗](#subsec-proofs-about-relations-10)[🔗](#subsec-proofs-about-relations)

### Subsection Proofs about Graphs

We will spend all of [Chapter 2](ch_graphtheory.html) studying proofs about graphs since this is such a rich area of mathematics. As a preview, here is an example of how graph proofs can go.[🔗](#subsec-proofs-about-graphs-2) A graph is a set \(V\) of vertices and a set \(E\) of edges. The edges are two-element subsets of the vertices, and we can think of them as representing relationships between the vertices. Note, this is an abstract definition of a graph using sets, but we often draw graphs using dots for the vertices connected by lines for the edges, as this gives us a nice picture of what is going on.[🔗](#subsec-proofs-about-graphs-3) Since graphs represent a type of relationship between elements (vertices), we can use graphs to represent many real-world problems. For example, the vertices of a graph might represent people at a party. Each edge can represent a handshake between two people. So if we wondered whether it is possible for the 15 people at a party to each shake hands with exactly 3 people there, we are really asking whether there is a graph with 15 vertices where each vertex belongs to 3 edges. (“Belongs to”?? Yes, because an edge is a two-element subset of the vertices, so if an edge “touches” or “comes out of” a vertex, that means the vertex belongs to that particular two-element subset.)[🔗](#subsec-proofs-about-graphs-4) Here is a definition related to this idea.[🔗](#subsec-proofs-about-graphs-5)

#### Definition 1.5.15.

Let \(v\) be a vertex in a graph \(G\text{.}\) The degree of \(v\text{,}\) written \(d(v)\text{,}\) is the number of edges that contain \(v\text{,}\) i.e., the number of edges incident to \(v\text{.}\)[🔗](#def-degree-1-1) [🔗](#def-degree)

#### Example 1.5.16.

Consider the graph \(G\) with vertices \(V = \{1,2,3,4\}\) and edges \(E = \{\{1,2\}, \{1,3\}, \{1,4\}, \{2,3\}\}\text{.}\) What is the degree of each vertex in \(G\text{?}\)[🔗](#subsec-proofs-about-graphs-7-1-1) Solution. It might be helpful to picture the graph:[🔗](#subsec-proofs-about-graphs-7-2-1) ![A graph with four vertices labeled 1 through 4. There are edges from vertex 1 to each of the other vertices, and an edge between vertices 2 and 3.](generated/latex-image/graph-for-degrees.svg) We have \(d(1) = 3\text{,}\) \(d(2) = 2\text{,}\) \(d(3) = 2\text{,}\) and \(d(4) = 1\text{.}\) You can see this by counting how many edges are incident to each vertex, or by counting how many edges (subsets) each vertex belongs to.[🔗](#subsec-proofs-about-graphs-7-2-3) [🔗](#subsec-proofs-about-graphs-7-2) [🔗](#subsec-proofs-about-graphs-7)So is it possible for 15 people to each shake hands with exactly three people in their group? Well, is there a graph with 15 vertices, all of degree 3? The answer is no![🔗](#subsec-proofs-about-graphs-8) One way you can see this is if you ask how many edges such a graph would have. Each vertex is incident to three edges, so counting incidences, we get \(15\cdot 3 = 45\text{.}\) But every edge is incident to two vertices, so we have counted each edge twice. So the number of edges in such a graph would be \(45/2 = 22.5\text{.}\) But the number of edges in a graph must be a whole number, so there is no such graph.[🔗](#subsec-proofs-about-graphs-9) This suggests that we can say something more in general. The following proposition is a simple consequence of the [Handshake Lemma 2.1.8](sec_gt-intro.html#lem-handshake), which we will prove in [Section 2.1](sec_gt-intro.html). Here we give a complete proof of this particular formulation of it.[🔗](#subsec-proofs-about-graphs-10)

#### Proposition 1.5.17.

In any graph, the number of vertices with odd degree must be even.[🔗](#prop-handshake-parity-1-1) [🔗](#prop-handshake-parity)

#### Proof.

We will prove this by contradiction. Suppose there was a graph with an odd number of vertices with odd degree. Consider the sum of the degrees of all the vertices. The sum for the odd-degree vertices would be odd (since the sum of an odd number of odd numbers is odd). The sum of the even-degree vertices will be even (any sum of even numbers must be even). The sum of an odd number and an even number is odd. Thus the sum of all the degrees will be odd.[🔗](#prop-handshake-parity-2-1) However, the number of edges in a graph is half the sum of the degrees (by [Lemma 2.1.8](sec_gt-intro.html#lem-handshake), or simply because each edge contributes one to the count of the degree of two vertices). Since the number of edges is a whole number, we see that the sum of the degrees must be even. This contradicts what we found in the previous paragraph.[🔗](#prop-handshake-parity-2-2) Therefore, in any graph, the number of vertices with odd degree must be even.[🔗](#prop-handshake-parity-2-3) [🔗](#prop-handshake-parity-2)[🔗](#subsec-proofs-about-graphs)

### Reading Questions Reading Questions

#### 1.

Which of the following is the definition of a function \(f:A \to B\) being injective?[🔗](#rq-logic-structures-injective-1-1)

- Every element of \(B\) is the image of at most one element of \(A\text{.}\)
- The domain \(A\) is a larger set than the codomain \(B\text{.}\)
- No, in fact, this can never happen if \(f\) is injective.
- Every element of \(A\) is sent to at most one element of \(B\text{.}\)
- This is just part of the definition of a function.
- The codomain \(B\) is no smaller than the domain \(A\text{.}\)
- This must be true if \(f\) is injective, but it is not part of the definition of injective.

[🔗](#rq-logic-structures-injective)

#### 2.

When would you most likely use element chasing as part of a proof?[🔗](#rq-logic-structures-chasing-1-1)

- When proving that one set is a subset of another.
- When proving that a function is injective.
- When proving that a relation is transitive.
- When proving that a graph has an odd number of edges.

[🔗](#rq-logic-structures-chasing)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-logic-structures-q-1-1) [🔗](#rq-logic-structures-q)[🔗](#rqs-logic-structures)

### Exercises Practice Problems

#### 1.

Given sets \(A\) and \(B\text{,}\) the intersection of \(A\) and \(B\text{,}\) written \(A \cap B\text{,}\) is the set of all elements that are in both \(A\) and \(B\text{.}\)[🔗](#mc-logic-strucutres-first-line-direct-1-1) Suppose you wanted to prove that if \(A \cap B = B\) then \(B \subseteq A\text{.}\)[🔗](#mc-logic-strucutres-first-line-direct-1-2) Which would be a good start to this proof if you used a direct proof?[🔗](#mc-logic-strucutres-first-line-direct-1-3)

- Let \(a\) be an element of \(A \cap B\text{.}\)
- Let \(b\) be an element of \(B\text{.}\)
- Let \(a\) be an element of \(A\text{.}\)
- Suppose there is an element \(b\) in \(B\) that is not in \(A\text{.}\)
- This would be a good start to a proof by contradiction or contrapositive, not a direct proof.

[🔗](#mc-logic-strucutres-first-line-direct)

#### 2.

Suppose you wanted to prove that for all sets \(A\) and \(B\) that \(A \cap B \subseteq A\text{.}\) Which of the following would be a good start to a proof by contradiction?[🔗](#mc-logic-structures-contradiction-1-1)

- Suppose there is an element \(a\) in \(A\) that is not in \(A \cap B\text{.}\)
- Suppose there is an element \(a\) in \(A \cap B\) that is not in \(A\text{.}\)
- Let \(a\) be an element of \(A\text{.}\)
- Let \(a\) be an element of \(A \cap B\text{.}\)
- This would be a good start to a direct proof, not a proof by contradiction.

[🔗](#mc-logic-structures-contradiction)

#### 3.

Arrange some of the statements below to form a correct proof of the following statement: “For any sets \(A\) and \(B\text{,}\) if \(B \subseteq A \cap B\) then \(B \subseteq A\text{.}\)”[🔗](#parsons-subset-proof-intersection-1-1)

```natural
Suppose \(B \subseteq A \cap B\text{,}\) and let \(b\) be an element of \(B\text{.}\)

---
Then \(b\) is an element of \(A \cap B\) since \(B \subseteq A \cap B\text{.}\)

---
Since \(A \cap B\) contains all the elements that are in both \(A\) and \(B\text{,}\) \(b\) is an element of \(A\text{.}\)

---
Therefore \(B \subseteq A\text{.}\)

---
Therefore \(B \subseteq A \cap B\)
 #distractor
---
Then \(b\) is an element of \(B\) since \(B \subseteq A \cap B\text{.}\)
 #distractor
---
Let \(b\) be an element of \(A \cap B\text{.}\)
 #distractor
---
Suppose \(B \subseteq A\text{.}\)
 #distractor
---
Suppose \(A \subseteq B\text{.}\)
 #distractor
```

[🔗](#parsons-subset-proof-intersection)

#### 4.

Prove that for any sets \(A\) and \(B\text{,}\) \((A \cap B) \cup A = A\)[🔗](#parsons-logic-structures-set-equality-1-1) Arrange the statements below to form a correct proof.[🔗](#parsons-logic-structures-set-equality-1-2)

```natural
First we will prove that \((A \cap B) \cup A \subseteq A\text{.}\)

---
Let \(x\) be an element of \((A \cap B) \cup A\text{.}\)

---
Then \(x\) is an element of \(A \cap B\text{,}\) or \(x\) is an element of \(A\text{.}\)

---
So in particular, \(x\) is an element of \(A\text{.}\)

---
Therefore \((A \cap B) \cup A \subseteq A\text{.}\)

---
Second, we will prove that \(A \subseteq (A \cap B) \cup A\text{.}\)

---
Let \(x\) be an element of \(A\text{.}\)

---
Then \(x\) is an element of \((A \cap B) \cup A\text{,}\) since \(x\) is in \(A\) or in the other set.
---
Therefore \(A \subseteq (A \cap B) \cup A\text{.}\)

---
Since \((A \cap B) \cup A \subseteq A\) and \(A \subseteq (A \cap B) \cup A\text{,}\) we have \((A \cap B) \cup A = A\text{.}\)
```

[🔗](#parsons-logic-structures-set-equality)

#### 5.

Let \(f:X \to Y\) be a function and let \(B \subseteq Y\) be a subset of the codomain. Define the inverse image of \(B\) under \(f\) to be the set \(f\inv(B) = \{x \in X \st f(x) \in B\}\text{.}\) That is, it is all the elements in the domain that are mapped to elements in \(B\text{.}\)[🔗](#parsons-logic-structures-function-image-1-1) Prove that if \(B_1 \subseteq B_2\) are subsets of the codomain, then \(f\inv(B_1) \subseteq f\inv(B_2)\text{.}\)[🔗](#parsons-logic-structures-function-image-1-2) Arrange some of the statements below to form a correct proof.[🔗](#parsons-logic-structures-function-image-1-3)

```natural
Suppose \(B_1 \subseteq B_2\text{.}\)

---
Let \(a\) be an element of \(f\inv(B_1)\text{.}\)

---
This means that \(f(a)\) is an element of \(B_1\text{.}\)

---
Since \(B_1 \subseteq B_2\text{,}\) \(f(a)\) is an element of \(B_2\text{.}\)

---
This then means that \(a\) is an element of \(f\inv(B_2)\text{.}\)

---
Therefore \(f\inv(B_1) \subseteq f\inv(B_2)\text{.}\)

---
Let \(b\) be an element of \(B_1\text{.}\)
 #distractor
---
Therefore \(b\) is an element of \(B_2\text{.}\)
 #distractor
---
Thus \(B_1 \subseteq B_2\text{.}\)
 #distractor
```

[🔗](#parsons-logic-structures-function-image)[🔗](#practice-logic-structures)

### Exercises Additional Exercises

#### 1.

Prove that for any two sets \(A\) and \(B\text{,}\) \(A \subseteq B\) if and only if \(A \cup B = B\text{.}\)[🔗](#exercises-logic-structures-2-1-1) Hint. To prove that \(A \subseteq B\) if and only if \(A \cup B = B\text{,}\) you need to prove two implications:

1. If \(A \subseteq B\text{,}\) then \(A \cup B = B\text{.}\)[🔗](#exercises-logic-structures-2-2-1-3-1-1) [🔗](#exercises-logic-structures-2-2-1-3-1)
2. If \(A \cup B = B\text{,}\) then \(A \subseteq B\text{.}\)[🔗](#exercises-logic-structures-2-2-1-3-2-1) [🔗](#exercises-logic-structures-2-2-1-3-2)

[🔗](#exercises-logic-structures-2-2-1) To prove two sets are equal, we usually prove that each is a subset of the other.[🔗](#exercises-logic-structures-2-2-2) [🔗](#exercises-logic-structures-2-2) [🔗](#exercises-logic-structures-2)

#### 2.

The intersection of sets \(A\) and \(B\text{,}\) denoted \(A \cap B\text{,}\) is the set of all elements that are in both \(A\) and \(B\text{.}\)[🔗](#exercises-logic-structures-3-1-1) Prove that for any two sets \(A\) and \(B\text{,}\) \(A \subseteq B\) if and only if \(A \cap B = A\text{.}\)[🔗](#exercises-logic-structures-3-1-2) [🔗](#exercises-logic-structures-3)

#### 3.

Prove that for any sets \(A\text{,}\) \(B\text{,}\) and \(C\text{,}\) if \(A \cup B \subseteq C\text{,}\) then \(A \subseteq C\) and \(B \subseteq C\text{.}\)[🔗](#exercises-logic-structures-4-1-1) [🔗](#exercises-logic-structures-4)

#### 4.

Prove that for any sets \(A\text{,}\) \(B\text{,}\) and \(C\text{,}\) if \(A \subseteq C\) and \(B \subseteq C\text{,}\) then \(A \cup B \subseteq C\text{.}\)[🔗](#exercises-logic-structures-5-1-1) [🔗](#exercises-logic-structures-5)

#### 5.

The difference of sets \(A\) and \(B\text{,}\) written \(A \setminus B\text{,}\) is the set of all elements that are in \(A\) but not in \(B\text{.}\)[🔗](#exercises-logic-structures-6-1-1) The empty set, written \(\emptyset\text{,}\) is the set that contains no elements.[🔗](#exercises-logic-structures-6-1-2) Prove that if \(A \setminus B = A\) then \(A \cap B = \emptyset\text{.}\)[🔗](#exercises-logic-structures-6-1-3) [🔗](#exercises-logic-structures-6)

#### 6.

Prove that if \(A \setminus B = B \setminus A\) then \(A = B\text{.}\)[🔗](#exercises-logic-structures-7-1-1) [🔗](#exercises-logic-structures-7)

#### 7.

Let \(f:X \to Y\) be a function, and let \(A\) and \(B\) be subsets of \(X\text{.}\)[🔗](#exercises-logic-structures-8-1-1)

#### (a)

Prove that \(f(A \cap B) \subseteq f(A) \cap f(B)\text{.}\)[🔗](#exercises-logic-structures-8-2-1-1) [🔗](#exercises-logic-structures-8-2)

#### (b)

Find an example of a function and two sets \(A\) and \(B\) such that \(f(A \cap B) \neq f(A) \cap f(B)\text{.}\)[🔗](#exercises-logic-structures-8-3-1-1) [🔗](#exercises-logic-structures-8-3)[🔗](#exercises-logic-structures-8)

#### 8.

Let \(f:X \to Y\) be a function, and let \(A\) and \(B\) be subsets of \(X\text{.}\)[🔗](#exercises-logic-structures-9-1-1)

#### (a)

Prove that \(f(A \cup B) \subseteq f(A) \cup f(B)\text{.}\)[🔗](#exercises-logic-structures-9-2-1-1) [🔗](#exercises-logic-structures-9-2)

#### (b)

Prove that \(f(A) \cup f(B) \subseteq f(A \cup B)\)[🔗](#exercises-logic-structures-9-3-1-1) [🔗](#exercises-logic-structures-9-3)

#### (c)

What can you conclude from the two proofs above?[🔗](#exercises-logic-structures-9-4-1-1) [🔗](#exercises-logic-structures-9-4)[🔗](#exercises-logic-structures-9)

#### 9.

Given a function \(f:X \to Y\) and a set \(B \subseteq Y\text{,}\) we define the inverse image of \(B\) under \(f\) as the set \(f\inv(B) = \{x \in X \st f(x) \in B\text{.}\) That is, it is all the elements in the domain that are mapped to elements in \(B\text{.}\)[🔗](#ex-inv-image-1-1)

#### (a)

For \(f:\N \to \N\) defined by \(f(n) = n^2\text{,}\) what are each of the following sets?

1. \(\displaystyle f\inv(\{1, 4, 9\})\)[🔗](#ex-inv-image-2-1-1-3-1-1) [🔗](#ex-inv-image-2-1-1-3-1)
2. \(\displaystyle f\inv(\{2, 3, 5, 7\})\)[🔗](#ex-inv-image-2-1-1-3-2-1) [🔗](#ex-inv-image-2-1-1-3-2)
3. \(\displaystyle f\inv(\{1,2,\ldots,10\})\)[🔗](#ex-inv-image-2-1-1-3-3-1) [🔗](#ex-inv-image-2-1-1-3-3)

[🔗](#ex-inv-image-2-1-1) [🔗](#ex-inv-image-2)

#### (b)

Prove that for any set \(C \subseteq X\text{,}\) \(C \subseteq f\inv(f(C))\text{.}\)[🔗](#ex-inv-image-3-1-1) [🔗](#ex-inv-image-3)

#### (c)

Give an example of a function \(f\) and a set \(C\) such that \(C \neq f\inv(f(C))\text{.}\)[🔗](#ex-inv-image-4-1-1) [🔗](#ex-inv-image-4)

#### (d)

Prove that for any set \(D \subseteq Y\text{,}\) \(f(f\inv(D)) \subseteq D\text{.}\)[🔗](#ex-inv-image-5-1-1) [🔗](#ex-inv-image-5)

#### (e)

Give an example of a function \(f\) and a set \(D\) such that \(f(f\inv(D)) \neq D\text{.}\)[🔗](#ex-inv-image-6-1-1) [🔗](#ex-inv-image-6)[🔗](#ex-inv-image)

#### 10.

Let \(f:X \to Y\) be a function, and let \(A\) and \(B\) be subsets of \(Y\text{.}\) Prove that \(f\inv(A \cap B) = f\inv(A) \cap f\inv(B)\text{.}\)[🔗](#exercises-logic-structures-11-1-1) [🔗](#exercises-logic-structures-11)

#### 11.

Let \(f:X \to Y\) be a function, and let \(A\) and \(B\) be subsets of \(Y\text{.}\) Prove that \(f\inv(A \cup B) = f\inv(A) \cup f\inv(B)\text{.}\)[🔗](#exercises-logic-structures-12-1-1) [🔗](#exercises-logic-structures-12)

#### 12.

For each relation below, determine whether it is transitive. If it is, prove it. If it is not, give a counterexample.[🔗](#exercises-logic-structures-13-1-1)

#### (a)

The relation “\(|\)” (divides) on \(\Z\) defined by \(a | b\) provided \(b\) is a multiple of \(a\text{.}\)[🔗](#exercises-logic-structures-13-2-1-1) [🔗](#exercises-logic-structures-13-2)

#### (b)

The relation “\(\leq\)” (less than or equal to) on \(\R\text{.}\)[🔗](#exercises-logic-structures-13-3-1-1) [🔗](#exercises-logic-structures-13-3)

#### (c)

The relation “\(\perp\)” (is perpendicular to) on the set of lines in the plane.[🔗](#exercises-logic-structures-13-4-1-1) [🔗](#exercises-logic-structures-13-4)

#### (d)

The relation “\(\sim\)” (is similar to) on the set of triangles in the plane (two triangles are similar if they have the same angles, but are not necessarily the same size).[🔗](#exercises-logic-structures-13-5-1-1) [🔗](#exercises-logic-structures-13-5)[🔗](#exercises-logic-structures-13)[🔗](#exercises-logic-structures)[🔗](#sec_logic-structures) [&#xe5cb;Prev](sec_logic-proofs.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_logic-conc.html) [Feedback](/cdn-cgi/l/email-protection#ddb2aebebcaff3b1b8abb4b39da8b3beb2f3b8b9a8)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_logic-structures-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_logic-structures-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
