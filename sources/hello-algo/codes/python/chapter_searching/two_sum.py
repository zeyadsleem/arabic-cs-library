"""
File: two_sum.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""


def two_sum_brute_force(nums: list[int], target: int) -> list[int]:
    """الطريقة 1: التعداد بالقوة الغاشمة"""
    # حلقتان متداخلتان تعطيان تعقيدًا زمنيًا O(n^2)
    for i in range(len(nums) - 1):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []


def two_sum_hash_table(nums: list[int], target: int) -> list[int]:
    """الطريقة 2: جدول تجزئة مساعد"""
    # جدول التجزئة المساعد يستخدم مساحة O(n)
    dic = {}
    # حلقة واحدة بعمليات تجزئة متوسطة O(1) تعطي تعقيدًا زمنيًا متوسطًا O(n)
    for i in range(len(nums)):
        if target - nums[i] in dic:
            return [dic[target - nums[i]], i]
        dic[nums[i]] = i
    return []


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # ======= حالة اختبار =======
    nums = [2, 7, 11, 15]
    target = 13

    # ====== شيفرة تجريبية ======
    # الطريقة 1
    res: list[int] = two_sum_brute_force(nums, target)
    print("Method 1: res =", res)
    # الطريقة 2
    res: list[int] = two_sum_hash_table(nums, target)
    print("Method 2: res =", res)
