"""
File: list.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""

"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد القائمة
    nums: list[int] = [1, 3, 2, 5, 4]
    print("\nList nums =", nums)

    # وصول إلى عنصر
    x: int = nums[1]
    print("\nAccess the element at index 1, giving x =", x)

    # حدّث عنصرًا
    nums[1] = 0
    print("\nUpdate the element at index 1 to 0, giving nums =", nums)

    # امسح القائمة
    nums.clear()
    print("\nAfter clearing the list, nums =", nums)

    # ألحق عنصرًا في النهاية
    nums.append(1)
    nums.append(3)
    nums.append(2)
    nums.append(5)
    nums.append(4)
    print("\nAfter adding elements, nums =", nums)

    # أدخل عنصرًا في المنتصف
    nums.insert(3, 6)
    print("\nInsert the number 6 at index 3, giving nums =", nums)

    # احذف عنصرًا
    nums.pop(3)
    print("\nRemove the element at index 3, giving nums =", nums)

    # اجتز القائمة بالفهرس
    count = 0
    for i in range(len(nums)):
        count += nums[i]
    # تكرّر مباشرةً على عناصر القائمة
    for num in nums:
        count += num

    # اربط قائمتين
    nums1 = [6, 8, 7, 10, 9]
    nums += nums1
    print("\nAppend list nums1 to nums, giving nums =", nums)

    # رتّب القائمة
    nums.sort()
    print("\nAfter sorting the list, nums =", nums)
