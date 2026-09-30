---
title: "Trees"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_trees.html
---

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
