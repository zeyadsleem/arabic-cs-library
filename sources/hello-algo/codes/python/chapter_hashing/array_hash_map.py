"""
File: array_hash_map.py
Created Time: 2022-12-14
Author: msk397 (machangxinq@gmail.com)
"""


class Pair:
    """Key-value pair"""

    def __init__(self, key: int, val: str):
        self.key = key
        self.val = val


class ArrayHashMap:
    """Hash table implemented with an array"""

    def __init__(self):
        """Constructor"""
        # مهّد مصفوفة تحوي 100 سلة
        self.buckets: list[Pair | None] = [None] * 100

    def hash_func(self, key: int) -> int:
        """Hash function"""
        index = key % 100
        return index

    def get(self, key: int) -> str | None:
        """Lookup operation"""
        index: int = self.hash_func(key)
        pair: Pair = self.buckets[index]
        if pair is None:
            return None
        return pair.val

    def put(self, key: int, val: str):
        """Insert and update operations"""
        pair = Pair(key, val)
        index: int = self.hash_func(key)
        self.buckets[index] = pair

    def remove(self, key: int):
        """Remove operation"""
        index: int = self.hash_func(key)
        # اجعلها None لتمييز الحذف
        self.buckets[index] = None

    def entry_set(self) -> list[Pair]:
        """Get all key-value pairs"""
        result: list[Pair] = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair)
        return result

    def key_set(self) -> list[int]:
        """Get all keys"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.key)
        return result

    def value_set(self) -> list[str]:
        """Get all values"""
        result = []
        for pair in self.buckets:
            if pair is not None:
                result.append(pair.val)
        return result

    def print(self):
        """Print the hash table"""
        for pair in self.buckets:
            if pair is not None:
                print(pair.key, "->", pair.val)


"""Driver code"""
if __name__ == "__main__":
    # مهّد جدول التجزئة
    hmap = ArrayHashMap()

    # عملية الإدراج
    # أدخل الثنائية (key, value) إلى جدول التجزئة
    hmap.put(12836, "小哈")
    hmap.put(15937, "小啰")
    hmap.put(16750, "小算")
    hmap.put(13276, "小法")
    hmap.put(10583, "小鸭")
    print("\nHash table after insertion:\nKey -> Value")
    hmap.print()

    # عملية البحث
    # ابحث عن key في جدول التجزئة لتحصل على value
    name = hmap.get(15937)
    print("\nLook up student ID 15937 to obtain the name " + name)

    # عملية الحذف
    # احذف الثنائية (key, value) من جدول التجزئة
    hmap.remove(10583)
    print("\nHash table after removing 10583:\nKey -> Value")
    hmap.print()

    # اجتز جدول التجزئة
    print("\nTraverse key-value pairs: Key->Value")
    for pair in hmap.entry_set():
        print(pair.key, "->", pair.val)

    print("\nTraverse keys only: Key")
    for key in hmap.key_set():
        print(key)

    print("\nTraverse values only: Value")
    for val in hmap.value_set():
        print(val)
