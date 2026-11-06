"""
File: list_node.py
Created Time: 2021-12-11
Author: krahets (krahets@163.com)
"""


class ListNode:
    """صنف عقدة القائمة المترابطة"""

    def __init__(self, val: int):
        self.val: int = val  # قيمة العقدة
        self.next: ListNode | None = None  # إشارة إلى العقدة التالية


def list_to_linked_list(arr: list[int]) -> ListNode | None:
    """فك تسلسل قائمة إلى قائمة مترابطة"""
    dum = head = ListNode(0)
    for a in arr:
        node = ListNode(a)
        head.next = node
        head = head.next
    return dum.next


def linked_list_to_list(head: ListNode | None) -> list[int]:
    """تسلسل قائمة مترابطة إلى قائمة"""
    arr: list[int] = []
    while head:
        arr.append(head.val)
        head = head.next
    return arr
