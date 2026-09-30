---
title: "Implications"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_logic-implications.html
---

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
