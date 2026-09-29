---
title: "1. By the C, the Beautiful C"
lang: en
---

"By the Beautiful Sea", Carroll and Atteridge, 1914

This chapter presents an overview of C programming written for students who have some experience programming in another language. It’s specifically written for Python programmers and uses a few Python examples for comparison purposes ([Appendix 1](https://diveintosystems.org/book/Appendix1/index.html#_appendix_1_chapter_1_for_java_programmers) is a version of Chapter 1 for Java programmers). However, it should be useful as an introduction to C programming for anyone with basic programming experience in any language.

C is a high-level programming language like other languages you might know, such as Python, Java, Ruby, or C++. It’s an imperative and a procedural programming language, which means that a C program is expressed as a sequence of statements (steps) for the computer to execute and that C programs are structured as a set of functions (procedures). Every C program must have at least one function, the `main` function, which contains the set of statements that execute when the program begins.

The C programming language is less abstracted from the computer’s machine language than some other languages with which you might be familiar. This means that C doesn’t have support for object-oriented programming (like Python, Java, and C++) or have a rich set of high-level programming abstractions (such as strings, lists, and dictionaries in Python). As a result, if you want to use a dictionary data structure in your C program, you need to implement it yourself, as opposed to just importing the one that is part of the programming language (as in Python).

C’s lack of high-level abstractions might make it seem like a less appealing programming language to use. However, being less abstracted from the underlying machine makes C easier for a programmer to see and understand the relationship between a program’s code and the computer’s execution of it. C programmers retain more control over how their programs execute on the hardware, and they can write code that runs more efficiently than equivalent code written using the higher-level abstractions provided by other programming languages. In particular, they have more control over how their programs manage memory, which can have a significant impact on performance. Thus, C remains the *de facto* language for computer systems programming where low-level control and efficiency are crucial.

We use C in this book because of its expressiveness of program control and its relatively straightforward translation to assembly and machine code that a computer executes. This chapter introduces programming in C, beginning with an overview of its features. [Chapter 2](https://diveintosystems.org/book/C2-C_depth/index.html#_a_deeper_dive_into_c_programming) then describes C’s features in more detail.
