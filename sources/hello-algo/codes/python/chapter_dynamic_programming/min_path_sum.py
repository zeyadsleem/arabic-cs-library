"""
File: min_path_sum.py
Created Time: 2023-07-04
Author: krahets (krahets@163.com)
"""

from math import inf


def min_path_sum_dfs(grid: list[list[int]], i: int, j: int) -> int:
    """Minimum path sum: brute-force search"""
    # توقف عن البحث عند الخلية أعلى اليسار
    if i == 0 and j == 0:
        return grid[0][0]
    # إذا خرج فهرس الصف أو العمود عن الحدود، أعد كلفة +∞
    if i < 0 or j < 0:
        return inf
    # احسب أدنى كلف مسار من الزاوية أعلى اليسار إلى (i-1, j) و(i, j-1)
    up = min_path_sum_dfs(grid, i - 1, j)
    left = min_path_sum_dfs(grid, i, j - 1)
    # أعد أدنى كلفة مسار من الزاوية أعلى اليسار إلى (i, j)
    return min(left, up) + grid[i][j]


def min_path_sum_dfs_mem(
    grid: list[list[int]], mem: list[list[int]], i: int, j: int
) -> int:
    """Minimum path sum: memoized search"""
    # توقف عن البحث عند الخلية أعلى اليسار
    if i == 0 and j == 0:
        return grid[0][0]
    # إذا خرج فهرس الصف أو العمود عن الحدود، أعد كلفة +∞
    if i < 0 or j < 0:
        return inf
    # إذا كانت النتيجة مسجلةً سابقًا فأعدها مباشرةً
    if mem[i][j] != -1:
        return mem[i][j]
    # أدنى كلف مسار إلى الخليتين على اليسار وفوق
    up = min_path_sum_dfs_mem(grid, mem, i - 1, j)
    left = min_path_sum_dfs_mem(grid, mem, i, j - 1)
    # سجّل وأعد أدنى كلفة مسار من الزاوية أعلى اليسار إلى (i, j)
    mem[i][j] = min(left, up) + grid[i][j]
    return mem[i][j]


def min_path_sum_dp(grid: list[list[int]]) -> int:
    """Minimum path sum: dynamic programming"""
    n, m = len(grid), len(grid[0])
    # مهّد جدول dp
    dp = [[0] * m for _ in range(n)]
    dp[0][0] = grid[0][0]
    # انتقالات الحالة: الصف الأول
    for j in range(1, m):
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    # انتقالات الحالة: العمود الأول
    for i in range(1, n):
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    # انتقالات الحالة: بقية الصفوف والأعمدة
    for i in range(1, n):
        for j in range(1, m):
            dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
    return dp[n - 1][m - 1]


def min_path_sum_dp_comp(grid: list[list[int]]) -> int:
    """Minimum path sum: space-optimized dynamic programming"""
    n, m = len(grid), len(grid[0])
    # مهّد جدول dp
    dp = [0] * m
    # انتقالات الحالة: الصف الأول
    dp[0] = grid[0][0]
    for j in range(1, m):
        dp[j] = dp[j - 1] + grid[0][j]
    # انتقالات الحالة: بقية الصفوف
    for i in range(1, n):
        # انتقالات الحالة: العمود الأول
        dp[0] = dp[0] + grid[i][0]
        # انتقالات الحالة: بقية الأعمدة
        for j in range(1, m):
            dp[j] = min(dp[j - 1], dp[j]) + grid[i][j]
    return dp[m - 1]


"""Driver code"""
if __name__ == "__main__":
    grid = [[1, 3, 1, 5], [2, 2, 4, 2], [5, 3, 2, 1], [4, 3, 5, 2]]
    n, m = len(grid), len(grid[0])

    # البحث بالقوة الغاشمة
    res = min_path_sum_dfs(grid, n - 1, m - 1)
    print(f"Minimum path sum from the top-left to the bottom-right corner: {res}")

    # بحث بتخزين الحلول (memoization)
    mem = [[-1] * m for _ in range(n)]
    res = min_path_sum_dfs_mem(grid, mem, n - 1, m - 1)
    print(f"Minimum path sum from the top-left to the bottom-right corner: {res}")

    # البرمجة الديناميكية
    res = min_path_sum_dp(grid)
    print(f"Minimum path sum from the top-left to the bottom-right corner: {res}")

    # البرمجة الديناميكية مع تحسين المساحة
    res = min_path_sum_dp_comp(grid)
    print(f"Minimum path sum from the top-left to the bottom-right corner: {res}")
