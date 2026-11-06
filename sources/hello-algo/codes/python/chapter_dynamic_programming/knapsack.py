"""
File: knapsack.py
Created Time: 2023-07-03
Author: krahets (krahets@163.com)
"""


def knapsack_dfs(wgt: list[int], val: list[int], i: int, c: int) -> int:
    """0-1 knapsack: brute-force search"""
    # إذا اعتُبرت كل العناصر أولم تبق سعة، أعد قيمة 0
    if i == 0 or c == 0:
        return 0
    # إذا تجاوز العنصر السعة المتبقية وجب استبعاده
    if wgt[i - 1] > c:
        return knapsack_dfs(wgt, val, i - 1, c)
    # احسب القيم العظمى الناتجة عن استبعاد العنصر i وتضمينه
    no = knapsack_dfs(wgt, val, i - 1, c)
    yes = knapsack_dfs(wgt, val, i - 1, c - wgt[i - 1]) + val[i - 1]
    # أعد القيمة الأكبر من بين الاختيارين
    return max(no, yes)


def knapsack_dfs_mem(
    wgt: list[int], val: list[int], mem: list[list[int]], i: int, c: int
) -> int:
    """0-1 knapsack: memoized search"""
    # إذا اعتُبرت كل العناصر أولم تبق سعة، أعد قيمة 0
    if i == 0 or c == 0:
        return 0
    # إذا كانت النتيجة مسجلةً سابقًا فأعدها مباشرةً
    if mem[i][c] != -1:
        return mem[i][c]
    # إذا تجاوز العنصر السعة المتبقية وجب استبعاده
    if wgt[i - 1] > c:
        return knapsack_dfs_mem(wgt, val, mem, i - 1, c)
    # احسب القيم العظمى الناتجة عن استبعاد العنصر i وتضمينه
    no = knapsack_dfs_mem(wgt, val, mem, i - 1, c)
    yes = knapsack_dfs_mem(wgt, val, mem, i - 1, c - wgt[i - 1]) + val[i - 1]
    # سجّل وأعد القيمة الأكبر من بين الاختيارين
    mem[i][c] = max(no, yes)
    return mem[i][c]


def knapsack_dp(wgt: list[int], val: list[int], cap: int) -> int:
    """0-1 knapsack: dynamic programming"""
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
                dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - wgt[i - 1]] + val[i - 1])
    return dp[n][cap]


def knapsack_dp_comp(wgt: list[int], val: list[int], cap: int) -> int:
    """0-1 knapsack: space-optimized dynamic programming"""
    n = len(wgt)
    # مهّد جدول dp
    dp = [0] * (cap + 1)
    # انتقالات الحالة
    for i in range(1, n + 1):
        # اجتز بترتيب تنازلي
        for c in range(cap, 0, -1):
            if wgt[i - 1] > c:
                # إذا تجاوز العنصر i السعة المتبقية فلا تختره
                dp[c] = dp[c]
            else:
                # خذ القيمة الأكبر الناتجة عن استبعاد العنصر i وتضمينه
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + val[i - 1])
    return dp[cap]


"""Driver code"""
if __name__ == "__main__":
    wgt = [10, 20, 30, 40, 50]
    val = [50, 120, 150, 210, 240]
    cap = 50
    n = len(wgt)

    # البحث بالقوة الغاشمة
    res = knapsack_dfs(wgt, val, n, cap)
    print(f"Maximum total value within the knapsack capacity: {res}")

    # بحث بتخزين الحلول (memoization)
    mem = [[-1] * (cap + 1) for _ in range(n + 1)]
    res = knapsack_dfs_mem(wgt, val, mem, n, cap)
    print(f"Maximum total value within the knapsack capacity: {res}")

    # البرمجة الديناميكية
    res = knapsack_dp(wgt, val, cap)
    print(f"Maximum total value within the knapsack capacity: {res}")

    # البرمجة الديناميكية مع تحسين المساحة
    res = knapsack_dp_comp(wgt, val, cap)
    print(f"Maximum total value within the knapsack capacity: {res}")
