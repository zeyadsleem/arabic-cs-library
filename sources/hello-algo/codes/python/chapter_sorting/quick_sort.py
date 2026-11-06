"""
File: quick_sort.py
Created Time: 2022-11-25
Author: timi (xisunyy@163.com)
"""


class QuickSort:
    """صنف الترتيب السريع"""

    def partition(self, nums: list[int], left: int, right: int) -> int:
        """التقسيم بمؤشرين"""
        # استخدم nums[left] بوصفه محورًا
        i, j = left, right
        while i < j:
            while i < j and nums[j] >= nums[left]:
                j -= 1  # امسح من اليمين إلى اليسار لأول عنصر أصغر من المحور
            while i < j and nums[i] <= nums[left]:
                i += 1  # امسح من اليسار إلى اليمين لأول عنصر أكبر من المحور
            # بدّل العنصرين
            nums[i], nums[j] = nums[j], nums[i]
        # بدّل المحور إلى موضع الحد بين المصفوفتين الجزئيتين
        nums[i], nums[left] = nums[left], nums[i]
        return i  # أعد فهرس المحور

    def quick_sort(self, nums: list[int], left: int, right: int):
        """الترتيب السريع"""
        # توقف عن التعاود عندما تحوي المصفوفة الجزئية عنصرًا واحدًا على الأكثر
        if left >= right:
            return
        # التقسيم بمؤشرين
        pivot = self.partition(nums, left, right)
        # تعاود على المصفوفتين الجزئيتين اليسرى واليمنى
        self.quick_sort(nums, left, pivot - 1)
        self.quick_sort(nums, pivot + 1, right)


class QuickSortMedian:
    """صنف الترتيب السريع (تحسين محور الوسيط)"""

    def median_three(self, nums: list[int], left: int, mid: int, right: int) -> int:
        """اختيار وسيط ثلاثة عناصر مرشحة"""
        l, m, r = nums[left], nums[mid], nums[right]
        if (l <= m <= r) or (r <= m <= l):
            return mid  # يقع m بين l و r
        if (m <= l <= r) or (r <= l <= m):
            return left  # يقع l بين m و r
        return right

    def partition(self, nums: list[int], left: int, right: int) -> int:
        """التقسيم بمؤشرين (وسيط الثلاثة)"""
        # اختر وسيط أول عنصر ووسطه وآخره بوصفه محورًا
        med = self.median_three(nums, left, (left + right) // 2, right)
        # بدّل الوسيط إلى أقصى يسار المصفوفة الجزئية الحالية
        nums[left], nums[med] = nums[med], nums[left]
        # استخدم nums[left] بوصفه محورًا
        i, j = left, right
        while i < j:
            while i < j and nums[j] >= nums[left]:
                j -= 1  # امسح من اليمين إلى اليسار لأول عنصر أصغر من المحور
            while i < j and nums[i] <= nums[left]:
                i += 1  # امسح من اليسار إلى اليمين لأول عنصر أكبر من المحور
            # بدّل العنصرين
            nums[i], nums[j] = nums[j], nums[i]
        # بدّل المحور إلى موضع الحد بين المصفوفتين الجزئيتين
        nums[i], nums[left] = nums[left], nums[i]
        return i  # أعد فهرس المحور

    def quick_sort(self, nums: list[int], left: int, right: int):
        """الترتيب السريع"""
        # توقف عن التعاود عندما تحوي المصفوفة الجزئية عنصرًا واحدًا على الأكثر
        if left >= right:
            return
        # التقسيم بمؤشرين
        pivot = self.partition(nums, left, right)
        # تعاود على المصفوفتين الجزئيتين اليسرى واليمنى
        self.quick_sort(nums, left, pivot - 1)
        self.quick_sort(nums, pivot + 1, right)


class QuickSortTailCall:
    """صنف الترتيب السريع (تحسين عمق التعاود)"""

    def partition(self, nums: list[int], left: int, right: int) -> int:
        """التقسيم بمؤشرين"""
        # استخدم nums[left] بوصفه محورًا
        i, j = left, right
        while i < j:
            while i < j and nums[j] >= nums[left]:
                j -= 1  # امسح من اليمين إلى اليسار لأول عنصر أصغر من المحور
            while i < j and nums[i] <= nums[left]:
                i += 1  # امسح من اليسار إلى اليمين لأول عنصر أكبر من المحور
            # بدّل العنصرين
            nums[i], nums[j] = nums[j], nums[i]
        # بدّل المحور إلى موضع الحد بين المصفوفتين الجزئيتين
        nums[i], nums[left] = nums[left], nums[i]
        return i  # أعد فهرس المحور

    def quick_sort(self, nums: list[int], left: int, right: int):
        """الترتيب السريع (تحسين عمق التعاود)"""
        # توقف عندما تحوي المصفوفة الجزئية عنصرًا واحدًا على الأكثر
        while left < right:
            # أجرِ التقسيم بمؤشرين
            pivot = self.partition(nums, left, right)
            # طبّق الترتيب السريع على أقصر المصفوفتين الجزئيتين
            if pivot - left < right - pivot:
                self.quick_sort(nums, left, pivot - 1)  # رتّب المصفوفة الجزئية اليسرى تعاوديًا
                left = pivot + 1  # النطاق غير المرتب المتبقي هو [pivot + 1, right]
            else:
                self.quick_sort(nums, pivot + 1, right)  # رتّب المصفوفة الجزئية اليمنى تعاوديًا
                right = pivot - 1  # النطاق غير المرتب المتبقي هو [left, pivot - 1]


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # الترتيب السريع
    nums = [2, 4, 1, 0, 3, 5]
    QuickSort().quick_sort(nums, 0, len(nums) - 1)
    print("After quick sort, nums =", nums)

    # الترتيب السريع (تحسين محور الوسيط)
    nums1 = [2, 4, 1, 0, 3, 5]
    QuickSortMedian().quick_sort(nums1, 0, len(nums1) - 1)
    print("After quick sort (median pivot optimization), nums1 =", nums1)

    # الترتيب السريع (تحسين عمق التعاود)
    nums2 = [2, 4, 1, 0, 3, 5]
    QuickSortTailCall().quick_sort(nums2, 0, len(nums2) - 1)
    print("After quick sort (recursion depth optimization), nums2 =", nums2)
