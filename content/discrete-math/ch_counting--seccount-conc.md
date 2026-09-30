---
title: "Chapter Summary"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_count-conc.html
---

\1. How many animal parades containing 6 crackers can you line up?[🔗](#sec_count-conc-2-1-2-1-1-1) [🔗](#sec_count-conc-2-1-2-1-1)
2. How many animal parades of 6 crackers can you line up so that the animals appear in alphabetical order?[🔗](#sec_count-conc-2-1-2-1-2-1) [🔗](#sec_count-conc-2-1-2-1-2)
3. How many ways could you line up 6 different animals in alphabetical order?[🔗](#sec_count-conc-2-1-2-1-3-1) [🔗](#sec_count-conc-2-1-2-1-3)
4. How many ways could you line up 6 different animals if they can come in any order?[🔗](#sec_count-conc-2-1-2-1-4-1) [🔗](#sec_count-conc-2-1-2-1-4)
5. How many ways could you give 6 children one animal cracker each?[🔗](#sec_count-conc-2-1-2-1-5-1) [🔗](#sec_count-conc-2-1-2-1-5)
6. How many ways could you give 6 children one animal cracker each so that no two kids get the same animal?[🔗](#sec_count-conc-2-1-2-1-6-1) [🔗](#sec_count-conc-2-1-2-1-6)
7. How many ways could you give out 6 giraffes to 10 kids?[🔗](#sec_count-conc-2-1-2-1-7-1) [🔗](#sec_count-conc-2-1-2-1-7)
8. Write a question about giving animal crackers to kids that has the answer \({10\choose 6}\text{.}\)[🔗](#sec_count-conc-2-1-2-1-8-1) [🔗](#sec_count-conc-2-1-2-1-8)

[🔗](#sec_count-conc-2-1-2) [🔗](#sec_count-conc-2-1)With all the different counting techniques we have mastered in this last chapter, it might be difficult to know when to apply which technique. Indeed, it is very easy to get mixed up and use the wrong counting method for a given problem. You get better with practice. As you practice, you start to notice some trends that can help you distinguish between types of counting problems. Here are some suggestions that you might find helpful when deciding how to tackle a counting problem and checking whether your solution is correct.[🔗](#sec_count-conc-2-2)

- Remember that you are counting the number of items in some *list of outcomes*. Write down part of this list. Write down an element in the middle of the list – how are you deciding whether your element really is in the list? Could you get this element more than once using your proposed answer?[🔗](#sec_count-conc-2-3-1-1-1) [🔗](#sec_count-conc-2-3-1-1)
- If generating an element on the list involves selecting something (for example, picking a letter or picking a position to put a letter, etc.), can the things you select be repeated? Remember, permutations and combinations select objects from a set *without* repeats.[🔗](#sec_count-conc-2-3-1-2-1) [🔗](#sec_count-conc-2-3-1-2)
- Does order matter? Be careful here, and be sure you know what your answer really means. We usually say that order matters when you get different outcomes when the same objects are selected in different orders. Combinations and “sticks and stones” are used when order *does not* matter.[🔗](#sec_count-conc-2-3-1-3-1) [🔗](#sec_count-conc-2-3-1-3)
- There are four possibilities when it comes to order and repeats. If order matters and repeats are allowed, the answer will look like \(n^k\text{.}\) If order matters and repeats are not allowed, we have \(P(n,k)\text{.}\) If order doesn’t matter and repeats are allowed, use sticks and stones. If order doesn’t matter and repeats are not allowed, use \({n\choose k}\text{.}\) But be careful: this only applies when you are selecting things, and you should make sure you know exactly what you are selecting before determining which case you are in.[🔗](#sec_count-conc-2-3-1-4-1) [🔗](#sec_count-conc-2-3-1-4)
- Think about how you would represent your counting problem in terms of sets or functions. We know how to count different sorts of sets and different types of functions.[🔗](#sec_count-conc-2-3-1-5-1) [🔗](#sec_count-conc-2-3-1-5)
- As we saw with combinatorial proofs, you can often solve a counting problem in more than one way. Do that, and compare your numerical answers. If they don’t match, something is amiss.[🔗](#sec_count-conc-2-3-1-6-1) [🔗](#sec_count-conc-2-3-1-6)

[🔗](#sec_count-conc-2-3) While we have covered many counting techniques, we have really only scratched the surface of the large subject of *enumerative combinatorics*. There are mathematicians doing original research in this area even as you read this. Counting can be really hard.[🔗](#sec_count-conc-2-4) In the next chapter, we will approach counting questions from a very different direction, and in doing so, answer infinitely many counting questions at the same time. We will create *sequences* of answers to related questions.[🔗](#sec_count-conc-2-5)

### Exercises Chapter Review

#### 1.

Activate You have 8 presents to give to your 4 kids. How many ways can this be done if:

1. The presents are identical, and each kid gets at least one present?[🔗](#extracted-webwork-163-1-1-1-1-1-1) [🔗](#extracted-webwork-163-1-1-1-1-1)
2. The presents are identical, and some kids might get no presents?[🔗](#extracted-webwork-163-1-1-1-1-2-1) [🔗](#extracted-webwork-163-1-1-1-1-2)
3. The presents are unique, and some kids might get no presents?[🔗](#extracted-webwork-163-1-1-1-1-3-1) [🔗](#extracted-webwork-163-1-1-1-1-3)
4. The presents are unique and each kid gets at least one present?[🔗](#extracted-webwork-163-1-1-1-1-4-1) [🔗](#extracted-webwork-163-1-1-1-1-4)

[🔗](#extracted-webwork-163-1-1-1) [🔗](#ww-counting-presents)

#### 2.

For each of the following counting problems, say whether the answer is \({10\choose 4}\text{,}\) \(P(10,4)\text{,}\) or neither. If your answer is “neither,” say what the answer should be instead.

1. How many shortest lattice paths are there from \((0,0)\) to \((10,4)\text{?}\)[🔗](#exercises_count-conc-3-1-4-4-1-1) [🔗](#exercises_count-conc-3-1-4-4-1)
2. If you have 10 bow ties, and you want to select 4 of them for next week, how many choices do you have?[🔗](#exercises_count-conc-3-1-4-4-2-1) [🔗](#exercises_count-conc-3-1-4-4-2)
3. Suppose you have 10 bow ties and you will wear a different one on each of the next 4 days. How many choices do you have?[🔗](#exercises_count-conc-3-1-4-4-3-1) [🔗](#exercises_count-conc-3-1-4-4-3)
4. If you want to wear 4 of your 10 bow ties next week (Monday through Sunday), in how many ways can this be accomplished?[🔗](#exercises_count-conc-3-1-4-4-4-1) [🔗](#exercises_count-conc-3-1-4-4-4)
5. Out of a group of 10 classmates, how many ways can you rank your top 4 friends?[🔗](#exercises_count-conc-3-1-4-4-5-1) [🔗](#exercises_count-conc-3-1-4-4-5)
6. If 10 students come to their professor’s office but only 4 can fit at a time, how many different combinations of 4 students can see the prof first?[🔗](#exercises_count-conc-3-1-4-4-6-1) [🔗](#exercises_count-conc-3-1-4-4-6)
7. How many 4-letter words can be made from the first 10 letters of the alphabet?[🔗](#exercises_count-conc-3-1-4-4-7-1) [🔗](#exercises_count-conc-3-1-4-4-7)
8. In how many ways can you make the word “cake” from the first 10 letters of the alphabet?[🔗](#exercises_count-conc-3-1-4-4-8-1) [🔗](#exercises_count-conc-3-1-4-4-8)
9. How many ways are there to distribute 10 identical apples among 4 children?[🔗](#exercises_count-conc-3-1-4-4-9-1) [🔗](#exercises_count-conc-3-1-4-4-9)
10. If you have 10 kids (and live in a shoe) and 4 types of cereal, in how many ways can your kids eat breakfast?[🔗](#exercises_count-conc-3-1-4-4-10-1) [🔗](#exercises_count-conc-3-1-4-4-10)
11. In how many ways can you arrange exactly 4 ones in a string of 10 binary digits?[🔗](#exercises_count-conc-3-1-4-4-11-1) [🔗](#exercises_count-conc-3-1-4-4-11)
12. You want to select 4 distinct, single-digit numbers as your lotto picks. How many choices do you have?[🔗](#exercises_count-conc-3-1-4-4-12-1) [🔗](#exercises_count-conc-3-1-4-4-12)
13. 10 kids want ice cream. You have 4 varieties. How many ways are there to give the kids as much ice cream as they want?[🔗](#exercises_count-conc-3-1-4-4-13-1) [🔗](#exercises_count-conc-3-1-4-4-13)
14. How many 1-1 functions are there from \(\{1,2,\ldots, 10\}\) to \(\{a,b,c,d\}\text{?}\)[🔗](#exercises_count-conc-3-1-4-4-14-1) [🔗](#exercises_count-conc-3-1-4-4-14)
15. How many surjective functions are there from \(\{1,2,\ldots, 10\}\) to \(\{a,b,c,d\}\text{?}\)[🔗](#exercises_count-conc-3-1-4-4-15-1) [🔗](#exercises_count-conc-3-1-4-4-15)
16. Each of your 10 bow ties matches 4 pairs of suspenders. How many outfits can you make?[🔗](#exercises_count-conc-3-1-4-4-16-1) [🔗](#exercises_count-conc-3-1-4-4-16)
17. After the party, the 10 kids each choose one of 4 party-favors. How many outcomes are there?[🔗](#exercises_count-conc-3-1-4-4-17-1) [🔗](#exercises_count-conc-3-1-4-4-17)
18. How many 6-elements subsets are there of the set \(\{1,2,\ldots, 10\}\)[🔗](#exercises_count-conc-3-1-4-4-18-1) [🔗](#exercises_count-conc-3-1-4-4-18)
19. In how many ways can you split up 11 kids into 5 named teams?[🔗](#exercises_count-conc-3-1-4-4-19-1) [🔗](#exercises_count-conc-3-1-4-4-19)
20. How many solutions are there to \(x_1 + x_2 + \cdots + x_5 = 6\) where each \(x_i\) is a non-negative integer?[🔗](#exercises_count-conc-3-1-4-4-20-1) [🔗](#exercises_count-conc-3-1-4-4-20)
21. Your band goes on tour. There are 10 cities within driving distance, but only enough time to play 4 of them. How many choices do you have for the cities on your tour?[🔗](#exercises_count-conc-3-1-4-4-21-1) [🔗](#exercises_count-conc-3-1-4-4-21)
22. In how many different ways can you play the 4 cities you choose?[🔗](#exercises_count-conc-3-1-4-4-22-1) [🔗](#exercises_count-conc-3-1-4-4-22)
23. Out of the 10 breakfast cereals available, you want to have 4 bowls. In how many ways can you do this?[🔗](#exercises_count-conc-3-1-4-4-23-1) [🔗](#exercises_count-conc-3-1-4-4-23)
24. There are 10 types of cookies available. You want to make a 4 cookie stack. How many different stacks can you make?[🔗](#exercises_count-conc-3-1-4-4-24-1) [🔗](#exercises_count-conc-3-1-4-4-24)
25. From your home at (0,0) you want to go to either the donut shop at (5,4) or the one at (3,6). How many paths could you take?[🔗](#exercises_count-conc-3-1-4-4-25-1) [🔗](#exercises_count-conc-3-1-4-4-25)
26. How many 10-digit numbers do not contain a sub-string of 4 repeated digits?[🔗](#exercises_count-conc-3-1-4-4-26-1) [🔗](#exercises_count-conc-3-1-4-4-26)

[🔗](#exercises_count-conc-3-1-4) [🔗](#exercises_count-conc-3)

#### 3.

Activate Recall, you own 4 regular ties and 8 bow ties. You realize that it would be okay to wear more than two ties to your clown college interview.

1. You must select some of your ties to wear. Everything is okay, from no ties up to all ties. How many choices do you have?[🔗](#extracted-webwork-164-1-1-1-1-1-1) [🔗](#extracted-webwork-164-1-1-1-1-1)
2. If you want to wear at least one regular tie and one bow tie, but are willing to wear up to all your ties, how many choices do you have for which ties to wear?[🔗](#extracted-webwork-164-1-1-1-1-2-1) [🔗](#extracted-webwork-164-1-1-1-1-2)
3. How many choices of which ties to wear do you have if you wear exactly 3 of the 4 regular ties and 2 of the 8 bow ties?[🔗](#extracted-webwork-164-1-1-1-1-3-1) [🔗](#extracted-webwork-164-1-1-1-1-3)
4. Once you have selected 3 regular and 2 bow ties, in how many orders could you put the ties on, assuming you must have one of the bow ties on top?[🔗](#extracted-webwork-164-1-1-1-1-4-1) [🔗](#extracted-webwork-164-1-1-1-1-4)

[🔗](#extracted-webwork-164-1-1-1) [🔗](#ww-counting-multiple-ties)

#### 4.

Give a counting question where the answer is \(8\cdot 3 \cdot 3 \cdot 5\text{.}\) Give another question where the answer is \(8 + 3 + 3 + 5\text{.}\)[🔗](#exercises_count-conc-5-1-1) [🔗](#exercises_count-conc-5)

#### 5.

Activate Consider numbers of the form \(\alpha = a_1a_2a_3\dots a_n\text{,}\) with \(n\) digits, each digit from the set \({\left\{1,2,3,4,5,6,7,8\right\}}\text{.}\) For example, if \(n = 4\text{,}\) the number \(\alpha = a_1a_2a_3a_4\) will have 4 digits from the set \({\left\{1,2,3,4,5,6,7,8\right\}}\text{.}\)[🔗](#extracted-webwork-165-1-1-1) Let \(n = 11\text{.}\)[🔗](#extracted-webwork-165-1-1-2)

1. How many such numbers are there?[🔗](#extracted-webwork-165-1-1-3-1-1-1) [🔗](#extracted-webwork-165-1-1-3-1-1)
2. How many such numbers are there for which the *sum* of the digits is even?[🔗](#extracted-webwork-165-1-1-3-1-2-1) [🔗](#extracted-webwork-165-1-1-3-1-2)
3. How many such numbers contain more even digits than odd digits?[🔗](#extracted-webwork-165-1-1-3-1-3-1) [🔗](#extracted-webwork-165-1-1-3-1-3)

[🔗](#extracted-webwork-165-1-1-3) [🔗](#ww-counting-digits)

#### 6.

Activate In a recent small survey of airline passengers, 27 said they had flown American in the last year, 22 had flown Jet Blue, and 30 had flown Continental. Of those, 13 reported they had flown on American and Jet Blue, 12 had flown on Jet Blue and Continental, and 11 had flown on American and Continental. 4 passengers had flown on all three airlines.[🔗](#extracted-webwork-166-1-1-1) How many passengers were surveyed? (Assume the results above make up the entire survey.)[🔗](#extracted-webwork-166-1-1-2) [🔗](#ww-counting-pie-airlines)

#### 7.

Activate Recall, by \(11\)-bit strings, we mean strings of binary digits, of length 11.

1. How many \(11\)-bit strings are there total?[🔗](#extracted-webwork-167-1-1-1-2-1-1) [🔗](#extracted-webwork-167-1-1-1-2-1)
2. How many \(11\)-bit strings have weight 4?[🔗](#extracted-webwork-167-1-1-1-2-2-1) [🔗](#extracted-webwork-167-1-1-1-2-2)
3. How many subsets of the set {1,2,3,4,5,6,7,8,9,10,11} contain exactly 4 elements?[🔗](#extracted-webwork-167-1-1-1-2-3-1) [🔗](#extracted-webwork-167-1-1-1-2-3)

[🔗](#extracted-webwork-167-1-1-1) [🔗](#ww-counting-bs-vs-sets)

#### 8.

Activate What is the coefficient of \(x^{11}\) in the expansion of \((x+3)^{16} + x^3(x+5)^{20}\text{?}\)[🔗](#extracted-webwork-168-1-1-1) [🔗](#ww-counting-coefs)

#### 9.

Activate How many 11-letter words contain exactly 3 vowels? (For example, an 8-letter word with 5 vowels is “aaioobtt”; don’t consider “y” a vowel for this exercise.)[🔗](#extracted-webwork-169-1-1-1) What if repeated letters were not allowed?[🔗](#extracted-webwork-169-1-1-2) [🔗](#ww-counting-words)

#### 10.

Activate For each of the following, find the number of shortest lattice paths from \((5,5)\) to \((10,10)\) which:

1. pass through the point \((7,6)\text{.}\)[🔗](#extracted-webwork-170-1-1-1-3-1-1) [🔗](#extracted-webwork-170-1-1-1-3-1)
2. avoid (do not pass through) the point \((9,9)\text{.}\)[🔗](#extracted-webwork-170-1-1-1-3-2-1) [🔗](#extracted-webwork-170-1-1-1-3-2)
3. either pass through \((7,6)\) or \((9,9)\) (or both).[🔗](#extracted-webwork-170-1-1-1-3-3-1) [🔗](#extracted-webwork-170-1-1-1-3-3)

[🔗](#extracted-webwork-170-1-1-1) [🔗](#ww-counting-paths)

#### 11.

Activate You live in Grid-Town on the corner of 2nd and 4th, and work in a building on the corner of 20th and 16th. How many routes are there which take you from home to work and then back home, but by a different route?[🔗](#extracted-webwork-171-1-1-1) [🔗](#ww-counting-gridtown)

#### 12.

Activate How many 5-bit strings start with \(101\) or end with \(10\) or both?[🔗](#extracted-webwork-172-1-1-1) [🔗](#ww-counting-bs-anyweight)

#### 13.

Activate How many 9-bit strings of weight 7 start with \(101\) or end with \(10\) or both?[🔗](#extracted-webwork-173-1-1-1) [🔗](#ww-counting-bs-weight)

#### 14.

Activate We are making 9-letter words from the set of letters \(a,b,c,d,e,f \dots\text{,}\) in such a way that we have exactly the first 9 letters available so that we use all letters.

1. How many 9-letter words can we make from the letters without repeats that do not contain the sub-word “bad” in consecutive letters?[🔗](#extracted-webwork-174-1-1-1-2-1-1) [🔗](#extracted-webwork-174-1-1-1-2-1)

[🔗](#extracted-webwork-174-1-1-1)

1. How many words don’t contain the subword “bad” in not-necessarily-consecutive letters (but in order)?[🔗](#extracted-webwork-174-1-1-2-1-1-1) [🔗](#extracted-webwork-174-1-1-2-1-1)

[🔗](#extracted-webwork-174-1-1-2) [🔗](#ww-counting-words2)

#### 15.

Explain using lattice paths why \(\sum_{k=0}^n {n \choose k} = 2^n\text{.}\)[🔗](#exercises_count-conc-16-1-1) [🔗](#exercises_count-conc-16)

#### 16.

Activate Suppose you have 19 one-dollar bills to give out as prizes to your top 6 discrete math students. How many ways can you do this if:

1. Each of the 6 students gets at least 1 dollar?[🔗](#extracted-webwork-175-1-1-1-1-1-1) [🔗](#extracted-webwork-175-1-1-1-1-1)
2. Some students might get nothing?[🔗](#extracted-webwork-175-1-1-1-1-2-1) [🔗](#extracted-webwork-175-1-1-1-1-2)
3. Each student gets at least 1 dollar but no more than 8 dollars?[🔗](#extracted-webwork-175-1-1-1-1-3-1) [🔗](#extracted-webwork-175-1-1-1-1-3)

[🔗](#extracted-webwork-175-1-1-1) Hint. Use stars and bars.[🔗](#extracted-webwork-175-1-2-1) [🔗](#extracted-webwork-175-1-2) [🔗](#ww-counting-bills)

#### 17.

Activate How many functions \(f: {\left\{1,2,3,4,5,6\right\}} \to {\left\{1,2,3,4,5,6\right\}}\) are there satisfying:

1. \(f(1) = 1\) or \(f(2) = 2\) (or both)?[🔗](#extracted-webwork-176-1-1-1-2-1-1) [🔗](#extracted-webwork-176-1-1-1-2-1)
2. \(f(1) \ne 1\) or \(f(2) \ne 2\) (or both)?[🔗](#extracted-webwork-176-1-1-1-2-2-1) [🔗](#extracted-webwork-176-1-1-1-2-2)
3. \(f(1) \ne 1\) *and* \(f(2) \ne 2\text{,}\) and \(f\) is injective?[🔗](#extracted-webwork-176-1-1-1-2-3-1) [🔗](#extracted-webwork-176-1-1-1-2-3)
4. \(f\) is surjective, but \(\forall x \in \{1,2,\dots, 6 \} \text{, } f(x) \ne x\text{?}\)[🔗](#extracted-webwork-176-1-1-1-2-4-1) [🔗](#extracted-webwork-176-1-1-1-2-4)

[🔗](#extracted-webwork-176-1-1-1) [🔗](#ww-counting-functions)

#### 18.

Activate How many functions map \({\left\{1,2,3,4,5,6\right\}}\) *onto* \({\left\{1,2,3,4,5\right\}}\) (i.e., how many *surjections* are there)?[🔗](#extracted-webwork-177-1-1-1) [🔗](#ww-counting-surjections)

#### 19.

Activate To thank your math professor for doing such an amazing job all semester, you decide to bake your professor cookies. You know how to make 15 different types of cookies.

1. If you want to give your professor 8 different types of cookies, how many different combinations of cookie type can you select? Explain your answer.[🔗](#extracted-webwork-178-1-1-1-1-1-1) [🔗](#extracted-webwork-178-1-1-1-1-1)
2. To keep things interesting, you decide to make a different number of each type of cookie. If again you want to select 8 cookie types, how many ways can you select the cookie types and decide for which there will be the most, second most, etc. Explain your answer.[🔗](#extracted-webwork-178-1-1-1-1-2-1) [🔗](#extracted-webwork-178-1-1-1-1-2)
3. You change your mind again. This time you decide you will make a total of 22 cookies. Each cookie could be any one of the 15 types of cookies you know how to bake (and it’s okay if you leave some types out). How many choices do you have? Explain.[🔗](#extracted-webwork-178-1-1-1-1-3-1) [🔗](#extracted-webwork-178-1-1-1-1-3)
4. You realize that the previous plan did not account for presentation. This time, you once again want to make 22 cookies, each one could be any one of the 15 types of cookies. However, now you plan to shape the cookies into the numerals 1, 2, ..., 22. How many choices do you have for which types of cookies to bake into which numerals? Explain.[🔗](#extracted-webwork-178-1-1-1-1-4-1) [🔗](#extracted-webwork-178-1-1-1-1-4)
5. The only flaw with the last plan is that your professor might not get to sample all 15 different varieties of cookies. How many choices do you have for which types of cookies to make into which numerals, given that each type of cookie should be present at least once? Explain.[🔗](#extracted-webwork-178-1-1-1-1-5-1) [🔗](#extracted-webwork-178-1-1-1-1-5)

[🔗](#extracted-webwork-178-1-1-1) [🔗](#ww-counting-cookies)

#### 20.

For which of the parts of the previous problem ([Exercise 3.9.19](sec_count-conc.html#ww-counting-cookies)) does it make sense to interpret the counting question as counting some number of functions? Say what the domain and codomain should be, and whether you are counting all functions, injections, surjections, or something else.[🔗](#exercises_count-conc-21-1-1) [🔗](#exercises_count-conc-21)[🔗](#exercises_count-conc)[🔗](#sec_count-conc) [&#xe5cb;Prev](sec_advPIE.html)[&#xe5ce;Top](#)[Next&#xe5cc;](ch_sequences.html) [Feedback](/cdn-cgi/l/email-protection#d3bca0b0b2a1fdbfb6a5babd93a6bdb0bcfdb6b7a6)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_count-conc-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_count-conc-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
