"""
File: binary_search_insertion.py
Created Time: 2023-08-04
Author: krahets (krahets@163.com)
"""


def binary_search_insertion_simple(nums: list[int], target: int) -> int:
    """Find an insertion point using binary search (no duplicates)"""
    i, j = 0, len(nums) - 1  # مهّد المجال المغلق [0, n-1]
    while i <= j:
        m = (i + j) // 2  # احسب فهرس نقطة المنتصف m
        if nums[m] < target:
            i = m + 1  # لا بد أن يكون الهدف في [m+1, j] إن وُجد
        elif nums[m] > target:
            j = m - 1  # لا بد أن يكون الهدف في [i, m-1] إن وُجد
        else:
            return m  # وُجد الهدف؛ أعد نقطة الإدراج m
    # لم يُوجد الهدف؛ أعد نقطة الإدراج i
    return i


def binary_search_insertion(nums: list[int], target: int) -> int:
    """Find an insertion point using binary search (with duplicates)"""
    i, j = 0, len(nums) - 1  # مهّد المجال المغلق [0, n-1]
    while i <= j:
        m = (i + j) // 2  # احسب فهرس نقطة المنتصف m
        if nums[m] < target:
            i = m + 1  # لا بد أن يكون الهدف في [m+1, j] إن وُجد
        elif nums[m] > target:
            j = m - 1  # لا بد أن يكون الهدف في [i, m-1] إن وُجد
        else:
            j = m - 1  # تابع في [i, m-1] لإيجاد أقصى يمين عنصر أصغر من target
    # أعد نقطة الإدراج i
    return i


"""Driver code"""
if __name__ == "__main__":
    # مصفوفة بلا عناصر مكررة
    nums = [1, 3, 6, 8, 12, 15, 23, 26, 31, 35]
    print(f"\nArray nums = {nums}")
    # أوجد نقطة إدراج بالبحث الثنائي
    for target in [6, 9]:
        index = binary_search_insertion_simple(nums, target)
        print(f"Insertion index for element {target}: {index}")

    # مصفوفة تحوي عناصر مكررة
    nums = [1, 3, 6, 6, 6, 6, 6, 10, 12, 15]
    print(f"\nArray nums = {nums}")
    # أوجد نقطة إدراج بالبحث الثنائي
    for target in [2, 6, 20]:
        index = binary_search_insertion(nums, target)
        print(f"Insertion index for element {target}: {index}")
