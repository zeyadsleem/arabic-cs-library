---
title: "Deviation from the Mean"
lang: en
---

19.5. Linearity of Expectation                                                      889

Moreover, since we’re assuming the wheel is fair, it’s true that ExŒBn  D 0, so
```
                                   1
```
```
                                   X                 1
```
```
                                                     X
```
```
                                         ExŒBn  D         0 D 0:               (19.16)
```
```
                                   nD1               nD1
```
```

   The flaw in the argument that you can’t win is the implicit appeal to linearity of
```
expectation to conclude that the expectation (19.15) equals the sum of expectations
in (19.16). This is a case where linearity of expectation fails to hold—even though
the expectation (19.15) is 10 and the sum (19.16) of expectations converges. The
problem is that the expectation of the sum of the absolute values of the bets di-
verges, so the condition required for infinite linearity fails. In particular, under bet
doubling your nth bet is 10  2n 1 dollars while the probability that you will make
an nth bet is 2 n . So
```

                                 ExŒjBn j D 10  2n 1 2 n D 5:
```

Therefore the sum
```
                             1
```
```
                             X
```
```
                                    ExŒjBn j D 5 C 5 C 5 C   
```
```
                             nD1
```

diverges rapidly.
   So the presumption that you can’t beat a fair game, and the argument we offered
to support this presumption, are mistaken: by bet doubling, you can be sure to walk
away a winner. Probability theory has led to an apparently absurd conclusion.
   But probability theory shouldn’t be rejected because it leads to this absurd con-
clusion. If you only had a finite amount of money to bet with—say enough money
to make k bets before going bankrupt—then it would be correct to calculate your
expection by summing B1 C B2 C    C Bk , and your expectation would be zero
for the fair wheel and negative against an unfair wheel. In other words, in order
to follow the bet doubling strategy, you need to have an infinite bankroll. So it’s
absurd to assume you could actually follow a bet doubling strategy, and we needn’t
be concerned when an absurd assumption leads to an absurd conclusion.

#### 19.5.8 Expectations of Products
While the expectation of a sum is the sum of the expectations, the same is usually
not true for products. For example, suppose that we roll a fair 6-sided die and
denote the outcome with the random variable R. Does ExŒR  R D ExŒR  ExŒR?
  We know that ExŒR D 3 12 and thus .ExŒR/2 D 12 41 . Let’s compute ExŒR2  to
```
                 

## 890 Chapter 19   Random Variables
```
```

            see if we get the same result.
```
```

                                         X                           6
```
```
                                                                     X
```
```
                             2                   2
```
```
                                                                           i 2  PrŒRi D i 
```
```
                                
```
```
                    Ex R             D         R .!/ PrŒw D
```
```
                                         !2S                          i D1
```
```
                                         12      22       32       4 2     52       62
```
```
                                     D       C        C        C       C        C      D 15 1=6 ¤ 12 1=4:
```
```
                                         6        6       6        6        6       6
```
```
              That is,
```
```
                                                     ExŒR  R ¤ ExŒR  ExŒR:
```
```
            So the expectation of a product is not always equal to the product of the expecta-
```
```
            tions.
```
```
               There is a special case when such a relationship does hold however; namely,
```
```
            when the random variables in the product are independent.
```
```

            Theorem 19.5.6. For any two independent random variables R1 , R2 ,
```
```

                                                 ExŒR1  R2  D ExŒR1   ExŒR2 :
```
```

              The proof follows by rearrangement of terms in the sum that defines ExŒR1  R2 .
```
```
            Details appear in Problem 19.29.
```
```
              Theorem 19.5.6 extends routinely to a collection of mutually independent vari-
```
```
            ables.
```
```

            Corollary 19.5.7. [Expectation of Independent Product]
```
```
              If random variables R1 ; R2 ; : : : ; Rk are mutually independent, then
```
```
                                         2             3
```
```
                                              Y k           k
```
```
                                                            Y
```
```
                                      Ex 4          Ri 5 D     ExŒRi :
```
```
                                                          i D1             i D1
```

### 19.6 Really Great Expectations
```
            Making independent tosses of a fair coin until some desired pattern comes up is a
```
```
            simple process you should feel in some command of by now, right? So how about
```
```
            a bet about the simplest such process—tossing until a head comes up? Ok, you’re
```
```
            wary of betting with us, but how about this: we’ll let you set the odds.
```
```
      

19.6. Really Great Expectations                                                    891
```

#### 19.6.1 Repeating Yourself
Here’s the bet: you make independent tosses of a fair coin until a head comes up.
Then you will repeat the process. If a second head comes up in the same or fewer
tosses than the first, you have to start over yet again. You keep starting over until
you finally toss a run of tails longer than your first one. The payment rules are that
you will pay me 1 cent each time you start over. When you win by finally getting a
run of tails longer than your first one, I will pay you some generous amount. Notice
by the way that you’re certain to win—whatever your initial run of tails happened
to be, a longer run will eventually occur again with probability 1!
   For example, if your first tosses are TTTH, then you will keep tossing until you
get a run of 4 tails. So your winning flips might be
```

                       TTTHTHTTHHTTHTHTTTHTHHHTTTT:
```

In this run there are 10 heads, which means you had to start over 9 times. So you
would have paid me 9 cents by the time you finally won by tossing 4 tails. Now
you’ve won, and I’ll pay you generously —how does 25 cents sound? Maybe you’d
rather have $1? How about $1000?
   Of course there’s a trap here. Let’s calculate your expected winnings.
   Suppose your initial run of tails had length k. After that, each time a head comes
up, you have to start over and try to get k C1 tails in a row. If we regard your getting
k C 1 tails in a row as a “failed” try, and regard your having to start over because a
head came up too soon as a “successful” try, then the number of times you have to
start over is the number of tries till the first failure. So the expected number of tries
will be the mean time to failure, which is 2kC1 , because the probability of tossing
k C 1 tails in a row is 2 .kC1/ .
   Let T be the length of your initial run of tails. So T D k means that your initial
tosses were Tk H. Let R be the number of times you repeat trying to beat your
original run of tails. The number of cents you expect to finish with is the number
of cents in my generous payment minus ExŒR. It’s now easy to calculate ExŒR by
conditioning on the value of T :
```
           X                                     X
```
ExŒR D         ExŒR j T D kPrŒT D k D             2kC1 2 .kC1/ D 1C1C1C   D 1:
```
           k2N                               k2N
```

  So you can expect to pay me an infinite number of cents before winning my
“generous” payment. No amount of generosity can make this bet fair! In fact this
particular example is a special case of an astonishingly general one: the expected
waiting time for any random variable to achieve a larger value remains infinite.
```
                

## 892 Chapter 19   Random Variables
```

Problems for Section 19.2
```
           Practice Problems
```
```
           Problem 19.1.
```
```
           Let IA and IB be the indicator variables for events A and B. Prove that IA and IB
```
```
           are independent iff A and B are independent.
```
```
              Hint: Let A1 WWD A and A0 WWD A, so the event ŒIA D c is the same as Ac for
```
```
           c 2 f0; 1g; likewise for B 1 ; B 0 .
```
```

           Homework Problems
```
```
           Problem 19.2.
```
```
           Let R, S and T be random variables with the same codomain V .
```
```
            (a) Suppose R is uniform—that is,
```
```
                                                                1
```
```
                                              PrŒR D b D           ;
```
```
                                                               jV j
```
```
           for all b 2 V —and R is independent of S. Originally this text had the following
```
```
           argument:
```
```

                 The probability that R D S is the same as the probability that R takes
```
```
                 whatever value S happens to have, therefore
```
```
                                                                1
```
```
                                              PrŒR D S  D          :          (19.17)
```
```
                                                               jV j
```
```

           Are you convinced by this argument? Write out a careful proof of (19.17).
```
```
           Hint: The event ŒR D S  is a disjoint union of events
```
```
                                              [
```
```
                                ŒR D S  D        ŒR D b AND S D b:
```
```
                                                   b2V
```
```

            (b) Let S  T be the random variable giving the values of S and T .3 Now suppose
```
```
           R has a uniform distribution, and R is independent of S  T . How about this
```
```
           argument?
```
```
              3 That is, S  T W S ! V  V where
```
```

                                           .S  T /.!/ WWD .S.!/; T .!//
```
```

           for every outcome ! 2 S.
```
```
      

19.6. Really Great Expectations                                                      893
```
```

      The probability that R D S is the same as the probability that R equals
```
```
      the first coordinate of whatever value S  T happens to have, and this
```
```
      probability remains equal to 1=jV j by independence. Therefore the
```
```
      event ŒR D S  is independent of ŒS D T .
```

Write out a careful proof that ŒR D S  is independent of ŒS D T .

 (c) Let V D f1; 2; 3g and .R; S; T / take the following triples of values with equal
probability,
```

                 .1; 1; 1/; .2; 1; 1/; .1; 2; 3/; .2; 2; 3/; .1; 3; 2/; .2; 3; 2/:
```

Verify that

  1. R is independent of S  T ,
  2. The event ŒR D S  is not independent of ŒS D T .
  3. S and T have a uniform distribution.

Problem 19.3.
Let R, S and T be mutually independent indicator variables.
   In general, the event that S D T is not independent of R D S. We can explain
this intuitively as follows: suppose for simplicity that S is uniform, that is, equally
likely to be 0 or 1. This implies that S is equally likely as not to equal R, that is
PrŒR D S  D 1=2; likewise, PrŒS D T  D 1=2.
   Now suppose further that both R and T are more likely to equal 1 than to equal
0. This implies that R D S makes it more likely than not that S D 1, and knowing
that S D 1, makes it more likely than not that S D T . So knowing that    RDS
makes it more likely than not that S D T , that is, Pr S D T j R D S > 1=2.
   Now prove rigorously (without any appeal to intuition)

Lemma 19.6.1. Events ŒR D S  and ŒS D T  are independent iff either R is
uniform4 , or T is uniform, or S is constant5 .
   4 That is, PrŒR D 1 D 1=2.
   5 That is, PrŒS D 1 is one or zero.
```
                

## 894 Chapter 19   Random Variables
```

Problems for Section 19.3
```
           Practice Problems
```
```
           Problem 19.4.
```
```
           Suppose R, S and T be mutually independent random variables on the same prob-
```
```
           ability space with uniform distribution on the range f1; 2; 3g.
```
```
             Let M D maxfR; S; T g. Compute the values of the probability density function
```
```
           PDFM of M .
```
```

           Class Problems
```
```

                                    Guess the Bigger Number Game
```
```

              Team 1:
```
```

                Write two different integers between 0 and 7 on separate pieces of paper.
```
```

                Put the papers face down on a table.
```
```

              Team 2:
```
```

                Turn over one paper and look at the number on it.
```
```

                Either stick with this number or switch to the other (unseen) number.
```
```

              Team 2 wins if it chooses the larger number; else, Team 1 wins.
```
```

           Problem 19.5.
```
```
           The analysis in Section 19.3.3 implies that Team 2 has a strategy that wins 4/7 of
```
```
           the time no matter how Team 1 plays. Can Team 2 do better? The answer is “no,”
```
```
           because Team 1 has a strategy that guarantees that it wins at least 3/7 of the time,
```
```
           no matter how Team 2 plays. Describe such a strategy for Team 1 and explain why
```
```
           it works.
```
```

           Problem 19.6.
```
```
           Suppose you have a biased coin that has probability p of flipping heads. Let J be
```
```
           the number of heads in n independent coin flips. So J has the general binomial
```
```
      

19.6. Really Great Expectations                                                         895
```

distribution:                                  !
```
                                             n k n k
```
```
                                  PDFJ .k/ D    p q
```
```
                                             k
```
where q WWD 1      p.
(a) Show that
```

                PDFJ .k     1/ < PDFJ .k/                  for k < np C p;
```
```
                PDFJ .k     1/ > PDFJ .k/                  for k > np C p:
```

(b) Conclude that the maximum value of PDFJ is asymptotically equal to
```
                                             1
```
```
                                        p          :
```
```
                                            2 npq
```

Hint: For the asymptotic estimate, it’s ok to assume that np is an integer, so by
part (a), the maximum value is PDFJ .np/. Use Stirling’s Formula.

Problem 19.7.
Let R1 ; R2 ; : : : ; Rm , be mutually independent random variables with uniform dis-
tribution on Œ1::n. Let M WWD maxfRi j i 2 Œ1::m g.
(a) Write a formula for PDFM .1/.

(b) More generally, write a formula for PrŒM  k.

 (c) For k 2 Œ1::n, write a formula for PDFM .k/ in terms of expressions of the
form “PrŒM  j ” for j 2 Œ1::n.

Homework Problems
Problem 19.8.
An over-caffeinated sailor of Tech Dinghy wanders along Seaside Boulevard. In
each step, the sailor randomly moves one unit left or right with equal probability.
   We let the sailor’s initial position be designated location zero, with successive
positions to the right labelled 1,2,. . . , and positions to the left labelled -1,-2,. . . .
Let Lt be the random variable giving the sailor’s location after t steps. Before he
starts, the sailor is known to be at location zero, so
```
                                             (
```
```
                                              1 if n D 0;
```
```
                            PDFL0 .n/ D
```
```
                                              0 otherwise:
```
```
                

## 896 Chapter 19   Random Variables
```
```

           After one step, the sailor is equally likely to be at location 1 or 1, so
```
```
                                                     (
```
```
                                                      1=2 if n D ˙1;
```
```
                                     PDFL1 .n/ D
```
```
                                                      0      otherwise:
```
```

            (a) Give the distributions PDFLt for t D 2; 3; 4 by filling in the table of probabil-
```
```
           ities below, where omitted entries are 0. For each row, write all the nonzero entries
```
```
           so they have the same denominator.
```
```
                                                            location
```
```
                                           -4   -3   -2    -1 0      1    2   3   4
```
```
                          initially                              1
```
```
                          after 1 step                    1=2 0 1=2
```
```
                          after 2 steps              ?      ?    ?   ?    ?
```
```
                          after 3 steps         ?    ?      ?    ?   ?    ?   ?
```
```
                          after 4 steps    ?    ?    ?      ?    ?   ?    ?   ?   ?
```
```

            (b) Help the staff of the Sailing Pavilion locate the sailor by answering the follow-
```
```
           ing questions. Provide your derivations and reasoning.
```
```

             (i) What is the final location of a t-step walk that moves right exactly i times?
```
```
            (ii) How many different length-t walks are there that end at that location?
```
```
           (iii) What is the probability that the sailor ends at this location?
```
```
            (iv) Let Bt WWD .Lt C t /=2. Conclude that Bt has an unbiased binomial distribu-
```
```
                 tion.
```

Problems for Section 19.4
```
           Practice Problems
```
```
           Problem 19.9.
```
```
           Bruce Lee, on a movie that didn’t go public, is practicing by breaking 5 boards with
```
```
           his fists. He is able to break a board with probability 0.8—he is practicing with his
```
```
           left fist, that’s why it’s not 1—and he breaks each board independently.
```
```
            (a) What is the probability that Bruce breaks exactly 2 out of the 5 boards that are
```
```
           placed before him?
```
```

            (b) What is the probability that Bruce breaks at most 3 out of the 5 boards that are
```
```
           placed before him?
```
```
      

19.6. Really Great Expectations                                                               897
```

 (c) What is the expected number of boards Bruce will break?

Problem 19.10.
A news article reporting on the departure of a school official from California to
Alabama dryly commented that this move would raise the average IQ in both states.
Explain.

Class Problems
Problem 19.11.
Here’s a dice game with maximum payoff k: make three independent rolls of a fair
die, and if you roll a six
```
     no times, then you lose 1 dollar;
```
```
     exactly once, then you win 1 dollar;
```
```
     exactly twice, then you win 2 dollars;
```
```
     all three times, then you win k dollars.
```
For what value of k is this game fair?6

Problem 19.12. (a) Suppose we flip a fair coin and let NTT be the number of flips
until the first time two consecutive Tails appear. What is ExŒNTT ?
Hint: Let D be the tree diagram for this process. Explain why D can be described
by the tree in Figure 19.8. Use the Law of Total Expectation 19.4.6.

 (b) Let NTH be the number of flips until a Tail immediately followed by a Head
comes up. What is ExŒNTH ?

 (c) Suppose we now play a game: flip a fair coin until either TT or TH occurs.
You win if TT comes up first, and lose if TH comes up first. Since TT takes 50%
longer on average to turn up, your opponent agrees that he has the advantage. So
you tell him you’re willing to play if you pay him $5 when he wins, and he pays
you with a mere 20% premium—that is $6—when you win.
If you do this, you’re sneakily taking advantage of your opponent’s untrained intu-
ition, since you’ve gotten him to agree to unfair odds. What is your expected profit
per game?
   6 This game is actually offered in casinos with k D 3, where it is called Carnival Dice.
```
           

## 898 Chapter 19   Random Variables
```
```

                                                             D
```
```

                                                         T
```
```
                                      H                          T
```
```

                                                    H
```
```

                                D
```
```
                                              D
```
```

           Figure 19.8 Sample space tree for coin toss until two consecutive tails.
```
```

      Problem 19.13.
```
```
      Ben Bitdiddle is asked to analyze a game in which a fair coin is tossed until the first
```
```
      time a head turns up. If this head occurs on the nth toss, and n is odd, then he wins
```
```
      $2n =n, but if n is even, he loses $2n =n. Ben observes that the expected dollar win
```
```
      from this game is
```
```

      .1=2/2 .1=4/2C.1=8/8=3C  ˙.1=2n /2n =n D 1 1=2C1=3 1=4C  ˙1=n:
```
```

      which is the alternating harmonic series—a series that converges to a definite real
```
```
      number r > 0. Since r > 0, Ben concludes that it’s to his advantage to play this
```
```
      game, but as usual, his shoot-from-the-hip analysis is off the mark. Explain.
```
```

      Problem 19.14.
```
```
      Let T be a positive integer valued random variable such that
```
```
                                                          1
```
```
                                          PDFT .n/ D         ;
```
```
                                                         an2
```
```
      where
```
```
                                                   X 1
```
```
                                           a WWD         :
```
```
                                                    C
```
```
                                                      n2
```
```
                                                   n2Z
```
```

      (a) Prove that ExŒT  is infinite.
```
```
                        p
```
```
      (b) Prove that ExŒ T  is finite.
```
```
      

19.6. Really Great Expectations                                                  899
```
```

                                                            D
```
```
                                  B                   H            T
```
```
                          C                  H            T
```
```
                                     H           T
```
```
                                                                   D
```
```
                                                           D
```
```
                                                   D
```
```

                 Figure 19.9 Outcome Tree for Flipping Until HHH
```

Exam Problems
Problem 19.15.
A record of who beat whom in a round-robin tournament can be described with a
tournament digraph, where the vertices correspond to players and there is an edge
hx ! yi iff x beat y in their game. A ranking of the players is a path that includes
all the players. A tournament digraph may in general have one or more rankings.7
   Suppose we construct a random tournament digraph by letting each of the players
in a match be equally likely to win and having results of all the matches be mutually
independent. Find a formula for the expected number of rankings in a random 10-
player tournament. Conclude that there is a 10-vertex tournament digraph with
more than 7000 rankings.
   This problem is an instance of the probabilistic method. It uses probability to
prove the existence of an object without constructing it.

Problem 19.16.
A coin with probability p of flipping Heads and probability q WWD 1 p of flipping
tails is repeatedly flipped until three consecutive Heads occur. The outcome tree D
for this setup is illustrated in Figure 19.9.
   Let e.S / be the expected number of flips starting at the root of subtree S of D.
   7 It has a unique ranking iff it is a DAG, see Problem 10.10.
```
           

## 900 Chapter 19   Random Variables
```
```

                                                 A
```
```
                           B               H          T             C
```
```
                                H           T        H          T
```
```

                                             C       B
```
```

                   Figure 19.10       Outcome Tree for Flipping Until HH or TT
```
```

      So we’re interested in finding e.D/.
```
```
        Write a small system of equations involving e.D/; e.B/, and e.C / that could be
```
```
      solved to find e.D/. You do not need to solve the equations.
```
```

      Problem 19.17.
```
```
      A coin with probability p of flipping Heads and probability q WWD 1 p of flipping
```
```
      tails is repeatedly flipped until two consecutive flips match—that is, until HH or
```
```
      TT occurs. The outcome tree A for this setup is illustrated in Figure 19.10.
```
```
         Let e.T / be the expected number of flips starting at the root of subtree T of A.
```
```
      So we’re interested in finding e.A/.
```
```
         Write a small system of equations involving e.A/; e.B/, and e.C / that could be
```
```
      solved to find e.A/. You do not need to solve the equations.
```
```

      Homework Problems
```
```
      Problem 19.18.
```
```
      We are given a random vector of n distinct numbers. We then determine the maxi-
```
```
      mum of these numbers using the following procedure:
```
```
        Pick the first number. Call it the current maximum. Go through the rest of the
```
```
      vector (in order) and each time we come across a number (call it x) that exceeds
```
```
      our current maximum, we update the current maximum with x.
```
```
                 

           19.6. Really Great Expectations                                                                  901
```
```

             What is the expected number of times we update the current maximum?
```
```
             Hint: Let Xi be the indicator variable for the event that the i th element in the
```
```
           vector is larger than all the previous elements.
```
```

           Problem 19.19.
```
```
           A fair six-sided die is repeatedly thrown until a six appears. We are interested in
```
```
           the expected time for a six to appear under certain conditions.
```
```
              A natural probability space S modelling this situation is the set of finite strings
```
```
           s 2 Œ1::5 6 of integers from one to six that end at the first occurrence of a six, with
```
```
           PrŒs WWD .1=6/jsj . Let T be the random variable equal to the number of throws until
```
```
           six appears, namely, T .s/ is the length jsj of s.
```
```
            (a) What is the expected time ExŒT  till a six is thrown?
```
```

             Let V be the event that all the dice throws are eVen. That is, V D f2; 4g 6 is the
```
```
           event that all throws are 2’s and 4’s until the first 6.
```
```
           (b) Prove that PrŒV  D 1=4.
```
```
           Hint: V D 2V [ 4V [ f6g.
```
```

            (c) Use the definition of ExŒT j V  as a sum over s 2 V to compute the expected
```
```
           time ExŒT j V  till a six is thrown given that all throws are even.
```
```

            (d) Given that all throws are even, the only possible throws are two, four and six,
```
```
           so we might as well just consider a three-sided die with sides two, four and six. By
```
```
           Mean Time to Failure, the expected time till a six is thrown by a three-sided die is
```
```
           1/(1/3) = 3, so ExŒT j V  D 3, contradicting part (c)! Explain.8
```

Problems for Section 19.6
```
           Class Problems
```
```
           Problem 19.20.
```
```
           You have a biased coin with nonzero probability p < 1 of tossing a Head. You
```
```
           toss until a Head comes up. Then, similar to the example in Section 19.6, you
```
```
           keep tossing until you get another Head preceded by a run of consecutive Tails
```
```
               8 If you’re thrown by this, you are not alone. There are several websites devoted to explanations
```
```

           of this seductive problem. In fact, when it came up at the MIT Theory of Computation faculty lunch
```
```
           in April 2018, several attendees confidently defended the mistaken reasoning.
```
```
                

## 902 Chapter 19   Random Variables
```
```

           whose length is within 10 of your original run. That is, if you began by tossing k
```
```
           tails followed by a Head, then you continue tossing until you get a run of at least
```
```
           maxfk 10; 0g consecutive Tails.
```
```
            (a) Let H be the number of Heads that you toss until you get the required run of
```
```
           Tails. Prove that the expected value of H is infinite.
```
```

            (b) Let r < 1 be a positive real number. Instead of waiting for a run of Tails of
```
```
           length k 10 when your original run was length k, just wait for a run of length at
```
```
           least rk. Show that in this case, the expected number of Heads is finite.
```
```

           Exam Problems
```
```
           Problem 19.21.
```
```
           You have a random process for generating a positive integer K. The behavior of
```
```
           your process each time you use it is (mutually) independent of all its other uses. You
```
```
           use your process to generate an integer, and then use your procedure repeatedly
```
```
           until you generate an integer as big as your first one. Let R be the number of
```
```
           additional integers you have to generate.
```
```
            (a) State and briefly explain a simple closed formula for ExŒR j K D k in terms
```
```
           of PrŒK  k.
```
```

           Suppose PrŒK D k D ‚.k 4 /.
```
```

           (b) Show that PrŒK  k D ‚.k 3 /.
```
```

            (c) Show that ExŒR is infinite.
```

Problems for Section 19.6
```
           Practice Problems
```
```
           Problem 19.22.
```
```
           MIT students sometimes delay doing laundry until they finish their problem sets.
```
```
           Assume all random values described below are mutually independent.
```
```
            (a) A busy student must complete 3 problem sets before doing laundry. Each
```
```
           problem set requires 1 day with probability 2=3 and 2 days with probability 1=3.
```
```
           Let B be the number of days a busy student delays laundry. What is ExŒB?
```
```
      

19.6. Really Great Expectations                                                      903
```

Example: If the first problem set requires 1 day and the second and third problem
sets each require 2 days, then the student delays for B D 5 days.

 (b) A relaxed student rolls a fair, 6-sided die in the morning. If he rolls a 1, then he
does his laundry immediately (with zero days of delay). Otherwise, he delays for
one day and repeats the experiment the following morning. Let R be the number
of days a relaxed student delays laundry. What is ExŒR?
Example: If the student rolls a 2 the first morning, a 5 the second morning, and a 1
the third morning, then he delays for R D 2 days.

 (c) Before doing laundry, an unlucky student must recover from illness for a num-
ber of days equal to the product of the numbers rolled on two fair, 6-sided dice.
Let U be the expected number of days an unlucky student delays laundry. What is
ExŒU ?
Example: If the rolls are 5 and 3, then the student delays for U D 15 days.

 (d) A student is busy with probability 1=2, relaxed with probability 1=3, and un-
lucky with probability 1=6. Let D be the number of days the student delays laundry.
What is ExŒD?

Problem 19.23.
Each Math for Computer Science final exam will be graded according to a rigorous
procedure:
```

     With probability 4=7 the exam is graded by a TA,with probability 2=7 it is
```
```
      graded by a lecturer, and with probability 1=7, it is accidentally dropped
```
```
      behind the radiator and arbitrarily given a score of 84.
```
```

     TAs score an exam by scoring each problem individually and then taking the
```
```
      sum.
```
```

          – There are ten true/false questions worth 2 points each. For each, full
```
```
            credit is given with probability 3=4, and no credit is given with proba-
```
```
            bility 1=4.
```
```
          – There are four questions worth 15 points each. For each, the score is
```
```
            determined by rolling two fair dice, summing the results, and adding 3.
```
```
          – The single 20 point question is awarded either 12 or 18 points with
```
```
            equal probability.
```
```
           

## 904 Chapter 19   Random Variables
```
```

           Lecturers score an exam by rolling a fair die twice, multiplying the results,
```
```
            and then adding a “general impression”score.
```
```

               – With probability 4=10, the general impression score is 40.
```
```
               – With probability 3=10, the general impression score is 50.
```
```
               – With probability 3=10, the general impression score is 60.
```
```

      Assume all random choices during the grading process are independent.
```
```
      (a) What is the expected score on an exam graded by a TA?
```
```

      (b) What is the expected score on an exam graded by a lecturer?
```
```

       (c) What is the expected score on a Math for Computer Science final exam?
```
```

      Class Problems
```
```
      Problem 19.24.
```
```
      A classroom has sixteen desks in a 4  4 arrangement as shown below.
```
```

      If there is a girl in front, behind, to the left, or to the right of a boy, then the two
```
```
      flirt. One student may be in multiple flirting couples; for example, a student in a
```
```
      corner of the classroom can flirt with up to two others, while a student in the center
```
```
      can flirt with as many as four others. Suppose that desks are occupied mutually in-
```
```
      dependently by boys and girls with equal probability. What is the expected number
```
```
      of flirting couples? Hint: Linearity.
```
```
      

19.6. Really Great Expectations                                                      905
```

Problem 19.25.
A literal is a propositional variable P or its negation P , where as usual “P ” abbre-
viates “NOT.P /.” A 3-clause is an OR of three literals from three different variables.
For example,
```
                                   P1 OR P2 OR P3
```
is a 3-clause, but P1 OR P1 OR P2 is not because P1 appears twice. A 3-CNF is a
formula that is an AND of 3-clauses. For example,
```

        .P1 OR P2 OR P3 / AND .P1 OR P3 OR P4 / AND .P2 OR P3 OR P4 /
```

is a 3-CNF.
   Suppose that G is a 3-CNF with seven 3-clauses. Assign true/false values to the
variables in G independently and with equal probability.
(a) What is the probability that the nth clause is true?

(b) What is the expected number of true 3-clauses in G?

 (c) Use the fact that the answer to part (b) is greater than six to conclude G must
be satisfiable.

Problem 19.26.
A literal is a propositional variable or its negation. A k-clause is an OR of k literals,
with no variable occurring more than once in the clause. For example,
```

                                  P OR Q OR R OR V;
```

is a 4-clause, but
```
                                  V OR Q OR X OR V;
```
is not, since V appears twice.
   Let S be a set of n distinct k-clauses involving v variables. The variables in
different k-clauses may overlap or be completely different, so k  v  nk.
   A random assignment of true/false values will be made independently to each of
the v variables, with true and false assignments equally likely. Write formulas in n,
k and v in answer to the first two parts below.
 (a) What is the probability that any particular k-clause in S is true under the ran-
dom assignment?

(b) What is the expected number of true k-clauses in S?
```
           

## 906 Chapter 19   Random Variables
```
```

       (c) A set of propositions is satisfiable iff there is an assignment to the variables
```
```
      that makes all of the propositions true. Use your answer to part (b) to prove that if
```
```
      n < 2k , then S is satisfiable.
```
```

      Problem 19.27.
```
```
      There are n students who are both taking Math for Computer Science (MCS) and
```
```
      Introduction to Signal Processing (SP) this term. To make it easier on themselves,
```
```
      the Professors in charge of these classes have decided to randomly permute their
```
```
      class lists and then assign students grades based on their rank in the permutation
```
```
      (just as many students have suspected). Assume the permutations are equally likely
```
```
      and independent of each other. What is the expected number of students that have
```
```
      in rank in SP that is higher by k than their rank in MCS?
```
```
         Hint: Let Xr be the indicator variable for the rth ranked student in CS having a
```
```
      rank in SP of at least r C k.
```
```

      Problem 19.28.
```
```
      A man has a set of n keys, one of which fits the door to his apartment. He tries the
```
```
      keys randomly until he finds the key that fits. Let T be the number of times he tries
```
```
      keys until he finds the right key.
```
```
       (a) Suppose each time he tries a key that does not fit the door, he simply puts it
```
```
      back. This means he might try the same ill-fitting key several times before he finds
```
```
      the right key. What is ExŒT ?
```
```
      Hint: Mean time to failure.
```
```
         Now suppose he throws away each ill-fitting key that he tries. That is, he chooses
```
```
      keys randomly from among those he has not yet tried. This way he is sure to find
```
```
      the right key within n tries.
```
```
       (b) If he hasn’t found the right key yet and there are m keys left, what is the
```
```
      probability that he will find the right key on the next try?
```
```

       (c) Given that he did not find the right key on his first k 1 tries, verify that the
```
```
      probability that he does not find it on the kth trial is given by
```
```
                                                            n k
```
```
                            Pr T > k j T > k      1 D               :
```
```
                                                            n .k 1/
```
```

      (d) Prove that
```
```
                                                    n       k
```
```
                                      PrŒT > k D               :                  (19.18)
```
```
                                                        n
```
```
      

19.6. Really Great Expectations                                                     907
```

Hint: This can be argued directly, but if you don’t see how, induction using part (c)
will work.

 (e) Conclude that in this case
```
                                                      nC1
```
```
                                         ExŒT  D         :
```
```
                                                       2
```

Problem 19.29.
Justify each line of the following proof that if R and S are independent random
variables, then
```
                             ExŒR  S  D ExŒR  ExŒS :
```

Proof.
```

                 ExŒR  S 
```
```
                        X
```
```
                 D                    t  PrŒR  S D t 
```
```
                     t 2range.RS /
```
```
                               X
```
```
                 D                              rs  PrŒR D r and S D s
```
```
                     r2range.R/; s2range.S /
```
```
                                  0                                            1
```
```
                        X                X
```
```
                 D                @                 rs  PrŒR D r and S D sA
```
```
                     r2range.R/       s2range.S /
```
```
                                  0                                             1
```
```
                        X                X
```
```
                 D                @                 rs  PrŒR D r  PrŒS D sA
```
```
                     r2range.R/       s2range.S /
```
```
                                  0                                            1
```
```
                        X                                  X
```
```
                 D                @r PrŒR D r                      s PrŒS D sA
```
```
                     r2range.R/                        s2range.S /
```
```
                        X
```
```
                 D                r PrŒR D r  ExŒS 
```
```
                     r2range.R/
```
```
                                  X
```
```
                 D ExŒS                   r PrŒR D r
```
```
                              r2range.R/
```
```

                 D ExŒS   ExŒR:
```
```

                                                                                    
```
```
           

## 908 Chapter 19   Random Variables
```
```

      Problem 19.30.
```
```
      A gambler bets on the toss of a fair coin: if the toss is Heads, the gambler gets back
```
```
      the amount he bet along with an additional the amount equal to his bet. Otherwise
```
```
      he loses the amount bet. For example, the gambler bets $10 and wins, he gets back
```
```
      $20 for a net profit of $10. If he loses, he gets back nothing for a net profit of
```
```
        $10—that is, a net loss of $10.
```
```
         Gamblers often try to develop betting strategies to beat the odds is such a game.
```
```
      A well known strategy of this kind is bet doubling, namely, bet $10 on red, and
```
```
      keep doubling the bet until a red comes up. So if the gambler wins his first $10
```
```
      bet, he stops playing and leaves with his $10 profit. If he loses the first bet, he bets
```
```
      $20 on the second toss. Now if the second toss is Heads, he gets his $20 bet plus
```
```
      $20 back and again walks away with a net profit of 20 10 D $10. If he loses the
```
```
      second toss, he bets $40 on the third toss, and so on.
```
```
         You would think that any such strategy will be doomed: in a fair game your
```
```
      expected win by definition is zero, so no strategy should have nonzero expectation.
```
```
      We can make this reasoning more precise as follows:
```
```

            Let Wn be a random variable equal to the amount won in the nth
```
```
            coin toss. So with the bet doubling strategy starting with a $10 bet,
```
```
            W1 D ˙10 with equal probability. If the betting ends before the nth
```
```
            bet, define Wn D 0. So W2 is zero with probability 1/2, is 10 with
```
```
            probability 1/4, and is 10 with probability 1/4. Now letting W be the
```
```
            amount won when the gambler stops betting, we have
```
```

                               W D W1 C W2 C    C Wn C    :
```
```

            Furthermore, since each toss is fair,
```
```

                                           ExŒWn  D 0
```
```

            for all n > 0. Now by linearity of expectation, we have
```
```

            ExŒW  D ExŒW1 CExŒW2 C  CExŒWn C   D 0C0C  C0C   D 0;
```
```
                                                                        (19.19)
```
```
            confirming that with fair tosses, the expected win is zero.
```
```

        But wait a minute!
```
```
      (a) Explain why the gambler is certain to win eventually if he keeps betting.
```
```

      (b) Prove that when the gambler finally wins a bet, his net profit is $10.
```
```
      

19.6. Really Great Expectations                                                    909
```

 (c) Since the gambler’s profit is always $10 when he wins, and he is certain to
win, his expected profit is also $10. That is
```

                                    ExŒW  D 10;
```

contradicting (19.19). So what’s wrong with the reasoning that led to the false
conclusion (19.19)?

Homework Problems
Problem 19.31.
Applying linearity of expectation to the binomial distribution fn;p immediately
yielded the identity 19.13:
```
                                 n
```
```
                                        !
```
```
                                 X    n k
```
```
                   ExŒfn;p  WWD   k     p .1 p/n k D pn:               (19.20)
```
```
                                      k
```
```
                                  kD0
```

Though it might seem daunting to prove this equation without appeal to linearity, it
is, after all, pretty similar to the binomial identity, and this connection leads to an
immediate alternative algebraic derivation.
(a) Starting with the binomial identity for .x C y/n , prove that
```
                                          n
```
```
                                                  !
```
```
                                         X      n
```
```
                      x n.x C y/n 1 D        k     xk yn k :                   (19.21)
```
```
                                                k
```
```
                                          kD0
```

(b) Now conclude equation (19.20).

Problem 19.32.
Short-term Capital Management (STCM) wants you to invest in a fund with the
following rules: you invest one million dollars in their Forward Looking Internet
Package (FLIP). Each year, the money in your FLIP account will double or halve
with equal probability, and each year STCM will pay you a dividend equal to 10%
of the money in your account.
(a) What is the expected number of dollars in your account at the end of k years?
Write a simple formula in terms of k.
Hint: $1,000,000 is in the account the end of year zero. Let Xi be 2 or 1=2 de-
pending on what happens to your money at the end of the i th year. So the amount
of money in the account at the end of year one is X1  $1; 000; 000 and the dividend
paid is .1=10/X1  $1; 000; 000.
```
           

## 910 Chapter 19   Random Variables
```
```

       (b) Give a closed form numerical expression for the expected total number of
```
```
      dollars in dividend payments you will receive by the end of the 10th year. You do
```
```
      not need to evaluate your expression.
```
```

       (c) Adam Smith does his own analysis of your account. He lets Yi D 1 if the
```
```
      money doubles at the end of year i and Yi D 1 otherwise. Then the money in
```
```
      your account after year k is
```
```
                             106 2Y1 2Y2    2Yk D 106 2Y1 CY2 CCYk :
```
```
      But ExŒYi  D 0, so
```
```
               2ExŒY1 CY2 CCYk  D 2ExŒY1 CExŒY2 CCExŒYk  D 2k0 D 20 D 1:
```
```
      In other words, the expected amount of money in your account forever remains the
```
```
      same as your original investment.
```
```
      What is wrong with Adam Smith’s analysis?
```
```

      Problem 19.33.
```
```
      A coin will be flipped repeatedly until the sequence TTH (tail/tail/head) comes
```
```
      up. Successive flips are independent, and the coin has probability p of coming up
```
```
      heads. Let NTTH be the number of coin flips until TTH first appears. What value of
```
```
      p minimizes ExŒNTTH ?
```
```

      Problem 19.34.
```
```
      (A true story from World War Two.)
```
```
         The army needs to test n soldiers for a disease. There is a blood test that accu-
```
```
      rately determines when a blood sample contains blood from a diseased soldier. The
```
```
      army presumes, based on experience, that the fraction of soldiers with the disease
```
```
      is approximately equal to some small number p.
```
```
         Approach (1) is to test blood from each soldier individually; this requires n tests.
```
```
      Approach (2) is to randomly group the soldiers into g groups of k soldiers, where
```
```
      n D gk. For each group, blend the k blood samples of the people in the group,
```
```
      and test the blended sample. If the group-blend is free of the disease, we are done
```
```
      with that group after one test. If the group-blend tests positive for the disease, then
```
```
      someone in the group has the disease, and we to test all the people in the group for
```
```
      a total of k C 1 tests on that group.
```
```
         Since the groups are chosen randomly, each soldier in the group has the disease
```
```
      with probability p, and it is safe to assume that whether one soldier has the disease
```
```
      is independent of whether the others do.
```
```
      

19.6. Really Great Expectations                                                    911
```

 (a) What is the expected number of tests in Approach (2) as a function of the
number of soldiers n, the disease fraction p, and the group size k?

 (b) Show how to choose k so that the expected number of tests using Approach (2)
```
                  p
```
is approximately n p. Hint: Since p is small, you may assume that .1 p/k  1
and ln.1 p/  p.

 (c) What fraction of the work does Approach (2) expect to save over Approach
(1) in a million-strong army of whom approximately 1% are diseased?

 (d) Can you come up with a better scheme by using multiple levels of grouping,
that is, groups of groups?

Problem 19.35.
A wheel-of-fortune has the numbers from 1 to 2n arranged in a circle. The wheel
has a spinner, and a spin randomly determines the two numbers at the opposite ends
of the spinner. How would you arrange the numbers on the wheel to maximize the
expected value of:
(a) the sum of the numbers chosen? What is this maximum?

(b) the product of the numbers chosen? What is this maximum?
Hint: For part (b), verify that the sum of the products of numbers oppposite each
other is maximized when successive integers are on the opposite ends of the spin-
ner, that is, 1 is opposite 2, 3 is opposite 4, 5 is opposite 6, . . . .

Problem 19.36.
Let R and S be independent random variables, and f and g be any functions such
that domain.f / D codomain.R/ and domain.g/ D codomain.S /. Prove that f .R/
and g.S / are also independent random variables.
  Hint: The event Œf .R/ D a is the disjoint union of all the events ŒR D r for r
such that f .r/ D a.

Problem 19.37.
Peeta bakes between 1 and 2n loaves of bread to sell every day. Each day he rolls
a fair, n-sided die to get a number from 1 to n, then flips a fair coin. If the coin is
heads, he bakes m loaves of bread , where m is the number on the die that day, and
if the coin is tails, he bakes 2m loaves.
```
           

## 912 Chapter 19   Random Variables
```
```

       (a) For any positive integer k  2n, what is the probability that Peeta will make
```
```
      k loaves of bread on any given day?
```
```
      Hint: Express your solution by cases.
```
```

       (b) What is the expected number of loaves that Peeta would bake on any given
```
```
      day?
```
```

       (c) Continuing this process, Peeta bakes bread every day for 30 days. What is the
```
```
      expected total number of loaves that Peeta would bake?
```
```

      Exam Problems
```
```
      Problem 19.38.
```
```
      A box initially contains n balls, all colored black. A ball is drawn from the box at
```
```
      random.
```
```

           If the drawn ball is black, then a biased coin with probability, p > 0, of
```
```
            coming up heads is flipped. If the coin comes up heads, a white ball is put
```
```
            into the box; otherwise the black ball is returned to the box.
```
```

           If the drawn ball is white, then it is returned to the box.
```
```

      This process is repeated until the box contains n white balls.
```
```
        Let D be the number of balls drawn until the process ends with the box full of
```
```
      white balls. Prove that ExŒD D nHn =p, where Hn is the nth Harmonic number.
```
```
        Hint: Let Di be the number of draws after the i th white ball until the draw when
```
```
      the .i C 1/st white ball is put into the box.
```
```

      Problem 19.39.
```
```
      A gambler bets $10 on “red” at a roulette table (the odds of red are 18/38, slightly
```
```
      less than even) to win $10. If he wins, he gets back twice the amount of his bet,
```
```
      and he quits. Otherwise, he doubles his previous bet and continues.
```
```
         For example, if he loses his first two bets but wins his third bet, the total spent
```
```
      on his three bets is 10 C 20 C 40 dollars, but he gets back 2  40 dollars after his
```
```
      win on the third bet, for a net profit of $10.
```
```
      (a) What is the expected number of bets the gambler makes before he wins?
```
```

      (b) What is his probability of winning?
```
```

       (c) What is his expected final profit (amount won minus amount lost)?
```
```
      

19.6. Really Great Expectations                                                    913
```

 (d) You can beat a biased game by bet doubling, but bet doubling is not feasible
because it requires an infinite bankroll. Verify this by proving that the expected size
of the gambler’s last bet is infinite.

Problem 19.40.
Six pairs of cards with ranks 1–6 are shuffled and laid out in a row, for example,
```

                         1 2 3 3 4 6 1 4 5 5 2 6
```

In this case, there are two adjacent pairs with the same value, the two 3’s and the
two 5’s. What is the expected number of adjacent pairs with the same value?

Problem 19.41.
There are six kinds of cards, three of each kind, for a total of eighteen cards. The
cards are randonly shuffled and laid out in a row, for example,
```

             1 2 5 5 5 1 4 6 2 6 6 2 1 4 3 3 3 4
```

In this case, there are two adjacent triples of the same kind, the three 3’s and the
three 5’s.
(a) Derive a formula for the probability that the 4th, 5th, and 6th consecutive cards
will be the same kind—that is, all 1’s or all 2’s or. . . all 6’s?

 (b) Let p WWD PrŒ4th, 5th and 6th cards match—that is, p is the correct answer to
part (a). Write a simple formula for the expected number of matching triples in
terms of p.
```
                

## 20 Deviation from the Mean
```
```
           In the previous chapter, we took it for granted that expectation is useful and de-
```
```
           veloped a bunch of techniques for calculating expected values. But why should we
```
```
           care about this value? After all, a random variable may never take a value anywhere
```
```
           near its expectation.
```
```
              The most important reason to care about the mean value comes from its con-
```
```
           nection to estimation by sampling. For example, suppose we want to estimate the
```
```
           average age, income, family size, or other measure of a population. To do this,
```
```
           we determine a random process for selecting people—say, throwing darts at cen-
```
```
           sus lists. This process makes the selected person’s age, income, and so on into a
```
```
           random variable whose mean equals the actual average age or income of the pop-
```
```
           ulation. So, we can select a random sample of people and calculate the average
```
```
           of people in the sample to estimate the true average in the whole population. But
```
```
           when we make an estimate by repeated sampling, we need to know how much con-
```
```
           fidence we should have that our estimate is OK, and how large a sample is needed
```
```
           to reach a given confidence level. The issue is fundamental to all experimental
```
```
           science. Because of random errors—noise—repeated measurements of the same
```
```
           quantity rarely come out exactly the same. Determining how much confidence
```
```
           to put in experimental measurements is a fundamental and universal scientific is-
```
```
           sue. Technically, judging sampling or measurement accuracy reduces to finding the
```
```
           probability that an estimate deviates by a given amount from its expected value.
```
```
              Another aspect of this issue comes up in engineering. When designing a sea wall,
```
```
           you need to know how strong to make it to withstand tsunamis for, say, at least a
```
```
           century. If you’re assembling a computer network, you might need to know how
```
```
           many component failures it should tolerate to likely operate without maintenance
```
```
           for at least a month. If your business is insurance, you need to know how large a
```
```
           financial reserve to maintain to be nearly certain of paying benefits for, say, the next
```
```
           three decades. Technically, such questions come down to finding the probability of
```
```
           extreme deviations from the mean.
```
```
              This issue of deviation from the mean is the focus of this chapter.
```

### 20.1 Markov’s Theorem
```
           Markov’s theorem gives a generally coarse estimate of the probability that a random
```
```
           variable takes a value much larger than its mean. It is an almost trivial result by
```
```
           

## 916 Chapter 20   Deviation from the Mean
```
```

      itself, but it actually leads fairly directly to much stronger results.
```
```
         The idea behind Markov’s Theorem can be explained by considering the quantity
```
```
      known as intelligence quotient, IQ, which remains in wide use despite doubts about
```
```
      its legitimacy. IQ was devised so that its average measurement would be 100. This
```
```
      immediately implies that at most 1/3 of the population can have an IQ of 300 or
```
```
      more, because if more than a third had an IQ of 300, then the average would have to
```
```
      be more than .1=3/  300 D 100. So, the probability that a randomly chosen person
```
```
      has an IQ of 300 or more is at most 1/3. By the same logic, we can also conclude
```
```
      that at most 2/3 of the population can have an IQ of 150 or more.
```
```
         Of course, these are not very strong conclusions. No IQ of over 300 has ever
```
```
      been recorded; and while many IQ’s of over 150 have been recorded, the fraction
```
```
      of the population that actually has an IQ that high is very much smaller than 2/3.
```
```
      But though these conclusions are weak, we reached them using just the fact that the
```
```
      average IQ is 100—along with another fact we took for granted, that IQ is never
```
```
      negative. Using only these facts, we can’t derive smaller fractions, because there
```
```
      are nonnegative random variables with mean 100 that achieve these fractions. For
```
```
      example, if we choose a random variable equal to 300 with probability 1/3 and 0
```
```
      with probability 2/3, then its mean is 100, and the probability of a value of 300 or
```
```
      more really is 1/3.
```
```
      Theorem 20.1.1 (Markov’s Theorem). If R is a nonnegative random variable, then
```
```
      for all x > 0
```
```
                                                    ExŒR
```
```
                                     PrŒR  x           :                   (20.1)
```
```
                                                       x
```
```
      Proof. Let Ix be the indicator variable for the event ŒR  x. Then
```
```

                                             xIx  R
```
```

      holds for all values of R since R  0. Taking expectations of both sides yields
```
```

                                       x PrŒR  x  ExŒR;
```
```

      and then dividing both sides of this inequality by x gives (20.1).                
```
```

        Our focus is deviation from the mean, so it’s useful to rephrase Markov’s Theo-
```
```
      rem this way:
```
```
      Corollary 20.1.2. If R is a nonnegative random variable, then for all c  1
```
```
                                                           1
```
```
                                       PrŒR  c  ExŒR   :                       (20.2)
```
```
                                                           c
```
```
        This Corollary follows immediately from Markov’s Theorem(20.1.1) by letting
```
```
      x be c  ExŒR.
```
```
     

20.1. Markov’s Theorem                                                          917
```

#### 20.1.1 Applying Markov’s Theorem
Let’s go back to the Hat-Check problem of Section 19.5.2. Now we ask what
the probability is that x or more men get the right hat, this is, what the value of
PrŒG  x is.
  We can compute an upper bound with Markov’s Theorem. Since we know
ExŒG D 1, Markov’s Theorem implies
```
                                           ExŒG      1
```
```
                            PrŒG  x             D :
```
```
                                              x       x
```
For example, there is no better than a 20% chance that 5 men get the right hat,
regardless of the number of people at the dinner party.
   The Chinese Appetizer problem is similar to the Hat-Check problem. In this
case, n people are eating different appetizers arranged on a circular, rotating Chi-
nese banquet tray. Someone then spins the tray so that each person receives a
random appetizer. What is the probability that everyone gets the same appetizer as
before?
   There are n equally likely orientations for the tray after it stops spinning. Ev-
eryone gets the right appetizer in just one of these n orientations. Therefore, the
correct answer is 1=n.
   But what probability do we get from Markov’s Theorem? Let the random vari-
able R be the number of people that get the right appetizer. Then of course ExŒR D
1, so applying Markov’s Theorem, we find:
```
                                          ExŒR      1
```
```
                            PrŒR  n           D :
```
```
                                            n       n
```
So for the Chinese appetizer problem, Markov’s Theorem is precisely right!
   Unfortunately, Markov’s Theorem is not always so accurate. For example, it
gives the same 1=n upper limit for the probability that everyone gets their own hat
back in the Hat-Check problem, where the probability is actually 1=.nŠ/. So for
Hat-Check, Markov’s Theorem gives a probability bound that is way too large.

#### 20.1.2 Markov’s Theorem for Bounded Variables
Suppose we learn that the average IQ among MIT students is 150 (which is not
true, by the way). What can we say about the probability that an MIT student has
an IQ of more than 200? Markov’s theorem immediately tells us that no more than
150=200 or 3=4 of the students can have such a high IQ. Here, we simply applied
Markov’s Theorem to the random variable R equal to the IQ of a random MIT
student to conclude:
```
                                      ExŒR     150     3
```
```
                      PrŒR > 200          D        D :
```
```
                                       200      200     4
```
```
                

## 918 Chapter 20   Deviation from the Mean
```
```

             But let’s observe an additional fact (which may be true): no MIT student has an
```
```
           IQ less than 100. This means that if we let T WWD R 100, then T is nonnegative
```
```
           and ExŒT  D 50, so we can apply Markov’s Theorem to T and conclude:
```
```

                                                               ExŒT    50   1
```
```
                            PrŒR > 200 D PrŒT > 100                D     D :
```
```
                                                                100     100  2
```
```
           So only half, not 3/4, of the students can be as amazing as they think they are. A
```
```
           bit of a relief!
```
```
              In fact, we can get better bounds applying Markov’s Theorem to R b instead of
```
```
           R for any lower bound b on R (see Problem 20.3). Similarly, if we have any upper
```
```
           bound u on a random variable S , then u S will be a nonnegative random variable,
```
```
           and applying Markov’s Theorem to u S will allow us to bound the probability
```
```
           that S is much less than its expectation.
```

### 20.2 Chebyshev’s Theorem
```
           We’ve seen that Markov’s Theorem can give a better bound when applied to R b
```
```
           rather than R. More generally, a good trick for getting stronger bounds on a ran-
```
```
           dom variable R out of Markov’s Theorem is to apply the theorem to some cleverly
```
```
           chosen function of R. Choosing functions that are powers of the absolute value of
```
```
           R turns out to be especially useful. In particular, since jRjz is nonnegative for any
```
```
           real number z, Markov’s inequality also applies to the event Œ jRjz  x z . But for
```
```
           positive x; z > 0 this event is equivalent to the event Œ jRj  x for , so we have:
```
```

           Lemma 20.2.1. For any random variable R and positive real numbers x; z,
```
```

                                                           ExŒ jRjz 
```
```
                                           PrŒjRj  x               :
```
```
                                                              xz
```
```
             Rephrasing (20.2.1) in terms of jR      ExŒR j, the random variable that measures
```
```
           R’s deviation from its mean, we get
```
```

                                                           ExŒ.jR     ExŒRj/z 
```
```
                                PrŒ jR    ExŒR j  x                      :            (20.3)
```
```
                                                                  xz
```
```
           When z is positive and even, .R ExŒR/z is nonnegative, so the absolute value
```
```
           on the right-hand side of the inequality (20.3) is redundant. The case when z D 2
```
```
           turns out to be so important that the numerator of the right-hand side has been given
```
```
           a name:
```
```
      

20.2. Chebyshev’s Theorem                                                                     919
```

Definition 20.2.2. The variance of a random variable R is:
```

                        VarŒR WWD Ex .R ExŒR/2 :
```
```
                                                    
```

  Variance is also known as mean square deviation.
  The restatement of (20.3) for z D 2 is known as Chebyshev’s Theorem.1

Theorem 20.2.3 (Chebyshev). Let R be a random variable and x 2 RC . Then
```

                                                           VarŒR
```
```
                             PrŒjR     ExŒR j  x              :
```
```
                                                            x2
```
   The expression ExŒ.R ExŒR/2  for variance is a bit cryptic; the best approach
is to work through it from the inside out. The innermost expression R ExŒR is
precisely the deviation of R above its mean. Squaring this, we obtain .R ExŒR/2 .
This is a random variable that is near 0 when R is close to the mean and is a large
positive number when R deviates far above or below the mean. So if R is always
close to the mean, then the variance will be small. If R is often far from the mean,
then the variance will be large.

#### 20.2.1 Variance in Two Gambling Games
The relevance of variance is apparent when we compare the following two gam-
bling games.
   Game A: We win $2 with probability 2=3 and lose $1 with probability 1=3.
   Game B: We win $1002 with probability 2=3 and lose $2001 with probability
1=3.
   Which game is better financially? We have the same probability, 2/3, of winning
each game, but that does not tell the whole story. What about the expected return for
each game? Let random variables A and B be the payoffs for the two games. For
example, A is 2 with probability 2/3 and -1 with probability 1/3. We can compute
the expected payoff for each game as follows:
```
                                       2         1
```
```
                               ExŒA D 2 
```
```
                                         C . 1/  D 1;
```
```
                                       3         3
```
```
                                     2           1
```
```
                       ExŒB D 1002  C . 2001/  D 1:
```
```
                                     3           3
```
  The expected payoff is the same for both games, but the games are very different.
This difference is not apparent in their expected value, but is captured by variance.
   1 There are Chebyshev Theorems in several other disciplines, but Theorem 20.2.3 is the only one

we’ll refer to.
```
           

## 920 Chapter 20    Deviation from the Mean
```
```

      We can compute the VarŒA by working “from the inside out” as follows:
```
```

                                                  with probability 23
```
```
                                          
```
```
                                              1
```
```
                          A ExŒA D
```
```
                                               2 with probability 13
```
```
                                            1 with probability 32
```
```
                                          
```
```
                                   2
```
```
                       .A ExŒA/ D
```
```
                                            4 with probability 13
```
```
                                             2       1
```
```
                  ExŒ.A ExŒA/2  D 1  C 4 
```
```
                                             3       3
```
```
                             VarŒA D 2:
```
```

        Similarly, we have for VarŒB:
```
```

                                                           with probability 23
```
```
                                               
```
```
                                                   1001
```
```
                            B     ExŒB D
```
```
                                                    2002   with probability 13
```
```
                                               1; 002; 001 with probability 23
```
```
                                               
```
```
                                       2
```
```
                       .B       ExŒB/     D
```
```
                                               4; 008; 004 with probability 13
```
```
                                                          2               1
```
```
                   ExŒ.B        ExŒB/2  D 1; 002; 001  C 4; 008; 004 
```
```
                                                          3               3
```
```
                                 VarŒB D 2; 004; 002:
```
```

         The variance of Game A is 2 and the variance of Game B is more than two
```
```
      million! Intuitively, this means that the payoff in Game A is usually close to the
```
```
      expected value of $1, but the payoff in Game B can deviate very far from this
```
```
      expected value.
```
```
         High variance is often associated with high risk. For example, in ten rounds of
```
```
      Game A, we expect to make $10, but could conceivably lose $10 instead. On the
```
```
      other hand, in ten rounds of game B, we also expect to make $10, but could actually
```
```
      lose more than $20,000!
```
```

      20.2.2       Standard Deviation
```
```
      In Game B above, the deviation from the mean is 1001 in one outcome and -2002
```
```
      in the other. But the variance is a whopping 2,004,002. The happens because the
```
```
      “units” of variance are wrong: if the random variable is in dollars, then the expec-
```
```
      tation is also in dollars, but the variance is in square dollars. For this reason, people
```
```
      often describe random variables using standard deviation instead of variance.
```
```

      Definition 20.2.4. The standard deviation R of a random variable R is the square
```
```
      root of the variance:
```
```
                                  p           q
```
```
                            R WWD VarŒR D ExŒ.R ExŒR/2 :
```
```
     

20.2. Chebyshev’s Theorem                                                         921
```
```

                                                      mean
```
```

                                         O.¢/
```

**Figure 1 The standard deviation of a distribution indicates how wide the**
“main part” of it is.

  So the standard deviation is the square root of the mean square deviation, or
the root mean square for short. It has the same units—dollars in our example—as
the original random variable and as the mean. Intuitively, it measures the average
deviation from the mean, since we can think of the square root on the outside as
canceling the square on the inside.
**Example 2.5. The standard deviation of the payoff in Game B is:**
```
                         p           p
```
```
                  B D VarŒB D 2; 004; 002  1416:
```
```

   The random variable B actually deviates from the mean by either positive 1001
```
or negative 2002, so the standard deviation of 1416 describes this situation more
closely than the value in the millions of the variance.
   For bell-shaped distributions like the one illustrated in Figure 20.1, the standard
deviation measures the “width” of the interval in which values are most likely to
fall. This can be more clearly explained by rephrasing Chebyshev’s Theorem in
terms of standard deviation, which we can do by substituting x D cR in (20.1):

Corollary 20.2.6. Let R be a random variable, and let c be a positive real number.
```
                                                       1
```
```
                            PrŒjR   ExŒRj  cR        :                    (20.4)
```
```
                                                       c2
```
   Now we see explicitly how the “likely” values of R are clustered in an O.R /-
sized region around ExŒR, confirming that the standard deviation measures how
spread out the distribution of R is around its mean.
```
                 

## 922 Chapter 20    Deviation from the Mean
```
```

            The IQ Example
```
```
            The standard standard deviation of IQ’s regularly turns out to be about 15 even
```
```
            across different populations. This additional fact along with the national average
```
```
            IQ being 100 allows a better determination of the occurrence of IQ’s of 300 or
```
```
            more.
```
```
              Let the random variable R be the IQ of a random person. So ExŒR D 100,
```
```
            R D 15 and R is nonnegative. We want to compute PrŒR  300.
```
```
              We have already seen that Markov’s Theorem 20.1.1 gives a coarse bound, namely,
```
```
                                                                 1
```
```
                                                    PrŒR  300  :
```
```
                                                                 3
```
```
            Now we apply Chebyshev’s Theorem to the same problem:
```
```
                                                                     VarŒR    152     1
```
```
                     PrŒR  300 D PrŒjR             100j  200         2
```
```
                                                                            D     2
```
```
                                                                                         :
```
```
                                                                      200     200     178
```
```
               So Chebyshev’s Theorem implies that at most one person in 178 has an IQ of 300
```
```
            or more. We have gotten a much tighter bound using additional information—the
```
```
            variance of R—than we could get knowing only the expectation.
```

### 20.3 Properties of Variance
```
            Variance is the average of the square of the distance from the mean. For this rea-
```
```
            son, variance is sometimes called the “mean square deviation.” Then we take its
```
```
            square root to get the standard deviation—which in turn is called “root mean square
```
```
            deviation.”
```
```
               But why bother squaring? Why not study the actual distance from the mean,
```
```
            namely, the absolute value of R ExŒR, instead of its root mean square? The
```
```
            answer is that variance and standard deviation have useful properties that make
```
```
            them much more important in probability theory than average absolute deviation.
```
```
            In this section, we’ll describe some of those properties. In the next section, we’ll
```
```
            see why these properties are important.
```
```

            20.3.1       A Formula for Variance
```
```
            Applying linearity of expectation to the formula for variance yields a convenient
```
```
            alternative formula.
```
```
            Lemma 20.3.1.
```
```
                                           VarŒR D ExŒR2       Ex2 ŒR;
```
```
      

20.3. Properties of Variance                                                     923
```

for any random variable R.

  Here we use the notation Ex2 ŒR as shorthand for .ExŒR/2 .

Proof. Let  D ExŒR. Then
```

         VarŒR D ExŒ.R        ExŒR/2             (Def 20.2.2 of variance)
```
```
                                 2
```
```
                 D ExŒ.R       /                                 (def of )
```
```
                          2                2
```
```
                 D ExŒR        2R C  
```
```
                          2
```
```
                 D ExŒR       2 ExŒR C 2        (linearity of expectation)
```
```
                          2          2     2
```
```
                 D ExŒR       2 C                               (def of )
```
```
                 D ExŒR2      2
```
```
                 D ExŒR2      Ex2 ŒR:                            (def of )
```
```

                                                                                  
```

  A simple and very useful formula for the variance of an indicator variable is an
immediate consequence.

Corollary 20.3.2. If B is a Bernoulli variable where p WWD PrŒB D 1 and q WWD
## 1 p, then
```
                            VarŒB D p p 2 D pq:                        (20.5)
```

Proof. By Lemma 19.4.2, ExŒB D p. But B only takes values 0 and 1, so B 2 D B
and equation (20.5) follows immediately from Lemma 20.3.1.                   

#### 20.3.2 Variance of Time to Failure
According to Section 19.4.6, the mean time to failure is 1=p for a process that fails
during any given hour with probability p. What about the variance?
  By Lemma 20.3.1,
```
                           VarŒC  D ExŒC 2  .1=p/2                          (20.6)
```
so all we need is a formula for ExŒC 2 .
   Now ExŒC  WWD i1 i 2 q i 1 p by definition, and we could evaluate this series
```
              2
```
```
                     P
```
using methods from Chapter 14 or 16.
   A simpler alternative appeals to conditional expectation much as we did in Sec-
tion 19.4.6 to derive the formula for mean time to failure. Namely, the expected
```
           

## 924 Chapter 20    Deviation from the Mean
```
```

      value of C 2 is the probability p of failure in the first hour times 12 , plus the prob-
```
```
      ability q of non-failure in the first hour times the expected value of .C C 1/2 . So
```
```

                            ExŒC 2  D p  12 C q ExŒ.C C 1/2 
```
```
                                                               
```
```
                                                     2    2
```
```
                                     D p C q ExŒC  C C 1
```
```
                                                          p
```
```
                                                                 
```
```
                                                   2        2
```
```
                                     D p C q ExŒC  C q       C1 ;                so
```
```
                                                            p
```
```
                                                      
```
```
                                 2              2
```
```
                          p ExŒC  D p C q        C1
```
```
                                                p
```
```
                                       p 2 C q.2 C p/
```
```
                                     D                   and
```
```
                                              p
```
```
                                       2 p
```
```
                            ExŒC 2  D
```
```
                                        p2
```
```
      Combining this with (20.6) proves
```
```

      Lemma 20.3.3. If failures occur with probability p independently at each step, and
```
```
      C is the number of steps until the first failure,2 then
```
```
                                                           q
```
```
                                              VarŒC  D       :                                   (20.7)
```
```
                                                           p2
```
```

      20.3.3       Dealing with Constants
```
```
      It helps to know how to calculate the variance of aR C b:
```
```

      Theorem 20.3.4. [Square Multiple Rule for Variance] Let R be a random variable
```
```
      and a a constant. Then
```
```
                                 VarŒaR D a2 VarŒR:                         (20.8)
```
```

      Proof. Beginning with the definition of variance and repeatedly applying linearity
```
```
        2 That is, C has the geometric distribution with parameter p according to Definition 19.4.7.
```
```
      

20.3. Properties of Variance                                                      925
```

of expectation, we have:
```

     VarŒaR WWD ExŒ.aR          ExŒaR/2 
```
```
               D ExŒ.aR/2         2aR ExŒaR C Ex2 ŒaR
```
```
               D ExŒ.aR/2        ExŒ2aR ExŒaR C Ex2 ŒaR
```
```
               D a2 ExŒR2        2 ExŒaR ExŒaR C Ex2 ŒaR
```
```
               D a2 ExŒR2  a2 Ex2 ŒR
```
```
               D a2 ExŒR2  Ex2 ŒR
```
```
                                    
```
```

               D a2 VarŒR                                       (Lemma 20.3.1)
```
```

                                                                                  
```

  It’s even simpler to prove that adding a constant does not change the variance, as
the reader can verify:
Theorem 20.3.5. Let R be a random variable, and b a constant. Then
```

                                   VarŒR C b D VarŒR:                      (20.9)
```

  Recalling that the standard deviation is the square root of variance, this implies
that the standard deviation of aR C b is simply jaj times the standard deviation of
R:
Corollary 20.3.6.
```
                                     .aRCb/ D jaj R :
```

#### 20.3.4 Variance of a Sum
In general, the variance of a sum is not equal to the sum of the variances, but
variances do add for independent variables. In fact, mutual independence is not
necessary: pairwise independence will do. This is useful to know because there are
some important situations, such as Birthday Matching in Section 17.4, that involve
variables that are pairwise independent but not mutually independent.
Theorem 20.3.7. If R and S are independent random variables, then
```

                               VarŒR C S  D VarŒR C VarŒS :              (20.10)
```

Proof. We may assume that ExŒR D 0, since we could always replace R by
R ExŒR in equation (20.10); likewise for S. This substitution preserves the
independence of the variables, and by Theorem 20.3.5, does not change the vari-
ances.
```
           

## 926 Chapter 20   Deviation from the Mean
```
```

        But for any variable T with expectation zero, we have VarŒT  D ExŒT 2 , so we
```
```
      need only prove
```
```
                             ExŒ.R C S /2  D ExŒR2  C ExŒS 2 :               (20.11)
```
```
      But (20.11) follows from linearity of expectation and the fact that
```
```

                                       ExŒRS  D ExŒR ExŒS                       (20.12)
```
```

      since R and S are independent:
```
```

            ExŒ.R C S /2  D ExŒR2 C 2RS C S 2 
```
```
                             D ExŒR2  C 2 ExŒRS  C ExŒS 2 
```
```
                             D ExŒR2  C 2 ExŒR ExŒS  C ExŒS 2       (by (20.12))
```
```
                             D ExŒR2  C 2  0  0 C ExŒS 2 
```
```
                             D ExŒR2  C ExŒS 2 :
```
```

                                                                                        
```
```

         It’s easy to see that additivity of variance does not generally hold for variables
```
```
      that are not independent. For example, if R D S , then equation (20.10) becomes
```
```
      VarŒR CR D VarŒRCVarŒR. By the Square Multiple Rule, Theorem 20.3.4, this
```
```
      holds iff 4 VarŒR D 2 VarŒR, which implies that VarŒR D 0. So equation (20.10)
```
```
      fails when R D S and R has nonzero variance.
```
```
         The proof of Theorem 20.3.7 carries over to the sum of any finite number of
```
```
      variables (Problem 20.19), so we have:
```
```

      Theorem 20.3.8. [Pairwise Independent Additivity of Variance] If R1 ; R2 ; : : : ; Rn
```
```
      are pairwise independent random variables, then
```
```

          VarŒR1 C R2 C    C Rn  D VarŒR1  C VarŒR2  C    C VarŒRn :     (20.13)
```
```

        Now we have a simple way of computing the variance    Pn of a variable J that has
```
```
      an .n; p/-binomial distribution. We know that J D          kD1 Ik where the Ik are
```
```
      mutually independent indicator variables with PrŒIk D 1 D p. The variance of
```
```
      each Ik is pq by Corollary 20.3.2, so by linearity of variance, we have
```
```

      Lemma 20.3.9 (Variance of the Binomial Distribution). If J has the .n; p/-binomial
```
```
      distribution, then
```
```
                               VarŒJ  D n VarŒIk  D npq:                       (20.14)
```
```
      

20.3. Properties of Variance                                                       927
```

#### 20.3.5 Matching Birthdays
We saw in Section 17.4 that in a class of 95 students, it is virtually certain that
at least one pair of students will have the same birthday. In fact, several pairs of
students are likely to have the same birthday. How many matched birthdays should
we expect, and how likely are we to see that many matches in a random group of
students?
   Having matching birthdays for different pairs of students are not mutually inde-
pendent events. If Alice matches Bob and Alice matches Carol, it’s certain that Bob
and Carol match as well! So the events that various pairs of students have matching
birthdays are not even three-way independent.
   But knowing that Alice’s birthday matches Bob’s tells us nothing about who
Carol matches. This means that the events that a pair of people have matching
birthdays are pairwise independent (see Problem 19.2). So pairwise independent
additivity of variance, Theorem 20.3.8, will allow us to calculate the variance of
the number of birthday pairs and then apply Chebyshev’s bound to estimate the
liklihood of seeing some given number of matching pairs.
   In particular, suppose there are n students and d days in the year, and let M be the
number of pairs of students with matching birthdays. Namely, let B1 ; B2 ; : : : ; Bn
be the birthdays of n independently chosen people, and let Ei;j be the indicator
variable for the event that the i th and j th people chosen have the same birthdays,
that is, the event ŒBi D Bj . So in our probability model, the Bi ’s are mutually
independent variables, and the Ei;j ’s are pairwise independent. Also, the expecta-
tions of Ei;j for i ¤ j equals the probability that Bi D Bj , namely, 1=d .
   Now the number M of matching pairs of birthdays among the n choices is simply
the sum of the Ei;j ’s:                    X
```
                                 M D             Ei;j :                         (20.15)
```
```
                                           1i <j n
```

Linearity of expectation make it easy to calculate the expected number of pairs of
students with matching birthdays.
```
                      2               3                             !
```
```
                          X                   X                   n    1
```
```
         ExŒM  D Ex 4           Ei;j 5 D            ExŒEi;j  D       :
```
```
                                                                  2    d
```
```
                               1i <j n         1i <j n
```
```
                 

## 928 Chapter 20    Deviation from the Mean
```
```

           Similarly, pairwise independence makes it easy to calculate the variance.
```
```
                                    2              3
```
```
                                        X
```
```
                      VarŒM  D Var 4         Ei;j 5
```
```
                                            1i <j n
```
```
                                        X
```
```
                                 D               VarŒEi;j                  (Theorem 20.3.8)
```
```
                                     1i <j n
```
```
                                     !                     
```
```
                                   n     1              1
```
```
                                 D          1                  :           (Corollary 20.3.2)
```
```
                                   2     d              d
```
```

             In particular, for a class of n D 95 students with d D 365 possible birthdays, we
```
```
           have ExŒM   12:23 and VarŒM   12:23.1 1=365/ < 12:2. So by Chebyshev’s
```
```
           Theorem
```
```
                                                                12:2
```
```
                                       PrŒjM ExŒM j  x < 2 :
```
```
                                                                 x
```
```
           Letting x D 7, we conclude that there is a better than 75% chance that in a class of
```
```
           95 students, the number of pairs of students with the same birthday will be within
```
```
           7 of 12.23, that is, between 6 and 19.
```

### 20.4 Estimation by Random Sampling
```
           Massachusetts Democrats were astonished in 2010 when their early polls of sample
```
```
           voters showed Republican Scott Brown was favored by a majority of voters and so
```
```
           would win the special election to fill the Senate seat that the late Democrat Teddy
```
```
           Kennedy had occupied for over 40 years. Based on their poll results, they mounted
```
```
           an intense, but ultimately unsuccessful, effort to save the seat for their party.
```
```

           20.4.1       A Voter Poll
```
```
           Suppose at some time before the election that p was the fraction of voters favoring
```
```
           Scott Brown. We want to estimate this unknown fraction p. Suppose we have
```
```
           some random process for selecting voters from registration lists that selects each
```
```
           voter with equal probability. We can define an indicator variable K by the rule that
```
```
           K D 1 if the random voter most prefers Brown, and K D 0 otherwise.
```
```
             Now to estimate p, we take a large number n of random choices of voters3 and
```
```
              3 We’re choosing a random voter n times with replacement. We don’t remove a chosen voter from
```
```

           the set of voters eligible to be chosen later; so we might choose the same voter more than once!
```
```
           We would get a slightly better estimate if we required n different people to be chosen, but doing so
```
```
           complicates both the selection process and its analysis for little gain.
```