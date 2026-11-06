"""
File: bucket_sort.py
Created Time: 2023-03-30
Author: krahets (krahets@163.com)
"""


def bucket_sort(nums: list[float]):
    """Bucket sort"""
    # مهّد k = n/2 سلة، متوقعًا 2 عنصر لكل سلة
    k = len(nums) // 2
    buckets = [[] for _ in range(k)]
    # 1. وزّع عناصر المصفوفة على السلال
    for num in nums:
        # نطاق المُدخل هو [0, 1)؛ استخدم num * k لربط كل قيمة بفهرس في [0, k-1]
        i = int(num * k)
        # أضف num إلى السلة i
        buckets[i].append(num)
    # 2. رتّب كل سلة
    for bucket in buckets:
        # استخدم دالة الترتيب المدمجة، أو استبدلها بخوارزمية ترتيب أخرى
        bucket.sort()
    # 3. اجتز السلال لدمج النتائج
    i = 0
    for bucket in buckets:
        for num in bucket:
            nums[i] = num
            i += 1


if __name__ == "__main__":
    # افترض أن المُدخل يتكون من أعداد عشرية في [0, 1)
    nums = [0.49, 0.96, 0.82, 0.09, 0.57, 0.43, 0.91, 0.75, 0.15, 0.37]
    bucket_sort(nums)
    print("After bucket sort, nums =", nums)
