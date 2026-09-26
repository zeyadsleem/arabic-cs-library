---
title: "نموذج كائنات بسيط"
lang: ar
source: https://aosabook.org/en/500L/objmodel.html
---

_كارل فريدريش بولتس باحث في كلية الملك في لندن، وهو مهتمّ على نطاق واسع
بتنفيذ وتحسين جميع أنواع اللغات الديناميكية. وهو أحد المؤلفين الرئيسيين
لـPyPy/RPython، وقد عمل على تنفيذ لغات Prolog وRacket وSmalltalk
وPHP وRuby. ومعرّفه على
تويتر هو [\@cfbolz](https://twitter.com/cfbolz)._

## مقدّمة

البرمجة الموجّهة نحو الكائنات هي أحد أنماط البرمجة الرئيسة المستخدمة
اليوم، إذ تقدّم كثير من اللغات صورة ما من التوجّه نحو الكائنات. وبينما
تبدو على السطح الآليات التي تقدّمها لغارات البرمجة الموجّهة نحو
الكائنات المختلفة للمبرمج متشابهة جدًا، فإن التفاصيل قد تتباين كثيرًا.
ومن السمات المشتركة لمعظم اللغات وجود الكائنات ونوع ما من آلية
الوراثة. غير أن الأصناف ميزة لا تدعمها كل اللغات مباشرةً. فمثلًا، في اللغات
المعتمدة على النماذج الأوّلية (prototypes) مثل Self أو
JavaScript، لا وجود لمفهوم الصنف، بل ترث الكائنات
من بعضها مباشرةً.

قد يكون فهم الفروق بين نماذج الكائنات (object models) المختلفة
ممتعًا. فهي غالبًا تكشف القرابة العائلية بين اللغات
المختلفة.

قد يكون من المفيد وضع نموذج لغة جديدة في
سياق نماذج اللغات الأخرى،
سواء لفهم النموذج الجديد بسرعة، ولمنحنا
شعورًا أفضل بمجال تصميم لغات البرمجة.

يستكشف هذا الفصل تنفيذ سلسلة من نماذج كائنات شديدة البساطة.
ويبدأ بنسخات (instances) بسيطة وأصناف، مع القدرة
على استدعاء الدوال على النسخات. وهذه هي المقاربة
«الكلاسيكية» الموجّهة نحو الكائنات التي تأسست في لغات OO
المبكرة مثل Simula 67 وSmalltalk. ثم يُوسَّع هذا النموذج خطوةً خطوة، وتستكشف
الخطوتان التاليتان خيارات تصميم لغوية مختلفة، والخطوة الأخيرة تحسّن
كفاءة نموذج الكائنات. أما النموذج النهائي فليس نموذج لغة حقيقية،
بل نسخة مثالية ومبسّطة من نموذج كائنات بايثون.

ستُنفَّذ نماذج الكائنات المعروضة في هذا الفصل بلغة بايثون.
وتعمل الشيفرة على كل من Python 2.7 و3.4.
ولفهم السلوك وخيارات التصميم على نحو أفضل، سيقدّم الفصل أيضًا
اختبارات لنموذج الكائنات. ويمكن تشغيل هذه الاختبارات إما بـpy.test أو nose.

أما اختيار بايثون كلغة تنفيذ
فغير واقعي إلى حدٍّ كبير. فـ«آلة افتراضية» حقيقية تُنفَّذ عادةً بلغة
منخفضة المستوى مثل C/C++ وتحتاج إلى كثير من العناية
بتفاصيل الهندسة لتكون فعّالة. غير أن لغة التنفيذ
الأبسط تجعل من الأسهل التركيز على فروق السلوك الفعلية بدلًا من
الانشغال بتفاصيل التنفيذ.


## النموذج القائم على الدوال

نموذج الكائنات الذي سنبدأ به هو نسخة مبسّطة إلى حدٍّ كبير
من نموذج Smalltalk. وكانت Smalltalk لغة برمجة موجّهة نحو الكائنات
صمّمها فريق آلان كاي في Xerox PARC في السبعينيات. فهي هيّجت
البرمجة الموجّهة نحو الكائنات، وهي مصدر كثير من الميزات الموجودة في لغات
البرمجة اليوم. ومن المبادئ الجوهرية في تصميم لغة Smalltalk
أن «كل شيء كائن». أما أقرب خلفاء Smalltalk من حيث الاستخدام
اليوم فهو Ruby، الذي يستخدم صياغة أقرب إلى C لكنه يحتفظ بأغلب نموذج
كائنات Smalltalk.

سيحتوي نموذج الكائنات في هذا القسم على أصناف ونسخ منها، وعلى القدرة على قراءة
الخصائص
وكتابتها
في الكائنات، والقدرة على استدعاء الدوال على الكائنات، وعلى
القدرة على أن يكون الصنف صنفًا فرعيًا من صنف آخر. منذ البداية
ستكون الأصناف كائنات عادية تمامًا يمكن أن تكون لها هيتها
خصائص ودوال.

ملاحظة حول المصطلحات: في هذا الفصل سأستخدم كلمة «نسخة» بمعنى
-«كائن ليس صنفًا».

من المفيد أن نبدأ بكتابة اختبار يحدّد
ما ينبغي أن يكون السلوك المراد تنفيذه. وكل الاختبارات المعروضة في هذا
الفصل تتكوّن من جزأين. أولًا، بقليل من شيفرة بايثون
العادية تُعرّف بضعة أصناف وتستخدمها، وتستفيد بشكل متزايد من
ميزات نموذج كائنات بايثون المتطوّرة. ثانيًا،
الاختبار المقابل باستخدام نموذج الكائنات الذي سننفّذه في هذا الفصل،
بدلًا من أصناف بايثون العادية.

سيجري الربط بين استخدام أصناف بايثون العادية واستخدام نموذج كائناتنا
يدويًا في الاختبارات. فمثلًا، بدلًا من كتابة ``obj.attribute`` في
بايثون، سنستخدم في نموذج الكائنات الدالة ``obj.read_attr("attribute")``.
وهذا الربط، في تنفيذٍ للغة حقيقية، يجريه
مفسّر اللغة أو مصرّفها.

وثمّة تبسيط إضافي في
هذا الفصل: وهو أننا لا نضع تمييزًا حادًّا بين الشيفرة التي
تنفّذ نموذج الكائنات والشيفرة المستخدَمة لكتابة الدوال المستعملة
في الكائنات. وفي نظام حقيقي، كثيرًا ما تُنفَّذ الاثنتان بلغتَي برمجة مختلفتين.

لنبدأ باختبار بسيط لقراءة حقول الكائنات وكتابتها.

```python
def test_read_write_field():
    # Python code
    class A(object):
        pass
    obj = A()
    obj.a = 1
    assert obj.a == 1

    obj.b = 5
    assert obj.a == 1
    assert obj.b == 5

    obj.a = 2
    assert obj.a == 2
    assert obj.b == 5

    # Object model code
    A = Class(name="A", base_class=OBJECT, fields={}, metaclass=TYPE)
    obj = Instance(A)
    obj.write_attr("a", 1)
    assert obj.read_attr("a") == 1

    obj.write_attr("b", 5)
    assert obj.read_attr("a") == 1
    assert obj.read_attr("b") == 5

    obj.write_attr("a", 2)
    assert obj.read_attr("a") == 2
    assert obj.read_attr("b") == 5
```

يستخدم الاختبار ثلاثة أمطر علينا تنفيذها.
تمثّل الأصناف ``Class`` و``Instance`` أصناف نموذج الكائنات
ونسخَه على التوالي. وهناك نسختان خاصتان من الصنف: ``OBJECT``
و``TYPE``. وتطابق ``OBJECT`` ما يقابله
``object`` في بايثون، وهي الصنف الأساسي النهائي لتسلسل
الوراثة. وتطابق ``TYPE`` ما يقابله ``type`` في بايثون، وهي نوع جميع
الأصناف.

كي نتمكّن من فعل أي شيء بنسخ ``Class`` و``Instance``، فإنها تنفّذ
واجهة مشتركة بالوراثة من صنف أساسي مشترك هو ``Base``
يكشف عددًا من الدوال:

```python
class Base(object):
    """ The base class that all of the object model classes inherit from. """

    def __init__(self, cls, fields):
        """ Every object has a class. """
        self.cls = cls
        self._fields = fields

    def read_attr(self, fieldname):
        """ read field 'fieldname' out of the object """
        return self._read_dict(fieldname)

    def write_attr(self, fieldname, value):
        """ write field 'fieldname' into the object """
        self._write_dict(fieldname, value)

    def isinstance(self, cls):
        """ return True if the object is an instance of class cls """
        return self.cls.issubclass(cls)

    def callmethod(self, methname, *args):
        """ call method 'methname' with arguments 'args' on object """
        meth = self.cls._read_from_class(methname)
        return meth(self, *args)

    def _read_dict(self, fieldname):
        """ read an field 'fieldname' out of the object's dict """
        return self._fields.get(fieldname, MISSING)

    def _write_dict(self, fieldname, value):
        """ write a field 'fieldname' into the object's dict """
        self._fields[fieldname] = value

MISSING = object()

```

ينفّذ صنف ``Base`` تخزين صنف الكائن، وقاموسًا
يحتوي على قيم حقول الكائن.
والآن علينا تنفيذ ``Class`` و``Instance``. ويتلقّى مُنشئ
``Instance`` الصنف الذي
ستُنشأ نسخته، ويهيّئ `fields` `dict` على أن يكون قاموسًا فارغًا.
وأما فيما عدا ذلك، فـ``Instance`` مجرد صنف فرعي رقيق جدًا يلتفّ حول ``Base`` ولا
يضيف أي وظيفة إضافية.

يتلقّى مُنشئ ``Class`` اسم الصنف،
وصنفه الأساسي، وقاموس الصنف، وصنفه الفوقي (metaclass).
وبالنسبة إلى الأصناف، تُمرَّر الحقول
إلى المُنشئ من مستخدم نموذج الكائنات. ويتلقّى مُنشئ
الصنف أيضًا صنفًا أساسيًا لا تحتاجه الاختبارات حتى الآن،
لكننا سنستفيد منه في القسم التالي.

```python
class Instance(Base):
    """Instance of a user-defined class. """

    def __init__(self, cls):
        assert isinstance(cls, Class)
        Base.__init__(self, cls, {})


class Class(Base):
    """ A User-defined class. """

    def __init__(self, name, base_class, fields, metaclass):
        Base.__init__(self, metaclass, fields)
        self.name = name
        self.base_class = base_class
```

ولأن الأصناف أيضًا نوع من
الكائنات، فإنها (بشكل غير مباشر) ترث من ``Base``. وعليه، يحتاج الصنف إلى أن يكون نسخة من
صنف آخر: صنفه الفوقي.

الآن، يكاد اختبارنا الأول ينجح. والشيء الوحيد الناقص هو تعريف
الصنفين الأساسيين ``TYPE`` و``OBJECT``، وكلاهما نسختان من
``Class``. وهنا سنبتعد كثيرًا عن نموذج Smalltalk،
ذو نظام الأصناف الفوقية المعقّد إلى حدٍّ ما. وبدلًا من ذلك سنستخدم النموذج الذي
استحدثه ObjVlisp[^objvlisp] والذي
اعتمدته بايثون.
[^objvlisp]: P. Cointe، «الأصناف الفوقية من الدرجة الأولى: نموذج ObjVlisp»، مجلة SIGPLAN، المجلد 22، العدد 12، الصفحات 156–162، 1987.

في نموذج ObjVlisp، يتشابك ``OBJECT`` و``TYPE``. فـ``OBJECT`` هو الصنف
الأساسي لجميع الأصناف، أي أنه لا يملك صنفًا أساسيًا. و``TYPE`` هو صنف فرعي من
``OBJECT``.
افتراضيًا، كل صنف هو نسخة من ``TYPE``. وبخاصة، فإن ``TYPE``
و``OBJECT`` كلاهما نسختان من ``TYPE``. غير أن بإمكان المبرمج
أيضًا أن يجعل ``TYPE`` صنفًا فرعيًا ليصنع صنفًا فوقيًا جديدًا:

```python
# set up the base hierarchy as in Python (the ObjVLisp model)
# the ultimate base class is OBJECT
OBJECT = Class(name="object", base_class=None, fields={}, metaclass=None)
# TYPE is a subclass of OBJECT
TYPE = Class(name="type", base_class=OBJECT, fields={}, metaclass=None)
# TYPE is an instance of itself
TYPE.cls = TYPE
# OBJECT is an instance of TYPE
OBJECT.cls = TYPE
```

ولتعريف أصناف فوقية جديدة، يكفي جعل ``TYPE`` صنفًا فرعيًا. غير أن
بقية هذا الفصل لن نفعل ذلك؛ سنكتفي دائمًا باستخدام ``TYPE`` بوصفه
الصنف الفوقي لكل صنف.

\aosafigure[240pt]/images/500-lines/objmodel-0-inheritance.webp{الوراثة}{500l.objmodel.inheritance}

والآن ينجح الاختبار الأول. ويفحص الاختبار الثاني أن قراءة الخصائص وكتابتها تعمل على الأصناف أيضًا. وهو سهل الكتابة، وينجح فورًا. \newpage

```python
def test_read_write_field_class():
    # classes are objects too
    # Python code
    class A(object):
        pass
    A.a = 1
    assert A.a == 1
    A.a = 6
    assert A.a == 6

    # Object model code
    A = Class(name="A", base_class=OBJECT, fields={"a": 1}, metaclass=TYPE)
    assert A.read_attr("a") == 1
    A.write_attr("a", 5)
    assert A.read_attr("a") == 5
```

### فحص ``isinstance``


حتى الآن لم نستفد من كون للكائنات أصنافًا. والاختبار
التالي ينفّذ آلية ``isinstance``:

```python
def test_isinstance():
    # Python code
    class A(object):
        pass
    class B(A):
        pass
    b = B()
    assert isinstance(b, B)
    assert isinstance(b, A)
    assert isinstance(b, object)
    assert not isinstance(b, type)

    # Object model code
    A = Class(name="A", base_class=OBJECT, fields={}, metaclass=TYPE)
    B = Class(name="B", base_class=A, fields={}, metaclass=TYPE)
    b = Instance(B)
    assert b.isinstance(B)
    assert b.isinstance(A)
    assert b.isinstance(OBJECT)
    assert not b.isinstance(TYPE)
```

للتحقّق مما إذا كان كائن ``obj`` نسخة من صنف معيّن ``cls``، يكفي
التحقّق مما إذا كان ``cls`` صنفًا فوقيًا لصنف ``obj``، أو
الصنف نفسه.
وللتحقّق مما إذا كان صنف ما صنفًا فوقيًا لصنف آخر، نمرّ على سلسلة
الأصناف الفوقية لذلك الصنف. ولا يكون الصنف الآخر صنفًا فوقيًا إلا إذا وُجد في
تلك السلسلة. وتُسمّى سلسلة الأصناف الفوقية لصنف، بما في ذلك
الصنف نفسه،
بـ«ترتيب حلّ الدوال» (method resolution order) لذلك الصنف. ويمكن حسابها
بسهولة تكراريًا:


```python
class Class(Base):
    ...

    def method_resolution_order(self):
        """ compute the method resolution order of the class """
        if self.base_class is None:
            return [self]
        else:
            return [self] + self.base_class.method_resolution_order()

    def issubclass(self, cls):
        """ is self a subclass of cls? """
        return cls in self.method_resolution_order()
```

بهذه الشيفرة، ينجح الاختبار.


### استدعاء الدوال

الميزة الناقصة المتبقّية في هذا الإصدار الأول من نموذج الكائنات هي
القدرة على استدعاء الدوال على الكائنات. وسننفّذ في هذا الفصل نموذج وراثة
بسيط أحادي.

```python
def test_callmethod_simple():
    # Python code
    class A(object):
        def f(self):
            return self.x + 1
    obj = A()
    obj.x = 1
    assert obj.f() == 2

    class B(A):
        pass
    obj = B()
    obj.x = 1
    assert obj.f() == 2 # works on subclass too

    # Object model code
    def f_A(self):
        return self.read_attr("x") + 1
    A = Class(name="A", base_class=OBJECT, fields={"f": f_A}, metaclass=TYPE)
    obj = Instance(A)
    obj.write_attr("x", 1)
    assert obj.callmethod("f") == 2

    B = Class(name="B", base_class=A, fields={}, metaclass=TYPE)
    obj = Instance(B)
    obj.write_attr("x", 2)
    assert obj.callmethod("f") == 3
```

للعثور على التنفيذ الصحيح لدالة تُرسَل إلى كائن، نمرّ على
ترتيب حلّ الدوال الخاص بصنف ذلك الكائن. وأول دالة
تُعثر عليها في قاموس أحد الأصناف الموجودة في ترتيب حلّ الدوال
هي التي تُستدعى:

```python
class Class(Base):
    ...

    def _read_from_class(self, methname):
        for cls in self.method_resolution_order():
            if methname in cls._fields:
                return cls._fields[methname]
        return MISSING

```

بإضافة شيفرة ``callmethod`` في تنفيذ ``Base``، ينجح
الاختبار.

وللتأكّد من أن الدوال التي لها وسائط تعمل أيضًا، وأن إعادة تعريف
الدوال مُنفَّذة على نحو صحيح، يمكننا استخدام الاختبار التالي الأكثر تعقيدًا
قليلًا، وهو ينجح بالفعل:

```python
def test_callmethod_subclassing_and_arguments():
    # Python code
    class A(object):
        def g(self, arg):
            return self.x + arg
    obj = A()
    obj.x = 1
    assert obj.g(4) == 5

    class B(A):
        def g(self, arg):
            return self.x + arg * 2
    obj = B()
    obj.x = 4
    assert obj.g(4) == 12

    # Object model code
    def g_A(self, arg):
        return self.read_attr("x") + arg
    A = Class(name="A", base_class=OBJECT, fields={"g": g_A}, metaclass=TYPE)
    obj = Instance(A)
    obj.write_attr("x", 1)
    assert obj.callmethod("g", 4) == 5

    def g_B(self, arg):
        return self.read_attr("x") + arg * 2
    B = Class(name="B", base_class=A, fields={"g": g_B}, metaclass=TYPE)
    obj = Instance(B)
    obj.write_attr("x", 4)
    assert obj.callmethod("g", 4) == 12
```





## النموذج القائم على الخصائص

الآن وبعد أن عمل أبسط إصدار من نموذج كائناتنا، يمكننا التفكير في
طرق لتغييره. سيقدّم هذا القسم
التمييز بين النموذج القائم على الدوال والنموذج القائم على الخصائص. وهذه
إحدى الفروق الجوهرية بين Smalltalk وRuby وJavaScript من جهة
وPython وLua من جهة أخرى.

يضع النموذج القائم على الدوال استدعاء الدوال بوصفه العملية الأولية لتنفيذ البرنامج:

```python
result = obj.f(arg1, arg2)
```

أما النموذج القائم على الخصائص
فيقسّم استدعاء الدوال إلى خطوتين: البحث عن خاصية
ثم استدعاء النتيجة:

```python
method = obj.f
result = method(arg1, arg2)
```

ويمكن إظهار هذا الفرق في الاختبار التالي:

```python
def test_bound_method():
    # Python code
    class A(object):
        def f(self, a):
            return self.x + a + 1
    obj = A()
    obj.x = 2
    m = obj.f
    assert m(4) == 7

    class B(A):
        pass
    obj = B()
    obj.x = 1
    m = obj.f
    assert m(10) == 12 # works on subclass too

    # Object model code
    def f_A(self, a):
        return self.read_attr("x") + a + 1
    A = Class(name="A", base_class=OBJECT, fields={"f": f_A}, metaclass=TYPE)
    obj = Instance(A)
    obj.write_attr("x", 2)
    m = obj.read_attr("f")
    assert m(4) == 7

    B = Class(name="B", base_class=A, fields={}, metaclass=TYPE)
    obj = Instance(B)
    obj.write_attr("x", 1)
    m = obj.read_attr("f")
    assert m(10) == 12
```

ولرغم أن الإعداد هو نفسه الموجود في الاختبار المقابل
لاستدعاءات الدوال، فإن طريقة استدعاء الدوال مختلفة. أولًا،
يُبحث عن الخاصية التي تحمل اسم الدالة على الكائن. ونتيجة
عملية البحث هذه هي *دالة مربوطة* (bound method)، وهي كائن يضمّ الكائن
نفسه فضلًا عن الدالة الموجودة في الصنف. ثم تُستدعى تلك الدالة المربوطة
بعملية استدعاء[^attributenote].

[^attributenote]: يبدو أن النموذج القائم على الخصائص أكثر تعقيدًا من الناحية
المفاهيمية، لأنه يحتاج إلى البحث عن الدالة وإلى استدعائها. ومن الناحية العملية، فإن
استدعاء شيء ما يُعرَّف بالبحث عن خاصية خاصة
هي ``__call__`` ثم استدعائها، وبذلك تُستعاد البساطة المفاهيمية. لن يُنفَّذ هذا
غير ذلك في هذا الفصل.)

ولتنفيذ هذا السلوك، علينا تغيير تنفيذ ``Base.read_attr``.
إذا لم يُعثر على الخاصية في القاموس، فيُبحث
عنها في الصنف. وإذا وُجدت في الصنف وكانت الخاصية قابلة للاستدعاء،
فيجب تحويلها إلى دالة مربوطة. ولمحاكاة الدالة المربوطة، نكتفي
باستخدام إغلاق (closure). وإلى جانب تغيير ``Base.read_attr``، يمكننا أيضًا تغيير
``Base.callmethod`` ليستخدم مقاربة استدعاء الدوال الجديدة، ولنتأكّد من أن جميع الاختبارات
لا تزال تنجح.

```python
class Base(object):
    ...
    def read_attr(self, fieldname):
        """ read field 'fieldname' out of the object """
        result = self._read_dict(fieldname)
        if result is not MISSING:
            return result
        result = self.cls._read_from_class(fieldname)
        if _is_bindable(result):
            return _make_boundmethod(result, self)
        if result is not MISSING:
            return result
        raise AttributeError(fieldname)

    def callmethod(self, methname, *args):
        """ call method 'methname' with arguments 'args' on object """
        meth = self.read_attr(methname)
        return meth(*args)

def _is_bindable(meth):
    return callable(meth)

def _make_boundmethod(meth, self):
    def bound(*args):
        return meth(self, *args)
    return bound

```

لا تحتاج بقية الشيفرة إلى أي تغيير على الإطلاق.


## بروتوكولات الكائنات الوسيطة

إلى جانب الدوال «العادية» التي يستدعيها البرنامج مباشرةً، تدعم كثير من
اللغات الديناميكية *دوالًا خاصة*. وهذه دوال لا يقصد استدعاءها مباشرةً،
بل يستدعيها نظام الكائنات. وفي بايثون، تحمل هذه
الدوال الخاصة عادةً أسماء تبدأ وتنتهي بشرطتين سفليتين؛ مثل
``__init__``. ويمكن استخدام الدوال الخاصة لإعادة تعريف العمليات الأولية
وتوفير سلوك مخصّص لها بدلًا من ذلك. وبذلك فهي خطّافات تخبار
آلية نموذج الكائنات بدقة كيفية فعل أشياء بعينها. ويمتلك نموذج كائنات بايثون
[عشرات الدوال الخاصة](https://docs.python.org/2/reference/datamodel.html#special-method-names).

قدَّمت Smalltalk بروتوكولات الكائنات الوسيطة، لكن أنظمة
Common Lisp المستخدِمة، مثل CLOS، استعملتها أكثر من ذلك. وهناك أيضًا
صاغ اسم *بروتوكول الكائن الوسيط*، بالمعنى الذي يشير إلى
مجموعات الدوال الخاصة[^kiczales].

[^kiczales]: G. Kiczales وJ. des Rivieres وD. G. Bobrow، *فن بروتوكول الكائن الوسيط*. كامبريدج، ماساتشوستس: مطبعة MIT، 1991.

سنضيف في هذا الفصل ثلاثة خطّافات وسيطة كهذه إلى نموذج كائناتنا. وهي
تُستخدم لضبط ما يحدث تمامًا عند قراءة الخصائص وكتابتها. أما
الدوال الخاصة التي سنضيفها أولًا فهي ``__getattr__`` و``__setattr__``، وهما
تتبعان عن قرب سلوك نظيرتيهما في بايثون.


### تخصيص القراءة والكتابة والخاصية

يستدعي نموذج الكائنات الدالة ``__getattr__`` حين لا يُعثر على الخاصية
التي يجري البحث عنها بالطرق المعتادة؛ أي لا على
النسخة ولا على الصنف. وهي تتلقّى اسم الخاصية التي يجري البحث عنها كوسيط.
وكان نظير للدالة الخاصة ``__getattr__`` جزءًا من
أنظمة Smalltalk المبكرة[^smalltalk] باسم ``doesNotUnderstand:``.

[^smalltalk]: A. Goldberg، *Smalltalk-80: اللغة وتنفيذها*. Addison-Wesley، 1983، الصفحة 61.

حالة ``__setattr__`` مختلفة قليلًا. ولأن ضبط خاصية
ينشئها دائمًا، \newline فإن ``__setattr__`` تُستدعى دائمًا عند ضبط
خاصية. ولضمان وجود دالة ``__setattr__`` دائمًا، فإن
صنف ``OBJECT`` لديه تعريف لـ``__setattr__``. ويكتفي هذا التنفيذ
الأساسي بما كان ضبط الخاصية يفعله حتى الآن، أي كتابة الخاصية
في قاموس الكائن. وهذا أيضًا يجعل من الممكن لِـ``__setattr__`` المعرَّف
من المستخدم أن يفوّض الأمر في بعض الحالات إلى ``OBJECT.__setattr__`` الأساسي.

الاختبار الخاص بهاتين الدالتين الخاصتين هو التالي:

```python
def test_getattr():
    # Python code
    class A(object):
        def __getattr__(self, name):
            if name == "fahrenheit":
                return self.celsius * 9. / 5. + 32
            raise AttributeError(name)

        def __setattr__(self, name, value):
            if name == "fahrenheit":
                self.celsius = (value - 32) * 5. / 9.
            else:
                # call the base implementation
                object.__setattr__(self, name, value)
    obj = A()
    obj.celsius = 30
    assert obj.fahrenheit == 86 # test __getattr__
    obj.celsius = 40
    assert obj.fahrenheit == 104

    obj.fahrenheit = 86 # test __setattr__
    assert obj.celsius == 30
    assert obj.fahrenheit == 86

    # Object model code
    def __getattr__(self, name):
        if name == "fahrenheit":
            return self.read_attr("celsius") * 9. / 5. + 32
        raise AttributeError(name)
    def __setattr__(self, name, value):
        if name == "fahrenheit":
            self.write_attr("celsius", (value - 32) * 5. / 9.)
        else:
            # call the base implementation
            OBJECT.read_attr("__setattr__")(self, name, value)

    A = Class(name="A", base_class=OBJECT,
              fields={"__getattr__": __getattr__, "__setattr__": __setattr__},
              metaclass=TYPE)
    obj = Instance(A)
    obj.write_attr("celsius", 30)
    assert obj.read_attr("fahrenheit") == 86 # test __getattr__
    obj.write_attr("celsius", 40)
    assert obj.read_attr("fahrenheit") == 104
    obj.write_attr("fahrenheit", 86) # test __setattr__
    assert obj.read_attr("celsius") == 30
    assert obj.read_attr("fahrenheit") == 86
```

لتجاوز هذه الاختبارات، نحتاج إلى تغيير دالتي
``Base.read_attr`` و``Base.write_attr``:

``` python
class Base(object):
    ...

    def read_attr(self, fieldname):
        """ read field 'fieldname' out of the object """
        result = self._read_dict(fieldname)
        if result is not MISSING:
            return result
        result = self.cls._read_from_class(fieldname)
        if _is_bindable(result):
            return _make_boundmethod(result, self)
        if result is not MISSING:
            return result
        meth = self.cls._read_from_class("__getattr__")
        if meth is not MISSING:
            return meth(self, fieldname)
        raise AttributeError(fieldname)

    def write_attr(self, fieldname, value):
        """ write field 'fieldname' into the object """
        meth = self.cls._read_from_class("__setattr__")
        return meth(self, fieldname, value)
```

يتغيّر إجراء قراءة الخاصية لتُستدعى الدالة ``__getattr__`` مع اسم
الحقل كوسيط، إن كانت الدالة موجودة، بدلًا من إطلاق خطأ. ولاحظ
أن ``__getattr__`` (وإن كان كل الدوال الخاصة في بايثون) يُبحث عنها على
الصنف فقط، بدلًا من الاستدعاء التكراري لـ
``self.read_attr("__getattr__")``. وذلك لأن الأخير سيؤدي
إلى تعاود لا نهائي في ``read_attr`` إذا لم تكن ``__getattr__`` معرَّفة
على الكائن.

أما كتابة الخصائص فتُؤجَّل بالكامل إلى الدالة ``__setattr__``. ولجعل
هذا يعمل، يحتاج ``OBJECT`` إلى دالة ``__setattr__`` تستدعي
السلوك الافتراضي، على النحو التالي:

```python
def OBJECT__setattr__(self, fieldname, value):
    self._write_dict(fieldname, value)
OBJECT = Class("object", None, {"__setattr__": OBJECT__setattr__}, None)
```





### بروتوكول الواصفات

نجح الاختبار أعلاه الذي يوفّر التحويل التلقائي بين
مقاييس حرارة مختلفة، لكنه كان مرهقًا في الكتابة، لأن اسم الخاصية
كان يحتاج إلى فحص صريح داخل دالتَي ``__getattr__`` و``__setattr__``.
ولكي نتفادى ذلك، فقد قُدِّم في بايثون
*بروتوكول الواصفات*
(descriptor protocol).

بينما تُستدعى ``__getattr__`` و``__setattr__`` على الكائن الذي تُقرأ منه الخاصية،
فإن بروتوكول الواصفات يستدعي دالة خاصة على
*نتيجة* الحصول على خاصية من كائن. ويمكن رؤيته على أنه
تعميم لربط دالة بكائن – بل إن ربط دالة بكائن
يتم فعلًا باستخدام بروتوكول الواصفات. وإلى جانب الدوال المربوطة،
فأهمّ حالة استخدام لبروتوكول الواصفات في بايثون هي
تنفيذ ``staticmethod`` و``classmethod`` و``property``.

سنقدّم في هذا القسم الفرع من بروتوكول الواصفات الذي يتعلق بربط الكائنات. ويتم ذلك
بالدالة الخاصة ``__get__``، وأفضل طريقة لشرحه هي اختبار مثال:

```python
def test_get():
    # Python code
    class FahrenheitGetter(object):
        def __get__(self, inst, cls):
            return inst.celsius * 9. / 5. + 32

    class A(object):
        fahrenheit = FahrenheitGetter()
    obj = A()
    obj.celsius = 30
    assert obj.fahrenheit == 86

    # Object model code
    class FahrenheitGetter(object):
        def __get__(self, inst, cls):
            return inst.read_attr("celsius") * 9. / 5. + 32

    A = Class(name="A", base_class=OBJECT,
              fields={"fahrenheit": FahrenheitGetter()},
              metaclass=TYPE)
    obj = Instance(A)
    obj.write_attr("celsius", 30)
    assert obj.read_attr("fahrenheit") == 86
```

تُستدعى الدالة ``__get__`` على نسخة ``FahrenheitGetter`` بعد أن
جري البحث عنها في صنف ``obj``. والوسائط الممرَّرة إلى ``__get__`` هي
النسخة التي جرى البحث فيها[^secondarg].

[^secondarg]: في بايثون، الوسيط الثاني هو الصنف الذي وُجدت فيه الخاصية،
غير أننا سنتجاهله هنا.

تنفيذ هذا السلوك سهل. فنحن بحاجة إلى تغيير ``_is_bindable``
\newline و``_make_boundmethod`` فحسب:

```python
def _is_bindable(meth):
    return hasattr(meth, "__get__")

def _make_boundmethod(meth, self):
    return meth.__get__(self, None)
```

وهذا يجعل الاختبار ينجح. ولا تزال الاختبارات السابقة الخاصة بالدوال المربوطة
تنجح، لأن دوال بايثون لديها دالة ``__get__`` تُعيد كائن دالة
مربوطة.

وفي الممارسة، بروتوكول الواصفات أعقد بكثير. فهو أيضًا
يدعم ``__set__`` لإعادة تعريف معنى ضبط الخاصية على أساس
كل خاصية على حدة. كما أن التنفيذ الحالي يختصر بعض الأمور. ولاحظ
أن ``_make_boundmethod`` تستدعي الدالة ``__get__`` على مستوى
التنفيذ، بدلًا من استخدام ``meth.read_attr("__get__")``. وهذا ضروري لأن
نموذج كائناتنا يستعير الدوال، وبالتالي دوالَ الطرق، من بايثون، بدلًا
من أن يكون له تمثيله الخاص الذي يستخدم نموذج الكائنات. وسيكون على نموذج
كائنات أكمل أن يحلّ هذه المشكلة.



## تحسين النسخ

بينما كانت الصيغ الثلاث الأولى من نموذج الكائنات تهتمّ
باختلاف السلوك، سنتناول في هذا القسم الأخير تحسينًا
لا أثر له على السلوك إطلاقًا. ويُسمّى هذا التحسين *الخرائط* (maps) وقد
رُوِّج له في الآلة الافتراضية للغة Self[^self]. وما زال
أهم تحسينات نموذج الكائنات: فهو مستخدَم في PyPy وفي كل
الآلات الافتراضية الحديثة لجافاسكربت، مثل V8 (حيث يُسمّى هذا التحسين *الأصناف
الخفية*).

[^self]: C. Chambers وD. Ungar وE. Lee، «تنفيذ فعّال لـ
SELF، لغة برمجة موجّهة نحو الكائنات ومكتوبة بأنواع ديناميكية قائمة على النماذج الأوّلية»، في
OOPSLA، 1989، المجلد 24.

ينطلق هذا التحسين من الملاحظة التالية: في نموذج الكائنات المطبَّق
حتى الآن، تستخدم كل النسخ قاموسًا كاملًا لتخزين
خصائصها. ويُنفَّذ القاموس باستخدام خريطة تجزئة، وهو ما يستهلك قدرًا كبيرًا من
الذاكرة. وإضافةً إلى ذلك، فإن قاموسات نسخ الصنف نفسه تحمل عادةً
المفاتيح نفسها أيضًا. فمثلًا، إذا كان لدينا صنف ``Point``، فمن المرجّح
أن تكون مفاتيح قاموسات كل نسخه هي ``"x"`` و``"y"``.

يستغل تحسين الخرائط هذه الحقيقة. فهو بفعالية يقسم
قاموس كل نسخة إلى جزأين. جزء يخزّن المفاتيح (وهي الخريطة)
والذي يمكن مشاركته بين كل النسخ التي لها مجموعة أسماء الخصائص نفسها.
أمّا النسخة
فلا تخزّن سوى مرجع إلى الخريطة المشتركة وإلى قيم الخصائص
في قائمة (وهي أكثر إحكامًا في الذاكرة بكثير من القاموس). وتخزّن الخريطة
ربطًا من
أسماء الخصائص إلى الفهارس في تلك القائمة.

يبدو اختبار بسيط لهذا السلوك على النحو التالي:
```python
def test_maps():
    # white box test inspecting the implementation
    Point = Class(name="Point", base_class=OBJECT, fields={}, metaclass=TYPE)
    p1 = Instance(Point)
    p1.write_attr("x", 1)
    p1.write_attr("y", 2)
    assert p1.storage == [1, 2]
    assert p1.map.attrs == {"x": 0, "y": 1}

    p2 = Instance(Point)
    p2.write_attr("x", 5)
    p2.write_attr("y", 6)
    assert p1.map is p2.map
    assert p2.storage == [5, 6]

    p1.write_attr("x", -1)
    p1.write_attr("y", -2)
    assert p1.map is p2.map
    assert p1.storage == [-1, -2]

    p3 = Instance(Point)
    p3.write_attr("x", 100)
    p3.write_attr("z", -343)
    assert p3.map is not p1.map
    assert p3.map.attrs == {"x": 0, "z": 1}
```

لاحظ أن هذا اختبار من نوع مختلف عن الاختبارات التي كتبناها
من قبل. فقد كانت جميع الاختبارات السابقة تختبر سلوك الأصناف عبر
الواجهات المكشوفة. أما هذا الاختبار فيفحص بدلًا من ذلك تفاصيل تنفيذ صنف
``Instance`` بقراءة الخصائص الداخلية ومقارنتها
بقيم معرَّفة مسبقًا. ولذلك يمكن تسمية هذا الاختبار اختبار *صندوق أبيض* (white-box).

تصف الخاصية ``attrs`` في خريطة ``p1`` تخطيط النسخة
على أنها تملك خاصيتين هما ``"x"`` و``"y"`` مخزَّنَتين في
الموضعين 0 و1 من ``storage`` الخاصة بـ``p1``. وإنشاء نسخة ثانية ``p2``
وإضافة الخصائص نفسها إليها بالترتيب نفسه سيجعلها تنتهي إلى
الخريطة نفسها. أما إذا أُضيفت خاصية مختلفة، فالخريطة بالطبع
لن تكون مشتركة.

يبدو صنف ``Map`` على النحو التالي:

```python
class Map(object):
    def __init__(self, attrs):
        self.attrs = attrs
        self.next_maps = {}

    def get_index(self, fieldname):
        return self.attrs.get(fieldname, -1)

    def next_map(self, fieldname):
        assert fieldname not in self.attrs
        if fieldname in self.next_maps:
            return self.next_maps[fieldname]
        attrs = self.attrs.copy()
        attrs[fieldname] = len(attrs)
        result = self.next_maps[fieldname] = Map(attrs)
        return result

EMPTY_MAP = Map({})
```


للخرائط دالتان، ``get_index`` و``next_map``. تُستخدم الأولى
للعثور على فهرس اسم الخاصية في تخزين الكائن. وتُستخدم الثانية
عند إضافة خاصية جديدة إلى كائن. وفي تلك الحالة يحتاج الكائن إلى استخدام
خريطة مختلفة، وهي الخريطة التي تحسبها ``next_map``. وتستخدم الدالة قاموس
``next_maps`` لتخزين الخرائط التي أُنشئت بالفعل مؤقتًا. وبهذه الطريقة،
تنتهي الكائنات التي لها التخطيط نفسه إلى استخدام كائن ``Map`` نفسه.

\aosafigure[166pt]/images/500-lines/objmodel-1-maptransition.webp{انتقالات الخريطة}{500l.objmodel.maptransition}

يبدو تنفيذ ``Instance`` الذي يستخدم الخرائط على النحو التالي:
```python
class Instance(Base):
    """Instance of a user-defined class. """

    def __init__(self, cls):
        assert isinstance(cls, Class)
        Base.__init__(self, cls, None)
        self.map = EMPTY_MAP
        self.storage = []

    def _read_dict(self, fieldname):
        index = self.map.get_index(fieldname)
        if index == -1:
            return MISSING
        return self.storage[index]

    def _write_dict(self, fieldname, value):
        index = self.map.get_index(fieldname)
        if index != -1:
            self.storage[index] = value
        else:
            new_map = self.map.next_map(fieldname)
            self.storage.append(value)
            self.map = new_map
```

يمرّر الصنف الآن ``None`` بوصفه قاموس الحقول إلى ``Base``، لأن ``Instance``
سيخزّن محتوى القاموس بطريقة أخرى. ولهذا يحتاج إلى
إعادة تعريف الدالتين ``_read_dict`` و``_write_dict``. وفي تنفيذ
حقيقي، لقنا بإعادة هيكلة صنف ``Base`` بحيث لا يعود مسؤولًا عن
تخزين قاموس الحقول، أما الآن فكون النسخ تخزّن القيمة ``None`` هناك يكفي.

تبدأ النسخة المُنشأة حديثًا باستخدام ``EMPTY_MAP``، وهو
بلا خصائص وبتخزين فارغ. ولتنفيذ ``_read_dict``، يُسأل
خريطة النسخة عن فهرس اسم الخاصية. ثم تُعاد
الخانة المقابلة من قائمة التخزين.

الكتابة في قاموس الحقول لها حالتان. من جهة، يمكن تغيير قيمة
خاصية موجودة. ويتم ذلك ببساطة بتغيير
التخزين عند الفهرس المقابل. ومن جهة أخرى، إذا لم تكن الخاصية
موجودة بعد، فإن *انتقال الخريطة* (\aosafigref{500l.objmodel.maptransition})
يلزم باستخدام الدالة ``next_map``. وتُضاف قيمة الخاصية الجديدة
إلى قائمة التخزين.


ماذا يحقّق هذا التحسين؟ فهو يحسّن استهلاك الذاكرة في الحالة
الشائعة التي توجد فيها نسخ كثيرة لها التخطيط نفسه. وهو ليس تحسينًا
شموليًا: فشيفرة تُنشئ نسخًا ذات مجموعات خصائص شديدة الاختلاف
ستكون استهلاكها للذاكرة أكبر مما لو اكتفينا بالقواميس.

وهذه مشكلة شائعة عند تحسين اللغات الديناميكية. وغالبًا ما لا
يمكن العثور على تحسينات أسرع أو أقل استهلاكًا للذاكرة في جميع
الحالات. ومن الناحية العملية، تنطبق التحسينات المختارة
على كيفية استخدام اللغة *عادةً*، مع احتمال
جعل السلوك أسوأ للبرامج التي تستخدم ميزات ديناميكية إلى حدٍّ كبير.

ومن جوانب الخرائط الأخرى اللافتة أنها، بينما تُحسّن هنا
استهلاك الذاكرة فقط، فإنها في الآلات الافتراضية الحقيقية التي تستخدم مصرّفًا فوريًا (JIT) تحسّن
أداء البرنامج أيضًا. ولتحقيق ذلك، يستخدم المصرّف الفوري الخرائط
ليصرّف عمليات البحث عن الخصائص فتصبح عمليات بحث في تخزين الكائنات
عند إزاحة ثابتة، فتتخلّص تمامًا من كل عمليات البحث في القواميس[^lookups].

[^lookups]: إن كيفية عمل ذلك خارج نطاق هذا الفصل. وقد حاولت أن
أعطي عرضًا معقولًا للقراءة عنه في ورقة كتبتها قبل بضع سنوات. وهي تستخدم
نموذج كائنات جوهرًا ضروبًا من النموذج الوارد في هذا الفصل: C. F.
Bolz وA. Cuni وM. Fijałkowski وM. Leuschel وS. Pedroni وA. Rigo، «التغذية الراجعة
في وقت التنفيذ في مصرّف JIT يتتبّع البيانات الوصفية من أجل لغات ديناميكية
فعّالة»، في وقائع
الورشة السادسة حول التنفيذ والترجمة وتحسين
اللغات والبرامج والأنظمة الموجّهة نحو الكائنات، نيويورك، ولاية نيويورك، الولايات المتحدة، 2011، الصفحات
9:1–9:8.

## الامتدادات الممكنة

من سهل توسيع نموذج كائناتنا وتجربة خيارات تصميم لغوية
متنوّعة. وفيما يلي بعض الاحتمالات:

- من أسهل ما يمكن فعله إضافة مزيد من الدوال الخاصة. وبعض الدوال
السهلة والمثيرة للاهتمام لإضافتها هي ``__init__`` و``__getattribute__`` و``__set__``.

- يمكن توسيع النموذج بسهولة شديدة لدعم الوراثة المتعددة. ولتحقيق
ذلك، يحصل كل صنف على قائمة من الأصناف الأساسية. عندئذٍ تحتاج دالة
``Class.method_resolution_order`` إلى التغيير لت دعم البحث عن الدوال. ويمكن حساب
ترتيب حلّ دوال بسيط باستخدام بحث بعمق أول مع إزالة
التكرارات. وهناك ترتيب أكثر تعقيدًا لكنه أفضل، وهو
[خوارزمية C3](https://www.python.org/download/releases/2.3/mro/)، التي تضيف
معالجة أفضل في أساس تسلسلات الوراثة المتعددة المعيّنة على شكل ماسي،
وترفض أنماط الوراثة غير المعقولة.

- تغيير أشدّ هو التحوّل إلى نموذج أوّلي، بما ينطوي على إزالة
التمييز بين الأصناف والنسخ.


## الخاتمة

من الجوانب الجوهرية لتصميم لغة
برمجة موجّهة نحو الكائنات هي تفاصيل نموذج كائناتها. وكتابة نماذج أولية صغيرة لنماذج الكائنات
طريقة سهلة وممتعة لفهم الأعمال الداخلية للغارات القائمة
على نحو أفضل، والحصول على رؤى في مجال تصميم اللغات الموجّهة نحو الكائنات.
والعبث بنماذج الكائنات طريقة جيدة لتجريب أفكار
تصميم لغوية مختلفة دون أن نضطر للقلق بشأن الأجزاء الأكثر مملًا في تنفيذ
اللغة، مثل تحليل الشيفرة وتنفيذها.

وتنفع نماذج الكائنات هذه أيضًا في الممارسة، لا بوصفها مجرد مركبات
للتجريب فحسب. إذ يمكن تضمينها واستخدامها من لغات أخرى. ومن أمثلة
هذا النهج شائعة: نموذج كائنات GObject المكتوب بلغة C،
ويُستخدم في GLib ومكتبات Gnome الأخرى؛ أو مختلف تنفيذات
أنظمة الأصناف في JavaScript.
