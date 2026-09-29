---
title: "2.9.3. The void* Type"
lang: en
---

The C type `void *` represents a generic pointer — a pointer to any type, or a pointer to an unspecified type. C allows for a generic pointer type because memory addresses on a system are always stored in the same number of bytes (e.g., addresses are four bytes on 32-bit systems and eight bytes on 64-bit systems). As a result, every pointer variable requires the same number of storage bytes, and because they’re all the same size, the compiler can allocate space for a `void *` variable without knowing the type it points to. Here’s an example:

```c
void *gen_ptr;
int x;
char ch;

gen_ptr = &x;  // gen_ptr can be assigned the address of an int
gen_ptr = &ch; // or the address of a char (or the address of any type)
```

Typically, programmers do not declare variables of type `void *` as in the preceding example. Instead, it’s commonly used to specify generic return types from functions or generic parameters to functions. The `void *` type is often used as a return type by functions that return newly allocated memory that can be used to store any type (e.g., `malloc`). It’s also used as a function parameter for functions that can take any type of value. In this case, individual calls to the function pass in a pointer to some specific type, which can be passed to the function’s `void *` parameter because it can store the address of any type.

Because `void *` is a generic pointer type, it cannot be directly dereferenced — the compiler does not know the size of memory that the address points to. For example, the address could refer to an `int` storage location of four bytes or it could refer to a `char` storage location in memory of one byte. Therefore, the programmer must explicitly **recast** the `void *` pointer to a pointer of a specific type before dereferencing it. Recasting tells the compiler the specific type of pointer variable, allowing the compiler to generate the correct memory access code for pointer dereferences.

Here are two examples of `void *` use:

A call to `malloc` recasts its `void *` return type to the specific pointer type of the variable used to store its returned heap memory address:

```c
int *array;
char *str;

array = (int *)malloc(sizeof(int) * 10); // recast void * return value
str = (char *)malloc(sizeof(char) * 20);

*array = 10;
str[0] = 'a';
```

Students often encounter the `void *` when [creating threads](https://diveintosystems.org/book/C14-SharedMemory/posix.html#_hello_threading_writing_your_first_multithreaded_program). Using a `void *` parameter type in a thread function allows the thread to take any type of application-specific pointer. The `pthread_create` function has a parameter for the thread main function and a `void *` parameter for the argument value that it passes to the thread main function that the newly created thread will execute. The use of the `void *` parameter makes `pthread_create` a generic thread creation function; it can be used to point to any type of memory location. For a specific program that calls `pthread_create`, the programmer knows the type of the argument passed to the `void *` parameter, so the programmer must recast it to its known type before dereferencing it. In this example, suppose that the address passed to the `args` parameter contains the address of an integer variable:

```c
/*
 * an application-specific pthread main function
 * must have this function prototype: int func_name(void *args)
 *
 * any given implementation knows what type is really passed in
 *  args: pointer to an int value
 */
int my_thr_main(void *args) {
    int num;

    // first recast args to an int *, then dereference to get int value
    num = *((int *)args);  // num gets 6
    ...
}

int main(void) {
    int ret, x;
    pthread_t tid;

    x = 6;
    // pass the address of int variable (x) to pthread_create's void * param
    // (we recast &x as a (void *) to match the type of pthread_create's param)
    ret = pthread_create(&tid, NULL,
                         my_thr_main,    // a thread main function
                         (void *)(&x));  // &x will be passed to my_thr_main
    // ...
```
