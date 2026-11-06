"""
File: stack.py
Created Time: 2022-11-29
Author: Peng Chen (pengchzn@gmail.com)
"""

"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد المكدس
    # لا يوجد في Python صنف مكدس مدمج؛ يمكن استخدام القائمة بوصفها مكدسًا
    stack: list[int] = []

    # ادفع العناصر إلى المكدس
    stack.append(1)
    stack.append(3)
    stack.append(2)
    stack.append(5)
    stack.append(4)
    print("Stack stack =", stack)

    # وصول إلى عنصر القمة
    peek: int = stack[-1]
    print("Top element peek =", peek)

    # اسحب عنصرًا من المكدس
    pop: int = stack.pop()
    print("Popped element pop =", pop)
    print("After popping, stack =", stack)

    # احصل على حجم المكدس
    size: int = len(stack)
    print("Stack size =", size)

    # تحقق مما إذا كان فارغًا
    is_empty: bool = len(stack) == 0
    print("Is the stack empty =", is_empty)
