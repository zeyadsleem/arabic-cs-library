---
title: "Random Variables"
lang: en
---

## 19 Random Variables
```
           Thus far, we have focused on probabilities of events. For example, we computed
```
```
           the probability that you win the Monty Hall game or that you have a rare medical
```
```
           condition given that you tested positive. But, in many cases we would like to know
```
```
           more. For example, how many contestants must play the Monty Hall game until
```
```
           one of them finally wins? How long will this condition last? How much will I lose
```
```
           gambling with strange dice all night? To answer such questions, we need to work
```
```
           with random variables.
```

### 19.1 Random Variable Examples
```
           Definition 19.1.1. A random variable R on a probability space is a total function
```
```
           whose domain is the sample space.
```
```

              The codomain of R can be anything, but will usually be a subset of the real
```
```
           numbers. Notice that the name “random variable” is a misnomer; random variables
```
```
           are actually functions.
```
```
              For example, suppose we toss three independent, unbiased coins. Let C be the
```
```
           number of heads that appear. Let M D 1 if the three coins come up all heads or all
```
```
           tails, and let M D 0 otherwise. Now every outcome of the three coin flips uniquely
```
```
           determines the values of C and M . For example, if we flip heads, tails, heads, then
```
```
           C D 2 and M D 0. If we flip tails, tails, tails, then C D 0 and M D 1. In effect,
```
```
           C counts the number of heads, and M indicates whether all the coins match.
```
```
              Since each outcome uniquely determines C and M , we can regard them as func-
```
```
           tions mapping outcomes to numbers. For this experiment, the sample space is:
```
```

                    S D fHHH; HH T; H TH; H T T; THH; TH T; T TH; T T T g:
```
```

           Now C is a function that maps each outcome in the sample space to a number as
```
```
           follows:
```
```
                             C.HHH / D 3            C.THH / D 2
```
```
                             C.HH T / D 2           C.TH T / D 1
```
```
                             C.H TH / D 2           C.T TH / D 1
```
```
                             C.H T T / D 1          C.T T T / D 0:
```
```
           

## 858 Chapter 19    Random Variables
```
```

      Similarly, M is a function mapping each outcome another way:
```
```

                           M.HHH /      D   1       M.THH /       D    0
```
```
                           M.HH T /     D   0       M.TH T /      D    0
```
```
                           M.H TH /     D   0       M.T TH /      D    0
```
```
                           M.H T T /    D   0       M.T T T /     D    1:
```
```

      So C and M are random variables.
```
```

      19.1.1       Indicator Random Variables
```
```
      An indicator random variable is a random variable that maps every outcome to
```
```
      either 0 or 1. Indicator random variables are also called Bernoulli variables. The
```
```
      random variable M is an example. If all three coins match, then M D 1; otherwise,
```
```
      M D 0.
```
```
         Indicator random variables are closely related to events. In particular, an in-
```
```
      dicator random variable partitions the sample space into those outcomes mapped
```
```
      to 1 and those outcomes mapped to 0. For example, the indicator M partitions the
```
```
      sample space into two blocks as follows:
```
```

             HHH
```
```
             „  ƒ‚ T T T…         HH
```
```
                                  „ T    H TH     H T Tƒ‚ THH         TH T   T TH
```
```
                                                                                …:
```
```
                    M D1                              M D0
```
```

         In the same way, an event E partitions the sample space into those outcomes
```
```
      in E and those not in E. So E is naturally associated with an indicator random
```
```
      variable, IE , where IE .!/ D 1 for outcomes ! 2 E and IE .!/ D 0 for outcomes
```
```
      ! … E. This means that event E is the same as the event ŒIE D 1. For example
```
```
      the variable M above is really just the indicator variable IE , where E is the event
```
```
      that all three coins match.
```
```

      19.1.2       Random Variables and Events
```
```
      There is a strong relationship between events and more general random variables
```
```
      as well. A random variable that takes on several values partitions the sample space
```
```
      into several blocks. For example, C partitions the sample space as follows:
```
```

            TTT
```
```
            „ƒ‚…        T
```
```
                        „ TH     TH
```
```
                                  ƒ‚T   H T T…   THH
```
```
                                                 „        Hƒ‚
```
```
                                                           TH      HH T…     „ ƒ‚ … :
```
```
                                                                             HHH
```
```
            C D0                 C D1                      C D2               C D3
```
```

      Each block is a subset of the sample space and is therefore an event. So the assertion
```
```
      that C D 2 defines the event
```
```

                                ŒC D 2 D fTHH; H TH; HH T g;
```
```
                

           19.2. Independence                                                              859
```
```

           and this event has probability
```
```
                                                                      1 1 1
```
```
               PrŒC D 2 D PrŒTHH  C PrŒH TH  C PrŒHH T  D          C C D 3=8:
```
```
                                                                      8 8 8
```
```
           Likewise ŒM D 1 is the event fT T T; HHH g and has probability 1=4.
```
```
             More generally, any assertion about the values of random variables defines an
```
```
           event. For example, the assertion that C  1 defines
```
```

                                ŒC  1 D fT T T; T TH; TH T; H T T g;
```
```

           and so PrŒC  1 D 1=2.
```
```
              Another example is the assertion that C  M is an odd number. If you think about
```
```
           it for a minute, you’ll realize that this is an obscure way of saying that all three
```
```
           coins came up heads, namely,
```
```

                                       ŒC  M is odd D fHHH g:
```

### 19.2 Independence
```
           The notion of independence carries over from events to random variables as well.
```
```
           Random variables R1 and R2 are independent iff for all x1 ; x2 , the two events
```
```

                                      ŒR1 D x1    and ŒR2 D x2 
```
```

           are independent.
```
```
              For example, are C and M independent? Intuitively, the answer should be “no.”
```
```
           The number of heads C completely determines whether all three coins match; that
```
```
           is, whether M D 1. But, to verify this intuition, we must find some x1 ; x2 2 R
```
```
           such that:
```
```

                        PrŒC D x1 AND M D x2  ¤ PrŒC D x1   PrŒM D x2 :
```
```

           One appropriate choice of values is x1 D 2 and x2 D 1. In this case, we have:
```
```
                                                     1 3
```
```
                    PrŒC D 2 AND M D 1 D 0 ¤          D PrŒM D 1  PrŒC D 2:
```
```
                                                     4 8
```
```
           The first probability is zero because we never have exactly two heads (C D 2)
```
```
           when all three coins match (M D 1). The other two probabilities were computed
```
```
           earlier.
```
```
           

## 860 Chapter 19   Random Variables
```
```

         On the other hand, let H1 be the indicator variable for the event that the first flip
```
```
      is a Head, so
```
```
                         ŒH1 D 1 D fHHH; H TH; HH T; H T T g:
```
```
      Then H1 is independent of M , since
```
```
                                                               
```
```
           PrŒM D 1 D 1=4 D Pr M D 1 j H1 D 1 D Pr M D 1 j H1 D 0
```
```
                                                               
```
```
           PrŒM D 0 D 3=4 D Pr M D 0 j H1 D 1 D Pr M D 0 j H1 D 0
```
```

      This example is an instance of:
```
```

      Lemma 19.2.1. Two events are independent iff their indicator variables are inde-
```
```
      pendent.
```
```

         The simple proof is left to Problem 19.1.
```
```
         Intuitively, the independence of two random variables means that knowing some
```
```
      information about one variable doesn’t provide any information about the other
```
```
      one. We can formalize what “some information” about a variable R is by defining
```
```
      it to be the value of some quantity that depends on R. This intuitive property of
```
```
      independence then simply means that functions of independent variables are also
```
```
      independent:
```
```

      Lemma 19.2.2. Let R and S be independent random variables, and f and g be
```
```
      functions such that domain.f / D codomain.R/ and domain.g/ D codomain.S /.
```
```
      Then f .R/ and g.S / are independent random variables.
```
```

        The proof is another simple exercise left to Problem 19.36.
```
```
        As with events, the notion of independence generalizes to more than two random
```
```
      variables.
```
```

      Definition 19.2.3. Random variables R1 ; R2 ; : : : ; Rn are mutually independent iff
```
```
      for all x1 ; x2 ; : : : ; xn , the n events
```
```

                              ŒR1 D x1 ; ŒR2 D x2 ; : : : ; ŒRn D xn 
```
```

      are mutually independent. They are k-way independent iff every subset of k of
```
```
      them are mutually independent.
```
```

        Lemmas 19.2.1 and 19.2.2 both extend straightforwardly to k-way independent
```
```
      variables.
```
```
                  

            19.3. Distribution Functions                                                       861
```

### 19.3 Distribution Functions
```
            A random variable maps outcomes to values. The probability density function,
```
```
            PDFR .x/, of a random variable R measures the probability that R takes the value
```
```
            x, and the closely related cumulative distribution function CDFR .x/ measures the
```
```
            probability that R  x. Random variables that show up for different spaces of
```
```
            outcomes often wind up behaving in much the same way because they have the
```
```
            same probability of taking different values, that is, because they have the same
```
```
            pdf/cdf.
```
```
            Definition 19.3.1. Let R be a random variable with codomain V . The probability
```
```
            density function of R is a function PDFR W V ! Œ0; 1 defined by:
```
```
                                              (
```
```
                                               PrŒR D x if x 2 range.R/;
```
```
                               PDFR .x/ WWD
```
```
                                               0         if x … range.R/:
```
```
              If the codomain is a subset of the real numbers, then the cumulative distribution
```
```
            function is the function CDFR W R ! Œ0; 1 defined by:
```
```
                                           CDFR .x/ WWD PrŒR  x:
```
```
              A consequence of this definition is that
```
```
                                           X
```
```
                                                   PDFR .x/ D 1:
```
```
                                           x2range.R/
```
```

            This is because R has a value for each outcome, so summing the probabilities over
```
```
            all outcomes is the same as summing over the probabilities of each value in the
```
```
            range of R.
```
```
               As an example, suppose that you roll two unbiased, independent, 6-sided dice.
```
```
            Let T be the random variable that equals the sum of the two rolls. This random
```
```
            variable takes on values in the set V D f2; 3; : : : ; 12g. A plot of the probability
```
```
            density function for T is shown in Figure 19.1. The lump in the middle indicates
```
```
            that sums close to seven are the most likely. The total area of all the rectangles is 1
```
```
            since the dice must take on exactly one of the sums in V D f2; 3; : : : ; 12g.
```
```
               The cumulative distribution function for T is shown in Figure 19.2: The height
```
```
            of the i th bar in the cumulative distribution function is equal to the sum of the
```
```
            heights of the leftmost i bars in the probability density function. This follows from
```
```
            the definitions of pdf and cdf:
```
```
                                                     X                  X
```
```
                        CDFR .x/ D PrŒR  x D          PrŒR D y D         PDFR .y/:
```
```
                                                        yx            yx
```
```
           

## 862 Chapter 19   Random Variables
```
```

                           6=36
```
```
               PDFT.x/
```
```
                           3=36
```
```

                                      2   3       4       5 6    7 8       9 10 11 12
```
```
                                                                x2V
```
```

       Figure 19.1 The probability density function for the sum of two 6-sided dice.
```
```

                       1                                                                 :::
```
```
           CDFT.x/
```
```
                      1=2
```
```

                       0
```
```
                              0 1 2           3       4    5    6    7 8    9 10 11 12
```
```
                                                                    x2V
```
```

      Figure 19.2     The cumulative distribution function for the sum of two 6-sided dice.
```
```
      

19.3. Distribution Functions                                                       863
```

  It also follows from the definition that
```

                    lim CDFR .x/ D 1 and       lim CDFR .x/ D 0:
```
```
                   x!1                       x! 1
```

Both PDFR and CDFR capture the same information about R, so take your choice.
The key point here is that neither the probability density function nor the cumulative
distribution function involves the sample space of an experiment.
   One of the really interesting things about density functions and distribution func-
tions is that many random variables turn out to have the same pdf and cdf. In other
words, even though R and S are different random variables on different probability
spaces, it is often the case that
```

                                  PDFR D PDFS :
```

In fact, some pdf’s are so common that they are given special names. For exam-
ple, the most important distributions in computer science arguably are the Bernoulli
distribution, the Uniform distribution, the Binomial distribution, and the Geomet-
ric distribution. We look more closely at these common distributions in the next
several sections.

#### 19.3.1 Bernoulli Distributions
A Bernoulli distribution is the distribution function for a Bernoulli variable. Specif-
ically, the Bernoulli distribution has a probability density function of the form
fp W f0; 1g ! Œ0; 1 where
```

                                 fp .0/ D p;     and
```
```
                                 fp .1/ D q;
```

for some p 2 Œ0; 1 with q WWD 1 p. The corresponding cumulative distribution
function is Fp W R ! Œ0; 1 where
```
                                    8
```
```
                                    <0 if x < 0
```
```
                                    ˆ
```
```
                          Fp .x/ WWD p if 0  x < 1
```
```
                                    ˆ
```
```
                                     1 if 1  x:
```
```
                                    :
```

#### 19.3.2 Uniform Distributions
A random variable that takes on each possible value in its codomain with the same
probability is said to be uniform. If the codomain V has n elements, then the
uniform distribution has a pdf of the form
```

                                   f W V ! Œ0; 1
```
```
           

## 864 Chapter 19    Random Variables
```
```

      where
```
```
                                                       1
```
```
                                             f .v/ D
```
```
                                                       n
```
```
      for all v 2 V .
```
```
         If the elements of V in increasing order are a1 ; a2 ; : : : ; an , then the cumulative
```
```
      distribution function would be F W R ! Œ0; 1 where
```
```
                                8
```
```
                                <0
```
```
                                ˆ        if x < a1
```
```
                      F .x/ WWD k=n if ak  x < akC1 for 1  k < n
```
```
                                ˆ
```
```
                                  1      if an  x:
```
```
                                :
```
```

         Uniform distributions come up all the time. For example, the number rolled on
```
```
      a fair die is uniform on the set f1; 2; : : : ; 6g. An indicator variable is uniform when
```
```
      its pdf is f1=2 .
```
```

      19.3.3       The Numbers Game
```
```
      Enough definitions—let’s play a game! We have two envelopes. Each contains
```
```
      an integer in the range 0; 1; : : : ; 100, and the numbers are distinct. To win the
```
```
      game, you must determine which envelope contains the larger number. To give
```
```
      you a fighting chance, we’ll let you peek at the number in one envelope selected
```
```
      at random. Can you devise a strategy that gives you a better than 50% chance of
```
```
      winning?
```
```
         For example, you could just pick an envelope at random and guess that it contains
```
```
      the larger number. But this strategy wins only 50% of the time. Your challenge is
```
```
      to do better.
```
```
         So you might try to be more clever. Suppose you peek in one envelope and see
```
```
      the number 12. Since 12 is a small number, you might guess that the number in the
```
```
      other envelope is larger. But perhaps we’ve been tricky and put small numbers in
```
```
      both envelopes. Then your guess might not be so good!
```
```
         An important point here is that the numbers in the envelopes may not be random.
```
```
      We’re picking the numbers and we’re choosing them in a way that we think will
```
```
      defeat your guessing strategy. We’ll only use randomization to choose the numbers
```
```
      if that serves our purpose: making you lose!
```
```

      Intuition Behind the Winning Strategy
```
```
      People are surprised when they first learn that there is a strategy that wins more
```
```
      than 50% of the time, regardless of what numbers we put in the envelopes.
```
```
         Suppose that you somehow knew a number x that was in between the numbers
```
```
      in the envelopes. Now you peek in one envelope and see a number. If it is bigger
```
```
      

19.3. Distribution Functions                                                     865
```

than x, then you know you’re peeking at the higher number. If it is smaller than x,
then you’re peeking at the lower number. In other words, if you know a number x
between the numbers in the envelopes, then you are certain to win the game.
   The only flaw with this brilliant strategy is that you do not know such an x. This
sounds like a dead end, but there’s a cool way to salvage things: try to guess x!
There is some probability that you guess correctly. In this case, you win 100%
of the time. On the other hand, if you guess incorrectly, then you’re no worse off
than before; your chance of winning is still 50%. Combining these two cases, your
overall chance of winning is better than 50%.
   Many intuitive arguments about probability are wrong despite sounding persua-
sive. But this one goes the other way: it may not convince you, but it’s actually
correct. To justify this, we’ll go over the argument in a more rigorous way—and
while we’re at it, work out the optimal way to play.

Analysis of the Winning Strategy
For generality, suppose that we can choose numbers from the integer interval Œ0::n.
Call the lower number L and the higher number H .
  Your goal is to guess a number x between L and H . It’s simplest if x does not
equal L or H , so you should select x at random from among the half-integers:
```
                                 1 3 5       2n 1
```
```
                                  ; ; ; :::;
```
```
                                 2 2 2         2
```
But what probability distribution should you use?
   The uniform distribution—selecting each of these half-integers with equal probability—
turns out to be your best bet. An informal justification is that if we figured out that
you were unlikely to pick some number—say 50 21 —then we’d always put 50 and 51
in the envelopes. Then you’d be unlikely to pick an x between L and H and would
have less chance of winning.
   After you’ve selected the number x, you peek into an envelope and see some
number T . If T > x, then you guess that you’re looking at the larger number.
If T < x, then you guess that the other number is larger.
   All that remains is to determine the probability that this strategy succeeds. We
can do this with the usual four step method and a tree diagram.
Step 1: Find the sample space.
You either choose x too low (< L), too high (> H ), or just right (L < x < H ).
Then you either peek at the lower number (T D L) or the higher number (T D H ).
This gives a total of six possible outcomes, as show in Figure 19.3.
Step 2: Define events of interest.
The four outcomes in the event that you win are marked in the tree diagram.
```
           

## 866 Chapter 19   Random Variables
```
```

                       choices                number     result   probability
```
```
                        of x                 peeked at
```
```
                                             TDL 1=2      lose      L=2n
```
```

                     x too low
```
```
                                             TDH 1=2      win       L=2n
```
```
                        L=n
```
```
                                             TDL 1=2      win     .H�L/=2n
```
```
                          x just right
```
```
                           .H�L/=n
```
```
                                             TDH 1=2      win     .H�L/=2n
```
```

                      .n�H/=n                TDL 1=2      win     .n�H/=2n
```
```
                     x too high
```
```

                                                          lose    .n�H/=2n
```
```
                                             TDH 1=2
```
```

                     Figure 19.3 The tree diagram for the numbers game.
```
```

      Step 3: Assign outcome probabilities.
```
```
      First, we assign edge probabilities. Your guess x is too low with probability L=n,
```
```
      too high with probability .n H /=n, and just right with probability .H L/=n.
```
```
      Next, you peek at either the lower or higher number with equal probability. Multi-
```
```
      plying along root-to-leaf paths gives the outcome probabilities.
```
```
      Step 4: Compute event probabilities.
```
```
      The probability of the event that you win is the sum of the probabilities of the four
```
```
      outcomes in that event:
```
```
                                    L   H L H L n H
```
```
                          PrŒwin D   C      C    C
```
```
                                   2n     2n   2n   2n
```
```
                                   1 H L
```
```
                                  D C
```
```
                                   2     2n
```
```
                                   1   1
```
```
                                   C
```
```
                                   2 2n
```
```
      The final inequality relies on the fact that the higher number H is at least 1 greater
```
```
      than the lower number L since they are required to be distinct.
```
```
        Sure enough, you win with this strategy more than half the time, regardless of the
```
```
      numbers in the envelopes! So with numbers chosen from the range 0; 1; : : : ; 100,
```
```
      

19.3. Distribution Functions                                                     867
```

you win with probability at least 1=2 C 1=200 D 50:5%. If instead we agree to
stick to numbers 0; : : : ; 10, then your probability of winning rises to 55%. By Las
Vegas standards, those are great odds.

Randomized Algorithms
The best strategy to win the numbers game is an example of a randomized algo-
rithm—it uses random numbers to influence decisions. Protocols and algorithms
that make use of random numbers are very important in computer science. There
are many problems for which the best known solutions are based on a random num-
ber generator.
   For example, the most commonly-used protocol for deciding when to send a
broadcast on a shared bus or Ethernet is a randomized algorithm known as expo-
nential backoff. One of the most commonly-used sorting algorithms used in prac-
tice, called quicksort, uses random numbers. You’ll see many more examples if
you take an algorithms course. In each case, randomness is used to improve the
probability that the algorithm runs quickly or otherwise performs well.

#### 19.3.4 Binomial Distributions
The third commonly-used distribution in computer science is the binomial distri-
bution. The standard example of a random variable with a binomial distribution is
the number of heads that come up in n independent flips of a coin. If the coin is
fair, then the number of heads has an unbiased binomial distribution, specified by
the pdf fn W Œ0::n ! Œ0; 1:
```
                                             !
```
```
                                           n
```
```
                               fn .k/ WWD     2 n:
```
```
                                           k
```

This is because there are kn sequences of n coin tosses with exactly k heads, and
```
                             
```

each such sequence has probability 2 n .
   A plot of f20 .k/ is shown in Figure 19.4. The most likely outcome is k D 10
heads, and the probability falls off rapidly for larger and smaller values of k. The
falloff regions to the left and right of the main hump are called the tails of the
distribution.
   In many fields, including Computer Science, probability analyses come down to
getting small bounds on the tails of the binomial distribution. In the context of a
problem, this typically means that there is very small probability that something
bad happens, which could be a server or communication link overloading or a ran-
domized algorithm running for an exceptionally long time or producing the wrong
result.
```
           

## 868 Chapter 19   Random Variables
```
```

                   0:18
```
```
                   0:16
```
```
                   0:14
```
```
                   0:12
```
```
        f20.k/ 0:10
```
```
                   0:08
```
```
                   0:06
```
```
                   0:04
```
```
                   0:02
```
```
                    0
```
```
                          0             5               10              15               20
```
```
                                                        k
```
```

      Figure 19.4 The pdf for the unbiased binomial distribution for n D 20, f20 .k/.
```
```

         The tails do get small very fast. For example, the probability of flipping at most
```
```
      25 heads in 100 tosses is less than 1 in 3,000,000. In fact, the tail of the distribution
```
```
      falls off so rapidly that the probability of flipping exactly 25 heads is nearly twice
```
```
      the probability of flipping exactly 24 heads plus the probability of flipping exactly
```
```
      23 heads plus . . . the probability of flipping no heads.
```
```

      The General Binomial Distribution
```
```
      If the coins are biased so that each coin is heads with probability p and tails with
```
```
      probability q WWD 1 p, then the number of heads has a general binomial density
```
```
      function specified by the pdf fn;p W Œ0::n ! Œ0; 1 where
```
```
                                                    !
```
```
                                                  n k n k
```
```
                                    fn;p .k/ D       p q    :                       (19.1)
```
```
                                                  k
```
```

      for some n 2 NC and p 2 Œ0; 1. This is because there are kn sequences with k
```
```
                                                                      
```
```

      heads and n k tails, but now p k q n k is the probability of each such sequence.
```
```
         For example, the plot in Figure 19.5 shows the probability density function
```
```
      fn;p .k/ corresponding to flipping n D 20 independent coins that are heads with
```
```
      probability p D 0:75. The graph shows that we are most likely to get k D 15
```
```
      heads, as you might expect. Once again, the probability falls off quickly for larger
```
```
      and smaller values of k.
```
```
                 

           19.4. Great Expectations                                                        869
```
```

                         0:25
```
```

                         0:2
```
```

                         0:15
```
```

            f20;:75.k/
```
```
                         0:1
```
```

                         0:05
```
```

                          0
```
```
                                0          5              10              15              20
```
```
                                                           k
```
```

           Figure 19.5 The pdf for the general binomial distribution fn;p .k/ for n D 20
```
```
           and p D :75.
```

### 19.4 Great Expectations
```
           The expectation or expected value of a random variable in simple cases is just an
```
```
           average value. For example, the first thing you typically want to know when you
```
```
           see your grade on an exam is the average score of the class. This average score is
```
```
           the same as the expected score of a random student.
```
```
              In general, the expected value of a random variable is the sum of all it possible
```
```
           values when each value is weighted according to its probability. To make this
```
```
           work, we need to be able to add values and multiply them by probabilities. This
```
```
           will certainly be possible if the values are real numbers; for technical reasons, we
```
```
           focus on nonnegative real values. Now we can define expected value formally as
```
```
           follows:
```
```

           Definition 19.4.1. If R is a nonnegative real-valued random variable defined on a
```
```
           sample space S, then the expectation of R is
```
```
                                                 X
```
```
                                       ExŒR WWD      R.!/ PrŒ!:                     (19.2)
```
```
                                                  !2S
```
```
           

## 870 Chapter 19    Random Variables
```
```

        The expectation of a random variable is also known as its mean.
```
```
        From now on, we will assume our random variables are nonnegative real-valued
```
```
      unless we explcitly say otherwise.
```
```
        Let’s work through some examples.
```
```

      19.4.1       The Expected Value of a Uniform Random Variable
```
```
      Rolling a 6-sided die provides an example of a uniform random variable. Let R be
```
```
      the value that comes up when you roll a fair 6-sided die. Then by (19.2), the
```
```
      expected value of R is
```
```
                                  1    1   1   1   1   1 7
```
```
                    ExŒR D 1      C2 C3 C4 C5 C6 D :
```
```
                                  6    6   6   6   6   6 2
```
```
          This calculation shows that the name “expected” value is a little misleading; the
```
```
      random variable might never actually take on that value. No one expects to roll a
```
```
      3 12 on an ordinary die!
```
```
          In general, if Rn is a random variable with a uniform distribution on fa1 ; a2 ; : : : ; an g,
```
```
      then the expectation of Rn is simply the average of the ai ’s:
```
```
                                               a1 C a2 C    C an
```
```
                                  ExŒRn  D                         :
```
```
                                                       n
```
```
      19.4.2       The Expected Value of a Reciprocal Random Variable
```
```
      Define a random variable S to be the reciprocal of the value that comes up when
```
```
      you roll a fair 6-sided die. That is, S D 1=R where R is the value that you roll.
```
```
      Now,
```
```
                       
```
```
                        1      1 1 1 1 1 1 1 1 1 1 1 1                          49
```
```
        ExŒS  D Ex         D  C  C  C  C  C  D                              :
```
```
                        R      1 6 2 6 3 6 4 6 5 6 6 6                         120
```
```

        Notice that                         
```
```
                                       Ex 1=R ¤ 1= ExŒR:
```
```
      Assuming that these two quantities are equal is a common mistake.
```
```

      19.4.3       The Expected Value of an Indicator Random Variable
```
```
      The expected value of an indicator random variable for an event is just the proba-
```
```
      bility of that event.
```
```

      Lemma 19.4.2. If IA is the indicator random variable for event A, then
```
```

                                           ExŒIA  D PrŒA:
```
```
     

19.4. Great Expectations                                                               871
```

Proof.
```

     ExŒIA  D 1  PrŒIA D 1 C 0  PrŒIA D 0 D PrŒIA D 1
```
```
                                                    D PrŒA:           (def of IA )
```

  For example, if A is the event that a coin with bias p comes up heads, then
ExŒIA  D PrŒIA D 1 D p.

#### 19.4.4 Alternate Definition of Expectation
There is another standard way to define expectation:

Theorem 19.4.3. For any random variable R,
```
                                 X
```
```
                      ExŒR D           x  PrŒR D x:                           (19.3)
```
```
                                       x2range.R/
```
```

   The proof of Theorem 19.4.3, like many of the elementary proofs about expec-
```
tation in this chapter, follows by regrouping of terms in equation (19.2):

Proof. Suppose R is defined on a sample space S. Then,
```
             X
```
   ExŒR WWD    R.!/ PrŒ!
```
                !2S
```
```
                  X           X
```
```
           D                         R.!/ PrŒ!
```
```
               x2range.R/ !2ŒRDx
```
```
                  X           X
```
```
           D                         x PrŒ!              (def of the event ŒR D x)
```
```
               x2range.R/ !2ŒRDx
```
```
                             0                 1
```
```
                  X                X
```
```
           D                x@             PrŒ!A   (factoring x from the inner sum)
```
```
               x2range.R/        !2ŒRDx
```
```
                  X
```
```
           D                x  PrŒR D x:                       (def of PrŒR D x)
```
```
               x2range.R/
```

The first equality follows because the events ŒR D x for x 2 range.R/ partition
the sample space S, so summing over the outcomes in ŒR D x for x 2 range.R/
is the same as summing over S.                                                

  In general, equation (19.3) is more useful than the defining equation (19.2) for
calculating expected values. It also has the advantage that it does not depend on
the sample space, but only on the density function of the random variable. On the
```
           

## 872 Chapter 19    Random Variables
```
```

      other hand, summing over all outcomes as in equation (19.2) allows easier proofs
```
```
      of some basic properties of expectation.
```
```
         Notice that the order in which terms appear in the sums (19.3) and (19.2) is not
```
```
      specified, and the proof of Theorem 19.4.3—and lots of proofs below—involve
```
```
      regrouping the terms in sums. This is OK because of a well-known property of
```
```
      countable sums of nonnegative real numbers:
```
```

      Theorem 19.4.4. A countable sum of nonnegative real numbers converges to the
```
```
      same value, or else always diverges, regardless of the order in which the numbers
```
```
      are summed.
```
```

        In fact as long as reordering terms in the infinite sum (19.2) for expectation
```
```
      preserves convergence, we can allow random variables R taking negative as well
```
```
      as positive values. In this case, ExŒR will be well-defined and will have all the
```
```
      basic properties we establish below for nonnegative variables. But reordering does
```
```
      not preserve convergence for arbitrary sums of positive and negative values (see
```
```
      Problems 14.14 and 14.16), and there is no useful definition of the expectation for
```
```
      arbitrary real-valued random variables.
```
```

      19.4.5       Conditional Expectation
```
```
      Just like event probabilities, expectations can be conditioned on some event. Given
```
```
      a random variable R, the expected value of R conditioned on an event A is the
```
```
      probability-weighted average value of R over outcomes in A. More formally:
```
```

      Definition 19.4.5. The conditional expectation ExŒR j A of a random variable R
```
```
      given event A is:
```
```
                                          X                     
```
```
                         ExŒR j A WWD          r  Pr R D r j A :              (19.4)
```
```
                                             r2range.R/
```
```

        For example, we can compute the expected value of a roll of a fair die, given that
```
```
      the number rolled is at least 4. We do this by letting R be the outcome of a roll of
```
```
      the die. Then by equation (19.4),
```
```
                           6
```
```
                           X
```
```
                                  i Pr R D i j R  4 D 10C20C30C4 31 C5 31 C6 13 D 5:
```
```
                                                    
```
```
      ExŒR j R  4 D
```
```
                           i D1
```
```

         Conditional expectation is useful in dividing complicated expectation calcula-
```
```
      tions into simpler cases. We can find a desired expectation by calculating the con-
```
```
      ditional expectation in each simple case and averaging them, weighing each case
```
```
      by its probability.
```
```
     

19.4. Great Expectations                                                               873
```
```

   For example, suppose that 49.6% of the people in the world are male and the
```
rest female—which is more or less true. Also suppose the expected height of a
randomly chosen male is 50 1100 , while the expected height of a randomly chosen
female is 50 5:00 What is the expected height of a randomly chosen person? We can
calculate this by averaging the heights of men and women. Namely, let H be the
height (in feet) of a randomly chosen person, and let M be the event that the person
is male and F the event that the person is female. Then
```

              ExŒH  D ExŒH j M  PrŒM  C ExŒH j F  PrŒF 
```
```
                       D .5 C 11=12/  0:496 C .5 C 5=12/  .1        0:496/
```
```
                       D 5:6646 : : : :
```

which is a little less than 5’ 8.”
  This method is justified by:
Theorem 19.4.6 (Law of Total Expectation). Let R be a random variable on a
sample space S, and suppose that A1 , A2 , . . . , is a partition of S. Then
```
                                 X
```
```
                       ExŒR D        ExŒR j Ai  PrŒAi :
```
```
                                           i
```

Proof.
```
                  X
```
 ExŒR D                   r  PrŒR D r                                       (by 19.3)
```
             r2range.R/
```
```
             X         X                
```
```
         D        r        Pr R D r j Ai PrŒAi             (Law of Total Probability)
```
```
              r        i
```
```
             XX                        
```
```
         D             r  Pr R D r j Ai PrŒAi                   (distribute constant r)
```
```
              r    i
```
```
             XX                        
```
```
         D             r  Pr R D r j Ai PrŒAi         (exchange order of summation)
```
```
              i    r
```
```
             X              X                     
```
```
         D        PrŒAi         r  Pr R D r j Ai              (factor constant PrŒAi )
```
```
              i              r
```
```
             X
```
```
         D        PrŒAi  ExŒR j Ai :                 (Def 19.4.5 of cond. expectation)
```
```
              i
```
```

                                                                                        
```

#### 19.4.6 Geometric Distributions
A computer program crashes at the end of each hour of use with probability p, if
it has not crashed already. What is the expected time until the program crashes?
```
           

## 874 Chapter 19   Random Variables
```
```

      This will be easy to figure out using the Law of Total Expectation, Theorem 19.4.6.
```
```
      Specifically, we want to find ExŒC  where C is the number of hours until the first
```
```
      crash. We’ll do this by conditioning on whether or not the crash occurs in the first
```
```
      hour.
```
```
         So define A to be the event that the system fails on the first step and A to be the
```
```
      complementary event that the system does not fail on the first step. Then the mean
```
```
      time to failure ExŒC  is
```
```

                          ExŒC  D ExŒC j A PrŒA C ExŒC j A PrŒA:                  (19.5)
```
```

        Since A is the condition that the system crashes on the first step, we know that
```
```

                                         ExŒC j A D 1:                                (19.6)
```
```

      Since A is the condition that the system does not crash on the first step, conditioning
```
```
      on A is equivalent to taking a first step without failure and then starting over without
```
```
      conditioning. Hence,
```
```
                                     ExŒC j A D 1 C ExŒC :                            (19.7)
```
```
        Plugging (19.6) and (19.7) into (19.5):
```
```

                                 ExŒC  D 1  p C .1 C ExŒC /q
```
```
                                        DpC1         p C q ExŒC 
```
```
                                        D 1 C q ExŒC :
```
```

      Then, rearranging terms gives
```
```

                                1 D ExŒC     q ExŒC  D p ExŒC ;
```
```

      and thus
```
```
                                          ExŒC  D 1=p:
```
```
        The general principle here is well-worth remembering.
```
```

                                  Mean Time to Failure
```
```

        If a system independently fails at each time step with probability p, then the
```
```
      expected number of steps up to the first failure is 1=p.
```
```

        So, for example, if there is a 1% chance that the program crashes at the end of
```
```
      each hour, then the expected time until the program crashes is 1=0:01 D 100 hours.
```
```
     

19.4. Great Expectations                                                           875
```
```

   As a further example, suppose a couple insists on having children until they get
```
a boy, then how many baby girls should they expect before their first boy? Assume
for simplicity that there is a 50% chance that a child will be a boy and that the
genders of siblings are mutually independent.
   This is really a variant of the previous problem. The question, “How many hours
until the program crashes?” is mathematically the same as the question, “How
many children must the couple have until they get a boy?” In this case, a crash
corresponds to having a boy, so we should set p D 1=2. By the preceding analysis,
the couple should expect a baby boy after having 1=p D 2 children. Since the last
of these will be a boy, they should expect just one girl. So even in societies where
couples pursue this commitment to boys, the expected population will divide evenly
between boys and girls.
   There is a simple intuitive argument that explains the mean time to failure for-
mula (19.8). Suppose the system is restarted after each failure. This makes the
mean time to failure the same as the mean time between successive repeated fail-
ures. Now if the probability of failure at a given step is p, then after n steps we
expect to have pn failures. Now the average number of steps between failures is,
by definition, equal to n=pn D 1=p.
   For the record, we’ll state a formal version of this result. A random variable
like C that counts steps to first failure is said to have a geometric distribution with
parameter p.
Definition 19.4.7. A random variable C has a geometric distribution with param-
eter p iff codomain.C / D ZC and
```

                                PrŒC D i  D q i 1 p:
```

Lemma 19.4.8. If a random variable C has a geometric distribution with param-
eter p, then
```
                                         1
```
```
                               ExŒC  D :                               (19.8)
```
```
                                         p
```

#### 19.4.7 Expected Returns in Gambling Games
Some of the most interesting examples of expectation can be explained in terms of
gambling games. For straightforward games where you win w dollars with proba-
bility p and you lose x dollars with probability q D 1 p, it is easy to compute
your expected return or winnings. It is simply
```

                                  pw     qx dollars:
```
```
           

## 876 Chapter 19   Random Variables
```
```

      For example, if you are flipping a fair coin and you win $1 for heads and you lose $1
```
```
      for tails, then your expected winnings are
```
```
                                                    
```
```
                                    1              1
```
```
                                      1       1        1 D 0:
```
```
                                    2              2
```
```
      In such cases, the game is said to be fair since your expected return is zero.
```
```

      Splitting the Pot
```
```
      We’ll now look at a different game which is fair—but only on first analysis.
```
```
         It’s late on a Friday night in your neighborhood hangout when two new biker
```
```
      dudes, Eric and Nick, stroll over and propose a simple wager. Each player will
```
```
      put $2 on the bar and secretly write “heads” or “tails” on their napkin. Then you
```
```
      will flip a fair coin. The $6 on the bar will then be “split”—that is, be divided
```
```
      equally—among the players who correctly predicted the outcome of the coin toss.
```
```
      Pot splitting like this is a familiar feature in poker games, betting pools, and lotter-
```
```
      ies.
```
```
         This sounds like a fair game, but after your regrettable encounter with strange
```
```
      dice (Section 17.3), you are definitely skeptical about gambling with bikers. So
```
```
      before agreeing to play, you go through the four-step method and write out the
```
```
      tree diagram to compute your expected return. The tree diagram is shown in Fig-
```
```
      ure 19.6.
```
```
         The “payoff” values in Figure 19.6 are computed by dividing the $6 pot1 among
```
```
      those players who guessed correctly and then subtracting the $2 that you put into
```
```
      the pot at the beginning. For example, if all three players guessed correctly, then
```
```
      your payoff is $0, since you just get back your $2 wager. If you and Nick guess
```
```
      correctly and Eric guessed wrong, then your payoff is
```
```
                                               6
```
```
                                                     2 D 1:
```
```
                                               2
```
```
      In the case that everyone is wrong, you all agree to split the pot and so, again, your
```
```
      payoff is zero.
```
```
         To compute your expected return, you use equation (19.3):
```
```
                                       1     1     1    1
```
```
                     ExŒpayoff D 0     C1 C1 C4
```
```
                                       8     8     8    8
```
```
                                           1         1       1      1
```
```
                                   C . 2/  C . 2/  C . 2/  C 0 
```
```
                                           8         8       8      8
```
```
                                  D 0:
```
```
        1 The money invested in a wager is commonly referred to as the pot.
```
```
     

19.4. Great Expectations                                                     877
```
```

    you guess              Eric guesses   Nick guesses    your probability
```
```
      right?                  right?         right?      payoff
```
```

                                          yes   1=2       $0       1=8
```
```

                            yes   1=2
```
```
                                           no   1=2       $1       1=8
```
```

                                          yes   1=2       $1       1=8
```
```
       yes 1=2
```
```
                             no   1=2
```
```

                                           no   1=2       $4       1=8
```
```

                                          yes   1=2      �$2       1=8
```
```

                            yes   1=2
```
```
        no 1=2
```
```
                                           no   1=2      �$2       1=8
```
```

                                          yes   1=2      �$2       1=8
```
```
                             no   1=2
```
```

                                           no   1=2       $0       1=8
```

**Figure 6 The tree diagram for the game where three players each wager $2**
and then guess the outcome of a fair coin toss. The winners split the pot.
```
           

## 878 Chapter 19   Random Variables
```
```

      This confirms that the game is fair. So, for old time’s sake, you break your solemn
```
```
      vow to never ever engage in strange gambling games.
```
```

      The Impact of Collusion
```
```
      Needless to say, things are not turning out well for you. The more times you play
```
```
      the game, the more money you seem to be losing. After 1000 wagers, you have
```
```
      lost over $500. As Nick and Eric are consoling you on your “bad luck,” you do a
```
```
      back-of-the-envelope calculation and decide that the probability of losing $500 in
```
```
      1000 fair $2 wagers is very, very small.
```
```
         Now it is possible of course that you are very, very unlucky. But it is more likely
```
```
      that something fishy is going on. Somehow the tree diagram in Figure 19.6 is not a
```
```
      good model of the game.
```
```
         The “something” that’s fishy is the opportunity that Nick and Eric have to collude
```
```
      against you. The fact that the coin flip is fair certainly means that each of Nick and
```
```
      Eric can only guess the outcome of the coin toss with probability 1=2. But when
```
```
      you look back at the previous 1000 bets, you notice that Eric and Nick never made
```
```
      the same guess. In other words, Nick always guessed “tails” when Eric guessed
```
```
      “heads,” and vice-versa. Modelling this fact now results in a slightly different tree
```
```
      diagram, as shown in Figure 19.7.
```
```
         The payoffs for each outcome are the same in Figures 19.6 and 19.7, but the
```
```
      probabilities of the outcomes are different. For example, it is no longer possible
```
```
      for all three players to guess correctly, since Nick and Eric are always guessing
```
```
      differently. More importantly, the outcome where your payoff is $4 is also no
```
```
      longer possible. Since Nick and Eric are always guessing differently, one of them
```
```
      will always get a share of the pot. As you might imagine, this is not good for you!
```
```
         When we use equation (19.3) to compute your expected return in the collusion
```
```
      scenario, we find that
```
```
                                              1      1
```
```
                     ExŒpayoff D 0  0 C 1    C1 C40
```
```
                                              4      4
```
```
                                                       1       1
```
```
                                   C . 2/  0 C . 2/  C . 2/  C 0  0
```
```
                                                       4       4
```
```
                                     1
```
```
                                 D     :
```
```
                                     2
```
```
      So watch out for these biker dudes! By colluding, Nick and Eric have made it so
```
```
      that you expect to lose $.50 every time you play. No wonder you lost $500 over the
```
```
      course of 1000 wagers.
```
```
     

19.4. Great Expectations                                                     879
```
```

    you guess              Eric guesses   Nick guesses    your probability
```
```
      right?                  right?         right?      payoff
```
```

                                          yes    0        $0        0
```
```

                            yes   1=2
```
```
                                           no    1        $1       1=4
```
```

                                          yes    1        $1       1=4
```
```
       yes 1=2
```
```
                             no   1=2
```
```

                                           no    0        $4        0
```
```

                                          yes    0       �$2        0
```
```

                            yes   1=2
```
```
        no 1=2
```
```
                                           no    1       �$2       1=4
```
```

                                          yes    1       �$2       1=4
```
```
                             no   1=2
```
```

                                           no    0        $0        0
```

**Figure 7 The revised tree diagram reflecting the scenario where Nick always**
guesses the opposite of Eric.
```
           

## 880 Chapter 19   Random Variables
```
```

      How to Win the Lottery
```
```
      Similar opportunities to collude arise in many betting games. For example, consider
```
```
      the typical weekly football betting pool, where each participant wagers $10 and the
```
```
      participants that pick the most games correctly split a large pot. The pool seems
```
```
      fair if you think of it as in Figure 19.6. But, in fact, if two or more players collude
```
```
      by guessing differently, they can get an “unfair” advantage at your expense!
```
```
         In some cases, the collusion is inadvertent and you can profit from it. For ex-
```
```
      ample, many years ago, a former MIT Professor of Mathematics named Herman
```
```
      Chernoff figured out a way to make money by playing the state lottery. This was
```
```
      surprising since the state usually takes a large share of the wagers before paying the
```
```
      winners, and so the expected return from a lottery ticket is typically pretty poor. So
```
```
      how did Chernoff find a way to make money? It turned out to be easy!
```
```
         In a typical state lottery,
```
```

           all players pay $1 to play and select 4 numbers from 1 to 36,
```
```

           the state draws 4 numbers from 1 to 36 uniformly at random,
```
```

           the states divides 1/2 of the money collected among the people who guessed
```
```
            correctly and spends the other half redecorating the governor’s residence.
```
```

      This is a lot like the game you played with Nick and Eric, except that there are
```
```
      more players and more choices. Chernoff discovered that a small set of numbers
```
```
      was selected by a large fraction of the population. Apparently many people think
```
```
      the same way; they pick the same numbers not on purpose as in the previous game
```
```
      with Nick and Eric, but based on the Red Sox winning average or today’s date. The
```
```
      result is as though the players were intentionally colluding to lose. If any one of
```
```
      them guessed correctly, then they’d have to split the pot with many other players.
```
```
      By selecting numbers uniformly at random, Chernoff was unlikely to get one of
```
```
      these favored sequences. So if he won, he’d likely get the whole pot! By analyzing
```
```
      actual state lottery data, he determined that he could win an average of 7 cents on
```
```
      the dollar. In other words, his expected return was not $:50 as you might think,
```
```
      but C$:07.2 Inadvertent collusion often arises in betting pools and is a phenomenon
```
```
      that you can take advantage of.
```
```
         2 Most lotteries now offer randomized tickets to help smooth out the distribution of selected se-
```
```

      quences.
```
```
                  

            19.5. Linearity of Expectation                                                       881
```

### 19.5 Linearity of Expectation
```
            Expected values obey a simple, very helpful rule called Linearity of Expectation.
```
```
            Its simplest form says that the expected value of a sum of random variables is the
```
```
            sum of the expected values of the variables.
```
```
            Theorem 19.5.1. For any random variables R1 and R2 ,
```
```

                                        ExŒR1 C R2  D ExŒR1  C ExŒR2 :
```
```

            Proof. Let T WWD R1 C R2 . The proof follows straightforwardly by rearranging
```
```
            terms in equation (19.2) in the definition of expectation:
```
```
                            X
```
```
                 ExŒT  WWD     T .!/  PrŒ!
```
```
                               !2S
```
```
                              X
```
```
                          D         .R1 .!/ C R2 .!//  PrŒ!                      (def of T )
```
```
                              !2S
```
```
                              X                      X
```
```
                          D         R1 .!/ PrŒ! C         R2 .!/ PrŒ!   (rearranging terms)
```
```
                              !2S                    !2S
```
```
                          D ExŒR1  C ExŒR2 :                                    (by (19.2))
```
```

                                                                                                 
```
```

              Essentially the same proof implies:
```
```
            Theorem 19.5.2. For random variables R1 , R2 and constants a1 ; a2 2 R,
```
```

                                 ExŒa1 R1 C a2 R2  D a1 ExŒR1  C a2 ExŒR2 :
```
```

               In other words, expectation is a linear function. A routine induction extends the
```
```
            result to more than two variables:
```
```
            Corollary 19.5.3 (Linearity of Expectation). For any random variables R1 ; : : : ; Rk
```
```
            and constants a1 ; : : : ; ak 2 R,
```
```
                                           2           3
```
```
                                             X k           k
```
```
                                                           X
```
```
                                        Ex 4     ai Ri 5 D   ai ExŒRi :
```
```
                                              i D1             i D1
```
```

              The great thing about linearity of expectation is that no independence is required.
```
```
            This is really useful, because dealing with independence is a pain, and we often
```
```
            need to work with random variables that are not independent.
```
```
              As an example, let’s compute the expected value of the sum of two fair dice.
```
```
           

## 882 Chapter 19    Random Variables
```
```

      19.5.1       Expected Value of Two Dice
```
```
      What is the expected value of the sum of two fair dice?
```
```
         Let the random variable R1 be the number on the first die, and let R2 be the
```
```
      number on the second die. We observed earlier that the expected value of one die
```
```
      is 3.5. We can find the expected value of the sum using linearity of expectation:
```
```

                       ExŒR1 C R2  D ExŒR1  C ExŒR2  D 3:5 C 3:5 D 7:
```
```

        Assuming that the dice were independent, we could use a tree diagram to prove
```
```
      that this expected sum is seven, but this would be a bother since there are 36 cases.
```
```
      And without assuming independence, it’s not apparent how to apply the tree dia-
```
```
      gram approach at all. But notice that we did not have to assume that the two dice
```
```
      were independent. For example, suppose the roll of the second die was forced to
```
```
      match the roll of the first die. Then the expected sum of two dice remains equal to
```
```
      seven because the second die is still fair.
```
```

      19.5.2       Sums of Indicator Random Variables
```
```
      Linearity of expectation is especially useful when you have a sum of indicator ran-
```
```
      dom variables. As an example, suppose there is a dinner party where n men check
```
```
      their hats. The hats are mixed up during dinner, so that afterward each man receives
```
```
      a random hat. In particular, each man gets his own hat with probability 1=n. What
```
```
      is the expected number of men who get their own hat?
```
```
         Letting G be the number of men that get their own hat, we want to find the
```
```
      expectation of G. But all we know about G is that the probability that a man gets
```
```
      his own hat back is 1=n. There are many different probability distributions of hat
```
```
      permutations with this property, so we don’t know enough about the distribution of
```
```
      G to calculate its expectation directly using equation (19.2) or (19.3). But linearity
```
```
      of expectation lets us sidestep this issue.
```
```
         We’ll use a standard, useful trick to apply linearity, namely, we’ll express G as
```
```
      a sum of indicator variables. In particular, let Gi be an indicator for the event that
```
```
      the i th man gets his own hat. That is, Gi D 1 if the i th man gets his own hat, and
```
```
      Gi D 0 otherwise. The number of men that get their own hat is then the sum of
```
```
      these indicator random variables:
```
```

                                       G D G1 C G2 C    C Gn :                     (19.9)
```
```

      These indicator variables are not mutually independent. For example, if n 1 men
```
```
      all get their own hats, then the last man is certain to receive his own hat. But again,
```
```
      we don’t need to worry about this dependence, since linearity holds regardless.
```
```
      

19.5. Linearity of Expectation                                                                 883
```

  Since Gi is an indicator random variable, we know from Lemma 19.4.2 that
```

                                 ExŒGi  D PrŒGi D 1 D 1=n:                               (19.10)
```

By Linearity of Expectation and equation (19.9), this means that
```

                       ExŒG D ExŒG1 C G2 C    C Gn 
```
```
                                 D ExŒG1  C ExŒG2  C    C ExŒGn 
```
```
                                            n
```
```
                                   ‚    …„   ƒ
```
```
                                   1  1      1
```
```
                                 D C C  C
```
```
                                   n n       n
```
```
                                 D 1:
```

So even though we don’t know much about how hats are scrambled, we’ve figured
out that on average, just one man gets his own hat back, regardless of the number
of men with hats!
   More generally, Linearity of Expectation provides a very good method for com-
puting the expected number of events that will happen.

Theorem 19.5.4. Given any collection of events A1 ; A2 ; : : : ; An , the expected
number of events that will occur is
```
                                           n
```
```
                                           X
```
```
                                                  PrŒAi :
```
```
                                           i D1
```
```

   For example, Ai could be the event that the i th man gets the right hat back. But
```
in general, it could be any subset of the sample space, and we are asking for the
expected number of events that will contain a random sample point.

Proof. Define Ri to be the indicator random variable for Ai , where Ri .!/ D 1 if
w 2 Ai and Ri .!/ D 0 if w … Ai . Let R D R1 C R2 C    C Rn . Then
```
                       n
```
```
                       X
```
```
           ExŒR D            ExŒRi                  (by Linearity of Expectation)
```
```
                       i D1
```
```
                       n
```
```
                       X
```
```
                   D          PrŒRi D 1                           (by Lemma 19.4.2)
```
```
                       i D1
```
```
                       X n
```
```
                   D          PrŒAi :                       (def of indicator variable)
```
```
                       i D1
```
```
           

## 884 Chapter 19    Random Variables
```
```

        So whenever you are asked for the expected number of events that occur, all you
```
```
      have to do is sum the probabilities that each event occurs. Independence is not
```
```
      needed.
```
```

      19.5.3       Expectation of a Binomial Distribution
```
```
      Suppose that we independently flip n biased coins, each with probability p of com-
```
```
      ing up heads. What is the expected number of heads?
```
```
        Let J be the random variable denoting the number of heads. Then J has a
```
```
      binomial distribution with parameters n, p, and
```
```
                                                   !
```
```
                                                 n k n k
```
```
                                  PrŒJ D k D       p q     :
```
```
                                                 k
```
```

      Applying equation (19.3), this means that
```
```
                                       n                     n
```
```
                                                                       !
```
```
                                       X                     X       n k n k
```
```
                         ExŒJ  D          k PrŒJ D k D           k    p q  :       (19.11)
```
```
                                                                     k
```
```
                                    kD0                      kD0
```
```

         This sum looks a tad nasty, but linearity of expectation leads to an easy derivation
```
```
      of a simple closed form. We just express J as a sum of indicator random variables,
```
```
      which is easy. Namely, let Ji be the indicator random variable for the i th coin
```
```
      coming up heads, that is,
```
```
                                      (
```
```
                                       1 if the i th coin is heads
```
```
                               Ji WWD
```
```
                                       0 if the i th coin is tails:
```
```

      Then the number of heads is simply
```
```

                                       J D J1 C J2 C    C Jn :
```
```

      By Theorem 19.5.4,
```
```
                                                  n
```
```
                                                  X
```
```
                                       ExŒJ  D          PrŒJi  D pn:               (19.12)
```
```
                                                  i D1
```
```

        That really was easy. If we flip n mutually independent coins, we expect to get
```
```
      pn heads. Hence the expected value of a binomial distribution with parameters n
```
```
      and p is simply pn.
```
```
        But what if the coins are not mutually independent? It doesn’t matter—the an-
```
```
      swer is still pn because Linearity of Expectation and Theorem 19.5.4 do not as-
```
```
      sume any independence.
```
```
      

19.5. Linearity of Expectation                                                    885
```
```

   If you are not yet convinced that Linearity of Expectation and Theorem 19.5.4
```
are powerful tools, consider this: without even trying, we have used them to prove
a complicated looking identity, namely,
```
                              n
```
```
                                      !
```
```
                             X      n k n k
```
```
                                  k     p q      D pn;                     (19.13)
```
```
                                    k
```
```
                                  kD0
```

which follows by combining equations (19.11) and (19.12) (see also Exercise 19.31).
   The next section has an even more convincing illustration of the power of linear-
ity to solve a challenging problem.

#### 19.5.4 The Coupon Collector Problem
Every time we purchase a kid’s meal at Taco Bell, we are graciously presented with
a miniature “Racin’ Rocket” car together with a launching device which enables us
to project our new vehicle across any tabletop or smooth floor at high velocity.
Truly, our delight knows no bounds.
   There are different colored Racin’ Rocket cars. The color of car awarded to
us by the kind server at the Taco Bell register appears to be selected uniformly and
independently at random. What is the expected number of kid’s meals that we must
purchase in order to acquire at least one of each color of Racin’ Rocket car?
   The same mathematical question shows up in many guises: for example, what
is the expected number of people you must poll in order to find at least one person
with each possible birthday? The general question is commonly called the coupon
collector problem after yet another interpretation.
   A clever application of linearity of expectation leads to a simple solution to the
coupon collector problem. Suppose there are five different colors of Racin’ Rocket
cars, and we receive this sequence:
```

       blue    green      green    red   blue   orange   blue   orange   gray.
```

Let’s partition the sequence into 5 segments:
```

       blue      green      green red     blue orange    blue   orange   gray :
```
```
      „ƒ‚…       „ƒ‚…       „ ƒ‚ …        „ ƒ‚ …         „        ƒ‚        …
```
```
         X0         X1            X2            X3               X4
```

The rule is that a segment ends whenever we get a new kind of car. For example, the
middle segment ends when we get a red car for the first time. In this way, we can
break the problem of collecting every type of car into stages. Then we can analyze
each stage individually and assemble the results using linearity of expectation.
```
           

## 886 Chapter 19   Random Variables
```
```

        In the general case there are n colors of Racin’ Rockets that we’re collecting.
```
```
      Let Xk be the length of the kth segment. The total number of kid’s meals we must
```
```
      purchase to get all n Racin’ Rockets is the sum of the lengths of all these segments:
```
```

                                  T D X0 C X1 C    C Xn 1 :
```
```

         Now let’s focus our attention on Xk , the length of the kth segment. At the
```
```
      beginning of segment k, we have k different types of car, and the segment ends
```
```
      when we acquire a new type. When we own k types, each kid’s meal contains a
```
```
      type that we already have with probability k=n. Therefore, each meal contains a
```
```
      new type of car with probability 1 k=n D .n k/=n. Thus, the expected number
```
```
      of meals until we get a new kind of car is n=.n k/ by the Mean Time to Failure
```
```
      rule. This means that
```
```
                                                   n
```
```
                                       ExŒXk  D      :
```
```
                                                  n k
```
```
        Linearity of expectation, together with this observation, solves the coupon col-
```
```
      lector problem:
```
```

                         ExŒT  D ExŒX0 C X1 C    C Xn 1 
```
```
                                 D ExŒX0  C ExŒX1  C    C ExŒXn 1 
```
```
                                     n        n               n n n
```
```
                                 D       C       C  C C C
```
```
                                   n 0 n 1                    3   2   1
```
```
                                                                      
```
```
                                       1     1               1 1 1
```
```
                                 Dn      C       C  C C C
```
```
                                       n n 1                 3 2 1
```
```
                                                                      
```
```
                                       1 1 1                    1    1
```
```
                                 Dn      C C C  C               C
```
```
                                       1 2 3                 n 1 n
```
```
                                 D nHn                                             (19.14)
```
```
                                  n ln n:
```
```

        Cool! It’s those Harmonic Numbers again.
```
```
        We can use equation (19.14) to answer some concrete questions. For example,
```
```
      the expected number of die rolls required to see every number from 1 to 6 is:
```
```

                                         6H6 D 14:7 : : : :
```
```

      And the expected number of people you must poll to find at least one person with
```
```
      each possible birthday is:
```
```

                                      365H365 D 2364:6 : : : :
```
```
      

19.5. Linearity of Expectation                                                                           887
```

#### 19.5.5 Infinite Sums
Linearity of expectation also works for an infinite number of random variables
provided that the variables satisfy an absolute convergence criterion.

Theorem 19.5.5 (Linearity of Expectation). Let R0 , R1 , . . . , be random variables
such that
```
                                X1
```
```
                                    ExŒ jRi j 
```
```
                                                i D0
```

converges. Then                          " 1                   1
```
                                                       #
```
```
                                          X                    X
```
```
                                    Ex           Ri        D          ExŒRi :
```
```
                                          i D0                 i D0
```
```
                      P1
```
Proof. Let T WWD i D0 Ri .
   We leave it to the reader to verify that, under the given convergence hypothesis,
all the sums in the following derivation are absolutely convergent, which justifies
rearranging them as follows:
   1
   X                  1 X
```
                      X
```
```
          ExŒRi  D              Ri .s/  PrŒs                                         (Def. 19.4.1)
```
   i D0               i D0 s2S
```
                       1
```
```
                      XX
```
```
                 D               Ri .s/  PrŒs                (exchanging order of summation)
```
```
                      s2S i D0
```
```
                          "1                #
```
```
                      X X
```
```
                 D                  Ri .s/  PrŒs                               (factoring out PrŒs)
```
```
                      s2S    i D0
```
```
                      X
```
```
                 D          T .s/  PrŒs                                                 (Def. of T )
```
```
                      s2S
```
```
                 D ExŒT                                                                (Def. 19.4.1)
```
```
                      " 1   #
```
```
                        X
```
```
                 D Ex     Ri :                                                           (Def. of T ): 
```
```
                             i D0
```

#### 19.5.6 A Gambling Paradox
One of the simplest casino bets is on “red” or “black” at the roulette table. In each
play at roulette, a small ball is set spinning around a roulette wheel until it lands in
a red, black, or green colored slot. The payoff for a bet on red or black matches the
bet; for example, if you bet $10 on red and the ball lands in a red slot, you get back
your original $10 bet plus another matching $10.
```
           

## 888 Chapter 19    Random Variables
```
```

         The casino gets its advantage from the green slots, which make the probability
```
```
      of both red and black each less than 1/2. In the US, a roulette wheel has 2 green
```
```
      slots among 18 black and 18 red slots, so the probability of red is 18=38  0:473.
```
```
      In Europe, where roulette wheels have only 1 green slot, the odds for red are a little
```
```
      better—that is, 18=37  0:486—but still less than even.
```
```
         Of course you can’t expect to win playing roulette, even if you had the good
```
```
      fortune to gamble against a fair roulette wheel. To prove this, note that with a fair
```
```
      wheel, you are equally likely win or lose each bet, so your expected win on any
```
```
      spin is zero. Therefore if you keep betting, your expected win is the sum of your
```
```
      expected wins on each bet: still zero.
```
```
         Even so, gamblers regularly try to develop betting strategies to win at roulette
```
```
      despite the bad odds. A well known strategy of this kind is bet doubling, where
```
```
      you bet, say, $10 on red and keep doubling the bet until a red comes up. This
```
```
      means you stop playing if red comes up on the first spin, and you leave the casino
```
```
      with a $10 profit. If red does not come up, you bet $20 on the second spin. Now if
```
```
      the second spin comes up red, you get your $20 bet plus $20 back and again walk
```
```
      away with a net profit of $20 10 D $10. If red does not come up on the second
```
```
      spin, you next bet $40 and walk away with a net win of $40 20 10 D $10 if red
```
```
      comes up on on the third spin, and so on.
```
```
         Since we’ve reasoned that you can’t even win against a fair wheel, this strat-
```
```
      egy against an unfair wheel shouldn’t work. But wait a minute! There is a 0.486
```
```
      probability of red appearing on each spin of the wheel, so the mean time until a red
```
```
      occurs is less than three. What’s more, red will come up eventually with probability
```
```
      one, and as soon as it does, you leave the casino $10 ahead. In other words, by bet
```
```
      doubling you are certain to win $10, and so your expectation is $10, not zero!
```
```
         Something’s wrong here.
```
```

      19.5.7       Solution to the Paradox
```
```
      The argument claiming the expectation is zero against a fair wheel is flawed by an
```
```
      implicit, invalid use of linearity of expectation for an infinite sum.
```
```
        To explain this carefully, let Bn be the number of dollars you win on your nth
```
```
      bet, where Bn is defined to be zero if red comes up before the nth spin of the wheel.
```
```
      Now the dollar amount you win in any gambling session is
```
```
                                              1
```
```
                                              X
```
```
                                                    Bn ;
```
```
                                              nD1
```
```

      and your expected win is                " 1          #
```
```
                                               X
```
```
                                         Ex          Bn :                           (19.15)
```
```
                                               nD1
```