"""
File: climbing_stairs_dfs_mem.py
Created Time: 2023-06-30
Author: krahets (krahets@163.com)
"""


def dfs(i: int, mem: list[int]) -> int:
    """بحث بتخزين الحلول (memoization)"""
    # قيم dp[1] و dp[2] معلومة؛ أعد القيمة المقابلة
    if i == 1 or i == 2:
        return i
    # إذا كان dp[i] مسجلًا فأعده مباشرةً
    if mem[i] != -1:
        return mem[i]
    # dp[i] = dp[i-1] + dp[i-2]
    count = dfs(i - 1, mem) + dfs(i - 2, mem)
    # سجّل dp[i]
    mem[i] = count
    return count


def climbing_stairs_dfs_mem(n: int) -> int:
    """صعود الدرج: البحث بتخزين الحلول"""
    # يخزّن mem[i] عدد الطرق للوصول إلى الدرج i؛ ويعني -1 أنه لم تُسجل نتيجة
    mem = [-1] * (n + 1)
    return dfs(n, mem)


"""شيفرة تجريبية"""
if __name__ == "__main__":
    n = 9

    res = climbing_stairs_dfs_mem(n)
    print(f"Number of ways to climb {n} stairs: {res}")
