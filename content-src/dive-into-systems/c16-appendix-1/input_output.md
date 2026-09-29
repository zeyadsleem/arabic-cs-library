---
title: "16.2. Input/Output (printf and scanf)"
lang: en
---

C’s `printf` function prints values to the terminal, and the `scanf` function reads in values entered by a user. The `printf` and `scanf` functions belong to C’s standard I/O library, which needs to be explicitly included at the top of any `.c` file that uses these functions by using `#include `. In this section, we introduce the basics of using `printf` and `scanf` in C programs. The ["I/O" section in Chapter 2](https://diveintosystems.org/book/C2-C_depth/IO.html#_io_in_c) discusses C’s input and output functions in more detail.

### [](#_printf)16.2.1. printf

C’s `printf` function is very similar to the `System.out.printf` method in Java, where the caller specifies a format string to print. The format string often contains formatting specifiers, such as special characters that will print tabs (`\t`) or newlines (`\n`), or placeholders for values in the output. Placeholders consist of `%` followed by a type specifier letter (for example, `%d` represents a placeholder for an integer value). For each placeholder in the format string, `printf` expects an additional argument. [Table 1](#TabCSyntaxPrinting) contains an example program in Java and C with formatted output:

**Table 1. Syntax Comparison of Printing in Java and C**

**Java version**

```java
/* Java formatted print example */

class PrintfExample {

 public static void main(String[] args){

  System.out.printf("Name: %s, Info:\n",
                    "Vijay");
  System.out.printf("\tAge: %d\t Ht: %g\n",
                    20, 5.9);
  System.out.printf("\tYr: %d\t Dorm: %s\n",
                    3, "Alice Paul");
 }

}
```

**C version**

```c
/* C printf example */

#include <stdio.h> // for printf

int main(void) {

  printf("Name: %s, Info:\n",
         "Vijay");
  printf("\tAge: %d\t Ht: %g\n",
         20, 5.9);
  printf("\tYr: %d\t Dorm: %s\n",
         3, "Alice Paul");

  return 0;
}
```

When run, both versions of this program produce identically formatted output:

```
Name: Vijay,  Info:
	Age: 20 	 Ht: 5.9
	Year: 3 	 Dorm: Alice Paul
```

C uses the same formatting placeholders as Java for specifying different types of values. The preceding example demonstrates the following formatting placeholders:

```
%g:  placeholder for a float (or double) value
%d:  placeholder for a decimal value (int, short, char)
%s:  placeholder for a string value
%c:  placeholder for a char value
```

The `%c` placeholder is useful when a programmer wants to print the ASCII character associated with a particular numeric encoding. Here’s a C code snippet that prints a `char` as its numeric value (`%d`) and as its character encoding (`%c`):

```c
// Example printing a char value as its decimal representation (%d)
// and as the ASCII character that its value encodes (%c)

char ch;

ch = 'A';
printf("ch value is %d which is the ASCII value of  %c\n", ch, ch);

ch = 99;
printf("ch value is %d which is the ASCII value of  %c\n", ch, ch);
```

When run, the program’s output looks like this:

```
ch value is 65 which is the ASCII value of  A
ch value is 99 which is the ASCII value of  c
```

### [](#_scanf)16.2.2. scanf

C’s `scanf` function represents one method for reading in values entered by the user (via the keyboard) and storing them in program variables. The `scanf` function can be a bit picky about the exact format in which the user enters data, which means that it’s not very robust to badly formed user input. In the ["I/O" section in Chapter 2](https://diveintosystems.org/book/C2-C_depth/IO.html#_io_in_c), we discuss more robust ways of reading input values from the user. For now, remember that if your program gets into an infinite loop due to badly formed user input, you can always press **CTRL-C** to terminate it.

Reading input is handled differently in Java and C: Java creates a new `Scanner` object and uses its methods to read in and return values of different types, whereas C uses `scanf` to read in values of different types, specified by a format string argument, and store them at the memory locations of program variables (for example, `&num1`). [Table 2](#TabInputJavaComparison) displays example programs for reading user input values in Java and C:

**Table 2. Comparison of Methods for Reading Input Values in Java and C**

**Java version**

```java
/* Java input example */

import java.util.Scanner;

class InputExample {

  public static void main(String[] args) {

    int num1, num2;
    Scanner in = new Scanner(System.in);

    System.out.print("Enter a number: ");
    num1 = in.nextInt();
    System.out.print("Enter another: ");
    num2 = in.nextInt();

    System.out.printf( "%d + %d = %d\n",
          num1, num2, (num1+num2) );
  }

}
```

**C version**

```c
/* C input (scanf) example */

#include <stdio.h>

int main(void) {

  int num1, num2;

  printf("Enter a number: ");
  scanf("%d", &num1);
  printf("Enter another: ");
  scanf("%d", &num2);

  printf("%d + %d = %d\n",
       num1, num2, (num1+num2) );

  return 0;
}
```

When run, both programs read in two values (here, 30 and 67):

```
Enter a number: 30
Enter another: 67
30 + 67 = 97
```

Like `printf`, `scanf` takes a format string that specifies the number and types of values to read in (for example, `"%d"` specifies one `int` value). The `scanf` function skips over leading and trailing whitespace as it reads in a numeric value, so its format string only needs to contain a sequence of formatting placeholders, usually with no whitespace or other formatting characters between the placeholders in its format string. The arguments for the placeholders in the format string specify the *locations* of program variables into which the values read in will be stored. Prefixing the name of a variable with the `&` operator produces the location of that variable in the program’s memory — the memory address of the variable. The ["Pointers" section in Chapter 2](https://diveintosystems.org/book/C2-C_depth/pointers.html#_cs_pointer_variables) discusses the `&` operator in more detail. For now, we use it only in the context of the `scanf` function.

Here’s another `scanf` example, in which the format string has placeholders for two values, the first an `int` and the second a `float`:

scanf_ex.c

```c
int x;
float pi;

// read in an int value followed by a float value ("%d%g")
// store the int value at the memory location of x (&x)
// store the float value at the memory location of pi (&pi)
scanf("%d%g", &x, &pi);
```

When inputting data to a program via `scanf`, individual numeric input values must be separated by at least one whitespace character. However, because `scanf` skips over additional leading and trailing whitespace characters (for example, spaces, tabs, and newlines), a user could enter input values with any amount of space before or after each input value. For instance, if a user enters the following for the call to `scanf` in the preceding example, `scanf` will read in 8 and store it in the `x` variable, and then read in 3.14 and store it in the `pi` variable:

```
          8                   3.14
```
