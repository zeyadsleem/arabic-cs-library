## 3.12. Example: Natural Numbers[#](#example-natural-numbers)

We can define a recursive variant that acts like numbers, demonstrating that we don’t really have to have numbers built into OCaml! (For sake of efficiency, though, it’s a good thing they are.)

A *natural number* is either *zero* or the *successor* of some other natural number. This is how you might define the natural numbers in a mathematical logic course, and it leads naturally to the following OCaml type `nat`:

```ocaml
type nat = Zero | Succ of nat
```

```text
type nat = Zero | Succ of nat
```

We have defined a new type `nat`, and `Zero` and `Succ` are constructors for values of this type. This allows us to build expressions that have an arbitrary number of nested `Succ` constructors. Such values act like natural numbers:

```ocaml
let zero = Zero
let one = Succ zero
let two = Succ one
let three = Succ two
let four = Succ three
```

```text
val zero : nat = Zero
```

```text
val one : nat = Succ Zero
```

```text
val two : nat = Succ (Succ Zero)
```

```text
val three : nat = Succ (Succ (Succ Zero))
```

```text
val four : nat = Succ (Succ (Succ (Succ Zero)))
```

Now we can write functions to manipulate values of this type. We’ll write a lot of type annotations in the code below to help the reader keep track of which values are `nat` versus `int`; the compiler, of course, doesn’t need our help.

```ocaml
let iszero = function
  | Zero -> true
  | Succ _ -> false
let pred = function
  | Zero -> failwith "pred Zero is undefined"
  | Succ m -> m
```

```text
val iszero : nat -> bool = <fun>
```

```text
val pred : nat -> nat = <fun>
```

Similarly, we can define a function to add two numbers:

```ocaml
let rec add n1 n2 =
  match n1 with
  | Zero -> n2
  | Succ pred_n -> add pred_n (Succ n2)
```

```text
val add : nat -> nat -> nat = <fun>
```

We can convert `nat` values to type `int` and vice-versa:

```ocaml
let rec int_of_nat = function
  | Zero -> 0
  | Succ m -> 1 + int_of_nat m
let rec nat_of_int = function
  | i when i = 0 -> Zero
  | i when i > 0 -> Succ (nat_of_int (i - 1))
  | _ -> failwith "nat_of_int is undefined on negative ints"
```

```text
val int_of_nat : nat -> int = <fun>
```

```text
val nat_of_int : int -> nat = <fun>
```

To determine whether a natural number is even or odd, we can write a pair of mutually recursive functions:

```ocaml
let rec even = function Zero -> true | Succ m -> odd m
and odd = function Zero -> false | Succ m -> even m
```

```text
val even : nat -> bool = <fun>
val odd : nat -> bool = <fun>
```