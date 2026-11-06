"""
File: counting_sort.py
Created Time: 2023-03-21
Author: krahets (krahets@163.com)
"""


def counting_sort_naive(nums: list[int]):
    """Counting sort"""
    # تنفيذ بسيط؛ لا يمكن استخدامه لترتيب الكائنات
    # 1. أوجد أكبر عنصر في المصفوفة m
    m = max(nums)
    # 2. عُد تكرارات كل عدد
    # يمثل counter[num] عدد تكرارات num
    counter = [0] * (m + 1)
    for num in nums:
        counter[num] += 1
    # 3. اجتز counter واملأ المصفوفة الأصلية nums بالعناصر
    i = 0
    for num in range(m + 1):
        for _ in range(counter[num]):
            nums[i] = num
            i += 1


def counting_sort(nums: list[int]):
    """Counting sort"""
    # تنفيذ كامل؛ مستقر وقابل للتكيف لترتيب الكائنات
    # 1. أوجد أكبر عنصر في المصفوفة m
    m = max(nums)
    # 2. عُد تكرارات كل عدد
    # يمثل counter[num] عدد تكرارات num
    counter = [0] * (m + 1)
    for num in nums:
        counter[num] += 1
    # 3. احسب مجاميع البادئة لـ counter لتحوّل أعداد التكرارات إلى مواضع نهاية
    # أي أن counter[num]-1 هو فهرس آخر تكرار لـ num في res
    for i in range(m):
        counter[i + 1] += counter[i]
    # 4. اجتز nums بالعكس وضع كل عنصر في مصفوفة النتيجة res
    # مهّد المصفوفة res لتخزين النتيجة
    n = len(nums)
    res = [0] * n
    for i in range(n - 1, -1, -1):
        num = nums[i]
        res[counter[num] - 1] = num  # ضع num في الفهرس المقابل
        counter[num] -= 1  # أنقص مجموع البادئة بمقدار 1 لتحديد موضع وضع التكرار التالي لـ num
    # اكتب مصفوفة النتيجة res فوق المصفوفة الأصلية nums
    for i in range(n):
        nums[i] = res[i]


"""Driver code"""
if __name__ == "__main__":
    nums = [1, 0, 1, 2, 0, 4, 0, 2, 2, 4]

    counting_sort_naive(nums)
    print(f"After counting sort (without support for objects), nums = {nums}")

    nums1 = [1, 0, 1, 2, 0, 4, 0, 2, 2, 4]
    counting_sort(nums1)
    print(f"After counting sort, nums1 = {nums1}")
