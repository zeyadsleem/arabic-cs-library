---
title: "Logic and Proofs"
lang: en
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

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 1.2 Implications

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_logic-implications-2-1-1)

1. Explain the conditions under which an implication is true.[🔗](#sec_logic-implications-2-2-1-1) [🔗](#sec_logic-implications-2-2-1)
2. Identify statements as equivalent to a given implication or its converse.[🔗](#sec_logic-implications-2-2-2-1) [🔗](#sec_logic-implications-2-2-2)
3. Explain the relationship between the truth values of an implication, its converse, and its contrapositive.[🔗](#sec_logic-implications-2-2-3-1) [🔗](#sec_logic-implications-2-2-3)

[🔗](#sec_logic-implications-2)

### Subsection Section Preview

#### Investigate!

Little Timmy’s Mom tells him, “If you don’t eat all your broccoli, then you will not get any ice cream.” Of course, Timmy loves his ice cream, so he quickly eats all his broccoli (which actually tastes pretty good).[🔗](#subsec-introduction-2-1-1) After dinner, when Timmy asks for his ice cream, he is told no! Does Timmy have a right to be upset? Why or why not?[🔗](#subsec-introduction-2-1-2) [🔗](#subsec-introduction-2)By far, the most important type of statement in mathematics is the implication. It is also the least intuitive of our basic molecular statement types. Our goal in this section is to become more familiar with this key concept.[🔗](#subsec-introduction-3) To see why this sort of statement is so prevalent, consider the *Pythagorean Theorem*. Despite what social media might claim, the Pythagorean Theorem is not \begin{equation*} a^2 + b^2 = c^2\text{.} \end{equation*} Okay, sure, that has a variable in it, so we must be using the convention to take the universal generalization, \begin{equation*} \forall a,b,c \in \R \left( a^2 + b^2 = c^2 \right)\text{.} \end{equation*} So \(1^2 + 5^2 = 2^2\text{???}\) Okay, fine. The equation is true as long as \(a\) and \(b\) are the lengths of the legs of a right triangle and \(c\) is the length of the hypotenuse. In other words: [🔗](#subsec-introduction-4)

> 
> > *If* \(a\) and \(b\) are the lengths of the legs of a right triangle with hypotenuse of length \(c\text{,}\) *then* \(a^2 + b^2 = c^2\text{.}\)[🔗](#subsec-introduction-5-1)
> > [🔗](#subsec-introduction-5)

Math is about making general claims, but a claim is rarely going to be true of absolutely *every* mathematical object. The way we *restrict* our claims to a particular type of object is with an implication: “Take any object you like, *if* it is of the right type, *then* this thing is true about it.”[🔗](#subsec-introduction-6) Similarly, as we saw in the [Quantifiers and Predicates](sec_logic-statements.html#subsec_logic-statements-quant) subsection, when we make claims like “Every square is a rectangle,” we really have an implication: “If something is a square, then it is a rectangle.”[🔗](#subsec-introduction-7) Here is a reminder of what we mean by an implication.[🔗](#subsec-introduction-8)

#### Definition 1.2.1. Implication.

An implication (or conditional) is a molecular statement of the form \begin{equation*} P \imp Q \end{equation*} where \(P\) and \(Q\) are statements. We say that

- \(P\) is the hypothesis (or antecedent). [🔗](#subsec-introduction-9-8-1-6-1)
- \(Q\) is the conclusion (or consequent). [🔗](#subsec-introduction-9-8-1-6-2)

[🔗](#subsec-introduction-9-8-1) An implication is *true* provided \(P\) is false or \(Q\) is true (or both), and *false* otherwise. In particular, the only way for \(P \imp Q\) to be false is for \(P\) to be true *and* \(Q\) to be false.[🔗](#subsec-introduction-9-8-2) [🔗](#subsec-introduction-9)The definition of truth of an implication can also be represented as a truth table:[🔗](#subsec-introduction-10)

| \(P\) | \(Q\) | \(P \imp Q\) |
| --- | --- | --- |
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

Figure 1.2.2. The truth table for \(P \imp Q\text{.}\)[🔗](#fig-implication-tt)Does this truth table make sense? Should we believe it? Look in particular at the third row: F, T, T, and consider the implication, “If \(5 \lt 3\) then \(5+3 = 8\text{.}\)” Does that statement *feel* true? The truth table says it should be (since \(5 \lt 3\) is false, and \(5+3 = 8\) is true).[🔗](#subsec-introduction-12) Much of what we will do in the remainder of this section is convince ourselves that this truth table makes sense.[🔗](#subsec-introduction-13)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=ws-preview-implications)

#### 1.

Consider the statement, “If Tommy doesn’t eat his broccoli, then he will not get any ice cream.” Which of the following statements mean the same thing (i.e., will be true in the same situations)? Select all that apply.[🔗](#pa-sec-logic-implications-tommy-1-1)

- If Tommy does eat his broccoli, then he will get ice cream.
- Are you sure? Did we say what happens when he *does* eat the broccoli, or only what happens when he doesn’t?
- If Tommy gets ice cream, then he ate his broccoli.
- If he got ice cream, he must have eaten the broccoli, because if he didn’t, then he wouldn’t have had ice cream.
- If Tommy doesn’t get ice cream, then he didn’t eat his broccoli.
- Could there have been a reason that Tommy doesn’t get ice cream even if he did eat his broccoli?
- Tommy ate his broccoli and still didn’t get any ice cream.
- This is the opposite of the original statement (it is false precisely when the original statement is true).

[🔗](#pa-sec-logic-implications-tommy)

#### 2.

Suppose that your shady uncle offers you the following deal: If you loan him your car, then he will bring you tacos. In which of the following situations would it be fair to say that your uncle is a liar (i.e., that his statement was false)? Select all that apply.[🔗](#pa-sec-logic-implications-falseimp-1-1)

- You loan him your car. He brings you tacos.
- You loan him your car. He never buys you tacos.
- You don’t loan him your car. He still brings you tacos.
- Maybe he just really likes giving you tacos. That’s not enough to say he was a liar, is it?
- You don’t loan him your car. He never brings you tacos.

[🔗](#pa-sec-logic-implications-falseimp)

#### 3.

Consider the *sentence*, “If \(x \ge 10\text{,}\) then \(x^2 \ge 25\text{.}\)” This sentence becomes a statement when we replace \(x\) by a value, or “capture” the \(x\) in the scope of a quantifier. Which of the following claims are true (select all that apply)?[🔗](#pa-sec-logic-implications-quant-1-1)

- If we replace \(x\) by \(15\text{,}\) then the resulting statement is true. (Note, \(15^2 = 225\text{.}\))
- If we replace \(x\) by \(3\text{,}\) then the resulting statement is true.
- If we replace \(x\) by \(6\text{,}\) then the resulting statement is true.
- The universal generalization (“for all \(x\text{,}\) if \(x \ge 10\) the \(x^2 \ge 25\)”) is true.
- There is a number we could replace \(x\) with that makes the statement false.

[🔗](#pa-sec-logic-implications-quant)

#### 4.

Consider the statement, “If I see a movie, then I eat popcorn” (which happens to be true). Based solely on your intuition of English, which of the following statements mean the same thing? Select all that apply.[🔗](#pa-sec-logic-implications-equiv-1-1)

- If I eat popcorn, then I see a movie.
- This is not equivalent to the original statement. Maybe I also eat popcorn when I watch TV? In that case, the original statement would be true, but this one would be false.
- If I don’t eat popcorn, then I don’t see a movie.
- Correct.
- It is necessary that I eat popcorn when I see a movie.
- This is equivalent to the original statement (although here “necessary” is used in a logical sense).
- To see a movie, it is sufficient for me to eat popcorn.
- Just because I eat popcorn, doesn’t mean I see a movie. I might eat popcorn in other situations. So this is not equivalent to the original statement.
- I only watch a movie if I eat popcorn.
- Another way of saying this is, “I watch a movie only if I eat popcorn.” This is equivalent to the original statement.

[🔗](#pa-sec-logic-implications-equiv)[🔗](#ws-preview-implications)[🔗](#subsec-introduction)

### Subsection Understanding the Truth Table

The truth value of the implication is determined by the truth values of its two parts. Our definition of the truth conditions for an implication says that there is only one way for an implication to be false: when the hypothesis is true and the conclusion is false.[🔗](#subsec_implications-2)

#### Example 1.2.3.

Consider the statement:[🔗](#subsec_implications-3-1-1)

> If Bob gets a 90 on the final, then Bob will pass the class.[🔗](#subsec_implications-3-1-2-1)
> > [🔗](#subsec_implications-3-1-2)

This is definitely an implication: \(P\) is the statement “Bob gets a 90 on the final,” and \(Q\) is the statement “Bob will pass the class.”[🔗](#subsec_implications-3-1-3) Suppose I made that statement to Bob. In what circumstances would it be fair to call me a liar? What if Bob really did get a 90 on the final, and he did pass the class? Then I have not lied; my statement is true. However, if Bob did get a 90 on the final and did not pass the class, then I lied, making the statement false. The tricky case is this: What if Bob did not get a 90 on the final? Maybe he passes the class, maybe he doesn’t. Did I lie in either case? I think not. In these last two cases, \(P\) was false, and the statement \(P \imp Q\) was true. In the first case, \(Q\) was true, and so was \(P \imp Q\text{.}\) So \(P \imp Q\) is true when either \(P\) is false or \(Q\) is true.[🔗](#subsec_implications-3-1-4) [🔗](#subsec_implications-3)Just to be clear, although we sometimes read \(P \imp Q\) as “\(P\) *implies* \(Q\)”, we are not insisting that there is some *causal* relationship between the statements \(P\) and \(Q\) (although there might be). “If \(x \lt y\text{,}\) then \(x+1 \lt y+1\text{,}\)” is a true statement (or at least, its universal generalization is). We know it is true because we understand how the two parts interact. If you add 1 to two numbers \(x\) and \(y\text{,}\) then their order does not change. But the statement, “if \(1 \lt 2\text{,}\) then Euclid studied geometry” is also a true implication.[🔗](#subsec_implications-4)

#### Example 1.2.4.

Decide which of the following statements are true and which are false. Briefly explain.

1. If \(1=1\text{,}\) then most horses have 4 legs.[🔗](#subsec_implications-5-1-1-1-1-1) [🔗](#subsec_implications-5-1-1-1-1)
2. If \(0=1\text{,}\) then \(1=1\text{.}\)[🔗](#subsec_implications-5-1-1-1-2-1) [🔗](#subsec_implications-5-1-1-1-2)
3. If 8 is a prime number, then the 7624th digit of \(\pi\) is an 8.[🔗](#subsec_implications-5-1-1-1-3-1) [🔗](#subsec_implications-5-1-1-1-3)
4. If the 7624th digit of \(\pi\) is an 8, then \(2+2 = 4\text{.}\)[🔗](#subsec_implications-5-1-1-1-4-1) [🔗](#subsec_implications-5-1-1-1-4)

[🔗](#subsec_implications-5-1-1) Solution. All four of the statements are true. Remember, the only way for an implication to be false is for the *if* part to be true and the *then* part to be false.

1. Here both the hypothesis and the conclusion are true, so the implication is true. It does not matter that there is no meaningful connection between the true mathematical fact and the fact about horses.[🔗](#subsec_implications-5-2-1-3-1-1) [🔗](#subsec_implications-5-2-1-3-1)
2. Here the hypothesis is false and the conclusion is true, so the implication is true.[🔗](#subsec_implications-5-2-1-3-2-1) [🔗](#subsec_implications-5-2-1-3-2)
3. I have no idea what the 7624th digit of \(\pi\) is, but this does not matter. Since the hypothesis is false, the implication is automatically true.[🔗](#subsec_implications-5-2-1-3-3-1) [🔗](#subsec_implications-5-2-1-3-3)
4. Regardless of the truth value of the hypothesis, the conclusion is true, making the implication true.[🔗](#subsec_implications-5-2-1-3-4-1) [🔗](#subsec_implications-5-2-1-3-4)

[🔗](#subsec_implications-5-2-1) [🔗](#subsec_implications-5-2) [🔗](#subsec_implications-5)This is a strange example and isn’t really how we use implications anyway. This strangeness is not just mathematicians being stubborn though. The truth conditions for implications *must* be like they are for mathematics to make sense. Let’s see why.[🔗](#subsec_implications-6)

#### Example 1.2.5.

Consider the statement, “All squares are rectangles,” which can also be phrased as, “For all shapes, if the shape is a square, then it is a rectangle.” Is this statement true or false? Are we sure? What about the following three shapes?[🔗](#subsec_implications-7-1-1) ![three shapes, a square, a non-square rectangle, and a triangle.](generated/latex-image/img-squares.svg) Solution. Of course the statement is true. A square is a 4-sided plane figure with 4 right angles and 4 equal-length sides, while a rectangle is a 4-sided plane figure with 4 right angles.[🔗](#subsec_implications-7-2-1) However, what we mean when we consider a universal statement like this is that, no matter what we “plug in” for the variable (“the shape” in this case), the resulting statement is true. When the statement is about a particular shape, we have an implication \(P \imp Q\text{.}\) This means it must be true that, if the actual shape on the left is a square, then it is a rectangle. Great. The shape is a square (\(P\) is true) and is a rectangle (\(Q\) is true), so yes, the implication is true.[🔗](#subsec_implications-7-2-2) Is the implication true of the rectangle in the middle? Well, that shape is not a square (\(P\) is false), and it is a rectangle (\(Q\) is true). But look, we believe that all squares are rectangles, so the statement must be true. Even of a rectangle. The only way this works is if “false implies true” is true![🔗](#subsec_implications-7-2-3) Similarly, all squares are rectangles is a true statement, even when we look at a triangle. \(P\) is false (the triangle is not a square), and \(Q\) is false (the triangle is not a rectangle). Thankfully, we defined implications to be true in this case as well.[🔗](#subsec_implications-7-2-4) We have given shapes that illustrate lines 1, 3, and 4 of the truth table for implications ([Figure 1.2.2](sec_logic-implications.html#fig-implication-tt)). What shape illustrates line 2? That would need to be a shape that was a square and was not a rectangle.... Of course we can’t find one, precisely because the statement is true![🔗](#subsec_implications-7-2-5) [🔗](#subsec_implications-7-2) [🔗](#subsec_implications-7)[🔗](#subsec_implications)

### Subsection Related Statements

An implication is a way of expressing a relationship between two statements. It is often interesting to ask whether there are other relationships between the statements. Here we introduce some common language to address this question.[🔗](#subsec-related-statements-2)

#### Definition 1.2.6. Converse, Contrapositive, and Inverse.

Given an implication \(P \imp Q\text{,}\) we say,

- The converse is the statement \(Q \imp P\text{.}\)[🔗](#subsec-related-statements-3-5-1-2-1-1) [🔗](#subsec-related-statements-3-5-1-2-1)
- The contrapositive is the statement \(\neg Q \imp \neg P\text{.}\)[🔗](#subsec-related-statements-3-5-1-2-2-1) [🔗](#subsec-related-statements-3-5-1-2-2)
- The inverse is the statement, \(\neg P \imp \neg Q\text{.}\)[🔗](#subsec-related-statements-3-5-1-2-3-1) [🔗](#subsec-related-statements-3-5-1-2-3)

[🔗](#subsec-related-statements-3-5-1) [🔗](#subsec-related-statements-3)

#### Example 1.2.7.

Consider the implication, “If you clean your room, then you can go to the party.” Give the converse, contrapositive, and inverse of this statement[🔗](#subsec-related-statements-4-1-1) Solution. The converse is, “If you can go to the party, then you clean your room.”[🔗](#subsec-related-statements-4-2-1) The contrapositive is, “If you can’t go to the party, then you don’t clean your room.”[🔗](#subsec-related-statements-4-2-2) The inverse is, “If you don’t clean your room, then you can’t go to the party.”[🔗](#subsec-related-statements-4-2-3) [🔗](#subsec-related-statements-4-2) [🔗](#subsec-related-statements-4)Symbolically, both the converse and the contrapositive *switch* the order of the two parts of the statement (or alternatively, think about turning the arrow to point in the other direction). The contrapositive and the inverse take the *negation* of both of the statements. Notice that if you take the converse (switch the order) and then take the contrapositive *of* that converse (switch the order back and negate both parts) you get the inverse. So the inverse is nothing more than the contrapositive of the converse. Or the converse of the contrapositive, which is a fun fact to mention at parties.[🔗](#subsec-related-statements-5) When considering statements with quantifiers, we ignore the outside quantifiers when forming the converse, contrapositive, and inverse.[🔗](#subsec-related-statements-6)

#### Quantifiers and the Converse, Contrapositive, and Inverse.

A quantified implication \(\forall x (P(x) \imp Q(x))\) has: Converse[🔗](#assemblage-converse-contrapositive-inverse-quantifiers-2-2-1) \(\displaystyle \forall x (Q(x) \imp P(x))\)[🔗](#assemblage-converse-contrapositive-inverse-quantifiers-2-2-1-2) Contrapositive[🔗](#assemblage-converse-contrapositive-inverse-quantifiers-2-2-2) \(\displaystyle \forall x (\neg Q(x) \imp \neg P(x))\)[🔗](#assemblage-converse-contrapositive-inverse-quantifiers-2-2-2-2) Inverse[🔗](#assemblage-converse-contrapositive-inverse-quantifiers-2-2-3) \(\displaystyle \forall x (\neg P(x) \imp \neg Q(x))\)[🔗](#assemblage-converse-contrapositive-inverse-quantifiers-2-2-3-2) [🔗](#assemblage-converse-contrapositive-inverse-quantifiers-2) [🔗](#assemblage-converse-contrapositive-inverse-quantifiers)

#### Note 1.2.8.

It is unlikely that we would encounter a statement of the form \(\exists x (P(x) \imp Q(x))\text{,}\) since this would be automatically true if there was any \(x\) that made \(P(x)\) false. But if we did, the same rules would apply to the converse, contrapositive, and inverse as above: Just ignore the quantifier when swapping and/or negating the parts of the implication.[🔗](#subsec-related-statements-8-1) [🔗](#subsec-related-statements-8)For example, “For all shapes, if the shape is a square, then it is a rectangle” (i.e., all squares are rectangles) has the converse, “For all shapes, if the shape is a rectangle, then it is a square” (so all rectangles are squares).[🔗](#subsec-related-statements-9) Well, that’s not true! There exist shapes that are rectangles and are NOT squares. Indeed, this is an example of a statement that is true with a false converse. There are lots of examples of this throughout mathematics. There are also examples of true implications that have true converses. You just can’t know from the logic. 2 It turns out the Pythagorean Theorem is one such statement. It is also true that *if* \(a^2 + b^2 = c^2\text{,}\) *then* there is a right triangle with legs of lengths \(a\) and \(b\) and hypotenuse of length \(c\text{.}\) So we could have also written the theorem as a biconditional: “\(a\) and \(b\) are the lengths of the legs of a right triangle with hypotenuse of length \(c\) *if and only if* \(a^2 + b^2 = c^2\text{.}\)”[🔗](#subsec-related-statements-10) The contrapositive of “For all shapes, if it is a square, then it is a rectangle” is “For all shapes, if the shape is not a rectangle, then it is not a square.” This is true. In fact, *the contrapositive of a true statement is always true*![🔗](#subsec-related-statements-11) Since the contrapositive of an implication always has the same truth value as its original implication, it can often be helpful to analyze the contrapositive to decide whether an implication is true.[🔗](#subsec-related-statements-12)

#### Example 1.2.9.

True or false: If you draw any nine playing cards from a regular deck, then you will have at least three cards all of the same suit. Is the converse true?[🔗](#subsec-related-statements-13-1-1) Solution. True. The original implication is a little hard to analyze because there are so many combinations of nine cards. But consider the contrapositive: if you *don’t* have at least three cards all of the same suit, then you don’t have nine cards. It is easy to see why this is true. If you don’t have at least three cards in a suit, you can have at most two cards of each of the four suits, for a total of at most eight cards.[🔗](#subsec-related-statements-13-2-1) The converse: If you have at least three cards of the same suit, then you have nine cards. This is false. You could have three spades and nothing else. Note that to demonstrate that the converse (an implication) is false, we provided an example where the hypothesis is true (you do have three cards of the same suit), but where the conclusion is false (you do not have nine cards). In other words, we find some example that puts us in row 2 of the implication’s truth table.[🔗](#subsec-related-statements-13-2-2) [🔗](#subsec-related-statements-13-2) [🔗](#subsec-related-statements-13)Understanding converses and contrapositives can help understand implications and their truth values:[🔗](#subsec-related-statements-14)

#### Example 1.2.10.

Suppose I tell Sue that if she gets a 93% on her final, then she will get an A in the class. Assuming that what I said is true, what can you conclude in the following cases:[🔗](#subsec-related-statements-15-1-1)

1. Sue gets a 93% on her final.[🔗](#subsec-related-statements-15-1-2-1-1-1) [🔗](#subsec-related-statements-15-1-2-1-1)
2. Sue gets an A in the class.[🔗](#subsec-related-statements-15-1-2-1-2-1) [🔗](#subsec-related-statements-15-1-2-1-2)
3. Sue does not get a 93% on her final.[🔗](#subsec-related-statements-15-1-2-1-3-1) [🔗](#subsec-related-statements-15-1-2-1-3)
4. Sue does not get an A in the class.[🔗](#subsec-related-statements-15-1-2-1-4-1) [🔗](#subsec-related-statements-15-1-2-1-4)

[🔗](#subsec-related-statements-15-1-2) Solution. Note first that whenever \(P \imp Q\) and \(P\) are both true statements, \(Q\) must be true as well. For this problem, take \(P\) to mean “Sue gets a 93% on her final” and \(Q\) to mean “Sue will get an A in the class.”[🔗](#subsec-related-statements-15-2-1)

1. We have \(P \imp Q\) and \(P\text{,}\) so \(Q\) follows. Sue gets an A.[🔗](#subsec-related-statements-15-2-2-1-1-1) [🔗](#subsec-related-statements-15-2-2-1-1)
2. You cannot conclude anything. Sue could have gotten the A because she did extra credit, for example. Notice that we do not know that if Sue gets an \(A\text{,}\) then she gets a 93% on her final. That is the converse of the original implication, so it might or might not be true.[🔗](#subsec-related-statements-15-2-2-1-2-1) [🔗](#subsec-related-statements-15-2-2-1-2)
3. The contrapositive of the converse of \(P \imp Q\) is \(\neg P \imp \neg Q\text{,}\) which states that if Sue does not get a 93% on the final, then she will not get an A in the class. But this does not follow from the original implication. Again, we can conclude nothing. Sue could have done extra credit.[🔗](#subsec-related-statements-15-2-2-1-3-1) [🔗](#subsec-related-statements-15-2-2-1-3)
4. What would happen if Sue did not get an A but *did* get a 93% on the final? Then \(P\) would be true, and \(Q\) would be false. This makes the implication \(P \imp Q\) false! It must be that Sue did not get a 93% on the final. Notice we now have the implication \(\neg Q \imp \neg P\) which is the contrapositive of \(P \imp Q\text{.}\) Since \(P \imp Q\) is assumed to be true, we know \(\neg Q \imp \neg P\) is true as well.[🔗](#subsec-related-statements-15-2-2-1-4-1) [🔗](#subsec-related-statements-15-2-2-1-4)

[🔗](#subsec-related-statements-15-2-2) [🔗](#subsec-related-statements-15-2) [🔗](#subsec-related-statements-15)As we said above, an implication is not logically equivalent to its converse, but it is possible that both the implication and its converse are true. In this case, when both \(P \imp Q\) and \(Q \imp P\) are true, we say that \(P\) and \(Q\) are equivalent and write \(P \iff Q\text{.}\) This is the biconditional we mentioned in [Section 1.1](sec_logic-statements.html).[🔗](#subsec-related-statements-16) You can think of “if and only if” statements as having two parts: an implication and its converse. We might say one is the “if” part, and the other is the “only if” part. We also sometimes say that “if and only if” statements have two directions: a forward direction \((P \imp Q)\) and a backward direction (\(P \leftarrow Q\text{,}\) which is really just sloppy notation for \(Q \imp P\)).[🔗](#subsec-related-statements-17) Let’s think a little about which part is which. Is \(P \imp Q\) the “if” part or the “only if” part? Consider an example.[🔗](#subsec-related-statements-18)

#### Example 1.2.11.

Suppose it is true that I sing if and only if I’m in the shower. We know this means both that if I sing, then I’m in the shower, and also the converse, that if I’m in the shower, then I sing. Let \(P\) be the statement, “I sing,” and \(Q\) be, “I’m in the shower.” So \(P \imp Q\) is the statement “if I sing, then I’m in the shower.” Which part of the if and only if statement is this?[🔗](#subsec-related-statements-19-1-1) What we are really asking for is the meaning of “I sing *if* I’m in the shower” and “I sing *only if* I’m in the shower.” When is the first one (the “if” part) *false*? When I am in the shower but not singing. That is the same condition for being false as the statement, “If I’m in the shower, then I sing.” So the “if” part is \(Q \imp P\text{.}\) On the other hand, to say, “I sing only if I’m in the shower” is equivalent to saying “If I sing, then I’m in the shower,” so the “only if” part is \(P \imp Q\text{.}\)[🔗](#subsec-related-statements-19-1-2) [🔗](#subsec-related-statements-19)It is not especially important to know which part is the “if” or “only if” part, but this does illustrate something very, very important: *There are many ways to state an implication!*[🔗](#subsec-related-statements-20)

#### Example 1.2.12.

Rephrase the implication, “If I dream, then I am asleep” in as many ways as possible. Then do the same for the converse.[🔗](#subsec-related-statements-21-1-1) Solution. The following are all equivalent to the original implication:

1. I am asleep if I dream.[🔗](#subsec-related-statements-21-2-1-1-1-1) [🔗](#subsec-related-statements-21-2-1-1-1)
2. I dream only if I am asleep.[🔗](#subsec-related-statements-21-2-1-1-2-1) [🔗](#subsec-related-statements-21-2-1-1-2)
3. In order to dream, I must be asleep.[🔗](#subsec-related-statements-21-2-1-1-3-1) [🔗](#subsec-related-statements-21-2-1-1-3)
4. To dream, it is necessary that I am asleep.[🔗](#subsec-related-statements-21-2-1-1-4-1) [🔗](#subsec-related-statements-21-2-1-1-4)
5. To be asleep, it is sufficient to dream.[🔗](#subsec-related-statements-21-2-1-1-5-1) [🔗](#subsec-related-statements-21-2-1-1-5)
6. I am not dreaming unless I am asleep.[🔗](#subsec-related-statements-21-2-1-1-6-1) [🔗](#subsec-related-statements-21-2-1-1-6)

The following are equivalent to the converse (if I am asleep, then I dream):

1. I dream if I am asleep.[🔗](#subsec-related-statements-21-2-1-2-1-1) [🔗](#subsec-related-statements-21-2-1-2-1)
2. I am asleep only if I dream.[🔗](#subsec-related-statements-21-2-1-2-2-1) [🔗](#subsec-related-statements-21-2-1-2-2)
3. It is necessary that I dream in order to be asleep.[🔗](#subsec-related-statements-21-2-1-2-3-1) [🔗](#subsec-related-statements-21-2-1-2-3)
4. It is sufficient that I be asleep in order to dream.[🔗](#subsec-related-statements-21-2-1-2-4-1) [🔗](#subsec-related-statements-21-2-1-2-4)
5. If I don’t dream, then I’m not asleep.[🔗](#subsec-related-statements-21-2-1-2-5-1) [🔗](#subsec-related-statements-21-2-1-2-5)

[🔗](#subsec-related-statements-21-2-1) [🔗](#subsec-related-statements-21-2) [🔗](#subsec-related-statements-21)Hopefully you agree with the above example. We include the “necessary and sufficient” versions because those are common when discussing mathematics. Let’s agree once and for all what they mean.[🔗](#subsec-related-statements-22)

#### Definition 1.2.13. Necessary and Sufficient.

- “\(P\) is necessary for \(Q\)” means \(Q \imp P\text{.}\) [🔗](#subsec-related-statements-23-4-1-1-1)
- “\(P\) is sufficient for \(Q\)” means \(P \imp Q\text{.}\) [🔗](#subsec-related-statements-23-4-1-1-2)
- If \(P\) is necessary and sufficient for \(Q\text{,}\) then \(P \iff Q\text{.}\)[🔗](#subsec-related-statements-23-4-1-1-3-1) [🔗](#subsec-related-statements-23-4-1-1-3)

[🔗](#subsec-related-statements-23-4-1) [🔗](#subsec-related-statements-23)To be honest, I have trouble with these if I’m not very careful. I find it helps to keep a standard example for reference.[🔗](#subsec-related-statements-24)

#### Example 1.2.14.

In a regular deck of cards, the red suits are hearts and diamonds. The black suits are clubs and spades. Thus it is true that, after picking a card, if my card is a spade, then my card is black.[🔗](#subsec-related-statements-25-1-1) Restate this fact using necessary and sufficient phrasing.[🔗](#subsec-related-statements-25-1-2) Solution. For my card to be a spade, it is necessary that it is black. However, it is not sufficient for it to be black to say that I am holding a spade (since I could have a club).[🔗](#subsec-related-statements-25-2-1) I can also say that to have a black card, it is sufficient to have a spade. It is not necessary that I have a spade.[🔗](#subsec-related-statements-25-2-2) It is helpful to think about the amount of evidence you need. Is knowing that the card is a spade enough evidence to conclude that it is a black card? Yes, that is sufficient! Being a spade is a sufficient condition for the card to be black.[🔗](#subsec-related-statements-25-2-3) [🔗](#subsec-related-statements-25-2) [🔗](#subsec-related-statements-25)Thinking about the necessity and sufficiency of conditions can also help when writing proofs and justifying conclusions. If you want to establish some mathematical fact, it is helpful to think what other facts would *be enough* (be sufficient) to prove your fact. If you have an assumption, think about what must also be necessary if that hypothesis is true.[🔗](#subsec-related-statements-26) [🔗](#subsec-related-statements)

### Reading Questions Reading Questions

#### 1.

It happens to be true that all mammals have hair. Which of the following are also true?[🔗](#rq-logic-implications-rephrase-1-1)

- Having hair is a necessary condition for being a mammal.
- Having hair is a sufficient condition for being a mammal.
- This would be saying that as soon as a thing has hair, it is a mammal. But...tarantulas!
- If an animal doesn’t have hair, then it is not a mammal.
- This is the contrapositive of the original statement.
- An animal is a mammal only if it has hair.
- And this is the same as saying if an animal is a mammal, then it has hair.

[🔗](#rq-logic-implications-rephrase)

#### 2.

Give an example of a *true* implication (written out in words) that has a *false* converse. Explain why your implication is true and why the converse is false.[🔗](#rq-logic-implications-false-converse-1-1) [🔗](#rq-logic-implications-false-converse)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-logic-implications-q-1-1) [🔗](#rq-logic-implications-q)[🔗](#rqs-logic-implications)

### Exercises Practice Problems

#### 1.

Activate In my safe is a sheet of paper with two shapes drawn on it in colored crayon. One is a diamond, and the other is a circle. Each shape is drawn in a single color. Suppose you believe me when I tell you that, "If the diamond is purple, then the circle is blue.[🔗](#extracted-webwork-7-1-1-1) What do you therefore know about the truth value of the following statements?[🔗](#extracted-webwork-7-1-1-2)

1. If the circle is blue, then the diamond is purple.[🔗](#extracted-webwork-7-1-1-3-1-1-1) [🔗](#extracted-webwork-7-1-1-3-1-1)
2. The diamond and the circle are both blue.[🔗](#extracted-webwork-7-1-1-3-1-2-1) [🔗](#extracted-webwork-7-1-1-3-1-2)
3. The diamond and the circle are both purple.[🔗](#extracted-webwork-7-1-1-3-1-3-1) [🔗](#extracted-webwork-7-1-1-3-1-3)
4. If the circle is not blue, then the diamond is not purple.[🔗](#extracted-webwork-7-1-1-3-1-4-1) [🔗](#extracted-webwork-7-1-1-3-1-4)
5. The diamond is not purple, or the circle is blue.[🔗](#extracted-webwork-7-1-1-3-1-5-1) [🔗](#extracted-webwork-7-1-1-3-1-5)

[🔗](#extracted-webwork-7-1-1-3) [🔗](#ww-statements-shape-color)

#### 2.

Activate Suppose the statement, *"If the circle is orange, then the square is purple,"* is true. Assume also that the converse is false. Classify each statement below as true or false (if possible).[🔗](#extracted-webwork-8-1-1-1)

1. The circle is orange.[🔗](#extracted-webwork-8-1-1-2-1-1-1) [🔗](#extracted-webwork-8-1-1-2-1-1)
2. The square is purple.[🔗](#extracted-webwork-8-1-1-2-1-2-1) [🔗](#extracted-webwork-8-1-1-2-1-2)
3. The circle is orange if and only if the square is not purple.[🔗](#extracted-webwork-8-1-1-2-1-3-1) [🔗](#extracted-webwork-8-1-1-2-1-3)
4. The circle is orange if and only if the square is purple.[🔗](#extracted-webwork-8-1-1-2-1-4-1) [🔗](#extracted-webwork-8-1-1-2-1-4)

[🔗](#extracted-webwork-8-1-1-2) [🔗](#ww-statements-shape-color-f-conv)

#### 3.

Activate Consider the statement, *"If you will give me magic beans, then I will give you a cow."* Decide whether each statement below is the converse, the contrapositive, or neither.[🔗](#extracted-webwork-9-1-1-1)

1. If you will not give me magic beans, then I will not give you a cow.[🔗](#extracted-webwork-9-1-1-2-1-1-1) [🔗](#extracted-webwork-9-1-1-2-1-1)
2. If you will give me magic beans, then I will not give you a cow.[🔗](#extracted-webwork-9-1-1-2-1-2-1) [🔗](#extracted-webwork-9-1-1-2-1-2)
3. You will give me magic beans, and I will not give you a cow.[🔗](#extracted-webwork-9-1-1-2-1-3-1) [🔗](#extracted-webwork-9-1-1-2-1-3)
4. If I will give you a cow, then you will give me magic beans.[🔗](#extracted-webwork-9-1-1-2-1-4-1) [🔗](#extracted-webwork-9-1-1-2-1-4)
5. If I will not give you a cow, then you will not give me magic beans.[🔗](#extracted-webwork-9-1-1-2-1-5-1) [🔗](#extracted-webwork-9-1-1-2-1-5)
6. If I will give you a cow, then you will not give me magic beans.[🔗](#extracted-webwork-9-1-1-2-1-6-1) [🔗](#extracted-webwork-9-1-1-2-1-6)

[🔗](#extracted-webwork-9-1-1-2) [🔗](#ww-statements-conv-cont)

#### 4.

Activate You have discovered an old paper on graph theory that discusses the *viscosity* of a graph (which for all you know, is something completely made up by the author). A theorem in the paper claims that “if a graph satisfies *condition (V)*, then the graph is *viscous*.” Which of the following are equivalent ways of stating this claim? Which are equivalent to the *converse* of the claim?[🔗](#extracted-webwork-10-1-1-1)

1. Satisfying condition (V) is a necessary condition for a graph to be viscous.[🔗](#extracted-webwork-10-1-1-2-1-1-1) [🔗](#extracted-webwork-10-1-1-2-1-1)
2. For a graph to be viscous, it is sufficient for it to satisfy condition (V).[🔗](#extracted-webwork-10-1-1-2-1-2-1) [🔗](#extracted-webwork-10-1-1-2-1-2)
3. A graph is viscous only if it satisfies condition (V).[🔗](#extracted-webwork-10-1-1-2-1-3-1) [🔗](#extracted-webwork-10-1-1-2-1-3)
4. Every viscous graph satisfies condition (V).[🔗](#extracted-webwork-10-1-1-2-1-4-1) [🔗](#extracted-webwork-10-1-1-2-1-4)
5. For a graph to be viscous, it is necessary that it satisfies condition (V).[🔗](#extracted-webwork-10-1-1-2-1-5-1) [🔗](#extracted-webwork-10-1-1-2-1-5)

[🔗](#extracted-webwork-10-1-1-2) [🔗](#ww-statements-rephrase)

#### 5.

Activate Which of the following statements are equivalent to the implication, "*if you win the lottery, then you will be rich,*" and which are equivalent to the converse of the implication?[🔗](#extracted-webwork-11-1-1-1)

1. You will win the lottery if you are rich.[🔗](#extracted-webwork-11-1-1-2-1-1-1) [🔗](#extracted-webwork-11-1-1-2-1-1)
2. You will be rich if you win the lottery.[🔗](#extracted-webwork-11-1-1-2-1-2-1) [🔗](#extracted-webwork-11-1-1-2-1-2)
3. You will be rich only if you win the lottery.[🔗](#extracted-webwork-11-1-1-2-1-3-1) [🔗](#extracted-webwork-11-1-1-2-1-3)
4. It is sufficient to win the lottery to be rich.[🔗](#extracted-webwork-11-1-1-2-1-4-1) [🔗](#extracted-webwork-11-1-1-2-1-4)
5. Either you don’t win the lottery, or else you are rich.[🔗](#extracted-webwork-11-1-1-2-1-5-1) [🔗](#extracted-webwork-11-1-1-2-1-5)

[🔗](#extracted-webwork-11-1-1-2) [🔗](#ww-statements-rephrase2)[🔗](#practice-logic-implications)

### Exercises Additional Exercises

#### 1.

Translate into English:

1. \(\forall x (E(x) \imp E(x +2))\text{.}\) [🔗](#ex-logic-implications-2-1-1-1-1)
2. \(\forall x \exists y (\sin(x) = y)\text{.}\) [🔗](#ex-logic-implications-2-1-1-1-2)
3. \(\forall y \exists x (\sin(x) = y)\text{.}\) [🔗](#ex-logic-implications-2-1-1-1-3)
4. \(\forall x \forall y (x^3 = y^3 \imp x = y)\text{.}\) [🔗](#ex-logic-implications-2-1-1-1-4)

[🔗](#ex-logic-implications-2-1-1) [🔗](#ex-logic-implications-2)

#### 2.

Consider the statement, “If Oscar eats Chinese food, then he drinks milk.”

1. Write the converse of the statement.[🔗](#ex-logic-implications-3-1-1-2-1-1) [🔗](#ex-logic-implications-3-1-1-2-1)
2. Write the contrapositive of the statement.[🔗](#ex-logic-implications-3-1-1-2-2-1) [🔗](#ex-logic-implications-3-1-1-2-2)
3. Is it possible for the contrapositive to be false? If it was, what would that tell you?[🔗](#ex-logic-implications-3-1-1-2-3-1) [🔗](#ex-logic-implications-3-1-1-2-3)
4. Suppose the original statement is true, and that Oscar drinks milk. Can you conclude anything (about his eating Chinese food)? Explain.[🔗](#ex-logic-implications-3-1-1-2-4-1) [🔗](#ex-logic-implications-3-1-1-2-4)
5. Suppose the original statement is true, and that Oscar does not drink milk. Can you conclude anything (about his eating Chinese food)? Explain.[🔗](#ex-logic-implications-3-1-1-2-5-1) [🔗](#ex-logic-implications-3-1-1-2-5)

[🔗](#ex-logic-implications-3-1-1) [🔗](#ex-logic-implications-3)

#### 3.

Write each of the following statements in the form, “If …, then ….” Careful, some statements may be false (which is fine for the purposes of this question).

1. To lose weight, you must exercise.[🔗](#ex-logic-implications-4-1-1-2-1-1) [🔗](#ex-logic-implications-4-1-1-2-1)
2. To lose weight, all you need to do is exercise.[🔗](#ex-logic-implications-4-1-1-2-2-1) [🔗](#ex-logic-implications-4-1-1-2-2)
3. Every American is patriotic.[🔗](#ex-logic-implications-4-1-1-2-3-1) [🔗](#ex-logic-implications-4-1-1-2-3)
4. You are patriotic only if you are American.[🔗](#ex-logic-implications-4-1-1-2-4-1) [🔗](#ex-logic-implications-4-1-1-2-4)
5. The set of rational numbers is a subset of the real numbers.[🔗](#ex-logic-implications-4-1-1-2-5-1) [🔗](#ex-logic-implications-4-1-1-2-5)
6. A number is prime if it is not even.[🔗](#ex-logic-implications-4-1-1-2-6-1) [🔗](#ex-logic-implications-4-1-1-2-6)
7. Either the Broncos will win the Super Bowl, or they won’t play in the Super Bowl.[🔗](#ex-logic-implications-4-1-1-2-7-1) [🔗](#ex-logic-implications-4-1-1-2-7)

[🔗](#ex-logic-implications-4-1-1) [🔗](#ex-logic-implications-4)

#### 4.

Consider the implication, “If you clean your room, then you can watch TV.” Rephrase the implication in as many ways as possible. Then do the same for the converse.[🔗](#ex-logic-implications-5-1-1) Hint. Of course there are many answers. It helps to assume that the statement is true and the converse is *not* true. Think about what that means in the real world, and then start saying it in different ways. Some ideas: Use “necessary and sufficient” language, use “only if,” consider negations, use “or else” language.[🔗](#ex-logic-implications-5-2-1) [🔗](#ex-logic-implications-5-2) [🔗](#ex-logic-implications-5)

#### 5.

Recall from calculus, if a function is differentiable at a point \(c\text{,}\) then it is continuous at \(c\text{,}\) but that the converse of this statement is not true (for example, \(f(x) = |x|\) at the point 0). Restate this fact using “necessary and sufficient” language.[🔗](#ex-logic-implications-6-1-1) [🔗](#ex-logic-implications-6)

#### 6.

Consider the statement, “For all natural numbers \(n\text{,}\) if \(n\) is prime, then \(n\) is solitary.” You do not need to know what *solitary* means for this problem, just that it is a property that some numbers have and others do not.

1. Write the converse and the contrapositive of the statement, saying which is which. Note: the original statement claims that an implication is true for all \(n\text{,}\) and it is that implication that we are taking the converse and contrapositive of.[🔗](#ex-logic-implications-7-2-1-3-1-1) [🔗](#ex-logic-implications-7-2-1-3-1)
2. Write the negation of the original statement. What would you need to show to prove that the statement is false?[🔗](#ex-logic-implications-7-2-1-3-2-1) [🔗](#ex-logic-implications-7-2-1-3-2)
3. Even though you don’t know whether 10 is solitary (in fact, nobody knows this), is the statement, “If 10 is prime, then 10 is solitary” true or false? Explain.[🔗](#ex-logic-implications-7-2-1-3-3-1) [🔗](#ex-logic-implications-7-2-1-3-3)
4. It turns out that 8 is solitary. Does this tell you anything about the truth or falsity of the original statement, its converse or its contrapositive? Explain.[🔗](#ex-logic-implications-7-2-1-3-4-1) [🔗](#ex-logic-implications-7-2-1-3-4)
5. Assuming that the original statement is true, what can you say about the relationship between the *set* \(P\) of prime numbers and the *set* \(S\) of solitary numbers. Explain.[🔗](#ex-logic-implications-7-2-1-3-5-1) [🔗](#ex-logic-implications-7-2-1-3-5)

[🔗](#ex-logic-implications-7-2-1) [🔗](#ex-logic-implications-7)[🔗](#ex-logic-implications)[🔗](#sec_logic-implications) [&#xe5cb;Prev](sec_logic-statements.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_logic-rules.html) [Feedback](/cdn-cgi/l/email-protection#3f504c5c5e4d11535a4956517f4a515c50115a5b4a)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_logic-implications-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_logic-implications-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 1.4 Proofs

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_logic-proofs-2-1-1)

- Identify the logical structure of, and distinguish between, *direct proofs*, a *proof by contrapositives*, and a *proof by contradictions*.[🔗](#sec_logic-proofs-2-2-1-1) [🔗](#sec_logic-proofs-2-2-1)
- Identify flaws in an incorrect proof and determine whether they are flaws in logic or mathematical concepts.[🔗](#sec_logic-proofs-2-2-2-1) [🔗](#sec_logic-proofs-2-2-2)
- Apply definitions to prove statements using basic proof styles.[🔗](#sec_logic-proofs-2-2-3-1) [🔗](#sec_logic-proofs-2-2-3)

[🔗](#sec_logic-proofs-2)

### Subsection Section Preview

#### Investigate!

A mini sudoku puzzle is a \(4\times 4\) grid of squares, divided into four \(2\times 2\) boxes. The goal is to fill each square with a digit from 1 to 4, such that no digit repeats in any row, any column, or any box.[🔗](#logic-proofs-intro-2-2) Here is a simple mini sudoku puzzle you can try to solve.[🔗](#logic-proofs-intro-2-3) ![4x4 sudoku with given digits.](generated/latex-image/img-sudoku-example.svg) You might notice that the solution to the above puzzle has its four outside corners all different, and its four middle squares all different.[🔗](#logic-proofs-intro-2-5) The goal of this *Investigate!* question is to prove that this is not a coincidence: Suppose a mini sudoku puzzle has all different numbers in its four corners (marked with # below). Prove that the center four squares (marked with * below) must also contain different numbers.[🔗](#logic-proofs-intro-2-6) ![4x4 sudoku with given digits.](generated/latex-image/img-sudoku-invst-thm.svg) [🔗](#logic-proofs-intro-2)

#### Try it 1.4.1.

Try placing numbers into an empty mini sudoku puzzle. See if you can break the statement we were asked to prove in the *Investigate!* activity. What stops you? Briefly explain whether you think the statement is true or false, and why.[🔗](#ip-logic-proofs-1-1) [🔗](#ip-logic-proofs) Anyone who doesn’t believe there is creativity in mathematics clearly has not tried to write proofs. Finding a way to convince the world that a particular statement is necessarily true is a mighty undertaking and can often be quite challenging. There is no guaranteed path to success in the search for proofs. For example, in the summer of 1742, a German mathematician by the name of Christian Goldbach wondered whether every even integer greater than 2 could be written as the sum of two primes. Centuries later, we still don’t have a proof of this apparent fact (computers have checked that Goldbach’s conjecture holds for all numbers less than \(4\times 10^{18}\text{,}\) but no proof that the statement holds for *all* numbers has been found).[🔗](#logic-proofs-intro-4) Writing proofs is a bit of an art. Like any art, to be truly great at it, you need some sort of inspiration, as well as some foundational technique. Just as musicians can learn proper fingering, and painters can learn the proper way to hold a brush, we can look at the proper way to construct arguments. [🔗](#logic-proofs-intro-5) We can view a proof through two distinct but intersecting lenses. First, we can think about the *logical* structure of a proof. Below we will consider three styles of proof that vary precisely in their logical structure. Second, we can look at the *mathematical content* of the proof. How does the proof illustrate understanding of mathematical concepts? Does it use definitions of mathematical objects correctly? How do the definitions interact with each other?[🔗](#logic-proofs-intro-6) Recall that in [Section 1.3](sec_logic-rules.html) we said that a tautology is a necessarily true statement, but that it doesn’t tell us anything interesting. Similarly, if a proof relied entirely on the logical form of the statement it was proving, it wouldn’t tell us anything interesting about mathematics. Thus all the proofs we consider *must* involve some combining of mathematical concepts in addition to their logical structure.[🔗](#logic-proofs-intro-7) In this section, we will see examples of how the interaction between logical and mathematical structure plays out. We will think of the logical structure as the *skeleton* or *scaffolding* of the proof and look at the different shapes this skeleton can take. We will then see how the mathematical content of the proof fills in the details of the skeleton, how it adds meat to the bones.[🔗](#logic-proofs-intro-8) It is often challenging to be careful about proofs when the statements we try to prove seem too obvious or familiar. While we will definitely want to prove simple facts about numbers, like that the sum of two even numbers is even, our familiarity with numbers can make it difficult to take this task seriously. So instead, we will start by proving some facts in what is hopefully a novel setting: mini sudoku puzzles.[🔗](#logic-proofs-intro-9)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-logic-proofs)

Consider the statement:[🔗](#PA-logic-proofs-2-1)

> If \(a b\) is an even number, then \(a\) or \(b\) is even.[🔗](#PA-logic-proofs-2-2-1)
> > [🔗](#PA-logic-proofs-2-2)

Which of the proofs below appear to be valid proofs of this statement? Note: You can assume all the algebra below is correct (because it is).[🔗](#PA-logic-proofs-2-3)

#### 1.

Suppose \(a\) and \(b\) are odd. That is, \(a=2k+1\) and \(b=2m+1\) for some integers \(k\) and \(m\text{.}\) Then \begin{align*} ab \amp =(2k+1)(2m+1)\\ \amp =4km+2k+2m+1\\ \amp =2(2km+k+m)+1\text{.} \end{align*} [🔗](#PA-logic-proofs-3-1) Therefore \(ab\) is odd.[🔗](#PA-logic-proofs-3-2) [🔗](#PA-logic-proofs-3)

#### 2.

Assume that \(a\) or \(b\) is even -- say it is \(a\) (the case where \(b\) is even will be identical). That is, \(a=2k\) for some integer \(k\text{.}\) Then \begin{align*} ab \amp =(2k)b\\ \amp =2(kb)\text{.} \end{align*} [🔗](#PA-logic-proofs-4-1) Thus \(ab\) is even.[🔗](#PA-logic-proofs-4-2) [🔗](#PA-logic-proofs-4)

#### 3.

Suppose that \(ab\) is even but \(a\) and \(b\) are both odd. Namely, \(ab = 2n\text{,}\) \(a=2k+1\) and \(b=2j+1\) for some integers \(n\text{,}\) \(k\text{,}\) and \(j\text{.}\) Then \begin{align*} 2n \amp =(2k+1)(2j+1)\\ 2n \amp =4kj+2k+2j+1\\ n \amp = 2kj+k+j+\frac{1}{2}\text{.} \end{align*} [🔗](#PA-logic-proofs-5-1) But since \(2kj+k+j\) is an integer, this says that the integer \(n\) is equal to a non-integer, which is impossible.[🔗](#PA-logic-proofs-5-2) [🔗](#PA-logic-proofs-5)

#### 4.

Let \(ab\) be an even number, say \(ab=2n\text{,}\) and \(a\) be an odd number, say \(a=2k+1\text{.}\) \begin{align*} ab \amp =(2k+1)b\\ 2n \amp =2kb+b\\ 2n-2kb\amp =b\\ 2(n-kb)\amp =b\text{.} \end{align*} [🔗](#PA-logic-proofs-6-1) Therefore \(b\) must be even.[🔗](#PA-logic-proofs-6-2) [🔗](#PA-logic-proofs-6)

#### 5.

Which of the proofs above are valid proofs of the statement?[🔗](#pa-logic-proofs-1-1)

- Proof 1.
- Proof 2.
- This is a valid proof, but not of the statement given. It is proving something else.
- Proof 3.
- Proof 4.

[🔗](#pa-logic-proofs)[🔗](#PA-logic-proofs)[🔗](#logic-proofs-intro)

### Subsection Direct Proof

The simplest style of proof is direct proof. Often all that is required to prove something is a systematic explanation of what everything means. You look at the definitions, carefully explain and *unpack* their meaning, until you see that the conclusion is true.[🔗](#sec_logic-proofs-4-3) To illustrate the importance of definitions in a proof, let’s give a few careful definitions about mini sudoku puzzles.[🔗](#sec_logic-proofs-4-4)

#### Definition 1.4.2. Mini Sudoku Definitions.

A mini sudoku puzzle is a partially filled in \(4\times 4\) grid of squares, divided into four \(2\times 2\) boxes. Each square can be empty or contain a digit from 1 to 4.[🔗](#def-mini-sudoku-3-1) We say that a mini sudoku puzzle is valid provided no digit from 1 to 4 appears more than once in any row, any column, or any box.[🔗](#def-mini-sudoku-3-2) A solution to a mini sudoku puzzle is a valid puzzle with no empty squares and every non-empty square of the puzzle unchanged.[🔗](#def-mini-sudoku-3-3) We say that a mini sudoku puzzle is solvable if there is exactly one solution.[🔗](#def-mini-sudoku-3-4) [🔗](#def-mini-sudoku)First, let’s prove a useful and “obvious” fact about any valid mini sudoku puzzle.[🔗](#sec_logic-proofs-4-6)

#### Proposition 1.4.3.

Any solution to a mini sudoku puzzle will have each digit from 1 to 4 appear exactly once in each row, in each column, and in each box, appearing a total of four times.[🔗](#prop-mini-sudoku-full-1-1) [🔗](#prop-mini-sudoku-full)That’s obvious, you say! Isn’t that exactly what a valid puzzle is? Well, a valid completed puzzle, which is what we mean by a solution, right? Okay, not exactly, since valid means that no digit repeats... isn’t that the same thing?[🔗](#sec_logic-proofs-4-8) Yes! Exactly! Saying this is a direct proof.[🔗](#sec_logic-proofs-4-9)

#### Proof.

Suppose you have a solution to a mini sudoku puzzle. That means that you have a \(4 \times 4\) grid with each square filled in with a digit from 1 to 4 that is valid. 4 Definition of solution Since the puzzle is *valid*, no digit repeats in any row, any column, or any box 5 Definition of valid . Since a row contains four numbers that do not repeat, and there are exactly four possible digits, each of those digits must appear exactly once. This is true for every row, and for every column, and for every box.[🔗](#sec_logic-proofs-4-10-1) For each digit, since it appears exactly once in four different rows, it appears exactly four times. This completes the proof.[🔗](#sec_logic-proofs-4-10-2) [🔗](#sec_logic-proofs-4-10)

#### Remark 1.4.4.

The proof contained one key mathematical idea besides just explaining definitions: If four distinct numbers are chosen from a set of four numbers, then all four numbers are chosen. Perhaps you want to also explain why this is true, or just say it is an example of the pigeonhole principle (we will say what this is soon). How much you explain depends on who you are writing the proof for. A little paranoia when writing proofs is healthy.[🔗](#sec_logic-proofs-4-11-1) Indeed, in most contexts, we wouldn’t even need to write out any of the above proof. It would probably be sufficient to say, “Clearly this follows from the definitions.” However, we are currently trying to learn how to write proofs, and it can be useful to be overly pedantic so we can focus on the proof structure and the importance of applying definitions.[🔗](#sec_logic-proofs-4-11-2) [🔗](#sec_logic-proofs-4-11)Let’s prove something about a particular sudoku puzzle.[🔗](#sec_logic-proofs-4-12)

#### Example 1.4.5.

Prove that for any solution to the mini sudoku puzzle below, if the solution has a 2 in the top-left square (r1c1), then it will contain a 2 in the bottom-right square (r4c4).[🔗](#sec_logic-proofs-4-13-1-1) ![A mini sudoku puzzle.](generated/latex-image/img-sudoku-first-proof.svg) Solution. We do not know whether the puzzle is solvable (in fact, it is not), although note that it is valid right now. What we want to prove is that *if* 2 is in the top-left square in any particular solution, *then* that solution contains a 2 in the bottom-right square.[🔗](#sec_logic-proofs-4-13-2-1)

#### Proof.

Let \(S\) be a solution to the puzzle, and assume that \(S\) contains a 2 in the top-left square. Since \(S\) is a valid puzzle, no digit repeats in any row, any column, or any box. Look first at the top row. Since the row already contains 1, 2, and 3, the remaining open square (r1c4) must be a 4.[🔗](#sec_logic-proofs-4-13-2-2-1) Now look at column 4 (the right-most column). Since we now know the top-right square is a 4, this column already contains 1, 3, and 4. So the last open square (r4c4) must be a 2.[🔗](#sec_logic-proofs-4-13-2-2-2) Thus \(S\) contains a 2 in the bottom-right square, which is what we needed to prove.[🔗](#sec_logic-proofs-4-13-2-2-3) [🔗](#sec_logic-proofs-4-13-2-2)[🔗](#sec_logic-proofs-4-13-2) [🔗](#sec_logic-proofs-4-13)Observe the general form of the argument above. We were trying to prove an implication \(P \imp Q\text{:}\) If there was a 2 in r1c1, then there was a 2 in r4c4. We started by assuming \(P\) was true. From that, we deduced something, and from that something we deduced \(Q\text{.}\) This is exactly what a direct proof of an implication \(P \imp Q\) looks like (we could have had more steps between the \(P\) and \(Q\) as well).[🔗](#sec_logic-proofs-4-14)

> Assume \(P\text{.}\) Explain, explain, …, explain. Therefore \(Q\text{.}\)[🔗](#sec_logic-proofs-4-15-1)
> > [🔗](#sec_logic-proofs-4-15)

The one additional consideration we must make is that often we are proving a general, universal statement, a statement of the form \(\forall x (P(x) \imp Q(x))\text{.}\) To handle the quantifier, we fix an *arbitrary* instance of \(x\text{.}\) Above, we said, “Let \(S\) be a solution to the puzzle.” Since we made no additional assumptions about \(S\) besides that \(P\) was true about it, we say that \(S\) was an *arbitrary* solution.[🔗](#sec_logic-proofs-4-16) If we wanted to prove that all squares are rectangles, we first realize that this is the same as saying, “For any shape, if the shape is a square, then it is a rectangle.” In symbols, \(\forall x (S(x) \imp R(x))\text{.}\) We will want to assume \(P(x)\) is true and deduce \(Q(x)\text{.}\) Which \(x\) do we use? An arbitrary one, so our proof can be applied to *all* possible \(x\text{.}\)[🔗](#sec_logic-proofs-4-17)

#### Example 1.4.6.

Prove that for any mini sudoku puzzle with three empty squares, if the puzzle has a solution, then the puzzle is solvable.[🔗](#sec_logic-proofs-4-18-1-1) Solution. Is this obvious? If a puzzle has a solution, then it is solvable, right? Not at all! Look again at the [Mini Sudoku Definitions](sec_logic-proofs.html#def-mini-sudoku): Just because a puzzle has a solution doesn’t mean that it has exactly one solution (i.e., it is solvable). But even if we don’t think this needs a proof, let’s be paranoid again and use this as an excuse to focus on the logical structure of the proof.[🔗](#sec_logic-proofs-4-18-2-1) Notice that we are proving that the claim is true no matter what mini sudoku puzzle we start with. We might start with this puzzle:[🔗](#sec_logic-proofs-4-18-2-2) ![4x4 sudoku with only one missing digit.](generated/latex-image/img-sudoku-almost-done-eg.svg) Clearly there is only one way to complete the puzzle: The top row has only one open square, so we can only put one digit in it, and then columns 2 and 3 only have one open square each, so we can fill those uniquely.[🔗](#sec_logic-proofs-4-18-2-4) Looking at a single example can often be helpful when crafting a proof, but proving a general statement with an example is *NEVER* a correct proof.[🔗](#sec_logic-proofs-4-18-2-5) While there are *only* around 152.58 billion mini sudoku puzzles (and most of those are not valid, fewer have solutions, and even fewer have exactly one empty square), we don’t really want to check all possible puzzles. So instead, we fix an arbitrary valid mini sudoku puzzle. We assume that it has a solution and has exactly three open squares. From this, we prove that there is only one possible solution.[🔗](#sec_logic-proofs-4-18-2-6)

#### Proof.

Let \(P\) be an arbitrary mini sudoku puzzle. Assume \(P\) has exactly three empty squares and that \(S\) is a solution.[🔗](#sec_logic-proofs-4-18-2-7-1) Since \(P\) is arbitrary, we don’t know how the three empty squares are arranged. They could all be in different rows, or two could be in the same row, or all three could be in the same row.[🔗](#sec_logic-proofs-4-18-2-7-2) If all the empty squares are in different rows, then in each row, there is exactly one empty square. The other three squares are filled with three different digits (since the puzzle is valid), so there is only one choice to fill the empty square. This number must be the number used in the solution \(S\text{.}\)[🔗](#sec_logic-proofs-4-18-2-7-3) Now consider the case where two of the empty squares are in the same row, and the third square is in a different row. The third empty square’s row has three different digits, so there is only one choice for the last square, and it must agree with \(S\text{.}\) Once this is filled in, the other two empty squares must be in two different columns, each of which has three filled-in digits. In each of these columns, the three filled-in digits are different, so there is only one choice for the empty square. So again, any solution must be exactly \(S\text{.}\)[🔗](#sec_logic-proofs-4-18-2-7-4) Finally, if all three empty squares are in the same row, then they are all in different columns. So using the same argument as we did when the empty squares were in different rows, but using columns instead, we see that \(S\) is the only solution.[🔗](#sec_logic-proofs-4-18-2-7-5) We have considered all possible cases, and in each case, \(S\) is the only solution, so \(P\) is solvable.[🔗](#sec_logic-proofs-4-18-2-7-6) [🔗](#sec_logic-proofs-4-18-2-7)[🔗](#sec_logic-proofs-4-18-2) [🔗](#sec_logic-proofs-4-18)Direct proof can, of course, be used to prove statements in mathematics too.[🔗](#sec_logic-proofs-4-19)

#### Example 1.4.7.

Prove: For all integers \(n\text{,}\) if \(n\) is even, then \(n^2\) is even.[🔗](#eg-logic-proofs-sqr-even-even-1-1) Solution. The format of the proof will be this: Let \(n\) be an arbitrary integer. Assume that \(n\) is even. Explain explain explain. Therefore \(n^2\) is even.[🔗](#eg-logic-proofs-sqr-even-even-2-1) To fill in the details, we explain what it means for \(n\) to be even, and then see what that means for \(n^2\text{.}\) The *definition* that is relevant here is, “An integer \(n\) is even if there is an integer \(k\) such that \(n = 2k\text{.}\)” Here is a complete proof.[🔗](#eg-logic-proofs-sqr-even-even-2-2)

#### Proof.

Let \(n\) be an arbitrary integer. Suppose \(n\) is even. Then \(n = 2k\) for some integer \(k\text{.}\) Now \(n^2 = (2k)^2 = 4k^2 = 2(2k^2)\text{.}\) Since \(2k^2\) is an integer, \(n^2\) is even.[🔗](#eg-logic-proofs-sqr-even-even-2-3-1) [🔗](#eg-logic-proofs-sqr-even-even-2-3)[🔗](#eg-logic-proofs-sqr-even-even-2) [🔗](#eg-logic-proofs-sqr-even-even)

#### Example 1.4.8.

Prove: For all integers \(a\text{,}\) \(b\text{,}\) and \(c\text{,}\) if \(b\) is a multiple of \(a\text{,}\) and \(c\) is a multiple of \(b\text{,}\) then \(c\) is a multiple of \(a\text{.}\)[🔗](#sec_logic-proofs-4-21-1-1) Solution. Even if we don’t remember exactly what “is a multiple of” means, we can set up a direct proof for this statement. It will go something like this: Let \(a\text{,}\) \(b\text{,}\) and \(c\) be arbitrary integers. Assume that \(b\) is a multiple of \(a\) and that \(c\) is a multiple of \(b\text{.}\) Dot dot dot. Therefore \(c\) is a multiple of \(a\text{.}\)[🔗](#sec_logic-proofs-4-21-2-1) How do we connect the dots? We say what our hypothesis really means and why this gives us what the conclusion really means. This is where we need the definition of \(b\) is a multiple of \(a\): This means that \(b = ka\) for some integers \(k\text{.}\) What are we going for? That \(c = la\text{,}\) for some integer \(l\text{.}\) Here is the complete proof.[🔗](#sec_logic-proofs-4-21-2-2)

#### Proof.

Let \(a\text{,}\) \(b\text{,}\) and \(c\) be integers. Assume that \(b\) is a multiple of \(a\) and that \(c\) is a multiple of \(b\text{.}\) So there are integers \(k\) and \(j\) such that \(b = ka\) and \(c = jb\text{.}\) Combining these (through substitution) we get that \begin{equation*} c = j(ka) = (jk)a\text{.} \end{equation*} But \(jk\) is an integer, so this says that \(c\) is a multiple of \(a\text{.}\) [🔗](#sec_logic-proofs-4-21-2-3-1) [🔗](#sec_logic-proofs-4-21-2-3)[🔗](#sec_logic-proofs-4-21-2) [🔗](#sec_logic-proofs-4-21)[🔗](#sec_logic-proofs-4)

### Subsection Proof by Contrapositive

Recall that an implication \(P \imp Q\) is logically equivalent to its contrapositive \(\neg Q \imp \neg P\text{.}\) There are plenty of examples of statements that are hard to prove directly, but whose contrapositive can easily be proved using a direct proof. This is all that proof by contrapositive does. It gives a direct proof of the contrapositive of the implication. This is enough because the contrapositive is logically equivalent to the original implication.[🔗](#ssec_contrapositive-proof-4) The skeleton of the proof of \(P \imp Q\) by contrapositive will always look roughly like this:[🔗](#ssec_contrapositive-proof-5)

> Assume \(\neg Q\text{.}\) Explain, explain, … explain. Therefore \(\neg P\text{.}\)[🔗](#ssec_contrapositive-proof-6-1)
> > [🔗](#ssec_contrapositive-proof-6)

As before, if there are variables and quantifiers, we set them to be arbitrary elements of our domain.[🔗](#ssec_contrapositive-proof-7)

#### Example 1.4.9.

Prove that if a mini sudoku puzzle is solvable, then it is valid.[🔗](#ssec_contrapositive-proof-8-1-1) Solution. Remember, a puzzle is valid provided no row, column, or box contains a repeated digit. A puzzle is solvable if there is exactly one solution, where a solution is a valid puzzle with no empty squares (that doesn’t change any previously filled-in square).[🔗](#ssec_contrapositive-proof-8-2-1) If we try a direct proof, we would start with an arbitrary puzzle and assume it is solvable. We could then “get” the solution, but would need to reason back in time to when the puzzle started. This seems hard. Often, when a proof seems to require breaking things apart, it is easier to try the contrapositive. That’s what we will do.[🔗](#ssec_contrapositive-proof-8-2-2)

#### Proof.

Let \(P\) be an arbitrary mini sudoku puzzle and assume that it is *not* valid. This means that in at least one row, or one column, or one box, some digit appears more than once.[🔗](#ssec_contrapositive-proof-8-2-3-1) Now suppose we have filled in the empty squares but not changed any previously filled-in squares. The original row, column, or box that contained a duplicate digit will still contain that duplication, so the resulting completed puzzle will not be valid. Thus no solution to \(P\) exists, so \(P\) is not solvable.[🔗](#ssec_contrapositive-proof-8-2-3-2) [🔗](#ssec_contrapositive-proof-8-2-3)We have proved that if a mini sudoku puzzle is not valid, then it is not solvable, which is the contrapositive of what we wanted to prove and so serves as a proof of the original statement.[🔗](#ssec_contrapositive-proof-8-2-4) [🔗](#ssec_contrapositive-proof-8-2) [🔗](#ssec_contrapositive-proof-8)Here are a couple more mathy examples.[🔗](#ssec_contrapositive-proof-9)

#### Example 1.4.10.

Is the statement, “For all integers \(n\text{,}\) if \(n^2\) is even, then \(n\) is even,” true?[🔗](#ssec_contrapositive-proof-10-1-1) Solution. This is the converse of the statement we proved in [Example 1.4.7](sec_logic-proofs.html#eg-logic-proofs-sqr-even-even) above using a direct proof. From trying a few examples, this statement appears to be true. So let’s prove it.[🔗](#ssec_contrapositive-proof-10-2-1) A direct proof of this statement would require fixing an arbitrary \(n\) and assuming that \(n^2\) is even. But it is not at all clear how this would allow us to conclude anything about \(n\text{.}\) Just because \(n^2 = 2k\) does not in itself suggest how we could write \(n\) as a multiple of 2.[🔗](#ssec_contrapositive-proof-10-2-2) Try something else: Write the contrapositive of the statement. We get, for all integers \(n\text{,}\) if \(n\) is odd, then \(n^2\) is odd. This looks much more promising.[🔗](#ssec_contrapositive-proof-10-2-3) We need a definition of a number being odd. An integer \(n\) is odd provided \(n = 2k+1\) for some integer \(k\text{.}\) Our proof will look something like this:[🔗](#ssec_contrapositive-proof-10-2-4) Let \(n\) be an arbitrary integer. Suppose that \(n\) is not even. This means that …. In other words …. But this is the same as saying …. Therefore \(n^2\) is not even.[🔗](#ssec_contrapositive-proof-10-2-5) Now we fill in the details.[🔗](#ssec_contrapositive-proof-10-2-6)

#### Proof.

We will prove the contrapositive. Let \(n\) be an arbitrary integer. Suppose that \(n\) is not even, and thus odd. Then \(n= 2k+1\) for some integer \(k\text{.}\) Now \(n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1\text{.}\) Since \(2k^2 + 2k\) is an integer, we see that \(n^2\) is odd and therefore not even.[🔗](#ssec_contrapositive-proof-10-2-7-1) [🔗](#ssec_contrapositive-proof-10-2-7)[🔗](#ssec_contrapositive-proof-10-2) [🔗](#ssec_contrapositive-proof-10)

#### Example 1.4.11.

Prove that for all integers \(a\) and \(b\text{,}\) if \(a + b\) is odd, then \(a\) is odd or \(b\) is odd.[🔗](#ssec_contrapositive-proof-11-1-1) Solution. The problem with trying a direct proof is that it will be hard to separate \(a\) and \(b\) from knowing something about \(a+b\text{.}\) On the other hand, if we know something about \(a\) and \(b\) separately, then combining them might give us information about \(a+b\text{.}\) The contrapositive of the statement we are trying to prove is: for all integers \(a\) and \(b\text{,}\) if \(a\) and \(b\) are even, then \(a+b\) is even. Thus our proof will have the following format:[🔗](#ssec_contrapositive-proof-11-2-1) Let \(a\) and \(b\) be integers. Assume that \(a\) and \(b\) are both even. la la la. Therefore \(a+b\) is even.[🔗](#ssec_contrapositive-proof-11-2-2) Here is a complete proof.[🔗](#ssec_contrapositive-proof-11-2-3)

#### Proof.

Let \(a\) and \(b\) be integers. Assume that \(a\) and \(b\) are even. Then \(a = 2k\) and \(b = 2l\) for some integers \(k\) and \(l\text{.}\) Now \(a + b = 2k + 2l = 2(k+l)\text{.}\) Since \(k + l\) is an integer, we see that \(a + b\) is even, completing the proof.[🔗](#ssec_contrapositive-proof-11-2-4-1) [🔗](#ssec_contrapositive-proof-11-2-4)Note that our assumption that \(a\) and \(b\) are even is the negation of \(a\) or \(b\) is odd. We used De Morgan’s law here.[🔗](#ssec_contrapositive-proof-11-2-5) [🔗](#ssec_contrapositive-proof-11-2) [🔗](#ssec_contrapositive-proof-11)Direct proofs and proofs by contrapositive can be used when proving *implications*. Remember that some statements that are not explicitly written as an implication can be rephrased as one.[🔗](#ssec_contrapositive-proof-12)

#### Example 1.4.12.

Consider the statement, “For every prime number \(p\text{,}\) either \(p = 2\text{,}\) or \(p\) is odd.” We can rephrase this as, “For every prime number \(p\text{,}\) if \(p \ne 2\text{,}\) then \(p\) is odd.” Now try to prove it.[🔗](#ssec_contrapositive-proof-13-1-1) Use the following as the definition of a prime number: An integer \(p \gt 1\) is prime provided it has exactly two factors, namely \(1\) and \(p\text{.}\)[🔗](#ssec_contrapositive-proof-13-1-2) Solution.

#### Proof.

Let \(p\) be an arbitrary prime number. Assume \(p\) is not odd. So \(p\) is divisible by 2. Since \(p\) is prime, it must have exactly two divisors, and it has 2 as a divisor, so \(p\) must be divisible by only 1 and 2. Therefore \(p = 2\text{.}\) This completes the proof (by contrapositive).[🔗](#ssec_contrapositive-proof-13-2-1-1) [🔗](#ssec_contrapositive-proof-13-2-1)[🔗](#ssec_contrapositive-proof-13-2) [🔗](#ssec_contrapositive-proof-13)[🔗](#ssec_contrapositive-proof)

### Subsection Proof by Contradiction

Take a step back and consider what it would mean if the conclusion of an argument were false. There are two reasons this could happen. Either the logic in the argument is faulty, or at least one assumption must be false. A proof by contradiction exploits this second possibility. We start with a single assumption and construct a *valid* proof that leads to a false conclusion; the only possibility is that the single assumption was false. The false conclusion is the “contradiction,” which just means a necessarily false statement (technically a statement of the form \(P \wedge \neg P\)).[🔗](#sec_logic-proofs-6-4) The general form of a proof by contradiction to prove a statement \(P\) is,[🔗](#sec_logic-proofs-6-5)

> Assume \(\neg P\) (that \(P\) is not true). This means that..., which tells us..., so we can say... But that is a contradiction, so \(P\) must in fact be true.[🔗](#sec_logic-proofs-6-6-1)
> > [🔗](#sec_logic-proofs-6-6)

Note that if we think of this style of argument as a direct proof of something, it is a direct proof of \begin{equation*} \neg P \imp \text{ contradiction}\text{.} \end{equation*} So we have a valid proof of this implication. How can a true implication have a false conclusion? Recall the truth table for an implication ([Figure 1.2.2](sec_logic-implications.html#fig-implication-tt)). The only row in which the implication is true but the conclusion is false is row 4, and here the hypothesis is also false. So \(\neg P\) is false, which is to say \(P\) is true. [🔗](#sec_logic-proofs-6-7) Once you start writing proofs by contradiction, it becomes very natural. Let’s see how with a sudoku proof.[🔗](#sec_logic-proofs-6-8)

#### Example 1.4.13.

Prove that any solution to the mini sudoku puzzle below must contain a 3 in the top-right corner (r1c4).[🔗](#sec_logic-proofs-6-9-1-1) ![4x4 sudoku puzzle.](generated/latex-image/sec_logic-proofs-6-9-1-2.svg) Solution. There are multiple ways we could prove this, which is often the case for proofs by contradiction. While we would always start with the same initial assumption (the opposite of what we want to prove), where the contradiction is found can vary.[🔗](#sec_logic-proofs-6-9-2-1)

#### Proof.

Let \(S\) be a solution to the puzzle, but assume that \(S\) does *not* contain a 3 in the top-right corner. Then the top row must contain a 3 somewhere else. It cannot be in column 1, since it already has a 3. It cannot be in column 2, since that square is already filled in (with the 2). It also cannot be in column 3, since if it was, there would be no place to put a three in the bottom row. So there would be no 3 in the top row, contradicting that \(S\) is a solution.[🔗](#sec_logic-proofs-6-9-2-2-1) Therefore \(S\) must contain a 3 in the top-right corner.[🔗](#sec_logic-proofs-6-9-2-2-2) [🔗](#sec_logic-proofs-6-9-2-2)[🔗](#sec_logic-proofs-6-9-2) [🔗](#sec_logic-proofs-6-9)

#### Example 1.4.14.

Prove that there is no solution to the sudoku puzzle below.[🔗](#sec_logic-proofs-6-10-1-1) ![A mini sudoku puzzle](generated/latex-image/img-sudoku-counterexample.svg) Solution. Look at the logical format of this statement: \begin{equation*} \neg \exists S (S \text{ is a solution })\text{.} \end{equation*} Using the rules for negation of quantifiers, this is the same as \begin{equation*} \forall S (S \text{ is not a solution})\text{.} \end{equation*} If we were to prove this directly, we would need to consider all possible solutions and show that they are not valid. That seems quite challenging. [🔗](#sec_logic-proofs-6-10-2-1) On the other hand, if we try a proof by contradiction, we get to assume the negation of the statement we are asked to prove. That is, we can assume that there *is* a solution. That is a single solution we can reason about. Much more manageable.[🔗](#sec_logic-proofs-6-10-2-2)

#### Proof.

Suppose, for the sake of contradiction, that there *does* exist a solution to the puzzle. This solution must have a 4 in the bottom-left box. But the only squares that can hold a 4 are either in row 4 or column 1 (or both). In either case, this contradicts that there is a 4 already in column 1 and row 4.[🔗](#sec_logic-proofs-6-10-2-3-1) [🔗](#sec_logic-proofs-6-10-2-3)[🔗](#sec_logic-proofs-6-10-2) [🔗](#sec_logic-proofs-6-10)Here are three examples of proofs by contradiction about numbers:[🔗](#sec_logic-proofs-6-11)

#### Example 1.4.15.

Prove that \(\sqrt{2}\) is irrational.[🔗](#sec_logic-proofs-6-12-1-1) Solution.

#### Proof.

Suppose not. Then \(\sqrt 2\) is equal to a fraction \(\frac{a}{b}\text{.}\) Without loss of generality, assume \(\frac{a}{b}\) is in lowest terms (otherwise reduce the fraction). So, \begin{equation*} 2 = \frac{a^2}{b^2} \end{equation*} \begin{equation*} 2b^2 = a^2\text{.} \end{equation*} [🔗](#sec_logic-proofs-6-12-2-1-1) Thus \(a^2\) is even, and as such \(a\) is even. So \(a = 2k\) for some integer \(k\text{,}\) and \(a^2 = 4k^2\text{.}\) We then have, \begin{equation*} 2b^2 = 4k^2 \end{equation*} \begin{equation*} b^2 = 2k^2\text{.} \end{equation*} [🔗](#sec_logic-proofs-6-12-2-1-2) Thus \(b^2\) is even, and as such \(b\) is even. Since \(a\) is also even, we see that \(\frac{a}{b}\) is not in lowest terms, a contradiction. Thus \(\sqrt 2\) is irrational.[🔗](#sec_logic-proofs-6-12-2-1-3) [🔗](#sec_logic-proofs-6-12-2-1)[🔗](#sec_logic-proofs-6-12-2) [🔗](#sec_logic-proofs-6-12)

#### Example 1.4.16.

Prove: There are no integers \(x\) and \(y\) such that \(x^2 = 4y + 2\text{.}\)[🔗](#sec_logic-proofs-6-13-1-1) Solution.

#### Proof.

We proceed by contradiction. So suppose there *are* integers \(x\) and \(y\) such that \(x^2 = 4y + 2 = 2(2y + 1)\text{.}\) So \(x^2\) is even. We have seen that this implies that \(x\) is even. So \(x = 2k\) for some integer \(k\text{.}\) Then \(x^2 = 4k^2\text{.}\) This in turn gives \(2k^2 = (2y + 1)\text{.}\) But \(2k^2\) is even, and \(2y + 1\) is odd, so these cannot be equal. Thus we have a contradiction, so there must not be any integers \(x\) and \(y\) such that \(x^2 = 4y + 2\text{.}\)[🔗](#sec_logic-proofs-6-13-2-1-1) [🔗](#sec_logic-proofs-6-13-2-1)[🔗](#sec_logic-proofs-6-13-2) [🔗](#sec_logic-proofs-6-13)

#### Example 1.4.17.

The Pigeonhole Principle: If more than \(n\) pigeons fly into \(n\) pigeonholes, then at least one pigeonhole will contain at least two pigeons. Prove this![🔗](#sec_logic-proofs-6-14-1-1) Solution.

#### Proof.

Suppose, contrary to stipulation, that each of the pigeonholes contains at most one pigeon. Then at most, there will be \(n\) pigeons. But we assumed that there are more than \(n\) pigeons, so this is impossible. Thus there must be a pigeonhole with more than one pigeon.[🔗](#sec_logic-proofs-6-14-2-1-1) [🔗](#sec_logic-proofs-6-14-2-1)While we phrased this proof as a proof by contradiction, we could have also used a proof by contrapositive since our contradiction was simply the negation of the hypothesis. Sometimes this will happen, in which case you can use either style of proof. There are examples, however, where the contradiction occurs “far away” from the original statement.[🔗](#sec_logic-proofs-6-14-2-2) [🔗](#sec_logic-proofs-6-14-2) [🔗](#sec_logic-proofs-6-14)[🔗](#sec_logic-proofs-6)

### Subsection Summary of Proof Styles

We have considered three styles of proof: direct proof, proof by contrapositive, and proof by contradiction. It can be challenging to decide which style of proof to use on a given problem, and no rule will always tell us what to do. Often, there are multiple ways you can proceed in a proof, which is one reason math is so exciting.[🔗](#subsec-summary-of-proof-styles-2) A good starting point when writing proofs is to consider what the initial assumption would be with each style, and what the conclusion you would be looking for is. A proof is a little like a kids-menu maze. There is a *START* and an *EXIT*, and your goal is to find your way from one to the other. Sometimes it helps to work your way in from both sides and hopefully meet in the middle.[🔗](#subsec-summary-of-proof-styles-3)

#### Starts and Ends Proofs.

To prove an implication \(P \imp Q\text{:}\) Direct[🔗](#assemblage-proof-start-end-2-2-1) Start: Assume \(P\text{.}\)[🔗](#assemblage-proof-start-end-2-2-1-2) End: Therefore \(Q\text{.}\)[🔗](#assemblage-proof-start-end-2-2-1-3) Contrapositive[🔗](#assemblage-proof-start-end-2-2-2) Start: Assume \(\neg Q\text{.}\)[🔗](#assemblage-proof-start-end-2-2-2-2) End: Therefore \(\neg P\text{.}\)[🔗](#assemblage-proof-start-end-2-2-2-3) Contradiction[🔗](#assemblage-proof-start-end-2-2-3) Start: Assume \(\neg (P \imp Q)\text{.}\)[🔗](#assemblage-proof-start-end-2-2-3-2) End: ...which is a contradiction.[🔗](#assemblage-proof-start-end-2-2-3-3) [🔗](#assemblage-proof-start-end-2) [🔗](#assemblage-proof-start-end)You can use a proof by contradiction even if you are not trying to prove an implication, but if the statement is an implication, then assuming \(\neg (P \imp Q)\) is really powerful. Remember, the only way for an implication to be false is for \(P\) to be true and \(Q\) to be false. So we are actually assuming \(P \wedge \neg Q\text{.}\) Aha! \(P\) is what we assume in a direct proof. \(\neg Q\) is what we assume in a proof by contrapositive. So a *proof by contradiction is like doing the other two proofs at the same time, and meeting in the middle!*[🔗](#subsec-summary-of-proof-styles-5) To illustrate this, let’s prove the fact from the *Investigate!* activity. We will prove that if a mini sudoku puzzle has all different numbers in its corners (marked with \(a\) through \(d\) below), then the center four squares (marked with * below) must also contain different numbers (in any solution).[🔗](#subsec-summary-of-proof-styles-6) ![4x4 sudoku with given digits.](generated/latex-image/img-sudoku-invst-thm-2.svg) We will give three proofs, first a direct proof, then a proof by contrapositive, and finally a proof by contradiction.[🔗](#subsec-summary-of-proof-styles-8)

#### Proof.

Let \(P\) be a sudoku puzzle with all different numbers in its corners: \(a\) in the top-left, \(b\) in the top-right, \(c\) in the bottom-left, and \(d\) in the bottom-right. Let \(S\) be any solution to the puzzle.[🔗](#subsec-summary-of-proof-styles-9-1) In \(S\text{,}\) whatever digit \(a\) is must appear in row 2. Since \(a\) is already in the top-left box, it cannot appear in columns 1 or 2, so it must appear in columns 3 or 4. If it is in column 3, then \(a\) appears in one of the center squares. If not, then it is in column 4. In this latter case, we ask where \(a\) appears in row 3: It cannot be in column 1 or 4, so it must be in column 2 or 3, and thus in one of the center squares.[🔗](#subsec-summary-of-proof-styles-9-2) The same argument can now be applied to each of the other three outer squares. Thus, in any solution to the puzzle, the center four squares must contain the digits \(a\) through \(d\text{,}\) all different.[🔗](#subsec-summary-of-proof-styles-9-3) [🔗](#subsec-summary-of-proof-styles-9)Now we will prove the same statement by contrapositive.[🔗](#subsec-summary-of-proof-styles-10)

#### Proof.

Let \(P\) be a mini sudoku puzzle with numbers in its corners. Let \(S\) be any solution to the puzzle. Assume that the center four squares do not contain all different numbers in \(S\text{.}\) Then there must be some common number, say \(n\text{,}\) in two of the center squares.[🔗](#subsec-summary-of-proof-styles-11-1) Since \(n\) cannot appear twice in a row, it must be that \(n\) is in two center squares diagonally from each other: either in r2c2 and r3c3, or in r2c3 and r3c2. In either case, where could \(n\) be in rows 1 and 4? It cannot be in columns 2 or 3, so it must be in columns 1 and 4. This means that \(n\) will be in opposite outer corners, meaning that the digits in the four corners are not all different.[🔗](#subsec-summary-of-proof-styles-11-2) [🔗](#subsec-summary-of-proof-styles-11)Finally, we will prove the same statement by contradiction.[🔗](#subsec-summary-of-proof-styles-12)

#### Proof.

Let \(P\) be a mini sudoku puzzle and assume that the four outer corners are all different, but in some solution \(S\text{,}\) the center four squares are not all different.[🔗](#subsec-summary-of-proof-styles-13-1) Suppose \(a\text{,}\) the digit in the top-left corner, appears twice in the center four squares. The only way this can happen is if \(a\) appears in r3c2 and r2c3, as shown below.[🔗](#subsec-summary-of-proof-styles-13-2) ![a partially filled mini sudoku.](generated/latex-image/subsec-summary-of-proof-styles-13-3.svg) But now, where can the fourth \(a\) in the go in the solution? It must be in r4c4, contradicting that the four corners are all different. An analogous argument leads to a contradiction for each of the other possible outer corner digits being repeated in the center. Thus, the center four squares must contain all different numbers.[🔗](#subsec-summary-of-proof-styles-13-4) [🔗](#subsec-summary-of-proof-styles-13)[🔗](#subsec-summary-of-proof-styles)

### Reading Questions Reading Questions

#### 1.

Which of the following would be the best first line of a *direct proof* if you wanted to prove the statement, “For all sets \(A\) of single-digit numbers, if \(|A| = 6\text{,}\) then \(A\) contains an even number.”[🔗](#rq-logic-proofs-direct-1-1)

- Suppose there exists a set \(A\) of single-digit numbers with \(|A| = 6\) but that contains only odd numbers.
- Incorrect. A direct proof starts by assuming the hypothesis of the implication you wish to prove. Try again.
- Fix an arbitrary set \(A\) of single-digit numbers, and assume \(|A| = 6\text{.}\)
- Correct! A direct proof starts by assuming the hypothesis of the implication you wish to prove.
- Suppose \(A\) is a set of single-digit numbers with \(|A| \ne 6\text{.}\)
- Incorrect. What is the “if” part of the statement you are trying to prove? Try again.
- Let \(A\) be a set of single-digit numbers that contains an even number.
- Incorrect. Try again.
- Let \(A\) be a set of single-digit numbers, and assume that \(A\) does not contain any even numbers.
- Incorrect. Try again.

[🔗](#rq-logic-proofs-direct)

#### 2.

Which of the following would be the best first line of a *proof by contrapositive* if you wanted to prove the statement, “For all sets \(A\) of single-digit numbers, if \(|A| = 6\text{,}\) then \(A\) contains an even number.”[🔗](#rq-logic-proof-contrapositive-1-1)

- Suppose there exists a set \(A\) of single-digit numbers with \(|A| = 6\) but that contains only odd numbers.
- Incorrect. What is the contrapositive of what we are trying to prove? Try again.
- Fix an arbitrary set \(A\) of single-digit numbers, and assume \(|A| = 6\text{.}\)
- Incorrect. We are trying to prove the contrapositive, so assume the if part of the contrapositive. Try again.
- Suppose \(A\) is a set of single-digit numbers with \(|A| \ne 6\text{.}\)
- Incorrect. The contrapositive of \(P \imp Q\) is \(\neg Q \imp \neg P\text{.}\) Proofs by contrapositive should start by assuming \(\neg Q\text{.}\) Try again.
- Let \(A\) be a set of single-digit numbers that contains an even number.
- Incorrect. The contrapositive of \(P \imp Q\) is \(\neg Q \imp \neg P\text{.}\) Proofs by contrapositive should start by assuming \(\neg Q\text{.}\) Try again.
- Let \(A\) be a set of single-digit numbers, and assume that \(A\) does not contain any even numbers.
- Correct!

[🔗](#rq-logic-proof-contrapositive)

#### 3.

Which of the following would be the best first line of a *proof by contradiction* if you wanted to prove the statement, “For all sets \(A\) of single-digit numbers, if \(|A| = 6\text{,}\) then \(A\) contains an even number.”[🔗](#rq-logic-proof-contradiction-1-1)

- Suppose there exists a set \(A\) of single-digit numbers with \(|A| = 6\) but that contains only odd numbers.
- Correct! This is the negation of the statement we are trying to prove.
- Fix an arbitrary set \(A\) of single-digit numbers, and assume \(|A| = 6\text{.}\)
- Incorrect. A proof by contradiction should start by assuming the negation of what we are trying to prove. Try again.
- Suppose \(A\) is a set of single-digit numbers with \(|A| \ne 6\text{.}\)
- Incorrect. A proof by contradiction should start by assuming the negation of what we are trying to prove. Try again.
- Let \(A\) be a set of single-digit numbers that contains an even number.
- Incorrect. A proof by contradiction should start by assuming the negation of what we are trying to prove. Try again.
- Let \(A\) be a set of single-digit numbers, and assume that \(A\) does not contain any even numbers.
- Incorrect. A proof by contradiction should start by assuming the negation of what we are trying to prove. Try again.

[🔗](#rq-logic-proof-contradiction)

#### 4.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-logic-proof-q-1-1) [🔗](#rq-logic-proof-q)[🔗](#rqs-logic-proof)

### Exercises Practice Problems

#### 1.

Arrange some of the statements below to form a correct proof of the following statement: “For any integer \(n\text{,}\) if \(n\) is even, then \(7n\) is even.”[🔗](#proofs-xe-7xe-1-1)

```natural
Let \(n\) be an arbitrary integer, and assume \(n\) is even.
---
Since the product of any number with an even number is even,
---

\(7n\) must be even.
---
Let \(n\) be an arbitrary integer, and assume \(7n\) is even. #distractor
---
Let \(n\) be an arbitrary integer, and assume \(7n\) is odd. #distractor
---
Since \(7\) is odd and the product of an odd number and an odd number is odd, #distractor
---
Since an even number divided by \(7\) must be odd, #distractor
---

\(n\) must be even. #distractor
---

\(7n\) must be odd. #distractor
```

[🔗](#proofs-xe-7xe)

#### 2.

Arrange some of the statements below to form a correct proof of the following statement: “For any integer \(n\text{,}\) if \(7n\) is even, then \(n\) is even.”[🔗](#proofs-7xe-xe-1-1)

```natural
Let \(n\) be an arbitrary integer, and assume \(n\) is even. #distractor
---
Since the \(7\) is odd and the product of an odd number with an even number is even, #distractor
---

\(7n\) must be even. #distractor
---
Let \(n\) be an arbitrary integer, and assume \(7n\) is even. #distractor
---
Let \(n\) be an arbitrary integer, and assume \(n\) is odd.
---
Since \(7\) is odd and the product of an odd number and an odd number is odd,
---
Since an even number divided by \(7\) must be even, #distractor
---

\(n\) must be even. #distractor
---

\(7n\) must be odd.
```

[🔗](#proofs-7xe-xe)

#### 3.

Consider the statement, “For any numbers \(a\) and \(b\text{,}\) if \(a+b\) is odd, then either \(a\) or \(b\) is odd”.[🔗](#proofs-odd-contrapositive-1-1) Give a valid proof of the statement using a *proof by contrapositive*. Arrange some statements below to complete the proof.[🔗](#proofs-odd-contrapositive-1-2)

```natural
Let \(a\) and \(b\) be integers, and assume that \(a+b\) is odd. #distractor
---
Let \(a\) and \(b\) be integers, and assume that if \(a+b\) is odd, then either \(a\) or \(b\) is odd. #distractor
---
Let \(a\) and \(b\) be integers, and assume both are even.
---
The sum of two even integers must also be even.
---
Therefore \(a+b\) is even.
---
Let \(a\) and \(b\) be integers and assume that \(a+b\) is odd but \(a\) and \(b\) are both even. #distractor
---
The sum of two odd integers must be even. #distractor
---
But then \(a+b\) is both even and odd, a contradiction. #distractor
```

[🔗](#proofs-odd-contrapositive)

#### 4.

Consider the same statement, “For any numbers \(a\) and \(b\text{,}\) if \(a+b\) is odd, then either \(a\) or \(b\) is odd.”[🔗](#proofs-odd-contradiction-1-1) Give a valid proof of the statement, this time using a *proof by contradiction* using some of the statements below.[🔗](#proofs-odd-contradiction-1-2)

```natural
Let \(a\) and \(b\) be integers, and assume that \(a+b\) is odd. #distractor
---
Let \(a\) and \(b\) be integers, and assume that if \(a+b\) is odd, then either \(a\) or \(b\) is odd. #distractor
---
Let \(a\) and \(b\) be integers, and assume both are even. #distractor
---
Let \(a\) and \(b\) be integers, and assume that \(a+b\) is odd but \(a\) and \(b\) are both even.
---
Therefore \(a+b\) is even. #distractor
---
The sum of two even integers must also be even.
---
The sum of two odd integers must be even. #distractor
---
But then \(a+b\) is both even and odd, a contradiction.
```

[🔗](#proofs-odd-contradiction)

#### 5.

Activate Below are three statements together with a possible first line of a proof of that statement. In each case, say whether the first line is the start of a direct proof, a proof by contrapositive, or a proof by contradiction.[🔗](#extracted-webwork-20-1-1-1)

1. *Statement:* For any triangle, the sum of the interior angles is 180 degrees.[🔗](#extracted-webwork-20-1-1-2-1-1-1) *First line:* Consider a plane figure and assume that the sum of the interior angles is not 180 degrees.[🔗](#extracted-webwork-20-1-1-2-1-1-2) [🔗](#extracted-webwork-20-1-1-2-1-1)
2. *Statement:* If a shape is a pentagon, then its interior angles add up to 480 degrees.[🔗](#extracted-webwork-20-1-1-2-1-2-1) *First line:* Consider an arbitrary shape, and assume it is a pentagon.[🔗](#extracted-webwork-20-1-1-2-1-2-2) [🔗](#extracted-webwork-20-1-1-2-1-2)
3. *Statement:* For any triangle, the sum of the interior angles is 180 degrees.[🔗](#extracted-webwork-20-1-1-2-1-3-1) *First line:* Suppose there is a triangle with a sum of interior angles not equal to 180 degrees[🔗](#extracted-webwork-20-1-1-2-1-3-2) [🔗](#extracted-webwork-20-1-1-2-1-3)

[🔗](#extracted-webwork-20-1-1-2) [🔗](#ww-proofs-firstline)

#### 6.

- Assume \(f: A \to B\) is a bijection
- Direct proof
- Assume \(|A| \ne |B|\)
- Proof by contrapositive
- Assume \(f: A \to B\) is a bijection and \(|A|\ne|B|\)
- Proof by contradiction

[🔗](#matching-proof-firstline)[🔗](#practice_logic-proofs)

### Exercises Additional Exercises

#### 1.

For a given predicate \(P(x)\text{,}\) you might believe that the statements \(\forall x P(x)\) or \(\exists x P(x)\) are either true or false. How would you decide if you were correct in each case? You have four choices: You could give an example of an element \(n\) in the domain for which \(P(n)\) is true or for which \(P(n)\) is false, or you could argue that no matter what \(n\) is, \(P(n)\) is true or is false.

1. What would you need to do to prove \(\forall x P(x)\) is true?[🔗](#exercises_logic-proofs-2-1-1-9-1-1) [🔗](#exercises_logic-proofs-2-1-1-9-1)
2. What would you need to do to prove \(\forall x P(x)\) is false?[🔗](#exercises_logic-proofs-2-1-1-9-2-1) [🔗](#exercises_logic-proofs-2-1-1-9-2)
3. What would you need to do to prove \(\exists x P(x)\) is true?[🔗](#exercises_logic-proofs-2-1-1-9-3-1) [🔗](#exercises_logic-proofs-2-1-1-9-3)
4. What would you need to do to prove \(\exists x P(x)\) is false?[🔗](#exercises_logic-proofs-2-1-1-9-4-1) [🔗](#exercises_logic-proofs-2-1-1-9-4)

[🔗](#exercises_logic-proofs-2-1-1) [🔗](#exercises_logic-proofs-2)

#### 2.

Consider the statement, “For all integers \(a\) and \(b\text{,}\) if \(a + b\) is even, then \(a\) and \(b\) are even.”

1. Write the contrapositive of the statement.[🔗](#exercises_logic-proofs-3-1-1-2-1-1) [🔗](#exercises_logic-proofs-3-1-1-2-1)
2. Write the converse of the statement.[🔗](#exercises_logic-proofs-3-1-1-2-2-1) [🔗](#exercises_logic-proofs-3-1-1-2-2)
3. Write the negation of the statement.[🔗](#exercises_logic-proofs-3-1-1-2-3-1) [🔗](#exercises_logic-proofs-3-1-1-2-3)
4. Is the original statement true or false? Prove your answer.[🔗](#exercises_logic-proofs-3-1-1-2-4-1) [🔗](#exercises_logic-proofs-3-1-1-2-4)
5. Is the contrapositive of the original statement true or false? Prove your answer.[🔗](#exercises_logic-proofs-3-1-1-2-5-1) [🔗](#exercises_logic-proofs-3-1-1-2-5)
6. Is the converse of the original statement true or false? Prove your answer.[🔗](#exercises_logic-proofs-3-1-1-2-6-1) [🔗](#exercises_logic-proofs-3-1-1-2-6)
7. Is the negation of the original statement true or false? Prove your answer.[🔗](#exercises_logic-proofs-3-1-1-2-7-1) [🔗](#exercises_logic-proofs-3-1-1-2-7)

[🔗](#exercises_logic-proofs-3-1-1) [🔗](#exercises_logic-proofs-3)

#### 3.

For each of the statements below, say what method of proof you should use to prove them. Then say how the proof starts and how it ends. Bonus points for filling in the middle.

1. There are no integers \(x\) and \(y\) such that \(x\) is a prime greater than 5 and \(x = 6y + 3\text{.}\)[🔗](#exercises_logic-proofs-4-1-1-1-1-1) [🔗](#exercises_logic-proofs-4-1-1-1-1)
2. For all integers \(n\text{,}\) if \(n\) is a multiple of 3, then \(n\) can be written as the sum of consecutive integers.[🔗](#exercises_logic-proofs-4-1-1-1-2-1) [🔗](#exercises_logic-proofs-4-1-1-1-2)
3. For all integers \(a\) and \(b\text{,}\) if \(a^2 + b^2\) is odd, then \(a\) or \(b\) is odd.[🔗](#exercises_logic-proofs-4-1-1-1-3-1) [🔗](#exercises_logic-proofs-4-1-1-1-3)

[🔗](#exercises_logic-proofs-4-1-1) [🔗](#exercises_logic-proofs-4)

#### 4.

Consider the statement, “For all integers \(n\text{,}\) if \(n\) is even then \(8n\) is even.”

1. Prove the statement. What sort of proof are you using?[🔗](#exercises_logic-proofs-5-1-1-2-1-1) [🔗](#exercises_logic-proofs-5-1-1-2-1)
2. Is the converse true? Prove or disprove.[🔗](#exercises_logic-proofs-5-1-1-2-2-1) [🔗](#exercises_logic-proofs-5-1-1-2-2)

[🔗](#exercises_logic-proofs-5-1-1) [🔗](#exercises_logic-proofs-5)

#### 5.

The game TENZI comes with 40 six-sided dice (each numbered 1 to 6). Suppose you roll all 40 dice.

1. Prove that there will be at least seven dice that land on the same number. [🔗](#exercises_logic-proofs-6-1-1-1-1)
2. How many dice would you have to roll before you were guaranteed that some four of them would all match or all be different? Prove your answer.[🔗](#exercises_logic-proofs-6-1-1-1-2-1) [🔗](#exercises_logic-proofs-6-1-1-1-2)

[🔗](#exercises_logic-proofs-6-1-1) [🔗](#exercises_logic-proofs-6)

#### 6.

Prove that for all integers \(n\text{,}\) it is the case that \(n\) is even if and only if \(3n\) is even. That is, prove both implications: If \(n\) is even, then \(3n\) is even, and if \(3n\) is even, then \(n\) is even.[🔗](#exercises_logic-proofs-7-1-1) Hint. One of the implications will be a direct proof; the other will be a proof by contrapositive.[🔗](#exercises_logic-proofs-7-2-1) [🔗](#exercises_logic-proofs-7-2) [🔗](#exercises_logic-proofs-7)

#### 7.

Prove that \(\sqrt 3\) is irrational.[🔗](#exercises_logic-proofs-8-1-1) Hint. This is really an exercise in modifying the proof that \(\sqrt{2}\) is irrational. There you proved things were even; here they will be multiples of 3.[🔗](#exercises_logic-proofs-8-2-1) [🔗](#exercises_logic-proofs-8-2) [🔗](#exercises_logic-proofs-8)

#### 8.

Consider the statement, “For all integers \(a\) and \(b\text{,}\) if \(a\) is even and \(b\) is a multiple of 3, then \(ab\) is a multiple of 6.”

1. Prove the statement. What sort of proof are you using?[🔗](#exercises_logic-proofs-9-1-1-2-1-1) [🔗](#exercises_logic-proofs-9-1-1-2-1)
2. State the converse. Is it true? Prove or disprove.[🔗](#exercises_logic-proofs-9-1-1-2-2-1) [🔗](#exercises_logic-proofs-9-1-1-2-2)

[🔗](#exercises_logic-proofs-9-1-1) Hint. Part (a) should be a relatively easy direct proof. Look for a counterexample for part (b).[🔗](#exercises_logic-proofs-9-2-1) [🔗](#exercises_logic-proofs-9-2) [🔗](#exercises_logic-proofs-9)

#### 9.

Prove the statement, “For all integers \(n\text{,}\) if \(5n\) is odd, then \(n\) is odd.” Clearly state the style of proof you are using.[🔗](#exercises_logic-proofs-10-1-1) [🔗](#exercises_logic-proofs-10)

#### 10.

Prove the statement, “For all integers \(a\text{,}\) \(b\text{,}\) and \(c\text{,}\) if \(a^2 + b^2 = c^2\text{,}\) then \(a\) or \(b\) is even.”[🔗](#exercises_logic-proofs-11-1-1) Hint. A proof by contradiction would be reasonable here, because then you get to assume that both \(a\) *and* \(b\) are odd. Deduce that \(c^2\) is even, and therefore a multiple of 4 (why? and why is that a contradiction?).[🔗](#exercises_logic-proofs-11-2-1) [🔗](#exercises_logic-proofs-11-2) [🔗](#exercises_logic-proofs-11)

#### 11.

Suppose that you would like to prove the following implication:[🔗](#exercises_logic-proofs-12-2-1)

> For all numbers \(n\text{,}\) if \(n\) is prime then \(n\) is solitary.[🔗](#exercises_logic-proofs-12-2-2-1)
> > [🔗](#exercises_logic-proofs-12-2-2)

Write out the beginning and end of the argument if you were to prove the statement,

1. Directly[🔗](#exercises_logic-proofs-12-2-3-1-1-1) [🔗](#exercises_logic-proofs-12-2-3-1-1)
2. By contrapositive[🔗](#exercises_logic-proofs-12-2-3-1-2-1) [🔗](#exercises_logic-proofs-12-2-3-1-2)
3. By contradiction[🔗](#exercises_logic-proofs-12-2-3-1-3-1) [🔗](#exercises_logic-proofs-12-2-3-1-3)

[🔗](#exercises_logic-proofs-12-2-3) You do not need to provide the middle parts of the proofs (since you do not know what solitary means). However, make sure that you give the first few and last few lines of the proofs so that we can see the logical structure you would follow.[🔗](#exercises_logic-proofs-12-2-4) [🔗](#exercises_logic-proofs-12)

#### 12.

Suppose you have a collection of rare 5-cent stamps and 8-cent stamps. You desperately need to mail a letter and, having no other stamps available, decide to dip into your collection. The question is, what amounts of postage can you make?

1. Prove that if you only use an even number of both types of stamps, the amount of postage you make must be even.[🔗](#exercises_logic-proofs-13-1-1-1-1-1) [🔗](#exercises_logic-proofs-13-1-1-1-1)
2. Suppose you made an even amount of postage. Prove that you used an even number of at least one of the types of stamps.[🔗](#exercises_logic-proofs-13-1-1-1-2-1) [🔗](#exercises_logic-proofs-13-1-1-1-2)
3. Suppose you made exactly 72 cents of postage. Prove that you used at least 6 of at least one type of stamp.[🔗](#exercises_logic-proofs-13-1-1-1-3-1) [🔗](#exercises_logic-proofs-13-1-1-1-3)

[🔗](#exercises_logic-proofs-13-1-1) Hint. Use a different style of proof for each part.[🔗](#exercises_logic-proofs-13-2-1) [🔗](#exercises_logic-proofs-13-2) [🔗](#exercises_logic-proofs-13)

#### 13.

Prove: \(x=y\) if and only if \(xy=\dfrac{(x+y)^2}{4}\text{.}\) Note, you will need to prove two “directions” here, the “if” and the “only if” part.[🔗](#exercises_logic-proofs-14-1-1) [🔗](#exercises_logic-proofs-14)

#### 14.

Prove that \(\log(7)\) is irrational.[🔗](#exercises_logic-proofs-15-1-1) Hint. Note that if \(\log(7) = \frac{a}{b}\text{,}\) then \(7 = 10^\frac{a}{b}\text{.}\) Can any power of 7 be the same as a power of 10?[🔗](#exercises_logic-proofs-15-2-1) [🔗](#exercises_logic-proofs-15-2) [🔗](#exercises_logic-proofs-15)

#### 15.

Prove that there are no integer solutions to the equation \(x^2 = 4y + 3\text{.}\)[🔗](#exercises_logic-proofs-16-1-1) Hint. What if there were? Deduce that \(x\) must be odd, and continue towards a contradiction.[🔗](#exercises_logic-proofs-16-2-1) [🔗](#exercises_logic-proofs-16-2) [🔗](#exercises_logic-proofs-16)

#### 16.

Prove that every prime number greater than 3 is either one more or one less than a multiple of 6.[🔗](#exercises_logic-proofs-17-2-1) Hint. Prove the contrapositive by cases. There will be 4 cases to consider.[🔗](#exercises_logic-proofs-17-3-1) [🔗](#exercises_logic-proofs-17-3) [🔗](#exercises_logic-proofs-17)

#### 17.

Your “friend” has shown you a “proof” he wrote to show that \(1 = 3\text{.}\) Here is the proof:[🔗](#exercises_logic-proofs-18-1-1)

#### Proof.

I claim that \(1 = 3\text{.}\) Of course we can do anything to one side of an equation as long as we also do it to the other side. So subtract 2 from both sides. This gives \(-1 = 1\text{.}\) Now square both sides, to get \(1 = 1\text{.}\) And we all agree this is true.[🔗](#exercises_logic-proofs-18-1-2-1) [🔗](#exercises_logic-proofs-18-1-2) What is going on here? Is your friend’s argument valid? Is the argument a proof of the claim \(1=3\text{?}\) Carefully explain using what we know about logic.[🔗](#exercises_logic-proofs-18-1-3) Hint. Your friend’s proof is a proof, but of what? What implication follows from the given proof? Is that helpful?[🔗](#exercises_logic-proofs-18-2-1) [🔗](#exercises_logic-proofs-18-2) [🔗](#exercises_logic-proofs-18)

#### 18.

A standard deck of 52 cards consists of 4 suits (hearts, diamonds, spades, and clubs) each containing 13 different values (Ace, 2, 3, …, 10, J, Q, K). If you draw some number of cards at random, you might or might not have a pair (two cards with the same value) or three cards all of the same suit. However, if you draw enough cards, you will be guaranteed to have these. For each of the following, find the smallest number of cards you would need to draw to be guaranteed having the specified cards. Prove your answers.

1. Three of a kind (for example, three 7’s).[🔗](#exercises_logic-proofs-19-2-1-2-1-1) [🔗](#exercises_logic-proofs-19-2-1-2-1)
2. A flush of five cards (for example, five hearts).[🔗](#exercises_logic-proofs-19-2-1-2-2-1) [🔗](#exercises_logic-proofs-19-2-1-2-2)
3. Three cards that are either all the same suit or all different suits.[🔗](#exercises_logic-proofs-19-2-1-2-3-1) [🔗](#exercises_logic-proofs-19-2-1-2-3)

[🔗](#exercises_logic-proofs-19-2-1) [🔗](#exercises_logic-proofs-19)

#### 19.

Suppose you are at a party with 19 of your closest friends (so including you, there are 20 people there). Explain why there must be at least two people at the party who are friends with the same number of people at the party. Assume friendship is always reciprocated.[🔗](#exercises_logic-proofs-20-1-1) Hint. Consider the set of *numbers* of friends that everyone has. If everyone had a different number of friends, this set must contain 20 elements. Is that possible? Why not?[🔗](#exercises_logic-proofs-20-2-1) [🔗](#exercises_logic-proofs-20-2) [🔗](#exercises_logic-proofs-20)

#### 20.

Your friend has given you his list of 115 best Doctor Who episodes (in order of greatness). It turns out that you have seen 60 of them. Prove that there are at least two episodes you have seen that are exactly four episodes apart on your friend’s list.[🔗](#exercises_logic-proofs-21-2-1) Hint. This feels like the pigeonhole principle, although a bit more complicated. At least, you could try to replicate the style of proof used by the pigeonhole principle. How would the episodes need to be spaced out so that no two of your sixty were exactly 4 apart?[🔗](#exercises_logic-proofs-21-3-1) [🔗](#exercises_logic-proofs-21-3) [🔗](#exercises_logic-proofs-21)

#### 21.

Suppose you have an \(n\times n\) chessboard, but your dog has eaten one of the corner squares. You have dominoes that each cover exactly two squares of the board. Can you cover the remaining squares on the board with non-overlapping dominoes? What needs to be true about \(n\text{?}\) Give necessary and sufficient conditions (that is, say exactly which values of \(n\) work and which do not work). Prove your answers.[🔗](#exercises_logic-proofs-22-2-1) ![An 8 by 8 chessboard with the top-right corner square removed. Every other square is shaded darker (checkerboard pattern).](generated/latex-image/checkerboard-minus-1.svg) [🔗](#exercises_logic-proofs-22)

#### 22.

What if your \(n\times n\) chessboard is missing two opposite corners? Prove that no matter what \(n\) is, you will not be able to cover the remaining squares with non-overlapping dominoes.[🔗](#exercises_logic-proofs-23-2-1) ![An 8 by 8 chessboard with the top-right and bottom-left corner squares removed. Every other square is shaded darker (checkerboard pattern).](generated/latex-image/checkerboard-minus-2.svg) [🔗](#exercises_logic-proofs-23)[🔗](#exercises_logic-proofs)[🔗](#sec_logic-proofs) [&#xe5cb;Prev](sec_logic-rules.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_logic-structures.html) [Feedback](/cdn-cgi/l/email-protection#79160a1a180b57151c0f1017390c171a16571c1d0c)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_logic-proofs-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_logic-proofs-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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
