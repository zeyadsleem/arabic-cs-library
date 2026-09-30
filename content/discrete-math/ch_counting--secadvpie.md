---
title: "Advanced Counting Using PIE"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_advPIE.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.8 Advanced Counting Using PIE

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_advPIE-3-1-1)

1. Apply the principle of inclusion/exclusion to solve counting problems involving multisets with bounded multiplicity.[🔗](#sec_advPIE-3-2-1-1) [🔗](#sec_advPIE-3-2-1)
2. Apply the principle of inclusion/exclusion to solve counting problems involving derangements.[🔗](#sec_advPIE-3-2-2-1) [🔗](#sec_advPIE-3-2-2)
3. Apply the principle of inclusion/exclusion to solve counting problems involving surjective functions.[🔗](#sec_advPIE-3-2-3-1) [🔗](#sec_advPIE-3-2-3)

[🔗](#sec_advPIE-3)

### Subsection Section Preview

#### Investigate!

You have 11 identical mini key lime pies to give to 4 children. However, you don’t want any kid to get more than 3 pies. How many ways can you distribute the pies?[🔗](#sec_advPIE-4-2-1) [🔗](#sec_advPIE-4-2)Sticks and stones allows us to count the number of ways to distribute 10 cookies to 3 kids and natural number solutions to \(x+y+z = 10\text{,}\) for example. A relatively easy modification allows us to put a *lower bound* restriction on these problems: Perhaps each kid must get at least two cookies or \(x,y,z \ge 2\text{.}\) This was done by first assigning each kid (or variable) 2 cookies (or units) and then distributing the rest using sticks and stones.[🔗](#sec_advPIE-4-3) What if we wanted an *upper bound* restriction? For example, we might insist that no kid gets more than 4 cookies or that \(x, y, z \le 4\text{.}\) It turns out this is considerably harder.[🔗](#sec_advPIE-4-4) Notice that if we consider the complementary event, i.e., distributions of cookies in which kids *do* get more than 4 cookies, then we are back to a sticks and stones problem with a lower bound. If we could count this, then subtracting from the total number of distributions should give us the desired answer. However, the problem is that the complement of “no kid gets more than 4 cookies” is “at least one kid gets more than 4 cookies.” We know how to take care of requiring *all* kids getting at least 4 cookies, but how do we handle the case where *one or more* kids get at least 4 cookies? We must use PIE.[🔗](#sec_advPIE-4-5)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-counting-advPIE)

First, let’s review some sticks and stones type questions we learned about in [Section 3.5](sec_counting-multisets.html).[🔗](#PA-counting-advPIE-2-1) Then we will modify this and apply the principle of inclusion/exclusion from [Section 3.3](sec_counting-non-disjoint.html).[🔗](#PA-counting-advPIE-2-2)

#### 1.

Activate Suppose we have 10 cookies to give away to three children, Albie, Bertie, and Charlie.[🔗](#extracted-webwork-150-1-1-1)

#### (a)

How many ways can we distribute the cookies with no restrictions?[🔗](#extracted-webwork-150-1-2-1-1) [🔗](#extracted-webwork-150-1-2)

#### (b)

How many ways can we distribute the cookies if each child must get at least two cookies?[🔗](#extracted-webwork-150-1-3-1-1) Hint. Give each kid the minimum number of cookies first. How many ways are there to distribute the remaining cookies?[🔗](#extracted-webwork-150-1-3-2-1) [🔗](#extracted-webwork-150-1-3-2) [🔗](#extracted-webwork-150-1-3)

#### (c)

How many ways can you distribute the cookies if Albie gets at least 3 cookies and Bertie gets at least 2 cookies (and Charlie has no restrictions)?[🔗](#extracted-webwork-150-1-4-1-1) [🔗](#extracted-webwork-150-1-4) [🔗](#pa-advpie1)

#### 2.

Activate Let’s again consider the 10 cookies we want to distribute to Albie, Bertie, and Charlie. This time, we will impose some upper bound restrictions.[🔗](#extracted-webwork-151-1-1-1)

#### (a)

How many ways can we distribute the cookies if Albie *does* get more than 3 cookies (so at least 4)?[🔗](#extracted-webwork-151-1-2-1-1) How many ways can we distribute the cookies if Albie *does not* get more than 3 cookies?[🔗](#extracted-webwork-151-1-2-1-2) [🔗](#extracted-webwork-151-1-2)

#### (b)

How many ways can we distribute the cookies if Bertie *does* get more than 3 cookies?[🔗](#extracted-webwork-151-1-3-1-1) [🔗](#extracted-webwork-151-1-3)

#### (c)

How many ways can we distribute the cookies if both Albie and Bertie *do* get more than 3 cookies?[🔗](#extracted-webwork-151-1-4-1-1) [🔗](#extracted-webwork-151-1-4)

#### (d)

Using the Principle of Inclusion/Exclusion for two sets, how many ways can we distribute the cookies if *at least one* of Albie or Bertie gets more than 3 cookies? So either Albie gets more than 3 cookies, Bertie gets more than 3 cookies, or both get more than 3 cookies.[🔗](#extracted-webwork-151-1-5-1-1) [🔗](#extracted-webwork-151-1-5)

#### (e)

How many ways can we distribute the cookies if *neither* Albie nor Bertie gets more than 3 cookies?[🔗](#extracted-webwork-151-1-6-1-1) [🔗](#extracted-webwork-151-1-6) [🔗](#pa-advpie2)[🔗](#PA-counting-advPIE)[🔗](#sec_advPIE-4)

### Subsection PIE for Multisets

The Principle of Inclusion/Exclusion (PIE) gives a method for finding the cardinality of the union of not necessarily disjoint sets. We saw in [Section 3.3](sec_counting-non-disjoint.html) how this works with three sets. To find how many things are in *one or more* of the sets \(A\text{,}\) \(B\text{,}\) and \(C\text{,}\) we should just add up the number of things in each of these sets. However, if there is any overlap among the sets, those elements are counted multiple times. So we subtract the things in each intersection of a pair of sets. But doing this removes elements that are in all three sets once too often, so we need to add it back in. In terms of the cardinality of sets, we have \begin{equation*} |A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A\cap B \cap C| \text{.} \end{equation*} [🔗](#subsec-multset-pie-2)

#### Example 3.8.1.

Three kids, Alberto, Bernadette, and Carlos, decide to share 11 cookies. They wonder how many ways they could split the cookies up provided that none of them receive more than 4 cookies (someone receiving no cookies is for some reason acceptable to these kids).[🔗](#subsec-multset-pie-3-1-1) Solution. Without the “no more than 4” restriction, the answer would be \({13 \choose 2}\text{,}\) using 11 stones and 2 sticks (separating the three kids). Now count the number of ways that one or more of the kids violates the condition, i.e., gets at least 4 cookies.[🔗](#subsec-multset-pie-3-2-1) Let \(A\) be the set of outcomes in which Alberto gets more than 4 cookies. Let \(B\) be the set of outcomes in which Bernadette gets more than 4 cookies. Let \(C\) be the set of outcomes in which Carlos gets more than 4 cookies. We then are looking (for the sake of subtraction) for the size of the set \(A \cup B \cup C\text{.}\) Using PIE, we must find the sizes of \(|A|\text{,}\) \(|B|\text{,}\) \(|C|\text{,}\) \(|A\cap B|\) and so on. Here is what we find.[🔗](#subsec-multset-pie-3-2-2)

- \(|A| = {8 \choose 2}\text{.}\) First give Alberto 5 cookies, then distribute the remaining 6 to the three kids without restrictions, using 6 stones and 2 sticks. [🔗](#subsec-multset-pie-3-2-3-1-1)
- \(|B| = {8 \choose 2}\text{.}\) Just like above, only now Bernadette gets 5 cookies at the start. [🔗](#subsec-multset-pie-3-2-3-1-2)
- \(|C| = {8 \choose 2}\text{.}\) Carlos gets 5 cookies first. [🔗](#subsec-multset-pie-3-2-3-1-3)
- \(|A \cap B| = {3 \choose 2}\text{.}\) Give Alberto and Bernadette 5 cookies each, leaving 1 (stone) to distribute to the three kids (2 sticks). [🔗](#subsec-multset-pie-3-2-3-1-4)
- \(|A \cap C| = {3 \choose 2}\text{.}\) Alberto and Carlos get 5 cookies first. [🔗](#subsec-multset-pie-3-2-3-1-5)
- \(|B \cap C| = {3 \choose 2}\text{.}\) Bernadette and Carlos get 5 cookies first. [🔗](#subsec-multset-pie-3-2-3-1-6)
- \(|A \cap B \cap C| = 0\text{.}\) It is not possible for all three kids to get 4 or more cookies. [🔗](#subsec-multset-pie-3-2-3-1-7)

[🔗](#subsec-multset-pie-3-2-3) Combining all of these we see \begin{equation*} |A \cup B \cup C| = {8 \choose 2} + {8 \choose 2} + {8 \choose 2} - {3 \choose 2} - {3 \choose 2} - {3 \choose 2} + 0 = 75 \text{.} \end{equation*} [🔗](#subsec-multset-pie-3-2-4) Thus the answer to the original question is \({13 \choose 2} - 75 = 78 - 75 = 3\text{.}\) This makes sense now that we see it. The only way to ensure that no kid gets more than 4 cookies is to give two kids 4 cookies and one kid 3; there are three choices for which kid that should be. We could have found the answer much quicker through this observation, but the point of the example is to illustrate that PIE works![🔗](#subsec-multset-pie-3-2-5) [🔗](#subsec-multset-pie-3-2) [🔗](#subsec-multset-pie-3) For four or more sets, we do not write down a formula for PIE. Instead, we just think of the principle: Add up all the elements in single sets and then subtract out things you counted twice (elements in the intersection of a *pair* of sets); then add back in elements you removed too often (elements in the intersection of groups of three sets); then take back out elements you added back in too often (elements in the intersection of groups of four sets); then add back in, take back out, add back in, etc. This would be very difficult if it wasn’t for the fact that in these problems, all the cardinalities of the single sets are equal, as are all the cardinalities of the intersections of two sets, and that of three sets, and so on. Thus we can group all of these together and multiply by how many different combinations of 1, 2, 3, … sets there are.[🔗](#subsec-multset-pie-4)

#### Example 3.8.2.

How many ways can you distribute 10 cookies to 4 kids so that no kid gets more than 2 cookies?[🔗](#subsec-multset-pie-5-1-1) Solution. There are \({13 \choose 3}\) ways to distribute 10 cookies to 4 kids (using 10 stones and 3 sticks). We will subtract all the outcomes in which a kid gets 3 or more cookies. How many outcomes are there like that? We can force kid A to eat 3 or more cookies by giving him 3 cookies before we start. Doing so reduces the problem to one in which we have 7 cookies to give to 4 kids without any restrictions. In that case, we have 7 stones (the 7 remaining cookies) and 3 sticks (one less than the number of kids) so we can distribute the cookies in \({10 \choose 3}\) ways. Of course we could choose any one of the 4 kids to give too many cookies, so it would appear that there are \({4 \choose 1}{10 \choose 3}\) ways to distribute the cookies giving too many to one kid. But in fact, we have overcounted.[🔗](#subsec-multset-pie-5-2-1) We must get rid of the outcomes in which two kids have too many cookies. There are \({4 \choose 2}\) ways to select 2 kids to give extra cookies. It takes 6 cookies to do this, leaving only 4 cookies. So we have 4 stones and still 3 sticks. The remaining 4 cookies can thus be distributed in \({7 \choose 3}\) ways (for each of the \({4 \choose 2}\) choices of which 2 kids to over-feed).[🔗](#subsec-multset-pie-5-2-2) But now we have removed too much. We must add back in all the ways to give too many cookies to three kids. This uses 9 cookies, leaving only 1 to distribute to the 4 kids using sticks and stones, which can be done in \({4 \choose 3}\) ways. We must consider this outcome for every possible choice of which three kids we over-feed, and there are \({4 \choose 3}\) ways of selecting that set of 3 kids.[🔗](#subsec-multset-pie-5-2-3) Next we would subtract all the ways to give four kids too many cookies, but in this case, that number is 0.[🔗](#subsec-multset-pie-5-2-4) All together we get that the number of ways to distribute 10 cookies to 4 kids without giving any kid more than 2 cookies is: \begin{equation*} {13 \choose 3} - \left[{4 \choose 1}{10 \choose 3} - {4 \choose 2}{7 \choose 3} + {4\choose 3}{4\choose 3}\right] \end{equation*} which is \begin{equation*} 286 - [480 - 210 + 16] = 0 \text{.} \end{equation*} [🔗](#subsec-multset-pie-5-2-5) This makes sense: There is NO way to distribute 10 cookies to 4 kids and make sure that nobody gets more than 2. It is slightly surprising that \begin{equation*} {13 \choose 3} = \left[{4 \choose 1}{10 \choose 3} - {4 \choose 2}{7 \choose 3} + {4\choose 3}{4\choose 3}\right] \text{,} \end{equation*} but since PIE works, this equality must hold. [🔗](#subsec-multset-pie-5-2-6) [🔗](#subsec-multset-pie-5-2) [🔗](#subsec-multset-pie-5)Just so you don’t think that these problems always have easier solutions, consider the following example.[🔗](#subsec-multset-pie-6)

#### Example 3.8.3.

Earlier ([Example 3.5.6](sec_counting-multisets.html#example-multisets-int-sol)) we counted the number of solutions to the equation \begin{equation*} x_1 + x_2 + x_3 + x_4 + x_5 = 13 \text{,} \end{equation*} where \(x_i \ge 0\) for each \(x_i\text{.}\) [🔗](#subsec-multset-pie-7-1-1) How many of those solutions have \(0 \le x_i \le 3\) for each \(x_i\text{?}\)[🔗](#subsec-multset-pie-7-1-2) Solution. We must subtract off the number of solutions in which one or more of the variables has a value greater than 3. We will need to use PIE because counting the number of solutions for which each of the five variables separately are greater than 3 counts solutions multiple times. Here is what we get:[🔗](#subsec-multset-pie-7-2-1)

- Total solutions: \({17 \choose 4}\text{.}\)[🔗](#subsec-multset-pie-7-2-2-1-1-1) [🔗](#subsec-multset-pie-7-2-2-1-1)
- Solutions where \(x_1 > 3\text{:}\) \({13 \choose 4}\text{.}\) Give \(x_1\) 4 units first; then distribute the remaining 9 units to the 5 variables.[🔗](#subsec-multset-pie-7-2-2-1-2-1) [🔗](#subsec-multset-pie-7-2-2-1-2)
- Solutions where \(x_1 > 3\) and \(x_2 > 3\text{:}\) \({9 \choose 4}\text{.}\) After you give 4 units to \(x_1\) and another 4 to \(x_2\text{,}\) you only have 5 units left to distribute.[🔗](#subsec-multset-pie-7-2-2-1-3-1) [🔗](#subsec-multset-pie-7-2-2-1-3)
- Solutions where \(x_1 > 3\text{,}\) \(x_2 > 3\) and \(x_3 > 3\text{:}\) \({5 \choose 4}\text{.}\)[🔗](#subsec-multset-pie-7-2-2-1-4-1) [🔗](#subsec-multset-pie-7-2-2-1-4)
- Solutions where \(x_1 > 3\text{,}\) \(x_2 > 3\text{,}\) \(x_3 > 3\text{,}\) and \(x_4 > 3\text{:}\) 0.[🔗](#subsec-multset-pie-7-2-2-1-5-1) [🔗](#subsec-multset-pie-7-2-2-1-5)

[🔗](#subsec-multset-pie-7-2-2) We also need to account for the fact that we could choose any of the five variables in the place of \(x_1\) above (so there will be \({5 \choose 1}\) outcomes like this), any pair of variables in the place of \(x_1\) and \(x_2\) (\({5 \choose 2}\) outcomes) and so on. It is because of this that the double counting occurs, so we need to use PIE. All together we have that the number of solutions with \(0 \le x_i \le 3\) is \begin{equation*} {17 \choose 4} - \left[{5\choose 1}{13 \choose 4} - {5 \choose 2}{9 \choose 4} + {5 \choose 3}{5 \choose 4}\right] = 15 \text{.} \end{equation*} [🔗](#subsec-multset-pie-7-2-3) [🔗](#subsec-multset-pie-7-2) [🔗](#subsec-multset-pie-7)[🔗](#subsec-multset-pie)

### Subsection Counting Derangements

#### Investigate!

For your senior prank, you decide to switch the nameplates on your favorite 5 professors’ doors. So that none of them feel left out, you want to make sure that all of the nameplates end up on the wrong door. How many ways can this be accomplished?[🔗](#subsec_derangements-2-1) [🔗](#subsec_derangements-2) The advanced use of PIE has applications beyond sticks and stones. A derangement of \(n\) elements \(\{1,2,3,\ldots, n\}\) is a permutation in which no element is fixed. For example, there are \(6\) permutations of the three elements \(\{1,2,3\}\text{:}\) \begin{equation*} 123 ~~ 132 ~~ 213 ~~ 231 ~~ 312 ~~ 321 \text{.} \end{equation*} but most of these have one or more elements fixed: \(123\) has all three elements fixed since all three elements are in their original positions, \(132\) has the first element fixed (1 is in its original first position), and so on. In fact, the only derangements of three elements are \begin{equation*} 231 \text{ and } 312 \text{.} \end{equation*} [🔗](#subsec_derangements-3) If we go up to 4 elements, there are 24 permutations (because we have 4 choices for the first element, 3 choices for the second, 2 choices for the third leaving only 1 choice for the last). How many of these are derangements? If you list out all 24 permutations and eliminate those that are not derangements, you will be left with just 9 derangements. Let’s see how we can get that number using PIE.[🔗](#subsec_derangements-4)

#### Example 3.8.4.

How many derangements are there of 4 elements?[🔗](#subsec_derangements-5-1-1) Solution. We count all permutations and subtract those that are not derangements. There are \(4! = 24\) permutations of 4 elements. Now for a permutation to *not* be a derangement, at least one of the 4 elements must be fixed. There are \({4 \choose 1}\) choices for which single element we fix. Once fixed, we need to find a permutation of the other three elements. There are \(3!\) permutations on 3 elements.[🔗](#subsec_derangements-5-2-1) But now we have counted too many non-derangements, so we must subtract those permutations that fix two elements. There are \({4 \choose 2}\) choices for which two elements we fix, and then for each pair, \(2!\) permutations of the remaining elements. But this subtracts too many, so add back in permutations that fix 3 elements, all \({4 \choose 3}1!\) of them. Finally subtract the \({4 \choose 4}0!\) permutations (recall \(0! = 1\)) which fix all four elements. All together we get that the number of derangements of 4 elements is: \begin{equation*} 4! - \left[{4 \choose 1}3! - {4 \choose 2}2! + {4 \choose 3} 1! - {4 \choose 4}0!\right] = 24 - 15 = 9 \text{.} \end{equation*} [🔗](#subsec_derangements-5-2-2) [🔗](#subsec_derangements-5-2) [🔗](#subsec_derangements-5)Of course we can use a similar formula to count the derangements of any number of elements. However, the more elements we have, the longer the formula gets. Here is another example:[🔗](#subsec_derangements-6)

#### Example 3.8.5.

Five gentlemen attend a party, leaving their hats at the door. At the end of the party, they hastily grab hats on their way out. How many different ways could this happen so that none of the gentlemen leaves with his own hat?[🔗](#subsec_derangements-7-2-1) Solution. We are counting derangements on 5 elements. There are \(5!\) ways for the gentlemen to grab hats in any order—but many of these permutations will result in someone getting their own hat. So we subtract all the ways in which one or more of the men get their own hat. In other words, we subtract the non-derangements. Doing so requires PIE. Thus the answer is: \begin{equation*} 5! - \left[{5 \choose 1}4! - {5 \choose 2}3! + {5 \choose 3}2! - {5 \choose 4}1! + {5 \choose 5}0!\right] \text{.} \end{equation*} [🔗](#subsec_derangements-7-3-1) [🔗](#subsec_derangements-7-3) [🔗](#subsec_derangements-7)[🔗](#subsec_derangements)

### Subsection Counting Functions

#### Investigate!

1. Consider all functions \(f: \{1,2,3,4,5\} \to \{1,2,3,4,5\}\text{.}\) How many functions are there in total? How many of those are injective? Remember, a function is an injection if every input goes to a different output.[🔗](#sec_advPIE-7-3-1-1-1-1) [🔗](#sec_advPIE-7-3-1-1-1)
2. Consider all functions \(f: \{1,2,3,4,5\} \to \{1,2,3,4,5\}\text{.}\) How many of the *injections* have the property that \(f(x) \ne x\) for any \(x \in \{1,2,3,4,5\}\text{?}\) [🔗](#sec_advPIE-7-3-1-1-2-1) Your friend claims that the answer is: \begin{equation*} 5! - \left[ {5\choose 1}4! - {5 \choose 2}3! + {5\choose 3}2! - {5 \choose 4}1! + {5\choose 5}0! \right] \text{.} \end{equation*} [🔗](#sec_advPIE-7-3-1-1-2-2) Explain why this is correct.[🔗](#sec_advPIE-7-3-1-1-2-3) [🔗](#sec_advPIE-7-3-1-1-2)
3. Recall that a *surjection* is a function for which every element of the codomain is in the range. How many of the functions \(f: \{1,2,3,4,5\} \to \{1,2,3,4,5\}\) are surjective? Use PIE![🔗](#sec_advPIE-7-3-1-1-3-1) [🔗](#sec_advPIE-7-3-1-1-3)

[🔗](#sec_advPIE-7-3-1) [🔗](#sec_advPIE-7-3)We have seen throughout this chapter that many counting questions can be rephrased as questions about counting functions with certain properties. This is reasonable since many counting questions can be thought of as counting the number of ways to assign elements from one set to elements of another.[🔗](#sec_advPIE-7-4)

#### Example 3.8.6.

You decide to give away your video game collection so as to better spend your time studying advanced mathematics. How many ways can you do this, provided:

1. You want to distribute your 3 different PS4 games among 5 friends, so that no friend gets more than one game? [🔗](#sec_advPIE-7-5-1-1-1-1)
2. You want to distribute your 8 different 3DS games among 5 friends? [🔗](#sec_advPIE-7-5-1-1-1-2)
3. You want to distribute your 8 different SNES games among 5 friends, so that each friend gets at least one game? [🔗](#sec_advPIE-7-5-1-1-1-3)

In each case, model the counting question as a function counting question. [🔗](#sec_advPIE-7-5-1-1) Solution.

1. We must use the three games (call them 1, 2, 3) as the domain and the 5 friends (a,b,c,d,e) as the codomain (otherwise the function would not be defined for the whole domain when a friend didn’t get any game). So how many functions are there with domain \(\{1,2,3\}\) and codomain \(\{a,b,c,d,e\}\text{?}\) The answer to this is \(5^3=125\text{,}\) since we can assign any of 5 elements to be the image of 1, any of 5 elements to be the image of 2 and any of 5 elements to be the image of 3.[🔗](#sec_advPIE-7-5-2-1-1-1-1) But this is not the correct answer to our counting problem, because one of these functions is \(f= \twoline{1\amp 2\amp 3}{a\amp a\amp a}\text{;}\) one friend can get more than one game. What we really need to do is count *injective* functions. This gives \(P(5,3) = 60\) functions, which is the answer to our counting question.[🔗](#sec_advPIE-7-5-2-1-1-1-2) [🔗](#sec_advPIE-7-5-2-1-1-1)
2. Again, we need to use the 8 games as the domain and the 5 friends as the codomain. We are counting all functions, so the number of ways to distribute the games is \(5^8\text{.}\)[🔗](#sec_advPIE-7-5-2-1-1-2-1) [🔗](#sec_advPIE-7-5-2-1-1-2)
3. This question is harder. Use the games as the domain and friends as the codomain (the reverse would not give a function). To ensure that every friend gets at least one game means that every element of the codomain is in the range. In other words, we are looking for *surjective* functions. How do you count those?[🔗](#sec_advPIE-7-5-2-1-1-3-1) [🔗](#sec_advPIE-7-5-2-1-1-3)

[🔗](#sec_advPIE-7-5-2-1) [🔗](#sec_advPIE-7-5-2) [🔗](#sec_advPIE-7-5)In [Example 3.2.13](sec_counting-combine-outcomes.html#example-counting-functions-all) we saw how to count all functions (using the multiplicative principle) and in [Example 3.4.7](sec_counting-combperm.html#example-counting-functions-injective) we learned how to count injective functions (using permutations). Surjective functions are not as easily counted (unless the size of the domain is smaller than the codomain, in which case there are none).[🔗](#sec_advPIE-7-6) The idea is to count the functions that are *not* surjective, and then subtract that from the total number of functions. This works very well when the codomain has two elements in it:[🔗](#sec_advPIE-7-7)

#### Example 3.8.7.

How many functions \(f: \{1,2,3,4,5\} \to \{a,b\}\) are surjective?[🔗](#sec_advPIE-7-8-2-1) Solution. There are \(2^5\) functions total, two choices for where to send each of the 5 elements of the domain. Now of these, the functions that are *not* surjective must exclude one or more elements of the codomain from the range. So first, consider functions for which \(a\) is not in the range. This can only happen one way: Everything gets sent to \(b\text{.}\) Alternatively, we could exclude \(b\) from the range. Then everything gets sent to \(a\text{,}\) so there is only one function like this. These are the only ways in which a function could not be surjective (no function excludes both \(a\) and \(b\) from the range) so there are exactly \(2^5 - 2\) surjective functions.[🔗](#sec_advPIE-7-8-3-1) [🔗](#sec_advPIE-7-8-3) [🔗](#sec_advPIE-7-8)When there are three elements in the codomain, there are now three choices for a single element to exclude from the range. Additionally, we could pick pairs of two elements to exclude from the range, and we must make sure we don’t overcount these. It’s PIE time![🔗](#sec_advPIE-7-9)

#### Example 3.8.8.

How many functions \(f: \{1,2,3,4,5\} \to \{a,b,c\}\) are surjective?[🔗](#sec_advPIE-7-10-2-1) Solution. Again start with the total number of functions: \(3^5\) (as each of the five elements of the domain can go to any of three elements of the codomain). Now we count the functions that are *not* surjective.[🔗](#sec_advPIE-7-10-3-1) Start by excluding \(a\) from the range. Then we have two choices (\(b\) or \(c\)) for where to send each of the five elements of the domain. Thus there are \(2^5\) functions that exclude \(a\) from the range. Similarly, there are \(2^5\) functions that exclude \(b\text{,}\) and another \(2^5\) that exclude \(c\text{.}\) Now have we counted all functions that are not surjective? Yes, but in fact, we have counted some multiple times. For example, the function which sends everything to \(c\) was one of the \(2^5\) functions we counted when we excluded \(a\) from the range, and also one of the \(2^5\) functions we counted when we excluded \(b\) from the range. We must subtract out all the functions which specifically exclude two elements from the range. There is 1 function when we exclude \(a\) and \(b\) (everything goes to \(c\)), one function when we exclude \(a\) and \(c\text{,}\) and one function when we exclude \(b\) and \(c\text{.}\)[🔗](#sec_advPIE-7-10-3-2) We are using PIE: To count the functions that are not surjective, we added up the functions that exclude \(a\text{,}\) \(b\text{,}\) and \(c\) separately; then subtracted the functions that exclude pairs of elements. We would then add back in the functions that exclude groups of three elements, except that there are no such functions. We find that the number of functions that are *not* surjective is \begin{equation*} 2^5 + 2^5 + 2^5 - 1 - 1 - 1 + 0 \text{.} \end{equation*} [🔗](#sec_advPIE-7-10-3-3) Perhaps a more descriptive way to write this is \begin{equation*} {3 \choose 1}2^5 - {3 \choose 2}1^5 + {3 \choose 3}0^5 \text{.} \end{equation*} since each of the \(2^5\)’s was the result of choosing 1 of the 3 elements of the codomain to exclude from the range; each of the three \(1^5\)’s was the result of choosing 2 of the 3 elements of the codomain to exclude. Writing \(1^5\) instead of 1 makes sense too: We have 1 choice of where to send each of the 5 elements of the domain. [🔗](#sec_advPIE-7-10-3-4) Now we can finally count the number of surjective functions: \begin{equation*} 3^5 - \left[{3 \choose 1}2^5 - {3 \choose 2}1^5\right] = 150 \text{.} \end{equation*} [🔗](#sec_advPIE-7-10-3-5) [🔗](#sec_advPIE-7-10-3) [🔗](#sec_advPIE-7-10)You might worry that to count surjective functions when the codomain is larger than 3 elements would be too tedious. We need to use PIE but with more than 3 sets the formula for PIE is very long. However, we have lucked out. As we saw in the example above, the number of functions that exclude a single element from the range is the same no matter which single element is excluded. Similarly, the number of functions that exclude a pair of elements will be the same for every pair. With larger codomains, we will see the same behavior with groups of 3, 4, and more elements excluded. So instead of adding/subtracting each of these, we can simply add or subtract all of them at once, if you know how many there are. This works just like it did in for the other types of counting questions in this section, only now the size of the various combinations of sets is a number raised to a power, as opposed to a binomial coefficient or factorial. Here’s what happens with \(4\) and \(5\) elements in the codomain.[🔗](#sec_advPIE-7-11)

#### Example 3.8.9.

1. How many functions \(f: \{1,2,3,4,5\} \to \{a,b,c,d\}\) are surjective?[🔗](#sec_advPIE-7-12-2-1-1-1-1) [🔗](#sec_advPIE-7-12-2-1-1-1)
2. How many functions \(f: \{1,2,3,4,5\} \to \{a,b,c,d,e\}\) are surjective?[🔗](#sec_advPIE-7-12-2-1-1-2-1) [🔗](#sec_advPIE-7-12-2-1-1-2)

[🔗](#sec_advPIE-7-12-2-1) Solution.

1. There are \(4^5\) functions all together; we will subtract the functions that are not surjective. We could exclude any one of the four elements of the codomain, and doing so will leave us with \(3^5\) functions for each excluded element. This counts too many, so we subtract the functions that exclude two of the four elements of the codomain, each pair giving \(2^5\) functions. But this excludes too many, so we add back in the functions that exclude three of the four elements of the codomain, each triple giving \(1^5\) function. There are \({4 \choose 1}\) groups of functions excluding a single element, \({4 \choose 2}\) groups of functions excluding a pair of elements, and \({4 \choose 3}\) groups of functions excluding a triple of elements. This means that the number of functions that are *not* surjective is: \begin{equation*} {4 \choose 1}3^5 - {4 \choose 2}2^5 + {4 \choose 3}1^5 \text{.} \end{equation*} We can now say that the number of functions that are surjective is: \begin{equation*} 4^5 - \left[{4 \choose 1}3^5 - {4 \choose 2}2^5 + {4 \choose 3}1^5\right] \text{.} \end{equation*} [🔗](#sec_advPIE-7-12-3-1-1-1-1) [🔗](#sec_advPIE-7-12-3-1-1-1)
2. The number of surjective functions is: \begin{equation*} 5^5 - \left[{5 \choose 1}4^5 - {5 \choose 2}3^5 + {5 \choose 3}2^5 - {5 \choose 4}1^5\right] \text{.} \end{equation*} We took the total number of functions \(5^5\) and subtracted all that were not surjective. There were \({5 \choose 1}\) ways to select a single element from the codomain to exclude from the range, and for each there were \(4^5\) functions. But this double counts, so we use PIE and subtract functions excluding two elements from the range: There are \({5 \choose 2}\) choices for the two elements to exclude, and for each pair, \(3^5\) functions. This takes out too many functions, so we add back in functions that exclude 3 elements from the range: \({5 \choose 3}\) choices for which 3 to exclude, and then \(2^5\) functions for each choice of elements. Finally we take back out the 1 function that excludes 4 elements for each of the \({5 \choose 4}\) choices of 4 elements. [🔗](#sec_advPIE-7-12-3-1-1-2-1) If you happen to calculate this number precisely, you will get 120 surjections. That happens to also be the value of \(5!\text{.}\) This might seem like an amazing coincidence until you realize that every surjective function \(f:X \to Y\) with \(\card{X} = \card{Y}\) finite must necessarily be a bijection. The number of bijections is always \(\card{X}!\) in this case. What we have here is a *combinatorial proof* of the following identity: \begin{equation*} n^n - \left[{n\choose 1}(n-1)^n - {n \choose 2}(n-2)^n + \cdots + {n \choose n-1}1^n \right] = n! \text{.} \end{equation*} [🔗](#sec_advPIE-7-12-3-1-1-2-2) [🔗](#sec_advPIE-7-12-3-1-1-2)

[🔗](#sec_advPIE-7-12-3-1) [🔗](#sec_advPIE-7-12-3) [🔗](#sec_advPIE-7-12) We have seen that counting surjective functions is another nice example of the advanced use of the principle of inclusion/exclusion. Also, counting injective functions turns out to be equivalent to permutations, and counting all functions has a solution akin to those counting problems where order matters but repeats are allowed (like counting the number of words you can make from a given set of letters).[🔗](#sec_advPIE-7-13) These are not just a few more examples of the techniques we have developed in this chapter. Quite the opposite: Everything we have learned in this chapter is an example of *counting functions*![🔗](#sec_advPIE-7-14)

#### Example 3.8.10.

How many 5-letter words can you make using the eight letters \(a\) through \(h\text{?}\) How many contain no repeated letters?[🔗](#sec_advPIE-7-15-1-1) Solution. By now it should be no surprise that there are \(8^5\) words, and \(P(8,5)\) words without repeated letters. The new piece here is that we are actually counting functions. For the first problem, we are counting all functions from \(\{1,2,\ldots, 5\}\) to \(\{a,b,\ldots, h\}\text{.}\) The numbers in the domain represent the *position* of the letter in the word; the codomain represents the letter that could be assigned to that position. If we ask for no repeated letters, we are asking for injective functions.[🔗](#sec_advPIE-7-15-2-1) If \(A\) and \(B\) are *any* sets with \(|A| = 5\) and \(|B| = 8\text{,}\) then the number of functions \(f: A \to B\) is \(8^5\) and the number of injections is \(P(8,5)\text{.}\) So if you can represent your counting problem as a function counting problem, most of the work is done.[🔗](#sec_advPIE-7-15-2-2) [🔗](#sec_advPIE-7-15-2) [🔗](#sec_advPIE-7-15)

#### Example 3.8.11.

How many subsets are there of \(\{1,2,\ldots, 9\}\text{?}\) How many 9-bit strings are there (of any weight)?[🔗](#sec_advPIE-7-16-1-1) Solution. We saw in [Section 3.1](sec_counting-pascal.html) that the answer to both these questions is \(2^9\text{,}\) as we can say yes or no (or 0 or 1) to each of the 9 elements in the set (positions in the bit-string). But \(2^9\) also looks like the answer you get from counting functions. In fact, if you count all functions \(f: A \to B\) with \(|A| = 9\) and \(|B| = 2\text{,}\) this is exactly what you get.[🔗](#sec_advPIE-7-16-2-1) This makes sense! Let \(A = \{1,2,\ldots, 9\}\) and \(B = \{y, n\}\text{.}\) We are assigning each element of the set either a yes or a no. Or in the language of bit-strings, we would take the 9 positions in the bit string as our domain and the set \(\{0,1\}\) as the codomain.[🔗](#sec_advPIE-7-16-2-2) [🔗](#sec_advPIE-7-16-2) [🔗](#sec_advPIE-7-16) So far we have not used a function as a model for binomial coefficients (combinations). Think for a moment about the relationship between combinations and permutations, say specifically \({9 \choose 3}\) and \(P(9,3)\text{.}\) We *do* have a function model for \(P(9,3)\text{.}\) This is the number of *injective* functions from a set of size 3 (say \(\{1,2,3\}\) to a set of size 9 (say \(\{1,2,\ldots, 9\}\)) since there are 9 choices for where to send the first element of the domain, then only 8 choices for the second, and 7 choices for the third. For example, the function might look like this: \begin{equation*} f(1) = 5 \qquad f(2) = 8 \qquad f(3) = 4 \text{.} \end{equation*} [🔗](#sec_advPIE-7-17) This is a different function from: \begin{equation*} f(1) = 4 \qquad f(2) = 5 \qquad f(3) = 8 \text{.} \end{equation*} [🔗](#sec_advPIE-7-18) Now \(P(9,3)\) counts these as different outcomes correctly, but \({9\choose 3}\) will count these (among others) as just one outcome. In fact, in terms of functions \({9 \choose 3}\) just counts the number of possible ranges for injective functions. This should not be a surprise since binomial coefficients count subsets, and the range is a possible subset of the codomain. 5 A more mathematically sophisticated interpretation of combinations is that we are defining two injective functions to be *equivalent* if they have the same range, and then counting the number of equivalence classes under this notion of equivalence.[🔗](#sec_advPIE-7-19) While it is possible to interpret combinations as functions, perhaps the better advice is to instead use combinations (or sticks and stones) when functions are not quite the right way to interpret the counting question.[🔗](#sec_advPIE-7-20) [🔗](#sec_advPIE-7)

### Exercises Practice Problems

#### 1.

Activate The dollar menu at your favorite tax-free fast food restaurant has 7 items. You have $18 to spend. How many different meals can you buy if you spend all your money and:

1. Purchase at least one of each item.[🔗](#extracted-webwork-152-1-1-1-1-1-1) [🔗](#extracted-webwork-152-1-1-1-1-1)
2. Possibly skip some items.[🔗](#extracted-webwork-152-1-1-1-1-2-1) [🔗](#extracted-webwork-152-1-1-1-1-2)
3. Don’t get more than 2 of any particular item.[🔗](#extracted-webwork-152-1-1-1-1-3-1) [🔗](#extracted-webwork-152-1-1-1-1-3)

[🔗](#extracted-webwork-152-1-1-1) [🔗](#ww-pie-food)

#### 2.

Activate After a late night of math studying, you and your friends decide to go to your favorite tax-free fast food Mexican restaurant, *Burrito Chime*. You decide to order off of the dollar menu, which has 10 items. Your group has $20 to spend (and will spend all of it).

1. How many different orders are possible? (The *order* in which the order is placed does not matter, just which and how many of each item that is ordered.)[🔗](#extracted-webwork-153-1-1-1-2-1-1) [🔗](#extracted-webwork-153-1-1-1-2-1)
2. How many different orders are possible if you want to get at least one of each item?[🔗](#extracted-webwork-153-1-1-1-2-2-1) [🔗](#extracted-webwork-153-1-1-1-2-2)
3. How many different orders are possible if you don’t want to get more than 4 of any one item?[🔗](#extracted-webwork-153-1-1-1-2-3-1) [🔗](#extracted-webwork-153-1-1-1-2-3)

[🔗](#extracted-webwork-153-1-1-1) [🔗](#ww-pie-food2)

#### 3.

Activate After another gym class you are tasked with putting the 14 identical dodgeballs away into 5 bins. This time, no bin can hold more than 6 balls. How many ways can you clean up?[🔗](#extracted-webwork-154-1-1-1) [🔗](#ww-pie-balls)

#### 4.

Activate Consider the equation \(x_1 + x_2 + x_3 + x_4 = 18\text{.}\) How many solutions are there with \(1 \le x_i \le 6\) for all \(i \in \{1,2,3,4\}\text{?}\)[🔗](#extracted-webwork-155-1-1-1) [🔗](#ww-pie-sums)

#### 5.

Activate Suppose you planned on giving 13 gold stars to some of the 15 star students in your class. Each student can receive at most one star. How many ways can you do this?

1. Use Pascal’s triangle to find the numeric answer.[🔗](#extracted-webwork-156-1-1-1-1-1-1) [🔗](#extracted-webwork-156-1-1-1-1-1)

[🔗](#extracted-webwork-156-1-1-1)

1. Use the principle of inclusion/exclusion.[🔗](#extracted-webwork-156-1-1-2-1-1-1) [🔗](#extracted-webwork-156-1-1-2-1-1)

[🔗](#extracted-webwork-156-1-1-2) [🔗](#ww-pie-stars)

#### 6.

Activate How many permutations of \({\left\{1,2,3,4,5,6\right\}}\) leave exactly 1 element fixed?[🔗](#extracted-webwork-157-1-1-1) [🔗](#ww-pie-fixed-perms)

#### 7.

Activate 11 ladies of a certain age drop off their red hats at the hat check of a museum. As they are leaving, the hat check attendant gives the hats back randomly. In how many ways can exactly 6 of the ladies receive their own hat (and the other 5 not)?[🔗](#extracted-webwork-158-1-1-1) [🔗](#ww-pie-hats)

#### 8.

Activate The Grinch sneaks into a room in which there are 9 Christmas presents for 9 different people. He proceeds to switch the name labels on the presents. How many ways could he do this if:

1. No present is allowed to end up with its original label? Explain what each term in your answer represents.[🔗](#extracted-webwork-159-1-1-1-1-1-1) [🔗](#extracted-webwork-159-1-1-1-1-1)
2. Exactly 4 presents keep their original labels? Explain.[🔗](#extracted-webwork-159-1-1-1-1-2-1) [🔗](#extracted-webwork-159-1-1-1-1-2)
3. Exactly 8 presents keep their original labels? Explain.[🔗](#extracted-webwork-159-1-1-1-1-3-1) [🔗](#extracted-webwork-159-1-1-1-1-3)

[🔗](#extracted-webwork-159-1-1-1) [🔗](#ww-pie-grinch)

#### 9.

Activate Consider functions \(f: {\left\{1,2,3,4,5,6,7,8,9\right\}} \to \{a,b,c,d,e,f\}\text{.}\) How many functions have the property that \(f(1) \ne c\) or \(f(2) \ne f\text{,}\) or both?[🔗](#extracted-webwork-160-1-1-1) [🔗](#ww-pie-functions-ne)

#### 10.

Activate Consider sets \(A\) and \(B\) with \(|A| = 11\) and \(|B| = 4\text{.}\) How many functions \(f: A \to B\) are surjective?[🔗](#extracted-webwork-161-1-1-1) [🔗](#ww-pie-surjections)

#### 11.

Activate Let \(A = {\left\{1,2,3,4,5,6,7,8\right\}}\text{.}\) How many injective functions \(f:A \to A\) have the property that for each \(x \in A\text{,}\) \(f(x) \ne x\text{?}\)[🔗](#extracted-webwork-162-1-1-1) [🔗](#ww-pie-nofixedpts)[🔗](#practice-counting-advPIE)

### Exercises Additional Exercises

#### 1.

Based on the previous question, give a combinatorial proof for the identity: \begin{equation*} {n \choose k} = {n+k-1 \choose k} - \sum_{j=1}^n (-1)^{j+1}{n \choose j}{n+k-(2j+1) \choose k - 2j}\text{.} \end{equation*} [🔗](#exercises_counting-advPIE-2-1-1) [🔗](#exercises_counting-advPIE-2)

#### 2.

Illustrate how the counting of derangements works by writing all permutations of \(\{1,2,3,4\}\) and then crossing out those which are not derangements. Keep track of the permutations you cross out more than once, using PIE.[🔗](#exercises_counting-advPIE-3-1-1) [🔗](#exercises_counting-advPIE-3)

#### 3.

Let \(d_n\) be the number of derangements of \(n\) objects. For example, using the techniques of this section, we find \begin{equation*} d_3 = 3!-\left({3 \choose 1}2! - {3 \choose 2}1! + {3 \choose 3}0! \right)\text{.} \end{equation*} We can use the formula for \({n \choose k}\) to write this all in terms of factorials. After simplifying, for \(d_3\) we would get \begin{equation*} d_3 = 3!\left(1 - \frac{1}{1} + \frac{1}{2} - \frac{1}{6} \right)\text{.} \end{equation*} Generalize this to find a nicer formula for \(d_n\text{.}\) Bonus: For large \(n\text{,}\) approximately what fraction of all permutations are derangements? Use your knowledge of Taylor series from calculus. [🔗](#exercises_counting-advPIE-4-2-1) [🔗](#exercises_counting-advPIE-4)[🔗](#exercises_counting-advPIE)[🔗](#sec_advPIE) [&#xe5cb;Prev](sec-counting-probability.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_count-conc.html) [Feedback](/cdn-cgi/l/email-protection#5f302c3c3e2d71333a2936311f2a313c30713a3b2a)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_advPIE-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_advPIE-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
