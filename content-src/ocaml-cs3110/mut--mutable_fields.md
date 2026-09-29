## 6.2. Mutable Fields[#](#mutable-fields)

The fields of a record can be declared as mutable, meaning their contents can be updated without constructing a new record. For example, here is a record type for two-dimensional colored points whose color field `c` is mutable:

```ocaml
type point = {x : int; y : int; mutable c : string}
```

```text
type point = { x : int; y : int; mutable c : string; }
```

Note that `mutable` is a property of the field, rather than the type of the field. In particular, we write `mutable field : type`, not `field : mutable type`.

The operator to update a mutable field is `<-` which is meant to look like a left arrow.

```ocaml
let p = {x = 0; y = 0; c = "red"}
```

```text
val p : point = {x = 0; y = 0; c = "red"}
```

```ocaml
p.c <- "white"
```

```text
- : unit = ()
```

```ocaml
p
```

```text
- : point = {x = 0; y = 0; c = "white"}
```

Non-mutable fields cannot be updated that way:

```ocaml
p.x <- 3;;
```

```text
File "[5]", line 1, characters 0-8:
1 | p.x <- 3;;
    ^^^^^^^^
Error: The record field x is not mutable
```

- **Syntax:** `e1.f
- **Dynamic semantics:** To evaluate `e1.f
- **Static semantics:** `e1.f

### 6.2.1. Refs Are Mutable Fields[#](#refs-are-mutable-fields)

It turns out that refs are actually implemented as mutable fields. In [`Stdlib`](https://ocaml.org/api/Stdlib.html) we find the following declaration:

```ocaml
type 'a ref = { mutable contents : 'a }
```

And that’s why when the toplevel outputs a ref it looks like a record: it *is* a record with a single mutable field named `contents`!

```ocaml
let r = ref 42
```

```text
val r : int ref = {contents = 42}
```

The other syntax we’ve seen for refs is in fact equivalent to simple OCaml functions:

```ocaml
let ref x = {contents = x}
```

```text
val ref : 'a -> 'a ref = <fun>
```

```ocaml
let ( ! ) r = r.contents
```

```text
val ( ! ) : 'a ref -> 'a = <fun>
```

```ocaml
let ( := ) r x = r.contents <- x
```

```text
val ( := ) : 'a ref -> 'a -> unit = <fun>
```

The reason we say “equivalent” is that those functions are actually implemented not in OCaml itself but in the OCaml run-time, which is implemented mostly in C. Nonetheless the functions do behave the same as the OCaml source given above.

### 6.2.2. Example: Mutable Singly-Linked Lists[#](#example-mutable-singly-linked-lists)

Using mutable fields, we can implement singly-linked lists almost the same as we did with references. The types for nodes and lists are simplified:

```ocaml
(** An ['a node] is a node of a mutable singly-linked list. It contains a value
    of type ['a] and optionally has a pointer to the next node. *)
type 'a node = {
  mutable next : 'a node option;
  value : 'a
}
(** An ['a mlist] is a mutable singly-linked list with elements of type ['a].
    RI: The list does not contain any cycles. *)
type 'a mlist = {
  mutable first : 'a node option;
}
```

```text
type 'a node = { mutable next : 'a node option; value : 'a; }
```

```text
type 'a mlist = { mutable first : 'a node option; }
```

And there is no essential difference in the algorithms for implementing the operations, but the code is slightly simplified because we don’t have to use reference operations:

```ocaml
(** [insert_first lst n] mutates mlist [lst] by inserting value [v] as the
    first value in the list. *)
let insert_first (lst : 'a mlist) (v : 'a) =
  lst.first <- Some {value = v; next = lst.first}
(** [empty ()] is an empty singly-linked list. *)
let empty () : 'a mlist = {
  first = None
}
(** [to_list lst] is an OCaml list containing the same values as [lst]
    in the same order. Not tail recursive. *)
let to_list (lst : 'a mlist) : 'a list =
  let rec helper = function
    | None -> []
    | Some {next; value} -> value :: helper next
  in
  helper lst.first
```

```text
val insert_first : 'a mlist -> 'a -> unit = <fun>
```

```text
val empty : unit -> 'a mlist = <fun>
```

```text
val to_list : 'a mlist -> 'a list = <fun>
```

### 6.2.3. Example: Mutable Stacks[#](#example-mutable-stacks)

We already know that lists and stacks can be implemented in quite similar ways. Let’s use what we’ve learned from mutable linked lists to implement mutable stacks. Here is an interface:

```ocaml
module type MutableStack = sig
  (** ['a t] is the type of mutable stacks whose elements have type ['a].
      The stack is mutable not in the sense that its elements can
      be changed, but in the sense that it is not persistent:
      the operations [push] and [pop] destructively modify the stack. *)
  type 'a t
  (** Raised if [peek] or [pop] encounter the empty stack. *)
  exception Empty
  (** [empty ()] is the empty stack. *)
  val empty : unit -> 'a t
  (** [push x s] modifies [s] to make [x] its top element.
      The rest of the elements are unchanged. *)
  val push : 'a -> 'a t -> unit
  (** [peek s] is the top element of [s].
      Raises: [Empty] if [s] is empty. *)
  val peek : 'a t -> 'a
  (** [pop s] removes the top element of [s].
      Raises: [Empty] if [s] is empty. *)
  val pop : 'a t -> unit
end
```

```text
module type MutableStack =
  sig
    type 'a t
    exception Empty
    val empty : unit -> 'a t
    val push : 'a -> 'a t -> unit
    val peek : 'a t -> 'a
    val pop : 'a t -> unit
  end
```

Now let’s implement the mutable stack with a mutable linked list.

```ocaml
module MutableRecordStack : MutableStack = struct
  (** An ['a node] is a node of a mutable linked list.  It has
     a field [value] that contains the node's value, and
     a mutable field [next] that is [None] if the node has
     no successor, or [Some n] if the successor is [n]. *)
  type 'a node = {value : 'a; mutable next : 'a node option}
 (** AF: An ['a t] is a stack represented by a mutable linked list.
     The mutable field [top] is the first node of the list,
     which is the top of the stack. The empty stack is represented
     by {top = None}.  The node {top = Some n} represents the
     stack whose top is [n], and whose remaining elements are
     the successors of [n]. *)
  type 'a t = {mutable top : 'a node option}
  exception Empty
  let empty () = {top = None}
  let push x s = s.top <- Some {value = x; next = s.top}
  let peek s =
    match s.top with
    | None -> raise Empty
    | Some {value} -> value
  let pop s =
    match s.top with
    | None -> raise Empty
    | Some {next} -> s.top <- next
end
```

```text
module MutableRecordStack : MutableStack
```