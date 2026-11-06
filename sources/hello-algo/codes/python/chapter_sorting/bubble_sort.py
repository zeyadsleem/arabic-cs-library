"""
File: bubble_sort.py
Created Time: 2022-11-25
Author: timi (xisunyy@163.com)
"""


def bubble_sort(nums: list[int]):
    """الترتيب الفقاعي"""
    n = len(nums)
    # الحلقة الخارجية: النطاق غير المرتب هو [0, i]
    for i in range(n - 1, 0, -1):
        # الحلقة الداخلية: انقل أكبر عنصر في النطاق غير المرتب [0, i] إلى نهايته اليمنى بالتبديل
        for j in range(i):
            if nums[j] > nums[j + 1]:
                # بدّل nums[j] و nums[j + 1]
                nums[j], nums[j + 1] = nums[j + 1], nums[j]


def bubble_sort_with_flag(nums: list[int]):
    """الترتيب الفقاعي (تحسين العلم)"""
    n = len(nums)
    # الحلقة الخارجية: النطاق غير المرتب هو [0, i]
    for i in range(n - 1, 0, -1):
        flag = False  # مهّد العلم
        # الحلقة الداخلية: انقل أكبر عنصر في النطاق غير المرتب [0, i] إلى نهايته اليمنى بالتبديل
        for j in range(i):
            if nums[j] > nums[j + 1]:
                # بدّل nums[j] و nums[j + 1]
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                flag = True  # سجّل حدوث تبديل
        if not flag:
            break  # اخرج فورًا إذا لم تجري هذه الجولة أي تبديل


"""شيفرة تجريبية"""
if __name__ == "__main__":
    nums = [4, 1, 3, 1, 5, 2]
    bubble_sort(nums)
    print("After bubble sort, array =", nums)

    nums1 = [4, 1, 3, 1, 5, 2]
    bubble_sort_with_flag(nums1)
    print("After bubble sort, array =", nums1)
