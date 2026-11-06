"""
File: graph_dfs.py
Created Time: 2023-02-23
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import Vertex, vets_to_vals, vals_to_vets
from graph_adjacency_list import GraphAdjList


def dfs(graph: GraphAdjList, visited: set[Vertex], res: list[Vertex], vet: Vertex):
    """دالة مساعدة للاجتياز بالعمق أولًا"""
    res.append(vet)  # سجّل الرأس المزار
    visited.add(vet)  # علّم هذا الرأس بوصفه مزارًا
    # اجتز كل أجوار هذا الرأس
    for adjVet in graph.adj_list[vet]:
        if adjVet in visited:
            continue  # تخطَّ الرؤوس التي زُرت سابقًا
        # زر الرأس المجاور تعاوديًا
        dfs(graph, visited, res, adjVet)


def graph_dfs(graph: GraphAdjList, start_vet: Vertex) -> list[Vertex]:
    """الاجتياز بالعمق أولًا"""
    # مثّل الرسم بقائمة تجاور للوصول إلى كل أجوار رأس معين
    # تتابع اجتياز الرؤوس
    res = []
    # مجموعة تجزئة تسجل الرؤوس المزارة
    visited = set[Vertex]()
    dfs(graph, visited, res, start_vet)
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الرسم البياني غير الموجّه
    v = vals_to_vets([0, 1, 2, 3, 4, 5, 6])
    edges = [
        [v[0], v[1]],
        [v[0], v[3]],
        [v[1], v[2]],
        [v[2], v[5]],
        [v[4], v[5]],
        [v[5], v[6]],
    ]
    graph = GraphAdjList(edges)
    print("\nGraph after initialization:")
    graph.print()

    # الاجتياز بالعمق أولًا
    res = graph_dfs(graph, v[0])
    print("\nVertex sequence from depth-first traversal (DFS):")
    print(vets_to_vals(res))
