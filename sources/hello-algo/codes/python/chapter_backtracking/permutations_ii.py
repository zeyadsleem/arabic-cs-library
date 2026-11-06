"""
File: permutations_ii.py
Created Time: 2023-04-15
Author: krahets (krahets@163.com)
"""


def backtrack(
    state: list[int], choices: list[int], selected: list[bool], res: list[list[int]]
):
    """التتبع الرجعي: التباديل II"""
    # سجّل حلًا حين يساوي طول الحالة عدد العناصر
    if len(state) == len(choices):
        res.append(list(state))
        return
    # تكرّر على كل الاختيارات
    duplicated = set[int]()
    for i, choice in enumerate(choices):
        # تشذيب: لا تعِد استخدام عنصر ولا تختر القيمة نفسها مجددًا في هذا العمق
        if not selected[i] and choice not in duplicated:
            # تجربة: اختر وحدّث الحالة
            duplicated.add(choice)  # سجّل القيمة المختارة
            selected[i] = True
            state.append(choice)
            # تابع إلى الاختيار التالي
            backtrack(state, choices, selected, res)
            # تراجع: ألغِ الاختيار وأعِد الحالة السابقة
            selected[i] = False
            state.pop()


def permutations_ii(nums: list[int]) -> list[list[int]]:
    """التباديل II"""
    res = []
    backtrack(state=[], choices=nums, selected=[False] * len(nums), res=res)
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    nums = [1, 2, 2]

    res = permutations_ii(nums)

    print(f"Input array nums = {nums}")
    print(f"All permutations: res = {res}")
