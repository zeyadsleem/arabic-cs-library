---
title: "Combining Outcomes"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_counting-combine-outcomes.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.2 Combining Outcomes

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_counting-combine-outcomes-6-1-1)

1. Apply the sum and product principles to count the number of outcomes of an event.[🔗](#sec_counting-combine-outcomes-6-2-1-1) [🔗](#sec_counting-combine-outcomes-6-2-1)
2. Solve counting problems using a combination of the sum and product principles.[🔗](#sec_counting-combine-outcomes-6-2-2-1) [🔗](#sec_counting-combine-outcomes-6-2-2)
3. Justify the product principle in terms of the sum principle.[🔗](#sec_counting-combine-outcomes-6-2-3-1) [🔗](#sec_counting-combine-outcomes-6-2-3)

[🔗](#sec_counting-combine-outcomes-6)

### Subsection Section Preview

#### Investigate!

A standard deck of playing cards contains 52 cards. There are four suits: clubs, diamonds, hearts, and spades. Each suit contains cards of 13 values: Ace, 2, 3,..., 10, Jack, Queen, and King.[🔗](#sec_counting-combine-outcomes-7-2-3-1) We call the hearts and diamonds red cards (with clubs and spades the black cards). In each suit, the Jack, Queen, and King are called face cards (the others are call number cards).[🔗](#sec_counting-combine-outcomes-7-2-3-2) Suppose you pick two cards from a deck. How many different combinations will have the first card be a red card and the second card be a face card?[🔗](#sec_counting-combine-outcomes-7-2-3-3) [🔗](#sec_counting-combine-outcomes-7-2) *Combinatorics* is about counting, but looking at the word, we see it really deals with how things *combine*. In this section, we will consider two very different ways that we can combine the outcomes we count in combinatorics problems.[🔗](#sec_counting-combine-outcomes-7-3)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-counting-combine)

#### 1.

Activate A restaurant offers 8 appetizers and 14 entrées. How many choices do you have if:

1. you will eat one dish, either an appetizer or an entrée?[🔗](#extracted-webwork-89-1-1-1-1-1-1) [🔗](#extracted-webwork-89-1-1-1-1-1)
2. you are extra hungry and want to eat both an appetizer and an entrée?[🔗](#extracted-webwork-89-1-1-1-1-2-1) [🔗](#extracted-webwork-89-1-1-1-1-2)

[🔗](#extracted-webwork-89-1-1-1) [🔗](#pa-counting-combine-1)

#### 2.

Think about the methods you used to solve the questions about appetizers and entrées. Can you frame these as rules for how to combine two numbers of things when counting? Write down the rules for these methods.[🔗](#pa-counting-combine-2-1-1) [🔗](#pa-counting-combine-2)

#### 3.

Activate Do your rules work? Let’s apply them to another counting problem to check. Given that a standard deck of playing cards has 12 face cards and 26 red cards, answer the following.[🔗](#extracted-webwork-90-1-1-1)

#### (a)

How many ways can you select a card which is either a face card *or* a red card?[🔗](#extracted-webwork-90-1-2-1-1) [🔗](#extracted-webwork-90-1-2)

#### (b)

How many ways can you select a card which is both a face card *and* a red card?[🔗](#extracted-webwork-90-1-3-1-1) [🔗](#extracted-webwork-90-1-3) [🔗](#pa-counting-combine-3)[🔗](#PA-counting-combine)[🔗](#sec_counting-combine-outcomes-7)

### Subsection What are *Outcomes*?

Before we start counting, a quick note about how we ask counting problems. Often counting problems are asked terms of how many ways something can happen. That is, there is some event that can result in different outcomes, and it is the different outcomes that are counted. Alternatively, we can take a less “active” view by asking for the number of elements in a set, such as the set of bit strings of a particular length and weight. However, this too could be rephrased as a question about an event: if you randomly select one of the bit strings (from the set of bit strings), how many things can happen?[🔗](#sec_counting-combine-outcomes-8-2) So counting the elements in a set or counting the number of outcomes of an event is not really different. Let’s think of every counting problem as asking for the number of elements in a *set* of *outcomes*.[🔗](#sec_counting-combine-outcomes-8-3) At the most basic level, counting is not hard at all: Just write all the outcomes in a numbered list and see how many numbers you use. Let me tell you about my bow tie collection. I have,

1. A purple bow tie.[🔗](#sec_counting-combine-outcomes-8-4-1-1-1) [🔗](#sec_counting-combine-outcomes-8-4-1-1)
2. A green bow tie.[🔗](#sec_counting-combine-outcomes-8-4-1-2-1) [🔗](#sec_counting-combine-outcomes-8-4-1-2)
3. A striped bow tie.[🔗](#sec_counting-combine-outcomes-8-4-1-3-1) [🔗](#sec_counting-combine-outcomes-8-4-1-3)
4. A paisley bow tie.[🔗](#sec_counting-combine-outcomes-8-4-1-4-1) [🔗](#sec_counting-combine-outcomes-8-4-1-4)

How many bow ties do I have (how many ways can I select a bow tie)? Well, the largest number in my numbered list is 4, so I have four bow ties. 1 Obviously this example is quite outdated; only four bow ties? What sort of mathematician do you take me for? Of course, as we saw in the previous section, we can use shortcuts to avoid listing out all of the outcomes, such as using Pascal’s triangle to find the number of items in our list. [🔗](#sec_counting-combine-outcomes-8-4) Where counting begins to get interesting is when we want to make a new list that combines two or more lists we have already counted. For example, suppose that in addition to my list of four bow ties, I had a list of seven pairs of novelty socks. I could ask how many choices I have if I wanted to wear either a cool bow tie or a pair of novelty socks. Okay, combine my two lists to make a new list with 11 items: Perhaps first list the four bow ties and then keep counting (starting with 5 for the first pair of socks) until you have listed the seven additional items, ending at 11.[🔗](#sec_counting-combine-outcomes-8-5) In this example, we have combined our two sets of outcomes (picking a bow tie and picking a pair of socks) to get a new set of outcomes (picking a bow tie or pair of socks). That resulting set of outcomes contained 11 elements.[🔗](#sec_counting-combine-outcomes-8-6) Now consider the question: How many choices do I have if I want to wear both a bow tie and a pair of novelty socks? Again, I need to combine my two sets of outcomes to get a new set of outcomes. But this new set of outcomes will contain 28 elements. How did I know that I should multiply the number of elements in each of my original sets, instead of adding them? We are once again combining outcomes: The resulting set of outcomes that contains 28 elements that are all outcomes consisting of a bow tie and a pair of socks. Now read the previous paragraph! They sound very close to each other![🔗](#sec_counting-combine-outcomes-8-7) The difference between the two scenarios is subtle. There are two ways we can think of combining outcomes:

1. We can combine the *sets* of outcomes.[🔗](#sec_counting-combine-outcomes-8-8-1-1-1) [🔗](#sec_counting-combine-outcomes-8-8-1-1)
2. We can combine the *outcomes* in the sets.[🔗](#sec_counting-combine-outcomes-8-8-1-2-1) [🔗](#sec_counting-combine-outcomes-8-8-1-2)

Being able to distinguish between these operations is a key skill in combinatorics. [🔗](#sec_counting-combine-outcomes-8-8)

#### Example 3.2.1.

Suppose your refrigerator door has some magnetic letters and numerals on it: There are five letters (A, B, C, D, and E) and three numerals (1, 2, and 3). Your brother says that if you combine these sets of magnets, you will get a collection of 8 magnets. Your sister says that you can combine these magnets in 15 ways.[🔗](#eg-counting-magnets-1-1) What sets of outcomes are your siblings thinking of?[🔗](#eg-counting-magnets-1-2) Solution. Your brother is thinking of combining the sets of outcomes. The set of outcomes for the letters is \(\{A, B, C, D, E\}\) and the set of outcomes for the numerals is \(\{1, 2, 3\}\text{.}\) The set of outcomes for the combined set of magnets is \(\{A, B, C, D, E, 1, 2, 3\}\text{,}\) which contains 8 elements.[🔗](#eg-counting-magnets-2-1) Your sister is thinking of combining the outcomes themselves. The set of outcomes is \(\{A1, A2, A3, B1, B2, B3, C1, C2, C3, D1, D2, D3, E1, E2, E3\}\text{,}\) which contains 15 elements.[🔗](#eg-counting-magnets-2-2) [🔗](#eg-counting-magnets-2) [🔗](#eg-counting-magnets)[🔗](#sec_counting-combine-outcomes-8)

### Subsection The Sum and Product Principles

Let’s carefully write down the rules we can use to combine sets of outcomes and outcomes in sets.[🔗](#sec_counting-combine-outcomes-9-2)

#### Principle 3.2.2. Sum Principle.

If an event \(A\) results in \(m\) outcomes, and event \(B\) results in \(n\) *disjoint* outcomes, then the event “\(A\) or \(B\)” results in \(m + n\) outcomes.[🔗](#principle-sum-3-1) [🔗](#principle-sum) It is important that the events be disjoint: i.e., that there is no way for \(A\) and \(B\) to both happen at the same time. For example, a standard deck of 52 cards contains \(26\) red cards and \(12\) face cards. However, the number of ways to select a card which is either red or a face card is not \(26 + 12 = 38\text{.}\) This is because there are 6 cards which are both red and face cards.[🔗](#sec_counting-combine-outcomes-9-4)

#### Example 3.2.3.

How many two-letter “words” start with either A or B? (A word is just a sequence of letters; it doesn’t have to be English, or even pronounceable.)[🔗](#sec_counting-combine-outcomes-9-5-1-1) Solution. First, how many two-letter words start with A? We just need to select the second letter, which can be accomplished in 26 ways. So there are 26 words starting with A. There are also 26 words that start with B. To select a word that starts with either A or B, we can pick the word from the first 26 or the second 26, for a total of 52 words.[🔗](#sec_counting-combine-outcomes-9-5-2-1) We have two sets of outcomes: the words starting with A and the words starting with B. We create a new set of outcomes by combining the sets to get the set of words that start with either A or B, and by the sum principle, this new set contains 52 outcomes.[🔗](#sec_counting-combine-outcomes-9-5-2-2) [🔗](#sec_counting-combine-outcomes-9-5-2) [🔗](#sec_counting-combine-outcomes-9-5)We often use the principle when the sets of outcomes need to be counted using other counting techniques.[🔗](#sec_counting-combine-outcomes-9-6)

#### Example 3.2.4.

How many \(10\)-bit strings of weight \(6\) start with either \(11\) or \(00\text{?}\)[🔗](#sec_counting-combine-outcomes-9-7-1-1) Solution. We learned how to count bit strings with a fixed length and weight in [Section 3.1](sec_counting-pascal.html). The total number of \(10\)-bit strings of weight \(6\) is \(\binom{10}{6} = 210\) (where that value was found using [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large)). However, we want to count just those that start with \(11\) or \(00\) (and not those that start with \(10\) or \(01\)).[🔗](#sec_counting-combine-outcomes-9-7-2-1) Since there are no bit strings that start with both \(11\) and \(00\text{,}\) we can apply the sum principle. We will compute the size of each set of outcomes and then add the results.[🔗](#sec_counting-combine-outcomes-9-7-2-2) How many \(10\)-bit strings of weight \(6\) start with \(11\text{?}\) If the string starts with \(11\text{,}\) then of the remaining eight bits, there must be four 1’s, so that the total weight is \(6\text{.}\) This is just like asking for the number of \(8\)-bit strings with weight 4, so there are \(\binom{8}{4} = 70\) such strings. Similarly, there are \(\binom{8}{6} = 28\) strings that start with \(00\) (all six 1’s must be in the remaining 8 bits). By the sum principle, the total number of strings we want to count is \(70 + 28 = 98\text{.}\)[🔗](#sec_counting-combine-outcomes-9-7-2-3) [🔗](#sec_counting-combine-outcomes-9-7-2) [🔗](#sec_counting-combine-outcomes-9-7)We can also use the sum principle *indirectly* in a way that might be called the *subtraction principle* (but isn’t).[🔗](#sec_counting-combine-outcomes-9-8)

#### Example 3.2.5.

How many \(10\)-bit strings of weight \(6\) have at least one 1 in their first three bits?[🔗](#sec_counting-combine-outcomes-9-9-1-1) Solution. There are lots of different ways a string can have at least one 1 in its first three bits: It could start with 100, 010, 001, 101, 110, 011, or 111. We could count the number of strings that start with each of them and then apply the sum principle a bunch of times. But let’s not.[🔗](#sec_counting-combine-outcomes-9-9-2-1) Suppose the number of strings we want to count is \(x\text{.}\) Let \(y\) be the number of \(10\)-bit strings of weight 6 that *do not* have a 1 in any of their first three bits. What is \(x + y\text{?}\) This is the number of \(10\)-bit strings of weight 6 in total, which is \(\binom{10}{6} = 210\text{.}\) It is also easy to find \(y\text{:}\) Bit strings with length 10 and weight 6 that start with 000 must end in a bit string with length 7 and weight 6. There are \(\binom{7}{6} = 7\) of these.[🔗](#sec_counting-combine-outcomes-9-9-2-2) Thus, we have \begin{equation*} x + 7 = 210\text{,} \end{equation*} so \(x = 210 - 7 = 203\text{.}\) [🔗](#sec_counting-combine-outcomes-9-9-2-3) [🔗](#sec_counting-combine-outcomes-9-9-2) [🔗](#sec_counting-combine-outcomes-9-9)While we didn’t want to use the sum principle multiple times in the previous example, we could have. The sum principle works with more than two events. Say, in addition to your four bow ties and seven pairs of socks, you could also pick one of five belt buckles. How many choices do you have now? You would have \(4+7+5 = 16\) options.[🔗](#sec_counting-combine-outcomes-9-10)

#### Example 3.2.6.

How many two-letter words start with one of the 5 vowels?[🔗](#eg-vowel-word-sum-1-1) Solution. There are 26 two-letter words starting with A, another 26 starting with E, and so on. By the sum principle, the total number of words will then be \(26+26+26+26+26 = 130\) Of course it would be easier to just multiply \(5\cdot 26\text{.}\)[🔗](#eg-vowel-word-sum-2-1) [🔗](#eg-vowel-word-sum-2) [🔗](#eg-vowel-word-sum)Note that in the previous example, when using the sum principle on a bunch of outcome sets of the same size, it is quicker to multiply. Let’s take advantage of this observation and state it as a new principle.[🔗](#sec_counting-combine-outcomes-9-12)

#### Principle 3.2.7. Product Principle.

If event \(A\) can occur in \(m\) ways, and each possibility for \(A\) allows for exactly \(n\) ways for event \(B\text{,}\) then the event “\(A\) and \(B\)” can occur in \(m \cdot n\) ways.[🔗](#principle-product-3-1) [🔗](#principle-product)A nice way to picture the product principle is to think of the outcomes as “levels” in a tree. To illustrate this, consider the counting question of [Example 3.2.1](sec_counting-combine-outcomes.html#eg-counting-magnets): How many ways can you select a letter from \(\{A, B, C, D, E\}\) followed by a numeral from \(\{1, 2, 3\}\text{?}\) Here is a tree picture that shows what is going on.[🔗](#sec_counting-combine-outcomes-9-14) ![Tree of outcomes for two symbol sequences where the first symbol is A-E and the second is 1-3.](generated/latex-image/img-counting-tree-strings.svg) Each leaf of the tree corresponds to an outcome. The tree shows that the three outcomes of the second level are repeated five times, once for each outcome of the first level.[🔗](#sec_counting-combine-outcomes-9-16)

#### Example 3.2.8.

How many two-letter words start with one of the 5 vowels? This time use the product principle to answer the question.[🔗](#eg-vowel-word-product-1-1) Solution. How can we think of selecting a two-letter word as a sequence of two events that both happen? Event \(A\) is “selecting the vowel that starts the word.” Event \(B\) is “selecting the second letter for the word.” By the product principle, there are \(5 \cdot 26 = 130\) ways for the event “\(A\) and \(B\)” to occur.[🔗](#eg-vowel-word-product-2-1) [🔗](#eg-vowel-word-product-2) [🔗](#eg-vowel-word-product)Of course the solutions to [Example 3.2.6](sec_counting-combine-outcomes.html#eg-vowel-word-sum) and [Example 3.2.8](sec_counting-combine-outcomes.html#eg-vowel-word-product) are the same, but the outcomes we are combining and the ways we are combining them are different.[🔗](#sec_counting-combine-outcomes-9-18) When applying the sum principle, we combined five disjoint sets of outcomes. One such set of outcomes was, \begin{equation*} \{AA, AB, AC, AD,\ldots, AZ\} \end{equation*} and another was, \begin{equation*} \{EA, EB, EC, ED, \ldots, EZ\}\text{.} \end{equation*} That is, each set of outcomes was a set of 2-letter words, starting with a different vowel. The sum principle combined these five sets to create a new set that contained exactly the same elements in the original sets, just all together in one set. [🔗](#sec_counting-combine-outcomes-9-19) On the other hand, when we applied the product principle, we combined the outcomes in two sets. The first set was, \begin{equation*} \{A, E, I, O, U\} \end{equation*} and the second set was, \begin{equation*} \{A, B, C, D, \ldots, Z\}\text{.} \end{equation*} The product principle combines the elements in those sets to make a set of new outcomes (outcomes not present in any of the sets being combined). [🔗](#sec_counting-combine-outcomes-9-20) As with the sum principle, we often use the product principle to define sets of outcomes that first need to be counted carefully.[🔗](#sec_counting-combine-outcomes-9-21)

#### Example 3.2.9.

How many lattice paths from \((0,0)\) to \((10,10)\) pass through the point \((4,7)\text{?}\)[🔗](#sec_counting-combine-outcomes-9-22-1-1) Solution. We can count lattice paths with [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large), but how do we ensure that the path passes through a particular point? Well, any path that passes through \((4,7)\) must first go from \((0,0)\) to \((4,7)\text{,}\) and then complete its journey with a path from \((4,7)\) to \((10,10)\text{.}\)[🔗](#sec_counting-combine-outcomes-9-22-2-1) The number of paths from \((0,0)\) to \((4,7)\) is \(\binom{11}{4} = 330\text{.}\)[🔗](#sec_counting-combine-outcomes-9-22-2-2) The number of paths from \((4,7)\) to \((10,10)\) is \(\binom{9}{3} = 84\text{.}\) (The paths have length 9 and with 6 steps in the \(x\) direction.)[🔗](#sec_counting-combine-outcomes-9-22-2-3) Now combine these with the... wait, what principle? To get a path from \((0,0)\) to \((10,10)\) that passes through \((4,7)\text{,}\) we need to first select a path from \((0,0)\) to \((4,7)\) and then *add on* a path from \((4,7)\) to \((10,10)\text{.}\) So is this the sum principle???[🔗](#sec_counting-combine-outcomes-9-22-2-4) No! Remember that the sum principle combines the two sets of outcomes. If we applied the sum principle, we would get a larger set containing the \(330 + 84\) paths that are contained in each individual set. None of these are paths we want to count. We want to combine the different elements in our sets of outcomes in every possible combination. That is why the product principle is correct here.[🔗](#sec_counting-combine-outcomes-9-22-2-5) Thus, the total number of paths we want to count is \(330 \cdot 84 = 27720\text{.}\)[🔗](#sec_counting-combine-outcomes-9-22-2-6) [🔗](#sec_counting-combine-outcomes-9-22-2) [🔗](#sec_counting-combine-outcomes-9-22)The product principle generalizes to more than two events as well.[🔗](#sec_counting-combine-outcomes-9-23)

#### Example 3.2.10.

How many license plates can you make out of three letters followed by three numerical digits?[🔗](#sec_counting-combine-outcomes-9-24-1-1) Solution. Here we have six events: the first letter, the second letter, the third letter, the first digit, the second digit, and the third digit. The first three events can each happen in 26 ways; the last three can each happen in 10 ways. So the total number of license plates will be \(26\cdot 26\cdot 26 \cdot 10 \cdot 10 \cdot 10\text{,}\) using the product principle.[🔗](#sec_counting-combine-outcomes-9-24-2-1) Does this make sense? Think about how we would pick a license plate. How many choices would we have? First, we need to pick the first letter. There are 26 choices. Now for each of those, there are 26 choices for the second letter: 26 second letters with first letter A, 26 second letters with first letter B, and so on. We add 26 to itself 26 times. Or quicker: there are \(26 \cdot 26\) choices for the first two letters.[🔗](#sec_counting-combine-outcomes-9-24-2-2) Now for each choice of the first two letters, we have 26 choices for the third letter. That is, 26 third letters for the first two letters AA, 26 choices for the third letter after starting AB, and so on. There are \(26 \cdot 26\) of these \(26\) third letter choices, for a total of \((26\cdot26)\cdot 26\) choices for the first three letters. And for each of these \(26\cdot26\cdot26\) choices of letters, we have a bunch of choices for the remaining digits.[🔗](#sec_counting-combine-outcomes-9-24-2-3) In fact, there are going to be exactly 1000 choices for the numbers. We can see this because there are 1000 three-digit numbers (000 through 999). This is 10 choices for the first digit, 10 for the second, and 10 for the third. The product principle says we multiply: \(10\cdot 10 \cdot 10 = 1000\text{.}\)[🔗](#sec_counting-combine-outcomes-9-24-2-4) All together, there were \(26^3\) choices for the three letters and \(10^3\) choices for the numbers, so we have a total of \(26^3 \cdot 10^3\) choices of license plates.[🔗](#sec_counting-combine-outcomes-9-24-2-5) [🔗](#sec_counting-combine-outcomes-9-24-2) [🔗](#sec_counting-combine-outcomes-9-24)The previous example had an answer that used exponents. So is there an exponential principle we should learn? We don’t separate one out as there really isn’t anything different in the way we think of constructing our outcome sets. But we will often see the product principle applied to the same event repeated multiple times. Here are two examples.[🔗](#sec_counting-combine-outcomes-9-25)

#### Example 3.2.11.

Suppose you roll a 12-sided die seven times, recording the number that appears after each roll. How many sequences of seven rolls are possible?[🔗](#sec_counting-combine-outcomes-9-26-1-1) Solution. Each roll can result in 12 different outcomes, so by the product principle, the total number of sequences is \(12^7\text{.}\)[🔗](#sec_counting-combine-outcomes-9-26-2-1) [🔗](#sec_counting-combine-outcomes-9-26-2) [🔗](#sec_counting-combine-outcomes-9-26)

#### Example 3.2.12.

How many different pizzas can you make if you can choose from 10 toppings and you can have any number of toppings on your pizza?[🔗](#sec_counting-combine-outcomes-9-27-1-1) Solution. If we want to apply the product principle, we must think of the compound event of picking a pizza as the result of combining some number of individual events in every possible combination. What are those events? There are multiple answers to this question, but the following is the most useful.[🔗](#sec_counting-combine-outcomes-9-27-2-1) First, decide whether you want to include anchovies on your pizza or not. This event could result in two outcomes (yes or no to the anchovies). Second, decide whether you want black olives. Then Canadian bacon, then diced tomatoes, etc. Each event has two outcomes, and we must combine all ten of these outcomes to create a single outcome corresponding to a single pizza. Thus, by the product principle, there are \(2^{10}\) possible pizzas.[🔗](#sec_counting-combine-outcomes-9-27-2-2) By the way, another approach to this problem is to “code” each pizza as a bit-string, where a 1 means the topping is included and a 0 means it is not. Then the number of pizzas is the number of bit-strings of length 10. Each bit in the string has two possible values, so there are \(2^{10}\) 10-bit strings.[🔗](#sec_counting-combine-outcomes-9-27-2-3) [🔗](#sec_counting-combine-outcomes-9-27-2) [🔗](#sec_counting-combine-outcomes-9-27)Careful: “and” doesn’t mean “times.” For example, how many playing cards are both red and a face card? Not \(26 \cdot 12\text{.}\) The answer is 6, and we needed to know something about cards to answer that question.[🔗](#sec_counting-combine-outcomes-9-28)

#### Example 3.2.13. Counting functions.

How many functions \(f:\{1,2,3,4,5\} \to \{a,b,c,d\}\) are there?[🔗](#example-counting-functions-all-4-1) Solution. Remember that a function sends each element of the domain to exactly one element of the codomain. To determine a function, we just need to specify the image of each element in the domain. Where can we send 1? There are 4 choices. Where can we send 2? Again, 4 choices. What we have here is 5 “events” (picking the image of an element in the domain) each of which can happen in 4 ways (the choices for that image). Thus there are \(4 \cdot 4 \cdot 4 \cdot 4 \cdot 4 = 4^5\) functions.[🔗](#example-counting-functions-all-5-1) This is more than just an example of how we can use the product principle in a particular counting question. What we have here is a general interpretation of certain applications of the product principle using rigorously defined mathematical objects: functions. Whenever we have a counting question that asks for the number of outcomes of a repeated event, we can interpret that as asking for the number of functions from \(\{1,2,\ldots, n\}\) (where \(n\) is the number of times the event is repeated) to \(\{1,2,\ldots,k\}\) (where \(k\) is the number of ways that event can occur).[🔗](#example-counting-functions-all-5-2) [🔗](#example-counting-functions-all-5) [🔗](#example-counting-functions-all)[🔗](#sec_counting-combine-outcomes-9)

### Subsection Combining Principles

Let’s return to this section’s *Investigate!* question: How many ways can you select two cards from a standard deck of 52, so that the first one is a red card and the second one is a face card?[🔗](#subsec-sum-product-2) This looks a little like the product principle since the outcomes consist of pairs of cards. There are 26 red cards that are outcomes for the first event, and 12 face cards that are outcomes for the second event. However, the answer is not \(26 \cdot 12\text{.}\) The problem is that while there are 26 ways for the first card to be selected, it is not the case that *for each* of those, there are 12 ways to select the second card. If the first card was both red and a face card, then there would be only 11 choices for the second card.[🔗](#subsec-sum-product-3) In [Section 3.3](sec_counting-non-disjoint.html) we will explore some ways to adjust for counting problems when events are not disjoint, but we can solve our card problem now if we are careful. Think about the entire set of two-card outcomes. Can we split these outcomes into two disjoint sets (as to apply the sum principle) such that each set can be formed using the product principle?[🔗](#subsec-sum-product-4) Of all the outcomes, we first count those that start with a red, non-face card. Of the 26 red cards, there are 6 that are face cards, so there are 20 red, non-face cards. For each of these, there are 12 face cards that can be selected as the second card. By the product principle, the number of two-card outcomes starting with a red, non-face card is \(20 \cdot 12 = 240\text{.}\)[🔗](#subsec-sum-product-5) Now, what outcomes have we not yet counted? It is exactly the two-card outcomes that start with a red face card. There are 6 cards we could start with, and for each there are 11 choices for the second card. So the number of two-card outcomes starting with a red face card is \(6 \cdot 11 = 66\text{.}\)[🔗](#subsec-sum-product-6) Finally, apply the sum principle to these two disjoint sets of outcomes to see that the total number of two-card outcomes is \(240 + 66 = 306\text{.}\)[🔗](#subsec-sum-product-7) We conclude this section with two more examples of how you can use both the sum and product principles in a single counting problem.[🔗](#subsec-sum-product-8)

#### Example 3.2.14.

How many lattice paths from \((0,0)\) to \((9,9)\) pass through either \((2,6)\) or \((6,2)\text{?}\)[🔗](#subsec-sum-product-9-1-1) Solution. We are quite fortunate that no paths from \((0,0)\) to \((9,9)\) pass through both \((2,6)\) and \((6,2)\text{.}\) This means we can apply the sum principle to the two sets of outcomes: the paths that pass through \((2,6)\) and the paths that pass through \((6,2)\text{.}\) We will apply the product principle to determine the number of paths in each of these disjoint sets of outcomes.[🔗](#subsec-sum-product-9-2-1) The paths from \((0,0)\) to \((9,9)\) that pass through \((2,6)\) are each the concatenation of paths from \((0,0)\) to \((2,6)\) and paths from \((2,6)\) to \((9,9)\text{.}\) There are \(\binom{8}{2} = 28\) paths for the first part and \(\binom{10}{7} = 120\) paths for the second part, so applying the product principle gives us \(28 \cdot 120 = 3360\) paths that pass through \((2,6)\text{.}\)[🔗](#subsec-sum-product-9-2-2) The paths from \((0,0)\) to \((9,9)\) that pass through \((6,2)\) can similarly be calculated as \begin{equation*} \binom{8}{6} \cdot \binom{10}{3} = 28 \cdot 120 = 3360 \end{equation*} (and upon reflection, it is not surprising that the two numbers are the same, since each path that passes through \((2,6)\) can be reflected to create a path that passes through \((6,2)\)). [🔗](#subsec-sum-product-9-2-3) Thus, the total number of paths that pass through either \((2,6)\) or \((6,2)\) is \(3360 + 3360 = 6720\text{.}\)[🔗](#subsec-sum-product-9-2-4) [🔗](#subsec-sum-product-9-2) [🔗](#subsec-sum-product-9)

#### Example 3.2.15.

How many two-digit numbers, using only the digits \(\{1,2,3,4,5\}\) have the *sum* of their digits even?[🔗](#subsec-sum-product-10-1-1) Solution. First think about the set of outcomes. Some two-digit numbers that have the sum of their digits even are \(11, 13, 15, 22, 24, 31, \ldots\text{.}\) Okay, maybe it isn’t all that difficult to just list them all (and this would be a nice way to check our work). Let’s try to use the sum and product principles anyway.[🔗](#subsec-sum-product-10-2-1) What do we notice about all these numbers? It looks like both digits must be even or both digits must be odd, to make the sum even. We can consider these two cases, counting each case with the product principle.[🔗](#subsec-sum-product-10-2-2) Counting “odd-odd” numbers: three choices for the first digit and three choices for the second digit. So there are \(3 \cdot 3 = 9\) odd-odd numbers.[🔗](#subsec-sum-product-10-2-3) Counting “even-even” numbers: two choices for the first digit and two choices for the second digit. So there are \(2 \cdot 2 = 4\) even-even numbers.[🔗](#subsec-sum-product-10-2-4) Combined, there are \(9 + 4 = 13\) two-digit numbers with an even sum of digits.[🔗](#subsec-sum-product-10-2-5) [🔗](#subsec-sum-product-10-2) [🔗](#subsec-sum-product-10)[🔗](#subsec-sum-product)

### Reading Questions Reading Questions

#### 1.

How will you decide if you should add or multiply when combining numbers in a counting problem? Explain how you are currently thinking about this.[🔗](#rq-counting-addmult-vs-1-1) [🔗](#rq-counting-addmult-vs)

#### 2.

Your cousin is trying to solve a counting problem about how many different routes he can take between his dorm and his classroom. He has 9 routes that make sense, and similarly, there are 9 routes to go back from his classroom to his dorm.[🔗](#rq-counting-addmult-wrong-1-1) How many round trips are possible? Your cousin says 18, because after going from his dorm to the classroom, he has to add on a route back to the dorm. Is he right? Why or why not?[🔗](#rq-counting-addmult-wrong-1-2) [🔗](#rq-counting-addmult-wrong)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-counting-addmult-q-1-1) [🔗](#rq-counting-addmult-q)[🔗](#rqs-counting-addmult)

### Exercises Practice Problems

#### 1.

Activate Your wardrobe consists of 2 shirts, 4 pairs of pants, and 18 bow ties. How many different outfits can you make?[🔗](#extracted-webwork-91-1-1-1) You can make outfits.[🔗](#extracted-webwork-91-1-1-2) [🔗](#ww-addmult-outfits)

#### 2.

Activate For your college interview, you must wear a tie. You own 2 regular (boring) ties and 6 (cool) bow ties.

1. How many choices do you have for your neck-wear?[🔗](#extracted-webwork-92-1-1-1-1-1-1) [🔗](#extracted-webwork-92-1-1-1-1-1)
2. You realize that the interview is for clown college, so you should probably wear both a regular tie and a bow tie. How many choices do you have now?[🔗](#extracted-webwork-92-1-1-1-1-2-1) [🔗](#extracted-webwork-92-1-1-1-1-2)
3. For the rest of your outfit, you have 6 shirts, 5 skirts, 7 pants, and 8 dresses. You want to select either a shirt to wear with a skirt or pants, or just a dress. How many outfits do you have to choose from (not including the choice of ties)?[🔗](#extracted-webwork-92-1-1-1-1-3-1) [🔗](#extracted-webwork-92-1-1-1-1-3)

[🔗](#extracted-webwork-92-1-1-1) [🔗](#ww-addmult-ties)

#### 3.

Activate We usually write numbers in decimal form (or base 10), meaning numbers are composed using 10 different “digits” \(\{0,1,\ldots, 9\}\text{.}\) Sometimes though it is useful to write numbers hexadecimal or base 16. Now there are 16 distinct digits that can be used to form numbers: \(\{0, 1, \ldots, 9, \mathrm{A, B, C, D, E, F}\}\text{.}\) So for example, a 3 digit hexadecimal number might be 2B8.[🔗](#extracted-webwork-93-1-1-1)

1. How many 4-digit hexadecimals are there in which the first digit is E or F?[🔗](#extracted-webwork-93-1-1-2-1-1-1) [🔗](#extracted-webwork-93-1-1-2-1-1)
2. How many 6-digit hexadecimals start with a letter (A-F) and end with a numeral (0-9)?[🔗](#extracted-webwork-93-1-1-2-1-2-1) [🔗](#extracted-webwork-93-1-1-2-1-2)
3. How many 5-digit hexadecimals start with a letter (A-F) or end with a numeral (0-9) (or both)?[🔗](#extracted-webwork-93-1-1-2-1-3-1) [🔗](#extracted-webwork-93-1-1-2-1-3)

[🔗](#extracted-webwork-93-1-1-2) [🔗](#ww-addmult-hex)

#### 4.

Activate Let \(S = {\left\{1,2,3,4,5,6,7,8,9,10,11\right\}}\)

1. How many subsets are there total?[🔗](#extracted-webwork-94-1-1-1-2-1-1) [🔗](#extracted-webwork-94-1-1-1-2-1)
2. How many subsets have \(\{2,3,5\}\) as a subset?[🔗](#extracted-webwork-94-1-1-1-2-2-1) [🔗](#extracted-webwork-94-1-1-1-2-2)
3. How many subsets contain at least one odd number?[🔗](#extracted-webwork-94-1-1-1-2-3-1) [🔗](#extracted-webwork-94-1-1-1-2-3)
4. How many subsets contain exactly one even number?[🔗](#extracted-webwork-94-1-1-1-2-4-1) [🔗](#extracted-webwork-94-1-1-1-2-4)

[🔗](#extracted-webwork-94-1-1-1) [🔗](#ww-binom-subsets-all)

#### 5.

Activate Let \(S = {\left\{1,2,3,4,5,6,7,8\right\}}\text{.}\)

1. How many subsets are there of cardinality \(5\text{?}\)[🔗](#extracted-webwork-95-1-1-1-2-1-1) [🔗](#extracted-webwork-95-1-1-1-2-1)
2. How many subsets of cardinality \(5\) have \(>\{2,3,5\}\) as a subset?[🔗](#extracted-webwork-95-1-1-1-2-2-1) [🔗](#extracted-webwork-95-1-1-1-2-2)
3. How many subsets of cardinality \(5\) contain at least one odd number?[🔗](#extracted-webwork-95-1-1-1-2-3-1) [🔗](#extracted-webwork-95-1-1-1-2-3)
4. How many subsets of cardinality \(5\) contain exactly one even number?[🔗](#extracted-webwork-95-1-1-1-2-4-1) [🔗](#extracted-webwork-95-1-1-1-2-4)

[🔗](#extracted-webwork-95-1-1-1) [🔗](#ww-binom-subsets-card)

#### 6.

Activate Let \(A = {\left\{1,2,3,4,5,6,7\right\}}\text{.}\)[🔗](#extracted-webwork-96-1-1-1)

#### (a)

How many subsets of \(A\) are there?[🔗](#extracted-webwork-96-1-2-1-1) [🔗](#extracted-webwork-96-1-2)

#### (b)

How many subsets of \(A\) contain exactly \(5\) elements?[🔗](#extracted-webwork-96-1-3-1-1) [🔗](#extracted-webwork-96-1-3)

#### (c)

How many subsets of \(A\) contain only even numbers?[🔗](#extracted-webwork-96-1-4-1-1) [🔗](#extracted-webwork-96-1-4)

#### (d)

How many subsets of \(A\) contain an even number of elements?[🔗](#extracted-webwork-96-1-5-1-1) [🔗](#extracted-webwork-96-1-5) [🔗](#ww-binom-subsets-vs)

#### 7.

Activate You break your piggy-bank to discover lots of pennies and nickels. You start arranging these in rows of 12 coins.

1. You find yourself making rows containing an equal number of pennies and nickels. For fun, you decide to lay out every possible such row. How many coins will you need?[🔗](#extracted-webwork-97-1-1-1-1-1-1) [🔗](#extracted-webwork-97-1-1-1-1-1)
2. How many coins would you need to make all possible rows of 12 coins (not necessarily with equal number of pennies and nickels)?[🔗](#extracted-webwork-97-1-1-1-1-2-1) [🔗](#extracted-webwork-97-1-1-1-1-2)

[🔗](#extracted-webwork-97-1-1-1) [🔗](#ww-binom-coin-rows)

#### 8.

Activate How many 13-bit strings contain 4 or more 1’s?[🔗](#extracted-webwork-98-1-1-1) [🔗](#ww-binom-bitstrings-ormore)

#### 9.

Activate How many subsets of \(\{0,1,\ldots, 9\}\) have cardinality 8 or more?[🔗](#extracted-webwork-99-1-1-1) Hint. Break the question into 3 cases.[🔗](#extracted-webwork-99-1-2-1) [🔗](#extracted-webwork-99-1-2) [🔗](#ww-binom-subsets-ormore)

#### 10.

Activate How many shortest lattice paths start at \((1,1)\) and

1. end at \((12,12)\text{?}\)[🔗](#extracted-webwork-100-1-1-1-2-1-1) [🔗](#extracted-webwork-100-1-1-1-2-1)
2. end at \((12,12)\) and pass through \((6,7)\text{?}\)[🔗](#extracted-webwork-100-1-1-1-2-2-1) [🔗](#extracted-webwork-100-1-1-1-2-2)
3. end at \((12,12)\) and avoid \((6,7)\text{?}\)[🔗](#extracted-webwork-100-1-1-1-2-3-1) [🔗](#extracted-webwork-100-1-1-1-2-3)

[🔗](#extracted-webwork-100-1-1-1) [🔗](#ww-binom-lattice-paths)[🔗](#practice_counting-combine-outcomes)

### Exercises Additional Exercises

#### 1.

Your Blu-ray collection consists of 9 comedies and 7 horror movies. Give an example of a question for which the answer is:

1. 16.[🔗](#exercises_counting-combine-outcomes-2-1-1-1-1-1) [🔗](#exercises_counting-combine-outcomes-2-1-1-1-1)
2. 63.[🔗](#exercises_counting-combine-outcomes-2-1-1-1-2-1) [🔗](#exercises_counting-combine-outcomes-2-1-1-1-2)

[🔗](#exercises_counting-combine-outcomes-2-1-1) [🔗](#exercises_counting-combine-outcomes-2)

#### 2.

The number 735000 factors as \(2^3 \cdot 3 \cdot 5^4 \cdot 7^2\text{.}\) How many divisors does it have? Explain your answer using the multiplicative principle.[🔗](#exercises_counting-combine-outcomes-3-2-1) Hint. For a simpler example, there are 4 divisors of \(6 = 2\cdot 3\text{.}\) They are \(1 = 2^0\cdot 3^0\text{,}\) \(2 = 2^1\cdot 3^0\text{,}\) \(3 = 2^0\cdot 3^1\text{,}\) and \(6 = 2^1\cdot 3^1\text{.}\)[🔗](#exercises_counting-combine-outcomes-3-3-1) [🔗](#exercises_counting-combine-outcomes-3-3) [🔗](#exercises_counting-combine-outcomes-3)[🔗](#exercises_counting-combine-outcomes)[🔗](#sec_counting-combine-outcomes) [&#xe5cb;Prev](sec_counting-pascal.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_counting-non-disjoint.html) [Feedback](/cdn-cgi/l/email-protection#d2bda1b1b3a0fcbeb7a4bbbc92a7bcb1bdfcb7b6a7)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_counting-combine-outcomes-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_counting-combine-outcomes-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
