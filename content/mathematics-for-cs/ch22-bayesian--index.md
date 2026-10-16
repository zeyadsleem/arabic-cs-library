---
title: "Bayesian Inference"
lang: en
---

20.5. Sums of Random Variables                                                     957
```

   The theorem generalizes straighforwardly to sequences of pairwise independent
```
random variables, possibly with different distributions, as long as all their variances
are bounded by some constant.
Theorem (Generalized Pairwise Independent Sampling). Let X1 ; X2 ; : : : be a se-
quence of pairwise independent random variables such that VarŒXi   b for some
b  0 and all i  1. Let
```
                                   X1 C X2 C    C Xn
```
```
                            An WWD                      ;
```
```
                                            n
```
```
                            n WWD ExŒAn :
```

Then for every  > 0,
```
                                               b 1
```
```
                             PrŒjAn               :
```
```
                                         n j                              (20.27)
```
```
                                              2 n
```
(a) Prove the Generalized Pairwise Independent Sampling Theorem.

(b) Conclude that the following holds:
Corollary (Generalized Weak Law of Large Numbers). For every  > 0,
```

                                 lim PrŒjAn   n j   D 1:
```
```
                            n!1
```

Problem 20.28.
Let G1 ; G2 ; G3 ; : : : ; be an infinite sequence of pairwise independent random vari-
ables with the same expectation  and the same finite variance. Let
```
                                            ˇ Pn          ˇ     
```
```
                                             ˇ i D1 Gi     ˇ
```
```
                           f .n; / WWD Pr ˇ ˇ            ˇ   :
```
```
                                                           ˇ
```
```
                                                  n
```
The Weak Law of Large Numbers can be expressed as a logical formula of the
form:
```
                    Q0 Q1 Q2 Q3 : f .n; /  1 ı
```
where Q0 ; Q1 ; Q2 ; Q3 is a sequence of four quantifiers from among:
```
                         8n; 9n; 8n  n0 ; 9n  n0 :
```
```
                         8n0 ; 9n0 ; 8n0  n; 9n0  n:
```
```
                         8ı; 9ı;     8ı > 0;   9ı > 0:
```
```
                         8; 9;     8 > 0;   9 > 0:
```
Here the n; n0 range over nonnegative integers, and ı;  range over nonnegative
real numbers.
   Write out the proper sequence Q0 ; Q1 ; Q2 ; Q3 .
```
           

## 958 Chapter 20   Deviation from the Mean
```
```

      Exam Problems
```
```
      Problem 20.29.
```
```
      You work for the president and you want to estimate the fraction p of voters in the
```
```
      entire nation that will prefer him in the upcoming elections. You do this by random
```
```
      sampling. Specifically, you select a random voter and ask them who they are going
```
```
      to vote for. You do this n times, with each voter selected with uniform probability
```
```
      and independently of other selections. Finally, you use the fraction P of voters
```
```
      who said they will vote for the President as an estimate for p.
```
```
       (a) Our theorems about sampling and distributions allow us to calculate how con-
```
```
      fident we can be that the random variable P takes a value near the constant p. This
```
```
      calculation uses some facts about voters and the way they are chosen. Indicate the
```
```
      true facts among the following:
```
```

        1. Given a particular voter, the probability of that voter preferring the President
```
```
           is p.
```
```
        2. The probability that some voter is chosen more than once in the random sam-
```
```
           ple goes to one as n increases.
```
```
        3. The probability that some voter is chosen more than once in the random sam-
```
```
           ple goes to zero as the population of voters grows.
```
```
        4. All voters are equally likely to be selected as the third in the random sample
```
```
           of n voters (assuming n  3).
```
```
        5. The probability that the second voter in the random sample will favor the
```
```
           President, given that the first voter prefers the President, is greater than p.
```
```
        6. The probability that the second voter in the random sample will favor the
```
```
           President, given that the second voter is from the same state as the first, may
```
```
           not equal p.
```
```

       (b) Suppose that according to your calculations, the following is true about your
```
```
      polling:
```
```
                                PrŒjP pj  0:04  0:95:
```
```

      You do the asking, you count how many said they will vote for the President, you
```
```
      divide by n, and find the fraction is 0.53. Among the following, Indicate the legiti-
```
```
      mate things you might say in a call to the President:
```
```

        1. Mr. President, p D 0:53!
```
```
        2. Mr. President, with probability at least 95 percent, p is within 0.04 of 0.53.
```
```
     

20.5. Sums of Random Variables                                                    959
```

  3. Mr. President, either p is within 0.04 of 0.53 or something very strange (5-
```
     in-100) has happened.
```
  4. Mr. President, we can be 95% confident that p is within 0.04 of 0.53.

Problem 20.30.
Yesterday, the programmers at a local company wrote a large program. To estimate
the fraction b of lines of code in this program that are buggy, the QA team will
take a small sample of lines chosen randomly and independently (so it is possible,
though unlikely, that the same line of code might be chosen more than once). For
each line chosen, they can run tests that determine whether that line of code is
buggy, after which they will use the fraction of buggy lines in their sample as their
estimate of the fraction b.
   The company statistician can use estimates of a binomial distribution to calculate
a value s for a number of lines of code to sample which ensures that with 97%
confidence, the fraction of buggy lines in the sample will be within 0.006 of the
actual fraction b of buggy lines in the program.
   Mathematically, the program is an actual outcome that already happened. The
random sample is a random variable defined by the process for randomly choosing
s lines from the program. The justification for the statistician’s confidence depends
on some properties of the program and how the random sample of s lines of code
from the program are chosen. These properties are described in some of the state-
ments below. Indicate which of these statements are true, and explain your answers.
```

   1. The probability that the ninth line of code in the program is buggy is b.
```
```

   2. The probability that the ninth line of code chosen for the random sample is
```
```
      defective is b.
```
```

   3. All lines of code in the program are equally likely to be the third line chosen
```
```
      in the random sample.
```
```

   4. Given that the first line chosen for the random sample is buggy, the probabil-
```
```
      ity that the second line chosen will also be buggy is greater than b.
```
```

   5. Given that the last line in the program is buggy, the probability that the next-
```
```
      to-last line in the program will also be buggy is greater than b.
```
```

   6. The expectation of the indicator variable for the last line in the random sam-
```
```
      ple being buggy is b.
```
```
                

## 960 Chapter 20   Deviation from the Mean
```
```

              7. Given that the first two lines of code selected in the random sample are the
```
```
                 same kind of statement—they might both be assignment statements, or both
```
```
                 be conditional statements, or both loop statements,. . . —the probability that
```
```
                 the first line is buggy may be greater than b.
```
```

              8. There is zero probability that all the lines in the random sample will be dif-
```
```
                 ferent.
```

Problems for Section 20.5
```
           Practice Problems
```
```
           Problem 20.31.
```
```
           A gambler plays 120 hands of draw poker, 60 hands of black jack, and 20 hands of
```
```
           stud poker per day. He wins a hand of draw poker with probability 1/6, a hand of
```
```
           black jack with probability 1/2, and a hand of stud poker with probability 1/5.
```
```
            (a) What is the expected number of hands the gambler wins in a day?
```
```

            (b) What would the Markov bound be on the probability that the gambler will win
```
```
           at least 108 hands on a given day?
```
```

            (c) Assume the outcomes of the card games are pairwise, but possibly not mutu-
```
```
           ally, independent. What is the variance in the number of hands won per day? You
```
```
           may answer with a numerical expression that is not completely evaluated.
```
```

            (d) What would the Chebyshev bound be on the probability that the gambler will
```
```
           win at least 108 hands on a given day? You may answer with a numerical expres-
```
```
           sion that is not completely evaluated.
```
```

            (e) Assuming outcomes of the card games are mutually independent, show that
```
```
           the probability that the gambler will win at least 108 hands on a given day is much
```
```
           smaller than the bound in part (d). Hint: e 1 2 ln 2  0:7
```
```

           Class Problems
```
```
           Problem 20.32.
```
```
           We want to store 2 billion records into a hash table that has 1 billion slots. Assum-
```
```
           ing the records are randomly and independently chosen with uniform probability
```
```
           of being assigned to each slot, two records are expected to be stored in each slot.
```
```
      

20.5. Sums of Random Variables                                                  961
```

Of course under a random assignment, some slots may be assigned more than two
records.
 (a) Show that the probability that a given slot gets assigned more than 23 records
is less than e 36 .
Hint: Use Chernoff’s Bound, Theorem 20.5.1,. Note that ˇ.12/ > 18, where
ˇ.c/ WWD c ln c c C 1.

 (b) Show that the probability that there is a slot that gets assigned more than 23
records is less than e 15 , which is less than 1=3; 000; 000. Hint: 109 < e 21 ; use
part (a).

  a

Problem 20.33.
Sometimes I forget a few items when I leave the house in the morning. For example,
here are probabilities that I forget various pieces of footwear:
```

                        left sock                         0:2
```
```
                        right sock                        0:1
```
```
                        left shoe                         0:1
```
```
                        right shoe                        0:3
```

(a) Let X be the number of these that I forget. What is ExŒX ?

(b) Give a tight upper bound on the probability that I forget one or more items
when no independence assumption is made about forgetting different items.

 (c) Use the Markov Bound to derive an upper bound on the probability that I
forget 3 or more items.

 (d) Now suppose that I forget each item of footwear independently. Use the
Chebyshev Bound to derive an upper bound on the probability that I forget two
or more items.

 (e) Use Murphy’s Law, Theorem 20.5.4, to derive a lower bound on the probabil-
ity that I forget one or more items.

  (f) I’m supposed to remember many other items, of course: clothing, watch, back-
pack, notebook, pencil, kleenex, ID, keys, etc. Let X be the total number of items
I remember. Suppose I remember items mutually independently and ExŒX  D 36.
Use Chernoff’s Bound to give an upper bound on the probability that I remember
## 48 or more items.
```
           

## 962 Chapter 20   Deviation from the Mean
```
```

      (g) Give an upper bound on the probability that I remember 108 or more items.
```
```

      Problem 20.34.
```
```
      Reasoning based on the Chernoff bound goes a long way in explaining the recent
```
```
      subprime mortgage collapse. A bit of standard vocabulary about the mortgage
```
```
      market is needed:
```
```

           A loan is money lent to a borrower. If the borrower does not pay on the
```
```
            loan, the loan is said to be in default, and collateral is seized. In the case of
```
```
            mortgage loans, the borrower’s home is used as collateral.
```
```

           A bond is a collection of loans, packaged into one entity. A bond can be
```
```
            divided into tranches, in some ordering, which tell us how to assign losses
```
```
            from defaults. Suppose a bond contains 1000 loans, and is divided into 10
```
```
            tranches of 100 bonds each. Then, all the defaults must fill up the lowest
```
```
            tranche before the affect others. For example, suppose 150 defaults hap-
```
```
            pened. Then, the first 100 defaults would occur in tranche 1, and the next 50
```
```
            defaults would happen in tranche 2.
```
```

           The lowest tranche of a bond is called the mezzanine tranche.
```
```

           We can make a “super bond” of tranches called a collateralized debt obli-
```
```
            gation (CDO) by collecting mezzanine tranches from different bonds. This
```
```
            super bond can then be itself separated into tranches, which are again ordered
```
```
            to indicate how to assign losses.
```
```

       (a) Suppose that 1000 loans make up a bond, and the fail rate is 5% in a year.
```
```
      Assuming mutual independence, give an upper bound for the probability that there
```
```
      are one or more failures in the second-worst tranche. What is the probability that
```
```
      there are failures in the best tranche?
```
```

       (b) Now, do not assume that the loans are independent. Give an upper bound for
```
```
      the probability that there are one or more failures in the second tranche. What is an
```
```
      upper bound for the probability that the entire bond defaults? Show that it is a tight
```
```
      bound. Hint: Use Markov’s theorem.
```
```

       (c) Given this setup (and assuming mutual independence between the loans), what
```
```
      is the expected failure rate in the mezzanine tranche?
```
```

       (d) We take the mezzanine tranches from 100 bonds and create a CDO. What is
```
```
      the expected number of underlying failures to hit the CDO?
```
```
     

20.5. Sums of Random Variables                                                   963
```

 (e) We divide this CDO into 10 tranches of 1000 bonds each. Assuming mutual
independence, give an upper bound on the probability of one or more failures in the
best tranche. The third tranche?

 (f) Repeat the previous question without the assumption of mutual independence.

Homework Problems
Problem 20.35.
We have two coins: one is a fair coin, but the other produces heads with probability
3=4. One of the two coins is picked, and this coin is tossed n times. Use the
Chernoff Bound to determine the smallest n which allows determination of which
coin was picked with 95% confidence.

Problem 20.36.
An infinite version of Murphy’s Law is that if an infinite number of mutually inde-
pendent events are expected to happen, then the probability that only finitely many
happen is 0. This is known as the first Borel-Cantelli Lemma.
 (a) Let A0 ; A1 ; : : : be any infinite sequence of mutually independent events such
that                                 X
```
                                          PrŒAn  D 1:                        (20.28)
```
```
                                 n2N
```

Prove that PrŒno An occurs D 0.
Hint: Bk the event that no An with n  k occurs. So the event that no An occurs is
```
                                        \
```
```
                                 B WWD     Bk :
```
```
                                         k2N
```

Apply Murphy’s Law, Theorem 20.5.4, to Bk .

(b) Conclude that PrŒonly finitely many An ’s occur D 0.
Hint: Let Ck be the event that no An with n  k occurs. So the event that only
finitely many An ’s occur is           [
```
                                 C WWD    Ck :
```
```
                                         k2N
```

Apply part (a) to Ck .
```
                

## 21 Random Walks
```
```
           Random Walks are used to model situations in which an object moves in a se-
```
```
           quence of steps in randomly chosen directions. For example, physicists use three-
```
```
           dimensional random walks to model Brownian motion and gas diffusion. In this
```
```
           chapter we’ll examine two examples of random walks. First, we’ll model gambling
```
```
           as a simple 1-dimensional random walk—a walk along a straight line. Then we’ll
```
```
           explain how the Google search engine used random walks through the graph of
```
```
           world-wide web links to determine the relative importance of websites.
```

### 21.1 Gambler’s Ruin
```
           Suppose a gambler starts with an initial stake of n dollars and makes a sequence of
```
```
           $1 bets. If he wins an individual bet, he gets his money back plus another $1. If he
```
```
           loses the bet, he loses the $1.
```
```
              We can model this scenario as a random walk between integer points on the real
```
```
           line. The position on the line at any time corresponds to the gambler’s cash-on-
```
```
           hand, or capital. Walking one step to the right corresponds to winning a $1 bet
```
```
           and thereby increasing his capital by $1. Similarly, walking one step to the left
```
```
           corresponds to losing a $1 bet.
```
```
              The gambler plays until either he runs out of money or increases his capital to a
```
```
           target amount of T dollars. The amount T n is defined to be his intended profit.
```
```
              If he reaches his target, he will have won his intended profit and is called an
```
```
           overall winner. If his capital reaches zero before reaching his target, he will have
```
```
           lost n dollars; this is called going broke or being ruined. We’ll assume that the
```
```
           gambler has the same probability p of winning each individual $1 bet, and that the
```
```
           bets are mutually independent. We’d like to find the probability that the gambler
```
```
           wins.
```
```
              The gambler’s situation as he proceeds with his $1 bets is illustrated in Fig-
```
```
           ure 21.1. The random walk has boundaries at 0 and T . If the random walk ever
```
```
           reaches either of these boundary values, then it terminates.
```
```
              In an unbiased game, the individual bets are fair: the gambler is equally likely
```
```
           to win or lose each bet—that is, p D 1=2. The gambler is more likely to win if
```
```
           p > 1=2 and less likely to win if p < 1=2; these random walks are called biased.
```
```
           We want to determine the probability that the walk terminates at boundary T —the
```
```
           probability that the gambler wins. We’ll do this in Section 21.1.1. But before we
```
```
           

## 966 Chapter 21   Random Walks
```
```

         T=n+m
```
```

        gambler’s                                           bet outcomes:
```
```
         capital                                           WLLWLWWLLL
```
```
                 n
```
```

                                     time
```
```
      Figure 21.1 A graph of the gambler’s capital versus time for one possible se-
```
```
      quence of bet outcomes. At each time step, the graph goes up with probabil-
```
```
      ity p and down with probability 1 p. The gambler continues betting until the
```
```
      graph reaches either 0 or T . If he starts with $n, his intended profit is $m where
```
```
      T D n C m.
```
```

      derive the probability, let’s examine what it turns out to be.
```
```
         Let’s begin by supposing the gambler plays an unbiased game starting with $100
```
```
      and will play until he goes broke or reaches a target of 200 dollars. Since he starts
```
```
      equidistant from his target and bankruptcy in this case, it’s clear by symmetry that
```
```
      his probability of winning is 1/2.
```
```
         We’ll show below that starting with n dollars and aiming for a target of T  n
```
```
      dollars, the probability the gambler reaches his target before going broke is n=T .
```
```
      For example, suppose he wants to win the same $100, but instead starts out with
```
```
      $500. Now his chances are pretty good: the probability of his making the 100
```
```
      dollars is 5=6. And if he started with one million dollars still aiming to win $100
```
```
      dollars he almost certain to win: the probability is 1M=.1M C 100/ > :9999.
```
```
         So in the unbiased game, the larger the initial stake relative to the target, the
```
```
      higher the probability the gambler will win, which makes some intuitive sense. But
```
```
      note that although the gambler now wins nearly all the time, when he loses, he
```
```
      loses big. Bankruptcy costs him $1M, while when he wins, he wins only $100.
```
```
      The gambler’s average win remains zero dollars, which is what you’d expect when
```
```
      making fair bets.
```
```
         Another useful way to describe this scenario is as a game between two players.
```
```
      Say Albert starts with $500, and Eric starts with $100. They flip a fair coin, and
```
```
      

21.1. Gambler’s Ruin                                                                       967
```

every time a Head appears, Albert wins $1 from Eric, and vice versa for Tails.
They play this game until one person goes bankrupt. This problem is identical to
the Gambler’s Ruin problem with n D 500 and T D 100 C 500 D 600. The
probability of Albert winning is 500=600 D 5=6.
   Now suppose instead that the gambler chooses to play roulette in an American
casino, always betting $1 on red. Because the casino puts two green numbers on its
roulette wheels, the probability of winning a single bet is a little less than 1/2. The
casino has an advantage, but the bets are close to fair, and you might expect that
starting with $500, the gambler has a reasonable chance of winning $100—the 5/6
probability of winning in the unbiased game surely gets reduced, but perhaps not
too drastically.
   This mistaken intuition is how casinos stay in business. In fact, the gambler’s
odds of winning $100 by making $1 bets against the “slightly” unfair roulette wheel
are less than 1 in 37,000. If that’s surprising to you, it only gets weirder from here:
## 1 in 37,000 is in fact an upper bound on the gambler’s chance of winning regardless
of his starting stake. Whether he starts with $5000 or $5 billion, he still has almost
no chance of winning!

#### 21.1.1 The Probability of Avoiding Ruin
We will determine the probability that the gambler wins using an idea of Pascal’s
dating back to the beginnings probability theory in the mid-seventeenth century.
```
    Pascal viewed the walk as a two-player game between Albert and Eric as de-
```
scribed above. Albert starts with a stack of n chips and Eric starts with a stack of
m D T n chips. At each bet, Albert wins Eric’s top chip with probability p and
loses his top chip to Eric with probability q WWD 1 p. They play this game until
one person goes bankrupt.
```
    Pascal’s ingenious idea was to alter the worth of the chips to make the game
```
fair regardless of p. Specifically, Pascal assigned Albert’s bottom chip a worth of
r WWDq=p and then assigned successive chips up his stack worths equal to r 2 ; r 3 ; : : :
up to his top chip with worth r n . Eric’s top chip gets assigned worth r nC1 , and the
successive chips down his stack are worth r nC2 ; r nC3 ; : : : down to his bottom chip
worth r nCm .
```
    The expected payoff of Albert’s first bet is worth
```
```
                                                 
```
```
                     nC1       n            n q
```
```
                   r     p r q D r                p r n  q D 0:
```
```
                                                p
```

so this assignment makes the first bet a fair one in terms of worth. Moreover,
whether Albert wins or loses the bet, the successive chip worths counting up Al-
bert’s stack and then down Eric’s remain r; r 2 ; : : : ; r n ; : : : ; r nCm , ensuring by the
```
            

## 968 Chapter 21   Random Walks
```
```

      same reasoning that every bet has fair worth. So, Albert’s expected worth at the
```
```
      end of the game is the sum of the expectations of the worth of each bet, which is
```
```
      0.1
```
```
         When Albert wins all of Eric’s chips his total gain is worth
```
```
                                                   nCm
```
```
                                                   X
```
```
                                                            ri ;
```
```
                                                  i DnC1
```
```
                                                                                        Pn     i
```
```
      and when he loses all his chips to Eric, his total loss is worth                   i D1 r . Letting wn
```
```
      be Albert’s probability of winning, we now have
```
```
                                                                     nCm
```
```
                                                                     X                          n
```
```
                                                                                                X
```
```
              0 D ExŒworth of Albert’s payoff D wn                           ri   .1    wn /          ri :
```
```
                                                                     i DnC1                     i D1
```
```

      In the truly fair game when r D 1, we have 0 D mwn                            n.1      wn /, so wn D
```
```
      n=.n C m/, as claimed above.
```
```
        In the biased game with r ¤ 1, we have
```
```

                                    r nCm r n                        rn 1
```
```
                          0Dr                 wn              r         .1      wn /:
```
```
                                       r 1                            r 1
```
```
      Solving for wn gives
```
```
                                                 rn     1            rn       1
```
```
                                       wn D                     D                                             (21.1)
```
```
                                               r nCm        1        rT       1
```
```
         We have now proved
```
```

      Theorem 21.1.1. In the Gambler’s Ruin game with initial capital n, target T , and
```
```
      probability p of winning each individual bet,
```
```
                                                  n               1
```
```
                                               8
```
```
                                               ˆ
```
```
                                               ˆ        for p D ;
```
```
                                               <T
```
```
                                               ˆ                  2
```
```
                       PrŒthe gambler wins D                                    (21.2)
```
```
                                               ˆ
```
```
                                               ˆ  r n 1           1
```
```
                                                        for p ¤ ;
```
```
                                               ˆ
```
```
                                               :
```
```
                                                 rT 1             2
```
```
      where r WWD q=p.
```
```
         1 Here we’re legitimately appealing to infinite linearity, since the payoff amounts remain bounded
```
```

      independent of the number of bets.
```
```
     

21.1. Gambler’s Ruin                                                                969
```

#### 21.1.2 A Recurrence for the Probability of Winning
Fortunately, you don’t need to be as ingenuious Pascal in order to handle Gambler’s
Ruin, because linear recurrences offer a methodical approach to the basic problems.
   The probability that the gambler wins is a function of his initial capital n his
target T  n and the probability p that the wins an individual one dollar bet. For
fixed p and T , let wn be the gambler’s probability of winning when his initial
capital is n dollars. For example, w0 is the probability that the gambler will win
given that he starts off broke and wT is the probability he will win if he starts off
with his target amount, so clearly
```

                                          w0 D 0;                                (21.3)
```
```
                                          wT D 1:                                (21.4)
```
```

   Otherwise, the gambler starts with n dollars, where 0 < n < T . Now suppose
```
the gambler wins his first bet. In this case, he is left with n C 1 dollars and becomes
a winner with probability wnC1 . On the other hand, if he loses the first bet, he is
left with n 1 dollars and becomes a winner with probability wn 1 . By the Total
Probability Rule, he wins with probability wn D pwnC1 C qwn 1 . Solving for
wnC1 we have
```
                                          wn
```
```
                                wnC1 D            rwn 1                           (21.5)
```
```
                                           p
```
where r is q=p as in Section 21.1.1.
  This recurrence holds only for n C 1  T , but there’s no harm in using (21.5) to
define wnC1 for all n C 1 > 1. Now, letting
```

                        W .x/ WWD w0 C w1 x C w2 x 2 C   
```

be the generating function for the wn , we derive from (21.5) and (21.3) using our
generating function methods that
```
                                                      w1 x
```
```
                                W .x/ D                        :                 (21.6)
```
```
                                          rx 2         x=p C 1
```
But it’s easy to check that the denominator factors:
```
                                  x
```
```
                         rx 2       C 1 D .1              x/.1    rx/:
```
```
                                  p
```

Now if p ¤ q, then using partial fractions we conclude that
```
                                              A               B
```
```
                             W .x/ D                  C           ;              (21.7)
```
```
                                          1       x       1    rx
```
```
           

## 970 Chapter 21    Random Walks
```
```

      for some constants A; B. To solve for A; B, note that by (21.6) and (21.7),
```
```

                                   w1 x D A.1     rx/ C B.1        x/;
```
```

      so letting x D 1, we get A D w1 =.1 r/, and letting x D 1=r, we get B D
```
```
      w1 =.r 1/. Therefore,
```
```
                                                        
```
```
                                    w1    1         1
```
```
                           W .x/ D                         ;
```
```
                                   r 1 1 rx 1 x
```
```

      which implies
```
```
                                                 rn 1
```
```
                                        wn D w1          :                          (21.8)
```
```
                                                  r 1
```
```
      Finally, we can use (21.8) to solve for w1 by letting n D T to get
```
```
                                                   r    1
```
```
                                          w1 D             :
```
```
                                                  rT     1
```
```
      Plugging this value of w1 into (21.8), we arrive at the solution:
```
```

                                                  rn    1
```
```
                                          wn D            ;
```
```
                                                  rT    1
```
```
      matching Pascal’s result (21.1).
```
```
       In the unbiased case where p D q, we get from (21.6) that
```
```
                                                    w1 x
```
```
                                        W .x/ D          ;
```
```
                                                  .1 x/2
```
```
      and again can use partial fractions to match Pascal’s result (21.2).
```
```

      21.1.3       A simpler expression for the biased case
```
```
      The expression (21.1) for the probability that the Gambler wins in the biased game
```
```
      is a little hard to interpret. There is a simpler upper bound which is nearly tight
```
```
      when the gambler’s starting capital is large and the game is biased against the
```
```
      gambler. Then r > 1, both the numerator and denominator in (21.1) are positive,
```
```
      and the numerator is smaller. This implies that
```
```
                                                        T    n
```
```
                                           rn           1
```
```
                                      wn < T D
```
```
                                          r             r
```
```

      and gives:
```
```
     

21.1. Gambler’s Ruin                                                               971
```

Corollary 21.1.2. In the Gambler’s Ruin game with initial capital n, target T , and
probability p < 1=2 of winning each individual bet,
```
                                                   T           n
```
```
                                                   1
```
```
                           PrŒthe gambler wins <                               (21.9)
```
```
                                                   r
```

where r WWD q=p > 1.
```

   So the gambler gains his intended profit before going broke with probability at
```
most 1=r raised to the intended profit power. Notice that this upper bound does
not depend on the gambler’s starting capital, but only on his intended profit. This
has the amazing consequence we announced above: no matter how much money he
starts with, if he makes $1 bets on red in roulette aiming to win $100, the probability
that he wins is less than
```

                          18=38 100
```
```
                                         100
```
```
                                             9             1
```
```
                                       D              <         :
```
```
                          20=38             10          37; 648
```
```

   The bound (21.9) decreases exponentially as the intended profit increases. So,
```
for example, doubling his intended profit will square his probability of winning.
In this case, the probability that the gambler’s stake goes up 200 dollars before he
goes broke playing roulette is at most
```
                                                                     2
```
```
                                200           100 2            1
```
```
                       .9=10/         D ..9=10/   / <                      ;
```
```
                                                            37; 648
```

which is about 1 in 1.4 billion.

Intuition
Why is the gambler so unlikely to make money when the game is only slightly
biased against him? To answer this intuitively, we can identify two forces at work
on the gambler’s wallet. First, the gambler’s capital has random upward and down-
ward swings from runs of good and bad luck. Second, the gambler’s capital will
have a steady, downward drift, because the negative bias means an average loss of
a few cents on each $1 bet. The situation is shown in Figure 21.2.
   Our intuition is that if the gambler starts with, say, a billion dollars, then he is
sure to play for a very long time, so at some point there should be a lucky, upward
swing that puts him $100 ahead. But his capital is steadily drifting downward. If
the gambler does not have a lucky, upward swing early on, then he is doomed.
After his capital drifts downward by tens and then hundreds of dollars, the size of
the upward swing the gambler needs to win grows larger and larger. And as the
```
           

## 972 Chapter 21    Random Walks
```
```

                          w
```
```
                                                                        upward
```
```
                          n                                              swing
```
```
                                                                       (too late)
```
```

                   gambler’s          downward
```
```
                    wealth              drift
```
```

                           0
```
```
                                                       time
```
```

      Figure 21.2 In a biased random walk, the downward drift usually dominates
```
```
      swings of good luck.
```
```

      size of the required swing grows, the odds that it occurs decrease exponentially. As
```
```
      a rule of thumb, drift dominates swings in the long term.
```
```
         We can quantify these drifts and swings. After k rounds for k  min.m; n/, the
```
```
      number of wins by our player has a binomial distribution with parameters p < 1=2
```
```
      and k. His expected win on any single bet is p q D 2p 1 dollars, so his expected
```
```
      capital is n k.1 2p/. Now to be a winner, his actual number of wins must exceed
```
```
      the expected number by m C k.1 2p/. But from  p the formula (20.14), the binomial
```
```
      distribution has a standard deviation of only kp.1 p/ . So for the gambler to
```
```
      win, he needs his number of wins to deviate by
```
```
                                   m C k.1 2p/     p
```
```
                                   p           D ‚. k/
```
```
                                     kp.1 2p/
```
```
      times its standard deviation. In our study of binomial tails, we saw that this was
```
```
      extremely unlikely.
```
```
         In a fair game, there is no drift; swings are the only effect. In the absence of
```
```
      downward drift, our earlier intuition is correct. If the gambler starts with a trillion
```
```
      dollars then almost certainly there will eventually be a lucky swing that puts him
```
```
      $100 ahead.
```
```

      21.1.4       How Long a Walk?
```
```
      Now that we know the probability wn that the gambler is a winner in both fair and
```
```
      unfair games, we consider how many bets he needs on average to either win or go
```
```
      broke. A linear recurrence approach works here as well.
```
```
     

21.1. Gambler’s Ruin                                                              973
```
```

   For fixed p and T , let en be the expected number of bets until the game ends
```
when the gambler’s initial capital is n dollars. Since the game is over in zero steps
if n D 0 or T , the boundary conditions this time are e0 D eT D 0.
   Otherwise, the gambler starts with n dollars, where 0 < n < T . Now by the
conditional expectation rule, the expected number of steps can be broken down
into the expected number of steps given the outcome of the first bet weighted by
the probability of that outcome. But after the gambler wins the first bet, his capital
is n C 1, so he can expect to make another enC1 bets. That is,
```

          ExŒ#bets starting with $n j gambler wins first bet D 1 C enC1 :
```

Similarly, after the gambler loses his first bet, he can expect to make another en 1
bets:
```

          ExŒ#bets starting with $n j gambler loses first bet D 1 C en 1 :
```

So we have
```

            en D p ExŒ#bets starting with $n j gambler wins first bet
```
```
                  C q ExŒ#bets starting with $n j gambler loses first bet
```
```
               D p.1 C enC1 / C q.1 C en 1 / D penC1 C qen 1 C 1:
```

This yields the linear recurrence
```
                                     1       q          1
```
```
                            enC1 D     en      en 1       :                   (21.10)
```
```
                                     p       p          p
```
  The routine solution of this linear recurrence yields:
Theorem 21.1.3. In the Gambler’s Ruin game with initial capital n, target T , and
probability p of winning each bet,
```
                         8
```
```
                                              1
```
```
                          n.T n/      for p D ;
```
```
                         ˆ
```
```
                         ˆ
```
```
                                              2
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                         <
```
  ExŒnumber of bets D wn  T n for p ¤ 1                                (21.11)
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ   p q              2
```
```
                                     where wn D .r n 1/=.r T 1/
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                         ˆ
```
```
                                           D PrŒthe gambler wins:
```
```
                         ˆ
```
```
                         :
```

  In the unbiased case, (21.11) can be rephrased simply as
```

          ExŒnumber of fair bets D initial capital  intended profit:        (21.12)
```
```
           

## 974 Chapter 21    Random Walks
```
```

      For example, if the gambler starts with $10 dollars and plays until he is broke or
```
```
      ahead $10, then 10  10 D 100 bets are required on average. If he starts with $500
```
```
      and plays until he is broke or ahead $100, then the expected number of bets until
```
```
      the game is over is 500  100 D 50; 000. This simple formula (21.12) cries out for
```
```
      an intuitive proof, but we have not found one (where are you, Pascal?).
```
```

      21.1.5       Quit While You Are Ahead
```
```
      Suppose that the gambler never quits while he is ahead. That is, he starts with
```
```
      n > 0 dollars, ignores any target T , but plays until he is flat broke. Call this the
```
```
      unbounded Gambler’s ruin game. It turns out that if the game is not favorable, that
```
```
      is, p  1=2, the gambler is sure to go broke. In particular, this holds in an unbiased
```
```
      game with p D 1=2.
```
```
      Lemma 21.1.4. If the gambler starts with one or more dollars and plays a fair
```
```
      unbounded game, then he will go broke with probability 1.
```
```
      Proof. If the gambler has initial capital n and goes broke in a game without reach-
```
```
      ing a target T , then he would also go broke if he were playing and ignored the
```
```
      target. So the probability that he will lose if he keeps playing without stopping at
```
```
      any target T must be at least as large as the probability that he loses when he has a
```
```
      target T > n.
```
```
         But we know that in a fair game, the probability that he loses is 1 n=T . This
```
```
      number can be made arbitrarily close to 1 by choosing a sufficiently large value of
```
```
      T . Hence, the probability of his losing while playing without any target has a lower
```
```
      bound arbitrarily close to 1, which means it must in fact be 1.                    
```
```

        So even if the gambler starts with a million dollars and plays a perfectly fair
```
```
      game, he will eventually lose it all with probability 1. But there is good news: if
```
```
      the game is fair, he can “expect” to play forever:
```
```
      Lemma 21.1.5. If the gambler starts with one or more dollars and plays a fair
```
```
      unbounded game, then his expected number of plays is infinite.
```
```
         A proof appears in Problem 21.2.
```
```
         So even starting with just one dollar, the expected number of plays before going
```
```
      broke is infinite! This sounds reassuring—you can go about your business without
```
```
      worrying about being doomed, because doom will be infinitely delayed. To illus-
```
```
      trate a situation where you really needn’t worry, think about mean time to failure
```
```
      with a really tiny probability of failure in any given second—say 10 100 . In this
```
```
      case you are unlikely to fail any time much sooner than many lifetimes of the es-
```
```
      timated age of the universe, even though you will eventually fail with probability
```
```
      one.
```
```
                

           21.2. Random Walks on Graphs                                                     975
```
```

              But in general, you shouldn’t feel reassured by an infinite expected time to go
```
```
           broke. For example, think about a variant Gambler’s Ruin game which works as
```
```
           follows: run one second of the process that has a 10 100 of failing in any second.
```
```
           If it does not fail, then you go broke immediately. Otherwise, you play a fair, un-
```
```
           bounded Gambler’s Ruin game. Now there is an overwhelming probability, namely,
```
```
           1 10 100 , that you will go broke immediately. But there is a 10 100 probability
```
```
           that you will wind up playing fair Gambler’s Ruin, so your overall expected time
```
```
           will be at least 10 100 times the expectation of fair Gambler’s Ruin, namely, it will
```
```
           still be infinite.
```
```
              For the actual fair, unbounded Gambler’s Ruin gain starting with one dollar, there
```
```
           is a a 50% chance the Gambler will go broke after the first bet, and a more than
```
```
           15=16 chance of going broke within five bets, for example. So infinite expected
```
```
           time is not much consolation to a Gambler who goes broke quickly with high prob-
```
```
           ability.
```

### 21.2 Random Walks on Graphs
```
           The hyperlink structure of the World Wide Web can be described as a digraph.
```
```
           The vertices are the web pages with a directed edge from vertex x to vertex y if
```
```
           x has a link to y. A digraph showing part of the website for MIT subject 6.042,
```
```
           Mathematics for Computer Science, is shown in Figure 21.3.
```
```
              The web graph is an enormous graph with trillions of vertices. In 1995, two
```
```
           students at Stanford, Larry Page and Sergey Brin, realized that the structure of
```
```
           this graph could be very useful in building a search engine. Traditional document
```
```
           searching programs had been around for a long time and they worked in a fairly
```
```
           straightforward way. Basically, you would enter some search terms and the search-
```
```
           ing program would return all documents containing those terms. A relevance score
```
```
           might also be returned for each document based on the frequency or position that
```
```
           the search terms appeared in the document. For example, if the search term ap-
```
```
           peared in the title or appeared 100 times in a document, that document would get a
```
```
           higher score.
```
```
              This approach works fine if you only have a few documents that match a search
```
```
           term. But on the web, there are many billions of documents and millions of matches
```
```
           to a typical search. For example, on May 2, 2012, a search on Google for “ ‘Mathe-
```
```
           matics for Computer Science’ text” gave 482,000 hits! Which ones should we look
```
```
           at first? Just because a page gets a high keyword score—say because it has “Math-
```
```
           ematics Mathematics : : : Mathematics” copied 200 times across the front of the
```
```
           document—does not make it a great candidate for attention. The web is filled with
```
```
             

## 976 Chapter 21          Random Walks
```
```

             csail.mit.edu/6.042/classinfo!
```
```
                                                                     stellar.mit.edu/S/course/6/fa15/6.042/gradebook!
```
```

           csail.mit.edu/6.042/midterm1!
```
```

                                                  csail.mit.edu/6.042!              stellar.mit.edu/S/course/6/fa15/6.042/!
```
```

                                                                                                                                   lms.mitx.edu!
```
```
      csail.mit.edu/6.042/midterm1_histogram!
```
```

                                                                            stellar.mit.edu/S/course/6/fa15/6.042/materials!
```
```

         csail.mit.edu/6.042/grading_questions!     piazza.com!                                                      youtube.com/FiAKUX9efxg!
```
```

                                Figure 21.3 Website digraph for MIT subject 6.042
```
```
      

21.2. Random Walks on Graphs                                                                   977
```

bogus websites that repeat certain words over and over in order to attract visitors.
   Google’s enormous market capital in part derives from the revenue it receives
from advertisers paying to appear at the top of search results. That top placement
would not be worth much if Google’s results were as easy to manipulate as keyword
frquencies. Advertisers pay because Google’s ranking method is consistently good
at determining the most relevant web pages. For example, Google demonstrated its
accuracy in our case by giving first rank2 to our 6.042 text.
   So how did Google know to pick our text to be first out of 482,000?—because
back in 1995 Larry and Sergey got the idea to allow the digraph structure of the
web to determine which pages are likely to be the most important.

#### 21.2.1 A First Crack at Page Rank
Looking at the web graph, do you have an idea which vertex/page might be the
best to rank first? Assume that all the pages match the search terms for now. Well,
intuitively, we should choose x2 , since lots of other pages point to it. This leads
us to their first idea: try defining the page rank of x to be indegree.x/, the number
of links pointing to x. The idea is to think of web pages as voting for the most
important page—the more votes, the better the rank.
   Unfortunately, there are some problems with this idea. Suppose you wanted to
have your page get a high ranking. One thing you could do is to create lots of
dummy pages with links to your page.
```

                                  +n
```
```

   There is another problem—a page could become unfairly influential by having
```
lots of links to other pages it wanted to hype.
   2 First rank for some reason was an early version archived at Princeton; the Spring 2010 version

on the MIT Open Courseware site ranked 4th and 5th.
```
           

## 978 Chapter 21    Random Walks
```
```

                                                            +1
```
```

                                                            +1
```
```

                                                            +1
```
```

                                                            +1
```
```

                                                             +1
```
```
         So this strategy for high ranking would amount to, “vote early, vote often,” which
```
```
      is no good if you want to build a search engine that’s worth paying fees for. So,
```
```
      admittedly, their original idea was not so great. It was better than nothing, but
```
```
      certainly not worth billions of dollars.
```
```

      21.2.2       Random Walk on the Web Graph
```
```
      But then Sergey and Larry thought some more and came up with a couple of im-
```
```
      provements. Instead of just counting the indegree of a vertex, they considered the
```
```
      probability of being at each page after a long random walk on the web graph. In
```
```
      particular, they decided to model a user’s web experience as following each link on
```
```
      a page with uniform probability. For example, if the user is at page x, and there
```
```
      are three links from page x, then each link is followed with probability 1=3. More
```
```
      generally, they assigned each edge x ! y of the web graph with a probability
```
```
      conditioned on being on page x:
```
```
                                                                  1
```
```
                      Pr follow link hx ! yi j at page x WWD             :
```
```
                                                               outdeg.x/
```
```
      The simulated user experience is then just a random walk on the web graph.
```
```
        We can also compute the probability of arriving at a particular page y by sum-
```
```
      ming over all edges pointing to y. We thus have
```
```
                            X                                         
```
```
       PrŒgo to y D                Pr follow link hx ! yi j at page x  PrŒat page x
```
```
                           edges hx!yi
```
```
                              X           PrŒat x
```
```
                       D                                                           (21.13)
```
```
                                         outdeg.x/
```
```
                           edges hx!yi
```
```

      For example, in our web graph, we have
```
```
                                                PrŒat x7  PrŒat x2 
```
```
                              PrŒgo to x4  D             C           :
```
```
                                                    2          1
```
```
     

21.2. Random Walks on Graphs                                                      979
```

One can think of this equation as x7 sending half its probability to x2 and the other
half to x4 . The page x2 sends all of its probability to x4 .
   There’s one aspect of the web graph described thus far that doesn’t mesh with
the user experience—some pages have no hyperlinks out. Under the current model,
the user cannot escape these pages. In reality, however, the user doesn’t fall off
the end of the web into a void of nothingness. Instead, he restarts his web journey.
Moreover, even if a user does not get stuck at a dead end, they will commonly get
discouraged after following some unproductive path for a while and will decide to
restart.
   To model this aspect of the web, Sergey and Larry added a supervertex to the
web graph and added an edge from every page to the supervertex. Moreover, the
supervertex points to every other vertex in the graph with equal probability, allow-
ing the walk to restart from a random place. This ensures that the graph is strongly
connected.
   If a page had no hyperlinks, then its edge to the supervertex has to be assigned
probability one. For pages that had some hyperlinks, the additional edge pointing
to the supervertex was assigned some specially given probability. In the original
versions of Page Rank, this probability was arbitrarily set to 0.15. That is, each
vertex with outdegree n  1 got an additional edge pointing to the supervertex
with assigned probability 0.15; its other n outgoing edges were still kept equally
likely, that is, each of the n edges was assigned probability 0:85=n.

#### 21.2.3 Stationary Distribution & Page Rank
The basic idea behind page rank is finding a stationary distribution over the web
graph, so let’s define a stationary distribution.
   Suppose each vertex is assigned a probability that corresponds, intuitively, to the
likelihood that a random walker is at that vertex at a randomly chosen time. We
assume that the walk never leaves the vertices in the graph, so we require that
```
                                   X
```
```
                                          PrŒat x D 1:                       (21.14)
```
```
                                vertices x
```

Definition 21.2.1. An assignment of probabilities to vertices in a digraph is a sta-
tionary distribution if for all vertices x
```

                         PrŒat x D PrŒgo to x at next step
```

  Sergey and Larry defined their page ranks to be a stationary distribution. They
did this by solving the following system of linear equations: find a nonnegative
```
           

## 980 Chapter 21   Random Walks
```
```

      number Rank.x/ for each vertex x such that
```
```
                                                      X         Rank.y/
```
```
                                  Rank.x/ D                              ;                    (21.15)
```
```
                                                               outdeg.y/
```
```
                                                 edges hy!xi
```
```

      corresponding to the intuitive equations given in (21.13). These numbers must also
```
```
      satisfy the additional constraint corresponding to (21.14):
```
```
                                        X
```
```
                                              Rank.x/ D 1:                      (21.16)
```
```
                                         vertices x
```
```

         So if there are n vertices, then equations (21.15) and (21.16) provide a system
```
```
      of n C 1 linear equations in the n variables Rank.x/. Note that constraint (21.16)
```
```
      is needed because the remaining constraints (21.15) could be satisfied by letting
```
```
      Rank.x/ WWD 0 for all x, which is useless.
```
```
         Sergey and Larry were smart fellows, and they set up their page rank algorithm
```
```
      so it would always have a meaningful solution. Strongly connected graphs have
```
```
      unique stationary distributions (Problem 21.12), and their addition of a superver-
```
```
      tex ensures this. Moreover, starting from any vertex and taking a sufficiently long
```
```
      random walk on the graph, the probability of being at each page will get closer and
```
```
      closer to the stationary distribution. Note that general digraphs without superver-
```
```
      tices may have neither of these properties: there may not be a unique stationary
```
```
      distribution, and even when there is, there may be starting points from which the
```
```
      probabilities of positions during a random walk do not converge to the stationary
```
```
      distribution (Problem 21.8).
```
```
         Now just keeping track of the digraph whose vertices are trillions of web pages
```
```
      is a daunting task. That’s why in 2011 Google invested $168,000,000 in a solar
```
```
      power plant—the electrical power drawn by Google’s servers in 2011 would have
```
```
      supplied the needs of 200,000 households.3 Indeed, Larry and Sergey named their
```
```
      system Google after the number 10100 —which is called a “googol”—to reflect the
```
```
      fact that the web graph is so enormous.
```
```
         Anyway, now you can see how this text ranked first out of 378,000 matches.
```
```
      Lots of other universities used our notes and presumably have links to the MIT
```
```
      Mathematics for Computer Science Open Course Ware site, and the university sites
```
```
      themselves are legitimate, which ultimately leads to the text getting a high page
```
```
      rank in the web graph.
```
```
        3 Google Details, and Defends, Its Use of Electricity, New York Times, September 8, 2011.
```
```
                

           21.2. Random Walks on Graphs                                                    981
```

Problems for Section 21.1
```
           Practice Problems
```
```
           Problem 21.1.
```
```
           Suppose that a gambler is playing a game in which he makes a series of $1 bets.
```
```
           He wins each one with probability 0.49, and he keeps betting until he either runs
```
```
           out of money or reaches some fixed goal of T dollars.
```
```
             Let t .n/ be the expected number of bets the gambler makes until the game ends,
```
```
           where n is the number of dollars the gambler has when he starts betting. Then the
```
```
           function t satisfies a linear recurrence of the form
```
```

                                  t .n/ D a  t .n C 1/ C b  t .n   1/ C c
```
```

           for real constants a, b, c, and 0 < n < T .
```
```
            (a) What are the values of a, b and c?
```
```

           (b) What is t .0/?
```
```

            (c) What is t .T /?
```
```

           Class Problems
```
```
           Problem 21.2.
```
```
           In a gambler’s ruin scenario, the gambler makes independent $1 bets, where the
```
```
           probability of winning a bet is p and of losing is q WWD 1 p. The gambler keeps
```
```
           betting until he goes broke or reaches a target of T dollars.
```
```
             Suppose T D 1, that is, the gambler keeps playing until he goes broke. Let
```
```
           r be the probability that starting with n > 0 dollars, the gambler’s stake ever gets
```
```
           reduced to n 1 dollars.
```
```
            (a) Explain why
```
```
                                               r D q C pr 2 :
```
```

           (b) Conclude that if p  1=2, then r D 1.
```
```

            (c) Prove that even in a fair game, the gambler is sure to get ruined no matter how
```
```
           much money he starts with!
```
```

           (d) Let t be the expected time for the gambler’s stake to go down by 1 dollar.
```
```
           Verify that
```
```
                                        t D q C p.1 C 2t /:
```
```
           

## 982 Chapter 21   Random Walks
```
```

      Conclude that starting with a 1 dollar stake in a fair game, the gambler can expect
```
```
      to play forever!
```
```

      Problem 21.3.
```
```
      A gambler is placing $1 bets on the “1st dozen” in roulette. This bet wins when a
```
```
      number from one to twelve comes in, and then the gambler gets his $1 back plus
```
```
      $2 more. Recall that there are 38 numbers on the roulette wheel.
```
```
         The gambler’s initial stake in $n and his target is $T . He will keep betting until
```
```
      he runs out of money (“goes broke”) or reaches his target. Let wn be the probability
```
```
      of the gambler winning, that is, reaching target $T before going broke.
```
```
       (a) Write a linear recurrence with boundary conditions for wn . You need not solve
```
```
      the recurrence.
```
```

       (b) Let en be the expected number of bets until the game ends. Write a linear
```
```
      recurrence with boundary conditions for en . You need not solve the recurrence.
```
```

      Problem 21.4.
```
```
      In the fair Gambler’s Ruin game with initial stake of n dollars and target of T
```
```
      dollars, let en be the number of $1 bets the gambler makes until the game ends
```
```
      (because he reaches his target or goes broke).
```
```
       (a) Describe constants a; b; c such that
```
```

                                   en D aen 1 C ben 2 C c:                          (21.17)
```
```

      for 1 < n < T .
```
```

       (b) Let en be defined by (21.17) for all n > 1, where e0 D 0 and e1 D d for
```
```
                P1 d . Derive
```
```
      some constant
```
```
                         n
```
```
                               a closed form (involving d ) for the generating function
```
```
      E.x/ WWD 0 en x .
```
```

       (c) Find a closed form (involving d ) for en .
```
```

      (d) Use part (c) to solve for d .
```
```

       (e) Prove that en D n.T     n/.
```
```
                

           21.2. Random Walks on Graphs                                                 983
```

Problems for Section 21.2
```
           Practice Problems
```
```
           Problem 21.5.
```
```
           Consider the following random-walk graphs:
```
```

                                                       1
```
```

                                                 x             y
```
```

                                                       1
```
```

                                                Figure 21.4
```
```

                                                 1
```
```

                                          w                z       0.1
```
```

                                                 0.9
```
```

                                                Figure 21.5
```
```

                                                       1/2
```
```
                                          1/2                      1/2
```
```
                            1       a            b             c         d   1
```
```

                                                       1/2
```
```

                                                Figure 21.6
```
```

            (a) Find d.x/ for a stationary distribution for graph 21.4.
```
```

           (b) Find d.y/ for a stationary distribution for graph 21.4.
```
```

            (c) If you start at node x in graph 21.4 and take a (long) random walk, does the
```
```
           distribution over nodes ever get close to the stationary distribution?
```
```

           (d) Find d.w/ for a stationary distribution for graph 21.5.
```
```
           

## 984 Chapter 21       Random Walks
```
```

       (e) Find d.z/ for a stationary distribution for graph 21.5.
```
```

       (f) If you start at node w in graph 21.5 and take a (long) random walk, does the
```
```
      distribution over nodes ever get close to the stationary distribution? (Hint: try a
```
```
      few steps and watch what is happening.)
```
```

      (g) How many stationary distributions are there for graph 21.6?
```
```

       (h) If you start at node b in graph 21.6 and take a (long) random walk, what will
```
```
      be the approximate probability that you are at node d ?
```
```

      Problem 21.6.
```
```
      A sink in a digraph is a vertex with no edges leaving it. Circle whichever of the
```
```
      following assertions are true of stable distributions on finite digraphs with exactly
```
```
      two sinks:
```
```

           there may not be any
```
```

           there may be a unique one
```
```

           there are exactly two
```
```

           there may be a countably infinite number
```
```

           there may be a uncountable number
```
```

           there always is an uncountable number
```
```

      Problem 21.7.
```
```
      Explain why there are an uncountable number of stationary distributions for the
```
```
      following random walk graph.
```
```

                                                1/2
```
```
                                      1/2                   1/2
```
```
                   1           a            b          c             d         1
```
```

                                                1/2
```
```
     

21.2. Random Walks on Graphs                                                     985
```
```

                                         1
```
```

                                   x             y
```
```

                                         1
```
```

                                   Figure 21.7
```

Class Problems
Problem 21.8. (a) Find a stationary distribution for the random walk graph in Fig-
ure 21.7.

 (b) Explain why a long random walk starting at node x in Figure 21.7 will not
converge to a stationary distribution. Characterize which starting distributions will
converge to the stationary one.

 (c) Find a stationary distribution for the random walk graph in Figure 21.8.
```

                                   1
```
```

                               w             z       0.1
```
```

                                   0.9
```
```

                                   Figure 21.8
```

 (d) If you start at node w Figure 21.8 and take a (long) random walk, does the
distribution over nodes ever get close to the stationary distribution? You needn’t
prove anything here, just write out a few steps and see what’s happening.

 (e) Explain why the random walk graph in Figure 21.9 has an uncountable number
of stationary distributions.

 (f) If you start at node b in Figure 21.9 and take a long random walk, the proba-
bility you are at node d will be close to what fraction? Explain.

 (g) Give an example of a random walk graph that is not strongly connected but
has a unique stationary distribution. Hint: There is a trivial example.
```
           

## 986 Chapter 21       Random Walks
```
```

                                                      1/2
```
```
                                       1/2                              1/2
```
```
                   1           a              b                     c         d   1
```
```

                                                      1/2
```
```

                                               Figure 21.9
```
```

      Problem 21.9.
```
```
      We use random walks on a digraph G to model the typical movement pattern of a
```
```
      Math for CS student right after the final exam.
```
```
        The student comes out of the final exam located on a particular node of the
```
```
      graph, corresponding to the exam room. What happens next is unpredictable, as
```
```
      the student is in a total haze. At each step of the walk, if the student is at node
```
```
      u at the end of the previous step, they pick one of the edges hu ! vi uniformly at
```
```
      random from the set of all edges directed out of u, and then walk to the node v.
```
```
        Let n WWD jV .G/j and define the vector P .j / to be
```
```
                                                       .j /
```
```
                                        P .j / WWD .p1 ; : : : ; pn.j / /
```
```
               .j /
```
```
      where pi         is the probability of being at node i after j steps.
```
```
       (a) We will start by looking at a simple graph. If the student starts at node 1 (the
```
```
      top node) in the following graph, what is P .0/ ; P .1/ ; P .2/ ? Give a nice expression
```
```
      for P .n/ .
```
```

                                                              1/2
```
```

                                                         1/2
```
```

                                                          1
```
```

                                                                                  .j /
```
```
       (b) Given an arbitrary graph, show how to write an expression for pi              in terms
```
```
              .j 1/
```
```
      of the pk     ’s.
```
```

       (c) Does your answer to the last part look like any other system of equations
```
```
      you’ve seen in this course?
```
```
     

21.2. Random Walks on Graphs                                                              987
```

(d) Let the limiting distribution vector  be
```
                                                   Pk         .i /
```
```
                                                     i D1 P
```
```
                                          lim                        :
```
```
                                         k!1              k
```
What is the limiting distribution of the graph from part a? Would it change if the
start distribution were P .0/ D .1=2; 1=2/ or P .0/ D .1=3; 2=3/?

 (e) Let’s consider another directed graph. If the student starts at node 1 with
probability 1/2 and node 2 with probability 1/2, what is P .0/ ; P .1/ ; P .2/ in the
following graph? What is the limiting distribution?
```

                                                              1/3
```
```
                                                         3
```
```

                                         1/3                   1/3
```
```
                                                   1/3 1/3
```
```
                                                    1/3
```
```
                       1/3                                                 1/3
```
```
                                                    1/3
```
```
                                     1                          2
```
 (f) Now we are ready for the real problem. In order to make it home, the poor
Math for student is faced with n doors along a long hall way. Unbeknownst to him,
the door that goes outside to paradise (that is, freedom from the class and more
importantly, vacation!) is at the very end. At each step along the way, he passes
by a door which he opens up and goes through with probability 1/2. Every time he
does this, he gets teleported back to the exam room. Let’s figure out how long it
will take the poor guy to escape from the class. What is P .0/ ; P .1/ ; P .2/ ? What is
the limiting distribution?
```

                                         1/2
```
```
                 1/2         1/2
```
```
                                                                     ...              1
```
```
         1         1/2             1/2             1/2                      1/2
```
```
     0         1             2                 3                                  n
```
 (g) Show that the expected number T .n/ of teleportations you make back to the
exam room before you escape to the outside world is 2n 1 1.
```
           

## 988 Chapter 21   Random Walks
```
```

      Problem 21.10.
```
```
      Prove that for finite random walk graphs, the uniform distribution is stationary iff
```
```
      the probabilities of the edges coming into each vertex always sum to 1, namely
```
```
                                        X
```
```
                                              p.u; v/ D 1;                        (21.18)
```
```
                                     u2into.v/
```
```

      where into.w/ WWD fv j hv ! wi is an edgeg.
```
```

      Problem 21.11.
```
```
      A Google-graph is a random-walk graph such that every edge leaving any given
```
```
      vertex has the same probability. That is, the probability of each edge hv ! wi is
```
```
      1= outdeg.v/.
```
```
        A digraph is symmetric if, whenever hv ! wi is an edge, so is hw ! vi. Given
```
```
      any finite, symmetric Google-graph, let
```
```
                                               outdeg.v/
```
```
                                     d.v/ WWD            ;
```
```
                                                    e
```
```
      where e is the total number of edges in the graph.
```
```
       (a) If d was used for webpage ranking, how could you hack this to give your page
```
```
      a high rank? . . . explain informally why this wouldn’t work for “real” page rank
```
```
      with nonsymmetric digraphs.
```
```

      (b) Show that d is a stationary distribution.
```
```

      Homework Problems
```
```
      Problem 21.12.
```
```
      A digraph is strongly connected iff there is a directed path between every pair of
```
```
      distinct vertices. In this problem we consider a finite random walk graph that is
```
```
      strongly connected.
```
```
       (a) Let d1 and d2 be distinct distributions for the graph, and define the maximum
```
```
      dilation of d1 over d2 to be
```
```
                                                 d1 .x/
```
```
                                        WWD max         :
```
```
                                             x2V d2 .x/
```
```

      Call a vertex x dilated if d1 .x/=d2 .x/ D . Show that there is an edge hy ! zi
```
```
      from an undilated vertex y to a dilated vertex z. Hint: Choose any dilated vertex x
```
```
      and consider the set D of dilated vertices connected to x by a directed path (going
```
```
      to x) that only uses dilated vertices. Explain why D ¤ V , and then use the fact
```
```
      that the graph is strongly connected.
```