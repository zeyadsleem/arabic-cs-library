"""
File: top_k.py
Created Time: 2023-06-10
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import print_heap

import heapq


def top_k_heap(nums: list[int], k: int) -> list[int]:
    """العثور على أكبر k من العناصر في المصفوفة باستخدام كومة"""
    # مهّد كومة صغرى
    heap = []
    # ادفع أول k عنصر من المصفوفة إلى الكومة
    for i in range(k):
        heapq.heappush(heap, nums[i])
    # بدءًا من العنصر k+1، أبقِ حجم الكومة عند k
    for i in range(k, len(nums)):
        # إذا كان العنصر الحالي أكبر من قمة الكومة، اسحب قمة الكومة وادفع العنصر الحالي
        if nums[i] > heap[0]:
            heapq.heappop(heap)
            heapq.heappush(heap, nums[i])
    return heap


"""شيفرة تجريبية"""
if __name__ == "__main__":
    nums = [1, 7, 6, 3, 2]
    k = 3

    res = top_k_heap(nums, k)
    print(f"The {k} largest elements are")
    print_heap(res)
