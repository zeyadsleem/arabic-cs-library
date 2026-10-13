---
title: "الكائنات والمراجع (References)"
lang: ar
source: "https://programming-26.mooc.fi/part-9/1-objects-and-references"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستكون قادراً على استخدام هياكل بيانات مختلفة للتعامل مع الكائنات
- ستعرف كيف يمكن تمرير الكائنات كمعاملات

</text-box>

كل قيمة في Python هي كائن. أي كائن تنشئه بناءً على صنف قمت بتعريفها بنفسك يعمل تماماً مثل أي كائن Python "عادي". على سبيل المثال، يمكن تخزين الكائنات في قائمة:

```python
from datetime import date

class CompletedCourse:

    def __init__(self, course_name: str, credits: int, completion_date: date):
        self.name = course_name
        self.credits = credits
        self.completion_date = completion_date


if __name__ == "__main__":
    # هنا نقوم بإنشاء بعض المقررات المكتملة وإضافتها إلى قائمة 
    completed = []

    maths1 = CompletedCourse("Mathematics 1", 5, date(2020, 3, 11))
    prog1 = CompletedCourse("Programming 1", 6, date(2019, 12, 17))

    completed.append(maths1)
    completed.append(prog1)

    # لنضيف زوجين آخرين مباشرة إلى القائمة
    completed.append(CompletedCourse("Physics 2", 4, date(2019, 11, 10)))
    completed.append(CompletedCourse("Programming 2", 5, date(2020, 5, 19)))

    # نمر على جميع المقررات المكتملة، نطبع أسماءها 
    # ونجمع الوحدات الدراسية المستلمة
    credits = 0
    for course in completed:
        print(course.name)
        credits += course.credits

    print("Total credits received:", credits)
```


```
Mathematics 1
Programming 1
Physics 2
Programming 2
Total credits received: 20
```


> **تمرين برمجي: تمرين برمجي**
>
> قالب التمرين يحتوي على صنف اسمه `Car` يمثل ميزات السيارة عبر سمتين: `make (str)` و `top_speed (int)`.

يرجى كتابة دالة اسمها `fastest_car(cars: list)` تأخذ قائمة من كائنات `Car` كمعامل.

يجب أن ترجع الدالة ماركة أسرع سيارة. يجب أن...
