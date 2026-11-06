"""
File: edit_distancde.py
Created Time: 2023-07-04
Author: krahets (krahets@163.com)
"""


def edit_distance_dfs(s: str, t: str, i: int, j: int) -> int:
    """Edit distance: brute-force search"""
    # إذا كانت البادئتان s[:i] و t[:j] فارغتين، أعد 0
    if i == 0 and j == 0:
        return 0
    # إذا كانت البادئة s[:i] فارغة، أعد طول البادئة t[:j] وهو j
    if i == 0:
        return j
    # إذا كانت البادئة t[:j] فارغة، أعد طول البادئة s[:i] وهو i
    if j == 0:
        return i
    # إذا كان الحرفان متساويين، تخطَّ كليهما
    if s[i - 1] == t[j - 1]:
        return edit_distance_dfs(s, t, i - 1, j - 1)
    # الحد الأدنى من التعديلات = الأصغر بين المسائل الجزئية للإدراج والحذف والاستبدال + 1
    insert = edit_distance_dfs(s, t, i, j - 1)
    delete = edit_distance_dfs(s, t, i - 1, j)
    replace = edit_distance_dfs(s, t, i - 1, j - 1)
    # أعد الحد الأدنى لعدد التعديلات
    return min(insert, delete, replace) + 1


def edit_distance_dfs_mem(s: str, t: str, mem: list[list[int]], i: int, j: int) -> int:
    """Edit distance: memoized search"""
    # إذا كانت البادئتان s[:i] و t[:j] فارغتين، أعد 0
    if i == 0 and j == 0:
        return 0
    # إذا كانت البادئة s[:i] فارغة، أعد طول البادئة t[:j] وهو j
    if i == 0:
        return j
    # إذا كانت البادئة t[:j] فارغة، أعد طول البادئة s[:i] وهو i
    if j == 0:
        return i
    # إذا كانت النتيجة مسجلةً سابقًا فأعدها مباشرةً
    if mem[i][j] != -1:
        return mem[i][j]
    # إذا كان الحرفان متساويين، تخطَّ كليهما
    if s[i - 1] == t[j - 1]:
        return edit_distance_dfs_mem(s, t, mem, i - 1, j - 1)
    # الحد الأدنى من التعديلات = الأصغر بين المسائل الجزئية للإدراج والحذف والاستبدال + 1
    insert = edit_distance_dfs_mem(s, t, mem, i, j - 1)
    delete = edit_distance_dfs_mem(s, t, mem, i - 1, j)
    replace = edit_distance_dfs_mem(s, t, mem, i - 1, j - 1)
    # سجّل وأعد الحد الأدنى لعدد التعديلات
    mem[i][j] = min(insert, delete, replace) + 1
    return mem[i][j]


def edit_distance_dp(s: str, t: str) -> int:
    """Edit distance: dynamic programming"""
    n, m = len(s), len(t)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    # انتقالات الحالة: الصف الأول والعمود الأول
    for i in range(1, n + 1):
        dp[i][0] = i
    for j in range(1, m + 1):
        dp[0][j] = j
    # انتقالات الحالة: بقية الصفوف والأعمدة
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if s[i - 1] == t[j - 1]:
                # إذا كان الحرفان متساويين، تخطَّ كليهما
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # الحد الأدنى من التعديلات = الأصغر بين المسائل الجزئية للإدراج والحذف والاستبدال + 1
                dp[i][j] = min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
    return dp[n][m]


def edit_distance_dp_comp(s: str, t: str) -> int:
    """Edit distance: space-optimized dynamic programming"""
    n, m = len(s), len(t)
    dp = [0] * (m + 1)
    # انتقالات الحالة: الصف الأول
    for j in range(1, m + 1):
        dp[j] = j
    # انتقالات الحالة: بقية الصفوف
    for i in range(1, n + 1):
        # انتقالات الحالة: العمود الأول
        leftup = dp[0]  # خزّن dp[i-1, j-1] مؤقتًا
        dp[0] += 1
        # انتقالات الحالة: بقية الأعمدة
        for j in range(1, m + 1):
            temp = dp[j]
            if s[i - 1] == t[j - 1]:
                # إذا كان الحرفان متساويين، تخطَّ كليهما
                dp[j] = leftup
            else:
                # الحد الأدنى من التعديلات = الأصغر بين المسائل الجزئية للإدراج والحذف والاستبدال + 1
                dp[j] = min(dp[j - 1], dp[j], leftup) + 1
            leftup = temp  # حدّث إلى dp[i-1, j-1] للتكرار التالي
    return dp[m]


"""Driver code"""
if __name__ == "__main__":
    s = "bag"
    t = "pack"
    n, m = len(s), len(t)

    # البحث بالقوة الغاشمة
    res = edit_distance_dfs(s, t, n, m)
    print(f"Changing {s} to {t} requires at least {res} edits")

    # بحث بتخزين الحلول (memoization)
    mem = [[-1] * (m + 1) for _ in range(n + 1)]
    res = edit_distance_dfs_mem(s, t, mem, n, m)
    print(f"Changing {s} to {t} requires at least {res} edits")

    # البرمجة الديناميكية
    res = edit_distance_dp(s, t)
    print(f"Changing {s} to {t} requires at least {res} edits")

    # البرمجة الديناميكية مع تحسين المساحة
    res = edit_distance_dp_comp(s, t)
    print(f"Changing {s} to {t} requires at least {res} edits")
