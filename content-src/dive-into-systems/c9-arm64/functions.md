---
title: "9.5. Functions in Assembly"
lang: en
---

In the previous section, we traced through simple functions in assembly. In this section, we discuss the interaction between multiple functions in assembly in the context of a larger program. We also introduce some new instructions involved with function management.

Let’s begin with a refresher on how the call stack is managed. Recall that `sp` is the **stack pointer** and always points to the top of the stack. The register `x29` represents the base pointer (also known as the **frame pointer** or `FP`) and points to the base of the current stack frame. The **stack frame** (also known as the **activation frame** or the **activation record**) refers to the portion of the stack allocated to a single function call. The currently executing function is always at the top of the stack, and its stack frame is referred to as the **active frame**. The active frame is bounded by the stack pointer (at the top of stack, lower address) and frame pointer (at the bottom of the frame, higher address). The activation record typically holds local variables for a function. Lastly, the **return address** indicates the program address at which the calling function (e.g., `main`) resumes execution once the callee function exits. In A64 systems, the return address is stored in register `x30` (also known as `LR`).

[Figure 1](#StackFramea64) shows the stack frames for `main` and a function it calls named `fname`. We will refer to the `main` function as the *caller* function and `fname` as the *callee* function.

![an illustration of stack frames](/images/dive-into-systems/c9-arm64-0-stackFrame.webp) Figure 1. Stack frame management

In [Figure 1](#StackFramea64), the current active frame belongs to the callee function (`fname`). The region of the call stack between the stack and frame pointers is used for local variables. The stack pointer moves as local values are pushed onto and popped from the stack. The frame pointer is not commonly used in optimized code, and is usually optional for operation. As a result, compilers like GCC commonly reference values on the stack relative to the stack pointer. In [Figure 1](#StackFramea64), the active frame is bounded below by the base pointer of `fname`, or `x29`, which contains stack address 0xef30. The value stored at address 0xef30 is the "saved" frame pointer value (0xef50), which itself indicates the bottom of the activation frame for the `main` function. Right below the frame pointer is a saved **return address** (stored in `x30`), which indicates the address that the program will continue executing once `main` exits.

**Warning — The return address points to code memory, not stack memory**

> Recall that the call stack region (stack memory) of a program is different from its code region (code memory). Whereas `sp` and `x29` point to addresses in the stack memory, `pc` points to an address in *code* memory. In other words, the return address is an address in *code* memory, not stack memory:
>
> ![The parts of a program’s address space.](/images/dive-into-systems/c9-arm64-1-memparts.webp) Figure 2. The parts of a program’s address space

[Table 1](#FunctionManagementa64) contains several additional instructions that the compiler uses for basic function management.

| Instruction | Translation |
| --- | --- |
| `bl addr ` | Sets `x30 = pc + 4` and sets `pc = addr` |
| `blr R ` | Sets `x30 = pc + 4` and sets `pc = R` |
| `ret` | Returns value in `x0` and sets `pc = x30` |

The `bl` and `ret` instructions play a prominent role in the process where one function calls another. Both instructions modify the instruction pointer (register `pc`). When the caller function executes the `bl` instruction, the value of `pc + 4` is saved in register `x30` to represent the return address, or the program address at which the caller resumes executing once the callee function finishes. The `bl` instruction also replaces the value of `pc` with the address of the callee function.

The `ret` instruction restores the value of `pc` to the value saved in `x30`, ensuring that the program resumes execution at the program address specified in the caller function. Any value returned by the callee is stored in register `x0` or its component register `w0`. The `ret` instruction is usually the last instruction that executes in any function.

### [](#_function_parameters)9.5.1. Function Parameters

Function parameters are typically preloaded into registers prior to a function call. The first eight parameters to a function are stored in registers `x0`…​`x7`. If a function requires more than seven parameters, the remaining parameters are successively loaded into the call stack based on their size (4-byte offsets for 32-bit data, 8-byte offsets for 64-bit data).

### [](#_tracing_through_an_example)9.5.2. Tracing Through an Example

Using our knowledge of function management, let’s trace through the code example first introduced at the beginning of this chapter.

```c
#include <stdio.h>

int assign() {
    int y = 40;
    return y;
}

int adder() {
    int a;
    return a + 2;
}

int main(void) {
    int x;
    assign();
    x = adder();
    printf("x is: %d\n", x);
    return 0;
}
```

We compile this code with the command `gcc -o prog prog.c` and use `objdump -d` to view the underlying assembly. The latter command outputs a pretty big file that contains a lot of information that we don’t need. Use `less` and the search functionality to extract the `adder`, `assign`, and `main` functions:

```
0000000000000724 <assign>:
 724:   d10043ff        sub     sp, sp, #0x10
 728:   52800500        mov     w0, #0x28                       // #40
 72c:   b9000fe0        str     w0, [sp, #12]
 730:   b9400fe0        ldr     w0, [sp, #12]
 734:   910043ff        add     sp, sp, #0x10
 738:   d65f03c0        ret

000000000000073c <adder>:
 73c:   d10043ff        sub     sp, sp, #0x10
 740:   b9400fe0        ldr     w0, [sp, #12]
 744:   11000800        add     w0, w0, #0x2
 748:   910043ff        add     sp, sp, #0x10
 74c:   d65f03c0        ret

0000000000000750 <main>:
 750:   a9be7bfd        stp     x29, x30, [sp, #-32]!
 754:   910003fd        mov     x29, sp
 758:   97fffff3        bl      724 <assign>
 75c:   97fffff8        bl      73c <adder>
 760:   b9001fa0        str     w0, [x29, #28]
 764:   90000000        adrp    x0, 0 <_init-0x598>
 768:   91208000        add     x0, x0, #0x820
 76c:   b9401fa1        ldr     w1, [x29, #28]
 770:   97ffffa8        bl      610 <printf@plt>
 774:   52800000        mov     w0, #0x0                        // #0
 778:   a8c27bfd        ldp     x29, x30, [sp], #32
 77c:   d65f03c0        ret
```

Each function begins with a symbolic label that corresponds to its declared name in the program. For example, `:` is the symbolic label for the `main` function. The address of a function label is also the address of the first instruction in that function. To save space in the figures that follow, we truncate code addresses to the lower 12 bits, and stack addresses to the lower 16 bits. So, stack address 0xffffffffef50 is shown as 0xef50.

### [](#_tracing_through_main)9.5.3. Tracing Through main

[Figure 3](#initialMaina64) shows the execution stack immediately prior to the execution of `main`.

![slide1](/images/dive-into-systems/c9-arm64-2-Slide1.webp) Figure 3. Initial state of CPU registers and call stack prior to executing the main function

Recall that the stack grows toward lower addresses. In this example, the frame and stack pointers (`x29` and `sp`) both contain address 0xef50. Initially, `pc` is the address of the first instruction in the `main` function, or 0x750. Registers `x30` and `w0` are also highlighted in this example, and both contain initial junk values.

![slide2](/images/dive-into-systems/c9-arm64-3-Slide2.webp)

The first instruction (`stp`) is a composite instruction with two parts. First, the second operand (`[sp, #-32]!`) decrements the stack pointer by 32 bytes, thus allocating space for the current stack frame. After the evaluation of the operand, the stack pointer updates to 0xef30. Next, the `stp` instruction stores the current values of `x29` and `x30` at locations `sp` and `sp+8`, respectively. The instruction pointer `pc` advances to the next instruction in sequence.

![slide3](/images/dive-into-systems/c9-arm64-4-Slide3.webp)

The next instruction (`mov x29, sp`) updates the value of `x29` to be the same as `sp`. Thus, the frame pointer (`x29`) now points to the start of the stack frame for the `main` function. The instruction pointer `pc` advances to the next instruction in sequence.

![slide4](/images/dive-into-systems/c9-arm64-5-Slide4.webp)

The first `bl` instruction stores `pc+4` (or 0x75c) in register `x30`, which is the address in `main` at which the program will resume executing once the `assign` function returns. Next, the register `pc` is updated with address 0x724, which indicates the address of the first instruction in the `assign` function.

![slide5](/images/dive-into-systems/c9-arm64-6-Slide5.webp)

The next instruction that executes is the first instruction in `assign`. The `sub` instruction decrements the stack pointer by 16 bytes. Note that `x29` and `sp` now denote the active stack frame boundaries for the `assign` function. The program counter advances to the next instruction.

![slide6](/images/dive-into-systems/c9-arm64-7-Slide6.webp)

The `mov` instruction stores the constant value 0x28 in register `w0`. Register `pc` advances to the next instruction in sequence.

![slide7](/images/dive-into-systems/c9-arm64-8-Slide7.webp)

The `str` instruction stores 0x28 at an offset of 12 bytes from the stack pointer, or at address 0xef2c. The instruction pointer advances to the next instruction.

![slide8](/images/dive-into-systems/c9-arm64-9-Slide8.webp)

The `ldr` instruction saves 0x28 from stack address 0xef2c into register `w0`. The instruction pointer advances to the next instruction.

![slide9](/images/dive-into-systems/c9-arm64-10-Slide9.webp)

The `add` instruction deallocates the current stack frame and reverts `sp` to its previous value, or 0xef30.

![slide10](/images/dive-into-systems/c9-arm64-11-Slide10.webp)

The `ret` instruction replaces the value in `pc` with the value in `x30`, or 0x75c. As a result, program execution returns to the first instruction in the `main` function immediately after the call to `assign`.

![slide11](/images/dive-into-systems/c9-arm64-12-Slide11.webp)

The next instruction that executes is a function call to `adder` (or `bl 73c `). Therefore, register `x30` is updated with `pc+4`, or 0x760. The program counter is replaced with address 0x73c, signifying that program execution continues into the `adder` function.

![slide12](/images/dive-into-systems/c9-arm64-13-Slide12.webp)

The first instruction in the `adder` function decrements the stack pointer by 16 bytes, allocating the new stack frame for the the `adder` function. Note that the active stack frame boundaries for the `adder` function are designated by registers `sp` and `x29`. The instruction pointer advances to the next instruction in sequence.

![slide13](/images/dive-into-systems/c9-arm64-14-Slide13.webp)

What happens next is crucial. The `ldr` instruction loads an *old* value from the stack (at `sp+12`) into register `w0`. This is a direct result of the fact that the programmer forgot to initialize `a` in the `adder` function. The instruction pointer advances to the next instruction in sequence.

![slide14](/images/dive-into-systems/c9-arm64-15-Slide14.webp)

The `add` instruction then adds 0x2 to the value in `w0` and stores the result (0x2A) in register `w0`. The instruction pointer advances to the next instruction in sequence.

![slide15](/images/dive-into-systems/c9-arm64-16-Slide15.webp)

The next `add` instruction increments the stack pointer by 16 bytes, thus destroying the active frame for `adder` and restoring `sp` to its previous value. The instruction pointer advances to the next instruction in sequence.

![slide16](/images/dive-into-systems/c9-arm64-17-Slide16.webp)

Finally, the `ret` instruction overwrites `pc` with the address in register `x30`, indicating that program execution should continue in the `main` function at code segment address 0x760.

![slide20](/images/dive-into-systems/c9-arm64-18-Slide17.webp)

Back in the `main()` function, the `str` instruction at program address 0x760 stores the contents of the `w0` register (0x2A) at a call stack location that is 28 bytes from the frame pointer (`x29`). Therefore, 0x2A is stored at stack address 0xef4c.

![slide18](/images/dive-into-systems/c9-arm64-19-Slide19.webp)

The next two instructions together load an address of a page into register `x0`. Since addresses are 8 bytes long, the 64-bit register `x0` is used instead of its 32-bit component, `w0`. The `adrp` instruction loads the address (0x0) into register `x0`, while the `add` instruction at code segment address 0x768 adds the value 0x820 to it. At the end of these two instructions, register `x0` contains memory address 0x820. Note that the value stored at address 0x820 is the string `"x is %d\n"`.

![slide20](/images/dive-into-systems/c9-arm64-20-Slide20.webp)

Next, the `ldr` instruction at program address 0x76c loads 0x2A (which is located at an offset of 28 bytes from the frame pointer) into register `w1`.

![slide21](/images/dive-into-systems/c9-arm64-21-Slide21.webp)

The next instruction calls the `printf` function. For the sake of brevity, we will not trace the `printf` function, which is part of `stdio.h`. However, we know from the manual page (`man -s3 printf`) that `printf` has the following format:

```javascript
int printf(const char * format, ...)
```

In other words, the first argument is a pointer to a string specifying the format, and the second argument onward specify the values that are used in that format. The instructions specified by addresses 0x764 - 0x770 correspond to the following line in the `main` function:

```c
printf("x is %d\n", x);
```

When the `printf` function is called:

- The return address (`pc+4` or 0x774) is stored in register `x30`.
- Register `pc` switches address 0x610, which is the start of the `printf` function.
- Register `sp` is updated to reflect the new stack frame for the `printf` function.

At some point, `printf` references its arguments, which are the string `"x is %d\n"` and the value 0x2A. Recall that for any function with *n* arguments, gcc places the first eight arguments in registers `x0`-`x7`, and the remaining arguments onto the stack *below* the frame pointer. In this case, the first parameter is stored in register `x0` (since it is an address to a string), and the second parameter is stored in component register `w1`.

After the call to `printf`, the value 0x2A is output to the user in integer format. Thus, the value 42 is printed to the screen. The stack pointer reverts to its previous value, and `pc` updates to the value stored in register `x30`, or 0x774.

![slide23](/images/dive-into-systems/c9-arm64-22-Slide22.webp)

The `mov` instructions at address 0x774 loads the constant value `#0x0` into component register `w0`. This represents the value that will be returned when `main` completes execution. The program counter advances to the next instruction in sequence.

![slide24](/images/dive-into-systems/c9-arm64-23-Slide23.webp)

The `ldp` instruction at program address 0x778 first copies the values at `sp` and `sp+8` into registers `x29` and `x30`, reverting them to their original values prior to the start of the execution of the `main` function. The last part of the `ldp` instruction (as specified by the operand `[sp], #32`) increments the stack pointer by 32 bytes, restoring `sp` to its original value prior to the execution of `main`. Thus, when the `ldp` instruction completes execution, the stack pointer (`sp`), frame pointer (`x29`), and return register (`x30`) all have returned to their original values. The program counter advances to the last instruction in the `main` function.

![slide25](/images/dive-into-systems/c9-arm64-24-Slide24.webp)

The last instruction that executes is `ret`. With 0x0 in the return register `w0`, the program returns 0, indicating correct termination.

If you have carefully read through this section, you should understand why our program prints out the value 42. In essence, the program inadvertently uses old values on the stack to cause it to behave in a way that we didn’t expect. This example was pretty harmless; however we discuss in future sections how hackers have misused function calls to make programs misbehave in truly malicious ways.
