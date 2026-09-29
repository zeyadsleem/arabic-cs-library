## 3.10. Exceptions[#](#exceptions)

OCaml has an exception mechanism similar to many other programming languages. A new type of OCaml exception is defined with this syntax:

```ocaml
exception E of t
```

where `E` is a constructor name and `t` is a type. The `of t` is optional. Notice how this is similar to defining a constructor of a variant type. For example:

```ocaml
exception A
exception B
exception Code of int
exception Details of string
```

```text
exception A
```

```text
exception B
```

```text
exception Code of int
```

```text
exception Details of string
```

To create an exception value, use the same syntax you would for creating a variant value. Here, for example, is an exception value whose constructor is `Failure`, which carries a `string`:

```ocaml
Failure "something went wrong"
```

```text
- : exn = Failure "something went wrong"
```

This constructor is [pre-defined in the standard library](https://ocaml.org/manual/core.html#ss:predef-exn) and is one of the more common exceptions that OCaml programmers use.

To raise an exception value `e`, simply write

```ocaml
raise e
```

There is a convenient function `failwith : string -> 'a` in the standard library that raises `Failure`. That is, `failwith s` is equivalent to `raise (Failure s)`.

To catch an exception, use this syntax:

```ocaml
try e with
| p1 -> e1
| ...
| pn -> en
```

The expression `e` is what might raise an exception. If it does not, the entire `try` expression evaluates to whatever `e` does. If `e` does raise an exception value `v`, that value `v` is matched against the provided patterns, exactly like `match` expression.

### 3.10.1. Exceptions are Extensible Variants[#](#exceptions-are-extensible-variants)

All exception values have type `exn`, which is a variant defined in the [core](https://ocaml.org/manual/core.html). It’s an unusual kind of variant, though, called an *extensible* variant, which allows new constructors of the variant to be defined after the variant type itself is defined. See the OCaml manual for more information about [extensible variants](https://ocaml.org/manual/extn.html) if you’re interested.

### 3.10.2. Exception Semantics[#](#exception-semantics)

Since they are just variants, the syntax and semantics of exceptions is already covered by the syntax and semantics of variants—with one exception (pun intended), which is the dynamic semantics of how exceptions are raised and handled.

**Dynamic semantics.** As we originally said, every OCaml expression either

- evaluates to a value
- raises an exception
- or fails to terminate (i.e., an “infinite loop”).

So far we’ve only presented the part of the dynamic semantics that handles the first of those three cases. What happens when we add exceptions? Now, evaluation of an expression either produces a value or produces an *exception packet*. Packets are not normal OCaml values; the only pieces of the language that recognizes them are `raise` and `try`. The exception value produced by (e.g.) `Failure "oops"` is part of the exception packet produced by `raise (Failure "oops")`, but the packet contains more than just the exception value; there can also be a stack trace, for example.

For any expression `e` other than `try`, if evaluation of a subexpression of `e` produces an exception packet `P`, then evaluation of `e` produces packet `P`.

But now we run into a problem for the first time: what order are subexpressions evaluated in? Sometimes the answer to that question is provided by the semantics we have already developed. For example, with let expressions, we know that the binding expression must be evaluated before the body expression. So the following code raises `A`:

```ocaml
let _ = raise A in raise B;;
```

```text
Exception: A.
Raised at <unknown> in file "[3]", line 1, characters 8-15
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

And with functions, OCaml does not officially specify the evaluation order of a function and its argument, but the current implementation evaluates the argument before the function. So the following code also raises `A`, in addition to producing some compiler warnings that the first expression will never actually be applied as a function to an argument:

```ocaml
(raise B) (raise A)
```

```text
File "[4]", line 1, characters 10-19:
```

```text
1 | (raise B) (raise A)
```

```text
              ^^^^^^^^^
```

```text
Warning 20 [ignored-extra-argument]: this argument will not be used by the function.
```

```text

```

```text
File "[4]", line 1, characters 10-19:
```

```text
1 | (raise B) (raise A)
```

```text
              ^^^^^^^^^
```

```text
Warning 20 [ignored-extra-argument]: this argument will not be used by the function.
```

```text
Exception: A.

Raised at <unknown> in file "[4]", line 1, characters 10-19
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

It makes sense that both those pieces of code would raise the same exception, given that we know `let x = e1 in e2` is syntactic sugar for `(fun x -> e2) e1`.

But what does the following code raise as an exception?

```ocaml
(raise A, raise B)
```

```text
Exception: B.

Raised at <unknown> in file "[5]", line 1, characters 10-17
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

The answer is nuanced. The language specification does not stipulate what order the components of pairs should be evaluated in. Nor did our semantics exactly determine the order. (Though you would be forgiven if you thought it was left to right.) So programmers actually cannot rely on that order. The current implementation of OCaml, as it turns out, evaluates right to left. So the code above actually raises `B`. If you really want to force the evaluation order, you need to use let expressions:

```ocaml
let a = raise A in
let b = raise B in
(a, b)
```

```text
Exception: A.

Raised at <unknown> in file "[6]", line 1, characters 8-15
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

That code is guaranteed to raise `A` rather than `B`.

One interesting corner case is what happens when a raise expression itself has a subexpression that raises:

```ocaml
exception C of string;;
exception D of string;;
raise (C (raise (D "oops")))
```

```text
exception C of string
```

```text
exception D of string
```

```text
Exception: D "oops".

Raised at <unknown> in file "[7]", line 3, characters 9-27
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

That code ends up raising `D`, because the first thing that has to happen is to evaluate `C (raise (D "oops"))` to a value. Doing that requires evaluating `raise (D "oops")` to a value. Doing that causes a packet containing `D "oops"` to be produced, and that packet then propagates and becomes the result of evaluating `C (raise (D "oops"))`, hence the result of evaluating `raise (C (raise (D "oops")))`.

Once evaluation of an expression produces an exception packet `P`, that packet propagates until it reaches a `try` expression:

```ocaml
try e with
| p1 -> e1
| ...
| pn -> en
```

The exception value inside `P` is matched against the provided patterns using the usual evaluation rules for pattern matching—with one exception (again, pun intended). If none of the patterns matches, then instead of producing `Match_failure` inside a new exception packet, the original exception packet `P` continues propagating until the next `try` expression is reached.

### 3.10.3. Pattern Matching[#](#pattern-matching)

There is a pattern form for exceptions. Here’s an example of its usage:

```ocaml
match List.hd [] with
  | [] -> "empty"
  | _ :: _ -> "non-empty"
  | exception (Failure s) -> s
```

```text
- : string = "hd"
```

Note that the code above is just a standard `match` expression, not a `try` expression. It matches the value of `List.hd []` against the three provided patterns. As we know, `List.hd []` will raise an exception containing the value `Failure "hd"`. The *exception pattern* `exception (Failure s)` matches that value. So the above code will evaluate to `"hd"`.

Exception patterns are a kind of syntactic sugar. Consider this code for example:

```ocaml
match e with
  | p1 -> e1
  | exception p2 -> e2
  | p3 -> e3
  | exception p4 -> e4
```

We can rewrite the code to eliminate the exception pattern:

```ocaml
try
  match e with
    | p1 -> e1
    | p3 -> e3
with
  | p2 -> e2
  | p4 -> e4
```

In general if there are both exception and non-exception patterns, evaluation proceeds as follows: try evaluating `e`. If it produces an exception packet, use the exception patterns from the original match expression to handle that packet. If it doesn’t produce an exception packet but instead produces a non-exception value, use the non-exception patterns from the original match expression to match that value.

### 3.10.4. Exceptions and OUnit[#](#exceptions-and-ounit)

If it is part of a function’s specification that it raises an exception, you might want to write OUnit tests that check whether the function correctly does so. Here’s how to do that:

```ocaml
open OUnit2
let tests = "suite" >::: [
    "empty" >:: (fun _ -> assert_raises (Failure "hd") (fun () -> List.hd []));
  ]
let _ = run_test_tt_main tests
```

The expression `assert_raises exn (fun () -> e)` checks to see whether expression `e` raises exception `exn`. If so, the OUnit test case succeeds, otherwise it fails.

Note that the second argument of `assert_raises` is a *function* of type `unit -> 'a`, sometimes called a “thunk”. It may seem strange to write a function with this type—the only possible input is `()`—but this is a common pattern in functional languages to suspend or delay the evaluation of a program. In this case, we want `assert_raises` to evaluate `List.hd []` when it is ready. If we evaluated `List.hd []` immediately, `assert_raises` would not be able to check if the right exception is raised. We’ll learn more about thunks in a later chapter.

Warning

A common error is to forget the `(fun () -> ...)` around `e`. If you make this mistake, the program may still typecheck but the OUnit test case will fail: without the extra anonymous function, the exception is raised before `assert_raises` ever gets a chance to handle it.