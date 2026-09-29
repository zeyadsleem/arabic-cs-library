## 3.6. Type Synonyms[#](#type-synonyms)

A *type synonym* is a new name for an already existing type. For example, here are some type synonyms that might be useful in representing some types from linear algebra:

```ocaml
type point = float * float
type vector = float list
type matrix = float list list
```

```text
type point = float * float
```

```text
type vector = float list
```

```text
type matrix = float list list
```

Anywhere that a `float * float` is expected, you could use `point`, and vice-versa. The two are completely exchangeable for one another. In the following code, `get_x` doesn’t care whether you pass it a value that is annotated as one vs. the other:

```ocaml
let get_x = fun (x, _) -> x
let p1 : point = (1., 2.)
let p2 : float * float = (1., 3.)
let a = get_x p1
let b = get_x p2
```

```text
val get_x : 'a * 'b -> 'a = <fun>
```

```text
val p1 : point = (1., 2.)
```

```text
val p2 : float * float = (1., 3.)
```

```text
val a : float = 1.
```

```text
val b : float = 1.
```

Type synonyms are useful because they let us give descriptive names to complex types. They are a way of making code more self-documenting.