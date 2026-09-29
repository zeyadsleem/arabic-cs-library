## 5.7. Module Type Constraints[#](#module-type-constraints)

We have extolled the virtues of encapsulation. Now we’re going to do something that might seem counter-intuitive: selectively violate encapsulation.

As a motivating example, here is a module type that represents values that support the usual addition and multiplication operations from arithmetic, or more precisely, a *[ring](https://en.wikipedia.org/wiki/Ring_(mathematics))*:

```ocaml
module type Ring = sig
  type t
  val zero : t
  val one : t
  val ( + ) : t -> t -> t
  val ( * ) : t -> t -> t
  val ( ~- ) : t -> t  (* additive inverse *)
  val to_string : t -> string
end
```

```text
module type Ring =
  sig
    type t
    val zero : t
    val one : t
    val ( + ) : t -> t -> t
    val ( * ) : t -> t -> t
    val ( ~- ) : t -> t
    val to_string : t -> string
  end
```

Recall that we must write `( * )` instead of `(*)` because the latter would be parsed as beginning a comment. And we write the `~` in `( ~- )` to indicate a *unary* operator.

This is a bit weird of an example. We don’t normally think of numbers as a data structure. But what is a data structure except for a set of values and operations on them? The `Ring` module type makes it clear that’s what we have.

Here is a module that implements that module type:

```ocaml
module IntRing : Ring = struct
  type t = int
  let zero = 0
  let one = 1
  let ( + ) = Stdlib.( + )
  let ( * ) = Stdlib.( * )
  let ( ~- ) = Stdlib.( ~- )
  let to_string = string_of_int
end
```

```text
module IntRing : Ring
```

Because `t` is abstract, the toplevel can’t give us good output about what the sum of one and one is:

```ocaml
IntRing.(one + one)
```

```text
- : IntRing.t = <abstr>
```

But we could convert it to a string:

```ocaml
IntRing.(one + one |> to_string)
```

```text
- : string = "2"
```

We could even install a pretty printer to avoid having to manually call `to_string`:

```ocaml
let pp_intring fmt i =
  Format.fprintf fmt "%s" (IntRing.to_string i);;
#install_printer pp_intring;;
IntRing.(one + one)
```

```text
val pp_intring : Format.formatter -> IntRing.t -> unit = <fun>
```

```text
- : IntRing.t = 2
```

We could implement other kinds of rings, too:

```ocaml
module FloatRing : Ring = struct
  type t = float
  let zero = 0.
  let one = 1.
  let ( + ) = Stdlib.( +. )
  let ( * ) = Stdlib.( *. )
  let ( ~- ) = Stdlib.( ~-. )
  let to_string = string_of_float
end
```

```text
module FloatRing : Ring
```

Then we’d have to install a printer for it, too:

```ocaml
let pp_floatring fmt f =
  Format.fprintf fmt "%s" (FloatRing.to_string f);;
#install_printer pp_floatring;;
FloatRing.(one + one)
```

```text
val pp_floatring : Format.formatter -> FloatRing.t -> unit = <fun>
```

```text
- : FloatRing.t = 2.
```

Was there really a need to make type `t` abstract in the ring examples above? Arguably not. And if it were not abstract, we wouldn’t have to go to the trouble of converting abstract values into strings, or installing printers. Let’s pursue that idea, next.

### 5.7.1. Specializing Module Types[#](#specializing-module-types)

In the past, we’ve seen that we can leave off the module type annotation, then do a separate check to make sure the structure satisfies the signature:

```ocaml
module IntRing = struct
  type t = int
  let zero = 0
  let one = 1
  let ( + ) = Stdlib.( + )
  let ( * ) = Stdlib.( * )
  let ( ~- ) = Stdlib.( ~- )
  let to_string = string_of_int
end
module _ : Ring = IntRing
```

```text
module IntRing :
  sig
    type t = int
    val zero : int
    val one : int
    val ( + ) : int -> int -> int
    val ( * ) : int -> int -> int
    val ( ~- ) : int -> int
    val to_string : int -> string
  end
```

```ocaml
IntRing.(one + one)
```

```text
- : int = 2
```

There’s a more sophisticated way of accomplishing the same goal. We can specialize the `Ring` module type to specify that `t` must be `int` or `float`. We do that by adding a *constraint* using the `with` keyword:

```ocaml
module type INT_RING = Ring with type t = int
```

```text
module type INT_RING =
  sig
    type t = int
    val zero : t
    val one : t
    val ( + ) : t -> t -> t
    val ( * ) : t -> t -> t
    val ( ~- ) : t -> t
    val to_string : t -> string
  end
```

Note how the `INT_RING` module type now specifies that `t` and `int` are the same type. It exposes or *shares* that fact with the world, so we could call these “sharing constraints.”

Now `IntRing` can be given that module type:

```ocaml
module IntRing : INT_RING = struct
  type t = int
  let zero = 0
  let one = 1
  let ( + ) = Stdlib.( + )
  let ( * ) = Stdlib.( * )
  let ( ~- ) = Stdlib.( ~- )
  let to_string = string_of_int
end
```

```text
module IntRing : INT_RING
```

And since the equality of `t` and `int` is exposed, the toplevel can print values of type `t` without any help needed from a pretty printer:

```ocaml
IntRing.(one + one)
```

```text
- : IntRing.t = 2
```

Programmers can even mix and match built-in `int` values with those provided by `IntRing`:

```ocaml
IntRing.(1 + one)
```

```text
- : IntRing.t = 2
```

The same can be done for floats:

```ocaml
module type FLOAT_RING = Ring with type t = float
module FloatRing : FLOAT_RING = struct
  type t = float
  let zero = 0.
  let one = 1.
  let ( + ) = Stdlib.( +. )
  let ( * ) = Stdlib.( *. )
  let ( ~- ) = Stdlib.( ~-. )
  let to_string = string_of_float
end
```

```text
module type FLOAT_RING =
  sig
    type t = float
    val zero : t
    val one : t
    val ( + ) : t -> t -> t
    val ( * ) : t -> t -> t
    val ( ~- ) : t -> t
    val to_string : t -> string
  end
```

```text
module FloatRing : FLOAT_RING
```

It turns out there’s no need to separately define `INT_RING` and `FLOAT_RING`. The `with` keyword can be used as part of the `module` definition, though the syntax becomes a little harder to read because of the proximity of the two `=` signs:

```ocaml
module FloatRing : Ring with type t = float = struct
  type t = float
  let zero = 0.
  let one = 1.
  let ( + ) = Stdlib.( +. )
  let ( * ) = Stdlib.( *. )
  let ( ~- ) = Stdlib.( ~-. )
  let to_string = string_of_float
end
```

```text
module FloatRing :
  sig
    type t = float
    val zero : t
    val one : t
    val ( + ) : t -> t -> t
    val ( * ) : t -> t -> t
    val ( ~- ) : t -> t
    val to_string : t -> string
  end
```

### 5.7.2. Constraints[#](#constraints)

**Syntax.**

There are two sorts of constraints. One is the sort we saw above, with `type` equations:

- `T with type x = t`, where `T` is a module type, `x` is a type name, and `t` is a type.

The other sort is a `module` equation, which is syntactic sugar for specifying the equality of *all* types in the two modules:

- `T with module M = N`, where `M` and `N` are module names.

Multiple constraints can be added with the `and` keyword:

- `T with constraint1 and constraint2 and ... constraintN`

**Static semantics.**

The constrained module type `T with type x = t` is the same as `T`, except that the declaration of `type x` inside `T` is replaced by `type x = t`. For example, compare the two signatures output below:

```ocaml
module type T = sig type t end
module type U = T with type t = int
```

```text
module type T = sig type t end
```

```text
module type U = sig type t = int end
```

Likewise, `T with module M = N` is the same as `T`, except that the any declaration `type x` inside the module type of `M` is replaced by `type x = N.x`. (And the same recursively for any nested modules.) It takes more work to give and understand this example:

```ocaml
module type XY = sig
  type x
  type y
end
module type T = sig
  module A : XY
end
module B = struct
  type x = int
  type y = float
end
module type U = T with module A = B
module C : U = struct
  module A = struct
    type x = int
    type y = float
    let x = 42
  end
end
```

```text
module type XY = sig type x type y end
```

```text
module type T = sig module A : XY end
```

```text
module B : sig type x = int type y = float end
```

```text
module type U = sig module A : sig type x = int type y = float end end
```

```text
module C : U
```

Focus on the output for module type `U`. Notice that the types of `x` and `y` in it have become `int` and `float` because of the `module A = B` constraint. Also notice how modules `B` and `C.A` are *not* the same module; the latter has an extra item `x` in it. So the syntax `module A = B` is potentially confusing. The constraint is not specifying that the two *modules* are the same. Rather, it specifies that all their *types* are constrained to be equal.

**Dynamic semantics.**

There are no dynamic semantics for constraints, because they are only for type checking.