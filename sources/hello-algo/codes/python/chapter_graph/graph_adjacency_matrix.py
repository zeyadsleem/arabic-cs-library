"""
File: graph_adjacency_matrix.py
Created Time: 2023-02-23
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import Vertex, print_matrix


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


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الرسم البياني غير الموجّه
    # لاحظ أن مدخلات edges فهارس رؤوس، تقابل فهارس العناصر في vertices
    vertices = [1, 3, 2, 5, 4]
    edges = [[0, 1], [0, 3], [1, 2], [2, 3], [2, 4], [3, 4]]
    graph = GraphAdjMat(vertices, edges)
    print("\nGraph after initialization:")
    graph.print()

    # أضف ضلعًا
    # للرأسين 1 و 2 الفهرسان 0 و 2 بالترتيب
    graph.add_edge(0, 2)
    print("\nGraph after adding edge 1-2:")
    graph.print()

    # احذف ضلعًا
    # للرأسين 1 و 3 الفهرسان 0 و 1 بالترتيب
    graph.remove_edge(0, 1)
    print("\nGraph after removing edge 1-3:")
    graph.print()

    # أضف رأسًا
    graph.add_vertex(6)
    print("\nGraph after adding vertex 6:")
    graph.print()

    # احذف رأسًا
    # للرأس 3 الفهرس 1
    graph.remove_vertex(1)
    print("\nGraph after removing vertex 3:")
    graph.print()
