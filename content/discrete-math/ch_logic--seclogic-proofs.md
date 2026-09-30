---
title: "Proofs"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_logic-proofs.html
---

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
