"""
File: coin_change.py
Created Time: 2023-07-10
Author: krahets (krahets@163.com)
"""


def coin_change_dp(coins: list[int], amt: int) -> int:
    """تغيير العملات: البرمجة الديناميكية"""
    n = len(coins)
    MAX = amt + 1
    # مهّد جدول dp
    dp = [[0] * (amt + 1) for _ in range(n + 1)]
    # انتقالات الحالة: الصف الأول والعمود الأول
    for a in range(1, amt + 1):
        dp[0][a] = MAX
    # انتقالات الحالة: بقية الصفوف والأعمدة
    for i in range(1, n + 1):
        for a in range(1, amt + 1):
            if coins[i - 1] > a:
                # إذا تجاوزت قيمة العملة المبلغ الحالي a، فلا تختر العملة i
                dp[i][a] = dp[i - 1][a]
            else:
                # خذ النتيجة الأصغر بين عدم اختيار العملة i واختيارها
                dp[i][a] = min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1)
    return dp[n][amt] if dp[n][amt] != MAX else -1


def coin_change_dp_comp(coins: list[int], amt: int) -> int:
    """تغيير العملات: البرمجة الديناميكية مع تحسين المساحة"""
    n = len(coins)
    MAX = amt + 1
    # مهّد جدول dp
    dp = [MAX] * (amt + 1)
    dp[0] = 0
    # انتقالات الحالة
    for i in range(1, n + 1):
        # اجتز بترتيب تصاعدي
        for a in range(1, amt + 1):
            if coins[i - 1] > a:
                # إذا تجاوزت قيمة العملة المبلغ الحالي a، فلا تختر العملة i
                dp[a] = dp[a]
            else:
                # خذ النتيجة الأصغر بين عدم اختيار العملة i واختيارها
                dp[a] = min(dp[a], dp[a - coins[i - 1]] + 1)
    return dp[amt] if dp[amt] != MAX else -1


"""شيفرة تجريبية"""
if __name__ == "__main__":
    coins = [1, 2, 5]
    amt = 4

    # البرمجة الديناميكية
    res = coin_change_dp(coins, amt)
    print(f"Minimum number of coins needed to make the target amount: {res}")

    # البرمجة الديناميكية مع تحسين المساحة
    res = coin_change_dp_comp(coins, amt)
    print(f"Minimum number of coins needed to make the target amount: {res}")
