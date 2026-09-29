## 9.5. Memoization[#](#memoization)

In the previous section, we saw that the `Lazy` module memoizes the results of computations, so that no time has to be wasted on recomputing them. Memoization is a powerful technique for asymptotically speeding up simple recursive algorithms, without having to change the way the algorithm works.

Let’s see apply the Abstraction Principle and invent a way to memoize *any* function, so that the function only had to be evaluated once on any given input. We’ll end up using imperative data structures (arrays and hash tables) as part of our solution.

### 9.5.1. Fibonacci[#](#fibonacci)

Let’s again consider the problem of computing the nth Fibonacci number. The naive recursive implementation takes exponential time, because of the recomputation of the same Fibonacci numbers over and over again:

```ocaml
let rec fib n = if n < 2 then 1 else fib (n - 1) + fib (n - 2)
```

```text
val fib : int -> int = <fun>
```

Note

To be precise, its running time turns out to be \(O(\phi^n)\), where \(\phi\) is the golden ratio, \(\frac{1 + \sqrt{5}}{2}\).

If we record Fibonacci numbers as they are computed, we can avoid this redundant work. The idea is that whenever we compute `f n`, we store it in a table indexed by `n`. In this case the indexing keys are integers, so we can implement this table using an array:

```ocaml
let fibm n =
  let memo : int option array = Array.make (n + 1) None in
  let rec f_mem n =
    match memo.(n) with
    | Some result -> (* computed already *) result
    | None ->
        let result =
          if n < 2 then 1 else f_mem (n - 1) + f_mem (n - 2)
        in
        (* record in table *)
        memo.(n) <- Some result;
        result
  in
  f_mem n
```

```text
val fibm : int -> int = <fun>
```

The function `f_mem` defined inside `fibm` contains the original recursive algorithm, except before doing that calculation it first checks if the result has already been computed and stored in the table in which case it simply returns the result.

How do we analyze the running time of this function? The time spent in a single call to `f_mem` is \(O(1)\) if we exclude the time spent in any recursive calls that it happens to make. Now we look for a way to bound the total number of recursive calls by finding some measure of the progress that is being made.

A good choice of progress measure, not only here but also for many uses of memoization, is the number of non-empty entries in the table (i.e., entries that contain `Some n` rather than `None`). Each time `f_mem` makes the two recursive calls it also increases the number of non-empty entries by one (filling in a formerly empty entry in the table with a new value). Since the table has only `n` entries, there can thus only be a total of \(O(n)\) calls to `f_mem`, for a total running time of \(O(n)\) (because we established above that each call takes \(O(1)\) time). This speedup from memoization thus reduces the running time from exponential to linear, a huge change—e.g., for \(n=4\) the speedup from memoization is more than a factor of a million!

The key to being able to apply memoization is that there are common sub-problems which are being solved repeatedly. Thus we are able to use some extra storage to save on repeated computation.

Although this code uses imperative constructs (specifically, array update), the side effects are not visible outside the function `fibm`. So from a client’s perspective, `fibm` is functional. There’s no need to mention the imperative implementation (i.e., the benign side effects) that are used internally.

### 9.5.2. Memoization Using Higher-order Functions[#](#memoization-using-higher-order-functions)

Now that we’ve seen an example of memoizing one function, let’s use higher-order functions to memoize any function. First, consider the case of memoizing a non-recursive function `f`. In that case we simply need to create a hash table that stores the corresponding value for each argument that `f` is called with (and to memoize multi-argument functions we can use currying and uncurrying to convert to a single argument function).

```ocaml
let memo f =
  let h = Hashtbl.create 16 in
  fun x ->
    try Hashtbl.find h x
    with Not_found ->
      let y = f x in
      Hashtbl.add h x y;
      y
```

```text
val memo : ('a -> 'b) -> 'a -> 'b = <fun>
```

For recursive functions, however, the recursive call structure needs to be modified. This can be abstracted out independent of the function that is being memoized:

```ocaml
let memo_rec f =
  let h = Hashtbl.create 16 in
  let rec g x =
    try Hashtbl.find h x
    with Not_found ->
      let y = f g x in
      Hashtbl.add h x y;
      y
  in
  g
```

```text
val memo_rec : (('a -> 'b) -> 'a -> 'b) -> 'a -> 'b = <fun>
```

Now we can slightly rewrite the original `fib` function above using this general memoization technique:

```ocaml
let fib_memo =
  let fib self n =
    if n < 2 then 1 else self (n - 1) + self (n - 2)
  in
  memo_rec fib
```

```text
val fib_memo : int -> int = <fun>
```

### 9.5.3. Just for Fun: Party Optimization[#](#just-for-fun-party-optimization)

Suppose we want to throw a party for a company whose org chart is a binary tree. Each employee has an associated “fun value” and we want the set of invited employees to have a maximum total fun value. However, no employee is fun if his superior is invited, so we never invite two employees who are connected in the org chart. (The less fun name for this problem is the maximum weight independent set in a tree.) For an org chart with \(n\) employees, there are \(2^{n}\) possible invitation lists, so the naive algorithm that compares the fun of every valid invitation list takes exponential time.

We can use memoization to turn this into a linear-time algorithm. We start by defining a variant type to represent the employees. The `int` at each node is the fun.

```ocaml
type tree = Empty | Node of int * tree * tree
```

Now, how can we solve this recursively? One important observation is that in any tree, the optimal invitation list that doesn’t include the root node will be the union of optimal invitation lists for the left and right subtrees. And the optimal invitation list that does include the root node will be the union of optimal invitation lists for the left and right children that do not include their respective root nodes. So it seems useful to have functions that optimize the invite lists for the case where the root node is required to be invited, and for the case where the root node is excluded. We’ll call these two functions `party_in` and `party_out`. Then the result of party is just the maximum of these two functions:

```ocaml
module Unmemoized = struct
  type tree =
    | Empty
    | Node of int * tree * tree
  (* Returns optimum fun for t. *)
  let rec party t = max (party_in t) (party_out t)
  (* Returns optimum fun for t assuming the root node of t
   * is included. *)
  and party_in t =
    match t with
    | Empty -> 0
    | Node (v, left, right) -> v + party_out left + party_out right
  (* Returns optimum fun for t assuming the root node of t
   * is excluded. *)
  and party_out t =
    match t with
    | Empty -> 0
    | Node (v, left, right) -> party left + party right
end
```

```text
module Unmemoized :
  sig
    type tree = Empty | Node of int * tree * tree
    val party : tree -> int
    val party_in : tree -> int
    val party_out : tree -> int
  end
```

This code has exponential running time. But notice that there are only \(n\) possible distinct calls to party. If we change the code to memoize the results of these calls, the performance will be linear in \(n\). Here is a version that memoizes the result of party and also computes the actual invitation lists. Notice that this code memoizes results directly in the tree.

```ocaml
module Memoized = struct
  (* This version memoizes the optimal fun value for each tree node. It
     also remembers the best invite list. Each tree node has the name of
     the employee as a string. *)
  type tree =
    | Empty
    | Node of
        int * string * tree * tree * (int * string list) option ref
  let rec party t : int * string list =
    match t with
    | Empty -> (0, [])
    | Node (_, name, left, right, memo) -> (
        match !memo with
        | Some result -> result
        | None ->
            let infun, innames = party_in t in
            let outfun, outnames = party_out t in
            let result =
              if infun > outfun then (infun, innames)
              else (outfun, outnames)
            in
            memo := Some result;
            result)
  and party_in t =
    match t with
    | Empty -> (0, [])
    | Node (v, name, l, r, _) ->
        let lfun, lnames = party_out l and rfun, rnames = party_out r in
        (v + lfun + rfun, name :: lnames @ rnames)
  and party_out t =
    match t with
    | Empty -> (0, [])
    | Node (_, _, l, r, _) ->
        let lfun, lnames = party l and rfun, rnames = party r in
        (lfun + rfun, lnames @ rnames)
end
```

```text
module Memoized :
  sig
    type tree =
        Empty
      | Node of int * string * tree * tree * (int * string list) option ref
    val party : tree -> int * string list
    val party_in : tree -> int * string list
    val party_out : tree -> int * string list
  end
```

Why was memoization so effective for solving this problem? As with the Fibonacci algorithm, we had the overlapping sub-problems property, in which the naive recursive implementation called the function party many times with the same arguments. Memoization saves all those calls. Further, the party optimization problem has the property of optimal substructure, meaning that the optimal answer to a problem is computed from optimal answers to sub-problems. Not all optimization problems have this property. The key to using memoization effectively for optimization problems is to figure out how to write a recursive function that implements the algorithm and has two properties. Sometimes this requires thinking carefully.