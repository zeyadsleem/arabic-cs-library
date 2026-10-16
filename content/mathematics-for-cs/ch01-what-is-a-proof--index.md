---
title: "What is a Proof?"
lang: en
---

## 1 What is a Proof?

### 1.1 Propositions
```
            Definition. A proposition is a statement (communication) that is either true or
```
```
            false.
```
```

              For example, both of the following statements are propositions. The first is true,
```
```
            and the second is false.
```
```

            Proposition 1.1.1. 2 + 3 = 5.
```
```

            Proposition 1.1.2. 1 + 1 = 3.
```
```

               Being true or false doesn’t sound like much of a limitation, but it does exclude
```
```
            statements such as “Wherefore art thou Romeo?” and “Give me an A!” It also ex-
```
```
            cludes statements whose truth varies with circumstance such as, “It’s five o’clock,”
```
```
            or “the stock market will rise tomorrow.”
```
```
               Unfortunately it is not always easy to decide if a claimed proposition is true or
```
```
            false:
```
```

            Claim 1.1.3. For every nonnegative integer n the value of n2 C n C 41 is prime.
```
```

              (A prime is an integer greater than 1 that is not divisible by any other integer
```
```
            greater than 1. For example, 2, 3, 5, 7, 11, are the first five primes.) Let’s try some
```
```
            numerical experimentation to check this proposition. Let
```
```

                                                p.n/ WWD n2 C n C 41:1                                   (1.1)
```
```
            We begin with p.0/ D 41, which is prime; then
```
```

                              p.1/ D 43; p.2/ D 47; p.3/ D 53; : : : ; p.20/ D 461
```
```

            are each prime. Hmmm, starts to look like a plausible claim. In fact we can keep
```
```
            checking through n D 39 and confirm that p.39/ D 1601 is prime.
```
```
               But p.40/ D 402 C 40 C 41 D 41  41, which is not prime. So Claim 1.1.3
```
```
            is false since it’s not true that p.n/ is prime for all nonnegative integers n. In
```
```
            fact, it’s not hard to show that no polynomial with integer coefficients can map all
```
```
               1 The symbol WWD means “equal by definition.” It’s always ok simply to write “=” instead of WWD,
```
```

            but reminding the reader that an equality holds by definition can be helpful.
```
```
            

## 6 Chapter 1   What is a Proof?
```
```

    nonnegative numbers into prime numbers, unless it’s a constant (see Problem 1.25).
```
```
    But this example highlights the point that, in general, you can’t check a claim about
```
```
    an infinite set by checking a finite sample of its elements, no matter how large the
```
```
    sample.
```
```
       By the way, propositions like this about all numbers or all items of some kind are
```
```
    so common that there is a special notation for them. With this notation, Claim 1.1.3
```
```
    would be
```
```
                                   8n 2 N: p.n/ is prime:                            (1.2)
```
```
    Here the symbol 8 is read “for all.” The symbol N stands for the set of nonnegative
```
```
    integers: 0, 1, 2, 3, . . . (ask your instructor for the complete list). The symbol “2”
```
```
    is read as “is a member of,” or “belongs to,” or simply as “is in.” The period after
```
```
    the N is just a separator between phrases.
```
```
       Here are two even more extreme examples:
```
```
    Conjecture. [Euler] The equation
```
```

                                          a4 C b 4 C c 4 D d 4
```
```

    has no solution when a; b; c; d are positive integers.
```
```
      Euler (pronounced “oiler”) conjectured this in 1769. But the conjecture was
```
```
    proved false 218 years later by Noam Elkies at a liberal arts school up Mass Ave.
```
```
    The solution he found was a D 95800; b D 217519; c D 414560; d D 422481.
```
```
      In logical notation, Euler’s Conjecture could be written,
```
```

                8a 2 ZC 8b 2 ZC 8c 2 ZC 8d 2 ZC : a4 C b 4 C c 4 ¤ d 4 :
```
```

    Here, ZC is a symbol for the positive integers. Strings of 8’s like this are usually
```
```
    abbreviated for easier reading:
```
```

                              8a; b; c; d 2 ZC : a4 C b 4 C c 4 ¤ d 4 :
```
```

      Here’s another claim which would be hard to falsify by sampling: the smallest
```
```
    possible x; y; z that satisfy the equality each have more than 1000 digits!
```
```
    False Claim. 313.x 3 C y 3 / D z 3 has no solution when x; y; z 2 ZC .
```
```
      It’s worth mentioning a couple of further famous propositions whose proofs were
```
```
    sought for centuries before finally being discovered:
```
```
    Proposition 1.1.4 (Four Color Theorem). Every map can be colored with 4 colors
```
```
    so that adjacent2 regions have different colors.
```
```
       2 Two regions are adjacent only when they share a boundary segment of positive length. They are
```
```

    not considered to be adjacent if their boundaries meet only at a few points.
```
```
         

1.1. Propositions                                                                                      7
```
```

   Several incorrect proofs of this theorem have been published, including one that
```
stood for 10 years in the late 19th century before its mistake was found. A laborious
proof was finally found in 1976 by mathematicians Appel and Haken, who used a
complex computer program to categorize the four-colorable maps. The program
left a few thousand maps uncategorized, which were checked by hand by Haken
and his assistants—among them his 15-year-old daughter.
   There was reason to doubt whether this was a legitimate proof—the proof was
too big to be checked without a computer. No one could guarantee that the com-
puter calculated correctly, nor was anyone enthusiastic about exerting the effort
to recheck the four-colorings of thousands of maps that were done by hand. Two
decades later a mostly intelligible proof of the Four Color Theorem was found,
though a computer is still needed to check four-colorability of several hundred spe-
cial maps.3

Proposition 1.1.5 (Fermat’s Last Theorem). There are no positive integers x, y
and z such that
```
                                xn C yn D zn
```
for some integer n > 2.
```

   In a book he was reading around 1630, Fermat claimed to have a proof for this
```
proposition, but not enough space in the margin to write it down. Over the years,
the Theorem was proved to hold for all n up to 4,000,000, but we’ve seen that this
shouldn’t necessarily inspire confidence that it holds for all n. There is, after all,
a clear resemblance between Fermat’s Last Theorem and Euler’s false Conjecture.
Finally, in 1994, British mathematician Andrew Wiles gave a proof, after seven
years of working in secrecy and isolation in his attic. His proof did not fit in any
margin.4
   Finally, let’s mention another simply stated proposition whose truth remains un-
known.

Conjecture 1.1.6 (Goldbach). Every even integer greater than 2 is the sum of two
primes.

  Goldbach’s Conjecture dates back to 1742. It is known to hold for all numbers
up to 1018 , but to this day, no one knows whether it’s true or false.
```
    3 The story of the proof of the Four Color Theorem is told in a well-reviewed popular (non-
```

technical) book: “Four Colors Suffice. How the Map Problem was Solved.” Robin Wilson. Princeton
Univ. Press, 2003, 276pp. ISBN 0-691-11533-8.
```
    4 In fact, Wiles’ original proof was wrong, but he and several collaborators used his ideas to arrive
```

at a correct proof a year later. This story is the subject of the popular book, Fermat’s Enigma by
Simon Singh, Walker & Company, November, 1997.
```
                   

## 8 Chapter 1   What is a Proof?
```
```

               For a computer scientist, some of the most important things to prove are the
```
```
            correctness of programs and systems—whether a program or system does what it’s
```
```
            supposed to. Programs are notoriously buggy, and there’s a growing community
```
```
            of researchers and practitioners trying to find ways to prove program correctness.
```
```
            These efforts have been successful enough in the case of CPU chips that they are
```
```
            now routinely used by leading chip manufacturers to prove chip correctness and
```
```
            avoid some notorious past mistakes.
```
```
               Developing mathematical methods to verify programs and systems remains an
```
```
            active research area. We’ll illustrate some of these methods in Chapter 5.
```

### 1.2 Predicates
```
            A predicate can be understood as a proposition whose truth depends on the value
```
```
            of one or more variables. So “n is a perfect square” describes a predicate, since you
```
```
            can’t say if it’s true or false until you know what the value of the variable n happens
```
```
            to be. Once you know, for example, that n equals 4, the predicate becomes the true
```
```
            proposition “4 is a perfect square”. Remember, nothing says that the proposition
```
```
            has to be true: if the value of n were 5, you would get the false proposition “5 is a
```
```
            perfect square.”
```
```
               Like other propositions, predicates are often named with a letter. Furthermore, a
```
```
            function-like notation is used to denote a predicate supplied with specific variable
```
```
            values. For example, we might use the name “P ” for predicate above:
```
```

                                           P .n/ WWD “n is a perfect square”;
```
```

            and repeat the remarks above by asserting that P .4/ is true, and P .5/ is false.
```
```
               This notation for predicates is confusingly similar to ordinary function notation.
```
```
            If P is a predicate, then P .n/ is either true or false, depending on the value of n.
```
```
            On the other hand, if p is an ordinary function, like n2 C1, then p.n/ is a numerical
```
```
            quantity. Don’t confuse these two!
```

### 1.3 The Axiomatic Method
```
            The standard procedure for establishing truth in mathematics was invented by Eu-
```
```
            clid, a mathematician working in Alexandria, Egypt around 300 BC. His idea was
```
```
            to begin with five assumptions about geometry, which seemed undeniable based on
```
```
            direct experience. (For example, “There is a straight line segment between every
```
```
                  

           1.4. Our Axioms                                                                     9
```
```

           pair of points”.) Propositions like these that are simply accepted as true are called
```
```
           axioms.
```
```
              Starting from these axioms, Euclid established the truth of many additional propo-
```
```
           sitions by providing “proofs.” A proof is a sequence of logical deductions from
```
```
           axioms and previously proved statements that concludes with the proposition in
```
```
           question. You probably wrote many proofs in high school geometry class, and
```
```
           you’ll see a lot more in this text.
```
```
              There are several common terms for a proposition that has been proved. The
```
```
           different terms hint at the role of the proposition within a larger body of work.
```
```
               Important true propositions are called theorems.
```
```
               A lemma is a preliminary proposition useful for proving later propositions.
```
```
               A corollary is a proposition that follows in just a few logical steps from a
```
```
                theorem.
```
```
           These definitions are not precise. In fact, sometimes a good lemma turns out to be
```
```
           far more important than the theorem it was originally used to prove.
```
```
              Euclid’s axiom-and-proof approach, now called the axiomatic method, remains
```
```
           the foundation for mathematics today. In fact, just a handful of axioms, called the
```
```
           Zermelo-Fraenkel with Choice axioms (ZFC), together with a few logical deduction
```
```
           rules, appear to be sufficient to derive essentially all of mathematics. We’ll examine
```
```
           these in Chapter 8.
```

### 1.4 Our Axioms
```
           The ZFC axioms are important in studying and justifying the foundations of math-
```
```
           ematics, but for practical purposes, they are much too primitive. Proving theorems
```
```
           in ZFC is a little like writing programs in byte code instead of a full-fledged pro-
```
```
           gramming language—by one reckoning, a formal proof in ZFC that 2 C 2 D 4
```
```
           requires more than 20,000 steps! So instead of starting with ZFC, we’re going to
```
```
           take a huge set of axioms as our foundation: we’ll accept all familiar facts from
```
```
           high school math.
```
```
              This will give us a quick launch, but you may find this imprecise specification
```
```
           of the axioms troubling at times. For example, in the midst of a proof, you may
```
```
           start to wonder, “Must I prove this little fact or can I take it as an axiom?” There
```
```
           really is no absolute answer, since what’s reasonable to assume and what requires
```
```
           proof depends on the circumstances and the audience. A good general guideline is
```
```
           simply to be up front about what you’re assuming.
```
```
             

## 10 Chapter 1   What is a Proof?
```
```

     1.4.1    Logical Deductions
```
```
     Logical deductions, or inference rules, are used to prove new propositions using
```
```
     previously proved ones.
```
```
       A fundamental inference rule is modus ponens. This rule says that a proof of P
```
```
     together with a proof that P IMPLIES Q is a proof of Q.
```
```
       Inference rules are sometimes written in a funny notation. For example, modus
```
```
     ponens is written:
```
```

     Rule.
```
```
                                         P;     P IMPLIES Q
```
```
                                                   Q
```
```
        When the statements above the line, called the antecedents, are proved, then we
```
```
     can consider the statement below the line, called the conclusion or consequent, to
```
```
     also be proved.
```
```
        A key requirement of an inference rule is that it must be sound: an assignment
```
```
     of truth values to the letters P , Q, . . . , that makes all the antecedents true must
```
```
     also make the consequent true. So if we start off with true axioms and apply sound
```
```
     inference rules, everything we prove will also be true.
```
```
        There are many other natural, sound inference rules, for example:
```
```

     Rule.
```
```
                                    P IMPLIES Q; Q IMPLIES R
```
```
                                           P IMPLIES R
```
```
     Rule.
```
```
                                      NOT .P / IMPLIES NOT .Q/
```
```
                                              Q IMPLIES P
```
```
       On the other hand,
```
```

     Non-Rule.
```
```
                                      NOT .P / IMPLIES NOT .Q/
```
```
                                              P IMPLIES Q
```
```
     is not sound: if P is assigned T and Q is assigned F, then the antecedent is true
```
```
     and the consequent is not.
```
```
        As with axioms, we will not be too formal about the set of legal inference rules.
```
```
     Each step in a proof should be clear and “logical”; in particular, you should state
```
```
     what previously proved facts are used to derive each new conclusion.
```
```
                    

            1.5. Proving an Implication                                                        11
```
```

            1.4.2    Patterns of Proof
```
```
            In principle, a proof can be any sequence of logical deductions from axioms and
```
```
            previously proved statements that concludes with the proposition in question. This
```
```
            freedom in constructing a proof can seem overwhelming at first. How do you even
```
```
            start a proof?
```
```
               Here’s the good news: many proofs follow one of a handful of standard tem-
```
```
            plates. Each proof has it own details, of course, but these templates at least provide
```
```
            you with an outline to fill in. We’ll go through several of these standard patterns,
```
```
            pointing out the basic idea and common pitfalls and giving some examples. Many
```
```
            of these templates fit together; one may give you a top-level outline while others
```
```
            help you at the next level of detail. And we’ll show you other, more sophisticated
```
```
            proof techniques later on.
```
```
               The recipes below are very specific at times, telling you exactly which words to
```
```
            write down on your piece of paper. You’re certainly free to say things your own
```
```
            way instead; we’re just giving you something you could say so that you’re never at
```
```
            a complete loss.
```

### 1.5 Proving an Implication
```
            Propositions of the form “If P , then Q” are called implications. This implication
```
```
            is often rephrased as “P IMPLIES Q.”
```
```
               Here are some examples:
```
```
                 (Quadratic Formula) If ax 2 C bx C c D 0 and a ¤ 0, then
```
```
                                                   p         
```
```
                                        xD      b ˙ b 2 4ac =2a:
```
```

                 (Goldbach’s Conjecture 1.1.6 rephrased) If n is an even integer greater than
```
```
                  2, then n is a sum of two primes.
```
```
                 If 0  x  2, then x 3 C 4x C 1 > 0.
```
```
            There are a couple of standard methods for proving an implication.
```
```

            1.5.1    Method #1
```
```
            In order to prove that P IMPLIES Q:
```
```
               1. Write, “Assume P .”
```
```
               2. Show that Q logically follows.
```
```
            

## 12 Chapter 1   What is a Proof?
```
```

     Example
```
```
     Theorem 1.5.1. If 0  x  2, then x 3 C 4x C 1 > 0.
```
```
        Before we write a proof of this theorem, we have to do some scratchwork to
```
```
     figure out why it is true.
```
```
        The inequality certainly holds for x D 0; then the left side is equal to 1 and
```
```
     1 > 0. As x grows, the 4x term (which is positive) initially seems to have greater
```
```
     magnitude than x 3 (which is negative). For example, when x D 1, we have
```
```
     4x D 4, but x 3 D 1 only. In fact, it looks like x 3 doesn’t begin to dominate
```
```
     until x > 2. So it seems the x 3 C 4x part should be nonnegative for all x between
```
```
     0 and 2, which would imply that x 3 C 4x C 1 is positive.
```
```
        So far, so good. But we still have to replace all those “seems like” phrases with
```
```
     solid, logical arguments. We can get a better handle on the critical x 3 C 4x part
```
```
     by factoring it, which is not too hard:
```
```

                                    x 3 C 4x D x.2   x/.2 C x/
```
```

     Aha! For x between 0 and 2, all of the terms on the right side are nonnegative. And
```
```
     a product of nonnegative terms is also nonnegative. Let’s organize this blizzard of
```
```
     observations into a clean proof.
```
```

     Proof. Assume 0  x  2. Then x, 2 x and 2Cx are all nonnegative. Therefore,
```
```
     the product of these terms is also nonnegative. Adding 1 to this product gives a
```
```
     positive number, so:
```
```
                                 x.2 x/.2 C x/ C 1 > 0
```
```
     Multiplying out on the left side proves that
```
```

                                         x 3 C 4x C 1 > 0
```
```

     as claimed.                                                                      
```
```

       There are a couple points here that apply to all proofs:
```
```
          You’ll often need to do some scratchwork while you’re trying to figure out
```
```
           the logical steps of a proof. Your scratchwork can be as disorganized as you
```
```
           like—full of dead-ends, strange diagrams, obscene words, whatever. But
```
```
           keep your scratchwork separate from your final proof, which should be clear
```
```
           and concise.
```
```

          Proofs typically begin with the word “Proof” and end with some sort of de-
```
```
           limiter like  or “QED.” The only purpose for these conventions is to clarify
```
```
           where proofs begin and end.
```
```
                    

            1.6. Proving an “If and Only If”                                                   13
```
```

            1.5.2     Method #2 - Prove the Contrapositive
```
```
            An implication (“P IMPLIES Q”) is logically equivalent to its contrapositive
```
```
                                           NOT .Q/ IMPLIES NOT .P / :
```
```

            Proving one is as good as proving the other, and proving the contrapositive is some-
```
```
            times easier than proving the original statement. If so, then you can proceed as
```
```
            follows:
```
```
               1. Write, “We prove the contrapositive:” and then state the contrapositive.
```
```
               2. Proceed as in Method #1.
```
```

            Example
```
```
                                                      p
```
```
            Theorem 1.5.2. If r is irrational, then       r is also irrational.
```
```
               A number is rational when it equals a quotient of integers —that is, if it equals
```
```
            m=n for some integers m and n. If it’s not rational, then it’s called irrational. So
```
```
                                                                     p
```
```
            we must show that if r is not a ratio of integers, then r is also not a ratio of
```
```
            integers. That’s pretty convoluted! We can eliminate both not’s and simplify the
```
```
            proof by using the contrapositive instead.
```
```
                                                    p
```
```
            Proof. We prove the contrapositive: if r is rational, then r is rational.
```
```
                            p
```
```
               Assume that r is rational. Then there exist integers m and n such that:
```
```
                                                 p       m
```
```
                                                   rD
```
```
                                                         n
```
```
            Squaring both sides gives:
```
```
                                                       m2
```
```
                                                  rD 2
```
```
                                                       n
```
```
                    2       2
```
```
            Since m and n are integers, r is also rational.                                   
```

### 1.6 Proving an “If and Only If”
```
            Many mathematical theorems assert that two statements are logically equivalent;
```
```
            that is, one holds if and only if the other does. Here is an example that has been
```
```
            known for several thousand years:
```
```
                    Two triangles have the same side lengths if and only if two side lengths
```
```
                    and the angle between those sides are the same.
```
```
              The phrase “if and only if” comes up so often that it is often abbreviated “iff.”
```
```
             

## 14 Chapter 1   What is a Proof?
```
```

     1.6.1    Method #1: Prove Each Statement Implies the Other
```
```
     The statement “P IFF Q” is equivalent to the two statements “P IMPLIES Q” and
```
```
     “Q IMPLIES P .” So you can prove an “iff” by proving two implications:
```
```
        1. Write, “We prove P implies Q and vice-versa.”
```
```
        2. Write, “First, we show P implies Q.” Do this by one of the methods in
```
```
           Section 1.5.
```
```
        3. Write, “Now, we show Q implies P .” Again, do this by one of the methods
```
```
           in Section 1.5.
```
```

     1.6.2    Method #2: Construct a Chain of Iffs
```
```
     In order to prove that P is true iff Q is true:
```
```
        1. Write, “We construct a chain of if-and-only-if implications.”
```
```
        2. Prove P is equivalent to a second statement which is equivalent to a third
```
```
           statement and so forth until you reach Q.
```
```
     This method sometimes requires more ingenuity than the first, but the result can be
```
```
     a short, elegant proof.
```
```

     Example
```
```
     The standard deviation of a sequence of values x1 ; x2 ; : : : ; xn is defined to be:
```
```
                      s
```
```
                         .x1 /2 C .x2 /2 C    C .xn /2
```
```
                                                                                         (1.3)
```
```
                                              n
```
```
     where  is the average or mean of the values:
```
```
                                          x1 C x2 C    C xn
```
```
                                     WWD
```
```
                                                  n
```
```
     Theorem 1.6.1. The standard deviation of a sequence of values x1 ; : : : ; xn is zero
```
```
     iff all the values are equal to the mean.
```
```
       For example, the standard deviation of test scores is zero if and only if everyone
```
```
     scored exactly the class average.
```
```

     Proof. We construct a chain of “iff” implications, starting with the statement that
```
```
     the standard deviation (1.3) is zero:
```
```
                    s
```
```
                       .x1 /2 C .x2 /2 C    C .xn /2
```
```
                                                                   D 0:            (1.4)
```
```
                                           n
```
```
                   

            1.7. Proof by Cases                                                                               15
```
```

            Now since zero is the only number whose square root is zero, equation (1.4) holds
```
```
            iff
```
```
                            .x1 /2 C .x2 /2 C    C .xn /2 D 0:                     (1.5)
```
```
            Squares of real numbers are always nonnegative, so every term on the left-hand
```
```
            side of equation (1.5) is nonnegative. This means that (1.5) holds iff
```
```

                                  Every term on the left-hand side of (1.5) is zero.                       (1.6)
```
```

            But a term .xi        /2 is zero iff xi D , so (1.6) is true iff
```
```

                                              Every xi equals the mean.
```
```

                                                                                                              
```

### 1.7 Proof by Cases
```
            Breaking a complicated proof into cases and proving each case separately is a com-
```
```
            mon, useful proof strategy. Here’s an amusing example.
```
```
               Let’s agree that given any two people, either they have met or not. If every pair
```
```
            of people in a group has met, we’ll call the group a club. If every pair of people in
```
```
            a group has not met, we’ll call it a group of strangers.
```
```
            Theorem. Every collection of 6 people includes a club of 3 people or a group of 3
```
```
            strangers.
```
```
            Proof. The proof is by case analysis5 . Let x denote one of the six people. There
```
```
            are two cases:
```
```

               1. Among 5 other people besides x, at least 3 have met x.
```
```

               2. Among the 5 other people, at least 3 have not met x.
```
```

              Now, we have to be sure that at least one of these two cases must hold,6 but that’s
```
```
            easy: we’ve split the 5 people into two groups, those who have shaken hands with
```
```
            x and those who have not, so one of the groups must have at least half the people.
```
```
              Case 1: Suppose that at least 3 people did meet x.
```
```
              This case splits into two subcases:
```
```
               5 Describing your approach at the outset helps orient the reader.
```
```
                6 Part of a case analysis argument is showing that you’ve covered all the cases. This is often
```
```

            obvious, because the two cases are of the form “P ” and “not P .” However, the situation above is not
```
```
            stated quite so simply.
```
```
                   

## 16 Chapter 1   What is a Proof?
```
```

                  Case 1.1: No pair among those people met each other. Then these
```
```
                  people are a group of at least 3 strangers. The theorem holds in this
```
```
                  subcase.
```
```
                  Case 1.2: Some pair among those people have met each other. Then
```
```
                  that pair, together with x, form a club of 3 people. So the theorem
```
```
                  holds in this subcase.
```
```

            This implies that the theorem holds in Case 1.
```
```
              Case 2: Suppose that at least 3 people did not meet x.
```
```
              This case also splits into two subcases:
```
```

                  Case 2.1: Every pair among those people met each other. Then these
```
```
                  people are a club of at least 3 people. So the theorem holds in this
```
```
                  subcase.
```
```
                  Case 2.2: Some pair among those people have not met each other.
```
```
                  Then that pair, together with x, form a group of at least 3 strangers. So
```
```
                  the theorem holds in this subcase.
```
```

            This implies that the theorem also holds in Case 2, and therefore holds in all cases.
```
```
                                                                                               
```

### 1.8 Proof by Contradiction
```
            In a proof by contradiction, or indirect proof, you show that if a proposition were
```
```
            false, then some false fact would be true. Since a false fact by definition can’t be
```
```
            true, the proposition must be true.
```
```
               Proof by contradiction is always a viable approach. However, as the name sug-
```
```
            gests, indirect proofs can be a little convoluted, so direct proofs are generally prefer-
```
```
            able when they are available.
```
```
               Method: In order to prove a proposition P by contradiction:
```
```

               1. Write, “We use proof by contradiction.”
```
```

               2. Write, “Suppose P is false.”
```
```

               3. Deduce something known to be false (a logical contradiction).
```
```

               4. Write, “This is a contradiction. Therefore, P must be true.”
```
```
                   

            1.9. Good Proofs in Practice                                                        17
```
```

            Example
```
```
                                                   p
```
```
            We’ll prove by contradiction that 2 is irrational. Remember that a number is ra-
```
```
            tional if it is equal to a ratio of integers—for example, 3:5 D 7=2 and 0:1111    D
```
```
            1=9 are rational numbers.
```
```
                                p
```
```
            Theorem 1.8.1. 2 is irrational.
```
```
                                                                                       p
```
```
            Proof. We use proof byp      contradiction. Suppose the claim is false, and 2 is ratio-
```
```
            nal. Then we can write 2 as a fraction n=d in lowest terms.
```
```
               Squaring both sides gives 2 D n2 =d 2 and so 2d 2 D n2 . This implies that n is a
```
```
            multiple of 2 (see Problems 1.14 and 1.15). Therefore n2 must be a multiple of 4.
```
```
            But since 2d 2 D n2 , we know 2d 2 is a multiple of 4 and so d 2 is a multiple of 2.
```
```
            This implies that d is a multiple of 2.
```
```
               So, the numerator and denominator havep     2 as a common factor, which contradicts
```
```
            the fact that n=d is in lowest terms. Thus, 2 must be irrational.                    
```

### 1.9 Good Proofs in Practice
```
            One purpose of a proof is to establish the truth of an assertion with absolute cer-
```
```
            tainty, and mechanically checkable proofs of enormous length or complexity can
```
```
            accomplish this. But humanly intelligible proofs are the only ones that help some-
```
```
            one understand the subject. Mathematicians generally agree that important mathe-
```
```
            matical results can’t be fully understood until their proofs are understood. That is
```
```
            why proofs are an important part of the curriculum.
```
```
               To be understandable and helpful, more is required of a proof than just logical
```
```
            correctness: a good proof must also be clear. Correctness and clarity usually go
```
```
            together; a well-written proof is more likely to be a correct proof, since mistakes
```
```
            are harder to hide.
```
```
               In practice, the notion of proof is a moving target. Proofs in a professional
```
```
            research journal are generally unintelligible to all but a few experts who know all
```
```
            the terminology and prior results used in the proof. Conversely, proofs in the first
```
```
            weeks of a beginning course like 6.042 would be regarded as tediously long-winded
```
```
            by a professional mathematician. In fact, what we accept as a good proof later in
```
```
            the term will be different from what we consider good proofs in the first couple
```
```
            of weeks of 6.042. But even so, we can offer some general tips on writing good
```
```
            proofs:
```
```

            State your game plan. A good proof begins by explaining the general line of rea-
```
```
                  soning, for example, “We use case analysis” or “We argue by contradiction.”
```
```
            

## 18 Chapter 1   What is a Proof?
```
```

     Keep a linear flow. Sometimes proofs are written like mathematical mosaics, with
```
```
          juicy tidbits of independent reasoning sprinkled throughout. This is not good.
```
```
          The steps of an argument should follow one another in an intelligible order.
```
```

     A proof is an essay, not a calculation. Many students initially write proofs the way
```
```
          they compute integrals. The result is a long sequence of expressions without
```
```
          explanation, making it very hard to follow. This is bad. A good proof usually
```
```
          looks like an essay with some equations thrown in. Use complete sentences.
```
```

     Avoid excessive symbolism. Your reader is probably good at understanding words,
```
```
          but much less skilled at reading arcane mathematical symbols. Use words
```
```
          where you reasonably can.
```
```

     Revise and simplify. Your readers will be grateful.
```
```

     Introduce notation thoughtfully. Sometimes an argument can be greatly simpli-
```
```
           fied by introducing a variable, devising a special notation, or defining a new
```
```
           term. But do this sparingly, since you’re requiring the reader to remember
```
```
           all that new stuff. And remember to actually define the meanings of new
```
```
           variables, terms, or notations; don’t just start using them!
```
```

     Structure long proofs. Long programs are usually broken into a hierarchy of smaller
```
```
           procedures. Long proofs are much the same. When your proof needed facts
```
```
           that are easily stated, but not readily proved, those fact are best pulled out
```
```
           as preliminary lemmas. Also, if you are repeating essentially the same argu-
```
```
           ment over and over, try to capture that argument in a general lemma, which
```
```
           you can cite repeatedly instead.
```
```

     Be wary of the “obvious.” When familiar or truly obvious facts are needed in a
```
```
          proof, it’s OK to label them as such and to not prove them. But remember
```
```
          that what’s obvious to you may not be—and typically is not—obvious to
```
```
          your reader.
```
```
           Most especially, don’t use phrases like “clearly” or “obviously” in an attempt
```
```
           to bully the reader into accepting something you’re having trouble proving.
```
```
           Also, go on the alert whenever you see one of these phrases in someone else’s
```
```
           proof.
```
```

     Finish. At some point in a proof, you’ll have established all the essential facts
```
```
           you need. Resist the temptation to quit and leave the reader to draw the
```
```
           “obvious” conclusion. Instead, tie everything together yourself and explain
```
```
           why the original claim follows.
```
```
                  

           1.10. References                                                                     19
```
```

              Creating a good proof is a lot like creating a beautiful work of art. In fact,
```
```
           mathematicians often refer to really good proofs as being “elegant” or “beautiful.”
```
```
           It takes a practice and experience to write proofs that merit such praises, but to
```
```
           get you started in the right direction, we will provide templates for the most useful
```
```
           proof techniques.
```
```
              Throughout the text there are also examples of bogus proofs—arguments that
```
```
           look like proofs but aren’t. Sometimes a bogus proof can reach false conclusions
```
```
           because of missteps or mistaken assumptions. More subtle bogus proofs reach
```
```
           correct conclusions, but do so in improper ways such as circular reasoning, leaping
```
```
           to unjustified conclusions, or saying that the hard part of the proof is “left to the
```
```
           reader.” Learning to spot the flaws in improper proofs will hone your skills at seeing
```
```
           how each proof step follows logically from prior steps. It will also enable you to
```
```
           spot flaws in your own proofs.
```
```
              The analogy between good proofs and good programs extends beyond structure.
```
```
           The same rigorous thinking needed for proofs is essential in the design of criti-
```
```
           cal computer systems. When algorithms and protocols only “mostly work” due
```
```
           to reliance on hand-waving arguments, the results can range from problematic to
```
```
           catastrophic. An early example was the Therac 25, a machine that provided radia-
```
```
           tion therapy to cancer victims, but occasionally killed them with massive overdoses
```
```
           due to a software race condition. A further example of a dozen years ago (August
```
```
           2004) involved a single faulty command to a computer system used by United and
```
```
           American Airlines that grounded the entire fleet of both companies—and all their
```
```
           passengers!
```
```
              It is a certainty that we’ll all one day be at the mercy of critical computer systems
```
```
           designed by you and your classmates. So we really hope that you’ll develop the
```
```
           ability to formulate rock-solid logical arguments that a system actually does what
```
```
           you think it should do!
```

### 1.10 References
```
           [14], [1], [49], [18], [22]
```
```
                  

## 20 Chapter 1   What is a Proof?
```

Problems for Section 1.1
```
           Class Problems
```
```
           Problem 1.1.
```
```
           The Pythagorean Theorem says that if a and b are the lengths of the sides of a right
```
```
           triangle, and c is the length of its hypotenuse, then
```
```

                                                 a2 C b 2 D c 2 :
```
```

           This theorem is so fundamental and familiar that we generally take it for granted.
```
```
           But just being familiar doesn’t justify calling it “obvious”—witness the fact that
```
```
           people have felt the need to devise different proofs of it for milllenia.7 In this
```
```
           problem we’ll examine a particularly simple “proof without words” of the theorem.
```
```
              Here’s the strategy. Suppose you are given four different colored copies of a
```
```
           right triangle with sides of lengths a, b and c, along with a suitably sized square,
```
```
           as shown in Figure 1.1.
```
```

                               b          c
```
```

                                      a
```
```

                                   Figure 1.1 Right triangles and square.
```
```

            (a) You will first arrange the square and four triangles so they form a c  c square.
```
```
           From this arrangement you will see that the square is .b a/  .b a/.
```
```

            (b) You will then arrange the same shapes so they form two squares, one a  a
```
```
           and the other b  b.
```
```
              7 Over a hundred different proofs are listed on the mathematics website http://www.cut-the-
```
```

           knot.org/pythagoras/.
```
```
       

1.10. References                                                                           21
```

  You know that the area of an s  s square is s 2 . So appealing to the principle that
```

                           Area is Preserved by Rearranging,
```

you can now conclude that a2 C b 2 D c 2 , as claimed.
  This really is an elegant and convincing proof of the Pythagorean Theorem, but it
has some worrisome features. One concern is that there might be something special
about the shape of these particular triangles and square that makes the rearranging
possible—for example, suppose a D b?
 (c) How would you respond to this concern?

 (d) Another concern is that a number of facts about right triangles, squares and
lines are being implicitly assumed in justifying the rearrangements into squares.
Enumerate some of these assumed facts.

Problem 1.2.
What’s going on here?!
```
                   p   p           p p    p 2
```
```
             1D     1 D . 1/. 1/ D   1 1D    1 D                              1:
```

(a) Precisely identify and explain the mistake(s) in this bogus proof.

(b) Prove (correctly) that if 1 D       1, then 2 D 1.

 (c) Every positive real number r has two square roots, one positive and the other
```
                                                         p
```
negative. The standard convention is that the expression r refers to the positive
square root of r. Assuming familiar properties of multiplication of real numbers,
prove that for positive real numbers r and s,
```
                                  p       p p
```
```
                                    rs D r s:                                (1.7)
```

Problem 1.3.
Identify exactly where the bugs are in each of the following bogus proofs.8
(a) Bogus Claim: 1=8 > 1=4:
   8 From [48], Twenty Years Before the Blackboard by Michael Stueben and Diane Sandford
```
            

## 22 Chapter 1   What is a Proof?
```
```

     Bogus proof.
```
```

                                                3>2
```
```
                                    3 log10 .1=2/ > 2 log10 .1=2/
```
```
                                    log10 .1=2/3 > log10 .1=2/2
```
```
                                         .1=2/3 > .1=2/2 ;
```
```

     and the claim now follows by the rules for multiplying fractions.               
```
```

     (b) Bogus proof : 1¢ D $0:01 D .$0:1/2 D .10¢/2 D 100¢ D $1: 
```
```

      (c) Bogus Claim: If a and b are two equal real numbers, then a D 0.
```
```

     Bogus proof.
```
```

                                                  aDb
```
```
                                                 a2 D ab
```
```
                                           a2    b 2 D ab    b2
```
```
                                    .a   b/.a C b/ D .a      b/b
```
```
                                              aCb Db
```
```
                                                  a D 0:
```
```

                                                                                     
```
```

     Problem 1.4.
```
```
     It’s a fact that the Arithmetic Mean is at least as large as the Geometric Mean,
```
```
     namely,
```
```
                                        aCb p
```
```
                                                ab
```
```
                                           2
```
```
     for all nonnegative real numbers a and b. But there’s something objectionable
```
```
     about the following proof of this fact. What’s the objection, and how would you fix
```
```
     it?
```
```
                  

           1.10. References                                                                    23
```
```

           Bogus proof.
```
```
                                    aCb ‹ p
```
```
                                           ab;                                     so
```
```
                                      2
```
```
                                          ‹ p
```
```
                                    a C b  2 ab;                                   so
```
```
                                           ‹
```
```
                       a2 C 2ab C b 2  4ab;                                        so
```
```
                                           ‹
```
```
                       a2     2ab C b 2  0;                                        so
```
```
                                       2
```
```
                               .a     b/  0                  which we know is true.
```
```

             The last statement is true because a b is a real number, and the square of a real
```
```
           number is never negative. This proves the claim.                                 
```
```

           Problem 1.5.
```
```
           Albert announces to his class that he plans to surprise them with a quiz sometime
```
```
           next week.
```
```
              His students first wonder if the quiz could be on Friday of next week. They
```
```
           reason that it can’t: if Albert didn’t give the quiz before Friday, then by midnight
```
```
           Thursday, they would know the quiz had to be on Friday, and so the quiz wouldn’t
```
```
           be a surprise any more.
```
```
              Next the students wonder whether Albert could give the surprise quiz Thursday.
```
```
           They observe that if the quiz wasn’t given before Thursday, it would have to be
```
```
           given on the Thursday, since they already know it can’t be given on Friday. But
```
```
           having figured that out, it wouldn’t be a surprise if the quiz was on Thursday either.
```
```
           Similarly, the students reason that the quiz can’t be on Wednesday, Tuesday, or
```
```
           Monday. Namely, it’s impossible for Albert to give a surprise quiz next week. All
```
```
           the students now relax, having concluded that Albert must have been bluffing. And
```
```
           since no one expects the quiz, that’s why, when Albert gives it on Tuesday next
```
```
           week, it really is a surprise!
```
```
              What, if anything, do you think is wrong with the students’ reasoning?
```

Problems for Section 1.5
```
           Homework Problems
```
```
           Problem 1.6.
```
```
           Show that log7 n is either an integer or irrational, where n is a positive integer. Use
```
```
                  

## 24 Chapter 1   What is a Proof?
```
```

           whatever familiar facts about integers and primes you need, but explicitly state such
```
```
           facts.
```

Problems for Section 1.7
```
           Practice Problems
```
```
           Problem 1.7.
```
```
           Prove by cases that
```
```
                                          max.r; s/ C min.r; s/ D r C s                     (*)
```
```
           for all real numbers r; s.
```
```

           Class Problems
```
```
           Problem 1.8.
```
```
           If we raise an irrational number to p
```
```
                                               an irrational power, can the result be rational?
```
```
                                           p 2
```
```
           Show that it can by considering 2 and arguing by cases.
```
```

           Problem 1.9.
```
```
           Prove by cases that
```
```
                                                  jr C sj  jrj C jsj                       (1)
```
```
           for all real numbers r; s.9
```
```

           Homework Problems
```
```
           Problem 1.10. (a) Suppose that
```
```

                                                   a C b C c D d;
```
```

           where a; b; c; d are nonnegative integers.
```
```
           Let P be the assertion that d is even. Let W be the assertion that exactly one among
```
```
           a; b; c are even, and let T be the assertion that all three are even.
```
```
           Prove by cases that
```
```
                                                  P IFF ŒW OR T :
```
```
              9 The absolute value jrj of r equals whichever of r or   r is not negative.
```
```
                  

           1.10. References                                                                  25
```
```

            (b) Now suppose that
```
```
                                          w2 C x2 C y 2 D z2;
```
```
           where w; x; y; z are nonnegative integers. Let P be the assertion that z is even, and
```
```
           let R be the assertion that all three of w; x; y are even. Prove by cases that
```
```

                                                P IFF R:
```
```

           Hint: An odd number equals 2m C 1 for some integer m, so its square equals
```
```
           4.m2 C m/ C 1.
```
```

           Exam Problems
```
```
           Problem 1.11.                                         p
```
```
                                  irrational number a such that a 3 is rational.
```
```
           Prove that there is an p
```
```
                               p 3
```
```
             Hint: Consider 3 2 and argue by cases.
```

Problems for Section 1.8
```
           Practice Problems
```
```
           Problem 1.12.
```
```
           Prove that for any n > 0, if an is even, then a is even.
```
```
             Hint: Contradiction.
```
```

           Problem 1.13.
```
```
                                                                  p
```
```
           Prove that if a  b D n, then either a or b must be  n, where a; b, and n are
```
```
           nonnegative real numbers. Hint: by contradiction, Section 1.8.
```
```

           Problem 1.14.
```
```
           Let n be a nonnegative integer.
```
```
            (a) Explain why if n2 is even—that is, a multiple of 2—then n is even.
```
```

            (b) Explain why if n2 is a multiple of 3, then n must be a multiple of 3.
```
```

           Problem 1.15.
```
```
           Give an example of two distinct positive integers m; n such that n2 is a multiple of
```
```
            

## 26 Chapter 1   What is a Proof?
```
```

     m, but n is not a multiple of m. How about having m be less than n?
```
```

     Class Problems
```
```
     Problem 1.16.                                              p
```
```
     How far can you generalize
```
```
                        p       the proof of Theorem 1.8.1 that   2 is irrational? For
```
```
     example, how about 3?
```
```

     Problem 1.17.
```
```
     Prove that log4 6 is irrational.
```
```

     Problem 1.18.               p    p
```
```
     Prove by p
```
```
              contradiction
```
```
                    p p     that p3 C   2 is irrational.
```
```
       Hint: . 3 C 2/. 3           2/
```
```

     Problem 1.19.
```
```
     Here is a generalization of Problem 1.16 that you may not have thought of:
```
```

     Lemma. Let the coefficients of the polynomial
```
```

                          a0 C a1 x C a2 x 2 C    C am 1 x m 1 C x m
```
```

     be integers. Then any real root of the polynomial is either integral or irrational.
```
```
                                                               p
```
```
                                                               m
```
```
      (a) Explain why the Lemma immediately implies that k is irrational whenever
```
```
     k is not an mth power of some integer.
```
```

     (b) Carefully prove the Lemma.
```
```
     You may find it helpful to appeal to:
```
```
     Fact. If a prime p is a factor of some power of an integer, then it is a factor of that
```
```
     integer.
```
```
     You may assume this Fact without writing down its proof, but see if you can explain
```
```
     why it is true.
```
```

     Exam Problems
```
```
     Problem 1.20.
```
```
     Prove that log9 12 is irrational.
```
```
       

1.10. References                                                                   27
```

Problem 1.21.
Prove that log12 18 is irrational.

Problem 1.22.           p
```
                        3
```
A familiar proof that 72 is irrational depends on the fact that a certain equation
among those below is unsatisfiable by integers a; b > 0. (Note that more than one
is unsatisfiable, but only one of them is relevant.) Indicate the equation that would
```
                                                                                 p
```
```
                                                                                 3
```
appear in the proof, and explain why it is unsatisfiable. (Do not assume that 72
is irrational.)
  i. a2 D 72 C b 2

 ii. a3 D 72 C b 3

iii. a2 D 72 b 2

 iv. a3 D 72 b 3

 v. a3 D 73 b 3

vi. .ab/3 D 72

Homework Problems
Problem 1.23.
The fact that that there are irrational numbers a; b such that ab is rational was
proved in Problem 1.8 by cases. Unfortunately, that proof was nonconstructive: it
```
         p a specific pair a; b with this property. But in fact, it’s easy to do this:
```
didn’t reveal
let a WWD 2 and bpWWD 2 log2 3.
   We know a D 2 is irrational, and ab D 3 by definition. Finish the proof that
these values for a; b work, by showing that 2 log2 3 is irrational.

Problem 1.24.                 p
Here is a different proof that 2 is irrational, taken from the American Mathemat-
ical Monthly, v.116, #1, Jan. 2009, p.69:
```
                                                     p
```
Proof. Suppose for the sake ofcontradiction     that 2 is rational, and choose the
```
                                  p       
```
least integer q > 0 such that        2 1 q is a nonnegative integer. Let q 0 WWD
p                                                                    p      
```
    2 1 q. Clearly 0 < q 0 < q. But an easy computation shows that        2 1 q0
```
is a nonnegative integer, contradicting the minimality of q.                     
```
            

## 28 Chapter 1   What is a Proof?
```
```

      (a) This proof was written for an audience of college teachers, and at this point it
```
```
     is a little more concise than desirable. Write out a more complete version which
```
```
     includes an explanation of each step.
```
```

      (b) Now that you have justified the steps in this proof, do you have a preference
```
```
     for one of these proofs over the other? Why? Discuss these questions with your
```
```
     teammates for a few minutes and summarize your team’s answers on your white-
```
```
     board.
```
```

     Problem 1.25.
```
```
     For n D 40, the value of polynomial p.n/ WWD n2 C n C 41 is not prime, as noted
```
```
     in Section 1.1. But we could have predicted based on general principles that no
```
```
     nonconstant polynomial can generate only prime numbers.
```
```
        In particular, let q.n/ be a polynomial with integer coefficients, and let c WWD q.0/
```
```
     be the constant term of q.
```
```
     (a) Verify that q.cm/ is a multiple of c for all m 2 Z.
```
```

      (b) Show that if q is nonconstant and c > 1, then as n ranges over the nonnegative
```
```
     integers N there are infinitely many q.n/ 2 Z that are not primes.
```
```
     Hint: You may assume the familiar fact that the magnitude of any nonconstant
```
```
     polynomial q.n/ grows unboundedly as n grows.
```
```

      (c) Conclude that for every nonconstant polynomial q there must be an n 2 N
```
```
     such that q.n/ is not prime. Hint: Only one easy case remains.
```