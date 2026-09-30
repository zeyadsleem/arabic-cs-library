---
title: "Graph Theory"
lang: en
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 2.1 Problems and Definitions

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_gt-intro-2-1-1)

1. Use the language of graph theory to describe properties of graphs.[🔗](#sec_gt-intro-2-2-1-1) [🔗](#sec_gt-intro-2-2-1)
2. Utilize multiple representations of graphs.[🔗](#sec_gt-intro-2-2-2-1) [🔗](#sec_gt-intro-2-2-2)
3. Apply the Handshake Lemma to answer questions about graphs and problems they represent.[🔗](#sec_gt-intro-2-2-3-1) [🔗](#sec_gt-intro-2-2-3)

[🔗](#sec_gt-intro-2)

### Subsection Section Preview

#### Investigate!

In the time of Euler, in the town of Königsberg in Prussia, there was a river containing two islands. The islands were connected to the banks of the river by seven bridges (as seen below). The bridges were very beautiful, and on their days off, townspeople would spend time walking over the bridges. As time passed, a question arose: Was it possible to plan a walk so that you cross each bridge once and only once? Euler was able to answer this question. Are you?[🔗](#subsec-gt-intro-preview-2-4) ![Drawing of a river (blue) running left to right with two islands. There are 7 bridges over the river: two from the top bank to the left island, two from the left island to the bottom bank, and a bridge from the right island to each of the top bank, bottom bank, and left island.](generated/latex-image/gt-bridges-art.svg) [🔗](#subsec-gt-intro-preview-2)Graph Theory is a relatively new area of mathematics, first studied by the super famous mathematician Leonhard Euler in 1735. Since then it has blossomed into a powerful tool used in nearly every branch of science and is currently an active area of mathematics research.[🔗](#subsec-gt-intro-preview-3) The problem above, known as the *Seven Bridges of Königsberg*, is the problem that originally inspired graph theory. Consider a “different” problem: Below is a drawing of four dots connected by some lines. Is it possible to trace over each line once and only once (without lifting your pencil, starting and ending on a dot)?[🔗](#subsec-gt-intro-preview-4) ![Three dots aligned in a vertical column left of a single dot on the right. Lines connect the dot on the right to each dot on the left. Among the dots on the left, two arced lines connect the bottom dot to the center dot, and two more connect the center dot to the top dot.](generated/latex-image/gt-bridges-graph.svg) There is an obvious connection between these two problems. Any path in the dot and line drawing corresponds exactly to a path over the bridges of Königsberg.[🔗](#subsec-gt-intro-preview-6) Pictures like this dot and line drawing are called graphs (although technically, the picture above is a multigraph). Graphs are made up of a collection of dots called vertices and lines connecting those dots called edges. When two vertices are connected by an edge, we say they are adjacent. The nice thing about looking at graphs instead of pictures of rivers, islands, and bridges is that we now have a mathematical object to study. We have distilled the “important” parts of the bridge picture for the problem. It does not matter how big the islands are, what the bridges are made out of, if the river contains alligators, etc. All that matters is which land masses are connected to which other land masses, and how many times. This was the great insight Euler had.[🔗](#subsec-gt-intro-preview-7) We will return to the question of finding paths through graphs in [Section 2.4](sec_gt-paths.html). In this section, we will explore various ways that graphs can be used to represent, or *model*, real-world problems. Along the way, we will introduce some basic definitions, terminology, and notation that will be used in the rest of the chapter.[🔗](#subsec-gt-intro-preview-8)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-gt-intro)

To get a feel for graphs and the types of questions we want to ask about them, let’s explore four examples of graphs.[🔗](#PA-gt-intro-2-1) \(G_1\text{:}\)[🔗](#PA-gt-intro-2-2-1-1) \(G_2\text{:}\)[🔗](#PA-gt-intro-2-2-1-2) ![Petersen graph: ten vertices each with three edges. Five of the vertices form a 5-pointed star, the other five a pentagon, edges connecting the vertices of the star and the pentagon.](generated/latex-image/img-intro-petersen.svg) ![A graph with six vertices arranged in two rows of three. The top vertices are labeled v1, v2, v3 from left to right. The bottom vertices are labeled v6, v5, v4 from left to right. Three edges connect each vertex in the top row to the vertex below it. Four more edges connect vertices on the top row and along the bottom row in two X configurations.](generated/latex-image/img-graph-labeled.svg) \(G_3\text{:}\)[🔗](#PA-gt-intro-2-3-1-1) \(G_4\text{:}\)[🔗](#PA-gt-intro-2-3-1-2)

| vertex | adjacent to |
| --- | --- |
| \(a\) | \(b, c\) |
| \(b\) | \(a,f\) |
| \(c\) | \(a, d, e\) |
| \(d\) | \(c,e,f\) |
| \(e\) | \(c,d\) |
| \(f\) | \(b,d\) |

\begin{equation*} \begin{pmatrix} 0 \amp 0 \amp 1 \amp 0 \amp 1 \amp 0 \\ 0 \amp 0 \amp 0 \amp 0 \amp 0 \amp 1 \\ 1 \amp 0 \amp 0 \amp 0 \amp 0 \amp 0 \\ 0 \amp 0 \amp 0 \amp 0 \amp 1 \amp 1 \\ 1 \amp 0 \amp 0 \amp 1 \amp 0 \amp 0 \\ 0 \amp 1 \amp 0 \amp 1 \amp 0 \amp 0 \end{pmatrix} \end{equation*} [🔗](#PA-gt-intro-2-3-2-2) The graph \(G_3\) is presented as an adjacency list where each vertex gets a list of which other vertices it is adjacent to. The graph \(G_4\) is presented as an adjacency matrix where the rows and columns correspond to the vertices and the entries are 1 if the vertices are adjacent and 0 otherwise. Before answering the questions below, it might be helpful to draw a more traditional representation of these graphs.[🔗](#PA-gt-intro-2-4)

#### 1. Counting vertices and edges.

Activate First, let’s count the number of vertices and edges in each graph.[🔗](#extracted-webwork-23-1-1-1) Number of vertices: \(G_1\text{:}\) ; \(G_2\text{:}\) ; \(G_3\text{:}\) ; \(G_4\text{:}\) .[🔗](#extracted-webwork-23-1-1-2) Number of edges: \(G_1\text{:}\) ; \(G_2\text{:}\) ; \(G_3\text{:}\) ; \(G_4\text{:}\) .[🔗](#extracted-webwork-23-1-1-3) [🔗](#pa-gt-intro-1)

#### 2. Degree sequence.

Activate We call the number of edges incident to a particular vertex (i.e., the number of edges “coming out of” the vertex) the degree of the vertex. A list of the degrees of all the vertices in non-increasing order is called a degree sequence for the graph. Find the degree sequence for each graph.[🔗](#extracted-webwork-24-1-1-1) \(G_1\) has degree sequence: .[🔗](#extracted-webwork-24-1-1-2) \(G_2\) has degree sequence: .[🔗](#extracted-webwork-24-1-1-3) \(G_3\) has degree sequence: .[🔗](#extracted-webwork-24-1-1-4) \(G_4\) has degree sequence: .[🔗](#extracted-webwork-24-1-1-5) [🔗](#pa-gt-intro-2)

#### 3. Paths and cycles.

Activate We often care about paths between vertices in a graph. A graph is connected if there is a path between every pair of vertices. Sometimes there is a path that starts at a vertex and eventually comes back to itself, which is called a cycle.[🔗](#extracted-webwork-25-1-1-1)

#### (a)

Which of the graphs are connected?[🔗](#extracted-webwork-25-1-2-1-1)

- \(\displaystyle G_1\)[🔗](#extracted-webwork-25-1-2-1-2-1-1-1) [🔗](#extracted-webwork-25-1-2-1-2-1-1)
- \(\displaystyle G_2\)[🔗](#extracted-webwork-25-1-2-1-2-1-2-1) [🔗](#extracted-webwork-25-1-2-1-2-1-2)
- \(\displaystyle G_3\)[🔗](#extracted-webwork-25-1-2-1-2-1-3-1) [🔗](#extracted-webwork-25-1-2-1-2-1-3)
- \(\displaystyle G_4\)[🔗](#extracted-webwork-25-1-2-1-2-1-4-1) [🔗](#extracted-webwork-25-1-2-1-2-1-4)
- None of the above[🔗](#extracted-webwork-25-1-2-1-2-1-5-1) [🔗](#extracted-webwork-25-1-2-1-2-1-5)

[🔗](#extracted-webwork-25-1-2-1-2) [🔗](#extracted-webwork-25-1-2)

#### (b)

Which of the graphs contain cycles?[🔗](#extracted-webwork-25-1-3-1-1)

- \(\displaystyle G_1\)[🔗](#extracted-webwork-25-1-3-1-2-1-1-1) [🔗](#extracted-webwork-25-1-3-1-2-1-1)
- \(\displaystyle G_2\)[🔗](#extracted-webwork-25-1-3-1-2-1-2-1) [🔗](#extracted-webwork-25-1-3-1-2-1-2)
- \(\displaystyle G_3\)[🔗](#extracted-webwork-25-1-3-1-2-1-3-1) [🔗](#extracted-webwork-25-1-3-1-2-1-3)
- \(\displaystyle G_4\)[🔗](#extracted-webwork-25-1-3-1-2-1-4-1) [🔗](#extracted-webwork-25-1-3-1-2-1-4)
- None of the above[🔗](#extracted-webwork-25-1-3-1-2-1-5-1) [🔗](#extracted-webwork-25-1-3-1-2-1-5)

[🔗](#extracted-webwork-25-1-3-1-2) [🔗](#extracted-webwork-25-1-3)

#### (c)

Graphs that are connected and contain no cycles are called trees. For each graph, how many edges must you remove to turn it into a tree? (If it is already a tree, the answer would be 0.)[🔗](#extracted-webwork-25-1-4-1-1) \(G_1\text{:}\) ; \(G_2\text{:}\) ; \(G_3\text{:}\) ; \(G_4\text{:}\) .[🔗](#extracted-webwork-25-1-4-1-2) [🔗](#extracted-webwork-25-1-4) [🔗](#pa-gt-intro-3)

#### 4. Edge crossings.

Activate For which of the graphs is it possible to draw the graph in such a way that no edges cross?[🔗](#extracted-webwork-26-1-1-1)

- \(\displaystyle G_4\)[🔗](#extracted-webwork-26-1-1-2-1-1-1) [🔗](#extracted-webwork-26-1-1-2-1-1)
- \(\displaystyle G_1\)[🔗](#extracted-webwork-26-1-1-2-1-2-1) [🔗](#extracted-webwork-26-1-1-2-1-2)
- \(\displaystyle G_3\)[🔗](#extracted-webwork-26-1-1-2-1-3-1) [🔗](#extracted-webwork-26-1-1-2-1-3)
- \(\displaystyle G_2\)[🔗](#extracted-webwork-26-1-1-2-1-4-1) [🔗](#extracted-webwork-26-1-1-2-1-4)
- None of the above[🔗](#extracted-webwork-26-1-1-2-1-5-1) [🔗](#extracted-webwork-26-1-1-2-1-5)

[🔗](#extracted-webwork-26-1-1-2) [🔗](#pa-gt-intro-4)

#### 5. Coloring vertices.

Activate Suppose we color each vertex of a graph so that adjacent vertices always have different colors. The smallest number of colors needed to do this is called the chromatic number of the graph. Find the chromatic number for each graph.[🔗](#extracted-webwork-27-1-1-1) \(G_1\text{:}\) ; \(G_2\text{:}\) ; \(G_3\text{:}\) ; \(G_4\text{:}\) .[🔗](#extracted-webwork-27-1-1-2) Note: If the graphs represented friendships between people, then the chromatic number would tell us the minimum number of groups we would need if we wanted to divide up everyone into groups of people who were not yet friends.[🔗](#extracted-webwork-27-1-1-3) [🔗](#pa-gt-intro-5)[🔗](#PA-gt-intro)[🔗](#subsec-gt-intro-preview)

### Subsection What is a Graph?

Before we start studying graphs, we need to agree upon what a graph is. While we almost always think of graphs as pictures (dots connected by lines), this is fairly ambiguous. Do the lines need to be straight? Does it matter how long the lines are or how large the dots are? Can there be two lines connecting the same pair of dots? Can one line connect three dots?[🔗](#sec_gt-intro-5-2) The way we avoid ambiguities in mathematics is to provide concrete and rigorous *definitions*. Crafting good definitions is not easy, but it is incredibly important. The definition is the agreed-upon starting point from which all truths in mathematics proceed. Is there a graph with no edges? We have to look at the definition to see if this is possible.[🔗](#sec_gt-intro-5-3) We want our definition to be precise and unambiguous, but it also must agree with our intuition for the objects we are studying. It needs to be useful: We *could* define a graph to be a six-legged mammal, but that would not let us solve any problems about bridges. Instead, here is the (now) standard definition of a graph.[🔗](#sec_gt-intro-5-4)

#### Definition 2.1.1. Graph.

A graph is an ordered pair \(G = (V, E)\) consisting of a nonempty set \(V\) (called the vertices) and a set \(E\) (called the edges) of two-element subsets of \(V\text{.}\)[🔗](#sec_gt-intro-5-5-7-1) [🔗](#sec_gt-intro-5-5) Strange. Nowhere in the definition is there talk of dots or lines. From the definition, a graph could be \begin{equation*} (\{a,b,c,d\}, \{\{a,b\}, \{a,c\}, \{b,c\}, \{b,d\}, \{c,d\}\})\text{.} \end{equation*} Here we have a graph with four vertices (the letters \(a, b, c, d\)) and five edges (the pairs \(\{a,b\}, \{a,c\}, \{b,c\}, \{b,d\}, \{c,d\})\)). [🔗](#sec_gt-intro-5-6) Looking at sets and sets of 2-element sets is difficult to process. That is why we often draw a representation of these sets. We put a dot down for each vertex, and connect two dots with a line precisely when those two vertices are one of the 2-element subsets in our set of edges. Thus one way to draw the graph described above is this:[🔗](#sec_gt-intro-5-7) ![Four vertices arranged in a square, with edges on the border of the square and one connecting the bottom left vertex to the top right vertex. Vertices are labeled a (top left), b (top right), c (bottom left) and d (bottom right).](generated/latex-image/img-graph-labeled-sqaure-diag.svg) However we could also have drawn the graph differently. For example either of these:[🔗](#sec_gt-intro-5-9) ![Four vertices arranged in a square. Vertices are labeled a (top left), d (top right), c (bottom left) and b (bottom right). Edges connect a to c and b, d to b and c, and c to b.](generated/latex-image/img-graph-labeled-alt1.svg) ![Four vertices arranged in a horizontal row, labeled a, b, c, and d from left to right. Edges connect each vertex to the one on its right. A curved edge connects a to c, and another curved edge connects b to d.](generated/latex-image/img-graph-labeled-alt2.svg) We should be careful about what it means for two graphs to be “the same.” Actually, given our definition, this is easy: Are the vertex sets equal? Are the edge sets equal? We know what it means for sets to be equal, and graphs are nothing but a pair of two special sorts of sets.[🔗](#sec_gt-intro-5-11)

#### Example 2.1.2.

Are the graphs below equal? \begin{equation*} G_1 = (\{a,b,c\}, \{\{a,b\}, \{b,c\}\}); \qquad G_2 = (\{a,b,c\}, \{\{a,c\}, \{c, b\}\})\text{.} \end{equation*} [🔗](#sec_gt-intro-5-12-3-1) Solution. No. Here the vertex sets of each graph are equal, which is a good start. Also, both graphs have two edges. In the first graph, we have edges \(\{a,b\}\) and \(\{b,c\}\text{,}\) while in the second graph we have edges \(\{a,c\}\) and \(\{c,b\}\text{.}\) Of course, \(\{b,c\} = \{c,b\}\text{,}\) so that is not the problem. The issue is that \(\{a,b\} \ne \{a,c\}\text{.}\) Since the edge sets of the two graphs are not equal (as sets), the graphs are not equal (as graphs).[🔗](#sec_gt-intro-5-12-4-1) [🔗](#sec_gt-intro-5-12-4) [🔗](#sec_gt-intro-5-12)Even if two graphs are not *equal*, they might be *basically* the same. The graphs in the previous example could be drawn like this:[🔗](#sec_gt-intro-5-13) ![Two graphs with three vertices each arranged in a horizontal row. Edges connect vertices to the vertex on either side of it. The graph on the left (G1) has vertices labeled a, b, c from left to right. The graph on the right (G2) has vertices labeled a, c, b from left to right.](generated/latex-image/img-labeled-p2s.svg) Graphs that are basically the same (but perhaps not equal) are called isomorphic. We will give a precise definition of this term after a quick example:[🔗](#sec_gt-intro-5-15)

#### Example 2.1.3.

Consider the graphs: \begin{equation*} G_1 = (V_1, E_1) \text{ where } V_1 = \{a, b, c\} \text{ and } E_1 = \{\{a,b\}, \{a,c\}, \{b,c\}\}; \end{equation*} \begin{equation*} G_2 = (V_2, E_2) \text{ where } V_2 = \{u,v,w\} \text{ and }E_2 = \{\{u,v\}, \{u,w\}, \{v,w\}\}. \end{equation*} [🔗](#sec_gt-intro-5-16-1-1) Are these graphs the same?[🔗](#sec_gt-intro-5-16-1-2) Solution. The two graphs are NOT equal. It is enough to notice that \(V_1 \ne V_2\) since \(a \in V_1\) but \(a \notin V_2\text{.}\) However, both of these graphs consist of three vertices with edges connecting every pair of vertices. We can draw them as follows:[🔗](#sec_gt-intro-5-16-2-1) ![A graph with three vertices arranged as a triangle, with edges along the border of the triangle. The vertices are labeled a, b, and c.](generated/latex-image/img-labeled-c3.svg) ![A graph with three vertices arranged as a triangle, with edges along the border of the triangle. The vertices are labeled u, v, and w.](generated/latex-image/img-labeled-c3-alt.svg) Clearly we want to say these graphs are basically the same, so while they are not equal, they will be *isomorphic*. We can rename the vertices of one graph and get the second graph as the result.[🔗](#sec_gt-intro-5-16-2-3) [🔗](#sec_gt-intro-5-16-2) [🔗](#sec_gt-intro-5-16) Intuitively, graphs are isomorphic if they are basically the same, or better yet, if they are the same except for the names of the vertices. To make the concept of renaming vertices precise, we give the following definitions:[🔗](#sec_gt-intro-5-17)

#### Definition 2.1.4.

An isomorphism between two graphs \(G_1\) and \(G_2\) is a bijection \(f:V_1 \to V_2\) between the vertices of the graphs such that \(\{a,b\}\) is an edge in \(G_1\) if and only if \(\{f(a), f(b)\}\) is an edge in \(G_2\text{.}\)[🔗](#sec_gt-intro-5-18-4-1) Two graphs are isomorphic if there is an isomorphism between them. In this case we write \(G_1 \isom G_2\text{.}\)[🔗](#sec_gt-intro-5-18-4-2) [🔗](#sec_gt-intro-5-18)An isomorphism is simply a function which renames the vertices. It must be a bijection so every vertex gets a new name. These newly named vertices must be connected by edges precisely when they were connected by edges with their old names.[🔗](#sec_gt-intro-5-19)

#### Example 2.1.5.

Decide whether the graphs \(G_1 = (V_1, E_1)\) and \(G_2 = (V_2, E_2)\) are equal or isomorphic.[🔗](#sec_gt-intro-5-20-2-1) \(V_1 = \{a,b,c,d\}\text{,}\) \(E_1 = \{\{a,b\}, \{a,c\}, \{a,d\}, \{c,d\}\}\)[🔗](#sec_gt-intro-5-20-2-2) \(V_2 = \{a,b,c,d\}\text{,}\) \(E_2 = \{\{a,b\}, \{a,c\}, \{b,c\}, \{c,d\}\}\)[🔗](#sec_gt-intro-5-20-2-3) Solution. The graphs are NOT equal, since \(\{a,d\} \in E_1\) but \(\{a,d\} \notin E_2\text{.}\) However, since both graphs contain the same number of vertices and the same number of edges, they *might* be isomorphic (this is not enough in most cases, but it is a good start).[🔗](#sec_gt-intro-5-20-3-1) We can try to build an isomorphism. How about we say \(f(a) = b\text{,}\) \(f(b) = c\text{,}\) \(f(c) = d\) and \(f(d) = a\text{.}\) This is definitely a bijection, but to make sure that the function is an isomorphism, we must make sure it *respects the edge relation*. In \(G_1\text{,}\) vertices \(a\) and \(b\) are connected by an edge. In \(G_2\text{,}\) \(f(a) = b\) and \(f(b) = c\) are connected by an edge. So far, so good, but we must check the other three edges. The edge \(\{a,c\}\) in \(G_1\) corresponds to \(\{f(a), f(c)\} = \{b,d\}\text{,}\) but here we have a problem. There is no edge between \(b\) and \(d\) in \(G_2\text{.}\) Thus \(f\) is NOT an isomorphism.[🔗](#sec_gt-intro-5-20-3-2) Not all hope is lost, however. Just because \(f\) is not an isomorphism does not mean that there is no isomorphism at all. We can try again. At this point it might be helpful to draw the graphs to see how they should match up.[🔗](#sec_gt-intro-5-20-3-3) ![The graph G1 with four vertices arranged in a diamond. The top vertex (a) is connected to the three other vertices (d on the left, b on the right, and c below). There is one additional edge between d and c.](generated/latex-image/img-isom-g1.svg) ![The graph G2 with four vertices arranged in a diamond. The top vertex (a) is connected to the vertices c below and b on the right. There is two additional edges between d (left) and c and between b and c .](generated/latex-image/img-isom-g2.svg) Alternatively, notice that in \(G_1\text{,}\) the vertex \(a\) is adjacent to every other vertex. In \(G_2\text{,}\) there is also a vertex with this property: \(c\text{.}\) So build the bijection \(g:V_1 \to V_2\) by defining \(g(a) = c\) to start with. Next, where should we send \(b\text{?}\) In \(G_1\text{,}\) the vertex \(b\) is only adjacent to vertex \(a\text{.}\) There is exactly one vertex like this in \(G_2\text{,}\) namely \(d\text{.}\) So let \(g(b) = d\text{.}\) As for the last two, in this example, we have a free choice: let \(g(c) = b\) and \(g(d) = a\) (switching these would be fine as well).[🔗](#sec_gt-intro-5-20-3-5) We should check that this really is an isomorphism. It is definitely a bijection. We must make sure that the edges are respected. The four edges in \(G_1\) are \begin{equation*} \{a,b\}, \{a,c\}, \{a,d\}, \{c,d\}\text{.} \end{equation*} [🔗](#sec_gt-intro-5-20-3-6) Under the proposed isomorphism these become \begin{equation*} \{g(a), g(b)\}, \{g(a), g(c)\}, \{g(a), g(d)\}, \{g(c), g(d)\} \end{equation*} \begin{equation*} \{c,d\}, \{c,b\}, \{c,a\}, \{b,a\}\text{,} \end{equation*} which are precisely the edges in \(G_2\text{.}\) Thus \(g\) is an isomorphism, so \(G_1 \cong G_2\) [🔗](#sec_gt-intro-5-20-3-7) [🔗](#sec_gt-intro-5-20-3) [🔗](#sec_gt-intro-5-20) Sometimes we will talk about a graph with a special name (like \(K_n\) or the *Petersen graph*) or perhaps draw a graph without any labels. In this case, we are really referring to *all* graphs isomorphic to any copy of that particular graph. A collection of isomorphic graphs is often called an isomorphism class. 1 This is not unlike geometry, where we might have more than one copy of a particular triangle. There instead of *isomorphic* we say *congruent*.[🔗](#sec_gt-intro-5-21) There are other relationships between graphs that we care about, other than equality and being isomorphic. For example, compare the following pair of graphs:[🔗](#sec_gt-intro-5-22) ![A graph with six vertices arranged in a hexagon, with edges between every possible pair of vertices.](generated/latex-image/img-gt-intro-k6.svg) ![Four vertices arranged in a diamond, with edges between every possible pair of vertices.](generated/latex-image/img-gt-intro-k4.svg) These are definitely not isomorphic, but notice that the graph on the right looks like it might be part of the graph on the left, especially if we draw it like this:[🔗](#sec_gt-intro-5-24) ![A graph with six vertices arranged in a hexagon with edges between every pair of vertices. Six edges are drawn in bold, forming a slanted rectangle with an X through it.](generated/latex-image/img-gt-intro-k4-in-k6.svg) We would like to say that the smaller graph is a *subgraph* of the larger.[🔗](#sec_gt-intro-5-26) We should give a careful definition of this. In fact, there are two reasonable notions for what a subgraph should mean.[🔗](#sec_gt-intro-5-27)

#### Definition 2.1.6. Subgraphs.

We say that \(G' = (V', E')\) is a subgraph of \(G = (V, E)\text{,}\) and write \(G' \subseteq G\text{,}\) provided \(V' \subseteq V\) and \(E' \subseteq E\text{.}\)[🔗](#sec_gt-intro-5-28-5-1) We say that \(G' = (V', E')\) is an induced subgraph of \(G = (V, E)\) provided \(V' \subseteq V\) and every edge in \(E\) whose vertices are still in \(V'\) is also an edge in \(E'\text{.}\)[🔗](#sec_gt-intro-5-28-5-2) [🔗](#sec_gt-intro-5-28)Notice that every induced subgraph is also an ordinary subgraph, but not conversely. Think of a subgraph as the result of deleting some vertices and edges from the larger graph. For the subgraph to be an induced subgraph, we can still delete vertices, but now we only delete those edges that included the deleted vertices.[🔗](#sec_gt-intro-5-29)

#### Example 2.1.7.

Consider the graphs:[🔗](#sec_gt-intro-5-30-1-1) ![The graph G1 consisting of six vertices arranged in a triangle. Starting with the bottom left vertex and traveling around the triangle clockwise, the vertices are labeled a, d, f, e, c, b. Edges connect vertices at the corners of the triangle to vertices along their edges of the triangle. These center vertices are also connected to each of the other center vertices.](generated/latex-image/img-subgraph-eg-g1.svg) ![The graph G2 of four vertices: a horizontal row of three, labeled a, b, c, and a vertex labeled d centered between and above a and b. Edges connect a, b, and d (forming a triangle) and a fourth edge connects b to c.](generated/latex-image/img-subgraph-eg-g2.svg) ![The graph G3 of five vertices. Vertices a, b, and c are aligned in a horizontal row. Vertices d and f form a line with a in a line that slants up and to the right. There are edges between a and d, between d and f, between d and b, and between b and c.](generated/latex-image/img-subgraph-eg-g3.svg) ![The graph G4 with five vertices: a, b, and c form a horizontal row, d and f line up with a in a line slanting up and the to the right. The vertices form a triangle, and edges are arranged to fill in the outside border of the triangle. Vertices d and b are also connected by and edge.](generated/latex-image/img-subgraph-eg-g4.svg) Here both \(G_2\) and \(G_3\) are subgraphs of \(G_1\text{.}\) But only \(G_2\) is an *induced* subgraph. Every edge in \(G_1\) that connects vertices in \(G_2\) is also an edge in \(G_2\text{.}\) In \(G_3\text{,}\) the edge \(\{a,b\}\) is in \(E_1\) but not \(E_3\text{,}\) even though vertices \(a\) and \(b\) are in \(V_3\text{.}\)[🔗](#sec_gt-intro-5-30-1-3) The graph \(G_4\) is NOT a subgraph of \(G_1\text{,}\) even though it looks like all we did is remove vertex \(e\text{.}\) The reason is that in \(E_4\) we have the edge \(\{c,f\}\text{,}\) but this is not an element of \(E_1\text{,}\) so we don’t have the required \(E_4 \subseteq E_1\text{.}\)[🔗](#sec_gt-intro-5-30-1-4) [🔗](#sec_gt-intro-5-30) Back to some basic graph theory definitions. Notice that all the graphs we have drawn above have the property that no pair of vertices is connected more than once, and no vertex is connected to itself. Graphs like these are sometimes called simple, although we will just call them *graphs*. This is because our definition of a graph says that the edges form a set of 2-element subsets of the vertices. Remember that it doesn’t make sense to say a set contains an element more than once. So no pair of vertices can be connected by an edge more than once. Also, since each edge must be a set containing two vertices, we cannot have a single vertex connected to itself by an edge.[🔗](#sec_gt-intro-5-31) That said, there are times we want to consider double (or more) edges and single-edge loops. For example, the “graph” we drew for the Bridges of Königsberg problem had double edges because there really are two bridges connecting a particular island to the near shore. We will call these objects multigraphs. This is a good name: A *multiset* is a set in which we are allowed to include a single element multiple times.[🔗](#sec_gt-intro-5-32) The graphs above are also connected: you can get from any vertex to any other vertex by following some path of edges. A graph that is not connected can be thought of as two separate graphs drawn close together. For example, the following graph is NOT connected because there is no path from \(a\) to \(b\text{:}\)[🔗](#sec_gt-intro-5-33) ![A graph consisting of eight vertices arranged in two overlapping diamonds, with edges forming the border of those diamonds. The vertex on the far left is labeled a and the vertex on the far right is labeled b.](generated/latex-image/ex-gt-non-connected.svg) Vertices in a graph do not always have edges between them. If we add all possible edges, then the resulting graph is called complete. That is, a graph is complete if every pair of vertices is connected by an edge. Since a graph is determined completely by which vertices are adjacent to which other vertices, there is only one complete graph with a given number of vertices. We give these a special name: \(K_n\) is the complete graph on \(n\) vertices.[🔗](#sec_gt-intro-5-35) Each vertex in \(K_n\) is adjacent to \(n-1\) other vertices. We call the number of edges emanating from a given vertex the degree of that vertex. So every vertex in \(K_n\) has degree \(n-1\text{.}\) How many edges does \(K_n\) have? One might think the answer should be \(n(n-1)\text{,}\) since we count \(n-1\) edges \(n\) times (once for each vertex). However, each edge is incident to 2 vertices, so we counted every edge exactly twice. Thus there are \(n(n-1)/2\) edges in \(K_n\text{.}\) Alternatively, we can say there are \({n \choose 2}\) edges, since to draw an edge we must choose 2 of the \(n\) vertices.[🔗](#sec_gt-intro-5-36) In general, if we know the degrees of all the vertices in a graph, we can find the number of edges. The sum of the degrees of all vertices will always be *twice* the number of edges, since each edge adds to the degree of two vertices. Notice this means that the sum of the degrees of all vertices in any graph must be even![🔗](#sec_gt-intro-5-37) This is our first example of a general result about all graphs. It seems innocent enough, but we will use it to prove all sorts of other statements. So let’s give it a name and state it formally.[🔗](#sec_gt-intro-5-38)

#### Lemma 2.1.8. Handshake Lemma.

In any graph, the sum of the degrees of vertices in the graph is always twice the number of edges.[🔗](#lem-handshake-5-1) [🔗](#lem-handshake) The handshake lemma 2 A *lemma* is a mathematical statement that is primarily of importance in that it is used to establish other results. is sometimes called the *degree sum formula*, and can be written symbolically as \begin{equation*} \sum_{v\in V} d(v) = 2e\text{.} \end{equation*} Here we are using the notation \(d(v)\) for the degree of the vertex \(v\text{.}\) [🔗](#sec_gt-intro-5-40) One use for the lemma is to actually find the number of edges in a graph. To do this, you must be given the degree sequence for the graph (or be able to find it from other information). This is a list of every degree of every vertex in the graph, generally written in non-increasing order.[🔗](#sec_gt-intro-5-41)

#### Example 2.1.9.

How many vertices and edges must a graph have if its degree sequence is \begin{equation*} (4, 4, 3, 3, 3, 2, 1)\text{?} \end{equation*} [🔗](#sec_gt-intro-5-42-1-1) Solution. The number of vertices is easy to find. It is the number of degrees in the sequence: 7. To find the number of edges, we compute the degree sum \begin{equation*} 4 + 4 + 3 + 3 + 3 + 2 + 1 = 20\text{,} \end{equation*} so the number of edges is half this: 10. [🔗](#sec_gt-intro-5-42-2-1) [🔗](#sec_gt-intro-5-42-2) [🔗](#sec_gt-intro-5-42)The handshake lemma also tells us what is not possible.[🔗](#sec_gt-intro-5-43)

#### Example 2.1.10.

At a recent math seminar, 9 mathematicians greeted each other by shaking hands. Is it possible that each mathematician shook hands with exactly 7 people at the seminar?[🔗](#sec_gt-intro-5-44-1-1) Solution. It seems like this should be possible. Each mathematician chooses one person to not shake hands with. But this cannot happen. We are asking whether a graph with 9 vertices can have each vertex have degree 7. If such a graph existed, the sum of the degrees of the vertices would be \(9\cdot 7 = 63\text{.}\) This would be twice the number of edges (handshakes) resulting in a graph with \(31.5\) edges. That is impossible. Thus at least one (in fact an odd number) of the mathematicians must have shaken hands with an *even* number of people at the seminar.[🔗](#sec_gt-intro-5-44-2-1) [🔗](#sec_gt-intro-5-44-2) [🔗](#sec_gt-intro-5-44)We can generalize the previous example to get the following proposition. 3 A proposition is a general statement in mathematics, similar to a theorem, although generally of lesser importance.[🔗](#sec_gt-intro-5-45)

#### Proposition 2.1.11.

In any graph, the number of vertices with odd degree must be even.[🔗](#prop-evensum-1-1) [🔗](#prop-evensum)

#### Proof.

Suppose there were a graph with an odd number of vertices with odd degree. Then the sum of the degrees in the graph would be odd, which is impossible, by the handshake lemma.[🔗](#prop-evensum-2-1) [🔗](#prop-evensum-2)We will consider further applications of the handshake lemma in the exercises.[🔗](#sec_gt-intro-5-47) One final definition: We say a graph is bipartite if the vertices can be divided into two sets, \(A\) and \(B\text{,}\) with no two vertices in \(A\) adjacent and no two vertices in \(B\) adjacent. The vertices in \(A\) can be adjacent to some or all of the vertices in \(B\text{.}\) If each vertex in \(A\) is adjacent to all the vertices in \(B\text{,}\) then the graph is a complete bipartite graph, and gets a special name: \(K_{m,n}\text{,}\) where \(|A| = m\) and \(|B| = n\text{.}\) [🔗](#sec_gt-intro-5-48)

#### Named Graphs.

Some graphs are used more than others and get special names. \(K_n\)[🔗](#sec_gt-intro-5-49-10-1-1) The complete graph on \(n\) vertices.[🔗](#sec_gt-intro-5-49-10-1-1-2) \(K_{m,n}\)[🔗](#sec_gt-intro-5-49-10-1-2) The complete bipartite graph with sets of \(m\) and \(n\) vertices. [🔗](#sec_gt-intro-5-49-10-1-2-2) \(C_n\)[🔗](#sec_gt-intro-5-49-10-1-3) The cycle on \(n\) vertices, just one big loop. [🔗](#sec_gt-intro-5-49-10-1-3-2) \(P_n\)[🔗](#sec_gt-intro-5-49-10-1-4) The path on \(n+1\) vertices (so \(n\) edges), just one long path. [🔗](#sec_gt-intro-5-49-10-1-4-2) [🔗](#sec_gt-intro-5-49-10) ![The graph K5: five vertices arranged in a pentagon. Each vertex is connected to each other vertex by an edge.](generated/latex-image/img-gt-intro-k5.svg) ![The graph K2,3: a row of two vertices on top and three on bottom. Each vertex in the top row is connected to each vertex on the bottom row.](generated/latex-image/img-gt-intro-k-2-3.svg) ![The graph C6: a cycle of six vertices connected by six edges arranged as a hexagon.](generated/latex-image/img-gt-intro-c6.svg) ![The graph P5: six vertices connected by five edges. The first and last vertex have one edge, each other vertex has two edges (connecting to the previous and next vertex on the path).](generated/latex-image/img-gt-intro-p5.svg) [🔗](#sec_gt-intro-5-49)

#### Graph Theory Definitions.

There are a lot of definitions to keep track of in graph theory. Here is a glossary of the terms we have already used and will soon encounter. Graph[🔗](#sec_gt-intro-5-50-2-1-1) A collection of vertices, some of which are connected by edges. More precisely, a pair of sets \(V\) and \(E\text{,}\) where \(V\) is a set of vertices and \(E\) is a set of 2-element subsets of \(V\text{.}\)[🔗](#sec_gt-intro-5-50-2-1-1-5) Adjacent[🔗](#sec_gt-intro-5-50-2-1-2) Two vertices are adjacent if they are connected by an edge. Two edges are adjacent if they share a vertex.[🔗](#sec_gt-intro-5-50-2-1-2-5) Bipartite graph[🔗](#sec_gt-intro-5-50-2-1-3) A graph for which it is possible to divide the vertices into two disjoint sets such that there are no edges between any two vertices in the same set.[🔗](#sec_gt-intro-5-50-2-1-3-4) Complete bipartite graph[🔗](#sec_gt-intro-5-50-2-1-4) A bipartite graph for which every vertex in the first set is adjacent to every vertex in the second set.[🔗](#sec_gt-intro-5-50-2-1-4-4) Complete graph[🔗](#sec_gt-intro-5-50-2-1-5) A graph in which every pair of vertices is adjacent.[🔗](#sec_gt-intro-5-50-2-1-5-4) Connected[🔗](#sec_gt-intro-5-50-2-1-6) A graph is connected if there is a path from any vertex to any other vertex.[🔗](#sec_gt-intro-5-50-2-1-6-4) Chromatic number[🔗](#sec_gt-intro-5-50-2-1-7) The minimum number of colors required in a proper vertex coloring of the graph.[🔗](#sec_gt-intro-5-50-2-1-7-4) Cycle[🔗](#sec_gt-intro-5-50-2-1-8) A path (see below) that starts and stops at the same vertex, but contains no other repeated vertices.[🔗](#sec_gt-intro-5-50-2-1-8-4) Degree of a vertex[🔗](#sec_gt-intro-5-50-2-1-9) The number of edges incident to a vertex.[🔗](#sec_gt-intro-5-50-2-1-9-5) Euler trail[🔗](#sec_gt-intro-5-50-2-1-10) A walk which uses each edge exactly once.[🔗](#sec_gt-intro-5-50-2-1-10-4) Euler circuit[🔗](#sec_gt-intro-5-50-2-1-11) An Euler trail which starts and stops at the same vertex.[🔗](#sec_gt-intro-5-50-2-1-11-4) Multigraph[🔗](#sec_gt-intro-5-50-2-1-12) A multigraph is just like a graph but can contain multiple edges between two vertices as well as single edge loops (that is an edge from a vertex to itself).[🔗](#sec_gt-intro-5-50-2-1-12-4) Path[🔗](#sec_gt-intro-5-50-2-1-13) A path is a walk that doesn’t repeat any vertices (or edges) except perhaps the first and last. If a path starts and ends at the same vertex, it is called a cycle.[🔗](#sec_gt-intro-5-50-2-1-13-6) Planar[🔗](#sec_gt-intro-5-50-2-1-14) A graph which can be drawn (in the plane) without any edges crossing.[🔗](#sec_gt-intro-5-50-2-1-14-4) Subgraph[🔗](#sec_gt-intro-5-50-2-1-15) We say that \(H\) is a subgraph of \(G\) if every vertex and edge of \(H\) is also a vertex or edge of \(G\text{.}\) We say \(H\) is an induced subgraph of \(G\) if every vertex of \(H\) is a vertex of \(G\) and each pair of vertices in \(H\) are adjacent in \(H\) if and only if they are adjacent in \(G\) .[🔗](#sec_gt-intro-5-50-2-1-15-6) Tree[🔗](#sec_gt-intro-5-50-2-1-16) A connected graph with no cycles. (If we remove the requirement that the graph is connected, the graph is called a forest.) The vertices in a tree with degree 1 are called leaves.[🔗](#sec_gt-intro-5-50-2-1-16-8) Vertex coloring[🔗](#sec_gt-intro-5-50-2-1-17) An assignment of colors to each of the vertices of a graph. A vertex coloring is proper if adjacent vertices are always colored differently.[🔗](#sec_gt-intro-5-50-2-1-17-5) Walk[🔗](#sec_gt-intro-5-50-2-1-18) A sequence of vertices such that consecutive vertices (in the sequence) are adjacent (in the graph). A walk in which no edge is repeated is called a trail, and a trail in which no vertex is repeated (except possibly the first and last) is called a path.[🔗](#sec_gt-intro-5-50-2-1-18-8) [🔗](#sec_gt-intro-5-50-2) [🔗](#sec_gt-intro-5-50)[🔗](#sec_gt-intro-5)

### Reading Questions Reading Questions

#### 1.

Is there more than one graph with five vertices and six edges? Explain what this question even means and how you would answer it.[🔗](#rq-gt-intro-same-1-1) [🔗](#rq-gt-intro-same)

#### 2.

Activate If a graph has 10 vertices, each with degree 4, how many edges does it have?[🔗](#extracted-webwork-28-1-1-1) Number of edges: [🔗](#extracted-webwork-28-1-1-2) [🔗](#ww-rq-gt-intro-edgecount)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-gt-intro-q-1-1) [🔗](#rq-gt-intro-q)[🔗](#rqs-gt-intro)

### Exercises Practice Problems

#### 1.

Activate Consider the graph \(\Gamma\) :[🔗](#extracted-webwork-29-1-1-1) ![the graph Gamma](/images/discrete-math/sec_gt-intro-webwork-29-image-1.png.webp) Which of the graphs below is isomorphic to \(\Gamma\text{?}\)[🔗](#extracted-webwork-29-1-1-3)

| ![graph possibly isomorphic to Gamma](/images/discrete-math/sec_gt-intro-webwork-29-image-2.png.webp) | ![graph possibly isomorphic to Gamma](/images/discrete-math/sec_gt-intro-webwork-29-image-3.png.webp) | ![graph possibly isomorphic to Gamma](/images/discrete-math/sec_gt-intro-webwork-29-image-4.png.webp) |
| --- | --- | --- |
| A | B | C[🔗](#extracted-webwork-29-1-1-4-2-3-1-1) |
|  |  |  |

Indicate the isomorphism by listing the vertices separated by commas in the order they correspond to A,B,C,D,E,F, respectively.[🔗](#extracted-webwork-29-1-1-5) [🔗](#ww-gt-isom-mc)

#### 2.

Activate Which of the following graphs are isomophic?[🔗](#extracted-webwork-30-1-1-1)

| ![one of four graphs that may be isomorphic](/images/discrete-math/sec_gt-intro-webwork-30-image-1.png.webp) | ![one of four graphs that may be isomorphic](/images/discrete-math/sec_gt-intro-webwork-30-image-2.png.webp) |
| --- | --- |
| A | B |
|  |  |
| ![one of four graphs that may be isomorphic](/images/discrete-math/sec_gt-intro-webwork-30-image-3.png.webp) | ![one of four graphs that may be isomorphic](/images/discrete-math/sec_gt-intro-webwork-30-image-4.png.webp) |
| C | D[🔗](#extracted-webwork-30-1-1-2-5-2-1-1) |
|  |  |

[🔗](#ww-gt-isomorphic)

#### 3.

Activate The graph \(G_1\) has 7 vertices, all of degree 4. How many edges does \(G_1\) have? Answer: [🔗](#extracted-webwork-31-1-1-1) The graph \(G_2\) has 8 vertices, all of degree \(k\text{.}\) Also, \(G_2\) has 20 edges. What is \(k\text{?}\) Answer: [🔗](#extracted-webwork-31-1-1-2) The graph \(G_3\) has \(v\) vertices, all of degree 4. Also, \(G_3\) has 16 edges. What is \(v\text{?}\) Answer: [🔗](#extracted-webwork-31-1-1-3) [🔗](#ww-gt-degree-sum)

#### 4.

Activate I’m thinking of a graph which has degree sequence (8,8,8,8,8,7,7,7,7). How many edges must my graph have?[🔗](#extracted-webwork-32-1-1-1) [🔗](#ww-gt-degseq)

#### 5.

Activate *1.* What is the largest \(n\) such that \(P_n\) is a subgraph of \(K_{7}\text{?}\)[🔗](#extracted-webwork-33-1-1-1) *2.* What is the largest \(n\) such that \(C_n\) is a subgraph of \(K_{7}\text{?}\)[🔗](#extracted-webwork-33-1-1-2) *3.* What is the largest \(n\) such that \(P_n\) is an *induced* subgraph of \(K_{7}\text{?}\)[🔗](#extracted-webwork-33-1-1-3) *4.* What is the largest \(n\) such that \(C_n\) is an *induced* subgraph of \(K_{7}\text{?}\)[🔗](#extracted-webwork-33-1-1-4) Hint. Remember that \(P_n\) is the path that contains \(n\) edges and \(n+1\) vertices.[🔗](#extracted-webwork-33-1-2-1) [🔗](#extracted-webwork-33-1-2) [🔗](#ww-gt-subgraph)[🔗](#practice_gt-intro)

### Exercises Additional Exercises

#### 1.

If 10 people each shake hands with each other, how many handshakes took place? What does this question have to do with graph theory?[🔗](#exercises_gt-intro-2-2-1) [🔗](#exercises_gt-intro-2)

#### 2.

Among a group of 5 people, is it possible for everyone to be friends with exactly 2 of the people in the group? What about 3 of the people in the group?[🔗](#exercises_gt-intro-3-1-1) [🔗](#exercises_gt-intro-3)

#### 3.

Is it possible for two *different* (non-isomorphic) graphs to have the same number of vertices and the same number of edges? What if the degrees of the vertices in the two graphs are the same (so both graphs have vertices with degrees 1, 2, 2, 3, and 4, for example)? Draw two such graphs or explain why not.[🔗](#exercises_gt-intro-4-1-1) Hint. Both situations are possible. Go find some examples.[🔗](#exercises_gt-intro-4-2-1) [🔗](#exercises_gt-intro-4-2) [🔗](#exercises_gt-intro-4)

#### 4.

Are the two graphs below equal? Are they isomorphic? If they are isomorphic, give the isomorphism. If not, explain.[🔗](#exercises_gt-intro-5-1-1) Graph 1: \(V = \{a,b,c,d,e\}\text{,}\) \(E = \{\{a,b\}, \{a,c\}, \{a,e\}, \{b,d\}, \{b,e\}, \{c,d\}\}\) . [🔗](#exercises_gt-intro-5-1-2) Graph 2:[🔗](#exercises_gt-intro-5-1-3) ![A graph with five vertices arranged in a pentagon, labeled a through e, starting with the vertex at the top and proceeding counterclockwise. Edges between vertices a, c, and d make a triangle. Edges between b, c, d, and e form a quadralateral.](generated/latex-image/exercises_gt-intro-5-1-4-1.svg) [🔗](#exercises_gt-intro-5)

#### 5.

Consider the following two graphs: \(G_1\)[🔗](#exercises_gt-intro-6-1-1-1-1) \(V_1=\{a,b,c,d,e,f,g\}\)[🔗](#exercises_gt-intro-6-1-1-1-1-2) \(E_1=\{\{a,b\},\{a,d\},\{b,c\},\{b,d\},\{b,e\},\)[🔗](#exercises_gt-intro-6-1-1-1-1-3) \(\quad\{b,f\},\{c,g\},\{d,e\}, \{e,f\},\{f,g\}\}\text{.}\)[🔗](#exercises_gt-intro-6-1-1-1-1-4) \(G_2\)[🔗](#exercises_gt-intro-6-1-1-1-2) \(V_2=\{v_1,v_2,v_3,v_4,v_5,v_6,v_7\}\text{,}\)[🔗](#exercises_gt-intro-6-1-1-1-2-2) \(E_2=\{\{v_1,v_4\},\{v_1,v_5\},\{v_1,v_7\},\{v_2,v_3\},\{v_2,v_6\},\)[🔗](#exercises_gt-intro-6-1-1-1-2-3) \(\quad\{v_3,v_5\},\{v_3,v_7\},\{v_4,v_5\},\{v_5,v_6\},\{v_5,v_7\}\}\text{.}\)[🔗](#exercises_gt-intro-6-1-1-1-2-4)

1. Let \(f:G_1 \rightarrow G_2\) be a function that takes the vertices of Graph 1 to vertices of Graph 2. The function is given by the following table:[🔗](#exercises_gt-intro-6-1-1-2-1-1) \(x\) \(a\) \(b\) \(c\) \(d\) \(e\) \(f\) \(g\) \(f(x)\) \(v_4\) \(v_5\) \(v_1\) \(v_6\) \(v_2\) \(v_3\) \(v_7\) Does \(f\) define an isomorphism between Graph 1 and Graph 2?[🔗](#exercises_gt-intro-6-1-1-2-1-3) [🔗](#exercises_gt-intro-6-1-1-2-1)
2. Define a new function \(g\) (with \(g \ne f\)) that defines an isomorphism between Graph 1 and Graph 2.[🔗](#exercises_gt-intro-6-1-1-2-2-1) [🔗](#exercises_gt-intro-6-1-1-2-2)
3. Is the graph pictured below isomorphic to Graph 1 and Graph 2? Explain.[🔗](#exercises_gt-intro-6-1-1-2-3-1) ![A graph with seven vertices. Six of the vertices are arranged in rectangle, three across and two down, with edges around the perimeter. The seventh vertex is in the center, with edges connecting it to the vertices directly above and below it, and to the two outside vertices in the bottom row.](generated/latex-image/exercises_gt-intro-6-1-1-2-3-2-1.svg) [🔗](#exercises_gt-intro-6-1-1-2-3)

[🔗](#exercises_gt-intro-6-1-1) [🔗](#exercises_gt-intro-6)

#### 6.

What is the largest number of edges possible in a graph with 10 vertices? What is the largest number of edges possible in a *bipartite* graph with 10 vertices? What is the largest number of edges possible in a *tree* with 10 vertices?[🔗](#exercises_gt-intro-7-1-1) Hint. The bipartite graph is a little tricky. You will definitely want a complete bipartite graph, but it could be \(K_{5,5}\) or maybe \(K_{1,9}\text{,}\) or …[🔗](#exercises_gt-intro-7-2-1) [🔗](#exercises_gt-intro-7-2) [🔗](#exercises_gt-intro-7)

#### 7.

Which of the graphs below are bipartite? Justify your answers.[🔗](#exercises_gt-intro-8-1-1) ![A graph with five vertices. Four vertices make up the corners of a diamond; the last vertex is in the center. Edges form the perimeter of the diamond and connect the center vertex to the two corners on the left and right.](generated/latex-image/exercises_gt-intro-8-1-2-1.svg) ![A graph consisting of six vertices arranged in a hexagon. Edges connect each vertex to two others, but not in a cycle around the outside of the hexagon. However, following along the edges does visit every vertex.](generated/latex-image/exercises_gt-intro-8-1-2-2.svg) ![A graph consisting of seven vertices arranged in a seven-sided polygon, with edges forming the perimeter of the polygon.](generated/latex-image/exercises_gt-intro-8-1-2-3.svg) ![A graph consisting of a single vertex with eight edges connecting to eight vertices arranged in a circle around the central vertex.](generated/latex-image/exercises_gt-intro-8-1-2-4.svg) Hint. The first graph is bipartite, which can be seen by labeling it as follows.[🔗](#exercises_gt-intro-8-2-1) ![A graph with five vertices. Four vertices make up the corners of a diamond; the last vertex is in the center. Edges form the perimeter of the diamond and connect the center vertex to the two corners on the left and right. The vertices on left and right are labeled A, the three vertices in the center column are each labeled B.](generated/latex-image/img-bipartitelabel.svg) Two of the remaining three are also bipartite.[🔗](#exercises_gt-intro-8-2-3) [🔗](#exercises_gt-intro-8-2) [🔗](#exercises_gt-intro-8)

#### 8.

For which \(n \ge 3\) is the graph \(C_n\) bipartite?[🔗](#exercises_gt-intro-9-1-1) Hint. \(C_4\) is bipartite; \(C_5\) is not. What about all the other values of \(n\text{?}\)[🔗](#exercises_gt-intro-9-2-1) [🔗](#exercises_gt-intro-9-2) [🔗](#exercises_gt-intro-9)

#### 9.

For each of the following, try to give two *different* unlabeled graphs with the given properties, or explain why doing so is impossible.

1. Two different trees with the same number of vertices and the same number of edges. A tree is a connected graph with no cycles.[🔗](#exercises_gt-intro-10-1-1-2-1-1) [🔗](#exercises_gt-intro-10-1-1-2-1)
2. Two different graphs with 8 vertices all of degree 2.[🔗](#exercises_gt-intro-10-1-1-2-2-1) [🔗](#exercises_gt-intro-10-1-1-2-2)
3. Two different graphs with 5 vertices all of degree 4.[🔗](#exercises_gt-intro-10-1-1-2-3-1) [🔗](#exercises_gt-intro-10-1-1-2-3)
4. Two different graphs with 5 vertices all of degree 3.[🔗](#exercises_gt-intro-10-1-1-2-4-1) [🔗](#exercises_gt-intro-10-1-1-2-4)

[🔗](#exercises_gt-intro-10-1-1) [🔗](#exercises_gt-intro-10)

#### 10.

Decide whether the statements below about subgraphs are true or false. For those that are true, briefly explain why (1 or 2 sentences). For any that are false, give a counterexample.

1. Any subgraph of a complete graph is also complete.[🔗](#exercises_gt-intro-11-1-1-1-1-1) [🔗](#exercises_gt-intro-11-1-1-1-1)
2. Any *induced* subgraph of a complete graph is also complete.[🔗](#exercises_gt-intro-11-1-1-1-2-1) [🔗](#exercises_gt-intro-11-1-1-1-2)
3. Any subgraph of a bipartite graph is bipartite.[🔗](#exercises_gt-intro-11-1-1-1-3-1) [🔗](#exercises_gt-intro-11-1-1-1-3)
4. Any subgraph of a tree is a tree.[🔗](#exercises_gt-intro-11-1-1-1-4-1) [🔗](#exercises_gt-intro-11-1-1-1-4)

[🔗](#exercises_gt-intro-11-1-1) [🔗](#exercises_gt-intro-11)

#### 11.

We often define graph theory concepts using set theory. For example, given a graph \(G = (V, E)\) and a vertex \(v \in V\text{,}\) we define \begin{equation*} N(v) = \{u \in V \st \{v,u\} \in E\}\text{.} \end{equation*} We define \(N[v] = N(v) \cup \{v\}\text{.}\) The goal of this problem is to figure out what all this means.

1. Let \(G\) be the graph with vertices \(V\) and edges \(E\) given by \begin{equation*} V = \{a,b,c,d,e,f\},~~E = \{\{a,b\}, \{a,e\},\{b, c\}, \{b,e\}, \{c,d\}, \{c, f\}, \{d, f\}, \{e,f\}\}\text{.} \end{equation*} Find \(N(a)\text{,}\) \(N[a]\text{,}\) \(N(c)\text{,}\) and \(N[c]\text{.}\) [🔗](#exercises_gt-intro-12-3-1-5-1-1) [🔗](#exercises_gt-intro-12-3-1-5-1)
2. What are the largest and smallest possible values for \(|N(v)|\) and \(|N[v]|\) (the sizes of these sets) for the graph in part (a)? Explain.[🔗](#exercises_gt-intro-12-3-1-5-2-1) [🔗](#exercises_gt-intro-12-3-1-5-2)
3. Give an example of a graph \(G = (V, E)\) (probably different from the one above) for which \(N[v] = V\) for some vertex \(v \in V\text{.}\) Is there a graph for which \(N[v] = V\) for *all* \(v \in V\text{?}\) Explain.[🔗](#exercises_gt-intro-12-3-1-5-3-1) [🔗](#exercises_gt-intro-12-3-1-5-3)
4. Give an example of a graph \(G = (V,E)\) for which \(N(v) = \emptyset\) for some \(v \in V\text{.}\) Is there an example of such a graph for which \(N[u] = V\) for some other \(u \in V\) as well? Explain.[🔗](#exercises_gt-intro-12-3-1-5-4-1) [🔗](#exercises_gt-intro-12-3-1-5-4)
5. Describe in words what \(N(v)\) and \(N[v]\) mean in general.[🔗](#exercises_gt-intro-12-3-1-5-5-1) [🔗](#exercises_gt-intro-12-3-1-5-5)

[🔗](#exercises_gt-intro-12-3-1) Hint. You should be able to deduce everything directly from the definition. However, perhaps it would be helpful to know that the \(N\) stands for neighborhood.[🔗](#exercises_gt-intro-12-4-1) [🔗](#exercises_gt-intro-12-4) [🔗](#exercises_gt-intro-12)

#### 12.

A graph is a way of representing the relationships between elements in a set: An edge between the vertices \(x\) and \(y\) tells us that \(x\) is related to \(y\) (which we can write as \(x \sim y\)). Not all sorts of relationships can be represented by a graph, though. For each relationship described below, either draw the graph or explain why the relationship cannot be represented by a graph.

1. The set \(V = \{1,2, \ldots, 9\}\) and the relationship \(x \sim y\) when \(x-y\) is a non-zero multiple of 3.[🔗](#exercises_gt-intro-13-1-1-6-1-1) [🔗](#exercises_gt-intro-13-1-1-6-1)
2. The set \(V = \{1,2, \ldots, 9\}\) and the relationship \(x \sim y\) when \(y\) is a multiple of \(x\text{.}\)[🔗](#exercises_gt-intro-13-1-1-6-2-1) [🔗](#exercises_gt-intro-13-1-1-6-2)
3. The set \(V = \{1,2,\ldots, 9\}\) and the relationship \(x \sim y\) when \(0 \lt |x-y| \lt 3\text{.}\)[🔗](#exercises_gt-intro-13-1-1-6-3-1) [🔗](#exercises_gt-intro-13-1-1-6-3)

[🔗](#exercises_gt-intro-13-1-1) Hint. Be careful to make sure the edges are not “directed.” In a graph, if \(a\) is adjacent to \(b\text{,}\) then \(b\) is adjacent to \(a\text{.}\) In the language of relations, we say that the edge relation is symmetric.[🔗](#exercises_gt-intro-13-2-1) [🔗](#exercises_gt-intro-13-2) [🔗](#exercises_gt-intro-13)

#### 13.

Consider graphs with \(n\) vertices. Remember, graphs do not need to be *connected*.

1. How many edges must the graph have to guarantee at least one vertex has degree two or more? Prove your answer.[🔗](#exercises_gt-intro-14-1-1-3-1-1) [🔗](#exercises_gt-intro-14-1-1-3-1)
2. How many edges must the graph have to guarantee all vertices have degree two or more? Prove your answer.[🔗](#exercises_gt-intro-14-1-1-3-2-1) [🔗](#exercises_gt-intro-14-1-1-3-2)

[🔗](#exercises_gt-intro-14-1-1) Hint. You might want to answer the questions for some specific values of \(n\) to get a feel for them, but your final answers should be in terms of \(n\text{.}\)[🔗](#exercises_gt-intro-14-2-1) [🔗](#exercises_gt-intro-14-2) [🔗](#exercises_gt-intro-14)

#### 14.

Prove that any graph with at least two vertices must have two vertices of the same degree.[🔗](#exercises_gt-intro-15-1-1) Hint. Try a small example first: Any graph with 8 vertices must have two vertices of the same degree. If not, what would the degree sequence be?[🔗](#exercises_gt-intro-15-2-1) [🔗](#exercises_gt-intro-15-2) [🔗](#exercises_gt-intro-15)

#### 15.

Suppose \(G\) is a connected graph with \(n > 1\) vertices and \(n-1\) edges. Prove that \(G\) has a vertex of degree 1.[🔗](#exr-degree1handshake-1-1) Hint. Use the [handshake lemma 2.1.8](sec_gt-intro.html#lem-handshake). What would happen if all the vertices had degree 2?[🔗](#exr-degree1handshake-2-1) [🔗](#exr-degree1handshake-2) [🔗](#exr-degree1handshake)

#### 16.

Which (if any) of the graphs below are the same?[🔗](#exercises_gt-intro-17-1) ![A graph with five vertices arranged in as a row of two on top and three on bottom. Edges connect each vertex in the top row to each vertex in the bottom row.](generated/latex-image/img-graph-k-2-3.svg) ![A graph with five vertices arranged in a pentagon. Each vertex is connected to its two neighbors around the pentagon by edges.](generated/latex-image/img-graph-c5.svg) ![A graph with five vertices arranged in a diamond with one vertex in the middle. The top vertex is connected to the two outside vertices below it, which are connected to the bottom vertex. The center vertex is connected to the two vertices to its left and right.](generated/latex-image/img-graph-k-2-3-alt.svg) ![A graph with five vertices arranged in a pentagon, with edges connecting each vertex to the two vertices farthest away from it (forming a 5-pointed star).](generated/latex-image/img-graph-c5-star.svg) ![Five vertices arranged as a diamond with one vertex in the center. The center vertex has edges between it and each of the other vertices.](generated/latex-image/img-graph-s4.svg) The graphs above are unlabeled. Usually we think of a graph as having a specific set of vertices. Which (if any) of the graphs below are the same?[🔗](#exercises_gt-intro-17-3) ![A graph with six vertices arranged in two rows of three. The top vertices are labeled b, d, f from left to right. The bottom vertices are labeled a, c, e from left to right. Three edges connect each vertex in the top row to the vertex below it. Four more edges cross from a top vertex to a bottom vertex just to the left or right (forming two X’s).](generated/latex-image/img-graph-labeled1.svg) ![A graph with six vertices arranged in two rows of three. The top vertices are labeled b, c, f from left to right. The bottom vertices are labeled a, d, e from left to right. Three edges connect each vertex in the top row to the vertex below it. Four more edges connect vertices along the top row and along the bottom row. Together this looks like two adjacent squares.](generated/latex-image/img-graph-labeled2.svg) ![A graph with six vertices arranged in two rows of three. The top vertices are labeled c, b, f from left to right. The bottom vertices are labeled a, e, d from left to right. Three edges connect each vertex in the top row to the vertex below it. Four more edges cross from a top vertex to a bottom vertex just to the left or right (forming two X’s).](generated/latex-image/img-graph-labeled3.svg) ![A graph with six vertices arranged in two rows of three. The top vertices are labeled v1, v2, v3 from left to right. The bottom vertices are labeled b6, v5, v4 from left to right. Three edges connect each vertex in the top row to the vertex below it. Four more edges connect vertices along the top row and along the bottom row. Together this looks like two adjacent squares.](generated/latex-image/img-graph-labeled4.svg) Actually, all the graphs above are just *drawings* of graphs. A graph is really an abstract mathematical object consisting of two sets \(V\) and \(E\text{,}\) where \(E\) is a set of 2-element subsets of \(V\text{.}\) Are the graphs below the same or different? Graph 1:[🔗](#exercises_gt-intro-17-5-6-1) \(V = \{a, b, c, d, e\}\text{,}\)[🔗](#exercises_gt-intro-17-5-6-1-2) \(E = \{\{a,b\}, \{a, c\}, \{a,d\}, \{a,e\}, \{b,c\}, \{d,e\}\}\) .[🔗](#exercises_gt-intro-17-5-6-1-3) Graph 2:[🔗](#exercises_gt-intro-17-5-6-2) \(V = \{v_1, v_2, v_3, v_4, v_5\}\text{,}\)[🔗](#exercises_gt-intro-17-5-6-2-2) \(E = \{\{v_1, v_3\}, \{v_1, v_5\}, \{v_2, v_4\}, \{v_2, v_5\}, \{v_3, v_5\}, \{v_4, v_5\}\}\text{.}\)[🔗](#exercises_gt-intro-17-5-6-2-3) [🔗](#exercises_gt-intro-17-5) [🔗](#exercises_gt-intro-17)[🔗](#exercises_gt-intro)[🔗](#sec_gt-intro) [&#xe5cb;Prev](ch_graphtheory.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_trees.html) [Feedback](/cdn-cgi/l/email-protection#cda2beaeacbfe3a1a8bba4a38db8a3aea2e3a8a9b8)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_gt-intro-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_gt-intro-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 2.2 Trees

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_trees-2-1-1)

1. Prove basic facts about trees.[🔗](#sec_trees-2-2-1-1) [🔗](#sec_trees-2-2-1)
2. Use theorems about trees to solve problems.[🔗](#sec_trees-2-2-2-1) [🔗](#sec_trees-2-2-2)
3. Identify and construct spanning trees.[🔗](#sec_trees-2-2-3-1) [🔗](#sec_trees-2-2-3)

[🔗](#sec_trees-2)

### Subsection Section Preview

#### Investigate!

Consider the graph drawn below.[🔗](#sec_trees-3-2-1) ![A graph with seven vertices arranged in three rows: two on top, three in the middle, and two on bottom. The four vertices on top and bottom have edges forming a square. The vertex in the middle of the middle row is adjacent to the four vertices on top and bottom. The vertices on the left and right of the middle row are adjacent to the top and bottom vertices closest to them.](generated/latex-image/sec_trees-3-2-2-1.svg)

1. Find a subgraph with the smallest number of edges that is still connected and contains all the vertices.[🔗](#sec_trees-3-2-3-1-1-1) [🔗](#sec_trees-3-2-3-1-1)
2. Find a subgraph with the largest number of edges that doesn’t contain any cycles.[🔗](#sec_trees-3-2-3-1-2-1) [🔗](#sec_trees-3-2-3-1-2)
3. What do you notice about the number of edges in your examples above? Is this a coincidence?[🔗](#sec_trees-3-2-3-1-3-1) [🔗](#sec_trees-3-2-3-1-3)

[🔗](#sec_trees-3-2-3) [🔗](#sec_trees-3-2)One very useful and common approach to studying graph theory is to restrict your focus to graphs of a particular kind. For example, you could try to really understand just complete graphs or just bipartite graphs, instead of trying to understand all graphs in general. That is what we are going to do now, looking at *trees*. Hopefully by the end of this section we will have a better understanding of this class of graph, and also understand why it is important enough to warrant its own section.[🔗](#sec_trees-3-3)

#### Definition 2.2.1. Trees and Forests.

A tree is a connected graph containing no cycles. 4 Sometimes this is stated as “a tree is an acyclic connected graph;” “acyclic” is just a fancy word for “containing no cycles.”[🔗](#sec_trees-3-4-4-1) A forest is a graph containing no cycles. Note that this means that a connected forest is a tree.[🔗](#sec_trees-3-4-4-2) [🔗](#sec_trees-3-4)Does the definition above agree with your intuition for what graphs we should call trees? Try thinking of examples of trees, and make sure they satisfy the definition. One thing to keep in mind is that while the trees we study in graph theory are related to trees you might see in other subjects, the correspondence is not exact. For instance, in anthropology, you might study family trees, like the one below,[🔗](#sec_trees-3-5) ! So far so good, but while your grandparents are (probably) not blood relatives, if we go back far enough, it is likely that they did have *some* common ancestor. If you trace the tree back from you to that common ancestor, then down through your other grandparent, you would have a cycle, and thus the graph would not be a tree.[🔗](#sec_trees-3-7) You might also have seen something called a *decision tree* (such as the algorithm for deciding whether a series converges or diverges). Sometimes these too contain cycles, as the decision for one node might lead you back to a previous step.[🔗](#sec_trees-3-8) Both the examples of trees above also have another feature worth mentioning: There is a clear order to the vertices in the tree. The definition of a tree does not include this added structure, although we can impose such a structure by considering rooted trees, where we simply designate one vertex as the *root*. We will consider such trees in more detail later in this section.[🔗](#sec_trees-3-9) In this section, we will explore some basic properties of trees, which will serve as an excellent introduction to writing proofs about graphs. We will also consider a special kind of tree, called a spanning tree, which is a tree that includes all the vertices of a connected graph. Finally, we will briefly consider rooted trees.[🔗](#sec_trees-3-10)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-gt-trees)

#### 1.

Activate Take out a piece of paper and draw 8 vertices in a circle.[🔗](#extracted-webwork-34-1-1-1) ![8 vertices in a circle with no edges](generated/webwork/images/webwork-34-image-1.svg) We are going to add edges to this graph following some requirements.[🔗](#extracted-webwork-34-1-1-3)

#### (a)

First, add the fewest number of edges possible so that the resulting graph is connected. That is, there must be a path between any pair of vertices (a path can use more than one edge, of course).[🔗](#extracted-webwork-34-1-2-1-1) How many edges are in the graph you drew? [🔗](#extracted-webwork-34-1-2-1-2) [🔗](#extracted-webwork-34-1-2)

#### (b)

Was the resulting graph you found a tree?[🔗](#extracted-webwork-34-1-3-1-1)

- Yes, since the graph is connected and contains no cycles[🔗](#extracted-webwork-34-1-3-1-2-1-1-1) [🔗](#extracted-webwork-34-1-3-1-2-1-1)
- No, the graph contains a cycle[🔗](#extracted-webwork-34-1-3-1-2-1-2-1) [🔗](#extracted-webwork-34-1-3-1-2-1-2)
- No, the graph is not connected[🔗](#extracted-webwork-34-1-3-1-2-1-3-1) [🔗](#extracted-webwork-34-1-3-1-2-1-3)
- No, the graph is not connected and contains a cycle[🔗](#extracted-webwork-34-1-3-1-2-1-4-1) [🔗](#extracted-webwork-34-1-3-1-2-1-4)

[🔗](#extracted-webwork-34-1-3-1-2) [🔗](#extracted-webwork-34-1-3)

#### (c)

Now start over with an empty graph again. This time, add the largest number of edges possible so that the resulting graph contains no cycles.[🔗](#extracted-webwork-34-1-4-1-1) How many edges are in the graph you drew? [🔗](#extracted-webwork-34-1-4-1-2) [🔗](#extracted-webwork-34-1-4)

#### (d)

Was the resulting graph you found a tree?[🔗](#extracted-webwork-34-1-5-1-1)

- Yes, since the graph is connected and contains no cycles[🔗](#extracted-webwork-34-1-5-1-2-1-1-1) [🔗](#extracted-webwork-34-1-5-1-2-1-1)
- No, the graph contains a cycle[🔗](#extracted-webwork-34-1-5-1-2-1-2-1) [🔗](#extracted-webwork-34-1-5-1-2-1-2)
- No, the graph is not connected[🔗](#extracted-webwork-34-1-5-1-2-1-3-1) [🔗](#extracted-webwork-34-1-5-1-2-1-3)
- No, the graph is not connected and contains a cycle[🔗](#extracted-webwork-34-1-5-1-2-1-4-1) [🔗](#extracted-webwork-34-1-5-1-2-1-4)

[🔗](#extracted-webwork-34-1-5-1-2) [🔗](#extracted-webwork-34-1-5) [🔗](#pa-gt-trees-1)[🔗](#PA-gt-trees)[🔗](#sec_trees-3)

### Subsection Properties of Trees

We wish to really understand trees. This means we should discover properties of trees: what makes them special and what is special about them.[🔗](#sec_trees-4-2) A tree is a connected graph with no cycles. Is there anything else we can say? It would be nice to have other equivalent conditions for a graph to be a tree. That is, we would like to know whether there are any graph theoretic properties that all trees have, and perhaps even that *only* trees have.[🔗](#sec_trees-4-3) To get a feel for the sorts of things we can say, we will consider three *propositions* about trees. These will also illustrate important proof techniques that apply to graphs in general, and happen to be a little easier for trees.[🔗](#sec_trees-4-4) Our first proposition gives an alternate definition for a tree. That is, it gives necessary and sufficient conditions for a graph to be a tree.[🔗](#sec_trees-4-5)

#### Proposition 2.2.2.

A graph \(T\) is a tree if and only if between every pair of distinct vertices of \(T\) there is a unique path.[🔗](#prop-unique-paths-trees-1-1) [🔗](#prop-unique-paths-trees)

#### Proof.

This is an “if and only if” statement, so we must prove two implications. We start by proving that if \(T\) is a tree, then between every pair of distinct vertices there is a unique path.[🔗](#prop-unique-paths-trees-2-1) Assume \(T\) is a tree, and let \(u\) and \(v\) be distinct vertices (if \(T\) only has one vertex, then the conclusion is satisfied automatically). We must show two things to show that there is a unique path between \(u\) and \(v\text{:}\) that there is a path, and that there is not more than one path. The first of these is automatic; since \(T\) is a tree, it is connected, so there is a path between any pair of vertices.[🔗](#prop-unique-paths-trees-2-2) To show the path is unique, we suppose there are two paths between \(u\) and \(v\text{,}\) and get a contradiction. The two paths might start out the same, but since they are different, there is some first vertex \(u'\) after which the two paths diverge. However, since the two paths both end at \(v\text{,}\) there is some first vertex after \(u'\) that they have in common, call it \(v'\text{.}\) Now consider the two paths from \(u'\) to \(v'\text{.}\) Taken together, these form a cycle, which contradicts our assumption that \(T\) is a tree.[🔗](#prop-unique-paths-trees-2-3) Now we consider the converse: If between every pair of distinct vertices of \(T\) there is a unique path, then \(T\) is a tree. So assume the hypothesis: Between every pair of distinct vertices of \(T\) there is a unique path. To prove that \(T\) is a tree, we must show it is connected and contains no cycles.[🔗](#prop-unique-paths-trees-2-4) The first half of this is easy: \(T\) is connected, because there is a path between every pair of vertices. To show that \(T\) has no cycles, we assume it does, for the sake of contradiction. Let \(u\) and \(v\) be two distinct vertices in a cycle of \(T\text{.}\) Since we can get from \(u\) to \(v\) by going clockwise or counterclockwise around the cycle, there are two paths from \(u\) and \(v\text{,}\) contradicting our assumption.[🔗](#prop-unique-paths-trees-2-5) We have established both directions so we have completed the proof.[🔗](#prop-unique-paths-trees-2-6) [🔗](#prop-unique-paths-trees-2)Read the proof above very carefully. Notice that both directions had two parts: the existence of paths, and the uniqueness of paths (which related to the fact that there were no cycles). In this case, these two parts were really separate. In fact, if we just considered graphs with no cycles (a forest), then we could still do the parts of the proof that explore the uniqueness of paths between vertices, even if there might not *exist* paths between vertices.[🔗](#sec_trees-4-7) This observation allows us to state the following *corollary*. 5 A corollary is another sort of provable statement, like a proposition or theorem, but one that follows direction from another already established statement, or its proof.[🔗](#sec_trees-4-8)

#### Corollary 2.2.3.

A graph \(F\) is a forest if and only if between any pair of vertices in \(F\) there is at most one path.[🔗](#cor-unique-paths-forests-1-1) [🔗](#cor-unique-paths-forests)We do not give a proof of the corollary (it is, after all, supposed to follow directly from the proposition), but for practice, you are asked to give a careful proof in the exercises. When you do so, try to use proof by contrapositive instead of proof by contradiction.[🔗](#sec_trees-4-10) Our second proposition tells us that all trees have leaves: vertices of degree one.[🔗](#sec_trees-4-11)

#### Proposition 2.2.4.

Any tree with at least two vertices has at least two vertices of degree one.[🔗](#prop-leaves-in-trees-1-1) [🔗](#prop-leaves-in-trees)

#### Proof.

We give a proof by contradiction. Let \(T\) be a tree with at least two vertices, and suppose, contrary to stipulation, that there are not two vertices of degree one.[🔗](#prop-leaves-in-trees-2-1) Let \(P\) be a path in \(T\) of longest possible length. Let \(u\) and \(v\) be the endpoints of the path. Since \(T\) does not have two vertices of degree one, at least one of these must have degree two or higher. Say that it is \(u\text{.}\) We know that \(u\) is adjacent to a vertex in the path \(P\text{,}\) but now it must also be adjacent to another vertex, call it \(u'\text{.}\)[🔗](#prop-leaves-in-trees-2-2) Where is \(u'\text{?}\) It cannot be a vertex of \(P\text{,}\) because if it was, there would be two distinct paths from \(u\) to \(u'\text{:}\) the edge between them, and the first part of \(P\) (up to \(u'\)). But \(u'\) also cannot be outside of \(P\text{,}\) for if it was, there would be a path from \(u'\) to \(v\) that was longer than \(P\text{,}\) which has the longest possible length.[🔗](#prop-leaves-in-trees-2-3) This contradiction proves that there must be at least two vertices of degree one. In fact, we can say a little more: \(u\) and \(v\) must *both* have degree one.[🔗](#prop-leaves-in-trees-2-4) [🔗](#prop-leaves-in-trees-2)The proposition is quite useful when proving statements about trees, because we often prove statements about trees by induction. This is a proof technique that we investigate fully in [Section 4.5](sec_seq-induction.html), but for now, all we need to understand is that it is useful to compare a given tree to smaller trees. To show something is true of a tree with \(v\) vertices, we will assume the thing is true of all trees with \(v-1\) vertices. By removing a vertex of degree 1, we get this smaller tree, and then we just need to show that putting the vertex back doesn’t mess us up.[🔗](#sec_trees-4-13) Is there a tree with exactly 7 vertices and 7 edges? Try to draw one. Could a tree with 7 vertices have only 5 edges? There is a good reason that these seem impossible to draw.[🔗](#sec_trees-4-14)

#### Proposition 2.2.5.

Let \(T\) be a tree with \(v\) vertices and \(e\) edges. Then \(e = v-1\text{.}\)[🔗](#prop-tree-edge-vertex-2-1) [🔗](#prop-tree-edge-vertex)We will prove that this proposition is true for all possible values of \(v \ge 1\text{.}\) Note that if \(v = 1\text{,}\) then the tree must have \(0\) edges, so yes, \(e = v-1\text{.}\) We could then look at trees with \(v=2\) vertices (there is only one, and it has \(e = 1 = v-1\) edges) and then all trees with \(v=3\) vertices, and then \(v=4\text{,}\) and so on, but that would take forever. Literally![🔗](#sec_trees-4-16) Instead, we will do a version of *proof by contradiction* called the minimal criminal. We will assume the proposition is not true (just like we would start any proof by contradiction). This means that there is some *smallest* tree for which it isn’t true. If this smallest counterexample (i.e., minimal criminal) has \(v\) vertices, then we are guaranteed that *all* trees with \(v-1\) vertices are *not* counterexamples. Let’s see how this works out.[🔗](#sec_trees-4-17)

#### Proof.

Suppose, for the sake of contradiction, that the proposition is not true for all trees. Let \(T\) be a tree for which the proposition is not true, with the smallest number of vertices among all the counterexamples. Let \(v\) be the number of vertices of \(T\text{.}\)[🔗](#sec_trees-4-18-1) Since the only tree with one vertex has zero edges, that cannot be our tree \(T\text{,}\) so we can assume \(v \ge 2\text{.}\) In particular, we know by [Proposition 2.2.4](sec_trees.html#prop-leaves-in-trees) that \(T\) must contain at least one vertex of degree 1, call it \(v_0\text{.}\)[🔗](#sec_trees-4-18-2) Let \(T'\) be the tree resulting from removing \(v_0\) from \(T\) (together with its incident edge). Since we removed a leaf, \(T'\) is still a tree (the unique paths between pairs of vertices in \(T'\) are the same as the unique paths between them in \(T\)).[🔗](#sec_trees-4-18-3) Now \(T'\) has \(v-1\) vertices. Since \(T\) was the smallest tree for which the proposition isn’t true, we know that the proposition is true for \(T'\text{.}\) So \(T'\) must have one fewer edges than vertices; that is, \(T'\) has \(v-2\) edges. But \(T\) has one more edge than \(T'\text{,}\) so it has \(v-1\) edges. This contradicts our assumption that \(T\) does not satisfy the proposition, which completes our proof.[🔗](#sec_trees-4-18-4) [🔗](#sec_trees-4-18)[🔗](#sec_trees-4)

### Subsection Spanning Trees

One of the advantages of trees is that they give us a few simple ways to travel through the vertices. If a connected graph is not a tree, then we can still use these traversal algorithms if we identify a subgraph that *is* a tree.[🔗](#sec_trees-5-4) First we should consider if this even makes sense. Given any connected graph \(G\text{,}\) will there always be a subgraph that is a tree? Well, that is actually too easy: You could just take a single vertex of \(G\text{.}\) If we want to use this subgraph to tell us how to visit all vertices, then we want our subgraph to include all of the vertices. We call such a tree a spanning tree.[🔗](#sec_trees-5-5)

#### Definition 2.2.6.

Given a connected graph \(G\text{,}\) a spanning tree of \(G\) is a subgraph of \(G\) which is a tree and includes all the vertices of \(G\text{.}\)[🔗](#definition-spanningtree-3-1) [🔗](#definition-spanningtree)It turns out that every connected graph has one (and usually many).[🔗](#sec_trees-5-7)

#### Theorem 2.2.7.

Every connected graph has a spanning tree.[🔗](#thm-spanning-tree-1-1) [🔗](#thm-spanning-tree)How do we know? We can give an algorithm for *finding* a spanning tree! Start with a connected graph \(G\text{.}\) If there is no cycle, then \(G\) is already a tree and we are done. If there is a cycle, let \(e\) be any edge in that cycle and consider the new graph \(G_1 = G - e\) (i.e., the graph you get by deleting \(e\)). This tree is still connected: Since \(e\) belonged to a cycle, there were at least two paths between its incident vertices. Now repeat: If \(G_1\) has no cycles, we are done; otherwise define \(G_2\) to be \(G_1 - e_1\text{,}\) where \(e_1\) is an edge in a cycle in \(G_1\text{.}\) Keep going. This process must eventually stop, since there are only a finite number of edges to remove. The result will be a tree, and since we never removed any vertex, a *spanning* tree.[🔗](#sec_trees-5-9) This is by no means the only algorithm for finding a spanning tree. You could have started with the empty graph and added edges that belong to \(G\text{,}\) as long as adding them would not create a cycle. You have some choices as to which edges you add first: You could always add an edge adjacent to edges you have already added (after the first one, of course), or add them using some other order. Which spanning tree you end up with depends on these choices.[🔗](#sec_trees-5-10)

#### Example 2.2.8.

Find two different spanning trees of the graph,[🔗](#sec_trees-5-11-1-1) ![A graph with seven vertices arranged in three rows: two on top, three in the middle, and two on bottom. The four vertices on top and bottom have edges forming a square. The vertex in the middle of the middle row is adjacent to the four vertices on top and bottom. The vertices on the left and right of the middle row are adjacent to the top and bottom vertices closest to them.](generated/latex-image/gt-trees-spanning-q.svg) Solution. Here are two spanning trees.[🔗](#sec_trees-5-11-2-1) ![A graph with seven vertices arranged in three rows: two on top, three in the middle, and two on bottom. The vertex on the middle left is adjacent to the vertex on the top left. This is adjacent to the vertex in the middle of the middle row, and the vertex on the top right. The top right vertex is adjacent to the middle right, which is adjacent to the vertex on the bottom right, which is adjacent to the vertex on the bottom left. Thus there are a total of 6 edges.](generated/latex-image/gt-trees-spanning1.svg) ![A graph with seven vertices arranged in three rows: two on top, three in the middle, and two on bottom. The vertex in the middle of the middle row is adjacent to the four vertices on the top and bottom rows. The vertices on the top row are each adjacent to the vertices in the middle row on their side. Thus there are a total of 6 edges.](generated/latex-image/gt-trees-spanning2.svg) [🔗](#sec_trees-5-11-2) [🔗](#sec_trees-5-11) Although we will not consider this in detail, these algorithms are usually applied to *weighted* graphs. Here every edge has some weight or cost assigned to it. The goal is to find a spanning tree that has the smallest possible combined weight. Such a tree is called a minimum spanning tree. Finding the minimum spanning tree uses basically the same algorithms as we described above, but when picking an edge to add, you always pick the smallest (or when removing an edge, you always remove the largest). 6 If you add the smallest edge adjacent to edges you have already added, you are doing *Prim’s algorithm*. If you add the smallest edge in the entire graph, you are following *Kruskal’s algorithm*.[🔗](#sec_trees-5-12) [🔗](#sec_trees-5)

### Subsection Rooted Trees

So far, we have thought of trees only as a particular kind of graph. However, it is often useful to add additional structure to trees to help solve problems. Data is often structured like a tree. This book, for example, has a tree structure: Draw a vertex for the book itself. Then draw vertices for each chapter, connected to the book vertex. Under each chapter, draw a vertex for each section, connecting it to the chapter it belongs to. The graph will not have any cycles; it will be a tree, but a tree with a clear hierarchy which is not present if we don’t identify the “book vertex” as the “top”.[🔗](#subsec-rooted-trees-4) As soon as one vertex of a tree is designated as the root, then every other vertex on the tree can be characterized by its position relative to the root. This works because there is a unique path between any two vertices in a tree. So from any vertex, we can travel back to the root in exactly one way. This also allows us to describe how distinct vertices in a rooted tree are related.[🔗](#subsec-rooted-trees-5) If two vertices are adjacent, then we say one of them is the parent of the other, which is called the child of the parent. Of the two, the parent is the vertex that is closer to the root. Thus the root of a tree is a parent, but is not the child of any vertex (and is unique in this respect: All non-root vertices have *exactly one* parent).[🔗](#subsec-rooted-trees-6) Not surprisingly, the child of a child of a vertex is called the grandchild of the vertex (and it is the grandparent). More generally, we say that a vertex \(v\) is a descendent of a vertex \(u\) provided \(u\) is a vertex on the path from \(v\) to the root. Then we would call \(u\) an ancestor of \(v\text{.}\)[🔗](#subsec-rooted-trees-7) For most trees (in fact, all except paths with one end the root), there will be pairs of vertices neither of which is a descendant of the other. We might call these cousins or siblings. In fact, vertices \(u\) and \(v\) are called siblings provided they have the same parent. Note that siblings are never adjacent (do you see why?).[🔗](#subsec-rooted-trees-8)

#### Example 2.2.9.

Consider the tree below.[🔗](#subsec-rooted-trees-9-1-1) ![A labeled tree. At the center of the drawing is the vertex e, adjacent to f (top right), g (bottom right), d (bottom left), c (middle left) and b (top left). Vertex c is also adjacent to vertex a to its left. Vertex f is adjacent to h (to its right) and i (to its down-right).](generated/latex-image/img-labeled-tree.svg) If we designate vertex \(f\) as the root, then \(e\text{,}\) \(h\text{,}\) and \(i\) are the children of \(f\text{,}\) and are siblings of each other. Among the other things we cay say are that \(a\) is a child of \(c\text{,}\) and a descendant of \(f\text{.}\) The vertex \(g\) is a descendant of \(f\text{,}\) in fact, is a grandchild of \(f\text{.}\) Vertices \(g\) and \(d\) are siblings, since they have the common parent \(e\text{.}\)[🔗](#subsec-rooted-trees-9-1-3) Notice how this changes if we pick a different vertex for the root. If \(a\) is the root, then its lone child is \(c\text{,}\) which also has only one child, namely \(e\text{.}\) We would then have \(f\) the child of \(e\) (instead of the other way around), and \(f\) is the descendant of \(a\text{,}\) instead of the ancestor. \(f\) and \(g\) are now siblings.[🔗](#subsec-rooted-trees-9-1-4) [🔗](#subsec-rooted-trees-9)All of this flowery language helps us describe how to *navigate* through a tree. Traversing a tree, visiting each vertex in some order, is a key step in many algorithms. Even if the tree is not rooted, we can always form a rooted tree by picking any vertex as the root. Here is an example of why doing so can be helpful.[🔗](#subsec-rooted-trees-10)

#### Example 2.2.10.

Explain why every tree is a bipartite graph.[🔗](#subsec-rooted-trees-11-1-1) Solution. To show that a graph is bipartite, we must divide the vertices into two sets, \(A\) and \(B\text{,}\) so that no two vertices in the same set are adjacent. Here is an algorithm that does just this.[🔗](#subsec-rooted-trees-11-2-1) Designate any vertex as the root. Put this vertex in set \(A\text{.}\) Now put all of the children of the root in set \(B\text{.}\) None of these children are adjacent (they are siblings), so we are good so far. Now put into \(A\) every child of every vertex in \(B\) (i.e., every grandchild of the root). Keep going until all vertices have been assigned one of the sets, alternating between \(A\) and \(B\) every “generation.” That is, a vertex is in set \(B\) if and only if it is the child of a vertex in set \(A\text{.}\)[🔗](#subsec-rooted-trees-11-2-2) [🔗](#subsec-rooted-trees-11-2) [🔗](#subsec-rooted-trees-11) The key to how we partitioned the tree in the example was to know which vertex to assign to a set next. We chose to visit all vertices in the same generation before any vertices of the next generation. This is usually called a breadth-first search (we say “search” because you often traverse a tree looking for vertices with certain properties).[🔗](#subsec-rooted-trees-12) In contrast, we could also have partitioned the tree in a different order. Start with the root; put it in \(A\text{.}\) Then look for one child of the root to put in \(B\text{.}\) Then find a child of that vertex, into \(A\text{,}\) and then find its child, into \(B\text{,}\) and so on. When you get to a vertex with no children, retreat to its parent, and see if the parent has any other children. So we travel as far from the root as fast as possible, then backtrack until we can move forward again. This is called depth-first search.[🔗](#subsec-rooted-trees-13) These algorithmic explanations can serve as a proof that every tree is bipartite, although care needs to be spent to prove that the algorithms are *correct*. Another approach to prove that all trees are bipartite, using induction, is requested in the exercises.[🔗](#subsec-rooted-trees-14) [🔗](#subsec-rooted-trees)

### Reading Questions Reading Questions

#### 1.

Suppose \(T\) is a tree with 10 vertices. Which of the following statements must be true about \(T\text{?}\) Select all that apply.[🔗](#rq-gt-tree-facts-1-1)

- \(T\) has a unique path between every pair of vertices.
- If you removed any edge from \(T\text{,}\) the resulting graph would be disconnected.
- If you added any edge between two vertices in \(T\) (that were not already adjacent), the resulting graph would have a cycle.
- \(T\) has exactly two vertices of degree one.

[🔗](#rq-gt-tree-facts)

#### 2.

If a tree has 20 vertices, how many edges does it have?[🔗](#rs-rq-gt-trees-edgecount-1-1) Number of edges: [🔗](#rs-rq-gt-trees-edgecount-1-2) [[{"number": [19, 19], "feedback": "Right. The number of edges in a tree is always one less than the number of vertices."}, {"regex": "^\\s*.*\\s*$", "regexFlags": "", "feedback": "Try again."}]] [🔗](#rs-rq-gt-trees-edgecount)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-gt-trees-q-1-1) [🔗](#rq-gt-trees-q)[🔗](#rqs-gt-trees)

### Exercises Practice Problems

#### 1.

Activate Are the following statements true or false?[🔗](#extracted-webwork-35-1-1-1)

1. There is a connected graph with exactly one spanning tree.[🔗](#extracted-webwork-35-1-1-2-1-1-1) [🔗](#extracted-webwork-35-1-1-2-1-1)
2. If a graph has two more vertices than edges, then it is not connected.[🔗](#extracted-webwork-35-1-1-2-1-2-1) [🔗](#extracted-webwork-35-1-1-2-1-2)
3. Every bipartite graph is a tree.[🔗](#extracted-webwork-35-1-1-2-1-3-1) [🔗](#extracted-webwork-35-1-1-2-1-3)
4. Every connected forest is a tree.[🔗](#extracted-webwork-35-1-1-2-1-4-1) [🔗](#extracted-webwork-35-1-1-2-1-4)
5. If a graph has exactly one more vertex than it has edges, then the graph is a tree.[🔗](#extracted-webwork-35-1-1-2-1-5-1) [🔗](#extracted-webwork-35-1-1-2-1-5)

[🔗](#extracted-webwork-35-1-1-2) [🔗](#ww-gt-treeTF)

#### 2.

Activate A forest contains 50 vertices and 44 edges. How many connected components does the graph have?[🔗](#extracted-webwork-36-1-1-1) [🔗](#ww-gt-forest-components)

#### 3.

Activate A connected graph with 12 vertices contains 17 edges. Without knowing which particular graph this is, what is the smallest and largest possible number of edges you can remove to get a spanning tree?[🔗](#extracted-webwork-37-1-1-1) Smallest number of edges to remove: [🔗](#extracted-webwork-37-1-1-2) Largest number of edges to remove: [🔗](#extracted-webwork-37-1-1-3) [🔗](#ww-gt-spanning-tree)

#### 4.

Activate The average degree of a tree is 1.96 (that is, if you sum the degrees of vertices and divide by the number of vertices, you get 1.96).[🔗](#extracted-webwork-38-1-1-1) How many vertices does the tree have?[🔗](#extracted-webwork-38-1-1-2) [🔗](#ww-gt-tree-avgdeg)

#### 5.

Activate A tree contains some number of leaves (degree 1 vertices) and four non-leaf vertices. The degrees of the non-leaf vertices are 10, 7, 4, and 2. How many leaves does the tree have?[🔗](#extracted-webwork-39-1-1-1) Smallest number of leaves possible: [🔗](#extracted-webwork-39-1-1-2) Largest number of leaves possible: [🔗](#extracted-webwork-39-1-1-3) [🔗](#ww-gt-tree-degree-seq)[🔗](#practice_gt-trees)

### Exercises Additional Exercises

#### 1.

Which of the following graphs are trees?

1. \(G = (V, E)\) with \(V = \{a, b, c, d, e\}\) and \(E = \{\{a, b\}, \{a,e\}, \{b, c\}, \{c,d\}, \{d,e\} \}\)[🔗](#exercises_gt-trees-2-1-1-1-1-1) [🔗](#exercises_gt-trees-2-1-1-1-1)
2. \(G = (V, E)\) with \(V = \{a, b, c, d, e\}\) and \(E = \{\{a, b\}, \{b, c\}, \{c,d\}, \{d,e\}\}\)[🔗](#exercises_gt-trees-2-1-1-1-2-1) [🔗](#exercises_gt-trees-2-1-1-1-2)
3. \(G = (V, E)\) with \(V = \{a, b, c, d, e\}\) and \(E = \{\{a, b\}, \{a, c\}, \{a,d\}, \{a,e\}\}\)[🔗](#exercises_gt-trees-2-1-1-1-3-1) [🔗](#exercises_gt-trees-2-1-1-1-3)
4. \(G = (V, E)\) with \(V = \{a, b, c, d, e\}\) and \(E = \{\{a, b\}, \{a, c\}, \{d,e\}\}\)[🔗](#exercises_gt-trees-2-1-1-1-4-1) [🔗](#exercises_gt-trees-2-1-1-1-4)

[🔗](#exercises_gt-trees-2-1-1) [🔗](#exercises_gt-trees-2)

#### 2.

For each degree sequence below, decide whether it must always, must never, or could possibly be a degree sequence for a tree. Remember, a degree sequence lists out the degrees (number of edges incident to the vertex) of all the vertices in a graph in non-increasing order.

1. \(\displaystyle (4,1,1,1,1)\)[🔗](#ex-tree-deg-seq-1-1-1-1-1) [🔗](#ex-tree-deg-seq-1-1-1-1)
2. \(\displaystyle (3,3,2,1,1)\)[🔗](#ex-tree-deg-seq-1-1-1-2-1) [🔗](#ex-tree-deg-seq-1-1-1-2)
3. \(\displaystyle (2,2,2,1,1)\)[🔗](#ex-tree-deg-seq-1-1-1-3-1) [🔗](#ex-tree-deg-seq-1-1-1-3)
4. \(\displaystyle (4, 4, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1)\)[🔗](#ex-tree-deg-seq-1-1-1-4-1) [🔗](#ex-tree-deg-seq-1-1-1-4)

[🔗](#ex-tree-deg-seq-1-1) [🔗](#ex-tree-deg-seq)

#### 3.

For each degree sequence below, decide whether it must always, must never, or could possibly be a degree sequence for a tree. Justify your answers.

1. \(\displaystyle (3, 3, 2, 2, 2)\)[🔗](#exercises_gt-trees-4-1-1-1-1-1) [🔗](#exercises_gt-trees-4-1-1-1-1)
2. \(\displaystyle (3, 2, 2, 1, 1, 1)\)[🔗](#exercises_gt-trees-4-1-1-1-2-1) [🔗](#exercises_gt-trees-4-1-1-1-2)
3. \(\displaystyle (3, 3, 3, 1, 1, 1)\)[🔗](#exercises_gt-trees-4-1-1-1-3-1) [🔗](#exercises_gt-trees-4-1-1-1-3)
4. \(\displaystyle (4, 4, 1, 1, 1, 1, 1, 1)\)[🔗](#exercises_gt-trees-4-1-1-1-4-1) [🔗](#exercises_gt-trees-4-1-1-1-4)

[🔗](#exercises_gt-trees-4-1-1) Hint. Careful: the graphs might not be connected.[🔗](#exercises_gt-trees-4-2-1) [🔗](#exercises_gt-trees-4-2) [🔗](#exercises_gt-trees-4)

#### 4.

Suppose you have a graph with \(v\) vertices and \(e\) edges that satisfies \(v = e+1\text{.}\) Must the graph be a tree? Prove your answer.[🔗](#exercises_gt-trees-5-1-1) Hint. Try [Exercise 2](sec_trees.html#ex-tree-deg-seq).[🔗](#exercises_gt-trees-5-2-1) [🔗](#exercises_gt-trees-5-2) [🔗](#exercises_gt-trees-5)

#### 5.

Prove that any graph (not necessarily a tree) with \(v\) vertices and \(e\) edges that satisfies \(v \gt e+1\) will NOT be connected.[🔗](#exercises_gt-trees-6-1-1) Hint. Try a proof by contradiction, and consider a spanning tree of the graph.[🔗](#exercises_gt-trees-6-2-1) [🔗](#exercises_gt-trees-6-2) [🔗](#exercises_gt-trees-6)

#### 6.

If a graph \(G\) with \(v\) vertices and \(e\) edges is connected and has \(v \lt e+1\text{,}\) must it contain a cycle? Prove your answer.[🔗](#exercises_gt-trees-7-1-1) [🔗](#exercises_gt-trees-7)

#### 7.

We define a forest to be a graph with no cycles.

1. Explain why this is a good name. That is, explain why a forest is a union of trees.[🔗](#ex-forest-1-1-2-1-1) [🔗](#ex-forest-1-1-2-1)
2. Suppose \(F\) is a forest consisting of \(m\) trees and \(v\) vertices. How many edges does \(F\) have? Explain.[🔗](#ex-forest-1-1-2-2-1) [🔗](#ex-forest-1-1-2-2)
3. Prove that any graph \(G\) with \(v\) vertices and \(e\) edges that satisfies \(v \lt e+1\) must contain a cycle (i.e., not be a forest).[🔗](#ex-forest-1-1-2-3-1) [🔗](#ex-forest-1-1-2-3)

[🔗](#ex-forest-1-1) Hint. For part (b), trying some simple examples should give you the formula. Then you just need to prove it is correct.[🔗](#ex-forest-2-1) [🔗](#ex-forest-2) [🔗](#ex-forest)

#### 8.

Give a careful proof of [Corollary 2.2.3](sec_trees.html#cor-unique-paths-forests): A graph is a forest if and only if there is at most one path between any pair of vertices. Use proof by contrapositive (and not a proof by contradiction) for both directions.[🔗](#exercises_gt-trees-9-1-1) Hint. Examining the proof of [Proposition 2.2.2](sec_trees.html#prop-unique-paths-trees) gives you most of what you need, but make sure to just give the relevant parts, and take care to not use proof by contradiction.[🔗](#exercises_gt-trees-9-2-1) [🔗](#exercises_gt-trees-9-2) [🔗](#exercises_gt-trees-9)

#### 9.

Give a careful *minimal criminal* proof that every tree is bipartite.[🔗](#exercises_gt-trees-10-1-1) Hint. Minimality here should be in terms of the number of vertices. If you had a minimum counterexample and removed a leaf vertex, the resulting graph will be a smaller tree, so...[🔗](#exercises_gt-trees-10-2-1) [🔗](#exercises_gt-trees-10-2) [🔗](#exercises_gt-trees-10)

#### 10.

Consider the tree drawn below.[🔗](#exercises_gt-trees-11-1-1) ![A labeled tree with nine vertices labeled a through h. Vertices a, b, e, f, and i are on a single row, adjacent on a path in that order from left to right. Vertex b is adjacent to c and d above it. Vertex f is adjacent to g and h about it.](generated/latex-image/img-labeled-tree2.svg)

1. Suppose we designate vertex \(e\) as the root. List the children, parents, and siblings of each vertex. Does any vertex other than \(e\) have grandchildren?[🔗](#exercises_gt-trees-11-1-3-1-1-1) [🔗](#exercises_gt-trees-11-1-3-1-1)
2. Suppose \(e\) is *not* chosen as the root. Does our choice of root vertex change the *number* of children \(e\) has? The number of grandchildren? How many are there of each?[🔗](#exercises_gt-trees-11-1-3-1-2-1) [🔗](#exercises_gt-trees-11-1-3-1-2)
3. In fact, pick any vertex in the tree and suppose it is not the root. Explain why the number of children of that vertex does not depend on which other vertex is the root.[🔗](#exercises_gt-trees-11-1-3-1-3-1) [🔗](#exercises_gt-trees-11-1-3-1-3)
4. Does the previous part work for other trees? Give an example of a different tree for which it holds. Then either prove that it always holds or give an example of a tree for which it doesn’t.[🔗](#exercises_gt-trees-11-1-3-1-4-1) [🔗](#exercises_gt-trees-11-1-3-1-4)

[🔗](#exercises_gt-trees-11-1-3) Hint. If \(e\) is the root, then \(b\) will have three children (\(a\text{,}\) \(c\text{,}\) and \(d\)), all of which will be siblings and have \(b\) as their parent. \(a\) will not have any children.[🔗](#exercises_gt-trees-11-2-1) In general, how can you determine the number of children a vertex will have, if it is not a root?[🔗](#exercises_gt-trees-11-2-2) [🔗](#exercises_gt-trees-11-2) [🔗](#exercises_gt-trees-11)

#### 11.

Let \(T\) be a rooted tree that contains vertices \(u\text{,}\) \(v\text{,}\) and \(w\) (among others, possibly). Prove that if \(w\) is a descendant of both \(u\) and \(v\text{,}\) then \(u\) is a descendant of \(v\) or \(v\) is a descendant of \(u\text{.}\)[🔗](#exercises_gt-trees-12-1-1) [🔗](#exercises_gt-trees-12)

#### 12.

Unless it is already a tree, a given graph \(G\) will have multiple spanning trees. How similar or different must these be?

1. Must all spanning trees of a given graph be isomorphic to each other? Explain why or give a counterexample.[🔗](#exercises_gt-trees-13-1-1-2-1-1) [🔗](#exercises_gt-trees-13-1-1-2-1)
2. Must all spanning trees of a given graph have the same number of edges? Explain why or give a counterexample.[🔗](#exercises_gt-trees-13-1-1-2-2-1) [🔗](#exercises_gt-trees-13-1-1-2-2)
3. Must all spanning trees of a graph have the same number of leaves (vertices of degree 1)? Explain why or give a counterexample.[🔗](#exercises_gt-trees-13-1-1-2-3-1) [🔗](#exercises_gt-trees-13-1-1-2-3)

[🔗](#exercises_gt-trees-13-1-1) [🔗](#exercises_gt-trees-13)

#### 13.

Find all spanning trees of the graph below. How many different spanning trees are there? How many different spanning trees are there *up to isomorphism* (that is, if you grouped all the spanning trees by which are isomorphic, how many groups would you have)?[🔗](#exercises_gt-trees-14-1-1) ![A graph with six vertices labeled a through f. Vertices a, b, and c form a triangle (with their edges), with a directly above b and c to the right of both. Vertex c is then adjacent to vertices d, f, and e, with d directly above f and e farther to the right. Vertices d and f are also adjacent to e.](generated/latex-image/img-gt-ex-fish.svg) [🔗](#exercises_gt-trees-14)

#### 14.

Give an example of a graph that has exactly 7 different spanning trees. Note, it is acceptable for some or all of these spanning trees to be isomorphic.[🔗](#exercises_gt-trees-15-1-1) Hint. There is an example with 7 edges.[🔗](#exercises_gt-trees-15-2-1) [🔗](#exercises_gt-trees-15-2) [🔗](#exercises_gt-trees-15)

#### 15.

Prove that every connected graph which is not itself a tree must have at least three different (although possibly isomorphic) spanning trees.[🔗](#exercises_gt-trees-16-1-1) Hint. The previous exercise will be helpful.[🔗](#exercises_gt-trees-16-2-1) [🔗](#exercises_gt-trees-16-2) [🔗](#exercises_gt-trees-16)

#### 16.

Consider edges that must be in every spanning tree of a graph. Must every graph have such an edge? Give an example of a graph that has exactly one such edge.[🔗](#exercises_gt-trees-17-1-1) Hint. Note that such an edge, if removed, would disconnect the graph. We call graphs that have an edge like this 1-connected.[🔗](#exercises_gt-trees-17-2-1) [🔗](#exercises_gt-trees-17-2) [🔗](#exercises_gt-trees-17)[🔗](#exercises_gt-trees)[🔗](#sec_trees) [&#xe5cb;Prev](sec_gt-intro.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_gt-planar.html) [Feedback](/cdn-cgi/l/email-protection#5a3529393b2874363f2c33341a2f343935743f3e2f)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_trees-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_trees-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 2.3 Planar Graphs

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_gt-planar-2-1-1)

1. Distinguish between planar and non-planar graphs.[🔗](#sec_gt-planar-2-2-1-1) [🔗](#sec_gt-planar-2-2-1)
2. Use Euler’s formula to prove that certain graphs are non-planar.[🔗](#sec_gt-planar-2-2-2-1) [🔗](#sec_gt-planar-2-2-2)
3. Apply Euler’s formula to polyhedra.[🔗](#sec_gt-planar-2-2-3-1) [🔗](#sec_gt-planar-2-2-3)

[🔗](#sec_gt-planar-2)

### Subsection Section Preview

#### Investigate!

When a connected graph can be drawn without any edges crossing, it is called planar. When a planar graph is drawn in this way, it divides the plane into regions called faces.

1. Draw, if possible, two different planar graphs with the same number of vertices, edges, and faces.[🔗](#sec_gt-planar-3-2-3-3-1-1) [🔗](#sec_gt-planar-3-2-3-3-1)
2. Draw, if possible, two different planar graphs with the same number of vertices and edges, but a different number of faces.[🔗](#sec_gt-planar-3-2-3-3-2-1) [🔗](#sec_gt-planar-3-2-3-3-2)

[🔗](#sec_gt-planar-3-2-3) [🔗](#sec_gt-planar-3-2) When is it possible to draw a graph so that none of the edges cross? If this *is* possible, we say the graph is planar (since you can draw it on the *plane*).[🔗](#sec_gt-planar-3-3) Notice that the definition of planar includes the phrase “it is possible to.” This means that even if a graph does not look like it is planar, it still might be. Perhaps you can redraw it in a way in which no edges cross. For example, this is a planar graph:[🔗](#sec_gt-planar-3-4) ![A drawing of K2,3 with two vertices in a top row, each adjacent to each of the three vertices on the bottom row.](generated/latex-image/sec_gt-planar-3-5.svg) That is because we can redraw it like this:[🔗](#sec_gt-planar-3-6) ![Another drawing of K2,3. A single vertex on a top row is adjacent to three vertices in a row below it. Each of these vertices are adjacent to a single vertex below (and to the right of) them.](generated/latex-image/sec_gt-planar-3-7.svg) The graphs are the same, so if one is planar, the other must be, too. However, the original drawing of the graph was not a planar representation of the graph.[🔗](#sec_gt-planar-3-8) When a planar graph is drawn without edges crossing, the edges and vertices of the graph divide the plane into regions. We will call each region a face. The graph above has 3 faces (yes, we *do* include the “outside” region as a face). The number of faces does not change no matter how you draw the graph (as long as you do so without the edges crossing), so it makes sense to ascribe the number of faces as a property of the planar graph.[🔗](#sec_gt-planar-3-9) WARNING: you can only count faces when the graph is drawn in a planar way. For example, consider these two representations of the same graph:[🔗](#sec_gt-planar-3-10) ![A drawing of K4 with four vertices in a square and edges forming the sides of the square plus two more crossing through the center.](generated/latex-image/sec_gt-planar-3-11-1.svg) ![A drawing of K4 with four vertices arranged in a square and edges forming the sides of the square. Another edge crosses from the bottom left to the top right corners. A curved edge loops outside of the square from the top left to bottom right vertices. No edges intersect.](generated/latex-image/sec_gt-planar-3-11-2.svg) If you try to count faces using the graph on the left, you might say there are 5 faces (including the outside). But drawing the graph with a planar representation shows that in fact there are only 4 faces.[🔗](#sec_gt-planar-3-12)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-gt-planar)

#### 1. Vertices, edges, and faces.

Activate

#### (a)

Draw a connected planar graph with 5 vertices and 5 edges. How many faces (including the “outside” face) does your graph have?[🔗](#extracted-webwork-40-1-1-1-1) Number of faces: [🔗](#extracted-webwork-40-1-1-1-2) [🔗](#extracted-webwork-40-1-1)

#### (b)

Now add a single edge to your graph, between two vertices that are not already adjacent. Assuming the resulting graph is still planar, list the number of vertices, edges, and faces it now has.[🔗](#extracted-webwork-40-1-2-1-1) Vertices: ; Edges: ; Faces: [🔗](#extracted-webwork-40-1-2-1-2) [🔗](#extracted-webwork-40-1-2)

#### (c)

Now add another edge to the graph, this time to a new vertex. Assuming the resulting graph is still planar, list the number of vertices, edges, and faces it now has.[🔗](#extracted-webwork-40-1-3-1-1) Vertices: ; Edges: ; Faces: [🔗](#extracted-webwork-40-1-3-1-2) [🔗](#extracted-webwork-40-1-3) [🔗](#pa-gt-planar-1)

#### 2. More examples.

Activate Now draw at least three more connected, planar graphs, each with at least six vertices. Count the number of vertices \(v\text{,}\) edges \(e\text{,}\) and faces \(f\) for each graph and record your data in the table below.[🔗](#extracted-webwork-41-1-1-1)

| \(v\) | \(e\) | \(f\) |
| --- | --- | --- |
|  |  |  |
|  |  |  |
|  |  |  |

[🔗](#pa-gt-planar-2)

#### 3. Conjecture.

Activate Do you notice any patterns? What happens to the numbers if you add an edge between two non-adjacent vertices? What happens if you add a new vertex and connect it to an existing vertex?[🔗](#extracted-webwork-42-1-1-1) Conjecture an expression that involves the number of vertices \(v\text{,}\) the number of edges \(e\text{,}\) and the number of faces \(f\) that remains constant for all connected planar graphs. What is that constant?[🔗](#extracted-webwork-42-1-1-2) Conjectured expression: .[🔗](#extracted-webwork-42-1-1-3) Hint. You might conjecture an expression like \(\frac{v+e}{f}\text{.}\) But this is not right, because there is a planar graph for which this would be \(\frac{5+5}{2} = 5\) and another planar graph for which the expression would be \(\frac{6+7}{3} \ne 5\text{.}\)[🔗](#extracted-webwork-42-1-2-1) What sort of expression will stay constant if \(v\) and \(e\) both increase by 1? And also stay constant if \(e\) and \(f\) both increase by 1?[🔗](#extracted-webwork-42-1-2-2) [🔗](#extracted-webwork-42-1-2) [🔗](#pa-gt-planar-3)

#### 4. A cube.

Activate A cube is made of six squares, each of which shares an edge with each of its neighbors. Vertices of the cube join three of the squares.[🔗](#extracted-webwork-43-1-1-1)

#### (a)

How many vertices, edges, and faces does a cube have?[🔗](#extracted-webwork-43-1-2-1-1) Vertices: ; Edges: ; Faces: [🔗](#extracted-webwork-43-1-2-1-2) [🔗](#extracted-webwork-43-1-2)

#### (b)

Does this match the relationship you conjectured above?

- Yes[🔗](#extracted-webwork-43-1-3-1-1-1-1-1) [🔗](#extracted-webwork-43-1-3-1-1-1-1)
- No[🔗](#extracted-webwork-43-1-3-1-1-1-2-1) [🔗](#extracted-webwork-43-1-3-1-1-1-2)

[🔗](#extracted-webwork-43-1-3-1-1) [🔗](#extracted-webwork-43-1-3) [🔗](#pa-gt-planar-4)[🔗](#PA-gt-planar)[🔗](#sec_gt-planar-3)

### Subsection Euler’s Formula for Planar Graphs

There is a connection between the number of vertices (\(v\)), the number of edges (\(e\)), and the number of faces (\(f\)) in any connected planar graph. This relationship is called Euler’s formula.[🔗](#sec_gt-planar-4-2)

#### Euler’s Formula for Planar Graphs.

For any connected planar graph with \(v\) vertices, \(e\) edges, and \(f\) faces, we have \begin{equation*} v-e + f = 2\text{.} \end{equation*} [🔗](#sec_gt-planar-4-3-3) [🔗](#sec_gt-planar-4-3)Why is Euler’s formula true? One way to convince ourselves of its validity is to draw a planar graph step by step. Start with the graph \(P_2\text{:}\)[🔗](#sec_gt-planar-4-4) ![Two vertices connected by an edge.](generated/latex-image/sec_gt-planar-4-5.svg) Any connected graph (besides just a single isolated vertex) must contain this subgraph. Now we build up to our graph by adding edges and vertices. Each step will consist of either adding a new vertex connected by a new edge to part of your graph (so creating a new “spike”) or by connecting two vertices already in the graph with a new edge (completing a circuit).[🔗](#sec_gt-planar-4-6) ![A graph with four vertices arranged in a square. The top left vertex is adjacent to the other three vertices, and the top right and bottom right vertices are also adjacent. A dashed edge leads from the top right vertex of the square to a fifth vertex below and to its right.](generated/latex-image/sec_gt-planar-4-7-1.svg) ![A graph with four vertices arranged in a square. The top left vertex is adjacent to the other three vertices, and the top right and bottom right vertices are also adjacent. A dashed edge connects the bottom two vertices.](generated/latex-image/sec_gt-planar-4-7-2.svg) What do these “moves” do? When adding the spike, the number of edges increases by 1, the number of vertices increases by 1, and the number of faces remains the same. But this means that \(v - e + f\) does not change. Completing a circuit adds one edge, adds one face, and keeps the number of vertices the same. So again, \(v - e + f\) does not change.[🔗](#sec_gt-planar-4-8) Since we can build any graph using a combination of these two moves, and doing so never changes the quantity \(v - e + f\text{,}\) that quantity will be the same for all graphs. But notice that our starting graph \(P_2\) has \(v = 2\text{,}\) \(e = 1\text{,}\) and \(f = 1\text{,}\) so \(v - e + f = 2\text{.}\)[🔗](#sec_gt-planar-4-9) The argument we have outlined above is not quite correct, since we made the unjustified assumption that all graphs can be built up from \(P_2\) using only the two moves we described. To avoid this issue, we can use a minimal criminal argument. You are asked to do this in the exercises, but the idea is essentially the same as we have here, except that we start with a minimal connected planar graph that does not satisfy the formula, then *remove* either an edge or a vertex (and its edge) to get a smaller connected planar graph that does satisfy the formula. But just like the adding moves we have described above, removing an edge or a vertex does not change the quantity \(v - e + f\text{.}\)[🔗](#sec_gt-planar-4-10) [🔗](#sec_gt-planar-4)

### Subsection Non-planar Graphs

#### Investigate!

For the complete graphs \(K_n\text{,}\) we would like to be able to say something about the number of vertices, edges, and (if the graph is planar) faces. Let’s first consider \(K_3\text{:}\)

1. How many vertices does \(K_3\) have? How many edges?[🔗](#sec_gt-planar-5-4-1-3-1-1) [🔗](#sec_gt-planar-5-4-1-3-1)
2. If \(K_3\) is planar, how many faces should it have?[🔗](#sec_gt-planar-5-4-1-3-2-1) [🔗](#sec_gt-planar-5-4-1-3-2)

[🔗](#sec_gt-planar-5-4-1) Repeat parts (1) and (2) for \(K_4\text{,}\) \(K_5\text{,}\) and \(K_{23}\text{.}\)[🔗](#sec_gt-planar-5-4-2) What about complete bipartite graphs? How many vertices, edges, and faces (if it were planar) does \(K_{7,4}\) have? For which values of \(m\) and \(n\) are \(K_n\) and \(K_{m,n}\) planar?[🔗](#sec_gt-planar-5-4-3) [🔗](#sec_gt-planar-5-4)Not all graphs are planar. If there are too many edges and too few vertices, then some of the edges will need to intersect. The smallest graph where this happens is \(K_5\text{.}\)[🔗](#sec_gt-planar-5-5) ![A copy of K5: five vertices arranged in a pentagon with edges connecting every vertex to every other vertex.](generated/latex-image/sec_gt-planar-5-6.svg) If you try to redraw this without edges crossing, you quickly get into trouble. There seems to be one edge too many. In fact, we can prove that no matter how you draw it, \(K_5\) will always have edges crossing.[🔗](#sec_gt-planar-5-7)

#### Theorem 2.3.1.

\(K_5\) is not planar.[🔗](#sec_gt-planar-5-8-1-3) [🔗](#sec_gt-planar-5-8)

#### Proof.

The proof is by contradiction. So assume that \(K_5\) is planar. Then the graph must satisfy Euler’s formula for planar graphs. \(K_5\) has 5 vertices and 10 edges, so we get \begin{equation*} 5 - 10 + f = 2\text{,} \end{equation*} which says that if the graph is drawn without any edges crossing, there would be \(f = 7\) faces. [🔗](#sec_gt-planar-5-9-1) Now consider how many edges surround each face. Each face must be surrounded by at least 3 edges. Let \(B\) be the total number of *boundaries* around all the faces in the graph. Thus we have that \(3f \le B\text{.}\) But also \(B = 2e\text{,}\) since each edge is used as a boundary exactly twice. Putting this together we get \begin{equation*} 3f \le 2e\text{.} \end{equation*} [🔗](#sec_gt-planar-5-9-2) But this is impossible, since we have already determined that \(f = 7\) and \(e = 10\text{,}\) and \(21 \not\le 20\text{.}\) This is a contradiction, so in fact \(K_5\) is not planar.[🔗](#sec_gt-planar-5-9-3) [🔗](#sec_gt-planar-5-9)The other simplest graph which is not planar is \(K_{3,3}\)[🔗](#sec_gt-planar-5-10) ![A drawing of K3,3 with a row of three vertices on top, each adjacent to the three vertices in a row directly below.](generated/latex-image/sec_gt-planar-5-11.svg) Proving that \(K_{3,3}\) is not planar answers the classic houses and utilities puzzle: it is not possible to connect each of three houses to each of three utilities without the lines crossing.[🔗](#sec_gt-planar-5-12)

#### Theorem 2.3.2.

\(K_{3,3}\) is not planar.[🔗](#sec_gt-planar-5-13-3-1) [🔗](#sec_gt-planar-5-13)

#### Proof.

Again, we proceed by contradiction. Suppose \(K_{3,3}\) were planar. Then by Euler’s formula, there will be 5 faces, since \(v = 6\text{,}\) \(e = 9\text{,}\) and \(6 - 9 + f = 2\text{.}\)[🔗](#sec_gt-planar-5-14-1) How many boundaries surround these 5 faces? Let \(B\) be this number. Since each edge is used as a boundary twice, we have \(B = 2e\text{.}\) Also, \(B \ge 4f\) since each face is surrounded by 4 or more boundaries. We know this is true because \(K_{3,3}\) is bipartite, so does not contain any 3-edge cycles. Thus \begin{equation*} 4f \le 2e\text{.} \end{equation*} [🔗](#sec_gt-planar-5-14-2) But this would say that \(20 \le 18\text{,}\) which is clearly false. Thus \(K_{3,3}\) is not planar.[🔗](#sec_gt-planar-5-14-3) [🔗](#sec_gt-planar-5-14)Note the similarities and differences in these proofs. Both are proofs by contradiction, and both start with using Euler’s formula to derive the (supposed) number of faces in the graph. Then we find a relationship between the number of faces and the number of edges based on how many edges surround each face. This is the only difference. In the proof for \(K_5\text{,}\) we got \(3f \le 2e\) and for \(K_{3,3}\) we had \(4f \le 2e\text{.}\) The coefficient of \(f\) is the key. It is the smallest number of edges that could surround any face. If some number of edges surround a face, then these edges form a cycle. So that number is the size of the smallest cycle in the graph.[🔗](#sec_gt-planar-5-15) In general, if we let \(g\) be the size of the smallest cycle in a graph (\(g\) stands for *girth*, which is the technical term for this) then for any planar graph we have \(gf \le 2e\text{.}\) When this disagrees with Euler’s formula, we know for sure that the graph cannot be planar. 7 Note that for technical reasons, the girth of a graph without any cycles (a forest) is defined to be infinity, and in this case, we definitely don’t have \(gf \le 2e\text{,}\) even though all trees are planar.[🔗](#sec_gt-planar-5-16) [🔗](#sec_gt-planar-5)

### Subsection Polyhedra

#### Investigate!

A cube is an example of a convex polyhedron. It contains 6 identical squares for its faces, 8 vertices, and 12 edges. The cube is a regular polyhedron (also known as a Platonic solid) because each face is an identical regular polygon and each vertex joins an equal number of faces.[🔗](#sec_gt-planar-6-2-1) There are exactly four other regular polyhedra: the tetrahedron, octahedron, dodecahedron, and icosahedron, with 4, 8, 12, and 20 faces respectively. How many vertices and edges do each of these have?[🔗](#sec_gt-planar-6-2-2) [🔗](#sec_gt-planar-6-2) Another area of mathematics where you might have heard the terms “vertex,” “edge,” and “face” is geometry. A polyhedron is a geometric solid made up of flat polygonal faces joined at edges and vertices. We are especially interested in convex polyhedra, which means that any line segment connecting two points on the interior of the polyhedron must be entirely contained inside the polyhedron. 8 An alternative definition for convex is that the internal angle formed by any two faces must be less than \(180\deg\text{.}\) [🔗](#sec_gt-planar-6-3) Notice that since \(8 - 12 + 6 = 2\text{,}\) the vertices, edges, and faces of a cube satisfy Euler’s formula for planar graphs. This is not a coincidence. We can represent a cube as a planar graph by projecting the vertices and edges onto the plane. One such projection looks like this:[🔗](#sec_gt-planar-6-4) ![Eight vertices arranged as a smaller square inside a larger square. Edges from the perimeters of both squares, and edges connect each vertex of the small square to its closest vertex of the larger square.](generated/latex-image/sec_gt-planar-6-5.svg) In fact, *every* convex polyhedron can be projected onto the plane without edges crossing. Think of placing the polyhedron inside a sphere, with a light at the center of the sphere. The edges and vertices of the polyhedron cast a shadow onto the interior of the sphere. You can then cut a hole in the sphere in the middle of one of the projected faces and “stretch” the sphere to lie down flat on the plane. The face that was punctured becomes the “outside” face of the planar graph.[🔗](#sec_gt-planar-6-6) The point is, we can apply what we know about graphs (in particular planar graphs) to convex polyhedra. Since every convex polyhedron can be represented as a planar graph, we see that Euler’s formula for planar graphs holds for all convex polyhedra as well. We also can apply the same sort of reasoning we use for graphs in other contexts to convex polyhedra. For example, we know that there is no convex polyhedron with 11 vertices all of degree 3, as this would make 33/2 edges.[🔗](#sec_gt-planar-6-7)

#### Example 2.3.3.

Is there a convex polyhedron consisting of three triangles and six pentagons? What about three triangles, six pentagons, and five heptagons (7-sided polygons)?[🔗](#sec_gt-planar-6-8-1-1) Solution. How many edges would such polyhedra have? For the first proposed polyhedron, the triangles would contribute a total of 9 edges, and the pentagons would contribute 30. However, this counts each edge twice (as each edge borders exactly two faces), giving 39/2 edges, an impossibility. There is no such polyhedron.[🔗](#sec_gt-planar-6-8-2-1) The second polyhedron does not have this obstacle. The extra 35 edges contributed by the heptagons give a total of 74/2 = 37 edges. So far so good. Now how many vertices does this supposed polyhedron have? We can use Euler’s formula. There are 14 faces, so we have \(v - 37 + 14 = 2\) or equivalently \(v = 25\text{.}\) But now use the vertices to count the edges again. Each vertex must have degree *at least* three (that is, each vertex joins at least three faces since the interior angle of all the polygons must be less that \(180^\circ\)), so the sum of the degrees of vertices is at least 75. Since the sum of the degrees must be exactly twice the number of edges, this says that there are strictly more than 37 edges. Again, there is no such polyhedron.[🔗](#sec_gt-planar-6-8-2-2) [🔗](#sec_gt-planar-6-8-2) [🔗](#sec_gt-planar-6-8)To conclude this application of planar graphs, consider the regular polyhedra. We claimed there are only five. How do we know this is true? We can prove it using graph theory.[🔗](#sec_gt-planar-6-9)

#### Theorem 2.3.4.

There are exactly five regular polyhedra.[🔗](#sec_gt-planar-6-10-1-1) [🔗](#sec_gt-planar-6-10)

#### Proof.

Recall that all the faces of a regular polyhedron are identical regular polygons and that each vertex has the same degree. Consider four cases, depending on the type of regular polygon.[🔗](#sec_gt-planar-6-11-1) Case 1: Each face is a triangle. Let \(f\) be the number of faces. There are then \(3f/2\) edges. Using Euler’s formula, we have \(v - 3f/2 + f = 2\) so \(v = 2 + f/2\text{.}\) Now each vertex has the same degree, say \(k\text{.}\) So the number of edges is also \(kv/2\text{.}\) Putting this together gives \begin{equation*} e = \frac{3f}{2} = \frac{k(2+f/2)}{2}\text{,} \end{equation*} which says \begin{equation*} k = \frac{6f}{4+f}\text{.} \end{equation*} [🔗](#sec_gt-planar-6-11-2) Both \(k\) and \(f\) must be positive integers. Note that \(\frac{6f}{4+f}\) is an increasing function for positive \(f\text{,}\) bounded above by a horizontal asymptote at \(k=6\text{.}\) Thus the only possible values for \(k\) are 3, 4, and 5. Each of these is possible. To get \(k = 3\text{,}\) we need \(f = 4\) (this is the tetrahedron). For \(k = 4\) we take \(f = 8\) (the octahedron). For \(k = 5\) take \(f = 20\) (the icosahedron). Thus there are exactly three regular polyhedra with triangles for faces.[🔗](#sec_gt-planar-6-11-3) Case 2: Each face is a square. Now we have \(e = 4f/2 = 2f\text{.}\) Using Euler’s formula, we get \(v = 2 + f\text{,}\) and counting edges using the degree \(k\) of each vertex gives us \begin{equation*} e = 2f = \frac{k(2+f)}{2}\text{.} \end{equation*} [🔗](#sec_gt-planar-6-11-4) Solving for \(k\) gives \begin{equation*} k = \frac{4f}{2+f} = \frac{8f}{4+2f}\text{.} \end{equation*} [🔗](#sec_gt-planar-6-11-5) This is again an increasing function, but this time the horizontal asymptote is at \(k = 4\text{,}\) so the only possible value that \(k\) could take is 3. This produces 6 faces, and we have a cube. There is only one regular polyhedron with square faces.[🔗](#sec_gt-planar-6-11-6) Case 3: Each face is a pentagon. We perform the same calculation as above, this time getting \(e = 5f/2\) so \(v = 2 + 3f/2\text{.}\) Then \begin{equation*} e = \frac{5f}{2} = \frac{k(2+3f/2)}{2}\text{,} \end{equation*} so \begin{equation*} k = \frac{10f}{4+3f}\text{.} \end{equation*} [🔗](#sec_gt-planar-6-11-7) Now the horizontal asymptote is at \(\frac{10}{3}\text{.}\) This is less than 4, so we can only hope to have \(k = 3\text{.}\) We can do so by using 12 pentagons, getting the dodecahedron. This is the only regular polyhedron with pentagons as faces.[🔗](#sec_gt-planar-6-11-8) Case 4: Each face is an \(n\)-gon with \(n \ge 6\text{.}\) Following the same procedure as above, we deduce that \begin{equation*} k = \frac{2nf}{4+(n-2)f}\text{,} \end{equation*} which will be increasing to a horizontal asymptote of \(\frac{2n}{n-2}\text{.}\) When \(n = 6\text{,}\) this asymptote is at \(k = 3\text{.}\) Any larger value of \(n\) will give an even smaller asymptote. Therefore no regular polyhedra exist with faces larger than pentagons. 9 Notice that you can tile the plane with hexagons. This is an infinite planar graph; each vertex has degree 3. These infinitely many hexagons correspond to the limit as \(f \to \infty\) to make \(k = 3\text{.}\) [🔗](#sec_gt-planar-6-11-9) [🔗](#sec_gt-planar-6-11)[🔗](#sec_gt-planar-6)

### Reading Questions Reading Questions

#### 1.

Is the graph shown below planar? Explain your answer.[🔗](#rq-gt-planar-cross-1-1) ![Graph with 4 vertices and 4 edges, two of the edges cross](generated/latex-image/c4-cross.svg) [🔗](#rq-gt-planar-cross)

#### 2.

Suppose you draw a graph with 10 vertices and 14 edges in such a way that no edges cross. How many faces could your graph have? Explain your answer(s).[🔗](#rq-gt-planar-euler-1-1) [🔗](#rq-gt-planar-euler)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-gt-planar-q-1-1) [🔗](#rq-gt-planar-q)[🔗](#rqs-gt-planar)

### Exercises Practice Problems

#### 1.

Activate Are the following statements true or false?[🔗](#extracted-webwork-44-1-1-1)

1. \(K_{3,6}\) is planar[🔗](#extracted-webwork-44-1-1-2-1-1-1) [🔗](#extracted-webwork-44-1-1-2-1-1)
2. \(K_{2,5}\) is not planar[🔗](#extracted-webwork-44-1-1-2-1-2-1) [🔗](#extracted-webwork-44-1-1-2-1-2)
3. \(K_6\) is not planar[🔗](#extracted-webwork-44-1-1-2-1-3-1) [🔗](#extracted-webwork-44-1-1-2-1-3)
4. \(K_{2,4}\) is planar[🔗](#extracted-webwork-44-1-1-2-1-4-1) [🔗](#extracted-webwork-44-1-1-2-1-4)
5. \(K_{3,10}\) is not planar[🔗](#extracted-webwork-44-1-1-2-1-5-1) [🔗](#extracted-webwork-44-1-1-2-1-5)
6. \(K_{4,5}\) is planar[🔗](#extracted-webwork-44-1-1-2-1-6-1) [🔗](#extracted-webwork-44-1-1-2-1-6)
7. \(K_{2,10}\) is not planar[🔗](#extracted-webwork-44-1-1-2-1-7-1) [🔗](#extracted-webwork-44-1-1-2-1-7)
8. \(K_8\) is not planar[🔗](#extracted-webwork-44-1-1-2-1-8-1) [🔗](#extracted-webwork-44-1-1-2-1-8)

[🔗](#extracted-webwork-44-1-1-2) [🔗](#ww-gt-planar-tf)

#### 2.

Activate Suppose \(G\) is a planar connected graph. It has 22 edges, and 10 faces. How many vertices does \(G\) have?[🔗](#extracted-webwork-45-1-1-1) \(v =\) .[🔗](#extracted-webwork-45-1-1-2) [🔗](#ww-gt-planar-v)

#### 3.

Activate Suppose a connected graph has 5 vertices, and every vertex has degree 2.

1. How many edges does the graph have?[🔗](#extracted-webwork-46-1-1-1-1-1-1) \(e =\) .[🔗](#extracted-webwork-46-1-1-1-1-1-2) [🔗](#extracted-webwork-46-1-1-1-1-1)
2. If the graph were planar, how many faces would it have?[🔗](#extracted-webwork-46-1-1-1-1-2-1) \(f =\) .[🔗](#extracted-webwork-46-1-1-1-1-2-2) [🔗](#extracted-webwork-46-1-1-1-1-2)

[🔗](#extracted-webwork-46-1-1-1) [🔗](#ww-gt-planar-degrees)

#### 4.

Activate Let’s prove that \(K_{8}\) is not planar:[🔗](#extracted-webwork-47-1-1-1) First, how many vertices and how many edges does \(K_{8}\) have?[🔗](#extracted-webwork-47-1-1-2) \(v =\) and \(e =\) .[🔗](#extracted-webwork-47-1-1-3) If we assume that \(K_{8}\) were planar, then how many faces *would* it have?[🔗](#extracted-webwork-47-1-1-4) \(f =\) .[🔗](#extracted-webwork-47-1-1-5) However, since every face is bounded by at least edges, and every edge borders exactly faces, we can get a bound on the number of faces. What is the largest number of faces possible based on this line of reasoning?[🔗](#extracted-webwork-47-1-1-6) \(f \le\) .[🔗](#extracted-webwork-47-1-1-7) This is a contradiction, so \(K_{8}\) is not planar. QED.[🔗](#extracted-webwork-47-1-1-8) [🔗](#ww-gt-planar-proof)

#### 5.

Activate Suppose the graph is planar but not connected, and has \(4\) components. Draw enough examples to derive a variant of Euler’s formula for this case.[🔗](#extracted-webwork-48-1-1-1) \(v-e+f=\) .[🔗](#extracted-webwork-48-1-1-2) [🔗](#ww-gt-planar-euler-gen)[🔗](#practice_gt-planar)

### Exercises Additional Exercises

#### 1.

Is it possible for a planar graph to have 6 vertices, 10 edges, and 5 faces? Explain.[🔗](#exercises_gt-planar-2-1-1) [🔗](#exercises_gt-planar-2)

#### 2.

The graph \(G\) has 6 vertices with degrees \(2, 2, 3, 4, 4, 5\text{.}\) How many edges does \(G\) have? Could \(G\) be planar? If so, how many faces would it have? If not, explain.[🔗](#exercises_gt-planar-3-1-1) [🔗](#exercises_gt-planar-3)

#### 3.

Is it possible for a connected graph with 7 vertices and 10 edges to be drawn so that no edges cross and create 4 faces? Explain.[🔗](#exercises_gt-planar-4-1-1) Hint. What would Euler’s formula tell you?[🔗](#exercises_gt-planar-4-2-1) [🔗](#exercises_gt-planar-4-2) [🔗](#exercises_gt-planar-4)

#### 4.

Is it possible for a graph with 10 vertices and edges to be a connected planar graph? Explain.[🔗](#exercises_gt-planar-5-1-1) [🔗](#exercises_gt-planar-5)

#### 5.

Is there a connected planar graph with an odd number of faces where every vertex has degree 6? Prove your answer.[🔗](#exercises_gt-planar-6-1-1) Hint. You can use the handshake lemma to find the number of edges, in terms of \(v\text{,}\) the number of vertices.[🔗](#exercises_gt-planar-6-2-1) [🔗](#exercises_gt-planar-6-2) [🔗](#exercises_gt-planar-6)

#### 6.

I’m thinking of a polyhedron containing 12 faces. Seven are triangles and four are quadrilaterals. The polyhedron has 11 vertices including those around the mystery face. How many sides does the last face have?[🔗](#exercises_gt-planar-7-1-1) [🔗](#exercises_gt-planar-7)

#### 7.

Consider some classic polyhedrons.

1. An *octahedron* is a regular polyhedron made up of 8 equilateral triangles (it sort of looks like two pyramids with their bases glued together). Draw a planar graph representation of an octahedron. How many vertices, edges, and faces does an octahedron (and your graph) have?[🔗](#exercises_gt-planar-8-1-1-1-1-1) [🔗](#exercises_gt-planar-8-1-1-1-1)
2. The traditional design of a soccer ball is a (spherical projection of a) truncated icosahedron. This consists of 12 regular pentagons and 20 regular hexagons. No two pentagons are adjacent (so the edges of each pentagon are shared only by hexagons). How many vertices, edges, and faces does a truncated icosahedron have? Explain how you arrived at your answers. Bonus: draw the planar graph representation of the truncated icosahedron.[🔗](#exercises_gt-planar-8-1-1-1-2-1) [🔗](#exercises_gt-planar-8-1-1-1-2)
3. Your “friend” claims that he has constructed a convex polyhedron out of 2 triangles, 2 squares, 6 pentagons, and 5 octagons. Prove that your friend is lying. Hint: each vertex of a convex polyhedron must border at least three faces.[🔗](#exercises_gt-planar-8-1-1-1-3-1) [🔗](#exercises_gt-planar-8-1-1-1-3)

[🔗](#exercises_gt-planar-8-1-1) [🔗](#exercises_gt-planar-8)

#### 8.

Prove Euler’s formula using a minimal criminal argument, where minimum means smallest number of edges[🔗](#exercises_gt-planar-9-1-1) [🔗](#exercises_gt-planar-9)

#### 9.

Prove Euler’s formula using a minimal criminal argument, where minimum means smallest number of *vertices*.[🔗](#exercises_gt-planar-10-1-1) [🔗](#exercises_gt-planar-10)

#### 10.

Euler’s formula (\(v - e + f = 2\)) holds for all *connected* planar graphs. What if a graph is not connected? Suppose a planar graph has two components. What is the value of \(v - e + f\) now? What if it has \(k\) components?[🔗](#exercises_gt-planar-11-1-1) [🔗](#exercises_gt-planar-11)

#### 11.

Prove that the Petersen graph (below) is not planar.[🔗](#exercises_gt-planar-12-1-1) ![A drawing of the Petersen graph: ten vertices arranged as a larger pentagon around a smaller pentagram (five pointed star). Edges form the outside of the larger pentagon and the crossing lines of the pentagram. Each vertex of the larger pentagon is adjacent to the closest vertex of the inside pentagram.](generated/latex-image/petersen_graph.svg) Hint. What is the length of the shortest cycle? (This quantity is usually called the girth of the graph.)[🔗](#exercises_gt-planar-12-2-1) [🔗](#exercises_gt-planar-12-2) [🔗](#exercises_gt-planar-12)

#### 12.

Prove that any planar graph with \(v\) vertices and \(e\) edges satisfies \(e \le 3v - 6\text{.}\)[🔗](#exercises_gt-planar-13-1-1) [🔗](#exercises_gt-planar-13)

#### 13.

Prove that any planar graph must have a vertex of degree 5 or less.[🔗](#exercises_gt-planar-14-1-1) [🔗](#exercises_gt-planar-14)

#### 14.

Give a careful proof that the graph below is not planar.[🔗](#exr-grotzsch-nonplanar-1-1) ![A graph with 11 vertices. A single vertex in the center, then five vertices equally spaced around a ring around it, and five more equally spaced around a ring around those. Edges form the sides of a pentagon for the outer ring of vertices. Each outer vertex is also adjacent to two inner vertices: the two on either side of the vertex closest to it. Finally, every inner vertex is also adjacent to the center vertex.](generated/latex-image/img-grotzsch1.svg) Hint. The girth of the graph is 4.[🔗](#exr-grotzsch-nonplanar-2-1) [🔗](#exr-grotzsch-nonplanar-2) [🔗](#exr-grotzsch-nonplanar)

#### 15.

Explain why we cannot use the same sort of proof we did in [Exercise 14](sec_gt-planar.html#exr-grotzsch-nonplanar) to prove that the graph below is not planar. Then explain how you know the graph is not planar anyway.[🔗](#exercises_gt-planar-16-1-1) ![A graph with 11 vertices. A single vertex in the center, then five vertices equally spaced around a ring around it, and five more equally spaced around a ring around those. Edges form the sides of a pentagon for the outer ring of vertices and also the inner ring of vertices. Each outer vertex is also adjacent to two inner vertices: the two on either side of the vertex closest to it. Finally, every inner vertex is also adjacent to the center vertex.](generated/latex-image/img-grotzsch-plus.svg) Hint. What has happened to the girth? Careful: We have a different number of edges as well. Better check Euler’s formula.[🔗](#exercises_gt-planar-16-2-1) [🔗](#exercises_gt-planar-16-2) [🔗](#exercises_gt-planar-16)[🔗](#exercises_gt-planar)[🔗](#sec_gt-planar) [&#xe5cb;Prev](sec_trees.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_gt-paths.html) [Feedback](/cdn-cgi/l/email-protection#b2ddc1d1d3c09cded7c4dbdcf2c7dcd1dd9cd7d6c7)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_gt-planar-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_gt-planar-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 2.5 Coloring

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_coloring-2-1-1)

1. Determine the chromatic number of a graph.[🔗](#sec_coloring-2-2-1-1) [🔗](#sec_coloring-2-2-1)
2. Determine the chromatic index of a graph[🔗](#sec_coloring-2-2-2-1) [🔗](#sec_coloring-2-2-2)
3. Decide whether using the chromatic number or chromatic index is more appropriate to solve particular problems.[🔗](#sec_coloring-2-2-3-1) [🔗](#sec_coloring-2-2-3)

[🔗](#sec_coloring-2)

### Subsection Section Preview

#### Investigate!

Mapmakers in the fictional land of Euleria have drawn the borders of the various dukedoms of the land. To make the map pretty, they wish to color each region. Adjacent regions must be colored differently, but it is perfectly fine to color two distant regions with the same color. What is the fewest colors the mapmakers can use and still accomplish this task?[🔗](#sec_coloring-3-2-1) ! [🔗](#sec_coloring-3-2)Perhaps the most famous graph theory problem is how to color maps.[🔗](#sec_coloring-3-3)

> Given any map of countries, states, counties, etc., how many colors are needed to color each region on the map so that neighboring regions are colored differently?[🔗](#sec_coloring-3-4-1)
> > [🔗](#sec_coloring-3-4)

Actual map makers usually use around seven colors. For one thing, they require watery regions to be a specific color, and with a lot of colors it is easier to find a permissible coloring. We want to know whether there is a smaller palette that will work for any map.[🔗](#sec_coloring-3-5) How is this related to graph theory? Well, if we place a vertex in the center of each region (say in the capital of each state) and then connect two vertices if their states share a border, we get a graph. Coloring regions on the map corresponds to coloring the vertices of the graph. Since neighboring regions cannot be colored the same, our graph cannot have vertices colored the same when those vertices are adjacent.[🔗](#sec_coloring-3-6) In general, given any graph \(G\text{,}\) a coloring of the vertices is called (not surprisingly) a vertex coloring. If the vertex coloring has the property that adjacent vertices are colored differently, then the coloring is called proper. Every graph has a proper vertex coloring. For example, you could color every vertex with a different color. But often you can do better. The smallest number of colors needed to get a proper vertex coloring is called the chromatic number of the graph, written \(\chi(G)\text{.}\) [🔗](#sec_coloring-3-7) Our goal in this section is to see how graph coloring can be used to solve some problems and to understand some basic properties of graph coloring.[🔗](#sec_coloring-3-8)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-coloring-vertices)

For each graph below:

- Find a proper vertex coloring using some number of colors. That is, color vertices using any number of colors but in such a way that no pair of adjacent vertices have the same color.[🔗](#PA-coloring-vertices-2-1-1-1-1) [🔗](#PA-coloring-vertices-2-1-1-1)
- Find the *fewest* number of colors you need to properly color the vertices of the graph. This is called the chromatic number of the graph. Think about how you know your answer is correct.[🔗](#PA-coloring-vertices-2-1-1-2-1) [🔗](#PA-coloring-vertices-2-1-1-2)
- Can you generalize? Can you conclude anything about the chromatic number for particular sorts of graphs?[🔗](#PA-coloring-vertices-2-1-1-3-1) [🔗](#PA-coloring-vertices-2-1-1-3)

[🔗](#PA-coloring-vertices-2-1)

#### 1.

Activate ![A copy of the complete graph on 6 vertices to be colored](generated/webwork/images/webwork-56-image-1.svg) \(\chi(G) =\)[🔗](#extracted-webwork-56-1-1-2) [🔗](#pa-gt-coloring-1)

#### 2.

Activate ![a bipartite graph with 5 vertices on the left each connected to each of 3 vertices on the right](generated/webwork/images/webwork-57-image-1.svg) \(\chi(G) =\) [🔗](#extracted-webwork-57-1-1-2) [🔗](#pa-gt-coloring-2)

#### 3.

Activate ![A cycle of 8 vertices to be colored](generated/webwork/images/webwork-58-image-1.svg) \(\chi(G) =\)[🔗](#extracted-webwork-58-1-1-2) [🔗](#pa-gt-coloring-3)

#### 4.

Activate ![A cycle of 7 vertices to be colored](generated/webwork/images/webwork-59-image-1.svg) \(\chi(G) =\)[🔗](#extracted-webwork-59-1-1-2) [🔗](#pa-gt-coloring-4)

#### 5.

Activate ![a tree consisting of 13 vertices, 6 of which are leaves. 4 vertices have degree 2, 2 vertices have degree 3, and the last vertex has degree 4.](generated/webwork/images/webwork-60-image-1.svg) \(\chi(G) =\)[🔗](#extracted-webwork-60-1-1-2) [🔗](#pa-gt-coloring-5)

#### 6.

Activate ![A graph with 13 vertices and 28 edges. No edges cross.](generated/webwork/images/webwork-61-image-1.svg) \(\chi(G) =\)[🔗](#extracted-webwork-61-1-1-2) [🔗](#pa-gt-coloring-6) [🔗](#PA-coloring-vertices)[🔗](#sec_coloring-3)

### Subsection Coloring Vertices

#### Investigate!

The math department plans to offer 10 classes next semester. Some classes cannot run at the same time (perhaps they are taught by the same professor, or are required for seniors).[🔗](#sec_coloring-4-2-1)

| Class: | Conflicts with: |
| --- | --- |
| A | D I |
| B | D I J |
| C | E F I |
| D | A B F |
| E | C H I |
| F | C D I |
| G | J |
| H | E I J |
| I | A B C E F H |
| J | B G H |

How many different time slots are needed to teach these classes (and which should be taught at the same time)? More importantly, how could we use graph coloring to answer this question?[🔗](#sec_coloring-4-2-3) [🔗](#sec_coloring-4-2)The best way to get a feel for the chromatic number is to actually try to color some graphs.[🔗](#sec_coloring-4-3)

#### Example 2.5.1.

Find the chromatic number of the graphs below.[🔗](#sec_coloring-4-4-1-1) ![A copy of K6: six vertices arranged in a hexagon, with every vertex adjacent to every other vertex.](generated/latex-image/img-k6.svg) ![Six vertices arranged in a triangle (with three vertices along each side). Six edges form the outside of the triangle, and three edges connect the center vertices of each side (in an upside-down triangle).](generated/latex-image/img-gt-triangles.svg) ![A copy of K2,3, with a row of two vertices on a top row, each adjacent to each of three vertices on a bottom row](generated/latex-image/img-k-2-3.svg) Solution. The graph on the left is \(K_6\text{.}\) The only way to properly color the graph is to give every vertex a different color (since every vertex is adjacent to every other vertex). Thus the chromatic number is 6.[🔗](#sec_coloring-4-4-2-1) The middle graph can be properly colored with just 3 colors (Red, Blue, and Green). For example:[🔗](#sec_coloring-4-4-2-2) ![Six vertices arranged in a triangle (with three vertices along each side). Six edges form the outside of the triangle, and three edges connect the center vertices of each side (in an upside-down triangle). The bottom row of vertices are labeled R, B, G (left to right), the middle row of vertices are labeled G, R, and to top vertex is labeled B.](generated/latex-image/img-gt-colored-triangles.svg) There is no way to color it with just two colors, since there are three vertices mutually adjacent (i.e., a triangle). Thus the chromatic number is 3.[🔗](#sec_coloring-4-4-2-4) The graph on the right is just \(K_{2,3}\text{.}\) As with all bipartite graphs, this graph has chromatic number 2: color the vertices on the top row red and the vertices on the bottom row blue.[🔗](#sec_coloring-4-4-2-5) [🔗](#sec_coloring-4-4-2) [🔗](#sec_coloring-4-4)It appears that there is no limit to how large chromatic numbers can get. It should not come as a surprise that \(K_n\) has chromatic number \(n\text{.}\) So how could there possibly be an answer to the original map coloring question? If the chromatic number of a graph can be arbitrarily large, then it seems like there would be no upper bound to the number of colors needed for any map. But there is.[🔗](#sec_coloring-4-5) The key observation is that while it is true that for any number \(n\) there is a graph with chromatic number \(n\text{,}\) only some graphs arrive as representations of maps. If you convert a map to a graph, the edges between vertices correspond to borders between the countries. So you should be able to connect vertices in such a way that the edges do not cross. In other words, the graphs representing maps are all *planar*![🔗](#sec_coloring-4-6) So the question is, what is the largest chromatic number of any planar graph? The answer is the best-known theorem of graph theory:[🔗](#sec_coloring-4-7)

#### Theorem 2.5.2. The Four Color Theorem.

If \(G\) is a planar graph, then the chromatic number of \(G\) is less than or equal to 4. Thus any map can be properly colored with 4 or fewer colors.[🔗](#thm-four-color-5-1) [🔗](#thm-four-color)We will not prove this theorem. Really. Even though the theorem is easy to state and understand, the proof is not. In fact, there is currently no “easy” known proof of the theorem. The current best proof still requires powerful computers to check an *unavoidable set* of 633 *reducible configurations*. The idea is that every graph must contain one of these reducible configurations (this fact also needs to be checked by a computer) and that reducible configurations can, in fact, be colored in 4 or fewer colors.[🔗](#sec_coloring-4-9) Cartography is certainly not the only application of graph coloring. There are plenty of situations in which you might wish to partition the objects in question so that related objects are not in the same set. For example, you might wish to store chemicals safely. To avoid explosions, certain pairs of chemicals should not be stored in the same room. By coloring a graph (with vertices representing chemicals and edges representing potential negative interactions), you can determine the smallest number of rooms needed to store the chemicals.[🔗](#sec_coloring-4-10) Here is a further example:[🔗](#sec_coloring-4-11)

#### Example 2.5.3.

Radio stations broadcast their signal at certain frequencies. However, there are a limited number of frequencies to choose from, so nationwide, many stations use the same frequency. This works because the stations are far enough apart that their signals will not interfere; no one radio could pick them up at the same time.[🔗](#sec_coloring-4-12-1-1) Suppose 10 new radio stations are to be set up in a currently unpopulated (by radio stations) region. The radio stations that are close enough to each other to cause interference are recorded in the table below. What is the fewest number of frequencies the stations could use?[🔗](#sec_coloring-4-12-1-2)

|  | KQEA | KQEB | KQEC | KQED | KQEE | KQEF | KQEG | KQEH | KQEI | KQEJ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| KQEA |  |  | x |  |  | x | x |  |  | x |
| KQEB |  |  | x | x |  |  |  |  |  |  |
| KQEC | x | x |  |  |  | x | x |  |  | x |
| KQED |  | x |  |  | x | x |  | x |  |  |
| KQEE |  |  |  | x |  |  |  |  | x |  |
| KQEF | x |  | x | x |  |  | x |  |  | x |
| KQEG | x |  | x |  |  | x |  |  |  | x |
| KQEH |  |  |  | x |  |  |  |  | x |  |
| KQEI |  |  |  |  | x |  |  | x |  | x |
| KQEJ | x |  | x |  |  | x | x |  | x |  |

Solution. Represent the problem as a graph with vertices as the stations and edges when two stations are close enough to cause interference. We are looking for the chromatic number of the graph. Vertices that are colored identically represent stations that can have the same frequency.[🔗](#sec_coloring-4-12-2-1) This graph has chromatic number 5. A proper 5-coloring is shown on the right. Notice that the graph contains a copy of the complete graph \(K_5\text{,}\) so no fewer than 5 colors can be used.[🔗](#sec_coloring-4-12-2-2) ![A drawing of the graph representing the radio stations with edges between vertices if those radio stations interfere with each other. Vertices are arranged in a ring with KQEA at the top, and proceeding clockwise to KQEB, and so on through KQEH.](generated/latex-image/img-radio-graph.svg) ![A drawing of the graph representing the radio stations with edges between vertices if those radio stations interfere with each other. Here each vertex is labeled with a letter representing a color. From the top vertex and moving around clockwise: R, G, B, B, G, G, Y, R, B, P. A copy of of the graph K5 is drawn in bold among the edges of the original graph.](generated/latex-image/img-radio-graph-colored.svg) [🔗](#sec_coloring-4-12-2) [🔗](#sec_coloring-4-12)In the example above, the chromatic number was 5, but this is not a counterexample to the [Four Color Theorem 2.5.2](sec_coloring.html#thm-four-color), since the graph representing the radio stations is not planar. It would be nice to have some quick way to find the chromatic number of a (possibly non-planar) graph. It turns out nobody knows whether an efficient algorithm for computing chromatic numbers exists.[🔗](#sec_coloring-4-13) While we might not be able to find the exact chromatic number of a graph easily, we can often give a reasonable range for the chromatic number. In other words, we can give upper and lower bounds for the chromatic number.[🔗](#sec_coloring-4-14) This is not very difficult: for every graph \(G\text{,}\) the chromatic number of \(G\) is at least 1 and at most the number of vertices of \(G\text{.}\)[🔗](#sec_coloring-4-15) What? You want *better* bounds on the chromatic number? Well, you are in luck.[🔗](#sec_coloring-4-16) A clique in a graph is a set of vertices all of which are pairwise adjacent. In other words, a clique of size \(n\) is just a copy of the complete graph \(K_n\text{.}\) We define the clique number of a graph to be the largest \(n\) for which the graph contains a clique of size \(n\text{.}\) Any clique of size \(n\) cannot be colored with fewer than \(n\) colors, so we have a nice lower bound:[🔗](#sec_coloring-4-17)

#### Theorem 2.5.4.

The chromatic number of a graph \(G\) is at least the clique number of \(G\text{.}\)[🔗](#sec_coloring-4-18-1-1) [🔗](#sec_coloring-4-18) There are times when the chromatic number of \(G\) is *equal* to the clique number. These graphs have a special name; they are called perfect. If you know that a graph is perfect, then finding the chromatic number is simply a matter of searching for the largest clique. 10 There are special classes of graphs that can be proved to be perfect. One such class is the set of chordal graphs, which have the property that every cycle in the graph contains a chord—an edge between two vertices in the cycle which are not adjacent in the cycle. However, not all graphs are perfect.[🔗](#sec_coloring-4-19) For an upper bound, we can improve on “the number of vertices” by looking at the degrees of vertices. Let \(\Delta(G)\) be the largest degree of any vertex in the graph \(G\text{.}\) One reasonable guess for an upper bound on the chromatic number is \(\chi(G) \le \Delta(G) + 1\text{.}\) Why is this reasonable? Starting with any vertex, it together with all of its neighbors can always be colored in \(\Delta(G) + 1\) colors, since at most we are talking about \(\Delta(G) + 1\) vertices in this set. Now fan out! At any point, if you consider an already colored vertex, some of its neighbors might be colored, some might not. But no matter what, that vertex and its neighbors could all be colored distinctly, since there are at most \(\Delta(G)\) neighbors, plus the one vertex being considered.[🔗](#sec_coloring-4-20) In fact, there are examples of graphs for which \(\chi(G) = \Delta(G) + 1\text{.}\) For any \(n\text{,}\) the complete graph \(K_n\) has chromatic number \(n\text{,}\) but \(\Delta(K_n) = n-1\) (since every vertex is adjacent to every *other* vertex). Additionally, any *odd* cycle will have chromatic number 3, but the degree of every vertex in a cycle is 2. It turns out that these are the only two types of examples where we get equality, a result known as Brooks’ Theorem.[🔗](#sec_coloring-4-21)

#### Theorem 2.5.5. Brooks’ Theorem.

Any graph \(G\) satisfies \(\chi(G) \le \Delta(G)\text{,}\) unless \(G\) is a complete graph or an odd cycle, in which case \(\chi(G) = \Delta(G) + 1\text{.}\)[🔗](#sec_coloring-4-22-3-1) [🔗](#sec_coloring-4-22)The proof of this theorem is *just* complicated enough that we will not present it here (although you are asked to prove a special case in the exercises). The adventurous reader is encouraged to find a book on graph theory to find suggestions for how to prove the theorem.[🔗](#sec_coloring-4-23) [🔗](#sec_coloring-4)

### Subsection Coloring Edges

The chromatic number of a graph tells us about coloring vertices, but we could also ask about coloring edges. Just like with vertex coloring, we might insist that adjacent edges must be colored differently. Here, we are thinking of two edges as being adjacent if they are incident to the same vertex. The least number of colors required to properly color the edges of a graph \(G\) is called the chromatic index of \(G\text{,}\) written \(\chi'(G)\text{.}\) [🔗](#sec_coloring-5-3)

#### Example 2.5.6.

Six friends decide to spend the afternoon playing chess. Everyone will play everyone else once. They have plenty of chess sets, but nobody wants to play more than one game at a time. Games will last an hour (thanks to their handy chess clocks). How many hours will the tournament last?[🔗](#sec_coloring-5-4-1-1) Solution. Represent each player with a vertex and put an edge between two players if they play each other. In this case, we get the graph \(K_6\text{:}\)[🔗](#sec_coloring-5-4-2-1) ![The graph K6: six vertices (arranged in a circle), each adjacent to the other five.](generated/latex-image/img-chess-graph.svg) We must color the edges; each color represents a different hour. Since different edges incident to the same vertex will be colored differently, no player will be playing two different games (edges) at the same time. Thus we need to know the chromatic index of \(K_6\text{.}\)[🔗](#sec_coloring-5-4-2-3) Notice that for sure \(\chi'(K_6) \ge 5\text{,}\) since there is a vertex of degree 5. It turns out, 5 colors is enough (go find such a coloring). Therefore the friends will play for 5 hours.[🔗](#sec_coloring-5-4-2-4) [🔗](#sec_coloring-5-4-2) [🔗](#sec_coloring-5-4)Interestingly, if one of the friends in the above example left, the remaining 5 chessletes would still need 5 hours: the chromatic index of \(K_5\) is also 5.[🔗](#sec_coloring-5-5) In general, what can we say about the chromatic index? Certainly \(\chi'(G) \ge \Delta(G)\text{.}\) But how much higher could it be? Only a little higher.[🔗](#sec_coloring-5-6)

#### Theorem 2.5.7. Vizing’s Theorem.

For any graph \(G\text{,}\) the chromatic index \(\chi'(G)\) is either \(\Delta(G)\) or \(\Delta(G) + 1\text{.}\)[🔗](#sec_coloring-5-7-3-1) [🔗](#sec_coloring-5-7)At first, this theorem makes it seem like the chromatic index might not be very interesting. However, deciding which case a graph is in is not always easy. Graphs for which \(\chi'(G) = \Delta(G)\) are called *class 1*, while the others are called *class 2*. Bipartite graphs always satisfy \(\chi'(G) = \Delta(G)\text{,}\) so are class 1 (this was proved by König in 1916, decades before Vizing proved his theorem in 1964). In 1965 Vizing proved that all planar graphs with \(\Delta(G) \ge 8\) are of class 1, but this does not hold for all planar graphs with \(2 \le \Delta(G) \le 5\text{.}\) Vizing conjectured that all planar graphs with \(\Delta(G) = 6\) or \(\Delta(G) = 7\) are class 1; the \(\Delta(G) = 7\) case was proved in 2001 by Sanders and Zhao; the \(\Delta(G) = 6\) case is still open.[🔗](#sec_coloring-5-8)

#### Ramsey Theory.

There is another interesting way we might consider coloring edges, quite different from what we have discussed so far. What if we colored every edge of a graph either red or blue? Can we do so without, say, creating a *monochromatic* triangle (i.e., an all red or all blue triangle)? Certainly, for some graphs the answer is yes. Try doing so for \(K_4\text{.}\) What about \(K_5\text{?}\) \(K_6\text{?}\) How far can we go?[🔗](#sec_coloring-5-9-3) The problem above is not too difficult and is a fun exercise. We could extend the question in a variety of ways. What if we had three colors? What if we were trying to avoid other graphs? Surprisingly, very little is known about these questions. For example, we know that you need to go up to \(K_{17}\) in order to force a monochromatic triangle using three colors, but nobody knows how big you need to go with more colors. Similarly, we know that using two colors, \(K_{18}\) is the smallest graph that forces a monochromatic copy of \(K_4\text{,}\) but the best we have to force a monochromatic \(K_{5}\) is a range, somewhere from \(K_{43}\) to \(K_{49}\text{.}\) If you are interested in these sorts of questions, this area of graph theory is called Ramsey theory. Check it out.[🔗](#sec_coloring-5-9-4) [🔗](#sec_coloring-5-9)[🔗](#sec_coloring-5)

### Reading Questions Reading Questions

#### 1.

True or false: if a graph contains a vertex of degree 5, then the chromatic number of the graph is at least 5. Explain.[🔗](#rq-gt-coloring-degree-1-1) [🔗](#rq-gt-coloring-degree)

#### 2.

In your own words, explain the difference between chromatic number and chromatic index.[🔗](#rq-gt-coloring-edges-1-1) [🔗](#rq-gt-coloring-edges)

#### 3.

What questions do you have after reading this section? Write at least one question about the content of this section that you are curious about.[🔗](#rq-gt-coloring-q-1-1) [🔗](#rq-gt-coloring-q)[🔗](#rqs-gt-coloring)

### Exercises Practice Problems

#### 1.

Activate Each of the following problems can be solved by finding either the chromatic number of a graph or the chromatic index of a graph.[🔗](#extracted-webwork-62-1-1-1) For each problem, say whether you should find a proper coloring of the vertices or of the edges of the graph to solve the problem. Note: you likely don’t have enough information to actually solve the problem, but this is okay. Just say in principle whether this is an edge-coloring or vertex-coloring application.[🔗](#extracted-webwork-62-1-1-2)

1. Professor Snape stores potion ingredients in as few cabinets as possible, but some ingredients can’t be stored in the same cabinet because they could interact dangerously. How many cabinets are required?[🔗](#extracted-webwork-62-1-1-3-1-1-1) [🔗](#extracted-webwork-62-1-1-3-1-1)
2. At the world Tic-Tac-Toe championship, each player must play against seven other players. New games start every hour. How many hours will the tournament take?[🔗](#extracted-webwork-62-1-1-3-1-2-1) [🔗](#extracted-webwork-62-1-1-3-1-2)
3. Your teacher wants to have different versions of the Final Exam so that no students that are seated within four feet of each other have the same version of the exam. How many versions are needed?[🔗](#extracted-webwork-62-1-1-3-1-3-1) [🔗](#extracted-webwork-62-1-1-3-1-3)
4. The math department wants to schedule common, day-long midterm exams over Spring Break, but obviously a student in two classes has to have their exams for those classes on different days (and this is the only problem with this plan). How many days are needed for exams?[🔗](#extracted-webwork-62-1-1-3-1-4-1) [🔗](#extracted-webwork-62-1-1-3-1-4)

[🔗](#extracted-webwork-62-1-1-3) [🔗](#ww-gt-coloring-apps)

#### 2.

Activate What is the chromatic number of each graph?[🔗](#extracted-webwork-63-1-1-1) \(P_{15}\) [🔗](#extracted-webwork-63-1-1-2) \(C_{6}\) [🔗](#extracted-webwork-63-1-1-3) \(C_{5}\) [🔗](#extracted-webwork-63-1-1-4) \(K_{5, 15}\) [🔗](#extracted-webwork-63-1-1-5) \(K_{5}\) [🔗](#extracted-webwork-63-1-1-6) [🔗](#ww-gt-chromatic-number)

#### 3.

Activate What is the chromatic *index* of each graph?[🔗](#extracted-webwork-64-1-1-1) \(P_{5}\) [🔗](#extracted-webwork-64-1-1-2) \(C_{14}\) [🔗](#extracted-webwork-64-1-1-3) \(C_{9}\) [🔗](#extracted-webwork-64-1-1-4) \(K_{5, 15}\) [🔗](#extracted-webwork-64-1-1-5) \(K_{14}\) [🔗](#extracted-webwork-64-1-1-6) [🔗](#ww-gt-chromatic-index)

#### 4.

Activate The following statements are about the chromatic number \(\chi(G)\) and the chromatic index \(\chi'(G)\) of graphs. We use \(\Delta(G)\) for the maximum degree of \(G\text{.}\)[🔗](#extracted-webwork-65-1-1-1) Are the following statements true or false?[🔗](#extracted-webwork-65-1-1-2)

1. If a every vertex of a graph has degree at most 7, then the chromatic index of the graph is at least 7.[🔗](#extracted-webwork-65-1-1-3-1-1-1) [🔗](#extracted-webwork-65-1-1-3-1-1)
2. \(\chi'(G) \ge \Delta(G)\text{.}\)[🔗](#extracted-webwork-65-1-1-3-1-2-1) [🔗](#extracted-webwork-65-1-1-3-1-2)
3. For any cycle, the chromatic index is equal to the chromatic number.[🔗](#extracted-webwork-65-1-1-3-1-3-1) [🔗](#extracted-webwork-65-1-1-3-1-3)
4. For all \(n \ge 3\text{,}\) \(\chi'(K_n) = \Delta(K_n)\text{.}\)[🔗](#extracted-webwork-65-1-1-3-1-4-1) [🔗](#extracted-webwork-65-1-1-3-1-4)

[🔗](#extracted-webwork-65-1-1-3) [🔗](#ww-gt-chromatic-TF)

#### 5.

Activate What is the chromatic number of each graph?[🔗](#extracted-webwork-66-1-1-1)

| ![a graph for which to find the chromatic number](/images/discrete-math/sec_coloring-webwork-66-image-1.png.webp) | ![a graph for which to find the chromatic number](/images/discrete-math/sec_coloring-webwork-66-image-2.png.webp) |
| --- | --- |
|  |  |
| ![a graph for which to find the chromatic number](/images/discrete-math/sec_coloring-webwork-66-image-3.png.webp) | [🔗](#extracted-webwork-66-1-1-2-3-2-2) |
|  |  |

[🔗](#ww-gt-chromnum)[🔗](#practice_gt-coloring)

### Exercises Additional Exercises

#### 1.

What is the smallest number of colors you need to properly color the vertices of \(K_{4,5}\text{?}\) That is, find the chromatic number of the graph.[🔗](#exercises_gt-coloring-2-1-1) [🔗](#exercises_gt-coloring-2)

#### 2.

Draw a graph with chromatic number 6 (i.e., which requires 6 colors to properly color the vertices). Could your graph be planar? Explain.[🔗](#exercises_gt-coloring-3-1-1) [🔗](#exercises_gt-coloring-3)

#### 3.

Find the chromatic number of each of the following graphs.[🔗](#exercises_gt-coloring-4-1-1) ![A graph with five vertices arranged in a diamond with one vertex in the middle. The top vertex is connected to the two outside vertices below it, which are connected to the bottom vertex. The center vertex is connected to the two vertices to its left and right.](generated/latex-image/k23-coloring.svg) ![The graph C7: seven vertices arranged in a circle with edges connecting neighboring vertices (creating a 7-sided polygon).](generated/latex-image/c7-coloring.svg) ![Five vertices in a pentagon with a sixth vertex in the center. Edges form the outside of the pentagon, and the center vertex is adjacent to each outside vertex.](generated/latex-image/w5-coloring.svg) ![The graph K5: five vertices each adjacent to all the others, arranged in a pentagon.](generated/latex-image/k5-coloring.svg) ![The Petersen graph: ten vertices arranged in two rings of five each. Each outer vertex is adjacent to the two outer vertices closest to it, forming a pentagon, and to the inner vertex closest to it. Each inner vertex is adjacent to the two inner vertices not neighboring it, forming a 5-ponted star.](generated/latex-image/petersen_graph_coloring.svg) [🔗](#exercises_gt-coloring-4)

#### 4.

A group of 10 friends decides to head up to a cabin in the woods (where nothing could possibly go wrong). Unfortunately, a number of these friends have dated each other in the past, and things are still a little awkward. To get to the cabin, they need to divide up into some number of cars, and no two people who dated should be in the same car.[🔗](#exercises_gt-coloring-5-1-1)

#### (a)

What is the smallest number of cars you need if all the relationships were strictly heterosexual? Represent an example of such a situation with a graph. What kind of graph do you get?[🔗](#exercises_gt-coloring-5-2-1-1) [🔗](#exercises_gt-coloring-5-2)

#### (b)

Because a number of these friends dated there are also conflicts between friends of the same gender, listed below. Now what is the smallest number of conflict-free cars they could take to the cabin?[🔗](#exercises_gt-coloring-5-3-1-1)

| Friend | A | B | C | D | E | F | G | H | I | J |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Conflicts | CFI | J | AEF | H | CFG | ACEGI | EFI | D | AFG | B |

[🔗](#exercises_gt-coloring-5-3)[🔗](#exercises_gt-coloring-5)

#### 5.

What is the smallest number of colors that can be used to color the vertices of a cube so that no two adjacent vertices are colored identically?[🔗](#exercises_gt-coloring-6-1-1) [🔗](#exercises_gt-coloring-6)

#### 6.

Prove the chromatic number of any tree is two. Recall, a tree is a connected graph with no cycles.[🔗](#exercises_gt-coloring-7-1-1)

#### (a)

Consider the tree below. If you color the left-most vertex red, what should its neighbor be colored? What should the neighbors of the neighbor be colored? Describe a procedure to color the tree below using two colors.[🔗](#exercises_gt-coloring-7-2-1-1) ![A tree with 28 vertices.](generated/latex-image/img_big-tree.svg) [🔗](#exercises_gt-coloring-7-2)

#### (b)

If you used the same procedure to color a cycle, will you always be able to color it with two colors?[🔗](#exercises_gt-coloring-7-3-1-1) [🔗](#exercises_gt-coloring-7-3)

#### (c)

Prove that your procedure from part (a) always works for any tree.[🔗](#exercises_gt-coloring-7-4-1-1) Hint. Will you eventually color every vertex following the procedure? Will there ever be a vertex you cannot color according to the procedure?[🔗](#exercises_gt-coloring-7-4-2-1) [🔗](#exercises_gt-coloring-7-4-2) [🔗](#exercises_gt-coloring-7-4)

#### (d)

Now, give a different proof, this time using induction, that every tree has chromatic number 2.[🔗](#exercises_gt-coloring-7-5-1-1) [🔗](#exercises_gt-coloring-7-5)[🔗](#exercises_gt-coloring-7)

#### 7.

The two problems below can be solved using graph coloring. For each problem, represent the situation with a graph, say whether you should be coloring vertices or edges and why, and use the coloring to solve the problem.[🔗](#exercises_gt-coloring-8-3-1)

#### (a)

Your Quidditch league has 5 teams. You will play a tournament next week in which every team will play every other team once. Each team can play at most one match each day, but there is plenty of time in the day for multiple matches. What is the fewest number of days over which the tournament can take place?[🔗](#exercises_gt-coloring-8-4-1-1) Hint. You will want the teams to be vertices and games to be edges. Which does it make sense to color?[🔗](#exercises_gt-coloring-8-4-2-1) [🔗](#exercises_gt-coloring-8-4-2) [🔗](#exercises_gt-coloring-8-4)

#### (b)

Ten members of Math Club are driving to a math conference in a neighboring state. However, some of these students have dated in the past, and things are still a little awkward. Each student lists which other students they refuse to share a car with; these conflicts are recorded in the table below. What is the fewest number of cars the club needs to make the trip? Do not worry about running out of seats, just avoid the conflicts.[🔗](#exercises_gt-coloring-8-5-1-1)

| Student: | A | B | C | D | E | F | G | H | I | J |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Conflicts: | BEJ | ADG | HJ | BF | AI | DJ | B | CI | EHJ | ACFI |

[🔗](#exercises_gt-coloring-8-5)[🔗](#exercises_gt-coloring-8)

#### 8.

Prove the 6-color theorem: every planar graph has chromatic number 6 or less. Do not assume the 4-color theorem (whose proof is MUCH harder), but you may assume the fact that every planar graph contains a vertex of degree at most 5.[🔗](#exercises_gt-coloring-9-2-1) [🔗](#exercises_gt-coloring-9)

#### 9.

Not all graphs are perfect. Give an example of a graph with chromatic number 4 that does not contain a copy of \(K_4\text{.}\) That is, there should be no 4 vertices all pairwise adjacent.[🔗](#exercises_gt-coloring-10-3-1) [🔗](#exercises_gt-coloring-10)

#### 10.

Find the chromatic number of the graph below and prove you are correct.[🔗](#exercises_gt-coloring-11-1-1) ![A graph with 11 vertices. A single vertex in the center, then five vertices equally spaced around a ring around it, and five more equally spaced around a ring around those. Edges form the sides of a pentagon for the outer ring of vertices. Each outer vertex is also adjacent to two inner vertices: the two on either side of the vertex closest to it. Finally, every inner vertex is also adjacent to the center vertex.](generated/latex-image/img-grotzsch2.svg) Hint. The chromatic number is 4. Now prove this![🔗](#exercises_gt-coloring-11-2-1) Note that you cannot use the 4-color theorem, or Brooke’s theorem, or the clique number here. In fact, this graph, called the *Grötzsch graph*, is the smallest graph with chromatic number 4 that does not contain any triangles.[🔗](#exercises_gt-coloring-11-2-2) [🔗](#exercises_gt-coloring-11-2) [🔗](#exercises_gt-coloring-11)

#### 11.

Prove that any connected graph \(G\) which contains at least one vertex of degree less than \(\Delta(G)\) (the maximal degree of all vertices in \(G\)) has chromatic number at most \(\Delta(G)\text{.}\)[🔗](#exercises_gt-coloring-12-1-1) [🔗](#exercises_gt-coloring-12)

#### 12.

You have a set of magnetic alphabet letters (one of each of the 26 letters in the alphabet) that you need to put into boxes. For obvious reasons, you don’t want to put two consecutive letters in the same box. What is the fewest number of boxes you need (assuming the boxes are able to hold as many letters as they need to)?[🔗](#exercises_gt-coloring-13-1-1) [🔗](#exercises_gt-coloring-13)

#### 13.

Suppose you colored the edges of a graph either red or blue (not requiring that adjacent edges be colored differently). What must be true of the graph to guarantee some vertex is incident to three edges of the same color? Prove your answer.[🔗](#exercises_gt-coloring-14-1-1) Hint. You can color \(K_5\) in such a way that every vertex is adjacent to exactly two blue edges and two red edges. However, there is a graph with only 5 edges that will result in a vertex incident to three edges of the same color, no matter how they are colored. What is it, and how can you generalize?[🔗](#exercises_gt-coloring-14-2-1) [🔗](#exercises_gt-coloring-14-2) [🔗](#exercises_gt-coloring-14)

#### 14.

Prove that if you color every edge of \(K_6\) either red or blue, you are guaranteed a monochromatic triangle (that is, an all-red or an all-blue triangle).[🔗](#exercises_gt-coloring-15-1-1) Hint. The previous exercise is useful as a starting point.[🔗](#exercises_gt-coloring-15-2-1) [🔗](#exercises_gt-coloring-15-2) [🔗](#exercises_gt-coloring-15)[🔗](#exercises_gt-coloring)[🔗](#sec_coloring) [&#xe5cb;Prev](sec_gt-paths.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_gt-relations.html) [Feedback](/cdn-cgi/l/email-protection#58372b3b392a76343d2e3136182d363b37763d3c2d)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_coloring-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_coloring-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## Section 2.6 Relations and Graphs

### Objectives

After completing this section, you should be able to do the following.[🔗](#sec_gt-relations-2-1-1)

1. Explain the relationship between a graph and a relation.[🔗](#sec_gt-relations-2-2-1-1) [🔗](#sec_gt-relations-2-2-1)
2. Determine whether a relation is reflexive, symmetric, or transitive.[🔗](#sec_gt-relations-2-2-2-1) [🔗](#sec_gt-relations-2-2-2)
3. Use an equivalence relation to partition a set and use a partition to define an equivalence relation.[🔗](#sec_gt-relations-2-2-3-1) [🔗](#sec_gt-relations-2-2-3)

[🔗](#sec_gt-relations-2)

### Subsection Section Preview

#### Investigate!

Consider the three spinners below.[🔗](#gt-relations-section-previw-2-1-1) ![Three spinners](generated/latex-image/spinners.svg) If you and a friend each pick a different spinner and spin them, we can consider the nine possible outcomes. For example, between spinners \(A\) and \(B\text{,}\) the outcomes are \begin{equation*} (2,1), (2,6), (2,8), (4,1), (4,6), (4,8), (9,1), (9,6), (9,8)\text{.} \end{equation*} This suggests that spinner \(A\) will win five out of nine times. [🔗](#gt-relations-section-previw-2-1-3) Compare the other combinations of spinners. Which spinner is best?[🔗](#gt-relations-section-previw-2-1-4) [🔗](#gt-relations-section-previw-2)In this section, we will explore a generalization of a graph, called a relation. We will see how a relation can be represented by a graph and how a graph can be used to represent a relation. We will also consider some properties that a relation might have, and how these properties can be used to classify relations into different types.[🔗](#gt-relations-section-previw-3)

#### Worksheet Preview Activity[&#xe8ad;](?printpreview=PA-gt-relations)

In a given month, some days are more similar than others. For example, the 3rd of the month is more like the 24th than it is like the 15th. What does this possibly mean? We will explore two ways in which this is true.[🔗](#PA-gt-relations-2-1)

#### 1.

Activate We will say that two numbers between 1 and 31 are related, written \(a \sim b\) if their difference is a multiple of 7. So for example, \(3 \sim 24\text{,}\) since \(24-3 = 3\cdot 7\text{,}\) but \(3 \not\sim 15\) since \(15-3 = 12\) which is not a multiple of 7.[🔗](#extracted-webwork-67-1-1-1)

#### (a)

Which of the following are true? That is, which of the following pairs of numbers are related as we have defined above?[🔗](#extracted-webwork-67-1-2-1-1)

- \(\displaystyle 4\sim 14\)[🔗](#extracted-webwork-67-1-2-1-2-1-1-1) [🔗](#extracted-webwork-67-1-2-1-2-1-1)
- \(\displaystyle 7\sim 14\)[🔗](#extracted-webwork-67-1-2-1-2-1-2-1) [🔗](#extracted-webwork-67-1-2-1-2-1-2)
- \(\displaystyle 10 \sim 17\)[🔗](#extracted-webwork-67-1-2-1-2-1-3-1) [🔗](#extracted-webwork-67-1-2-1-2-1-3)
- \(\displaystyle 17\sim 24\)[🔗](#extracted-webwork-67-1-2-1-2-1-4-1) [🔗](#extracted-webwork-67-1-2-1-2-1-4)
- \(\displaystyle 10\sim 24\)[🔗](#extracted-webwork-67-1-2-1-2-1-5-1) [🔗](#extracted-webwork-67-1-2-1-2-1-5)
- \(\displaystyle 20 \sim 10\)[🔗](#extracted-webwork-67-1-2-1-2-1-6-1) [🔗](#extracted-webwork-67-1-2-1-2-1-6)
- \(\displaystyle 31 \sim 3\)[🔗](#extracted-webwork-67-1-2-1-2-1-7-1) [🔗](#extracted-webwork-67-1-2-1-2-1-7)
- \(\displaystyle 25 \sim 25\)[🔗](#extracted-webwork-67-1-2-1-2-1-8-1) [🔗](#extracted-webwork-67-1-2-1-2-1-8)

[🔗](#extracted-webwork-67-1-2-1-2) [🔗](#extracted-webwork-67-1-2)

#### (b)

Which of the following statements are true about the \(\sim\) relation in this case?[🔗](#extracted-webwork-67-1-3-1-1)

- \(a \sim a\) for every number \(a\)[🔗](#extracted-webwork-67-1-3-1-2-1-1-1) [🔗](#extracted-webwork-67-1-3-1-2-1-1)
- \(a \not\sim a\) for any number \(a\)[🔗](#extracted-webwork-67-1-3-1-2-1-2-1) [🔗](#extracted-webwork-67-1-3-1-2-1-2)
- For any numbers \(a\) and \(b\text{,}\) if \(a \sim b\text{,}\) then \(b \sim a\)[🔗](#extracted-webwork-67-1-3-1-2-1-3-1) [🔗](#extracted-webwork-67-1-3-1-2-1-3)
- For any numbers \(a\) and \(b\text{,}\) if \(a \sim b\) and \(b \sim a\text{,}\) then \(a = b\)[🔗](#extracted-webwork-67-1-3-1-2-1-4-1) [🔗](#extracted-webwork-67-1-3-1-2-1-4)
- For any numbers \(a\) and \(b\text{,}\) if \(a \sim b\) and \(b \sim c\text{,}\) then \(a \sim c\)[🔗](#extracted-webwork-67-1-3-1-2-1-5-1) [🔗](#extracted-webwork-67-1-3-1-2-1-5)

[🔗](#extracted-webwork-67-1-3-1-2) [🔗](#extracted-webwork-67-1-3)

#### (c)

We will write \([a]\) for the set of all numbers related to \(a\text{.}\) For example, \([7] = \{7, 14, 21, 28\}\text{.}\) Find each of the following:[🔗](#extracted-webwork-67-1-4-1-1)

- \([1] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-1-1) [🔗](#extracted-webwork-67-1-4-1-2-1-1)
- \([2] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-2-1) [🔗](#extracted-webwork-67-1-4-1-2-1-2)
- \([3] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-3-1) [🔗](#extracted-webwork-67-1-4-1-2-1-3)
- \([4] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-4-1) [🔗](#extracted-webwork-67-1-4-1-2-1-4)
- \([5] =\) ;[🔗](#extracted-webwork-67-1-4-1-2-1-5-1) [🔗](#extracted-webwork-67-1-4-1-2-1-5)
- \([6] =\) .[🔗](#extracted-webwork-67-1-4-1-2-1-6-1) [🔗](#extracted-webwork-67-1-4-1-2-1-6)

[🔗](#extracted-webwork-67-1-4-1-2) Are there any numbers that are in more than one of the sets \([a]\) above?

- Yes[🔗](#extracted-webwork-67-1-4-1-3-2-1-1) [🔗](#extracted-webwork-67-1-4-1-3-2-1)
- No[🔗](#extracted-webwork-67-1-4-1-3-2-2-1) [🔗](#extracted-webwork-67-1-4-1-3-2-2)

[🔗](#extracted-webwork-67-1-4-1-3) [🔗](#extracted-webwork-67-1-4) [🔗](#pa-gt-relations-1)

#### 2.

When you divide a multiple of 7 by 7, you get a whole number. If you divide another number by 7, you can either write the result as a decimal or as a quotient and a remainder. For example, \(19 \div 7\) is \(2\) with a remainder of 5, since we can write \(19 = 2\cdot 7 + 5\text{.}\) The remainder is also called the modulus. When programming in python (and many other languages), the modulus operator is written as `%`. For example, `19 % 7` is `5`. Try this out for a few numbers.[🔗](#pa-gt-relations-2-1-1) a = 19 print(a % 7) Activate

#### (a)

Find all the numbers \(a\) between 1 and 31 that are \(5 \mod 7\text{.}\) That is, find all \(a\) such that `a % 7 = 5`.[🔗](#extracted-webwork-68-1-1-1-1) [🔗](#extracted-webwork-68-1-1)

#### (b)

Since the modulus is a function, each number has exactly one modulus when divided by 7. This means that the moduli partition the numbers from 1 to 31: every number belongs to exactly one of the sets of numbers with a particular modulus. We have already found the set for modulus 5. Find the other sets.[🔗](#extracted-webwork-68-1-2-1-1)

- `a % 7 = 0`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-1-1) [🔗](#extracted-webwork-68-1-2-1-2-1-1)
- `a % 7 = 1`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-2-1) [🔗](#extracted-webwork-68-1-2-1-2-1-2)
- `a % 7 = 2`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-3-1) [🔗](#extracted-webwork-68-1-2-1-2-1-3)
- `a % 7 = 3`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-4-1) [🔗](#extracted-webwork-68-1-2-1-2-1-4)
- `a % 7 = 4`: ;[🔗](#extracted-webwork-68-1-2-1-2-1-5-1) [🔗](#extracted-webwork-68-1-2-1-2-1-5)
- `a % 7 = 6`: .[🔗](#extracted-webwork-68-1-2-1-2-1-6-1) [🔗](#extracted-webwork-68-1-2-1-2-1-6)

[🔗](#extracted-webwork-68-1-2-1-2) [🔗](#extracted-webwork-68-1-2)

#### (c)

We can use the moduli to define a relation on the numbers from 1 to 31. We will say that \(a \sim b\) if `a % 7 = b % 7`. In other words, two numbers are related if they belong to the same set of the partition we found above.[🔗](#extracted-webwork-68-1-3-1-1) Which of the following are true? That is, which of the following pairs of numbers are related by this modulus relation?[🔗](#extracted-webwork-68-1-3-1-2)

- \(\displaystyle 4\sim 14\)[🔗](#extracted-webwork-68-1-3-1-3-1-1-1) [🔗](#extracted-webwork-68-1-3-1-3-1-1)
- \(\displaystyle 7\sim 14\)[🔗](#extracted-webwork-68-1-3-1-3-1-2-1) [🔗](#extracted-webwork-68-1-3-1-3-1-2)
- \(\displaystyle 10 \sim 17\)[🔗](#extracted-webwork-68-1-3-1-3-1-3-1) [🔗](#extracted-webwork-68-1-3-1-3-1-3)
- \(\displaystyle 17\sim 24\)[🔗](#extracted-webwork-68-1-3-1-3-1-4-1) [🔗](#extracted-webwork-68-1-3-1-3-1-4)
- \(\displaystyle 10\sim 24\)[🔗](#extracted-webwork-68-1-3-1-3-1-5-1) [🔗](#extracted-webwork-68-1-3-1-3-1-5)
- \(\displaystyle 20 \sim 10\)[🔗](#extracted-webwork-68-1-3-1-3-1-6-1) [🔗](#extracted-webwork-68-1-3-1-3-1-6)
- \(\displaystyle 31 \sim 3\)[🔗](#extracted-webwork-68-1-3-1-3-1-7-1) [🔗](#extracted-webwork-68-1-3-1-3-1-7)
- \(\displaystyle 25 \sim 25\)[🔗](#extracted-webwork-68-1-3-1-3-1-8-1) [🔗](#extracted-webwork-68-1-3-1-3-1-8)

[🔗](#extracted-webwork-68-1-3-1-3) [🔗](#extracted-webwork-68-1-3) [🔗](#pa-gt-relations-2)[🔗](#PA-gt-relations)[🔗](#gt-relations-section-previw)

### Subsection Relations Generally

A graph is a way to represent some ways that different objects are related. We have seen how to use graphs to represent which people are friends, or which classes have time conflicts, or which radio stations are too close to have the same frequency. Not all ways in which things can be related can be represented by a graph, however. In this section, we will consider the more general concept of a relation and see how those might be related to graphs.[🔗](#subsec-relations-generally-2) Consider the example of the relation between students and classes that holds when a student is in that class (in a particular semester). This is a relation between two different sets (the students and the classes). If we used a graph to illustrate this relation, the graph would be *bipartite*, since two students are never related to each other, and two classes are never related to each other.[🔗](#subsec-relations-generally-3) A graph is really a set of vertices and a set of edges: \(G = (V, E)\text{;}\) each element of the set \(E\) is a two-element subset of \(V\text{.}\) If we want to draw attention to the bipartiteness of the graph, we can split up \(V\) into its two sets and write \(G = ((A, B), E)\text{.}\) In this notation, for the graph to be bipartite, we want each edge to be a pair \((a,b)\) where \(a\) is an element of \(A\) and \(b\) is an element of \(B\text{.}\) In other words, each edge is an element of the Cartesian product of \(A\) and \(B\text{,}\) written, \begin{equation*} A \times B = \{(a,b) \st a \in A,~b \in B\}. \end{equation*} (Another way to say this is that \(A \times B\) is “the set of all ordered pairs of elements from \(A\) and \(B\text{.}\)”) [🔗](#subsec-relations-generally-4)

#### Note 2.6.1.

There is one subtlety here we should point out: the bipartite graph we have described really has *directed edges* from \(A\) to \(B\) since we are considering *ordered* pairs. Our definition of a graph has edges as two-element *subsets* of vertices, and subsets are not ordered. As long as \(A\) and \(B\) are disjoint sets, there is no confusion here, but we see relations in which \(A\) and \(B\) share some elements, but we still care about the order. More on that soon.[🔗](#subsec-relations-generally-5-1) [🔗](#subsec-relations-generally-5)This example exactly illustrates what a general binary relation is. Here is the careful definition.[🔗](#subsec-relations-generally-6)

#### Definition 2.6.2.

A binary relation is a set of ordered pairs. We say the binary relation is a relation on sets \(A\) and \(B\) provided the ordered pairs are a subset of \(A \times B\text{.}\) We say a binary relation is a relation on a set \(A\) provided the ordered pairs are a subset of \(A \times A\text{.}\)[🔗](#def-binary-relation-1-1) [🔗](#def-binary-relation)Note that \(A \times A\) is just the set of all ordered pairs where both coordinates are elements from \(A\text{.}\)[🔗](#subsec-relations-generally-8)

#### Example 2.6.3.

Consider a set \(A\) of students and a set \(B\) of classes. Say \(A = \{\text{Al, Bob, Cat, Dirk, Eva}\}\) and \(B = \{\text{Calculus, Discrete, Statistics}\}\text{.}\) Everyone except Dirk is in Calculus, Bob and Eva are in Discrete, and Al, Cat, and Dirk are in Statistics.[🔗](#rel-in-class-1-1) We can define a relation \(T\) of “is taking” \(A\) and \(B\) that holds of a student and class precisely if that student is taking that class. Write this relation as a subset of \(A\times B\) and draw its bipartite graph.[🔗](#rel-in-class-1-2) Solution. To write the relation precisely, we just give the set of ordered pairs: \begin{align*} T = \{\amp (\text{Al}, \text{Calculus}), (\text{Al}, \text{Statistics}),\\ \amp (\text{Bob}, \text{Calculus}), (\text{Bob}, \text{Discrete})\\ \amp (\text{Cat}, \text{Calculus}), (\text{Cat}, \text{Statistics})\\ \amp (\text{Dirk}, \text{Statistics})\\ \amp (\text{Eva}, \text{Calculus}), (\text{Eva}, \text{Discrete})\} \end{align*} We can draw this relation as a bipartite graph: [🔗](#rel-in-class-2-1) ! [🔗](#rel-in-class-2) [🔗](#rel-in-class)

#### Example 2.6.4.

Consider the relation \(M\) for “is a multiple of” on the set \(A = \{1,2,3,4,5,6\}\text{.}\) Write this as a set of ordered pairs. Does this relation create a graph?[🔗](#rel-multiple-of-1-1) Solution. First, let’s think about which elements should be related and which should not. We know that \(6\) is a multiple of \(2\text{,}\) so the relation is true of the pair \((6,2)\text{,}\) but \(6\) is not a multiple of \(4\text{,}\) so the pair \((6,4)\) does not satisfy the relation. More precisely, we say that \((6,2) \in M\) but \((6,4) \notin M\text{.}\)[🔗](#rel-multiple-of-2-1) Let’s list all the elements of \(M\text{:}\) \begin{align*} M = \{\amp(1,1), (2,1), (2,2), (3,1), (3,3), (4,1), (4,2), (4,4), \\ \amp (5,1), (5,5), (6,1), (6,2) (6,3), (6,6)\}\text{.} \end{align*} This relation is not a graph for two reasons: first, elements are related to themselves, and second, the order of elements in the relation is not symmetric (\(6\) is related to \(2\text{,}\) but \(2\) is not related to \(6\text{,}\) for example). [🔗](#rel-multiple-of-2-2) We can, however, still draw something like a graph to illustrate this relation: Since the direction of the relation matters, we will have *directed* edges. This alone would create a directed graph. Since vertices can have edges going to themselves, we would call the structure a multigraph, so the relation can be thought of as a directed multigraph.[🔗](#rel-multiple-of-2-3) ! [🔗](#rel-multiple-of-2) [🔗](#rel-multiple-of)A binary relation \(R\) on sets \(A\) and \(B\) can always be “turned around” to give a relation on sets \(B\) and \(A\text{.}\) That is, \(R\) says how things in \(A\) are related to things in \(B\text{;}\) those things in \(B\) are related to things in \(A\text{,}\) just in an *inverse* (backward) way. We will call this new relation the inverse of \(R\text{.}\)[🔗](#subsec-relations-generally-11)

#### Definition 2.6.5.

Given a binary relation \(R\text{,}\) define \(R\inv\) to be the inverse of \(R\) as the set \begin{equation*} R\inv = \{(b,a) \st (a,b) \in R\}\text{.} \end{equation*} [🔗](#def-relation-inverse-1-1) [🔗](#def-relation-inverse)The relation \(T\) from [Example 2.6.3](sec_gt-relations.html#rel-in-class) said that a given student was in a particular class. The inverse relation \(T\inv\) says that a given class has a particular student in it. For example, \((\text{Calculus}, \text{Al})\) is an element of \(T\inv\text{.}\) Graphically, there won’t be any difference in the picture, although we could put the set of classes on top and students on bottom.[🔗](#subsec-relations-generally-13) The relation \(M\) from [Example 2.6.4](sec_gt-relations.html#rel-multiple-of) gave us that, for example, \(6\) is a multiple of \(2\text{,}\) since \((6,2) \in M\text{.}\) For the inverse, we have \((2,6) \in M\inv\text{,}\) which means that \(2\) is a factor of \(6\text{.}\) For this example, we have represented a relation as a directed multigraph. The graph of the inverse will look exactly the same, but all the arrows will point in the opposite direction.[🔗](#subsec-relations-generally-14) Another way to create a new relation is to combine two relations. Suppose in addition to the “is taking” relation from [Example 2.6.3](sec_gt-relations.html#rel-in-class), we define a relation “is taught by” that matches up each course with its instructor. Perhaps Professor X teaches Calculus. In that case, since Al is taking Calculus, and Calculus is taught by Professor X, we can conclude that Al is taking a class with Professor X.[🔗](#subsec-relations-generally-15)

#### Definition 2.6.6.

Let \(R\) be a relation from set \(A\) to \(B\) and \(S\) be a relation from \(B\) to \(C\text{.}\) The composition of \(R\) and \(S\) is \begin{equation*} S \circ R = \{(a,c) \in A \times C \st (a,b) \in R \text{ and } (b,c) \in S \text{ for some } b \in B\} \end{equation*} [🔗](#def-relation-composition-1-1) [🔗](#def-relation-composition)Note the order in which we wrote the two relations: it’s \(S \circ R\text{,}\) not \(R \circ S\text{.}\) The reason we do this (which might seem backward) is that it agrees with the usual notation for composition of *functions*. In fact, functions are nothing but a specific type of relation![🔗](#subsec-relations-generally-17)

#### Example 2.6.7.

Write out the relation \(P \circ T\text{,}\) composing the relations of [Example 2.6.3](sec_gt-relations.html#rel-in-class) and \(P = \{(\text{Calculus}, \text{Prof X}), (\text{Discrete}, \text{Prof L}), (\text{Statistics}, \text{Prof X}), (\text{Statistics}, \text{Prof S})\} \text{.}\) Note that here we are saying the statistic course is co-taught by professors X and S.[🔗](#subsec-relations-generally-18-1-1) Solution. The relation we are looking for is a relation between students and professors. We can start with each element of \(T\) and *extend* it by following the course to the professor(s) via \(P\text{.}\) So for example, start with Cat, and notice that \((\text{Cat}, \text{Calculus}) \in T\text{.}\) Now look at what Calculus is related to via \(P\text{:}\) \((\text{Calculus}, \text{Prof X}) \in P \text{.}\) Thus we can push these together to conclude that \((\text{Cat}, \text{Prof X}) \in P \circ T\text{.}\)[🔗](#subsec-relations-generally-18-2-1) An alternative approach would be to simply consider which pairs of students and professors are linked by a common class. Should the pair \((\text{Al}, \text{Prof L})\) be an element of the composition? No, because there is no class that is both taken by Al and taught by Professor L. On the other hand, we can conclude the \((\text{Al}, \text{Prof X}) \in P \circ T\) since there is a common course. In fact, the common course could be Calculus or Statistics (it doesn’t matter how many common middle steps there are, as long as there is at least one).[🔗](#subsec-relations-generally-18-2-2) Here is the complete relation: \begin{align*} P \circ T = \{\amp (\text{Al}, \text{Prof X}), (\text{Al}, \text{Prof S}), (\text{Bob}, \text{Prof X}), (\text{Bob}, \text{Prof L}), \\ \amp (\text{Cat}, \text{Prof X}), (\text{Cat}, \text{Prof S}), (\text{Dirk}, \text{Prof X}), (\text{Dirk}, \text{Prof S}),\\ \amp (\text{Eva}, \text{Prof X}), (\text{Eva}, \text{Prof L})\} \end{align*} [🔗](#subsec-relations-generally-18-2-3) [🔗](#subsec-relations-generally-18-2) [🔗](#subsec-relations-generally-18)Something interesting often happens when you compose a relation with its inverse. You might have seen something like this for *functions* in calculus or algebra: \(f(x) = e^x\) has an inverse function \(f\inv(x) = \ln(x)\text{,}\) and we know that \(f(f\inv(x)) = e^{\ln(x)} = x\text{.}\) But functions are relations in which every “input” has exactly one “output”, so perhaps it is not surprising that composing with an inverse just gives you the identity function. When inputs can have multiple outputs, and outputs can have multiple inputs, then we get something more.[🔗](#subsec-relations-generally-19)

#### Example 2.6.8.

Describe the relation \(T\inv \circ T\) (using our familiar relation \(T\) from [Example 2.6.3](sec_gt-relations.html#rel-in-class)). What does this tell us about students and classes?[🔗](#subsec-relations-generally-20-1-1) Solution. By following the relation, we could start by saying Al is in Calculus, and Calculus is taken by Al, so Al is related to Al. But also , Calculus is taken by Bob, so now Al is also related to Bob. Is Bob related to Al as well? Yes, since Bob is taking Calculus and Calculus is taken by Al.[🔗](#subsec-relations-generally-20-2-1) The composition is telling us which pairs of students have at least one class in common. That’s almost all pairs of students, except that Dirk is not related to Bob or Eva, since they don’t take Statistics, and that is the only class he takes.[🔗](#subsec-relations-generally-20-2-2) Instead of writing out the relation (which will almost be all of \(A \times A\)), here is the graph representation.[🔗](#subsec-relations-generally-20-2-3) ![The graph representing the composition of T and its inverse.](generated/latex-image/inv-relation.svg) While we drew a directed multigraph here, the arrows going both ways mean that we really could have drawn just a multigraph.[🔗](#subsec-relations-generally-20-2-5) [🔗](#subsec-relations-generally-20-2) [🔗](#subsec-relations-generally-20)[🔗](#subsec-relations-generally)

### Subsection Properties of Relations

From this point on, we will just consider relations on a single set (so from a set to itself). To help understand these relations, let’s consider some basic properties a relation might or might not have.[🔗](#subsec-properties-of-relations-2)

#### Definition 2.6.9. Reflexive, Symmetric, and Transitive.

Let \(R\) be a relation on the set \(A\text{.}\) We say,

- \(R\) is reflexive provided \((a,a) \in R\) for all \(a \in A\text{.}\)[🔗](#def-relation-properties-2-1-3-1-1) [🔗](#def-relation-properties-2-1-3-1)
- \(R\) is symmetric provided, for all \(a, b \in A\text{,}\) if \((a,b) \in R\) then \((b,a) \in R\text{.}\)[🔗](#def-relation-properties-2-1-3-2-1) [🔗](#def-relation-properties-2-1-3-2)
- \(R\) is transitive provided, for all \(a, b,c \in A\text{,}\) if \((a,b) \in R\) and \((b,c) \in R\text{,}\) then \((a,c)\in R\text{.}\)[🔗](#def-relation-properties-2-1-3-3-1) [🔗](#def-relation-properties-2-1-3-3)

[🔗](#def-relation-properties-2-1) [🔗](#def-relation-properties)Let’s examine each of these properties carefully.[🔗](#subsec-properties-of-relations-4) It will be helpful to consider a few standard examples of relations on sets as we go. Most relations we consider here will be written using *infix* notation, just meaning that we put the relation symbol between the two things it is relating. For example, the *less than* relation is almost always written as \(2 \lt 6\) rather than writing \((2,6) \in \lt\text{.}\)[🔗](#subsec-properties-of-relations-5)

#### Example 2.6.10. Reflexive and non-reflexive relations.

A relation is reflexive when every element is related to itself. The following are reflexive relations:

- The “less-than-or-equal-to” relation on any set of numbers. Is it the case that \(3 \le 3\text{?}\) More importantly, is every number no greater than itself? Since the answer is yes, this relation is reflexive.[🔗](#subsec-properties-of-relations-6-2-1-1-1) [🔗](#subsec-properties-of-relations-6-2-1-1)
- The “within 3” relation, that holds of two numbers \(a\) and \(b\) provided \(|a-b| \le 3\text{.}\) To prove that this is reflexive, we simply note that \(|a-a| = 0 \le 3\text{.}\)[🔗](#subsec-properties-of-relations-6-2-1-2-1) [🔗](#subsec-properties-of-relations-6-2-1-2)
- The “is a multiple of” relation from [Example 2.6.4](sec_gt-relations.html#rel-multiple-of). Note that the directed multigraph for this relation had loops at every vertex.[🔗](#subsec-properties-of-relations-6-2-1-3-1) [🔗](#subsec-properties-of-relations-6-2-1-3)

[🔗](#subsec-properties-of-relations-6-2) However, these relations are not reflexive:

- The “sums to zero” relation, that holds on numbers \(a\) and \(b\) if \(a+b = 0\text{.}\) Note that while \(0 + 0 = 0\text{,}\) so \((0,0)\) is an element of the relation, every other number is not related to itself.[🔗](#subsec-properties-of-relations-6-3-1-1-1) [🔗](#subsec-properties-of-relations-6-3-1-1)
- Any relation that is described by a graph. Remember, graphs cannot have edges looping back to a single vertex, so the edge relation on a graph is not reflexive. (A multigraph could be reflexive or not).[🔗](#subsec-properties-of-relations-6-3-1-2-1) [🔗](#subsec-properties-of-relations-6-3-1-2)

[🔗](#subsec-properties-of-relations-6-3) [🔗](#subsec-properties-of-relations-6)If no element is related to itself (such as in the edge relation for a graph), then we call the relation irreflexive. Of course, some relations are neither reflexive nor irreflexive.[🔗](#subsec-properties-of-relations-7) Checking that a relation is reflexive is relatively easy. The other two properties are phrased as implications, which makes them a little more complex.[🔗](#subsec-properties-of-relations-8)

#### Example 2.6.11. Symmetric and non-symmetric relations.

Essentially, symmetric relations are the ones that work “both ways.” More precisely, if \(a\) is related to \(b\text{,}\) then \(b\) is also related to \(a\text{.}\)[🔗](#subsec-properties-of-relations-9-2) The following relations are symmetric.

- The “within 3” relation: if \(|a-b| \le 3\) then \(|b-a| \le 3\text{.}\)[🔗](#subsec-properties-of-relations-9-3-1-1-1) [🔗](#subsec-properties-of-relations-9-3-1-1)
- The “sums to zero” relation: if \(a+b = 0\text{,}\) then certainly \(b + a = 0\text{.}\)[🔗](#subsec-properties-of-relations-9-3-1-2-1) [🔗](#subsec-properties-of-relations-9-3-1-2)
- For any graph, the edge relation is symmetric. Of course, for *directed* graphs this is usually not true.[🔗](#subsec-properties-of-relations-9-3-1-3-1) [🔗](#subsec-properties-of-relations-9-3-1-3)

[🔗](#subsec-properties-of-relations-9-3) On the other hand, these relations are not symmetric.

- \(\le\) is not symmetric. All we need to do to prove that a relation is not symmetric is to find some \(a\) and \(b\) such that \(a \le b\) but \(b \not\le a\text{.}\) Well, \(3 \le 4\text{,}\) but \(4 \not\le 3\text{.}\) QED.[🔗](#subsec-properties-of-relations-9-4-1-1-1) [🔗](#subsec-properties-of-relations-9-4-1-1)
- The “is a multiple of” relation is not symmetric. \(6\) is a multiple of \(2\) but \(2\) is not a multiple of \(6\text{.}\)[🔗](#subsec-properties-of-relations-9-4-1-2-1) [🔗](#subsec-properties-of-relations-9-4-1-2)

[🔗](#subsec-properties-of-relations-9-4) [🔗](#subsec-properties-of-relations-9)Relations that are not symmetric could in fact be antisymmetric, meaning the *only* elements for which both \((a,b)\) and \((b,a)\) are in the relation is when \(a = b\text{.}\) Note that there are relations that are neither symmetric nor antisymmetric.[🔗](#subsec-properties-of-relations-10) Using the language of inverse relations, a relation is symmetric if and only if the relation is equal to its inverse.[🔗](#subsec-properties-of-relations-11)

#### Example 2.6.12. Transitive and non-transitive relations.

If \(a\) is related to \(b\text{,}\) and \(b\) is related to \(c\text{,}\) does that mean \(a\) is related to \(c\text{?}\) If this is true no matter what \(a\text{,}\) \(b\text{,}\) and \(c\) are, then we say the relation is transitive.[🔗](#subsec-properties-of-relations-12-2) Here are some transitive relations.

- \(\le\text{.}\) Suppose \(a \le b\) and \(b \le c\text{.}\) Then clearly \(a \le c\text{.}\)[🔗](#subsec-properties-of-relations-12-3-1-1-1) [🔗](#subsec-properties-of-relations-12-3-1-1)
- The “is a multiple of” relation. This is a good one to write a proof for: Suppose \(a\) is a multiple of \(b\) and that \(b\) is a multiple of \(c\text{.}\) Then \(a = bk\) for some integer \(k\) and \(b = cj\) for some integer \(j\text{.}\) By substitution, \(a = cjk\text{,}\) so \(a\) is a multiple of \(c\text{.}\)[🔗](#subsec-properties-of-relations-12-3-1-2-1) [🔗](#subsec-properties-of-relations-12-3-1-2)

[🔗](#subsec-properties-of-relations-12-3) However, the following relations are not transitive.

- The “within 3” relation is not transitive. All we need to do is find three numbers that fail to meet the condition. How about \(1\text{,}\) \(3\text{,}\) and \(5\text{?}\) Here \(1\) is within 3 of \(3\text{,}\) and \(3\) is within 3 of \(5\text{,}\) but \(|1 - 5| = 4\) so the relation does not hold of \((1,5)\text{.}\)[🔗](#subsec-properties-of-relations-12-4-1-1-1) [🔗](#subsec-properties-of-relations-12-4-1-1)
- The “sums to zero” relation is not transitive. Notice that we never claimed that \(a\text{,}\) \(b\text{,}\) and \(c\) need to be different numbers. Let \(a = 5\text{,}\) \(b = -5\text{,}\) and \(c = 5\text{.}\) Then \(a+b = 0\) and \(b + c = 0\text{,}\) so the relation holds of \((a,b)\) and \((b,c)\text{.}\) But \(a + c = 10\) so the relation does not hold of \((a,c)\text{.}\)[🔗](#subsec-properties-of-relations-12-4-1-2-1) [🔗](#subsec-properties-of-relations-12-4-1-2)

[🔗](#subsec-properties-of-relations-12-4) The edge relation for a graph might or might not be transitive. What would a graph look like if its edge relation was transitive?[🔗](#subsec-properties-of-relations-12-5) [🔗](#subsec-properties-of-relations-12)[🔗](#subsec-properties-of-relations)

### Subsection Equivalence Relations

Now we will do something very typical for mathematics: We will look at our most common types of relations, consider what properties these have, and then classify other relations that also have these properties as a specific class of relations.[🔗](#subsec_equivalence-relations-2) The relation we are all most familiar with is equality. Which properties of relations does the equality relation possess? Certainly everything is equal to itself, so equality is *reflexive*. If \(a = b\text{,}\) then \(b = a\text{,}\) so equality is *symmetric*. If \(a = b\) and \(b = c\text{,}\) then \(a = c\text{,}\) so equality is *transitive*.[🔗](#subsec_equivalence-relations-3) What other relations are *reflexive*, *symmetric*, and *transitive*? Exactly those relations that behave like equality. We call such relations equivalence relations.[🔗](#subsec_equivalence-relations-4)

#### Definition 2.6.13. Equivalence Relation.

A relation that is reflexive, symmetric, and transitive is called an equivalence relation.[🔗](#def-equivalence-relation-2-1) [🔗](#def-equivalence-relation)

#### Remark 2.6.14.

Another example of a type of relation that is modeled after a classic relation is a partial order. This is a relation that is reflexive, *antisymmetric*, and transitive, just like less-than-or-equal-to. Perhaps you noticed already that the subset relation, written \(\subseteq\text{,}\) feels a lot like \(\le\text{.}\) This is because \(\subseteq\) is also a partial order. So is the “is a multiple of” relation we saw above.[🔗](#subsec_equivalence-relations-6-1) There are lots of interesting things we can say about partial orders and the sets they partially order, called partially ordered sets or PoSets. Another time.[🔗](#subsec_equivalence-relations-6-2) [🔗](#subsec_equivalence-relations-6)None of the examples we have considered so far in this section have been equivalence relations, but they are ubiquitous in mathematics. They are so common that it is easy to overlook them as anything worth saying something about at all. Let’s see some examples.[🔗](#subsec_equivalence-relations-7)

#### Example 2.6.15.

Prove that the relation \(\equiv_2\text{,}\) which holds of two integers if their difference is even, is an equivalence relation. That is, \(a \equiv_2 b\) if and only if \(b-a = 2k\) for some integer \(k\text{.}\)[🔗](#eg_cong-mod-2-1-1) Solution. We simply check the three required properties.

1. \(\equiv_2\) is reflexive: for any integer \(a\text{,}\) we have \(a - a = 0\) and \(0 = 2k\) for \(k = 0\text{,}\) so \(a \equiv_2 a\text{.}\)[🔗](#eg_cong-mod-2-2-1-1-1-1) [🔗](#eg_cong-mod-2-2-1-1-1)
2. \(\equiv_2\) is symmetric: Fix arbitrary integers \(a\) and \(b\text{,}\) and assume \(a \equiv_2 b\text{.}\) That means that \(b-a = 2k\) for some integer \(k\text{.}\) What about \(a - b\text{?}\) Well, we will have \(a-b = 2(-k)\text{,}\) and \(-k\) is an integer, so we have \(b \equiv_2 a\text{.}\)[🔗](#eg_cong-mod-2-2-1-1-2-1) [🔗](#eg_cong-mod-2-2-1-1-2)
3. \(\equiv_2\) is transitive: Fix arbitrary integers \(a\text{,}\) \(b\text{,}\) and \(c\) and assume \(a \equiv_2 b\) and \(b \equiv_2 c\text{.}\) This means that \(b-a = 2k\) and \(c-b = 2j\) for some integers \(k\) and \(j\text{.}\) What about \(c - a\text{?}\) Well, \begin{equation*} c - a = (c- b) + (b - a) = 2k+2j = 2(k+j)\text{.} \end{equation*} Since \(k+j\) is an integer, we see that \(a \equiv_2 c\) as required. [🔗](#eg_cong-mod-2-2-1-1-3-1) [🔗](#eg_cong-mod-2-2-1-1-3)

[🔗](#eg_cong-mod-2-2-1) [🔗](#eg_cong-mod-2-2) [🔗](#eg_cong-mod-2)

#### Example 2.6.16.

Let’s call two graphs “degree-sequence-equivalent” if they have the same degree sequence. Is this an equivalence relation?[🔗](#subsec_equivalence-relations-9-1-1) Solution. Yes it is. Clearly every graph has the same degree sequence as itself, so the relation is reflexive. If \(G_1\) has the same degree sequence as \(G_2\text{,}\) then \(G_2\) has the same degree sequence as \(G_1\text{,}\) so the relation is transitive. Finally, if \(G_1\) has the same degree sequence as \(G_2\text{,}\) which has the same degree sequence as \(G_3\text{,}\) then they all have the same degree sequence, so \(G_1\) has the same degree sequence as \(G_3\) (i.e., the relation is transitive).[🔗](#subsec_equivalence-relations-9-2-1) [🔗](#subsec_equivalence-relations-9-2) [🔗](#subsec_equivalence-relations-9)This example is almost too obvious. That’s because we said that two things are related if a well-defined property of those things was *equal*, and equality satisfies the properties of an equivalence relation. Our next goal is to try to make better sense of this and see that it is exactly what gives us an equivalence relation.[🔗](#subsec_equivalence-relations-10) [🔗](#subsec_equivalence-relations)

### Subsection Equivalence Classes and Partitions

Given *any* relation \(R\text{,}\) we can look at the *set* of elements that are related to a particular element. For the “is taking” relation, we can ask what classes Al is taking (i.e., the classes related to Al). For the “is a multiple of”, we can ask which numbers 6 a multiple of. One way to study the relation is to study the sets of things related to each element.[🔗](#subsec-equivalence-classes-and-partitions-2)

#### Definition 2.6.17.

Let \(R\) be a relation on the set \(A\text{,}\) and let \(a\) be an element of \(A\text{.}\) The relation class of \(a\text{,}\) written \([a]\) is the set of all elements \(b\) such that \((a,b) \in R\) (the set of \(b\) that are related to \(a\) by \(R\)). That is, \begin{equation*} [a] = \{b \in A \st (a,b) \in R\}\text{.} \end{equation*} [🔗](#def-relation-classes-1-1) When \(R\) is an equivalence relation, we call relation classes equivalence classes.[🔗](#def-relation-classes-1-2) [🔗](#def-relation-classes)

#### Example 2.6.18.

Find the relation classes for the “is a multiple of” relation on the set \(A = \{1,2,3,4,5,6\}\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-4-1-1) Solution. There will be six relation classes since each element has a relation class. They are: \begin{align*} [1] = \amp \{1\}\\ [2] = \amp \{1,2\}\\ [3] = \amp \{1,3\}\\ [4] = \amp \{1,2,4\}\\ [5] = \amp \{1,5\}\\ [6] = \amp \{1,2,3,6\}. \end{align*} For example, we found \([4]\) by considering all pairs \((4,b)\) that satisfied the relation: 4 is a multiple of 1, 2, and 4, so those are the possible values of \(b\) that we find. [🔗](#subsec-equivalence-classes-and-partitions-4-2-1) Look back at the directed multigraph for this relation shown in the solution to [Example 2.6.4](sec_gt-relations.html#rel-multiple-of). What are the relation classes? They are nothing but the neighbors of each vertex (where neighbor means you follow the arrows in the correct direction).[🔗](#subsec-equivalence-classes-and-partitions-4-2-2) [🔗](#subsec-equivalence-classes-and-partitions-4-2) [🔗](#subsec-equivalence-classes-and-partitions-4)

#### Example 2.6.19.

Find the equivalence classes for the \(\equiv_2\) relation on the integers.[🔗](#subsec-equivalence-classes-and-partitions-5-1-1) Solution. On no! Our set is infinite, so we will have infinitely many relation classes? Well, we better get started...[🔗](#subsec-equivalence-classes-and-partitions-5-2-1) What numbers are related to 1? Remember, we want integers whose difference with 1 is a multiple of 2. So 3 for sure. Also 5, and 7, and -1, and -3, and... all the odds? Yes, because the difference of any two odd numbers is even. We can also say that the difference between any two even numbers is even, so the equivalence class of 2 will contain all the even numbers. So far we have: \begin{align*} [1] = \amp \{\ldots, -3, -1, 1, 3, 5, \ldots\}\\ [2] = \amp \{\ldots, -4, -2, 2, 4, 6, \ldots\} \end{align*} [🔗](#subsec-equivalence-classes-and-partitions-5-2-2) Actually, I think we are done. While \([3]\text{,}\) \([4]\text{,}\) \([5]\text{,}\) and so on are all completely valid equivalence classes, the elements that are related to \(3\) will be exactly the elements related to \(1\text{,}\) since \(1 \equiv_2 3\text{.}\) This is because the relation is transitive! If \(3 \equiv_2 b\text{,}\) then we know \(1 \equiv_2 b\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-5-2-3) So we have exactly two equivalence classes. Every integer is in exactly one of these two equivalence classes, and the equivalence class of any integer is exactly the class it belongs to.[🔗](#subsec-equivalence-classes-and-partitions-5-2-4) [🔗](#subsec-equivalence-classes-and-partitions-5-2) [🔗](#subsec-equivalence-classes-and-partitions-5)Examine the two examples above carefully. For the “is a multiple of” relation, which is NOT an equivalence relation, some elements belong to more than one (different) relation class. But for \(\equiv_2\text{,}\) which is an equivalence relation, every element is in exactly one equivalence class. This is no accident. To make sense of this, we will define a new term.[🔗](#subsec-equivalence-classes-and-partitions-6)

#### Definition 2.6.20.

Given a non-empty set \(A\text{,}\) a partition of \(A\) is a set \(P\) of non-empty subsets of \(A\) such that every element of \(A\) is in exactly one element of \(P\text{.}\)[🔗](#def-partition-1-1) [🔗](#def-partition)That definition has a lot of symbols and sets involved. It’s really not complicated though: A partition is a way to break up a set into *disjoint* subsets that *cover* the whole set. That the subsets are disjoint means no element is in *more than one* subset. That the subsets cover the set means every element is in *at least one* subset.[🔗](#subsec-equivalence-classes-and-partitions-8)

#### Example 2.6.21.

Give a few different partitions of the set \(A = \{1,2,3,4,5\}\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-9-1-1) Solution. There are so many choices here! One choice is: \begin{equation*} P_1 = \{\{1,2,3\}, \{4,5\}\}\text{.} \end{equation*} That’s a partition of \(A\) into two subsets. Another partition: \begin{equation*} P_2 = \{\{1\}, \{2\}, \{3\}, \{4\}, \{5\}\}\text{.} \end{equation*} Another: \begin{equation*} P_3 = \{\{1,3,5\}, \{2,4\}\}\text{,} \end{equation*} which happens to be a partition into even and odd numbers. We also have the trivial partition: \begin{equation*} P_4 = \{\{1,2,3,4,5\}\}\text{.} \end{equation*} Note: that is a single set inside the set \(P_4\text{.}\) [🔗](#subsec-equivalence-classes-and-partitions-9-2-1) [🔗](#subsec-equivalence-classes-and-partitions-9-2) [🔗](#subsec-equivalence-classes-and-partitions-9)It is sometimes a little confusing to think of the elements of a partition as subsets since the partition is a set, and a set of sets can be difficult to talk about. We sometimes call the partition a *collection* and each of the elements of the partition *parts* or *blocks*.[🔗](#subsec-equivalence-classes-and-partitions-10) Now the big idea: For any equivalence relation, the equivalence classes form a partition, and for any partition, we can define a relation “are in the same subset” which will be an equivalence relation. We have already seen that the equivalence classes of \(\equiv_2\) form a partition. Let’s go the other direction.[🔗](#subsec-equivalence-classes-and-partitions-11)

#### Example 2.6.22.

Define an equivalence relation \(\sim\) on the set \(A = \{1,2,3,4,5\}\) from the partition \(P = \{\{1,4\}, \{2,3,5\}\}\text{.}\)[🔗](#subsec-equivalence-classes-and-partitions-12-1-1) Solution. Say two elements of \(A\) are equivalent provided they belong to the same element of \(P\text{.}\) That is, \(1 \sim 4\) and \(4\sim 1\text{,}\) and \(2 \sim 3\text{,}\) \(2 \sim 5\text{,}\) \(3 \sim 5\text{,}\) \(3\sim 2\text{,}\) \(5\sim 2\text{,}\) and \(5\sim 3\text{.}\) Wait. We also have \(1\sim 1\text{,}\) \(2\sim 2\text{,}\) and so on, since every number is in the same subset as itself.[🔗](#subsec-equivalence-classes-and-partitions-12-2-1) It is clear from looking that this relation is reflexive, symmetric, and transitive, so is an equivalence relation.[🔗](#subsec-equivalence-classes-and-partitions-12-2-2) [🔗](#subsec-equivalence-classes-and-partitions-12-2) [🔗](#subsec-equivalence-classes-and-partitions-12)

#### Theorem 2.6.23.

Given any equivalence relation \(R\) on a set \(A\text{,}\) the equivalence classes form a partition of \(A\text{.}\)[🔗](#thm-equivalence-partition-1-1) Given any partition \(P = \{B_1, B_2, \ldots, \}\) of a set \(A\text{,}\) the relation \(\equiv_P\) defined by \(a \equiv_P b\) if and only if \(a\) and \(b\) belong to the same block of \(P\text{,}\) is an equivalence relation.[🔗](#thm-equivalence-partition-1-2) Further, the equivalence classes for the equivalence relation formed by a partition are exactly the original partition, and the equivalence relation built by the partition of its equivalence classes is exactly the original equivalence relation.[🔗](#thm-equivalence-partition-1-3) [🔗](#thm-equivalence-partition)[🔗](#subsec-equivalence-classes-and-partitions)

### Reading Questions Reading Questions

#### 1.

Consider the relation \(R\) defined on the integers that holds of \(a\) and \(b\) precisely if \(b-a \ge 4\text{.}\) So for example, \((2,7) \in R\) but \((8,6) \notin R\text{.}\) Which of the following properties of relations does \(R\) have?[🔗](#rq-gt-rel-prop-1-1)

- \(R\) is reflexive.
- If \(R\) were reflexive, then then in particular (2,2) would be in \(R\text{.}\) But \(2-2 = 0\text{,}\) which is not greater than or equal to 4.
- \(R\) is irreflexive.
- Correct. Since no integer is four or more greater than itself, the relation does not hold of any element with itself.
- \(R\) is symmetric.
- If \(R\) were symmetric, then for any \(a\) and \(b\) such that \(b-a \ge 4\text{,}\) we would also have \(a-b \ge 4\text{.}\) But this is not true. For example, \((2,10)\) is in \(R\) but \((10,2)\) is not. (We are not using the *absolute* difference.)
- \(R\) is antisymmetric.
- Correct. There are no numbers \(a\) and \(b\) such that both \(b-a \ge 4\) and \(a-b \ge 4\text{,}\) so the hypothesis of the definition of antisemetric is always false, making the entire statement in the definition true.
- \(R\) is transitive.
- Correct. If \(b-a \ge 4\) and \(c-b \ge 4\text{,}\) then \(c-a = (c-b) + (b-a) \ge 4+4 = 8\text{,}\) so \(c-a \ge 4\text{.}\)

[🔗](#rq-gt-rel-prop)

#### 2.

Not all graphs have a transitive edge relation. But do some of them? If so, give an example and explain why it is transitive. If not, explain why.[🔗](#rq-gt-rel-transgraph-1-1) [🔗](#rq-gt-rel-transgraph)

#### 3.

After reading this section, what questions do you have? Ask at least one question about this section that you are curious about.[🔗](#rq-gt-rel-q-1-1) [🔗](#rq-gt-rel-q)[🔗](#rqs-gt-relations)

### Exercises Practice Problems

#### 1.

Activate Determine which of these relations are reflexive. The variables \(x\text{,}\) \(y\text{,}\) \(x'\text{,}\) \(y'\) represent integers.[🔗](#extracted-webwork-69-1-1-1)

- \(x \sim y\) if and only if \(x + y\) is odd.[🔗](#extracted-webwork-69-1-1-2-1-1-1) [🔗](#extracted-webwork-69-1-1-2-1-1)
- \(x \sim y\) if and only if \(x - y\) is positive.[🔗](#extracted-webwork-69-1-1-2-1-2-1) [🔗](#extracted-webwork-69-1-1-2-1-2)
- \(x \sim y\) if and only if \(xy \geq 0\) .[🔗](#extracted-webwork-69-1-1-2-1-3-1) [🔗](#extracted-webwork-69-1-1-2-1-3)
- \(x \sim y\) if and only if \(x + y\) is even.[🔗](#extracted-webwork-69-1-1-2-1-4-1) [🔗](#extracted-webwork-69-1-1-2-1-4)
- \(x \sim y\) if and only if \(x + y\) is positive.[🔗](#extracted-webwork-69-1-1-2-1-5-1) [🔗](#extracted-webwork-69-1-1-2-1-5)

[🔗](#extracted-webwork-69-1-1-2) [🔗](#ww-gt-relations-reflexive)

#### 2.

Activate Determine which of these relations are symmetric. The variables \(x\text{,}\) \(y\text{,}\) \(x'\text{,}\) \(y'\) represent integers.[🔗](#extracted-webwork-70-1-1-1)

- \(x \sim y\) if and only if \(x = |y|\text{.}\)[🔗](#extracted-webwork-70-1-1-2-1-1-1) [🔗](#extracted-webwork-70-1-1-2-1-1)
- \(x \sim y\) if and only if \(x + y\) is odd.[🔗](#extracted-webwork-70-1-1-2-1-2-1) [🔗](#extracted-webwork-70-1-1-2-1-2)
- \(x \sim y\) if and only if \(xy\) is positive.[🔗](#extracted-webwork-70-1-1-2-1-3-1) [🔗](#extracted-webwork-70-1-1-2-1-3)
- \(x \sim y\) if and only if \(x +2y\) is positive.[🔗](#extracted-webwork-70-1-1-2-1-4-1) [🔗](#extracted-webwork-70-1-1-2-1-4)
- \(x \sim y\) if and only if \(xy\) is negative.[🔗](#extracted-webwork-70-1-1-2-1-5-1) [🔗](#extracted-webwork-70-1-1-2-1-5)

[🔗](#extracted-webwork-70-1-1-2) [🔗](#ww-gt-relations-symmetric)

#### 3.

Activate Determine which of these relations are transitive. The variables \(x\text{,}\) \(y\text{,}\) \(x'\text{,}\) \(y'\) represent integers.[🔗](#extracted-webwork-71-1-1-1)

- \(x \sim y\) if and only if \(x + y\) is positive.[🔗](#extracted-webwork-71-1-1-2-1-1-1) [🔗](#extracted-webwork-71-1-1-2-1-1)
- \(x \sim y\) if and only if \(x + y\) is positive.[🔗](#extracted-webwork-71-1-1-2-1-2-1) [🔗](#extracted-webwork-71-1-1-2-1-2)
- \(x \sim y\) if and only if \(x + y\) is even.[🔗](#extracted-webwork-71-1-1-2-1-3-1) [🔗](#extracted-webwork-71-1-1-2-1-3)
- \(x \sim y\) if and only if \(x - y\) is negative.[🔗](#extracted-webwork-71-1-1-2-1-4-1) [🔗](#extracted-webwork-71-1-1-2-1-4)
- \((x,y) \sim (x',y')\) if and only if \(x+ y' = x' + y\text{.}\)[🔗](#extracted-webwork-71-1-1-2-1-5-1) [🔗](#extracted-webwork-71-1-1-2-1-5)
- \(x \sim y\) if and only if \(xy \geq 0\) .[🔗](#extracted-webwork-71-1-1-2-1-6-1) [🔗](#extracted-webwork-71-1-1-2-1-6)

[🔗](#extracted-webwork-71-1-1-2) [🔗](#ww-gt-relations-transitive)

#### 4.

Activate Define relations \(R_1,\ldots,R_6\) on \({ 1,2,3,4 }\) by[🔗](#extracted-webwork-72-1-1-1) \(R_1=\lbrace (2,2),(2,3),(2,4),(3,2),(3,3),(3,4) \rbrace,\)[🔗](#extracted-webwork-72-1-1-2) \(R_2 = \lbrace (1,1),(1,2),(2,1),(2,2),(3,3),(4,4)\rbrace,\)[🔗](#extracted-webwork-72-1-1-3) \(R_3 = \lbrace (2,4),(4,2) \rbrace\) ,[🔗](#extracted-webwork-72-1-1-4) \(R_4 = \lbrace (1,2),(2,3),(3,4)\rbrace\text{,}\)[🔗](#extracted-webwork-72-1-1-5) \(R_5 = \lbrace (1,1),(2,2),(3,3),(4,4)\rbrace,\)[🔗](#extracted-webwork-72-1-1-6) \(R_6=\lbrace (1,3),(1,4),(2,3),(2,4),(3,1),(3,4) \rbrace,\)[🔗](#extracted-webwork-72-1-1-7) Which of the following statements are correct?[🔗](#extracted-webwork-72-1-1-8) Check ALL correct answers below.[🔗](#extracted-webwork-72-1-1-9)

- \(R_4\) is transitive[🔗](#extracted-webwork-72-1-1-10-1-1-1) [🔗](#extracted-webwork-72-1-1-10-1-1)
- \(R_1\) is reflexive[🔗](#extracted-webwork-72-1-1-10-1-2-1) [🔗](#extracted-webwork-72-1-1-10-1-2)
- \(R_3\) is reflexive[🔗](#extracted-webwork-72-1-1-10-1-3-1) [🔗](#extracted-webwork-72-1-1-10-1-3)
- \(R_4\) is symmetric[🔗](#extracted-webwork-72-1-1-10-1-4-1) [🔗](#extracted-webwork-72-1-1-10-1-4)
- \(R_6\) is symmetric[🔗](#extracted-webwork-72-1-1-10-1-5-1) [🔗](#extracted-webwork-72-1-1-10-1-5)
- \(R_4\) is antisymmetric[🔗](#extracted-webwork-72-1-1-10-1-6-1) [🔗](#extracted-webwork-72-1-1-10-1-6)
- \(R_1\) is not symmetric[🔗](#extracted-webwork-72-1-1-10-1-7-1) [🔗](#extracted-webwork-72-1-1-10-1-7)
- \(R_2\) is reflexive[🔗](#extracted-webwork-72-1-1-10-1-8-1) [🔗](#extracted-webwork-72-1-1-10-1-8)
- \(R_3\) is transitive[🔗](#extracted-webwork-72-1-1-10-1-9-1) [🔗](#extracted-webwork-72-1-1-10-1-9)
- \(R_3\) is symmetric[🔗](#extracted-webwork-72-1-1-10-1-10-1) [🔗](#extracted-webwork-72-1-1-10-1-10)
- \(R_5\) is transitive[🔗](#extracted-webwork-72-1-1-10-1-11-1) [🔗](#extracted-webwork-72-1-1-10-1-11)
- \(R_2\) is not transitive[🔗](#extracted-webwork-72-1-1-10-1-12-1) [🔗](#extracted-webwork-72-1-1-10-1-12)
- \(R_5\) is not reflexive[🔗](#extracted-webwork-72-1-1-10-1-13-1) [🔗](#extracted-webwork-72-1-1-10-1-13)

[🔗](#extracted-webwork-72-1-1-10) [🔗](#ww-gt-relations-pairs)

#### 5.

Activate Given the following relations on the set of all people. Check ALL correct answers from the following lists:[🔗](#extracted-webwork-73-1-1-1) (a) \(a\) is older than \(b\)[🔗](#extracted-webwork-73-1-1-2)

- reflexive[🔗](#extracted-webwork-73-1-1-3-1-1-1) [🔗](#extracted-webwork-73-1-1-3-1-1)
- transitive[🔗](#extracted-webwork-73-1-1-3-1-2-1) [🔗](#extracted-webwork-73-1-1-3-1-2)
- antisymmetric[🔗](#extracted-webwork-73-1-1-3-1-3-1) [🔗](#extracted-webwork-73-1-1-3-1-3)
- symmetric[🔗](#extracted-webwork-73-1-1-3-1-4-1) [🔗](#extracted-webwork-73-1-1-3-1-4)
- irreflexive[🔗](#extracted-webwork-73-1-1-3-1-5-1) [🔗](#extracted-webwork-73-1-1-3-1-5)

[🔗](#extracted-webwork-73-1-1-3) (b) \(a\) and \(b\) have a common grandparent[🔗](#extracted-webwork-73-1-1-4)

- irreflexive[🔗](#extracted-webwork-73-1-1-5-1-1-1) [🔗](#extracted-webwork-73-1-1-5-1-1)
- transitive[🔗](#extracted-webwork-73-1-1-5-1-2-1) [🔗](#extracted-webwork-73-1-1-5-1-2)
- symmetric[🔗](#extracted-webwork-73-1-1-5-1-3-1) [🔗](#extracted-webwork-73-1-1-5-1-3)
- reflexive[🔗](#extracted-webwork-73-1-1-5-1-4-1) [🔗](#extracted-webwork-73-1-1-5-1-4)
- antisymmetric[🔗](#extracted-webwork-73-1-1-5-1-5-1) [🔗](#extracted-webwork-73-1-1-5-1-5)

[🔗](#extracted-webwork-73-1-1-5) (c) \(a\) has the same first name as \(b\)[🔗](#extracted-webwork-73-1-1-6)

- irreflexive[🔗](#extracted-webwork-73-1-1-7-1-1-1) [🔗](#extracted-webwork-73-1-1-7-1-1)
- transitive[🔗](#extracted-webwork-73-1-1-7-1-2-1) [🔗](#extracted-webwork-73-1-1-7-1-2)
- antisymmetric[🔗](#extracted-webwork-73-1-1-7-1-3-1) [🔗](#extracted-webwork-73-1-1-7-1-3)
- symmetric[🔗](#extracted-webwork-73-1-1-7-1-4-1) [🔗](#extracted-webwork-73-1-1-7-1-4)
- reflexive[🔗](#extracted-webwork-73-1-1-7-1-5-1) [🔗](#extracted-webwork-73-1-1-7-1-5)

[🔗](#extracted-webwork-73-1-1-7) (d) \(a\) and \(b\) were born on the same day[🔗](#extracted-webwork-73-1-1-8)

- transitive[🔗](#extracted-webwork-73-1-1-9-1-1-1) [🔗](#extracted-webwork-73-1-1-9-1-1)
- antisymmetric[🔗](#extracted-webwork-73-1-1-9-1-2-1) [🔗](#extracted-webwork-73-1-1-9-1-2)
- irreflexive[🔗](#extracted-webwork-73-1-1-9-1-3-1) [🔗](#extracted-webwork-73-1-1-9-1-3)
- symmetric[🔗](#extracted-webwork-73-1-1-9-1-4-1) [🔗](#extracted-webwork-73-1-1-9-1-4)
- reflexive[🔗](#extracted-webwork-73-1-1-9-1-5-1) [🔗](#extracted-webwork-73-1-1-9-1-5)

[🔗](#extracted-webwork-73-1-1-9) [🔗](#ww-gt-relations-tree)

#### 6.

Activate Given the following relations on the set of all integers where \((x,y) \in R\) if and only if the following is satisfied. (Check ALL correct answers from the following lists ):[🔗](#extracted-webwork-74-1-1-1) (a) \(x+y = 0\)[🔗](#extracted-webwork-74-1-1-2)

- reflexive[🔗](#extracted-webwork-74-1-1-3-1-1-1) [🔗](#extracted-webwork-74-1-1-3-1-1)
- irreflexive[🔗](#extracted-webwork-74-1-1-3-1-2-1) [🔗](#extracted-webwork-74-1-1-3-1-2)
- transitive[🔗](#extracted-webwork-74-1-1-3-1-3-1) [🔗](#extracted-webwork-74-1-1-3-1-3)
- antisymmetric[🔗](#extracted-webwork-74-1-1-3-1-4-1) [🔗](#extracted-webwork-74-1-1-3-1-4)
- symmetric[🔗](#extracted-webwork-74-1-1-3-1-5-1) [🔗](#extracted-webwork-74-1-1-3-1-5)

[🔗](#extracted-webwork-74-1-1-3) (b) \(x - y\) is an integer[🔗](#extracted-webwork-74-1-1-4)

- irreflexive[🔗](#extracted-webwork-74-1-1-5-1-1-1) [🔗](#extracted-webwork-74-1-1-5-1-1)
- reflexive[🔗](#extracted-webwork-74-1-1-5-1-2-1) [🔗](#extracted-webwork-74-1-1-5-1-2)
- symmetric[🔗](#extracted-webwork-74-1-1-5-1-3-1) [🔗](#extracted-webwork-74-1-1-5-1-3)
- antisymmetric[🔗](#extracted-webwork-74-1-1-5-1-4-1) [🔗](#extracted-webwork-74-1-1-5-1-4)
- transitive[🔗](#extracted-webwork-74-1-1-5-1-5-1) [🔗](#extracted-webwork-74-1-1-5-1-5)

[🔗](#extracted-webwork-74-1-1-5) (c) \(x=2y\)[🔗](#extracted-webwork-74-1-1-6)

- irreflexive[🔗](#extracted-webwork-74-1-1-7-1-1-1) [🔗](#extracted-webwork-74-1-1-7-1-1)
- symmetric[🔗](#extracted-webwork-74-1-1-7-1-2-1) [🔗](#extracted-webwork-74-1-1-7-1-2)
- reflexive[🔗](#extracted-webwork-74-1-1-7-1-3-1) [🔗](#extracted-webwork-74-1-1-7-1-3)
- transitive[🔗](#extracted-webwork-74-1-1-7-1-4-1) [🔗](#extracted-webwork-74-1-1-7-1-4)
- antisymmetric[🔗](#extracted-webwork-74-1-1-7-1-5-1) [🔗](#extracted-webwork-74-1-1-7-1-5)

[🔗](#extracted-webwork-74-1-1-7) (d) \(xy > 1\)[🔗](#extracted-webwork-74-1-1-8)

- irreflexive[🔗](#extracted-webwork-74-1-1-9-1-1-1) [🔗](#extracted-webwork-74-1-1-9-1-1)
- antisymmetric[🔗](#extracted-webwork-74-1-1-9-1-2-1) [🔗](#extracted-webwork-74-1-1-9-1-2)
- reflexive[🔗](#extracted-webwork-74-1-1-9-1-3-1) [🔗](#extracted-webwork-74-1-1-9-1-3)
- symmetric[🔗](#extracted-webwork-74-1-1-9-1-4-1) [🔗](#extracted-webwork-74-1-1-9-1-4)
- transitive[🔗](#extracted-webwork-74-1-1-9-1-5-1) [🔗](#extracted-webwork-74-1-1-9-1-5)

[🔗](#extracted-webwork-74-1-1-9) [🔗](#ww-gt-relations-algebraic)[🔗](#practice_gt-relations)

### Exercises Additional Exercises

#### 1.

Consider the relation \(\gt\) on the set \(\{1,2,\ldots,8\}\text{.}\)[🔗](#exercises_gt-relations-2-1-1)

#### (a)

Draw the directed graph of the relation \(\gt\text{.}\)[🔗](#exercises_gt-relations-2-2-1-1) [🔗](#exercises_gt-relations-2-2)

#### (b)

Draw the directed graph for the inverse relation \(\gt\inv\text{.}\)[🔗](#exercises_gt-relations-2-3-1-1) [🔗](#exercises_gt-relations-2-3)

#### (c)

Is the inverse relation of \(\gt\) the same as the relation \(\le\text{?}\) Explain.[🔗](#exercises_gt-relations-2-4-1-1) [🔗](#exercises_gt-relations-2-4)[🔗](#exercises_gt-relations-2)

#### 2.

True or false: for any relation \(R\) on a set \(A\text{,}\) the relation \(R\inv\) is symmetric if and only if \(R\) is symmetric. Justify your answer.[🔗](#exercises_gt-relations-3-1-1) [🔗](#exercises_gt-relations-3)

#### 3.

True or false: for any relation \(R\) on a set \(A\text{,}\) the composition of \(R\) with its inverse, \(R\circ R\inv\text{,}\) is always reflexive. Justify your answer.[🔗](#exercises_gt-relations-4-1-1) [🔗](#exercises_gt-relations-4)

#### 4.

Find, if possible, an example of a relation on the set \(\{1,2,3,4\}\) that is reflexive and symmetric, but not transitive. If such a relation exists, draw the directed multigraph of the relation and list the ordered pairs that define it. Explain your answers.[🔗](#exercises_gt-relations-5-1-1) [🔗](#exercises_gt-relations-5)

#### 5.

Find, if possible, an example of a relation on the set \(\{1,2,3,4\}\) that is reflexive and transitive, but not symmetric. If such a relation exists, draw the directed multigraph of the relation and list the ordered pairs that define it. Explain your answers.[🔗](#exercises_gt-relations-6-1-1) [🔗](#exercises_gt-relations-6)

#### 6.

Find, if possible, an example of a relation on the set \(\{1,2,3,4\}\) that is symmetric and transitive, but not reflexive. If such a relation exists, draw the directed multigraph of the relation and list the ordered pairs that define it. Explain your answers.[🔗](#exercises_gt-relations-7-1-1) [🔗](#exercises_gt-relations-7)

#### 7.

What is wrong with the following argument that any relation that is symmetric and transitive must be reflexive?[🔗](#exercises_gt-relations-8-1-1)

> Suppose \(R\) is a relation on a set \(A\) that is symmetric and transitive. Since \(R\) is symmetric, if \(aRb\text{,}\) then \(bRa\) holds. Since \(R\) is transitive, if \(aRb\) and \(bRa\text{,}\) then \(aRb\) holds. Since this is true for all elements \(a\text{,}\) we have that \(aRa\) is true for all \(a\) in \(A\text{,}\) so \(R\) is reflexive.[🔗](#exercises_gt-relations-8-1-2-1)
> > [🔗](#exercises_gt-relations-8-1-2)

[🔗](#exercises_gt-relations-8)

#### 8.

Suppose \(R\) is an equivalence relation on the set \(A = \{1,2,\ldots,6\}\text{.}\) What could the directed multigraph for \(R\) look like? Give at least two different examples of such \(R\) and their graphs to illustrate your answer.[🔗](#exercises_gt-relations-9-1-1) [🔗](#exercises_gt-relations-9)

#### 9.

Consider the relation \(R\) on the set \(A = \{1,2,3,4,5\}\) defined by \(R = \{(1,2), (2,3), (3,4), (4,5), (5,1), (2,1), (3,1), (4,1), (5,1)\}\text{.}\) Is \(R\) an equivalence relation? Justify your answer.[🔗](#exercises_gt-relations-10-1-1) Regardless of your answer, what do the relation classes \([a]\) for \(a \in R\) look like? Can you tell whether \(R\) is an equivalence relation from this information?[🔗](#exercises_gt-relations-10-1-2) [🔗](#exercises_gt-relations-10)

#### 10.

Consider the “loner” relation on a set of students that describes friendships, and holds *only* between a student and themselves (i.e., nobody is friends with anyone other than themselves). Is this an equivalence relation? Justify your answer. If it is an equivalence relation, what do the equivalence classes look like?[🔗](#exercises_gt-relations-11-1-1) [🔗](#exercises_gt-relations-11)[🔗](#exercises_gt-relations)[🔗](#sec_gt-relations) [&#xe5cb;Prev](sec_coloring.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_matchings.html) [Feedback](/cdn-cgi/l/email-protection#b7d8c4d4d6c599dbd2c1ded9f7c2d9d4d899d2d3c2)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_gt-relations-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_gt-relations-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

\Does the graph below contain a matching? If so, find one.[🔗](#sec_matchings-6-2) ![A bipartite graph with 12 vertices, in two sets of six. If we call the top vertices a0 through a5, and the bottom vertices b0 to b5 (left to right), then the graph has the following edges: (a0,b0), (a0,b1), (a0,b5), (a1,b0), (a1,b3), (a2,b1), (a2,b2), (a2,b3), (a3,b0), (a3,b5), (a4,b2), (a4,b3), (a4,b4), (a4,b5), (a5,b4).](generated/latex-image/sec_matchings-6-3.svg) Not all bipartite graphs have matchings. Draw as many fundamentally different examples of bipartite graphs that do NOT have matchings. Your goal is to find all the possible obstructions to a graph having a perfect matching. Write down the *necessary* conditions for a graph to have a matching (that is, fill in the blank: If a graph has a matching, then ). Then ask yourself whether these conditions are sufficient (is it true that if , then the graph has a matching?).[🔗](#sec_matchings-6-4) [🔗](#sec_matchings-6)We conclude with one more example of a graph theory problem to illustrate the variety and vastness of the subject.[🔗](#sec_matchings-7) Suppose you have a bipartite graph \(G\text{.}\) This will consist of two sets of vertices \(A\) and \(B\) with some edges connecting some vertices of \(A\) to some vertices in \(B\) (but of course, no edges between two vertices both in \(A\) or both in \(B\)). A matching of \(A\) is a subset of the edges for which each vertex of \(A\) belongs to exactly one edge of the subset, and no vertex in \(B\) belongs to more than one edge in the subset. In practice, we will assume that \(|A| = |B|\) (the two sets have the same number of vertices), so this says that every vertex in the graph belongs to exactly one edge in the matching. 11 What we are calling a *matching* is sometimes called a *perfect matching* or *complete matching*. This is because it is interesting to look at non-perfect matchings as well. We will call those *partial* matchings.[🔗](#sec_matchings-8) Some context might make this easier to understand. Think of the vertices in \(A\) as representing students in a class, and the vertices in \(B\) as representing presentation topics. We put an edge from a vertex \(a \in A\) to a vertex \(b \in B\) if student \(a\) would like to present on topic \(b\text{.}\) Of course, some students would want to present on more than one topic, so their vertex would have degree greater than 1. As the teacher, you want to assign each student their own unique topic. Thus you want to find a matching of \(A\text{:}\) you pick some subset of the edges so that each student gets matched up with exactly one topic, and no topic gets matched to two students. 12 The standard example for matchings used to be the *marriage problem* in which \(A\) consisted of the men in the town, \(B\) the women, and an edge represented a marriage that was agreeable to both parties. A matching then represented a way for the town elders to marry off everyone in the town, no polygamy allowed. We have chosen a more progressive context for the sake of political correctness.[🔗](#sec_matchings-9) The question is: when does a bipartite graph contain a matching of \(A\text{?}\) To begin to answer this question, consider what could prevent the graph from containing a matching. This will not necessarily tell us a condition when the graph *does* have a matching, but at least it is a start.[🔗](#sec_matchings-10) One way \(G\) could not have a matching is if there is a vertex in \(A\) not adjacent to any vertex in \(B\) (so having degree 0). What else? What if two students both like the same topic, and no others? Then after assigning that one topic to the first student, there is nothing left for the second student to like, so it is very much as if the second student has degree 0. Or what if three students like only two topics between them? Again, after assigning one student a topic, we reduce this to the previous case of two students liking only one topic. We can continue this way with more and more students. [🔗](#sec_matchings-11) It should be clear at this point that if there is a group of \(n\) students who as a group like \(n-1\) or fewer topics, then no matching is possible. This is true for any value of \(n\text{,}\) and any group of \(n\) students.[🔗](#sec_matchings-12) To make this more graph-theoretic, say you have a set \(S \subseteq A\) of vertices. Define \(N(S)\) to be the set of all the neighbors of vertices in \(S\text{.}\) That is, \(N(S)\) contains all the vertices (in \(B\)) that are adjacent to at least one of the vertices in \(S\text{.}\) (In the student/topic graph, \(N(S)\) is the set of topics liked by the students of \(S\text{.}\)) Our discussion above can be summarized as follows:[🔗](#sec_matchings-13)

### Matching Condition.

If a bipartite graph \(G = \{A, B\}\) has a matching of \(A\text{,}\) then \begin{equation*} |N(S)| \ge |S| \end{equation*} for all \(S \subseteq A\text{.}\) [🔗](#sec_matchings-14-6) [🔗](#sec_matchings-14)Is the converse true? Suppose \(G\) satisfies the matching condition \(|N(S)| \ge |S|\) for all \(S \subseteq A\) (every set of vertices has at least as many neighbors as vertices in the set). Does that mean that there is a matching? Surprisingly, yes. The obvious necessary condition is also sufficient. 13 This happens often in graph theory. If you can avoid the obvious counterexamples, you often get what you want. This is a theorem first proved by Philip Hall in 1935. 14 There is also an infinite version of the theorem, which was proved by Marshal Hall, Jr. The name is a coincidence though as the two Halls are not related.[🔗](#sec_matchings-15)

### Theorem 2.7.1. Hall’s Marriage Theorem.

Let \(G\) be a bipartite graph with sets \(A\) and \(B\text{.}\) Then \(G\) has a matching of \(A\) if and only if \begin{equation*} |N(S)| \ge |S| \end{equation*} for all \(S \subseteq A\text{.}\) [🔗](#sec_matchings-16-7-1) [🔗](#sec_matchings-16)There are quite a few different proofs of this theorem – a quick internet search will get you started.[🔗](#sec_matchings-17) In addition to its application to marriage and student presentation topics, matchings have applications all over the place. We conclude with one such example.[🔗](#sec_matchings-18)

### Example 2.7.2.

Suppose you deal 52 regular playing cards into 13 piles of 4 cards each. Prove that you can always select one card from each pile to get one of each of the 13 card values Ace, 2, 3, …, 10, Jack, Queen, and King.[🔗](#sec_matchings-19-1-1) Solution. Doing this directly would be difficult, but we can use the matching condition to help. Construct a graph \(G\) with 13 vertices in the set \(A\text{,}\) each representing one of the 13 card values, and 13 vertices in the set \(B\text{,}\) each representing one of the 13 piles. Draw an edge between a vertex \(a \in A\) to a vertex \(b \in B\) if a card with value \(a\) is in the pile \(b\text{.}\) Notice that we are just looking for a matching of \(A\text{;}\) each value needs to be found in the piles exactly once.[🔗](#sec_matchings-19-2-1) We will have a matching if the matching condition holds. Given any set of card values (a set \(S \subseteq A\)), we must show that \(|N(S)| \ge |S|\text{.}\) That is, the number of piles that contain those values is at least the number of different values. But what if it wasn’t? Say \(|S| = k\text{.}\) If \(|N(S)| \lt k\text{,}\) then we would have fewer than \(4k\) different cards in those piles (since each pile contains 4 cards). But there are \(4k\) cards with the \(k\) different values, so at least one of these cards must be in another pile, a contradiction. Thus the matching condition holds, so there is a matching, as required.[🔗](#sec_matchings-19-2-2) [🔗](#sec_matchings-19-2) [🔗](#sec_matchings-19)

### Exercises Exercises

#### 1.

Find a matching of the bipartite graphs below or explain why no matching exists.[🔗](#exercises_gt-matchings-1-1-1) ![A bipartite graph with six vertices, in two sets of three. If we call the top vertices a,b,c, and the bottom vertices 1, 2, 3 (left to right), then the graph has the following edges: (a,1), (a,2), (b,1), (b,3), (c,1), (c,3).](generated/latex-image/graph-bipartite33.svg) ![A bipartite graph with eight vertices, in two sets of four. If we call the top vertices a,b,c,d and the bottom vertices 1, 2, 3,4 (left to right), then the graph has the following edges: (a,1), (a,3), (a,4) (b,2), (c,1), (c,2), (c,3), (c,4), (d,2).](generated/latex-image/graph-bipartite44.svg) ![A bipartite graph with ten vertices, in two sets of five. If we call the top vertices a,b,c,d,e and the bottom vertices 1, 2, 3,4,5 (left to right), then the graph has the following edges: (a,1), (a,2), (a,3), (b,1), (b,3), (c,2), (c,4), (d,3), (d,5), (e,3), (e,4), (e,5).](generated/latex-image/graph-bipartite55.svg) [🔗](#exercises_gt-matchings-1)

#### 2.

A bipartite graph that doesn’t have a matching might still have a partial matching. By this we mean a set of *edges* for which no vertex belongs to more than one edge (but possibly belongs to none). Every bipartite graph (with at least one edge) has a partial matching, so we can look for the largest partial matching in a graph.[🔗](#exercises_gt-matchings-2-3-1) Your “friend” claims that she has found the largest partial matching for the graph below (her matching is in bold). She explains that no other edge can be added, because all the edges not used in her partial matching are connected to matched vertices. Is she correct?[🔗](#exercises_gt-matchings-2-3-2) ![A bipartite graph with ten vertices in two sets of five. Call the top vertices a, b, c, d, e and the bottom vertices 1, 2, 3, 4, 5. Then the graph has the following edges: a-1, a-3, b-1, b-2, c-1, c-2, c-4, d-5, e-4, and e-5. Of these, the edges a-1, b-2, c-4, and e-5 are highlighted bold](generated/latex-image/exercises_gt-matchings-2-3-3.svg) [🔗](#exercises_gt-matchings-2)

#### 3.

One way you might check to see whether a partial matching is maximal is to construct an alternating path. This is a sequence of adjacent edges, which alternate between edges in the matching and edges not in the matching (no edge can be used more than once). If an alternating path starts and stops with an edge *not* in the matching, then it is called an augmenting path.

1. Find the largest possible alternating path for the partial matching of your friend’s graph. Is it an augmenting path? How would this help you find a larger matching?[🔗](#exercises_gt-matchings-3-5-1-4-1-1) ![A bipartite graph with ten vertices in two sets of five. Call the top vertices a, b, c, d, e and the bottom vertices 1, 2, 3, 4, 5. Then the graph has the following edges: a-1, a-3, b-1, b-2, c-1, c-2, c-4, d-5, e-4, and e-5. Of these, the edges a-1, b-2, c-4, and e-5 are highlighted bold.](generated/latex-image/exercises_gt-matchings-3-5-1-4-1-2.svg) [🔗](#exercises_gt-matchings-3-5-1-4-1)
2. Find the largest possible alternating path for the partial matching below. Are there any augmenting paths? Is the partial matching the largest one that exists in the graph?[🔗](#exercises_gt-matchings-3-5-1-4-2-1) ![A bipartite graph with 12 vertices in two sets of six. Call the top vertices a to f and the bottom vertices 1 to 6. Then the graph has the following edges: a-2, a-3, b-1, b-3, c-1, c-2, c-4, c-5, d-3, d-5, e-3, e-4, e-5, e-6, f-5 and f-6. Of these, the edges a-3, b-1, c-2, e-4, and f-5 are highlighted bold.](generated/latex-image/exercises_gt-matchings-3-5-1-4-2-2.svg) [🔗](#exercises_gt-matchings-3-5-1-4-2)

[🔗](#exercises_gt-matchings-3-5-1) [🔗](#exercises_gt-matchings-3)

#### 4.

The two richest families in Westeros have decided to enter into an alliance by marriage. The first family has 10 sons, the second has 10 girls. The ages of the kids in the two families match up. To avoid impropriety, the families insist that each child must marry someone either their own age, or someone one position younger or older. In fact, the graph representing agreeable marriages looks like this:[🔗](#exercises_gt-matchings-4-1-1) ![A bipartite graph with 20 vertices in two sets of ten. Each vertex in the top row is adjacent to the vertices directly below it and those vertices below and one position left or right of it.](generated/latex-image/exercises_gt-matchings-4-1-2.svg) The question: how many different acceptable marriage arrangements which marry off all 20 children are possible?

1. How many marriage arrangements are possible if we insist that there are exactly 6 boys who marry girls not their own age?[🔗](#exercises_gt-matchings-4-1-3-1-1-1) [🔗](#exercises_gt-matchings-4-1-3-1-1)
2. Could you generalize the previous answer to arrive at the total number of marriage arrangements?[🔗](#exercises_gt-matchings-4-1-3-1-2-1) [🔗](#exercises_gt-matchings-4-1-3-1-2)
3. How do you know you are correct? Try counting in a different way. Look at smaller family sizes and get a sequence.[🔗](#exercises_gt-matchings-4-1-3-1-3-1) [🔗](#exercises_gt-matchings-4-1-3-1-3)
4. Can you give a recurrence relation that fits the problem?[🔗](#exercises_gt-matchings-4-1-3-1-4-1) [🔗](#exercises_gt-matchings-4-1-3-1-4)

[🔗](#exercises_gt-matchings-4-1-3) [🔗](#exercises_gt-matchings-4)

#### 5.

We say that a set of vertices \(A \subseteq V\) is a vertex cover if every edge of the graph is incident to a vertex in the cover (so a vertex cover covers the *edges*). Since \(V\) itself is a vertex cover, every graph has a vertex cover. The interesting question is about finding a minimal vertex cover, one that uses the fewest possible number of vertices.

1. Suppose you had a matching of a graph. How can you use that to get a minimal vertex cover? Will your method always work? [🔗](#exercises_gt-matchings-5-3-1-6-1)
2. Suppose you had a minimal vertex cover for a graph. How can you use that to get a partial matching? Will your method always work? [🔗](#exercises_gt-matchings-5-3-1-6-2)
3. What is the relationship between the size of the minimal vertex cover and the size of the maximal partial matching in a graph? [🔗](#exercises_gt-matchings-5-3-1-6-3)

[🔗](#exercises_gt-matchings-5-3-1) [🔗](#exercises_gt-matchings-5)

#### 6.

For many applications of matchings, it makes sense to use bipartite graphs. You might wonder, however, whether there is a way to find matchings in graphs in general.

1. For which \(n\) does the complete graph \(K_n\) have a matching? [🔗](#exercises_gt-matchings-6-1-1-1-1)
2. Prove that if a graph has a matching, then \(\card{V}\) is even. [🔗](#exercises_gt-matchings-6-1-1-1-2)
3. Is the converse true? That is, do all graphs with \(\card{V}\) even have a matching? [🔗](#exercises_gt-matchings-6-1-1-1-3)
4. What if we also require the matching condition? Prove or disprove: If a graph with an even number of vertices satisfies \(\card{N(S)} \ge \card{S}\) for all \(S \subseteq V\text{,}\) then the graph has a matching. [🔗](#exercises_gt-matchings-6-1-1-1-4)

[🔗](#exercises_gt-matchings-6-1-1) [🔗](#exercises_gt-matchings-6)[🔗](#exercises_gt-matchings)[🔗](#sec_matchings) [&#xe5cb;Prev](sec_gt-relations.html)[&#xe5ce;Top](#)[Next&#xe5cc;](sec_gt-conc.html) [Feedback](/cdn-cgi/l/email-protection#afc0dccccedd81c3cad9c6c1efdac1ccc081cacbda)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_matchings-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_matchings-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');

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
