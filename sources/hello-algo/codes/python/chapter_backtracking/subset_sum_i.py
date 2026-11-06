"""
File: subset_sum_i.py
Created Time: 2023-06-17
Author: krahets (krahets@163.com)
"""


def backtrack(
    state: list[int], target: int, choices: list[int], start: int, res: list[list[int]]
):
    """Backtracking: subset sum I"""
    # سجّل حلًا حين يصير الهدف المتبقي صفرًا
    if target == 0:
        res.append(list(state))
        return
    # تكرّر على كل الاختيارات
    # تشذيب 2: تكرّر من start تفاديًا لتوليد المجموعات الجزئية المكررة
    for i in range(start, len(choices)):
        # تشذيب 1: اخرج من الحلقة إذا تجاوز هذا الاختيار الهدف المتبقي
        # المصفوفة مرتبة، فالعناصر اللاحقة على الأقل بالقدر نفسه وستتجاوز الهدف المتبقي كذلك
        if target - choices[i] < 0:
            break
        # تجربة: اختر وحدّث الهدف وstart
        state.append(choices[i])
        # تابع إلى الاختيار التالي
        backtrack(state, target - choices[i], choices, i, res)
        # تراجع: ألغِ الاختيار وأعِد الحالة السابقة
        state.pop()


def subset_sum_i(nums: list[int], target: int) -> list[list[int]]:
    """Solve subset sum I"""
    state = []  # الحالة (المجموعة الجزئية)
    nums.sort()  # رتّب nums
    start = 0  # فهرس البدء للتكرار
    res = []  # قائمة النتائج (قائمة المجموعات الجزئية)
    backtrack(state, target, nums, start, res)
    return res


"""Driver code"""
if __name__ == "__main__":
    nums = [3, 4, 5]
    target = 9
    res = subset_sum_i(nums, target)

    print(f"Input array nums = {nums}, target = {target}")
    print(f"All subsets with sum {target}: res = {res}")
