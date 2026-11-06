"""
File: binary_search_recur.py
Created Time: 2023-07-17
Author: krahets (krahets@163.com)
"""


def dfs(nums: list[int], target: int, i: int, j: int) -> int:
    """البحث الثنائي: المسألة f(i, j)"""
    # إذا كان المجال فارغًا فالهدف غائب؛ أعد -1
    if i > j:
        return -1
    # احسب فهرس نقطة المنتصف m
    m = (i + j) // 2
    if nums[m] < target:
        # تعاود على المسألة الجزئية f(m+1, j)
        return dfs(nums, target, m + 1, j)
    elif nums[m] > target:
        # تعاود على المسألة الجزئية f(i, m-1)
        return dfs(nums, target, i, m - 1)
    else:
        # وُجد العنصر الهدف؛ أعد فهرسه
        return m


def binary_search(nums: list[int], target: int) -> int:
    """البحث الثنائي"""
    n = len(nums)
    # حُلّ المسألة f(0, n-1)
    return dfs(nums, target, 0, n - 1)


"""شيفرة تجريبية"""
if __name__ == "__main__":
    target = 6
    nums = [1, 3, 6, 8, 12, 15, 23, 26, 31, 35]

    # البحث الثنائي (مجال مغلق)
    index = binary_search(nums, target)
    print("Index of target element 6 = ", index)
