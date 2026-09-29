## 9.4. Sequences[#](#sequences)

A *sequence* is an infinite list. For example, the infinite list of all natural numbers would be a sequence. So would the list of all primes, or all Fibonacci numbers. How can we efficiently represent infinite lists? Obviously we can’t store the whole list in memory.

We already know that OCaml allows us to create recursive functions—that is, functions defined in terms of themselves. It turns out we can define other values in terms of themselves, too.

```ocaml
let rec ones = 1 :: ones
```

```text
val ones : int list = [1; <cycle>]
```

```ocaml
let rec a = 0 :: b and b = 1 :: a
```

```text
val a : int list = [0; 1; <cycle>]
val b : int list = [1; 0; <cycle>]
```

The expressions above create *recursive values*. The list `ones` contains an infinite sequence of `1`, and the lists `a` and `b` alternate infinitely between `0` and `1`. As the lists are infinite, the toplevel cannot print them in their entirety. Instead, it indicates a *cycle*: the list cycles back to its beginning. Even though these lists represent an infinite sequence of values, their representation in memory is finite: they are linked lists with back pointers that create those cycles.

Beyond sequences of numbers, there are other kinds of infinite mathematical objects we might want to represent with finite data structures:

- A stream of inputs read from a file, a network socket, or a user. All of these are unbounded in length, hence we can think of them as being infinite in length. In fact, many I/O libraries treat reaching the end of an I/O stream as an unexpected situation and raise an exception.
- A *game tree* is a tree in which the positions of a game (e.g., chess or tic-tac-toe)_ are the nodes and the edges are possible moves. For some games this tree is in fact infinite (imagine, e.g., that the pieces on the board could chase each other around forever), and for other games, it’s so deep that we would never want to manifest the entire tree, hence it is effectively infinite.

### 9.4.1. How Not to Define a Sequence[#](#how-not-to-define-a-sequence)

Suppose we wanted to represent the first of those examples: the sequence of all natural numbers. Some of the obvious things we might try simply don’t work:

```ocaml
(** [from n] is the infinite list [[n; n + 1; n + 2; ...]]. *)
let rec from n = n :: from (n + 1)
```

```text
val from : int -> int list = <fun>
```

```ocaml
(** [nats] is the infinite list of natural numbers [[0; 1; ...]]. *)
let nats = from 0
```

```text
Stack overflow during evaluation (looping recursion?).
```

The problem with that attempt is that `nats` attempts to compute the entire infinite sequence of natural numbers. Because the function isn’t tail recursive, it quickly overflows the stack. If it were tail recursive, it would go into an infinite loop.

Here’s another attempt, using what we discovered above about recursive values:

```ocaml
let rec nats = 0 :: List.map (fun x -> x + 1) nats
```

```text
File "[4]", line 1, characters 15-50:
1 | let rec nats = 0 :: List.map (fun x -> x + 1) nats
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Error: This kind of expression is not allowed as right-hand side of let rec
```

That attempt doesn’t work for a more subtle reason. In the definition of a recursive value, we are not permitted to use a value before it is finished being defined. The problem is that `List.map` is applied to `nats`, and therefore pattern matches to extract the head and tail of `nats`. But we are in the middle of defining `nats`, so that use of `nats` is not permitted.

### 9.4.2. How to Correctly Define a Sequence[#](#how-to-correctly-define-a-sequence)

We can try to define a sequence by analogy to how we can define (finite) lists. Recall that definition:

```ocaml
type 'a mylist = Nil | Cons of 'a * 'a mylist
```

```text
type 'a mylist = Nil | Cons of 'a * 'a mylist
```

We could try to convert that into a definition for sequences:

```ocaml
type 'a sequence = Cons of 'a * 'a sequence
```

```text
type 'a sequence = Cons of 'a * 'a sequence
```

Note that we got rid of the `Nil` constructor, because the empty list is finite, but we want only infinite lists.

The problem with that definition is that it’s really no better than the built-in list in OCaml, in that we still can’t define `nats`:

```ocaml
let rec from n = Cons (n, from (n + 1))
```

```text
val from : int -> int sequence = <fun>
```

```ocaml
let nats = from 0
```

```text
Stack overflow during evaluation (looping recursion?).
```

As before, that definition attempts to go off and compute the entire infinite sequence of naturals.

What we need is a way to *pause* evaluation, so that at any point in time, only a finite approximation to the infinite sequence has been computed. Fortunately, we already know how to do that!

Consider the following definitions:

```ocaml
let f1 = failwith "oops"
```

```text
Exception: Failure "oops".

Raised at Stdlib.failwith in file "stdlib.ml", line 29, characters 17-33
Called from f1 in file "[8]", line 1, characters 9-24
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

```ocaml
let f2 = fun x -> failwith "oops"
```

```text
val f2 : 'a -> 'b = <fun>
```

```ocaml
f2 ();;
```

```text
Exception: Failure "oops".

Raised at Stdlib.failwith in file "stdlib.ml", line 29, characters 17-33
Called from <unknown> in file "[10]", line 1, characters 0-5
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

The definition of `f1` immediately raises an exception, whereas the definition of `f2` does not. Why? Because `f2` wraps the `failwith` inside an anonymous function. Recall that, according to the dynamic semantics of OCaml, **functions are already values**. So no computation is done inside the body of the function until it is applied. That’s why `f2 ()` raises an exception.

We can use this property of evaluation—that functions delay evaluation—to our advantage in defining sequences: let’s wrap the tail of a sequence inside a function. Since it doesn’t really matter what argument that function takes, we might as well let it be unit. A function that is used just to delay computation, and in particular one that takes unit as input, is called a *thunk*.

```ocaml
(** An ['a sequence] is an infinite list of values of type ['a].
    AF: [Cons (x, f)] is the sequence whose head is [x] and tail is [f ()].
    RI: none. *)
type 'a sequence = Cons of 'a * (unit -> 'a sequence)
```

```text
type 'a sequence = Cons of 'a * (unit -> 'a sequence)
```

This definition turns out to work quite well. We can define `nats`, at last:

```ocaml
let rec from n = Cons (n, fun () -> from (n + 1))
let nats = from 0
```

```text
val from : int -> int sequence = <fun>
```

```text
val nats : int sequence = Cons (0, <fun>)
```

We do not get an infinite loop or a stack overflow. The evaluation of `nats` has paused. Only the first element of it, `0`, has been computed. The remaining elements will not be computed until they are requested. To do that, we can define functions to access parts of a sequence, similarly to how we can access parts of a list:

```ocaml
(** [hd s] is the head of [s]. *)
let hd (Cons (h, _)) = h
```

```text
val hd : 'a sequence -> 'a = <fun>
```

```ocaml
(** [tl s] is the tail of [s]. *)
let tl (Cons (_, t)) = t ()
```

```text
val tl : 'a sequence -> 'a sequence = <fun>
```

Note how, in the definition of `tl`, we must apply the function `t` to `()` to obtain the tail of the sequence. That is, we must *force* the thunk to evaluate at that point, rather than continue to delay its computation.

For convenience, we can write functions that apply `hd` or `tl` multiple times to take or drop some finite prefix of a sequence:

```ocaml
(** [take n s] is the list of the first [n] elements of [s]. *)
let rec take n s =
  if n = 0 then [] else hd s :: take (n - 1) (tl s)
(** [drop n s] is all but the first [n] elements of [s]. *)
let rec drop n s =
  if n = 0 then s else drop (n - 1) (tl s)
```

```text
val take : int -> 'a sequence -> 'a list = <fun>
```

```text
val drop : int -> 'a sequence -> 'a sequence = <fun>
```

For example:

```ocaml
take 10 nats
```

```text
- : int list = [0; 1; 2; 3; 4; 5; 6; 7; 8; 9]
```

### 9.4.3. Programming with Sequences[#](#programming-with-sequences)

Let’s write some functions that manipulate sequences. It will help to have a notation for sequences to use as part of documentation. Let’s use `` to denote the sequence that has elements `a`, `b`, and `c` at its head, followed by infinitely many other elements.

Here are functions to square a sequence, and to sum two sequences:

```ocaml
(** [square <a; b; c; ...>] is [<a * a; b * b; c * c; ...]. *)
let rec square (Cons (h, t)) =
  Cons (h * h, fun () -> square (t ()))
(** [sum <a1; a2; a3; ...> <b1; b2; b3; ...>] is
    [<a1 + b1; a2 + b2; a3 + b3; ...>]. *)
let rec sum (Cons (h1, t1)) (Cons (h2, t2)) =
  Cons (h1 + h2, fun () -> sum (t1 ()) (t2 ()))
```

```text
val square : int sequence -> int sequence = <fun>
```

```text
val sum : int sequence -> int sequence -> int sequence = <fun>
```

Note how the basic template for defining both functions is the same:

- Pattern match against the input sequence(s), which must be `Cons` of a head and a tail function (a thunk).
- Construct a sequence as the output, which must be `Cons` of a new head and a new tail function (a thunk).
- In constructing the new tail function, delay the evaluation of the tail by immediately starting with `fun () -> ...`.
- Inside the body of that thunk, recursively apply the function being defined (square or sum) to the result of forcing a thunk (or thunks) to evaluate.

Of course, squaring and summing are just two possible ways of mapping a function across a sequence or sequences. That suggests we could write a higher-order map function, much like for lists:

```ocaml
(** [map f <a; b; c; ...>] is [<f a; f b; f c; ...>]. *)
let rec map f (Cons (h, t)) =
  Cons (f h, fun () -> map f (t ()))
(** [map2 f <a1; b1; c1;...> <a2; b2; c2; ...>] is
    [<f a1 b1; f a2 b2; f a3 b3; ...>]. *)
let rec map2 f (Cons (h1, t1)) (Cons (h2, t2)) =
  Cons (f h1 h2, fun () -> map2 f (t1 ()) (t2 ()))
let square' = map (fun n -> n * n)
let sum' = map2 ( + )
```

```text
val map : ('a -> 'b) -> 'a sequence -> 'b sequence = <fun>
```

```text
val map2 : ('a -> 'b -> 'c) -> 'a sequence -> 'b sequence -> 'c sequence =
  <fun>
```

```text
val square' : int sequence -> int sequence = <fun>
```

```text
val sum' : int sequence -> int sequence -> int sequence = <fun>
```

Now that we have a map function for sequences, we can successfully define `nats` in one of the clever ways we originally attempted:

```ocaml
let rec nats = Cons (0, fun () -> map (fun x -> x + 1) nats)
```

```text
val nats : int sequence = Cons (0, <fun>)
```

```ocaml
take 10 nats
```

```text
- : int list = [0; 1; 2; 3; 4; 5; 6; 7; 8; 9]
```

Why does this work? Intuitively, `nats` is ``, so mapping the increment function over `nats` is ``. If we cons `0` onto the beginning of ``, we get ``, as desired. The recursive value definition is permitted, because we never attempt to use `nats` until after its definition is finished. In particular, the thunk delays `nats` from being evaluated on the right-hand side of the definition.

Here’s another clever definition. Consider the Fibonacci sequence ``. If we take the tail of it, we get ``. If we sum those two sequences, we get ``. That’s nothing other than the tail of the tail of the Fibonacci sequence. So if we were to prepend `[1; 1]` to it, we’d have the actual Fibonacci sequence. That’s the intuition behind this definition:

```ocaml
let rec fibs =
  Cons (1, fun () ->
    Cons (1, fun () ->
      sum fibs (tl fibs)))
```

```text
val fibs : int sequence = Cons (1, <fun>)
```

And it works!

```ocaml
take 10 fibs
```

```text
- : int list = [1; 1; 2; 3; 5; 8; 13; 21; 34; 55]
```

Unfortunately, it’s highly inefficient. Every time we force the computation of the next element, it required recomputing all the previous elements, twice: once for `fibs` and once for `tl fibs` in the last line of the definition. Try running the code yourself. By the time we get up to the 30th number, the computation is noticeably slow; by the time of the 100th, it seems to last forever.

Could we do better? Yes, with a little help from a new language feature: laziness. We discuss it, next.

### 9.4.4. Laziness[#](#laziness)

The example with the Fibonacci sequence demonstrates that it would be useful if the computation of a thunk happened only once: when it is forced, the resulting value could be remembered, and if the thunk is ever forced again, that value could immediately be returned instead of recomputing it. That’s the idea behind the OCaml `Lazy` module:

```ocaml
module Lazy :
  sig
    type 'a t = 'a lazy_t
    val force : 'a t -> 'a
    ...
  end
```

A value of type `'a Lazy.t` is a value of type `'a` whose computation has been delayed. Intuitively, the language is being *lazy* about evaluating it: it won’t be computed until specifically demanded. The way that demand is expressed with by *forcing* the evaluation with `Lazy.force`, which takes the `'a Lazy.t` and causes the `'a` inside it to finally be produced. The first time a lazy value is forced, the computation might take a long time. But the result is *cached* aka *memoized*, and any subsequent time that lazy value is forced, the memoized result will be returned immediately without recomputing it.

Note

“Memoized” really is the correct spelling of this term. We didn’t misspell “memorized”, though it might look that way.

The `Lazy` module doesn’t contain a function that produces a `'a Lazy.t`. Instead, there is a keyword built-in to the OCaml syntax that does it: `lazy e`.

- **Syntax:** `lazy e`
- **Static semantics:** If `e : u`, then `lazy e : u Lazy.t`.
- **Dynamic semantics:** `lazy e` does not evaluate `e` to a value. Instead, it produces a *suspension* that, when later forced, will evaluate `e` to a value `v` and return `v`. Moreover, that suspension remembers that `v` is its forced value. And if the suspension is ever forced again, it immediately returns `v` instead of recomputing it.

Note

OCaml’s usual evaluation strategy is *eager* aka *strict*: it always evaluate an argument before function application. If you want a value to be computed lazily, you must specifically request that with the `lazy` keyword. Other function languages, notably Haskell, are lazy by default. Laziness can be pleasant when programming with infinite data structures. But lazy evaluation makes it harder to reason about space and time, and it has unpleasant interactions with side effects.

To illustrate the use of lazy values, let’s try computing the 30th Fibonacci number using this definition of `fibs`:

```ocaml
let rec fibs =
  Cons (1, fun () ->
    Cons (1, fun () ->
      sum fibs (tl fibs)))
```

```text
val fibs : int sequence = Cons (1, <fun>)
```

Tip

These next few examples will make much more sense if you run them interactively, rather than just reading this page.

If we try to get the 30th Fibonacci number, it will take a long time to compute:

```ocaml
let fib30long = take 30 fibs |> List.rev |> List.hd
```

```text
val fib30long : int = 832040
```

But if we wrap evaluation of that with `lazy`, it will return immediately, because the evaluation of that number has been suspended:

```ocaml
let fib30lazy = lazy (take 30 fibs |> List.rev |> List.hd)
```

```text
val fib30lazy : int lazy_t = <lazy>
```

Later on we could force the evaluation of that lazy value, and that will take a long time to compute, as did `fib30long`:

```ocaml
let fib30 = Lazy.force fib30lazy
```

```text
val fib30 : int = 832040
```

But if we ever try to recompute that same lazy value, it will return immediately, because the result has been memoized:

```ocaml
let fib30fast = Lazy.force fib30lazy
```

```text
val fib30fast : int = 832040
```

Nonetheless, we still haven’t totally succeeded. That particular computation of the 30th Fibonacci number has been memoized, but if we later define some other computation of another it won’t be sped up the first time it’s computed:

```ocaml
let fib29 = take 29 fibs |> List.rev |> List.hd
```

```text
val fib29 : int = 514229
```

What we really want is to change the representation of sequences itself to make use of lazy values.

#### 9.4.4.1. Lazy Sequences[#](#lazy-sequences)

Here’s a representation for infinite lists using lazy values:

```ocaml
type 'a lazysequence = Cons of 'a * 'a lazysequence Lazy.t
```

```text
type 'a lazysequence = Cons of 'a * 'a lazysequence Lazy.t
```

We’ve gotten rid of the thunk, and instead are using a lazy value as the tail of the lazy sequence. If we ever want that tail to be computed, we force it.

For sake of comparison, the following two modules implement the Fibonacci sequence with sequences, then with lazy sequences. Try computing the 30th Fibonacci number with both modules, and you’ll see that the lazy-sequence implementation is much faster than the standard-sequence implementation.

```ocaml
module SequenceFibs = struct
  type 'a sequence = Cons of 'a * (unit -> 'a sequence)
  let hd : 'a sequence -> 'a =
    fun (Cons (h, _)) -> h
  let tl : 'a sequence -> 'a sequence =
    fun (Cons (_, t)) -> t ()
  let rec take_aux n (Cons (h, t)) lst =
    if n = 0 then lst
    else take_aux (n - 1) (t ()) (h :: lst)
  let take : int -> 'a sequence -> 'a list =
    fun n s -> List.rev (take_aux n s [])
  let nth : int -> 'a sequence -> 'a =
    fun n s -> List.hd (take_aux (n + 1) s [])
  let rec sum : int sequence -> int sequence -> int sequence =
    fun (Cons (h_a, t_a)) (Cons (h_b, t_b)) ->
      Cons (h_a + h_b, fun () -> sum (t_a ()) (t_b ()))
  let rec fibs =
    Cons(1, fun () ->
      Cons(1, fun () ->
        sum (tl fibs) fibs))
  let nth_fib n =
    nth n fibs
end
module LazyFibs = struct
  type 'a lazysequence = Cons of 'a * 'a lazysequence Lazy.t
  let hd : 'a lazysequence -> 'a =
    fun (Cons (h, _)) -> h
  let tl : 'a lazysequence -> 'a lazysequence =
    fun (Cons (_, t)) -> Lazy.force t
  let rec take_aux n (Cons (h, t)) lst =
    if n = 0 then lst else
      take_aux (n - 1) (Lazy.force t) (h :: lst)
  let take : int -> 'a lazysequence -> 'a list =
    fun n s -> List.rev (take_aux n s [])
  let nth : int -> 'a lazysequence -> 'a =
    fun n s -> List.hd (take_aux (n + 1) s [])
  let rec sum : int lazysequence -> int lazysequence -> int lazysequence =
    fun (Cons (h_a, t_a)) (Cons (h_b, t_b)) ->
      Cons (h_a + h_b, lazy (sum (Lazy.force t_a) (Lazy.force t_b)))
  let rec fibs =
    Cons(1, lazy (
      Cons(1, lazy (
        sum (tl fibs) fibs))))
  let nth_fib n =
    nth n fibs
end
```

```text
module SequenceFibs :
  sig
    type 'a sequence = Cons of 'a * (unit -> 'a sequence)
    val hd : 'a sequence -> 'a
    val tl : 'a sequence -> 'a sequence
    val take_aux : int -> 'a sequence -> 'a list -> 'a list
    val take : int -> 'a sequence -> 'a list
    val nth : int -> 'a sequence -> 'a
    val sum : int sequence -> int sequence -> int sequence
    val fibs : int sequence
    val nth_fib : int -> int
  end
```

```text
module LazyFibs :
  sig
    type 'a lazysequence = Cons of 'a * 'a lazysequence Lazy.t
    val hd : 'a lazysequence -> 'a
    val tl : 'a lazysequence -> 'a lazysequence
    val take_aux : int -> 'a lazysequence -> 'a list -> 'a list
    val take : int -> 'a lazysequence -> 'a list
    val nth : int -> 'a lazysequence -> 'a
    val sum : int lazysequence -> int lazysequence -> int lazysequence
    val fibs : int lazysequence
    val nth_fib : int -> int
  end
```