---
title: "Sorting Algorithms"
lang: en
---

## 12. Sorting Algorithms

This chapter presents several sorting algorithms on lists and arrays. We assume
that the elements to be sorted are of type `elt`, equipped with a total order
given in the form of a function `compare` of type `elt->elt->int`. Sorting
functions on lists and arrays will respectively have type `eltlist->eltlist`
and `eltarray->unit`. We assume that we sort lists and arrays in increasing
order. For the sake of convenience, we define two functions `lt` and `le` as
follows:

```ocaml
  let lt x y = compare x y < 0
  let le x y = compare x y <= 0
```

Throughout this chapter, N will denote the number of elements to be sorted. For each
sorting algorithm presented, we indicate its complexity not only in terms of the
number of comparisons performed, but also in terms of the number of basic
allocations in the case of lists and the number of assignments in the case of arrays.
For each one, we give the complexity in the best, worst, and average cases. For the
average case, we assume that the elements to be sorted are distinct and that the N!
possible permutations of the input are all equally likely. Recall that the optimal
complexity of a sorting algorithm only performing comparisons of elements is
O(N log N) (see section [12.5](#optimal-complexity)).

### 12.1 Insertion Sort

Insertion sort consists in successively inserting each element into the set of elements
already sorted. This is what we do, for example, when we sort a pack of
cards.

#### 12.1.1 Lists

Insertion sort on a list consists in traversing it while successively inserting each
element in the part already sorted. We begin therefore by writing a function `insert`
that inserts an element `x` in a list that is assumed to be sorted. The code is as
follows:

```ocaml
  let rec insert x = function
    | y :: l when lt y x -> y :: insert x l
    | l -> x :: l
```

The first pattern matching case corresponds to a recursive insertion when the first
element of the list is smaller than `x`. The second pattern matching case corresponds to
that in which `x` is smaller than all the elements of `l`, whether `l` is empty or
not.

Sorting then consists in traversing the list using `List.fold_left`, with the portion
of the list already sorted as accumulator.

```ocaml
  let insertion_sort l =
    List.fold_left (fun acc x -> insert x acc) [] l
```

This code may prove problematic for long lists: Since the function `insert` is not tail
recursive, it can overflow the stack. It is, however, easy to modify the function `insert`
to make it tail recursive. We can do this by adding an accumulator containing the list,
in reverse order, of elements smaller than `x` that have already been considered. If we
call this accumulator `acc`, we then have the following situation when we try to insert
`x` in `l`:

Once the position of `x` is determined, it suffices to reverse the accumulator
`acc` and concatenate the result with `l`. The function `List.rev_append` does
exactly this and is tail recursive. The final code of insertion sort is given in
program [89](#x28-277013r89).

>

##### Complexity

When the function `insert` inserts an element `x` at position k in `l`, it performs k
comparisons and 2k allocations (k to construct the accumulator and k in
`List.rev_append`). At best, k is always 1 and, at worst, it equals the length of the
list, which in the end gives the table in figure [12.1](#complexity-of-insertion-sort-on-lists).

**Figure 12.1: Complexity of insertion sort on lists.**

|  | best case | average | worst case |
| --- | --- | --- | --- |
| comparisons | N | N2∕4 | N2∕2 |
| allocations | N | N2∕2 | N2 |

#### 12.1.2 Arrays

Insertion sort on an array `a` is performed in-place. It consists in successively inserting
each element `a.(i)` in the portion of the array `a`[`0`..`i-1`] that is already sorted, which
corresponds to the following situation:

| `0 i-1` |  |  |
| --- | --- | --- |
| … already sorted … | `a.(i)` | … to be sorted … |

We begin with a `for` loop to traverse the array:

```ocaml
  let insertion_sort a =
    for i = 1 to Array.length a - 1 do
      let v = a.(i) in
```

To insert the element `a.(i)` in the right place, we use a `while` loop that shifts the
elements to the right as long as they are greater than `a.(i)`.

```ocaml
      let j = ref i in
      while 0 < !j && lt v a.(!j - 1) do
        a.(!j) <- a.(!j - 1);
        decr j
      done;
```

Once out of the loop, all that remains is to put `a.(i)` in its place.

```ocaml
       a.(!j) <- v
    done
```

The complete code of insertion sort on arrays is given in program [90](#x28-279016r90).

>

##### Complexity

Note that the function `insertion_sort` performs as many comparisons as
assignments. When the `while` loop inserts the element `a.(i)` at position `i`− k, it
performs k + 1 comparisons. At best, k equals 0 and, at worst, it equals `i`, which in
the end gives the table in figure [12.2](#complexity-of-insertion-sort-on-arrays).

**Figure 12.2: Complexity of insertion sort on arrays.**

|  | best case | average | worst case |
| --- | --- | --- | --- |
| comparisons | N | N2∕4 | N2∕2 |
| assignments | N | N2∕4 | N2∕2 |

### 12.2 Quicksort

Quicksort relies on the method of *divide and conquer*: The elements to be sorted are
divided into two subsets, all the elements of the first being smaller than those of the
second. Then, we sort each subset recursively. In practice, the subdivision is
performed with the help of an arbitrary element p of the set, called the *pivot*. The two
subsets are then respectively the elements less than or equal to p, and the elements
greater than p.

#### 12.2.1 Lists

To implement quicksort on lists, we begin by writing a function `partition` that
partitions a list at a given pivot `p`. To ensure tail recursion, we use an accumulator
consisting of a pair of lists. The function `partition` therefore takes the following
form:

```ocaml
  let rec partition ((left, right) as acc) p = function
```

The lists `left` and `right` represent the elements that are, respectively, less than or
equal to `p` and greater than `p`. When we reach the empty list, it suffices to return the
accumulator.

```ocaml
    | [] -> acc
```

Otherwise, we consider the first element `x` and compare it with the pivot `p`. If `x` is
less than or equal to `p`, we add it to `left` and call `partition` recursively on the rest of
the list, `s`.

```ocaml
    | x :: s when le x p ->
        partition (x :: left, right) p s
```

On the other hand, if `x` is greater than `p`, we add it to `right` and similarly call
`partition` recursively.

```ocaml
    | x :: s ->
        partition (left, x :: right) p s
```

Quicksort takes the form of a recursive function `quicksort`. The base case is that
of the empty list.

```ocaml
  let rec quicksort = function
    | [] ->
        []
```

If the list is not empty, we choose its first element as pivot `p` and partition the
remaining elements using the function `partition`.

```ocaml
    | p :: s ->
        let (left, right) = partition ([], []) p s in
```

Finally, we sort `left` and `right` recursively and concatenate the results, remembering to
insert the pivot `p` in the middle.

```ocaml
        (quicksort left) @ (p :: quicksort right)
```

The complete code of quicksort on lists is given in program [91](#x28-282020r91).

>

It is important to note that neither of the two recursive calls of the function
`quicksort`is tail recursive. A stack overflow is therefore possible. Exercise [12.4](#x28-302001r4)
discusses a solution to this problem.

##### Complexity

The function `partition` makes as many comparisons and allocations as there are
elements in the list passed as argument. Let C(N) be the number of comparisons
performed in the function `quicksort` for a list of length N.

If `partition` returns a list of length K and a list of length N − 1 − K, we
deduce:

$$C (N) = N - 1 + C (K) + C(N - 1- K ).$$

The worst case corresponds to K = 0, which gives C(N) = N − 1 + C(N − 1), and
hence C(N) ∼. The best case corresponds to a list split into two equal halves, that
is, K = N∕2. From this we easily deduce C(N) ∼ N log N. For the number of
comparisons on average, we consider that the N possible final places for the pivot are
all equally probable, which gives:

$$1 \sum C (N ) = N - 1 + N - C (K ) + C (N - 1 - K ) 0\le K\le N -1 - 2 \sum = N - 1 + N C (K ). 0\le K\le N -1$$

After a bit of algebra, left to the reader, we obtain:

$$C(N ) C (N - 1) 2 2 N - + - 1 - = - - - - N - - - - + N - + - - 1 - N(N - - + - 1).$$

This is a telescoping sum, which leads us to conclude that:

$$C(N ) - - - - - - ∼ 2logN N + 1$$

We therefore have C(N) ∼ 2N log N. For the number of allocations A(N), we
proceed in a similar fashion, with a slightly different equation:

$$A(N ) = N + K + A(K ) + A (N - 1 - K ).$$

In the end, we obtain the results given in the table of figure [12.3](#complexity-of-quicksort-on-lists).

**Figure 12.3: Complexity of quicksort on lists.**

|  | best case | average | worst case |
| --- | --- | --- | --- |
| comparisons | N log N | 2N log N | N2∕2 |
| allocations | N log N | 4N log N | N2 |

#### 12.2.2 Arrays

Quicksort on arrays is performed in-place. The partition and sorting functions take as
arguments the array and two indices that delimit the portion to be considered. We
retain the idea of a function `partition` that organizes the elements around a pivot,
and a sorting function that proceeds recursively.

The function `partition` takes an array `a` as argument, and two indices `l` and `r`,
that delimit a portion of the array. This portion corresponds to the elements between
the indices `l` (inclusive) and `r` (exclusive). We begin by choosing `a.(l)` as
pivot.

```ocaml
  let partition a l r =
    let p = a.(l) in
```

This choice is arbitrary and can influence performance. Exercise [12.8](#x28-302005r8) proposes a better
method of choosing the pivot.

The idea consists in traversing the array from left to right, between indices `l`
(inclusive) and `r` (exclusive), with a `for` loop. In each iteration of the loop, the
situation is as follows:

The index `i` of the loop gives the position of the next element to consider. The
index `m` partitions the part that has already been traversed. More precisely, it is the
index of the last cell containing a value less than or equal to `p`. We represent it with a
reference.

```ocaml
    let m = ref l in
    for i = l + 1 to r - 1 do
```

If `a.(i)` is strictly greater than `p`, we leave it in its place. Otherwise, to maintain the loop
invariant, it suffices to increment `m` and swap `a.(i)` and `a.(!m)`.

```ocaml
      if le a.(i) p then begin incr m; swap a i !m end
    done;
```

The code of the function `swap` is given in program [92](#x28-284024r92) below. Once all the elements have
been traversed, we perform one more swap to put the pivot in its place, that is, at
position `!m`, and we return this index.

```ocaml
    if l <> !m then swap a l !m;
    !m
```

We write the main function of quicksort as a recursive function `quick_rec` that takes the
same arguments as the function `partition`. If `l` ≥ `r-1`, the number of elements to be
sorted is either zero or one, and there is nothing to do.

```ocaml
  let rec quick_rec a l r =
    if l < r - 1 then begin
```

Otherwise, we partition the elements between `l` and `r`.

```ocaml
     let m = partition a l r in
```

After this call, the pivot `a.(m)` is at its final place. We then perform two recursive
calls to sort, respectively, the elements smaller than and larger than the
pivot.

```ocaml
      quick_rec a l m;
      quick_rec a (m + 1) r
    end
```

To sort an array, it suffices to call `quick_rec` on all of its elements.

```ocaml
  let quicksort a = quick_rec a 0 (Array.length a)
```

The complete code is given in program [92](#x28-284024r92).

>

As with quicksort on lists, a stack overflow could occur. Indeed, the first call to
`quick_rec` is not tail recursive and, in the worst case, the number of these calls may
be equal to the length of the array. Exercice [12.6](#x28-302003r6) discusses a solution to this
problem.

##### Complexity

The function `partition` always performs exactly (`r`−`l`) − 1 comparisons. The
complexity in number of comparisons is therefore the same as in case of quicksort
on lists. As far as the number of assignments is concerned, we note that
the function `partition` performs as many calls to `swap` as increments of
`m`. The best case occurs when, at each partition stage, the pivot remains
in the first position. Then no assignment is performed. It is important to
note that this case does not correspond to the best complexity in terms of
comparisons, which is quadratic in this case. Thus, on average, and assuming
that all final positions for the pivot are equally likely, we have fewer than
(`r`−`l`) + 1 assignments, each call to `swap` performing two assignments. This leads
to a calculation analogous to that of the average number of comparisons.
We have already done this computation for lists and obtained 2N log N.
In the worst case, the pivot is always found at position `r-1`. The function
`partition` then performs 2(`r`−`l`) assignments. There is, thus, a total of N2
assignments. In the end, we obtain the results given in the table of figure
[12.4](#complexity-of-quicksort-on-arrays).

**Figure 12.4: Complexity of quicksort on arrays.**

|  | best case | average | worst case |  |
| --- | --- | --- | --- | --- |
| comparisons | N log N | - | 2N log N | N2∕2 |
| assignments | - | 0 | 2N log N | N2 |

To avoid the worst case, to the extent possible, the two optimizations proposed in
exercises [12.8](#x28-302005r8) and [12.9](#x28-302008r9) must be implemented.

### 12.3 Merge Sort

As with quicksort, merge sort also applies the principle of divide and conquer. It
partitions the elements to be sorted into two parts of the same size, without trying to
compare their elements. It then sorts the two parts recursively and merges them;
hence the name *merge sort.*Thus, the worst case of quicksort, in which the two parts
have disproportionate sizes, is avoided.

#### 12.3.1 Lists

We begin by writing a function `split` that partitions a list into two lists of length
differing by at most one. To ensure tail recursion, we pass two lists `l1` and
`l2` as accumulators. When we reach the end of the list, we return the pair
`(l1,l2)`.

```ocaml
  let rec split l1 l2 = function
    | [] -> (l1, l2)
```

Otherwise, we consider the first element `x` and place it alternatively in `l1` or `l2`. The
simplest way to achieve this is to exchange `l1` and `l2` at each call.

```ocaml
    | x :: l -> split (x :: l2) l1 l
```

The second step consists in writing a function `merge` that merges two sorted lists.
For this, we traverse the two lists simultaneously.

```ocaml
  let rec merge l1 l2 = match l1, l2 with
```

If one of the two is empty, we return the other.

```ocaml
    | [], l | l, [] ->
        l
```

Otherwise, we compare the first elements `x1` and `x2` of each list. If `x1` is smaller, it is
placed at the head of the result, and we recursively merge the remainder `s1` of `l1` with
`l2`. We proceed symmetrically if `x2` is smaller.

```ocaml
    | x1 :: s1, x2 :: s2 ->
        if le x1 x2 then x1 :: merge s1 l2 else x2 :: merge l1 s2
```

Note: We observe that `merge` is not tail recursive. We can fix this easily by adding
an additional argument in which we accumulate the smaller elements.

Finally, we write a function `mergesort` that implements merge sort on a list `l`. If
the list contains at most one element, we return it directly.

```ocaml
  let rec mergesort l = match l with
    | [] | [_] ->
        l
```

Otherwise, we partition the list `l` into two lists using the function `split`:

```ocaml
    | _ ->
        let l1, l2 = split [] [] l in
```

We then sort the two lists `l1` and `l2` recursively, and merge the results using
`merge`.

```ocaml
        merge (mergesort l1) (mergesort l2)
```

Unlike the function `merge`, the function `mergesort` does not risk triggering a stack
overflow: Since the list `l` is partitioned into two equal halves, the size of the stack is
logarithmic. Program [93](#x28-287023r93) below contains the complete code, with the function `merge`
in its tail-recursive version.

>

We can avoid allocating the lists `l1` and `l2` by cleverly reusing the list `l` itself.
Exercise [12.10](#x28-303001r10) proposes such an optimization. This idea is notably used in the
function `List.sort` of the OCaml standard library.

##### Complexity

The function `split` makes N allocations and no comparisons. The function `merge`
makes twice as many allocations as comparisons: In the second branch of the pattern
matching, there are as many comparisons as allocations, and in the first
branch, the number of allocations performed by `List.rev_append` is equal
to the length of `acc`, itself equal to the number of allocations/comparisons
performed in the recursive part. Let C(N) (resp. f(N)) be the total number of
comparisons performed by `mergesort` (resp. `merge`). We then have the following
equation:

$$C (N ) = 2C (N /2) + f(N )$$

Indeed, the two recursive calls are made on lists of the same length N∕2. In the
best case, the function `merge` examines only the elements of one of the two lists, since
they are all smaller than those of the other list. In this case, f(N) = N∕2 and
hence C(N) ∼N log N. In the worst case, `merge` examines every element, so
that f(N) = N − 1; hence C(N) ∼ N log N. The analysis on the average
case is subtler (see [[15](https://usr.lmf.cnrs.fr/lpo/mainli3.html#XKnuthV3), ex 2 p. 646]) and gives f(N) = N + O(1); hence
 
 
C(N) ∼ N log N as well. The number of assignments is easily deduced from the
number of comparisons. In the end, we obtain the results given in the table of
figure [12.5](#complexity-of-merge-sort-on-lists).

**Figure 12.5: Complexity of merge sort on lists.**

|  | best case | average | worst case |
| --- | --- | --- | --- |
| comparisons | N log N | N log N | N log N |
| allocations | 2N log N | 3N log N | 3N log N |

#### 12.3.2 Arrays

The idea of merge sort on arrays is the same as for lists: We partition the elements to
be sorted into two equal halves. We sort the two halves, and then merge them. We
delimit the portion to be sorted by two indices `l` (inclusive) and `r` (exclusive). For the
partition, it suffices to compute the middle index `m` =. We then recursively sort
the two parts delimited by `l` and `m` on the one hand, and `m` and `r` on the other. We
have only to merge them. This proves extremely difficult to do in-place. It is
simpler to use a second array, allocated once and for all at the start of the
sort.

We begin by writing the function `merge` that implements the merging. It takes as
arguments two arrays, `a1` and `a2`, and the three indices `l`, `m`, and `r`. The portions
`a1`[`l`..`m`[ and `a1`[`m`..`r`[ are sorted. The objective is to merge them in `a2`[`l`..`r`[. For this,
we traverse the two portions of `a1` (with two references `i` and `j`) and the portion of `a2`
that is to be filled (with a `for` loop).

```ocaml
  let merge a1 a2 l m r =
    let i = ref l in
    let j = ref m in
    for k = l to r - 1 do
```

In each iteration of the loop, the situation is therefore as follows:

We must determine the next value to put in `a2.(k)`. It is the smallest of the
two values `a1.(!i)` and `a1.(!j)`. It is important, however, to also treat
the case in which there are no more elements in one of the two halves. We
determine whether the element is to be taken from the left half with the following
test:

```ocaml
      if !i < m && (!j = r || le a1.(!i) a1.(!j)) then begin
```

This test checks whether the left half is non-empty and its first element is smaller
than the first element of the right half, if such an element exists. In both
cases, we copy the element into `a2.(k)` and increment the corresponding
index.

```ocaml
        a2.(k) <- a1.(!i); incr i
      end else begin
        a2.(k) <- a1.(!j); incr j
      end
    done
```

Next, we implement merge sort as a function `mergesort`. We begin by allocating a
temporary array `tmp` obtained by copying the array to be sorted.

```ocaml
  let mergesort a =
    let tmp = Array.copy a in
```

The recursive part of merge sort is materialized via a recursive function `mergesort_rec`
that takes as arguments the indices `l` and `r`, that delimit the portion to be
sorted.

```ocaml
    let rec mergesort_rec l r =
```

If the segment contains at most one element, that is, if `l` ≥ `r-1`, there is nothing
more to be done.

```ocaml
      if l < r - 1 then begin
```

Otherwise, we divide the interval into two equal halves by computing the middle
position `m`, and then recursively sort `a`[`l`..`m`[ and `a`[`m`..`r`[.

```ocaml
        let m = (l + r) / 2 in
        mergesort_rec l m;
        mergesort_rec m r;
```

Note that the computation of `(l+r)/2` cannot trigger an integer overflow, since the
maximum size of an OCaml array is much smaller than the largest representable
integer (see section [*3.2*](https://usr.lmf.cnrs.fr/lpo/mainch3.html#runtime-model) *Runtime Model*for further details).

>

It remains to perform the merge. For this, we copy the entire portion `a`[`l`..`r`[ into
the array `tmp` and then call the function `merge`.

```ocaml
        Array.blit a l tmp l (r - l);
        merge tmp a l m r
      end
```

Finally, we sort the full array `a` by calling `mergesort` on all its elements.

```ocaml
    in
    mergesort_rec 0 (Array.length a)
```

Program [94](#x28-289025r94) contains the complete code. Its efficiency can be further improved: As with
quicksort, we can switch to insertion sort when the portion to be sorted becomes
sufficiently small (see exercise [12.7](#x28-302004r7)). Another idea consists in avoiding the copy of `a`
to `tmp`, which uses `Array.blit` (see exercise [12.12](#x28-303003r12)).

##### Complexity

The number of comparisons is exactly the same as in case of lists. The number of
assignments is also the same: N assignments in the function `merge` (each element
being copied from `a1` to `a2`) and N assignments performed by `Array.blit`.

Let A(N) be the total number of assignments in `mergesort`. We then
have:

$$A(N ) = 2A(N /2) + 2N,$$

that is, 2N log N assignments in total. In the end, we obtain the results of
figure [12.6](#complexity-of-merge-sort-on-arrays).

**Figure 12.6: Complexity of merge sort on arrays.**

|  | best case | average | worst case |
| --- | --- | --- | --- |
| comparisons | N log N | N log N | N log N |
| assignments | 2N log N | 2N log N | 2N log N |

### 12.4 Heapsort

Heapsort is based on the use of a priority queue. Such a structure permits the
addition of elements and the extraction of its smallest element. The idea behind
heapsort is the following: We construct a priority queue containing all the elements to
be sorted and then extract the elements one by one. Since the extraction operation
returns the smallest element each time, the elements come out in increasing
order.

In principle, any priority queue structure could be used. However, a structure in
which the addition and extraction operations have cost O(log N) gives an optimal
sorting algorithm in O(N log N). Both of the heap structures presented in chapter [6](https://usr.lmf.cnrs.fr/lpo/mainch6.html#queues)
have such complexity.

#### 12.4.1 Lists

We assume we are given a functor `PriorityQueue` that implements a priority queue
structure. In principle, we can choose between imperative and persistent structures.
However, there is no advantage to choosing a persistent structure here. We therefore
use the imperative heap structure described in section [*6.3*](https://usr.lmf.cnrs.fr/lpo/mainch6.html#imperative-priority-queues) *Imperative Priority Queues*.
Its interface is given again in program [95](#x28-292001r95).

>

We apply the functor `PriorityQueue` by passing as argument a module that
compares elements with `compare`. To avoid having to reverse the list at the end, we
order elements in decreasing order, that is, the element of highest priority for the
priority queue will be the largest element for the order relation `lt`. We therefore
write:

```ocaml
  module Heap = PriorityQueue(struct
                  type t = elt
                  let compare x y = compare y x
                end)
```

The function `heapsort` takes a list `l` of elements to be sorted and begins by
creating an empty heap `h`.

```ocaml
  let heapsort l =
    let h = Heap.create () in
```

The function then adds all the elements of the list `l` to the heap.

```ocaml
    List.iter (fun x -> Heap.add x h) l;
```

Next, we create a reference `res` that will receive the sorted result. We extract the
elements from the heap with the help of a `while` loop.

```ocaml
    let res = ref [] in
    while not (Heap.is_empty h) do
```

If the heap is not empty, we extract its smallest element `x` using `Heap.get_min` and then
remove it from the heap using `Heap.remove_min`.

```ocaml
      let x = Heap.get_min h in
      Heap.remove_min h;
```

We add `x` at the head of the list contained in `res` and then repeat.

```ocaml
      res := x :: !res
    done;
```

Once the heap becomes empty, it suffices to return the contents of `res`.

```ocaml
    !res
```

Note that the fact of having reversed the order relation in the heap structure means that
we do not have to reverse the list `!res` at the end of `heapsort`. Program [96](#x28-292032r96) contains
the complete code.

>

##### Complexity

The complexity of heapsort depends on the complexity of the heap structure used. As
we mentioned in the introduction to this section, if the operations `add` and
`remove_min` of the heap structure have at most logarithmic cost, then the sort itself
has cost O(N log N) in the worst case, which is optimal. If we now assume that the
heap structure used is that of section [*6.3*](https://usr.lmf.cnrs.fr/lpo/mainch6.html#imperative-priority-queues) *Imperative Priority Queues*, we can give a
more precise result. Indeed, we then know that `add` and `remove_min` each make a
maximum of 2log k comparisons to add or remove an element from a heap containing
k elements, so that the total number of comparisons in the worst case is at most:

$$4(log1 + log 2 + \cdot \cdot \cdot + log N) ∼ 4N logN$$

In fact, we will see in the next section that the construction of the heap has only
linear cost, so that the total is equivalent to 2N log N.

#### 12.4.2 Arrays

To implement heapsort on an array `a`, we will construct the heap structure
directly inside this array. The organization of the heap in the array is exactly
the same as in section [*6.3*](https://usr.lmf.cnrs.fr/lpo/mainch6.html#imperative-priority-queues) *Imperative Priority Queues*: The left and right
children of a node stored at index i are respectively stored at indices 2i + 1 and
2i + 2. As in the previous section, we construct a heap for the reverse order
relation, that is, a heap in which the largest element is to be found at the
root.

To construct the heap, we consider the elements of the array from right to left. In
each iteration, we have the following situation:

The portion `a`[`k+1`..`n`[ contains the bottom of the heap being constructed, that is,
it is a forest of heaps whose roots are situated at indices i such that `k` < i < 2`k` + 3.
We then make the value `a.(k)` descend to its place in the heap rooted at `k`.
Once all the elements have been traversed, we have a single heap rooted at
0.

The second step consists in deconstructing the heap. For this, we exchange its
root r in `a.(0)` with the element v in `a.(n-1)`. The value r is then in its
final place. We then reestablish the heap structure on `a`[0..`n-1`[ by making
v descend to its place in the heap of size `n-1` rooted at 0. We repeat the
operation for positions `n-1`, `n-2`, etc. In each iteration `k`, we have the following
situation:

There is a heap in the portion `a`[0..`k`[, all of whose elements are smaller than those of
the portion `a`[`k`..`n`[ that is already sorted.

The two steps of the above algorithm use the same operation consisting in making
a value descend until it reaches its position in a heap. This is implemented using a
recursive function `move_down` that takes as arguments an array `a`, an index `k`, a value
`v`, and an upper bound on the indices, `n`.

```ocaml
  let rec move_down a k v n =
```

We assume that we already have a heap h1, rooted at `2k+1`, so that `2k+1` < `n`, and
similarly a heap h2, rooted at `2k+2`, so that `2k+2` < `n`. The objective is to construct a
heap rooted at `k`, containing `v` and all the elements of h1 and h2. We begin by
determining whether the heap rooted at `k` will be reduced to a leaf, that is, whether
the heap h1 is empty. If this is so, we assign the value `v` to `a.(k)`, and we are
done.

```ocaml
    let r = 2 * k + 1 in
    if r >= n then
      a.(k) <- v
```

Otherwise, we determine the index `rmax` of the largest of the two roots of h1 and h2, by
carefully handling the case in which h2 is empty.

```ocaml
    else
      let rmax =
        if r+1 < n then if lt a.(r) a.(r+1) then r+1 else r
        else r in
```

If the value `v` is greater than or equal to `a.(rmax)`, the descent is complete, and it suffices
to assign `v` to `a.(k)`.

```ocaml
      if le a.(rmax) v then a.(k) <- v
```

Otherwise, we move `a.(rmax)` up and continue the descent of `v` recursively at the
position `rmax`.

```ocaml
      else begin a.(k) <- a.(rmax); move_down a rmax v n end
```

The sorting function takes an array `a` as argument:

```ocaml
  let heapsort a =
    let n = Array.length a in
```

We begin by constructing the heap bottom-up by calling `move_down`. We avoid
unnecessary calls for heaps reduced to single leaves by beginning the loop at ⌊⌋− 1.
(Indeed, for every strictly greater index `k`, we have `2k+1` ≥ `n`.)

```ocaml
    for k = n/2 - 1 downto 0 do move_down a k a.(k) n done;
```

Once the heap is fully constructed, we extract its elements one by one, in decreasing
order. As explained above, for each index `k`, we swap `a.(0)` with the value `v` in `a.(k)`
and then move `v` down to its place in the heap.

```ocaml
    for k = n-1 downto 1 do
      let v = a.(k) in a.(k) <- a.(0); move_down a 0 v k
    done
```

Note that the specification of `move_down` allows us to avoid assigning `v` to `a.(0)` before
beginning the descent. Program [97](#x28-294025r97) below contains the complete code.

>

##### Complexity

Let us first consider the cost of a call to `move_downakvn`. The number of recursive
calls is bounded by log `n` since the value of `k` is doubled at each call. Furthermore,
`move_down` performs at most two comparisons and an assignment in each call.
Thus, in the worst case, we have a total of 2log `n` comparisons and log `n`
assignments.

For the sorting itself, we can roughly bound the number C(N) of comparisons in
each call to `move_down` by 2log N, that is, at worst a total of 3N log N comparisons
(N log N comparisons for the first step and 2N log N for the second). Similarly, the
total number of assignments is, at worst, N log N.

In fact, we can be more precise and show that the first step of the algorithm,
namely, the construction of the heap, has linear cost. (See for example [[7](https://usr.lmf.cnrs.fr/lpo/mainli3.html#Xcormen), Sec. 7.3].)
It follows that only the second part of the algorithm contributes to the asymptotic
complexity so that C(N) ∼ 2N log N. For an analysis on average of heapsort, the
reader is referred to *The Art of Computer Programming* [[15](https://usr.lmf.cnrs.fr/lpo/mainli3.html#XKnuthV3), vol. 3, p. 152].

Note that heapsort executes in constant memory. Indeed, the function `move_down`
performs only tail-recursive calls and, moreover, all computations are performed
in-place inside the array `a`.

### 12.5 Optimal Complexity

We present here a quick proof of the fact that the optimal complexity of a sorting
algorithm that performs only element comparisons is in O(N log N).

We can visualize such an algorithm as a binary tree. Each internal node
symbolizes a comparison that has been performed, the left (resp. right) subtree
representing the rest of the algorithm when the test is positive (resp. negative). Each
 
 
leaf constitutes a possible result, that is, a permutation performed on the
initial sequence. If we assume N distinct elements, there are N! possible
permutations and, hence, at least N! leaves in this tree. Its height is consequently at
least log N!. Now the longest path from the root to a leaf corresponds to the
largest number of comparisons performed by the algorithm on an input.
There is, therefore, an input for which the number of comparisons is at least
log N!. By Stirling’s formula, we know that log N! ∼ N log N. For a more
detailed proof, the reader is referred to *The Art of Computer Programming* [[15](https://usr.lmf.cnrs.fr/lpo/mainli3.html#XKnuthV3),
Sec. 5.3].

### 12.6 Experimental Evaluation

In this section, we compare the different sorting algorithms presented in this chapter
empirically.

#### Evaluation Protocol

For a given list or array, we evaluate the performance of several algorithms on the
same input as follows. We execute each sorting algorithm five times, measuring the
computation time in each case. We exclude the smallest and the largest values, and
take the average of the three remaining values.

For lists, we consider randomly constructed as well as already sorted lists, with
lengths 2i × 1000 for i ranging from 0 to 10. For arrays, we consider randomly filled as
already sorted arrays, with lengths 2i × 1000 for i ranging from 0 to 12. It is
important to consider the case of data that is already sorted because that represents a
realistic situation for which we wish to verify that our sorting algorithms are
efficient.

#### Evaluation on Lists

We compare the algorithms listed in figure [12.7](#sorting-algorithms-on-lists). Figures [12.8](#comparison-of-sorting-algorithms-on-random-lists) and [12.9](#comparison-of-sorting-algorithms-on-already-sorted-lists) present the
results.

**Figure 12.7: Sorting algorithms on lists.**

| `insertion` | insertion sort of program [89](#x28-277013r89) |
| --- | --- |
| `quicksort` | quicksort of program [91](#x28-282020r91) |
| `quicksort (log stack)` | quicksort with the first call made to the smaller of
 the two lists after partitioning (see exercise [12.4](#x28-302001r4)) |
| `quicksort (rand)` | quicksort with a randomly chosen pivot (see
 exercise [12.5](#x28-302002r5)) |
| `mergesort` | merge sort of program [93](#x28-287023r93) |
| `mergesort (reuse)` | merge sort with optimization consisting in not
 constructing intermediate lists when partitioning
 (see exercise [12.10](#x28-303001r10)) |
| `List.sort` | the function `List.sort` of the OCaml standard
 library (version 3.11.2) |
| `heapsort (arrays)` | heapsort of program [96](#x28-292032r96), using the structure based
 on arrays presented in section [6.3](https://usr.lmf.cnrs.fr/lpo/mainch6.html#imperative-priority-queues) |
| `heapsort (trees)` | heapsort of program [96](#x28-292032r96), using the structure based
 on binary trees presented in section [6.4](https://usr.lmf.cnrs.fr/lpo/mainch6.html#persistent-priority-queues) |

For random lists (figure [12.8](#comparison-of-sorting-algorithms-on-random-lists)), we observe the following: Insertion sort
(`insertion`) can only be used in case of small lists, given its quadratic complexity.
(We do not give the computation time for lists longer than 16,000.) Two of the three
quicksort algorithms, (`quicksort` and `quicksort (rand)`) triggered a stack overflow
on lists of length 210. The algorithm `heapsort (trees)`, which uses binary trees, is
penalized due to the construction of the trees, even if its complexity is optimal. The
other sorting algorithms have comparable efficiency, the fastest being that of the
OCaml standard library.

![](/images/learn-ocaml/sorting-0-sorting-random-lists-.webp){#comparison-of-sorting-algorithms-on-random-lists}

**Figure 12.8: Comparison of sorting algorithms on random lists.**

![](/images/learn-ocaml/sorting-1-sorting-sorted-lists-.webp){#comparison-of-sorting-algorithms-on-already-sorted-lists}

**Figure 12.9: Comparison of sorting algorithms on already sorted lists.**

In case of already sorted lists (figure [12.9](#comparison-of-sorting-algorithms-on-already-sorted-lists)), we observe the following: Insertion sort
(`insertion`) has quadratic complexity. (The favorable case would have been
that of a list sorted in decreasing order.) The first two quicksort algorithms,
`quicksort` and `quicksort (log stack)`, have quadratic complexity, which is
explained by the arbitrary choice of the first element of the list as pivot. (We do
not give the computation time for lists of length greater than 16,000.) The
third quicksort algorithm, `quicksort (rand)`, behaves well but triggers a
stack overflow on lists of size 210 × 1000. The algorithm `heapsort (trees)`
remains penalized due to the construction of the trees, as in case of random
lists.

We may draw the following conclusions: Merge sort is the one that best combines
simplicity and efficiency. Even its simplest version has an efficiency comparable to the
optimized version of the OCaml standard library. Heapsort always performs well,
but its implementation is considerably more complex than that of merge
sort. Finally, we observe that using quicksort on lists is not straightforward
because we must, at a minimum, combine the optimizations of exercises [12.4](#x28-302001r4)
and [12.5](#x28-302002r5), to avoid both stack overflows and the unfavorable case of quadratic
complexity.

#### Evaluation on Arrays

We now compare the different techniques for sorting arrays of integers based
on algorithms listed in figure [12.10](#sorting-algorithms-on-arrays-of-integers). Figures [12.11](#comparison-of-sorting-on-random-arrays) and [12.12](#comparison-of-sorting-on-already-sorted-arrays) present the
results.

**Figure 12.10: Sorting algorithms on arrays of integers.**

| `insertion` | insertion sort of program [90](#x28-279016r90) |
| --- | --- |
| `quicksort` | quicksort of program [92](#x28-284024r92) |
| `quicksort (insertion)` | quicksort using an insertion sort on small
 segments (see exercise [12.7](#x28-302004r7)) |
| `quicksort (log stack)` | quicksort with the first call on the smallest of
 the two segments (see exercise [12.6](#x28-302003r6)) |
| `quicksort (rand)` | quicksort with a pivot chosen randomly (see
 exercise [12.8](#x28-302005r8)) |
| `mergesort` | merge sort of program [94](#x28-289025r94) |
| `merge sort (swap)` | merge sort with the optimization consisting
 in avoiding the use of `Array.blit` (see
 exercise [12.12](#x28-303003r12)) |
| `Array.stable_sort` | the function `Array.stable_sort` of the OCaml
 standard library (version 3.11.2) |
| `heapsort` | heapsort of program [97](#x28-294025r97) |
| `Array.sort` | heapsort of the OCaml standard library |

![](/images/learn-ocaml/sorting-2-sorting-random-arrays-.webp){#comparison-of-sorting-on-random-arrays}

**Figure 12.11: Comparison of sorting on random arrays.**

![](/images/learn-ocaml/sorting-3-sorting-sorted-arrays-.webp){#comparison-of-sorting-on-already-sorted-arrays}

**Figure 12.12: Comparison of sorting on already sorted arrays.**

For random arrays (figure [12.11](#comparison-of-sorting-on-random-arrays)), we observe the following: As in case of lists,
insertion sort can only be used for small arrays. The two heapsort algorithms,
`heapsort` and `Array.sort`, are slightly less efficient than merge sort and quicksort.
The two most efficient algorithms are both merge sorts.

For already sorted arrays (figure [12.12](#comparison-of-sorting-on-already-sorted-arrays)), we observe the following: Here, the first
three quicksort algorithms, `quicksort`, `quicksort (insertion)`, and `quicksort (log stack)`, are in their most unfavorable case, which may be explained by the
arbitrary choice of the left-most element as pivot. (We do not give the computation
time for arrays of length greater than 16,000.) The version of quicksort with
a randomly chosen pivot achieves a good efficiency, comparable to that of
`mergesort`.

Of all the sorting algorithms in O(N log N), heapsort is among the least efficient
while merge sort is among the most efficient. Here, insertion sort (`insertion`) is
the most efficient, since we are in the favorable case of linear complexity.
(The unfavorable case would have been that of an array sorted in decreasing
order.)

We may draw the following conclusions: If we are allowed to allocate an
intermediate array, in other words, to temporarily double memory use, then merge
sort is the best choice. As in case of lists, it combines simplicity and efficiency. If,
however, we wish to sort an array in-place, we must either use heapsort or quicksort,
taking care to combine it with the optimizations of exercises [12.6](#x28-302003r6) and [12.8](#x28-302005r8), to
avoid both stack overflows and quadratic behavior due to a bad choice of
pivot.

### 12.7 Exercises

**12.1**Write a function `two_way_sort:boolarray->unit` that sorts a boolean
array in-place, performing only swaps of elements, with the convention that
`false` < `true`. The complexity should be proportionate to the number of
 
 
elements.

**12.2**(Dijkstra’s Dutch national flag problem) Write a function that sorts an array
in-place. The array contains values representing the three colors of the Dutch flag,
namely:

```ocaml
  type color = Blue | White | Red
```

Only swaps of elements in the array may be performed. The complexity should be
proportionate to the number of elements.

**12.3**More generally, we consider the case of an array containing k distinct values.
To simplify matters, we assume that we are dealing with integers 0,…,k − 1. Write a
function that sorts such an array in O(max(k,N)) time, where N is the size of the
array.

#### Quicksort

**12.4**One way to avoid a potential stack overflow in the function `quicksort` on lists
is by first implementing a non-tail-recursive call to sort the smaller of the two lists,
followed by a tail-recursive call to sort the larger one. Hint: For the tail-recursive call,
generalize the function `quicksort` so that it takes as additional arguments the two
lists `left` and `right`, so that `quicksortleftlright` returns the concatenation, in this
order, of `left`, the sorted list `l`, and `right`. Show that the size of the stack remains
logarithmic even in the worst case.

**12.5**Modify the function `partition` on lists to use a randomly chosen element of
the list as pivot. The aim is to avoid the unfavorable case of a sorted list, where
quicksort would then have quadratic complexity.

**12.6**One way of avoiding a potential stack overflow in the function `quick_rec` on
arrays is to begin by performing the recursive call on the smaller of the two
portions. Show that the size of the stack remains logarithmic even in the worst
case.

**12.7**A classic idea to speed up sorting algorithms consists in switching to insertion
sort when the number of elements to be sorted is small, that is, less than a constant
fixed in advance (for example, 5). Modify the quicksort implementation on arrays
taking this idea into consideration. Use the function `insertion_sort` on arrays
(program [90](#x28-279016r90)) and generalize it by passing two indices, `l` and `r`, to delimit the portion
of the array to be sorted.

**12.8**Modify the quicksort implementation on arrays to use a pivot chosen randomly
in the segment `a`[`l`..`r`[. As with lists, the idea is to avoid the unfavorable case of an
already sorted array, where quicksort would then have quadratic complexity. One
simple solution is to shuffle the array *before*sorting it, for example using
exercise [2.11](https://usr.lmf.cnrs.fr/lpo/mainch2.html#x7-94006r11).

**12.9**When numerous elements of the array are equal, the preceding exercise does
not always suffice to guarantee a good choice of pivot. Modify the function `partition`
so that it separates the elements that are strictly smaller than the pivot (to
the left), those equal to the pivot (in the center), and those strictly greater
than the pivot (to the right). Instead of two indices `m` and `i` dividing the
segment of the array into three parts, as illustrated in figure **??**, we will
use three indices to divide the segment of the array into four parts. The
new function `partition` must now return two indices. Modify the function
`quick_rec` accordingly. Partitioning into three parts in this way is the subject of
exercise [12.2](#x28-301002r2).

#### Merge Sort

**12.10**One source of inefficiency of merge sort on lists is the function `split`. Given
a list `l` containing n elements, `splitl` constructs two completely new lists, `l1` and `l2`,
containing all the elements of `l`. We can avoid this construction by using only the list
`l`, without allocating any new lists. Rather than taking every other element of `l` to
construct `l1` and `l2`, we choose for `l1` the ⌊n∕2⌋ first elements of `l` and for `l2` the
⌈n∕2⌉ last elements. To construct `l2`, write a function `chop:int->’alist->’alist`
such that `chopn1l` returns the suffix of `l` obtained by removing its `n1` first elements.
As for `l1`, it suffices to represent it as a prefix of `l`, that is, to add an argument `n1` to
the function `mergesort`, indicating that the first `n1` elements of `l` must be sorted.
Rewrite the function `mergesort` using this idea. Reuse the function `merge` of
program [93](#x28-287023r93). Calculate the complexity in number of allocations of the function
`mergesort`.

**12.11**One way of optimizing the function `mergesort` on almost sorted arrays
is by avoiding the merging when, after both recursive calls, the elements
of the left half are all smaller than the elements of the right half. We can
easily test this by comparing the right-most element of the left half with the
left-most element of the right half. Modify the function `mergesort` using this
idea.

**12.12**To avoid copying `a` into `tmp` with `Array.blit` in the function `mergesort` on
arrays, one possibility is to sort the two halves of the array `a` while simultaneously
shifting them to the array `tmp`, then merging `tmp` back into `a` as is already done.
However, sorting the elements of `a` into `tmp` requires, conversely, that the two halves
be sorted in-place, then merged into `tmp`. We therefore need two mutually
recursive sorting functions. We can make do with only one by passing an
additional parameter indicating whether the sorting must be done in-place or
in `tmp`. Modify the functions `mergesort` and `mergesort_rec` following this
idea.

**12.13**In merge sort, as in quicksort, we can switch to insertion sort when the
 
 
number of elements to be sorted is small (see exercise [12.7](#x28-302004r7)).
