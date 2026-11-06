"""
File: array_stack.py
Created Time: 2022-11-29
Author: Peng Chen (pengchzn@gmail.com)
"""


class ArrayStack:
    """مكدس منفذ بمصفوفة"""

    def __init__(self):
        """المنشئ"""
        self._stack: list[int] = []

    def size(self) -> int:
        """احصل على حجم المكدس"""
        return len(self._stack)

    def is_empty(self) -> bool:
        """التحقق مما إذا كان المكدس فارغًا"""
        return self.size() == 0

    def push(self, item: int):
        """دفع"""
        self._stack.append(item)

    def pop(self) -> int:
        """سحب"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._stack.pop()

    def peek(self) -> int:
        """وصول إلى عنصر القمة"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self._stack[-1]

    def to_list(self) -> list[int]:
        """إعادة قائمة للطباعة"""
        return self._stack


"""شيفرة تجريبية"""
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
