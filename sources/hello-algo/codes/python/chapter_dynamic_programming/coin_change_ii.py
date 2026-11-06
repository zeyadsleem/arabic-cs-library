"""
File: coin_change_ii.py
Created Time: 2023-07-10
Author: krahets (krahets@163.com)
"""


def coin_change_ii_dp(coins: list[int], amt: int) -> int:
    """تغيير العملات II: البرمجة الديناميكية"""
    n = len(coins)
    # مهّد جدول dp
    dp = [[0] * (amt + 1) for _ in range(n + 1)]
    # مهّد العمود الأول
    for i in range(n + 1):
        dp[i][0] = 1
    # انتقالات الحالة
    for i in range(1, n + 1):
        for a in range(1, amt + 1):
            if coins[i - 1] > a:
                # إذا تجاوزت قيمة العملة المبلغ الحالي a، فلا تختر العملة i
                dp[i][a] = dp[i - 1][a]
            else:
                # اجمع عدد الطرق بدون العملة i ومعها
                dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]]
    return dp[n][amt]


def coin_change_ii_dp_comp(coins: list[int], amt: int) -> int:
    """تغيير العملات II: البرمجة الديناميكية مع تحسين المساحة"""
    n = len(coins)
    # مهّد جدول dp
    dp = [0] * (amt + 1)
    dp[0] = 1
    # انتقالات الحالة
    for i in range(1, n + 1):
        # اجتز بترتيب تصاعدي
        for a in range(1, amt + 1):
            if coins[i - 1] > a:
                # إذا تجاوزت قيمة العملة المبلغ الحالي a، فلا تختر العملة i
                dp[a] = dp[a]
            else:
                # اجمع عدد الطرق بدون العملة i ومعها
                dp[a] = dp[a] + dp[a - coins[i - 1]]
    return dp[amt]


"""شيفرة تجريبية"""
if __name__ == "__main__":
    coins = [1, 2, 5]
    amt = 5

    # البرمجة الديناميكية
    res = coin_change_ii_dp(coins, amt)
    print(f"Number of coin combinations that make the target amount: {res}")

    # البرمجة الديناميكية مع تحسين المساحة
    res = coin_change_ii_dp_comp(coins, amt)
    print(f"Number of coin combinations that make the target amount: {res}")
