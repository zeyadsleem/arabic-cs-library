"""
File: build_tree.py
Created Time: 2023-07-15
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import TreeNode, print_tree


def dfs(
    preorder: list[int],
    inorder_map: dict[int, int],
    i: int,
    l: int,
    r: int,
) -> TreeNode | None:
    """Build a binary tree: divide and conquer"""
    # توقف حين يصير مجال الشجرة الجزئية فارغًا
    if r - l < 0:
        return None
    # مهّد عقدة الجذر
    root = TreeNode(preorder[i])
    # حدّد m للفصل بين الشجرة الجزئية اليسرى واليمنى
    m = inorder_map[preorder[i]]
    # مسألة جزئية: ابنِ الشجرة الجزئية اليسرى
    root.left = dfs(preorder, inorder_map, i + 1, l, m - 1)
    # مسألة جزئية: ابنِ الشجرة الجزئية اليمنى
    root.right = dfs(preorder, inorder_map, i + 1 + m - l, m + 1, r)
    # أعد عقدة الجذر
    return root


def build_tree(preorder: list[int], inorder: list[int]) -> TreeNode | None:
    """Build a binary tree"""
    # مهّد جدول تجزئة يربط كل عنصر في الاجتياز الداخلي بفهرسه
    inorder_map = {val: i for i, val in enumerate(inorder)}
    root = dfs(preorder, inorder_map, 0, 0, len(inorder) - 1)
    return root


"""Driver code"""
if __name__ == "__main__":
    preorder = [3, 9, 2, 1, 7]
    inorder = [9, 3, 1, 2, 7]
    print(f"Preorder traversal = {preorder}")
    print(f"Inorder traversal = {inorder}")

    root = build_tree(preorder, inorder)
    print("The constructed binary tree is:")
    print_tree(root)
