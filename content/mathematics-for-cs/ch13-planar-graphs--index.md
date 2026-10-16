---
title: "Planar Graphs"
lang: en
---

## 13 Planar Graphs

### 13.1 Drawing Graphs in the Plane
```
            Suppose there are three dog houses and three human houses, as shown in Fig-
```
```
            ure 13.1. Can you find a route from each dog house to each human house such that
```
```
            no route crosses any other route?
```
```
               A similar question comes up about a little-known animal called a quadrapus that
```
```
            looks like an octopus with four stretchy arms instead of eight. If five quadrapi are
```
```
            resting on the sea floor, as shown in Figure 13.2, can each quadrapus simultane-
```
```
            ously shake hands with every other in such a way that no arms cross?
```
```
               Both these puzzles can be understood as asking about drawing graphs in the
```
```
            plane. Replacing dogs and houses by nodes, the dog house puzzle can be rephrased
```
```
            as asking whether there is a planar drawing of the graph with six nodes and edges
```
```
            between each of the first three nodes and each of the second three nodes. This
```
```
            graph is called the complete bipartite graph K3;3 and is shown in Figure 13.3.(a).
```
```
            The quadrapi puzzle asks whether there is a planar drawing of the complete graph
```
```
            K5 shown in Figure 13.3.(b).
```
```
               In each case, the answer is, “No—but almost!” In fact, if you remove an edge
```
```
            from either of these graphs, then the resulting graph can be redrawn in the plane so
```
```
            that no edges cross, as shown in Figure 13.4.
```
```
               Planar drawings have applications in circuit layout and are helpful in displaying
```
```
            graphical data such as program flow charts, organizational charts and scheduling
```
```
            conflicts. For these applications, the goal is to draw the graph in the plane with as
```
```
            few edge crossings as possible. (See the box on the following page for one such
```
```
            example.)
```

### 13.2 Definitions of Planar Graphs
```
            We took the idea of a planar drawing for granted in the previous section, but if
```
```
            we’re going to prove things about planar graphs, we better have precise definitions.
```
```

            Definition 13.2.1. A drawing of a graph assigns to each node a distinct point in
```
```
            the plane and assigns to each edge a smooth curve in the plane whose endpoints
```
```
            correspond to the nodes incident to the edge. The drawing is planar if none of the
```
```
           

## 576 Chapter 13   Planar Graphs
```
```

      Figure 13.1 Three dog houses and and three human houses. Is there a route from
```
```
      each dog house to each human house so that no pair of routes cross each other?
```
```
      

13.2. Definitions of Planar Graphs                                        577
```
```

                   Figure 13.2 Five quadrapi (4-armed creatures).
```
```

                              (a)                  (b)
```

**Figure 3 K3;3 (a) and K5 (b). Can you redraw these graphs so that no pairs**
of edges cross?
```
           

## 578 Chapter 13   Planar Graphs
```
```

                                         u
```
```
                                                                          u
```
```

                              v                              v
```
```

                                   (a)                           (b)
```
```

      Figure 13.4 Planar drawings of (a) K3;3 without hu—vi, and (b) K5 without
```
```
      hu—vi.
```
```

      Steve Wozniak and a Planar Circuit Design
```
```
      When wires are arranged on a surface, like a circuit board or microchip, cross-
```
```
      ings require troublesome three-dimensional structures. When Steve Wozniak
```
```
      designed the disk drive for the early Apple II computer, he struggled might-
```
```
      ily to achieve a nearly planar design according to the following excerpt from
```
```
      apple2history.org which in turn quotes Fire in the Valley by Freiberger
```
```
      and Swaine:
```
```

             For two weeks, he worked late each night to make a satisfactory de-
```
```
             sign. When he was finished, he found that if he moved a connector
```
```
             he could cut down on feedthroughs, making the board more reliable.
```
```
             To make that move, however, he had to start over in his design. This
```
```
             time it only took twenty hours. He then saw another feedthrough
```
```
             that could be eliminated, and again started over on his design. “The
```
```
             final design was generally recognized by computer engineers as bril-
```
```
             liant and was by engineering aesthetics beautiful. Woz later said, ’It’s
```
```
             something you can only do if you’re the engineer and the PC board
```
```
             layout person yourself. That was an artistic layout. The board has
```
```
             virtually no feedthroughs.’
```
```
      

13.2. Definitions of Planar Graphs                                                                  579
```

curves cross themselves or other curves, namely, the only points that appear more
than once on any of the curves are the node points. A graph is planar when it has a
planar drawing.
```

   Definition 13.2.1 is precise but depends on further concepts: “smooth planar
```
curves” and “points appearing more than once” on them. We haven’t defined these
concepts—we just showed the simple picture in Figure 13.4 and hoped you would
get the idea.
   Pictures can be a great way to get a new idea across, but it is generally not a good
idea to use a picture to replace precise mathematics. Relying solely on pictures can
sometimes lead to disaster—or to bogus proofs, anyway. There is a long history of
bogus proofs about planar graphs based on misleading pictures.
   The bad news is that to prove things about planar graphs using the planar draw-
ings of Definition 13.2.1, we’d have to take a chapter-long excursion into contin-
uous mathematics just to develop the needed concepts from plane geometry and
point-set topology. The good news is that there is another way to define planar
graphs that uses only discrete mathematics. In particular, we can define planar
graphs as a recursive data type. In order to understand how it works, we first need
to understand the concept of a face in a planar drawing.

#### 13.2.1 Faces
The curves in a planar drawing divide up the plane into connected regions called
the continuous faces1 of the drawing. For example, the drawing in Figure 13.5 has
four continuous faces. Face IV, which extends off to infinity in all directions, is
called the outside face.
  The vertices along the boundary of each continuous face in Figure 13.5 form a
cycle. For example, labeling the vertices as in Figure 13.6, the cycles for each of
the face boundaries can be described by the vertex sequences
```

                           abca         abda         bcdb         acda:                       (13.1)
```

These four cycles correspond nicely to the four continuous faces in Figure 13.6—
so nicely, in fact, that we can identify each of the faces in Figure 13.6 by its cycle.
For example, the cycle abca identifies face III. The cycles in list 13.1 are called the
discrete faces of the graph in Figure 13.6. We use the term “discrete” since cycles
in a graph are a discrete data type—as opposed to a region in the plane, which is a
continuous data type.
   1 Most texts drop the adjective continuous from the definition of a face as a connected region. We

need the adjective to distinguish continuous faces from the discrete faces we’re about to define.
```
           

## 580 Chapter 13   Planar Graphs
```
```

                                                             III
```
```

                                            II           I
```
```

                                   IV
```
```

                   Figure 13.5 A planar drawing with four continuous faces.
```
```

                                                     b
```
```
                                                             III
```
```

                                    a       II           I
```
```
                                                                   c
```
```

                                   IV
```
```
                                                 d
```
```

                        Figure 13.6 The drawing with labeled vertices.
```
```
      

13.2. Definitions of Planar Graphs                                                581
```
```

                                                          f
```
```
                                b
```
```

                      a                   c     e
```
```

                                                                g
```
```
                                     d
```
```

                    Figure 13.7 A planar drawing with a bridge.
```

  Unfortunately, continuous faces in planar drawings are not always bounded by
cycles in the graph—things can get a little more complicated. For example, the
planar drawing in Figure 13.7 has what we will call a bridge, namely, a cut edge
hc—ei. The sequence of vertices along the boundary of the outer region of the
drawing is
```
                                 abcefgecda:
```
This sequence defines a closed walk, but does not define a cycle since the walk has
two occurrences of the bridge hc—ei and each of its endpoints.
   The planar drawing in Figure 13.8 illustrates another complication. This drawing
has what we will call a dongle, namely, the nodes v, x, y and w, and the edges
incident to them. The sequence of vertices along the boundary of the inner region
is
```
                                rst vxyxvwvt ur:
```
This sequence defines a closed walk, but once again does not define a cycle be-
cause it has two occurrences of every edge of the dongle—once “coming” and once
“going.”
   It turns out that bridges and dongles are the only complications, at least for con-
nected graphs. In particular, every continuous face in a planar drawing corresponds
to a closed walk in the graph. These closed walks will be called the discrete faces
of the drawing, and we’ll define them next.

#### 13.2.2 A Recursive Definition for Planar Embeddings
The association between the continuous faces of a planar drawing and closed walks
provides the discrete data type we can use instead of continuous drawings. We’ll
define a planar embedding of connected graph to be the set of closed walks that are
its face boundaries. Since all we care about in a graph are the connections between
```
           

## 582 Chapter 13   Planar Graphs
```
```

                                            s
```
```

                                            y
```
```
                                                    x
```
```
                                                        v
```
```
                              r                                   t
```
```

                                                w
```
```

                                                u
```
```

                         Figure 13.8 A planar drawing with a dongle.
```
```

      vertices—not what a drawing of the graph actually looks like—planar embeddings
```
```
      are exactly what we need.
```
```
         The question is how to define planar embeddings without appealing to continu-
```
```
      ous drawings. There is a simple way to do this based on the idea that any continuous
```
```
      drawing can drawn step by step:
```
```

           either draw a new point somewhere in the plane to represent a vertex,
```
```

           or draw a curve between two vertex points that have already been laid down,
```
```
            making sure the new curve doesn’t cross any of the previously drawn curves.
```
```

         A new curve won’t cross any other curves precisely when it stays within one
```
```
      of the continuous faces. Alternatively, a new curve won’t have to cross any other
```
```
      curves if it can go between the outer faces of two different drawings. So to be sure
```
```
      it’s ok to draw a new curve, we just need to check that its endpoints are on the
```
```
      boundary of the same face, or that its endpoints are on the outer faces of different
```
```
      drawings. Of course drawing the new curve changes the faces slightly, so the face
```
```
      boundaries will have to be updated once the new curve is drawn. This is the idea
```
```
      behind the following recursive definition.
```
```

      Definition 13.2.2. A planar embedding of a connected graph consists of a nonempty
```
```
      set of closed walks of the graph called the discrete faces of the embedding. Planar
```
```
      embeddings are defined recursively as follows:
```
```
      Base case: If G is a graph consisting of a single vertex v then a planar embedding
```
```
      of G has one discrete face, namely, the length zero closed walk v.
```
```
      

13.2. Definitions of Planar Graphs                                                                583
```
```

                                                   w
```
```
                                      a
```
```

                                                                       x
```
```

                            z
```
```

                                          y               b
```

 Figure 13.9 The “split a face” case: awxbyza splits into awxba and abyza.

Constructor case (split a face): Suppose G is a connected graph with a planar
embedding, and suppose a and b are distinct, nonadjacent vertices of G that occur
in some discrete face of the planar embedding. That is, is a closed walk of the
form
```
                                     D ˛bˇ
```
where ˛ is a walk from a to b and ˇ is a walk from b to a. Then the graph obtained
by adding the edge ha—bi to the edges of G has a planar embedding with the same
discrete faces as G, except that face is replaced by the two discrete faces2
```

                                ˛b hb—ai        and      ha—bi bˇ                             (13.2)
```

as illustrated in Figure 13.9.3
Constructor case (add a bridge): Suppose G and H are connected graphs with
planar embeddings and disjoint sets of vertices. Let be a discrete face of the
embedding of G and suppose that begins and ends at vertex a.
  Similarly, let ı be a discrete face of the embedding of H that begins and ends at
vertex b.
   2 There is a minor exception to this definition of embedding in the special case when G is a line

graph beginning with a and ending with b. In this case the cycles into which splits are actually
the same. That’s because adding edge ha—bi creates a cycle that divides the plane into “inner” and
“outer” continuous faces that are both bordered by this cycle. In order to maintain the correspondence
between continuous faces and discrete faces in this case, we define the two discrete faces of the
embedding to be two “copies” of this same cycle.
   3 Formally, merge is an operation on walks, not a walk and an edge, so in (13.2), we should have

used a walk .a ha—bi b/ instead of an edge ha—bi and written
```

                            ˛b.b hb—ai a/        and   .a ha—bi b/bˇ
```
```
           

## 584 Chapter 13    Planar Graphs
```
```

                                                                   t
```
```
                                    z
```
```

                                                                           u
```
```
                                                  a       b
```
```
                           y
```
```
                                                               w
```
```
                                                                       v
```
```
                                        x
```
```

                               Figure 13.10 The “add a bridge” case.
```
```

        Then the graph obtained by connecting G and H with a new edge ha—bi has a
```
```
      planar embedding whose discrete faces are the union of the discrete faces of G and
```
```
      H , except that faces and ı are replaced by one new face
```
```

                                            b ha—bi bıb hb—ai :
```
```

        This is illustrated in Figure 13.10, where the vertex sequences of the faces of G
```
```
      and H are:
```
```

               G W faxyza; axya; ayzag                H W fbt uvwb; bt vwb; t uvtg;
```
```

      and after adding the bridge ha—bi, there is a single connected graph whose faces
```
```
      have the vertex sequences
```
```

                         faxyzabt uvwba; axya; ayza; bt vwb; t uvtg:
```
```

         A bridge is simply a cut edge, but in the context of planar embeddings, the
```
```
      bridges are precisely the edges that occur twice on the same discrete face—as op-
```
```
      posed to once on each of two faces. Dongles are trees made of bridges; we only
```
```
      use dongles in illustrations, so there’s no need to define them more precisely.
```
```

      13.2.3       Does It Work?
```
```
      Yes! In general, a graph is planar because it has a planar drawing according to
```
```
      Definition 13.2.1 if and only if each of its connected components has a planar em-
```
```
      bedding as specified in Definition 13.2.2. Of course we can’t prove this without an
```
```
      excursion into exactly the kind of continuous math that we’re trying to avoid. But
```
```
      now that the recursive definition of planar graphs is in place, we won’t ever need to
```
```
      fall back on the continuous stuff. That’s the good news.
```
```
         The bad news is that Definition 13.2.2 is a lot more technical than the intuitively
```
```
      simple notion of a drawing whose edges don’t cross. In many cases it’s easier to
```
```
      

13.2. Definitions of Planar Graphs                                                 585
```
```

                                r                     r
```
```

                    u                   s s                      u
```
```

                                t                     t
```
```

              Figure 13.11 Two illustrations of the same embedding.
```

stick to the idea of planar drawings and give proofs in those terms. For example,
erasing edges from a planar drawing will surely leave a planar drawing. On the
other hand, it’s not so obvious, though of course it is true, that you can delete an
edge from a planar embedding and still get a planar embedding (see Problem 13.9).
   In the hands of experts, and perhaps in your hands too with a little more expe-
rience, proofs about planar graphs by appeal to drawings can be convincing and
reliable. But given the long history of mistakes in such proofs, it’s safer to work
from the precise definition of planar embedding. More generally, it’s also important
to see how the abstract properties of curved drawings in the plane can be modelled
successfully using a discrete data type.

#### 13.2.4 Where Did the Outer Face Go?
Every planar drawing has an immediately-recognizable outer face —it’s the one
that goes to infinity in all directions. But where is the outer face in a planar embed-
ding?
   There isn’t one! That’s because there really isn’t any need to distinguish one face
from another. In fact, a planar embedding could be drawn with any given face on
the outside. An intuitive explanation of this is to think of drawing the embedding
on a sphere instead of the plane. Then any face can be made the outside face by
“puncturing” that face of the sphere, stretching the puncture hole to a circle around
the rest of the faces, and flattening the circular drawing onto the plane.
   So pictures that show different “outside” boundaries may actually be illustra-
tions of the same planar embedding. For example, the two embeddings shown in
**Figure 11 are really the same—check it: they have the same boundary cycles.**
   This is what justifies the “add bridge” case in Definition 13.2.2: whatever face
is chosen in the embeddings of each of the disjoint planar graphs, we can draw
a bridge between them without needing to cross any other edges in the drawing,
because we can assume the bridge connects two “outer” faces.
```
                

## 586 Chapter 13   Planar Graphs
```

### 13.3 Euler’s Formula
```
           The value of the recursive definition is that it provides a powerful technique for
```
```
           proving properties of planar graphs, namely, structural induction. For example,
```
```
           we will now use Definition 13.2.2 and structural induction to establish one of the
```
```
           most basic properties of a connected planar graph, namely, that the number of ver-
```
```
           tices and edges completely determines the number of faces in every possible planar
```
```
           embedding of the graph.
```
```

           Theorem 13.3.1 (Euler’s Formula). If a connected graph has a planar embedding,
```
```
           then
```
```
                                          v eCf D2
```
```
           where v is the number of vertices, e is the number of edges and f is the number of
```
```
           faces.
```
```

              For example, in Figure 13.5, v D 4, e D 6 and f D 4. Sure enough, 4 6 C 4 D
```
```
           2, as Euler’s Formula claims.
```
```

           Proof. The proof is by structural induction on the definition of planar embeddings.
```
```
           Let P .E/ be the proposition that v e C f D 2 for an embedding E.
```
```
           Base case (E is the one-vertex planar embedding): By definition, v D 1, e D 0 and
```
```
           f D 1, and 1 0 C 1 D 2, so P .E/ indeed holds.
```
```
           Constructor case (split a face): Suppose G is a connected graph with a planar
```
```
           embedding, and suppose a and b are distinct, nonadjacent vertices of G that appear
```
```
           on some discrete face D a : : : b    a of the planar embedding.
```
```
              Then the graph obtained by adding the edge ha—bi to the edges of G has a
```
```
           planar embedding with one more face and one more edge than G. So the quantity
```
```
           v e C f will remain the same for both graphs, and since by structural induction
```
```
           this quantity is 2 for G’s embedding, it’s also 2 for the embedding of G with the
```
```
           added edge. So P holds for the constructed embedding.
```
```
           Constructor case (add bridge): Suppose G and H are connected graphs with pla-
```
```
           nar embeddings and disjoint sets of vertices. Then connecting these two graphs
```
```
           with a bridge merges the two bridged faces into a single face, and leaves all other
```
```
           faces unchanged. So the bridge operation yields a planar embedding of a connected
```
```
                

           13.4. Bounding the Number of Edges in a Planar Graph                              587
```
```

           graph with vG C vH vertices, eG C eH C 1 edges, and fG C fH             1 faces. Since
```
```

                      .vG C vH /      .eG C eH C 1/ C .fG C fH            1/
```
```
                            D .vG      eG C fG / C .vH        eH C fH /        2
```
```
                            D .2/ C .2/      2      (by structural induction hypothesis)
```
```
                            D 2;
```
```

           v e C f remains equal to 2 for the constructed embedding. That is, P .E/ also
```
```
           holds in this case.
```
```
              This completes the proof of the constructor cases, and the theorem follows by
```
```
           structural induction.                                                         
```

### 13.4 Bounding the Number of Edges in a Planar Graph
```
           Like Euler’s formula, the following lemmas follow by structural induction directly
```
```
           from Definition 13.2.2.
```
```

           Lemma 13.4.1. In a planar embedding of a connected graph, each edge occurs
```
```
           once in each of two different faces, or occurs exactly twice in one face.
```
```

           Lemma 13.4.2. In a planar embedding of a connected graph with at least three
```
```
           vertices, each face is of length at least three.
```
```

             Combining Lemmas 13.4.1 and 13.4.2 with Euler’s Formula, we can now prove
```
```
           that planar graphs have a limited number of edges:
```
```

           Theorem 13.4.3. Suppose a connected planar graph has v  3 vertices and e
```
```
           edges. Then
```
```
                                         e  3v 6:                             (13.3)
```
```

           Proof. By definition, a connected graph is planar iff it has a planar embedding. So
```
```
           suppose a connected graph with v vertices and e edges has a planar embedding
```
```
           with f faces. By Lemma 13.4.1, every edge has exactly two occurrences in the
```
```
           face boundaries. So the sum of the lengths of the face boundaries is exactly 2e.
```
```
           Also by Lemma 13.4.2, when v  3, each face boundary is of length at least three,
```
```
           so this sum is at least 3f . This implies that
```
```

                                                   3f  2e:                                (13.4)
```
```
                 

## 588 Chapter 13   Planar Graphs
```
```

            But f D e      v C 2 by Euler’s formula, and substituting into (13.4) gives
```
```

                                          3.e     v C 2/  2e
```
```
                                            e    3v C 6  0
```
```
                                                      e  3v     6                            
```

### 13.5 Returning to K5 and K3;3
```
            Finally we have a simple way to answer the quadrapi question at the beginning of
```
```
            this chapter: the five quadrapi can’t all shake hands without crossing. The reason
```
```
            is that we know the quadrupi question is the same as asking whether a complete
```
```
            graph K5 is planar, and Theorem 13.4.3 has the immediate:
```
```

            Corollary 13.5.1. K5 is not planar.
```
```

            Proof. K5 is connected and has 5 vertices and 10 edges. But since 10 > 3  5      6,
```
```
            K5 does not satisfy the inequality (13.3) that holds in all planar graphs.        
```
```

              We can also use Euler’s Formula to show that K3;3 is not planar. The proof is
```
```
            similar to that of Theorem 13.3 except that we use the additional fact that K3;3 is a
```
```
            bipartite graph.
```
```

            Lemma 13.5.2. In a planar embedding of a connected bipartite graph with at least
```
```
            3 vertices, each face has length at least 4.
```
```

            Proof. By Lemma 13.4.2, every face of a planar embedding of the graph has length
```
```
            at least 3. But by Lemma 12.6.2 and Theorem 12.8.3.3, a bipartite graph can’t have
```
```
            odd length closed walks. Since the faces of a planar embedding are closed walks,
```
```
            there can’t be any faces of length 3 in a bipartite embedding. So every face must
```
```
            have length at least 4.                                                         
```
```

            Theorem 13.5.3. Suppose a connected bipartite graph with v  3 vertices and e
```
```
            edges is planar. Then
```
```
                                           e  2v 4:                                (13.5)
```
```

            Proof. Lemma 13.5.2 implies that all the faces of an embedding of the graph have
```
```
            length at least 4. Now arguing as in the proof of Theorem 13.4.3, we find that the
```
```
            sum of the lengths of the face boundaries is exactly 2e and at least 4f . Hence,
```
```

                                                  4f  2e                                 (13.6)
```
```
                

           13.6. Coloring Planar Graphs                                                       589
```
```

           for any embedding of a planar bipartite graph. By Euler’s theorem, f D 2        v C e.
```
```
           Substituting 2 v C e for f in (13.6), we have
```
```

                                            4.2    v C e/  2e;
```
```

           which simplies to (13.5).                                                           
```
```

           Corollary 13.5.4. K3;3 is not planar.
```
```

           Proof. K3;3 is connected, bipartite and has 6 vertices and 9 edges. But since 9 >
```
```
           2  6 4, K3;3 does not satisfy the inequality (13.3) that holds in all bipartite planar
```
```
           graphs.                                                                              
```

### 13.6 Coloring Planar Graphs
```
           We’ve covered a lot of ground with planar graphs, but not nearly enough to prove
```
```
           the famous 4-color theorem. But we can get awfully close. Indeed, we have done
```
```
           almost enough work to prove that every planar graph can be colored using only 5
```
```
           colors.
```
```
             There are two familiar facts about planarity that we will need.
```
```

           Lemma 13.6.1. Any subgraph of a planar graph is planar.
```
```

           Lemma 13.6.2. Merging two adjacent vertices of a planar graph leaves another
```
```
           planar graph.
```
```

              Merging two adjacent vertices, n1 and n2 of a graph means deleting the two
```
```
           vertices and then replacing them by a new “merged” vertex m adjacent to all the
```
```
           vertices that were adjacent to either of n1 or n2 , as illustrated in Figure 13.12.
```
```
              Many authors take Lemmas 13.6.1 and 13.6.2 for granted for continuous draw-
```
```
           ings of planar graphs described by Definition 13.2.1. With the recursive Defini-
```
```
           tion 13.2.2 both Lemmas can actually be proved using structural induction (see
```
```
           Problem 13.9).
```
```
              We need only one more lemma:
```
```

           Lemma 13.6.3. Every planar graph has a vertex of degree at most five.
```
```

           Proof. Assuming to the contrary that every vertex of some planar graph had degree
```
```
           at least 6, then the sum of the vertex degrees is at least 6v. But the sum of the
```
```
           vertex degrees equals 2e by the Handshake Lemma 12.2.1, so we have e  3v
```
```
           contradicting the fact that e  3v 6 < 3v by Theorem 13.4.3.                   
```
```
           

## 590 Chapter 13    Planar Graphs
```
```

                   n1
```
```
                                             n1
```
```
                                    !        n2
```
```
                                                              !          m
```
```

                   n2
```
```

           Figure 13.12       Merging adjacent vertices n1 and n2 into new vertex m.
```
```

      Theorem 13.6.4. Every planar graph is five-colorable.
```
```

      Proof. The proof will be by strong induction on the number v of vertices, with
```
```
      induction hypothesis:
```
```

            Every planar graph with v vertices is five-colorable.
```
```

      Base cases (v  5): immediate.
```
```
      Inductive case: Suppose G is a planar graph with v C 1 vertices. We will describe
```
```
      a five-coloring of G.
```
```
         First, choose a vertex g of G with degree at most 5; Lemma 13.6.3 guarantees
```
```
      there will be such a vertex.
```
```

      Case 1: (deg.g/ < 5): Deleting g from G leaves a graph H that is planar by
```
```
           Lemma 13.6.1, and since H has v vertices, it is five-colorable by induction
```
```
           hypothesis. Now define a five coloring of G as follows: use the five-coloring
```
```
           of H for all the vertices besides g, and assign one of the five colors to g that
```
```
           is not the same as the color assigned to any of its neighbors. Since there are
```
```
           fewer than 5 neighbors, there will always be such a color available for g.
```
```

      Case 2: (deg.g/ D 5): If the five neighbors of g in G were all adjacent to each
```
```
           other, then these five vertices would form a nonplanar subgraph isomorphic
```
```
           to K5 , contradicting Lemma 13.6.1 (since K5 is not planar). So there must
```
```
                  

            13.7. Classifying Polyhedra                                                      591
```
```

                   be two neighbors, n1 and n2 , of g that are not adjacent. Now merge n1 and g
```
```
                   into a new vertex, m. In this new graph, n2 is adjacent to m, and the graph is
```
```
                   planar by Lemma 13.6.2. So we can then merge m and n2 into a another new
```
```
                   vertex m0 , resulting in a new graph G 0 which by Lemma 13.6.2 is also planar.
```
```
                   Since G 0 has v 1 vertices, it is five-colorable by the induction hypothesis.
```
```
                   Now define a five coloring of G as follows: use the five-coloring of G 0 for
```
```
                   all the vertices besides g, n1 and n2 . Next assign the color of m0 in G 0 to
```
```
                   be the color of the neighbors n1 and n2 . Since n1 and n2 are not adjacent
```
```
                   in G, this defines a proper five-coloring of G except for vertex g. But since
```
```
                   these two neighbors of g have the same color, the neighbors of g have been
```
```
                   colored using fewer than five colors altogether. So complete the five-coloring
```
```
                   of G by assigning one of the five colors to g that is not the same as any of
```
```
                   the colors assigned to its neighbors.
```
```

                                                                                              
```

### 13.7 Classifying Polyhedra
```
                                                                                         p
```
```
            The Pythagoreans had two great mathematical secrets, the irrationality of 2 and
```
```
            a geometric construct that we’re about to rediscover!
```
```
               A polyhedron is a convex, three-dimensional region bounded by a finite number
```
```
            of polygonal faces. If the faces are identical regular polygons and an equal number
```
```
            of polygons meet at each corner, then the polyhedron is regular. Three examples
```
```
            of regular polyhedra are shown in Figure 13.13: the tetrahedron, the cube, and the
```
```
            octahedron.
```
```
               We can determine how many more regular polyhedra there are by thinking about
```
```
            planarity. Suppose we took any polyhedron and placed a sphere inside it. Then we
```
```
            could project the polyhedron face boundaries onto the sphere, which would give
```
```
            an image that was a planar graph embedded on the sphere, with the images of the
```
```
            corners of the polyhedron corresponding to vertices of the graph. We’ve already
```
```
            observed that embeddings on a sphere are the same as embeddings on the plane, so
```
```
            Euler’s formula for planar graphs can help guide our search for regular polyhedra.
```
```
               For example, planar embeddings of the three polyhedra in Figure 13.1 are shown
```
```
            in Figure 13.14.
```
```
               Let m be the number of faces that meet at each corner of a polyhedron, and let n
```
```
            be the number of edges on each face. In the corresponding planar graph, there are
```
```
            m edges incident to each of the v vertices. By the Handshake Lemma 12.2.1, we
```
```
           

## 592 Chapter 13   Planar Graphs
```
```

                         (a)                         (b)                       (c)
```
```

               Figure 13.13        The tetrahedron (a), cube (b), and octahedron (c).
```
```
                                                  v
```
```

                           (a)                      (b)                  (c)
```
```

      Figure 13.14      Planar embeddings of the tetrahedron (a), cube (b), and octahe-
```
```
      dron (c).
```
```
      

13.7. Classifying Polyhedra                                                      593
```
```

                          n m v e f polyhedron
```
```
                          3 3 4 6 4 tetrahedron
```
```
                          4 3 8 12 6 cube
```
```
                          3 4 6 12 8 octahedron
```
```
                          3 5 12 30 20 icosahedron
```
```
                          5 3 20 30 12 dodecahedron
```
```

                 Figure 13.15   The only possible regular polyhedra.
```

know:
```
                                     mv D 2e:
```
Also, each face is bounded by n edges. Since each edge is on the boundary of two
faces, we have:
```
                                   nf D 2e
```
Solving for v and f in these equations and then substituting into Euler’s formula
gives:
```
                                   2e        2e
```
```
                                        eC       D2
```
```
                                   m         n
```
which simplifies to
```
                                   1    1     1 1
```
```
                                      C D C                                    (13.7)
```
```
                                   m n        e    2
```
Equation 13.7 places strong restrictions on the structure of a polyhedron. Every
nondegenerate polygon has at least 3 sides, so n  3. And at least 3 polygons
must meet to form a corner, so m  3. On the other hand, if either n or m were
## 6 or more, then the left side of the equation could be at most 1=3 C 1=6 D 1=2,
which is less than the right side. Checking the finitely-many cases that remain turns
up only five solutions, as shown in Figure 13.15. For each valid combination of n
and m, we can compute the associated number of vertices v, edges e, and faces f .
And polyhedra with these properties do actually exist. The largest polyhedron, the
dodecahedron, was the other great mathematical secret of the Pythagorean sect.
   The 5 polyhedra in Figure 13.15 are the only possible regular polyhedra. So if
you want to put more than 20 geocentric satellites in orbit so that they uniformly
blanket the globe—tough luck!
```
                  

## 594 Chapter 13   Planar Graphs
```

### 13.8 Another Characterization for Planar Graphs
```
           We did not pick K5 and K3;3 as examples because of their application to dog
```
```
           houses or quadrapi shaking hands. We really picked them because they provide
```
```
           another, famous, discrete characterizarion of planar graphs:
```
```

           Theorem 13.8.1 (Kuratowski). A graph is not planar if and only if it contains K5
```
```
           or K3;3 as a minor.
```
```

           Definition 13.8.2. A minor of a graph G is a graph that can be obtained by repeat-
```
```
           edly4 deleting vertices, deleting edges, and merging adjacent vertices of G.
```
```

              For example, Figure 13.16 illustrates why C3 is a minor of the graph in Fig-
```
```
           ure 13.16(a). In fact C3 is a minor of a connected graph G if and only if G is not a
```
```
           tree.
```
```
              The known proofs of Kuratowski’s Theorem 13.8.1 are a little too long to include
```
```
           in an introductory text, so we won’t give one.
```

Problems for Section 13.2
```
           Practice Problems
```
```
           Problem 13.1.
```
```
           What are the discrete faces of the following two graphs?
```
```
             Write each cycle as a sequence of letters without spaces, starting with the alpha-
```
```
           betically earliest letter in the clockwise direction, for example “adbfa.” Separate
```
```
           the sequences with spaces.
```
```
            (a)
```
```
                                                                        f
```
```
                                                 b
```
```

                                          a                c    e
```
```

                                                                            g
```
```
                                                     d
```
```

            (b)
```
```
              4 The three operations can each be performed any number of times in any order.
```