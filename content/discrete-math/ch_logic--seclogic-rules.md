---
title: "Rules of Logic"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_logic-rules.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 1.3 Rules of Logic

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_logic-rules-2-1-1)

1. Use truth tables to determine whether two statements are logically equivalent.[🔗](#sec_logic-rules-2-2-1-1) [🔗](#sec_logic-rules-2-2-1)
2. Use truth tables to determine whether a deduction rule is valid.[🔗](#sec_logic-rules-2-2-2-1) [🔗](#sec_logic-rules-2-2-2)
3. Use logical equivalence and deduction rules to simplify statements and make deductions.[🔗](#sec_logic-rules-2-2-3-1) [🔗](#sec_logic-rules-2-2-3)

[🔗](#sec_logic-rules-2)

### Subsection Section Preview

#### Investigate!

Holmes always wears one of the two vests he owns: one tweed and one mint green. He always wears either the green vest or red shoes. Whenever he wears a purple shirt and the green vest, he chooses to not wear a bow tie. He never wears the green vest unless he is also wearing either a purple shirt or red shoes. Whenever he wears red shoes, he also wears a purple shirt. Today, Holmes wore a bow tie. What else did he wear?[🔗](#sec_logic-rules-3-2-1) [🔗](#sec_logic-rules-3-2)

#### Try it 1.3.1.

Spend a few minutes thinking about the *Investigate!* question above. Of the six statements in the puzzle, only one is atomic. Use this atomic statement and one other statement to deduce a new statement about what Holmes might (or might not) be wearing. Explain why you think your new statement is true.[🔗](#ip_sec_logic-prop-1-1) Hint. The atomic statement is, “Holmes wore a bow tie.” Only one of the molecular statements has this as one of its *atoms*.[🔗](#ip_sec_logic-prop-3-1) [🔗](#ip_sec_logic-prop-3) [🔗](#ip_sec_logic-prop)Logic studies the ways statements can interact with each other. More precisely, we consider the way the logical form statements can interact. The study of logic does not care about the content of the atomic statements or the meaning of predicates. For example, the claims, “If spiders have six legs, then Sam walks with a limp,” and, “If the moon is made of cheese, then cheddar is a type of cheese,” are identical from a logical perspective. Logic doesn’t care about whether Sam is a spider or the culinary makeup of the moon. Both statements have the same form: They are implications, \(P \imp Q\text{.}\)[🔗](#sec_logic-rules-3-4) Of course, in mathematics we often *do* know some relationship between various atomic statements. For example, we know a relationship between being even and being a multiple of 10. That relationship allows us to make claims such as, “If the number I’m thinking of is a multiple of 10, then it is even.” Suppose I also told you that I am now thinking of a number that is not even. We can deduce that I am not thinking of a multiple of 10! Crucially, if we accept the truth of the statements here, we can make this deduction without thinking about the nature of numbers. It can feel very liberating and provide much-needed clarity when trying to understand complicated reasoning if we can separate the content from the logical form of arguments.[🔗](#sec_logic-rules-3-5) Our goal in this section is to establish some procedures for analyzing how the truth or falsity of statements interact, based on their logical form. We will see that some molecular statements must be true regardless of whether their atomic parts are true or false, while some statements must always be false. For other statements, it can be that two statements are always true or false together, or that whenever one statement is true, another statement must also be true.[🔗](#sec_logic-rules-3-6) The main method for establishing these relationships will be truth tables. There is a very clear procedure for constructing and analyzing truth tables, but for complicated arguments that contain many atomic statements, the truth tables become very large and unwieldy. We will therefore use truth tables to understand some basic equivalences and deductions that can be applied in a sequence of reasoning to construct larger arguments.[🔗](#sec_logic-rules-3-7)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-logic-prop)

#### 1.

Consider the statement, “Whenever Holmes wears a purple shirt and the green vest, he chooses to not wear a bow tie.” Let \(P\) be the statement, “Holmes wears a purple shirt,” \(G\) be the statement, “Holmes wears the green vest,” and \(B\) be the statement, “Holmes wears a bow tie.” Which of the following is the best translation of the statement into propositional logic?[🔗](#pa_logic-prop-translate-1-1)

- \((P \wedge G) \imp \neg B \)
- \((P \wedge G) \imp B \)
- \((P \vee G) \imp \neg B \)
- \(P \wedge (G \imp B) \)

[🔗](#pa_logic-prop-translate)

#### 2.

Consider the statement, “Holmes never wears the green vest unless he is also wearing either a purple shirt or red shoes.” With \(P\) and \(G\) as in the previous question, and \(R\) being the statement, “Holmes wears red shoes,” which of the following is the best translation of the statement into propositional logic?[🔗](#pa_logic-prop-translate-2-1-1)

- \(G \imp (P \vee R) \)
- \(\neg G \imp (P \vee R) \)
- Consider the case where Holmes does wear a green vest but does not wear a purple shirt or red shoes. That would make \(\neg G\) false and \(P \vee R\) true, so the implication would be true. But in this situation, the original statement would be false.
- \((P \vee R) \imp G \)
- Consider the case where Holmes does not wear a purple shirt or red shoes, and does wear the green vest. That would make \(P \vee R\) false and \(G\) true, so the implication would be true. But in this situation, the original statement would be false.
- \((P \vee R) \imp \neg G \)
- Consider the case where Holmes does not wear a purple shirt or red shoes, and does wear the green vest. That would make \(P \vee R\) false and \(\neg G\) false, so the implication would be true. But in this situation, the original statement would be false.

[🔗](#pa_logic-prop-translate-2)

#### 3.

Consider the statement, “If you major in math, then you will get a high-paying job,” and the statement, “Either you don’t major in math, or you will get a high-paying job.” In which of the following cases are *both* statements true? Select all that apply.[🔗](#pa_logic-prop-equiv-1-1)

- You major in math and get a high-paying job.
- You major in math and don’t get a high-paying job.
- In fact, in this case, both of the statements are false.
- You don’t major in math and do get a high-paying job.
- This makes the implication true because the *if* part is false. The disjunction is true because the first part is true.
- You don’t major in math and don’t get a high-paying job.

[🔗](#pa_logic-prop-equiv)[🔗](#PA-logic-prop)[🔗](#sec_logic-rules-3)

### Subsection Truth Tables

Here’s a question about playing Monopoly:[🔗](#sec_logic-rules-4-3)

> If you get more doubles than any other player, then you will lose, or if you lose, then you must have bought the most properties.[🔗](#sec_logic-rules-4-4-1)
> > [🔗](#sec_logic-rules-4-4)

True or false? We will answer this question and won’t need to know anything about Monopoly. Instead, we will look at the logical *form* of the statement.[🔗](#sec_logic-rules-4-5) We need to decide when the statement \((P \imp Q) \vee (Q \imp R)\) is true. Using the definitions of the connectives in [Definition 1.1.8](sec_logic-statements.html#def-connectives-truth), we see that for this to be true, either \(P \imp Q\) must be true or \(Q \imp R\) must be true (or both). Those are true if either \(P\) is false or \(Q\) is true (in the first case) and \(Q\) is false or \(R\) is true (in the second case). So—yeah, it gets a bit messy. Luckily, we can make a chart to keep track of all the possibilities with a truth table.[🔗](#sec_logic-rules-4-6) The idea is this: On each row, we list a possible combination of T’s and F’s (Trues and Falses) for each of the propositional variables, and then mark down whether the (molecular) statement in question is true or false in that case. We do this for every possible combination of T’s and F’s. Then we can clearly see the cases in which the statement is true or false. For complicated statements, we will first fill in values for each part of the statement, as a way of breaking up our task into smaller, more manageable pieces.[🔗](#sec_logic-rules-4-7) Since the truth value of a statement is completely determined by the truth values of its parts and how they are connected, all you need to know is the truth tables for each of the logical connectives, which we have already seen in [Figure 1.1.9](sec_logic-statements.html#fig-truth-tables)[🔗](#sec_logic-rules-4-8) The truth tables we consider here all build off the basic ones, applying the basic rules multiple times.[🔗](#sec_logic-rules-4-9)

#### Example 1.3.2.

Make a truth table for the statement \(\neg P \vee Q\text{.}\)[🔗](#ex-imp-disj-1-1) Solution. Note that this statement is not \(\neg(P \vee Q)\text{;}\) the negation belongs to \(P\) alone. The main connective here is the \(\vee\text{,}\) which means we will use that truth table *last*. First, we apply the truth table for \(\neg\text{,}\) and then apply the truth table for \(\vee\) using “inputs” from \(\neg P\) and \(Q\text{.}\)[🔗](#ex-imp-disj-2-1) Since there are two variables, there are four possible combinations of T’s and F’s. Putting this all together gives us the following truth table.[🔗](#ex-imp-disj-2-2)

| \(P\) | \(Q\) | \(\neg P\) | \(\neg P \vee Q\) |
| --- | --- | --- | --- |
| T | T | F | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

We added a column for \(\neg P\) to make filling out the last column easier. The entries in the \(\neg P\) column were determined by the entries in the \(P\) column. Then to fill in the final column, look only at the column for \(Q\) and the column for \(\neg P\) and use the rule for \(\vee\text{.}\)[🔗](#ex-imp-disj-2-4) [🔗](#ex-imp-disj-2) [🔗](#ex-imp-disj)Now let’s answer our question about Monopoly.[🔗](#sec_logic-rules-4-11)

#### Example 1.3.3.

Analyze the statement, “If you get more doubles than any other player, then you will lose, or if you lose, then you must have bought the most properties,” using truth tables.[🔗](#sec_logic-rules-4-12-1-1) Solution. Represent the statement in symbols as \((P \imp Q) \vee (Q \imp R)\text{,}\) where \(P\) is the statement, “You get more doubles than any other player,” \(Q\) is the statement, “You will lose,” and \(R\) is the statement, “You must have bought the most properties.” Now make a truth table.[🔗](#sec_logic-rules-4-12-2-1) The truth table must contain 8 rows to account for every possible combination of truth and falsity among the three statements. Here is the full truth table:[🔗](#sec_logic-rules-4-12-2-2)

| \(P\) | \(Q\) | \(R\) | \(P \imp Q\) | \(Q \imp R\) | \((P \imp Q) \vee (Q \imp R)\) |
| --- | --- | --- | --- | --- | --- |
| T | T | T | T | T | T |
| T | T | F | T | F | T |
| T | F | T | F | T | T |
| T | F | F | F | T | T |
| F | T | T | T | T | T |
| F | T | F | T | F | T |
| F | F | T | T | T | T |
| F | F | F | T | T | T |

The first three columns are simply a systematic listing of all possible combinations of T and F for the three statements (do you see how you would list the 16 possible combinations for four statements?). The next two columns are determined by the values of \(P\text{,}\) \(Q\text{,}\) and \(R\) and the definition of implication. Then, the last column is determined by the values in the previous two columns and the definition of \(\vee\text{.}\) It is this final column we care about.[🔗](#sec_logic-rules-4-12-2-4) Notice that in each of the eight possible cases, the statement in question is true. So our statement about monopoly is true (regardless of how many properties you own, how many doubles you roll, or whether you win or lose).[🔗](#sec_logic-rules-4-12-2-5) [🔗](#sec_logic-rules-4-12-2) [🔗](#sec_logic-rules-4-12) The statement about monopoly is an example of a tautology, a statement that is necessarily true based on its logical form alone. Tautologies are always true, but they don’t tell us much about the world. No knowledge about monopoly was required to determine that the statement was true, and thus knowing that the statement is true tells us nothing about monopoly. It is equally true that “if the moon is made of cheese, then Elvis is still alive, or if Elvis is still alive, then unicorns have 5 legs.”[🔗](#sec_logic-rules-4-13) [🔗](#sec_logic-rules-4)

### Subsection Logical Equivalence

You might have noticed in [Example 1.3.2](sec_logic-rules.html#ex-imp-disj) that the final column in the truth table for \(\neg P \vee Q\) is identical to the final column in the truth table for \(P \imp Q\text{:}\)[🔗](#sec_logic-rules-5-2)

| \(P\) | \(Q\) | \(P \imp Q\) | \(\neg P \vee Q\) |
| --- | --- | --- | --- |
| T | T | T | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

This says that no matter what \(P\) and \(Q\) are, the statements \(\neg P \vee Q\) and \(P \imp Q\) are either both true or both false. We therefore say these statements are logically equivalent.[🔗](#sec_logic-rules-5-4)

#### Definition 1.3.4. Logical Equivalence.

Two (molecular) statements \(P\) and \(Q\) are logically equivalent provided \(P\) is true precisely when \(Q\) is true. That is, \(P\) and \(Q\) have the same truth value under any assignment of truth values to their atomic parts.[🔗](#sec_logic-rules-5-5-3-1) We write this as \(P \equiv Q\text{.}\)[🔗](#sec_logic-rules-5-5-3-2) [🔗](#sec_logic-rules-5-5)To verify that two statements are logically equivalent, you can make a truth table for each and check whether the columns for the two statements are identical.[🔗](#sec_logic-rules-5-6) In [Section 1.2](sec_logic-implications.html) we claimed that whenever an implication is true, so is its contrapositive. We can now make this claim as the following theorem.[🔗](#sec_logic-rules-5-7)

#### Theorem 1.3.5.

An implication is logically equivalent to its contrapositive. That is, \begin{equation*} P \imp Q \equiv \neg Q \imp \neg P\text{.} \end{equation*} [🔗](#thm-contrapositive-1-1) [🔗](#thm-contrapositive)

#### Proof.

We simply examine the truth tables.[🔗](#thm-contrapositive-2-1)

| \(P\) | \(Q\) | \(P \imp Q\) |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

| \(P\) | \(Q\) | \(\neg Q\) | \(\neg P\) | \(\neg Q \imp \neg P\) |
| --- | --- | --- | --- | --- |
| T | T | F | F | T |
| T | F | T | F | F |
| F | T | F | T | T |
| F | F | T | T | T |

(Note that we have the truth value combinations in the same order in both tables, so we can easily see that the final columns are identical.)[🔗](#thm-contrapositive-2-3) [🔗](#thm-contrapositive-2)Recognizing two statements as logically equivalent can be quite helpful. Rephrasing a mathematical statement can often lend insight into what it is saying, or how to prove or refute it. By using truth tables we can systematically verify that two statements are indeed logically equivalent.[🔗](#sec_logic-rules-5-9)

#### Example 1.3.6.

Are the statements, “It will not rain or snow,” and, “It will not rain and it will not snow,” logically equivalent?[🔗](#sec_logic-rules-5-10-1-1) Solution. We want to know whether \(\neg(P \vee Q)\) is logically equivalent to \(\neg P \wedge \neg Q\text{.}\) Make a truth table which includes both statements:[🔗](#sec_logic-rules-5-10-2-1)

| \(P\) | \(Q\) | \(\neg(P \vee Q)\) | \(\neg P \wedge \neg Q\) |
| --- | --- | --- | --- |
| T | T | F | F |
| T | F | F | F |
| F | T | F | F |
| F | F | T | T |

Since the truth values for the two statements are equal in every row, the two statements are logically equivalent.[🔗](#sec_logic-rules-5-10-2-3) [🔗](#sec_logic-rules-5-10-2) [🔗](#sec_logic-rules-5-10)Notice that this example gives us a way to “distribute” a negation over a disjunction (an “or”). We have a similar rule for distributing over conjunctions (“and”s):[🔗](#sec_logic-rules-5-11)

#### Theorem 1.3.7. De Morgan’s Laws.

The negation of a disjunction or conjunction is logically equivalent to a conjunction or disjunction of negations, respectively. That is, \begin{equation*} \neg(P \wedge Q) \equiv \neg P \vee \neg Q \end{equation*} and, \begin{equation*} \neg(P \vee Q) \equiv \neg P \wedge \neg Q\text{.} \end{equation*} [🔗](#sec_logic-rules-5-12-3-1) [🔗](#sec_logic-rules-5-12)This suggests there might be a sort of “algebra” you could apply to statements (okay, there is: It is called *Boolean algebra*) to transform one statement into another. We can start collecting useful examples of logical equivalence and apply them in succession to a statement, instead of writing out a complicated truth table.[🔗](#sec_logic-rules-5-13) De Morgan’s laws do not directly help us with implications, but as we saw above, every implication can be written as a disjunction:[🔗](#sec_logic-rules-5-14)

#### Implications are Disjunctions.

\begin{equation*} P \imp Q \equiv \neg P \vee Q\text{.} \end{equation*} [🔗](#assemblage-imp-disj-4) Example: “If a number is a multiple of 4, then it is even” is equivalent to, “A number is not a multiple of 4, or (else) it is even.”[🔗](#assemblage-imp-disj-5) [🔗](#assemblage-imp-disj)With this and De Morgan’s laws, you can take any statement and *simplify* it to the point where negations are only being applied to atomic propositions. Well, except that you could get multiple negations stacked up. But this can be easily dealt with:[🔗](#sec_logic-rules-5-16)

#### Double Negation.

\begin{equation*} \neg \neg P \equiv P\text{.} \end{equation*} [🔗](#sec_logic-rules-5-17-2) Example: “It is not the case that \(c\) is not odd” means “\(c\) is odd.”[🔗](#sec_logic-rules-5-17-3) [🔗](#sec_logic-rules-5-17)Let’s see how we can apply the equivalences we have encountered.[🔗](#sec_logic-rules-5-18)

#### Example 1.3.8.

Prove that the statements \(\neg(P \imp Q)\) and \(P\wedge \neg Q\) are logically equivalent without using truth tables.[🔗](#sec_logic-rules-5-19-1-1) Solution. We want to start with one of the statements and transform it into the other through a sequence of logically equivalent statements. Start with \(\neg(P \imp Q)\text{.}\) We can rewrite the implication as a disjunction, so this is logically equivalent to \begin{equation*} \neg(\neg P \vee Q)\text{.} \end{equation*} Now apply De Morgan’s law to get \begin{equation*} \neg\neg P \wedge \neg Q\text{.} \end{equation*} Finally, use double negation to arrive at \(P \wedge \neg Q\) [🔗](#sec_logic-rules-5-19-2-1) [🔗](#sec_logic-rules-5-19-2) [🔗](#sec_logic-rules-5-19)Notice that the above example illustrates that the negation of an implication is NOT an implication: It is a conjunction! We saw this before, in [Section 1.1](sec_logic-statements.html), but it is so important and useful, it warrants stating as a theorem.[🔗](#sec_logic-rules-5-20)

#### Theorem 1.3.9. Negation of an Implication.

The negation of an implication is a conjunction: \begin{equation*} \neg(P \imp Q) \equiv P \wedge \neg Q\text{.} \end{equation*} That is, the only way for an implication to be false is for the hypothesis to be true *AND* the conclusion to be false. [🔗](#thm-neg-imp-2-1) [🔗](#thm-neg-imp)To verify that two statements are logically equivalent, you can use truth tables or a sequence of logically equivalent replacements. The truth table method, although cumbersome, has the advantage that it can verify that two statements are NOT logically equivalent.[🔗](#sec_logic-rules-5-22)

#### Example 1.3.10.

Are the statements \((P \vee Q) \imp R\) and \((P \imp R) \vee (Q \imp R)\) logically equivalent?[🔗](#sec_logic-rules-5-23-1-1) Solution. Note that while we could start rewriting these statements with logically equivalent replacements in the hopes of transforming one into another, we will never be sure that our failure is due to their lack of logical equivalence rather than our lack of imagination. So instead, let’s make a truth table:[🔗](#sec_logic-rules-5-23-2-1)

| \(P\) | \(Q\) | \(R\) | \((P\vee Q) \imp R\) | \((P\imp R) \vee (Q \imp R)\) |
| --- | --- | --- | --- | --- |
| T | T | T | T | T |
| T | T | F | F | F |
| T | F | T | T | T |
| T | F | F | F | T |
| F | T | T | T | T |
| F | T | F | F | T |
| F | F | T | T | T |
| F | F | F | T | T |
|  |  |  |  |  |

Look at the fourth (or sixth) row. In this case, \((P \imp R) \vee (Q \imp R)\) is true, but \((P \vee Q) \imp R\) is false. Therefore the statements are not logically equivalent.[🔗](#sec_logic-rules-5-23-2-3) While we don’t have logical equivalence, it is the case that whenever \((P \vee Q) \imp R\) is true, so is \((P \imp R) \vee (Q \imp R)\text{.}\) This tells us that we can *deduce* \((P \imp R) \vee (Q \imp R)\) from \((P \vee Q) \imp R\text{,}\) just not the reverse direction.[🔗](#sec_logic-rules-5-23-2-4) [🔗](#sec_logic-rules-5-23-2) [🔗](#sec_logic-rules-5-23)[🔗](#sec_logic-rules-5)

### Subsection Equivalence for Quantified Statements

All the examples we have looked at so far have only involved *propositional* logic, where the basic units of logic are statements that are either true or false. It is also possible to say that two statements involving quantifiers and predicates are logically equivalent.[🔗](#sec_logic-rules-6-2) Sometimes the quantifiers have nothing to do with the equivalence. For example, \begin{equation*} \forall x (P(x) \imp Q(x)) \equiv \forall x (\neg P(x) \vee Q(x))\text{.} \end{equation*} As soon as we replace the \(x\) with a constant, we are left with two statements that are logically equivalent based on their propositional form. [🔗](#sec_logic-rules-6-3) Other times, the more interesting times, it is exactly the logic of the quantifiers that makes the statements logically equivalent. What is especially interesting here is that we cannot use truth tables to verify these equivalences![🔗](#sec_logic-rules-6-4) Instead, we need to reason about the domain of discourse as a set. For example, let’s consider how negation interacts with quantifiers.[🔗](#sec_logic-rules-6-5) Consider the claim that “all odd numbers are prime.” We might represent this symbolically as \(\forall x (O(x) \imp P(x))\text{.}\) The statement clearly is not true, so what *is* true is that “not all odd numbers are prime” (i.e., \(\neg\forall x(O(x) \imp P(x))\)). How do we know? Easy: 9. Yes, 9 is odd but not prime. But is it enough that just one odd number isn’t prime?[🔗](#sec_logic-rules-6-6) To dispute a universal claim, you just need *one* single counterexample. You just need to show *there exists* a number for which the claim is false. In our case, we have the equivalence, \begin{equation*} \neg\forall x (O(x) \imp P(x)) \equiv \exists x (O(x) \wedge \neg P(x))\text{.} \end{equation*} If we ignore the quantifiers for a minute, we are left with \begin{equation*} \neg(O \imp P) \equiv O \wedge \neg P \end{equation*} which is exactly an example of [Theorem 1.3.9](sec_logic-rules.html#thm-neg-imp). The new, interesting part is that when we negated the universal quantifier, we got an existential quantifier. [🔗](#sec_logic-rules-6-7) Negating an existential quantifier results in a universal quantifier. This makes sense. If there does not exist something with a property, then everything does not have that property.[🔗](#sec_logic-rules-6-8)

#### Quantifiers and Negation.

> 
> > \(\neg \forall x P(x)\) is equivalent to \(\exists x \neg P(x)\text{.}\)[🔗](#sec_logic-rules-6-9-4-1)
> > \(\neg \exists x P(x)\) is equivalent to \(\forall x \neg P(x) \text{.}\)[🔗](#sec_logic-rules-6-9-4-2)
> > [🔗](#sec_logic-rules-6-9-4)

[🔗](#sec_logic-rules-6-9)Symbolically, we can pass the negation symbol over a quantifier, but that causes the quantifier to switch type.[🔗](#sec_logic-rules-6-10) Another way to see why this makes sense: Universal quantifiers are like (possibly infinite) conjunctions since they claim that the property is true of this thing, and that thing, and the other thing,... all things. Existential quantifiers are like (possibly infinite) disjunctions: The property is true of at least one thing, maybe this, or that, or the other, or.... De Morgan’s laws tell us that when we negate a conjunction, we get a disjunction, and when we negate a disjunction, we get a conjunction. Isn’t it great when everything works out as it should?[🔗](#sec_logic-rules-6-11)

#### Example 1.3.11.

Suppose we claim that there is no smallest number. We can translate this into symbols as \begin{equation*} \neg \exists x \forall y (x \le y)\text{.} \end{equation*} (“It is not true that there is a number \(x\) such that for all numbers \(y\text{,}\) \(x\) is less than or equal to \(y\text{.}\)”) [🔗](#sec_logic-rules-6-12-1-1) However, we know how negation interacts with quantifiers: We can pass a negation over a quantifier by switching the quantifier type (between universal and existential). So the statement above should be *logically equivalent* to \begin{equation*} \forall x \exists y (y \lt x)\text{.} \end{equation*} Notice that \(y \lt x\) is the negation of \(x \le y\text{.}\) This reads, “For every number \(x\) there is a number \(y\) which is smaller than \(x\text{.}\)” We see that this is another way to make our original claim. [🔗](#sec_logic-rules-6-12-1-2) [🔗](#sec_logic-rules-6-12)It is important to stress that predicate logic *extends* propositional logic (much like how quantum mechanics extends classical mechanics). Everything that we learned about logical equivalence and deductions still applies. However, predicate logic allows us to analyze statements at a higher resolution, digging down into the individual propositions \(P\text{,}\) \(Q\text{,}\) etc.[🔗](#sec_logic-rules-6-13) To do this, we need to understand how quantifiers and connectives interact. We have already seen something about negations and quantifiers. What about the other connectives? Let’s look at an example exploring how the universal quantifier and disjunctions can (or cannot) work together.[🔗](#sec_logic-rules-6-14)

#### Example 1.3.12.

Consider the two statements, \begin{equation*} \forall x (P(x) \vee Q(x)) \qquad \qquad \forall x P(x) \vee \forall x Q(x)\text{.} \end{equation*} Are these logically equivalent? [🔗](#sec_logic-rules-6-15-1-1) Solution. These statements are NOT logically equivalent. Intuitively, the statement on the left claims that everything is either a \(P\)-thing or a \(Q\)-thing. The statement on the right claims that either everything is a \(P\)-thing or that everything is a \(Q\)-thing. These *feel* different.[🔗](#sec_logic-rules-6-15-2-1) To be sure, we would like to think of predicates \(P(x)\) and \(Q(x)\) and some domain of discourse such that one of the statements is true and the other is false. How about we let \(P(x)\) be, “\(x\) is even” and \(Q(x)\) be, “\(x\) is odd.” Our domain of discourse will be all integers (as that is the set of numbers for which even and odd make sense).[🔗](#sec_logic-rules-6-15-2-2) The statement on the left is true! Every number is either even or odd. But is every number even? No. Is every number odd? No. So the statement on the right is false (it is a *false or false*).[🔗](#sec_logic-rules-6-15-2-3) Interestingly, the statement on the right implies the statement on the left. That is, \begin{equation*} (\forall x P(x) \vee \forall x E(x)) \imp \forall x (P(x) \vee Q(x)) \end{equation*} is always true. [🔗](#sec_logic-rules-6-15-2-4) This is similar to a tautology, although we reserve that term for necessary truths in propositional logic. A statement in predicate logic that is necessarily true gets the more prestigious designation of a law of logic (or sometimes logically valid, but that is less fun).[🔗](#sec_logic-rules-6-15-2-5) [🔗](#sec_logic-rules-6-15-2) [🔗](#sec_logic-rules-6-15)We can also consider how quantifiers interact with each other.[🔗](#sec_logic-rules-6-16)

#### Example 1.3.13.

Can you switch the order of quantifiers? For example, consider the two statements: \begin{equation*} \forall x \exists y P(x,y) \qquad \text{ and } \qquad \exists y \forall x P(x,y)\text{.} \end{equation*} Are these logically equivalent? [🔗](#sec_logic-rules-6-17-1-1) Solution. These statements are NOT logically equivalent. To see this, we should provide an interpretation of the predicate \(P(x,y)\) which makes one of the statements true and the other false.[🔗](#sec_logic-rules-6-17-2-1) Let \(P(x,y)\) be the predicate \(x \lt y\text{.}\) It is true, in the natural numbers, that for all \(x\) there is some \(y\) greater than that \(x\) (since there are infinitely many numbers). However, there is no natural number \(y\) which is greater than every number \(x\text{.}\) Thus it is possible for \(\forall x \exists y P(x,y)\) to be true while \(\exists y \forall x P(x,y)\) is false.[🔗](#sec_logic-rules-6-17-2-2) We cannot do the reverse of this though. If there is some \(y\) for which every \(x\) satisfies \(P(x,y)\text{,}\) then certainly for every \(x\) there is some \(y\) which satisfies \(P(x,y)\text{.}\) The first is saying we can find one \(y\) that works for every \(x\text{.}\) The second allows different \(y\)’s to work for different \(x\)’s, but nothing is preventing us from using the same \(y\) that works for every \(x\text{.}\) In other words, while we don’t have logical equivalence between the two statements, we do have a valid deduction rule:[🔗](#sec_logic-rules-6-17-2-3)

|  | \(\exists y \forall x P(x,y)\) |
| --- | --- |
| \(\therefore\) | \(\forall x \exists y P(x,y)\) |

Put yet another way, this says that the single statement \begin{equation*} \exists y \forall x P(x,y) \imp \forall x \exists y P(x,y) \end{equation*} is always true; it is a law of logic. [🔗](#sec_logic-rules-6-17-2-5) [🔗](#sec_logic-rules-6-17-2) [🔗](#sec_logic-rules-6-17)[🔗](#sec_logic-rules-6)

### Subsection Deductions

Earlier, we claimed that the following was a valid argument:[🔗](#sec_logic-rules-7-2)

> If Edith eats her vegetables, then she can have a cookie. Edith ate her vegetables. Therefore Edith gets a cookie.[🔗](#sec_logic-rules-7-3-1)
> > [🔗](#sec_logic-rules-7-3)

How do we know this is valid? Let’s look at the form of the statements. Let \(P\) denote, “Edith eats her vegetables” and \(Q\) denote, “Edith can have a cookie.” The logical form of the argument is then:[🔗](#sec_logic-rules-7-4)

|  | \(P \imp Q\) |
| --- | --- |
|  | \(P\) |
| \(\therefore\) | \(Q\) |

This is an example of a deduction rule, an argument form that is always valid. This one is a particularly famous rule called *modus ponens*. Are you convinced that it is a valid deduction rule? If not, consider the following truth table:[🔗](#sec_logic-rules-7-6)

| \(P\) | \(Q\) | \(P\imp Q\) |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

This is just the truth table for \(P \imp Q\text{,}\) but what matters here is that all the lines in the deduction rule have their own column in the truth table. Remember that an argument is valid provided the conclusion must be true given that the premises are true. The premises in this case are \(P \imp Q\) and \(P\text{.}\) Which *rows* of the truth table correspond to both of these being true? \(P\) is true in the first two rows, and of those, only the first row has \(P \imp Q\) true as well. And lo-and-behold, in this one case, \(Q\) is also true. So if \(P\imp Q\) and \(P\) are both true, we see that \(Q\) must be true as well.[🔗](#sec_logic-rules-7-8) Think of deduction rules as a sort of *one-way* form of logical equivalence. Two statements are logically equivalent provided that in every row of the truth table in which the first statement is true, so is the second, and in every row in which the second statement is true, so is the first. A deduction only requires the first of these two parts.[🔗](#sec_logic-rules-7-9) Here are a few more examples.[🔗](#sec_logic-rules-7-10)

#### Example 1.3.14.

Show that the following is a valid deduction rule.[🔗](#sec_logic-rules-7-11-1-1)

|  | \(P \imp Q\) |
| --- | --- |
|  | \(\neg P \imp Q\) |
| \(\therefore\) | \(Q\) |

Solution. We make a truth table which contains all the lines of the argument form:[🔗](#sec_logic-rules-7-11-2-1)

| \(P\) | \(Q\) | \(P\imp Q\) | \(\neg P\) | \(\neg P \imp Q\) |
| --- | --- | --- | --- | --- |
| T | T | T | F | T |
| T | F | F | F | T |
| F | T | T | T | T |
| F | F | T | T | F |

(we include a column for \(\neg P\) just as a helping step to get the column for \(\neg P \imp Q\)).[🔗](#sec_logic-rules-7-11-2-3) Now look at all the rows for which both \(P \imp Q\) and \(\neg P \imp Q\) are true. This happens only in rows 1 and 3. Hey! In those rows \(Q\) is true as well, so the argument form is valid (it is a valid deduction rule).[🔗](#sec_logic-rules-7-11-2-4) [🔗](#sec_logic-rules-7-11-2) [🔗](#sec_logic-rules-7-11)

#### Example 1.3.15.

Decide whether the following is a valid deduction rule.[🔗](#sec_logic-rules-7-12-1-1)

|  | \(P \imp R\) |
| --- | --- |
|  | \(Q \imp R\) |
|  | \(R\) |
| \(\therefore\) | \(P \vee Q\) |

Solution. Let’s make a truth table containing all four statements.[🔗](#sec_logic-rules-7-12-2-1)

| \(P\) | \(Q\) | \(R\) | \(P \imp R\) | \(Q \imp R\) | \(P \vee Q\) |
| --- | --- | --- | --- | --- | --- |
| T | T | T | T | T | T |
| T | T | F | F | F | T |
| T | F | T | T | T | T |
| T | F | F | F | T | T |
| F | T | T | T | T | T |
| F | T | F | T | F | T |
| F | F | T | T | T | F |
| F | F | F | T | T | F |

Look at the second-to-last row. Here all three premises of the argument are true, but the conclusion is false. Thus this is not a valid deduction rule.[🔗](#sec_logic-rules-7-12-2-3) While we have the truth table in front of us, look at rows 1, 3, and 5. These are the only rows in which all of the statements \(P \imp R\text{,}\) \(Q \imp R\text{,}\) and \(P\vee Q\) are true. It also happens that \(R\) is true in these rows as well. Thus we have discovered a new deduction rule we know *is* valid:[🔗](#sec_logic-rules-7-12-2-4)

|  | \(P \imp R\) |
| --- | --- |
|  | \(Q \imp R\) |
|  | \(P \vee Q\) |
| \(\therefore\) | \(R\) |

[🔗](#sec_logic-rules-7-12-2) [🔗](#sec_logic-rules-7-12)

#### Quantifier deductions.

There are also deduction rules we could write down for quantifiers. For example, such a rule might be:[🔗](#sec_logic-rules-7-13-2)

|  | \(\forall x P(x)\) |
| --- | --- |
| \(\therefore\) | \(\exists x P(x)\) |

If everything is a \(P\)-thing, then there must be something which is a \(P\)-thing. 3 Note that this does assume that your domain of discourse is non-empty. These rules cannot be verified with a truth table, and a full treatment of this sort of predicate logic is beyond the scope of this text.[🔗](#sec_logic-rules-7-13-4) [🔗](#sec_logic-rules-7-13)[🔗](#sec_logic-rules-7)

### Reading Questions Reading Questions

#### 1.

To check whether two statements are logically equivalent, you can use a truth table. Explain what you would look for in the truth table to conclude that the two statements are logically equivalent. What would tell you they are *not* logically equivalent?[🔗](#rq-logic-prop-equiv-1-1) [🔗](#rq-logic-prop-equiv)

#### 2.

To check whether a deduction rule is *valid*, you can use a truth table. Explain what you would look for in the completed truth table to say that the deduction rule is valid, and what would tell you the deduction rule is *not* valid.[🔗](#rq-logic-prop-deduction-1-1) [🔗](#rq-logic-prop-deduction)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-logic-prop-q-1-1) [🔗](#rq-logic-prop-q)[🔗](#rqs-logic-prop)

### Exercises Practice Problems

#### 1.

Activate Make a truth table for the statement \((P \wedge Q) \rightarrow (P \vee Q)\text{.}\)[🔗](#extracted-webwork-12-1-1-1)

| \(P\) | \(Q\) | \(P \wedge Q\) | \(P \vee Q\) | \((P \wedge Q) \rightarrow (P \vee Q))\) |
| --- | --- | --- | --- | --- |
| T | T |  |  |  |
| T | F |  |  |  |
| F | T |  |  |  |
| F | F |  |  |  |

[🔗](#ww-prop-tt-imp)

#### 2.

Activate Make a truth table for the statement \(\neg Q \vee (Q \rightarrow P))\)[🔗](#extracted-webwork-13-1-1-1)

| \(P\) | \(Q\) | \(\neg Q\) | \(Q \rightarrow P\) | \(\neg Q \vee (Q \rightarrow P))\) |
| --- | --- | --- | --- | --- |
| T | T |  |  |  |
| T | F |  |  |  |
| F | T |  |  |  |
| F | F |  |  |  |

What can you conclude about \(P\) and \(Q\) if you knew the statement above was false?[🔗](#extracted-webwork-13-1-1-3)

- That \(P\) and \(Q\) are both false.[🔗](#extracted-webwork-13-1-1-4-1-1-1) [🔗](#extracted-webwork-13-1-1-4-1-1)
- That \(P\) is true and \(Q\) is false.[🔗](#extracted-webwork-13-1-1-4-1-2-1) [🔗](#extracted-webwork-13-1-1-4-1-2)
- That \(P\) is false and \(Q\) is true.[🔗](#extracted-webwork-13-1-1-4-1-3-1) [🔗](#extracted-webwork-13-1-1-4-1-3)
- That \(P\) and \(Q\) are both true.[🔗](#extracted-webwork-13-1-1-4-1-4-1) [🔗](#extracted-webwork-13-1-1-4-1-4)
- None of the above.[🔗](#extracted-webwork-13-1-1-4-1-5-1) [🔗](#extracted-webwork-13-1-1-4-1-5)

[🔗](#extracted-webwork-13-1-1-4) [🔗](#ww-prop-tt-false)

#### 3.

Activate Make a truth table for the statement \(\neg P \wedge (Q \rightarrow R)\)[🔗](#extracted-webwork-14-1-1-1)

| \(P\) | \(Q\) | \(R\) | \(\neg P\) | \(Q \rightarrow R\) | \(\neg P \wedge (Q \rightarrow R)\) |
| --- | --- | --- | --- | --- | --- |
| T | T | T |  |  |  |
| T | T | F |  |  |  |
| T | F | T |  |  |  |
| T | F | F |  |  |  |
| F | T | T |  |  |  |
| F | T | F |  |  |  |
| F | F | T |  |  |  |
| F | F | F |  |  |  |

[🔗](#ww-prop-tt2)

#### 4.

Activate Determine whether the statements \(P \rightarrow (Q \vee R)\) and \((P \rightarrow Q) \vee (P\rightarrow R)\) are logically equivalent.[🔗](#extracted-webwork-15-1-1-1) First, make a truth table for both of the statements. (You might want to complete the truth table on paper so you can make columns for intermediate steps; just record the final columns here.)[🔗](#extracted-webwork-15-1-1-2)

| \(P\) | \(Q\) | \(R\) | \(P \rightarrow (Q \vee R)\) | \((P \rightarrow Q) \vee (P\rightarrow R)\) |
| --- | --- | --- | --- | --- |
| T | T | T |  |  |
| T | T | F |  |  |
| T | F | T |  |  |
| T | F | F |  |  |
| F | T | T |  |  |
| F | T | F |  |  |
| F | F | T |  |  |
| F | F | F |  |  |

Are the two statements logically equivalent?[🔗](#extracted-webwork-15-1-1-4)

- No, because the columns for the two statements are not identical.[🔗](#extracted-webwork-15-1-1-5-1-1-1) [🔗](#extracted-webwork-15-1-1-5-1-1)
- Yes, because even though the columns are not identical, there are some rows in which they are identical.[🔗](#extracted-webwork-15-1-1-5-1-2-1) [🔗](#extracted-webwork-15-1-1-5-1-2)
- No, because the statements are not always true.[🔗](#extracted-webwork-15-1-1-5-1-3-1) [🔗](#extracted-webwork-15-1-1-5-1-3)
- Yes, because the columns for the two statements are identical.[🔗](#extracted-webwork-15-1-1-5-1-4-1) [🔗](#extracted-webwork-15-1-1-5-1-4)
- Impossible to determine without more information.[🔗](#extracted-webwork-15-1-1-5-1-5-1) [🔗](#extracted-webwork-15-1-1-5-1-5)

[🔗](#extracted-webwork-15-1-1-5) [🔗](#ww-prop-tt-equiv)

#### 5.

Activate Determine if the following is a valid deduction rule:[🔗](#extracted-webwork-16-1-1-1)

|  | \(P \rightarrow Q\) |
| --- | --- |
|  | \(\neg Q\) |
| \(\therefore\) | \(\neg P\) |

First, make a truth table for the relevant statements. (You might want to complete the truth table on paper so you can make columns for intermediate steps; just record the final columns here.)[🔗](#extracted-webwork-16-1-1-3)

| \(P\) | \(Q\) | \(P \rightarrow Q\) | \(\neg Q\) | \(\neg P\) |
| --- | --- | --- | --- | --- |
| T | T |  |  |  |
| T | F |  |  |  |
| F | T |  |  |  |
| F | F |  |  |  |

Is the deduction rule valid?[🔗](#extracted-webwork-16-1-1-5)

- Yes, in every row where both premises are true, the conclusion is also true.[🔗](#extracted-webwork-16-1-1-6-1-1-1) [🔗](#extracted-webwork-16-1-1-6-1-1)
- Yes, because there is a row in which both premises are true.[🔗](#extracted-webwork-16-1-1-6-1-2-1) [🔗](#extracted-webwork-16-1-1-6-1-2)
- No, because the conclusion is not always true.[🔗](#extracted-webwork-16-1-1-6-1-3-1) [🔗](#extracted-webwork-16-1-1-6-1-3)
- No, because the columns for the two premises are not identical.[🔗](#extracted-webwork-16-1-1-6-1-4-1) [🔗](#extracted-webwork-16-1-1-6-1-4)
- Impossible to determine without more information.[🔗](#extracted-webwork-16-1-1-6-1-5-1) [🔗](#extracted-webwork-16-1-1-6-1-5)

[🔗](#extracted-webwork-16-1-1-6) [🔗](#ww-prop-tt-deduction)

#### 6.

Activate Determine if the following is a valid deduction rule:[🔗](#extracted-webwork-17-1-1-1)

|  | \(P \rightarrow (Q \vee R)\) |
| --- | --- |
|  | \(\neg(P \rightarrow Q)\) |
| \(\therefore\) | \(R\) |

First, make a truth table for the relevant statements. (You might want to complete the truth table on paper so you can make columns for intermediate steps; just record the final columns here.)[🔗](#extracted-webwork-17-1-1-3)

| \(P\) | \(Q\) | \(R\) | \(P \rightarrow (Q \vee R)\) | \(\neg(P \rightarrow Q)\) |
| --- | --- | --- | --- | --- |
| T | T | T |  |  |
| T | T | F |  |  |
| T | F | T |  |  |
| T | F | F |  |  |
| F | T | T |  |  |
| F | T | F |  |  |
| F | F | T |  |  |
| F | F | F |  |  |

Is the deduction rule valid?[🔗](#extracted-webwork-17-1-1-5)

- Yes, because there is a row in which both premises are true.[🔗](#extracted-webwork-17-1-1-6-1-1-1) [🔗](#extracted-webwork-17-1-1-6-1-1)
- Yes, in every row where both premises are true, the conclusion is also true.[🔗](#extracted-webwork-17-1-1-6-1-2-1) [🔗](#extracted-webwork-17-1-1-6-1-2)
- No, because the columns for the two premises are not identical.[🔗](#extracted-webwork-17-1-1-6-1-3-1) [🔗](#extracted-webwork-17-1-1-6-1-3)
- No, because the statements are not always true.[🔗](#extracted-webwork-17-1-1-6-1-4-1) [🔗](#extracted-webwork-17-1-1-6-1-4)
- Impossible to determine without more information.[🔗](#extracted-webwork-17-1-1-6-1-5-1) [🔗](#extracted-webwork-17-1-1-6-1-5)

[🔗](#extracted-webwork-17-1-1-6) [🔗](#ww-prop-tt-deduction2)

#### 7.

Activate Determine if the following is a valid deduction rule:[🔗](#extracted-webwork-18-1-1-1)

|  | \((P \wedge Q) \rightarrow R\) |
| --- | --- |
|  | \(\neg P \vee \neg Q\) |
| \(\therefore\) | \(\neg R\) |

First, make a truth table for the relevant statements. (You might want to complete the truth table on paper so you can make columns for intermediate steps; just record the final columns here.)[🔗](#extracted-webwork-18-1-1-3)

| \(P\) | \(Q\) | \(R\) | \((P \wedge Q) \rightarrow R\) | \(\neg P \vee \neg Q\) | \(\neg R\) |
| --- | --- | --- | --- | --- | --- |
| T | T | T |  |  |  |
| T | T | F |  |  |  |
| T | F | T |  |  |  |
| T | F | F |  |  |  |
| F | T | T |  |  |  |
| F | T | F |  |  |  |
| F | F | T |  |  |  |
| F | F | F |  |  |  |

Is the deduction rule valid?[🔗](#extracted-webwork-18-1-1-5)

- No, because the columns for the two premises are not identical.[🔗](#extracted-webwork-18-1-1-6-1-1-1) [🔗](#extracted-webwork-18-1-1-6-1-1)
- Yes, because there is a row in which the conclusion and both premises are true.[🔗](#extracted-webwork-18-1-1-6-1-2-1) [🔗](#extracted-webwork-18-1-1-6-1-2)
- No, because there is a row in which both premises are true but the conclusion is false.[🔗](#extracted-webwork-18-1-1-6-1-3-1) [🔗](#extracted-webwork-18-1-1-6-1-3)
- Yes, because in every row that the conclusion is true, one of the premises is true.[🔗](#extracted-webwork-18-1-1-6-1-4-1) [🔗](#extracted-webwork-18-1-1-6-1-4)
- Impossible to determine without more information.[🔗](#extracted-webwork-18-1-1-6-1-5-1) [🔗](#extracted-webwork-18-1-1-6-1-5)

[🔗](#extracted-webwork-18-1-1-6) [🔗](#ww-prop-tt-deduction3)

#### 8.

Activate Determine if the following is a valid deduction rule:[🔗](#extracted-webwork-19-1-1-1)

|  | \(P \rightarrow Q\) |
| --- | --- |
|  | \(P \wedge \neg Q\) |
| \(\therefore\) | \(R\) |

First, make a truth table for the relevant statements. (You might want to complete the truth table on paper so you can make columns for intermediate steps; just record the final columns here.)[🔗](#extracted-webwork-19-1-1-3)

| \(P\) | \(Q\) | \(R\) | \(P \rightarrow Q\) | \(P \wedge \neg Q\) |
| --- | --- | --- | --- | --- |
| T | T | T |  |  |
| T | T | F |  |  |
| T | F | T |  |  |
| T | F | F |  |  |
| F | T | T |  |  |
| F | T | F |  |  |
| F | F | T |  |  |
| F | F | F |  |  |

Is the deduction rule valid?[🔗](#extracted-webwork-19-1-1-5)

- Yes, because there is a row in which both premises are true.[🔗](#extracted-webwork-19-1-1-6-1-1-1) [🔗](#extracted-webwork-19-1-1-6-1-1)
- No, because the columns for the two premises are not identical.[🔗](#extracted-webwork-19-1-1-6-1-2-1) [🔗](#extracted-webwork-19-1-1-6-1-2)
- Yes, in every row where both premises are true, the conclusion is also true.[🔗](#extracted-webwork-19-1-1-6-1-3-1) [🔗](#extracted-webwork-19-1-1-6-1-3)
- No, because the premises are never both true in the same row.[🔗](#extracted-webwork-19-1-1-6-1-4-1) [🔗](#extracted-webwork-19-1-1-6-1-4)
- Impossible to determine without more information.[🔗](#extracted-webwork-19-1-1-6-1-5-1) [🔗](#extracted-webwork-19-1-1-6-1-5)

[🔗](#extracted-webwork-19-1-1-6) [🔗](#ww-prop-tt-deduction4)

#### 9.

Which of the following statements is a *law of logic*? That is, which of the following are true no matter what your domain of discourse is and no matter what you interpret the predicates as meaning? Select all that apply.[🔗](#rs-logic-quant-deduction-1-1)

- \(\forall x (P(x) \vee \neg P(x))\text{.}\)
- \(\exists x P(x) \imp \forall x P(x)\text{.}\)
- \(\neg\forall x P(x) \imp \exists x P(x)\text{.}\)
- \(\forall x \exists y P(x,y) \iff \exists y \forall x P(x,y)\text{.}\)

[🔗](#rs-logic-quant-deduction)[🔗](#practice-logic-rules)

### Exercises Additional Exercises

#### 1.

You stumble upon two trolls playing Stratego®. They tell you:[🔗](#exercises-logic-rules-2-3-1)

> Troll 1: If we are cousins, then we are both knaves.[🔗](#exercises-logic-rules-2-3-2-1)
> > Troll 2: We are cousins, or we are both knaves.[🔗](#exercises-logic-rules-2-3-2-2)
> > [🔗](#exercises-logic-rules-2-3-2)

Could both trolls be knights? Recall that all trolls are either always-truth-telling knights or always-lying knaves. Explain your answer and how you can use truth tables to find it.[🔗](#exercises-logic-rules-2-3-3) Hint. You could probably reason through the cases by hand, but try making a truth table. Use two statements, \(P\) being “we are cousins” and \(Q\) being “we are both knaves”.[🔗](#exercises-logic-rules-2-4-1) [🔗](#exercises-logic-rules-2-4) [🔗](#exercises-logic-rules-2)

#### 2.

Next you come upon three trolls, helpfully wearing name tags. They say: Pat[🔗](#exercises-logic-rules-3-1-1-1-1) If either Quinn or I are knights, then so is Ryan.[🔗](#exercises-logic-rules-3-1-1-1-1-2) Quinn[🔗](#exercises-logic-rules-3-1-1-1-2) Ryan is a knight, and if Pat is a knight, then so am I.[🔗](#exercises-logic-rules-3-1-1-1-2-2) Ryan[🔗](#exercises-logic-rules-3-1-1-1-3) Quinn is a knave, but Pat and I share the same persuasion.[🔗](#exercises-logic-rules-3-1-1-1-3-2) Create a truth table that includes all three statements. Then use the truth table to determine the persuasion of each troll. [🔗](#exercises-logic-rules-3-1-1) [🔗](#exercises-logic-rules-3)

#### 3.

Consider the statement about a party, “If it’s your birthday or there will be cake, then there will be cake.”

1. Translate the above statement into symbols. Clearly state which statement is \(P\) and which is \(Q\text{.}\)[🔗](#exercises-logic-rules-4-1-1-2-1-1) [🔗](#exercises-logic-rules-4-1-1-2-1)
2. Make a truth table for the statement.[🔗](#exercises-logic-rules-4-1-1-2-2-1) [🔗](#exercises-logic-rules-4-1-1-2-2)
3. Assuming the statement is true, what (if anything) can you conclude if you know there will be cake?[🔗](#exercises-logic-rules-4-1-1-2-3-1) [🔗](#exercises-logic-rules-4-1-1-2-3)
4. Assuming the statement is true, what (if anything) can you conclude if you know there will not be cake?[🔗](#exercises-logic-rules-4-1-1-2-4-1) [🔗](#exercises-logic-rules-4-1-1-2-4)
5. Suppose you found out that the statement was a lie. What can you conclude?[🔗](#exercises-logic-rules-4-1-1-2-5-1) [🔗](#exercises-logic-rules-4-1-1-2-5)

[🔗](#exercises-logic-rules-4-1-1) [🔗](#exercises-logic-rules-4)

#### 4.

Geoff Poshingten is out at a fancy pizza joint and decides to order a calzone. When the waiter asks what he would like in it, he replies, “I want either pepperoni or sausage. Also, if I have sausage, then I must also include quail. Oh, and if I have pepperoni or quail, then I must also have ricotta cheese.”

1. Translate Geoff’s order into logical symbols.[🔗](#exercises-logic-rules-5-1-1-2-1-1) [🔗](#exercises-logic-rules-5-1-1-2-1)
2. The waiter knows that Geoff is either a liar or a truth-teller (so either everything he says is false, or everything is true). Which is it?[🔗](#exercises-logic-rules-5-1-1-2-2-1) [🔗](#exercises-logic-rules-5-1-1-2-2)
3. What, if anything, can the waiter conclude about the ingredients in Geoff’s desired calzone?[🔗](#exercises-logic-rules-5-1-1-2-3-1) [🔗](#exercises-logic-rules-5-1-1-2-3)

[🔗](#exercises-logic-rules-5-1-1) Hint. You should write down three statements using the symbols \(P, Q, R, S\text{.}\) If Geoff is a truth-teller, then all three statements would be true. If he was a liar, then all three statements would be false. But in either case, we don’t yet know whether the four atomic statements are true or false, since he hasn’t said them by themselves.[🔗](#exercises-logic-rules-5-2-1) A truth table might help, although it is probably not entirely necessary.[🔗](#exercises-logic-rules-5-2-2) [🔗](#exercises-logic-rules-5-2) [🔗](#exercises-logic-rules-5)

#### 5.

Determine whether the following two statements are logically equivalent: \(\neg(P \imp Q)\) and \(P \wedge \neg Q\text{.}\) Explain how you know you are correct.[🔗](#exercises-logic-rules-6-1-1) [🔗](#exercises-logic-rules-6)

#### 6.

Simplify the following statements (so that negation only appears right before variables).

1. \(\neg(P \imp \neg Q)\text{.}\) [🔗](#exercises-logic-rules-7-1-1-1-1)
2. \((\neg P \vee \neg Q) \imp \neg (\neg Q \wedge R)\text{.}\) [🔗](#exercises-logic-rules-7-1-1-1-2)
3. \(\neg((P \imp \neg Q) \vee \neg (R \wedge \neg R))\text{.}\) [🔗](#exercises-logic-rules-7-1-1-1-3)
4. It is false that if Sam is not a man then Chris is a woman, and that Chris is not a woman.[🔗](#exercises-logic-rules-7-1-1-1-4-1) [🔗](#exercises-logic-rules-7-1-1-1-4)

[🔗](#exercises-logic-rules-7-1-1) [🔗](#exercises-logic-rules-7)

#### 7.

Use De Morgan’s Laws and any other logical equivalence facts you know to simplify the following statements. Show all your steps. Your final statements should have negations only appear directly next to the sentence variables or predicates (\(P\text{,}\) \(Q\text{,}\) \(E(x)\text{,}\) etc.), and no double negations. It would be a good idea to use only conjunctions, disjunctions, and negations.

1. \(\neg((\neg P \wedge Q) \vee \neg(R \vee \neg S))\text{.}\) [🔗](#exercises-logic-rules-8-1-1-4-1)
2. \(\neg((\neg P \imp \neg Q) \wedge (\neg Q \imp R))\) (careful with the implications). [🔗](#exercises-logic-rules-8-1-1-4-2)
3. For both parts above, verify your answers are correct using truth tables. That is, use a truth table to check that the given statement and your proposed simplification are actually logically equivalent.[🔗](#exercises-logic-rules-8-1-1-4-3-1) [🔗](#exercises-logic-rules-8-1-1-4-3)

[🔗](#exercises-logic-rules-8-1-1) [🔗](#exercises-logic-rules-8)

#### 8.

Consider the statement, “If a number is triangular or square, then it is not prime”

1. Make a truth table for the statement \((T \vee S) \imp \neg P\text{.}\)[🔗](#exercises-logic-rules-9-1-1-2-1-1) [🔗](#exercises-logic-rules-9-1-1-2-1)
2. If you believed the statement was *false*, what properties would a counterexample need to possess? Explain by referencing your truth table.[🔗](#exercises-logic-rules-9-1-1-2-2-1) [🔗](#exercises-logic-rules-9-1-1-2-2)
3. If the statement were true, what could you conclude about the number 5657, which is definitely prime? Again, explain using the truth table.[🔗](#exercises-logic-rules-9-1-1-2-3-1) [🔗](#exercises-logic-rules-9-1-1-2-3)

[🔗](#exercises-logic-rules-9-1-1) Hint.

1. There will be three rows in which the statement is false.[🔗](#exercises-logic-rules-9-2-1-1-1-1) [🔗](#exercises-logic-rules-9-2-1-1-1)
2. Consider the three rows that evaluate to false, and say what the truth values of \(T\text{,}\) \(S\text{,}\) and \(P\) are there.[🔗](#exercises-logic-rules-9-2-1-1-2-1) [🔗](#exercises-logic-rules-9-2-1-1-2)
3. You are looking for a row in which \(P\) is true and the whole statement is true.[🔗](#exercises-logic-rules-9-2-1-1-3-1) [🔗](#exercises-logic-rules-9-2-1-1-3)

[🔗](#exercises-logic-rules-9-2-1) [🔗](#exercises-logic-rules-9-2) [🔗](#exercises-logic-rules-9)

#### 9.

Tommy Flanagan was telling you what he ate yesterday afternoon. He tells you, “I had either popcorn or raisins. Also, if I had cucumber sandwiches, then I had soda. But I didn’t drink soda or tea.” Of course, you know that Tommy is the world’s worst liar, and everything he says is false. What did Tommy eat?[🔗](#exercises-logic-rules-10-1-1) Justify your answer by writing all of Tommy’s statements using sentence variables (\(P, Q, R, S, T\)), taking their negations, and using these to deduce what Tommy actually ate.[🔗](#exercises-logic-rules-10-1-2) Hint. Write down three statements, and then take the negation of each (since he is a liar). You should find that Tommy ate one item and drank one item. (\(Q\) is for cucumber sandwiches.)[🔗](#exercises-logic-rules-10-2-1) [🔗](#exercises-logic-rules-10-2) [🔗](#exercises-logic-rules-10)

#### 10.

Can you chain implications together? That is, if \(P \imp Q\) and \(Q \imp R\text{,}\) does that means the \(P \imp R\text{?}\) Prove that the following is a valid deduction rule:[🔗](#exercises-logic-rules-11-1-1)

|  | \(P \imp Q\) |
| --- | --- |
|  | \(Q \imp R\) |
| \(\therefore\) | \(P \imp R\) |

[🔗](#exercises-logic-rules-11)

#### 11.

Suppose \(P\) and \(Q\) are (possibly molecular) propositional statements. Prove that \(P\) and \(Q\) are logically equivalent if and only if \(P \iff Q\) is a tautology.[🔗](#exercises-logic-rules-12-1-1) Hint. What do these concepts mean in terms of truth tables?[🔗](#exercises-logic-rules-12-2-1) [🔗](#exercises-logic-rules-12-2) [🔗](#exercises-logic-rules-12)

#### 12.

Suppose \(P_1, P_2, \ldots, P_n\) and \(Q\) are (possibly molecular) propositional statements. Suppose further that[🔗](#exercises-logic-rules-13-1-1)

|  | \(P_1\) |
| --- | --- |
|  | \(P_2\) |
|  | \(\vdots\) |
|  | \(P_n\) |
| \(\therefore\) | \(Q\) |

is a valid deduction rule. Prove that the statement \begin{equation*} (P_1 \wedge P_2 \wedge \cdots \wedge P_n) \imp Q \end{equation*} is a tautology. [🔗](#exercises-logic-rules-13-1-3) [🔗](#exercises-logic-rules-13)

#### 13.

Consider the statements below. Translate each into symbols, using the predicate \(F(x,y)\) for “person \(x\) can be fooled at time \(y\text{.}\)” Decide whether any of the statements are equivalent to each other, or whether any imply any others, in this context or in general.[🔗](#exercises-logic-rules-14-1-1)

1. You can fool some people all of the time.[🔗](#exercises-logic-rules-14-1-2-1-1-1) [🔗](#exercises-logic-rules-14-1-2-1-1)
2. You can fool everyone some of the time.[🔗](#exercises-logic-rules-14-1-2-1-2-1) [🔗](#exercises-logic-rules-14-1-2-1-2)
3. You can always fool some people.[🔗](#exercises-logic-rules-14-1-2-1-3-1) [🔗](#exercises-logic-rules-14-1-2-1-3)
4. Sometimes you can fool everyone.[🔗](#exercises-logic-rules-14-1-2-1-4-1) [🔗](#exercises-logic-rules-14-1-2-1-4)

[🔗](#exercises-logic-rules-14-1-2) [🔗](#exercises-logic-rules-14)

#### 14.

Suppose \(P(x)\) is some predicate for which the statement \(\forall x P(x)\) is true. Is it also the case that \(\exists x P(x)\) is true? In other words, is the statement \(\forall x P(x) \imp \exists x P(x)\) always true? Is the converse always true? Assume the domain of discourse is non-empty.[🔗](#exercises-logic-rules-15-1-1) Hint. Try an example. What if \(P(x)\) was the predicate, “\(x\) is prime”? What if it was, “If \(x\) is divisible by 4, then it is even”? Of course examples are not enough to prove something in general, but that is entirely the point of this question.[🔗](#exercises-logic-rules-15-2-1) [🔗](#exercises-logic-rules-15-2) [🔗](#exercises-logic-rules-15)

#### 15.

Simplifying negations will be especially useful when we try to prove a statement by considering what would happen if it were false. For each statement below, write the *negation* of the statement as simply as possible. Don’t just say, “It is false that …”

1. Every number is either even or odd.[🔗](#exercises-logic-rules-16-1-1-3-1-1) [🔗](#exercises-logic-rules-16-1-1-3-1)
2. There is a sequence that is both arithmetic and geometric.[🔗](#exercises-logic-rules-16-1-1-3-2-1) [🔗](#exercises-logic-rules-16-1-1-3-2)
3. For all numbers \(n\text{,}\) if \(n\) is prime, then \(n+3\) is not prime.[🔗](#exercises-logic-rules-16-1-1-3-3-1) [🔗](#exercises-logic-rules-16-1-1-3-3)

[🔗](#exercises-logic-rules-16-1-1) Hint. It might help to translate the statements into symbols and then use the formulaic rules to simplify negations (i.e., rules for quantifiers and De Morgan’s laws). After simplifying, you should get \(\forall x(\neg E(x) \wedge \neg O(x))\) for the first one, for example. Then translate this back into English.[🔗](#exercises-logic-rules-16-2-1) [🔗](#exercises-logic-rules-16-2) [🔗](#exercises-logic-rules-16)

#### 16.

We can simplify statements in predicate logic using our rules for passing negations over quantifiers before applying logical equivalence to the “inside” propositional part. Simplify the statements below (so negation appears only directly next to predicates).

1. \(\neg \exists x \forall y (\neg O(x) \vee E(y))\text{.}\) [🔗](#exercises-logic-rules-17-1-1-2-1)
2. \(\neg \forall x \neg \forall y \neg(x \lt y \wedge \exists z (x \lt z \vee y \lt z))\text{.}\) [🔗](#exercises-logic-rules-17-1-1-2-2)
3. There is a number \(n\) for which no other number is less than or equal to \(n\text{.}\)[🔗](#exercises-logic-rules-17-1-1-2-3-1) [🔗](#exercises-logic-rules-17-1-1-2-3)
4. It is false that for every number \(n\) there are two other numbers which \(n\) is between.[🔗](#exercises-logic-rules-17-1-1-2-4-1) [🔗](#exercises-logic-rules-17-1-1-2-4)

[🔗](#exercises-logic-rules-17-1-1) [🔗](#exercises-logic-rules-17)

#### 17.

Simplify the statements below to the point that negation symbols occur only directly next to predicates.

1. \(\neg \forall x \forall y (x \lt y \vee y \lt x)\text{.}\)[🔗](#exercises-logic-rules-18-1-1-1-1-1) [🔗](#exercises-logic-rules-18-1-1-1-1)
2. \(\neg(\exists x P(x) \imp \forall y P(y))\text{.}\)[🔗](#exercises-logic-rules-18-1-1-1-2-1) [🔗](#exercises-logic-rules-18-1-1-1-2)

[🔗](#exercises-logic-rules-18-1-1) [🔗](#exercises-logic-rules-18)[🔗](#exercises-logic-rules)[🔗](#sec_logic-rules) [&#xe5cb;Prev](sec_logic-implications.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_logic-proofs.html) [Feedback](/cdn-cgi/l/email-protection#711e021210035f1d1407181f31041f121e5f141504)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_logic-rules-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_logic-rules-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
