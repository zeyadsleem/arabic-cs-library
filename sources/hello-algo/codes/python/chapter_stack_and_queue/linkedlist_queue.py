"""
File: linkedlist_queue.py
Created Time: 2022-12-01
Author: Peng Chen (pengchzn@gmail.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import ListNode


class LinkedListQueue:
    """طابور منفذ بقائمة مترابطة"""

    def __init__(self):
        """المنشئ"""
        self._front: ListNode | None = None  # عقدة الرأس front
        self._rear: ListNode | None = None  # عقدة الذيل rear
        self._size: int = 0

    def size(self) -> int:
        """احصل على حجم الطابور"""
        return self._size

    def is_empty(self) -> bool:
        """تحقق مما إذا كان الطابور فارغًا"""
        return self._size == 0

    def push(self, num: int):
        """إدخال"""
        # أضف num بعد عقدة الذيل
        node = ListNode(num)
        # إذا كان الطابور فارغًا، اجعل الرأس والذيل يشيران إلى هذه العقدة معًا
        if self._front is None:
            self._front = node
            self._rear = node
        # إذا لم يكن الطابور فارغًا، أضف هذه العقدة بعد عقدة الذيل
        else:
            self._rear.next = node
            self._rear = node
        self._size += 1

    def pop(self) -> int:
        """إخراج"""
        num = self.peek()
        # احذف العقدة الرأس
        self._front = self._front.next
        self._size -= 1
        return num

    def peek(self) -> int:
        """وصول إلى عنصر المقدمة"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self._front.val

    def to_list(self) -> list[int]:
        """تحويل إلى قائمة للطباعة"""
        queue = []
        temp = self._front
        while temp:
            queue.append(temp.val)
            temp = temp.next
        return queue


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الطابور
    queue = LinkedListQueue()

    # ادخل العناصر
    queue.push(1)
    queue.push(3)
    queue.push(2)
    queue.push(5)
    queue.push(4)
    print("Queue queue =", queue.to_list())

    # وصول إلى عنصر المقدمة
    peek: int = queue.peek()
    print("Front element peek =", peek)

    # أخرج عنصرًا
    pop_front: int = queue.pop()
    print("Dequeued element pop_front =", pop_front)
    print("After dequeuing, queue =", queue.to_list())

    # احصل على حجم الطابور
    size: int = queue.size()
    print("Queue size =", size)

    # تحقق مما إذا كان الطابور فارغًا
    is_empty: bool = queue.is_empty()
    print("Is the queue empty =", is_empty)
