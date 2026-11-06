"""
File: heap.py
Created Time: 2023-02-23
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import print_heap

import heapq


def test_push(heap: list, val: int, flag: int = 1):
    heapq.heappush(heap, flag * val)  # ادفع عنصرًا إلى الكومة
    print(f"\nAfter pushing element {val} onto the heap:")
    print_heap([flag * val for val in heap])


def test_pop(heap: list, flag: int = 1):
    val = flag * heapq.heappop(heap)  # اسحب عنصر القمة من الكومة
    print(f"\nAfter popping top element {val} from the heap:")
    print_heap([flag * val for val in heap])


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد كومة صغرى
    min_heap, flag = [], 1
    # مهّد كومة كبرى
    max_heap, flag = [], -1

    print("\nThe following example uses a max heap")
    # الوحدة heapq في Python تنفذ كومة صغرى افتراضيًا
    # اعكس إشارة كل عنصر قبل دفعه إلى الكومة لعكس الترتيب وتنفيذ كومة كبرى
    # في هذا المثال، flag = 1 يمثل كومة صغرى و flag = -1 يمثل كومة كبرى

    # ادفع عنصرًا إلى الكومة
    test_push(max_heap, 1, flag)
    test_push(max_heap, 3, flag)
    test_push(max_heap, 2, flag)
    test_push(max_heap, 5, flag)
    test_push(max_heap, 4, flag)

    # احصل على عنصر قمة الكومة
    peek: int = flag * max_heap[0]
    print(f"\nTop element of the heap: {peek}")

    # اسحب عنصر القمة من الكومة
    test_pop(max_heap, flag)
    test_pop(max_heap, flag)
    test_pop(max_heap, flag)
    test_pop(max_heap, flag)
    test_pop(max_heap, flag)

    # احصل على حجم الكومة
    size: int = len(max_heap)
    print(f"\nNumber of elements in the heap: {size}")

    # تحقق مما إذا كانت الكومة فارغة
    is_empty: bool = not max_heap
    print(f"\nIs the heap empty: {is_empty}")

    # ابنِ كومة من القائمة المُدخلة
    # التعقيد الزمني O(n) لا O(nlogn)
    min_heap = [1, 3, 2, 5, 4]
    heapq.heapify(min_heap)
    print("\nAfter building a min heap from the input list:")
    print_heap(min_heap)
