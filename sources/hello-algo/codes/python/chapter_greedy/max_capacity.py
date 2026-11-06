"""
File: max_capacity.py
Created Time: 2023-07-21
Author: krahets (krahets@163.com)
"""


def max_capacity(ht: list[int]) -> int:
    """Maximum container capacity: greedy algorithm"""
    # مهّد i و j عند طرفي المصفوفة المتقابلين
    i, j = 0, len(ht) - 1
    # السعة القصوى الابتدائية هي 0
    res = 0
    # كرّر الاختيارات الجشعة حتى يلتقي الجانبان
    while i < j:
        # حدّث السعة القصوى
        cap = min(ht[i], ht[j]) * (j - i)
        res = max(res, cap)
        # حرّك الجانب الأقصر إلى الداخل
        if ht[i] < ht[j]:
            i += 1
        else:
            j -= 1
    return res


"""Driver code"""
if __name__ == "__main__":
    ht = [3, 8, 5, 2, 7, 7, 3, 4]

    # خوارزمية جشعة
    res = max_capacity(ht)
    print(f"Maximum capacity: {res}")
