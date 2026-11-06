"""
File: graph_adjacency_list.py
Created Time: 2023-02-23
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import Vertex, vals_to_vets


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


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الرسم البياني غير الموجّه
    v = vals_to_vets([1, 3, 2, 5, 4])
    edges = [
        [v[0], v[1]],
        [v[0], v[3]],
        [v[1], v[2]],
        [v[2], v[3]],
        [v[2], v[4]],
        [v[3], v[4]],
    ]
    graph = GraphAdjList(edges)
    print("\nGraph after initialization:")
    graph.print()

    # أضف ضلعًا
    # الرأسان 1 و 2 هما v[0] و v[2]
    graph.add_edge(v[0], v[2])
    print("\nGraph after adding edge 1-2:")
    graph.print()

    # احذف ضلعًا
    # الرأسان 1 و 3 هما v[0] و v[1]
    graph.remove_edge(v[0], v[1])
    print("\nGraph after removing edge 1-3:")
    graph.print()

    # أضف رأسًا
    v5 = Vertex(6)
    graph.add_vertex(v5)
    print("\nGraph after adding vertex 6:")
    graph.print()

    # احذف رأسًا
    # الرأس 3 هو v[1]
    graph.remove_vertex(v[1])
    print("\nGraph after removing vertex 3:")
    graph.print()
