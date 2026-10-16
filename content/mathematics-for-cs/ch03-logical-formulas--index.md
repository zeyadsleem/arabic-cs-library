---
title: "Logical Formulas"
lang: en
---

## 3 Logical Formulas
```
    It is amazing that people manage to cope with all the ambiguities in the English
```
```
    language. Here are some sentences that illustrate the issue:
```
```

        “You may have cake, or you may have ice cream.”
```
```

        “If pigs can fly, then your account won’t get hacked.”
```
```

        “If you can solve any problem we come up with, then you get an A for the
```
```
         course.”
```
```

        “Every American has a dream.”
```
```

    What precisely do these sentences mean? Can you have both cake and ice cream or
```
```
    must you choose just one dessert? Pigs can’t fly, so does the second sentence say
```
```
    anything about the security of your account? If you can solve some problems we
```
```
    come up with, can you get an A for the course? And if you can’t solve a single one
```
```
    of the problems, does it mean you can’t get an A? Finally, does the last sentence
```
```
    imply that all Americans have the same dream—say of owning a house—or might
```
```
    different Americans have different dreams—say, Eric dreams of designing a killer
```
```
    software application, Tom of being a tennis champion, Albert of being able to sing?
```
```
       Some uncertainty is tolerable in normal conversation. But when we need to
```
```
    formulate ideas precisely—as in mathematics and programming—the ambiguities
```
```
    inherent in everyday language can be a real problem. We can’t hope to make an
```
```
    exact argument if we’re not sure exactly what the statements mean. So before we
```
```
    start into mathematics, we need to investigate the problem of how to talk about
```
```
    mathematics.
```
```
       To get around the ambiguity of English, mathematicians have devised a spe-
```
```
    cial language for talking about logical relationships. This language mostly uses
```
```
    ordinary English words and phrases such as “or,” “implies,” and “for all.” But
```
```
    mathematicians give these words precise and unambiguous definitions which don’t
```
```
    always match common usage.
```
```
       Surprisingly, in the midst of learning the language of logic, we’ll come across
```
```
    the most important open problem in computer science—a problem whose solution
```
```
    could change the world.
```
```
                    

## 48 Chapter 3    Logical Formulas
```

### 3.1 Propositions from Propositions
```
            In English, we can modify, combine, and relate propositions with words such as
```
```
            “not,” “and,” “or,” “implies,” and “if-then.” For example, we can combine three
```
```
            propositions into one like this:
```
```
             If all humans are mortal and all Greeks are human, then all Greeks are mortal.
```
```
               For the next while, we won’t be much concerned with the internals of propositions—
```
```
            whether they involve mathematics or Greek mortality—but rather with how propo-
```
```
            sitions are combined and related. So, we’ll frequently use variables such as P and
```
```
            Q in place of specific propositions such as “All humans are mortal” and “2 C 3 D
```
```
            5.” The understanding is that these propositional variables, like propositions, can
```
```
            take on only the values T (true) and F (false). Propositional variables are also
```
```
            called Boolean variables after their inventor, the nineteenth century mathematician
```
```
            George—you guessed it—Boole.
```
```

            3.1.1       NOT , AND , and OR
```
```

            Mathematicians use the words NOT, AND and OR for operations that change or
```
```
            combine propositions. The precise mathematical meaning of these special words
```
```
            can be specified by truth tables. For example, if P is a proposition, then so is
```
```
            “NOT.P /,” and the truth value of the proposition “NOT.P /” is determined by the
```
```
            truth value of P according to the following truth table:
```
```

                                                 P NOT.P /
```
```
                                                 T       F
```
```
                                                 F       T
```
```
               The first row of the table indicates that when proposition P is true, the proposi-
```
```
            tion “NOT.P /” is false. The second line indicates that when P is false, “NOT.P /”
```
```
            is true. This is probably what you would expect.
```
```
               In general, a truth table indicates the true/false value of a proposition for each
```
```
            possible set of truth values for the variables. For example, the truth table for the
```
```
            proposition “P AND Q” has four lines, since there are four settings of truth values
```
```
            for the two variables:
```
```

                                             P Q P AND Q
```
```
                                             T T    T
```
```
                                             T F    F
```
```
                                             F T    F
```
```
                                             F F    F
```
```
        

3.1. Propositions from Propositions                                              49
```
```

   According to this table, the proposition “P AND Q” is true only when P and Q
```
are both true. This is probably the way you ordinarily think about the word “and.”
   There is a subtlety in the truth table for “P OR Q”:
```

                                      P Q P OR Q
```
```
                                      T T   T
```
```
                                      T F   T
```
```
                                      F T   T
```
```
                                      F F   F
```
   The first row of this table says that “P OR Q” is true even if both P and Q are
true. This isn’t always the intended meaning of “or” in everyday speech, but this is
the standard definition in mathematical writing. So if a mathematician says, “You
may have cake, or you may have ice cream,” he means that you could have both.
   If you want to exclude the possibility of having both cake and ice cream, you
should combine them with the exclusive-or operation, XOR:
```

                                      P Q P XOR Q
```
```
                                      T T    F
```
```
                                      T F    T
```
```
                                      F T    T
```
```
                                      F F    F
```

#### 3.1.2 If and Only If
Mathematicians commonly join propositions in an additional way that doesn’t arise
in ordinary speech. The proposition “P if and only if Q” asserts that P and Q have
the same truth value. Either both are true or both are false.
```
                                      P Q P IFF Q
```
```
                                      T T    T
```
```
                                      T F    F
```
```
                                      F T    F
```
```
                                      F F    T
```

For example, the following if-and-only-if statement is true for every real number
x:
```
                           x 2 4  0 IFF jxj  2:
```
For some values of x, both inequalities are true. For other values of x, neither
inequality is true. In every case, however, the IFF proposition as a whole is true.
```
             

## 50 Chapter 3    Logical Formulas
```
```

     3.1.3       IMPLIES
```
```

     The combining operation whose technical meaning is least intuitive is “implies.”
```
```
     Here is its truth table, with the lines labeled so we can refer to them later.
```
```

                                     P Q P IMPLIES Q
```
```
                                     T T      T               (tt)
```
```
                                     T F      F               (tf)
```
```
                                     F T      T               (ft)
```
```
                                     F F      T               (ff)
```
```
       The truth table for implications can be summarized in words as follows:
```
```

        An implication is true exactly when the if-part is false or the then-part is true.
```
```

     This sentence is worth remembering; a large fraction of all mathematical statements
```
```
     are of the if-then form!
```
```
        Let’s experiment with this definition. For example, is the following proposition
```
```
     true or false?
```
```
             If Goldbach’s Conjecture is true, then x 2  0 for every real number x.
```
```
     We already mentioned that no one knows whether Goldbach’s Conjecture, Proposi-
```
```
     tion 1.1.6, is true or false. But that doesn’t prevent us from answering the question!
```
```
     This proposition has the form P IMPLIES Q where the hypothesis P is “Gold-
```
```
     bach’s Conjecture is true” and the conclusion Q is “x 2  0 for every real number
```
```
     x.” Since the conclusion is definitely true, we’re on either line (tt) or line (ft) of the
```
```
     truth table. Either way, the proposition as a whole is true!
```
```
        Now let’s figure out the truth of one of our original examples:
```
```
             If pigs fly, then your account won’t get hacked.
```
```
     Forget about pigs, we just need to figure out whether this proposition is true or
```
```
     false. Pigs do not fly, so we’re on either line (ft) or line (ff) of the truth table. In
```
```
     both cases, the proposition is true!
```
```

     False Hypotheses
```
```
     This mathematical convention—that an implication as a whole is considered true
```
```
     when its hypothesis is false—contrasts with common cases where implications are
```
```
     supposed to have some causal connection between their hypotheses and conclu-
```
```
     sions.
```
```
        For example, we could agree—or at least hope—that the following statement is
```
```
     true:
```
```
       

3.1. Propositions from Propositions                                                51
```
```

       If you followed the security protocal, then your account won’t get
```
```
       hacked.
```
We regard this implication as unproblematical because of the clear causal connec-
tion between security protocols and account hackability.
   On the other hand, the statement:
```
       If pigs could fly, then your account won’t get hacked,
```
would commonly be rejected as false—or at least silly—because porcine aeronau-
tics have nothing to do with your account security. But mathematically, this impli-
cation counts as true.
   It’s important to accept the fact that mathematical implications ignore causal
connections. This makes them a lot simpler than causal implications, but useful
nevertheless. To illustrate this, suppose we have a system specification which con-
sists of a series of, say, a dozen rules,1
```
                     If   the      system sensors are in condition 1,
```
```
                          then     the system takes action 1.
```
```
                     If   the      system sensors are in condition 2,
```
```
                          then     the system takes action 2.
```
```
                                  ::
```
```
                                   :
```
```
                     If   the     system sensors are in condition 12,
```
```
                          then    the system takes action 12.
```
  Letting Ci be the proposition that the system sensors are in condition i , and Ai
be the proposition that system takes action i , the specification can be restated more
concisely by the logical formulas
```

                                      C1 IMPLIES A1 ;
```
```
                                      C2 IMPLIES A2 ;
```
```
                                        ::
```
```
                                         :
```
```
                                      C12 IMPLIES A12 :
```

Now the proposition that the system obeys the specification can be nicely expressed
as a single logical formula by combining the formulas together with ANDs::

 ŒC1 IMPLIES A1  AND ŒC2 IMPLIES A2  AND    AND ŒC12 IMPLIES A12 : (3.1)
```

   For example, suppose only conditions C2 and C5 are true, and the system indeed
```
takes the specified actions A2 and A5 . So in this case, the system is behaving
   1 Problem 3.17 concerns just such a system.
```
                   

## 52 Chapter 3   Logical Formulas
```
```

           according to specification, and we accordingly want formula (3.1) to come out true.
```
```
           The implications C2 IMPLIES A2 and C5 IMPLIES A5 are both true because both
```
```
           their hypotheses and their conclusions are true. But in order for (3.1) to be true, we
```
```
           need all the other implications, all of whose hypotheses are false, to be true. This
```
```
           is exactly what the rule for mathematical implications accomplishes.
```

### 3.2 Propositional Logic in Computer Programs
```
           Propositions and logical connectives arise all the time in computer programs. For
```
```
           example, consider the following snippet, which could be either C, C++, or Java:
```
```

                              if ( x > 0 || (x <= 0 && y > 100) )
```
```
                                 ::
```
```
                                  :
```
```
                              (further instructions)
```
```

           Java uses the symbol || for “OR,” and the symbol && for “AND.” The further
```
```
           instructions are carried out only if the proposition following the word if is true.
```
```
           On closer inspection, this big expression is built from two simpler propositions.
```
```
           Let A be the proposition that x > 0, and let B be the proposition that y > 100.
```
```
           Then we can rewrite the condition as
```
```

                                          A OR .NOT.A/ AND B/:                              (3.2)
```
```

           3.2.1    Truth Table Calculation
```
```
           A truth table calculation reveals that the more complicated expression 3.2 always
```
```
           has the same truth value as
```
```
                                                 A OR B:                                (3.3)
```
```
           We begin with a table with just the truth values of A and B:
```
```

                             A B A OR .NOT.A/ AND B/ A OR B
```
```
                             T T
```
```
                             T F
```
```
                             F T
```
```
                             F F
```
```
         

  3.2. Propositional Logic in Computer Programs                                     53
```

  These values are enough to fill in two more columns:
```
                    A B A OR .NOT.A/ AND B/ A OR B
```
```
                    T T         F             T
```
```
                    T F         F             T
```
```
                    F T         T             T
```
```
                    F F         T             F
```
  Now we have the values needed to fill in the AND column:
```
                    A B A OR .NOT.A/ AND B/ A OR B
```
```
                    T T         F     F       T
```
```
                    T F         F     F       T
```
```
                    F T         T     T       T
```
```
                    F F         T     F       F
```
  and this provides the values needed to fill in the remaining column for the first OR:
```
                    A B A OR .NOT.A/ AND B/ A OR B
```
```
                    T T   T     F     F       T
```
```
                    T F   T     F     F       T
```
```
                    F T   T     T     T       T
```
```
                    F F   F     T     F       F
```
  Expressions whose truth values always match are called equivalent. Since the two
  emphasized columns of truth values of the two expressions are the same, they are
  equivalent. So we can simplify the code snippet without changing the program’s
  behavior by replacing the complicated expression with an equivalent simpler one:
```
                     if ( x > 0 || y > 100 )
```
```
                        ::
```
```
                         :
```
```
                     (further instructions)
```
```
    The equivalence of (3.2) and (3.3) can also be confirmed reasoning by cases:
```
A is T. An expression of the form .T OR anything/ is equivalent to T. Since A is T
```
        both (3.2) and (3.3) in this case are of this form, so they have the same truth
```
```
        value, namely, T.
```
A is F. An expression of the form .F OR anything/ will have same truth value as
```
        anything. Since A is F, (3.3) has the same truth value as B.
```
```
         An expression of the form .T AND anything/ is equivalent to anything, as is
```
```
         any expression of the form F OR anything. So in this case A OR .NOT.A/ AND
```
```
         B/ is equivalent to .NOT.A/ AND B/, which in turn is equivalent to B.
```
```
                    

## 54 Chapter 3   Logical Formulas
```
```

                    Therefore both (3.2) and (3.3) will have the same truth value in this case,
```
```
                    namely, the value of B.
```
```
               Simplifying logical expressions has real practical importance in computer sci-
```
```
            ence. Expression simplification in programs like the one above can make a program
```
```
            easier to read and understand. Simplified programs may also run faster, since they
```
```
            require fewer operations. In hardware, simplifying expressions can decrease the
```
```
            number of logic gates on a chip because digital circuits can be described by logical
```
```
            formulas (see Problems 3.6 and 3.7). Minimizing the logical formulas corresponds
```
```
            to reducing the number of gates in the circuit. The payoff of gate minimization is
```
```
            potentially enormous: a chip with fewer gates is smaller, consumes less power, has
```
```
            a lower defect rate, and is cheaper to manufacture.
```
```

            3.2.2    Cryptic Notation
```
```
            Java uses symbols like “&&” and “jj” in place of AND and OR. Circuit designers
```
```
            use “” and “C,” and actually refer to AND as a product and OR as a sum. Mathe-
```
```
            maticians use still other symbols, given in the table below.
```
```
                                   English        Symbolic Notation
```
```
                                   NOT .P /       :P (alternatively, P )
```
```
                                   P AND Q        P ^Q
```
```
                                   P OR Q         P _Q
```
```
                                   P IMPLIES Q    P !Q
```
```
                                   if P then Q    P !Q
```
```
                                   P IFF Q        P !Q
```
```
                                   P XOR Q        P ˚Q
```
```
            For example, using this notation, “If P AND NOT.Q/, then R” would be written:
```
```
                                              .P ^ Q/ ! R:
```
```
               The mathematical notation is concise but cryptic. Words such as “AND” and
```
```
            “OR” are easier to remember and won’t get confused with operations on numbers.
```
```
            We will often use P as an abbreviation for NOT.P /, but aside from that, we mostly
```
```
            stick to the words—except when formulas would otherwise run off the page.
```

### 3.3 Equivalence and Validity
```
            3.3.1    Implications and Contrapositives
```
```
            Do these two sentences say the same thing?
```
```
       

3.3. Equivalence and Validity                                                      55
```
```

                            If I am hungry, then I am grumpy.
```
```
                       If I am not grumpy, then I am not hungry.
```

We can settle the issue by recasting both sentences in terms of propositional logic.
Let P be the proposition “I am hungry” and Q be “I am grumpy.” The first sentence
says “P IMPLIES Q” and the second says “NOT.Q/ IMPLIES NOT.P /.” Once
more, we can compare these two statements in a truth table:
```

             P Q .P IMPLIES Q/ .NOT.Q/ IMPLIES NOT.P //
```
```
             T T      T           F      T        F
```
```
             T F       F          T      F        F
```
```
             F T      T           F      T        T
```
```
             F F      T           T      T        T
```

Sure enough, the highlighted columns showing the truth values of these two state-
ments are the same. A statement of the form “NOT.Q/ IMPLIES NOT.P /” is called
the contrapositive of the implication “P IMPLIES Q.” The truth table shows that
an implication and its contrapositive are equivalent—they are just different ways of
saying the same thing.
  In contrast, the converse of “P IMPLIES Q” is the statement “Q IMPLIES P .”
The converse to our example is:
```

                            If I am grumpy, then I am hungry.
```

This sounds like a rather different contention, and a truth table confirms this suspi-
cion:
```
                      P Q P IMPLIES Q Q IMPLIES P
```
```
                      T T             T                T
```
```
                      T F             F                T
```
```
                      F T             T                F
```
```
                      F F             T                T
```
Now the highlighted columns differ in the second and third row, confirming that an
implication is generally not equivalent to its converse.
  One final relationship: an implication and its converse together are equivalent to
an iff statement, specifically, to these two statements together. For example,
```

      If I am grumpy then I am hungry, and if I am hungry then I am grumpy.
```

are equivalent to the single statement:
```

                                I am grumpy iff I am hungry.
```
```
             

## 56 Chapter 3   Logical Formulas
```
```

     Once again, we can verify this with a truth table.
```
```

                 P Q .P IMPLIES Q/ AND .Q IMPLIES P / P IFF Q
```
```
                 T T       T        T        T           T
```
```
                 T F       F        F        T           F
```
```
                 F T       T        F        F           F
```
```
                 F F       T        T        T           T
```
```
     The fourth column giving the truth values of
```
```
                             .P IMPLIES Q/ AND .Q IMPLIES P /
```
```
     is the same as the sixth column giving the truth values of P IFF Q, which confirms
```
```
     that the AND of the implications is equivalent to the IFF statement.
```
```

     3.3.2    Validity and Satisfiability
```
```
     A valid formula is one which is always true, no matter what truth values its vari-
```
```
     ables may have. The simplest example is
```
```
                                        P OR NOT.P /:
```
```
        You can think about valid formulas as capturing fundamental logical truths. For
```
```
     example, a property of implication that we take for granted is that if one statement
```
```
     implies a second one, and the second one implies a third, then the first implies the
```
```
     third. The following valid formula confirms the truth of this property of implication.
```
```
              Œ.P IMPLIES Q/ AND .Q IMPLIES R/ IMPLIES .P IMPLIES R/:
```
```
       Equivalence of formulas is really a special case of validity. Namely, statements
```
```
     F and G are equivalent precisely when the statement .F IFF G/ is valid. For
```
```
     example, the equivalence of the expressions (3.3) and (3.2) means that
```
```
                             .A OR B/ IFF .A OR .NOT.A/ AND B//
```
```
     is valid. Of course, validity can also be viewed as an aspect of equivalence. Namely,
```
```
     a formula is valid iff it is equivalent to T.
```
```
        A satisfiable formula is one which can sometimes be true—that is, there is some
```
```
     assignment of truth values to its variables that makes it true. One way satisfiabil-
```
```
     ity comes up is when there are a collection of system specifications. The job of
```
```
     the system designer is to come up with a system that follows all the specs. This
```
```
     means that the AND of all the specs must be satisfiable or the designer’s job will be
```
```
     impossible (see Problem 3.17).
```
```
        There is also a close relationship between validity and satisfiability: a statement
```
```
     P is satisfiable iff its negation NOT.P / is not valid.
```
```
                    

            3.4. The Algebra of Propositions                                                    57
```

### 3.4 The Algebra of Propositions
```
            3.4.1     Propositions in Normal Form
```
```
            Every propositional formula is equivalent to a “sum-of-products” or disjunctive
```
```
            normal form (DNF).
```
```
               More precisely, a propositional variable A or its negation bar.A/ is called a
```
```
            literal, and an AND of literals involving distinct variables is called an AND-clause
```
```
            or AND-of-literals. For example,
```
```

                                                 A AND B AND C
```
```

            is an AND-clause, but A AND B AND B AND C is not because B appears twice.
```
```
            Finally, a DNF is an OR of AND-clauses such as
```
```

                                            .A AND B/ OR .A AND C /:                         (3.4)
```
```

              You can read a DNF for any propositional formula directly from its truth table.
```
```
            For example, the formula
```
```
                                         A AND .B OR C /                                (3.5)
```
```
            has truth table:
```
```
                                        A      B C A AND .B OR C /
```
```
                                        T      T T    T
```
```
                                        T      T F    T
```
```
                                        T      F T    T
```
```
                                        T      F F    F
```
```
                                        F      T T    F
```
```
                                        F      T F    F
```
```
                                        F      F T    F
```
```
                                        F      F F    F
```
```
            The formula (3.5) is true in the first row when A, B and C are all true, that is, where
```
```
            A AND B AND C is true. It is also true in the second row where A AND B AND C
```
```
            is true, and in the third row when A AND B AND C is true, and that’s all. So (3.5)
```
```
            is true exactly when
```
```

                    .A AND B AND C / OR .A AND B AND C / OR .A AND B AND C /                 (3.6)
```
```

            is true.
```
```
               The expression (3.6) is a DNF where each AND-clause actually includes a literal
```
```
            for every one of the variables in the whole formula. We’ll call such a formula a full
```
```
            DNF.
```
```
             

## 58 Chapter 3    Logical Formulas
```
```

        A DNF formula can often be simplified into a smaller DNF For example, the
```
```
     DNF (3.6) further simplifies to the equivalent DNF (3.4) above.
```
```
        Applying the same reasoning to the F entries of a truth table yields a conjunctive
```
```
     normal form (CNF) for any formula—an AND of OR-clauses, where an OR-clause
```
```
     is an OR-of-literals from different variables.
```
```
        For example, formula (3.5) is false in the fourth row of its truth table (3.4.1)
```
```
     where A is T, B is F and C is F. But this is exactly the one row where the OR-
```
```
     clause .A OR B OR C / is F! Likewise, (3.5) is false in the fifth row, which is
```
```
     exactly where .A OR B OR C / is F. This means that (3.5) will be F whenever the
```
```
     AND of these two OR -clauses is false. Continuing in this way with the OR -clauses
```
```
     corresponding to the remaining three rows where (3.5) is false, we get a CNF that
```
```
     is equivalent to (3.5), namely,
```
```

                 .A OR B OR C / AND .A OR B OR C / AND .A OR B OR C /AND
```
```
                 .A OR B OR C / AND .A OR B OR C /
```
```

     Again, each OR-clause includes a literal for every one of the variables, that is, it is
```
```
     a full CNF
```
```
        The methods above can be applied to any truth table, which implies
```
```

     Theorem 3.4.1. Every propositional formula is equivalent to both a full disjunctive
```
```
     normal form and a full conjunctive normal form.
```
```

     3.4.2    Proving Equivalences
```
```
     A check of equivalence or validity by truth table runs out of steam pretty quickly:
```
```
     a proposition with n variables has a truth table with 2n lines, so the effort required
```
```
     to check a proposition grows exponentially with the number of variables. For a
```
```
     proposition with just 30 variables, that’s already over a billion lines to check!
```
```
        An alternative approach that sometimes helps is to use algebra to prove equiv-
```
```
     alence. A lot of different operators may appear in a propositional formula, so a
```
```
     useful first step is to get rid of all but three: AND, OR and NOT. This is easy be-
```
```
     cause each of the operators is equivalent to a simple formula using only these three.
```
```
     For example, A IMPLIES B is equivalent to NOT.A/ OR B. Formulas defining the
```
```
     remaining operators using only AND; OR and NOT are left to Problem 3.18.
```
```
        We list below a bunch of equivalence axioms with the symbol “ ! ” between
```
```
     equivalent formulas. These axioms are important because they are all that’s needed
```
```
     to prove every possible equivalence. We’ll start with some equivalences for AND’s
```
```
       

3.4. The Algebra of Propositions                                                    59
```

that look like the familiar ones for multiplication of numbers:
```
           A AND B         ! B AND A                              (commutativity of AND)
```
```
                                                                               (3.7)
```
.A AND B/ AND C            ! A AND .B AND C /                      (associativity of AND)
```
                                                                                (3.8)
```
```
           T AND A         ! A                                           (identity for AND)
```
```
           F AND A         ! F                                              (zero for AND)
```
 A AND .B OR C /           ! .A AND B/ OR .A AND C / (distributivity of AND over OR)
```
                                                                           (3.9)
```
   Associativity (3.8) justifies writing A AND B AND C without specifying whether
it is parenthesized as A AND .B AND C / or .A AND B/ AND C . Both ways of
inserting parentheses yield equivalent formulas.
   Unlike arithmetic rules for numbers, there is also a distributivity law for “sums”
over “products:”
A OR .B AND C /         ! .A OR B/ AND .A OR C / (distributivity of OR over AND)
```
                                                                         (3.10)
```
  Three more axioms that don’t directly correspond to number properties are
```
               A AND A        ! A              (idempotence for AND)
```
```
               A AND A        ! F             (contradiction for AND)           (3.11)
```
```
                 NOT .A/      ! A                    (double negation)          (3.12)
```
   There are a corresponding set of equivalences for OR which we won’t bother to
list, except for validity rule (3.13) for OR:
```
                   A OR A          ! T             (validity for OR)            (3.13)
```
  Finally, there are De Morgan’s Laws which explain how to distribute NOT’s over
AND ’s and OR ’s:
```

        NOT.A AND B/           ! A OR B         (De Morgan for AND)             (3.14)
```
```
          NOT .A OR B/         ! A AND B          (De Morgan for OR)            (3.15)
```
All of these axioms can be verified easily with truth tables.
   These axioms are all that’s needed to convert any formula to a full DNF. We can
illustrate how they work by applying them to turn the negation of formula (3.5),
```
                            NOT..A AND B/ OR .A AND C //:                       (3.16)
```
```
            

## 60 Chapter 3   Logical Formulas
```
```

     into a full DNF.
```
```
        We start by applying De Morgan’s Law for OR (3.15) to (3.16) in order to move
```
```
     the NOT deeper into the formula. This gives
```
```

                              NOT .A AND B/ AND NOT .A AND C /:
```
```

     Now applying De Morgan’s Law for AND (3.14) to the two innermost AND-terms,
```
```
     gives
```
```
                             .A OR B/ AND .A OR C /:                      (3.17)
```
```
     At this point NOT only applies to variables, and we won’t need De Morgan’s Laws
```
```
     any further.
```
```
        Now we will repeatedly apply (3.9), distributivity of AND over OR, to turn (3.17)
```
```
     into a DNF. To start, we’ll distribute .A OR B/ over AND to get
```
```

                           ..A OR B/ AND A/ OR ..A OR B/ AND C /:
```
```

     Using distributivity over both AND’s we get
```
```

                 ..A AND A/ OR .B AND A// OR ..A AND C / OR .B AND C //:
```
```

     By the way, we’ve implicitly used commutativity (3.7) here to justify distributing
```
```
     over an AND from the right. Now applying idempotence to remove the duplicate
```
```
     occurrence of A we get
```
```

                     .A OR .B AND A// OR ..A AND C / OR .B AND C //:
```
```

     Associativity of QOR now allows dropping the parentheses grouping the AND-
```
```
     clauses to yield the following DNF for (3.16):
```
```

                       A OR .B AND A/ OR .A AND C / OR .B AND C /:                (3.18)
```
```

       The penultimate step is to turn this DNF into a full DNF. This can be done
```
```
     separately for ech AND-clause. We’ll illustrate how using the second AND-clause
```
```
     .B AND A/. This clause needs to mention C to be in full form. To introduce C , we
```
```
     use validity for OR and identity for AND to conclude that
```
```

                         .B AND A/     ! .B AND A/ AND .C OR C /:
```
```

       Now distributing .B AND A/ over the OR in .C OR C / yields the full DNF
```
```

                           .B AND A AND C / OR .B AND A AND C /:
```
```
       

3.4. The Algebra of Propositions                                                   61
```

Doing the same thing to the other AND-clauses in (3.18) finally gives a full DNF
for (3.5):
```
                .A AND B AND C / OR .A AND B AND C / OR
```
```
                .A AND B AND C / OR .A AND B AND C / OR
```
```
                .B AND A AND C / OR .B AND A AND C / OR
```
```
                .A AND C AND B/ OR .A AND C AND B/ OR
```
```
                .B AND C AND A/ OR .B AND C AND A/:
```
   The final step is to use commutativity to sort the variables within the AND-clauses
and then sort the AND-clauses themselves, followed by applying OR-idempotence
as needed to remove duplicate AND-clauses. This finally yields a sorted full DNF
without duplicates which is called a canonical DNF :
```

                                   .A AND B AND C / OR
```
```
                                   .A AND B AND C / OR
```
```
                                   .A AND B AND C / OR
```
```
                                   .A AND B AND C / OR
```
```
                                   .A AND B AND C /:
```
```

   This example illustrates the general strategy for applying the axioms above to any
```
given propositional formala to derive an equivalent canonical DNF. This proves:

Theorem 3.4.2. Using the equivalences listed above, any propositional formula
can be proved equivalent to a canonical form.
```

   What has this got to do with equivalence? That’s easy: to prove that two formulas
```
are equivalent, convert them both to canonical forms over the set of variables that
appear in at least one of the formulas—call these the combined variables. Now
if two formulas are equivalent to the same canonical form then the formula are
certainly equivalent. Conversely, the way we read off a full disjunctive normal
form from a truth table actually yields a canonical form. So if two formulas are
equivalent, they will have the same truth table over the combined variables, and
therefore they will have the same canonical form. This proves

Theorem 3.4.3 (Completeness of the propositional equivalence axioms). Two propo-
sitional formula are equivalent iff they can be proved equivalent using the equiva-
lence axioms listed above.
```

   Notice that the same approach could be taken used CNF instead of DNF canoni-
```
cal forms.
   The benefit of the axioms is that they allow some ingenious proofs of equiva-
lence that may involve much less effort than the truth table method. Moreover,
```
                  

## 62 Chapter 3    Logical Formulas
```
```

           Theorem 3.4.3 reassures us that the axioms are guaranteed to provide a proof of
```
```
           every equivalence, which is a great punchline for this section.
```
```
              But we don’t want to mislead you: the guaranteed proof involves deriving canon-
```
```
           ical forms, and canonical forms are essentially copies of truth tables. There is no
```
```
           reason to expect algebraic proofs of equivalence to be any easier in general than
```
```
           conversion to canonical form, which means algebraic proofs will generally be no
```
```
           easier than using truth tables.
```

### 3.5 The SAT Problem
```
           Determining whether or not a more complicated proposition is satisfiable is not so
```
```
           easy. How about this one?
```
```

                       .P OR Q OR R/ AND .P OR Q/ AND .P OR R/ AND .R OR Q/
```
```

              The general problem of deciding whether a proposition is satisfiable is called
```
```
           SAT. One approach to SAT is to construct a truth table and check whether or not
```
```
           a T ever appears, but as with testing validity, this approach quickly bogs down
```
```
           for formulas with many variables because truth tables grow exponentially with the
```
```
           number of variables.
```
```
              Is there a more efficient solution to SAT? In particular, is there some brilliant
```
```
           procedure that determines SAT in a number of steps that grows polynomially—like
```
```
           n2 or n14 —instead of exponentially—2n —whether any given proposition of size n
```
```
           is satisfiable or not? No one knows. And an awful lot hangs on the answer.
```
```
              The general definition of an “efficient” procedure is one that runs in polynomial
```
```
           time, that is, that runs in a number of basic steps bounded by a polynomial in s,
```
```
           where s is the size of an input. It turns out that an efficient solution to SAT would
```
```
           immediately imply efficient solutions to many other important problems involving
```
```
           scheduling, routing, resource allocation, and circuit verification across multiple dis-
```
```
           ciplines including programming, algebra, finance, and political theory. This would
```
```
           be wonderful, but there would also be worldwide chaos because decrypting coded
```
```
           messages would become an easy task, so online financial transactions would be
```
```
           insecure and secret communications could be read by everyone. Why this would
```
```
           happen is explained in Section 9.12.
```
```
              Of course, the situation is the same for validity checking, since you can check for
```
```
           validity by checking for satisfiability of a negated formula. This also explains why
```
```
           the simplification of formulas mentioned in Section 3.2 would be hard—validity
```
```
           testing is a special case of determining if a formula simplifies to T.
```
```
                   

           3.6. Predicate Formulas                                                                           63
```
```

              Recently there has been exciting progress on SAT-solvers for practical applica-
```
```
           tions like digital circuit verification. These programs find satisfying assignments
```
```
           with amazing efficiency even for formulas with millions of variables. Unfortu-
```
```
           nately, it’s hard to predict which kind of formulas are amenable to SAT-solver
```
```
           methods, and for formulas that are unsatisfiable, SAT-solvers are generally much
```
```
           less effective.
```
```
              So no one has a good idea how to solve SAT in polynomial time, or how to
```
```
           prove that it can’t be done—researchers are completely stuck. The problem of
```
```
           determining whether or not SAT has a polynomial time solution is known as the
```
```
           “P vs. NP” problem.2 It is the outstanding unanswered question in theoretical
```
```
           computer science. It is also one of the seven Millenium Problems: the Clay Institute
```
```
           will award you $1,000,000 if you solve the P vs. NP problem.
```

### 3.6 Predicate Formulas
```
           3.6.1     Quantifiers
```
```
           The “for all” notation 8 has already made an early appearance in Section 1.1. For
```
```
           example, the predicate
```
```
                                                “x 2  0”
```
```
           is always true when x is a real number. That is,
```
```

                                                   8x 2 R: x 2  0
```
```

           is a true statement. On the other hand, the predicate
```
```

                                                    “5x 2     7 D 0”
```
```
                                                                  p
```
```
           is only sometimes true; specifically, when x D ˙ 7=5. There is a “there exists”
```
```
           notation 9 to indicate that a predicate is true for at least one, but not necessarily all
```
```
           objects. So
```
```
                                           9x 2 R: 5x 2 7 D 0
```
```
           is true, while
```
```
                                                8x 2 R: 5x 2       7D0
```
```
           is not true.
```
```
               2 P stands for problems whose instances can be solved in time that grows polynomially with the
```
```

           size of the instance. NP stands for nondeterministtic polynomial time, but we’ll leave an explanation
```
```
           of what that is to texts on the theory of computational complexity.
```
```
             

## 64 Chapter 3   Logical Formulas
```
```

        There are several ways to express the notions of “always true” and “sometimes
```
```
     true” in English. The table below gives some general formats on the left and specific
```
```
     examples using those formats on the right. You can expect to see such phrases
```
```
     hundreds of times in mathematical writing!
```
```

                                            Always True
```
```
      For all x 2 D, P .x/ is true.                 For all x 2 R, x 2  0.
```
```
      P .x/ is true for every x in the set D.       x 2  0 for every x 2 R.
```
```

                                          Sometimes True
```
```
      There is an x 2 D such that P .x/ is true.    There is an x 2 R such that 5x 2 7 D 0.
```
```
      P .x/ is true for some x in the set D.        5x 2 7 D 0 for some x 2 R.
```
```
      P .x/ is true for at least one x 2 D.         5x 2 7 D 0 for at least one x 2 R.
```
```
        All these sentences “quantify” how often the predicate is true. Specifically, an
```
```
     assertion that a predicate is always true is called a universal quantification, and an
```
```
     assertion that a predicate is sometimes true is an existential quantification. Some-
```
```
     times the English sentences are unclear with respect to quantification:
```
```

                        If you can solve any problem we come up with,
```
```
                                      then you get an A for the course.             (3.19)
```
```

     The phrase “you can solve any problem we can come up with” could reasonably be
```
```
     interpreted as either a universal or existential quantification:
```
```

                         you can solve every problem we come up with,               (3.20)
```
```

     or maybe
```
```
                     you can solve at least one problem we come up with.            (3.21)
```
```
        To be precise, let Probs be the set of problems we come up with, Solves.x/ be
```
```
     the predicate “You can solve problem x,” and G be the proposition, “You get an A
```
```
     for the course.” Then the two different interpretations of (3.19) can be written as
```
```
     follows:
```
```

                  .8x 2 Probs: Solves.x// IMPLIES G;                for (3.20);
```
```
                  .9x 2 Probs: Solves.x// IMPLIES G:                for (3.21):
```
```

     3.6.2    Mixing Quantifiers
```
```
     Many mathematical statements involve several quantifiers. For example, we al-
```
```
     ready described
```
```
        

3.6. Predicate Formulas                                                             65
```
```

        Goldbach’s Conjecture 1.1.6: Every even integer greater than 2 is the
```
```
        sum of two primes.
```

Let’s write this out in more detail to be precise about the quantification:
```

        For every even integer n greater than 2, there exist primes p and q such
```
```
        that n D p C q.
```

Let Evens be the set of even integers greater than 2, and let Primes be the set of
primes. Then we can write Goldbach’s Conjecture in logic notation as follows:
```

                „ 2ƒ‚
```
```
                8n      … 9p
```
```
                    Evens
```
```
                          „
```
```
                             2 Primes 9q 2 Primes: n D p C q:
```
```
                                    ƒ‚          …
```
```
                 for every even                there exist primes
```
```
                 integer n > 2                 p and q such that
```

#### 3.6.3 Order of Quantifiers
Swapping the order of different kinds of quantifiers (existential or universal) usually
changes the meaning of a proposition. For example, let’s return to one of our initial,
confusing statements:
```

                               “Every American has a dream.”
```
```

   This sentence is ambiguous because the order of quantifiers is unclear. Let A be
```
the set of Americans, let D be the set of dreams, and define the predicate H.a; d /
to be “American a has dream d .” Now the sentence could mean there is a single
dream that every American shares—such as the dream of owning their own home:
```

                                  9 d 2 D 8a 2 A: H.a; d /
```

  Or it could mean that every American has a personal dream:
```

                                  8a 2 A 9 d 2 D: H.a; d /
```

For example, some Americans may dream of a peaceful retirement, while others
dream of continuing practicing their profession as long as they live, and still others
may dream of being so rich they needn’t think about work at all.
  Swapping quantifiers in Goldbach’s Conjecture creates a patently false statement
that every even number  2 is the sum of the same two primes:
```

                9 p 2 Primes 9 q 2 Primes: 8n 2 Evens n D p C q:
```
```
                „          ƒ‚           … „ ƒ‚ …
```
```
                          there exist primes               for every even
```
```
                          p and q such that                integer n > 2
```
```
             

## 66 Chapter 3   Logical Formulas
```
```

     3.6.4    Variables Over One Domain
```
```
     When all the variables in a formula are understood to take values from the same
```
```
     nonempty set D it’s conventional to omit mention of D. For example, instead of
```
```
     8x 2 D 9y 2 D: Q.x; y/ we’d write 8x9y: Q.x; y/. The unnamed nonempty set
```
```
     that x and y range over is called the domain of discourse, or just plain domain, of
```
```
     the formula.
```
```
       It’s easy to arrange for all the variables to range over one domain. For exam-
```
```
     ple, Goldbach’s Conjecture could be expressed with all variables ranging over the
```
```
     domain N as
```
```

     8n: n 2 Evens IMPLIES .9 p 9 q: p 2 Primes AND q 2 Primes AND n D p C q/:
```
```

     3.6.5    Negating Quantifiers
```
```
     There is a simple relationship between the two kinds of quantifiers. The following
```
```
     two sentences mean the same thing:
```
```

             Not everyone likes ice cream.
```
```
             There is someone who does not like ice cream.
```
```

     The equivalence of these sentences is an instance of a general equivalence that
```
```
     holds between predicate formulas:
```
```

                      NOT .8x: P .x//   is equivalent to 9x: NOT.P .x//:         (3.22)
```
```

     Similarly, these sentences mean the same thing:
```
```

             There is no one who likes being mocked.
```
```
             Everyone dislikes being mocked.
```
```

     The corresponding predicate formula equivalence is
```
```

                      NOT .9x: P .x//   is equivalent to 8x: NOT.P .x//:         (3.23)
```
```

     Note that the equivalence (3.23) follows directly by negating both sides the equiv-
```
```
     alence (3.22).
```
```
         The general principle is that moving a NOT to the other side of an “9” changes
```
```
     it into “8,” and vice versa.
```
```
         These equivalences are called De Morgan’s Laws for Quantifiers because they
```
```
     can be understood as applying De Morgan’s Laws for propositional formulas to
```
```
     an infinite sequence of AND’s and OR’s. For example, we can explain (3.22) by
```
```
        

3.6. Predicate Formulas                                                               67
```

supposing the domain of discourse is fd0 ; d1 ; : : : ; dn ; : : :g. Then 9x: NOT.P .x//
means the same thing as the infinite OR:
```

        NOT.P .d0 // OR NOT .P .d1 // OR    OR NOT .P .dn // OR : : : :         (3.24)
```

Applying De Morgan’s rule to this infinite OR yields the equivalent formula
```

           NOT ŒP .d0 / AND P .d1 / AND    AND P .dn / AND : : : :             (3.25)
```

But (3.25) means the same thing as
```

                                         NOTŒ8x: P .x/:
```

This explains why 9x: NOT.P .x// means the same thing as NOTŒ8x: P .x/, which
confirms(3.22).

#### 3.6.6 Validity for Predicate Formulas
The idea of validity extends to predicate formulas, but to be valid, a formula now
must evaluate to true no matter what the domain of discourse may be, no matter
what values its variables may take over the domain, and no matter what interpreta-
tions its predicate variables may be given. For example, the equivalence (3.22) that
gives the rule for negating a universal quantifier means that the following formula
is valid:
```
                         NOT.8x: P .x// IFF 9x: NOT .P .x//:                  (3.26)
```
  Another useful example of a valid assertion is
```

                          9x8y: P .x; y/ IMPLIES 8y9x: P .x; y/:                   (3.27)
```

  Here’s an explanation why this is valid:
```

        Let D be the domain for the variables and P0 be some binary predi-
```
```
        cate3 on D. We need to show that if
```
```

                                  9x 2 D: 8y 2 D: P0 .x; y/               (3.28)
```
```

        holds under this interpretation, then so does
```
```

                                  8y 2 D 9x 2 D: P0 .x; y/:               (3.29)
```
```

        So suppose (3.28) is true. Then by definition of 9, this means that some
```
```
        element d0 2 D has the property that
```
```

                                      8y 2 D: P0 .d0 ; y/:
```
   3 That is, a predicate that depends on two variables.
```
                   

## 68 Chapter 3   Logical Formulas
```
```

                   By definition of 8, this means that
```
```

                                                  P0 .d0 ; d /
```
```

                   is true for all d 2 D. So given any d 2 D, there is an element in D,
```
```
                   namely d0 , such that P0 .d0 ; d / is true. But that’s exactly what (3.29)
```
```
                   means, so we’ve proved that (3.29) holds under this interpretation, as
```
```
                   required.
```
```

             We hope this is helpful as an explanation, but we don’t really want to call it a
```
```
           “proof.” The problem is that with something as basic as (3.27), it’s hard to see
```
```
           what more elementary axioms are ok to use in proving it. What the explanation
```
```
           above did was translate the logical formula (3.27) into English and then appeal to
```
```
           the meaning, in English, of “for all” and “there exists” as justification.
```
```
             In contrast to (3.27), the formula
```
```

                                 8y9x: P .x; y/ IMPLIES 9x8y: P .x; y/:                         (3.30)
```
```

           is not valid. We can prove this just by describing an interpretation where the hy-
```
```
           pothesis 8y9x: P .x; y/ is true but the conclusion 9x8y: P .x; y/ is not true. For
```
```
           example, let the domain be the integers and P .x; y/ mean x > y. Then the hy-
```
```
           pothesis would be true because, given a value n for y we could choose the value
```
```
           of x to be n C 1, for example. But under this interpretation the conclusion asserts
```
```
           that there is an integer that is bigger than all integers, which is certainly false. An
```
```
           interpretation like this that falsifies an assertion is called a counter-model to that
```
```
           assertion.
```

### 3.7 References
```
           [21]
```

Problems for Section 3.1
```
           Practice Problems
```
```
           Problem 3.1.
```
```
           Some people are uncomfortable with the idea that from a false hypothesis you can
```
```
           prove everything, and instead of having P IMPLIES Q be true when P is false,
```