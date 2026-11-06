"""
File: heap_sort.py
Created Time: 2023-05-24
Author: krahets (krahets@163.com)
"""


def sift_down(nums: list[int], n: int, i: int):
    """الرشّ النازل من العقدة i في كومة حجمها n"""
    while True:
        # أوجد العقدة ذات القيمة الأكبر بين i و l و r، وخزّن فهرسها في ma
        l = 2 * i + 1
        r = 2 * i + 2
        ma = i
        if l < n and nums[l] > nums[ma]:
            ma = l
        if r < n and nums[r] > nums[ma]:
            ma = r
        # توقف إذا كانت العقدة i هي الأكبر أو خرج فهرسا الابنين l و r كلاهما عن الحدود
        if ma == i:
            break
        # بدّل العقدتين
        nums[i], nums[ma] = nums[ma], nums[i]
        # واصل الرشّ نزولًا
        i = ma


def heap_sort(nums: list[int]):
    """الترتيب بالكومة"""
    # ابنِ الكومة بالرشّ النازل من كل عقدة غير ورقية
    for i in range(len(nums) // 2 - 1, -1, -1):
        sift_down(nums, len(nums), i)
    # استخرج أكبر عنصر من الكومة، متكررًا لمدة n-1 جولة
    for i in range(len(nums) - 1, 0, -1):
        # بدّل الجذر مع الورقة الأقصى يمينًا في آخر مستوى (أول عنصر وآخر عنصر في الكومة الحالية)
        nums[0], nums[i] = nums[i], nums[0]
        # رشّ نازلًا بدءًا من الجذر
        sift_down(nums, i, 0)


"""شيفرة تجريبية"""
if __name__ == "__main__":
    nums = [4, 1, 3, 1, 5, 2]
    heap_sort(nums)
    print("After heap sort, nums =", nums)
