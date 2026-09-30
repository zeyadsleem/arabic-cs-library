---
title: "Problems and Definitions"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_gt-intro.html
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
