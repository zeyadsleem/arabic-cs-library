"""
File: worst_best_time_complexity.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""

import random


def random_numbers(n: int) -> list[int]:
    """ولّد مصفوفة تحوي 1، 2، ...، n بترتيب مخلوط"""
    # ولّد المصفوفة nums = 1، 2، 3، ...، n
    nums = [i for i in range(1, n + 1)]
    # خلط عناصر المصفوفة عشوائيًا
    random.shuffle(nums)
    return nums


def find_one(nums: list[int]) -> int:
    """العثور على فهرس العدد 1 في المصفوفة nums"""
    for i in range(len(nums)):
        # عندما يكون 1 في بداية المصفوفة، يكون التعقيد الزمني في أفضل الحالات O(1)
        # عندما يكون 1 في نهاية المصفوفة، يكون التعقيد الزمني في أسوأ الحالات O(n)
        if nums[i] == 1:
            return i
    return -1


"""شيفرة تجريبية"""
if __name__ == "__main__":
    for i in range(10):
        n = 100
        nums: list[int] = random_numbers(n)
        index: int = find_one(nums)
        print("\nArray [ 1, 2, ..., n ] after shuffling =", nums)
        print("The index of the number 1 is", index)
