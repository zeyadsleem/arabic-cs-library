---
title: "State Machines"
lang: en
---

## 6 State Machines
```
            State machines are a simple, abstract model of step-by-step processes. Since com-
```
```
            puter programs can be understood as defining step-by-step computational processes,
```
```
            it’s not surprising that state machines come up regularly in computer science. They
```
```
            also come up in many other settings such as designing digital circuits and mod-
```
```
            eling probabilistic processes. This section introduces Floyd’s Invariant Principle
```
```
            which is a version of induction tailored specifically for proving properties of state
```
```
            machines.
```
```
               One of the most important uses of induction in computer science involves prov-
```
```
            ing one or more desirable properties continues to hold at every step in a process.
```
```
            A property that is preserved through a series of operations or steps is known as a
```
```
            preserved invariant.
```
```
               Examples of desirable invariants include properties such as the altitude of a plane
```
```
            remaining above 1,000 feet unless the wingflaps are deployed, or the temperature
```
```
            of a nuclear reactor remaining below the meltdown threshold.
```

### 6.1 States and Transitions
```
            Formally, a state machine is nothing more than a binary relation on a set, except
```
```
            that the elements of the set are called “states,” the relation is called the transition
```
```
            relation, and an arrow in the graph of the transition relation is called a transition.
```
```
            A transition from state q to state r will be written q ! r. The transition relation
```
```
            is also called the state graph of the machine. A state machine also comes equipped
```
```
            with a designated start state.
```
```
               A simple example is a bounded counter, which counts from 0 to 99 and overflows
```
```
            at 100. This state machine is pictured in Figure 6.1, with states pictured as circles,
```
```
            transitions by arrows, and with start state 0 indicated by the double circle. To be
```
```

                             start
```
```
                             state
```
```
                               0     1      2               99       overflow
```
```

                        Figure 6.1 State transitions for the 99-bounded counter.
```
```
                 

## 174 Chapter 6   State Machines
```
```

            precise, what the picture tells us is that this bounded counter machine has
```
```

                              states WWD f0; 1; : : : ; 99; overflowg;
```
```
                          start state WWD 0;
```
```
                         transitions WWD fn ! n C 1 j 0  n < 99g
```
```
                                         [ f99 ! overflow; overflow ! overflowg:
```
```

            This machine isn’t much use once it overflows, since it has no way to get out of its
```
```
            overflow state.
```
```
               State machines for digital circuits and string pattern matching algorithms, for in-
```
```
            stance, usually have only a finite number of states. Machines that model continuing
```
```
            computations typically have an infinite number of states. For example, instead of
```
```
            the 99-bounded counter, we could easily define an “unbounded” counter that just
```
```
            keeps counting up without overflowing. The unbounded counter has an infinite
```
```
            state set, the nonnegative integers, which makes its state diagram harder to draw.
```
```
               State machines are often defined with labels on states and/or transitions to indi-
```
```
            cate such things as input or output values, costs, capacities, or probabilities. Our
```
```
            state machines don’t include any such labels because they aren’t needed for our
```
```
            purposes. We do name states, as in Figure 6.1, so we can talk about them, but the
```
```
            names aren’t part of the state machine.
```

### 6.2 The Invariant Principle
```
            6.2.1   A Diagonally-Moving Robot
```
```
            Suppose we have a robot that starts at the origin and moves on an infinite 2-
```
```
            dimensional integer grid. The state of the robot at any time can be specified by
```
```
            the integer coordinates .x; y/ of the robot’s current position. So the start state
```
```
            is .0; 0/. At each step, the robot may move to a diagonally adjacent grid point, as
```
```
            illustrated in Figure 6.2.
```
```
               To be precise, the robot’s transitions are:
```
```

                                   f.m; n/ ! .m ˙ 1; n ˙ 1/ j m; n 2 Zg:
```
```

            For example, after the first step, the robot could be in states .1; 1/, .1; 1/, . 1; 1/
```
```
            or . 1; 1/. After two steps, there are 9 possible states for the robot, includ-
```
```
            ing .0; 0/. The question is, can the robot ever reach position .1; 0/?
```
```
              If you play around with the robot a bit, you’ll probably notice that the robot can
```
```
            only reach positions .m; n/ for which m C n is even, which of course means that it
```
```
      

6.2. The Invariant Principle                                                    175
```
```

           y
```
```

       2
```
```

       1
```
```

       0
```
```

                                                                           x
```
```
                   0             1            2             3
```
```

                       Figure 6.2 The Diagonally Moving Robot.
```

can’t reach .1; 0/. This follows because the evenness of the sum of the coordinates
is a property that is preserved by transitions. This is an example of a preserved
invariant.
   This once, let’s go through this preserved invariant argument, carefully high-
lighting where induction comes in. Specifically, define the even-sum property of
states to be:
```
                       Even-sum..m; n// WWD Œm C n is even:
```

Lemma 6.2.1. For any transition q ! r of the diagonally-moving robot, if Even-
sum(q), then Even-sum(r).
```

   This lemma follows immediately from the definition of the robot’s transitions:
```
.m; n/ ! .m ˙ 1; n ˙ 1/. After a transition, the sum of coordinates changes by
.˙1/ C .˙1/, that is, by 0, 2, or -2. Of course, adding 0, 2 or -2 to an even number
gives an even number. So by a trivial induction on the number of transitions, we
can prove:

Theorem 6.2.2. The sum of the coordinates of any state reachable by the diagonally-
moving robot is even.
```
           

## 176 Chapter 6    State Machines
```
```

               y
```
```

           2
```
```
                                                                        ‹‹
```
```

           1
```
```

           0
```
```
                                     goal
```
```

                                                                             x
```
```
                        0             1             2            3
```
```

                              Figure 6.3 Can the Robot get to .1; 0/?
```
```
      

6.2. The Invariant Principle                                                       177
```

Proof. The proof is induction on the number of transitions the robot has made. The
induction hypothesis is
```

        P .n/ WWD if q is a state reachable in n transitions, then Even-sum(q):
```

Base case: P .0/ is true since the only state reachable in 0 transitions is the start
state .0; 0/, and 0 C 0 is even.
Inductive step: Assume that P .n/ is true, and let r be any state reachable in n C 1
transitions. We need to prove that Even-sum(r) holds.
   Since r is reachable in n C 1 transitions, there must be a state q reachable in n
transitions such that q ! r. Since P .n/ is assumed to be true, Even-sum(q) holds,
and so by Lemma 6.2.1, Even-sum(r) also holds. This proves that P .n/ IMPLIES
P .n C 1/ as required, completing the proof of the inductive step.
   We conclude by induction that for all n  0, if q is reachable in n transitions, then
Even-sum(q). This implies that every reachable state has the Even-sum property.
```
                                                                                      
```

Corollary 6.2.3. The robot can never reach position .1; 0/.
Proof. By Theorem 6.2.2, we know the robot can only reach positions with coor-
dinates that sum to an even number, and thus it cannot reach position .1; 0/. 

#### 6.2.2 Statement of the Invariant Principle
Using the Even-sum invariant to understand the diagonally-moving robot is a sim-
ple example of a basic proof method called The Invariant Principle. The Principle
summarizes how induction on the number of steps to reach a state applies to invari-
ants.
  A state machine execution describes a possible sequence of steps a machine
might take.
Definition 6.2.4. An execution of the state machine is a (possibly infinite) sequence
of states with the property that
```
     it begins with the start state, and
```
```

     if q and r are consecutive states in the sequence, then q ! r.
```
A state is called reachable if it appears in some execution.
Definition 6.2.5. A preserved invariant of a state machine is a predicate P on
states, such that whenever P .q/ is true of a state q and q ! r for some state r
then P .r/ holds.
```
            

## 178 Chapter 6   State Machines
```
```

      The Invariant Principle
```
```
      If a preserved invariant of a state machine is true for the start state,
```
```
      then it is true for all reachable states.
```
```

         The Invariant Principle is nothing more than the Induction Principle reformulated
```
```
      in a convenient form for state machines. Showing that a predicate is true in the start
```
```
      state is the base case of the induction, and showing that a predicate is a preserved
```
```
      invariant corresponds to the inductive step.1
```
```
         1 Preserved invariants are commonly just called “invariants” in the literature on program correct-
```
```

      ness, but we decided to throw in the extra adjective to avoid confusion with other definitions. For
```
```
      example, other texts (as well as another subject at MIT) use “invariant” to mean “predicate true of
```
```
      all reachable states.” Let’s call this definition “invariant-2.” Now invariant-2 seems like a reason-
```
```
      able definition, since unreachable states by definition don’t matter, and all we want to show is that
```
```
      a desired property is invariant-2. But this confuses the objective of demonstrating that a property is
```
```
      invariant-2 with the method of finding a preserved invariant—which is preserved even at unreachable
```
```
      states—to show that it is invariant-2.
```
```
      

6.2. The Invariant Principle                                                    179
```

Robert W. Floyd
```

   The Invariant Principle was formulated by Robert W. Floyd at Carnegie Tech
```
in 1967. (Carnegie Tech was renamed Carnegie-Mellon University the following
year.) Floyd was already famous for work on the formal grammars that trans-
formed the field of programming language parsing; that was how he got to be
a professor even though he never got a Ph.D. (He had been admitted to a PhD
program as a teenage prodigy, but flunked out and never went back.)
   In that same year, Albert R. Meyer was appointed Assistant Professor in the
Carnegie Tech Computer Science Department, where he first met Floyd. Floyd
and Meyer were the only theoreticians in the department, and they were both de-
lighted to talk about their shared interests. After just a few conversations, Floyd’s
new junior colleague decided that Floyd was the smartest person he had ever met.
   Naturally, one of the first things Floyd wanted to tell Meyer about was his new,
as yet unpublished, Invariant Principle. Floyd explained the result to Meyer, and
Meyer wondered (privately) how someone as brilliant as Floyd could be excited
by such a trivial observation. Floyd had to show Meyer a bunch of examples be-
fore Meyer understood Floyd’s excitement —not at the truth of the utterly obvious
Invariant Principle, but rather at the insight that such a simple method could be so
widely and easily applied in verifying programs.
   Floyd left for Stanford the following year. He won the Turing award—the
“Nobel prize” of computer science—in the late 1970’s, in recognition of his work
on grammars and on the foundations of program verification. He remained at
Stanford from 1968 until his death in September, 2001. You can learn more about
Floyd’s life and work by reading the eulogy at
```

              http://oldwww.acm.org/pubs/membernet/stories/floyd.pdf
```

written by his closest colleague, Don Knuth.
```
           

## 180 Chapter 6   State Machines
```
```

      6.2.3   The Die Hard Example
```
```
      The movie Die Hard 3: With a Vengeance includes an amusing example of a state
```
```
      machine. The lead characters played by Samuel L. Jackson and Bruce Willis have
```
```
      to disarm a bomb planted by the diabolical Simon Gruber:
```
```

         Simon: On the fountain, there should be 2 jugs, do you see them? A 5-
```
```
          gallon and a 3-gallon. Fill one of the jugs with exactly 4 gallons of water
```
```
          and place it on the scale and the timer will stop. You must be precise;
```
```
          one ounce more or less will result in detonation. If you’re still alive in 5
```
```
          minutes, we’ll speak.
```
```
         Bruce: Wait, wait a second. I don’t get it. Do you get it?
```
```
         Samuel: No.
```
```
         Bruce: Get the jugs. Obviously, we can’t fill the 3-gallon jug with 4 gal-
```
```
          lons of water.
```
```
         Samuel: Obviously.
```
```
         Bruce: All right. I know, here we go. We fill the 3-gallon jug exactly to
```
```
          the top, right?
```
```
         Samuel: Uh-huh.
```
```
         Bruce: Okay, now we pour this 3 gallons into the 5-gallon jug, giving us
```
```
          exactly 3 gallons in the 5-gallon jug, right?
```
```
         Samuel: Right, then what?
```
```
         Bruce: All right. We take the 3-gallon jug and fill it a third of the way...
```
```
         Samuel: No! He said, “Be precise.” Exactly 4 gallons.
```
```
         Bruce: Sh - -. Every cop within 50 miles is running his a - - off and I’m
```
```
          out here playing kids games in the park.
```
```
         Samuel: Hey, you want to focus on the problem at hand?
```
```

        Fortunately, they find a solution in the nick of time. You can work out how.
```
```

      The Die Hard 3 State Machine
```
```
      The jug-filling scenario can be modeled with a state machine that keeps track of
```
```
      the amount b of water in the big jug, and the amount l in the little jug. With the 3
```
```
      and 5 gallon water jugs, the states formally will be pairs .b; l/ of real numbers such
```
```
      

6.2. The Invariant Principle                                                     181
```

that 0  b  5; 0  l  3. (We can prove that the reachable values of b and l will
be nonnegative integers, but we won’t assume this.) The start state is .0; 0/, since
both jugs start empty.
   Since the amount of water in the jug must be known exactly, we will only con-
sider moves in which a jug gets completely filled or completely emptied. There are
several kinds of transitions:
   1. Fill the little jug: .b; l/ ! .b; 3/ for l < 3.
   2. Fill the big jug: .b; l/ ! .5; l/ for b < 5.
   3. Empty the little jug: .b; l/ ! .b; 0/ for l > 0.
   4. Empty the big jug: .b; l/ ! .0; l/ for b > 0.
   5. Pour from the little jug into the big jug: for l > 0,
```
                                   (
```
```
                                     .b C l; 0/         if b C l  5,
```
```
                       .b; l/ !
```
```
                                     .5; l .5 b// otherwise.
```
```

   6. Pour from big jug into little jug: for b > 0,
```
```
                                   (
```
```
                                     .0; b C l/     if b C l  3,
```
```
                      .b; l/ !
```
```
                                     .b .3 l/; 3/ otherwise.
```
```

   Note that in contrast to the 99-counter state machine, there is more than one pos-
```
sible transition out of states in the Die Hard machine. Machines like the 99-counter
with at most one transition out of each state are called deterministic. The Die Hard
machine is nondeterministic because some states have transitions to several differ-
ent states.
   The Die Hard 3 bomb gets disarmed successfully because the state (4,3) is reach-
able.

Die Hard Permanently
The Die Hard series is getting tired, so we propose a final Die Hard Permanently.
Here, Simon’s brother returns to avenge him, posing the same challenge, but with
the 5 gallon jug replaced by a 9 gallon one. The state machine has the same spec-
ification as the Die Hard 3 version, except all occurrences of “5” are replaced by
“9.”
   Now, reaching any state of the form .4; l/ is impossible. We prove this using
the Invariant Principle. Specifically, we define the preserved invariant predicate
P ..b; l// to be that b and l are nonnegative integer multiples of 3.
```
                 

## 182 Chapter 6   State Machines
```
```

               To prove that P is a preserved invariant of Die-Hard-Once-and-For-All machine,
```
```
            we assume P .q/ holds for some state q WWD .b; l/ and that q ! r. We have to
```
```
            show that P .r/ holds. The proof divides into cases, according to which transition
```
```
            rule is used.
```
```
               One case is a “fill the little jug” transition. This means r D .b; 3/. But P .q/
```
```
            implies that b is an integer multiple of 3, and of course 3 is an integer multiple of
```
```
            3, so P .r/ still holds.
```
```
               Another case is a “pour from big jug into little jug” transition. For the subcase
```
```
            when there isn’t enough room in the little jug to hold all the water, that is, when
```
```
            b C l > 3, we have r D .b .3 l/; 3/. But P .q/ implies that b and l are integer
```
```
            multiples of 3, which means b .3 l/ is too, so in this case too, P .r/ holds.
```
```
               We won’t bother to crank out the remaining cases, which can all be checked
```
```
            just as easily. Now by the Invariant Principle, we conclude that every reachable
```
```
            state satisifies P . But since no state of the form .4; l/ satisifies P , we have proved
```
```
            rigorously that Bruce dies once and for all!
```
```
               By the way, notice that the state (1,0), which satisfies NOT.P /, has a transition
```
```
            to (0,0), which satisfies P . So the negation of a preserved invariant may not be a
```
```
            preserved invariant.
```

### 6.3 Partial Correctness & Termination
```
            Floyd distinguished two required properties to verify a program. The first property
```
```
            is called partial correctness; this is the property that the final results, if any, of the
```
```
            process must satisfy system requirements.
```
```
               You might suppose that if a result was only partially correct, then it might also
```
```
            be partially incorrect, but that’s not what Floyd meant. The word “partial” comes
```
```
            from viewing a process that might not terminate as computing a partial relation.
```
```
            Partial correctness means that when there is a result, it is correct, but the process
```
```
            might not always produce a result, perhaps because it gets stuck in a loop.
```
```
               The second correctness property, called termination, is that the process does
```
```
            always produce some final value.
```
```
               Partial correctness can commonly be proved using the Invariant Principle. Termi-
```
```
            nation can commonly be proved using the Well Ordering Principle. We’ll illustrate
```
```
            this by verifying a Fast Exponentiation procedure.
```
```
      

6.3. Partial Correctness & Termination                                             183
```

#### 6.3.1 Fast Exponentiation
Exponentiating
The most straightforward way to compute the bth power of a number a is to multi-
ply a by itself b 1 times. But the solution can be found in considerably fewer mul-
tiplications by using a technique called Fast Exponentiation. The register machine
program below defines the fast exponentiation algorithm. The letters x; y; z; r de-
note registers that hold numbers. An assignment statement has the form “z WD a”
and has the effect of setting the number in register z to be the number a.

A Fast Exponentiation Program
Given inputs a 2 R; b 2 N, initialize registers x; y; z to a; 1; b respectively, and
repeat the following sequence of steps until termination:
```

      if z D 0 return y and terminate
```
```
      r WD remainder.z; 2/
```
```
      z WD quotient.z; 2/
```
```
      if r D 1, then y WD xy
```
```
      x WD x 2
```

  We claim this program always terminates and leaves y D ab .
  To begin, we’ll model the behavior of the program with a state machine:
   1. states WWD R  R  N,
```

   2. start state WWD .a; 1; b/,
```
```

   3. transitions are defined by the rule
```
```
                          (
```
```
                            .x 2 ; y; quotient.z; 2// if z is nonzero and even;
```
```
           .x; y; z/ !         2
```
```
                            .x ; xy; quotient.z; 2// if z is nonzero and odd:
```

  The preserved invariant P ..x; y; z// will be
```

                                   z 2 N AND yx z D ab :                          (6.1)
```

  To prove that P is preserved, assume P ..x; y; z// holds and that .x; y; z/ !
.xt ; yt ; zt /. We must prove that P ..xt ; yt ; zt // holds, that is,
```

                                 zt 2 N AND yt xtzt D ab :                        (6.2)
```
```
            

## 184 Chapter 6   State Machines
```
```

        Since there is a transition from .x; y; z/, we have z ¤ 0, and since z 2 N
```
```
      by (6.1), we can consider just two cases:
```
```
        If z is even, then we have that xt D x 2 ; yt D y; zt D z=2. Therefore, zt 2 N
```
```
      and
```
```
                            yt xtzt D y.x 2 /z=2
```
```
                                    D yx 2z=2
```
```
                                    D yx z
```
```
                                    D ab                                 (by (6.1))
```
```
         If z is odd, then we have that xt D x 2 ; yt D xy; zt D .z                   1/=2. Therefore,
```
```
      zt 2 N and
```
```
                          yt xtzt D xy.x 2 /.z 1/=2
```
```
                                  D yx 1C2.z 1/=2
```
```
                                  D yx 1C.z 1/
```
```
                                  D yx z
```
```
                                  D ab                                     (by (6.1))
```
```
         So in both cases, (6.2) holds, proving that P is a preserved invariant.
```
```
         Now it’s easy to prove partial correctness: if the Fast Exponentiation program
```
```
      terminates, it does so with ab in register y. This works because 1  ab D ab , which
```
```
      means that the start state .a; 1; b/ satisifies P . By the Invariant Principle, P holds
```
```
      for all reachable states. But the program only stops when z D 0. If a terminated
```
```
      state .x; y; 0/ is reachable, then y D yx 0 D ab as required.
```
```
         Ok, it’s partially correct, but what’s fast about it? The answer is that the number
```
```
      of multiplications it performs to compute ab is roughly the length of the binary
```
```
      representation of b. That is, the Fast Exponentiation program uses roughly log b 2
```
```
      multiplications, compared to the naive approach of multiplying by a a total of b 1
```
```
      times.
```
```
         More precisely, it requires at most 2.dlog be C 1/ multiplications for the Fast
```
```
      Exponentiation algorithm to compute ab for b > 1. The reason is that the number
```
```
      in register z is initially b, and gets at least halved with each transition. So it can’t
```
```
      be halved more than dlog be C 1 times before hitting zero and causing the program
```
```
      to terminate. Since each of the transitions involves at most two multiplications, the
```
```
      total number of multiplications until z D 0 is at most 2.dlog be C 1/ for b > 0 (see
```
```
      Problem 6.6).
```
```
         2 As usual in computer science, log b means the base two logarithm log
```
```
                                                                                   2 b. We use, ln b for the
```
```
      natural logarithm loge b, and otherwise write the logarithm base explicitly, as in log10 b.
```
```
      

6.3. Partial Correctness & Termination                                                           185
```

#### 6.3.2 Derived Variables
The preceding termination proof involved finding a nonnegative integer-valued
measure to assign to states. We might call this measure the “size” of the state.
We then showed that the size of a state decreased with every state transition. By
the Well Ordering Principle, the size can’t decrease indefinitely, so when a mini-
mum size state is reached, there can’t be any transitions possible: the process has
terminated.
   More generally, the technique of assigning values to states—not necessarily non-
negative integers and not necessarily decreasing under transitions—is often useful
in the analysis of algorithms. Potential functions play a similar role in physics. In
the context of computational processes, such value assignments for states are called
derived variables.
   For example, for the Die Hard machines we could have introduced a derived
variable f W states ! R for the amount of water in both buckets, by setting
f ..a; b// WWD a C b. Similarly, in the robot problem, the position of the robot along
the x-axis would be given by the derived variable x-coord, where x-coord..i; j //WWD i .
   There are a few standard properties of derived variables that are handy in ana-
lyzing state machines.
Definition 6.3.1. A derived variable f W states ! R is strictly decreasing iff
```

                             q ! q 0 IMPLIES f .q 0 / < f .q/:
```

It is weakly decreasing iff
```

                             q ! q 0 IMPLIES f .q 0 /  f .q/:
```
```

   Strictly increasingweakly increasing derived variables are defined similarly.3
```
  We confirmed termination of the Fast Exponentiation procedure by noticing that
the derived variable z was nonnegative-integer-valued and strictly decreasing. We
can summarize this approach to proving termination as follows:
Theorem 6.3.2. If f is a strictly decreasing N-valued derived variable of a state
machine, then the length of any execution starting at state q is at most f .q/.
   Of course, we could prove Theorem 6.3.2 by induction on the value of f .q/, but
think about what it says: “If you start counting down at some nonnegative integer
f .q/, then you can’t count down more than f .q/ times.” Put this way, it’s obvious.
```
    3 Weakly increasing variables are often also called nondecreasing. We will avoid this terminology
```

to prevent confusion between nondecreasing variables and variables with the much weaker property
of not being a decreasing variable.
```
           

## 186 Chapter 6   State Machines
```
```

      6.3.3   Termination with Well ordered Sets (Optional)
```
```
      Theorem 6.3.2 generalizes straightforwardly to derived variables taking values in a
```
```
      well ordered set (Section 2.4.
```
```
      Theorem 6.3.3. If there exists a strictly decreasing derived variable whose range
```
```
      is a well ordered set, then every execution terminates.
```
```
         Theorem 6.3.3 follows immediately from the observation that a set of numbers
```
```
      is well ordered iff it has no infinite decreasing sequences (Problem 2.23).
```
```
         Note that the existence of a weakly decreasing derived variable does not guaran-
```
```
      tee that every execution terminates. An infinite execution could proceed through
```
```
      states in which a weakly decreasing variable remained constant.
```
```

      6.3.4   A Southeast Jumping Robot (Optional)
```
```
      Here’s a simple, contrived example of a termination proof based on a variable that
```
```
      is strictly decreasing over a well ordered set. Let’s think about a robot that travels
```
```
      around the nonnegative integer quadrant N2 .
```
```
         If the robot is at some position .x; y/ different from the origin .0; 0/, the robot
```
```
      must make a move, which may be
```
```
           a unit distance West—that is, .x; y/ ! .x        1; y/ for x > 0, or
```
```

           a unit distance South combined with an arbitrary jump East—that is, .x; y/ !
```
```
            .z; y 1/ for z  x,
```
```
      providing the move does not leave the quadrant.
```
```
      Claim 6.3.4. The robot will always get stuck at the origin.
```
```
         If we think of the robot as a nondeterministic state machine, then Claim 6.3.4 is
```
```
      a termination assertion. The Claim may seem obvious, but it really has a different
```
```
      character than termination based on nonnegative integer-valued variables. That’s
```
```
      because, even knowing that the robot is at position .0; 1/, for example, there is no
```
```
      way to bound the time it takes for the robot to get stuck. It can delay getting stuck
```
```
      for as many seconds as it wants by making its next move to a distant point in the
```
```
      Far East. This rules out proving termination using Theorem 6.3.2.
```
```
         So does Claim 6.3.4 still seem obvious?
```
```
         Well it is if you see the trick. Define a derived variable v mapping robot states
```
```
      to the numbers in the well ordered set N C F of Lemma 2.4.6. In particular, define
```
```
      v W N2 ! N C F as follows
```
```
                                                         x
```
```
                                      v.x; y/ WWD y C        :
```
```
                                                       xC1
```
```
                 

           6.4. The Stable Marriage Problem                                                       187
```
```

                                            Brad       2             1       Jennifer
```
```
                                                   1                     2
```
```

                                                   2                     1
```
```
                                      Billy Bob        1             2       Angelina
```
```

           Figure 6.4 Preferences for four people. Both men like Angelina best and both
```
```
           women like Brad best.
```
```

             Now it’s easy to check that if .x; y/ ! .x 0 ; y 0 / is a legitimate robot move, then
```
```
           v..x 0 ; y 0 // < v..x; y//. In particular, v is a strictly decreasing derived variable, so
```
```
           Theorem 6.3.3 implies that the robot always get stuck—even though we can’t say
```
```
           how many moves it will take until it does.
```

### 6.4 The Stable Marriage Problem
```
           Suppose we have a population of men and women in which each person has pref-
```
```
           erences of the opposite-gender person they would like to marry: each man has his
```
```
           preference list of all the women, and each woman has her preference list of all of
```
```
           the men.
```
```
              The preferences don’t have to be symmetric. That is, Jennifer might like Brad
```
```
           best, but Brad doesn’t necessarily like Jennifer best. The goal is to marry every-
```
```
           one: every man must marry exactly one woman and vice versa—no polygamy and
```
```
           heterosexual marriages only.4 Moreover, we would like to find a matching between
```
```
           men and women that is stable in the sense that there is no pair of people who prefer
```
```
           one another to their spouses.
```
```
              For example, suppose Brad likes Angelina best, and Angelina likes Brad best, but
```
```
           Brad and Angelina are married to other people, say Jennifer and Billy Bob. Now
```
```
           Brad and Angelina prefer each other to their spouses, which puts their marriages
```
```
           at risk. Pretty soon, they’re likely to start spending late nights together working on
```
```
           problem sets!
```
```
              This unfortunate situation is illustrated in Figure 6.4, where the digits “1” and “2”
```
```
           near a man shows which of the two women he ranks first and second, respectively,
```
```
           and similarly for the women.
```
```
              4 Same-sex marriage is an interesting but separate case.
```
```
           

## 188 Chapter 6   State Machines
```
```

        More generally, in any matching, a man and woman who are not married to each
```
```
      other and who like each other better than their spouses is called a rogue couple. In
```
```
      the situation shown in Figure 6.4, Brad and Angelina would be a rogue couple.
```
```
        Having a rogue couple is not a good thing, since it threatens the stability of the
```
```
      marriages. On the other hand, if there are no rogue couples, then for any man and
```
```
      woman who are not married to each other, at least one likes their spouse better than
```
```
      the other, and so there won’t be any mutual temptation to start an affair.
```
```

      Definition 6.4.1. A stable matching is a matching with no rogue couples.
```
```

         The question is, given everybody’s preferences, can you find a stable set of mar-
```
```
      riages? In the example consisting solely of the four people in Figure 6.4, we could
```
```
      let Brad and Angelina both have their first choices by marrying each other. Now
```
```
      neither Brad nor Angelina prefers anybody else to their spouse, so neither will be
```
```
      in a rogue couple. This leaves Jen not-so-happily married to Billy Bob, but neither
```
```
      Jen nor Billy Bob can entice somebody else to marry them, and so this is a stable
```
```
      matching.
```
```
         It turns out there always is a stable matching among a group of men and women.
```
```
      We don’t know of any immediate way to recognize this, and it seems surprising. In
```
```
      fact, in the apparently similar same-sex or “buddy” matching problem where people
```
```
      are supposed to be paired off as buddies, regardless of gender, a stable matching
```
```
      may not be possible. An example of preferences among four people where there is
```
```
      no stable buddy match is given in Problem 6.22. But when men are only allowed
```
```
      to marry women, and vice versa, then there is a simple procedure to produce a
```
```
      stable matching and the concept of preserved invariants provides an elegant way to
```
```
      understand and verify the procedure.
```
```

      6.4.1   The Mating Ritual
```
```
      The procedure for finding a stable matching can be described in a memorable way
```
```
      as a Mating Ritual that takes place over several days. On the starting day, each man
```
```
      has his full preference list of all the women, and likewise each woman has her full
```
```
      preference list of all the men. Then following events happen each day:
```
```
         Morning: Each man stands under the balcony of the woman on the top of his
```
```
      list, that is the woman he prefers above all the other remaining women. Then he
```
```
      serenades her. He is said to be her suitor. If a man has no women left on his list, he
```
```
      stays home and does his math homework.
```
```
         Afternoon: Each woman who has one or more suitors says to her favorite among
```
```
      them, “We might get engaged. Please stay around.” To the other suitors, she says,
```
```
      “No. I will never marry you! Take a hike!”
```
```
     

6.4. The Stable Marriage Problem                                                  189
```
```

   Evening: Any man who is told by a woman to take a hike crosses that woman
```
off his preference list.
   Termination condition: When a day arrives in which every woman has at most
one suitor, the ritual ends with each woman marrying her suitor, if she has one.
   There are a number of facts about this Mating Ritual that we would like to prove:
```

     The Ritual eventually reaches the termination condition.
```
```

     Everybody ends up married.
```
```

     The resulting marriages are stable.
```
```

   To prove these facts, it will be helpful to recognize the Ritual as the description
```
of a state machine. The state at the start of any day is determined by knowing for
each man, which woman, if any, he will serenade that day—that is, the woman
at the top of his preference list after he has crossed out all the women who have
rejected him on earlier days.

Mating Ritual at Akamai

The Internet infrastructure company Akamai, cofounded by Tom Leighton, also
uses a variation of the Mating Ritual to assign web traffic to its servers.
   In the early days, Akamai used other combinatorial optimization algorithms
that got to be too slow as the number of servers (over 65,000 in 2010) and requests
(over 800 billion per day) increased. Akamai switched to a Ritual-like approach,
since a Ritual is fast and can be run in a distributed manner. In this case, web
requests correspond to women and web servers correspond to men. The web
requests have preferences based on latency and packet loss, and the web servers
have preferences based on cost of bandwidth and co-location.
```
           

## 190 Chapter 6   State Machines
```
```

      6.4.2    There is a Marriage Day
```
```
      It’s easy to see why the Mating Ritual has a terminal day when people finally get
```
```
      married. Every day on which the ritual hasn’t terminated, at least one man crosses
```
```
      a woman off his list. (If the ritual hasn’t terminated, there must be some woman
```
```
      serenaded by at least two men, and at least one of them will have to cross her off his
```
```
      list). If we start with n men and n women, then each of the n men’s lists initially
```
```
      has n women on it, for a total of n2 list entries. Since no woman ever gets added
```
```
      to a list, the total number of entries on the lists decreases every day that the Ritual
```
```
      continues, and so the Ritual can continue for at most n2 days.
```
```

      6.4.3    They All Live Happily Ever After. . .
```
```
      We will prove that the Mating Ritual leaves everyone in a stable marriage. To do
```
```
      this, we note one very useful fact about the Ritual: if on some morning a woman has
```
```
      any suitor, then her favorite suitor will still be serenading her the next morning—his
```
```
      list won’t have changed. So she is sure to have today’s favorite suitor among her
```
```
      suitors tomorrow. That means she will be able to choose a favorite suitor tomorrow
```
```
      who is at least as desirable to her as today’s favorite. So day by day, her favorite
```
```
      suitor can stay the same or get better, never worse. This sounds like an invariant,
```
```
      and it is. Namely, let P be the predicate
```
```

              For every woman w and man m, if w is crossed off m’s list, then w has
```
```
              a suitor whom she prefers over m.
```
```

      Lemma 6.4.2. P is a preserved invariant for The Mating Ritual.
```
```

      Proof. Woman w gets crossed off m’s list only when w has a suitor she prefers to
```
```
      m. Thereafter, her favorite suitor doesn’t change until one she likes better comes
```
```
      along. So if her favorite suitor was preferable to m, then any new favorite suitor
```
```
      will be as well.
```
```
                                                                                      
```
```

        Notice that the invariant P holds vacuously at the beginning since no women are
```
```
      crossed off to start. So by the Invariant Principle, P holds throughout the Ritual.
```
```
      Now we can prove:
```
```

      Theorem 6.4.3. Everyone is married at the end of the Mating Ritual.
```
```

      Proof. Assume to the contrary that someone is unmarried on the last day of the
```
```
      Mating Ritual. There are an equal number of men and women, so some some
```
```
      man—call him Bob—as well as some woman—call her Alice—are unmarried.
```
```
      This means Bob isn’t serenading anybody on the last day, that is, his list is empty.
```
```
     

6.4. The Stable Marriage Problem                                                  191
```

In particular, Alice has been crossed off Bob’s list and, since P is true, Alice has
a suitor on the last day. By definition, Alice is married to this suitor, a contradic-
tion.                                                                               

Theorem 6.4.4. The Mating Ritual produces a stable matching.

Proof. Let Brad and Jen be any man and woman, respectively, that are not married
to each other on the last day of the Mating Ritual. We will prove that Brad and Jen
are not a rogue couple, and thus that all marriages on the last day are stable. There
are two cases to consider.

Case 1: Jen is not on Brad’s list by the end. Then by invariant P , we know that
```
     Jen has a suitor (and hence a husband) whom she prefers to Brad. So she’s
```
```
     not going to run off with Brad—Brad and Jen cannot be a rogue couple.
```

Case 2: Jen is on Brad’s list. Since Brad picks women to serenade by working
```
     down his list, his wife must be higher on his preference list than Jen. So
```
```
     he’s not going to run off with Jen—once again, Brad and Jen are not a rogue
```
```
     couple.                                                                  
```

#### 6.4.4 . . . Especially the Men
Who is favored by the Mating Ritual, the men or the women? The women seem
to have all the power: each day they choose their favorite suitor and reject the rest.
What’s more, we know their suitors can only change for the better as the Ritual
progresses. Similarly, a man keeps serenading the woman he most prefers among
those on his list until he must cross her off, at which point he serenades the next
most preferred woman on his list. So from the man’s perspective, the woman he is
serenading can only change for the worse. Sounds like a good deal for the women.
   But it’s not! We will show that the men are by far the favored gender under the
Mating Ritual.
   While the Mating Ritual produces one stable matching, stable matchings need
not be unique. For example, reversing the roles of men and women will often yield
a different stable matching among them. So a man may have different wives in
different sets of stable marriages. In some cases, a man can stably marry every one
of the women, but in most cases, there are some women who cannot be a man’s wife
in any stable matching. For example, given the preferences shown in Figure 6.4,
Jennifer cannot be Brad’s wife in any stable matching because if he was married to
her, then he and Angelina would be a rogue couple. It is not feasible for Jennifer to
be stably married to Brad.
```
            

## 192 Chapter 6    State Machines
```
```

      Definition 6.4.5. Given a set of preferences for the men and women, one person is
```
```
      a feasible spouse for another person when there is a stable matching in which these
```
```
      two people are married.
```
```

      Definition 6.4.6. Let Q be the predicate: for every woman w and man m, if w is
```
```
      crossed off m’s list, then w is not a feasible spouse for m.
```
```

      Lemma 6.4.7. Q is a preserved invariant5 for The Mating Ritual.
```
```

      Proof. Suppose Q holds at some point in the Ritual and some woman Alice is
```
```
      about to be crossed off some man’s, Bob’s, list. We claim that Alice must not be
```
```
      feasible for Bob. Therefore Q will still hold after Alice is crossed off, proving that
```
```
      Q is invariant.
```
```
         To verify the claim, notice that when Alice gets crossed of Bob’s list, it’s because
```
```
      Alice has a suitor, Ted, she prefers to Bob. What’s more, since Q holds, all Ted’s
```
```
      feasible wives are still on his list, and Alice is at the top. So Ted likes Alice better
```
```
      than all his other feasible spouses. Now if Alice could be married to Bob in some
```
```
      set of stable marriages, then Ted must be married to a wife he likes less than Alice,
```
```
      making Alice and Ted a rogue couple and contradicting stability. So Alice can’t be
```
```
      married to Bob, that is, Alice is not a feasible wife for Bob, as claimed.            
```
```

      Definition 6.4.8. Given a set of preferences for the men and women, a person’s
```
```
      optimal spouse is their most preferred feasible spouse. A person’s pessimal spouse
```
```
      is their least preferred feasible spouse.
```
```

        Everybody has an optimal and a pessimal spouse, since we know there is at least
```
```
      one stable matching, namely, the one produced by the Mating Ritual. Lemma 6.4.7
```
```
      implies a key property the Mating Ritual:
```
```

      Theorem 6.4.9. The Mating Ritual marries every man to his optimal wife.
```
```

      Proof. If Bob is married to Alice on the final day of the Ritual, then everyone above
```
```
      Alice on Bob’s preference list was crossed off, and by property Q, all these crossed
```
```
      off women were infeasible for Bob. So Alice is Bob’s highest ranked feasible
```
```
      spouse, that is, his optimal wife.                                                 
```
```

      Lemma 6.4.10. Given a set of preferences for the men and women, everyone is the
```
```
      pessimal spouse of their optimal spouse.
```
```
         5 We appeal to P in justifying Q, so technically it is P AND Q which is actually the preserved
```
```

      invariant. But let’s not be picky.
```