"""
File: graph_bfs.py
Created Time: 2023-02-23
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import Vertex, vals_to_vets, vets_to_vals
from collections import deque
from graph_adjacency_list import GraphAdjList


def graph_bfs(graph: GraphAdjList, start_vet: Vertex) -> list[Vertex]:
    """الاجتياز بالعرض أولًا"""
    # مثّل الرسم بقائمة تجاور للوصول إلى كل أجوار رأس معين
    # تتابع اجتياز الرؤوس
    res = []
    # مجموعة تجزئة تسجل الرؤوس المزارة
    visited = set[Vertex]([start_vet])
    # استخدم طابورًا لتنفيذ BFS
    que = deque[Vertex]([start_vet])
    # بدءًا من start_vet، حلّق حتى تُزار جميع الرؤوس القابلة للوصول
    while len(que) > 0:
        vet = que.popleft()  # أخرج الرأس الموجود في مقدمة الطابور
        res.append(vet)  # سجّل الرأس المزار
        # اجتز كل أجوار هذا الرأس
        for adj_vet in graph.adj_list[vet]:
            if adj_vet in visited:
                continue  # تخطَّ الرؤوس التي زُرت سابقًا
            que.append(adj_vet)  # أدخل إلى الطابور الرؤوس غير المزارة فقط
            visited.add(adj_vet)  # علّم هذا الرأس بوصفه مزارًا
    # أعد تتابع اجتياز الرؤوس
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الرسم البياني غير الموجّه
    v = vals_to_vets([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    edges = [
        [v[0], v[1]],
        [v[0], v[3]],
        [v[1], v[2]],
        [v[1], v[4]],
        [v[2], v[5]],
        [v[3], v[4]],
        [v[3], v[6]],
        [v[4], v[5]],
        [v[4], v[7]],
        [v[5], v[8]],
        [v[6], v[7]],
        [v[7], v[8]],
    ]
    graph = GraphAdjList(edges)
    print("\nGraph after initialization:")
    graph.print()

    # الاجتياز بالعرض أولًا
    res = graph_bfs(graph, v[0])
    print("\nVertex sequence from breadth-first traversal (BFS):")
    print(vets_to_vals(res))
