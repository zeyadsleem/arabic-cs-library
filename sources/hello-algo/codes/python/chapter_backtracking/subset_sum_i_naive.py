"""
File: subset_sum_i_naive.py
Created Time: 2023-06-17
Author: krahets (krahets@163.com)
"""


def backtrack(
    state: list[int],
    target: int,
    total: int,
    choices: list[int],
    res: list[list[int]],
):
    """التتبع الرجعي: مجموع المجموعة الجزئية I"""
    # سجّل حلًا حين يساوي مجموع المجموعة الجزئية الهدف
    if total == target:
        res.append(list(state))
        return
    # تكرّر على كل الاختيارات
    for i in range(len(choices)):
        # تشذيب: تخطَّ هذا الاختيار إذا كان سيجعل مجموع المجموعة الجزئية يتجاوز الهدف
        if total + choices[i] > target:
            continue
        # تجربة: اختر وحدّث حاصل الجمع
        state.append(choices[i])
        # تابع إلى الاختيار التالي
        backtrack(state, target, total + choices[i], choices, res)
        # تراجع: ألغِ الاختيار وأعِد الحالة السابقة
        state.pop()


def subset_sum_i_naive(nums: list[int], target: int) -> list[list[int]]:
    """حل مجموع المجموعات الجزئية I (مع مجموعات جزئية مكررة)"""
    state = []  # الحالة (المجموعة الجزئية)
    total = 0  # مجموع المجموعة الجزئية
    res = []  # قائمة النتائج (قائمة المجموعات الجزئية)
    backtrack(state, target, total, nums, res)
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    nums = [3, 4, 5]
    target = 9
    res = subset_sum_i_naive(nums, target)

    print(f"Input array nums = {nums}, target = {target}")
    print(f"All subsets with sum {target}: res = {res}")
    print(f"Note that this method produces duplicate subsets")
