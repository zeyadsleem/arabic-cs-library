"""
File: permutations_i.py
Created Time: 2023-04-15
Author: krahets (krahets@163.com)
"""


def backtrack(
    state: list[int], choices: list[int], selected: list[bool], res: list[list[int]]
):
    """التتبع الرجعي: التباديل I"""
    # سجّل حلًا حين يساوي طول الحالة عدد العناصر
    if len(state) == len(choices):
        res.append(list(state))
        return
    # تكرّر على كل الاختيارات
    for i, choice in enumerate(choices):
        # تشذيب: لا تختر عنصرًا أكثر من مرة
        if not selected[i]:
            # تجربة: اختر وحدّث الحالة
            selected[i] = True
            state.append(choice)
            # تابع إلى الاختيار التالي
            backtrack(state, choices, selected, res)
            # تراجع: ألغِ الاختيار وأعِد الحالة السابقة
            selected[i] = False
            state.pop()


def permutations_i(nums: list[int]) -> list[list[int]]:
    """التباديل I"""
    res = []
    backtrack(state=[], choices=nums, selected=[False] * len(nums), res=res)
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    nums = [1, 2, 3]

    res = permutations_i(nums)

    print(f"Input array nums = {nums}")
    print(f"All permutations: res = {res}")
