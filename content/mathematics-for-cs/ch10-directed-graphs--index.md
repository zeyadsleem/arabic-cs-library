---
title: "Directed Graphs & Partial Orders"
lang: en
---

## 10 Directed graphs & Partial Orders
```
     Directed graphs, called digraphs for short, provide a handy way to represent how
```
```
     things are connected together and how to get from one thing to another by following
```
```
     those connections. They are usually pictured as a bunch of dots or circles with
```
```
     arrows between some of the dots, as in Figure 10.1. The dots are called nodes or
```
```
     vertices and the lines are called directed edges or arrows; the digraph in Figure 10.1
```
```
     has 4 nodes and 6 directed edges.
```
```
        Digraphs appear everywhere in computer science. For example, the digraph in
```
```
     Figure 10.2 represents a communication net, a topic we’ll explore in depth in Chap-
```
```
     ter 11. Figure 10.2 has three “in” nodes (pictured as little squares) representing
```
```
     locations where packets may arrive at the net, the three “out” nodes representing
```
```
     destination locations for packets, and the remaining six nodes (pictured with lit-
```
```
     tle circles) represent switches. The 16 edges indicate paths that packets can take
```
```
     through the router.
```
```
        Another place digraphs emerge in computer science is in the hyperlink structure
```
```
     of the World Wide Web. Letting the vertices x1 ; : : : ; xn correspond to web pages,
```
```
     and using arrows to indicate when one page has a hyperlink to another, results in a
```
```
     digraph like the one in Figure 10.3—although the graph of the real World Wide Web
```
```
     would have n be a number in the billions and probably even the trillions. At first
```
```
     glance, this graph wouldn’t seem to be very interesting. But in 1995, two students
```
```
     at Stanford, Larry Page and Sergey Brin, ultimately became multibillionaires from
```
```
     the realization of how useful the structure of this graph could be in building a search
```
```
     engine. So pay attention to graph theory, and who knows what might happen!
```
```

                                               b
```
```

                                  a                          c
```
```

                                               d
```
```

                    Figure 10.1 A 4-node directed graph with 6 edges.
```
```
           

## 422 Chapter 10   Directed graphs & Partial Orders
```
```

                         in0                  in1             in2
```
```

                                  out0                out1          out2
```
```

                        Figure 10.2 A 6-switch packet routing digraph.
```
```

                               x3                            x4
```
```

                                                                           x7
```
```

                                                    x2
```
```
          x1                                                                    x5
```
```

                                           x6
```
```
                               Figure 10.3 Links among Web Pages.
```
```
                

           10.1. Vertex Degrees                                                               423
```
```

                                       tail          e               head
```
```
                                         u                             v
```
```

           Figure 10.4 A directed edge e D hu ! vi. The edge e starts at the tail vertex u
```
```
           and ends at the head vertex v.
```
```

           Definition 10.0.1. A directed graph G consists of a nonempty set V .G/, called the
```
```
           vertices of G, and a set E.G/, called the edges of G. An element of V .G/ is called
```
```
           a vertex. A vertex is also called a node; the words “vertex” and “node” are used
```
```
           interchangeably. An element of E.G/ is called a directed edge. A directed edge is
```
```
           also called an “arrow” or simply an “edge.” A directed edge starts at some vertex
```
```
           u called the tail of the edge, and ends at some vertex v called the head of the edge,
```
```
           as in Figure 10.4. Such an edge can be represented by the ordered pair .u; v/. The
```
```
           notation hu ! vi denotes this edge.
```
```
              There is nothing new in Definition 10.0.1 except for a lot of vocabulary. For-
```
```
           mally, a digraph G is the same as a binary relation on the set, V D V .G/—that is,
```
```
           a digraph is just a binary relation whose domain and codomain are the same set V .
```
```
           In fact, we’ve already referred to the arrows in a relation G as the “graph” of G.
```
```
           For example, the divisibility relation on the integers in the interval Œ1::12 could be
```
```
           pictured by the digraph in Figure 10.5.
```

### 10.1 Vertex Degrees
```
           The in-degree of a vertex in a digraph is the number of arrows coming into it, and
```
```
           similarly its out-degree is the number of arrows out of it. More precisely,
```
```
           Definition 10.1.1. If G is a digraph and v 2 V .G/, then
```
```

                                  indeg.v/ WWD jfe 2 E.G/ j head.e/ D vgj
```
```
                                  outdeg.v/ WWD jfe 2 E.G/ j tail.e/ D vgj
```
```

             An immediate consequence of this definition is
```
```
           Lemma 10.1.2.             X                     X
```
```
                                             indeg.v/ D             outdeg.v/:
```
```
                                   v2V .G/                v2V .G/
```
```

           Proof. Both sums are equal to jE.G/j.                                               
```
```
                

## 424 Chapter 10   Directed graphs & Partial Orders
```
```

                               4             2             8         10
```
```

                                                                              5
```
```

                               12            6             1
```
```

                                                                              7
```
```

                                             3             9         11
```
```

                        Figure 10.5 The Digraph for Divisibility on f1; 2; : : : ; 12g.
```

### 10.2 Walks and Paths
```
           Picturing digraphs with points and arrows makes it natural to talk about following
```
```
           successive edges through the graph. For example, in the digraph of Figure 10.5,
```
```
           you might start at vertex 1, successively follow the edges from vertex 1 to vertex
```
```
           2, from 2 to 4, from 4 to 12, and then from 12 to 12 twice (or as many times as
```
```
           you like). The sequence of edges followed in this way is called a walk through the
```
```
           graph. A path is a walk which never visits a vertex more than once. So following
```
```
           edges from 1 to 2 to 4 to 12 is a path, but it stops being a path if you go to 12 again.
```
```
              The natural way to represent a walk is with the sequence of sucessive vertices it
```
```
           went through, in this case:
```
```
                                             1 2 4 12 12 12:
```
```
           However, it is conventional to represent a walk by an alternating sequence of suc-
```
```
           cessive vertices and edges, so this walk would formally be
```
```

                1 h1 ! 2i 2 h2 ! 4i 4 h4 ! 12i 12 h12 ! 12i 12 h12 ! 12i 12:                (10.1)
```
```

            The redundancy of this definition is enough to make any computer scientist cringe,
```
```
           but it does make it easy to talk about how many times vertices and edges occur on
```
```
           the walk. Here is a formal definition:
```
```

           Definition 10.2.1. A walk in a digraph is an alternating sequence of vertices and
```
```
           edges that begins with a vertex, ends with a vertex, and such that for every edge
```
```
           hu ! vi in the walk, vertex u is the element just before the edge, and vertex v is the
```
```
           next element after the edge.
```
```
     

10.2. Walks and Paths                                                                425
```

  So a walk v is a sequence of the form
```

             v WWD v0 hv0 ! v1 i v1 hv1 ! v2 i v2 : : : hvk 1 ! vk i vk
```

where hvi ! vi C1 i 2 E.G/ for i 2 [0..k ). The walk is said to start at v0 , to end at
vk , and the length jvj of the walk is defined to be k.
   The walk is a path iff all the vi ’s are different, that is, if i ¤ j , then vi ¤ vj .
   A closed walk is a walk that begins and ends at the same vertex. A cycle is a
positive length closed walk whose vertices are distinct except for the beginning and
end vertices.
   Note that a single vertex counts as a length zero path that begins and ends at itself.
It also is a closed walk, but does not count as a cycle, since cycles by definition
must have positive length. Length one cycles are possible when a node has an
arrow leading back to itself. The graph in Figure 10.1 has none, but every vertex in
the divisibility relation digraph of Figure 10.5 is in a length one cycle. Length one
cycles are sometimes called self-loops.
   Although a walk is officially an alternating sequence of vertices and edges, it
is completely determined just by the sequence of successive vertices on it, or by
the sequence of edges on it. We will describe walks in these ways whenever it’s
convenient. For example, for the graph in Figure 10.1,
```
     .a; b; d /, or simply abd , is a (vertex-sequence description of a) length two
```
```
      path,
```
```

     .ha ! bi ; hb ! d i/, or simply ha ! bi hb ! d i, is (an edge-sequence de-
```
```
      scription of) the same length two path,
```
```

     abcbd is a length four walk,
```
```

     dcbcbd is a length five closed walk,
```
```

     bdcb is a length three cycle,
```
```

     hb ! ci hc ! bi is a length two cycle, and
```
```

     hc ! bi hb ai ha ! d i is not a walk. A walk is not allowed to follow edges
```
```
      in the wrong direction.
```
   If you walk for a while, stop for a rest at some vertex, and then continue walking,
you have broken a walk into two parts. For example, stopping to rest after following
two edges in the walk (10.1) through the divisibility graph breaks the walk into the
first part of the walk
```
                               1 h1 ! 2i 2 h2 ! 4i 4                            (10.2)
```
```
            

## 426 Chapter 10    Directed graphs & Partial Orders
```
```

      from 1 to 4, and the rest of the walk
```
```

                             4 h4 ! 12i 12 h12 ! 12i 12 h12 ! 12i 12:                              (10.3)
```
```

      from 4 to 12, and we’ll say the whole walk (10.1) is the merge of the walks (10.2)
```
```
      and (10.3). In general, if a walk f ends with a vertex v and a walk r starts with
```
```
      the same vertex v we’ll say that their merge f br is the walk that starts with f and
```
```
      continues with r.1 Two walks can only be merged if the first walk ends at the same
```
```
      vertex v with which the second one walk starts. Sometimes it’s useful to name the
```
```
      node v where the walks merge; we’ll use the notation fb v r to describe the merge of
```
```
      a walk f that ends at v with a walk r that begins at v.
```
```
         A consequence of this definition is that
```
```
      Lemma 10.2.2.
```
```
                                             jfbrj D jfj C jrj:
```
```
         In the next section we’ll get mileage out of walking this way.
```
```

      10.2.1       Finding a Path
```
```
      If you were trying to walk somewhere quickly, you’d know you were in trouble if
```
```
      you came to the same place twice. This is actually a basic theorem of graph theory.
```
```
      Theorem 10.2.3. A shortest walk from one vertex to another is a path.
```
```
      Proof. If there is a walk from vertex u to another vertex v ¤ u, then by the Well
```
```
      Ordering Principle, there must be a minimum length walk w from u to v. We claim
```
```
      w is a path.
```
```
        To prove the claim, suppose to the contrary that w is not a path, meaning that
```
```
      some vertex x occurs twice on this walk. That is,
```
```

                                                wDex
```
```
                                                   bf x
```
```
                                                      bg
```
```

      for some walks e; f; g where the length of f is positive. But then “deleting” f yields
```
```
      a strictly shorter walk
```
```
                                             exbg
```
```
      from u to v, contradicting the minimality of w.                                                   
```
```

      Definition 10.2.4. The distance, dist .u; v/, in a graph from vertex u to vertex v is
```
```
      the length of a shortest path from u to v.
```
```
         1 It’s tempting to say the merge is the concatenation of the two walks, but that wouldn’t quite be
```
```

      right because if the walks were concatenated, the vertex v would appear twice in a row where the
```
```
      walks meet.
```
```
                

           10.3. Adjacency Matrices                                                                427
```
```

             As would be expected, this definition of distance satisfies:
```
```

           Lemma 10.2.5. [The Triangle Inequality]
```
```

                                      dist .u; v/  dist .u; x/ C dist .x; v/
```
```

           for all vertices u; v; x with equality holding iff x is on a shortest path from u to v.
```
```

              Of course, you might expect this property to be true, but distance has a technical
```
```
           definition and its properties can’t be taken for granted. For example, unlike ordinary
```
```
           distance in space, the distance from u to v is typically different from the distance
```
```
           from v to u. So, let’s prove the Triangle Inequality
```
```

           Proof. To prove the inequality, suppose f is a shortest path from u to x and r is
```
```
           a shortest path from x to v. Then by Lemma 10.2.2, f x       b r is a walk of length
```
```
           dist .u; x/ C dist .x; v/ from u to v, so this sum is an upper bound on the length of
```
```
           the shortest path from u to v by Theorem 10.2.3.
```
```
              Proof of the “iff” is in Problem 10.3.                                          
```
```

             Finally, the relationship between walks and paths extends to closed walks and
```
```
           cycles:
```
```

           Lemma 10.2.6. The shortest positive length closed walk through a vertex is a cycle
```
```
           through that vertex.
```
```

             The proof of Lemma 10.2.6 is essentially the same as for Theorem 10.2.3; see
```
```
           Problem 10.4.
```

### 10.3 Adjacency Matrices
```
           If a graph G has n vertices v0 ; v1 ; : : : ; vn 1 , a useful way to represent it is with an
```
```
           n  n matrix of zeroes and ones called its adjacency matrix AG . The ij th entry of
```
```
           the adjacency matrix, .AG /ij , is 1 if there is an edge from vertex vi to vertex vj
```
```
           and 0 otherwise. That is,
```
```
                                               (           ˝         ˛
```
```
                                                  1 if vi ! vj 2 E.G/;
```
```
                                 .AG /ij WWD
```
```
                                                  0 otherwise:
```
```
           

## 428 Chapter 10   Directed graphs & Partial Orders
```
```

      For example, let H be the 4-node graph shown in Figure 10.1. Its adjacency matrix
```
```
      AH is the 4  4 matrix:
```
```

                                             a        b       c       d
```
```
                                           a 0        1       0       1
```
```
                                      AH D b 0        0       1       1
```
```
                                           c 0        1       0       0
```
```
                                           d 0        0       1       0
```
```

         A payoff of this representation is that we can use matrix powers to count numbers
```
```
      of walks between vertices. For example, there are two length two walks between
```
```
      vertices a and c in the graph H :
```
```

                                        a ha ! bi b hb ! ci c
```
```
                                       a ha ! d i d hd ! ci c
```
```

      and these are the only length two walks from a to c. Also, there is exactly one
```
```
      length two walk from b to c and exactly one length two walk from c to c and from
```
```
      d to b, and these are the only length two walks in H . It turns out we could have
```
```
      read these counts from the entries in the matrix .AH /2 :
```
```

                                               a          b       c       d
```
```
                                             a 0          0       2       1
```
```
                                    .AH /2 D b 0          1       1       0
```
```
                                             c 0          0       1       1
```
```
                                             d 0          1       0       0
```
```

        More generally, the matrix .AG /k provides a count of the number of length k
```
```
      walks between vertices in any digraph G as we’ll now explain.
```
```

      Definition 10.3.1. The length-k walk counting matrix for an n-vertex graph G is
```
```
      the n  n matrix C such that
```
```

                       Cuv WWD the number of length-k walks from u to v:           (10.4)
```
```

        Notice that the adjacency matrix AG is the length-1 walk counting matrix for G,
```
```
      and that .AG /0 , which by convention is the identity matrix, is the length-0 walk
```
```
      counting matrix.
```
```

      Theorem 10.3.2. If C is the length-k walk counting matrix for a graph G, and D
```
```
      is the length-m walk counting matrix, then CD is the length k C m walk counting
```
```
      matrix for G.
```
```
     

10.3. Adjacency Matrices                                                          429
```

  According to this theorem, the square .AG /2 of the adjacency matrix is the length
two walk counting matrix for G. Applying the theorem again to .AG /2 AG shows
that the length-3 walk counting matrix is .AG /3 . More generally, it follows by
induction that

Corollary 10.3.3. The length-k counting matrix of a digraph G is .AG /k , for all
k 2 N.

  In other words, you can determine the number of length k walks between any
pair of vertices simply by computing the kth power of the adjacency matrix!
  That may seem amazing, but the proof uncovers this simple relationship between
matrix multiplication and numbers of walks.

Proof of Theorem 10.3.2. Any length .kCm/ walk between vertices u and v begins
with a length k walk starting at u and ending at some vertex w followed by a length
m walk starting at w and ending at v. So the number of length .k C m/ walks from
u to v that go through w at the kth step equals the number Cuw of length k walks
from u to w, times the number Dw v of length m walks from w to v. We can get the
total number of length .k C m/ walks from u to v by summing, over all possible
vertices w, the number of such walks that go through w at the kth step. In other
words,                                                X
```
             #length .k C m/ walks from u to v D            Cuw  Dw v       (10.5)
```
```
                                                     w2V .G/
```

But the right-hand side of (10.5) is precisely the definition of .CD/uv . Thus, CD
is indeed the length-.k C m/ walk counting matrix.                               

#### 10.3.1 Shortest Paths
The relation between powers of the adjacency matrix and numbers of walks is
cool—to us math nerds at least—but a much more important problem is finding
shortest paths between pairs of nodes. For example, when you drive home for
vacation, you generally want to take the shortest-time route.
   One simple way to find the lengths of all the shortest paths in an n-vertex graph G
is to compute the successive powers of AG one by one up to the n 1st, watching
for the first power at which each entry becomes positive. That’s because Theo-
rem 10.3.2 implies that the length of the shortest path, if any, between u and v,
that is, the distance from u to v, will be the smallest value k for which .AG /kuv is
nonzero, and if there is a shortest path, its length will be  n 1. Refinements of
this idea lead to methods that find shortest paths in reasonably efficient ways. The
methods apply as well to weighted graphs, where edges are labelled with weights
or costs and the objective is to find least weight, cheapest paths. These refinements
```
                 

## 430 Chapter 10    Directed graphs & Partial Orders
```
```

           are typically covered in introductory algorithm courses, and we won’t go into them
```
```
           any further.
```

### 10.4 Walk Relations
```
           A basic question about a digraph is whether there is a way to get from one particular
```
```
           vertex to another. So for any digraph G we are interested in a binary relation G  ,
```
```
           called the walk relation on V .G/, where
```
```

                                  u G  v WWD there is a walk in G from u to v:                             (10.6)
```
```

           Similarly, there is a positive walk relation
```
```

                    u G C v WWD there is a positive length walk in G from u to v:                           (10.7)
```
```

           Definition 10.4.1. When there is a walk from vertex v to vertex w, we say that w
```
```
           is reachable from v, or equivalently, that v is connected to w.
```
```

           10.4.1       Composition of Relations
```
```
           There is a simple way to extend composition of functions to composition of rela-
```
```
           tions, and this gives another way to talk about walks and paths in digraphs.
```
```

           Definition 10.4.2. Let R W B ! C and S W A ! B be binary relations. Then the
```
```
           composition of R with S is the binary relation .R ı S / W A ! C defined by the
```
```
           rule
```
```
                            a .R ı S / c WWD 9b 2 B: .a S b/ AND .b R c/:          (10.8)
```
```
           This agrees with the Definition 4.3.1 of composition in the special case when R
```
```
           and S are functions.2
```
```

             Remembering that a digraph is a binary relation on its vertices, it makes sense to
```
```
           compose a digraph G with itself. Then if we let G n denote the composition of G
```
```
           with itself n times, it’s easy to check (see Problem 10.11) that G n is the length-n
```
```
           walk relation:
```
```

                          a Gn b       iff    there is a length n walk in G from a to b:
```
```
              2 The reversal of the order of R and S in (10.8) is not a typo. This is so that relational composition
```
```

           generalizes function composition. The value of function f composed with function g at an argument
```
```
           x is f .g.x//. So in the composition f ı g, the function g is applied first.
```
```
                 

           10.5. Directed Acyclic Graphs & Scheduling                                              431
```
```

           This even works for n D 0, with the usual convention that G 0 is the identity relation
```
```
           IdV .G/ on the set of vertices.3 Since there is a walk iff there is a path, and every
```
```
           path is of length at most jV .G/j 1, we now have4
```
```

                  G  D G 0 [ G 1 [ G 2 [ : : : [ G jV .G/j 1 D .G [ G 0 /jV .G/j 1 :            (10.9)
```
```

           The final equality points to the use of repeated squaring as a way to compute G 
```
```
           with log n rather than n 1 compositions of relations.
```

### 10.5 Directed Acyclic Graphs & Scheduling
```
           Some of the prerequisites of MIT computer science subjects are shown in Fig-
```
```
           ure 10.6. An edge going from subject s to subject t indicates that s is listed in the
```
```
           catalogue as a direct prerequisite of t. Of course, before you can take subject t ,
```
```
           you have to take not only subject s, but also all the prerequisites of s, and any pre-
```
```
           requisites of those prerequisites, and so on. We can state this precisely in terms of
```
```
           the positive walk relation: if D is the direct prerequisite relation on subjects, then
```
```
           subject u has to be completed before taking subject v iff u D C v.
```
```
             Of course it would take forever to graduate if this direct prerequisite graph had
```
```
           a positive length closed walk. We need to forbid such closed walks, which by
```
```
           Lemma 10.2.6 is the same as forbidding cycles. So, the direct prerequisite graph
```
```
           among subjects had better be acyclic:
```
```

           Definition 10.5.1. A directed acyclic graph (DAG) is a directed graph with no
```
```
           cycles.
```
```

              DAGs have particular importance in computer science. They capture key con-
```
```
           cepts used in analyzing task scheduling and concurrency control. When distributing
```
```
           a program across multiple processors, we’re in trouble if one part of the program
```
```
           needs an output that another part hasn’t generated yet! So let’s examine DAGs and
```
```
           their connection to scheduling in more depth.
```
```
              3 The identity relation Id on a set A is the equality relation:
```
```
                                        A
```
```

                                                   a IdA b    iff a D b;
```
```

           for a; b 2 A.
```
```
               4 Equation (10.9) involves a harmless abuse of notation: we should have written
```
```

                                        graph.G  / D graph.G 0 / [ graph.G 1 / : : : :
```
```
              

## 432 Chapter 10              Directed graphs & Partial Orders
```
```

                                  New 6-3: SB in Computer Science and Engineering
```
```
       Subjects
```
```
                                                                                                                                       All subjects are 12 units
```
```
         ½+½                                           6.UAT
```
```
                                                       6.UAT                                           6.UAP
```
```
                                                                                                       6.UAP
```
```
                                                          66 units
```
```
                                                             units                                      66 units
```
```
                                                                                                           units
```
```

                                                                                                              Advanced
```
```
                                                                                                              Advanced Undergraduate
```
```
                                                                                                                       Undergraduate Subjects
```
```
                                                                                                                                     Subjects
```
```
          2                                                                                                   AUS
```
```
                                                                                                              AUS http://www.eecs.mit.edu/ug/newcurriculum/aus.html
```
```
                                                                                                                  http://www.eecs.mit.edu/ug/newcurriculum/aus.html
```
```

          1                                               Software
```
```
                                                          Software Lab
```
```
                                                                   Lab
```
```
                                     (http://www.eecs.mit.edu/ug/newcurriculum/verghese_6.005.html)
```
```
                                      (http://www.eecs.mit.edu/ug/newcurriculum/verghese_6.005.html)
```
```

          3                                                                                            6.033
```
```
                                                                                                       6.033                     6.034
```
```
                                                                                                                                 6.034                 6.046
```
```
                                                                                                                                                       6.046
```
```
         Header                                                                                        comp
```
```
                                                                                                       comp sys
```
```
                                                                                                            sys                   AI
```
```
                                                                                                                                  AI                 adv
```
```
                                                                                                                                                     adv algorithms
```
```
                                                                                                                                                         algorithms
```
```

          3                                                                                                        6.005*                        6.006*
```
```
        Foundation                                                                  6.004
```
```
                                                                                    6.004                          6.005*                        6.006*
```
```
                                                                              comp
```
```
                                                                              comp architecture
```
```
                                                                                   architecture                     software
```
```
                                                                                                                    software                     algorithms
```
```
                                                                                                                                                 algorithms
```
```

          2                                                                      6.01*
```
```
                                                                                 6.01*                             6.02*
```
```
        Introductory                                                                                               6.02*                     coreq
```
```
        (= 1 Institute Lab)
```
```
                                                                               intro
```
```
                                                                                intro EECS
```
```
                                                                                      EECS II                 intro
```
```
                                                                                                               intro EECS
```
```
                                                                                                                     EECS IIII
```
```

                                                                                                                     18.06 or 18.03
```
```

          2                                                                coreq
```
```
                                                                                                                   18.06
```
```
                                                                                                                   18.06              18.03
```
```
                                                                                                                                      18.03                   6.042
```
```
                                                                                                                                                              6.042
```
```
         Math
```
```
                                                                                                              linear
```
```
                                                                                                               linear algebra
```
```
                                                                                                                      algebra         diff
```
```
                                                                                                                                      diff eqs
```
```
                                                                                                                                           eqs           discrete
```
```
                                                                                                                                                         discrete math
```
```
                                                                                                                                                                  math
```
```
        (= 2 REST)
```
```

                                                                     8.02
```
```
                                                                     8.02                                                  Elementary
```
```
                                                                                                                           Elementary
```
```
                                                                                                                   exposure
```
```
                                                                                                                   exposure toto programming
```
```
                                                                                                                                 programming
```
```
      June 2009                     *new subject                                                                   (high
```
```
                                                                                                                    (high school, IAP,
```
```
                                                                                                                         school,   IAP, or
```
```
                                                                                                                                        or 6.00)
```
```
                                                                                                                                           6.00)
```
```

         Figure 10.6 Subject prerequisites for MIT Computer Science (6-3) Majors.
```
```
     

10.5. Directed Acyclic Graphs & Scheduling                                         433
```
```

                    left sock    right sock underwear         shirt
```
```

                                                      pants       tie
```
```

                    left shoe    right shoe    belt
```
```

                                                              jacket
```
```

      Figure 10.7 DAG describing which garments to put on before others.
```

#### 10.5.1 Scheduling
In a scheduling problem, there is a set of tasks, along with a set of constraints
specifying that starting certain tasks depends on other tasks being completed be-
forehand. We can map these sets to a digraph, with the tasks as the nodes and the
direct prerequisite constraints as the edges.
   For example, the DAG in Figure 10.7 describes how a man might get dressed
for a formal occasion. As we describe above, vertices correspond to garments and
edges specify which garments have to be put on before others.
   When faced with a set of prerequisites like this one, the most basic task is finding
an order in which to perform all the tasks, one at a time, while respecting the
dependency constraints. Ordering tasks in this way is known as topological sorting.

Definition 10.5.2. A topological sort of a finite DAG is a list of all the vertices
such that each vertex v appears earlier in the list than every other vertex reachable
from v.
```

   There are many ways to get dressed one item at a time while obeying the con-
```
straints of Figure 10.7. We have listed two such topological sorts in Figure 10.8. In
```
           

## 434 Chapter 10   Directed graphs & Partial Orders
```
```

                                   underwear               left sock
```
```
                                       shirt                  shirt
```
```
                                      pants                    tie
```
```
                                       belt               underwear
```
```
                                        tie               right sock
```
```
                                      jacket                 pants
```
```
                                    left sock             right shoe
```
```
                                   right sock                 belt
```
```
                                    left shoe                jacket
```
```
                                   right shoe              left shoe
```
```
                                       (a)                   (b)
```
```

      Figure 10.8     Two possible topological sorts of the prerequisites described in Fig-
```
```
      ure 10.7
```
```
                                                      .
```
```

      fact, we can prove that every finite DAG has a topological sort. You can think of
```
```
      this as a mathematical proof that you can indeed get dressed in the morning.
```
```
         Topological sorts for finite DAGs are easy to construct by starting from minimal
```
```
      elements:
```
```

      Definition 10.5.3. An vertex v of a DAG D is minimum iff every other vertex is
```
```
      reachable from v.
```
```
         A vertex v is minimal iff v is not reachable from any other vertex.
```
```

         It can seem peculiar to use the words “minimum” and “minimal” to talk about
```
```
      vertices that start paths. These words come from the perspective that a vertex is
```
```
      “smaller” than any other vertex it connects to. We’ll explore this way of thinking
```
```
      about DAGs in the next section, but for now we’ll use these terms because they are
```
```
      conventional.
```
```
         One peculiarity of this terminology is that a DAG may have no minimum element
```
```
      but lots of minimal elements. In particular, the clothing example has four minimal
```
```
      elements: leftsock, rightsock, underwear, and shirt.
```
```
         To build an order for getting dressed, we pick one of these minimal elements—
```
```
      say, shirt. Now there is a new set of minimal elements; the three elements we didn’t
```
```
      chose as step 1 are still minimal, and once we have removed shirt, tie becomes
```
```
      minimal as well. We pick another minimal element, continuing in this way until all
```
```
      elements have been picked. The sequence of elements in the order they were picked
```
```
      will be a topological sort. This is how the topological sorts above were constructed.
```
```
         So our construction shows:
```
```
      

10.5. Directed Acyclic Graphs & Scheduling                                                         435
```

Theorem 10.5.4. Every finite DAG has a topological sort.
   There are many other ways of constructing topological sorts. For example, in-
stead of starting from the minimal elements at the beginning of paths, we could
build a topological sort starting from maximal elements at the end of paths. In fact,
we could build a topological sort by picking vertices arbitrarily from a finite DAG
and simply inserting them into the list wherever they will fit.5

#### 10.5.2 Parallel Task Scheduling
For task dependencies, topological sorting provides a way to execute tasks one after
another while respecting those dependencies. But what if we have the ability to
execute more than one task at the same time? For example, say tasks are programs,
the DAG indicates data dependence, and we have a parallel machine with lots of
processors instead of a sequential machine with only one. How should we schedule
the tasks? Our goal should be to minimize the total time to complete all the tasks.
For simplicity, let’s say all the tasks take the same amount of time and all the
processors are identical.
   So given a finite set of tasks, how long does it take to do them all in an optimal
parallel schedule? We can use walk relations on acyclic graphs to analyze this
problem.
   In the first unit of time, we should do all minimal items, so we would put on our
left sock, our right sock, our underwear, and our shirt.6 In the second unit of time,
we should put on our pants and our tie. Note that we cannot put on our left or right
shoe yet, since we have not yet put on our pants. In the third unit of time, we should
put on our left shoe, our right shoe, and our belt. Finally, in the last unit of time,
we can put on our jacket. This schedule is illustrated in Figure 10.9.
   The total time to do these tasks is 4 units. We cannot do better than 4 units of
time because there is a sequence of 4 tasks that must each be done before the next.
We have to put on a shirt before pants, pants before a belt, and a belt before a jacket.
Such a sequence of items is known as a chain.
Definition 10.5.5. Two vertices in a DAG are comparable when one of them is
reachable from the other. A chain in a DAG is a set of vertices such that any two of
them are comparable. A vertex in a chain that is reachable from all other vertices
in the chain is called a maximum element of the chain. A finite chain is said to end
at its maximum element.
   5 Topolgical sorts can be generalized and shown to exist even for infinite DAGs, but you’ll be

relieved to know that we have no need to go into this.
```
    6 Yes, we know that you can’t actually put on both socks at once, but imagine you are being dressed
```

by a bunch of robot processors and you are in a big hurry. Still not working for you? Ok, forget about
the clothes and imagine they are programs with the precedence constraints shown in Figure 10.7.
```
           

## 436 Chapter 10   Directed graphs & Partial Orders
```
```

                   A1             left sock    right sock underwear        shirt
```
```

                    A2                                             pants       tie
```
```

                   A3             left shoe    right shoe   belt
```
```

                   A4                                                      jacket
```
```

      Figure 10.9 A parallel schedule for the tasks-getting-dressed digraph in Fig-
```
```
      ure 10.7. The tasks in Ai can be performed in step i for 1  i  4. A chain
```
```
      of 4 tasks (the critical path in this example) is shown with bold edges.
```
```
      

10.5. Directed Acyclic Graphs & Scheduling                                                       437
```
```

   The time it takes to schedule tasks, even with an unlimited number of processors,
```
is at least as large as the number of vertices in any chain. That’s because if we used
less time than the size of some chain, then two items from the chain would have to
be done at the same step, contradicting the precedence constraints. For this reason,
a largest chain is also known as a critical path. For example, Figure 10.9 shows
the critical path for the getting-dressed digraph.
   In this example, we were able to schedule all the tasks with t steps, where t is
the size of the largest chain. A nice feature of DAGs is that this is always possible!
In other words, for any DAG, there is a legal parallel schedule that runs in t total
steps.
   In general, a schedule for performing tasks specifies which tasks to do at succes-
sive steps. Every task a has to be scheduled at some step, and all the tasks that have
to be completed before task a must be scheduled for an earlier step.
   Let’s be precise about the definition of schedule.
Definition 10.5.6. A partition of a set A is a set of nonempty subsets of A called
the blocks7 of the partition, such that every element of A is in exactly one block.
  For example, one possible partition of the set fa; b; c; d; eg into three blocks is
```
                                  fa; cg       fb; eg       fd g:
```
Definition 10.5.7. A parallel schedule for a DAG D is a partition of V .D/ into
blocks A0 ; A1 ; : : : ; such that when j < k, no vertex in Aj is reachable from any
vertex in Ak . The block Ak is called the set of elements scheduled at step k, and the
time of the schedule is the number of blocks. The maximum number of elements
scheduled at any step is called the number of processors required by the schedule.
   A largest chain ending at an element a is called a critical path to a, and the
number of elements less than a in the chain is called the depth of a. So in any
possible parallel schedule, there must be at least depth .a/ steps before task a can
be started. In particular, the minimal elements are precisely the elements with depth
0.
   There is a very simple schedule that completes every task in its minimum num-
ber of steps: just use a “greedy” strategy of performing tasks as soon as possible.
Schedule all the elements of depth k at step k. That’s how we found the above
schedule for getting dressed.
Theorem 10.5.8. A minimum time schedule for a finite DAG D consists of the sets
A0 ; A1 ; : : : ; where
```
                           Ak WWD fa 2 V .D/ j depth .a/ D kg:
```
   7 We think it would be nicer to call them the parts of the partition, but “blocks” is the standard

terminology.
```
            

## 438 Chapter 10    Directed graphs & Partial Orders
```
```

        We’ll leave to Problem 10.25 the proof that the sets Ak are a parallel schedule
```
```
      according to Definition 10.5.7. We can summarize the story above in this way: with
```
```
      an unlimited number of processors, the parallel time to complete all tasks is simply
```
```
      the size of a critical path:
```
```
      Corollary 10.5.9. Parallel time = size of critical path.
```
```
        Things get more complex when the number of processors is bounded; see Prob-
```
```
      lem 10.26 for an example.
```
```

      10.5.3       Dilworth’s Lemma
```
```
      Definition 10.5.10. An antichain in a DAG is a set of vertices such that no two ele-
```
```
      ments in the set are comparable—no walk exists between any two different vertices
```
```
      in the set.
```
```
         Our conclusions about scheduling also tell us something about antichains.
```
```
      Corollary 10.5.11. In a DAG D if the size of the largest chain is t , then V .D/ can
```
```
      be partitioned into t antichains.
```
```
      Proof. Let the antichains be the sets Ak WWD fa 2 V .D/ j depth .a/ D kg. It is an
```
```
      easy exercise to verify that each Ak is an antichain (Problem 10.25).           
```
```

         Corollary 10.5.11 implies8 a famous result about acyclic digraphs:
```
```
      Lemma 10.5.12 (Dilworth). For all t > 0, every DAG with n vertices must have
```
```
      either a chain of size greater than t or an antichain of size at least n=t.
```
```
      Proof. Assume that there is no chain of size greater than t . Let ` be the size of
```
```
      the largest antichain. If we make a parallel schedule according to the proof of
```
```
      Corollary 10.5.11, we create a number of antichains equal to the size of the largest
```
```
      chain, which is less than or equal t . Each element belongs to exactly one antichain,
```
```
      none of which are larger than `. So the total number of elements is at most ` times
```
```
      t—that is, `t  n. Simple division implies that `  n=t.                           
```
```
                                                                                       p
```
```
      Corollary 10.5.13. Every DAG with n vertices has a chain of size greater than n
```
```
                                      p
```
```
      or an antichain of size at least n.
```
```
                      p
```
```
      Proof. Set t D n in Lemma 10.5.12.                                                 
```
```

      Example 10.5.14. When the man in our example is getting dressed, n D 10.
```
```
        Try t D 3. There is a chain of size 4.
```
```
        Try t D 4. There is no chain of size 5, but there is an antichain of size 4  10=4.
```
```
         8 Lemma 10.5.12 also follows from a more general result known as Dilworth’s Theorem, which
```
```

      we will not discuss.
```
```
                  

            10.6. Partial Orders                                                                  439
```

### 10.6 Partial Orders
```
            After mapping the “direct prerequisite” relation onto a digraph, we were then able
```
```
            to use the tools for understanding computer scientists’ graphs to make deductions
```
```
            about something as mundane as getting dressed. This may or may not have im-
```
```
            pressed you, but we can do better. In the introduction to this chapter, we mentioned
```
```
            a useful fact that bears repeating: any digraph is formally the same as a binary
```
```
            relation whose domain and codomain are its vertices. This means that any binary
```
```
            relation whose domain is the same as its codomain can be translated into a digraph!
```
```
            Talking about the edges of a binary relation or the image of a set under a digraph
```
```
            may seem odd at first, but doing so will allow us to draw important connections
```
```
            between different types of relations. For instance, we can apply Dilworth’s lemma
```
```
            to the “direct prerequisite” relation for getting dressed, because the graph of that
```
```
            relation was a DAG.
```
```
               But how can we tell if a binary relation is a DAG? And once we know that a
```
```
            relation is a DAG, what exactly can we conclude? In this section, we will abstract
```
```
            some of the properties that a binary relation might have, and use those properties
```
```
            to define classes of relations. In particular, we’ll explain this section’s title, partial
```
```
            orders.
```
```

            10.6.1     The Properties of the Walk Relation in DAGs
```
```
            To begin, let’s talk about some features common to all digraphs. Since merging a
```
```
            walk from u to v with a walk from v to w gives a walk from u to w, both the walk
```
```
            and positive walk relations have a relational property called transitivity:
```
```

            Definition 10.6.1. A binary relation R on a set A is transitive iff
```
```

                                    .a R b AND b R c/ IMPLIES a R c
```
```

              for every a; b; c 2 A.
```
```

              So we have
```
```

            Lemma 10.6.2. For any digraph G the walk relations G C and G  are transitive.
```
```

              Since there is a length zero walk from any vertex to itself, the walk relation has
```
```
            another relational property called reflexivity:
```
```

            Definition 10.6.3. A binary relation R on a set A is reflexive iff a R a for all a 2 A.
```
```

              Now we have
```
```
           

## 440 Chapter 10    Directed graphs & Partial Orders
```
```

      Lemma 10.6.4. For any digraph G, the walk relation G  is reflexive.
```
```

        We know that a digraph is a DAG iff it has no positive length closed walks. Since
```
```
      any vertex on a closed walk can serve as the beginning and end of the walk, saying
```
```
      a graph is a DAG is the same as saying that there is no positive length path from
```
```
      any vertex back to itself. This means that the positive walk relation D C of a DAG
```
```
      has a relational property called irreflexivity.
```
```

      Definition 10.6.5. A binary relation R on a set A is irreflexive iff
```
```

                                               NOT .a R a/
```
```

      for all a 2 A.
```
```

        So we have
```
```

      Lemma 10.6.6. R is a DAG iff RC is irreflexive.
```
```

      10.6.2       Strict Partial Orders
```
```
      Here is where we begin to define interesting classes of relations:
```
```

      Definition 10.6.7. A relation that is transitive and irreflexive is called a strict par-
```
```
      tial order.
```
```

        A simple connection between strict partial orders and DAGs now follows from
```
```
      Lemma 10.6.6:
```
```

      Theorem 10.6.8. A relation R is a strict partial order iff R is the positive walk
```
```
      relation of a DAG.
```
```

         Strict partial orders come up in many situations which on the face of it have
```
```
      nothing to do with digraphs. For example, the less-than order < on numbers is a
```
```
      strict partial order:
```
```

           if x < y and y < z then x < z, so less-than is transitive, and
```
```

           NOT.x < x/, so less-than is irreflexive.
```
```

      The proper containment relation  is also a partial order:
```
```

           if A  B and B  C then A  C , so containment is transitive, and
```
```

           NOT.A  A/, so proper containment is irreflexive.
```
```
      

10.6. Partial Orders                                                                 441
```
```

   If there are two vertices that are reachable from each other, then there is a posi-
```
tive length closed walk that starts at one vertex, goes to the other, and then comes
back. So DAGs are digraphs in which no two vertices are mutually reachable. This
corresponds to a relational property called asymmetry.

Definition 10.6.9. A binary relation R on a set A is asymmetric iff
```

                                   a R b IMPLIES NOT.b R a/
```

for all a; b 2 A.

  So we can also characterize DAGs in terms of asymmetry:

Corollary 10.6.10. A digraph D is a DAG iff D C is asymmetric.

  Corollary 10.6.10 and Theorem 10.6.8 combine to give

Corollary 10.6.11. A binary relation R on a set A is a strict partial order iff it is
transitive and asymmetric.9
```

   A strict partial order may be the positive walk relation of different DAGs. This
```
raises the question of finding a DAG with the smallest number of edges that deter-
mines a given strict partial order. For finite strict partial orders, the smallest such
DAG turns out to be unique and easy to find (see Problem 10.31).

#### 10.6.3 Weak Partial Orders
The less-than-or-equal relation  is at least as familiar as the less-than strict partial
order, and the ordinary containment relation  is even more common than the
proper containment relation. These are examples of weak partial orders, which are
just strict partial orders with the additional condition that every element is related
to itself. To state this precisely, we have to relax the asymmetry property so it
does not apply when a vertex is compared to itself; this relaxed property is called
antisymmetry:

Definition 10.6.12. A binary relation R on a set A, is antisymmetric iff, for all
a ¤ b 2 A,
```
                         a R b IMPLIES NOT.b R a/
```

  Now we can give an axiomatic definition of weak partial orders that parallels the
definition of strict partial orders.
   9 Some texts use this corollary to define strict partial orders.
```
                 

## 442 Chapter 10    Directed graphs & Partial Orders
```
```

           Definition 10.6.13. A binary relation on a set is a weak partial order iff it is tran-
```
```
           sitive, reflexive, and antisymmetric.
```
```
              The following lemma gives another characterization of weak partial orders that
```
```
           follows directly from this definition.
```
```
           Lemma 10.6.14. A relation R on a set A is a weak partial order iff there is a strict
```
```
           partial order S on A such that
```
```
                                         aRb        iff   .a S b OR a D b/;
```
```
           for all a; b 2 A.
```
```
             Since a length zero walk goes from a vertex to itself, this lemma combined with
```
```
           Theorem 10.6.8 yields:
```
```
           Corollary 10.6.15. A relation is a weak partial order iff it is the walk relation of a
```
```
           DAG.
```
```
             For weak partial orders in general, we often write an ordering-style symbol like
```
```
            or v instead of a letter symbol like R.10 Likewise, we generally use  or @ to
```
```
           indicate a strict partial order.
```
```
             Two more examples of partial orders are worth mentioning:
```
```
           Example 10.6.16. Let A be some family of sets and define a R b iff a  b. Then
```
```
           R is a strict partial order.
```
```
           Example 10.6.17. The divisibility relation is a weak partial order on the nonnega-
```
```
           tive integers.
```
```
             For practice with the definitions, you can check that two more examples are
```
```
           vacuously partial orders on a set D: the identity relation IdD is a weak partial
```
```
           order, and the empty relation—the relation with no arrows—is a strict partial order.
```
```
             Note that some authors define “partial orders” to be what we call weak partial
```
```
           orders. However, we’ll use the phrase “partial order” to mean a relation that may
```
```
           be either a weak or strict partial order.
```

### 10.7 Representing Partial Orders by Set Containment
```
           Axioms can be a great way to abstract and reason about important properties of
```
```
           objects, but it helps to have a clear picture of the things that satisfy the axioms.
```
```
             10 General relations are usually denoted by a letter like R instead of a cryptic squiggly symbol, so
```
```

            is kind of like the musical performer/composer Prince, who redefined the spelling of his name to
```
```
           be his own squiggly symbol. A few years ago he gave up and went back to the spelling “Prince.”
```
```
      

10.7. Representing Partial Orders by Set Containment                                  443
```

DAGs provide one way to picture partial orders, but it also can help to picture them
in terms of other familiar mathematical objects. In this section, we’ll show that
every partial order can be pictured as a collection of sets related by containment.
That is, every partial order has the “same shape” as such a collection. The technical
word for “same shape” is “isomorphic.”
Definition 10.7.1. A binary relation R on a set A is isomorphic to a relation S on
a set B iff there is a relation-preserving bijection from A to B; that is, there is a
bijection f W A ! B such that for all a; a0 2 A,
```

                              a R a0      iff   f .a/ S f .a0 /:
```

  To picture a partial order  on a set A as a collection of sets, we simply represent
each element A by the set of elements that are  to that element, that is,
```

                                a       ! fb 2 A j b  ag:
```

For example, if  is the divisibility relation on the set of integers f1; 3; 4; 6; 8; 12g,
then we represent each of these integers by the set of integers in A that divide it. So
```

                                    1    ! f1g
```
```
                                    3    ! f1; 3g
```
```
                                    4    ! f1; 4g
```
```
                                    6    ! f1; 3; 6g
```
```
                                    8    ! f1; 4; 8g
```
```
                                 12      ! f1; 3; 4; 6; 12g
```

So, the fact that 3 j 12 corresponds to the fact that f1; 3g  f1; 3; 4; 6; 12g.
   In this way we have completely captured the weak partial order  by the subset
relation on the corresponding sets. Formally, we have
Lemma 10.7.2. Let  be a weak partial order on a set A. Then  is isomorphic
to the subset relation  on the collection of inverse images under the  relation of
elements a 2 A.
  We leave the proof to Problem 10.37. Essentially the same construction shows
that strict partial orders can be represented by sets under the proper subset relation,
 (Problem 10.38). To summarize:
Theorem 10.7.3. Every weak partial order  is isomorphic to the subset relation
 on a collection of sets.
  Every strict partial order  is isomorphic to the proper subset relation  on a
collection of sets.
```
                 

## 444 Chapter 10    Directed graphs & Partial Orders
```

### 10.8 Linear Orders
```
           The familiar order relations on numbers have an important additional property:
```
```
           given two different numbers, one will be bigger than the other. Partial orders with
```
```
           this property are said to be linear orders. You can think of a linear order as one
```
```
           where all the elements are lined up so that everyone knows exactly who is ahead
```
```
           and who is behind them in the line.11
```
```
           Definition 10.8.1. Let R be a binary relation on a set A and let a; b be elements
```
```
           of A. Then a and b are comparable with respect to R iff Œa R b OR b R a.
```
```
           A partial order for which every two different elements are comparable is called a
```
```
           linear order.
```
```
              So < and  are linear orders on R. On the other hand, the subset relation is
```
```
           not linear, since, for example, any two different finite sets of the same size will be
```
```
           incomparable under . The prerequisite relation on Course 6 required subjects is
```
```
           also not linear because, for example, neither 8.01 nor 6.042 is a prerequisite of the
```
```
           other.
```

### 10.9 Product Orders
```
           Taking the product of two relations is a useful way to construct new relations from
```
```
           old ones.
```
```
           Definition 10.9.1. The product R1  R2 of relations R1 and R2 is defined to be
```
```
           the relation with
```
```
                               domain.R1  R2 / WWD domain.R1 /  domain.R2 /;
```
```
                            codomain.R1  R2 / WWD codomain.R1 /  codomain.R2 /;
```
```
                   .a1 ; a2 / .R1  R2 / .b1 ; b2 /       iff   Œa1 R1 b1 and a2 R2 b2 :
```
```
              It follows directly from the definitions that products preserve the properties of
```
```
           transitivity, reflexivity, irreflexivity, and antisymmetry (see Problem 10.52). If R1
```
```
           and R2 both have one of these properties, then so does R1  R2 . This implies that
```
```
           if R1 and R2 are both partial orders, then so is R1  R2 .
```
```
             11 Linear orders are often called “total” orders, but this terminology conflicts with the definition of
```
```

           “total relation,” and it regularly confuses students.
```
```
              Being a linear order is a much stronger condition than being a partial order that is a total relation.
```
```
           For example, any weak partial order is a total relation but generally won’t be linear.
```
```
                

           10.10. Equivalence Relations                                                        445
```
```

           Example 10.9.2. Define a relation Y on age-height pairs of being younger and
```
```
           shorter. This is the relation on the set of pairs .y; h/ where y is a nonnegative
```
```
           integer  2400 that we interpret as an age in months, and h is a nonnegative integer
```
```
            120 describing height in inches. We define Y by the rule
```
```
                            .y1 ; h1 / Y .y2 ; h2 / iff y1  y2 AND h1  h2 :
```
```
           That is, Y is the product of the -relation on ages and the -relation on heights.
```
```
              Since both ages and heights are ordered numerically, the age-height relation Y is
```
```
           a partial order. Now suppose we have a class of 101 students. Then we can apply
```
```
           Dilworth’s lemma 10.5.12 to conclude that there is a chain of 11 students—that is,
```
```
           11 students who get taller as they get older–or an antichain of 11 students—that is,
```
```
           11 students who get taller as they get younger, which makes for an amusing in-class
```
```
           demo.
```
```
              On the other hand, the property of being a linear order is not preserved. For
```
```
           example, the age-height relation Y is the product of two linear orders, but it is not
```
```
           linear: the age 240 months, height 68 inches pair, (240,68), and the pair (228,72)
```
```
           are incomparable under Y .
```

### 10.10 Equivalence Relations
```
           Definition 10.10.1. A relation R on a set A is symmetric when
```
```
                                     8x; y 2 A: x R y IMPLIES y R x:
```
```
           A relation is an equivalence relation iff it is reflexive, symmetric, and transitive.
```
```
             Congruence modulo n is an important example of an equivalence relation:
```
```
                It is reflexive because x  x .mod n/.
```
```
                It is symmetric because x  y .mod n/ implies y  x .mod n/.
```
```
                It is transitive because x  y .mod n/ and y  z .mod n/ imply that x  z
```
```
                 .mod n/.
```
```
           There is an even more well-known example of an equivalence relation: equality
```
```
           itself.
```
```
              If we think of a total function f as attaching a label to each element in its domain,
```
```
           then “having the same label” defines an equivalence relation. More precisely, if f
```
```
           is a total function, we can define a basic equivalence relation f on the domain of
```
```
           f as follows:
```
```
           

## 446 Chapter 10   Directed graphs & Partial Orders
```
```

      Definition 10.10.2. If f is a total function, the relation f on domain.f / is de-
```
```
      fined by the rule:
```
```
                                  a f b IFF f .a/ D f .b/:
```
```

         The relation f inherits the properties of reflexivity, symmetry and transitivity
```
```
      from the corresponding properties of the equality relation. So f is indeed an
```
```
      equivalence relation. This observation gives another way to see that congruence
```
```
      modulo n is an equivalence relation: the Remainder Lemma 9.6.1 implies that
```
```
      congruence modulo n is the same as r where r.a/ is the remainder of a divided
```
```
      by n.
```
```
         In fact, a relation is an equivalence relation iff it equals f for some total func-
```
```
      tion f (see Problem 10.58). So every equivalence relation can actually be under-
```
```
      stood as being the relation of “having the same label” according to some labelling
```
```
      scheme.
```
```

      10.10.1      Equivalence Classes
```
```
      Equivalence relations are closely related to partitions because the images of ele-
```
```
      ments under an equivalence relation are the blocks of a partition.
```
```

      Definition 10.10.3. Given an equivalence relation R W A ! A, the equivalence
```
```
      class ŒaR of an element a 2 A is the set of all elements of A related to a by R.
```
```
      Namely,
```
```
                                 ŒaR WWD fx 2 A j a R xg:
```
```

        In other words, ŒaR is the image R.a/.
```
```
        For example, suppose that A D Z and a R b means that a  b .mod 5/. Then
```
```

                               Œ7R D f: : : ; 3; 2; 7; 12; 17; 22; : : :g:
```
```

      Notice that each of the elements in Œ7R defines have this same equivalence class;
```
```
      that is, Œ7R D Œ 3R D Œ2R D Œ12R D    .
```
```
         There is an exact correspondence between equivalence relations on A and parti-
```
```
      tions of A. Namely, given any partition of a set, being in the same block is obviously
```
```
      an equivalence relation. On the other hand we have:
```
```

      Theorem 10.10.4. The equivalence classes of an equivalence relation on a set A
```
```
      are the blocks of a partition of A.
```
```

        We’ll leave the proof of Theorem 10.10.4 as a basic exercise in axiomatic rea-
```
```
      soning (see Problem 10.57), but let’s look at an example. The congruent-mod-5
```
```
                

           10.11. Summary of Relational Properties                                         447
```
```

           relation partitions the integers into five equivalence classes:
```
```

                                         f: : : ; 5; 0; 5; 10; 15; 20; : : :g
```
```
                                         f: : : ; 4; 1; 6; 11; 16; 21; : : :g
```
```
                                         f: : : ; 3; 2; 7; 12; 17; 22; : : :g
```
```
                                         f: : : ; 2; 3; 8; 13; 18; 23; : : :g
```
```
                                         f: : : ; 1; 4; 9; 14; 19; 24; : : :g
```
```

           In these terms, x  y .mod 5/ is equivalent to the assertion that x and y are both
```
```
           in the same block of this partition. For example, 6  16 .mod 5/, because they’re
```
```
           both in the second block, but 2 6 9 .mod 5/ because 2 is in the third block while
```
```
           9 is in the last block.
```
```
              In social terms, if “likes” were an equivalence relation, then everyone would be
```
```
           partitioned into cliques of friends who all like each other and no one else.
```

### 10.11 Summary of Relational Properties
```
           A relation R W A ! A is the same as a digraph with vertices A.
```
```

           Reflexivity R is reflexive when
```
```

                                                     8x 2 A: x R x:
```
```

                  Every vertex in R has a self-loop.
```
```

           Irreflexivity R is irreflexive when
```
```

                                                 NOT Œ9x 2 A: x R x:
```
```

                  There are no self-loops in R.
```
```

           Symmetry R is symmetric when
```
```

                                         8x; y 2 A: x R y IMPLIES y R x:
```
```

                  If there is an edge from x to y in R, then there is an edge back from y to x
```
```
                  as well.
```
```
           

## 448 Chapter 10   Directed graphs & Partial Orders
```
```

      Asymmetry R is asymmetric when
```
```

                                 8x; y 2 A: x R y IMPLIES NOT.y R x/:
```
```

            There is at most one directed edge between any two vertices in R, and there
```
```
            are no self-loops.
```
```

      Antisymmetry R is antisymmetric when
```
```

                               8x ¤ y 2 A: x R y IMPLIES NOT.y R x/:
```
```

            Equivalently,
```
```

                           8x; y 2 A: .x R y AND y R x/ IMPLIES x D y:
```
```

            There is at most one directed edge between any two distinct vertices, but
```
```
            there may be self-loops.
```
```

      Transitivity R is transitive when
```
```

                           8x; y; z 2 A: .x R y AND y R z/ IMPLIES x R z:
```
```

            If there is a positive length path from u to v, then there is an edge from u
```
```
            to v.
```
```

      Linear R is linear when
```
```

                                     8x ¤ y 2 A: .x R y OR y R x/
```
```

            Given any two vertices in R, there is an edge in one direction or the other
```
```
            between them.
```
```

      Strict Partial Order R is a strict partial order iff R is transitive and irreflexive iff
```
```
            R is transitive and asymmetric iff it is the positive length walk relation of a
```
```
            DAG.
```
```

      Weak Partial Order R is a weak partial order iff R is transitive and anti-symmetric
```
```
          and reflexive iff R is the walk relation of a DAG.
```
```

      Equivalence Relation R is an equivalence relation iff R is reflexive, symmetric
```
```
           and transitive iff R equals the in-the-same-block-relation for some partition
```
```
           of domain.R/.
```
```
                

           10.12. References                                                                449
```

### 10.12 References
```
           [9], [15], [24], [27], [29]
```

Problems for Section 10.1
```
           Practice Problems
```
```
           Problem 10.1.
```
```
           Let S be a nonempty set of size n 2 ZC , and let f W S ! S be total function. Let
```
```
           Df be the digraph with vertices S whose edges are fhs ! f .s/i j s 2 S g.
```
```
            (a) What are the possible values of the out-degrees of vertices of Df ?
```
```

            (b) What are the possible values of the in-degrees of the vertices?
```
```

            (c) Suppose f is a surjection. Now what are the possible values of the in-degrees
```
```
           of the vertices?
```
```

           Exam Problems
```
```
           Problem 10.2.
```
```
           The proof of the Handshaking Lemma 10.1.2 invoked the “obvious” fact that in any
```
```
           finite digraph, the sum of the in-degrees of the vertices equals the number of arrows
```
```
           in the graph. That is,
```
```
           Claim. For any finite digraph G
```
```
                                      X
```
```
                                                   indeg.v/ D j graph.G/j;              (10.10)
```
```
                                         v2V .G/
```
```

             But this Claim might not be obvious to everyone. So prove it by induction on the
```
```
           number j graph.G/j of arrows.
```

Problems for Section 10.2
```
           Practice Problems
```
```
           Problem 10.3.
```
```
           Lemma 10.2.5 states that dist .u; v/  dist .u; x/ C dist .x; v/. It also states that
```