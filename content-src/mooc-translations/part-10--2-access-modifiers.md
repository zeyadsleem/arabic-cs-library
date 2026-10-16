---
title: "مُعدِّلات الوصول"
---

> **أهداف التعلّم**
>
> بعد إتمام هذا القسم
>
> - ستفهم مُعدِّلات الوصول الخاصة والمحمية
> - ستعرف كيف تُحدَّد مرئية الخصائص في Python


إذا عُرِّفت خاصية على أنها خاصة (private) في الصنف الأساسي، فلم تعد متاحة مباشرة في أي من الأصناف المشتقّة، كما أُشير إليه بإيجاز في القسم السابق. لننظر إلى مثال. في الصنف `Notebook` أدناه تُخزَّن الملاحظات في قائمة، والخاصية `notes` خاصة:

```python

class Notebook:
    """ A Notebook stores notes in string format """

    def __init__(self):
        # private attribute
        self.__notes = []

    def add_note(self, note):
        self.__notes.append(note)

    def retrieve_note(self, index):
        return self.__notes[index]

    def all_notes(self):
        return ",".join(self.__notes)

```

إذا كان تماسك الصنف هو ما يهمّ، فإن جعل الخاصية `notes` الخاصة يبدو منطقيًّا. ففي نهاية المطاف يوفّر الصنف للعميل توابع مناسبة لإضافتها إلى الملاحظات واستعراضها. ويصبح هذا النهج مُشكِلًا إذا عرّفنا صنفًا جديدًا `NotebookPro` يرث الصنف `Notebook`. فالخاصية `notes` الخاصة غير متاحة للعميل، لكنها كذلك غير متاحة للأصناف المشتقّة. وإذا حاولنا الوصول إليها، كما في التابع `find_notes` أدناه، ظهر لنا خطأ:

```python
class NotebookPro(Notebook):
    """ A better Notebook with search functionality """
    def __init__(self):
        # This is OK, the constructor is public despite the underscores
        super().__init__()

    # This causes an error
    def find_notes(self, search_term):
        found = []
        # the attribute __notes is private
        # the derived class can't access it directly
        for note in self.__notes:
            if search_term in note:
                found.append(note)

        return found
```


```
AttributeError: 'NotebookPro' object has no attribute '_NotebookPro__notes'
```


## الخصائص المحمية

تمتلك كثير من لغات البرمجة الكائنية ميزة، عادةً ما تكون كلمة مفتاحية خاصة، لـ_حماية_ الخصائص. وهذا يعني أنه ينبغي إخفاء الخاصية عن عملاء الصنف مع إبقاؤها متاحة لأصنافه الفرعية. وتنفر Python عمومًا من الكلمات المفتاحية، لذا لا تتوفر مثل هذه الميزة على نحو مباشر في Python. وبدلاً من ذلك، هناك _اصطلاح_ لتعليم الخصائص المحمية بطريقة معيّنة.

تذكّر أنه يمكن إخفاء خاصية بوضع شرطتين سفليتين قبل اسمها:

```python
def __init__(self):
    self.__notes = []
```

والاصطلاح المتفق عليه لـ_حماية_ خاصية هو وضع شرطة سفلية _واحدة_ قبل الاسم. وهذا _فقط_ اصطلاح. ولا شيء يمنع المبرمج من خرق هذا الاصطلاح، لكنه يُعتبر ممارسة برمجية سيئة.

```python
def __init__(self):
    self._notes = []
```

أدناه المثال الكامل على Notebook، باستخدام الخاصية المحمية `_notes` بدلًا من الخاصة `__notes`:

```python
class Notebook:
    """ A Notebook stores notes in string format """

    def __init__(self):
        # protected attribute
        self._notes = []

    def add_note(self, note):
        self._notes.append(note)

    def retrieve_note(self, index):
        return self._notes[index]

    def all_notes(self):
        return ",".join(self._notes)

class NotebookPro(Notebook):
    """ A better Notebook with search functionality """
    def __init__(self):
        # This is OK, the constructor is public despite the underscores
        super().__init__()

    # This works, the protected attribute is accessible to the derived class
    def find_notes(self, search_term):
        found = []
        for note in self._notes:
            if search_term in note:
                found.append(note)

        return found

```

أدناه جدول مفيد لمرئية الخصائص باختلاف مُعدِّلات الوصول:

مُعدِّل الوصول	| مثال | مرئي للعميل | مرئي للصنف المشتق
:--------:|:-------------:|:---:|:----:
عام      | `self.name`   | نعم | نعم
محمي     | `self._name`  | لا  | نعم
خاص      | `self.__name` | لا  | لا

تعمل مُعدِّلات الوصول بالطريقة نفسها مع كل الخصائص. فمثلًا، في الصنف `Person` أدناه لدينا التابع المحمي `capitalize_initials`. ويمكن استخدامه من الصنف المشتق `Footballer`:

```python
class Person:
    def __init__(self, name: str):
        self._name = self._capitalize_initials(name)

    def _capitalize_initials(self, name):
        name_capitalized = []
        for n in name.split(" "):
            name_capitalized.append(n.capitalize())

        return " ".join(name_capitalized)

    def __repr__(self):
        return self.__name

class Footballer(Person):

    def __init__(self, name: str, nickname: str, position: str):
        super().__init__(name)
        # the method is available as it is protected in the base class
        self.__nickname = self._capitalize_initials(nickname)
        self.__position = position

    def __repr__(self):
        r =  f"Footballer - name: {self._name}, nickname: {self.__nickname}"
        r += f", position: {self.__position}"
        return r

# Test the classes
if __name__ == "__main__":
    jp = Footballer("peter pythons", "pyper", "forward")
    print(jp)

```


```
Footballer - name: Peter Pythons, nickname: Pyper, position: forward
```



> **تمرين برمجي: المجموعة الفائقة**
>
> يحتوي قالب التمرين على تعريف صنف `SuperHero`.

يُرجى تعريف صنف اسمه `SuperGroup` يمثّل مجموعة من الأبطال الخارقين. وينبغي أن يحتوي الصنف على الأعضاء التالية:

* خصائص **محمية** هي name (str)، وlocation (str)، وmembers (list)
* باني يأخذ اسم المجموعة وموقعها كوسيطين، بهذا الترتيب
* توابع جلب (getter) للخاصيتين name وlocation
* تابع اسمه `add_member(hero: SuperHero)` يضيف عضوًا جديدًا إلى المجموعة
* تابع اسمه `print_group` يطبع معلومات عن المجموعة وأعضائها، وفقًا للصيغة المحدّدة أدناه

مثال على عمل هذا الصنف:

```python
superperson = SuperHero("SuperPerson", "Superspeed, superstrength")
invisible = SuperHero("Invisible Inca", "Invisibility")
revengers = SuperGroup("Revengers", "Emerald City")

revengers.add_member(superperson)
revengers.add_member(invisible)
revengers.print_group()
```


```
Revengers, Emerald City
Members:
SuperPerson, superpowers: Superspeed, superstrength
Invisible Inca, superpowers: Invisibility
```


إذا احتجت إلى تذكير بتوابع الجلب والوضع، يُرجى الاطلاع على [هذا القسم من الجزء السابق](/part-9/3-encapsulation#getters-and-setters) من المادّة.


> **تمرين برمجي: الجرعة السحرية السرية**
>
> يحتوي قالب التمرين على تعريف صنف `MagicPotion` يتيح لك حفظ وصفة لجرعة سحرية. ويتضمن تعريف الصنف بانيًا إلى جانب التوابع التالية

* `add_ingredient(ingredient: str, amount: float)` و
* `print_recipe()`

يُرجى تعريف صنف اسمه `SecretMagicPotion` يرث الصنف `MagicPotion` ويتيح لك أيضًا حماية الوصفة بكلمة مرور.

ينبغي أن يمتلك الصنف الجديد بانيًا يأخذ السلسلة النصية لكلمة المرور كوسيط أيضًا.

ينبغي أيضًا أن يحتوي الصنف على التوابع التالية:

* `add_ingredient(ingredient: str, amount: float, password: str)`
* `print_recipe(password: str)`

إذا كانت قيمة وسيط كلمة المرور المُعطاة لأيٍّ من هذين التوابع خاطئة، فيجب على التوابع رفع استثناء `ValueError`.

وإذا كانت كلمة المرور صحيحة، فيجب على كل تابع استدعاء التابع المعني في الصنف الأب. لا تنسخ ولا تلصق أي شيء من صنف MagicPotion.

مثال على كيفية عمل هذا:

```python
diminuendo = SecretMagicPotion("Diminuendo maximus", "hocuspocus")
diminuendo.add_ingredient("Toadstool", 1.5, "hocuspocus")
diminuendo.add_ingredient("Magic sand", 3.0, "hocuspocus")
diminuendo.add_ingredient("Frogspawn", 4.0, "hocuspocus")
diminuendo.print_recipe("hocuspocus")

diminuendo.print_recipe("pocushocus") # WRONG password!
```


```
Diminuendo maximus:
Toadstool 1.5 grams
Magic sand 3.0 grams
Frogspawn 4.0 grams
Traceback (most recent call last):
  File "secret_magic_potion.py", line 98, in <module>
    raise ValueError("Wrong password!")
ValueError: Wrong password!
```

