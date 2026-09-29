## 3.1. Lists[#](#lists)

An OCaml list is a sequence of values all of which have the same type. They are implemented as singly-linked lists. These lists enjoy a first-class status in the language: there is special support for easily creating and working with lists. That’s a characteristic that OCaml shares with many other functional languages. Mainstream imperative languages, like Python, have such support these days too. Maybe that’s because programmers find it so pleasant to work directly with lists as a first-class part of the language, rather than having to go through a library (as in C and Java).

### 3.1.1. Building Lists[#](#building-lists)

**Syntax.** There are three syntactic forms for building lists:

```ocaml
[]
e1 :: e2
[e1; e2; ...; en]
```

The empty list is written `[]` and is pronounced “nil”, a name that comes from Lisp. Given a list `lst` and element `elt`, we can prepend `elt` to `lst` by writing `elt :: lst`. The double-colon operator is pronounced “cons”, a name that comes from an operator in Lisp that constructs objects in memory. “Cons” can also be used as a verb, as in “I will cons an element onto the list.” The first element of a list is usually called its *head* and the rest of the elements (if any) are called its *tail*.

The cons operator `::` is right associative, meaning that `e1 :: e2 :: e3` is understood as `e1 :: (e2 :: e3)`, not as `(e1 :: e2) :: e3`.

The square bracket syntax is convenient but unnecessary. Any list `[e1; e2; ...; en]` could instead be written with the more primitive nil and cons syntax: `e1 :: e2 :: ... :: en :: []`. When a pleasant syntax can be defined in terms of a more primitive syntax within the language, we call the pleasant syntax *syntactic sugar*: it makes the language “sweeter”. Transforming the sweet syntax into the more primitive syntax is called *desugaring*.

Because the elements of the list can be arbitrary expressions, lists can be nested as deeply as we like, e.g., `[[[]]; [[1; 2; 3]]]`.

**Dynamic semantics.**

- `[]` is already a value.
- If `e1` evaluates to `v1`, and if `e2` evaluates to `v2`, then `e1 :: e2` evaluates to `v1 :: v2`.

As a consequence of those rules and how to desugar the square-bracket notation for lists, we have the following derived rule:

- If `ei` evaluates to `vi` for all `i` in `1..n`, then `[e1; ...; en]` evaluates to `[v1; ...; vn]`.

It’s starting to get tedious to write “evaluates to” in all our evaluation rules. So let’s introduce a shorter notation for it. We’ll write `e ==> v` to mean that `e` evaluates to `v`. Note that `==>` is not a piece of OCaml syntax. Rather, it’s a notation we use in our description of the language, kind of like metavariables. Using that notation, we can rewrite the latter two rules above:

- If `e1 ==> v1`, and if `e2 ==> v2`, then `e1 :: e2 ==> v1 :: v2`.
- If `ei ==> vi` for all `i` in `1..n`, then `[e1; ...; en] ==> [v1; ...; vn]`.

**Static semantics.**

All the elements of a list must have the same type. If that element type is `t`, then the type of the list is `t list`. You should read such types from right to left: `t list` is a list of `t`’s, `t list list` is a list of list of `t`’s, etc. The word `list` itself here is not a type: there is no way to build an OCaml value that has type simply `list`. Rather, `list` is a *type constructor*: given a type, it produces a new type. For example, given `int`, it produces the type `int list`. You could think of type constructors as being like functions that operate on types, instead of functions that operate on values.

The type-checking rules:

- `[] : 'a list`
- If `e1 : t` and `e2 : t list` then `e1 :: e2 : t list`. In case the colons and their precedence is confusing, the latter means `(e1 :: e2) : t list`.

In the rule for `[]`, recall that `'a` is a type variable: it stands for an unknown type. So the empty list is a list whose elements have an unknown type. If we cons an `int` onto it, say `2 :: []`, then the compiler infers that for that particular list, `'a` must be `int`. But if in another place we cons a `bool` onto it, say `true :: []`, then the compiler infers that for that particular list, `'a` must be `bool`.

### 3.1.2. Accessing Lists[#](#accessing-lists)

Note

The video linked above also uses records and tuples as examples. Those are covered in a [later section](records_tuples.html) of this book.

There are really only two ways to build a list, with nil and cons. So if we want to take apart a list into its component pieces, we have to say what to do with the list if it’s empty, and what to do if it’s non-empty (that is, a cons of one element onto some other list). We do that with a language feature called *pattern matching*.

Here’s an example of using pattern matching to compute the sum of a list:

```ocaml
let rec sum lst =
  match lst with
  | [] -> 0
  | h :: t -> h + sum t
```

```text
val sum : int list -> int = <fun>
```

This function says to take the input `lst` and see whether it has the same shape as the empty list. If so, return 0. Otherwise, if it has the same shape as the list `h :: t`, then let `h` be the first element of `lst`, and let `t` be the rest of the elements of `lst`, and return `h + sum t`. The choice of variable names here is meant to suggest “head” and “tail” and is a common idiom, but we could use other names if we wanted. Another common idiom is:

```ocaml
let rec sum xs =
  match xs with
  | [] -> 0
  | x :: xs' -> x + sum xs'
```

```text
val sum : int list -> int = <fun>
```

That is, the input list is a list of xs (pronounced EX-uhs), the head element is an x, and the tail is xs’ (pronounced EX-uhs prime).

Syntactically it isn’t necessary to use so many lines to define `sum`. We could do it all on one line:

```ocaml
let rec sum xs = match xs with | [] -> 0 | x :: xs' -> x + sum xs'
```

```text
val sum : int list -> int = <fun>
```

Or, noting that the first `|` after `with` is optional regardless of how many lines we use, we could also write:

```ocaml
let rec sum xs = match xs with [] -> 0 | x :: xs' -> x + sum xs'
```

```text
val sum : int list -> int = <fun>
```

The multi-line format is what we’ll usually use in this book, because it helps the human eye understand the syntax a bit better. OCaml code formatting tools, though, are moving toward the single-line format whenever the code is short enough to fit on just one line.

Here’s another example of using pattern matching to compute the length of a list:

```ocaml
let rec length lst =
  match lst with
  | [] -> 0
  | h :: t -> 1 + length t
```

```text
val length : 'a list -> int = <fun>
```

Note how we didn’t actually need the variable `h` in the right-hand side of the pattern match. When we want to indicate the presence of some value in a pattern without actually giving it a name, we can write `_` (the underscore character):

```ocaml
let rec length lst =
  match lst with
  | [] -> 0
  | _ :: t -> 1 + length t
```

```text
val length : 'a list -> int = <fun>
```

That function is actually built-in as part of the OCaml standard library `List` module. Its name there is `List.length`. That “dot” notation indicates the function named `length` inside the module named `List`, much like the dot notation used in many other languages.

And here’s a third example that appends one list onto the beginning of another list:

```ocaml
let rec append lst1 lst2 =
  match lst1 with
  | [] -> lst2
  | h :: t -> h :: append t lst2
```

```text
val append : 'a list -> 'a list -> 'a list = <fun>
```

For example, `append [1; 2] [3; 4]` is `[1; 2; 3; 4]`. That function is actually available as a built-in operator `&#64;`, so we could instead write `[1; 2] &#64; [3; 4]`.

As a final example, we could write a function to determine whether a list is empty:

```ocaml
let empty lst =
  match lst with
  | [] -> true
  | h :: t -> false
```

```text
val empty : 'a list -> bool = <fun>
```

But there is a much better way to write the same function without pattern matching:

```ocaml
let empty lst =
  lst = []
```

```text
val empty : 'a list -> bool = <fun>
```

Note how all the recursive functions above are similar to doing proofs by induction on the natural numbers: every natural number is either 0 or is 1 greater than some other natural number \(n\), and so a proof by induction has a base case for 0 and an inductive case for \(n + 1\). Likewise, all our functions have a base case for the empty list and a recursive case for the list that has one more element than another list. This similarity is no accident. There is a deep relationship between induction and recursion; we’ll explore that relationship in more detail later in the book.

By the way, there are two library functions `List.hd` and `List.tl` that return the head and tail of a list. It is not good, idiomatic OCaml to apply these directly to a list. The problem is that they will raise an exception when applied to the empty list, and you will have to remember to handle that exception. Instead, you should use pattern matching: you’ll then be forced to match against both the empty list and the non-empty list (at least), which will prevent exceptions from being raised, thus making your program more robust.

### 3.1.3. (Not) Mutating Lists[#](#not-mutating-lists)

Lists are immutable. There’s no way to change an element of a list from one value to another. Instead, OCaml programmers create new lists out of old lists. For example, suppose we wanted to write a function that returned the same list as its input list, but with the first element (if there is one) incremented by one. We could do that:

```ocaml
let inc_first lst =
  match lst with
  | [] -> []
  | h :: t -> h + 1 :: t
```

Now you might be concerned about whether we’re being wasteful of space. After all, there are at least two ways the compiler could implement the above code:

1. Copy the entire tail list `t` when the new list is created in the pattern match with cons, such that the amount of memory in use just increased by an amount proportionate to the length of `t`.
2. Share the tail list `t` between the old list and the new list, such that the amount of memory in use does not increase—beyond the one extra piece of memory needed to store `h + 1`.

In fact, the compiler does the latter. So there’s no need for concern. The reason that it’s quite safe for the compiler to implement sharing is exactly that list elements are immutable. If they were instead mutable, then we’d start having to worry about whether the list I have is shared with the list you have, and whether changes I make will be visible in your list. So immutability makes it easier to reason about the code, and makes it safe for the compiler to perform an optimization.

### 3.1.4. Pattern Matching with Lists[#](#pattern-matching-with-lists)

We saw above how to access lists using pattern matching. Let’s look more carefully at this feature.

**Syntax.**

```ocaml
match e with
| p1 -> e1
| p2 -> e2
| ...
| pn -> en
```

Each of the clauses `pi -> ei` is called a *branch* or a *case* of the pattern match. The first vertical bar in the entire pattern match is optional.

The `p`’s here are a new syntactic form called a *pattern*. For now, a pattern may be:

- a variable name, e.g., `x`
- the underscore character `_`, which is called the *wildcard*
- the empty list `[]`
- `p1 :: p2`
- `[p1; ...; pn]`

No variable name may appear more than once in a pattern. For example, the pattern `x :: x` is illegal. The wildcard may occur any number of times.

As we learn more of data structures available in OCaml, we’ll expand the possibilities for what a pattern may be.

**Dynamic semantics.**

Pattern matching involves two inter-related tasks: determining whether a pattern matches a value, and determining what parts of the value should be associated with which variable names in the pattern. The former task is intuitively about determining whether a pattern and a value have the same *shape*. The latter task is about determining the *variable bindings* introduced by the pattern. For example, consider the following code:

```ocaml
match 1 :: [] with
| [] -> false
| h :: t -> h >= 1 && List.length t = 0
```

```text
- : bool = true
```

When evaluating the right-hand side of the second branch, `h` is bound to `1` and `t` is bound to `[]`. Let’s write `h->1` to mean the variable binding saying that `h` has value `1`; this is not a piece of OCaml syntax, but rather a notation we use to reason about the language. So the variable bindings produced by the second branch would be `h->1, t->[]`.

Using that notation, here is a definition of when a pattern matches a value and the bindings that match produces:

- The pattern `x` matches any value `v` and produces the variable binding `x->v`.
- The pattern `_` matches any value and produces no bindings.
- The pattern `[]` matches the value `[]` and produces no bindings.
- If `p1` matches `v1` and produces a set \(b_1\) of bindings, and if `p2` matches `v2` and produces a set \(b_2\) of bindings, then `p1 :: p2` matches `v1 :: v2` and produces the set \(b_1 \cup b_2\) of bindings. Note that `v2` must be a list (since it’s on the right-hand side of `::`) and could have any length: 0 elements, 1 element, or many elements. Note that the union \(b_1 \cup b_2\) of bindings will never have a problem where the same variable is bound separately in both \(b_1\) and \(b_2\) because of the syntactic restriction that no variable name may appear more than once in a pattern.
- If for all `i` in `1..n`, it holds that `pi` matches `vi` and produces the set \(b_i\) of bindings, then `[p1; ...; pn]` matches `[v1; ...; vn]` and produces the set \(\bigcup_i b_i\) of bindings. Note that this pattern specifies the exact length the list must be.

Now we can say how to evaluate `match e with p1 -> e1 | ... | pn -> en`:

- Evaluate `e` to a value `v`.
- Attempt to match `v` against `p1`, then against `p2`, and so on, in the order they appear in the match expression.
- If `v` does not match against any of the patterns, then evaluation of the match expression raises a `Match_failure` exception. We haven’t yet discussed exceptions in OCaml, but you’re surely familiar with them from other languages. We’ll come back to exceptions near the end of this chapter, after we’ve covered some of the other built-in data structures in OCaml.
- Otherwise, let `pi` be the first pattern that matches, and let \(b\) be the variable bindings produced by matching `v` against `pi`.
- Substitute those bindings \(b\) inside `ei`, producing a new expression `e'`.
- Evaluate `e'` to a value `v'`.
- The result of the entire match expression is `v'`.

For example, here’s how this match expression would be evaluated:

```ocaml
match 1 :: [] with
| [] -> false
| h :: t -> h = 1 && t = []
```

```text
- : bool = true
```

- `1 :: []` is already a value.
- `[]` does not match `1 :: []`.
- `h :: t` does match `1 :: []` and produces variable bindings {`h->1`,`t->[]`}, because: `h` matches `1` and produces the variable binding `h->1`.
- `t` matches `[]` and produces the variable binding `t->[]`.

Substituting {`h->1`,`t->[]`} inside `h = 1 && t = []` produces a new expression `1 = 1 && [] = []`.

Evaluating `1 = 1 && [] = []` yields the value `true`. We omit the justification for that fact here, but it follows from other evaluation rules for built-in operators and function application.

So the result of the entire match expression is `true`.

**Static semantics.**

- If `e : ta` and for all `i`, it holds that `pi : ta` and `ei : tb`, then `(match e with p1 -> e1 | ... | pn -> en) : tb`.

That rule relies on being able to judge whether a pattern has a particular type. As usual, type inference comes into play here. The OCaml compiler infers the types of any pattern variables as well as all occurrences of the wildcard pattern. As for the list patterns, they have the same type-checking rules as list expressions.

**Additional Static Checking.**

In addition to that type-checking rule, there are two other checks the compiler does for each match expression.

First, **exhaustiveness:** the compiler checks to make sure that there are enough patterns to guarantee that at least one of them matches the expression `e`, no matter what the value of that expression is at run time. This ensures that the programmer did not forget any branches. For example, the function below will cause the compiler to emit a warning:

```ocaml
let head lst = match lst with h :: _ -> h
```

```text
File "[12]", line 1, characters 15-41:
```

```text
1 | let head lst = match lst with h :: _ -> h
```

```text
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^
```

```text
Warning 8 [partial-match]: this pattern-matching is not exhaustive.
```

```text
Here is an example of a case that is not matched:
```

```text
[]
```

```text
val head : 'a list -> 'a = <fun>
```

By presenting that warning to the programmer, the compiler is helping the programmer to defend against the possibility of `Match_failure` exceptions at runtime.

Note

Sorry about how the output from the cell above gets split into many lines in the HTML. That is currently an [open issue with JupyterBook](https://github.com/executablebooks/jupyter-book/issues/973), the framework used to build this book.

Second, **unused branches:** the compiler checks to see whether any of the branches could never be matched against because one of the previous branches is guaranteed to succeed. For example, the function below will cause the compiler to emit a warning:

```ocaml
let rec sum lst =
  match lst with
  | h :: t -> h + sum t
  | [ h ] -> h
  | [] -> 0
```

```text
File "[13]", line 4, characters 4-9:
```

```text
4 |   | [ h ] -> h
```

```text
        ^^^^^
```

```text
Warning 11 [redundant-case]: this match case is unused.
```

```text
val sum : int list -> int = <fun>
```

The second branch is unused because the first branch will match anything the second branch matches.

Unused match cases are usually a sign that the programmer wrote something other than what they intended. So by presenting that warning, the compiler is helping the programmer to detect latent bugs in their code.

Here’s an example of one of the most common bugs that causes an unused match case warning. Understanding it is also a good way to check your understanding of the dynamic semantics of match expressions:

```ocaml
let length_is lst n =
  match List.length lst with
  | n -> true
  | _ -> false
```

```text
File "[14]", line 4, characters 4-5:
```

```text
4 |   | _ -> false
```

```text
        ^
```

```text
Warning 11 [redundant-case]: this match case is unused.
```

```text
val length_is : 'a list -> 'b -> bool = <fun>
```

The programmer was thinking that if the length of `lst` is equal to `n`, then this function will return `true`, and otherwise will return `false`. But in fact this function *always* returns `true`. Why? Because the pattern variable `n` is distinct from the function argument `n`. Suppose that the length of `lst` is 5. Then the pattern match becomes: `match 5 with n -> true | _ -> false`. Does `n` match 5? Yes, according to the rules above: a variable pattern matches any value and here produces the binding `n->5`. Then evaluation applies that binding to `true`, substituting all occurrences of `n` inside of `true` with 5. Well, there are no such occurrences. So we’re done, and the result of evaluation is just `true`.

What the programmer really meant to write was:

```ocaml
let length_is lst n =
  match List.length lst with
  | m -> m = n
```

```text
val length_is : 'a list -> int -> bool = <fun>
```

or better yet:

```ocaml
let length_is lst n =
  List.length lst = n
```

```text
val length_is : 'a list -> int -> bool = <fun>
```

### 3.1.5. Deep Pattern Matching[#](#deep-pattern-matching)

Patterns can be nested. Doing so can allow your code to look deeply into the structure of a list. For example:

- `_ :: []` matches all lists with exactly one element
- `_ :: _` matches all lists with at least one element
- `_ :: _ :: []` matches all lists with exactly two elements
- `_ :: _ :: _ :: _` matches all lists with at least three elements

### 3.1.6. Immediate Matches[#](#immediate-matches)

When you have a function that immediately pattern-matches against its final argument, there’s a nice piece of syntactic sugar you can use to avoid writing extra code. Here’s an example: instead of

```ocaml
let rec sum lst =
  match lst with
  | [] -> 0
  | h :: t -> h + sum t
```

```text
val sum : int list -> int = <fun>
```

you can write

```ocaml
let rec sum = function
  | [] -> 0
  | h :: t -> h + sum t
```

```text
val sum : int list -> int = <fun>
```

The word `function` is a keyword. Notice that we’re able to leave out the line containing `match` as well as the name of the argument, which was never used anywhere else but that line. In such cases, though, it’s especially important in the specification comment for the function to document what that argument is supposed to be, since the code no longer gives it a descriptive name.

### 3.1.7. OCamldoc and List Syntax[#](#ocamldoc-and-list-syntax)

OCamldoc is a documentation generator similar to Javadoc. It extracts comments from source code and produces HTML (as well as other output formats). The [standard library web documentation](https://ocaml.org/api/List.html) for the List module is generated by OCamldoc from the [standard library source code](https://github.com/ocaml/ocaml/blob/trunk/stdlib/list.mli) for that module, for example.

Warning

There is a syntactic convention with square brackets in OCamldoc that can be confusing with respect to lists.

In an OCamldoc comment, source code is surrounded by square brackets. That code will be rendered in typewriter face and syntax-highlighted in the output HTML. The square brackets in this case do not indicate a list.

For example, here is the comment for `List.hd` in the standard library source code:

```ocaml
(** Return the first element of the given list. Raise
   [Failure "hd"] if the list is empty. *)
```

The `[Failure "hd"]` does not mean a list containing the exception `Failure "hd"`. Rather it means to typeset the expression `Failure "hd"` as source code, as you can see [here](https://ocaml.org/api/List.html).

This can get especially confusing when you want to talk about lists as part of the documentation. For example, here is a way we could rewrite that comment:

```ocaml
(** [hd lst] returns the first element of [lst].
    Raises [Failure "hd"] if [lst = []]. *)
```

In `[lst = []]`, the outer square brackets indicate source code as part of a comment, whereas the inner square brackets indicate the empty list.

### 3.1.8. List Comprehensions[#](#list-comprehensions)

Some languages, including Python and Haskell, have a syntax called *comprehension* that allows lists to be written somewhat like set comprehensions from mathematics. The earliest example of comprehensions seems to be the functional language NPL, which was designed in 1977.

OCaml doesn’t have built-in syntactic support for comprehensions. Though some extensions were developed, none seem to be supported any longer. The primary tasks accomplished by comprehensions (filtering out some elements, and transforming others) are actually well-supported already by *higher-order programming*, which we’ll study in a later chapter, and the pipeline operator, which we’ve already learned. So an additional syntax for comprehensions was never really needed.

### 3.1.9. Tail Recursion[#](#tail-recursion)

Recall that a function is *tail recursive* if it calls itself recursively but does not perform any computation after the recursive call returns, and immediately returns to its caller the value of its recursive call. Consider these two implementations, `sum` and `sum_tr` of summing a list:

```ocaml
let rec sum (l : int list) : int =
  match l with
  | [] -> 0
  | x :: xs -> x + (sum xs)
let rec sum_plus_acc (acc : int) (l : int list) : int =
  match l with
  | [] -> acc
  | x :: xs -> sum_plus_acc (acc + x) xs
let sum_tr : int list -> int =
  sum_plus_acc 0
```

```text
val sum : int list -> int = <fun>
```

```text
val sum_plus_acc : int -> int list -> int = <fun>
```

```text
val sum_tr : int list -> int = <fun>
```

Observe the following difference between the `sum` and `sum_tr` functions above: In the `sum` function, which is not tail recursive, after the recursive call returned its value, we add `x` to it. In the tail recursive `sum_tr`, or rather in `sum_plus_acc`, after the recursive call returns, we immediately return the value without further computation.

If you’re going to write functions on really long lists, tail recursion becomes important for performance. So when you have a choice between using a tail-recursive vs. non-tail-recursive function, you are likely better off using the tail-recursive function on really long lists to achieve space efficiency. For that reason, the List module documents which functions are tail recursive and which are not.

But that doesn’t mean that a tail-recursive implementation is strictly better. For example, the tail-recursive function might be harder to read. (Consider `sum_plus_acc`.) Also, there are cases where implementing a tail-recursive function entails having to do a pre- or post-processing pass to reverse the list. On small- to medium-sized lists, the overhead of reversing the list (both in time and in allocating memory for the reversed list) can make the tail-recursive version less time efficient. What constitutes “small” vs. “big” here? That’s hard to say, but maybe 10,000 is a good estimate, according to the [standard library documentation of the `List` module](https://ocaml.org/api/List.html).

Here is a useful tail-recursive function to produce a long list:

```ocaml
(** [from i j l] is the list containing the integers from [i] to [j],
    inclusive, followed by the list [l].
    Example:  [from 1 3 [0] = [1; 2; 3; 0]] *)
let rec from i j l = if i > j then l else from i (j - 1) (j :: l)
(** [i -- j] is the list containing the integers from [i] to [j], inclusive. *)
let ( -- ) i j = from i j []
let long_list = 0 -- 1_000_000
```

```text
val from : int -> int -> int list -> int list = <fun>
```

```text
val ( -- ) : int -> int -> int list = <fun>
```

```text
val long_list : int list =
  [0; 1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13; 14; 15; 16; 17; 18; 19; 20;
   21; 22; 23; 24; 25; 26; 27; 28; 29; 30; 31; 32; 33; 34; 35; 36; 37; 38;
   39; 40; 41; 42; 43; 44; 45; 46; 47; 48; 49; 50; 51; 52; 53; 54; 55; 56;
   57; 58; 59; 60; 61; 62; 63; 64; 65; 66; 67; 68; 69; 70; 71; 72; 73; 74;
   75; 76; 77; 78; 79; 80; 81; 82; 83; 84; 85; 86; 87; 88; 89; 90; 91; 92;
   93; 94; 95; 96; 97; 98; 99; 100; 101; 102; 103; 104; 105; 106; 107; 108;
   109; 110; 111; 112; 113; 114; 115; 116; 117; 118; 119; 120; 121; 122; 123;
   124; 125; 126; 127; 128; 129; 130; 131; 132; 133; 134; 135; 136; 137; 138;
   139; 140; 141; 142; 143; 144; 145; 146; 147; 148; 149; 150; 151; 152; 153;
   154; 155; 156; 157; 158; 159; 160; 161; 162; 163; 164; 165; 166; 167; 168;
   169; 170; 171; 172; 173; 174; 175; 176; 177; 178; 179; 180; 181; 182; 183;
   184; 185; 186; 187; 188; 189; 190; 191; 192; 193; 194; 195; 196; 197; 198;
   199; 200; 201; 202; 203; 204; 205; 206; 207; 208; 209; 210; 211; 212; 213;
   214; 215; 216; 217; 218; 219; 220; 221; 222; 223; 224; 225; 226; 227; 228;
   229; 230; 231; 232; 233; 234; 235; 236; 237; 238; 239; 240; 241; 242; 243;
   244; 245; 246; 247; 248; 249; 250; 251; 252; 253; 254; 255; 256; 257; 258;
   259; 260; 261; 262; 263; 264; 265; 266; 267; 268; 269; 270; 271; 272; 273;
   274; 275; 276; 277; 278; 279; 280; 281; 282; 283; 284; 285; 286; 287; 288;
   289; 290; 291; 292; 293; 294; 295; 296; 297; 298; ...]
```

It would be worthwhile to study the definition of `--` to convince yourself that you understand (i) how it works and (ii) why it is tail recursive.

You might in the future decide you want to create such a list again. Rather than having to remember where this definition is, and having to copy it into your code, here’s an easy way to create the same list using a built-in library function:

```ocaml
List.init 1_000_000 Fun.id
```

```text
- : int list =
[0; 1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13; 14; 15; 16; 17; 18; 19; 20;
 21; 22; 23; 24; 25; 26; 27; 28; 29; 30; 31; 32; 33; 34; 35; 36; 37; 38; 39;
 40; 41; 42; 43; 44; 45; 46; 47; 48; 49; 50; 51; 52; 53; 54; 55; 56; 57; 58;
 59; 60; 61; 62; 63; 64; 65; 66; 67; 68; 69; 70; 71; 72; 73; 74; 75; 76; 77;
 78; 79; 80; 81; 82; 83; 84; 85; 86; 87; 88; 89; 90; 91; 92; 93; 94; 95; 96;
 97; 98; 99; 100; 101; 102; 103; 104; 105; 106; 107; 108; 109; 110; 111; 112;
 113; 114; 115; 116; 117; 118; 119; 120; 121; 122; 123; 124; 125; 126; 127;
 128; 129; 130; 131; 132; 133; 134; 135; 136; 137; 138; 139; 140; 141; 142;
 143; 144; 145; 146; 147; 148; 149; 150; 151; 152; 153; 154; 155; 156; 157;
 158; 159; 160; 161; 162; 163; 164; 165; 166; 167; 168; 169; 170; 171; 172;
 173; 174; 175; 176; 177; 178; 179; 180; 181; 182; 183; 184; 185; 186; 187;
 188; 189; 190; 191; 192; 193; 194; 195; 196; 197; 198; 199; 200; 201; 202;
 203; 204; 205; 206; 207; 208; 209; 210; 211; 212; 213; 214; 215; 216; 217;
 218; 219; 220; 221; 222; 223; 224; 225; 226; 227; 228; 229; 230; 231; 232;
 233; 234; 235; 236; 237; 238; 239; 240; 241; 242; 243; 244; 245; 246; 247;
 248; 249; 250; 251; 252; 253; 254; 255; 256; 257; 258; 259; 260; 261; 262;
 263; 264; 265; 266; 267; 268; 269; 270; 271; 272; 273; 274; 275; 276; 277;
 278; 279; 280; 281; 282; 283; 284; 285; 286; 287; 288; 289; 290; 291; 292;
 293; 294; 295; 296; 297; 298; ...]
```

Expression `List.init len f` creates the list `[f 0; f 1; ...; f (len - 1)]`, and it does so tail recursively if `len` is bigger than 10,000. Function `Fun.id` is simply the identify function `fun x -> x`.