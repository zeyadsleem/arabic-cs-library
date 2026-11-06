"""
File: array.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""

import random


def random_access(nums: list[int]) -> int:
    """وصول إلى عنصر عند فهرس عشوائي"""
    # اختر عددًا عشوائيًا في النطاق [0, len(nums)-1]
    random_index = random.randint(0, len(nums) - 1)
    # احصل على العنصر المختار عشوائيًا وأعده
    random_num = nums[random_index]
    return random_num


# لاحظ أن قائمة Python مصفوفة ديناميكية يمكن مدّها مباشرةً
# لأغراض التعلم، تعامل هذه الدالة مع القائمة بوصفها مصفوفة ثابتة الطول
def extend(nums: list[int], enlarge: int) -> list[int]:
    """مدّ طول المصفوفة"""
    # مهّد مصفوفة بالطول الممدود
    res = [0] * (len(nums) + enlarge)
    # انسخ كل العناصر من المصفوفة الأصلية إلى المصفوفة الجديدة
    for i in range(len(nums)):
        res[i] = nums[i]
    # أعد المصفوفة الجديدة الممدودة
    return res


def insert(nums: list[int], num: int, index: int):
    """إدراج العنصر num عند الفهرس `index` في المصفوفة"""
    # أزح كل العناصر من الفهرس `index` وما بعده موضعًا واحدًا إلى اليمين
    for i in range(len(nums) - 1, index, -1):
        nums[i] = nums[i - 1]
    # أسند num إلى العنصر عند الفهرس `index`
    nums[index] = num


def remove(nums: list[int], index: int):
    """حذف العنصر عند الفهرس `index`"""
    # أزح كل العناصر بعد الفهرس `index` موضعًا واحدًا إلى اليسار
    for i in range(index, len(nums) - 1):
        nums[i] = nums[i + 1]


def traverse(nums: list[int]):
    """اجتز المصفوفة"""
    count = 0
    # اجتز المصفوفة بالفهرس
    for i in range(len(nums)):
        count += nums[i]
    # تكرّر مباشرةً على عناصر المصفوفة
    for num in nums:
        count += num
    # تكرّر على الفهارس والعناصر معًا
    for i, num in enumerate(nums):
        count += nums[i]
        count += num


def find(nums: list[int], target: int) -> int:
    """البحث عن عنصر محدد في المصفوفة"""
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد المصفوفة
    arr = [0] * 5
    print("Array arr =", arr)
    nums = [1, 3, 2, 5, 4]
    print("Array nums =", nums)

    # وصول عشوائي
    random_num: int = random_access(nums)
    print("Randomly selected element from nums:", random_num)

    # مدّد الطول
    nums: list[int] = extend(nums, 3)
    print("Extend the array length to 8, giving nums =", nums)

    # أدخل عنصرًا
    insert(nums, 6, 3)
    print("Insert the number 6 at index 3, giving nums =", nums)

    # احذف عنصرًا
    remove(nums, 2)
    print("Remove the element at index 2, giving nums =", nums)

    # اجتز المصفوفة
    traverse(nums)

    # ابحث عن عنصر
    index: int = find(nums, 3)
    print("Find element 3 in nums, giving index =", index)
