---
title: "The Working Environment"
lang: en
---

## 1. The Working Environment

The OCaml language is available for use with the main operating systems (Linux,
macOS, Windows). It can be obtained at the following address:

`https://ocaml.org/`

The site contains installation instructions for these systems. Once you have installed
OCaml, you will have access to the following tools: an interpreter, `ocaml`; two
compilers, `ocamlc` and `ocamlopt`; and a package manager, `opam`. We briefly present
these four tools below.

### 1.1 The Compiler and the Interpreter

The OCaml system includes two compilers: `ocamlc` and `ocamlopt`. The first generates
portable code, independent of the hardware architecture; the second generates more
efficient native code (X86, ARM, etc.). You can use either of these two tools to
compile the programs given in this book. The system also includes an interactive
version, namely, the program `ocaml`. This is an interpreter or *toplevel*that executes a
read-eval-print loop (REPL).

### 1.2 A First OCaml Program

We illustrate the use of these tools with a simple program that displays the message
`Hello world!` on the screen. It can be written as follows:

```ocaml
  let () = print_string "Hello world!\n"
```

This is itself a complete program. We will go into the details of such programs in the next
chapter. If the program is stored in a file `hello.ml`, it can be compiled from within a
terminal[^1] 
using `ocamlc`, as follows:

```console
  > ocamlc hello.ml
```

We can then execute the resulting binary, `a.out`, with the expected result:

```text
  > ./a.out
  Hello world!
```

The binary can be given a different name using the compiler’s `-o` option:

```console
  > ocamlc -o hello hello.ml
  > ./hello
  Hello world!
```

To use the interpreter, it suffices to type the command `ocaml` in a terminal. The
program then displays a prompt in the form of the character `#`, prompting the user to
enter an expression.

```console
  > ocaml
  OCaml version 4.14.0
  #
```

To be evaluated, the expression must end with two semicolons `;;` followed by a
carriage return. The toplevel verifies that the expression is syntactically correct and
well-typed. It then evaluates the expression and displays the result. Thus,
in order to display the message `Hello world!` on the screen, it suffices to
type:

```console
  > ocaml
  OCaml version 4.14.0

  # let () = print_string "Hello world!\n";;
  Hello world!
  #
```

In addition to the result, the toplevel also displays the type inferred by
OCaml for the expression that has been entered. For example, if you enter
the mathematical expression 1 + 4 × 2, the interpreter returns the following
response:

```text
  # 1 + 4 * 2;;
  - : int = 9
  #
```

This shows that the expression is of type `int` (the type of integers), and that its result
is 9. From now on, we will present the expression entered by the user and the
interpreter’s response against a gray background. Thus, the evaluation of the
preceding expression will be presented, as follows:

```ocaml
  # 1 + 4 * 2 ;;
  - : int = 9
```

To exit the toplevel, type the command `#quit`, as follows:

```text
  # #quit;;
  >
```

A simpler way to do this is to press the keys `ctrl` and `D` simultaneously.

### 1.3 Programming Environments

As with many other programming languages, you can work with OCaml using your
preferred text editor (Emacs, Visual Studio Code, etc.). The text editor may be
configured with OCaml-specific syntax coloring, error highlighting, and so
forth.

In this text, we will use the tool `dune` to automate the compilation process. This
tool can be obtained via the `opam` package manager, and can be installed by typing
the following command in a terminal:

```text
  > opam install dune
```

Another solution is to use the tool `make`. This requires writing a configuration file
(`Makefile`) specific to OCaml.

#### Online Environments

There are also online solutions for using OCaml without installing it on your machine.
One example is the online interpreter TryOCaml, available at the following address:

`https://try.ocamlpro.com/`

Another example is the website

`https://replit.com/`

which offers online environments for a number of languages, among them OCaml.

### 1.4 Installing OCaml Libraries

The community of OCaml users has developed a number of OCaml libraries. The
easiest way to install them is to use the package manager `opam`. In the next chapter,
we will use a graphics library, which may be installed as follows:

```text
  > opam install graphics
```

We will explain later how to use this library and, more generally, any library installed
using `opam`.

[^3]: The program `seq` is a Unix tool that displays all the integers from 1 to n, one integer per
 line. It is the simplest way to obtain exactly n lines of text.
