"""
File: climbing_stairs_backtrack.py
Created Time: 2023-06-30
Author: krahets (krahets@163.com)
"""


def backtrack(choices: list[int], state: int, n: int, res: list[int]) -> int:
    """التتبع الرجعي"""
    # عند بلوغ الدرج n، زِد عدد الطرق بمقدار 1
    if state == n:
        res[0] += 1
    # تكرّر على كل الاختيارات
    for choice in choices:
        # تشذيب: لا تتجاوز الدرج n
        if state + choice > n:
            continue
        # تجربة: اختر وحدّث الحالة
        backtrack(choices, state + choice, n, res)
        # تراجع


def climbing_stairs_backtrack(n: int) -> int:
    """صعود الدرج: التتبّع الرجعي"""
    choices = [1, 2]  # اختر صعود درج أو درجين
    state = 0  # ابدأ الصعود من الدرج 0
    res = [0]  # استخدم res[0] لتسجيل عدد الطرق
    backtrack(choices, state, n, res)
    return res[0]


"""شيفرة تجريبية"""
if __name__ == "__main__":
    n = 9

    res = climbing_stairs_backtrack(n)
    print(f"Number of ways to climb {n} stairs: {res}")
