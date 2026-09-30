---
title: "Sets"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_structures-sets.html
---

\The most fundamental objects we will use in our studies (and really in all of math) are *sets*. Much of what follows might be review, but it is very important that you are fluent in the language of set theory. Most of the notation we use below is standard, although some might be a little different than what you have seen before.[🔗](#sec_structures-sets-2-2) For us, a set will simply be an unordered collection of objects. Two examples: We could consider the set of all actors who have played *The Doctor* on *Doctor Who*, or the set of natural numbers between 1 and 10 inclusive. In the first case, Tom Baker is an element (or member) of the set, while Idris Elba, among many others, is not an element of the set. Also, the two examples are of different sets. Two sets are equal exactly if they contain the exact same elements. For example, the set containing all of the vowels in the Declaration of Independence is precisely the same set as the set of vowels in the word “questionably” (namely, all of them); we do not care about order or repetitions, just whether the element is in the set or not.[🔗](#sec_structures-sets-2-3)

### Subsection Notation

We need some notation to make talking about sets easier. Consider, \begin{equation*} A = \{1, 2, 3\}\text{.} \end{equation*} [🔗](#subsec_notation-3) This is read, “\(A\) is the set containing the elements 1, 2, and 3.” We use curly braces “\(\{,~~ \}\)” to enclose elements of a set. Some more notation: \begin{equation*} a \in \{a, b, c\}\text{.} \end{equation*} [🔗](#subsec_notation-4) The symbol “\(\in\)” is read “is in” or “is an element of.” Thus the above means that \(a\) is an element of the set containing the letters \(a\text{,}\) \(b\text{,}\) and \(c\text{.}\) Note that this is a true statement. It would also be true to say that \(d\) is not in that set: \begin{equation*} d \not\in \{a, b, c\}\text{.} \end{equation*} [🔗](#subsec_notation-5) Be warned: We write “\(x \in A\)” when we wish to express that one of the elements of the set \(A\) is \(x\text{.}\) For example, consider the set, \begin{equation*} A = \{1, b, \{x, y, z\}, \emptyset\}\text{.} \end{equation*} [🔗](#subsec_notation-6) This is a strange set, to be sure. It contains four elements: the number 1, the letter b, the set \(\{x,y,z\}\text{,}\) and the empty set \(\emptyset = \{ \}\text{,}\) the set containing no elements. Is \(x\) in \(A\text{?}\) The answer is no. None of the four elements in \(A\) are the letter \(x\text{,}\) so we must conclude that \(x \notin A\text{.}\) Similarly, consider the set \(B = \{1,b\}\text{.}\) Even though the elements of \(B\) are elements of \(A\text{,}\) we cannot say that the *set* \(B\) is one of the elements of \(A\text{.}\) Therefore \(B \notin A\text{.}\) (Soon we will see that \(B\) is a *subset* of \(A\text{,}\) but this is different from being an *element* of \(A\text{.}\))[🔗](#subsec_notation-7) We have described the sets above by listing their elements. Sometimes this is hard to do, especially when there are a lot of elements in the set (perhaps infinitely many). For instance, if we want \(A\) to be the set of all even natural numbers, would could write, \begin{equation*} A = \{0, 2, 4, 6, \ldots\}\text{,} \end{equation*} but this is a little imprecise. A better way would be \begin{equation*} A = \{x \in \N \st \text{ there exists }n \in \N \text{ such that } x = 2 n\}\text{.} \end{equation*} [🔗](#subsec_notation-8) Let’s look at this carefully. First, there are some new symbols to digest: “\(\N\)” is the symbol usually used to denote the natural numbers, which we will take to be the set \(\{0, 1, 2, 3, \ldots\}\text{.}\) Next, the colon, “:”, is read *such that*; it separates the elements that are in the set from the condition that the elements in the set must satisfy. So putting this all together, we would read the set as, “the set of all \(x\) in the natural numbers, such that there exists some \(n\) in the natural numbers for which \(x\) is twice \(n\text{.}\)” In other words, the set of all natural numbers that are even. Here is another way to write the same set. \begin{equation*} A = \{x \in \N \st x\text{ is even} \}\text{.} \end{equation*} [🔗](#subsec_notation-9) Note: Sometimes mathematicians use \(|\) or \(\backepsilon\) for the “such that” symbol instead of the colon. Also, there is a fairly even split between mathematicians about whether \(0\) is an element of the natural numbers, so be careful there.[🔗](#subsec_notation-10) This notation is usually called set builder notation. It tells us how to *build* a set by telling us precisely the condition elements must meet to gain access (the condition is the logical statement after the “\(\st\)” symbol). Reading and comprehending sets written in this way takes practice. Here are some more examples:[🔗](#subsec_notation-11)

#### Example 5.1.1.

Describe each of the following sets both in words and by listing out enough elements to see the pattern.[🔗](#subsec_notation-12-1-1)

1. \(\{x \st x + 3 \in \N\}\text{.}\) [🔗](#subsec_notation-12-1-2-1-1)
2. \(\{x \in \N \st x + 3 \in \N\}\text{.}\) [🔗](#subsec_notation-12-1-2-1-2)
3. \(\{x \st x \in \N \text{ or } -x \in \N\}\text{.}\) [🔗](#subsec_notation-12-1-2-1-3)
4. \(\{x \st x \in \N \text{ and } -x \in \N\}\text{.}\) [🔗](#subsec_notation-12-1-2-1-4)

[🔗](#subsec_notation-12-1-2) Solution.

1. This is the set of all numbers that are 3 less than a natural number (i.e., that if you add 3 to them, you get a natural number). The set could also be written as \(\{-3, -2, -1, 0, 1, 2, \ldots\}\) (note that 0 is a natural number, so \(-3\) is in this set because \(-3 + 3 = 0\)).[🔗](#subsec_notation-12-2-1-1-1-1) [🔗](#subsec_notation-12-2-1-1-1)
2. This is the set of all natural numbers that are 3 less than a natural number. So here we just have \(\{0, 1, 2,3 \ldots\}\text{.}\)[🔗](#subsec_notation-12-2-1-1-2-1) [🔗](#subsec_notation-12-2-1-1-2)
3. This is the set of all integers (positive and negative whole numbers, written \(\Z\)). In other words, \(\{\ldots, -2, -1, 0, 1, 2, \ldots\}\text{.}\)[🔗](#subsec_notation-12-2-1-1-3-1) [🔗](#subsec_notation-12-2-1-1-3)
4. Here we want all numbers \(x\) such that \(x\) and \(-x\) are natural numbers. There is only one: 0. So we have the set \(\{0\}\text{.}\)[🔗](#subsec_notation-12-2-1-1-4-1) [🔗](#subsec_notation-12-2-1-1-4)

[🔗](#subsec_notation-12-2-1) [🔗](#subsec_notation-12-2) [🔗](#subsec_notation-12)There is also a subtle variation on set builder notation. While the condition is generally given after the “such that”, sometimes it is hidden in the first part. Here is an example.[🔗](#subsec_notation-13)

#### Example 5.1.2.

List a few elements in the sets below and describe them in words. The set \(\Z\) is the set of integers; positive and negative whole numbers.

1. \(\displaystyle A = \{x \in \Z \st x^2 \in \N\}\)[🔗](#subsec_notation-14-1-1-3-1-1) [🔗](#subsec_notation-14-1-1-3-1)
2. \(\displaystyle B = \{x^2 \st x \in \N\}\)[🔗](#subsec_notation-14-1-1-3-2-1) [🔗](#subsec_notation-14-1-1-3-2)

[🔗](#subsec_notation-14-1-1) Solution.

1. The set of integers that pass the condition that their square is a natural number. Well, every integer, when you square it, gives you a non-negative integer, so a natural number. Thus \(A = \Z = \{\ldots, -2, -1, 0, 1, 2, 3, \ldots\}\text{.}\)[🔗](#subsec_notation-14-2-1-1-1-1) [🔗](#subsec_notation-14-2-1-1-1)
2. Here we are looking for the set of all \(x^2\)s where \(x\) is a natural number. So this set is simply the set of perfect squares. \(B = \{0, 1, 4, 9, 16, \ldots\}\text{.}\)[🔗](#subsec_notation-14-2-1-1-2-1) Another way we could have written this set, using more strict set builder notation, would be as \(B = \{x \in \N \st x = n^2 \text{ for some } n \in \N\}\text{.}\)[🔗](#subsec_notation-14-2-1-1-2-2) [🔗](#subsec_notation-14-2-1-1-2)

[🔗](#subsec_notation-14-2-1) [🔗](#subsec_notation-14-2) [🔗](#subsec_notation-14)We already have a lot of notation, and there is more yet. Below is a handy chart of symbols. Some of these will be discussed in greater detail as we move forward.[🔗](#subsec_notation-15)

#### Special sets.

\(\emptyset\)[🔗](#subsec_notation-16-2-1-1) The empty set is the set that contains no elements. [🔗](#subsec_notation-16-2-1-1-2) \(\N\)[🔗](#subsec_notation-16-2-1-2) The set of natural numbers. That is, \(\N = \{0, 1, 2, 3\ldots\}\text{.}\) [🔗](#subsec_notation-16-2-1-2-2) \(\Z\)[🔗](#subsec_notation-16-2-1-3) The set of integers. That is, \(\Z = \{\ldots, -2, -1, 0, 1, 2, 3, \ldots\}\text{.}\) [🔗](#subsec_notation-16-2-1-3-2) \(\Q\)[🔗](#subsec_notation-16-2-1-4) The set of rational numbers. [🔗](#subsec_notation-16-2-1-4-2) \(\R\)[🔗](#subsec_notation-16-2-1-5) The set of real numbers. [🔗](#subsec_notation-16-2-1-5-2) \(\pow(A)\)[🔗](#subsec_notation-16-2-1-6) The power set of any set \(A\) is the set of all subsets of \(A\text{.}\) [🔗](#subsec_notation-16-2-1-6-2) [🔗](#subsec_notation-16-2) [🔗](#subsec_notation-16)

#### Set Theory Notation.

\(\{, \}\)[🔗](#subsec_notation-17-2-1-1) We use these braces to enclose the elements of a set. So \(\{1,2,3\}\) is the set containing 1, 2, and 3. [🔗](#subsec_notation-17-2-1-1-2) \(\st\)[🔗](#subsec_notation-17-2-1-2) \(\{x \st x > 2\}\) is the set of all \(x\) such that \(x\) is greater than 2. [🔗](#subsec_notation-17-2-1-2-2) \(\in\)[🔗](#subsec_notation-17-2-1-3) \(2 \in \{1,2,3\}\) asserts that 2 is an element of the set \(\{1,2,3\}\text{.}\) [🔗](#subsec_notation-17-2-1-3-2) \(\not\in\)[🔗](#subsec_notation-17-2-1-4) \(4 \notin \{1,2,3\}\) because 4 is not an element of the set \(\{1,2,3\}\text{.}\)[🔗](#subsec_notation-17-2-1-4-2) \(\subseteq\)[🔗](#subsec_notation-17-2-1-5) \(A \subseteq B\) asserts that \(A\) is a subset of \(B\): Every element of \(A\) is also an element of \(B\text{.}\) [🔗](#subsec_notation-17-2-1-5-2) \(\subset\)[🔗](#subsec_notation-17-2-1-6) \(A \subset B\) asserts that \(A\) is a proper subset of \(B\): Every element of \(A\) is also an element of \(B\text{,}\) but \(A \ne B\text{.}\) [🔗](#subsec_notation-17-2-1-6-2) \(\cap\)[🔗](#subsec_notation-17-2-1-7) \(A \cap B\) is the intersection of \(A\) and \(B\): the set containing all elements that are elements of both \(A\) and \(B\text{.}\) [🔗](#subsec_notation-17-2-1-7-2) \(\cup\)[🔗](#subsec_notation-17-2-1-8) \(A \cup B\) is the union of \(A\) and \(B\): the set containing all elements that are elements of \(A\) or \(B\) or both. [🔗](#subsec_notation-17-2-1-8-2) \(\times\)[🔗](#subsec_notation-17-2-1-9) \(A \times B\) is the Cartesian product of \(A\) and \(B\): the set of all ordered pairs \((a,b)\) with \(a \in A\) and \(b \in B\text{.}\) [🔗](#subsec_notation-17-2-1-9-2) \(\setminus\)[🔗](#subsec_notation-17-2-1-10) \(A \setminus B\) is set difference between \(A\) and \(B\): the set containing all elements of \(A\) that are not elements of \(B\text{.}\) [🔗](#subsec_notation-17-2-1-10-2) \(\bar{A}\)[🔗](#subsec_notation-17-2-1-11) The complement of \(A\) is the set of everything that is not an element of \(A\text{.}\) [🔗](#subsec_notation-17-2-1-11-2) \(\card{A}\)[🔗](#subsec_notation-17-2-1-12) The cardinality (or size) of \(A\) is the number of elements in \(A\text{.}\) [🔗](#subsec_notation-17-2-1-12-2) [🔗](#subsec_notation-17-2) [🔗](#subsec_notation-17)

#### Investigate!

1. Find the cardinality of each set below. \(A = \{3,4,\ldots, 15\}\text{.}\) [🔗](#subsec_notation-18-1-1-1-1-1-1)
2. \(B = \{n \in \N \st 2 \lt n \le 200\}\text{.}\) [🔗](#subsec_notation-18-1-1-1-1-1-2)
3. \(C = \{n \le 100 \st n \in \N \text{ and for some } m \in \N, (n = 2m+1)\}\text{.}\) [🔗](#subsec_notation-18-1-1-1-1-1-3)

[🔗](#subsec_notation-18-1-1-1-1) [🔗](#subsec_notation-18-1-1-1) Find two sets \(A\) and \(B\) for which \(|A| = 5\text{,}\) \(|B| = 6\text{,}\) and \(|A\cup B| = 9\text{.}\) What is \(|A \cap B|\text{?}\)[🔗](#subsec_notation-18-1-1-2-1) [🔗](#subsec_notation-18-1-1-2) Find sets \(A\) and \(B\) with \(|A| = |B|\) such that \(|A\cup B| = 7\) and \(|A \cap B| = 3\text{.}\) What is \(|A|\text{?}\)[🔗](#subsec_notation-18-1-1-3-1) [🔗](#subsec_notation-18-1-1-3) Let \(A = \{1,2,\ldots, 10\}\text{.}\) Define \(\mathcal{B}_2 = \{B \subseteq A \st |B| = 2\}\text{.}\) Find \(|\mathcal{B}_2|\text{.}\)[🔗](#subsec_notation-18-1-1-4-1) [🔗](#subsec_notation-18-1-1-4) For any sets \(A\) and \(B\text{,}\) define \(AB = \{ab \st a\in A \text{ and } b \in B\}\text{.}\) If \(A = \{1,2\}\) and \(B = \{2,3,4\}\text{,}\) what is \(|AB|\text{?}\) What is \(|A \times B|\text{?}\) [🔗](#subsec_notation-18-1-1-5) [🔗](#subsec_notation-18-1) [🔗](#subsec_notation-18)[🔗](#subsec_notation)

### Subsection Relationships between Sets

We have already said what it means for two sets to be equal: They have exactly the same elements. Thus, for example, \begin{equation*} \{1, 2, 3\} = \{2, 1, 3\}\text{.} \end{equation*} [🔗](#sec_structures-sets-4-3) (Remember, the order the elements are written down in does not matter.) Also, \begin{equation*} \{1, 2, 3\} = \{1, 1+1, 1+1+1\} = \{I, II, III\} = \{1, 2, 3, 1+2\} \end{equation*} since these are all ways to write the set containing the first three positive integers (how we write them doesn’t matter, just what they are). [🔗](#sec_structures-sets-4-4) What about the sets \(A = \{1, 2, 3\}\) and \(B = \{1, 2, 3, 4\}\text{?}\) Clearly \(A \ne B\text{,}\) but notice that every element of \(A\) is also an element of \(B\text{.}\) Because of this we say that \(A\) is a *subset* of \(B\text{,}\) or in symbols, \(A \subset B\) or \(A \subseteq B\text{.}\) Both symbols are read “is a subset of.” The difference is that sometimes we want to say that \(A\) is either equal to or is a subset of \(B\text{,}\) in which case we use \(\subseteq\text{.}\) This is analogous to the difference between \(\lt\) and \(\le\text{.}\)[🔗](#sec_structures-sets-4-5)

#### Example 5.1.3.

Let \(A = \{1, 2, 3, 4, 5, 6\}\text{,}\) \(B = \{2, 4, 6\}\text{,}\) \(C = \{1, 2, 3\}\text{,}\) and \(D = \{7, 8, 9\}\text{.}\) Determine which of the following are true, false, or meaningless.[🔗](#sec_structures-sets-4-6-1-1)

1. \(A \subset B\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-1)
2. \(B \subset A\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-2)
3. \(B \in C\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-3)
4. \(\emptyset \in A\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-4)
5. \(\emptyset \subset A\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-5)
6. \(A \lt D\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-6)
7. \(3 \in C\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-7)
8. \(3 \subset C\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-8)
9. \(\{3\} \subset C\text{.}\) [🔗](#sec_structures-sets-4-6-1-2-1-9)

[🔗](#sec_structures-sets-4-6-1-2) Solution.

1. False. For example, \(1\in A\) but \(1 \notin B\text{.}\)[🔗](#sec_structures-sets-4-6-2-1-1-1-1) [🔗](#sec_structures-sets-4-6-2-1-1-1)
2. True. Every element in \(B\) is an element in \(A\text{.}\)[🔗](#sec_structures-sets-4-6-2-1-1-2-1) [🔗](#sec_structures-sets-4-6-2-1-1-2)
3. False. The elements in \(C\) are 1, 2, and 3. The *set* \(B\) is not equal to 1, 2, or 3.[🔗](#sec_structures-sets-4-6-2-1-1-3-1) [🔗](#sec_structures-sets-4-6-2-1-1-3)
4. False. \(A\) has exactly 6 elements, and none of them are the empty set.[🔗](#sec_structures-sets-4-6-2-1-1-4-1) [🔗](#sec_structures-sets-4-6-2-1-1-4)
5. True. Everything in the empty set (nothing) is also an element of \(A\text{.}\) Notice that the empty set is a subset of every set.[🔗](#sec_structures-sets-4-6-2-1-1-5-1) [🔗](#sec_structures-sets-4-6-2-1-1-5)
6. Meaningless. A set cannot be less than another set.[🔗](#sec_structures-sets-4-6-2-1-1-6-1) [🔗](#sec_structures-sets-4-6-2-1-1-6)
7. True. \(3\) is one of the elements of the set \(C\text{.}\)[🔗](#sec_structures-sets-4-6-2-1-1-7-1) [🔗](#sec_structures-sets-4-6-2-1-1-7)
8. Meaningless. \(3\) is not a set, so it cannot be a subset of another set.[🔗](#sec_structures-sets-4-6-2-1-1-8-1) [🔗](#sec_structures-sets-4-6-2-1-1-8)
9. True. \(3\) is the only element of the set \(\{3\}\text{,}\) and is an element of \(C\text{,}\) so every element in \(\{3\}\) is an element of \(C\text{.}\)[🔗](#sec_structures-sets-4-6-2-1-1-9-1) [🔗](#sec_structures-sets-4-6-2-1-1-9)

[🔗](#sec_structures-sets-4-6-2-1) [🔗](#sec_structures-sets-4-6-2) [🔗](#sec_structures-sets-4-6)In the example above, \(B\) is a subset of \(A\text{.}\) You might wonder what other sets are subsets of \(A\text{.}\) If you collect all these subsets of \(A\) into a new set, we get a set of sets. We call the set of all subsets of \(A\) the power set of \(A\text{,}\) and write it \(\pow(A)\text{.}\)[🔗](#sec_structures-sets-4-7)

#### Example 5.1.4.

Let \(A = \{1,2,3\}\text{.}\) Find \(\pow(A)\text{.}\)[🔗](#sec_structures-sets-4-8-1-1) Solution. \(\pow(A)\) is a set of sets, all of which are subsets of \(A\text{.}\) So \begin{equation*} \pow(A) = \{ \emptyset, \{1\}, \{2\}, \{3\}, \{1,2\}, \{1, 3\}, \{2,3\}, \{1,2,3\}\}\text{.} \end{equation*} [🔗](#sec_structures-sets-4-8-2-1) Notice that while \(2 \in A\text{,}\) it is wrong to write \(2 \in \pow(A)\) since none of the elements in \(\pow(A)\) are numbers! On the other hand, we do have \(\{2\} \in \pow(A)\) because \(\{2\} \subseteq A\text{.}\)[🔗](#sec_structures-sets-4-8-2-2) What does a subset of \(\pow(A)\) look like? Notice that \(\{2\} \not\subseteq \pow(A)\) because not everything in \(\{2\}\) is in \(\pow(A)\text{.}\) But we do have \(\{ \{2\} \} \subseteq \pow(A)\text{.}\) The only element of \(\{\{2\}\}\) is the set \(\{2\}\text{,}\) which is also an element of \(\pow(A)\text{.}\) We could take the collection of all subsets of \(\pow(A)\) and call that \(\pow(\pow(A))\text{.}\) Or even the power set of that set of sets of sets.[🔗](#sec_structures-sets-4-8-2-3) [🔗](#sec_structures-sets-4-8-2) [🔗](#sec_structures-sets-4-8)Another way to compare sets is by their *size*. Notice that in the example above, \(A\) has 6 elements, and \(B\text{,}\) \(C\text{,}\) and \(D\) all have 3 elements. The size of a set is called the set’s cardinality. We would write \(|A| = 6\text{,}\) \(|B| = 3\text{,}\) and so on. For sets that have a finite number of elements, the cardinality of the set is simply the number of elements in the set. Note that the cardinality of \(\{ 1, 2, 3, 2, 1\}\) is 3. We do not count repeats (in fact, \(\{1, 2, 3, 2, 1\}\) is exactly the same set as \(\{1, 2, 3\}\)). There are sets with infinite cardinality, such as \(\N\text{,}\) the set of rational numbers (written \(\mathbb Q\)), the set of even natural numbers, and the set of real numbers (\(\mathbb R\)). It is possible to distinguish between different infinite cardinalities, but that is beyond the scope of this text. For us, a set will either be infinite or finite; if it is finite, then we can determine its cardinality by counting elements.[🔗](#sec_structures-sets-4-9)

#### Example 5.1.5.

1. Find the cardinality of \(A = \{23, 24, \ldots, 37, 38\}\text{.}\)[🔗](#sec_structures-sets-4-10-3-1-1-1-1) [🔗](#sec_structures-sets-4-10-3-1-1-1)
2. Find the cardinality of \(B = \{1, \{2, 3, 4\}, \emptyset\}\text{.}\)[🔗](#sec_structures-sets-4-10-3-1-1-2-1) [🔗](#sec_structures-sets-4-10-3-1-1-2)
3. If \(C = \{1,2,3\}\text{,}\) what is the cardinality of \(\pow(C)\text{?}\)[🔗](#sec_structures-sets-4-10-3-1-1-3-1) [🔗](#sec_structures-sets-4-10-3-1-1-3)

[🔗](#sec_structures-sets-4-10-3-1) Solution.

1. Since \(38 - 23 = 15\text{,}\) we can conclude that the cardinality of the set is \(|A| = 16\) (you need to add one since 23 is included).[🔗](#sec_structures-sets-4-10-4-1-1-1-1) [🔗](#sec_structures-sets-4-10-4-1-1-1)
2. Here \(|B| = 3\text{.}\) The three elements are the number 1, the set \(\{2,3,4\}\text{,}\) and the empty set.[🔗](#sec_structures-sets-4-10-4-1-1-2-1) [🔗](#sec_structures-sets-4-10-4-1-1-2)
3. We wrote out the elements of the power set \(\pow(C)\) above, and there are 8 elements (each of which is a set). So \(\card{\pow(C)} = 8\text{.}\) (You might wonder if there is a relationship between \(\card{A}\) and \(\card{\pow(A)}\) for all sets \(A\text{.}\) This is a good question that we explore in [Chapter 3](ch_counting.html).)[🔗](#sec_structures-sets-4-10-4-1-1-3-1) [🔗](#sec_structures-sets-4-10-4-1-1-3)

[🔗](#sec_structures-sets-4-10-4-1) [🔗](#sec_structures-sets-4-10-4) [🔗](#sec_structures-sets-4-10)[🔗](#sec_structures-sets-4)

### Subsection Operations on Sets

Is it possible to add two sets? Not really, however there is something similar. If we want to combine two sets to get the collection of objects that are in either set, then we can take the union of the two sets. Symbolically, \begin{equation*} C = A \cup B\text{,} \end{equation*} read, “\(C\) is the union of \(A\) and \(B\text{,}\)” means that the elements of \(C\) are exactly the elements that are either an element of \(A\) or an element of \(B\) (or an element of both). For example, if \(A = \{1, 2, 3\}\) and \(B = \{2, 3, 4\}\text{,}\) then \(A \cup B = \{1, 2, 3, 4\}\text{.}\) [🔗](#sec_structures-sets-5-4) The other common operation on sets is intersection. We write, \begin{equation*} C = A \cap B \end{equation*} and say, “\(C\) is the intersection of \(A\) and \(B\text{,}\)” when the elements in \(C\) are precisely those both in \(A\) and in \(B\text{.}\) So if \(A = \{1, 2, 3\}\) and \(B = \{2, 3, 4\}\text{,}\) then \(A \cap B = \{2, 3\}\text{.}\) [🔗](#sec_structures-sets-5-5) Often when dealing with sets, we will have some understanding as to what “everything” is. Perhaps we are only concerned with natural numbers. In this case we would say that our universe is \(\N\text{.}\) Sometimes we denote this universe by \(\U\text{.}\) Given this context, we might wish to speak of all the elements that are *not* in a particular set. We say \(B\) is the complement of \(A\text{,}\) and write, \begin{equation*} B = \bar A \end{equation*} when \(B\) contains every element not contained in \(A\text{.}\) So, if our universe is \(\{1, 2,\ldots, 9, 10\}\text{,}\) and \(A = \{2, 3, 5, 7\}\text{,}\) then \(\bar A = \{1, 4, 6, 8, 9,10\}\text{.}\) [🔗](#sec_structures-sets-5-6) Of course we can perform more than one operation at a time. For example, consider \begin{equation*} A \cap \bar B\text{.} \end{equation*} [🔗](#sec_structures-sets-5-7) This is the set of all elements that are both elements of \(A\) and not elements of \(B\text{.}\) What have we done? We’ve started with \(A\) and removed all of the elements that were in \(B\text{.}\) Another way to write this is the set difference: \begin{equation*} A \cap \bar B = A \setminus B\text{.} \end{equation*} [🔗](#sec_structures-sets-5-8) It is important to remember that these operations (union, intersection, complement, and difference) on sets produce other sets. Don’t confuse these with the symbols from the previous section (element of and subset of). \(A \cap B\) is a set, while \(A \subseteq B\) is true or false. This is the same difference as between \(3 + 2\) (which is a number) and \(3 \le 2\) (which is false).[🔗](#sec_structures-sets-5-9)

#### Example 5.1.6.

Let \(A = \{1, 2, 3, 4, 5, 6\}\text{,}\) \(B = \{2, 4, 6\}\text{,}\) \(C = \{1, 2, 3\}\text{,}\) and \(D = \{7, 8, 9\}\text{.}\) If the universe is \(\U = \{1, 2, \ldots, 10\}\text{,}\) find:

1. \(A \cup B\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-1)
2. \(A \cap B\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-2)
3. \(B \cap C\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-3)
4. \(A \cap D\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-4)
5. \(\bar{B \cup C}\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-5)
6. \(A \setminus B\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-6)
7. \((D \cap \bar C) \cup \bar{A \cap B}\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-7)
8. \(\emptyset \cup C\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-8)
9. \(\emptyset \cap C\text{.}\) [🔗](#sec_structures-sets-5-10-1-1-6-9)

[🔗](#sec_structures-sets-5-10-1-1) Solution.

1. \(A \cup B = \{1, 2, 3, 4, 5, 6\} = A\) since everything in \(B\) is already in \(A\text{.}\) [🔗](#sec_structures-sets-5-10-2-1-1-1)
2. \(A \cap B = \{2, 4, 6\} = B\) since everything in \(B\) is in \(A\text{.}\) [🔗](#sec_structures-sets-5-10-2-1-1-2)
3. \(B \cap C = \{2\}\) as the only element of both \(B\) and \(C\) is 2. [🔗](#sec_structures-sets-5-10-2-1-1-3)
4. \(A \cap D = \emptyset\) since \(A\) and \(D\) have no common elements. [🔗](#sec_structures-sets-5-10-2-1-1-4)
5. \(\bar{B \cup C} = \{5, 7, 8, 9, 10\}\text{.}\) First we find that \(B \cup C = \{1, 2, 3, 4, 6\}\text{,}\) and then we take everything not in that set. [🔗](#sec_structures-sets-5-10-2-1-1-5)
6. \(A \setminus B = \{1, 3, 5\}\) since the elements 1, 3, and 5 are in \(A\) but not in \(B\text{.}\) This is the same as \(A \cap \bar B\text{.}\) [🔗](#sec_structures-sets-5-10-2-1-1-6)
7. \((D \cap \bar C) \cup \bar{A \cap B} = \{1, 3, 5, 7, 8, 9, 10\}\text{.}\) The set contains all elements that are either in \(D\) but not in \(C\) (i.e., \(\{7,8,9\}\)), or not in both \(A\) and \(B\) (i.e., \(\{1,3,5,7,8,9,10\}\)). [🔗](#sec_structures-sets-5-10-2-1-1-7)
8. \(\emptyset \cup C = C\) since nothing is added by the empty set. [🔗](#sec_structures-sets-5-10-2-1-1-8)
9. \(\emptyset \cap C = \emptyset\) since nothing can be both in a set and in the empty set. [🔗](#sec_structures-sets-5-10-2-1-1-9)

[🔗](#sec_structures-sets-5-10-2-1) [🔗](#sec_structures-sets-5-10-2) [🔗](#sec_structures-sets-5-10)Having notation like this is useful. We will often want to add or remove elements from sets, and our notation allows us to do so precisely.[🔗](#sec_structures-sets-5-11)

#### Example 5.1.7.

If \(A = \{1,2,3\}\text{,}\) then we can describe the set we get by adding the number 4 as \(A \cup \{4\}\text{.}\) If we want to express the set we get by removing the number 2 from \(A\text{,}\) we can do so by writing \(A \setminus \{2\}\text{.}\)[🔗](#sec_structures-sets-5-12-1-1) Careful though. If you add an element to the set, you get a new set! So you would have \(B = A \cup \{4\}\) and then correctly say that \(B\) contains 4, but \(A\) does not.[🔗](#sec_structures-sets-5-12-1-2) [🔗](#sec_structures-sets-5-12)There is one more way to combine sets that will be useful for us: the Cartesian product, \(A \times B\text{.}\) This sounds fancy but is nothing you haven’t seen before. When you graph a function in calculus, you graph it in the Cartesian plane. This is the set of all ordered pairs of real numbers \((x,y)\text{.}\) We can do this for *any* pair of sets, not just the real numbers with themselves.[🔗](#sec_structures-sets-5-13) Put another way, \(A \times B = \{(a,b) \st a \in A \text{ and } b \in B\}\text{.}\) The first coordinate comes from the first set, and the second coordinate comes from the second set. Sometimes we will want to take the Cartesian product of a set with itself, and this is fine: \(A \times A = \{(a,b) \st a, b \in A\}\) (we might also write \(A^2\) for this set). Notice that in \(A \times A\text{,}\) we still want *all* ordered pairs, not just the ones where the first and second coordinate are the same. We can also take products of 3 or more sets, getting ordered triples, or quadruples, and so on.[🔗](#sec_structures-sets-5-14)

#### Example 5.1.8.

Let \(A = \{1,2\}\) and \(B = \{3,4,5\}\text{.}\) Find \(A \times B\) and \(A \times A\text{.}\) How many elements do you expect to be in \(B \times B\text{?}\)[🔗](#sec_structures-sets-5-15-1-1) Solution. \(A \times B = \{(1,3), (1,4), (1,5), (2,3), (2,4), (2,5)\}\text{.}\)[🔗](#sec_structures-sets-5-15-2-1) \(A \times A = A^2 = \{(1,1), (1,2), (2,1), (2,2)\}\text{.}\)[🔗](#sec_structures-sets-5-15-2-2) \(|B\times B| = 9\text{.}\) There will be 3 pairs with first coordinate \(3\text{,}\) three more with first coordinate \(4\text{,}\) and a final three with first coordinate \(5\text{.}\)[🔗](#sec_structures-sets-5-15-2-3) [🔗](#sec_structures-sets-5-15-2) [🔗](#sec_structures-sets-5-15)[🔗](#sec_structures-sets-5)

### Subsection Venn Diagrams

There is a very nice visual tool we can use to represent operations on sets. A Venn diagram displays sets as intersecting circles. We can shade the region we are talking about when we carry out an operation. We can also represent the cardinality of a particular set by putting the number in the corresponding region.[🔗](#sec_structures-sets-6-4) ![Two overlapping circles enclosed in a rectangular box. Circles labeled A and B.](generated/latex-image/two-set-venn-empty.svg) ![Three overlapping circles enclosed in a rectangle. The circle labeled A is in the top left, the circle labeled B is in the top right, the circle labeled C is in the bottom center. The circles intersect to create seven interior regions: one inside all circles, three inside just a pair of circles, and three inside only one circle.](generated/latex-image/three-set-empty.svg) Each circle represents a set. The rectangle containing the circles represents the universe. To represent combinations of these sets, we shade the corresponding region. For example, we could draw \(A \cap B\) as: [🔗](#sec_structures-sets-6-6) ![Two overlapping circles enclosed in a rectangular box. Circles labeled A and B. The overlapping region inside both circles is shaded light gray.](generated/latex-image/two-set-cap.svg) Here is a representation of \(A \cap \bar B\text{,}\) or equivalently \(A \setminus B\text{:}\) [🔗](#sec_structures-sets-6-8) ![Two overlapping circles enclosed in a rectangular box. Circles labeled A and B. The region inside circle A but outside circle B is shaded light gray.](generated/latex-image/two-set-a-minus-b.svg) A more complicated example is \((B \cap C) \cup (C \cap \bar A)\text{,}\) as seen below.[🔗](#sec_structures-sets-6-10) ![Three overlapping circles enclosed in a rectangle. The circle labeled A is in the top left, the circle labeled B is in the top right, the circle labeled C is in the bottom center. The circles intersect to create seven interior regions: one inside all circles, three inside just a pair of circles, and three inside only one circle. Three of the seven regions are shaded light gray: the region in C alone, the region in just C and B, and the center region in all three circles.](generated/latex-image/three-set-complicated.svg) Notice that the shaded regions above could also be arrived at in another way. We could have started with all of \(C\) and then excluded the region where \(C\) and \(A\) overlap outside of \(B\text{.}\) That region is \((A \cap C) \cap \bar B\text{.}\) So the above Venn diagram also represents \(C \cap \bar{\left((A\cap C)\cap \bar B\right)}\text{.}\) So using just the picture, we have determined that \begin{equation*} (B \cap C) \cup (C \cap \bar A) = C \cap \bar{\left((A\cap C)\cap \bar B\right)}\text{.} \end{equation*} [🔗](#sec_structures-sets-6-12) [🔗](#sec_structures-sets-6)

### Exercises Exercises

#### 1.

Activate \(A = {\left\{5,7,8,9,10\right\}}\text{ and } B = {\left\{5,10,11,15,20\right\}}\) Find each of the following sets.[🔗](#extracted-webwork-224-1-1-1) Your answers should include the curly braces[🔗](#extracted-webwork-224-1-1-2)

1. \(\displaystyle A \cup B\text{.}\)[🔗](#extracted-webwork-224-1-1-3-1-1-1) [🔗](#extracted-webwork-224-1-1-3-1-1)
2. \(\displaystyle A \cap B\text{.}\)[🔗](#extracted-webwork-224-1-1-3-1-2-1) [🔗](#extracted-webwork-224-1-1-3-1-2)
3. \(\displaystyle A \setminus B\text{.}\)[🔗](#extracted-webwork-224-1-1-3-1-3-1) [🔗](#extracted-webwork-224-1-1-3-1-3)
4. \(\displaystyle B \setminus A\text{.}\)[🔗](#extracted-webwork-224-1-1-3-1-4-1) [🔗](#extracted-webwork-224-1-1-3-1-4)

[🔗](#extracted-webwork-224-1-1-3) [🔗](#ww-sets-ops)

#### 2.

Activate Find the least element of the following sets, if there is one.

1. \(\displaystyle \{n \in \mathbb{N} : n^2 - 5 \ge 5\}\)[🔗](#extracted-webwork-225-1-1-1-1-1-1) [🔗](#extracted-webwork-225-1-1-1-1-1)
2. \(\displaystyle \{n \in \mathbb{N} : n^2 - 10 \in \mathbb{N}\}\)[🔗](#extracted-webwork-225-1-1-1-1-2-1) [🔗](#extracted-webwork-225-1-1-1-1-2)
3. \(\displaystyle \{n^2+3 : n \in \mathbb{N}\}\)[🔗](#extracted-webwork-225-1-1-1-1-3-1) [🔗](#extracted-webwork-225-1-1-1-1-3)
4. \(\displaystyle \{n \in \mathbb{N} : n = k^2 + 3 \text{ for some } k \in \mathbb{N}\}\)[🔗](#extracted-webwork-225-1-1-1-1-4-1) [🔗](#extracted-webwork-225-1-1-1-1-4)

[🔗](#extracted-webwork-225-1-1-1) [🔗](#ww-sets-least)

#### 3.

Activate Find the following cardinalities.

1. \(|A|\) when \(A = \{2, 3, 4, 5,\ldots, 43\}\text{.}\)[🔗](#extracted-webwork-226-1-1-1-1-1-1) [🔗](#extracted-webwork-226-1-1-1-1-1)
2. \(|A|\) when \(A = \{x \in \mathbb{Z} : -4 \le x \le 92"\}\text{.}\)[🔗](#extracted-webwork-226-1-1-1-1-2-1) [🔗](#extracted-webwork-226-1-1-1-1-2)
3. \(|A \cap B|\) when \(A = \{x \in \mathbb{N} : x \le 30\}\) and \(B = \{x \in \mathbb{N} : x \text{ is prime }\}\text{.}\)[🔗](#extracted-webwork-226-1-1-1-1-3-1) [🔗](#extracted-webwork-226-1-1-1-1-3)

[🔗](#extracted-webwork-226-1-1-1) [🔗](#ww-sets-cards)

#### 4.

Activate Let \(A = {\left\{2,4,5,6,7\right\}}\) and \(B = {\left\{2,4,5,6,8\right\}}.\) Find a set of largest possible size that is a subset of both \(A \text{ and } B \text{.}\)[🔗](#extracted-webwork-227-1-1-1) [🔗](#ww-sets-large-common-subset)

#### 5.

Activate Find a set of smallest possible size that has both {1,3,9,10} and {2,3,5,7} as subsets.[🔗](#extracted-webwork-228-1-1-1) [🔗](#ww-sets-smallest-superset)

#### 6.

Activate Let \(A = \{n \in \mathbb{N} : 27 \le n \lt 60\}\) and \(B = \{n \in \mathbb{N} : 14 \lt n \le 51\}\text{.}\) Suppose \(C\) is a set such that \(C \subseteq A\) and \(C \subseteq B\text{.}\) What is the largest possible cardinality of \(C\text{?}\)[🔗](#extracted-webwork-229-1-1-1) [🔗](#ww-sets-subset-card)

#### 7.

Activate Let \(A = {\left\{3,6,11,13,14\right\}}\) and \(B = {\left\{3,6,14\right\}}\text{.}\) How many sets \(C\) have the property that \(C \subseteq A\) and \(B \subseteq C\text{.}\)[🔗](#extracted-webwork-230-1-1-1) Hint. You should be able to write all of them out. Don’t forget \(A\) and \(B\text{,}\) which are also candidates for \(C\text{.}\)[🔗](#extracted-webwork-230-1-2-1) [🔗](#extracted-webwork-230-1-2) [🔗](#ww-sets-number-of-between)

#### 8.

Activate Let \(A = {\left\{5,6,7,8,9\right\}}\text{,}\) \(B = {\left\{7,8,9,10,11\right\}}\text{,}\) and \(C = {\left\{6,9,11\right\}}\text{.}\)[🔗](#extracted-webwork-231-1-1-1)

1. Find \(A \cap B\text{.}\)[🔗](#extracted-webwork-231-1-1-2-1-1-1) [🔗](#extracted-webwork-231-1-1-2-1-1)
2. Find \(A \cup B\text{.}\)[🔗](#extracted-webwork-231-1-1-2-1-2-1) [🔗](#extracted-webwork-231-1-1-2-1-2)
3. Find \(A \setminus B\text{.}\)[🔗](#extracted-webwork-231-1-1-2-1-3-1) [🔗](#extracted-webwork-231-1-1-2-1-3)
4. Find \(A \cap \overline{(B \cup C)}\text{.}\)[🔗](#extracted-webwork-231-1-1-2-1-4-1) [🔗](#extracted-webwork-231-1-1-2-1-4)

[🔗](#extracted-webwork-231-1-1-2) [🔗](#ww-sets-ops2)

#### 9.

Activate Let \(A = \{x \in \mathbb{N} : 4 \le x \lt 16\}\) and \(B = \{x \in \mathbb{N} : x \text{ is even}\}\text{.}\)

1. Find \(A \cap B\text{.}\)[🔗](#extracted-webwork-232-1-1-1-3-1-1) [🔗](#extracted-webwork-232-1-1-1-3-1)
2. Find \(A \setminus B\text{.}\)[🔗](#extracted-webwork-232-1-1-1-3-2-1) [🔗](#extracted-webwork-232-1-1-1-3-2)

[🔗](#extracted-webwork-232-1-1-1) [🔗](#ww-sets-ops-builder)

#### 10.

Let \(A = \{x \in \mathbb{N} : 3 \le x \le 13\}\text{,}\) \(B = \{x \in \mathbb{N} : x \mbox{ is even} \}\text{,}\) and \(C = \{x \in \mathbb{N} : x \mbox{ is odd} \}\text{.}\)

1. Find \(A \cap B\text{.}\)[🔗](#exercises_intro-sets-10-1-1-4-1-1) [🔗](#exercises_intro-sets-10-1-1-4-1)
2. Find \(A \cup B\text{.}\)[🔗](#exercises_intro-sets-10-1-1-4-2-1) [🔗](#exercises_intro-sets-10-1-1-4-2)
3. Find \(B \cap C\text{.}\)[🔗](#exercises_intro-sets-10-1-1-4-3-1) [🔗](#exercises_intro-sets-10-1-1-4-3)
4. Find \(B \cup C\text{.}\)[🔗](#exercises_intro-sets-10-1-1-4-4-1) [🔗](#exercises_intro-sets-10-1-1-4-4)

[🔗](#exercises_intro-sets-10-1-1) [🔗](#exercises_intro-sets-10)

#### 11.

Find an example of sets \(A\) and \(B\) such that \(A\cap B = \{3, 5\}\) and \(A \cup B = \{2, 3, 5, 7, 8\}\text{.}\)[🔗](#exercises_intro-sets-11-1-1) [🔗](#exercises_intro-sets-11)

#### 12.

Find an example of sets \(A\) and \(B\) such that \(A \subseteq B\) and \(A \in B\text{.}\)[🔗](#exercises_intro-sets-12-1-1) [🔗](#exercises_intro-sets-12)

#### 13.

Recall \(\Z = \{\ldots,-2,-1,0, 1,2,\ldots\}\) (the integers). Let \(\Z^+ = \{1, 2, 3, \ldots\}\) be the positive integers. Let \(2\Z\) be the even integers, \(3\Z\) be the multiples of 3, and so on.

1. Is \(\Z^+ \subseteq 2\Z\text{?}\) Explain.[🔗](#exercises_intro-sets-13-1-1-5-1-1) [🔗](#exercises_intro-sets-13-1-1-5-1)
2. Is \(2\Z \subseteq \Z^+\text{?}\) Explain.[🔗](#exercises_intro-sets-13-1-1-5-2-1) [🔗](#exercises_intro-sets-13-1-1-5-2)
3. Find \(2\Z \cap 3\Z\text{.}\) Describe the set in words, and using set notation.[🔗](#exercises_intro-sets-13-1-1-5-3-1) [🔗](#exercises_intro-sets-13-1-1-5-3)
4. Express \(\{x \in \Z \st \exists y\in \Z (x = 2y \vee x = 3y)\}\) as a union or intersection of two sets already described in this problem.[🔗](#exercises_intro-sets-13-1-1-5-4-1) [🔗](#exercises_intro-sets-13-1-1-5-4)

[🔗](#exercises_intro-sets-13-1-1) [🔗](#exercises_intro-sets-13)

#### 14.

Let \(A_2\) be the set of all multiples of 2 except for \(2\text{.}\) Let \(A_3\) be the set of all multiples of 3 except for 3. And so on, so that \(A_n\) is the set of all multiples of \(n\) except for \(n\text{,}\) for any \(n \ge 2\text{.}\) Describe (in words) the set \(\bar{A_2 \cup A_3 \cup A_4 \cup \cdots}\text{.}\)[🔗](#exercises_intro-sets-14-1-1) Hint. It might help to think about what the union \(A_2 \cup A_3\) is first. Then think about what numbers are *not* in that union. What will happen when you also include \(A_5\text{?}\)[🔗](#exercises_intro-sets-14-2-1) [🔗](#exercises_intro-sets-14-2) [🔗](#exercises_intro-sets-14)

#### 15.

Draw a Venn diagram to represent each of the following:

1. \(\displaystyle A \cup \bar B\) [🔗](#exercises_intro-sets-15-1-1-1-1)
2. \(\displaystyle \bar{(A \cup B)}\) [🔗](#exercises_intro-sets-15-1-1-1-2)
3. \(\displaystyle A \cap (B \cup C)\) [🔗](#exercises_intro-sets-15-1-1-1-3)
4. \(\displaystyle (A \cap B) \cup C\) [🔗](#exercises_intro-sets-15-1-1-1-4)
5. \(\displaystyle \bar A \cap B \cap \bar C\) [🔗](#exercises_intro-sets-15-1-1-1-5)
6. \(\displaystyle (A \cup B) \setminus C\) [🔗](#exercises_intro-sets-15-1-1-1-6)

[🔗](#exercises_intro-sets-15-1-1) [🔗](#exercises_intro-sets-15)

#### 16.

Describe a set in terms of \(A\) and \(B\) (using set notation) which has the following Venn diagram:[🔗](#exercises_intro-sets-16-1-1) ![A Venn diagram for two sets, A and B. The regions inside A and B are shaded, but not the region inside both](generated/latex-image/not-A-and-B.svg) [🔗](#exercises_intro-sets-16)

#### 17.

Let \(A = \{a, b, c, d\}\text{.}\) Find \(\pow(A)\text{.}\)[🔗](#exercises_intro-sets-17-1-1) Hint. We are looking for a set containing 16 sets.[🔗](#exercises_intro-sets-17-2-1) [🔗](#exercises_intro-sets-17-2) [🔗](#exercises_intro-sets-17)

#### 18.

Activate Let \(A = \{1,2,\ldots, 13\}\text{.}\) How many subsets of \(A\) contain exactly one element (i.e., how many singleton subsets are there)?[🔗](#extracted-webwork-233-1-1-1) How many doubleton subsets (containing exactly two elements) are there?[🔗](#extracted-webwork-233-1-1-2) Hint. Write these out, or at least start to and look for a pattern.[🔗](#extracted-webwork-233-1-2-1) [🔗](#extracted-webwork-233-1-2) [🔗](#ww-sets-singles-doubles)

#### 19.

Let \(A = \{1,2,3,4,5,6\}\text{.}\) Find all sets \(B \in \pow(A)\) which have the property \(\{2,3,5\} \subseteq B\text{.}\)[🔗](#exercises_intro-sets-19-1-1) [🔗](#exercises_intro-sets-19)

#### 20.

Find an example of sets \(A\) and \(B\) such that \(|A| = 4\text{,}\) \(|B| = 5\text{,}\) and \(|A \cup B| = 9\text{.}\)[🔗](#exercises_intro-sets-20-1-1) [🔗](#exercises_intro-sets-20)

#### 21.

Find an example of sets \(A\) and \(B\) such that \(|A| = 3\text{,}\) \(|B| = 4\text{,}\) and \(|A \cup B| = 5\text{.}\)[🔗](#exercises_intro-sets-21-1-1) [🔗](#exercises_intro-sets-21)

#### 22.

Are there sets \(A\) and \(B\) such that \(|A| = |B|\text{,}\) \(|A\cup B| = 10\text{,}\) and \(|A\cap B| = 5\text{?}\) Explain.[🔗](#exercises_intro-sets-22-1-1) [🔗](#exercises_intro-sets-22)

#### 23.

Activate Let \(A = \{2, 4, 6, 8\}\text{.}\) Suppose \(B\) is a set with \(|B| = 5\text{.}\)

1. What are the smallest and largest possible values of \(|A \cup B|\text{?}\) Explain.[🔗](#extracted-webwork-234-1-1-1-4-1-1) [🔗](#extracted-webwork-234-1-1-1-4-1)
2. What are the smallest and largest possible values of \(|A \cap B|\text{?}\) Explain.[🔗](#extracted-webwork-234-1-1-1-4-2-1) [🔗](#extracted-webwork-234-1-1-1-4-2)
3. What are the smallest and largest possible values of \(|A \times B|\text{?}\) Explain.[🔗](#extracted-webwork-234-1-1-1-4-3-1) [🔗](#extracted-webwork-234-1-1-1-4-3)

[🔗](#extracted-webwork-234-1-1-1) [🔗](#ww-sets-possible-sizes)

#### 24.

Let \(X = \{n \in \N \st 10 \le n \lt 20\}\text{.}\) Find examples of sets with the properties below and very briefly explain why your examples work.

1. A set \(A \subseteq \N\) with \(|A| = 10\) such that \(X \setminus A = \{10, 12, 14\}\text{.}\)[🔗](#exercises_intro-sets-24-1-1-2-1-1) [🔗](#exercises_intro-sets-24-1-1-2-1)
2. A set \(B \in \pow(X)\) with \(|B| = 5\text{.}\)[🔗](#exercises_intro-sets-24-1-1-2-2-1) [🔗](#exercises_intro-sets-24-1-1-2-2)
3. A set \(C \subseteq \pow(X)\) with \(|C| = 5\text{.}\)[🔗](#exercises_intro-sets-24-1-1-2-3-1) [🔗](#exercises_intro-sets-24-1-1-2-3)
4. A set \(D \subseteq X \times X\) with \(|D| = 5\)[🔗](#exercises_intro-sets-24-1-1-2-4-1) [🔗](#exercises_intro-sets-24-1-1-2-4)
5. A set \(E \subseteq X\) such that \(|E| \in E\text{.}\)[🔗](#exercises_intro-sets-24-1-1-2-5-1) [🔗](#exercises_intro-sets-24-1-1-2-5)

[🔗](#exercises_intro-sets-24-1-1) [🔗](#exercises_intro-sets-24)

#### 25.

Let \(A\text{,}\) \(B\text{,}\) and \(C\) be sets.

1. Suppose that \(A \subseteq B\) and \(B \subseteq C\text{.}\) Does this mean that \(A \subseteq C\text{?}\) Prove your answer. Hint: To prove that \(A \subseteq C\text{,}\) you must prove the implication, “For all \(x\text{,}\) if \(x \in A\text{,}\) then \(x \in C\text{.}\)”[🔗](#exercises_intro-sets-25-1-1-4-1-1) [🔗](#exercises_intro-sets-25-1-1-4-1)
2. Suppose that \(A \in B\) and \(B \in C\text{.}\) Does this mean that \(A \in C\text{?}\) Give an example to prove that this does NOT always happen (and explain why your example works). You should be able to give an example where \(|A| = |B| = |C| = 2\text{.}\)[🔗](#exercises_intro-sets-25-1-1-4-2-1) [🔗](#exercises_intro-sets-25-1-1-4-2)

[🔗](#exercises_intro-sets-25-1-1) [🔗](#exercises_intro-sets-25)

#### 26.

In a regular deck of playing cards there are 26 red cards and 12 face cards. Explain, using sets and what you have learned about cardinalities, why there are only 32 cards which are either red or a face card.[🔗](#exercises_intro-sets-26-1-1) [🔗](#exercises_intro-sets-26)

#### 27.

Find an example of a set \(A\) with \(|A| = 3\) which contains only other sets and has the following property: For all sets \(B \in A\text{,}\) we also have \(B \subseteq A\text{.}\) Explain why your example works. (FYI: Sets that have this property are called transitive.) [🔗](#exercises_intro-sets-27-1-1) [🔗](#exercises_intro-sets-27)

#### 28.

Consider the sets \(A\) and \(B\text{,}\) where \(A = \{3, |B|\}\) and \(B = \{1, |A|, |B|\}\text{.}\) What are the sets?[🔗](#exercises_intro-sets-28-2-1) [🔗](#exercises_intro-sets-28)

#### 29.

Explain why there is no set \(A\) which satisfies \(A = \{2, \card{A}\}\text{.}\)[🔗](#exercises_intro-sets-29-1-1) Hint. It looks like you should be able to define the set \(A\) like this. But consider the two possible values for \(\card{A}\text{.}\)[🔗](#exercises_intro-sets-29-2-1) [🔗](#exercises_intro-sets-29-2) [🔗](#exercises_intro-sets-29)

#### 30.

Find all sets \(A\text{,}\) \(B\text{,}\) and \(C\) which satisfy the following. \begin{align*} A = \amp \{1, \card{B}, \card{C}\}\\ B = \amp \{2, \card{A}, \card{C}\}\\ C = \amp \{1, 2, \card{A}, \card{B}\} \end{align*} . [🔗](#exercises_intro-sets-30-1-1) [🔗](#exercises_intro-sets-30)[🔗](#exercises_intro-sets)[🔗](#sec_structures-sets) [&#xe5cb;Prev](ch_structures.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_structures-functions.html) [Feedback](/cdn-cgi/l/email-protection#630c100002114d0f06150a0d23160d000c4d060716)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_structures-sets-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_structures-sets-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
