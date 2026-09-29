## 4.1. Higher-Order Functions[#](#higher-order-functions)

Consider these functions `double` and `square` on integers:

```ocaml
let double x = 2 * x
let square x = x * x
```

```text
val double : int -> int = <fun>
```

```text
val square : int -> int = <fun>
```

Let’s use these functions to write other functions that quadruple and raise a number to the fourth power:

```ocaml
let quad x = double (double x)
let fourth x = square (square x)
```

```text
val quad : int -> int = <fun>
```

```text
val fourth : int -> int = <fun>
```

There is an obvious similarity between these two functions: what they do is apply a given function twice to a value. By passing in the function to another function `twice` as an argument, we can abstract this functionality:

```ocaml
let twice f x = f (f x)
```

```text
val twice : ('a -> 'a) -> 'a -> 'a = <fun>
```

The function `twice` is higher-order: its input `f` is a function. And—recalling that all OCaml functions really take only a single argument—its output is technically `fun x -> f (f x)`, so `twice` returns a function hence is also higher-order in that way.

Using `twice`, we can implement `quad` and `fourth` in a uniform way:

```ocaml
let quad x = twice double x
let fourth x = twice square x
```

```text
val quad : int -> int = <fun>
```

```text
val fourth : int -> int = <fun>
```

### 4.1.1. The Abstraction Principle[#](#the-abstraction-principle)

Above, we have exploited the structural similarity between `quad` and `fourth` to save work. Admittedly, in this toy example it might not seem like much work. But imagine that `twice` were actually some much more complicated function. Then, if someone comes up with a more efficient version of it, every function written in terms of it (like `quad` and `fourth`) could benefit from that improvement in efficiency, without needing to be recoded.

Part of being an excellent programmer is recognizing such similarities and *abstracting* them by creating functions (or other units of code) that implement them. Bruce MacLennan names this the **Abstraction Principle** in his textbook *Functional Programming: Theory and Practice* (1990). The Abstraction Principle says to avoid requiring something to be stated more than once; instead, *factor out* the recurring pattern. Higher-order functions enable such refactoring, because they allow us to factor out functions and parameterize functions on other functions.

Besides `twice`, here are some more relatively simple examples, indebted also to MacLennan:

**Apply.** We can write a function that applies its first input to its second input:

```ocaml
let apply f x = f x
```

```text
val apply : ('a -> 'b) -> 'a -> 'b = <fun>
```

Of course, writing `apply f` is a lot more work than just writing `f`.

**Pipeline.** The pipeline operator, which we’ve previously seen, is a higher-order function:

```ocaml
let pipeline x f = f x
let (|>) = pipeline
let x = 5 |> double
```

```text
val pipeline : 'a -> ('a -> 'b) -> 'b = <fun>
```

```text
val ( |> ) : 'a -> ('a -> 'b) -> 'b = <fun>
```

```text
val x : int = 10
```

**Compose.** We can write a function that composes two other functions:

```ocaml
let compose f g x = f (g x)
```

```text
val compose : ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b = <fun>
```

This function would let us create a new function that can be applied many times, such as the following:

```ocaml
let square_then_double = compose double square
let x = square_then_double 1
let y = square_then_double 2
```

```text
val square_then_double : int -> int = <fun>
```

```text
val x : int = 2
```

```text
val y : int = 8
```

**Both.** We can write a function that applies two functions to the same argument and returns a pair of the result:

```ocaml
let both f g x = (f x, g x)
let ds = both double square
let p = ds 3
```

```text
val both : ('a -> 'b) -> ('a -> 'c) -> 'a -> 'b * 'c = <fun>
```

```text
val ds : int -> int * int = <fun>
```

```text
val p : int * int = (6, 9)
```

**Cond.** We can write a function that conditionally chooses which of two functions to apply based on a predicate:

```ocaml
let cond p f g x =
  if p x then f x else g x
```

```text
val cond : ('a -> bool) -> ('a -> 'b) -> ('a -> 'b) -> 'a -> 'b = <fun>
```

### 4.1.2. The Meaning of “Higher Order”[#](#the-meaning-of-higher-order)

The phrase “higher order” is used throughout logic and computer science, though not necessarily with a precise or consistent meaning in all cases.

In logic, *first-order quantification* refers primarily to the universal and existential (\(\forall\) and \(\exists\)) quantifiers. These let you quantify over some *domain* of interest, such as the natural numbers. But for any given quantification, say \(\forall x\), the variable being quantified represents an individual element of that domain, say the natural number 42.

*Second-order quantification* lets you do something strictly more powerful, which is to quantify over *properties* of the domain. Properties are assertions about individual elements, for example, that a natural number is even, or that it is prime. In some logics we can equate properties with sets of individual, for example the set of all even naturals. So second-order quantification is often thought of as quantification over *sets*. You can also think of properties as being functions that take in an element and return a Boolean indicating whether the element satisfies the property; this is called the *characteristic function* of the property.

*Third-order* logic would allow quantification over properties of properties, and *fourth-order* over properties of properties of properties, and so forth. *Higher-order logic* refers to all these logics that are more powerful than first-order logic; though one interesting result in this area is that all higher-order logics can be expressed in second-order logic.

In programming languages, *first-order functions* similarly refer to functions that operate on individual data elements (e.g., strings, ints, records, variants, etc.). Whereas *higher-order function* can operate on functions, much like higher-order logics can quantify over properties (which are like functions).

### 4.1.3. Famous Higher-order Functions[#](#famous-higher-order-functions)

In the next few sections we’ll dive into three of the most famous higher-order functions: map, filter, and fold. These are functions that can be defined for many data structures, including lists and trees. The basic idea of each is that:

- *map* transforms elements,
- *filter* eliminates elements, and
- *fold* combines elements.