"""
File: avl_tree.py
Created Time: 2022-12-20
Author: a16su (lpluls001@gmail.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import TreeNode, print_tree


class AVLTree:
    """AVL tree"""

    def __init__(self):
        """Constructor"""
        self._root = None

    def get_root(self) -> TreeNode | None:
        """Get the root of the binary tree"""
        return self._root

    def height(self, node: TreeNode | None) -> int:
        """Get the node height"""
        # الشجرة الجزئية الفارغة ارتفاعها -1؛ والورقة ارتفاعها 0
        if node is not None:
            return node.height
        return -1

    def update_height(self, node: TreeNode | None):
        """Update the node height"""
        # ارتفاع العقدة يساوي ارتفاع أطول شجرتها الجزئية + 1
        node.height = max([self.height(node.left), self.height(node.right)]) + 1

    def balance_factor(self, node: TreeNode | None) -> int:
        """Get the balance factor"""
        # عامل التوازن للشجرة الجزئية الفارغة هو 0
        if node is None:
            return 0
        # عامل توازن العقدة = ارتفاع الشجرة الجزئية اليسرى - ارتفاع اليمنى
        return self.height(node.left) - self.height(node.right)

    def right_rotate(self, node: TreeNode | None) -> TreeNode | None:
        """Right rotation"""
        child = node.left
        grand_child = child.right
        # أدر node حول child إلى اليمين
        child.right = node
        node.left = grand_child
        # حدّث ارتفاع العقدة
        self.update_height(node)
        self.update_height(child)
        # أعد جذر الشجرة الجزئية بعد الإدارة
        return child

    def left_rotate(self, node: TreeNode | None) -> TreeNode | None:
        """Left rotation"""
        child = node.right
        grand_child = child.left
        # أدر node حول child إلى اليسار
        child.left = node
        node.right = grand_child
        # حدّث ارتفاع العقدة
        self.update_height(node)
        self.update_height(child)
        # أعد جذر الشجرة الجزئية بعد الإدارة
        return child

    def rotate(self, node: TreeNode | None) -> TreeNode | None:
        """Perform rotations to restore balance in this subtree"""
        # احصل على عامل توازن العقدة
        balance_factor = self.balance_factor(node)
        # شجرة مائلة لليسار
        if balance_factor > 1:
            if self.balance_factor(node.left) >= 0:
                # أدر إلى اليمين
                return self.right_rotate(node)
            else:
                # أدر إلى اليسار ثم اليمين
                node.left = self.left_rotate(node.left)
                return self.right_rotate(node)
        # شجرة مائلة لليمين
        elif balance_factor < -1:
            if self.balance_factor(node.right) <= 0:
                # أدر إلى اليسار
                return self.left_rotate(node)
            else:
                # أدر إلى اليمين ثم اليسار
                node.right = self.right_rotate(node.right)
                return self.left_rotate(node)
        # الشجرة متوازنة؛ أعد دون إدارة
        return node

    def insert(self, val):
        """Insert a node"""
        self._root = self.insert_helper(self._root, val)

    def insert_helper(self, node: TreeNode | None, val: int) -> TreeNode:
        """Insert a node recursively (helper method)"""
        if node is None:
            return TreeNode(val)
        # 1. أوجد موضع الإدراج وأدخل العقدة
        if val < node.val:
            node.left = self.insert_helper(node.left, val)
        elif val > node.val:
            node.right = self.insert_helper(node.right, val)
        else:
            # أعد دون إدراج عقدة مكررة
            return node
        # حدّث ارتفاع العقدة
        self.update_height(node)
        # 2. أجرِ الإدارات لإعادة التوازن إلى هذه الشجرة الجزئية
        return self.rotate(node)

    def remove(self, val: int):
        """Remove a node"""
        self._root = self.remove_helper(self._root, val)

    def remove_helper(self, node: TreeNode | None, val: int) -> TreeNode | None:
        """Remove a node recursively (helper method)"""
        if node is None:
            return None
        # 1. أوجد العقدة واحذفها
        if val < node.val:
            node.left = self.remove_helper(node.left, val)
        elif val > node.val:
            node.right = self.remove_helper(node.right, val)
        else:
            if node.left is None or node.right is None:
                child = node.left or node.right
                # عدد الأبناء = 0: احذف العقدة وأعد
                if child is None:
                    return None
                # عدد الأبناء = 1: احذف العقدة مباشرةً
                else:
                    node = child
            else:
                # عدد الأبناء = 2: احذف خلف الاجتياز الداخلي واستخدم قيمته بإحلالها مكان قيمة العقدة الحالية
                temp = node.right
                while temp.left is not None:
                    temp = temp.left
                node.right = self.remove_helper(node.right, temp.val)
                node.val = temp.val
        # حدّث ارتفاع العقدة
        self.update_height(node)
        # 2. أجرِ الإدارات لإعادة التوازن إلى هذه الشجرة الجزئية
        return self.rotate(node)

    def search(self, val: int) -> TreeNode | None:
        """Find a node"""
        cur = self._root
        # ابحث في حلقة، متوقفًا إذا صارت cur هي None
        while cur is not None:
            # إن وُجدت، فالعقدة الهدف في الشجرة الجزئية اليمنى لـ cur
            if cur.val < val:
                cur = cur.right
            # إن وُجدت، فالعقدة الهدف في الشجرة الجزئية اليسرى لـ cur
            elif cur.val > val:
                cur = cur.left
            # وُجدت العقدة الهدف؛ اخرج من الحلقة
            else:
                break
        # أعد العقدة الهدف، أو None إذا لم تُوجد
        return cur


"""Driver code"""
if __name__ == "__main__":

    def test_insert(tree: AVLTree, val: int):
        tree.insert(val)
        print("\nAVL tree after inserting node {}:".format(val))
        print_tree(tree.get_root())

    def test_remove(tree: AVLTree, val: int):
        tree.remove(val)
        print("\nAVL tree after removing node {}:".format(val))
        print_tree(tree.get_root())

    # مهّد شجرة AVL فارغة
    avl_tree = AVLTree()

    # أدخل عقدة
    # راقب كيف تحافظ شجرة AVL على التوازن بعد إدراج عقدة
    for val in [1, 2, 3, 4, 5, 8, 7, 9, 10, 6]:
        test_insert(avl_tree, val)

    # أدخل عقدة مكررة
    test_insert(avl_tree, 7)

    # احذف عقدة
    # راقب كيف تحافظ شجرة AVL على التوازن بعد حذف عقدة
    test_remove(avl_tree, 8)  # احذف عقدة بلا أبناء
    test_remove(avl_tree, 5)  # احذف عقدة ذات ابن واحد
    test_remove(avl_tree, 4)  # احذف عقدة ذات ابنين

    result_node = avl_tree.search(7)
    print("\nFound node object: {}, node value = {}".format(result_node, result_node.val))
