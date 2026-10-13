---
title: "تعريف الأصناف (Classes)"
lang: ar
source: "https://programming-26.mooc.fi/part-8/3-defining-classes"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستعرف كيف تعرف أصنافك الخاصة
- ستكون قادراً على إنشاء كائنات مبنية على أصناف قمت بتعريفها بنفسك
- ستعرف كيف تكتب دالة بانية (constructor)
- ستكون على دراية باسم المعامل `self`
- ستعرف ما هي السمات (attributes) وكيف تُستخدم

</text-box>

يُعرّف الصنف باستخدام الكلمة المفتاحية `class`. البنية كالتالي:

```python
class NameOfClass:
    # تعريف الصنف يذهب هنا
```

عادةً ما تُسمّى الأصناف بأسلوب _PascalCase_، المعروف أيضاً باسم _UpperCamelCase_. وهذا يعني أن جميع الكلمات في اسم الصنف تُكتب معاً، بدون مسافات، ويبدأ كل كلمة بحرف كبير. أسماء الأصناف التالية تتبع هذا الاتفاق:

* `Weekday`
* `BankAccount`
* `LibraryDatabase`
* `PythonCourseGrades`

يجب أن يمثل تعريف صنف واحد كياناً واحداً، تكون محتوياته مرتبطة معاً بشكل ذري بطريقة ما. في البرامج الأكثر تعقيداً، يمكن أن تحتوي الأصناف على أعضاء من أصناف أخرى. على سبيل المثال، يمكن أن يحتوي الصنف `Course` على كائنات من الصنف `Lecture`، `ExerciseSession`، إلخ.

لنقم بإلقاء نظرة على هيكل تعريف صنف. الوظائف لا تزال مفقودة في هذه المرحلة.

```python
class BankAccount:
    pass
```

قطعة الكود أعلاه تخبر Python أننا هنا نعرّف صنفاً اسمه `BankAccount`. الصنف لا يحتوي على أي وظيفة بعد، لكن لا يزال بإمكاننا إنشاء كائن مبني على هذا الصنف.

لنقم بإلقاء نظرة على برنامج يتم فيه إضافة متغيرين إلى كائن `BankAccount`: `balance` و `owner`. أي متغيرات مرفقة بكائن تسمى _سماته_ (attributes)، أو بشكل أكثر تحديداً، _سمات البيانات_ (data attributes)، أو أحياناً _متغيرات المثيل_ (instance variables).

يمكن الوصول إلى السمات المرفقة بكائن من خلال الكائن:

```python
class BankAccount:
    pass

peters_account = BankAccount()
peters_account.owner = "Peter Python"
peters_account.bal...
