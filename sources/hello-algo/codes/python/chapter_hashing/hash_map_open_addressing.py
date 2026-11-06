"""
File: hash_map_open_addressing.py
Created Time: 2023-06-13
Author: krahets (krahets@163.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from chapter_hashing.array_hash_map import Pair


class HashMapOpenAddressing:
    """Hash table with open addressing"""

    def __init__(self):
        """Constructor"""
        self.size = 0  # عدد ثنائيات المفتاح-القيمة
        self.capacity = 4  # سعة جدول التجزئة
        self.load_thres = 2.0 / 3.0  # عتبة عامل التحميل التي تطلق نموّ السعة
        self.extend_ratio = 2  # معامل نموّ السعة
        self.buckets: list[Pair | None] = [None] * self.capacity  # مصفوفة السلال
        self.TOMBSTONE = Pair(-1, "-1")  # علامة شاهد القبر

    def hash_func(self, key: int) -> int:
        """Hash function"""
        return key % self.capacity

    def load_factor(self) -> float:
        """Load factor"""
        return self.size / self.capacity

    def find_bucket(self, key: int) -> int:
        """Find the bucket index for key"""
        index = self.hash_func(key)
        first_tombstone = -1
        # تتبّع خطيًا حتى تصل إلى سلة فارغة
        while self.buckets[index] is not None:
            # إذا وُجد key فأعد فهرس سلته
            if self.buckets[index].key == key:
                # إذا وُقفت في السابق على شاهد قبر، فانقل الثنائية إلى ذلك الفهرس
                if first_tombstone != -1:
                    self.buckets[first_tombstone] = self.buckets[index]
                    self.buckets[index] = self.TOMBSTONE
                    return first_tombstone  # أعد فهرس السلة بعد النقل
                return index  # أعد فهرس السلة
            # سجّل أول شاهد قبر تقابله
            if first_tombstone == -1 and self.buckets[index] is self.TOMBSTONE:
                first_tombstone = index
            # احسب فهرس السلة مع الالتفاف إلى البداية بعد النهاية
            index = (index + 1) % self.capacity
        # إذا كان key غائبًا فأعد الفهرس المخصصة للإدراج
        return index if first_tombstone == -1 else first_tombstone

    def get(self, key: int) -> str:
        """Lookup operation"""
        # أوجد فهرس سلة key
        index = self.find_bucket(key)
        # إذا وُجدت الثنائية فأعد val الخاص بها
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            return self.buckets[index].val
        # أعد None إذا كانت الثنائية غائبة
        return None

    def put(self, key: int, val: str):
        """Insert operation"""
        # زِد السعة عندما يتجاوز عامل التحميل العتبة
        if self.load_factor() > self.load_thres:
            self.extend()
        # أوجد فهرس سلة key
        index = self.find_bucket(key)
        # إذا وُجدت الثنائية فاكتب val فوقها وأعد
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            self.buckets[index].val = val
            return
        # إذا كانت الثنائية غائبة فأدخلها
        self.buckets[index] = Pair(key, val)
        self.size += 1

    def remove(self, key: int):
        """Remove operation"""
        # أوجد فهرس سلة key
        index = self.find_bucket(key)
        # إذا وُجدت الثنائية فاستبدلها بشاهد قبر
        if self.buckets[index] not in [None, self.TOMBSTONE]:
            self.buckets[index] = self.TOMBSTONE
            self.size -= 1

    def extend(self):
        """Grow the hash table capacity"""
        # احتفظ بإشارة إلى جدول التجزئة الأصلي
        buckets_tmp = self.buckets
        # مهّد جدول تجزئة جديدًا بالسعة الموسعة
        self.capacity *= self.extend_ratio
        self.buckets = [None] * self.capacity
        self.size = 0
        # انقل الثنائيات من جدول التجزئة الأصلي إلى الجديد
        for pair in buckets_tmp:
            if pair not in [None, self.TOMBSTONE]:
                self.put(pair.key, pair.val)

    def print(self):
        """Print the hash table"""
        for pair in self.buckets:
            if pair is None:
                print("None")
            elif pair is self.TOMBSTONE:
                print("TOMBSTONE")
            else:
                print(pair.key, "->", pair.val)


"""Driver code"""
if __name__ == "__main__":
    # مهّد جدول التجزئة
    hashmap = HashMapOpenAddressing()

    # عملية الإدراج
    # أدخل الثنائية (key, val) إلى جدول التجزئة
    hashmap.put(12836, "小哈")
    hashmap.put(15937, "小啰")
    hashmap.put(16750, "小算")
    hashmap.put(13276, "小法")
    hashmap.put(10583, "小鸭")
    print("\nHash table after insertion:\nKey -> Value")
    hashmap.print()

    # عملية البحث
    # ابحث عن key في جدول التجزئة لتحصل على val
    name = hashmap.get(13276)
    print("\nLook up student ID 13276 to obtain the name " + name)

    # عملية الحذف
    # احذف الثنائية (key, val) من جدول التجزئة
    hashmap.remove(16750)
    print("\nHash table after removing 16750:\nKey -> Value")
    hashmap.print()
