"""
File: recursion.py
Created Time: 2023-08-24
Author: krahets (krahets@163.com)
"""


def recur(n: int) -> int:
    """Recursion"""
    # الحالة الأساس
    if n == 1:
        return 1
    # تعاود: أجرِ استدعاءً تعاوديًا
    res = recur(n - 1)
    # التراجع: أعد النتيجة
    return n + res


def for_loop_recur(n: int) -> int:
    """Simulate recursion using iteration"""
    # استخدم مكدسًا صريحًا لمحاكاة مكدس الاستدعاءات في النظام
    stack = []
    res = 0
    # حاكِ مرحلة الاستدعاء التعاودي
    for i in range(n, 0, -1):
        # حاكِ الاستدعاءات التعاودية بالدفع إلى المكدس
        stack.append(i)
    # حاكِ التراجع وتجميع النتيجة
    while stack:
        # حاكِ التراجع بالسحب من المكدس
        res += stack.pop()
    # res = 1+2+3+...+n
    return res


def tail_recur(n, res):
    """Tail recursion"""
    # الحالة الأساس
    if n == 0:
        return res
    # استدعاء تعاودي ذيلي
    return tail_recur(n - 1, res + n)


def fib(n: int) -> int:
    """Fibonacci sequence: recursion"""
    # حالات الأساس: f(1) = 0، f(2) = 1
    if n == 1 or n == 2:
        return n - 1
    # استدعاءات تعاودية: f(n) = f(n-1) + f(n-2)
    res = fib(n - 1) + fib(n - 2)
    # أعد النتيجة f(n)
    return res


"""Driver code"""
if __name__ == "__main__":
    n = 5
    res = recur(n)
    print(f"\nSum from the recursive function: res = {res}")

    res = for_loop_recur(n)
    print(f"\nSum from simulating recursion using iteration: res = {res}")

    res = tail_recur(n, 0)
    print(f"\nSum from the tail-recursive function: res = {res}")

    res = fib(n)
    print(f"\nTerm {n} of the Fibonacci sequence is {res}")
