"""
File: hashing_search.py
Created Time: 2022-11-26
Author: timi (xisunyy@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import ListNode, list_to_linked_list


def hashing_search_array(hmap: dict[int, int], target: int) -> int:
    """Hash-based search (array)"""
    # مفتاح جدول التجزئة: العنصر الهدف؛ القيمة: الفهرس
    # أعد -1 إذا لم يؤوِ جدول التجزئة هذا المفتاح
    return hmap.get(target, -1)


def hashing_search_linkedlist(
    hmap: dict[int, ListNode], target: int
) -> ListNode | None:
    """Hash-based search (linked list)"""
    # مفتاح جدول التجزئة: العنصر الهدف؛ القيمة: كائن العقدة
    # أعد None إذا لم يؤوِ جدول التجزئة هذا المفتاح
    return hmap.get(target, None)


"""Driver code"""
if __name__ == "__main__":
    target = 3

    # البحث بالتجزئة (مصفوفة)
    nums = [1, 5, 3, 2, 4, 7, 5, 9, 10, 8]
    # مهّد جدول التجزئة
    map0 = dict[int, int]()
    for i in range(len(nums)):
        map0[nums[i]] = i  # المفتاح: العنصر؛ القيمة: الفهرس
    index: int = hashing_search_array(map0, target)
    print("Index of target element 3 =", index)

    # البحث بالتجزئة (قائمة مترابطة)
    head: ListNode = list_to_linked_list(nums)
    # مهّد جدول التجزئة
    map1 = dict[int, ListNode]()
    while head:
        map1[head.val] = head  # المفتاح: قيمة العقدة؛ القيمة: العقدة
        head = head.next
    node: ListNode = hashing_search_linkedlist(map1, target)
    print("The node object corresponding to target value 3 is", node)
