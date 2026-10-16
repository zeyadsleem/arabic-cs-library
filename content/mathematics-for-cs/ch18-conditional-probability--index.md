---
title: "Conditional Probability"
lang: en
---

## 18 Conditional Probability

### 18.1 Monty Hall Confusion
```
           Remember how we said that the Monty Hall problem confused even professional
```
```
           mathematicians? Based on the work we did with tree diagrams, this may seem
```
```
           surprising—the conclusion we reached followed routinely and logically. How could
```
```
           this problem be so confusing to so many people?
```
```
              Well, one flawed argument goes as follows: let’s say the contestant picks door
```
```
           A. And suppose that Carol, Monty’s assistant, opens door B and shows us a goat.
```
```
           Let’s use the tree diagram 17.3 from Chapter 17 to capture this situation. There are
```
```
           exactly three outcomes where contestant chooses door A, and there is a goat behind
```
```
           door B:
```
```
                                    .A; A; B/; .A; A; C /; .C; A; B/:                    (18.1)
```
```
           These outcomes have respective probabilities 1/18, 1/18, 1/9.
```
```
              Among those outcomes, switching doors wins only on the last outcome .C; A; B/.
```
```
           The other two outcomes together have the same 1/9 probability as the last one So
```
```
           in this situation, the probability that we win by switching is the same as the proba-
```
```
           bility that we lose. In other words, in this situation, switching isn’t any better than
```
```
           sticking!
```
```
              Something has gone wrong here, since we know that the actual probability of
```
```
           winning by switching in 2/3. The mistaken conclusion that sticking or switching
```
```
           are equally good strategies comes from a common blunder in reasoning about how
```
```
           probabilities change given some information about what happened. We have asked
```
```
           for the probability that one event, [win by switching], happens, given that another
```
```
           event, [pick A AND goat at B], happens. We use the notation
```
```
                                                                               
```
```
                              Pr [win by switching] j [pick A AND goat at B]
```
```

           for this probability which, by the reasoning above, equals 1/2.
```
```

           18.1.1    Behind the Curtain
```
```
           A “given” condition is essentially an instruction to focus on only some of the possi-
```
```
           ble outcomes. Formally, we’re defining a new sample space consisting only of some
```
```
           of the outcomes. In this particular example, we’re given that the player chooses
```
```
           door A and that there is a goat behind B. Our new sample space therefore consists
```
```
           solely of the three outcomes listed in (18.1). In the opening of Section 18.1, we
```
```
                 

## 806 Chapter 18   Conditional Probability
```
```

            calculated the conditional probability of winning by switching given that one of
```
```
            these outcome happened, by weighing the 1/9 probability of the win-by-switching
```
```
            outcome .C; A; B/ against the 1=18C1=18C1=9 probability of the three outcomes
```
```
            in the new sample space.
```
```
                                                                       
```
```
                         Pr [win by switching] j [pick A AND goat at B]
```
```
                                                                            
```
```
                          D Pr .C; A; B/ j f.C; A; B/; .A; A; B/; .A; A; C /g C
```
```
                                           PrŒ.C; A; B/
```
```
                               PrŒf.C; A; B/; .A; A; B/; .A; A; C /g
```
```
                                     1=9             1
```
```
                          D                       D :
```
```
                              1=18 C 1=18 C 1=9      2
```
```
            There is nothing wrong with this calculation. So how come it leads to an incorrect
```
```
            conclusion about whether to stick or switch? The answer is that this was the wrong
```
```
            thing to calculate, as we’ll explain in the next section.
```

### 18.2 Definition and Notation
```
                                       
```
```
            The expression Pr X j Y denotes the probability of event X, given that event
```
```
            Y happens. In the example above, event X is the event of winning on a switch,
```
```
            and event Y is the event that a goat
```
```
                                                 is behind door B and the contestant chose
```
```
            door A. We calculated Pr X j Y using a formula which serves as the definition
```
```
            of conditional probability:
```
```

            Definition 18.2.1. Let X and Y be events where Y has nonzero probability. Then
```
```
                                                        PrŒX \ Y 
```
```
                                         Pr X j Y WWD                 :
```
```
                                                             PrŒY 
```
```
                                                       
```
```
               The conditional probability Pr X j Y is undefined when the probability of
```
```
            event Y is zero. To avoid cluttering up statements with uninteresting hypotheses
```
```
            that conditioning events like Y have nonzero probability, we will make an implicit
```
```
            assumption from now on that all such events have nonzero probability.
```
```
               Pure probability is often counterintuitive, but conditional probability can be even
```
```
            worse. Conditioning can subtly alter probabilities and produce unexpected results
```
```
            in randomized algorithms and computer systems as well as in betting games. But
```
```
            Definition 18.2.1 is very simple and causes no trouble—provided it is properly
```
```
            applied.
```
```
      

18.2. Definition and Notation                                                 807
```

#### 18.2.1 What went wrong
So if everything in the opening Section 18.1 is mathematically sound, why does it
seem to contradict the results that we established in Chapter 17? The problem is a
common one: we chose the wrong condition. In our initial description of the sce-
nario, we learned the location of the goat when Carol opened door B. But when we
defined our condition as “the contestant opens A and the goat is behind B,” we in-
cluded the outcome .A; A; C / in which Carol opens door C! The correct conditional
probability should have been “what are the odds of winning by switching given the
contestant chooses door A and Carol opens door B.” By choosing a condition that
did not reflect everything known. we inadvertently included an extraneous outcome
in our calculation. With the correct conditioning, we still win by switching 1/9 of
the time, but the smaller set of known outcomes has smaller total probability:
```
                                                     1  1 3
```
```
                     PrŒf.A; A; B/; .C; A; B/g D      C D :
```
```
                                                    18 9  18
```
The conditional probability would then be:
```
                                                     
```
```
    Pr [win by switching] j [pick A AND Carol opens B]
```
```
                                                   PrŒ.C; A; B/
```
```
     D Pr .C; A; B/ j f.C; A; B/; .A; A; B/g C
```
```
                                               PrŒf.C; A; B/; .A; A; B/g
```
```
            1=9        2
```
```
     D              D ;
```
```
        1=9 C 1=18     3
```
which is exactly what we already deduced from the tree diagram 17.2 in Sec-
tion 17.2.
```
                 

## 808 Chapter 18   Conditional Probability
```
```

            The O. J. Simpson Trial
```
```
            In an opinion article in the New York Times, Steven Strogatz points to the O. J.
```
```
            Simpson trial as an example of poor choice of conditions. O. J. Simpson was
```
```
            a retired football player who was accused, and later acquitted, of the murder of
```
```
            his wife, Nicole Brown Simpson. The trial was widely publicized and called
```
```
            the “trial of the century.” Racial tensions, allegations of police misconduct, and
```
```
            new-at-the-time DNA evidence captured the public’s attention. But Strogatz, cit-
```
```
            ing mathematician and author I.J. Good, focuses on a less well-known aspect of
```
```
            the case: whether O. J.’s history of abuse towards his wife was admissible into
```
```
            evidence.
```
```
               The prosecution argued that abuse is often a precursor to murder, pointing to
```
```
            statistics indicating that an abuser was as much as ten times more likely to commit
```
```
            murder than was a random individual. The defense, however, countered with
```
```
            statistics indicating that the odds of an abusive husband murdering his wife were
```
```
            “infinitesimal,” roughly 1 in 2500. Based on those numbers, the actual relevance
```
```
            of a history of abuse to a murder case would appear limited at best. According
```
```
            to the defense, introducing that history would prejudice the jury against Simpson
```
```
            but would lack any probitive value, so the discussion should be barred.
```
```
               In other words, both the defense and the prosecution were arguing conditional
```
```
            probability, specifically the likelihood that a woman will be murdered by her
```
```
            husband, given that her husband abuses her. But both defense and prosecution
```
```
            omitted a vital piece of data from their calculations: Nicole Brown Simpson was
```
```
            murdered. Strogatz points out that based on the defense’s numbers and the crime
```
```
            statistics of the time, the probability that a woman was murdered by her abuser,
```
```
            given that she was abused and murdered, is around 80%.
```
```
               Strogatz’s article goes into more detail about the calculations behind that 80%
```
```
            figure. But the issue we want to illustrate is that conditional probability is used
```
```
            and misused all the time, and even experts under public scrutiny make mistakes.
```

### 18.3 The Four-Step Method for Conditional Probability
```
            In a best-of-three tournament, the local C-league hockey team wins the first game
```
```
            with probability 1=2. In subsequent games, their probability of winning is deter-
```
```
            mined by the outcome of the previous game. If the local team won the previous
```
```
            game, then they are invigorated by victory and win the current game with proba-
```
```
            bility 2=3. If they lost the previous game, then they are demoralized by defeat and
```
```
            win the current game with probability only 1=3. What is the probability that the
```
```
      

18.3. The Four-Step Method for Conditional Probability                                 809
```

local team wins the tournament, given that they win the first game?
   This is a question about a conditional probability. Let A be the event that the
local team wins the tournament, and let B be the event that they
```
                                                              win the first game.
```
Our goal is then to determine the conditional probability Pr A j B .
   We can tackle conditional probability questions just like ordinary probability
problems: using a tree diagram and the four step method. A complete tree diagram
is shown in Figure 18.1.
   game 1         game 2      game 3 outcome             event A: event B:    outcome
```
                                                         win the    win      probability
```
```
                                                          series   game 1
```
```
                     W                      WW                                1=3
```
```
                         2=3
```
```
                             W             WLW                               1=18
```
```
                         1=3   1=3
```
```
        W            L
```
```
            1=2                    2=3
```
```
                               L           WLL                                 1=9
```
```

                               W           LWW                                 1=9
```
```
            1=2                    2=3
```
```
        L            W
```
```
                         1=3 L 1=3
```
```
                                           LWL                                 1=18
```
```
                         2=3
```
```
                     L                      LL                                  1=3
```

**Figure 1 The tree diagram for computing the probability that the local team**
wins two out of three games given that they won the first game.

Step 1: Find the Sample Space
Each internal vertex in the tree diagram has two children, one corresponding to a
win for the local team (labeled W ) and one corresponding to a loss (labeled L).
The complete sample space is:
```
                   S D fW W; W LW; W LL; LW W; LW L; LLg:
```
Step 2: Define Events of Interest
The event that the local team wins the whole tournament is:
```
                              T D fW W; W LW; LW W g:
```
And the event that the local team wins the first game is:
```
                               F D fW W; W LW; W LLg:
```
```
                

## 810 Chapter 18   Conditional Probability
```
```

           The outcomes in these events are indicated with check marks in the tree diagram in
```
```
           Figure 18.1.
```
```
           Step 3: Determine Outcome Probabilities
```
```
           Next, we must assign a probability to each outcome. We begin by labeling edges as
```
```
           specified in the problem statement. Specifically, the local team has a 1=2 chance of
```
```
           winning the first game, so the two edges leaving the root are each assigned probabil-
```
```
           ity 1=2. Other edges are labeled 1=3 or 2=3 based on the outcome of the preceding
```
```
           game. We then find the probability of each outcome by multiplying all probabilities
```
```
           along the corresponding root-to-leaf path. For example, the probability of outcome
```
```
           W LL is:
```
```
                                              1 1 2       1
```
```
                                                  D :
```
```
                                              2 3 3       9
```
```
           Step 4: Compute Event Probabilities
```
```
           We can now compute the probability that the local team wins the tournament, given
```
```
           that they win the first game:
```
```
                                             PrŒA \ B
```
```
                                   Pr A j B D
```
```
                                                 PrŒB
```
```
                                                  PrŒfW W; W LW g
```
```
                                             D
```
```
                                               PrŒfW W; W LW; W LLg
```
```
                                                   1=3 C 1=18
```
```
                                             D
```
```
                                               1=3 C 1=18 C 1=9
```
```
                                               7
```
```
                                             D :
```
```
                                               9
```
```
           We’re done! If the local team wins the first game, then they win the whole tourna-
```
```
           ment with probability 7=9.
```

### 18.4 Why Tree Diagrams Work
```
           We’ve now settled into a routine of solving probability problems using tree dia-
```
```
           grams, but we have not really explained why they work. The explanation is that the
```
```
           probabilities that we’ve been recording on the edges of tree diagrams are actually
```
```
           conditional probabilities.
```
```
             For example, look at the uppermost path in the tree diagram for the hockey team
```
```
           problem, which corresponds to the outcome W W . The first edge is labeled 1=2,
```
```
           which is the probability that the local team wins the first game. The second edge
```
```
     

18.4. Why Tree Diagrams Work                                                     811
```

is labeled 2=3, which is the probability that the local team wins the second game,
given that they won the first—a conditional probability! More generally, on each
edge of a tree diagram, we record the probability that the experiment proceeds
along that path, given that it reaches the parent vertex.
   So we’ve been using conditional probabilities all along. For example, we con-
cluded that:
```
                                            1 2       1
```
```
                                PrŒW W  D  D :
```
```
                                            2 3       3
```
Why is this correct?
   The answer goes back to Definition 18.2.1 of conditional probability which could
be written in a form called the Product Rule for conditional probabilities:

Rule (Conditional Probability Product Rule: 2 Events).
```
                                                       
```
```
                     PrŒE1 \ E2  D PrŒE1   Pr E2 j E1 :
```
```

   Multiplying edge probabilities in a tree diagram amounts to evaluating the right
```
side of this equation. For example:
```

      PrŒwin first game \ win second game
```
```
                                                                        
```
```
               D PrŒwin first game  Pr win second game j win first game
```
```
                   1 2
```
```
               D     :
```
```
                   2 3
```
So the Conditional Probability Product Rule is the formal justification for multiply-
ing edge probabilities to get outcome probabilities.
   To justify multiplying edge probabilities along a path of length three, we need a
rule for three events:

Rule (Conditional Probability Product Rule: 3 Events).
```
                                                              
```
```
       PrŒE1 \ E2 \ E3  D PrŒE1   Pr E2 j E1  Pr E3 j E1 \ E2 :
```
```

   An n-event version of the Rule is given in Problem 18.1, but its form should be
```
clear from the three event version.

#### 18.4.1 Probability of Size-k Subsets
As a simple application of the product rule for conditional probabilities, we can use
the rule to calculate the number ofsize-k subsets of the integers Œ1::n. Of course
we already know this number is kn , but now the rule will give us a new derivation
of the formula for kn .
```
           

## 812 Chapter 18    Conditional Probability
```
```

         Let’s pick some size-k subset S  Œ1::n as a target. Suppose we choose a size-k
```
```
      subset at random, with all subsets of Œ1::n equally likely to be chosen, and let p be
```
```
      the probability that our randomly chosen equals this target. That is, the probability
```
```
      of picking S is p, and since all sets are equally likely to be chosen, the number of
```
```
      size-k subsets equals 1=p.
```
```
         So what’s p? Well, the probability that the smallest number in the random set
```
```
      is one of the k numbers in S is k=n. Then, given that the smallest number in the
```
```
      random set is in S , the probability that the second smallest number in the random
```
```
      set is one of the remaining k 1 elements in S is .k 1/=.n 1/. So by the product
```
```
      rule, the probability that the two smallest numbers in the random set are both in S
```
```
      is
```
```
                                            k k 1
```
```
                                                     :
```
```
                                            n n 1
```
```
      Next, given that the two smallest numbers in the random set are in S, the probability
```
```
      that the third smallest number is one of the k 2 remaining elements in S is .k
```
```
      2/=.n 2/. So by the product rule, the probability that the three smallest numbers
```
```
      in the random set are all in S is
```
```
                                              k k   1 k     2
```
```
                                                            :
```
```
                                              n n   1 n     2
```
```
      Continuing in this way, it follows that the probability that all k elements in the
```
```
      randomly chosen set are in S , that is, the probabilty that the randomly chosen set
```
```
      equals the target, is
```
```
                                    k k    1 k 2        k .k 1/
```
```
                              pD                  
```
```
                                    n n    1 n 2        n .k 1/
```
```
                                         k  .k 1/  .k 1/    1
```
```
                                D
```
```
                                  n  .n 1/  .n 2/    .n .k 1//
```
```
                                        kŠ
```
```
                                D
```
```
                                  nŠ=.n k/Š
```
```
                                  kŠ.n k/Š
```
```
                                D               :
```
```
                                       nŠ
```
```
      So we have again shown the number of size-k subsets of Œ1::n, namely 1=p, is
```
```
                                                   nŠ
```
```
                                                        :
```
```
                                               kŠ.n k/Š
```
```

      18.4.2       Medical Testing
```
```
      Breast cancer is a deadly disease that claims thousands of lives every year. Early
```
```
      detection and accurate diagnosis are high priorities, and routine mammograms are
```
```
      

18.4. Why Tree Diagrams Work                                                                   813
```

one of the first lines of defense. They’re not very accurate as far as medical tests go,
but they are correct between 90% and 95% of the time, which seems pretty good
for a relatively inexpensive non-invasive test.1 However, mammogram results are
also an example of conditional probabilities having counterintuitive consequences.
If the test was positive for breast cancer in you or a loved one, and the test is better
than 90% accurate, you’d naturally expect that to mean there is better than 90%
chance that the disease was present. But a mathematical analysis belies that naive
intuitive expectation. Let’s start by precisely defining how accurate a mammogram
is:
```

     If you have the condition, there is a 10% chance that the test will say you do
```
```
      not have it. This is called a “false negative.”
```
```

     If you do not have the condition, there is a 5% chance that the test will say
```
```
      you do. This is a “false positive.”
```

#### 18.4.3 Four Steps Again
Now suppose that we are testing middle-aged women with no family history of
cancer. Among this cohort, incidence of breast cancer rounds up to about 1%.
Step 2: Define Events of Interest
Let A be the event that the person has breast cancer. Let B be the event that the
test was positive.
```
                 The outcomes
```
```
                               in each event are marked in the tree diagram. We
```
want to find Pr A j B , the probability that a person has breast cancer, given that
the test was positive.
Step 3: Find Outcome Probabilities
First, we assign probabilities to edges. These probabilities are drawn directly from
the problem statement. By the Product Rule, the probability of an outcome is the
product of the probabilities on the corresponding root-to-leaf path. All probabilities
are shown in Figure 18.2.
Step 4: Compute Event Probabilities
From Definition 18.2.1, we have
```
                        PrŒA \ B        0:009
```
```
               Pr A j B D           D                 15:4%:
```
```
                            PrŒB     0:009 C 0:0495
```
So, if the test is positive, then there is an 84.6% chance that the result is incorrect,
even though the test is nearly 95% accurate! So this seemingly pretty accurate
   1 The statistics in this example are roughly based on actual medical data, but have been altered

somewhat to simplify the calculations.
```
           

## 814 Chapter 18    Conditional Probability
```
```

      Step 1: Find the Sample Space
```
```
                   The sample space is found with the tree diagram in Figure 18.2.
```
```

                       Figure 18.2 The tree diagram for a breast cancer test.
```
```
     

18.4. Why Tree Diagrams Work                                                      815
```

test doesn’t tell us much. To see why percent accuracy is no guarantee of value,
notice that there is a simple way to make a test that is 99% accurate: always return
a negative result! This test gives the right answer for all healthy people and the
wrong answer only for the 1% that actually have cancer. This 99% accurate test
tells us nothing; the “less accurate” mammogram is still a lot more useful.

#### 18.4.4 Natural Frequencies
That there is only about a 15% chance that the patient actually has the condition
when the test say so may seem surprising at first, but it makes sense with a little
thought. There are two ways the patient could test positive: first, the patient could
have the condition and the test could be correct; second, the patient could be healthy
and the test incorrect. But almost everyone is healthy! The number of healthy
individuals is so large that even the mere 5% with false positive results overwhelm
the number of genuinely positive results from the truly ill.
   Thinking like this in terms of these “natural frequencies” can be a useful tool for
interpreting some of the strange seeming results coming from those formulas. For
example, let’s take a closer look at the mammogram example.
   Imagine 10,000 women in our demographic. Based on the frequency of the
disease, we’d expect 100 of them to have breast cancer. Of those, 90 would have
a positive result. The remaining 9,900 woman are healthy, but 5% of them—500,
give or take—will show a false positive on the mammogram. That gives us 90
real positives out of a little fewer than 600 positives. An 85% error rate isn’t so
surprising after all.

#### 18.4.5 A Posteriori Probabilities
If you think about it much, the medical testing problem we just considered could
start to trouble you. You may wonder if a statement like “If someone tested positive,
then that person has the condition with probability 18%” makes sense, since a given
person being tested either has the disease or they don’t.
   One way to understand such a statement is that it just means that 15% of the
people who test positive will actually have the condition. Any particular person has
it or they don’t, but a randomly selected person among those who test positive will
have the condition with probability 15%.
   But what does this 15% probability tell you if you personally got a positive
result? Should you be relieved that there is less than one chance in five that you
have the disease? Should you worry that there is nearly one chance in five that you
do have the disease? Should you start treatment just in case? Should you get more
tests?
   These are crucial practical questions, but it is important to understand that they
```
           

## 816 Chapter 18   Conditional Probability
```
```

      are not mathematical questions. Rather, these are questions about statistical judge-
```
```
      ments and the philosophical meaning of probability. We’ll say a bit more about this
```
```
      after looking at one more example of after-the-fact probabilities.
```
```

      The Hockey Team in Reverse
```
```
      Suppose that we turn the hockey question around: what is the probability that the
```
```
      local C-league hockey team won their first game, given that they won the series?
```
```
         As we discussed earlier, some people find this question absurd. If the team has
```
```
      already won the tournament, then the first game is long since over. Who won the
```
```
      first game is a question of fact, not of probability. However, our mathematical
```
```
      theory of probability contains no notion of one event preceding another. There
```
```
      is no notion of time at all. Therefore, from a mathematical perspective, this is a
```
```
      perfectly valid question. And this is also a meaningful question from a practical
```
```
      perspective. Suppose that you’re told that the local team won the series, but not
```
```
      told the results of individual games. Then, from your perspective, it makes perfect
```
```
      sense to wonder how likely it isthat local
```
```
                                               team won the first game.
```
```
         A conditional probability Pr B j A is called a posteriori if event B precedes
```
```
      event A in time. Here are some other examples of a posteriori probabilities:
```
```
           The probability it was cloudy this morning, given that it rained in the after-
```
```
            noon.
```
```
           The probability that I was initially dealt two queens in Texas No Limit Hold
```
```
            ’Em poker, given that I eventually got four-of-a-kind.
```
```
      from ordinary probabilities; the distinction comes from our view of causality, which
```
```
      is a philosophical question rather than a mathematical one.
```
```
         Let’s return to the original problem. The probability
```
```
                                                              that the local team won their
```
```
      first game, given that they won the series is Pr B j A . We can compute this using
```
```
      the definition of conditional probability and the tree diagram in Figure 18.1:
```
```
                                    PrŒB \ A        1=3 C 1=18            7
```
```
                     Pr B j A D                  D                        D :
```
```
                                        PrŒA       1=3 C 1=18 C 1=9         9
```
```
        In general, such pairs of probabilities are related by Bayes’ Rule:
```
```
      Theorem 18.4.1 (Bayes’ Rule).
```
```
                                                    
```
```
                                           Pr A j B  PrŒB
```
```
                                  Pr B j A D                                          (18.2)
```
```
                                                  PrŒA
```
```
      Proof. We have
```
```
                                                          
```
```
                      Pr B j A  PrŒA D PrŒA \ B D Pr A j B  PrŒB
```
```
      by definition of conditional probability. Dividing by PrŒA gives (18.2).           
```
```
     

18.4. Why Tree Diagrams Work                                                      817
```

#### 18.4.6 Philosphy of Probability
Let’s try to assign a probability to the event
```

                          Œ26972607    1 is a prime number
```

It’s not obvious how to check whether such a large number is prime, so you might
try an estimation based on the density of primes. The Prime Number Theorem
implies that only about 1 in 5 million numbers in this range are prime, so you might
say that the probability is about 2  10 8 . On the other hand, given that we chose
this example to make some philosophical point, you might guess that we probably
purposely chose an obscure looking prime number, and you might be willing to
make an even money bet that the number is prime. In other words, you might think
the probability is 1/2. Finally, we can take the position that assigning a probability
to this statement is nonsense because there is no randomness involved; the number
is either prime or it isn’t. This is the view we take in this text.
   An alternate view is the Bayesian approach, in which a probability is interpreted
as a degree of belief in a proposition. A Bayesian would agree that the number
above is either prime or composite, but they would be perfectly willing to assign a
probability to each possibility. The Bayesian approach is very broad in its willing-
ness to assign probabilities to any event, but the problem is that there is no single
“right” probability for an event, since the probability depends on one’s initial be-
liefs. On the other hand, if you have confidence in some set of initial beliefs, then
Bayesianism provides a convincing framework for updating your beliefs as further
information emerges.
   As an aside, it is not clear whether Bayes himself was Bayesian in this sense.
However, a Bayesian would be willing to talk about the probability that Bayes was
Bayesian.
   Another school of thought says that probabilities can only be meaningfully ap-
plied to repeatable processes like rolling dice or flipping coins. In this frequen-
tist view, the probability of an event represents the fraction of trials in which the
event occurred. So we can make sense of the a posteriori probabilities of the C-
league hockey example of Section 18.4.5 by imagining that many hockey series
were played, and the probability that the local team won their first game, given that
they won the series, is simply the fraction of series where they won the first game
among all the series they won.
   Getting back to prime numbers, we mentioned in Section 9.5.1 that there is a
probabilistic primality test. If a number N is composite, there is at least a 3=4
chance that the test will discover this. In the remaining 1=4 of the time, the test is
inconclusive. But as long as the result is inconclusive, the test can be run indepen-
dently again and again up to, say, 100 times. So if N actually is composite, then
```
                 

## 818 Chapter 18   Conditional Probability
```
```

            the probability that 100 repetitions of the probabilistic test do not discover this is at
```
```
            most:                                  100
```
```
                                                     1
```
```
                                                            :
```
```
                                                     4
```
```
            If the test remained inconclusive after 100 repetitions, it is still logically possible
```
```
            that N is composite, but betting that N is prime would be the best bet you’ll ever get
```
```
            to make! If you’re comfortable using probability to describe your personal belief
```
```
            about primality after such an experiment, you are being a Bayesian. A frequentist
```
```
            would not assign a probability to N ’s primality, but they would also be happy to
```
```
            bet on primality with tremendous confidence. We’ll examine this issue again when
```
```
            we discuss polling and confidence levels in Section 18.9.
```
```
               Despite the philosophical divide, the real world conclusions Bayesians and Fre-
```
```
            quentists reach from probabilities are pretty much the same, and even where their
```
```
            interpretations differ, they use the same theory of probability.
```

### 18.5 The Law of Total Probability
```
            Breaking a probability calculation into cases simplifies many problems. The idea
```
```
            is to calculate the probability of an event A by splitting into two cases based on
```
```
            whether or not another event E occurs. That is, calculate the probability of A \ E
```
```
            and A \ E. By the Sum Rule, the sum of these probabilities equals PrŒA. Express-
```
```
            ing the intersection probabilities as conditional probabilities yields:
```
```

            Rule 18.5.1 (Law of Total Probability: single event).
```
```
                                                            ˇ 
```
```
                           PrŒA D Pr A j E  PrŒE C Pr A ˇ E  PrŒE:
```
```

               For example, suppose we conduct the following experiment. First, we flip a fair
```
```
            coin. If heads comes up, then we roll one die and take the result. If tails comes up,
```
```
            then we roll two dice and take the sum of the two results. What is the probability
```
```
            that this process yields a 2? Let E be the event that the coin comes up heads,
```
```
            and let A be the event that we get a 2 overall. Assuming that the coin is fair,
```
```
            PrŒE D PrŒE D 1=2. There are now two cases.       If we flip heads, then we roll
```
```
            a 2 on a single die with probability Pr A j E D 1=6. On the other hand, if we
```
```
                                                                               ˇ 
```
```
            flip tails, then we get a sum of 2 on two dice with probability Pr A ˇ E D 1=36.
```
```
            Therefore, the probability that the whole process yields a 2 is
```
```
                                                   1 1 1 1    7
```
```
                                         PrŒA D     C    D :
```
```
                                                   2 6 2 36  72
```
```
       

18.5. The Law of Total Probability                                                              819
```

  This rule extends to any set of disjoint events that make up the entire sample
space. For example,
Rule (Law of Total Probability: 3-events). If E1 ; E2 and E3 are disjoint, and
PrŒE1 [ E2 [ E3  D 1, then
```
                                                            
```
  PrŒA D Pr A j E1  PrŒE1  C Pr A j E2  PrŒE2  C Pr A j E3  PrŒE3  :
   This in turn leads to a three-event version of Bayes’ Rule in which the probability
of event E1 given A is calculated from the “inverse” conditional probabilities of A
given E1 , E2 , and E3 :
Rule (Bayes’ Rule: 3-events).
```
                                                 
```
                                       Pr A j E1  PrŒE1 
Pr E1 j A D                                                        
```
                   Pr A j E1  PrŒE1  C Pr A j E2  PrŒE2  C Pr A j E3  PrŒE3 
```
  The generalization of these rules to n disjoint events is a routine exercise (Prob-
lems 18.3 and 18.4).

#### 18.5.1 Conditioning on a Single Event
The probability rules that we derived in Section 17.5.2 extend to probabilities con-
ditioned on the same event. For example, the Inclusion-Exclusion formula for two
sets holds when all probabilities are conditioned on an event C :
```
                                                                 
```
```
         Pr A [ B j C D Pr A j C C Pr B j C               Pr A \ B j C :
```
This is easy to verify by plugging in the Definition 18.2.1 of conditional probabil-
ity.2
   It is important not to mix up events before and after the conditioning bar. For
example, the following is not a valid identity:
False Claim.
```
                                                                      
```
```
      Pr A j B [ C D Pr A j B C Pr A j C                         Pr A j B \ C :             (18.3)
```
  A simple counter-example is to let B and C be events over a uniform   spacewith
most
    of their
```
             outcomes in A, but not overlapping. This ensures that Pr  A j B and
```
Pr A j C are both close to 1. For example,
```
                                     B WWD Œ0::9;
```
```
                                     C WWD Œ10::18 [ f0g;
```
```
                                     A WWD Œ1::18;
```
   2 Problem 18.14 explains why this and similar conditional identities follow on general principles

from the corresponding unconditional identities.
```
                 

## 820 Chapter 18   Conditional Probability
```
```

           so
```
```
                                                 9            
```
```
                                     Pr A j B D      D Pr A j C :
```
```
                                                  10
```
```
           Also, since 0 is the only outcome in B \ C and 0 … A, we have
```
```
                                                       
```
```
                                          Pr A j B \ C D 0
```
```

           So the right-hand side of (18.3) is 1.8, while the left-hand side is a probability
```
```
           which can be at most 1—actually, it is 18/19.
```

### 18.6 Simpson’s Paradox
```
           In 1973, a famous university was investigated for gender discrimination [7]. The
```
```
           investigation was prompted by evidence that, at first glance, appeared definitive: in
```
```
           1973, 44% of male applicants to the school’s graduate programs were accepted, but
```
```
           only 35% of female applicants were admitted.
```
```
              However, this data turned out to be completely misleading. Analysis of the in-
```
```
           dividual departments, showed not only that few showed significant evidence of
```
```
           bias, but also that among the few departments that did show statistical irregulari-
```
```
           ties, most were slanted in favor of women. This suggests that if there was any sex
```
```
           discrimination, then it was against men!
```
```
              Given the discrepancy in these findings, it feels like someone must be doing bad
```
```
           math—intentionally or otherwise. But the numbers are not actually inconsistent.
```
```
           In fact, this statistical hiccup is common enough to merit its own name: Simpson’s
```
```
           Paradox occurs when multiple small groups of data all exhibit a similar trend, but
```
```
           that trend reverses when those groups are aggregated. To explain how this is pos-
```
```
           sible, let’s first clarify the problem by expressing both arguments in terms of con-
```
```
           ditional probabilities. For simplicity, suppose that there are only two departments
```
```
           EE and CS. Consider the experiment where we pick a random candidate. Define
```
```
           the following events:
```
```

                 AWWD the candidate is admitted to his or her program of choice,
```
```

                 FEE WWD the candidate is a woman applying to the EE department,
```
```

                 FCS WWD the candidate is a woman applying to the CS department,
```
```

                 MEE WWD the candidate is a man applying to the EE department,
```
```

                 MCS WWD the candidate is a man applying to the CS department.
```
```
      

18.6. Simpson’s Paradox                                                                           821
```
```

    CS               2 men admitted out of 5 candidates                40%
```
```
              50 women admitted out of 100 candidates                  50%
```
```
    EE           70 men admitted out of 100 candidates                 70%
```
```
                  4 women admitted out of 5 candidates                 80%
```
 Overall               72 men admitted, 105 candidates                69%
```
                    54 women admitted, 105 candidates                 51%
```

**Table 1 Hypothetical admission statistics where men are overall more to be**
admitted, but are less likely to be admitted into each department.

Assume that all candidates are either men or women, and that no candidate belongs
to both departments. That is, the events FEE , FCS , MEE and MCS are all disjoint.
   In these terms, the plaintiff’s assertion—that a male candidate is more likely to
be admitted to the university than a female—can be expressed by the following
inequality:                                                   
```
                 Pr A j MEE [ MCS > Pr A j FEE [ FCS :
```
   The university’s retort that in any given department, a male applicant is less
likely to be admitted than a female can be expressed by a pair of inequalities:
```
                                                  
```
```
                       Pr A j MEE < Pr A j FEE           and
```
```
                                                  
```
```
                       Pr A j MCS < Pr A j FCS :
```
```

   We can explain how there could be such a discrepancy between university-wide
```
and department-by-department admission statistics by supposing that the CS de-
partment is more selective than the EE department, but CS attracts a far larger
number of woman applicants than EE.3 . Table 18.1 shows some admission statis-
tics contrived to highlight how the inequalities asserted by both the plaintiff and the
university could both hold.
   Initially, we and the plaintiffs both assumed that the overall admissions statistics
for the university could only be explained by gender discrimination. The depart-
ment by department statistics seems to belie the accusation of discrimination. But
do they really?
   Suppose we replaced “the candidate is a man/woman applying to the EE depart-
ment,” by “the candidate is a man/woman for whom an admissions decision was
made during an odd-numbered day of the month,” and likewise with CS and an
even-numbered day of the month. Since we don’t think the parity of a date is a
   3 At the actual university in the lawsuit, the “exclusive” departments more popular among women

were those that did not require a mathematical foundation, such as English and education. Women’s
disproportionate choice of these careers reflects gender bias, but one which predates the university’s
involvement.
```
                 

## 822 Chapter 18   Conditional Probability
```
```

           cause for the outcome of an admission decision, we would most likely dismiss the
```
```
           “coincidence” that on both odd and even dates, women are more frequently admit-
```
```
           ted. Instead we would judge, based on the overall data showing women less likely
```
```
           to be admitted, that gender bias against women was an issue in the university.
```
```
              Bear in mind that it would be the same numerical data that we would be using
```
```
           to justify our different conclusions in the department-by-department case and the
```
```
           even-day-odd-day case. We interpreted the same numbers differently based on our
```
```
           implicit causal beliefs, specifically that departments matter and date parity does
```
```
           not. It is circular to claim that the data corroborated our beliefs that there is or
```
```
           is not discrimination. Rather, our interpretation of the data correlation depended
```
```
           on our beliefs about the causes of admission in the first place.4 This example high-
```
```
           lights a basic principle in statistics that people constantly ignore: never assume that
```
```
           correlation implies causation.
```

### 18.7 Independence
```
           Suppose that we flip two fair coins simultaneously on opposite sides of a room.
```
```
           Intuitively, the way one coin lands does not affect the way the other coin lands.
```
```
           The mathematical concept that captures this intuition is called independence.
```
```

           Definition 18.7.1. An event with probability 0 is defined to be independent of every
```
```
           event (including itself). If PrŒB ¤ 0, then event A is independent of event B iff
```
```
                                                     
```
```
                                            Pr A j B D PrŒA:                            (18.4)
```
```

              In other words, A and B are independent if knowing that B happens does not al-
```
```
           ter the probability that A happens, as is the case with flipping two coins on opposite
```
```
           sides of a room.
```
```

           Potential Pitfall
```
```
           Students sometimes get the idea that disjoint events are independent. The opposite
```
```
           is true: if A \ B D ;, then knowing that A happens means you know that B
```
```
           does not happen. Disjoint events are never independent—unless one of them has
```
```
           probability zero.
```
```
              4 These issues are thoughtfully examined in Causality: Models, Reasoning and Inference, Judea
```
```

           Pearl, Cambridge U. Press, 2001.
```
```
     

18.7. Independence                                                                823
```

#### 18.7.1 Alternative Formulation
Sometimes it is useful to express independence in an alternate form which follows
immediately from Definition 18.7.1:

Theorem 18.7.2. A is independent of B if and only if
```

                             PrŒA \ B D PrŒA  PrŒB:                        (18.5)
```

  Notice that Theorem 18.7.2 makes apparent the symmetry between A being in-
dependent of B and B being independent of A:

Corollary 18.7.3. A is independent of B iff B is independent of A.

#### 18.7.2 Independence Is an Assumption
Generally, independence is something that you assume in modeling a phenomenon.
For example, consider the experiment of flipping two fair coins. Let A be the event
that the first coin comes up heads, and let B be the event that the second coin is
heads. If we assume that A and B are independent, then the probability that both
coins come up heads is:
```
                                                     1 1 1
```
```
                     PrŒA \ B D PrŒA  PrŒB D       D :
```
```
                                                     2 2 4
```
   In this example, the assumption of independence is reasonable. The result of one
coin toss should have negligible impact on the outcome of the other coin toss. And
if we were to repeat the experiment many times, we would be likely to have A \ B
about 1/4 of the time.
   On the other hand, there are many examples of events where assuming indepen-
dence isn’t justified. For example, an hourly weather forecast for a clear day might
list a 10% chance of rain every hour from noon to midnight, meaning each hour has
a 90% chance of being dry. But that does not imply that the odds of a rainless day
are a mere 0:912  0:28. In reality, if it doesn’t rain as of 5pm, the odds are higher
than 90% that it will stay dry at 6pm as well—and if it starts pouring at 5pm, the
chances are much higher than 10% that it will still be rainy an hour later.
   Deciding when to assume that events are independent is a tricky business. In
practice, there are strong motivations to assume independence since many useful
formulas—such as equation (18.5)—only hold if the events are independent. But
you need to be careful: we’ll describe several famous examples where mistaken
assumptions of independence led to trouble. This problem gets even trickier when
there are more than two events in play.
```
                

## 824 Chapter 18    Conditional Probability
```

### 18.8 Mutual Independence
```
           We have defined what it means for two events to be independent. What if there are
```
```
           more than two events? For example, how can we say that the flips of n coins are
```
```
           all independent of one another? A set of events is said to be mutually independent
```
```
           if the probability of each event in the set is the same no matter which of the other
```
```
           events has occurred. This is equivalent to saying that for any selection of two or
```
```
           more of the events, the probability that all the selected events occur equals the
```
```
           product of the probabilities of the selected events.
```
```
              For example, four events E1 ; E2 ; E3 ; E4 are mutually independent if and only if
```
```
           all of the following equations hold:
```
```
                                      PrŒE1 \ E2  D PrŒE1   PrŒE2 
```
```
                                      PrŒE1 \ E3  D PrŒE1   PrŒE3 
```
```
                                      PrŒE1 \ E4  D PrŒE1   PrŒE4 
```
```
                                      PrŒE2 \ E3  D PrŒE2   PrŒE3 
```
```
                                      PrŒE2 \ E4  D PrŒE2   PrŒE4 
```
```
                                      PrŒE3 \ E4  D PrŒE3   PrŒE4 
```
```
                               PrŒE1 \ E2 \ E3  D PrŒE1   PrŒE2   PrŒE3 
```
```
                               PrŒE1 \ E2 \ E4  D PrŒE1   PrŒE2   PrŒE4 
```
```
                               PrŒE1 \ E3 \ E4  D PrŒE1   PrŒE3   PrŒE4 
```
```
                               PrŒE2 \ E3 \ E4  D PrŒE2   PrŒE3   PrŒE4 
```
```
                         PrŒE1 \ E2 \ E3 \ E4  D PrŒE1   PrŒE2   PrŒE3   PrŒE4 
```
```
             The generalization to mutual independence of n events should now be clear.
```
```

           18.8.1       DNA Testing
```
```
           Assumptions about independence are routinely made in practice. Frequently, such
```
```
           assumptions are quite reasonable. Sometimes, however, the reasonableness of an
```
```
           independence assumption is not so clear, and the consequences of a faulty assump-
```
```
           tion can be severe.
```
```
              Let’s return to the O. J. Simpson murder trial. The following expert testimony
```
```
           was given on May 15, 1995:
```
```
           Mr. Clarke: When you make these estimations of frequency—and I believe you
```
```
                touched a little bit on a concept called independence?
```
```
           Dr. Cotton: Yes, I did.
```
```
     

18.8. Mutual Independence                                                      825
```

Mr. Clarke: And what is that again?

Dr. Cotton: It means whether or not you inherit one allele that you have is not—
```
     does not affect the second allele that you might get. That is, if you inherit
```
```
     a band at 5,000 base pairs, that doesn’t mean you’ll automatically or with
```
```
     some probability inherit one at 6,000. What you inherit from one parent is
```
```
     [independent of] what you inherit from the other.
```

Mr. Clarke: Why is that important?

Dr. Cotton: Mathematically that’s important because if that were not the case, it
```
     would be improper to multiply the frequencies between the different genetic
```
```
     locations.
```

Mr. Clarke: How do you—well, first of all, are these markers independent that
```
     you’ve described in your testing in this case?
```
   Presumably, this dialogue was as confusing to you as it was for the jury. Es-
sentially, the jury was told that genetic markers in blood found at the crime scene
matched Simpson’s. Furthermore, they were told that the probability that the mark-
ers would be found in a randomly-selected person was at most 1 in 170 million.
This astronomical figure was derived from statistics such as:
```
     1 person in 100 has marker A.
```
```

     1 person in 50 marker B.
```
```

     1 person in 40 has marker C .
```
```

     1 person in 5 has marker D.
```
```

     1 person in 170 has marker E.
```
Then these numbers were multiplied to give the probability that a randomly-selected
person would have all five markers:
```

      PrŒA \ B \ C \ D \ E D PrŒA  PrŒB  PrŒC   PrŒD  PrŒE
```
```
                               1      1 1 1 1                     1
```
```
                            D                        D             :
```
```
                              100 50 40 5 170              170;000;000
```
  The defense pointed out that this assumes that the markers appear mutually in-
dependently. Furthermore, all the statistics were based on just a few hundred blood
samples.
  After the trial, the jury was widely mocked for failing to “understand” the DNA
evidence. If you were a juror, would you accept the 1 in 170 million calculation?
```
           

## 826 Chapter 18    Conditional Probability
```
```

      18.8.2       Pairwise Independence
```
```
      The definition of mutual independence seems awfully complicated—there are so
```
```
      many selections of events to consider! Here’s an example that illustrates the sub-
```
```
      tlety of independence when more than two events are involved. Suppose that we
```
```
      flip three fair, mutually-independent coins. Define the following events:
```
```
           A1 is the event that coin 1 matches coin 2.
```
```
           A2 is the event that coin 2 matches coin 3.
```
```
           A3 is the event that coin 3 matches coin 1.
```
```
      Are A1 , A2 , A3 mutually independent?
```
```
        The sample space for this experiment is:
```
```
                   fHHH; HH T; H TH; H T T; THH; TH T; T TH; T T T g:
```
```
      Every outcome has probability .1=2/3 D 1=8 by our assumption that the coins are
```
```
      mutually independent.
```
```
        To see if events A1 , A2 and A3 are mutually independent, we must check a
```
```
      sequence of equalities. It will be helpful first to compute the probability of each
```
```
      event Ai :
```
```
                    PrŒA1  D PrŒHHH  C PrŒHH T  C PrŒT TH  C PrŒT T T 
```
```
                             1 1 1 1           1
```
```
                            D  C C C D :
```
```
                             8 8 8 8           2
```
```
      By symmetry, PrŒA2  D PrŒA3  D 1=2 as well. Now we can begin checking all the
```
```
      equalities required for mutual independence:
```
```
                                                            1 1 1 1 1
```
```
                   PrŒA1 \ A2  D PrŒHHH  C PrŒT T T  D    C D D 
```
```
                                                            8 8 4 2 2
```
```
                                 D PrŒA1  PrŒA2 :
```
```
       By symmetry, PrŒA1 \ A3  D PrŒA1   PrŒA3  and PrŒA2 \ A3  D PrŒA2   PrŒA3 
```
```
      must hold also. Finally, we must check one last condition:
```
```

                                                                  1 1  1
```
```
                    PrŒA1 \ A2 \ A3  D PrŒHHH  C PrŒT T T  D    C D
```
```
                                                                  8 8  4
```
```
                                        1
```
```
                                      ¤ D PrŒA1  PrŒA2  PrŒA3 :
```
```
                                        8
```
```
         The three events A1 , A2 and A3 are not mutually independent even though any
```
```
      two of them are independent! This not-quite mutual independence seems weird at
```
```
      first, but it happens. It even generalizes:
```
```
     

18.8. Mutual Independence                                                          827
```

Definition 18.8.1. A set A1 , A2 , . . . , of events is k-way independent iff every set
of k of these events is mutually independent. The set is pairwise independent iff it
is 2-way independent.
```

   So the events A1 , A2 , A3 above are pairwise independent, but not mutually inde-
```
pendent. Pairwise independence is a much weaker property than mutual indepen-
dence.
   For example, suppose that the prosecutors in the O. J. Simpson trial were wrong
and markers A, B, C , D and E are only pairwise independently. Then the proba-
bility that a randomly-selected person has all five markers is no more than:
```

              PrŒA \ B \ C \ D \ E  PrŒA \ E D PrŒA  PrŒE
```
```
                                       1     1       1
```
```
                                    D          D         :
```
```
                                      100 170     17;000
```
The first line uses the fact that A \ B \ C \ D \ E is a subset of A \ E. (We picked
out the A and E markers because they’re the rarest.) We use pairwise independence
on the second line. Now the probability of a random match is 1 in 17,000—a far cry
from 1 in 170 million! And this is the strongest conclusion we can reach assuming
only pairwise independence.
   On the other hand, the 1 in 17,000 bound that we get by assuming pairwise
independence is a lot better than the bound that we would have if there were no
independence at all. For example, if the markers are dependent, then it is possible
that
```

      everyone with marker E has marker A,
```
```
      everyone with marker A has marker B,
```
```
      everyone with marker B has marker C , and
```
```
      everyone with marker C has marker D.
```

In such a scenario, the probability of a match is
```
                                               1
```
```
                                    PrŒE D       :
```
```
                                              170
```
   So a stronger independence assumption leads to a smaller bound on the prob-
ability of a match. The trick is to figure out what independence assumption is
reasonable. Assuming that the markers are mutually independent may well not be
reasonable unless you have examined hundreds of millions of blood samples. Oth-
erwise, how would you know that marker D does not show up more frequently
whenever the other four markers are simultaneously present?
```
                  

## 828 Chapter 18    Conditional Probability
```

### 18.9 Probability versus Confidence
```
            Let’s look at some other problems like the breast cancer test of Section 18.4.2, but
```
```
            this time we’ll use more extreme numbers to highlight some key issues.
```
```

            18.9.1       Testing for Tuberculosis
```
```
            Let’s suppose we have a really terrific diagnostic test for tuberculosis (TB): if you
```
```
            have TB, the test is guaranteed to detect it, and if you don’t have TB, then the test
```
```
            will report that correctly 99% of the time!
```
```
              In other words, let “TB” be the event that a person has TB, “pos” be the event
```
```
            that the person tests positive for TB, so “pos” is the event that they test negative.
```
```
            Now we can restate these guarantees in terms of conditional probabilities:
```
```
                                                       
```
```
                                            Pr pos j TB D 1;                               (18.6)
```
```
                                                   ˇ   
```
```
                                            Pr pos ˇ TB D 0:99:                            (18.7)
```
```

              This means that the test produces the correct result at least 99% of the time,
```
```
            regardless of whether or not the person has TB. A careful statistician would assert:5
```
```

            Lemma. You can be 99% confident that the test result is correct.
```
```

            Corollary 18.9.1. If you test positive, then
```
```

                   either you have TB or something very unlikely (probability 1/100) hap-
```
```
                   pened.
```
```

               Lemma 18.9.1 and Corollary 18.9.1 may seem to be saying that
```
```

            False Claim. If you test positive, then the probability that you have TB is 0:99.
```
```

              But this would be a mistake.
```
```
              To highlight the difference between confidence in the test diagnosis versus the
```
```
            probability of TB, let’s think about what to do if you test positive. Corollary 18.9.1
```
```
               5 Confidence is usually used to describe the probability that a statistical estimations of some quan-
```
```

            tity is correct (Section 20.4.3). We are trying to simplify the discussion by using this one concept to
```
```
            illustrate standard approaches to both hypothesis testing and estimation.
```
```
               In the context of hypothesis testing, statisticians would normally distinguish the “false positive”
```
```
            probability, in this case the probability 0.01 that a healthy person is incorrectly diagnosed as having
```
```
            TB, and call this the significance of the test. The “false negative” probability would be the probability
```
```
            that person with TB is incorrectly diagnosed as healthy; it is zero. The power of the test is one minus
```
```
            the false negative probability, so in this case the power is the highest possible, namely, one.
```