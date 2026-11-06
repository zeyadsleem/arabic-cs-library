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
    """صنف رسم بياني غير موجّه منفذ بمصفوفة تجاور"""

    def __init__(self, vertices: list[int], edges: list[list[int]]):
        """المنشئ"""
        # قائمة الرؤوس: العناصر قيم الرؤوس، والفهارس فهارس الرؤوس
        self.vertices: list[int] = []
        # مصفوفة التجاور: فهارس الصفوف والأعمدة تقابل فهارس الرؤوس
        self.adj_mat: list[list[int]] = []
        # أضف رأسًا
        for val in vertices:
            self.add_vertex(val)
        # أضف ضلعًا
        # لاحظ أن مدخلات edges فهارس رؤوس، تقابل فهارس العناصر في vertices
        for e in edges:
            self.add_edge(e[0], e[1])

    def size(self) -> int:
        """الحصول على عدد الرؤوس"""
        return len(self.vertices)

    def add_vertex(self, val: int):
        """أضف رأسًا"""
        n = self.size()
        # ألحق قيمة الرأس الجديد إلى قائمة الرؤوس
        self.vertices.append(val)
        # أضف صفًا إلى مصفوفة التجاور
        new_row = [0] * n
        self.adj_mat.append(new_row)
        # أضف عمودًا إلى مصفوفة التجاور
        for row in self.adj_mat:
            row.append(0)

    def remove_vertex(self, index: int):
        """احذف رأسًا"""
        if index >= self.size():
            raise IndexError()
        # احذف الرأس عند الفهرس `index` من قائمة الرؤوس
        self.vertices.pop(index)
        # احذف الصف `index` من مصفوفة التجاور
        self.adj_mat.pop(index)
        # احذف العمود `index` من مصفوفة التجاور
        for row in self.adj_mat:
            row.pop(index)

    def add_edge(self, i: int, j: int):
        """أضف ضلعًا"""
        # المعاملان i و j مفهرسا عناصر في vertices
        # عالِج الفهارس الخارجة عن الحدود أو المتساوية
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        # في الرسم غير الموجّه تكون مصفوفة التجاور متناظرة حول قطرها الرئيسي: تساوي المدخلات (i, j) و(j, i)
        self.adj_mat[i][j] = 1
        self.adj_mat[j][i] = 1

    def remove_edge(self, i: int, j: int):
        """احذف ضلعًا"""
        # المعاملان i و j مفهرسا عناصر في vertices
        # عالِج الفهارس الخارجة عن الحدود أو المتساوية
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        self.adj_mat[i][j] = 0
        self.adj_mat[j][i] = 0

    def print(self):
        """طباعة مصفوفة التجاور"""
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
    """صنف رسم بياني غير موجّه منفذ بقائمة تجاور"""

    def __init__(self, edges: list[list[Vertex]]):
        """المنشئ"""
        # قائمة التجاور: المفتاح رأس، والقيمة قائمة جميع أجواره
        self.adj_list = dict[Vertex, list[Vertex]]()
        # أضف كل الرؤوس والأضلاع
        for edge in edges:
            self.add_vertex(edge[0])
            self.add_vertex(edge[1])
            self.add_edge(edge[0], edge[1])

    def size(self) -> int:
        """الحصول على عدد الرؤوس"""
        return len(self.adj_list)

    def add_edge(self, vet1: Vertex, vet2: Vertex):
        """أضف ضلعًا"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # أضف الضلع vet1 - vet2
        self.adj_list[vet1].append(vet2)
        self.adj_list[vet2].append(vet1)

    def remove_edge(self, vet1: Vertex, vet2: Vertex):
        """احذف ضلعًا"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # احذف الضلع vet1 - vet2
        self.adj_list[vet1].remove(vet2)
        self.adj_list[vet2].remove(vet1)

    def add_vertex(self, vet: Vertex):
        """أضف رأسًا"""
        if vet in self.adj_list:
            return
        # أضف قائمة جديدة إلى قائمة التجاور
        self.adj_list[vet] = []

    def remove_vertex(self, vet: Vertex):
        """احذف رأسًا"""
        if vet not in self.adj_list:
            raise ValueError()
        # احذف من قائمة التجاور القائمة المقابلة للرأس vet
        self.adj_list.pop(vet)
        # اجتز قوائم باقي الرؤوس واحذف كل الأضلاع الواقعة على vet
        for vertex in self.adj_list:
            if vet in self.adj_list[vertex]:
                self.adj_list[vertex].remove(vet)

    def print(self):
        """طباعة قائمة التجاور"""
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
