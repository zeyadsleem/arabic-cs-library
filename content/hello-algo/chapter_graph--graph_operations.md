---
title: "العمليات الأساسية على الرسوم البيانية"
book: hello-algo
chapter: chapter_graph
slug: graph_operations
order: 58
lang: ar
---
يمكن تقسيم العمليات الأساسية على الرسوم البيانية إلى عمليات على «الأضلاع» وعمليات على «الرؤوس». وتختلف تطبيقاتها حسب ما إذا كان الرسم البياني ممثّلاً بـ«مصفوفة تجاور» أو «قائمة تجاور».

## التنفيذ باستخدام مصفوفة التجاور

بمعطى رسم بياني غير موجّه فيه $n$ من الرؤوس، تُنفَّذ العمليات المختلفة كما يوضح الشكل أدناه.

- **إضافة ضلع أو حذفه**: عدّل الضلع المحدد مباشرةً في مصفوفة التجاور، بزمن $O(1)$. وبما أن الرسم البياني غير موجّه، يلزم تحديث اتجاهي الضلع معاً.
- **إضافة رأس**: أضف صفاً وعموداً في نهاية مصفوفة التجاور واملأهما جميعاً بالقيمة $0$، بزمن $O(n)$.
- **حذف رأس**: احذف صفاً وعموداً في مصفوفة التجاور. وتحدث أسوأ حالة عند حذف الصف والعمود الأولين، حيث يلزم «نقل $(n-1)^2$ عنصراً إلى الأعلى واليسار»، وبذلك يكون الزمن $O(n^2)$.
- **التهيئة**: بمعطى $n$ من الرؤوس، هيّئ قائمة رؤوس `vertices` طولها $n$، بزمن $O(n)$؛ وهيّئ مصفوفة تجاور `adjMat` حجمها $n \times n$، بزمن $O(n^2)$.

وفيما يلي شيفرة تنفيذ الرسوم البيانية الممثلة بمصفوفة التجاور:

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
## التنفيذ باستخدام قائمة التجاور

بمعطى رسم بياني غير موجّه فيه $n$ من الرؤوس إجمالاً و$m$ من الأضلاع، يمكن تنفيذ العمليات المختلفة كما يوضح الشكل أدناه.

- **إضافة ضلع**: أضف الضلع في نهاية القائمة المترابطة للرأس المقابل، بزمن $O(1)$. وبما أن الرسم البياني غير موجّه، يلزم إضافة الضلعين في الاتجاهين معاً.
- **حذف ضلع**: ابحث عن الضلع المحدد في القائمة المترابطة للرأس المقابل واحذفه، بزمن $O(m)$. وفي الرسم البياني غير الموجّه، يلزم حذف الضلعين في الاتجاهين معاً.
- **إضافة رأس**: أضف قائمة مترابطة إلى قائمة التجاور، ويكون الرأس الجديد هو العقدة الرأسية، بزمن $O(1)$.
- **حذف رأس**: اجتز قائمة التجاور كاملة واحذف جميع الأضلاع التي تحتوي على الرأس المحدد، بزمن $O(n + m)$.
- **التهيئة**: أنشئ $n$ من الرؤوس و$2m$ من الأضلاع في قائمة التجاور، بزمن $O(n + m)$.

تعرض الشيفرة التالية تنفيذ قائمة التجاور. وبالمقارنة بالشكل أعلاه، تختلف الشيفرة الفعلية في النقاط التالية.

- لتسهيل إضافة الرؤوس وحذفها ولتبسيط الشيفرة، نستخدم قوائم (مصفوفات ديناميكية) بدلاً من القوائم المترابطة.
- يُستخدم جدول تجزئة لتخزين قائمة التجاور، حيث يكون `key` نسخة الرأس و`value` قائمة (القائمة المترابطة) الرؤوس المجاورة لذلك الرأس.

وإضافة إلى ذلك، نستخدم الفئة `Vertex` لتمثيل الرؤوس في قائمة التجاور للسبب التالي: لو استخدمنا فهارس القائمة للتمييز بين الرؤوس المختلفة، كما في مصفوفات التجاور، لاحتجنا عند حذف الرأس عند الفهرس $i$ إلى اجتياز قائمة التجاور كاملة وإنقاص جميع الفهارس الأكبر من $i$ بمقدار $1$، وهو أمر شديد الانخفاض في الكفاءة. أما إذا كان كل رأس نسخة `Vertex` فريدة، فلن يتطلب حذف رأس واحد تعديل الرؤوس الأخرى.

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
## مقارنة الكفاءة

بافتراض أن الرسم البياني فيه $n$ من الرؤوس و$m$ من الأضلاع، يقارن الجدول أدناه الكفاءة الزمنية والكفاءة المكانية لمصفوفات التجاور وقوائم التجاور. لاحظ أن قائمة التجاور (القائمة المترابطة) تقابل التنفيذ المستخدم في هذا القسم، بينما تشير قائمة التجاور (جدول التجزئة) تحديداً إلى التنفيذ الذي تُستبدل فيه جميع القوائم المترابطة بجداول تجزئة.

<p align="center"> جدول <id> &nbsp; مقارنة بين مصفوفة التجاور وقائمة التجاور </p>

|                        | مصفوفة التجاور | قائمة التجاور (قائمة مترابطة) | قائمة التجاور (جدول تجزئة) |
| ---------------------- | ---------------- | ---------------------------- | --------------------------- |
| تحديد التجاور    | $O(1)$           | $O(n)$                       | $O(1)$                      |
| إضافة ضلع            | $O(1)$           | $O(1)$                       | $O(1)$                      |
| حذف ضلع         | $O(1)$           | $O(n)$                       | $O(1)$                      |
| إضافة رأس           | $O(n)$           | $O(1)$                       | $O(1)$                      |
| حذف رأس        | $O(n^2)$         | $O(n + m)$                   | $O(n)$                      |
| استهلاك مساحة الذاكرة     | $O(n^2)$         | $O(n + m)$                   | $O(n + m)$                  |

وبمراقبة الجدول أعلاه، يبدو أن قائمة التجاور (جدول التجزئة) هي الأفضل في الكفاءة الزمنية والكفاءة المكانية. غير أن العمل على الأضلاع في مصفوفة التجاور أكثر كفاءة في الممارسة العملية، إذ لا يتطلب سوى عملية وصول واحدة إلى المصفوفة أو إسناد واحد. وإجمالاً، تجسّد مصفوفات التجاور مبدأ «المقايضة بين المساحة والزمن»، بينما تجسّد قوائم التجاور «المقايضة بين الزمن والمساحة».
