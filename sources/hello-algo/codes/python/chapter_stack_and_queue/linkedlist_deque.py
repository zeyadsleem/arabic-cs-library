"""
File: linkedlist_deque.py
Created Time: 2023-03-01
Author: krahets (krahets@163.com)
"""


class ListNode:
    """عقدة القائمة المترابطة المزدوجة"""

    def __init__(self, val: int):
        """المنشئ"""
        self.val: int = val
        self.next: ListNode | None = None  # إشارة إلى العقدة التالية
        self.prev: ListNode | None = None  # إشارة إلى العقدة السابقة


class LinkedListDeque:
    """طابور مزدوج منفذ بقائمة مترابطة مزدوجة"""

    def __init__(self):
        """المنشئ"""
        self._front: ListNode | None = None  # عقدة الرأس front
        self._rear: ListNode | None = None  # عقدة الذيل rear
        self._size: int = 0  # حجم الطابور المزدوج

    def size(self) -> int:
        """احصل على حجم الطابور المزدوج"""
        return self._size

    def is_empty(self) -> bool:
        """تحقق مما إذا كان الطابور المزدوج فارغًا"""
        return self._size == 0

    def push(self, num: int, is_front: bool):
        """عملية الإدخال"""
        node = ListNode(num)
        # إذا كانت القائمة المترابطة فارغة، اجعل front و rear يشيران إلى العقدة معًا
        if self.is_empty():
            self._front = self._rear = node
        # إدخال من المقدمة
        elif is_front:
            # أضف العقدة إلى رأس القائمة المترابطة
            self._front.prev = node
            node.next = self._front
            self._front = node  # حدّث عقدة الرأس
        # إدخال من المؤخرة
        else:
            # أضف العقدة إلى ذيل القائمة المترابطة
            self._rear.next = node
            node.prev = self._rear
            self._rear = node  # حدّث عقدة الذيل
        self._size += 1  # حدّث حجم الطابور المزدوج

    def push_first(self, num: int):
        """إدخال من المقدمة"""
        self.push(num, True)

    def push_last(self, num: int):
        """إدخال من المؤخرة"""
        self.push(num, False)

    def pop(self, is_front: bool) -> int:
        """عملية الإخراج"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        # عندما يكون حجم الطابور المزدوج 1، يشير الرأس والذيل إلى العقدة نفسها
        if self._size == 1:
            val: int = self._front.val
            self._front = None
            self._rear = None
        # إخراج من المقدمة
        elif is_front:
            val: int = self._front.val  # احفظ قيمة عقدة الرأس
            # احذف العقدة الرأس
            fnext: ListNode | None = self._front.next
            fnext.prev = None
            self._front.next = None
            self._front = fnext  # حدّث عقدة الرأس
        # إخراج من المؤخرة
        else:
            val: int = self._rear.val  # احفظ قيمة عقدة الذيل
            # احذف عقدة الذيل
            rprev: ListNode | None = self._rear.prev
            rprev.next = None
            self._rear.prev = None
            self._rear = rprev  # حدّث عقدة الذيل
        self._size -= 1  # حدّث حجم الطابور المزدوج
        return val

    def pop_first(self) -> int:
        """إخراج من المقدمة"""
        return self.pop(True)

    def pop_last(self) -> int:
        """إخراج من المؤخرة"""
        return self.pop(False)

    def peek_first(self) -> int:
        """وصول إلى عنصر المقدمة"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        return self._front.val

    def peek_last(self) -> int:
        """الوصول إلى عنصر المؤخرة"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        return self._rear.val

    def to_array(self) -> list[int]:
        """إعادة مصفوفة للطباعة"""
        node = self._front
        res = [0] * self.size()
        for i in range(self.size()):
            res[i] = node.val
            node = node.next
        return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد الطابور المزدوج
    deque = LinkedListDeque()
    deque.push_last(3)
    deque.push_last(2)
    deque.push_last(5)
    print("Deque deque =", deque.to_array())

    # وصول إلى عنصر
    peek_first: int = deque.peek_first()
    print("Front element peek_first =", peek_first)
    peek_last: int = deque.peek_last()
    print("Rear element peek_last =", peek_last)

    # ادخل العناصر
    deque.push_last(4)
    print("After enqueuing element 4 at the rear, deque =", deque.to_array())
    deque.push_first(1)
    print("After enqueuing element 1 at the front, deque =", deque.to_array())

    # أخرج عنصرًا
    pop_last: int = deque.pop_last()
    print("Element dequeued from the rear =", pop_last, ", after dequeuing from the rear, deque =", deque.to_array())
    pop_first: int = deque.pop_first()
    print("Element dequeued from the front =", pop_first, ", after dequeuing from the front, deque =", deque.to_array())

    # احصل على حجم الطابور المزدوج
    size: int = deque.size()
    print("Deque size =", size)

    # تحقق مما إذا كان الطابور المزدوج فارغًا
    is_empty: bool = deque.is_empty()
    print("Is the deque empty =", is_empty)
