---
title: "Euler Trails and Circuits"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_gt-paths.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 2.4 Euler Trails and Circuits

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_gt-paths-13-1-1)

1. Identify whether a graph or multigraph has an Euler trail or circuit.[🔗](#sec_gt-paths-13-2-1-1) [🔗](#sec_gt-paths-13-2-1)
2. Justify why the necessary condition for a graph having an Euler trail is necessary.[🔗](#sec_gt-paths-13-2-2-1) [🔗](#sec_gt-paths-13-2-2)
3. Distinguish between Euler trails and Hamilton paths, and decide which is more appropriate to use for a given problem.[🔗](#sec_gt-paths-13-2-3-1) [🔗](#sec_gt-paths-13-2-3)

[🔗](#sec_gt-paths-13)

### Subsection Section Preview

#### Investigate!

A spider is standing on one face of an octahedron (a polyhedron with eight triangular faces). She wants to crawl along the solid from face to face so that she crosses each edge exactly once. Is this possible? If so, how?[🔗](#sec_gt-paths-14-2-1-1) ![An octahedron](generated/latex-image/sec_gt-paths-14-2-1-2.svg) [🔗](#sec_gt-paths-14-2) If we start at a vertex and trace along edges to get to other vertices, we create a *walk* through the graph. More precisely, a walk in a graph is a sequence of vertices such that every vertex in the sequence is adjacent to the vertices before and after it in the sequence. If the walk travels along every edge exactly once, then the walk is called an Euler trail (or Euler walk or Euler path). If, in addition, the starting and ending vertices are the same (so you trace along every edge exactly once and end up where you started), then the walk is called an Euler circuit (or Euler tour). Of course if a graph is not connected, there is no hope of finding such a trail or circuit. For the rest of this section, assume all the graphs discussed are connected.[🔗](#sec_gt-paths-14-3) The bridges of Königsberg problem is really a question about the existence of Euler trails. There will be a route that crosses every bridge exactly once if and only if the multigraph below has an Euler trail:[🔗](#sec_gt-paths-14-4) ![Three vertices aligned in a vertical column left of a single vertex on the right. Edges connect the vertex on the right to each vertex on the left. Among the vertices on the left, two arced edges connect the bottom vertex to the center vertex, and two more connect the center vertex to the top vertex.](generated/latex-image/sec_gt-paths-14-5.svg) This graph is small enough that we could actually check every possible walk that does not reuse edges, and in doing so convince ourselves that there is no Euler trail (let alone an Euler circuit). On small graphs that do have an Euler trail, it is usually not difficult to find one. Our goal is to find a quick way to check whether a graph has an Euler trail or circuit, even if the graph is quite large.[🔗](#sec_gt-paths-14-6)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-gt-paths)

Which of the graphs below have an Euler trail? Which have an Euler circuit?[🔗](#PA-gt-paths-2-1) ![A tree with 7 vertices an 6 edges. The bottom vertex has degree 2, leading to two vertices in the middle with degree 3, each leading to a leaf](generated/latex-image/PA-gt-paths-2-2-1-1.svg) ![A graph consisting of 6 vertices and 10 edges](generated/latex-image/PA-gt-paths-2-2-1-2.svg) ![A graph with 7 vertices and 9 edges](generated/latex-image/PA-gt-paths-2-2-1-3.svg) \begin{equation*} G_1 \end{equation*} [🔗](#PA-gt-paths-2-2-2-1) \begin{equation*} G_2 \end{equation*} [🔗](#PA-gt-paths-2-2-2-2) \begin{equation*} G_3 \end{equation*} [🔗](#PA-gt-paths-2-2-2-3) ![A graph with six vertices. Four vertices form a square, with another vertex centered inside the square, and the last vertex centered above the square. Edges connect the corners of the square, and connect each corner to the center vertex. The top two vertices of the square is adjacent to the vertex above the square.](generated/latex-image/PA-gt-paths-2-3-1-1.svg) ![A graph with seven vertices. Four vertices form the corners of a square, the remaining three are in a middle row, with one to the left, one in the center, and one to the right of the square. Edges form the sides of the square. Each vertex in the square is adjacent to the two middle-row vertices closest to it.](generated/latex-image/PA-gt-paths-2-3-1-2.svg) ![A graph with 8 vertices and 12 edges, representing a cube.](generated/latex-image/planar-cube.svg) \begin{equation*} G_4 \end{equation*} [🔗](#PA-gt-paths-2-3-2-1) \begin{equation*} G_5 \end{equation*} [🔗](#PA-gt-paths-2-3-2-2) \begin{equation*} G_6 \end{equation*} [🔗](#PA-gt-paths-2-3-2-3)

#### 1.

Activate \(G_1\) has

- an Euler trail[🔗](#extracted-webwork-49-1-1-1-2-1-1) [🔗](#extracted-webwork-49-1-1-1-2-1)
- an Euler circuit and trail[🔗](#extracted-webwork-49-1-1-1-2-2-1) [🔗](#extracted-webwork-49-1-1-1-2-2)
- Neither[🔗](#extracted-webwork-49-1-1-1-2-3-1) [🔗](#extracted-webwork-49-1-1-1-2-3)

. \(G_2\) has

- an Euler trail[🔗](#extracted-webwork-49-1-1-1-4-1-1) [🔗](#extracted-webwork-49-1-1-1-4-1)
- an Euler circuit and trail[🔗](#extracted-webwork-49-1-1-1-4-2-1) [🔗](#extracted-webwork-49-1-1-1-4-2)
- Neither[🔗](#extracted-webwork-49-1-1-1-4-3-1) [🔗](#extracted-webwork-49-1-1-1-4-3)

. \(G_3\) has

- an Euler trail[🔗](#extracted-webwork-49-1-1-1-6-1-1) [🔗](#extracted-webwork-49-1-1-1-6-1)
- an Euler circuit and trail[🔗](#extracted-webwork-49-1-1-1-6-2-1) [🔗](#extracted-webwork-49-1-1-1-6-2)
- Neither[🔗](#extracted-webwork-49-1-1-1-6-3-1) [🔗](#extracted-webwork-49-1-1-1-6-3)

[🔗](#extracted-webwork-49-1-1-1) \(G_4\) has

- an Euler trail[🔗](#extracted-webwork-49-1-1-2-2-1-1) [🔗](#extracted-webwork-49-1-1-2-2-1)
- an Euler circuit and trail[🔗](#extracted-webwork-49-1-1-2-2-2-1) [🔗](#extracted-webwork-49-1-1-2-2-2)
- Neither[🔗](#extracted-webwork-49-1-1-2-2-3-1) [🔗](#extracted-webwork-49-1-1-2-2-3)

. \(G_5\) has

- an Euler trail[🔗](#extracted-webwork-49-1-1-2-4-1-1) [🔗](#extracted-webwork-49-1-1-2-4-1)
- an Euler circuit and trail[🔗](#extracted-webwork-49-1-1-2-4-2-1) [🔗](#extracted-webwork-49-1-1-2-4-2)
- Neither[🔗](#extracted-webwork-49-1-1-2-4-3-1) [🔗](#extracted-webwork-49-1-1-2-4-3)

. \(G_6\) has

- an Euler trail[🔗](#extracted-webwork-49-1-1-2-6-1-1) [🔗](#extracted-webwork-49-1-1-2-6-1)
- an Euler circuit and trail[🔗](#extracted-webwork-49-1-1-2-6-2-1) [🔗](#extracted-webwork-49-1-1-2-6-2)
- Neither[🔗](#extracted-webwork-49-1-1-2-6-3-1) [🔗](#extracted-webwork-49-1-1-2-6-3)

[🔗](#extracted-webwork-49-1-1-2) [🔗](#pa-gt-paths-1)

#### 2.

Activate Write down the degree sequence of the graphs above.[🔗](#extracted-webwork-50-1-1-1) \(G_1\text{:}\) [🔗](#extracted-webwork-50-1-1-2) \(G_2\text{:}\) [🔗](#extracted-webwork-50-1-1-3) \(G_3\text{:}\) [🔗](#extracted-webwork-50-1-1-4) \(G_4\text{:}\) [🔗](#extracted-webwork-50-1-1-5) \(G_5\text{:}\) [🔗](#extracted-webwork-50-1-1-6) \(G_6\text{:}\) [🔗](#extracted-webwork-50-1-1-7) What might the connection be between the degree sequence and the existence of an Euler trail or circuit?[🔗](#extracted-webwork-50-1-1-8) [🔗](#pa-gt-paths-2)

#### 3.

Activate One way to write down an Euler trail or circuit is to list the *edges* in order. Each edge will be a pair of vertices, and to indicate what direction we travel over that edge, we can write it as an ordered pair rather than a set. For example, consider this graph:[🔗](#extracted-webwork-51-1-1-1) ![a path of 4 vertices labeled a, b, c, d connected in that order by three edges.](generated/webwork/images/webwork-51-image-1.svg) There are two Euler trails we could write:[🔗](#extracted-webwork-51-1-1-3) \begin{equation*} (a,b), (b,c), (c,d) \qquad \text{or} \qquad (d,c), (c,b), (b,a) \text{.} \end{equation*} [🔗](#extracted-webwork-51-1-1-4)

#### (a)

Write down an Euler trail for the graph below.[🔗](#extracted-webwork-51-1-2-1-1) ![a graph with 6 vertices labeled a through f. Vertices a and f have degree one and are drawn on the far left and right respectively. The other vertices form a diamond. edges: (a,b), (b,c), (b,e), (b,d), (c,e), (d,e) and (e,f).](generated/webwork/images/webwork-51-image-2.svg) For each vertex, write down its degree and the number of times it appears in your list of edges.[🔗](#extracted-webwork-51-1-2-1-3)

| vertex | degree | times listed |
| --- | --- | --- |
| \(a\) |  |  |
| \(b\) |  |  |
| \(c\) |  |  |
| \(d\) |  |  |
| \(e\) |  |  |
| \(f\) |  |  |

[🔗](#extracted-webwork-51-1-2)

#### (b)

Suppose you have a graph with degree sequence \((4,2,2,2,2)\) that has an Euler trail. How many times will the name of the degree 4 vertex appear in your list of edges?[🔗](#extracted-webwork-51-1-3-1-1) [🔗](#extracted-webwork-51-1-3)

#### (c)

Suppose you have a graph with an Euler trail written as a list of edges. What can you conclude about a vertex that appears exactly 3 times in the list? Select all the choices that could be true.[🔗](#extracted-webwork-51-1-4-1-1)

- The vertex could appear at the start and end of the Euler trail.[🔗](#extracted-webwork-51-1-4-1-2-1-1-1) [🔗](#extracted-webwork-51-1-4-1-2-1-1)
- The vertex could appear at the start or end of the Euler trail, but not both.[🔗](#extracted-webwork-51-1-4-1-2-1-2-1) [🔗](#extracted-webwork-51-1-4-1-2-1-2)
- The vertex could appear only in the middle of the Euler trail.[🔗](#extracted-webwork-51-1-4-1-2-1-3-1) [🔗](#extracted-webwork-51-1-4-1-2-1-3)
- The vertex cannot appear in the Euler trail at all.[🔗](#extracted-webwork-51-1-4-1-2-1-4-1) [🔗](#extracted-webwork-51-1-4-1-2-1-4)
- There must be another vertex with odd degree that also appears at the start or end of the Euler trail.[🔗](#extracted-webwork-51-1-4-1-2-1-5-1) [🔗](#extracted-webwork-51-1-4-1-2-1-5)

[🔗](#extracted-webwork-51-1-4-1-2) [🔗](#extracted-webwork-51-1-4) [🔗](#pa-gt-paths-3)[🔗](#PA-gt-paths)[🔗](#sec_gt-paths-14)

### Subsection Conditions for Euler Trails

One way to guarantee that a graph does *not* have an Euler circuit is to include a “spike,” a vertex of degree 1.[🔗](#sec_gt-paths-15-2) ![Three vertices in a triangle (with edges connecting them), plus a 4th vertex labeled a adjacent to one of the others.](generated/latex-image/sec_gt-paths-15-3.svg) The vertex \(a\) has degree 1, and if you try to make an Euler circuit, you see that you will get stuck at the vertex. It is a dead end. That is, unless you start there. But then there is no way to return, so there is no hope of finding an Euler circuit. There is however an Euler trail. It starts at the vertex \(a\text{,}\) then loops around the triangle. You will end at the vertex of degree 3.[🔗](#sec_gt-paths-15-4) You run into a similar problem whenever you have a vertex of any odd degree. If you start at such a vertex, you will not be able to end there (after traversing every edge exactly once). After using one edge to leave the starting vertex, you will be left with an even number of edges emanating from the vertex. Half of these could be used for returning to the vertex, the other half for leaving. So you return, then leave. Return, then leave. The only way to use up all the edges is to use the last one by leaving the vertex. On the other hand, if you have a vertex with odd degree at which you do not start a trail, then you will eventually get stuck at that vertex. The trail will use pairs of edges incident to the vertex to arrive and leave again. Eventually all but one of these edges will be used up, leaving only an edge to arrive by, and none to leave again.[🔗](#sec_gt-paths-15-5) What all this says is that if a graph has an Euler trail and two vertices with odd degree, then the Euler trail must start at one of the odd-degree vertices and end at the other. In such a situation, every other vertex *must* have an even degree since we need an equal number of edges to get to those vertices as to leave them. How could we have an Euler circuit? The graph could not have any odd-degree vertex as an Euler trail would have to start there or end there, but not both. Thus for a graph to have an Euler circuit, all vertices must have even degree.[🔗](#sec_gt-paths-15-6) The converse is also true: if all the vertices of a graph have even degree, then the graph has an Euler circuit, and if there are exactly two vertices with odd degree, the graph has an Euler trail. To prove this is a little tricky, but the basic idea is that you will never get stuck because there is an “outbound” edge for every “inbound” edge at every vertex. If you try to make an Euler trail and miss some edges, you will always be able to “splice in” a circuit using the edges you previously missed.[🔗](#sec_gt-paths-15-7)

#### Euler Trails and Circuits.

- A graph has an Euler circuit if and only if the degree of every vertex is even.[🔗](#sec_gt-paths-15-8-6-1-1-1) [🔗](#sec_gt-paths-15-8-6-1-1)
- A graph has an Euler trail if and only if there are at most two vertices with odd degree.[🔗](#sec_gt-paths-15-8-6-1-2-1) [🔗](#sec_gt-paths-15-8-6-1-2)

[🔗](#sec_gt-paths-15-8-6) [🔗](#sec_gt-paths-15-8)Since the bridges of Königsberg graph has all four vertices with odd degree, there is no Euler trail through the graph. Thus there is no way for the townspeople to cross every bridge exactly once.[🔗](#sec_gt-paths-15-9) [🔗](#sec_gt-paths-15)

### Subsection Hamilton Paths

Suppose you wanted to tour Königsberg in such a way that you visit each land mass (the two islands and both banks) exactly once. This can be done. In graph theory terms, we are asking whether there is a path that visits every vertex exactly once. Such a path is called a Hamilton path (or Hamiltonian path). We could also consider Hamilton cycles, which are Hamilton paths that start and stop at the same vertex.[🔗](#gt-ham-paths-2)

#### Example 2.4.1.

Determine whether the graphs below have a Hamilton path.[🔗](#gt-ham-paths-3-1-1) ![The Petersen graph: ten vertices arranged in two rings of five each. Each outer vertex is adjacent to the two outer vertices closest to it, forming a pentagon, and to the inner vertex closest to it. Each inner vertex is adjacent to the two inner vertices not neighboring it, forming a 5-ponted star.](generated/latex-image/img-petersen-for-hp.svg) ![A graph with ten vertices. Five vertices form a copy of K5, the complete graph in which each vertex is adjacent to the other four. The remaining five vertices are each adjacent to only one of the five vertices in the copy of K5.](generated/latex-image/gt-ham-paths-3-1-2-2.svg) Solution. The graph on the left has a Hamilton path (many different ones, actually), as shown here:[🔗](#gt-ham-paths-3-2-1) ![The Petersen graph with a highlighted path visiting every vertex exactly once. The path starts at the top outer vertex, proceeds down and two the left to the bottom-left outer vertex, then to the top-left outer vertex, then in and across to the top-right outer vertex, and finally down to the bottom-left outer vertex and up to the bottom-left inner vertex.](generated/latex-image/gt-ham-path-petersen.svg) The graph on the right does not have a Hamilton path. You would need to visit each of the “outside” vertices, but as soon as you visit one, you get stuck. Note that this graph does not have an Euler trail, although there are graphs with Euler trails but no Hamilton paths.[🔗](#gt-ham-paths-3-2-3) [🔗](#gt-ham-paths-3-2) [🔗](#gt-ham-paths-3) It appears that finding Hamilton paths would be easier because graphs often have more edges than vertices, so there are fewer requirements to be met. However, nobody knows whether this is true. There is no known simple test for whether a graph has a Hamilton path. For small graphs this is not a problem, but as the size of the graph grows, it gets harder and harder to check whether there is a Hamilton path. In fact, this is an example of a question which as far as we know is too difficult for computers to solve in general, as it is an example of a problem that is NP-complete.[🔗](#gt-ham-paths-4) [🔗](#gt-ham-paths)

### Reading Questions Reading Questions

#### 1.

Is there a graph that has an Euler circuit but not an Euler trail? Explain your answer.[🔗](#rq-gt-paths-vs-circuits-1-1) [🔗](#rq-gt-paths-vs-circuits)

#### 2.

Can a tree have an Euler trail? Can a tree have an Euler circuit? Explain your answers.[🔗](#rq-gt-paths-trees-1-1) [🔗](#rq-gt-paths-trees)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-gt-paths-q-1-1) [🔗](#rq-gt-paths-q)[🔗](#rqs-gt-paths)

### Exercises Practice Problems

#### 1.

Activate ![a graph through which to find an Euler trail](/images/discrete-math/sec_gt-paths-webwork-52-image-1.png.webp) Consider the graph given above. Give an Euler trail through the graph by listing the vertices in the order visited.[🔗](#extracted-webwork-52-1-1-2) [🔗](#ww-gt-eulertrail)

#### 2.

Activate Which of the following graphs have Euler circuits?[🔗](#extracted-webwork-53-1-1-1)

| ![graph which may have an Euler circuit](/images/discrete-math/sec_gt-paths-webwork-53-image-1.png.webp) | ![graph which may have an Euler circuit](/images/discrete-math/sec_gt-paths-webwork-53-image-2.png.webp) |
| --- | --- |
| A: Has Euler circuit. | B: Has Euler circuit. |
|  |  |
| ![graph which may have an Euler circuit](/images/discrete-math/sec_gt-paths-webwork-53-image-3.png.webp) | ![graph which may have an Euler circuit](/images/discrete-math/sec_gt-paths-webwork-53-image-4.png.webp) |
| C: Has Euler circuit. | D: Has Euler circuit.[🔗](#extracted-webwork-53-1-1-2-5-2-1-1) |
|  |  |

[🔗](#ww-gt-eulercirc)

#### 3.

Activate Which of the following graphs have Euler circuits or Euler trails?[🔗](#extracted-webwork-54-1-1-1)

| ![a graph which may have an Euler circuit or trail](/images/discrete-math/sec_gt-paths-webwork-54-image-1.png.webp) | ![a graph which may have an Euler circuit or trail](/images/discrete-math/sec_gt-paths-webwork-54-image-2.png.webp) |
| --- | --- |
| A: Has Euler trail. | B: Has Euler trail. |
| A: Has Euler circuit. | B: Has Euler circuit. |
|  |  |
| ![a graph which may have an Euler circuit or trail](/images/discrete-math/sec_gt-paths-webwork-54-image-3.png.webp) | ![a graph which may have an Euler circuit or trail](/images/discrete-math/sec_gt-paths-webwork-54-image-4.png.webp) |
| C: Has Euler trail. | D: Has Euler trail. |
| C: Has Euler circuit. | D: Has Euler circuit.[🔗](#extracted-webwork-54-1-1-2-7-2-1-1) |
|  |  |

[🔗](#ww-gt-iseuler)

#### 4.

Activate ![a graph that can have an Euler trail with the addition of one edge](/images/discrete-math/sec_gt-paths-webwork-55-image-1.png.webp) Consider the graph given above. Add an edge so the resulting graph has an Euler trail (without repeating an existing edge). [🔗](#extracted-webwork-55-1-1-2) Now give an Euler trail through the graph with this new edge by listing the vertices in the order visited.[🔗](#extracted-webwork-55-1-1-3) [🔗](#ww-gt-addforeuler)[🔗](#practice_gt-paths)

### Exercises Additional Exercises

#### 1.

You and your friends want to tour the southwest by car. You will visit the nine states below, with the following rather odd rule: You must cross each border between neighboring states exactly once (so, for example, you must cross the Colorado-Utah border exactly once). Can you do it? If so, does it matter where you start your road trip? What fact about graph theory solves this problem?[🔗](#exercises_gt-paths-2-1-1) ![A map of the United States, with Southwest states highlighted.](generated/latex-image/southwest-states.svg) [🔗](#exercises_gt-paths-2)

#### 2.

Which of the following graphs contain an Euler trail? Which contain an Euler circuit?

1. \(\displaystyle K_4\) [🔗](#exercises_gt-paths-3-1-1-1-1)
2. \(\displaystyle K_5\) [🔗](#exercises_gt-paths-3-1-1-1-2)
3. \(\displaystyle K_{5,7}\) [🔗](#exercises_gt-paths-3-1-1-1-3)
4. \(\displaystyle K_{2,7}\) [🔗](#exercises_gt-paths-3-1-1-1-4)
5. \(\displaystyle C_7\) [🔗](#exercises_gt-paths-3-1-1-1-5)
6. \(\displaystyle P_7\) [🔗](#exercises_gt-paths-3-1-1-1-6)

[🔗](#exercises_gt-paths-3-1-1) [🔗](#exercises_gt-paths-3)

#### 3.

Edward A. Mouse has just finished his brand new house. The floor plan is shown below:[🔗](#exercises_gt-paths-4-1-1) ![A rectangle subdivided into seven smaller rectangles, with three on top, and four below. The top-left rectangle has gaps leading to the top-middle and bottom-left rectangles. The top-middle rectangle also has gaps to the two bottom-middle rectangles and the top-right rectangle. The top-right rectangle has gaps leading to the bottom-right rectangle and the bottom-middle-right rectangle. The bottom rectangles have gaps leading to the bottom rectangles adjacent to them.](generated/latex-image/mouse-house.svg)

1. Edward wants to give a tour of his new pad to a lady-mouse friend. Is it possible for them to walk through every doorway exactly once? If so, in which rooms must they begin and end the tour? Explain.[🔗](#exercises_gt-paths-4-1-3-1-1-1) [🔗](#exercises_gt-paths-4-1-3-1-1)
2. Is it possible to tour the house visiting each room exactly once (not necessarily using every doorway)? Explain.[🔗](#exercises_gt-paths-4-1-3-1-2-1) [🔗](#exercises_gt-paths-4-1-3-1-2)
3. After a few mouse-years, Edward decides to remodel. He would like to add some new doors between the rooms he has. Of course, he cannot add any doors to the exterior of the house. Is it possible for each room to have an odd number of doors? Explain.[🔗](#exercises_gt-paths-4-1-3-1-3-1) [🔗](#exercises_gt-paths-4-1-3-1-3)

[🔗](#exercises_gt-paths-4-1-3) [🔗](#exercises_gt-paths-4)

#### 4.

For which \(n\) does the graph \(K_n\) contain an Euler circuit? Explain.[🔗](#exercises_gt-paths-5-1-1) [🔗](#exercises_gt-paths-5)

#### 5.

For which \(m\) and \(n\) does the graph \(K_{m,n}\) contain an Euler trail? An Euler circuit? Explain.[🔗](#exercises_gt-paths-6-1-1) [🔗](#exercises_gt-paths-6)

#### 6.

For which \(n\) does \(K_n\) contain a Hamilton path? A Hamilton cycle? Explain.[🔗](#exercises_gt-paths-7-1-1) [🔗](#exercises_gt-paths-7)

#### 7.

For which \(m\) and \(n\) does the graph \(K_{m,n}\) contain a Hamilton path? A Hamilton cycle? Explain.[🔗](#exercises_gt-paths-8-1-1) Hint. This is harder than the previous three questions. Think about which “side” of the graph the Hamilton path would need to be on at every other step.[🔗](#exercises_gt-paths-8-2-1) [🔗](#exercises_gt-paths-8-2) [🔗](#exercises_gt-paths-8)

#### 8.

A bridge builder has come to Königsberg and would like to add bridges so that it *is* possible to travel over every bridge exactly once. How many bridges must be built?[🔗](#exercises_gt-paths-9-1-1) [🔗](#exercises_gt-paths-9)

#### 9.

Below is a graph representing friendships between a group of students (each vertex is a student and each edge is a friendship). Is it possible for the students to sit around a round table in such a way that every student sits between two friends? What does this question have to do with trails?[🔗](#exercises_gt-paths-10-1-1) ![A complicated graph containing 9 vertices arranged in a circle. If we call the vertex at the top of the circle 1, and number them proceeding clockwise, then vertex 1 is adjacent to 2, 4, 6, and 7. Vertex 2 is also adjacent to 4 and 7. Vertex 3 is adjacent to 6 and 8. Vertex 4 is adjacent to 6, 7, 8, and 9. Vertex 5 is adjacent to 6, 8, and 9. Vertex 7 is also adjacent to 8.](generated/latex-image/graph-10-friends.svg) Hint. If you read off the names of the students in order, you would need to read each student’s name exactly once, and the last name would need to be of a student who was friends with the first. What sort of a cycle is this?[🔗](#exercises_gt-paths-10-2-1) [🔗](#exercises_gt-paths-10-2) [🔗](#exercises_gt-paths-10)

#### 10.

On the table rest 8 dominoes, as shown below. If you were to line them up in a single row, so that any two sides touching had matching numbers, what would the sum of the two end numbers be?[🔗](#exercises_gt-paths-11-3-1) ![A domino with two dots and four dots.](generated/latex-image/d24.svg) ![A domino with six dots and two dots.](generated/latex-image/d62.svg) ![A domino with one dot and three dots.](generated/latex-image/d13.svg) ![A domino with four dots and six dots.](generated/latex-image/d46.svg) ![A domino with five dots and three dots.](generated/latex-image/d53.svg) ![A domino with four dots and three dots.](generated/latex-image/d43.svg) ![A domino with six dots and five dots.](generated/latex-image/d65.svg) ![A domino with three dots and six dots.](generated/latex-image/d36.svg) Hint. Draw a graph with 6 vertices and 8 edges. What sort of walk would be appropriate?[🔗](#exercises_gt-paths-11-4-1) [🔗](#exercises_gt-paths-11-4) [🔗](#exercises_gt-paths-11)

#### 11.

Is there anything we can say about whether a graph has a Hamilton path based on the degrees of its vertices?

1. Suppose a graph has a Hamilton path. What is the maximum number of vertices of degree one the graph can have? Explain why your answer is correct.[🔗](#exercises_gt-paths-12-1-1-1-1-1) [🔗](#exercises_gt-paths-12-1-1-1-1)
2. Find a graph that does not have a Hamilton path even though no vertex has degree one. Explain why your example works.[🔗](#exercises_gt-paths-12-1-1-1-2-1) [🔗](#exercises_gt-paths-12-1-1-1-2)

[🔗](#exercises_gt-paths-12-1-1) [🔗](#exercises_gt-paths-12)

#### 12.

Consider the following graph:[🔗](#exercises_gt-paths-13-3-1) ![A graph with 11 vertices. Eight of these are arranged in a circle and with eight edges form the border of an octagon. The other three vertices are in a horizontal row in the center of the octagon. Edges connect the top and bottom vertices of the octagon to the left and right inner vertices. The left outer vertex is adjacent to the inner left vertex, and the right outer vertex is adjacent to the inner right vertex. The remaining four vertices of the octagon are adjacent to the center vertex.](generated/latex-image/gt-ham-bipart.svg)

1. Find a Hamilton path. Can your path be extended to a Hamilton cycle? [🔗](#exercises_gt-paths-13-3-3-1-1)
2. Is the graph bipartite? If so, how many vertices are in each “part”? [🔗](#exercises_gt-paths-13-3-3-1-2)
3. Use your answer to part (b) to prove that the graph has no Hamilton cycle. [🔗](#exercises_gt-paths-13-3-3-1-3)
4. Suppose you have a bipartite graph \(G\) in which one part has at least two more vertices than the other. Prove that \(G\) does not have a Hamilton path. [🔗](#exercises_gt-paths-13-3-3-1-4)

[🔗](#exercises_gt-paths-13-3-3) [🔗](#exercises_gt-paths-13)[🔗](#exercises_gt-paths)[🔗](#sec_gt-paths) [&#xe5cb;Prev](sec_gt-planar.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_coloring.html) [Feedback](/cdn-cgi/l/email-protection#f39c80909281dd9f96859a9db3869d909cdd969786)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_gt-paths-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_gt-paths-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
