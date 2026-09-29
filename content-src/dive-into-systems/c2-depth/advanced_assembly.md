---
title: "2.9.7. Compiling C to Assembly and Compiling Assembly Code"
lang: en
---

A compiler can compile C code to assembly code, and it can compile assembly code into a binary form that links into a binary executable program. We use IA32 assembly and `gcc` as our example assembly language and compiler, but this functionality is supported by any C compiler, and most compilers support compiling to a number of different assembly languages. See [Chapter 8](https://diveintosystems.org/book/C8-IA32/index.html#_assembly_chapter) for details about assembly code and assembly programming.

Consider this very simple C program:

simpleops.c

```c
int main(void) {
    int x, y;
    x = 1;
    x = x + 2;
    x = x - 14;
    y = x*100;
    x = x + y * 6;

    return 0;
}
```

The `gcc` compiler will compile it into an IA32 assembly text file (`.s`) using the `-S` command line option to specify compiling to assembly and the `-m32` command line option to specify generating IA32 assembly:

```bash
$ gcc -m32 -S simpleops.c   # runs the assembler to create a .s text file
```

This command creates a file named `simpleops.s` with the compiler’s IA32 assembly translation of the C code. Because the `.s` file is a text file, a user can view it (and edit it) using any text editor. For example:

```bash
$ vim simpleops.s
```

Passing additional compiler flags provides directions to `gcc` that it should use certain features or optimizations in its translation of C to IA32 assembly code.

An assembly code file, either one generated from `gcc` or one written by hand by a programmer, can be compiled by `gcc` into binary machine code form using the `-c` option:

```bash
$ gcc -m32 -c simpleops.s   # compiles to a relocatable object binary file (.o)
```

The resulting `simpleops.o` file can then be linked into a binary executable file (note: this requires that the 32-bit version of the system libraries are installed on your system):

```bash
$ gcc -m32 -o simpleops simpleops.o  # creates a 32-bit executable file
```

This command creates a binary executable file, `simpleops`, for IA32 (and x86-64) architectures.

The `gcc` command line to build an executable file can include `.o` and `.c` files that will be compiled and linked together to create the single binary executable.

Systems provide utilities that allow users to view binary files. For example, `objdump` displays the machine code and assembly code mappings in `.o` files:

```bash
$ objdump -d simpleops.o
```

This output can be compared to the assembly file:

```bash
$ cat simpleops.s
```

You should see something like this (we’ve annotated some of the assembly code with its corresponding code from the C program):

```
        .file   "simpleops.c"
        .text
        .globl main
        .type   main, @function
main:
        pushl   %ebp
        movl    %esp, %ebp
        subl    $16, %esp
        movl    $1, -8(%ebp)      # x = 1
        addl    $2, -8(%ebp)      # x = x + 2
        subl    $14, -8(%ebp)     # x = x - 14
        movl    -8(%ebp), %eax    # load x into R[%eax]
        imull   $100, %eax, %eax  # into R[%eax] store result of x*100
        movl    %eax, -4(%ebp)    # y = x*100
        movl    -4(%ebp), %edx
        movl    %edx, %eax
        addl    %eax, %eax
        addl    %edx, %eax
        addl    %eax, %eax
        addl    %eax, -8(%ebp)
        movl    $0, %eax
        leave
        ret
        .size   main, .-main
        .ident	"GCC: (Ubuntu 7.4.0-1ubuntu1~18.04.1) 7.4.0"
        .section	.note.GNU-stack,"",@progbits
```

#### [](#_writing_and_compiling_assembly_code)Writing and Compiling Assembly Code

Programmers can write their own assembly code by hand and compile it with `gcc` into a binary executable program. For example, to implement a function in assembly, add code to a `.s` file and use `gcc` to compile it. The following example shows the basic structure of a function in IA32 assembly. Such code would be written in a file (e.g., `myfunc.s`) for a function with the prototype `int myfunc(int param);`. Functions with more parameters or needing more space for local variables may differ slightly in their preamble code.

```javascript
        .text                   # this file contains instruction code
.globl myfunc                   # myfunc is the name of a function
        .type   myfunc, @function
myfunc:                         # the start of the function
        pushl   %ebp            # function preamble:
        movl    %esp, %ebp      #  the 1st three instrs set up the stack
        subl    $16, %esp

        # A programmer adds specific IA32 instructions
        # here that allocate stack space for any local variables
        # and then implements code using parameters and locals to
        # perform the functionality of the myfunc function
        #
        # the return value should be stored in %eax before returning

        leave    # function return code
        ret
```

A C program that wanted to call this function would need to include its function prototype:

```c
#include <stdio.h>

int myfunc(int param);

int main(void) {
    int ret;

    ret = myfunc(32);
    printf("myfunc(32) is %d\n", ret);

    return 0;
}
```

The following `gcc` commands build an executable file (`myprog`) from `myfunc.s` and `main.c` source files:

```bash
$ gcc -m32 -c myfunc.s
$ gcc -m32 -o myprog myfunc.o main.c
```

Handwritten Assembly Code

Unlike C, which is a high-level language that can be compiled and run on a wide variety of systems, assembly code is very low level and specific to a particular hardware architecture. Programmers may handwrite assembly code for low-level functions or for code sequences that are crucial to the performance of their software. A programmer can sometimes write assembly code that runs faster than the compiler-optimized assembly translation of C, and sometimes a C programmer wants to access low-level parts of the underlying architecture (such as specific registers) in their code. Small parts of operating system code are often implemented in assembly code for these reasons. However, because C is a portable language and is much higher level than assembly languages, the vast majority of operating system code is written in C, relying on good optimizing compilers to produce machine code that performs well.

Although most systems programmers rarely write assembly code, being able to read and understand a program’s assembly code is an important skill for obtaining a deeper understanding of what a program does and how it gets executed. It can also help with understanding a program’s performance and with discovering and understanding security vulnerabilities in programs.
