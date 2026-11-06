"""
File: max_product_cutting.py
Created Time: 2023-07-21
Author: krahets (krahets@163.com)
"""

import math


def max_product_cutting(n: int) -> int:
    """Maximum product after splitting: greedy algorithm"""
    # عندما يكون n <= 3، فلا بد أن يكون أحد الأجزاء 1
    if n <= 3:
        return 1 * (n - 1)
    # قسّم جشعًا أجزاءً مقدارها 3؛ حيث a عدد الثلاثات و b الباقي
    a, b = n // 3, n % 3
    if b == 1:
        # عندما يكون الباقي 1، استبدل زوجًا 1 * 3 بـ 2 * 2
        return int(math.pow(3, a - 1)) * 2 * 2
    if b == 2:
        # عندما يكون الباقي 2، لا حاجة لأي تعديل
        return int(math.pow(3, a)) * 2
    # عندما يكون الباقي 0، لا حاجة لأي تعديل
    return int(math.pow(3, a))


"""Driver code"""
if __name__ == "__main__":
    n = 58

    # خوارزمية جشعة
    res = max_product_cutting(n)
    print(f"Maximum product after splitting: {res}")
