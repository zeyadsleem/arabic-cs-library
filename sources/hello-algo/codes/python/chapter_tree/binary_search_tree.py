"""
File: binary_search_tree.py
Created Time: 2022-12-20
Author: a16su (lpluls001@gmail.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import TreeNode, print_tree


class BinarySearchTree:
    """شجرة البحث الثنائية"""

    def __init__(self):
        """المنشئ"""
        # مهّد شجرة فارغة
        self._root = None

    def get_root(self) -> TreeNode | None:
        """الحصول على جذر الشجرة الثنائية"""
        return self._root

    def search(self, num: int) -> TreeNode | None:
        """ابحث عن عقدة"""
        cur = self._root
        # ابحث في حلقة، متوقفًا إذا صارت cur هي None
        while cur is not None:
            # إن وُجد، فالعقدة الهدف في الشجرة الجزئية اليمنى لـ cur
            if cur.val < num:
                cur = cur.right
            # إن وُجد، فالعقدة الهدف في الشجرة الجزئية اليسرى لـ cur
            elif cur.val > num:
                cur = cur.left
            # وُجدت العقدة الهدف؛ اخرج من الحلقة
            else:
                break
        return cur

    def insert(self, num: int):
        """أدخل عقدة"""
        # إذا كانت الشجرة فارغة، مهّد عقدة الجذر
        if self._root is None:
            self._root = TreeNode(num)
            return
        # ابحث في حلقة، متوقفًا إذا صارت cur هي None
        cur, pre = self._root, None
        while cur is not None:
            # أعد فورًا إذا وُجدت عقدة مكررة
            if cur.val == num:
                return
            pre = cur
            # يقع موضع الإدراج في الشجرة الجزئية اليمنى لـ cur
            if cur.val < num:
                cur = cur.right
            # يقع موضع الإدراج في الشجرة الجزئية اليسرى لـ cur
            else:
                cur = cur.left
        # أدخل عقدة
        node = TreeNode(num)
        if pre.val < num:
            pre.right = node
        else:
            pre.left = node

    def remove(self, num: int):
        """احذف عقدة"""
        # أعد فورًا إذا كانت الشجرة فارغة
        if self._root is None:
            return
        # ابحث في حلقة، متوقفًا إذا صارت cur هي None
        cur, pre = self._root, None
        while cur is not None:
            # وُجدت العقدة المراد حذفها؛ اخرج من الحلقة
            if cur.val == num:
                break
            pre = cur
            # إن وُجدت، فالعقدة المراد حذفها في الشجرة الجزئية اليمنى لـ cur
            if cur.val < num:
                cur = cur.right
            # إن وُجدت، فالعقدة المراد حذفها في الشجرة الجزئية اليسرى لـ cur
            else:
                cur = cur.left
        # أعد فورًا إذا لم تكن العقدة المراد حذفها موجودة
        if cur is None:
            return

        # عدد الأبناء = 0 أو 1
        if cur.left is None or cur.right is None:
            # عند 0 أو 1 ابن، يكون child هي None أو ذلك الابن بالترتيب
            child = cur.left or cur.right
            # احذف العقدة cur
            if cur != self._root:
                if pre.left == cur:
                    pre.left = child
                else:
                    pre.right = child
            else:
                # إذا كانت العقدة المحذوفة هي الجذر، أسند الجذر الجديد
                self._root = child
        # عدد الأبناء = 2
        else:
            # احصل على خلف cur في الاجتياز الداخلي
            tmp: TreeNode = cur.right
            while tmp.left is not None:
                tmp = tmp.left
            # احذف العقدة tmp تعاوديًا
            self.remove(tmp.val)
            # استبدل قيمة cur بقيمة tmp
            cur.val = tmp.val


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد شجرة البحث الثنائية
    bst = BinarySearchTree()
    nums = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]
    # تنتج ترتيبات الإدراج المختلفة أشجارًا ثنائية مختلفة؛ وينتج هذا التتابع شجرة ثنائية تامة
    for num in nums:
        bst.insert(num)
    print("\nThe initialized binary tree is:\n")
    print_tree(bst.get_root())

    # ابحث عن عقدة
    node = bst.search(7)
    print("\nFound node object: {}, node value = {}".format(node, node.val))

    # أدخل عقدة
    bst.insert(16)
    print("\nBinary tree after inserting node 16:\n")
    print_tree(bst.get_root())

    # احذف عقدة
    bst.remove(1)
    print("\nBinary tree after removing node 1:\n")
    print_tree(bst.get_root())

    bst.remove(2)
    print("\nBinary tree after removing node 2:\n")
    print_tree(bst.get_root())

    bst.remove(4)
    print("\nBinary tree after removing node 4:\n")
    print_tree(bst.get_root())
