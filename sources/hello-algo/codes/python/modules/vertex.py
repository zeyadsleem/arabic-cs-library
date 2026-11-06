# الملف: vertex.py
# تاريخ الإنشاء: 2023-02-23
# المؤلف: krahets (krahets@163.com)


class Vertex:
    """صنف الرأس"""

    def __init__(self, val: int):
        self.val = val


def vals_to_vets(vals: list[int]) -> list["Vertex"]:
    """عند قائمة القيم vals أعد قائمة الرؤوس vets"""
    return [Vertex(val) for val in vals]


def vets_to_vals(vets: list["Vertex"]) -> list[int]:
    """عند قائمة الرؤوس vets أعد قائمة القيم vals"""
    return [vet.val for vet in vets]
