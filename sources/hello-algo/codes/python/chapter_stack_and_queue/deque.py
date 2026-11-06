"""
File: deque.py
Created Time: 2022-11-29
Author: Peng Chen (pengchzn@gmail.com)
"""

from collections import deque

"""Driver code"""
if __name__ == "__main__":
    # مهّد الطابور المزدوج
    deq: deque[int] = deque()

    # ادخل العناصر
    deq.append(2)  # إضافة إلى المؤخرة
    deq.append(5)
    deq.append(4)
    deq.appendleft(3)  # إضافة إلى المقدمة
    deq.appendleft(1)
    print("Deque deq =", deq)

    # وصول إلى عنصر
    front: int = deq[0]  # عنصر المقدمة
    print("Front element front =", front)
    rear: int = deq[-1]  # عنصر المؤخرة
    print("Rear element rear =", rear)

    # أخرج عنصرًا
    pop_front: int = deq.popleft()  # أخرج عنصر المقدمة
    print("Element dequeued from the front, pop_front =", pop_front)
    print("After dequeuing from the front, deq =", deq)
    pop_rear: int = deq.pop()  # أخرج عنصر المؤخرة
    print("Element dequeued from the rear, pop_rear =", pop_rear)
    print("After dequeuing from the rear, deq =", deq)

    # احصل على حجم الطابور المزدوج
    size: int = len(deq)
    print("Deque size =", size)

    # تحقق مما إذا كان الطابور المزدوج فارغًا
    is_empty: bool = len(deq) == 0
    print("Is the deque empty =", is_empty)
