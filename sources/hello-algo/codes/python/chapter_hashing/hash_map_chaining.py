"""
File: hash_map_chaining.py
Created Time: 2023-06-13
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from chapter_hashing.array_hash_map import Pair


class HashMapChaining:
    """Hash table with separate chaining"""

    def __init__(self):
        """Constructor"""
        self.size = 0  # عدد ثنائيات المفتاح-القيمة
        self.capacity = 4  # سعة جدول التجزئة
        self.load_thres = 2.0 / 3.0  # عتبة عامل التحميل التي تطلق نموّ السعة
        self.extend_ratio = 2  # معامل نموّ السعة
        self.buckets = [[] for _ in range(self.capacity)]  # مصفوفة السلال

    def hash_func(self, key: int) -> int:
        """Hash function"""
        return key % self.capacity

    def load_factor(self) -> float:
        """Load factor"""
        return self.size / self.capacity

    def get(self, key: int) -> str | None:
        """Lookup operation"""
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # اجتز السلة؛ إذا وُجد key فأعد val المقابل له
        for pair in bucket:
            if pair.key == key:
                return pair.val
        # أعد None إذا لم يُوجد key
        return None

    def put(self, key: int, val: str):
        """Insert operation"""
        # زِد السعة عندما يتجاوز عامل التحميل العتبة
        if self.load_factor() > self.load_thres:
            self.extend()
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # اجتز السلة؛ إذا وُجد المفتاح المحدد فحدّث val وأعد
        for pair in bucket:
            if pair.key == key:
                pair.val = val
                return
        # إذا كان key غائبًا فألحق الثنائية في النهاية
        pair = Pair(key, val)
        bucket.append(pair)
        self.size += 1

    def remove(self, key: int):
        """Remove operation"""
        index = self.hash_func(key)
        bucket = self.buckets[index]
        # اجتز السلة واحذف الثنائية
        for pair in bucket:
            if pair.key == key:
                bucket.remove(pair)
                self.size -= 1
                break

    def extend(self):
        """Grow the hash table capacity"""
        # احتفظ بإشارة إلى جدول التجزئة الأصلي
        buckets = self.buckets
        # مهّد جدول تجزئة جديدًا بالسعة الموسعة
        self.capacity *= self.extend_ratio
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0
        # انقل الثنائيات من جدول التجزئة الأصلي إلى الجديد
        for bucket in buckets:
            for pair in bucket:
                self.put(pair.key, pair.val)

    def print(self):
        """Print the hash table"""
        for bucket in self.buckets:
            res = []
            for pair in bucket:
                res.append(str(pair.key) + " -> " + pair.val)
            print(res)


"""Driver code"""
if __name__ == "__main__":
    # مهّد جدول التجزئة
    hashmap = HashMapChaining()

    # عملية الإدراج
    # أدخل الثنائية (key, value) إلى جدول التجزئة
    hashmap.put(12836, "小哈")
    hashmap.put(15937, "小啰")
    hashmap.put(16750, "小算")
    hashmap.put(13276, "小法")
    hashmap.put(10583, "小鸭")
    print("\nHash table after insertion:\n[Key1 -> Value1, Key2 -> Value2, ...]")
    hashmap.print()

    # عملية البحث
    # ابحث عن key في جدول التجزئة لتحصل على value
    name = hashmap.get(13276)
    print("\nLook up student ID 13276 to obtain the name " + name)

    # عملية الحذف
    # احذف الثنائية (key, value) من جدول التجزئة
    hashmap.remove(12836)
    print("\nHash table after removing 12836:\n[Key1 -> Value1, Key2 -> Value2, ...]")
    hashmap.print()
