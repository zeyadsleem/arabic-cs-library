## 3.8. Association Lists[#](#association-lists)

A *map* is a data structure that maps *keys* to *values*. Maps are also known as *dictionaries*. One easy implementation of a map is an *association list*, which is a list of pairs. Here, for example, is an association list that maps some shape names to the number of sides they have:

```ocaml
let d = [("rectangle", 4); ("nonagon", 9); ("icosagon", 20)]
```

```text
val d : (string * int) list =
  [("rectangle", 4); ("nonagon", 9); ("icosagon", 20)]
```

Note that an association list isn’t so much a built-in data type in OCaml as a combination of two other types: lists and pairs.

Here are two functions that implement insertion and lookup in an association list:

```ocaml
(** [insert k v lst] is an association list that binds key [k] to value [v]
    and otherwise is the same as [lst] *)
let insert k v lst = (k, v) :: lst
(** [lookup k lst] is [Some v] if association list [lst] binds key [k] to
    value [v]; and is [None] if [lst] does not bind [k]. *)
let rec lookup k = function
| [] -> None
| (k', v) :: t -> if k = k' then Some v else lookup k t
```

```text
val insert : 'a -> 'b -> ('a * 'b) list -> ('a * 'b) list = <fun>
```

```text
val lookup : 'a -> ('a * 'b) list -> 'b option = <fun>
```

The `insert` function simply adds a new map from a key to a value at the front of the list. It doesn’t bother to check whether the key is already in the list. The `lookup` function looks through the list from left to right. So if there did happen to be multiple maps for a given key in the list, only the most recently inserted one would be returned.

Insertion in an association list is therefore constant time, and lookup is linear time. Although there are certainly more efficient implementations of dictionaries—and we’ll study some later in this course—association lists are a very easy and useful implementation for small dictionaries that aren’t performance critical. The OCaml standard library has functions for association lists in the [`List` module](https://ocaml.org/api/List.html); look for `List.assoc` and the functions below it in the documentation. What we just wrote as `lookup` is actually already defined as `List.assoc_opt`. There is no pre-defined `insert` function in the library because it’s so trivial just to cons a pair on.