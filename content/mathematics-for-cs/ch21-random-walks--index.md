---
title: "Random Walks"
lang: en
---

20.4. Estimation by Random Sampling                                                 929

count the fraction who favor Brown. That is, we define variables K1 ; K2 ; : : : ,
where Ki is interpreted to be the indicator variable for the event that the i th cho-
sen voter prefers Brown. Since our choices are made independently, the Ki ’s are
independent. So formally, we model our estimation process by assuming we have
mutually independent indicator variables K1 ; K2 ; : : : ; each with the same proba-
bility p of being equal to 1. Now let Sn be their sum, that is,
```
                                               n
```
```
                                               X
```
```
                                      Sn WWD          Ki :                   (20.16)
```
```
                                               i D1
```

The variable Sn =n describes the fraction of sampled voters who favor Scott Brown.
Most people intuitively, and correctly, expect this sample fraction to give a useful
approximation to the unknown fraction p.
  So we will use the sample value Sn =n as our statistical estimate of p. We know
that Sn has a binomial distribution with parameters n and p; we can choose n, but
p is unknown.

How Large a Sample?
Suppose we want our estimate to be within 0:04 of the fraction p at least 95% of
the time. This means we want
```
                          ˇ        ˇ        
```
```
                            ˇ Sn    ˇ
```
```
                        Pr ˇˇ     p ˇ  0:04  0:95 :
```
```
                                    ˇ                                     (20.17)
```
```
                              n
```
So we’d better determine the number n of times we must poll voters so that in-
equality (20.17) will hold. Chebyshev’s Theorem offers a simple way to determine
such a n.
   Sn is binomially distributed. Equation (20.14), combined with the fact that pq
is maximized when p D q, that is, when p D 1=2 (check for yourself!), gives
```
                                                             1  n
```
```
                           VarŒSn  D n.pq/  n               D :           (20.18)
```
```
                                                             4  4
```
  Next, we bound the variance of Sn =n:
```
            2
```
```
        Sn      1
```
```
    Var     D      VarŒSn             (Square Multiple Rule for Variance (20.8))
```
```
        n       n
```
```
               2
```
```
                1  n
```
```
                                                                    (by (20.18))
```
```
                n  4
```
```
               1
```
```
            D                                                                (20.19)
```
```
              4n
```
```
             

## 930 Chapter 20    Deviation from the Mean
```
```

      Using Chebyshev’s bound and (20.19) we have:
```
```
              ˇ        ˇ       
```
```
               ˇ Sn     ˇ           VarŒSn =n        1       156:25
```
```
            Pr ˇ
```
```
               ˇ      p ˇ  0:04 
```
```
                        ˇ
```
```
                                            2
```
```
                                                         2
```
```
                                                            D                     (20.20)
```
```
                 n                    .0:04/      4n.0:04/      n
```
```

         To make our our estimate with 95% confidence, we want the right-hand side
```
```
      of (20.20) to be at most 1/20. So we choose n so that
```
```
                                              156:25  1
```
```
                                                      ;
```
```
                                                n     20
```
```
      that is,
```
```
                                               n  3; 125:
```
```
         Section 20.5.2 describes how to get tighter estimates of the tails of binomial
```
```
      distributions that lead to a bound on n that is about four times smaller than the
```
```
      one above. But working through this example using only the variance illustrates
```
```
      an approach to estimation that is applicable to arbitrary random variables, not just
```
```
      binomial variables.
```
```

      20.4.2       Pairwise Independent Sampling
```
```
      The reasoning we used above to analyze voter polling and matching birthdays is
```
```
      very similar. We summarize it in slightly more general form with a basic result
```
```
      called the Pairwise Independent Sampling Theorem. In particular, we do not need
```
```
      to restrict ourselves to sums of zero-one valued variables, or to variables with the
```
```
      same distribution. For simplicity, we state the Theorem for pairwise independent
```
```
      variables with possibly different distributions but with the same mean and variance.
```
```

      Theorem 20.4.1 (Pairwise Independent Sampling). Let G1 ; : : : ; Gn be pairwise
```
```
      independent variables with the same mean  and deviation . Define
```
```
                                                       n
```
```
                                                       X
```
```
                                              Sn WWD          Gi :                (20.21)
```
```
                                                       i D1
```
```

      Then                           ˇ          ˇ    
```
```
                                       ˇ Sn      ˇ       1   2
```
```
                                   Pr ˇˇ        ˇ  x 
```
```
                                                 ˇ                :
```
```
                                         n               n x
```
```
      

20.4. Estimation by Random Sampling                                                          931
```

Proof. We observe first that the expectation of Sn =n is :
```
                         Pn        
```
```
             Sn               i D1 Gi
```
```
        Ex        D Ex                                          (def of Sn )
```
```
             n                  n
```
```
                      Pn
```
```
                              ExŒGi 
```
```
                  D i D1                         (linearity of expectation)
```
```
                      Pn n
```
```
                              
```
```
                  D i D1
```
```
                          n
```
```
                      n
```
```
                  D        D :
```
```
                       n
```
  The second important property of Sn =n is that its variance is the variance of Gi
divided by n:
```
          2
```
```
        Sn        1
```
   Var        D      VarŒSn       (Square Multiple Rule for Variance (20.8))
```
         n        n
```
```
                      " n     #
```
```
                1       X
```
```
              D 2 Var      Gi                                         (def of Sn )
```
```
                n
```
```
                                   i D1
```
```
                       n
```
```
                     1 X
```
```
                 D               VarŒGi              (pairwise independent additivity)
```
```
                     n2
```
```
                          i D1
```
```
                  1      2    2
```
```
                 D   n   D     :                                     (20.22)
```
```
                 n2           n
```
   This is enough to apply Chebyshev’s Theorem and conclude:
```
                                           
```
```
                                 Var Sn =n
```
```
            ˇ        ˇ     
```
```
             ˇ Sn     ˇ
```
```
         Pr ˇˇ      ˇ  x 
```
```
                      ˇ                       :   (Chebyshev’s bound)
```
```
               n                      x2
```
```
                                  2 =n
```
```
                              D                           (by (20.22))
```
```
                                   x2
```
```
                                 1  2
```
```
                                       
```
```
                              D           :
```
```
                                 n x
```
```
                                                                            
```
```

   The Pairwise Independent Sampling Theorem provides a quantitative general
```
statement about how the average of independent samples of a random variable ap-
proaches the mean. In particular, it proves what is known as the Law of Large
Numbers:4 by choosing a large enough sample size, we can get arbitrarily accurate
estimates of the mean with confidence arbitrarily close to 100%.
   4 This is the Weak Law of Large Numbers. As you might suppose, there is also a Strong Law, but

it’s outside the scope of 6.042.
```
           

## 932 Chapter 20    Deviation from the Mean
```
```

      Corollary 20.4.2. [Weak Law of Large Numbers] Let G1 ; : : : ; Gn be pairwise in-
```
```
      dependent variables with the same mean , and the same finite deviation, and let
```
```
                                           Pn
```
```
                                                  Gi
```
```
                                     Sn WWD i D1 :
```
```
                                               n
```
```
      Then for every  > 0,
```
```
                                 lim PrŒjSn j   D 1:
```
```
                                     n!1
```
```

      20.4.3       Confidence in an Estimation
```
```
      So Chebyshev’s Bound implies that sampling 3,125 voters will yield a fraction that,
```
```
      95% of the time, is within 0.04 of the actual fraction of the voting population who
```
```
      prefer Brown.
```
```
         Notice that the actual size of the voting population was never considered because
```
```
      it did not matter. People who have not studied probability theory often insist that
```
```
      the population size should influence the sample size. But our analysis shows that
```
```
      polling a little over 3000 people people is always sufficient, regardless of whether
```
```
      there are ten thousand, or a million, or a billion voters. You should think about
```
```
      an intuitive explanation that might persuade someone who thinks population size
```
```
      matters.
```
```
         Now suppose a pollster actually takes a sample of 3,125 random voters to esti-
```
```
      mate the fraction of voters who prefer Brown, and the pollster finds that 1250 of
```
```
      them prefer Brown. It’s tempting, but sloppy, to say that this means:
```
```
      False Claim. With probability 0.95, the fraction p of voters who prefer Brown is
```
```
      1250=3125 ˙ 0:04. Since 1250=3125 0:04 > 1=3, there is a 95% chance that
```
```
      more than a third of the voters prefer Brown to all other candidates.
```
```
          As already discussed in Section 18.9, what’s objectionable about this statement
```
```
      is that it talks about the probability or “chance” that a real world fact is true, namely
```
```
      that the actual fraction p of voters favoring Brown is more than 1/3. But p is what
```
```
      it is, and it simply makes no sense to talk about the probability that it is something
```
```
      else. For example, suppose p is actually 0.3; then it’s nonsense to ask about the
```
```
      probability that it is within 0.04 of 1250/3125. It simply isn’t.
```
```
          This example of voter preference is typical: we want to estimate a fixed, un-
```
```
      known real-world quantity. But being unknown does not make this quantity a ran-
```
```
      dom variable, so it makes no sense to talk about the probability that it has some
```
```
      property.
```
```
          A more careful summary of what we have accomplished goes this way:
```
```
            We have described a probabilistic procedure for estimating the value
```
```
            of the actual fraction p. The probability that our estimation procedure
```
```
            will yield a value within 0.04 of p is 0.95.
```
```
                

           20.5. Sums of Random Variables                                                    933
```
```

           This is a bit of a mouthful, so special phrasing closer to the sloppy language is
```
```
           commonly used. The pollster would describe his conclusion by saying that
```
```

                 At the 95% confidence level, the fraction of voters who prefer Brown
```
```
                 is 1250=3125 ˙ 0:04.
```
```

              So confidence levels refer to the results of estimation procedures for real-world
```
```
           quantities. The phrase “confidence level” should be heard as a reminder that some
```
```
           statistical procedure was used to obtain an estimate. To judge the credibility of the
```
```
           estimate, it may be important to examine how well this procedure was performed.
```
```
           More important, the confidence assertion above can be rephrased as
```
```

                 Either the fraction of voters who prefer Brown is 1250=3125 ˙ 0:04
```
```
                 or something unlikely (probability 1/20) happened.
```
```

           If our experience led us to judge that having the preference fraction actually be in
```
```
           this particular interval was unlikely, then this level of confidence would justifiably
```
```
           remain unconvincing.
```

### 20.5 Sums of Random Variables
```
           If all you know about a random variable is its mean and variance, then Cheby-
```
```
           shev’s Theorem is the best you can do when it comes to bounding the probabil-
```
```
           ity that the random variable deviates from its mean. In some cases, however, we
```
```
           know more—for example, that the random variable has a binomial distribution—
```
```
           and then it is possible to prove much stronger bounds. Instead of polynomially
```
```
           small bounds such as 1=c 2 , we can sometimes even obtain exponentially small
```
```
           bounds such as 1=e c . As we will soon discover, this is the case whenever the ran-
```
```
           dom variable T is the sum of n mutually independent random variables T1 , T2 , . . . ,
```
```
           Tn where 0  Ti  1. A random variable with a binomial distribution is just one
```
```
           of many examples of such a T .
```
```

           20.5.1    A Motivating Example
```
```
           Fussbook is a new social networking site oriented toward unpleasant people. Like
```
```
           all major web services, Fussbook has a load balancing problem: it receives lots of
```
```
           forum posts that computer servers have to process. If any server is assigned more
```
```
           work than it can complete in a given interval, then it is overloaded and system
```
```
           performance suffers. That would be bad, because Fussbook users are not a tolerant
```
```
           bunch. So balancing the work load across mutliple servers is vital.
```
```
            

## 934 Chapter 20    Deviation from the Mean
```
```

         An early idea was to assign each server an alphabetic range of forum topics.
```
```
      (“That oughta work!”, one programmer said.) But after the computer handling the
```
```
      “privacy” and “preferred text editor” threads melted from overload, the drawback
```
```
      of an ad hoc approach was clear: it’s easy to miss something that will mess up your
```
```
      plan.
```
```
         If the length of every task were known in advance, then finding a balanced distri-
```
```
      bution would be a kind of “bin packing” problem. Such problems are hard to solve
```
```
      exactly, but approximation algorithms can come close. Unfortunately, in this case
```
```
      task lengths are not known in advance, which is typical of workload problems in
```
```
      the real world.
```
```
         So the load balancing problem seems sort of hopeless, because there is no data
```
```
      available to guide decisions. So the programmers of Fussbook gave up and just
```
```
      randomly assigned posts to computers. Imagine their surprise when the system
```
```
      stayed up and hasn’t crashed yet!
```
```
         As it turns out, random assignment not only balances load reasonably well, but
```
```
      also permits provable performance guarantees. In general, a randomized approach
```
```
      to a problem is worth considering when a deterministic solution is hard to compute
```
```
      or requires unavailable information.
```
```
         Specifically, Fussbook receives 24,000 forum posts in every 10-minute interval.
```
```
      Each post is assigned to one of several servers for processing, and each server
```
```
      works sequentially through its assigned tasks. It takes a server an average of 1=4
```
```
      second to process a post. Some posts, such as pointless grammar critiques and snide
```
```
      witticisms, are easier, but no post—not even the most protracted harangues—takes
```
```
      more than one full second.
```
```
         Measuring workload in seconds, this means a server is overloaded when it is
```
```
      assigned more than 600 units of work in a given 600 second interval. Fussbook’s
```
```
      average processing load of 24;000  1=4 D 6000 seconds per interval would keep
```
```
      10 computers running at 100% capacity with perfect load balancing. Surely, more
```
```
      than 10 servers are needed to cope with random fluctuations in task length and
```
```
      imperfect load balance. But would 11 be enough? . . . or 15, 20, 100? We’ll answer
```
```
      that question with a new mathematical tool.
```
```

      20.5.2       The Chernoff Bound
```
```
      The Chernoff5 bound is a hammer that you can use to nail a great many problems.
```
```
      Roughly, the Chernoff bound says that certain random variables are very unlikely
```
```
      to significantly exceed their expectation. For example, if the expected load on
```
```
      a processor is just a bit below its capacity, then that processor is unlikely to be
```
```
          5 Yes, this is the same Chernoff who figured out how to beat the state lottery—this guy knows a
```
```

      thing or two.
```
```
     

20.5. Sums of Random Variables                                                     935
```

overloaded, provided the conditions of the Chernoff bound are satisfied.
  More precisely, the Chernoff Bound says that the sum of lots of little, indepen-
dent, random variables is unlikely to significantly exceed the mean of the sum. The
Markov and Chebyshev bounds lead to the same kind of conclusion but typically
provide much weaker bounds. In particular, the Markov and Chebyshev bounds are
polynomial, while the Chernoff bound is exponential.
  Here is the theorem. The proof will come later in Section 20.5.6.

Theorem 20.5.1 (Chernoff Bound). Let T1 ; : : : Tn be mutually independent ran-
dom variables such that 0  Ti  1 for all i . Let T D T1 C    C Tn . Then for all
c  1,
```
                         PrŒT  c ExŒT   e ˇ .c/ ExŒT                    (20.23)
```
where ˇ.c/ WWD c ln c     c C 1.

  The Chernoff bound applies only to distributions of sums of independent random
variables that take on values in the real interval Œ0; 1. The binomial distribution is
the most well-known distribution that fits these criteria, but many others are possi-
ble, because the Chernoff bound allows the variables in the sum to have differing,
arbitrary, or even unknown distributions over the range Œ0; 1. Furthermore, there is
no direct dependence on either the number of random variables in the sum or their
expectations. In short, the Chernoff bound gives strong results for lots of problems
based on little information—no wonder it is widely used!

#### 20.5.3 Chernoff Bound for Binomial Tails
The Chernoff bound can be applied in easy steps, though the details can be daunting
at first. Let’s walk through a simple example to get the hang of it: bounding the
probability that the number of heads that come up in 1000 independent tosses of a
coin exceeds the expectation by 20% or more. Let Ti be an indicator variable for
the event that the i th coin is heads. Then the total number of heads is
```

                                 T D T1 C    C T1000 :
```

The Chernoff bound requires that the random variables Ti be mutually independent
and take on values in the range Œ0; 1. Both conditions hold here. In this example
the Ti ’s only take the two values 0 and 1, since they’re indicators.
   The goal is to bound the probability that the number of heads exceeds its expec-
tation by 20% or more; that is, to bound PrŒT  c ExŒT  where c = 1:2. To that
end, we compute ˇ.c/ as defined in the theorem:
```

                        ˇ.c/ D c ln.c/     c C 1 D 0:0187 : : : :
```
```
            

## 936 Chapter 20    Deviation from the Mean
```
```

      If we assume the coin is fair, then ExŒT  D 500. Plugging these values into the
```
```
      Chernoff bound gives:
```
```

                   Pr T  1:2 ExŒT   e ˇ .c/: ExŒT 
```
```
                                      
```
```

                                               D e .0:0187::: /500 < 0:0000834:
```
```

      So the probability of getting 20% or more extra heads on 1000 coins is less than 1
```
```
      in 10,000.
```
```
         The bound rapidly becomes much smaller as the number of coins increases, be-
```
```
      cause the expected number of heads appears in the exponent of the upper bound.
```
```
      For example, the probability of getting at least 20% extra heads on a million coins
```
```
      is at most
```
```
                                 e .0:0187::: /500000 < e 9392 ;
```
```
      which is an inconceivably small number.
```
```
         Alternatively, the bound also becomes stronger for larger deviations. For exam-
```
```
      ple, suppose we’re interested in the odds of getting 30% or more extra heads in
```
```
      1000 tosses, rather than 20%. In that case, c D 1:3 instead of 1:2. Consequently,
```
```
      the parameter ˇ.c/ rises from 0:0187 to about 0:0410, which may not seem sig-
```
```
      nificant, but because ˇ.c/ appears in the exponent of the upper bound, the final
```
```
      probability decreases from around 1 in 10,000 to about 1 in a billion!
```
```

      20.5.4       Chernoff Bound for a Lottery Game
```
```
      Pick-4 is a lottery game in which you pay $1 to pick a 4-digit number between 0000
```
```
      and 9999. If your number comes up in a random drawing, then you win $5,000.
```
```
      Your chance of winning is 1 in 10,000. If 10 million people play, then the expected
```
```
      number of winners is 1000. When there are exactly 1000 winners, the lottery keeps
```
```
      $5 million of the $10 million paid for tickets. The lottery operator’s nightmare is
```
```
      that the number of winners is much greater—especially at the point where more
```
```
      than 2000 win and the lottery must pay out more than it received. What is the
```
```
      probability that will happen?
```
```
        Let Ti be an indicator for the event that the i th player wins. Then T D T1 C  C
```
```
      Tn is the total number of winners. If we assume6 that the players’ picks and the
```
```
      winning number are random, independent and uniform, then the indicators Ti are
```
```
      independent, as required by the Chernoff bound.
```
```
         6 As we noted in Chapter 19, human choices are often not uniform and they can be highly de-
```
```

      pendent. For example, lots of people will pick an important date. The lottery folks should not get
```
```
      too much comfort from the analysis that follows, unless they assign random 4-digit numbers to each
```
```
      player.
```
```
     

20.5. Sums of Random Variables                                                        937
```

  Since 2000 winners would be twice the expected number, we choose c D 2,
compute ˇ.c/ D 0:386 : : : , and plug these values into the Chernoff bound:
```
                                                    
```
```
                PrŒT  2000 D Pr T  2 ExŒT 
```
```
                                    e k ExŒT  D e .0:386::: /1000
```
```
                                   < e 386 :
```

So there is almost no chance that the lottery operator pays out more than it took in.
In fact, the number of winners won’t even be 10% higher than expected very often.
To prove that, let c D 1:1, compute ˇ.c/ D 0:00484 : : : , and plug in again:
```

                   Pr T  1:1 ExŒT   e k ExŒT 
```
```
                                    
```
```

                                         D e .0:00484/1000 < 0:01:
```

So the Pick-4 lottery may be exciting for the players, but the lottery operator has
little doubt as to the outcome!

#### 20.5.5 Randomized Load Balancing
Now let’s return to Fussbook and its load balancing problem. Specifically, we need
to determine a number m of servers that makes it very unlikely that any server is
overloaded by being assigned more than 600 seconds of work in a given interval.
```
    To begin, let’s find the probability that the first server is overloaded. Letting T be
```
the number of seconds of work assigned to the first server, this means we want an
upper bound on PrŒT  600. Let Ti be the number of seconds that the first server
spends on the i th task: then Ti is zero if the task isPassigned to another machine,
and otherwise Ti is the length of the task. So T D niD1 Ti is the total number of
seconds of work assigned to the first server, where n D 24;000.
```
    The Chernoff bound is applicable only if the Ti are mutually independent and
```
take on values in the range Œ0; 1. The first condition is satisfied if we assume that
assignment of a post to a server is independent of the time required to process the
post. The second condition is satisfied because we know that no post takes more
than 1 second to process; this is why we chose to measure work in seconds.
```
    In all, there are 24,000 tasks, each with an expected length of 1/4 second. Since
```
tasks are assigned to the m servers at random, the expected load on the first server
is:
```
                              24;000 tasks  1=4 second per task
```
```
                     ExŒT  D
```
```
                                          m servers
```
```
                            D 6000=m seconds:                                     (20.24)
```
```
             

## 938 Chapter 20    Deviation from the Mean
```
```

      So if there are fewer than 10 servers, then the expected load on the first server is
```
```
      greater than its capacity, and we can expect it to be overloaded. If there are exactly
```
```
      10 servers, then the server is expected to run for 6000=10 D 600 seconds, which is
```
```
      100% of its capacity.
```
```
        Now we can use the Chernoff bound based on the number of servers to bound
```
```
      the probability that the first server is overloaded. We have from (20.24)
```
```

                               600 D c ExŒT           where c WWD m=10;
```
```

      so by the Chernoff bound
```
```

                    PrŒT  600 D PrŒT  c ExŒT   e .c ln.c/ cC1/6000=m ;
```
```

        The probability that some server is overloaded is at most m times the probability
```
```
      that the first server is overloaded, by the Union Bound in Section 17.5.2. So
```
```
                                                     m
```
```
                                                     X
```
```
               PrŒsome server is overloaded               PrŒserver i is overloaded
```
```
                                                     i D1
```
```
                                                  D m PrŒthe first server is overloaded
```
```
                                                   me .c ln.c/ cC1/6000=m ;
```
```

      where c D m=10. Some values of this upper bound are tabulated below:
```
```

                                  m D 11 W 0:784 : : :
```
```
                                  m D 12 W 0:000999 : : :
```
```
                                  m D 13 W 0:0000000760 : : : :
```
```

      These values suggest that a system with m D 11 machines might suffer immediate
```
```
      overload, m D 12 machines could fail in a few days, but m D 13 should be fine for
```
```
      a century or two!
```
```

      20.5.6       Proof of the Chernoff Bound
```
```
      The proof of the Chernoff bound is somewhat involved. In fact, Chernoff himself
```
```
      couldn’t come up with it: his friend, Herman Rubin, showed him the argument.
```
```
      Thinking the bound not very significant, Chernoff did not credit Rubin in print. He
```
```
      felt pretty bad when it became famous!7
```
```
         7 See “A Conversation with Herman Chernoff,” Statistical Science 1996, Vol. 11, No. 4, pp 335–
```
```

      350.
```
```
     

20.5. Sums of Random Variables                                                               939
```

Proof. (of Theorem 20.5.1)
   For clarity, we’ll go through the proof “top down.” That is, we’ll use facts that
are proved immediately afterward.
  The key step is to exponentiate both sides of the inequality T  c ExŒT  and
then apply the Markov bound:

PrŒT  c ExŒT  D PrŒc T  c c ExŒT  
```
                       ExŒc T 
```
```
                                                                         (Markov Bound)
```
```
                       c c ExŒT 
```
```
                       e .c 1/ ExŒT 
```
```
                                                                    (Lemma 20.5.2 below)
```
```
                          c c ExŒT 
```
```
                       e .c 1/ ExŒT 
```
```
                   D                    D e .c ln.c/ cC1/ ExŒT  :
```
```
                       e c ln.c/ ExŒT 
```
```
                                                                                             
```
```

   Algebra aside, there is a brilliant idea in this proof: in this context, exponenti-
```
ating somehow supercharges the Markov bound. This is not true in general! One
unfortunate side-effect of this supercharging is that we have to bound some nasty
expectations involving exponentials in order to complete the proof. This is done in
the two lemmas below, where variables take on values as in Theorem 20.5.1.
Lemma 20.5.2.                         h i
```
                                    Ex c T  e .c 1/ ExŒT  :
```

Proof.
```
     h i      h                i
```
   Ex c T D Ex c T1 CCTn                                                   (def of T )
```
              h                i
```
```
          D Ex c T1    c Tn
```
```
              h i
```
```
          D Ex c T1    ExŒc Tn                     (independent product Cor 19.5.7)
```
```
              e .c 1/ ExŒT1     e .c 1/ ExŒTn              (Lemma 20.5.3 below)
```
```
                  .c 1/.ExŒT1 CCExŒTn /
```
```
             De
```
```
             D e .c 1/ ExŒT1 CCTn                                 (linearity of ExŒ)
```
```
             D e .c 1/ ExŒT  :
```

The third equality depends on the fact that functions of independent variables are
also independent (see Lemma 19.2.2).                                            
```
           

## 940 Chapter 20    Deviation from the Mean
```
```

      Lemma 20.5.3.
```
```
                                            ExŒc Ti   e .c 1/ ExŒTi 
```
```

      Proof. All summations below range over values v taken by the random variable Ti ,
```
```
      which are all required to be in the interval Œ0; 1.
```
```
                   X
```
```
       ExŒc Ti  D     c v PrŒTi D v                                     (def of ExŒ)
```
```
                   X
```
```
                     .1 C .c 1/v/ PrŒTi D v                   (convexity—see below)
```
```
                   X
```
```
                 D     PrŒTi D v C .c 1/v PrŒTi D v
```
```
                   X                          X
```
```
                 D     PrŒTi D v C .c 1/          v PrŒTi D v
```
```
                   D 1 C .c       1/ ExŒTi 
```
```
                        .c 1/ ExŒTi 
```
```
                   e                                                     (since 1 C z  e z ):
```
```

      The second step relies on the inequality
```
```

                                               c v  1 C .c     1/v;
```
```

      which holds for all v in Œ0; 1 and c  1. This follows from the general principle
```
```
      that a convex function, namely c v , is less than the linear function 1 C .c 1/v
```
```
      between their points of intersection, namely v D 0 and 1. This inequality is why
```
```
      the variables Ti are restricted to the real interval Œ0; 1.                    
```
```

      20.5.7       Comparing the Bounds
```
```
      Suppose that we have a collection of mutually independent events A1 , A2 , . . . , An ,
```
```
      and we want to know how many of the events are likely to occur.
```
```
        Let Ti be the indicator random variable for Ai and define
```
```
                                                         
```
```
                                  pi D PrŒTi D 1 D Pr Ai
```
```

      for 1  i  n. Define
```
```
                                        T D T1 C T2 C    C Tn
```
```
      to be the number of events that occur.
```
```
         We know from Linearity of Expectation that
```
```

                               ExŒT  D ExŒT1  C ExŒT2  C    C ExŒTn 
```
```
                                            n
```
```
                                            X
```
```
                                        D          pi :
```
```
                                            i D1
```
```
      

20.5. Sums of Random Variables                                                              941
```

This is true even if the events are not independent.
  By Theorem 20.3.8, we also know that
```

                     VarŒT  D VarŒT1  C VarŒT2  C    C VarŒTn 
```
```
                                  n
```
```
                                  X
```
```
                              D          pi .1     pi /;
```
```
                                  i D1
```

and thus that                          v
```
                                       u n
```
```
                                       uX
```
```
                                  T D t   pi .1           pi /:
```
```
                                                 i D1
```

This is true even if the events are only pairwise independent.
  Markov’s Theorem tells us that for any c > 1,
```
                                                     1
```
```
                                   PrŒT  c ExŒT   :
```
```
                                                     c
```
   Chebyshev’s Theorem gives us the stronger result that
```
                                                               1
```
```
                              PrŒjT       ExŒT j  cT         :
```
```
                                                               c2
```
   The Chernoff Bound gives us an even stronger result, namely, that for any c > 0,
```

                   PrŒT     ExŒT   c ExŒT   e .c ln.c/ cC1/ ExŒT  :
```

In this case, the probability of exceeding the mean by c ExŒT  decreases as an
exponentially small function of the deviation.
   By considering the random variable n T , we can also use the Chernoff Bound
to prove that the probability that T is much lower than ExŒT  is also exponentially
small.

#### 20.5.8 Murphy’s Law
If the expectation of a random variable is much less than 1, then Markov’s Theorem
implies that there is only a small probability that the variable has a value of 1 or
more. On the other hand, a result that we call Murphy’s Law8 says that if a random
variable is an independent sum of 0–1-valued variables and has a large expectation,
then there is a huge probability of getting a value of at least 1.
   8 This is in reference and deference to the famous saying that “If something can go wrong, it

probably will.”
```
           

## 942 Chapter 20   Deviation from the Mean
```
```

      Theorem 20.5.4 (Murphy’s Law). Let A1 , A2 , . . . , An be mutually independent
```
```
      events. Let Ti be the indicator random variable for Ai and define
```
```

                                            T WWD T1 C T2 C    C Tn
```
```

      to be the number of events that occur. Then
```
```
                                                                  ExŒT 
```
```
                                                  PrŒT D 0  e            :
```
```

      Proof.
```
```

          PrŒT D 0 D PrŒA1 \ A2 \ : : : \ An                                 (T D 0 iff no Ai occurs)
```
```
                           n
```
```
                           Y
```
```
                       D          PrŒAi                                          (independence of Ai )
```
```
                           i D1
```
```
                           Y n
```
```
                       D          .1      PrŒAi /
```
```
                           i D1
```
```
                           n
```
```
                           Y
```
```
                                        PrŒAi 
```
```
                                 e                                 (1         x  e x for 0  x  1)
```
```
                           i D1
```
```
                               Pn
```
```
                       De             iD1 PrŒAi 
```
```
                              Pn
```
```
                       De             iD1 ExŒTi                  (since Ti is an indicator for Ai )
```
```
                              ExŒT 
```
```
                       De                                                      (linearity of expectation) 
```
```

         For example, given any set of mutually independent events, if you expect 10 of
```
```
      them to happen, then at least one of them will happen with probability at least 1
```
```
      e 10 . The probability that none of them happen is at most e 10 < 1=22000.
```
```
         So if there are a lot of independent things that can go wrong and their probabil-
```
```
      ities sum to a number much greater than 1, then Theorem 20.5.4 proves that some
```
```
      of them surely will go wrong.
```
```
         This result can help to explain “coincidences,” “miracles,” and crazy events that
```
```
      seem to have been very unlikely to happen. Such events do happen, in part, because
```
```
      there are so many possible unlikely events that the sum of their probabilities is
```
```
      greater than one. For example, someone does win the lottery.
```
```
         In fact, if there are 100,000 random tickets in Pick-4, Theorem 20.5.4 says that
```
```
      the probability that there is no winner is less than e 10 < 1=22000. More generally,
```
```
      there are literally millions of one-in-a-million possible events and so some of them
```
```
      will surely occur.
```
```
                

           20.5. Sums of Random Variables                                                  943
```

Problems for Section 20.1
```
           Practice Problems
```
```
           Problem 20.1.
```
```
           The vast majority of people have an above average number of fingers. Which of
```
```
           the following statements explain why this is true? Explain your reasoning.
```
```

              1. Most people have a super secret extra bonus finger of which they are un-
```
```
                 aware.
```
```

              2. A pedantic minority don’t count their thumbs as fingers, while the majority
```
```
                 of people do.
```
```

              3. Polydactyly is rarer than amputation.
```
```

              4. When you add up the total number of fingers among the world’s population
```
```
                 and then divide by the size of the population, you get a number less than ten.
```
```

              5. This follows from Markov’s Theorem, since no one has a negative number
```
```
                 of fingers.
```
```

              6. Missing fingers are more common than extra ones.
```
```

           Class Problems
```
```
           Problem 20.2.
```
```
           A herd of cows is stricken by an outbreak of cold cow disease. The disease lowers
```
```
           a cow’s body temperature from normal levels, and a cow will die if its temperature
```
```
           goes below 90 degrees F. The disease epidemic is so intense that it lowered the
```
```
           average temperature of the herd to 85 degrees. Body temperatures as low as 70
```
```
           degrees, but no lower, were actually found in the herd.
```
```
            (a) Use Markov’s Bound 20.1.1 to prove that at most 3/4 of the cows could sur-
```
```
           vive.
```
```

            (b) Suppose there are 400 cows in the herd. Show that the bound from part (a)
```
```
           is the best possible by giving an example set of temperatures for the cows so that
```
```
           the average herd temperature is 85 and 3/4 of the cows will have a high enough
```
```
           temperature to survive.
```
```

            (c) Notice that the results of part (b) are purely arithmetic facts about averages,
```
```
           not about probabilities. But you verified the claim in part (a) by applying Markov’s
```
```
           

## 944 Chapter 20   Deviation from the Mean
```
```

      bound on the deviation of a random variable. Justify this approach by regarding
```
```
      the temperature T of a cow as a random variable. Carefully specify the probability
```
```
      space on which T is defined: what are the sample points? what are their proba-
```
```
      bilities? Explain the precise connection between properties of T and average herd
```
```
      temperature that justifies the application of Markov’s Bound.
```
```

      Homework Problems
```
```
      Problem 20.3.
```
```
      If R is a nonnegative random variable, then Markov’s Theorem gives an upper
```
```
      bound on PrŒR  x for any real number x > ExŒR. If b is a lower bound on R,
```
```
      then Markov’s Theorem can also be applied to R b to obtain a possibly different
```
```
      bound on PrŒR  x.
```
```
       (a) Show that if b > 0, applying Markov’s Theorem to R b gives a smaller
```
```
      upper bound on PrŒR  x than simply applying Markov’s Theorem directly to R.
```
```

      (b) What value of b  0 in part (a) gives the best bound?
```
```

      Exam Problems
```
```
      Problem 20.4.
```
```
      A herd of cows is stricken by an outbreak of hot cow disease. The disease raises
```
```
      the normal body temperature of a cow, and a cow will die if its temperature goes
```
```
      above 90 degrees. The disease epidemic is so intense that it raised the average
```
```
      temperature of the herd to 120 degrees. Body temperatures as high as 140 degrees,
```
```
      but no higher, were actually found in the herd.
```
```
       (a) Use Markov’s Bound 20.1.1 to prove that at most 2/5 of the cows could have
```
```
      survived.
```
```

       (b) Notice that the conclusion of part (a) is a purely arithmetic facts about aver-
```
```
      ages, not about probabilities. But you verified the claim of part (a) by applying
```
```
      Markov’s bound on the deviation of a random variable. Justify this approach by
```
```
      explaining how to define a random variable T for the temperature of a cow. Care-
```
```
      fully specify the probability space on which T is defined: what are the outcomes?
```
```
      what are their probabilities? Explain the precise connection between properties of
```
```
      T , average herd temperature, and fractions of the herd with various temperatures,
```
```
      that justify application of Markov’s Bound.
```
```
                

           20.5. Sums of Random Variables                                                    945
```

Problems for Section 20.2
```
           Exam Problems
```
```
           Problem 20.5.
```
```
           There is a herd of cows whose average body temperature turns out to be 100 de-
```
```
           grees. Our thermometer produces such sensitive readings that no two cows have
```
```
           exactly the same body temperature. The herd is stricken by an outbreak of wacky
```
```
           cow disease, which will eventually kill any cow whose body temperature differs
```
```
           from the average by 10 degrees or more.
```
```
              It turns out that the collection-variance of all the body temperatures is 20, where
```
```
           the collection-variance CVar.A/ of set A of numbers is
```
```

                                                             .a /2
```
```
                                                      P
```
```
                                        CVar.A/ WWD a2A               ;
```
```
                                                            jAj
```
```

           where  is the average value of the numbers in A.9
```
```
            (a) Apply the Chebyshev bound to the temperature T of a random cow to show
```
```
           that at most 20% of the cows will be killed by this disease outbreak.
```
```

             The conclusion of part (a) about a certain fraction of the herd was derived by
```
```
           bounding the deviation of a random variable. We can justify this approach by
```
```
           explaining how to define a suitable probability space in which, the temperature
```
```
           T of a cow is a random variable.
```
```
            (b) Carefully specify the probability space on which T is defined: what are the
```
```
           outcomes? what are their probabilities?
```
```

            (c) Explain why for this probability space, the fraction of cows with any given
```
```
           cow property P is the same as PrŒP .
```
```
                                      (CONTINUED ON NEXT PAGE)
```
```

            (d) Show that VarŒT  equals the collection variance of the temperatures in the
```
```
           herd.
```
```
              9 CVar.A/ is called A’s mean square deviation.
```
```
                

## 946 Chapter 20   Deviation from the Mean
```

Problems for Section 20.3
```
           Practice Problems
```
```
           Problem 20.6.
```
```
           Suppose 120 students take a final exam and the mean of their scores is 90. You
```
```
           have no other information about the students and the exam, that is, you should not
```
```
           assume that the highest possible score is 100. You may, however, assume that exam
```
```
           scores are nonnegative.
```
```
            (a) State the best possible upper bound on the number of students who scored at
```
```
           least 180.
```
```

            (b) Now suppose somebody tells you that the lowest score on the exam is 30.
```
```
           Compute the new best possible upper bound on the number of students who scored
```
```
           at least 180.
```
```

           Problem 20.7.
```
```
           Suppose you flip a fair coin 100 times. The coin flips are all mutually independent.
```
```
            (a) What is the expected number of heads?
```
```

            (b) What upper bound does Markov’s Theorem give for the probability that the
```
```
           number of heads is at least 70?
```
```

            (c) What is the variance of the number of heads?
```
```

            (d) What upper bound does Chebyshev’s Theorem give for the probability that the
```
```
           number of heads is either less than 30 or greater than 70?
```
```

           Problem 20.8.
```
```
           Albert has a gambling problem. He plays 240 hands of draw poker, 120 hands of
```
```
           black jack, and 40 hands of stud poker per day. He wins a hand of draw poker with
```
```
           probability 1/6, a hand of black jack with probability 1/2, and a hand of stud poker
```
```
           with probability 1/5. Let W be the expected number of hands that Albert wins in a
```
```
           day.
```
```
            (a) What is ExŒW ?
```
```

            (b) What would the Markov bound be on the probability that Albert will win at
```
```
           least 216 hands on a given day?
```
```
     

20.5. Sums of Random Variables                                                     947
```

 (c) Assume the outcomes of the card games are pairwise independent. What is
VarŒW ? You may answer with a numerical expression that is not completely eval-
uated.

 (d) What would the Chebyshev bound be on the probability that Albert will win
at least 216 hands on a given day? You may answer with a numerical expression
that includes the constant v D VarŒW .

Class Problems
Problem 20.9.
The hat-check staff has had a long day serving at a party, and at the end of the party
they simply return the n checked hats in a random way such that the probability
that any particular person gets their own hat back is 1=n.
   Let Xi be the indicator variable for the i th person getting their own hat back. Let
Sn be the total number of people who get their own hat back.
 (a) What is the expected number of people who get their own hat back?

(b) Write a simple formula for ExŒXi  Xj  for i ¤ j .
Hint: What is the probability that the second person got their hat
```
                                                                  back, given that
```
the fifth person got their hat back, that is, Pr X2 D 1 j X5 D 1 ?

 (c) Explain why you cannot use the variance of sums formula to calculate VarŒSn .

(d) Show that ExŒ.Sn /2  D 2. Hint: .Xi /2 D Xi .

 (e) What is the variance of Sn ?

 (f) Use the Chebyshev bound to show that there is at most a 1% chance that more
than 10 people get their own hat back.

Problem 20.10.
For any random variable R with mean  and standard deviation  the Chebyshev
bound says that for any real number x > 0,
```
                                              2
```
```
                            PrŒjR j  x         :
```
```
                                              x
```
Show that for any real number  and real numbers x   > 0, there is an R for
which the Chebyshev bound is tight, that is,
```
                                               2
```
```
                          PrŒjR j  x D           :                 (20.25)
```
```
                                               x
```
```
           

## 948 Chapter 20   Deviation from the Mean
```
```

        Hint: First assume  D 0 and let R take only the values 0; x and x.
```
```

      Problem 20.11.
```
```
      A computer program crashes at the end of each hour of use with probability 1=p,
```
```
      if it has not crashed already. Let H be the number of hours until the first crash.
```
```
      (a) What is the Chebyshev bound on
```
```

                                      PrŒjH     .1=p/j > x=p
```
```

      where x > 0?
```
```

      (b) Conclude from part (a) that for a  2,
```
```
                                                       1    p
```
```
                                     PrŒH > a=p 
```
```
                                                      .a    1/2
```
```

      Hint: Check that jH       .1=p/j > .a     1/=p iff H > a=p.
```
```

       (c) What actually is
```
```
                                             PrŒH > a=p‹
```
```

      Conclude that for any fixed p > 0, the probability that H > a=p is an asymptoti-
```
```
      cally smaller function of a than the Chebyshev bound of part (b).
```
```

      Problem 20.12.
```
```
      Let R be a positive integer-valued random variable.
```
```
      (a) How large can ExŒ1=R be?
```
```

      (b) How large can VarŒR be if the only values of R are 1 and 2?
```
```

       (c) How large can VarŒR be if ExŒR D 2?
```
```

      Problem 20.13.
```
```
      A man has a set of n keys, one of which fits the door to his apartment. He tries the
```
```
      keys randomly throwing away each ill-fitting key that he tries until he finds the key
```
```
      that fits. That is, he chooses keys randomly from among those he has not yet tried.
```
```
      This way he is sure to find the right key within n tries.
```
```
     

20.5. Sums of Random Variables                                                     949
```

  Let T be the number of times he tries keys until he finds the right key. Prob-
lem 19.28 shows that
```
                                         nC1
```
```
                                ExŒT  D      :
```
```
                                          2
```
Write a closed formula for VarŒT .

Problem 20.14.
Let R be a positive integer valued random variable such that
```
                                                    1
```
```
                                   PDFR .n/ D          ;
```
```
                                                   cn3
```
where
```
                                             1
```
```
                                             X 1
```
```
                                     c WWD              :
```
```
                                                   n3
```
```
                                             nD1
```
(a) Prove that ExŒR is finite.

(b) Prove that ExŒR2  and therefore VarŒR are both infinite.
A joking way to phrase the point of this example is “the square root of infinity may
be finite.”
   p        Namely, let T WWD R2 ; then part (b) implies that ExŒT  D 1 while
ExŒ T  < 1 by (a).

Homework Problems
Problem 20.15.
A man has a set of n keys, one of which fits the door to his apartment. He tries a
key at random, and if it does not fit the door, he simply puts it back; so he might try
the same ill-fitting key several times. He continues until he finds the one right key
that fits.
   Let T be the number of times he tries keys until he finds the right key.
 (a) Explain why
```

                       ExŒT  D n and        VarŒT  D n.n   1/:
```

  Let
```
                                 fn .a/ WWD PrŒT  an:
```
(b) Use the Chebyshev Bound to show that for any fixed n > 1,
```
                                        
```
```
                                          1
```
```
                           fn .a/ D ‚          :                               (20.26)
```
```
                                          a2
```
```
           

## 950 Chapter 20   Deviation from the Mean
```
```

       (c) Derive an upper bound for fn .a/ that for any fixed n > 1 is asymptoticaly
```
```
      smaller than Chebyshev’s bound (20.26).
```
```
      You may assume that n is large enough to use the approximation
```
```
                                          1 cn
```
```
                                           
```
```
                                                     1
```
```
                                       1          c
```
```
                                          n          e
```
```

      Problem 20.16.
```
```
      There is a fair coin and a biased coin that flips heads with probability 3=4. You are
```
```
      given one of the coins, but you don’t know which. To determine which coin was
```
```
      picked, your strategy will be to choose a number n and flip the picked coin n times.
```
```
      If the number of heads flipped is closer to .3=4/n than to .1=2/n, you will guess
```
```
      that the biased coin had been picked and otherwise you will guess that the fair coin
```
```
      had been picked.
```
```
       (a) Use the Chebyshev Bound to find a value n so that with probability 0.95 your
```
```
      strategy makes the correct guess, no matter which coin was picked.
```
```

       (b) Suppose you had access to a computer program that would generate, in the
```
```
      form of a plot or table, the full binomial-.n; p/ probability density and cumulative
```
```
      distribution functions. How would you find the minimum number of coin flips
```
```
      needed to infer the identity of the chosen coin with probability 0.95? How would
```
```
      you expect the number n determined this way to compare to the number obtained
```
```
      in part(a)? (You do not need to determine the numerical value of this minimum n,
```
```
      but we’d be interested to know if you did.)
```
```

       (c) Now that we have determined the proper number n, we will assert that the
```
```
      picked coin was the biased one whenever the number of Heads flipped is greater
```
```
      than .5=8/n, and we will be right with probability 0.95. What, if anything, does
```
```
      this imply about
```
```
                                                                       
```
```
                  Pr picked coin was biased j # Heads flipped  .5=8/n ‹
```
```

      Problem 20.17.
```
```
      The expected absolute deviation of a real-valued random variable R with mean ,
```
```
      is defined to be
```
```
                                       ExŒ jR j :
```
```
      Prove that the expected absolute deviation is always less than or equal to the stan-
```
```
      dard deviation  . (For simplicity, you may assume that R is defined on a finite
```
```
      sample space.)
```
```
     

20.5. Sums of Random Variables                                                      951
```
```

   Hint: Suppose the sample space outcomes are !1 ; !2 ; : : : ; !n , and let
```
```
                                                       p
```
```
             p WWD .p1 ; p2 ; : : : ; pn / where pi D PrŒ!i ;
```
```
                                                                 p
```
```
             r WWD .r1 ; r2 ; : : : ; rn / where ri D jR.!i / j PrŒ!i :
```

As usual, let v  w WWD niD1 vi ui denote the dot product of n-vectors v; w, and let
```
                         P
```
```
                                     p
```
jvj be the norm of v, namely, v  v.
   Then verify that
```

               jpj D 1;          jrj D ;   and   ExŒ jR    j  D r  p:
```

Problem 20.18.
Prove the following “one-sided” version of the Chebyshev bound for deviation
above the mean:
Lemma (One-sided Chebyshev bound).
```
                                                      VarŒR
```
```
                          PrŒR     ExŒR  x                 :
```
```
                                                  x 2 C VarŒR
```
  Hint: Let Sa WWD .R ExŒR C a/2 , for 0  a 2 R. So R ExŒR  x
implies Sa  .x C a/2 . Apply Markov’s bound to PrŒSa  .x C a/2 . Choose a to
minimize this last bound.

Problem 20.19.
Prove the pairwise independent additivity of variance Theorem 20.3.8: If R1 ; R2 ; : : : ; Rn
are pairwise independent random variables, then
```

        VarŒR1 C R2 C    C Rn  D VarŒR1  C VarŒR2  C    C VarŒRn :        (*)
```

  Hint: Why is it OK to assume ExŒRi  D 0?

Exam Problems
Problem 20.20.
You are playing a game where you get n turns. Each of your turns involves flipping
a coin a number of times. On the first turn, you have 1 flip, on the second turn you
have two flips, and so on until your nth turn when you flip the coin n times. All the
flips are mutually independent.
   The coin you are using is biased to flip Heads with probability p. You win a turn
if you flip all Heads. Let W be the number of winning turns.
```
           

## 952 Chapter 20   Deviation from the Mean
```
```

      (a) Write a closed-form (no summations) expression for ExŒW .
```
```

      (b) Write a closed-form expression for VarŒW .
```
```

      Problem 20.21.
```
```
      Let Kn be the complete graph with n vertices. Each of the edges of the graph
```
```
      will be randomly assigned one of the colors red, green, or blue. The assignments
```
```
      of colors to edges are mutually independent, and the probability of an edge being
```
```
      assigned red is r, blue is b, and green is g (so r C b C g D 1).
```
```
         A set of three vertices in the graph is called a triangle. A triangle is monochro-
```
```
      matic if the three edges connecting the vertices are all the same color.
```
```
       (a) Let m be the probability that any given triangle T is monochromatic. Write a
```
```
      simple formula for m in terms of r; b; and g.
```
```

       (b) Let IT be the indicator variable for whether T is monochromatic. Write simple
```
```
      formulas in terms of m; r; b and g for ExŒIT  and VarŒIT .
```
```

                                             ExŒIT  D
```
```
                                             VarŒIT  D
```
```

         Let T and U be distinct triangles.
```
```
       (c) What is the probability that T and U are both monochromatic if they do not
```
```
      share an edge?. . . if they do share an edge?
```
```

                                                       1
```
```
                                 Now assume r D b D g D .
```
```
                                                       3
```
```
      (d) Show that IT and IU are independent random variables.
```
```

       (e) Let M be the number of monochromatic triangles. Write simple formulas in
```
```
      terms of n and m for ExŒM  and VarŒM .
```
```

                                             ExŒM  D
```
```
                                             VarŒM  D
```
```
     

20.5. Sums of Random Variables                                                 953
```

 (f) Let  WWD ExŒM . Use Chebyshev’s Bound to prove that
```
                          h             p       i            1
```
```
                        Pr jM    j >     log                 :
```
```
                                                           log 
```

(g) Conclude that
```
                               h                  p          i
```
```
                         lim Pr jM      j >           log  D 0
```
```
                        n!1
```

Problem 20.22.
You have a biased coin which flips Heads with probability p. You flip the coin n
times. The coin flips are all mutually independent. Let H be the number of Heads.
 (a) Write a closed-form (no summations) expression in terms of p and n for
ExŒH , the expected number of Heads. Briefly explain your answer.

 (b) Write a closed-form expression in terms of p and n for VarŒH , the variance
of the number of Heads. Briefly explain your answer.

 (c) Write a closed-form expression in terms of p for the upper bound that Markov’s
Theorem gives for the probability that the number of Heads is larger than the ex-
pected number by at least 1% of the number of flips, that is, by n=100.

 (d) Show that the upper bound given by Chebyshev’s Theorem for the probability
that H differs from ExŒH  by at least n=100 is
```

                                        p.1       p/
```
```
                                 1002                  :
```
```
                                              n
```

 (e) The bound in part (d) implies that if you flip at least n times for a certain
number n, then there is a 95% chance that the proportion of Heads among these
n flips will be within 0.01 of p. Use the result from part (d) to write a simple
expression for n in terms of p.

Problem 20.23.
A classroom has sixteen desks in a 4  4 arrangement as shown below.
```
           

## 954 Chapter 20   Deviation from the Mean
```
```

         If two desks are next to each other, vertically or horizontally, they are called an
```
```
      adjacent pair. So there are three horizontally adjacent pairs in each row, for a total
```
```
      of twelve horizontally adjacent pairs. Likewise, there are twelve vertically adjacent
```
```
      pairs. An adjacent pair D of desks is said to have a flirtation when there is a boy at
```
```
      one desk and a girl at the other desk.
```
```
       (a) Suppose boys and girls are assigned to desks in some unknown probabilistic
```
```
      way. What is the Markov bound on the probability that the number of flirtations is
```
```
      at least 33 1/3% more than expected?
```
```

        Suppose that boys and girls are actually assigned to desks mutually indepen-
```
```
      dently, with probability p of a desk being occupied by a boy, where 0 < p < 1.
```
```
      (b) Express the expected number of flirtations in terms of p.
```
```
      Hint: Let ID be the indicator variable for a flirtation at D.
```
```

         Different pairs D and E of adjacent desks are said to overlap when they share
```
```
      a desk. For example, the first and second pairs in each row overlap, and so do the
```
```
      second and third pairs, but the first and third pairs do not overlap.
```
```
       (c) Prove that if D and E overlap, and p D 1=2, then ID and IE are independent.
```
```

      (d) When p D 1=2, what is the variance of the number of flirtations?
```
```

       (e) What upper bound does Chebyshev’s Theorem give on the probability that the
```
```
      number of heads is either less than 30 or greater than 70?
```
```

       (f) Let D and E be pairs of adjacent desks that overlap. Prove that if p ¤ 1=2,
```
```
      then FD and FE are not independent.
```
```
                

           20.5. Sums of Random Variables                                                      955
```
```

            (g) Find four pairs of desks D1 ; D2 ; D3 ; D4 and explain why FD1 ; FD2 ; FD3 ; FD4
```
```
           are not mutually independent (even if p D 1=2).
```

Problems for Section 20.4
```
           Class Problems
```
```
           Problem 20.24.
```
```
           A recent Gallup poll found that 35% of the adult population of the United States
```
```
           believes that the theory of evolution is “well-supported by the evidence.” Gallup
```
```
           polled 1928 Americans selected uniformly and independently at random. Of these,
```
```
           675 asserted belief in evolution, leading to Gallup’s estimate that the fraction of
```
```
           Americans who believe in evolution is 675=1928  0:350. Gallup claims a margin
```
```
           of error of 3 percentage points, that is, he claims to be confident that his estimate is
```
```
           within 0.03 of the actual percentage.
```
```
            (a) What is the largest variance an indicator variable can have?
```
```

            (b) Use the Pairwise Independent Sampling Theorem to determine a confidence
```
```
           level with which Gallup can make his claim.
```
```

            (c) Gallup actually claims greater than 99% confidence in his estimate. How
```
```
           might he have arrived at this conclusion? (Just explain what quantity he could
```
```
           calculate; you do not need to carry out a calculation.)
```
```

            (d) Accepting the accuracy of all of Gallup’s polling data and calculations, can
```
```
           you conclude that there is a high probability that the percentage of adult Americans
```
```
           who believe in evolution is 35 ˙ 3 percent?
```
```

           Problem 20.25.
```
```
           Let B1 ; B2 ; : : : ; Bn be mutually independent random variables with a uniform dis-
```
```
           tribution on the integer interval Œ1::d . Let Ei;j be the indicator variable for the
```
```
           event ŒBi D Bj .
```
```
              Let M equal the number of events ŒBi D Bj  that are true, where 1  i < j 
```
```
           n. So                                      X
```
```
                                              M D            Ei;j :
```
```
                                                  1i <j n
```
```

             It was observed in Section 17.4 (and proved in Problem 19.2) that PrŒBi D
```
```
           Bj  D 1=d for i ¤ j and that the random variables Ei;j , where 1  i < j  n,
```
```
           

## 956 Chapter 20   Deviation from the Mean
```
```

      are pairwise independent.
```
```
      (a) What are ExŒEi;j  and VarŒEi;j  for i ¤ j ?
```
```

      (b) What are ExŒM  and VarŒM ?
```
```

       (c) In a 6.01 class of 500 students, the youngest student was born 15 years ago
```
```
      and the oldest 35 years ago. Show that more than half the time, there will be will be
```
```
      between 12 and 23 pairs of students who have the same birth date. (For simplicity,
```
```
      assume that the distribution of birthdays is uniform over the 7305 days in the two
```
```
      decade interval from 35 years ago to 15 years ago.)
```
```
      Hint: Let D be the number of pairs of students in the class who have the same birth
```
```
      date. Note that jD ExŒDj < 6 IFF D 2 Œ12::23.
```
```

      Problem 20.26.
```
```
      A defendent in traffic court is trying to beat a speeding ticket on the grounds that—
```
```
      since virtually everybody speeds on the turnpike—the police have unconstitutional
```
```
      discretion in giving tickets to anyone they choose. (By the way, we don’t recom-
```
```
      mend this defense :-).)
```
```
         To support his argument, the defendent arranged to get a random sample of trips
```
```
      by 3,125 cars on the turnpike and found that 94% of them broke the speed limit
```
```
      at some point during their trip. He says that as a consequence of sampling theory
```
```
      (in particular, the Pairwise Independent Sampling Theorem), the court can be 95%
```
```
      confident that the actual percentage of all cars that were speeding is 94 ˙ 4%.
```
```
         The judge observes that the actual number of car trips on the turnpike was never
```
```
      considered in making this estimate. He is skeptical that, whether there were a
```
```
      thousand, a million, or 100,000,000 car trips on the turnpike, sampling only 3,125
```
```
      is sufficient to be so confident.
```
```
         Suppose you were were the defendent. How would you explain to the judge
```
```
      why the number of randomly selected cars that have to be checked for speeding
```
```
      does not depend on the number of recorded trips? Remember that judges are not
```
```
      trained to understand formulas, so you have to provide an intuitive, nonquantitative
```
```
      explanation.
```
```

      Problem 20.27.
```
```
      The proof of the Pairwise Independent Sampling Theorem 20.4.1 was given for
```
```
      a sequence R1 ; R2 ; : : : of pairwise independent random variables with the same
```
```
      mean and variance.
```