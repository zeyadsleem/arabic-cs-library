---
title: "Disjoint Sets"
lang: en
---

## 8. Disjoint Sets

This chapter presents an imperative data structure that solves the problem of
partitioning a finite set into disjoint subsets, called “classes.” We wish to
determine whether two elements belong to the same class and merge two
classes into one. It is these two operations that give the structure its name:
*union-find*.

### 8.1 The Basic Idea

Without loss of generality, we may assume that the set to be partitioned consists of
the n integers {0,1,…,n− 1}. Program [71](#x22-233002r71) (see page [618](#x22-233002r71)) gives the signature of such
a structure. The operation `create` n constructs a new partition of {0,1,…,n − 1} in
which each element forms a class by itself. The operation `find` determines
the class of an element by returning one of the integers as a distinguished
representative. In particular, we can determine if two elements are in the same class
by comparing the result given by `find` for each one. Finally, the operation
`union` merges two classes of the partition, modifying the data structure in
place.

The basic idea is to link the elements of a class between themselves. In each class,
these links form a graph in which all paths lead to the representative, which is the
only element linked to itself. Figure [8.1](#a-partition-of-into-two-sets) illustrates a situation in which the set
{0,1,…,7} is partitioned into two classes, whose representatives are respectively 3 and
4.

![](/images/learn-ocaml/disjoint-sets-0-uf2-mps-.webp){#a-partition-of-into-two-sets}

**Figure 8.1: A partition of {0,1,…,7} into two sets.**

It is possible to represent such a structure using individually allocated nodes
(see exercise [8.5](#x22-236015r5)). Nevertheless it is simpler, and often more efficient, to
use an array that links each integer to another integer of the same class.
These links lead to the class representative, which is associated with itself in
the array. Thus, the partition of figure [8.1](#a-partition-of-into-two-sets) is represented by the following
array:

The `find` operation simply follows the links until the representative is
found. The `union` operation begins by finding the representatives of both
elements and then links them together. We propose two improvements in the
interest of efficiency. The first involves performing *path compression*during the
search carried out by `find`: All the elements found along the path traversed
to reach the representative are linked directly to it. The second consists in
keeping track of the *rank*of each representative, that is, the maximum length
of a path in its class. This information is stored in a second array and is
used by the function `union` to choose the representative for the union of the
classes.

>

### 8.2 Implementation

>

We now describe the code of the *union-find*structure. The type `t` is a record
containing two arrays: `rank`, containing the rank of each class; and `link`, containing
the links between elements.

```ocaml
  type t = {
    rank: int array;
    link: int array;
  }
```

The information contained in `rank` is only meaningful for those elements i that are
representatives, that is, for which `link.(`i`)` = i. Initially, each element forms a class in
itself (that is, it is its own representative), and the rank of every class is
0.

```ocaml
  let create n =
    { rank = Array.make n 0;
      link = Array.init n (fun i -> i) }
```

The function `find` computes the representative of an element `i`. It is naturally written as
a recursive function. We begin by calculating the element `p` linked to `i` in
the array `t.link`. If it is `i` itself, `i` is the class representative, and we are
done.

```ocaml
  let rec find t i =
    let p = t.link.(i) in
    if p = i then
      i
```

Otherwise, we recursively compute the representative `r` of `p` with `findtp`.
However, before returning `r`, we perform path compression, that is, we link `i` to `r`
directly.

```ocaml
    else begin
      let r = find t p in
      t.link.(i) <- r;
      r
    end
```

This way, the next time we call `find` on `i`, we will immediately find `r`.

The operation `union` merges the classes of two elements, `i` and `j`. We begin by
calculating their representatives, `ri` and `rj`, respectively. If they are equal, there is
nothing more to be done.

```ocaml
  let union t i j =
    let ri = find t i in
    let rj = find t j in
    if ri <> rj then begin
```

Otherwise, we compare the ranks of the two classes. If that of `ri` is strictly less than that
of `rj`, we make `rj` the representative of the union.

```ocaml
      if t.rank.(ri) < t.rank.(rj) then
        t.link.(ri) <- rj
```

The rank does not have to be updated for this new class. Indeed, only the paths in the
previous class of `ri` have had their lengths increased by one unit, and this new length
does not exceed the rank of `rj`. When the rank of `rj` is smaller, we proceed
symmetrically.

```ocaml
      else begin
        t.link.(rj) <- ri;
```

When the two classes have the same rank, we choose one of the two representatives
arbitrarily as the representative of the union (here, `ri`). The rank information must
then be updated, because in this case the length of the longest path in the class may
increase by one unit.

```ocaml
        if t.rank.(ri) = t.rank.(rj) then
          t.rank.(ri) <- t.rank.(ri) + 1
      end
    end
```

Importantly the function `union` uses the function `find`, and therefore performs
path compression even in the case when `i` and `j` belong to the same class.
The complete code of the *union-find*structure is given in program [72](#x22-234001r72) (see
page [621](#x22-234001r72)).

#### Complexity

We can show that, thanks to path compression and the rank associated with each
class, a sequence of m `find` and `union` operations, performed on a structure
containing n elements, is executed in O(mα(n,m)) total time, where α is a function
that grows extremely slowly. In fact, it grows so slowly that we may consider it to be
constant for all practical purposes, given the constraints that memory and time
impose on the values of n and m. We may therefore assume that each operation takes
amortized constant time. This analysis is complex and lies beyond the scope of this
book. A detailed explanation may be found in *Introduction to Algorithms* [[7](https://usr.lmf.cnrs.fr/lpo/mainli3.html#Xcormen),
chap. 22].

>

### 8.3 Exercises

**8.1**The signature of the *union-find*structure is constraining because it requires
prior knowledge of the number of elements. For greater flexibility, we may
wish to add new elements dynamically, and without any restriction on the
number of elements. The signature of such a structure could be the following:

```ocaml
  type t
  val create: unit -> t
  val add: t -> int
  val find: t -> int -> int
  val union: t -> int -> int -> unit
```

The function `create` creates an empty structure. The function `add` adds a new element
and returns it. (Elements are always integers). The signatures of `find` and `union`
remain unchanged. Implement such a data structure using resizeable arrays (see
section [*4.1*](https://usr.lmf.cnrs.fr/lpo/mainch4.html#resizeable-arrays) *Resizeable Arrays*).

**8.2**Extend the *union-find*structure with an operation `num_classes` that returns
the total number of classes.

```ocaml
  val num_classes: t -> int
```

Ensure that `num_classes` executes in constant time by keeping track of this value as an
additional field of the record.

**8.3**Extend the *union-find*structure with an operation `iter_classes` that permits
the traversal of the set of all class representatives.

```ocaml
  val iter_classes: (int -> unit) -> t -> unit
```

Ensure that `iter_classes` executes in time proportionate to the total number of
classes.

**8.4**If the elements are not consecutive integers, we can replace the two arrays `rank`
and `link` by a pair of hash tables. Reimplement the operations `create`, `find`, and
`union` using this idea.

**8.5** Instead of using arrays, another way of implementing the *union-find*structure
consists in representing each class directly as an acyclic graph whose nodes are
records containing the values `rank` and `link`. Each node is of the following
type:

```ocaml
  type elt = { mutable rank: int; mutable link: elt }
```

If we wish to keep track of extra information for each element, we may use the following
type instead:

```ocaml
  type ’a elt =
    { mutable rank: int; mutable link: ’a elt; data: ’a }
```

It is no longer necessary to keep track of any global information in the *union-find*
structure, because each node contains all the necessary information. The signature of
the *union-find*structure is then modified as follows:

```ocaml
  type ’a elt
  val create_node: ’a -> ’a elt
  val find: ’a elt -> ’a elt
  val union: ’a elt -> ’a elt -> unit
```

The function `create_node` constructs a class consisting of a single element, that is, a
record whose field `link` points to itself. Write the operations `make`, `find`, and `union`.
Note: The comparison of values of type `’aelt` must be done using physical
equality.

**8.6**Replace the arrays `rank` and `link` with persistent arrays (see section [*4.4*](https://usr.lmf.cnrs.fr/lpo/mainch4.html#persistent-arrays)
*Persistent Arrays*), and write a persistent *union-find*structure with the following
signature:

```ocaml
  type t
  val create: int -> t
  val find: t -> int -> int
  val union: t -> int -> int -> t
```

Note: To perform path compression, it is convenient to modify the contents of the field
`link` using side effects. We accordingly define the following type:

```ocaml
  type t = { rank: int A.t; mutable link: int A.t }
```

Here, the type `A.t` is the type of persistent arrays, and the mutability of the field `link`
can be used to record the effect of path compression before returning the result of the
function `find`. Although the data structure is modified by a side effect, the
modification cannot be observed: the representative of each element remains the
same.

**8.7**The *union-find*structure can be used to efficiently construct a perfect maze,
that is, one in which there is one and only one path between any two cells. Here is an
example of such a maze:

You may proceed as follows: Create a *union-find*structure whose elements are the
different cells. The idea is that two cells are in the same class if and only if they are
linked by a path. Initially, all the cells of the maze are separated from each other by
walls. Next, consider all pairs of adjacent cells (vertically and horizontally) in random
order. For each pair (c1,c2), compare the classes of the cells c1 and c2. If they are
identical, there is nothing more to be done. Otherwise, delete the wall that separates
c1 and c2, and merge the two classes using `union`. Write code that constructs a maze
 
 
using this method.

Hint: The easiest way to traverse all pairs of adjacent cells in random order is by
constructing an array containing all pairs, and then mixing them randomly using the
*Knuth shuffle*(exercice [2.11](https://usr.lmf.cnrs.fr/lpo/mainch2.html#x7-94006r11), page [249](https://usr.lmf.cnrs.fr/lpo/mainch2.html#x7-94006r11)).

Justify that at the end of the construction every cell is linked to every other cell
by a single path.

**8.8**The aim of this exercise is to color the *connected*components of a
black-and-white image using different colors. A connected component is formed by
pixels that have the same color as their neighbors. Two pixels are neighbors if they
have a common border.

For example, in the following image of 6 × 6 pixels, there are two white connected
components, and four black ones.

A black-and-white image is represented by a matrix of booleans. To compute its
connected components, we use a *union-find*structure to group neighboring pixels
having the same color in a single class. Write a function that takes as argument a
matrix of booleans and returns a *union-find*structure containing its equivalence
classes.

To assign a different color to each connected component, use a hash table that
associates a different color with each representative. Write a function that displays the
image with its connected components colored. Assume that you are given a
function `new_color` of type `unit->color` and a function `draw_pixel` of type
`int->int->color->unit`.
