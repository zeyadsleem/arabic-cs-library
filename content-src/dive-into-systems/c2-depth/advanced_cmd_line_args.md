---
title: "2.9.2. Command Line Arguments"
lang: en
---

A program can be made more general purpose by reading command line arguments, which are included as part of the command entered by the user to run a binary executable program. They specify input values or options that change the runtime behavior of the program. In other words, running the program with different command line argument values results in a program’s behavior changing from run to run without having to modify the program code and recompile it. For example, if a program takes the name of an input filename as a command line argument, a user can run it with any input filename as opposed to a program that refers to a specific input filename in the code.

Any command line arguments the user provides get passed to the `main` function as parameter values. To write a program that takes command line arguments, the `main` function’s definition must include two parameters, `argc` and `argv`:

```c
int main(int argc, char *argv[]) { ...
```

Note that the type of the second parameter could also be represented as `char **argv`.

The first parameter, **argc**, stores the argument count. Its value represents the number of command line arguments passed to the main function (including the name of the program). For example, if the user enters

```bash
./a.out 10 11 200
```

then `argc` will hold the value 4 (`a.out` counts as the first command line argument, and `10`, `11`, and `200` as the other three).

The second parameter, **argv**, stores the argument vector. It contains the value of each command line argument. Each command line argument gets passed in as a string value, thus `argv`'s type is an array of strings (or an array of `char` arrays). The `argv` array contains `argc + 1` elements. The first `argc` elements store the command line argument strings, and the last element stores `NULL`, signifying the end of the command line argument list. For example, in the command line entered above, the `argv` array would look like [Figure 1](#Figargv):

![an example argv list with 5 elements, one for the 3 input values (10, 11, 200) plus the executable as the first element, and NULL as the last.](/images/dive-into-systems/c2-depth-0-argv.webp) Figure 1. The argv parameter passed to main is an array of strings. Each command line argument is passed as a separate string element in the array. The value of the last element is NULL, signifying the end of the list of command line arguments.

Often, a program wants to interpret a command line argument passed to `main` as a type other than a string. In the example above, the program may want to extract the integer value `10` from the string value `"10"` of its first command line argument. C’s standard library provides functions for converting strings to other types. For example, the `atoi` ("a to i", for "ASCII to integer") function converts a string of digit characters to its corresponding integer value:

```c
int x;
x = atoi(argv[1]);  // x gets the int value 10
```

See the [Strings and the String Library section](https://diveintosystems.org/book/C2-C_depth/strings.html#_functions_to_convert_strings_to_other_types) for more information about these functions. And the [commandlineargs.c](https://diveintosystems.org/book/C2-C_depth/_attachments/commandlineargs.c) program for another example of C command line arguments.
