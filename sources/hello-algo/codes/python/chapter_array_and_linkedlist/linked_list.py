"""
File: linked_list.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import ListNode, print_linked_list


def insert(n0: ListNode, P: ListNode):
    """إدراج العقدة P بعد العقدة n0 في القائمة المترابطة"""
    n1 = n0.next
    P.next = n1
    n0.next = P


def remove(n0: ListNode):
    """حذف أول عقدة بعد العقدة n0 في القائمة المترابطة"""
    if not n0.next:
        return
    # n0 -> P -> n1
    P = n0.next
    n1 = P.next
    n0.next = n1


def access(head: ListNode, index: int) -> ListNode | None:
    """وصول إلى العقدة عند الفهرس `index` في القائمة المترابطة"""
    for _ in range(index):
        if not head:
            return None
        head = head.next
    return head


def find(head: ListNode, target: int) -> int:
    """العثور على أول عقدة قيمتها target في القائمة المترابطة"""
    index = 0
    while head:
        if head.val == target:
            return index
        head = head.next
        index += 1
    return -1


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد القائمة المترابطة
    # مهّد العقد كلًا على حدة
    n0 = ListNode(1)
    n1 = ListNode(3)
    n2 = ListNode(2)
    n3 = ListNode(5)
    n4 = ListNode(4)
    # أوجد الإشارات بين العقد
    n0.next = n1
    n1.next = n2
    n2.next = n3
    n3.next = n4
    print("The initialized linked list is")
    print_linked_list(n0)

    # أدخل عقدة
    p = ListNode(0)
    insert(n0, p)
    print("The linked list after inserting a node is")
    print_linked_list(n0)

    # احذف عقدة
    remove(n0)
    print("The linked list after removing a node is")
    print_linked_list(n0)

    # وصول إلى عقدة
    node: ListNode = access(n0, 3)
    print("Value of the node at index 3 in the linked list = {}".format(node.val))

    # ابحث عن عقدة
    index: int = find(n0, 2)
    print("Index of the node with value 2 in the linked list = {}".format(index))
