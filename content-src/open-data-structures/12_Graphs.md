---
title: "12. Graphs"
lang: en
---

In this chapter, we study two representations of graphs and basic algorithms that use these representations. Mathematically, a (directed) graph is a pair $$ G=(V,E)$$ where $$ V$$ is a set of vertices and $$ E$$ is a set of ordered pairs of vertices called edges. An edge $$ \mathtt{(i,j)}$$ is directed from $$ \mathtt{i}$$ to $$ \mathtt{j}$$ ; $$ \mathtt{i}$$ is called the source of the edge and $$ \mathtt{j}$$ is called the target. A path in $$ G$$ is a sequence of vertices $$ v_0,\ldots,v_k$$ such that, for every $$ i\in\{1,\ldots,k\}$$ , the edge $$ (v_{i-1},v_{i})$$ is in $$ E$$ . A path $$ v_0,\ldots,v_k$$ is a cycle if, additionally, the edge $$ (v_k,v_0)$$ is in $$ E$$ . A path (or cycle) is simple if all of its vertices are unique. If there is a path from some vertex $$ v_i$$ to some vertex $$ v_j$$ then we say that $$ v_j$$ is reachable from $$ v_i$$ . An example of a graph is shown in Figure 12.1.

Due to their ability to model so many phenomena, graphs have an enormous number of applications. There are many obvious examples. Computer networks can be modelled as graphs, with vertices corresponding to computers and edges corresponding to (directed) communication links between those computers. City streets can be modelled as graphs, with vertices representing intersections and edges representing streets joining consecutive intersections. Less obvious examples occur as soon as we realize that graphs can model any pairwise relationships within a set. For example, in a university setting we might have a timetable conflict graph whose vertices represent courses offered in the university and in which the edge $$ \mathtt{(i,j)}$$ is present if and only if there is at least one student that is taking both class $$ \mathtt{i}$$ and class $$ \mathtt{j}$$ . Thus, an edge indicates that the exam for class $$ \mathtt{i}$$ should not be scheduled at the same time as the exam for class $$ \mathtt{j}$$ . Throughout this section, we will use $$ \mathtt{n}$$ to denote the number of vertices of $$ G$$ and $$ \mathtt{m}$$ to denote the number of edges of $$ G$$ . That is, $$ \ensuremath{\mathtt{n}}=\vert V\vert$$ and $$ \ensuremath{\mathtt{m}}=\vert E\vert$$ . Furthermore, we will assume that $$ V=\{0,\ldots,\ensuremath{\mathtt{n}}-1\}$$ . Any other data that we would like to associate with the elements of $$ V$$ can be stored in an array of length $$ \ensuremath{\mathtt{n}}$$ . Some typical operations performed on graphs are:

- $$ \mathtt{addEdge(i,j)}$$ : Add the edge $$ (\ensuremath{\mathtt{i}},\ensuremath{\mathtt{j}})$$ to $$ E$$ .
- $$ \mathtt{removeEdge(i,j)}$$ : Remove the edge $$ (\ensuremath{\mathtt{i}},\ensuremath{\mathtt{j}})$$ from $$ E$$ .
- $$ \mathtt{hasEdge(i,j)}$$ : Check if the edge $$ (\ensuremath{\mathtt{i}},\ensuremath{\mathtt{j}})\in E$$
- $$ \mathtt{outEdges(i)}$$ : Return a List of all integers $$ \ensuremath{\mathtt{j}}$$ such that $$ (\ensuremath{\mathtt{i}},\ensuremath{\mathtt{j}})\in E$$
- $$ \mathtt{inEdges(i)}$$ : Return a List of all integers $$ \ensuremath{\mathtt{j}}$$ such that $$ (\ensuremath{\mathtt{j}},\ensuremath{\mathtt{i}})\in E$$

Note that these operations are not terribly difficult to implement efficiently. For example, the first three operations can be implemented directly by using a USet, so they can be implemented in constant expected time using the hash tables discussed in Chapter 5. The last two operations can be implemented in constant time by storing, for each vertex, a list of its adjacent vertices. However, different applications of graphs have different performance requirements for these operations and, ideally, we can use the simplest implementation that satisfies all the application's requirements. For this reason, we discuss two broad categories of graph representations.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 12.1 AdjacencyMatrix: Representing a Graph by a Matrix

An adjacency matrix is a way of representing an $$ \mathtt{n}$$ vertex graph $$ G=(V,E)$$ by an $$ \ensuremath{\mathtt{n}}\times\ensuremath{\mathtt{n}}$$ matrix, $$ \mathtt{a}$$ , whose entries are boolean values.

```
    int n;
    boolean[][] a;
    AdjacencyMatrix(int n0) {
        n = n0;
        a = new boolean[n][n];
    }
```

The matrix entry $$ \mathtt{a[i][j]}$$ is defined as

![$\displaystyle \ensuremath{\mathtt{a[i][j]}}= \begin{cases} \ensuremath{\math... ...(i,j)}}\in E$} \\ \ensuremath{\mathtt{false}} & \text{otherwise} \end{cases}$](/images/open-data-structures/12_1_AdjacencyMatrix_Repres-img4534.png.webp)

The adjacency matrix for the graph in Figure 12.1 is shown in Figure 12.2. In this representation, the operations $$ \mathtt{addEdge(i,j)}$$ , $$ \mathtt{removeEdge(i,j)}$$ , and $$ \mathtt{hasEdge(i,j)}$$ just involve setting or reading the matrix entry $$ \mathtt{a[i][j]}$$ :

```
    void addEdge(int i, int j) {
        a[i][j] = true;
    }
    void removeEdge(int i, int j) {
        a[i][j] = false;
    }
    boolean hasEdge(int i, int j) {
        return a[i][j];
    }
```

These operations clearly take constant time per operation.

| ![\includegraphics[scale=0.90909]{figs/graph}](/images/open-data-structures/12_1_AdjacencyMatrix_Repres-img4539.png.webp) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
| 2 | 1 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| 3 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
| 4 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 0 | 0 |
| 5 | 0 | 1 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 1 | 0 | 0 |
| 6 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| 7 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 |
| 8 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
| 9 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 1 | 0 |
| 10 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 1 |
| 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 |

Where the adjacency matrix performs poorly is with the $$ \mathtt{outEdges(i)}$$ and $$ \mathtt{inEdges(i)}$$ operations. To implement these, we must scan all $$ \mathtt{n}$$ entries in the corresponding row or column of $$ \mathtt{a}$$ and gather up all the indices, $$ \mathtt{j}$$ , where $$ \mathtt{a[i][j]}$$ , respectively $$ \mathtt{a[j][i]}$$ , is true.

```
    List<Integer> outEdges(int i) {
        List<Integer> edges = new ArrayList<Integer>();
        for (int j = 0; j < n; j++) 
            if (a[i][j]) edges.add(j);
        return edges;
    }
    List<Integer> inEdges(int i) {
        List<Integer> edges = new ArrayList<Integer>();
        for (int j = 0; j < n; j++)
            if (a[j][i]) edges.add(j);
        return edges;
    }
```

These operations clearly take $$ O(\ensuremath{\mathtt{n}})$$ time per operation.

Another drawback of the adjacency matrix representation is that it is large. It stores an $$ \ensuremath{\mathtt{n}}\times \ensuremath{\mathtt{n}}$$ boolean matrix, so it requires at least $$ \ensuremath{\mathtt{n}}^2$$ bits of memory. The implementation here uses a matrix of $$ \mathtt{boolean}$$ values so it actually uses on the order of $$ \ensuremath{\mathtt{n}}^2$$ bytes of memory. A more careful implementation, which packs $$ \mathtt{w}$$ boolean values into each word of memory, could reduce this space usage to $$ O(\ensuremath{\mathtt{n}}^2/\ensuremath{\mathtt{w}})$$ words of memory. **Theorem 12..1** *The AdjacencyMatrix data structure implements the Graph interface. An AdjacencyMatrix supports the operations * $$ \mathtt{addEdge(i,j)}$$ , $$ \mathtt{removeEdge(i,j)}$$ , and $$ \mathtt{hasEdge(i,j)}$$ in constant time per operation; and $$ \mathtt{inEdges(i)}$$ , and $$ \mathtt{outEdges(i)}$$ in $$ O(\ensuremath{\mathtt{n}})$$ time per operation. * The space used by an AdjacencyMatrix is $$ O(\ensuremath{\mathtt{n}}^2)$$ .*

Despite its high memory requirements and poor performance of the $$ \mathtt{inEdges(i)}$$ and $$ \mathtt{outEdges(i)}$$ operations, an AdjacencyMatrix can still be useful for some applications. In particular, when the graph $$ G$$ is dense, i.e., it has close to $$ \ensuremath{\mathtt{n}}^2$$ edges, then a memory usage of $$ \ensuremath{\mathtt{n}}^2$$ may be acceptable. The AdjacencyMatrix data structure is also commonly used because algebraic operations on the matrix $$ \mathtt{a}$$ can be used to efficiently compute properties of the graph $$ G$$ . This is a topic for a course on algorithms, but we point out one such property here: If we treat the entries of $$ \mathtt{a}$$ as integers (1 for $$ \mathtt{true}$$ and 0 for $$ \mathtt{false}$$ ) and multiply $$ \mathtt{a}$$ by itself using matrix multiplication then we get the matrix $$ \ensuremath{\mathtt{a}}^2$$ . Recall, from the definition of matrix multiplication, that

![$\displaystyle \ensuremath{\mathtt{a^2[i][j]}} = \sum_{k=0}^{\ensuremath{\mathtt... ...1} \ensuremath{\mathtt{a[i][k]}}\cdot \ensuremath{\mathtt{a[k][j]}} \enspace . $](/images/open-data-structures/12_1_AdjacencyMatrix_Repres-img4573.png.webp)

Interpreting this sum in terms of the graph $$ G$$ , this formula counts the number of vertices, $$ \ensuremath{\mathtt{k}}$$ , such that $$ G$$ contains both edges $$ \mathtt{(i,k)}$$ and $$ \mathtt{(k,j)}$$ . That is, it counts the number of paths from $$ \ensuremath{\mathtt{i}}$$ to $$ \ensuremath{\mathtt{j}}$$ (through intermediate vertices, $$ \ensuremath{\mathtt{k}}$$ ) whose length is exactly two. This observation is the foundation of an algorithm that computes the shortest paths between all pairs of vertices in $$ G$$ using only $$ O(\log \ensuremath{\mathtt{n}})$$ matrix multiplications. [opendatastructures.org](http://opendatastructures.org/)

## 12.2 AdjacencyLists: A Graph as a Collection of Lists

Adjacency list representations of graphs take a more vertex-centric approach. There are many possible implementations of adjacency lists. In this section, we present a simple one. At the end of the section, we discuss different possibilities. In an adjacency list representation, the graph $$ G=(V,E)$$ is represented as an array, $$ \mathtt{adj}$$ , of lists. The list $$ \mathtt{adj[i]}$$ contains a list of all the vertices adjacent to vertex $$ \mathtt{i}$$ . That is, it contains every index $$ \mathtt{j}$$ such that $$ \ensuremath{\mathtt{(i,j)}}\in E$$ .

```
    int n;
    List<Integer>[] adj;
    AdjacencyLists(int n0) {
        n = n0;
        adj = (List<Integer>[])new List[n];
        for (int i = 0; i < n; i++) 
            adj[i] = new ArrayStack<Integer>(Integer.class);
    }
```

(An example is shown in Figure 12.3.) In this particular implementation, we represent each list in $$ \mathtt{adj}$$ as an ArrayStack, because we would like constant time access by position. Other options are also possible. Specifically, we could have implemented $$ \mathtt{adj}$$ as a DLList.

| ![\includegraphics[scale=0.90909]{figs/graph}](/images/open-data-structures/12_2_AdjacencyLists_Graph_a-img4592.png.webp) 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | 2 | 0 | 1 | 5 | 6 | 4 | 8 | 9 | 10 |  |
| 4 | 2 | 3 | 7 | 5 | 2 | 2 | 3 | 9 | 5 | 6 | 7 |  |
|  | 6 | 6 |  | 8 | 6 | 7 | 11 |  | 10 | 11 |  |  |
|  | 5 |  |  |  | 9 | 10 |  |  |  |  |  |  |
|  |  |  |  |  | 4 |  |  |  |  |  |  |  |

The $$ \mathtt{addEdge(i,j)}$$ operation just appends the value $$ \mathtt{j}$$ to the list $$ \mathtt{adj[i]}$$ :

```
    void addEdge(int i, int j) {
        adj[i].add(j);
    }
```

This takes constant time. The $$ \mathtt{removeEdge(i,j)}$$ operation searches through the list $$ \mathtt{adj[i]}$$ until it finds $$ \mathtt{j}$$ and then removes it:

```
    void removeEdge(int i, int j) {
        Iterator<Integer> it = adj[i].iterator();
        while (it.hasNext()) {
            if (it.next() == j) {
                it.remove();
                return;
            }
        }    
    }
```

This takes $$ O(\deg(\ensuremath{\mathtt{i}}))$$ time, where $$ \deg(\ensuremath{\mathtt{i}})$$ (the degree of $$ \ensuremath{\mathtt{i}}$$ ) counts the number of edges in $$ E$$ that have $$ \ensuremath{\mathtt{i}}$$ as their source. The $$ \mathtt{hasEdge(i,j)}$$ operation is similar; it searches through the list $$ \mathtt{adj[i]}$$ until it finds $$ \mathtt{j}$$ (and returns true), or reaches the end of the list (and returns false):

```
    boolean hasEdge(int i, int j) {
        return adj[i].contains(j);
    }
```

This also takes $$ O(\deg(\ensuremath{\mathtt{i}}))$$ time. The $$ \mathtt{outEdges(i)}$$ operation is very simple; it returns the list $$ \mathtt{adj[i]}$$ :

```
    List<Integer> outEdges(int i) {
        return adj[i];
    }
```

This clearly takes constant time. The $$ \mathtt{inEdges(i)}$$ operation is much more work. It scans over every vertex $$ j$$ checking if the edge $$ \mathtt{(i,j)}$$ exists and, if so, adding $$ \mathtt{j}$$ to the output list:

```
    List<Integer> inEdges(int i) {
        List<Integer> edges = new ArrayStack<Integer>(Integer.class);
        for (int j = 0; j < n; j++)
            if (adj[j].contains(i))    edges.add(j);
        return edges;
    }
```

This operation is very slow. It scans the adjacency list of every vertex, so it takes $$ O(\ensuremath{\mathtt{n}} + \ensuremath{\mathtt{m}})$$ time.

The following theorem summarizes the performance of the above data structure: **Theorem 12..2** *The AdjacencyLists data structure implements the Graph interface. An AdjacencyLists supports the operations * $$ \mathtt{addEdge(i,j)}$$ in constant time per operation; $$ \mathtt{removeEdge(i,j)}$$ and $$ \mathtt{hasEdge(i,j)}$$ in $$ O(\deg(\ensuremath{\mathtt{i}}))$$ time per operation; $$ \mathtt{outEdges(i)}$$ in constant time per operation; and $$ \mathtt{inEdges(i)}$$ in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time per operation. * The space used by a AdjacencyLists is $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ .*

As alluded to earlier, there are many different choices to be made when implementing a graph as an adjacency list. Some questions that come up include:

- What type of collection should be used to store each element of $$ \mathtt{adj}$$ ? One could use an array-based list, a linked-list, or even a hashtable.
- Should there be a second adjacency list, $$ \mathtt{inadj}$$ , that stores, for each $$ \mathtt{i}$$ , the list of vertices, $$ \mathtt{j}$$ , such that $$ \ensuremath{\mathtt{(j,i)}}\in E$$ ? This can greatly reduce the running-time of the $$ \mathtt{inEdges(i)}$$ operation, but requires slightly more work when adding or removing edges.
- Should the entry for the edge $$ \mathtt{(i,j)}$$ in $$ \mathtt{adj[i]}$$ be linked by a reference to the corresponding entry in $$ \mathtt{inadj[j]}$$ ?
- Should edges be first-class objects with their own associated data? In this way, $$ \mathtt{adj}$$ would contain lists of edges rather than lists of vertices (integers).

Most of these questions come down to a tradeoff between complexity (and space) of implementation and performance features of the implementation. [opendatastructures.org](http://opendatastructures.org/)

## 12.3 Graph Traversal

**Subsections**

# 12.3 Graph Traversal

In this section we present two algorithms for exploring a graph, starting at one of its vertices, $$ \mathtt{i}$$ , and finding all vertices that are reachable from $$ \mathtt{i}$$ . Both of these algorithms are best suited to graphs represented using an adjacency list representation. Therefore, when analyzing these algorithms we will assume that the underlying representation is an AdjacencyLists.

## 12.3.1 Breadth-First Search

The bread-first-search algorithm starts at a vertex $$ \mathtt{i}$$ and visits, first the neighbours of $$ \mathtt{i}$$ , then the neighbours of the neighbours of $$ \mathtt{i}$$ , then the neighbours of the neighbours of the neighbours of $$ \mathtt{i}$$ , and so on. This algorithm is a generalization of the breadth-first traversal algorithm for binary trees (Section 6.1.2), and is very similar; it uses a queue, $$ \mathtt{q}$$ , that initially contains only $$ \mathtt{i}$$ . It then repeatedly extracts an element from $$ \mathtt{q}$$ and adds its neighbours to $$ \mathtt{q}$$ , provided that these neighbours have never been in $$ \mathtt{q}$$ before. The only major difference between the breadth-first-search algorithm for graphs and the one for trees is that the algorithm for graphs has to ensure that it does not add the same vertex to $$ \mathtt{q}$$ more than once. It does this by using an auxiliary boolean array, $$ \mathtt{seen}$$ , that tracks which vertices have already been discovered.

```
    void bfs(Graph g, int r) {
        boolean[] seen = new boolean[g.nVertices()];
        Queue<Integer> q = new SLList<Integer>();
        q.add(r);
        seen[r] = true;
        while (!q.isEmpty()) {
            int i = q.remove();
            for (Integer j : g.outEdges(i)) {
                if (!seen[j]) {
                    q.add(j);
                    seen[j] = true;
                }
            }
        }
    }
```

An example of running $$ \mathtt{bfs(g,0)}$$ on the graph from Figure 12.1 is shown in Figure 12.4. Different executions are possible, depending on the ordering of the adjacency lists; Figure 12.4 uses the adjacency lists in Figure 12.3.

**Figure 12.4:** An example of bread-first-search starting at node 0. Nodes are labelled with the order in which they are added to $$ \mathtt{q}$$ . Edges that result in nodes being added to $$ \mathtt{q}$$ are drawn in black, other edges are drawn in grey. ![\includegraphics[scale=0.90909]{figs/graph-bfs}](/images/open-data-structures/12_3_Graph_Traversal-img4647.png.webp) Analyzing the running-time of the $$ \mathtt{bfs(g,i)}$$ routine is fairly straightforward. The use of the $$ \mathtt{seen}$$ array ensures that no vertex is added to $$ \mathtt{q}$$ more than once. Adding (and later removing) each vertex from $$ \mathtt{q}$$ takes constant time per vertex for a total of $$ O(\ensuremath{\mathtt{n}})$$ time. Since each vertex is processed by the inner loop at most once, each adjacency list is processed at most once, so each edge of $$ G$$ is processed at most once. This processing, which is done in the inner loop takes constant time per iteration, for a total of $$ O(\ensuremath{\mathtt{m}})$$ time. Therefore, the entire algorithm runs in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time. The following theorem summarizes the performance of the $$ \mathtt{bfs(g,r)}$$ algorithm. **Theorem 12..3** *When given as input a Graph, $$ \mathtt{g}$$ , that is implemented using the AdjacencyLists data structure, the $$ \mathtt{bfs(g,r)}$$ algorithm runs in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time.*

A breadth-first traversal has some very special properties. Calling $$ \mathtt{bfs(g,r)}$$ will eventually enqueue (and eventually dequeue) every vertex $$ \mathtt{j}$$ such that there is a directed path from $$ \mathtt{r}$$ to $$ \mathtt{j}$$ . Moreover, the vertices at distance 0 from $$ \mathtt{r}$$ ( $$ \mathtt{r}$$ itself) will enter $$ \mathtt{q}$$ before the vertices at distance 1, which will enter $$ \mathtt{q}$$ before the vertices at distance 2, and so on. Thus, the $$ \mathtt{bfs(g,r)}$$ method visits vertices in increasing order of distance from $$ \mathtt{r}$$ and vertices that cannot be reached from $$ \mathtt{r}$$ are never visited at all. A particularly useful application of the breadth-first-search algorithm is, therefore, in computing shortest paths. To compute the shortest path from $$ \mathtt{r}$$ to every other vertex, we use a variant of $$ \mathtt{bfs(g,r)}$$ that uses an auxilliary array, $$ \mathtt{p}$$ , of length $$ \mathtt{n}$$ . When a new vertex $$ \mathtt{j}$$ is added to $$ \mathtt{q}$$ , we set $$ \mathtt{p[j]=i}$$ . In this way, $$ \mathtt{p[j]}$$ becomes the second last node on a shortest path from $$ \mathtt{r}$$ to $$ \mathtt{j}$$ . Repeating this, by taking $$ \mathtt{p[p[j]}$$ , $$ \mathtt{p[p[p[j]]]}$$ , and so on we can reconstruct the (reversal of) a shortest path from $$ \mathtt{r}$$ to $$ \mathtt{j}$$ .

## 12.3.2 Depth-First Search

The depth-first-search algorithm is similar to the standard algorithm for traversing binary trees; it first fully explores one subtree before returning to the current node and then exploring the other subtree. Another way to think of depth-first-search is by saying that it is similar to breadth-first search except that it uses a stack instead of a queue. During the execution of the depth-first-search algorithm, each vertex, $$ \mathtt{i}$$ , is assigned a colour, $$ \mathtt{c[i]}$$ : $$ \mathtt{white}$$ if we have never seen the vertex before, $$ \mathtt{grey}$$ if we are currently visiting that vertex, and $$ \mathtt{black}$$ if we are done visiting that vertex. The easiest way to think of depth-first-search is as a recursive algorithm. It starts by visiting $$ \mathtt{r}$$ . When visiting a vertex $$ \mathtt{i}$$ , we first mark $$ \mathtt{i}$$ as $$ \mathtt{grey}$$ . Next, we scan $$ \mathtt{i}$$ 's adjacency list and recursively visit any white vertex we find in this list. Finally, we are done processing $$ \mathtt{i}$$ , so we colour $$ \mathtt{i}$$ black and return.

```
    void dfs(Graph g, int r) {
        byte[] c = new byte[g.nVertices()];
        dfs(g, r, c);
    }
    void dfs(Graph g, int i, byte[] c) {
        c[i] = grey;  // currently visiting i
        for (Integer j : g.outEdges(i)) {
            if (c[j] == white) {
                c[j] = grey;
                dfs(g, j, c);
            } 
        }
        c[i] = black; // done visiting i
    }
```

An example of the execution of this algorithm is shown in Figure 12.5.

Although depth-first-search may best be thought of as a recursive algorithm, recursion is not the best way to implement it. Indeed, the code given above will fail for many large graphs by causing a stack overflow. An alternative implementation is to replace the recursion stack with an explicit stack, $$ \mathtt{s}$$ . The following implementation does just that:

```
    void dfs2(Graph g, int r) {
        byte[] c = new byte[g.nVertices()];
        Stack<Integer> s = new Stack<Integer>();
        s.push(r);
        while (!s.isEmpty()) {
            int i = s.pop();
            if (c[i] == white) {
                c[i] = grey;
                for (int j : g.outEdges(i))
                    s.push(j);
            }
        }
    }
```

In the preceding code, when the next vertex, $$ \mathtt{i}$$ , is processed, $$ \mathtt{i}$$ is coloured $$ \mathtt{grey}$$ and then replaced, on the stack, with its adjacent vertices. During the next iteration, one of these vertices will be visited.

Not surprisingly, the running times of $$ \mathtt{dfs(g,r)}$$ and $$ \mathtt{dfs2(g,r)}$$ are the same as that of $$ \mathtt{bfs(g,r)}$$ : **Theorem 12..4** *When given as input a Graph, $$ \mathtt{g}$$ , that is implemented using the AdjacencyLists data structure, the $$ \mathtt{dfs(g,r)}$$ and $$ \mathtt{dfs2(g,r)}$$ algorithms each run in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time.*

As with the breadth-first-search algorithm, there is an underlying tree associated with each execution of depth-first-search. When a node $$ \ensuremath{\mathtt{i}}\neq \ensuremath{\mathtt{r}}$$ goes from $$ \mathtt{white}$$ to $$ \mathtt{grey}$$ , this is because $$ \mathtt{dfs(g,i,c)}$$ was called recursively while processing some node $$ \mathtt{i'}$$ . (In the case of $$ \mathtt{dfs2(g,r)}$$ algorithm, $$ \mathtt{i}$$ is one of the nodes that replaced $$ \mathtt{i'}$$ on the stack.) If we think of $$ \mathtt{i'}$$ as the parent of $$ \mathtt{i}$$ , then we obtain a tree rooted at $$ \mathtt{r}$$ . In Figure 12.5, this tree is a path from vertex 0 to vertex 11. An important property of the depth-first-search algorithm is the following: Suppose that when node $$ \mathtt{i}$$ is coloured $$ \mathtt{grey}$$ , there exists a path from $$ \mathtt{i}$$ to some other node $$ \mathtt{j}$$ that uses only white vertices. Then $$ \mathtt{j}$$ will be coloured first $$ \mathtt{grey}$$ then $$ \mathtt{black}$$ before $$ \mathtt{i}$$ is coloured $$ \mathtt{black}$$ . (This can be proven by contradiction, by considering any path $$ P$$ from $$ \mathtt{i}$$ to $$ \mathtt{j}$$ .) One application of this property is the detection of cycles. Refer to Figure 12.6. Consider some cycle, $$ C$$ , that can be reached from $$ \mathtt{r}$$ . Let $$ \mathtt{i}$$ be the first node of $$ C$$ that is coloured $$ \mathtt{grey}$$ , and let $$ \mathtt{j}$$ be the node that precedes $$ \mathtt{i}$$ on the cycle $$ C$$ . Then, by the above property, $$ \mathtt{j}$$ will be coloured $$ \mathtt{grey}$$ and the edge $$ \mathtt{(j,i)}$$ will be considered by the algorithm while $$ \mathtt{i}$$ is still $$ \mathtt{grey}$$ . Thus, the algorithm can conclude that there is a path, $$ P$$ , from $$ \mathtt{i}$$ to $$ \mathtt{j}$$ in the depth-first-search tree and the edge $$ \mathtt{(j,i)}$$ exists. Therefore, $$ P$$ is also a cycle.

[opendatastructures.org](http://opendatastructures.org/)

## 12.4 Discussion and Exercises

The running times of the depth-first-search and breadth-first-search algorithms are somewhat overstated by the Theorems 12.3 and 12.4. Define $$ \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{r}}}$$ as the number of vertices, $$ \mathtt{i}$$ , of $$ G$$ , for which there exists a path from $$ \mathtt{r}$$ to $$ \mathtt{i}$$ . Define $$ \ensuremath{\mathtt{m}}_\ensuremath{\mathtt{r}}$$ as the number of edges that have these vertices as their sources. Then the following theorem is a more precise statement of the running times of the breadth-first-search and depth-first-search algorithms. (This more refined statement of the running time is useful in some of the applications of these algorithms outlined in the exercises.) **Theorem 12..5** *When given as input a Graph, $$ \mathtt{g}$$ , that is implemented using the AdjacencyLists data structure, the $$ \mathtt{bfs(g,r)}$$ , $$ \mathtt{dfs(g,r)}$$ and $$ \mathtt{dfs2(g,r)}$$ algorithms each run in $$ O(\ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{r}}}+\ensuremath{\mathtt{m}}_{\ensuremath{\mathtt{r}}})$$ time.*

Breadth-first search seems to have been discovered independently by Moore [52] and Lee [49] in the contexts of maze exploration and circuit routing, respectively. Adjacency-list representations of graphs were presented by Hopcroft and Tarjan [40] as an alternative to the (then more common) adjacency-matrix representation. This representation, as well as depth-first-search, played a major part in the celebrated Hopcroft-Tarjan planarity testing algorithm that can determine, in $$ O(\ensuremath{\mathtt{n}})$$ time, if a graph can be drawn, in the plane, and in such a way that no pair of edges cross each other [41]. In the following exercises, an undirected graph is one in which, for every $$ \mathtt{i}$$ and $$ \mathtt{j}$$ , the edge $$ (\ensuremath{\mathtt{i}},\ensuremath{\mathtt{j}})$$ is present if and only if the edge $$ (\ensuremath{\mathtt{j}},\ensuremath{\mathtt{i}})$$ is present. **Exercise 12..1** Draw an adjacency list representation and an adjacency matrix representation of the graph in Figure 12.7.

**Figure 12.7:** An example graph. ![\includegraphics[scale=0.90909]{figs/graph-example2}](/images/open-data-structures/12_4_Discussion_Exercises-img4780.png.webp) **Exercise 12..2** The incidence matrix representation of a graph, $$ G$$ , is an $$ \ensuremath{\mathtt{n}}\times\ensuremath{\mathtt{m}}$$ matrix, $$ A$$ , where

![$\displaystyle A_{i,j} = \begin{cases} -1 & \text{if vertex $i$\ the source of ... ...if vertex $i$\ the target of edge $j$} \\ 0 & \text{otherwise.} \end{cases} $](/images/open-data-structures/12_4_Discussion_Exercises-img4784.png.webp)

1. Draw the incident matrix representation of the graph in Figure 12.7.
2. Design, analyze and implement an incidence matrix representation of a graph. Be sure to analyze the space, the cost of $$ \mathtt{addEdge(i,j)}$$ , $$ \mathtt{removeEdge(i,j)}$$ , $$ \mathtt{hasEdge(i,j)}$$ , $$ \mathtt{inEdges(i)}$$ , and $$ \mathtt{outEdges(i)}$$ .

**Exercise 12..3** Illustrate an execution of the $$ \mathtt{bfs(G,0)}$$ and $$ \mathtt{dfs(G,0)}$$ on the graph, $$ \ensuremath{\mathtt{G}}$$ , in Figure 12.7.

**Exercise 12..4** Let $$ G$$ be an undirected graph. We say $$ G$$ is connected if, for every pair of vertices $$ \mathtt{i}$$ and $$ \mathtt{j}$$ in $$ G$$ , there is a path from $$ \ensuremath{\mathtt{i}}$$ to $$ \ensuremath{\mathtt{j}}$$ (since $$ G$$ is undirected, there is also a path from $$ \mathtt{j}$$ to $$ \mathtt{i}$$ ). Show how to test if $$ G$$ is connected in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time.

**Exercise 12..5** Let $$ G$$ be an undirected graph. A connected-component labelling of $$ G$$ partitions the vertices of $$ G$$ into maximal sets, each of which forms a connected subgraph. Show how to compute a connected component labelling of $$ G$$ in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time.

**Exercise 12..6** Let $$ G$$ be an undirected graph. A spanning forest of $$ G$$ is a collection of trees, one per component, whose edges are edges of $$ G$$ and whose vertices contain all vertices of $$ G$$ . Show how to compute a spanning forest of of $$ G$$ in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time.

**Exercise 12..7** We say that a graph $$ G$$ is strongly-connected if, for every pair of vertices $$ \mathtt{i}$$ and $$ \mathtt{j}$$ in $$ G$$ , there is a path from $$ \ensuremath{\mathtt{i}}$$ to $$ \ensuremath{\mathtt{j}}$$ . Show how to test if $$ G$$ is strongly-connected in $$ O(\ensuremath{\mathtt{n}}+\ensuremath{\mathtt{m}})$$ time.

**Exercise 12..8** Given a graph $$ G=(V,E)$$ and some special vertex $$ \ensuremath{\mathtt{r}}\in V$$ , show how to compute the length of the shortest path from $$ \ensuremath{\mathtt{r}}$$ to $$ \mathtt{i}$$ for every vertex $$ \ensuremath{\mathtt{i}}\in V$$ .

**Exercise 12..9** Give a (simple) example where the $$ \mathtt{dfs(g,r)}$$ code visits the nodes of a graph in an order that is different from that of the $$ \mathtt{dfs2(g,r)}$$ code. Write a version of $$ \mathtt{dfs2(g,r)}$$ that always visits nodes in exactly the same order as $$ \mathtt{dfs(g,r)}$$ . (Hint: Just start tracing the execution of each algorithm on some graph where $$ \mathtt{r}$$ is the source of more than 1 edge.)

**Exercise 12..10** A universal sink in a graph $$ G$$ is a vertex that is the target of $$ \ensuremath{\mathtt{n}}-1$$ edges and the source of no edges.12.1 Design and implement an algorithm that tests if a graph $$ G$$ , represented as an AdjacencyMatrix, has a universal sink. Your algorithm should run in $$ O(\ensuremath{\mathtt{n}})$$ time.

#### Footnotes

... edges.12.1 A universal sink, $$ \mathtt{v}$$ , is also sometimes called a celebrity: Everyone in the room recognizes $$ \mathtt{v}$$ , but $$ \mathtt{v}$$ doesn't recognize anyone else in the room. [opendatastructures.org](http://opendatastructures.org/)
