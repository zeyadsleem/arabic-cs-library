"""
File: coin_change_greedy.py
Created Time: 2023-07-18
Author: krahets (krahets@163.com)
"""


def coin_change_greedy(coins: list[int], amt: int) -> int:
    """تغيير العملات: خوارزمية جشعة"""
    # افترض أن قائمة العملات مرتبة
    i = len(coins) - 1
    count = 0
    # كرّر الاختيارات الجشعة حتى لا يبقى مبلغ
    while amt > 0:
        # أوجد أكبر عملة لا تزيد عن المبلغ المتبقي
        while i > 0 and coins[i] > amt:
            i -= 1
        # اختر coins[i]
        amt -= coins[i]
        count += 1
    # أعد -1 إذا لم يُوجد حل ممكن
    return count if amt == 0 else -1


"""شيفرة تجريبية"""
if __name__ == "__main__":
    # خوارزمية جشعة: مضمون أن تجد حلًا أمثلًا شاملًا
    coins = [1, 5, 10, 20, 50, 100]
    amt = 186
    res = coin_change_greedy(coins, amt)
    print(f"\ncoins = {coins}, amt = {amt}")
    print(f"Number of coins chosen by the greedy algorithm for amount {amt}: {res}")

    # خوارزمية جشعة: غير مضمونة أن تجد حلًا أمثلًا شاملًا
    coins = [1, 20, 50]
    amt = 60
    res = coin_change_greedy(coins, amt)
    print(f"\ncoins = {coins}, amt = {amt}")
    print(f"Number of coins chosen by the greedy algorithm for amount {amt}: {res}")
    print(f"The actual minimum is 3 coins: 20 + 20 + 20")

    # خوارزمية جشعة: غير مضمونة أن تجد حلًا أمثلًا شاملًا
    coins = [1, 49, 50]
    amt = 98
    res = coin_change_greedy(coins, amt)
    print(f"\ncoins = {coins}, amt = {amt}")
    print(f"Number of coins chosen by the greedy algorithm for amount {amt}: {res}")
    print(f"The actual minimum is 2 coins: 49 + 49")
