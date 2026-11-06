---
title: "Basic Operations on Graphs"
book: hello-algo
chapter: chapter_graph
slug: graph_operations
order: 58
lang: en
---
Basic operations on graphs can be divided into operations on "edges" and operations on "vertices". Their implementations differ depending on whether the graph is represented as an "adjacency matrix" or an "adjacency list".

## Implementation Based on Adjacency Matrix

Given an undirected graph with $n$ vertices, the various operations are implemented as shown in the figure below.

- **Adding or removing an edge**: Directly modify the specified edge in the adjacency matrix, using $O(1)$ time. Since it is an undirected graph, both directions of the edge need to be updated simultaneously.
- **Adding a vertex**: Add a row and a column at the end of the adjacency matrix and fill them all with $0$s, using $O(n)$ time.
- **Removing a vertex**: Delete a row and a column in the adjacency matrix. The worst case occurs when removing the first row and column, requiring $(n-1)^2$ elements to be "moved up and to the left", thus using $O(n^2)$ time.
- **Initialization**: Given $n$ vertices, initialize a vertex list `vertices` of length $n$, using $O(n)$ time; initialize an adjacency matrix `adjMat` of size $n \times n$, using $O(n^2)$ time.

The following is the implementation code for graphs represented using an adjacency matrix:

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```py
class GraphAdjMat:
    """Undirected graph class implemented with an adjacency matrix"""

    def __init__(self, vertices: list[int], edges: list[list[int]]):
        """Constructor"""
        # Vertex list: elements are vertex values, and indices are vertex indices
        self.vertices: list[int] = []
        # Adjacency matrix: row and column indices correspond to vertex indices
        self.adj_mat: list[list[int]] = []
        # Add a vertex
        for val in vertices:
            self.add_vertex(val)
        # Add an edge
        # Note that the entries in edges are vertex indices, corresponding to element indices in vertices
        for e in edges:
            self.add_edge(e[0], e[1])

    def size(self) -> int:
        """Get the number of vertices"""
        return len(self.vertices)

    def add_vertex(self, val: int):
        """Add a vertex"""
        n = self.size()
        # Append the new vertex value to the vertex list
        self.vertices.append(val)
        # Add a row to the adjacency matrix
        new_row = [0] * n
        self.adj_mat.append(new_row)
        # Add a column to the adjacency matrix
        for row in self.adj_mat:
            row.append(0)

    def remove_vertex(self, index: int):
        """Remove a vertex"""
        if index >= self.size():
            raise IndexError()
        # Remove the vertex at index `index` from the vertex list
        self.vertices.pop(index)
        # Remove row `index` from the adjacency matrix
        self.adj_mat.pop(index)
        # Remove column `index` from the adjacency matrix
        for row in self.adj_mat:
            row.pop(index)

    def add_edge(self, i: int, j: int):
        """Add an edge"""
        # Parameters i and j are element indices in vertices
        # Handle out-of-bounds or equal indices
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        # For an undirected graph, the adjacency matrix is symmetric about its main diagonal: entries (i, j) and (j, i) are equal
        self.adj_mat[i][j] = 1
        self.adj_mat[j][i] = 1

    def remove_edge(self, i: int, j: int):
        """Remove an edge"""
        # Parameters i and j are element indices in vertices
        # Handle out-of-bounds or equal indices
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        self.adj_mat[i][j] = 0
        self.adj_mat[j][i] = 0

    def print(self):
        """Print the adjacency matrix"""
        print("Vertex list =", self.vertices)
        print("Adjacency matrix =")
        print_matrix(self.adj_mat)
```

</div>

## Implementation Based on Adjacency List

Given an undirected graph with a total of $n$ vertices and $m$ edges, the various operations can be implemented as shown in the figure below.

- **Adding an edge**: Add the edge at the end of the corresponding vertex's linked list, using $O(1)$ time. Since it is an undirected graph, edges in both directions need to be added simultaneously.
- **Removing an edge**: Find and remove the specified edge in the corresponding vertex's linked list, using $O(m)$ time. In an undirected graph, edges in both directions need to be removed simultaneously.
- **Adding a vertex**: Add a linked list to the adjacency list, with the new vertex as the head node, using $O(1)$ time.
- **Removing a vertex**: Traverse the entire adjacency list and remove all edges containing the specified vertex, using $O(n + m)$ time.
- **Initialization**: Create $n$ vertices and $2m$ edges in the adjacency list, using $O(n + m)$ time.

The following code shows the adjacency list implementation. Compared with the figure above, the actual code differs in the following ways.

- For convenience in adding and removing vertices, and to simplify the code, we use lists (dynamic arrays) instead of linked lists.
- A hash table is used to store the adjacency list, where `key` is the vertex instance and `value` is the list (linked list) of adjacent vertices for that vertex.

Additionally, we use the `Vertex` class to represent vertices in the adjacency list for the following reason: if we used list indices to distinguish different vertices, as with adjacency matrices, then to delete the vertex at index $i$, we would need to traverse the entire adjacency list and decrement all indices greater than $i$ by $1$, which is very inefficient. However, if each vertex is a unique `Vertex` instance, deleting one vertex does not require modifying the others.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```py
class GraphAdjList:
    """Undirected graph class implemented with an adjacency list"""

    def __init__(self, edges: list[list[Vertex]]):
        """Constructor"""
        # Adjacency list: key is a vertex, value is the list of all its neighbors
        self.adj_list = dict[Vertex, list[Vertex]]()
        # Add all vertices and edges
        for edge in edges:
            self.add_vertex(edge[0])
            self.add_vertex(edge[1])
            self.add_edge(edge[0], edge[1])

    def size(self) -> int:
        """Get the number of vertices"""
        return len(self.adj_list)

    def add_edge(self, vet1: Vertex, vet2: Vertex):
        """Add an edge"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # Add edge vet1 - vet2
        self.adj_list[vet1].append(vet2)
        self.adj_list[vet2].append(vet1)

    def remove_edge(self, vet1: Vertex, vet2: Vertex):
        """Remove an edge"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # Remove edge vet1 - vet2
        self.adj_list[vet1].remove(vet2)
        self.adj_list[vet2].remove(vet1)

    def add_vertex(self, vet: Vertex):
        """Add a vertex"""
        if vet in self.adj_list:
            return
        # Add a new list to the adjacency list
        self.adj_list[vet] = []

    def remove_vertex(self, vet: Vertex):
        """Remove a vertex"""
        if vet not in self.adj_list:
            raise ValueError()
        # Remove the list corresponding to vertex vet from the adjacency list
        self.adj_list.pop(vet)
        # Traverse the lists of the other vertices and remove all edges incident to vet
        for vertex in self.adj_list:
            if vet in self.adj_list[vertex]:
                self.adj_list[vertex].remove(vet)

    def print(self):
        """Print the adjacency list"""
        print("Adjacency list =")
        for vertex in self.adj_list:
            tmp = [v.val for v in self.adj_list[vertex]]
            print(f"{vertex.val}: {tmp},")
```

</div>

## Efficiency Comparison

Assuming the graph has $n$ vertices and $m$ edges, the table below compares the time efficiency and space efficiency of adjacency matrices and adjacency lists. Note that the adjacency list (linked list) corresponds to the implementation used in this section, while the adjacency list (hash table) refers specifically to the implementation where all linked lists are replaced with hash tables.

<p align="center"> Table <id> &nbsp; Comparison of adjacency matrix and adjacency list </p>

|                        | Adjacency matrix | Adjacency list (linked list) | Adjacency list (hash table) |
| ---------------------- | ---------------- | ---------------------------- | --------------------------- |
| Determine adjacency    | $O(1)$           | $O(n)$                       | $O(1)$                      |
| Add an edge            | $O(1)$           | $O(1)$                       | $O(1)$                      |
| Remove an edge         | $O(1)$           | $O(n)$                       | $O(1)$                      |
| Add a vertex           | $O(n)$           | $O(1)$                       | $O(1)$                      |
| Remove a vertex        | $O(n^2)$         | $O(n + m)$                   | $O(n)$                      |
| Memory space usage     | $O(n^2)$         | $O(n + m)$                   | $O(n + m)$                  |

Observing the table above, it appears that the adjacency list (hash table) has the best time efficiency and space efficiency. However, in practice, operating on edges in the adjacency matrix is more efficient, requiring only a single array access or assignment operation. Overall, adjacency matrices embody the principle of "trading space for time", while adjacency lists embody "trading time for space".
