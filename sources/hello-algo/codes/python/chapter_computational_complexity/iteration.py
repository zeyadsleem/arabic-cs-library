"""
File: iteration.py
Created Time: 2023-08-24
Author: krahets (krahets@163.com)
"""


def for_loop(n: int) -> int:
    """حلقة for"""
    res = 0
    # اجمع 1، 2، ...، n-1، n في حلقة
    for i in range(1, n + 1):
        res += i
    return res


def while_loop(n: int) -> int:
    """حلقة while"""
    res = 0
    i = 1  # مهّد متغير التحكم في الحلقة
    # اجمع 1، 2، ...، n-1، n في حلقة
    while i <= n:
        res += i
        i += 1  # حدّث متغير التحكم في الحلقة
    return res


def while_loop_ii(n: int) -> int:
    """حلقة while (تحديثان)"""
    res = 0
    i = 1  # مهّد متغير التحكم في الحلقة
    # اجمع 1، 4، 10، ... في حلقة
    while i <= n:
        res += i
        # حدّث متغير التحكم في الحلقة
        i += 1
        i *= 2
    return res


def nested_for_loop(n: int) -> str:
    """حلقات for متداخلة"""
    res = ""
    # حلقة على i = 1، 2، ...، n-1، n
    for i in range(1, n + 1):
        # حلقة على j = 1، 2، ...، n-1، n
        for j in range(1, n + 1):
            res += f"({i}, {j}), "
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    n = 5
    res = for_loop(n)
    print(f"\nSum from the for loop: res = {res}")

    res = while_loop(n)
    print(f"\nSum from the while loop: res = {res}")

    res = while_loop_ii(n)
    print(f"\nSum from the while loop (two updates): res = {res}")

    res = nested_for_loop(n)
    print(f"\nTraversal from the nested for loops: {res}")
