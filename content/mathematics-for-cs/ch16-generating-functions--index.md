---
title: "Generating Functions"
lang: en
---

## 16 Generating Functions
```
            Generating Functions are one of the most surprising and useful inventions in Dis-
```
```
            crete Mathematics. Roughly speaking, generating functions transform problems
```
```
            about sequences into problems about algebra. This is great because we’ve got piles
```
```
            of algebraic rules. Thanks to generating functions, we can reduce problems about
```
```
            sequences to checking properties of algebraic expressions. This will allow us to
```
```
            use generating functions to solve all sorts of counting problems.
```
```
               Several flavors of generating functions such as ordinary, exponential, and Dirich-
```
```
            let come up regularly in combinatorial mathematics. In addition, Z-transforms,
```
```
            which are closely related to ordinary generating functions, are important in control
```
```
            theory and signal processing. But ordinary generating functions are enough to il-
```
```
            lustrate the power of the idea, so we’ll stick to them. So from now on generating
```
```
            function will mean the ordinary kind, and we will offer a taste of this large subject
```
```
            by showing how generating functions can be used to solve certain kinds of count-
```
```
            ing problems and how they can be used to find simple formulas for linear-recursive
```
```
            functions.
```

### 16.1 Infinite Series
```
            Informally, a generating function F .x/ is an infinite series
```
```

                                F .x/ D f0 C f1 x C f2 x 2 C f3 x 3 C    :             (16.1)
```
```

            We use the notation Œx n F .x/ for the coefficient of x n in the generating function
```
```
            F .x/. That is, Œx n F .x/ WWD fn .
```
```
               We can analyze the behavior of any sequence of numbers f0 ; f1 : : : fn : : : by
```
```
            regarding the elements of the sequence as successive coefficients of a generating
```
```
            function. It turns out that properties of complicated sequences that arise from
```
```
            counting, recursive definition, and programming problems are easy to explain by
```
```
            treating them as generating functions.
```
```
               Generating functions can produce noteworthy insights even when the sequence
```
```
            of coefficients is trivial. For example, let G.x/ be the generating function for the
```
```
            infinite sequence of ones 1; 1; : : : , namely, the geometric series.
```
```

                                 G.x/ WWD 1 C x C x 2 C    C x n C    :             (16.2)
```
```
           

## 736 Chapter 16    Generating Functions
```
```

      We’ll use typical generating function reasoning to derive a simple formula for
```
```
      G.x/. The approach is actually an easy version of the perturbation method of
```
```
      Section 14.1.2. Specifically,
```
```
                                 G.x/ D 1 C x C x 2 C x 3 C    C x n C   
```
```
                                xG.x/ D     x x2 x3    xn   
```
```
                      G.x/      xG.x/ D 1:
```
```
      Solving for G.x/ gives
```
```
                                                                        1
```
```
                                            1                           X
```
```
                                                    D G.x/ WWD                xn:   (16.3)
```
```
                                        1       x
```
```
                                                                        nD0
```
```
      In other words,                                             
```
```
                                                    n         1
```
```
                                                Œx  D1
```
```
                                            1 x
```
```
      Continuing with this approach yields a nice formula for
```
```
                        N.x/ WWD 1 C 2x C 3x 2 C    C .n C 1/x n C    :       (16.4)
```
```
      Specifically,
```
```
                        N.x/ D 1 C 2x C 3x 2 C 4x 3 C    C .n C 1/x n C   
```
```
                       xN.x/ D       x  2x 2 3x 3             nx n      
```
```
            N.x/                          2      3
```
```
                       xN.x/ D 1 C x C x C x C    C            x n    C 
```
```
                             D G.x/:
```
```
      Solving for N.x/ gives
```
```
                                                                           1
```
```
                                1         G.x/            X
```
```
                                        D      D N.x/ WWD   .n C 1/x n :            (16.5)
```
```
                           .1       x/2   1 x
```
```
                                                                          nD0
```
```
      In other words,                                             
```
```
                                            n            1
```
```
                                        Œx                            D n C 1:
```
```
                                                    .1       x/2
```
```

      16.1.1       Never Mind Convergence
```
```
      Equations (16.3) and (16.5) hold numerically only when jxj < 1, because both
```
```
      generating function series diverge when jxj  1. But in the context of generat-
```
```
      ing functions, we regard infinite series as formal algebraic objects. Equations such
```
```
      as (16.3) and (16.5) define symbolic identities that hold for purely algebraic rea-
```
```
      sons. In fact, good use can be made of generating functions determined by infinite
```
```
      series that don’t converge anywhere (besides x D 0). We’ll explain this further in
```
```
      Section 16.5 at the end of this chapter, but for now, take it on faith that you don’t
```
```
      need to worry about convergence.
```
```
                

           16.2. Counting with Generating Functions                                             737
```

### 16.2 Counting with Generating Functions
```
           Generating functions are particularly useful for representing and counting the num-
```
```
           ber of ways to select n things. For example, suppose there are two flavors of donuts,
```
```
           chocolate and plain. Let dn be the number of ways to select n chocolate or plain
```
```
           flavored donuts. dn D n C 1, because there are n C 1 such donut selections—all
```
```
           chocolate, 1 plain and n 1 chocolate, 2 plain and n 2 chocolate,. . . , all plain.
```
```
           We define a generating function D.x/ for counting these donut selections by letting
```
```
           the coefficient of x n be dn . This gives us equation (16.5)
```
```
                                                              1
```
```
                                              D.x/ D                    :                     (16.6)
```
```
                                                         .1       x/2
```
```

           16.2.1    Apples and Bananas too
```
```
           More generally, suppose we have two kinds of things—say, apples and bananas—
```
```
           and some constraints on how many of each may be selected. Say there are an ways
```
```
           to select n apples and bn ways to select n bananas. The generating function for
```
```
           counting apples would be
```
```
                                                   X1
```
```
                                        A.x/ WWD       an x n ;
```
```
                                                         nD0
```
```
           and for bananas would be
```
```
                                                         1
```
```
                                                         X
```
```
                                              B.x/ WWD         bn x n :
```
```
                                                         nD0
```
```
             Now suppose apples come in baskets of 6, so there is no way to select 1 to 5
```
```
           apples, one way to select 6 apples, no way to select 7, etc. In other words,
```
```
                                          (
```
```
                                           1 if n is a multiple of 6;
```
```
                                    an D
```
```
                                           0 otherwise:
```
```

           In this case we would have
```
```

                    A.x/ D 1 C x 6 C x 12 C    C x 6n C   
```
```
                           D 1 C y C y2 C    C yn C                   where y D x 6 ;
```
```
                               1        1
```
```
                           D       D          :
```
```
                             1 y      1 x6
```
```
           Let’s also suppose there are two kinds of bananas—red and yellow. Now, bn D
```
```
           n C 1 by the same reasoning used to count selections of n chocolate and plain
```
```
           

## 738 Chapter 16    Generating Functions
```
```

      donuts, and by (16.6) we have
```
```
                                                            1
```
```
                                           B.x/ D                     :
```
```
                                                       .1       x/2
```
```
         So how many ways are there to select a mix of n apples and bananas? First, we
```
```
      decide how many apples to select. This can be any number k from 0 to n. We can
```
```
      then select these apples in ak ways, by definition. This leaves n k bananas to
```
```
      be selected, which by definition can be done in bn k ways. So the total number
```
```
      of ways to select k apples and n k bananas is ak bn k . This means that the total
```
```
      number of ways to select some size n mix of apples and bananas is
```
```

                              a0 bn C a1 bn 1 C a2 bn 2 C    C an b0 :                   (16.7)
```
```

      16.2.2       Products of Generating Functions
```
```
      Now here’s the cool connection between counting and generating functions: ex-
```
```
      pression (16.7) is equal to the coefficient of x n in the product A.x/B.x/.
```
```
        In other words, we’re claiming that
```
```

      Rule (Product).
```
```

             Œx n .A.x/  B.x// D a0 bn C a1 bn 1 C a2 bn 2 C    C an b0 :              (16.8)
```
```

        To explain the generating function Product Rule, we can think about evaluating
```
```
      the product A.x/  B.x/ by using a table to identify all the cross-terms from the
```
```
      product of the sums:
```
```

                             b0 x 0         b1 x 1           b2 x 2        b3 x 3     :::
```
```

                   a0 x 0   a0 b0 x 0      a0 b1 x 1        a0 b2 x 2     a0 b3 x 3   :::
```
```

                   a1 x 1   a1 b0 x 1      a1 b1 x 2        a1 b2 x 3       :::
```
```

                   a2 x 2   a2 b0 x 2      a2 b1 x 3            :::
```
```

                   a3 x 3   a3 b0 x 3        :::
```
```

                     ::
```
```
                      :        :::
```
```

      In this layout, all the terms involving the same power of x lie on a 45-degree sloped
```
```
      diagonal. So, the index-n diagonal contains all the x n -terms, and the coefficient of
```
```
      

16.2. Counting with Generating Functions                                                      739
```

x n in the product A.x/  B.x/ is the sum of all the coefficients of the terms on this
diagonal, namely, (16.7). The sequence of coefficients of the product A.x/  B.x/
is called the convolution of the sequences .a0 ; a1 ; a2 ; : : : / and .b0 ; b1 ; b2 ; : : : /. In
addition to their algebraic role, convolutions of sequences play a prominent role in
signal processing and control theory.
   This Product Rule provides the algebraic justification for the fact that a geometric
series equals 1=.1 x/ regardless of convergence. Specifically, the constant 1
describes the generating function
```

                         1 D 1 C 0x C 0x 2 C    C 0x n C    :
```

Likewise, the expression 1        x describes the generating function
```

                    1    x D 1 C . 1/x C 0x 2 C    C 0x n C    :
```

So for the series G.x/ whose coefficients are all equal to 1, the Product Rule implies
in a purely formal way that
```

               .1    x/  G.x/ D 1 C 0x C 0x 2 C    C 0x n C    D 1:
```

In other words, under the Product Rule, the geometric series G.x/ is the multiplica-
tive inverse 1=.1 x/ of 1 x.
   Similar reasoning justifies multiplying a generating function by a constant term
by term. That is, a special case of the Product Rule is the
Rule (Constant Factor). For any constant c and generating function F .x/
```

                              Œx n .c  F .x// D c  Œx n F .x/:                        (16.9)
```

#### 16.2.3 The Convolution Rule
We can summarize the discussion above with the
Rule (Convolution). Let A.x/ be the generating function for selecting items from
a set A, and let B.x/ be the generating function for selecting items from a set B
disjoint from A. The generating function for selecting items from the union A [ B
is the product A.x/  B.x/.
   The Rule depends on a precise definition of what “selecting items from the union
A [ B” means. Informally, the idea is that the restrictions on the selection of items
from sets A and B carry over to selecting items from A [ B.1
   1 Formally, the Convolution Rule applies when there is a bijection between n-element selections

from A [ B and ordered pairs of selections from the sets A and B containing a total of n elements.
We think the informal statement is clear enough.
```
           

## 740 Chapter 16    Generating Functions
```
```

      16.2.4       Counting Donuts with the Convolution Rule
```
```
      We can use the Convolution Rule to derive in another way the generating function
```
```
      D.x/ for the number of ways to select chocolate and plain donuts given in (16.6).
```
```
      To begin, there is only one way to select exactly n chocolate donuts. That means
```
```
      every coefficient of the generating function for selecting n chocolate donuts equals
```
```
      one. So the generating function for chocolate donut selections is 1=.1 x/; likewise
```
```
      for the generating function for selecting only plain donuts. Now by the Convolution
```
```
      Rule, the generating function for the number of ways to select n donuts when both
```
```
      chocolate and plain flavors are available is
```
```
                                                 1         1                1
```
```
                                D.x/ D                            D                  :
```
```
                                             1       x 1       x       .1       x/2
```
```
      So we have derived (16.6) without appeal to (16.5).
```
```
         Our application of the Convolution Rule for two flavors carries right over to the
```
```
      general case of k flavors; the generating function for selections of donuts when k
```
```
      flavors are available is 1=.1 x/k . We already derived the formula for the number
```
```
      of ways to select a n donuts when k flavors are available, namely, nC.kn 1/ from
```
```
                                                                                   
```
```

      Corollary 15.5.3. So we have
```
```
                                                               !
```
```
                                           1        n C .k    1/
```
```
                               Œx n             D                :               (16.10)
```
```
                                        .1 x/k           n
```
```

      Extracting Coefficients from Maclaurin’s Theorem
```
```
      We’ve used a donut-counting argument to derive the coefficients of 1=.1 x/k ,
```
```
      but it’s instructive to derive this coefficient algebraically, which we can do using
```
```
      Maclaurin’s Theorem:
```
```

      Theorem 16.2.1 (Maclaurin’s Theorem).
```
```

                                           f 00 .0/ 2 f 000 .0/ 3        f .n/ .0/ n
```
```
        f .x/ D f .0/ C f 0 .0/x C                 x C         x C  C          x C  :
```
```
                                             2Š          3Š                 nŠ
```
```

         This theorem says that the nth coefficient of 1=.1 x/k is equal to its nth deriva-
```
```
      tive evaluated at 0 and divided by nŠ. Computing the nth derivative turns out not to
```
```
      be very difficult
```
```

                      dn    1
```
```
                       n
```
```
                                D k.k C 1/    .k C n                     1/.1          x/ .kCn/
```
```
                     d x .1 x/k
```
```
     

16.2. Counting with Generating Functions                                              741
```

(see Problem 16.5), so
```
                           n          
```
```
             n       1        d     1          1
```
```
           Œx          k
```
```
                           D   n       k
```
```
                                           .0/
```
```
                  .1 x/      d x .1 x/         nŠ
```
```
                                  k.k C 1/    .k C n 1/.1       0/ .kCn/
```
```
                                D
```
```
                                                  ! nŠ
```
```
                                   n C .k 1/
```
```
                                D                   :
```
```
                                        n
```

In other words, instead of using the donut-counting formula (16.10) to find the
coefficients of x n , we could have used this algebraic argument and the Convolution
Rule to derive the donut-counting formula.

#### 16.2.5 The Binomial Theorem from the Convolution Rule
The Convolution Rule also provides a new perspective on the Binomial Theo-
rem 15.6.4. Here’s how: first, work with the single-element set fa1 g. The gen-
erating function for the number of ways to select n different elements from this set
is simply 1 C x: we have 1 way to select zero elements, 1 way to select the one
element, and 0 ways to select more than one element. Similarly, the number of
ways to select n elements from any single-element set fai g has the same generating
function 1 C x. Now by the Convolution Rule, the generating function for choosing
a subset of n elements from the set fa1 ; a2 ; : : : ; am g is the product .1 C x/m of the
generating functions for selecting from each of the m one-element sets. Since        we
know that the number of ways to select n elements from a set of size m is m        n , we
conclude that that                                        !
```
                                                       m
```
```
                              Œx n .1 C x/m D             ;
```
```
                                                        n
```
which is a restatement of the Binomial Theorem 15.6.4. Thus, we have proved
the Binomial Theorem without having to analyze the expansion of the expression
.1 C x/m into a sum of products.
   These examples of counting donuts and deriving the binomial coefficients illus-
trate where generating functions get their power:

  Generating functions can allow counting problems to be solved by algebraic
manipulation, and conversely, they can allow algebraic identities to be derived by
counting techniques.
```
           

## 742 Chapter 16    Generating Functions
```
```

      16.2.6       An Absurd Counting Problem
```
```
      So far everything we’ve done with generating functions we could have done another
```
```
      way. But here is an absurd counting problem—really over the top! In how many
```
```
      ways can we fill a bag with n fruits subject to the following constraints?
```
```

           The number of apples must be even.
```
```
           The number of bananas must be a multiple of 5.
```
```
           There can be at most four oranges.
```
```
           There can be at most one pear.
```
```

        For example, there are 7 ways to form a bag with 6 fruits:
```
```
                                  Apples     6   4   4   2   2   0   0
```
```
                                  Bananas    0   0   0   0   0   5   5
```
```
                                  Oranges    0   2   1   4   3   1   0
```
```
                                   Pears     0   0   1   0   1   0   1
```
```
      These constraints are so complicated that getting a nice answer may seem impossi-
```
```
      ble. But let’s see what generating functions reveal.
```
```
         First, we’ll construct a generating function for choosing apples. We can choose a
```
```
      set of 0 apples in one way, a set of 1 apple in zero ways (since the number of apples
```
```
      must be even), a set of 2 apples in one way, a set of 3 apples in zero ways, and so
```
```
      forth. So, we have:
```
```
                                                                          1
```
```
                            A.x/ D 1 C x 2 C x 4 C x 6 C    D
```
```
                                                                     1        x2
```
```
      Similarly, the generating function for choosing bananas is:
```
```
                                                                          1
```
```
                           B.x/ D 1 C x 5 C x 10 C x 15 C    D
```
```
                                                                      1       x5
```
```
      Now, we can choose a set of 0 oranges in one way, a set of 1 orange in one way,
```
```
      and so on. However, we cannot choose more than four oranges, so we have the
```
```
      generating function:
```
```
                                                                     1 x5
```
```
                            O.x/ D 1 C x C x 2 C x 3 C x 4 D              :
```
```
                                                                     1 x
```
```
      Here the right-hand expression is simply the formula (14.2) for a finite geometric
```
```
      sum. Finally, we can choose only zero or one pear, so we have:
```
```

                                            P .x/ D 1 C x
```
```
                    

            16.3. Partial Fractions                                                            743
```
```

               The Convolution Rule says that the generating function for choosing from among
```
```
            all four kinds of fruit is:
```
```
                                                           1     1      1 x5
```
```
                            A.x/B.x/O.x/P .x/ D                              .1 C x/
```
```
                                                       1 x2 1        x5 1 x
```
```
                                                        1
```
```
                                                   D
```
```
                                                     .1 x/2
```
```
                                                   D 1 C 2x C 3x 2 C 4x 3 C   
```
```

            Almost everything cancels! We’re left with 1=.1 x/2 , which we found a power
```
```
            series for earlier: the coefficient of x n is simply n C 1. Thus, the number of ways to
```
```
            form a bag of n fruits is just n C 1. This is consistent with the example we worked
```
```
            out, since there were 7 different fruit bags containing 6 fruits. Amazing!
```
```
               This example was contrived to seem complicated at first sight so we could high-
```
```
            light the power of counting with generating functions. But the simple suggests that
```
```
            there ought to be an elementary derivation without resort to generating functions,
```
```
            and indeed there is (Problem 16.8).
```

### 16.3 Partial Fractions
```
            We got a simple solution to the seemingly impossible counting problem of Sec-
```
```
            tion 16.2.6 because its generating function simplified to the expression 1=.1 x/2 ,
```
```
            whose power series coefficients we already knew. This problem was set up so the
```
```
            answer would work out neatly, but other problems are not so neat. To solve more
```
```
            general problems using generating functions, we need ways to find power series co-
```
```
            efficients for generating functions given as formulas. Maclaurin’s Theorem 16.2.1
```
```
            is a very general method for finding coefficients, but it only applies when formulas
```
```
            for repeated derivatives can be found, which isn’t often. However, there is an auto-
```
```
            matic way to find the power series coefficients for any formula that is a quotient of
```
```
            polynomials, namely, the method of partial fractions from elementary calculus.
```
```
               The partial fraction method is based on the fact that quotients of polynomials
```
```
            can be expressed as sums of terms whose power series coefficients have nice for-
```
```
            mulas. For example when the denominator polynomial has distinct nonzero roots,
```
```
            the method rests on
```
```
            Lemma 16.3.1. Let p.x/ be a polynomial of degree less than n and let ˛1 ; : : : ; ˛n
```
```
            be distinct, nonzero numbers. Then there are constants c1 ; : : : ; cn such that
```
```
                              p.x/                           c1       c2             cn
```
```
                                                       D          C        C  C        :
```
```
               .1     ˛1 x/.1 ˛2 x/    .1   ˛n x/       1 ˛1 x   1 ˛2 x         1 ˛n x
```
```
           

## 744 Chapter 16   Generating Functions
```
```

         Let’s illustrate the use of Lemma 16.3.1 by finding the power series coefficients
```
```
      for the function
```
```
                                                     x
```
```
                                      R.x/ WWD             :
```
```
                                                1 x x2
```
```
      We can use the quadratic formula to find the roots r1 ; r2 of the denominator 1
```
```
      x x2.                                 p                p
```
```
                                        1     5         1C 5
```
```
                                 r1 D           ; r2 D          :
```
```
                                          2               2
```
```
      So
```
```
                  1 x x 2 D .x r1 /.x r2 / D r1 r2 .1 x=r1 /.1 x=r2 /:
```
```
      With a little algebra, we find that
```
```
                                                        x
```
```
                                   R.x/ D
```
```
                                             .1     ˛1 x/.1   ˛2 x/
```
```
      where
```
```
                                                    p
```
```
                                                 1C 5
```
```
                                            ˛1 D
```
```
                                                   2p
```
```
                                                 1    5
```
```
                                            ˛2 D        :
```
```
                                                   2
```
```
      Next we find c1 and c2 which satisfy:
```
```
                                     x                    c1       c2
```
```
                                                    D          C                  (16.11)
```
```
                           .1    ˛1 x/.1    ˛2 x/       1 ˛1 x   1 ˛2 x
```
```
      In general, we can do this by plugging in a couple of values for x to generate two
```
```
      linear equations in c1 and c2 and then solve the equations for c1 and c2 . A simpler
```
```
      approach in this case comes from multiplying both sides of (16.11) by the left-hand
```
```
      denominator to get
```
```
                               x D c1 .1 ˛2 x/ C c2 .1 ˛1 x/:
```
```
      Now letting x D 1=˛2 we obtain
```
```

                                         1=˛2       1                  1
```
```
                                c2 D            D       D             p ;
```
```
                                       1 ˛1 =˛2   ˛2 ˛1                 5
```
```
      and similarly, letting x D 1=˛1 we obtain
```
```
                                                   1
```
```
                                             c1 D p :
```
```
                                                    5
```
```
      

16.3. Partial Fractions                                                            745
```

Plugging these values for c1 ; c2 into equation (16.11) finally gives the partial frac-
tion expansion
```
                                                                   
```
```
                              x           1        1           1
```
```
               R.x/ D                 Dp
```
```
                        1 x x2             5 1 ˛1 x 1 ˛2 x
```
Each term in the partial fractions expansion has a simple power series given by the
geometric sum formula:
```
                             1
```
```
                                   D 1 C ˛1 x C ˛12 x 2 C   
```
```
                         1 ˛1 x
```
```
                             1
```
```
                                   D 1 C ˛2 x C ˛22 x 2 C   
```
```
                         1 ˛2 x
```
Substituting in these series gives a power series for the generating function:
```
                 1
```
```
      R.x/ D p .1 C ˛1 x C ˛12 x 2 C    / .1 C ˛2 x C ˛22 x 2 C    / ;
```
```
                                                                            
```
```
                  5
```
so
```
                               ˛n ˛n
```
```
                 Œx n R.x/ D 1p 2
```
```
                                    5
```
```
                                           p !n              p !n !
```
```
                                1      1C 5             1       5
```
```
                            Dp                                                (16.12)
```
```
                                 5        2                2
```

#### 16.3.1 Partial Fractions with Repeated Roots
Lemma 16.3.1 generalizes to the case when the denominator polynomial has a re-
peated nonzero root with multiplicity m by expanding the quotient into a sum a
terms of the form
```
                                         c
```
```
                                     .1 ˛x/k
```
where ˛ is the reciprocal of the root and k  m. A formula for the coefficients of
such a term follows from the donut formula (16.10).
```
                                                        !
```
```
                      n        c             n n C .k   1/
```
```
                    Œx                 D c˛                :             (16.13)
```
```
                           .1 ˛x/k                  n
```
When ˛ D 1, this follows from the donut formula (16.10) and termwise multipli-
cation by the constant c. The case for arbitrary ˛ follows by substituting ˛x for x
in the power series; this changes x n into .˛x/n and so has the effect of multiplying
the coefficient of x n by ˛ n .2
   2 In other words,
```

                              Œx n F .˛x/ D ˛ n  Œx n F .x/:
```
```
                

## 746 Chapter 16    Generating Functions
```

### 16.4 Solving Linear Recurrences
```
           16.4.1       A Generating Function for the Fibonacci Numbers
```
```
           The Fibonacci numbers f0 ; f1 ; : : : ; fn ; : : : are defined recursively as follows:
```
```

                              f0 WWD 0
```
```
                              f1 WWD 1
```
```
                             fn D WWDfn 1 C fn 2                       (for n  2):
```
```

           Generating functions will now allow us to derive an astonishing closed formula for
```
```
           fn .
```
```
               Let F .x/ be the generating function for the sequence of Fibonacci numbers, that
```
```
           is,
```
```
                              F .x/ WWD f0 C f1 x C f2 x 2 C    fn x n C    :
```
```
           Reasoning as we did at the start of this chapter to derive the formula for a geometric
```
```
           series, we have
```
```

                             F .x/   D f0 C                f1 x C f2 x 2 C    C   fn x n C    :
```
```
                          xF .x/     D                     f0 x   f1 x 2        fn 1 x n C    :
```
```
                         x 2 F .x/   D                            f0 x 2        fn 2 x n C    :
```
```
            F .x/.1      x x2/       D f0 C .f1                        2
```
```
                                                          f0 /x C 0x C    C        0x n C    :
```
```
                                     D 0 C                  1x C 0x 2 D x;
```
```
           so
```
```
                                                         x
```
```
                                                F .x/ D          :
```
```
                                                    1 x x2
```
```
           But F .x/ is the same as the function we used to illustrate the partial fraction method
```
```
           for finding coefficients in Section 16.3. So by equation (16.12), we arrive at what
```
```
           is called Binet’s formula:
```
```
                                                   p !n             p !n !
```
```
                                        1      1C 5             1      5
```
```
                                fn D p                                                      (16.14)
```
```
                                         5        2                2
```
```

           Binet’s formula for Fibonacci numbers is astonishing and maybe scary. It’s not
```
```
           even obvious that the expression on the right-hand side (16.14) is an integer. But
```
```
           the formula is very useful. For example, it provides—via the repeated squaring
```
```
           method—a much more efficient way to compute Fibonacci numbers than crunch-
```
```
           ing through the recurrence. It also make explicit the exponential growth of these
```
```
           numbers.
```
```
     

16.4. Solving Linear Recurrences                                                   747
```

**Figure 1 The initial configuration of the disks in the Towers of Hanoi problem.**

#### 16.4.2 The Towers of Hanoi
According to legend, there is a temple in Hanoi with three posts and 64 gold disks
of different sizes. Each disk has a hole through the center so that it fits on a post.
In the misty past, all the disks were on the first post, with the largest on the bottom
and the smallest on top, as shown in Figure 16.1.
   Monks in the temple have labored through the years since to move all the disks
to one of the other two posts according to the following rules:
```
     The only permitted action is removing the top disk from one post and drop-
```
```
      ping it onto another post.
```
```

     A larger disk can never lie above a smaller disk on any post.
```
So, for example, picking up the whole stack of disks at once and dropping them on
another post is illegal. That’s good, because the legend says that when the monks
complete the puzzle, the world will end!
  To clarify the problem, suppose there were only 3 gold disks instead of 64. Then
the puzzle could be solved in 7 steps as shown in Figure 16.2.
  The questions we must answer are, “Given sufficient time, can the monks suc-
ceed?” If so, “How long until the world ends?” And, most importantly, “Will this
happen before the final exam?”

A Recursive Solution
The Towers of Hanoi problem can be solved recursively. As we describe the pro-
cedure, we’ll also analyze the minimum number tn of steps required to solve the
n-disk problem. For example, some experimentation shows that t1 D 1 and t2 D 3.
The procedure illustrated above uses 7 steps, which shows that t3 is at most 7.
   The recursive solution has three stages, which are described below and illustrated
in Figure 16.3. For clarity, the largest disk is shaded in the figures.

Stage 1. Move the top n 1 disks from the first post to the second using the solution
```
      for n 1 disks. This can be done in tn 1 steps.
```
```
           

## 748 Chapter 16   Generating Functions
```
```

                                           1
```
```

                                           2
```
```

                                           3
```
```

                                           4
```
```

                                           5
```
```

                                           6
```
```

                                           7
```
```

      Figure 16.2 The 7-step solution to the Towers of Hanoi problem when there are
```
```
      n D 3 disks.
```
```

                                           1
```
```

                                           2
```
```

                                           3
```
```

             Figure 16.3 A recursive solution to the Towers of Hanoi problem.
```
```
     

16.4. Solving Linear Recurrences                                                   749
```

Stage 2. Move the largest disk from the first post to the third post. This takes just
```
      1 step.
```
Stage 3. Move the n 1 disks from the second post to the third post, again using
```
      the solution for n 1 disks. This can also be done in tn 1 steps.
```
   This algorithm shows that tn , the minimum number of steps required to move n
disks to a different post, is at most tn 1 C 1 C tn 1 D 2tn 1 C 1. We can use this
fact to upper bound the number of operations required to move towers of various
heights:
```
                                   t3  2  t2 C 1 D 7
```
```
                                   t4  2  t3 C 1  15
```
Continuing in this way, we could eventually compute an upper bound on t64 , the
number of steps required to move 64 disks. So this algorithm answers our first
question: given sufficient time, the monks can finish their task and end the world.
This is a shame. After all that effort, they’d probably want to smack a few high-fives
and go out for burgers and ice cream, but nope—world’s over.

Finding a Recurrence
We cannot yet compute the exact number of steps that the monks need to move the
## 64 disks, only an upper bound. Perhaps, having pondered the problem since the
beginning of time, the monks have devised a better algorithm.
  Lucky for us, there is no better algorithm. Here’s why: at some step, the monks
must move the largest disk from the first post to a different post. For this to happen,
the n 1 smaller disks must all be stacked out of the way on the only remaining
post. Arranging the n 1 smaller disks this way requires at least tn 1 moves. After
the largest disk is moved, at least another tn 1 moves are required to pile the n 1
smaller disks on top.
  This argument shows that the number of steps required is at least 2tn 1 C 1.
Since we gave an algorithm using exactly that number of steps, we can now write
an expression for tn , the number of moves required to complete the Towers of Hanoi
problem with n disks:
```
                            t0 D 0
```
```
                            tn D 2tn 1 C 1          (for n  1):
```
Solving the Recurrence
We can now find a formula for tn using generating functions. Let T .x/ be the
generating function for the tn ’s, that is,
```
                     T .x/ WWD t0 C t1 x C t2 x 2 C    tn x n C    :
```
```
            

## 750 Chapter 16    Generating Functions
```
```

      Reasoning as we did for the Fibonacci recurrence, we have
```
```

                               T .x/       D    t0 C t1 x C                          C    tn x n C   
```
```
                             2xT .x/       D         2t0 x                             2tn 1 x n C   
```
```
                           1=.1 x/         D     1     1x                                  1x n C   
```
```
       T .x/.1      2x/    1=.1 x/         D t0 1 C    0x C                          C     0x n C   
```
```
                                           D    1;
```
```
      so
```
```
                                                          1                 x
```
```
                               T .x/.1      2x/ D                 1D                ;
```
```
                                                      1       x         1       x
```
```
      and
```
```
                                                            x
```
```
                                       T .x/ D                          :
```
```
                                                 .1       2x/.1    x/
```
```
      Using partial fractions,
```
```
                                        x                  c1     c2
```
```
                                                      D        C
```
```
                                .1    2x/.1      x/       1 2x   1 x
```
```
      for some constants c1 ; c2 . Now multiplying both sides by the left hand denominator
```
```
      gives
```
```
                                   x D c1 .1 x/ C c2 .1 2x/:
```
```
      Substituting 1=2 for x yields c1 D 1 and substituting 1 for x yields c2 D 1,
```
```
      which gives
```
```
                                               1         1
```
```
                                    T .x/ D                  :
```
```
                                            1 2x 1 x
```
```
      Finally we can read off the simple formula for the numbers of steps needed to move
```
```
      a stack of n disks:
```
```
                                                               
```
```
                          n            n     1          n      1
```
```
                 tn D Œx T .x/ D Œx                 Œx            D 2n 1:
```
```
                                           1 2x              1 x
```
```

      16.4.3       Solving General Linear Recurrences
```
```
      An equation of the form
```
```

            f .n/ D c1 f .n      1/ C c2 f .n     2/ C    C cd f .n          d / C h.n/         (16.15)
```
```

      for constants ci 2 C is called a degree d linear recurrence with inhomogeneous
```
```
      term h.n/.
```
```
         The methods above can be used to solve linear recurrences with a large class of
```
```
      inhomogeneous terms. In particular, when the inhomogeneous term itself has a gen-
```
```
      erating function that can be expressed as a quotient of polynomials, the approach
```
```
                

           16.5. Formal Power Series                                                                   751
```
```

           used above to derive generating functions for the Fibonacci and Tower of Hanoi
```
```
           examples carries over to yield a quotient of polynomials that defines the generating
```
```
           function f .0/ C f .1/x C f .2/x 2 C    . Then partial fractions can be used to find
```
```
           a formula for f .n/ that is a linear combination of terms of the form nk ˛ n where k
```
```
           is a nonnegative integer  d and ˛ is the reciprocal of a root of the denominator
```
```
           polynomial. For example, see Problems 16.14, 16.15, 16.18, and 16.19.
```

### 16.5 Formal Power Series
```
           16.5.1    Divergent Generating Functions
```
```
           Let F .x/ be the generating function for nŠ, that is,
```
```

                                F .x/ WWD 1 C 1x C 2x 2 C    C nŠx n C    :
```
```

           Because x n D o.nŠ/ for all x ¤ 0, this generating function converges only at
```
```
           x D 0.3
```
```
             Next, let H.x/ be the generating function for n  nŠ, that is,
```
```

                              H.x/ WWD 0 C 1x C 4x 2 C    C n  nŠx n C    :
```
```

           Again, H.x/ converges only for x D 0, so H.x/ and F .x/ describe the same,
```
```
           trivial, partial function on the reals.
```
```
              On the other hand, F .x/ and H.x/ have different coefficients for all powers of
```
```
           x greater than 1, and we can usefully distinguish them as formal, symbolic objects.
```
```
              To illustrate this, note than by subtracting 1 from F .x/ and then dividing each
```
```
           of the remaining terms by x, we get a series where the coefficient if x n is .n C 1/Š.
```
```
           That is                                    
```
```
                                          n   F .x/ 1
```
```
                                       Œx                D .n C 1/Š :                    (16.16)
```
```
                                                   x
```
```
             Now a little further formal reasoning about F .x/ and H.x/ will allow us to
```
```
           deduce the following identity for nŠ:4
```
```
                                                  n
```
```
                                                  X
```
```
                                         nŠ D 1 C   .i        1/  .i    1/Š                      (16.17)
```
```
                                                     i D1
```
```
              3 This section is based on an example from “Use of everywhere divergent generating function,”
```
```

           mathoverflow, response 8,147 by Aaron Meyerowitz, Nov. 12, 2010.
```
```
             4 A combinatorial proof of (16.17) is given in Problem 15.72
```
```
           

## 752 Chapter 16    Generating Functions
```
```

        To prove this identity, note that from (16.16), we have
```
```
                                                                                       
```
```
             n                                          n   F .x/                   1
```
```
           Œx H.x/ WWD n  nŠ D .n C 1/Š nŠ D Œx                                          Œx n F .x/:
```
```
                                                                x
```
```

      In other words,
```
```
                                                     F .x/    1
```
```
                                     H.x/ D                           F .x/;                          (16.18)
```
```
                                                         x
```
```
      Solving (16.18) for F .x/, we get
```
```

                                                       xH.x/ C 1
```
```
                                            F .x/ D              :                                    (16.19)
```
```
                                                         1 x
```
```
      But Œx n .xH.x/ C 1/ is .n          1/  .n     1/Š for n  1 and is 1 for n D 0, so by the
```
```
      convolution formula,
```
```
                                                            n
```
```
                            n xH.x/ C 1                       X
```
```
                         Œx                         D1C             .i   1/  .i   1/Š :
```
```
                                1 x
```
```
                                                              i D1
```
```

      The identity (16.17) now follows immediately from (16.19).
```
```

      16.5.2       The Ring of Power Series
```
```
      So why don’t we have to worry about series whose radius of convergence is zero,
```
```
      and how do we justify the kind of manipulation in the previous section to derive
```
```
      the formula (16.19)? The answer comes from thinking abstractly about infinite
```
```
      sequences of numbers and operations that can be performed on them.
```
```
        For example, one basic operation combining two infinite sequences is adding
```
```
      them coordinatewise. That is, if we let
```
```

                                           G WWD .g0 ; g1 ; g2 ; : : : /;
```
```
                                       H WWD .h0 ; h1 ; h2 ; : : : /;
```
```

      then we can define the sequence sum ˚ by the rule:
```
```

                        G ˚ H WWD .g0 C h0 ; g1 C h1 ; : : : ; gn C hn ; : : : /:
```
```

      Another basic operation is sequence multiplication ˝ defined by the convolution
```
```
      rule (not coordinatewise):
```
```
                                                             n
```
```
                                                                              !
```
```
                                                             X
```
```
                 G ˝ H WWD g0 C h0 ; g0 h1 C g1 h0 ; : : : ;   gi hn i ; : : : :
```
```
                                                                            i D0
```
```
       

16.5. Formal Power Series                                                                   753
```

These operations on infinite sequences have lots of nice properties. For example,
it’s easy to check that sequence addition and multiplication are commutative:
```

                                    G ˚ H D H ˚ G;
```
```
                                    G ˝ H D H ˝ G:
```

If we let
```

                                Z WWD .0; 0; 0; : : : /;
```
```
                                 I WWD .1; 0; 0; : : : ; 0; : : : /;
```

then it’s equally easy to check that Z acts like a zero for sequences and I acts like
the number one:
```

                                        Z ˚ G D G;
```
```
                                        Z ˝ G D Z;                                     (16.20)
```
```
                                         I ˝ G D G:
```

Now if we define
```
                                G WWD . g0 ; g1 ; g2 ; : : : /
```
then
```
                                      G ˚ . G/ D Z:
```
In fact, the operations ˚ and ˝ satisfy all the commutative ring axioms described
in Section 9.7.1. The set of infinite sequences of numbers together with these op-
erations is called the ring of formal power series over these numbers.5
   A sequence H is the reciprocal of a sequence G when
```

                                         G ˝ H D I:
```

A reciprocal of G is also called a multiplicative inverse or simply an “inverse”
of G. The ring axioms imply that if there is a reciprocal, it is unique (see Prob-
lem 9.33), so the suggestive notation 1=G can be used unambiguously to denote
this reciprocal, if it exists. For example, letting
```

                              J WWD .1; 1; 0; 0; : : : ; 0; : : : /
```
```
                              K WWD .1; 1; 1; 1; : : : ; 1; : : : /;
```

the definition of ˝ implies that J ˝ K D I , and so K D 1=J and J D 1=K.
   5 The elements in the sequences may be the real numbers, complex numbers, or, more generally,

may be the elements from any given commutative ring.
```
                

## 754 Chapter 16   Generating Functions
```
```

              In the ring of formal power series, equation (16.20) implies that the zero se-
```
```
           quence Z has no inverse, so 1=Z is undefined—just as the expression 1/0 is unde-
```
```
           fined over the real numbers or the ring Zn of Section 9.7.1. It’s not hard to verify
```
```
           that a series has an inverse iff its initial element is nonzero (see Problem 16.25).
```
```
              Now we can explain the proper way to understand a generating function defini-
```
```
           tion
```
```
                                                          X1
```
```
                                              G.x/ WWD       gn x n :
```
```
                                                             nD0
```
```

           It simply means that G.x/ really refers to its infinite sequence of coefficients .g0 ; g1 ; : : : /
```
```
           in the ring of formal power series. The simple expression x can be understood as
```
```
           referring to the sequence
```
```

                                           X WWD .0; 1; 0; 0; : : : ; 0; : : : /:
```
```

           Likewise, 1     x abbreviates the sequence J above, and the familiar equation
```
```
                                           1
```
```
                                                   D 1 C x C x2 C x3 C                      (16.21)
```
```
                                       1       x
```
```
           can be understood as a way of restating the assertion that K is 1=J . In other words,
```
```
           the powers of the variable x just serve as a place holders—and as reminders of the
```
```
           definition of convolution. The equation (16.21) has nothing to do with the values
```
```
           of x or the convergence of the series. Rather, it is stating a property that holds in
```
```
           the ring of formal power series. The reasoning about the divergent series in the
```
```
           previous section is completely justified as properties of formal power series.
```

### 16.6 References
```
           [50], [25], [10] [20]
```

Problems for Section 16.1
```
           Practice Problems
```
```
           Problem 16.1.
```
```
           The notation Œx n F .x/ refers to the coefficient of x n in the generating function
```