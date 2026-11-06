"""
File: array_binary_tree.py
Created Time: 2023-07-19
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import TreeNode, list_to_tree, print_tree


class ArrayBinaryTree:
    """صنف شجرة ثنائية بتمثيل مصفوفي"""

    def __init__(self, arr: list[int | None]):
        """المنشئ"""
        self._tree = list(arr)

    def size(self):
        """طول القائمة الداعمة"""
        return len(self._tree)

    def val(self, i: int) -> int | None:
        """الحصول على قيمة العقدة عند الفهرس i"""
        # إذا خرج الفهرس عن الحدود، أعد None لتمثيل موضع فارغ
        if i < 0 or i >= self.size():
            return None
        return self._tree[i]

    def left(self, i: int) -> int | None:
        """الحصول على فهرس الابن الأيسر للعقدة عند الفهرس i"""
        return 2 * i + 1

    def right(self, i: int) -> int | None:
        """الحصول على فهرس الابن الأيمن للعقدة عند الفهرس i"""
        return 2 * i + 2

    def parent(self, i: int) -> int | None:
        """الحصول على فهرس العقدة الأصل للعقدة عند الفهرس i"""
        return (i - 1) // 2

    def level_order(self) -> list[int]:
        """اجتياز بالمستويات"""
        self.res = []
        # اجتز المصفوفة مباشرةً
        for i in range(self.size()):
            if self.val(i) is not None:
                self.res.append(self.val(i))
        return self.res

    def dfs(self, i: int, order: str):
        """الاجتياز بالعمق أولًا"""
        if self.val(i) is None:
            return
        # اجتياز الطلب المسبق
        if order == "pre":
            self.res.append(self.val(i))
        self.dfs(self.left(i), order)
        # الاجتياز الداخلي
        if order == "in":
            self.res.append(self.val(i))
        self.dfs(self.right(i), order)
        # اجتياز الطلب اللاحق
        if order == "post":
            self.res.append(self.val(i))

    def pre_order(self) -> list[int]:
        """اجتياز الطلب المسبق"""
        self.res = []
        self.dfs(0, order="pre")
        return self.res

    def in_order(self) -> list[int]:
        """الاجتياز الداخلي"""
        self.res = []
        self.dfs(0, order="in")
        return self.res

    def post_order(self) -> list[int]:
        """اجتياز الطلب اللاحق"""
        self.res = []
        self.dfs(0, order="post")
        return self.res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الشجرة الثنائية
    # استخدم دالة مساعدة تبني شجرة ثنائية مباشرةً من مصفوفة
    arr = [1, 2, 3, 4, None, 6, 7, 8, 9, None, None, 12, None, None, 15]
    root = list_to_tree(arr)
    print("\nInitialize the binary tree\n")
    print("Array representation of the binary tree:")
    print(arr)
    print("Linked representation of the binary tree:")
    print_tree(root)

    # صنف شجرة ثنائية بتمثيل مصفوفي
    abt = ArrayBinaryTree(arr)

    # وصول إلى عقدة
    i = 1
    l, r, p = abt.left(i), abt.right(i), abt.parent(i)
    print(f"\nCurrent node index: {i}, value: {abt.val(i)}")
    print(f"Left child index: {l}, value: {abt.val(l)}")
    print(f"Right child index: {r}, value: {abt.val(r)}")
    print(f"Parent index: {p}, value: {abt.val(p)}")

    # اجتز الشجرة
    res = abt.level_order()
    print("\nLevel-order traversal:", res)
    res = abt.pre_order()
    print("Preorder traversal:", res)
    res = abt.in_order()
    print("Inorder traversal:", res)
    res = abt.post_order()
    print("Postorder traversal:", res)
