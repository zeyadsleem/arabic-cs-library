---
title: "1.1. Getting Started Programming in C"
lang: en
---

Let’s start by looking at a "hello world" program that includes an example of calling a function from the math library. In [Table 1](#TabPythonC) we compare the C version of this program to the Python version. The C version might be put in a file named `hello.c` (`.c` is the suffix convention for C source code files), whereas the Python version might be in a file named `hello.py`.

**Table 1. Syntax Comparison of a Small Program in Python and C. Both the [C version](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.c) and [Python version](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.py) are available for download.**

**Python version ([hello.py](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.py))**

```python
'''
    The Hello World Program in Python
'''

# Python math library
from math import *

# main function definition:
def main():
    # statements on their own line
    print("Hello World")
    print("sqrt(4) is %f" % (sqrt(4)))

# call the main function:
main()
```

**C version ([hello.c](https://diveintosystems.org/book/C1-C_intro/_attachments/hello.c))**

```c
/*
    The Hello World Program in C
 */

/* C math and I/O libraries */
#include <math.h>
#include <stdio.h>

/* main function definition: */
int main(void) {
    // statements end in a semicolon (;)
    printf("Hello World\n");
    printf("sqrt(4) is %f\n", sqrt(4));

    return 0;  // main returns value 0
}
```

Notice that both versions of this program have similar structure and language constructs, albeit with different language syntax. In particular:

**Comments:**

- In Python, multiline comments begin and end with `'''`, and single-line comments begin with `#`.
- In C, multiline comments begin with `/*` and end with `*/`, and single-line comments begin with `//`.

**Importing library code:**

- In Python, libraries are included (imported) using `import`.
- In C, libraries are included (imported) using `#include`. All `#include` statements appear at the top of the program, outside of function bodies.

**Blocks:**

- In Python, indentation denotes a block.
- In C, blocks (for example, function, loop, and conditional bodies) start with `{` and end with `}`.

**The main function:**

- In Python, `def main():` defines the main function.
- In C, `int main(void){ }` defines the main function. The `main` function returns a value of type `int`, which is C’s name for specifying the signed integer type (signed integers are values like -3, 0, 1234). The `main` function returns the `int` value 0 to signify running to completion without error. The `void` means it doesn’t expect to receive a parameter. Future sections show how `main` can take parameters to receive command line arguments.

**Statements:**

- In Python, each statement is on a separate line.
- In C, each statement ends with a semicolon `;`. In C, statements must be within the body of some function (in `main` in this example).

**Output:**

- In Python, the `print` function prints a formatted string. Values for the placeholders in the format string follow a `%` symbol in a comma-separated list of values (for example, the value of `sqrt(4)` will be printed in place of the `%f` placeholder in the format string).
- In C, the `printf` function prints a formatted string. Values for the placeholders in the format string are additional arguments separated by commas (for example, the value of `sqrt(4)` will be printed in place of the `%f` placeholder in the format string).

There are a few important differences to note in the C and Python versions of this program:

**Indentation:** In C, indentation doesn’t have meaning, but it’s good programming style to indent statements based on the nested level of their containing block.

**Output:** C’s `printf` function doesn’t automatically print a newline character at the end like Python’s `print` function does. As a result, C programmers need to explicitly specify a newline character (`\n`) in the format string when a newline is desired in the output.

**`main` function:**

- A C program must have a function named `main`, and its return type must be `int`. This means that the `main` function returns a signed integer type value. Python programs don’t need to name their main function `main`, but they often do by convention.
- The C `main` function has an explicit `return` statement to return an `int` value (by convention, `main` should return `0` if the main function is successfully executed without errors).
- A Python program needs to include an explicit call to its `main` function to run it when the program executes. In C, its `main` function is automatically called when the C program executes.

### [](#_compiling_and_running_c_programs)1.1.1. Compiling and Running C Programs

Python is an interpreted programming language, which means that another program, the Python interpreter, runs Python programs: the Python interpreter acts like a virtual machine on which Python programs are run. To run a Python program, the program source code (`hello.py`) is given as input to the Python interpreter program that runs it. For example (`$` is the Linux shell prompt):

```bash
$ python hello.py
```

The Python interpreter is a program that is in a form that can be run directly on the underlying system (this form is called **binary executable**) and takes as input the Python program that it runs ([Figure 1](#FigPythonExecution)).

![Interpreted execution of a Python program.](/images/dive-into-systems/c1-intro-0-interpreted.webp) Figure 1. A Python program is directly executed by the Python interpreter, which is a binary executable program that is run on the underlying system (OS and hardware)

To run a C program, it must first be translated into a form that a computer system can directly execute. A C **compiler** is a program that translates C source code into a **binary executable** form that the computer hardware can directly execute. A binary executable consists of a series of 0’s and 1’s in a well-defined format that a computer can run.

For example, to run the C program `hello.c` on a Unix system, the C code must first be compiled by a C compiler (for example, the [GNU C compiler](https://gcc.gnu.org), GCC) that produces a binary executable (by default named `a.out`). The binary executable version of the program can then be run directly on the system ([Figure 2](#FigCCompilation)):

```bash
$ gcc hello.c
$ ./a.out
```

(Note that some C compilers might need to be explicitly told to link in the math library: `-lm`):

```bash
$ gcc hello.c -lm
```

![C program text goes to the C compiler, which converts it into an executable sequence of zeroes and ones. The format of the executable sequence can be run by the underlying system.](/images/dive-into-systems/c1-intro-1-compile.webp) Figure 2. The C compiler (gcc) builds C source code into a binary executable file (a.out). The underlying system (OS and hardware) directly executes the a.out file to run the program.

#### [](#_detailed_steps)Detailed Steps

In general, the following sequence describes the necessary steps for editing, compiling, and running a C program on a Unix system:

Using a [text editor](https://www.cs.swarthmore.edu/help/editors.html) (for example, `vim`), write and save your C source code program in a file (e.g., `hello.c`):

```bash
$ vim hello.c
```

Compile the source to an executable form, and then run it. The most basic syntax for compiling with `gcc` is:

```bash
$ gcc <input_source_file>
```

If compilation yields no errors, the compiler creates a binary executable file named `a.out`. The compiler also allows you to specify the name of the binary executable file to generate using the `-o` flag:

```bash
$ gcc -o <output_executable_file> <input_source_file>
```

For example, this command instructs `gcc` to compile `hello.c` into an executable file named `hello`:

```bash
$ gcc -o hello hello.c
```

We can invoke the executable program using `./hello`:

```bash
$ ./hello
```

Any changes made to the C source code (the `hello.c` file) must be recompiled with `gcc` to produce a new version of `hello`. If the compiler detects any errors during compilation, the `./hello` file won’t be created/re-created (but beware, an older version of the file from a previous successful compilation might still exist).

Often when compiling with `gcc`, you want to include several command line options. For example, these options enable more compiler warnings and build a binary executable with extra debugging information:

```bash
$ gcc -Wall -g -o hello hello.c
```

Because the `gcc` command line can be long, frequently the `make` utility is used to simplify compiling C programs and for cleaning up files created by `gcc`. [Using make and writing Makefiles](https://www.cs.swarthmore.edu/~newhall/unixhelp/howto_makefiles.html) are important skills that you will develop as you build up experience with C programming.

We cover compiling and linking with C library code in more detail at the end of [Chapter 2](https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_compilation_steps_).

### [](#_variables_and_c_numeric_types)1.1.2. Variables and C Numeric Types

Like Python, C uses variables as named storage locations for holding data. Thinking about the **scope** and **type** of program variables is important to understand the semantics of what your program will do when you run it. A variable’s **scope** defines when the variable has meaning (that is, where and when in your program it can be used) and its lifetime (that is, it could persist for the entire run of a program or only during a function activation). A variable’s **type** defines the range of values that it can represent and how those values will be interpreted when performing operations on its data.

In C, all variables must be declared before they can be used. To declare a variable, use the following syntax:

```
type_name variable_name;
```

A variable can have only a single **type**. The basic C types include `char`, `int`, `float`, and `double`. By convention, C variables should be declared at the beginning of their scope (at the top of a `{ }` block), before any C statements in that scope.

Below is an example C code snippet that shows declarations and uses of variables of some different types. We discuss types and operators in more detail after the example.

vars.c

```c
{
    /* 1. Define variables in this block's scope at the top of the block. */

    int x; // declares x to be an int type variable and allocates space for it

    int i, j, k;  // can define multiple variables of the same type like this

    char letter;  // a char stores a single-byte integer value
                  // it is often used to store a single ASCII character
                  // value (the ASCII numeric encoding of a character)
                  // a char in C is a different type than a string in C

    float winpct; // winpct is declared to be a float type
    double pi;    // the double type is more precise than float

    /* 2. After defining all variables, you can use them in C statements. */

    x = 7;        // x stores 7 (initialize variables before using their value)
    k = x + 2;    // use x's value in an expression

    letter = 'A';        // a single quote is used for single character value
    letter = letter + 1; // letter stores 'B' (ASCII value one more than 'A')

    pi = 3.1415926;

    winpct = 11 / 2.0; // winpct gets 5.5, winpct is a float type
    j = 11 / 2;        // j gets 5: int division truncates after the decimal
    x = k % 2;         // % is C's mod operator, so x gets 9 mod 2 (1)
}
```

Note the semicolons galore. Recall that C statements are delineated by `;`, not line breaks — C expects a semicolon after every statement. You’ll forget some, and `gcc` almost never informs you that you missed a semicolon, even though that might be the only syntax error in your program. In fact, often when you forget a semicolon, the compiler indicates a syntax error on the line *after* the one with the missing semicolon: the reason is that `gcc` interprets it as part of the statement from the previous line. As you continue to program in C, you’ll learn to correlate `gcc` errors with the specific C syntax mistakes that they describe.

### [](#_c_types)1.1.3. C Types

C supports a small set of built-in data types, and it provides a few ways in which programmers can construct basic collections of types (arrays and structs). From these basic building blocks, a C programmer can build complex data structures.

C defines a set of basic types for storing numeric values. Here are some examples of numeric literal values of different C types:

```c
8     // the int value 8
3.4   // the double value 3.4
'h'   // the char value 'h' (its value is 104, the ASCII value of h)
```

The C `char` type stores a numeric value. However, it’s often used by programmers to store the value of an ASCII character. A character literal value is specified in C as a single character between single quotes.

C doesn’t support a string type, but programmers can create strings from the `char` type and C’s support for constructing arrays of values, which we discuss in later sections. C does, however, support a way of expressing string literal values in programs: a string literal is any sequence of characters between double quotes. C programmers often pass string literals as the format string argument to `printf`:

```c
printf("this is a C string\n");
```

Python supports strings, but it doesn’t have a `char` type. In C, a string and a `char` are two very different types, and they evaluate differently. This difference is illustrated by contrasting a C string literal that contains one character with a C `char` literal. For example:

```c
'h'  // this is a char literal value   (its value is 104, the ASCII value of h)
"h"  // this is a string literal value (its value is NOT 104, it is not a char)
```

We discuss C strings and `char` variables in more detail in the [Strings](https://diveintosystems.org/book/C2-C_depth/strings.html#_strings_and_the_string_library) section later in this chapter. Here, we’ll mainly focus on C’s numeric types.

#### [](#_c_numeric_types)C Numeric Types

C supports several different types for storing numeric values. The types differ in the format of the numeric values they represent. For example, the `float` and `double` types can represent real values, `int` represents signed integer values, and `unsigned int` represents unsigned integer values. Real values are positive or negative values with a decimal point, such as `-1.23` or `0.0056`. Signed integers store positive, negative, or zero integer values, such as `-333`, `0`, or `3456`. Unsigned integers store strictly nonnegative integer values, such as `0` or `1234`.

C’s numeric types also differ in the range and precision of the values they can represent. The range or precision of a value depends on the number of bytes associated with its type. Types with more bytes can represent a larger range of values (for integer types), or higher-precision values (for real types), than types with fewer bytes.

[Table 2](#TabNumericTypes) shows the number of storage bytes, the kind of numeric values stored, and how to declare a variable for a variety of common C numeric types (note that these are typical sizes — the exact number of bytes depends on the hardware architecture).

| Type name | Usual size | Values stored | How to declare |
| --- | --- | --- | --- |
| `char` | 1 byte | integers | `char x;` |
| `short` | 2 bytes | signed integers | `short x;` |
| `int` | 4 bytes | signed integers | `int x;` |
| `long` | 4 or 8 bytes | signed integers | `long x;` |
| `long long` | 8 bytes | signed integers | `long long x;` |
| `float` | 4 bytes | signed real numbers | `float x;` |
| `double` | 8 bytes | signed real numbers | `double x;` |

C also provides *unsigned* versions of the integer numeric types (`char`, `short`, `int`, `long`, and `long long`). To declare a variable as unsigned, add the keyword `unsigned` before the type name. For example:

```c
int x;           // x is a signed int variable
unsigned int y;  // y is an unsigned int variable
```

The C standard doesn’t specify whether the `char` type is signed or unsigned. As a result, some implementations might implement `char` as signed integer values and others as unsigned. It’s good programming practice to explicitly declare `unsigned char` if you want to use the unsigned version of a `char` variable.

The exact number of bytes for each of the C types might vary from one architecture to the next. The sizes in [Table 2](#TabNumericTypes) are minimum (and common) sizes for each type. You can print the exact size on a given machine using C’s `sizeof` operator, which takes the name of a type as an argument and evaluates to the number of bytes used to store that type. For example:

```c
printf("number of bytes in an int: %lu\n", sizeof(int));
printf("number of bytes in a short: %lu\n", sizeof(short));
```

The `sizeof` operator evaluates to an unsigned long value, so in the call to `printf`, use the placeholder `%lu` to print its value. On most architectures the output of these statements will be:

```
number of bytes in an int: 4
number of bytes in a short: 2
```

#### [](#_arithmetic_operators)Arithmetic Operators

Arithmetic operators combine values of numeric types. The resulting type of the operation is based on the types of the operands. For example, if two `int` values are combined with an arithmetic operator, the resulting type is also an integer.

C performs automatic type conversion when an operator combines operands of two different types. For example, if an `int` operand is combined with a `float` operand, the integer operand is first converted to its floating-point equivalent before the operator is applied, and the type of the operation’s result is `float`.

The following arithmetic operators can be used on most numeric type operands:

add (`+`) and subtract (`-`)

multiply (`*`), divide (`/`), and mod (`%`):

The mod operator (`%`) can only take integer-type operands (`int`, `unsigned int`, `short`, and so on).

If both operands are `int` types, the divide operator (`/`) performs integer division (the resulting value is an `int`, truncating anything beyond the decimal point from the division operation). For example `8/3` evaluates to `2`.

If one or both of the operands are `float` (or `double`), `/` performs real division and evaluates to a `float` (or `double`) result. For example, `8 / 3.0` evaluates to approximately `2.666667`.

assignment (`=`):

```
variable = value of expression;  // e.g., x = 3 + 4;
```

assignment with update (`+=`, `-=`, `*=`, `/=`, and `%=`):

```
variable op= expression;  // e.g., x += 3; is shorthand for x = x + 3;
```

increment (`++`) and decrement (`--`):

```
variable++;  // e.g., x++; assigns to x the value of x + 1
```

**Warning — Pre- vs. Post-increment**

> The operators `++variable` and `variable++` are both valid, but they’re evaluated slightly differently:
>
> - `++x`: increment `x` first, then use its value.
> - `x++`: use `x’s value first, then increment it.
>
> In many cases, it doesn’t matter which you use because the value of the incremented or decremented variable isn’t being used in the statement. For example, these two statements are equivalent (although the first is the most commonly used syntax for this statement):
>
> ```c
> x++;
> ++x;
> ```
>
> In some cases, the context affects the outcome (when the value of the incremented or decremented variable *is* being used in the statement). For example:
>
> ```c
> x = 6;
> y = ++x + 2;  // y is assigned 9: increment x first, then evaluate x + 2 (9)
>
> x = 6;
> y = x++ + 2;  // y is assigned 8: evaluate x + 2 first (8), then increment x
> ```
>
> Code like the preceding example that uses an arithmetic expression with an increment operator is often hard to read, and it’s easy to get wrong. As a result, it’s generally best to avoid writing code like this; instead, write separate statements for exactly the order you want. For example, if you want to first increment `x` and then assign `x + 1` to `y`, just write it as two separate statements.
>
> Instead of writing this:
>
> ```c
> y = ++x + 1;
> ```
>
> write it as two separate statements:
>
> ```c
> x++;
> y = x + 1;
> ```
