---
title: "Planar Graphs"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_gt-planar.html
---

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
