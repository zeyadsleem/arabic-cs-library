"""
File: time_complexity.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""


def constant(n: int) -> int:
    """Constant complexity"""
    count = 0
    size = 100000
    for _ in range(size):
        count += 1
    return count


def linear(n: int) -> int:
    """Linear complexity"""
    count = 0
    for _ in range(n):
        count += 1
    return count


def array_traversal(nums: list[int]) -> int:
    """Linear complexity (array traversal)"""
    count = 0
    # عدد التكرارات يتناسب مع طول المصفوفة
    for num in nums:
        count += 1
    return count


def quadratic(n: int) -> int:
    """Quadratic complexity"""
    count = 0
    # عدد التكرارات يتناسب مع مربع حجم المُدخل n
    for i in range(n):
        for j in range(n):
            count += 1
    return count


def bubble_sort(nums: list[int]) -> int:
    """Quadratic complexity (bubble sort)"""
    count = 0  # العدّاد
    # الحلقة الخارجية: النطاق غير المرتب هو [0, i]
    for i in range(len(nums) - 1, 0, -1):
        # الحلقة الداخلية: انقل أكبر عنصر في النطاق غير المرتب [0, i] إلى نهايته اليمنى بالتبديل
        for j in range(i):
            if nums[j] > nums[j + 1]:
                # بدّل nums[j] و nums[j + 1]
                tmp: int = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = tmp
                count += 3  # تستغرق مبادلة عنصرين 3 عمليات ابتدائية
    return count


def exponential(n: int) -> int:
    """Exponential complexity (iterative implementation)"""
    count = 0
    base = 1
    # تنقسم كل خلية إلى اثنتين في كل جولة، فينتج التتابع 1، 2، 4، 8، ...، 2^(n-1)
    for _ in range(n):
        for _ in range(base):
            count += 1
        base *= 2
    # count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count


def exp_recur(n: int) -> int:
    """Exponential complexity (recursive implementation)"""
    if n == 1:
        return 1
    return exp_recur(n - 1) + exp_recur(n - 1) + 1


def logarithmic(n: int) -> int:
    """Logarithmic complexity (iterative implementation)"""
    count = 0
    while n > 1:
        n = n / 2
        count += 1
    return count


def log_recur(n: int) -> int:
    """Logarithmic complexity (recursive implementation)"""
    if n <= 1:
        return 0
    return log_recur(n / 2) + 1


def linear_log_recur(n: int) -> int:
    """Linearithmic complexity"""
    if n <= 1:
        return 1
    # قسّم إلى مسألتين جزئيتين كل واحدة نصف الحجم الأصلي
    count = linear_log_recur(n // 2) + linear_log_recur(n // 2)
    # تشمل المسألة الجزئية الحالية n عملية
    for _ in range(n):
        count += 1
    return count


def factorial_recur(n: int) -> int:
    """Factorial complexity (recursive implementation)"""
    if n == 0:
        return 1
    count = 0
    # قسّم مسألة واحدة إلى n مسألة جزئية
    for _ in range(n):
        count += factorial_recur(n - 1)
    return count


"""Driver code"""
if __name__ == "__main__":
    # جرّب قيمًا مختلفة من n لترَ كيف ينمو عدد العمليات لكل تعقيد
    n = 8
    print("Input size n =", n)

    count = constant(n)
    print("Operation count for constant complexity =", count)

    count = linear(n)
    print("Operation count for linear complexity =", count)
    count = array_traversal([0] * n)
    print("Operation count for linear complexity (array traversal) =", count)

    count = quadratic(n)
    print("Operation count for quadratic complexity =", count)
    nums = [i for i in range(n, 0, -1)]  # [n, n-1, ..., 2, 1]
    count = bubble_sort(nums)
    print("Operation count for quadratic complexity (bubble sort) =", count)

    count = exponential(n)
    print("Operation count for exponential complexity (iterative implementation) =", count)
    count = exp_recur(n)
    print("Operation count for exponential complexity (recursive implementation) =", count)

    count = logarithmic(n)
    print("Operation count for logarithmic complexity (iterative implementation) =", count)
    count = log_recur(n)
    print("Operation count for logarithmic complexity (recursive implementation) =", count)

    count = linear_log_recur(n)
    print("Operation count for linearithmic complexity (recursive implementation) =", count)

    count = factorial_recur(n)
    print("Operation count for factorial complexity (recursive implementation) =", count)
