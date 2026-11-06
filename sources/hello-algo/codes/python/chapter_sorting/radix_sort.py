"""
File: radix_sort.py
Created Time: 2023-03-26
Author: krahets (krahets@163.com)
"""


def digit(num: int, exp: int) -> int:
    """الحصول على الرقم k من num، حيث exp = 10^(k-1)"""
    # تمرير exp بدل k يجني إجراء رفع الأس مكلفًا بشكل متكرر هنا
    return (num // exp) % 10


def counting_sort_digit(nums: list[int], exp: int):
    """الترتيب بالعدّ (ترتيب nums حسب الرقم k)"""
    # تتراوح الأرقام العشرية من 0 إلى 9، فتحتاج مصفوفة السلال إلى طول 10
    counter = [0] * 10
    n = len(nums)
    # عُد تكرارات كل رقم من 0 إلى 9
    for i in range(n):
        d = digit(nums[i], exp)  # احصل على الرقم k في nums[i] وخزّنه في d
        counter[d] += 1  # عُد تكرارات الرقم d
    # احسب مجاميع البادئة لتحوّل أعداد التكرارات إلى مواضع في المصفوفة
    for i in range(1, 10):
        counter[i] += counter[i - 1]
    # اجتز بالعكس وضع كل عنصر في res وفق أعداد السلال
    res = [0] * n
    for i in range(n - 1, -1, -1):
        d = digit(nums[i], exp)
        j = counter[d] - 1  # احصل على فهرس الوجهة j للرقم d في المصفوفة
        res[j] = nums[i]  # ضع العنصر الحالي في الفهرس j
        counter[d] -= 1  # أنقص عدّاد d بمقدار 1
    # اكتب النتيجة فوق المصفوفة الأصلية nums
    for i in range(n):
        nums[i] = res[i]


def radix_sort(nums: list[int]):
    """الترتيب الأساسي"""
    # احصل على أكبر عنصر في المصفوفة لتحديد العدد الأقصى من الأرقام
    m = max(nums)
    # عالج الأرقام من الأقل أهمية إلى الأهم
    exp = 1
    while exp <= m:
        # طبّق الترتيب بالعدّ على الرقم k في عناصر المصفوفة
        # k = 1 -> exp = 1
        # k = 2 -> exp = 10
        # أي أن exp = 10^(k-1)
        counting_sort_digit(nums, exp)
        exp *= 10


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # الترتيب الأساسي
    nums = [
        10546151,
        35663510,
        42865989,
        34862445,
        81883077,
        88906420,
        72429244,
        30524779,
        82060337,
        63832996,
    ]
    radix_sort(nums)
    print("After radix sort, nums =", nums)
