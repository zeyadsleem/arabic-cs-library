---
title: "Recursive Data Types"
lang: en
---

## 7 Recursive Data Types
```
            Recursive data types play a central role in programming, and induction is really all
```
```
            about them.
```
```
               Recursive data types are specified by recursive definitions, which say how to
```
```
            construct new data elements from previous ones. Along with each recursive data
```
```
            type there are recursive definitions of properties or functions on the data type. Most
```
```
            importantly, based on a recursive definition, there is a structural induction method
```
```
            for proving that all data of the given type have some property.
```
```
               This chapter examines a few examples of recursive data types and recursively
```
```
            defined functions on them:
```
```
                strings of characters,
```
```

                “balanced” strings of brackets,
```
```

                the nonnegative integers, and
```
```

                arithmetic expressions.
```
```

                two-player games with perfect information.
```

### 7.1 Recursive Definitions and Structural Induction
```
            We’ll start off illustrating recursive definitions and proofs using the example of
```
```
            character strings. Normally we’d take strings of characters for granted, but it’s
```
```
            informative to treat them as a recursive data type. In particular, strings are a nice
```
```
            first example because you will see recursive definitions of things that are easy to
```
```
            understand, or that you already know, so you can focus on how the definitions work
```
```
            without having to figure out what they are supposed to mean.
```
```
               Definitions of recursive data types have two parts:
```
```

                Base case(s) specifying that some known mathematical elements are in the
```
```
                 data type, and
```
```

                Constructor case(s) that specify how to construct new data elements from
```
```
                 previously constructed elements or from base elements.
```
```
              The definition of strings over a given character set A follows this pattern:
```
```
           

## 218 Chapter 7   Recursive Data Types
```
```

      Definition 7.1.1. Let A be a nonempty set called an alphabet, whose elements are
```
```
      referred to as characters (also called letters, symbols, or digits). The recursive data
```
```
      type A of strings over alphabet A is defined as follows:
```
```

           Base case: the empty string  is in A .
```
```

           Constructor case: If a 2 A and s 2 A , then the pair ha; si 2 A .
```
```

        So f0; 1g are the binary strings.
```
```
        The usual way to treat binary strings is as sequences of 0’s and 1’s. For example,
```
```
      we have identified the length-4 binary string 1011 as a sequence of bits, the 4-tuple
```
```
      .1; 0; 1; 1/. But according to the recursive Definition 7.1.1, this string would be
```
```
      represented by nested pairs, namely
```
```

                                         h1; h0; h1; h1; iiii :
```
```

      These nested pairs are definitely cumbersome and may also seem bizarre, but they
```
```
      actually reflect the way that such lists of characters would be represented in pro-
```
```
      gramming languages like Scheme or Python, where ha; si would correspond to
```
```
      cons.a; s/.
```
```
        Notice that we haven’t said exactly how the empty string is represented. It really
```
```
      doesn’t matter, as long as we can recognize the empty string and not confuse it with
```
```
      any nonempty string.
```
```
        Continuing the recursive approach, let’s define the length of a string.
```
```

      Definition 7.1.2. The length jsj of a string s is defined recursively based on Defi-
```
```
      nition 7.1.1.
```
```

      Base case: jj WWD 0.
```
```

      Constructor case: j ha; si j WWD 1 C jsj.
```
```

         This definition of length follows a standard pattern: functions on recursive data
```
```
      types can be defined recursively using the same cases as the data type definition.
```
```
      Specifically, to define a function f on a recursive data type, define the value of f
```
```
      for the base cases of the data type definition, then define the value of f in each
```
```
      constructor case in terms of the values of f on the component data items.
```
```
         Let’s do another example: the concatenation s  t of the strings s and t is the
```
```
      string consisting of the letters of s followed by the letters of t. This is a per-
```
```
      fectly clear mathematical definition of concatenation (except maybe for what to do
```
```
      with the empty string), and in terms of Scheme/Python lists, s  t would be the list
```
```
      append.s; t /. Here’s a recursive definition of concatenation.
```
```
      

7.1. Recursive Definitions and Structural Induction                                 219
```

Definition 7.1.3. The concatenation s  t of the strings s; t 2 A is defined recur-
sively based on Definition 7.1.1:

Base case:
```
                                            t WWD t:
```

Constructor case:
```
                                   ha; si  t WWD ha; s  ti :
```

#### 7.1.1 Structural Induction
Structural induction is a method for proving that all the elements of a recursively
defined data type have some property. A structural induction proof has two parts
corresponding to the recursive definition:
```

     Prove that each base case element has the property.
```
```

     Prove that each constructor case element has the property, when the construc-
```
```
      tor is applied to elements that have the property.
```
```

   For example, in the base case of the definition of concatenation 7.1.3, we defined
```
concatenation so the empty string was a “left identity,” namely,   s WWD s. We
intend the empty string also to be a “right identity,” namely, s   D s. Being a
right identity is not part of Definition 7.1.3, but we can prove it easily by structural
induction:

Lemma 7.1.4.
```
                                            sDs
```
for all s 2 A .

Proof. The proof is by structural induction on the recursive definition 7.1.3 of con-
catenation. The induction hypothesis will be
```

                                    P .s/ WWD Œs   D s:
```

Base case: (s D ).
```

              sD
```
```
                    D                      ( is a left identity by Def 7.1.3)
```
```
                    D s:
```
```
           

## 220 Chapter 7   Recursive Data Types
```
```

      Constructor case: (s D ha; ti).
```
```
                  s   D ha; ti  
```
```
                        WWD ha; t  i :            (Constructor case of Def 7.1.3)
```
```
                        D ha; ti                      by induction hypothesis P .t /
```
```
                        D s:
```
```
      So P .s/ holds. This completes the proof of the constructor case, and we conclude
```
```
      by structural induction that equation (7.1.4) holds for all s 2 A .           
```
```

        We can also verify properties of recursive functions by structural induction on
```
```
      their definitions. For example, let’s verify the familiar fact that the length of the
```
```
      concatenation of two strings is the sum of their lengths:
```
```
      Lemma.
```
```
                                           js  t j D jsj C jtj
```
```
      for all s; t 2 A .
```
```
      Proof. By structural induction on the definition of s 2 A . The induction hypoth-
```
```
      esis is
```
```
                             P .s/ WWD 8t 2 A : js  t j D jsj C jtj:
```
```

      Base case (s D ):
```
```
               js  tj D j  tj
```
```
                      D jt j               (base case of Def 7.1.3 of concatenation)
```
```
                      D 0 C jt j
```
```
                      D jsj C jt j                                        (Def of jj):
```
```

      Constructor case: (s WWD ha; ri).
```
```
               js  tj D j ha; ri  tj
```
```
                      D j ha; r  t i j            (constructor case of Def of concat)
```
```
                      D 1 C jr  t j                   (constructor case of def length)
```
```
                      D 1 C .jrj C jtj/                               (ind. hyp. P .r/)
```
```
                      D .1 C jrj/ C jtj
```
```
                      D j ha; ri j C jtj              (constructor case, def of length)
```
```
                      D jsj C jtj:
```
```
      This proves that P .s/ holds, completing the constructor case. By structural induc-
```
```
      tion, we conclude that P .s/ holds for all strings s 2 A .                      
```
```
                   

            7.2. Strings of Matched Brackets                                                 221
```
```

              These proofs illustrate the general principle:
```
```

            The Principle of Structural Induction.
```
```
            Let P be a predicate on a recursively defined data type R. If
```
```

                  P .b/ is true for each base case element b 2 R, and
```
```

                  for all two-argument constructors c,
```
```

                                         ŒP .r/ AND P .s/ IMPLIES P .c.r; s//
```
```

                    for all r; s 2 R,
```
```
                    and likewise for all constructors taking other numbers of arguments,
```
```

            then
```
```
                                               P .r/ is true for all r 2 R:
```

### 7.2 Strings of Matched Brackets
```
            Let f] ; [ g be the set of all strings of square brackets. For example, the following
```
```
            two strings are in f] ; [ g :
```
```

                                       []][[[[[]]          and [ [ [ ] ] [ ] ] [ ]           (7.1)
```
```

               A string s 2 f] ; [ g is called a matched string if its brackets “match up” in
```
```
            the usual way. For example, the left-hand string above is not matched because its
```
```
            second right bracket does not have a matching left bracket. The string on the right
```
```
            is matched.
```
```
               We’re going to examine several different ways to define and prove properties
```
```
            of matched strings using recursively defined sets and functions. These properties
```
```
            are pretty straightforward, and you might wonder whether they have any particular
```
```
            relevance in computer science. The honest answer is “not much relevance any
```
```
            more.” The reason for this is one of the great successes of computer science, as
```
```
            explained in the text box below.
```
```
             

## 222 Chapter 7    Recursive Data Types
```
```

      Expression Parsing
```
```
      During the early development of computer science in the 1950’s and 60’s, creation
```
```
      of effective programming language compilers was a central concern. A key aspect
```
```
      in processing a program for compilation was expression parsing. One significant
```
```
      problem was to take an expression like
```
```

                                            x C y  z2  y C 7
```
```

      and put in the brackets that determined how it should be evaluated—should it be
```
```

                                           ŒŒx C y  z 2  y C 7; or;
```
```
                                           x C Œy  z 2  Œy C 7; or;
```
```
                                   Œx C Œy  z 2   Œy C 7; or : : :‹
```
```

         The Turing award (the “Nobel Prize” of computer science) was ultimately be-
```
```
      stowed on Robert W. Floyd, for, among other things, discovering simple proce-
```
```
      dures that would insert the brackets properly.
```
```
         In the 70’s and 80’s, this parsing technology was packaged into high-level
```
```
      compiler-compilers that automatically generated parsers from expression gram-
```
```
      mars. This automation of parsing was so effective that the subject no longer
```
```
      demanded attention. It had largely disappeared from the computer science cur-
```
```
      riculum by the 1990’s.
```
```

           The matched strings can be nicely characterized as a recursive data type:
```
```
      Definition 7.2.1. Recursively define the set RecMatch of strings as follows:
```
```

             Base case:  2 RecMatch.
```
```

             Constructor case: If s; t 2 RecMatch, then
```
```
                                               [ s ] t 2 RecMatch:
```
```

           Here [ s ] t refers to the concatenation of strings which would be written in full
```
```
      as
```
```
                                               [  .s  .]  t //:
```
```
      From now on, we’ll usually omit the “’s.”
```
```
        Using this definition,  2 RecMatch by the base case, so letting s D t D  in
```
```
      the constructor case implies
```
```
                                          [ ]  D [ ] 2 RecMatch:
```
```
      

7.2. Strings of Matched Brackets                                                          223
```

Now,
```

           [ ] [ ] D [ ] [ ] 2 RecMatch                    (letting s D ; t D [ ] )
```
```
           [ [ ] ]  D [ [ ] ] 2 RecMatch                   (letting s D [ ] ; t D )
```
```
                     [ [ ] ] [ ] 2 RecMatch                (letting s D [ ] ; t D [ ] )
```

are also strings in RecMatch by repeated applications of the constructor case; and
so on.
   It’s pretty obvious that in order for brackets to match, there had better be an equal
number of left and right ones. For further practice, let’s carefully prove this from
the recursive definitions, beginning with a recursive definition of the number #c .s/
of occurrences of the character c 2 A in a string s:

Definition 7.2.2.
Base case: #c ./ WWD 0.
Constructor case:
```
                                         (
```
```
                                          #c .s/              if a ¤ c;
```
```
                         #c .ha; si/ WWD
```
```
                                          1 C #c .s/          if a D c:
```

 The following Lemma follows directly by structural induction on Definition 7.2.2.
We’ll leave the proof for practice (Problem 7.9).

Lemma 7.2.3.
```
                                   #c .s  t / D #c .s/ C #c .t /:
```

Lemma. Every string in RecMatch has an equal number of left and right brackets.

Proof. The proof is by structural induction with induction hypothesis
```
                                     h               i
```
```
                           P .s/ WWD #[ .s/ D #] .s/ :
```

Base case: P ./ holds because
```

                                      #[ ./ D 0 D #] ./
```

by the base case of Definition 7.2.2 of #c ./.
```
           

## 224 Chapter 7   Recursive Data Types
```
```

      Constructor case: By structural induction hypothesis, we assume P .s/ and P .t /
```
```
      and must show P .[ s ] t /:
```
```

            #[ .[ s ] t / D #[ .[ / C #[ .s/ C #[ .] / C #[ .t /       (Lemma 7.2.3)
```
```
                        D 1 C #[ .s/ C 0 C #[ .t /                           (def #[ ./)
```
```
                        D 1 C #] .s/ C 0 C #] .t /                 (by P .s/ and P .t /)
```
```
                        D 0 C #] .s/ C 1 C #] .t /
```
```
                        D #] .[ / C #] .s/ C #] .] / C #] .t /               (def #] ./)
```
```
                        D #] .[ s ] t /                                (Lemma 7.2.3)
```
```

      This completes the proof of the constructor case. We conclude by structural induc-
```
```
      tion that P .s/ holds for all s 2 RecMatch.                                     
```
```

         Warning: When a recursive definition of a data type allows the same element
```
```
      to be constructed in more than one way, the definition is said to be ambiguous.
```
```
      We were careful to choose an unambiguous definition of RecMatch to ensure that
```
```
      functions defined recursively on its definition would always be well-defined. Re-
```
```
      cursively defining a function on an ambiguous data type definition usually will not
```
```
      work. To illustrate the problem, here’s another definition of the matched strings.
```
```

      Definition 7.2.4. Define the set, AmbRecMatch  f] ; [ g recursively as follows:
```
```

           Base case:  2 AmbRecMatch,
```
```

           Constructor cases: if s; t 2 AmbRecMatch, then the strings [ s ] and st are
```
```
            also in AmbRecMatch.
```
```

         It’s pretty easy to see that the definition of AmbRecMatch is just another way
```
```
      to define RecMatch, that is AmbRecMatch D RecMatch (see Problem 7.20). The
```
```
      definition of AmbRecMatch is arguably easier to understand, but we didn’t use it
```
```
      because it’s ambiguous, while the trickier definition of RecMatch is unambiguous.
```
```
      Here’s an example that illustrates why this matters. Let’s define the number of
```
```
      operations f .s/ to construct a matched string s recursively on the definition of
```
```
      s 2 AmbRecMatch:
```
```

                              f ./ WWD 0;                                     (f base case)
```
```
                          f .[ s ] / WWD 1 C f .s/;
```
```
                             f .st / WWD 1 C f .s/ C f .t /:                 (f concat case)
```
```
                  

            7.3. Recursive Functions on Nonnegative Integers                                   225
```
```

            This definition may seem ok, but it isn’t: f ./ winds up with two values, and
```
```
            consequently:
```
```

                          0 D f ./                                    (f base case))
```
```
                            D f .  /                        (concat def, base case)
```
```
                            D 1 C f ./ C f ./                      (f concat case);
```
```
                            D1C0C0D1                                   (f base case):
```
```

            This is definitely not a situation we want to be in!
```

### 7.3 Recursive Functions on Nonnegative Integers
```
            The nonnegative integers can be understood as a recursive data type.
```
```

            Definition 7.3.1. The set N is a data type defined recursively as:
```
```

                 0 2 N.
```
```

                 If n 2 N, then the successor n C 1 of n is in N.
```
```

              The point here is to make it clear that ordinary induction is simply the special
```
```
            case of structural induction on the recursive Definition 7.3.1. This also justifies the
```
```
            familiar recursive definitions of functions on the nonnegative integers.
```
```

            7.3.1    Some Standard Recursive Functions on N
```
```
            Example 7.3.2. The factorial function. This function is often written “nŠ.” You will
```
```
            see a lot of it in later chapters. Here, we’ll use the notation fac.n/:
```
```

                 fac.0/ WWD 1.
```
```

                 fac.n C 1/ WWD .n C 1/  fac.n/ for n  0.
```
```

            Example 7.3.3. Summation notation. Let “S.n/” abbreviate the expression “ niD1 f .i /.”
```
```
                                                                                     P
```
```
            We can recursively define S.n/ with the rules
```
```

                 S.0/ WWD 0.
```
```

                 S.n C 1/ WWD f .n C 1/ C S.n/ for n  0.
```
```
           

## 226 Chapter 7   Recursive Data Types
```
```

      7.3.2    Ill-formed Function Definitions
```
```
      There are some other blunders to watch out for when defining functions recursively.
```
```
      The main problems come when recursive definitions don’t follow the recursive def-
```
```
      inition of the underlying data type. Below are some function specifications that re-
```
```
      semble good definitions of functions on the nonnegative integers, but really aren’t.
```
```

                                   f1 .n/ WWD 2 C f1 .n       1/:                           (7.2)
```
```

      This “definition” has no base case. If some function f1 satisfied (7.2), so would a
```
```
      function obtained by adding a constant to the value of f1 . So equation (7.2) does
```
```
      not uniquely define an f1 .
```
```

                                           (
```
```
                                               0;           if n D 0;
```
```
                              f2 .n/ WWD                                                    (7.3)
```
```
                                               f2 .n C 1/   otherwise:
```
```

      This “definition” has a base case, but still doesn’t uniquely determine f2 . Any
```
```
      function that is 0 at 0 and constant everywhere else would satisfy the specification,
```
```
      so (7.3) also does not uniquely define anything.
```
```
         In a typical programming language, evaluation of f2 .1/ would begin with a re-
```
```
      cursive call of f2 .2/, which would lead to a recursive call of f2 .3/, . . . with recur-
```
```
      sive calls continuing without end. This “operational” approach interprets (7.3) as
```
```
      defining a partial function f2 that is undefined everywhere but 0.
```
```

                                      8
```
```
                                      <0; if n is divisible by 2,
```
```
                                      ˆ
```
```
                            f3 .n/ WWD 1; if n is divisible by 3,                           (7.4)
```
```
                                      ˆ
```
```
                                        2; otherwise.
```
```
                                      :
```
```

      This “definition” is inconsistent: it requires f3 .6/ D 0 and f3 .6/ D 1, so (7.4)
```
```
      doesn’t define anything.
```
```
         Mathematicians have been wondering about this function specification, known
```
```
      as the Collatz conjecture for a while:
```
```
                                   8
```
```
                                   <1;
```
```
                                   ˆ               if n  1;
```
```
                        f4 .n/ WWD f4 .n=2/        if n > 1 is even;               (7.5)
```
```
                                   ˆ
```
```
                                     f4 .3n C 1/ if n > 1 is odd:
```
```
                                   :
```
```

      For example, f4 .3/ D 1 because
```
```

      f4 .3/ WWD f4 .10/ WWD f4 .5/ WWD f4 .16/ WWD f4 .8/ WWD f4 .4/ WWD f4 .2/ WWD f4 .1/ WWD 1:
```
```
                  

            7.4. Arithmetic Expressions                                                       227
```
```

            The constant function equal to 1 will satisfy (7.5), but it’s not known if another
```
```
            function does as well. The problem is that the third case specifies f4 .n/ in terms
```
```
            of f4 at arguments larger than n, and so cannot be justified by induction on N. It’s
```
```
            known that any f4 satisfying (7.5) equals 1 for all n up to over 1018 .
```
```
               A final example is the Ackermann function, which is an extremely fast-growing
```
```
            function of two nonnegative arguments. Its inverse is correspondingly slow-growing—
```
```
            it grows slower than log n, log log n, log log log n, . . . , but it does grow unboundly.
```
```
            This inverse actually comes up analyzing a useful, highly efficient procedure known
```
```
            as the Union-Find algorithm. This algorithm was conjectured to run in a number
```
```
            of steps that grew linearly in the size of its input, but turned out to be “linear”
```
```
            but with a slow growing coefficient nearly equal to the inverse Ackermann func-
```
```
            tion. This means that pragmatically, Union-Find is linear, since the theoretically
```
```
            growing coefficient is less than 5 for any input that could conceivably come up.
```
```
               The Ackermann function can be defined recursively as the function A given by
```
```
            the following rules:
```
```

                     A.m; n/ D 2n                                if m D 0 or n  1;         (7.6)
```
```
                     A.m; n/ D A.m        1; A.m; n   1//        otherwise:                 (7.7)
```
```

               Now these rules are unusual because the definition of A.m; n/ involves an eval-
```
```
            uation of A at arguments that may be a lot bigger than m and n. The definitions
```
```
            of f2 above showed how definitions of function values at small argument values in
```
```
            terms of larger one can easily lead to nonterminating evaluations. The definition of
```
```
            the Ackermann function is actually ok, but proving this takes some ingenuity (see
```
```
            Problem 7.26).
```

### 7.4 Arithmetic Expressions
```
            Expression evaluation is a key feature of programming languages, and recognition
```
```
            of expressions as a recursive data type is a key to understanding how they can be
```
```
            processed.
```
```
               To illustrate this approach we’ll work with a toy example: arithmetic expressions
```
```
            like 3x 2 C 2x C 1 involving only one variable, “x.” We’ll refer to the data type of
```
```
            such expressions as Aexp. Here is its definition:
```
```

            Definition 7.4.1.
```
```

                 Base cases:
```
```
           

## 228 Chapter 7    Recursive Data Types
```
```

                  – The variable x is in Aexp.
```
```
                  – The arabic numeral k for any nonnegative integer k is in Aexp.
```
```

           Constructor cases: If e; f 2 Aexp, then
```
```

                  – [ e + f ] 2 Aexp. The expression [ e + f ] is called a sum. The Aexp’s
```
```
                    e and f are called the components of the sum; they’re also called the
```
```
                    summands.
```
```
                  – [ e * f ] 2 Aexp. The expression [ e * f ] is called a product. The
```
```
                    Aexp’s e and f are called the components of the product; they’re also
```
```
                    called the multiplier and multiplicand.
```
```
                  – - [ e ] 2 Aexp. The expression - [ e ] is called a negative.
```
```

         Notice that Aexp’s are fully bracketed, and exponents aren’t allowed. So the
```
```
      Aexp version of the polynomial expression 3x 2 C2x C1 would officially be written
```
```
      as
```
```
                             [ [ 3 * [ x * x ] ] + [ [ 2 * x ] + 1] ] :           (7.8)
```
```
      These brackets and ’s clutter up examples, so we’ll often use simpler expressions
```
```
      like “3x 2 C2xC1” instead of (7.8). But it’s important to recognize that 3x 2 C2xC1
```
```
      is not an Aexp; it’s an abbreviation for an Aexp.
```
```

      7.4.1   Evaluation and Substitution with Aexp’s
```
```
      Evaluating Aexp’s
```
```
      Since the only variable in an Aexp is x, the value of an Aexp is determined by the
```
```
      value of x. For example, if the value of x is 3, then the value of 3x 2 C 2x C 1
```
```
      is 34. In general, given any Aexp e and an integer value n for the variable x we
```
```
      can evaluate e to finds its value eval.e; n/. It’s easy, and useful, to specify this
```
```
      evaluation process with a recursive definition.
```
```

      Definition 7.4.2. The evaluation function, eval W Aexp  Z ! Z, is defined recur-
```
```
      sively on expressions e 2 Aexp as follows. Let n be any integer.
```
```

           Base cases:
```
```

                   eval.x; n/ WWD n                       (value of variable x is n),    (7.9)
```
```
                   eval.k; n/ WWD k       (value of numeral k is k, regardless of x.)   (7.10)
```
```
      

7.4. Arithmetic Expressions                                                                229
```
```

     Constructor cases:
```
```

                       eval.[ e1 + e2 ] ; n/ WWD eval.e1 ; n/ C eval.e2 ; n/;           (7.11)
```
```
                       eval.[ e1 * e2 ] ; n/ WWD eval.e1 ; n/  eval.e2 ; n/;           (7.12)
```
```
                              eval.- [ e1 ] ; n/ WWD   eval.e1 ; n/:                    (7.13)
```
```

   For example, here’s how the recursive definition of eval would arrive at the value
```
of 3 C x 2 when x is 2:

  eval.[ 3 + [ x * x ] ] ; 2/ D eval.3; 2/ C eval.[ x * x ] ; 2/ (by Def 7.4.2.7.11)
```
                                D 3 C eval.[ x * x ] ; 2/                (by Def 7.4.2.7.10)
```
```
                                D 3 C .eval.x; 2/  eval.x; 2//          (by Def 7.4.2.7.12)
```
```
                                D 3 C .2  2/                             (by Def 7.4.2.7.9)
```
```
                                D 3 C 4 D 7:
```

Substituting into Aexp’s
Substituting expressions for variables is a standard operation used by compilers
and algebra systems. For example, the result of substituting the expression 3x for
x in the expression x.x 1/ would be 3x.3x 1/. We’ll use the general notation
subst.f; e/ for the result of substituting an Aexp f for each of the x’s in an Aexp
e. So as we just explained,
```

                              subst.3x; x.x      1// D 3x.3x       1/:
```

  This substitution function has a simple recursive definition:

Definition 7.4.3. The substitution function from Aexp  Aexp to Aexp is defined
recursively on expressions e 2 Aexp as follows. Let f be any Aexp.
```

     Base cases:
```
```

            subst.f; x/ WWD f           (subbing f for variable x just gives f ,)       (7.14)
```
```
            subst.f; k/ WWD k            (subbing into a numeral does nothing.)         (7.15)
```
```

     Constructor cases:
```
```
            

## 230 Chapter 7   Recursive Data Types
```
```

                       subst.f; [ e1 + e2 ] / WWD [ subst.f; e1 / + subst.f; e2 /]          (7.16)
```
```
                       subst.f; [ e1 * e2 ] / WWD [ subst.f; e1 / * subst.f; e2 /]          (7.17)
```
```
                             subst.f; - [ e1 ] / WWD - [ subst.f; e1 /] :                   (7.18)
```
```

         Here’s how the recursive definition of the substitution function would find the
```
```
      result of substituting 3x for x in the expression x.x 1/:
```
```

       subst.3x; x.x        1//
```
```
        D subst.[ 3 * x ] ; [ x * [ x + - [ 1] ] ] /                            (unabbreviating)
```
```
        D [ subst.[ 3 * x ] ; x/ *
```
```
                   subst.[ 3 * x ] ; [ x + - [ 1] ] /]                        (by Def 7.4.3 7.17)
```
```
        D [ [ 3 * x ] * subst.[ 3 * x ] ; [ x + - [ 1] ] /]                   (by Def 7.4.3 7.14)
```
```
        D [ [ 3 * x ] * [ subst.[ 3 * x ] ; x/
```
```
                           + subst.[ 3 * x ] ; - [ 1] /] ]                    (by Def 7.4.3 7.16)
```
```
        D [ [ 3 * x ] * [ [ 3 * x ] + - [ subst.[ 3 * x ] ; 1/] ] ]    (by Def 7.4.3 7.14 & 7.18)
```
```
        D [ [ 3 * x ] * [ [ 3 * x ] + - [ 1] ] ]                              (by Def 7.4.3 7.15)
```
```
        D 3x.3x       1/                                                           (abbreviation)
```
```

         Now suppose we have to find the value of subst.3x; x.x 1// when x D 2.
```
```
      There are two approaches. First, we could actually do the substitution above to get
```
```
      3x.3x 1/, and then we could evaluate 3x.3x 1/ when x D 2, that is, we could
```
```
      recursively calculate eval.3x.3x 1/; 2/ to get the final value 30. This approach is
```
```
      described by the expression
```
```

                                       eval.subst.3x; x.x        1//; 2/:                   (7.19)
```
```

      In programming jargon, this would be called evaluation using the Substitution
```
```
      Model. With this approach, the formula 3x appears twice after substitution, so
```
```
      the multiplication 3  2 that computes its value gets performed twice.
```
```
         The second approach is called evaluation using the Environment Model. Here, to
```
```
      compute the value of (7.19), we evaluate 3x when x D 2 using just 1 multiplication
```
```
      to get the value 6. Then we evaluate x.x 1/ when x has this value 6 to arrive at
```
```
      the value 6  5 D 30. This approach is described by the expression
```
```

                                        eval.x.x       1/; eval.3x; 2//:                    (7.20)
```
```

      The Environment Model only computes the value of 3x once, and so it requires one
```
```
      fewer multiplication than the Substitution model to compute (7.20).
```
```
       

7.4. Arithmetic Expressions                                                                       231
```

  This is a good place to stop and work this example out yourself (Problem 7.27).
  The fact that the final integer values of (7.19) and (7.20) agree is no surprise. The
substitution model and environment models will always produce the same final. We
can prove this by structural induction directly following the definitions of the two
approaches. More precisely, what we want to prove is

Theorem 7.4.4. For all expressions e; f 2 Aexp and n 2 Z,
```

                            eval.subst.f; e/; n/ D eval.e; eval.f; n//:                       (7.21)
```

Proof. The proof is by structural induction on e.1
Base cases:
```

      Case[x]
```
```
        The left-hand side of equation (7.21) equals eval.f; n/ by this base case in
```
```
        Definition 7.4.3 of the substitution function; the right-hand side also equals
```
```
        eval.f; n/ by this base case in Definition 7.4.2 of eval.
```
```

      Case[k].
```
```
        The left-hand side of equation (7.21) equals k by this base case in Defini-
```
```
        tions 7.4.3 and 7.4.2 of the substitution and evaluation functions. Likewise,
```
```
        the right-hand side equals k by two applications of this base case in the Def-
```
```
        inition 7.4.2 of eval.
```

Constructor cases:
```

      Case[[ e1 + e2 ] ]
```
```
        By the structural induction hypothesis (7.21), we may assume that for all
```
```
        f 2 Aexp and n 2 Z,
```
```

                               eval.subst.f; ei /; n/ D eval.ei ; eval.f; n//                 (7.22)
```
```
        for i D 1; 2. We wish to prove that
```
```

                   eval.subst.f; [ e1 + e2 ] /; n/ D eval.[ e1 + e2 ] ; eval.f; n//:          (7.23)
```
```

        The left-hand side of (7.23) equals
```
```

                                 eval.[ subst.f; e1 / + subst.f; e2 /] ; n/
```
   1 This is an example of why it’s useful to notify the reader what the induction variable is—in this

case it isn’t n.
```
                

## 232 Chapter 7   Recursive Data Types
```
```

                 by Definition 7.4.3.7.16 of substitution into a sum expression. But this equals
```
```

                                    eval.subst.f; e1 /; n/ C eval.subst.f; e2 /; n/
```
```

                 by Definition 7.4.2.(7.11) of eval for a sum expression. By induction hypoth-
```
```
                 esis (7.22), this in turn equals
```
```

                                     eval.e1 ; eval.f; n// C eval.e2 ; eval.f; n//:
```
```

                 Finally, this last expression equals the right-hand side of (7.23) by Defini-
```
```
                 tion 7.4.2.(7.11) of eval for a sum expression. This proves (7.23) in this case.
```
```

                Case[[ e1 * e2 ] ] Similar.
```
```

                Case[ [ e1 ] ] Even easier.
```
```

             This covers all the constructor cases, and so completes the proof by structural
```
```
           induction.
```
```
                                                                                          
```

### 7.5 Games as a Recursive Data Type
```
           Chess, Checkers, Go, and Nim are examples of two-person games of perfect in-
```
```
           formation. These are games where two players, Player-1 and Player-2, alternate
```
```
           moves, and “perfect information” means that the situation at any point in the game
```
```
           is completely visible to both players. In Chess, for example, the visible positions
```
```
           of the pieces on the chess board completely determine how the rest of the game can
```
```
           be played by each player. By contrast, most card games are not games of perfect
```
```
           information because neither player can see the other’s hand.
```
```
              In the section we’ll examine the win-lose two-person games of perfect informa-
```
```
           tion, WinLoseGm. We will define WinLoseGm as a recursive data type, and then
```
```
           we will prove, by structural induction, a fundamental theorem about winning strate-
```
```
           gies for these games. The idea behind the recursive definition is to recognize that
```
```
           the situation at any point during game play can itself be treated as the start of a new
```
```
           game. This is clearest for the game of Nim.
```
```
              A Nim game starts with several piles of stones. A move in the game consists of
```
```
           removing some positive number of stones from a single pile. Player-1 and player-2
```
```
           alternate making moves, and whoever takes the last stone wins. So if there is only
```
```
           one pile, then the first player to move wins by taking the whole pile.
```
```
              A Nim game is defined by the sizes of the piles of stones at the start.
```
```
     

7.5. Games as a Recursive Data Type                                             233
```

  For example, let Nimh3;2i be the Nim game that starts with one size-three pile
and one size-two pile. In this game, Player-1 has 2 C 3 D 5 possible moves
corresponding to removing one to three stones from the size-three pile, or one to
two stones from the size-two pile. These five moves lead respectively to five new
Nim games in which Player-2 will move first:;
```
                    remove 1 from the size-three pile:   Nimh2;2i ;
```
```
                    remove 2 from the size-three pile:   Nimh2;1i ;
```
```
                    remove 3 from the size-three pile:   Nimh2i ;
```
```
                    remove 1 from the size-two pile:     Nimh1;3i ;
```
```
                    remove 2 from the size-two pile:     Nimh3i :
```
Let’s call these the first-move games Fmvh3;2i of Nimh3;2i :
```

         Fmvh3;2i D fNimh2;2i ; Nimh2;1i ; Nimh2i ; Nimh1;3i ; Nimh3i g:     (7.24)
```

Now instead of saying Player-1’s move is to pick some number of stones to remove
from some pile, we can say that Player-1’s move is to select one of these first-move
Nim games in which Player-2 will move first. Abstractly we can define Nimh3;2i to
be its set of first moves:
```
                             Nimh3;2i WWD Fmvh3;2i :
```
   This is the big idea: we can recursively define a Nim game to be a set of Nim
games. The base case will be the empty set of Nim games, corresponding to the
Nim game with no piles; this is the game in which the player who moves first
immediately loses.
   Let’s see how this works for Nimh3;2i . Each of the first-move games listed
in (7.24) abstractly is the same as its own set of first-move games. To take the
simplest case, in the first-move game Nimh2i , player-2 has two possible moves: he
can remove one stone from the pile leaving Nimh1i , or he can remove the whole
pile leaving the game Nimh;i with no piles.
```

                             Fmvh2i D fNimh1i ; Nimh;i g:
```

Since taking the whole pile leaves Player-1 with no move to make, that is,
```

                                Nimh;i WWD Fmvh;i D ;;
```

this is a winning move for player-2.
   But suppose player-2 chooses to remove only one stone. This move leaves the
one-pile one-stone game Nimh1i . Now player-1 has no choice but to choose the
single first move in Fmvh1i :
```

                              Fmvh1i WWD fNimh;i g D f;g:
```
```
           

## 234 Chapter 7   Recursive Data Types
```
```

      That is, player-1 must choose the empty set and then wins, since player-2 is left
```
```
      with no move to make.
```
```
        So abstractly, Nimh2i is just a pure set made out of nothing:
```
```

                                             Nimh2i D ff;g; ;g:
```
```

      Likewise, the whole Nimh3;2i game abstractly is another pure set:
```
```

                    f
```
```
                        f;; f;gg;
```
```
                        ff;; f;gg; ff;g; ff;gg; f;; f;gggg
```
```
                        f;; f;g; f;; f;ggg
```
```
                        ff;g; ff;gg; f;f;ggg
```
```
                        ff;g; ff;gg; f;; f;g; f;; f;ggg; ff;g; ff;gg; f;; f;gggg
```
```
                        g
```
```

         In fact, we could keep expanding any Nim game until all the numbers disap-
```
```
      peared leaving only a set of sets of sets of. . . sets bottoming out at the empty set.
```
```
      This example hints at some of the connections between Nim games and pure set
```
```
      theory,2 which we will explore a bit further in Section 8.3.3, Problem 8.42.
```
```
         By the way, the winning move for player-1 in Nimh3;2i is to remove one stone
```
```
      from the size-three pile, leaving player-2 the first move in Nimh2;2i . This is a
```
```
      winning move because the player who moves second in any game of two same-size
```
```
      piles can guarantee a win simply by mimicking the first player. For example, if
```
```
      the first player removes one stone from one pile, then the second player removes
```
```
      one stone from the other pile. It’s worth thinking for a moment about why the
```
```
      mimicking strategy guarantees a win for the second player. More generally,
```
```
      there is an elegant procedure to figure out who has a winning strategy in any Nim
```
```
      game (Problem 7.36).
```
```
         Nim games are special in that the two players are racing to the same goal, namely,
```
```
      leaving their opponent with no move. More generally, a two-person game can end
```
```
      in different ways, some of which count as wins for player-1 and others as losses—
```
```
      that is, wins for player-2. With this idea in mind, we now give the formal definition
```
```
      of win-lose games.
```
```

      Definition 7.5.1. The class WinLoseGm of two-person win-lose games of perfect
```
```
      information is defined recursively as follows:
```
```
      Base case: P1Win and P2Win are WinLoseGm’s.
```
```
         2 Insert ref to Conway’s nimbers.
```
```
      

7.5. Games as a Recursive Data Type                                                             235
```

Constructor case: If G is a nonempty set of WinLoseGm’s, then G is a WinLoseGm
game. Each game M 2 G is called a possible first move of G.
```

   A play of a WinLoseGm game is a sequence of moves that ends with a win or
```
loss for the first player, or goes on forever without arriving at an outcome.3 More
formally:

Definition. A play of a WinLoseGm game G and its outcome is defined recursively
on the definition of WinLoseGm:
Base case: (G D P1Win). The sequence hP1Wini of length one is a play of G. Its
outcome is a win for player-1.
Base case: (G D P2Win). The sequence hP2Wini of length one is a play of G. Its
outcome is a loss for player-1, or equivalently, a win for player-2.
Constructor case: (G is a nonempty set of WinLoseGm’s). A play of G is a
sequence that starts with G followed by a play PM of some game M 2 G. The
outcome of the play, if any, is the outcome of PM .
```

   The basic rules of some games do allow plays that go on forever. In Chess for
```
example, a player might just keep moving the same piece back and forth, and if his
opponent did the same, the play could go on forever.4 But the recursive definition
of WinLoseGm games actually rules out the possibility of infinite play.

Lemma 7.5.2. Every play of a game G 2 WinLoseGm has an outcome.

Proof. We prove Lemma 7.5.2 by structural induction, using the statement of the
Lemma as the induction hypothesis.
Base case: (G D P1Win). There is only one play of G, namely the length one
play hP1Wini, whose outcome is a win for player-1.
Base case: (G D P2Win). Likewise with the outcome being a win for player-2.
Constructor case: (G is a nonempty set of WinLoseGm’s). A play of G by defini-
tion consists G followed by a play PM for some M 2 G. By structural induction,
PM must be a sequence of some finite length n that ends with an outcome. So this
play of G is a length n C 1 sequence that finishes with the same outcome.     
   3 In English, “Nim game” might refer to the rules that define the game, but it might also refer

to a particular play of the game—as in the once famous third game in the 1961 movie Last Year at
Marienbad. It’s usually easy to figure out which way the phrase is being used, and we won’t worry
about it.
```
    4 Real chess tournaments rule this out by setting an advance limit on the number of moves, or by
```

forbidding repetitions of the same position more than twice.
```
           

## 236 Chapter 7   Recursive Data Types
```
```

         Among the games of Checkers, Chess, Go and Nim, only Nim is genuinely a
```
```
      win-lose game. The other games might end in a tie/draw/stalemate/jigo rather than
```
```
      a win or loss. But the results about win-lose games will apply to games with ties if
```
```
      we simply treat a tie as a loss for player-1.
```
```
         In all the games like this that we’re familiar with, there are only a finite number
```
```
      of possible first moves and a bound on the possible length of play. It’s worth noting
```
```
      that the definition of WinLoseGm does not require this. In fact, since finiteness is
```
```
      not needed to prove any of the results below, it would arguably be misleading to
```
```
      assume it.
```
```
         This observation that games might be infinite illustrates the surprising power of
```
```
      structural induction. The proof shows that even in infinite games, every play must
```
```
      have an outcome. This is not the same as saying that the length of play has a fixed
```
```
      bound. For example, there is a game whose first move allows, for every nonempty
```
```
      integer n, selection of a game that can played for exactly n steps. Even though
```
```
      every play in such a game has an outcome, there are plays of every finite length.
```
```
         Infinite games are a little far-fetched for Computer Science applications, but they
```
```
      actually play an important role in the study of set theory and logic. A lovely feature
```
```
      of structural induction is that it implicitly applies to infinite structures even if you
```
```
      didn’t notice it.
```
```

      7.5.1   Game Strategies
```
```
      A strategy for a player is a rule that tells the player which move to make whenever
```
```
      it is their turn. More precisely, a strategy s is a function from games to games with
```
```
      the property that s.G/ 2 G for all games G. A pair of strategies for the two players
```
```
      determines exactly which moves the players choose, and so it determines a unique
```
```
      play of the game, depending on who moves first.
```
```
          A key question about a game is what strategy will ensure that a player will win.
```
```
      Each Player wants a strategy whose outcome is guaranteed to be a win for them-
```
```
      selves.
```
```

      7.5.2   Fundamental Theorem for Win-Lose Games
```
```
      The Fundamental Theorem for WinLoseGm games says that one of the players
```
```
      always has a fixed “winning” strategy that guarantees a win against every possible
```
```
      opponent strategy.
```
```
         Thinking about Chess for instance, this seems surprising. Serious chess players
```
```
      are typically secretive about their intended play strategies, believing that an oppo-
```
```
      nent could take advantage of knowing their strategy. Their concern seems to be that
```
```
      for any strategy they choose, their opponent could tailor a strategy to beat it.
```
```
         But the Fundamental Theorem says otherwise. In theory, in any win-lose-tie
```
```
      

7.5. Games as a Recursive Data Type                                                                    237
```

game like Chess or Checkers, each of the players will have a strategy that guar-
antees a win or a stalemate, even if the strategy is known to their opponent. That
is,
```

     there is winning strategy for one of the players, or
```
```

     both players have strategies that guarantee them at worst a draw.
```

  Even though the Fundamental Theorem reveals a profound fact about games, it
has a very simple proof by structural induction.

Theorem 7.5.3. [Fundamental Theorem for Win-Lose Games] For any WinLoseGm
game G, one of the players has a winning strategy.

Proof. The proof is by structural induction on the definition of a G 2 WinLoseGm.
The induction hypothesis is that one of the players has a winning strategy for G.
Base case: (G D P1Win or P2Win). Then there is only one possible strategy for
each player, namely, do nothing and finish with outcome G.
Constructor case: (G is a nonempty set of WinLoseGm’s). By structural induction
we may assume that for each M 2 G one of the players has a winning strategy.
Notice that since players alternate moves, the first player in G becomes the second
player in M .
   Now if there is a move M0 2 G where the second player in M0 has a winning
strategy, then the first player in G has a simple winning strategy: pick M0 as the
first move, and then follow the second player’s winning strategy for M0 .
   On the other hand, if no M 2 G has a winning strategy for the second player in
M , then we can conclude by induction that every M 2 G has a winning strategy for
the first player in M . Now the second player in G has a simple winning strategy,
namely if the first player in G makes the move M , then the second player in G
should follow the follow the winning strategy for the first player in M .        

  Notice that although Theorem 7.5.3 guarantees a winning strategy, its proof gives
no clue which player has it. For the Subset Takeaway Game of Problem 4.7 and
most familiar 2PerGm’s like Chess, Go, . . . , no one knows which player has a
winning strategy.5
```
    5 Checkers used to be in this list, but it’s now been shown that each player has a strategy that forces
```

a tie (reference TBA).
```
                 

## 238 Chapter 7   Recursive Data Types
```
```

            Infinite Games [Optional]
```
```
            Suppose we play a tournament of n chess games for some positive integer n. This
```
```
            tournament will be a WinLoseGm if we agree on a rule for combining the payoffs
```
```
            of the n individual chess games into a final payoff for the whole tournament.
```
```
               An n game tournament still has a bound on the length of play, namely, n times
```
```
            the maximum length of one game. But now suppose we define a meta-chess-
```
```
            tournament, whose first move is a choice of any positive integer n, after which we
```
```
            play an n-game tournament. Now the meta-chess-tournament is an infinite game—
```
```
            it has an infinite number of first moves.
```
```
               Only the first move in the meta-chess-tournament is infinite. If we set up a
```
```
            tournament consisting of n meta-chess-tournaments, this would be a game with
```
```
            n infinite sets of possible second moves. Then we oould go to meta-meta tourna-
```
```
            ments,. . . . Weird as these meta games may seem, the Fundamental Theorem still
```
```
            applies: in each of these games, one of the players will have winning strategy.
```

### 7.6 Search Trees
```
            Searching through data may be the most common of all computations, and search
```
```
            trees are a widely used data structure that supports efficient search.
```
```
               The basic idea behind search trees is simple. Assuming the data to be searched
```
```
            have some kind of order relation on them—like numerical order for numbers or
```
```
            alphabetical order for words—the data is laid out in a kind of branching “tree”
```
```
            structure illustrated in Figure 7.1. In this example, there are two branches at each
```
```
            branch point, with all the values in the left branch less than the value at the branch
```
```
            point, and all the values in the right branch greater than the value at the branch
```
```
            point. This makes it easy to search for a given value in the tree: starting at the
```
```
            topmost branchpoint, compare the given value to the value at the branchpoint. If
```
```
            the given value—call it g—is less than the value at the branchpoint—call it b—
```
```
            then continue searching in the left branch; if g is greater than b continue searching
```
```
            in the right branch; if g D b then the given value has been found, and the search
```
```
            ends successfully. Finally, if there are no more branches to search, then g is not
```
```
            there, so the search fails.
```
```
               For example, to search for 3.7 in the tree in Figure 7.1, we compare 3.7 to the
```
```
            value 6.8 at the topmost branch. Since 3:7 < 6:8, we go left and compare 3:7 to the
```
```
            new top value . Since 3:7 > , go right comparing 3.7 to 4.9, go left again, and
```
```
            arrive at 3.7. So the search ends successfully.
```
```
               Organizing the data in this way means you can search for a value without having
```
```
      

7.6. Search Trees                                                                 239
```
```

                     6.8
```
```
                    /    \
```
```
                  /       \
```
```
                 /          \
```
```
               /             \
```
```
            pi                8
```
```
           / \               / \
```
```
          /    \            7    9
```
```
        3      4.9
```
```
       / \       / \
```
```
    0.5 3.1 3.7 5
```
   /\          / \
 .4 .6       3.2 4
```

                         Figure 7.1    A binary search tree.
```

to scan through all the values in the data set. In fact, if the all the top-to-bottom
paths through the tree don’t differ too much in length, then with maximum path
length n, the search tree will hold up to 2n items. Since each search simply follows
some path, this means that searching for a value will take exponentially less time
than it would to search through all the data. That’s why search trees are a big win.
   Of course it is possible that the tree has paths that are not short. An extreme
example is illustrated in Figure 7.2 where there is a path containing half the values.
For this tree, the average search for a value requires searching halfway down the
path, and the exponential savings evaporates.
   By treating search trees as a recursive data type, we will be able to describe
simple recursive procedures for tree management, and we also will have a powerful
inductive proof method for proving properties of these trees and procedures. This
will allow concise formal definitions of search trees whose top-to-bottom paths are
close to the same length, and precise definitions of procedures for maintaining this
property as the data evolves through adding and removing values.
   Although we will end up with an elegant and efficient algorithm for tree search
and insertion, the importance of this section is its illustration of simple recursive
definitions for a basic data type and functions on the data. So there are a lot of
mathematical definitions in this section, because you can’t have a mathematical
proof about things that haven’t been mathematically defined. Once these definitions
are in place, we can proceed to prove data properties and procedure correctness
using the basic method for recursive data, namely, structural induction.
```
           

## 240 Chapter 7   Recursive Data Types
```
```

                                0
```
```
                               / \
```
```
                             /     \
```
```
                          .5        1
```
```
                                   / \
```
```
                                  /     \
```
```
                               1.5       2
```
```
                                       / \
```
```
                                      /    \
```
```
                                  2.5        3
```
```
                                      .       .
```
```
                                       .       .
```
```
                                         .       .
```
```
                                               / \
```
```
                                              /    \
```
```
                                          n+1/2     n
```
```

                           Figure 7.2    A very unbalanced search tree.
```
```

      7.6.1   Binary Branching
```
```
      The trees in the examples above have either a single “leaf” with no branching, or
```
```
      a binary (two-way) branch to the left and right. Allowing more than two branches
```
```
      is important in some applications, but binary branching is most common and is
```
```
      enough to illustrate all the important ideas.
```
```
         There are lots of ways to represent trees as a computer data structure—or a math-
```
```
      ematical set—but we will take an abstract approach that will enable us, largely, to
```
```
      understand binary trees without worrying about how they are represented.
```
```
         We can begin by assuming only that we have some set BBTr of things that rep-
```
```
      resent binary branching trees. A crucial property of a binary branching tree is
```
```
      whether or not it is a leaf. In any representation, there has to be way to test this. So
```
```
      there has to be a leaf predicate leaf? that does the job. That is, a binary branching
```
```
      tree T 2 BBTr is a leaf when leaf?.T / is true. Let Leaves be the set of leaves:
```
```

                                Leaves WWD fT 2 BBTr j leaf?.T /g:
```
```

      The non-leaf trees are supposed to be the trees that actually have left and right
```
```
      branches. In any representation of trees there has to be a way to select these
```
```
      branches, that is, there have to be selector functions left and right that produce the
```
```
      left and right branches of non-leaf elements of BBTr. We formalize this by defining
```
```
      

7.6. Search Trees                                                                     241
```

Branching WWD BBTr       Leaves and stipulating that that there are total functions
```

                               left W Branching ! BBTr;
```
```
                             right W Branching ! BBTr:
```

So by definition, the left branch of T is the tree left.T / and the right branch is
right.T /.

Subtrees
In the example search trees we started with, if you start at the top and follow some
path down, you arrive at a subtree that is also a search tree. Any such path can be
described by the sequence of left and right branches you select. For example in the
tree given in Figure 7.1, the sequence
```

                                   .right; left; left/:                           (7.25)
```

describes a length-three path that starts at the top tree T6:8 with label 6.8. The selec-
tors are applied in right-to-left order, so we first go to leftT6:8 which is the subtree
T labelled . Then we take the left branch to the subtree leftT which is the
subtree T3 labelled 3, and take a final right branch to end with the subtree rightT3
labelled 3.1. That is, the subtree at the end of the path given by the sequence (7.25)
is
```
                             right.left.leftT6:8 // D T3:1 :
```
  More generally, let PE be a finite sequence of selector functions and suppose
T 2 BBTr. The notation for the subtree at the end of the path described by PE is
subtreeT .PE /. For example, we just saw that
```

                        subtreeT6:8 ..right; left; left// D T3:1 :
```

Notice that if the path PE tries to continue past a leaf of T , there won’t be any
subtree at the end. For example, subtreeT6:8 .left; right; right/ is undefined since
subtreeT6:8 .right; right/ is the leaf labelled with 9 that has no left branch.
   There’s a technicality worth noting here that can be confusing. When people
talk about trees they normally mean the whole tree structure of the kind shown in
Figures 7.1 and 7.2 above. In this section, that’s not what “tree” means. Instead, a
tree is just a single point or node, namely the “root” node at the top. The rest of the
nodes below the root are by themselves trees that are called the subtrees of the tree.
   To formalize this, we will give a definition of subtreeT .PE / by induction on path
length. We’ll use the notation
```
                                           f  PE
```
```
            

## 242 Chapter 7   Recursive Data Types
```
```

      for the sequence that starts with f followed by the successive elements of PE . For
```
```
      example, if PE is the length three sequence in (7.25), then
```
```

                                                  right  PE
```
```

      is the length four sequence
```
```

                                          .right; right; left; left/:
```
```

      Likewise for PE  f , so for example
```
```

                                                  PE  right
```
```

      would be the length four sequence
```
```

                                          .right; left; left; right/:
```
```

      Definition 7.6.1. The tree subtreeT .PE / 2 BBTr will be defined by induction on
```
```
      the length of the sequence PE :
```
```
      Base case: (PE D ). Then
```
```

                                           subtreeT .PE / WWD T:
```
```

      Constructor case: (PE D f  Q).
```
```
                                    E If subtreeT .Q/  E is defined and equals a tree in
```
```
      Branching, then
```
```
                            subtreeT .PE / WWD f .subtreeT . E
```
```
                                                            Q//:
```
```
      Otherwise subtreeT .PE / is undefined.6
```
```

       Let Subtrs.T / be all the trees you can get to by following paths starting at T .
```
```
      More precisely,
```
```

      Definition 7.6.2.
```
```

        Subtrs.T / WWD fS 2 BBTr j S D subtreeT .PE / for some selector sequence PE g:
```
```
         6 An alternative Constructor case could have been
```
```

      Constructor case: (PE D Q
```
```
                              E  f ). If T 2 Branching, then
```
```

                                      subtreeT .PE / WWD subtreef .T / . E
```
```
                                                                        Q/:
```
```
      

7.6. Search Trees                                                                                     243
```

  The proper subtrees PropSubtrs.T / are the subtrees that are actually “below” T .

PropSubtrs.T /WWDfS 2 BBTr j S D subtreeT .PE / for some selector sequence PE ¤ g:

So we have by definition that
```

                             Subtrs.T / D PropSubtrs.T / [ fT g:                                  (7.26)
```
```

   There are a couple of obvious facts about paths and subtrees that we might just
```
take for granted but are worth saying explicitly. The first is that a proper subtree of
T must be a subtree of its left subtree or its right subtree:

Corollary 7.6.3. For T 2 Leaves,
```

                                       PropSubtrs.T / D ;:
```

For T 2 Branching,
```

                 PropSubtrs.T / D Subtrs.left.T // [ Subtrs.right.T //:
```

  Therefore,
```

                Subtrs.T / D fT g [ Subtrs.left.T // [ Subtrs.right.T //:                         (7.27)
```

  Corollary 7.6.3 follows from the fact when the first step in a path goes to a
subtree, the rest of the path is in that subtree.
  The second obvious fact is that a subtree of a subtree is a subtree:

Corollary 7.6.4. If S 2 PropSubtrs.T / and R 2 Subtrs.S /, then R 2 PropSubtrs.T /.
```

   Corollary 7.6.4 follows from the fact that if PE is a path in T to a subtree S of T ,
```
and Q E is a path in S to a subtree R of S , as in Figure 7.3, then the concatenation
QE  PE is a path from T to R.7

#### 7.6.2 Binary Trees
Although we’ve called the elements of BBTr binary branching “trees,” the abstract
way we defined BBTr allows some weird stuff to happen. One weirdness is that
nothing forbids “circular” trees that are proper subtrees of themselves. And even
if we forbid circular trees, there are still infinite trees. For example, suppose we
choose BBTr to be the nonnegative integers and define left.n/ WWD 2n C 1 and
right.n/ WWD 2n C 2. Now we get the infinite binary tree indicated in Figure 7.4.
   7 Path sequences are applied right-to-left, so E
```
                                                 Q PE is the path that starts with PE and then follows Q.
```
```
                                                                                                        E
```
```
           

## 244 Chapter 7   Recursive Data Types
```
```

                             T
```
```
                                  \
```
```
                                  /       } P
```
```
                              /
```
```
                             S
```
```
                         /
```
```
              Q {       /
```
```
                        \
```
```
                         R
```
```

                   Figure 7.3         A subbranch S of T and a subbranch R of S .
```
```

                                                                 0
```
```
                                                             /       \
```
```
                                                            /            \
```
```
                                                        /                 \
```
```
                                                       /                      \
```
```
                                                      1                 2
```
```
                                                     / \               / \
```
```
                                                   /    \            /    \
```
```
                                                  3       4         5       6
```
```
                                                / \     / \        / \    / \
```
```
                                               7     8 9 10      11 12 13 14
```
```
                                                .                .           .
```
```
                                               .                 .             .
```
```
                                           .                     .              .
```
```

                           Figure 7.4       An infinite tree with no leaves.
```
```
      

7.6. Search Trees                                                                 245
```
```

   The problem with both circular structures and infinite ones is that they will have
```
infinite paths that you might have to keep searching down without ever finishing.
By forbidding infinite paths we ensure that searches will end, and we also stop all
the circular and infinite weirdness.
   Paths that result in subtrees are by definition finite, so we should be clear about
the definition of an infinite path.
Definition 7.6.5. A infinite path in T 2 BBTr is an infinite sequence
```
                                  : : : ; fn ; : : : ; f1 ; f0
```
of selector functions such that
```
                             subtreeT .PE / 2 Branching
```
for every finite suffix
```
                               PE D .fn ; : : : ; f1 ; f0 /:
```
   But there’s still a problem. Even if they have no infinite paths, a tree in BBTr
may have some unexpected sharing of subtrees. For example, it is possible to have
a tree in BBTr whose left and right subtrees are the same.
Definition 7.6.6. A tree T 2 BBTr shares subtrees if there are two finite sequences
PE ¤ Q E of selector functions such that subtreeT .PE / and subtreeT .Q/E are both
defined, and
```
                          subtreeT .PE / D subtreeT .Q/:
```
```
                                                     E
```
   Sharing of subtrees can be very useful in getting a compact representation of
a tree, but it seriously complicates adding or removing values from search trees,
so we will forbid sharing as well. This leads us to FinTr, the familiar trees that
underlie search trees.
Definition 7.6.7.
```
    FinTr WWD fT 2 BBTr j T has no infinite path and does not share subtreesg:
```
  There is also a simple way to define trees recursively.
Definition 7.6.8. The set RecTr of recursive trees is defined recursively. For T 2
BBTr,
Base case: (T 2 Leaves). T 2 RecTr.
Constructor case: (T 2 Branching). If left.T /; right.T / 2 RecTr, and these two
trees have no subtree in common, that is,
```
                      Subtrs.left.T // \ Subtrs.right.T // D ;;
```
then T is in RecTr.
```
            

## 246 Chapter 7   Recursive Data Types
```
```

        Let’s verify first of all that recursive trees are finite.
```
```

      Definition 7.6.9. The size of a tree T 2 BBTr is the number of subtrees it has:
```
```

                                          size .T / WWD jSubtrs.T /j:                (7.28)
```
```

      Corollary 7.6.10. Every recursive tree has finite size.
```
```

      Proof. The proof is by structural induction on the definition of T 2 RecTr.
```
```
      Base case: (T 2 Leaves). The only subtree of T is itself, so
```
```

                                             size .T / D 1 < 1:
```
```

      Constructor case: (T 2 Branching). In this case, L WWD left.T / and R WWD right.T /
```
```
      are defined.
```
```
         By induction hypothesis, we may assume that the sizes of L and R are finite, so
```
```
      by (7.27),
```
```
                             size .T /  1 C size .L/ C size .R/                   (7.29)
```
```
      is also finite.8                                                                  
```
```

         Now it is an initially surprising, very useful, and—we think—very cool fact that
```
```
      the trees with no infinite paths and no shared subtrees are actually the same as the
```
```
      recursively defined trees. It takes a bit of ingenuity to prove this.
```
```

      Theorem 7.6.11. (Fundamental Theorem for Recursive Trees)
```
```

                                                FinTr D RecTr:
```
```

        We first prove
```
```
                                                RecTr  FinTr;                       (7.30)
```
```
      that is, no recursive tree T has an infinite path or a shared subtree.
```
```

      Proof. The proof follows by structural induction on the definition of RecTr:
```
```
      Base case: (T 2 Leaves). T has no infinite path or shared subtree because it has
```
```
      no proper subtrees at all.
```
```
      Constructor case: (T 2 Branching). In this case, left.T / and right.T / are defined
```
```
      and in RecTr. By induction hypothesis, neither left.T / nor right.T / has an infinite
```
```
      path nor sharing of subtrees.
```
```
         8 The inequality (7.29) is actually an equality, see (7.34) below.
```
```
         

7.6. Search Trees                                                                   247
```

  But if T had an infinite path
```

                               : : : ; fn ; : : : ; f2 ; f1 ; f0 ;
```

then
```
                                  : : : ; fn ; : : : ; f2 ; f1                   (7.31)
```
would be an infinite path in f0 .T /, contradicting the induction hypothesis. So T
cannot have an infinite path.
   Next we show that T has no shared subtree.
   Since T has no infinite path, T cannot be a subtree of left.T / or right.T /, and
so will not itself be a shared subtree. Since there are no shared subtrees within
left.T / or right.T /, the only remaining possibility would be a subtree that was in
both left.T / and right.T /, which is not possible by definition of RecTr.        

  Second, we prove
```
                                    FinTr  RecTr:                               (7.32)
```
Taking the contrapositive, if T 2 BBTr is not a recursive tree, we want to prove the
claim that it has an infinite path or it has a shared subtree.

Proof. If T … RecTr, then T cannot be a leaf. Now if left.T / and right.T / have a
subtree in common, then this subtree is shared in T , proving the claim. So we may
assume that left.T / and right.T / have no subtree in common. In this case, if both
left.T / and right.T / were in RecTr, then T would be in RecTr by definition, con-
tradicting the hypothesis that T … RecTr. Therefore left.T / and right.T / cannot
both be in RecTr.
   Let f0 be a selector such that f0 .T / … RecTr. Now if left.f0 .T // and right.f0 .T //
have a shared subtree, then, since a subtree of a subtree is a subtree (Corollary 7.6.4),
this will also be a shared subtree of T , proving the claim. Therefore, left.f0 .T //
and right.f0 .T // cannot both be in RecTr. Let f1 be a selector such that f1 .f0 .T // …
RecTr. Similarly, if there is no sharing or infinite path in f1 .f0 .T //, then there
must be a selector f2 such that f2 .f1 .f0 .T /// … RecTr. Continuing in this way,
we either find a shared subtree of T or we find an infinite path
```

                               : : : ; fn ; : : : ; f2 ; f1 ; f0
```

in T .                                                                               
```
           

## 248 Chapter 7   Recursive Data Types
```
```

      7.6.3   Properties of Recursive Trees
```
```
      With the recursive definition of trees, we can define some important basic functions
```
```
      on trees recursively. We start with a recursive definition of size:
```
```
      Definition 7.6.12. We define a function recsize W RecTr ! ZC by induction on the
```
```
      definition of RecTr:
```
```
      Base case: (T 2 Leaves).
```
```
                                           recsize.T / WWD 1:
```
```

      Constructor case: (T 2 Branching).
```
```

                    recsize.T / WWD 1 C recsize.left.T // C recsize.right.T //:
```
```

        A simple proof by structural induction confirms that the definition of recsize is
```
```
      correct, namely:
```
```
      Lemma 7.6.13.
```
```
                                         recsize.T / D size .T /
```
```
      for all T 2 RecTr.
```
```

      Proof. The proof is by structural induction on the definition of RecTr.
```
```
      Base case: (T 2 Leaves). By Corollary 7.6.3, Subtrs.T / D fT g, so
```
```

                           recsize.T / WWD 1 D jSubtrs.T /j D size .T / :
```
```

      Constructor case: (T 2 Branching).
```
```
        We have by induction hypothesis that
```
```

                       size .T / D recsize.f .T //;       for f 2 fleft; rightg:         (7.33)
```
```

      We have from 7.27 that
```
```

                     Subtrs.T / D fT g [ Subtrs.left.T // [ Subtrs.right.T //;
```
```

      for T 2 BBTr. Now if T 2 RecTr, then these three sets are disjoint, so
```
```

                                size .T / D 1 C size .T / C size .T / :                  (7.34)
```
```

      Now we have
```
```

         size .T / D 1 C recsize.left.T // C recsize.right.T //      (by (7.33) and (7.34))
```
```
                   D recsize.T /                                           (def. of recsize):
```
```

                                                                                                
```
```
      

7.6. Search Trees                                                                  249
```
```

   Similarly, the depth of a recursive tree is the length of its longest path. The
```
formal definition is:
```

                     depth .T / WWD maxfjPE j j subtreeT .PE / is a leafg:      (7.35)
```

  Here is the recursive definition:

Definition 7.6.14. Base case: (T 2 Leaves).
```

                                    recdepth.T / WWD 0:
```

Constructor case: (T 2 Branching).
```

         recdepth.T / WWD 1 C maxfrecdepth.left.T //; recdepth.right.T //g:
```

  Again, it follows directly by structural induction (Problem 7.44) that
Lemma 7.6.15.
```
                                recdepth.T / D depth .T / :                     (7.36)
```

#### 7.6.4 Depth versus Size
Arranging values in a search tree gives an efficient way to do repeated searches.
In this case, the longest search will be the length of the longest path to a leaf,
that is, the depth of the tree. So a first question to address is how short can we
guarantee searches will be compared to the size of the set to be searched? The
simple answer is that if the set to be searched has n values in it, then some searches
will unavoidably take log2 n value comparisons; moreover, there is a way to arrange
the values so that no search takes any longer than this minimum amount. The
following two Theorems confirm this.
   We first prove a basic relation between size and depth of recursive trees:
Theorem 7.6.16. For all T 2 RecTr,
```

                                size .T /  2depth.T /C1    1:                  (7.37)
```
```

   There is an easy way to understand and prove this inequality: if there were paths
```
of different lengths that ended at leaves, then there would be a bigger tree with the
same depth—just attach two new leaves to the leaf at the end of the shorter path.
So the biggest tree with depth d will be the complete tree T in which all paths have
depth d . In this tree there are two paths of length one that branch into four paths of
length two, continuing into 2d paths of length d . So
```

                    size .T / D 20 C 21 C 22 C    C 2d D 2d C1        1:
```
```
            

## 250 Chapter 7   Recursive Data Types
```
```

          There is also a proof by structural induction. The structural induction provides
```
```
      little insight into what’s going on and involves some tedious manipulation of ex-
```
```
      ponents. But it goes through routinely with no need for ingenuity, and it can be
```
```
      checked by a proof checker—a person or a computer program—with no insight
```
```
      into trees.
```
```

      Proof. It is enough to prove Theorem 7.6.16 for recsize and recdepth. The proof is
```
```
      by structural induction on the definition of RecTr:
```
```
      Base case: (T 2 Leaves).
```
```

                        recsize.T / WWD 1 D 20C1             1 D 2recdepth.T /C1       1:
```
```

      Constructor case: (T 2 Branching). By definition,
```
```

                     recsize.T / D 1 C recsize.left.T // C recsize.right.T //:                    (7.38)
```
```

      Let
```
```

                                             dl WWD recdepth.left.T //;
```
```
                                          dr WWD recdepth.right.T //:
```
```

      Then by induction hypothesis, the right hand side of (7.38) is
```
```

             1 C .2dl C1         1/ C .2dr C1        1/
```
```
             1 C .2maxfdl ;dr gC1            1/ C .2maxfdl ;dr gC1   1/
```
```
                   maxfdl ;dr gC1
```
```
            D22                         1
```
```
                   recdepth.T /
```
```
            D22                    1                                           (def of recdepth.T /)
```
```
            D 2recdepth.T /C1       1:
```
```

                                                                                                        
```
```

        Taking log2 of both sides of the inequality (7.37) confirms that the length of
```
```
      searches has to be at least one less than the log of the size of the data set to be
```
```
      searched:
```
```
      Corollary 7.6.17. For any recursive tree T 2 RecTr,
```
```

                                        depth .T /  log2 .size .T //      1:                     (7.39)
```
```

         On the other hand, searches need not be any longer than log2 of the size of the
```
```
      set of values. Namely, define a tree to be fully balanced when all the lengths of
```
```
      paths that end at leaves differ by at most one.
```
```
      

7.6. Search Trees                                                                 251
```

Theorem 7.6.18. If B 2 RecTr is fully balanced with depth at least one, then
```

                               size .B/  2depth.B/ C 1:
```

Proof. The smallest fully balanced tree with depth d  1 will be a complete tree
of depth d 1 along with two leaves of depth d , so its size will be .2d 1/ C 2 D
2d C 1.                                                                        

Corollary 7.6.19. For any odd positive integer n, there is a recursive binary tree—
namely a fully balanced tree of size n—that has depth at most log2 n.

#### 7.6.5 AVL Trees
As a set of values evolves by the insertion or deletion of values, maintaining a fully
balanced tree may require changing the branches of all the subtrees—an effort that
would swamp the time saved by having short searches. A “have your cake and eat
it too” approach is to loosen the fully balanced requirement while still maintaining
logarithmic search length.
```
    In AVL trees the fully balanced property is relaxed so that left and right branch
```
depths are allowed to differ by one everywhere.

Definition 7.6.20. A tree T 2 RecTr is an AVL tree when
```

                       jdepth .left.S //   depth .right.S //j  1
```

for all nonleaf subtrees S 2 Subtrs.T /.

Lemma 7.6.21. If T is AVL, then
```

                                 size .T /   depth.T / ;                     (7.40)
```

where  is the “golden ratio”
```
                                       p
```
```
                                    1C 5
```
```
                                          1:6:
```
```
                                      2
```
Proof. Let’s prove by strong induction on depth d the induction hypothesis
```

        P .d / WWD ŒT 2 RecTr AND recdepth.T / D d  IMPLIES size .T /  ad ;
```

for some a 2 R which we will derive in the course of the proof.
Base case: (d D 0). In this case T 2 Leaves, so
```

                                recsize.T / WWD 1 D a0 ;
```
```
           

## 252 Chapter 7   Recursive Data Types
```
```

      proving P .0/.
```
```
      Inductive step: Suppose T is an AVL tree of depth d C 1, and let L and R be the
```
```
      left and right subtrees of T . Then the depth of at least one of L and R must be d
```
```
      and the depth of the other must be at least d 1, by definition of AVL tree. By
```
```
      strong induction hypothesis, the size of one of L and R must be least ad and the
```
```
      size of the other at least ad 1 . So
```
```

                   recsize.T / D 1 C recsize.L/ C recsize.R/ > ad C ad 1 :
```
```

      Now P .d C 1/ will follow providing
```
```

                                          ad C ad 1  ad C1 ;
```
```

      which means
```
```
                                               1 C a  a2 :                            (7.41)
```
```
      Using the quadratic formula to solve (7.41) for equality, we find
```
```
                                  p                               p
```
```
                           . 1/ C . 1/2 4  1  . 1/          1C 5
```
```
                   aD                                     D             D
```
```
                                        2                        2
```
```
      satisfies (7.41), completing the proof.                                              
```
```

        Taking log2 of both sides of (7.40), we conclude
```
```
      Corollary 7.6.22. If T is an AVL tree, then
```
```
                                         log2 .size .T //
```
```
                        depth .T /                        1:44 log2 .size .T //:
```
```
                                            .log2 /
```
```
        In other words, searches in AVL trees at worst will take 1.44 times the optimal
```
```
      search time, and they will still be exponentially smaller than the size of the data set.
```
```

      7.6.6   Number Labels
```
```
      We described the basic idea of search trees at the beginning of this section and
```
```
      used it to explain why the connection between tree size and depth is important.
```
```
      Now we’ll define Search trees formally as a recursive data type. This will allow
```
```
      us to define search functions recursively and verify their properties by structural
```
```
      induction.
```
```
         Search trees have a numerical label on each subtree. Abstractly, this means there
```
```
      is a total function
```
```
                                      num W BBTr ! R:
```
```
        Let min.T / be the minimum label in T and likewise for max.T /. More formally,
```
```
      

7.6. Search Trees                                                                     253
```

Definition 7.6.23.
```

                     nums.T / WWD fnum.S / j S 2 Subtrs.T /g;                       (7.42)
```
```
                       min.T / WWD min nums.T /;                                    (7.43)
```
```
                       max.T / WWD max nums.T /:                                    (7.44)
```

  The min and max will exist for any finite tree T .

Definition 7.6.24. The Search trees T 2 BBTr are defined recursively as follows:
Base case: (T 2 Leaves). T is a Search tree.
Constructor case: (T 2 Branching). If left.T / and right.T / are both Search trees,
and
```
                  max.left.T // < num.T / < min.right.T //;
```
then T is a Search tree.
```

   Since Search trees by definition can’t have subtrees with the same label, they
```
have no shared subtrees. So every Search tree is a recursive tree in RecTr.
   The simple procedure for finding a number in a Search tree explained at the
beginning of this section can now be described as a recursive function srch. For
any Search tree T and number r, the value of srch.T; r/ will be the path in T that
leads to r, assuming r appears in T . Otherwise the value will be a path to a leaf
followed by fail.

Definition 7.6.25. The function
```

       srch W .(Search trees)  R/ ! fleft; rightg [ .ffailg  fleft; rightg /
```
```
                                                                                
```

is defined as follows:
   If r D num.T /, then
```
                                   srch.T; r/ WWD :
```
  If r ¤ num.T /, then srch.T; r/ is defined recursively on Definition 7.6.24 of
Search tree:
Base case: (T 2 Leaves).
```
                                  srch.T; r/ WWD fail:
```

Constructor case: (T 2 Branching).
```
                         (
```
```
                          srch.left.T /; r/  left       if r < num.T /;
```
```
          srch.T; r/ WWD
```
```
                          srch.right.T /; r/  right     if r > num.T /:
```
```
            

## 254 Chapter 7   Recursive Data Types
```
```

        We can now rigorously prove that the srch procedure always gives the correct
```
```
      answer.
```
```
      Theorem 7.6.26. If r 2 nums.T /, then srch.T; r/ is a sequence of selectors and
```
```
                                     num.subtreeT .srch.T; r/// D r:
```
```
        Otherwise, srch.T; r/ will be a sequence of the form fail PE for some sequence PE .
```
```
         Theorem 7.6.26 can be proved by a straightforward structural induction on the
```
```
      recursive Definition 7.6.24 of Search Tree. We’ll leave it as an exercise.9
```
```

      7.6.7    Insertions into AVL trees
```
```
      The procedure for inserting a value r into an AVL tree T can be defined recur-
```
```
      sively on the definition of AVL tree in a way that parallels the search procedure.
```
```
      If r is already a value in T , the search will discover this, and the insert proce-
```
```
      dure doesn’t have to do anything. If r is not a value in T , then it has to be in-
```
```
      serted recursively into one of the branches of T depending on how it compares
```
```
      to num.T /. More precisely, suppose A and B are the branches of T , that is,
```
```
      fA; Bg D fleft.T /; right.T /g, and A is the subtree into which r will be inserted.
```
```
      The result of inserting r into A will be a new AVL tree S with the same labels as A
```
```
      along with r. That is,
```
```
                                   nums.S / D frg [ nums.A/:
```
```
      Moreover, the depth of S will be at most one larger and no smaller that the depth
```
```
      of A.
```
```
         Now we let N be a new tree the same label as T , with one branch of N equal to
```
```
      S and the other branch of N equal to the B as shown in Figure 7.5. This makes N
```
```
      a Search tree whose branches are AVL trees and whose labels are the labels of T
```
```
      along with r. Now if the depth of S is at most one greater than the depth of B, then
```
```
      N will be the desired AVL tree.
```
```
         The only problem is that the depth of S may now be two greater than the depth of
```
```
      the B. The fix is to apply a “rotation operation” that rearranges the top few subtrees
```
```
      to balance depths.
```
```
         To explain rotation, we need to identify some subtrees of S and that will get
```
```
      rearranged. Let d WWD depth .B/. We know that depth .S / D d C 2. This means S
```
```
      has branches R; U whose depths are either d or d C1 with at least one of them with
```
```
      depth d C 1. Let U be the branch furthest from the middle, as shown in Figure 7.5.
```
```
         A simple case of rotation is when depth .U / D d C1. Here we define the rotation
```
```
      of N to be the tree X shown in Figure 7.6.
```
```
         9 At this early stage of practicing structural induction, the full proof really belongs in the text.
```
```

      We’ll include it when we get a chance.
```
```
      

7.6. Search Trees                                                              255
```
```

                                             N
```
```
                                             /\
```
```
                                            / \
```
```
                        (depth d)         B      S (depth d+2)
```
```
                                                /\
```
```
                                              / \
```
```
                                             R     U
```
```

                     Figure 7.5 The Tree N before rotation.
```
```
                                       X    num(X) = num(S)
```
```
                                      / \
```
```
                                     /    \
```
```
               num(Y) = num(N)     Y       U
```
```
                                  / \
```
```
                                /     \
```
```
                               B        R
```
```

                Figure 7.6   X is the rotation of tree N in Figure 7.5.
```
```

   Here X 2 RecTr is a “new” tree—that is, X … Subtrs.N /—with the same label
```
as S , and Y is a new tree with the same label as N . So nums.X / D nums.N /.
Also, depending on whether depth .R/ is d or d C 1, depth .Y / is d C 1 or d C 2,
which is within one of depth .U /, and depth .X/ is d C 2 or d C 3 which is within
one of depth .T /. So the depths of subtrees of X and Y are properly balanced
according to the AVL rule. It is easy to check that X is also a search tree, which
makes it an AVL search tree. Moreover, X has very nearly the same subtrees as N .
In particular,
```
                  Subtrs.X / D fX; Y g [ .Subtrs.N / fN; Sg/:
```
  There is another rearrangement of subtrees that handles the case when depth .U / D
d which we leave as an exercise (Problem 7.40). As a consequence, we have:

Lemma 7.6.27. (Rotation) There is a function
```

              rotate W .(AVL Trees)  R  (AVL Trees)/ ! (AVL Trees);
```

such that if B and S are AVL trees, r 2 R, depth .S / D depth .B/ C 2, and either
```

               max.B/ < r < min.S /;     or    max.S / < r < min.B/;
```
```
             

## 256 Chapter 7   Recursive Data Types
```
```

      then
```
```
                      nums.rotate.B; r; S // D nums.B/ [ frg [ nums.S /;
```
```
                      depth .S /  depth .rotate.B; r; S //  depth .S / C 1;
```
```
      and there are two size-three sets Snew , Sold of AVL trees, such that
```
```

               Subtrs.rotate.B; r; S // D .Subtrs.B/ [ Subtrs.S / [ Snew /      Sold :
```
```

         In defining the insert function, it turns out to be crucial to allow leaves to be
```
```
      labelled with one or two values, with both values obeying the labelling rules for
```
```
      search trees. (This could be viewed as a relaxation of binary branching at the leaf
```
```
      level, so the “father” of a leaf need have only one proper subtree instead of two.)
```
```
      Having this extra label at the leaves serves as a buffer that allows comprehensive
```
```
      relabelling to be deferred. Without such a buffer, a single insertion and deletion
```
```
      could force a relabelling of every subtree (Problem 7.42).
```
```

      Definition 7.6.28. The function
```
```

                              insert W (AVL trees)  R ! (AVL trees)
```
```

      is defined as follows:
```
```
         If r D num.T /, or if T 2 Leaves with two labels and r 2 num.T /, then
```
```

                                         insert.T; r/ WWD T;
```
```

        Otherwise insert.T; r/ is defined recursively on Definition 7.6.24 of Search tree:
```
```
      Base case: (T 2 Leaves).
```
```
      subcase: (T 2 Leaves with one label). Then insert.T; r/ will be a leaf labelled
```
```
      with the set of two values fr; num.T /g.
```
```
      subcase: (T 2 Leaves with two labels) Then insert.T; r/ is defined to be a depth
```
```
      one Search tree whose labels are the three values frg [ num.T /.
```
```
      Constructor case: (T 2 Branching).
```
```
        Then insert.T; r/ is defined by cases.
```
```
      subcase: (r > num.T //. Let S WWD insert.right.T /; r/ and B WWD left.T /.
```
```
        Let N be a “new” tree, that is,
```
```

                                    N … Subtrs.S / [ Subtrs.B/;
```