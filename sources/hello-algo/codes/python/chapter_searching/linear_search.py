"""
File: linear_search.py
Created Time: 2022-11-26
Author: timi (xisunyy@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import ListNode, list_to_linked_list


def linear_search_array(nums: list[int], target: int) -> int:
    """البحث الخطي (مصفوفة)"""
    # اجتز المصفوفة
    for i in range(len(nums)):
        if nums[i] == target:  # وُجد العنصر الهدف؛ أعد فهرسه
            return i
    return -1  # لم يُوجد العنصر الهدف؛ أعد -1


def linear_search_linkedlist(head: ListNode, target: int) -> ListNode | None:
    """البحث الخطي (قائمة مترابطة)"""
    # اجتز القائمة المترابطة
    while head:
        if head.val == target:  # وُجدت العقدة الهدف؛ أعدّها
            return head
        head = head.next
    return None  # لم تُوجد العقدة الهدف؛ أعد None


"""شيفرة تجريبية"""
if __name__ == "__main__":
    target = 3

    # أجرِ بحثًا خطيًا على المصفوفة
    nums = [1, 5, 3, 2, 4, 7, 5, 9, 10, 8]
    index: int = linear_search_array(nums, target)
    print("Index of target element 3 =", index)

    # أجرِ بحثًا خطيًا على القائمة المترابطة
    head: ListNode = list_to_linked_list(nums)
    node: ListNode | None = linear_search_linkedlist(head, target)
    print("The node object corresponding to target value 3 is", node)
