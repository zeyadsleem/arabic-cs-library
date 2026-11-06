# الملف: vertex.py
# تاريخ الإنشاء: 2023-02-23
# المؤلف: krahets (krahets@163.com)


class Vertex:
    """Vertex class"""

    def __init__(self, val: int):
        self.val = val


def vals_to_vets(vals: list[int]) -> list["Vertex"]:
    """Given the list of values vals, return the list of vertices vets"""
    return [Vertex(val) for val in vals]


def vets_to_vals(vets: list["Vertex"]) -> list[int]:
    """Given the list of vertices vets, return the list of values vals"""
    return [vet.val for vet in vets]
