"""
File: binary_tree_bfs.py
Created Time: 2022-12-20
Author: a16su (lpluls001@gmail.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import TreeNode, list_to_tree, print_tree
from collections import deque


def level_order(root: TreeNode | None) -> list[int]:
    """اجتياز بالمستويات"""
    # مهّد طابورًا وأدخل الجذر إليه
    queue: deque[TreeNode] = deque()
    queue.append(root)
    # مهّد قائمة لتخزين تتابع الاجتياز
    res = []
    while queue:
        node: TreeNode = queue.popleft()  # أخرج من الطابور
        res.append(node.val)  # خزّن قيمة العقدة
        if node.left is not None:
            queue.append(node.left)  # أدخل الابن الأيسر إلى الطابور
        if node.right is not None:
            queue.append(node.right)  # أدخل الابن الأيمن إلى الطابور
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الشجرة الثنائية
    # استخدم دالة مساعدة تبني شجرة ثنائية مباشرةً من مصفوفة
    root: TreeNode = list_to_tree(arr=[1, 2, 3, 4, 5, 6, 7])
    print("\nInitialize the binary tree\n")
    print_tree(root)

    # اجتياز بالمستويات
    res: list[int] = level_order(root)
    print("\nNode sequence from level-order traversal = ", res)
