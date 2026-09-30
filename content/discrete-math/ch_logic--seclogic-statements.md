---
title: "Mathematical Statements"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_logic-statements.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 1.1 Mathematical Statements

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_logic-statements-2-1-1)

1. Identify the logical structure of statements to determine their truth value in terms of the truth values of their parts.[🔗](#sec_logic-statements-2-2-1-1) [🔗](#sec_logic-statements-2-2-1)
2. Identify the use of quantifiers in a statement, and determine the truth value of the statement based on those quantifiers.[🔗](#sec_logic-statements-2-2-2-1) [🔗](#sec_logic-statements-2-2-2)
3. Translate between statements in natural language and logical symbols.[🔗](#sec_logic-statements-2-2-3-1) [🔗](#sec_logic-statements-2-2-3)

[🔗](#sec_logic-statements-2)

### Subsection Section Preview

#### Investigate!

While walking through a fictional forest, you encounter three trolls guarding a bridge. Each is either a *knight*, who always tells the truth, or a *knave*, who always lies. The trolls will not let you pass until you correctly identify each as either a knight or a knave. Each troll makes a single statement:[🔗](#sec_logic-statements-3-2-3)

> Troll 1: If I am a knave, then there are exactly two knights here.[🔗](#sec_logic-statements-3-2-4-1)
> > Troll 2: Troll 1 is lying.[🔗](#sec_logic-statements-3-2-4-2)
> > Troll 3: Either we are all knaves, or at least one of us is a knight.[🔗](#sec_logic-statements-3-2-4-3)
> > [🔗](#sec_logic-statements-3-2-4)

Which troll is which? [🔗](#sec_logic-statements-3-2-5) [🔗](#sec_logic-statements-3-2)

#### Try it 1.1.1.

Spend a few minutes thinking about the Investigate problem above. What could you conclude if you knew Troll 1 really was a knave (i.e., their statement was false)? Share your initial thoughts on this.[🔗](#ip_sec_logic-statements-1-1) [🔗](#ip_sec_logic-statements)In order to *do* mathematics, we must be able to *talk* and *write* about mathematics. Perhaps your experience with mathematics so far has mostly involved finding numerical answers to problems. As we embark towards more advanced and abstract mathematics, writing will play a more prominent role in the mathematical process.[🔗](#sec_logic-statements-3-4) In fact, the primary goal of mathematics, as an academic discipline in its own right, is to establish general mathematical truths. How can we know whether these facts, perhaps called *theorems* or *propositions*, are true? We construct valid arguments, called *proofs*, which establish the truth of the statements. Here, an argument is not the sort of thing you have with your Mom when you disagree about what to have for dinner. Rather, we have a technical definition of the term.[🔗](#sec_logic-statements-3-5)

#### Definition 1.1.2. Argument.

An argument is a sequence of statements, the last of which is called the conclusion and the rest of which are called premises. [🔗](#def-argument-8-1) An argument is said to be valid provided the conclusion must be true whenever the premises are all true. An argument is invalid if it is not valid; that is, all the premises can be true, and the conclusion could still be false.[🔗](#def-argument-8-2) An argument is sound provided it is valid and all the premises are true. A proof of a statement is a sound argument whose conclusion is the statement.[🔗](#def-argument-8-3) [🔗](#def-argument)

#### By the way...

Our definitions of argument, valid argument, and sound argument are the same ones used in philosophy, the other primary academic discipline concerned with logic and reasoning.[🔗](#sec_logic-statements-3-7-1) To determine whether we have a proof of a statement, we must decide both whether every premise is true, and whether the argument is valid: whether the conclusion *follows from* the premises. How can we do this?[🔗](#sec_logic-statements-3-8)

#### Example 1.1.3.

Consider the following two arguments:[🔗](#sec_logic-statements-3-9-2-1)

|  | If Edith eats her vegetables, then she can have a cookie. |
| --- | --- |
|  | Edith eats her vegetables. |
| \(\therefore\) | Edith gets a cookie. |

|  | Florence must eat her vegetables to get a cookie. |
| --- | --- |
|  | Florence eats her vegetables. |
| \(\therefore\) | Florence gets a cookie. |

(The symbol “\(\therefore\)” means “therefore”)[🔗](#sec_logic-statements-3-9-2-4) Are these arguments valid?[🔗](#sec_logic-statements-3-9-2-5) Solution. Do you agree that the first argument is valid but the second argument is not? We will soon develop a better understanding of the logic involved in this analysis, but if your intuition agrees with this assessment, then you are in good shape.[🔗](#sec_logic-statements-3-9-3-1) Notice the two arguments look almost identical. Edith and Florence both eat their vegetables. In both cases, there is a connection between the eating of vegetables and cookies. Yet we claim that it is valid to conclude that Edith gets a cookie, but not that Florence does. The difference must be in the connection between eating vegetables and getting cookies. We need to be skilled at reading and comprehending these sentences. Do the two sentences mean the same thing?[🔗](#sec_logic-statements-3-9-3-2) Unfortunately, in everyday language we are often sloppy, and you might be tempted to say they are equivalent. But notice that just because Florence *must* eat her vegetables, we have not claimed that doing so would be *enough* (she might also need to clean her room, for example). In everyday (non-mathematical) practice, you might be tempted to say this “other direction” is implied. In mathematics, we never get that luxury.[🔗](#sec_logic-statements-3-9-3-3) [🔗](#sec_logic-statements-3-9-3) [🔗](#sec_logic-statements-3-9)

#### Remark 1.1.4.

The arguments in the example above illustrate another important point: Even if you don’t care about the advancement of human knowledge in the field of mathematics, becoming skilled at analyzing arguments is useful. And even if you don’t want to give your grandmother a cookie. If you are *using* mathematics to solve problems in some other discipline, it is still necessary to demonstrate that your solution is correct. You better have a good argument that it is![🔗](#sec_logic-statements-3-10-1) [🔗](#sec_logic-statements-3-10)Since arguments are built up of statements, we must agree on what counts as a statement.[🔗](#sec_logic-statements-3-11)

#### Definition 1.1.5.

A statement is a declarative sentence that is either true or false.[🔗](#def-statement-2-1) [🔗](#def-statement)If the sentences in an argument could not be true or false, there would be no way to determine whether the argument was valid, since validity describes a relationship between the truth values of the premises and conclusions.[🔗](#sec_logic-statements-3-13) The goal of this section is to explore the different “shapes” a statement can take. We will see that more complicated statements can be built up from simpler ones, in ways that entirely determine their truth value based on the truth values of their parts.[🔗](#sec_logic-statements-3-14)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-logic-statements)

Before reading on to the main content of the section, complete this preview activity to start thinking about the types of questions this section will address.[🔗](#PA-logic-statements-2-1)

#### 1.

Which of the following sentences should count as statements? That is, for which of the sentences below could you *potentially* claim the sentence was either true or false? Select all that apply.[🔗](#pa-logic-statements-vs-sentences-1-1)

- The sum of the first 100 positive integers.
- This is not a statement. It is not even a complete sentence (there is no verb).
- What is the sum of the first 100 positive integers?
- This is a question. It is not a statement.
- The sum of the first 100 positive integers is 5050.
- This is a statement. It is either true or false (it happens to be true).
- Is the sum of the first 100 positive integers 5050?
- This is a question. The answer happens to be “yes”, but that is not the same as saying “true”. Questions are never statements.
- The sum of the first 100 positive integers is 17.
- This is clearly false. But since it is false, it is a statement!

[🔗](#pa-logic-statements-vs-sentences)

#### 2.

You and your roommate are arguing, and they make the audacious claim that pineapple is good both on pizza and in smoothies. Which of the following are reasonable responses to this claim, from a logical point of view?[🔗](#pa-logic-statements-tf-and-1-1)

- The statement is false because even though pineapple is good in smoothies, it is NOT good on pizza.
- If you really think that pineapple is not good on pizza, then you would have to say the statement is false. The statement is claiming both are true.
- The statement is false because while pineapple is good on pizza and pineapple is good in smoothies, a pizza smoothie is never good.
- The claim that pineapple is good both on pizza and in smoothies is not claiming that it is only good at the same time. It is precisely claiming these two separate facts are both true.
- The statement is half true because regardless of what you think about pineapple on pizza, we can all agree at least that pineapple is good in smoothies.
- Statements are either true or false. There is no “half true.”.
- The statement is false because everyone who likes pineapple on pizza does NOT like pineapple in smoothies.
- If it were the case that everyone who liked pineapple on pizza didn’t like pineapple in smoothies, then the statement would indeed be false.

[🔗](#pa-logic-statements-tf-and)

#### 3.

Your roommate now makes an even more outrageous claim: If a superhero movie is part of the Marvel Cinematic Universe, then it is good. Which of the following are reasonable responses to this claim, from a logical point of view?[🔗](#pa-logic-statements-tf-if-then-1-1)

- This is false because there are good superhero movies, like Wonder Woman and Dark Knight, that are based on DC Comics, and so not part of the Marvel Cinematic Universe.
- The claim was that *if* a movie was Marvel, then it was good. It is not claiming that if a movie is good, then it is Marvel.
- The statement is false because there is at least one superhero movie that is part of the Marvel Cinematic Universe that is also not good.
- Exactly. This is what it means for an if-then statement to be false.
- The statement is false because, for example, Green Lantern is neither Marvel nor good.
- Actually, I’ve never seen that movie, but even if it were bad, that doesn’t say anything about the original statement, since it is not a Marvel movie.
- The statement is true because more than half of the Marvel movies are good.
- The claim was that this statement held for *every* superhero movie, not just most of them.

[🔗](#pa-logic-statements-tf-if-then)

#### 4.

Your roommate just won’t let up with their outrageous claims. Now they claim that either every troll is a knave, or there is at least one troll that is a knight. What can you say to this?[🔗](#pa-logic-statement-tf-or-all-1-1)

- Yes, this is true because every troll is either a knight or a knave. If it is not the case that *all* trolls are knaves, then there must be *some* troll that is a knight.
- Exactly!
- This is false because some trolls are knights and some other trolls are knaves.
- If that were the case, there would be at least one knight.
- The statement is false because there is no way to verify which of the two options is the case.
- Whether it is possible to verify which part of an “or” statement is true does not change whether the statement is true.
- The statement is false because no troll could say that all trolls are knaves, since knaves always lie.
- It’s true that if a troll said that all trolls are knaves they would have to be a knave and then it would be false that all trolls were knaves. But luckily there is another option.

[🔗](#pa-logic-statement-tf-or-all)[🔗](#PA-logic-statements)[🔗](#sec_logic-statements-3)

### Subsection Atomic and Molecular Statements

A statement is any declarative sentence which is either true or false. A statement is atomic if it cannot be divided into smaller statements, otherwise it is called molecular.[🔗](#atomic-molecular-statements-2)

#### Example 1.1.6.

These are statements (in fact, *atomic* statements):

- Telephone numbers in the USA have 10 digits.[🔗](#atomic-molecular-statements-3-1-1-2-1-1) [🔗](#atomic-molecular-statements-3-1-1-2-1)
- The moon is made of cheese.[🔗](#atomic-molecular-statements-3-1-1-2-2-1) [🔗](#atomic-molecular-statements-3-1-1-2-2)
- 42 is a perfect square.[🔗](#atomic-molecular-statements-3-1-1-2-3-1) [🔗](#atomic-molecular-statements-3-1-1-2-3)
- Every even number greater than 2 can be expressed as the sum of two primes.[🔗](#atomic-molecular-statements-3-1-1-2-4-1) [🔗](#atomic-molecular-statements-3-1-1-2-4)
- \(\displaystyle 3+7 = 12\)[🔗](#atomic-molecular-statements-3-1-1-2-5-1) [🔗](#atomic-molecular-statements-3-1-1-2-5)

And these are not statements:

- Would you like some cake?[🔗](#atomic-molecular-statements-3-1-1-3-1-1) [🔗](#atomic-molecular-statements-3-1-1-3-1)
- The sum of two squares.[🔗](#atomic-molecular-statements-3-1-1-3-2-1) [🔗](#atomic-molecular-statements-3-1-1-3-2)
- \(1+3+5+7+\cdots+2n+1\text{.}\) [🔗](#atomic-molecular-statements-3-1-1-3-3)
- Go to your room![🔗](#atomic-molecular-statements-3-1-1-3-4-1) [🔗](#atomic-molecular-statements-3-1-1-3-4)
- \(\displaystyle 3+x = 12\)[🔗](#atomic-molecular-statements-3-1-1-3-5-1) [🔗](#atomic-molecular-statements-3-1-1-3-5)

[🔗](#atomic-molecular-statements-3-1-1) [🔗](#atomic-molecular-statements-3) The reason the sentence “\(3 + x = 12\)” is not a statement is that it contains a variable. Depending on what \(x\) is, the sentence is either true or false, but right now it is neither. One way to make the *sentence* into a *statement* is to specify the value of the variable in some way. This could be done by setting a specific substitution, for example, “\(3+x = 12\) where \(x = 9\text{,}\)” which is a true statement. Or you could *capture* the free variable by *quantifying* over it, as in, “For all values of \(x\text{,}\) \(3+x = 12\text{,}\)” which is false. We will discuss quantifiers in more detail in the subsection [Quantifiers and Predicates](sec_logic-statements.html#subsec_logic-statements-quant) below.[🔗](#atomic-molecular-statements-4) You can build more complicated (molecular) statements out of simpler (atomic or molecular) ones using logical connectives. For example, this is a molecular statement:[🔗](#atomic-molecular-statements-5)

> Telephone numbers in the USA have 10 digits, and 42 is a perfect square.[🔗](#atomic-molecular-statements-6-1)
> > [🔗](#atomic-molecular-statements-6)

Note that we can break this down into two smaller statements. The two shorter statements are *connected* by an “and.” We will consider 5 connectives: “and” (Sam is a man, and Chris is a woman), “or” (Sam is a man, or Chris is a woman), “if…, then…” (if Sam is a man, then Chris is a woman), “if and only if” (Sam is a man if and only if Chris is a woman), and “not” (Sam is not a man). The first four are called binary connectives (because they connect two statements) while “not” is an example of a unary connective (since it applies to a single statement).[🔗](#atomic-molecular-statements-7) These molecular statements are, of course, still statements, so they must be either true or false. The crucial observation here is that which truth value the molecular statement achieves is completely determined by the type of connective and the truth values of the parts. We do not need to know what the parts actually say or whether they have some material connection to each other, only whether those parts are true or false.[🔗](#atomic-molecular-statements-8) To analyze logical connectives, it is enough to consider propositional variables (sometimes called *sentential* variables), usually capital letters in the middle of the alphabet: \(P, Q, R, S, \ldots\text{.}\) We think of these as standing in for (usually atomic) statements, but there are only two *values* the variables can achieve: true or false. 1 In computer programming, we should call such variables Boolean variables. We also have symbols for the logical connectives: \(\wedge\text{,}\) \(\vee\text{,}\) \(\imp\text{,}\) \(\iff\text{,}\) \(\neg\text{.}\)[🔗](#atomic-molecular-statements-9)

#### Definition 1.1.7. Logical Connectives.

We define the following logical connectives.

- \(P \wedge Q\) is read “\(P\) and \(Q\text{,}\)” and is called a conjunction. [🔗](#atomic-molecular-statements-10-4-1-2-1)
- \(P \vee Q\) is read “\(P\) or \(Q\text{,}\)” and is called a disjunction. [🔗](#atomic-molecular-statements-10-4-1-2-2)
- \(P \imp Q\) is read “if \(P\) then \(Q\text{,}\)” and is called an implication or conditional. [🔗](#atomic-molecular-statements-10-4-1-2-3)
- \(P \iff Q\) is read “\(P\) if and only if \(Q\text{,}\)” and is called a biconditional. [🔗](#atomic-molecular-statements-10-4-1-2-4)
- \(\neg P\) is read “not \(P\text{,}\)” and is called a negation. [🔗](#atomic-molecular-statements-10-4-1-2-5)

[🔗](#atomic-molecular-statements-10-4-1) [🔗](#atomic-molecular-statements-10) The truth value of a statement is determined by the truth value(s) of its part(s), depending on the connectives:[🔗](#atomic-molecular-statements-11)

#### Definition 1.1.8. Truth Conditions for Connectives.

The truth conditions for the logical connectives are defined as follows.

- \(P \wedge Q\) is true when both \(P\) and \(Q\) are true. [🔗](#def-connectives-truth-3-1-2-1)
- \(P \vee Q\) is true when \(P\) or \(Q\) or both are true. [🔗](#def-connectives-truth-3-1-2-2)
- \(P \imp Q\) is true when \(P\) is false or \(Q\) is true (or both). [🔗](#def-connectives-truth-3-1-2-3)
- \(P \iff Q\) is true when \(P\) and \(Q\) are both true, or both false. [🔗](#def-connectives-truth-3-1-2-4)
- \(\neg P\) is true when \(P\) is false. [🔗](#def-connectives-truth-3-1-2-5)

[🔗](#def-connectives-truth-3-1) [🔗](#def-connectives-truth) Each of the above definitions can be represented in a table, called a truth table. We simply list what the truth value of the statement is for each possible combination of truth values of the parts.[🔗](#atomic-molecular-statements-13)

| \(P\) | \(Q\) | \(P\wedge Q\) |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

| \(P\) | \(Q\) | \(P\vee Q\) |
| --- | --- | --- |
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

| \(P\) | \(Q\) | \(P\imp Q\) |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

| \(P\) | \(Q\) | \(P\iff Q\) |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

| \(P\) | \(\neg P\) |
| --- | --- |
| T | F |
| F | T |
|  |  |

Figure 1.1.9. Truth tables for logical connectives.[🔗](#fig-truth-tables)For example, we can use the truth table for \(P \imp Q\) to decide whether the statement, “If 5 is even, then 6 is even,” is true or false. Here \(P\) is the statement “5 is even,” and \(Q\) is the statement “6 is even.” Since 5 is not even, the statement \(P\) is false. Since 6 is even, the statement \(Q\) is true. The truth table tells us that the statement \(P \imp Q\) is true when \(P\) is false and \(Q\) is true (the 3rd row). So the statement, “If 5 is even, then 6 is even,” is true. (If you don’t like that the statement is true, hold on to that thought, and we will hopefully resolve it soon.)[🔗](#atomic-molecular-statements-15) Note that for us, *or* is the inclusive or (and not the sometimes used *exclusive or*) meaning that \(P \vee Q\) is true when \(P\) or \(Q\) *or both \(P\) and \(Q\)* are true. As for the other connectives, “and” behaves as you would expect, as does negation. The biconditional (if and only if) might seem a little strange, but you should think of this as saying the two parts of the statements are *equivalent* in that they have the same truth value.[🔗](#atomic-molecular-statements-16) This leaves only the implication \(P \imp Q\) which has a slightly different meaning in mathematics than in ordinary usage. However, implications are so common and useful in mathematics that we must develop a level of fluency with their use which warrants a whole section ([Section 1.2](sec_logic-implications.html)).[🔗](#atomic-molecular-statements-17)

#### Example 1.1.10.

Using the truth conditions for the logical connectives, determine which statements below are true and which are false.

1. 17 is prime, and 17 is odd.[🔗](#atomic-molecular-statements-18-1-1-1-1-1) [🔗](#atomic-molecular-statements-18-1-1-1-1)
2. 17 is prime, and 18 is prime.[🔗](#atomic-molecular-statements-18-1-1-1-2-1) [🔗](#atomic-molecular-statements-18-1-1-1-2)
3. 17 is prime, or 18 is prime.[🔗](#atomic-molecular-statements-18-1-1-1-3-1) [🔗](#atomic-molecular-statements-18-1-1-1-3)
4. 17 is prime, or 19 is prime.[🔗](#atomic-molecular-statements-18-1-1-1-4-1) [🔗](#atomic-molecular-statements-18-1-1-1-4)
5. If 17 is prime, then 19 is prime.[🔗](#atomic-molecular-statements-18-1-1-1-5-1) [🔗](#atomic-molecular-statements-18-1-1-1-5)
6. If 18 is prime, then my favorite number is 17.[🔗](#atomic-molecular-statements-18-1-1-1-6-1) [🔗](#atomic-molecular-statements-18-1-1-1-6)
7. 17 is prime if and only if 19 is prime.[🔗](#atomic-molecular-statements-18-1-1-1-7-1) [🔗](#atomic-molecular-statements-18-1-1-1-7)
8. 17 is not prime if and only if 19 is not prime.[🔗](#atomic-molecular-statements-18-1-1-1-8-1) [🔗](#atomic-molecular-statements-18-1-1-1-8)

[🔗](#atomic-molecular-statements-18-1-1) Solution. First, let’s agree on some facts: 17 really is prime and odd, 18 is not either, and 19 is prime.

1. True. Both parts of the conjunction are true, so the entire statement is true.[🔗](#atomic-molecular-statements-18-2-1-1-1-1) [🔗](#atomic-molecular-statements-18-2-1-1-1)
2. False. The first part is true, but the second part is false, so the entire statement is false.[🔗](#atomic-molecular-statements-18-2-1-1-2-1) [🔗](#atomic-molecular-statements-18-2-1-1-2)
3. True. The first part is true, so the entire statement is true. As soon as we see one true statement in a disjunction, we can stop checking and declare the entire statement true.[🔗](#atomic-molecular-statements-18-2-1-1-3-1) [🔗](#atomic-molecular-statements-18-2-1-1-3)
4. True. Since we use the inclusive or, the statement is true when both parts are true.[🔗](#atomic-molecular-statements-18-2-1-1-4-1) [🔗](#atomic-molecular-statements-18-2-1-1-4)
5. True. Don’t be worried that there isn’t a good reason that 17 being prime *causes* 19 to be prime. That is not what we mean by a conditional statement. Since the “then” part is true, we know that the statement overall is true.[🔗](#atomic-molecular-statements-18-2-1-1-5-1) [🔗](#atomic-molecular-statements-18-2-1-1-5)
6. True. The “if” part of the statement is false. That’s all we need. I bet you don’t even know what my favorite number is, and you don’t need to. The statement is true.[🔗](#atomic-molecular-statements-18-2-1-1-6-1) [🔗](#atomic-molecular-statements-18-2-1-1-6)
7. True. Do both parts have the same truth value? Yes, since they are both true. So the entire statement is true.[🔗](#atomic-molecular-statements-18-2-1-1-7-1) [🔗](#atomic-molecular-statements-18-2-1-1-7)
8. True as well. Now both parts are false (since both are the negation of a true statement), so the entire statement is true.[🔗](#atomic-molecular-statements-18-2-1-1-8-1) [🔗](#atomic-molecular-statements-18-2-1-1-8)

[🔗](#atomic-molecular-statements-18-2-1) [🔗](#atomic-molecular-statements-18-2) [🔗](#atomic-molecular-statements-18)The way we define logical connectives and their truth value is very precise and technical. Often, language is not. Part of learning how to communicate mathematics is learning the cultural norms of mathematical language and how to translate statements in ordinary language into these technical statements. This will get easier with practice, so make sure you are talking to lots of people about the math you are studying.[🔗](#atomic-molecular-statements-19) Here are a few examples of how ordinary language might be difficult to translate.[🔗](#atomic-molecular-statements-20)

#### Example 1.1.11.

Identify the logical structure of each of the following statements.

1. 4 and 5 are both prime.[🔗](#atomic-molecular-statements-21-1-1-1-1-1) [🔗](#atomic-molecular-statements-21-1-1-1-1)
2. Only one of 4 or 5 is prime.[🔗](#atomic-molecular-statements-21-1-1-1-2-1) [🔗](#atomic-molecular-statements-21-1-1-1-2)
3. You must attend every day and do the homework to pass this class.[🔗](#atomic-molecular-statements-21-1-1-1-3-1) [🔗](#atomic-molecular-statements-21-1-1-1-3)
4. Every number is even or odd.[🔗](#atomic-molecular-statements-21-1-1-1-4-1) [🔗](#atomic-molecular-statements-21-1-1-1-4)

[🔗](#atomic-molecular-statements-21-1-1) Solution.

1. Do you agree this is the same statement as “4 is prime, *and* 5 is prime”? Notice that it would not make sense to write this as \(P \wedge Q\) where \(P\) is “4” and \(Q\) is “5 is prime”. But if we let \(P\) be the statement, “4 is prime,” then both parts of the conjunction are statements.[🔗](#atomic-molecular-statements-21-2-1-1-1-1) [🔗](#atomic-molecular-statements-21-2-1-1-1)
2. Again, we can’t just put what is on one side of the “or” as a statement. But if we let \(P\) be “4 is prime” and \(Q\) be “5 is prime,”, then we can write this as \((P \vee Q) \wedge \neg (P \wedge Q)\text{.}\) That is, either 4 is prime or 5 is prime, and it is not the case that both 4 is prime and 5 is prime.[🔗](#atomic-molecular-statements-21-2-1-1-2-1) [🔗](#atomic-molecular-statements-21-2-1-1-2)
3. Here is another way you could phrase the same statement: If you pass the class, then it must be the case that you attended every day and that you did the homework. If we agree that this is just a clearer way to state the original statement, then we could illustrate its structure as \(P \imp (Q \wedge R)\text{.}\)[🔗](#atomic-molecular-statements-21-2-1-1-3-1) [🔗](#atomic-molecular-statements-21-2-1-1-3)
4. Notice that this is not the same as saying, “Every number is even, or every number is odd.” Of course, saying, “3 is even or odd,” *is* the same as saying, “3 is even, or 3 is odd.” Language is confusing![🔗](#atomic-molecular-statements-21-2-1-1-4-1) We don’t yet have the logical technology to translate this statement as anything more than \(P\text{,}\) where \(P\) is the statement, “Every number is even or odd.” Luckily, that technology is available, starting... now![🔗](#atomic-molecular-statements-21-2-1-1-4-2) [🔗](#atomic-molecular-statements-21-2-1-1-4)

[🔗](#atomic-molecular-statements-21-2-1) [🔗](#atomic-molecular-statements-21-2) [🔗](#atomic-molecular-statements-21)[🔗](#atomic-molecular-statements)

### Subsection Quantifiers and Predicates

Did you know that all mammals have hair? That every integer is even or odd? That some odd numbers are not prime?[🔗](#subsec_logic-statements-quant-2) Our goal is to explore how to write statements such as these in mathematical notation to highlight the logical structure of the statements.[🔗](#subsec_logic-statements-quant-3) This will require considering a new sort of basic sentence called a predicate, which is like a statement, but contains a free variable. When you replace that variable with a constant of some sort, then the sentence becomes a statement proper. Think of a predicate as making a claim about the values that are substituted for the “placeholder” variable(s).[🔗](#subsec_logic-statements-quant-4) A predicate can be made into a (true or false) statement by evaluating it at some constant(s), or we can claim that some or all possible constants would make the resulting statement true or false. This is done using quantifiers.[🔗](#subsec_logic-statements-quant-5)

#### Definition 1.1.12. Quantifiers.

The universal quantifier is written \(\forall\) and is read, “for all.” The existential quantifier is written \(\exists\) and is read, “there exists” or “for some.”[🔗](#def-quantifiers-7-1) [🔗](#def-quantifiers)We usually write predicates similar to how you write a function, although with capital letters. For example, we might use the predicate \(P(x)\) to represent “\(x\) is prime”. We can then say that \(P(7)\) is true (since 7 is prime) and that \(P(8)\) is false. Or using quantifiers, we can (falsely) claim that all numbers are prime by writing \(\forall x P(x)\) or (truthfully) claim that there is at least one prime number, by writing \(\exists x P(x)\text{.}\)[🔗](#subsec_logic-statements-quant-7)

#### Example 1.1.13.

Translate the statement, “Every number is even or odd,” into symbols.[🔗](#subsec_logic-statements-quant-8-3-1) Solution. Before we even start using symbols, it is helpful to rephrase this in a way that captures the logical structure of the statement. What is the claim saying? Given any number, it will either be the case that the number is even, or that the number is odd. In particular, we are not claiming that either all numbers are even or all numbers are odd.[🔗](#subsec_logic-statements-quant-8-4-1) Let’s use \(E(x)\) to say that \(x\) is even, and \(O(x)\) to say that \(x\) is odd. Then we can write, \begin{equation*} E(x) \vee O(x) \end{equation*} to say that \(x\) is even or \(x\) is odd. Which \(x\) is that true for (according to the claim)? *All* of them. So we write the statement as, \begin{equation*} \forall x (O(x) \vee E(x))\text{.} \end{equation*} We added some parentheses to emphasize that the scope of the universal quantifier includes both predicates. [🔗](#subsec_logic-statements-quant-8-4-2) Note that if we incorrectly interpreted the statement as claiming that either all numbers are even or all numbers are odd, we could write that as \(\forall x O(x) \vee \forall x E(x)\text{.}\) This is not the same![🔗](#subsec_logic-statements-quant-8-4-3) [🔗](#subsec_logic-statements-quant-8-4) [🔗](#subsec_logic-statements-quant-8)Just like we did for propositional logic and the logical connectives, we should decide what it means for a quantified predicate to be true or false. We say \(\forall x P(x)\) is true if \(P(a)\) is true no matter what constant \(a\) we substitute for \(x\text{.}\) And similarly, \(\exists x P(x)\) is true if there is at least one value \(a\) for which \(P(a)\) is true.[🔗](#subsec_logic-statements-quant-9) However, we must be careful here. Consider the statement \begin{equation*} \forall x \exists y (y \lt x)\text{.} \end{equation*} You would read this, “For every \(x\) there is some \(y\) such that \(y\) is less than \(x\text{.}\)” Note that \(\lt\) is a predicate with two free variables; we have chosen to write it with the symbol between the variables instead of the funky-looking \(L(y,x)\) or \(\lt\!(y,x)\text{.}\) [🔗](#subsec_logic-statements-quant-10) Is this statement true? The answer depends on our domain of discourse. When we say “for all” \(x\text{,}\) do we mean all positive integers or all real numbers or all elephants or...? Usually, this information is implied by the context of the statement. In discrete mathematics, we almost always quantify over the *natural numbers*, \(0, 1, 2,\ldots \text{,}\) so let’s take that for our domain of discourse here.[🔗](#subsec_logic-statements-quant-11) For the statement to be true, we need, no matter what natural number we select, for there to be some natural number that is strictly smaller. Perhaps we could let \(y\) be \(x-1\text{?}\) But here is the problem: what if \(x = 0\text{?}\) Then \(y = -1\text{,}\) and that is *not a number!* (in our domain of discourse). Thus we see that the statement is false because there is a number less than or equal to all other numbers. In symbols, \begin{equation*} \exists x \forall y (y \ge x)\text{.} \end{equation*} [🔗](#subsec_logic-statements-quant-12) We will explore some rules for working with quantifiers and other connectives in [Section 1.3](sec_logic-rules.html). For now, we will focus on translating between informal statements in ordinary language and the more precise language of logic. There is no perfect algorithm for doing this translation, but here are a few useful rules of thumb.[🔗](#subsec_logic-statements-quant-13)

#### Every blank is blank.

Any statement of the form, “Every \(P\)-thing is a \(Q\)-thing” can be written as \begin{equation*} \forall x(P(x) \imp Q(x))\text{.} \end{equation*} [🔗](#assemblage-universal-rot-2) Example: all mammals have hair, becomes \(\forall x (M(x) \imp H(x))\text{,}\) where \(M(x)\) means \(x\) is a mammal, and \(H(x)\) means \(x\) has hair.[🔗](#assemblage-universal-rot-3) [🔗](#assemblage-universal-rot)To make sense of this, think about what we mean by statements like these in terms of sets. We claim that the set of mammals is contained in, or is a subset of, the set of hairy things. What we mean by “\(A\) is a subset of \(B\)” is precisely that every element of \(x\) is an element of \(y\text{.}\) This can also be expressed by saying that “if \(x\) is an element of \(A\text{,}\) then \(x\) is also an element of \(B\text{.}\)”[🔗](#subsec_logic-statements-quant-15)

#### Some blanks are blank.

Any statement of the form, “Some \(P\)-things are \(Q\)-things,” can be written as \begin{equation*} \exists x (P(x) \wedge Q(x))\text{.} \end{equation*} [🔗](#assemblage-existential-rot-2) Example: Some cats can swim, becomes \(\exists x (C(x) \wedge S(x))\text{,}\) where \(C(x)\) means \(x\) is a cat, and \(S(x)\) means \(x\) can swim.[🔗](#assemblage-existential-rot-3) [🔗](#assemblage-existential-rot)Again, it is helpful to think of how to express such statements in terms of sets. To say that some cats can swim is to say that there are things that belong both to the set of cats and to the set of swimming things. Such animals belong to the *intersection* of these two sets, which you can describe as belonging to the first set *and* the second set. Existential statements of this form claim that the intersection of the two sets is not empty.[🔗](#subsec_logic-statements-quant-17)

#### Implicit Quantifiers.

It is always a good idea to be precise in mathematics. Sometimes though, we can relax a bit, as long as we all agree on a convention. An example of such a convention is to assume that sentences containing predicates with free variables are intended as statements, where the variables are universally quantified.[🔗](#pars-implicituantifiers-5) For example, do you believe that if a shape is a square, then it is a rectangle? But how can that be true if it is not a statement? To be a little more precise, we have two predicates: \(S(x)\) for “\(x\) is a square” and \(R(x)\) for “\(x\) is a rectangle”. The *sentence* we are looking at is \begin{equation*} S(x) \imp R(x)\text{.} \end{equation*} This is neither true nor false, as it is not a statement. But come on! We all know that we meant to consider the statement, \begin{equation*} \forall x (S(x) \imp R(x))\text{,} \end{equation*} and this is what our convention tells us to consider. We call the resulting statement the universal generalization of the original sentence. [🔗](#pars-implicituantifiers-6)

#### Definition 1.1.14.

Given a sentence with free variables, the universal generalization of that sentence is the statement obtained by adding enough universal quantifiers to the beginning of the sentence so that all free variables become bound.[🔗](#def-univerals-generalization-2-1) [🔗](#def-univerals-generalization)Similarly, we will often be a bit sloppy about the distinction between a predicate and a statement. For example, we might write, *let \(P(n)\) be the statement*, “\(n\) is prime,” which is technically incorrect. It is implicit that we mean that we are defining \(P(n)\) to be a predicate, which for each \(n\) becomes the statement, \(n\) is prime.[🔗](#pars-implicituantifiers-8) [🔗](#pars-implicituantifiers)[🔗](#subsec_logic-statements-quant)

### Reading Questions Reading Questions

#### 1.

- \(P \wedge Q\)
- \(P\) and \(Q\) (conjunction)
- \(P \imp Q\)
- If \(P\text{,}\) then \(Q\text{,}\) (implication)
- \(P \vee Q\)
- \(P\) or \(Q\) (disjunction)
- \(\neg P\)
- Not \(P\) (negation)

[🔗](#rq-logic-statements-connective-type)

#### 2.

Consider the sentence, “If \(x \gt 3\text{,}\) then \(x\) is even.”[🔗](#rq-logic-statements-free-vars-1-1) Which of the following statements are true about the sentence? Select all that apply.[🔗](#rq-logic-statements-free-vars-1-2)

- The sentence is a false statement since it has a free variable.
- For what values of the free variable \(x\text{?}\)
- The universal generalization of the sentence is a statement.
- The only thing holding the sentence back from being a statement is the free variable \(x\text{.}\) The universal generalization quantifies this free variable.
- If you substitute \(10\) for \(x\text{,}\) the resulting statement is true.
- With this substitution, both the “if” and “then” parts are true.
- The sentence becomes a true statement no matter what natural number you substitute for \(x\text{.}\)
- If you replace \(x\) with \(5\text{,}\) then the “if” part is true and the “then” part is false.

[🔗](#rq-logic-statements-free-vars)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-logic-statements-q-1-1) [🔗](#rq-logic-statements-q)[🔗](#rqs-logic-statements)

### Exercises Practice Problems

#### 1.

Activate For each sentence below, decide whether it is an atomic statement, a molecular statement, or not a statement at all.[🔗](#extracted-webwork-1-1-1-1)

1. Some say the end is near, and some say we’ll see Armageddon soon.[🔗](#extracted-webwork-1-1-1-2-1-1-1) [🔗](#extracted-webwork-1-1-1-2-1-1)
2. Mom’s coming ’round to put it back the way it ought to be.[🔗](#extracted-webwork-1-1-1-2-1-2-1) [🔗](#extracted-webwork-1-1-1-2-1-2)
3. Learn to swim.[🔗](#extracted-webwork-1-1-1-2-1-3-1) [🔗](#extracted-webwork-1-1-1-2-1-3)

[🔗](#extracted-webwork-1-1-1-2) [🔗](#ww-statements-classify)

#### 2.

Activate Classify each of the sentences below as an atomic statement, a molecular statement, or not a statement at all. If the statement is molecular, say what kind it is (conjuction, disjunction, conditional, biconditional, negation).[🔗](#extracted-webwork-2-1-1-1)

1. Everybody can be fooled sometimes.[🔗](#extracted-webwork-2-1-1-2-1-1-1) [🔗](#extracted-webwork-2-1-1-2-1-1)
2. Every natural number greater than 1 is either prime or composite.[🔗](#extracted-webwork-2-1-1-2-1-2-1) [🔗](#extracted-webwork-2-1-1-2-1-2)
3. Go to your room![🔗](#extracted-webwork-2-1-1-2-1-3-1) [🔗](#extracted-webwork-2-1-1-2-1-3)
4. The Broncos will win the Super Bowl, or I’ll eat my hat.[🔗](#extracted-webwork-2-1-1-2-1-4-1) [🔗](#extracted-webwork-2-1-1-2-1-4)
5. This shirt is not black.[🔗](#extracted-webwork-2-1-1-2-1-5-1) [🔗](#extracted-webwork-2-1-1-2-1-5)

[🔗](#extracted-webwork-2-1-1-2) [🔗](#ww-statements-classify-type)

#### 3.

Activate Determine whether each molecular statement below is true or false, or whether it is impossible to determine. Assume you do not know what my favorite number is (but you do know which numbers are prime).[🔗](#extracted-webwork-3-1-1-1)

1. If 4 is my favorite number, then \(4+1\) is my favorite number.[🔗](#extracted-webwork-3-1-1-2-1-1-1) [🔗](#extracted-webwork-3-1-1-2-1-1)
2. 8 is my favorite number, and 3 is not prime.[🔗](#extracted-webwork-3-1-1-2-1-2-1) [🔗](#extracted-webwork-3-1-1-2-1-2)
3. 4 is my favorite number, or 4 is prime.[🔗](#extracted-webwork-3-1-1-2-1-3-1) [🔗](#extracted-webwork-3-1-1-2-1-3)
4. If 4 is prime, then \(2\cdot4\) is prime.[🔗](#extracted-webwork-3-1-1-2-1-4-1) [🔗](#extracted-webwork-3-1-1-2-1-4)
5. If 3 is prime, then 3 is my favorite number.[🔗](#extracted-webwork-3-1-1-2-1-5-1) [🔗](#extracted-webwork-3-1-1-2-1-5)
6. 8 is my favorite number, and 4 is not prime.[🔗](#extracted-webwork-3-1-1-2-1-6-1) [🔗](#extracted-webwork-3-1-1-2-1-6)

[🔗](#extracted-webwork-3-1-1-2) [🔗](#ww-statements-favnum)

#### 4.

- Some people can be fooled all of the time.
- \(\exists x \forall y P(x,y)\)
- Everyone can be fooled sometimes.
- \(\forall x \exists y P(x,y)\)
- It is always true that some people can be fooled.
- \(\forall y \exists x P(x,y)\)
- Sometimes everyone can be fooled.
- \(\exists y \forall x P(x,y)\)

[🔗](#rs-statements-quant-translate)

#### 5.

Your friend believes that you cannot fool everyone at the same time. What is another way of saying this, and how would you write that in symbols (using \(P(x,y)\) to say you can fool \(x\) at time \(y\)).[🔗](#rs-statements-quant-neg-1-1)

- Someone is never fooled. \(\exists x \forall y\neg P(x,y)\)
- Everyone is never fooled. \(\forall x \forall y \neg P(x,y)\)
- Someone is not fooled sometimes. \(\exists x \exists y \neg P(x,y)\)
- Everyone is not fooled sometimes. \(\forall x \exists y \neg P(x,y)\)

[🔗](#rs-statements-quant-neg)

#### 6.

Regardless of your beliefs of how many people can be fooled at various times, what could you conclude if we reinterpret \(P(x,y)\) to mean \(x \lt y\) and only quantify over the natural numbers (so \(\forall x\) means “For all natural numbers,” and \(\exists x\) means “There exists a natural number”)? Select all of the following that apply.[🔗](#rs-statements-quant-interpretation-1-1)

- \(\forall x \exists y P(x,y)\) is true.
- \(\exists x \forall y P(x,y)\) is true.
- Careful, \(P(x,y)\) means \(x\) is less than \(y\text{,}\) not \(x\) is less than *or equal* to \(y\text{.}\)
- \(\forall y \exists x P(x,y)\) is true.
- \(\exists y \forall x P(x,y)\) is true.
- No matter what \(P(x,y)\) means, we can conclude that \(\forall x \exists y P(x,y)\) and \(\exists y \forall x\) are NOT *logically equivalent*

[🔗](#rs-statements-quant-interpretation)

#### 7.

Activate Let \(P(x)\) be the predicate, “\(16x+1\) is even.”

1. Is \(P(11)\) true or false? True[🔗](#extracted-webwork-4-1-1-1-5-1-1-2-1-1) [🔗](#extracted-webwork-4-1-1-1-5-1-1-2-1)
2. False[🔗](#extracted-webwork-4-1-1-1-5-1-1-2-2-1) [🔗](#extracted-webwork-4-1-1-1-5-1-1-2-2)
3. Neither (not a statement)[🔗](#extracted-webwork-4-1-1-1-5-1-1-2-3-1) [🔗](#extracted-webwork-4-1-1-1-5-1-1-2-3)
4. What, if anything, can you conclude about \(\exists x P(x)\) from the truth value of \(P(11)\text{?}\)[🔗](#extracted-webwork-4-1-1-1-5-2-1) \(\exists x P(x)\) must be true.[🔗](#extracted-webwork-4-1-1-1-5-2-2-1-1-1) [🔗](#extracted-webwork-4-1-1-1-5-2-2-1-1)
5. \(\exists x P(x)\) must be false.[🔗](#extracted-webwork-4-1-1-1-5-2-2-1-2-1) [🔗](#extracted-webwork-4-1-1-1-5-2-2-1-2)
6. \(\exists x P(x)\) could be true or could be false.[🔗](#extracted-webwork-4-1-1-1-5-2-2-1-3-1) [🔗](#extracted-webwork-4-1-1-1-5-2-2-1-3)
7. What, if anything, can you conclude about \(\forall x P(x)\) from the truth value of \(P(11)\text{?}\)[🔗](#extracted-webwork-4-1-1-1-5-3-1) \(\forall x P(x)\) must be true.[🔗](#extracted-webwork-4-1-1-1-5-3-2-1-1-1) [🔗](#extracted-webwork-4-1-1-1-5-3-2-1-1)
8. \(\forall x P(x)\) must be false.[🔗](#extracted-webwork-4-1-1-1-5-3-2-1-2-1) [🔗](#extracted-webwork-4-1-1-1-5-3-2-1-2)
9. \(\forall x P(x)\) could be true or could be false.[🔗](#extracted-webwork-4-1-1-1-5-3-2-1-3-1) [🔗](#extracted-webwork-4-1-1-1-5-3-2-1-3)

[🔗](#extracted-webwork-4-1-1-1) [🔗](#ww-statements-quant1)

#### 8.

Activate Let \(P(x)\) be the predicate, “\(9x+1\) is even.”

1. Is \(P(13)\) true or false? True[🔗](#extracted-webwork-5-1-1-1-5-1-1-2-1-1) [🔗](#extracted-webwork-5-1-1-1-5-1-1-2-1)
2. False[🔗](#extracted-webwork-5-1-1-1-5-1-1-2-2-1) [🔗](#extracted-webwork-5-1-1-1-5-1-1-2-2)
3. Neither (not a statement)[🔗](#extracted-webwork-5-1-1-1-5-1-1-2-3-1) [🔗](#extracted-webwork-5-1-1-1-5-1-1-2-3)
4. What, if anything, can you conclude about \(\exists x P(x)\) from the truth value of \(P(13)\text{?}\)[🔗](#extracted-webwork-5-1-1-1-5-2-1) \(\exists x P(x)\) must be true.[🔗](#extracted-webwork-5-1-1-1-5-2-2-1-1-1) [🔗](#extracted-webwork-5-1-1-1-5-2-2-1-1)
5. \(\exists x P(x)\) must be false.[🔗](#extracted-webwork-5-1-1-1-5-2-2-1-2-1) [🔗](#extracted-webwork-5-1-1-1-5-2-2-1-2)
6. \(\exists x P(x)\) could be true or could be false.[🔗](#extracted-webwork-5-1-1-1-5-2-2-1-3-1) [🔗](#extracted-webwork-5-1-1-1-5-2-2-1-3)
7. What, if anything, can you conclude about \(\forall x P(x)\) from the truth value of \(P(13)\text{?}\)[🔗](#extracted-webwork-5-1-1-1-5-3-1) \(\forall x P(x)\) must be true.[🔗](#extracted-webwork-5-1-1-1-5-3-2-1-1-1) [🔗](#extracted-webwork-5-1-1-1-5-3-2-1-1)
8. \(\forall x P(x)\) must be false.[🔗](#extracted-webwork-5-1-1-1-5-3-2-1-2-1) [🔗](#extracted-webwork-5-1-1-1-5-3-2-1-2)
9. \(\forall x P(x)\) could be true or could be false.[🔗](#extracted-webwork-5-1-1-1-5-3-2-1-3-1) [🔗](#extracted-webwork-5-1-1-1-5-3-2-1-3)

[🔗](#extracted-webwork-5-1-1-1) [🔗](#ww-statements-quant2)

#### 9.

Consider the sentence, \(\exists x P(x,y) \imp \forall x P(x,y)\text{.}\) What can we say about this sentence? Select all that apply.[🔗](#rs-statements-quant-free-variables-1-1)

- The sentence is a statement because it contains quantifiers.
- The sentence is not a statement because \(x\) and \(z\) are free variables.
- The sentence is not a statement because \(y\) is a free variable.
- The universal generalization of the sentence is a statement.

[🔗](#rs-statements-quant-free-variables)

#### 10.

Activate Suppose \(P(x,y)\) is some binary predicate defined on a very small domain of discourse: just the integers 1, 2, 3, and 4. For each of the 16 pairs of these numbers, \(P(x,y)\) is either true or false, according to the following table (\(x\) values are rows, \(y\) values are columns).[🔗](#extracted-webwork-6-1-1-1)

|  | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| 1 | T | F | F | F |
| 2 | F | T | T | F |
| 3 | T | T | T | T |
| 4 | F | F | F | F |

For example, \(P(1,3)\) is false, as indicated by the F in the first row, third column.[🔗](#extracted-webwork-6-1-1-3) Use the table to decide whether the following statements are true or false.[🔗](#extracted-webwork-6-1-1-4)

1. \(\displaystyle \exists y \forall x P(x,y)\text{.}\)[🔗](#extracted-webwork-6-1-1-5-1-1-1) [🔗](#extracted-webwork-6-1-1-5-1-1)
2. \(\displaystyle \forall y \exists x P(x,y)\text{.}\)[🔗](#extracted-webwork-6-1-1-5-1-2-1) [🔗](#extracted-webwork-6-1-1-5-1-2)
3. \(\displaystyle \exists x \forall y P(x,y)\text{.}\)[🔗](#extracted-webwork-6-1-1-5-1-3-1) [🔗](#extracted-webwork-6-1-1-5-1-3)
4. \(\displaystyle \forall x \exists y P(x,y)\text{.}\)[🔗](#extracted-webwork-6-1-1-5-1-4-1) [🔗](#extracted-webwork-6-1-1-5-1-4)

[🔗](#extracted-webwork-6-1-1-5) [🔗](#ww-statements-binary-pred)[🔗](#practice_intro-statements)

### Exercises Additional Exercises

#### 1.

Suppose \(P\) and \(Q\) are the statements: \(P\text{:}\) Jack passed math. \(Q\text{:}\) Jill passed math.

1. Translate “Jack and Jill both passed math” into symbols.[🔗](#exercises_intro-statements-2-1-1-5-1-1) [🔗](#exercises_intro-statements-2-1-1-5-1)
2. Translate “If Jack passed math, then Jill did not” into symbols.[🔗](#exercises_intro-statements-2-1-1-5-2-1) [🔗](#exercises_intro-statements-2-1-1-5-2)
3. Translate “\(P \vee Q\)” into English.[🔗](#exercises_intro-statements-2-1-1-5-3-1) [🔗](#exercises_intro-statements-2-1-1-5-3)
4. Translate “\(\neg(P \wedge Q) \imp Q\)” into English.[🔗](#exercises_intro-statements-2-1-1-5-4-1) [🔗](#exercises_intro-statements-2-1-1-5-4)
5. Suppose you know that if Jack passed math, then so did Jill. What can you conclude if you know that: Jill passed math? [🔗](#exercises_intro-statements-2-1-1-5-5-1-1-1)
6. Jill did not pass math? [🔗](#exercises_intro-statements-2-1-1-5-5-1-1-2)

[🔗](#exercises_intro-statements-2-1-1-5-5-1) [🔗](#exercises_intro-statements-2-1-1-5-5) [🔗](#exercises_intro-statements-2-1-1) [🔗](#exercises_intro-statements-2)

#### 2.

Translate into symbols. Use \(E(x)\) for “\(x\) is even” and \(O(x)\) for “\(x\) is odd.”

1. No number is both even and odd.[🔗](#exercises_intro-statements-3-1-1-5-1-1) [🔗](#exercises_intro-statements-3-1-1-5-1)
2. One more than any even number is an odd number.[🔗](#exercises_intro-statements-3-1-1-5-2-1) [🔗](#exercises_intro-statements-3-1-1-5-2)
3. There is a prime number that is even.[🔗](#exercises_intro-statements-3-1-1-5-3-1) [🔗](#exercises_intro-statements-3-1-1-5-3)
4. Between any two numbers there is a third number.[🔗](#exercises_intro-statements-3-1-1-5-4-1) [🔗](#exercises_intro-statements-3-1-1-5-4)
5. There is no number between a number and one more than that number.[🔗](#exercises_intro-statements-3-1-1-5-5-1) [🔗](#exercises_intro-statements-3-1-1-5-5)

[🔗](#exercises_intro-statements-3-1-1) [🔗](#exercises_intro-statements-3)

#### 3.

For each of the statements below, give a domain of discourse for which the statement is true, and a domain for which the statement is false.

1. \(\forall x \exists y (y^2 = x)\text{.}\) [🔗](#exercises_intro-statements-4-1-1-1-1)
2. \(\forall x \forall y (x \lt y \imp \exists z (x \lt z \lt y))\text{.}\) [🔗](#exercises_intro-statements-4-1-1-1-2)
3. \(\exists x \forall y \forall z (y \lt z \imp y \le x \le z)\text{.}\) [🔗](#exercises_intro-statements-4-1-1-1-3)

[🔗](#exercises_intro-statements-4-1-1) Hint. First figure out what each statement is saying. For part (c), you don’t need to assume the domain is an infinite set.[🔗](#exercises_intro-statements-4-2-1) [🔗](#exercises_intro-statements-4-2) [🔗](#exercises_intro-statements-4)[🔗](#exercises_intro-statements)[🔗](#sec_logic-statements) [&#xe5cb;Prev](ch_logic.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_logic-implications.html) [Feedback](/cdn-cgi/l/email-protection#8ae5f9e9ebf8a4e6effce3e4caffe4e9e5a4efeeff)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_logic-statements-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_logic-statements-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
