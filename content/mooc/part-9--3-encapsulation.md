---
title: "التغليف (Encapsulation)"
lang: ar
source: "https://programming-26.mooc.fi/part-9/3-encapsulation"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستعرف ما يعنيه التغليف (encapsulation)
- ستكون قادراً على إنشاء سمات خاصة (private attributes)
- ستعرف كيفية إنشاء الدوال المسترجعة (getters) والمُعيّنة (setters) لسماتك

</text-box>

في البرمجة كائنية التوجه (object oriented programming)، يشير مصطلح _عميل_ (client) إلى برنامج يستخدم فئة (class)، أو نماذج (instances) لفئة. تقدم الفئة للعميل _خدمات_ (services) من خلالها يمكن للعميل الوصول إلى الكائنات (objects) المُنشأة بناءً على الفئة. الأهداف هنا هي أن

1) استخدام فئة و/أو كائنات يكون بسيطاً قدر الإمكان من وجهة نظر العميل
2) _سلامة_ (integrity) أي كائن محفوظة في جميع الأوقات

تعني سلامة الكائن أن _حالة_ (state) الكائن تظل مقبولة دائماً. عملياً، هذا يعني أن قيم سمات الكائن دائماً مقبولة. على سبيل المثال، كائن يمثل تاريخاً لا ينبغي أن يكون لديه أبداً 13 كقيمة للشهر، وكائن يمثل طالباً لا ينبغي أن يكون لديه أبداً رقم سالب كقيمة للساعات الدراسية (study credits) المكتسبة، وهكذا.

دعنا نلقي نظرة على فئة تسمى `Student`:

```python
class Student:
    def __init__(self, name: str, student_number: str):
        self.name = name
        self.student_number = student_number
        self.study_credits = 0

    def add_credits(self, study_credits):
        if study_credits > 0:
            self.study_credits += study_credits
```

يقدم كائن `Student` لعملائه الدالة `add_credits`، التي تسمح للعميل بإضافة عدد محدد من الساعات الدراسية إلى إجمالي الطالب. تضمن الدالة أن القيمة الممررة كمُعامل (argument) أكبر من صفر. الكود التالي يضيف ساعات دراسية في ثلاث مناسبات:

```python
sally = Student("Sally Student", "12345")
sally.add_credits(5)
sally.add_credits(5)
sally.add_credits(10)
print("Study credits:", sally.study_credits)
```


```
Study credits: 20
```


على الرغم من تعريف الدالة، لا يزال من الممكن...
