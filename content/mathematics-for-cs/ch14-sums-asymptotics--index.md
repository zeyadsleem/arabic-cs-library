---
title: "Sums and Asymptotics"
lang: en
---

## 14 Sums and Asymptotics
```
     Sums and products arise regularly in the analysis of algorithms, financial appli-
```
```
     cations, physical problems, and probabilistic systems. For example, according to
```
```
     Theorem 2.2.1,
```
```
                                                     n.n C 1/
```
```
                              1 C 2 C 3 C  C n D           :                   (14.1)
```
```
                                                         2
```
```
     Of course, the left-hand sum could be expressed concisely as a subscripted summa-
```
```
     tion
```
```
                                            Xn
```
```
                                               i
```
```
                                            i D1
```
```

     but the right-hand expression n.n C 1/=2 is not only concise but also easier to
```
```
     evaluate. Furthermore, it more clearly reveals properties such as the growth rate
```
```
     of the sum. Expressions like n.n C 1/=2 that do not make use of subscripted
```
```
     summations or products—or those handy but sometimes troublesome sequences
```
```
     of three dots—are called closed forms.
```
```
        Another example is the closed form for a geometric sum
```
```

                                                           1    x nC1
```
```
                         1 C x C x2 C x3 C    C xn D                            (14.2)
```
```
                                                               1 x
```
```
     given in Problem 5.4. The sum as described on the left-hand side of (14.2) involves
```
```
     n additions and 1 C 2 C    C .n 1/ D .n 1/n=2 multiplications, but its closed
```
```
     form on the right-hand side can be evaluated using fast exponentiation with at most
```
```
     2 log n multiplications, a division, and a couple of subtractions. Also, the closed
```
```
     form makes the growth and limiting behavior of the sum much more apparent.
```
```
        Equations (14.1) and (14.2) were easy to verify by induction, but, as is often the
```
```
     case, the proofs by induction gave no hint about how these formulas were found in
```
```
     the first place. Finding them is part math and part art, which we’ll start examining
```
```
     in this chapter.
```
```
        Our first motivating example will be the value of a financial instrument known as
```
```
     an annuity. This value will be a large and nasty-looking sum. We will then describe
```
```
     several methods for finding closed forms for several sorts of sums, including those
```
```
     for annuities. In some cases, a closed form for a sum may not exist, and so we
```
```
     will provide a general method for finding closed forms for good upper and lower
```
```
     bounds on the sum.
```
```
        The methods we develop for sums will also work for products, since any product
```
```
     can be converted into a sum by taking its logarithm. For instance, later in the
```
```
                 

## 606 Chapter 14    Sums and Asymptotics
```
```

           chapter we will use this approach to find a good closed-form approximation to the
```
```
           factorial function
```
```
                                          nŠ WWD 1  2  3    n:
```
```
             We conclude the chapter with a discussion of asymptotic notation, especially
```
```
           “Big Oh” notation. Asymptotic notation is often used to bound the error terms
```
```
           when there is no exact closed form expression for a sum or product. It also provides
```
```
           a convenient way to express the growth rate or order of magnitude of a sum or
```
```
           product.
```

### 14.1 The Value of an Annuity
```
           Would you prefer a million dollars today or $50,000 a year for the rest of your life?
```
```
           On the one hand, instant gratification is nice. On the other hand, the total dollars
```
```
           received at $50K per year is much larger if you live long enough.
```
```
              Formally, this is a question about the value of an annuity. An annuity is a finan-
```
```
           cial instrument that pays out a fixed amount of money at the beginning of every year
```
```
           for some specified number of years. In particular, an n-year, m-payment annuity
```
```
           pays m dollars at the start of each year for n years. In some cases, n is finite, but
```
```
           not always. Examples include lottery payouts, student loans, and home mortgages.
```
```
           There are even firms on Wall Street that specialize in trading annuities.1
```
```
              A key question is, “What is an annuity worth?” For example, lotteries often pay
```
```
           out jackpots over many years. Intuitively, $50,000 a year for 20 years ought to be
```
```
           worth less than a million dollars right now. If you had all the cash right away, you
```
```
           could invest it and begin collecting interest. But what if the choice were between
```
```
           $50,000 a year for 20 years and a half million dollars today? Suddenly, it’s not
```
```
           clear which option is better.
```
```

           14.1.1       The Future Value of Money
```
```
           In order to answer such questions, we need to know what a dollar paid out in the
```
```
           future is worth today. To model this, let’s assume that money can be invested at a
```
```
           fixed annual interest rate p. We’ll assume an 8% rate2 for the rest of the discussion,
```
```
           so p D 0:08.
```
```
              1 Such trading ultimately led to the subprime mortgage disaster in 2008–2009. We’ll talk more
```
```

           about that in a later chapter.
```
```
              2 U.S. interest rates have dropped steadily for several years, and ordinary bank deposits now earn
```
```

           around 1.0%. But just a few years ago the rate was 8%; this rate makes some of our examples a little
```
```
           more dramatic. The rate has been as high as 17% in the past thirty years.
```
```
      

14.1. The Value of an Annuity                                                      607
```
```

   Here is why the interest rate p matters. Ten dollars invested today at interest rate
```
p will become .1 C p/  10 D 10:80 dollars in a year, .1 C p/2  10  11:66 dollars
in two years, and so forth. Looked at another way, ten dollars paid out a year from
now is only really worth 1=.1 C p/  10  9:26 dollars today, because if we had the
$9.26 today, we could invest it and would have $10.00 in a year anyway. Therefore,
p determines the value of money paid out in the future.
   So for an n-year, m-payment annuity, the first payment of m dollars is truly worth
m dollars. But the second payment a year later is worth only m=.1 C p/ dollars.
Similarly, the third payment is worth m=.1 C p/2 , and the n-th payment is worth
only m=.1 C p/n 1 . The total value V of the annuity is equal to the sum of the
payment values. This gives:
```
               n
```
```
               X      m
```
```
         V D
```
```
                  .1 C p/i 1
```
```
             i D1
```
```
                  n
```
```
                  X1  1 j
```
```
            Dm                               (substitute j D i     1)
```
```
                       1Cp
```
```
                   j D0
```
```
                   n
```
```
                   X1
```
```
            Dm           xj                  (substitute x D 1=.1 C p/):       (14.3)
```
```
                   j D0
```
```

   The goal of the preceding substitutions was to get the summation into the form
```
of a simple geometric sum. This leads us to an explanation of a way you could have
discovered the closed form (14.2) in the first place using the Perturbation Method.

#### 14.1.2 The Perturbation Method
Given a sum that has a nice structure, it is often useful to “perturb” the sum so that
we can somehow combine the sum with the perturbation to get something much
simpler. For example, suppose
```

                                S D 1 C x C x2 C    C xn:
```

An example of a perturbation would be
```

                                xS D x C x 2 C    C x nC1 :
```

The difference between S and xS is not so great, and so if we were to subtract xS
from S , there would be massive cancellation:
```

                       S D 1 C x C x2 C x3 C    C xn
```
```
                      xS D     x x2 x3    xn                   x nC1 :
```
```
           

## 608 Chapter 14    Sums and Asymptotics
```
```

      The result of the subtraction is
```
```

                                           S     xS D 1          x nC1 :
```
```

      Solving for S gives the desired closed-form expression in equation 14.2, namely,
```
```

                                                       1    x nC1
```
```
                                               SD                 :
```
```
                                                           1 x
```
```
      We’ll see more examples of this method when we introduce generating functions
```
```
      in Chapter 16.
```
```

      14.1.3       A Closed Form for the Annuity Value
```
```
      Using equation 14.2, we can derive a simple formula for V , the value of an annuity
```
```
      that pays m dollars at the start of each year for n years.
```
```

                   1 xn
```
```
                         
```
```
         V Dm                                       (by equations 14.3 and 14.2)   (14.4)
```
```
                    1 x
```
```
                                               !
```
```
                   1 C p .1=.1 C p//n 1
```
```
            Dm                                      (substituting x D 1=.1 C p/): (14.5)
```
```
                                p
```
```

      Equation 14.5 is much easier to use than a summation with dozens of terms. For
```
```
      example, what is the real value of a winning lottery ticket that pays $50,000 per
```
```
      year for 20 years? Plugging in m D $50,000, n D 20 and p D 0:08 gives
```
```
      V  $530,180. So because payments are deferred, the million dollar lottery is
```
```
      really only worth about a half million dollars! This is a good trick for the lottery
```
```
      advertisers.
```
```

      14.1.4       Infinite Geometric Series
```
```
      We began this chapter by asking whether you would prefer a million dollars today
```
```
      or $50,000 a year for the rest of your life. Of course, this depends on how long
```
```
      you live, so optimistically assume that the second option is to receive $50,000 a
```
```
      year forever. This sounds like infinite money! But we can compute the value of an
```
```
      annuity with an infinite number of payments by taking the limit of our geometric
```
```
      sum in equation 14.2 as n tends to infinity.
```
```

      Theorem 14.1.1. If jxj < 1, then
```
```
                                               1
```
```
                                               X                 1
```
```
                                                      xi D               :
```
```
                                                             1       x
```
```
                                               i D0
```
```
      

14.1. The Value of an Annuity                                                  609
```

Proof.
```
              1
```
```
              X                         n
```
```
                                        X
```
```
                     x i WWD lim              xi
```
```
                            n!1
```
```
              i D0                      iD0
```
```
                                        1    x nC1
```
```
                        D lim                            (by equation 14.2)
```
```
                            n!1             1 x
```
```
                                1
```
```
                        D               :
```
```
                            1       x
```
The final line follows from the fact that limn!1 x nC1 D 0 when jxj < 1.        

  In our annuity problem x D 1=.1 C p/ < 1, so Theorem 14.1.1 applies, and we
get
```
                                1
```
```
                                X
```
```
                 V Dm                  xj             (by equation 14.3)
```
```
                                j D0
```
```
                           1
```
```
                      Dm                            (by Theorem 14.1.1)
```
```
                          1 x
```
```
                          1Cp
```
```
                      Dm                              .x D 1=.1 C p//:
```
```
                           p
```

Plugging in m D $50,000 and p D 0:08, we see that the value V is only $675,000.
It seems amazing that a million dollars today is worth much more than $50,000
paid every year for eternity! But on closer inspection, if we had a million dollars
today in the bank earning 8% interest, we could take out and spend $80,000 a year,
forever. So as it turns out, this answer really isn’t so amazing after all.

#### 14.1.5 Examples
Equation 14.2 and Theorem 14.1.1 are incredibly useful in computer science.
  Here are some other common sums that can be put into closed form using equa-
```
           

## 610 Chapter 14    Sums and Asymptotics
```
```

      tion 14.2 and Theorem 14.1.1:
```
```
                                                   1  i
```
```
                                                   X  1    1
```
```
                         1 C 1=2 C 1=4 C    D                 D
```
```
                                                                 D2                       (14.6)
```
```
                                                 2      1 .1=2/
```
```
                                           i D0
```
```
                              1 
```
```
                                                       !           !
```
```
                                  1 i              1            10
```
```
                              X      
```
```
          0:99999    D 0:9          D 0:9             D 0:9       D1                   (14.7)
```
```
                                  10            1 1=10           9
```
```
                                i D0
```
```
                                                 1 
```
```
                                                      1 i                1
```
```
                                                       
```
```
                                                 X                                   2
```
```
                     1     1=2 C 1=4        D          D                      D        (14.8)
```
```
                                                     2      1           . 1=2/       3
```
```
                                               i D0
```
```
                                                       n
```
```
                                                       X1            1 2n
```
```
                      1 C 2 C 4 C    C 2n 1 D              2i D        D 2n       1    (14.9)
```
```
                                                                      1 2
```
```
                                                       i D0
```
```
                                                n
```
```
                                                X1             1 3n   3n 1
```
```
                   1 C 3 C 9 C    C 3n 1 D          3i D         D                    (14.10)
```
```
                                                                1 3     2
```
```
                                                i D0
```
```

         If the terms in a geometric sum grow smaller, as in equation 14.6, then the sum is
```
```
      said to be geometrically decreasing. If the terms in a geometric sum grow progres-
```
```
      sively larger, as in equations 14.9 and 14.10, then the sum is said to be geometrically
```
```
      increasing. In either case, the sum is usually approximately equal to the term in the
```
```
      sum with the greatest absolute value. For example, in equations 14.6 and 14.8, the
```
```
      largest term is equal to 1 and the sums are 2 and 2/3, both relatively close to 1. In
```
```
      equation 14.9, the sum is about twice the largest term. In equation 14.10, the largest
```
```
      term is 3n 1 and the sum is .3n 1/=2, which is only about a factor of 1:5 greater.
```
```
      You can see why this rule of thumb works by looking carefully at equation 14.2
```
```
      and Theorem 14.1.1.
```
```

      14.1.6       Variations of Geometric Sums
```
```
      We now know all about geometric sums—if you have one, life is easy. But in
```
```
      practice one often encounters
```
```
                                 P i sums that cannot be transformed by simple variable
```
```
      substitutions to the form x .
```
```
         A non-obvious but useful way to obtain new summation formulas from old ones
```
```
      is by differentiating or integrating with respect to x. As an example, consider the
```
```
      following sum:
```
```
                             Xn
```
```
                                 ix i D x C 2x 2 C 3x 3 C    C nx n
```
```
                               i D1
```
```
      This is not a geometric sum. The ratio between successive terms is not fixed, and
```
```
      so our formula for the sum of a geometric sum cannot be directly applied. But
```
```
      

14.1. The Value of an Annuity                                                      611
```

differentiating equation 14.2 leads to:
```
                               n
```
```
                                     !
```
```
                                        d 1 x nC1
```
```
                                                 
```
```
                         d X i
```
```
                                  x D               :                          (14.11)
```
```
                        dx              dx   1 x
```
```
                                  i D0
```

The left hand side of equation 14.11 is simply
```
                                             n
```
```
                                             X
```
```
                                                    ix i 1 :
```
```
                                             i D0
```

The right hand side of 14.11 is
```

                                  1      .n C 1/x n C nx nC1
```
```
                                                             :
```
```
                                            .1 x/2
```
Now multiplying both sides of 14.11 by x, we get
```
     n
```
```
     X              x.1     .n C 1/x n C nx nC1 /   x     .n C 1/x nC1 C nx nC2
```
```
          ix i DD                                 D
```
```
                               .1 x/2                           .1 x/2
```
```
     i D0
```
```
                                                                                (14.12)
```
So we have the desired closed-form expression for our sum. It seems a little com-
plicated, but it’s easier to work with than the sum itself. Incidentally, Problem 14.2
shows how the perturbation method could also be applied to derive an equivalent
expression
```
                            n
```
```
                           X         1 x nC1 1 C nx nC1
```
```
                              ix i D                                            (14.13)
```
```
                                     .1 x/2          1 x
```
```
                           i D0
```
```

   Notice that if jxj < 1, then this series converges to a finite value even if there
```
are infinitely many terms. Taking the limit of equation 14.12 as n tends to infinity
gives the following theorem:

Theorem 14.1.2. If jxj < 1, then
```
                                      1
```
```
                                      X                    x
```
```
                                             ix i D                  :         (14.14)
```
```
                                                      .1       x/2
```
```
                                      i D1
```

  As a consequence, suppose that there is an annuity that pays i m dollars at the
end of each year i forever. For example, if m D $50,000, then the payouts are
$50,000 and then $100,000 and then $150,000 and so on. It is hard to believe that
```
                

## 612 Chapter 14   Sums and Asymptotics
```
```

           the value of this annuity is finite! But we can use Theorem 14.1.2 to compute the
```
```
           value:
```
```
                                                      1
```
```
                                                      X         im
```
```
                                               V D
```
```
                                                             .1 C p/i
```
```
                                                      i D1
```
```
                                                             1=.1 C p/
```
```
                                                Dm                   1 2
```
```
                                                             .1      1Cp /
```
```
                                                             1Cp
```
```
                                                Dm              :
```
```
                                                              p2
```
```
           The second line follows by an application of Theorem 14.1.2. The third line is
```
```
           obtained by multiplying the numerator and denominator by .1 C p/2 .
```
```
              For example, if m D $50,000, and p D 0:08 as usual, then the value of the
```
```
           annuity is V D $8,437,500. Even though the payments increase every year, the in-
```
```
           crease is only additive with time; by contrast, dollars paid out in the future decrease
```
```
           in value exponentially with time. The geometric decrease swamps out the additive
```
```
           increase. Payments in the distant future are almost worthless, so the value of the
```
```
           annuity is finite.
```
```
              The trick of taking the derivative (or integral) of a summation formula is a good
```
```
           trick to remember, even though it may require computing some nasty derivatives.
```

### 14.2 Sums of Powers
```
           In Chapter 5, we verified the formula (14.1), but the source of this formula is still
```
```
           a mystery. Sure, we can prove that it’s true by using well ordering or induction,
```
```
           but where did the expression on the right come from in the first place? Even more
```
```
           inexplicable is the closed form expression for the sum of consecutive squares:
```
```
                                        n
```
```
                                        X              .2n C 1/.n C 1/n
```
```
                                               i2 D                     :                 (14.15)
```
```
                                                              6
```
```
                                        i D1
```
```

               It turns out that there is a way to derive these expressions, but before we explain
```
```
           it, we thought it would be fun—OK, our definition of “fun” may be different than
```
```
           yours—to show you how Gauss is supposed to have proved equation 14.1 when he
```
```
           was a young boy.
```
```
               Gauss’s idea is related to the perturbation method we used in Section 14.1.2. Let
```
```
                                                              n
```
```
                                                              X
```
```
                                                      SD             i:
```
```
                                                              i D1
```
```
     

14.2. Sums of Powers                                                            613
```

Then we can write the sum in two orders:
```
                    S D 1 C 2 C : : : C .n 1/ C n;
```
```
                    S D n C .n 1/ C : : : C 2 C 1:
```
Adding these two equations gives
```
                2S D .n C 1/ C .n C 1/ C    C .n C 1/ C .n C 1/
```
```
                       D n.n C 1/:
```
Hence,
```
                                       n.n C 1/
```
```
                                       SD       :
```
```
                                          2
```
Not bad for a young child—Gauss showed some potential. . . .
   Unfortunately, the same trick does not work for summing consecutive squares.
However, we can observe that the result might be a third-degree polynomial in n,
since the sum contains n terms that average out to a value that grows quadratically
in n. So we might guess that
```
                             n
```
```
                             X
```
```
                                    i 2 D an3 C bn2 C cn C d:
```
```
                             i D1
```
If our guess is correct, then we can determine the parameters a, b, c and d by
plugging in a few values for n. Each such value gives a linear equation in a, b,
c and d . If we plug in enough values, we may get a linear system with a unique
solution. Applying this method to our example gives:
```
                       nD0     implies 0 D d
```
```
                       nD1     implies 1 D a C b C c C d
```
```
                       nD2     implies 5 D 8a C 4b C 2c C d
```
```
                       nD3     implies 14 D 27a C 9b C 3c C d:
```
Solving this system gives the solution a D 1=3, b D 1=2, c D 1=6, d D 0.
Therefore, if our initial guess at the form of the solution was correct, then the
summation is equal to n3 =3 C n2 =2 C n=6, which matches equation 14.15.
   The point is that if the desired formula turns out to be a polynomial, then once
you get an estimate of the degree of the polynomial, all the coefficients of the
polynomial can be found automatically.
   Be careful! This method lets you discover formulas, but it doesn’t guarantee
they are right! After obtaining a formula by this method, it’s important to go back
and prove it by induction or some other method. If the initial guess at the solution
was not of the right form, then the resulting formula will be completely wrong! A
later chapter will describe a method based on generating functions that does not
require any guessing at all.
```
                 

## 614 Chapter 14   Sums and Asymptotics
```

### 14.3 Approximating Sums
```
           Unfortunately, it is not always possible to find a closed-form expression for a sum.
```
```
           For example, no closed form is known for
```
```
                                                         n
```
```
                                                         X p
```
```
                                                  SD              i:
```
```
                                                         i D1
```
```

              In such cases, we need to resort to approximations for S if we want to have a
```
```
           closed form. The good news is that there is a general method to find closed-form
```
```
           upper and lower bounds that works well for many sums. Even better, the method
```
```
           is simple and easy to remember. It works by replacing the sum by an integral and
```
```
           then adding either the first or last term in the sum.
```
```
           Definition 14.3.1. A function f W RC ! RC is strictly increasing when
```
```

                                        x < y IMPLIES f .x/ < f .y/;
```
```

           and it is weakly increasing3 when
```
```

                                        x < y IMPLIES f .x/  f .y/:
```
```

             Similarly, f is strictly decreasing when
```
```

                                        x < y IMPLIES f .x/ > f .y/;
```
```

           and it is weakly decreasing4 when
```
```

                                    x < y IMPLIES f .x/  f .y/:
```
```
                                  p
```
```
              For example, 2x and x are strictly increasing functions, while maxfx; 2g and
```
```
           dxe are weakly increasing functions. The functions 1=x and 2 x are strictly de-
```
```
           creasing, while minf1=x; 1=2g and b1=xc are weakly decreasing.
```
```
           Theorem 14.3.2. Let f W RC ! RC be a weakly increasing function. Define
```
```
                                                         n
```
```
                                                         X
```
```
                                                 S WWD          f .i /                           (14.16)
```
```
                                                         i D1
```
```
              3 Weakly increasing functions are usually called nondecreasing functions. We will avoid this
```
```

           terminology to prevent confusion between being a nondecreasing function and the much weaker
```
```
           property of not being a decreasing function.
```
```
              4 Weakly decreasing functions are usually called nonincreasing.
```
```
       

14.3. Approximating Sums                                                                615
```
```

       f.n/
```
```
      f.n�1/
```
```
        
```
```
       f.3/
```
```
       f.2/
```
```
       f.1/
```
```

                 0         1     2           3              n�2   n�1     n
```

**Figure 1      The area of the i th rectangle is f .i /. The shaded region has area**
P n
  i D1 f .i /.

and                                          Z n
```
                                     I WWD         f .x/ dx:
```
```
                                              1
```
Then
```
                               I C f .1/  S  I C f .n/:                          (14.17)
```
Similarly, if f is weakly decreasing, then
```

                               I C f .n/  S  I C f .1/:
```

Proof. Suppose f W RC ! RC is weakly increasing. The value of the sum S
in (14.16) is the sum of the areas of n unit-width rectangles of heights f .1/; f .2/; : : : ; f .n/.
This area of these rectangles is shown shaded in Figure 14.1.
   The value of                          Z n
```
                                   I D       f .x/ dx
```
```
                                             1
```
is the shaded area under the curve of f .x/ from 1 to n shown in Figure 14.2.
   Comparing the shaded regions in Figures 14.1 and 14.2 shows that S is at least
I plus the area of the leftmost rectangle. Hence,
```

                                       S  I C f .1/                               (14.18)
```

This is the lower bound for S given in (14.17).
   To derive the upper bound for S given in (14.17), we shift the curve of f .x/
from 1 to n one unit to the left as shown in Figure 14.3.
```
           

## 616 Chapter 14    Sums and Asymptotics
```
```

            f.n/
```
```
           f.n�1/
```
```
                                                f.x/
```
```

             f.3/
```
```
             f.2/
```
```
             f.1/
```
```

                        0       1          2   3       n�2    n�1      n
```
```

      Figure R14.2 The shaded area under the curve of f .x/ from 1 to n (shown in bold)
```
```
               n
```
```
      is I D 1 f .x/ dx.
```
```

            f.n/
```
```
           f.n�1/                              f.xC1/
```
```
              
```
```
             f.3/
```
```
             f.2/
```
```
             f.1/
```
```

                        0       1          2   3       n�2    n�1      n
```
```

      Figure 14.3 This curve is the same as the curve in Figure 14.2 shifted left by 1.
```
```
     

14.3. Approximating Sums                                                         617
```

  Comparing the shaded regions in Figures 14.1 and 14.3 shows that S is at most
I plus the area of the rightmost rectangle. That is,
```

                                  S  I C f .n/;
```

which is the upper bound for S given in (14.17).
  The very similar argument for the weakly decreasing case is left to Problem 14.10.
```
                                                                                 
```

  Theorem 14.3.2 provides good bounds for most sums. At worst, the bounds will
be off by the largest term in the sum. For example, we can use Theorem 14.3.2 to
bound the sum
```
                                          n
```
```
                                         X   p
```
```
                                    SD         i
```
```
                                            i D1
```

as follows.
   We begin by computing
```
                                       Z n
```
```
                                             p
```
```
                                 I D        x dx
```
```
                                        1
```
```
                                            ˇn
```
```
                                     x 3=2 ˇˇ
```
```
                                   D
```
```
                                     3=2 ˇ
```
```
                                            ˇ
```
```
                                                   1
```
```
                                    2
```
```
                                   D .n3=2              1/:
```
```
                                    3
```
We then apply Theorem 14.3.2 to conclude that
```
                   2 3=2                               2 3=2          p
```
```
                     .n     1/ C 1  S                  .n    1/ C    n
```
```
                   3                                   3
```
and thus that
```
                      2 3=2 1      2     p                        2
```
```
                        n  C  S  n3=2 C n                         :
```
```
                      3     3      3                              3
```
In other words, the sum is very close to 23 n3=2 . We’ll define several ways that one
thing can be “very close to” something else at the end of this chapter.
   As a first application of Theorem 14.3.2, we explain in the next section how it
helps in resolving a classic paradox in structural engineering.
```
                

## 618 Chapter 14    Sums and Asymptotics
```

### 14.4 Hanging Out Over the Edge
```
           Suppose you have a bunch of books and you want to stack them up, one on top
```
```
           of another in some off-center way, so the top book sticks out past books below it
```
```
           without falling over. If you moved the stack to the edge of a table, how far past
```
```
           the edge of the table do you think you could get the top book to go? Could the top
```
```
           book stick out completely beyond the edge of table? You’re not supposed to use
```
```
           glue or any other support to hold the stack in place.
```
```
              Most people’s first response to the Book Stacking Problem—sometimes also
```
```
           their second and third responses—is “No, the top book will never get completely
```
```
           past the edge of the table.” But in fact, you can get the top book to stick out as far
```
```
           as you want: one booklength, two booklengths, any number of booklengths!
```
```

           14.4.1       Formalizing the Problem
```
```
           We’ll approach this problem recursively. How far past the end of the table can we
```
```
           get one book to stick out? It won’t tip as long as its center of mass is over the table,
```
```
           so we can get it to stick out half its length, as shown in Figure 14.4.
```
```

                                                                   center of mass
```
```
                                                                      of book
```
```

                                                               1
```
```
                                                               2
```
```
                                     table
```
```

                          Figure 14.4 One book can overhang half a book length.
```
```

              Now suppose we have a stack of books that will not tip over if the bottom book
```
```
           rests on the table—call that a stable stack. Let’s define the overhang of a stable
```
```
           stack to be the horizontal distance from the center of mass of the stack to the furthest
```
```
           edge of the top book. So the overhang is purely a property of the stack, regardless
```
```
           of its placement on the table. If we place the center of mass of the stable stack at
```
```
           the edge of the table as in Figure 14.5, the overhang is how far we can get the top
```
```
     

14.4. Hanging Out Over the Edge                                                   619
```
```

                    center of mass                 overhang
```
```
                  of the whole stack
```
```

                             table
```
```

                  Figure 14.5 Overhanging the edge of the table.
```

book in the stack to stick out past the edge.
```
    In general, a stack of n books will be stable if and only if the center of mass of
```
the top i books sits over the .i C 1/st book for i D 1, 2, . . . , n 1.
```
    So we want a formula for the maximum possible overhang Bn achievable with a
```
stable stack of n books.
```
    We’ve already observed that the overhang of one book is 1/2 a book length. That
```
is,
```
                                              1
```
```
                                       B1 D :
```
```
                                              2
```
```
    Now suppose we have a stable stack of n C 1 books with maximum overhang.
```
If the overhang of the n books on top of the bottom book was not maximum, we
could get a book to stick out further by replacing the top stack with a stack of n
books with larger overhang. So the maximum overhang BnC1 of a stack of n C 1
books is obtained by placing a maximum overhang stable stack of n books on top
of the bottom book. And we get the biggest overhang for the stack of n C 1 books
by placing the center of mass of the n books right over the edge of the bottom book
as in Figure 14.6.
```
    So we know where to place the n C 1st book to get maximum overhang. In fact,
```
the reasoning above actually shows that this way of stacking n C 1 books is the
unique way to build a stable stack where the top book extends as far as possible.
All we have to do is calculate what this extension is.
```
           

## 620 Chapter 14   Sums and Asymptotics
```
```

                center of mass
```
```
               of all n+1 books
```
```

                                           }
```
```
                                                       center of mass
```
```
                                                       of top n books
```
```
                                                                        }   top n books
```
```

                                                1
```
```
                           table             2( n+1)
```
```

                       Figure 14.6 Additional overhang with n C 1 books.
```
```

         The simplest way to do that is to let the center of mass of the top n books be the
```
```
      origin. That way the horizontal coordinate of the center of mass of the whole stack
```
```
      of n C 1 books will equal the increase in the overhang. But now the center of mass
```
```
      of the bottom book has horizontal coordinate 1=2, so the horizontal coordinate of
```
```
      center of mass of the whole stack of n C 1 books is
```
```
                                    0  n C .1=2/  1      1
```
```
                                                      D          :
```
```
                                          nC1           2.n C 1/
```
```
        In other words,
```
```
                                                          1
```
```
                                      BnC1 D Bn C               ;                         (14.19)
```
```
                                                       2.n C 1/
```
```
      as shown in Figure 14.6.
```
```
         Expanding equation (14.19), we have
```
```
                                                1         1
```
```
                              BnC1 D Bn 1 C        C
```
```
                                               2n 2.n C 1/
```
```
                                             1              1    1
```
```
                                   D B1 C         C  C     C
```
```
                                           22             2n 2.n C 1/
```
```
                                       nC1
```
```
                                     1X1
```
```
                                   D         :                                            (14.20)
```
```
                                     2     i
```
```
                                          i D1
```
```

        So our next task is to examine the behavior of Bn as n grows.
```
```
     

14.4. Hanging Out Over the Edge                                                 621
```

#### 14.4.2 Harmonic Numbers
Definition 14.4.1. The nth harmonic number Hn is
```
                                                   n
```
```
                                                   X 1
```
```
                                          Hn WWD              :
```
```
                                                          i
```
```
                                                   i D1
```

  So (14.20) means that
```
                                            Hn
```
```
                                           Bn D:
```
```
                                             2
```
   The first few harmonic numbers are easy to compute. For example, H4 D 1 C
## 1 1     1     25
## 2 C 3 C 4 D 12 > 2. The fact that H4 is greater than 2 has special significance:
it implies that the total extension of a 4-book stack is greater than one full book!
This is the situation shown in Figure 14.7.
```

                                                                          1/2
```
```
                                                                    1/4
```
```
                                                              1/6
```
```
                                                          1/8
```
```
                                  Table
```
```

            Figure 14.7 Stack of four books with maximum overhang.
```

  There is good news and bad news about harmonic numbers. The bad news is
that there is no known closed-form expression for the harmonic numbers. The
good news is that we can use Theorem 14.3.2 to get close upper and lower bounds
on Hn . In particular, since
```
                            Z n              ˇn
```
```
                                1
```
```
                                  dx D ln.x/ ˇ D ln.n/;
```
```
                                             ˇ
```
```
                             1 x              1
```

Theorem 14.3.2 means that
```
                                  1
```
```
                            ln.n/ C  Hn  ln.n/ C 1:                     (14.21)
```
```
                                  n
```
In other words, the nth harmonic number is very close to ln.n/.
   Because the harmonic numbers frequently arise in practice, mathematicians have
worked hard to get even better approximations for them. In fact, it is now known
that
```
                                        1      1        .n/
```
```
                    Hn D ln.n/ C C         C        C                     (14.22)
```
```
                                       2n 12n2         120n4
```
```
           

## 622 Chapter 14    Sums and Asymptotics
```
```

      Here is a value 0:577215664 : : : called Euler’s constant, and .n/ is between 0
```
```
      and 1 for all n. We will not prove this formula.
```
```
         We are now finally done with our analysis of the book stacking problem. Plug-
```
```
      ging the value of Hn into (14.20), we find that the maximum overhang for n books
```
```
      is very close to ln.n/=2. Since ln.n/ grows to infinity as n increases, this means
```
```
      that if we are given enough books we can get a book to hang out arbitrarily far
```
```
      over the edge of the table. Of course, the number of books we need will grow as
```
```
      an exponential function of the overhang; it will take 227 books just to achieve an
```
```
      overhang of 3, never mind an overhang of 100.
```
```

      Extending Further Past the End of the Table
```
```
      The overhang we analyzed above was the furthest out the top book could extend
```
```
      past the table. This leaves open the question of if there is some better way to build
```
```
      a stable stack where some book other than the top stuck out furthest. For example,
```
```
      Figure 14.8 shows a stable stack of two books where the bottom book extends
```
```
      further out than the top book. Moreover, the bottom book extends 3/4 of a book
```
```
      length past the end of the table, which is the same as the maximum overhang for
```
```
      the top book in a two book stack.
```
```
         Since the two book arrangement in Figure 14.8(a) ties the maximum overhang
```
```
      stack in Figure 14.8(b), we could take the unique stable stack of n books where the
```
```
      top book extends furthest, and switch the top two books to look like Figure 14.8(a).
```
```
      This would give a stable stack of n books where the second from the top book
```
```
      extends the same maximum overhang distance. So for n > 1, there are at least
```
```
      two ways of building a stable stack of n books which both extend the maximum
```
```
      overhang distance—one way where the top book is furthest out, and another way
```
```
      where the second from the top book is furthest out.
```
```
         It is not too hard to prove that these are the only two ways to get a stable stack
```
```
      of books that achieves maximum overhang, providing we stick to stacking only
```
```
      one book on top of another. But there is more to the story. Building book piles
```
```
      with more than one book resting on another—think of an inverted pyramid—it is
```
```
                                                                     p
```
```
      possible to get a stack of n books to extend proportional to 3 n—much more than
```
```
      ln n—book lengths without falling over. See [16], Maximum Overhang.
```
```

      14.4.3       Asymptotic Equality
```
```
      For cases like equation 14.22 where we understand the growth of a function like Hn
```
```
      up to some (unimportant) error terms, we use a special notation, , to denote the
```
```
      leading term of the function. For example, we say that Hn  ln.n/ to indicate that
```
```
      the leading term of Hn is ln.n/. More precisely:
```
```
     

14.4. Hanging Out Over the Edge                                            623
```
```

                  table
```
```

                                  1=2                  3=4
```
```

                                        (a)
```
```

                 table
```
```

                                                 1=4     1=2
```
```

                                        (b)
```

**Figure 8 Figure (a) shows a stable stack of two books where the bottom book**
extends the same amount past the end of the table as the maximum overhang two-
book stack shown in Figure (b).
```
                  

## 624 Chapter 14   Sums and Asymptotics
```
```

           Definition 14.4.2. For functions f; g W R ! R, we say f is asymptotically equal
```
```
           to g, in symbols,
```
```
                                             f .x/  g.x/
```
```
           iff
```
```
                                               lim f .x/=g.x/ D 1:
```
```
                                               x!1
```
```

              Although it is tempting to write Hn  ln.n/ C to indicate the two leading
```
```
           terms, this is not really right. According to Definition 14.4.2, Hn  ln.n/ C c
```
```
           where c is any constant. The correct way to indicate that is the second-largest
```
```
           term is Hn ln.n/  .
```
```
              The reason that the  notation is useful is that often we do not care about lower
```
```
           order terms. For example, if n D 100, then we can compute H.n/ to great precision
```
```
           using only the two leading terms:
```
```
                                            ˇ                              ˇ
```
```
                                            ˇ 1         1            1     ˇ< 1 :
```
```
                                                                           ˇ
```
```
                       jHn ln.n/        jˇ ˇ                 C          4
```
```
                                              200 120000 120  100 ˇ 200
```
```
             We will spend a lot more time talking about asymptotic notation at the end of the
```
```
           chapter. But for now, let’s get back to using sums.
```

### 14.5 Products
```
           We’ve covered several techniques for finding closed forms for sums but no methods
```
```
           for dealing with products. Fortunately, we do not need to develop an entirely new
```
```
           set of tools when we encounter a product such as
```
```
                                                             n
```
```
                                                             Y
```
```
                                                   nŠ WWD          i:                  (14.23)
```
```
                                                            iD1
```
```

           That’s because we can convert any product into a sum by taking a logarithm. For
```
```
           example, if
```
```
                                                Yn
```
```
                                           P D      f .i /;
```
```
                                                          i D1
```
```
           then
```
```
                                                          n
```
```
                                                          X
```
```
                                               ln.P / D          ln.f .i //:
```
```
                                                          i D1
```
```
           We can then apply our summing tools to find a closed form (or approximate closed
```
```
           form) for ln.P / and then exponentiate at the end to undo the logarithm.
```
```
     

14.5. Products                                                                                     625
```
```

   For example, let’s see how this works for the factorial function nŠ. We start by
```
taking the logarithm:
```

             ln.nŠ/ D ln.1  2  3    .n            1/  n/
```
```
                       D ln.1/ C ln.2/ C ln.3/ C    C ln.n                    1/ C ln.n/
```
```
                           n
```
```
                           X
```
```
                       D          ln.i /:
```
```
                           i D1
```

  Unfortunately, no closed form for this sum is known. However, we can apply
Theorem 14.3.2 to find good closed-form bounds on the sum. To do this, we first
compute
```
                        Z n                       ˇn
```
```
                            ln.x/ dx D x ln.x/ x ˇ
```
```
                                                  ˇ
```
```
                                  1                                       1
```
```
                                                     D n ln.n/       n C 1:
```

Plugging into Theorem 14.3.2, this means that
```
                                            n
```
```
                                            X
```
```
             n ln.n/       nC1                    ln.i /  n ln.n/           n C 1 C ln.n/:
```
```
                                            i D1
```

Exponentiating then gives
```

                                        nn                       nnC1
```
```
                                                    nŠ              :                        (14.24)
```
```
                                       en 1                      en 1
```
This means that nŠ is within a factor of n of nn =e n 1 .

#### 14.5.1 Stirling’s Formula
The most commonly used product in discrete mathematics is probably nŠ, and
mathematicians have workedto find tight closed-form bounds on its value. The
most useful bounds are given in Theorem 14.5.1.

Theorem 14.5.1 (Stirling’s Formula). For all n  1,
```
                                 p       n n
```
```
                            nŠ D 2 n          e .n/
```
```
                                          e
```
where
```
                                         1              1
```
```
                                               .n/      :
```
```
                                      12n C 1          12n
```
```
           

## 626 Chapter 14   Sums and Asymptotics
```
```

         Theorem 14.5.1 can be proved by induction (with some pain), and there are lots
```
```
      of proofs using elementary calculus, but we won’t go into them.
```
```
         There are several important things to notice about Stirling’s Formula. First, .n/
```
```
      is always positive. This means that
```
```
                                            p        n n
```
```
                                       nŠ > 2 n                                   (14.25)
```
```
                                                      e
```
```
      for all n 2 NC .
```
```
         Second, .n/ tends to zero as n gets large. This means that
```
```
                                            p        n n
```
```
                                      nŠ  2 n                                    (14.26)
```
```
                                                      e
```
```
      which is impressive. After all, who would expect both  and e to show up in a
```
```
      closed-form expression that is asymptotically equal to nŠ?
```
```
         Third, .n/ is small even for small values of n. This means that Stirling’s For-
```
```
      mula provides good approximations for nŠ for most all values of n. For example, if
```
```
      we use                             p        n n
```
```
                                            2 n
```
```
                                                   e
```
```
      as the approximation for nŠ, as many people do, we are guaranteed to be within a
```
```
      factor of
```
```
                                                     1
```
```
                                         e .n/  e 12n
```
```
      of the correct value. For n  10, this means we will be within 1% of the correct
```
```
      value. For n  100, the error will be less than 0.1%.
```
```
         If we need an even closer approximation for nŠ, then we could use either
```
```
                                     p        n n
```
```
                                        2 n        e 1=12n
```
```
                                               e
```
```
      or                              p           n n
```
```
                                          2 n e 1=.12nC1/
```
```
                                          e
```
```
      depending on whether we want an upper, or a lower, bound. By Theorem 14.5.1,
```
```
      we know that both bounds will be within a factor of
```
```
                                          1     1             1
```
```
                                     e 12n    12nC1   D e 144n2 C12n
```
```

      of the correct value. For n  10, this means that either bound will be within 0.01%
```
```
      of the correct value. For n  100, the error will be less than 0.0001%.
```
```
         For quick future reference, these facts are summarized in Corollary 14.5.2 and
```
```
      Table 14.1.
```
```
                

           14.6. Double Trouble                                                             627
```
```

            Approximation            n1       n  10     n  100         n  1000
```
```
            p         n
```
```
              2 n ne                 < 10%    < 1%        < 0.1%         < 0.01%
```
```
            p         n
```
```
              2 n ne e 1=12n         < 1%     < 0.01%     < 0.0001%      < 0.000001%
```
```

           Table 14.1 Error bounds on common approximations
```
```
                                                    p        for nŠ from Theo-
```
```
                                                          n n
```
```
           rem 14.5.1. For example, if n  100, then 2 n e    approximates nŠ to
```
```
           within 0.1%.
```
```

           Corollary 14.5.2.
```
```
                                                   8
```
```
                                                   ˆ1:09       for n  1;
```
```
                                      p      n n <
```
```
                                                
```
```
                                  nŠ < 2 n        1:009      for n  10;
```
```
                                              e    ˆ
```
```
                                                     1:0009    for n  100:
```
```
                                                   :
```

### 14.6 Double Trouble
```
           Sometimes we have to evaluate sums of sums, otherwise known as double summa-
```
```
           tions. This sounds hairy, and sometimes it is. But usually, it is straightforward—
```
```
           you just evaluate the inner sum, replace it with a closed form, and then evaluate the
```
```
            

## 628 Chapter 14    Sums and Asymptotics
```
```

      outer sum (which no longer has a summation inside it). For example,5
```
```
       1         n         1 
```
```
                      !
```
```
                                        x nC1
```
```
                                              
```
```
                                  n1
```
```
      X          X        X
```
```
               n    i
```
```
             y     x D          y                                       equation 14.2
```
```
                                     1 x
```
```
      nD0          i D0             nD0
```
```
                                                    1
```
```
                                                    X                                 1
```
```
                                                                                       X
```
```
                                            1                 n                1
```
```
                                D                         y                                   y n x nC1
```
```
                                        1       x                          1       x
```
```
                                                    nD0                                 nD0
```
```
                                                                                    1
```
```
                                             1                         x          X
```
```
                                D                                                            .xy/n        Theorem 14.1.1
```
```
                                    .1      x/.1      y/               1 x
```
```
                                                                                       nD0
```
```
                                             1                                   x
```
```
                                D                                                                         Theorem 14.1.1
```
```
                                    .1      x/.1      y/              .1       x/.1         xy/
```
```
                                     .1 xy/ x.1                        y/
```
```
                                D
```
```
                                    .1 x/.1 y/.1                       xy/
```
```
                                                1 x
```
```
                                D
```
```
                                    .1      x/.1 y/.1                  xy/
```
```
                                              1
```
```
                                D                                 :
```
```
                                    .1      y/.1        xy/
```
```
         When there’s no obvious closed form for the inner sum, a special trick that is
```
```
      often useful is to try exchanging the order of summation. For example, suppose we
```
```
      want to compute the sum of the first n harmonic numbers
```
```
                                                    n                  X k
```
```
                                                                       n
```
```
                                                    X                    X              1
```
```
                                                          Hk D                                                   (14.27)
```
```
                                                                                        j
```
```
                                                    kD1                kD1 j D1
```
```

      For intuition about this sum, we can apply Theorem 14.3.2 to equation 14.21 to
```
```
      conclude that the sum is close to
```
```
                      Z n                        ˇn
```
```
                          ln.x/ dx D x ln.x/ x ˇ D n ln.n/ n C 1:
```
```
                                                 ˇ
```
```
                            1                                                  1
```
```

         Now let’s look for an exact answer. If we think about the pairs .k; j / over which
```
```
         5 OK, so maybe this one is a little hairy, but it is also fairly straightforward. Wait till you see the
```
```

      next one!
```
```
     

14.6. Double Trouble                                                                          629
```

we are summing, they form a triangle:
```

                              j
```
```
                              1     2       3           4           5 :::           n
```
```
                       k 1    1
```
```
                         2    1    1=2
```
```
                         3    1    1=2 1=3
```
```
                         4    1    1=2 1=3 1=4
```
```
                             :::
```
```
                         n    1    1=2                 :::                          1=n
```

The summation in equation 14.27 is summing each row and then adding the row
sums. Instead, we can sum the columns and then add the column sums. Inspecting
the table we see that this double sum can be written as
```
                         n              n X
```
```
                                          k
```
```
                         X              X   1
```
```
                               Hk D
```
```
                                                       j
```
```
                         kD1            kD1 j D1
```
```
                                          n
```
```
                                        n X
```
```
                                        X   1
```
```
                                   D
```
```
                                                       j
```
```
                                        j D1 kDj
```
```
                                        n   n
```
```
                                        X 1 X
```
```
                                   D                        1
```
```
                                               j
```
```
                                        j D1       kDj
```
```
                                        n
```
```
                                        X      1
```
```
                                   D             .n         j C 1/
```
```
                                               j
```
```
                                        j D1
```
```
                                        n                       n
```
```
                                        X nC1                   X j
```
```
                                   D
```
```
                                                   j                     j
```
```
                                        j D1                    j D1
```
```
                                                       n                 n
```
```
                                                       X 1               X
```
```
                                   D .n C 1/                                    1
```
```
                                                                j
```
```
                                                       j D1              j D1
```
```

                                   D .n C 1/Hn                      n:                    (14.28)
```
```
                   

## 630 Chapter 14    Sums and Asymptotics
```

### 14.7 Asymptotic Notation
```
           Asymptotic notation is a shorthand used to give a quick measure of the behavior
```
```
           of a function f .n/ as n grows large. For example, the asymptotic notation  of
```
```
           Definition 14.4.2 is a binary relation indicating that two functions grow at the same
```
```
           rate. There is also a binary relation “little oh” indicating that one function grows at
```
```
           a significantly slower rate than another and “Big Oh” indicating that one function
```
```
           grows not much more rapidly than another.
```
```

           14.7.1       Little Oh
```
```
           Definition 14.7.1. For functions f; g W R ! R, with g nonnegative, we say f is
```
```
           asymptotically smaller than g, in symbols,
```
```
                                                 f .x/ D o.g.x//;
```
```
           iff
```
```
                                                lim f .x/=g.x/ D 0:
```
```
                                                x!1
```
```

                 For example, 1000x 1:9 D o.x 2 / because
```
```
                               1000x 1:9                 1
```
```
                                lim       D 1000 lim 0:1 D 1000  0 D 0:
```
```
                         x!1      x2               x!1 x
```
```

           This argument generalizes directly to yield
```
```
           Lemma 14.7.2.
```
```
                    f D o.g/ IMPLIES c  f D o.g/                   for any constant c:   (14.29)
```
```
                            a         b
```
```
                           x D o.x /                        for constants 0  a < b:      (14.30)
```
```
                 Also, log’s grow more slowly than roots:
```
```
           Lemma 14.7.3. loga x D o.x  / for all a > 1;  > 0.
```
```
           Proof. For y  1, we have 1=y  y. Taking integrals from 1 to z, we conclude
```
```
                                                     z2
```
```
                                              ln z                                       (14.31)
```
```
                                                      2
```
```
                                                    p
```
```
           for z  1. Choose  > ı > 0 and let z D x ı in (14.31). Then
```
```
                          ı ln x   xı
```
```
                                     ;
```
```
                             2     2
```
```
                                   xı
```
```
                            ln x      D o.x  /            by Lemma 14.7.2:              (14.32)
```
```
                                   ı
```