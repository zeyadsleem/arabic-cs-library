---
title: "2.9.1. Constants, switch, enum, and typedef"
lang: en
---

Constants, switch statements, enumerated types, and typedef are features of the C language that are useful for creating more readable code and maintainable code. Constants, enumerated types, and typedefs are used to define aliases for literal values and types in programs. Switch statements can be used in place of some chaining `if-else if` statements.

#### [](#_c_constants_)C Constants

A **constant** is an alias for a C literal value. Constants are used in place of the literal value to make code more readable and easier to modify. In C, constants are defined outside of a function body using the following syntax:

```c
#define const_name (literal_value)
```

Here is an example of a partial program that defines and uses three constants (`N`, `PI`, and `NAME`):

```c
#include <stdio.h>
#include <stdlib.h>

#define N    (20)        // N:  alias for the literal value 20
#define PI   (3.14)      // PI: alias for the literal value 3.14
#define NAME ("Sarita")  // NAME: alias for the string literal "Sarita"

int main(void) {
  int array[N];   // an array of 20 ints
  int *d_arr, i;
  double area, circ, radius;

  radius = 12.3;
  area = PI*radius*radius;
  circ = 2*PI*radius;

  d_arr = malloc(sizeof(int)*N);
  if(d_arr == NULL) {
    printf("Sorry, %s, malloc failed!\n", NAME);
    exit(1);
  }
  for(i=0; i < N; i++) {
    array[i] = i;
    d_arr[i] = i*2;
  }
  ...
```

Using constants makes the code more readable (in an expression, `PI` has more meaning than `3.14`). Using constants also makes code easier to modify. For example, to change the bounds of the arrays and the precision of the value of pi in the above program, the programmer only needs to change their constant definitions and recompile; all the code that uses the constant will use their new values. For example:

```c
#define N    (50)        // redefine N from 20 to 50
#define PI   (3.14159)   // redefine PI to higher precision

int main(void) {
  int array[N];  // now allocates an array of size 50
  ...
  area = PI*radius*radius;        // now uses 3.14159 for PI
  d_arr = malloc(sizeof(int)*N);  // now mallocs array of 50 ints
  ...
  for(i=0; i < N; i++) {    // now iterates over 50 elements
  ...
```

It is important to remember that constants are not lvalues—​they are aliases for literal values of C types. As a result, their values cannot be changed at runtime like those of variables. The following code, for example, causes a compilation error:

```c
#define N  20

int main(void) {
  ...
  N = 50;  // compilation error: `20 = 50` is not valid C
```

#### [](#_c_switch_)Switch statements

The C `switch` statement can be used in place of some, but not all, chaining `if`-`else if` code sequences. While `switch` doesn’t provide any additional expressive power to the C programming language, it often yields more concise code branching sequences. It may also allow the compiler to produce branching code that executes more efficiently than equivalent chaining `if`-`else if` code.

The C syntax for a `switch` statement looks like:

```c
switch (<expression>) {

   case <literal value 1>:
        <statements>;
        break;         // breaks out of switch statement body
   case <literal value 2>:
        <statements>;
        break;         // breaks out of switch statement body
   ...
   default:            // default label is optional
        <statements>;
}
```

A switch statement is executed as follows:

1. The `expression` evaluates first.
2. Next, the `switch` searches for a `case` literal value that matches the value of the expression.
3. Upon finding a matching `case` literal, it begins executing the statements that immediately follow it.
4. If no matching `case` is found, it will begin executing the statements in the `default` label if one is present.
5. Otherwise, no statements in the body of the `switch` statement get executed.

A few rules about `switch` statements:

- The value associated with each `case` must be a literal value — it *cannot* be an expression. The original expression gets matched for *equality* only with the literal values associated with each `case`.
- Reaching a `break` statement stops the execution of all remaining statements inside the body of the `switch` statement. That is, `break` breaks out of the body of the `switch` statement and continues execution with the next statement after the entire `switch` block.
- The `case` statement with a matching value marks the starting point into the sequence of C statements that will be executed — execution jumps to a location inside the `switch` body to start executing code. Thus, if there is no `break` statement at the end of a particular `case`, then the statements under the subsequent `case` statements execute in order until either a `break` statement is executed or the end of the body of the `switch` statement is reached.
- The `default` label is optional. If present, it must be at the end.

Here’s an example program with a `switch` statement:

```c
#include <stdio.h>

int main(void) {
    int num, new_num = 0;

    printf("enter a number between 6 and 9: ");
    scanf("%d", &num);

    switch(num) {
        case 6:
            new_num = num + 1;
            break;
        case 7:
            new_num = num;
            break;
        case 8:
            new_num = num - 1;
            break;
        case 9:
            new_num = num + 2;
            break;
        default:
            printf("Hey, %d is not between 6 and 9\n", num);
    }
    printf("num %d  new_num %d\n", num, new_num);
    return 0;
}
```

Here are some example runs of this code:

```
./a.out
enter a number between 6 and 9: 9
num 9  new_num 11

./a.out
enter a number between 6 and 9: 6
num 6  new_num 7

./a.out
enter a number between 6 and 9: 12
Hey, 12 is not between 6 and 9
num 12  new_num 0
```

#### [](#_enumerated_types)Enumerated Types

An **enumerated type** (`enum`) is a way to define a group of related integer constants. Often switch statements and enumerated types are used together.

The enumerated type should be defined outside of a function body, using the following syntax (`enum` is a keyword in C):

```c
enum type_name {
   CONST_1_NAME,
   CONST_2_NAME,
   ...
   CONST_N_NAME
};
```

Note that the constant fields are specified by a comma separated list of names and are not explicitly given values. By default, the first constant in the list is assigned the value 0, the second the value 1, and so on.

Below is an example of defining an enumerated type for the days of the week:

```c
enum days_of_week {
   MON,
   TUES,
   WED,
   THURS,
   FRI
};
```

A variable of an enumerated type value is declared using the type name `enum type_name`, and the constant values it defines can be used in expressions. For example:

```c
enum days_of_week day;

day = THURS;

if (day > WED) {
  printf("The weekend is arriving soon!\n");
}
```

An enumerated types is similar to defining a set of constants using `#define` like the following:

```c
#define MON    0
#define TUES   1
#define WED    2
#define THURS  3
#define FRI    4
```

The constant values in the enumerated type can be used in a similar way as constants are used to make a program easier to read and code easier to update. However, an enumerated type has an advantage of grouping together a set of related integer constants together. It also is a type definition so variables and parameters can be declared to be an enumerated type, whereas constants are aliases for literal values. In addition, in enumerated types the specific values of each constant is implicitly assigned in sequence starting at `0`, so the programmer doesn’t have to specify each constant’s value.

Another nice feature of enumerated types is that it is easy to add or remove constants from the set without having to change all their values. For example, if the user wanted to add Saturday and Sunday to the set of days and maintain the relative ordering of the days, they can add them to the enumerated type definition without having to explicitly redefine the values of the others as they would need to do with `#define` constant definitions:

```c
enum days_of_week {
   SUN,        // SUN will now be 0
   MON,        // MON will now be 1, and so on
   TUES,
   WED,
   THURS,
   FRI,
   SAT
};
```

Although values are implicitly assigned to the constants an enumerated type, the programmer can also assign specific values to them using `= val` syntax. For example, if the programmer wanted the values of the days of the week to start at 1 instead of 0, they could do the following:

```c
enum days_of_week {
   SUN = 1,  // start the sequence at 1
   MON,      // this is 2 (next value after 1)
   TUES,     // this is 3, and so on
   WED,
   THURS,
   FRI,
   SAT
};
```

Because an enumerated type defines aliases for a set of `int` literal values, the value of an enumerated type prints out as its `int` value and not as the name of the alias. For example, given the above definition of the `enum days_of_week`, the following prints `3` not the string `"TUES"`:

```c
enum days_of_week day;

day = TUES;
printf("Today is %d\n", day);
```

Enumerated types are often used in combination with switch statements as shown in the example code below. The example also shows a switch statement with several cases associated with the same set of statements, and a case statement that does not have a `break` before the next case statement (when `val` is `FRI` two `printf` statements are executed before a `break` is encountered, and when `val` is `MON` or `WED` only one of the `printf` statements is executed before the `break`):

```c
// an int because we are using scanf to assign its value
int val;

printf("enter a value between %d and %d: ", SUN, SAT);
scanf("%d", &val);

switch (val) {
  case FRI:
     printf("Orchestra practice today\n");
  case MON:
  case WED:
     printf("PSYCH 101 and CS 231 today\n");
     break;
  case TUES:
  case THURS:
     printf("Math 311 and HIST 140 today\n");
     break;
  case SAT:
     printf("Day off!\n");
     break;
  case SUN:
     printf("Do weekly pre-readings\n");
     break;
  default:
     printf("Error: %d is not a valid day\n", val);
};
```

#### [](#_typedef)typedef

C provides a way to define a new type that is an alias for an existing type using the keyword `typedef`. Once defined, variables can be declared using this new alias for the type. This feature is commonly used to make the program more readable and to use shorter type names, often for structs and enumerated types. The following is the format for defining a new type with `typedef`:

```c
typedef existing_type_name new_type_alias_name;
```

Here is an example partial program that uses typedefs:

```c
#define MAXNAME  (30)
#define MAXCLASS (40)

enum class_year {
  FIRST = 1,
  SECOND,
  JUNIOR,
  SENIOR,
  POSTGRAD
};

// classYr is an alias for enum class_year
typedef enum class_year classYr;

struct studentT {
  char name[MAXNAME];
  classYr year;     // use classYr type alias for field type
  float gpa;
};

// studentT is an alias for struct studentT
typedef struct studentT  studentT;

// ull is an alias for unsigned long long
typedef unsigned long long ull;

int main(void) {

  // declare variables using typedef type names
  studentT class[MAXCLASS];
  classYr yr;
  ull num;

  num = 123456789;
  yr = JUNIOR;
  strcpy(class[0].name, "Sarita");
  class[0].year = SENIOR;
  class[0].gpa = 3.75;

  ...
```

Because typedef is often used with structs, C provides syntax for combining a typedef and a struct definition together by prefixing the struct definition with `typedef` and listing the name of the type alias after the closing `}` in the struct definition. For example, the following defines both a struct type `struct studentT` and an alias for the type named `studentT`:

```c
typedef struct studentT {
  char name[MAXNAME];
  classYr year;     // use classYr type alias for field type
  float gpa;
} studentT;
```

This definition is equivalent to doing the typedef separately, after the the struct definition as in the previous example.
