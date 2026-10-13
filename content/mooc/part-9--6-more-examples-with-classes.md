---
title: "مزيد من الأمثلة مع الفئات (More examples with classes)"
lang: ar
source: "https://programming-26.mooc.fi/part-9/6-more-examples-with-classes"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستكون على دراية ببعض الأمثلة الإضافية للفئات والكائنات
- ستكون قادراً على استخدام قيم افتراضية للمعلمات (parameters) في دوالك

</text-box>

يتكون المثال التالي من فئتين. فئة `Point` هي نموذج لنقطة في فضاء ثنائي الأبعاد. فئة `Line` هي نموذج لقطاع خط بين نقطتين. الكود أدناه موضح بالتعليقات (comments)؛ يرجى قراءة التعليقات لفهم كيفية عمل الفئات.

```python
import math

class Point:
    """ The class represents a point in two-dimensional space """

    def __init__(self, x: float, y: float):
        # These attributes are public because any value is acceptable for x and y
        self.x = x
        self.y = y

    # This class method returns a new Point at origo (0, 0)
    # It is possible to return a new instance of the class from within the class
    @classmethod
    def origo(cls):
        return Point(0, 0)

    # This class method creates a new Point based on an existing Point
    # The original Point can be mirrored on either or both of the x and y axes
    # For example, the Point (1, 3) mirrored on the x-axis is (1, -3)
    @classmethod
    def mirrored(cls, point: "Point", mirror_x: bool, mirror_y: bool):
        x = point.x
        y = point.y
        if mirror_x:
            y = -y
        if mirror_y:
            x = -x

        return Point(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"


class Line:
    """ The class represents a line segment in two-dimensional space """

    def __init__(self, beginning: Point, end: Point):
        # These attributes are public because any two Points are acceptable
        self.beginning = beginning
        self.end = end

    # This method uses the Pythagorean theorem to calculate the length of the line segment
    def length(self):
   ...
