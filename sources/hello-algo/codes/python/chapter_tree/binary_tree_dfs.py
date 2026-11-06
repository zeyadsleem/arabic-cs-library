"""
File: binary_tree_dfs.py
Created Time: 2022-12-20
Author: a16su (lpluls001@gmail.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import TreeNode, list_to_tree, print_tree


def pre_order(root: TreeNode | None):
    """اجتياز الطلب المسبق"""
    if root is None:
        return
    # ترتيب الزيارة: الجذر -> الشجرة الجزئية اليسرى -> اليمنى
    res.append(root.val)
    pre_order(root=root.left)
    pre_order(root=root.right)


def in_order(root: TreeNode | None):
    """الاجتياز الداخلي"""
    if root is None:
        return
    # ترتيب الزيارة: الشجرة الجزئية اليسرى -> الجذر -> اليمنى
    in_order(root=root.left)
    res.append(root.val)
    in_order(root=root.right)


def post_order(root: TreeNode | None):
    """اجتياز الطلب اللاحق"""
    if root is None:
        return
    # ترتيب الزيارة: الشجرة الجزئية اليسرى -> اليمنى -> الجذر
    post_order(root=root.left)
    post_order(root=root.right)
    res.append(root.val)


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الشجرة الثنائية
    # استخدم دالة مساعدة تبني شجرة ثنائية مباشرةً من مصفوفة
    root = list_to_tree(arr=[1, 2, 3, 4, 5, 6, 7])
    print("\nInitialize the binary tree\n")
    print_tree(root)

    # اجتياز الطلب المسبق
    res = []
    pre_order(root)
    print("\nNode sequence from preorder traversal = ", res)

    # الاجتياز الداخلي
    res.clear()
    in_order(root)
    print("\nNode sequence from inorder traversal = ", res)

    # اجتياز الطلب اللاحق
    res.clear()
    post_order(root)
    print("\nNode sequence from postorder traversal = ", res)
