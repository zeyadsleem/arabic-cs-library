---
title: "Combinations and Permutations"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_counting-combperm.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.4 Combinations and Permutations

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_counting-combperm-4-1-1)

1. Correctly decide between using a combination or a permutation when solving a counting problem.[🔗](#sec_counting-combperm-4-2-1-1) [🔗](#sec_counting-combperm-4-2-1)
2. Apply the correct combination or permutation to solve a counting problem.[🔗](#sec_counting-combperm-4-2-2-1) [🔗](#sec_counting-combperm-4-2-2)
3. Explain the relationship between combinations and permutations and why their formulas are correct.[🔗](#sec_counting-combperm-4-2-3-1) [🔗](#sec_counting-combperm-4-2-3)

[🔗](#sec_counting-combperm-4)

### Subsection Section Preview

#### Investigate!

You have decided to decorate your magic wand with bands of different colored tape. You have 10 different colors to choose from, and you will use five of them to create five different stripes of color. How many different wand designs are possible?[🔗](#sec_counting-combperm-5-2-1-1) [🔗](#sec_counting-combperm-5-2)The [product principle](sec_counting-combine-outcomes.html#principle-product) gives us a way to count the number of outcomes when each outcome is made by combining smaller pieces. A typical example of this is to count the number of three-letter “words”; each outcome (word) we count is made up of a combination of three smaller pieces (letters). Since there are 26 choices for each smaller piece, there are \(26\cdot 26\cdot 26 = 26^3\) possible outcomes.[🔗](#sec_counting-combperm-5-3) The product principle does not require that each piece that is being combined be chosen from a set of the same size. We will use this observation to create a standard way to count outcomes when the pieces are chosen from a fixed set, but without allowing for any piece to be used more than once. For example, we can ask how many 3-letter words there are that contain distinct letters.[🔗](#sec_counting-combperm-5-4) These arrangements are called permutations. We will also consider another counting technique where we count combinations, which is related but counts something different. We will explore how these two counting techniques are related and how they can be used to solve a wide range of counting problems.[🔗](#sec_counting-combperm-5-5)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-counting-combperm)

You have a bunch of poker chips that come in five different colors: red, blue, green, purple, and yellow.[🔗](#PA-counting-combperm-2-1)

#### 1.

Activate How many two-chip stacks are possible where the bottom chip must be red or blue?[🔗](#extracted-webwork-112-1-1-1)

#### (a)

List all possible two-chip stacks. For example, the stack with a red chip on bottom and a green chip on top can be listed as “RG”.[🔗](#extracted-webwork-112-1-2-1-1) [🔗](#extracted-webwork-112-1-2)

#### (b)

Using the additive principle, we notice that there are stacks that have blue on the bottom, another stacks that have red on the bottom, so there are a total of possible stacks.[🔗](#extracted-webwork-112-1-3-1-1) [🔗](#extracted-webwork-112-1-3)

#### (c)

If we use the multiplicative principle, then there are choices for the bottom chip and choices for the top chip, so there are possible stacks.[🔗](#extracted-webwork-112-1-4-1-1) [🔗](#extracted-webwork-112-1-4) [🔗](#pa-counting-combperm-1)

#### 2.

Activate How many different three-chip stacks are possible if the bottom chip must be red or blue and the top chip must be green, purple, or yellow?[🔗](#extracted-webwork-113-1-1-1) Hint. How does this question relate to the previous question? Is there something we can do to the 10 two-chip stacks to make them into three-chip stacks?[🔗](#extracted-webwork-113-1-2-1) [🔗](#extracted-webwork-113-1-2) [🔗](#pa-counting-combperm-2)

#### 3.

Activate How many different three-chip stacks are there in which no color is repeated?[🔗](#extracted-webwork-114-1-1-1)

#### (a)

First, how many three-chip stacks with no repeated color have blue on the bottom and green in the middle?[🔗](#extracted-webwork-114-1-2-1-1) And how many three-chip stacks with no repeated color have blue on the bottom and yellow in the middle?[🔗](#extracted-webwork-114-1-2-1-2) In fact, for any stack with blue on the bottom and some other color in the middle, there are possible stacks.[🔗](#extracted-webwork-114-1-2-1-3) [🔗](#extracted-webwork-114-1-2)

#### (b)

If we insist that blue is on the bottom, how many choices do we have for the color of the middle chip?[🔗](#extracted-webwork-114-1-3-1-1) Combining this with the answer from the previous question, how many three-chip stacks with no repeated color have blue on the bottom?[🔗](#extracted-webwork-114-1-3-1-2) [🔗](#extracted-webwork-114-1-3)

#### (c)

Of course, we didn’t need to start with blue on the bottom. How many choices do we have for the color of the bottom chip?[🔗](#extracted-webwork-114-1-4-1-1) So how many three-chip stacks with no repeated color are there?[🔗](#extracted-webwork-114-1-4-1-2) [🔗](#extracted-webwork-114-1-4)

#### (d)

How many four-chip sticks are there with no repeated color?[🔗](#extracted-webwork-114-1-5-1-1) [🔗](#extracted-webwork-114-1-5) [🔗](#pa-counting-combperm-3)

#### 4.

Activate Suppose you wanted to take three chips with different colors and put them in your pocket.[🔗](#extracted-webwork-115-1-1-1)

#### (a)

One outcome is taking the blue, green, and purple chips. How many of the three-chip stacks of different color chips correspond to this single pocketful?[🔗](#extracted-webwork-115-1-2-1-1) Hint. With these three colors, how many choices do you have for which chip is on the bottom? In the middle? On top?[🔗](#extracted-webwork-115-1-2-2-1) [🔗](#extracted-webwork-115-1-2-2) [🔗](#extracted-webwork-115-1-2)

#### (b)

How many different stacks of chips would result in picking up the red, yellow, and green chips?[🔗](#extracted-webwork-115-1-3-1-1) [🔗](#extracted-webwork-115-1-3)

#### (c)

So of the possible three-chip stacks, we can group the chips into groups of size , where each group corresponds to the same pocketful of chips. How many different pocketfuls of chips are there?[🔗](#extracted-webwork-115-1-4-1-1) [🔗](#extracted-webwork-115-1-4)

#### (d)

How many different pocketfuls of chips are there if you take four chips?[🔗](#extracted-webwork-115-1-5-1-1) [🔗](#extracted-webwork-115-1-5) [🔗](#pa-counting-combperm-4)[🔗](#PA-counting-combperm)[🔗](#sec_counting-combperm-5)

### Subsection Counting Sequences

A permutation is a (possible) rearrangement of objects. For example, there are 6 permutations of the letters *a, b, c*: \begin{equation*} abc, ~~ acb, ~~ bac, ~~bca, ~~ cab, ~~ cba\text{.} \end{equation*} In terms of our discrete structures, each permutation is really a *sequence* or *tuple* of a fixed length. [🔗](#subsec-counting-sequences-2) We know that we have them all listed above —there are 3 choices for which letter we put first, then 2 choices for which letter comes next, which leaves only 1 choice for the last letter. The multiplicative principle says we multiply \(3\cdot 2 \cdot 1\text{.}\)[🔗](#subsec-counting-sequences-3)

#### Example 3.4.1.

How many sequences (permutations) are there of the letters *a, b, c, d, e, f*?[🔗](#subsec-counting-sequences-4-1-1) Solution. We do NOT want to try to list all of the length 6 sequences of these letters. However, if we did, we would need to pick a letter to write down first. There are 6 choices for that letter. For each choice of the first letter, there are 5 choices for the second letter (we cannot repeat the first letter; we are rearranging letters and only have one of each), and for each of those, there are 4 choices for the third, 3 choices for the fourth, 2 choices for the fifth, and finally only 1 choice for the last letter. So there are \(6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 720\) permutations of the 6 letters.[🔗](#subsec-counting-sequences-4-2-1) [🔗](#subsec-counting-sequences-4-2) [🔗](#subsec-counting-sequences-4)A piece of notation is helpful here: \(n!\text{,}\) read “\(n\) factorial”, is the product of all positive integers less than or equal to \(n\) (for reasons of convenience, we also define 0! to be 1). So the number of permutations of 6 letters, as seen in the previous example is \(6! = 6\cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1\text{.}\) This generalizes:[🔗](#subsec-counting-sequences-5)

#### Theorem 3.4.2. Permutations of \(n\) Elements.

There are \(n! = n\cdot (n-1)\cdot (n-2)\cdot \cdots \cdot 2\cdot 1\) permutations of \(n\) (distinct) elements.[🔗](#subsec-counting-sequences-6-3) [🔗](#subsec-counting-sequences-6)

#### Example 3.4.3. Counting Bijective Functions.

How many functions \(f:\{1,2,\ldots,8\} \to \{1,2,\ldots, 8\}\) are *bijective*?[🔗](#example-counting-functions-bijective-4-1) Solution. Remember what it means for a function to be bijective: Each element in the codomain must be the image of exactly one element of the domain. Using two-line notation, we could write one of these bijections as \begin{equation*} f = \twoline{1 \amp 2 \amp 3 \amp 4 \amp 5 \amp 6 \amp 7 \amp 8} {3 \amp 1 \amp 5 \amp 8 \amp 7 \amp 6 \amp 2 \amp 4}\text{.} \end{equation*} What we are really doing is just rearranging the elements of the codomain, so we are creating a permutation of 8 elements. In fact, “permutation” is another term used to describe bijective functions from a finite set to itself. [🔗](#example-counting-functions-bijective-5-1) If you believe this, then you see the answer must be \(8! = 8 \cdot 7 \cdot\cdots\cdot 1 = 40320\text{.}\) You can see this directly as well: For each element of the domain, we must pick a distinct element of the codomain to map to. There are 8 choices for where to send 1, then 7 choices for where to send 2, and so on. We multiply using the multiplicative principle.[🔗](#example-counting-functions-bijective-5-2) [🔗](#example-counting-functions-bijective-5) [🔗](#example-counting-functions-bijective)Sometimes we do not want to permute all of the letters/numbers/elements we are given.[🔗](#subsec-counting-sequences-8)

#### Example 3.4.4.

How many four-letter “words” can you make from the letters *a* through *g*, with no repeated letters?[🔗](#subsec-counting-sequences-9-3-1) Solution. This is just like the problem of permuting four letters, only now we have more choices for each letter. For the first letter, there are 7 choices. For each of those, there are 6 choices for the second letter. Then there are 5 choices for the third letter and 4 choices for the last letter. The total number of words is \(7\cdot 6\cdot 5 \cdot 4 = 840\text{.}\)[🔗](#subsec-counting-sequences-9-4-1) This is not \(7!\) because we never multiplied by 3, 2, or 1. We could write it using \(7!\) though, if we cancel the 3, 2, and 1. Thus we could write the answer as \begin{equation*} \frac{7!}{3!} = \frac{7\cdot 6\cdot 5\cdot 4 \cdot \cancel{3} \cdot \cancel{2} \cdot \cancel{1}}{\cancel{3} \cdot \cancel{2} \cdot \cancel{1}} = 7 \cdot 6 \cdot 5 \cdot 4\text{.} \end{equation*} [🔗](#subsec-counting-sequences-9-4-2) [🔗](#subsec-counting-sequences-9-4) [🔗](#subsec-counting-sequences-9) In general, we can ask how many permutations exist of \(k\) objects choosing those objects from a larger collection of \(n\) objects. (In the example above, \(k = 4\text{,}\) and \(n = 7\text{.}\)) We write this number \(P(n,k)\) and sometimes call it a \(k\)-permutation of \(n\) elements.[🔗](#subsec-counting-sequences-10) From the example above, we see that to compute \(P(n,k)\) we must apply the multiplicative principle to \(k\) numbers, starting with \(n\) and counting backwards. For example \begin{equation*} P(10, 4) = 10\cdot 9 \cdot 8 \cdot 7\text{.} \end{equation*} [🔗](#subsec-counting-sequences-11) Notice that \(P(10,4)\) starts out looking like \(10!\text{,}\) but we stop after 7. We can formally account for this “stopping” by dividing away the part of the factorial we do not want: \begin{equation*} P(10,4) = \frac{10\cdot 9 \cdot 8 \cdot 7 \cdot 6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1}{6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1} = \frac{10!}{6!}\text{.} \end{equation*} [🔗](#subsec-counting-sequences-12) Careful: The factorial in the denominator is not \(4!\) but rather \((10-4)!\text{.}\)[🔗](#subsec-counting-sequences-13)

#### Definition 3.4.5. \(k\)-permutations of \(n\) elements.

\(P(n,k)\) is the number of \(k\)-permutations of \(n\) elements, the number of ways to *arrange* \(k\) objects chosen from \(n\) distinct objects.[🔗](#subsec-counting-sequences-14-4-1) [🔗](#subsec-counting-sequences-14)

#### Theorem 3.4.6.

The number of \(k\)-permutations of \(n\) elements is \begin{equation*} P(n,k) = \frac{n!}{(n-k)!} = n(n-1)(n-2)\cdots (n-(k-1))\text{.} \end{equation*} [🔗](#thm-k-permutation-1-1) [🔗](#thm-k-permutation)Note that when \(n = k\text{,}\) we have \(P(n,n) = \frac{n!}{(n-n)!} = n!\) (since we defined \(0!\) to be 1). This makes sense —we already know \(n!\) gives the number of permutations of all \(n\) objects.[🔗](#subsec-counting-sequences-16)

#### Example 3.4.7. Counting injective functions.

How many functions \(f:\{1,2,3\} \to \{1,2,3,4,5,6,7,8\}\) are *injective*?[🔗](#example-counting-functions-injective-3-1) Solution. Note that it doesn’t make sense to ask for the number of *bijections* here, as there are none (because the codomain is larger than the domain, there are no surjections). But for a function to be injective, we just can’t use an element of the codomain more than once.[🔗](#example-counting-functions-injective-4-1) We need to pick an element from the codomain to be the image of 1. There are 8 choices. Then we need to pick one of the remaining 7 elements to be the image of 2. Finally, one of the remaining 6 elements must be the image of 3. So the total number of functions is \(8\cdot 7 \cdot 6 = P(8,3)\text{.}\)[🔗](#example-counting-functions-injective-4-2) What this demonstrates in general is that the number of injections \(f:A \to B\text{,}\) where \(\card{A} = k\) and \(\card{B} = n\text{,}\) is \(P(n,k)\text{.}\)[🔗](#example-counting-functions-injective-4-3) [🔗](#example-counting-functions-injective-4) [🔗](#example-counting-functions-injective)[🔗](#subsec-counting-sequences)

### Subsection Counting Sets

Let’s consider another way to count sequences: First count sets, then arrange them.[🔗](#subsec-combinations-2)

#### Example 3.4.8.

Your basketball team has 12 players. Assuming everyone can play every position, how many ways can you choose 5 players to be on the court at the same time?[🔗](#subsec-combinations-3-1-1) Solution. This question is actually too vague. Do we mean how many ways can we select five players? Or do we mean how many ways can we pick five players to fill the five positions? 2 I’m told the five positions are called point guard, shooting guard, small forward, power forward, and center. Who knew? Let’s answer both of these questions.[🔗](#subsec-combinations-3-2-1) First, if we just want to select five out of the 12 players, that is just like picking five out of 12 pizza toppings (although less delicious). We know that there are \(\binom{12}{5}\) ways to do this, and from [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large) we know that this is 792.[🔗](#subsec-combinations-3-2-2) On the other hand, if we wanted to pick five players for the five different positions,... well, we could start by picking one of the 792 different *sets* of five players, and then permute them into the five positions. Of the five players on the court, we pick one of the five to be the point guard, then one of the remaining four to be the shooting guard, and so on. This gives us \(5\cdot 4\cdot 3\cdot 2\cdot 1 = 5!\) ways to arrange the players. So the total number of ways to pick five players for the five positions is \begin{equation*} \binom{12}{5}\cdot 5! = 792\cdot 120 = 95,040\text{.} \end{equation*} [🔗](#subsec-combinations-3-2-3) Wait. We could have found that number directly. Without choosing the five players first, we have 12 choices for the point guard, then 11 choices for the shooting guard, and so on. So the total number of ways to pick five players for the five positions is simply the permutation \begin{equation*} P(12,5) = 12\cdot 11\cdot 10\cdot 9\cdot 8 = 95,040\text{.} \end{equation*} Thank goodness that is the same answer! [🔗](#subsec-combinations-3-2-4) [🔗](#subsec-combinations-3-2) [🔗](#subsec-combinations-3)The example above illustrates a second way to compute the number of \(k\)-permutations of \(n\) elements: First select which \(k\) elements will be in the permutation, then count how many ways there are to arrange them. Once you have selected the set of \(k\) objects, we know there are \(k!\) ways to arrange (permute) them. But how do you select \(k\) objects from the \(n\text{?}\) You have \(n\) objects, and you need to *choose* \(k\) of them. You can do that in \(\binom{n}{k}\) ways.[🔗](#subsec-combinations-4) Using the multiplicative principle to combine the two steps, we get another formula for \(P(n,k)\text{:}\) \begin{equation*} P(n,k) = \binom{n }{ k}\cdot k!\text{.} \end{equation*} [🔗](#subsec-combinations-5) This is HUGE![🔗](#subsec-combinations-6) We have a closed formula for \(P(n,k)\) already. We can substitute that in: \begin{equation*} \frac{n!}{(n-k)!} = \binom{n}{k} \cdot k!\text{.} \end{equation*} [🔗](#subsec-combinations-7) If we then divide both sides by \(k!\text{,}\) we get a closed formula for \(\binom{n}{k}\text{.}\)[🔗](#subsec-combinations-8)

#### Theorem 3.4.9. Closed Formula for \(\binom{n}{k}\).

\begin{equation*} \binom{n}{k} = \frac{n!}{(n-k)!k!} = \frac{n(n-1)(n-2)\cdots(n-(k-1))}{k(k-1)(k-2)\cdots 1}\text{.} \end{equation*} [🔗](#subsec-combinations-9-4) [🔗](#subsec-combinations-9) Another name for the collections of things that \(\binom{n}{k}\) counts is combinations. We say that \(\binom{n}{k}\) counts the number of \(k\)-element combinations of \(n\) elements. Sometimes we even use the notation \(C(n,k)\) instead of \(\binom{n}{k}\text{.}\)[🔗](#subsec-combinations-10) Clearly combinations and permutations are very closely related. The formulas to count each are very similar; there is just an extra \(k!\) in the denominator of \(\binom{n}{k}\text{.}\) That extra \(k!\) accounts for the fact that \(\binom{n}{k}\) does not distinguish between the different orders that the \(k\) objects can appear in. We are just selecting (or choosing) the \(k\) objects, not arranging them.[🔗](#subsec-combinations-11)

#### Example 3.4.10.

You decide to have a dinner party. Even though you are incredibly popular and have 14 different friends, you only have enough chairs to invite 6 of them.[🔗](#subsec-combinations-12-3-1)

1. How many choices do you have for which 6 friends to invite?[🔗](#subsec-combinations-12-3-2-1-1-1) [🔗](#subsec-combinations-12-3-2-1-1)
2. What if you need to decide not only which friends to invite but also where to seat them along your long table? How many choices do you have then?[🔗](#subsec-combinations-12-3-2-1-2-1) [🔗](#subsec-combinations-12-3-2-1-2)

[🔗](#subsec-combinations-12-3-2) Solution.

1. You must simply choose 6 friends from a group of 14. This can be done in \(\binom{14}{6}\) ways. We can find this number either by using Pascal’s triangle or the closed formula: \(\frac{14!}{8!\cdot 6!} = 3003\text{.}\)[🔗](#subsec-combinations-12-4-1-1-1-1) [🔗](#subsec-combinations-12-4-1-1-1)
2. Here you must count all the ways you can permute 6 friends chosen from a group of 14. So the answer is \(P(14, 6)\text{,}\) which can be calculated as \(\frac{14!}{8!} = 2162160\text{.}\)[🔗](#subsec-combinations-12-4-1-1-2-1) Notice that we can think of this counting problem as a question about counting functions: How many injective functions are there from your set of 6 chairs to your set of 14 friends (the functions are injective because you can’t have a single chair go to two of your friends).[🔗](#subsec-combinations-12-4-1-1-2-2) [🔗](#subsec-combinations-12-4-1-1-2)

[🔗](#subsec-combinations-12-4-1) How are these numbers related? Notice that \(P(14,6)\) is *much* larger than \(\binom{14}{6}\text{.}\) This makes sense. \(\binom{14}{6}\) picks 6 friends, but \(P(14,6)\) arranges the 6 friends as well as picks them. In fact, we can say exactly how much larger \(P(14,6)\) is. In both counting problems we choose 6 out of 14 friends. For the first one, we stop there, at 3003 ways. But for the second counting problem, each of those 3003 choices of 6 friends can be arranged in exactly \(6!\) ways. So now we have \(3003\cdot 6!\) choices and that is exactly \(2162160\text{.}\)[🔗](#subsec-combinations-12-4-2) Alternatively, look at the first problem another way. We want to select 6 out of 14 friends, but we do not care about the order they are selected in. To select 6 out of 14 friends, we might try this: \begin{equation*} 14 \cdot 13 \cdot 12 \cdot 11 \cdot 10 \cdot 9 \text{.} \end{equation*} [🔗](#subsec-combinations-12-4-3) This is a reasonable guess, since we have 14 choices for the first guest, then 13 for the second, and so on. But the guess is wrong (in fact, that product is exactly \(2162160 = P(14,6)\)). It distinguishes between the different orders in which we could invite the guests. To correct for this, we could divide by the number of different arrangements of the 6 guests (so that all of these would count as just one outcome). There are precisely \(6!\) ways to arrange 6 guests, so the correct answer to the first question is \begin{equation*} \frac{14 \cdot 13 \cdot 12 \cdot 11\cdot 10 \cdot 9}{6!} \text{.} \end{equation*} [🔗](#subsec-combinations-12-4-4) Note that another way to write this is \begin{equation*} \frac{14!}{8!\cdot 6!}\text{.} \end{equation*} which is what we had originally. [🔗](#subsec-combinations-12-4-5) [🔗](#subsec-combinations-12-4) [🔗](#subsec-combinations-12)Perhaps “combination” is a misleading label. We don’t mean it like a combination lock (where the order would definitely matter). Perhaps a better metaphor is a combination of flavors — you just need to decide which flavors to combine, not the order in which to combine them.[🔗](#subsec-combinations-13) So how do you know when to use a combination and when to use a permutation?[🔗](#subsec-combinations-14)

#### Does order matter?

Almost every source you look at about combinations and permutations will make some variation of the following claim.[🔗](#subsec-combinations-15-2)

> Use a permutation when the order matters, and use a combination when the order does not matter.[🔗](#subsec-combinations-15-3-1)
> > [🔗](#subsec-combinations-15-3)

What does this even mean? And why is it an absolutely awful way to distinguish between the two counting techniques? Let’s explore with an example.[🔗](#subsec-combinations-15-4) Suppose you are proposing a new lottery game. In the game, five numbered balls will be randomly shot out of the machine that holds balls numbered 1 to 50. If a player correctly picks the five numbers that come out, they win the jackpot.[🔗](#subsec-combinations-15-5) Of course, we want to know the odds of winning this lottery game, which requires us to know how many different outcomes there are. The balls fly out of the machine randomly, so one result might be to get the balls \begin{equation*} 26, 5, 42, 17, 33\text{.} \end{equation*} If you were holding the ticket that had numbers \(5, 17, 26, 33, 47\text{,}\) do you expect to have won? Most lottery games would say you have, since you have the same numbers, just in a different order. [🔗](#subsec-combinations-15-6) In this sense, the *order* of the numbers does not matter. A better way to say this is that *any* order of the same numbers is considered the same outcome, and is counted only once. So really, we are counting the *sets* of five numbers, not the *sequences* of five numbers. Each outcome is a combination, so the number of outcomes should be \(C(52,5) = \binom{52}{5}\text{.}\)[🔗](#subsec-combinations-15-7) On the other hand, if we must pick the numbers in the same order they come out of the machine, then we are really matching a sequence of numbers to a sequence of numbers. The number of sequences is \(P(52,5)\text{.}\) In this case, we would say that the order matters.[🔗](#subsec-combinations-15-8) Okay, so far so good. But what about the following example?[🔗](#subsec-combinations-15-9)

#### Example 3.4.11.

How many three letter “words” are there in which

1. the letters appear in alphabetical order?[🔗](#subsec-combinations-15-10-1-1-2-1-1) [🔗](#subsec-combinations-15-10-1-1-2-1)
2. the letters in the word can come in any order?[🔗](#subsec-combinations-15-10-1-1-2-2-1) [🔗](#subsec-combinations-15-10-1-1-2-2)

[🔗](#subsec-combinations-15-10-1-1) Solution. Does “order matter” for the first question? In some sense, absolutely! We only want to count words where the letters are in the correct order. But from the standard combination/permutation sense of order mattering, it does not.[🔗](#subsec-combinations-15-10-2-1) Much better would be to ask ourselves whether we should represent each outcome as a set of letters or a sequence of letters. It is true that words are a sequence of letters, but are we counting all possible sequences? Nope, just one sequence for each set of letters. Ah, yes, set of letters. Each outcome corresponds exactly to one set of three letters. We are counting sets, so we count combinations. The number of outcomes is \(C(26,3) = \binom{26}{3}\text{.}\)[🔗](#subsec-combinations-15-10-2-2) For the second question, it might look like the order shouldn’t matter. Well, it doesn’t matter to the machine spitting out the letters, but it would matter if we were trying to match the letters. No, let’s think about it like this: Are we counting every possible sequence of letters? Yes! So these are permutations, and the number of outcomes is \(P(26,3)\text{.}\)[🔗](#subsec-combinations-15-10-2-3) [🔗](#subsec-combinations-15-10-2) [🔗](#subsec-combinations-15-10) Another deceptive use of order appears when counting bit strings. Recall that an \(n\)-bit string of weight \(k\) is a string of \(n\) bits (0s and 1s) in which \(k\) of the bits are 1s. For example, the 4-bit strings of weight 2 are \begin{equation*} 1100, ~~ 1010, ~~ 1001, ~~ 0110, ~~ 0101, ~~ 0011\text{.} \end{equation*} Does order matter for bit strings? Of course it does! It is the only thing that matters. All of the strings above contain exactly the same number of 0s and 1s; they are only distinguished by the order of the bits. [🔗](#subsec-combinations-15-11) And yet, the number of \(n\)-bit strings of weight \(k\) is \(\binom{n}{k}\) and NOT a permutation. What is going on here?[🔗](#subsec-combinations-15-12) Nothing is broken; we are just not thinking about the right objects about which to consider the order. When we *choose* \(k\) out of \(n\) things for a bit string, it is the *positions* we are choosing (to fill with 1s, say). It does not matter in what order we choose those positions, just what set of positions we choose. That is, the bit string 1001 is the result of choosing positions 1 and 4 to put 1s into. If we chose positions 4 and then 1, we would get the same bit string.[🔗](#subsec-combinations-15-13) To summarize, the question of whether order matters can lead us astray when deciding between a combination and a permutation. Instead, we should decide whether the outcomes we are counting are sets or sequences. If we are counting sets, think combination. If we are counting sequences, think permutation.[🔗](#subsec-combinations-15-14) [🔗](#subsec-combinations-15)[🔗](#subsec-combinations)

### Subsection The Quotient Principle

We have two ways to write the numerical relationship between the numbers of combinations and permutations. Using the product principle, we have, \begin{equation*} P(n,k) = \binom{n}{k} \cdot k! \end{equation*} which can be rewritten as, \begin{equation*} \binom{n}{k} = \frac{P(n,k)}{k!}\text{.} \end{equation*} This second formula suggests that there might be a *quotient principle* that we could use to justify it. [🔗](#subsec-quotient-principle-2) Let’s think about what division means. One way to think of the division problem \(24 \div 6 = 4\text{,}\) for example, is saying that if you have 24 things that you divide into groups of size 6, the number of groups will be 4. 3 The other way to interpret this statement is that if you divide 24 things into six groups, then each group will have size 4, but this is less useful for what we will do.[🔗](#subsec-quotient-principle-3) Now let’s look at all the 3-permutations of a set of size 4: For example, all the ways to make 3-letter words using the letters \(a, b, c, d\text{.}\) We know the number of such words is \(P(4,3) = 4\cdot 3 \cdot 2 = 24\text{.}\) It is helpful to actually list all these out.[🔗](#subsec-quotient-principle-4)

| \(abc\) | \(acb\) | \(bac\) | \(bca\) | \(cab\) | \(cba\) |
| --- | --- | --- | --- | --- | --- |
| \(abd\) | \(adb\) | \(bad\) | \(bda\) | \(dab\) | \(dba\) |
| \(acd\) | \(adc\) | \(cad\) | \(cda\) | \(dac\) | \(dca\) |
| \(bcd\) | \(bdc\) | \(cbd\) | \(cdb\) | \(dbc\) | \(dcb\) |

Look at the first row. What do all these permutations have in common? These are exactly the permutations that use the letters \(a, b, c\) in different orders. It is not surprising that there are 6 of these, since the number of ways to arrange three elements is \(3! = 6\text{.}\) Similarly, the second row has 6 permutations that use the letters \(a, b, d\) in different orders, and so on.[🔗](#subsec-quotient-principle-6) The point is, if we wanted to just count how many *sets* of three of the four letters we have, each set corresponds exactly to one of the rows in the table. There are 24 elements in the table, and 6 elements in each row, so there must be \(24 \div 6 = 4\) rows. And of course, we are not surprised because \(\binom{4}{3} = 4\text{.}\)[🔗](#subsec-quotient-principle-7) A more mathematically rigorous explanation for this phenomenon is to use the language of equivalence relations and partitions from [Section 2.6](sec_gt-relations.html). We start with permutations, and then we define an *equivalence relation* on the permutations by saying two permutations are equivalent provided they contain exactly the same elements. From the equivalence relation we get a *partition* of our set of permutations into *equivalence classes*. The combinations we want to count are precisely the equivalence classes. Since each equivalence class has the same size, we can find the number of classes by dividing the number of permutations by the size of each class.[🔗](#subsec-quotient-principle-8) This sort of quotient principle is also useful for solving questions where the answer isn’t obviously either a permutation or combination.[🔗](#subsec-quotient-principle-9)

#### Example 3.4.12.

You have decided to decorate your magic wand with bands of different colored tape. You have 10 different colors to choose from, and you will use five of them to create five different stripes of color. How many different wand designs are possible?[🔗](#subsec-quotient-principle-10-1-1) Solution. Our first attempt to solve this problem might be to think of each outcome we are trying to count as a 5-permutation of 10 colors. That would give us an answer of \(P(10,5) = 10\cdot 9\cdot 8\cdot 7\cdot 6 = 30,240\text{.}\) So why is this not correct? Let’s start making a list of the outcomes that are possible.

1. Red, blue, green, yellow, orange.[🔗](#subsec-quotient-principle-10-2-1-2-1-1) [🔗](#subsec-quotient-principle-10-2-1-2-1)
2. Red, blue, green, yellow, purple.[🔗](#subsec-quotient-principle-10-2-1-2-2-1) [🔗](#subsec-quotient-principle-10-2-1-2-2)
3. Blue, green, red, yellow, orange.[🔗](#subsec-quotient-principle-10-2-1-2-3-1) [🔗](#subsec-quotient-principle-10-2-1-2-3)
4. Orange, yellow, green, blue, red.[🔗](#subsec-quotient-principle-10-2-1-2-4-1) [🔗](#subsec-quotient-principle-10-2-1-2-4)
5. etc.[🔗](#subsec-quotient-principle-10-2-1-2-5-1) [🔗](#subsec-quotient-principle-10-2-1-2-5)

While starting this list, perhaps we asked ourselves whether red, red, blue, blue, red should be on the list, and recognized that it shouldn’t. Another thing we might have considered is whether items 1 and 3 are really different. They are, since one wand has red as an outside color while the other one does not. [🔗](#subsec-quotient-principle-10-2-1) But what about items 1 and 4? They have the same five colors, but in a different order. However, if you were to spin the magic wand around, like magicians are apt to do, you could easily end up with wand 4 from wand 1. Aha! We see that each wand is counted exactly twice in our list of permutations: two permutations are equivalent if they are just the *reverse* of each other.[🔗](#subsec-quotient-principle-10-2-2) Since we can group the permutations into groups of size 2, and each group corresponds to a single wand, we see that the correct answer is, \begin{equation*} \frac{P(10,5)}{2} = \frac{10\cdot 9\cdot 8\cdot 7\cdot 6}{2} = 15,120\text{.} \end{equation*} Tada! [🔗](#subsec-quotient-principle-10-2-3) [🔗](#subsec-quotient-principle-10-2) [🔗](#subsec-quotient-principle-10)[🔗](#subsec-quotient-principle)

### Reading Questions Reading Questions

#### 1.

True or false: The number of sequences of two distinct digits from 0-9 is *twice* the number of sets of two distinct digits from 0-9. Briefly explain.[🔗](#rq-counting-combperm-2-1-1) [🔗](#rq-counting-combperm-2)

#### 2.

True or false: The number of sequences of three distinct digits from 0-9 is *3 times* the number of sets of three distinct digits from 0-9. Briefly explain.[🔗](#rq-counting-combperm-3-1-1) [🔗](#rq-counting-combperm-3)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-counting-combperm-q-1-1) [🔗](#rq-counting-combperm-q)[🔗](#rqs-counting-combperm)

### Exercises Practice Problems

#### 1.

Activate A pizza parlor offers 8 toppings.

1. How many 4-topping pizzas could they put on their menu? Assume double toppings are not allowed.[🔗](#extracted-webwork-116-1-1-1-1-1-1) [🔗](#extracted-webwork-116-1-1-1-1-1)
2. How many total pizzas are possible, with between zero and 8 toppings (but not double toppings) allowed?[🔗](#extracted-webwork-116-1-1-1-1-2-1) [🔗](#extracted-webwork-116-1-1-1-1-2)
3. The pizza parlor will list the 8 toppings in two equal-sized columns on their menu. How many ways can they arrange the toppings in the left column?[🔗](#extracted-webwork-116-1-1-1-1-3-1) [🔗](#extracted-webwork-116-1-1-1-1-3)

[🔗](#extracted-webwork-116-1-1-1) [🔗](#ww-cvp-pizza)

#### 2.

Activate A combination lock consists of a dial with 45 numbers on it. To open the lock, you turn the dial to the right until you reach the first number, then to the left until you get to the second number, then to the right again to the third number. The numbers must be distinct. How many different combinations are possible?[🔗](#extracted-webwork-117-1-1-1) [🔗](#ww-cvp-lock)

#### 3.

Activate Using the digits 2 through 9, find the number of different 3-digit numbers such that:

1. Digits can be used more than once.[🔗](#extracted-webwork-118-1-1-1-1-1-1) [🔗](#extracted-webwork-118-1-1-1-1-1)
2. Digits cannot be repeated, but can come in any order.[🔗](#extracted-webwork-118-1-1-1-1-2-1) [🔗](#extracted-webwork-118-1-1-1-1-2)
3. Digits cannot be repeated and must be written in increasing order.[🔗](#extracted-webwork-118-1-1-1-1-3-1) [🔗](#extracted-webwork-118-1-1-1-1-3)

[🔗](#extracted-webwork-118-1-1-1) [🔗](#ww-cvp-digits)

#### 4.

Activate In an attempt to clean up your room, you have purchased a new floating shelf to put some of your 18 books you have stacked in a corner. These books are all by different authors. The new book shelf is large enough to hold 14 of the books. Careful: Before answering the next two questions, ask yourself which answer should be larger.

1. How many ways can you select and arrange 14 of the 18 books on the shelf? Notice that here we will allow the books to end up in any order.[🔗](#extracted-webwork-119-1-1-1-1-1-1) [🔗](#extracted-webwork-119-1-1-1-1-1)
2. How many ways can you arrange 14 of the 18 books on the shelf if you insist they must be arranged alphabetically by author?[🔗](#extracted-webwork-119-1-1-1-1-2-1) [🔗](#extracted-webwork-119-1-1-1-1-2)

[🔗](#extracted-webwork-119-1-1-1) [🔗](#ww-cvp-books)

#### 5.

Activate An *anagram* of a word is just a rearrangement of its letters. How many different anagrams of “troublemakings” are there?[🔗](#extracted-webwork-120-1-1-1) [🔗](#ww-cvp-anagrams-unique)

#### 6.

Activate How many anagrams are there of the word “voodoo” that start with the letter “v”?[🔗](#extracted-webwork-121-1-1-1) [🔗](#ww-cvp-anagrams-two)

#### 7.

Activate How many anagrams are there of “academia”?[🔗](#extracted-webwork-122-1-1-1) [🔗](#ww-cvp-anagrams-one-rep)

#### 8.

Activate On a business retreat, your company of 24 businessmen and businesswomen goes golfing.

1. You need to divide up into foursomes (groups of 4 people): a first foursome, a second foursome, and so on. How many ways can you do this?[🔗](#extracted-webwork-123-1-1-1-1-1-1) [🔗](#extracted-webwork-123-1-1-1-1-1)
2. After all your hard work, you realize that in fact, you want each foursome to include one of the 6 Board members (who are among the 24 golfers already). How many ways can you do this?[🔗](#extracted-webwork-123-1-1-1-1-2-1) [🔗](#extracted-webwork-123-1-1-1-1-2)

[🔗](#extracted-webwork-123-1-1-1) [🔗](#ww-cvp-golf)

#### 9.

Activate How many different seating arrangements are possible for King Arthur and his 16 knights around their round table?[🔗](#extracted-webwork-124-1-1-1) [🔗](#ww-cvp-round-table)

#### 10.

Activate Consider sets \(A\) and \(B\) with \(|A| = 14\) and \(|B| = 21\text{.}\)

1. How many functions \(f: A \to B\) are there?[🔗](#extracted-webwork-125-1-1-1-5-1-1) [🔗](#extracted-webwork-125-1-1-1-5-1)
2. How many functions \(f: A \to B\) are injective?[🔗](#extracted-webwork-125-1-1-1-5-2-1) [🔗](#extracted-webwork-125-1-1-1-5-2)

[🔗](#extracted-webwork-125-1-1-1) [🔗](#ww-cvp-functions)

#### 11.

Activate Consider functions \(f: {\left\{1,2,3,4,5,6\right\}}\to {\left\{1,2,3,4,5,6,7\right\}}\text{.}\)

1. How many functions are there total?[🔗](#extracted-webwork-126-1-1-1-2-1-1) [🔗](#extracted-webwork-126-1-1-1-2-1)
2. How many functions are injective?[🔗](#extracted-webwork-126-1-1-1-2-2-1) [🔗](#extracted-webwork-126-1-1-1-2-2)
3. How many of the injective functions are *increasing*? To be increasing means that if \(\renewcommand{\v}{\vtx{above}{}}a \lt b\) then \(\renewcommand{\v}{\vtx{above}{}}f(a) \lt f(b)\text{,}\) or in other words, the outputs get larger as the inputs get larger.[🔗](#extracted-webwork-126-1-1-1-2-3-1) [🔗](#extracted-webwork-126-1-1-1-2-3)

[🔗](#extracted-webwork-126-1-1-1) [🔗](#ww-cvp-functions-inc)[🔗](#practice_counting-combperm)

### Exercises Additional Exercises

#### 1.

How many triangles are there with vertices from the points shown below? Note that we are not allowing degenerate triangles – ones with all three vertices on the same line – but we do allow non-right triangles. Explain why your answer is correct.[🔗](#exercises_counting-combperm-2-1-1) ![Five equally spaced dots in a vertical line and six additional equally spaced dots extending to the right in a horizontal line from the lowest dot (forming a right angle).](generated/latex-image/triangle-dots.svg) Hint. If you pick any three points, you can get a triangle, unless those three points are all on the \(x\)-axis or on the \(y\)-axis. There are other ways to start this as well, and any correct method should give the same answer.[🔗](#exercises_counting-combperm-2-2-1) [🔗](#exercises_counting-combperm-2-2) [🔗](#exercises_counting-combperm-2)

#### 2.

We have seen that the formula for \(P(n,k)\) is \(\dfrac{n!}{(n-k)!}\text{.}\) Your task here is to explain *why* this is the right formula.

1. Suppose you have 12 chips, each a different color. How many different stacks of 5 chips can you make? Explain your answer and why it is the same as using the formula for \(P(12,5)\text{.}\)[🔗](#exercises_counting-combperm-3-1-1-4-1-1) [🔗](#exercises_counting-combperm-3-1-1-4-1)
2. Using the scenario of the 12 chips again, what does \(12!\) count? What does \(7!\) count? Explain.[🔗](#exercises_counting-combperm-3-1-1-4-2-1) [🔗](#exercises_counting-combperm-3-1-1-4-2)
3. Explain why it makes sense to divide \(12!\) by \(7!\) when computing \(P(12,5)\) (in terms of the chips).[🔗](#exercises_counting-combperm-3-1-1-4-3-1) [🔗](#exercises_counting-combperm-3-1-1-4-3)
4. Does your explanation work for numbers other than 12 and 5? Explain the formula \(P(n,k) = \frac{n!}{(n-k)!}\) using the variables \(n\) and \(k\text{.}\)[🔗](#exercises_counting-combperm-3-1-1-4-4-1) [🔗](#exercises_counting-combperm-3-1-1-4-4)

[🔗](#exercises_counting-combperm-3-1-1) [🔗](#exercises_counting-combperm-3)[🔗](#exercises_counting-combperm)[🔗](#sec_counting-combperm) [&#xe5cb;Prev](sec_counting-non-disjoint.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_counting-multisets.html) [Feedback](/cdn-cgi/l/email-protection#167965757764387a73607f78566378757938737263)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_counting-combperm-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_counting-combperm-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
