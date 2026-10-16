---
title: "The Well Ordering Principle"
lang: en
---

## 2 The Well Ordering Principle
```
                   Every nonempty set of nonnegative integers has a smallest element.
```
```

               This statement is known as The Well Ordering Principle (WOP). Do you believe
```
```
            it? Seems sort of obvious, right? But notice how tight it is: it requires a nonempty
```
```
            set—it’s false for the empty set which has no smallest element because it has no
```
```
            elements at all. And it requires a set of nonnegative integers—it’s false for the
```
```
            set of negative integers and also false for some sets of nonnegative rationals—for
```
```
            example, the set of positive rationals. So, the Well Ordering Principle captures
```
```
            something special about the nonnegative integers.
```
```
               While the Well Ordering Principle may seem obvious, it’s hard to see offhand
```
```
            why it is useful. But in fact, it provides one of the most important proof rules in
```
```
            discrete mathematics. In this chapter, we’ll illustrate the power of this proof method
```
```
            with a few simple examples.
```

### 2.1 Well Ordering Proofs
```
            We actually
```
```
                 p       have already taken the Well Ordering Principle for granted in proving
```
```
            that 2 is irrational. That proof assumed that for any positive integers m and n,
```
```
            the fraction m=n can be written in lowest terms, that is, in the form m0 =n0 where
```
```
            m0 and n0 are positive integers with no common prime factors. How do we know
```
```
            this is always possible?
```
```
               Suppose to the contrary that there are positive integers m and n such that the
```
```
            fraction m=n cannot be written in lowest terms. Now let C be the set of positive
```
```
            integers that are numerators of such fractions. Then m 2 C , so C is nonempty. By
```
```
            WOP, there must be a smallest integer m0 2 C . So by definition of C , there is an
```
```
            integer n0 > 0 such that
```
```
                                           m0
```
```
                            the fraction      cannot be written in lowest terms.
```
```
                                           n0
```
```
            This means that m0 and n0 must have a common prime factor, p > 1. But
```
```

                                                m0 =p   m0
```
```
                                                      D    ;
```
```
                                                n0 =p   n0
```
```
                   

## 30 Chapter 2   The Well Ordering Principle
```
```

           so any way of expressing the left-hand fraction in lowest terms would also work for
```
```
           m0 =n0 , which implies
```
```
                                      m0 =p
```
```
                       the fraction         cannot be in written in lowest terms either.
```
```
                                      n0 =p
```
```
           So by definition of C , the numerator m0 =p is in C . But m0 =p < m0 , which
```
```
           contradicts the fact that m0 is the smallest element of C .
```
```
             Since the assumption that C is nonempty leads to a contradiction, it follows that
```
```
           C must be empty. That is, that there are no numerators of fractions that can’t be
```
```
           written in lowest terms, and hence there are no such fractions at all.
```
```
             We’ve been using the Well Ordering Principle on the sly from early on!
```

### 2.2 Template for WOP Proofs
```
           More generally, there is a standard way to use Well Ordering to prove that some
```
```
           property, P .n/ holds for every nonnegative integer n. Here is a standard way to
```
```
           organize such a well ordering proof:
```
```

              To prove that “P .n/ is true for all n 2 N” using the Well Ordering Principle:
```
```

                Define the set C of counterexamples to P being true. Specifically, define
```
```

                                         C WWD fn 2 N j NOT.P .n// is trueg:
```
```

                   (The notation fn j Q.n/g means “the set of all elements n for which Q.n/
```
```
                   is true.” See Section 4.1.4.)
```
```

                Assume for proof by contradiction that C is nonempty.
```
```

                By WOP, there will be a smallest element n in C .
```
```

                Reach a contradiction somehow—often by showing that P .n/ is actually
```
```
                 true or by showing that there is another member of C that is smaller than
```
```
                 n. This is the open-ended part of the proof task.
```
```

                Conclude that C must be empty, that is, no counterexamples exist.         
```
```

           2.2.1    Summing the Integers
```
```
           Let’s use this template to prove
```
```
       

2.2. Template for WOP Proofs                                                       31
```

Theorem 2.2.1.
```
                         1 C 2 C 3 C    C n D n.n C 1/=2                      (2.1)
```
for all nonnegative integers n.
  First, we’d better address a couple of ambiguous special cases before they trip us
up:
```
     If n D 1, then there is only one term in the summation, and so 1 C 2 C 3 C
```
```
         C n is just the term 1. Don’t be misled by the appearance of 2 and 3 or by
```
```
      the suggestion that 1 and n are distinct terms!
```
```

     If n D 0, then there are no terms at all in the summation. By convention, the
```
```
      sum in this case is 0.
```
So, while the three dots notation, which is called an ellipsis, is convenient, you
have to watch out for these special cases where the notation is misleading. In
fact, whenever you see an ellipsis, you should be on the lookout to be sure you
understand the pattern, watching out for the beginning and the end.
   We could have eliminated the need for guessing by rewriting the left side of (2.1)
with summation notation:
```
                               n
```
```
                               X                 X
```
```
                                      i   or            i:
```
```
                               i D1            1i n
```

Both of these expressions denote the sum of all values taken by the expression to
the right of the sigma as the variable i ranges from 1 to n. Both expressions make
it clear what (2.1) means when n D 1. The second expression makes it clear that
when n D 0, there are no terms in the sum, though you still have to know the
convention that a sum of no numbers equals 0 (the product of no numbers is 1, by
the way).
   OK, back to the proof:

Proof. By contradiction. Assume that Theorem 2.2.1 is false. Then, some nonneg-
ative integers serve as counterexamples to it. Let’s collect them in a set:
```
                                                             n.n C 1/
```
```
                 C WWD fn 2 N j 1 C 2 C 3 C    C n ¤               g:
```
```
                                                                2
```
Assuming there are counterexamples, C is a nonempty set of nonnegative integers.
So, by WOP, C has a minimum element, which we’ll call c. That is, among the
nonnegative integers, c is the smallest counterexample to equation (2.1).
   Since c is the smallest counterexample, we know that (2.1) is false for n D c but
true for all nonnegative integers n < c. But (2.1) is true for n D 0, so c > 0. This
```
                   

## 32 Chapter 2   The Well Ordering Principle
```
```

            means c 1 is a nonnegative integer, and since it is less than c, equation (2.1) is
```
```
            true for c 1. That is,
```
```
                                                                                 .c        1/c
```
```
                                       1 C 2 C 3 C    C .c             1/ D                   :
```
```
                                                                                       2
```
```
            But then, adding c to both sides, we get
```
```
                                                           .c       1/c               c2     c C 2c   c.c C 1/
```
```
              1 C 2 C 3 C    C .c         1/ C c D                     Cc D                      D          ;
```
```
                                                                2                            2            2
```
```
            which means that (2.1) does hold for c, after all! This is a contradiction, and we
```
```
            are done.                                                                       
```

### 2.3 Factoring into Primes
```
            We’ve previously taken for granted the Prime Factorization Theorem, also known
```
```
            as the Unique Factorization Theorem and the Fundamental Theorem of Arithmetic,
```
```
            which states that every integer greater than one has a unique1 expression as a prod-
```
```
            uct of prime numbers. This is another of those familiar mathematical facts which
```
```
            are taken for granted but are not really obvious on closer inspection. We’ll prove
```
```
            the uniqueness of prime factorization in a later chapter, but well ordering gives an
```
```
            easy proof that every integer greater than one can be expressed as some product of
```
```
            primes.
```
```
            Theorem 2.3.1. Every positive integer greater than one can be factored as a prod-
```
```
            uct of primes.
```
```
            Proof. The proof is by WOP.
```
```
               Let C be the set of all integers greater than one that cannot be factored as a
```
```
            product of primes. We assume C is not empty and derive a contradiction.
```
```
               If C is not empty, there is a least element n 2 C by WOP. This n can’t be prime,
```
```
            because a prime by itself is considered a (length one) product of primes, and no
```
```
            such products are in C .
```
```
               So n must be a product of two integers a and b where 1 < a; b < n. Since a
```
```
            and b are smaller than the smallest element in C , we know that a; b … C . In other
```
```
            words, a can be written as a product of primes p1 p2    pk and b as a product of
```
```
            primes q1    ql . Therefore, n D p1    pk q1    ql can be written as a product of
```
```
            primes, contradicting the claim that n 2 C . Our assumption that C is not empty
```
```
            must therefore be false.                                                                
```
```
               1 . . . unique up to the order in which the prime factors appear
```
```
                   

            2.4. Well Ordered Sets                                                              33
```

### 2.4 Well Ordered Sets
```
            A set of real numbers is well ordered when each of its nonempty subsets has a
```
```
            minimum element. The Well Ordering Principle says that the set of nonnegative
```
```
            integers is well ordered, but so are lots of other sets of real numbers according to
```
```
            this more general form of WOP. A simple example would be the set rN of numbers
```
```
            of the form rn, where r is a positive real number and n 2 N. (Why does this work?)
```
```
               Well ordering commonly comes up in computer science as a method for proving
```
```
            that computations won’t run forever. The idea is to assign a value to each successive
```
```
            step of a computation so that the values get smaller at every step. If the values are
```
```
            all from a well ordered set, then the computation can’t run forever, because if it did,
```
```
            the values assigned to its successive steps would define a subset with no minimum
```
```
            element. You’ll see several examples of this technique applied in Chapter 6 to prove
```
```
            that various state machines will eventually terminate.
```
```
               Notice that a set may have a minimum element but not be well ordered. The set
```
```
            of nonnegative rational numbers is an example: it has a minimum element zero,
```
```
            but it also has nonempty subsets that don’t have minimum elements—the positive
```
```
            rationals, for example.
```
```
               The following theorem is a tiny generalization of the Well Ordering Principle.
```
```

            Theorem 2.4.1. For any nonnegative integer n the set of integers greater than or
```
```
            equal to n is well ordered.
```
```

              This theorem is just as obvious as the Well Ordering Principle, and it would
```
```
            be harmless to accept it as another axiom. But repeatedly introducing axioms gets
```
```
            worrisome after a while, and it’s worth noticing when a potential axiom can actually
```
```
            be proved. This time we can easily prove Theorem 2.4.1 using the Well Ordering
```
```
            Principle:
```
```

            Proof. Let S be any nonempty set of integers  n. Now add n to each of the
```
```
            elements in S ; let’s call this new set S C n. Now S C n is a nonempty set of
```
```
            nonnegative integers, and so by the Well Ordering Principle, it has a minimum
```
```
            element m. But then it’s easy to see that m n is the minimum element of S . 
```
```

               The definition of well ordering states that every subset of a well ordered set
```
```
            is well ordered, and this yields two convenient, immediate corollaries of Theo-
```
```
            rem 2.4.1:
```
```

            Definition 2.4.2. A lower bound (respectively, upper bound) for a set S of real
```
```
            numbers is a number b such that b  s (respectively, b  s) for every s 2 S .
```
```
             

## 34 Chapter 2   The Well Ordering Principle
```
```

       Note that a lower or upper bound of set S is not required to be in the set.
```
```
     Corollary 2.4.3. Any set of integers with a lower bound is well ordered.
```
```
     Proof. A set of integers with a lower bound b 2 R will also have the integer n D
```
```
     bbc as a lower bound, where bbc, called the floor of b, is gotten by rounding down
```
```
     b to the nearest integer. So Theorem 2.4.1 implies the set is well ordered.      
```
```

       Corollary 2.4.3 leads to another principle we usually tahe for granted:
```
```
     Corollary 2.4.4. Any nonempty set of integers with an upper bound has a maximum
```
```
     element.
```
```
     Proof. Suppose a set S of integers has an upper bound b 2 R. Now multiply each
```
```
     element of S by -1; let’s call this new set of elements S . Now, of course, b is a
```
```
     lower bound of S . So S has a minimum element m by Corollary 2.4.3. But
```
```
     then it’s easy to see that m is the maximum element of S.                       
```
```

       Finite sets are yet another routine example of well ordered set.
```
```
     Lemma 2.4.5. Every nonempty finite set of real numbers is well ordered.
```
```
     Proof. Since subsets of finite sets are finite, it is sufficient to prove that every finite
```
```
     set has a minimum element.
```
```
        We prove this using the WOP on the size of finite sets.
```
```
        Let C be the set of positive integers n such that some set of size n has no mini-
```
```
     mum element. Assume for the sake of contradiction that C is nonempty. By WOP,
```
```
     there is a minimum integer m 2 C .
```
```
        Every set of size one obviously has a minimum element, so m  2.
```
```
        Now let F be a set of m real numbers. We will reach a contradiction by showing
```
```
     that F has a minimum element.
```
```
        So let r0 be an element of F . Since m  2, removing r0 from F leaves a
```
```
     nonempty set F 0 smaller than m. Since m is the smallest element of C , we know
```
```
     F 0 has a minimum element r1 . But that means the smaller of r0 and r1 is the
```
```
     minimum element of F .                                                                   
```
```

     2.4.1    A Different Well Ordered Set (Optional)
```
```
     The set F of fractions that can be expressed in the form n=.n C 1/:
```
```
                                     0 1 2 3       n
```
```
                                      ; ; ; ;:::;     ;:::;
```
```
                                     1 2 3 4      nC1
```
```
     is well ordered. The minimum element of any nonempty subset of F is simply the
```
```
     one with the minimum numerator when expressed in the form n=.n C 1/.
```
```
                  

           2.4. Well Ordered Sets                                                             35
```
```

              Now we can define a very different well ordered set by adding nonnegative inte-
```
```
           gers to numbers in F. That is, we take all the numbers of the form n C f where n is
```
```
           a nonnegative integer and f is a number in F. Let’s call this set of numbers—you
```
```
           guessed it—N C F. There is a simple recipe for finding the minimum number in
```
```
           any nonempty subset of N C F, which explains why this set is well ordered:
```
```

           Lemma 2.4.6. N C F is well ordered.
```
```

           Proof. Given any nonempty subset S of N C F, look at all the nonnegative integers
```
```
           n such that n C f is in S for some f 2 F. This is a nonempty set nonnegative
```
```
           integers, so by the WOP, there is a minimum such integer; call it ns .
```
```
              By definition of ns , there is some f 2 F such that nS C f is in the set S. So
```
```
           the set all fractions f such that nS C f 2 S is a nonempty subset of F, and since
```
```
           F is well ordered, this nonempty set contains a minimum element; call it fS . Now
```
```
           it easy to verify that nS C fS is the minimum element of S (Problem 2.20).      
```
```

             The set N C F is significantly different from the examples above, and it pro-
```
```
           vides a hint of the rich collection of well ordered sets. In all the earlier examples,
```
```
           each element was greater than only a finite number of other elements. In N C F,
```
```
           every element greater than or equal to 1 can be the first element in strictly decreas-
```
```
           ing sequences of elements of arbitrary finite length. For example, the following
```
```
           decreasing sequences of elements in N C F all start with 1:
```
```

                                               1; 0:
```
```
                                               1; 12 ; 0:
```
```
                                               1; 23 ; 12 ; 0:
```
```
                                               1; 34 ; 23 ; 12 ; 0:
```
```
                                                       ::
```
```
                                                        :
```
```

           Nevertheless, since N C F is well ordered, it is impossible to find an infinite de-
```
```
           creasing sequence of elements in N C F, because the set of elements in such a
```
```
           sequence would have no minimum.
```

Problems for Section 2.2
```
           Practice Problems
```
```
           Problem 2.1.
```
```
           For practice using the Well Ordering Principle, fill in the template of an easy to
```
```
            

## 36 Chapter 2   The Well Ordering Principle
```
```

     prove fact: every amount of postage that can be assembled using only 10 cent and
```
```
     15 cent stamps is divisible by 5.
```
```
        In particular, let the notation “j j k” indicate that integer j is a divisor of integer
```
```
     k, and let S.n/ mean that exactly n cents postage can be assembled using only 10
```
```
     and 15 cent stamps. Then the proof shows that
```
```

                     S.n/ IMPLIES 5 j n;        for all nonnegative integers n:           (2.2)
```
```

     Fill in the missing portions (indicated by “. . . ”) of the following proof of (2.2).
```
```

           Let C be the set of counterexamples to (2.2), namely
```
```

                                           C WWD fn j : : :g
```
```

           Assume for the purpose of obtaining a contradiction that C is nonempty.
```
```
           Then by the WOP, there is a smallest number m 2 C . This m must be
```
```
           positive because . . . .
```
```
           But if S.m/ holds and m is positive, then S.m             10/ or S.m     15/
```
```
           must hold, because . . . .
```
```
           So suppose S.m         10/ holds. Then 5 j .m       10/, because. . .
```
```
           But if 5 j .m 10/, then obviously 5 j m, contradicting the fact that m
```
```
           is a counterexample.
```
```
           Next, if S.m      15/ holds, we arrive at a contradiction in the same way.
```
```
           Since we get a contradiction in both cases, we conclude that. . .
```
```
           which proves that (2.2) holds.
```
```

     Problem 2.2.
```
```
     The Fibonacci numbers F .0/; F .1/; F .2/; : : : are defined as follows:
```
```
                               8
```
```
                               <0
```
```
                               ˆ                              if n D 0;
```
```
                      F .n/ WWD 1                             if n D 1;
```
```
                               ˆ
```
```
                                  F .n 1/ C F .n 2/ if n > 1:
```
```
                               :
```
```

       Exactly which sentence(s) in the following bogus proof contain logical errors?
```
```
     Explain.
```
```

     False Claim. Every Fibonacci number is even.
```
```
       

2.4. Well Ordered Sets                                                              37
```

Bogus proof. Let all the variables n; m; k mentioned below be nonnegative integer
valued.
```

   1. The proof is by the WOP.
```
```

   2. Let EF.n/ mean that F .n/ is even.
```
```

   3. Let C be the set of counterexamples to the assertion that EF.n/ holds for all
```
```
      n 2 N, namely,
```
```
                             C WWD fn 2 N j NOT.EF.n//g:
```
```

   4. We prove by contradiction that C is empty. So assume that C is not empty.
```
```

   5. By WOP, there is a least nonnegative integer m 2 C .
```
```

   6. Then m > 0, since F .0/ D 0 is an even number.
```
```

   7. Since m is the minimum counterexample, F .k/ is even for all k < m.
```
```

   8. In particular, F .m    1/ and F .m    2/ are both even.
```
```

   9. But by the definition, F .m/ equals the sum F .m          1/ C F .m   2/ of two
```
```
      even numbers, and so it is also even.
```

  10. That is, EF.m/ is true.

  11. This contradicts the condition in the definition of m that NOT.EF.m// holds.

  12. This contradition implies that C must be empty. Hence, F .n/ is even for all
```
      n 2 N.
```
```

                                                                                    
```

Problem 2.3.
In Chapter 2, the Well Ordering Principle was used to show that all positive rational
numbers can be written in “lowest terms,” that is, as a ratio of positive integers with
no common factor prime factor. Below is a different proof which also arrives at this
correct conclusion, but this proof is bogus. Identify every step at which the proof
makes an unjustified inference.

Bogus proof. Suppose to the contrary that there was positive rational q such that q
cannot be written in lowest terms. Now let C be the set of such rational numbers
that cannot be written in lowest terms. Then q 2 C , so C is nonempty. So there
```
             

## 38 Chapter 2    The Well Ordering Principle
```
```

     must be a smallest rational q0 2 C . So since q0 =2 < q0 , it must be possible to
```
```
     express q0 =2 in lowest terms, namely,
```
```
                                                 q0   m
```
```
                                                    D                                             (2.3)
```
```
                                                 2    n
```
```
     for positive integers m; n with no common prime factor. Now we consider two
```
```
     cases:
```
```
        Case 1: [n is odd]. Then 2m and n also have no common prime factor, and
```
```
     therefore                               m      2m
```
```
                                    q0 D 2         D
```
```
                                               n       n
```
```
     expresses q0 in lowest terms, a contradiction.
```
```
        Case 2: [n is even]. Any common prime factor of m and n=2 would also be a
```
```
     common prime factor of m and n. Therefore m and n=2 have no common prime
```
```
     factor, and so
```
```
                                                 m
```
```
                                         q0 D
```
```
                                                n=2
```
```
     expresses q0 in lowest terms, a contradiction.
```
```
       Since the assumption that C is nonempty leads to a contradiction, it follows that
```
```
     C is empty—that is, there are no counterexamples.                                
```
```

     Class Problems
```
```
     Problem 2.4.
```
```
     Use the Well Ordering Principle 2 to prove that
```
```
                                    n
```
```
                                    X            n.n C 1/.2n C 1/
```
```
                                          k2 D                    :                               (2.4)
```
```
                                                        6
```
```
                                    kD0
```
```

     for all nonnegative integers n.
```
```

     Problem 2.5.
```
```
     Use the Well Ordering Principle to prove that there is no solution over the positive
```
```
     integers to the equation:
```
```
                                    4a3 C 2b 3 D c 3 :
```
```

        2 Proofs by other methods such as induction or by appeal to known formulas for similar sums will
```
```

     not receive full credit.
```
```
       

2.4. Well Ordered Sets                                                                39
```

Problem 2.6.
You are given a series of envelopes, respectively containing 1; 2; 4; : : : ; 2m dollars.
Define
```

       Property m: For any nonnegative integer less than 2mC1 , there is a
```
```
       selection of envelopes whose contents add up to exactly that number
```
```
       of dollars.
```

Use the Well Ordering Principle (WOP) to prove that Property m holds for all
nonnegative integers m.
  Hint: Consider two cases: first, when the target number of dollars is less than
2m and second, when the target is at least 2m .

Homework Problems
Problem 2.7.
Use the Well Ordering Principle to prove that any integer greater than or equal to 8
can be represented as the sum of nonnegative integer multiples of 3 and 5.

Problem 2.8.
Use the Well Ordering Principle to prove that any integer greater than or equal to
## 50 can be represented as the sum of nonnegative integer multiples of 7, 11, and 13.

Problem 2.9.
Euler’s Conjecture in 1769 was that there are no positive integer solutions to the
equation
```
                             a4 C b 4 C c 4 D d 4 :
```
Integer values for a; b; c; d that do satisfy this equation were first discovered in
1986. So Euler guessed wrong, but it took more than two centuries to demonstrate
his mistake.
   Now let’s consider Lehman’s equation, similar to Euler’s but with some coeffi-
cients:
```
                              8a4 C 4b 4 C 2c 4 D d 4                          (2.5)
```
  Prove that Lehman’s equation (2.5) really does not have any positive integer
solutions.
  Hint: Consider the minimum value of a among all possible solutions to (2.5).
```
             

## 40 Chapter 2   The Well Ordering Principle
```
```

     Problem 2.10.
```
```
     Use the Well Ordering Principle to prove that
```
```

                                                  n  3n=3                                             (*)
```
```

     for every nonnegative integer n.
```
```
        Hint: Verify (*) for n  4 by explicit calculation.
```
```

     Problem 2.11.
```
```
     A winning configuration in the game of Mini-Tetris is a complete tiling of a 2  n
```
```
     board using only the three shapes shown below:
```
```

        For example, here are several possible winning configurations on a 2  5 board:
```
```

     (a) Let Tn denote the number of different winning configurations on a 2n board.
```
```
     Determine the values of T1 , T2 and T3 .
```
```

     (b) Express Tn in terms of Tn 1 and Tn 2 for n > 2.
```
```

      (c) Use the Well Ordering Principle to prove that the number of winning configu-
```
```
     rations on a 2  n Mini-Tetris board is:3
```
```
                                                  2nC1 C . 1/n
```
```
                                          Tn D                                                         (*)
```
```
                                                       3
```
```

     Problem 2.12.
```
```
     Mini-Tetris is a game whose objective is to provide a complete “tiling” of a n  2
```
```
     board—that is, a board consisting of two length-n columns—using tiles of specified
```
```
     shapes. In this problem we consider the following set of five tiles:
```
```
        3 A good question is how someone came up with equation        (*) in the first place. A simple Well
```
```
     Ordering proof gives no hint about this, but it should be absolutely convincing anyway.
```
```
       

2.4. Well Ordered Sets                                                             41
```

  For example, there are two possible tilings of a 1  2 board:

  Also, here are three tilings for a 2  2 board:
```

    Note that tiles may not be rotated, which is why the second and third of the above
```
tilings count as different, even though one is a 180o rotation of the other. (A 90o
degree rotation of these shapes would not count as a tiling at all.)
(a) There are four more 2  2 tilings in addition to the three above. What are they?
  Let Tn denote the number of different tilings of a n  2 board. We know that
T1 D 2 and T2 D 7. Also, T0 D 1 because there is exactly one way to tile a 0  2
board—don’t use any tiles.
(b) Tn can be specified in terms of Tn 1 and Tn 2 as follows:
```

                               Tn D 2Tn 1 C 3Tn 2                                (2.6)
```

for n  2.
Briefly explain how to justify this equation.
```
            

## 42 Chapter 2   The Well Ordering Principle
```
```

      (c) Use the Well Ordering Principle to prove that for n  0, the number Tn of
```
```
     tilings of a n  2 Mini-Tetris board is:
```
```

                                           3nC1 C . 1/n
```
```
                                                        :
```
```
                                                4
```
```

     Exam Problems
```
```
     Problem 2.13.
```
```
     Except for an easily repaired omission, the following proof using the Well Ordering
```
```
     Principle shows that every amount of postage that can be paid exactly using only
```
```
     10 cent and 15 cent stamps, is divisible by 5.
```
```
       Namely, let the notation “j j k” indicate that integer j is a divisor of integer k,
```
```
     and let S.n/ mean that exactly n cents postage can be assembled using only 10 and
```
```
     15 cent stamps. Then the proof shows that
```
```

                     S.n/ IMPLIES 5 j n;        for all nonnegative integers n:         (2.7)
```
```

     Fill in the missing portions (indicated by “. . . ”) of the following proof of (2.7), and
```
```
     at the end, identify the minor mistake in the proof and how to fix it.
```
```

           Let C be the set of counterexamples to (2.7), namely
```
```

                                 C WWD fn j S.n/ and NOT.5 j n/g
```
```

           Assume for the purpose of obtaining a contradiction that C is nonempty.
```
```
           Then by the WOP, there is a smallest number m 2 C . Then S.m 10/
```
```
           or S.m 15/ must hold, because the m cents postage is made from 10
```
```
           and 15 cent stamps, so we remove one.
```
```
           So suppose S.m         10/ holds. Then 5 j .m      10/, because. . .
```
```
           But if 5 j .m      10/, then 5 j m, because. . .
```
```
           contradicting the fact that m is a counterexample.
```
```
           Next suppose S.m 15/ holds. Then the proof for m 10 carries
```
```
           over directly for m 15 to yield a contradiction in this case as well.
```
```
           Since we get a contradiction in both cases, we conclude that C must
```
```
           be empty. That is, there are no counterexamples to (2.7), which proves
```
```
           that (2.7) holds.
```
```

        The proof makes an implicit assumption about the value of m. State the assump-
```
```
     tion and justify it in one sentence.
```
```
       

2.4. Well Ordered Sets                                                            43
```

Problem 2.14. (a) Prove using the Well Ordering Principle that, using 6¢, 14¢, and
21¢ stamps, it is possible to make any amount of postage over 50¢. To save time,
you may specify assume without proof that 50¢, 51¢, . . . 100¢ are all makeable, but
you should clearly indicate which of these assumptions your proof depends on.

(b) Show that 49¢ is not makeable.

Problem 2.15.
We’ll use the Well Ordering Principle to prove that for every positive integer n, the
sum of the first n odd numbers is n2 , that is,
```
                                   n
```
```
                                   X1
```
```
                                          .2i C 1/ D n2 ;                       (2.8)
```
```
                                   i D0
```

for all n > 0.
   Assume to the contrary that equation (2.8) failed for some positive integer n. Let
m be the least such number.
 (a) Why must there be such an m?

(b) Explain why m  2.

 (c) Explain why part (b) implies that
```
                          m
```
```
                          X1
```
```
                                 .2.i      1/ C 1/ D .m     1/2 :               (2.9)
```
```
                          i D1
```

(d) What term should be added to the left-hand side of (2.9) so the result equals
```
                                   m
```
```
                                   X
```
```
                                          .2.i   1/ C 1/‹
```
```
                                   i D1
```

 (e) Conclude that equation (2.8) holds for all positive integers n.

Problem 2.16.
Use the Well Ordering Principle (WOP) to prove that
```

                           2 C 4 C    C 2n D n.n C 1/                      (2.10)
```

for all n > 0.
```
                  

## 44 Chapter 2   The Well Ordering Principle
```
```

           Problem 2.17.
```
```
           Prove by the Well Ordering Principle that for all nonnegative integers, n:
```
```
                                                                            2
```
```
                                  3      3     3         3        n.n C 1/
```
```
                                 0 C 1 C 2 C  C n D                            :     (2.11)
```
```
                                                                     2
```
```

           Problem 2.18.
```
```
           Use the Well Ordering Principle to prove that
```
```

                                                                      n.n C 1/.n C 2/
```
```
                         1  2 C 2  3 C 3  4 C    C n.n C 1/ D                        (*)
```
```
                                                                             3
```
```
           for all integers n  1.
```
```

           Problem 2.19.
```
```
           Say a number of cents is makeable if it is the value of some set of 6 cent and 15
```
```
           cent stamps. Use the Well Ordering Principle to show that every integer that is a
```
```
           multiple of 3 and greater than or equal to twelve is makeable.
```

Problems for Section 2.4
```
           Homework Problems
```
```
           Problem 2.20.
```
```
           Complete the proof of Lemma 2.4.6 by showing that the number nS C fS is the
```
```
           minimum element in S .
```
```

           Practice Problems
```
```
           Problem 2.21.
```
```
           Indicate which of the following sets of numbers have a minimum element and
```
```
           which are well ordered. For those that are not well ordered, give an example of
```
```
           a subset with no minimum element.
```
```
                                p
```
```
            (a) The integers     2.
```
```
                                       p
```
```
            (b) The rational numbers  2.
```
```

            (c) The set of rationals of the form 1=n where n is a positive integer.
```
```
       

2.4. Well Ordered Sets                                                             45
```

 (d) The set G of rationals of the form m=n where m; n > 0 and n  g, where g
is a googol 10100 .

 (e) The set F of fractions of the form n=.n C 1/:
```
                                   0 1 2 3
```
```
                                    ; ; ; ;::::
```
```
                                   1 2 3 4
```

 (f) Let W WWD N [ F be the set consisting of the nonnegative integers along with
all the fractions of the form n=.n C 1/. Describe a length 5 decreasing sequence of
elements of W starting with 1,. . . length 50 decreasing sequence,. . . length 500.

Problem 2.22.
Use the Well Ordering Principle to prove that every finite, nonempty set of real
numbers has a minimum element.

Class Problems
Problem 2.23.
Prove that a set R of real numbers is well ordered iff there is no infinite decreasing
sequence of numbers R. In other words, there is no set of numbers ri 2 R such
that
```
                               r0 > r1 > r2 > : : : :                           (2.12)
```