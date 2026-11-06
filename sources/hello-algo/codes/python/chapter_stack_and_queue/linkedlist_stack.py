"""
File: linkedlist_stack.py
Created Time: 2022-11-29
Author: Peng Chen (pengchzn@gmail.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import ListNode


class LinkedListStack:
    """Stack implemented with a linked list"""

    def __init__(self):
        """Constructor"""
        self._peek: ListNode | None = None
        self._size: int = 0

    def size(self) -> int:
        """Get the stack size"""
        return self._size

    def is_empty(self) -> bool:
        """Check whether the stack is empty"""
        return self._size == 0

    def push(self, val: int):
        """Push"""
        node = ListNode(val)
        node.next = self._peek
        self._peek = node
        self._size += 1

    def pop(self) -> int:
        """Pop"""
        num = self.peek()
        self._peek = self._peek.next
        self._size -= 1
        return num

    def peek(self) -> int:
        """Access the top element"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._peek.val

    def to_list(self) -> list[int]:
        """Convert to a list for printing"""
        arr = []
        node = self._peek
        while node:
            arr.append(node.val)
            node = node.next
        arr.reverse()
        return arr


"""Driver code"""
if __name__ == "__main__":
    # مهّد المكدس
    stack = LinkedListStack()

    # ادفع العناصر إلى المكدس
    stack.push(1)
    stack.push(3)
    stack.push(2)
    stack.push(5)
    stack.push(4)
    print("Stack stack =", stack.to_list())

    # وصول إلى عنصر القمة
    peek: int = stack.peek()
    print("Top element peek =", peek)

    # اسحب عنصرًا من المكدس
    pop: int = stack.pop()
    print("Popped element pop =", pop)
    print("After popping, stack =", stack.to_list())

    # احصل على حجم المكدس
    size: int = stack.size()
    print("Stack size =", size)

    # تحقق مما إذا كان فارغًا
    is_empty: bool = stack.is_empty()
    print("Is the stack empty =", is_empty)
