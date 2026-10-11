---
title: "Queues"
lang: en
---

## 6. Queues

This chapter presents several data structures known as *queues*. A queue is a
data structure whose elements are taken out in the order in which they were
inserted, thus corresponding precisely to the usual notion of queue. We can also
associate elements with priorities, in which case the elements are no longer
taken out in the order in which they were inserted. This is called a *priority queue*.

### 6.1 Imperative Queues

This section presents a data structure of imperative queues based on linked
lists. The signature of this structure is given in program [57](#x20-201002r57) (see following
page).

>

The idea is as follows: If a queue `q` contains the elements 1, 2, 3, inserted in this
order, then it is represented by a circular linked list in which each element points to
the following one in the queue, and the last element points to the first. To be able to
insert and remove elements in constant time, it suffices to keep a pointer to the final
element of the queue, here, 3. We therefore have the following situation:

Thus, to insert a new element, 4, it suffices to insert it after 3, that is, between 3 and 1,
and to shift the pointer to 4.

We access the first element, here 1, by following the pointer contained in the final
element. To remove the first element, it suffices to make the final element
point to the second one, here 2, which is obtained by following two pointers.

We begin by introducing a type `’acell` to represent the cells of the linked list, in
the usual way.

```ocaml
  type ’a cell = { elt : ’a; mutable next : ’a cell }
```

We then represent a queue by a reference to the last cell. A problem arises when it
comes to representing the empty queue, for which we would not want to
have any list cells at all. We choose therefore to represent a queue with a
reference to a value of type `’acelloption`, where `None` represents the empty
queue.

```ocaml
  type ’a t = ((’a cell) option) ref
```

The implementation of the functions `create` and `is_empty` is clear.

```ocaml
  let create () =
    ref None
  let is_empty q =
    !q = None
```

#### Inserting an Element

Inserting an element `x` into a queue `q` follows the scheme mentioned above. If `q` is
empty, we create a circular list of one element and modify `q` so that it points to this
element. We use here the possibility afforded by OCaml of constructing a cyclic value
with `letrec`.

```ocaml
  let push x q = match !q with
    | None ->
        let rec c = { elt = x; next = c } in
        q := Some c
```

If `q` is not empty, we create a new cell `c` containing `x`, that we insert between
the final and first elements, and then modify `q` so that it points to this new
cell.

```ocaml
    | Some last ->
        let c = { elt = x; next = last.next } in
        last.next <- c;
        q := Some c
```

#### Extracting an Element

To extract the first element of a queue `q`, we begin by testing whether `q` is empty. In
this case, we raise an exception.

```ocaml
  let pop q = match !q with
    | None ->
        invalid_arg "pop"
```

When `q` is not empty, it is convenient to treat the case in which `q` contains only one
element separately. Here, the final element points to itself. It thus suffices to empty
the queue, giving it the value `None` and returning the only element that it
contained.

```ocaml
    | Some last when last.next == last ->
        q := None;
        last.elt
```

In the general case, when `q` contains at least two elements, we begin by determining the
first element of the queue, `first`. We then remove it from the linked list by making
the final element point to the second one. The value to be returned is contained in the
cell `first`.

```ocaml
    | Some last ->
        let first = last.next in
        last.next <- first.next;
        first.elt
```

The complete code is given in program [58](#x20-203014r58) (see following page).

>

#### Complexity

It is clear that the operations `create`, `is_empty`, `push`, and `pop` all execute in
constant time. A queue containing N elements occupies three words per element in
memory (being a record with two fields, `elt` and `next`), plus two words for the
reference.

>

### 6.2 Persistent Queues

In this section, we present a data structure of *persistent*queues. The signature of such
a structure is given in program [59](#x20-205010r59). We see, in particular, that the operations `push`
and `pop` return a modified version of the data structure.

A naive idea would consist in representing a queue by a list. This solution is
unfortunately very inefficient, because either the insertion or the extraction operation
would have to be performed at the end of the list. To implement these two
operations more efficiently, a simple idea consists in using not one but two lists.
The first list contains the elements at the front of the queue, in order. The
second list contains the elements at the back of the queue, in reverse order. In
this way, both insertion and extraction are done at the head of a list. For
 
 
example, the queue containing the elements 1, 2, 3, 4, 5, inserted in this order,
may be represented by the two lists `[1;2]` and `[5;4;3]`. However, the queue
could equally be represented by the two lists `[1]` and `[5;4;3;2]`, or even by
`[1;2;3;4;5]` and `[]`, which are all equivalent representations of the same
queue.

We therefore introduce the type of persistent queues simply as a synonym for a
pair of lists.

```ocaml
  type ’a t = ’a list * ’a list
```

The first list represents the front of the queue. The second represents the back of the
queue. The definitions of the empty queue `empty` and the function `is_empty` are
clear.

```ocaml
  let empty = [], []

  let is_empty = function
    | [], [] -> true
    | _ -> false
```

>

To insert an element `x`, it suffices to add it to the head of the second
list.

```ocaml
  let push x (o, i) =
    (o, x :: i)
```

Extraction is a more delicate operation. There are three possible cases. First, when
the queue is empty, we raise an exception.

```ocaml
  let pop = function
    | [], [] ->
        invalid_arg "pop"
```

Second, when the first list, which represents the front of the queue, contains at least one
element, it suffices to extract this element.

```ocaml
    | x :: o, i ->
        x, (o, i)
```

Third, when all the elements are in the back of the queue, it suffices to reverse the list `i`
and proceed as in the previous case, where the element to be extracted was
at the head of the list. The tail of the list thus obtained becomes the new
front of the queue, and the back of the new queue no longer contains any
elements.

```ocaml
    | [], i ->
        match List.rev i with
        | x :: o -> x, (o, [])
```

Since the list `i` is not empty, the list `List.revi` is also not empty. Rather than write a
non-exhaustive pattern matching, which would trigger a compiler warning, we
indicate explicitly that the case of an empty list cannot occur.

```ocaml
        | [] -> assert false
```

The complete code is given in program [60](#x20-205036r60).

>

#### Complexity

It is clear that the operations `is_empty` and `push` execute in constant time. The
operation `pop` can, however, have cost O(N) for a queue containing N elements. This
is the case when all the elements are at the back of the queue so that the list has to
be inverted. Nevertheless, if we consider a sequence of M successive `push` and `pop`
operations, starting from an empty queue, then the total cost cannot be greater than
O(M). Indeed, each element may be involved in, at most, one list reversal. The `pop`
operation therefore has amortized cost O(1). The space complexity is the
same as in case of imperative queues, with three words per element of the
queue.

### 6.3 Imperative Priority Queues

In this section and the next, we will consider queues in which the elements are
associated with priorities. In such queues, called *priority queues*, the elements
are removed in the order fixed by their priority rather than in the order in
which they were entered. We present here an *imperative*data structure of
priority queues, whose signature is given in program [61](#x20-207004r61) (see the following
page).

In this interface, the notion of minimality coincides with the notion of greatest
priority. Unlike with ordinary queues, here we distinguish the access and removal of
the first element using two separate operations. This is for the sake of efficiency, as
will be explained later. Accordingly, the function `get_min` returns the element of
the queue with the highest priority, and the function `remove_min` removes
it.

To implement an efficient priority queue, it is necessary to use a more complex
data structure than in case of ordinary queues. One solution consists in organizing the
elements as a *heap*. A heap is a binary tree in which the element stored at each node
has a higher priority than the two elements situated immediately below it. The
element with the highest priority is therefore found at the root. Thus, a heap
containing the elements {3,7,9,12,21}, ordered by magnitude, may have the following
shape:

We note that there are other heaps containing the same elements. However, for the
sake of efficiency, it is preferable to choose a heap of minimal height. Heaps
represented by complete binary trees (in which all levels are filled except, perhaps, the
last one) have minimal height. It turns out that a complete binary tree can
be easily represented using an array. The idea consists in numbering the
nodes of the tree from top to bottom and left to right, beginning from 0.
The result of this numbering of the heap above yields the following labeling:

This numbering permits the representation of the heap in an array of five elements as
follows:

In general, the root of the tree occupies the cell at index 0, and the roots of the two
subtrees of the node stored at cell i are stored in cells 2i + 1 and 2i + 2, respectively.
Conversely, the parent of node i is stored at ⌊(i − 1)∕2⌋.

>

One problem remains: We do not know the size of the priority queue
beforehand and therefore cannot fix in advance the maximum size of the array.
An elegant solution consists in using resizeable arrays. Such arrays were
presented in section [*4.1*](https://usr.lmf.cnrs.fr/lpo/mainch4.html#resizeable-arrays)*Resizeable Arrays*. It then suffices to write a functor
parametrized by a structure of resizeable arrays. A signature for such arrays,
`ResizeableArray`, is given in program [17](https://usr.lmf.cnrs.fr/lpo/mainch4.html#x15-133002r17), at the start of chapter [4](https://usr.lmf.cnrs.fr/lpo/mainch4.html#arrays1). As far as the
elements are concerned, we require a type equipped with a total order and a
default value. The corresponding signature, `OrderedWithDummy`, is given in
program [62](#x20-207027r62).

The functor of priority queues then takes the following form:

```ocaml
module Make(X: OrderedWithDummy)(A: ResizeableArray)
  : ImperativePriorityQueue with type elt = X.t =
struct
```

Module `X` is then that of elements, and module `A` that of resizeable arrays.

The types `elt` and `t` are respectively synonyms for `X.t` and `eltA.t`.

```ocaml
  type elt = X.t
  type t = elt A.t
```

In fact, a heap is nothing but a resizeable array. The function `create` constructs an
empty array with `A.make`, and the function `is_empty` tests whether the array is
empty.

```ocaml
  let create () = A.make 0 X.dummy
  let is_empty h = A.length h = 0
```

>

The function `get_min` returns the root of the heap, if it exists, and raises an
exception otherwise.

```ocaml
  let get_min h =
    if A.length h = 0 then invalid_arg "get_min";
    A.get h 0
```

The code is given in program [63](#x20-208020r63).

#### Inserting an Element

Inserting an element `x` in a heap `h` consists in adding `x` into the tree that represents `h`
while preserving the heap structure. One approach consists in adding `x` at the bottom
right and then moving it up the tree as long as is necessary. In our implementation,
this boils down to extending the array by one cell, inserting the value `x` there, and
then moving `x` up until it reaches the correct position. For this, we use the following
algorithm: if `x` is smaller than its parent, we exchange the two values and
repeat.

For example, let us consider again the following heap:

The insertion of the element 1 in this heap is performed in three steps:

We begin by writing a function `move_up` that inserts an element `x` in the heap `h`, starting
at position `i`. This function assumes that the tree of root `i`, obtained by placing `x` at
`i`, is a heap. The function `move_up` first considers the case in which `i` is 0, that
is, when we have reached the root. It then suffices to insert `x` at position
`i`.

```ocaml
  let rec move_up h x i =
    if i = 0 then
      A.set h i x
```

If, however, we are at an internal node, we calculate the index `fi` of the parent of `i` and
the value `y` stored in this node. If `y` is greater than `x`, we need to move `x` up while
moving `y` down to position `i`. We then call `move_up` recursively beginning from
`fi`.

```ocaml
    else
      let fi = (i - 1) / 2 in
      let y = A.get h fi in
      if X.compare y x > 0 then begin
        A.set h i y;
        move_up h x fi
      end
```

If, however, `y` is less than or equal to `x`, then `x` is at its final position, and it suffices to
store it there.

```ocaml
      else A.set h i x
```

The function `add` proceeds in two steps. It increases the size of the array by one
unit, adding a cell at the end of the array. Then it calls the function `move_up`,
beginning from this cell.

```ocaml
  let add x h =
    let n = A.length h in
    A.resize h (n + 1);
    move_up h x n
```

The code is given in program [63](#x20-208020r63) (see next page).

>

#### Removing the Smallest Element

Removing the smallest element of a heap is more delicate. The reason for this is that
we remove the root of the tree and must, therefore, find an element to replace it. The
idea consists in choosing the element at the bottom right of the heap, that
is, the element occupying the last cell of the array, placing it at the root,
and then moving it down the heap until it reaches its place. This is roughly
what we did when inserting an element, where we moved the new element
up.

Let us assume, for example, that we wish to remove the smallest element of the
following heap:

We replace the root, 1, by the element at the bottom right, 8. Then we make 8 move
down until it reaches its place. For this, we compare 8 with the roots a and b of the
two subtrees. If a and b are both greater than 8, the descent is complete.
Otherwise, we exchange 8 with the smaller of the two nodes a and b, and
continue the descent. In the example, 8 is successively exchanged with 4 and 5:

We begin by writing a function that compares two nodes, given by their indices `l`
and `r`, and returns the smaller of the two.

```ocaml
  let min h l r =
    if X.compare (A.get h r) (A.get h l) < 0 then r else l
```

Next, we write a function `smallest_node` that determines if a value `x`, situated
at node `i`, needs to move down the heap or not. The value `x` is not that
of the node `i` because we do not know yet if this will be its final position.
However, the function `smallest_node` acts as if the node `i` had the value `x`.
The function `smallest_node` accordingly takes as parameters the heap `h`,
the value `x`, and the index `i`. We begin by calculating the left child `l` of
node `i`.

```ocaml
  let smallest_node h x i =
    let l = 2 * i + 1 in
```

If the node `i` has no children, we return `i`.

```ocaml
    let n = A.length h in
    if l >= n then
      i
```

If, however, the node `l` is part of the heap, we determine the index `j` of the smallest child
of `i`. For this, it is convenient to determine if the right child `r=l+1` exists. If it does,
we compare the nodes `l` and `r` with the function `min`. Otherwise, the index `j` is equal
to `l`.

```ocaml
    else
      let r = l + 1 in
      let j = if r < n then min h l r else l in
```

Finally, we compare the value of the node `j` with that of `x`.

```ocaml
      if X.compare (A.get h j) x < 0 then j else i
```

Moving down the heap is implemented by a recursive function `move_down` that
takes as parameters the heap `h`, the value `x` that is moving down, and the index `i` of
 
 
the candidate node. We begin by calling the function `smallest_node` to calculate the
index `j` that should receive the value `x`.

```ocaml
  let rec move_down h x i =
    let j = smallest_node h x i in
```

If `j=i`, the descent is complete and it suffices to store the value `x` at index `i`.

```ocaml
    if j = i then
      A.set h i x
```

Otherwise, we move the value of the node `j` up to the node `i` and then continue moving
down from `j`.

```ocaml
    else begin
      A.set h i (A.get h j);
      move_down h x j
    end
```

The function for removing the smallest element of a heap `h` is then the following:

```ocaml
  let remove_min h =
    let n = A.length h - 1 in
    if n < 0 then invalid_arg "remove_min";
    let x = A.get h n in
    A.resize h n;
    if n > 0 then move_down h x 0
```

We consider three cases: If the heap is empty, we raise an exception. Next, if it contains
only one element, it is not necessary to call the function `move_down`. Finally, if the
heap contains more than one element, it is worthwhile to resize the array
with `A.resize`. The complete code is given in programs [63](#x20-208020r63) (see page [542](#x20-208020r63))
and [64](#x20-209035r64).

>

#### Complexity

It is clear that the functions `create`, `is_empty`, and `get_min` have constant cost. In
case of the functions `add` and `remove_min`, their cost is bounded by the height of the
heap. Indeed, in one case, we move from the leaves towards the root, and in the other,
we move from the root towards the leaves. Since the heap is a complete binary tree,
its height is logarithmic in the number of elements. For a priority queue containing N
elements, the functions `add` and `remove_min` therefore have cost O(log N). A simpler
way of looking at it consists in noting that the function `move_up` divides
its argument `i` by two at each recursive call. Therefore, it cannot be called
more than O(log N) times. Similarly, the function `move_down` multiplies its
argument by two at each recursive call and, therefore, cannot be called more than
O(log N) times. Of course, all of this applies only in an amortized manner by
virtue of the calls to `resize`, which are amortized O(1), as we showed in
chapter [4](https://usr.lmf.cnrs.fr/lpo/mainch4.html#arrays1).

The space complexity depends on the implementation of the resizeable array. If we
use the implementation presented at the start of chapter [4](https://usr.lmf.cnrs.fr/lpo/mainch4.html#arrays1), where the size of the
array was doubled when it had to be increased, the array contains at most two times
more elements than required. A priority queue containing N elements therefore
occupies at most 2N memory words.

### 6.4 Persistent Priority Queues

In this section, we present a data structure of *persistent*priority queues, whose
signature is given in program [65](#x20-211018r65).

As in the previous section, we use a heap data structure, except that here it is
directly represented by a binary tree. Unlike in case of AVL trees, no extra
 
 
information is stored in the nodes for the purposes of balancing. We will see later that
these heaps nevertheless have amortized logarithmic complexity. We say these trees
are *self-balancing*.

The functor of persistent priority queues therefore takes the following
form:

```ocaml
module Make(X: Ordered) :
  PersistentPriorityQueue with type elt = X.t =
struct
  type elt = X.t
```

The argument `X`, of type `Ordered`, defines the type of elements. These must be
equipped with a comparison function corresponding to the priority order (see
program [33](https://usr.lmf.cnrs.fr/lpo/mainch5.html#x16-156015r33) of chapter [5](https://usr.lmf.cnrs.fr/lpo/mainch5.html#sets-and-dictionaries) for the signature `Ordered`). The type `elt` of the elements
of the queue is thus a synonym for `X.t`. The type `t` is the type of binary
trees.

```ocaml
  type t = Empty | Node of t * elt * t
```

The definitions of the empty heap and the function `is_empty` are clear.

```ocaml
  let empty = Empty
  let is_empty h =
    h = Empty
```

The structure of the heap gives immediate access to the smallest element.

```ocaml
  let get_min = function
    | Empty -> invalid_arg "get_min"
    | Node (_, x, _) -> x
```

>

All the subtlety of this structure lies in the function `merge` that merges two
heaps. Assuming we have already written this function, it is easy to write the
functions `add` and `remove_min`. Indeed, the addition of an element `x` to a
heap `h` consists in merging the heap containing the single element `x` with
`h`.

```ocaml
  let add x h =
    merge (Node (Empty, x, Empty)) h
```

Similarly, the removal of the smallest element of a heap consists in merging the two child
heaps of the root.

```ocaml
  let remove_min = function
    | Empty -> invalid_arg "remove_min"
    | Node (a, _, b) -> merge a b
```

All we have to do now is write the function `merge` that merges two heaps `ha` and
`hb`. If one of the two heaps is empty, how to do so is clear.

```ocaml
  let rec merge ha hb = match ha, hb with
    | Empty, h | h, Empty ->
        h
```

If, however, none of the heaps is empty, we construct the resulting heap as follows. Its
root is the smallest of the two roots of `ha` and `hb`. Assume that the root of `ha` is
smaller.

```ocaml
    | Node (la, xa, ra), Node (lb, xb, rb) ->
        if X.compare xa xb <= 0 then
```

We must now determine the two subtrees of `Node(_,xa,_)`. There are several possibilities
that result from recursively calling `merge` on two of the three trees `la`, `ra`, and `hb`, and
from choosing the result as the left or right subtree. Among these possibilities, we
choose the one that performs a rotation of the subtrees from right to left, so as to
ensure self-balancing. Thus, `ra` takes the position of `la`, and `la` is merged with
`hb`.

```ocaml
          Node (ra, xa, merge la hb)
```

The other situation, in which the root of `hb` is smaller, is symmetrical.

```ocaml
        else Node (rb, xb, merge lb ha)
```

The complete code of persistent priority queues is given in program [66](#x20-211048r66).

>

#### Complexity

The functions `empty`, `is_empty`, and `get_min` clearly have constant cost. The analysis
is subtler in case of the function `merge`, and hence `add` and `remove_min`. In the worst
case, `merge` can have a cost as large as the total number of elements. However, for a
sequence of `add` and `remove_min` operations, executed successively on a heap, this
worst case cannot occur each time. We can show that the *amortized*cost of each
operation is, in fact, O(log N), where N is the number of elements in the heap. For an
analysis of this complexity, we refer the reader to the article by Sleator and Tarjan
introducing self-balancing heaps [[22](https://usr.lmf.cnrs.fr/lpo/mainli3.html#XSleatorTarjan1986heaps)] or the chapter on heaps by Okasaki in *The Fun of Programming* [[10](https://usr.lmf.cnrs.fr/lpo/mainli3.html#XGibbonsdeMoor2003)].

### 6.5 Exercises

#### Linked Lists

**6.1**Write a function `iter:(’a->unit)->’at->unit` that traverses the elements of a
queue in the order in which they were inserted.

**6.2**Write a function `transfer:’at->’at->unit` that takes two queues `q1` and `q2` as
arguments, moves all the elements of `q1` into `q2`, and empties the queue `q1`. Make
sure that this operation executes in constant time.

**6.3**Modify the queue structure of program [58](#x20-203014r58) to keep track of the total number of
elements throughout. You can make type `t` into a record with a mutable field
containing the number of elements of the queue.

#### Pairs of Lists

**6.4**Consider the case of a queue `q`, in which the list representing the front is empty.
If the operation `pop` is performed multiple times, then the reversal of the list `i`,
representing the back of the queue, will also be performed multiple times. To remedy
this, we can memoize the reversal of `i` in the original queue `q` by means of a side
effect. Accordingly, we adopt an equivalent representation of the queue `q` that is still
persistent. Modify the type `’at` as follows:

```ocaml
    type ’a t = { mutable o : ’a list; mutable i : ’a list }
```

Reimplement the operations on these queues. The mutable nature of the fields of this
type does not allow defining a polymorphic value `empty`. It suffices to replace it by a
function `create:unit->’at`.

**6.5**Note that the representation of queues as pairs of lists is symmetrical. We can
therefore perform insertion and removal operations from the two ends of the queue
with equal facility. We call the resulting structure a double-ended queue or *dequeue*.
We can name the four operations as follows:

```ocaml
    val push_front : ’a -> ’a t -> ’a t
    val push_back : ’a -> ’a t -> ’a t
    val pop_front : ’a t -> ’a * ’a t
    val pop_back : ’a t -> ’a * ’a t
```

The functions `push_back` and `pop_front` correspond to the functions `push` and `pop`
already written. Write the functions `push_front` and `pop_back`.

**6.6**The double-ended queues of the previous exercise may prove inefficient. Indeed,
alternating removals from the two ends of the queue can end up requiring many list
reversals. To remedy this, we can try to balance the lengths of the two lists, so as to
ensure a minimum proportion of elements at each end. For this, we let c ≥ 2 be a
constant and impose the following invariant on the lengths li and lo of the two
lists:

$$li \le c\times lo + 1 and lo \le c\times li + 1$$

Modify the type `’at` as follows, to keep track of the length of each list.

```ocaml
    type ’a t = { li : int; i : ’a list; lo : int; o : ’a list }
```

Reimplement the operations for double-ended queues. For more details concerning
this structure, and notably for its analysis, you can consult the book by
Okasaki [[19](https://usr.lmf.cnrs.fr/lpo/mainli3.html#Xokasaki98), sec. 8.4].

#### Heap Structures

**6.7**You can use the heap structure to easily implement an efficient sorting
algorithm, called *heapsort*. The idea is as follows: We insert all the elements to be
sorted in a heap, and then extract them successively with the functions `get_min` and
`remove_min`. Add a function `sort:X.tarray->unit` to the functor `Make` to sort an
array using this algorithm. If the complexity of the heap operations is logarithmic
(which is the case when you use resizeable arrays of constant amortized complexity),
then the complexity of this sorting algorithm is O(nlog n), that is, optimal. Heapsort
will be described in detail in chapter [12](https://usr.lmf.cnrs.fr/lpo/mainch12.html#sorting-algorithms).

**6.8**Several different elements of a heap can have the same priority. This is, for
example, the case when the elements are pairs for which the function `compare`
takes into account only one of the two components. Show that the order of
insertion in a priority queue is preserved, that is, that the elements of equal
priority are extracted from the queue in the same order in which they were
inserted.

**6.9**We wish to add an operation `remove` to remove an element from a priority
queue. Several problems arise. On the one hand, the same element may occur
several times in the queue. On the other, to implement the removal of an
element x efficiently, it is necessary to determine at which index it appears
without traversing the entire array, which is not possible with the current
structure.

We propose to resolve these two problems as follows. When an element is added
in the priority queue, we return a “pointer” to the user, that may be used
subsequently to remove this element. The signature is accordingly modified as
follows:

```ocaml
    type pointer
    val add: elt -> t -> pointer
```

Internally, the type `pointer` contains the index where the corresponding element of the
array is stored. This index is updated when the element is moved within the array. In
practice, it is simplest to also include the value of the element along with the
 
 
index:

```ocaml
    type pointer = { elt: elt; mutable index: int }
```

The resizeable array then contains values of type `pointer` rather than `elt`. Modify
the priority queue structure following this idea and provide a function
`remove:pointer->t->unit`. Hint: To remove the element situated at index i, replace
it with the final element of the resizeable array. It suffices then to re-establish the
heap property, by using either `move_up` or `move_down`. Show that the complexity of
`remove` is in O(log n).

**6.10**In the context of the above exercise, a value of type `pointer` may reference an
element that is no longer in the queue. A call to `remove` could therefore corrupt the
structure. Remedy this problem by invalidating all pointers corresponding to an
element that is no longer in the queue, so that the function `remove` is able to fail
cleanly.

**6.11**It can be interesting to have priority queues that provide an operation
`change_priority` to modify the priority of an existing element. Reusing the idea of
exercise [6.9](#x20-216005r9), provide the following new operation:

```ocaml
  val change_priority : pointer -> elt -> t -> unit
```

This operation modifies the value of an element already present in the queue. Show that
the complexity of `change_priority` is in O(log n).

**6.12**In certain cases, we may wish to distinguish the priority of an element from its
value. Modify the implementation of priority queues to give them the following
signature:

```ocaml
  module Make(P: Ordered)(V: WithDummy) :
  sig
    type t
    type priority = P.t
    type value = V.t
    val create : unit -> t
    val is_empty : t -> bool
    val add : priority -> value -> t -> unit
    val get_min : t -> priority * value
    val remove_min : t -> unit
  end
```

The type `P.t` is that of priorities and `V.t`, that of values. As the signatures indicate,
the first is equipped with a function `compare` and the second with a default
value.

#### Self-Balancing Heaps

**6.13**Redo exercise [6.7](#x20-216001r7) (heapsort) with self-balancing heaps. What is the
complexity of this sorting algorithm?

**6.14**Using a reference, wrap the code of program [66](#x20-211048r66) in a module with the
imperative signature of program [57](#x20-201002r57).
