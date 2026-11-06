"""
File: fractional_knapsack.py
Created Time: 2023-07-19
Author: krahets (krahets@163.com)
"""


class Item:
    """العنصر"""

    def __init__(self, w: int, v: int):
        self.w = w  # وزن العنصر
        self.v = v  # قيمة العنصر


def fractional_knapsack(wgt: list[int], val: list[int], cap: int) -> int:
    """الحقيبة الجزئية: خوارزمية جشعة"""
    # أنشئ قائمة عناصر، لكل منها خاصيتان: وزن وقيمة
    items = [Item(w, v) for w, v in zip(wgt, val)]
    # رتّب بالقيمة لكل وحدة وزن item.v / item.w بترتيب تنازلي
    items.sort(key=lambda item: item.v / item.w, reverse=True)
    # كرّر الاختيارات الجشعة
    res = 0
    for item in items:
        if item.w <= cap:
            # إذا بقيت سعة كافية، ضع العنصر الحالي كله في الحقيبة
            res += item.v
            cap -= item.w
        else:
            # إذا لم تكفِ السعة المتبقية، ضع جزءًا من العنصر الحالي في الحقيبة
            res += (item.v / item.w) * cap
            # لم تبق سعة، فاخرج من الحلقة
            break
    return res


"""شيفرة تجريبية"""
if __name__ == "__main__":
    wgt = [10, 20, 30, 40, 50]
    val = [50, 120, 150, 210, 240]
    cap = 50
    n = len(wgt)

    # خوارزمية جشعة
    res = fractional_knapsack(wgt, val, cap)
    print(f"Maximum total value within the knapsack capacity: {res}")
