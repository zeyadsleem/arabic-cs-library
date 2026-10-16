---
title: "Number Theory"
lang: en
---

## 9 Number Theory
```
             Number theory is the study of the integers. Why anyone would want to study the
```
```
             integers may not be obvious. First of all, what’s to know? There’s 0, there’s 1, 2,
```
```
             3, and so on, and, oh yeah, -1, -2, . . . . Which one don’t you understand? What
```
```
             practical value is there in it?
```
```
                The mathematician G. H. Hardy delighted at its impracticality. He wrote:
```
```

                     [Number theorists] may be justified in rejoicing that there is one sci-
```
```
                     ence, at any rate, and that their own, whose very remoteness from or-
```
```
                     dinary human activities should keep it gentle and clean.
```
```

                Hardy was especially concerned that number theory not be used in warfare; he
```
```
             was a pacifist. You may applaud his sentiments, but he got it wrong: number theory
```
```
             underlies modern cryptography, which is what makes secure online communication
```
```
             possible. Secure communication is of course crucial in war—leaving poor Hardy
```
```
             spinning in his grave. It’s also central to online commerce. Every time you buy a
```
```
             book from Amazon, use a certificate to access a web page, or use a PayPal account,
```
```
             you are relying on number theoretic algorithms.
```
```
                Number theory also provides an excellent environment for us to practice and
```
```
             apply the proof techniques that we developed in previous chapters. We’ll work out
```
```
             properties of greatest common divisors (gcd’s) and use them to prove that integers
```
```
             factor uniquely into primes. Then we’ll introduce modular arithmetic and work out
```
```
             enough of its properties to explain the RSA public key crypto-system.
```
```
                Since we’ll be focusing on properties of the integers, we’ll adopt the default
```
```
             convention in this chapter that variables range over the set Z of integers.
```

### 9.1 Divisibility
```
             The nature of number theory emerges as soon as we consider the divides relation.
```
```

             Definition 9.1.1. a divides b (notation a j b) iff there is an integer k such that
```
```

                                                    ak D b:
```
```

               The divides relation comes up so frequently that multiple synonyms for it are
```
```
             used all the time. The following phrases all say the same thing:
```
```
            

## 342 Chapter 9   Number Theory
```
```

           a j b,
```
```

           a divides b,
```
```

           a is a divisor of b,
```
```

           a is a factor of b,
```
```

           b is divisible by a,
```
```

           b is a multiple of a.
```
```

      Some immediate consequences of Definition 9.1.1 are that for all n
```
```

                            n j 0;             n j n; and            ˙ 1 j n:
```
```

      Also,
```
```
                                         0 j n IMPLIES n D 0:
```
```
         Dividing seems simple enough, but let’s play with this definition. The Pythagore-
```
```
      ans, an ancient sect of mathematical mystics, said that a number is perfect if it
```
```
      equals the sum of its positive integral divisors, excluding itself. For example,
```
```
      6 D 1 C 2 C 3 and 28 D 1 C 2 C 4 C 7 C 14 are perfect numbers. On the
```
```
      other hand, 10 is not perfect because 1 C 2 C 5 D 8, and 12 is not perfect because
```
```
      1 C 2 C 3 C 4 C 6 D 16. Euclid characterized all the even perfect numbers around
```
```
      300 BC (Problem 9.2). But is there an odd perfect number? More than two thou-
```
```
      sand years later, we still don’t know! All numbers up to about 10300 have been
```
```
      ruled out, but no one has proved that there isn’t an odd perfect number waiting just
```
```
      over the horizon.
```
```
         So a half-page into number theory, we’ve strayed past the outer limits of human
```
```
      knowledge. This is pretty typical; number theory is full of questions that are easy to
```
```
      pose, but incredibly difficult to answer. We’ll mention a few more such questions
```
```
      in later sections.1
```
```

      9.1.1    Facts about Divisibility
```
```
      The following lemma collects some basic facts about divisibility.
```
```

      Lemma 9.1.2.
```
```

         1. If a j b and b j c, then a j c.
```
```
         1 Don’t Panic—we’re going to stick to some relatively benign parts of number theory.   These
```
```
      super-hard unsolved problems rarely get put on problem sets.
```
```
      

9.1. Divisibility                                                                                  343
```
```

   2. If a j b and a j c, then a j sb C t c for all s and t .
```
```

   3. For all c ¤ 0, a j b if and only if ca j cb.
```

Proof. These facts all follow directly from Definition 9.1.1. To illustrate this, we’ll
prove just part 2:
   Given that a j b, there is some k1 2 Z such that ak1 D b. Likewise, ak2 D c,
so
```
                   sb C t c D s.k1 a/ C t .k2 a/ D .sk1 C t k2 /a:
```
Therefore sb C t c D k3 a where k3 WWD .sk1 C t k2 /, which means that
```

                                           a j sb C t c:
```
```

                                                                                                    
```
```

   A number of the form sb C t c is called an integer linear combination of b and c,
```
or, since in this chapter we’re only talking about integers, just a linear combination.
So Lemma 9.1.2.2 can be rephrased as
```

        If a divides b and c, then a divides every linear combination of b and c.
```

We’ll be making good use of linear combinations, so let’s get the general definition
on record:

Definition 9.1.3. An integer n is a linear combination of numbers b0 ; : : : ; bk iff
```

                                n D s0 b0 C s1 b1 C    C sk bk
```

for some integers s0 ; : : : ; sk .

#### 9.1.2 When Divisibility Goes Bad
As you learned in elementary school, if one number does not evenly divide another,
you get a “quotient” and a “remainder” left over. More precisely:

Theorem 9.1.4. [Division Theorem]2 Let n and d be integers such that d ¤ 0.
Then there exists a unique pair of integers q and r, such that
```

                              n D q  d C r AND 0  r < jd j :                                   (9.1)
```
   2 This theorem is often called the “Division Algorithm,” but we prefer to call it a theorem since it

does not actually describe a division procedure for computing the quotient and remainder.
```
            

## 344 Chapter 9   Number Theory
```
```

         The number q is called the quotient and the number r is called the remainder of
```
```
      n divided by d . We use the notation qcnt.n; d / for the quotient and rem.n; d / for
```
```
      the remainder.
```
```
         The absolute value notation jd j used above is probably familiar from introduc-
```
```
      tory calculus, but for the record, let’s define it.
```
```

      Definition 9.1.5. For any real number r, the absolute value jrj of r is:3
```
```
                                            (
```
```
                                              r   if r  0;
```
```
                                    jrj WWD
```
```
                                                r if r < 0:
```
```

         So by definition, the remainder rem.n; d / is nonnegative regardless of the sign
```
```
      of n and d . For example, rem. 11; 7/ D 3, since 11 D . 2/  7 C 3.
```
```
         “Remainder” operations built into many programming languages can be a source
```
```
      of confusion. For example, the expression “32 % 5” will be familiar to program-
```
```
      mers in Java, C, and C++; it evaluates to rem.32; 5/ D 2 in all three languages.
```
```
      On the other hand, these and other languages are inconsistent in how they treat re-
```
```
      mainders like “32 % -5” or “-32 % 5” that involve negative numbers. So don’t be
```
```
      distracted by your familiar programming language’s behavior on remainders, and
```
```
      stick to the mathematical convention that remainders are nonnegative.
```
```
         The remainder on division by d by definition is a number in the (integer) interval
```
```
      from 0 to jd j 1. Such integer intervals come up so often that it is useful to have a
```
```
      simple notation for them. For k  n 2 Z,
```
```

                                       Œk::n WWD     fi j k  i  ng;
```
```
                                      (k..n] WWD      Œk::n    fkg;
```
```
                                      [k..n) WWD      Œk::n    fng;
```
```
                                      (k..n) WWD      Œk::n    fk; ng:
```
```

      9.1.3     Die Hard
```
```
      Die Hard 3 is just a B-grade action movie, but we think it has an inner message:
```
```
      everyone should learn at least a little number theory. In Section 6.2.3, we formal-
```
```
      ized a state machine for the Die Hard jug-filling problem using 3 and 5 gallon jugs,
```
```
                                                         p
```
```
         3 The absolute value of r could be defined as     r 2 , which works because of the convention that
```
```
      square root notation always refers to the nonnegative square root (see Problem 1.2). Absolute value
```
```
      generalizes to complex numbers where it is called the norm. For a; b 2 R,
```
```
                                                          p
```
```
                                             ja C bi j WWD a2 C b 2 :
```
```
      

9.1. Divisibility                                                                      345
```

and also with 3 and 9 gallon jugs, and came to different conclusions about bomb
explosions. What’s going on in general? For example, how about getting 4 gallons
from 12- and 18-gallon jugs, getting 32 gallons with 899- and 1147-gallon jugs, or
getting 3 gallons into a jug using just 21- and 26-gallon jugs?
   It would be nice if we could solve all these silly water jug questions at once. This
is where number theory comes in handy.

A Water Jug Invariant
Suppose that we have water jugs with capacities a and b with b  a. Let’s carry
out some sample operations of the state machine and see what happens, assuming
the b-jug is big enough:
```

       .0; 0/ ! .a; 0/                                                fill first jug
```
```
               ! .0; a/                                    pour first into second
```
```
               ! .a; a/                                               fill first jug
```
```
               ! .2a      b; b/       pour first into second (assuming 2a  b)
```
```
               ! .2a      b; 0/                                empty second jug
```
```
               ! .0; 2a     b/                             pour first into second
```
```
               ! .a; 2a     b/                                            fill first
```
```
               ! .3a      2b; b/    pour first into second (assuming 3a  2b)
```

What leaps out is that at every step, the amount of water in each jug is a linear
combination of a and b. This is easy to prove by induction on the number of
transitions:
Lemma 9.1.6 (Water Jugs). In the Die Hard state machine of Section 6.2.3 with
jugs of sizes a and b, the amount of water in each jug is always a linear combination
of a and b.
Proof. The induction hypothesis P .n/ is the proposition that after n transitions, the
amount of water in each jug is a linear combination of a and b.
Base case (n D 0): P .0/ is true, because both jugs are initially empty, and 0  a C
## 0  b D 0.
Inductive step: Suppose the machine is in state .x; y/ after n steps, that is, the little
jug contains x gallons and the big one contains y gallons. There are two cases:
```

     If we fill a jug from the fountain or empty a jug into the fountain, then that jug
```
```
      is empty or full. The amount in the other jug remains a linear combination
```
```
      of a and b. So P .n C 1/ holds.
```
```
                

## 346 Chapter 9   Number Theory
```
```

                Otherwise, we pour water from one jug to another until one is empty or the
```
```
                 other is full. By our assumption, the amount x and y in each jug is a linear
```
```
                 combination of a and b before we begin pouring. After pouring, one jug is
```
```
                 either empty (contains 0 gallons) or full (contains a or b gallons). Thus, the
```
```
                 other jug contains either x C y, x C y a or x C y b gallons, all of which
```
```
                 are linear combinations of a and b since x and y are. So P .n C 1/ holds in
```
```
                 this case as well.
```
```

           Since P .n C 1/ holds in any case, this proves the inductive step, completing the
```
```
           proof by induction.                                                            
```
```

             So we have established that the jug problem has a preserved invariant, namely,
```
```
           the amount of water in every jug is a linear combination of the capacities of the
```
```
           jugs. Lemma 9.1.6 has an important corollary:
```
```

           Corollary. In trying to get 4 gallons from 12- and 18-gallon jugs, and likewise to
```
```
           get 32 gallons from 899- and 1147-gallon jugs,
```
```

                                             Bruce will die!
```
```

           Proof. By the Water Jugs Lemma 9.1.6, with 12- and 18-gallon jugs, the amount
```
```
           in any jug is a linear combination of 12 and 18. This is always a multiple of 6 by
```
```
           Lemma 9.1.2.2, so Bruce can’t get 4 gallons. Likewise, the amount in any jug using
```
```
           899- and 1147-gallon jugs is a multiple of 31, so he can’t get 32 either.       
```
```

              But the Water Jugs Lemma doesn’t tell the complete story. For example, it leaves
```
```
           open the question of getting 3 gallons into a jug using just 21- and 26-gallon jugs:
```
```
           the only positive factor of both 21 and 26 is 1, and of course 1 divides 3, so the
```
```
           Lemma neither rules out nor confirms the possibility of getting 3 gallons.
```
```
              A bigger issue is that we’ve just managed to recast a pretty understandable ques-
```
```
           tion about water jugs into a technical question about linear combinations. This
```
```
           might not seem like a lot of progress. Fortunately, linear combinations are closely
```
```
           related to something more familiar, greatest common divisors, and will help us
```
```
           solve the general water jug problem.
```

### 9.2 The Greatest Common Divisor
```
           A common divisor of a and b is a number that divides them both. The greatest
```
```
           common divisor of a and b is written gcd.a; b/. For example, gcd.18; 24/ D 6.
```
```
     

9.2. The Greatest Common Divisor                                                    347
```
```

   As long as a and b are not both 0, they will have a gcd. The gcd turns out
```
to be very valuable for reasoning about the relationship between a and b and for
reasoning about integers in general. We’ll be making lots of use of gcd’s in what
follows.
   Some immediate consequences of the definition of gcd are that
```
               gcd.n; 1/ D 1
```
```
               gcd.n; n/ D gcd.n; 0/ D jnj                 f orn ¤ 0;
```
where the last equality follows from the fact that everything is a divisor of 0.

#### 9.2.1 Euclid’s Algorithm
The first thing to figure out is how to find gcd’s. A good way called Euclid’s
algorithm has been known for several thousand years. It is based on the following
elementary observation.
Lemma 9.2.1. For b ¤ 0,
```
                           gcd.a; b/ D gcd.b; rem.a; b//:
```
Proof. By the Division Theorem 9.1.4,
```
                                      a D qb C r                                   (9.2)
```
where r D rem.a; b/. So a is a linear combination of b and r, which implies that
any divisor of b and r is a divisor of a by Lemma 9.1.2.2. Likewise, r is a linear
combination a qb of a and b, so any divisor of a and b is a divisor of r. This
means that a and b have the same common divisors as b and r, and so they have
the same greatest common divisor.                                               

  Lemma 9.2.1 is useful for quickly computing the greatest common divisor of
two numbers. For example, we could compute the greatest common divisor of
## 1147 and 899 by repeatedly applying it:
```
                gcd.1147; 899/ D gcd.899; rem.1147; 899//
```
```
                                          „    ƒ‚     …
```
```
                                                   D248
```
```
                                   D gcd .248; rem.899; 248/ D 155/
```
```
                                   D gcd .155; rem.248; 155/ D 93/
```
```
                                   D gcd .93; rem.155; 93/ D 62/
```
```
                                   D gcd .62; rem.93; 62/ D 31/
```
```
                                   D gcd .31; rem.62; 31/ D 0/
```
```
                                   D 31
```
```
            

## 348 Chapter 9    Number Theory
```
```

      This calculation that gcd.1147; 899/ D 31 was how we figured out that with water
```
```
      jugs of sizes 1147 and 899, Bruce dies trying to get 32 gallons.
```
```
        On the other hand, applying Euclid’s algorithm to 26 and 21 gives
```
```

                              gcd.26; 21/ D gcd.21; 5/ D gcd.5; 1/ D 1;
```
```

      so we can’t use the reasoning above to rule out Bruce getting 3 gallons into the big
```
```
      jug. As a matter of fact, because the gcd here is 1, Bruce will be able to get any
```
```
      number of gallons into the big jug up to its capacity. To explain this, we will need
```
```
      a little more number theory.
```
```

      Euclid’s Algorithm as a State Machine
```
```
      Euclid’s algorithm can easily be formalized as a state machine. The set of states is
```
```
      N2 and there is one transition rule:
```
```

                                        .x; y/ ! .y; rem.x; y//;                                       (9.3)
```
```

      for y > 0. By Lemma 9.2.1, the gcd stays the same from one state to the next. That
```
```
      means the predicate
```
```
                                  gcd.x; y/ D gcd.a; b/
```
```
      is a preserved invariant on the states .x; y/. This preserved invariant is, of course,
```
```
      true in the start state .a; b/. So by the Invariant Principle, if y ever becomes 0, the
```
```
      invariant will be true and so
```
```

                                        x D gcd.x; 0/ D gcd.a; b/:
```
```

      Namely, the value of x will be the desired gcd.
```
```
         What’s more x and therefore also y, gets to be 0 pretty fast. To see why, note
```
```
      that starting from .x; y/, two transitions leads to a state whose the first coordinate
```
```
      is rem.x; y/, which is at most half the size of x.4 Since x starts off equal to a and
```
```
      gets halved or smaller every two steps, it will reach its minimum value—which is
```
```
      gcd.a; b/—after at most 2 log a transitions. After that, the algorithm takes at most
```
```
      one more transition to terminate. In other words, Euclid’s algorithm terminates
```
```
      after at most 1 C 2 log a transitions.5
```
```
         4 In other words,
```
```

                                      rem.x; y/  x=2         for 0 < y  x:                             (9.4)
```
```
      This is immediate if y  x=2, since the remainder of x divided by y is less than y by definition. On
```
```
      the other hand, if y > x=2, then rem.x; y/ D x y < x=2.
```
```
          5 A tighter analysis shows that at most log .a/ transitions are possible where ' is the golden ratio
```
```
            p                                        '
```
```
      .1 C 5/=2, see Problem 9.14.
```
```
      

9.2. The Greatest Common Divisor                                                                 349
```

#### 9.2.2 The Pulverizer
We will get a lot of mileage out of the following key fact:

Theorem 9.2.2. The greatest common divisor of a and b is a linear combination
of a and b. That is,
```
                            gcd.a; b/ D sa C t b;
```
for some integers s and t.6
```

   We already know from Lemma 9.1.2.2 that every linear combination of a and b is
```
divisible by any common factor of a and b, so it is certainly divisible by the greatest
of these common divisors. Since any constant multiple of a linear combination is
also a linear combination, Theorem 9.2.2 implies that any multiple of the gcd is a
linear combination, giving:

Corollary 9.2.3. An integer is a linear combination of a and b iff it is a multiple of
gcd.a; b/.
```

   We’ll prove Theorem 9.2.2 directly by explaining how to find s and t. This job
```
is tackled by a mathematical tool that dates back to sixth-century India, where it
was called kuttaka, which means “the Pulverizer.” Today, the Pulverizer is more
commonly known as the “Extended Euclidean Gcd Algorithm,” because it is so
close to Euclid’s algorithm.
   For example, following Euclid’s algorithm, we can compute the gcd of 259
and 70 as follows:
```

          gcd.259; 70/ D gcd.70; 49/                      since rem.259; 70/ D 49
```
```
                           D gcd.49; 21/                  since rem.70; 49/ D 21
```
```
                           D gcd.21; 7/                   since rem.49; 21/ D 7
```
```
                           D gcd.7; 0/                    since rem.21; 7/ D 0
```
```
                           D 7:
```

The Pulverizer goes through the same steps, but requires some extra bookkeeping
along the way: as we compute gcd.a; b/, we keep track of how to write each of
the remainders (49, 21, and 7, in the example) as a linear combination of a and b.
This is worthwhile, because our objective is to write the last nonzero remainder,
   6 This result is often referred to as Bezout’s lemma, which is a misattribution since it was first

published in the West 150 years earlier by someone else, and was described a thousand years before
that by Indian mathematicians Aryabhata and Bhaskara.
```
           

## 350 Chapter 9     Number Theory
```
```

      which is the gcd, as such a linear combination. For our example, here is this extra
```
```
      bookkeeping:
```
```

               x          y         .rem.x; y// D x q  y
```
```
              259         70                 49 D a 3  b
```
```
               70         49                 21 D b 1  49
```
```
                                                D b 1  .a 3  b/
```
```
                                                D   1aC4b
```
```
              49          21                  7 D 49 2  21
```
```
                                                D .a 3  b/ 2  . 1  a C 4  b/
```
```
                                                D 3  a 11  b
```
```
              21          7                   0
```
```

      We began by initializing two variables, x D a and y D b. In the first two columns
```
```
      above, we carried out Euclid’s algorithm. At each step, we computed rem.x; y/
```
```
      which equals x qcnt.x; y/  y. Then, in this linear combination of x and y, we
```
```
      replaced x and y by equivalent linear combinations of a and b, which we already
```
```
      had computed. After simplifying, we were left with a linear combination of a and
```
```
      b equal to rem.x; y/, as desired. The final solution is boxed.
```
```
         This should make it pretty clear how and why the Pulverizer works. If you have
```
```
      doubts, you may work through Problem 9.13, where the Pulverizer is formalized as
```
```
      a state machine and then verified using an invariant that is an extension of the one
```
```
      used for Euclid’s algorithm.
```
```
         Since the Pulverizer requires only a little more computation than Euclid’s algo-
```
```
      rithm, you can “pulverize” very large numbers very quickly by using this algorithm.
```
```
      As we will soon see, its speed makes the Pulverizer a very useful tool in the field
```
```
      of cryptography.
```
```
         Now we can restate the Water Jugs Lemma 9.1.6 in terms of the greatest common
```
```
      divisor:
```
```
      Corollary 9.2.4. Suppose that we have water jugs with capacities a and b. Then
```
```
      the amount of water in each jug is always a multiple of gcd.a; b/.
```
```
        For example, there is no way to form 4 gallons using 3- and 6-gallon jugs, be-
```
```
      cause 4 is not a multiple of gcd.3; 6/ D 3.
```
```

      9.2.3     One Solution for All Water Jug Problems
```
```
      Corollary 9.2.3 says that 3 can be written as a linear combination of 21 and 26,
```
```
      since 3 is a multiple of gcd.21; 26/ D 1. So the Pulverizer will give us integers s
```
```
      and t such that
```
```
                                       3 D s  21 C t  26                          (9.5)
```
```
     

9.2. The Greatest Common Divisor                                                      351
```
```

   The coefficient s could be either positive or negative. However, we can readily
```
transform this linear combination into an equivalent linear combination
```

                                   3 D s 0  21 C t 0  26                          (9.6)
```

where the coefficient s 0 is positive. The trick is to notice that if in equation (9.5) we
increase s by 26 and decrease t by 21, then the value of the expression s  21 C t  26
is unchanged overall. Thus, by repeatedly increasing the value of s (by 26 at a
time) and decreasing the value of t (by 21 at a time), we get a linear combination
s 0  21 C t 0  26 D 3 where the coefficient s 0 is positive. (Of course t 0 must then be
negative; otherwise, this expression would be much greater than 3.)
```
    Now we can form 3 gallons using jugs with capacities 21 and 26: We simply
```
repeat the following steps s 0 times:
```

   1. Fill the 21-gallon jug.
```
```

   2. Pour all the water in the 21-gallon jug into the 26-gallon jug. If at any time
```
```
      the 26-gallon jug becomes full, empty it out, and continue pouring the 21-
```
```
      gallon jug into the 26-gallon jug.
```

At the end of this process, we must have emptied the 26-gallon jug exactly t 0
times. Here’s why: we’ve taken s 0  21 gallons of water from the fountain, and
we’ve poured out some multiple of 26 gallons. If we emptied fewer than t 0 times,
then by (9.6), the big jug would be left with at least 3 C 26 gallons, which is more
than it can hold; if we emptied it more times, the big jug would be left containing
at most 3 26 gallons, which is nonsense. But once we have emptied the 26-gallon
jug exactly t 0 times, equation (9.6) implies that there are exactly 3 gallons left.
   Remarkably, we don’t even need to know the coefficients s 0 and t 0 in order to
use this strategy! Instead of repeating the outer loop s 0 times, we could just repeat
until we obtain 3 gallons, since that must happen eventually. Of course, we have to
keep track of the amounts in the two jugs so we know when we’re done. Here’s the
```
            

## 352 Chapter 9   Number Theory
```
```

      solution using this approach starting with empty jugs, that is, at .0; 0/:
```
```
       fill 21              pour 21 into 26
```
```
           !      .21; 0/               !                                                    .0; 21/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 21/                  !      .16; 26/        ! .16; 0/                ! .0; 16/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 16/                  !      .11; 26/        ! .11; 0/                ! .0; 11/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 11/                  !      .6; 26/         !     .6; 0/             !     .0; 6/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           !      .21; 6/              !      .1; 26/         !     .1; 0/             !     .0; 1/
```
```
       fill 21              pour 21 to 26
```
```
           !      .21; 1/              !                                                     .0; 22/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 22/                  !      .17; 26/        ! .17; 0/                ! .0; 17/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 17/                  !      .12; 26/        ! .12; 0/                ! .0; 12/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 12/                  !      .7; 26/         !     .7; 0/             !     .0; 7/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           !      .21; 7/              !      .2; 26/         !     .2; 0/             !     .0; 2/
```
```
       fill 21              pour 21 to 26
```
```
           !      .21; 2/              !                                                     .0; 23/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 23/                  !      .18; 26/        ! .18; 0/                ! .0; 18/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 18/                  !      .13; 26/        ! .13; 0/                ! .0; 13/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           ! .21; 13/                  !      .8; 26/         !     .8; 0/             !     .0; 8/
```
```
       fill 21              pour 21 to 26                empty 26            pour 21 to 26
```
```
           !      .21; 8/              !      .3; 26/         !     .3; 0/             !     .0; 3/
```
```

        The same approach works regardless of the jug capacities and even regardless of
```
```
      the amount we’re trying to produce! Simply repeat these two steps until the desired
```
```
      amount of water is obtained:
```
```

         1. Fill the smaller jug.
```
```

         2. Pour all the water in the smaller jug into the larger jug. If at any time the
```
```
            larger jug becomes full, empty it out, and continue pouring the smaller jug
```
```
            into the larger jug.
```
```

      By the same reasoning as before, this method eventually generates every multiple—
```
```
      up to the size of the larger jug—of the greatest common divisor of the jug capacities,
```
```
      all the quantities we can possibly produce. No ingenuity is needed at all!
```
```
         So now we have the complete water jug story:
```
```

      Theorem 9.2.5. Suppose that we have water jugs with capacities a and b. For
```
```
      any c 2 Œ0::a, it is possible to get c gallons in the size a jug iff c is a multiple of
```
```
      gcd.a; b/.
```
```
                 

           9.3. Prime Mysteries                                                                353
```
```

           9.2.4     Properties of the Greatest Common Divisor
```
```
           It can help to have some basic gcd facts on hand:
```
```

           Lemma 9.2.6.
```
```

           a) gcd.ka; kb/ D k  gcd.a; b/ for all k > 0.
```
```

           b) .d j a AND d j b/ IFF d j gcd.a; b/.
```
```

            c) If gcd.a; b/ D 1 and gcd.a; c/ D 1, then gcd.a; bc/ D 1.
```
```

           d) If a j bc and gcd.a; b/ D 1, then a j c.
```
```

              Showing how all these facts follow from Theorem 9.2.2 that gcd is a linear com-
```
```
           bination is a good exercise (Problem 9.11).
```
```
              These properties are also simple consequences of the fact that integers factor
```
```
           into primes in a unique way (Theorem 9.4.1). But we’ll need some of these facts
```
```
           to prove unique factorization in Section 9.4, so proving them by appeal to unique
```
```
           factorization would be circular.
```

### 9.3 Prime Mysteries
```
           Some of the greatest mysteries and insights in number theory concern properties of
```
```
           prime numbers:
```
```

           Definition 9.3.1. A prime is a number greater than 1 that is divisible only by itself
```
```
           and 1. A number other than 0, 1, and 1 that is not a prime is called composite.7
```
```

              Here are three famous mysteries:
```
```

           Twin Prime Conjecture There are infinitely many primes p such that p C 2 is also
```
```
                a prime.
```
```
                   In 1966, Chen showed that there are infinitely many primes p such that p C2
```
```
                   is the product of at most two primes. So the conjecture is known to be almost
```
```
                   true!
```
```

           Conjectured Inefficiency of Factoring Given the product of two large primes n D
```
```
                pq, there is no efficient procedure to recover the primes p and q. That is,
```
```
                no polynomial time procedure (see Section 3.5) is guaranteed to find p and
```
```
              7 So 0, 1, and   1 are the only integers that are neither prime nor composite.
```
```
           

## 354 Chapter 9   Number Theory
```
```

            q in a number of steps bounded by a polynomial in the length of the binary
```
```
            representation of n (not n itself). The length of the binary representation at
```
```
            most 1 C log2 n.
```
```
            The best algorithm known is the “number field sieve,” which runs in time
```
```
            proportional to:
```
```
                                                1=3       2=3
```
```
                                     e 1:9.ln n/ .ln ln n/ :
```
```
            This number grows more rapidly than any polynomial in log n and is infea-
```
```
            sible when n has 300 digits or more.
```
```
            Efficient factoring is a mystery of particular importance in computer science,
```
```
            as we’ll explain later in this chapter.
```
```

      Goldbach’s Conjecture We’ve already mentioned Goldbach’s Conjecture 1.1.6 sev-
```
```
           eral times: every even integer greater than two is equal to the sum of two
```
```
           primes. For example, 4 D 2 C 2, 6 D 3 C 3, 8 D 3 C 5, etc.
```
```
            In 1939, Schnirelman proved that every even number can be written as the
```
```
            sum of not more than 300,000 primes, which was a start. Today, we know
```
```
            that every even number is the sum of at most 6 primes.
```
```

        Primes show up erratically in the sequence of integers. In fact, their distribution
```
```
      seems almost random:
```
```

                        2; 3; 5; 7; 11; 13; 17; 19; 23; 29; 31; 37; 41; 43; : : : :
```
```

      One of the great insights about primes is that their density among the integers has
```
```
      a precise limit. Namely, let .n/ denote the number of primes up to n:
```
```

      Definition 9.3.2.
```
```
                               .n/ WWD jfp 2 Œ2::n j p is primegj:
```
```

         For example, .1/ D 0; .2/ D 1 and .10/ D 4, because 2, 3, 5, and 7 are the
```
```
      primes less than or equal to 10. Step by step,  grows erratically according to the
```
```
      erratic spacing between successive primes, but its overall growth rate is known to
```
```
      smooth out to be the same as the growth of the function n= ln n:
```
```

      Theorem 9.3.3 (Prime Number Theorem).
```
```
                                               .n/
```
```
                                           lim        D 1:
```
```
                                          n!1 n= ln n
```
```

         Thus, primes gradually taper off. As a rule of thumb, about 1 integer out of every
```
```
      ln n in the vicinity of n is a prime.
```
```
     

9.3. Prime Mysteries                                                               355
```
```

   The Prime Number Theorem was conjectured by Legendre in 1798 and proved
```
a century later by de la Vallée Poussin and Hadamard in 1896. However, after his
death, a notebook of Gauss was found to contain the same conjecture, which he
apparently made in 1791 at age 15. (You have to feel sorry for all the otherwise
“great” mathematicians who had the misfortune of being contemporaries of Gauss.)
   A proof of the Prime Number Theorem is beyond the scope of this text, but there
is a manageable proof (see Problem 9.22) of a related result that is sufficient for our
applications:

Theorem 9.3.4 (Chebyshev’s Theorem on Prime Density). For n > 1,
```
                                               n
```
```
                                   .n/ >          :
```
```
                                            3 ln n
```

A Prime for Google
In late 2004 a billboard appeared in various locations around the country:
```
                                                        
```
```
                       first 10-digit prime found
```
```
                                                             . com
```
```
                       in consecutive digits of e
```
Substituting the correct number for the expression in curly-braces produced the
URL for a Google employment page. The idea was that Google was interested in
hiring the sort of people that could and would solve such a problem.
How hard is this problem? Would you have to look through thousands or millions
or billions of digits of e to find a 10-digit prime? The rule of thumb derived from
the Prime Number Theorem says that among 10-digit numbers, about 1 in
```

                                    ln 1010  23
```

is prime. This suggests that the problem isn’t really so hard! Sure enough, the
first 10-digit prime in consecutive digits of e appears quite early:

  e D2:718281828459045235360287471352662497757247093699959574966
```
      9676277240766303535475945713821785251664274274663919320030
```
```
      599218174135966290435729003342952605956307381323286279434 : : :
```
```
                 

## 356 Chapter 9   Number Theory
```

### 9.4 The Fundamental Theorem of Arithmetic
```
           There is an important fact about primes that you probably already know: every
```
```
           positive integer number has a unique prime factorization. So every positive integer
```
```
           can be built up from primes in exactly one way. These quirky prime numbers are
```
```
           the building blocks for the integers.
```
```
              Since the value of a product of numbers is the same if the numbers appear in a
```
```
           different order, there usually isn’t a unique way to express a number as a product
```
```
           of primes. For example, there are three ways to write 12 as a product of primes:
```
```
                                       12 D 2  2  3 D 2  3  2 D 3  2  2:
```
```
           What’s unique about the prime factorization of 12 is that any product of primes
```
```
           equal to 12 will have exactly one 3 and two 2’s. This means that if we sort the
```
```
           primes by size, then the product really will be unique.
```
```
              Let’s state this more carefully. A sequence of numbers is weakly decreasing
```
```
           when each number in the sequence is at least as big as the numbers after it. Note
```
```
           that a sequence of just one number as well as a sequence of no numbers—the empty
```
```
           sequence—is weakly decreasing by this definition.
```
```
           Theorem 9.4.1. [Fundamental Theorem of Arithmetic] Every positive integer is a
```
```
           product of a unique weakly decreasing sequence of primes.
```
```
              For example, 75237393 is the product of the weakly decreasing sequence of
```
```
           primes
```
```
                                      23; 17; 17; 11; 7; 7; 7; 3;
```
```
           and no other weakly decreasing sequence of primes will give 75237393.8
```
```
              Notice that the theorem would be false if 1 were considered a prime; for example,
```
```
           15 could be written as 5  3, or 5  3  1, or 5  3  1  1, . . . .
```
```
              There is a certain wonder in unique factorization, especially in view of the prime
```
```
           number mysteries we’ve already mentioned. It’s a mistake to take it for granted,
```
```
           even if you’ve known it since you were in a crib. In fact, unique factorization
```
```
           actually fails for many
```
```
                               p integer-like sets of numbers, such as the complex numbers
```
```
           of the form n C m       5 for m; n 2 Z (see Problem 9.25).
```
```
              The Fundamental Theorem is also called the Unique Factorization Theorem,
```
```
           which is a more descriptive and less pretentious, name—but we really want to get
```
```
           your attention to the importance and non-obviousness of unique factorization.
```
```
              8 The “product” of just one number is defined to be that number, and the product of no numbers is
```
```

           by convention defined to be 1. So each prime p is uniquely the product of the primes in the length-
```
```
           one sequence consisting solely of p, and 1, which you will remember is not a prime, is uniquely the
```
```
           product of the empty sequence.
```
```
     

9.4. The Fundamental Theorem of Arithmetic                                        357
```

#### 9.4.1 Proving Unique Factorization
The Fundamental Theorem is not hard to prove, but we’ll need a couple of prelim-
inary facts.
Lemma 9.4.2. If p is a prime and p j ab, then p j a or p j b.
   Lemma 9.4.2 follows immediately from Unique Factorization: the primes in the
product ab are exactly the primes from a and from b. But proving the lemma this
way would be cheating: we’re going to need this lemma to prove Unique Factoriza-
tion, so it would be circular to assume it. Instead, we’ll use the properties of gcd’s
and linear combinations to give an easy, noncircular way to prove Lemma 9.4.2.

Proof. One case is if gcd.a; p/ D p. Then the claim holds, because a is a multiple
of p.
   Otherwise, gcd.a; p/ ¤ p. In this case gcd.a; p/ must be 1, since 1 and p are
the only positive divisors of p. Now gcd.a; p/ is a linear combination of a and p,
so we have 1 D sa C tp for some s; t. Then b D s.ab/ C .t b/p, that is, b is a
linear combination of ab and p. Since p divides both ab and p, it also divides their
linear combination b.                                                            

  A routine induction argument extends this statement to:
Lemma 9.4.3. Let p be a prime. If p j a1 a2    an , then p divides some ai .
  Now we’re ready to prove the Fundamental Theorem of Arithmetic.

Proof. Theorem 2.3.1 showed, using the Well Ordering Principle, that every posi-
tive integer can be expressed as a product of primes. So we just have to prove this
expression is unique. We will use Well Ordering to prove this too.
   The proof is by contradiction: assume, contrary to the claim, that there exist
positive integers that can be written as products of primes in more than one way.
By the Well Ordering Principle, there is a smallest integer with this property. Call
this integer n, and let
```

                                   n D p1  p2    pj ;
```
```
                                     D q1  q2    qk ;
```

where both products are in weakly decreasing order and p1  q1 .
  If q1 D p1 , then n=q1 would also be the product of different weakly decreasing
sequences of primes, namely,
```

                                        p2    pj ;
```
```
                                         q2    qk :
```
```
                

## 358 Chapter 9   Number Theory
```
```

                                         Figure 9.1     Alan Turing
```
```

           Since n=q1 < n, this can’t be true, so we conclude that p1 < q1 .
```
```
             Since the pi ’s are weakly decreasing, all the pi ’s are less than q1 . But
```
```

                                          q1 j n D p1  p2    pj ;
```
```

           so Lemma 9.4.3 implies that q1 divides one of the pi ’s, which contradicts the fact
```
```
           that q1 is bigger than all them.                                                 
```

### 9.5 Alan Turing
```
           The man pictured in Figure 9.1 is Alan Turing, the most important figure in the
```
```
           history of computer science. For decades, his fascinating life story was shrouded
```
```
           by government secrecy, societal taboo, and even his own deceptions.
```
```
              At age 24, Turing wrote a paper entitled On Computable Numbers, with an Ap-
```
```
           plication to the Entscheidungsproblem. The crux of the paper was an elegant way
```
```
           to model a computer in mathematical terms. This was a breakthrough, because it
```
```
           allowed the tools of mathematics to be brought to bear on questions of computation.
```
```
           For example, with his model in hand, Turing immediately proved that there exist
```
```
           problems that no computer can solve—no matter how ingenious the programmer.
```
```
           Turing’s paper is all the more remarkable because he wrote it in 1936, a full decade
```
```
     

9.5. Alan Turing                                                                 359
```

before any electronic computer actually existed.
   The word “Entscheidungsproblem” in the title refers to one of the 28 mathemat-
ical problems posed by David Hilbert in 1900 as challenges to mathematicians of
the 20th century. Turing knocked that one off in the same paper. And perhaps
you’ve heard of the “Church-Turing thesis”? Same paper. So Turing was a brilliant
guy who generated lots of amazing ideas. But this lecture is about one of Turing’s
less-amazing ideas. It involved codes. It involved number theory. And it was sort
of stupid.
   Let’s look back to the fall of 1937. Nazi Germany was rearming under Adolf
Hitler, world-shattering war looked imminent, and—like us —Alan Turing was
pondering the usefulness of number theory. He foresaw that preserving military
secrets would be vital in the coming conflict and proposed a way to encrypt com-
munications using number theory. This is an idea that has ricocheted up to our own
time. Today, number theory is the basis for numerous public-key cryptosystems,
digital signature schemes, cryptographic hash functions, and electronic payment
systems. Furthermore, military funding agencies are among the biggest investors
in cryptographic research. Sorry, Hardy!
   Soon after devising his code, Turing disappeared from public view, and half a
century would pass before the world learned the full story of where he’d gone and
what he did there. We’ll come back to Turing’s life in a little while; for now, let’s
investigate the code Turing left behind. The details are uncertain, since he never
formally published the idea, so we’ll consider a couple of possibilities.

#### 9.5.1 Turing’s Code (Version 1.0)
The first challenge is to translate a text message into an integer so we can perform
mathematical operations on it. This step is not intended to make a message harder
to read, so the details are not too important. Here is one approach: replace each
letter of the message with two digits (A D 01, B D 02, C D 03, etc.) and string all
the digits together to form one huge number. For example, the message “victory”
could be translated this way:
```
                            v     i    c    t     o    r     y
```
```
                      !    22    09   03   20    15   18    25
```
Turing’s code requires the message to be a prime number, so we may need to pad
the result with some more digits to make a prime. The Prime Number Theorem
indicates that padding with relatively few digits will work. In this case, appending
the digits 13 gives the number 2209032015182513, which is prime.
  Here is how the encryption process works. In the description below, m is the
unencoded message (which we want to keep secret), m     b is the encrypted message
(which the Nazis may intercept), and k is the key.
```
           

## 360 Chapter 9   Number Theory
```
```

      Beforehand The sender and receiver agree on a secret key, which is a large prime k.
```
```

      Encryption The sender encrypts the message m by computing:
```
```

                                               b Dmk
```
```
                                               m
```
```

      Decryption The receiver decrypts m
```
```
                                       b by computing:
```
```

                                                m
```
```
                                                b
```
```
                                                  D m:
```
```
                                                k
```
```

        For example, suppose that the secret key is the prime number k D 22801763489
```
```
      and the message m is “victory.” Then the encrypted message is:
```
```

                            b Dmk
```
```
                            m
```
```
                                  D 2209032015182513  22801763489
```
```
                                  D 50369825549820718594667857
```
```

        There are a couple of basic questions to ask about Turing’s code.
```
```

         1. How can the sender and receiver ensure that m and k are prime numbers, as
```
```
            required?
```
```
            The general problem of determining whether a large number is prime or com-
```
```
            posite has been studied for centuries, and tests for primes that worked well
```
```
            in practice were known even in Turing’s time. In the past few decades, very
```
```
            fast primality tests have been found as described in the text box below.
```
```

         2. Is Turing’s code secure?
```
```
            The Nazis see only the encrypted message m     b D m  k, so recovering the
```
```
            original message m requires factoring m b. Despite immense efforts, no really
```
```
            efficient factoring algorithm has ever been found. It appears to be a funda-
```
```
            mentally difficult problem. So, although a breakthrough someday can’t be
```
```
            ruled out, the conjecture that there is no efficient way to factor is widely
```
```
            accepted. In effect, Turing’s code puts to practical use his discovery that
```
```
            there are limits to the power of computation. Thus, provided m and k are
```
```
            sufficiently large, the Nazis seem to be out of luck!
```
```

        This all sounds promising, but there is a major flaw in Turing’s code.
```
```
     

9.5. Alan Turing                                                                      361
```

Primality Testing
It’s easy ˘ see that an integer n is prime iff it is not divisible by any number from
```
      p to
```
## 2 to     n (see Problem 1.13). Of course this naive way to test if n is prime takes
```
            p
```
more than n steps, which is exponential in the size of n measured by the number
of digits in the decimal or binary representation of n. Through the early 1970’s,
no prime testing procedure was known that would never blow up like this.
In 1974, Volker Strassen invented a simple, fast probabilistic primality test.
Strassens’s test gives the right answer when applied to any prime number, but
has some probability of giving a wrong answer on a nonprime number. However,
the probability of a wrong answer on any given number is so tiny that relying on
the answer is the best bet you’ll ever make.
Still, the theoretical possibility of a wrong answer was intellectually
bothersome—even if the probability of being wrong was a lot less than the prob-
ability of an undetectable computer hardware error leading to a wrong answer.
Finally in 2002, in a breakthrough paper beginning with a quote from Gauss em-
phasizing the importance and antiquity of primality testing, Manindra Agrawal,
Neeraj Kayal, and Nitin Saxena presented an amazing, thirteen line description of
a polynomial time primality test.
This definitively places primality testing way below the exponential effort ap-
parently needed for SAT and similar problems. The polynomial bound on the
Agrawal et al. test had degree 12, and subsequent research has reduced the de-
gree to 5, but this is still too large to be practical, and probabilistic primality tests
remain the method used in practice today. It’s plausible that the degree bound can
be reduced a bit more, but matching the speed of the known probabilistic tests
remains a daunting challenge.
```
                

## 362 Chapter 9   Number Theory
```
```

           9.5.2   Breaking Turing’s Code (Version 1.0)
```
```
           Let’s consider what happens when the sender transmits a second message using
```
```
           Turing’s code and the same key. This gives the Nazis two encrypted messages to
```
```
           look at:
```
```
                         c1 D m1  k
```
```
                         m                      and             mc2 D m2  k
```
```
           The greatest common divisor of the two encrypted messages, m       c1 and m c2 , is the
```
```
           secret key k. And, as we’ve seen, the gcd of two numbers can be computed very
```
```
           efficiently. So after the second message is sent, the Nazis can recover the secret key
```
```
           and read every message!
```
```
              A mathematician as brilliant as Turing is not likely to have overlooked such a
```
```
           glaring problem, and we can guess that he had a slightly different system in mind,
```
```
           one based on modular arithmetic.
```

### 9.6 Modular Arithmetic
```
           On the first page of his masterpiece on number theory, Disquisitiones Arithmeticae,
```
```
           Gauss introduced the notion of “congruence.” Now, Gauss is another guy who
```
```
           managed to cough up a half-decent idea every now and then, so let’s take a look
```
```
           at this one. Gauss said that a is congruent to b modulo n iff n j .a b/. This is
```
```
           written
```
```
                                             a  b .mod n/:
```
```
           For example:
```
```
                               29  15    .mod 7/     because 7 j .29    15/:
```
```
             It’s not useful to allow a moduli n  0, and so we will assume from now on that
```
```
           moduli are positive.
```
```
             There is a close connection between congruences and remainders:
```
```

           Lemma 9.6.1 (Remainder).
```
```

                             ab       .mod n/ iff    rem.a; n/ D rem.b; n/:
```
```

           Proof. By the Division Theorem 9.1.4, there exist unique pairs of integers q1 ; r1
```
```
           and q2 ; r2 such that:
```
```

                                              a D q1 n C r1
```
```
                                              b D q2 n C r2 ;
```
```
      

9.6. Modular Arithmetic                                                                            363
```

where r1 ; r2 2 [0..n). Subtracting the second equation from the first gives:
```

                              a    b D .q1       q2 /n C .r1       r2 /;
```

where r1 r2 is in the interval . n; n/. Now a  b .mod n/ if and only if n
divides the left-hand side of this equation. This is true if and only if n divides
the right-hand side, which holds if and only if r1 r2 is a multiple of n. But the
only multiple of n in . n; n/ is 0, so r1 r2 must in fact equal 0, that is, when
r1 WWD rem.a; n/ D r2 WWD rem.b; n/.                                            

  So we can also see that
```

           29  15        .mod 7/        because rem.29; 7/ D 1 D rem.15; 7/:
```

Notice that even though “(mod 7)” appears on the end, the  symbol isn’t any more
strongly associated with the 15 than with the 29. It would probably be clearer to
write 29 mod 7 15, for example, but the notation with the modulus at the end is
firmly entrenched, and we’ll just live with it.
   The Remainder Lemma 9.6.1 explains why the congruence relation has proper-
ties like an equality relation. In particular, the following properties9 follow imme-
diately:

Lemma 9.6.2.
```

                                                    aa        .mod n/                  (reflexivity)
```
```
                                         a  b IFF b  a       .mod n/                  (symmetry)
```
```
             .a  b AND b  c/ IMPLIES a  c                   .mod n/                 (transitivity)
```

  We’ll make frequent use of another immediate corollary of the Remainder Lemma 9.6.1:

Corollary 9.6.3.
```
                                  a  rem.a; n/         .mod n/
```
```

   Still another way to think about congruence modulo n is that it defines a partition
```
of the integers into n sets so that congruent numbers are all in the same set. For
example, suppose that we’re working modulo 3. Then we can partition the integers
into 3 sets as follows:
```
                     f :::;         6;      3; 0; 3; 6; 9; : : :               g
```
```
                     f :::;         5;      2; 1; 4; 7; 10; : : :              g
```
```
                     f :::;         4;      1; 2; 5; 8; 11; : : :              g
```
   9 Binary relations with these properties are called equivalence relations, see Section 10.10.
```
                

## 364 Chapter 9   Number Theory
```
```

           according to whether their remainders on division by 3 are 0, 1, or 2. The upshot
```
```
           is that when arithmetic is done modulo n, there are really only n different kinds
```
```
           of numbers to worry about, because there are only n possible remainders. In this
```
```
           sense, modular arithmetic is a simplification of ordinary arithmetic.
```
```
              The next most useful fact about congruences is that they are preserved by addi-
```
```
           tion and multiplication:
```
```

           Lemma 9.6.4 (Congruence). If a  b .mod n/ and c  d .mod n/, then
```
```

                                       aCc bCd           .mod n/;                           (9.7)
```
```
                                          ac  bd     .mod n/:                               (9.8)
```
```

           Proof. Let’s start with 9.7. Since a  b .mod n/, we have by definition that
```
```
           n j .b a/ D .b C c/ .a C c/, so
```
```

                                       aCc bCc           .mod n/:
```
```

           Since c  d .mod n/, the same reasoning leads to
```
```

                                       bCc bCd           .mod n/:
```
```

           Now transitivity (Lemma 9.6.2) gives
```
```

                                       aCc bCd           .mod n/:
```
```

             The proof for 9.8 is virtually identical, using the fact that if n divides .b    a/,
```
```
           then it certainly also divides .bc ac/.                                             
```

### 9.7 Remainder Arithmetic
```
           The Congruence Lemma 9.6.1 says that two numbers are congruent iff their remain-
```
```
           ders are equal, so we can understand congruences by working out arithmetic with
```
```
           remainders. And if all we want is the remainder modulo n of a series of additions,
```
```
           multiplications, subtractions applied to some numbers, we can take remainders at
```
```
           every step so that the entire computation only involves number in the range [0..n).
```
```
     

9.7. Remainder Arithmetic                                                           365
```

General Principle of Remainder Arithmetic
To find the remainder on division by n of the result of a series of additions and
multiplications, applied to some integers
```

      replace each integer operand by its remainder on division by n,
```
```

      keep each result of an addition or multiplication in the range [0..n) by im-
```
```
       mediately replacing any result outside that range by its remainder on divi-
```
```
       sion by n.
```

  For example, suppose we want to find
```

               rem..444273456789 C 155558585555 /4036666666 ; 36/:                (9.9)
```

This looks really daunting if you think about computing these large powers and
then taking remainders. For example, the decimal representation of 444273456789
has about 20 million digits, so we certainly don’t want to go that route. But re-
membering that integer exponents specify a series of multiplications, we follow the
General Principle and replace the numbers being multiplied by their remainders.
Since rem.44427; 36/ D 3; rem.15555858; 36/ D 6, and rem.403; 36/ D 7, we
find that (9.9) equals the remainder on division by 36 of
```

                            .33456789 C 65555 /76666666 :                        (9.10)
```

That’s a little better, but 33456789 has about a million digits in its decimal represen-
tation, so we still don’t want to compute that. But let’s look at the remainders of
the first few powers of 3:
```

                                   rem.3; 36/ D 3
```
```
                                  rem.32 ; 36/ D 9
```
```
                                  rem.33 ; 36/ D 27
```
```
                                  rem.34 ; 36/ D 9:
```
```

   We got a repeat of the second step, rem.32 ; 36/ after just two more steps. This
```
means means that starting at 32 , the sequence of remainders of successive powers
of 3 will keep repeating every 2 steps. So a product of an odd number of at least
three 3’s will have the same remainder on division by 36 as a product of just three
3’s. Therefore,
```
                      rem.33456789 ; 36/ D rem.33 ; 36/ D 27:
```
```
           

## 366 Chapter 9   Number Theory
```
```

      What a win!
```
```
        Powers of 6 are even easier because rem.62 ; 36/ D 0, so 0’s keep repeating after
```
```
      the second step. Powers of 7 repeat after six steps, but on the fifth step you get a 1,
```
```
      that is rem.76 ; 36/ D 1, so (9.10) successively simplifies to be the remainders of
```
```
      the following terms:
```
```

                                   .33456789 C 65555 /76666666
```
```
                                   .33 C 62  65553 /.76 /1111111
```
```
                                   .33 C 0  65553 /11111111
```
```
                                    D 27:
```
```

         Notice that it would be a disastrous blunder to replace an exponent by its re-
```
```
      mainder. The general principle applies to numbers that are operands of plus and
```
```
      times, whereas the exponent is a number that controls how many multiplications to
```
```
      perform. Watch out for this.
```
```

      9.7.1   The ring Zn
```
```
      It’s time to be more precise about the general principle and why it works. To begin,
```
```
      let’s introduce the notation Cn for doing an addition and then immediately taking
```
```
      a remainder on division by n, as specified by the general principle; likewise for
```
```
      multiplying:
```
```

                                    i Cn j WWD rem.i C j; n/;
```
```
                                      i n j WWD rem.ij; n/:
```
```

        Now the General Principle is simply the repeated application of the following
```
```
      lemma.
```
```

      Lemma 9.7.1.
```
```

                           rem.i C j; n/ D rem.i; n/ Cn rem.j; n/;                    (9.11)
```
```
                                  rem.ij; n/ D rem.i; n/ n rem.j; n/:                (9.12)
```
```

      Proof. By Corollary 9.6.3, i  rem.i; n/ and j  rem.j; n/, so by the Congru-
```
```
      ence Lemma 9.6.4
```
```

                          i C j  rem.i; n/ C rem.j; n/        .mod n/:
```
```

      By Corollary 9.6.3 again, the remainders on each side of this congruence are equal,
```
```
      which immediately gives (9.11). An identical proof applies to (9.12).           
```
```
                  

            9.8. Turing’s Code (Version 2.0)                                                                 367
```
```

               The set of integers in the range [0..n) together with the operations Cn and n is
```
```
            referred to as Zn , the ring of integers modulo n. As a consequence of Lemma 9.7.1,
```
```
            the familiar rules of arithmetic hold in Zn , for example:
```
```
                                               .i n j / n k D i n .j n k/:
```
```
              These subscript-n’s on arithmetic operations really clog things up, so instead
```
```
            we’ll just write “(Zn )” on the side to get a simpler looking equation:
```
```
                                            .i  j /  k D i  .j  k/ .Zn /:
```
```
               In particular, all of the following equalities10 are true in Zn :
```
```
                           .i  j /  k D i  .j  k/                        (associativity of );
```
```
                        .i C j / C k D i C .j C k/                          (associativity of C);
```
```
                                 1k Dk                                           (identity for );
```
```
                               0Ck Dk                                            (identity for C);
```
```
                           k C . k/ D 0                                          (inverse for C);
```
```
                                i Cj Dj Ci                                (commutativity of C)
```
```
                         i  .j C k/ D .i  j / C .i  k/                         (distributivity);
```
```
                                 i j Dj i                                 (commutativity of )
```
```

              Associativity implies the familiar fact that it’s safe to omit the parentheses in
```
```
            products:
```
```
                                           k1  k2      km
```
```
            comes out the same in Zn no matter how it is parenthesized.
```
```
              The overall theme is that remainder arithmetic is a lot like ordinary arithmetic.
```
```
            But there are a couple of exceptions we’re about to examine.
```

### 9.8 Turing’s Code (Version 2.0)
```
            In 1940, France had fallen before Hitler’s army, and Britain stood alone against
```
```
            the Nazis in western Europe. British resistance depended on a steady flow of sup-
```
```
               10 A set with addition and multiplication operations that satisfy these equalities is known as a
```
```

            commutative ring. In addition to Zn , the integers, rationals, reals, and polynomials with integer
```
```
            coefficients are all examples of commutative rings. On the other hand, the set fT; Fg of truth values
```
```
            with OR for addition and AND for multiplication is not a commutative ring because it fails to satisfy
```
```
            one of these equalities. The n  n matrices of integers are not a commutative ring because they fail
```
```
            to satisfy another one of these equalities.
```
```
           

## 368 Chapter 9   Number Theory
```
```

      plies brought across the north Atlantic from the United States by convoys of ships.
```
```
      These convoys were engaged in a cat-and-mouse game with German “U-boats”
```
```
      —submarines—which prowled the Atlantic, trying to sink supply ships and starve
```
```
      Britain into submission. The outcome of this struggle pivoted on a balance of in-
```
```
      formation: could the Germans locate convoys better than the Allies could locate
```
```
      U-boats, or vice versa?
```
```
         Germany lost.
```
```
         A critical reason behind Germany’s loss was not made public until 1974: Ger-
```
```
      many’s naval code, Enigma, had been broken by the Polish Cipher Bureau,11 and
```
```
      the secret had been turned over to the British a few weeks before the Nazi invasion
```
```
      of Poland in 1939. Throughout much of the war, the Allies were able to route con-
```
```
      voys around German submarines by listening in to German communications. The
```
```
      British government didn’t explain how Enigma was broken until 1996. When the
```
```
      story was finally released (by the US), it revealed that Alan Turing had joined the
```
```
      secret British codebreaking effort at Bletchley Park in 1939, where he became the
```
```
      lead developer of methods for rapid, bulk decryption of German Enigma messages.
```
```
      Turing’s Enigma deciphering was an invaluable contribution to the Allied victory
```
```
      over Hitler.
```
```
         Governments are always tight-lipped about cryptography, but the half-century
```
```
      of official silence about Turing’s role in breaking Enigma and saving Britain may
```
```
      be related to some disturbing events after the war—more on that later. Let’s get
```
```
      back to number theory and consider an alternative interpretation of Turing’s code.
```
```
      Perhaps we had the basic idea right (multiply the message by the key), but erred in
```
```
      using conventional arithmetic instead of modular arithmetic. Maybe this is what
```
```
      Turing meant:
```
```

      Beforehand The sender and receiver agree on a large number n, which may be
```
```
           made public. (This will be the modulus for all our arithmetic.) As in Version
```
```
           1.0, they also agree that some prime number k < n will be the secret key.
```
```

      Encryption As in Version 1.0, the message m should be another prime in [0..n).
```
```
           The sender encrypts the message m to produce m b by computing mk, but this
```
```
           time modulo n:
```
```
                                       mb WWD m  k .Zn /                     (9.13)
```
```

      Decryption (Uh-oh.)
```
```

        The decryption step is a problem. We might hope to decrypt in the same way as
```
```
      before by dividing the encrypted message m
```
```
                                               b by the key k. The difficulty is that m
```
```
                                                                                      b
```
```
        11 See http://en.wikipedia.org/wiki/Polish Cipher Bureau.
```
```
                  

            9.9. Multiplicative Inverses and Cancelling                                      369
```
```

            is the remainder when mk is divided by n. So dividing mb by k might not even give
```
```
            us an integer!
```
```
               This decoding difficulty can be overcome with a better understanding of when it
```
```
            is ok to divide by k in modular arithmetic.
```

### 9.9 Multiplicative Inverses and Cancelling
```
            The multiplicative inverse of a number x is another number x 1 such that
```
```

                                                     x 1  x D 1:
```
```

            From now on, when we say “inverse,” we mean multiplicative (not relational) in-
```
```
            verse.
```
```
              For example, over the rational numbers, 1=3 is, of course, an inverse of 3, since,
```
```
                                                          1
```
```
                                                             3 D 1:
```
```
                                                          3
```
```
            In fact, with the sole exception of 0, every rational number n=m has an inverse,
```
```
            namely, m=n. On the other hand, over the integers, only 1 and -1 have inverses.
```
```
            Over the ring Zn , things get a little more complicated. For example, 2 is a multi-
```
```
            plicative inverse of 8 in Z15 , since
```
```

                                                   2  8 D 1 .Z15 /:
```
```

               On the other hand, 3 does not have a multiplicative inverse in Z15 . We can prove
```
```
            this by contradiction: suppose there was an inverse j for 3, that is
```
```

                                                   1 D 3  j .Z15 /:
```
```

            Then multiplying both sides of this equality by 5 leads directly to the contradiction
```
```
            5 D 0:
```
```

                                                5 D 5  .3  j /
```
```
                                                  D .5  3/  j
```
```
                                                  D 0  j D 0 .Z15 /:
```
```

            So there can’t be any such inverse j .
```
```
                So some numbers have inverses modulo 15 and others don’t. This may seem a
```
```
            little unsettling at first, but there’s a simple explanation of what’s going on.
```
```
            

## 370 Chapter 9    Number Theory
```
```

      9.9.1     Relative Primality
```
```
      Integers that have no prime factor in common are called relatively prime.12 This
```
```
      is the same as having no common divisor (prime or not) greater than 1. It’s also
```
```
      equivalent to saying gcd.a; b/ D 1.
```
```
         For example, 8 and 15 are relatively prime, since gcd.8; 15/ D 1. On the other
```
```
      hand, 3 and 15 are not relatively prime, since gcd.3; 15/ D 3 ¤ 1. This turns out
```
```
      to explain why 8 has an inverse over Z15 and 3 does not.
```
```
      Lemma 9.9.1. If k 2 [0..n) is relatively prime to n, then k has an inverse in Zn .13
```
```
      Proof. If k is relatively prime to n, then gcd.n; k/ D 1 by definition of gcd. This
```
```
      means we can use the Pulverizer from section 9.2.2 to find a linear combination of
```
```
      n and k equal to 1:
```
```
                                          sn C t k D 1:
```
```
      So applying the General Principle of Remainder Arithmetic (Lemma 9.7.1), we get
```
```
                   .rem.s; n/  rem.n; n// C .rem.t; n/  rem.k; n// D 1 .Zn /:
```
```
      But rem.n; n/ D 0, and rem.k; n/ D k since k 2 [0..n), so we get
```
```
                                            rem.t; n/  k D 1 .Zn /:
```
```
      Thus, rem.t; n/ is a multiplicative inverse of k.                                              
```
```

         By the way, it’s nice to know that when they exist, inverses are unique. That is,
```
```
      Lemma 9.9.2. If i and j are both inverses of k in Zn , then i D j .
```
```
      Proof.
```
```
                        i D i  1 D i  .k  j / D .i  k/  j D 1  j D j .Zn /:
```
```
                                                                                                     
```
```

         So the proof of Lemma 9.9.1 shows that for any k relatively prime to n, the
```
```
      inverse of k in Zn is simply the remainder of a coefficient we can easily find using
```
```
      the Pulverizer.
```
```
         Working with a prime modulus is attractive here because, like the rational and
```
```
      real numbers, when p is prime, every nonzero number has an inverse in Zp . But
```
```
      arithmetic modulo a composite is really only a little more painful than working
```
```
      modulo a prime—though you may think this is like the doctor saying, “This is only
```
```
      going to hurt a little,” before he jams a big needle in your arm.
```
```
        12 Other texts call them coprime.
```
```
        13 This works even in the extreme case that n D 1, because 0  1 .mod 1/, so it is consistent to
```
```

      define 0 to be its own inverse in Z1 .
```
```
      

9.9. Multiplicative Inverses and Cancelling                                       371
```

#### 9.9.2 Cancellation
Another sense in which real numbers are nice is that it’s ok to cancel common
factors. In other words, if we know that t r D t s for real numbers r; s; t , then
as long as t ¤ 0, we can cancel the t’s and conclude that r D s. In general,
cancellation is not valid in Zn . For example,
```
                                     3  10 D 3  5 .Z15 /;                    (9.14)
```
but cancelling the 3’s leads to the absurd conclusion that 10 equals 5.
   The fact that multiplicative terms cannot be cancelled is the most significant way
in which Zn arithmetic differs from ordinary integer arithmetic.
Definition 9.9.3. A number k is cancellable in Zn iff
```
                           ka Dkb           implies a D b .Zn /
```
for all a; b 2 [0..n).
   If a number is relatively prime to 15, it can be cancelled by multiplying by its
inverse. So cancelling works for numbers that have inverses:
Lemma 9.9.4. If k has an inverse in Zn , then it is cancellable.
  But 3 is not relatively prime to 15, and that’s why it is not cancellable. More
generally, if k is not relatively prime to n, then we can show it isn’t cancellable in
Zn in the same way we showed that 3 is not cancellable in (9.14).
  To summarize, we have
Theorem 9.9.5. The following are equivalent for k 2 [0..n):14
```
                                   gcd.k; n/ D 1;
```
```
                                   k has an inverse in Zn ;
```
```
                                   k is cancellable in Zn :
```

#### 9.9.3 Decrypting (Version 2.0)
Multiplicative inverses are the key to decryption in Turing’s code. Specifically,
we can recover the original message by multiplying the encoded message by the
Zn -inverse j of the key:
```
                 b  j D .m  k/  j D m  .k  j / D m  1 D m .Zn /:
```
```
                 m
```
So all we need to decrypt the message is to find an inverse of the secret key k, which
will be easy using the Pulverizer—providing k has an inverse. But k is positive and
less than the modulus n, so one simple way to ensure that k is relatively prime to
the modulus is to have n be a prime number.
  14 This works even when n D 1—see the footnote following Lemma 9.9.1.
```
           

## 372 Chapter 9   Number Theory
```
```

      9.9.4   Breaking Turing’s Code (Version 2.0)
```
```
      The Germans didn’t bother to encrypt their weather reports with the highly-secure
```
```
      Enigma system. After all, so what if the Allies learned that there was rain off the
```
```
      south coast of Iceland? But amazingly, this practice provided the British with a
```
```
      critical edge in the Atlantic naval battle during 1941.
```
```
         The problem was that some of those weather reports had originally been trans-
```
```
      mitted using Enigma from U-boats out in the Atlantic. Thus, the British obtained
```
```
      both unencrypted reports and the same reports encrypted with Enigma. By com-
```
```
      paring the two, the British were able to determine which key the Germans were
```
```
      using that day and could read all other Enigma-encoded traffic. Today, this would
```
```
      be called a known-plaintext attack.
```
```
         Let’s see how a known-plaintext attack would work against Turing’s code. Sup-
```
```
      pose that the Nazis know both the plain text m and its
```
```

                                        b D m  k .Zn /;
```
```
                                        m
```
```
      and since m is positive and less than the prime n, the Nazis can use the Pulverizer
```
```
      to find the Zn -inverse j of m. Now
```
```

                       j m
```
```
                          b D j  .m  k/ D .j  m/  k D 1  k D k .Zn /:
```
```

      So by computing j  m b D k .Zn /, the Nazis get the secret key and can then decrypt
```
```
      any message!
```
```
         This is a huge vulnerability, so Turing’s hypothetical Version 2.0 code has no
```
```
      practical value. Fortunately, Turing got better at cryptography after devising this
```
```
      code; his subsequent deciphering of Enigma messages surely saved thousands of
```
```
      lives, if not the whole of Britain.
```
```

      9.9.5   Turing Postscript
```
```
      A few years after the war, Turing’s home was robbed. Detectives soon determined
```
```
      that a former homosexual lover of Turing’s had conspired in the robbery. So they
```
```
      arrested him—that is, they arrested Alan Turing—because at that time in Britain,
```
```
      homosexuality was a crime punishable by up to two years in prison. Turing was
```
```
      sentenced to a hormonal “treatment” for his homosexuality: he was given estrogen
```
```
      injections. He began to develop breasts.
```
```
         Three years later, Alan Turing, the founder of computer science, was dead. His
```
```
      mother explained what happened in a biography of her own son. Despite her re-
```
```
      peated warnings, Turing carried out chemistry experiments in his own home. Ap-
```
```
      parently, her worst fear was realized: by working with potassium cyanide while
```
```
      eating an apple, he poisoned himself.
```
```
                 

           9.10. Euler’s Theorem                                                                      373
```
```

              However, Turing remained a puzzle to the very end. His mother was a devout
```
```
           woman who considered suicide a sin. And, other biographers have pointed out,
```
```
           Turing had previously discussed committing suicide by eating a poisoned apple.
```
```
           Evidently, Alan Turing, who founded computer science and saved his country, took
```
```
           his own life in the end, and in just such a way that his mother could believe it was
```
```
           an accident.
```
```
              Turing’s last project before he disappeared from public view in 1939 involved the
```
```
           construction of an elaborate mechanical device to test a mathematical conjecture
```
```
           called the Riemann Hypothesis. This conjecture first appeared in a sketchy paper by
```
```
           Bernhard Riemann in 1859 and is now one of the most famous unsolved problems
```
```
           in mathematics.
```

### 9.10 Euler’s Theorem
```
           The RSA cryptosystem examined in the next section, and other current schemes
```
```
           for encoding secret messages, involve computing remainders of numbers raised to
```
```
           large powers. A basic fact about remainders of powers follows from a theorem due
```
```
           to Euler about congruences.
```
```
           Definition 9.10.1. For n > 0, define
```
```

                 .n/ WWD the number of integers in [0..n), that are relatively prime to n.
```
```

           This function  is known as Euler’s  function.15
```
```
              For example, .7/ D 6 because all 6 positive numbers in [0..7) are relatively
```
```
           prime to the prime number 7. Only 0 is not relatively prime to 7. Also, .12/ D 4
```
```
           since 1, 5, 7, and 11 are the only numbers in [0..12) that are relatively prime to 12.16
```
```
              More generally, if p is prime, then .p/ D p 1 since every positive number in
```
```
           [0..p ) is relatively prime to p. When n is composite, however, the  function gets
```
```
           a little complicated. We’ll get back to it in the next section.
```
```
              Euler’s Theorem is traditionally stated in terms of congruence:
```
```
           Theorem (Euler’s Theorem). If n and k are relatively prime, then
```
```

                                                  k .n/  1    .mod n/:                            (9.15)
```
```

             Things get simpler when we rephrase Euler’s Theorem in terms of Zn .
```
```
             15 Some texts call it Euler’s totient function.
```
```
             16 Also, .1/ D 1, but since we make no use of this fact, it only merits a footnote.
```
```
           

## 374 Chapter 9   Number Theory
```
```

      The Riemann Hypothesis
```
```
      The formula for the sum of an infinite geometric series says:
```
```
                                                                          1
```
```
                                  1 C x C x2 C x3 C    D                       :
```
```
                                                                      1       x
```
```
      Substituting x D 21s , x D 31s , x D 51s , and so on for each prime number gives a
```
```
      sequence of equations:
```
```
                                1    1    1                                   1
```
```
                            1C   s
```
```
                                   C 2s C 3s C    D
```
```
                               2    2    2             1                      1=2s
```
```
                                1    1    1                                   1
```
```
                            1 C s C 2s C 3s C    D
```
```
                               3    3    3             1                      1=3s
```
```
                                1    1    1                                   1
```
```
                            1 C s C 2s C 3s C    D
```
```
                               5    5    5             1                      1=5s
```
```
                                                    ::
```
```
                                                     :
```
```

      Multiplying together all the left-hand sides and all the right-hand sides gives:
```
```
                                  1                                          
```
```
                                  X 1              Y                1
```
```
                                             D                                    :
```
```
                                        ns                      1   1=p s
```
```
                                  nD1            p2primes
```
```

      The sum on the left is obtained by multiplying out all the infinite series and ap-
```
```
      plying the Fundamental Theorem of Arithmetic. For example, the term 1=300s
```
```
      in the sum is obtained by multiplying 1=22s from the first equation by 1=3s in
```
```
      the second and 1=52s in the third. Riemann noted that every prime appears in the
```
```
      expression on the right. So he proposed to learn about the primes by studying
```
```
      the equivalent, but simpler expression on the left. In particular, he regarded s as
```
```
      a complex number and the left side as a function .s/. Riemann found that the
```
```
      distribution of primes is related to values of s for which .s/ D 0, which led to
```
```
      his famous conjecture:
```
```

      Definition 9.9.6. The Riemann Hypothesis: Every nontrivial zero of the zeta
```
```
      function .s/ lies on the line s D 1=2 C ci in the complex plane.
```
```

      A proof would immediately imply, among other things, a strong form of the Prime
```
```
      Number Theorem.
```
```
      Researchers continue to work intensely to settle this conjecture, as they have for
```
```
      over a century. It is another of the Millennium Problems whose solver will earn
```
```
      $1,000,000 from the Clay Institute.
```
```
      

9.10. Euler’s Theorem                                                              375
```

Definition 9.10.2. Let Zn be the integers in [0..n), that are relatively prime to n:17
```

                           Zn WWD fk 2 [0..n) j gcd.k; n/ D 1g:                (9.16)
```

  Consequently,
```
                                          .n/ D ˇZn ˇ :
```
```
                                                 ˇ ˇ
```

Theorem 9.10.3 (Euler’s Theorem for Zn ). For all k 2 Zn ,
```

                                        k .n/ D 1 .Zn /:                       (9.17)
```

  Theorem 9.10.3 will follow from two very easy lemmas.
  Let’s start by observing that Zn is closed under multiplication in Zn :

Lemma 9.10.4. If j; k 2 Zn , then j n k 2 Zn .

  There are lots of easy ways to prove this (see Problem 9.70).

Definition 9.10.5. For any element k and subset S of Zn , let
```

                                    kS WWD fk n s j s 2 Sg:
```

Lemma 9.10.6. If k 2 Zn and S  Zn , then
```

                                           jkS j D jS j:
```

Proof. Since k 2 Zn , by Theorem 9.9.5 it is cancellable. Therefore,
```

                             Œks D k t .Zn /        implies s D t:
```

So multiplying by k in Zn maps all the elements of S to distinct elements of kS ,
which implies S and kS are the same size.                                     

Corollary 9.10.7. If k 2 Zn , then
```

                                            kZn D Zn :
```

Proof. A product of elements in Zn remains in Zn by Lemma 9.10.4. So if k 2 Zn ,
then kZn  Zn . But by Lemma 9.10.6, kZn and Zn are the same size, so they must
be equal.                                                                        

  Now we can complete the proof of Euler’s Theorem 9.10.3 for Zn :
  17 Some other texts use the notation n for Z .
```
                                               n
```
```
           

## 376 Chapter 9   Number Theory
```
```

      Proof. Let
```
```
                                    P WWD k1  k2    k.n/ .Zn /
```
```
      be the product in Zn of all the numbers in Zn . Let
```
```

                           Q WWD .k  k1 /  .k  k2 /    .k  k.n/ / .Zn /
```
```

      for some k 2 Zn . Factoring out k’s immediately gives
```
```

                                         Q D k .n/ P .Zn /:
```
```

      But Q is the same as the product of the numbers in kZn , and kZn D Zn , so we
```
```
      realize that Q is the product of the same numbers as P , just in a different order.
```
```
      Altogether, we have
```
```
                                   P D Q D k .n/ P .Zn /:
```
```
      Furthermore, P 2 Zn by Lemma 9.10.4, and so it can be cancelled from both sides
```
```
      of this equality, giving
```
```
                                   1 D k .n/ .Zn /:
```
```
                                                                                        
```
```

         Euler’s theorem offers another way to find inverses modulo n: if k is relatively
```
```
      prime to n, then k .n/ 1 is a Zn -inverse of k, and we can compute this power of
```
```
      k efficiently using fast exponentiation. However, this approach requires computing
```
```
      .n/. In the next section, we’ll show that computing .n/ is easy if we know the
```
```
      prime factorization of n. But we know that finding the factors of n is generally hard
```
```
      to do when n is large, and so the Pulverizer remains the best approach to computing
```
```
      inverses modulo n.
```
```

      Fermat’s Little Theorem
```
```
      For the record, we mention a famous special case of Euler’s Theorem that was
```
```
      known to Fermat a century earlier.
```
```

      Corollary 9.10.8 (Fermat’s Little Theorem). Suppose p is a prime and k is not a
```
```
      multiple of p. Then
```
```
                                  k p 1  1 .mod p/:
```
```

      9.10.1      Computing Euler’s  Function
```
```
      RSA works using arithmetic modulo the product of two large primes, so we begin
```
```
      with an elementary explanation of how to compute .pq/ for primes p and q:
```
```
     

9.10. Euler’s Theorem                                                                  377
```

Lemma 9.10.9.
```
                               .pq/ D .p         1/.q      1/
```
for primes p ¤ q.
Proof. Since p and q are prime, any number that is not relatively prime to pq must
be a multiple of p or a multiple of q. Among the pq numbers in [0..pq ), there are
precisely q multiples of p and p multiples of q. Since p and q are relatively prime,
the only number in [0..pq ) that is a multiple of both p and q is 0. Hence, there are
p C q 1 numbers in [0..pq ) that are not relatively prime to pq. This means that
```

                              .pq/ D pq         .p C q          1/
```
```
                                        D .p    1/.q       1/;
```

as claimed.
```
                                                                                       
```

  The following theorem provides a way to calculate .n/ for arbitrary n.
Theorem 9.10.10.
  (a) If p is a prime, then
```
                                                      
```
```
                                  k       k        1
```
```
                           .p / D p 1                     D pk       pk 1
```
```
                                                   p
```
```
      for k  1.
```
  (b) If a and b are relatively prime, then .ab/ D .a/.b/.
  Here’s an example of using Theorem 9.10.10 to compute .300/:
```

      .300/ D .22  3  52 /
```
```
               D .22 /  .3/  .52 /                     (by Theorem 9.10.10.(b))
```
```
               D .22    21 /.31       30 /.52   51 /        (by Theorem 9.10.10.(a))
```
```
               D 80:
```
```

   Note that Lemma 9.10.9 also follows as a special case of Theorem 9.10.10.(b),
```
since we know that .p/ D p 1 for any prime p.
   To prove Theorem 9.10.10.(a), notice that every pth number among the p k num-
bers in [0..p k ) is divisible by p, and only these are divisible by p. So 1=p of these
numbers are divisible by p and the remaining ones are not. That is,
```
                                                                
```
```
                            k      k            k     k        1
```
```
                       .p / D p        .1=p/p D p 1               :
```
```
                                                               p
```
```
                

## 378 Chapter 9   Number Theory
```
```

           We’ll leave a proof of Theorem 9.10.10.(b) to Problem 9.64.
```
```
            As a consequence of Theorem 9.10.10, we have
```
```

           Corollary 9.10.11. For any number n, if p1 , p2 , . . . , pj are the (distinct) prime
```
```
           factors of n, then
```
```
                                                                      
```
```
                                          1            1                 1
```
```
                              .n/ D n 1        1            1             :
```
```
                                         p1          p2                 pj
```
```
                                               e
```
```
           Proof. Suppose n D p1e1 p2e2    pj j . Then
```
```
                                           e
```
```
           .n/ D .p1e1 /.p2e2 /    .pj j /                              (by Theorem 9.10.10.(b));
```
```
                                                                     
```
```
                              1                   1           e         1
```
```
                D p1e1 1            p2e2 1                pj j 1            (by Theorem 9.10.10.(a));
```
```
                             p1                   p2                   pj
```
```
                                                                        
```
```
                    e1 e2       ej           1              1              1
```
```
                D p1 p2    pj 1                  1             1
```
```
                                            p1             p2             pj
```
```
                                                           
```
```
                           1              1                  1
```
```
                Dn 1               1             1             :
```
```
                          p1              p2                pj
```
```

                                                                                               
```

### 9.11 RSA Public Key Encryption
```
           Turing’s code did not work as he hoped. However, his essential idea—using num-
```
```
           ber theory as the basis for cryptography—succeeded spectacularly in the decades
```
```
           after his death.
```
```
              In 1977, Ronald Rivest, Adi Shamir, and Leonard Adleman at MIT proposed a
```
```
           highly secure cryptosystem, called RSA, based on number theory. The purpose of
```
```
           the RSA scheme is to transmit secret messages over public communication chan-
```
```
           nels. As with Turing’s codes, the messages transmitted are nonnegative integers of
```
```
           some fixed size.
```
```
              Moreover, RSA has a major advantage over traditional codes: the sender and
```
```
           receiver of an encrypted message need not meet beforehand to agree on a secret key.
```
```
           Rather, the receiver has both a private key, which they guard closely, and a public
```
```
           key, which they distribute as widely as possible. A sender wishing to transmit a
```
```
           secret message to the receiver encrypts their message using the receiver’s widely-
```
```
           distributed public key. The receiver can then decrypt the received message using
```
```
           their closely held private key. The use of such a public key cryptography system
```
```
      

9.11. RSA Public Key Encryption                                                                    379
```

allows you and Amazon, for example, to engage in a secure transaction without
meeting up beforehand in a dark alley to exchange a key.
   Interestingly, RSA does not operate modulo a prime, as Turing’s hypothetical
Version 2.0 may have, but rather modulo the product of two large primes—typically
primes that are hundreds of digits long. Also, instead of encrypting by multiplica-
tion with a secret key, RSA exponentiates to a secret power—which is why Euler’s
Theorem is central to understanding RSA.
   The scheme for RSA public key encryption appears in the box.
   If the message m is relatively prime to n, then a simple application of Euler’s
Theorem implies that this way of decoding the encrypted message indeed repro-
duces the original unencrypted message. In fact, the decoding always works—even
in (the highly unlikely) case that m is not relatively prime to n. The details are
worked out in Problem 9.85.
   Why is RSA thought to be secure? It would be easy to figure out the private
key d if you knew p and q—you could do it the same way the Receiver does using
the Pulverizer. But assuming the conjecture that it is hopelessly hard to factor a
number that is the product of two primes with hundreds of digits, an effort to factor
n is not going to break RSA.
   Could there be another approach to reverse engineer the private key d from the
public key that did not involve factoring n? Not really. It turns out that given just
the private and the public keys, it is easy to factor n18 (a proof of this is sketched
in Problem 9.87). So if we are confident that factoring is hopelessly hard, then we
can be equally confident that finding the private key just from the public key will
be hopeless.
   But even if we are confident that an RSA private key won’t be found, this doesn’t
rule out the possibility of decoding RSA messages in a way that sidesteps the pri-
vate key. It is an important unproven conjecture in cryptography that any way of
cracking RSA—not just by finding the secret key—would imply the ability to fac-
tor. This would be a much stronger theoretical assurance of RSA security than is
presently known.
   But the real reason for confidence is that RSA has withstood all attacks by the
world’s most sophisticated cryptographers for nearly 40 years. Despite decades of
these attacks, no significant weakness has been found—though the recommended
key-length has had to be quadrupled in response to the billion-fold increase in com-
puter speed over four decades. That’s why the mathematical, financial, and intelli-
gence communities are betting the family jewels on the security of RSA encryption.
   You can hope that with more studying of number theory, you will be the first to
  18 For this reason, the public and private keys in practice should be randomly chosen so that neither

is “too small.”
```
           

## 380 Chapter 9   Number Theory
```
```

      The RSA Cryptosystem
```
```
      A Receiver who wants to be able to receive secret numerical messages creates a
```
```
      private key, which they keep secret, and a public key, which they make publicly
```
```
      available. Anyone with the public key can then be a Sender who can publicly
```
```
      send secret messages to the Receiver—even if they have never communicated or
```
```
      shared any information besides the public key.
```
```
      Here is how they do it:
```
```

      Beforehand The Receiver creates a public key and a private key as follows.
```
```

                  1. Generate two distinct primes, p and q. These are used to generate the
```
```
                     private key, and they must be kept hidden. (In current practice, p and
```
```
                     q are chosen to be hundreds of digits long.)
```
```
                  2. Let n WWD pq.
```
```
                  3. Select an integer e 2 [0..n) such that gcd.e; .p 1/.q 1// D 1.
```
```
                     The public key is the pair .e; n/. This should be distributed widely.
```
```
                  4. Let the private key d 2 [0..n) be the inverse of e in the ring
```
```
                     Z.p 1/.q 1/ . This private key can be found using the Pulverizer. The
```
```
                     private key d should be kept hidden!
```
```

      Encoding To transmit a message m 2 [0..n) to Receiver, a Sender uses the
```
```
           public key to encrypt m into a numerical message
```
```

                                             b WWD me .Zn /:
```
```
                                             m
```
```

                                                   m to the Receiver.
```
```
             The Sender can then publicly transmit b
```
```

                                             m back to message m using the pri-
```
```
      Decoding The Receiver decrypts message b
```
```
           vate key:
```
```
                                     mDm  bd .Zn /:
```
```
                  

            9.12. What has SAT got to do with it?                                                  381
```
```

            figure out how to factor numbers quickly and, among other things, break RSA. But
```
```
            be further warned that even Gauss worked on factoring for years without a lot to
```
```
            show for his efforts—and if you do figure it out, you might wind up confronting
```
```
            some humorless fellows working for a Federal agency in charge of security. . . .
```

### 9.12 What has SAT got to do with it?
```
            So why does society, or at least everybody’s secret codes, fall apart if there is an
```
```
            efficient test for satisfiability (SAT), as we claimed in Section 3.5? To explain this,
```
```
            remember that RSA can be managed computationally because multiplication of two
```
```
            primes is fast, but factoring a product of two primes seems to be overwhelmingly
```
```
            demanding.
```
```
               Let’s begin with the observation from Section 3.2 that a digital circuit can be
```
```
            described by a bunch of propositional formulas of about the same total size as the
```
```
            circuit. So testing circuits for satisfiability is equivalent to the SAT problem for
```
```
            propositional formulas (see Problem 3.24).
```
```
               Now designing digital multiplication circuits is completely routine. We can eas-
```
```
            ily build a digital “product checker” circuit out of AND, OR, and NOT gates with 1
```
```
            output wire and 4n digital input wires. The first n inputs are for the binary repre-
```
```
            sentation of an integer i , the next n inputs for the binary representation of an integer
```
```
            j , and the remaining 2n inputs for the binary representation of an integer k. The
```
```
            output of the circuit is 1 iff ij D k and i; j > 1. A straightforward design for such
```
```
            a product checker uses proportional to n2 gates.
```
```
               Now here’s how to factor any number m with a length 2n binary representation
```
```
            using a SAT solver. First, fix the last 2n digital inputs—the ones for the binary
```
```
            representation of k—so that k equals m.
```
```
               Next, set the first of the n digital inputs for the representation of i to be 1. Do a
```
```
            SAT test to see if there is a satisfying assignment of values for the remaining 2n 1
```
```
            inputs used for the i and j representations. That is, see if the remaining inputs for
```
```
            i and j can be filled in to cause the circuit to give output 1. If there is such an
```
```
            assignment, fix the first i -input to be 1, otherwise fix it to be 0. So now we have set
```
```
            the first i -input equal to the first digit of the binary representations of an i such that
```
```
            ij D m.
```
```
               Now do the same thing to fix the second of the n digital inputs for the represen-
```
```
            tation of i , and then third, proceeding in this way through all the n inputs for the
```
```
            number i . At this point, we have the complete n-bit binary representation of an
```
```
            i > 1 such ij D m for some j > 1. In other words, we have found an integer i
```
```
            that is a factor of m. We can now find j by dividing m by i .
```
```
                 

## 382 Chapter 9    Number Theory
```
```

              So after n SAT tests, we have factored m. This means that if SAT for digital
```
```
           circuits with 4n inputs and about n2 gates could be determined by a procedure
```
```
           taking a number of steps bounded above by a degree d polynomial in n, then 2n
```
```
           digit numbers can be factored in n times this many steps, that is, with a number of
```
```
           steps bounded by a polynomial of degree d C 1 in n. So if SAT could be solved in
```
```
           polynomial time, then so could factoring, and consequently RSA would be “easy”
```
```
           to break.
```

### 9.13 References
```
           [3], [45]
```

Problems for Section 9.1
```
           Practice Problems
```
```
           Problem 9.1.
```
```
           Prove that a linear combination of linear combinations of integers a0 ; : : : ; an is a
```
```
           linear combination of a0 ; : : : ; an .
```
```

           Class Problems
```
```
           Problem 9.2.
```
```
           A number is perfect if it is equal to the sum of its positive divisors, other than itself.
```
```
           For example, 6 is perfect, because 6 D 1 C 2 C 3. Similarly, 28 is perfect, because
```
```
           28 D 1 C 2 C 4 C 7 C 14. Explain why 2k 1 .2k 1/ is perfect when 2k 1 is
```
```
           prime.19
```
```
              19 Euclid proved this 2300 years ago.                About 250 years ago, Euler proved the
```
```
           converse:      every even perfect number is of this form (for a simple proof see
```
```
           http://primes.utm.edu/notes/proofs/EvenPerfect.html).                                  It is not known
```
```
           if there are any odd perfect numbers at all. It is also not known if there are an infinite number of even
```
```
           perfect numbers. One of the charms of number theory is that simple results like those given in this
```
```
           problem lie at the brink of the unknown.
```