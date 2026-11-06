"""
File: hash_map.py
Created Time: 2022-12-14
Author: msk397 (machangxinq@gmail.com)
"""

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))
from modules import print_dict

"""Driver code"""
if __name__ == "__main__":
    # مهّد جدول التجزئة
    hmap = dict[int, str]()

    # عملية الإدراج
    # أدخل الثنائية (key, value) إلى جدول التجزئة
    hmap[12836] = "小哈"
    hmap[15937] = "小啰"
    hmap[16750] = "小算"
    hmap[13276] = "小法"
    hmap[10583] = "小鸭"
    print("\nHash table after insertion:\nKey -> Value")
    print_dict(hmap)

    # عملية البحث
    # ابحث عن key في جدول التجزئة لتحصل على value
    name: str = hmap[15937]
    print("\nLook up student ID 15937 to obtain the name " + name)

    # عملية الحذف
    # احذف الثنائية (key, value) من جدول التجزئة
    hmap.pop(10583)
    print("\nHash table after removing 10583:\nKey -> Value")
    print_dict(hmap)

    # اجتز جدول التجزئة
    print("\nTraverse key-value pairs: Key->Value")
    for key, value in hmap.items():
        print(key, "->", value)

    print("\nTraverse keys only: Key")
    for key in hmap.keys():
        print(key)

    print("\nTraverse values only: Value")
    for val in hmap.values():
        print(val)
