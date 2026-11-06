"""
File: merge_sort.py
Created Time: 2022-11-25
Author: timi (xisunyy@163.com), krahets (krahets@163.com)
"""


def merge(nums: list[int], left: int, mid: int, right: int):
    """Merge the left and right subarrays"""
    # يشمل المصفوفة الجزئية اليسرى [left, mid]، واليمنى [mid+1, right]
    # أنشئ مصفوفة مؤقتة tmp لتخزين نتيجة الدمج
    tmp = [0] * (right - left + 1)
    # مهّد فهرسي البداية للمصفوفتين الجزئيتين اليسرى واليمنى
    i, j, k = left, mid + 1, 0
    # طالما بقيت عناصر في المصفوفتين الجزئيتين، قارنهما وانسخ الأصغر إلى المصفوفة المؤقتة
    while i <= mid and j <= right:
        if nums[i] <= nums[j]:
            tmp[k] = nums[i]
            i += 1
        else:
            tmp[k] = nums[j]
            j += 1
        k += 1
    # انسخ عناصر المصفوفتين الجزئيتين اليسرى واليمنى الباقية إلى المصفوفة المؤقتة
    while i <= mid:
        tmp[k] = nums[i]
        i += 1
        k += 1
    while j <= right:
        tmp[k] = nums[j]
        j += 1
        k += 1
    # انسخ عناصر المصفوفة المؤقتة tmp عودةً إلى المجال المقابل في المصفوفة الأصلية nums
    for k in range(0, len(tmp)):
        nums[left + k] = tmp[k]


def merge_sort(nums: list[int], left: int, right: int):
    """Merge sort"""
    # الحالة الأساس
    if left >= right:
        return  # توقف عن التعاود عندما تحوي المصفوفة الجزئية عنصرًا واحدًا على الأكثر
    # مرحلة التقسيم
    mid = (left + right) // 2 # احسب نقطة المنتصف
    merge_sort(nums, left, mid)  # تعاود على المصفوفة الجزئية اليسرى
    merge_sort(nums, mid + 1, right)  # تعاود على المصفوفة الجزئية اليمنى
    # مرحلة الدمج
    merge(nums, left, mid, right)


"""Driver code"""
if __name__ == "__main__":
    nums = [7, 3, 2, 6, 0, 1, 5, 4]
    merge_sort(nums, 0, len(nums) - 1)
    print("After merge sort, nums =", nums)
