---
title: "Cardinality Rules"
lang: en
---

## 15 Cardinality Rules

### 15.1 Counting One Thing by Counting Another
```
           How do you count the number of people in a crowded room? You could count
```
```
           heads, since for each person there is exactly one head. Alternatively, you could
```
```
           count ears and divide by two. Of course, you might have to adjust the calculation if
```
```
           someone lost an ear in a pirate raid or someone was born with three ears. The point
```
```
           here is that you can often count one thing by counting another, though some fudg-
```
```
           ing may be required. This is a central theme of counting, from the easiest problems
```
```
           to the hardest. In fact, we’ve already seen this technique used in Theorem 4.5.5,
```
```
           where the number of subsets of an n-element set was proved to be the same as the
```
```
           number of length-n bit-strings, by describing a bijection between the subsets and
```
```
           the bit-strings.
```
```
              The most direct way to count one thing by counting another is to find a bijection
```
```
           between them, since if there is a bijection between two sets, then the sets have the
```
```
           same size. This important fact is commonly known as the Bijection Rule. We’ve
```
```
           already seen it as the Mapping Rules bijective case (4.7).
```
```

           15.1.1     The Bijection Rule
```
```
           The Bijection Rule acts as a magnifier of counting ability; if you figure out the size
```
```
           of one set, then you can immediately determine the sizes of many other sets via
```
```
           bijections. For example, let’s look at the two sets mentioned at the beginning of
```
```
           Part III:
```
```
                 A D all ways to select a dozen donuts when five varieties are available
```
```
                 B D all 16-bit sequences with exactly 4 ones
```
```
             An example of an element of set A is:
```
```
                                 00
```
```
                                „ƒ‚…          „ƒ‚…          0„ 0 ƒ‚
```
```
                                                                 0 0 0 …0    00
```
```
                                                                            „ƒ‚…       00
```
```
                                                                                      „ƒ‚…
```
```
                                chocolate    lemon-filled       sugar       glazed        plain
```
```

           Here, we’ve depicted each donut with a 0 and left a gap between the different
```
```
           varieties. Thus, the selection above contains two chocolate donuts, no lemon-filled,
```
```
           six sugar, two glazed, and two plain. Now let’s put a 1 into each of the four gaps:
```
```
                     00
```
```
                    „ƒ‚…          1         „ƒ‚…       1    0 0 ƒ‚
```
```
                                                            „   0 0 0 …0    1    00
```
```
                                                                                „ƒ‚…         1     00
```
```
                                                                                                  „ƒ‚…
```
```
                    chocolate          lemon-filled             sugar            glazed           plain
```
```
                

## 656 Chapter 15   Cardinality Rules
```
```

           and close up the gaps:
```
```
                                                    0011000000100100 :
```
```
           We’ve just formed a 16-bit number with exactly 4 ones—an element of B!
```
```
             This example suggests a bijection from set A to set B: map a dozen donuts
```
```
           consisting of:
```
```

                         c chocolate, l lemon-filled, s sugar, g glazed, and p plain
```
```

           to the sequence:
```
```

                    „0 ƒ‚
```
```
                       : : : 0…   1   „0 ƒ‚
```
```
                                         : : : 0…     1   „0 ƒ‚
```
```
                                                             : : : 0…   1   „0 ƒ‚
```
```
                                                                               : : : 0…   1   „0 ƒ‚
```
```
                                                                                                 : : : 0…
```
```
                        c                   l                 s                 g                 p
```
```

              The resulting sequence always has 16 bits and exactly 4 ones, and thus is an
```
```
           element of B. Moreover, the mapping is a bijection: every such bit sequence comes
```
```
           from exactly one order of a dozen donuts. Therefore, jAj D jBj by the Bijection
```
```
           Rule. More generally,
```
```

           Lemma 15.1.1. The number of ways to select n donuts when k flavors are available
```
```
           is the same as the number of binary sequences with exactly n zeroes and k 1 ones.
```
```

              This example demonstrates the power of the bijection rule. We managed to prove
```
```
           that two very different sets are actually the same size—even though we don’t know
```
```
           exactly how big either one is. But as soon as we figure out the size of one set, we’ll
```
```
           immediately know the size of the other.
```
```
              This particular bijection might seem frighteningly ingenious if you’ve not seen
```
```
           it before. But you’ll use essentially this same argument over and over, and soon
```
```
           you’ll consider it routine.
```

### 15.2 Counting Sequences
```
           The Bijection Rule lets us count one thing by counting another. This suggests a
```
```
           general strategy: get really good at counting just a few things, then use bijections
```
```
           to count everything else! This is the strategy we’ll follow. In particular, we’ll get
```
```
           really good at counting sequences. When we want to determine the size of some
```
```
           other set T , we’ll find a bijection from T to a set of sequences S . Then we’ll
```
```
           use our super-ninja sequence-counting skills to determine jSj, which immediately
```
```
           gives us jT j. We’ll need to hone this idea somewhat as we go along, but that’s
```
```
           pretty much it!
```
```
     

15.2. Counting Sequences                                                             657
```

#### 15.2.1 The Product Rule
The Product Rule gives the size of a product of sets. Recall that if P1 ; P2 ; : : : ; Pn
are sets, then
```
                              P1  P2      Pn
```
is the set of all sequences whose first term is drawn from P1 , second term is drawn
from P2 and so forth.
Rule 15.2.1 (Product Rule). If P1 ; P2 ; : : : Pn are finite sets, then:
```
                     jP1  P2      Pn j D jP1 j  jP2 j    jPn j
```
  For example, suppose a daily diet consists of a breakfast selected from set B, a
lunch from set L, and a dinner from set D where:
```
                B D fpancakes; bacon and eggs; bagel; Doritosg
```
```
                L D fburger and fries; garden salad; Doritosg
```
```
                D D fmacaroni; pizza; frozen burrito; pasta; Doritosg
```
Then B LD is the set of all possible daily diets. Here are some sample elements:
```
                            .pancakes; burger and fries; pizza/
```
```
                           .bacon and eggs; garden salad; pasta/
```
```
                             .Doritos; Doritos; frozen burrito/
```
The Product Rule tells us how many different daily diets are possible:
```
                              jB  L  Dj D jBj  jLj  jDj
```
```
                                             D435
```
```
                                             D 60:
```

#### 15.2.2 Subsets of an n-element Set
The fact that there are 2n subsets of an n-element set was proved in Theorem 4.5.5
by setting up a bijection between the subsets and the length-n bit-strings. So the
original problem about subsets was tranformed into a question about sequences—
exactly according to plan! Now we can fill in the missing explanation of why there
are 2n length-n bit-strings: we can write the set of all n-bit sequences as a product
of sets:
```
                      f0; 1gn WWD f0; 1g  f0; 1g      f0; 1g :
```
```
                                  „            ƒ‚                …
```
```
                                                 n terms
```
Then Product Rule gives the answer:
```
                                jf0; 1gn j D jf0; 1gjn D 2n :
```
```
           

## 658 Chapter 15    Cardinality Rules
```
```

      15.2.3       The Sum Rule
```
```
      Bart allocates his little sister Lisa a quota of 20 crabby days, 40 irritable days,
```
```
      and 60 generally surly days. On how many days can Lisa be out-of-sorts one way
```
```
      or another? Let set C be her crabby days, I be her irritable days, and S be the
```
```
      generally surly. In these terms, the answer to the question is jC [ I [ S j. Now
```
```
      assuming that she is permitted at most one bad quality each day, the size of this
```
```
      union of sets is given by the Sum Rule:
```
```
      Rule 15.2.2 (Sum Rule). If A1 ; A2 ; : : : ; An are disjoint sets, then:
```
```

                        jA1 [ A2 [ : : : [ An j D jA1 j C jA2 j C : : : C jAn j
```
```

        Thus, according to Bart’s budget, Lisa can be out-of-sorts for:
```
```

                                    jC [ I [ S j D jC j C jI j C jS j
```
```
                                                     D 20 C 40 C 60
```
```
                                                     D 120 days
```
```

         Notice that the Sum Rule holds only for a union of disjoint sets. Finding the size
```
```
      of a union of overlapping sets is a more complicated problem that we’ll take up in
```
```
      Section 15.9.
```
```

      15.2.4       Counting Passwords
```
```
      Few counting problems can be solved with a single rule. More often, a solution is
```
```
      a flurry of sums, products, bijections, and other methods.
```
```
         For solving problems involving passwords, telephone numbers, and license plates,
```
```
      the sum and product rules are useful together. For example, on a certain computer
```
```
      system, a valid password is a sequence of between six and eight symbols. The first
```
```
      symbol must be a letter (which can be lowercase or uppercase), and the remain-
```
```
      ing symbols must be either letters or digits. How many different passwords are
```
```
      possible?
```
```
         Let’s define two sets, corresponding to valid symbols in the first and subsequent
```
```
      positions in the password.
```
```

                             F D fa; b; : : : ; z; A; B; : : : ; Zg
```
```
                              S D fa; b; : : : ; z; A; B; : : : ; Z; 0; 1; : : : ; 9g
```
```

      In these terms, the set of all possible passwords is:1
```
```

                                  .F  S 5 / [ .F  S 6 / [ .F  S 7 /
```
```
         1 The notation S 5 means S  S  S  S  S.
```
```
                

           15.3. The Generalized Product Rule                                              659
```
```

           Thus, the length-six passwords are in the set F  S 5 , the length-seven passwords
```
```
           are in F  S 6 , and the length-eight passwords are in F  S 7 . Since these sets
```
```
           are disjoint, we can apply the Sum Rule and count the total number of possible
```
```
           passwords as follows:
```
```

                    j.F  S 5 / [ .F  S 6 / [ .F  S 7 /j
```
```
                           D jF  S 5 j C jF  S 6 j C jF  S 7 j           Sum Rule
```
```
                                       5             6            7
```
```
                           D jF j  jSj C jF j  jS j C jF j  jS j      Product Rule
```
```
                           D 52  625 C 52  626 C 52  627
```
```
                            1:8  1014 different passwords:
```

### 15.3 The Generalized Product Rule
```
           In how many ways can, say, a Nobel prize, a Japan prize, and a Pulitzer prize be
```
```
           awarded to n people? This is easy to answer using our strategy of translating the
```
```
           problem about awards into a problem about sequences. Let P be the set of n people
```
```
           taking the course. Then there is a bijection from ways of awarding the three prizes
```
```
           to the set P 3 WWD P  P  P . In particular, the assignment:
```
```

              “Barack wins a Nobel, George wins a Japan, and Bill wins a Pulitzer prize”
```
```

           maps to the sequence .Barack; George; Bill/. By the Product Rule, we have jP 3 j D
```
```
           jP j3 D n3 , so there are n3 ways to award the prizes to a class of n people. Notice
```
```
           that P 3 includes triples like .Barack; Bill; Barack/ where one person wins more
```
```
           than one prize.
```
```
              But what if the three prizes must be awarded to different students? As before,
```
```
           we could map the assignment to the triple .Bill; George; Barack/ 2 P 3 . But this
```
```
           function is no longer a bijection. For example, no valid assignment maps to the
```
```
           triple .Barack; Bill; Barack/ because now we’re not allowing Barack to receive two
```
```
           prizes. However, there is a bijection from prize assignments to the set:
```
```

                          S D f.x; y; z/ 2 P 3 j x, y and z are different peopleg
```
```

           This reduces the original problem to a problem of counting sequences. Unfortu-
```
```
           nately, the Product Rule does not apply directly to counting sequences of this type
```
```
           because the entries depend on one another; in particular, they must all be different.
```
```
           However, a slightly sharper tool does the trick.
```
```
              

## 660 Chapter 15   Cardinality Rules
```
```

      Prizes for truly exceptional Coursework
```
```
      Given everyone’s hard work on this material, the instructors considered award-
```
```
      ing some prizes for truly exceptional coursework. Here are three possible prize
```
```
      categories:
```
```

      Best Administrative Critique We asserted that the quiz was closed-book. On
```
```
            the cover page, one strong candidate for this award wrote, “There is no
```
```
            book.”
```
```

      Awkward Question Award “Okay, the left sock, right sock, and pants are in
```
```
          an antichain, but how—even with assistance—could I put on all three at
```
```
          once?”
```
```

      Best Collaboration Statement Inspired by a student who wrote “I worked alone”
```
```
            on Quiz 1.
```
```

      Rule 15.3.1 (Generalized Product Rule). Let S be a set of length-k sequences. If
```
```
      there are:
```
```

           n1 possible first entries,
```
```

           n2 possible second entries for each first entry,
```
```
            ::
```
```
             :
```
```

           nk possible kth entries for each sequence of first k      1 entries,
```
```

      then:
```
```
                                       jS j D n1  n2  n3    nk
```
```

         In the awards example, S consists of sequences .x; y; z/. There are n ways to
```
```
      choose x, the recipient of prize #1. For each of these, there are n 1 ways to choose
```
```
      y, the recipient of prize #2, since everyone except for person x is eligible. For each
```
```
      combination of x and y, there are n 2 ways to choose z, the recipient of prize #3,
```
```
      because everyone except for x and y is eligible. Thus, according to the Generalized
```
```
      Product Rule, there are
```
```
                                    jS j D n  .n 1/  .n 2/
```
```
      ways to award the 3 prizes to different people.
```
```
     

15.3. The Generalized Product Rule                                                      661
```

#### 15.3.1 Defective Dollar Bills
A dollar bill is defective if some digit appears more than once in the 8-digit serial
number. If you check your wallet, you’ll be sad to discover that defective bills
are all-too-common. In fact, how common are nondefective bills? Assuming that
the digit portions of serial numbers all occur equally often, we could answer this
question by computing
```

                                         jfserial #’s with all digits differentgj
```
   fraction of nondefective bills D                                               :   (15.1)
```
                                                   jfserial numbersgj
```
Let’s first consider the denominator. Here there are no restrictions; there are 10
possible first digits, 10 possible second digits, 10 third digits, and so on. Thus, the
total number of 8-digit serial numbers is 108 by the Product Rule.
   Next, let’s turn to the numerator. Now we’re not permitted to use any digit twice.
So there are still 10 possible first digits, but only 9 possible second digits, 8 possible
third digits, and so forth. Thus, by the Generalized Product Rule, there are
```
                                                        10Š
```
```
                     10  9  8  7  6  5  4  3 D       D 1;814;400
```
```
                                                         2
```
serial numbers with all digits different. Plugging these results into Equation 15.1,
we find:
```
                                                     1;814;400
```
```
             fraction of nondefective bills D                   D 1:8144%
```
```
                                                    100;000;000
```

#### 15.3.2 A Chess Problem
In how many different ways can we place a pawn (P ), a knight (N ), and a bishop
(B) on a chessboard so that no two pieces share a row or a column? A valid con-
figuration is shown in Figure 15.1(a), and an invalid configuration is shown in Fig-
ure 15.1(b).
   First, we map this problem about chess pieces to a question about sequences.
There is a bijection from configurations to sequences
```

                                .rP ; cP ; rN ; cN ; rB ; cB /
```

where rP , rN and rB are distinct rows and cP , cN and cB are distinct columns.
In particular, rP is the pawn’s row cP is the pawn’s column rN is the knight’s
row, etc. Now we can count the number of such sequences using the Generalized
Product Rule:
```

     rP is one of 8 rows
```
```
           

## 662 Chapter 15    Cardinality Rules
```
```

               8
```
```
                 0Z0Z0Z0Z                                     8
```
```
                                                                0Z0Z0Z0Z
```
```
               7
```
```
                 Z0Z0m0Z0                                     7
```
```
                                                                Z0Z0Z0Z0
```
```
               6
```
```
                 0Z0Z0Z0Z                                     6
```
```
                                                                0Z0ZpZ0Z
```
```
               5
```
```
                 Z0Z0Z0Z0                                     5
```
```
                                                                Z0Z0Z0Z0
```
```
               4
```
```
                 0a0Z0Z0Z                                     4
```
```
                                                                0Z0Z0Z0Z
```
```
               3
```
```
                 Z0Z0Z0Z0                                     3
```
```
                                                                Z0a0ZnZ0
```
```
               2
```
```
                 0Z0Z0o0Z                                     2
```
```
                                                                0Z0Z0Z0Z
```
```
               1
```
```
                 Z0Z0Z0Z0                                     1
```
```
                                                                Z0Z0Z0Z0
```
```
                    a   b   c    d     e      f   g   h           a   b   c     d     e     f   g   h
```
```

                                (a) valid                                     (b) invalid
```
```

      Figure 15.1 Two ways of placing a pawn (p), a knight (N), and a bishop (B) on
```
```
      a chessboard. The configuration shown in (b) is invalid because the bishop and the
```
```
      knight are in the same row.
```
```

           cP is one of 8 columns
```
```
           rN is one of 7 rows (any one but rP )
```
```
           cN is one of 7 columns (any one but cP )
```
```
           rB is one of 6 rows (any one but rP or rN )
```
```
           cB is one of 6 columns (any one but cP or cN )
```
```

      Thus, the total number of configurations is .8  7  6/2 .
```
```

      15.3.3       Permutations
```
```
      A permutation of a set S is a sequence that contains every element of S exactly
```
```
      once. For example, here are all the permutations of the set fa; b; cg:
```
```

                                           .a; b; c/ .a; c; b/ .b; a; c/
```
```
                                           .b; c; a/ .c; a; b/ .c; b; a/
```
```

         How many permutations of an n-element set are there? Well, there are n choices
```
```
      for the first element. For each of these, there are n 1 remaining choices for the
```
```
      second element. For every combination of the first two elements, there are n 2
```
```
      ways to choose the third element, and so forth. Thus, there are a total of
```
```

                                     n  .n       1/  .n   2/    3  2  1 D nŠ
```
```

      permutations of an n-element set. In particular, this formula says that there are
```
```
                 

            15.4. The Division Rule                                                           663
```
```

            3Š D 6 permutations of the 3-element set fa; b; cg, which is the number we found
```
```
            above.
```
```
               Permutations will come up again in this course approximately 1.6 bazillion times.
```
```
            In fact, permutations are the reason why factorial comes up so often and why we
```
```
            taught you Stirling’s approximation:
```
```
                                                 p        n n
```
```
                                            nŠ  2 n           :
```
```
                                                           e
```

### 15.4 The Division Rule
```
            Counting ears and dividing by two is a silly way to count the number of people in
```
```
            a room, but this approach is representative of a powerful counting principle.
```
```
               A k-to-1 function maps exactly k elements of the domain to every element of
```
```
            the codomain. For example, the function mapping each ear to its owner is 2-to-1.
```
```
            Similarly, the function mapping each finger to its owner is 10-to-1, and the function
```
```
            mapping each finger and toe to its owner is 20-to-1. The general rule is:
```
```

            Rule 15.4.1 (Division Rule). If f W A ! B is k-to-1, then jAj D k  jBj.
```
```

                For example, suppose A is the set of ears in the room and B is the set of people.
```
```
            There is a 2-to-1 mapping from ears to people, so by the Division Rule, jAj D
```
```
            2  jBj. Equivalently, jBj D jAj=2, expressing what we knew all along: the number
```
```
            of people is half the number of ears. Unlikely as it may seem, many counting
```
```
            problems are made much easier by initially counting every item multiple times and
```
```
            then correcting the answer using the Division Rule. Let’s look at some examples.
```
```

            15.4.1    Another Chess Problem
```
```
            In how many different ways can you place two identical rooks on a chessboard
```
```
            so that they do not share a row or column? A valid configuration is shown in
```
```
            Figure 15.2(a), and an invalid configuration is shown in Figure 15.2(b).
```
```
              Let A be the set of all sequences
```
```

                                               .r1 ; c1 ; r2 ; c2 /
```
```

            where r1 and r2 are distinct rows and c1 and c2 are distinct columns. Let B be the
```
```
            set of all valid rook configurations. There is a natural function f from set A to set
```
```
            B; in particular, f maps the sequence .r1 ; c1 ; r2 ; c2 / to a configuration with one
```
```
            rook in row r1 , column c1 and the other rook in row r2 , column c2 .
```
```
           

## 664 Chapter 15    Cardinality Rules
```
```

               8
```
```
                 0Z0Z0Z0s                                 8
```
```
                                                            0Z0Z0Z0Z
```
```
               7
```
```
                 Z0Z0Z0Z0                                 7
```
```
                                                            Z0Z0Z0Z0
```
```
               6
```
```
                 0Z0Z0Z0Z                                 6
```
```
                                                            0Z0s0Z0Z
```
```
               5
```
```
                 Z0Z0Z0Z0                                 5
```
```
                                                            Z0Z0Z0Z0
```
```
               4
```
```
                 0Z0Z0Z0Z                                 4
```
```
                                                            0Z0Z0Z0Z
```
```
               3
```
```
                 Z0Z0Z0Z0                                 3
```
```
                                                            Z0Z0Z0Z0
```
```
               2
```
```
                 0Z0Z0Z0Z                                 2
```
```
                                                            0Z0Z0Z0Z
```
```
               1
```
```
                 s0Z0Z0Z0                                 1
```
```
                                                            Z0ZrZ0Z0
```
```
                    a   b   c    d     e    f   g   h         a   b   c     d    e      f   g   h
```
```

                                (a) valid                                 (b) invalid
```
```

      Figure 15.2 Two ways to place 2 rooks (R) on a chessboard. The configuration
```
```
      in (b) is invalid because the rooks are in the same column.
```
```

        But now there’s a snag. Consider the sequences:
```
```

                                     .1; a; 8; h/       and       .8; h; 1; a/
```
```

      The first sequence maps to a configuration with a rook in the lower-left corner and
```
```
      a rook in the upper-right corner. The second sequence maps to a configuration with
```
```
      a rook in the upper-right corner and a rook in the lower-left corner. The problem is
```
```
      that those are two different ways of describing the same configuration! In fact, this
```
```
      arrangement is shown in Figure 15.2(a).
```
```
         More generally, the function f maps exactly two sequences to every board con-
```
```
      figuration; f is a 2-to-1 function. Thus, by the quotient rule, jAj D 2  jBj. Rear-
```
```
      ranging terms gives:
```
```
                                             jAj   .8  7/2
```
```
                                      jBj D      D          :
```
```
                                              2        2
```
```
      In the second equality, we’ve computed the size of A using the General Product
```
```
      Rule just as in the earlier chess problem.
```
```

      15.4.2       Knights of the Round Table
```
```
      In how many ways can King Arthur arrange to seat his n different knights at his
```
```
      round table? A seating defines who sits where. Two seatings are considered to be
```
```
      the same arrangement if each knight sits with the same knight on his left in both
```
```
      seatings. An equivalent way to say this is that two seatings yield the same arrange-
```
```
      ment when they yield the same sequence of knights starting at knight number 1
```
```
                

           15.5. Counting Subsets                                                            665
```
```

           and going clockwise around the table. For example, the following two seatings
```
```
           determine the same arrangement:
```
```

                                    #1  k                                #
```
```
                                                                          k
```
```
                                                                          3
```
```

                              k4                k2                  k2             k4
```
```
                                    "!                                   "!
```
```
                                        k3                                k1
```
```

           A seating is determined by the sequence of knights going clockwise around the
```
```
           table starting at the top seat. So seatings correspond to permutations of the knights,
```
```
           and there are nŠ of them. For example,
```
```

                                                                    #
```
```
                                                                     k
```
```
                                                                     2
```
```

                                    .k2 ; k4 ; k1 ; k3 /   !   k3             k4
```
```
                                                                    "!
```
```
                                                                     k1
```
```

              Two seatings determine the same arrangement if they are the same when the
```
```
           table is rotated so knight 1 is at the top seat. For example with n D 4, there are 4
```
```
           different sequences that correspond to the seating arrangement:
```
```

                                    .k2 ; k4 ; k1 ; k3 /            #
```
```
                                                                     k
```
```
                                                                     1
```
```

                                    .k4 ; k1 ; k3 ; k2 /
```
```
                                                           !   k4             k3
```
```
                                    .k1 ; k3 ; k2 ; k4 /
```
```
                                                                    "!
```
```
                                    .k3 ; k2 ; k4 ; k1 /             k2
```
```

           This mapping from seating to arrangments is actually an n-to-1 function, since all n
```
```
           cyclic shifts of the sequence of knights in the seating map to the same arrangement.
```
```
           Therefore, by the division rule, the number of circular seating arrangements is:
```
```
                                       # seatings     nŠ
```
```
                                                  D      D .n 1/Š :
```
```
                                            n         n
```

### 15.5 Counting Subsets
```
           How many k-element subsets of an n-element set are there? This question arises
```
```
           all the time in various guises:
```
```
           

## 666 Chapter 15    Cardinality Rules
```
```

           In how many ways can I select 5 books from my collection of 100 to bring
```
```
            on vacation?
```
```

           How many different 13-card bridge hands can be dealt from a 52-card deck?
```
```

           In how many ways can I select 5 toppings for my pizza if there are 14 avail-
```
```
            able toppings?
```
```

        This number comes up so often that there is a special notation for it:
```
```
                  !
```
```
                n
```
```
                    WWD the number of k-element subsets of an n-element set.
```
```
                k
```
```

      The expression kn is read “n choose k.” Now we can immediately express the
```
```
                         
```
```

      answers to all three questions above:
```
```

           I can select 5 books from 100 in 100
```
```
                                                  
```
```
                                               5 ways.
```
```

           There are 52
```
```
                          
```
```
                        13 different bridge hands.
```
```

           There are 14
```
```
                          
```
```
                         5 different 5-topping pizzas, if 14 toppings are available.
```
```

      15.5.1       The Subset Rule
```
```
      We can derive a simple formula for the n choose k number using the Division Rule.
```
```
      We do this by mapping any permutation of an n-element set fa1 ; : : : ; an g into a k-
```
```
      element subset simply by taking the first k elements of the permutation. That is,
```
```
      the permutation a1 a2 : : : an will map to the set fa1 ; a2 ; : : : ; ak g.
```
```
         Notice that any other permutation with the same first k elements a1 ; : : : ; ak in
```
```
      any order and the same remaining elements n k elements in any order will also
```
```
      map to this set. What’s more, a permutation can only map to fa1 ; a2 ; : : : ; ak g
```
```
      if its first k elements are the elements a1 ; : : : ; ak in some order. Since there are
```
```
      kŠ possible permutations of the first k elements and .n k/Š permutations of the
```
```
      remaining elements, we conclude from the Product Rule that exactly kŠ.n k/Š
```
```
      permutations of the n-element set map to the particular subset S . In other words,
```
```
      the mapping from permutations to k-element subsets is kŠ.n k/Š-to-1.
```
```
         But we know there are nŠ permutations of an n-element set, so by the Division
```
```
      Rule, we conclude that                                   !
```
```
                                                             n
```
```
                                       nŠ D kŠ.n k/Š
```
```
                                                             k
```
```
      which proves:
```
```
                  

            15.6. Sequences with Repetitions                                                   667
```
```

            Rule 15.5.1 (Subset Rule). The number of k-element subsets of an n-element set is
```
```
                                             !
```
```
                                           n          nŠ
```
```
                                               D            :
```
```
                                           k     kŠ .n k/Š
```
```

              Notice that this works even for 0-element subsets: nŠ=.0Š nŠ/ D 1. Here we use
```
```
            the fact that 0Š is a product of 0 terms, which by convention2 equals 1.
```
```

            15.5.2     Bit Sequences
```
```
            How many n-bit sequences contain exactly k ones? We’ve already seen the straight-
```
```
            forward bijection between subsets of an n-element set and n-bit sequences. For
```
```
            example, here is a 3-element subset of fx1 ; x2 ; : : : ; x8 g and the associated 8-bit
```
```
            sequence:
```
```
                                f x1 ;           x4 ; x5                     g
```
```
                                . 1; 0; 0; 1; 1; 0; 0; 0 /
```
```
            Notice that this sequence has exactly 3 ones, each corresponding to an element
```
```
            of the 3-element subset. More generally, the n-bit sequences corresponding to a
```
```
            k-element subset will have exactly k ones. So by the Bijection Rule,
```
```
                                                                                     !
```
```
                                                                                   n
```
```
            Corollary 15.5.2. The number of n-bit sequences with exactly k ones is    .
```
```
                                                                                   k
```
```

              Also, the bijection between selections of flavored donuts and bit sequences of
```
```
            Lemma 15.1.1 now implies,
```
```
            Corollary 15.5.3. The number of ways to select n donuts when k > 0 flavors are
```
```
            available is                                !
```
```
                                            n C .k 1/
```
```
                                                           :
```
```
                                                 n
```

### 15.6 Sequences with Repetitions
```
            15.6.1     Sequences of Subsets
```
```
            Choosing a k-element subset of an n-element set is the same as splitting the set
```
```
            into a pair of subsets: the first subset of size k and the second subset consisting of
```
```
            the remaining n k elements. So, the Subset Rule can be understood as a rule for
```
```
            counting the number of such splits into pairs of subsets.
```
```
               2 We don’t use it here, but a sum of zero terms equals 0.
```
```
            

## 668 Chapter 15    Cardinality Rules
```
```

        We can generalize this to a way to count splits into more than two subsets. Let
```
```
      A be an n-element set and k1 ; k2 ; : : : ; km be nonnegative integers whose sum is n.
```
```
      A .k1 ; k2 ; : : : ; km /-split of A is a sequence
```
```

                                           .A1 ; A2 ; : : : ; Am /
```
```

      where the Ai are disjoint subsets of A and jAi j D ki for i D 1; : : : ; m.
```
```
         To count the number of splits we take the same approach as for the Subset
```
```
      Rule. Namely, we map any permutation a1 a2 : : : an of an n-element set A into
```
```
      a .k1 ; k2 ; : : : ; km /-split by letting the 1st subset in the split be the first k1 elements
```
```
      of the permutation, the 2nd subset of the split be the next k2 elements, . . . , and the
```
```
      mth subset of the split be the final km elements of the permutation. This map is
```
```
      a k1 Š k2 Š    km Š-to-1 function from the nŠ permutations to the .k1 ; k2 ; : : : ; km /-
```
```
      splits of A, so from the Division Rule we conclude the Subset Split Rule:
```
```

      Definition 15.6.1. For n; k1 ; : : : ; km 2 N, such that k1 Ck2 C  Ckm D n, define
```
```
      the multinomial coefficient
```
```
                                                   !
```
```
                                       n                         nŠ
```
```
                                                     WWD                      :
```
```
                              k1 ; k2 ; : : : ; km       k1 Š k2 Š : : : km Š
```
```

      Rule 15.6.2 (Subset Split Rule). The number of .k1 ; k2 ; : : : ; km /-splits of an n-
```
```
      element set is                                   !
```
```
                                              n
```
```
                                                         :
```
```
                                       k1 ; : : : ; km
```
```

      15.6.2       The Bookkeeper Rule
```
```
      We can also generalize our count of n-bit sequences with k ones to counting se-
```
```
      quences of n letters over an alphabet with more than two letters. For example,
```
```
      how many sequences can be formed by permuting the letters in the 10-letter word
```
```
      BOOKKEEPER?
```
```
         Notice that there are 1 B, 2 O’s, 2 K’s, 3 E’s, 1 P, and 1 R in BOOKKEEPER. This
```
```
      leads to a straightforward bijection between permutations of BOOKKEEPER and
```
```
      (1,2,2,3,1,1)-splits of f1; 2; : : : ; 10g. Namely, map a permutation to the sequence
```
```
      of sets of positions where each of the different letters occur.
```
```
         For example, in the permutation BOOKKEEPER itself, the B is in the 1st posi-
```
```
      tion, the O’s occur in the 2nd and 3rd positions, K’s in 4th and 5th, the E’s in the
```
```
      6th, 7th and 9th, P in the 8th, and R is in the 10th position. So BOOKKEEPER
```
```
      maps to
```
```
                              .f1g; f2; 3g; f4; 5g; f6; 7; 9g; f8g; f10g/:
```
```
      

15.6. Sequences with Repetitions                                                 669
```

From this bijection and the Subset Split Rule, we conclude that the number of ways
to rearrange the letters in the word BOOKKEEPER is:
```
                                         total letters
```
```
                                  ‚…„ƒ
```
```
                                   10Š
```
```
                         1Š „ƒ‚…
```
```
                        „ƒ‚… 2Š „ƒ‚…
```
```
                                 2Š „ƒ‚…
```
```
                                       3Š „ƒ‚…
```
```
                                           1Š „ƒ‚…
```
```
                                               1Š
```
```
                          B’s      O’s   K’s      E’s    P’s   R’s
```

  This example generalizes directly to an exceptionally useful counting principle
which we will call the

Rule 15.6.3 (Bookkeeper Rule). Let l1 ; : : : ; lm be distinct elements. The number
of sequences with k1 occurrences of l1 , and k2 occurrences of l2 , . . . , and km
occurrences of lm is                                 !
```
                            k1 C k2 C    C km
```
```
                                                       :
```
```
                                k1 ; : : : ; km
```

  For example, suppose you are planning a 20-mile walk, which should include 5
northward miles, 5 eastward miles, 5 southward miles, and 5 westward miles. How
many different walks are possible?
  There is a bijection between such walks and sequences with 5 N’s, 5 E’s, 5 S’s,
and 5 W’s. By the Bookkeeper Rule, the number of such sequences is:
```

                                            20Š
```
```
                                                 :
```
```
                                           .5Š/4
```
A Word about Words
Someday you might refer to the Subset Split Rule or the Bookkeeper Rule in front
of a roomful of colleagues and discover that they’re all staring back at you blankly.
This is not because they’re dumb, but rather because we made up the name “Book-
keeper Rule.” However, the rule is excellent and the name is apt, so we suggest
that you play through: “You know? The Bookkeeper Rule? Don’t you guys know
anything?”
   The Bookkeeper Rule is sometimes called the “formula for permutations with
indistinguishable objects.” The size k subsets of an n-element set are sometimes
called k-combinations. Other similar-sounding descriptions are “combinations with
repetition, permutations with repetition, r-permutations, permutations with indis-
tinguishable objects,” and so on. However, the counting rules we’ve taught you are
sufficient to solve all these sorts of problems without knowing this jargon, so we
won’t burden you with it.
```
           

## 670 Chapter 15    Cardinality Rules
```
```

      15.6.3       The Binomial Theorem
```
```
      Counting gives insight into one of the basic theorems of algebra. A binomial is a
```
```
      sum of two terms, such as a C b. Now consider its fourth power .a C b/4 .
```
```
        By repeatedly using distributivity of products over sums to multiply out this 4th
```
```
      power expression completely, we get
```
```

                   .a C b/4 D         aaaa   C    aaab     C   aaba   C   aabb
```
```
                                    C abaa   C    abab     C   abba   C   abbb
```
```
                                    C baaa   C    baab     C   baba   C   babb
```
```
                                    C bbaa   C    bbab     C   bbba   C   bbbb
```
```

      Notice that there is one term for every sequence of a’s and b’s. So there are 24
```
```
      terms, and the number of terms with k copies of b and n k copies of a is:
```
```
                                                       !
```
```
                                          nŠ         n
```
```
                                                 D
```
```
                                     kŠ .n k/Š       k
```
```

      by the Bookkeeper Rule. Hence, the coefficient of an k b k is kn . So for n D 4,
```
```
                                                                      
```
```

      this means:
```
```
                    !             !             !               !              !
```
```
             4    4     4 0     4     3 1      4     2 2      4     1 3      4
```
```
      .a C b/ D       a b C        a b C        a b C          a b C          a0 b 4
```
```
                  0             1              2              3              4
```
```

      In general, this reasoning gives the Binomial Theorem:
```
```

      Theorem 15.6.4 (Binomial Theorem). For all n 2 N and a; b 2 R:
```
```
                                          n
```
```
                                                 !
```
```
                                    n
```
```
                                         X     n n k k
```
```
                             .a C b/ D            a    b
```
```
                                               k
```
```
                                              kD0
```
```

         The Binomial Theorem explains why the n choose k number is called a binomial
```
```
      coefficient.
```
```
         This reasoning about binomials extends nicely to multinomials, which are sums
```
```
      of two or more terms. For example, suppose we wanted the coefficient of
```
```

                                          bo2 k 2 e 3 pr
```
```

      in the expansion of .b C o C k C e C p C r/10 . Each term in this expansion is a
```
```
      product of 10 variables where each variable is one of b, o, k, e, p or r. Now, the
```
```
      coefficient of bo2 k 2 e 3 pr is the number of those terms with exactly 1 b, 2 o’s, 2
```
```
                 

           15.7. Counting Practice: Poker Hands                                                                 671
```
```

           k’s, 3 e’s, 1 p and 1 r. And the number of such terms is precisely the number of
```
```
           rearrangements of the word BOOKKEEPER:
```
```
                                                     !
```
```
                                          10                    10Š
```
```
                                                       D                   :
```
```
                                    1; 2; 2; 3; 1; 1     1Š 2Š 2Š 3Š 1Š 1Š
```
```

           This reasoning extends to a general theorem:
```
```

           Theorem 15.6.5 (Multinomial Theorem). For all n 2 N,
```
```
                                                                                       !
```
```
                                                                            n
```
```
                                                                                        z k1 z k2    zm
```
```
                                                       X
```
```
                 .z1 C z2 C    C zm /n D                                                              km
```
```
                                                                                                            :
```
```
                                                                   k1 ; k2 ; : : : ; km 1 2
```
```
                                                  k1 ;:::;km 2N
```
```
                                                 k1 CCkm Dn
```
```

             But you’ll be better off remembering the reasoning behind the Multinomial The-
```
```
           orem rather than this cumbersome formal statement.
```

### 15.7 Counting Practice: Poker Hands
```
           Five-Card Draw is a card game in which each player is initially dealt a hand con-
```
```
           sisting of 5 cards from a deck of 52 cards.3 The number of different hands in
```
```
           Five-Card Draw is the number of 5-element subsets of a 52-element set, which is
```
```
                                             !
```
```
                                          52
```
```
                                               D 2; 598; 960:
```
```
                                           5
```
```

           Let’s get some counting practice by working out the number of hands with various
```
```
           special properties.
```
```
              3 There are 52 cards in a standard deck. Each card has a suit and a rank. There are four suits:
```
```

                                (spades)      ~ (hearts)      | (clubs)       } (diamonds)
```
```

           And there are 13 ranks, listed here from lowest to highest:
```
```

                                   Ace                                Jack   Queen   King
```
```
                                    A; 2; 3; 4; 5; 6; 7; 8; 9; J ; Q ; K :
```
```

           Thus, for example, 8~ is the 8 of hearts and A is the ace of spades.
```
```
           

## 672 Chapter 15    Cardinality Rules
```
```

      15.7.1       Hands with a Four-of-a-Kind
```
```
      A Four-of-a-Kind is a set of four cards with the same rank. How many different
```
```
      hands contain a Four-of-a-Kind? Here are a couple examples:
```
```

                                        f8; 8}; Q~; 8~; 8|g
```
```
                                        fA|; 2|; 2~; 2}; 2g
```
```

      As usual, the first step is to map this question to a sequence-counting problem. A
```
```
      hand with a Four-of-a-Kind is completely described by a sequence specifying:
```
```

         1. The rank of the four cards.
```
```

         2. The rank of the extra card.
```
```

         3. The suit of the extra card.
```
```

      Thus, there is a bijection between hands with a Four-of-a-Kind and sequences con-
```
```
      sisting of two distinct ranks followed by a suit. For example, the three hands above
```
```
      are associated with the following sequences:
```
```

                                .8; Q; ~/ $ f 8; 8}; 8~; 8|; Q~g
```
```
                                .2; A; |/ $ f2|; 2~; 2}; 2; A|g
```
```

      Now we need only count the sequences. There are 13 ways to choose the first rank,
```
```
      12 ways to choose the second rank, and 4 ways to choose the suit. Thus, by the
```
```
      Generalized Product Rule, there are 13  12  4 D 624 hands with a Four-of-a-Kind.
```
```
      This means that only 1 hand in about 4165 has a Four-of-a-Kind. Not surprisingly,
```
```
      Four-of-a-Kind is considered to be a very good poker hand!
```
```

      15.7.2       Hands with a Full House
```
```
      A Full House is a hand with three cards of one rank and two cards of another rank.
```
```
      Here are some examples:
```
```

                                        f2; 2|; 2}; J |; J }g
```
```
                                        f5}; 5|; 5~; 7~; 7|g
```
```

      Again, we shift to a problem about sequences. There is a bijection between Full
```
```
      Houses and sequences specifying:
```
```
     

15.7. Counting Practice: Poker Hands                                      673
```
```

   1. The rank of the triple, which can be chosen in 13 ways.
```
```

   2. The suits of the triple, which can be selected in 43 ways.
```
```
                                                          
```
```

   3. The rank of the pair, which can be chosen in 12 ways.
```
```

   4. The suits of the pair, which can be selected in 42 ways.
```
```
                                                        
```

The example hands correspond to sequences as shown below:
```

               .2; f; |; }g; J; f|; }g/ $ f2; 2|; 2}; J |; J }g
```
```
                .5; f}; |; ~g; 7; f~; |g/ $ f5}; 5|; 5~; 7~; 7|g
```

By the Generalized Product Rule, the number of Full Houses is:
```
                                      !         !
```
```
                                    4          4
```
```
                             13         12    :
```
```
                                    3          2
```

We’re on a roll—but we’re about to hit a speed bump.

#### 15.7.3 Hands with Two Pairs
How many hands have Two Pairs; that is, two cards of one rank, two cards of
another rank, and one card of a third rank? Here are examples:
```

                               f3}; 3; Q}; Q~; A|g
```
```
                                f9~; 9}; 5~; 5|; Kg
```

Each hand with Two Pairs is described by a sequence consisting of:
```

   1. The rank of the first pair, which can be chosen in 13 ways.
```
```

   2. The suits of the first pair, which can be selected 42 ways.
```
```
                                                           
```
```

   3. The rank of the second pair, which can be chosen in 12 ways.
```
```

   4. The suits of the second pair, which can be selected in 42 ways.
```
```
                                                               
```
```

   5. The rank of the extra card, which can be chosen in 11 ways.
```
```

   6. The suit of the extra card, which can be selected in 41 D 4 ways.
```
```
                                                             
```
```
           

## 674 Chapter 15   Cardinality Rules
```
```

      Thus, it might appear that the number of hands with Two Pairs is:
```
```
                                         !         !
```
```
                                       4          4
```
```
                                  13       12      11  4:
```
```
                                       2          2
```
```

      Wrong answer! The problem is that there is not a bijection from such sequences to
```
```
      hands with Two Pairs. This is actually a 2-to-1 mapping. For example, here are the
```
```
      pairs of sequences that map to the hands given above:
```
```

                   .3; f}; g; Q; f}; ~g; A; |/ &
```
```
                                                     f3}; 3; Q}; Q~; A|g
```
```
                   .Q; f}; ~g; 3; f}; g; A; |/ %
```
```

                   .9; f~; }g; 5; f~; |g; K; / &
```
```
                                                     f9~; 9}; 5~; 5|; Kg
```
```
                   .5; f~; |g; 9; f~; }g; K; / %
```
```

      The problem is that nothing distinguishes the first pair from the second. A pair of
```
```
      5’s and a pair of 9’s is the same as a pair of 9’s and a pair of 5’s. We avoided this
```
```
      difficulty in counting Full Houses because, for example, a pair of 6’s and a triple of
```
```
      kings is different from a pair of kings and a triple of 6’s.
```
```
         We ran into precisely this difficulty last time, when we went from counting ar-
```
```
      rangements of different pieces on a chessboard to counting arrangements of two
```
```
      identical rooks. The solution then was to apply the Division Rule, and we can do
```
```
      the same here. In this case, the Division rule says there are twice as many sequences
```
```
      as hands, so the number of hands with Two Pairs is actually:
```
```

                                     13  42  12  42  11  4
```
```
                                                     
```
```
                                                                :
```
```
                                                 2
```
```
      Another Approach
```
```
      The preceding example was disturbing! One could easily overlook the fact that the
```
```
      mapping was 2-to-1 on an exam, fail the course, and turn to a life of crime. You
```
```
      can make the world a safer place in two ways:
```
```

         1. Whenever you use a mapping f W A ! B to translate one counting problem
```
```
            to another, check that the same number of elements in A are mapped to each
```
```
            element in B. If k elements of A map to each of element of B, then apply
```
```
            the Division Rule using the constant k.
```
```

         2. As an extra check, try solving the same problem in a different way. Multiple
```
```
            approaches are often available—and all had better give the same answer!
```
```
     

15.7. Counting Practice: Poker Hands                                          675
```
```

      (Sometimes different approaches give answers that look different, but turn
```
```
      out to be the same after some algebra.)
```

  We already used the first method; let’s try the second. There is a bijection be-
tween hands with two pairs and sequences that specify:
```

   1. The ranks of the two pairs, which can be chosen in 13
```
```
                                                             
```
```
                                                            2 ways.
```
```

   2. The suits of the lower-rank pair, which can be selected in 42 ways.
```
```
                                                                   
```
```

   3. The suits of the higher-rank pair, which can be selected in 42 ways.
```
```
                                                                    
```
```

   4. The rank of the extra card, which can be chosen in 11 ways.
```
```

   5. The suit of the extra card, which can be selected in 41 D 4 ways.
```
```
                                                             
```

For example, the following sequences and hands correspond:
```

            .f3; Qg; f}; g; f}; ~g; A; |/ $ f3}; 3; Q}; Q~; A|g
```
```
            .f9; 5g; f~; |g; f~; }g; K; / $ f9~; 9}; 5~; 5|; Kg
```

Thus, the number of hands with two pairs is:
```
                               !    !        !
```
```
                            13     4       4
```
```
                                              11  4:
```
```
                             2     2       2
```

This is the same answer we got before, though in a slightly different form.

#### 15.7.4 Hands with Every Suit
How many hands contain at least one card from every suit? Here is an example of
such a hand:
```
                          f7}; K|; 3}; A~; 2g
```
Each such hand is described by a sequence that specifies:
```

   1. The ranks of the diamond, the club, the heart, and the spade, which can be
```
```
      selected in 13  13  13  13 D 134 ways.
```
```

   2. The suit of the extra card, which can be selected in 4 ways.
```
```

   3. The rank of the extra card, which can be selected in 12 ways.
```
```
                 

## 676 Chapter 15   Cardinality Rules
```
```

              For example, the hand above is described by the sequence:
```
```

                                .7; K; A; 2; }; 3/ $ f7}; K|; A~; 2; 3}g:
```
```

            Are there other sequences that correspond to the same hand? There is one more!
```
```
            We could equally well regard either the 3} or the 7} as the extra card, so this
```
```
            is actually a 2-to-1 mapping. Here are the two sequences corresponding to the
```
```
            example hand:
```
```

                               .7; K; A; 2; }; 3/ &
```
```
                                                      f7}; K|; A~; 2; 3}g
```
```
                               .3; K; A; 2; }; 7/ %
```
```

            Therefore, the number of hands with every suit is:
```
```

                                                134  4  12
```
```
                                                             :
```
```
                                                     2
```

### 15.8 The Pigeonhole Principle
```
            Here is an old puzzle:
```
```

                  A drawer in a dark room contains red socks, green socks, and blue
```
```
                  socks. How many socks must you withdraw to be sure that you have a
```
```
                  matching pair?
```
```

              For example, picking out three socks is not enough; you might end up with one
```
```
            red, one green, and one blue. The solution relies on the
```
```

            Pigeonhole Principle
```
```
                   If there are more pigeons than holes they occupy, then at least two
```
```
                   pigeons must be in the same hole.
```
```

              A rigorous statement of the Principle goes this way:
```
```

            Rule 15.8.1 (Pigeonhole Principle). If jAj > jBj, then for every total function
```
```
            f W A ! B, there exist two different elements of A that are mapped by f to the
```
```
            same element of B.
```
```
     

15.8. The Pigeonhole Principle                                                   677
```
```

   Stating the Principle this way may be less intuitive, but it should now sound
```
familiar: it is simply the contrapositive of the Mapping Rules injective case (4.6).
Here, the pigeons form set A, the pigeonholes are the set B, and f describes which
hole each pigeon occupies.
   Mathematicians have come up with many ingenious applications for the pigeon-
hole principle. If there were a cookbook procedure for generating such arguments,
we’d give it to you. Unfortunately, there isn’t one. One helpful tip, though: when
you try to solve a problem with the pigeonhole principle, the key is to clearly iden-
tify three things:
```

   1. The set A (the pigeons).
```
```

   2. The set B (the pigeonholes).
```
```

   3. The function f (the rule for assigning pigeons to pigeonholes).
```

The Pope’s Pigeonholes
The town of Orvieto in Umbria, Italy, offered a refuge for medieval popes who
might be forced to flee from Rome. It lies on top of a high plateau whose
steep cliffs protected against attackers. Over centuries the townspeople excavated
around 1200 underground rooms where vast flocks of pigeons were kept as a self-
renewing food source to enable the town to withstand long sieges. Figure 15.3
shows a typical cave wall in which dozens pigeonholes have been carved.

#### 15.8.1 Hairs on Heads
There are a number of generalizations of the pigeonhole principle. For example:
Rule 15.8.2 (Generalized Pigeonhole Principle). If jAj > k  jBj, then every total
function f W A ! B maps at least k C1 different elements of A to the same element
of B.
   For example, if you pick two people at random, surely they are extremely un-
likely to have exactly the same number of hairs on their heads. However, in the
remarkable city of Boston, Massachusetts, there is a group of three people who
have exactly the same number of hairs! Of course, there are many completely bald
people in Boston, and they all have zero hairs. But we’re talking about non-bald
people; say a person is non-bald if they have at least ten thousand hairs on their
head.
   Boston has about 500,000 non-bald people, and the number of hairs on a person’s
head is at most 200,000. Let A be the set of non-bald people in Boston, let B D
```
           

## 678 Chapter 15    Cardinality Rules
```
```

                        Figure 15.3 Pigeon holes in a cave under Orvieto.
```
```

      f10; 000; 10; 001; : : : ; 200; 000g, and let f map a person to the number of hairs on
```
```
      his or her head. Since jAj > 2jBj, the Generalized Pigeonhole Principle implies
```
```
      that at least three people have exactly the same number of hairs. We don’t know
```
```
      who they are, but we know they exist!
```
```

      15.8.2       Subsets with the Same Sum
```
```
      For your reading pleasure, we have displayed ninety 25-digit numbers in Fig-
```
```
      ure 15.4. Are there two different subsets of these 25-digit numbers that have the
```
```
      same sum? For example, maybe the sum of the last ten numbers in the first column
```
```
      is equal to the sum of the first eleven numbers in the second column?
```
```
         Finding two subsets with the same sum may seem like a silly puzzle, but solving
```
```
      these sorts of problems turns out to be useful in diverse applications such as finding
```
```
      good ways to fit packages into shipping containers and decoding secret messages.
```
```
         It turns out that it is hard to find different subsets with the same sum, which
```
```
      is why this problem arises in cryptography. But it is easy to prove that two such
```
```
      subsets exist. That’s where the Pigeonhole Principle comes in.
```
```
         Let A be the collection of all subsets of the 90 numbers in the list. Now the
```
```
      sum of any subset of numbers is at most 90  1025 , since there are only 90 numbers
```
```
      and every 25-digit number is less than 1025 . So let B be the the integer interval
```
```
      Œ0::90  1025 , and let f map each subset of numbers (in A) to its sum (in B).
```
```
         We proved that an n-element set has 2n different subsets in Section 15.2. There-
```
```
      fore:
```
```
                                    jAj D 290  1:237  1027
```
```
     

15.8. The Pigeonhole Principle                                               679
```
```

                   0020480135385502964448038   3171004832173501394113017
```
```
                   5763257331083479647409398   8247331000042995311646021
```
```
                   0489445991866915676240992   3208234421597368647019265
```
```
                   5800949123548989122628663   8496243997123475922766310
```
```
                   1082662032430379651370981   3437254656355157864869113
```
```
                   6042900801199280218026001   8518399140676002660747477
```
```
                   1178480894769706178994993   3574883393058653923711365
```
```
                   6116171789137737896701405   8543691283470191452333763
```
```
                   1253127351683239693851327   3644909946040480189969149
```
```
                   6144868973001582369723512   8675309258374137092461352
```
```
                   1301505129234077811069011   3790044132737084094417246
```
```
                   6247314593851169234746152   8694321112363996867296665
```
```
                   1311567111143866433882194   3870332127437971355322815
```
```
                   6814428944266874963488274   8772321203608477245851154
```
```
                   1470029452721203587686214   4080505804577801451363100
```
```
                   6870852945543886849147881   8791422161722582546341091
```
```
                   1578271047286257499433886   4167283461025702348124920
```
```
                   6914955508120950093732397   9062628024592126283973285
```
```
                   1638243921852176243192354   4235996831123777788211249
```
```
                   6949632451365987152423541   9137845566925526349897794
```
```
                   1763580219131985963102365   4670939445749439042111220
```
```
                   7128211143613619828415650   9153762966803189291934419
```
```
                   1826227795601842231029694   4815379351865384279613427
```
```
                   7173920083651862307925394   9270880194077636406984249
```
```
                   1843971862675102037201420   4837052948212922604442190
```
```
                   7215654874211755676220587   9324301480722103490379204
```
```
                   2396951193722134526177237   5106389423855018550671530
```
```
                   7256932847164391040233050   9436090832146695147140581
```
```
                   2781394568268599801096354   5142368192004769218069910
```
```
                   7332822657075235431620317   9475308159734538249013238
```
```
                   2796605196713610405408019   5181234096130144084041856
```
```
                   7426441829541573444964139   9492376623917486974923202
```
```
                   2931016394761975263190347   5198267398125617994391348
```
```
                   7632198126531809327186321   9511972558779880288252979
```
```
                   2933458058294405155197296   5317592940316231219758372
```
```
                   7712154432211912882310511   9602413424619187112552264
```
```
                   3075514410490975920315348   5384358126771794128356947
```
```
                   7858918664240262356610010   9631217114906129219461111
```
```
                   8149436716871371161932035   3157693105325111284321993
```
```
                   3111474985252793452860017   5439211712248901995423441
```
```
                   7898156786763212963178679   9908189853102753335981319
```
```
                   3145621587936120118438701   5610379826092838192760458
```
```
                   8147591017037573337848616   9913237476341764299813987
```
```
                   3148901255628881103198549   5632317555465228677676044
```
```
                   5692168374637019617423712   8176063831682536571306791
```

**Figure 4 Ninety 25-digit numbers. Can you find two different subsets of these**
numbers that have the same sum?
```
           

## 680 Chapter 15   Cardinality Rules
```
```

      On the other hand:
```
```
                                jBj D 90  1025 C 1  0:901  1027 :
```
```
      Both quantities are enormous, but jAj is a bit greater than jBj. This means that f
```
```
      maps at least two elements of A to the same element of B. In other words, by the
```
```
      Pigeonhole Principle, two different subsets must have the same sum!
```
```
        Notice that this proof gives no indication which two sets of numbers have the
```
```
      same sum. This frustrating variety of argument is called a nonconstructive proof.
```
```

      The $100 prize for two same-sum subsets
```
```
      To see if it was possible to actually find two different subsets of the ninety 25-digit
```
```
      numbers with the same sum, we offered a $100 prize to the first student who did it.
```
```
      We didn’t expect to have to pay off this bet, but we underestimated the ingenuity
```
```
      and initiative of the students. One computer science major wrote a program that
```
```
      cleverly searched only among a reasonably small set of “plausible” sets, sorted
```
```
      them by their sums, and actually found a couple with the same sum. He won the
```
```
      prize. A few days later, a math major figured out how to reformulate the sum
```
```
      problem as a “lattice basis reduction” problem; then he found a software package
```
```
      implementing an efficient basis reduction procedure, and using it, he very quickly
```
```
      found lots of pairs of subsets with the same sum. He didn’t win the prize, but he
```
```
      got a standing ovation from the class—staff included.
```
```

      The $500 Prize for Sets with Distinct Subset Sums
```
```
      How can we construct a set of n positive integers such that all its subsets have
```
```
      distinct sums? One way is to use powers of two:
```
```

                                           f1; 2; 4; 8; 16g
```
```

      This approach is so natural that one suspects all other such sets must involve
```
```
      larger numbers. (For example, we could safely replace 16 by 17, but not by 15.)
```
```
      Remarkably, there are examples involving smaller numbers. Here is one:
```
```

                                          f6; 9; 11; 12; 13g
```
```

      One of the top mathematicians of the Twentieth Century, Paul Erdős, conjectured
```
```
      in 1931 that there are no such sets involving significantly smaller numbers. More
```
```
      precisely, he conjectured that the largest number in such a set must be greater
```
```
      than c2n for some constant c > 0. He offered $500 to anyone who could prove
```
```
      or disprove his conjecture, but the problem remains unsolved.
```
```
     

15.8. The Pigeonhole Principle                                                    681
```

#### 15.8.3 A Magic Trick
A Magician sends an Assistant into the audience with a deck of 52 cards while the
Magician looks away.
   Five audience members each select one card from the deck. The Assistant then
gathers up the five cards and holds up four of them so the Magician can see them.
The Magician concentrates for a short time and then correctly names the secret,
fifth card!
   Since we don’t really believe the Magician can read minds, we know the Assis-
tant has somehow communicated the secret card to the Magician. Real Magicians
and Assistants are not to be trusted, so we expect that the Assistant would secretly
signal the Magician with coded phrases or body language, but for this trick they
don’t have to cheat. In fact, the Magician and Assistant could be kept out of sight
of each other while some audience member holds up the 4 cards designated by the
Assistant for the Magician to see.
   Of course, without cheating, there is still an obvious way the Assistant can com-
municate to the Magician: he can choose any of the 4Š D 24 permutations of the
## 4 cards as the order in which to hold up the cards. However, this alone won’t
quite work: there are 48 cards remaining in the deck, so the Assistant doesn’t have
enough choices of orders to indicate exactly what the secret card is (though he
could narrow it down to two cards).

#### 15.8.4 The Secret
The method the Assistant can use to communicate the fifth card exactly is a nice
application of what we know about counting and matching.
   The Assistant has a second legitimate way to communicate: he can choose which
of the five cards to keep hidden. Of course, it’s not clear how the Magician could
determine which of these five possibilities the Assistant selected by looking at the
four visible cards, but there is a way, as we’ll now explain.
   The problem facing the Magician and Assistant is actually a bipartite matching
problem. Each vertex on the left will correspond to the information available to the
Assistant, namely, a set of 5 cards. So the set X of left-hand vertices will have 525
elements.
   Each vertex on the right will correspond to the information available to the Ma-
gician, namely, a sequence of 4 distinct cards. So the set Y of right-hand vertices
will have 52  51  50  49 elements. When the audience selects a set of 5 cards, then
the Assistant must reveal a sequence of 4 cards from that hand. This constraint is
represented by having an edge between a set of 5 cards on the left and a sequence
of 4 cards on the right precisely when every card in the sequence is also in the
set. This specifies the bipartite graph. Some edges are shown in the diagram in
```
           

## 682 Chapter 15   Cardinality Rules
```
```

                                                                           yDall
```
```
                                                                      sequences of 4
```
```
                   xDall                                               distinct cards
```
```
                   sets of                                                   
```
```
                   5 cards                                                   
```
```
                                                                            
```
```
                      
```
```
                                                                  f8~;K;Q;2}g
```
```
         f8~;K;Q;2};6}g                                          fK;8~;Q;2}g
```
```
                 
```
```
                                                                  fK;8~;6};Qg
```
```
                 
```
```
                                                                         
```
```
         f8~;K;Q;9|;6}g                                                
```
```
                                                                        
```
```
                 
```
```
                 
```
```
      Figure 15.5 The bipartite graph where the nodes on the left correspond to sets
```
```
      of 5 cards and the nodes on the right correspond to sequences of 4 cards. There is
```
```
      an edge between a set and a sequence whenever all the cards in the sequence are
```
```
      contained in the set.
```
```

      Figure 15.5.
```
```
        For example,
```
```
                                       f8~; K; Q; 2}; 6}g                         (15.2)
```
```
      is an element of X on the left. If the audience selects this set of 5 cards, then
```
```
      there are many different 4-card sequences on the right in set Y that the Assis-
```
```
      tant could choose to reveal, including .8~; K; Q; 2}/, .K; 8~; Q; 2}/ and
```
```
      .K; 8~; 6}; Q/.
```
```
         What the Magician and his Assistant need to perform the trick is a matching for
```
```
      the X vertices. If they agree in advance on some matching, then when the audience
```
```
      selects a set of 5 cards, the Assistant reveals the matching sequence of 4 cards. The
```
```
      Magician uses the matching to find the audience’s chosen set of 5 cards, and so he
```
```
      can name the one not already revealed.
```
```
         For example, suppose the Assistant and Magician agree on a matching containing
```
```
      the two bold edges in Figure 15.5. If the audience selects the set
```
```

                                       f8~; K; Q; 9|; 6}g;                        (15.3)
```
```

      then the Assistant reveals the corresponding sequence
```
```

                                        .K; 8~; 6}; Q/:                           (15.4)
```
```
     

15.8. The Pigeonhole Principle                                                      683
```

Using the matching, the Magician sees that the hand (15.3) is matched to the se-
quence (15.4), so he can name the one card in the corresponding set not already
revealed, namely, the 9|. Notice that the fact that the sets are matched, that is,
that different sets are paired with distinct sequences, is essential. For example, if
the audience picked the previous hand (15.2), it would be possible for the Assistant
to reveal the same sequence (15.4), but he better not do that; if he did, then the
Magician would have no way to tell if the remaining card was the 9| or the 2}.
   So how can we be sure the needed matching can be found? The answer is that
each vertex on the left has degree 54Š D 120, since there are five ways to select the
card kept secret and there are 4Š permutations of the remaining 4 cards. In addition,
each vertex on the right has degree 48, since there are 48 possibilities for the fifth
card. So this graph is degree-constrained according to Definition 12.5.5, and so has
a matching by Theorem 12.5.6.
   In fact, this reasoning shows that the Magician could still pull off the trick if 120
cards were left instead of 48, that is, the trick would work with a deck as large as
## 124 different cards—without any magic!

#### 15.8.5 The Real Secret
But wait a minute! It’s all very well in principle to have the Magician and his
Assistant agree on a matching, but how are they supposed to remember a matching
with 525 D 2; 598; 960 edges? For the trick to work in practice, there has to be a
way to match hands and card sequences mentally and on the fly.
   We’ll describe one approach. As a running example, suppose that the audience
selects:
```
                           10~ 9} 3~ Q J }:
```
```

     The Assistant picks out two cards of the same suit. In the example, the
```
```
      assistant might choose the 3~ and 10~. This is always possible because of
```
```
      the Pigeonhole Principle—there are five cards and 4 suits so two cards must
```
```
      be in the same suit.
```
```

     The Assistant locates the ranks of these two cards on the cycle shown in Fig-
```
```
      ure 15.6. For any two distinct ranks on this cycle, one is always between 1
```
```
      and 6 hops clockwise from the other. For example, the 3~ is 6 hops clock-
```
```
      wise from the 10~.
```
```

     The more counterclockwise of these two cards is revealed first, and the other
```
```
      becomes the secret card. Thus, in our example, the 10~ would be revealed,
```
```
      and the 3~ would be the secret card. Therefore:
```
```
           

## 684 Chapter 15   Cardinality Rules
```
```

                                                    A
```
```
                                            K               2
```
```

                                    Q                               3
```
```

                                J                                       4
```
```

                                10                                      5
```
```

                                        9                       6
```
```
                                                8       7
```
```

                    Figure 15.6 The 13 card ranks arranged in cyclic order.
```
```

               – The suit of the secret card is the same as the suit of the first card re-
```
```
                 vealed.
```
```
               – The rank of the secret card is between 1 and 6 hops clockwise from the
```
```
                 rank of the first card revealed.
```
```

           All that remains is to communicate a number between 1 and 6. The Magician
```
```
            and Assistant agree beforehand on an ordering of all the cards in the deck
```
```
            from smallest to largest such as:
```
```

                               A| A} A~ A 2| 2} 2~ 2 : : : K~ K
```
```

            The order in which the last three cards are revealed communicates the num-
```
```
            ber according to the following scheme:
```
```

                                    . small; medium;   large / = 1
```
```
                                    . small;   large; medium / = 2
```
```
                                    . medium; small;   large / = 3
```
```
                                    . medium;  large;  small / = 4
```
```
                                    . large;   small; medium / = 5
```
```
                                    . large;  medium; small / = 6
```
```

            In the example, the Assistant wants to send 6 and so reveals the remaining
```
```
            three cards in large, medium, small order. Here is the complete sequence that
```
```
            the Magician sees:
```
```
                                       10~ Q J } 9}
```
```
                  

            15.9. Inclusion-Exclusion                                                         685
```
```

                 The Magician starts with the first card 10~ and hops 6 ranks clockwise to
```
```
                  reach 3~, which is the secret card!
```
```

               So that’s how the trick can work with a standard deck of 52 cards. On the other
```
```
            hand, Hall’s Theorem implies that the Magician and Assistant can in principle per-
```
```
            form the trick with a deck of up to 124 cards. It turns out that there is a method
```
```
            which they could actually learn to use with a reasonable amount of practice for a
```
```
            124-card deck, but we won’t explain it here.4
```
```

            15.8.6     The Same Trick with Four Cards?
```
```
            Suppose that the audience selects only four cards and the Assistant reveals a se-
```
```
            quence of three to the Magician. Can the Magician determine the fourth card?
```
```
              Let X be all the sets of four cards that the audience might select, and let Y be all
```
```
            the sequences of three cards that the Assistant might reveal. Now, on one hand, we
```
```
            have                                      !
```
```
                                                   52
```
```
                                          jXj D          D 270; 725
```
```
                                                    4
```
```
            by the Subset Rule. On the other hand, we have
```
```

                                          jY j D 52  51  50 D 132; 600
```
```

            by the Generalized Product Rule. Thus, by the Pigeonhole Principle, the Assistant
```
```
            must reveal the same sequence of three cards for at least
```
```
                                                      
```
```
                                              270; 725
```
```
                                                         D3
```
```
                                              132; 600
```
```

            different four-card hands. This is bad news for the Magician: if he sees that se-
```
```
            quence of three, then there are at least three possibilities for the fourth card which
```
```
            he cannot distinguish. So there is no legitimate way for the Assistant to communi-
```
```
            cate exactly what the fourth card is!
```

### 15.9 Inclusion-Exclusion
```
            How big is a union of sets? For example, suppose there are 60 math majors, 200
```
```
            EECS majors, and 40 physics majors. How many students are there in these three
```
```
               4 See The Best Card Trick by Michael Kleber for more information.
```
```
           

## 686 Chapter 15    Cardinality Rules
```
```

      departments? Let M be the set of math majors, E be the set of EECS majors, and
```
```
      P be the set of physics majors. In these terms, we’re asking for jM [ E [ P j.
```
```
         The Sum Rule says that if M , E and P are disjoint, then the sum of their sizes
```
```
      is
```
```
                              jM [ E [ P j D jM j C jEj C jP j:
```
```
      However, the sets M , E and P might not be disjoint. For example, there might be a
```
```
      student majoring in both math and physics. Such a student would be counted twice
```
```
      on the right side of this equation, once as an element of M and once as an element
```
```
      of P . Worse, there might be a triple-major5 counted three times on the right side!
```
```
         Our most-complicated counting rule determines the size of a union of sets that
```
```
      are not necessarily disjoint. Before we state the rule, let’s build some intuition by
```
```
      considering some easier special cases: unions of just two or three sets.
```
```

      15.9.1       Union of Two Sets
```
```
      For two sets, S1 and S2 , the Inclusion-Exclusion Rule is that the size of their union
```
```
      is:
```
```
                            jS1 [ S2 j D jS1 j C jS2 j jS1 \ S2 j                     (15.5)
```
```
      Intuitively, each element of S1 is accounted for in the first term, and each element
```
```
      of S2 is accounted for in the second term. Elements in both S1 and S2 are counted
```
```
      twice—once in the first term and once in the second. This double-counting is cor-
```
```
      rected by the final term.
```
```

      15.9.2       Union of Three Sets
```
```
      So how many students are there in the math, EECS, and physics departments? In
```
```
      other words, what is jM [ E [ P j if:
```
```

                                                jM j D 60
```
```
                                                 jEj D 200
```
```
                                                 jP j D 40:
```
```

      The size of a union of three sets is given by a more complicated Inclusion-Exclusion
```
```
      formula:
```
```

                      jS1 [ S2 [ S3 j D jS1 j C jS2 j C jS3 j
```
```
                                               jS1 \ S2 j     jS1 \ S3 j   jS2 \ S3 j
```
```
                                             C jS1 \ S2 \ S3 j:
```
```
        5 . . . though not at MIT anymore.
```
```
      

15.9. Inclusion-Exclusion                                                                687
```

Remarkably, the expression on the right accounts for each element in the union of
S1 , S2 and S3 exactly once. For example, suppose that x is an element of all three
sets. Then x is counted three times (by the jS1 j, jS2 j and jS3 j terms), subtracted
off three times (by the jS1 \ S2 j, jS1 \ S3 j and jS2 \ S3 j terms), and then counted
once more (by the jS1 \ S2 \ S3 j term). The net effect is that x is counted just
once.
   If x is in two sets (say, S1 and S2 ), then x is counted twice (by the jS1 j and
jS2 j terms) and subtracted once (by the jS1 \ S2 j term). In this case, x does not
contribute to any of the other terms, since x … S3 .
   So we can’t answer the original question without knowing the sizes of the various
intersections. Let’s suppose that there are:
```
                             4   math - EECS double majors
```
```
                             3   math - physics double majors
```
```
                            11   EECS - physics double majors
```
```
                             2   triple majors
```

Then jM \Ej D 4C2, jM \P j D 3C2, jE \P j D 11C2, and jM \E \P j D 2.
Plugging all this into the formula gives:
```

      jM [ E [ P j D jM j C jEj C jP j              jM \ Ej        jM \ P j   jE \ P j
```
```
                            C jM \ E \ P j
```
```
                       D 60 C 200 C 40          6     5    13 C 2
```
```
                       D 278
```

#### 15.9.3 Sequences with 42, 04, or 60
In how many permutations of the set f0; 1; 2; : : : ; 9g do either 4 and 2, 0 and 4, or
## 6 and 0 appear consecutively? For example, none of these pairs appears in:
```

                                 .7; 2; 9; 5; 4; 1; 3; 8; 0; 6/:
```

The 06 at the end doesn’t count; we need 60. On the other hand, both 04 and 60
appear consecutively in this permutation:
```

                                 .7; 2; 5; 6; 0; 4; 3; 8; 1; 9/:
```

Let P42 be the set of all permutations in which 42 appears. Define P60 and P04
similarly. Thus, for example, the permutation above is contained in both P60 and
P04 , but not P42 . In these terms, we’re looking for the size of the set P42 [ P04 [
P60 .
```
           

## 688 Chapter 15    Cardinality Rules
```
```

         First, we must determine the sizes of the individual sets, such as P60 . We can use
```
```
      a trick: group the 6 and 0 together as a single symbol. Then there is an immediate
```
```
      bijection between permutations of f0; 1; 2; : : : 9g containing 6 and 0 consecutively
```
```
      and permutations of:
```
```
                                    f60; 1; 2; 3; 4; 5; 7; 8; 9g:
```
```
      For example, the following two sequences correspond:
```
```

                      .7; 2; 5; 6; 0; 4; 3; 8; 1; 9/   ! .7; 2; 5; 60; 4; 3; 8; 1; 9/:
```
```

      There are 9Š permutations of the set containing 60, so jP60 j D 9Š by the Bijection
```
```
      Rule. Similarly, jP04 j D jP42 j D 9Š as well.
```
```
         Next, we must determine the sizes of the two-way intersections, such as P42 \
```
```
      P60 . Using the grouping trick again, there is a bijection with permutations of the
```
```
      set:
```
```
                                    f42; 60; 1; 3; 5; 7; 8; 9g:
```
```
      Thus, jP42 \ P60 j D 8Š. Similarly, jP60 \ P04 j D 8Š by a bijection with the set:
```
```

                                          f604; 1; 2; 3; 5; 7; 8; 9g:
```
```

      And jP42 \ P04 j D 8Š as well by a similar argument. Finally, note that jP60 \
```
```
      P04 \ P42 j D 7Š by a bijection with the set:
```
```

                                          f6042; 1; 3; 5; 7; 8; 9g:
```
```

        Plugging all this into the formula gives:
```
```

                      jP42 [ P04 [ P60 j D 9Š C 9Š C 9Š            8Š   8Š   8Š C 7Š:
```
```

      15.9.4       Union of n Sets
```
```
      The size of a union of n sets is given by the following rule.
```
```

      Rule 15.9.1 (Inclusion-Exclusion).
```
```

                                         jS1 [ S2 [    [ Sn j D
```
```

                                    the sum of the sizes of the individual sets
```
```
                         minus      the sizes of all two-way intersections
```
```
                          plus      the sizes of all three-way intersections
```
```
                         minus      the sizes of all four-way intersections
```
```
                          plus      the sizes of all five-way intersections, etc.
```
```
      

15.9. Inclusion-Exclusion                                                      689
```
```

   The formulas for unions of two and three sets are special cases of this general
```
rule.
   This way of expressing Inclusion-Exclusion is easy to understand and nearly
as precise as expressing it in mathematical symbols, but we’ll need the symbolic
version below, so let’s work on deciphering it now.
   We already have a concise notation for the sum of sizes of the individual sets,
namely,
```
                                     Xn
```
```
                                         jSi j:
```
```
                                       i D1
```

A “two-way intersection” is a set of the form Si \ Sj for i ¤ j . We regard Sj \ Si
as the same two-way intersection as Si \ Sj , so we can assume that i < j . Now
we can express the sum of the sizes of the two-way intersections as
```
                                   X
```
```
                                          jSi \ Sj j:
```
```
                                  1i <j n
```

Similarly, the sum of the sizes of the three-way intersections is
```
                                X
```
```
                                         jSi \ Sj \ Sk j:
```
```
                             1i <j <kn
```

These sums have alternating signs in the Inclusion-Exclusion formula, with the
sum of the k-way intersections getting the sign . 1/k 1 . This finally leads to a
symbolic version of the rule:

Rule (Inclusion-Exclusion).
```
                 ˇ n      ˇ     n
```
```
                 ˇ[ ˇ X
```
```
                       S    D      jSi j
```
```
                 ˇ        ˇ
```
```
                 ˇ       iˇ
```
```
                 ˇ        ˇ
```
```
                   iD1        i D1
```
```
                                    X
```
```
                                              jSi \ Sj j
```
```
                                  1i <j n
```
```
                                      X
```
```
                              C                  jSi \ Sj \ Sk j C   
```
```
                                  1i <j <kn
```
```
                                        ˇ n    ˇ
```
```
                                        ˇ\ ˇ
```
```
                              C . 1/n 1 ˇ   Si ˇ :
```
```
                                        ˇ      ˇ
```
```
                                        ˇ      ˇ
```
```
                                               i D1
```

  While it’s often handy express the rule in this way as a sum of sums, it is not
necessary to group the terms by how many sets are in the intersections. So another
way to state the rule is:
```
                

## 690 Chapter 15   Cardinality Rules
```
```

           Rule (Inclusion-Exclusion-II).
```
```
                              ˇ n     ˇ                               ˇ    ˇ
```
```
                              ˇ[ ˇ              X                     ˇ\ ˇ
```
```
                                                                jI jC1 ˇ
```
```
                                   Si ˇ D                    . 1/     ˇ Si ˇ             (15.6)
```
```
                              ˇ       ˇ                                    ˇ
```
```
                              ˇ
```
```
                              ˇ       ˇ                               ˇ    ˇ
```
```
                                   i D1     ;¤I f1;:::;ng             i 2I
```
```

             A proof of these rules using just highschool algebra is given in Problem 15.59.
```
```
             If you’re getting tired of all that nasty algebra, then good news is on the way. In
```
```
           the next section, we will show you how to prove some heavy-duty formulas without
```
```
           using any algebra at all. Just a few words and you are done. No kidding.
```

### 15.10 Combinatorial Proofs
```
           Suppose you have n different T-shirts, but only want to keep k. You could equally
```
```
           well select the k shirts you want to keep or select the complementary set of n k
```
```
           shirts you want to throw out. Thus, the number of ways to select k shirts from
```
```
           among n must be equal to the number of ways to select n k shirts from among n.
```
```
           Therefore:                           !           !
```
```
                                              n         n
```
```
                                                  D           :
```
```
                                              k       n k
```
```
           This is easy to prove algebraically, since both sides are equal to:
```
```
                                                    nŠ
```
```
                                                         :
```
```
                                               kŠ .n k/Š
```
```
           But we didn’t really have to resort to algebra; we just used counting principles.
```
```

           15.10.1      Pascal’s Triangle Identity
```
```
           Zach, famed Math for Computer Science Lecturer, has decided to try out for the
```
```
           city boxing team. After all, he’s watched all of the Rocky movies and spent hours
```
```
           in front of a mirror sneering, “Yo, you wanna piece a’ me?!” Zach figures that n
```
```
           people (including himself) are competing for spots on the team and only k will be
```
```
           selected. As part of maneuvering for a spot on the team, he needs to work out how
```
```
           many different teams are possible. There are two cases to consider:
```
```

                Zach is selected for the team, and his k 1 teammates are selected from
```
```
                 among the other n 1 competitors. The number of different teams that can
```
```
                 be formed in this way is:              !
```
```
                                                   n 1
```
```
                                                         :
```
```
                                                   k 1
```
```
     

15.10. Combinatorial Proofs                                                      691
```
```

     Zach is not selected for the team, and all k team members are selected from
```
```
      among the other n 1 competitors. The number of teams that can be formed
```
```
      this way is:                              !
```
```
                                          n 1
```
```
                                                  :
```
```
                                            k
```

  All teams of the first type contain Zach, and no team of the second type does;
therefore, the two sets of teams are disjoint. Thus, by the Sum Rule, the total
number of possible city boxing teams is:
```
                                      !          !
```
```
                                n 1         n 1
```
```
                                        C         :
```
```
                                k 1           k
```
```

   Albert, equally-famed co-Lecturer, thinks Zach isn’t so tough, and so he might
```
as well also try out. Albert reasons that n people (including himself) are trying out
for k spots. Thus, the number of ways to select the team is simply:
```
                                            !
```
```
                                          n
```
```
                                             :
```
```
                                          k
```

  Albert and Zach each correctly counted the number of possible boxing teams.
Thus, their answers must be equal. So we know:

Lemma 15.10.1 (Pascal’s Triangle Identity).
```
                           !            !       !
```
```
                         n        n 1       n 1
```
```
                             D            C      :                            (15.7)
```
```
                         k        k 1        k
```

  We proved Pascal’s Triangle Identity without any algebra! Instead, we relied
purely on counting techniques.

#### 15.10.2 Giving a Combinatorial Proof
A combinatorial proof is an argument that establishes an algebraic fact by relying
on counting principles. Many such proofs follow the same basic outline:
   1. Define a set S .
```

   2. Show that jSj D n by counting one way.
```
```

   3. Show that jSj D m by counting another way.
```
```

   4. Conclude that n D m.
```
```
           

## 692 Chapter 15   Cardinality Rules
```
```

      In the preceding example, S was the set of all possible city boxing teams. Zach
```
```
      computed                               !            !
```
```
                                       n 1           n 1
```
```
                                jSj D          C
```
```
                                       k 1            k
```
```
      by counting one way, and Albert computed
```
```
                                                       !
```
```
                                                   n
```
```
                                            jS j D
```
```
                                                   k
```
```

      by counting another way. Equating these two expressions gave Pascal’s Identity.
```
```

      Checking a Combinatorial Proof
```
```
      Combinatorial proofs are based on counting the same thing in different ways. This
```
```
      is fine when you’ve become practiced at different counting methods, but when in
```
```
      doubt, you can fall back on bijections and sequence counting to check such proofs.
```
```
         For example, let’s take a closer look at our combinatorial proof of Pascal’s Iden-
```
```
      tity (15.7). We assume the n competitors are numbered 1 to n. So the set S of
```
```
      things to be counted is the collection of all size-k subsets the integer interval Œ1::n.
```
```
         Albert counted S via the Subset Rule and found jS j D kn . Zach had another
```
```
                                                                        
```
```

      way of counting. Giving himself the number n, Zach defined two collections of
```
```
      sets, Zach-chosen and Zach-not-chosen:
```
```

                           Zach-chosen WWD fX  Œ1::n       1 j jX j D k    1g
```
```
                      Zach-not-chosen WWD fY  Œ1::n       1 j jY j D kg:
```
```

      Clearly Zach-chosen and Zach-not-chosen are disjoint since the sets in Zach-chosen
```
```
      are smaller than those in Zach-not-chosen. So
```
```

          jZach-chosen [ Zach-not-chosenj D jZach-chosenj C jZach-not-chosenj:
```
```

      Also, by the Subset Rule
```
```
                                                                     !
```
```
                                                       n           1
```
```
                                       jZach-chosenj D                ;
```
```
                                                       k           1
```
```
                                                                    !
```
```
                                                           n       1
```
```
                                   jZach-not-chosenj D                :
```
```
                                                               k
```
```

      Now the combinatorial proof of (15.7) is formalized by specifying a bijection
```
```

                            f W Zach-chosen [ Zach-not-chosen ! S;
```
```
     

15.10. Combinatorial Proofs                                                    693
```

namely,                            (
```
                                    s [ fng   if jsj D k 1;
```
```
                         f .s/ WWD
```
```
                                    s         if jsj D k:
```

#### 15.10.3 A Colorful Combinatorial Proof
The set that gets counted in a combinatorial proof in different ways is usually de-
fined in terms of simple sequences or sets rather than an elaborate story about
Teaching Assistants. Here is another colorful example of a combinatorial argu-
ment.

Theorem 15.10.2.
```
                              n
```
```
                                  !     !      !
```
```
                              X n    2n     3n
```
```
                                          D
```
```
                                r   n r     n
```
```
                              rD0
```

Proof. We give a combinatorial proof. Let S be all n-card hands that can be dealt
from a deck containing n different red cards and 2n different black cards. First,
note that every 3n-element set has
```
                                             !
```
```
                                          3n
```
```
                                   jS j D
```
```
                                          n
```

n-element subsets.
   From another perspective, the number of n-card hands with exactly r red cards
is                                   !       !
```
                                   n     2n
```
```
                                   r   n r
```

since there are nr ways to choose the r red cards and n2nr ways to choose the
```
                                                          
```

n r black cards. Since the number of red cards can be anywhere from 0 to n, the
total number of n-card hands is:
```
                                   n
```
```
                                         !        !
```
```
                                   X   n      2n
```
```
                            jS j D                 :
```
```
                                       r    n r
```
```
                                    rD0
```

Equating these two expressions for jS j proves the theorem.                     

Finding a Combinatorial Proof
Combinatorial proofs are almost magical. Theorem 15.10.2 looks pretty scary, but
we proved it without any algebraic manipulations at all. The key to constructing a
combinatorial proof is choosing the set S properly, which can be tricky. Generally,
```
                

## 694 Chapter 15   Cardinality Rules
```
```

           the simpler side of the equation should provide some guidance. For example, the
```
```
                                               3n
```
```
           right side of Theorem 15.10.2 is n , which suggests that it will be helpful to
```
```
           choose S to be all n-element subsets of some 3n-element set.
```

### 15.11 References
```
           [6], [10], [17]
```

Problems for Section 15.2
```
           Practice Problems
```
```
           Problem 15.1.
```
```
           Alice is thinking of a number between 1 and 1000.
```
```
              What is the least number of yes/no questions you could ask her and be guaranteed
```
```
           to discover what it is? (Alice always answers truthfully.)
```
```
            (a)
```
```

           Problem 15.2.
```
```
           In how many different ways is it possible to answer the next chapter’s practice
```
```
           problems if:
```
```

                the first problem has four true/false questions,
```
```

                the second problem requires choosing one of four alternatives, and
```
```

                the answer to the third problem is an integer  15 and  20?
```
```

           Problem 15.3.
```
```
           How many total functions are there from set A to set B if jAj D 3 and jBj D 7?
```
```

           Problem 15.4.
```
```
           Let X be the six element set fx1 ; x2 ; x3 ; x4 ; x5 ; x6 g.
```
```
            (a) How many subsets of X contain x1 ?
```