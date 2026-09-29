## 7.3. Implementing Promises[#](#implementing-promises)

Here is an interface for our own Lwt-style promises. The names have been changed to make the interface clearer.

```ocaml
(** A signature for Lwt-style promises, with better names. *)
module type PROMISE = sig
  type 'a state =
    | Pending
    | Fulfilled of 'a
    | Rejected of exn
  type 'a promise
  type 'a resolver
  (** [make ()] is a new promise and resolver. The promise is pending. *)
  val make : unit -> 'a promise * 'a resolver
  (** [return x] is a new promise that is already fulfilled with value
      [x]. *)
  val return : 'a -> 'a promise
  (** [state p] is the state of the promise. *)
  val state : 'a promise -> 'a state
  (** [fulfill r x] fulfills the promise [p] associated with [r] with
      value [x], meaning that [state p] will become [Fulfilled x].
      Requires: [p] is pending. *)
  val fulfill : 'a resolver -> 'a -> unit
  (** [reject r x] rejects the promise [p] associated with [r] with
      exception [x], meaning that [state p] will become [Rejected x].
      Requires: [p] is pending. *)
  val reject : 'a resolver -> exn -> unit
end
```

```text
module type PROMISE =
  sig
    type 'a state = Pending | Fulfilled of 'a | Rejected of exn
    type 'a promise
    type 'a resolver
    val make : unit -> 'a promise * 'a resolver
    val return : 'a -> 'a promise
    val state : 'a promise -> 'a state
    val fulfill : 'a resolver -> 'a -> unit
    val reject : 'a resolver -> exn -> unit
  end
```

To implement that interface, we can make the representation type of `'a promise` be a reference to a state:

```ocaml
type 'a state = Pending | Fulfilled of 'a | Rejected of exn
type 'a promise = 'a state ref
```

```text
type 'a state = Pending | Fulfilled of 'a | Rejected of exn
```

```text
type 'a promise = 'a state ref
```

That way it’s possible to mutate the contents of the promise.

For the representation type of the resolver, we’ll do something a little clever. It will simply be the same as a promise.

```ocaml
type 'a resolver = 'a promise
```

```text
type 'a resolver = 'a promise
```

So internally, the two types are exactly the same. But externally, no client of the `Promise` module will be able to distinguish them. In other words, we’re using the type system to control whether it’s possible to apply certain functions (e.g., `state` vs `fulfill`) to a promise.

To help implement the rest of the functions, let’s start by writing a helper function `write_once : 'a promise -> 'a state -> unit` to update the reference. This function will implement changing the state of the promise from pending to either fulfilled or rejected, and once the state has changed, it will not allow it to be changed again. That is, it enforces the “write once” invariant.

```ocaml
(** [write_once p s] changes the state of [p] to be [s].  If [p] and [s]
    are both pending, that has no effect.
    Raises: [Invalid_arg] if the state of [p] is not pending. *)
let write_once p s =
  if !p = Pending
  then p := s
  else invalid_arg "cannot write twice"
```

```text
val write_once : 'a state ref -> 'a state -> unit = <fun>
```

Using that helper, we can implement the `make` function:

```ocaml
let make () =
  let p = ref Pending in
  (p, p)
```

```text
val make : unit -> 'a state ref * 'a state ref = <fun>
```

The remaining functions in the interface are trivial to implement. Putting it altogether in a module, we have:

```ocaml
module Promise : PROMISE = struct
  type 'a state =
    | Pending
    | Fulfilled of 'a
    | Rejected of exn
  type 'a promise = 'a state ref
  type 'a resolver = 'a promise
  (** [write_once p s] changes the state of [p] to be [s]. If [p] and
      [s] are both pending, that has no effect. Raises: [Invalid_arg] if
      the state of [p] is not pending. *)
  let write_once p s =
    if !p = Pending then p := s else invalid_arg "cannot write twice"
  let make () =
    let p = ref Pending in
    (p, p)
  let return x = ref (Fulfilled x)
  let state p = !p
  let fulfill r x = write_once r (Fulfilled x)
  let reject r x = write_once r (Rejected x)
end
```

```text
module Promise : PROMISE
```

### 7.3.1. Lwt Promises[#](#lwt-promises)

The types and names used in Lwt are a bit more obscure than those we used above. Lwt uses analogical terminology that comes from threads—but since Lwt does not actually implement threads, that terminology is not necessarily helpful. (We don’t mean to demean Lwt! It is a library that has been developing and changing over time.)

The Lwt interface includes the following declarations, which we have annotated with comments to compare them to the interface we implemented above:

```ocaml
module type Lwt = sig
  (* [Sleep] means pending. [Return] means fulfilled.
     [Fail] means rejected. *)
  type 'a state = Sleep | Return of 'a | Fail of exn
  (* a [t] is a promise *)
  type 'a t
  (* a [u] is a resolver *)
  type 'a u
  val state : 'a t -> 'a state
  (* [wakeup_later] means [fulfill] *)
  val wakeup_later : 'a u -> 'a -> unit
  (* [wakeup_later_exn] means [reject] *)
  val wakeup_later_exn : 'a u -> exn -> unit
  (* [wait] means [make] *)
  val wait : unit -> 'a t * 'a u
  val return : 'a -> 'a t
end
```

```text
module type Lwt =
  sig
    type 'a state = Sleep | Return of 'a | Fail of exn
    type 'a t
    type 'a u
    val state : 'a t -> 'a state
    val wakeup_later : 'a u -> 'a -> unit
    val wakeup_later_exn : 'a u -> exn -> unit
    val wait : unit -> 'a t * 'a u
    val return : 'a -> 'a t
  end
```

Lwt’s implementation of that interface is much more complex than our own implementation above, because Lwt actually supports many more operations on promises. Nonetheless, the core ideas that we developed above provide sound intuition for what Lwt implements.

Here is some example Lwt code that you can try out in utop:

```ocaml
#require "lwt";;
```

```ocaml
let p, r = Lwt.wait();;
```

```text
val p : '_weak1 Lwt.t = <abstr>
val r : '_weak1 Lwt.u = <abstr>
```

To avoid those weak type variables, we can provide a further hint to OCaml as to what type we want to eventually put into the promise. For example, if we wanted to have a promise that will eventually contain an `int`, we could write this code:

```ocaml
let (p : int Lwt.t), r = Lwt.wait ()
```

```text
val p : int Lwt.t = <abstr>
val r : int Lwt.u = <abstr>
```

Now we can resolve the promise:

```ocaml
Lwt.state p
```

```text
- : int Lwt.state = Lwt.Sleep
```

```ocaml
Lwt.wakeup_later r 42
```

```text
- : unit = ()
```

```ocaml
Lwt.state p;;
```

```text
- : int Lwt.state = Lwt.Return 42
```

```ocaml
Lwt.wakeup_later r 42
```

```text
Exception: Invalid_argument "Lwt.wakeup_later".
Raised at Stdlib.invalid_arg in file "stdlib.ml", line 30, characters 20-45
Called from <unknown> in file "[15]", line 1, characters 0-21
Called from Topeval.load_lambda in file "toplevel/byte/topeval.ml", line 93, characters 4-14
```

That last exception was raised because we attempted to resolve the promise a second time, which is not permitted.

To reject a promise, we can write similar code:

```ocaml
let (p : int Lwt.t), r = Lwt.wait ();;
Lwt.wakeup_later_exn r (Failure "nope");;
Lwt.state p;;
```

```text
val p : int Lwt.t = <abstr>
val r : int Lwt.u = <abstr>
```

```text
- : unit = ()
```

```text
- : int Lwt.state = Lwt.Fail (Failure "nope")
```

Note that nothing we have implemented so far does anything concurrently. The promise abstraction by itself is not inherently concurrent. It’s just a data structure that can be written at most once, and that provides a means to control who can write to it (through the resolver).