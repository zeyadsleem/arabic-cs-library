"""
File: my_list.py
Created Time: 2022-11-25
Author: krahets (krahets@163.com)
"""


class MyList:
    """صنف القائمة"""

    def __init__(self):
        """المنشئ"""
        self._capacity: int = 10  # سعة القائمة
        self._arr: list[int] = [0] * self._capacity  # المصفوفة (تخزن عناصر القائمة)
        self._size: int = 0  # طول القائمة (عدد العناصر الحالي)
        self._extend_ratio: int = 2  # معامل نمو سعة القائمة في كل مرة

    def size(self) -> int:
        """الحصول على طول القائمة (عدد العناصر الحالي)"""
        return self._size

    def capacity(self) -> int:
        """الحصول على سعة القائمة"""
        return self._capacity

    def get(self, index: int) -> int:
        """وصول إلى عنصر"""
        # أطلق استثناء إذا خرج الفهرس عن الحدود؛ وينطبق الأمر نفسه فيما يلي
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        return self._arr[index]

    def set(self, num: int, index: int):
        """حدّث عنصرًا"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        self._arr[index] = num

    def add(self, num: int):
        """ألحق عنصرًا في النهاية"""
        # زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها
        if self.size() == self.capacity():
            self.extend_capacity()
        self._arr[self._size] = num
        self._size += 1

    def insert(self, num: int, index: int):
        """أدخل عنصرًا في المنتصف"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        # زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها
        if self._size == self.capacity():
            self.extend_capacity()
        # أزح كل العناصر من الفهرس `index` وما بعده موضعًا واحدًا إلى اليمين
        for j in range(self._size - 1, index - 1, -1):
            self._arr[j + 1] = self._arr[j]
        self._arr[index] = num
        # حدّث عدد العناصر
        self._size += 1

    def remove(self, index: int) -> int:
        """احذف عنصرًا"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        num = self._arr[index]
        # أزح كل العناصر بعد الفهرس `index` موضعًا واحدًا إلى اليسار
        for j in range(index, self._size - 1):
            self._arr[j] = self._arr[j + 1]
        # حدّث عدد العناصر
        self._size -= 1
        # أعد العنصر المحذوف
        return num

    def extend_capacity(self):
        """زيادة سعة القائمة"""
        # أنشئ مصفوفة جديدة طولها _extend_ratio ضعف الطول الأصلي وانسخ الأصلية فيها
        self._arr = self._arr + [0] * self.capacity() * (self._extend_ratio - 1)
        # حدّث سعة القائمة
        self._capacity = len(self._arr)

    def to_array(self) -> list[int]:
        """إرجاع الجزء من القائمة الذي يحتوي عناصر"""
        return self._arr[: self._size]


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # مهّد القائمة
    nums = MyList()
    # ألحق عنصرًا في النهاية
    nums.add(1)
    nums.add(3)
    nums.add(2)
    nums.add(5)
    nums.add(4)
    print(f"List nums = {nums.to_array()}, capacity = {nums.capacity()}, length = {nums.size()}")

    # أدخل عنصرًا في المنتصف
    nums.insert(6, index=3)
    print("Insert the number 6 at index 3, giving nums =", nums.to_array())

    # احذف عنصرًا
    nums.remove(3)
    print("Remove the element at index 3, giving nums =", nums.to_array())

    # وصول إلى عنصر
    num = nums.get(1)
    print("Access the element at index 1, giving num =", num)

    # حدّث عنصرًا
    nums.set(0, 1)
    print("Update the element at index 1 to 0, giving nums =", nums.to_array())

    # اختبر نموّ السعة
    for i in range(10):
        # عند i = 5 يتجاوز طول القائمة سعتها، فيبدأ نموّ السعة
        nums.add(i)
    print(f"List after growing its capacity: {nums.to_array()}, capacity = {nums.capacity()}, length = {nums.size()}")
