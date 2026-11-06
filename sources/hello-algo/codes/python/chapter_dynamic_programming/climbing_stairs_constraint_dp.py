"""
File: climbing_stairs_constraint_dp.py
Created Time: 2023-06-30
Author: krahets (krahets@163.com)
"""


def climbing_stairs_constraint_dp(n: int) -> int:
    """Climbing stairs with constraints: dynamic programming"""
    if n == 1 or n == 2:
        return 1
    # مهّد جدول dp لتخزين حلول المسائل الجزئية
    dp = [[0] * 3 for _ in range(n + 1)]
    # الحالات الابتدائية: حدّد حلول أصغر المسائل الجزئية
    dp[1][1], dp[1][2] = 1, 0
    dp[2][1], dp[2][2] = 0, 1
    # انتقالات الحالة: حُلّ المسائل الجزئية الأكبر تدرّجيًا باستخدام الأصغر منها
    for i in range(3, n + 1):
        dp[i][1] = dp[i - 1][2]
        dp[i][2] = dp[i - 2][1] + dp[i - 2][2]
    return dp[n][1] + dp[n][2]


"""Driver code"""
if __name__ == "__main__":
    n = 9

    res = climbing_stairs_constraint_dp(n)
    print(f"Number of ways to climb {n} stairs: {res}")
