"""
File: array_stack.py
Created Time: 2022-11-29
Author: Peng Chen (pengchzn@gmail.com)
"""


class ArrayStack:
    """Stack implemented with an array"""

    def __init__(self):
        """Constructor"""
        self._stack: list[int] = []

    def size(self) -> int:
        """Get the stack size"""
        return len(self._stack)

    def is_empty(self) -> bool:
        """Check whether the stack is empty"""
        return self.size() == 0

    def push(self, item: int):
        """Push"""
        self._stack.append(item)

    def pop(self) -> int:
        """Pop"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._stack.pop()

    def peek(self) -> int:
        """Access the top element"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._stack[-1]

    def to_list(self) -> list[int]:
        """Return a list for printing"""
        return self._stack


"""Driver code"""
if __name__ == "__main__":
    # مهّد المكدس
    stack = ArrayStack()

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
