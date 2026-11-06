"""
File: n_queens.py
Created Time: 2023-04-26
Author: krahets (krahets@163.com)
"""


def backtrack(
    row: int,
    n: int,
    state: list[list[str]],
    res: list[list[list[str]]],
    cols: list[bool],
    diags1: list[bool],
    diags2: list[bool],
):
    """Backtracking: n-queens"""
    # سجّل حلًا حين تُوضع ملكة في كل صف
    if row == n:
        res.append([list(row) for row in state])
        return
    # تكرّر على كل الأعمدة
    for col in range(n):
        # احسب فهرسي القطر الرئيسي والقطر المعاكس لهذا المربع
        diag1 = row - col + n - 1
        diag2 = row + col
        # تشذيب: يجب ألا يكون في عمود المربع أو قطريه الرئيسي أو المعاكس ملكة
        if not cols[col] and not diags1[diag1] and not diags2[diag2]:
            # تجربة: ضع ملكة في هذا المربع
            state[row][col] = "Q"
            cols[col] = diags1[diag1] = diags2[diag2] = True
            # ضع ملكة في الصف التالي
            backtrack(row + 1, n, state, res, cols, diags1, diags2)
            # تراجع: أعد هذا المربع فارغًا
            state[row][col] = "#"
            cols[col] = diags1[diag1] = diags2[diag2] = False


def n_queens(n: int) -> list[list[list[str]]]:
    """Solve the n-queens problem"""
    # مهّد لوحة n*n، حيث تمثل 'Q' ملكة و'#' مربعًا فارغًا
    state = [["#" for _ in range(n)] for _ in range(n)]
    cols = [False] * n  # تتبع ما إذا كان في العمود ملكة
    diags1 = [False] * (2 * n - 1)  # تتبع ما إذا كان في القطر الرئيسي ملكة
    diags2 = [False] * (2 * n - 1)  # تتبع ما إذا كان في القطر المعاكس ملكة
    res = []
    backtrack(0, n, state, res, cols, diags1, diags2)

    return res


"""Driver code"""
if __name__ == "__main__":
    n = 4
    res = n_queens(n)

    print(f"The input board has width and height {n}")
    print(f"Number of ways to place the queens: {len(res)}")
    for state in res:
        print("--------------------")
        for row in state:
            print(row)
