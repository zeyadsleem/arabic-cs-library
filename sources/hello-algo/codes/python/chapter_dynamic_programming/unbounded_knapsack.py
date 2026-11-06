"""
File: unbounded_knapsack.py
Created Time: 2023-07-10
Author: krahets (krahets@163.com)
"""


def unbounded_knapsack_dp(wgt: list[int], val: list[int], cap: int) -> int:
    """Unbounded knapsack: dynamic programming"""
    n = len(wgt)
    # مهّد جدول dp
    dp = [[0] * (cap + 1) for _ in range(n + 1)]
    # انتقالات الحالة
    for i in range(1, n + 1):
        for c in range(1, cap + 1):
            if wgt[i - 1] > c:
                # إذا تجاوز العنصر i السعة المتبقية فلا تختره
                dp[i][c] = dp[i - 1][c]
            else:
                # خذ القيمة الأكبر الناتجة عن استبعاد العنصر i وتضمينه
                dp[i][c] = max(dp[i - 1][c], dp[i][c - wgt[i - 1]] + val[i - 1])
    return dp[n][cap]


def unbounded_knapsack_dp_comp(wgt: list[int], val: list[int], cap: int) -> int:
    """Unbounded knapsack: space-optimized dynamic programming"""
    n = len(wgt)
    # مهّد جدول dp
    dp = [0] * (cap + 1)
    # انتقالات الحالة
    for i in range(1, n + 1):
        # اجتز بترتيب تصاعدي
        for c in range(1, cap + 1):
            if wgt[i - 1] > c:
                # إذا تجاوز العنصر i السعة المتبقية فلا تختره
                dp[c] = dp[c]
            else:
                # خذ القيمة الأكبر الناتجة عن استبعاد العنصر i وتضمينه
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + val[i - 1])
    return dp[cap]


"""Driver code"""
if __name__ == "__main__":
    wgt = [1, 2, 3]
    val = [5, 11, 15]
    cap = 4

    # البرمجة الديناميكية
    res = unbounded_knapsack_dp(wgt, val, cap)
    print(f"Maximum total value within the knapsack capacity: {res}")

    # البرمجة الديناميكية مع تحسين المساحة
    res = unbounded_knapsack_dp_comp(wgt, val, cap)
    print(f"Maximum total value within the knapsack capacity: {res}")
