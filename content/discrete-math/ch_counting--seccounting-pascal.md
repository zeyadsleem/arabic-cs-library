---
title: "Pascal’s Arithmetical Triangle"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_counting-pascal.html
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
