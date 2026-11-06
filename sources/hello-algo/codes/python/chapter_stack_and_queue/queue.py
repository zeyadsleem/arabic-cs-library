"""
File: queue.py
Created Time: 2022-11-29
Author: Peng Chen (pengchzn@gmail.com)
"""

from collections import deque

"""Driver code"""
if __name__ == "__main__":
    # مهّد الطابور
    # في Python نستخدم غالبًا الصنف deque بوصفه طابورًا
    # ورغم أن queue.Queue() صنف طابور مخصص، فإن deque أيسر استخدامًا في هذا المثال
    que: deque[int] = deque()

    # ادخل العناصر
    que.append(1)
    que.append(3)
    que.append(2)
    que.append(5)
    que.append(4)
    print("Queue que =", que)

    # وصول إلى عنصر المقدمة
    front: int = que[0]
    print("Front element front =", front)

    # أخرج عنصرًا
    pop: int = que.popleft()
    print("Dequeued element pop =", pop)
    print("After dequeuing, que =", que)

    # احصل على حجم الطابور
    size: int = len(que)
    print("Queue size =", size)

    # تحقق مما إذا كان الطابور فارغًا
    is_empty: bool = len(que) == 0
    print("Is the queue empty =", is_empty)
