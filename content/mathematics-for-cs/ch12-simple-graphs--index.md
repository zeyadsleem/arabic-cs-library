---
title: "Simple Graphs"
lang: en
---

## 12 Simple Graphs
```
           Simple graphs model relationships that are symmetric, meaning that the relationship
```
```
           is mutual. Examples of such mutual relationships are being married, speaking the
```
```
           same language, not speaking the same language, occurring during overlapping time
```
```
           intervals, or being connected by a conducting wire. They come up in all sorts of
```
```
           applications, including scheduling, constraint satisfaction, computer graphics, and
```
```
           communications, but we’ll start with an application designed to get your attention:
```
```
           we are going to make a professional inquiry into sexual behavior. Specifically,
```
```
           we’ll look at some data about who, on average, has more opposite-gender partners:
```
```
           men or women.
```
```
              Sexual demographics have been the subject of many studies. In one of the largest,
```
```
           researchers from the University of Chicago interviewed a random sample of 2500
```
```
           people over several years to try to get an answer to this question. Their study,
```
```
           published in 1994 and entitled The Social Organization of Sexuality, found that
```
```
           men have on average 74% more opposite-gender partners than women.
```
```
              Other studies have found that the disparity is even larger. In particular, ABC
```
```
           News claimed that the average man has 20 partners over his lifetime, and the av-
```
```
           erage woman has 6, for a percentage disparity of 233%. The ABC News study,
```
```
           aired on Primetime Live in 2004, purported to be one of the most scientific ever
```
```
           done, with only a 2.5% margin of error. It was called “American Sex Survey: A
```
```
           peek between the sheets”—raising some questions about the seriousness of their
```
```
           reporting.
```
```
              Yet again in August, 2007, the New York Times reported on a study by the
```
```
           National Center for Health Statistics of the U.S. government showing that men had
```
```
           seven partners while women had four. So, whose numbers do you think are more
```
```
           accurate: the University of Chicago, ABC News, or the National Center?
```
```
              Don’t answer—this is a trick question designed to trip you up. Using a little
```
```
           graph theory, we’ll explain why none of these findings can be anywhere near the
```
```
           truth.
```

### 12.1 Vertex Adjacency and Degrees
```
           Simple graphs are defined in almost the same way as digraphs, except that edges are
```
```
           undirected—they connect two vertices without pointing in either direction between
```
```
           the vertices. So instead of a directed edge hv ! wi which starts at vertex v and
```
```
           

## 502 Chapter 12   Simple Graphs
```
```

      ends at vertex w, a simple graph only has an undirected edge hv—wi that connects
```
```
      v and w.
```
```
      Definition 12.1.1. A simple graph G consists of a nonempty set, V .G/, called the
```
```
      vertices of G, and a set E.G/ called the edges of G. An element of V .G/ is called
```
```
      a vertex. An element of E.G/ is an undirected edge or simply an “edge.” An
```
```
      undirected edge has two vertices u ¤ v called its endpoints. Such an edge can be
```
```
      represented by the two element set fu; vg. The notation hu—vi denotes this edge.
```
```
         Both hu—vi and hv—ui describe the same undirected edge, whose endpoints
```
```
      are u and v.
```
```
                                          b                                  h
```
```

                             a           f               d
```
```

                                                                  g              i
```
```
                                         c           e
```
```

              Figure 12.1 An example of a graph with 9 vertices and 8 edges.
```
```

        For example, let H be the graph pictured in Figure 12.1. The vertices of H
```
```
      correspond to the nine dots in Figure 12.1, that is,
```
```

                                   V .H / D fa; b; c; d; e; f; g; h; i g :
```
```

      The edges correspond to the eight lines, that is,
```
```

      E.H / D f ha—bi ; ha—ci ; hb—d i ; hc—d i ; hc—ei ; he—f i ; he—gi ; hh—i i g:
```
```

      Mathematically, that’s all there is to the graph H .
```
```
      Definition 12.1.2. Two vertices in a simple graph are said to be adjacent iff they
```
```
      are the endpoints of the same edge, and an edge is said to be incident to each of its
```
```
      endpoints. The number of edges incident to a vertex v is called the degree of the
```
```
      vertex and is denoted by deg.v/. Equivalently, the degree of a vertex is the number
```
```
      of vertices adjacent to it.
```
```
         For example, for the graph H of Figure 12.1, vertex a is adjacent to vertex b, and
```
```
      b is adjacent to d . The edge ha—ci is incident to its endpoints a and c. Vertex h
```
```
      has degree 1, d has degree 2, and deg.e/ D 3. It is possible for a vertex to have
```
```
      degree 0, in which case it is not adjacent to any other vertices. A simple graph G
```
```
      does not need to have any edges at all. jE.G/j could be zero, implying that the
```
```
                 

           12.2. Sexual Demographics in America                                                              503
```
```

           degree of every vertex would also be zero. But a simple graph must have at least
```
```
           one vertex—jV .G/j is required to be at least one.
```
```
              Note that in a simple graph there cannot be more than one edge between the
```
```
           same two vertices.1 Also self-loops—edges that begin and at the same vertex—are
```
```
           not allowed in simple graphs.
```
```
              For the rest of this chapter we’ll use “graphs” as an abbreviation for “simple
```
```
           graphs.”
```
```
              A synonym for “vertices” is “nodes,” and we’ll use these words interchangeably.
```
```
           Simple graphs are sometimes called networks, edges are sometimes called arcs or
```
```
           lines. We mention this as a “heads up” in case you look at other graph theory
```
```
           literature; we won’t use these words.
```

### 12.2 Sexual Demographics in America
```
           Let’s model the question of heterosexual partners in graph theoretic terms. To do
```
```
           this, we’ll let G be the graph whose vertices V are all the people in America. Then
```
```
           we split V into two separate subsets: M which contains all the males, and F which
```
```
           contains all the females.2 We’ll put an edge between a male and a female iff they
```
```
           have been sexual partners. This graph is pictured in Figure 12.2 with males on the
```
```
           left and females on the right.
```
```
              Actually, this is a pretty hard graph to figure out, let alone draw. The graph is
```
```
           enormous: the US population is about 300 million, so jV j  300M . Of these,
```
```
           approximately 50.8% are female and 49.2% are male, so jM j  147:6M , and
```
```
           jF j  152:4M . And we don’t even have trustworthy estimates of how many edges
```
```
           there are, let alone exactly which couples are adjacent. But it turns out that we
```
```
           don’t need to know any of this—we just need to figure out the relationship between
```
```
           the average number of partners per male and partners per female. To do this, we
```
```
           note that every edge has exactly one endpoint at an M vertex (remember, we’re
```
```
           only considering male-female relationships); so the sum of the degrees of the M
```
```
           vertices equals the number of edges. For the same reason, the sum of the degrees
```
```
           of the F vertices equals the number of edges. So these sums are equal:
```
```
                                         X              X
```
```
                                             deg.x/ D        deg.y/:
```
```
                                            x2M                y2F
```
```

           Now suppose we divide both sides of this equation by the product of the sizes of
```
```
              1 Multigraphs that have more than one edge with the same two endpoints are sometimes conve-
```
```

           nient, but they are not needed for the applications we present.
```
```
              2 For simplicity, we’ll ignore the possibility of someone being both a man and a woman, or neither.
```
```
           

## 504 Chapter 12   Simple Graphs
```
```

                                   M                              F
```
```

                               Figure 12.2 The sex partners graph.
```
```

      the two sets, jM j  jF j:
```
```
                                                       P              !
```
```
                                                         y2F deg.y/
```
```
                     P                 
```
```
                           x2M deg.x/          1                               1
```
```
                                                  D                      
```
```
                             jM j             jF j         jF j               jM j
```
```

      The terms above in parentheses are the average degree of an M vertex and the
```
```
      average degree of an F vertex. So we know:
```
```
                                                  jF j
```
```
                              Avg. deg in M D           Avg. deg in F               (12.1)
```
```
                                                  jM j
```
```
         In other words, we’ve proved that the average number of female partners of
```
```
      males in the population compared to the average number of males per female is
```
```
      determined solely by the relative number of males and females in the population.
```
```
         Now the Census Bureau reports that there are slightly more females than males
```
```
      in America; in particular jF j=jM j is about 1.035. So we know that males have
```
```
      on average 3.5% more opposite-gender partners than females, and that this tells us
```
```
      nothing about any sex’s promiscuity or selectivity. Rather, it just has to do with the
```
```
      relative number of males and females. Collectively, males and females have the
```
```
      same number of opposite gender partners, since it takes one of each set for every
```
```
      partnership, but there are fewer males, so they have a higher ratio. This means that
```
```
      the University of Chicago, ABC, and the Federal government studies are way off.
```
```
      After a huge effort, they gave a totally wrong answer.
```
```
         There’s no definite explanation for why such surveys are consistently wrong.
```
```
      One hypothesis is that males exaggerate their number of partners—or maybe fe-
```
```
      males downplay theirs—but these explanations are speculative. Interestingly, the
```
```
                 

           12.3. Some Common Graphs                                                           505
```
```

           principal author of the National Center for Health Statistics study reported that she
```
```
           knew the results had to be wrong, but that was the data collected, and her job was
```
```
           to report it.
```
```
              The same underlying issue has led to serious misinterpretations of other survey
```
```
           data. For example, a couple of years ago, the Boston Globe ran a story on a survey
```
```
           of the study habits of students on Boston area campuses. Their survey showed that
```
```
           on average, minority students tended to study with non-minority students more than
```
```
           the other way around. They went on at great length to explain why this “remarkable
```
```
           phenomenon” might be true. But it’s not remarkable at all. Using our graph theory
```
```
           formulation, we can see that all it says is that there are fewer students in a minority
```
```
           than students not in that minority, which is, of course, what “minority” means.
```
```

           12.2.1    Handshaking Lemma
```
```
           The previous argument hinged on the connection between a sum of degrees and the
```
```
           number of edges. There is a simple connection between these in any graph:
```
```

           Lemma 12.2.1. The sum of the degrees of the vertices in a graph equals twice the
```
```
           number of edges.
```
```

           Proof. Every edge contributes two to the sum of the degrees, one for each of its
```
```
           endpoints.                                                                   
```
```

             We refer to Lemma 12.2.1 as the Handshaking Lemma: if we total up the number
```
```
           of people each person at a party shakes hands with, the total will be twice the
```
```
           number of handshakes that occurred.
```

### 12.3 Some Common Graphs
```
           Some graphs come up so frequently that they have names. A complete graph Kn
```
```
           has n vertices and an edge between every two vertices, for a total of n.n 1/=2
```
```
           edges. For example, K5 is shown in Figure 12.3.
```
```
              The empty graph has no edges at all. For example, the five-vertex empty graph
```
```
           is shown in Figure 12.4.
```
```
              An n-vertex graph containing n 1 edges in sequence is known as a line graph Ln .
```
```
           More formally, Ln has
```
```
                                       V .Ln / D fv1 ; v2 ; : : : ; vn g
```
```
           and
```
```
                           E.Ln / D f hv1 —v2 i ; hv2 —v3 i ; : : : ; hvn 1 —vn i g
```
```
           

## 506 Chapter 12   Simple Graphs
```
```

                      Figure 12.3 K5 : the complete graph on five nodes.
```
```

                         Figure 12.4 An empty graph with five nodes.
```
```

                             Figure 12.5 L5 : a 5-vertex line graph.
```
```
                

           12.4. Isomorphism                                                                507
```
```

                                Figure 12.6 C5 : a 5-node cycle graph.
```
```

                                a               b       1               2
```
```

                                d                c      4               3
```
```
                                        (a)                     (b)
```
```

                                 Figure 12.7 Two Isomorphic graphs.
```
```

           For example, L5 is pictured in Figure 12.5.
```
```
             There is also a one-way infinite line graph L1 which can be defined by letting
```
```
           the nonnegative integers N be the vertices with edges hk—.k C 1/i for all k 2 N.
```
```
             If we add the edge hvn —v1 i to the line graph Ln , we get a graph called a length-
```
```
           n cycle Cn . Figure 12.6 shows a picture of length-5 cycle.
```

### 12.4 Isomorphism
```
           Two graphs that look different might actually be the same in a formal sense. For
```
```
           example, the two graphs in Figure 12.7 are both four-vertex, five-edge graphs and
```
```
           you get graph (b) by a 90o clockwise rotation of graph (a).
```
```
              Strictly speaking, these graphs are different mathematical objects, but this dif-
```
```
           ference doesn’t reflect the fact that the two graphs can be described by the same
```
```
           picture—except for the labels on the vertices. This idea of having the same picture
```
```
           “up to relabeling” can be captured neatly by adapting Definition 10.7.1 of isomor-
```
```
           phism of digraphs to handle simple graphs. An isomorphism between two graphs
```
```
           is an edge-preserving bijection between their sets of vertices:
```
```
           

## 508 Chapter 12   Simple Graphs
```
```

                              Figure 12.8 Isomorphic C5 graphs.
```
```

      Definition 12.4.1. An isomorphism between graphs G and H is a bijection f W
```
```
      V .G/ ! V .H / such that
```
```

                          hu—vi 2 E.G/ IFF hf .u/—f .v/i 2 E.H /
```
```

      for all u; v 2 V .G/. Two graphs are isomorphic when there is an isomorphism
```
```
      between them.
```
```

        Here is an isomorphism f between the two graphs in Figure 12.7:
```
```

                                   f .a/ WWD 2      f .b/ WWD 3
```
```
                                   f .c/ WWD 4      f .d / WWD 1:
```
```

      You can check that there is an edge between two vertices in the graph on the left if
```
```
      and only if there is an edge between the two corresponding vertices in the graph on
```
```
      the right.
```
```
         Two isomorphic graphs may be drawn very differently. For example, Figure 12.8
```
```
      shows two different ways of drawing C5 .
```
```
         Notice that if f is an isomorphism between G and H , then f 1 is an isomor-
```
```
      phism between H and G. Isomorphism is also transitive because the composition
```
```
      of isomorphisms is an isomorphism. In fact, isomorphism is an equivalence rela-
```
```
      tion.
```
```
         Isomorphism preserves the connection properties of a graph, abstracting out what
```
```
      the vertices are called, what they are made out of, or where they appear in a drawing
```
```
      of the graph. More precisely, a property of a graph is said to be preserved under
```
```
      isomorphism if whenever G has that property, every graph isomorphic to G also
```
```
      has that property. For example, since an isomorphism is a bijection between sets of
```
```
      vertices, isomorphic graphs must have the same number of vertices. What’s more,
```
```
      if f is a graph isomorphism that maps a vertex v of one graph to the vertex f .v/
```
```
      of an isomorphic graph, then by definition of isomorphism, every vertex adjacent
```
```
      to v in the first graph will be mapped by f to a vertex adjacent to f .v/ in the
```
```
      isomorphic graph. Thus, v and f .v/ will have the same degree. If one graph has a
```
```
                 

           12.5. Bipartite Graphs & Matchings                                                           509
```
```

           vertex of degree four and another does not, then they can’t be isomorphic. In fact,
```
```
           they can’t be isomorphic if the number of degree-four vertices in each of the graphs
```
```
           is not the same.
```
```
              Looking for preserved properties can make it easy to determine that two graphs
```
```
           are not isomorphic, or to guide the search for an isomorphism when there is one.
```
```
           It’s generally easy in practice to decide whether two graphs are isomorphic. How-
```
```
           ever, no one has yet found a procedure for determining whether two graphs are
```
```
           isomorphic that is guaranteed to run in polynomial time on all pairs of graphs.3
```
```
              Having such a procedure would be useful. For example, it would make it easy
```
```
           to search for a particular molecule in a database given the molecular bonds. On
```
```
           the other hand, knowing there is no such efficient procedure would also be valu-
```
```
           able: secure protocols for encryption and remote authentication can be built on the
```
```
           hypothesis that graph isomorphism is computationally exhausting.
```
```
              The definitions of bijection and isomorphism apply to infinite graphs as well as
```
```
           finite graphs, as do most of the results in the rest of this chapter. But graph theory
```
```
           focuses mostly on finite graphs, and we will too.
```
```
                  In the rest of this chapter we’ll assume graphs are finite.
```
```
             We’ve actually been taking isomorphism for granted ever since we wrote “Kn
```
```
           has n vertices. . . ” at the beginning of Section 12.3.
```
```
             Graph theory is all about properties preserved by isomorphism.
```

### 12.5 Bipartite Graphs & Matchings
```
           There were two kinds of vertices in the “Sex in America” graph, males and females,
```
```
           and edges only went between the two kinds. Graphs like this come up so frequently
```
```
           that they have earned a special name: bipartite graphs.
```
```
           Definition 12.5.1. A bipartite graph is a graph whose vertices can be partitioned
```
```
           into two blocks, L.G/ and R.G/, such that every edge has one endpoint in L.G/
```
```
           and the other endpoint in R.G/.
```
```
              So every bipartite graph looks something like the graph in Figure 12.2.
```
```

           12.5.1     The Bipartite Matching Problem
```
```
           The bipartite matching problem is related to the sex-in-America problem that we
```
```
           just studied; only now, the goal is to get everyone happily married. As you might
```
```
              3 A procedure runs in polynomial time when it needs an amount of time of at most p.n/, where n
```
```

           is the total number of vertices and p./ is a fixed polynomial.
```
```
            

## 510 Chapter 12   Simple Graphs
```
```

                                                                     Alice
```
```
                             Chuck
```
```
                                                                     Martha
```
```
                               Tom
```
```
                                                                     Sara
```
```
                           Michael
```
```
                                                                     Jane
```
```
                               John
```
```
                                                                     Mergatroid
```
```

      Figure 12.9 A graph where an edge between a man and woman denotes that the
```
```
      man likes the woman.
```
```

      imagine, this is not possible for a variety of reasons, not the least of which is the
```
```
      fact that there are more women in America than men. So, it is simply not possible
```
```
      to marry every woman to a man so that every man is married at most once.
```
```
         But what about getting a mate for every man so that every woman is married at
```
```
      most once? Is it possible to do this so that each man is paired with a woman that
```
```
      he likes? The answer, of course, depends on the bipartite graph that represents who
```
```
      likes who, but the good news is that it is possible to find natural properties of the
```
```
      who-likes-who graph that completely determine the answer to this question.
```
```
         In general, suppose that we have a set of men and an equal-sized or larger set of
```
```
      women, and there is a graph with an edge between a man and a woman if the man
```
```
      likes the woman. In this scenario, the “likes” relationship need not be symmetric,
```
```
      since for the time being, we will only worry about finding a mate for each man
```
```
      that he likes.4 Later, we will consider the “likes” relationship from the female
```
```
      perspective as well. For example, we might obtain the graph in Figure 12.9.
```
```
         A matching is defined to be an assignment of a woman to each man so that
```
```
      different men are assigned to different women, and a man is always assigned a
```
```
      woman that he likes. For example, one possible matching for the men is shown in
```
```
      Figure 12.10.
```
```
          4 It’s convenient to describe the matching problem in terms of men and women, since it let’s us
```
```

      say things like “a man’s wife” instead of “a left hand node’s matching right hand node.” We don’t
```
```
      think marriage must be heterosexual, or that men should be given first choice of mate.
```
```
     

12.5. Bipartite Graphs & Matchings                                                 511
```
```

                                                        Alice
```
```
                     Chuck
```
```
                                                        Martha
```
```
                       Tom
```
```
                                                        Sara
```
```
                   Michael
```
```
                                                        Jane
```
```
                       John
```
```
                                                        Mergatroid
```

**Figure 10 One possible matching for the men is shown with bold edges. For**
example, John is matched with Mergatroid.

#### 12.5.2 The Matching Condition
A famous result known as Hall’s Matching Theorem gives necessary and sufficient
conditions for the existence of a matching in a bipartite graph. It turns out to be a
remarkably useful mathematical tool.
   We’ll state and prove Hall’s Theorem using man-likes-woman terminology. De-
fine the set of women liked by a given set of men to consist of all women liked by
at least one of those men. For example, the set of women liked by Tom and John in
**Figure 9 consists of Martha, Sara and Mergatroid. For us to have any chance at**
all of matching up the men, the following matching condition must hold:
The Matching Condition: every subset of men likes at least as large a set of women.
  For example, we cannot find a matching if some set of 4 men like only 3 women.
Hall’s Theorem says that this necessary condition is actually sufficient; if the match-
ing condition holds, then a matching exists.

Theorem 12.5.2. A matching for a set M of men with a set W of women can be
found if and only if the matching condition holds.

Proof. First, let’s suppose that a matching exists and show that the matching condi-
tion holds. For any subset of men, each man likes at least the woman he is matched
with and a woman is matched with at most one man. Therefore, every subset of
men likes at least as large a set of women. Thus, the matching condition holds.
   Next, let’s suppose that the matching condition holds and show that a matching
```
           

## 512 Chapter 12   Simple Graphs
```
```

      exists. We use strong induction on jM j, the number of men, on the predicate:
```
```

                     P .m/ WWD if the matching condition holds for a set, M ,
```
```
                                   of m men, then there is a matching for M .
```
```

      Base case (jM j D 1): If jM j D 1, then the matching condition implies that the
```
```
      lone man likes at least one woman, and so a matching exists.
```
```
      Inductive Step: Suppose that jM j D m C 1  2. To find a matching for M , there
```
```
      are two cases.
```
```

      Case 1: Every nonempty subset of at most m men likes a strictly larger set of
```
```
           women. In this case, we have some latitude: we pair an arbitrary man with
```
```
           a woman he likes and send them both away. This leaves m men and one
```
```
           fewer women, and the matching condition will still hold. So the induction
```
```
           hypothesis P .m/ implies we can match the remaining m men.
```
```

      Case 2: Some nonempty subset X of at most m men likes an equal-size set Y of
```
```
           women. The matching condition must hold within X, so the strong induction
```
```
           hypothesis implies we can match the men in X with the women in Y . This
```
```
           leaves the problem of matching the set M X of men to the set W Y of
```
```
           women.
```
```
            But the problem of matching M X against W Y also satisfies the Match-
```
```
            ing condition, because any subset of men in M X who liked fewer women
```
```
            in W Y would imply there was a set of men who liked fewer women in the
```
```
            whole set W . Namely, if a subset M0  M X liked only a strictly smaller
```
```
            subset of women W0  W Y , then the set M0 [ X of men would like only
```
```
            women in the strictly smaller set W0 [ Y . So again the strong induction hy-
```
```
            pothesis implies we can match the men in M X with the women in W Y ,
```
```
            which completes a matching for M .
```
```

        So in both cases, there is a matching for the men, which completes the proof of
```
```
      the Inductive step. The theorem follows by induction.                          
```
```

         The proof of Theorem 12.5.2 gives an algorithm for finding a matching in a bi-
```
```
      partite graph, albeit not a very efficient one. However, efficient algorithms for find-
```
```
      ing a matching in a bipartite graph do exist. Thus, if a problem can be reduced to
```
```
      finding a matching, instances of the problem can be solved in a reasonably efficient
```
```
      way.
```
```
     

12.5. Bipartite Graphs & Matchings                                                513
```

A Formal Statement
Let’s restate Theorem 12.5.2 in mathematical terms so that you’ll not always be
condemned to saying, “Now this group of men likes at least as many women. . . ”

Definition 12.5.3. A matching in a graph G is a set of edges M  E.G/ such that
no two edges in M are incident to the same vertex. The vertices incident to an edge
in M are said to be covered by M . A matching is said to be perfect when it covers
V .G/. The set N.S / of neighbors of some set S  V .G/ of vertices is the image
of S under the edge-relation, that is,
```

                   N.S / WWD f r j hs—ri 2 E.G/ for some s 2 S g:
```

S is called a bottleneck if
```
                                     jS j > j N.S /j:
```

Theorem 12.5.4 (Hall’s Theorem). Let G be a bipartite graph. There is a matching
in G that covers L.G/ iff no subset of L.G/ is a bottleneck.

An Easy Matching Condition
The bipartite matching condition requires that every subset of men has a certain
property. In general, verifying that every subset has some property, even if it’s easy
to check any particular subset for the property, quickly becomes overwhelming
because the number of subsets of even relatively small sets is enormous—over a
billion subsets for a set of size 30. However, there is a simple property of vertex
degrees in a bipartite graph that guarantees the existence of a matching. Call a
bipartite graph degree-constrained if vertex degrees on the left are at least as large
as those on the right. More precisely,

Definition 12.5.5. A bipartite graph G is degree-constrained when there is an in-
teger d  1 such that
```
                               deg.l/  d  deg.r/                         (12.2)
```
for every l 2 L.G/ and r 2 R.G/.

  For example, the graph in Figure 12.9 is degree-constrained with d D 2, since
every vertex on the left is adjacent to at least two vertices on the right while every
vertex on the right is adjacent to at most two vertices on the left.

Theorem 12.5.6. If G is a degree-constrained bipartite graph, then there is a
matching that covers L.G/.
```
                  

## 514 Chapter 12    Simple Graphs
```
```

           Proof. Suppose G satisfies (12.2), and let S be a subset of L.G/. We will show
```
```
           that S satisfies Hall’s condition, namely,
```
```

                                             j N.S /j  jS j:                           (12.3)
```
```

             Let DS be the set of edges with an endpoint in a S. According to (12.2), every
```
```
           vertex in S is the endpoint of at least d edges,
```
```

                                             jDS j  d jS j:
```
```

           Likewise, any edge in DS has an endpoint in N.S / by definition. According
```
```
           to (12.2), every vertex in N.S / is incident to at most d edges, so we also have
```
```

                                           d j N.S /j  jDS j:
```
```

           Combining the above inequalities gives
```
```

                                           d j N.S /j  d jS j:
```
```

           Now cancelling d completes the derivation of equation (12.3).                    
```
```

             A graph is regular when all its vertice have the same degree. Regular graphs
```
```
           come up in lots of examples. Since a nonempty bipartite regular graph is degree-
```
```
           constrained by definition, Theorem 12.5.6 guarantees it will have a perfect match-
```
```
           ing.
```

### 12.6 Coloring
```
           In Section 12.2, we used edges to indicate an affinity between a pair of nodes.
```
```
           But there are lots of situations in which edges will correspond to conflicts between
```
```
           nodes. Exam scheduling is a typical example.
```
```

           12.6.1       An Exam Scheduling Problem
```
```
           Each term, the MIT Schedules Office must assign a time slot for each final exam.
```
```
           This is not easy, because some students are taking several classes with finals, and
```
```
           (even at MIT) a student can take only one test during a particular time slot. The
```
```
           Schedules Office wants to avoid all conflicts. Of course, you can make such a
```
```
           schedule by having every exam in a different slot, but then you would need hun-
```
```
           dreds of slots for the hundreds of courses, and the exam period would run all year!
```
```
           So, the Schedules Office would also like to keep exam period short.
```
```
     

12.6. Coloring                                                                    515
```
```

                                       6:170
```
```

                        6:002                            6:003
```
```

                          6:041                  6:042
```

**Figure 11 A scheduling graph for five exams. Exams connected by an edge**
cannot be given at the same time.
```

   The Schedules Office’s problem is easy to describe as a graph. There will be a
```
vertex for each course with a final exam, and two vertices will be adjacent exactly
when some student is taking both courses. For example, suppose we need to sched-
ule exams for 6.041, 6.042, 6.002, 6.003 and 6.170. The scheduling graph might
appear as in Figure 12.11.
   6.002 and 6.042 cannot have an exam at the same time since there are students in
both courses, so there is an edge between their nodes. On the other hand, 6.042 and
### 6.170 can have an exam at the same time if they’re taught at the same time (which
they sometimes are), since no student can be enrolled in both (that is, no student
should be enrolled in both when they have a timing conflict).
   We next identify each time slot with a color. For example, Monday morning
is red, Monday afternoon is blue, Tuesday morning is green, etc. Assigning an
exam to a time slot is then equivalent to coloring the corresponding vertex. The
main constraint is that adjacent vertices must get different colors—otherwise, some
student has two exams at the same time. Furthermore, in order to keep the exam
period short, we should try to color all the vertices using as few different colors as
possible. As shown in Figure 12.12, three colors suffice for our example.
   The coloring in Figure 12.12 corresponds to giving one final on Monday morning
(red), two Monday afternoon (blue), and two Tuesday morning (green). Can we use
fewer than three colors? No! We can’t use only two colors since there is a triangle
in the graph, and three vertices in a triangle must all have different colors.
   This is an example of a graph coloring problem: given a graph G, assign colors
to each node such that adjacent nodes have different colors. A color assignment
with this property is called a valid coloring of the graph—a “coloring,” for short.
A graph G is k-colorable if it has a coloring that uses at most k colors.

Definition 12.6.1. The minimum number of colors for which a graph G has a valid
```
           

## 516 Chapter 12    Simple Graphs
```
```

                                                 blue
```
```

                                red                                green
```
```

                                    green                   blue
```
```

               Figure 12.12         A 3-coloring of the exam graph from Figure 12.11.
```
```

      coloring is called its chromatic number, .G/.
```
```

        So G is k-colorable iff .G/  k.
```
```

      12.6.2       Some Coloring Bounds
```
```
      There are some simple properties of graphs that give useful bounds on colorability.
```
```
        The simplest property is being a cycle: an even-length cycle is 2-colorable. So
```
```

                                              .Ceven / D 2:
```
```

      On the other hand, an odd-length cycle requires 3 colors, that is,
```
```

                                              .Codd / D 3:                             (12.4)
```
```

      You should take a moment to think about why this equality holds.
```
```
        Another simple example is a complete graph Kn :
```
```

                                               .Kn / D n
```
```

      since no two vertices can have the same color.
```
```
         Being bipartite is another property closely related to colorability. If a graph is
```
```
      bipartite, then you can color it with 2 colors using one color for the nodes on the
```
```
      “left” and a second color for the nodes on the “right.” Conversely, graphs with
```
```
      chromatic number 2 are all bipartite with all the vertices of one color on the “left”
```
```
      and those with the other color on the right. Since only graphs with no edges—the
```
```
      empty graphs—have chromatic number 1, we have:
```
```

      Lemma 12.6.2. A nonempty graph G is bipartite iff .G/ D 2.
```
```
     

12.6. Coloring                                                                   517
```

  The chromatic number of a graph can also be shown to be small if the vertex
degrees of the graph are small. In particular, if we have an upper bound on the
degrees of all the vertices in a graph, then we can easily find a coloring with only
one more color than the degree bound.

Theorem 12.6.3. A graph with maximum degree at most n is .n C 1/-colorable.

  Now you might be tempted to try to prove this theorem using induction on n,
but this would be a poor choice—we actually don’t know any way to this work,
so we expect it would ruin your week if this was your approach on a problem set.
On the other hand, the number of vertices or the number of edges are typically
good quantities on which to base induction proofs about graphs. We will prove
Theorem 12.6.3 by induction on the number of vertices.

Proof of Theorem 12.6.3. Let n 2 N be fixed. The induction hypothesis will be:

P .k/ WWD If a k-vertex graph has maximum degree n, then it is .n C 1/-colorable:

.
Base case (k D 1): A 1-vertex graph has maximum degree 0 and is 1-colorable, so
P .1/ is true.
Inductive step: Now assume that P .k/ is true, and let G be an .k C 1/-vertex
graph with maximum degree at most n. Remove a vertex v and all edges incident
to v from G, leaving a k-vertex subgraph H . The maximum degree of H is still at
most n, and so we can find an .n C 1/-coloring for H by induction hypothesis.
   Now add back vertex v. Since there are more colors—n C 1—than vertices
adjacent to v—at most deg.v/  n—we can now pick a color for v that is different
from the colors of all these adjacent vertices. This yields a coloring of G with
.n C 1/-colors. So we have shown that G is .n C 1/-colorable, as required.    
```

   Sometimes nC1 colors is the best you can do. For example, every node in KnC1
```
has degree n and .KnC1 / D n C 1, so this is an example where Theorem 12.6.3
gives the best possible bound. Theorem 12.6.3 also gives the best possible coloring
bound for any graph with degree bounded by n that has KnC1 as a subgraph.
   But sometimes n C 1 colors are far from the best that you can do. For example,
the star graph shown in Figure 12.13 has maximum degree six but can be colored
using just two colors.
   In general it is very hard to find a minimal coloring for an arbitrary graph. In
fact, just calculating the chromatic number is hard. We’ll say more about this in the
next section.
```
           

## 518 Chapter 12    Simple Graphs
```
```

                             Figure 12.13 A seven-vertex star graph.
```
```

      12.6.3       Why coloring?
```
```
      One reason coloring problems frequently arise in practice is because scheduling
```
```
      conflicts are so common. For example, at the internet company Akamai, cofounded
```
```
      by Tom Leighton, a new version of software is deployed over each of its servers
```
```
      (200,000 servers in 2016) every few days. It would take more than twenty years to
```
```
      update all these the servers one at a time, so the deployment must be carried out
```
```
      for many servers simultaneouly. On the other hand, certain pairs of servers with
```
```
      common critical functions cannot be updated simultaneouly, since a server needs
```
```
      to be taken offline while being updated.
```
```
         This problem gets solved by making a 200,000-node conflict graph and coloring
```
```
      it with with a dozen or so colors—so only a dozen or so waves of installs are
```
```
      needed!
```
```
         Another example comes from the need to assign frequencies to radio stations. If
```
```
      two stations have an overlap in their broadcast area, they can’t be given the same
```
```
      frequency. Frequencies are precious and expensive, so it is important to minimize
```
```
      the number handed out. This amounts to finding the minimum coloring for a graph
```
```
      whose vertices are the stations and whose edges connect stations with overlapping
```
```
      areas.
```
```
         Coloring also comes up in allocating registers for program variables. While a
```
```
      variable is in use, its value needs to be saved in a register. Registers can be reused
```
```
      for different variables, but two variables need different registers if they are refer-
```
```
      enced during overlapping intervals of program execution. So register allocation is
```
```
      the coloring problem for a graph whose vertices are the variables: vertices are ad-
```
```
      jacent if their intervals overlap, and the colors are registers. Once again, the goal is
```
```
      to minimize the number of colors needed to color the graph.
```
```
         Finally, there’s the famous map coloring problem stated in Proposition 1.1.4.
```
```
      How many colors are needed to color a map so that adjacent territories get different
```
```
      colors? Answering the question has no direct practical applications, but it tanta-
```
```
      lized graph theorists for over a century until an answer was discovered—to great
```
```
                

           12.7. Walks in Simple Graphs                                                       519
```
```

           acclaim—in the 1970’s: four colors are enough to color any map. A reasonably
```
```
           efficient way to find an actual 4-coloring can be based on that proof.
```
```
              Surprisingly, the question whether there is an efficient procedure to tell if an
```
```
           arbitrary planar graph really needs four colors—or if three would do the job—
```
```
           turns out to be the SAT problem of Section 3.5 in disguise. So you win a million
```
```
           dollars if you figure out how hard it is to determine 3-colorability. A proof that
```
```
           testing 3-colorability of planar graphs is as hard as SAT is given in Problems 12.31
```
```
           and 12.32.
```

### 12.7 Walks in Simple Graphs
```
           12.7.1    Walks, Paths, Cycles
```
```
           Walks and paths in simple graphs are esentially the same as in digraphs. We just
```
```
           modify the digraph definitions using undirected edges instead of directed ones. For
```
```
           example, the formal definition of a walk in a simple graph is a virtually the same
```
```
           as the Definition 10.2.1 of a walk in a digraph:
```
```

           Definition 12.7.1. A walk in a simple graph G is an alternating sequence of vertices
```
```
           and edges that begins with a vertex, ends with a vertex, and such that for every edge
```
```
           hu—vi in the walk, one of the endpoints u, v is the element just before the edge,
```
```
           and the other endpoint is the next element after the edge. The length of a walk is
```
```
           the total number of occurrences of edges in it.
```
```
             So a walk v is a sequence of the form
```
```

                         v WWD v0 hv0 —v1 i v1 hv1 —v2 i v2 : : : hvk 1 —vk i vk
```
```

           where hvi —vi C1 i 2 E.G/ for i 2 [0..k ). The walk is said to start at v0 , to end
```
```
           at vk , and the length, jvj, of the walk is k. The walk is a path iff all the vi ’s are
```
```
           different, that is, if i ¤ j , then vi ¤ vj .
```
```
              A walk that begins and ends at the same vertex is a closed walk. A single vertex
```
```
           counts as a length zero closed walk as well as a length zero path.
```
```
              A cycle can be represented by a closed walk of length three or more whose
```
```
           vertices are distinct except for the beginning and end vertices.
```
```

             Note that in contrast to digraphs, we don’t count length two closed walks as
```
```
           cycles in simple graphs. That’s because a walk going back and forth on the same
```
```
           edge is neither interesting nor important. There are also no closed walks of length
```
```
           one, since simple graphs don’t have self-loops.
```
```
           

## 520 Chapter 12    Simple Graphs
```
```

                                    b            d                   e
```
```

                                        c
```
```
                            a                                    g       h
```
```
                                                      f
```
```

                   Figure 12.14 A graph with 3 cycles: bhecb, cdec, bcdehb.
```
```

         As in digraphs, the length of a walk is the number of occurrences of edges in the
```
```
      walk, which is one less than the number of occurrences of vertices. For example,
```
```
      the graph in Figure 12.14 has a length 6 path through the seven successive vertices
```
```
      abcdefg. This is the longest path in the graph. The graph in Figure 12.14 also has
```
```
      three cycles through successive vertices bhecb, cdec and bcdehb.
```
```

      12.7.2       Cycles as Subgraphs
```
```
      We don’t intend that cycles have a beginning or an end, so any of the paths that go
```
```
      around a cycle can represent it. For example, in the graph in Figure 12.14, the cycle
```
```
      starting at b and going through vertices bcdehb can also be described as starting
```
```
      at d and going through dehbcd . Furthermore, cycles in simple graphs don’t have
```
```
      a direction: dcbhed describes the same cycle as though it started and ended at d
```
```
      but went in the opposite direction.
```
```
         A precise way to explain which closed walks represent the same cycle is to define
```
```
      a cycle to be subgraph isomorphic to a cycle graph Cn .
```
```

      Definition 12.7.2. A graph G is said to be a subgraph of a graph H if V .G/ 
```
```
      V .H / and E.G/  E.H /.
```
```

        For example, the one-edge graph G where
```
```

                           V .G/ D fg; h; i g   and       E.G/ D f hh—i i g
```
```

      is a subgraph of the graph H in Figure 12.1. On the other hand, any graph con-
```
```
      taining an edge hg—hi will not be a subgraph of H because this edge is not in
```
```
      E.H /. Another example is an empty graph on n nodes, which will be a subgraph
```
```
      of an Ln with the same set of vertices; similarly, Ln is a subgraph of Cn , and Cn
```
```
      is a subgraph of Kn .
```
```
                  

            12.8. Connectivity                                                              521
```
```

            Definition 12.7.3. For n  3, let Cn be the graph with vertices [0..n) and edges
```
```

                           h0—1i ; h1—2i ; : : : ; h.n   2/—n    1i ; hn   1—0i :
```
```

              A cycle of a graph G is a subgraph of G that is isomorphic to Cn for some n  3.
```
```

              This definition formally captures the idea that cycles don’t have direction or be-
```
```
            ginnings or ends.
```

### 12.8 Connectivity
```
            Definition 12.8.1. Two vertices are connected in a graph when there is a path that
```
```
            begins at one and ends at the other. By convention, every vertex is connected to
```
```
            itself by a path of length zero. A graph is connected when every pair of vertices
```
```
            are connected.
```
```

            12.8.1     Connected Components
```
```
            Being connected is usually a good property for a graph to have. For example, it
```
```
            could mean that it is possible to get from any node to any other node, or that it is
```
```
            possible to communicate between any pair of nodes, depending on the application.
```
```
               But not all graphs are connected. For example, the graph where nodes represent
```
```
            cities and edges represent highways might be connected for North American cities,
```
```
            but would surely not be connected if you also included cities in Australia. The
```
```
            same is true for communication networks like the internet—in order to be protected
```
```
            from viruses that spread on the internet, some government networks are completely
```
```
            isolated from the internet.
```
```

                          Figure 12.15   One graph with 3 connected components.
```
```

              Another example is shown in Figure 12.15, which looks like a picture of three
```
```
            graphs, but is intended to be a picture of one graph. This graph consists of three
```
```
           

## 522 Chapter 12    Simple Graphs
```
```

      pieces. Each piece is a subgraph that by itself is connected, but there are no paths
```
```
      between vertices in different pieces. These connected pieces of a graph are called
```
```
      its connected components.
```
```
      Definition 12.8.2. A connected component of a graph is a subgraph consisting of
```
```
      some vertex and every node and edge that is connected to that vertex.
```
```
        So a graph is connected iff it has exactly one connected component. At the
```
```
      other extreme, the empty graph on n vertices has n connected components, each
```
```
      consisting of a single vertex.
```
```

      12.8.2       Odd Cycles and 2-Colorability
```
```
      We have already seen that determining the chromatic number of a graph is a chal-
```
```
      lenging problem. There is one special case where this problem is very easy, namely,
```
```
      when the graph is 2-colorable.
```
```
      Theorem 12.8.3. The following graph properties are equivalent:
```
```

         1. The graph contains an odd length cycle.
```
```
         2. The graph is not 2-colorable.
```
```
         3. The graph contains an odd length closed walk.
```
```

         In other words, if a graph has any one of the three properties above, then it has
```
```
      all of the properties.
```
```
         We will show the following implications among these properties:
```
```
                               1. IMPLIES 2. IMPLIES 3. IMPLIES 1:
```
```
      So each of these properties implies the other two, which means they all are equiva-
```
```
      lent.
```
```

      1. IMPLIES 2. Proof. This follows from equation 12.4.                            
```
```
      2. IMPLIES 3. If we prove this implication for connected graphs, then it will hold
```
```
           for an arbitrary graph because it will hold for each connected component. So
```
```
           we can assume that G is connected.
```
```

            Proof. Pick an arbitrary vertex r of G. Since G is connected, for every node
```
```
            u 2 V .G/, there will be a walk wu starting at u and ending at r. Assign
```
```
            colors to vertices of G as follows:
```
```
                                             (
```
```
                                              black; if jwu j is even;
```
```
                                 color.u/ D
```
```
                                              white; otherwise:
```
```
                

           12.9. Special Walks and Tours                                                   523
```
```

                  Now since G is not colorable, this can’t be a valid coloring. So there must
```
```
                  be an edge between two nodes u and v with the same color. But in that case
```
```
                                            wu breverse.wv /b hv—ui
```
```
                  is a closed walk starting and ending at u, and its length is
```
```
                                                 jwu j C jwv j C 1
```
```
                  which is odd.                                                             
```
```

           3. IMPLIES 1. Proof. Since there is an odd length closed walk, the WOP implies
```
```
                 there is an odd length closed walk w of minimum length. We claim w must
```
```
                 be a cycle. To show this, assume to the contrary that w is not a cycle, so
```
```
                 there is a repeat vertex occurrence besides the start and end. There are then
```
```
                 two cases to consider depending on whether the additional repeat is different
```
```
                 from, or the same as, the start vertex.
```
```
                  In the first case, the start vertex has an extra occurrence. That is,
```
```
                                                     wDfx
```
```
                                                        br
```
```
                  for some positive length walks f and r that begin and end at x. Since
```
```
                                                   jwj D jfj C jrj
```
```
                  is odd, exactly one of f and r must have odd length, and that one will be an
```
```
                  odd length closed walk shorter than w, a contradiction.
```
```
                  In the second case,
```
```
                                                   wDfy
```
```
                                                      bg y
```
```
                                                         br
```
```
                  where f is a walk from x to y for some y ¤ x, and r is a walk from y to
```
```
                  x, and jgj > 0. Now g cannot have odd length or it would be an odd-length
```
```
                                                                                       y r must
```
```
                  closed walk shorter than w. So g has even length. That implies that fb
```
```
                  be an odd-length closed walk shorter than w, again a contradiction.
```
```
                  This completes the proof of Theorem 12.8.3.                               
```

### 12.9 Special Walks and Tours
```
           12.9.1    Euler Tours
```
```
           Can you walk every hallway in the Museum of Fine Arts exactly once? If we rep-
```
```
           resent hallways with vertices and connections between hallways with edges, then
```
```
           

## 524 Chapter 12    Simple Graphs
```
```

             Figure 12.16        Is there a walk that includes every edge exactly once?
```
```

      this reduces to a question about graphs. For example, could you visit every hallway
```
```
      exactly once in a museum with floor plan represented by the graph in Figure 12.16?
```
```
         The entire field of graph theory began when the famous 17th century mathemati-
```
```
      cian Leonhard Euler5 asked whether the seven bridges of Königsberg could all be
```
```
      crossed exactly once—essentially the same question we asked about the Museum
```
```
      of Fine Arts.
```
```
         An Euler tour6 of a graph is a closed walk that includes every edge exactly once.
```
```
      Graphs with Euler tours turn out to be easy to recognize:
```
```

      Theorem 12.9.1. A connected graph has an Euler tour if and only if every vertex
```
```
      has even degree.
```
```

         The proof is worked out in a series of easy steps in Problem 12.44. Implicit in
```
```
      the proof is a simple way to find Euler tours when they exist, namely, grow a tour
```
```
      by repeatedly splicing in closed walks until all the edges are included.
```
```
         Similarly, there is a walk that includes every edge exactly once but is not a tour—
```
```
      it begins and ends at different verticies—if and only if there are exactly two vertices
```
```
      of odd degree. The graph shown in Figure 12.16 has exactly two vertices with odd
```
```
      degree, so it has a such a walk but not an Euler tour.
```
```

      12.9.2       Hamiltonian Cycles
```
```
      Hamiltonian cycles are the unruly cousins of Euler tours.
```
```

        5 Same Euler who defined the constant e  2:718 and the totient function —he did a lot of stuff.
```
```
        6 In some other texts, Euler “tours” are called Euler “circuits.”
```
```
               

          12.10. k-connected Graphs                                                        525
```
```

          Definition 12.9.2. A Hamiltonian cycle in a graph G is a cycle that visits every
```
```
          vertex in G exactly once. Similarly, a Hamiltonian path is a path in G that visits
```
```
          every vertex exactly once.
```
```

            Although Hamiltonian cycles sound similar to Euler tours—one visits every node
```
```
          once while the other visits every edge once—finding a Hamiltonian cycle or a
```
```
          Hamiltonian path can be a lot harder than finding an Euler tour or path. No one
```
```
          has yet discovered a simple characterization for when a graph has a Hamiltonian
```
```
          cycle. In fact, determining whether a graph has a Hamiltonian cycle is the same cat-
```
```
          egory of problem as the SAT problem of Section 3.5: you get a million dollars from
```
```
          the Clay Institute for finding an efficient way to determine whether a graph has a
```
```
          Hamiltonian cycle—or for proving that there is no procedure that works efficiently
```
```
          on all graphs.
```
```

          12.9.3    The Traveling Salesperson Problem
```
```
          In many applications, there are numerical costs or weights associated with the edges
```
```
          of the graph. For example, suppose the nodes of a graph represent buildings and
```
```
          edges represent connections between them. The cost of a connection may vary a
```
```
          lot from one pair of buildings or towns to another. Another example is where the
```
```
          nodes represent cities, and the weight of an edge is the distance between them: the
```
```
          weight of the Los Angeles/New York City edge is much higher than the weight of
```
```
          the NYC/Boston edge.
```
```
             As if the problem of finding a Hamiltonian cycle is not hard enough, in a weighted
```
```
          graph, we sometimes need to find a Hamiltonian cycle with minimum possible sum
```
```
          of the weights of its edges. This is the famous Traveling Salesperson Problem.
```
```
             For example, suppose you would like to visit every node in the graph shown in
```
```
          Figure 12.17 exactly once, finishing at the node where you started. Can you find a
```
```
          weight 15 cycle that does this?
```

### 12.10 k-connected Graphs
```
          If we think of a graph as modeling cables in a telephone network, or oil pipelines,
```
```
          or electrical power lines, then we not only want connectivity, but we want connec-
```
```
          tivity that survives component failure. One measure of connection strength is how
```
```
          many links must fail before connectedness fails. In particular, two vertices are k-
```
```
          edge connected when it takes at least k “edge-failures” to disconnect them. More
```
```
          precisely:
```
```
            

## 526 Chapter 12   Simple Graphs
```
```

                                                       3
```
```

                                           v2          4          v3
```
```
                                       3                               1
```
```
                                                       3
```
```
                                v1         2                       4        v4
```
```
                                       5                               2
```
```
                                           v6          6          v5
```
```

                   Figure 12.17       Is there a Hamiltonian cycle with weight 15?
```
```

      Definition 12.10.1. Two vertices in a graph are k-edge connected when they re-
```
```
      main connected in every subgraph obtained by deleting up to k 1 edges. A graph
```
```
      with two or more vertices is k-edge connected when every pair of distinct vertices
```
```
      in the graph are k-edge connected.
```
```
         From now on we’ll drop the “edge” modifier and just say “k-connected.”7
```
```
         For example, in the graph in figure 12.14, vertices c and e are 3-connected, b
```
```
      and e are 2-connected, g and e are 1 connected, and no vertices are 4-connected.
```
```
      The graph as a whole is only 1-connected. A complete graph Kn is .n 1/-
```
```
      connected. Every cycle is 2-connected.
```
```
         Notice that two vertices are 1-connected iff they are connected according to Def-
```
```
      inition 12.8.1.
```
```
         The idea of a cut edge is a useful way to explain 2-connectivity.
```
```
      Definition 12.10.2. If two vertices are connected in a graph G, but not connected
```
```
      when an edge e is removed, then e is called a cut edge of G.
```
```
         So a graph with more than one vertex is 2-connected iff it is connected and has no
```
```
      cut edges. The following Lemma is a more or less another immediate consequence
```
```
      of the definition of cut edge.
```
```
      Lemma 12.10.3. An edge is a cut edge iff it is not on a cycle.
```
```
      Proof. An edge on a cycle is clearly not a cut edge. Conversely, if an edge is not
```
```
      a cut edge, then even after it is removed, there must still be a path between its
```
```
      endpoints. Then this path together with the edge form a cycle.                  
```
```
         7 There is a corresponding definition of k-vertex connectedness based on deleting vertices rather
```
```

      than edges. Graph theory texts usually use “k-connected” as shorthand for “k-vertex connected.” But
```
```
      edge-connectedness will be enough for us.
```
```
                

           12.11. Forests & Trees                                                              527
```
```

                     Figure 12.18 A 6-node forest consisting of 2 component trees.
```
```

              More generally, if two vertices are connected by k edge-disjoint paths—that is,
```
```
           no edge occurs in two paths—then they must be k-connected, since at least one
```
```
           edge will have to be removed from each of the paths before they could disconnect.
```
```
           A fundamental fact, whose ingenious proof we omit, is Menger’s theorem which
```
```
           confirms that the converse is also true: if two vertices are k-connected, then there
```
```
           are k edge-disjoint paths connecting them. It takes some ingenuity to prove this
```
```
           just for the case k D 2.
```

### 12.11 Forests & Trees
```
           We’ve already made good use of acyclic digraphs, but acyclic simple graphs are
```
```
           arguably the most important graphs in computer science.
```
```
           Definition 12.11.1. An acyclic graph is called a forest. A connected acyclic graph
```
```
           is called a tree.
```
```
              The graph shown in Figure 12.18 is a forest. Each of its connected components
```
```
           is by definition a tree.
```
```

           12.11.1     Leaves
```
```
           One of the first things you will notice about forests is that they tend to have a lot of
```
```
           vertices with degree one.
```
```
           Definition 12.11.2. A vertex of degree at most one in a forest is called a leaf. A
```
```
           vertex of degree zero is called an isolated vertex.
```
```
              The forest in Figure 12.18 has 4 leaves. The tree in Figure 12.19 has 5 leaves.
```
```
              A forest with an isolated vertex won’t be connected unless it consists of just the
```
```
           one vertex. So if a connected forest—that is, a tree—has at least two vertices, then
```
```
           its leaves will be the degree one vertices. Trees don’t necessarily have a lot of
```
```
           leaves: the line graph Ln has only two leaves. But two leaves is the minimum.
```
```
           Lemma 12.11.3. If a finite tree has more than one vertex, then it has at least two
```
```
           leaves of degree one.
```
```
           

## 528 Chapter 12   Simple Graphs
```
```

                                   a             e             h
```
```
                                       c
```
```

                                                        g          i
```
```
                              b             d
```
```
                                                 f
```
```

                          Figure 12.19 A 9-vertex tree with 5 leaves.
```
```

      Proof. Let u be a vertex at one end of a longest path in the tree. If there was an
```
```
      edge between u and some vertex not on the path, then the path could be lengthened
```
```
      by adding that vertex to the path, so there can’t be such an edge.
```
```
        Since the tree has more than one vertex, a longest path must include at least one
```
```
      edge, so there will be an final edge hv—ui at the end of the path. Now if there was
```
```
      an edge from u to a vertex w ¤ v on the path, then the part of the path from w to
```
```
      u followed by the edge back to w would be a cycle. So hv—ui must be the only
```
```
      edge incident to u. That is, u is a degree one leaf. Likewise, the vertex at the other
```
```
      end of the path must also be a leaf.                                                
```
```

      12.11.2      Tree Properties
```
```
      There are many equivalent ways to characterize trees, which helps explain why they
```
```
      come up so often.
```
```

      Theorem 12.11.4. For any simple graph G the following properties are equivalent:
```
```

      (1) connected and acyclic (G is a tree).
```
```

      (2) connected and every edge is a cut edge (G is edge-minimal connected).
```
```

      (3) acyclic and adding an edge between any two nonadjacent vertices creates a
```
```
          cycle (G is edge-maximal acyclic).
```
```

      (4) a unique path between every pair of vertices.
```
```

      Proof. We prove (4) implies (2) implies (1) implies (3) implies (4). Expect for the
```
```
      last one, these implications are straightforward.
```
```

           (4) implies (2): Connectedness is immediate from (4).
```
```
            Supppose hu—vi is an edge of G. Then the unique path between u and v
```
```
            must be just this edge. Removing this edge therefore leaves no path between
```
```
            u and v, which implies that the graph with hu—vi removed is not connected.
```
```
     

12.11. Forests & Trees                                                                         529
```
```

     (2) implies (1): Connectedness is immediate from (2). Since an edge on a
```
```
      cycle is not a cut edge (Lemma 12.10.3), the graph must be acyclic.
```
```

     (1) implies (3): Connectedness implies there is a path between any two dis-
```
```
      tinct vertices u and v. If u and v are not adjacent, then an additional edge
```
```
      hu—vi together with the path between forms a cycle.
```
```

     (3) implies (4): Call two vertices a different-path-pair (dpp) if there are dis-
```
```
      tinct paths between them. (Note that neither of the vertices forming a dpp
```
```
      are necessarily on a cycle, see Problem 12.35.) Assume for the sake of con-
```
```
      tradiction that there is a dpp.
```
```
       Let u ¤ v be a dpp such that some path p between u and v has minimum
```
```
       length among all paths between the vertices in any dpp. Since u and v are a
```
```
       dpp, there must be another path besides p between them.
```
```
       Suppose the other path shares with p a vertex w different from the endpoints
```
```
       u and v. Then either u and w, or w and v, must be a dpp. But the shortest
```
```
       path between u and w as well as the shortest path between w and v are each
```
```
       shorter than p, contradicting minimality. So the two paths between u and
```
```
       v must not share any vertex other than their endpoints. This means the two
```
```
       paths form a cycle, contradicting (3).
```
```

                                                                                               
```
```

   The equivalences of Theorem 12.11.4 hold even for infinite trees.8 For finite
```
trees, there are two further helpful characterizations of trees by numbers of vertices
and edges.

Theorem 12.11.5. A finite forest F consists of exactly jV .F /j               jE.F /j trees.

Proof. By induction on the number n of vertices. The induction hypothesis will be
```

       P .n/ WWD every forest F with n vertices consists of n               jE.F /j trees:
```

Base case: (n D 1). In this case, F consists of a tree that is a single isolated vertex
and jE.F /j D 0. So P .1/ is immediate.
Inductive step: (jV .F /j D n C 1).
  Suppose F has an isolated vertex v. Then removing v yields a graph F v
which will be a forest with n  1 vertices. By induction hypothesis, F v consists
   8 We encourage you to check that the proofs made no use of finiteness.
```
           

## 530 Chapter 12   Simple Graphs
```
```

      of n jE.F v/j D n jE.F /j trees. So F consists of these trees along with v,
```
```
      and therefore F consists of .n C 1/ jE.F /j trees, which proves P .n C 1/.
```
```
         Otherwise, every component of F has at least two vertices. Let T be a compo-
```
```
      nent tree of F . By Lemma 12.11.3, T has a leaf v of degree one. Let F v be
```
```
      the result of deleting v and its incident edge. Since deleting vertices and edges will
```
```
      not create a cycle, F v is a forest with n vertices. In fact the component trees of
```
```
      F v are the same as those of F with T replaced by T v. In particular, F and
```
```
      F v have the same number of component trees.
```
```
         By induction hypothesis, F v consists of
```
```
                              n    jE.F    v/j D n    .jE.F /j   1/
```
```
                                              D .n C 1/      jE.F /j
```
```
      trees. So F also consists of .n C 1/       jE.F /j component trees, which proves
```
```
      P .n C 1/.                                                                    
```
```
      Theorem 12.11.6. For any simple graph G the following properties are equivalent:
```
```
      (1) finite tree.
```
```
      (2) finite forest with jV .G/j D jE.G/j C 1.
```
```
      (3) finite, connected and jV .G/j D jE.G/j C 1.
```
```
      Proof. We prove that (1) implies (2) implies (3) implies (1).
```
```
           (1) implies (2): Since a finite tree is a finite forest with one component,
```
```
            Theorem 12.11.5 immediately implies (2).
```
```
           (2) implies (3): By Theorem 12.11.5, a finite finite forest has jV .G/j
```
```
            jE.G/j D 1 component and is therefore connected by definition of com-
```
```
            ponent.
```
```
           (3) implies (1): Suppose G is finite and connected. Then there is a set
```
```
            E  E.G/ of edges on cycles of G such that removing these edges leaves
```
```
            a connected acyclic graph G E. Since G E has one component, Theo-
```
```
            rem 12.11.5 implies that
```
```
                         1 DjV .G    E/j    jE.G     E/j
```
```
                              D jV .G/j    .jE.G/j    jEj/
```
```
                              D .jV .G/j   jE.G/j/ C jEj
```
```
                              D 1 C jEj                                (by (3)):
```
```
             So jEj D 0, which means that G must have been acyclic to begin with.
```
```
                                                                                         
```
```
     

12.11. Forests & Trees                                                             531
```

 Figure 12.20 A graph where the edges of a spanning tree have been thickened.

#### 12.11.3 Spanning Trees
Trees are everywhere. In fact, every connected graph contains a subgraph that is a
tree with the same vertices as the graph. This is called a spanning tree for the graph.
For example, Figure 12.20 is a connected graph with a spanning tree highlighted.
Definition 12.11.7. A spanning subgraph of a graph G is a subgraph whose ver-
tices are the same as the vertices of G.
Theorem 12.11.8. Every finite connected graph contains a spanning tree.
Proof. Suppose G is a finite connected graph, so the graph G itself is a connected,
spanning subgraph. So by WOP, G must have a edge-minimal connected, spanning
subgraph T , which by Theorem 12.11.4.2 will be a tree.                          

#### 12.11.4 Minimum-Weight Spanning Trees
Spanning trees are particularly interesting and important for weighted graphs—
graphs whose edges are assigned numerical weights. The overall weight of a
weighted graph is the sum of the weights of all its edges. For example, the weight
of the spanning tree shown in Figure 12.21(a) is 19.
   The general goal is to find a spanning tree with minimum weight, called a
minimum-weight spanning tree (MST).
   The spanning tree shown in Figure 12.21(a) turns out not to be an MST of the
graph in Figure 12.21(b): Figure 12.22 shows another spanning tree for this graph
with weight 17. This weight 17 turns out to be an MST, but how do we prove it? In
general, how do we find an MST for a connected graph G? We could try enumer-
ating all subtrees of G, but that approach would be hopeless for large graphs.
   For the rest of this section, suppose G is a connected weighted graph. We’ll now
explain a simple, general way to find an MST of G.
Definition 12.11.9. A black-white coloring of a simple graph G is a partition of
the vertices V .G/ into two blocks—the “black” vertices and the “white” vertices.
A gray edge of the coloring is an edge of G with different colored endpoints.
```
           

## 532 Chapter 12   Simple Graphs
```
```

                                                                 1
```
```
                    2                                    2                     3
```
```
                               3                                     3
```
```
                         2                                   2
```
```
                                             3                                 3
```
```
                         1          1                    4   1            1
```
```

                                                                     1
```
```
                                             7                                 7
```
```
                                   (a)                                   (b)
```
```

              Figure 12.21 A spanning tree (a) with weight 19 for a graph (b).
```
```

                                                 1
```
```
                                         2
```
```

                                             2
```
```
                                                             3
```
```
                                             1       1
```
```

                                                             7
```
```

          Figure 12.22       An MST with weight 17 for the graph in Figure 12.21(b).
```
```
     

12.11. Forests & Trees                                                            533
```

Lemma 12.11.10. If G is a connected graph, then every black-white coloring of G
contains a gray edge.

Proof. Any coloring of G must have at least one vertex of each color—this follows
because the blocks of a partition are by definition nonempty.
   Since G is connected, there will be a path that begins at a black vertex and ends
at a white vertex. Therefore at some point on the path there has to be an edge that
starts with a black vertex and ends with a white one. This is the gray edge.      
```

   The weighted graphs examples up to now each had two or more edges with the
```
same weight. This is common. But our story becomes simpler if all weights are
different.
```

       For the rest of this section, assume there are no same-weight edges:
```
```
       different edges have different weights.
```
```

   There is really no loss of generality in assuming different weights, since every-
```
thing we do below assuming distinct weights would work if we assigned an arbi-
trary rank to same-weight edges and treated higher rank vertices as having larger
weight.
   The following lemma now makes it easy to find MST’s.

Lemma 12.11.11 (Gray Edge Lemma). For any black-white coloring of a con-
nected graph G, the minimum-weight edge among the gray edges of the coloring
must be an edge of every MST of G.

  So to find an MST for G, we just need to find enough minimum-weight gray
edges to form a spanning tree. We do this using:
```

                         Minimum-Weight Gray Edge Procedure
```
```

       Start off with the disconnected spanning forest consisting of the ver-
```
```
       tices of G with all edges removed. Next, suppose S is a spanning forest
```
```
       built up at some point by the procedure. If S is not yet connected, then
```
```
       pick a black-white coloring of G such that such that all the vertices in
```
```
       the same connected component of S have the same color. Gray edges
```
```
       now connect different components of S, so none of them are in S . Up-
```
```
       date S by adding the minimum weight gray edge of this coloring to the
```
```
       edges of S . Continue until S becomes connected.
```

Theorem 12.11.12. The Minimum-Weight Gray Edge Procedure will terminate
with an MST.
```
            

## 534 Chapter 12    Simple Graphs
```
```

      Proof. To see why this procedure works, suppose G has n vertices and let S be
```
```
      the current spanning forest at any point in the procedure. If S is not connected, a
```
```
      black-white coloring is chosen so that the endpoints of any edge of S are the same
```
```
      color. This ensures that no gray edge is an edge of S .
```
```
         By Lemma 12.11.10, there must be at least one gray edge in the coloring, so
```
```
      there will be a minimum-weight gray edge.9 Updating S by adding this gray edge
```
```
      decreases the number of connected components of S by one, so after adding n 1
```
```
      gray edges, the procedure will terminate with a connected spanning forest, that is,
```
```
      a spanning tree T .
```
```
         By the Gray Edge Lemma 12.11.11, every edge of T has to be in every MST of
```
```
      G. This is only possible if all MST’s have the same edges as T , that is, they all
```
```
      equal T . So T is the unique possible MST of G.                                  
```
```
      Corollary 12.11.13. Every connected graph with no same-weight edges has a
```
```
      unique MST.
```
```
        Here are three known algorithms that are special cases of the Minimum Weight
```
```
      Gray Edge Procedure;
```
```
      Algorithm 1. [Prim] Grow S one edge at a time by adding a minimum weight
```
```
      edge among the edges that have exactly one endpoint in S .
```
```
        This is the algorithm that comes from coloring the growing tree white and all the
```
```
      vertices not in the tree black. Then the gray edges are the ones with exactly one
```
```
      endpoint in the tree.
```
```
      Algorithm 2. [Kruskal] Grow S one edge at a time by adding a minimum weight
```
```
      edge among the edges that do not create a cycle in S .
```
```
        An edge does not create a cycle in S iff it connects different components of S .
```
```
      So the edge chosen by Kruskal’s algorithm will be the minimum weight gray edge
```
```
      when the components it connects are assigned different colors.
```
```
        The coloring that explains Algorithm 1 also justifies a more flexible algorithm
```
```
      which has Algorithm 1 as a special case:
```
```
      Algorithm 3. Grow a forest one edge at a time by picking any component and
```
```
      adding a minimum weight edge among the edges leaving that component.
```
```
        This algorithm allows components that are not too close to grow in parallel and
```
```
      independently, which is great for “distributed” computation where separate proces-
```
```
      sors share the work with limited communication between processors.10
```
```
         9 . . . by the Well Ordering Principle for finite sets Lemma2.4.5.
```
```
        10 The idea of growing trees in parallel seems first to have been developed in by Boru̇vka (1926), ref
```
```

      TBA. Efficient MST algorithms running in parallel time O.log jV j/ are described in Karger, Klein,
```
```
      and Tarjan (1995), ref TBA.
```
```
                

           12.12. References                                                              535
```
```

             Ok, to wrap up this story, all that’s left is the proof of Lemma 12.11.11 that
```
```
           min-weight gray edges must be in every spanning tree. Let’s start with another
```
```
           lemma:
```
```
           Lemma 12.11.14. [Gray Edge Swap] Let G be a connected weighted graph, and
```
```
           let e be the minimum-weight gray edge of some black-white coloring of of G. Sup-
```
```
           pose C is a connected spanning subgraph of G, and e is not an edge of C . Then
```
```
           there is an edge g of C such that
```
```
                weight.e/ < weight.g/,
```
```
                C g C e is connected, where C g C e is the graph obtained by removing
```
```
                 g and adding e to the set of edges of C .
```
```
              Notice that the Gray Edge Lemma 12.11.11 now follows immediately from the
```
```
           Swap Lemma 12.11.14: if C is a spanning tree of G, then C g C e will also be a
```
```
           spanning tree, and it has smaller weight. So C cannot be minimum-weight unless
```
```
           e is one of its edges.
```
```
           Proof. (Swap Lemma 12.11.14) Pick a black-white coloring for which e is a min-
```
```
           weight gray edge. Since C is a connected spanning graph, there is a path p in C
```
```
           between the different colored endpoints of e. Now p has both a black endpoint
```
```
           and a white one, so it must contain some gray edge g ¤ e. Since e is a minimum
```
```
           weight gray edge and there are no same-weight edges, we have
```
```
                                         weight.e/ < weight.g/:
```
```
              Next, notice that p C e is a cycle. So when g is removed from the cycle, the
```
```
           endpoints of g remain connected by the rest of the cycle. This means C C e g is
```
```
           still a connected, spanning subgraph, as required.                           
```

### 12.12 References
```
           [9], [15], [24], [27], [29]
```

Problems for Section 12.2
```
           Practice Problems
```
```
           Problem 12.1.
```
```
           The average degree of the vertices in an n-vertex graph is twice the average number
```