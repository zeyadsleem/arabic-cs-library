---
title: "Counting Multisets"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_counting-multisets.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.5 Counting Multisets

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_counting-multisets-7-1-1)

1. Identify counting problems whose outcomes can be represented by multisets.[🔗](#sec_counting-multisets-7-2-1-1) [🔗](#sec_counting-multisets-7-2-1)
2. Represent outcomes of counting problems using multisets and sticks and stones diagrams.[🔗](#sec_counting-multisets-7-2-2-1) [🔗](#sec_counting-multisets-7-2-2)
3. Solve counting problems using sticks and stones.[🔗](#sec_counting-multisets-7-2-3-1) [🔗](#sec_counting-multisets-7-2-3)

[🔗](#sec_counting-multisets-7)

### Subsection Section Preview

#### Investigate!

Skittles come in five “flavors”. How many different handfuls of 8 skittles are possible?[🔗](#investigate-counting-multisets-1) Suppose you have baked 8 identical cupcakes to give to your top five favorite discrete math teachers. How many ways can you distribute the cupcakes?[🔗](#investigate-counting-multisets-2) Why are the answers to the two counting questions above the same?[🔗](#investigate-counting-multisets-3) [🔗](#investigate-counting-multisets)We know how to solve lots of types of counting problems now. If each outcome in a set of outcomes we are counting can be represented by a sequence, we count it as a permutation (if the terms in the sequence don’t repeat) or use the product principle (if they do). If we are counting outcomes for which we don’t distinguish between different arrangements of the terms (if order doesn’t matter) then we think of the outcome as a set and count it as a combination. However, sets never allow an element to be repeated; each element is either in a set or not.[🔗](#sec_counting-multisets-8-3) So we have a glaring hole in our counting repertoire. What if we want to count outcomes that are collections of terms for which we do not distinguish between the order the terms appear in, but can contain terms more than once? In other words, how can we complete the following table?[🔗](#sec_counting-multisets-8-4)

|  | Distinguished Arrangements? |  |
| --- | --- | --- |
|  | Yes | No |
| Repeats OK | Sequences Prod. Principle \(n^k\) |  |
| No repeats | Sequences Permutations \(P(n,k)\) | Sets Combinations \(\binom{n}{k}\) |

What we want to count are some sort of set-like structure but one that *does* permit elements in the set to appear more than once. Such structures are called multisets.[🔗](#sec_counting-multisets-8-6)

#### Definition 3.5.1.

A multiset is an unordered collection of elements, each of which can appear any number of times. The number of times an element appears is called its multiplicity.[🔗](#def-multiset-1-1) Multisets are written using the same notation as sets: a comma-separated list in braces, such as \(\{1, 2, 2, 5\}\text{.}\)[🔗](#def-multiset-1-2) [🔗](#def-multiset)In this section, we will explore how multisets can be used to represent a wide range of counting problems. We will then develop a way to translate multisets into a special type of bit-string so that we can use the numbers in Pascal’s triangle to count the number of multisets.[🔗](#sec_counting-multisets-8-8)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-couting-multisets)

#### 1.

Activate Find a collection of identical objects, perhaps pennies or sugar cubes. Also grab a few dividers, which could be toothpicks, matches, or pens.[🔗](#extracted-webwork-127-1-1-1) Line up the pennies in a single row. We will divide the row into some number of groups by placing the toothpicks in the spaces between the pennies. We will distinguish between which order the groups come in. For example, two different ways to divide 7 pennies into 4 groups would look like this:[🔗](#extracted-webwork-127-1-1-2) ![two rows of 7 pennies separated into 4 groups with 3 sticks](generated/webwork/images/webwork-127-image-1.svg) We will allow for one or more groups to contain no pennies (by having two toothpicks next to each other or before or after all of the pennies).[🔗](#extracted-webwork-127-1-1-4) By lining up the correct number of pennies and sticks, count the number of ways you can divide a row of pennies into the given number of groups.[🔗](#extracted-webwork-127-1-1-5)

#### (a)

If you want to divide a row of pennies into 4 groups, how many toothpicks will you need?[🔗](#extracted-webwork-127-1-2-1-1) [🔗](#extracted-webwork-127-1-2)

#### (b)

How many ways are there to separate a row of three pennies into two groups?[🔗](#extracted-webwork-127-1-3-1-1) [🔗](#extracted-webwork-127-1-3)

#### (c)

How many ways are there to separate a row of four pennies into two groups?[🔗](#extracted-webwork-127-1-4-1-1) [🔗](#extracted-webwork-127-1-4)

#### (d)

How many ways are there to separate a row of five pennies into two groups?[🔗](#extracted-webwork-127-1-5-1-1) [🔗](#extracted-webwork-127-1-5)

#### (e)

How many ways are there to separate a row of three pennies into three groups?[🔗](#extracted-webwork-127-1-6-1-1) [🔗](#extracted-webwork-127-1-6)

#### (f)

How many ways are there to separate a row of four pennies into three groups?[🔗](#extracted-webwork-127-1-7-1-1) [🔗](#extracted-webwork-127-1-7)

#### (g)

How many ways are there to separate a row of five pennies into three groups?[🔗](#extracted-webwork-127-1-8-1-1) [🔗](#extracted-webwork-127-1-8)

#### (h)

Based on your answers above, make a conjecture about how many ways you could separate a row of seven pennies into four groups.[🔗](#extracted-webwork-127-1-9-1-1) Hint. Look for the numbers you found in the previous questions in Pascal’s triangle.[🔗](#extracted-webwork-127-1-9-2-1) [🔗](#extracted-webwork-127-1-9-2) [🔗](#extracted-webwork-127-1-9) [🔗](#pa-counting-multisets)[🔗](#PA-couting-multisets)[🔗](#sec_counting-multisets-8)

### Subsection Have Some Cookies

Consider the following counting problem:[🔗](#subsec-cookies-kids-2)

> You have 7 cookies to give to 4 kids. How many ways can you do this?[🔗](#subsec-cookies-kids-3-1)
> > [🔗](#subsec-cookies-kids-3)

Take a moment to think about how you might solve this problem. You may assume that it is acceptable to give a kid no cookies. Also, the cookies are all identical and the order in which you give out the cookies does not matter (so giving cookies to the second kid before the first kid does not count as a separate outcome as the other way around).[🔗](#subsec-cookies-kids-4) Before solving the problem, here is a wrong answer: You might guess that the answer should be \(4^7\) because, for each of the 7 cookies, there are 4 choices of kids to which you can give the cookie. This is reasonable, but wrong. To see why, consider a few possible outcomes: We could assign the first six cookies to kid A, and the seventh cookie to kid B. Another outcome would assign the first cookie to kid B and the six remaining cookies to kid A. Both outcomes are included in the \(4^7\) answer. But for our counting problem, both outcomes are really the same – kid A gets six cookies and kid B gets one cookie. This would have been the correct answer if the cookies were all different, but they are not.[🔗](#subsec-cookies-kids-5) What do outcomes actually look like? How can we represent them? One approach would be to write an outcome as a string of four numbers like this: \begin{equation*} 3112\text{,} \end{equation*} which represents the outcome in which the first kid gets 3 cookies, the second and third kids each get 1 cookie, and the fourth kid gets 2 cookies. Represented this way, the order in which the numbers occur matters. 1312 is a different outcome, because the first kid gets one cookie instead of 3. Each number in the string can be any integer between 0 and 7. But the answer is not \(7^4\text{.}\) We need the *sum* of the numbers to be 7. [🔗](#subsec-cookies-kids-6) Another way we might represent outcomes is to write a string of seven letters: \begin{equation*} \text{ABAADCD}\text{,} \end{equation*} which represents that the first cookie goes to kid A, the second cookie goes to kid B, the third and fourth cookies go to kid A, and so on. In fact, this outcome is identical to the previous one—A gets 3 cookies, B and C get 1 each, and D gets 2. Each of the seven letters in the string can be any of the 4 possible letters (one for each kid), but the number of such strings is not \(4^7\text{,}\) because here order does *not* matter. In fact, another way to write the same outcome is \begin{equation*} \text{AAABCDD}\text{.} \end{equation*} [🔗](#subsec-cookies-kids-7) This will be the preferred representation of the outcome. Since we can write the letters in any order, we might as well write them in *alphabetical* order for the purposes of counting. So we will write all the A’s first, then all the B’s, and so on. In fact, since we do not distinguish between the different arrangements, it is like we are writing a set, just that this multiset can contain an element more than one time.[🔗](#subsec-cookies-kids-8) So we now have two useful ways to think of the outcomes.

1. As a multiset containing 7 elements, each of which is one of the four kids (or letter representing their names). For example, \begin{equation*} \{A, A, A, B, C, D, D\}\text{.} \end{equation*} Each time a kid is in the multiset, it means that kid gets a cookie, so the multiplicity of the kid in the multiset is the number of cookies the kid gets. [🔗](#subsec-cookies-kids-9-1-1-1) [🔗](#subsec-cookies-kids-9-1-1)
2. As a string of 4 non-negative numbers with a sum of 7. For example, \begin{equation*} 3112\text{.} \end{equation*} The position of the number in the string represents the kid, and the number itself represents the number of cookies that kid gets. [🔗](#subsec-cookies-kids-9-1-2-1) [🔗](#subsec-cookies-kids-9-1-2)

[🔗](#subsec-cookies-kids-9) Before we think about how to count the number of outcomes represented this way, here are a couple more examples of counting problems we can represent in these ways.[🔗](#subsec-cookies-kids-10)

#### Example 3.5.2.

You grab a handful of ten jelly beans from a bag that contains six flavors. Write down three possible outcomes using both multisets and strings of numbers.[🔗](#subsec-cookies-kids-11-1-1) Solution. Multisets are the more natural way to think of this problem since each handful is a multiset of flavors. So for example we could have, \begin{equation*} \{R, R, G, G, G, B, B, B, B, Y\} \end{equation*} meaning you got two red, three green, four blue, and one yellow jelly bean (and no purple or orange), or \begin{equation*} \{R, R, R, R, R, R, R, R, R, R\} \end{equation*} which means you got ten red jelly beans. You could also have \begin{equation*} \{R, G, B, Y, P, O, O, O, O, O\} \end{equation*} meaning you have one each of red, green, blue, and yellow, and five orange jelly beans. [🔗](#subsec-cookies-kids-11-2-1) The corresponding sequences of six numbers summing to 10 are \begin{equation*} 2,3,4,1,0,0; \qquad 10,0,0,0,0,0; \qquad 1,1,1,1,1,5\text{.} \end{equation*} (We added commas between numbers since not every number is a single digit.) Notice that for this representation we need to agree on a fixed order of the flavors, which was not alphabetical in this case, but the same order we used when listing the multisets. [🔗](#subsec-cookies-kids-11-2-2) [🔗](#subsec-cookies-kids-11-2) [🔗](#subsec-cookies-kids-11)

#### Example 3.5.3.

You have 12 identical copies of your favorite Discrete Math book that you want to put on 5 bookshelves. Write down three possible outcomes using both multisets and strings of numbers.[🔗](#subsec-cookies-kids-12-1-1) Solution. Here the sequences of numbers are more natural, since we can just say how many books go on each shelf. We will need 5 numbers that add up to 12. For example, we could have

1. \(3,3,3,2,1\text{,}\) meaning 3 books on the first shelf, 3 on the second, 3 on the third, 2 on the fourth, and 1 on the fifth.[🔗](#subsec-cookies-kids-12-2-1-1-1-1) [🔗](#subsec-cookies-kids-12-2-1-1-1)
2. \(0,0,12,0,0\text{,}\) meaning all 12 books are on the middle shelf.[🔗](#subsec-cookies-kids-12-2-1-1-2-1) [🔗](#subsec-cookies-kids-12-2-1-1-2)
3. \(1,1,1,1,8\text{,}\) meaning one book on each of the first four shelves and 8 on the last.[🔗](#subsec-cookies-kids-12-2-1-1-3-1) [🔗](#subsec-cookies-kids-12-2-1-1-3)

[🔗](#subsec-cookies-kids-12-2-1) The corresponding multisets are

1. \(\{1,1,1,2,2,2,3,3,3,4,4,5\}\text{,}\) meaning shelf 1 is assigned a book three times, shelf 2 is assigned a book three times, etc. Notice that there are 12 elements in the multiset, one for each book. The numbers here represent the shelves; the multiplicity of the number is the number of books on that shelf.[🔗](#subsec-cookies-kids-12-2-2-1-1-1) [🔗](#subsec-cookies-kids-12-2-2-1-1)
2. \(\{3,3,3,3,3,3,3,3,3,3,3,3\}\text{.}\) The only shelf in the multiset is shelf 3, with multiplicity 12, meaning that shelf 3 gets 12 books.[🔗](#subsec-cookies-kids-12-2-2-1-2-1) [🔗](#subsec-cookies-kids-12-2-2-1-2)
3. \(\{1,2,3,4,5,5,5,5,5,5,5,5\}\text{.}\) Here shelf 1 gets one book, shelf 2 gets one book, shelf 3 gets one book, shelf 4 gets one book, and shelf 5 gets the rest.[🔗](#subsec-cookies-kids-12-2-2-1-3-1) [🔗](#subsec-cookies-kids-12-2-2-1-3)

[🔗](#subsec-cookies-kids-12-2-2) [🔗](#subsec-cookies-kids-12-2) [🔗](#subsec-cookies-kids-12)This last example could also have been asked as a question about solving equations with non-negative integer solutions. In particular, we could have asked for solutions to the equation \(a+b+c+d+e = 12\text{.}\) Think of each variable as saying how many books go on each shelf. We will ask questions directly like this, but realizing how to represent other questions as such an equation can be useful.[🔗](#subsec-cookies-kids-13) [🔗](#subsec-cookies-kids)

### Subsection Representing Multisets with Bit Strings

Now let’s return to the original problem of distributing 7 cookies to 4 kids and actually count the number of outcomes.[🔗](#subsec-representing-multisets-with-bit-strings-2) When we were counting plain old sets, we saw that the numbers in Pascal’s triangle gave us the counts. In fact, we saw this was true because we could represent each set as a bit string. Whenever an element was in the set, we would denote that with a 1, and if the element was not in the set, we would mark its absence with a 0.[🔗](#subsec-representing-multisets-with-bit-strings-3) This is essentially what we did with multisets but had to use strings of non-negative numbers beyond just 0 and 1, since an element in a multiset can appear more than 0 or 1 times. But if we could translate those strings of numbers into some other sort of bit string, then we could use Pascal’s triangle to count the number of multisets.[🔗](#subsec-representing-multisets-with-bit-strings-4) Here is how we can do this. Given a multiset such as \begin{equation*} \{A, A, A, B, C, D, D\} \end{equation*} we have a number sequence representation as \begin{equation*} 3,1,1,2\text{.} \end{equation*} Well, instead of individual numbers, write each as a sequence of that many 1s. So this example becomes \begin{equation*} 111,1,1,11\text{.} \end{equation*} This is slightly awkward since we are using commas to separate the numbers. To make this clearer, let’s switch to two different symbols. We will call them sticks and stones, where the stone represents a 1 and the stick represents a comma. So the sequence \begin{equation*} 111,1,1,11 \end{equation*} becomes \begin{equation*} \o\o\o|\o|\o|\o\o\text{.} \end{equation*} This is a string of ten symbols, 7 of which are stones and 3 of which are sticks. [🔗](#subsec-representing-multisets-with-bit-strings-5) This is fantastic! Whatever two symbols we use (you might also see these called stars and bars or balls and bins), we can use Pascal’s triangle to count the number of ways to arrange them. The number of 10-bit strings of weight 3 (or weight 7) is \(\binom{10}{3} = 120\text{.}\)[🔗](#subsec-representing-multisets-with-bit-strings-6) In terms of cookies, we can view this sticks and stones diagram as saying after how many cookies we stop giving cookies to the first kid and start giving cookies to the second kid. And then after how many do we switch to the third kid? And after how many do we switch to the fourth? So \begin{equation*} \o\o\o|\o|\o|\o\o \end{equation*} means three cookies go to the first kid; then we switch and give one cookie to the second kid, then switch, one to the third kid, switch, two to the fourth kid. Notice that we need 7 stones and 3 sticks – one stone for each cookie, and one stick for each switch between kids, so one fewer sticks than there are kids (we don’t need to switch after the last kid – we are done). [🔗](#subsec-representing-multisets-with-bit-strings-7) While we are at it, we can also answer a related question: How many ways are there to distribute 7 cookies to 4 kids so that each kid gets at least one cookie? What can you say about the corresponding sticks and stones charts? The charts must start and end with at least one stone (so that kids A and D) get cookies, and also no two sticks can be adjacent (so that kids B and C are not skipped). One way to ensure this is to place sticks only in the spaces *between* the stones. With 7 stones, there are 6 spots between the stones, so we must choose 3 of those 6 spots to fill with bars. Thus there are \({6 \choose 3}\) ways to distribute 7 cookies to 4 kids giving at least one cookie to each kid.[🔗](#subsec-representing-multisets-with-bit-strings-8) Another (and more general) way to approach this modified problem is to first give each kid one cookie. Now the remaining 3 cookies can be distributed to the 4 kids without restrictions. So we have 3 stones and 3 sticks for a total of 6 symbols, 3 of which must be bars. So again we see that there are \({6 \choose 3}\) ways to distribute the cookies.[🔗](#subsec-representing-multisets-with-bit-strings-9) Sticks and stones can be used in counting problems other than kids and cookies. Here are a few examples:[🔗](#subsec-representing-multisets-with-bit-strings-10)

#### Example 3.5.4.

Your favorite mathematical ice cream parlor offers 10 flavors. How many milkshakes could you create using exactly 6, not necessarily distinct scoops? The order you add the flavors does not matter (they will be blended up anyway), but you are allowed repeats. So one possible shake is triple chocolate, double cherry, and mint chocolate chip.[🔗](#subsec-representing-multisets-with-bit-strings-11-2-1) Solution. We get six scoops, each of which could be one of ten possible flavors. Represent each scoop as a star. Think of going down the counter one flavor at a time: You see vanilla first, and skip to the next, chocolate. You say yes to chocolate three times (use three stones), then switch to the next flavor. You keep skipping until you get to cherry, which you say yes to twice. Another switch and you are at mint chocolate chip. You say yes once. Then you keep switching until you get past the last flavor, never saying yes again (since you already have said yes six times). There are ten flavors to choose from, so we must switch from considering one flavor to the next nine times. These are the nine bars.[🔗](#subsec-representing-multisets-with-bit-strings-11-3-1) Now that we are confident that we have the right number of sticks and stones, we answer the question simply: There are 6 stones and 9 bars, so 15 symbols. We need to pick 9 of them to be bars, so the number of milkshakes possible is \begin{equation*} \binom{15}{9}\text{.} \end{equation*} [🔗](#subsec-representing-multisets-with-bit-strings-11-3-2) [🔗](#subsec-representing-multisets-with-bit-strings-11-3) [🔗](#subsec-representing-multisets-with-bit-strings-11)

#### Example 3.5.5.

How many 7 digit phone numbers are there in which the digits are non-increasing? That is, every digit is less than or equal to the previous one.[🔗](#subsec-representing-multisets-with-bit-strings-12-1-1) Solution. We need to decide on 7 digits, so we will use 7 stones. The sticks will represent a switch from each possible single-digit number down to the next smaller one. So the phone number 866-5221 is represented by the sticks and stones chart \begin{equation*} |\o||\o\o|\o|||\o\o|\o|\text{.} \end{equation*} [🔗](#subsec-representing-multisets-with-bit-strings-12-2-1) There are 10 choices for each digit (0-9), so we must switch between choices 9 times. We have 7 stones and 9 bars, so the total number of phone numbers is \begin{equation*} {16 \choose 9}\text{.} \end{equation*} [🔗](#subsec-representing-multisets-with-bit-strings-12-2-2) [🔗](#subsec-representing-multisets-with-bit-strings-12-2) [🔗](#subsec-representing-multisets-with-bit-strings-12)

#### Example 3.5.6.

How many integer solutions are there to the equation \begin{equation*} x_1 + x_2 + x_3 + x_4 + x_5 = 13\text{.} \end{equation*} [🔗](#example-multisets-int-sol-2-1) (An integer solution to an equation is a solution in which the unknown must have an integer value.)[🔗](#example-multisets-int-sol-2-2)

1. where \(x_i \ge 0\) for each \(x_i\text{?}\)[🔗](#example-multisets-int-sol-2-3-1-1-1) [🔗](#example-multisets-int-sol-2-3-1-1)
2. where \(x_i > 0\) for each \(x_i\text{?}\)[🔗](#example-multisets-int-sol-2-3-1-2-1) [🔗](#example-multisets-int-sol-2-3-1-2)
3. where \(x_i \ge 2\) for each \(x_i\text{?}\)[🔗](#example-multisets-int-sol-2-3-1-3-1) [🔗](#example-multisets-int-sol-2-3-1-3)

[🔗](#example-multisets-int-sol-2-3) Solution. This problem is just like giving 13 cookies to 5 kids. We need to say how many of the 13 units go to each of the 5 variables. In other words, we have 13 stones and 4 bars (the sticks are like the “+” signs in the equation).[🔗](#example-multisets-int-sol-3-1)

1. If \(x_i\) can be 0 or greater, we are in the standard case with no restrictions. So 13 stones and 4 sticks can be arranged in \({17 \choose 4}\) ways.[🔗](#example-multisets-int-sol-3-2-1-1-1) [🔗](#example-multisets-int-sol-3-2-1-1)
2. Now each variable must be at least 1. So give one unit to each variable to satisfy that restriction. Now there are 8 stones left, and still 4 bars, so the number of solutions is \({12 \choose 4}\text{.}\)[🔗](#example-multisets-int-sol-3-2-1-2-1) [🔗](#example-multisets-int-sol-3-2-1-2)
3. Now each variable must be 2 or greater. So before any counting, give each variable 2 units. We now have 3 remaining stones and 4 bars, so there are \({7 \choose 4}\) solutions.[🔗](#example-multisets-int-sol-3-2-1-3-1) [🔗](#example-multisets-int-sol-3-2-1-3)

[🔗](#example-multisets-int-sol-3-2) [🔗](#example-multisets-int-sol-3) [🔗](#example-multisets-int-sol)

#### Counting with Functions.

Many of the counting problems in this section might at first appear to be examples of counting *functions*. After all, when we try to count the number of ways to distribute cookies to kids, we are assigning each cookie to a kid, just like you assign elements of the domain of a function to elements in the codomain. However, the number of ways to assign 7 cookies to 4 kids is \({10 \choose 7} = 120\text{,}\) while the number of functions \(f: \{1,2,3,4,5,6,7\} \to \{a,b,c,d\}\) is \(4^7 = 16384\text{.}\) What is going on here?[🔗](#subsec-representing-multisets-with-bit-strings-14-3) When we count functions, we consider the following two functions, for example, to be different: \begin{equation*} f = \twoline{1 \amp 2 \amp 3 \amp 4\amp 5 \amp 6 \amp 7}{a \amp b \amp c \amp c \amp c \amp c \amp c} \qquad g = \twoline{1 \amp 2 \amp 3 \amp 4\amp 5 \amp 6 \amp 7}{b \amp a \amp c \amp c \amp c \amp c \amp c}\text{.} \end{equation*} But these two functions would correspond to the *same* cookie distribution: Kids \(a\) and \(b\) each get one cookie, and kid \(c\) gets the rest (and none for kid \(d\)). [🔗](#subsec-representing-multisets-with-bit-strings-14-4) The point: Elements of the domain are distinguished, but cookies are indistinguishable. This is analogous to the distinction between permutations (like counting functions) and combinations (not).[🔗](#subsec-representing-multisets-with-bit-strings-14-5) [🔗](#subsec-representing-multisets-with-bit-strings-14)[🔗](#subsec-representing-multisets-with-bit-strings)

### Reading Questions Reading Questions

#### 1.

Which of the following counting questions are NOT an example of a question you would use sticks and stones to solve?[🔗](#rq-counting-multisets-nonex-1-1)

- How many ways can you distribute six unique gifts to three friends?
- Correct. Because the gifts are distinct, we have three choices for the first gift, three for the second, etc, making the answer \(3^6\text{.}\)
- How many ways can you distribute six identical gifts to three friends?
- You can use sticks and stones here: use two sticks to separate your three friends, and use six stones for the gifts.
- How many different combinations of numbers can you get if you roll three identical 6-side dice?
- Use five sticks to separate the six values on the dice. Each stone represents one of the identical dice.
- How many different three-scoop milkshakes can you make when each scoop of ice cream can be one of six different flavors?
- Use five sticks and three stones!

[🔗](#rq-counting-multisets-nonex)

#### 2.

When you count outcomes using sticks and stones, does order matter? Do you allow repeats? What do you mean by your answers (the order of what, the repeat of what)?[🔗](#rq-counting-multisets-order-repeats-1-1) [🔗](#rq-counting-multisets-order-repeats)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-counting-multisets-q-1-1) [🔗](#rq-counting-multisets-q)[🔗](#rqs-counting-multisets)

### Exercises Practice Problems

#### 1.

Activate A multiset is a collection of objects, just like a set, but can contain an object more than once (the order of the elements still doesn’t matter). For example, \(\{1,1, 2, 5, 5, 7\}\) is a multiset of size 6.

1. How many *sets* of size 5 can be made using the 10 numeric digits 0 through 9?[🔗](#extracted-webwork-128-1-1-1-3-1-1) [🔗](#extracted-webwork-128-1-1-1-3-1)
2. How many *multi*sets of size 5 can be made using the 10 numeric digits 0 through 9?[🔗](#extracted-webwork-128-1-1-1-3-2-1) [🔗](#extracted-webwork-128-1-1-1-3-2)

[🔗](#extracted-webwork-128-1-1-1) [🔗](#ww-sb-multisets)

#### 2.

Activate Using the digits 2 through 7, find the number of different 5-digit numbers such that:

1. Digits cannot be repeated and must be written in increasing order. (*Increasing* means *strictly* increasing. For example, the digits of 134 are increasing, but the digits of 133 are not.)[🔗](#extracted-webwork-129-1-1-1-1-1-1) [🔗](#extracted-webwork-129-1-1-1-1-1)
2. Digits *can* be repeated and must be written in *non-decreasing* order. (Now the digits don’t need to be strictly increasing; 133 has digits non-decreasing.)[🔗](#extracted-webwork-129-1-1-1-1-2-1) [🔗](#extracted-webwork-129-1-1-1-1-2)

[🔗](#extracted-webwork-129-1-1-1) [🔗](#ww-sb-digits)

#### 3.

Activate After gym class you are tasked with putting the 21 identical dodgeballs away into 10 bins.

1. How many ways can you do this if there are no restrictions?[🔗](#extracted-webwork-130-1-1-1-1-1-1) [🔗](#extracted-webwork-130-1-1-1-1-1)
2. How many ways can you do this if each bin must contain at least one dodgeball?[🔗](#extracted-webwork-130-1-1-1-1-2-1) [🔗](#extracted-webwork-130-1-1-1-1-2)

[🔗](#extracted-webwork-130-1-1-1) [🔗](#ww-sb-balls)

#### 4.

Activate How many integer solutions are there to the equation \(x + y + z = 11\) for which

1. \(x\text{,}\) \(y\text{,}\) and \(z\) are all positive?[🔗](#extracted-webwork-131-1-1-1-2-1-1) [🔗](#extracted-webwork-131-1-1-1-2-1)
2. \(x\text{,}\) \(y\text{,}\) and \(z\) are all non-negative?[🔗](#extracted-webwork-131-1-1-1-2-2-1) [🔗](#extracted-webwork-131-1-1-1-2-2)
3. \(x\text{,}\) \(y\text{,}\) and \(z\) are all greater than or equal to \(-3\text{.}\)[🔗](#extracted-webwork-131-1-1-1-2-3-1) [🔗](#extracted-webwork-131-1-1-1-2-3)

[🔗](#extracted-webwork-131-1-1-1) [🔗](#ww-sb-sums)

#### 5.

Activate When playing Yahtzee, you roll five regular 6-sided dice. How many different outcomes are possible from a single roll? The order of the dice does not matter.[🔗](#extracted-webwork-132-1-1-1) When playing Super-Yahtzee, you roll 6 regular 5-sided dice. Now how any different outcomes are possible from a single roll?[🔗](#extracted-webwork-132-1-1-2) [🔗](#ww-sb-yahtzee)

#### 6.

Activate Your friend tells you she has 11 coins in her hand (just pennies, nickels, dimes, and quarters). If you guess how many of each kind of coin she has, she will give them to you. If you guess randomly, what is the probability that you will be correct?[🔗](#extracted-webwork-133-1-1-1) Hint. The probability will be 1 divided by however many different combinations of 11 coins your friend could have.[🔗](#extracted-webwork-133-1-2-1) [🔗](#extracted-webwork-133-1-2) [🔗](#ww-sb-coins)

#### 7.

Activate How many integer solutions to \(x_1 + x_2 + x_3 + x_4 = 38\) are there for which \(x_1 \ge 4\text{,}\) \(x_2 \ge 4\text{,}\) \(x_3 \ge 1\text{,}\) and \(x_4\ge 1\text{?}\)[🔗](#extracted-webwork-134-1-1-1) [🔗](#ww-sb-restricted-sums)

#### 8.

Activate Consider functions \(f:{\left\{1,2,3,4,5,6,7\right\}} \to {\left\{0,1,2,3,4,5,6,7,8,9,10\right\}}\text{.}\)

1. How many of these functions are strictly increasing? Explain. (A function is strictly increasing provided if \(\renewcommand{\v}{\vtx{above}{}}a \lt b\text{,}\) then \(\renewcommand{\v}{\vtx{above}{}}f(a) \lt f(b)\text{.}\))[🔗](#extracted-webwork-135-1-1-1-2-1-1) [🔗](#extracted-webwork-135-1-1-1-2-1)
2. How many of the functions are non-decreasing? Explain. (A function is non-decreasing provided if \(\renewcommand{\v}{\vtx{above}{}}a \lt b\text{,}\) then \(f(a) \le f(b)\text{.}\))[🔗](#extracted-webwork-135-1-1-1-2-2-1) [🔗](#extracted-webwork-135-1-1-1-2-2)

[🔗](#extracted-webwork-135-1-1-1) [🔗](#ww-sb-functions)

#### 9.

Activate *Conic*, your favorite math themed fast food drive-in offers 17 flavors which can be added to your soda. You have enough money to buy a large soda with 7 added flavors. How many different soda concoctions can you order if:

1. You refuse to use any of the flavors more than once?[🔗](#extracted-webwork-136-1-1-1-2-1-1) [🔗](#extracted-webwork-136-1-1-1-2-1)
2. You refuse repeats but care about the order in which the flavors are added?[🔗](#extracted-webwork-136-1-1-1-2-2-1) [🔗](#extracted-webwork-136-1-1-1-2-2)
3. You allow yourself multiple shots of the same flavor?[🔗](#extracted-webwork-136-1-1-1-2-3-1) [🔗](#extracted-webwork-136-1-1-1-2-3)
4. You allow yourself multiple shots, and care about the order in which the flavors are added?[🔗](#extracted-webwork-136-1-1-1-2-4-1) [🔗](#extracted-webwork-136-1-1-1-2-4)

[🔗](#extracted-webwork-136-1-1-1) [🔗](#ww-sb-soda)[🔗](#exercises_stars-and-bars)

### Exercises Additional Exercises

#### 1.

Each of the counting problems below can be solved with sticks and stones. For each, say what outcome the diagram \begin{equation*} \o\o\o|\o||\o\o| \end{equation*} represents, if there are the correct number of sticks and stones for the problem. Otherwise, say why the diagram does not represent any outcome, and what a correct diagram would look like.

1. How many ways are there to select a handful of 6 jellybeans from a jar that contains 5 different flavors?[🔗](#exercises_multisets-2-1-1-2-1-1) [🔗](#exercises_multisets-2-1-1-2-1)
2. How many ways can you distribute 5 identical lollipops to 6 kids?[🔗](#exercises_multisets-2-1-1-2-2-1) [🔗](#exercises_multisets-2-1-1-2-2)
3. How many 6-letter words can you make using the 5 vowels in alphabetical order?[🔗](#exercises_multisets-2-1-1-2-3-1) [🔗](#exercises_multisets-2-1-1-2-3)
4. How many solutions are there to the equation \(x_1 + x_2 + x_3 + x_4 = 6\text{.}\)[🔗](#exercises_multisets-2-1-1-2-4-1) [🔗](#exercises_multisets-2-1-1-2-4)

[🔗](#exercises_multisets-2-1-1) [🔗](#exercises_multisets-2)

#### 2.

Solve the three counting problems below. Then say why it makes sense that they all have the same answer. That is, say how you can interpret them as each other.

1. How many ways are there to distribute 8 cookies to 3 kids?[🔗](#exercises_multisets-3-1-1-1-1-1) [🔗](#exercises_multisets-3-1-1-1-1)
2. How many solutions in non-negative integers are there to \(x+y+z = 8\text{?}\)[🔗](#exercises_multisets-3-1-1-1-2-1) [🔗](#exercises_multisets-3-1-1-1-2)
3. How many different packs of 8 crayons can you make using crayons that come in red, blue, and yellow?[🔗](#exercises_multisets-3-1-1-1-3-1) [🔗](#exercises_multisets-3-1-1-1-3)

[🔗](#exercises_multisets-3-1-1) [🔗](#exercises_multisets-3)

#### 3.

We have represented multisets with sticks and stones diagrams, then counted the number of sticks and stones diagrams to tell us the number of multisets. This is only a valid process if every multiset corresponds to exactly one sticks and stones diagram, and vice versa.[🔗](#exercises_multisets-4-1-1)

#### (a)

Clearly write down the rule for how to convert a multiset into a sticks and stones diagram. That is, describe the function \(f\) that takes a multiset as input and outputs a sticks and stones diagram.[🔗](#exercises_multisets-4-2-1-1) [🔗](#exercises_multisets-4-2)

#### (b)

Prove that the function \(f\) is a bijection. That is, prove that every sticks and stones diagram corresponds to exactly one multiset, and vice versa.[🔗](#exercises_multisets-4-3-1-1) Hint. This really requires proving four facts. That every multiset corresponds to at least one diagram, and that every diagram corresponds to at least one multiset. Then that every multiset corresponds to at most one diagram, and that every diagram corresponds to at most one multiset. In other words, we must prove that the function is well defined, injective, and surjective.[🔗](#exercises_multisets-4-3-2-1) [🔗](#exercises_multisets-4-3-2) [🔗](#exercises_multisets-4-3)[🔗](#exercises_multisets-4)[🔗](#exercises_multisets)[🔗](#sec_counting-multisets) [&#xe5cb;Prev](sec_counting-combperm.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_comb-proofs.html) [Feedback](/cdn-cgi/l/email-protection#4c233f2f2d3e6220293a25220c39222f2362292839)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_counting-multisets-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_counting-multisets-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
