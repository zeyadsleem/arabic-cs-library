"""
File: min_cost_climbing_stairs_dp.py
Created Time: 2023-06-30
Author: krahets (krahets@163.com)
"""


def min_cost_climbing_stairs_dp(cost: list[int]) -> int:
    """أدنى كلفة لصعود الدرج: البرمجة الديناميكية"""
    n = len(cost) - 1
    if n == 1 or n == 2:
        return cost[n]
    # مهّد جدول dp لتخزين حلول المسائل الجزئية
    dp = [0] * (n + 1)
    # الحالات الابتدائية: حدّد حلول أصغر المسائل الجزئية
    dp[1], dp[2] = cost[1], cost[2]
    # انتقالات الحالة: حُلّ المسائل الجزئية الأكبر تدرّجيًا باستخدام الأصغر منها
    for i in range(3, n + 1):
        dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]
    return dp[n]


def min_cost_climbing_stairs_dp_comp(cost: list[int]) -> int:
    """أدنى كلفة لصعود الدرج: البرمجة الديناميكية مع تحسين المساحة"""
    n = len(cost) - 1
    if n == 1 or n == 2:
        return cost[n]
    a, b = cost[1], cost[2]
    for i in range(3, n + 1):
        a, b = b, min(a, b) + cost[i]
    return b


"""شيفرة تجريبية"""
if __name__ == "__main__":
    cost = [0, 1, 10, 1, 1, 1, 10, 1, 1, 10, 1]
    print(f"Input list of stair costs: {cost}")

    res = min_cost_climbing_stairs_dp(cost)
    print(f"Minimum cost to finish climbing the stairs: {res}")

    res = min_cost_climbing_stairs_dp_comp(cost)
    print(f"Minimum cost to finish climbing the stairs: {res}")
