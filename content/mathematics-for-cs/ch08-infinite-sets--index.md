---
title: "Infinite Sets"
lang: en
---

## 8 Infinite Sets
```
    This chapter is about infinite sets and some challenges in proving things about
```
```
    them.
```
```
       Wait a minute! Why bring up infinity in a Mathematics for Computer Science
```
```
    text? After all, any data set in a computer is limited by the size of the computer’s
```
```
    memory, and there is a bound on the possible size of computer memory, for the
```
```
    simple reason that the universe is (or at least appears to be) bounded. So why not
```
```
    stick with finite sets of some large, but bounded, size? This is a good question, but
```
```
    let’s see if we can persuade you that dealing with infinite sets is inevitable.
```
```
       You may not have noticed, but up to now you’ve already accepted the routine use
```
```
    of the integers, the rationals and irrationals, and sequences of them. These are all
```
```
    infinite sets. Further, do you really want Physics or the other sciences to give up the
```
```
    real numbers on the grounds that only a bounded number of bounded measurements
```
```
    can be made in a bounded universe? It’s pretty convincing—and a lot simpler—to
```
```
    ignore such big and uncertain bounds (the universe seems to be getting bigger all
```
```
    the time) and accept theories using real numbers.
```
```
       Likewise in computer science, it’s implausible to think that writing a program to
```
```
    add nonnegative integers with up to as many digits as, say, the stars in the sky—
```
```
    trillions of galaxies each with billions of stars—would be different from writing a
```
```
    program that would add any two integers, no matter how many digits they had. The
```
```
    same is true in designing a compiler: it’s neither useful nor sensible to make use of
```
```
    the fact that in a bounded universe, only a bounded number of programs will ever
```
```
    be compiled.
```
```
       Infinite sets also provide a nice setting to practice proof methods, because it’s
```
```
    harder to sneak in unjustified steps under the guise of intuition. And there has
```
```
    been a truly astonishing outcome of studying infinite sets. Their study led to the
```
```
    discovery of fundamental, logical limits on what computers can possibly do. For
```
```
    example, in Section 8.2, we’ll use reasoning developed for infinite sets to prove
```
```
    that it’s impossible to have a perfect type-checker for a programming language.
```
```
       So in this chapter, we ask you to bite the bullet and start learning to cope with
```
```
    infinity.
```
```
                 

## 296 Chapter 8    Infinite Sets
```

### 8.1 Infinite Cardinality
```
            In the late nineteenth century, the mathematician Georg Cantor was studying the
```
```
            convergence of Fourier series and found some series that he wanted to say con-
```
```
            verged “most of the time,” even though there were an infinite number of points
```
```
            where they didn’t converge. As a result, Cantor needed a way to compare the size
```
```
            of infinite sets. To get a grip on this, he got the idea of extending the Mapping Rule
```
```
            Theorem 4.5.4 to infinite sets: he regarded two infinite sets as having the “same
```
```
            size” when there was a bijection between them. Likewise, an infinite set A should
```
```
            be considered “as big as” a set B when A surj B. So we could consider A to be
```
```
            “strictly smaller” than B, which we abbreviate as A strict B, when A is not “as big
```
```
            as” B:
```
```

            Definition 8.1.1.             A strict B   iff    NOT .A surj B/.
```
```

              On finite sets, this strict relation really does mean “strictly smaller.” This follows
```
```
            immediately from the Mapping Rule Theorem 4.5.4.
```
```

            Corollary 8.1.2. For finite sets A; B,
```
```

                                               A strict B    iff   jAj < jBj:
```
```

            Proof.
```
```

                        A strict B       iff   NOT .A surj B/                      (Def 8.1.1)
```
```
                                         iff   NOT .jAj  jBj/           (Theorem 4.5.4.(4.5))
```
```
                                         iff jAj < jBj:
```
```

                                                                                                 
```
```

               Cantor got diverted from his study of Fourier series by his effort to develop a
```
```
            theory of infinite sizes based on these ideas. His theory ultimately had profound
```
```
            consequences for the foundations of mathematics and computer science. But Can-
```
```
            tor made a lot of enemies in his own time because of his work: the general mathe-
```
```
            matical community doubted the relevance of what they called “Cantor’s paradise”
```
```
            of unheard-of infinite sizes.
```
```
               A nice technical feature of Cantor’s idea is that it avoids the need for a definition
```
```
            of what the “size” of an infinite set might be—all it does is compare “sizes.”
```
```
               Warning: We haven’t, and won’t, define what the “size” of an infinite set is.
```
```
            The definition of infinite “sizes” requires the definition of some infinite sets called
```
```
      

8.1. Infinite Cardinality                                                           297
```

ordinals with special well-ordering properties. The theory of ordinals requires get-
ting deeper into technical set theory than we need to go, and we can get by just
fine without defining infinite sizes. All we need are the relations surj and bij which
reflect “as big as” and “same size” relations between sets.
   But there’s something else to watch out for: surj is metaphorically an “as big as”
relation, and likewise bij is metaphorically the “same size” relation on sets. As you
would expect, most of the “as big as” and “same size” properties of surj and bij on
finite sets do carry over to infinite sets, but some important ones don’t—as we’re
about to show. So you have to be careful: don’t assume that surj, for example, has
any particular “as big as” property on infinite sets until it’s been proven.
   Let’s begin with some familiar properties of the “as big as” and “same size”
relations on finite sets that do carry over exactly to infinite sets:
Lemma 8.1.3. For any sets A; B; C ,
   1. A surj B iff B inj A.
```

   2. If A surj B and B surj C , then A surj C .
```
```

   3. If A bij B and B bij C , then A bij C .
```
```

   4. A bij B iff B bij A.
```
   Part 1. follows from the fact that R has the Œ 1 out;  1 in surjective function
property iff R 1 has the Œ 1 out;  1 in total, injective property. Part 2. follows
from the fact that compositions of surjections are surjections. Parts 3. and 4. fol-
low from the first two parts because R is a bijection iff R and R 1 are surjective
functions. We’ll leave verification of these facts to Problem 4.22.
   Another familiar property of finite sets carries over to infinite sets, but this time
some real ingenuity is needed to prove it:
Theorem 8.1.4. [Schröder-Bernstein] For any sets A; B, if A surj B and B surj A,
then A bij B.
   That is, the Schröder-Bernstein Theorem says that if A is “at least as big as” B
and conversely, B is “at least as big as” A, then A “is the same size as” B. Phrased
this way, you might be tempted to take this theorem for granted, but that would be
a mistake. For infinite sets A and B, the Schröder-Bernstein Theorem is actually
pretty technical. Just because there is a surjective function f W A ! B—which
need not be a bijection—and a surjective function g W B ! A—which also need
not be a bijection—it’s not at all clear that there must be a bijection e W A ! B. The
idea is to construct e from parts of both f and g. We’ll leave the actual construction
to Problem 8.14.
```
           

## 298 Chapter 8   Infinite Sets
```
```

        Another familiar set property is that for any two sets, either the first is at least
```
```
      as big as the second, or vice-versa. For finite sets this follows trivially from the
```
```
      Mapping Rule. It’s actually still true for infinite sets, but assuming it is obvious
```
```
      would be mistaken again.
```
```

      Theorem 8.1.5. For all sets A; B,
```
```

                                   A surj B     OR    B surj A:
```
```

         Theorem 8.1.5 lets us prove that another basic property of finite sets carries over
```
```
      to infinite ones:
```
```

      Lemma 8.1.6.
```
```
                                   A strict B AND B strict C                            (8.1)
```
```
      implies
```
```
                                            A strict C
```
```
      for all sets A; B; C .
```
```

      Proof. (of Lemma 8.1.6)
```
```
        Suppose 8.1 holds, and assume for the sake of contradiction that NOT.A strict
```
```
      C /, which means that A surj C . Now since B strict C , Theorem 8.1.5 lets us
```
```
      conclude that C surj B. So we have
```
```

                                    A surj C AND C surj B;
```
```

      and Lemma 8.1.3.2 lets us conclude that A surj B, contradicting the fact that
```
```
      A strict B.                                                                
```
```

         We’re omitting a proof of Theorem 8.1.5 because proving it involves technical
```
```
      set theory—typically the theory of ordinals again—that we’re not going to get into.
```
```
      But since proving Lemma 8.1.6 is the only use we’ll make of Theorem 8.1.5, we
```
```
      hope you won’t feel cheated not seeing a proof.
```
```

      8.1.1     Infinity is different
```
```
      A basic property of finite sets that does not carry over to infinite sets is that adding
```
```
      something new makes a set bigger. That is, if A is a finite set and b … A, then
```
```
      jA [ fbgj D jAj C 1, and so A and A [ fbg are not the same size. But if A is
```
```
      infinite, then these two sets are “the same size!”
```
```

      Lemma 8.1.7. Let A be a set and b … A. Then A is infinite iff A bij A [ fbg.
```
```
      

8.1. Infinite Cardinality                                                                     299
```

Proof. Since A is not the same size as A [ fbg when A is finite, we only have to
show that A [ fbg is the same size as A when A is infinite. That is, we have to find
a bijection between A [ fbg and A when A is infinite.
   Here’s how: since A is infinite, it certainly has at least one element; call it a0 . But
since A is infinite, it has at least two elements, and one of them must not equal to a0 ;
call this new element a1 . But since A is infinite, it has at least three elements, one of
which must be different from both a0 and a1 ; call this new element a2 . Continuing
in this way, we conclude that there is an infinite sequence a0 ; a1 ; a2 ; : : : ; an ; : : : of
different elements of A. Now it’s easy to define a bijection e W A [ fbg ! A:
```

                 e.b/ WWD a0 ;
```
```
                e.an / WWD anC1                                             for n 2 N;
```
```
                 e.a/ WWD a                         for a 2 A         fb; a0 ; a1 ; : : :g:
```
```

                                                                                              
```

#### 8.1.2 Countable Sets
A set C is countable iff its elements can be listed in order, that is, the elements in
C are precisely the elements in the sequence
```

                                     c0 ; c1 ; : : : ; cn ; : : : :
```

Assuming no repeats in the list, saying that C can be listed in this way is formally
the same as saying that the function, f W N ! C defined by the rule that f .i /WWDci ,
is a bijection.
Definition 8.1.8. A set C is countably infinite iff N bij C . A set is countable iff it
is finite or countably infinite. A set is uncountable iff it is not countable.
  We can also make an infinite list using just a finite set of elements if we allow
repeats. For example, we can list the elements in the three-element set f2; 4; 6g as
```

                                       2; 4; 6; 6; 6; : : : :
```

This simple observation leads to an alternative characterization of countable sets
that does not make separate cases of finite and infinite sets. Namely, a set C is
countable iff there is a list
```
                               c0 ; c1 ; : : : ; cn ; : : :
```
of the elements of C , possibly with repeats.
Lemma 8.1.9. A set C is countable iff N surj C . In fact, a nonempty set C is
countable iff there is a total surjective function g W N ! C .
```
           

## 300 Chapter 8   Infinite Sets
```
```

         The proof is left to Problem 8.15.
```
```
         The most fundamental countably infinite set is the set N itself. But the set Z of
```
```
      all integers is also countably infinite, because the integers can be listed in the order:
```
```
                                    0; 1; 1; 2; 2; 3; 3; : : : :                         (8.2)
```
```
      In this case, there is a simple formula for the nth element of the list (8.2). That is,
```
```
      the bijection f W N ! Z such that f .n/ is the nth element of the list can be defined
```
```
      as:                                (
```
```
                                          n=2           if n is even;
```
```
                               f .n/ WWD
```
```
                                           .n C 1/=2 if n is odd:
```
```
      There is also a simple way to list all pairs of nonnegative integers, which shows
```
```
      that .N  N/ is also countably infinite (Problem 8.25). From this, it’s a small step to
```
```
      reach the conclusion that the set Q0 of nonnegative rational numbers is countable.
```
```
      This may be a surprise—after all, the rationals densely fill up the space between
```
```
      integers, and for any two, there’s another in between. So it might seem that you
```
```
      couldn’t write out all the rationals in a list, but Problem 8.13 illustrates how to do
```
```
      it. More generally, it is easy to show that countable sets are closed under unions
```
```
      and products (Problems 8.24 and 8.25) which implies the countability of a bunch
```
```
      of familiar sets:
```
```
      Corollary 8.1.10. The following sets are countably infinite:
```
```
                                  ZC ; Z; N  N; QC ; Z  Z; Q:
```
```
         A small modification of the proof of Lemma 8.1.7 shows that countably infinite
```
```
      sets are the “smallest” infinite sets. Namely,
```
```
      Lemma 8.1.11. If A is an infinite set, and B is countable, then A surj B.
```
```
         We leave the proof to Problem 8.12.
```
```
         Also, since adding one new element to an infinite set doesn’t change its size,
```
```
      you can add any finite number of elements without changing the size by simply
```
```
      adding one element after another. Something even stronger is true: you can add a
```
```
      countably infinite number of new elements to an infinite set and still wind up with
```
```
      just a set of the same size (Problem 8.18).
```
```
         By the way, it’s a common mistake to think that, because you can add any finite
```
```
      number of elements to an infinite set and have a bijection with the original set, that
```
```
      you can also throw in infinitely many new elements. In general it isn’t true that just
```
```
      because it’s OK to do something any finite number of times, it’s also OK to do it an
```
```
      infinite number of times. For example, starting from 3, you can increment by 1 any
```
```
      finite number of times, and the result will be some integer greater than or equal to
```
```
      3. But if you increment an infinite number of times, you don’t get an integer at all.
```
```
      

8.1. Infinite Cardinality                                                          301
```

#### 8.1.3 Power sets are strictly bigger
Cantor’s astonishing discovery was that not all infinite sets are the same size. In
particular, he proved that for any set A the power set pow.A/ is “strictly bigger”
than A. That is,

Theorem 8.1.12. [Cantor] For any set A,
```

                                      A strict pow.A/:
```

Proof. To show that A is strictly smaller than pow.A/, we have to show that if g is
a function from A to pow.A/, then g is not a surjection. Since any partial function
with nonempty codomain can be extended to a total function with the same range
(ask yourself how), we can safely assume that g is total.
   To show that g is not a surjection, we’ll simply find a subset Ag  A that is not
in the range of g. The idea is, for each element a 2 A, to look at the set g.a/  A
and ask whether or not a happens to be in g.a/. First, define
```

                                 Ag WWD fa 2 A j a … g.a/g:
```

Ag is a well-defined subset of A, which means it is a member of pow.A/. But Ag
can’t be in the range of g, because it differs at a from each set g.a/ in the range of
g.
```
    To spell this out more, suppose to the contrary that Ag was in the range of g, that
```
is,
```
                                     Ag D g.a0 /
```
for some a0 2 A. Now by definition of Ag ,
```

                            a 2 g.a0 / iff a 2 Ag   iff a … g.a/
```

for all a 2 A. Now letting a D a0 yields the contradiction
```

                                a0 2 g.a0 / iff a0 … g.a0 /:
```

So g is not a surjection, because there is an element in the power set of A, specifi-
cally the set Ag , that is not in the range of g.                                 
```

   Cantor’s Theorem immediately implies:
```

Corollary 8.1.13. pow.N/ is uncountable.

Proof. By Lemma 8.1.9, U is uncountable iff N strict U .                            
```
           

## 302 Chapter 8   Infinite Sets
```
```

         The bijection between subsets of an n-element set and the length n bit-strings
```
```
      f0; 1gn used to prove Theorem 4.5.5, carries over to a bijection between subsets of
```
```
      a countably infinite set and the infinite bit-strings, f0; 1g! . That is,
```
```

      Lemma 8.1.14. pow(N) bijf0; 1g! .
```
```

        This immediately implies
```
```

      Corollary 8.1.15. f0; 1g! is uncountable.
```
```

      More Countable and Uncountable Sets
```
```
      Once we have a few sets we know are countable or uncountable, we can get lots
```
```
      more examples using Lemma 8.1.3. In particular, we can appeal to the following
```
```
      immediate corollary of the Lemma:
```
```

      Corollary 8.1.16.
```
```

      (a) If U is an uncountable set and A surj U , then A is uncountable.
```
```

      (b) If C is a countable set and C surj A, then A is countable.
```
```

        For example, now that we know that the set f0; 1g! of infinite bit strings is un-
```
```
      countable, it’s a small step to conclude that
```
```

      Corollary 8.1.17. The set R of real numbers is uncountable.
```
```

        To prove this, think about the infinite decimal expansion of a real number:
```
```
                                      p
```
```
                                        2 D 1:4142 : : : ;
```
```
                                        5 D 5:000 : : : ;
```
```
                                    1=10 D 0:1000 : : : ;
```
```
                                     1=3 D 0:333 : : : ;
```
```
                                     1=9 D 0:111 : : : ;
```
```
                                      1
```
```
                                    4    D 4:010101 : : : :
```
```
                                      99
```
```
      Let’s map any real number r to the infinite bit string b.r/ equal to the sequence
```
```
      of bits in the decimal expansion of r, starting at the decimal point. If the decimal
```
```
      expansion of r happens to contain a digit other than 0 or 1, leave b.r/ undefined.
```
```
      

8.1. Infinite Cardinality                                                                       303
```

For example,
```

                                                b.5/ D 000 : : : ;
```
```
                                           b.1=10/ D 1000 : : : ;
```
```
                                          b.1=9/ D 111 : : : ;
```
```
                                             1
```
```
                                        b.4 / D 010101 : : :
```
```
                                     p       99
```
```
                                   b. 2/; b.1=3/ are undefined:
```

Now b is a function from real numbers to infinite bit strings.1 It is not a total
function, but it clearly is a surjection. This shows that
```

                                            R surj f0; 1g! ;
```

and the uncountability of the reals now follows by Corollary 8.1.16.(a).
  For another example, let’s prove

Corollary 8.1.18. The set .ZC / of all finite sequences of positive integers is count-
able.
```

   To prove this, think about the prime factorization of a nonnegative integer:
```
```

                                20 D 22  30  51  70  110  130    ;
```
```
                              6615 D 20  33  51  72  110  130    :
```

Let’s map any nonnegative integer n to the finite sequence e.n/ of nonzero expo-
nents in its prime factorization. For example,
```

                                    e.20/ D .2; 1/;
```
```
                                  e.6615/ D .3; 1; 2/;
```
```
             13      9      817
```
```
       e.5         11  47        10344 / D .13; 9; 817; 44/;
```
```
                                     e.1/ D ;                             (the empty string)
```
```
                                     e.0/ is undefined:
```
   1 Some rational numbers can be expanded in two ways—as an infinite sequence ending in all 0’s

or as an infinite sequence ending in all 9’s. For example,
```

                                       5 D 5:000    D 4:999 : : : ;
```
```
                                      1
```
```
                                         D 0:1000    D 0:0999 : : : :
```
```
                                     10
```
In such cases, define b.r/ to be the sequence that ends with all 0’s.
```
           

## 304 Chapter 8   Infinite Sets
```
```

      Now e is a function from N to .ZC / . It is defined on all positive integers, and it
```
```
      clearly is a surjection. This shows that
```
```

                                            N surj .ZC / ;
```
```

      and the countability of the finite strings of positive integers now follows by Corol-
```
```
      lary 8.1.16.(b).
```
```

      Larger Infinities
```
```
      There are lots of different sizes of infinite sets. For example, starting with the
```
```
      infinite set N of nonnegative integers, we can build the infinite sequence of sets
```
```

          N strict pow.N/ strict pow.pow.N// strict pow.pow.pow.N/// strict : : : :
```
```

      By Cantor’s Theorem 8.1.12, each of these sets is strictly bigger than all the pre-
```
```
      ceding ones. But that’s not all: the union of all the sets in the sequence is strictly
```
```
      bigger than each set in the sequence (see Problem 8.16). In this way you can keep
```
```
      going indefinitely, building “bigger” infinities all the way.
```
```

      8.1.4   Diagonal Argument
```
```
      Theorem 8.1.12 and similar proofs are collectively known as “diagonal arguments”
```
```
      because of a more intuitive version of the proof described in terms of on an infinite
```
```
      square array. Namely, suppose there was a bijection between N and f0; 1g! . If such
```
```
      a relation existed, we would be able to display it as a list of the infinite bit strings
```
```
      in some countable order or another. Once we’d found a viable way to organize
```
```
      this list, any given string in f0; 1g! would appear in a finite number of steps, just
```
```
      as any integer you can name will show up a finite number of steps from 0. This
```
```
      hypothetical list would look something like the one below, extending to infinity
```
```
      both vertically and horizontally:
```
```

                                  A0    D   1    0    0    0    1    1    
```
```
                                  A1    D   0    1    1    1    0    1    
```
```
                                  A2    D   1    1    1    1    1    1    
```
```
                                  A3    D   0    1    0    0    1    0    
```
```
                                  A4    D   0    0    1    0    0    0    
```
```
                                  A5    D   1    0    0    1    1    1    
```
```
                                   ::       ::   ::   ::   ::   ::   ::   ::
```
```
                                    :        :    :    :    :    :    :      :
```
```
                

           8.2. The Halting Problem                                                         305
```
```

           But now we can exhibit a sequence that’s missing from our allegedly complete list
```
```
           of all the sequences. Look at the diagonal in our sample list:
```
```

                                      A0    D   1    0    0    0    1    1    
```
```
                                      A1    D   0    1    1    1    0    1    
```
```
                                      A2    D   1    1    1    1    1    1    
```
```
                                      A3    D   0    1    0    0    1    0    
```
```
                                      A4    D   0    0    1    0    0    0    
```
```
                                      A5    D   1    0    0    1    1    1    
```
```
                                       ::       ::   ::   ::   ::   ::   ::   ::
```
```
                                        :        :    :    :    :    :    :      :
```
```

           Here is why the diagonal argument has its name: we can form a sequence D con-
```
```
           sisting of the bits on the diagonal.
```
```

                                      D D 1 1 1 0 0 1   ;
```
```

           Then, we can form another sequence by switching the 1’s and 0’s along the diago-
```
```
           nal. Call this sequence C :
```
```

                                       C D 0 0 0 1 1 0   :
```
```

           Now if the nth term of An is 1 then the nth term of C is 0, and vice versa, which
```
```
           guarantees that C differs from An . In other words, C has at least one bit different
```
```
           from every sequence on our list. So C is an element of f0; 1g! that does not appear
```
```
           in our list—our list can’t be complete!
```
```
              This diagonal sequence C corresponds to the set fa 2 A j a … g.a/g in the
```
```
           proof of Theorem 8.1.12. Both are defined in terms of a countable subset of the
```
```
           uncountable infinity in a way that excludes them from that subset, thereby proving
```
```
           that no countable subset can be as big as the uncountable set.
```

### 8.2 The Halting Problem
```
           Although towers of larger and larger infinite sets are at best a romantic concern for
```
```
           a computer scientist, the reasoning that leads to these conclusions plays a critical
```
```
           role in the theory of computation. Diagonal arguments are used to show that lots of
```
```
           problems can’t be solved by computation, and there is no getting around it.
```
```
              This story begins with a reminder that having procedures operate on programs
```
```
           is a basic part of computer science technology. For example, compilation refers to
```
```
           taking any given program text written in some “high level” programming language
```
```
           

## 306 Chapter 8   Infinite Sets
```
```

      like Java, C++, Python, . . . , and then generating a program of low-level instruc-
```
```
      tions that does the same thing but is targeted to run well on available hardware.
```
```
      Similarly, interpreters or virtual machines are procedures that take a program text
```
```
      designed to be run on one kind of computer and simulate it on another kind of com-
```
```
      puter. Routine features of compilers involve “type-checking” programs to ensure
```
```
      that certain kinds of run-time errors won’t happen, and “optimizing” the generated
```
```
      programs so they run faster or use less memory.
```
```
         The fundamental thing that just can’t be done by computation is a perfect job of
```
```
      type-checking, optimizing, or any kind of analysis of the overall run time behavior
```
```
      of programs. In this section, we’ll illustrate this with a basic example known as
```
```
      the Halting Problem. Pick your favorite programming language—Python, Java,
```
```
      C++,. . . —and assume that “program” refers to a program written in your language.
```
```
         Once a program is started, if its initial computation stops for some reason—such
```
```
      as producing a final value, waiting for an input, suffering an error interrupt, or sim-
```
```
      ply freezing—the program is said to halt. So a program that does not halt would run
```
```
      forever using up cycles and energy (unless it was interrupted by an external operat-
```
```
      ing system command). The Halting Problem is the general problem of determining,
```
```
      given an arbitrary program, whether or not the program halts.
```
```
         There is a simple way to determine when an arbitrary program does halt, at least
```
```
      in theory: just run it until it stops. Well not quite. Just running the program in the
```
```
      usual way would not detect when it freezes without warning. What really needs to
```
```
      be done is to simulate the program using an interpreter or a virtual machine that
```
```
      will recognize any kind of halting, including a freeze. But interpreters and virtual
```
```
      machines capable of simulating any program are familiar technology. So there is a
```
```
      general way to detect when a program halts.
```
```
         The hard part is determining when a program does not halt. At any point in sim-
```
```
      ulating it, you generally won’t know whether to continue the simulation because
```
```
      the program will halt later, or to abort the simulation because it wouldn’t stop oth-
```
```
      erwise.
```
```
         So is there some way besides simulation to detect when a program does not
```
```
      halt? Could there be some program analysis tool that could inspect any program
```
```
      and correctly report when the program does not halt? The answer is “No.” Using
```
```
      a standard diagonal argument, we will prove that it is impossible to have such a
```
```
      non-halting analysis tool. Any method for detecting non-halting is bound to go
```
```
      wrong. It will falsely report that some halting program does not halt, or it will fail
```
```
      to report anything about some program. That is, there will be a program on which
```
```
      the analyzer runs forever without halting.
```
```
         To set up the diagonal argument, we will focus on string procedures. A string
```
```
      procedure is a procedure that takes a single argument that is supposed to be a string
```
```
      

8.2. The Halting Problem                                                                       307
```

over the 256 character ASCII alphabet. As a simple example, you might think about
how to write a string procedure that halts precisely when it is applied to a double
letter string in ASCII , namely, a string in which every character occurs twice in a
row. For example, aaCC33, and zz++ccBB are double letter strings, but aa;bb,
b33, and AAAAA are not.
   When the computation of a procedure applied to a string halts, the procedure will
be said to recognize the string. In this context, a set of strings a commonly called a
(formal) language. We let lang.P / to be the language recognized by procedure P :
```

                    lang.P / WWDfs 2 ASCII j P applied to s haltsg:
```

A language is called recognizable when it equals lang.P / for some string pro-
cedure P . For example, we’ve just agreed that the set of double letter strings is
recognizable.
   There is no harm in assuming that every program can be written as a string in
ASCII —that’s typically how we would enter them into a computer in the first
place. When a string s 2 ASCII is actually the ASCII description of some string
procedure, we’ll refer to that string procedure as Ps . You can think of Ps as the
result of compiling s into something executable.2 It’s technically helpful to treat
every string in ASCII as a program for a string procedure. So when a string
s 2 ASCII doesn’t parse as a proper string procedure, we’ll define Ps to be some
default string procedure—say one that never halts on anything it is applied to.
   Focusing just on string procedures, the general Halting Problem is to decide,
given strings s and t , whether or not the procedure Ps recognizes t . Following the
usual diagonal approach, we define the language No-halt:
Definition 8.2.1.
```

       No-halt WWD fs j Ps applied to s does not haltg D fs … lang.Ps /g:                    (8.3)
```

  So if Ps is the recognizer for some language, then No-halt differs from that lan-
guage on the string s. This shows that No-halt cannot have a recognizer:
Theorem 8.2.2. No-halt is not recognizable.
  Let’s spell out the reasoning behind this theorem more fully. By definition, we
have
```
                           s 2 No-halt IFF s … lang.Ps /;                    (8.4)
```
   2 The string s 2 ASCII and the procedure P have to be distinguished to avoid a type error:
```
                                              s
```
you can’t apply a string to string. For example, let s be the string that you wrote as your program
to recognize the double letter strings. Applying s to a string argument, say aabbccdd, should
throw a type exception; what you need to do is compile s to the procedure Ps and then apply Ps to
aabbccdd.
```
            

## 308 Chapter 8   Infinite Sets
```
```

      for all strings s 2 ASCII .
```
```
         Now suppose to the contrary that No-halt was recognizable. This means there is
```
```
      some procedure Ps0 that recognizes No-halt, that is,
```
```

                                          No-halt D lang.Ps0 / :
```
```

      Combined with (8.4), we have
```
```

                                    s 2 lang.Ps0 /    iff s … lang.Ps /                          (8.5)
```
```

      for all s 2 ASCII . Now letting s D s0 in (8.5) yields the immediate contradiction
```
```

                                  s0 2 lang.Ps0 /    iff s0 … lang.Ps0 / :
```
```

         So that does it: the reasoning above applied to whatever favorite programming
```
```
      language you picked. It is logically impossible for a Java program to be a recognizer
```
```
      for non-halting Java programs, or for a Python program to be a recognizer for non-
```
```
      halting Python programs, and so forth for other favorite programming languages.
```
```
         Now you might wonder if there was a loophole around this logical limitation
```
```
      by having a recognizer the non-halting programs in one language that was written
```
```
      in another language. In other words, could there be a C++ procedure that recog-
```
```
      nizes all the non-halting Java programs? After all, C++ does allow more intimate
```
```
      manipulation of computer memory than Java does. But there is no loophole here.
```
```
      If you’ve learned about programming language implementation, you will realize
```
```
      that it’s possible to write a simulator in Java for C++ programs. This means that if
```
```
      there were a C++ procedure that recognized non-halting Java programs, then a Java
```
```
      procedure could also do it by simulating the C++ program, and that’s impossible.
```
```
      This reasoning finally leads to a transcendent insight. No procedure can be written
```
```
      in any programming language that recognizes No-halt for your favorite language.
```
```
      Recognizing No-halt is simply beyond the capacity of computation.
```
```
         But it’s not just No-halt. If there was a perfect recognizer for any property that
```
```
      depends on the complete run time behavior programs,3 it could be altered slightly
```
```
      to become a recognizer for No-halt. We’ll take this claim for granted now, giving
```
```
      its full justification in an assigned problem.
```
```
         For example, most compilers do “static” type-checking at compile time to ensure
```
```
      that programs won’t make run-time type errors. A program that type-checks is
```
```
      guaranteed not to cause a run-time type-error. But given that it’s impossible to
```
```
      recognize when the complete run time behavior of a program does not lead to a
```
```
          3 The weasel words “complete run time behavior” creep in here to rule out some run time prop-
```
```

      erties that are easy to recognize because they depend only on part of the run time behavior. For
```
```
      example, the set of programs that halt after executing at most 100 instructions is recognizable.
```
```
                  

            8.3. The Logic of Sets                                                                             309
```
```

            type-error, it follows that the type-checker must be rejecting programs that really
```
```
            wouldn’t cause a type-error. The conclusion is that no type-checker is perfect—you
```
```
            can always do better!
```
```
               It’s a different story if we think about the practical possibility of writing pro-
```
```
            gram analyzers. The fact that it’s logically impossible to analyze utterly arbitrary
```
```
            programs does not mean that you can’t do a very good job analyzing interesting pro-
```
```
            grams that come up in practice. In fact, these “interesting” programs are commonly
```
```
            intended to be analyzable in order to confirm that they do what they’re supposed to
```
```
            do.
```
```
               In the end, it’s not clear how much of a hurdle this theoretical limitation implies
```
```
            in practice. But the theory does provide some perspective on claims about general
```
```
            analysis methods for programs. The theory tells us that people who make such
```
```
            claims either
```
```
                 are exaggerating the power (if any) of their methods, perhaps to make a sale
```
```
                  or get a grant, or
```
```
                 are trying to keep things simple by not going into technical limitations they’re
```
```
                  aware of, or
```
```
                 perhaps most commonly, are so excited about some useful practical successes
```
```
                  of their methods that they haven’t bothered to think about the limitations
```
```
                  which must be there.
```
```
            So from now on, if you hear people making claims about having general program
```
```
            analysis/verification/optimization methods, you’ll know they can’t be telling the
```
```
            whole story.
```

### 8.3 The Logic of Sets
```
            8.3.1     Russell’s Paradox
```
```
            Reasoning naively about sets turns out to be risky. In fact, one of the earliest at-
```
```
            tempts to come up with precise axioms for sets in the late nineteenth century by
```
```
            the logician Gotlob Frege, was shot down by a three line argument known as Rus-
```
```
            sell’s Paradox4 which reasons in nearly the same way as the proof of Cantor’s
```
```
               4 Bertrand Russell was a mathematician/logician at Cambridge University at the turn of the Twen-
```
```

            tieth Century. He reported that when he felt too old to do mathematics, he began to study and write
```
```
            about philosophy, and when he was no longer smart enough to do philosophy, he began writing about
```
```
            politics. He was jailed as a conscientious objector during World War I. For his extensive philosophical
```
```
            and political writing, he won a Nobel Prize for Literature.
```
```
           

## 310 Chapter 8   Infinite Sets
```
```

      Theorem 8.1.12. This was an astonishing blow to efforts to provide an axiomatic
```
```
      foundation for mathematics:
```
```

                                       Russell’s Paradox
```
```

              Let S be a variable ranging over all sets, and define
```
```

                                      W WWD fS j S 62 S g:
```
```

              So by definition,
```
```
                                        S 2 W iff S 62 S;
```
```
              for every set S . In particular, we can let S be W , and obtain the
```
```
              contradictory result that
```
```

                                      W 2 W iff W 62 W:
```
```

         The simplest reasoning about sets crashes mathematics! Russell and his col-
```
```
      league Whitehead spent years trying to develop a set theory that was not contra-
```
```
      dictory, but would still do the job of serving as a solid logical foundation for all of
```
```
      mathematics.
```
```
         Actually, a way out of the paradox was clear to Russell and others at the time:
```
```
      it’s unjustified to assume that W is a set. The step in the proof where we let S be
```
```
      W has no justification, because S ranges over sets, and W might not be a set. In
```
```
      fact, the paradox implies that W had better not be a set!
```
```
         But denying that W is a set means we must reject the very natural axiom that
```
```
      every mathematically well-defined collection of sets is actually a set. The prob-
```
```
      lem faced by Frege, Russell and their fellow logicians was how to specify which
```
```
      well-defined collections are sets. Russell and his Cambridge University colleague
```
```
      Whitehead immediately went to work on this problem. They spent a dozen years
```
```
      developing a huge new axiom system in an even huger monograph called Prin-
```
```
      cipia Mathematica, but for all intents and purposes, their approach failed. It was
```
```
      so cumbersome no one ever used it, and it was subsumed by a much simpler, and
```
```
      now widely accepted, axiomatization of set theory by the logicians Zermelo and
```
```
      Fraenkel.
```
```

      8.3.2    The ZFC Axioms for Sets
```
```
      It’s generally agreed that essentially all of mathematics can be derived from a few
```
```
      formulas of set theory, called the Axioms of Zermelo-Fraenkel Set Theory with
```
```
      

8.3. The Logic of Sets                                                                            311
```

Choice (ZFC), using a few simple logical deduction rules.
   These axioms are about “pure” sets that are literally built up from nothing. For
example, we can start with the set ; with nothing in it, and then build new sets from
stuff we already have. So from ; we can build the set f;g whose sole member is
the set we started with. But now we have built two things, so we can build two new
sets
```
                                 ff;gg; f;; f;gg:
```
Continuing like this, we could build up a simple sequence of sets
```

                              ;;    f;g;     ff;gg;     fff;ggg; : : :
```

where each element is simply the set whose sole element is the previous element.
This means we can now build an infinite set N consisting of all the elements in the
sequence.
   Of course there are lots of types of mathematical objects—sets of numbers like
N or R, sets of functions on numbers, sets of sequences like f0; 1g or f0; 1g! , or
sets of graphs, for example—that we don’t normally regard as pure sets. But in fact
pure sets are enough to model all these other types of objects.
   For example, the infinite set N is like a copy of the nonnegative integers N, where
we define the result of “adding one” to an element s 2 N to be fxg. If we go on
and take all the pairs5 of elements .a; b/ 2 N  .N f;g/, we get a set that is like
the numerator/denominator pairs of all the fractions with nonnegative numerators
and positive denominators. With a little fiddling of these “fractions,” we can get a
set that acts like a copy of the rational numbers Q. Next from the rationals we can
get a set that acts like the real numbers by modelling a real number r 2 R by the set
of rationals greater than r. And so on. The point is that if we can reason correctly
about pure sets, we get a solid basis for reasoning about all mathematical objects.
   So the domain of discourse of ZFC is the pure sets, and ZFC involves using a few
logical inference rules to prove properties of pure sets starting from a few axioms.
The axioms themselves are written as pure first-order formulas of set theory. These
are predicate formulas that only talk about membership in sets. That is, a first-order
formula of set theory is built using logical connectives and quantifiers starting solely
from expressions of the form “x 2 y” which is interpreted to mean that x and y
are pure sets, and x is one of the elements in y.
   Formulas of set theory are not even allowed to have the equality symbol “D.”
However, sets are equal iff they have the same elements, so there is an easy way to
   5 Doing this requires a way to represent an ordered pair .a; b/ of things in terms of sets built up

from just a and b. See Problem 8.38 for a slightly ingenious, but still simple, way to represent the
pair as a set.
```
           

## 312 Chapter 8   Infinite Sets
```
```

      express equality of sets purely in terms of membership:
```
```
                                    .x D y/ WWD 8z: .z 2 x IFF z 2 y/:                (8.6)
```
```
        Similarly, the subset symbol “” is not allowed in formulas of set theory, but we
```
```
      can also express subset purely in terms of membership:
```
```
                              .x  y/ WWD 8z: .z 2 x IMPLIES z 2 y/:                  (8.7)
```
```
         So formulas using symbols “D,” “,” in addition to “2” can be understood as
```
```
      abbreviations for pure formulas only using “2.” We won’t worry about this distinc-
```
```
      tion between formulas and abbreviations for formulas—we’ll now just call them all
```
```
      “formulas of set theory.” For example,
```
```
                                     x D y IFF Œx  y AND y  x
```
```
      is a formula of set theory that explains a basic connection between set equality and
```
```
      set containment.
```
```
         We’re not going to develop much of set theory in this text, but we thought you
```
```
      might like to see the actual axioms of ZFC—and while you’re at it, get some more
```
```
      practice reading and writing quantified formulas:
```
```

      The Axioms
```
```
      Extensionality. Two sets are equal iff they are members of the same sets:
```
```
                                       x D y IFF .8z: x 2 z IFF y 2 z/:
```
```

      Pairing. For any two sets x and y, there is a set fx; yg with x and y as its only
```
```
            elements:
```
```
                           8x; y9u8z: Œz 2 u IFF .z D x OR z D y/
```
```

      Union. The union u of a collection z of sets is also a set:
```
```
                                  8z9u8x: .x 2 u/ IFF .9y: x 2 y AND y 2 z/
```
```

      Infinity. There is an infinite set. Specifically, there is a nonempty set x such that
```
```
             for any set y 2 x, the set fyg is also a member of x.
```
```
      Subset. Given any set x and any definable property of sets, there is a set y contain-
```
```
           ing precisely those elements in x that have the property.
```
```
                                      8x9y8z: z 2 y IFF Œz 2 x AND .z/
```
```
            where .z/ is a formula of set theory.6
```
```
         6 This axiom is more commonly called the Comprehension Axiom.
```
```
      

8.3. The Logic of Sets                                                            313
```

Power Set. All the subsets of a set form another set:
```

                                     8x9p8u: u  x IFF u 2 p:
```

Replacement. Suppose a formula  of set theory defines the graph of a function
```
     on a set s, that is,
```
```

                    8x 2 s 8y; z: Œ.x; y/ AND .x; z/ IMPLIES y D z:
```
```
        Then the image of s under that function is also a set t. Namely,
```
```

                                9t8y: y 2 t IFF Œ9x 2 s: .x; y/:
```

Foundation. The aim is to forbid any infinite sequence of sets of the form
```

                                         2 xn 2    2 x1 2 x0
```
```

        in which each set is a member of the next one. This can be captured by saying
```
```
        every nonempty set has a “member-minimal” element. Namely, define
```
```

                  member-minimal.m; x/ WWD Œm 2 x AND 8y 2 x: y … m:
```
```

        Then the Foundation Axiom7 is
```
```

                         8x: x ¤ ; IMPLIES 9m: member-minimal.m; x/:
```

Choice. Let s be a set of nonempty, disjoint sets. Then there is a set c consisting of
```
     exactly one element from each set in s. The formula is given in Problem 8.39.
```

#### 8.3.3 Avoiding Russell’s Paradox
These modern ZFC axioms for set theory are much simpler than the system Russell
and Whitehead first came up with to avoid paradox. In fact, the ZFC axioms are
as simple and intuitive as Frege’s original axioms, with one technical addition: the
Foundation axiom. Foundation captures the intuitive idea that sets must be built up
from “simpler” sets in certain standard ways. And in particular, Foundation avoids
the “paradox” of Russell’s set collection W WWD fS j S … Sg because it implies that
W is not a set. Namely Foundation implies that S 62 S for every set S , so W is
the collection of all sets. Now if W was a set, we would have W 2 W , violating
Foundation.
   The Foundation axiom also justifies proofs about sets using structural induction.
We’ll begin with a recursive definition of a class of sets called Recset.
   7 This axiom is also called the Regularity Axiom.
```
                   

## 314 Chapter 8     Infinite Sets
```
```

            Definition 8.3.1. The class of recursive sets Recset is defined as follows:
```
```
            Base case: The empty set ; is a Recset.
```
```
            Constructor step: If S is a nonempty set of Recset’s, then S is a Recset.
```
```

               Since Recset is defined recursively, we know that we can use structural induction
```
```
            to prove things about it. This means that we can actually use structural induction to
```
```
            prove things about all sets, because the Foundation axiom implies that all sets are
```
```
            recursive sets:
```
```

            Theorem 8.3.2. The class Recset of recursive sets is the same as the class of all
```
```
            sets.
```
```

            Proof. Everything in Recset is a set by definition, so we need only show that every
```
```
            set is in Recset.
```
```
               Suppose to the contrary that a set S is not in Recset. So S must have an ele-
```
```
            ment N0 that is not in Recset, since otherwise S would by definition be in Recset.
```
```
            Likewise, N0 must have an element N1 that is not in Recset, and N1 must have an
```
```
            element N2 that is not in Recset, and so on. So we have an infinite sequence
```
```

                                             S 3 N0 3 N1 3 N2 3 : : : :
```
```

            Therefore the set8
```
```
                                             T WWD fS; N0 ; N1 ; N2 ; : : :g
```
```
            has no member-minimal element, in violation of Foundation.                                       
```

### 8.4 Does All This Really Work?
```
            So this is where mainstream mathematics stands today: there is a handful of ZFC
```
```
            axioms from which virtually everything else in mathematics can be derived logi-
```
```
            cally. This sounds like a rosy situation, but there are several dark clouds, suggesting
```
```
            that the essence of truth in mathematics is not completely resolved.
```
```

                  The ZFC axioms weren’t etched in stone by God. Instead, they were mostly
```
```
                   made up by Zermelo, who may have been a brilliant logician, but was also
```
```
                   a fallible human being—probably some days he forgot his house keys. So
```
```
                   maybe Zermelo, just like Frege, didn’t get his axioms right and will be
```
```
               8 A rigorous proof, which we are skipping, requires careful use of the Choice axiom to prove that
```
```

            T is a set.
```