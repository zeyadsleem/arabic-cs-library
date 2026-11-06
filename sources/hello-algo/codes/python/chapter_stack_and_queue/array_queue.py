"""
File: array_queue.py
Created Time: 2022-12-01
Author: Peng Chen (pengchzn@gmail.com)
"""


class ArrayQueue:
    """Queue implemented with a circular array"""

    def __init__(self, size: int):
        """Constructor"""
        self._nums: list[int] = [0] * size  # المصفوفة التي تخزن عناصر الطابور
        self._front: int = 0  # مؤشر المقدمة، يشير إلى أول عنصر
        self._size: int = 0  # حجم الطابور

    def capacity(self) -> int:
        """Get the queue capacity"""
        return len(self._nums)

    def size(self) -> int:
        """Get the queue size"""
        return self._size

    def is_empty(self) -> bool:
        """Check whether the queue is empty"""
        return self._size == 0

    def push(self, num: int):
        """Enqueue"""
        if self._size == self.capacity():
            raise IndexError("Queue is full")
        # احسب مؤشر المؤخرة، وهو يشير إلى موضع واحد بعد آخر عنصر
        # استخدم باقي القسمة لالتفاف rear إلى البداية عندما يتجاوز نهاية المصفوفة
        rear: int = (self._front + self._size) % self.capacity()
        # أضف num إلى المؤخرة
        self._nums[rear] = num
        self._size += 1

    def pop(self) -> int:
        """Dequeue"""
        num: int = self.peek()
        # ورّر مؤشر المقدمة موضعًا واحدًا، مع الالتفاف إلى البداية إن تجاوز النهاية
        self._front = (self._front + 1) % self.capacity()
        self._size -= 1
        return num

    def peek(self) -> int:
        """Access the front element"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self._nums[self._front]

    def to_list(self) -> list[int]:
        """Return a list for printing"""
        res = [0] * self.size()
        j: int = self._front
        for i in range(self.size()):
            res[i] = self._nums[(j % self.capacity())]
            j += 1
        return res


"""Driver code"""
if __name__ == "__main__":
    # مهّد الطابور
    queue = ArrayQueue(10)

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
    pop: int = queue.pop()
    print("Dequeued element pop =", pop)
    print("After dequeuing, queue =", queue.to_list())

    # احصل على حجم الطابور
    size: int = queue.size()
    print("Queue size =", size)

    # تحقق مما إذا كان الطابور فارغًا
    is_empty: bool = queue.is_empty()
    print("Is the queue empty =", is_empty)

    # اختبر المصفوفة الدائرية
    for i in range(10):
        queue.push(i)
        queue.pop()
        print("Round", i, ": after enqueue + dequeue, queue = ", queue.to_list())
