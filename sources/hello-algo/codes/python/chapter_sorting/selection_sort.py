"""
File: selection_sort.py
Created Time: 2023-05-22
Author: krahets (krahets@163.com)
"""


def selection_sort(nums: list[int]):
    """Selection sort"""
    n = len(nums)
    # الحلقة الخارجية: النطاق غير المرتب هو [i, n-1]
    for i in range(n - 1):
        # الحلقة الداخلية: أوجد أصغر عنصر في النطاق غير المرتب
        k = i
        for j in range(i + 1, n):
            if nums[j] < nums[k]:
                k = j  # سجّل فهرس أصغر عنصر
        # بدّل أصغر عنصر مع أول عنصر في النطاق غير المرتب
        nums[i], nums[k] = nums[k], nums[i]


"""Driver code"""
if __name__ == "__main__":
    nums = [4, 1, 3, 1, 5, 2]
    selection_sort(nums)
    print("After selection sort, nums =", nums)
