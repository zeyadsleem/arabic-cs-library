"""
File: my_heap.py
Created Time: 2023-02-23
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import print_heap


class MaxHeap:
    """Max heap"""

    def __init__(self, nums: list[int]):
        """Constructor: build a heap from the input list"""
        # ضع عناصر القائمة في الكومة دون تغيير ترتيبها
        self.max_heap = nums
        # رشّ من كل عقدة غير ورقية نزولًا
        for i in range(self.parent(self.size() - 1), -1, -1):
            self.sift_down(i)

    def left(self, i: int) -> int:
        """Get the left child index"""
        return 2 * i + 1

    def right(self, i: int) -> int:
        """Get the right child index"""
        return 2 * i + 2

    def parent(self, i: int) -> int:
        """Get the parent index"""
        return (i - 1) // 2  # قسمة مقربة نزولًا

    def swap(self, i: int, j: int):
        """Swap elements"""
        self.max_heap[i], self.max_heap[j] = self.max_heap[j], self.max_heap[i]

    def size(self) -> int:
        """Get the heap size"""
        return len(self.max_heap)

    def is_empty(self) -> bool:
        """Check whether the heap is empty"""
        return self.size() == 0

    def peek(self) -> int:
        """Access the top element of the heap"""
        return self.max_heap[0]

    def push(self, val: int):
        """Push an element onto the heap"""
        # أضف عقدة
        self.max_heap.append(val)
        # رشّ صاعدًا
        self.sift_up(self.size() - 1)

    def sift_up(self, i: int):
        """Sift up starting from node i"""
        while True:
            # احصل على أصل العقدة i
            p = self.parent(i)
            # توقف عن الرشّ عند تجاوز الجذر أو عدم حاجة العقدة إلى إصلاح
            if p < 0 or self.max_heap[i] <= self.max_heap[p]:
                break
            # بدّل العقدتين
            self.swap(i, p)
            # واصل الرشّ صعودًا
            i = p

    def pop(self) -> int:
        """Pop an element from the heap"""
        # عالِج الكومة الفارغة
        if self.is_empty():
            raise IndexError("Heap is empty")
        # بدّل الجذر مع الورقة الأقصى يمينًا في آخر مستوى (بدّل أول عنصر وآخر عنصر)
        self.swap(0, self.size() - 1)
        # احذف عقدة
        val = self.max_heap.pop()
        # رشّ نازلًا
        self.sift_down(0)
        # أعد عنصر قمة الكومة
        return val

    def sift_down(self, i: int):
        """Sift down starting from node i"""
        while True:
            # أوجد العقدة ذات القيمة الأكبر بين i و l و r، وخزّن فهرسها في ma
            l, r, ma = self.left(i), self.right(i), i
            if l < self.size() and self.max_heap[l] > self.max_heap[ma]:
                ma = l
            if r < self.size() and self.max_heap[r] > self.max_heap[ma]:
                ma = r
            # توقف إذا كانت العقدة i هي الأكبر أو خرج فهرسا الابنين l و r كلاهما عن الحدود
            if ma == i:
                break
            # بدّل العقدتين
            self.swap(i, ma)
            # واصل الرشّ نزولًا
            i = ma

    def print(self):
        """Print the heap (binary tree)"""
        print_heap(self.max_heap)


"""Driver code"""
if __name__ == "__main__":
    # مهّد كومة كبرى
    max_heap = MaxHeap([9, 8, 6, 6, 7, 5, 2, 1, 4, 3, 6, 2])
    print("\nAfter building a heap from the input list:")
    max_heap.print()

    # احصل على عنصر قمة الكومة
    peek = max_heap.peek()
    print(f"\nTop element of the heap: {peek}")

    # ادفع عنصرًا إلى الكومة
    val = 7
    max_heap.push(val)
    print(f"\nAfter pushing element {val} onto the heap:")
    max_heap.print()

    # اسحب عنصر القمة من الكومة
    peek = max_heap.pop()
    print(f"\nAfter popping top element {peek} from the heap:")
    max_heap.print()

    # احصل على حجم الكومة
    size = max_heap.size()
    print(f"\nNumber of elements in the heap: {size}")

    # تحقق مما إذا كانت الكومة فارغة
    is_empty = max_heap.is_empty()
    print(f"\nIs the heap empty: {is_empty}")
