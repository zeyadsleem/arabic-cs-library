## 5.3. Modules and the Toplevel[#](#modules-and-the-toplevel)

Note

The video below uses the legacy build system, ocamlbuild, rather than the new build system, dune. Some of the details change with dune, as described in the text below.

There are several pragmatics involving modules and the toplevel that are important to master to use the two together effectively.

### 5.3.1. Loading Compiled Modules[#](#loading-compiled-modules)

Compiling an OCaml file produces a module having the same name as the file, but with the first letter capitalized. These compiled modules can be loaded into the toplevel using `#load`.

For example, suppose you create a file called `mods.ml`, and put the following code in it:

```ocaml
let b = "bigred"
let inc x = x + 1
module M = struct
  let y = 42
end
```

Note that there is no `module Mods = struct ... end` around that. The code is at the topmost level of the file, as it were.

Then suppose you type `ocamlc mods.ml` to compile it. One of the newly-created files is `mods.cmo`: this is a compiled module object file, aka bytecode.

You can make this bytecode available for use in the toplevel with the following directives. Recall that the `#` character is required in front of a directive. It is not part of the prompt.

```ocaml
# #load "mods.cmo";;
```

That directive loads the bytecode found in `mods.cmo`, thus making a module named `Mods` available to be used. It is exactly as if you had entered this code:

```ocaml
module Mods = struct
  let b = "bigred"
  let inc x = x + 1
  module M = struct
    let y = 42
  end
end
```

```text
module Mods :
  sig val b : string val inc : int -> int module M : sig val y : int end end
```

Both of these expressions will therefore evaluate successfully:

```ocaml
Mods.b;;
Mods.M.y;;
```

```text
- : string = "bigred"
```

```text
- : int = 42
```

But this will fail:

```ocaml
inc
```

```text
File "[3]", line 1, characters 0-3:
1 | inc
    ^^^
Error: Unbound value inc
Hint: Did you mean incr?
```

It fails because `inc` is in the namespace of `Mods`.

```ocaml
Mods.inc
```

```text
- : int -> int = <fun>
```

Of course, if you open the module, you can directly name `inc`:

```ocaml
open Mods;;
inc;;
```

```text
- : int -> int = <fun>
```

### 5.3.2. Dune[#](#dune)

Dune provides a command to make it easier to start utop with libraries already loaded. Suppose we add this dune file to the same directory as `mods.ml`:

```text
(library
 (name mods))
```

That tells dune to build a library named `Mods` out of `mods.ml` (and any other files in the same directory, if they existed). Then we can run this command to launch utop with that library already loaded:

```console
$ dune utop
```

Now right away we can access components of `Mods` without having to issue a `#load` directive:

```ocaml
Mods.inc
```

```text
- : int -> int = <fun>
```

The `dune utop` command accepts a directory name as an argument if you want to load libraries in a particular subdirectory of your source code.

### 5.3.3. Initializing the Toplevel[#](#initializing-the-toplevel)

If you are doing a lot of testing of a particular module, it can be annoying to have to type directives every time you start utop. You really want to initialize the toplevel with some code as it launches, so that you don’t have to keep typing that code.

The solution is to create a file in the working directory and call that file `.ocamlinit`. Note that the `.` at the front of that filename is required and makes it a [hidden file](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory) that won’t appear in directory listings unless explicitly requested (e.g., with `ls -a`). Everything in `.ocamlinit` will be processed by utop when it loads.

For example, suppose you create a file named `.ocamlinit` in the same directory as `mods.ml`, and in that file put the following code:

```ocaml
open Mods;;
```

Now restart utop with `dune utop`. All the names defined in `Mods` will already be in scope. For example, these will both succeed:

```ocaml
inc;;
M.y;;
```

```text
- : int -> int = <fun>
```

```text
- : int = 42
```

### 5.3.4. Requiring Libraries[#](#requiring-libraries)

Suppose you wanted to experiment with some OUnit code in utop. You can’t actually open it:

```ocaml
open OUnit2;;
```

```text
File "[8]", line 1, characters 5-11:
1 | open OUnit2;;
         ^^^^^^
Error: Unbound module OUnit2
Hint: Did you mean Unit?
```

The problem is that the OUnit library hasn’t been loaded into utop yet. It can be with the following directive:

```ocaml
#require "ounit2";;
```

Now you can successfully open the module without getting an error:

```ocaml
open OUnit2;;
```

### 5.3.5. Load vs Use[#](#load-vs-use)

There is a big difference between `#load`-ing a compiled module file and `#use`-ing an uncompiled source file. The former loads bytecode and makes it available for use. For example, loading `mods.cmo` caused the `Mod` module to be available, and we could access its members with expressions like `Mod.b`. The latter (`#use`) is *textual inclusion*: it’s like typing the contents of the file directly into the toplevel. So using `mods.ml` does **not** cause a `Mod` module to be available, and the definitions in the file can be accessed directly, e.g., `b`.

For example, in the following interaction, we can directly refer to `b` but cannot use the qualified name `Mods.b`:

```text
# #use "mods.ml"

# b;;
val b : string = "bigred"

# Mods.b;;
Error: Unbound module Mods
```

Whereas in this interaction the situation is reversed:

```text
# #directory "_build";;
# #load "mods.cmo";;

# Mods.b;;
- : string = "bigred"

# b;;
Error: Unbound value b
```

So when you’re using the toplevel to experiment with your code, it’s often better to work with `#load` rather than `#use`. The `#load` directive accurately reflects how your modules interact with each other and with the outside world.