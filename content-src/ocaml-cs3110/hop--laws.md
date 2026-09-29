## 4.8. Algebraic Laws for Higher-Order Functions[#](#algebraic-laws-for-higher-order-functions)

We have used `map`, `filter`, and `fold` to describe computations over lists. These functions also obey *algebraic laws*: equations that let us replace one expression with another that computes the same result. In particular, the laws can combine several traversals into one, a transformation called *fusion*.

As an important technical restriction, we must assume that the functions and predicates involved in this section are pure and terminating. We will return to why that assumption matters at the end.

### 4.8.1. Three Small Functionals[#](#three-small-functionals)

As a preliminary step, let’s define some functions we’ll use in the laws. The operator `<<` composes two functions: `f << g` applies `g` first, then `f`. That is, it combines function from the right to the left. The operator `&&&` combines two predicates. Finally, `guard p f` applies `f` only when `p` holds:

```ocaml
let ( << ) f g x = f (g x)
let ( &&& ) p q x = p x && q x
let id x = x
let guard p f x =
  if p x then f x else id
```

```text
val ( << ) : ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b = <fun>
```

```text
val ( &&& ) : ('a -> bool) -> ('a -> bool) -> 'a -> bool = <fun>
```

```text
val id : 'a -> 'a = <fun>
```

```text
val guard : ('a -> bool) -> ('a -> 'b -> 'b) -> 'a -> 'b -> 'b = <fun>
```

We’ll also use these shorthand names for the standard library functions:

```ocaml
let map = List.map
let filter = List.filter
let foldr f z lst = List.fold_right f lst z
```

```text
val map : ('a -> 'b) -> 'a list -> 'b list = <fun>
```

```text
val filter : ('a -> bool) -> 'a list -> 'a list = <fun>
```

```text
val foldr : ('a -> 'b -> 'b) -> 'b -> 'a list -> 'b = <fun>
```

We changed the parameter order for `foldr` to make the list be the last argument, so that we can compose it with `map` and `filter` in the laws below.

### 4.8.2. Fusing Maps and Filters[#](#fusing-maps-and-filters)

Mapping the identity function leaves a list’s elements unchanged. Mapping two functions in succession is equivalent to mapping their composition:

```ocaml
map id = id
map (f << g) = map f << map g
```

For example, these two expressions both produce `[4; 9; 16]`:

```ocaml
let add_one x = x + 1
let square x = x * x
let mapped = (map square << map add_one) [1; 2; 3]
let mapped_fused = map (square << add_one) [1; 2; 3]
```

```text
val add_one : int -> int = <fun>
```

```text
val square : int -> int = <fun>
```

```text
val mapped : int list = [4; 9; 16]
```

```text
val mapped_fused : int list = [4; 9; 16]
```

The fused version avoids constructing the intermediate list `map g lst`.

Two filters can also be combined:

```ocaml
filter p << filter q = filter (p &&& q)
```

Again, the fused version avoids an intermediate list.

```ocaml
let positive x = x > 0
let even x = x mod 2 = 0
let selected = (filter positive << filter even) [-2; -1; 0; 1; 2; 3; 4]
let selected_fused = filter (positive &&& even) [-2; -1; 0; 1; 2; 3; 4]
```

```text
val positive : int -> bool = <fun>
```

```text
val even : int -> bool = <fun>
```

```text
val selected : int list = [2; 4]
```

```text
val selected_fused : int list = [2; 4]
```

Both `selected` and `selected_fused` are `[2; 4]`.

### 4.8.3. Fusing Map or Filter into a Right Fold[#](#fusing-map-or-filter-into-a-right-fold)

The next two laws remove the list that a map or filter would create before a right fold:

```ocaml
foldr f z << map g = foldr (f << g) z
foldr f z << filter p = foldr (guard p f) z
```

In the first law, `(f << g) x acc` computes `f (g x) acc`. In the second, `guard p f x acc` either combines `x` with the accumulator or passes the accumulator through unchanged. Both laws keep the order in which the right fold combines the elements.

### 4.8.4. Fusing an Entire Pipeline[#](#fusing-an-entire-pipeline)

We can apply those laws in succession. When a filter comes before a map, the fold step tests the original element and then transforms it:

```ocaml
foldr f z << map g << filter p
= foldr (guard p (f << g)) z
```

When a map comes before a filter, the predicate must test the transformed element. That accounts for the extra composition `p << g`:

```ocaml
foldr f z << filter p << map g
= foldr (guard (p << g) (f << g)) z
```

Here are both orders in OCaml:

```ocaml
let sum_even_squares =
  foldr ( + ) 0 << map square << filter even
let sum_even_squares_fused =
  foldr (guard even (( + ) << square)) 0
let large x = x > 10
let sum_large_squares =
  foldr ( + ) 0 << filter large << map square
let sum_large_squares_fused =
  foldr (guard (large << square) (( + ) << square)) 0
```

```text
val sum_even_squares : int list -> int = <fun>
```

```text
val sum_even_squares_fused : int list -> int = <fun>
```

```text
val large : int -> bool = <fun>
```

```text
val sum_large_squares : int list -> int = <fun>
```

```text
val sum_large_squares_fused : int list -> int = <fun>
```

For `[1; 2; 3; 4]`, the first pair returns `20`: it selects even inputs and then squares them. For `[1; 2; 4; 5]`, the second pair returns `41`: it squares every input and then selects results greater than `10`. Each fused function traverses its input once without building an intermediate list.

### 4.8.5. A Related Law for Left Folds[#](#a-related-law-for-left-folds)

A map can be fused into `List.fold_left`, too:

```ocaml
List.fold_left f z (List.map g lst)
= List.fold_left (fun acc x -> f acc (g x)) z lst
```

Both sides start with `z` and update the accumulator with `f acc (g x)` for each element, from left to right. For example:

```ocaml
let sum_of_squares lst =
  lst |> List.map square |> List.fold_left ( + ) 0
let sum_of_squares_fused lst =
  lst |> List.fold_left (fun acc x -> acc + square x) 0
```

```text
val sum_of_squares : int list -> int = <fun>
```

```text
val sum_of_squares_fused : int list -> int = <fun>
```

### 4.8.6. On the Need for Pure Functions[#](#on-the-need-for-pure-functions)

The equations above describe equality of results, not equality of every observable behavior. Separate maps perform every call to `g` before any call to `f`, whereas a fused map can interleave them. The filter law can also change the order of predicate calls. If a function prints, raises an exception, or changes mutable state, those differences matter.

OCaml therefore does not generally apply these fusions automatically, though a compiler could do so if could prove that the functions are pure. The Haskell compiler GHC does perform some of these fusions automatically.