---
title: "Chapter Summary"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_gt-conc.html
---

\One reason graph theory is such a rich area of study is that it deals with such a fundamental concept: Any pair of objects can either be related or not related. What the objects are and what “related” means varies depending on context, and this leads to many applications of graph theory to science and other areas of math. The objects can be countries, and two countries can be related if they share a border. The objects could be land masses that are related if there is a bridge between them. The objects could be websites that are related if there is a link from one to the other. Or we can be completely abstract: The objects are vertices that are related if there is an edge between them.[🔗](#sec_gt-conc-3) What question we ask about the graph depends on the application, but often leads to deeper, general and abstract questions worth studying in their own right. Here is a short summary of the types of questions we have considered:

- Can the graph be drawn in the plane without edges crossing? If so, how many regions does this drawing divide the plane into?[🔗](#sec_gt-conc-4-1-1-1) [🔗](#sec_gt-conc-4-1-1)
- Is it possible to color the vertices of the graph so that related vertices have different colors using a small number of colors? How many colors are needed?[🔗](#sec_gt-conc-4-1-2-1) [🔗](#sec_gt-conc-4-1-2)
- Is it possible to trace over every edge of a graph exactly once without lifting your pencil? What other sorts of “paths” might a graph possess?[🔗](#sec_gt-conc-4-1-3-1) [🔗](#sec_gt-conc-4-1-3)
- Can you find subgraphs with certain properties? For example, when does a (bipartite) graph contain a subgraph in which all vertices are only related to one other vertex?[🔗](#sec_gt-conc-4-1-4-1) [🔗](#sec_gt-conc-4-1-4)

[🔗](#sec_gt-conc-4) Not surprisingly, these questions are often related to each other. For example, the chromatic number of a graph cannot be greater than 4 when the graph is planar. Whether the graph has an Euler trail depends on how many vertices each vertex is adjacent to (and whether those numbers are always even or not). Even the existence of matchings in bipartite graphs can be proved using paths.[🔗](#sec_gt-conc-5)

### Exercises Chapter Review

#### 1.

Which (if any) of the graphs below are the same? Which are different? Explain.[🔗](#exercises_gt-conc-2-1-1) ![A graph with five vertices; two in a top row, and three in a bottom row. The top-left vertex is adjacent to the top-right vertex, the bottom-right vertex, and the bottom-middle vertex. The top-right vertex is also adjacent to the bottom-middle vertex and the bottom-left vertex. The bottom-middle vertex is adjacent to each of the other bottom vertices.](generated/latex-image/exercises_gt-conc-2-1-2-1.svg) ![A graph with five vertices: a row of three, and above the middle vertex of this row, two more vertically aligned. The outer vertices in the row are adjacent to each of the vertices in the middle column. The top and middle vertices in the column are also adjacent.](generated/latex-image/exercises_gt-conc-2-1-2-2.svg) ![A graph with five vertices: three are arranged in a top row, and the remaining two are directly below the left and right vertices on the top row. The vertex in the center of the row is adjacent to each of the other vertices. The two vertices on the left are adjacent, as are the two vertices on the right. Finally the top-left and top-right are adjacent by a curved edge.](generated/latex-image/exercises_gt-conc-2-1-2-3.svg) [🔗](#exercises_gt-conc-2)

#### 2.

Which of the graphs in the previous question contain Euler trails or circuits? Which of the graphs are planar?[🔗](#exercises_gt-conc-3-1-1) [🔗](#exercises_gt-conc-3)

#### 3.

Draw a graph that has an Euler circuit but is not planar.[🔗](#exercises_gt-conc-4-1-1) [🔗](#exercises_gt-conc-4)

#### 4.

Draw a graph that does not have an Euler trail and is also not planar.[🔗](#exercises_gt-conc-5-1-1) [🔗](#exercises_gt-conc-5)

#### 5.

Consider the graph \(G = (V, E)\) with \(V = \{a,b,c,d,e,f,g\}\) and \(E = \{ab, ac, af, bg, cd, ce\}\) (here we are using the shorthand for edges: \(ab\) really means \(\{a,b\}\text{,}\) for example).

1. Is the graph \(G\) isomorphic to \(G' = (V', E')\) with \(V' = \{t, u, v, w, x, y, z\}\) and \(E' = \{tz, uv, uy, uz, vw, vx\}\text{?}\) If so, give the isomorphism. If not, explain how you know.[🔗](#exercises_gt-conc-6-1-1-6-1-1) [🔗](#exercises_gt-conc-6-1-1-6-1)
2. Find a graph \(G''\) with 7 vertices and 6 edges which is NOT isomorphic to \(G\text{,}\) or explain why this is not possible.[🔗](#exercises_gt-conc-6-1-1-6-2-1) [🔗](#exercises_gt-conc-6-1-1-6-2)
3. Write down the *degree sequence* for \(G\text{.}\) That is, write down the degrees of all the vertices, in decreasing order.[🔗](#exercises_gt-conc-6-1-1-6-3-1) [🔗](#exercises_gt-conc-6-1-1-6-3)
4. Find a connected graph \(G'''\) with the same degree sequence of \(G\) which is NOT isomorphic to \(G\text{,}\) or explain why this is not possible.[🔗](#exercises_gt-conc-6-1-1-6-4-1) [🔗](#exercises_gt-conc-6-1-1-6-4)
5. What kind of graph is \(G\text{?}\) Is \(G\) complete? Bipartite? A tree? A cycle? A path? A wheel?[🔗](#exercises_gt-conc-6-1-1-6-5-1) [🔗](#exercises_gt-conc-6-1-1-6-5)
6. Is \(G\) planar?[🔗](#exercises_gt-conc-6-1-1-6-6-1) [🔗](#exercises_gt-conc-6-1-1-6-6)
7. What is the chromatic number of \(G\text{?}\) Explain.[🔗](#exercises_gt-conc-6-1-1-6-7-1) [🔗](#exercises_gt-conc-6-1-1-6-7)
8. Does \(G\) have an Euler trail or circuit? Explain.[🔗](#exercises_gt-conc-6-1-1-6-8-1) [🔗](#exercises_gt-conc-6-1-1-6-8)

[🔗](#exercises_gt-conc-6-1-1) [🔗](#exercises_gt-conc-6)

#### 6.

If a graph has 10 vertices and 10 edges and contains an Euler circuit, must it be planar? How many faces would it have?[🔗](#exercises_gt-conc-7-1-1) [🔗](#exercises_gt-conc-7)

#### 7.

Suppose \(G\) is a graph with \(n\) vertices, each having degree 5.

1. For which values of \(n\) does this make sense?[🔗](#exercises_gt-conc-8-1-1-3-1-1) [🔗](#exercises_gt-conc-8-1-1-3-1)
2. For which values of \(n\) does the graph have an Euler trail?[🔗](#exercises_gt-conc-8-1-1-3-2-1) [🔗](#exercises_gt-conc-8-1-1-3-2)
3. What is the smallest value of \(n\) for which the graph might be planar? (tricky)[🔗](#exercises_gt-conc-8-1-1-3-3-1) [🔗](#exercises_gt-conc-8-1-1-3-3)

[🔗](#exercises_gt-conc-8-1-1) [🔗](#exercises_gt-conc-8)

#### 8.

At a school dance, 6 girls and 4 boys take turns dancing (as couples) with each other.

1. How many couples dance if every girl dances with every boy?[🔗](#exercises_gt-conc-9-1-1-1-1-1) [🔗](#exercises_gt-conc-9-1-1-1-1)
2. How many couples dance if everyone dances with everyone else (regardless of gender)?[🔗](#exercises_gt-conc-9-1-1-1-2-1) [🔗](#exercises_gt-conc-9-1-1-1-2)
3. Explain what graphs can be used to represent these situations.[🔗](#exercises_gt-conc-9-1-1-1-3-1) [🔗](#exercises_gt-conc-9-1-1-1-3)

[🔗](#exercises_gt-conc-9-1-1) [🔗](#exercises_gt-conc-9)

#### 9.

Among a group of \(n\) people, is it possible for everyone to be friends with an odd number of people in the group? If so, what can you say about \(n\text{?}\)[🔗](#exercises_gt-conc-10-1-1) [🔗](#exercises_gt-conc-10)

#### 10.

Your friend has challenged you to create a convex polyhedron containing 9 triangles and 6 pentagons.

1. Is it possible to build such a polyhedron using *only* these shapes? Explain.[🔗](#exercises_gt-conc-11-1-1-1-1-1) [🔗](#exercises_gt-conc-11-1-1-1-1)
2. You decide to also include one heptagon (seven-sided polygon). How many vertices does your new convex polyhedron contain?[🔗](#exercises_gt-conc-11-1-1-1-2-1) [🔗](#exercises_gt-conc-11-1-1-1-2)
3. Assuming you are successful in building your new 16-faced polyhedron, could every vertex be the joining of the same number of faces? Could each vertex join either 3 or 4 faces? If so, how many of each type of vertex would there be?[🔗](#exercises_gt-conc-11-1-1-1-3-1) [🔗](#exercises_gt-conc-11-1-1-1-3)

[🔗](#exercises_gt-conc-11-1-1) [🔗](#exercises_gt-conc-11)

#### 11.

Is there a convex polyhedron that requires 5 colors to properly color the vertices of the polyhedron? Explain.[🔗](#exercises_gt-conc-12-1-1) [🔗](#exercises_gt-conc-12)

#### 12.

How many edges does the graph \(K_{n,n}\) have? For which values of \(n\) does the graph contain an Euler circuit? For which values of \(n\) is the graph planar?[🔗](#exercises_gt-conc-13-1-1) [🔗](#exercises_gt-conc-13)

#### 13.

The graph \(G\) has 6 vertices with degrees \(1, 2, 2, 3, 3, 5\text{.}\) How many edges does \(G\) have? If \(G\) was planar, how many faces would it have? Does \(G\) have an Euler trail?[🔗](#exercises_gt-conc-14-1-1) [🔗](#exercises_gt-conc-14)

#### 14.

What is the smallest number of colors you need to properly color the vertices of \(K_{7}\text{.}\) Can you say whether \(K_7\) is planar based on your answer?[🔗](#exercises_gt-conc-15-1-1) [🔗](#exercises_gt-conc-15)

#### 15.

What is the smallest number of colors you need to properly color the vertices of \(K_{3,4}\text{?}\) Can you say whether \(K_{3,4}\) is planar based on your answer?[🔗](#exercises_gt-conc-16-1-1) [🔗](#exercises_gt-conc-16)

#### 16.

Prove that \(K_{3,4}\) is not planar. Do this using Euler’s formula, not just by appealing to the fact that \(K_{3,3}\) is not planar.[🔗](#exercises_gt-conc-17-1-1) [🔗](#exercises_gt-conc-17)

#### 17.

A dodecahedron is a regular convex polyhedron made up of 12 regular pentagons.

1. Suppose you color each pentagon with one of three colors. Prove that there must be two adjacent pentagons colored identically.[🔗](#exercises_gt-conc-18-1-1-1-1-1) [🔗](#exercises_gt-conc-18-1-1-1-1)
2. What if you use four colors?[🔗](#exercises_gt-conc-18-1-1-1-2-1) [🔗](#exercises_gt-conc-18-1-1-1-2)
3. What if instead of a dodecahedron you colored the faces of a cube?[🔗](#exercises_gt-conc-18-1-1-1-3-1) [🔗](#exercises_gt-conc-18-1-1-1-3)

[🔗](#exercises_gt-conc-18-1-1) [🔗](#exercises_gt-conc-18)

#### 18.

Decide whether the following statements are true or false. Prove your answers.

1. If two graphs \(G_1\) and \(G_2\) have the same chromatic number, then they are isomorphic.[🔗](#exercises_gt-conc-19-1-1-1-1-1) [🔗](#exercises_gt-conc-19-1-1-1-1)
2. If two graphs \(G_1\) and \(G_2\) have the same number of vertices and edges and have the same chromatic number, then they are isomorphic.[🔗](#exercises_gt-conc-19-1-1-1-2-1) [🔗](#exercises_gt-conc-19-1-1-1-2)
3. If two graphs are isomorphic, then they have the same chromatic number.[🔗](#exercises_gt-conc-19-1-1-1-3-1) [🔗](#exercises_gt-conc-19-1-1-1-3)

[🔗](#exercises_gt-conc-19-1-1) [🔗](#exercises_gt-conc-19)

#### 19.

If a planar graph \(G\) with \(7\) vertices divides the plane into 8 regions, how many edges must \(G\) have?[🔗](#exercises_gt-conc-20-1-1) [🔗](#exercises_gt-conc-20)

#### 20.

Consider the graph below:[🔗](#exercises_gt-conc-21-1-1) ![A graph with six vertices. Two vertices are aligned in a center column, and are adjacent to each other. Each is also adjacent to each of the other four vertices.](generated/latex-image/exercises_gt-conc-21-1-2.svg)

1. Does the graph have an Euler trail or circuit? Explain.[🔗](#exercises_gt-conc-21-1-3-1-1-1) [🔗](#exercises_gt-conc-21-1-3-1-1)
2. Is the graph planar? Explain.[🔗](#exercises_gt-conc-21-1-3-1-2-1) [🔗](#exercises_gt-conc-21-1-3-1-2)
3. Is the graph bipartite? Complete? Complete bipartite?[🔗](#exercises_gt-conc-21-1-3-1-3-1) [🔗](#exercises_gt-conc-21-1-3-1-3)
4. What is the chromatic number of the graph?[🔗](#exercises_gt-conc-21-1-3-1-4-1) [🔗](#exercises_gt-conc-21-1-3-1-4)

[🔗](#exercises_gt-conc-21-1-3) [🔗](#exercises_gt-conc-21)

#### 21.

For each part below, say whether the statement is true or false. Explain why the true statements are true, and give counterexamples for the false statements.

1. Every bipartite graph is planar.[🔗](#exercises_gt-conc-22-1-1-1-1-1) [🔗](#exercises_gt-conc-22-1-1-1-1)
2. Every bipartite graph has chromatic number 2.[🔗](#exercises_gt-conc-22-1-1-1-2-1) [🔗](#exercises_gt-conc-22-1-1-1-2)
3. Every bipartite graph has an Euler trail.[🔗](#exercises_gt-conc-22-1-1-1-3-1) [🔗](#exercises_gt-conc-22-1-1-1-3)
4. Every vertex of a bipartite graph has even degree.[🔗](#exercises_gt-conc-22-1-1-1-4-1) [🔗](#exercises_gt-conc-22-1-1-1-4)
5. A graph is bipartite if and only if the sum of the degrees of all the vertices is even.[🔗](#exercises_gt-conc-22-1-1-1-5-1) [🔗](#exercises_gt-conc-22-1-1-1-5)

[🔗](#exercises_gt-conc-22-1-1) [🔗](#exercises_gt-conc-22)

#### 22.

Consider the statement, “If a graph is planar, then it has an Euler trail.”

1. Write the converse of the statement.[🔗](#exercises_gt-conc-23-1-1-2-1-1) [🔗](#exercises_gt-conc-23-1-1-2-1)
2. Write the contrapositive of the statement.[🔗](#exercises_gt-conc-23-1-1-2-2-1) [🔗](#exercises_gt-conc-23-1-1-2-2)
3. Write the negation of the statement.[🔗](#exercises_gt-conc-23-1-1-2-3-1) [🔗](#exercises_gt-conc-23-1-1-2-3)
4. Is it possible for the contrapositive to be false? If it was, what would that tell you?[🔗](#exercises_gt-conc-23-1-1-2-4-1) [🔗](#exercises_gt-conc-23-1-1-2-4)
5. Is the original statement true or false? Prove your answer.[🔗](#exercises_gt-conc-23-1-1-2-5-1) [🔗](#exercises_gt-conc-23-1-1-2-5)
6. Is the converse of the statement true or false? Prove your answer.[🔗](#exercises_gt-conc-23-1-1-2-6-1) [🔗](#exercises_gt-conc-23-1-1-2-6)

[🔗](#exercises_gt-conc-23-1-1) [🔗](#exercises_gt-conc-23)

#### 23.

Let \(G\) be a connected graph with \(v\) vertices and \(e\) edges. Use mathematical induction to prove that if \(G\) contains exactly one cycle (among other edges and vertices), then \(v = e\text{.}\)[🔗](#exercises_gt-conc-24-1-1) Note: This is asking you to prove a special case of Euler’s formula for planar graphs, so do not use that formula in your proof.[🔗](#exercises_gt-conc-24-1-2) Hint. You might want to give the proof in two parts. First prove by induction that the cycle \(C_n\) has \(v=e\text{.}\) Then consider what happens if the graph is more than just the cycle.[🔗](#exercises_gt-conc-24-2-1) [🔗](#exercises_gt-conc-24-2) [🔗](#exercises_gt-conc-24)[🔗](#exercises_gt-conc)[🔗](#sec_gt-conc) [&#xe5cb;Prev](sec_matchings.html)[&#xe5ce;Top](#)[Next&#xe5cc;](ch_counting.html) [Feedback](/cdn-cgi/l/email-protection#2f405c4c4e5d01434a5946416f5a414c40014a4b5a)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_gt-conc-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_gt-conc-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
