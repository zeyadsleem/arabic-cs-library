---
title: "Coloring"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_coloring.html
---

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
