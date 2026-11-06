"""
File: insertion_sort.py
Created Time: 2022-11-25
Author: timi (xisunyy@163.com)
"""


def insertion_sort(nums: list[int]):
    """الترتيب بالإدراج"""
    # الحلقة الخارجية: النطاق المرتب هو [0, i-1]
    for i in range(1, len(nums)):
        base = nums[i]
        j = i - 1
        # الحلقة الداخلية: أدخل base في الموضع الصحيح في النطاق المرتب [0, i-1]
        while j >= 0 and nums[j] > base:
            nums[j + 1] = nums[j]  # أزح nums[j] موضعًا واحدًا إلى اليمين
            j -= 1
        nums[j + 1] = base  # ضع base في الموضع الصحيح


"""شيفرة تجريبية"""
if __name__ == "__main__":
    nums = [4, 1, 3, 1, 5, 2]
    insertion_sort(nums)
    print("After insertion sort, nums =", nums)
