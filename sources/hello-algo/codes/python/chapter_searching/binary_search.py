"""
File: binary_search.py
Created Time: 2022-11-26
Author: timi (xisunyy@163.com)
"""


def binary_search(nums: list[int], target: int) -> int:
    """البحث الثنائي (مجال مغلق)"""
    # مهّد المجال المغلق [0, n-1]، حيث يشير i و j إلى أول عنصر وآخر عنصر
    i, j = 0, len(nums) - 1
    # حلّق حتى يصير مجال البحث فارغًا (عندما i > j)
    while i <= j:
        # يمكن للأعداد الصحيحة في Python النمو بحرية بقدر الذاكرة المتاحة، فلا شأن بفيض العدد الصحيح
        m = (i + j) // 2  # احسب فهرس نقطة المنتصف m
        if nums[m] < target:
            i = m + 1  # في هذه الحالة، لا بد أن يكون الهدف في [m+1, j] إن وُجد
        elif nums[m] > target:
            j = m - 1  # في هذه الحالة، لا بد أن يكون الهدف في [i, m-1] إن وُجد
        else:
            return m  # وُجد العنصر الهدف؛ أعد فهرسه
    return -1  # لم يُوجد العنصر الهدف؛ أعد -1


def binary_search_lcro(nums: list[int], target: int) -> int:
    """البحث الثنائي (مجال مغلق يسارًا مفتوح يمينًا)"""
    # مهّد المجال المغلق يسارًا المفتوح يمينًا [0, n)، حيث i عند أول عنصر و j بعد الأخير
    i, j = 0, len(nums)
    # حلّق حتى يصير مجال البحث فارغًا (عندما i = j)
    while i < j:
        m = (i + j) // 2  # احسب فهرس نقطة المنتصف m
        if nums[m] < target:
            i = m + 1  # في هذه الحالة، لا بد أن يكون الهدف في [m+1, j) إن وُجد
        elif nums[m] > target:
            j = m  # في هذه الحالة، لا بد أن يكون الهدف في [i, m) إن وُجد
        else:
            return m  # وُجد العنصر الهدف؛ أعد فهرسه
    return -1  # لم يُوجد العنصر الهدف؛ أعد -1


"""شيفرة تجريبية"""
if __name__ == "__main__":
    target = 6
    nums = [1, 3, 6, 8, 12, 15, 23, 26, 31, 35]

    # البحث الثنائي (مجال مغلق)
    index = binary_search(nums, target)
    print("Index of target element 6 = ", index)

    # البحث الثنائي (مجال مغلق يسارًا مفتوح يمينًا)
    index = binary_search_lcro(nums, target)
    print("Index of target element 6 = ", index)
