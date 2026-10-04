---
book: mit-6100l
chapter: lecture-19
slug: exercises
lang: ar
title: "تمرين المحاضرة 19 وحلّه: الحاوية والمكدّس"
---

# التمرين القصير للمحاضرة 19 (Finger Exercises Lecture 19)

المصادر: [السؤال في صفحة المحاضرة](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-19-inheritance/)، و[ملف الحل الرسمي](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex19_sol.pdf).

إعداد الأصل: **Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا**، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)، مع احترام استثناءات الأطراف الثالثة في الأصل.

كانت الأسئلة أدناه مستحقة يوم الأربعاء 16 نوفمبر 2022، الساعة 03:00:00 مساءً.

## 1) السؤال 1 من 1

في هذه المسألة، ستنفّذ صنفين وفق المواصفات أدناه: صنف الحاوية `Container` وصنف المكدّس `Stack`، وهو صنف فرعي (Subclass) من `Container`.

سيهيّئ الصنف `Container` قائمة فارغة. سيكون لدينا تابعان (Methods): حساب حجم القائمة وإضافة عنصر. سيرث الصنف الفرعي التابع الثاني. نريد الآن إنشاء صنف فرعي لإضافة وظائف أخرى، وهي القدرة على حذف عناصر من القائمة. سيضيف `Stack` العناصر إلى القائمة بالطريقة نفسها، لكنه سيتصرف بصورة مختلفة عند حذف عنصر.

المكدّس (Stack) بنية بيانات يعمل فيها مبدأ «آخر داخل، أول خارج» (Last-in, first-out). تخيّل كومة من الفطائر: أثناء إعداد الفطائر، تكوّن كومة تكون فيها الفطائر الأقدم في الأسفل والأحدث في الأعلى. عندما تبدأ في تناولها، تأخذ واحدة من الأعلى، أي إنك تحذف أحدث فطيرة أُضيفت إلى الكومة. عند تنفيذ الصنف `Stack`، عليك التفكير في الطرف الذي يحتوي على العنصر الذي قضى أقصر وقت في القائمة. هذا هو العنصر الذي تريد حذفه وإرجاعه.

مواصفات الكود:

- كائن `Container` قائمة يمكنها تخزين عناصر من أي نوع؛ يهيّئ `__init__` قائمة فارغة.
- يُرجع `size` طول قائمة الحاوية.
- يضيف `add` العنصر `elem` إلى أحد طرفي القائمة، مع الالتزام بالطرف نفسه في كل إضافة. لا يُرجع شيئًا.
- `Stack` صنف فرعي من `Container` له تابع إضافي لحذف العناصر.
- يحذف `remove` أحدث عنصر من قائمة الحاوية، ويُرجع العنصر المحذوف، أو `None` إذا لم توجد عناصر.

```python
class Container(object):
    """
    A container object is a list and can store elements of any type
    """
    def __init__(self):
        """
        Initializes an empty list
        """
        self.myList = []

    def size(self):
        """
        Returns the length of the container list
        """
        # Your code here

    def add(self, elem):
        """
        Adds the elem to one end of the container list, keeping the end
        you add to consistent. Does not return anything
        """
        # Your code here

class Stack(Container):
    """
    A subclass of Container. Has an additional method to remove elements.
    """
    def remove(self):
        """
        The newest element in the container list is removed
        Returns the element removed or None if the queue contains no elements
        """
        # Your code here
```

> **ملاحظة المترجم:** كلمة `queue` في توثيق `remove` خطأ لفظي في PDF الرسمي؛ المقصود هنا المكدّس. حُفظ الكود كما نُشر.

حقل الإجابة في الأصل:

```python
# your class here
```

لديك عدد غير محدود من محاولات التسليم المتبقية.

## إليك الحل الذي كتبناه

```python
class Container(object):
    def __init__(self):
        self.myList = []

    def size(self):
        return len(self.myList)

    def add(self, elem):
        self.myList.append(elem)

class Stack(Container):
    def remove(self):
        if self.size() > 0:
            return self.myList.pop()
        return None
```

## إشعار المصدر الختامي

MIT OpenCourseWare — <https://ocw.mit.edu>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <https://ocw.mit.edu/terms>.
