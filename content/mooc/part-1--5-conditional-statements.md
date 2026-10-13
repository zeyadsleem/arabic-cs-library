---
title: "Conditional statements"
lang: ar
source: "https://programming-26.mooc.fi/part-1/5-conditional-statements"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to use a simple conditional statement in programming
- You will know what a Boolean value is
- You will be able to express conditionals with comparison operators

</text-box>

Thus far, every program we have written has been executed line by line in order. Instead of executing every line of code every single time a program is run, it is often useful to create sections of the program which are only executed in certain situations.

For example, the following code checks whether the user is of age:

```python
age = int(input("How old are you? "))

if age > 17:
    print("You are of age!")
    print("Here's a copy of GTA6 for you.")

print("Next customer, please!")
```

When the user is over the age of 17, the execution of the program should look like this:


```
How old are you? **18**
You are of age!
Here's a copy of GTA6 for you.
Next customer, please!
```


If the user is 17 or under, only this is printed out:


```
How old are you? **16**
Next customer, please!
```


These examples show us that the value given as input affects which parts of the program are executed. The program contains a _conditional statement_ with a block of code which is executed only if the condition in the statement is true.

<img src="1_5_1.png">

In a conditional statement the keyword `if` is followed by a _condition_, such as a comparison of two values. The code block following this header line is only executed if the condition is true.

Notice the colon character following the `if` header. In the following code there is no colon:

```python
age = 10

# no colon at the end of the following line
if age > 17
    print("You are of age.")
```

Upon execution this causes an error:


```
File "program.py", line 3
  if age > 17
            ^
SyntaxError: invalid syntax
```


## Comparison o... (truncated)
