---
title: "2.2. C Pointer Variables"
lang: en
---

C’s pointer variables provide a level of indirection to accessing program memory. By understanding how to use pointer variables, a programmer can write C programs that are both powerful and efficient. For example, through pointer variables, a C programmer can:

- implement functions whose parameters can modify values in the caller’s stack frame
- dynamically allocate (and deallocate) program memory at runtime when the program needs it
- efficiently pass large data structures to functions
- create linked dynamic data structures
- interpret bytes of program memory in different ways.

In this section we introduce the syntax and semantics of C’s pointer variables and introduce common examples of how to use them in C programs.

### [](#_pointer_variables)2.2.1. Pointer Variables

A **pointer variable** stores the address of a memory location in which a value of a specific type can be stored. For example, a pointer variable can store the value of an `int` address at which the integer value 12 is stored. The pointer variable *points to* (refers to) the value. A pointer provides *a level of indirection* for accessing values stored in memory. [Figure 1](#FigPointerMem) illustrates an example of what a pointer variable might look like in memory:

![A pointer named "ptr" points to a memory location that stores the integer value 12.](/images/dive-into-systems/c2-depth-0-ptr.webp) Figure 1. A pointer variable stores the address of a location in memory. Here, the pointer stores the address of an integer variable that holds the number 12.

Through the pointer variable, `ptr`, the value (`12`) stored in the memory location it points to can be indirectly accessed. C programs most frequently use pointer variables for:

1. **"Pass by pointer" parameters**, for writing functions that can modify their argument’s value through a pointer parameter
2. **Dynamic memory allocation**, for writing programs that allocate (and free) space as the program runs. Dynamic memory is commonly used for dynamically allocating arrays. It is useful when a programmer doesn’t know the size of a data structure at compile time (e.g., the array size depends on user input at runtime). It also enables data structures to be resized as the program runs.

#### [](#_rules_for_using_pointer_variables)Rules for Using Pointer Variables

The rules for using pointer variables are similar to regular variables, except that you need to think about two types: the type of the pointer variable, and the type stored in the memory address to which the pointer variable points.

First, **declare a pointer variable** using `type_name *var_name`:

```c
int *ptr;   // stores the memory address of an int (ptr "points to" an int)
char *cptr; // stores the memory address of a char (cptr "points to" a char)
```

**Note — Pointer Types**

> Note that although `ptr` and `cptr` are both pointers, they refer to different types:
>
> - The type of `ptr` is *"pointer to int"* (`int *`). It can point to a memory location that stores an `int` value.
> - The type of `cptr` is *"pointer to char"* (`char *`). It can point to a memory location that stores a `char` value.

Next, **initialize the pointer variable** (make it point to something). Pointer variables *store address values*. A pointer should be initialized to store the address of a memory location whose type matches the type to which the pointer variable points. One way to initialize a pointer is to use the **address operator** (`&`) with a variable to get the variable’s address value:

```c
int x;
char ch;

ptr = &x;    // ptr gets the address of x, pointer "points to" x
cptr = &ch;  // cptr gets the address of ch, pointer "points to" ch
```

![Initialize ptr to the address of x and cptr to the address of ch (to point to x and ch, respectively).](/images/dive-into-systems/c2-depth-1-ptrinit.webp) Figure 2. A program can initialize a pointer by assigning it the address of an existing variable of the appropriate type.

Here’s an example of an invalid pointer initialization due to mismatched types:

```c
cptr = &x;   // ERROR: cptr can hold a char memory location
             // (&x is the address of an int)
```

Even though the C compiler may allow this type of assignment (with a warning about incompatible types), the behavior of accessing and modifying `x` through `cptr` will likely not behave as the programmer expects. Instead, the programmer should use an `int *` variable to point to an `int` storage location.

All pointer variables can also be assigned a special value, **NULL**, which represents an invalid address. While a **null pointer** (one whose value is `NULL`) should never be used to access memory, the value `NULL` is useful for testing a pointer variable to see if it points to a valid memory address. That is, C programmers will commonly check a pointer to ensure that its value isn’t `NULL` before attempting to access the memory location to which it points. To set a pointer to `NULL`:

```c
ptr = NULL;
cptr = NULL;
```

![Initialize ptr and cptr to NULL.](/images/dive-into-systems/c2-depth-2-ptrnull.webp) Figure 3. Any pointer can be given the special value NULL, which indicates that it doesn’t refer to any particular address. Null pointers should never be dereferenced.

Finally, **use the pointer variable**: the **dereference operator** (`*`) follows a pointer variable to the location in memory that it points to and accesses the value at that location:

```c
/* Assuming an integer named x has already been declared, this code sets the
   value of x to 8. */

ptr = &x;   /* initialize ptr to the address of x (ptr points to variable x) */
*ptr = 8;   /* the memory location ptr points to is assigned 8 */
```

![Dereference ptr to access the memory it points to (x, whose value is 8).](/images/dive-into-systems/c2-depth-3-ptrderef.webp) Figure 4. Dereferencing a pointer accesses the value to which the pointer refers.

#### [](#_pointer_examples)Pointer Examples

Here’s an example sequence of C statements using two pointer variables:

```c
int *ptr1, *ptr2, x, y;

x = 8;
ptr2 = &x;     // ptr2 is assigned the address of x
ptr1 = NULL;
```

![We initialize x to 8, ptr2 to the address of x, and ptr1 gets NULL.](/images/dive-into-systems/c2-depth-4-ptrs1.webp)

```c
*ptr2 = 10;     // the memory location ptr2 points to is assigned 10
y = *ptr2 + 3;  // y is assigned what ptr2 points to plus 3
```

![Dereference ptr2 to change x to 10 and assign y 13.](/images/dive-into-systems/c2-depth-5-ptrs2.webp)

```c
ptr1 = ptr2;   // ptr1 gets the address value stored in ptr2 (both point to x)
```

![Assign ptr1 the value of ptr2 (they now both point to same location).](/images/dive-into-systems/c2-depth-6-ptrs3.webp)

```c
*ptr1 = 100;
```

![Dereference ptr1 and assign 100 to the value it points to. Note: this assignment changes value pointed to by both ptr1 and ptr2, since they both refer to the same location.](/images/dive-into-systems/c2-depth-7-ptrs4.webp)

```c
ptr1 = &y;     // change ptr1's value (change what it points to)
*ptr1 = 80;
```

![Reassign ptr1 to point to the address of y and dereference it to change y’s value to 80.](/images/dive-into-systems/c2-depth-8-ptrs5.webp)

When using pointer variables, carefully consider the types of the relevant variables. Drawing pictures of memory (like those shown above) can help with understanding what pointer code is doing. Some common errors involve misusing the dereference operator (`*`) or the address operator (`&`). For example:

```c
ptr = 20;       // ERROR?:  this assigns ptr to point to address 20
ptr = &x;
*ptr = 20;      // CORRECT: this assigns 20 to the memory pointed to by ptr
```

If your program dereferences a pointer variable that does not contain a valid address, the program crashes:

```c
ptr = NULL;
*ptr = 6;    // CRASH! program crashes with a segfault (a memory fault)

ptr = 20;
*ptr = 6;    // CRASH! segfault (20 is not a valid address)

ptr = x;
*ptr = 6;   // likely CRASH or may set some memory location with 6
            // (depends on the value of x which is used as an address value)

ptr = &x;   // This is probably what the programmer intended
*ptr = 6;
```

These types of errors exemplify one reason to initialize pointer variables to `NULL`; a program can then test a pointer’s value for `NULL` before dereferencing it:

```c
if (ptr != NULL) {
    *ptr = 6;
}
```
