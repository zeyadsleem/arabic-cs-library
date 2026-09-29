---
title: "1.3. Conditionals and Loops"
lang: en
---

[Table 1](#TabIfElseComparison) shows that the syntax and semantics of `if`-`else` statements in C and Python are very similar. The main syntactic difference is that Python uses indentation to indicate "body" statements, whereas C uses curly braces (but you should still use good indentation in your C code).

**Table 1. Syntax Comparison of if-else Statements in Python and C**

**Python version**

```python
# Python if-else example

def main():

    num1 = input("Enter the 1st number:")
    num1 = int(num1)
    num2 = input("Enter the 2nd number:")
    num2 = int(num2)

    if num1 > num2:
        print("%d is biggest" % num1)
        num2 = num1
    else:
        print("%d is biggest" % num2)
        num1 = num2

# call the main function:
main()
```

**C version**

```c
/* C if-else example */
#include <stdio.h>

int main(void) {
    int num1, num2;

    printf("Enter the 1st number: ");
    scanf("%d", &num1);
    printf("Enter the 2nd number: ");
    scanf("%d", &num2);

    if (num1 > num2) {
        printf("%d is biggest\n", num1);
        num2 = num1;
    } else {
        printf("%d is biggest\n", num2);
        num1 = num2;
    }

    return 0;
}
```

The Python and C syntax for `if`-`else` statements is almost identical with only minor differences. In both, the `else` part is optional. Python and C also support multiway branching by chaining `if` and `else if` statements. The following describes the full `if`-`else` C syntax:

```c
    // a one-way branch:
    if ( <boolean expression> ) {
        <true body>
    }

    // a two-way branch:
    if ( <boolean expression> ) {
        <true body>
    }
    else {
        <false body>
    }

    // a multibranch (chaining if-else if-...-else)
    // (has one or more 'else if' following the first if):
    if ( <boolean expression 1> ) {
        <true body>
    }
    else if ( <boolean expression  2> ) {
        // first expression is false, second is true
        <true 2 body>
    }
    else if ( <boolean expression  3> ) {
        // first and second expressions are false, third is true
        <true 3 body>
    }
    // ... more else if's ...
    else if ( <boolean expression  N> ) {
        // first N-1 expressions are false, Nth is true
        <true N body>
    }
    else { // the final else part is optional
        // if all previous expressions are false
        <false body>
    }
```

### [](#_boolean_values_in_c)1.3.1. Boolean Values in C

C doesn’t provide a Boolean type with true or false values. Instead, integer values evaluate to **true** or **false** when used in conditional statements. When used in conditional expressions, any integer expression that is:

- **zero (0)** evaluates to **false**
- **nonzero (any positive or negative value)** evaluates to **true**

C has a set of relational and logical operators for Boolean expressions.

The **relational operators** take operand(s) of the same type and evaluate to zero (false) or nonzero (true). The set of relational operators are:

- equality (`==`) and inequality (not equal, `!=`)
- comparison operators: less than (``), and greater than or equal (`>=`)

Here are some C code snippets showing examples of relational operators:

```c
// assume x and y are ints, and have been assigned
// values before this point in the code

if (y < 0) {
    printf("y is negative\n");
} else if (y != 0) {
    printf("y is positive\n");
} else {
    printf("y is zero\n");
}

// set x and y to the larger of the two values
if (x >= y) {
    y = x;
} else {
    x = y;
}
```

C’s **logical operators** take integer "Boolean" operand(s) and evaluate to either zero (false) or nonzero (true). The set of logical operators are:

- logical negation (`!`)
- logical and (`&&`): stops evaluating at the first false expression (short-circuiting)
- logical or (`||`): stops evaluating at the first true expression (short-circuiting)

C’s **short-circuit** logical operator evaluation stops evaluating a logical expression as soon as the result is known. For example, if the first operand to a logical and (`&&`) expression evaluates to false, the result of the `&&` expression must be false. As a result, the second operand’s value need not be evaluated, and it is not evaluated.

The following is an example of conditional statements in C that use logical operators (it’s always best to use parentheses around complex Boolean expressions to make them easier to read):

```c
if ( (x > 10) && (y >= x) ) {
    printf("y and x are both larger than 10\n");
    x = 13;
} else if ( ((-x) == 10) || (y > x) ) {
    printf("y might be bigger than x\n");
    x = y * x;
} else {
    printf("I have no idea what the relationship between x and y is\n");
}
```

### [](#_loops_in_c)1.3.2. Loops in C

Like Python, C supports `for` and `while` loops. Additionally, C provides `do`-`while` loops.

#### [](#_while_loops)while Loops

The `while` loop syntax in C and Python is almost identical, and the behavior is the same. [Table 2](#TabWhileComparison) shows example programs of `while` loops in C and Python.

**Table 2. while Loop Syntax Comparison in Python and C**

**Python version**

```python
# Python while loop example

def main():

    num = input("Enter a value: ")
    num = int(num)
    # make sure num is not negative
    if num < 0:
        num = -num

    val = 1
    while val < num:
        print("%d" % (val))
        val = val * 2

# call the main function:
main()
```

**C version**

```c
/* C while loop example */
#include <stdio.h>

int main(void) {
    int num, val;

    printf("Enter a value: ");
    scanf("%d", &num);
    // make sure num is not negative
    if (num < 0) {
        num = -num;
    }
    val = 1;
    while (val < num) {
        printf("%d\n", val);
        val = val * 2;
    }

    return 0;
}
```

The `while` loop syntax in C is very similar in Python, and both are evaluated in the same way:

```c
while ( <boolean expression> ) {
    <true body>
}
```

The `while` loop checks the Boolean expression first and executes the body if true. In the preceding example program, the value of the `val` variable will be repeatedly printed in the `while` loop until its value is greater than the value of the `num` variable. If the user enters `10`, the C and Python programs will print:

```
1
2
4
8
```

C also has a `do`-`while` loop that is similar to its `while` loop, but it executes the loop body first and then checks a condition and repeats executing the loop body for as long as the condition is true. That is, a `do`-`while` loop will always execute the loop body at least one time:

```c
do {
    <body>
} while ( <boolean expression> );
```

For additional `while` loop examples, try these two programs:

- [whileLoop1.c](https://diveintosystems.org/book/C1-C_intro/_attachments/whileLoop1.c)
- [whileLoop2.c](https://diveintosystems.org/book/C1-C_intro/_attachments/whileLoop2.c)

#### [](#_for_loops)for Loops

The `for` loop is different in C than it is in Python. In Python, `for` loops are iterations over sequences, whereas in C, `for` loops are more general looping constructs. [Table 3](#TabForComparison) shows example programs that use `for` loops to print all the values between 0 and a user-provided input number:

**Table 3. for Loop Syntax Comparison in Python and C**

**Python version**

```python
# Python for loop example

def main():

    num = input("Enter a value: ")
    num = int(num)
    # make sure num is not negative
    if num < 0:
        num = -num

    for i in range(num):
        print("%d" % i)

# call the main function:
main()
```

**C version**

```c
/* C for loop example */
#include <stdio.h>

int main(void) {
    int num, i;

    printf("Enter a value: ");
    scanf("%d", &num);
    // make sure num is not negative
    if (num < 0) {
        num = -num;
    }

    for (i = 0; i < num; i++) {
        printf("%d\n", i);
    }

    return 0;
}
```

In this example, you can see that the C `for` loop syntax is quite different from the Python `for` loop syntax. It’s also evaluated differently.

The C `for` loop syntax is:

```c
for ( <initialization>; <boolean expression>; <step> ) {
    <body>
}
```

The `for` loop evaluation rules are:

1. Evaluate *initialization* one time when first entering the loop.
2. Evaluate the *boolean expression*. If it’s 0 (false), drop out of the `for` loop (that is, the program is done repeating the loop body statements).
3. Evaluate the statements inside the loop *body*.
4. Evaluate the *step* expression.
5. Repeat from step (2).

Here’s a simple example `for` loop to print the values 0, 1, and 2:

```c
int i;

for (i = 0; i < 3; i++) {
    printf("%d\n", i);
}
```

Executing the `for` loop evaluation rules on the preceding loop yields the following sequence of actions:

```
(1) eval init: i is set to 0  (i=0)
(2) eval bool expr: i < 3 is true
(3) execute loop body: print the value of i (0)
(4) eval step: i is set to 1  (i++)
(2) eval bool expr: i < 3 is true
(3) execute loop body: print the value of i (1)
(4) eval step: i is set to 2  (i++)
(2) eval bool expr: i < 3 is true
(3) execute loop body: print the value of i (2)
(4) eval step: i is set to 3  (i++)
(2) eval bool expr: i < 3 is false, drop out of the for loop
```

The following program shows a more complicated `for` loop example (it’s also [available to download](https://diveintosystems.org/book/C1-C_intro/_attachments/forLoop2.c)). Note that just because C supports `for` loops with a list of statements for its *initialization* and *step* parts, it’s best to keep it simple (this example illustrates a more complicated `for` loop syntax, but the `for` loop would be easier to read and understand if it were simplified by moving the `j += 10` step statement to the end of the loop body and having just a single step statement, `i += 1`).

```c
/* An example of a more complex for loop which uses multiple variables.
 * (it is unusual to have for loops with multiple statements in the
 * init and step parts, but C supports it and there are times when it
 * is useful...don't go nuts with this just because you can)
 */
#include <stdio.h>

int main(void) {
    int i, j;

    for (i=0, j=0; i < 10; i+=1, j+=10) {
        printf("i+j = %d\n", i+j);
    }

    return 0;
}

// the rules for evaluating a for loop are the same no matter how
// simple or complex each part is:
// (1) evaluate the initialization statements once on the first
//     evaluation of the for loop:  i=0 and j=0
// (2) evaluate the boolean condition: i < 10
//     if false (when i is 10), drop out of the for loop
// (3) execute the statements inside the for loop body: printf
// (4) evaluate the step statements:  i += 1, j += 10
// (5) repeat, starting at step (2)
```

In C, `for` loops and `while` loops are equivalent in power, meaning that any `while` loop can be expressed as a `for` loop, and vice versa. The same is not true in Python, where `for` loops are iterations over a sequence of values. As such, they cannot express some looping behavior that the more general Python `while` loop can express. Indefinite loops are one example that can only be written as a `while` loop in Python.

Consider the following `while` loop in C:

```c
int guess = 0;

while (guess != num) {
    printf("%d is not the right number\n", guess);
    printf("Enter another guess: ");
    scanf("%d", &guess);
}
```

This loop can be translated to an equivalent `for` loop in C:

```c
int guess;

for (guess = 0; guess != num; ) {
    printf("%d is not the right number\n", guess);
    printf("Enter another guess: ");
    scanf("%d", &guess);
}
```

In Python, however, this type of looping behavior can be expressed only by using a `while` loop.

Because `for` and `while` loops are equally expressive in C, only one looping construct is needed in the language. However, `for` loops are a more natural language construct for definite loops (like iterating over a range of values), whereas `while` loops are a more natural language construct for indefinite loops (like repeating until the user enters an even number). As a result, C provides both to programmers.
