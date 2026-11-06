"""
File: array_deque.py
Created Time: 2023-03-01
Author: krahets (krahets@163.com)
"""


class ArrayDeque:
    """Deque implemented with a circular array"""

    def __init__(self, capacity: int):
        """Constructor"""
        self._nums: list[int] = [0] * capacity
        self._front: int = 0
        self._size: int = 0

    def capacity(self) -> int:
        """Get the deque capacity"""
        return len(self._nums)

    def size(self) -> int:
        """Get the deque size"""
        return self._size

    def is_empty(self) -> bool:
        """Check whether the deque is empty"""
        return self._size == 0

    def index(self, i: int) -> int:
        """Calculate an index in the circular array"""
        # استخدم باقي القسمة لربط نهاية المصفوفة ببدايتها
        # عندما يتجاوز i نهاية المصفوفة، التفّ إلى البداية
        # عندما يتجاوز i بداية المصفوفة، التفّ إلى النهاية
        return (i + self.capacity()) % self.capacity()

    def push_first(self, num: int):
        """Enqueue at the front"""
        if self._size == self.capacity():
            print("Deque is full")
            return
        # حرّك مؤشر المقدمة موضعًا واحدًا إلى اليسار
        # استخدم باقي القسمة لالتفاف front إلى النهاية عندما يتجاوز بداية المصفوفة
        self._front = self.index(self._front - 1)
        # أضف num إلى المقدمة
        self._nums[self._front] = num
        self._size += 1

    def push_last(self, num: int):
        """Enqueue at the rear"""
        if self._size == self.capacity():
            print("Deque is full")
            return
        # احسب مؤشر المؤخرة، وهو يشير إلى موضع واحد بعد آخر عنصر
        rear = self.index(self._front + self._size)
        # أضف num إلى المؤخرة
        self._nums[rear] = num
        self._size += 1

    def pop_first(self) -> int:
        """Dequeue from the front"""
        num = self.peek_first()
        # ورّر مؤشر المقدمة موضعًا واحدًا
        self._front = self.index(self._front + 1)
        self._size -= 1
        return num

    def pop_last(self) -> int:
        """Dequeue from the rear"""
        num = self.peek_last()
        self._size -= 1
        return num

    def peek_first(self) -> int:
        """Access the front element"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        return self._nums[self._front]

    def peek_last(self) -> int:
        """Access the rear element"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        # احسب فهرس آخر عنصر
        last = self.index(self._front + self._size - 1)
        return self._nums[last]

    def to_array(self) -> list[int]:
        """Return an array for printing"""
        # حوّل عناصر القائمة في النطاق المشغول فقط
        res = []
        for i in range(self._size):
            res.append(self._nums[self.index(self._front + i)])
        return res


"""Driver code"""
if __name__ == "__main__":
    # مهّد الطابور المزدوج
    deque = ArrayDeque(10)
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
