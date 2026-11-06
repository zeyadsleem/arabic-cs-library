"""
File: hanota.py
Created Time: 2023-07-16
Author: krahets (krahets@163.com)
"""


def move(src: list[int], tar: list[int]):
    """Move one disk"""
    # خذ قرصًا من أعلى src
    pan = src.pop()
    # ضع القرص على أعلى tar
    tar.append(pan)


def dfs(i: int, src: list[int], buf: list[int], tar: list[int]):
    """Solve the Tower of Hanoi problem f(i)"""
    # إذا كانت هذه المسألة الجزئية فيها قرص واحد فقط لنقله، انقله مباشرةً من src إلى tar
    if i == 1:
        move(src, tar)
        return
    # المسألة الجزئية f(i-1): انقل أعلى i-1 قرصًا من src إلى buf باستخدام tar
    dfs(i - 1, src, tar, buf)
    # المسألة الجزئية f(1): انقل القرص المتبقي في هذه المسألة الجزئية من src إلى tar
    move(src, tar)
    # المسألة الجزئية f(i-1): انقل أعلى i-1 قرصًا من buf إلى tar باستخدام src
    dfs(i - 1, buf, src, tar)


def solve_hanota(A: list[int], B: list[int], C: list[int]):
    """Solve the Tower of Hanoi problem"""
    n = len(A)
    # انقل أعلى n من الأقراص من A إلى C باستخدام B
    dfs(n, A, B, C)


"""Driver code"""
if __name__ == "__main__":
    # تمثل نهاية كل قائمة أعلى الخازوق
    A = [5, 4, 3, 2, 1]
    B = []
    C = []
    print("Initial state:")
    print(f"A = {A}")
    print(f"B = {B}")
    print(f"C = {C}")

    solve_hanota(A, B, C)

    print("After moving the disks:")
    print(f"A = {A}")
    print(f"B = {B}")
    print(f"C = {C}")
