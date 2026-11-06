"""
File: space_complexity.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import ListNode, TreeNode, print_tree


def function() -> int:
    """الدالة"""
    # أجرِ بعض العمليات
    return 0


def constant(n: int):
    """تعقيد ثابت"""
    # الثوابت والمتغيرات والكائنات تشغل مساحة O(1)
    a = 0
    nums = [0] * 10000
    node = ListNode(0)
    # المتغيرات في الحلقة تشغل مساحة O(1)
    for _ in range(n):
        c = 0
    # استدعاءات الدوال في الحلقة تشغل مساحة O(1)
    for _ in range(n):
        function()


def linear(n: int):
    """تعقيد خطي"""
    # قائمة بطول n تشغل مساحة O(n)
    nums = [0] * n
    # جدول تجزئة فيه n إدخالًا يشغل مساحة O(n)
    hmap = dict[int, str]()
    for i in range(n):
        hmap[i] = str(i)


def linear_recur(n: int):
    """التعقيد الخطي (تنفيذ تعاودي)"""
    print("Recursion: n =", n)
    if n == 1:
        return
    linear_recur(n - 1)


def quadratic(n: int):
    """تعقيد تربيعي"""
    # القائمة ثنائية الأبعاد تشغل مساحة O(n^2)
    num_matrix = [[0] * n for _ in range(n)]


def quadratic_recur(n: int) -> int:
    """التعقيد التربيعي (تنفيذ تعاودي)"""
    if n <= 0:
        return 0
    # أطوال المصفوفة nums هي n، n-1، ...، 2، 1
    nums = [0] * n
    return quadratic_recur(n - 1)


def build_tree(n: int) -> TreeNode | None:
    """التعقيد الأسي (بناء شجرة ثنائية تامة)"""
    if n == 0:
        return None
    root = TreeNode(0)
    root.left = build_tree(n - 1)
    root.right = build_tree(n - 1)
    return root


"""شيفرة تجريبية"""
if __name__ == "__main__":
    n = 5
    # تعقيد ثابت
    constant(n)
    # تعقيد خطي
    linear(n)
    linear_recur(n)
    # تعقيد تربيعي
    quadratic(n)
    quadratic_recur(n)
    # تعقيد أسي
    root = build_tree(n)
    print_tree(root)
