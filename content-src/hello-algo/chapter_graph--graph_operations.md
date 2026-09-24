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
<p class="lang-tab__label">TypeScript</p>

```ts
/* Undirected graph class based on adjacency matrix */
class GraphAdjMat {
    vertices: number[]; // Vertex list, where the element represents the "vertex value" and the index represents the "vertex index"
    adjMat: number[][]; // Adjacency matrix, where the row and column indices correspond to the "vertex index"

    /* Constructor */
    constructor(vertices: number[], edges: number[][]) {
        this.vertices = [];
        this.adjMat = [];
        // Add vertex
        for (const val of vertices) {
            this.addVertex(val);
        }
        // Add edge
        // Note that the edges elements represent vertex indices, i.e., corresponding to the vertices element indices
        for (const e of edges) {
            this.addEdge(e[0], e[1]);
        }
    }

    /* Get the number of vertices */
    size(): number {
        return this.vertices.length;
    }

    /* Add vertex */
    addVertex(val: number): void {
        const n: number = this.size();
        // Add the value of the new vertex to the vertex list
        this.vertices.push(val);
        // Add a row to the adjacency matrix
        const newRow: number[] = [];
        for (let j: number = 0; j < n; j++) {
            newRow.push(0);
        }
        this.adjMat.push(newRow);
        // Add a column to the adjacency matrix
        for (const row of this.adjMat) {
            row.push(0);
        }
    }

    /* Remove vertex */
    removeVertex(index: number): void {
        if (index >= this.size()) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        // Remove the vertex at index from the vertex list
        this.vertices.splice(index, 1);

        // Remove the row at index from the adjacency matrix
        this.adjMat.splice(index, 1);
        // Remove the column at index from the adjacency matrix
        for (const row of this.adjMat) {
            row.splice(index, 1);
        }
    }

    /* Add edge */
    // Parameters i, j correspond to the vertices element indices
    addEdge(i: number, j: number): void {
        // Handle index out of bounds and equality
        if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        // In undirected graph, adjacency matrix is symmetric about main diagonal, i.e., satisfies (i, j) === (j, i)
        this.adjMat[i][j] = 1;
        this.adjMat[j][i] = 1;
    }

    /* Remove edge */
    // Parameters i, j correspond to the vertices element indices
    removeEdge(i: number, j: number): void {
        // Handle index out of bounds and equality
        if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        this.adjMat[i][j] = 0;
        this.adjMat[j][i] = 0;
    }

    /* Print adjacency matrix */
    print(): void {
        console.log('Vertex list = ', this.vertices);
        console.log('Adjacency matrix =', this.adjMat);
    }
}
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
<p class="lang-tab__label">TypeScript</p>

```ts
/* Undirected graph class based on adjacency list */
class GraphAdjList {
    // Adjacency list, key: vertex, value: all adjacent vertices of that vertex
    adjList: Map<Vertex, Vertex[]>;

    /* Constructor */
    constructor(edges: Vertex[][]) {
        this.adjList = new Map();
        // Add all vertices and edges
        for (const edge of edges) {
            this.addVertex(edge[0]);
            this.addVertex(edge[1]);
            this.addEdge(edge[0], edge[1]);
        }
    }

    /* Get the number of vertices */
    size(): number {
        return this.adjList.size;
    }

    /* Add edge */
    addEdge(vet1: Vertex, vet2: Vertex): void {
        if (
            !this.adjList.has(vet1) ||
            !this.adjList.has(vet2) ||
            vet1 === vet2
        ) {
            throw new Error('Illegal Argument Exception');
        }
        // Add edge vet1 - vet2
        this.adjList.get(vet1).push(vet2);
        this.adjList.get(vet2).push(vet1);
    }

    /* Remove edge */
    removeEdge(vet1: Vertex, vet2: Vertex): void {
        if (
            !this.adjList.has(vet1) ||
            !this.adjList.has(vet2) ||
            vet1 === vet2 ||
            this.adjList.get(vet1).indexOf(vet2) === -1
        ) {
            throw new Error('Illegal Argument Exception');
        }
        // Remove edge vet1 - vet2
        this.adjList.get(vet1).splice(this.adjList.get(vet1).indexOf(vet2), 1);
        this.adjList.get(vet2).splice(this.adjList.get(vet2).indexOf(vet1), 1);
    }

    /* Add vertex */
    addVertex(vet: Vertex): void {
        if (this.adjList.has(vet)) return;
        // Add a new linked list in the adjacency list
        this.adjList.set(vet, []);
    }

    /* Remove vertex */
    removeVertex(vet: Vertex): void {
        if (!this.adjList.has(vet)) {
            throw new Error('Illegal Argument Exception');
        }
        // Remove the linked list corresponding to vertex vet in the adjacency list
        this.adjList.delete(vet);
        // Traverse the linked lists of other vertices and remove all edges containing vet
        for (const set of this.adjList.values()) {
            const index: number = set.indexOf(vet);
            if (index > -1) {
                set.splice(index, 1);
            }
        }
    }

    /* Print adjacency list */
    print(): void {
        console.log('Adjacency list =');
        for (const [key, value] of this.adjList.entries()) {
            const tmp = [];
            for (const vertex of value) {
                tmp.push(vertex.val);
            }
            console.log(key.val + ': ' + tmp.join());
        }
    }
}
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
