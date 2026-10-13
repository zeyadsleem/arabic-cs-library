---
title: "الكائنات كسمات (Attributes)"
lang: ar
source: "https://programming-26.mooc.fi/part-9/2-objects-as-attributes"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستعرف كيف تستخدم الكائنات كسمات في كائنات أخرى
- ستكون على دراية بالكلمة المفتاحية `None`

</text-box>

لقد رأينا بالفعل أمثلة على أصناف تحتوي على قوائم كسمات. بما أنه لا يوجد ما يمنعنا من تضمين كائنات قابلة للتغيير (mutable) كسمات في أصنافنا، فقد نستخدم مثيلات من أصنافنا الخاصة كسمات في أصناف أخرى قمنا بتعريفها. في الأمثلة التالية سنعرّف الأصناف `Course` و `Student` و `CompletedCourse`. يستخدم المقرر المكتمل الصنفين الأولين. تعريفات الأصناف قصيرة وبسيطة جداً من أجل التركيز بشكل أفضل على تقنية استخدام مثيلات أصنافنا الخاصة كسمات.

سنفترض أن كل صنف معرف في ملف منفصل.

أولاً نعرض صنف `Course` في ملف اسمه `course.py`:

```python
class Course:
    def __init__(self, name: str, code: str, credits: int):
        self.name = name
        self.code = code
        self.credits = credits
```

التالي، صنف `Student` في ملف اسمه `student.py`:

```python
class Student:
    def __init__(self, name: str, student_number: str, credits: int):
        self.name = name
        self.student_number = student_number
        self.credits = credits
```

أخيراً، يُعرّف صنف `CompletedCourse` في ملف اسمه `completedcourse.py`. بما أنه يستخدم الصنفين الآخرين، يجب استيرادهما قبل أن يتمكنا من استخدامهما:

```python
from course import Course
from student import Student

class CompletedCourse:
    def __init__(self, student: Student, course: Course, grade: int):
        self.student = student
        self.course = course
        self.grade = grade
```

إليك مثال لدالة رئيسية تضيف بعض المقررات المكتملة إلى قائمة:

```python
from completedcourse import CompletedCourse
from course import Course
fro...
