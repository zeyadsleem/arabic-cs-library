"""
File: binary_search_edge.py
Created Time: 2023-08-04
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from binary_search_insertion import binary_search_insertion


def binary_search_left_edge(nums: list[int], target: int) -> int:
    """Find the leftmost occurrence of target using binary search"""
    # هذا يعادل إيجاد نقطة إدراج target
    i = binary_search_insertion(nums, target)
    # إذا لم يُوجد target فأعد -1
    if i == len(nums) or nums[i] != target:
        return -1
    # وُجد الهدف؛ أعد الفهرس i
    return i


def binary_search_right_edge(nums: list[int], target: int) -> int:
    """Find the rightmost occurrence of target using binary search"""
    # اختزل المسألة إلى إيجاد أقصى يسار نقطة إدراج لـ target + 1
    i = binary_search_insertion(nums, target + 1)
    # j هو الفهرس المرشح الأقصى يمينًا للهدف؛ و i هو فهرس أول عنصر أكبر من target أو len(nums)
    j = i - 1
    # إذا لم يُوجد target فأعد -1
    if j == -1 or nums[j] != target:
        return -1
    # وُجد الهدف؛ أعد الفهرس j
    return j


"""Driver code"""
if __name__ == "__main__":
    # مصفوفة تحوي عناصر مكررة
    nums = [1, 3, 6, 6, 6, 6, 6, 10, 12, 15]
    print(f"\nArray nums = {nums}")

    # أوجد الحدّين الأيسر والأيمن بالبحث الثنائي
    for target in [6, 7]:
        index = binary_search_left_edge(nums, target)
        print(f"Index of the leftmost occurrence of {target}: {index}")
        index = binary_search_right_edge(nums, target)
        print(f"Index of the rightmost occurrence of {target}: {index}")
