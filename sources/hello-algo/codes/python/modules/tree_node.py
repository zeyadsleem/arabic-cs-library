"""
File: tree_node.py
Created Time: 2021-12-11
Author: krahets (krahets@163.com)
"""

from collections import deque


class TreeNode:
    """صنف عقدة الشجرة الثنائية"""

    def __init__(self, val: int = 0):
        self.val: int = val  # قيمة العقدة
        self.height: int = 0  # ارتفاع العقدة
        self.left: TreeNode | None = None  # إشارة إلى الابن الأيسر
        self.right: TreeNode | None = None  # إشارة إلى الابن الأيمن

    # للاطلاع على قواعد التسلسل، انظر:
    # https://www.hello-algo.com/en/chapter_tree/array_representation_of_tree/
    # التمثيل المصفوفي للشجرة الثنائية:
    # [1, 2, 3, 4, None, 6, 7, 8, 9, None, None, 12, None, None, 15]
    # التمثيل المترابط للشجرة الثنائية:
    #             /——— 15
    #         /——— 7
    #     /——— 3
    #    |    \——— 6
    #    |        \——— 12
    # ——— 1
    #     \——— 2
    #        |    /——— 9
    #         \——— 4
    #             \——— 8


def list_to_tree_dfs(arr: list[int], i: int) -> TreeNode | None:
    """فك تسلسل قائمة إلى شجرة ثنائية: التعاود"""
    # أعد None إذا خرج الفهرس عن الحدود أو كان العنصر المقابل None
    if i < 0 or i >= len(arr) or arr[i] is None:
        return None
    # أنشئ العقدة الحالية
    root = TreeNode(arr[i])
    # ابنِ الشجرتين الجزئيتين اليسرى واليمنى تعاوديًا
    root.left = list_to_tree_dfs(arr, 2 * i + 1)
    root.right = list_to_tree_dfs(arr, 2 * i + 2)
    return root


def list_to_tree(arr: list[int]) -> TreeNode | None:
    """فك تسلسل قائمة إلى شجرة ثنائية"""
    return list_to_tree_dfs(arr, 0)


def tree_to_list_dfs(root: TreeNode, i: int, res: list[int]) -> list[int]:
    """تسلسل شجرة ثنائية إلى قائمة: التعاود"""
    if root is None:
        return
    if i >= len(res):
        res += [None] * (i - len(res) + 1)
    res[i] = root.val
    tree_to_list_dfs(root.left, 2 * i + 1, res)
    tree_to_list_dfs(root.right, 2 * i + 2, res)


def tree_to_list(root: TreeNode | None) -> list[int]:
    """تسلسل شجرة ثنائية إلى قائمة"""
    res = []
    tree_to_list_dfs(root, 0, res)
    return res
