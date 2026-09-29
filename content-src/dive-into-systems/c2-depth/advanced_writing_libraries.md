---
title: "2.9.6. Writing and using your own C libraries (and compiling multiple .c and .h files)"
lang: en
---

Programmers typically divide large C programs into separate **modules** (i.e., separate `.c` files) of related functionality. Definitions shared by more than one module are put in header files (`.h` files) that are included by the modules that need them. Similarly, C library code is also implemented in one or more modules (`.c` files) and one or more header files (`.h` files). C programmers often implement their own C libraries of commonly used functionality. By writing a library, a programmer implements the functionality once, in the library, and then can use this functionality in any subsequent C program that they write.

In the [Using, Compiling, and Linking Libraries](https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_c_link_load_) section, we describe how to use, compile, and link C library code into C programs. In this section, we discuss how to write and use your own libraries in C. What we present here also applies to structuring and compiling larger C programs composed of multiple C source and header files.

To create a library in C:

1. Define an interface to the library in a header (`.h`) file. This header file must be included by any program that wants to use the library.
2. Create an implementation of the library in one or more `.c` files. This set of function definitions implement the library’s functionality. Some functions may be interface functions that users of the library will call, and others may be internal functions that cannot be called by users of the library (internal functions are part of good modular design of the library’s implementation).
3. Compile a binary form of the library that can be linked into programs that use the library.

The binary form of a library could be directly built from its source file(s) as part of compiling the application code that uses the library. This method compiles the library files into `.o` files and statically links them into the binary executable. Including libraries this way often applies to library code that you write for your own use (since you have access to its `.c` source files), and it’s also the method to build an executable from multiple `.c` modules.

Alternatively, a library could be compiled into a binary archive (`.a`) or a shared object (`.so`) file for programs that want to use the library. In these cases, users of the library often will not have access to the library’s C source code files, and thus they are not able to directly compile the library code with application code that uses it. When a program uses such a precompiled library (e.g., a `.a` or `.so`), the library’s code must be explicitly linked into the executable file using `gcc`'s `-l` command line option.

We focus our detailed discussion of writing, compiling, and linking library code on the case in which the programmer has access to individual library modules (either the `.c` or `.o` files). This focus also applies to designing and compiling large C programs that are divided into multiple `.c` and `.h` files. We briefly show commands for building archive and shared object forms of libraries. More information about building these types of library files is available in the `gcc` documentation, including the man pages for `gcc` and `ar`.

#### [](#_library_details_by_example)Library Details by Example

In the following, we show some examples of creating and using your own libraries.

**Define the library interface:**

Header files (`.h` file) are text files that contain C function prototypes and other definitions — they represent the interface of a library. A header file must be included in any application that intends to use the library. For example, the C standard library header files are usually stored in `/usr/include/` and can be viewed with an editor:

```bash
$ vi /usr/include/stdio.h
```

Here’s an [example header file (`mylib.h`)](https://diveintosystems.org/book/C2-C_depth/_attachments/mylib.h) from a library that contains some definitions for users of the library.

```c
#ifndef _MYLIB_H_
#define _MYLIB_H_

// a constant definition exported by library:
#define MAX_FOO  20

// a type definition exported by library:
struct foo_struct {
    int x;
    float y;
};

// a global variable exported by library
// "extern" means that this is not a variable declaration,
// but it defines that a variable named total_times of type
// int exists in the library implementation and is available
// for use by programs using the library.
// It is unusual for a library to export global variables
// to its users, but if it does, it is important that
// extern appears in the definition in the .h file
extern int total_times;

// a function prototype for a function exported by library:
// extern means that this function definition exists
// somewhere else.
/*
 * This function returns the larger of two float values
 *  y, z: the two values
 *  returns the value of the larger one
 */
extern float bigger(float y, float z);

#endif
```

Header files typically have special "boilerplate" code around their contents:

```c
#ifndef

// header file contents

#endif
```

This boilerplate code ensures that the compiler’s preprocessor only includes the contents of `mylib.h` exactly once in any C file that includes it. It is important to include `.h` file contents only once to avoid duplicate definition errors at compile time. Similarly, if you forget to include a `.h` file in a C program that uses the library, the compiler will generate an `undefined symbol` warning.

The comments in the `.h` file are part of the interface to the library, written for users of the library. These comments should be verbose, explaining definitions and describing what each library function does, what parameters values it takes, and what it returns. Sometimes a `.h` file will also include a top-level comment describing how to use the library.

The keyword **extern** before the global variable definition and function prototype means that these names are defined somewhere else. It is particularly important to include `extern` before any global variables that the library exports, as it distinguishes a name and type definition (in the `.h` file) from a variable declaration in the library’s implementation. In the previous example, the global variable is declared exactly once inside the library, but it’s exported to library users through its `extern` definition in the library’s `.h` file.

**Implement the library functionality:**

Programmers implement libraries in one or more `.c` files (and sometimes internal `.h` files). The implementation includes definitions of all the functions' prototypes in the `.h` file as well as other functions that are internal to its implementation. These internal functions are often defined with the keyword `static`, which scopes their availability to the module (`.c` file) in which they are defined. The library implementation should also include variable definitions for any `extern` global variable declarations in the `.h` file. Here’s [an example library implementation (`mylib.c`)](https://diveintosystems.org/book/C2-C_depth/_attachments/mylib.c):

```c
#include <stdlib.h>

// Include the library header file if the implementation needs
// any of its definitions (types or constants, for example.)
// Use " " instead of < > if the mylib.h file is not in a
// default  library path with other standard library header
// files (the usual case for library code you write and use.)
#include "mylib.h"

// declare the global variable exported by the library
int total_times = 0;

// include function definitions for each library function:
float bigger(float y, float z) {
    total_times++;
    if (y > z) {
        return y;
    }
    return z;
}
```

**Create a binary form of the library:**

To create a binary form of the library (a `.o` file), compile with the `-c` option:

```bash
$ gcc -o mylib.o -c mylib.c
```

One or more `.o` files can build an archive (`.a`) or shared object (`.so`) version of the library.

- To build a static library use the archiver (`ar`):

```bash
ar -rcs libmylib.a mylib.o
```

- To build a dynamically linked library, the `mylib.o` object file(s) in the library must be built with **position independent code** (using `-fPIC`). A `libmylib.so` shared object file can be created from `mylib.o` by specifying the `-shared` flag to `gcc`:

```bash
gcc -fPIC -o mylib.o -c mylib.c
gcc -shared -o libmylib.so mylib.o
```

- Shared object and archive libraries are often built from multiple `.o` files, for example (remember that `.o` for dynamically linked libraries need to be built using the `-fPIC` flag):

```bash
gcc -shared -o libbiglib.so file1.o file2.o file3.o file4.o
ar -rcs libbiglib.a file1.o file2.o file3.o file4.o
```

**Use and link the library:**

In other `.c` files that use this library:

1. `#include` its header file, and
2. explicitly link in the implementation (`.o` file) during compilation.

After including the library header file, your code then can call the library’s functions (e.g., in [`myprog.c`](https://diveintosystems.org/book/C2-C_depth/_attachments/myprog.c)):

```c
#include <stdio.h>
#include "mylib.h"   // include library header file

int main(void) {
    float val1, val2, ret;
    printf("Enter two float values: ");
    scanf("%f%f", &val1, &val2);
    ret = bigger(val1, val2);   // use a library function
    printf("%f is the biggest\n", ret);

    return 0;
}
```

**Note — `#include` syntax and the preprocessor**

> Note that the `#include` syntax to include `mylib.h` is different from the syntax to include `stdio.h`. This is because `mylib.h` is not located with the header files from standard libraries. The preprocessor has default places it looks for standard header files. When including a file with the `` syntax instead of the `"file.h"` syntax, the preprocessor searches for the header file in those standard places.
>
> When `mylib.h` is included inside double quotes, the preprocessor first looks in the current directory for the `mylib.h` file, and then other places that you need to explicitly tell it to look, by specifying an include path (`-I`) to `gcc`. For example, if the header file is in the `/home/me/myincludes` directory (and not in the same directory as the `myprog.c` file), then the path to this directory must be specified in the `gcc` command line for the preprocessor to find the `mylib.h` file:
>
> ```bash
> $ gcc -I/home/me/myincludes -c myprog.c
> ```

To compile a program (`myprog.c`) that uses the library (`mylib.o`) into a binary executable:

```bash
$ gcc -o myprog myprog.c mylib.o
```

Or, if the library’s implementation files are available at compile time, then the program can be built directly from the program and library `.c` files:

```bash
$ gcc -o myprog myprog.c mylib.c
```

Or, if the library is available as an archive or shared object file, then it can be linked in using `-l`, (`-lmylib`: note that the library name is `libmylib.[a,so]`, but only the `mylib` part is included in the `gcc` command line):

```bash
$ gcc -o myprog myprog.c -L. -lmylib
```

The `-L.` option specifies the path to the `libmylib.[so,a]` files (the `.` after the `-L` indicates that it should search the current directory). By default, `gcc` will dynamically link a library if it can find a `.so` version. See the [Using C libraries section](https://diveintosystems.org/book/C2-C_depth/advanced_libraries.html#_c_link_load_) for more information about linking and link paths.

The program can then be run:

```bash
$ ./myprog
```

If you run the dynamically linked version of `myprog`, you may encounter an error that looks like this:

```
/usr/bin/ld: cannot find -lmylib
collect2: error: ld returned 1 exit status
```

This error is saying that the runtime linker cannot find `libmylib.so` at runtime. To fix this problem, set your `LD_LIBRARY_PATH` environment variable to include the path to the `libmylib.so` file. Subsequent runs of `myprog` use the path you add to `LD_LIBRARY_PATH` to find the `libmylib.so` file and load it at runtime. For example, if `libmylib.so` is in the `/home/me/mylibs/` subdirectory, run this (just once) at the bash shell prompt to set the `LD_LIBRARY_PATH` environment variable:

```bash
$ export LD_LIBRARY_PATH=/home/me/mylibs:$LD_LIBRARY_PATH
```
