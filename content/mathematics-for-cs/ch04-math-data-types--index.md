---
title: "Mathematical Data Types"
lang: en
---

## 4 Mathematical Data Types
```
             We have assumed that you’ve already been introduced to the concepts of sets, se-
```
```
             quences, and functions, and we’ve used them informally several times in previous
```
```
             sections. In this chapter, we’ll now take a more careful look at these mathemati-
```
```
             cal data types. We’ll quickly review the basic definitions, add a few more such as
```
```
             “images” and “inverse images” that may not be familiar, and end the chapter with
```
```
             some methods for comparing the sizes of sets.
```

### 4.1 Sets
```
             Informally, a set is a bunch of objects, which are called the elements of the set.
```
```
             The elements of a set can be just about anything: numbers, points in space, or even
```
```
             other sets. The conventional way to write down a set is to list the elements inside
```
```
             curly-braces. For example, here are some sets:
```
```

                           A D fAlex; Tippy; Shells; Shadowg                              dead pets
```
```
                          B D fred; blue; yellowg                                   primary colors
```
```
                          C D ffa; bg; fa; cg; fb; cgg                                 a set of sets
```
```

             This works fine for small finite sets. Other sets might be defined by indicating how
```
```
             to generate a list of them:
```
```

                              D WWD f1; 2; 4; 8; 16; : : :g                      the powers of 2
```
```

               The order of elements is not significant, so fx; yg and fy; xg are the same set
```
```
             written two different ways. Also, any object is, or is not, an element of a given set—
```
```
             there is no notion of an element appearing more than once in a set.1 So, writing
```
```
             fx; xg is just indicating the same thing twice: that x is in the set. In particular,
```
```
             fx; xg D fxg.
```
```
               The expression “e 2 S” asserts that e is an element of set S. For example,
```
```
             32 2 D and blue 2 B, but Tailspin 62 A—yet.
```
```
               Sets are simple, flexible, and everywhere. You’ll find some set mentioned in
```
```
             nearly every section of this text.
```
```
                1 It’s not hard to develop a notion of multisets in which elements can occur more than once, but
```
```

             multisets are not ordinary sets and are not covered in this text.
```
```
           

## 104 Chapter 4    Mathematical Data Types
```
```

      4.1.1    Some Popular Sets
```
```
      Mathematicians have devised special symbols to represent some common sets.
```
```

                  symbol    set                       elements
```
```
                  ;         the empty set             none
```
```
                  N         nonnegative integers      f0; 1; 2; 3; : : :g
```
```
                  Z         integers                  f: : : ; 3; 2; 1; 0; 1; 2; 3; : : :g
```
```
                                                      1       5
```
```
                  Q         rational numbers          2;      3 ; 16;petc.
```
```
                  R         real numbers              ; e; p9; 2; etc.
```
```
                  C         complex numbers           i; 192 ;     2 2i; etc.
```
```

      A superscript “C ” restricts a set to its positive elements; for example, RC denotes
```
```
      the set of positive real numbers. Similarly, Z denotes the set of negative integers.
```
```

      4.1.2    Comparing and Combining Sets
```
```
      The expression S  T indicates that set S is a subset of set T , which means that
```
```
      every element of S is also an element of T . For example, N  Z because every
```
```
      nonnegative integer is an integer; Q  R because every rational number is a real
```
```
      number, but C 6 R because not every complex number is a real number.
```
```
         As a memory trick, think of the “” symbol as like the “” sign with the smaller
```
```
      set or number on the left-hand side. Notice that just as n  n for any number n,
```
```
      also S  S for any set S .
```
```
         There is also a relation  on sets like the “less than” relation < on numbers.
```
```
      S  T means that S is a subset of T , but the two are not equal. So just as n 6< n
```
```
      for every number n, also A 6 A, for every set A. “S  T ” is read as “S is a strict
```
```
      subset of T .”
```
```
         There are several basic ways to combine sets. For example, suppose
```
```

                                             X WWD f1; 2; 3g;
```
```
                                             Y WWD f2; 3; 4g:
```
```

      Definition 4.1.1.
```
```

           The union of sets A and B, denoted A [ B, includes exactly the elements
```
```
            appearing in A or B or both. That is,
```
```

                                   x 2A[B          IFF    x 2 A OR x 2 B:
```
```

              So X [ Y D f1; 2; 3; 4g.
```
```
      

4.1. Sets                                                                         105
```
```

     The intersection of A and B, denoted A \ B, consists of all elements that
```
```
      appear in both A and B. That is,
```
```

                         x 2A\B         IFF     x 2 A AND x 2 B:
```
```

        So, X \ Y D f2; 3g.
```
```

     The set difference of A and B, denoted A        B, consists of all elements that
```
```
      are in A, but not in B. That is,
```
```

                         x2A       B    IFF     x 2 A AND x … B:
```
```

        So, X    Y D f1g and Y    X D f4g.
```
```

   Often all the sets being considered are subsets of a known domain of discourse
```
D. Then for any subset A of D, we define A to be the set of all elements of D not
in A. That is,
```
                                   A WWD D A:
```
The set A is called the complement of A. So
```

                                 A D ; IFF A D D:
```
```

   For example, if the domain we’re working with is the integers, the complement
```
of the nonnegative integers is the set of negative integers:
```

                                       NDZ :
```

  We can use complement to rephrase subset in terms of equality
```

                        A  B is equivalent to A \ B D ;:
```

#### 4.1.3 Power Set
The set of all the subsets of a set A is called the power set pow.A/ of A. So
```

                          B 2 pow.A/          IFF   B  A:
```

For example, the elements of pow.f1; 2g/ are ;; f1g; f2g and f1; 2g.
  More generally, if A has n elements, then there are 2n sets in pow.A/—see The-
orem 4.5.5. For this reason, some authors use the notation 2A instead of pow.A/.
```
            

## 106 Chapter 4    Mathematical Data Types
```
```

      4.1.4     Set Builder Notation
```
```
      An important use of predicates is in set builder notation. We’ll often want to talk
```
```
      about sets that cannot be described very well by listing the elements explicitly or
```
```
      by taking unions, intersections, etc., of easily described sets. Set builder notation
```
```
      often comes to the rescue. The idea is to define a set using a predicate; in particular,
```
```
      the set consists of all values that make the predicate true. Here are some examples
```
```
      of set builder notation:
```
```

                  A WWD fn 2 N j n is a prime and n D 4k C 1 for some integer kg;
```
```
                  B WWD fx 2 R j x 3       3x C 1 > 0g;
```
```
                  C WWD fa C bi 2 C j a2 C 2b 2  1g;
```
```
                  D WWD fL 2 books j L is cited in this textg:
```
```
         The set A consists of all nonnegative integers n for which the predicate
```
```
                          “n is a prime and n D 4k C 1 for some integer k”
```
```
      is true. Thus, the smallest elements of A are:
```
```
                                   5; 13; 17; 29; 37; 41; 53; 61; 73; : : : :
```
```
      Trying to indicate the set A by listing these first few elements wouldn’t work very
```
```
      well; even after ten terms, the pattern is not obvious. Similarly, the set B consists
```
```
      of all real numbers x for which the predicate
```
```
                                                x3   3x C 1 > 0
```
```
      is true. In this case, an explicit description of the set B in terms of intervals would
```
```
      require solving a cubic equation. Set C consists of all complex numbers a C bi
```
```
      such that:
```
```
                                           a2 C 2b 2  1
```
```
      This is an oval-shaped region around the origin in the complex plane. Finally, the
```
```
      members of set D can be determined by filtering out journal articles in from the list
```
```
      of references in the Bibliography 22.5.
```
```

      4.1.5     Proving Set Equalities
```
```
      Two sets are defined to be equal if they have exactly the same elements. That is,
```
```
      X D Y means that z 2 X if and only if z 2 Y , for all elements z.2 So, set
```
```
      equalities can be formulated and proved as “iff” theorems. For example:
```
```
         2 This is actually the first of the ZFC axioms for set theory mentioned at the end of Section 1.3
```
```

      and discussed further in Section 8.3.2.
```
```
      

4.1. Sets                                                                       107
```

Theorem 4.1.2. [Distributive Law for Sets] Let A, B and C be sets. Then:
```

                        A \ .B [ C / D .A \ B/ [ .A \ C /                      (4.1)
```

Proof. The equality (4.1) is equivalent to the assertion that
```

                  z 2 A \ .B [ C / iff      z 2 .A \ B/ [ .A \ C /             (4.2)
```

for all z. Now we’ll prove (4.2) by a chain of iff’s.
   Now we have

  z 2 A \ .B [ C /
```
     iff    .z 2 A/ AND .z 2 B [ C /                                    (def of \)
```
```
     iff    .z 2 A/ AND .z 2 B OR z 2 C /                               (def of [)
```
```
     iff    .z 2 A AND z 2 B/ OR .z 2 A AND z 2 C / (AND distributivity (3.9))
```
```
     iff    .z 2 A \ B/ OR .z 2 A \ C /                                 (def of \)
```
```
     iff    z 2 .A \ B/ [ .A \ C /                                      (def of [)
```
```

                                                                                 
```
```

   Of course there are lots of ways to prove such set equality formulas, but we em-
```
phasize this chain-of-IFF’s approach because it illustrates a general method. You
can automate proving any set equality involving [; \; and complement by re-
ducing verification of the set equality into checking validity of a corresponding
propositional equivalence. We know validity can be checked automatically in lots
of ways, for example by truth table or algebra.
   As a further example, from De Morgan’s Law (3.14) for propositions
```

                      NOT .P AND Q/ is equivalent to P OR Q
```

we can derive (Problem 4.5) a corresponding De Morgan’s Law for set equality:
```

                                  A \ B D A [ B:                               (4.3)
```
```

   In fact, if a set equality is not valid, this approach can also be used to find a
```
simple counter-example (Problem 4.10).
   Despite this correspondence between set and propositional formulas, it’s impor-
tant not to confuse propositional with set operations. For example, if X and Y are
sets, then it is wrong to write “X AND Y ” instead of “X \ Y .” Applying AND to
sets will cause your compiler—or your grader—to throw a type error, because an
operation that is supposed to be applied to truth values has been applied to sets.
Likewise, if P and Q are propositions, then it is a type error to write “P [ Q”
instead of “P OR Q.”
```
                 

## 108 Chapter 4   Mathematical Data Types
```

### 4.2 Sequences
```
           Sets provide one way to group a collection of objects. Another way is in a sequence,
```
```
           which is a list of objects called its components, members, or elements. Short se-
```
```
           quences are commonly described by listing the elements between parentheses; for
```
```
           example, the sequence .a; b; c/ has three components. It would also be referred to
```
```
           as a three element sequence or a sequence of length three. These phrases are all
```
```
           synonyms—sequences are so basic that they appear everywhere and there are a lot
```
```
           of ways to talk about them.
```
```
              While both sets and sequences perform a gathering role, there are several differ-
```
```
           ences.
```
```

                The elements of a set are required to be distinct, but elements in a sequence
```
```
                 can be the same. Thus, .a; b; a/ is a valid sequence of length three, but
```
```
                 fa; b; ag is a set with two elements, not three.
```
```

                The elements in a sequence have a specified order, but the elements of a
```
```
                 set do not. For example, .a; b; c/ and .a; c; b/ are different sequences, but
```
```
                 fa; b; cg and fa; c; bg are the same set.
```
```

                Texts differ on notation for the empty sequence; we use  for the empty
```
```
                 sequence.
```
```

              The product operation is one link between sets and sequences. A Cartesian
```
```
           product of sets, S1  S2      Sn , is a new set consisting of all sequences where
```
```
           the first component is drawn from S1 , the second from S2 , and so forth. Length two
```
```
           sequences are called pairs.3 For example, N  fa; bg is the set of all pairs whose
```
```
           first element is a nonnegative integer and whose second element is an a or a b:
```
```

                        N  fa; bg D f.0; a/; .0; b/; .1; a/; .1; b/; .2; a/; .2; b/; : : :g
```
```

           A product of n copies of a set S is denoted S n . For example, f0; 1g3 is the set of
```
```
           all 3-bit sequences:
```
```

           f0; 1g3 D f.0; 0; 0/; .0; 0; 1/; .0; 1; 0/; .0; 1; 1/; .1; 0; 0/; .1; 0; 1/; .1; 1; 0/; .1; 1; 1/g
```
```
              3 Some texts call them ordered pairs.
```
```
                  

           4.3. Functions                                                                   109
```

### 4.3 Functions
```
           4.3.1    Domains and Images
```
```
           A function assigns an element of one set, called the domain, to an element of an-
```
```
           other set, called the codomain. The notation
```
```

                                               f WA!B
```
```

           indicates that f is a function with domain A and codomain B. The familiar notation
```
```
           “f .a/ D b” indicates that f assigns the element b 2 B to a. Here b would be
```
```
           called the value of f at argument a.
```
```
             Functions are often defined by formulas, as in:
```
```
                                                           1
```
```
                                              f1 .x/ WWD
```
```
                                                           x2
```
```
           where x is a real-valued variable, or
```
```

                                           f2 .y; z/ WWD y10yz
```
```

           where y and z range over binary strings, or
```
```

                             f3 .x; n/ WWD the length n sequence .x; : : : ; x/
```
```
                                                                 „ ƒ‚ …
```
```
                                                                       n x’s
```
```

           where n ranges over the nonnegative integers.
```
```
              A function with a finite domain could be specified by a table that shows the value
```
```
           of the function at each element of the domain. For example, a function f4 .P; Q/
```
```
           where P and Q are propositional variables is specified by:
```
```

                                            P Q f4 .P; Q/
```
```
                                            T T     T
```
```
                                            T F     F
```
```
                                            F T     T
```
```
                                            F F     T
```
```

           Notice that f4 could also have been described by a formula:
```
```

                                     f4 .P; Q/ WWD ŒP IMPLIES Q:
```
```

              A function might also be defined by a procedure for computing its value at any
```
```
           element of its domain, or by some other kind of specification. For example, define
```
```
            

## 110 Chapter 4   Mathematical Data Types
```
```

      f5 .y/ to be the length of a left to right search of the bits in the binary string y until
```
```
      a 1 appears, so
```
```

                                       f5 .0010/ D 3;
```
```
                                        f5 .100/ D 1;
```
```
                                       f5 .0000/ is undefined:
```
```

         Notice that f5 does not assign a value to any string of just 0’s. This illustrates
```
```
      an important fact about functions: they need not assign a value to every element
```
```
      in the domain. In fact this came up in our first example f1 .x/ D 1=x 2 , which
```
```
      does not assign a value to 0. So in general, functions may be partial functions,
```
```
      meaning that there may be domain elements for which the function is not defined.
```
```
      The set of domain elements for which a function is defined is called the support of
```
```
      the function. If a function assigns a value to every element of its domain, that is, its
```
```
      support equals its domain, it is called a total function.
```
```
         It’s often useful to find the set of values a function takes when applied to the
```
```
      elements in a set of arguments. So if f W A ! B, and S is a subset of A, we define
```
```
      f .S / to be the set of all the values that f takes when it is applied to elements of S .
```
```
      That is,
```
```
                          f .S / WWD fb 2 B j f .s/ D b for some s 2 Sg:
```
```
      For example, if we let Œr; s denote set of numbers in the interval from r to s on the
```
```
      real line, then f1 .Œ1; 2/ D Œ1=4; 1.
```
```
          For another example, let’s take the “search for a 1” function f5 . If we let X be
```
```
      the set of binary words which start with an even number of 0’s followed by a 1,
```
```
      then f5 .X / would be the odd nonnegative integers.
```
```
          Applying f to a set S of arguments is referred to as “applying f pointwise to
```
```
      S ”, and the set f .S / is referred to as the image of S under f .4 The set of values
```
```
      that arise from applying f to all possible arguments is called the range of f . That
```
```
      is,
```
```
                                   range.f / WWD f .domain.f //:
```
```
      Some authors refer to the codomain as the range of a function, but they shouldn’t.
```
```
      The distinction between the range and codomain will be important later in Sec-
```
```
      tions 4.5 when we relate sizes of sets to properties of functions between them.
```
```
         4 There is a picky distinction between the function f  which applies to elements of A and the
```
```
      function which applies f pointwise to subsets of A, because the domain of f is A, while the domain
```
```
      of pointwise-f is pow.A/. It is usually clear from context whether f or pointwise-f is meant, so
```
```
      there is no harm in overloading the symbol f in this way.
```
```
                  

            4.4. Binary Relations                                                                             111
```
```

            4.3.2     Function Composition
```
```
            Doing things step by step is a universal idea. Taking a walk is a literal example, but
```
```
            so is cooking from a recipe, executing a computer program, evaluating a formula,
```
```
            and recovering from substance abuse.
```
```
               Abstractly, taking a step amounts to applying a function, and going step by step
```
```
            corresponds to applying functions one after the other. This is captured by the op-
```
```
            eration of composing functions. Composing the functions f and g means that first
```
```
            f is applied to some argument, x, to produce f .x/, and then g is applied to that
```
```
            result to produce g.f .x//.
```
```
            Definition 4.3.1. For functions f W A ! B and g W B ! C , the composition,
```
```
            g ı f , of g with f is defined to be the function from A to C defined by the rule:
```
```
                                               .g ı f /.x/ WWD g.f .x//;
```
```
            for all x 2 A.
```
```
              Function composition is familiar as a basic concept from elementary calculus,
```
```
            and it plays an equally basic role in discrete mathematics.
```

### 4.4 Binary Relations
```
            Binary relations define relations between two objects. For example, “less-than” on
```
```
            the real numbers relates every real number a to a real number b, precisely when
```
```
            a < b. Similarly, the subset relation relates a set A to another set B precisely when
```
```
            A  B. A function f W A ! B is a special case of binary relation in which an
```
```
            element a 2 A is related to an element b 2 B precisely when b D f .a/.
```
```
               In this section we’ll define some basic vocabulary and properties of binary rela-
```
```
            tions.
```
```
            Definition 4.4.1. A binary relation R consists of a set A, called the domain of R,
```
```
            a set B called the codomain of R, and a subset of A  B called the graph of R.
```
```
               A relation whose domain is A and codomain is B is said to be “between A and
```
```
            B”, or “from A to B.” As with functions, we write R W A ! B to indicate that R
```
```
            is a relation from A to B. When the domain and codomain are the same set A we
```
```
            simply say the relation is “on A.” It’s common to use “a R b” to mean that the pair
```
```
            .a; b/ is in the graph of R.5
```
```
                5 Writing the relation or operator symbol between its arguments is called infix notation. Infix
```
```

            expressions like “m < n” or “m C n” are the usual notation used for things like the less-then relation
```
```
            or the addition operation rather than prefix notation like “< .m; n/” or “C.m; n/.”
```
```
           

## 112 Chapter 4   Mathematical Data Types
```
```

         Notice that Definition 4.4.1 is exactly the same as the definition in Section 4.3
```
```
      of a function, except that it doesn’t require the functional condition that, for each
```
```
      domain element a, there is at most one pair in the graph whose first coordinate is
```
```
      a. As we said, a function is a special case of a binary relation.
```
```
         The “in-charge of” relation Chrg for MIT in Spring ’10 subjects and instructors
```
```
      is a handy example of a binary relation. Its domain Fac is the names of all the
```
```
      MIT faculty and instructional staff, and its codomain is the set SubNums of subject
```
```
      numbers in the Fall ’09–Spring ’10 MIT subject listing. The graph of Chrg contains
```
```
      precisely the pairs of the form
```
```

                                .hinstructor-namei ; hsubject-numi/
```
```

      such that the faculty member named hinstructor-namei is in charge of the subject
```
```
      with number hsubject-numi that was offered in Spring ’10. So graph.Chrg/ con-
```
```
      tains pairs like
```
```
                               .T. Eng;           6.UAT/
```
```
                               .G. Freeman;       6.011/
```
```
                               .G. Freeman;       6.UAT/
```
```
                               .G. Freeman;       6.881/
```
```
                               .G. Freeman;       6.882/
```
```
                               .J. Guttag;        6.00/
```
```
                               .A. R. Meyer; 6.042/                              (4.4)
```
```
                               .A. R. Meyer; 18.062/
```
```
                               .A. R. Meyer; 6.844/
```
```
                               .T. Leighton; 6.042/
```
```
                               .T. Leighton; 18.062/
```
```
                                    ::
```
```
                                     :
```
```
         Some subjects in the codomain SubNums do not appear among this list of pairs—
```
```
      that is, they are not in range.Chrg/. These are the Fall term-only subjects. Simi-
```
```
      larly, there are instructors in the domain Fac who do not appear in the list because
```
```
      they are not in charge of any Spring term subjects.
```
```

      4.4.1   Relation Diagrams
```
```
      Some standard properties of a relation can be visualized in terms of a diagram. The
```
```
      diagram for a binary relation R has points corresponding to the elements of the
```
```
      domain appearing in one column (a very long column if domain.R/ is infinite). All
```
```
      the elements of the codomain appear in another column which we’ll usually picture
```
```
      as being to the right of the domain column. There is an arrow going from a point a
```
```
      in the left-hand, domain column to a point b in the right-hand, codomain column,
```
```
      

4.4. Binary Relations                                                             113
```

precisely when the corresponding elements are related by R. For example, here are
diagrams for two functions:
```

               A                B                  A                  B
```
```
               a           -    1                  a             -    1
```
```
               b PP             2                  b PP               2
```
```
                    PP
```
```
                       3                                PP
```
```
                                                           3
```
```
                      Pq                                  Pq
```
```
               c PP P         3                  c Q  P           3
```
```
                  PP 3
```
```
                                                     Q
```
```
                                                      
```
```
                      Pq
```
```
               d   P         4                  d  QQ             4
```
```
                                                         QQ
```
```
               e                                          s
```
```
                                                                      5
```
```

   Being a function is certainly an important property of a binary relation. What it
```
means is that every point in the domain column has at most one arrow coming out
of it. So we can describe being a function as the “ 1 arrow out” property. There
are four more standard properties of relations that come up all the time. Here are
all five properties defined in terms of arrows:
Definition 4.4.2. A binary relation R is:
```
     a function when it has the Œ 1 arrow out property.
```
```

     surjective when it has the Œ 1 arrows in property. That is, every point in
```
```
      the right-hand, codomain column has at least one arrow pointing to it.
```
```

     total when it has the Œ 1 arrows out property.
```
```

     injective when it has the Œ 1 arrow in property.
```
```

     bijective when it has both the ŒD 1 arrow out and the ŒD 1 arrow in prop-
```
```
      erty.
```
```
    From here on, we’ll stop mentioning the arrows in these properties and for ex-
```
ample, just write Œ 1 in instead of Œ 1 arrows in.
```
    So in the diagrams above, the relation on the left has the ŒD 1 out and Œ 1 in
```
properties, which means it is a total, surjective function. But it does not have the
Œ 1 in property because element 3 has two arrows going into it; it is not injective.
```
    The relation on the right has the ŒD 1 out and Œ 1 in properties, which means
```
it is a total, injective function. But it does not have the Œ 1 in property because
element 4 has no arrow going into it; it is not surjective.
```
    The arrows in a diagram for R correspond, of course, exactly to the pairs in the
```
graph of R. Notice that the arrows alone are not enough to determine, for example,
```
           

## 114 Chapter 4   Mathematical Data Types
```
```

      if R has the Œ 1 out, total, property. If all we knew were the arrows, we wouldn’t
```
```
      know about any points in the domain column that had no arrows out. In other
```
```
      words, graph.R/ alone does not determine whether R is total: we also need to
```
```
      know what domain.R/ is.
```
```
      Example 4.4.3. The function defined by the formula 1=x 2 has the Œ 1 out prop-
```
```
      erty if its domain is RC , but not if its domain is some set of real numbers including
```
```
      0. It has the ŒD 1 in and ŒD 1 out property if its domain and codomain are both
```
```
      RC , but it has neither the Œ 1 in nor the Œ 1 out property if its domain and
```
```
      codomain are both R.
```
```

      4.4.2   Relational Images
```
```
      The idea of the image of a set under a function extends directly to relations.
```
```

      Definition 4.4.4. The image of a set Y under a relation R written R.Y /, is the set
```
```
      of elements of the codomain B of R that are related to some element in Y . In terms
```
```
      of the relation diagram, R.Y / is the set of points with an arrow coming in that starts
```
```
      from some point in Y . The range range.R/ of R is the image R.A/ of the domain
```
```
      A of R. That is, range.R/ is the set of all points in the codomain with an arrow
```
```
      coming in.
```
```

         For example, the set of subject numbers that Meyer is in charge of in Spring ’10
```
```
      is exactly Chrg.A. Meyer/. To figure out what this is, we look for all the arrows
```
```
      in the Chrg diagram that start at “A. Meyer,” and see which subject-numbers are
```
```
      at the other end of these arrows. Looking at the list (4.4) of pairs in graph.Chrg/,
```
```
      we see that these subject-numbers are f6.042, 18.062, 6.844g. Similarly, to find the
```
```
      subject numbers that either Freeman or Eng are in charge of, we can collect all the
```
```
      arrows that start at either “G. Freeman,” or “T. Eng” and, again, see which subject-
```
```
      numbers are at the other end of these arrows. This is Chrg.fG. Freeman; T. Engg/.
```
```
      Looking again at the list (4.4), we see that
```
```

                  Chrg.fG. Freeman; T. Engg/ D f6.011, 6.881, 6.882, 6.UATg
```
```

      Finally, Fac is the set of all in-charge instructors, so Chrg.Fac/ is the set of all the
```
```
      subjects listed for Spring ’10.
```
```

      Inverse Relations and Images
```
```
      Definition 4.4.5. The inverse, R 1 of a relation R W A ! B is the relation from B
```
```
      to A defined by the rule
```
```
                                    b R 1 a IFF a R b:
```
```
                  

            4.5. Finite Cardinality                                                       115
```
```

               In other words, R 1 is the relation you get by reversing the direction of the
```
```
            arrows in the diagram of R.
```
```

            Definition 4.4.6. The inverse image of a set X  B under the relation R is defined
```
```
            to be R 1 .X /, namely, the set of elements in A connected by an arrow to some
```
```
            element in B. The support support.R/ is defined to R 1 .B/, namely, the set of
```
```
            domain elements with at least one arrow out. The support of R is also called the
```
```
            domain of definition of R.
```
```

               Continuing with the in-charge example above, the set of instructors in charge
```
```
            of 6.UAT in Spring ’10 is exactly the inverse image of f6.UATg under the Chrg
```
```
            relation. From the list (4.4), we see that Eng and Freeman are both in charge of
```
```
            6.UAT, that is,
```
```

                                      fT. Eng; D. Freemang  Chrg 1 .f6.UATg/:
```
```

            We can’t assert equality here because there may be additional pairs further down
```
```
            the list showing that additional instructors are co-incharge of 6.UAT.
```
```
              Now let Intro be the set of introductory course 6 subject numbers. These are the
```
```
            subject numbers that start with “6.0.” So the set of names of the instructors who
```
```
            were in-charge of introductory course 6 subjects in Spring ’10, is Chrg 1 .Intro/.
```
```
            From the part of the Chrg list shown in (4.4), we see that Meyer, Leighton, Free-
```
```
            man, and Guttag were among the instructors in charge of introductory subjects in
```
```
            Spring ’10. That is,
```
```

                            fMeyer, Leighton, Freeman, Guttagg  Chrg 1 .Intro/:
```
```

            Finally, Chrg 1 .SubNums/ is the set of all instructors who were in charge of a
```
```
            subject listed for Spring ’10.
```

### 4.5 Finite Cardinality
```
            A finite set is one that has only a finite number of elements. This number of ele-
```
```
            ments is the “size” or cardinality of the set:
```
```

            Definition 4.5.1. If A is a finite set, the cardinality jAj of A is the number of
```
```
            elements in A.
```
```

             A finite set may have no elements (the empty set), or one element, or two ele-
```
```
            ments,. . . , so the cardinality of finite sets is always a nonnegative integer.
```