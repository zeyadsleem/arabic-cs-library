---
title: "Counting"
lang: en
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.1 Pascal’s Arithmetical Triangle

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_counting-pascal-2-1-1)

1. Use Pascal’s triangle to answer counting questions about lattice paths, bit strings, and subsets.[🔗](#sec_counting-pascal-2-2-1-1) [🔗](#sec_counting-pascal-2-2-1)
2. Explain how Pascal’s triangle is generated and how it relates to counting questions.[🔗](#sec_counting-pascal-2-2-2-1) [🔗](#sec_counting-pascal-2-2-2)
3. Explain why Pascal’s triangle is related to so many different types of counting problems.[🔗](#sec_counting-pascal-2-2-3-1) [🔗](#sec_counting-pascal-2-2-3)

[🔗](#sec_counting-pascal-2)

### Subsection Section Preview

#### Investigate!

In chess, a rook can move only in straight lines (not diagonally). How many ways can the rook in the top-left corner travel to the bottom-right corner of the board, moving only down and to the right?[🔗](#sec_counting-pascal-4-2-3-1) ![An 8x8 checkerboard containing an image of a rook chess piece in the top left corner.](generated/latex-image/rook-chessboard.svg) &#xe88e;An 8x8 checkerboard containing an image of a rook chess piece in the top left corner. The square in the third row, third column contains the number 6.[🔗](#chessboard-2-1) Also, what does this have to do with counting how many pizzas you can order if you use half of the 14 available toppings?[🔗](#sec_counting-pascal-4-2-3-3) [🔗](#sec_counting-pascal-4-2)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-counting-pascal)

Let’s find some of the numbers of paths that the rook can take to get to various squares in the chessboard.[🔗](#PA-counting-pascal-2-1)

#### 1. Six paths.

Activate The 6 in the square in the 3rd row and column represents that there are 6 different paths to that square, even though there are only four squares the rook must move through to get there. One path is DDRR (down down right right). List all 6 paths.[🔗](#extracted-pa-test-1-1-1) [🔗](#pa-counting-pascal-1)

#### 2. Paths through (4, 2).

Activate How many paths are there to the square in row 4, column 2 (diagonally down and to the left of the 6)? List out all the paths as D/R strings.[🔗](#extracted-webwork-76-1-1-1) How many paths is this? That is, what number goes in that square of the chessboard?[🔗](#extracted-webwork-76-1-1-2) [🔗](#pa-counting-pascal-2)

#### 3. Paths through (4, 3).

Activate Now let’s find the paths to the square in row 4, column 3 (directly below the 6).[🔗](#extracted-webwork-77-1-1-1) First, list all the paths that end with an R.[🔗](#extracted-webwork-77-1-1-2) Next, list all the paths that end with a D.[🔗](#extracted-webwork-77-1-1-3) Are there any other paths? In total, how many paths are there to this square?[🔗](#extracted-webwork-77-1-1-4) [🔗](#pa-counting-pascal-3)

#### 4. Counting all paths.

Activate Continue filling in the chessboard, either counting D/R strings directly or using your observation from the previous task. What is the number in the lower right corner of the chessboard?[🔗](#extracted-webwork-78-1-1-1) [🔗](#pa-counting-pascal-4)[🔗](#PA-counting-pascal)In 1653, Blaise Pascal, concerned with questions that would lay the foundation of probability theory, collected several facts about a triangular array of numbers in his Treatise on Arithmetical Triangle. This arrangement of numbers appeared as early as the 10th century in China, India, and Persia. The Chinese and Persian treatment of the triangle was in service of what we would now consider algebra: finding \(n\)th roots, essentially solving polynomial equations. The numbers in the triangle appear as solutions to counting problems in Indian texts: from six *tastes*, how many combinations of one, or two, or three,... can you make? European mathematicians in the 14th century presented the triangle as a table of figurate numbers (numbers that can be arranged in a geometric shape), which were themselves the centerpiece of the work of Pythagoras and his followers.[🔗](#sec_counting-pascal-4-5) So what is this remarkable triangle that holds the secrets of so many different mathematical problems? Behold, Pascal’s triangle:[🔗](#sec_counting-pascal-4-6) ![The first 17 rows of Pascal’s triangle.](generated/latex-image/pascal-large.svg) &#xe88e;The first 17 rows of Pascal’s triangle. A triangular array of hexagons, each row containing one more hexagon that the row above it. In each hexagon is an integer: 1’s on the border of the triangle, and every integer inside the triangle the sum of the two integers above it.[🔗](#pascal-large-3-1) Figure 3.1.1. Pascal’s triangle.[🔗](#fig-pascal-large)Spend some time gazing at the beauty of this triangle. What do you notice? What do you wonder? Look specifically at the 5th row (we call the 1 on the top row 0, so row 5 is 1, 5, 10, 10, 5, 1). How do the numbers in this row relate to the numbers above them? Notice that \(5 = 1+4\) and \(10 = 4+6\text{.}\) Does this occur anywhere else in the triangle?[🔗](#sec_counting-pascal-4-8) Indeed, every number in the triangle is the *sum of the two numbers above it*. Let’s take this as our *definition* of Pascal’s triangle. We can then generate as many rows of the triangle as we like. It is this additive definition that was used in China and Persia to find \(n\)th roots, and we will briefly mention this use at the end of this section. However, we are interested in counting questions, so our main goal now is to observe how the numbers of Pascal’s triangle are answers to a variety of counting questions.[🔗](#sec_counting-pascal-4-9) Here are some apparently different discrete objects we can count: lattice paths, bit strings, subsets, and pizzas. We will give an example of each type of counting problem (and say what these things even are). As we will see, the numbers in Pascal’s triangle are the answers to all of these questions.[🔗](#sec_counting-pascal-4-10) Before we jump in, a little bit of notation. Let’s give each number in Pascal’s triangle a name, based on its position. Think of each number as being in a row and a column: rows are counted down, starting at 0, and columns are counted in from the left, also starting at 0. The entry in row \(n\) and column \(k\) will be denoted \(\binom{n}{k}\text{.}\) For example, the \(\binom{6}{3} = 20\text{,}\) since that is the value in row 6, column 3. For reasons that will become clear soon, we pronounce \(\binom{n}{k}\) as “\(n\) choose \(k\text{.}\)” We can rewrite the triangle with these names:[🔗](#sec_counting-pascal-4-11) ![Triangular array of binomial coefficients. Each lower row extends equally on both sides beyond the row above. Top row contains 0 choose 0. Second row contains 1 choose 0 and 1 choose 1 (from left to right). Third row contains 2 choose 0, 2 choose 1, and 2 choose 2. Below that the row contains 3 choose 0, 3 choose 1, 3 choose 2, and 3 choose 3. The bottom row contains 4 choose 0 through 4 choose 4.](generated/latex-image/pascal-nCk.svg) [🔗](#sec_counting-pascal-4)

### Subsection Lattice Paths

The integer lattice is the set of all points in the Cartesian plane for which both the \(x\) and \(y\) coordinates are integers. If you like to draw graphs on graph paper, the lattice is the set of all the intersections of the grid lines.[🔗](#sec_counting-pascal-5-2) A lattice path is one of the shortest possible paths connecting two points on the lattice, moving only horizontally and vertically. For example, here are three possible lattice paths from the point \((0,0)\) to \((3,2)\text{:}\)[🔗](#sec_counting-pascal-5-3) ![A grid of 12 dots arranged in a 4-wide by 3-high rectangle. The lower-left dot is labeled (0,0). The top right dot is labeled (3,2). A bold line runs from the bottom left dot to the third dot on the bottom row, then turns up and runs to the top dot in that column, then turns right and runs to the top-right dot.](generated/latex-image/lattice-path-1.svg) ![A grid of 12 dots arranged in a 4-wide by 3-high rectangle. The lower-left dot is labeled (0,0). The top right dot is labeled (3,2). A bold line runs from the bottom up to the top left dot, and then to the top-right dot.](generated/latex-image/lattice-path-2.svg) ![A grid of 12 dots arranged in a 4-wide by 3-high rectangle. The lower-left dot is labeled (0,0). The top right dot is labeled (3,2). A bold line runs from the bottom left dot to the second dot on the bottom row, then turns up and runs to the next dot above it, then turns right and runs to the middle right dot, and finally turns up and runs to the top-right dot.](generated/latex-image/lattice-path-3.svg) Notice that to ensure the path is the *shortest* possible, each move must be either to the right or up. Additionally, in this case, no matter what path we take, we must make three steps right and two steps up. No matter in what order we make these steps, there will always be five steps. Thus each path has length five. [🔗](#sec_counting-pascal-5-5) The counting question we will ask is this: *how many* lattice paths are there between \((0,0)\) and \((3,2)\text{?}\) In this case, drawing all the paths wouldn’t take too long. Or we could list each path as a string of “directions” such as \(xxyyx\text{,}\) \(yyxxx\text{,}\) or \(xyxxy\text{,}\) which correspond to the three paths drawn above, where an \(x\) means travel one unit in the \(x\) direction, and similarly for \(y\text{.}\) We would get the following ten paths: \begin{gather*} xxxyy \qquad xxyxy \qquad xyxxy \qquad yxxxy\\ xxyyx \qquad xyxyx \qquad yxxyx \qquad xyyxx \qquad yxyxx \qquad yyxxx\text{.} \end{gather*} When the distance between starting and stopping points is larger, we will want to find a more efficient way to count the paths. [🔗](#sec_counting-pascal-5-6) Let’s take what we learned from the rook paths (which are, gasp, actually lattice paths). Consider the lattice shown below:[🔗](#sec_counting-pascal-5-7) ![A grid of 12 dots arranged in a 4-wide by 3-high rectangle. The lower-left dot is labeled (0,0). The top right dot is labeled (3,2). The dot on the top row directly to the left of (3,2) is labeled A; the dot directly below (3,2) is labeled B.](generated/latex-image/lattice-ab.svg) Any lattice path from (0,0) to (3,2) must pass through exactly one of \(A\) and \(B\text{.}\) The point \(A\) is 4 steps away from (0,0) and two of them are in the \(x\) direction. The last step is also in the \(x\) direction, so the paths from (0,0) to (3,2) that pass through \(A\) are exactly the six strings we listed above that end in an \(x\text{.}\) For the paths that pass through point \(B\text{,}\) the last step will be in the \(y\) direction, so the paths from (0,0) to (3,2) that pass through \(B\) are exactly the four strings we listed above that end in a \(y\text{.}\) So the total number of paths to (3,2) is just \(6+4\text{.}\)[🔗](#sec_counting-pascal-5-9) The general observation here is that to find the number of paths that start at \((0,0)\) and end at \((m,n)\text{,}\) we can find the number of paths to the point directly to the left of the endpoint, \((m-1,n)\) and add the number of paths to the point directly below the endpoint, \((m,n-1)\text{.}\) This is exactly the same way that Pascal’s triangle is generated! Indeed, if we rotate the lattice appropriately, so the point \((0,0)\) is at the top of the triangle and the axes along the sides of the triangle, we see that the numbers in Pascal’s triangle give us exactly the number of paths to each lattice point.[🔗](#sec_counting-pascal-5-10) ![Integer lattice overlayed on Pascal’s triangle](generated/latex-image/pascal-and-lattice.svg) To make this observation helpful for actually finding the number of paths from the origin to a given point, we note that it is the *length* of the path that determines the *row* of Pascal’s triangle, and the number of steps in the \(y\) direction that says how far into the triangle we are -- the *column* of Pascal’s triangle.[🔗](#sec_counting-pascal-5-12)

#### Example 3.1.2.

How many lattice paths are there from \((0,0)\) to \((4,7)\text{?}\)[🔗](#sec_counting-pascal-5-13-1-1) Solution. The length of these paths is \(4+7 = 11\text{.}\) Look at the 11th row of Pascal’s triangle: \begin{equation*} 1, 11, 55, 165, 330, 462, 462, 330, 165, 55, 11, 1\text{.} \end{equation*} Count to the 7th position (remembering that the 1 is in position 0) which gives us \(\binom{11}{7} = 330\) different paths. [🔗](#sec_counting-pascal-5-13-2-1) [🔗](#sec_counting-pascal-5-13-2) [🔗](#sec_counting-pascal-5-13)[🔗](#sec_counting-pascal-5)

### Subsection Bit Strings

“Bit” is short for “binary digit,” so a bit string is a string of binary digits. The binary digits are simply the numbers 0 and 1. All of the following are bit strings: \begin{equation*} 1001 \quad 0 \quad 1111 \quad 1010101010\text{.} \end{equation*} [🔗](#subsec-counting-binom-bitstrings-3) The number of bits (0’s or 1’s) in the string is the length of the string; the strings above have lengths 4, 1, 4, and 10 respectively. We also can ask how many of the bits are 1’s. The number of 1’s in a bit string is the weight of the string; the weights of the above strings are 2, 0, 4, and 5 respectively.[🔗](#subsec-counting-binom-bitstrings-4)

#### Definition 3.1.3. Bit Strings.

- An \(n\)-bit string is a bit string of length \(n\text{.}\) That is, it is a string containing \(n\) symbols, each of which is a bit, either 0 or 1.[🔗](#subsec-counting-binom-bitstrings-5-8-1-1-1-1) [🔗](#subsec-counting-binom-bitstrings-5-8-1-1-1)
- The weight of a bit string is the number of 1’s in it.[🔗](#subsec-counting-binom-bitstrings-5-8-1-1-2-1) [🔗](#subsec-counting-binom-bitstrings-5-8-1-1-2)
- \(\B^n_k\) is the set of all \(n\)-bit strings of weight \(k\text{.}\) [🔗](#subsec-counting-binom-bitstrings-5-8-1-1-3)

[🔗](#subsec-counting-binom-bitstrings-5-8-1) [🔗](#subsec-counting-binom-bitstrings-5)For example, the elements of the set \(\B^3_2\) are the bit strings 011, 101, and 110. Those are the only strings containing three bits, exactly two of which are 1’s.[🔗](#subsec-counting-binom-bitstrings-6) The counting questions: How many 5-bit strings have weight 3? In other words, we are asking for the cardinality \(|\B^5_3|\text{.}\)[🔗](#subsec-counting-binom-bitstrings-7) Let’s just list them and see how many there are. \begin{gather*} 11100 \qquad 11010 \qquad 10110 \qquad 01110\\ 11001 \qquad 10101 \qquad 01101 \qquad 10011 \qquad 01011 \qquad 00111\text{.} \end{gather*} Great. Ten of them. Actually, I have a confession: I didn’t type all of these from scratch. Instead I just modified the list of 10 lattice paths from (0,0) to (3,2) that we found earlier. Each \(x\) became a 1 and each \(y\) became a 0. After all, any lattice path with length \(n\) that requires \(k\) steps in the \(x\) direction can be represented by a string of \(n\) symbols of two types, with \(k\) of those symbols being of one type. Whether we call the two symbols \(x\) and \(y\) or we call them \(1\) and \(0\) will not change *how many* strings we get. [🔗](#subsec-counting-binom-bitstrings-8) It is not surprising then that the same relationship between Pascal’s triangle and lattice paths holds for bit strings. Look at the 10 strings above. The first row contains all the bit strings of \(\B^5_3\) that end in a 0. Before that ending 0, we have a string in \(\B^4_3\text{,}\) since it must have length 4 and weight 3 (the ending 0 increases the length, but not the weight). The second row contains all the bit strings of \(\B^5_3\) that end in a 1. Before that ending 1, we have a string in \(\B^4_2\text{,}\) since it must have length 4 and weight 2 (the ending 1 increases the length and the weight). So the number of 5-bit strings of weight 3 is the sum of the number of 4-bit strings of weight 3 and the number of 4-bit strings of weight 2. In symbols: \begin{equation*} |\B^5_3| = |\B^4_3| + |\B^4_2|\text{.} \end{equation*} [🔗](#subsec-counting-binom-bitstrings-9) Now we have two good reasons to believe that Pascal’s triangle tells us the number of bit strings of a given weight: There is a one-to-one correspondence between lattice paths and bit strings, and the same recursive relationship holds for bit strings as it does for generating Pascal’s triangle. So we can now use the triangle to count bit strings.[🔗](#subsec-counting-binom-bitstrings-10)

#### Example 3.1.4.

How many 11-bit strings have weight 5?[🔗](#subsec-counting-binom-bitstrings-11-1-1) Solution. There will be \(\binom{11}{5}\) such strings. From Pascal’s triangle, we see that \(\binom{11}{5} = 462\)[🔗](#subsec-counting-binom-bitstrings-11-2-1) [🔗](#subsec-counting-binom-bitstrings-11-2) [🔗](#subsec-counting-binom-bitstrings-11)[🔗](#subsec-counting-binom-bitstrings)

### Subsection Subsets and Pizzas

A subset of a set \(A\) is any set all of whose elements are also in \(A\text{.}\) Think of starting with the set \(A\) and removing some (or none or all) of its elements: the resulting set is a subset of \(A\text{.}\) (More information about sets can be found in [Section 0.2](sec_intro-structures.html) and [Section 5.1](sec_structures-sets.html).)[🔗](#sec_counting-pascal-7-4) Suppose we look at the set \(A = \{1,2,3,4,5\}\text{.}\) How many subsets of \(A\) contain exactly 3 elements? Let’s list them all: \begin{gather*} \{1,2,3\} \qquad \{1,2,4\} \qquad \{1,3,4\} \qquad \{2,3,4\}\\ \{1,2,5\} \qquad \{1,3,5\} \qquad \{2,3,5\} \qquad \{1,4,5\} \qquad \{2,4,5\} \qquad \{3,4,5\}\text{.} \end{gather*} [🔗](#sec_counting-pascal-7-5) Again, we see there are ten. In fact, we have listed them in the same order as we listed the ten 5-bit strings of weight 3 and the ten lattice paths from (0,0) to (3,2). Wait, does this even make sense? In what way is a subset the same as a bit-string?[🔗](#sec_counting-pascal-7-6) Think of each bit in a bit string as representing one of the elements in a set. The set \(A\) has five elements, so we need five bits to represent a subset of \(A\text{.}\) If the bit in position \(n\) is a 0, that means we do *not* include \(n\) in our subset, while a 1 in that position tells us that \(n\) is in the subset. Three 1’s means we have said, “yes” to three elements.[🔗](#sec_counting-pascal-7-7)

#### Example 3.1.5.

Which subsets of \(\{1,2,3,4,5,6\}\) correspond to the bit strings below? \begin{equation*} 101011 \quad 001000 \quad 111111 \quad 000000 \end{equation*} [🔗](#sec_counting-pascal-7-8-1-1) Solution. Here we are not fixing the weight of the strings, so our subsets will not all have the same size. Here is the correspondence:[🔗](#sec_counting-pascal-7-8-2-1)

| \(101011\) | \(\{1,3,5,6\}\) |
| --- | --- |
| \(001000\) | \(\{3\}\) |
| \(111111\) | \(\{1,2,3,4,5,6\}\) |
| \(000000\) | \(\emptyset\) |

The last subset is the empty set: the set that contains no elements (we could have also written \(\{\}\)). This is a subset of *every* set![🔗](#sec_counting-pascal-7-8-2-3) [🔗](#sec_counting-pascal-7-8-2) [🔗](#sec_counting-pascal-7-8)

#### Remark 3.1.6.

What we have done here is give a *bijection* between the set of 5-bit strings of weight 3 and the set of 3-element subsets of \(A\text{.}\) A bijection is a function \(f: X \to Y\) such that each element of \(Y\) is the image of exactly one element from \(X\text{.}\) You can prove that if there is a bijection between two sets, then they have the same number of elements. This is a common counting technique we will use in the upcoming sections.[🔗](#sec_counting-pascal-7-9-1-1) [🔗](#sec_counting-pascal-7-9)This example illustrates that, once again, Pascal’s triangle can give us the answer to a counting question. The number of \(k\)-element subsets of a set with \(n\) elements is the same as the number of \(n\)-bit strings of weight \(k\text{,}\) and that is the number in row \(n\text{,}\) column \(k\) of the triangle: \(\binom{n}{k}\text{.}\)[🔗](#sec_counting-pascal-7-10)

#### Example 3.1.7.

How many subsets of the set \(\{a,b,c,d,e,f,g\}\) have exactly 4 elements?[🔗](#sec_counting-pascal-7-11-1-1) Solution. The set contains 7 elements, so the number of 4-element subsets is the same as the number of 7-bit strings of weight 4, namely \(\binom{7}{4} = 35\text{.}\)[🔗](#sec_counting-pascal-7-11-2-1) [🔗](#sec_counting-pascal-7-11-2) [🔗](#sec_counting-pascal-7-11)At this point I’m sure we are all getting pretty hungry, so let’s get some pizza. But which pizza shall we order? Let’s not overdo it and just choose three toppings from the ten available. How many different pizzas can we order?[🔗](#sec_counting-pascal-7-12) Aha! So that’s why we care about counting subsets!! Each pizza choice is nothing more than a 3-element subset of the set of 10 toppings. We now know how to count this: \(\binom{10}{3} = 120\) different pizzas.[🔗](#sec_counting-pascal-7-13) What if we want an Italian soda with dinner? Let’s say we want to add two different flavored syrups from the 13 available. How many different sodas are possible? This is just the number of 2-element subsets of a set with 13 elements: \(\binom{13}{2} = 78\text{.}\)[🔗](#sec_counting-pascal-7-14) This is why we pronounce \(\binom{n}{k}\) as “\(n\) choose \(k\)”. It is the number of ways to choose \(k\) items from a collection of \(n\) items, since choosing \(k\) elements is exactly how you build a \(k\)-element subset.[🔗](#sec_counting-pascal-7-15) We can view counting lattice paths as choosing \(k\) out of \(n\) things: Of the \(n\) steps on the path, we choose \(k\) of them to be in the \(x\) direction. Bit strings can also be thought of in this way: Of the \(n\) bits in the string, we choose \(k\) of them to be 1’s.[🔗](#sec_counting-pascal-7-16) We can now answer all sorts of real-world counting problems, as long as they are really nothing more than asking for the number of subsets of a set. Pascal’s triangle contains all these answers.[🔗](#sec_counting-pascal-7-17)

#### Counting Subsets.

The number of \(k\)-element subsets of a set with \(n\) elements is the number in row \(n\text{,}\) column \(k\) of Pascal’s triangle: \(\binom{n}{k}\text{,}\) which we read as “\(n\) choose \(k\text{.}\)” This is the number of ways to choose \(k\) items from a collection of \(n\) items.[🔗](#assemblage-subset-counting-2) [🔗](#assemblage-subset-counting)[🔗](#sec_counting-pascal-7)

### Subsection Algebra?

Earlier we said that one of the original uses for Pascal’s triangle was to solve problems in *algebra*. What does counting subsets (or bit strings or lattice paths) have to do with algebra?[🔗](#sec_counting-pascal-8-3) Suppose you expand the binomial expression \((x+1)^6\) (i.e., multiply the binomial \(x+1\) by itself six times). This can be tedious to do by hand, but a computer algebra system such as SageMath can do this easily.[🔗](#sec_counting-pascal-8-4) expand((x+1)^6) Do the coefficients look familiar? Consider the 6th row of Pascal’s triangle: \begin{equation*} 1 \quad 6 \quad 15 \quad 20 \quad 15 \quad 6 \quad 1\text{.} \end{equation*} Why are these the coefficients? [🔗](#sec_counting-pascal-8-6)

#### Try it 3.1.8.

Modify the SageMath code above to expand \((x+1)^{10}\text{.}\) What is the coefficient of \(x^6\text{?}\)[🔗](#chkpt-counting-pascal-1-1-1) .[🔗](#chkpt-counting-pascal-1-1-2) [[{"number": [210, 210], "feedback": "Correct. The coefficient of \\(x^6\\) is 210, which also happens to be \\(\\binom{10}{6}\\text{.}\\)"}, {"regex": "^\\s*.*\\s*$", "regexFlags": "", "feedback": "No, that is not the coefficient of \\(x^6\\text{.}\\) Try executing the SageMath cell above after changing the exponent to 10."}]] [🔗](#chkpt-counting-pascal-1) To see why this is more than just a coincidence, let’s look at the expansion of \((x+y)^3\) and do it very carefully. We are really multiplying out \begin{equation*} (x+y)(x+y)(x+y)\text{.} \end{equation*} This means we must distribute the binomials, which looks like the following. (We will use a different typeface for each version of the \(x\) and \(y\) to keep track of where everything comes from.) \begin{align*} (x+y)^3 = \amp (x+y)(\x+\y)(\X+\Y)\\ = \amp [(x+y)(\x+\y)]\X + [(x+y)(\x+\y)]\Y\\ = \amp [(x+y)\x + (x+y)\y]\X + [(x+y)\x+ (x+y)\y] \Y\\ = \amp [x\x + y\x + x\y + y\y]\X + [x\x + y\x + x\y + y\y]\Y \\ = \amp x\x\X + y\x\X + x\y\X + y\y\X + x\x\Y + y\x\Y + x\y\Y + y\y\Y\text{.} \end{align*} This repeated distribution results in a sum of terms, each the product of three variables. We see that each term is the result of *choosing* either the \(x\) or the \(y\) from each of the binomials. For example, the term \(x\y\X\) is the result of choosing the \(x\) from the first binomial, the \(\y\) from the second, and the \(\X\) from the third. [🔗](#sec_counting-pascal-8-8) Say we want to find the coefficient of the \(x^2y\) therm. We collect like terms, collecting all the terms in which we have chosen \(x\) two times (and \(y\) the other one time). Alternatively, the \(x^2y\) term comes from all the strings with two \(x\) and one \(y\text{,}\) just like a bit string or lattice path. No matter how you think of it, the result is that we have \(\binom{3}{2} = 3\) terms with the form \(x^2y\text{.}\)[🔗](#sec_counting-pascal-8-9) Hopefully it is clear that this generalizes to the expansion of \((x+y)^n\) for any positive integer \(n\text{.}\) This is known as the *binomial theorem.*[🔗](#sec_counting-pascal-8-10)

#### Theorem 3.1.9. Binomial Theorem.

The \(n\)th row of Pascal’s triangle gives the coefficients of the expansion of \((x+y)^n\text{.}\) That is, for any positive integer \(n\text{,}\) \begin{equation*} (x+y)^n = \binom{n}{0}x^n + \binom{n}{1}x^{n-1}y + \cdots + \binom{n}{n-1}xy^{n-1} + \binom{n}{n}y^n.\text{,} \end{equation*} so the coefficient of \(x^ky^{n-k}\) is \(\binom{n}{k}\text{.}\) [🔗](#thm-binomial-3-1) [🔗](#thm-binomial) For this reason, the numbers in Pascal’s triangle are often called binomial coefficients.[🔗](#sec_counting-pascal-8-12)

#### Example 3.1.10.

Without multiplying out the binomial, give the expansion of \((x+y)^5\text{.}\)[🔗](#sec_counting-pascal-8-13-1-1) Solution. We take the 5th row of Pascal’s triangle: \(1, 5, 10, 10, 5, 1\text{.}\) The expansion is then, \begin{equation*} (x+y)^5 = x^5 + 5x^4y + 10x^3y^2 + 10x^2y^3 + 5xy^4 + y^5. \end{equation*} [🔗](#sec_counting-pascal-8-13-2-1) [🔗](#sec_counting-pascal-8-13-2) [🔗](#sec_counting-pascal-8-13)[🔗](#sec_counting-pascal-8)

### Reading Questions Reading Questions

#### 1.

Why is the number of lattice paths from \((0,0)\) to \((3,5)\) the same as the number of \(8\)-bit strings with weight 5?[🔗](#rq-counting-pascal-equiv-1-1) [🔗](#rq-counting-pascal-equiv)

#### 2.

Which of the following counting questions have the answer \(\binom{11}{5}\text{?}\) Select all that apply.[🔗](#rq-counting-pascal-not-1-1)

- How many lattice paths are there from \((0,0)\) to \((11,5)\text{?}\)
- Careful, paths from \((0,0)\) to \((11,5)\) will have length \(11+5 = 16\text{,}\) so the answer to this question would be \(\binom{16}{5}\text{.}\)
- How many subsets of \(\{1,2,\ldots, 11\}\) contain exactly 5 elements?
- Correct. We must choose 5 out of 11 elements.
- How many 11-bit strings have weight 5?
- Exactly. Of the 11 bits in the string, we must choose 5 to be 1’s.
- How many ways can you select 5 flavors of ice cream for a giant sundae from 11 available flavors?
- Yes. This is the same as choosing 5 elements from a set of 11.

[🔗](#rq-counting-pascal-not)

#### 3.

The number of subsets of \(\{1,2,\ldots, 8\}\) of size 3 is the same as the number of subsets of \(\{1,2,\ldots, 7\}\) of size either \(2\) or \(3\text{.}\) Explain why this makes sense.[🔗](#rq-counting-pascal-recurrence-1-1) [🔗](#rq-counting-pascal-recurrence)

#### 4.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-counting-pascal-q-1-1) [🔗](#rq-counting-pascal-q)[🔗](#rqs-counting-pascal)

### Exercises Practice Problems

#### 1.

Activate Use Pascal’s triangle to find the numeric values of the following.

1. \(\displaystyle \binom{7}{2}\)[🔗](#extracted-ww-pascal-number-ww-1-1-1-2-1-1) [🔗](#extracted-ww-pascal-number-ww-1-1-1-2-1)
2. \(\displaystyle \binom{7}{3}\)[🔗](#extracted-ww-pascal-number-ww-1-1-1-2-2-1) [🔗](#extracted-ww-pascal-number-ww-1-1-1-2-2)
3. \(\displaystyle \binom{8}{3}\)[🔗](#extracted-ww-pascal-number-ww-1-1-1-2-3-1) [🔗](#extracted-ww-pascal-number-ww-1-1-1-2-3)
4. \(\displaystyle \binom{10}{5}\)[🔗](#extracted-ww-pascal-number-ww-1-1-1-2-4-1) [🔗](#extracted-ww-pascal-number-ww-1-1-1-2-4)
5. \(\displaystyle \binom{8}{7}\)[🔗](#extracted-ww-pascal-number-ww-1-1-1-2-5-1) [🔗](#extracted-ww-pascal-number-ww-1-1-1-2-5)
6. \(\displaystyle \binom{13}{2}\)[🔗](#extracted-ww-pascal-number-ww-1-1-1-2-6-1) [🔗](#extracted-ww-pascal-number-ww-1-1-1-2-6)

[🔗](#extracted-ww-pascal-number-ww-1-1-1) [🔗](#ww-pascal-numbers)

#### 2.

Activate Compute the following sums of the rows of Pascal’s triangle.[🔗](#extracted-webwork-80-1-1-1) \begin{equation*} \binom{2}{0} + \binom{2}{1} + \binom{2}{2} \text{.} \end{equation*} [🔗](#extracted-webwork-80-1-1-2) \begin{equation*} \binom{3}{0} + \binom{3}{1} + \binom{3}{2} + \binom{3}{3} \text{.} \end{equation*} [🔗](#extracted-webwork-80-1-1-3) \begin{equation*} \binom{4}{0} + \binom{4}{1} + \binom{4}{2} + \binom{4}{3} + \binom{4}{4} \text{.} \end{equation*} [🔗](#extracted-webwork-80-1-1-4) Now based on your work in the above calculations, give a guess for the sum of the 14th row of Pascal’s triangle.[🔗](#extracted-webwork-80-1-1-5) [🔗](#ww-pascal-rowsums)

#### 3.

Activate Consider the lattice paths from (3,4) to (8,10).[🔗](#extracted-webwork-81-1-1-1) How long is each such path?[🔗](#extracted-webwork-81-1-1-2) How many steps are in the x-direction?[🔗](#extracted-webwork-81-1-1-3) How many different paths are there?[🔗](#extracted-webwork-81-1-1-4) [🔗](#ww-pascal-latice-path)

#### 4.

Activate How many lattice paths are there from \((a,b)\) to \((c,d)\text{?}\) Give your answer as a binomial coefficient, so \(\binom{n}{k}\text{,}\) but say what \(n\) and \(k\) are.[🔗](#extracted-webwork-82-1-1-1) [🔗](#ww-pascal-latice-path-general)

#### 5.

Activate Consider the bit string \(100110010\text{.}\)[🔗](#extracted-webwork-83-1-1-1) What is the length of the bit string?[🔗](#extracted-webwork-83-1-1-2) What is the weight of the bit string?[🔗](#extracted-webwork-83-1-1-3) How many bit strings (including this one) have the same length of weight as it?[🔗](#extracted-webwork-83-1-1-4) [🔗](#ww-pascal-bitstring-basic)

#### 6.

Activate Consider the set \(\mathbf{B}^8_3\) of 8-bit strings of weight 3.[🔗](#extracted-webwork-84-1-1-1) How many 1s are there in each bit-string? How many 0s are there in each bit-string? [🔗](#extracted-webwork-84-1-1-2) How many bit strings are there in the set?[🔗](#extracted-webwork-84-1-1-3) How many 8-bit strings of weight 5 are there?[🔗](#extracted-webwork-84-1-1-4) [🔗](#ww-pascal-bitstring-complement)

#### 7.

Activate Suppose you are ordering a calzone from *D.P. Dough*. You want 5 distinct toppings, chosen from their list of 12 vegetarian toppings.

1. How many choices do you have for your calzone?[🔗](#extracted-webwork-85-1-1-1-2-1-1) [🔗](#extracted-webwork-85-1-1-1-2-1)
2. How many choices do you have for your calzone if you refuse to have green pepper as one of your toppings?[🔗](#extracted-webwork-85-1-1-1-2-2-1) [🔗](#extracted-webwork-85-1-1-1-2-2)
3. How many choices do you have for your calzone if you *insist* on having green pepper as one of your toppings?[🔗](#extracted-webwork-85-1-1-1-2-3-1) [🔗](#extracted-webwork-85-1-1-1-2-3)

[🔗](#extracted-webwork-85-1-1-1) How do the three questions above relate to each other? Do you see why this makes sense?[🔗](#extracted-webwork-85-1-1-2) [🔗](#ww-binom-pizza)

#### 8.

Activate How many subsets of \(\{1,2,3,4,5,6,7,8\}\) have six elements?[🔗](#extracted-webwork-86-1-1-1) Of those, how many contain the number 1?[🔗](#extracted-webwork-86-1-1-2) Of the total number of 6-element subsets, how many do NOT contain the number 1?[🔗](#extracted-webwork-86-1-1-3) [🔗](#ww-pascal-sets)

#### 9.

Activate What is the coefficient of \(x^{9}\) in \((x+3)^{17}\text{?}\)[🔗](#extracted-webwork-87-1-1-1) [🔗](#ww-binom-coef-simple)

#### 10.

Activate What is the coefficient of \(x^{8}\) in the expansion of \((x+2)^{17} + x^4(x+3)^{18}\text{?}\)[🔗](#extracted-webwork-88-1-1-1) [🔗](#ww-binom-coef-comb)[🔗](#practice_counting-binom)

### Exercises Additional Exercises

#### 1.

How many lattice paths are there from \((0,0)\) to \((8,3)\text{.}\) How many lattice paths are there from \((0,0)\) to \((3,8)\text{?}\) Why does it make sense that these two numbers are the same? Explain your reasoning.[🔗](#exercises_counting-binom-2-1) [🔗](#exercises_counting-binom-2)

#### 2.

Suppose you are counting lattice paths from \((0,0)\) to \((4,3)\text{.}\) We know that the number of such paths is \(\binom{4+3}{4} = \binom{7}{4} = 35\text{.}\) Here is another way to count these paths: Consider the cases for where your first step in the \(y\)-direction is. There are five different options here; compute the number of paths for each case.[🔗](#exercises_counting-binom-3-1-1)

#### (a)

How many paths are there from \((0,0)\) to \((4,3)\) where the first step is in the \(y\)-direction (i.e., paths that pass through the point \((0,1)\))?[🔗](#exercises_counting-binom-3-2-1-1) [🔗](#exercises_counting-binom-3-2)

#### (b)

How many paths are there from \((0,0)\) to \((4,3)\) that first move one step in the \(x\)-direction, then one step in the \(y\)-direction (so they pass through the points \((1,0)\) and then \((1,1)\))?[🔗](#exercises_counting-binom-3-3-1-1) [🔗](#exercises_counting-binom-3-3)

#### (c)

List the remaining three cases and how many paths there are for each case.[🔗](#exercises_counting-binom-3-4-1-1) [🔗](#exercises_counting-binom-3-4)

#### (d)

Verify that the sum of the paths in each case is 35. Then describe where all these numbers are in Pascal’s triangle. Find another instance of this pattern and verify that it works.[🔗](#exercises_counting-binom-3-5-1-1) [🔗](#exercises_counting-binom-3-5)[🔗](#exercises_counting-binom-3)

#### 3.

Explain why the coefficient of \(x^5y^3\) is the same as the coefficient of \(x^3y^5\) in the expansion of \((x+y)^8\text{?}\)[🔗](#exercises_counting-binom-4-1-1) [🔗](#exercises_counting-binom-4)

#### 4.

Consider the expansion of \((x+y)^5\text{.}\)[🔗](#exercises_counting-binom-5-1-1)

#### (a)

Use the binomial theorem to write out the expansion of \((x+y)^5\text{.}\)[🔗](#exercises_counting-binom-5-2-1-1) [🔗](#exercises_counting-binom-5-2)

#### (b)

Using the expanded version of \((x+y)^5\text{,}\) multiply (using the distributive property) \((x+y)^5\cdot (x+y)\text{.}\) Simplify your answer, but show all your steps.[🔗](#exercises_counting-binom-5-3-1-1) [🔗](#exercises_counting-binom-5-3)

#### (c)

How does your previous answer relate to what you get when you apply the binomial theorem to \((x+y)^6\text{?}\)[🔗](#exercises_counting-binom-5-4-1-1) [🔗](#exercises_counting-binom-5-4)[🔗](#exercises_counting-binom-5)[🔗](#exercises_counting-binom)[🔗](#sec_counting-pascal) [&#xe5cb;Prev](ch_counting.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_counting-combine-outcomes.html) [Feedback](/cdn-cgi/l/email-protection#711e021210035f1d1407181f31041f121e5f141504)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_counting-pascal-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_counting-pascal-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.3 Non-Disjoint Outcomes

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_counting-non-disjoint-2-1-1)

1. Use Venn diagrams to count the number of outcomes in the union of non-disjoint sets.[🔗](#sec_counting-non-disjoint-2-2-1-1) [🔗](#sec_counting-non-disjoint-2-2-1)
2. Apply the principle of inclusion/exclusion for two and three sets.[🔗](#sec_counting-non-disjoint-2-2-2-1) [🔗](#sec_counting-non-disjoint-2-2-2)
3. Explain why the principle of inclusion/exclusion works.[🔗](#sec_counting-non-disjoint-2-2-3-1) [🔗](#sec_counting-non-disjoint-2-2-3)

[🔗](#sec_counting-non-disjoint-2)

### Subsection Section Preview

#### Investigate!

A recent buzz marketing campaign for *The Pie Hole* surveyed patrons on their pie preferences. People were asked whether they enjoyed (A) Apple, (B) Blueberry, or (C) Cherry pie (respondents answered yes or no to each type of pie, and could say yes to more than one type). The following table shows the results of the survey.[🔗](#sec_counting-non-disjoint-3-2-1)

| Pies enjoyed: | A | B | C | AB | AC | BC | ABC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Number of people: | 20 | 13 | 26 | 9 | 15 | 7 | 5 |

How many of those surveyed enjoy at least one of the types of pie? Also, explain why the answer is not 95.[🔗](#sec_counting-non-disjoint-3-2-3) [🔗](#sec_counting-non-disjoint-3-2)In [Section 3.2](sec_counting-combine-outcomes.html) we explored the [sum principle](sec_counting-combine-outcomes.html#principle-sum) as a way of combining two (or more) sets of *disjoint* outcomes. What happens if the outcomes are not disjoint?[🔗](#sec_counting-non-disjoint-3-3) Something different needs to be done. For example, when counting the number of playing cards that are either face cards or red cards, we cannot apply the sum principle to claim there are \(12 + 26 = 38\) cards. The problem is exactly that six cards are both face cards and red cards. There are a few different ways we can handle this that we will explore in this section.[🔗](#sec_counting-non-disjoint-3-4)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-counting-non-disjoint)

#### 1. Bit string counting.

Activate Consider the eight bit strings of length 3. Let’s find the number of strings that start with 1 or have weight 2 (i.e., contain exactly two 1s).[🔗](#extracted-webwork-101-1-1-1)

#### (a)

List all the 3-bit strings that start with 1.[🔗](#extracted-webwork-101-1-2-1-1) [🔗](#extracted-webwork-101-1-2)

#### (b)

List all the 3-bit strings that have weight 2.[🔗](#extracted-webwork-101-1-3-1-1) [🔗](#extracted-webwork-101-1-3)

#### (c)

Now list all the 3-bit strings that start with 1 or have weight 2. But be lazy: Don’t list them from scratch. Use your lists from the two tasks above.[🔗](#extracted-webwork-101-1-4-1-1) [🔗](#extracted-webwork-101-1-4)

#### (d)

How many strings are there in the lists?

- Strings that start with 1: [🔗](#extracted-webwork-101-1-5-1-1-1-1-1) [🔗](#extracted-webwork-101-1-5-1-1-1-1)
- Strings of weight 2: [🔗](#extracted-webwork-101-1-5-1-1-1-2-1) [🔗](#extracted-webwork-101-1-5-1-1-1-2)
- Strings that start with 1 or have weight 2: [🔗](#extracted-webwork-101-1-5-1-1-1-3-1) [🔗](#extracted-webwork-101-1-5-1-1-1-3)
- Strings that both start with a 1 *and* have weight 2: [🔗](#extracted-webwork-101-1-5-1-1-1-4-1) [🔗](#extracted-webwork-101-1-5-1-1-1-4)

[🔗](#extracted-webwork-101-1-5-1-1) [🔗](#extracted-webwork-101-1-5) [🔗](#pa-counting-non-disjoint-1)

#### 2. Combining lists.

How did you combine your two lists above? Explain how you did it. Then think of another method you could have used, and explain how that would be different.[🔗](#pa-counting-non-disjoint-2-2-1) [🔗](#pa-counting-non-disjoint-2)

#### 3. Counting favorite mathematicians.

Activate Xiang and Omari are discussing their favorite mathematicians throughout history. Xiang has a list of 7 favorites, while Omari has a list of 5. They discover that they have 3 mathematicians in common. How many mathematicians are on their combined list?[🔗](#extracted-webwork-102-1-1-1) [🔗](#pa-counting-non-disjoint-3)[🔗](#PA-counting-non-disjoint)[🔗](#sec_counting-non-disjoint-3)

### Subsection Counting with Venn Diagrams

To understand how to deal with combining sets of outcomes that are not disjoint, it will be helpful to use some notation from set theory, which we will briefly review here.[🔗](#subsec_counting-venn-6) Let \(A\) be the set of outcomes for the first event and \(B\) be the set of outcomes for the second event. When we ask for the number of ways either event can happen, the new set of outcomes consists of all outcomes that are in \(A\text{,}\) or \(B\text{,}\) or both. This is nothing more than the union of the set \(A\) and \(B\text{,}\) written \(A \cup B\text{.}\)[🔗](#subsec_counting-venn-7) The sum principle only applies when no outcome belongs to both events. The elements that are common to sets \(A\) and \(B\) are the sets in their intersection, written \(A \cap B\text{.}\) The intersection of two sets is itself a set. If sets \(A\) and \(B\) are disjoint, then there are *no* elements in the intersection, so the intersection is the empty set, written \(\emptyset\text{.}\)[🔗](#subsec_counting-venn-8) We are counting the *number* of outcomes, so what we are really interested in is the size (or cardinality) of the sets. We write the size of a set \(X\) as \(\card{X}\text{.}\)[🔗](#subsec_counting-venn-9) With this notation in hand, we can restate the sum principle as follows.[🔗](#subsec_counting-venn-10)

#### Principle 3.3.1. Sum Principle (with sets).

Given two sets \(A\) and \(B\text{,}\) if \(A \cap B = \emptyset\text{,}\) then \begin{equation*} \card{A \cup B} = \card{A} + \card{B}\text{.} \end{equation*} [🔗](#subsec_counting-venn-11-5-1) [🔗](#subsec_counting-venn-11)Now consider what happens to the sum principle when the sets are NOT disjoint. Suppose we want to find \(\card{A \cup B}\) and know that \(\card{A} = 10\) and \(\card{B} = 8\text{.}\) If we knew that the sets were disjoint, then \(\card{A \cup B}\) would be 18. But if we don’t have that the sets are disjoint, we need more information We must know how many of the 8 elements in \(B\) are also elements of \(A\text{.}\) Suppose we also know that \(\card{A \cap B} = 6\text{.}\) Now we can say exactly how many elements are in \(A\text{,}\) and, of those, how many are in \(B\) and how many are not (6 of the 10 elements are in \(B\text{,}\) so 4 are in \(A\) but not in \(B\)). We could fill in a Venn diagram as follows:[🔗](#subsec_counting-venn-12) ![Intersecting circles labeled A and B. Inside the region enclosed by both circles is the number 6. The number 4 is in the region inside A but outside B. The number 2 is in the region inside B but outside A.](generated/latex-image/subsec_counting-venn-13.svg) This says there are 6 elements in \(A \cap B\text{,}\) 4 elements in \(A\) but not \(B\) (which we can write as \(\card{A \setminus B} = 4\)), and 2 elements in \(B\) but not \(A\) (written \(\card{B \setminus A} = 2\)). Now *these* three sets *are* disjoint, so we can use the sum principle to find the number of elements in \(A \cup B\text{.}\) It is \(6 + 4 + 2 = 12\text{.}\)[🔗](#subsec_counting-venn-14)

#### Example 3.3.2.

How many \(7\)-bit strings of weight \(4\) start with \(11\) or end with \(00\text{,}\) or both?[🔗](#eg-2-set-bit-string-venn-1-1) Solution. Let \(A\) be the set of \(7\)-bit strings of weight \(4\) that start with \(11\text{.}\) We have \(\card{A} = \binom{5}{2} = 10\text{.}\) Let \(B\) be the set of \(7\)-bit strings of weight \(4\) that end with \(00\text{.}\) We have \(\card{B} = \binom{5}{4} = 5\text{.}\)[🔗](#eg-2-set-bit-string-venn-2-1) But it is not true that \(\card{A \cup B} = 10 + 5 = 15\text{,}\) since strings like 1101100 both start with \(11\) and end with \(00\text{.}\) That is included in the 10 strings starting with \(11\) and the five strings ending with \(00\text{.}\) We must find the number of strings that belong to both \(A\) and \(B\text{.}\) We have \begin{equation*} \card{A \cap B} = \binom{3}{2} = 3 \end{equation*} (and indeed, there are three strings in the intersection: 1111000, 1110100, and 1101100). [🔗](#eg-2-set-bit-string-venn-2-2) We can now fill in a Venn diagram:[🔗](#eg-2-set-bit-string-venn-2-3) ![Intersecting circles labeled A and B. Inside the region enclosed by both circles is the number 3. The number 7 is in the region inside A but outside B. The number 2 is in the region inside B but outside A.](generated/latex-image/eg-2-set-bit-string-venn-2-4.svg) The circle for \(A\) contains a total of 10 elements, the 3 that also belong to \(B\) and 7 more that belong to just \(A\text{.}\) The circle for \(B\) contains a total of 5 elements, the 3 that also belong to \(A\) and 2 more that belong to just \(B\text{.}\) The number of elements in \(A \cup B\) is the sum of the elements in each region \begin{equation*} |\card{A \cup B} = 7+3+2 = 12\text{.} \end{equation*} [🔗](#eg-2-set-bit-string-venn-2-5) [🔗](#eg-2-set-bit-string-venn-2) [🔗](#eg-2-set-bit-string-venn)We can do something similar with three sets.[🔗](#subsec_counting-venn-16)

#### Example 3.3.3.

An examination in three subjects, Algebra, Biology, and Chemistry, was taken by 41 students. The following table shows how many students failed in each single subject and in their various combinations:[🔗](#eg-3set-venn-1-1)

| Subject: | A | B | C | AB | AC | BC | ABC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Failed: | 12 | 5 | 8 | 2 | 6 | 3 | 1 |

How many students failed at least one subject?[🔗](#eg-3set-venn-1-3) Solution. The answer is not 37, even though the sum of the numbers above is 37. For example, while 12 students failed Algebra, 2 of those students also failed Biology, 6 also failed Chemistry, and 1 of those failed all three subjects. In fact, that 1 student who failed all three subjects is counted a total of 7 times in the total 37. To clarify things, let us think of the students who failed Algebra as the elements of the set \(A\text{,}\) and similarly for sets \(B\) and \(C\text{.}\) The one student who failed all three subjects is the lone element of the set \(A \cap B \cap C\text{.}\) Thus, in Venn diagrams:[🔗](#eg-3set-venn-2-1) ![Three intersecting circles labeled A, B, and C. The center region inside all three circles contains the number 1.](generated/latex-image/eg-3set-venn-2-2-1.svg) Now let’s fill in the other intersections. We know \(A\cap B\) contains 2 elements, but 1 element has already been counted. So we should put a 1 in the region where \(A\) and \(B\) intersect (but \(C\) does not). Similarly, we calculate the cardinality of \((A\cap C) \setminus B\text{,}\) and \((B \cap C) \setminus A\text{:}\)[🔗](#eg-3set-venn-2-3) ![Three intersecting circles labeled A, B, and C. The center region inside all three circles contains the number 1. The region above this, inside both A and B but outside C, contains the number 1. The region inside both A and C but outside B contains the number 5. The region inside B and C but outside A contains the number 2.](generated/latex-image/eg-3set-venn-2-4-1.svg) Next, we determine the numbers that should go in the remaining regions, including outside of all three circles. This last number is the number of students who did not fail any subject:[🔗](#eg-3set-venn-2-5) ![Three intersecting circles labeled A, B, and C. The center region inside all three circles contains the number 1. The region above this, inside both A and B but outside C, contains the number 1. The region inside both A and C but outside B contains the number 5. The region inside B and C but outside A contains the number 2. The region just inside A contains the number 5; the region just inside B contains the number 1; the region just inside C contains the number 0. The number 26 is outside all three circles.](generated/latex-image/eg-3set-venn-2-6-1.svg) We found 5 goes in the “\(A\) only” region because the entire circle for \(A\) needed to have a total of 12, and 7 were already accounted for. Similarly, we calculate the “\(B\) only” region to contain only 1 student and the “\(C\) only” region to contain no students.[🔗](#eg-3set-venn-2-7) Thus the number of students who failed at least one class is 15 (the sum of the numbers in each of the eight disjoint regions). The number of students who passed all three classes is 26: the total number of students, 41, less the 15 who failed at least one class.[🔗](#eg-3set-venn-2-8) Note that we can also answer other questions. For example, how many students failed just Chemistry? None. How many passed Algebra but failed both Biology and Chemistry? This corresponds to the region inside both \(B\) and \(C\) but outside of \(A\text{,}\) containing 2 students.[🔗](#eg-3set-venn-2-9) [🔗](#eg-3set-venn-2) [🔗](#eg-3set-venn) Here is an interesting math fact. \begin{equation*} 12 + 5 + 8 - 2 - 6 - 3 + 1 = 15\text{.} \end{equation*} Is it a coincidence that this way of combining the numbers of students who failed each subject in the example above gives the same number of students who failed at least one subject? This suggests that there might be a simpler way to find the size of a union of non-disjoint sets. [🔗](#subsec_counting-venn-18) [🔗](#subsec_counting-venn)

### Subsection The Principle of Inclusion/Exclusion

It would be nice to write an algebraic formula that captures what we have done in the previous examples. Even better would be for this algebraic formula to be a generalization of the case where the sets *are* disjoint.[🔗](#subsec-pie-2) Consider again the example where \(\card{A} = 10\text{,}\) \(\card{B} = 8\) and \(\card{A \cap B} = 6\text{.}\) We said that \(\card{A \cup B} = 12\text{,}\) found by adding \(4 + 6 + 2\text{.}\)[🔗](#subsec-pie-3) If \(A\) and \(B\) had been disjoint, then \(\card{A \cup B}\) would have been \(\card{A} + \card{B} = 10 + 8 = 18\text{.}\) We see that is off by exactly 6, which just so happens to be \(\card{A \cap B}\text{.}\) So perhaps we guess, \begin{equation*} \card{A \cup B} = \card{A} + \card{B} - \card{A \cap B}\text{.} \end{equation*} This makes sense! When we add the number of elements in \(A\) to the number of elements in \(B\text{,}\) we have counted the six elements that belong to both sets exactly twice. So if we subtract them out, we have counted them exactly once. [🔗](#subsec-pie-4) In other words, we have:[🔗](#subsec-pie-5)

#### Theorem 3.3.4. Cardinality of a Union (2 Sets).

For any finite sets \(A\) and \(B\text{,}\) \begin{equation*} \card{A \cup B} = \card{A} + \card{B} - \card{A \cap B}\text{.} \end{equation*} [🔗](#thm-pie-2-4) [🔗](#thm-pie-2)

#### Example 3.3.5.

How many \(7\)-bit strings of weight \(4\) start with \(11\) or end with \(00\text{,}\) or both? Use [Theorem 3.3.4](sec_counting-non-disjoint.html#thm-pie-2) and compare to [Example 3.3.2](sec_counting-non-disjoint.html#eg-2-set-bit-string-venn).[🔗](#subsec-pie-7-1-1) Solution. We have \(\card{A} = \binom{5}{2} = 10\text{,}\) \(\card{B} = \binom{5}{4} = 5\text{,}\) and \(\card{A \cap B} = \binom{3}{2} = 3\text{.}\) Therefore: \begin{equation*} \card{A \cup B} = 10 + 5 - 3 = 12\text{.} \end{equation*} This makes sense since the three bit strings that start with \(11\) and end with \(00\) are counted in the 10 strings starting with \(11\) and again among the 5 strings ending with \(00\text{,}\) so we have over-counted these exactly one time before we subtract them out. [🔗](#subsec-pie-7-2-1) [🔗](#subsec-pie-7-2) [🔗](#subsec-pie-7)For three sets, we can also count the elements in the union by carefully removing elements we have counted multiple times. Since there are more ways for the sets to overlap, the formula is more complicated.[🔗](#subsec-pie-8)

#### Theorem 3.3.6. Cardinality of a Union (3 Sets).

For any finite sets \(A\text{,}\) \(B\text{,}\) and \(C\text{,}\) \begin{align*} \card{A \cup B \cup C} = \amp \card{A} + \card{B} + \card{C} \\ - \amp \card{A \cap B} - \card{A \cap C} - \card{B \cap C} \\ + \amp \card{A \cap B \cap C} \text{.} \end{align*} [🔗](#thm-pie-3-4-1) [🔗](#thm-pie-3)To determine how many elements are in at least one of \(A\text{,}\) \(B\text{,}\) or \(C\) we add up all the elements in each of those sets. However, when we do that, any element in both \(A\) and \(B\) is counted twice. Also, each element in both \(A\) and \(C\) is counted twice, as are elements in \(B\) and \(C\text{,}\) so we take each of those out of our sum once. But now what about the elements which are in \(A \cap B \cap C\) (in all three sets)? We added them in three times, but also removed them three times. They have not yet been counted. Thus we add those elements back in at the end.[🔗](#subsec-pie-10)

#### Example 3.3.7.

How many of the numbers in \(\{1, 2, \ldots, 50\}\) are multiples of 2, 3, or 5?[🔗](#subsec-pie-11-1-1) Solution. Of the numbers in \(\{1, 2, \ldots, 50\}\text{,}\) let \(A\) be the set of multiples of 2, \(B\) be the set of multiples of 3, and \(C\) be the set of multiples of 5. We have \(\card{A} = 25\text{,}\) \(\card{B} = 16\text{,}\) and \(\card{C} = 10\text{.}\) (These numbers can be found by division; for example, since a third of the numbers are multiples of three, we can compute \(50/3 = 16.66\text{,}\) so there are 16 multiples of 3 in the set.) Some of the numbers in the set are multiples of both 2 and 3, such as \(6, 12, 18,\ldots\) all the multiples of 6. There are \(\card{A \cap B} = 8\) such numbers. Similarly, there are \(\card{A \cap C} = 5\) multiples of both 2 and 5 (multiples of 10), and \(\card{B \cap C} = 3\) multiples of both 3 and 5 (multiples of 15). There is \(\card{A \cap B \cap C} = 1\) multiples of all three (just the number 30).[🔗](#subsec-pie-11-2-1) Using [Theorem 3.3.6](sec_counting-non-disjoint.html#thm-pie-3), we have: \begin{equation*} \card{A \cup B \cup C} = 25 + 16 + 10 - 8 - 5 - 3 + 1 = 36\text{.} \end{equation*} [🔗](#subsec-pie-11-2-2) Let’s use this example to understand the theorem better. Consider the number \(21\text{.}\) In which sets is it counted? It is in \(B\text{,}\) but not \(A\) or \(C\text{,}\) so it is counting among the 16 multiples of \(3\) and not counted in any of the other sets, so it is included exactly once in our complete count. Similarly for all other numbers that are multiples of just one of \(2\text{,}\) \(3\text{,}\) or \(5\text{.}\)[🔗](#subsec-pie-11-2-3) The number \(18\) is in sets \(A\) and \(B\text{,}\) and so also in \(A \cap B\text{.}\) It is counted in the 25 multiples of \(2\text{,}\) the 16 multiples of \(3\text{,}\) and the 8 multiples of \(6\text{.}\) So it is added twice in our total and subtracted once, meaning it is counted exactly one time. The same will be true of all numbers that belong to exactly two of the individual sets.[🔗](#subsec-pie-11-2-4) What about \(30\text{?}\) It belongs to all the sets. It is therefore added to our total three times, when we add the multiples of \(2\text{,}\) \(3\text{,}\) and \(5\text{.}\) But it is also subtracted three times, once for each of the three pairs of sets. So it is not counted at all in our total... until we add it back in in the last step, after which it is counted exactly once.[🔗](#subsec-pie-11-2-5) [🔗](#subsec-pie-11-2) [🔗](#subsec-pie-11) This process of adding in, then subtracting out, then adding back in, and so on is called the Principle of Inclusion/Exclusion, or simply PIE. This principle can be applied to any number of sets, but the formula becomes more and more complicated the more sets you have. For example, this is what PIE looks like for four sets. \begin{align*} \card{A \cup B \cup C \cup D} = \amp \card{A} + \card{B} + \card{C} + \card{D} \\ - \amp \card{A \cap B} - \card{A \cap C} - \card {A \cap D} - \card{B \cap C} - \card{B \cap D} - \card{C \cap D}\\ + \amp \card{A \cap B \cap C} + \card{A \cap B \cap D} + \card{A \cap C \cap D} + \card{B \cap C \cap D}\\ - \amp \card{A \cap B \cap C \cap D} \text{.} \end{align*} Phew! And for five sets it is... just kidding. But even if we don’t write it down, hopefully we all see what you *would* have to write down. In practice, PIE for more than three sets is only used when we can simplify the computation by recognizing that, for example, all the intersections of two sets will have the same size. Some examples of this are explored in [Section 3.8](sec_advPIE.html). [🔗](#subsec-pie-12) [🔗](#subsec-pie)

### Subsection Overlaps and the Product Principle

Everything we have considered so far in this section has been about how the sum principle applies when the sets of outcomes are not disjoint. Do we need to be similarly worried about overlaps when applying the product principle?[🔗](#subsec-overlaps-and-the-product-principle-2) Not really.[🔗](#subsec-overlaps-and-the-product-principle-3) One use of the product principle is to compute probabilities, and in that context, we do make a distinction between events being independent or dependent. We will explore this more in [Section 3.7](sec-counting-probability.html). Essentially, to find the probability of two events occuring, we can multiply their respective probabilities if and only if the two events are *independent*: if the outcome of one event does not affect the outcome of the other.[🔗](#subsec-overlaps-and-the-product-principle-4) While finding probability is closely related to counting outcomes, the product principle itself does not require that sets of outcomes be disjoint or make a distinction between dependent or independent events. What *does* matter is that the number of outcomes for the second event does not change based on which outcome was the result of the first event.[🔗](#subsec-overlaps-and-the-product-principle-5) A distinction we *do* often make when applying the product principle is whether the outcomes of events can be “repeated.” Consider the following example.[🔗](#subsec-overlaps-and-the-product-principle-6)

#### Example 3.3.8.

How many 3-letter words (sequences of three letters) are there when,

1. repeats are allowed? [🔗](#subsec-overlaps-and-the-product-principle-7-1-1-1-1)
2. repeats are not allowed? [🔗](#subsec-overlaps-and-the-product-principle-7-1-1-1-2)

[🔗](#subsec-overlaps-and-the-product-principle-7-1-1) Solution. Being careful with the product principle, we are combining three events: \(A\) is the event of selecting the first letter, \(B\) is the event of selecting the second letter, and \(C\) is the event of selecting the third letter. If we want to count the number of words when letters in the word can be repeated, then each event contains 26 outcomes. So the number of 3-letter words is \(26^3 = 17,576\) when repeats are allowed.[🔗](#subsec-overlaps-and-the-product-principle-7-2-1) When repeats are not allowed, then the number of outcomes for event \(A\) is still 26, but the number of outcomes for \(B\) is only 25, since no matter what the outcome of event \(A\) is, that letter cannot be selected for the second position in the word. Similarly, no matter what the outcomes of event \(A\) and \(B\) are, the number of outcomes for event \(C\) is always 24: any letter not selected in the first two events. Thus the number of 3-letter words containing no repeated letters is \(26\cdot 25\cdot 24 = 15,600\text{.}\)[🔗](#subsec-overlaps-and-the-product-principle-7-2-2) It’s a little strange that the actual set of outcomes for event \(B\) is different for each possible outcome of event \(A\text{.}\) This doesn’t matter though, as long as the *size* of the outcome set doesn’t change.[🔗](#subsec-overlaps-and-the-product-principle-7-2-3) [🔗](#subsec-overlaps-and-the-product-principle-7-2) [🔗](#subsec-overlaps-and-the-product-principle-7)We will explore problems such as the previous example in much more depth next in [Section 3.4](sec_counting-combperm.html). Before that though, here is a final example of where the product principle does NOT easily work.[🔗](#subsec-overlaps-and-the-product-principle-8)

#### Example 3.3.9.

Explain why the product principle does NOT apply to the following counting question: How many 3-letter words have their letters in alphabetical order?[🔗](#subsec-overlaps-and-the-product-principle-9-1-1) Solution. The first thing we might try is to make event \(A\) be selecting the first letter, \(B\) be selecting the second letter, and \(C\) be selecting the third letter. There are 26 outcomes to event \(A\text{.}\) How many outcomes are there for event \(B\text{?}\) If we selected \(w\) as the first letter, then we can select a letter in the set \(\{w, x, y, z\}\) as our second letter, so it appears there are \(4\) outcomes for event \(B\text{.}\) However, if we selected \(a\) as our first letter, then any letter could be used for the second letter, so event \(B\) has \(26\) outcomes. Oh no![🔗](#subsec-overlaps-and-the-product-principle-9-2-1) The problem is that the number of outcomes for the second (and third) letter in the word changes depending on the outcome of the previous event. The events are not independent, but more than that, their *size* is not independent, so the product principle does not apply.[🔗](#subsec-overlaps-and-the-product-principle-9-2-2) [🔗](#subsec-overlaps-and-the-product-principle-9-2) [🔗](#subsec-overlaps-and-the-product-principle-9)We will see how to answer the counting problem above in the case that letters can be repeated in [Section 3.5](sec_counting-multisets.html). If we restricted the question further and required that the letters be distinct (and in alphabetical order), we already know how to answer the question. Since for any *set* of three letters, there is exactly one 3-letter word that has those letters in alphabetical order, we can simply count the number of sets of three letters. This is \(\binom{26}{3}\text{.}\) Then we just look at [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large) to find the value... oh shoot. Our triangle doesn’t go down that far. I guess we should think of a way to compute the value without the triangle. Read on![🔗](#subsec-overlaps-and-the-product-principle-10) [🔗](#subsec-overlaps-and-the-product-principle)

### Reading Questions Reading Questions

#### 1.

Which of the following best describes what the Principle of Inclusion/Exclusion is used for?[🔗](#rq-counting-non-disjoint-pie-1-1)

- To count the size of a union of two or more not-necessarily disjoint sets.
- That is correct. Note that the Principle of Inclusion/Exclusion works just great even if the sets are disjoint; all the intersections just have size 0.
- To count the size of the union of two or more sets, as long as they are disjoint.
- If the sets are disjoint, you do not need to use the Principle of Inclusion/Exclusion. You can just add the sizes of the sets.
- To count the size of the intersection of two or more independent sets of outcomes.
- The Principle of Inclusion/Exclusion includes intersections of sets, but it is not used to find the size of the intersections.
- To find the size of the intersection of dependent sets of outcomes.
- The Principle of Inclusion/Exclusion includes intersections of sets, but it is not used to find the size of the intersections.

[🔗](#rq-counting-non-disjoint-pie)

#### 2.

Why does the Principle of Inclusion/Exclusion *add* the size of the intersection of three sets, rather than subtract? Explain in your own words.[🔗](#rq-counting-non-disjoint-3set-1-1) [🔗](#rq-counting-non-disjoint-3set)

#### 3.

What questions do you have after reading this section? Write at least one question about the section you are curious about.[🔗](#rq-counting-non-disjoint-q-1-1) [🔗](#rq-counting-non-disjoint-q)[🔗](#rqs-counting-non-disjoint)

### Exercises Practice Problems

#### 1.

Activate Suppose you have sets \(A\) and \(B\) with \(\card{A} = 11\) and \(\card{B} = 19\text{.}\)[🔗](#extracted-webwork-103-1-1-1)

#### (a)

What is the largest possible value for \(\card{A \cap B}\text{?}\)[🔗](#extracted-webwork-103-1-2-1-1) [🔗](#extracted-webwork-103-1-2)

#### (b)

What is the smallest possible value for \(\card{A \cap B}\text{?}\)[🔗](#extracted-webwork-103-1-3-1-1) [🔗](#extracted-webwork-103-1-3)

#### (c)

What are the possible values for \(\card{A \cup B}\text{?}\)[🔗](#extracted-webwork-103-1-4-1-1) \(\le \card{A \cup B} \le\) [🔗](#extracted-webwork-103-1-4-1-2) [🔗](#extracted-webwork-103-1-4) [🔗](#ww-addmult-pie-possible)

#### 2.

Activate If \(\card{A} = 7\) and \(\card{B} = 11\text{,}\) what is \(\card{A \cup B} + \card{A \cap B}\text{?}\)[🔗](#extracted-webwork-104-1-1-1) [🔗](#ww-addmult-union-plus-int)

#### 3.

Activate A group of college students was asked about their TV watching habits. Of those surveyed, 29 students watch *The Walking Dead*, 24 watch *The Blacklist*, and 27 watch *Game of Thrones*. Additionally, 10 watch *The Walking Dead* and *The Blacklist*, 13 watch *The Walking Dead* and *Game of Thrones*, and 17 watch *The Blacklist* and *Game of Thrones*. There are 8 students who watch all three shows. How many students surveyed watched at least one of the shows?[🔗](#extracted-webwork-105-1-1-1) [🔗](#ww-addmult-pie-tv)

#### 4.

Activate In a recent survey, 115 students reported whether they liked their potatoes mashed, French-fried, or twice-baked. 53 liked them mashed, 51 liked French fries, and 70 liked twice baked potatoes. Additionally, 22 students liked both mashed and French-fried potatoes, 33 liked French fries and twice baked potatoes, 36 liked mashed and baked, and 16 liked all three styles. How many students *hate* potatoes? Explain why your answer is correct.[🔗](#extracted-webwork-106-1-1-1) [🔗](#ww-addmult-pie-potato)

#### 5.

Activate How many \(14\)-bit strings (that is, bit strings of length 14) are there which:

1. Start with the sub-string 011?[🔗](#extracted-webwork-107-1-1-1-2-1-1) [🔗](#extracted-webwork-107-1-1-1-2-1)
2. Have weight 8 (i.e., contain exactly 8 1’s) and start with the sub-string 011?[🔗](#extracted-webwork-107-1-1-1-2-2-1) [🔗](#extracted-webwork-107-1-1-1-2-2)
3. Either start with \(011\) or end with \(01\) (or both)?[🔗](#extracted-webwork-107-1-1-1-2-3-1) [🔗](#extracted-webwork-107-1-1-1-2-3)
4. Have weight 8 and either start with \(011\) or end with \(01\) (or both)?[🔗](#extracted-webwork-107-1-1-1-2-4-1) [🔗](#extracted-webwork-107-1-1-1-2-4)

[🔗](#extracted-webwork-107-1-1-1) [🔗](#ww-binom-bitstrings)

#### 6.

Activate For how many \(n \in \{1,2, \ldots, 790\}\) is \(n\) a multiple of one or more of 8, 5, or 9?[🔗](#extracted-webwork-108-1-1-1) Hint. To find out how many numbers are divisible by 8 and 9, for example, take \(790/(8\cdot9)\) and round down.[🔗](#extracted-webwork-108-1-2-1) [🔗](#extracted-webwork-108-1-2) [🔗](#ww-addmult-pie-multiples1)

#### 7.

Activate How many positive integers less than 850 are multiples of 9, 5, or 2? Use the Principle of Inclusion/Exclusion.[🔗](#extracted-webwork-109-1-1-1) [🔗](#ww-addmult-pie-multiples2)

#### 8.

Activate We want to build 12 letter “words” using only the first \(n =7\) letters of the alphabet. For example, if \(n = 5\) we can use the first 5 letters, \(\{a, b, c, d, e \}\) (Recall, words are just strings of letters, not necessarily actual English words.)

1. How many of these words are there total?[🔗](#extracted-webwork-110-1-1-1-6-1-1) [🔗](#extracted-webwork-110-1-1-1-6-1)
2. How many of these words contain no repeated letters?[🔗](#extracted-webwork-110-1-1-1-6-2-1) [🔗](#extracted-webwork-110-1-1-1-6-2)
3. How many of these words start with the sub-word “ade”?[🔗](#extracted-webwork-110-1-1-1-6-3-1) [🔗](#extracted-webwork-110-1-1-1-6-3)
4. How many of these words either start with “ade” or end with “be” or both?[🔗](#extracted-webwork-110-1-1-1-6-4-1) [🔗](#extracted-webwork-110-1-1-1-6-4)
5. How many of the words containing no repeats also do not contain the sub-word “bed”?[🔗](#extracted-webwork-110-1-1-1-6-5-1) [🔗](#extracted-webwork-110-1-1-1-6-5)

[🔗](#extracted-webwork-110-1-1-1) [🔗](#ww-addmult-words)

#### 9.

Activate Gridtown USA, besides having excellent donut shops, is known for its precisely laid out grid of streets and avenues. Streets run east-west, and avenues north-south, for the entire stretch of the town, never curving and never interrupted by parks or schools or the like.[🔗](#extracted-webwork-111-1-1-1) Suppose you live on the corner of 5th and 5th and work on the corner of 18th and 18th. Thus you must travel 26 blocks to get to work as quickly as possible.

1. How many different routes can you take to work, assuming you want to get there as quickly as possible?[🔗](#extracted-webwork-111-1-1-2-1-1-1) [🔗](#extracted-webwork-111-1-1-2-1-1)

[🔗](#extracted-webwork-111-1-1-2)

1. Now suppose you want to stop and get a donut on the way to work, from your favorite donut shop on the corner of 15th Ave. and 14th St. How many routes to work, stopping at the donut shop, can you take (again, ensuring the shortest possible route)?[🔗](#extracted-webwork-111-1-1-3-1-1-1) [🔗](#extracted-webwork-111-1-1-3-1-1)

[🔗](#extracted-webwork-111-1-1-3)

1. Disaster Strikes Gridtown: there is a pothole on 6th Ave. between 7th St. and 8th St. How many routes to work can you take avoiding that unsightly (and dangerous) stretch of road?[🔗](#extracted-webwork-111-1-1-4-1-1-1) [🔗](#extracted-webwork-111-1-1-4-1-1)

[🔗](#extracted-webwork-111-1-1-4)

1. The pothole has been repaired (phew!) and a new donut shop has opened on the corner of 6th Ave. and 7th St. How many routes to work drive by one or the other (or both) donut shops? Hint: the donut shops serve PIE.[🔗](#extracted-webwork-111-1-1-5-1-1-1) [🔗](#extracted-webwork-111-1-1-5-1-1)

[🔗](#extracted-webwork-111-1-1-5) [🔗](#ww-binom-gridtown)[🔗](#practice_counting-repeats)

### Exercises Additional Exercises

#### 1.

Let \(A\text{,}\) \(B\text{,}\) and \(C\) be sets.

1. Find \(\card{(A \cup C)\setminus B}\) provided \(\card{A} = 50\text{,}\) \(\card{B} = 45\text{,}\) \(\card{C} = 40\text{,}\) \(\card{A\cap B} = 20\text{,}\) \(\card{A \cap C} = 15\text{,}\) \(\card{B \cap C} = 23\text{,}\) and \(\card{A \cap B \cap C} = 12\text{.}\) [🔗](#exercises_counting-repeats-2-1-1-4-1)
2. Describe a set in terms of \(A\text{,}\) \(B\text{,}\) and \(C\) with cardinality 26. [🔗](#exercises_counting-repeats-2-1-1-4-2)

[🔗](#exercises_counting-repeats-2-1-1) Hint. For part (a) you could use the formula for PIE, but for part (b) you might be better off drawing a Venn diagram.[🔗](#exercises_counting-repeats-2-2-1) [🔗](#exercises_counting-repeats-2-2) [🔗](#exercises_counting-repeats-2)

#### 2.

For how many three-digit numbers (100 to 999) is the *sum of the digits* even? (For example, \(343\) has an even sum of digits: \(3+4+3 = 10\) which is even.) Find the answer and explain why it is correct in at least two *different* ways.[🔗](#exercises_counting-repeats-3-1-1) Hint. You could consider cases. For example, any number of the form ODD-ODD-EVEN will have an even sum. Alternatively, how many three-digit numbers have the sum of their digits even if the first two digits are 54? What if the first two digits are 19?[🔗](#exercises_counting-repeats-3-2-1) [🔗](#exercises_counting-repeats-3-2) [🔗](#exercises_counting-repeats-3)[🔗](#exercises_counting-repeats)[🔗](#sec_counting-non-disjoint) [&#xe5cb;Prev](sec_counting-combine-outcomes.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_counting-combperm.html) [Feedback](/cdn-cgi/l/email-protection#c7a8b4a4a6b5e9aba2b1aea987b2a9a4a8e9a2a3b2)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_counting-non-disjoint-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_counting-non-disjoint-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 3.6 Combinatorial Proofs

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_comb-proofs-4-1-1)

1. Write counting problems that have a given answer.[🔗](#sec_comb-proofs-4-2-1-1) [🔗](#sec_comb-proofs-4-2-1)
2. Write two different solutions to a counting problem.[🔗](#sec_comb-proofs-4-2-2-1) [🔗](#sec_comb-proofs-4-2-2)
3. Prove binomial identities using combinatorial proofs.[🔗](#sec_comb-proofs-4-2-3-1) [🔗](#sec_comb-proofs-4-2-3)

[🔗](#sec_comb-proofs-4)

### Subsection Section Preview

#### Investigate!

Look at any cell in the interior [Pascal’s triangle](sec_counting-pascal.html#fig-pascal-large) and the six numbers that surround it. For example, you might look at this cell:[🔗](#sec_comb-proofs-5-2-1-1) ![a cell in Pascal’s triangle surrounded by six other cells.](generated/latex-image/img-pascal-hexagaon.svg) Of the six numbers surrounding our selected cell, we will divide them into two groups of three, alternating between the groups. So for this example, we have a group with 4, 10, and 15, and a second group with 5, 6, and 20. But notice: \begin{equation*} 4\cdot 10 \cdot 15 = 600 = 5\cdot 6 \cdot 20\text{.} \end{equation*} Does this work no matter what center cell you pick? Why?? [🔗](#sec_comb-proofs-5-2-1-3) [🔗](#sec_comb-proofs-5-2)One of the coolest things about combinatorics is that you can often answer the same counting question in dramatically different ways. When we recognize this about a particular problem, we can often generalize the question to reveal two different expressions that must represent the same quantity. The counting problem itself becomes a proof of the equality of the two expressions. This style of proof is called a combinatorial proof.[🔗](#sec_comb-proofs-5-3)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=Activity-13-combinatorial-proofs)

It is often possible to find the answer to a counting question in two different ways. Doing so results in two formulas that give the answer, which might look different, but must be equal (since they are both the correct answer to the same question). This provides a proof of the equality of the two formulas, called a combinatorial proof.[🔗](#Activity-13-combinatorial-proofs-2-1-1) Let’s explore a couple of examples.[🔗](#Activity-13-combinatorial-proofs-2-1-2)

#### 1.

Activate Consider the set of 7-bit strings of weight 3. That is, strings of 0s and 1s that are seven characters long and have exactly three 1s. How many such strings are there?[🔗](#extracted-webwork-137-1-1-1)

#### (a)

Give the answer as a single binomial coefficient.[🔗](#extracted-webwork-137-1-2-1-1) [🔗](#extracted-webwork-137-1-2)

#### (b)

Now count just those 7-bit strings of weight 3 that start with a 1. How many are there?[🔗](#extracted-webwork-137-1-3-1-1) [🔗](#extracted-webwork-137-1-3)

#### (c)

Now count just those 7-bit strings of weight 3 that start with 01. How many are there?[🔗](#extracted-webwork-137-1-4-1-1) [🔗](#extracted-webwork-137-1-4)

#### (d)

Now count just those 7-bit strings of weight 3 that start with 001. How many are there?[🔗](#extracted-webwork-137-1-5-1-1) [🔗](#extracted-webwork-137-1-5)

#### (e)

Continue this process until you have counted all 7-bit strings of weight 3, as a *sum* of binomial coefficients. What is this sum?[🔗](#extracted-webwork-137-1-6-1-1) [🔗](#extracted-webwork-137-1-6) [🔗](#ws-comb-proof-bitstrings)

#### 2.

Activate Consider the counting question “How many ways can you permute the letters of the word *STATISTICS*?” Note that this is not just a permutation, since there are repeated letters.[🔗](#extracted-webwork-138-1-1-1)

#### (a)

How many ways can you select three of the ten positions in the anagram to be occupied by the letter *S*?[🔗](#extracted-webwork-138-1-2-1-1) [🔗](#extracted-webwork-138-1-2)

#### (b)

How many ways can you select three of the remaining seven positions in the anagram to be occupied by the letter *T*?[🔗](#extracted-webwork-138-1-3-1-1) [🔗](#extracted-webwork-138-1-3)

#### (c)

Continue with this approach until you have found an expression for the number of ways to permute the letters of *STATISTICS* as a product of binomial coefficients. Write out this product.[🔗](#extracted-webwork-138-1-4-1-1) [🔗](#extracted-webwork-138-1-4)

#### (d)

Now answer the counting question again, this time starting by asking how many ways you can select positions for the letter *A* first. Continue in any way you like until you have found a different expression for the number of ways to permute the letters of *STATISTICS* as a product of binomial coefficients. Write out this product.[🔗](#extracted-webwork-138-1-5-1-1) [🔗](#extracted-webwork-138-1-5)

#### (e)

Try yet another approach. What is wrong with saying the answer is \(10!\text{?}\) This is too large, but we can correct it by dividing to account for outcomes that are equivalent. What should you divide by?[🔗](#extracted-webwork-138-1-6-1-1) Write your answer as a quotient of factorials. Do you get the same answer as before?[🔗](#extracted-webwork-138-1-6-1-2) [🔗](#extracted-webwork-138-1-6) [🔗](#ws-comb-proofs-anagram)[🔗](#Activity-13-combinatorial-proofs)[🔗](#sec_comb-proofs-5)

### Subsection Patterns in Pascal’s Triangle

Have a look again at Pascal’s triangle. Forget for a moment where it comes from. Just look at it as a mathematical object. What do you notice?[🔗](#subsec_patternsPascal-3) ![The first 7 rows of Pascal’s triangle. A triangular array of hexagons, each row containing one more hexagon that the row above it. In each hexagon is an integer: 1’s on the border of the triangle, and every integer inside the triangle the sum of the two integers above it. The last row contains the numbers 1, 7, 21, 35, 35, 21, 7, and 1.](generated/latex-image/pascal-small.svg) There are lots of patterns hidden away in the triangle, enough to fill a reasonably sized book. Here are just a few of the most obvious ones:

1. The entries on the border of the triangle are all 1.[🔗](#subsec_patternsPascal-5-1-1-1) [🔗](#subsec_patternsPascal-5-1-1)
2. Any entry not on the border is the sum of the two entries above it.[🔗](#subsec_patternsPascal-5-1-2-1) [🔗](#subsec_patternsPascal-5-1-2)
3. The triangle is symmetric. In any row, entries on the left side are mirrored on the right side.[🔗](#subsec_patternsPascal-5-1-3-1) [🔗](#subsec_patternsPascal-5-1-3)
4. The sum of all entries on a given row is a power of 2. (You should check this!)[🔗](#subsec_patternsPascal-5-1-4-1) [🔗](#subsec_patternsPascal-5-1-4)

[🔗](#subsec_patternsPascal-5) We would like to state these observations in a more precise way, and then prove that they are correct. Now each entry in Pascal’s triangle is in fact a binomial coefficient. The 1 on the very top of the triangle is \(\binom{0}{0}\text{.}\) The next row (which we will call row 1, even though it is not the top-most row) consists of \(\binom{1}{0}\) and \(\binom{1}{1}\text{.}\) Row 4 (the row 1, 4, 6, 4, 1) consists of the binomial coefficients \begin{equation*} \binom{4}{0} ~~ \binom{4}{1} ~~ \binom{4}{2} ~~ \binom{4}{3} ~~ \binom{4}{4}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-6) Given this description of the elements in Pascal’s triangle, we can rewrite the above observations as follows:

1. \(\binom{n}{0} = 1\) and \(\binom{n}{n} = 1\text{.}\) [🔗](#subsec_patternsPascal-7-2-1)
2. \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\) [🔗](#subsec_patternsPascal-7-2-2)
3. \(\binom{n}{k} = \binom{n}{n-k}\text{.}\) [🔗](#subsec_patternsPascal-7-2-3)
4. \(\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n} = 2^n\text{.}\) [🔗](#subsec_patternsPascal-7-2-4)

[🔗](#subsec_patternsPascal-7) Each of these is an example of a binomial identity : an identity (i.e., equation) involving binomial coefficients.[🔗](#subsec_patternsPascal-8) Our goal is to establish these identities. We wish to prove that they hold for all values of \(n\) and \(k\text{.}\) These proofs can be done in many ways. One option would be to give algebraic proofs, using the formula for \(\binom{n}{k}\text{:}\) \begin{equation*} \binom{n}{k} = \frac{n!}{(n-k)!\,k!}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-9) Here’s how you might do that for the second identity above.[🔗](#subsec_patternsPascal-10)

#### Example 3.6.1.

Give an algebraic proof for the binomial identity \begin{equation*} \binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-11-1-1) Solution.

#### Proof.

By the definition of \(\binom{n}{k}\text{,}\) we have \begin{equation*} \binom{n-1}{k-1} = \frac{(n-1)!}{(n-1-(k-1))!(k-1)!} = \frac{(n-1)!}{(n-k)!(k-1)!} \end{equation*} and \begin{equation*} \binom{n-1}{k} = \frac{(n-1)!}{(n-1-k)!k!}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-11-2-1-1) Thus, starting with the right-hand side of the equation: \begin{align*} \binom{n-1}{k-1} + \binom{n-1}{k} \amp = \frac{(n-1)!}{(n-k)!(k-1)!}+ \frac{(n-1)!}{(n-1-k)!\,k!}\\ \amp = \frac{(n-1)!k}{(n-k)!\,k!} + \frac{(n-1)!(n-k)}{(n-k)!\,k!}\\ \amp = \frac{(n-1)!(k+n-k)}{(n-k)!\,k!}\\ \amp = \frac{n!}{(n-k)!\, k!}\\ \amp = \binom{n}{k}\text{.} \end{align*} [🔗](#subsec_patternsPascal-11-2-1-2) The second line (where the common denominator is found) works because \(k(k-1)! = k!\) and \((n-k)(n-k-1)! = (n-k)!\text{.}\)[🔗](#subsec_patternsPascal-11-2-1-3) [🔗](#subsec_patternsPascal-11-2-1)[🔗](#subsec_patternsPascal-11-2) [🔗](#subsec_patternsPascal-11)This is certainly a valid proof but also is entirely useless. Even if you understand the proof perfectly, it does not tell you *why* the identity is true. A better approach would be to explain what \(\binom{n}{k}\) *means* and then say why that is also what \(\binom{n-1}{k-1} + \binom{n-1}{k}\) means. Let’s see how this works for the four identities we observed above.[🔗](#subsec_patternsPascal-12)

#### Example 3.6.2.

Explain why \(\binom{n}{0} = 1\) and \(\binom{n}{n} = 1\text{.}\)[🔗](#subsec_patternsPascal-13-1-1) Solution. What do these binomial coefficients tell us? Well, \(\binom{n}{0}\) gives the number of ways to select 0 objects from a collection of \(n\) objects. There is only one way to do this, namely to not select any of the objects. Thus \(\binom{n}{0} = 1\text{.}\) Similarly, \(\binom{n}{n}\) gives the number of ways to select \(n\) objects from a collection of \(n\) objects. There is only one way to do this: Select all \(n\) objects. Thus \(\binom{n}{n} = 1\text{.}\)[🔗](#subsec_patternsPascal-13-2-1) Alternatively, we know that \(\binom{n}{0}\) is the number of \(n\)-bit strings with weight 0. There is only one such string, the string of all 0’s. So \(\binom{n}{0} = 1\text{.}\) Similarly \(\binom{n}{n}\) is the number of \(n\)-bit strings with weight \(n\text{.}\) There is only one string with this property, the string of all 1’s.[🔗](#subsec_patternsPascal-13-2-2) Another way: \(\binom{n}{0}\) gives the number of subsets of a set of size \(n\) containing 0 elements. There is only one such subset, the empty set. \(\binom{n}{n}\) gives the number of subsets containing \(n\) elements. The only such subset is the original set (of all elements).[🔗](#subsec_patternsPascal-13-2-3) [🔗](#subsec_patternsPascal-13-2) [🔗](#subsec_patternsPascal-13)

#### Example 3.6.3.

Explain why \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\)[🔗](#subsec_patternsPascal-14-1-1) Solution. The easiest way to see this is to consider bit strings. \(\binom{n}{k}\) is the number of bit strings of length \(n\) containing \(k\) 1’s. Of all of these strings, some start with a 1 and the rest start with a 0. First consider all the bit strings which start with a 1. After the 1, there must be \(n-1\) more bits (to get the total length up to \(n\)) and exactly \(k-1\) of them must be 1’s (as we already have one, and we need \(k\) total). How many strings are there like that? There are exactly \(\binom{n-1}{k-1}\) such bit strings, so of all the length \(n\) bit strings containing \(k\) 1’s, \(\binom{n-1}{k-1}\) of them start with a 1. Similarly, there are \(\binom{n-1}{k}\) which start with a 0 (we still need \(n-1\) bits and now \(k\) of them must be 1’s). Since there are \(\binom{n-1}{k}\) bit strings containing \(n-1\) bits with \(k\) 1’s, that is the number of length \(n\) bit strings with \(k\) 1’s which start with a 0. Therefore \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\)[🔗](#subsec_patternsPascal-14-2-1) Another way: Consider the question, how many ways can you select \(k\) pizza toppings from a menu containing \(n\) choices? One way to do this is just \(\binom{n}{k}\text{.}\) Another way to answer the same question is to first decide whether or not you want anchovies. If you do want anchovies, you still need to pick \(k-1\) toppings, now from just \(n-1\) choices. That can be done in \(\binom{n-1}{k-1}\) ways. If you do not want anchovies, then you still need to select \(k\) toppings from \(n-1\) choices (the anchovies are out). You can do that in \(\binom{n-1}{k}\) ways. Since the choices with anchovies are disjoint from the choices without anchovies, the total choices are \(\binom{n-1}{k-1}+\binom{n-1}{k}\text{.}\) But wait. We answered the same question in two different ways, so the two answers must be the same. Thus \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\text{.}\)[🔗](#subsec_patternsPascal-14-2-2) You can also explain (prove) this identity by counting subsets, or even lattice paths.[🔗](#subsec_patternsPascal-14-2-3) [🔗](#subsec_patternsPascal-14-2) [🔗](#subsec_patternsPascal-14)

#### Example 3.6.4.

Prove the binomial identity \(\binom{n}{k} = \binom{n}{n-k}\text{.}\)[🔗](#example-symmetry-formula-1-1) Solution. Why is this true? \(\binom{n}{k}\) counts the number of ways to select \(k\) things from \(n\) choices. On the other hand, \(\binom{n}{n-k}\) counts the number of ways to select \(n-k\) things from \(n\) choices. Are these really the same? Well, what if instead of selecting the \(n-k\) things you choose to exclude them. How many ways are there to choose \(n-k\) things to exclude from \(n\) choices? Clearly this is \(\binom{n}{n-k}\) as well (it doesn’t matter whether you include or exclude the things once you have chosen them). And if you exclude \(n-k\) things, then you are including the other \(k\) things. So the set of outcomes should be the same.[🔗](#example-symmetry-formula-2-1) Let’s try the pizza counting example like we did above. How many ways are there to pick \(k\) toppings from a list of \(n\) choices? On the one hand, the answer is simply \(\binom{n}{k}\text{.}\) Alternatively, you could make a list of all the toppings you don’t want. To end up with a pizza containing exactly \(k\) toppings, you need to pick \(n-k\) toppings to not put on the pizza. You have \(\binom{n}{n-k}\) choices for the toppings you don’t want. Both of these ways give you a pizza with \(k\) toppings, in fact all the ways to get a pizza with \(k\) toppings. Thus these two answers must be the same: \(\binom{n}{k} = \binom{n}{n-k}\text{.}\)[🔗](#example-symmetry-formula-2-2) You can also prove (explain) this identity using bit strings, subsets, or lattice paths. The bit string argument is nice: \(\binom{n}{k}\) counts the number of bit strings of length \(n\) with \(k\) 1’s. This is also the number of bit strings of length \(n\) with \(k\) 0’s (just replace each 1 with a 0 and each 0 with a 1). But if a string of length \(n\) has \(k\) 0’s, it must have \(n-k\) 1’s. And there are exactly \(\binom{n}{n-k}\) strings of length \(n\) with \(n-k\) 1’s.[🔗](#example-symmetry-formula-2-3) [🔗](#example-symmetry-formula-2) [🔗](#example-symmetry-formula)

#### Example 3.6.5.

Prove the binomial identity \(\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n} = 2^n\text{.}\)[🔗](#ex-comb-proof-rowsum-1-1) Solution. Let’s do a “pizza proof” again. We need to find a question about pizza toppings which has \(2^n\) as the answer. How about this: If a pizza joint offers \(n\) toppings, how many pizzas can you build using any number of toppings from no toppings to all toppings, using each topping at most once?[🔗](#ex-comb-proof-rowsum-2-1) On one hand, the answer is \(2^n\text{.}\) For each topping, you can say “yes” or “no,” so you have two choices for each topping.[🔗](#ex-comb-proof-rowsum-2-2) On the other hand, divide the possible pizzas into disjoint groups: the pizzas with no toppings, the pizzas with one topping, the pizzas with two toppings, etc. If we want no toppings, there is only one pizza like that (the empty pizza, if you will), but it would be better to think of that number as \(\binom{n}{0}\) since we choose 0 of the \(n\) toppings. How many pizzas have 1 topping? We need to choose 1 of the \(n\) toppings, so \(\binom{n}{1}\text{.}\) We have:[🔗](#ex-comb-proof-rowsum-2-3)

- Pizzas with 0 toppings: \(\binom{n}{0}\) [🔗](#ex-comb-proof-rowsum-2-4-1-1)
- Pizzas with 1 topping: \(\binom{n}{1}\) [🔗](#ex-comb-proof-rowsum-2-4-1-2)
- Pizzas with 2 toppings: \(\binom{n}{2}\) [🔗](#ex-comb-proof-rowsum-2-4-1-3)
- \(\displaystyle \vdots\) [🔗](#ex-comb-proof-rowsum-2-4-1-4)
- Pizzas with \(n\) toppings: \(\binom{n}{n}\text{.}\) [🔗](#ex-comb-proof-rowsum-2-4-1-5)

[🔗](#ex-comb-proof-rowsum-2-4) The total number of possible pizzas will be the sum of these, which is exactly the left-hand side of the identity we are trying to prove.[🔗](#ex-comb-proof-rowsum-2-5) Again, we could have proved the identity using subsets, bit strings, or lattice paths (although the lattice path argument is a little tricky).[🔗](#ex-comb-proof-rowsum-2-6) [🔗](#ex-comb-proof-rowsum-2) [🔗](#ex-comb-proof-rowsum)Hopefully this gives some idea of how explanatory proofs of binomial identities can go. It is worth pointing out that more traditional proofs can also be beautiful. 4 Most every binomial identity can be proved using mathematical induction, using the recursive definition for \(\binom{n}{k}\text{.}\) We will discuss induction in [Section 4.5](sec_seq-induction.html). For example, consider the following rather slick proof of the last identity.[🔗](#subsec_patternsPascal-17) Expand the binomial \((x+y)^n\text{:}\) \begin{equation*} (x + y)^n = \binom{n}{0}x^n + \binom{n}{1}x^{n-1}y + \binom{n}{2}x^{n-2}y^2 + \cdots + \binom{n}{n-1}x\cdot y^{n-1} + \binom{n}{n}y^n\text{.} \end{equation*} [🔗](#subsec_patternsPascal-18) Let \(x = 1\) and \(y = 1\text{.}\) We get: \begin{equation*} (1 + 1)^n = \binom{n}{0}1^n + \binom{n}{1}1^{n-1}1 + \binom{n}{2}1^{n-2}1^2 + \cdots + \binom{n}{n-1}1\cdot 1^{n-1} + \binom{n}{n}1^n\text{.} \end{equation*} [🔗](#subsec_patternsPascal-19) Of course this simplifies to: \begin{equation*} (2)^n = \binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n-1} + \binom{n}{n}\text{.} \end{equation*} [🔗](#subsec_patternsPascal-20) Something fun to try: Let \(x = 1\) and \(y = 2\text{.}\) Neat huh?[🔗](#subsec_patternsPascal-21) [🔗](#subsec_patternsPascal)

### Subsection More Proofs

The explanatory proofs given in the above examples are typically called combinatorial proofs. In general, to give a combinatorial proof for a binomial identity, say \(A = B\text{,}\) you do the following:[🔗](#subsec_moreProofs-2)

1. Find a counting problem you will be able to answer in two ways.[🔗](#subsec_moreProofs-3-1-1-1) [🔗](#subsec_moreProofs-3-1-1)
2. Explain why one answer to the counting problem is \(A\text{.}\)[🔗](#subsec_moreProofs-3-1-2-1) [🔗](#subsec_moreProofs-3-1-2)
3. Explain why the other answer to the counting problem is \(B\text{.}\)[🔗](#subsec_moreProofs-3-1-3-1) [🔗](#subsec_moreProofs-3-1-3)

[🔗](#subsec_moreProofs-3) Since both \(A\) and \(B\) are the answers to the same question, we must have \(A = B\text{.}\)[🔗](#subsec_moreProofs-4) The tricky thing is coming up with the question. This is not always obvious, but it gets easier the more counting problems you solve. You will start to recognize types of answers as the answers to types of questions. More often what will happen is that you will be solving a counting problem and happen to think up two different ways of finding the answer. Now you have a binomial identity, and the proof is right there. The proof *is* the problem you just solved together with your two solutions.[🔗](#subsec_moreProofs-5) For example, consider this counting question:[🔗](#subsec_moreProofs-6)

> How many 10-letter words use exactly four A’s, three B’s, two C’s, and one D?[🔗](#subsec_moreProofs-7-1)
> > [🔗](#subsec_moreProofs-7)

Let’s try to solve this problem. We have 10 spots for letters to go. Four of those need to be A’s. We can pick the four A-spots in \(\binom{10}{4}\) ways. Now where can we put the B’s? Well there are only 6 spots left; we need to pick \(3\) of them. This can be done in \(\binom{6}{3}\) ways. The two C’s need to go in two of the 3 remaining spots, so we have \(\binom{3}{2}\) ways of doing that. That leaves just one spot of the D, but we could write that 1 choice as \(\binom{1}{1}\text{.}\) Thus the answer is: \begin{equation*} \binom{10}{4}\binom{6}{3}\binom{3}{2}\binom{1}{1}\text{.} \end{equation*} [🔗](#subsec_moreProofs-8) But why stop there? We can find the answer another way too. First let’s decide where to put the one D: we have 10 spots and we need to choose 1 of them, so this can be done in \(\binom{10}{1}\) ways. Next, choose one of the \(\binom{9}{2}\) ways to place the two C’s. We now have \(7\) spots left, and three of them need to be filled with B’s. There are \(\binom{7}{3}\) ways to do this. Finally the A’s can be placed in \(\binom{4}{4}\) (that is, only one) ways. So another answer to the question is \begin{equation*} \binom{10}{1}\binom{9}{2}\binom{7}{3}\binom{4}{4}\text{.} \end{equation*} [🔗](#subsec_moreProofs-9) Interesting. This gives us the binomial identity: \begin{equation*} \binom{10}{4}\binom{6}{3}\binom{3}{2}\binom{1}{1} = \binom{10}{1}\binom{9}{2}\binom{7}{3}\binom{4}{4}\text{.} \end{equation*} [🔗](#subsec_moreProofs-10) Here are a couple more binomial identities with combinatorial proofs.[🔗](#subsec_moreProofs-11)

#### Example 3.6.6.

Prove the identity \begin{equation*} 1 n + 2(n-1) + 3 (n-2) + \cdots + (n-1) 2 + n 1 = \binom{n+2}{3}\text{.} \end{equation*} [🔗](#ex-comb-proof-3elemsets-1-1) Solution. To give a combinatorial proof we need to think up a question we can answer in two ways: one way needs to give the left-hand side of the identity, and the other way needs to be the right-hand side of the identity. Our clue to what question to ask comes from the right-hand side: \(\binom{n+2}{3}\) counts the number of ways to select 3 things from a group of \(n+2\) things. Let’s name those things \(1, 2, 3, \ldots, n+2\text{.}\) In other words, we want to find 3-element subsets of those numbers (since order should not matter, subsets are exactly the right thing to think about). We will have to be a bit clever to explain why the left-hand side also gives the number of these subsets. Here’s the proof.[🔗](#ex-comb-proof-3elemsets-2-1)

#### Proof.

Consider the question “How many 3-element subsets are there of the set \(\{1,2,3,\ldots, n+2\}\text{?}\)” We answer this in two ways:[🔗](#ex-comb-proof-3elemsets-2-2-1) Answer 1: We must select 3 elements from the collection of \(n+2\) elements. This can be done in \(\binom{n+2}{3}\) ways.[🔗](#ex-comb-proof-3elemsets-2-2-2) Answer 2: Break this problem up into cases by what the middle number in the subset is. Say each subset is \(\{a,b,c\}\) written in increasing order. We count the number of subsets for each distinct value of \(b\text{.}\) The smallest possible value of \(b\) is \(2\text{,}\) and the largest is \(n+1\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-3) When \(b = 2\text{,}\) there are \(1 \cdot n\) subsets: 1 choice for \(a\) and \(n\) choices (3 through \(n+2\)) for \(c\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-4) When \(b = 3\text{,}\) there are \(2 \cdot (n-1)\) subsets: 2 choices for \(a\) and \(n-1\) choices for \(c\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-5) When \(b = 4\text{,}\) there are \(3 \cdot (n-2)\) subsets: 3 choices for \(a\) and \(n-2\) choices for \(c\text{.}\)[🔗](#ex-comb-proof-3elemsets-2-2-6) And so on. When \(b = n+1\text{,}\) there are \(n\) choices for \(a\) and only 1 choice for \(c\text{,}\) so \(n \cdot 1\) subsets.[🔗](#ex-comb-proof-3elemsets-2-2-7) Therefore the total number of subsets is \begin{equation*} 1 n + 2 (n-1) + 3 (n-2) + \cdots + (n-1)2 + n 1\text{.} \end{equation*} [🔗](#ex-comb-proof-3elemsets-2-2-8) Since Answer 1 and Answer 2 are answers to the same question, they must be equal. Therefore \begin{equation*} 1 n + 2 (n-1) + 3 (n-2) + \cdots + (n-1) 2 + n 1 = \binom{n+2}{3}\text{.} \end{equation*} [🔗](#ex-comb-proof-3elemsets-2-2-9) [🔗](#ex-comb-proof-3elemsets-2-2)[🔗](#ex-comb-proof-3elemsets-2) [🔗](#ex-comb-proof-3elemsets)

#### Example 3.6.7.

Prove the binomial identity \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2 = \binom{2n}{n}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-1-1) Solution. We will give two different proofs of this fact. The first will be very similar to the previous example (counting subsets). The second proof is a little slicker, using lattice paths.[🔗](#subsec_moreProofs-13-2-1)

#### Proof.

Consider the question: “How many pizzas can you make using \(n\) toppings when there are \(2n\) toppings to choose from?”[🔗](#subsec_moreProofs-13-2-2-1) Answer 1: There are \(2n\) toppings, from which you must choose \(n\text{.}\) This can be done in \(\binom{2n}{n}\) ways.[🔗](#subsec_moreProofs-13-2-2-2) Answer 2: Divide the toppings into two groups of \(n\) toppings (perhaps \(n\) meats and \(n\) veggies). Any choice of \(n\) toppings must include some number from the first group and some number from the second group. Consider each possible number of meat toppings separately:[🔗](#subsec_moreProofs-13-2-2-3) 0 meats: \(\binom{n}{0}\binom{n}{n}\text{,}\) since you need to choose 0 of the \(n\) meats and \(n\) of the \(n\) veggies.[🔗](#subsec_moreProofs-13-2-2-4) 1 meat: \(\binom{n}{1}\binom{n}{n-1}\text{,}\) since you need 1 of \(n\) meats so \(n-1\) of \(n\) veggies.[🔗](#subsec_moreProofs-13-2-2-5) 2 meats: \(\binom{n}{2}\binom{n}{n-2}\text{.}\) Choose 2 meats and the remaining \(n-2\) toppings from the \(n\) veggies.[🔗](#subsec_moreProofs-13-2-2-6) And so on. The last case is \(n\) meats, which can be done in \(\binom{n}{n}\binom{n}{0}\) ways.[🔗](#subsec_moreProofs-13-2-2-7) Thus the total number of pizzas possible is \begin{equation*} \binom{n}{0}\binom{n}{n} + \binom{n}{1}\binom{n}{n-1} + \binom{n}{2}\binom{n}{n-2} + \cdots + \binom{n}{n}\binom{n}{0}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-2-8) This is not quite the left-hand side … yet. Notice that \(\binom{n}{n} = \binom{n}{0}\) and \(\binom{n}{n-1} = \binom{n}{1}\) and so on, by the identity in [Example 3.6.4](sec_comb-proofs.html#example-symmetry-formula). Thus we do indeed get \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-2-9) Since these two answers are answers to the same question, they must be equal, and thus \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2 = \binom{2n}{n}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-2-10) [🔗](#subsec_moreProofs-13-2-2)For an alternative proof, we use lattice paths. This is reasonable to consider because the right-hand side of the identity reminds us of the number of paths from \((0,0)\) to \((n,n)\text{.}\)[🔗](#subsec_moreProofs-13-2-3)

#### Proof.

Consider the question: How many lattice paths are there from \((0,0)\) to \((n,n)\text{?}\)[🔗](#subsec_moreProofs-13-2-4-1) Answer 1: We must travel \(2n\) steps, and \(n\) of them must be in the up direction. Thus there are \(\binom{2n}{n}\) paths.[🔗](#subsec_moreProofs-13-2-4-2) Answer 2: Note that any path from \((0,0)\) to \((n,n)\) must cross the line \(x + y = n\text{.}\) That is, any path must pass through exactly one of the points: \((0,n)\text{,}\) \((1,n-1)\text{,}\) \((2,n-2)\text{,}\) …, \((n, 0)\text{.}\) For example, this is what happens in the case \(n = 4\text{:}\)[🔗](#subsec_moreProofs-13-2-4-3) ![A light gray grid with points (0,0) and (4,4) identified in the lower left and upper right corners respectively. The line x + y = 4 is shown extending from the top left to bottom right corner. The line intersects the labeled points (0,4), (1,3), (2,2), (3,1), and (4,0).](generated/latex-image/lattice-paths-comb-proof.svg) How many paths pass through \((0,n)\text{?}\) To get to that point, you must travel \(n\) units, and \(0\) of them are to the right, so there are \(\binom{n}{0}\) ways to get to \((0,n)\text{.}\) From \((0,n)\) to \((n,n)\) takes \(n\) steps, and \(0\) of them are up. So there are \(\binom{n}{0}\) ways to get from \((0,n)\) to \((n,n)\text{.}\) Therefore there are \(\binom{n}{0}\binom{n}{0}\) paths from \((0,0)\) to \((n,n)\) through the point \((0,n)\) .[🔗](#subsec_moreProofs-13-2-4-5) What about through \((1,n-1)\text{?}\) There are \(\binom{n}{1}\) paths to get there (\(n\) steps, 1 to the right) and \(\binom{n}{1}\) paths to complete the journey to \((n,n)\) (\(n\) steps, \(1\) up). So there are \(\binom{n}{1}\binom{n}{1}\) paths from \((0,0)\) to \((n,n)\) through \((1,n-1)\text{.}\)[🔗](#subsec_moreProofs-13-2-4-6) In general, to get to \((n,n)\) through the point \((k,n-k)\) we have \(\binom{n}{k}\) paths to the midpoint and then \(\binom{n}{k}\) paths from the midpoint to \((n,n)\text{.}\) So there are \(\binom{n}{k}\binom{n}{k}\) paths from \((0,0)\) to \((n,n)\) through \((k, n-k)\text{.}\)[🔗](#subsec_moreProofs-13-2-4-7) All together then, the total paths from \((0,0)\) to \((n,n)\) passing through exactly one of these midpoints is \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-4-8) Since these two answers are answers to the same question, they must be equal, and thus \begin{equation*} \binom{n}{0}^2 + \binom{n}{1}^2 + \binom{n}{2}^2 + \cdots + \binom{n}{n}^2 = \binom{2n}{n}\text{.} \end{equation*} [🔗](#subsec_moreProofs-13-2-4-9) [🔗](#subsec_moreProofs-13-2-4)[🔗](#subsec_moreProofs-13-2) [🔗](#subsec_moreProofs-13)[🔗](#subsec_moreProofs)

### Reading Questions Reading Questions

#### 1.

Which of the following describes the overall strategy for a combinatorial proof?[🔗](#rq-counting-proofs-format-1-1)

- Ask a counting question that can be answered in two ways (and answer it).
- Correct. Each way of answering the question should be one side of the identity.
- Ask two counting questions that can both be answered in the same way (and answer the questions).
- Not quite. You use combinatorial proofs to establish an identity that has two different “sides.”
- Simplify the algebraic expressions for each side of the combinatorial identity.
- While some identities can be established with an algebraic proof, this is not what a combinatorial proof uses.
- Assume the identity fails to hold for some smallest value, and get a contradiction by looking at a smaller value.
- This would be a minimal-criminal style argument, which might also be a valid proof, but not what we mean by a combinatorial proof.

[🔗](#rq-counting-proofs-format)

#### 2.

Write a counting question that you could use to establish the identity: \begin{equation*} \binom{x+y}{x} = \binom{x+y}{y}\text{.} \end{equation*} [🔗](#rq-counting-proofs-question-1-1) [🔗](#rq-counting-proofs-question)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-counting-proofs-q-1-1) [🔗](#rq-counting-proofs-q)[🔗](#rqs-counting-proofs)

### Exercises Practice Problems

#### 1.

Create a combinatorial proof of the identity \(10+10 = 2\cdot 10\text{.}\)[🔗](#parsons-comb-proof-basic-1-1)

```natural
Consider the question, “How many two-digit numbers start with a 3 or 4?”
---
Consider the question, “How many 2-topping pizzas can you make choosing from 10 toppings?” #paired
---
The first way to answer this is \(10+10\text{.}\)

---
This is because there are 10 numbers that start with 3, and another 10 that start with 4.
---
This is because there are 10 choices for the first topping, and 10 choices for the second topping. #paired
---
A second answer to the question is \(2\cdot 10\text{.}\)

---
This is because you have 2 choices for the first digit, and 10 choices for the second digit.
---
This is because you must either choose 2 identical toppings or two different toppings. #paired
---
Since both expressions answer the same question, they must be equal.  Therefore \(10+10 = 2\cdot 10\text{.}\)
```

[🔗](#parsons-comb-proof-basic)

#### 2.

If you were asked to give a combinatorial proof of the identity \(\binom{n}{2}\binom{n-2}{k} = \binom{n}{k}\binom{n-k}{2}\text{,}\) which of the following would be reasonable questions to use?[🔗](#rs-comb-proof-question-1-1)

- How many ways can you select \(2\) flavors of ice cream from \(n\) choices and \(k\) toppings for your sundae?
- This is not going to be helpful, since when we switch from one side of the equation to the other, we will not be counting the same thing. We need a question where the \(k\) things and the \(2\) things come from the same set of \(n\) things.
- How many ways can you select \(k\) bow ties to pack in your checked bag and 2 more bow ties to pack in your carry-on, from a collection of \(n\) bow ties?
- There are \(n\) students in Math Club. How many ways can you pick a subset of size \(2\) or \(k\) that will run your fall fundraiser?
- If we wanted either \(2\) or \(k\) people, we would need to add the number of outcomes from each.
- From a class of \(n\) students, how many ways can you select 2 to be prefects and another \(k\) to be on the party planning committee?

[🔗](#rs-comb-proof-question)[🔗](#practice-comb-proofs)

### Exercises Additional Exercises

#### 1.

Give a combinatorial proof of the identity \(2+2+2 = 3\cdot 2\text{.}\)[🔗](#exercises_comb-proofs-2-1-1) [🔗](#exercises_comb-proofs-2)

#### 2.

Suppose you own \(x\) fezzes and \(y\) bow ties. Of course, \(x\) and \(y\) are both greater than 1.

1. How many combinations of fez and bow tie can you make? You can wear only one fez and one bow tie at a time. Explain.[🔗](#exercises_comb-proofs-3-2-1-5-1-1) [🔗](#exercises_comb-proofs-3-2-1-5-1)
2. Explain why the answer is *also* \({x+y \choose 2} - {x \choose 2} - {y \choose 2}\text{.}\) (If this is what you claimed the answer was in part (a), try it again.)[🔗](#exercises_comb-proofs-3-2-1-5-2-1) [🔗](#exercises_comb-proofs-3-2-1-5-2)
3. Use your answers to parts (a) and (b) to give a combinatorial proof of the identity \begin{equation*} {x+y \choose 2} - {x \choose 2} - {y \choose 2} = xy\text{.} \end{equation*} [🔗](#exercises_comb-proofs-3-2-1-5-3-1) [🔗](#exercises_comb-proofs-3-2-1-5-3)

[🔗](#exercises_comb-proofs-3-2-1) [🔗](#exercises_comb-proofs-3)

#### 3.

How many triangles can you draw using the dots below as vertices?[🔗](#exercises_comb-proofs-4-1-1) ![Twelve dots arranged in a half circle. Seven dots lie on the horizontal diameter of the circle, the remaining five lie on the circumference of the circle.](generated/latex-image/img-semicircle-triangles.svg)

1. Find an expression for the answer which is the sum of three terms involving binomial coefficients.[🔗](#exercises_comb-proofs-4-1-3-1-1-1) [🔗](#exercises_comb-proofs-4-1-3-1-1)
2. Find an expression for the answer which is the difference of two binomial coefficients.[🔗](#exercises_comb-proofs-4-1-3-1-2-1) [🔗](#exercises_comb-proofs-4-1-3-1-2)
3. Generalize the above to state and prove a binomial identity using a combinatorial proof. Say you have \(x\) points on the horizontal axis and \(y\) points in the semi-circle.[🔗](#exercises_comb-proofs-4-1-3-1-3-1) [🔗](#exercises_comb-proofs-4-1-3-1-3)

[🔗](#exercises_comb-proofs-4-1-3) Hint. There will be 185 triangles. But to find them …

1. How many vertices of the triangle can be on the horizontal axis?[🔗](#exercises_comb-proofs-4-2-1-2-1-1) [🔗](#exercises_comb-proofs-4-2-1-2-1)
2. Will *any* three dots work as the vertices?[🔗](#exercises_comb-proofs-4-2-1-2-2-1) [🔗](#exercises_comb-proofs-4-2-1-2-2)

[🔗](#exercises_comb-proofs-4-2-1) [🔗](#exercises_comb-proofs-4-2) [🔗](#exercises_comb-proofs-4)

#### 4.

Consider all the triangles you can create using the points shown below as vertices. Note that we are not allowing degenerate triangles (ones with all three vertices on the same line), but we do allow non-right triangles.[🔗](#exercises_comb-proofs-5-1-1) ![Five equally spaced dots in a vertical line and six additional equally spaced dots extending to the right in a horizontal line from the lowest dot (forming a right angle).](generated/latex-image/triangle-dots-repeat.svg)

1. Find the number of triangles, and explain why your answer is correct.[🔗](#exercises_comb-proofs-5-1-3-1-1-1) [🔗](#exercises_comb-proofs-5-1-3-1-1)
2. Find the number of triangles again, using a different method. Explain why your new method works.[🔗](#exercises_comb-proofs-5-1-3-1-2-1) [🔗](#exercises_comb-proofs-5-1-3-1-2)
3. State a binomial identity that your two answers above establish (that is, give the binomial identity that your two answers are a proof for). Then generalize this using \(m\)’s and \(n\)’s.[🔗](#exercises_comb-proofs-5-1-3-1-3-1) [🔗](#exercises_comb-proofs-5-1-3-1-3)

[🔗](#exercises_comb-proofs-5-1-3) Hint. The answer is 120.[🔗](#exercises_comb-proofs-5-2-1) [🔗](#exercises_comb-proofs-5-2) [🔗](#exercises_comb-proofs-5)

#### 5.

A woman is getting married. She has 15 best friends but can only select 6 of them to be her bridesmaids, one of which needs to be her maid of honor. How many ways can she do this?[🔗](#exc-bridesmaids-1-1)

1. What if she first selects the 6 bridesmaids, and then selects one of them to be the maid of honor?[🔗](#exc-bridesmaids-1-2-1-1) [🔗](#exc-bridesmaids-1-2-1)
2. What if she first selects her maid of honor, and then 5 other bridesmaids?[🔗](#exc-bridesmaids-1-2-2-1) [🔗](#exc-bridesmaids-1-2-2)
3. Explain why \(6 {15 \choose 6} = 15 {14 \choose 5}\text{.}\)[🔗](#exc-bridesmaids-1-2-3-1) [🔗](#exc-bridesmaids-1-2-3)

[🔗](#exc-bridesmaids)

#### 6.

Consider the identity: \begin{equation*} k{n\choose k} = n{n-1 \choose k-1}\text{.} \end{equation*}

1. Is this true? Try it for a few values of \(n\) and \(k\text{.}\)[🔗](#exercises_comb-proofs-7-1-1-2-1-1) [🔗](#exercises_comb-proofs-7-1-1-2-1)
2. Use the formula for \({n \choose k}\) to give an algebraic proof of the identity.[🔗](#exercises_comb-proofs-7-1-1-2-2-1) [🔗](#exercises_comb-proofs-7-1-1-2-2)
3. Give a combinatorial proof of the identity.[🔗](#exercises_comb-proofs-7-1-1-2-3-1) [🔗](#exercises_comb-proofs-7-1-1-2-3)

[🔗](#exercises_comb-proofs-7-1-1) Hint. Try [Exercise 5](sec_comb-proofs.html#exc-bridesmaids).[🔗](#exercises_comb-proofs-7-2-1) [🔗](#exercises_comb-proofs-7-2) [🔗](#exercises_comb-proofs-7)

#### 7.

Give a combinatorial proof of the identity \({n \choose 2}{n-2 \choose k-2} = {n\choose k}{k \choose 2}\text{.}\)[🔗](#exercises_comb-proofs-8-1-1) Hint. What if you wanted a pair of co-maids-of-honor?[🔗](#exercises_comb-proofs-8-2-1) [🔗](#exercises_comb-proofs-8-2) [🔗](#exercises_comb-proofs-8)

#### 8.

Consider the binomial identity \begin{equation*} \binom{n}{1} + 2 \binom{n}{2} + 3 \binom{n}{3} + \cdots + n\binom{n}{n} = n2^{n-1}\text{.} \end{equation*}

1. Give a combinatorial proof of this identity. Hint: What if some number of a group of \(n\) people wanted to go to an escape room, and among those going, one needed to be the team captain?[🔗](#exercises_comb-proofs-9-1-1-2-1-1) [🔗](#exercises_comb-proofs-9-1-1-2-1)
2. Give an alternate proof by multiplying out \((1+x)^n\) and taking derivatives of both sides.[🔗](#exercises_comb-proofs-9-1-1-2-2-1) [🔗](#exercises_comb-proofs-9-1-1-2-2)

[🔗](#exercises_comb-proofs-9-1-1) Hint. For the combinatorial proof: What if you don’t yet know how many bridesmaids you will have?[🔗](#exercises_comb-proofs-9-2-1) [🔗](#exercises_comb-proofs-9-2) [🔗](#exercises_comb-proofs-9)

#### 9.

Give a combinatorial proof for the identity \(1 + 2 + 3 + \cdots + n = {n+1 \choose 2}\text{.}\)[🔗](#exercises_comb-proofs-10-1-1) Hint. Count handshakes.[🔗](#exercises_comb-proofs-10-2-1) [🔗](#exercises_comb-proofs-10-2) [🔗](#exercises_comb-proofs-10)

#### 10.

Consider the bit strings in \(\B^6_2\) (bit strings of length 6 and weight 2).[🔗](#exercises_comb-proofs-11-1-2)

1. How many of those bit strings start with 1?[🔗](#exercises_comb-proofs-11-1-3-1-1) [🔗](#exercises_comb-proofs-11-1-3-1)
2. How many of those bit strings start with 01?[🔗](#exercises_comb-proofs-11-1-3-2-1) [🔗](#exercises_comb-proofs-11-1-3-2)
3. How many of those bit strings start with 001?[🔗](#exercises_comb-proofs-11-1-3-3-1) [🔗](#exercises_comb-proofs-11-1-3-3)
4. Are there any other strings we have not counted yet? Which ones, and how many are there?[🔗](#exercises_comb-proofs-11-1-3-4-1) [🔗](#exercises_comb-proofs-11-1-3-4)
5. How many bit strings are there total in \(\B^6_2\text{?}\)[🔗](#exercises_comb-proofs-11-1-3-5-1) [🔗](#exercises_comb-proofs-11-1-3-5)
6. What binomial identity have you just given a combinatorial proof for?[🔗](#exercises_comb-proofs-11-1-3-6-1) [🔗](#exercises_comb-proofs-11-1-3-6)

[🔗](#exercises_comb-proofs-11)

#### 11.

Let’s count ternary digit strings, that is, strings in which each digit can be 0, 1, or 2.

1. How many ternary digit strings contain exactly \(n\) digits?[🔗](#exercises_comb-proofs-12-3-1-2-1-1) [🔗](#exercises_comb-proofs-12-3-1-2-1)
2. How many ternary digit strings contain exactly \(n\) digits and \(n\) 2’s.[🔗](#exercises_comb-proofs-12-3-1-2-2-1) [🔗](#exercises_comb-proofs-12-3-1-2-2)
3. How many ternary digit strings contain exactly \(n\) digits and \(n-1\) 2’s. (Hint: Where can you put the non-2 digit, and then what could it be?)[🔗](#exercises_comb-proofs-12-3-1-2-3-1) [🔗](#exercises_comb-proofs-12-3-1-2-3)
4. How many ternary digit strings contain exactly \(n\) digits and \(n-2\) 2’s. (Hint: See previous hint.)[🔗](#exercises_comb-proofs-12-3-1-2-4-1) [🔗](#exercises_comb-proofs-12-3-1-2-4)
5. How many ternary digit strings contain exactly \(n\) digits and \(n-k\) 2’s.[🔗](#exercises_comb-proofs-12-3-1-2-5-1) [🔗](#exercises_comb-proofs-12-3-1-2-5)
6. How many ternary digit strings contain exactly \(n\) digits and no 2’s. (Hint: What kind of a string is this?)[🔗](#exercises_comb-proofs-12-3-1-2-6-1) [🔗](#exercises_comb-proofs-12-3-1-2-6)
7. Use the above parts to give a combinatorial proof for the identity \begin{equation*} {n \choose 0} + 2{n \choose 1} + 2^2{n \choose 2} + 2^3{n \choose 3} + \cdots + 2^n{n \choose n} = 3^n\text{.} \end{equation*} [🔗](#exercises_comb-proofs-12-3-1-2-7-1) [🔗](#exercises_comb-proofs-12-3-1-2-7)

[🔗](#exercises_comb-proofs-12-3-1) [🔗](#exercises_comb-proofs-12)

#### 12.

How many ways are there to rearrange the letters in the word “rearrange”? Answer this question in at least two different ways to establish a binomial identity.[🔗](#exercises_comb-proofs-13-1-1) [🔗](#exercises_comb-proofs-13)

#### 13.

Establish the identity below using a combinatorial proof. \begin{equation*} {2 \choose 2}{n \choose 2} + {3 \choose 2}{n-1 \choose 2} + {4\choose 2}{n-2 \choose 2} + \cdots + {n\choose 2}{2\choose 2} = {n+3 \choose 5}\text{.} \end{equation*} [🔗](#exercises_comb-proofs-14-1-1) Hint. This one might remind you of [Example 3.6.6](sec_comb-proofs.html#ex-comb-proof-3elemsets)[🔗](#exercises_comb-proofs-14-2-1) [🔗](#exercises_comb-proofs-14-2) [🔗](#exercises_comb-proofs-14)

#### 14.

In [Example 3.6.5](sec_comb-proofs.html#ex-comb-proof-rowsum) we established that the sum of any row in Pascal’s triangle is a power of two. Specifically, \begin{equation*} {n\choose 0} + {n \choose 1} + {n\choose 2} + \cdots + {n \choose n} = 2^n\text{.} \end{equation*} The argument given there used the counting question, “How many pizzas can you build using any number of \(n\) different toppings?” To practice, give new proofs of this identity using different questions.

1. Use a question about counting subsets.[🔗](#exercises_comb-proofs-15-1-1-4-1-1) [🔗](#exercises_comb-proofs-15-1-1-4-1)
2. Use a question about counting bit strings.[🔗](#exercises_comb-proofs-15-1-1-4-2-1) [🔗](#exercises_comb-proofs-15-1-1-4-2)
3. Use a question about counting lattice paths.[🔗](#exercises_comb-proofs-15-1-1-4-3-1) [🔗](#exercises_comb-proofs-15-1-1-4-3)

[🔗](#exercises_comb-proofs-15-1-1) Hint. For the lattice paths, think about what sort of paths \(2^n\) would count. Not all the paths will end at the same point, but you could describe the set of end points as a line.[🔗](#exercises_comb-proofs-15-2-1) [🔗](#exercises_comb-proofs-15-2) [🔗](#exercises_comb-proofs-15)

#### 15.

1. The Stanley Cup is decided in a best of 7 tournament between two teams. In how many ways can your team win? Let’s answer this question two ways: How many of the 7 games does your team need to win? How many ways can this happen?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-1-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-1)
2. What if the tournament goes all 7 games? So you win the last game. How many ways can the first 6 games go down?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-2-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-2)
3. What if the tournament goes just 6 games? How many ways can this happen? What about 5 games? 4 games?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-3-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-3)
4. What are the two different ways to compute the number of ways your team can win? Write down an equation involving binomial coefficients (that is, \({n \choose k}\)’s). What pattern in Pascal’s triangle is this an example of?[🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-4-1) [🔗](#exercises_comb-proofs-16-1-1-1-1-1-1-4)

[🔗](#exercises_comb-proofs-16-1-1-1-1-1) [🔗](#exercises_comb-proofs-16-1-1-1-1) Generalize. What if the rules changed, and you played a best of \(9\) tournament (5 wins required)? What if you played an \(n\) game tournament with \(k\) wins required to be named champion?[🔗](#exercises_comb-proofs-16-1-1-1-2-1) [🔗](#exercises_comb-proofs-16-1-1-1-2) [🔗](#exercises_comb-proofs-16-1-1) [🔗](#exercises_comb-proofs-16)

#### 16.

Let \(k_1, k_2, \ldots, k_j\) be a list of positive integers that sum to \(n\) (i.e., \(\sum_{i=1}^j k_i = n\)). Use two graphs containing \(n\) vertices to explain why \begin{equation*} \sum_{i = 1}^j \binom{k_i}{2} \le \binom{n}{2}\text{.} \end{equation*} [🔗](#exercises_comb-proofs-17-1-1) Hint. How many edges does \(K_n\) have? One of the two graphs will not be connected (unless \(j=1\) ).[🔗](#exercises_comb-proofs-17-2-1) [🔗](#exercises_comb-proofs-17-2) [🔗](#exercises_comb-proofs-17)[🔗](#exercises_comb-proofs)[🔗](#sec_comb-proofs) [&#xe5cb;Prev](sec_counting-multisets.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec-counting-probability.html) [Feedback](/cdn-cgi/l/email-protection#2b4458484a5905474e5d42456b5e454844054e4f5e)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_comb-proofs-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_comb-proofs-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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
