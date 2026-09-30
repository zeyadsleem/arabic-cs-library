---
title: "Introduction to Number Theory"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_addtops-numbth.html
---

\This is the main question of number theory: a huge, ancient, complex, and above all, beautiful branch of mathematics. Historically, number theory was known as the Queen of Mathematics and was very much a branch of *pure* mathematics, studied for its own sake instead of as a means to understanding real-world applications. This has changed in recent years however, as applications of number theory have been unearthed. Probably the most well-known example of this is RSA cryptography, one of the methods used to encrypt data on the internet. It is number theory that makes this possible.[🔗](#sec_addtops-numbth-3-2) What sorts of questions belong to the realm of number theory? Here is a motivating example. Recall in our study of induction, we asked:[🔗](#sec_addtops-numbth-3-3)

> Which amounts of postage can be made exactly using just 5-cent and 8-cent stamps?[🔗](#sec_addtops-numbth-3-4-1)
> > [🔗](#sec_addtops-numbth-3-4)

We were able to prove that *any* amount greater than 27 cents could be made. You might wonder what would happen if we changed the denomination of the stamps. What if we instead had 4- and 9-cent stamps? Would there be some amount after which all amounts would be possible? Well, again, we could replace two 4-cent stamps with a 9-cent stamp, or three 9-cent stamps with seven 4-cent stamps. In each case we can create one more cent of postage. Using this as the inductive case would allow us to prove that any amount of postage greater than 23 cents can be made.[🔗](#sec_addtops-numbth-3-5) What if we had 2-cent and 4-cent stamps. Here it looks less promising. If we take some number of 2-cent stamps and some number of 4-cent stamps, what can we say about the total? Could it ever be odd? Doesn’t look like it.[🔗](#sec_addtops-numbth-3-6) *Why* does 5 and 8 work, 4 and 9 work, but 2 and 4 not work? What is it about these numbers? If I gave you a pair of numbers, could you tell me right away if they would work or not? We will answer these questions, and more, after first investigating some simpler properties of numbers themselves.[🔗](#sec_addtops-numbth-3-7)

### Subsection Divisibility

It is easy to add and multiply natural numbers. If we extend our focus to all integers, then subtraction is also easy (we need the negative numbers, so we can subtract any number from any other number, even larger from smaller). Division is the first operation that presents a challenge. If we wanted to extend our set of numbers so any division would be possible (maybe excluding division by 0), we would need to look at the rational numbers (the set of all numbers that can be written as fractions). This would be going too far, so we will refuse this option.[🔗](#sec_addtops-numbth-4-3) In fact, it is a good thing that not every number can be divided by other numbers. This helps us understand the structure of the natural numbers and opens the door to many interesting questions and applications.[🔗](#sec_addtops-numbth-4-4) If given numbers \(a\) and \(b\text{,}\) it is possible that \(a \div b\) gives a whole number. In this case, we say that \(b\) *divides* \(a\text{;}\) in symbols, we write \(b \mid a\text{.}\) If this holds, then \(b\) is a divisor or factor of \(a\text{,}\) and \(a\) is a multiple of \(b\text{.}\) In other words, if \(b \mid a\text{,}\) then \(a = bk\) for some integer \(k\) (this is saying \(a\) is some multiple of \(b\)).[🔗](#sec_addtops-numbth-4-5)

#### The Divisibility Relation.

Given integers \(m\) and \(n\text{,}\) we say “\(m\) divides \(n\)” and write \begin{equation*} m \mid n \end{equation*} provided \(n \div m\) is an integer. Thus the following assertions mean the same thing:

1. \(m \mid n\text{.}\) [🔗](#sec_addtops-numbth-4-6-2-8-1)
2. \(n = mk\) for some integer \(k\text{.}\) [🔗](#sec_addtops-numbth-4-6-2-8-2)
3. \(m\) is a factor (or divisor) of \(n\text{.}\) [🔗](#sec_addtops-numbth-4-6-2-8-3)
4. \(n\) is a multiple of \(m\text{.}\) [🔗](#sec_addtops-numbth-4-6-2-8-4)

[🔗](#sec_addtops-numbth-4-6-2) [🔗](#sec_addtops-numbth-4-6)Notice that \(m \mid n\) is a statement. It is either true or false. On the other hand, \(n \div m\) or \(n/m\) is some number. If we want to claim that \(n/m\) is not an integer, so \(m\) does not divide \(n\text{,}\) then we can write \(m \nmid n\text{.}\)[🔗](#sec_addtops-numbth-4-7)

#### Example 6.2.1.

Decide whether each of the statements below are true or false.

1. \(\displaystyle 4 \mid 20\) [🔗](#sec_addtops-numbth-4-8-1-1-1-1)
2. \(\displaystyle 20 \mid 4\) [🔗](#sec_addtops-numbth-4-8-1-1-1-2)
3. \(\displaystyle 0 \mid 5\) [🔗](#sec_addtops-numbth-4-8-1-1-1-3)
4. \(\displaystyle 5 \mid 0\) [🔗](#sec_addtops-numbth-4-8-1-1-1-4)
5. \(\displaystyle 7 \mid 7\) [🔗](#sec_addtops-numbth-4-8-1-1-1-5)
6. \(\displaystyle 1 \mid 37\) [🔗](#sec_addtops-numbth-4-8-1-1-1-6)
7. \(\displaystyle -3 \mid 12\) [🔗](#sec_addtops-numbth-4-8-1-1-1-7)
8. \(\displaystyle 8 \mid 12\) [🔗](#sec_addtops-numbth-4-8-1-1-1-8)
9. \(\displaystyle 1642 \mid 136299\) [🔗](#sec_addtops-numbth-4-8-1-1-1-9)

[🔗](#sec_addtops-numbth-4-8-1-1) Solution.

1. True. 4 “goes into” 20 five times without remainder. In other words, \(20 \div 4 = 5\text{,}\) an integer. We could also justify this by saying that \(20\) is a multiple of 4: \(20 = 4\cdot 5\text{.}\)[🔗](#sec_addtops-numbth-4-8-2-1-1-1-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-1)
2. False. While 20 is a multiple of 4, it is false that \(4\) is a multiple of 20.[🔗](#sec_addtops-numbth-4-8-2-1-1-2-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-2)
3. False. \(5 \div 0\) is not even defined, let alone an integer.[🔗](#sec_addtops-numbth-4-8-2-1-1-3-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-3)
4. True. In fact, \(x \mid 0\) is true for all \(x\text{.}\) This is because 0 is a multiple of every number: \(0 = x\cdot 0\text{.}\)[🔗](#sec_addtops-numbth-4-8-2-1-1-4-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-4)
5. True. In fact, \(x \mid x\) is true for all \(x\text{.}\)[🔗](#sec_addtops-numbth-4-8-2-1-1-5-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-5)
6. True. 1 divides every number (other than 0).[🔗](#sec_addtops-numbth-4-8-2-1-1-6-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-6)
7. True. Negative numbers work just fine for the divisibility relation. Here \(12 = -3 \cdot 4\text{.}\) It is also true that \(3 \mid -12\) and that \(-3 \mid -12\text{.}\)[🔗](#sec_addtops-numbth-4-8-2-1-1-7-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-7)
8. False. Both 8 and 12 are divisible by 4, but this does not mean that \(12\) is divisible by \(8\text{.}\)[🔗](#sec_addtops-numbth-4-8-2-1-1-8-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-8)
9. False. See below.[🔗](#sec_addtops-numbth-4-8-2-1-1-9-1) [🔗](#sec_addtops-numbth-4-8-2-1-1-9)

[🔗](#sec_addtops-numbth-4-8-2-1) [🔗](#sec_addtops-numbth-4-8-2) [🔗](#sec_addtops-numbth-4-8)This last example raises a question: How might one decide whether \(m \mid n\text{?}\) Of course, if you had a trusted calculator, you could ask it for the value of \(n \div m\text{.}\) If it spits out anything other than an integer, you know \(m \nmid n\text{.}\) This seems a little like cheating though: We don’t have division, so should we really use division to check divisibility?[🔗](#sec_addtops-numbth-4-9) While we don’t really know how to divide, we do know how to multiply. We might try multiplying \(m\) by larger and larger numbers until we get close to \(n\text{.}\) How close? Well, we want to be sure that if we multiply \(m\) by the next larger integer, we go over \(n\text{.}\)[🔗](#sec_addtops-numbth-4-10) For example, let’s try this to decide whether \(1642 \mid 136299\text{.}\) Start finding multiples of 1642: \begin{equation*} 1642 \cdot 2 = 3284 \qquad 1642 \cdot 3 = 4926 \qquad 1642\cdot 4 = 6568 \qquad \cdots\text{.} \end{equation*} [🔗](#sec_addtops-numbth-4-11) All of these are well less than 136299. I suppose we can jump ahead a bit: \begin{equation*} 1642 \cdot 50 = 82100 \qquad 1642 \cdot 80 = 131360 \qquad 1642 \cdot 85 = 139570\text{.} \end{equation*} [🔗](#sec_addtops-numbth-4-12) Ah, so we need to look somewhere between 80 and 85. Try 83: \begin{equation*} 1642 \cdot 83 = 136286\text{.} \end{equation*} [🔗](#sec_addtops-numbth-4-13) Is this the best we can do? How far are we from our desired 136299? If we subtract, we get \(136299 - 136286 = 13\text{.}\) So we know we cannot go up to 84; that will be too much. In other words, we have found that \begin{equation*} 136299 = 83 \cdot 1642 + 13\text{.} \end{equation*} [🔗](#sec_addtops-numbth-4-14) Since \(13 \lt 1642\text{,}\) we can now safely say that \(1642 \nmid 136299\text{.}\)[🔗](#sec_addtops-numbth-4-15) It turns out that the process we went through above can be repeated for any pair of numbers. We can always write the number \(a\) as some multiple of the number \(b\) plus some remainder. We know this because we know about division with remainder from elementary school. This is just a way of saying it using multiplication. Due to the procedural nature that can be used to find the remainder, this fact is usually called the division algorithm:[🔗](#sec_addtops-numbth-4-16)

#### The Division Algorithm.

Given any two integers \(a\) and \(b\text{,}\) we can always find an integer \(q\) such that \begin{equation*} a = qb + r \end{equation*} where \(r\) is an integer satisfying \(0 \le r \lt |b|\) [🔗](#sec_addtops-numbth-4-17-2) [🔗](#sec_addtops-numbth-4-17)The idea is that we can always take a large enough multiple of \(b\) so that the remainder \(r\) is as small as possible. We do allow the possibility of \(r = 0\text{,}\) in which case we have \(b \mid a\text{.}\)[🔗](#sec_addtops-numbth-4-18) [🔗](#sec_addtops-numbth-4)

### Subsection Remainder Classes

The division algorithm tells us that there are only \(b\) possible remainders when dividing by \(b\text{.}\) If we fix this divisor, we can group integers by the remainder. Each group is called a remainder class modulo \(b\) (or sometimes residue class).[🔗](#sec_addtops-numbth-5-4)

#### Example 6.2.2.

Describe the remainder classes modulo \(5\text{.}\)[🔗](#sec_addtops-numbth-5-5-1-1) Solution. We want to classify numbers by what their remainder would be when divided by \(5\text{.}\) From the division algorithm, we know there will be exactly 5 remainder classes, because there are only 5 choices for what \(r\) could be (\(0 \le r \lt 5\)).[🔗](#sec_addtops-numbth-5-5-2-1) First consider \(r = 0\text{.}\) Here we are looking for all the numbers divisible by \(5\) since \(a = 5q+0\text{.}\) In other words, the multiples of 5. We get the infinite set \begin{equation*} \{\ldots, -15, -10, -5, 0, 5, 10, 15, 20, \ldots\}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-5-2-2) Notice we also include negative integers.[🔗](#sec_addtops-numbth-5-5-2-3) Next consider \(r = 1\text{.}\) Which integers, when divided by 5, have remainder 1? Well, certainly 1 does, as does 6, and 11. Negatives? Here we must be careful: \(-6\) does NOT have remainder 1. We can write \(-6 = -2\cdot 5 + 4\) or \(-6 = -1 \cdot 5 - 1\text{,}\) but only one of these is a “correct” instance of the division algorithm: \(r = 4\) since we need \(r\) to be non-negative. So in fact, to get \(r = 1\text{,}\) we would have \(-4\text{,}\) or \(-9\text{,}\) etc. Thus we get the remainder class \begin{equation*} \{\ldots, -14, -9, -4, 1, 6, 11, 16, 21, \ldots\}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-5-2-4) There are three more to go. The remainder classes for \(2\text{,}\) \(3\text{,}\) and \(4\) are, respectively \begin{equation*} \{\ldots, -13, -8, -3, 2, 7, 12, 17, 22,\ldots\} \end{equation*} \begin{equation*} \{\ldots, -12, -7, -2, 3, 8, 13, 18, 23, \ldots\} \end{equation*} \begin{equation*} \{\ldots, -11, -6, -1, 4, 9, 14, 19, 24, \ldots\}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-5-2-5) [🔗](#sec_addtops-numbth-5-5-2) [🔗](#sec_addtops-numbth-5-5) Note that in the example above, *every* integer is in exactly one remainder class. The technical way to say this is that the remainder classes modulo \(b\) form a partition of the integers. 1 It is possible to develop a mathematical theory of partitions, prove statements about all partitions in general, and then apply those observations to our case here. The most important fact about partitions is that it is possible to define an equivalence relation from a partition: This is a relationship between pairs of numbers which acts in all the important ways like the “equals” relationship. 2 Again, there is a mathematical theory of equivalence relations which applies in many more instances than the one we look at here. See [Subsection](sec_gt-relations.html#subsec_equivalence-relations).[🔗](#sec_addtops-numbth-5-6) All fun technical language aside, the idea is really simple. If two numbers belong to the same remainder class, then in some way, they are the same. That is, they are the same *up to division by \(b\)*. In the case where \(b = 5\) above, the numbers \(8\) and \(23\text{,}\) while not the same number, are the same when it comes to dividing by 5, because both have remainder \(3\text{.}\)[🔗](#sec_addtops-numbth-5-7) It matters what the divisor is: \(8\) and \(23\) are the same up to division by \(5\text{,}\) but not up to division by \(7\text{,}\) since \(8\) has a remainder of 1 when divided by 7 while 23 has a remainder of 2.[🔗](#sec_addtops-numbth-5-8) With all this in mind, let’s introduce some notation. We want to say that \(8\) and 23 are basically the same, even though they are not equal. It would be wrong to say \(8 = 23\text{.}\) Instead, we write \(8 \equiv 23\text{.}\) But this is not always true. It works if we are thinking division by 5, so we need to denote that somehow. What we will actually write is this: \begin{equation*} 8 \equiv 23 \pmod{5} \end{equation*} which is read, “8 is congruent to 23 modulo 5” (or just “mod 5”). Of course then we could observe that \begin{equation*} 8 \not\equiv 23 \pmod{7}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-9)

#### Congruence Modulo \(n\).

We say \(a\) is congruent to \(b\) modulo \(n\), and write, \begin{equation*} a \equiv b \pmod{n} \end{equation*} provided \(a\) and \(b\) have the same remainder when divided by \(n\text{.}\) In other words, provided \(a\) and \(b\) belong to the same remainder class modulo \(n\text{.}\) [🔗](#sec_addtops-numbth-5-10-4) [🔗](#sec_addtops-numbth-5-10)Many books define congruence modulo \(n\) slightly differently. They say that \(a \equiv b \pmod{n}\) if and only if \(n \mid a-b\text{.}\) In other words, two numbers are congruent modulo \(n\text{,}\) if their difference is a multiple of \(n\text{.}\) So which definition is correct? It turns out that it doesn’t matter; they are equivalent.[🔗](#sec_addtops-numbth-5-11) To see why, consider two numbers \(a\) and \(b\) that are congruent modulo \(n\text{.}\) Then \(a\) and \(b\) have the same remainder when divided by \(n\text{.}\) We have \begin{equation*} a = q_1 n + r \qquad\qquad b = q_2 n + r\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-12) Here the two \(r\)’s really are the same. Consider what we get when we take the difference of \(a\) and \(b\text{:}\) \begin{equation*} a-b = q_1n + r - (q_2n + r) = q_1n - q_2 n = (q_1-q_2)n\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-13) So \(a-b\) is a multiple of \(n\text{,}\) or equivalently, \(n \mid a-b\text{.}\)[🔗](#sec_addtops-numbth-5-14) On the other hand, if we assume first that \(n \mid a-b\text{,}\) so \(a-b = kn\text{,}\) then consider what happens if we divide each term by \(n\text{.}\) Dividing \(a\) by \(n\) will leave some remainder, as will dividing \(b\) by \(n\text{.}\) However, dividing \(kn\) by \(n\) will leave 0 remainder. So the remainders on the left-hand side must cancel out. That is, the remainders must be the same.[🔗](#sec_addtops-numbth-5-15) Thus we have:[🔗](#sec_addtops-numbth-5-16)

#### Congruence and Divisibility.

For any integers \(a\text{,}\) \(b\text{,}\) and \(n\text{,}\) we have \begin{equation*} a \equiv b \pmod{n} \qquad \text{ if and only if } \qquad n \mid (a-b)\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-17-4) [🔗](#sec_addtops-numbth-5-17)It will also be useful to switch back and forth between congruences and regular equations. The above fact helps with this. We know that \(a \equiv b \pmod{n}\) if and only if \(n \mid a-b\text{,}\) if and only if \(a-b = kn\) for some integer \(k\text{.}\) Rearranging that equation, we get \(a = b + kn\text{.}\) In other words, if \(a\) and \(b\) are congruent modulo \(n\text{,}\) then \(a\) is \(b\) more than some multiple of \(n\text{.}\) This conforms with our earlier observation that all the numbers in a particular remainder class are the same amount larger than the multiples of \(n\text{.}\)[🔗](#sec_addtops-numbth-5-18)

#### Congruence and Equality.

For any integers \(a\text{,}\) \(b\text{,}\) and \(n\text{,}\) we have \begin{equation*} a \equiv b \pmod{n} \qquad \text{ if and only if } \qquad a = b + kn \mbox{ for some integer } k\text{.} \end{equation*} [🔗](#sec_addtops-numbth-5-19-3) [🔗](#sec_addtops-numbth-5-19)[🔗](#sec_addtops-numbth-5)

### Subsection Properties of Congruence

We said earlier that congruence modulo \(n\) behaves, in many important ways, the same way equality does. Specifically, we could prove that congruence modulo \(n\) is an equivalence relation, which would require checking the following three facts:[🔗](#sec_addtops-numbth-6-2)

#### Congruence Modulo \(n\) is an Equivalence Relation.

Given any integers \(a\text{,}\) \(b\text{,}\) and \(c\text{,}\) and any positive integer \(n\text{,}\) the following hold:[🔗](#sec_addtops-numbth-6-3-4)

1. \(a \equiv a \pmod{n}\text{.}\) [🔗](#sec_addtops-numbth-6-3-5-1-1)
2. If \(a \equiv b \pmod{n}\) then \(b \equiv a \pmod{n}\text{.}\)[🔗](#sec_addtops-numbth-6-3-5-1-2-1) [🔗](#sec_addtops-numbth-6-3-5-1-2)
3. If \(a \equiv b \pmod{n}\) and \(b \equiv c \pmod{n}\text{,}\) then \(a \equiv c \pmod{n}\text{.}\)[🔗](#sec_addtops-numbth-6-3-5-1-3-1) [🔗](#sec_addtops-numbth-6-3-5-1-3)

[🔗](#sec_addtops-numbth-6-3-5) In other words, congruence modulo \(n\) is reflexive, symmetric, and transitive, and so is an equivalence relation.[🔗](#sec_addtops-numbth-6-3-6) [🔗](#sec_addtops-numbth-6-3)You should take a minute to convince yourself that each of the properties above actually holds for congruence. Try explaining each using both the remainder and divisibility definitions.[🔗](#sec_addtops-numbth-6-4) Next, consider how congruence behaves when doing basic arithmetic. We already know that if you subtract two congruent numbers, the result will be congruent to 0 (be a multiple of \(n\)). What if we add something congruent to 1 to something congruent to 2? Will we get something congruent to 3?[🔗](#sec_addtops-numbth-6-5)

#### Congruence and Arithmetic.

Suppose \(a \equiv b \pmod{n}\) and \(c \equiv d \pmod{n}\text{.}\) Then the following hold:[🔗](#sec_addtops-numbth-6-6-3)

1. \(a+c \equiv b+d \pmod{n}\text{.}\) [🔗](#sec_addtops-numbth-6-6-4-1-1)
2. \(a-c \equiv b-d \pmod{n}\text{.}\) [🔗](#sec_addtops-numbth-6-6-4-1-2)
3. \(ac \equiv bd \pmod{n}\text{.}\) [🔗](#sec_addtops-numbth-6-6-4-1-3)

[🔗](#sec_addtops-numbth-6-6-4) [🔗](#sec_addtops-numbth-6-6)The above facts might be written a little strangely, but the idea is simple. If we have a true congruence, and we add the same thing to both sides, the result is still a true congruence. This sounds like we are saying:[🔗](#sec_addtops-numbth-6-7)

> If \(a \equiv b \pmod{n}\) then \(a+c \equiv b+c \pmod{n}\text{.}\)[🔗](#sec_addtops-numbth-6-8-1)
> > [🔗](#sec_addtops-numbth-6-8)

Of course this is true as well; it is the special case where \(c = d\text{.}\) But what we have works in more generality. Think of congruence as being “basically equal.” If we have two numbers that are basically equal, and we add basically the same thing to both sides, the result will be basically equal.[🔗](#sec_addtops-numbth-6-9) This seems reasonable. Is it really true? Let’s prove the first fact:[🔗](#sec_addtops-numbth-6-10)

#### Proof.

Suppose \(a \equiv b \pmod{n}\) and \(c \equiv d \pmod{n}\text{.}\) That means \(a = b + kn\) and \(c = d + jn\) for integers \(k\) and \(j\text{.}\) Add these equations: \begin{equation*} a+c = b+d + kn + jn\text{.} \end{equation*} [🔗](#sec_addtops-numbth-6-11-1) But \(kn + jn = (k+j)n\text{,}\) which is just a multiple of \(n\text{.}\) So \(a+c = b+d + (j+k)n\text{,}\) or in other words, \(a+c \equiv b+d \pmod{n}\text{.}\)[🔗](#sec_addtops-numbth-6-11-2) [🔗](#sec_addtops-numbth-6-11)The other two facts can be proved in a similar way. [🔗](#sec_addtops-numbth-6-12) One of the important consequences of these facts about congruences is that we can basically replace any number in a congruence with any other number it is congruent to. Here are some examples to see how (and why) that works:[🔗](#sec_addtops-numbth-6-13)

#### Example 6.2.3.

Find the remainder of \(3491\) divided by \(9\text{.}\)[🔗](#sec_addtops-numbth-6-14-1-1) Solution. We could do long division, but there is another way. We want to find \(x\) such that \(x \equiv 3491 \pmod{9}\text{.}\) Now \(3491 = 3000 + 400 + 90 + 1\text{.}\) Of course \(90 \equiv 0 \pmod 9\text{,}\) so we can replace the 90 in the sum with 0. Why is this okay? We are actually subtracting the “same” thing from both sides: \begin{equation*} \begin{aligned}x \amp \equiv 3000 + 400 + 90 + 1 \pmod 9 \\ - ~~ 0 \amp \equiv 90 \pmod 9 \\ x \amp \equiv 3000 + 400 + 0 + 1\pmod 9. \end{aligned} \end{equation*} [🔗](#sec_addtops-numbth-6-14-2-1) Next, note that \(400 = 4 \cdot 100\text{,}\) and \(100 \equiv 1 \pmod 9\) (since \(9 \mid 99\)). So we can in fact replace the 400 with simply a 4. Again, we are appealing to our claim that we can replace congruent elements, but we are really appealing to property 3 about the arithmetic of congruence: We know \(100 \equiv 1 \pmod{9}\text{,}\) so if we multiply both sides by \(4\text{,}\) we get \(400 \equiv 4 \pmod 9\text{.}\)[🔗](#sec_addtops-numbth-6-14-2-2) Similarly, we can replace 3000 with 3, since \(1000 = 1 + 999 \equiv 1 \pmod 9\text{.}\) So our original congruence becomes \begin{equation*} x \equiv 3 + 4 + 0 + 1 \pmod 9 \end{equation*} \begin{equation*} x \equiv 8 \pmod 9\text{.} \end{equation*} Therefore \(3491\) divided by 9 has remainder 8. [🔗](#sec_addtops-numbth-6-14-2-3) [🔗](#sec_addtops-numbth-6-14-2) [🔗](#sec_addtops-numbth-6-14)The above example should convince you that the well-known divisibility test for 9 is true: The sum of the digits of a number is divisible by 9 if and only if the original number is divisible by 9. In fact, we now know something more: Any number is congruent to the sum of its digits, modulo 9. 3 This works for 3 as well, but definitely not for any modulus in general.[🔗](#sec_addtops-numbth-6-15) Let’s try another.[🔗](#sec_addtops-numbth-6-16)

#### Example 6.2.4.

Find the remainder when \(3^{123}\) is divided by 7.[🔗](#sec_addtops-numbth-6-17-1-1) Solution. Of course, we are working with congruence because we want to find the smallest positive \(x\) such that \(x \equiv 3^{123} \pmod 7\text{.}\) Now first write \(3^{123} = (3^3)^{41}\text{.}\) We have: \begin{equation*} 3^{123} = 27^{41} \equiv 6^{41} \pmod 7\text{,} \end{equation*} since \(27 \equiv 6 \pmod 7\text{.}\) Notice further that \(6^2 = 36\) is congruent to 1 modulo 7. Thus we can simplify further: \begin{equation*} 6^{41} = 6\cdot (6^2)^{20} \equiv 6 \cdot 1^{20} \pmod 7\text{.} \end{equation*} [🔗](#sec_addtops-numbth-6-17-2-1) But \(1^{20} = 1\text{,}\) so we are done: \begin{equation*} 3^{123} \equiv 6 \pmod 7\text{.} \end{equation*} [🔗](#sec_addtops-numbth-6-17-2-2) [🔗](#sec_addtops-numbth-6-17-2) [🔗](#sec_addtops-numbth-6-17)In the above example, we are using the fact that if \(a \equiv b \pmod n\text{,}\) then \(a^p \equiv b^p \pmod n\text{.}\) This is just applying property 3 a bunch of times.[🔗](#sec_addtops-numbth-6-18) So far we have seen how to add, subtract, and multiply with congruences. What about division? There is a reason we have waited to discuss it. It turns out that we cannot simply divide. In other words, even if \(ad \equiv bd \pmod n\text{,}\) we do not know that \(a \equiv b \pmod n\text{.}\) Consider, for example, \begin{equation*} 18 \equiv 42 \pmod 8\text{.} \end{equation*} [🔗](#sec_addtops-numbth-6-19) This is true. Now \(18\) and \(42\) are both divisible by 6. However, \begin{equation*} 3 \not\equiv 7 \pmod 8\text{.} \end{equation*} [🔗](#sec_addtops-numbth-6-20) While this doesn’t work, note that \(3 \equiv 7 \pmod 4\text{.}\) We cannot divide \(8\) by 6, but we can divide 8 by the greatest common factor of \(8\) and \(6\text{.}\) Will this always happen?[🔗](#sec_addtops-numbth-6-21) Suppose \(ad \equiv bd \pmod n\text{.}\) In other words, we have \(ad = bd + kn\) for some integer \(k\text{.}\) Of course \(ad\) is divisible by \(d\text{,}\) as is \(bd\text{.}\) So \(kn\) must also be divisible by \(d\text{.}\) Now if \(n\) and \(d\) have no common factors (other than 1), then we must have \(d \mid k\text{.}\) But in general, if we try to divide \(kn\) by \(d\text{,}\) we don’t know that we will get an integer multiple of \(n\text{.}\) Some of the \(n\) might get divided as well. To be safe, let’s divide as much of \(n\) as we can. Take the largest factor of both \(d\) and \(n\text{,}\) and cancel that out from \(n\text{.}\) The rest of the factors of \(d\) will come from \(k\text{,}\) no problem.[🔗](#sec_addtops-numbth-6-22) We will call the largest factor of both \(d\) and \(n\) the \(\gcd(d,n)\text{,}\) for *greatest common divisor*. In our example above, \(\gcd(6,8) = 2\) since the greatest divisor common to 6 and 8 is 2.[🔗](#sec_addtops-numbth-6-23)

#### Congruence and Division.

Suppose \(ad \equiv bd \pmod n\text{.}\) Then \(a \equiv b \pmod{\frac{n}{\gcd(d,n)}}\text{.}\)[🔗](#sec_addtops-numbth-6-24-3) If \(d\) and \(n\) have no common factors, then \(\gcd(d,n) = 1\text{,}\) so \(a \equiv b \pmod n\text{.}\)[🔗](#sec_addtops-numbth-6-24-4) [🔗](#sec_addtops-numbth-6-24)

#### Example 6.2.5.

Simplify the following congruences using division: (a) \(24 \equiv 39 \pmod 5\) and (b) \(24 \equiv 39 \pmod{15}\text{.}\)[🔗](#sec_addtops-numbth-6-25-1-1) Solution. (a) Both \(24\) and \(39\) are divisible by \(3\text{,}\) and \(3\) and \(5\) have no common factors, so we get \begin{equation*} 8 \equiv 13 \pmod 5\text{.} \end{equation*} [🔗](#sec_addtops-numbth-6-25-2-1) (b) Again, we can divide by 3. However, doing so blindly gives us \(8 \equiv 13 \pmod{15}\) which is no longer true. Instead, we must also divide the modulus 15 by the greatest common factor of \(3\) and \(15\text{,}\) which is \(3\text{.}\) Again we get \begin{equation*} 8 \equiv 13 \pmod 5\text{.} \end{equation*} [🔗](#sec_addtops-numbth-6-25-2-2) [🔗](#sec_addtops-numbth-6-25-2) [🔗](#sec_addtops-numbth-6-25)[🔗](#sec_addtops-numbth-6)

### Subsection Solving Congruences

Now that we have some algebraic rules to govern congruence relations, we can attempt to solve for an unknown in a congruence. For example, is there a value of \(x\) that satisfies, \begin{equation*} 3x + 2 \equiv 4 \pmod{5}\text{,} \end{equation*} and if so, what is it? [🔗](#sec_addtops-numbth-7-3) In this example, since the modulus is small, we could simply try every possible value for \(x\text{.}\) There are really only 5 to consider, since any integer that satisfied the congruence could be replaced with any other integer it was congruent to modulo 5. Here, when \(x = 4\) we get \(3x + 2 = 14\text{,}\) which is indeed congruent to 4 modulo 5. This means that \(x = 9\) and \(x = 14\) and \(x = 19\) and so on will each also be a solution because, as we saw above, replacing any number in a congruence with a congruent number does not change the truth of the congruence.[🔗](#sec_addtops-numbth-7-4) So in this example, simply compute \(3x + 2\) for values of \(x \in \{0,1,2,3,4\}\text{.}\) This gives 2, 5, 8, 11, and 14 respectively, for which only 14 is congruent to 4.[🔗](#sec_addtops-numbth-7-5) Let’s also see how you could solve this using our rules for the algebra of congruences. Such an approach would be much simpler than the trial and error tactic if the modulus was larger. First, we know we can subtract 2 from both sides: \begin{equation*} 3x \equiv 2 \pmod{5}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-7-6) Then to divide both sides by 3, we first add 0 to both sides. Of course, on the right-hand side, we want that 0 to be a 10 (yes, \(10\) really is 0 since they are congruent modulo 5). This gives, \begin{equation*} 3x \equiv 12 \pmod{5}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-7-7) Now divide both sides by 3. Since \(\gcd(3,5) = 1\text{,}\) we do not need to change the modulus: \begin{equation*} x \equiv 4 \pmod{5}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-7-8) Notice that this in fact gives the *general solution*: Not only can \(x = 4\text{,}\) but \(x\) can be any number which is congruent to 4. We can leave it like this, or write “\(x = 4 + 5k\) for any integer \(k\text{.}\)”[🔗](#sec_addtops-numbth-7-9)

#### Example 6.2.6.

Solve the following congruences for \(x\text{.}\)[🔗](#sec_addtops-numbth-7-10-1-1)

1. \(7x \equiv 12 \pmod{13}\text{.}\) [🔗](#sec_addtops-numbth-7-10-1-2-1-1)
2. \(84x - 38 \equiv 79 \pmod{15}\text{.}\) [🔗](#sec_addtops-numbth-7-10-1-2-1-2)
3. \(20x \equiv 23 \pmod{14}\text{.}\) [🔗](#sec_addtops-numbth-7-10-1-2-1-3)

[🔗](#sec_addtops-numbth-7-10-1-2) Solution.

1. All we need to do here is divide both sides by 7. We add 13 to the right-hand side repeatedly until we get a multiple of 7 (adding 13 is the same as adding 0, so this is legal). We get \(25\text{,}\) \(38\text{,}\) \(51\text{,}\) \(64\text{,}\) \(77\) – got it. So we have: \begin{equation*} \begin{aligned}7x \amp \equiv 12 \pmod{13} \\ 7x \amp \equiv 77 \pmod{13} \\ x \amp \equiv 11 \pmod{13}. \end{aligned} \end{equation*} [🔗](#sec_addtops-numbth-7-10-2-1-1-1-1) [🔗](#sec_addtops-numbth-7-10-2-1-1-1)
2. Here, since we have numbers larger than the modulus, we can reduce them prior to applying any algebra. We have \(84 \equiv 9\text{,}\) \(38 \equiv 8\) and \(79 \equiv 4\text{.}\) Thus, \begin{equation*} \begin{aligned}84x - 38 \amp \equiv 79 \pmod{15} \\ 9x - 8 \amp \equiv 4 \pmod{15} \\ 9x \amp \equiv 12 \pmod{15} \\ 9x \amp \equiv 72 \pmod{15}. \end{aligned} \end{equation*} We got the 72 by adding \(0 \equiv 60 \pmod{15}\) to both sides of the congruence. Now divide both sides by 9. However, since \(\gcd(9, 15) = 3\text{,}\) we must divide the modulus by 3 as well: \begin{equation*} x \equiv 8 \pmod 5\text{.} \end{equation*} So the solutions are those values that are congruent to 8, or equivalently 3, modulo 5. This means that in some sense there are 3 solutions modulo 15: 3, 8, and 13. We can write the solution: \begin{equation*} x \equiv 3 \pmod{15}; ~~ x \equiv 8 \pmod{15}; ~~x \equiv 13 \pmod{15}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-7-10-2-1-1-2-1) [🔗](#sec_addtops-numbth-7-10-2-1-1-2)
3. First, reduce modulo 14: \begin{equation*} 20x \equiv 23 \pmod{14} \end{equation*} \begin{equation*} 6x \equiv 9 \pmod{14}\text{.} \end{equation*} We could now divide both sides by 3 or try to increase 9 by a multiple of 14 to get a multiple of 6. If we divide by 3, we get, \begin{equation*} 2x \equiv 3 \pmod{14}\text{.} \end{equation*} Now try adding multiples of 14 to 3, in hopes of getting a number we can divide by 2. This will not work! Every time we add 14 to the right side, the result will still be odd. We will never get an even number, so we will never be able to divide by 2. Thus there are no solutions to the congruence. [🔗](#sec_addtops-numbth-7-10-2-1-1-3-1) [🔗](#sec_addtops-numbth-7-10-2-1-1-3)

[🔗](#sec_addtops-numbth-7-10-2-1) [🔗](#sec_addtops-numbth-7-10-2) [🔗](#sec_addtops-numbth-7-10) The last congruence above illustrates the way in which congruences might not have solutions. We could have seen this immediately in fact. Look at the original congruence: \begin{equation*} 20x \equiv 23 \pmod{14}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-7-11) If we write this as an equation, we get \begin{equation*} 20x = 23 + 14k\text{,} \end{equation*} or equivalently \(20x - 14k = 23\text{.}\) We can easily see there will be no solution to this equation in integers. The left-hand side will always be even, but the right-hand side is odd. A similar problem would occur if the right-hand side was divisible by *any* number that the left-hand side was not. [🔗](#sec_addtops-numbth-7-12) So in general, given the congruence \begin{equation*} ax \equiv b \pmod{n}\text{,} \end{equation*} if \(a\) and \(n\) are divisible by a number by which \(b\) is not divisible, then there will be no solutions. In fact, we really only need to check one divisor of \(a\) and \(n\text{:}\) the greatest common divisor. Thus, a more compact way to say this is: [🔗](#sec_addtops-numbth-7-13)

#### Congruences with No Solutions.

If \(\gcd(a,n) \nmid b\text{,}\) then \(ax \equiv b \pmod{n}\) has no solutions.[🔗](#sec_addtops-numbth-7-14-3) [🔗](#sec_addtops-numbth-7-14)[🔗](#sec_addtops-numbth-7)

### Subsection Solving Linear Diophantine Equations

Discrete math deals with whole numbers of things. So when we want to solve equations, we usually are looking for *integer* solutions. Equations that are intended to only have integer solutions were first studied by in the third century by the Greek mathematician Diophantus of Alexandria, and as such are called *Diophantine equations*. Probably the most famous example of a Diophantine equation is \(a^2 + b^2 = c^2\text{.}\) The integer solutions to this equation are called Pythagorean triples. In general, solving Diophantine equations is hard (in fact, there is provably no general algorithm for deciding whether a Diophantine equation has a solution, a result known as Matiyasevich’s Theorem). We will restrict our focus to *linear* Diophantine equations, which are considerably easier to work with.[🔗](#sec_addtops-numbth-8-3)

#### Diophantine Equations.

An equation in two or more variables is called a Diophantine equation if only integer solutions are of interest. A linear Diophantine equation takes the form \(a_1x_1 + a_2x_2 + \cdots + a_nx_n = b\) for constants \(a_1,\ldots, a_n, b\text{.}\)[🔗](#sec_addtops-numbth-8-4-4) A solution to a Diophantine equation is a solution to the equation consisting only of integers.[🔗](#sec_addtops-numbth-8-4-5) [🔗](#sec_addtops-numbth-8-4) We have the tools we need to solve linear Diophantine equations. We will consider, as a main example, the equation \begin{equation*} 51x + 87y = 123\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-5) The general strategy will be to convert the equation to a congruence, and then solve that congruence. 4 This is certainly not the only way to proceed. A more common technique would be to apply the Euclidean algorithm. Our way can be a little faster, and is presented here primarily for variety. Let’s work through this particular example to see how this might go.[🔗](#sec_addtops-numbth-8-6) First, check if perhaps there are no solutions because a divisor of \(51\) and \(87\) is not a divisor of \(123\text{.}\) Really, we just need to check whether \(\gcd(51, 87) \mid 123\text{.}\) This greatest common divisor is 3, and yes \(3 \mid 123\text{.}\) At this point, we might as well factor out this greatest common divisor. So instead, we will solve: \begin{equation*} 17x + 29y = 41\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-7) Now observe that if there are going to be solutions, then for those values of \(x\) and \(y\text{,}\) the two sides of the equation must have the same remainder as each other, no matter what we divide by. In particular, if we divide both sides by 17, we must get the same remainder. Thus we can safely write \begin{equation*} 17x + 29y \equiv 41 \pmod{17}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-8) We choose 17 because \(17x\) will have remainder 0. This will allow us to reduce the congruence to just one variable. We could have also moved to a congruence modulo 29, although there is usually a good reason to select the smaller choice, as this will allow us to reduce the other coefficient. In our case, we reduce the congruence as follows: \begin{equation*} \begin{aligned}17x + 29y \amp \equiv 41 \pmod{17} \\ 0x + 12y \amp \equiv 7 \pmod{17} \\ 12 y \amp \equiv 24 \pmod{17} \\ y \amp \equiv 2 \pmod{17}. \end{aligned} \end{equation*} [🔗](#sec_addtops-numbth-8-9) Now at this point we know \(y = 2 + 17k\) will work for any integer \(k\text{.}\) If we haven’t made a mistake, we should be able to plug this back into our original Diophantine equation to find \(x\text{:}\) \begin{equation*} \begin{aligned}17x + 29(2 + 17k) \amp = 41\\ 17x \amp = -17 - 29\cdot 17k\\ x \amp = -1-29k. \end{aligned} \end{equation*} [🔗](#sec_addtops-numbth-8-10) We have now found all solutions to the Diophantine equation. For each \(k\text{,}\) \(x = -1-29k\) and \(y = 2 + 17k\) will satisfy the equation. We could check this for a few cases. If \(k = 0\text{,}\) the solution is \((-1,2)\text{,}\) and yes, \(-17 + 2\cdot 29 = 41\text{.}\) If \(k = 3\text{,}\) the solution is \((-88, 53)\text{.}\) If \(k = -2\text{,}\) we get \((57, -32)\text{.}\)[🔗](#sec_addtops-numbth-8-11) To summarize this process, to solve \(ax + by = c\text{,}\) we,[🔗](#sec_addtops-numbth-8-12)

1. Divide both sides of the equation by \(\gcd(a,b)\) (if this does not leave the right-hand side as an integer, there are no solutions). Let’s assume that \(ax + by = c\) has already been reduced in this way.[🔗](#sec_addtops-numbth-8-13-1-1-1) [🔗](#sec_addtops-numbth-8-13-1-1)
2. Pick the smaller of \(a\) and \(b\) (here, assume it is \(b\)), and convert to a congruence modulo \(b\text{:}\) \begin{equation*} ax + by \equiv c \pmod{b}\text{.} \end{equation*} This will reduce to a congruence with one variable, \(x\text{:}\) \begin{equation*} ax \equiv c \pmod{b}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-13-1-2-1) [🔗](#sec_addtops-numbth-8-13-1-2)
3. Solve the congruence as we did in the previous section. Write your solution as an equation, such as, \begin{equation*} x = n + kb\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-13-1-3-1) [🔗](#sec_addtops-numbth-8-13-1-3)
4. Plug this into the original Diophantine equation, and solve for \(y\text{.}\)[🔗](#sec_addtops-numbth-8-13-1-4-1) [🔗](#sec_addtops-numbth-8-13-1-4)
5. If we want to know solutions in a particular range (for example, \(0 \le x, y \le 20\)), pick different values of \(k\) until you have all required solutions.[🔗](#sec_addtops-numbth-8-13-1-5-1) [🔗](#sec_addtops-numbth-8-13-1-5)

[🔗](#sec_addtops-numbth-8-13) Here is another example:[🔗](#sec_addtops-numbth-8-14)

#### Example 6.2.7.

How can you make $6.37 using just 5-cent and 8-cent stamps? What is the smallest and largest number of stamps you could use?[🔗](#sec_addtops-numbth-8-15-1-1) Solution. First, we need a Diophantine equation. We will work in numbers of cents. Let \(x\) be the number of \(5\)-cent stamps, and \(y\) be the number of 8-cent stamps. We have: \begin{equation*} 5x + 8y = 637\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-15-2-1) Convert to a congruence and solve: \begin{equation*} \begin{aligned}8y \amp \equiv 637 \pmod{5}\\ 3y \amp \equiv 2 \pmod 5\\ 3y \amp \equiv 12 \pmod 5\\ y \amp \equiv 4 \pmod 5. \end{aligned} \end{equation*} [🔗](#sec_addtops-numbth-8-15-2-2) Thus \(y = 4 + 5k\text{.}\) Then \(5x + 8(4+5k) = 637\text{,}\) so \(x = 121 - 8k\text{.}\)[🔗](#sec_addtops-numbth-8-15-2-3) This says that one way to make $6.37 is to take 121 of the 5-cent stamps and 4 of the 8-cent stamps. To find the smallest and largest number of stamps, try different values of \(k\text{.}\)[🔗](#sec_addtops-numbth-8-15-2-4)

| \(k\) | \((x,y)\) | Stamps |
| --- | --- | --- |
|  |  |  |
| -1 | (129, -1) | not possible |
| 0 | (121, 4) | 125 |
| 1 | (113, 9) | 122 |
| 2 | (105, 13) | 119 |
| \(\vdots\) | \(\vdots\) | \(\vdots\) |

This is no surprise. Having the most stamps means we have as many 5-cent stamps as possible, and to get the smallest number of stamps would require having the least number of 5-cent stamps. To minimize the number of 5-cent stamps, we want to pick \(k\) so that \(121-8k\) is as small as possible (but still positive). When \(k = 15\text{,}\) we have \(x = 1\) and \(y = 79\text{.}\)[🔗](#sec_addtops-numbth-8-15-2-6) Therefore, to make $6.37, you can use as few as 80 stamps (1 5-cent stamp and 79 8-cent stamps) or as many as 125 stamps (121 5-cent stamps and 4 8-cent stamps).[🔗](#sec_addtops-numbth-8-15-2-7) [🔗](#sec_addtops-numbth-8-15-2) [🔗](#sec_addtops-numbth-8-15) Using this method, as long as you can solve linear congruences in one variable, you can solve linear Diophantine equations of two variables. There are times, though, that solving the linear congruence is a lot of work. For example, suppose you need to solve, \begin{equation*} 13x \equiv 6 \pmod{51}\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-16) You *could* keep adding 51 to the right side until you get a multiple of 13: You would get 57, 108, 159, 210, 261, 312, and 312 is the first of these that is divisible by 13. This works but is really too much work. Instead we could convert *back* to a Diophantine equation: \begin{equation*} 13x = 6 + 51k\text{.} \end{equation*} [🔗](#sec_addtops-numbth-8-17) Now solve *this* like we have in this section. Write it as a congruence modulo 13: \begin{equation*} \begin{aligned}0 \amp \equiv 6 + 51k \pmod{13}\\ -12k \amp \equiv 6 \pmod{13}\\ 2k \amp \equiv -1 \pmod{13}\\ 2k \amp \equiv 12 \pmod{13}\\ k \amp \equiv 6 \pmod{13}. \end{aligned} \end{equation*} so \(k = 6 + 13j\text{.}\) Now go back and figure out \(x\text{:}\) \begin{equation*} \begin{aligned}13x \amp = 6 + 51(6+13j)\\ x \amp = 24 + 51j. \end{aligned} \end{equation*} [🔗](#sec_addtops-numbth-8-18) Of course you could do this switching back and forth between congruences and Diophantine equations as many times as you like. If you *only* used this technique, you would essentially replicate the Euclidean algorithm, a more standard way to solve Diophantine equations.[🔗](#sec_addtops-numbth-8-19) [🔗](#sec_addtops-numbth-8)

### Exercises Exercises

#### 1.

Suppose \(a\text{,}\) \(b\text{,}\) and \(c\) are integers. Prove that if \(a \mid b\text{,}\) then \(a \mid bc\text{.}\)[🔗](#exercises_addtops-numbth-1-1-1) [🔗](#exercises_addtops-numbth-1)

#### 2.

Suppose \(a\text{,}\) \(b\text{,}\) and \(c\) are integers. Prove that if \(a \mid b\) and \(a \mid c\) then \(a \mid b+c\) and \(a \mid b-c\text{.}\)[🔗](#exercises_addtops-numbth-2-1-1) [🔗](#exercises_addtops-numbth-2)

#### 3.

Write out the remainder classes for \(n = 4\text{.}\)[🔗](#exercises_addtops-numbth-3-1-1) [🔗](#exercises_addtops-numbth-3)

#### 4.

What is the largest \(n\) such that \(16\) and \(25\) are in the same remainder class modulo \(n\text{?}\) Write out the remainder class they both belong to and give an example of a number more than 100 in that class.[🔗](#exercises_addtops-numbth-4-1-1) [🔗](#exercises_addtops-numbth-4)

#### 5.

Let \(a\text{,}\) \(b\text{,}\) \(c\text{,}\) and \(n\) be integers. Prove that if \(a \equiv b \pmod{n}\) and \(c \equiv d \pmod{n}\text{,}\) then \(a-c \equiv b-d \pmod{n}\text{.}\)[🔗](#exercises_addtops-numbth-5-1-1) [🔗](#exercises_addtops-numbth-5)

#### 6.

Find the remainder of \(3^{456}\) when divided by

1. 2.[🔗](#exercises_addtops-numbth-6-1-1-2-1-1) [🔗](#exercises_addtops-numbth-6-1-1-2-1)
2. 5.[🔗](#exercises_addtops-numbth-6-1-1-2-2-1) [🔗](#exercises_addtops-numbth-6-1-1-2-2)
3. 7.[🔗](#exercises_addtops-numbth-6-1-1-2-3-1) [🔗](#exercises_addtops-numbth-6-1-1-2-3)
4. 9.[🔗](#exercises_addtops-numbth-6-1-1-2-4-1) [🔗](#exercises_addtops-numbth-6-1-1-2-4)

[🔗](#exercises_addtops-numbth-6-1-1) [🔗](#exercises_addtops-numbth-6)

#### 7.

Repeat the previous exercise, this time dividing \(2^{2019}\text{.}\)[🔗](#exercises_addtops-numbth-7-1-1) [🔗](#exercises_addtops-numbth-7)

#### 8.

Determine which of the following congruences have solutions, and find any solutions (between 0 and the modulus) by trial and error.

1. \(4x \equiv 5 \pmod 6\text{.}\) [🔗](#exercises_addtops-numbth-8-1-1-1-1)
2. \(6x \equiv 3 \pmod 9\text{.}\) [🔗](#exercises_addtops-numbth-8-1-1-1-2)
3. \(x^2 \equiv 2 \pmod 4\text{.}\) [🔗](#exercises_addtops-numbth-8-1-1-1-3)

[🔗](#exercises_addtops-numbth-8-1-1) [🔗](#exercises_addtops-numbth-8)

#### 9.

Determine which of the following congruences have solutions, and find any solutions (between 0 and the modulus) by trial and error.

1. \(4x \equiv 5 \pmod 7\text{.}\) [🔗](#exercises_addtops-numbth-9-1-1-1-1)
2. \(6x \equiv 4 \pmod 9\text{.}\) [🔗](#exercises_addtops-numbth-9-1-1-1-2)
3. \(x^2 \equiv 2 \pmod 7\text{.}\) [🔗](#exercises_addtops-numbth-9-1-1-1-3)

[🔗](#exercises_addtops-numbth-9-1-1) [🔗](#exercises_addtops-numbth-9)

#### 10.

Solve the congruence: \(5x + 8 \equiv 11 \pmod{22}\text{.}\) That is, describe the general solution.[🔗](#exercises_addtops-numbth-10-1-1) [🔗](#exercises_addtops-numbth-10)

#### 11.

Solve the congruence: \(6x \equiv 4 \pmod{10}\text{.}\)[🔗](#exercises_addtops-numbth-11-1-1) [🔗](#exercises_addtops-numbth-11)

#### 12.

Solve the congruence: \(4x \equiv 24 \pmod{30}\text{.}\)[🔗](#exercises_addtops-numbth-12-1-1) [🔗](#exercises_addtops-numbth-12)

#### 13.

Solve the congruence: \(341x \equiv 2941 \pmod{9}\text{.}\)[🔗](#exercises_addtops-numbth-13-1-1) Hint. First reduce each number modulo 9, which can be done by adding up the digits of the numbers.[🔗](#exercises_addtops-numbth-13-2-1) [🔗](#exercises_addtops-numbth-13-2) [🔗](#exercises_addtops-numbth-13)

#### 14.

I’m thinking of a number. If you multiply my number by 7, add 5, and divide the result by 11, you will be left with a remainder of 2. What remainder would you get if you divided my original number by 11?[🔗](#exercises_addtops-numbth-14-1-1) [🔗](#exercises_addtops-numbth-14)

#### 15.

Solve the following linear Diophantine equation, using modular arithmetic (describe the general solutions). \begin{equation*} 6x + 10y = 32\text{.} \end{equation*} [🔗](#exercises_addtops-numbth-15-1-1) [🔗](#exercises_addtops-numbth-15)

#### 16.

Solve the following linear Diophantine equation, using modular arithmetic (describe the general solutions). \begin{equation*} 17x + 8y = 31\text{.} \end{equation*} [🔗](#exercises_addtops-numbth-16-1-1) [🔗](#exercises_addtops-numbth-16)

#### 17.

Solve the following linear Diophantine equation, using modular arithmetic (describe the general solutions). \begin{equation*} 35x + 47y = 1\text{.} \end{equation*} [🔗](#exercises_addtops-numbth-17-1-1) [🔗](#exercises_addtops-numbth-17)

#### 18.

You have a 13 oz. bottle and a 20 oz. bottle, with which you wish to measure exactly 2 oz. However, you have a limited supply of water. If any water enters either bottle and then gets dumped out, it is gone forever. What is the least amount of water you can start with and still complete the task?[🔗](#exercises_addtops-numbth-18-1-1) Hint. Solve the Diophantine equation \(13x + 20 y = 2\) (why?). Then consider which value of \(k\) (the parameter in the solution) is optimal.[🔗](#exercises_addtops-numbth-18-2-1) [🔗](#exercises_addtops-numbth-18-2) [🔗](#exercises_addtops-numbth-18)[🔗](#exercises_addtops-numbth)[🔗](#sec_addtops-numbth) [&#xe5cb;Prev](sec_addtops-genfun.html)[&#xe5ce;Top](#)[Next&#xe5cc;](backmatter.html) [Feedback](/cdn-cgi/l/email-protection#452a362624376b2920332c2b05302b262a6b202130)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_addtops-numbth-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_addtops-numbth-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
